"use strict";
(self["webpackChunkenglish_grammar_to_video_template"] = self["webpackChunkenglish_grammar_to_video_template"] || []).push([[959],{

/***/ 4959
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TranscriptionModal: () => (/* binding */ TranscriptionModal)
/* harmony export */ });
/* harmony import */ var _index_7tt71e8n_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);
/* harmony import */ var _index_r9bj4tta_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2906);
/* harmony import */ var _index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(634);
/* harmony import */ var _index_vtr5qzam_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1926);
/* harmony import */ var _index_hqxc6tzp_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2282);
/* harmony import */ var _index_19d05w9e_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7628);
/* harmony import */ var _index_dfy1t576_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6494);
/* harmony import */ var _index_f9hxt5yh_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9137);
/* harmony import */ var _index_vnc2wdfd_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7724);
/* harmony import */ var _index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(4999);
/* harmony import */ var _index_qve7mdfp_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4400);
/* harmony import */ var _index_5zrb1ft4_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(3604);
/* harmony import */ var _index_3qb54r5j_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(788);
/* harmony import */ var _index_rcv7qkt5_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(4217);
/* harmony import */ var _remotion_studio_shared__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(8499);
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/whisper-webgpu'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(1413);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(7265);
















// src/components/Transcription/TranscriptionModal.tsx




// src/components/Transcription/whisper-languages.ts
var WHISPER_LANGUAGES = [
  ["af", "Afrikaans"],
  ["sq", "Albanian"],
  ["am", "Amharic"],
  ["ar", "Arabic"],
  ["hy", "Armenian"],
  ["as", "Assamese"],
  ["az", "Azerbaijani"],
  ["ba", "Bashkir"],
  ["eu", "Basque"],
  ["be", "Belarusian"],
  ["bn", "Bengali"],
  ["bs", "Bosnian"],
  ["br", "Breton"],
  ["bg", "Bulgarian"],
  ["my", "Burmese"],
  ["ca", "Catalan"],
  ["zh", "Chinese"],
  ["hr", "Croatian"],
  ["cs", "Czech"],
  ["da", "Danish"],
  ["nl", "Dutch"],
  ["en", "English"],
  ["et", "Estonian"],
  ["fo", "Faroese"],
  ["fi", "Finnish"],
  ["fr", "French"],
  ["gl", "Galician"],
  ["ka", "Georgian"],
  ["de", "German"],
  ["el", "Greek"],
  ["gu", "Gujarati"],
  ["ht", "Haitian Creole"],
  ["ha", "Hausa"],
  ["haw", "Hawaiian"],
  ["he", "Hebrew"],
  ["hi", "Hindi"],
  ["hu", "Hungarian"],
  ["is", "Icelandic"],
  ["id", "Indonesian"],
  ["it", "Italian"],
  ["ja", "Japanese"],
  ["jw", "Javanese"],
  ["kn", "Kannada"],
  ["kk", "Kazakh"],
  ["km", "Khmer"],
  ["ko", "Korean"],
  ["lo", "Lao"],
  ["la", "Latin"],
  ["lv", "Latvian"],
  ["ln", "Lingala"],
  ["lt", "Lithuanian"],
  ["lb", "Luxembourgish"],
  ["mk", "Macedonian"],
  ["mg", "Malagasy"],
  ["ms", "Malay"],
  ["ml", "Malayalam"],
  ["mt", "Maltese"],
  ["mi", "Maori"],
  ["mr", "Marathi"],
  ["mn", "Mongolian"],
  ["ne", "Nepali"],
  ["no", "Norwegian"],
  ["nn", "Nynorsk"],
  ["oc", "Occitan"],
  ["ps", "Pashto"],
  ["fa", "Persian"],
  ["pl", "Polish"],
  ["pt", "Portuguese"],
  ["pa", "Punjabi"],
  ["ro", "Romanian"],
  ["ru", "Russian"],
  ["sa", "Sanskrit"],
  ["sr", "Serbian"],
  ["sn", "Shona"],
  ["sd", "Sindhi"],
  ["si", "Sinhala"],
  ["sk", "Slovak"],
  ["sl", "Slovenian"],
  ["so", "Somali"],
  ["es", "Spanish"],
  ["su", "Sundanese"],
  ["sw", "Swahili"],
  ["sv", "Swedish"],
  ["tl", "Tagalog"],
  ["tg", "Tajik"],
  ["ta", "Tamil"],
  ["tt", "Tatar"],
  ["te", "Telugu"],
  ["th", "Thai"],
  ["bo", "Tibetan"],
  ["tr", "Turkish"],
  ["tk", "Turkmen"],
  ["uk", "Ukrainian"],
  ["ur", "Urdu"],
  ["uz", "Uzbek"],
  ["vi", "Vietnamese"],
  ["cy", "Welsh"],
  ["yi", "Yiddish"],
  ["yo", "Yoruba"]
];

// src/components/Transcription/TranscriptionModal.tsx

