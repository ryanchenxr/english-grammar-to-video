import React from 'react';
import {AbsoluteFill, Audio, Sequence, useCurrentFrame} from 'remotion';
import {activeInkActions} from './ink-actions.mjs';
import {ChalkText, Pen, pointAlong, pointOnTrace, TracedPath, type InkLine} from './writing-lesson';

type Color = 'ink' | 'blue' | 'orange';
type Write = {id: string; section: string; text: string; x: number; y: number; size: number; color: Color; at: number; duration: number};
type Mark = {id: string; section: string; cueId: string; kind: 'circle' | 'underline' | 'strike' | 'arrow'; at: number; duration: number; color: Color; targetId: string; target: string; occurrence: number; fromPoint?: [number, number]; toPoint?: [number, number]};
type Sketch = {id: string; section: string; cueId: string; d: string; at: number; duration: number; color: Color; width: number};
type Cue = {id: string; voiceCueId: string; section: string; start: number; end: number; text: string};
type GlyphManifest = {source: string; sha256: string; entries: Record<string, InkLine>};
type Track = {cueId: string; kind: 'zhNarration' | 'enExample'; src: string; start: number};
type Shot = {id: string; section?: string; showSections?: string[]; at: number; duration: number; x: number; y: number; zoom: number};
export type BoardLessonData = {
  format: 'writing-board-v5'; title: string; audience: string; scope: string; boardFont: string;
  fontSha256: string; glyphManifest: GlyphManifest;
  duration: number; boardWidth: number; boardHeight: number; sections: {id: string; at: number}[];
  shots: Shot[]; writes: Write[]; marks: Mark[]; sketches: Sketch[]; cues: Cue[]; audio: Track[];
  sound?: {src: string; enabled: boolean; volume: number; origin: string};
};
const BG = '#FBF6EC', INK = '#2B241A', BLUE = '#1635D0', ORANGE = '#FF6B1A';
const FPS = 30;
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const progress = (time: number, at: number, duration: number) => clamp((time - at) / duration);
const ink = (color: Color) => color === 'blue' ? BLUE : color === 'orange' ? ORANGE : INK;
const ease = (p: number) => p * p * (3 - 2 * p);

const targetBounds = (line: InkLine, target: string, occurrence: number) => {
  let index = -1;
  for (let i = 0; i <= occurrence; i++) index = line.text.indexOf(target, index + 1);
  if (index < 0) throw new Error(`Missing mark target ${target} #${occurrence} in ${line.text}`);
  const chars = line.chars.slice(index, index + target.length).filter((c) => c.src);
  if (!chars.length) throw new Error(`Empty mark target ${target}`);
  return {x: Math.min(...chars.map((c) => c.x)), right: Math.max(...chars.map((c) => c.x + c.width)),
    top: Math.min(...chars.map((c) => c.y)), bottom: Math.max(...chars.map((c) => c.y + c.height))};
};
const markPath = (mark: Mark, line: InkLine) => {
  const b = targetBounds(line, mark.target, mark.occurrence);
  if (mark.kind === 'arrow') {
    const [x1, y1] = mark.fromPoint!, [x2, y2] = mark.toPoint!;
    return `M ${x1} ${y1} L ${x2} ${y2} M ${x2 - 17} ${y2 - 12} L ${x2} ${y2} L ${x2 - 17} ${y2 + 12}`;
  }
  if (mark.kind === 'underline') {
    const y = b.bottom + 7;
    return `M ${b.x - 2} ${y} C ${b.x + (b.right - b.x) * .38} ${y + 4} ${b.x + (b.right - b.x) * .72} ${y - 3} ${b.right + 3} ${y + 2}`;
  }
  if (mark.kind === 'strike') {
    const y = (b.top + b.bottom) / 2;
    return `M ${b.x - 5} ${y - 2} L ${b.right + 6} ${y + 3}`;
  }
  const cx = (b.x + b.right) / 2, cy = (b.top + b.bottom) / 2;
  const rx = (b.right - b.x) / 2 + 12, ry = (b.bottom - b.top) / 2 + 12;
  return `M ${cx + rx} ${cy} C ${cx + rx} ${cy - ry * 1.35} ${cx - rx} ${cy - ry * 1.35} ${cx - rx} ${cy} C ${cx - rx} ${cy + ry * 1.35} ${cx + rx} ${cy + ry * 1.35} ${cx + rx} ${cy}`;
};
const cameraAt = (shots: Shot[], time: number) => {
  let index = 0;
  shots.forEach((shot, i) => {if (time >= shot.at) index = i;});
  const to = shots[index], from = shots[Math.max(0, index - 1)];
  const p = index === 0 ? 1 : ease(progress(time, to.at, to.duration));
  return {x: from.x + (to.x - from.x) * p, y: from.y + (to.y - from.y) * p,
    zoom: from.zoom + (to.zoom - from.zoom) * p, shot: to, previous: from, moving: index > 0 && p < 1};
};

