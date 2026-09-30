#!/usr/bin/env python3
"""Generate three short offline probes with the public preset voice."""
import argparse
import json
import time
from pathlib import Path

import numpy as np
import soundfile as sf
import torch
from huggingface_hub import snapshot_download
from qwen_tts import Qwen3TTSModel

MODEL = 'Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice'

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--output', required=True)
    ap.add_argument('--speaker', default='Vivian')
    ap.add_argument('--model-source', choices=['huggingface', 'modelscope'], default='huggingface')
    args = ap.parse_args()
    output = Path(args.output).expanduser().resolve()
    output.mkdir(parents=True, exist_ok=True)
    started = time.perf_counter()
    if args.model_source == 'modelscope':
        from modelscope import snapshot_download as ms_snapshot_download
        model_path = ms_snapshot_download(MODEL, local_files_only=True)
    else:
        model_path = snapshot_download(MODEL, local_files_only=True)
    device = 'mps' if torch.backends.mps.is_available() else 'cuda:0' if torch.cuda.is_available() else 'cpu'
    model = Qwen3TTSModel.from_pretrained(model_path, device_map=device,
        dtype=torch.float32 if device in ('mps', 'cpu') else torch.bfloat16, attn_implementation='eager')
    load = time.perf_counter() - started
    cases = [('zh', 'Chinese', '今天我们练习一个英语句子。'),
             ('en', 'English', 'She is reading a book.'),
             ('mixed', 'Chinese', '比如，She is reading a book，这表示她现在正在读。')]
    results = []
    for name, language, sentence in cases:
        t = time.perf_counter()
        wavs, rate = model.generate_custom_voice(text=sentence, language=language, speaker=args.speaker,
                                                   max_new_tokens=900, temperature=.85)
        wave = np.asarray(wavs[0], dtype=np.float32).reshape(-1)
        if not len(wave) or not np.isfinite(wave).all():
            raise ValueError(f'empty or nonfinite voice: {name}')
        path = output / f'{name}.wav'
        sf.write(path, wave, rate)
        results.append({'name': name, 'path': str(path), 'seconds': round(len(wave) / rate, 3),
                        'generationSeconds': round(time.perf_counter() - t, 3),
                        'peak': round(float(np.max(np.abs(wave))), 4)})
    report = {'status': 'completed', 'model': MODEL, 'speaker': args.speaker, 'device': device,
              'loadSeconds': round(load, 3), 'totalSeconds': round(time.perf_counter() - started, 3), 'probes': results}
    (output / 'voice-probe.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(report, ensure_ascii=False))

if __name__ == '__main__':
    main()
