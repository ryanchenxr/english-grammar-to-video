# 环境准备与制作命令

此文档供执行制作的 Agent 使用。普通用户只需在 [README](../README.md) 中选择安装方式，再用自然语言提出课程需求；课程 JSON 由 Agent 编写。

## 安装边界

把整个 Skill 目录放在宿主官方支持的位置，保留目录内部相对路径。安装时保留 `SHA256SUMS.txt` 列出的全部文件及清单本身，包括 `.gitignore`；只可省略仓库历史 `.git/`。按清单逐文件校验 SHA-256，缺失或不符时报告具体文件，不宣称完整校验通过。制作程序需要能读写文件和运行命令；首次准备 Python/Node 依赖及 Qwen 模型时需要联网。工作区通过 `--workspace` 单独指定，不能放在已安装的 Skill 目录内。不要把模型、字体缓存或课程工作文件写回 Skill 包。

运行前需具备 Node.js/npm、FFmpeg、用于 Remotion 渲染的 Chrome/Chromium 浏览器，以及可启动脚本的 Python 或 `uv`；具备权限的 Agent 可以协助安装这些系统程序。若浏览器不在默认位置，可把 `GRAMMAR_BROWSER_EXECUTABLE` 指向其可执行文件。`prepare` 会创建工作区内的 Python 3.12 `.grammar-env`、按内容固定的 `library/runtimes/<id>/node_modules`，并按需下载模型；它**不负责安装**上述系统程序或浏览器。当前 `prepare` 提供 macOS 和 Windows 路径；Linux 不在支持范围。

## 第一次准备

用户请求安装本 Skill 时，默认完成技能安装及首次运行所需的环境准备，直到可以开始制作。先检查并复用已有环境，再补齐必要依赖和匹配的 Base 模型，最后复查。若用户明确只下载文件、只检查环境或暂不下载模型，则遵从其限制。必要的系统及宿主权限正常请求，不绕过权限。安装任务不自动生成课程。

先选择或复用安装目录之外的独立工作区，记录其完整绝对路径；下面三步及后续任务始终使用该路径。`/path/to/grammar-work` 由 Agent 换成实际路径，不交给用户猜测或拼接命令。

在本 Skill 目录运行：

```sh
python3 grammar_video.py --workspace /path/to/grammar-work doctor
python3 grammar_video.py --workspace /path/to/grammar-work prepare --voice-route fixed-reference --model-source modelscope --download-model
python3 grammar_video.py --workspace /path/to/grammar-work doctor
```

未受用户限制时，`doctor` 输出 `needs-preparation` 表示安装尚未结束；若用户限制安装或模型下载，遵从限制并报告仍未准备的部分。正常缺项应继续处理：先按已有权限补齐 Node.js/npm、FFmpeg、Python 3.12 或 uv 等系统条件，再执行上述固定参考 Base 路线的 `prepare`，最后再次 `doctor`。`prepare` 的 `prepared` 状态也不能代替复查；只有复查为 `ready` 且另行确认 Chrome/Chromium 可执行文件可用时，才报告可以开始制作。doctor 当前不检查浏览器，须由 Agent 检查默认位置或 `GRAMMAR_BROWSER_EXECUTABLE`。

若复查仍有缺项，定位并修复可处理的原因；遇到系统权限、宿主授权、下载失败或不支持的平台等真实阻塞时，报告未完成原因和最少必要操作，不绕过权限或要求关闭安全保护。不要将普通缺项报告当作安装完成。用户仅要求检查环境时只运行 doctor，不执行安装或下载。安装准备不生成完整课程，也不调整声音、字体或教学模板。

已有兼容环境和匹配模型应复用；doctor 已为 ready 且固定参考配置匹配时，无须重复 prepare。prepare 会复用已有隔离 Python、相同内容的 runtime 和 Node 依赖，并由模型下载器复用用户级缓存；Python 依赖仍会执行安装兼容性检查，不清空环境或缓存。

如果只有 `uv`，没有可直接使用的 `python3`，可在同一目录用 `uv run --no-project --python 3.12 python grammar_video.py --workspace /path/to/grammar-work doctor` 启动脚本；把末尾的 `doctor` 换成上面的 `prepare ...` 即可准备环境。准备完成后，程序内部使用工作区 `.grammar-env` 的 Python 3.12。

两款随包参考都固定使用官方 `Qwen/Qwen3-TTS-12Hz-0.6B-Base`；不必下载用于制作女声参考的 VoiceDesign 模型。Base 仓库约 2.52 GB，下载前 `prepare` 会报告仓库内容与体积。模型在用户级缓存复用，不逐项目复制；若缓存模型内容与音色配置中的摘要不符，配音停止。程序不调用外部付费语音推理 API。

Windows PowerShell 可将命令开头换成 `py -3.12 .\grammar_video.py --workspace C:\grammar-work`，其后保留相同子命令；这条路径尚未经 Windows 实机验证。

## 制作一课

先按 [课程格式](course-format.md)在工作区编写 `writing-board-v5` 课程源，再运行：

