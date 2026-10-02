#!/usr/bin/env node
// Render immutable prebuilt templates with per-course, managed resources. Never bundle here.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {sha,verifyTemplate,dependenciesRoot} from './template_bundle.mjs';
const write=(p,v)=>{fs.mkdirSync(path.dirname(p),{recursive:true});const t=p+'.tmp-'+crypto.randomUUID();fs.writeFileSync(t,JSON.stringify(v,null,2)+'\n');fs.renameSync(t,p);};
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const fingerprint=s=>crypto.createHash('sha256').update(s||'').digest('hex');
const buildModules=()=>Object.keys(createRequire(import.meta.url).cache).filter(p=>/[\\/](@remotion[\\/]bundler|webpack|@rspack)[\\/]/.test(p));
const args=process.argv.slice(2),option=n=>{const i=args.indexOf(n);return i<0?null:args[i+1];};
if(args.includes('--worker')) {
  const runDir=path.resolve(option('--worker')),release=path.resolve(option('--release')),depsRoot=path.resolve(option('--dependencies-root'));
  const statePath=path.join(runDir,'worker.json');let state=read(statePath),browser;
  const before=new Set(buildModules());const step=stage=>{state.stage=stage;write(statePath,state);console.log('STAGE',stage);};
  try {
    state.host={nodeOptionsPresent:!!process.env.NODE_OPTIONS,nodeOptionsInherited:fingerprint(process.env.NODE_OPTIONS)===state.parentNodeOptionsFingerprint,
      brokerHookStatus:[fs.promises.mkdir,fs.promises.rm].some(f=>/tryBrokerHostOperation|wrappedPromisesMkdir|wrappedPromisesRm/.test(Function.prototype.toString.call(f)))?'observed-active-hook':'unknown'};
    if(!state.host.nodeOptionsInherited)throw Error('NODE_OPTIONS inheritance changed');
    const meta=verifyTemplate(release);state.bundleId=meta.bundleId;
    for(const [n,h] of Object.entries(meta.rendererFileHashes))if(sha(path.join(depsRoot,'node_modules/@remotion/renderer',n))!==h)throw Error('Renderer implementation differs from pinned 4.0.529: '+n);
    step('renderer-load');const req=createRequire(path.join(depsRoot,'package.json'));const {openBrowser,selectComposition,renderMedia,renderStill}=req('@remotion/renderer');
    const noBuild=()=>{state.newBuildModulesLoaded=buildModules().filter(p=>!before.has(p)).length;if(state.newBuildModulesLoaded)throw Error('Unexpected build modules loaded; prebuilt-only validation failed');};noBuild();
    step('browser-open');browser=await openBrowser('chrome',{browserExecutable:option('--browser'),logLevel:'verbose'});state.browserOpened=true;
    const props=read(path.join(runDir,'tmp/props.json')),serveUrl=path.join(release,'prebuilt/bundle');step('composition-select');
    const composition=await selectComposition({serveUrl,id:'GrammarLesson',inputProps:props,puppeteerInstance:browser,logLevel:'verbose'});state.compositionSelected=true;
    step('rendering');let encoding=false;
    if(option('--still')!==null)await renderStill({serveUrl,composition,inputProps:props,puppeteerInstance:browser,frame:Number(option('--still')),output:path.join(runDir,'preview.png'),logLevel:'verbose'});
    else await renderMedia({serveUrl,composition,inputProps:props,puppeteerInstance:browser,codec:'h264',crf:20,concurrency:2,
      frameRange:option('--frames')?option('--frames').split('-').map(Number):undefined,outputLocation:path.join(runDir,'preview.mp4'),logLevel:'verbose',
      onProgress:p=>{state.renderedFrames=p.renderedFrames;state.encodedFrames=p.encodedFrames;if(p.encodedFrames>0&&!encoding){encoding=true;step('encoding');}}});
    noBuild();state.state='completed';state.stage='completed';state.prebuiltOnly=true;state.sourceCompilationRequested=false;
  }catch(e){state.state='failed';state.failedStage=state.stage;state.error=String(e);console.error(e);process.exitCode=1;}
  finally{if(browser)try{await browser.close({silent:true});}catch(e){state.browserCloseError=String(e);}write(statePath,state);}
} else {
  const started=performance.now(),projectDir=path.resolve(args.shift()??''),workspace=path.dirname(path.dirname(projectDir));
  if(!fs.existsSync(path.join(projectDir,'project.json')))throw Error('usage: render_project.mjs <project-dir> [--run-id ID] [--lesson REL] [--frames A-B | --still N] [--export NAME]');
  const project=read(path.join(projectDir,'project.json')),release=path.join(workspace,'library/runtimes',project.runtimeReleaseId),runtime=read(path.join(release,'runtime.json'));
  for(const [n,h] of Object.entries(runtime.files))if(!fs.existsSync(path.join(release,n))||sha(path.join(release,n))!==h)throw Error('Pinned runtime changed: '+n);
  const runId=option('--run-id')??'render-'+crypto.randomUUID();if(!/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,100}$/.test(runId))throw Error('invalid run ID');
  const still=option('--still'),frames=option('--frames'),exportName=option('--export');
  if(still!==null&&frames!==null||still!==null&&!/^\d+$/.test(still)||frames!==null&&!/^\d+-\d+$/.test(frames))throw Error('invalid frame selection');
  if(exportName!==null&&!/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,100}$/.test(exportName))throw Error('invalid export name');
  const lessonOption=option('--lesson'),lessonPath=lessonOption?path.resolve(projectDir,lessonOption):path.join(projectDir,'source/lesson.json');
  if(!lessonPath.startsWith(projectDir+path.sep)||fs.lstatSync(lessonPath).isSymbolicLink())throw Error('lesson must be a regular project file');
  const runDir=path.join(projectDir,'work/runs',runId);fs.mkdirSync(runDir,{recursive:false});const runPath=path.join(runDir,'run.json'),startedAt=new Date().toISOString(),timings={};
  write(runPath,{runId,state:'active',stage:'preflight',startedAt,resourceIds:[],runtimeReleaseId:project.runtimeReleaseId});
  const tmp=path.join(runDir,'tmp'),output=path.join(runDir,still!==null?'preview.png':'preview.mp4'),logPath=path.join(runDir,'render.log');let errorText=null,stage='preflight',worker={},bundle;
  try {
    bundle=verifyTemplate(release);const depsRoot=dependenciesRoot(workspace,release,runtime);
    const lesson=read(lessonPath),validator=await import(pathToFileURL(path.join(release,'scripts/validate.mjs')));const errors=validator.validateLesson(lesson,lessonPath);if(errors.length)throw Error(errors.join('\n'));
    const browsers=[process.env.GRAMMAR_BROWSER_EXECUTABLE,process.env.CHROME_PATH,...(process.platform==='darwin'?['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome']:[]),...(process.platform==='win32'?[path.join(process.env.PROGRAMFILES??'C:\\Program Files','Google/Chrome/Application/chrome.exe'),path.join(process.env.LOCALAPPDATA??'','Google/Chrome/Application/chrome.exe')]:[])].filter(Boolean);
    const browser=browsers.find(f=>fs.existsSync(f));if(!browser)throw Error('Existing Chrome/Chromium required; set GRAMMAR_BROWSER_EXECUTABLE');
    const python=process.env.GRAMMAR_PYTHON;if(!python)throw Error('Prepared Python required; use grammar_video.py');
    fs.mkdirSync(tmp);const log=fs.openSync(logPath,'wx');stage='resource-inputs';const inputStart=performance.now();
    const prep=spawnSync(python,[path.join(release,'scripts/prepare_render_inputs.py'),'--project',projectDir,'--lesson',lessonPath,'--out-dir',tmp],{stdio:['ignore',log,log]});
    timings.glyphAndResourceSeconds=+((performance.now()-inputStart)/1000).toFixed(3);if(prep.status!==0){fs.closeSync(log);throw Error('Managed font/audio/glyph preparation failed; see render.log');}
    const parentNodeOptionsFingerprint=fingerprint(process.env.NODE_OPTIONS);write(path.join(runDir,'worker.json'),{state:'active',stage:'worker-start',parentNodeOptionsFingerprint});
    const tempDir=path.join(tmp,'renderer-temp');fs.mkdirSync(tempDir);stage='renderer';const renderStart=performance.now();
    const workerArgs=[fileURLToPath(import.meta.url),'--worker',runDir,'--release',release,'--dependencies-root',depsRoot,'--browser',browser,...(still!==null?['--still',still]:[]),...(frames!==null?['--frames',frames]:[])];
    const result=spawnSync(process.execPath,workerArgs,{cwd:runDir,env:{...process.env,TMPDIR:tempDir,TMP:tempDir,TEMP:tempDir},stdio:['ignore',log,log]});fs.closeSync(log);
    worker=read(path.join(runDir,'worker.json'));timings.renderSeconds=+((performance.now()-renderStart)/1000).toFixed(3);
    if(result.status!==0||worker.state!=='completed'||!fs.existsSync(output))throw Error(worker.error??'Renderer did not complete; see render.log');
    stage='export';if(exportName!==null){const target=path.join(projectDir,'exports',`${exportName}-${runId}.mp4`);if(still!==null||fs.existsSync(target))throw Error('Export exists or output is still');fs.copyFileSync(output,target,fs.constants.COPYFILE_EXCL);}
  }catch(e){errorText=String(e);}
  finally {
    const registryPath=path.join(projectDir,'resources.json'),registry=read(registryPath),ids=[];
    const register=(file,role,id)=>{registry.resources[id]={path:path.relative(workspace,file),sha256:sha(file),bytes:fs.statSync(file).size,role,status:'active',registeredAt:new Date().toISOString(),unreferencedSince:null,runId};ids.push(id);};
    for(const file of [output,logPath,path.join(runDir,'worker.json')])if(fs.existsSync(file))register(file,file===output?'preview':'log',`run:${runId}:${path.basename(file)}`);
    if(fs.existsSync(tmp))for(const relative of fs.readdirSync(tmp,{recursive:true})){const file=path.join(tmp,relative);if(fs.statSync(file).isFile())register(file,'temp-encode',`run:${runId}:tmp/${relative}`);}
    if(!errorText&&exportName!==null){const target=path.join(projectDir,'exports',`${exportName}-${runId}.mp4`);register(target,'export',`export:${runId}`);}
    write(registryPath,registry);const inputs=fs.existsSync(path.join(tmp,'inputs.json'))?read(path.join(tmp,'inputs.json')):{};
    write(runPath,{runId,state:errorText?'failed':'completed',stage:errorText?(worker.failedStage??stage):'completed',startedAt,completedAt:new Date().toISOString(),resourceIds:ids,
      inputVersionId:lessonOption?null:project.currentVersionId,inputLessonSha256:sha(lessonPath),runtimeReleaseId:project.runtimeReleaseId,bundleId:bundle?.bundleId,templateSourceDigest:bundle?.sourceDigest,prebuiltOnly:true,sourceCompilationRequested:false,
      ...inputs,...worker,state:errorText?'failed':'completed',stage:errorText?(worker.failedStage??stage):'completed',
      ...(errorText?{failedStage:worker.failedStage??stage}:{}),timings:{...timings,totalSeconds:+((performance.now()-started)/1000).toFixed(3)},output:fs.existsSync(output)?path.relative(projectDir,output):null,
      ...(errorText?{state:'failed',error:errorText,resolved:false}:{})});
  }
  if(errorText){console.error(errorText);process.exitCode=1;}else console.log(JSON.stringify({status:'completed',runId,output,bundleId:bundle.bundleId,prebuiltOnly:true,newBuildModulesLoaded:worker.newBuildModulesLoaded,timings}));
}
