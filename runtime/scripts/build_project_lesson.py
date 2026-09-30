"""Compile project source and measured audio into a new run, without replacing a version."""
from pathlib import Path
import argparse,hashlib,json,os,uuid
from time import perf_counter
import numpy as np
import soundfile as sf
from scipy.signal import butter, sosfilt
from storage import atomic,iso,now,sha
parser=argparse.ArgumentParser();parser.add_argument('--project',required=True);parser.add_argument('--run-id')
args=parser.parse_args();PROJECT=Path(args.project).resolve();ROOT=PROJECT/'source'
START_PERF=perf_counter()
RUN_ID=args.run_id or 'build-'+now().strftime('%Y%m%dT%H%M%S')+'-'+uuid.uuid4().hex[:8]
if not RUN_ID.replace('-','').replace('_','').isalnum():raise ValueError('invalid run ID')
OUT=PROJECT/'work'/'runs'/RUN_ID;OUT.mkdir(parents=True,exist_ok=False)
STARTED=iso(now());atomic(OUT/'run.json',{'runId':RUN_ID,'state':'active','startedAt':STARTED,'resourceIds':[]})
source=json.loads((ROOT/'course-source.json').read_text())
voices={item['cueId']:item for item in json.loads((ROOT/'voice-generation.json').read_text())['clips']}
sections=[];cues=[];audio=[];starts={};ends={}
time=.25;previous=None;previous_end=None
for cue in source['cues']:
 section=cue['section']
 if previous is not None:
  if section!=previous:
   sections.append({'id':section,'at':round(previous_end+.08,3),'panDuration':.72})
   time+=.9
  else:time+=.15
 elif not sections:sections.append({'id':section,'at':0,'panDuration':0})
 start=time;duration=voices[cue['id']]['cleanSeconds'];end=start+duration
 parts=cue.get('subtitleParts') or [{'text':cue.get('subtitle',cue['text'])}]
 if ''.join(part['text'] for part in parts) != cue['text']:
  raise ValueError(f'{cue["id"]}: subtitles differ from the recorded voice text')
 segment_start=start
 for index,part in enumerate(parts):
  segment_end=start+part['until'] if 'until' in part else end
  if segment_end <= segment_start or segment_end > end+.001 or (index<len(parts)-1 and 'until' not in part):
   raise ValueError(f'{cue["id"]}: invalid subtitle boundary')
  cues.append({'id':f'{cue["id"]}.{index+1}' if len(parts)>1 else cue['id'],
               'voiceCueId':cue['id'],'section':section,'start':round(segment_start,3),
               'end':round(segment_end,3),'text':part['text']})
  segment_start=segment_end
 if abs(segment_start-end)>.001: raise ValueError(f'{cue["id"]}: subtitles do not cover the voice cue')
 audio.append({'cueId':cue['id'],'kind':'zhNarration' if cue['lang']=='zh' else 'enExample',
               'src':os.path.relpath((ROOT/voices[cue['id']]['src']).resolve(),OUT),'start':round(start,3)})
 starts[cue['id']]=start;ends[cue['id']]=end
 time=end+cue.get('pauseAfter',0)
 previous=section;previous_end=end
writes=[]
for item in source['writes']:
 action={k:v for k,v in item.items() if k not in ('anchor','offset','notBeforeCue')}
 action['at']=round(starts[item['anchor']]+item['offset'],3)
 if item.get('notBeforeCue') and action['at'] < starts[item['notBeforeCue']] - .015:
  raise ValueError(f'{item["id"]} appears before spoken cue {item["notBeforeCue"]}')
 writes.append(action)
marks=[]
for item in source['marks']:
    action={k:v for k,v in item.items() if k not in ('anchor','offset')}
    action['at']=round(starts[item['anchor']]+item['offset'],3)
    if source['format']=='writing-board-v5':action['cueId']=item['anchor']
    marks.append(action)
sketches=[]
for item in source.get('sketches',[]):
    action={k:v for k,v in item.items() if k not in ('anchor','offset')}
    action['at']=round(starts[item['anchor']]+item['offset'],3)
    if source['format']=='writing-board-v5':action['cueId']=item['anchor']
    sketches.append(action)
