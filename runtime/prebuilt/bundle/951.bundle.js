"use strict";
(self["webpackChunkenglish_grammar_to_video_template"] = self["webpackChunkenglish_grammar_to_video_template"] || []).push([[951],{

/***/ 1951
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _index_jc22b2wb_mjs__WEBPACK_IMPORTED_MODULE_0__.B)
/* harmony export */ });
/* harmony import */ var _index_jc22b2wb_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4614);
/* harmony import */ var _index_vnc2wdfd_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7724);
/* harmony import */ var _index_m01zjph7_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4999);
/* harmony import */ var _index_qve7mdfp_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4400);
/* harmony import */ var _index_5zrb1ft4_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3604);
/* harmony import */ var _index_3qb54r5j_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(788);
/* harmony import */ var _index_rcv7qkt5_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4217);










/***/ },

/***/ 4614
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ Models)
/* harmony export */ });
/* harmony import */ var _index_vnc2wdfd_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7724);
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/video-matting'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1413);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7265);


// src/components/VideoMatting/Models.tsx



var AVAILABLE_MODELS = Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/video-matting'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
var Models = ({ description, indent, visible }) => {
  const isModelCached = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((model) => Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/video-matting'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({ model }), []);
  const loadModel = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((model, onProgress) => Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/video-matting'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({
    model,
    onProgress: (progress) => onProgress(progress.progress)
  }), []);
  const removeModel = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)((model) => Object(function webpackMissingModule() { var e = new Error("Cannot find module '@remotion/video-matting'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({ model }), []);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_index_vnc2wdfd_mjs__WEBPACK_IMPORTED_MODULE_0__/* .ModelManager */ .P, {
    ariaLabel: "Video matting models",
    availableModels: AVAILABLE_MODELS,
    description,
    indent,
    isModelCached,
    loadModel,
    prepare: null,
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