var TRANSCRIPTION_OUTPUT_MESSAGE_ID = "remotion-transcription-output-message";
var TRANSCRIPTION_CHUNK_MESSAGE_ID = "remotion-transcription-chunk-message";
var TRANSCRIPTION_DECODING_MESSAGE_ID = "remotion-transcription-decoding-message";
var TRANSCRIPTION_TASK_MESSAGE_ID = "remotion-transcription-task-message";
var DEFAULT_CHUNK_LENGTH_IN_SECONDS = 30;
var DEFAULT_STRIDE_LENGTH_IN_SECONDS = 5;
var DEFAULT_TEMPERATURE = 1;
var DEFAULT_TOP_K = 50;
var DEFAULT_REPETITION_PENALTY = 1;
var DEFAULT_NO_REPEAT_NGRAM_SIZE = 0;
var MAX_CHUNK_LENGTH_IN_SECONDS = 30;
var AVAILABLE_MODELS = Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/whisper-webgpu'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
var settingsPanel = {
  ..._index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__/* .optionsPanel */ .Z6,
  flexDirection: "column",
  paddingTop: 16
};
var advancedPanel = {
  ...settingsPanel,
  paddingTop: 0
};
var transcriptionModalStyle = {
  ..._index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__/* .outerModalStyle */ .uT,
  outline: "none"
};
var transcriptionLayout = {
  ..._index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__/* .horizontalLayout */ .D6,
  flex: "1 1 auto"
};
var controlStyle = {
  width: 330,
  maxWidth: "100%"
};
var nestedLabelStyle = {
  color: "inherit",
  fontFamily: "inherit",
  fontSize: "inherit",
  lineHeight: "inherit"
};
var taskMessageRow = {
  display: "flex",
  justifyContent: "flex-end",
  padding: "0 16px 8px"
};
var outputRow = {
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 4,
  paddingBottom: 12
};
var outputRightRow = {
  display: "flex",
  flex: 1,
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "flex-end",
  minWidth: 0
};
var tooltipContent = {
  color: _index_3qb54r5j_mjs__WEBPACK_IMPORTED_MODULE_12__/* .LIGHT_TEXT */ .hf,
  fontSize: 13,
  lineHeight: 1.5,
  maxWidth: 360,
  padding: 12
};
var tooltipInlineCode = {
  color: _index_3qb54r5j_mjs__WEBPACK_IMPORTED_MODULE_12__/* .WHITE */ .UE,
  fontFamily: "monospace",
  fontSize: "inherit",
  lineHeight: "inherit"
};
var hiddenPanel = {
  display: "none"
};
var existsMessageStyle = {
  display: "inline-flex",
  alignItems: "center",
  minWidth: 0,
  fontFamily: "sans-serif",
  fontSize: 13,
  lineHeight: "18px",
  color: _index_3qb54r5j_mjs__WEBPACK_IMPORTED_MODULE_12__/* .WHITE */ .UE,
  whiteSpace: "nowrap"
};
var openIconStyle = {
  width: 12,
  height: 12,
  flexShrink: 0
};
var TranscriptionSettingLabel = ({ children, inputId, name }) => {
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
    style: _index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .label */ .Pfx,
    children: [
      inputId === null ? name : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("label", {
        htmlFor: inputId,
        style: nestedLabelStyle,
        children: name
      }),
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__/* .Spacing */ .Kz, {
        x: 0.5
      }),
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .InfoBubble */ .Di9, {
        "aria-label": `Learn more about ${name}`,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
          style: tooltipContent,
          children
        })
      })
    ]
  });
};
var ModelSettings = ({
  cachedModels,
  selectedLanguage,
  selectedModel,
  selectedTask,
  setSelectedLanguage,
  setSelectedModel,
  setSelectedTask,
  supportState
}) => {
  const selectedModelInfo = AVAILABLE_MODELS.find(({ name }) => name === selectedModel);
  if (!selectedModelInfo) {
    throw new Error(`Unknown Whisper model: ${selectedModel}`);
  }
  const modelOptions = (0,react__WEBPACK_IMPORTED_MODULE_16__.useMemo)(() => {
    return AVAILABLE_MODELS.map((model) => {
      return {
        type: "item",
        id: model.name,
        value: model.name,
        label: `${model.name} · ${(0,_remotion_studio_shared__WEBPACK_IMPORTED_MODULE_14__/* .formatBytes */ .z3)(model.webGpuDownloadSize)}${cachedModels.has(model.name) ? " · Downloaded" : ""}`,
        leftItem: model.name === selectedModel ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .Checkmark */ .MGO, {}) : null,
        keyHint: null,
        quickSwitcherLabel: null,
        subMenu: null,
        disabled: false,
        onClick: () => setSelectedModel(model.name)
      };
    });
  }, [cachedModels, selectedModel, setSelectedModel]);
  const languageOptions = (0,react__WEBPACK_IMPORTED_MODULE_16__.useMemo)(() => {
    return WHISPER_LANGUAGES.map(([languageCode, languageName]) => ({
      type: "item",
      id: languageCode,
      value: languageCode,
      label: languageName,
      leftItem: languageCode === selectedLanguage ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .Checkmark */ .MGO, {}) : null,
      keyHint: null,
      quickSwitcherLabel: null,
      subMenu: null,
      disabled: false,
      onClick: () => setSelectedLanguage(languageCode)
    }));
  }, [selectedLanguage, setSelectedLanguage]);
  const effectiveTask = selectedModelInfo.supportsTranslation ? selectedTask : "transcribe";
  const taskOptions = (0,react__WEBPACK_IMPORTED_MODULE_16__.useMemo)(() => {
    return [
      {
        type: "item",
        id: "transcribe",
        value: "transcribe",
        label: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.Fragment, {
          children: [
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("span", {
              "aria-hidden": "true",
              style: nestedLabelStyle,
              children: "Transcribe"
            }),
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("span", {
              style: { position: "absolute", clip: "rect(0 0 0 0)" },
              children: "Task: Transcribe"
            })
          ]
        }),
        leftItem: effectiveTask === "transcribe" ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .Checkmark */ .MGO, {}) : null,
        keyHint: null,
        quickSwitcherLabel: null,
        subMenu: null,
        disabled: false,
        onClick: () => setSelectedTask("transcribe")
      },
      {
        type: "item",
        id: "translate",
        value: "translate",
        label: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.Fragment, {
          children: [
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("span", {
              "aria-hidden": "true",
              style: nestedLabelStyle,
              children: "Translate to English"
            }),
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("span", {
              style: { position: "absolute", clip: "rect(0 0 0 0)" },
              children: "Task: Translate to English"
            })
          ]
        }),
        leftItem: effectiveTask === "translate" ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .Checkmark */ .MGO, {}) : null,
        keyHint: null,
        quickSwitcherLabel: null,
        subMenu: null,
        disabled: false,
        onClick: () => setSelectedTask("translate")
      }
    ];
  }, [effectiveTask, setSelectedTask]);
  (0,react__WEBPACK_IMPORTED_MODULE_16__.useEffect)(() => {
    if (!selectedModelInfo.supportsTranslation) {
      setSelectedTask("transcribe");
    }
  }, [selectedModelInfo.supportsTranslation, setSelectedTask]);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.Fragment, {
    children: [
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
        style: _index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .optionRow */ .wVt,
        children: [
          /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
            style: _index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .label */ .Pfx,
            children: "Whisper model"
          }),
          /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
            style: _index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .rightRow */ .jmp,
            children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .Combobox */ .G3_, {
              values: modelOptions,
              selectedId: selectedModel,
              "aria-label": "Whisper model",
              style: controlStyle
            })
          })
        ]
      }),
      selectedModelInfo.multilingual ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
        style: _index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .optionRow */ .wVt,
        children: [
          /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
            style: _index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .label */ .Pfx,
            children: "Spoken language"
          }),
          /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
            style: _index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .rightRow */ .jmp,
            children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .Combobox */ .G3_, {
              values: languageOptions,
              selectedId: selectedLanguage,
              "aria-label": "Spoken language",
              style: controlStyle
            })
          })
        ]
      }) : null,
      selectedModelInfo.supportsTranslation ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
        style: _index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .optionRow */ .wVt,
        children: [
          /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
            style: _index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .label */ .Pfx,
            children: "Task"
          }),
          /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
            style: _index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .rightRow */ .jmp,
            children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .Combobox */ .G3_, {
              values: taskOptions,
              selectedId: effectiveTask,
              "aria-label": "Task",
              style: controlStyle
            })
          })
        ]
      }) : null,
      effectiveTask === "translate" ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
        id: TRANSCRIPTION_TASK_MESSAGE_ID,
        "aria-live": "polite",
        style: taskMessageRow,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__/* .ValidationMessage */ .Xl, {
          align: "flex-end",
          message: "Word timings may be less accurate when translating to English.",
          type: "warning"
        })
      }) : null,
      supportState.type === "unsupported" ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
        style: { padding: "0 16px" },
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__/* .ValidationMessage */ .Xl, {
          align: "flex-end",
          message: supportState.message,
          type: "error"
        })
      }) : null
    ]
  });
};
var OutputSettings = ({ exists, onOutNameChange, outName, validationMessage }) => {
  const openExistingOutput = (0,react__WEBPACK_IMPORTED_MODULE_16__.useCallback)(() => {
    if (!window.remotion_publicFolderExists) {
      (0,_index_vtr5qzam_mjs__WEBPACK_IMPORTED_MODULE_3__/* .showNotification */ .Ds)("Could not find the public folder", 2000);
      return;
    }
    (0,_index_19d05w9e_mjs__WEBPACK_IMPORTED_MODULE_5__/* .openInFileExplorer */ .dP)({
      directory: `${window.remotion_publicFolderExists}/${outName}`
    }).catch((err) => {
      (0,_index_vtr5qzam_mjs__WEBPACK_IMPORTED_MODULE_3__/* .showNotification */ .Ds)(`Could not open file: ${err.message}`, 2000);
    });
  }, [outName]);
  const renderOpenIcon = (0,react__WEBPACK_IMPORTED_MODULE_16__.useCallback)((color) => {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .ExpandedFolderIconSolid */ .SeR, {
      style: openIconStyle,
      color
    });
  }, []);
  const fileManagerName = (0,_index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .getFileManagerName */ .L6$)(window.remotion_fileSystemPlatform);
  const isBrowserStudio = (0,_index_dfy1t576_mjs__WEBPACK_IMPORTED_MODULE_6__/* .getBrowserStudioOperations */ .P3)() !== null;
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
    style: outputRow,
    children: [
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)(TranscriptionSettingLabel, {
        inputId: null,
        name: "Output in public/",
        children: [
          "Studio writes a JSON array compatible with",
          " ",
          /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("code", {
            style: tooltipInlineCode,
            children: "Caption[]"
          }),
          ". Load it from your composition with ",
          /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("code", {
            style: tooltipInlineCode,
            children: "staticFile()"
          }),
          "."
        ]
      }),
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
        style: outputRightRow,
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
          style: controlStyle,
          children: [
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .RemotionInput */ .WtJ, {
              "aria-label": "Caption output file",
              "aria-describedby": validationMessage || exists ? TRANSCRIPTION_OUTPUT_MESSAGE_ID : undefined,
              "aria-invalid": validationMessage ? true : undefined,
              status: validationMessage ? "error" : exists ? "warning" : "ok",
              style: _index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .input */ .hFB,
              type: "text",
              value: outName,
              onChange: onOutNameChange,
              rightAlign: true
            }),
            validationMessage || exists ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
              id: TRANSCRIPTION_OUTPUT_MESSAGE_ID,
              "aria-live": "polite",
              children: [
                /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__/* .Spacing */ .Kz, {
                  y: 1,
                  block: true
                }),
                /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__/* .ValidationMessage */ .Xl, {
                  align: "flex-end",
                  message: validationMessage ?? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("span", {
                    style: existsMessageStyle,
                    children: [
                      isBrowserStudio ? null : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__/* .InlineAction */ .gs, {
                        onClick: openExistingOutput,
                        renderAction: renderOpenIcon,
                        "aria-label": `Open in ${fileManagerName}`,
                        variant: null
                      }),
                      "Exists, will be overwritten"
                    ]
                  }),
                  type: validationMessage ? "error" : "warning"
                })
              ]
            }) : null
          ]
        })
      })
    ]
  });
};
var AdvancedSettings = ({
  chunkLengthInSeconds,
  doSample,
  forceFullSequences,
  noRepeatNgramSize,
  repetitionPenalty,
  setChunkLengthInSeconds,
  setDoSample,
  setForceFullSequences,
  setNoRepeatNgramSize,
  setRepetitionPenalty,
  setStrideLengthInSeconds,
  setTemperature,
  setTopK,
  strideLengthInSeconds,
  temperature,
  topK,
  decodingValidationMessage,
  validationMessage
}) => {
  const onForceFullSequencesChange = (0,react__WEBPACK_IMPORTED_MODULE_16__.useCallback)((event) => setForceFullSequences(event.target.checked), [setForceFullSequences]);
  const onDoSampleChange = (0,react__WEBPACK_IMPORTED_MODULE_16__.useCallback)((event) => setDoSample(event.target.checked), [setDoSample]);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.Fragment, {
    children: [
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
        "aria-describedby": validationMessage ? TRANSCRIPTION_CHUNK_MESSAGE_ID : undefined,
        "aria-invalid": validationMessage ? true : undefined,
        "aria-label": "Chunk settings",
        role: "group",
        children: [
          /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_r9bj4tta_mjs__WEBPACK_IMPORTED_MODULE_1__/* .NumberSetting */ .ey, {
            formatter: (value) => `${value}s`,
            hint: {
              content: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
                style: tooltipContent,
                children: "Studio splits long audio into chunks of up to 30 seconds. Longer chunks need fewer transcription passes."
              }),
              title: "Learn more about Chunk length"
            },
            max: MAX_CHUNK_LENGTH_IN_SECONDS,
            min: 1,
            name: "Chunk length",
            onValueChanged: setChunkLengthInSeconds,
            step: 1,
            value: chunkLengthInSeconds
          }),
          /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_r9bj4tta_mjs__WEBPACK_IMPORTED_MODULE_1__/* .NumberSetting */ .ey, {
            formatter: (value) => `${value}s`,
            hint: {
              content: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
                style: tooltipContent,
                children: "Overlaps both sides of each chunk to help preserve words at the boundaries."
              }),
              title: "Learn more about Stride length"
            },
            min: 0,
            name: "Stride length",
            onValueChanged: setStrideLengthInSeconds,
            step: 1,
            value: strideLengthInSeconds
          })
        ]
      }),
      validationMessage ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
        id: TRANSCRIPTION_CHUNK_MESSAGE_ID,
        "aria-live": "polite",
        style: { padding: "0 16px" },
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__/* .ValidationMessage */ .Xl, {
          align: "flex-end",
          message: validationMessage,
          type: "error"
        })
      }) : null,
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
        "aria-describedby": decodingValidationMessage ? TRANSCRIPTION_DECODING_MESSAGE_ID : undefined,
        "aria-invalid": decodingValidationMessage ? true : undefined,
        "aria-label": "Decoding settings",
        role: "group",
        children: [
          /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .RenderModalHr */ .YbN, {}),
          /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
            style: _index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .optionRow */ .wVt,
            children: [
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(TranscriptionSettingLabel, {
                inputId: "force-full-sequences",
                name: "Force full sequences",
                children: "Makes the job fail if Whisper leaves an incomplete timestamp sequence."
              }),
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
                style: _index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .rightRow */ .jmp,
                children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .Checkbox */ .Sc0, {
                  checked: forceFullSequences,
                  inputId: "force-full-sequences",
                  name: "force-full-sequences",
                  onChange: onForceFullSequencesChange
                })
              })
            ]
          }),
          /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .RenderModalHr */ .YbN, {}),
          /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
            style: _index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .optionRow */ .wVt,
            children: [
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(TranscriptionSettingLabel, {
                inputId: "use-sampling",
                name: "Use sampling",
                children: "Makes decoding nondeterministic."
              }),
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
                style: _index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .rightRow */ .jmp,
                children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .Checkbox */ .Sc0, {
                  checked: doSample,
                  inputId: "use-sampling",
                  name: "use-sampling",
                  onChange: onDoSampleChange
                })
              })
            ]
          }),
          doSample ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.Fragment, {
            children: [
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_r9bj4tta_mjs__WEBPACK_IMPORTED_MODULE_1__/* .NumberSetting */ .ey, {
                hint: {
                  content: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
                    style: tooltipContent,
                    children: "Controls randomness when sampling."
                  }),
                  title: "Learn more about Temperature"
                },
                min: 0.1,
                name: "Temperature",
                onValueChanged: setTemperature,
                step: 0.1,
                value: temperature
              }),
              /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_r9bj4tta_mjs__WEBPACK_IMPORTED_MODULE_1__/* .NumberSetting */ .ey, {
                hint: {
                  content: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
                    style: tooltipContent,
                    children: "Limits the candidate tokens when sampling."
                  }),
                  title: "Learn more about Top K"
                },
                min: 0,
                name: "Top K",
                onValueChanged: setTopK,
                step: 1,
                value: topK
              })
            ]
          }) : null,
          /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_r9bj4tta_mjs__WEBPACK_IMPORTED_MODULE_1__/* .NumberSetting */ .ey, {
            hint: {
              content: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
                style: tooltipContent,
                children: "Discourages repeated tokens. A value of 1 disables the penalty."
              }),
              title: "Learn more about Repetition penalty"
            },
            min: 0.1,
            name: "Repetition penalty",
            onValueChanged: setRepetitionPenalty,
            step: 0.1,
            value: repetitionPenalty
          }),
          /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_r9bj4tta_mjs__WEBPACK_IMPORTED_MODULE_1__/* .NumberSetting */ .ey, {
            hint: {
              content: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
                style: tooltipContent,
                children: "Prevents repeated phrases of this many tokens. A value of 0 disables the filter."
              }),
              title: "Learn more about No-repeat n-gram size"
            },
            min: 0,
            name: "No-repeat n-gram size",
            onValueChanged: setNoRepeatNgramSize,
            step: 1,
            value: noRepeatNgramSize
          })
        ]
      }),
      decodingValidationMessage ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
        id: TRANSCRIPTION_DECODING_MESSAGE_ID,
        "aria-live": "polite",
        style: { padding: "0 16px" },
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__/* .ValidationMessage */ .Xl, {
          align: "flex-end",
          message: decodingValidationMessage,
          type: "error"
        })
      }) : null
    ]
  });
};
var TranscriptionModal = ({
  audioStreamIndex,
  displayName,
  requestInit,
  src,
  target
}) => {
  const [tab, setTab] = (0,react__WEBPACK_IMPORTED_MODULE_16__.useState)("transcribe");
  const isModelCached = (0,react__WEBPACK_IMPORTED_MODULE_16__.useCallback)((model) => Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/whisper-webgpu'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({ model }), []);
  const cachedModels = (0,_index_7tt71e8n_mjs__WEBPACK_IMPORTED_MODULE_0__/* .useModelCacheStatus */ .X)({
    isModelCached,
    models: AVAILABLE_MODELS,
    refreshKey: tab
  });
  const [selectedModel, setSelectedModel] = (0,react__WEBPACK_IMPORTED_MODULE_16__.useState)("small.en");
  const [selectedLanguage, setSelectedLanguage] = (0,react__WEBPACK_IMPORTED_MODULE_16__.useState)("en");
  const [selectedTask, setSelectedTask] = (0,react__WEBPACK_IMPORTED_MODULE_16__.useState)("transcribe");
  const [chunkLengthInSeconds, setChunkLengthInSeconds] = (0,react__WEBPACK_IMPORTED_MODULE_16__.useState)(DEFAULT_CHUNK_LENGTH_IN_SECONDS);
  const [strideLengthInSeconds, setStrideLengthInSeconds] = (0,react__WEBPACK_IMPORTED_MODULE_16__.useState)(DEFAULT_STRIDE_LENGTH_IN_SECONDS);
  const [forceFullSequences, setForceFullSequences] = (0,react__WEBPACK_IMPORTED_MODULE_16__.useState)(false);
  const [doSample, setDoSample] = (0,react__WEBPACK_IMPORTED_MODULE_16__.useState)(false);
  const [temperature, setTemperature] = (0,react__WEBPACK_IMPORTED_MODULE_16__.useState)(DEFAULT_TEMPERATURE);
  const [topK, setTopK] = (0,react__WEBPACK_IMPORTED_MODULE_16__.useState)(DEFAULT_TOP_K);
  const [repetitionPenalty, setRepetitionPenalty] = (0,react__WEBPACK_IMPORTED_MODULE_16__.useState)(DEFAULT_REPETITION_PENALTY);
  const [noRepeatNgramSize, setNoRepeatNgramSize] = (0,react__WEBPACK_IMPORTED_MODULE_16__.useState)(DEFAULT_NO_REPEAT_NGRAM_SIZE);
  const [supportState, setSupportState] = (0,react__WEBPACK_IMPORTED_MODULE_16__.useState)({
    type: "checking"
  });
  const [outName, setOutName] = (0,react__WEBPACK_IMPORTED_MODULE_16__.useState)(() => (0,_index_r9bj4tta_mjs__WEBPACK_IMPORTED_MODULE_1__/* .getDefaultCaptionOutputName */ .wl)(src, displayName));
  const { addCaptionJob, captionJobs } = (0,react__WEBPACK_IMPORTED_MODULE_16__.useContext)(_index_hqxc6tzp_mjs__WEBPACK_IMPORTED_MODULE_4__/* .RenderQueueContext */ .x7);
  const { setSelectedModal } = (0,react__WEBPACK_IMPORTED_MODULE_16__.useContext)(_index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .SetSelectedModalContext */ .Mqz);
  const { setSidebarCollapsedState } = (0,react__WEBPACK_IMPORTED_MODULE_16__.useContext)(_index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .SidebarContext */ .I0U);
  const staticFiles = (0,_index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .useStaticFiles */ .JM3)();
  (0,react__WEBPACK_IMPORTED_MODULE_16__.useEffect)(() => {
    let cancelled = false;
    Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/whisper-webgpu'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())().then((result) => {
      if (cancelled) {
        return;
      }
      setSupportState(result.supported ? { type: "supported" } : { type: "unsupported", message: result.detailedReason });
    });
    return () => {
      cancelled = true;
    };
  }, []);
  const normalizedOutName = outName.normalize("NFC").toLowerCase();
  const queuedOutputExists = captionJobs.some((job) => job.target === null && (job.status === "idle" || job.status === "running" || job.status === "saving") && job.outName.normalize("NFC").toLowerCase() === normalizedOutName);
  const outputValidationMessage = target === null ? (0,_index_r9bj4tta_mjs__WEBPACK_IMPORTED_MODULE_1__/* .validateCaptionOutputName */ .vh)(outName) ?? (queuedOutputExists ? "Another caption job is already using this output file" : null) : null;
  const exists = staticFiles.some((file) => file.name.normalize("NFC").toLowerCase() === normalizedOutName);
  const chunkValidationMessage = strideLengthInSeconds * 2 >= chunkLengthInSeconds ? "Stride length must be less than half of chunk length" : null;
  const decodingValidationMessage = !Number.isFinite(temperature) ? "Temperature must be a finite number greater than 0" : temperature <= 0 ? "Temperature must be greater than 0" : !Number.isInteger(topK) || topK < 0 ? "Top K must be a non-negative integer" : !Number.isFinite(repetitionPenalty) ? "Repetition penalty must be a finite number greater than 0" : repetitionPenalty <= 0 ? "Repetition penalty must be greater than 0" : !Number.isInteger(noRepeatNgramSize) || noRepeatNgramSize < 0 ? "No-repeat n-gram size must be a non-negative integer" : null;
  const canTranscribe = supportState.type === "supported" && outputValidationMessage === null && chunkValidationMessage === null && decodingValidationMessage === null;
  const transcribeDisabledReason = supportState.type === "checking" ? "Checking WebGPU support" : supportState.type === "unsupported" ? supportState.message : outputValidationMessage ?? chunkValidationMessage ?? decodingValidationMessage ?? undefined;
  const onOutNameChange = (0,react__WEBPACK_IMPORTED_MODULE_16__.useCallback)((event) => {
    setOutName(event.target.value);
  }, []);
  const onAddToQueue = (0,react__WEBPACK_IMPORTED_MODULE_16__.useCallback)(() => {
    if (!canTranscribe) {
      return;
    }
    const modelInfo = AVAILABLE_MODELS.find(({ name }) => name === selectedModel);
    if (!modelInfo) {
      throw new Error(`Unknown Whisper model: ${selectedModel}`);
    }
    addCaptionJob({
      src,
      displayName,
      audioStreamIndex,
      requestInit,
      outName: target === null ? outName : "Basic captions",
      target,
      model: selectedModel,
      language: modelInfo.multilingual ? selectedLanguage : null,
      task: modelInfo.supportsTranslation ? selectedTask : "transcribe",
      chunkLengthInSeconds,
      strideLengthInSeconds,
      forceFullSequences,
      doSample,
      temperature,
      topK,
      repetitionPenalty,
      noRepeatNgramSize
    });
    setSidebarCollapsedState({ left: null, right: "expanded" });
    (0,_index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .persistSelectedOptionsSidebarPanel */ .Gd8)("renders");
    _index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .optionsSidebarTabs */ .nm0.current?.selectRendersPanel();
    setSelectedModal(null);
  }, [
    addCaptionJob,
    audioStreamIndex,
    canTranscribe,
    chunkLengthInSeconds,
    displayName,
    doSample,
    forceFullSequences,
    noRepeatNgramSize,
    outName,
    target,
    repetitionPenalty,
    requestInit,
    src,
    selectedLanguage,
    selectedModel,
    selectedTask,
    setSelectedModal,
    setSidebarCollapsedState,
    strideLengthInSeconds,
    temperature,
    topK
  ]);
  const title = target === null ? `Transcribe ${displayName}` : "Generate captions";
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .DismissableModal */ .sbH, {
    ariaLabel: title,
    children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
      style: transcriptionModalStyle,
      children: [
        /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .ModalHeader */ .rQ0, {
          title
        }),
        /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
          style: _index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__/* .container */ .kL,
          children: [
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
              style: _index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__/* .flexer */ .lw
            }),
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .Button */ .$nd, {
              onClick: onAddToQueue,
              disabled: !canTranscribe,
              "aria-label": transcribeDisabledReason,
              style: {
                ..._index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__/* .buttonStyle */ .i9,
                backgroundColor: canTranscribe ? _index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__/* .buttonStyle */ .i9.backgroundColor : _index_3qb54r5j_mjs__WEBPACK_IMPORTED_MODULE_12__/* .BLUE_DISABLED */ .er
              },
              children: target === null ? "Transcribe" : "Generate captions"
            })
          ]
        }),
        /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
          style: transcriptionLayout,
          children: [
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
              style: _index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__/* .leftSidebar */ .K8,
              children: [
                /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .VerticalTab */ .sMJ, {
                  autoFocus: true,
                  style: _index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__/* .horizontalTab */ .So,
                  selected: tab === "transcribe",
                  onClick: () => setTab("transcribe"),
                  renderIcon: (color) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
                    style: _index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__/* .iconContainer */ .zc,
                    children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .TranscriptionIcon */ .SLQ, {
                      color,
                      style: _index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__/* .icon */ .Kk
                    })
                  }),
                  children: "Transcribe"
                }),
                /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .VerticalTab */ .sMJ, {
                  style: _index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__/* .horizontalTab */ .So,
                  selected: tab === "models",
                  onClick: () => setTab("models"),
                  renderIcon: (color) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
                    style: _index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__/* .iconContainer */ .zc,
                    children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__/* .ModelsIcon */ .oi, {
                      color,
                      style: _index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__/* .icon */ .Kk
                    })
                  }),
                  children: "Models"
                }),
                /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .VerticalTab */ .sMJ, {
                  style: _index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__/* .horizontalTab */ .So,
                  selected: tab === "advanced",
                  onClick: () => setTab("advanced"),
                  renderIcon: (color) => /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
                    style: _index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__/* .iconContainer */ .zc,
                    children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .GearIcon */ .L64, {
                      color,
                      style: _index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__/* .icon */ .Kk
                    })
                  }),
                  children: "Advanced"
                })
              ]
            }),
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsxs)("div", {
              style: tab === "transcribe" ? settingsPanel : hiddenPanel,
              className: _index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__/* .VERTICAL_SCROLLBAR_CLASSNAME */ .uV,
              children: [
                target === null ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(OutputSettings, {
                  exists,
                  onOutNameChange,
                  outName,
                  validationMessage: outputValidationMessage
                }) : null,
                target === null ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_m2a95v3p_mjs__WEBPACK_IMPORTED_MODULE_2__/* .RenderModalHr */ .YbN, {}) : null,
                /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(ModelSettings, {
                  cachedModels,
                  selectedLanguage,
                  selectedModel,
                  selectedTask,
                  setSelectedLanguage,
                  setSelectedModel,
                  setSelectedTask,
                  supportState
                })
              ]
            }),
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)("div", {
              style: tab === "advanced" ? advancedPanel : hiddenPanel,
              className: _index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_9__/* .VERTICAL_SCROLLBAR_CLASSNAME */ .uV,
              children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(AdvancedSettings, {
                chunkLengthInSeconds,
                decodingValidationMessage,
                doSample,
                forceFullSequences,
                noRepeatNgramSize,
                repetitionPenalty,
                setChunkLengthInSeconds,
                setDoSample,
                setForceFullSequences,
                setNoRepeatNgramSize,
                setRepetitionPenalty,
                setStrideLengthInSeconds,
                setTemperature,
                setTopK,
                strideLengthInSeconds,
                temperature,
                topK,
                validationMessage: chunkValidationMessage
              })
            }),
            /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_17__.jsx)(_index_f9hxt5yh_mjs__WEBPACK_IMPORTED_MODULE_7__/* .Models */ .B, {
              description: `Models are downloaded automatically when needed.
You can also manage the browser cache here.`,
              indent: true,
              visible: tab === "models"
            })
          ]
        })
      ]
    })
  });
};



