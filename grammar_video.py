#!/usr/bin/env python3
"""Portable command entry for the English grammar video beta package."""
import argparse
import hashlib
import json
import os
import platform
import re
import shutil
import subprocess
import sys
import time
import uuid
from pathlib import Path

PACKAGE = Path(__file__).resolve().parent
RUNTIME = PACKAGE / 'runtime'
MODEL_PRESET = 'Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice'
MODEL_CLONE = 'Qwen/Qwen3-TTS-12Hz-0.6B-Base'
TOKENIZER = 'Qwen/Qwen3-TTS-Tokenizer-12Hz'
DEFAULT_FONT = PACKAGE / 'assets/fonts/字制区喜脉喜欢体.ttf'
DEFAULT_FONT_SHA256 = 'c58efc62318fd681c59ad88689200fb766905a63b91d72bd9b4a1016844cf85b'
DEFAULT_FEMALE = 'teaching-female-fixed-v1'
DEFAULT_MALE = 'teaching-male-synthetic-intro-v1'
BUNDLED_VOICES = (DEFAULT_FEMALE, DEFAULT_MALE)


def report(**data):
    print(json.dumps(data, ensure_ascii=False, indent=2))


def hash_file(path):
    h = hashlib.sha256()
    with path.open('rb') as stream:
        for block in iter(lambda: stream.read(1048576), b''):
            h.update(block)
    return h.hexdigest()


def runtime_files():
    return {str(path.relative_to(RUNTIME)).replace(os.sep, '/'): hash_file(path)
            for path in sorted(RUNTIME.rglob('*')) if path.is_file() and 'node_modules' not in path.parts
            and '__pycache__' not in path.parts and path.suffix != '.pyc'
            and path.name != 'runtime.json'}


def runtime_identity():
    files = runtime_files()
    digest = hashlib.sha256(json.dumps(files, sort_keys=True).encode()).hexdigest()
    return f'grammar-public-{digest[:16]}', digest, files


def workspace_path(value):
    root = Path(value).expanduser().resolve()
    if root == PACKAGE or PACKAGE.is_relative_to(root):
        raise ValueError('workspace must be independent of the installed package')
    return root


def env_python(workspace):
    root = workspace / '.grammar-env'
    return root / ('Scripts/python.exe' if os.name == 'nt' else 'bin/python')


def installation(workspace):
    path = workspace / 'skill-install.json'
    if not path.is_file():
        raise ValueError(f'not prepared: {path}')
    data = json.loads(path.read_text())
    release = workspace / 'library/runtimes' / data['runtimeReleaseId']
    manifest = json.loads((release / 'runtime.json').read_text())
    for relative, expected in manifest['files'].items():
        target = release / relative
        if not target.is_file() or hash_file(target) != expected:
            raise ValueError(f'pinned runtime changed: {relative}')
    return data, release


def run(command, *, env=None, cwd=None):
    result = subprocess.run([str(x) for x in command], env=env, cwd=cwd)
    if result.returncode:
        raise RuntimeError(f'command failed ({result.returncode}): {command[0]}')


