#!/usr/bin/env node
// Render from a project's pinned source snapshot. Generated files stay in work/cache.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';

const started = performance.now();
const sha = (p) => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const write = (p, value) => {
  fs.mkdirSync(path.dirname(p), {recursive: true});
  const temp = `${p}.tmp-${crypto.randomUUID()}`;
  fs.writeFileSync(temp, JSON.stringify(value, null, 2) + '\n');
  fs.renameSync(temp, p);
};
const args = process.argv.slice(2);
const projectDir = path.resolve(args.shift() ?? '');
if (!projectDir || !fs.existsSync(path.join(projectDir, 'project.json'))) throw new Error('usage: render_project.mjs <project-dir> [--run-id ID] [--still FRAME | --frames START-END] [--export NAME]');
const option = (name) => {const i = args.indexOf(name); return i < 0 ? null : args[i + 1];};
const runId = option('--run-id') ?? `render-${new Date().toISOString().replace(/[:.]/g, '-')}-${crypto.randomUUID().slice(0, 8)}`;
if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,100}$/.test(runId)) throw new Error('invalid run ID');
const still = option('--still'); const frames = option('--frames'); const exportName = option('--export'); const lessonOption = option('--lesson');
if (still !== null && frames !== null) throw new Error('choose still or frames');
if (still !== null && !/^\d+$/.test(still)) throw new Error('still frame must be integer');
if (frames !== null && !/^\d+-\d+$/.test(frames)) throw new Error('frames must be start-end');
if (exportName !== null && !/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,100}$/.test(exportName)) throw new Error('invalid export name');
const workspace = path.dirname(path.dirname(projectDir));
const project = read(path.join(projectDir, 'project.json'));
const release = path.join(workspace, 'library', 'runtimes', project.runtimeReleaseId);
const runtime = read(path.join(release, 'runtime.json'));
for (const [relative, expected] of Object.entries(runtime.files)) {
  const filename = path.join(release, relative);
  if (!fs.existsSync(filename) || sha(filename) !== expected) throw new Error(`pinned runtime changed: ${relative}`);
}
const depCandidates = [path.join(release, 'node_modules')];
const deps = depCandidates.find((candidate) => fs.existsSync(path.join(candidate, '@remotion/cli/remotion-cli.js')) &&
  fs.existsSync(path.join(path.dirname(candidate), 'package-lock.json')) &&
  sha(path.join(path.dirname(candidate), 'package-lock.json')) === runtime.lockSha256);
