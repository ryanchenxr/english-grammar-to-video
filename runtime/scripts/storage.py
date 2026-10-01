#!/usr/bin/env python3
"""Project manifest inventory and guarded, recoverable cleanup. No daemon."""
import argparse
import datetime as dt
import hashlib
import json
import os
import shutil
import sys
import uuid
from pathlib import Path

DAY = 86400
HOLD = 7 * DAY
PLAN_LIFETIME = 3600
CLEANABLE = {'tts-original', 'tts-ready-wav', 'tts-ready-mp3', 'preview', 'screenshot', 'log', 'temp-encode'}
RUN_ARTIFACTS = {'preview', 'screenshot', 'log', 'temp-encode'}

def now(): return dt.datetime.now(dt.timezone.utc)
def iso(t): return t.isoformat().replace('+00:00', 'Z')
def parse_time(s): return dt.datetime.fromisoformat(s.replace('Z', '+00:00'))
def sha(path):
    h = hashlib.sha256()
    with path.open('rb') as f:
        for block in iter(lambda: f.read(1048576), b''): h.update(block)
    return h.hexdigest()
def read(path, default=None): return json.loads(path.read_text()) if path.exists() else default
def atomic(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    temp = path.with_name(path.name + '.tmp-' + uuid.uuid4().hex)
    try:
        with temp.open('w') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            f.write('\n'); f.flush(); os.fsync(f.fileno())
        os.replace(temp, path)
    finally:
        if temp.exists(): temp.unlink()

def safe_path(workspace, relative, project_id=None, cleanup=False):
    rel = Path(relative)
    if rel.is_absolute() or '..' in rel.parts or not rel.parts: raise ValueError('path must be workspace-relative')
    if cleanup and not (rel.parts[:3] == ('projects', project_id, 'audio') or
                        rel.parts[:4] == ('projects', project_id, 'work', 'runs') or
                        rel.parts[:3] == ('projects', project_id, 'exports') or rel.parts[0] == 'cache'):
        raise ValueError('path outside managed cleanup roots')
    root = workspace.resolve(); current = root
    for part in rel.parts:
        current = current / part
        if current.is_symlink(): raise ValueError(f'symlink path is never managed: {current}')
    if not current.resolve(strict=False).is_relative_to(root): raise ValueError('path escapes workspace')
    return current

def project_paths(workspace, project_id):
    if not project_id or '/' in project_id or project_id in ('.', '..'): raise ValueError('invalid project id')
    base = workspace / 'projects' / project_id
    return base, base / 'project.json', base / 'resources.json'

def load_project(workspace, project_id):
    base, pp, rp = project_paths(workspace, project_id)
    project = read(pp); registry = read(rp)
    if not project or not registry: raise ValueError('project.json/resources.json missing')
    if project.get('projectId') != project_id or not isinstance(registry.get('resources'), dict): raise ValueError('project manifest invalid')
    return base, project, registry

def resolve_project_font(workspace, project_id, explicit=None):
    """Resolve the registered original font; course replacement cannot change it."""
    base, project, registry = load_project(workspace, project_id)
    resource_id = project.get('fontResourceId')
    resource = registry['resources'].get(resource_id)
    if not resource or resource.get('role') != 'font-original' or resource.get('status') != 'active':
        raise ValueError('registered font resource missing or not active')
    font = safe_path(workspace, resource['path'])
    if not font.is_file() or font.suffix.lower() not in ('.ttf', '.otf'):
        raise ValueError('registered font file missing or invalid')
    if font.stat().st_size != resource.get('bytes') or sha(font) != resource.get('sha256'):
        raise ValueError('registered font checksum/size mismatch')
    if explicit is not None:
        if not isinstance(explicit, str) or not explicit.strip():
            raise ValueError('explicit boardFont must be a nonempty path')
        candidate = Path(explicit).expanduser()
        if not candidate.is_absolute(): candidate = base / 'source' / candidate
        try: relative = candidate.relative_to(workspace.resolve())
        except ValueError: raise ValueError('explicit boardFont conflicts with registered font')
        selected = safe_path(workspace, relative)
        if selected != font:
            raise ValueError('explicit boardFont conflicts with registered font')
    return font


def versions(base):
    result = []
    for path in sorted((base / 'history' / 'versions').glob('*.json')):
        value = read(path)
        if not isinstance(value, dict) or not value.get('id') or not isinstance(value.get('resourceIds'), list): raise ValueError(f'invalid version: {path}')
        result.append(value)
    return result

def runs(base):
    result = []
    for path in sorted((base / 'work' / 'runs').glob('*/run.json')):
        value = read(path)
        if not isinstance(value, dict) or not value.get('runId'): raise ValueError(f'invalid run: {path}')
        result.append(value)
    return result

def protection(base, project):
    vv = versions(base); rr = runs(base)
    by_id = {v['id']: v for v in vv}
    required = {project.get('currentVersionId'), *project.get('acceptedVersionIds', []), *project.get('pinnedVersionIds', [])} - {None}
    if not required.issubset(by_id): raise ValueError(f'protected version manifest missing: {sorted(required-set(by_id))}')
    recoverable = sorted((v for v in vv if v.get('recoverable') and v['id'] not in required), key=lambda v: v.get('createdAt', ''), reverse=True)
    required.update(v['id'] for v in recoverable[:3])
    refs = set()
    for v in vv:
        if v['id'] in required: refs.update(v['resourceIds'])
    blocked = []
    complete = sorted((r for r in rr if r.get('state') == 'completed'), key=lambda r: r.get('completedAt', ''), reverse=True)
    last_three = {r['runId'] for r in complete[:3]}
    for r in rr:
        state = r.get('state')
        if state in ('active', 'recovering') or state == 'failed' and not r.get('resolved') or state not in ('active', 'recovering', 'completed', 'failed'):
            blocked.append(r['runId'])
            refs.update(r.get('resourceIds', []))
        elif r['runId'] in last_three: refs.update(r.get('resourceIds', []))
    return refs, blocked, last_three, {r['runId']: r for r in rr}, required

def reconcile(workspace, base, project, registry):
    refs, blocked, last_three, rr, vv = protection(base, project)
    changed = False; timestamp = iso(now())
    for rid, resource in registry['resources'].items():
        if rid in refs:
            if resource.get('unreferencedSince') is not None:
                resource['unreferencedSince'] = None; changed = True
        elif resource.get('status', 'active') == 'active' and resource.get('unreferencedSince') is None:
            resource['unreferencedSince'] = timestamp; changed = True
    if changed: atomic(base / 'resources.json', registry)
    return refs, blocked, last_three, rr, vv

def eligible(workspace, project_id, resource, rid, refs, blocked, last_three, rr, at):
    if blocked or rid in refs or resource.get('status', 'active') != 'active': return None
    role = resource.get('role')
    if role not in CLEANABLE: return None
    path = safe_path(workspace, resource['path'], project_id, cleanup=True)
    if not path.is_file() or path.is_symlink(): return None
    if path.stat().st_size != resource.get('bytes') or sha(path) != resource.get('sha256'): return None
    if role in RUN_ARTIFACTS:
        run = rr.get(resource.get('runId'))
        finished = run and (run.get('state') == 'completed' or run.get('state') == 'failed' and run.get('resolved'))
        if not finished or role != 'temp-encode' and run['runId'] in last_three: return None
        if role != 'temp-encode' and (not run.get('completedAt') or (at-parse_time(run['completedAt'])).total_seconds() < HOLD): return None
        return 'completed unreferenced temporary encoding' if role == 'temp-encode' else 'older than last 3 completed runs and 7 days'
    since = resource.get('unreferencedSince')
    if not since or (at-parse_time(since)).total_seconds() < HOLD: return None
    return 'last protected reference lost at least 7 days ago'

def fingerprint(base):
    paths = [base / 'project.json', base / 'resources.json', *(base / 'history' / 'versions').glob('*.json'), *(base / 'work' / 'runs').glob('*/run.json')]
    h = hashlib.sha256()
    for p in sorted(paths):
        h.update(str(p.relative_to(base)).encode()); h.update(sha(p).encode())
    return h.hexdigest()

def trash_stats(workspace, project_id):
    result = {'stagedFiles': 0, 'stagedLogicalBytes': 0, 'stagedAllocatedBytes': 0,
              'purgedFiles': 0, 'purgedLogicalBytes': 0, 'actualReleasedBytesKnown': False}
    trash_root = workspace / 'trash'
    if trash_root.is_symlink(): raise ValueError('trash root is a symlink')
    for folder in trash_root.glob('*'):
        if folder.is_symlink() or not folder.is_dir(): continue
        record_path = folder / 'record.json'
        if record_path.is_symlink(): continue
        record = read(record_path)
        if not record or record.get('projectId') != project_id: continue
        if record.get('state') == 'staged':
            result['stagedFiles'] += 1; result['stagedLogicalBytes'] += record['bytes']
            payload = folder / 'payload'
            if payload.is_file() and not payload.is_symlink(): result['stagedAllocatedBytes'] += payload.stat().st_blocks * 512
        elif record.get('state') == 'purged':
            result['purgedFiles'] += 1; result['purgedLogicalBytes'] += record['bytes']
    return result

def inventory(workspace, project_id):
    base, project, registry = load_project(workspace, project_id)
    refs, blocked, last_three, rr, vv = protection(base, project)
    count = {}
    for rid, res in registry['resources'].items():
        role = res.get('role', 'unknown'); item = count.setdefault(role, {'files': 0, 'logicalBytes': 0, 'allocatedBytes': 0, 'protected': 0, 'staged': 0})
        item['files'] += 1; item['logicalBytes'] += res.get('bytes', 0)
        if rid in refs: item['protected'] += 1
        if res.get('status') == 'staged': item['staged'] += 1
        try:
            p = safe_path(workspace, res['path'])
            if p.is_file() and not p.is_symlink(): item['allocatedBytes'] += p.stat().st_blocks * 512
        except (ValueError, KeyError): pass
    known = {r['path'] for r in registry['resources'].values()}
    closures = read(base/'unknown.json', {'closures':{}})['closures']
    unknown = []
    for sub in ('audio', 'exports', 'work/runs'):
        root = base / sub
        if not root.exists(): continue
        for p in root.rglob('*'):
            if p.is_symlink(): unknown.append(str(p.relative_to(workspace))); continue
            if not p.is_file() or p.name == 'run.json': continue
            rel = str(p.relative_to(workspace))
            if rel not in known and rel not in closures: unknown.append(rel)
    return {'projectId':project_id,'byRole':count,'protectedVersionIds':sorted(vv),'blockingRuns':blocked,'unknownFiles':sorted(unknown),'unknownClosures':closures,'trash':trash_stats(workspace, project_id)}

def preview(workspace, project_id):
    base, project, registry = load_project(workspace, project_id)
    refs, blocked, last_three, rr, vv = reconcile(workspace, base, project, registry)
    at = now(); candidates = []
    for rid, res in registry['resources'].items():
        reason = eligible(workspace, project_id, res, rid, refs, blocked, last_three, rr, at)
        if reason:
            p = safe_path(workspace, res['path'], project_id, cleanup=True)
            candidates.append({'resourceId':rid,'path':res['path'],'sha256':res['sha256'],'bytes':res['bytes'],'allocatedBytes':p.stat().st_blocks*512,'role':res['role'],'reason':reason})
    plan = {'schemaVersion':1,'planId':uuid.uuid4().hex,'projectId':project_id,'createdAt':iso(at),'expiresAt':iso(at+dt.timedelta(seconds=PLAN_LIFETIME)),'manifestFingerprint':fingerprint(base),'blockingRuns':blocked,'items':candidates,'status':'preview'}
    if (workspace/'cache').is_symlink() or (workspace/'cache'/'cleanup-plans').is_symlink(): raise ValueError('plan cache is a symlink')
    path = workspace/'cache'/'cleanup-plans'/(plan['planId']+'.json');atomic(path,plan)
    return {'planPath':str(path),'planId':plan['planId'],'items':candidates,'eligibleLogicalBytes':sum(x['bytes'] for x in candidates),'eligibleAllocatedBytes':sum(x['allocatedBytes'] for x in candidates),'trash':trash_stats(workspace, project_id),'blockedRuns':blocked}

def apply(workspace, plan_path):
    if (workspace/'cache').is_symlink() or (workspace/'cache'/'cleanup-plans').is_symlink() or (workspace/'trash').is_symlink(): raise ValueError('managed cache/trash is a symlink')
    plan_path = plan_path.resolve()
    if not plan_path.is_relative_to((workspace/'cache'/'cleanup-plans').resolve()) or plan_path.is_symlink(): raise ValueError('plan outside managed cache')
    plan = read(plan_path)
    if not plan or plan.get('status') != 'preview' or now() > parse_time(plan['expiresAt']): raise ValueError('plan missing, used or expired; preview again')
    project_id = plan['projectId']; base, project, registry = load_project(workspace, project_id)
    if fingerprint(base) != plan['manifestFingerprint']: raise ValueError('references or manifest changed; preview again')
    refs, blocked, last_three, rr, vv = protection(base, project)
    if blocked: raise ValueError('active/recovering/unresolved run; preview again')
    outcomes = []; at = now()
    for item in plan['items']:
        rid = item['resourceId']; res = registry['resources'].get(rid)
        if not res or any(res.get(k) != item[k] for k in ('path','sha256','bytes','role')):
            outcomes.append({'resourceId':rid,'status':'skipped_changed'}); continue
        reason = eligible(workspace, project_id, res, rid, refs, blocked, last_three, rr, at)
        if not reason:
            outcomes.append({'resourceId':rid,'status':'skipped_protected_or_changed'}); continue
        source = safe_path(workspace, res['path'], project_id, cleanup=True)
        tid = uuid.uuid4().hex; folder=workspace/'trash'/tid; folder.mkdir(parents=True, exist_ok=False)
        payload=folder/'payload';record={'trashId':tid,'projectId':project_id,'resourceId':rid,'originalPath':res['path'],'sha256':res['sha256'],'bytes':res['bytes'],'state':'prepared','stagedAt':iso(at),'purgeAfter':iso(at+dt.timedelta(seconds=HOLD))}
        atomic(folder/'record.json',record)
        try:
            os.replace(source,payload)
            res['status']='staged';res['trashId']=tid;atomic(base/'resources.json',registry)
            record['state']='staged';atomic(folder/'record.json',record)
            outcomes.append({'resourceId':rid,'status':'staged','trashId':tid,'logicalBytes':res['bytes']})
        except Exception:
            outcomes.append({'resourceId':rid,'status':'partial_failure','trashId':tid,'recordPath':str(folder/'record.json')})
    plan['status']='applied';plan['outcomes']=outcomes;atomic(plan_path,plan)
    return {'planId':plan['planId'],'outcomes':outcomes,'stagedLogicalBytes':sum(x.get('logicalBytes',0) for x in outcomes),'physicallyReleasedBytes':0}

def restore(workspace, tid):
    if not tid or '/' in tid or tid in ('.','..'): raise ValueError('invalid trash id')
    folder=workspace/'trash'/tid;payload=folder/'payload'
    if (workspace/'trash').is_symlink() or folder.is_symlink() or (folder/'record.json').is_symlink(): raise ValueError('trash symlink is never followed')
    record=read(folder/'record.json')
    if not record or record.get('trashId') != tid or record.get('state') not in ('prepared','staged') or payload.is_symlink(): raise ValueError('trash record not restorable')
    base, project, registry=load_project(workspace,record['projectId'])
    dest=safe_path(workspace,record['originalPath'],record['projectId'],cleanup=True)
    if record['state']=='prepared' and not payload.exists() and dest.is_file() and not dest.is_symlink() and sha(dest)==record['sha256']:
        record['state']='aborted_before_move';record['restoredAt']=iso(now());atomic(folder/'record.json',record)
        return {'trashId':tid,'status':'already_at_original','path':str(dest)}
    if not payload.is_file(): raise ValueError('trash payload missing; inspect prepared record')
    if dest.exists() or dest.is_symlink(): raise FileExistsError(f'restore conflict; not overwritten: {dest}')
    if sha(payload)!=record['sha256'] or payload.stat().st_size!=record['bytes']: raise ValueError('trash payload changed')
    dest.parent.mkdir(parents=True,exist_ok=True);os.replace(payload,dest)
    res=registry['resources'].get(record['resourceId'])
    if res:
        res['status']='active';res.pop('trashId',None);res['unreferencedSince']=iso(now());atomic(base/'resources.json',registry)
    record['state']='restored';record['restoredAt']=iso(now());atomic(folder/'record.json',record)
    return {'trashId':tid,'status':'restored','path':str(dest)}

def prune(workspace, project_id):
    base,project,registry=load_project(workspace,project_id);refs,blocked,last_three,rr,vv=protection(base,project)
    if blocked:raise ValueError('active/recovering/unresolved run; pruning stopped')
    outcomes=[]
    if (workspace/'trash').is_symlink(): raise ValueError('trash root is a symlink')
    for folder in sorted((workspace/'trash').glob('*')):
        if folder.is_symlink() or not folder.is_dir() or (folder/'record.json').is_symlink(): continue
        record=read(folder/'record.json')
        if not record or record.get('projectId')!=project_id or record.get('state')!='staged':continue
        tid=record['trashId'];rid=record['resourceId'];payload=folder/'payload';res=registry['resources'].get(rid)
        if rid in refs or not res or res.get('trashId')!=tid or res.get('path')!=record['originalPath'] or res.get('sha256')!=record['sha256'] or res.get('bytes')!=record['bytes'] or now()<parse_time(record['purgeAfter']) or not payload.is_file() or payload.is_symlink() or sha(payload)!=record['sha256']:
            outcomes.append({'trashId':tid,'status':'protected_or_not_due'});continue
        allocated=payload.stat().st_blocks*512;payload.unlink()
        res['status']='purged';res.pop('trashId',None);atomic(base/'resources.json',registry)
        record['state']='purged';record['purgedAt']=iso(now());record['allocatedBytesRemovedEstimate']=allocated;atomic(folder/'record.json',record)
        outcomes.append({'trashId':tid,'status':'purged','logicalBytes':record['bytes'],'allocatedBytesRemovedEstimate':allocated})
    return {'outcomes':outcomes,'logicalPurgedBytes':sum(x.get('logicalBytes',0) for x in outcomes),'allocatedBytesRemovedEstimate':sum(x.get('allocatedBytesRemovedEstimate',0) for x in outcomes),'actualFilesystemFreeBytesKnown':False}

def unknown_close(workspace,project_id,relative,decision,role):
    base,project,registry=load_project(workspace,project_id);path=safe_path(workspace,relative,project_id,cleanup=True)
    if not path.is_file() or path.is_symlink():raise ValueError('unknown path missing or symlink')
    rel=str(path.relative_to(workspace));known={r['path'] for r in registry['resources'].values()}
    if rel in known:raise ValueError('already registered')
    info={'sha256':sha(path),'bytes':path.stat().st_size,'decision':decision,'role':role,'closedAt':iso(now())}
    if decision=='register':
        rid=info['sha256']
        if rid in registry['resources']:raise ValueError('content already registered; add reference instead')
        registry['resources'][rid]={'path':rel,'sha256':rid,'bytes':info['bytes'],'role':role,'registeredAt':info['closedAt'],'unreferencedSince':info['closedAt'],'status':'active'}
        atomic(base/'resources.json',registry)
    closures=read(base/'unknown.json',{'closures':{}});closures['closures'][rel]=info;atomic(base/'unknown.json',closures)
    return {'path':rel,**info}

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--workspace',required=True);ap.add_argument('--project',required=True)
    sub=ap.add_subparsers(dest='cmd',required=True)
    sub.add_parser('inventory');sub.add_parser('preview')
    sub.add_parser('apply').add_argument('plan')
    sub.add_parser('restore').add_argument('trash_id')
    sub.add_parser('prune')
    u=sub.add_parser('unknown');u.add_argument('action',choices=['list','close']);u.add_argument('--path');u.add_argument('--decision',choices=['preserve','register']);u.add_argument('--role',default='unknown')
    args=ap.parse_args();workspace=Path(args.workspace).resolve()
    if args.cmd=='inventory': result=inventory(workspace,args.project)
    elif args.cmd=='preview': result=preview(workspace,args.project)
    elif args.cmd=='apply': result=apply(workspace,Path(args.plan))
    elif args.cmd=='restore':result=restore(workspace,args.trash_id)
    elif args.cmd=='prune':result=prune(workspace,args.project)
    elif args.action=='list':result=inventory(workspace,args.project)['unknownFiles']
    else:
        if not args.path or not args.decision:raise ValueError('unknown close needs --path and --decision')
        result=unknown_close(workspace,args.project,args.path,args.decision,args.role)
    print(json.dumps(result,ensure_ascii=False,indent=2))
if __name__=='__main__':
    try:main()
    except Exception as e:print(f'STORAGE_ERROR: {e}',file=sys.stderr);sys.exit(1)
