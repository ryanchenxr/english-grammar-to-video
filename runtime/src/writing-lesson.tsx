import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {svgPathProperties} from 'svg-path-properties';
import chalkManifest from './chalk-assets.json';

type Write = {text: string; at: number; duration: number};
type Line = Write & {id: string};
type Mark = {kind: 'circle' | 'underline' | 'cross'; line: string; target: string; at: number; duration: number};
type Correction = {line: string; target: string; removeSuffix: string; at: number; duration: number};
type Cue = {start: number; end: number; text: string};
type Track = {kind: 'zhNarration' | 'enExample'; src: string; start: number};
export type WritingLessonData = {
  format: 'writing-board-v3'; title: string; scope: string; duration: number; boardFont: string;
  boardTitle: Write; lines: [Line, Line]; errorLabel: Write;
  marks: Mark[]; correction: Correction; fixedLabel: Write; rule: Write;
  cues: Cue[]; audio?: Track[];
};
type Segment = {d: string; length: number; brush: number};
export type Glyph = {char: string; x: number; y: number; width: number; height: number; advance: number; src: string | null; segments: Segment[]; begin: number; end: number};
export type InkLine = {text: string; chars: Glyph[]; total: number};
type Manifest = {source: string; sha256: string; entries: Record<string, InkLine>};
const chalk = chalkManifest as Manifest;
const FPS = 30;
const BG = '#FBF6EC';
const INK = '#2B241A';
const BLUE = '#1635D0';
const ORANGE = '#FF6B1A';
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const progress = (time: number, at: number, duration: number) => clamp((time - at) / duration);

