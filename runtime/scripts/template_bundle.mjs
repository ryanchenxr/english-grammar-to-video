import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
export const sha = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
export const digest = files => crypto.createHash('sha256').update(JSON.stringify(Object.fromEntries(Object.entries(files).sort(([a],[b])=>a.localeCompare(b))))).digest('hex');
export const safeFile = (root, relative) => {
  if (!relative || path.isAbsolute(relative) || relative.includes('\\') || relative.split('/').some(p=>p==='..'||p==='')) throw new Error('Invalid template-relative path');
  let current = root;
  for (const part of relative.split('/')) {current = path.join(current, part); if (!fs.existsSync(current) || fs.lstatSync(current).isSymbolicLink()) throw new Error(`Template file missing or symlink: ${relative}`);}
  if (!fs.statSync(current).isFile()) throw new Error(`Template file invalid: ${relative}`);
  return current;
};
export const fileMap = (root, exclude=[]) => {
  const result = {};
  const visit = (dir, prefix='') => {for (const name of fs.readdirSync(dir).sort()) {
    const relative=prefix+name, file=path.join(dir,name); if(exclude.includes(relative))continue;
    if(fs.lstatSync(file).isSymbolicLink())throw new Error(`Template symlink forbidden: ${relative}`);
    if(fs.statSync(file).isDirectory())visit(file,relative+'/');else result[relative]=sha(file);
  }};
  visit(root);return result;
};
export const templateSources = root => {
  const files=Object.fromEntries(Object.entries(fileMap(path.join(root,'src'))).map(([n,h])=>['src/'+n,h]));
  for(const n of ['package.json','package-lock.json','tsconfig.json'])files[n]=sha(safeFile(root,n));
  return files;
};
export const verifyTemplate = root => {
  const folder=path.join(root,'prebuilt'), filename=path.join(folder,'manifest.json');
  if(!fs.existsSync(filename))throw new Error('Prebuilt template missing; maintainer must build it. Runtime bundling is disabled.');
  const meta=JSON.parse(fs.readFileSync(safeFile(root,'prebuilt/manifest.json'),'utf8'));
  if(meta.schemaVersion!==1 || meta.remotionVersion!=='4.0.529')throw new Error('Prebuilt template format/version mismatch');
  const sourceFiles=templateSources(root);
  if(meta.sourceDigest!==digest(sourceFiles) || JSON.stringify(Object.entries(meta.sourceFiles).sort())!==JSON.stringify(Object.entries(sourceFiles).sort()) || meta.lockSha256!==sha(safeFile(root,'package-lock.json')))throw new Error('Prebuilt template source identity mismatch; maintainer rebuild required, no runtime bundling.');
  const files=fileMap(folder,['manifest.json']);
  if(meta.bundleId!=='grammar-bundle-'+digest(files).slice(0,16) || JSON.stringify(Object.entries(files).sort())!==JSON.stringify(Object.entries(meta.files).sort()))throw new Error('Prebuilt template missing, changed or unexpected file; no runtime bundling.');
  safeFile(folder,'bundle/index.html');return meta;
};
export const dependenciesRoot = (workspace, release, manifest) => {
  const id=manifest.dependenciesRuntimeReleaseId;
  if(id && !/^grammar-public-[a-f0-9]{16}$/.test(id))throw new Error('Invalid shared dependency runtime ID');
  const root=id?path.join(workspace,'library/runtimes',id):release;
  if(sha(path.join(root,'package-lock.json'))!==manifest.lockSha256 || !fs.existsSync(path.join(root,'node_modules/@remotion/renderer/package.json')) || JSON.parse(fs.readFileSync(path.join(root,'node_modules/@remotion/renderer/package.json'),'utf8')).version!=='4.0.529')throw new Error('Pinned Remotion dependencies unavailable or mismatched; run prepare');
  return root;
};
if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  try {const meta=verifyTemplate(path.resolve(process.argv[2])); console.log(JSON.stringify({status:'verified',bundleId:meta.bundleId,sourceDigest:meta.sourceDigest}));}
  catch(e){console.error(String(e));process.exitCode=1;}
}
