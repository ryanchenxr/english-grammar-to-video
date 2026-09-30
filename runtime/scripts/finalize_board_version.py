#!/usr/bin/env python3
"""Record a completed board lesson as a new recoverable local project version."""
import argparse
import copy
import json
import os
import shutil
from pathlib import Path
from storage import atomic, iso, now, sha, safe_path

parser=argparse.ArgumentParser()
parser.add_argument('project')
parser.add_argument('--build-run',required=True)
parser.add_argument('--render-run',required=True)
parser.add_argument('--version',required=True)
args=parser.parse_args()
project_dir=Path(args.project).resolve();workspace=project_dir.parent.parent
if not args.version.replace('-','').replace('_','').isalnum():raise ValueError('invalid version ID')
version_dir=project_dir/'history/snapshots'/args.version
version_file=project_dir/'history/versions'/f'{args.version}.json'
if version_dir.exists() or version_file.exists():raise FileExistsError('version already exists')
build=project_dir/'work/runs'/args.build_run;render=project_dir/'work/runs'/args.render_run
for folder in (build,render):
    if json.loads((folder/'run.json').read_text())['state']!='completed':raise ValueError(f'incomplete run: {folder}')
lesson=json.loads((build/'lesson.json').read_text())
if lesson['format']!='writing-board-v5':raise ValueError('requires writing-board-v5')
render_run=json.loads((render/'run.json').read_text())
if render_run['inputLessonSha256']!=sha(build/'lesson.json'):raise ValueError('render did not use this build')
registry_path=project_dir/'resources.json';registry=json.loads(registry_path.read_text());resources=registry['resources']
project_path=project_dir/'project.json';project=json.loads(project_path.read_text())
runtime=json.loads((workspace/'library/runtimes'/project['runtimeReleaseId']/'runtime.json').read_text())
export_id='export:'+args.render_run
export_item=resources.get(export_id)
if not export_item:raise ValueError('render export is not registered')
export_path=safe_path(workspace,export_item['path'])
if not export_path.is_file() or sha(export_path)!=export_item['sha256']:raise ValueError('render export changed')
font_path=Path(lesson['boardFont']).resolve()
font_ids=[rid for rid,r in resources.items() if r['role']=='font-original' and safe_path(workspace,r['path'])==font_path and r['sha256']==sha(font_path)]
if len(font_ids)!=1:raise ValueError('font resource missing or ambiguous')
voices=json.loads((project_dir/'source/voice-generation.json').read_text())
clips={c['cueId']:c for c in voices['clips']}
if set(clips)!=set(a['cueId'] for a in lesson['audio']):raise ValueError('lesson audio and voice manifest differ')
for track in lesson['audio']:
    c=clips[track['cueId']];rid=c['readyMp3ResourceId'];r=resources[rid]
    if sha(safe_path(workspace,r['path']))!=r['sha256']:raise ValueError(f'audio changed: {track["cueId"]}')
    if safe_path(workspace,r['path'])!=Path(build/track['src']).resolve():raise ValueError('build audio differs from selected voice')

sound_id=None
if lesson.get('sound',{}).get('enabled'):
    sound_old=(build/lesson['sound']['src']).resolve()
    if not sound_old.is_file() or not sound_old.is_relative_to(build):raise ValueError('invalid local sound')
    sound_id=sha(sound_old);sound_new=project_dir/'audio/ready'/f'{sound_id}.wav'
    if sound_new.exists():
        if sha(sound_new)!=sound_id:raise ValueError('sound target collision')
    else:shutil.copy2(sound_old,sound_new)
    resources.setdefault(sound_id,{'path':str(sound_new.relative_to(workspace)),'sha256':sound_id,'bytes':sound_new.stat().st_size,
        'role':'writing-sfx','status':'active','registeredAt':iso(now()),'unreferencedSince':None})

