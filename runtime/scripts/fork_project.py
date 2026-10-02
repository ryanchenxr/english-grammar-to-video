"""Create a new project on the installed runtime, sharing verified original resources."""
import argparse, copy, json, os, re
from pathlib import Path
from storage import atomic, load_project, resolve_project_font, safe_path, sha
from generate_project_audio import valid_resource
ap=argparse.ArgumentParser();ap.add_argument('--project',required=True);ap.add_argument('--new-project-id',required=True);ap.add_argument('--runtime-id',required=True)
a=ap.parse_args();original=Path(a.project).resolve();workspace=original.parent.parent
_,project,registry=load_project(workspace,original.name)
if not re.fullmatch(r'[a-z0-9][a-z0-9-]{0,62}',a.new_project_id) or not re.fullmatch(r'grammar-public-[a-f0-9]{16}',a.runtime_id):raise ValueError('invalid new project/runtime ID')
new=workspace/'projects'/a.new_project_id
if new.exists():raise FileExistsError(f'new project already exists; no overwrite: {a.new_project_id}')
source=json.loads((original/'source/course-source.json').read_text());voices=json.loads((original/'source/voice-generation.json').read_text())
font=resolve_project_font(workspace,original.name)
explicit=source.get('boardFont')
if explicit and Path(explicit).is_file() and sha(Path(explicit))!=sha(font):raise ValueError('course font conflicts with registered original font')
source['boardFont']=str(font)
required={project['fontResourceId']}|{v for k,v in project.items() if k.startswith('voice') and k.endswith('ResourceId')}
if project['tts'].get('voiceProfileResourceId'):required.add(project['tts']['voiceProfileResourceId'])
by_id={c['id']:c for c in source['cues']}
for clip in voices['clips']:
    cue=by_id.get(clip['cueId'])
    if not cue or cue['text']!=clip['text'] or cue.get('spokenText',cue['text'])!=clip.get('spokenText',clip['text']) or cue['lang']!=clip['lang']:raise ValueError(f'selected voice text differs: {clip["cueId"]}')
    for key in ('originalResourceId','readyWavResourceId','readyMp3ResourceId'):
        if clip.get(key):required.add(clip[key])
    file=valid_resource(workspace,registry,clip['readyMp3ResourceId'])
    if file is None:raise ValueError(f'selected audio unavailable or changed: {clip["cueId"]}')
    clip['src']=os.path.relpath(file,new/'source')
if set(by_id)!=set(c['cueId'] for c in voices['clips']):raise ValueError('source and voice manifest cues differ')
for rid in required:
    if valid_resource(workspace,registry,rid) is None:raise ValueError(f'original resource unavailable or changed: {rid}')
if not (workspace/'library/runtimes'/a.runtime_id/'runtime.json').is_file():raise ValueError('prepare the candidate runtime first')
for n in ('source','audio/originals','audio/ready','exports','history/versions','work/runs'):(new/n).mkdir(parents=True,exist_ok=True)
new_project=copy.deepcopy(project);new_project.update(projectId=a.new_project_id,runtimeReleaseId=a.runtime_id,currentVersionId=None,acceptedVersionIds=[],pinnedVersionIds=[])
atomic(new/'project.json',new_project);atomic(new/'resources.json',{'schemaVersion':1,'projectId':a.new_project_id,'resources':{rid:copy.deepcopy(registry['resources'][rid]) for rid in required}})
atomic(new/'source/course-source.json',source);atomic(new/'source/voice-generation.json',voices)
print(json.dumps({'status':'forked-project','projectId':a.new_project_id,'runtimeReleaseId':a.runtime_id,'audioCuesReused':len(voices['clips']),'originalProjectUnchanged':True}))
