"""Validate managed resources and prepare portable per-course renderer props."""
import argparse, base64, json, os, subprocess, sys
from pathlib import Path
from storage import atomic, load_project, resolve_project_font, safe_path, sha
from generate_project_audio import valid_resource

ap=argparse.ArgumentParser();ap.add_argument('--project',required=True);ap.add_argument('--lesson',required=True);ap.add_argument('--out-dir',required=True)
args=ap.parse_args();project_dir=Path(args.project).resolve();workspace=project_dir.parent.parent
_,project,registry=load_project(workspace,project_dir.name)
lesson_path=safe_path(workspace,str(Path(os.path.abspath(args.lesson)).relative_to(workspace)))
if not lesson_path.is_relative_to(project_dir):raise ValueError('lesson must be a managed project file')
lesson=json.loads(lesson_path.read_text());font=resolve_project_font(workspace,project_dir.name,lesson.get('boardFont'))
out=Path(args.out_dir).resolve()
if not out.is_relative_to(project_dir/'work/runs'):raise ValueError('renderer inputs must remain in project work/runs')
out.mkdir(parents=True,exist_ok=True)
glyph_file=out/'glyphs.json'
subprocess.run([sys.executable,str(Path(__file__).with_name('build_chalk_assets.py')),str(lesson_path),
               '--project',str(project_dir),'--manifest',str(glyph_file),'--cache-dir',str(workspace/'cache/glyphs')],check=True)
glyphs=json.loads(glyph_file.read_text());font_hash=sha(font)
if glyphs['sha256']!=font_hash:raise ValueError('glyph font content differs from registered font')
for write in lesson['writes']:
    entry=glyphs['entries'].get(write['id'])
    if not entry or entry['text']!=write['text']:raise ValueError(f'glyph text mismatch: {write["id"]}')
    if any(c.get('src') and not c['src'].startswith('data:image/png;base64,') for c in entry['chars']):raise ValueError('external glyph references are not permitted')
clips={c['cueId']:c for c in json.loads((project_dir/'source/voice-generation.json').read_text())['clips']}
resource_ids=[project['fontResourceId']]
for track in lesson['audio']:
    cue_id=track['cueId'];clip=clips.get(cue_id)
    if not clip:raise ValueError(f'audio manifest cue missing: {cue_id}')
    display=''.join(c['text'] for c in lesson['cues'] if c['voiceCueId']==cue_id)
    if display!=clip['text'] or track.get('spokenText',display)!=clip.get('spokenText',clip['text']):raise ValueError(f'selected audio text differs: {cue_id}')
    selected=safe_path(workspace,str(Path(os.path.abspath(lesson_path.parent/track['src'])).relative_to(workspace)))
    matches=[(rid,valid_resource(workspace,registry,rid)) for rid in (clip.get('readyMp3ResourceId'),clip.get('readyWavResourceId')) if rid]
    pair=next(((rid,p) for rid,p in matches if p==selected),None)
    if not pair:raise ValueError(f'audio path, status or checksum differs from selected resource: {cue_id}')
    rid,file=pair;mime={'.mp3':'audio/mpeg','.wav':'audio/wav'}.get(file.suffix.lower())
    if not mime:raise ValueError('unsupported selected audio format')
    resource_ids.append(rid);track['src']='data:'+mime+';base64,'+base64.b64encode(file.read_bytes()).decode()
if lesson.get('sound',{}).get('enabled'):
    file=safe_path(workspace,str(Path(os.path.abspath(lesson_path.parent/lesson['sound']['src'])).relative_to(workspace)))
    match=next((rid for rid,r in registry['resources'].items() if r['path']==str(file.relative_to(workspace)) and valid_resource(workspace,registry,rid)==file),None)
    if not match:raise ValueError('writing sound must be a registered, active, unchanged resource')
    resource_ids.append(match);lesson['sound']['src']='data:audio/wav;base64,'+base64.b64encode(file.read_bytes()).decode()
# Files remain local to this job; no author paths or device-bound font objects enter the bundle.
token='font-sha256:'+font_hash;glyphs['source']=token;lesson['boardFont']=token;lesson['fontSha256']=font_hash;lesson['glyphManifest']=glyphs
atomic(out/'props.json',lesson)
atomic(out/'inputs.json',{'sourceLessonSha256':sha(lesson_path),'fontResourceId':project['fontResourceId'],
                        'fontSha256':font_hash,'glyphManifestSha256':sha(glyph_file),'inputResourceIds':sorted(set(resource_ids))})
print(json.dumps({'status':'prepared-render-inputs','fontSha256':font_hash,'writes':len(lesson['writes']),'audioCues':len(lesson['audio'])}))
