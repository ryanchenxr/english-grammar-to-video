# 许可与来源

本项目原创源码和文档采用 [MIT License](../LICENSE)。参考声音、字体、模型及第三方组件各按自身授权使用，不因本项目的 MIT 许可而改变。

| 组件 | 许可与来源 | 本包中的形式 |
| --- | --- | --- |
| [Qwen3-TTS 0.6B Base](https://huggingface.co/Qwen/Qwen3-TTS-12Hz-0.6B-Base)、可选 [CustomVoice](https://huggingface.co/Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice) | 官方模型卡标注 Apache-2.0；调用方法参考 [Qwen 官方项目](https://github.com/QwenLM/Qwen3-TTS)。 | 模型权重按需下载，不随包提供。女声参考的生成来源为 Qwen3-TTS 1.7B VoiceDesign；普通课程制作无需下载 VoiceDesign。 |
| [Remotion](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md) 4.0.529 | Remotion 专用许可；是否需要商业许可由使用者依其条款判断。 | 本包保留调用源码与 npm 锁文件；使用时单独安装依赖。 |
| React 18.3.1、TypeScript 5.9.3、svg-path-properties 2.1.0 | 分别为 MIT、Apache-2.0、ISC；具体版本见 `runtime/package-lock.json`。 | 依赖由 `npm ci` 安装，不随包提供。 |
| qwen-tts、modelscope、transformers、accelerate | 各包安装元数据标注 Apache 系许可；实际许可文件见使用者的隔离环境。 | Python 依赖在隔离环境中安装，不随包提供。 |
| librosa、soundfile、Python sox、onnxruntime、fonttools | 各包安装元数据分别标注 ISC、BSD-3-Clause、BSD-3-Clause、MIT、MIT。 | 同上；具体版本见隔离环境的安装元数据。 |
| PyTorch、NumPy、SciPy 等间接依赖 | 各依自身安装元数据与许可文件使用。 | 同上。 |

两款短参考 WAV 的来源和授权用途见 [声音素材说明](../VOICE_ASSETS.md)。默认字体“字制区喜脉喜欢体”的作者授权和使用范围见 [README](../README.md)，字体保留自身授权。

结构化分镜与检查工作流参考柳伟杰 Liu Weijie（Finderchangchang）的 [BrewReel](https://github.com/Finderchangchang/brewreel)；本项目未复制其源码或素材。

视频形式参考 Leon.X。