lesson={'format':source['format'],'title':source['title'],'audience':source['audience'],'scope':source['scope'],'boardFont':source['boardFont'],'duration':round(time+1.2,3),'sections':sections,'writes':writes,'marks':marks,'sketches':sketches,'cues':cues,'audio':audio}
if source['format']=='writing-board-v5':
    lesson['boardWidth']=source['boardWidth'];lesson['boardHeight']=source['boardHeight']
    lesson['annotationIntents']=source['annotationIntents']
    marks_by_id={mark['id']:mark for mark in marks}
    if len(marks_by_id)!=len(marks) or len(source['annotationIntents'])!=len(marks):
        raise ValueError('every v5 mark needs one unique annotation intent')
    for intent in source['annotationIntents']:
        mark=marks_by_id.get(intent['markId'])
        if not mark or any(mark[key]!=intent[key] for key in ('cueId','targetId','target','occurrence')):
            raise ValueError(f'annotation intent mismatch: {intent["markId"]}')
    section_at={s['id']:s['at'] for s in sections}
    lesson['shots']=[{k:v for k,v in shot.items() if k not in ('anchor','offset')} | {
        'at':round(section_at[shot['section']] if 'section' in shot else starts[shot['anchor']]+shot.get('offset',0),3)}
        for shot in source['camera']]
    sound=source.get('sound',{'enabled':False,'volume':0})
    if sound.get('enabled'):
        sr=24000;length=round(lesson['duration']*sr);mix=np.zeros(length,dtype=np.float32)
        sos=butter(3,[300,2700],btype='bandpass',fs=sr,output='sos')
        for action in [*writes,*marks,*sketches]:
            start=max(0,round(action['at']*sr));count=min(round(action['duration']*sr),length-start)
            if count<=0:continue
            seed=int.from_bytes(hashlib.sha256((source['title']+'/'+action['id']).encode()).digest()[:8],'big')
            rng=np.random.default_rng(seed);noise=rng.standard_normal(count).astype(np.float32)
            texture=sosfilt(sos,noise).astype(np.float32)
            peak=max(float(np.max(np.abs(texture))),1e-6);texture/=peak
            fade=min(round(.025*sr),count//3)
            envelope=np.ones(count,dtype=np.float32)
            if fade:envelope[:fade]=np.linspace(0,1,fade);envelope[-fade:]=np.linspace(1,0,fade)
            drift=.78+.22*np.sin(np.linspace(0,count/sr*16*np.pi,count,dtype=np.float32))
            mix[start:start+count]+=.035*texture*envelope*drift
        mix=np.clip(mix,-.12,.12)
        sf.write(OUT/'writing-sfx.wav',mix,sr,subtype='PCM_16')
        lesson['sound']={'src':'writing-sfx.wav','enabled':True,'volume':sound['volume'],
                         'origin':'locally synthesized filtered noise; no external asset'}
else:lesson['sectionStep']=source['sectionStep']
(OUT/'lesson.json').write_text(json.dumps(lesson,ensure_ascii=False,indent=2)+'\n')
def clock(seconds):
    minutes, rest = divmod(seconds, 60)
    return f'{int(minutes):02d}:{rest:05.2f}'
document = [f'# {source["title"]}｜课程脚本与分镜', '', source['scope'], '',
            source.get('referenceNotes',''), '',
            '以下时间由本地 Qwen 音频实测生成；`course-source.json` 是脚本与板书动作的维护处，`lesson.json` 是渲染入口。', '']
for section in sections:
    section_id = section['id']
    document += [f'## {section_id} · {clock(section["at"])}', '', '**旁白／朗读**', '']
    for voice in (item for item in source['cues'] if item['section'] == section_id):
        document.append(f'- {clock(starts[voice["id"]])}–{clock(ends[voice["id"]])}　{voice["text"]}')
        parts = [item for item in cues if item['voiceCueId'] == voice['id']]
        if len(parts)>1:
            document += [f'  - 字幕 {clock(item["start"])}–{clock(item["end"])}：{item["text"]}' for item in parts]
    document += ['', '**板书动作**', '']
    events = sorted([('write', item) for item in writes if item['section'] == section_id] +
                    [('mark', item) for item in marks if item['section'] == section_id] +
                    [('sketch', item) for item in sketches if item['section'] == section_id],
                    key=lambda entry: entry[1]['at'])
    document += [f'- {clock(item["at"])}　写出 `{item["text"]}`' if kind == 'write' else
                 f'- {clock(item["at"])}　画出 `{item["id"]}`' if kind == 'sketch' else
                 f'- {clock(item["at"])}　{item["kind"]}：{item.get("target", "Past → Now")}'
                 for kind, item in events]
    document += ['']
(OUT/'lesson-script.md').write_text('\n'.join(document)+'\n')
workspace=PROJECT.parent.parent;registry_path=PROJECT/'resources.json';registry=json.loads(registry_path.read_text());ids=[]
for filename in ('lesson.json','lesson-script.md',*(['writing-sfx.wav'] if 'sound' in lesson else [])):
    path=OUT/filename;rid=f'run:{RUN_ID}:{filename}';ids.append(rid)
    registry['resources'][rid]={'path':str(path.relative_to(workspace)),'sha256':sha(path),'bytes':path.stat().st_size,
        'role':'preview','status':'active','registeredAt':iso(now()),'unreferencedSince':None,'runId':RUN_ID}
atomic(registry_path,registry)
seconds=round(perf_counter()-START_PERF,3)
atomic(OUT/'run.json',{'runId':RUN_ID,'state':'completed','startedAt':STARTED,'completedAt':iso(now()),'resourceIds':ids,
                       'timings':{'compileSeconds':seconds}})
print(json.dumps({'status':'completed','runId':RUN_ID,'output':str(OUT/'lesson.json'),
                  'durationSeconds':lesson['duration'],'sections':len(sections),'writes':len(writes),
                  'marks':len(marks),'sketches':len(sketches),'cues':len(cues),
                  'timings':{'compileSeconds':seconds}},ensure_ascii=False))
