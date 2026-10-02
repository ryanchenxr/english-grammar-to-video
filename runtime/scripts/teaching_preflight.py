"""Deterministic source checks before synthesis; not semantic or listening approval."""
import json
import math
import re
from course_text import spoken_text

ING = re.compile(r'(?<![A-Za-z])ing(?![A-Za-z])', re.I)
SPELLING = re.compile(r'(?<![A-Za-z])I[\s、，,·.\-]+N[\s、，,·.\-]+G(?![A-Za-z])', re.I)
PHONETIC = re.compile(r'[/\[]ɪŋ[/\]]')
WORDS = re.compile(r'(?<![A-Za-z])[A-Za-z]+ing(?![A-Za-z])', re.I)


def teaching_issues(source, durations=None):
    issues = []
    def issue(code, cue, message):
        issues.append({'code': code, 'cueId': cue, 'message': message})
    cues = source.get('cues', [])
    for cue in cues:
        cid = cue.get('id')
        try:
            actual = spoken_text(cue)
        except ValueError as exc:
            issue('invalid-spoken-text', cid, str(exc)); continue
        display = cue['text']
        # Preserve full English words even inside a Chinese explanation.
        for word in set(WORDS.findall(display)):
            if len(re.findall(r'(?<![A-Za-z])'+re.escape(word)+r'(?![A-Za-z])', actual, re.I)) < len(re.findall(r'(?<![A-Za-z])'+re.escape(word)+r'(?![A-Za-z])', display, re.I)):
                issue('whole-word-changed', cid, f'完整单词 {word} 应正常朗读，不拆成字母；同步核对 text 与 spokenText 的教学含义。')
        if cue.get('lang') != 'zh' or not ING.search(display):
            continue
        count = len(ING.findall(display))
        explicit = len(SPELLING.findall(actual))
        # Phonetics is a different teaching intent, not a blanket exemption.
        if re.search(r'发音|读音|音标|音节', display):
            explicit += len(PHONETIC.findall(actual))
        if 'spokenText' not in cue or ING.search(actual) or explicit < count:
            issue('ambiguous-ing', cid, '独立 ing 的实际读法未明确：字母构成使用 spokenText 中的 I、N、G；讲词尾发音时明确音标及真实教学意图并短试听。不要全局替换完整单词。')

    if not cues:
        issue('missing-opening', None, '课程缺少开场 cue。'); return issues
    writes = source.get('writes', [])
    # Use existing write IDs/anchors; one optional pointer handles arbitrary title IDs.
    title_id = source.get('openingTitleId')
    titles = [w for w in writes if w.get('id') == title_id] if title_id else [
        w for w in writes if w.get('id') in ('title', 'heading') or w.get('text') == source.get('title')]
    if len(titles) != 1:
        issue('opening-title-unresolved', cues[0].get('id'), '明确现有标题 writes 对象：使用 title/heading ID，或 openingTitleId 指向其 ID；审校开场台词是否介绍概念和问题。')
        return issues
    title = titles[0]
    indices = {c['id']: i for i, c in enumerate(cues)}
    anchor = title.get('anchor'); index = indices.get(anchor)
    first_example = next((i for i,c in enumerate(cues) if c.get('lang') == 'en'), len(cues))
    if index is None or index >= first_example or cues[index].get('section') != cues[0].get('section') or cues[index].get('lang') != 'zh':
        issue('late-opening-title', anchor, f'标题 {title["id"]} 未锚定开场 section 的中文介绍，或已晚于英文例句。先介绍概念与具体问题，再进入情境；修正实际台词与标题 anchor。')
    offset = title.get('offset', 0)
    if not isinstance(offset, (int, float)) or isinstance(offset, bool) or not math.isfinite(offset) or offset < 0:
        issue('invalid-title-offset', anchor, '标题 offset 应为非负秒数，随对应介绍开始书写。')
    elif durations is not None and anchor in durations and offset >= durations[anchor]:
        issue('title-after-introduction', anchor, f'标题 {title["id"]} 的 offset={offset} 已超出对应介绍录音 {durations[anchor]} 秒；按实际音长修正。')
    return issues


def require_teaching_ready(source, durations=None):
    issues = teaching_issues(source, durations)
    if issues:
        raise ValueError(json.dumps({'status': 'teaching-preflight-failed', 'issues': issues,
            'nextAction': 'Agent 审校并修改课程数据后重试；不把技术修正交给老师。明确要求原样保留的历史课程不自动改写，保留旧版本并说明当前检查限制。',
            'scope': '结构与显式读法检查，不代表语义质量或听感通过'}, ensure_ascii=False))