def doctor(args):
    workspace = workspace_path(args.workspace)
    system = platform.system(); arch = platform.machine()
    commands = {name: shutil.which(name) for name in ('node', 'npm', 'ffmpeg', 'uv')}
    py = env_python(workspace)
    if system == 'Darwin':
        memory_probe = subprocess.run(['sysctl', '-n', 'hw.memsize'], capture_output=True, text=True)
        memory_bytes = int(memory_probe.stdout.strip()) if memory_probe.returncode == 0 else None
    elif py.is_file():
        memory_probe = subprocess.run([str(py), '-c', 'import psutil;print(psutil.virtual_memory().total)'],
                                      capture_output=True, text=True)
        memory_bytes = int(memory_probe.stdout.strip()) if memory_probe.returncode == 0 else None
    else:
        memory_bytes = None
    checks = {'supportedOS': system in ('Darwin', 'Windows'), 'supportedArch': arch in ('arm64', 'x86_64', 'AMD64'),
              'node': bool(commands['node']), 'npm': bool(commands['npm']), 'ffmpeg': bool(commands['ffmpeg']),
              'preparedPython': py.is_file()}
    try:
        data, release = installation(workspace)
        checks['runtime'] = True
        checks['nodeDependencies'] = (release / 'node_modules/@remotion/cli/remotion-cli.js').exists()
    except Exception:
        data = None; checks['runtime'] = False; checks['nodeDependencies'] = False
    if py.is_file():
        result = subprocess.run([str(py), '-c', 'import PIL,numpy,soundfile,scipy,fontTools,qwen_tts,torch,huggingface_hub'],
                                capture_output=True, text=True)
        checks['pythonDependencies'] = result.returncode == 0
        if result.returncode == 0:
            hardware = subprocess.run([str(py), '-c',
                'import torch,json; print(json.dumps({"mps":torch.backends.mps.is_available(),"cuda":torch.cuda.is_available()}))'],
                capture_output=True, text=True)
            try: gpu = json.loads(hardware.stdout)
            except Exception: gpu = {'mps': False, 'cuda': False}
            model_ids = data.get('preparedModelIds', [MODEL_PRESET, TOKENIZER]) if data else [MODEL_PRESET, TOKENIZER]
            cache_code = ('import sys; from modelscope import snapshot_download; '
                '[snapshot_download(model, local_files_only=True) for model in sys.argv[1:]]'
                if data and data.get('modelSource') == 'modelscope' else
                'import sys; from huggingface_hub import snapshot_download; '
                '[snapshot_download(model, local_files_only=True) for model in sys.argv[1:]]')
            cached = subprocess.run([str(py), '-c', cache_code, *model_ids],
                capture_output=True, text=True)
            checks['modelCache'] = cached.returncode == 0
        else: gpu = None
    else: checks['pythonDependencies'] = False; gpu = None
    checks.setdefault('modelCache', False)
    runtime_version = subprocess.run([str(py), '--version'], capture_output=True, text=True).stdout.strip() if py.is_file() else None
    report(status='ready' if all(checks.values()) else 'needs-preparation', os=system, architecture=arch,
           processor=platform.processor(), memoryBytes=memory_bytes, launcherPython=sys.version.split()[0],
           runtimePython=runtime_version, commands=commands,
           checks=checks, accelerator=gpu, workspace=str(workspace), runtimeReleaseId=data['runtimeReleaseId'] if data else None)


def model_size(model_id, source, py):
    if source == 'modelscope':
        code = ('import json,sys; from modelscope.hub.api import HubApi; '
            'files=HubApi().get_model_files(sys.argv[1]); '
            'print(json.dumps({"bytes":sum(x.get("Size",0) or 0 for x in files),"revision":"ModelScope current"}))')
    else:
        code = ('import json,sys; from huggingface_hub import HfApi; '
            'info=HfApi().model_info(sys.argv[1],files_metadata=True); '
            'print(json.dumps({"bytes":sum(x.size or 0 for x in info.siblings),"revision":info.sha}))')
    result = subprocess.run([str(py), '-c', code, model_id], capture_output=True, text=True, check=True)
    data = json.loads(result.stdout)
    return data['bytes'], data['revision']


