// Half-open activity intervals: retained board ink and narration are not actions.
export const inkActions = (lesson) => ['writes', 'marks', 'sketches'].flatMap((key, i) =>
  (lesson[key] ?? []).map((action) => ({...action, kind: ['write', 'mark', 'sketch'][i]})));
export const inkOverlaps = (lesson) => {
  const actions = inkActions(lesson).filter(a => Number.isFinite(a.at) && Number.isFinite(a.duration) && a.duration > 0)
    .sort((a, b) => a.at - b.at);
  const pairs = [];
  for (let i = 0; i < actions.length; i++) for (let j = i + 1; j < actions.length; j++) {
    if (actions[j].at >= actions[i].at + actions[i].duration - 1e-9) break;
    pairs.push([actions[i], actions[j]]);
  }
  return pairs;
};
export const activeInkActions = (lesson, time) => inkActions(lesson)
  .filter(a => time >= a.at && time < a.at + a.duration);
