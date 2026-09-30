import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {BoardLesson, type BoardLessonData} from './board-lesson';

const sample: BoardLessonData = {
  format: 'writing-board-v5', title: 'Grammar Lesson', audience: '', scope: 'Preview shell',
  boardFont: '', duration: 1, boardWidth: 1920, boardHeight: 1080,
  sections: [{id: 'empty', at: 0}], shots: [{id: 'empty', at: 0, duration: 0, x: 960, y: 455, zoom: 1}],
  writes: [], marks: [], sketches: [], cues: [], audio: [],
};

registerRoot(() => <Composition
  id="GrammarLesson" component={BoardLesson} width={1920} height={1080} fps={30}
  defaultProps={sample} durationInFrames={30}
  calculateMetadata={({props}) => ({durationInFrames: Math.round(props.duration * 30)})}
/>);