def prepare(args):
    workspace = workspace_path(args.workspace)
    if platform.system() not in ('Darwin', 'Windows'):
        raise RuntimeError('only macOS and Windows preparation paths are provided in this beta')
    if not all(shutil.which(name) for name in ('node', 'npm', 'ffmpeg')):
        raise RuntimeError('Node.js, npm and ffmpeg must be available on PATH')
    started = time.perf_counter(); workspace.mkdir(parents=True, exist_ok=True)
    previous_install = workspace / 'skill-install.json'
    previous = json.loads(previous_install.read_text()) if previous_install.is_file() else {}
    previous_source = previous.get('modelSource')
    args.voice_route = args.voice_route or previous.get('voiceRoute') or 'fixed-reference'
    args.model_source = args.model_source or previous_source or (
        'modelscope' if args.voice_route == 'fixed-reference' else 'huggingface')
    py = env_python(workspace)
    if not py.is_file():
        if shutil.which('uv'):
            run(['uv', 'venv', '--python', '3.12', str(py.parent.parent)])
        elif sys.version_info[:2] == (3, 12):
            run([sys.executable, '-m', 'venv', str(py.parent.parent)])
        else:
            raise RuntimeError('install Python 3.12 or uv, then repeat prepare')
    # qwen-tts also declares Gradio for its demo; the video pipeline uses only inference.
    inference_deps = ['transformers==4.57.3', 'accelerate==1.12.0', 'librosa', 'torchaudio',
        'soundfile', 'sox', 'onnxruntime', 'einops', 'torch', 'numpy', 'scipy', 'pillow',
        'fonttools', 'huggingface_hub']
    if shutil.which('uv'):
        uv_env = {**os.environ, 'UV_HTTP_TIMEOUT': '120'}
        run(['uv', 'pip', 'install', '--python', str(py), *inference_deps], env=uv_env)
        run(['uv', 'pip', 'install', '--python', str(py), '--no-deps', 'qwen-tts==0.1.1'], env=uv_env)
        if args.model_source == 'modelscope':
            run(['uv', 'pip', 'install', '--python', str(py), 'modelscope'], env=uv_env)
    else:
        run([str(py), '-m', 'pip', 'install', *inference_deps])
        run([str(py), '-m', 'pip', 'install', '--no-deps', 'qwen-tts==0.1.1'])
        if args.model_source == 'modelscope':
            run([str(py), '-m', 'pip', 'install', 'modelscope'])
    release_id, digest, files = runtime_identity()
    release = workspace / 'library/runtimes' / release_id
    if release.exists():
        manifest = json.loads((release / 'runtime.json').read_text())
        if manifest['files'] != files:
            raise RuntimeError('installed runtime differs from package; preserve it and inspect')
    else:
        shutil.copytree(RUNTIME, release, ignore=shutil.ignore_patterns('__pycache__', '*.pyc'))
        (release / 'runtime.json').write_text(json.dumps({'runtimeReleaseId': release_id, 'sha256': digest,
            'files': files, 'lockSha256': files['package-lock.json']}, indent=2) + '\n')
    if not (release / 'node_modules/@remotion/cli/remotion-cli.js').exists():
        run(['npm', 'ci', '--prefix', str(release)])
    models = [MODEL_CLONE] if args.voice_route == 'fixed-reference' else [MODEL_PRESET]
    if args.clone_model and MODEL_CLONE not in models:
        models.append(MODEL_CLONE)
    (workspace / 'skill-install.json').write_text(json.dumps({'runtimeReleaseId': release_id,
        'modelPreset': MODEL_PRESET, 'modelClone': MODEL_CLONE,
        'modelSource': args.model_source, 'voiceRoute': args.voice_route,
        'preparedModelIds': models}, indent=2) + '\n')
    if args.download_model:
        totals = []
        for model in models:
            size, revision = model_size(model, args.model_source, py)
            totals.append(size)
            print(f'MODEL_DOWNLOAD {model} revision={revision} repositoryBytes={size} source={args.model_source} sharedUserCache', flush=True)
        download_code = ('import sys; from modelscope import snapshot_download; snapshot_download(sys.argv[1])'
            if args.model_source == 'modelscope' else
            'import sys; from huggingface_hub import snapshot_download; snapshot_download(sys.argv[1])')
        for model in models:
            run([py, '-c', download_code, model])
    report(status='prepared', runtimeReleaseId=release_id, runtime=str(release), python=str(py),
           modelDownloaded=bool(args.download_model), seconds=round(time.perf_counter() - started, 3))


def register_file(workspace, registry, path, role):
    rid = hash_file(path)
    existing = registry['resources'].get(rid)
    if existing and (existing['sha256'] != rid or existing['path'] != str(path.relative_to(workspace)).replace(os.sep, '/')):
        raise ValueError('resource ID collision')
    registry['resources'][rid] = {'path': str(path.relative_to(workspace)).replace(os.sep, '/'),
        'sha256': rid, 'bytes': path.stat().st_size, 'role': role, 'status': 'active',
        'registeredAt': __import__('datetime').datetime.now(__import__('datetime').timezone.utc).isoformat(),
        'unreferencedSince': None}
    return rid