const pointInGlyph = (glyph: Glyph, distance: number) => {
  let start = 0;
  for (const segment of glyph.segments) {
    if (distance <= start + segment.length) {
      const p = new svgPathProperties(segment.d).getPointAtLength(Math.max(0, distance - start));
      return {x: glyph.x + p.x, y: glyph.y + p.y};
    }
    start += segment.length;
  }
  const last = glyph.segments.at(-1);
  if (!last) return null;
  const p = new svgPathProperties(last.d).getPointAtLength(last.length);
  return {x: glyph.x + p.x, y: glyph.y + p.y};
};
export const pointAlong = (line: InkLine, distance: number) => {
  const glyph = line.chars.find((c) => c.segments.length && distance <= c.end) ?? [...line.chars].reverse().find((c) => c.segments.length);
  return glyph ? pointInGlyph(glyph, Math.max(0, distance - glyph.begin)) : null;
};
const GlyphInk: React.FC<{glyph: Glyph; id: string; drawn: number; erasing?: number; shift?: number}> = ({glyph, id, drawn, erasing = 0, shift = 0}) => {
  if (!glyph.src || drawn <= glyph.begin || erasing >= 1) return null;
  const complete = drawn >= glyph.end;
  const maskId = `chalk-${id}`;
  const eraseId = `chalk-erase-${id}`;
  const visible = Math.max(0, drawn - glyph.begin);
  let offset = 0;
  return <g transform={shift ? `translate(${-shift} 0)` : undefined}>
    {!complete && <defs><mask id={maskId} maskUnits="userSpaceOnUse" x={glyph.x} y={glyph.y} width={glyph.width} height={glyph.height}>
      <rect x={glyph.x} y={glyph.y} width={glyph.width} height={glyph.height} fill="black"/>
      {glyph.segments.map((segment, i) => {
        const localVisible = Math.max(0, Math.min(segment.length, visible - offset));
        offset += segment.length;
        return <path key={i} d={segment.d} transform={`translate(${glyph.x} ${glyph.y})`} fill="none" stroke="white" strokeWidth={segment.brush} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${segment.length} ${segment.length}`} strokeDashoffset={segment.length - localVisible}/>;
      })}
    </mask></defs>}
    {erasing > 0 && <defs><mask id={eraseId} maskUnits="userSpaceOnUse" x={glyph.x} y={glyph.y} width={glyph.width} height={glyph.height}>
      <rect x={glyph.x} y={glyph.y} width={glyph.width} height={glyph.height} fill="white"/>
      {glyph.segments.map((segment, i) => {
        const before = glyph.segments.slice(0, i).reduce((n, s) => n + s.length, 0);
        const erased = Math.max(0, Math.min(segment.length, (glyph.end - glyph.begin) * erasing - before));
        return <path key={i} d={segment.d} transform={`translate(${glyph.x} ${glyph.y})`} fill="none" stroke="black" strokeWidth={segment.brush + 4} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${segment.length} ${segment.length}`} strokeDashoffset={segment.length - erased}/>;
      })}
    </mask></defs>}
    <image href={glyph.src.startsWith('data:') ? glyph.src : staticFile(glyph.src)} x={glyph.x} y={glyph.y} width={glyph.width} height={glyph.height} mask={erasing > 0 ? `url(#${eraseId})` : complete ? undefined : `url(#${maskId})`}/>
  </g>;
};
export const ChalkText: React.FC<{line: InkLine; role: string; fraction: number; eraseIndex?: number; eraseFraction?: number}> = ({line, role, fraction, eraseIndex, eraseFraction = 0}) => {
  const drawn = line.total * fraction;
  const shift = eraseIndex === undefined ? 0 : clamp((eraseFraction - 0.72) / 0.28) * line.chars[eraseIndex].advance;
  return <g>{line.chars.map((glyph, i) => <GlyphInk key={i} glyph={glyph} id={`${role}-${i}`} drawn={drawn} erasing={i === eraseIndex ? eraseFraction : 0} shift={eraseIndex !== undefined && i > eraseIndex ? shift : 0}/>)}</g>;
};
export const bounds = (line: InkLine, target: string) => {
  const index = line.text.indexOf(target);
  if (index < 0) return null;
  const chars = line.chars.slice(index, index + target.length).filter((c) => c.src);
  if (!chars.length) return null;
  return {x: Math.min(...chars.map((c) => c.x)), right: Math.max(...chars.map((c) => c.x + c.width)),
    top: Math.min(...chars.map((c) => c.y)), bottom: Math.max(...chars.map((c) => c.y + c.height)), index};
};
const markPath = (mark: Mark, line: InkLine) => {
  const b = bounds(line, mark.target);
  if (!b) return '';
  if (mark.kind === 'underline') {
    const y = b.bottom + 8;
    return `M ${b.x - 1} ${y} C ${b.x + (b.right - b.x) * 0.4} ${y + 6} ${b.x + (b.right - b.x) * 0.75} ${y - 3} ${b.right + 3} ${y + 2}`;
  }
  if (mark.kind === 'cross') {
    const c = line.chars[b.index + mark.target.length - 1];
    const x1 = c.x - 7, x2 = c.x + c.width + 7, y1 = c.y - 6, y2 = c.y + c.height + 6;
    return `M ${x1} ${y1} L ${x2} ${y2} M ${x2} ${y1} L ${x1} ${y2}`;
  }
  const cx = (b.x + b.right) / 2, cy = (b.top + b.bottom) / 2;
  const rx = (b.right - b.x) / 2 + 20, ry = (b.bottom - b.top) / 2 + 17;
  return `M ${cx + rx} ${cy} C ${cx + rx} ${cy - ry * 1.35} ${cx - rx} ${cy - ry * 1.35} ${cx - rx} ${cy} C ${cx - rx} ${cy + ry * 1.35} ${cx + rx} ${cy + ry * 1.35} ${cx + rx} ${cy}`;
};
export const TracedPath: React.FC<{d: string; fraction: number; color: string; width?: number; opacity?: number}> = ({d, fraction, color, width = 7, opacity = 1}) => {
  if (!d) return null;
  const length = new svgPathProperties(d).getTotalLength();
  return <path d={d} fill="none" stroke={color} strokeWidth={width} opacity={opacity} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${length} ${length}`} strokeDashoffset={length * (1 - fraction)}/>;
};
export const Pen: React.FC<{x: number; y: number; erasing?: boolean}> = ({x, y, erasing}) => <g transform={`translate(${x} ${y}) rotate(43)`}>
  {erasing ? <><rect x={-12} y={-103} width={24} height={104} rx={5} fill="#333127"/><rect x={-14} y={-18} width={28} height={25} rx={5} fill="#E8CFB5" stroke="#8F7B68" strokeWidth={2}/><path d="M -10 -75 L 10 -75" stroke="#AE9C83" strokeWidth={3}/></>
    : <><path d="M 0 0 L -10 -22 L 10 -22 Z" fill="#B6A389"/><path d="M 0 -2 L -3 -16 L 3 -16 Z" fill={INK}/><rect x={-11} y={-105} width={22} height={86} rx={6} fill="#34352F"/><path d="M -11 -43 L 11 -43" stroke="#B6A389" strokeWidth={5}/><path d="M -7 -89 L 7 -89" stroke="#9B8C78" strokeWidth={2}/></>}
</g>;

export const WritingLesson: React.FC<WritingLessonData> = (lesson) => {
  if (chalk.source !== lesson.boardFont || chalk.entries.boardTitle.text !== lesson.boardTitle.text || chalk.entries.second.text !== lesson.lines[1].text || chalk.entries.rule.text !== lesson.rule.text) {
    throw new Error('Chalk assets do not match this lesson; render through scripts/render.mjs');
  }
  const time = useCurrentFrame() / FPS;
  const title = chalk.entries.boardTitle, first = chalk.entries.first, second = chalk.entries.second;
  const wrong = chalk.entries.errorLabel, fixed = chalk.entries.fixedLabel, rule = chalk.entries.rule;
  const lines: Record<string, InkLine> = {[lesson.lines[0].id]: first, [lesson.lines[1].id]: second};
  const correction = lesson.correction;
  const badWord = bounds(second, correction.target);
  const eraseIndex = badWord ? badWord.index + correction.target.length - 1 : undefined;
  const eraseFraction = progress(time, correction.at, correction.duration);
  const marks = lesson.marks.map((mark) => ({mark, d: markPath(mark, lines[mark.line]), fraction: progress(time, mark.at, mark.duration)}));
  const wrongBounds = bounds(wrong, wrong.text)!;
  const labelStrike = `M ${wrongBounds.x - 5} ${(wrongBounds.top + wrongBounds.bottom) / 2} L ${wrongBounds.right + 8} ${(wrongBounds.top + wrongBounds.bottom) / 2 + 7}`;
  const strikeAt = correction.at + correction.duration + 0.15;
  const strikeDuration = 0.35;
  const cue = lesson.cues.find((c) => time >= c.start && time < c.end);
  let pen: {x: number; y: number; erasing?: boolean} | null = null;
  const writing = [
    {data: lesson.boardTitle, line: title}, {data: lesson.lines[0], line: first},
    {data: lesson.errorLabel, line: wrong}, {data: lesson.lines[1], line: second},
    {data: lesson.fixedLabel, line: fixed}, {data: lesson.rule, line: rule},
  ];
  for (const {data, line} of writing) if (time >= data.at && time < data.at + data.duration) pen = pointAlong(line, line.total * progress(time, data.at, data.duration));
  for (const {mark, d, fraction} of marks) if (time >= mark.at && time < mark.at + mark.duration && d) {
    const p = new svgPathProperties(d).getPointAtLength(new svgPathProperties(d).getTotalLength() * fraction);
    pen = {x: p.x, y: p.y};
  }
  if (eraseIndex !== undefined && time >= correction.at && time < correction.at + correction.duration) {
    const glyph = second.chars[eraseIndex];
    const p = pointInGlyph(glyph, (glyph.end - glyph.begin) * eraseFraction);
    pen = p ? {...p, erasing: true} : null;
  }
  if (time >= strikeAt && time < strikeAt + strikeDuration) {
    const p = new svgPathProperties(labelStrike).getPointAtLength(new svgPathProperties(labelStrike).getTotalLength() * progress(time, strikeAt, strikeDuration));
    pen = {x: p.x, y: p.y};
  }
  return <AbsoluteFill style={{background: BG, color: INK, fontFamily: 'PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif', overflow: 'hidden'}}>
    <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0}}>
      <ChalkText line={title} role="boardTitle" fraction={progress(time, lesson.boardTitle.at, lesson.boardTitle.duration)}/>
      <ChalkText line={first} role="first" fraction={progress(time, lesson.lines[0].at, lesson.lines[0].duration)}/>
      <ChalkText line={wrong} role="errorLabel" fraction={progress(time, lesson.errorLabel.at, lesson.errorLabel.duration)}/>
      <ChalkText line={second} role="second" fraction={progress(time, lesson.lines[1].at, lesson.lines[1].duration)} eraseIndex={eraseIndex} eraseFraction={eraseFraction}/>
      {marks.map(({mark, d, fraction}, i) => <TracedPath key={i} d={d} fraction={fraction} color={mark.kind === 'cross' ? ORANGE : BLUE} opacity={mark.kind === 'cross' ? 1 - eraseFraction : 1}/>)}
      <TracedPath d={labelStrike} fraction={progress(time, strikeAt, strikeDuration)} color={ORANGE} width={5}/>
      <ChalkText line={fixed} role="fixedLabel" fraction={progress(time, lesson.fixedLabel.at, lesson.fixedLabel.duration)}/>
      <ChalkText line={rule} role="rule" fraction={progress(time, lesson.rule.at, lesson.rule.duration)}/>
      {pen && <Pen x={pen.x} y={pen.y} erasing={pen.erasing}/>}
    </svg>
    <div style={{position: 'absolute', left: 100, right: 100, bottom: 43, height: 130, display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
      {cue && <div style={{maxWidth: 1530, padding: '15px 27px', borderRadius: 12, background: 'rgba(255,253,248,.94)', boxShadow: '0 3px 18px rgba(43,36,26,.055)', color: INK, fontSize: 39, fontWeight: 500, lineHeight: 1.2, textAlign: 'center', whiteSpace: 'pre-line'}}>{cue.text}</div>}
    </div>
    {lesson.audio?.map((track, i) => <Sequence key={i} from={Math.round(track.start * FPS)}><Audio src={track.src}/></Sequence>)}
  </AbsoluteFill>;
};