if (!deps) throw new Error('Pinned dependencies unavailable; install from runtime package-lock.json into the shared runtime directory');
const lessonPath = lessonOption ? path.resolve(projectDir, lessonOption) : path.join(projectDir, 'source/lesson.json');
const browserCandidates = [process.env.GRAMMAR_BROWSER_EXECUTABLE, process.env.CHROME_PATH,
  ...(process.platform === 'darwin' ? ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'] : []),
  ...(process.platform === 'win32' ? [path.join(process.env.PROGRAMFILES ?? 'C:\\Program Files', 'Google/Chrome/Application/chrome.exe'),
    path.join(process.env.LOCALAPPDATA ?? '', 'Google/Chrome/Application/chrome.exe')] : [])].filter(Boolean);
const browser = browserCandidates.find((candidate) => fs.existsSync(candidate));
if (!lessonPath.startsWith(projectDir + path.sep) || fs.lstatSync(lessonPath).isSymbolicLink()) throw new Error('lesson must be a regular project file');
const lesson = read(lessonPath);
const validateModule = await import(pathToFileURL(path.join(release, 'scripts/validate.mjs')).href);
const errors = validateModule.validateLesson(lesson, lessonPath);
if (errors.length) throw new Error(errors.join('\n'));
const runDir = path.join(projectDir, 'work/runs', runId);
fs.mkdirSync(runDir, {recursive: false});
const runPath = path.join(runDir, 'run.json');
const startedAt = new Date().toISOString();
write(runPath, {runId, state: 'active', startedAt, resourceIds: [], inputVersionId: lessonOption ? null : project.currentVersionId,
  inputLessonSha256: sha(lessonPath), runtimeReleaseId: project.runtimeReleaseId});
const logPath = path.join(runDir, 'render.log');
const tmp = path.join(runDir, 'tmp'); const runtimeDir = path.join(tmp, 'runtime');
const output = path.join(runDir, still !== null ? 'preview.png' : 'preview.mp4');
let status = 'failed'; let errorText = null;
const timings = {};
try {
  fs.mkdirSync(runtimeDir, {recursive: true});
  fs.cpSync(path.join(release, 'src'), path.join(runtimeDir, 'src'), {recursive: true});
  for (const name of ['package.json', 'package-lock.json', 'tsconfig.json']) fs.copyFileSync(path.join(release, name), path.join(runtimeDir, name));
  fs.symlinkSync(deps, path.join(runtimeDir, 'node_modules'), process.platform === 'win32' ? 'junction' : 'dir');
  const pyCandidates = [process.env.GRAMMAR_PYTHON].filter(Boolean);
  const python = pyCandidates.find((candidate) => spawnSync(candidate, ['-c', 'import PIL, numpy'], {stdio: 'ignore'}).status === 0);
  if (!python) throw new Error('Prepared Python with Pillow and NumPy required; set GRAMMAR_PYTHON');
  const glyphStart = performance.now();
  const glyphLog = fs.openSync(logPath, 'w');
  const asset = spawnSync(python, [path.join(release, 'scripts/build_chalk_assets.py'), lessonPath,
    '--manifest', path.join(runtimeDir, 'src/chalk-assets.json'), '--cache-dir', path.join(workspace, 'cache/glyphs')], {stdio: ['ignore', glyphLog, glyphLog]});
  fs.closeSync(glyphLog);
  if (asset.status !== 0) throw new Error('glyph build failed; see run render.log');
  timings.glyphSeconds = +((performance.now() - glyphStart) / 1000).toFixed(3);
  const tracks = lesson.audio ?? [];
  for (const track of tracks) {
    const filename = path.resolve(path.dirname(lessonPath), track.src);
    const ext = path.extname(filename).toLowerCase();
    const mime = ({'.wav': 'audio/wav', '.mp3': 'audio/mpeg', '.m4a': 'audio/mp4', '.aac': 'audio/aac'})[ext];
    if (!mime) throw new Error(`unsupported audio: ${filename}`);
    track.src = `data:${mime};base64,${fs.readFileSync(filename).toString('base64')}`;
  }
  if (lesson.sound?.enabled) {
    const filename = path.resolve(path.dirname(lessonPath), lesson.sound.src);
    if (!filename.startsWith(projectDir + path.sep) || !fs.existsSync(filename)) throw new Error('writing sound must be a project file');
    lesson.sound.src = `data:audio/wav;base64,${fs.readFileSync(filename).toString('base64')}`;
  }
  const props = path.join(tmp, 'props.json'); fs.writeFileSync(props, JSON.stringify(lesson));
  const remotion = path.join(deps, '@remotion/cli/remotion-cli.js');
  const remotionArgs = still !== null ? ['still', 'src/index.tsx', 'GrammarLesson', output, `--frame=${still}`, `--props=${props}`] :
    ['render', 'src/index.tsx', 'GrammarLesson', output, `--props=${props}`, '--codec=h264', '--crf=20', ...(frames ? [`--frames=${frames}`] : [])];
  if (browser) remotionArgs.push(`--browser-executable=${browser}`);
  const log = fs.openSync(logPath, 'a');
  const renderStart = performance.now();
  const result = spawnSync(process.execPath, [remotion, ...remotionArgs], {cwd: runtimeDir, stdio: ['ignore', log, log]});
  fs.closeSync(log);
  if (result.status !== 0 || !fs.existsSync(output)) throw new Error('Remotion render failed; see run render.log');
  timings.renderSeconds = +((performance.now() - renderStart) / 1000).toFixed(3);
  status = 'completed';
} catch (e) {errorText = String(e);}
finally {
  const link = path.join(runtimeDir, 'node_modules');
  if (fs.existsSync(link) && fs.lstatSync(link).isSymbolicLink()) fs.unlinkSync(link);
  const registryPath = path.join(projectDir, 'resources.json'); const registry = read(registryPath);
  const resources = registry.resources; const ids = [];
  const register = (filename, role, protect) => {
    const id = `run:${runId}:${path.relative(runDir, filename)}`;
    resources[id] = {path: path.relative(workspace, filename), sha256: sha(filename), bytes: fs.statSync(filename).size,
      role, status: 'active', registeredAt: new Date().toISOString(), unreferencedSince: null, runId};
    if (protect) ids.push(id);
  };
  if (fs.existsSync(output)) register(output, 'preview', true);
  if (fs.existsSync(logPath)) register(logPath, 'log', true);
  for (const filename of fs.existsSync(tmp) ? fs.readdirSync(tmp, {recursive: true}).map((relative) => path.join(tmp, relative)) : []) {
    if (fs.statSync(filename).isFile()) register(filename, 'temp-encode', false);
  }
  write(registryPath, registry);
  const finalRun = {runId, state: status, startedAt, completedAt: new Date().toISOString(), resourceIds: ids,
    inputVersionId: lessonOption ? null : project.currentVersionId, inputLessonSha256: sha(lessonPath),
    runtimeReleaseId: project.runtimeReleaseId, output: fs.existsSync(output) ? path.relative(projectDir, output) : null,
    timings: {...timings, totalSeconds: +((performance.now() - started) / 1000).toFixed(3)},
    ...(errorText ? {error: errorText, resolved: false} : {})};
  write(runPath, finalRun);
}
if (errorText) throw new Error(errorText);
if (exportName !== null) {
  const target = path.join(projectDir, 'exports', `${exportName}-${runId}.mp4`);
  if (still !== null || fs.existsSync(target)) throw new Error('export target exists or output is still');
  fs.copyFileSync(output, target, fs.constants.COPYFILE_EXCL);
  const registryPath = path.join(projectDir, 'resources.json'); const registry = read(registryPath);
  const id = `export:${runId}`; registry.resources[id] = {path: path.relative(workspace, target), sha256: sha(target), bytes: fs.statSync(target).size,
    role: 'export', status: 'active', registeredAt: new Date().toISOString(), unreferencedSince: null, runId};
  write(registryPath, registry);
}
console.log(JSON.stringify({status: 'completed', runId, output, export: exportName !== null ? path.join(projectDir, `exports/${exportName}-${runId}.mp4`) : null, log: logPath, timings: {...timings, totalSeconds: +((performance.now() - started) / 1000).toFixed(3)}}));
