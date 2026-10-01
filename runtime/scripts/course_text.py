"""Resolve optional pronunciation input without changing display/subtitle text."""

def spoken_text(cue):
    for field in ('text', 'spokenText'):
        if field in cue and (not isinstance(cue[field], str) or not cue[field].strip()):
            raise ValueError(f'{cue.get("id")}: {field} must be a nonempty string')
    if 'text' not in cue:
        raise ValueError(f'{cue.get("id")}: text is required')
    return cue.get('spokenText', cue['text'])
