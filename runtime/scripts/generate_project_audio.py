#!/usr/bin/env python3
"""Offline Qwen3-TTS generation into the existing project resource registry."""
import argparse
import hashlib
import json
import os
import shutil
import subprocess
import time
import uuid
from pathlib import Path

import numpy as np
import soundfile as sf
from huggingface_hub import snapshot_download
from storage import atomic, iso, now, sha, safe_path
from course_text import spoken_text

PROCESS_VERSION = 'trim-rms-002-pad-080-normalize-105-085-mp3-128k-v1'
VOICE_VERSION = 'qwen3-tts-custom-or-base-offline-v1'


def digest(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True, ensure_ascii=False, separators=(',', ':')).encode()).hexdigest()


def local_model(model_id, source):
    if source == 'modelscope':
        from modelscope import snapshot_download as ms_snapshot_download
        path = Path(ms_snapshot_download(model_id, local_files_only=True))
    else:
        path = Path(snapshot_download(model_id, local_files_only=True))
    files = [[str(p.relative_to(path)), sha(p)] for p in sorted(path.rglob('*'))
             if p.is_file() and p.suffix in ('.safetensors', '.json')]
    if not files:
        raise ValueError('local model cache is incomplete; run prepare --download-model')
    return path, digest(files)


def valid_resource(workspace, registry, rid):
    item = registry['resources'].get(rid)
    if not item or item.get('status', 'active') != 'active':
        return None
    path = safe_path(workspace, item['path'])
    if not path.is_file() or path.stat().st_size != item['bytes'] or sha(path) != item['sha256']:
        return None
    return path


def process(raw, wav, mp3, pause=None):
    audio, sr = sf.read(raw)
    if sr != 24000:
        raise ValueError(f'Qwen sample rate changed: {sr}')
    width = int(.02 * sr)
    envelope = np.array([np.sqrt(np.mean(audio[j:j + width] ** 2)) for j in range(0, len(audio), width)])
    active = np.where(envelope > .002)[0]
    if not len(active):
        raise ValueError('silent TTS output')
    begin = max(0, int((active[0] * .02 - .08) * sr))
    end = min(len(audio), int(((active[-1] + 1) * .02 + .08) * sr))
    clean = audio[begin:end]
    if pause:
        a = int(pause['start'] * sr); b = int(pause['end'] * sr); target = pause['targetSeconds']
        if not (0 < a < b < len(clean) and 0 < target < (b - a) / sr):
            raise ValueError('invalid pause edit')
        removal = int(((b - a) / sr - target) * sr)
        cut = a + ((b - a) - removal) // 2
        if float(np.sqrt(np.mean(clean[cut:cut + removal] ** 2))) > .01:
            raise ValueError('pause edit would remove speech')
        clean = np.concatenate((clean[:cut], clean[cut + removal:]))
    rms = float(np.sqrt(np.mean(clean * clean))); peak = float(np.max(np.abs(clean)))
    gain = min(.105 / max(rms, 1e-7), .85 / max(peak, 1e-7))
    clean = (clean * gain).astype(np.float32)
    sf.write(wav, clean, sr)
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', str(wav),
                    '-codec:a', 'libmp3lame', '-b:a', '128k', str(mp3)], check=True)
    return {'rawSeconds': round(len(audio) / sr, 3), 'cleanSeconds': round(len(clean) / sr, 3), 'gain': round(gain, 3)}


def save_unique(source, folder):
    content_hash = sha(source)
    target = folder / f'{content_hash}{source.suffix}'
    folder.mkdir(parents=True, exist_ok=True)
    if target.exists():
        if sha(target) != content_hash:
            raise ValueError(f'content collision: {target}')
    else:
        shutil.copy2(source, target)
    return content_hash, target