/***/ },

/***/ 30
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ useModelCacheStatus)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1413);
// src/components/use-model-cache-status.ts

var useModelCacheStatus = ({
  isModelCached,
  models,
  refreshKey
}) => {
  const [cachedModels, setCachedModels] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(new Set);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let cancelled = false;
    Promise.all(models.map(async ({ name }) => ({
      cached: await isModelCached(name),
      name
    }))).then((results) => {
      if (!cancelled) {
        const nextCachedModels = new Set;
        for (const result of results) {
          if (result.cached) {
            nextCachedModels.add(result.name);
          }
        }
        setCachedModels(nextCachedModels);
      }
    }).catch(() => {
      if (!cancelled) {
        setCachedModels(new Set);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [isModelCached, models, refreshKey]);
  return cachedModels;
};




/***/ },

/***/ 9137
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ Models)
/* harmony export */ });
/* harmony import */ var _index_vnc2wdfd_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7724);
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/whisper-webgpu'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1413);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7265);


// src/components/Transcription/Models.tsx



var AVAILABLE_MODELS = Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/whisper-webgpu'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
var Models = ({ description, indent, visible }) => {
  const isModelCached = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((model) => Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/whisper-webgpu'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({ model }), []);
  const loadModel = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((model, onProgress) => Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/whisper-webgpu'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({
    model,
    onProgress: (progress) => onProgress(progress.progress)
  }), []);
  const removeModel = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((model) => Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/whisper-webgpu'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({ model }), []);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_index_vnc2wdfd_mjs__WEBPACK_IMPORTED_MODULE_0__/* .ModelManager */ .P, {
    ariaLabel: "Whisper models",
    availableModels: AVAILABLE_MODELS,
    description,
    indent,
    isModelCached,
    loadModel,
    prepare: Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/whisper-webgpu'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()),
    removeModel,
    visible
  });
};




