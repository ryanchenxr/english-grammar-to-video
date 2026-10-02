// Maintainer-only build. Not called by prepare/init/build/render.
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {sha,digest,fileMap,templateSources,verifyTemplate} from './template_bundle.mjs';
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url))),args=process.argv.slice(2);
const option=n=>{const i=args.indexOf(n);return i<0?null:args[i+1];};
const work=option('--work-dir'),deps=option('--dependencies-root');
if(!work||!deps)throw Error('usage: node build_template_bundle.mjs --work-dir <new-build-work-directory> --dependencies-root <installed runtime>');
if(fs.existsSync(path.join(root,'runtime.json')))throw Error('Cannot rebuild an immutable installed runtime');
const out=path.join(root,'prebuilt');if(fs.existsSync(out))throw Error('Prebuilt output already exists; archive the previous maintainer artifact first');
const inputRoot=path.resolve(work);if(inputRoot.startsWith(root+path.sep)||inputRoot===root)throw Error('Build work must be outside installed/source runtime');
fs.mkdirSync(inputRoot,{recursive:false});const input=path.join(inputRoot,'source');fs.mkdirSync(input);
fs.cpSync(path.join(root,'src'),path.join(input,'src'),{recursive:true});
for(const n of ['package.json','package-lock.json','tsconfig.json'])fs.copyFileSync(path.join(root,n),path.join(input,n));
const dependencies=path.resolve(deps);if(sha(path.join(dependencies,'package-lock.json'))!==sha(path.join(root,'package-lock.json')))throw Error('Build dependency lock differs');
fs.symlinkSync(path.join(dependencies,'node_modules'),path.join(input,'node_modules'),process.platform==='win32'?'junction':'dir');
const req=createRequire(path.join(input,'package.json'));if(req('@remotion/bundler/package.json').version!=='4.0.529')throw Error('Expected Remotion 4.0.529');
const started=performance.now();const {bundle}=req('@remotion/bundler');
await bundle({entryPoint:path.join(input,'src/index.tsx'),rootDir:input,outDir:path.join(out,'bundle'),publicPath:'./',enableCaching:false,gitSource:null,webpackOverride:c=>({...c,devtool:false})});
const html=path.join(out,'bundle/index.html');fs.writeFileSync(html,fs.readFileSync(html,'utf8').replace(/window\.remotion_cwd = "(?:[^"\\]|\\.)*";/,'window.remotion_cwd = ".";'));
fs.mkdirSync(path.join(out,'licenses'));const lock=JSON.parse(fs.readFileSync(path.join(root,'package-lock.json'),'utf8'));const notices=[];
for(const relative of Object.keys(lock.packages).sort()) {
  if(!relative)continue;const folder=path.join(dependencies,relative);if(!fs.existsSync(folder))continue;
  for(const name of fs.readdirSync(folder).sort())if(/^(licen[sc]e(\.md|\.txt)?|copying|notice(\.txt)?)$/i.test(name) && fs.statSync(path.join(folder,name)).isFile())notices.push(`=== ${relative} / ${name} ===\n`+fs.readFileSync(path.join(folder,name),'utf8'));
}
fs.writeFileSync(path.join(out,'licenses/dependency-notices.txt'),notices.join('\n\n'));
fs.writeFileSync(path.join(out,'licenses/README.md'),'Prebuilt JavaScript includes Remotion 4.0.529 (Remotion license), React (MIT), svg-path-properties (ISC) and their dependencies. Original terms apply; this artifact is not relicensed as MIT. Notices also include build dependencies.\n');
const sourceFiles=templateSources(root),files=fileMap(out);
const meta={schemaVersion:1,remotionVersion:'4.0.529',sourceFiles,sourceDigest:digest(sourceFiles),lockSha256:sha(path.join(root,'package-lock.json')),files,bundleId:'grammar-bundle-'+digest(files).slice(0,16),rendererFileHashes:Object.fromEntries(['dist/index.js','dist/render-media.js','dist/select-composition.js','dist/prepare-server.js'].map(n=>[n,sha(path.join(dependencies,'node_modules/@remotion/renderer',n))]))};
fs.writeFileSync(path.join(out,'manifest.json'),JSON.stringify(meta,null,2)+'\n');verifyTemplate(root);
console.log(JSON.stringify({status:'built',bundleId:meta.bundleId,sourceDigest:meta.sourceDigest,seconds:+((performance.now()-started)/1000).toFixed(3)}));