```sh
python3 grammar_video.py --workspace /path/to/grammar-work init --project-id my-lesson --course /path/to/course.json
python3 grammar_video.py --workspace /path/to/grammar-work project my-lesson audio-inspect
python3 grammar_video.py --workspace /path/to/grammar-work project my-lesson audio-generate
python3 grammar_video.py --workspace /path/to/grammar-work project my-lesson build --run-id build-001
python3 grammar_video.py --workspace /path/to/grammar-work project my-lesson render --run-id render-001 --lesson work/runs/build-001/lesson.json --export candidate
python3 grammar_video.py --workspace /path/to/grammar-work project my-lesson finalize --build-run build-001 --render-run render-001 --version candidate-001
```

`init` 默认使用包内“字制区喜脉喜欢体”和女声 `teaching-female-fixed-v1`。选择男声时追加 `--voice-id teaching-male-synthetic-intro-v1`；用户提供其他合法 TTF/OTF 字体时追加 `--font /path/to/font.ttf`。显式字体优先；缺失、哈希不符或缺字均报错，不静默替换。`init --reference` 和 `init --voice-profile` 保留供明确提供其他声音参考的高级用途。

配音后按真实音长编译字幕、书写、标注和镜头。`render --frames 0-120` 只用于局部检查，不代表整课验收；完整渲染和必要人工观看后再 `finalize`。未完成运行的状态与错误留在 `work/runs/<run-id>/run.json`，不可作为成功产物。

## 文件与恢复

- `projects/<id>/source/`：课程数据和配音清单；`audio/`：按内容身份缓存的录音；`work/runs/`：每次编译、渲染及日志；`exports/`：显式 `--export` 后的 MP4；`history/versions/`：不可覆盖的版本清单与快照。
- `library/`：按哈希保存的字体、参考声音和 pinned runtime；`cache/glyphs/`：按字体内容、字号、颜色及字形算法复用的本地字形；模型保存在用户级共享缓存。
- `project <id> inventory` 查看引用和空间；`preview` 只生成清理方案，审阅后才可 `apply`；`restore` 和 `prune` 沿用现有保护与恢复机制。不要把真实 `trash` 当作试用对象。

当前已在 macOS Apple Silicon 本地验证命令行路径；Windows、其他电脑和各宿主的 Skill 安装与制作流程需要分别试用。

## 固定运行版本

更新程序后 `prepare` 按内容身份建立新的 runtime，保留旧 runtime。历史项目仍使用其 `project.json` 固定版本；复验应建立独立测试项目，显式选择新 runtime 并复用已有音频，不原地修改 pinned 程序或偷偷迁移历史项目。

## 预构建模板渲染

`init → build → render → finalize` 的制作命令保持。维护者随版本提供预构建模板；目标机 render 只校验模板身份、准备当前课的字体字形与已登记录音，再用 Remotion 4.0.529 renderer API 直接渲染，不运行 webpack 或 bundler。字形清单作为逐课 props 输入，音轨和字形使用现有 data URI 传递；字体内容哈希、字形文本、录音资源状态/哈希和工作区路径均校验。模板缺失、损坏或源码/锁文件身份不符时停止，不能在目标机回退为源码打包。

prepare 安装新的不可变 runtime；锁文件一致时复用该工作区已有的 Node 依赖，以 dependenciesRuntimeReleaseId 记录其相对版本引用，不复制每课依赖，也不更改旧 runtime。doctor 另检查 prebuiltTemplate。宿主 NODE_OPTIONS 与安全环境变量正常继承；只有 renderer 子进程的 TMPDIR/TMP/TEMP 限定到当次 run。run.json / worker.json / render.log 记录 bundleId、宿主观察、是否加载构建模块以及浏览器/渲染/编码阶段。unknown 不代表没有宿主注入。

新安装或更新 Skill 后运行 prepare 获取当前版本，再复查 doctor。已有课程仍固定旧 runtime；需要采用新版时，明确使用 fork 建立独立项目，自动复用并重定位登记字体、参考和原录音，不覆盖旧课程，不重配音：

```sh
python3 grammar_video.py --workspace /path/to/grammar-work project existing-lesson fork --new-project-id independent-candidate
python3 grammar_video.py --workspace /path/to/grammar-work project independent-candidate build --run-id build-001
python3 grammar_video.py --workspace /path/to/grammar-work project independent-candidate render --run-id render-001 --lesson work/runs/build-001/lesson.json --export candidate
```

fork 需要已有课程源与对应有效录音；冲突、资源缺失或校验失败时报告原因，不猜路径或静默替换。它使用 prepare 当前安装的 runtime，历史项目不自动迁移。新课仍直接 init，无须使用作者课程。

完整课程渲染可能超过宿主单次命令的等待时间。若工具返回进程或会话 ID，继续等待同一个进程并查看该 run 的 render.log、worker.json 和 run.json；不要启动第二次渲染，也不要仅凭命令等待超时判定失败或完成。只有 run.json 为 completed 且 MP4 存在才报告出片；结果不明确时先核对原进程与产物，实际失败再按 failedStage 定位。必要的宿主权限正常请求，保留安全注入。

维护者改变模板源码或依赖锁文件后，在维护者构建环境重建模板；课程内容、字体字形或录音变化不重建模板。命令如下，已有产物应先由维护者保存到构建工作记录，固定的 library/runtimes 不能原地构建：

```sh
node runtime/scripts/build_template_bundle.mjs --work-dir /path/to/new-maintainer-build --dependencies-root /path/to/prepared-runtime
```

构建清单绑定模板源码摘要、锁文件、bundle 文件摘要和版本；随包保留第三方许可。此路径的宿主全课能力需分别实测，不由一秒探针推断完整课程或其他平台已通过。