def profile_file(workspace, relative, expected_sha, expected_bytes):
    candidate = workspace / relative
    if Path(relative).is_absolute() or '..' in Path(relative).parts or not candidate.resolve().is_relative_to(workspace):
        raise ValueError('voice profile resource must be workspace-relative')
    current = workspace
    for part in Path(relative).parts:
        current = current / part
        if current.is_symlink():
            raise ValueError('voice profile cannot use symlink resources')
    if not candidate.is_file() or candidate.stat().st_size != expected_bytes or hash_file(candidate) != expected_sha:
        raise ValueError(f'voice profile resource missing or changed: {relative}')
    return candidate


def install_bundled_voice(workspace, voice_id, installed):
    if voice_id not in BUNDLED_VOICES:
        raise ValueError(f'unknown bundled voice: {voice_id}')
    source = PACKAGE / 'assets/voices' / voice_id
    profile = json.loads((source / 'profile.json').read_text())
    if (profile.get('id') != voice_id or profile.get('modelId') != MODEL_CLONE
            or profile.get('modelSource') != installed.get('modelSource')
            or MODEL_CLONE not in installed.get('preparedModelIds', [])):
        raise ValueError('prepare the 0.6B Base fixed-reference route with --model-source modelscope')
    reference = profile['reference']
    expected_path = f'library/voices/profiles/{voice_id}/reference.wav'
    if reference.get('path') != expected_path:
        raise ValueError('bundled voice profile has unexpected reference path')
    source_wav = source / 'reference.wav'
    if source_wav.stat().st_size != reference['bytes'] or hash_file(source_wav) != reference['sha256']:
        raise ValueError('bundled voice reference changed')
    destination = workspace / 'library/voices/profiles' / voice_id
    current = workspace
    for part in ('library', 'voices', 'profiles', voice_id):
        current = current / part
        if current.is_symlink():
            raise ValueError('bundled voice destination cannot be a symlink')
    destination.mkdir(parents=True, exist_ok=True)
    for name in ('reference.wav', 'profile.json'):
        source_file = source / name
        target = destination / name
        if target.is_symlink():
            raise ValueError(f'bundled voice destination cannot be a symlink: {target}')
        if target.exists():
            if hash_file(target) != hash_file(source_file):
                raise ValueError(f'existing voice file differs; preserve it: {target}')
        else:
            shutil.copy2(source_file, target)
    return destination / 'profile.json'


def attach_voice_profile(workspace, profile_arg, project_data, registry):
    profile_path = Path(profile_arg).expanduser().resolve()
    profile_root = workspace / 'library/voices/profiles'
    if not profile_path.is_relative_to(profile_root) or profile_path.name != 'profile.json' or profile_path.is_symlink():
        raise ValueError('fixed voice profile must be an immutable library/voices/profiles/<id>/profile.json file')
    profile = json.loads(profile_path.read_text())
    if (profile.get('schemaVersion') != 1 or profile.get('id') != profile_path.parent.name
            or profile.get('route') != 'base-clone'
            or profile.get('modelId') != MODEL_CLONE
            or profile.get('referenceMode') != 'speaker-embedding-only'
            or profile.get('referenceText') is not None
            or not isinstance(profile.get('seed'), int)
            or not isinstance(profile.get('temperature'), (int, float))
            or not isinstance(profile.get('maxTokens'), int)):
        raise ValueError('fixed voice profile schema or Base route invalid')
    working = profile['reference']
    working_path = profile_file(workspace, working['path'], working['sha256'], working['bytes'])
    original = profile.get('referenceOriginal', working)
    original_path = profile_file(workspace, original['path'], original['sha256'], original['bytes'])
    working_id = register_file(workspace, registry, working_path, 'voice-working-reference')
    original_id = working_id if original_path == working_path else register_file(workspace, registry, original_path, 'voice-original')
    profile_id = register_file(workspace, registry, profile_path, 'voice-profile')
    project_data['voiceWorkingReferenceResourceId'] = working_id
    project_data['voiceOriginalResourceId'] = original_id
    project_data['tts'] = {
        'mode': 'clone', 'modelSource': profile['modelSource'],
        'modelId': profile['modelId'], 'speaker': None,
        'temperature': profile['temperature'], 'maxTokens': profile['maxTokens'],
        'seed': profile['seed'], 'referenceMode': profile['referenceMode'],
        'referenceText': profile['referenceText'], 'voiceProfileResourceId': profile_id,
    }
    return {'profileId': profile['id'], 'profileResourceId': profile_id,
            'referenceResourceId': working_id, 'modelId': profile['modelId']}


