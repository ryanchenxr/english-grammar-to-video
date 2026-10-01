import fs from 'node:fs';
import {inkOverlaps} from '../src/ink-actions.mjs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const charWidth = (s) => Math.max(132, Math.min(415, 74 + [...s].reduce((n, c) => n + (/[A-ZMW]/.test(c) ? 35 : /[il.,']/i.test(c) ? 14 : 27), 0)));
const goodText = (x) => typeof x === 'string' && x.trim().length > 0;
const visualWidth = (s, size) => [...s].reduce((n, c) => n + (/[\u3400-\u9fff]/.test(c) ? size : /[A-ZMW]/.test(c) ? size * 0.72 : /[il.,' ]/.test(c) ? size * 0.28 : size * 0.55), 0);
const voiceTrackOk = (track, name, duration, lessonPath, errors) => {
  if (!['zhNarration', 'enExample'].includes(track?.kind) || !goodText(track?.src) || typeof track?.start !== 'number' || track.start < 0 || track.start >= duration) errors.push(`${name}: kind/src/start 无效`);
  else if (!fs.existsSync(path.resolve(path.dirname(lessonPath), track.src))) errors.push(`${name}: 本地录音不存在 ${track.src}`);
};
const writingTextOk = (text) => goodText(text) && !/[^A-Za-z .,?!'-]/.test(text);
const boardTextOk = (text) => goodText(text) && !/[^A-Za-z .,?!'+-]/.test(text);

function validateWritingV5(lesson, lessonPath) {
  const errors = [];
  const finite = Number.isFinite;
  const duration = lesson.duration;
  if (!goodText(lesson.title) || !goodText(lesson.scope) || !goodText(lesson.boardFont) || !fs.existsSync(lesson.boardFont) ||
      !finite(duration) || duration <= 0 || !finite(lesson.boardWidth) || !finite(lesson.boardHeight)) errors.push('v5: title/scope/font/duration/board invalid');
  const sections = new Map((lesson.sections ?? []).map((s) => [s.id, s]));
  if (!sections.size || lesson.sections[0]?.at !== 0) errors.push('v5: sections must start at zero');
  const writes = new Map();
  for (const w of lesson.writes ?? []) {
    if (!goodText(w.id) || writes.has(w.id) || !sections.has(w.section) || !goodText(w.text) ||
        !finite(w.x) || !finite(w.y) || !finite(w.size) || w.size < 35 || w.size > 160 ||
        w.x < 0 || w.y < 0 || w.y + w.size > lesson.boardHeight ||
        w.x + visualWidth(w.text, w.size) > lesson.boardWidth - 15 ||
        !finite(w.at) || !finite(w.duration) || w.at < 0 || w.duration <= 0 || w.at + w.duration > duration ||
        !['ink','blue','orange'].includes(w.color)) errors.push(`v5 write ${w.id}: invalid content, position or time`);
    writes.set(w.id, w);
  }
  const shots = lesson.shots ?? [];
  if (!shots.length || shots[0].at !== 0) errors.push('v5: camera must start at zero');
  let last = -1;
  for (const shot of shots) {
    if (!goodText(shot.id) || !finite(shot.at) || shot.at <= last || shot.at >= duration || !finite(shot.duration) ||
        shot.duration < 0 || shot.duration > 2 || !finite(shot.x) || !finite(shot.y) || !finite(shot.zoom) ||
        shot.zoom < .3 || shot.zoom > 2 || shot.x < 0 || shot.x > lesson.boardWidth || shot.y < 0 || shot.y > lesson.boardHeight ||
        (shot.section && !sections.has(shot.section)) || (shot.showSections ?? []).some((id) => !sections.has(id)))
      errors.push(`v5 shot ${shot.id}: invalid position or time`);
    last = shot.at;
  }
  const ease = (p) => p*p*(3-2*p);
  const cameraAt = (t) => {
    let i = 0;shots.forEach((s,j) => {if (t >= s.at) i=j;});
    const from=shots[Math.max(0,i-1)],to=shots[i];
    if (!from || !to) return {x:0,y:0,zoom:1};
    const p=i===0 ? 1 : ease(Math.max(0,Math.min(1,(t-to.at)/Math.max(to.duration,.001))));
    return {x:from.x+(to.x-from.x)*p,y:from.y+(to.y-from.y)*p,zoom:from.zoom+(to.zoom-from.zoom)*p,
      shot:to,previous:from,moving:i>0 && p<1};
  };
  const cues = lesson.cues ?? [];
  let lastCueEnd=0;
  for (const cue of cues) {
    if (!goodText(cue.id) || !goodText(cue.voiceCueId) || !sections.has(cue.section) || !goodText(cue.text) ||
        /[\r\n]/.test(cue.text) || visualWidth(cue.text,39)>850 || !finite(cue.start) || !finite(cue.end) ||
        cue.start < lastCueEnd-.015 || cue.end <= cue.start || cue.end > duration) errors.push(`v5 cue ${cue.id}: invalid subtitle or time`);
    lastCueEnd=cue.end;
  }
  const cueStarts = new Map((lesson.audio ?? []).map((a) => [a.cueId,a.start]));
  for (const track of lesson.audio ?? []) voiceTrackOk(track,`v5 audio ${track.cueId}`,duration,lessonPath,errors);
  const marks = new Map();
  for (const m of lesson.marks ?? []) {
    const w=writes.get(m.targetId),cueStart=cueStarts.get(m.cueId);
    const matches = w && goodText(m.target) ? [...w.text.matchAll(new RegExp(m.target.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'g'))].map(x=>x.index) : [];
    if (!goodText(m.id) || marks.has(m.id) || !sections.has(m.section) || !['circle','underline','strike','arrow'].includes(m.kind) ||
        !['ink','blue','orange'].includes(m.color) || !w || !goodText(m.target) || !Number.isInteger(m.occurrence) ||
        m.occurrence < 0 || m.occurrence >= matches.length || !finite(cueStart) ||
        !finite(m.at) || !finite(m.duration) || m.duration <= 0 || m.at < cueStart-.02 ||
        m.at < w.at+w.duration-.02 || m.at+m.duration > duration ||
        (m.kind==='arrow' && (!Array.isArray(m.fromPoint) || !Array.isArray(m.toPoint) ||
          [...m.fromPoint,...m.toPoint].some(x=>!finite(x))))) errors.push(`v5 mark ${m.id}: missing or ambiguous target, cue, or timing`);
    if (w && matches.length && Number.isInteger(m.occurrence) && matches[m.occurrence] !== undefined) {
      const prefix=w.text.slice(0,matches[m.occurrence]);
      const wx=w.x+visualWidth(prefix,w.size)+visualWidth(m.target,w.size)/2,wy=w.y+w.size*.5;
      const camera=cameraAt(m.at+m.duration*.5),sx=960+(wx-camera.x)*camera.zoom,sy=455+(wy-camera.y)*camera.zoom;
      if (sx<80 || sx>1840 || sy<60 || sy>850) errors.push(`v5 mark ${m.id}: target outside safe camera view`);
      const shown=camera.shot.section ? (camera.shot.showSections ?? [camera.shot.section]) : null;
      if (shown && !shown.includes(w.section) && !(camera.moving && camera.previous.section===w.section))
        errors.push(`v5 mark ${m.id}: target hidden by camera scope`);
    }
    marks.set(m.id,m);
  }
  if (!Array.isArray(lesson.annotationIntents) || lesson.annotationIntents.length !== marks.size) errors.push('v5: every mark needs one explicit narration intent');
  for (const intent of lesson.annotationIntents ?? []) {
    const m=marks.get(intent.markId);
    if (!m || m.cueId!==intent.cueId || m.targetId!==intent.targetId || m.target!==intent.target || m.occurrence!==intent.occurrence)
      errors.push(`v5 intent ${intent.markId}: cue or board target mismatch`);
  }
  for (const s of lesson.sketches ?? []) if (!goodText(s.id) || !goodText(s.d) || !finite(s.at) || !finite(s.duration) || s.at<0 || s.duration<=0 || s.at+s.duration>duration) errors.push(`v5 sketch ${s.id}: invalid`);
  for (const [a,b] of inkOverlaps(lesson)) errors.push(
    `v5 single pen conflict: ${a.kind} ${a.id} [${a.at.toFixed(3)},${(a.at+a.duration).toFixed(3)}) / ${b.kind} ${b.id} [${b.at.toFixed(3)},${(b.at+b.duration).toFixed(3)})`);
  if (lesson.sound?.enabled && (!goodText(lesson.sound.src) || !fs.existsSync(path.resolve(path.dirname(lessonPath),lesson.sound.src)) ||
      !finite(lesson.sound.volume) || lesson.sound.volume<0 || lesson.sound.volume>.4)) errors.push('v5: writing sound invalid');
  return errors;
}

function validateWritingV4(lesson, lessonPath) {
  const errors = [];
  if (!goodText(lesson.title) || !goodText(lesson.scope) || !goodText(lesson.boardFont) || !fs.existsSync(lesson.boardFont)) errors.push('title/scope/boardFont 无效');
  if (!Number.isFinite(lesson.duration) || lesson.duration <= 0 || !Number.isFinite(lesson.sectionStep) || lesson.sectionStep < 900) errors.push('duration/sectionStep 无效');
  const duration = lesson.duration || 0;
  const sections = lesson.sections;
  if (!Array.isArray(sections) || !sections.length || sections[0]?.at !== 0) errors.push('sections 必须从 0 秒开始');
  const sectionIds = new Set();
  let lastSectionAt = -1;
  for (const section of sections ?? []) {
    if (!goodText(section?.id) || sectionIds.has(section.id) || !Number.isFinite(section.at) || section.at <= lastSectionAt || section.at >= duration || !Number.isFinite(section.panDuration) || section.panDuration < 0 || section.panDuration > 1.5) errors.push(`section ${section?.id}: id 或时间无效`);
    sectionIds.add(section?.id); lastSectionAt = section?.at ?? lastSectionAt;
  }
  const writes = lesson.writes;
  if (!Array.isArray(writes) || !writes.length) errors.push('writes 至少一项');
  const byId = new Map();
  const actions = [];
  for (const write of writes ?? []) {
    if (!goodText(write?.id) || byId.has(write.id) || !sectionIds.has(write?.section) || !goodText(write?.text) || /[^\x20-\x7e\u3400-\u9fff]/.test(write.text) || !['ink','blue','orange'].includes(write?.color) || !Number.isFinite(write.at) || !Number.isFinite(write.duration) || write.duration <= 0 || write.at < 0 || write.at + write.duration > duration || !Number.isFinite(write.x) || !Number.isFinite(write.y) || !Number.isFinite(write.size) || write.x < 100 || write.x > 1700 || write.y < 50 || write.y > 850 || write.size < 40 || write.size > 150) errors.push(`write ${write?.id}: 文本、字体位置或时间无效`);
    byId.set(write?.id, write);
    actions.push(write);
  }
  if (!Array.isArray(lesson.marks)) errors.push('marks 必须是数组');
  for (const mark of lesson.marks ?? []) {
    const target = byId.get(mark?.targetId);
    const endpointOk = mark?.kind !== 'arrow' || (Array.isArray(mark.fromPoint) && mark.fromPoint.length === 2 && Array.isArray(mark.toPoint) && mark.toPoint.length === 2 && [...mark.fromPoint,...mark.toPoint].every(Number.isFinite));
    if (!goodText(mark?.id) || !sectionIds.has(mark?.section) || !['circle','underline','strike','arrow'].includes(mark?.kind) || !['ink','blue','orange'].includes(mark?.color) || !Number.isFinite(mark.at) || !Number.isFinite(mark.duration) || mark.duration <= 0 || mark.at < 0 || mark.at + mark.duration > duration || !endpointOk || (mark.kind !== 'arrow' && (!target || target.section !== mark.section || !goodText(mark.target) || !target.text.includes(mark.target) || mark.at < target.at + target.duration))) errors.push(`mark ${mark?.id}: 目标或时间无效`);
    actions.push(mark);
  }
  if (lesson.sketches !== undefined && !Array.isArray(lesson.sketches)) errors.push('sketches 必须是数组');
  for (const sketch of lesson.sketches ?? []) {
    if (!goodText(sketch?.id) || !sectionIds.has(sketch?.section) || !goodText(sketch?.d) ||
        !/^M[0-9 .,_LlCcQqAaZz-]+$/.test(sketch.d) || !['ink','blue','orange'].includes(sketch?.color) ||
        !Number.isFinite(sketch.at) || !Number.isFinite(sketch.duration) || sketch.duration <= 0 ||
        sketch.at < 0 || sketch.at + sketch.duration > duration || !Number.isFinite(sketch.width) ||
        sketch.width < 2 || sketch.width > 20) errors.push(`sketch ${sketch?.id}: 路径或时间无效`);
    actions.push(sketch);
  }
  actions.sort((a,b)=>a.at-b.at);
  for (let i=1;i<actions.length;i++) if (actions[i].section===actions[i-1].section && actions[i].at < actions[i-1].at + actions[i-1].duration - .015) errors.push(`同时书写：${actions[i-1].id} / ${actions[i].id}`);
  if (!Array.isArray(lesson.cues) || !lesson.cues.length) errors.push('cues 至少一项');
  const cueById = new Map();
  const subtitleGroups = new Map();
  let lastCueEnd = 0;
  for (const cue of lesson.cues ?? []) {
    if (!goodText(cue?.id) || cueById.has(cue.id) || !goodText(cue?.voiceCueId) || !sectionIds.has(cue?.section) || !goodText(cue?.text) || /[\r\n]/.test(cue.text) || visualWidth(cue.text,39)>850 || !Number.isFinite(cue.start) || !Number.isFinite(cue.end) || cue.start < lastCueEnd - .015 || cue.end <= cue.start || cue.end > duration) errors.push(`cue ${cue?.id}: 单行内容或时间无效`);
    cueById.set(cue?.id,cue); lastCueEnd = cue?.end ?? lastCueEnd;
    const group = subtitleGroups.get(cue?.voiceCueId) ?? [];
    group.push(cue); subtitleGroups.set(cue?.voiceCueId, group);
  }
  if (!Array.isArray(lesson.audio) || lesson.audio.length !== subtitleGroups.size) errors.push('audio 必须逐条对应录音句，字幕可分段');
  const tracked = new Set();
  for (const track of lesson.audio ?? []) {
    const group = subtitleGroups.get(track?.cueId);
    if (!group?.length || tracked.has(track.cueId) || Math.abs(track.start-group[0].start)>.02 ||
        group.some((cue,i) => cue.section !== group[0].section || (i && Math.abs(cue.start-group[i-1].end)>.02))) errors.push(`audio ${track?.cueId}: 起点或分段字幕不一致`);
    tracked.add(track.cueId);
    voiceTrackOk(track,`audio ${track?.cueId}`,duration,lessonPath,errors);
  }
  return errors;
}

function validateWritingV2(lesson, lessonPath) {
  const errors = [];
  if (!goodText(lesson.title) || !goodText(lesson.scope) || typeof lesson.duration !== 'number' || lesson.duration <= 0) errors.push('title、scope、duration 必填且有效');
  const duration = lesson.duration || 0;
  const write = (item, name) => {
    if (!boardTextOk(item?.text) || typeof item?.at !== 'number' || typeof item?.duration !== 'number' || item.at < 0 || item.duration <= 0 || item.at + item.duration > duration) errors.push(`${name}: 英文板书或书写时间无效`);
  };
  write(lesson.boardTitle, 'boardTitle');
  if (!Array.isArray(lesson.lines) || lesson.lines.length !== 2) errors.push('lines 必须有两句英文');
  else lesson.lines.forEach((line, i) => {write(line, `lines[${i}]`); if (!goodText(line.id)) errors.push(`lines[${i}]: id 必填`);});
  write(lesson.errorLabel, 'errorLabel');
  write(lesson.fixedLabel, 'fixedLabel');
  write(lesson.rule, 'rule');
  const correction = lesson.correction;
  const correctedLine = lesson.lines?.find((line) => line.id === correction?.line);
  if (!correctedLine || !goodText(correction?.target) || !goodText(correction?.removeSuffix) || correction.removeSuffix.length !== 1 || !correction.target.endsWith(correction.removeSuffix) || !correctedLine.text.includes(correction.target) || typeof correction?.at !== 'number' || typeof correction?.duration !== 'number' || correction.at < correctedLine.at + correctedLine.duration || correction.duration <= 0 || correction.at + correction.duration > duration) errors.push('correction: 目标或擦改时间无效');
  if (lesson.fixedLabel?.at < (correction?.at ?? 0) + (correction?.duration ?? 0) || lesson.rule?.at < lesson.fixedLabel?.at + lesson.fixedLabel?.duration) errors.push('fixedLabel/rule 必须按擦改、修正、结论的顺序书写');
  if (!Array.isArray(lesson.marks)) errors.push('marks 必须是数组');
  else lesson.marks.forEach((mark, i) => {
    const line = lesson.lines?.find((x) => x.id === mark?.line);
    if (!['circle', 'underline', 'cross'].includes(mark?.kind) || !line || !goodText(mark?.target) || !line.text.includes(mark.target) || typeof mark?.at !== 'number' || typeof mark?.duration !== 'number' || mark.at < line.at + line.duration || mark.duration <= 0 || mark.at + mark.duration > duration) errors.push(`marks[${i}]: 目标或时间无效`);
  });
  if (!Array.isArray(lesson.cues) || !lesson.cues.length) errors.push('cues 至少一条');
  else {
    let end = 0;
    lesson.cues.forEach((cue, i) => {
      const lines = typeof cue?.text === 'string' ? cue.text.split('\n') : [];
      if (!goodText(cue?.text) || lines.length > 2 || lines.some((line) => !goodText(line) || visualWidth(line, 39) > 1490) || typeof cue?.start !== 'number' || typeof cue?.end !== 'number' || cue.start < end || cue.end <= cue.start || cue.end > duration) errors.push(`cues[${i}]: 内容过长或时间无效/重叠`);
      end = cue?.end ?? end;
    });
  }
  if (lesson.audio !== undefined) {
    if (!Array.isArray(lesson.audio)) errors.push('audio 必须是数组');
    else lesson.audio.forEach((track, i) => voiceTrackOk(track, `audio[${i}]`, duration, lessonPath, errors));
  }
  return errors;
}

function validateWriting(lesson, lessonPath) {
  const errors = [];
  if (!goodText(lesson.title) || !goodText(lesson.scope) || !goodText(lesson.question)) errors.push('title、scope、question 必填');
  if (typeof lesson.duration !== 'number' || lesson.duration <= 0 || !Number.isFinite(lesson.duration)) errors.push('duration 无效');
  const duration = lesson.duration || 0;
  if (!Array.isArray(lesson.lines) || lesson.lines.length !== 2) errors.push('lines 需要两条书写句子');
  else {
    const ids = new Set();
    lesson.lines.forEach((line, i) => {
      if (!goodText(line?.id) || ids.has(line.id) || !writingTextOk(line?.text) || line.text.length > 42 || typeof line?.at !== 'number' || typeof line?.duration !== 'number' || line.at < 0 || line.duration < 1 || line.at + line.duration > duration) errors.push(`lines[${i}]: id、英文、时间无效，英文仅支持字母和基本标点`);
      ids.add(line?.id);
    });
  }
  if (!Array.isArray(lesson.marks)) errors.push('marks 必须是数组');
  else lesson.marks.forEach((mark, i) => {
    const line = lesson.lines?.find((x) => x.id === mark?.line);
    if (!['circle', 'underline'].includes(mark?.kind) || !line || !goodText(mark?.target) || !line.text.includes(mark.target) || typeof mark?.at !== 'number' || typeof mark?.duration !== 'number' || mark.at < line.at + line.duration || mark.duration <= 0 || mark.at + mark.duration > duration) errors.push(`marks[${i}]: 目标或时间无效`);
  });
  const correction = lesson.correction;
  const line = lesson.lines?.find((x) => x.id === correction?.line);
  if (!line || !goodText(correction?.target) || !goodText(correction?.removeSuffix) || correction.removeSuffix.length !== 1 || !correction.target.endsWith(correction.removeSuffix) || !line.text.includes(correction.target) || typeof correction?.at !== 'number' || typeof correction?.duration !== 'number' || correction.at <= line.at + line.duration || correction.duration <= 0 || correction.at + correction.duration > duration) errors.push('correction: 擦改目标或时间无效');
  if (!goodText(lesson.conclusion?.text) || typeof lesson.conclusion?.at !== 'number' || lesson.conclusion.at < (correction?.at ?? 0) + (correction?.duration ?? 0) || lesson.conclusion.at >= duration) errors.push('conclusion: 必须在擦改完成后出现');
  if (!Array.isArray(lesson.cues) || !lesson.cues.length) errors.push('cues 至少一条');
  else {
    let last = 0;
    lesson.cues.forEach((cue, i) => {
      if (!goodText(cue?.text) || !['question', 'first', 'second', 'answer'].includes(cue?.place) || typeof cue?.start !== 'number' || typeof cue?.end !== 'number' || cue.start < last || cue.end <= cue.start || cue.end > duration) errors.push(`cues[${i}]: 内容、位置或时间无效/重叠`);
      if (visualWidth(typeof cue?.text === 'string' ? cue.text : '', 32) > 1510) errors.push(`cues[${i}]: 字幕过长`);
      last = cue?.end ?? last;
    });
  }
  if (lesson.audio !== undefined) {
    if (!Array.isArray(lesson.audio)) errors.push('audio 必须是数组');
    else lesson.audio.forEach((track, i) => voiceTrackOk(track, `audio[${i}]`, duration, lessonPath, errors));
  }
  return errors;
}
const tokensOk = (tokens, name, errors) => {
  if (!Array.isArray(tokens) || tokens.length < 1 || tokens.length > 7) {errors.push(`${name}: 需要 1–7 个词块`); return;}
  const ids = new Set();
  tokens.forEach((t, i) => {
    if (!goodText(t?.id) || !goodText(t?.text) || t.text.length > 18 || /[\u4e00-\u9fff]/.test(t.text)) errors.push(`${name}[${i}]: id 和简短英文 text 必填，text 最多 18 字符`);
    if (ids.has(t?.id)) errors.push(`${name}: 重复 id ${t.id}`);
    ids.add(t?.id);
  });
  if (tokens.reduce((n, t) => n + charWidth(t?.text ?? ''), 0) + (tokens.length - 1) * 18 > 1400) errors.push(`${name}: 词块总宽度超过画面，拆成多步`);
};

export function validateLesson(lesson, lessonPath) {
  if (lesson?.format === 'writing-board-v5') return validateWritingV5(lesson, lessonPath);
  if (lesson?.format === 'writing-board-v4') return validateWritingV4(lesson, lessonPath);
  if (lesson?.format === 'writing-board-v3') {
    const errors = validateWritingV2(lesson, lessonPath);
    if (!goodText(lesson.boardFont) || !fs.existsSync(lesson.boardFont)) errors.push('boardFont: 用户提供的本地字体文件不存在');
    return errors;
  }
  if (lesson?.format === 'writing-board-v2') return validateWritingV2(lesson, lessonPath);
  if (lesson?.format === 'writing-board') return validateWriting(lesson, lessonPath);
  const errors = [];
  if (!goodText(lesson?.title) || !goodText(lesson?.scope)) errors.push('title 和 scope 必填');
  if (!Array.isArray(lesson?.beats) || lesson.beats.length === 0) return ['beats 至少一段'];
  lesson.beats.forEach((beat, i) => {
    const name = `beats[${i}]`;
    if (!['compare', 'transform', 'correction', 'takeaway'].includes(beat?.kind)) errors.push(`${name}: kind 不支持`);
    if (typeof beat?.seconds !== 'number' || beat.seconds < 2 || !Number.isFinite(beat.seconds)) errors.push(`${name}: seconds 至少 2 秒`);
    if (!goodText(beat?.heading) || !goodText(beat?.explanation)) errors.push(`${name}: heading 和 explanation 必填`);
    if (visualWidth(typeof beat?.heading === 'string' ? beat.heading : '', 75) > 1630 || visualWidth(typeof beat?.explanation === 'string' ? beat.explanation : '', 34) > 1630 || visualWidth(typeof beat?.note === 'string' ? beat.note : '', 29) > 1630) errors.push(`${name}: 标题、解释或备注过长，请拆成多段`);
    if (!Array.isArray(beat?.cues) || beat.cues.length === 0) errors.push(`${name}: cues 至少一条`);
    else {
      let lastEnd = 0;
      beat.cues.forEach((cue, j) => {
        if (!goodText(cue?.text) || !['zh', 'en'].includes(cue?.lang) || typeof cue?.start !== 'number' || typeof cue?.end !== 'number' || cue.start < lastEnd || cue.end <= cue.start || cue.end > beat.seconds) errors.push(`${name}.cues[${j}]: 文本、语言或时间无效/重叠`);
        if (visualWidth(typeof cue?.text === 'string' ? cue.text : '', cue?.lang === 'en' ? 43 : 39) > 1620) errors.push(`${name}.cues[${j}]: 字幕过长，请拆成两条 cue`);
        lastEnd = cue?.end ?? lastEnd;
      });
    }
    if (beat.kind === 'compare') {
      if (!Array.isArray(beat.rows) || beat.rows.length !== 2) errors.push(`${name}: compare 需要两行`);
      else beat.rows.forEach((row, j) => {if (!goodText(row.label)) errors.push(`${name}.rows[${j}]: label 必填`); tokensOk(row.tokens, `${name}.rows[${j}].tokens`, errors);});
    }
    if (beat.kind === 'transform' || beat.kind === 'correction') {
      tokensOk(beat.from, `${name}.from`, errors);
      tokensOk(beat.to, `${name}.to`, errors);
      if (Array.isArray(beat.from) && Array.isArray(beat.to) && JSON.stringify(beat.from) === JSON.stringify(beat.to)) errors.push(`${name}: 变形前后必须实际不同`);
      if (beat.kind === 'correction' && (!Array.isArray(beat.errorIds) || !beat.errorIds.length || beat.errorIds.some((id) => !beat.from?.some((t) => t.id === id)))) errors.push(`${name}: errorIds 必须指向错误词块`);
    }
    if (beat.kind === 'takeaway' && (!Array.isArray(beat.points) || beat.points.length < 1 || beat.points.length > 3 || beat.points.some((p) => !goodText(p) || p.length > 34))) errors.push(`${name}: points 需要 1–3 条简短判断步骤`);
    if (beat.kind !== 'takeaway' && (!Array.isArray(beat.focusIds) || !beat.focusIds.length)) errors.push(`${name}: focusIds 至少一项`);
    if (Array.isArray(beat.focusIds)) {
      const groups = beat.kind === 'compare' ? beat.rows?.map((r) => r.tokens) : [beat.from, beat.to];
      const known = new Set((groups ?? []).flat().filter(Boolean).map((t) => t.id));
      if (beat.focusIds.some((id) => !known.has(id))) errors.push(`${name}: focusIds 指向不存在的词块`);
    }
    if (beat.audio !== undefined) {
      if (!Array.isArray(beat.audio)) errors.push(`${name}: audio 必须是数组`);
      else beat.audio.forEach((track, j) => {
        if (!['zhNarration', 'enExample'].includes(track?.kind) || !goodText(track?.src) || typeof track?.start !== 'number' || track.start < 0 || track.start >= beat.seconds) errors.push(`${name}.audio[${j}]: kind/src/start 无效`);
        else if (!fs.existsSync(path.resolve(path.dirname(lessonPath), track.src))) errors.push(`${name}.audio[${j}]: 本地录音不存在 ${track.src}`);
      });
    }
  });
  return errors;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const input = process.argv[2];
  if (!input) {console.error('用法: node scripts/validate.mjs <lesson.json>'); process.exit(2);}
  try {
    const lessonPath = path.resolve(input);
    const errors = validateLesson(JSON.parse(fs.readFileSync(lessonPath, 'utf8')), lessonPath);
    if (errors.length) {console.error(errors.join('\n')); process.exit(1);}
    console.log(`课程校验通过：${lessonPath}`);
  } catch (error) {console.error(error.message); process.exit(1);}
}
