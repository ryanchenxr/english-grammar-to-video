#!/usr/bin/env python3
"""Locally rasterize user-supplied font glyphs and derive matching pen centerlines.

The TTF is read, never changed or copied. Generated PNGs are local font-derived
preview assets; do not distribute them without confirming the font's license.
"""
import hashlib
import base64
import argparse
import json
import math
import sys
import time
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
ALGORITHM_VERSION = 'skeleton-thin-brush-v2'
LAYOUT = {
    'boardTitle': (184, 103, 90, '#2B241A'),
    'first': (183, 300, 145, '#2B241A'),
    'second': (183, 530, 145, '#2B241A'),
    'errorLabel': (182, 476, 54, '#FF6B1A'),
    'fixedLabel': (405, 460, 54, '#1635D0'),
    'rule': (183, 770, 90, '#2B241A'),
}


def thin(mask):
    cleaned = mask if max(mask.size) < 80 else mask.filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.MinFilter(7))
    a = np.asarray(cleaned) > 90
    a = a.copy()
    for _ in range(100):
        changed = False
        for stage in (0, 1):
            p = np.pad(a.astype(np.uint8), 1)
            n = [p[:-2, 1:-1], p[:-2, 2:], p[1:-1, 2:], p[2:, 2:],
                 p[2:, 1:-1], p[2:, :-2], p[1:-1, :-2], p[:-2, :-2]]
            count = sum(n)
            turns = sum((n[i] == 0) & (n[(i + 1) % 8] == 1) for i in range(8))
            if stage == 0:
                remove = a & (count >= 2) & (count <= 6) & (turns == 1) & (n[0] * n[2] * n[4] == 0) & (n[2] * n[4] * n[6] == 0)
            else:
                remove = a & (count >= 2) & (count <= 6) & (turns == 1) & (n[0] * n[2] * n[6] == 0) & (n[0] * n[4] * n[6] == 0)
            if remove.any():
                a[remove] = False
                changed = True
        if not changed:
            break
    return a


def simplify(points, tolerance=1.35):
    if len(points) <= 2:
        return points
    start = np.array(points[0], dtype=float)
    end = np.array(points[-1], dtype=float)
    delta = end - start
    if np.linalg.norm(delta) < 1e-6:
        distances = [np.linalg.norm(np.array(p) - start) for p in points]
    else:
        distances = [abs(delta[0] * (p[1] - start[1]) - delta[1] * (p[0] - start[0])) / np.linalg.norm(delta) for p in points]
    i = int(np.argmax(distances))
    if distances[i] <= tolerance:
        return [points[0], points[-1]]
    return simplify(points[:i + 1], tolerance)[:-1] + simplify(points[i:], tolerance)


def skeleton_segments(skeleton):
    nodes = {(int(x), int(y)) for y, x in zip(*np.where(skeleton))}
    if not nodes:
        return []
    adjacency = {}
    for x, y in nodes:
        neighbors = []
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                if not dx and not dy:
                    continue
                q = (x + dx, y + dy)
                if q not in nodes:
                    continue
                if dx and dy and ((x + dx, y) in nodes or (x, y + dy) in nodes):
                    continue
                neighbors.append(q)
        adjacency[(x, y)] = sorted(neighbors)
    edge = lambda a, b: tuple(sorted((a, b)))
    visited = set()
    paths = []
    specials = sorted((p for p in nodes if len(adjacency[p]) != 2), key=lambda p: (p[1], p[0]))
    for start in specials:
        for neighbor in adjacency[start]:
            if edge(start, neighbor) in visited:
                continue
            path = [start, neighbor]
            visited.add(edge(start, neighbor))
            previous, current = start, neighbor
            while len(adjacency[current]) == 2:
                choices = [q for q in adjacency[current] if q != previous and edge(current, q) not in visited]
                if not choices:
                    break
                nxt = choices[0]
                visited.add(edge(current, nxt))
                path.append(nxt)
                previous, current = current, nxt
            if len(path) >= 2:
                paths.append(path)
    for start in sorted(nodes, key=lambda p: (p[1], p[0])):
        for neighbor in adjacency[start]:
            if edge(start, neighbor) in visited:
                continue
            path = [start, neighbor]
            visited.add(edge(start, neighbor))
            previous, current = start, neighbor
            while True:
                choices = [q for q in adjacency[current] if q != previous and edge(current, q) not in visited]
                if not choices:
                    break
                nxt = choices[0]
                visited.add(edge(current, nxt))
                path.append(nxt)
                previous, current = current, nxt
            if len(path) >= 2:
                paths.append(path)
    covered = {point for path in paths for point in path}
    paths.extend([[point, (point[0] + 1, point[1])] for point in nodes - covered])
    paths.sort(key=lambda pts: (min(y for _, y in pts), min(x for x, _ in pts)))
    return [simplify(path) for path in paths]