def init_project(args):
    workspace = workspace_path(args.workspace)
    install, _ = installation(workspace)
    if not re.fullmatch(r'[a-z0-9][a-z0-9-]{0,62}', args.project_id):
        raise ValueError('project ID must be lowercase letters, digits and hyphens')
    source = Path(args.course).expanduser().resolve()
    course = json.loads(source.read_text())
    if course.get('format') != 'writing-board-v5' or not all(key in course for key in
        ('cues', 'writes', 'marks', 'annotationIntents', 'camera', 'boardWidth', 'boardHeight')):
        raise ValueError('course must be a complete writing-board-v5 source file')
    cue_ids = [item.get('id') for item in course['cues']]
    write_ids = [item.get('id') for item in course['writes']]
    if not cue_ids or len(cue_ids) != len(set(cue_ids)) or any(not isinstance(x, str) or not x for x in cue_ids):
        raise ValueError('course needs unique cue IDs')
    if not write_ids or len(write_ids) != len(set(write_ids)):
        raise ValueError('course needs unique write IDs')
    for cue in course['cues']:
        if cue.get('lang') not in ('zh', 'en') or not isinstance(cue.get('text'), str) or not cue['text'].strip():
            raise ValueError(f'invalid voice cue: {cue.get("id")}')
    for kind in ('writes', 'marks', 'sketches'):
        for item in course.get(kind, []):
            if item.get('anchor') not in cue_ids:
                raise ValueError(f'{kind} action has unknown voice anchor: {item.get("id")}')
    selected = sum(bool(x) for x in (args.voice_id, args.voice_profile, args.reference, args.speaker))
    if selected > 1:
        raise ValueError('select one voice route: --voice-id, --voice-profile, --reference, or --speaker')
    if selected == 0:
        args.voice_id = DEFAULT_FEMALE
    if args.voice_id:
        args.voice_profile = str(install_bundled_voice(workspace, args.voice_id, install))
    if args.reference and not Path(args.reference).expanduser().is_file():
        raise ValueError('explicit reference recording missing')
    font = Path(args.font).expanduser().resolve() if args.font else DEFAULT_FONT
    if not font.is_file() or font.suffix.lower() not in ('.ttf', '.otf'):
        raise ValueError('selected font missing; reinstall the bundled default or provide --font with a local TTF/OTF')
    font_hash = hash_file(font)
    if not args.font and font_hash != DEFAULT_FONT_SHA256:
        raise ValueError('bundled default font checksum mismatch; reinstall this Skill')
    project = workspace / 'projects' / args.project_id
    if project.exists():
        raise FileExistsError(f'project exists; no overwrite: {project}')
    registry = {'schemaVersion': 1, 'projectId': args.project_id, 'resources': {}}
    font_dest = workspace / 'library/fonts' / font_hash / ('source' + font.suffix.lower())
    font_dest.parent.mkdir(parents=True, exist_ok=True)
    if not font_dest.exists(): shutil.copyfile(font, font_dest)
    if hash_file(font_dest) != font_hash: raise ValueError('font copy mismatch')
    font_id = register_file(workspace, registry, font_dest, 'font-original')
    reference_id = None
    if args.reference:
        ref = Path(args.reference).expanduser().resolve(); ref_hash = hash_file(ref)
        ref_dest = workspace / 'library/voices' / ref_hash / ('source' + ref.suffix.lower())
        ref_dest.parent.mkdir(parents=True, exist_ok=True)
        if not ref_dest.exists(): shutil.copy2(ref, ref_dest)
        if hash_file(ref_dest) != ref_hash: raise ValueError('reference copy mismatch')
        reference_id = register_file(workspace, registry, ref_dest, 'voice-original')
    course['boardFont'] = str(font_dest)
    course.pop('voiceReference', None)
    mode = 'clone' if reference_id or args.voice_profile else 'preset'
    project_data = {'schemaVersion': 1, 'projectId': args.project_id, 'currentVersionId': None,
        'acceptedVersionIds': [], 'pinnedVersionIds': [], 'runtimeReleaseId': install['runtimeReleaseId'],
        'fontResourceId': font_id, 'tts': {'mode': mode, 'modelSource': install['modelSource'],
            'modelId': MODEL_CLONE if reference_id or args.voice_profile else MODEL_PRESET, 'speaker': args.speaker if mode == 'preset' else None,
            'temperature': .85, 'maxTokens': 900},
        **({'voiceOriginalResourceId': reference_id, 'voiceWorkingReferenceResourceId': reference_id} if reference_id else {})}
    if args.voice_profile:
        if install['runtimeReleaseId'] != runtime_identity()[0]:
            raise ValueError('run prepare with this package before using fixed voice profiles')
        attach_voice_profile(workspace, args.voice_profile, project_data, registry)
    (project / 'source').mkdir(parents=True)
    for name in ('audio/originals', 'audio/ready', 'exports', 'history/versions', 'work/runs'):
        (project / name).mkdir(parents=True)
    (project / 'source/course-source.json').write_text(json.dumps(course, ensure_ascii=False, indent=2) + '\n')
    (project / 'resources.json').write_text(json.dumps(registry, ensure_ascii=False, indent=2) + '\n')
    (project / 'project.json').write_text(json.dumps(project_data, ensure_ascii=False, indent=2) + '\n')
    report(status='initialized', project=str(project), mode=mode, course=str(project / 'source/course-source.json'),
           fontResourceId=font_id)


