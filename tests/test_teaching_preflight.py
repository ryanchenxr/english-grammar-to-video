"""Run with python3 -m unittest discover -s tests; no models or audio generation."""
import copy
import json
from pathlib import Path
import sys
import unittest
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'runtime/scripts'))
from teaching_preflight import teaching_issues, require_teaching_ready

EXAMPLE = json.loads((Path(__file__).resolve().parents[1] / 'examples/teaching-review.json').read_text())

class TeachingPreflightTest(unittest.TestCase):
    def good(self): return copy.deepcopy(EXAMPLE['after'])
    def codes(self, source, durations=None): return [i['code'] for i in teaching_issues(source, durations)]

    def test_reported_old_opening_and_five_ing_cues(self):
        source=copy.deepcopy(EXAMPLE['before'])
        source['cues'] += [{'id':f'ing-{i}','lang':'zh','text':text} for i,text in enumerate([
            '这里使用 V-ing。','be 加动词 ing。','词尾 ing 不能少。','把 ing 加到动词后面。'])]
        problems=teaching_issues(source)
        self.assertEqual(sum(p['code']=='ambiguous-ing' for p in problems),5)
        self.assertIn('late-opening-title',[p['code'] for p in problems])
        self.assertEqual(next(p['cueId'] for p in problems if p['code']=='late-opening-title'),'concept')

    def test_corrected_source(self): require_teaching_ready(self.good())
    def test_natural_openings(self):
        for text in ['现在进行时，能帮我们说清此刻正在做的事。','如何描述眼前的动作？现在进行时正适合。','这节小课用现在进行时，回答你此刻在做什么。']:
            s=self.good();s['cues'][0]['text']=text;require_teaching_ready(s)

    def test_empty_and_ineffective_spoken_text(self):
        for value in ['', ' ', '动词后面加 ing。', '好好学习。', '动词后面加 ing，也就是 I、N、G。']:
            s=self.good();s['cues'][-1]['spokenText']=value;s['reviewed']=True
            self.assertTrue(teaching_issues(s), value)

    def test_review_flag_cannot_bypass(self):
        s=copy.deepcopy(EXAMPLE['before']);s['reviewed']=True
        self.assertIn('ambiguous-ing',self.codes(s))

    def test_full_words_and_adjacent_chinese(self):
        s=self.good();s['cues'][-1]={'id':'words','lang':'zh','text':'playing、doing、writing和swimming都是完整单词。'}
        require_teaching_ready(s)
        s['cues'][-1]['spokenText']='p、l、a、y、I、N、G、doing、writing和swimming都是完整单词。'
        self.assertIn('whole-word-changed',self.codes(s))

    def test_phonetic_intent_is_not_letter_spelling(self):
        s=self.good();s['cues'][-1]={'id':'sound','lang':'zh','text':'词尾 ing 的发音。','spokenText':'词尾 /ɪŋ/ 的发音。'}
        require_teaching_ready(s)
        s['cues'][-1]['spokenText']=s['cues'][-1]['text']
        self.assertIn('ambiguous-ing',self.codes(s))

    def test_each_occurrence_requires_reading(self):
        s=self.good();s['cues'][-1].update(text='加 ing，保留 ing。',spokenText='加 I、N、G。')
        self.assertIn('ambiguous-ing',self.codes(s))

    def test_arbitrary_title_id_resolves_actual_anchor(self):
        s=self.good();s['writes'][0].update(id='topic-cn',text='本课概念');s['openingTitleId']='topic-cn';require_teaching_ready(s)
        s['openingTitleId']='does-not-exist';self.assertIn('opening-title-unresolved',self.codes(s))

    def test_opening_has_no_fixed_cue_count(self):
        s=self.good()
        s['cues'].insert(0,{'id':'hello','section':'intro','lang':'zh','text':'大家好。'})
        s['writes'][0]['anchor']='h1'
        require_teaching_ready(s)

    def test_title_offset_is_finite(self):
        for value in [float('nan'),float('inf'),-1,True]:
            s=self.good();s['writes'][0]['offset']=value
            self.assertIn('invalid-title-offset',self.codes(s))

    def test_measured_title_offset_rechecked(self):
        s=self.good();s['writes'][0]['offset']=15.51
        self.assertIn('title-after-introduction',self.codes(s,{'h0':3.4}))

if __name__=='__main__': unittest.main()
