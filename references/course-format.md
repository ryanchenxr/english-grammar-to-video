# `writing-board-v5` 课程源

从 `examples/short-course.json` 复制结构到工作区外的新文件。`init --course` 将它复制进项目 `source/course-source.json`，并把 `boardFont` 解析为工作区中按哈希保存的所选字体；不传 `--font` 时选用包内默认字体。不要在课程源中填某一台机器的模型缓存或项目路径。

- `cues`: 顺序旁白，`id/section/lang/text`；`lang` 为 `zh` 或 `en`。长句可用 `subtitleParts` 分成连续单行，每段 `{text, until}`，最后一段无需 `until`；拼接必须等于音频原文。
- `writes`: 唯一 `id`、`section`、`text`、板面 `x/y/size`、`color`、旁白 `anchor`、相对 `offset`、`duration`。英文例句的首次书写用 `notBeforeCue` 防止提早出现；可用短中文提示帮助理解，避免复写旁白。
- `sketches`: 默认至少一处与当前情境有关的简笔画，笔画用唯一 `id`、`section`、SVG 路径 `d`、`color/width` 和 `anchor/offset/duration`。对象、数量与出现时机须和讲解一致，不提前揭示练习答案；图和中文提示均随落笔写出，并避开英文、圈注和字幕。
- `marks`: `anchor` 必须是解释该标记的旁白；`targetId` 指定板书对象，`target` 指定其子串，`occurrence` 是该对象内从零开始的出现次序。每一项要有同值的 `annotationIntents` 记录。
- `camera`: 首镜头从零开始；后续可按 `section` 或 `anchor/offset` 切换。镜头聚焦时显示相关区域，结尾用缩小的总览镜头。
- `sound`: 本 Skill 不使用模拟书写声，课程数据设为 `{ "enabled": false, "volume": 0 }`。

更新现有项目时，只合并课程内容字段；保留 init 写入的 `boardFont` 等系统管理字段，不整体覆盖项目清单、资源清单或配音缓存。`boardFont` 意外缺失时，build 从 `project.json` 的 `fontResourceId` 与 `resources.json` 解析原选字体（包括自定义字体），校验状态、路径、大小和哈希；显式字体冲突或资源损坏会报错，不改用默认字体。

`build` 读取 `voice-generation.json` 中的真实音长，在新 run 目录输出 `lesson.json` 和 `lesson-script.md`。`render` 校验编译后的课程，生成字形缓存并渲染。错误与未完成运行保留在 `run.json`，不作为可交付版本。
