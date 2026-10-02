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

voice-generation.json 保留展示 text、实际 spokenText、语言与 inputKey；实际 TTS 输入参与原有缓存身份。build 同时校验选用音频的展示文本、朗读文本与语言，不放松字幕拼接校验。省略 spokenText 时实际输入仍等于 text；旧格式可以解析，但采用新版 runtime 制作前同样要经过教学与读法检查。原始缓存身份逻辑不变。

## 开场、练习与单笔时序

默认先介绍概念和本课问题，再自然过渡到情境；用户明确另定结构时遵从。练习按“题目 → 思考机会 → 必要提示 → 解释”组织 cue 与动作；中文提示在需要时出现，不因文字语言而提前。思考机会可用题目 cue 的 pauseAfter，提示与解释分别锚定后续 cue。

writes、marks、sketches 的落笔活动区间统一为 `[at, at + duration)`，跨类型、区域和 section 也不得重叠。结束恰好接下一动作可以；已写完笔迹继续留在板面、同时旁白/字幕均不算冲突。v5 校验列出冲突类型、ID 和起止时间，不自动移动动作。用源 anchor/offset/duration 修正编排后重新 build 和校验。

简图 SVG 可包含多次 M/m 与曲线、闭合路径；按原路径段顺序逐段显露，未开始的段不出现，已完成的段保留；笔尖使用同一段的实际长度位置。不能先贴完整图再假画，也不能等结束才整幅闪现。

## 原始生成缓存与局部配音修复

逐 cue 的 generationKey/generationIdentity 绑定实际朗读输入、语言、模型内容、声音/参考内容与模式、生成参数和生成版本；不含后处理。postprocessKey/postprocessIdentity 另绑定 rawSha256、处理版本和 pauseShorten。inputKey 在新记录中指向生成身份，cleanKey 保留为后处理键的兼容字段。旧组合键经验证后迁移，保留 legacyInputKey、原资源以及当次 run 的 input-voice-generation.json；只有 raw 哈希相同不能证明未重新合成。无法验证旧生成身份时不能宣称原录音命中。

`audio-inspect` 的 missingCues 是需新生成的 cue；reprocessCues 是只需处理原录音的 cue。两者非空均须完成 audio-generate 后再 build。原始录音永不覆盖，新的处理结果按内容哈希保存；模型加载/推理调用计数和生成/重处理 cue 分别登记。后处理音长变化后正常 build 重新编译字幕、板书、标注和镜头，旧 until 边界不适用时应重新校核，不按字数比例挪动。

可选 pauseShorten 为 `{start, end, targetSeconds}`，单位秒，坐标位于原录音按既有规则去除首尾低能量区、尚未归一化的时间轴。它只对明确指定的区间保留较短间隔；不是自动找词界。程序检查拟删除样本的短窗口最大 RMS 和峰值以防平均值掩盖局部声音，但弱辅音、气息或韵律仍可能受损，保护通过不代表自然、连续或无语音。

异常韵律优先调整自然、等义讲稿并只重生成该 cue；只有试听/可靠定位支持适用时才使用局部处理。不要因标点有无自动判错，不全局删停顿、不变速、不更换已确认音色。交含前后语境的一份推荐候选，用户判断听感；不把这些参数选择推给用户，也不将测试/读法控制话术加入旁白。

## 必经的配音前检查

audio-inspect 和 audio-generate 在模型解析/加载前检查课程源；build 重复检查，并用实际录音长度复查标题起笔。无需额外执行可选脚本。错误包含 cueId、code、修改方向；由 Agent 修正数据后重试，不能转交老师处理 JSON。

中文 cue 中独立 ing（包括 V-ing）应在 spokenText 中逐处明确 I、N、G，且实际输入不再遗留独立 ing；空串、仍照抄 ing、无关 spokenText 或审核标记不算修正。playing、doing、writing 等完整词保持完整，不拆字母。若台词明确讲解发音/音标而非字母构成，可在对应 spokenText 使用明确的 /ɪŋ/ 或 [ɪŋ]；这是输入表达的检查，不保证 Qwen 的音标发音正确，仍须相关短试听，不把音标或读法要求变成额外教学话术。

标题沿用现有 writes：唯一 title/heading 对象、或 text 与课程 title 相同的对象；ID 不同或有多个标题时，仅用可选 openingTitleId 指向实际标题 ID。默认标题锚定开场 section 的中文介绍且早于首个英文例句，offset 非负；build 检查起笔不晚于该句音频结束。这个约束能发现标题推迟到例句后的旧稿，但不能证明开场语义正确；Agent 必须审阅开场台词是否自然介绍概念与具体问题，不强制“今天我们讲”套话。用户明确另定结构时不能为通过检查擅改要求，也不能添加一个审核布尔值跳过检查。

标题相对 offset 在配音前尚无实测音长，程序不按字数猜时间；编课时先按开场安排起笔，生成后由 build 复查。已固定旧 runtime 不受新检查追溯改写，采用新版需 prepare 后新建或显式 fork。