def project_action(args):
    workspace = workspace_path(args.workspace)
    installed, release = installation(workspace)
    project = workspace / 'projects' / args.project_id
    data = json.loads((project / 'project.json').read_text())
    if args.action == 'voice-set':
        if installed['runtimeReleaseId'] != runtime_identity()[0]:
            raise ValueError('run prepare with this package before attaching a fixed voice profile')
        if not args.profile:
            raise ValueError('voice-set requires --profile')
        for run_path in (project / 'work/runs').glob('*/run.json'):
            run_state = json.loads(run_path.read_text())
            if run_state.get('state') in ('active', 'recovering') or run_state.get('state') == 'failed' and not run_state.get('resolved'):
                raise ValueError(f'cannot change voice while a run needs reconciliation: {run_path}')
        registry_path = project / 'resources.json'
        registry = json.loads(registry_path.read_text())
        attached = attach_voice_profile(workspace, args.profile, data, registry)
        data['runtimeReleaseId'] = installed['runtimeReleaseId']
        registry_path.write_text(json.dumps(registry, ensure_ascii=False, indent=2) + '\n')
        (project / 'project.json').write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
        report(status='voice-profile-attached', project=str(project), runtimeReleaseId=data['runtimeReleaseId'], **attached)
        return
    if data['runtimeReleaseId'] != release.name:
        release = workspace / 'library/runtimes' / data['runtimeReleaseId']
        if not (release / 'runtime.json').is_file():
            raise ValueError('project pinned runtime missing')
    py = env_python(workspace)
    env = os.environ.copy(); env['GRAMMAR_PYTHON'] = str(py)
    env['HF_HUB_OFFLINE'] = '1'; env['TRANSFORMERS_OFFLINE'] = '1'
    if args.action in ('audio-inspect', 'audio-generate'):
        command = [py, release / 'scripts/generate_project_audio.py', '--project', project,
                   '--inspect' if args.action == 'audio-inspect' else '--generate']
    elif args.action == 'build':
        args.run_id = args.run_id or 'build-' + uuid.uuid4().hex[:12]
        command = [py, release / 'scripts/build_project_lesson.py', '--project', project]
        command += ['--run-id', args.run_id]
    elif args.action == 'render':
        command = ['node', release / 'scripts/render_project.mjs', project]
        if args.run_id: command += ['--run-id', args.run_id]
        if args.lesson: command += ['--lesson', args.lesson]
        if args.frames: command += ['--frames', args.frames]
        if args.export: command += ['--export', args.export]
    elif args.action == 'finalize':
        if not all((args.build_run, args.render_run, args.version)):
            raise ValueError('finalize requires --build-run, --render-run and --version')
        command = [py, release / 'scripts/finalize_board_version.py', project, '--build-run', args.build_run,
                   '--render-run', args.render_run, '--version', args.version]
    else:
        command = [py, release / 'scripts/storage.py', '--workspace', workspace, '--project', args.project_id,
                   args.action, *([args.value] if args.value else [])]
    try:
        run(command, env=env)
    except Exception as exc:
        if args.action == 'build':
            run_path = project / 'work/runs' / args.run_id / 'run.json'
            if run_path.is_file():
                state = json.loads(run_path.read_text())
                if state.get('state') == 'active':
                    state.update(state='failed', resolved=False, error=str(exc))
                    run_path.write_text(json.dumps(state, ensure_ascii=False, indent=2) + '\n')
        raise


