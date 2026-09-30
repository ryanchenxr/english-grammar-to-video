# 固定参考音色配置

本包在 `assets/voices/<id>/` 提供两份短参考和各自的 `profile.json`。新项目默认选 `teaching-female-fixed-v1`；明确要求男声时，`init --voice-id teaching-male-synthetic-intro-v1`。用户也可以明确提供其他参考或配置，先试听后批量生成。声音素材的来源和授权用途见 [VOICE_ASSETS](../VOICE_ASSETS.md)。

`init` 首次使用时按哈希复制所选 WAV 和配置到工作区 `library/voices/profiles/<id>/`，有冲突则停止，不覆盖。清单至少含：`schemaVersion: 1`、与目录同名的 `id`、`route: "base-clone"`、Base 的 `modelId/modelSource/modelDigest`、`referenceMode: "speaker-embedding-only"`、`referenceText: null`、`temperature/maxTokens/seed`，以及 `reference` 的工作区相对 `path`、SHA-256 和字节数。若另有原始素材，可用 `referenceOriginal` 记录；本包只含课程克隆所需短参考。`modelDigest` 是 runtime 的 `generate_project_audio.local_model(modelId, modelSource)` 返回的模型内容摘要。

高级用户可用 `init --voice-profile <绝对清单路径>`；现有项目可用 `project <id> voice-set --profile <绝对清单路径>`。入口校验清单与参考哈希并登记资源；生成器还核对本地模型摘要，将参考音频内容、配置、模式、模型、文本、语言、参数和 seed 计入缓存键。完成版本保护配置、参考及所选音频；换音色建立新 ID。

两份随包配置均采用 `referenceText: null` 的 speaker embedding 模式；不要把参考提示稿当成已核实的录音转写，也不要将此模式视为完整 ICL 参考。每次制作任务创建一次固定 clone prompt，供该任务各段复用。