def rebased_lesson(folder):
    data=copy.deepcopy(lesson)
    for track in data['audio']:
        r=resources[clips[track['cueId']]['readyMp3ResourceId']]
        track['src']=os.path.relpath(safe_path(workspace,r['path']),folder)
    if sound_id:data['sound']['src']=os.path.relpath(sound_new,folder)
    return data
def rebased_voice(folder):
    data=copy.deepcopy(voices)
    for clip in data['clips']:
        r=resources[clip['readyMp3ResourceId']]
        clip['src']=os.path.relpath(safe_path(workspace,r['path']),folder)
    return data
def register(path,role,rid):
    if rid in resources:raise ValueError(f'resource ID collision: {rid}')
    resources[rid]={'path':str(path.relative_to(workspace)),'sha256':sha(path),'bytes':path.stat().st_size,
        'role':role,'status':'active','registeredAt':iso(now()),'unreferencedSince':None}
    return rid

source=project_dir/'source'
atomic(source/'lesson.json',rebased_lesson(source))
atomic(source/'voice-generation.json',rebased_voice(source))
shutil.copy2(build/'lesson-script.md',source/'lesson-script.md')
version_dir.mkdir(parents=True,exist_ok=False)
shutil.copy2(source/'course-source.json',version_dir/'course-source.json')
atomic(version_dir/'lesson.json',rebased_lesson(version_dir))
atomic(version_dir/'voice-generation.json',rebased_voice(version_dir))
shutil.copy2(build/'lesson-script.md',version_dir/'lesson-script.md')
source_files={}
for role,name in [('course','course-source.json'),('lesson','lesson.json'),('voice','voice-generation.json'),('script','lesson-script.md')]:
    path=version_dir/name;rid=f'source:{args.version}:{name}'
    register(path,'version-source',rid)
    source_files[role]={'resourceId':rid,'sha256':sha(path),'path':str(path.relative_to(workspace))}
audio_refs=[{'cueId':cue['cueId'],'originalResourceId':cue['originalResourceId'],
    'readyWavResourceId':cue['readyWavResourceId'],'readyMp3ResourceId':cue['readyMp3ResourceId']} for cue in voices['clips']]
voice_ids=[project[key] for key in ('voiceOriginalResourceId','voiceWorkingReferenceResourceId') if project.get(key)]
profile_id=project.get('tts',{}).get('voiceProfileResourceId')
resource_ids=sorted({export_id,font_ids[0],*voice_ids,
    *([profile_id] if profile_id else []),
    *(entry['resourceId'] for entry in source_files.values()),*(rid for row in audio_refs for key,rid in row.items() if key!='cueId'),
    *([sound_id] if sound_id else [])})
for rid in resource_ids:
    r=resources[rid];file=safe_path(workspace,r['path'])
    if not file.is_file() or sha(file)!=r['sha256'] or file.stat().st_size!=r['bytes']:raise ValueError(f'version resource invalid: {rid}')
manifest={'id':args.version,'createdAt':iso(now()),'state':'pending-user-acceptance','recoverable':True,
    'recoveryStatus':'source, selected audio, sound, font, export and pinned runtime recorded',
    'runtimeReleaseId':project['runtimeReleaseId'],'runtimeSha256':runtime['sha256'],'sourceFiles':source_files,
    'fontResourceId':font_ids[0],'voiceOriginalResourceId':project.get('voiceOriginalResourceId'),
    'voiceWorkingReferenceResourceId':project.get('voiceWorkingReferenceResourceId'),
    'voiceProfileResourceId':profile_id,'audio':audio_refs,
    'soundResourceId':sound_id,'exportResourceId':export_id,'resourceIds':resource_ids,
    'buildRunId':args.build_run,'renderRunId':args.render_run}
atomic(registry_path,registry)
atomic(version_file,manifest)
project['currentVersionId']=args.version
atomic(project_path,project)
print(json.dumps({'version':args.version,'source':str(source),'manifest':str(version_file),'export':str(export_path),
    'audioCues':len(audio_refs),'resources':len(resource_ids)},ensure_ascii=False,indent=2))