/***/ },

/***/ 7724
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ ModelManager)
/* harmony export */ });
/* harmony import */ var _index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4999);
/* harmony import */ var _index_3qb54r5j_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(788);
/* harmony import */ var _remotion_studio_shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8499);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1413);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7265);



// src/components/ModelManager.tsx



var modelPanel = {
  ..._index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_0__/* .optionsPanel */ .Z6,
  flexDirection: "column"
};
var hiddenPanel = { display: "none" };
var container = {
  boxSizing: "border-box",
  flex: 1,
  fontFamily: "sans-serif",
  minWidth: 0,
  padding: "16px 16px 0",
  width: "100%"
};
var flushContainer = {
  ...container,
  padding: "16px 0 0"
};
var descriptionStyle = {
  color: _index_3qb54r5j_mjs__WEBPACK_IMPORTED_MODULE_1__/* .LIGHT_TEXT */ .hf,
  fontSize: 13,
  lineHeight: 1.5,
  margin: 0,
  whiteSpace: "pre-line"
};
var list = { marginTop: 14 };
var modelRow = {
  alignItems: "center",
  display: "flex",
  gap: 10,
  minHeight: 38
};
var modelIcon = {
  flexShrink: 0,
  height: 16,
  width: 16
};
var statusIcon = {
  flexShrink: 0,
  height: 14,
  width: 14
};
var modelName = {
  color: _index_3qb54r5j_mjs__WEBPACK_IMPORTED_MODULE_1__/* .LIGHT_TEXT */ .hf,
  flex: 1,
  fontFamily: "monospace",
  fontSize: 13,
  lineHeight: 1.4,
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
};
var status = {
  color: _index_3qb54r5j_mjs__WEBPACK_IMPORTED_MODULE_1__/* .LIGHT_TEXT */ .hf,
  fontSize: 12,
  fontVariantNumeric: "tabular-nums",
  lineHeight: 1.4,
  whiteSpace: "nowrap"
};
var actionIcon = { height: 14, width: 14 };
var actionSlot = {
  alignItems: "center",
  display: "inline-flex",
  flexShrink: 0,
  height: 24,
  justifyContent: "center",
  width: 24
};
var ModelManager = ({
  ariaLabel,
  availableModels,
  description,
  indent,
  isModelCached,
  loadModel,
  prepare,
  removeModel,
  visible
}) => {
  const mounted = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(true);
  const initialized = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(false);
  const [cachedModels, setCachedModels] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
  const [actionState, setActionState] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)({
    type: "idle"
  });
  const [cacheCheckError, setCacheCheckError] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (!visible || initialized.current) {
      return;
    }
    initialized.current = true;
    Promise.resolve().then(() => prepare?.()).then(() => Promise.all(availableModels.map(async ({ name }) => await isModelCached(name) ? name : null))).then((models) => {
      if (mounted.current) {
        const cached = new Set;
        for (const model of models) {
          if (model !== null) {
            cached.add(model);
          }
        }
        setCachedModels(cached);
      }
    }).catch((error) => {
      if (mounted.current) {
        setCachedModels(new Set);
        setCacheCheckError(error instanceof Error ? error.message : String(error));
      }
    });
  }, [availableModels, isModelCached, prepare, visible]);
  const downloadModel = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)((model) => {
    setActionState({ type: "downloading", model, progress: 0 });
    loadModel(model, (progress) => {
      if (mounted.current) {
        setActionState({ type: "downloading", model, progress });
      }
    }).then(() => {
      if (mounted.current) {
        setCachedModels((current) => new Set([...current ?? [], model]));
        setActionState({ type: "idle" });
      }
    }).catch((error) => {
      if (mounted.current) {
        setActionState({
          type: "error",
          model,
          message: error instanceof Error ? error.message : String(error)
        });
      }
    });
  }, [loadModel]);
  const remove = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)((model) => {
    setActionState({ type: "removing", model });
    removeModel(model).then(() => {
      if (mounted.current) {
        setCachedModels((current) => {
          const next = new Set(current ?? []);
          next.delete(model);
          return next;
        });
        setActionState({ type: "idle" });
      }
    }).catch((error) => {
      if (mounted.current) {
        setActionState({
          type: "error",
          model,
          message: error instanceof Error ? error.message : String(error)
        });
      }
    });
  }, [removeModel]);
  const renderDownloadIcon = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)((color) => {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_0__/* .CloudDownloadIcon */ .$w, {
      color,
      style: actionIcon
    });
  }, []);
  const renderRemoveIcon = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)((color) => {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_0__/* .TrashIcon */ .uc, {
      color,
      style: actionIcon
    });
  }, []);
  const actionInProgress = actionState.type === "downloading" || actionState.type === "removing";
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
    style: visible ? modelPanel : hiddenPanel,
    className: _index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_0__/* .VERTICAL_SCROLLBAR_CLASSNAME */ .uV,
    children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      style: indent ? container : flushContainer,
      children: [
        description === null ? null : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
          style: descriptionStyle,
          children: description
        }),
        cacheCheckError ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_0__/* .ValidationMessage */ .Xl, {
          align: "flex-start",
          message: cacheCheckError,
          type: "error"
        }) : null,
        /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          style: description === null ? undefined : list,
          role: "list",
          "aria-label": ariaLabel,
          children: availableModels.map((model) => {
            const cached = cachedModels?.has(model.name) ?? false;
            const processingThisModel = actionState.type !== "idle" && actionState.type !== "error" && actionState.model === model.name;
            const progress = actionState.type === "downloading" && actionState.model === model.name ? actionState.progress : null;
            const modelStatus = processingThisModel ? actionState.type === "removing" ? "Removing…" : `Downloading${progress === null ? "…" : ` ${Math.round(progress * 100)}%`}` : actionState.type === "error" && actionState.model === model.name ? actionState.message : (0,_remotion_studio_shared__WEBPACK_IMPORTED_MODULE_2__/* .formatBytes */ .z3)(model.webGpuDownloadSize);
            return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              role: "listitem",
              style: modelRow,
              children: [
                /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_0__/* .ModelsIcon */ .oi, {
                  "aria-hidden": true,
                  color: _index_3qb54r5j_mjs__WEBPACK_IMPORTED_MODULE_1__/* .LIGHT_TEXT */ .hf,
                  style: modelIcon
                }),
                /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  style: modelName,
                  children: model.name
                }),
                /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  role: "group",
                  style: status,
                  "aria-label": modelStatus,
                  children: modelStatus
                }),
                cached ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_0__/* .CheckCircleFilled */ .Pk, {
                  "aria-hidden": true,
                  style: { ...statusIcon, fill: _index_3qb54r5j_mjs__WEBPACK_IMPORTED_MODULE_1__/* .BLUE */ .ft }
                }) : null,
                processingThisModel ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
                  style: actionSlot,
                  children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_0__/* .Spinner */ .y$, {
                    duration: 0.5,
                    size: 14
                  })
                }) : cached ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_0__/* .ActionTooltip */ .mT, {
                  label: "Uninstall",
                  shortcut: null,
                  delay: 800,
                  dismissOnClick: true,
                  children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_0__/* .InlineAction */ .gs, {
                    "aria-label": `Remove ${model.name}`,
                    disabled: actionInProgress,
                    onClick: () => remove(model.name),
                    renderAction: renderRemoveIcon,
                    variant: null
                  })
                }) : /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_0__/* .ActionTooltip */ .mT, {
                  label: "Install",
                  shortcut: null,
                  delay: 800,
                  dismissOnClick: true,
                  children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_0__/* .InlineAction */ .gs, {
                    "aria-label": `Download ${model.name}`,
                    disabled: cachedModels === null || actionInProgress,
                    onClick: () => downloadModel(model.name),
                    renderAction: renderDownloadIcon,
                    variant: null
                  })
                })
              ]
            }, model.name);
          })
        })
      ]
    })
  });
};




/***/ }

}]);