def brush_width(mask, paths):
    original = np.asarray(mask) > 20
    area = int(original.sum())
    for width in range(6, 72, 2):
        covered = Image.new('L', mask.size, 0)
        drawing = ImageDraw.Draw(covered)
        radius = width / 2
        for points in paths:
            drawing.line(points, fill=255, width=width, joint='curve')
            for x, y in (points[0], points[-1]):
                drawing.ellipse((x - radius, y - radius, x + radius, y + radius), fill=255)
        if int((original & (np.asarray(covered) > 0)).sum()) >= area * 0.995:
            return width
    raise ValueError('Cannot cover font glyph from its centerline')


def parse_charset(value):
    supported = set()
    for part in value.split():
        try:
            bounds = part.split('-')
            start = int(bounds[0], 16)
            end = int(bounds[-1], 16)
            supported.update(range(start, end + 1))
        except ValueError:
            continue
    return supported


def glyph_asset(char, font, color, x, y, src_path):
    if char == ' ':
        return {'char': char, 'x': x, 'y': y, 'width': 0, 'height': 0, 'src': None, 'segments': []}
    box = font.getbbox(char)
    pad = 8
    width = max(1, math.ceil(box[2] - box[0]) + 2 * pad)
    height = max(1, math.ceil(box[3] - box[1]) + 2 * pad)
    image = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    ImageDraw.Draw(image).text((pad - box[0], pad - box[1]), char, font=font, fill=color)
    alpha = image.getchannel('A')
    if not np.asarray(alpha).any():
        raise ValueError(f'Font rendered no ink for {char!r}')
    skeleton = thin(alpha)
    paths = skeleton_segments(skeleton)
    if not paths:
        # A small punctuation dot can disappear during morphological cleaning.
        # Keep the real glyph image; reveal it from a short route through its ink.
        box = alpha.getbbox()
        if not box:
            raise ValueError(f'No pen route for {char!r}')
        cx, cy = (box[0] + box[2]) // 2, (box[1] + box[3]) // 2
        paths = [[(cx, cy), (cx, cy + 1)]]
    brush = brush_width(alpha, paths)
    segments = []
    for path in paths:
        length = sum(math.dist(a, b) for a, b in zip(path, path[1:]))
        if length < 0.1:
            continue
        d = 'M ' + ' L '.join(f'{px:.1f} {py:.1f}' for px, py in path)
        segments.append({'d': d, 'length': round(length, 3), 'brush': brush})
    if not segments:
        raise ValueError(f'No usable pen route for {char!r}')
    image.save(src_path, optimize=True)
    return {'char': char, 'x': round(x + box[0] - pad, 3), 'y': round(y + box[1] - pad, 3),
            'width': width, 'height': height, 'src': src_path.name, 'segments': segments}