export const BoardLesson: React.FC<BoardLessonData> = (lesson) => {
  const manifest = lesson.glyphManifest;
  if (!manifest || manifest.sha256 !== lesson.fontSha256 || manifest.source !== lesson.boardFont || lesson.writes.some((w) => manifest.entries[w.id]?.text !== w.text)) {
    throw new Error('Board font assets do not match the lesson');
  }
  const time = useCurrentFrame() / FPS;
  const camera = cameraAt(lesson.shots, time);
  const transform = `translate(${960 - camera.x * camera.zoom} ${455 - camera.y * camera.zoom}) scale(${camera.zoom})`;
  const paths = lesson.marks.map((mark) => ({mark, d: markPath(mark, manifest.entries[mark.targetId])}));
  const scoped = camera.shot.section ? new Set([
    ...(camera.shot.showSections ?? [camera.shot.section]),
    ...(camera.moving && camera.previous.section ? camera.previous.showSections ?? [camera.previous.section] : []),
  ]) : null;
  const visible = (section: string) => !scoped || scoped.has(section);
  const active = activeInkActions(lesson, time);
  if (active.length > 1) throw new Error(`Multiple active ink actions at ${time.toFixed(3)}: ${active.map(a => `${a.kind}:${a.id}`).join(', ')}`);
  const action = active[0];
  let pen: {x: number; y: number} | null = null;
  if (action && visible(action.section)) {
    const fraction = progress(time, action.at, action.duration);
    if (action.kind === 'write') {
      const line = manifest.entries[action.id];
      pen = pointAlong(line, line.total * fraction);
    } else {
      const d = action.kind === 'mark' ? paths.find(p => p.mark.id === action.id)!.d : lesson.sketches.find(s => s.id === action.id)!.d;
      pen = pointOnTrace(d, fraction);
    }
  }
  const cue = lesson.cues.find((item) => time >= item.start && time < item.end);
  return <AbsoluteFill style={{background: BG, color: INK, fontFamily: 'PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif', overflow: 'hidden'}}>
    <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0}}>
      <g transform={transform}>
        {lesson.writes.filter((write) => visible(write.section)).map((write) => <ChalkText key={write.id} line={manifest.entries[write.id]} role={write.id} fraction={progress(time, write.at, write.duration)}/>)}
        {paths.filter(({mark}) => visible(mark.section)).map(({mark, d}) => <TracedPath key={mark.id} d={d} fraction={progress(time, mark.at, mark.duration)} color={ink(mark.color)} width={mark.kind === 'arrow' ? 5 : 6}/>)}
        {lesson.sketches.filter((sketch) => visible(sketch.section)).map((sketch) => <TracedPath key={sketch.id} d={sketch.d} fraction={progress(time, sketch.at, sketch.duration)} color={ink(sketch.color)} width={sketch.width}/>)}
        {pen && <Pen x={pen.x} y={pen.y}/>}
      </g>
    </svg>
    <div style={{position: 'absolute', left: 100, right: 100, bottom: 43, height: 130, display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
      {cue && <div style={{maxWidth: 1050, padding: '15px 27px', borderRadius: 12, background: 'rgba(255,253,248,.94)', boxShadow: '0 3px 18px rgba(43,36,26,.055)', color: INK, fontSize: 39, fontWeight: 500, lineHeight: 1.2, textAlign: 'center', whiteSpace: 'nowrap'}}>{cue.text}</div>}
    </div>
    {lesson.audio.map((track, index) => <Sequence key={index} from={Math.round(track.start * FPS)}><Audio src={track.src}/></Sequence>)}
    {lesson.sound?.enabled && <Audio src={lesson.sound.src} volume={lesson.sound.volume}/>}
  </AbsoluteFill>;
};
