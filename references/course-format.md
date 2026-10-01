# `writing-board-v5` 课程源

从 `examples/short-course.json` 复制结构到工作区外的新文件。`init --course` 将它复制进项目 `source/course-source.json`，并把 `boardFont` 解析为工作区中按哈希保存的所选字体；不传 `--font` 时选用包内默认字体。不要在课程源中填某一台机器的模型缓存或项目路径。

- `cues`: 顺序旁白，`id/section/lang/text`；`lang` 为 `zh` 或 `en`。`text` 是展示与字幕文本；可选 `spokenText` 是实际 TTS 输入，省略时与 text 相同。它只用于同一内容的明确读法，不用于增加未展示的教学内容。`pauseAfter` 为本 cue 后的额外间隔，另加编译器原有同区间隔 0.15 秒或跨区间隔 0.9 秒。长句优先按语义拆 cue；`subtitleParts` 的 `{text, until}` 必须有可靠的人工时序依据，最后一段无需 until，拼接仍须严格等于展示 text。不得按字符比例估算并声称词级对齐。 subtitleParts 只切换字幕，不改变录音内部停顿；需要清楚的语义间隔时拆成完整 cue。
- `writes`: 唯一 `id`、`section`、`text`、板面 `x/y/size`、`color`、旁白 `anchor`、相对 `offset`、`duration`。英文例句的首次书写用 `notBeforeCue` 防止提早出现；可用短中文提示帮助理解，避免复写旁白。
- `sketches`: 默认至少一处与当前情境有关的简笔画，笔画用唯一 `id`、`section`、SVG 路径 `d`、`color/width` 和 `anchor/offset/duration`。对象、数量与出现时机须和讲解一致，不提前揭示练习答案；图和中文提示均随落笔写出，并避开英文、圈注和字幕。
- `marks`: `anchor` 必须是解释该标记的旁白；`targetId` 指定板书对象，`target` 指定其子串，`occurrence` 是该对象内从零开始的出现次序。每一项要有同值的 `annotationIntents` 记录。
- `camera`: 首镜头从零开始；后续可按 `section` 或 `anchor/offset` 切换。镜头聚焦时显示相关区域，结尾用缩小的总览镜头。
- `sound`: 本 Skill 不使用模拟书写声，课程数据设为 `{ "enabled": false, "volume": 0 }`。

更新现有项目时，只合并课程内容字段；保留 init 写入的 `boardFont` 等系统管理字段，不整体覆盖项目清单、资源清单或配音缓存。`boardFont` 意外缺失时，build 从 `project.json` 的 `fontResourceId` 与 `resources.json` 解析原选字体（包括自定义字体），校验状态、路径、大小和哈希；显式字体冲突或资源损坏会报错，不改用默认字体。

`build` 读取 `voice-generation.json` 中的真实音长，在新 run 目录输出 `lesson.json` 和 `lesson-script.md`。`render` 校验编译后的课程，生成字形缓存并渲染。错误与未完成运行保留在 `run.json`，不作为可交付版本。

## 教学读法与拆句示例

```json
[
  {"id":"be-he","section":"rule","lang":"zh","text":"he、she、it 用 is。","pauseAfter":0.35},
  {"id":"be-you","section":"rule","lang":"zh","text":"you、we、they 用 are。","pauseAfter":0.35},
  {"id":"ending","section":"rule","lang":"zh","text":"动词后面加 ing。","spokenText":"动词后面加 I、N、G。","pauseAfter":0.35}
]
```

每个短 cue 使用完整单行字幕，按其录音实测音长编译。总结的“be 加动词 ing”与“be 不能丢”分别建 cue，前者可用 spokenText 明确字母读法；完整词 playing / writing / swimming 无须替换。拆分后同步 writes、marks、annotationIntents、camera 的 cue 锚点，保持板书原文本。

voice-generation.json 保留展示 text、实际 spokenText、语言与 inputKey；实际 TTS 输入参与原有缓存身份。build 同时校验选用音频的展示文本、朗读文本与语言，不放松字幕拼接校验。旧课程省略 spokenText，继续使用原文本与原缓存身份。

## 开场、练习与单笔时序

默认先介绍概念和本课问题，再自然过渡到情境；用户明确另定结构时遵从。练习按“题目 → 思考机会 → 必要提示 → 解释”组织 cue 与动作；中文提示在需要时出现，不因文字语言而提前。思考机会可用题目 cue 的 pauseAfter，提示与解释分别锚定后续 cue。

writes、marks、sketches 的落笔活动区间统一为 `[at, at + duration)`，跨类型、区域和 section 也不得重叠。结束恰好接下一动作可以；已写完笔迹继续留在板面、同时旁白/字幕均不算冲突。v5 校验列出冲突类型、ID 和起止时间，不自动移动动作。用源 anchor/offset/duration 修正编排后重新 build 和校验。

简图 SVG 可包含多次 M/m 与曲线、闭合路径；按原路径段顺序逐段显露，未开始的段不出现，已完成的段保留；笔尖使用同一段的实际长度位置。不能先贴完整图再假画，也不能等结束才整幅闪现。
