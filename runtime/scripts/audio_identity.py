"""Separate TTS generation identity from content-addressed postprocessing identity."""
import hashlib
import json
import math
from course_text import spoken_text
VOICE_VERSION = 'qwen3-tts-custom-or-base-offline-v1'
PROCESS_VERSION = 'trim-rms-002-pad-080-normalize-105-085-mp3-128k-v1'
PAUSE_PROCESS_VERSION = PROCESS_VERSION + '-local-energy-guard-v2'

def digest(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True, ensure_ascii=False, separators=(',', ':')).encode()).hexdigest()

def cue_input_data(cue, tts, voice, model_id, model_digest):
    data = {'version': VOICE_VERSION, 'text': spoken_text(cue), 'lang': cue['lang'],
            'modelId': model_id, 'modelDigest': model_digest, 'voice': voice,
            'temperature': tts.get('temperature', .85), 'maxTokens': tts.get('maxTokens', 900)}
    if tts.get('seed') is not None: data['seed'] = tts['seed']
    return data

def processing_identity(cue):
    pause = cue.get('pauseShorten')
    if pause is not None:
        if not isinstance(pause, dict) or set(pause) != {'start', 'end', 'targetSeconds'}:
            raise ValueError('pauseShorten needs start/end/targetSeconds on the trimmed, pre-normalized timeline')
        if any(isinstance(v, bool) or not isinstance(v, (int, float)) or not math.isfinite(v) for v in pause.values()):
            raise ValueError('pauseShorten values must be finite seconds')
        if not (0 < pause['start'] < pause['end'] and 0 < pause['targetSeconds'] < pause['end']-pause['start']):
            raise ValueError('invalid pauseShorten interval')
    return {'version': PAUSE_PROCESS_VERSION if pause is not None else PROCESS_VERSION, 'pauseShorten': pause}

def postprocess_key(raw_sha, cue):
    identity = processing_identity(cue)
    # Preserve legacy ready-cache keys when no pause edit is requested.
    return digest({'rawSha256': raw_sha, 'processing': identity['version'], 'pauseShorten': identity['pauseShorten']})

def legacy_input_key(generation_identity, pause):
    return digest({**generation_identity, 'pauseShorten': pause, 'processing': PROCESS_VERSION})
