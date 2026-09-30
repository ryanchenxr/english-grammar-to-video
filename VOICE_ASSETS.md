# 参考声音素材

本仓库随 Skill 提供两段短 WAV，经权利人授权用于**随本 Skill 分发，并供使用者生成英语语法教学配音**。此用途与项目原创源码、文档的 MIT 许可分开；MIT 不适用于 WAV，也不自动授予对声音人格、身份或其他素材的额外使用权。本项目未为声音另设 CC 许可。

| 音色 ID | 来源 | 参考文件 SHA-256 |
| --- | --- | --- |
| `teaching-female-fixed-v1` | 使用 Qwen3-TTS 1.7B VoiceDesign 在本地生成的固定女声短参考。该参考曾用于完整的《There is / There are》课程制作。 | `456b4ea7d1a6d6b17b9fb5bc00352ec06504ae2e49d5a1655e10e2844e059307` |
| `teaching-male-synthetic-intro-v1` | 基于作者本人声音合成的项目介绍，经作者授权使用；不是重新录制的真人音频。已完成中文、英文及混合语句短试听。 | `eacae4b2c8b3a88df795dbe1b432c4339c1d344a8797b02c6095f9a5b25a1202` |

实际使用的路径分别为 `assets/voices/<音色 ID>/reference.wav`，模型、模式与参数见同目录 `profile.json`。课程制作使用官方 Qwen3-TTS 0.6B Base；VoiceDesign 仅是上述女声参考的来源，新用户无需下载它。作者私人原始录音、试听拼接、声音特征和模型权重均不在本仓库中。其他第三方依赖见 [依赖许可与来源](references/licenses-and-sources.md)。