def main():
    started = time.perf_counter()
    parser = argparse.ArgumentParser()
    parser.add_argument('lesson')
    parser.add_argument('--project', help='Validate the registered project font before generating glyphs')
    parser.add_argument('--manifest', help='Per-run output manifest; do not write installed source')
    parser.add_argument('--cache-dir', help='Workspace glyph cache directory')
    args = parser.parse_args()
    lesson_path = Path(args.lesson).resolve()
    lesson = json.loads(lesson_path.read_text())
    font_path = Path(lesson['boardFont']).expanduser().resolve()
    if args.project:
        from storage import resolve_project_font
        project = Path(args.project).resolve()
        font_path = resolve_project_font(project.parent.parent, project.name, lesson.get('boardFont'))
    if not font_path.is_file():
        raise SystemExit(f'User-supplied font not found: {font_path}')
    if lesson['format'] in ('writing-board-v4', 'writing-board-v5'):
        section_index = {section['id']: i for i, section in enumerate(lesson['sections'])}
        colors = {'ink': '#2B241A', 'blue': '#1635D0', 'orange': '#FF6B1A'}
        fields = {item['id']: {'text': item['text'], 'x': item['x'],
                  'y': item['y'] + (section_index[item['section']] * lesson['sectionStep'] if lesson['format'] == 'writing-board-v4' else 0),
                  'size': item['size'], 'color': colors[item.get('color', 'ink')]}
                  for item in lesson['writes']}
    else:
        fields = {role: {'text': text, 'x': LAYOUT[role][0], 'y': LAYOUT[role][1],
                  'size': LAYOUT[role][2], 'color': LAYOUT[role][3]}
                  for role, text in {'boardTitle': lesson['boardTitle']['text'], 'first': lesson['lines'][0]['text'],
                  'second': lesson['lines'][1]['text'], 'errorLabel': lesson['errorLabel']['text'],
                  'fixedLabel': lesson['fixedLabel']['text'], 'rule': lesson['rule']['text']}.items()}
    chars = set(''.join(item['text'] for item in fields.values()))
    font_info = TTFont(font_path)
    charset = set().union(*(table.cmap.keys() for table in font_info['cmap'].tables))
    missing = sorted(c for c in chars if ord(c) not in charset)
    if missing:
        raise SystemExit(f'Font lacks required board characters: {missing!r}')
    digest = hashlib.sha256(font_path.read_bytes()).hexdigest()
    asset_hash = hashlib.sha256((digest + ALGORITHM_VERSION + json.dumps(fields, sort_keys=True, ensure_ascii=False)).encode()).hexdigest()[:12]
    folder = Path(args.cache_dir).resolve() if args.cache_dir else ROOT / 'public' / 'chalk' / 'glyph-cache'
    folder.mkdir(parents=True, exist_ok=True)
    entries = {}
    generated = hits = 0
    for role, spec in fields.items():
        text, base_x, base_y, size, color = spec['text'], spec['x'], spec['y'], spec['size'], spec['color']
        font = ImageFont.truetype(str(font_path), size)
        right_limit = 1815 if lesson['format'] != 'writing-board-v5' else lesson['boardWidth'] - 70
        if base_x + font.getlength(text) - text.count("'") * round(size * 0.06) + text.count(' ') * round(size * 0.08) > right_limit:
            raise ValueError(f'Board text exceeds right safe margin: {role}: {text}')
        glyphs = []
        total = 0.0
        for i, char in enumerate(text):
            apostrophe_tighten = round(size * 0.06)
            space_expand = round(size * 0.08)
            x = base_x + font.getlength(text[:i]) - text[:i].count("'") * apostrophe_tighten + text[:i].count(' ') * space_expand
            if char == ' ':
                asset = glyph_asset(char, font, color, x, base_y, folder / 'unused.png')
            else:
                glyph_key = hashlib.sha256(json.dumps({'version': ALGORITHM_VERSION, 'font': digest,
                    'char': char, 'size': size, 'color': color}, sort_keys=True, ensure_ascii=False).encode()).hexdigest()[:24]
                dest = folder / f'{glyph_key}.png'
                metadata = folder / f'{glyph_key}.json'
                if dest.is_file() and metadata.is_file():
                    cached = json.loads(metadata.read_text())
                    if cached.get('pngSha256') == hashlib.sha256(dest.read_bytes()).hexdigest():
                        asset = cached['asset'].copy()
                        hits += 1
                    else:
                        raise ValueError(f'Glyph cache checksum mismatch: {dest}')
                else:
                    asset = glyph_asset(char, font, color, 0, 0, dest)
                    metadata.write_text(json.dumps({'asset': asset, 'pngSha256': hashlib.sha256(dest.read_bytes()).hexdigest()}, ensure_ascii=False))
                    generated += 1
                asset['x'] = round(asset['x'] + x, 3)
                asset['y'] = round(asset['y'] + base_y, 3)
                asset['src'] = 'data:image/png;base64,' + base64.b64encode(dest.read_bytes()).decode('ascii')
            asset['advance'] = round(font.getlength(text[:i + 1]) - font.getlength(text[:i]) - (apostrophe_tighten if char == "'" else 0) + (space_expand if char == ' ' else 0), 3)
            asset['begin'] = round(total, 3)
            total += sum(segment['length'] for segment in asset['segments'])
            asset['end'] = round(total, 3)
            glyphs.append(asset)
        entries[role] = {'text': text, 'chars': glyphs, 'total': round(total, 3)}
    names = font_info['name'].names
    family = next((name.toUnicode() for name in names if name.nameID == 1), font_path.stem)
    manifest = {'source': str(font_path), 'sha256': digest, 'family': family,
                'algorithmVersion': ALGORITHM_VERSION, 'fields': fields,
                'inlineAssets': True,
                'embeddedLicense': 'not found by fc-scan', 'entries': entries}
    manifest_path = Path(args.manifest).resolve() if args.manifest else ROOT / 'src' / 'chalk-assets.json'
    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, separators=(',', ':')))
    print('CHALK_PERFORMANCE ' + json.dumps({'assetHash': asset_hash, 'seconds': round(time.perf_counter() - started, 3),
          'glyphsGenerated': generated, 'glyphCacheHits': hits, 'characters': sum(len(v['chars']) for v in entries.values())}))


if __name__ == '__main__':
    main()