def cue_input_data(cue, tts, voice, model_id, model_digest):
    # Keep legacy keys unchanged when spokenText is absent; hash the actual TTS input.
    data = {'version': VOICE_VERSION, 'text': spoken_text(cue), 'lang': cue['lang'],
            'modelId': model_id, 'modelDigest': model_digest, 'voice': voice,
            'temperature': tts.get('temperature', .85), 'maxTokens': tts.get('maxTokens', 900),
            'pauseShorten': cue.get('pauseShorten'), 'processing': PROCESS_VERSION}
    if tts.get('seed') is not None:
        data['seed'] = tts['seed']
    return data


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--project', required=True)
    action = ap.add_mutually_exclusive_group(required=True)
    action.add_argument('--inspect', action='store_true')
    action.add_argument('--generate', action='store_true')
    args = ap.parse_args()
    started = time.perf_counter()
    project_dir = Path(args.project).resolve(); workspace = project_dir.parent.parent
    project = json.loads((project_dir / 'project.json').read_text())
    registry_path = project_dir / 'resources.json'; registry = json.loads(registry_path.read_text())
    source_dir = project_dir / 'source'
    course = json.loads((source_dir / 'course-source.json').read_text())
    voice_path = source_dir / 'voice-generation.json'
    previous = json.loads(voice_path.read_text()) if voice_path.exists() else {'clips': []}
    prior = {x['cueId']: x for x in previous['clips']}
    tts = project['tts']; mode = tts['mode']; model_id = tts['modelId']
    if mode not in ('preset', 'clone'):
        raise ValueError('unsupported voice mode')
    reference = None
    profile = None
    profile_path = None
    reference_mode = None
    reference_text = None
    if mode == 'clone':
        reference = valid_resource(workspace, registry, project['voiceWorkingReferenceResourceId'])
        if reference is None:
            raise ValueError('explicit reference audio unavailable or changed')
        reference_text = tts.get('referenceText')
        reference_mode = tts.get('referenceMode', 'icl' if reference_text else 'speaker-embedding-only')
        if reference_mode not in ('speaker-embedding-only', 'icl'):
            raise ValueError('unsupported reference mode')
        if reference_mode == 'icl' and not reference_text:
            raise ValueError('ICL reference mode requires a verified referenceText')
        if reference_mode == 'speaker-embedding-only' and reference_text is not None:
            raise ValueError('speaker-embedding-only mode must not claim a referenceText')
        if tts.get('voiceProfileResourceId'):
            profile_path = valid_resource(workspace, registry, tts['voiceProfileResourceId'])
            if profile_path is None:
                raise ValueError('fixed voice profile unavailable or changed')
            profile = json.loads(profile_path.read_text())
            expected_ref = profile.get('reference', {})
            if (profile.get('schemaVersion') != 1 or profile.get('route') != 'base-clone'
                    or profile.get('modelId') != model_id
                    or profile.get('modelSource') != tts.get('modelSource')
                    or profile.get('referenceMode') != reference_mode
                    or profile.get('referenceText') != reference_text
                    or profile.get('temperature') != tts.get('temperature')
                    or profile.get('maxTokens') != tts.get('maxTokens')
                    or profile.get('seed') != tts.get('seed')
                    or expected_ref.get('sha256') != sha(reference)
                    or safe_path(workspace, expected_ref.get('path', '')) != reference):
                raise ValueError('fixed voice profile does not match project configuration or reference')
    model_path, model_digest = local_model(model_id, tts.get('modelSource', 'huggingface'))
    if profile and profile.get('modelDigest') != model_digest:
        raise ValueError('fixed voice profile pinned model differs from local model')
    voice = {'mode': mode, 'speaker': tts.get('speaker') if mode == 'preset' else None,
             'referenceSha256': sha(reference) if reference else None}
    if mode == 'clone':
        voice.update({'referenceMode': reference_mode,
                      'referenceTextSha256': hashlib.sha256(reference_text.encode()).hexdigest() if reference_text else None,
                      'voiceProfileSha256': sha(profile_path) if profile_path else None})
    resolved = []; missing = []
    for cue in course['cues']:
        key_data = cue_input_data(cue, tts, voice, model_id, model_digest)
        input_key = digest(key_data)
        item = prior.get(cue['id'])
        ids = ((item or {}).get('originalResourceId'), (item or {}).get('readyWavResourceId'),
               (item or {}).get('readyMp3ResourceId'))
        if item and item.get('text') == cue['text'] and item.get('lang') == cue['lang'] and item.get('spokenText', item.get('text')) == spoken_text(cue) and item.get('inputKey') == input_key and all(valid_resource(workspace, registry, rid) for rid in ids):
            resolved.append((cue, item))
        else:
            missing.append((cue, input_key))
    if args.inspect:
        print(json.dumps({'status': 'inspected', 'projectId': project['projectId'], 'cachedCues': len(resolved),
                          'missingCues': [x['id'] for x, _ in missing], 'modelId': model_id,
                          'mode': mode, 'referenceMode': reference_mode,
                          'voiceProfileResourceId': tts.get('voiceProfileResourceId'),
                          'seconds': round(time.perf_counter() - started, 3)}, ensure_ascii=False))
        return
    run_id = 'tts-' + now().strftime('%Y%m%dT%H%M%S') + '-' + uuid.uuid4().hex[:8]
    run_dir = project_dir / 'work' / 'runs' / run_id; run_dir.mkdir(parents=True, exist_ok=False)
    run_path = run_dir / 'run.json'; started_at = iso(now())
    atomic(run_path, {'runId': run_id, 'state': 'active', 'startedAt': started_at, 'resourceIds': []})
    temp = run_dir / 'tmp'; temp.mkdir()
    records = {cue['id']: item for cue, item in resolved}; generated_ids = set()
    try:
        model = None; load_seconds = 0; generation_seconds = 0; prompt_seconds = 0; clone_prompt = None
        for cue, input_key in missing:
            if model is None:
                from qwen_tts import Qwen3TTSModel
                import torch
                device = 'mps' if torch.backends.mps.is_available() else 'cuda:0' if torch.cuda.is_available() else 'cpu'
                load_start = time.perf_counter()
                model = Qwen3TTSModel.from_pretrained(str(model_path), device_map=device,
                    dtype=torch.float32 if device in ('mps', 'cpu') else torch.bfloat16,
                    attn_implementation='eager')
                load_seconds = time.perf_counter() - load_start
                if mode == 'clone':
                    if model.model.tts_model_type != 'base':
                        raise ValueError('fixed reference requires a Qwen Base model')
                    prompt_start = time.perf_counter()
                    clone_prompt = model.create_voice_clone_prompt(
                        ref_audio=str(reference), ref_text=reference_text,
                        x_vector_only_mode=reference_mode == 'speaker-embedding-only')
                    if len(clone_prompt) != 1 or clone_prompt[0].x_vector_only_mode != (reference_mode == 'speaker-embedding-only'):
                        raise ValueError('clone prompt mode differs from fixed voice profile')
                    prompt_seconds = time.perf_counter() - prompt_start
            generation_start = time.perf_counter()
            language = 'English' if cue['lang'] == 'en' else 'Chinese'
            kwargs = {'text': spoken_text(cue), 'language': language, 'max_new_tokens': tts.get('maxTokens', 900),
                      'temperature': tts.get('temperature', .85)}
            if tts.get('seed') is not None:
                import torch
                torch.manual_seed(tts['seed'])
                np.random.seed(tts['seed'])
            if mode == 'preset':
                wavs, sr = model.generate_custom_voice(**kwargs, speaker=tts['speaker'])
            else:
                wavs, sr = model.generate_voice_clone(**kwargs, voice_clone_prompt=clone_prompt)
            generation_seconds += time.perf_counter() - generation_start
            audio = np.asarray(wavs[0], dtype=np.float32).reshape(-1)
            if not len(audio) or not np.isfinite(audio).all():
                raise ValueError(f'invalid output {cue["id"]}')
            raw = temp / f'{cue["id"]}-raw.wav'; wav = temp / f'{cue["id"]}-ready.wav'; mp3 = temp / f'{cue["id"]}-ready.mp3'
            sf.write(raw, audio, sr)
            metadata = process(raw, wav, mp3, cue.get('pauseShorten'))
            raw_id, raw_dest = save_unique(raw, project_dir / 'audio/originals')
            wav_id, wav_dest = save_unique(wav, project_dir / 'audio/ready')
            mp3_id, mp3_dest = save_unique(mp3, project_dir / 'audio/ready')
            for rid, dest, role in ((raw_id, raw_dest, 'tts-original'), (wav_id, wav_dest, 'tts-ready-wav'),
                                    (mp3_id, mp3_dest, 'tts-ready-mp3')):
                generated_ids.add(rid)
                registry['resources'].setdefault(rid, {'path': str(dest.relative_to(workspace)), 'sha256': rid,
                    'bytes': dest.stat().st_size, 'role': role, 'status': 'active', 'registeredAt': iso(now()),
                    'unreferencedSince': None})
            records[cue['id']] = {'cueId': cue['id'], 'text': cue['text'], 'spokenText': spoken_text(cue), 'lang': cue['lang'], 'inputKey': input_key,
                'rawSha256': raw_id, 'cleanKey': digest({'rawSha256': raw_id, 'processing': PROCESS_VERSION,
                    'pauseShorten': cue.get('pauseShorten')}), **metadata, 'originalResourceId': raw_id,
                'readyWavResourceId': wav_id, 'readyMp3ResourceId': mp3_id,
                'src': os.path.relpath(mp3_dest, source_dir)}
        clips = [records[c['id']] for c in course['cues']]
        output = {'modelId': model_id, 'modelDigest': model_digest, 'mode': mode,
            'speaker': tts.get('speaker') if mode == 'preset' else None,
            'referenceSha256': sha(reference) if reference else None,
            'referenceMode': reference_mode,
            'referenceTextSha256': hashlib.sha256(reference_text.encode()).hexdigest() if reference_text else None,
            'voiceProfileResourceId': tts.get('voiceProfileResourceId'),
            'voiceProfileSha256': sha(profile_path) if profile_path else None,
            'seed': tts.get('seed'), 'clips': clips}
        for temporary in temp.iterdir():
            tid = f'run-temp:{run_id}:{temporary.name}'
            registry['resources'][tid] = {'path': str(temporary.relative_to(workspace)), 'sha256': sha(temporary),
                'bytes': temporary.stat().st_size, 'role': 'temp-encode', 'status': 'active',
                'registeredAt': iso(now()), 'unreferencedSince': iso(now()), 'runId': run_id}
        atomic(registry_path, registry); atomic(voice_path, output)
        timings = {'modelLoadSeconds': round(load_seconds, 3), 'promptSeconds': round(prompt_seconds, 3),
                   'generationSeconds': round(generation_seconds, 3),
                   'totalSeconds': round(time.perf_counter() - started, 3)}
        atomic(run_path, {'runId': run_id, 'state': 'completed', 'startedAt': started_at,
                          'completedAt': iso(now()), 'resourceIds': sorted(generated_ids),
                          'generatedCueIds': [x['id'] for x, _ in missing], 'timings': timings})
        print(json.dumps({'status': 'completed', 'runId': run_id, 'generatedCueIds': [x['id'] for x, _ in missing],
                          'cachedCues': len(resolved), 'voiceManifest': str(voice_path), 'timings': timings}, ensure_ascii=False))
    except Exception as exc:
        atomic(run_path, {'runId': run_id, 'state': 'failed', 'resolved': False, 'startedAt': started_at,
                          'completedAt': iso(now()), 'resourceIds': [], 'error': str(exc)})
        raise


if __name__ == '__main__':
    main()
