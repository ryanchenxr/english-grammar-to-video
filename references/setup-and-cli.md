# 环境准备与制作命令

此文档供执行制作的 Agent 使用。普通用户只需在 [README](../README.md) 中选择安装方式，再用自然语言提出课程需求；课程 JSON 由 Agent 编写。

## 安装边界

把整个 Skill 目录放在宿主官方支持的位置，保留目录内部相对路径。制作程序需要能读写文件和运行命令；首次准备 Python/Node 依赖及 Qwen 模型时需要联网。工作区通过 `--workspace` 单独指定，不能放在已安装的 Skill 目录内。不要把模型、字体缓存或课程工作文件写回 Skill 包。

运行前需具备 Node.js/npm、FFmpeg、用于 Remotion 渲染的 Chrome/Chromium 浏览器，以及可启动脚本的 Python 或 `uv`；具备权限的 Agent 可以协助安装这些系统程序。若浏览器不在默认位置，可把 `GRAMMAR_BROWSER_EXECUTABLE` 指向其可执行文件。`prepare` 会创建工作区内的 Python 3.12 `.grammar-env`、按内容固定的 `library/runtimes/<id>/node_modules`，并按需下载模型；它**不负责安装**上述系统程序或浏览器。当前 `prepare` 提供 macOS 和 Windows 路径；Linux 不在支持范围。

## 第一次准备

在本 Skill 目录运行，先检查缺项：

```sh
python3 grammar_video.py --workspace /path/to/grammar-work doctor
python3 grammar_video.py --workspace /path/to/grammar-work prepare --voice-route fixed-reference --model-source modelscope --download-model
python3 grammar_video.py --workspace /path/to/grammar-work doctor
```

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