def voice_probe(args):
    workspace = workspace_path(args.workspace)
    _, release = installation(workspace)
    py = env_python(workspace)
    env = os.environ.copy(); env['HF_HUB_OFFLINE'] = '1'; env['TRANSFORMERS_OFFLINE'] = '1'
    data, _ = installation(workspace)
    run([py, release / 'scripts/voice_probe.py', '--output', args.output, '--speaker', args.speaker,
         '--model-source', data['modelSource']], env=env)


def main():
    parser = argparse.ArgumentParser(description='English grammar board video beta')
    parser.add_argument('--workspace', required=True, help='independent course workspace')
    sub = parser.add_subparsers(dest='command', required=True)
    sub.add_parser('doctor')
    prep = sub.add_parser('prepare'); prep.add_argument('--download-model', action='store_true')
    prep.add_argument('--clone-model', action='store_true')
    prep.add_argument('--model-source', choices=['huggingface', 'modelscope'])
    prep.add_argument('--voice-route', choices=['fixed-reference', 'preset'])
    init = sub.add_parser('init'); init.add_argument('--project-id', required=True)
    init.add_argument('--course', required=True)
    init.add_argument('--font', help='optional local TTF/OTF; overrides the bundled default font')
    init.add_argument('--speaker'); init.add_argument('--reference'); init.add_argument('--voice-profile')
    init.add_argument('--voice-id', choices=BUNDLED_VOICES, help='bundled fixed teaching voice; female is the default')
    probe = sub.add_parser('voice-probe'); probe.add_argument('--output', required=True)
    probe.add_argument('--speaker', required=True, help='explicit official preset voice for optional audition')
    action = sub.add_parser('project'); action.add_argument('project_id')
    action.add_argument('action', choices=['voice-set', 'audio-inspect', 'audio-generate', 'build', 'render', 'finalize',
        'inventory', 'preview', 'apply', 'restore', 'prune'])
    action.add_argument('value', nargs='?'); action.add_argument('--run-id')
    action.add_argument('--lesson'); action.add_argument('--frames'); action.add_argument('--export')
    action.add_argument('--build-run'); action.add_argument('--render-run'); action.add_argument('--version')
    action.add_argument('--profile')
    args = parser.parse_args()
    try:
        if args.command == 'doctor': doctor(args)
        elif args.command == 'prepare': prepare(args)
        elif args.command == 'init': init_project(args)
        elif args.command == 'voice-probe': voice_probe(args)
        else: project_action(args)
    except Exception as exc:
        report(status='error', stage=args.command, error=str(exc))
        return 1
    except KeyboardInterrupt:
        report(status='interrupted', stage=args.command,
               error='operation interrupted; inspect run.json and existing outputs before retry')
        return 130
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
