"use strict";
(self["webpackChunkenglish_grammar_to_video_template"] = self["webpackChunkenglish_grammar_to_video_template"] || []).push([[798],{

/***/ 8679
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ ZodError),
/* harmony export */   g: () => (/* binding */ ZodRealError)
/* harmony export */ });
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1522);
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4354);
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6205);



/* Prototypes that already carry the lazy helper methods. Seeded with the
 * intrinsics so that `init` on a foreign object — it accepts any object —
 * can never install an accessor onto a prototype we do not own. */
const _installedErrorProtos = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
/* Helper methods live as non-enumerable lazy getters on the shared
 * prototype instead of own properties on every instance. On first
 * access the getter allocates the per-instance closure and caches it
 * as a non-enumerable own property, so detached usage still works and
 * the allocation only happens for methods actually touched. */
function _lazyMethod(proto, key, make) {
    Object.defineProperty(proto, key, {
        configurable: true,
        enumerable: false,
        get() {
            const value = make(this);
            Object.defineProperty(this, key, { value, configurable: true, writable: true });
            return value;
        },
        set(value) {
            Object.defineProperty(this, key, { value, configurable: true, writable: true });
        },
    });
}
const initializer = (inst, issues) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodError */ .a$.init(inst, issues);
    inst.name = "ZodError";
    const proto = Object.getPrototypeOf(inst);
    if (_installedErrorProtos.has(proto))
        return;
    _installedErrorProtos.add(proto);
    _lazyMethod(proto, "format", (self) => (mapper) => _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .formatError */ .Wk(self, mapper));
    _lazyMethod(proto, "flatten", (self) => (mapper) => _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .flattenError */ .JM(self, mapper));
    _lazyMethod(proto, "addIssue", (self) => (issue) => {
        self.issues.push(issue);
        self.message = JSON.stringify(self.issues, _core_util_js__WEBPACK_IMPORTED_MODULE_2__.jsonStringifyReplacer, 2);
    });
    _lazyMethod(proto, "addIssues", (self) => (issues) => {
        self.issues.push(...issues);
        self.message = JSON.stringify(self.issues, _core_util_js__WEBPACK_IMPORTED_MODULE_2__.jsonStringifyReplacer, 2);
    });
    Object.defineProperty(proto, "isEmpty", {
        configurable: true,
        enumerable: false,
        get() {
            return this.issues.length === 0;
        },
    });
};
const ZodError = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodError", initializer);
const ZodRealError = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodError", initializer, undefined, {
    Parent: Error,
});
// /** @deprecated Use `z.core.$ZodErrorMapCtx` instead. */
// export type ErrorMapCtx = core.$ZodErrorMapCtx;


/***/ },

/***/ 2705
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D4: () => (/* binding */ decode),
/* harmony export */   EJ: () => (/* binding */ parseAsync),
/* harmony export */   EM: () => (/* binding */ safeEncodeAsync),
/* harmony export */   F0: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.F0),
/* harmony export */   Re: () => (/* binding */ decodeAsync),
/* harmony export */   X$: () => (/* binding */ encodeAsync),
/* harmony export */   bp: () => (/* binding */ safeParseAsync),
/* harmony export */   ex: () => (/* binding */ safeDecode),
/* harmony export */   lF: () => (/* binding */ encode),
/* harmony export */   qg: () => (/* binding */ parse),
/* harmony export */   tf: () => (/* reexport safe */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.tf),
/* harmony export */   wy: () => (/* binding */ safeEncode),
/* harmony export */   xL: () => (/* binding */ safeParse),
/* harmony export */   yR: () => (/* binding */ safeDecodeAsync)
/* harmony export */ });
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9426);
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8679);


const parse = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* ._parse */ .Tj(_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .ZodRealError */ .g);
const parseAsync = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* ._parseAsync */ .Rb(_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .ZodRealError */ .g);
const safeParse = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* ._safeParse */ .Od(_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .ZodRealError */ .g);
const safeParseAsync = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* ._safeParseAsync */ .wG(_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .ZodRealError */ .g);

// Codec functions
const encode = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* ._encode */ .Mv(_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .ZodRealError */ .g);
const decode = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* ._decode */ .e2(_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .ZodRealError */ .g);
const encodeAsync = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* ._encodeAsync */ .GW(_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .ZodRealError */ .g);
const decodeAsync = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* ._decodeAsync */ .or(_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .ZodRealError */ .g);
const safeEncode = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* ._safeEncode */ .rh(_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .ZodRealError */ .g);
const safeDecode = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* ._safeDecode */ .VS(_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .ZodRealError */ .g);
const safeEncodeAsync = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* ._safeEncodeAsync */ .v_(_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .ZodRealError */ .g);
const safeDecodeAsync = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* ._safeDecodeAsync */ .R3(_errors_js__WEBPACK_IMPORTED_MODULE_1__/* .ZodRealError */ .g);


/***/ },

/***/ 8798
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZodAny: () => (/* binding */ ZodAny),
/* harmony export */   ZodArray: () => (/* binding */ ZodArray),
/* harmony export */   ZodBase64: () => (/* binding */ ZodBase64),
/* harmony export */   ZodBase64URL: () => (/* binding */ ZodBase64URL),
/* harmony export */   ZodBigInt: () => (/* binding */ ZodBigInt),
/* harmony export */   ZodBigIntFormat: () => (/* binding */ ZodBigIntFormat),
/* harmony export */   ZodBoolean: () => (/* binding */ ZodBoolean),
/* harmony export */   ZodCIDRv4: () => (/* binding */ ZodCIDRv4),
/* harmony export */   ZodCIDRv6: () => (/* binding */ ZodCIDRv6),
/* harmony export */   ZodCUID: () => (/* binding */ ZodCUID),
/* harmony export */   ZodCUID2: () => (/* binding */ ZodCUID2),
/* harmony export */   ZodCatch: () => (/* binding */ ZodCatch),
/* harmony export */   ZodCodec: () => (/* binding */ ZodCodec),
/* harmony export */   ZodCreditCard: () => (/* binding */ ZodCreditCard),
/* harmony export */   ZodCustom: () => (/* binding */ ZodCustom),
/* harmony export */   ZodCustomStringFormat: () => (/* binding */ ZodCustomStringFormat),
/* harmony export */   ZodDate: () => (/* binding */ ZodDate),
/* harmony export */   ZodDefault: () => (/* binding */ ZodDefault),
/* harmony export */   ZodDiscriminatedUnion: () => (/* binding */ ZodDiscriminatedUnion),
/* harmony export */   ZodE164: () => (/* binding */ ZodE164),
/* harmony export */   ZodEmail: () => (/* binding */ ZodEmail),
/* harmony export */   ZodEmoji: () => (/* binding */ ZodEmoji),
/* harmony export */   ZodEnum: () => (/* binding */ ZodEnum),
/* harmony export */   ZodExactOptional: () => (/* binding */ ZodExactOptional),
/* harmony export */   ZodFile: () => (/* binding */ ZodFile),
/* harmony export */   ZodFunction: () => (/* binding */ ZodFunction),
/* harmony export */   ZodGUID: () => (/* binding */ ZodGUID),
/* harmony export */   ZodIPv4: () => (/* binding */ ZodIPv4),
/* harmony export */   ZodIPv6: () => (/* binding */ ZodIPv6),
/* harmony export */   ZodISODate: () => (/* binding */ ZodISODate),
/* harmony export */   ZodISODateTime: () => (/* binding */ ZodISODateTime),
/* harmony export */   ZodISODuration: () => (/* binding */ ZodISODuration),
/* harmony export */   ZodISOTime: () => (/* binding */ ZodISOTime),
/* harmony export */   ZodIntersection: () => (/* binding */ ZodIntersection),
/* harmony export */   ZodJWT: () => (/* binding */ ZodJWT),
/* harmony export */   ZodKSUID: () => (/* binding */ ZodKSUID),
/* harmony export */   ZodLazy: () => (/* binding */ ZodLazy),
/* harmony export */   ZodLiteral: () => (/* binding */ ZodLiteral),
/* harmony export */   ZodMAC: () => (/* binding */ ZodMAC),
/* harmony export */   ZodMap: () => (/* binding */ ZodMap),
/* harmony export */   ZodNaN: () => (/* binding */ ZodNaN),
/* harmony export */   ZodNanoID: () => (/* binding */ ZodNanoID),
/* harmony export */   ZodNever: () => (/* binding */ ZodNever),
/* harmony export */   ZodNonOptional: () => (/* binding */ ZodNonOptional),
/* harmony export */   ZodNull: () => (/* binding */ ZodNull),
/* harmony export */   ZodNullable: () => (/* binding */ ZodNullable),
/* harmony export */   ZodNumber: () => (/* binding */ ZodNumber),
/* harmony export */   ZodNumberFormat: () => (/* binding */ ZodNumberFormat),
/* harmony export */   ZodObject: () => (/* binding */ ZodObject),
/* harmony export */   ZodOptional: () => (/* binding */ ZodOptional),
/* harmony export */   ZodPipe: () => (/* binding */ ZodPipe),
/* harmony export */   ZodPrefault: () => (/* binding */ ZodPrefault),
/* harmony export */   ZodPreprocess: () => (/* binding */ ZodPreprocess),
/* harmony export */   ZodPromise: () => (/* binding */ ZodPromise),
/* harmony export */   ZodReadonly: () => (/* binding */ ZodReadonly),
/* harmony export */   ZodRecord: () => (/* binding */ ZodRecord),
/* harmony export */   ZodSet: () => (/* binding */ ZodSet),
/* harmony export */   ZodString: () => (/* binding */ ZodString),
/* harmony export */   ZodStringFormat: () => (/* binding */ ZodStringFormat),
/* harmony export */   ZodSuccess: () => (/* binding */ ZodSuccess),
/* harmony export */   ZodSymbol: () => (/* binding */ ZodSymbol),
/* harmony export */   ZodTemplateLiteral: () => (/* binding */ ZodTemplateLiteral),
/* harmony export */   ZodTransform: () => (/* binding */ ZodTransform),
/* harmony export */   ZodTuple: () => (/* binding */ ZodTuple),
/* harmony export */   ZodType: () => (/* binding */ ZodType),
/* harmony export */   ZodULID: () => (/* binding */ ZodULID),
/* harmony export */   ZodURL: () => (/* binding */ ZodURL),
/* harmony export */   ZodUUID: () => (/* binding */ ZodUUID),
/* harmony export */   ZodUndefined: () => (/* binding */ ZodUndefined),
/* harmony export */   ZodUnion: () => (/* binding */ ZodUnion),
/* harmony export */   ZodUnknown: () => (/* binding */ ZodUnknown),
/* harmony export */   ZodVoid: () => (/* binding */ ZodVoid),
/* harmony export */   ZodXID: () => (/* binding */ ZodXID),
/* harmony export */   ZodXor: () => (/* binding */ ZodXor),
/* harmony export */   _ZodString: () => (/* binding */ _ZodString),
/* harmony export */   _default: () => (/* binding */ _default),
/* harmony export */   _function: () => (/* binding */ _function),
/* harmony export */   any: () => (/* binding */ any),
/* harmony export */   array: () => (/* binding */ array),
/* harmony export */   base64: () => (/* binding */ base64),
/* harmony export */   base64url: () => (/* binding */ base64url),
/* harmony export */   bigint: () => (/* binding */ bigint),
/* harmony export */   boolean: () => (/* binding */ boolean),
/* harmony export */   "catch": () => (/* binding */ _catch),
/* harmony export */   check: () => (/* binding */ check),
/* harmony export */   cidrv4: () => (/* binding */ cidrv4),
/* harmony export */   cidrv6: () => (/* binding */ cidrv6),
/* harmony export */   codec: () => (/* binding */ codec),
/* harmony export */   creditCard: () => (/* binding */ creditCard),
/* harmony export */   cuid: () => (/* binding */ cuid),
/* harmony export */   cuid2: () => (/* binding */ cuid2),
/* harmony export */   custom: () => (/* binding */ custom),
/* harmony export */   date: () => (/* binding */ date),
/* harmony export */   describe: () => (/* binding */ describe),
/* harmony export */   discriminatedUnion: () => (/* binding */ discriminatedUnion),
/* harmony export */   e164: () => (/* binding */ e164),
/* harmony export */   email: () => (/* binding */ email),
/* harmony export */   emoji: () => (/* binding */ emoji),
/* harmony export */   "enum": () => (/* binding */ _enum),
/* harmony export */   exactOptional: () => (/* binding */ exactOptional),
/* harmony export */   file: () => (/* binding */ file),
/* harmony export */   float32: () => (/* binding */ float32),
/* harmony export */   float64: () => (/* binding */ float64),
/* harmony export */   "function": () => (/* binding */ _function),
/* harmony export */   guid: () => (/* binding */ guid),
/* harmony export */   hash: () => (/* binding */ hash),
/* harmony export */   hex: () => (/* binding */ hex),
/* harmony export */   hostname: () => (/* binding */ hostname),
/* harmony export */   httpUrl: () => (/* binding */ httpUrl),
/* harmony export */   "instanceof": () => (/* binding */ _instanceof),
/* harmony export */   int: () => (/* binding */ int),
/* harmony export */   int32: () => (/* binding */ int32),
/* harmony export */   int64: () => (/* binding */ int64),
/* harmony export */   intersection: () => (/* binding */ intersection),
/* harmony export */   invertCodec: () => (/* binding */ invertCodec),
/* harmony export */   ipv4: () => (/* binding */ ipv4),
/* harmony export */   ipv6: () => (/* binding */ ipv6),
/* harmony export */   json: () => (/* binding */ json),
/* harmony export */   jwt: () => (/* binding */ jwt),
/* harmony export */   keyof: () => (/* binding */ keyof),
/* harmony export */   ksuid: () => (/* binding */ ksuid),
/* harmony export */   lazy: () => (/* binding */ lazy),
/* harmony export */   literal: () => (/* binding */ literal),
/* harmony export */   looseObject: () => (/* binding */ looseObject),
/* harmony export */   looseRecord: () => (/* binding */ looseRecord),
/* harmony export */   mac: () => (/* binding */ mac),
/* harmony export */   map: () => (/* binding */ map),
/* harmony export */   meta: () => (/* binding */ meta),
/* harmony export */   nan: () => (/* binding */ nan),
/* harmony export */   nanoid: () => (/* binding */ nanoid),
/* harmony export */   nativeEnum: () => (/* binding */ nativeEnum),
/* harmony export */   never: () => (/* binding */ never),
/* harmony export */   nonoptional: () => (/* binding */ nonoptional),
/* harmony export */   "null": () => (/* binding */ _null),
/* harmony export */   nullable: () => (/* binding */ nullable),
/* harmony export */   nullish: () => (/* binding */ nullish),
/* harmony export */   number: () => (/* binding */ number),
/* harmony export */   object: () => (/* binding */ object),
/* harmony export */   optional: () => (/* binding */ optional),
/* harmony export */   partialRecord: () => (/* binding */ partialRecord),
/* harmony export */   pipe: () => (/* binding */ pipe),
/* harmony export */   prefault: () => (/* binding */ prefault),
/* harmony export */   preprocess: () => (/* binding */ preprocess),
/* harmony export */   promise: () => (/* binding */ promise),
/* harmony export */   readonly: () => (/* binding */ readonly),
/* harmony export */   record: () => (/* binding */ record),
/* harmony export */   refine: () => (/* binding */ refine),
/* harmony export */   set: () => (/* binding */ set),
/* harmony export */   strictObject: () => (/* binding */ strictObject),
/* harmony export */   string: () => (/* binding */ string),
/* harmony export */   stringFormat: () => (/* binding */ stringFormat),
/* harmony export */   stringbool: () => (/* binding */ stringbool),
/* harmony export */   success: () => (/* binding */ success),
/* harmony export */   superRefine: () => (/* binding */ superRefine),
/* harmony export */   symbol: () => (/* binding */ symbol),
/* harmony export */   templateLiteral: () => (/* binding */ templateLiteral),
/* harmony export */   transform: () => (/* binding */ transform),
/* harmony export */   tuple: () => (/* binding */ tuple),
/* harmony export */   uint32: () => (/* binding */ uint32),
/* harmony export */   uint64: () => (/* binding */ uint64),
/* harmony export */   ulid: () => (/* binding */ ulid),
/* harmony export */   undefined: () => (/* binding */ _undefined),
/* harmony export */   union: () => (/* binding */ union),
/* harmony export */   unknown: () => (/* binding */ unknown),
/* harmony export */   url: () => (/* binding */ url),
/* harmony export */   uuid: () => (/* binding */ uuid),
/* harmony export */   uuidv4: () => (/* binding */ uuidv4),
/* harmony export */   uuidv6: () => (/* binding */ uuidv6),
/* harmony export */   uuidv7: () => (/* binding */ uuidv7),
/* harmony export */   "void": () => (/* binding */ _void),
/* harmony export */   xid: () => (/* binding */ xid),
/* harmony export */   xor: () => (/* binding */ xor)
/* harmony export */ });
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1522);
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9817);
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8283);
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9348);
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6205);
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8342);
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8674);
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1373);
/* harmony import */ var _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3753);
/* harmony import */ var _core_to_json_schema_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9147);
/* harmony import */ var _locales_en_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6286);
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2705);







// Register English as the default locale on first ZodType construction. Hooked into the `ZodType` `$constructor` (rather than a top-level `config(en())` in `external.ts`) so bundlers honoring `sideEffects: false` can't tree-shake it out — see #5953, #5725. An explicit `z.config(z.locales.xx())` call wins regardless of order, since this only sets the default when none is present.
function _ensureDefaultLocale() {
    if (!_core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .globalConfig */ .cr.localeError)
        _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .config */ .$W((0,_locales_en_js__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .A)());
}
// the default memoizer is read by the core container init, which runs before `ZodType.init`, so each container calls this first
function _ensureDefaultMemoizer() {
    if (!_core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .globalConfig */ .cr.memoizer)
        _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .config */ .$W({ memoizer: _core_index_js__WEBPACK_IMPORTED_MODULE_2__/* .memoizer */ .x3() });
}
const ZodType = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodType", (inst, def) => {
    _ensureDefaultLocale();
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodType */ .W4.init(inst, def);
    inst.def = def;
    inst.type = def.type;
    return inst;
}, {
    check(...chks) {
        const def = this.def;
        return this.clone(_core_index_js__WEBPACK_IMPORTED_MODULE_4__.mergeDefs(def, {
            checks: [
                ...(def.checks ?? []),
                ...chks.map((ch) => typeof ch === "function" ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } } : ch),
            ],
        }), { parent: true });
    },
    with(...chks) {
        return this.check(...chks);
    },
    clone(def, params) {
        return _core_index_js__WEBPACK_IMPORTED_MODULE_4__.clone(this, def, params);
    },
    brand() {
        return this;
    },
    register(reg, meta) {
        reg.add(this, meta);
        return this;
    },
    refine(check, params) {
        return this.check(refine(check, params));
    },
    superRefine(refinement, params) {
        return this.check(superRefine(refinement, params));
    },
    overwrite(fn) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._overwrite */ .bS(fn));
    },
    optional() {
        return optional(this);
    },
    exactOptional() {
        return exactOptional(this);
    },
    nullable() {
        return nullable(this);
    },
    nullish() {
        return optional(nullable(this));
    },
    nonoptional(params) {
        return nonoptional(this, params);
    },
    array() {
        return array(this);
    },
    or(arg) {
        return union([this, arg]);
    },
    and(arg) {
        return intersection(this, arg);
    },
    transform(tx) {
        return pipe(this, transform(tx));
    },
    default(d) {
        return _default(this, d);
    },
    prefault(d) {
        return prefault(this, d);
    },
    catch(params) {
        return _catch(this, params);
    },
    pipe(target) {
        return pipe(this, target);
    },
    readonly() {
        return readonly(this);
    },
    describe(description) {
        const cl = this.clone();
        _core_index_js__WEBPACK_IMPORTED_MODULE_6__/* .globalRegistry */ .fd.add(cl, { description });
        return cl;
    },
    meta(...args) {
        // overloaded: meta() returns the registered metadata, meta(data) returns a clone with `data` registered. The mapped type picks up the second overload, so we accept variadic any-args and return `any` to satisfy both at runtime.
        if (args.length === 0)
            return _core_index_js__WEBPACK_IMPORTED_MODULE_6__/* .globalRegistry */ .fd.get(this);
        const cl = this.clone();
        _core_index_js__WEBPACK_IMPORTED_MODULE_6__/* .globalRegistry */ .fd.add(cl, args[0]);
        return cl;
    },
    isOptional() {
        return this.safeParse(undefined).success;
    },
    isNullable() {
        return this.safeParse(null).success;
    },
    apply(fn, ...args) {
        return args.length === 0 ? fn(this) : fn(this, ...args);
    },
    // Overrides core's `~standard` to add `jsonSchema`. Must stay a prototype entry: redefining it per instance demotes instances to dictionary mode.
    get "~standard"() {
        return _core_index_js__WEBPACK_IMPORTED_MODULE_4__.hide(this, "~standard", {
            ..._core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .standardProps */ .YK(this),
            jsonSchema: {
                input: (0,_core_to_json_schema_js__WEBPACK_IMPORTED_MODULE_9__/* .createStandardJSONSchemaMethod */ .uE)(this, "input"),
                output: (0,_core_to_json_schema_js__WEBPACK_IMPORTED_MODULE_9__/* .createStandardJSONSchemaMethod */ .uE)(this, "output"),
            },
        });
    },
    set "~standard"(value) {
        _core_index_js__WEBPACK_IMPORTED_MODULE_4__.own(this, "~standard", value);
    },
    parse: function _parse(data, params) {
        return _parse_js__WEBPACK_IMPORTED_MODULE_11__/* .parse */ .qg(this, data, params, { callee: _parse });
    },
    parseAsync: async function _parseAsync(data, params) {
        return await _parse_js__WEBPACK_IMPORTED_MODULE_11__/* .parseAsync */ .EJ(this, data, params, { callee: _parseAsync });
    },
    safeParse(data, params) {
        return _parse_js__WEBPACK_IMPORTED_MODULE_11__/* .safeParse */ .xL(this, data, params);
    },
    async safeParseAsync(data, params) {
        return _parse_js__WEBPACK_IMPORTED_MODULE_11__/* .safeParseAsync */ .bp(this, data, params);
    },
    // `spa` is an alias: same function object as `safeParseAsync`, as before.
    get spa() {
        return this?.safeParseAsync;
    },
    set spa(value) {
        _core_index_js__WEBPACK_IMPORTED_MODULE_4__.own(this, "spa", value);
    },
    encode: function _encode(data, params) {
        return _parse_js__WEBPACK_IMPORTED_MODULE_11__/* .encode */ .lF(this, data, params, { callee: _encode });
    },
    decode: function _decode(data, params) {
        return _parse_js__WEBPACK_IMPORTED_MODULE_11__/* .decode */ .D4(this, data, params, { callee: _decode });
    },
    encodeAsync: async function _encodeAsync(data, params) {
        return await _parse_js__WEBPACK_IMPORTED_MODULE_11__/* .encodeAsync */ .X$(this, data, params, { callee: _encodeAsync });
    },
    decodeAsync: async function _decodeAsync(data, params) {
        return await _parse_js__WEBPACK_IMPORTED_MODULE_11__/* .decodeAsync */ .Re(this, data, params, { callee: _decodeAsync });
    },
    safeEncode(data, params) {
        return _parse_js__WEBPACK_IMPORTED_MODULE_11__/* .safeEncode */ .wy(this, data, params);
    },
    safeDecode(data, params) {
        return _parse_js__WEBPACK_IMPORTED_MODULE_11__/* .safeDecode */ .ex(this, data, params);
    },
    async safeEncodeAsync(data, params) {
        return _parse_js__WEBPACK_IMPORTED_MODULE_11__/* .safeEncodeAsync */ .EM(this, data, params);
    },
    async safeDecodeAsync(data, params) {
        return _parse_js__WEBPACK_IMPORTED_MODULE_11__/* .safeDecodeAsync */ .yR(this, data, params);
    },
    toJSONSchema(params) {
        return (0,_core_to_json_schema_js__WEBPACK_IMPORTED_MODULE_9__/* .createToJSONSchemaMethod */ .OA)(this, {})(params);
    },
    // Reads through to the registry on every access, so it must not cache.
    get description() {
        return _core_index_js__WEBPACK_IMPORTED_MODULE_6__/* .globalRegistry */ .fd.get(this)?.description;
    },
    // No setter: `schema._def = x` throws, as it did when `_def` was a non-writable own property.
    get _def() {
        return this._zod.def;
    },
});
/** @internal */
const _ZodString = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("_ZodString", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodString */ .$v.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .stringProcessor */ .SW(inst, ctx, json, params);
    const bag = inst._zod.bag;
    inst.format = bag.format ?? null;
    inst.minLength = bag.minimum ?? null;
    inst.maxLength = bag.maximum ?? null;
}, {
    regex(...args) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._regex */ .Fk(...args));
    },
    includes(...args) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._includes */ .dR(...args));
    },
    startsWith(...args) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._startsWith */ .$S(...args));
    },
    endsWith(...args) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._endsWith */ .ER(...args));
    },
    min(...args) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._minLength */ .m9(...args));
    },
    max(...args) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._maxLength */ .Eb(...args));
    },
    length(...args) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._length */ .YA(...args));
    },
    nonempty(...args) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._minLength */ .m9(1, ...args));
    },
    lowercase(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._lowercase */ .hH(params));
    },
    uppercase(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._uppercase */ .qF(params));
    },
    trim() {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._trim */ .WN());
    },
    normalize(...args) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._normalize */ .lo(...args));
    },
    toLowerCase() {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._toLowerCase */ .Il());
    },
    toUpperCase() {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._toUpperCase */ .xY());
    },
    slugify() {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._slugify */ .TL());
    },
});
const ZodString = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodString", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodString */ .$v.init(inst, def);
    _ZodString.init(inst, def);
}, {
    email(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._email */ .Mu(ZodEmail, params));
    },
    url(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._url */ .Fn(ZodURL, params));
    },
    jwt(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._jwt */ .rk(ZodJWT, params));
    },
    emoji(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._emoji */ .aC(ZodEmoji, params));
    },
    guid(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._guid */ .tB(ZodGUID, params));
    },
    uuid(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._uuid */ .Be(ZodUUID, params));
    },
    uuidv4(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._uuidv4 */ .nA(ZodUUID, params));
    },
    uuidv6(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._uuidv6 */ .pY(ZodUUID, params));
    },
    uuidv7(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._uuidv7 */ .wA(ZodUUID, params));
    },
    nanoid(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._nanoid */ .Dl(ZodNanoID, params));
    },
    cuid(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._cuid */ .fs(ZodCUID, params));
    },
    cuid2(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._cuid2 */ .Bj(ZodCUID2, params));
    },
    ulid(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._ulid */ .Ct(ZodULID, params));
    },
    base64(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._base64 */ .rt(ZodBase64, params));
    },
    base64url(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._base64url */ .cU(ZodBase64URL, params));
    },
    xid(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._xid */ .Pw(ZodXID, params));
    },
    ksuid(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._ksuid */ ._z(ZodKSUID, params));
    },
    ipv4(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._ipv4 */ .Ny(ZodIPv4, params));
    },
    ipv6(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._ipv6 */ .$O(ZodIPv6, params));
    },
    cidrv4(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._cidrv4 */ .Uy(ZodCIDRv4, params));
    },
    cidrv6(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._cidrv6 */ .gP(ZodCIDRv6, params));
    },
    e164(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._e164 */ .KB(ZodE164, params));
    },
    datetime(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._isoDateTime */ .G1(ZodISODateTime, params));
    },
    date(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._isoDate */ .db(ZodISODate, params));
    },
    time(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._isoTime */ .Kn(ZodISOTime, params));
    },
    duration(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._isoDuration */ .f2(ZodISODuration, params));
    },
});
function string(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._string */ .Rl(ZodString, params);
}
const ZodStringFormat = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodStringFormat", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodStringFormat */ .EY.init(inst, def);
    _ZodString.init(inst, def);
});
const ZodISODateTime = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodISODateTime", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodISODateTime */ .Ko.init(inst, def);
    ZodStringFormat.init(inst, def);
});
const ZodISODate = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodISODate", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodISODate */ .v1.init(inst, def);
    ZodStringFormat.init(inst, def);
});
const ZodISOTime = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodISOTime", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodISOTime */ .Ax.init(inst, def);
    ZodStringFormat.init(inst, def);
});
const ZodISODuration = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodISODuration", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodISODuration */ .$N.init(inst, def);
    ZodStringFormat.init(inst, def);
});
const ZodEmail = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodEmail", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodEmail */ .qG.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function email(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._email */ .Mu(ZodEmail, params);
}
const ZodGUID = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodGUID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodGUID */ .Zc.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function guid(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._guid */ .tB(ZodGUID, params);
}
const ZodUUID = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodUUID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodUUID */ .Zn.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function uuid(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._uuid */ .Be(ZodUUID, params);
}
function uuidv4(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._uuidv4 */ .nA(ZodUUID, params);
}
// ZodUUIDv6
function uuidv6(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._uuidv6 */ .pY(ZodUUID, params);
}
// ZodUUIDv7
function uuidv7(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._uuidv7 */ .wA(ZodUUID, params);
}
const ZodURL = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodURL", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodURL */ .VY.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function url(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._url */ .Fn(ZodURL, params);
}
function httpUrl(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._url */ .Fn(ZodURL, {
        protocol: _core_index_js__WEBPACK_IMPORTED_MODULE_5__.httpProtocol,
        hostname: _core_index_js__WEBPACK_IMPORTED_MODULE_5__.domain,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__.normalizeParams(params),
    });
}
const ZodEmoji = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodEmoji", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodEmoji */ .cG.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function emoji(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._emoji */ .aC(ZodEmoji, params);
}
const ZodNanoID = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodNanoID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodNanoID */ .Py.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function nanoid(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._nanoid */ .Dl(ZodNanoID, params);
}
/**
 * @deprecated CUID v1 is deprecated by its authors due to information leakage
 * (timestamps embedded in the id). Use {@link ZodCUID2} instead.
 * See https://github.com/paralleldrive/cuid.
 */
const ZodCUID = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodCUID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodCUID */ .bl.init(inst, def);
    ZodStringFormat.init(inst, def);
});
/**
 * Validates a CUID v1 string.
 *
 * @deprecated CUID v1 is deprecated by its authors due to information leakage
 * (timestamps embedded in the id). Use {@link cuid2 | `z.cuid2()`} instead.
 * See https://github.com/paralleldrive/cuid.
 */
function cuid(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._cuid */ .fs(ZodCUID, params);
}
const ZodCUID2 = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodCUID2", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodCUID2 */ .Zu.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function cuid2(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._cuid2 */ .Bj(ZodCUID2, params);
}
const ZodULID = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodULID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodULID */ .g5.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function ulid(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._ulid */ .Ct(ZodULID, params);
}
const ZodXID = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodXID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodXID */ .TF.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function xid(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._xid */ .Pw(ZodXID, params);
}
const ZodKSUID = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodKSUID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodKSUID */ .GY.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function ksuid(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._ksuid */ ._z(ZodKSUID, params);
}
const ZodIPv4 = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodIPv4", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodIPv4 */ .Lc.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function ipv4(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._ipv4 */ .Ny(ZodIPv4, params);
}
const ZodMAC = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodMAC", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodMAC */ .rO.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function mac(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._mac */ .R8(ZodMAC, params);
}
const ZodIPv6 = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodIPv6", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodIPv6 */ .Zy.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function ipv6(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._ipv6 */ .$O(ZodIPv6, params);
}
const ZodCIDRv4 = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodCIDRv4", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodCIDRv4 */ .CI.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function cidrv4(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._cidrv4 */ .Uy(ZodCIDRv4, params);
}
const ZodCIDRv6 = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodCIDRv6", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodCIDRv6 */ .Cn.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function cidrv6(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._cidrv6 */ .gP(ZodCIDRv6, params);
}
const ZodBase64 = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodBase64", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodBase64 */ .Dq.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function base64(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._base64 */ .rt(ZodBase64, params);
}
const ZodBase64URL = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodBase64URL", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodBase64URL */ .CQ.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function base64url(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._base64url */ .cU(ZodBase64URL, params);
}
const ZodE164 = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodE164", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodE164 */ .Oy.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function e164(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._e164 */ .KB(ZodE164, params);
}
const ZodCreditCard = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodCreditCard", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodCreditCard */ .ZZ.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function creditCard(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._creditCard */ .vN(ZodCreditCard, params);
}
const ZodJWT = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodJWT", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodJWT */ .h8.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function jwt(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._jwt */ .rk(ZodJWT, params);
}
const ZodCustomStringFormat = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodCustomStringFormat", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodCustomStringFormat */ .ZQ.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function stringFormat(format, fnOrRegex, _params = {}) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._stringFormat */ .Af(ZodCustomStringFormat, format, fnOrRegex, _params);
}
function hostname(_params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._stringFormat */ .Af(ZodCustomStringFormat, "hostname", _core_index_js__WEBPACK_IMPORTED_MODULE_5__.hostname, _params);
}
function hex(_params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._stringFormat */ .Af(ZodCustomStringFormat, "hex", _core_index_js__WEBPACK_IMPORTED_MODULE_5__.hex, _params);
}
function hash(alg, params) {
    const enc = params?.enc ?? "hex";
    const format = `${alg}_${enc}`;
    const regex = _core_index_js__WEBPACK_IMPORTED_MODULE_5__[format];
    if (!regex)
        throw new Error(`Unrecognized hash format: ${format}`);
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._stringFormat */ .Af(ZodCustomStringFormat, format, regex, params);
}
const ZodNumber = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodNumber", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodNumber */ .vz.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .numberProcessor */ .Wg(inst, ctx, json, params);
    const bag = inst._zod.bag;
    inst.minValue =
        Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
    inst.maxValue =
        Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
    inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? 0.5);
    inst.isFinite = true;
    inst.format = bag.format ?? null;
}, {
    gt(value, params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._gt */ .Tx(value, params));
    },
    gte(value, params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._gte */ .qm(value, params));
    },
    min(value, params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._gte */ .qm(value, params));
    },
    lt(value, params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._lt */ .Au(value, params));
    },
    lte(value, params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._lte */ .Zm(value, params));
    },
    max(value, params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._lte */ .Zm(value, params));
    },
    int(params) {
        return this.check(int(params));
    },
    safe(params) {
        return this.check(int(params));
    },
    positive(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._gt */ .Tx(0, params));
    },
    nonnegative(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._gte */ .qm(0, params));
    },
    negative(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._lt */ .Au(0, params));
    },
    nonpositive(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._lte */ .Zm(0, params));
    },
    multipleOf(value, params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._multipleOf */ .Hi(value, params));
    },
    step(value, params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._multipleOf */ .Hi(value, params));
    },
    finite() {
        return this;
    },
});
function number(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._number */ .F7(ZodNumber, params);
}
const ZodNumberFormat = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodNumberFormat", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodNumberFormat */ .I.init(inst, def);
    ZodNumber.init(inst, def);
});
function int(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._int */ .LK(ZodNumberFormat, params);
}
function float32(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._float32 */ .HL(ZodNumberFormat, params);
}
function float64(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._float64 */ .g6(ZodNumberFormat, params);
}
function int32(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._int32 */ .sw(ZodNumberFormat, params);
}
function uint32(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._uint32 */ .P(ZodNumberFormat, params);
}
const ZodBoolean = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodBoolean", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodBoolean */ .sF.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .booleanProcessor */ .dO(inst, ctx, json, params);
});
function boolean(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._boolean */ ._L(ZodBoolean, params);
}
const ZodBigInt = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodBigInt", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodBigInt */ .BN.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .bigintProcessor */ .Y8(inst, ctx, json, params);
    const bag = inst._zod.bag;
    inst.minValue = bag.minimum ?? null;
    inst.maxValue = bag.maximum ?? null;
    inst.format = bag.format ?? null;
}, {
    gte(value, params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._gte */ .qm(value, params));
    },
    min(value, params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._gte */ .qm(value, params));
    },
    gt(value, params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._gt */ .Tx(value, params));
    },
    lt(value, params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._lt */ .Au(value, params));
    },
    lte(value, params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._lte */ .Zm(value, params));
    },
    max(value, params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._lte */ .Zm(value, params));
    },
    positive(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._gt */ .Tx(BigInt(0), params));
    },
    negative(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._lt */ .Au(BigInt(0), params));
    },
    nonpositive(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._lte */ .Zm(BigInt(0), params));
    },
    nonnegative(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._gte */ .qm(BigInt(0), params));
    },
    multipleOf(value, params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._multipleOf */ .Hi(value, params));
    },
});
function bigint(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._bigint */ .z$(ZodBigInt, params);
}
const ZodBigIntFormat = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodBigIntFormat", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodBigIntFormat */ .IT.init(inst, def);
    ZodBigInt.init(inst, def);
});
function int64(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._int64 */ .Jg(ZodBigIntFormat, params);
}
function uint64(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._uint64 */ .ii(ZodBigIntFormat, params);
}
const ZodSymbol = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodSymbol", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodSymbol */ .U5.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .symbolProcessor */ .fg(inst, ctx, json, params);
});
function symbol(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._symbol */ .W7(ZodSymbol, params);
}
const ZodUndefined = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodUndefined", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodUndefined */ .Mv.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .undefinedProcessor */ .BU(inst, ctx, json, params);
});
function _undefined(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._undefined */ .E4(ZodUndefined, params);
}

const ZodNull = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodNull", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodNull */ .x8.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .nullProcessor */ .In(inst, ctx, json, params);
});
function _null(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._null */ .jw(ZodNull, params);
}

const ZodAny = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodAny", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodAny */ .Gb.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .anyProcessor */ .NX(inst, ctx, json, params);
});
function any() {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._any */ .KA(ZodAny);
}
const ZodUnknown = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodUnknown", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodUnknown */ .GP.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .unknownProcessor */ .NV(inst, ctx, json, params);
});
function unknown() {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._unknown */ .em(ZodUnknown);
}
const ZodNever = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodNever", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodNever */ .Um.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .neverProcessor */ .RH(inst, ctx, json, params);
});
function never(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._never */ .G8(ZodNever, params);
}
const ZodVoid = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodVoid", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodVoid */ .WH.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .voidProcessor */ .vn(inst, ctx, json, params);
});
function _void(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._void */ .OC(ZodVoid, params);
}

const ZodDate = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodDate", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodDate */ .o5.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .dateProcessor */ .Fl(inst, ctx, json, params);
    inst.min = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._gte */ .qm(value, params));
    inst.max = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._lte */ .Zm(value, params));
    const c = inst._zod.bag;
    inst.minDate = c.minimum ? new Date(c.minimum) : null;
    inst.maxDate = c.maximum ? new Date(c.maximum) : null;
});
function date(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._date */ .YY(ZodDate, params);
}
const ZodArray = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodArray", (inst, def) => {
    _ensureDefaultMemoizer();
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodArray */ .$p.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .arrayProcessor */ .cY(inst, ctx, json, params);
    inst.element = def.element;
}, {
    min(n, params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._minLength */ .m9(n, params));
    },
    nonempty(params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._minLength */ .m9(1, params));
    },
    max(n, params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._maxLength */ .Eb(n, params));
    },
    length(n, params) {
        return this.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._length */ .YA(n, params));
    },
    unwrap() {
        return this.element;
    },
});
function array(element, params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._array */ .dZ(ZodArray, element, params);
}
// .keyof
function keyof(schema) {
    const shape = schema._zod.def.shape;
    return _enum(Object.keys(shape));
}
const ZodObject = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodObject", (inst, def) => {
    _ensureDefaultMemoizer();
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodObjectJIT */ .w.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .objectProcessor */ .Ec(inst, ctx, json, params);
    _core_index_js__WEBPACK_IMPORTED_MODULE_4__.installLazyProp(inst, "shape", (self) => self._zod.def.shape, false);
}, {
    keyof() {
        return _enum(Object.keys(this._zod.def.shape));
    },
    catchall(catchall) {
        return this.clone({ ...this._zod.def, catchall: catchall });
    },
    passthrough() {
        return this.clone({ ...this._zod.def, catchall: unknown() });
    },
    loose() {
        return this.clone({ ...this._zod.def, catchall: unknown() });
    },
    strict() {
        return this.clone({ ...this._zod.def, catchall: never() });
    },
    strip() {
        return this.clone({ ...this._zod.def, catchall: undefined });
    },
    extend(incoming) {
        return _core_index_js__WEBPACK_IMPORTED_MODULE_4__.extend(this, incoming);
    },
    safeExtend(incoming) {
        return _core_index_js__WEBPACK_IMPORTED_MODULE_4__.safeExtend(this, incoming);
    },
    merge(other) {
        return _core_index_js__WEBPACK_IMPORTED_MODULE_4__.merge(this, other);
    },
    pick(mask) {
        return _core_index_js__WEBPACK_IMPORTED_MODULE_4__.pick(this, mask);
    },
    omit(mask) {
        return _core_index_js__WEBPACK_IMPORTED_MODULE_4__.omit(this, mask);
    },
    partial(...args) {
        return _core_index_js__WEBPACK_IMPORTED_MODULE_4__.partial(ZodOptional, this, args[0]);
    },
    exactPartial(...args) {
        return _core_index_js__WEBPACK_IMPORTED_MODULE_4__.partial(ZodExactOptional, this, args[0], "exactPartial");
    },
    required(...args) {
        return _core_index_js__WEBPACK_IMPORTED_MODULE_4__.required(ZodNonOptional, this, args[0]);
    },
});
function object(shape, params) {
    const def = {
        type: "object",
        shape: shape ?? {},
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__.normalizeParams(params),
    };
    return new ZodObject(def);
}
// strictObject
function strictObject(shape, params) {
    return new ZodObject({
        type: "object",
        shape,
        catchall: never(),
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__.normalizeParams(params),
    });
}
// looseObject
function looseObject(shape, params) {
    return new ZodObject({
        type: "object",
        shape,
        catchall: unknown(),
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__.normalizeParams(params),
    });
}
const ZodUnion = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodUnion", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodUnion */ .cu.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .unionProcessor */ .iC(inst, ctx, json, params);
    inst.options = def.options;
});
function union(options, params) {
    return new ZodUnion({
        type: "union",
        options: options,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__.normalizeParams(params),
    });
}
const ZodXor = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodXor", (inst, def) => {
    ZodUnion.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodXor */ .pm.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .unionProcessor */ .iC(inst, ctx, json, params);
    inst.options = def.options;
});
/** Creates an exclusive union (XOR) where exactly one option must match.
 * Unlike regular unions that succeed when any option matches, xor fails if
 * zero or more than one option matches the input. */
function xor(options, params) {
    return new ZodXor({
        type: "union",
        options: options,
        inclusive: false,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__.normalizeParams(params),
    });
}
const ZodDiscriminatedUnion = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodDiscriminatedUnion", (inst, def) => {
    ZodUnion.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodDiscriminatedUnion */ .P0.init(inst, def);
});
function discriminatedUnion(discriminator, options, params) {
    // const [options, params] = args;
    return new ZodDiscriminatedUnion({
        type: "union",
        options: options,
        discriminator,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__.normalizeParams(params),
    });
}
const ZodIntersection = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodIntersection", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodIntersection */ .LJ.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .intersectionProcessor */ .i_(inst, ctx, json, params);
});
function intersection(left, right) {
    return new ZodIntersection({
        type: "intersection",
        left: left,
        right: right,
    });
}
const ZodTuple = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodTuple", (inst, def) => {
    _ensureDefaultMemoizer();
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodTuple */ .G3.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .tupleProcessor */ .CN(inst, ctx, json, params);
}, {
    rest(rest) {
        return this.clone({
            ...this._zod.def,
            rest: rest,
        });
    },
    partial() {
        const def = this._zod.def;
        // a refinement was authored against the full arity; partialing would run it on a shorter array
        if (def.checks?.length)
            throw new Error(".partial() cannot be used on tuple schemas containing refinements");
        return this.clone({
            ...def,
            items: def.items.map((item) => new ZodOptional({ type: "optional", innerType: item })),
        });
    },
});
function tuple(items, _paramsOrRest, _params) {
    const hasRest = _paramsOrRest instanceof _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodType */ .W4;
    const params = hasRest ? _params : _paramsOrRest;
    const rest = hasRest ? _paramsOrRest : null;
    return new ZodTuple({
        type: "tuple",
        items: items,
        rest,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__.normalizeParams(params),
    });
}
const ZodRecord = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodRecord", (inst, def) => {
    _ensureDefaultMemoizer();
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodRecord */ .h.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .recordProcessor */ .GC(inst, ctx, json, params);
    inst.keyType = def.keyType;
    inst.valueType = def.valueType;
});
function record(keyType, valueType, params) {
    // v3-compat: z.record(valueType, params?) — defaults keyType to z.string()
    if (!valueType || !valueType._zod) {
        return new ZodRecord({
            type: "record",
            keyType: string(),
            valueType: keyType,
            ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__.normalizeParams(valueType),
        });
    }
    return new ZodRecord({
        type: "record",
        keyType,
        valueType: valueType,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__.normalizeParams(params),
    });
}
// type alksjf = core.output<core.$ZodRecordKey>;
function partialRecord(keyType, valueType, params) {
    return new ZodRecord({
        type: "record",
        keyType,
        valueType: valueType,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__.normalizeParams(params),
        partial: true,
    });
}
function looseRecord(keyType, valueType, params) {
    return new ZodRecord({
        type: "record",
        keyType,
        valueType: valueType,
        mode: "loose",
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__.normalizeParams(params),
    });
}
const ZodMap = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodMap", (inst, def) => {
    _ensureDefaultMemoizer();
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodMap */ .eb.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .mapProcessor */ .jq(inst, ctx, json, params);
    inst.keyType = def.keyType;
    inst.valueType = def.valueType;
    inst.min = (...args) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._minSize */ .Nd(...args));
    inst.nonempty = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._minSize */ .Nd(1, params));
    inst.max = (...args) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._maxSize */ .vL(...args));
    inst.size = (...args) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._size */ .d$(...args));
});
function map(keyType, valueType, params) {
    return new ZodMap({
        type: "map",
        keyType: keyType,
        valueType: valueType,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__.normalizeParams(params),
    });
}
const ZodSet = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodSet", (inst, def) => {
    _ensureDefaultMemoizer();
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodSet */ .Oi.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .setProcessor */ .zH(inst, ctx, json, params);
    inst.min = (...args) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._minSize */ .Nd(...args));
    inst.nonempty = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._minSize */ .Nd(1, params));
    inst.max = (...args) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._maxSize */ .vL(...args));
    inst.size = (...args) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._size */ .d$(...args));
});
function set(valueType, params) {
    return new ZodSet({
        type: "set",
        valueType: valueType,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__.normalizeParams(params),
    });
}
const ZodEnum = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodEnum", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodEnum */ .VO.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .enumProcessor */ .C0(inst, ctx, json, params);
    inst.enum = def.entries;
    inst.options = Object.values(def.entries);
    const keys = new Set(Object.keys(def.entries));
    inst.extract = (values, params) => {
        const newEntries = {};
        for (const value of values) {
            if (keys.has(value)) {
                newEntries[value] = def.entries[value];
            }
            else
                throw new Error(`Key ${value} not found in enum`);
        }
        return new ZodEnum({
            ...def,
            checks: [],
            ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__.normalizeParams(params),
            entries: newEntries,
        });
    };
    inst.exclude = (values, params) => {
        const newEntries = { ...def.entries };
        for (const value of values) {
            if (keys.has(value)) {
                delete newEntries[value];
            }
            else
                throw new Error(`Key ${value} not found in enum`);
        }
        return new ZodEnum({
            ...def,
            checks: [],
            ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__.normalizeParams(params),
            entries: newEntries,
        });
    };
});
function _enum(values, params) {
    const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
    return new ZodEnum({
        type: "enum",
        entries,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__.normalizeParams(params),
    });
}

/** @deprecated This API has been merged into `z.enum()`. Use `z.enum()` instead.
 *
 * ```ts
 * enum Colors { red, green, blue }
 * z.enum(Colors);
 * ```
 */
function nativeEnum(entries, params) {
    return new ZodEnum({
        type: "enum",
        entries,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__.normalizeParams(params),
    });
}
const ZodLiteral = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodLiteral", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodLiteral */ .nu.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .literalProcessor */ .Yv(inst, ctx, json, params);
    inst.values = new Set(def.values);
    Object.defineProperty(inst, "value", {
        get() {
            if (def.values.length > 1) {
                throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
            }
            return def.values[0];
        },
    });
});
function literal(value, params) {
    return new ZodLiteral({
        type: "literal",
        values: Array.isArray(value) ? value : [value],
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__.normalizeParams(params),
    });
}
const ZodFile = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodFile", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodFile */ .CT.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .fileProcessor */ .H1(inst, ctx, json, params);
    inst.min = (size, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._minSize */ .Nd(size, params));
    inst.max = (size, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._maxSize */ .vL(size, params));
    inst.mime = (types, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._mime */ .GZ(Array.isArray(types) ? types : [types], params));
});
function file(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._file */ .K2(ZodFile, params);
}
const ZodTransform = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodTransform", (inst, def) => {
    _ensureDefaultMemoizer();
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodTransform */ .Wc.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .transformProcessor */ .xi(inst, ctx, json, params);
    inst._zod.parse = (payload, _ctx) => {
        if (_ctx.direction === "backward") {
            throw new _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$ZodEncodeError */ .cV(inst.constructor.name);
        }
        payload.addIssue = (issue) => {
            if (typeof issue === "string") {
                payload.issues.push(_core_index_js__WEBPACK_IMPORTED_MODULE_4__.issue(issue, payload.value, def));
            }
            else {
                // for Zod 3 backwards compatibility
                const _issue = issue;
                if (_issue.fatal)
                    _issue.continue = false;
                _issue.code ?? (_issue.code = "custom");
                if (!("input" in _issue))
                    _issue.input = payload.value;
                _issue.inst ?? (_issue.inst = inst);
                // _issue.continue ??= true;
                payload.issues.push(_core_index_js__WEBPACK_IMPORTED_MODULE_4__.issue(_issue));
            }
        };
        const output = def.transform(payload.value, payload);
        if (output instanceof Promise) {
            return output.then((output) => {
                payload.value = output;
                return payload;
            });
        }
        payload.value = output;
        return payload;
    };
});
function transform(fn) {
    return new ZodTransform({
        type: "transform",
        transform: fn,
    });
}
const ZodOptional = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodOptional", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodOptional */ .ig.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .optionalProcessor */ .$k(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
    return new ZodOptional({
        type: "optional",
        innerType: innerType,
    });
}
const ZodExactOptional = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodExactOptional", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodExactOptional */ .RL.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .optionalProcessor */ .$k(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
});
function exactOptional(innerType) {
    return new ZodExactOptional({
        type: "optional",
        innerType: innerType,
    });
}
const ZodNullable = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodNullable", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodNullable */ .qc.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .nullableProcessor */ .yq(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
    return new ZodNullable({
        type: "nullable",
        innerType: innerType,
    });
}
// nullish
function nullish(innerType) {
    return optional(nullable(innerType));
}
const ZodDefault = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodDefault", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodDefault */ .rv.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .defaultProcessor */ .mh(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
    inst.removeDefault = inst.unwrap;
});
function _default(innerType, defaultValue) {
    return new ZodDefault({
        type: "default",
        innerType: innerType,
        get defaultValue() {
            return typeof defaultValue === "function" ? defaultValue() : _core_index_js__WEBPACK_IMPORTED_MODULE_4__.shallowClone(defaultValue);
        },
    });
}
const ZodPrefault = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodPrefault", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodPrefault */ .VF.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .prefaultProcessor */ .A(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
    return new ZodPrefault({
        type: "prefault",
        innerType: innerType,
        get defaultValue() {
            return typeof defaultValue === "function" ? defaultValue() : _core_index_js__WEBPACK_IMPORTED_MODULE_4__.shallowClone(defaultValue);
        },
    });
}
const ZodNonOptional = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodNonOptional", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodNonOptional */ .N$.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .nonoptionalProcessor */ .cR(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
    return new ZodNonOptional({
        type: "nonoptional",
        innerType: innerType,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__.normalizeParams(params),
    });
}
const ZodSuccess = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodSuccess", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodSuccess */ .Dw.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .successProcessor */ .aw(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
});
function success(innerType) {
    return new ZodSuccess({
        type: "success",
        innerType: innerType,
    });
}
const ZodCatch = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodCatch", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodCatch */ .t$.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .catchProcessor */ .Q9(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
    inst.removeCatch = inst.unwrap;
});
function _catch(innerType, catchValue) {
    return new ZodCatch({
        type: "catch",
        innerType: innerType,
        catchValue: (typeof catchValue === "function" ? catchValue : _core_index_js__WEBPACK_IMPORTED_MODULE_4__.constantCatch(catchValue)),
    });
}

const ZodNaN = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodNaN", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodNaN */ .zP.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .nanProcessor */ .Kj(inst, ctx, json, params);
});
function nan(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._nan */ .L4(ZodNaN, params);
}
const ZodPipe = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodPipe", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodPipe */ ._m.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .pipeProcessor */ .fs(inst, ctx, json, params);
    inst.in = def.in;
    inst.out = def.out;
});
function pipe(in_, out) {
    return new ZodPipe({
        type: "pipe",
        in: in_,
        out: out,
        // ...util.normalizeParams(params),
    });
}
const ZodCodec = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodCodec", (inst, def) => {
    ZodPipe.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodCodec */ .YY.init(inst, def);
});
function codec(in_, out, params) {
    return new ZodCodec({
        type: "pipe",
        in: in_,
        out: out,
        transform: params.decode,
        reverseTransform: params.encode,
    });
}
function invertCodec(codec) {
    const def = codec._zod.def;
    return new ZodCodec({
        type: "pipe",
        in: def.out,
        out: def.in,
        transform: def.reverseTransform,
        reverseTransform: def.transform,
    });
}
const ZodPreprocess = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodPreprocess", (inst, def) => {
    ZodPipe.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodPreprocess */ .KX.init(inst, def);
});
const ZodReadonly = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodReadonly", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodReadonly */ .Sb.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .readonlyProcessor */ .$X(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
});
function readonly(innerType) {
    return new ZodReadonly({
        type: "readonly",
        innerType: innerType,
    });
}
const ZodTemplateLiteral = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodTemplateLiteral", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodTemplateLiteral */ .d.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .templateLiteralProcessor */ .Cv(inst, ctx, json, params);
});
function templateLiteral(parts, params) {
    return new ZodTemplateLiteral({
        type: "template_literal",
        parts,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__.normalizeParams(params),
    });
}
const ZodLazy = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodLazy", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodLazy */ .kU.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .lazyProcessor */ .Tr(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.getter();
});
function lazy(getter) {
    return new ZodLazy({
        type: "lazy",
        getter: getter,
    });
}
const ZodPromise = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodPromise", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodPromise */ .hA.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .promiseProcessor */ .CX(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
});
function promise(innerType) {
    return new ZodPromise({
        type: "promise",
        innerType: innerType,
    });
}
const ZodFunction = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodFunction", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodFunction */ ._A.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .functionProcessor */ .bq(inst, ctx, json, params);
});
function _function(params) {
    return new ZodFunction({
        type: "function",
        input: Array.isArray(params?.input) ? tuple(params?.input) : (params?.input ?? array(unknown())),
        output: params?.output ?? unknown(),
    });
}

const ZodCustom = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__/* .$constructor */ .xI("ZodCustom", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__/* .$ZodCustom */ .b0.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => _core_json_schema_processors_js__WEBPACK_IMPORTED_MODULE_8__/* .customProcessor */ .A6(inst, ctx, json, params);
});
// custom checks
function check(fn) {
    const ch = new _core_index_js__WEBPACK_IMPORTED_MODULE_3__/* .$ZodCheck */ .QP({
        check: "custom",
        // ...util.normalizeParams(params),
    });
    ch._zod.check = fn;
    return ch;
}
function custom(fn, _params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._custom */ .FO(ZodCustom, fn ?? (() => true), _params);
}
function refine(fn, _params = {}) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._refine */ .fU(ZodCustom, fn, _params);
}
// superRefine
function superRefine(fn, params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._superRefine */ .MB(fn, params);
}
// Re-export describe and meta from core
const describe = _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* .describe */ .q0;
const meta = _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* .meta */ .mI;
function _instanceof(cls, params = {}) {
    const inst = new ZodCustom({
        type: "custom",
        check: "custom",
        fn: (data) => data instanceof cls,
        abort: true,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_4__.normalizeParams(params),
    });
    inst._zod.bag.Class = cls;
    // Override check to emit invalid_type instead of custom
    inst._zod.check = (payload) => {
        if (!(payload.value instanceof cls)) {
            payload.issues.push({
                code: "invalid_type",
                expected: cls.name,
                input: payload.value,
                inst,
                path: [...(inst._zod.def.path ?? [])],
            });
        }
    };
    return inst;
}

// stringbool
const stringbool = (...args) => _core_index_js__WEBPACK_IMPORTED_MODULE_7__/* ._stringbool */ .fI({
    Codec: ZodCodec,
    Boolean: ZodBoolean,
    String: ZodString,
}, ...args);
function json(params) {
    const jsonSchema = lazy(() => {
        return union([string(params), number(), boolean(), _null(), array(jsonSchema), record(string(), jsonSchema)]);
    });
    return jsonSchema;
}
// preprocess
function preprocess(fn, schema) {
    return new ZodPreprocess({
        type: "pipe",
        in: transform(fn),
        out: schema,
    });
}


/***/ },

/***/ 3753
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $X: () => (/* binding */ readonlyProcessor),
/* harmony export */   $k: () => (/* binding */ optionalProcessor),
/* harmony export */   A: () => (/* binding */ prefaultProcessor),
/* harmony export */   A6: () => (/* binding */ customProcessor),
/* harmony export */   BU: () => (/* binding */ undefinedProcessor),
/* harmony export */   C0: () => (/* binding */ enumProcessor),
/* harmony export */   CN: () => (/* binding */ tupleProcessor),
/* harmony export */   CX: () => (/* binding */ promiseProcessor),
/* harmony export */   Cv: () => (/* binding */ templateLiteralProcessor),
/* harmony export */   Df: () => (/* binding */ allProcessors),
/* harmony export */   Ec: () => (/* binding */ objectProcessor),
/* harmony export */   Fl: () => (/* binding */ dateProcessor),
/* harmony export */   GC: () => (/* binding */ recordProcessor),
/* harmony export */   H1: () => (/* binding */ fileProcessor),
/* harmony export */   In: () => (/* binding */ nullProcessor),
/* harmony export */   Kj: () => (/* binding */ nanProcessor),
/* harmony export */   NV: () => (/* binding */ unknownProcessor),
/* harmony export */   NX: () => (/* binding */ anyProcessor),
/* harmony export */   Q9: () => (/* binding */ catchProcessor),
/* harmony export */   RH: () => (/* binding */ neverProcessor),
/* harmony export */   SW: () => (/* binding */ stringProcessor),
/* harmony export */   Tr: () => (/* binding */ lazyProcessor),
/* harmony export */   Wg: () => (/* binding */ numberProcessor),
/* harmony export */   Y8: () => (/* binding */ bigintProcessor),
/* harmony export */   Yv: () => (/* binding */ literalProcessor),
/* harmony export */   aw: () => (/* binding */ successProcessor),
/* harmony export */   bl: () => (/* binding */ toJSONSchema),
/* harmony export */   bq: () => (/* binding */ functionProcessor),
/* harmony export */   cR: () => (/* binding */ nonoptionalProcessor),
/* harmony export */   cY: () => (/* binding */ arrayProcessor),
/* harmony export */   dO: () => (/* binding */ booleanProcessor),
/* harmony export */   fg: () => (/* binding */ symbolProcessor),
/* harmony export */   fs: () => (/* binding */ pipeProcessor),
/* harmony export */   iC: () => (/* binding */ unionProcessor),
/* harmony export */   i_: () => (/* binding */ intersectionProcessor),
/* harmony export */   jq: () => (/* binding */ mapProcessor),
/* harmony export */   mh: () => (/* binding */ defaultProcessor),
/* harmony export */   vn: () => (/* binding */ voidProcessor),
/* harmony export */   xi: () => (/* binding */ transformProcessor),
/* harmony export */   yq: () => (/* binding */ nullableProcessor),
/* harmony export */   zH: () => (/* binding */ setProcessor)
/* harmony export */ });
/* harmony import */ var _regexes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8342);
/* harmony import */ var _to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9147);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6205);



const formatMap = {
    guid: "uuid",
    url: "uri",
    datetime: "date-time",
    json_string: "json-string",
    regex: "", // do not set
};
// ==================== SIMPLE TYPE PROCESSORS ====================
const stringProcessor = (schema, ctx, _json, _params) => {
    const json = _json;
    json.type = "string";
    const { minimum, maximum, format, patterns, contentEncoding, laxFormat } = schema._zod
        .bag;
    if (typeof minimum === "number")
        json.minLength = minimum;
    if (typeof maximum === "number")
        json.maxLength = maximum;
    // custom pattern overrides format
    if (format) {
        json.format = formatMap[format] ?? format;
        if (json.format === "")
            delete json.format; // empty format is not valid
        // `z.iso.time()` is never full-time, and `laxFormat` carries the datetime shapes that also accept what their keyword forbids
        if (format === "time" || laxFormat) {
            delete json.format;
        }
    }
    if (contentEncoding)
        json.contentEncoding = contentEncoding;
    if (patterns && patterns.size > 0) {
        const patternList = [...patterns];
        if (patternList.length === 1)
            json.pattern = patternList[0].source;
        else if (patternList.length > 1) {
            json.allOf = [
                ...patternList.map((regex) => ({
                    ...(ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0"
                        ? { type: "string" }
                        : {}),
                    pattern: regex.source,
                })),
            ];
        }
    }
};
const numberProcessor = (schema, ctx, _json, params) => {
    const json = _json;
    const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
    if (typeof format === "string" && format.includes("int"))
        json.type = "integer";
    else
        json.type = "number";
    // when both minimum and exclusiveMinimum exist, pick the more restrictive one
    const exMin = typeof exclusiveMinimum === "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY);
    const exMax = typeof exclusiveMaximum === "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY);
    const legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
    if (exMin) {
        if (legacy) {
            json.minimum = exclusiveMinimum;
            json.exclusiveMinimum = true;
        }
        else {
            json.exclusiveMinimum = exclusiveMinimum;
        }
    }
    else if (typeof minimum === "number") {
        json.minimum = minimum;
    }
    if (exMax) {
        if (legacy) {
            json.maximum = exclusiveMaximum;
            json.exclusiveMaximum = true;
        }
        else {
            json.exclusiveMaximum = exclusiveMaximum;
        }
    }
    else if (typeof maximum === "number") {
        json.maximum = maximum;
    }
    if (typeof multipleOf === "number") {
        // JSON Schema requires a divisor strictly greater than zero, and a non-finite one does not survive JSON at all. A negative divisor accepts exactly what its absolute value accepts, so it still maps; zero, NaN and Infinity have no keyword form.
        if (Number.isFinite(multipleOf) && multipleOf !== 0)
            json.multipleOf = Math.abs(multipleOf);
        else
            (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, `A multipleOf divisor of ${multipleOf} cannot be represented in JSON Schema`);
    }
};
const booleanProcessor = (_schema, _ctx, json, _params) => {
    json.type = "boolean";
};
const bigintProcessor = (schema, ctx, json, params) => {
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "BigInt cannot be represented in JSON Schema");
};
const symbolProcessor = (schema, ctx, json, params) => {
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "Symbols cannot be represented in JSON Schema");
};
const nullProcessor = (_schema, ctx, json, _params) => {
    if (ctx.target === "openapi-3.0") {
        json.type = "string";
        json.nullable = true;
        json.enum = [null];
    }
    else {
        json.type = "null";
    }
};
const undefinedProcessor = (schema, ctx, json, params) => {
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "Undefined cannot be represented in JSON Schema");
};
const voidProcessor = (schema, ctx, json, params) => {
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "Void cannot be represented in JSON Schema");
};
const neverProcessor = (_schema, _ctx, json, _params) => {
    json.not = {};
};
const anyProcessor = (_schema, _ctx, _json, _params) => {
    // empty schema accepts anything
};
const unknownProcessor = (_schema, _ctx, _json, _params) => {
    // empty schema accepts anything
};
const dateProcessor = (schema, ctx, json, params) => {
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "Date cannot be represented in JSON Schema");
};
const enumProcessor = (schema, _ctx, json, _params) => {
    const def = schema._zod.def;
    const values = (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.getEnumValues)(def.entries);
    // an empty enum accepts nothing, same as z.never()
    if (values.length === 0) {
        json.not = {};
        return;
    }
    // Number enums can have both string and number values
    if (values.every((v) => typeof v === "number"))
        json.type = "number";
    if (values.every((v) => typeof v === "string"))
        json.type = "string";
    json.enum = values;
};
const literalProcessor = (schema, ctx, json, params) => {
    const def = schema._zod.def;
    // a literal with no values accepts nothing, same as z.never()
    if (def.values.length === 0) {
        json.not = {};
        return;
    }
    const vals = [];
    for (const val of def.values) {
        if (val === undefined) {
            // a custom schema replaces the whole literal, so there is nothing left to accumulate
            if ((0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "Literal `undefined` cannot be represented in JSON Schema"))
                return;
            // otherwise do not add to vals
        }
        else if (typeof val === "bigint") {
            if ((0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "BigInt literals cannot be represented in JSON Schema"))
                return;
            vals.push(Number(val));
        }
        else {
            vals.push(val);
        }
    }
    if (vals.length === 0) {
        // do nothing (an undefined literal was stripped)
    }
    else if (vals.length === 1) {
        const val = vals[0];
        json.type = val === null ? "null" : typeof val;
        if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
            json.enum = [val];
        }
        else {
            json.const = val;
        }
    }
    else {
        if (vals.every((v) => typeof v === "number"))
            json.type = "number";
        if (vals.every((v) => typeof v === "string"))
            json.type = "string";
        if (vals.every((v) => typeof v === "boolean"))
            json.type = "boolean";
        if (vals.every((v) => v === null))
            json.type = "null";
        json.enum = vals;
    }
};
const nanProcessor = (schema, ctx, json, params) => {
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "NaN cannot be represented in JSON Schema");
};
const templateLiteralProcessor = (schema, _ctx, json, _params) => {
    const _json = json;
    const pattern = schema._zod.pattern;
    if (!pattern)
        throw new Error("Pattern not found in template literal");
    _json.type = "string";
    _json.pattern = pattern.source;
};
const fileProcessor = (schema, _ctx, json, _params) => {
    const _json = json;
    const file = {
        type: "string",
        format: "binary",
        contentEncoding: "binary",
    };
    const { minimum, maximum, mime } = schema._zod.bag;
    if (minimum !== undefined)
        file.minLength = minimum;
    if (maximum !== undefined)
        file.maxLength = maximum;
    if (mime) {
        if (mime.length === 1) {
            file.contentMediaType = mime[0];
            Object.assign(_json, file);
        }
        else {
            Object.assign(_json, file); // shared props at root
            _json.anyOf = mime.map((m) => ({ contentMediaType: m })); // only contentMediaType differs
        }
    }
    else {
        Object.assign(_json, file);
    }
};
const successProcessor = (_schema, _ctx, json, _params) => {
    json.type = "boolean";
};
const customProcessor = (schema, ctx, json, params) => {
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "Custom types cannot be represented in JSON Schema");
};
const functionProcessor = (schema, ctx, json, params) => {
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "Function types cannot be represented in JSON Schema");
};
const transformProcessor = (schema, ctx, json, params) => {
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "Transforms cannot be represented in JSON Schema");
};
const mapProcessor = (schema, ctx, json, params) => {
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "Map cannot be represented in JSON Schema");
};
const setProcessor = (schema, ctx, json, params) => {
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "Set cannot be represented in JSON Schema");
};
// ==================== COMPOSITE TYPE PROCESSORS ====================
const arrayProcessor = (schema, ctx, _json, params) => {
    const json = _json;
    const def = schema._zod.def;
    const { minimum, maximum } = schema._zod.bag;
    if (typeof minimum === "number")
        json.minItems = minimum;
    if (typeof maximum === "number")
        json.maxItems = maximum;
    json.type = "array";
    json.items = (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .process */ .eh)(def.element, ctx, {
        ...params,
        path: [...params.path, "items"],
    });
};
// Transform and catch set `optin = "optional"` at runtime so the parser lets them observe an
// absent key, but their declared input type stays required. An input JSON Schema describes the
// declared type, so resolve past them to the schema that actually carries the optionality.
// Used by both `objectProcessor` (for `required`) and `tupleProcessor` (for `minItems`); see
// wiki/optionality.md, "The JSON Schema emitter reads the *static* value".
function inputOptin(schema) {
    const def = schema._zod.def;
    if (def.type === "pipe" && def.in._zod.traits.has("$ZodTransform")) {
        return inputOptin(def.out);
    }
    if (def.type === "catch") {
        return inputOptin(def.innerType);
    }
    return schema._zod.optin;
}
const objectProcessor = (schema, ctx, _json, params) => {
    const json = _json;
    const def = schema._zod.def;
    const shape = def.shape;
    // dropping it while still emitting `additionalProperties: false` would emit a schema that rejects data this one requires
    const symbolKeys = Object.getOwnPropertySymbols(shape);
    if (symbolKeys.length &&
        (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "Symbol keys cannot be represented in JSON Schema")) {
        return;
    }
    json.type = "object";
    json.properties = {};
    for (const key in shape) {
        // assignProp so a __proto__ key becomes an own property instead of hitting the inherited setter on the plain {} we build into
        (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.assignProp)(json.properties, key, (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .process */ .eh)(shape[key], ctx, {
            ...params,
            path: [...params.path, "properties", key],
        }));
    }
    // required keys
    const allKeys = new Set(Object.keys(shape));
    const requiredKeys = new Set([...allKeys].filter((key) => {
        const field = def.shape[key];
        if (ctx.io === "input") {
            return inputOptin(field) === undefined;
        }
        else {
            return field._zod.optout === undefined;
        }
    }));
    if (requiredKeys.size > 0) {
        json.required = Array.from(requiredKeys);
    }
    // catchall
    if (def.catchall?._zod.def.type === "never") {
        // strict
        json.additionalProperties = false;
    }
    else if (!def.catchall) {
        // regular
        if (ctx.io === "output")
            json.additionalProperties = false;
    }
    else if (def.catchall) {
        json.additionalProperties = (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .process */ .eh)(def.catchall, ctx, {
            ...params,
            path: [...params.path, "additionalProperties"],
        });
    }
};
const unionProcessor = (schema, ctx, json, params) => {
    const def = schema._zod.def;
    // Exclusive unions (inclusive === false) use oneOf (exactly one match) instead of anyOf (one or more matches). This includes both z.xor() and discriminated unions
    const isExclusive = def.inclusive === false;
    const options = def.options.map((x, i) => (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .process */ .eh)(x, ctx, {
        ...params,
        path: [...params.path, isExclusive ? "oneOf" : "anyOf", i],
    }));
    if (isExclusive) {
        json.oneOf = options;
    }
    else {
        json.anyOf = options;
    }
};
const intersectionProcessor = (schema, ctx, json, params) => {
    const def = schema._zod.def;
    const a = (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .process */ .eh)(def.left, ctx, {
        ...params,
        path: [...params.path, "allOf", 0],
    });
    const b = (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .process */ .eh)(def.right, ctx, {
        ...params,
        path: [...params.path, "allOf", 1],
    });
    const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
    const allOf = [
        ...(isSimpleIntersection(a) ? a.allOf : [a]),
        ...(isSimpleIntersection(b) ? b.allOf : [b]),
    ];
    json.allOf = allOf;
    // Recorded innermost first, so a nested intersection has already folded by the time this one is considered. The array is the handle rather than the schema, because a wrapper that inherits this schema shares the same array; `finalize` folds every object holding it. See `foldIntersection`.
    ctx.intersections.push(allOf);
};
const tupleProcessor = (schema, ctx, _json, params) => {
    const json = _json;
    const def = schema._zod.def;
    json.type = "array";
    const prefixPath = ctx.target === "draft-2020-12" ? "prefixItems" : "items";
    const restPath = ctx.target === "draft-2020-12" ? "items" : ctx.target === "openapi-3.0" ? "items" : "additionalItems";
    const prefixItems = def.items.map((x, i) => (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .process */ .eh)(x, ctx, {
        ...params,
        path: [...params.path, prefixPath, i],
    }));
    const rest = def.rest
        ? (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .process */ .eh)(def.rest, ctx, {
            ...params,
            path: [...params.path, restPath, ...(ctx.target === "openapi-3.0" ? [def.items.length] : [])],
        })
        : null;
    let minItems = def.items.length;
    while (minItems > 0) {
        const item = def.items[minItems - 1];
        const optional = ctx.io === "input" ? inputOptin(item) !== undefined : item._zod.optout === "optional";
        if (!optional)
            break;
        minItems--;
    }
    const maxItems = def.items.length;
    const isClosed = !def.rest;
    if (ctx.target === "draft-2020-12") {
        json.prefixItems = prefixItems;
        if (isClosed) {
            json.items = false;
        }
        else if (rest) {
            json.items = rest;
        }
        if (minItems > 0)
            json.minItems = minItems;
        if (isClosed)
            json.maxItems = maxItems;
    }
    else if (ctx.target === "openapi-3.0") {
        json.items = {
            anyOf: prefixItems,
        };
        if (rest) {
            json.items.anyOf.push(rest);
        }
        if (minItems > 0)
            json.minItems = minItems;
        if (isClosed)
            json.maxItems = maxItems;
    }
    else {
        json.items = prefixItems;
        if (isClosed) {
            json.additionalItems = false;
        }
        else if (rest) {
            json.additionalItems = rest;
        }
        if (minItems > 0)
            json.minItems = minItems;
        if (isClosed)
            json.maxItems = maxItems;
    }
    // explicit user-defined length checks take precedence
    const { minimum, maximum } = schema._zod.bag;
    if (typeof minimum === "number")
        json.minItems = minimum;
    if (typeof maximum === "number")
        json.maxItems = maximum;
};
/** JSON object keys are always strings, so a numeric record key schema is re-expressed over the
 * numeric-string form the record parser matches. Deferred to `finalize`, after the flatten: a key
 * behind a wrapper only carries its own `type` before then, and a union key only has its branches.
 *
 * A numeric bound cannot apply to a property name, so `minimum` and its siblings are dropped rather
 * than carried over: keeping them beside `type: "string"` reproduces the match-nothing schema this
 * exists to fix. A key that carries one therefore emits wider than the record parses — `z.record(z.number().min(5), V)`
 * accepts `"3"` — which is the deliberate trade, since throwing on it would reject an ordinary schema
 * outright. */
function stringifyKeyNames(bySchema, json, visited) {
    // an extracted key that rewrites cannot go on sharing its definition — the string form a key position needs is not the number form every other reference wants — so it inlines. One that does not rewrite keeps the `$ref`.
    if (json.$ref) {
        // a recursive key holds its own reference inside its definition, so a node already on the path is left alone rather than resolved again
        if (visited.has(json))
            return json;
        visited.add(json);
        const def = bySchema.get(json)?.def;
        if (!def)
            return json;
        const inlined = stringifyKeyNames(bySchema, def, visited);
        return inlined === def ? json : inlined;
    }
    for (const keyword of ["anyOf", "oneOf"]) {
        const branches = json[keyword];
        if (!Array.isArray(branches))
            continue;
        const mapped = branches.map((branch) => stringifyKeyNames(bySchema, branch, visited));
        // rebuilding regardless would detach a key that had nothing to re-express, dropping its `$ref` and leaking the internal `id`
        if (mapped.some((branch, i) => branch !== branches[i]))
            json = { ...json, [keyword]: mapped };
    }
    // a member that already admits a string leaves the key unconstrained, so the node's own type re-expresses only when every member is numeric
    const types = Array.isArray(json.type) ? json.type : [json.type];
    const numericType = !types.includes("string") && types.some((t) => t === "number" || t === "integer");
    // a heterogeneous key carries no type at all, so its numeric members are caught here instead
    const values = json.enum ?? (json.const !== undefined ? [json.const] : undefined);
    if (!numericType && !values?.some((v) => typeof v === "number"))
        return json;
    const { minimum, maximum, exclusiveMinimum, exclusiveMaximum, multipleOf, format, id, ...rest } = json;
    if (rest.enum)
        rest.enum = rest.enum.map((v) => (typeof v === "number" ? String(v) : v));
    else if (typeof rest.const === "number")
        rest.const = String(rest.const);
    // a heterogeneous key keeps its absent type: the stringified members already say what a key may be
    if (!numericType)
        return rest;
    rest.type = "string";
    if (!values)
        rest.pattern = (types.includes("number") ? _regexes_js__WEBPACK_IMPORTED_MODULE_0__.number : _regexes_js__WEBPACK_IMPORTED_MODULE_0__.integer).source;
    return rest;
}
/** Every record of one conversion, so the carriers are found in a single pass rather than once per record. */
const pendingRecords = new WeakMap();
function rewriteKeyNames(ctx) {
    // an extracted key is resolved by the object `extractToDef` left in its place, so the map is built once rather than searched per reference. `_zod.toJSONSchema` can hand the same object to two schemas, so the first entry carrying a body wins, as a search would have found it.
    const bySchema = new Map();
    for (const entry of ctx.seen.values()) {
        if (entry.def && !bySchema.has(entry.schema))
            bySchema.set(entry.schema, entry);
    }
    const rewrites = new Map();
    for (const record of pendingRecords.get(ctx) ?? []) {
        const seen = ctx.seen.get(record);
        const names = (seen?.def ?? seen?.schema)?.propertyNames;
        if (!names || names === true || rewrites.has(names))
            continue;
        const rewritten = stringifyKeyNames(bySchema, names, new Set());
        if (rewritten !== names)
            rewrites.set(names, rewritten);
    }
    if (!rewrites.size)
        return;
    // the flatten has already copied each record's own properties onto every wrapper by reference, and an extracted body is another such copy, so every carrier holding a rewritten key is updated together
    for (const entry of ctx.seen.values()) {
        for (const carrier of [entry.schema, entry.def]) {
            const rewritten = carrier && rewrites.get(carrier.propertyNames);
            if (rewritten)
                carrier.propertyNames = rewritten;
        }
    }
}
const recordProcessor = (schema, ctx, _json, params) => {
    const json = _json;
    const def = schema._zod.def;
    json.type = "object";
    // For looseRecord with regex patterns, use patternProperties. This correctly represents "only validate keys matching the pattern" semantics and composes well with allOf (intersections)
    const keyType = def.keyType;
    const keyBag = keyType._zod.bag;
    const patterns = keyBag?.patterns;
    if (def.mode === "loose" && patterns && patterns.size > 0) {
        // Use patternProperties for looseRecord with regex patterns
        const valueSchema = (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .process */ .eh)(def.valueType, ctx, {
            ...params,
            path: [...params.path, "patternProperties", "*"],
        });
        json.patternProperties = {};
        for (const pattern of patterns) {
            (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.assignProp)(json.patternProperties, pattern.source, valueSchema);
        }
    }
    else {
        // Default behavior: use propertyNames + additionalProperties
        if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") {
            json.propertyNames = (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .process */ .eh)(def.keyType, ctx, {
                ...params,
                path: [...params.path, "propertyNames"],
            });
            let pending = pendingRecords.get(ctx);
            if (!pending) {
                pending = [];
                pendingRecords.set(ctx, pending);
                ctx.deferred.push(() => rewriteKeyNames(ctx));
            }
            pending.push(schema);
        }
        json.additionalProperties = (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .process */ .eh)(def.valueType, ctx, {
            ...params,
            path: [...params.path, "additionalProperties"],
        });
    }
    // Add required for keys with discrete values (enum, literal, etc.)
    const keyValues = keyType._zod.values;
    // Every key shares one value schema, so an optional-in value makes the whole key set omittable on input. Output keeps them: the exhaustive branch assigns every key, even one whose value came back undefined.
    const omittableOnInput = ctx.io === "input" && inputOptin(def.valueType) !== undefined;
    if (keyValues && !def.partial && !omittableOnInput) {
        const validKeyValues = [...keyValues].filter((v) => typeof v === "string" || typeof v === "number");
        if (validKeyValues.length > 0) {
            json.required = validKeyValues.map(String);
        }
    }
};
const nullableProcessor = (schema, ctx, json, params) => {
    const def = schema._zod.def;
    const inner = (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .process */ .eh)(def.innerType, ctx, params);
    const seen = ctx.seen.get(schema);
    if (ctx.target === "openapi-3.0") {
        seen.ref = def.innerType;
        json.nullable = true;
    }
    else {
        json.anyOf = [inner, { type: "null" }];
    }
};
const nonoptionalProcessor = (schema, ctx, _json, params) => {
    const def = schema._zod.def;
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .process */ .eh)(def.innerType, ctx, params);
    const seen = ctx.seen.get(schema);
    seen.ref = def.innerType;
};
/** Round-trips a default value through JSON so the emitted schema is guaranteed to be valid JSON.
 * A BigInt has no reliable encoding, so it goes through `unrepresentable` like any other
 * unrepresentable value. Returns a sentinel when the caller must not write a default of its own. */
const UNREPRESENTABLE_DEFAULT = Symbol();
function serializeDefaultValue(value, schema, ctx, json, params) {
    let unrepresentable = false;
    const serialized = JSON.stringify(value, (_, val) => {
        if (typeof val !== "bigint")
            return val;
        unrepresentable = true;
        return null;
    });
    if (!unrepresentable)
        return JSON.parse(serialized);
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "BigInt defaults cannot be represented in JSON Schema");
    return UNREPRESENTABLE_DEFAULT;
}
const defaultProcessor = (schema, ctx, json, params) => {
    const def = schema._zod.def;
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .process */ .eh)(def.innerType, ctx, params);
    const seen = ctx.seen.get(schema);
    seen.ref = def.innerType;
    const value = serializeDefaultValue(def.defaultValue, schema, ctx, json, params);
    if (value !== UNREPRESENTABLE_DEFAULT)
        json.default = value;
};
const prefaultProcessor = (schema, ctx, json, params) => {
    const def = schema._zod.def;
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .process */ .eh)(def.innerType, ctx, params);
    const seen = ctx.seen.get(schema);
    seen.ref = def.innerType;
    if (ctx.io !== "input")
        return;
    const value = serializeDefaultValue(def.defaultValue, schema, ctx, json, params);
    if (value !== UNREPRESENTABLE_DEFAULT)
        json._prefault = value;
};
const catchProcessor = (schema, ctx, json, params) => {
    const def = schema._zod.def;
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .process */ .eh)(def.innerType, ctx, params);
    const seen = ctx.seen.get(schema);
    seen.ref = def.innerType;
    let catchValue;
    try {
        catchValue = def.catchValue(undefined);
    }
    catch {
        (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .handleUnrepresentable */ ._S)(schema, ctx, json, params, "Dynamic catch values are not supported in JSON Schema");
        return;
    }
    json.default = catchValue;
};
const pipeProcessor = (schema, ctx, _json, params) => {
    const def = schema._zod.def;
    const inIsTransform = def.in._zod.traits.has("$ZodTransform");
    const innerType = ctx.io === "input" ? (inIsTransform ? def.out : def.in) : def.out;
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .process */ .eh)(innerType, ctx, params);
    const seen = ctx.seen.get(schema);
    seen.ref = innerType;
};
const readonlyProcessor = (schema, ctx, json, params) => {
    const def = schema._zod.def;
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .process */ .eh)(def.innerType, ctx, params);
    const seen = ctx.seen.get(schema);
    seen.ref = def.innerType;
    json.readOnly = true;
};
const promiseProcessor = (schema, ctx, _json, params) => {
    const def = schema._zod.def;
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .process */ .eh)(def.innerType, ctx, params);
    const seen = ctx.seen.get(schema);
    seen.ref = def.innerType;
};
const optionalProcessor = (schema, ctx, _json, params) => {
    const def = schema._zod.def;
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .process */ .eh)(def.innerType, ctx, params);
    const seen = ctx.seen.get(schema);
    seen.ref = def.innerType;
};
const lazyProcessor = (schema, ctx, _json, params) => {
    const innerType = schema._zod.innerType;
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .process */ .eh)(innerType, ctx, params);
    const seen = ctx.seen.get(schema);
    seen.ref = innerType;
};
// ==================== ALL PROCESSORS ====================
const allProcessors = {
    string: stringProcessor,
    number: numberProcessor,
    boolean: booleanProcessor,
    bigint: bigintProcessor,
    symbol: symbolProcessor,
    null: nullProcessor,
    undefined: undefinedProcessor,
    void: voidProcessor,
    never: neverProcessor,
    any: anyProcessor,
    unknown: unknownProcessor,
    date: dateProcessor,
    enum: enumProcessor,
    literal: literalProcessor,
    nan: nanProcessor,
    template_literal: templateLiteralProcessor,
    file: fileProcessor,
    success: successProcessor,
    custom: customProcessor,
    function: functionProcessor,
    transform: transformProcessor,
    map: mapProcessor,
    set: setProcessor,
    array: arrayProcessor,
    object: objectProcessor,
    union: unionProcessor,
    intersection: intersectionProcessor,
    tuple: tupleProcessor,
    record: recordProcessor,
    nullable: nullableProcessor,
    nonoptional: nonoptionalProcessor,
    default: defaultProcessor,
    prefault: prefaultProcessor,
    catch: catchProcessor,
    pipe: pipeProcessor,
    readonly: readonlyProcessor,
    promise: promiseProcessor,
    optional: optionalProcessor,
    lazy: lazyProcessor,
};
function toJSONSchema(input, params) {
    if ("_idmap" in input) {
        // Registry case
        const registry = input;
        const ctx = (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .initializeContext */ .az)({ ...params, processors: allProcessors });
        const defs = {};
        // First pass: process all schemas to build the seen map
        for (const entry of registry._idmap.entries()) {
            const [_, schema] = entry;
            (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .process */ .eh)(schema, ctx);
        }
        const schemas = {};
        const external = {
            registry,
            uri: params?.uri,
            defs,
        };
        // Update the context with external configuration
        ctx.external = external;
        // Second pass: emit each schema
        for (const entry of registry._idmap.entries()) {
            const [key, schema] = entry;
            (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .extractDefs */ .Wb)(ctx, schema);
            (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.assignProp)(schemas, key, (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .finalize */ .jE)(ctx, schema));
        }
        if (Object.keys(defs).length > 0) {
            const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
            schemas.__shared = {
                [defsSegment]: defs,
            };
        }
        return { schemas };
    }
    // Single schema case
    const ctx = (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .initializeContext */ .az)({ ...params, processors: allProcessors });
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .process */ .eh)(input, ctx);
    (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .extractDefs */ .Wb)(ctx, input);
    return (0,_to_json_schema_js__WEBPACK_IMPORTED_MODULE_1__/* .finalize */ .jE)(ctx, input);
}


/***/ },

/***/ 8283
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H0: () => (/* binding */ $ZodCyclicError),
/* harmony export */   Kw: () => (/* binding */ isRecursiveSchema),
/* harmony export */   TE: () => (/* binding */ isBackEdge),
/* harmony export */   x3: () => (/* binding */ memoizer)
/* harmony export */ });
class $ZodCyclicError extends Error {
    constructor() {
        super(`Cannot parse a reference cycle that closes through a transform`);
        this.name = "ZodCyclicError";
    }
}
/** Keyed off the context object every schema in one parse call already shares. */
const STATE = "~memo";
const NO_ISSUES = [];
// Receivers prefix paths in place, so the cache and every hand-out need their own copies.
function cloneIssues(issues) {
    return issues.map((iss) => (iss.path ? { ...iss, path: iss.path.slice() } : { ...iss }));
}
const recursive = /*@__PURE__*/ new WeakMap();
/** Whether this schema's subtree contains a cycle, so one parse can re-enter it. */
function isRecursive(inst, stack) {
    const cached = recursive.get(inst);
    if (cached !== undefined)
        return cached;
    // Relative to the walk in progress, so not cached.
    if (stack.has(inst))
        return true;
    stack.add(inst);
    let result = false;
    const check = (child) => {
        if (!result && child?._zod && isRecursive(child, stack))
            result = true;
    };
    const def = inst._zod.def;
    const kind = def.type;
    switch (kind) {
        case "object": {
            // `Reflect.ownKeys` rather than `Object.keys`, so a cycle through a declared symbol key is still seen
            for (const key of Reflect.ownKeys(def.shape))
                check(def.shape[key]);
            check(def.catchall);
            break;
        }
        case "array":
            check(def.element);
            break;
        case "tuple":
            for (const el of def.items)
                check(el);
            check(def.rest);
            break;
        case "record":
        case "map":
            check(def.keyType);
            check(def.valueType);
            break;
        case "set":
            check(def.valueType);
            break;
        case "union":
            for (const el of def.options)
                check(el);
            break;
        case "intersection":
            check(def.left);
            check(def.right);
            break;
        case "optional":
        case "nullable":
        case "default":
        case "prefault":
        case "catch":
        case "readonly":
        case "nonoptional":
        case "promise":
        case "success":
            check(def.innerType);
            break;
        case "pipe":
            check(def.in);
            check(def.out);
            break;
        case "function":
            check(def.input);
            check(def.output);
            break;
        // reading `_zod.innerType` resolves the getter once and caches it
        case "lazy":
            check(inst._zod.innerType);
            break;
        // a leaf by choice: `parts` are regex fragments, not data positions
        case "template_literal":
        // leaves
        case "string":
        case "number":
        case "int":
        case "boolean":
        case "bigint":
        case "symbol":
        case "undefined":
        case "null":
        case "void":
        case "never":
        case "any":
        case "unknown":
        case "date":
        case "nan":
        case "enum":
        case "literal":
        case "file":
        case "transform":
        case "custom":
            break;
        default: {
            // a new built-in kind becomes a compile error here
            kind;
            // a user-defined kind can still hold children, and only its author knows where, so fall back to scanning the def — skipping accessors, since reading one can run user code
            for (const key in def) {
                const desc = Object.getOwnPropertyDescriptor(def, key);
                if (!desc || desc.get)
                    continue;
                const value = desc.value;
                if (!value || typeof value !== "object")
                    continue;
                if (value._zod)
                    check(value);
                else if (Array.isArray(value))
                    for (const el of value)
                        check(el);
            }
        }
    }
    stack.delete(inst);
    recursive.set(inst, result);
    return result;
}
/**
 * Whether one parse can re-enter this schema, i.e. its subtree contains a cycle.
 * Exported for `z.compile`, which refuses to compile such a schema: cycle
 * breaking is driven from here off state keyed on the parse context, and a
 * generated fast path has no context to key on.
 */
function isRecursiveSchema(inst) {
    return isRecursive(inst, new Set());
}
function bucketFor(state, inst) {
    let bucket = state.buckets.get(inst);
    if (!bucket) {
        bucket = new Map();
        state.buckets.set(inst, bucket);
    }
    return bucket;
}
// Set immediately before delegating to core and cleared immediately after, so `alloc` registers only for a visit this module is driving.
let handoff;
// Allocated but unfinished entries. `alloc` and the matching pop both happen in the synchronous part of a parse, so they nest even when children are async, and one stack serves every schema.
const open = [];
const memo = {
    alloc(_inst, payload, empty) {
        const bucket = handoff;
        if (!bucket)
            return empty;
        handoff = undefined;
        const entry = { value: empty, issues: null };
        bucket.set(payload.value, entry);
        open.push(entry);
        return empty;
    },
    guard(inst) {
        var _a;
        (_a = inst._zod).deferred ?? (_a.deferred = []);
        inst._zod.deferred.push(() => {
            const base = inst._zod.parse;
            const wrapped = (payload, ctx) => {
                // The value is a placeholder a back-edge is still waiting on, so the cycle closes through this transform. Its output can't exist in time to bind.
                if (ctx.direction !== "backward" && isBackEdge(ctx, payload.value))
                    throw new $ZodCyclicError();
                return base(payload, ctx);
            };
            inst._zod.parse = wrapped;
            if (inst._zod.run === base)
                inst._zod.run = wrapped;
        });
    },
    attach(inst) {
        var _a;
        let isRecursiveInst;
        // `bucket` memoized for one parse; a recursive schema is re-entered many times and its bucket never changes
        let lastCtx;
        let lastBucket;
        // Wraps `parse` in a deferred so it sees the container's final parse. Core's own deferred copies `parse` into `run` when there are no checks, and it ran first, so `run` is patched to match; with checks, `run` reads `parse` dynamically.
        (_a = inst._zod).deferred ?? (_a.deferred = []);
        inst._zod.deferred.push(() => {
            const base = inst._zod.parse;
            const wrapped = (payload, ctx) => {
                if (isRecursiveInst === undefined) {
                    isRecursiveInst = isRecursive(inst, new Set());
                    if (!isRecursiveInst) {
                        // Nothing here can ever fire, so take it back out.
                        inst._zod.parse = base;
                        if (inst._zod.run === wrapped)
                            inst._zod.run = base;
                        return base(payload, ctx);
                    }
                }
                const input = payload.value;
                if (input === null || typeof input !== "object")
                    return base(payload, ctx);
                let state = ctx[STATE];
                if (!state) {
                    state = { buckets: new Map(), backEdges: undefined };
                    ctx[STATE] = state;
                }
                let bucket;
                if (lastCtx === ctx) {
                    bucket = lastBucket;
                }
                else {
                    bucket = bucketFor(state, inst);
                    lastCtx = ctx;
                    lastBucket = bucket;
                }
                const hit = bucket.get(input);
                if (hit) {
                    payload.value = hit.value;
                    if (hit.issues) {
                        if (hit.issues.length)
                            payload.issues.push(...cloneIssues(hit.issues));
                    }
                    else {
                        // Still being parsed: its own checks cover it, so skip them here.
                        payload.memo = true;
                        state.backEdges ?? (state.backEdges = new Set());
                        state.backEdges.add(hit.value);
                    }
                    return payload;
                }
                handoff = bucket;
                const depth = open.length;
                const result = base(payload, ctx);
                handoff = undefined;
                // A container that rejected its input outright allocated nothing.
                const entry = open.length > depth ? open.pop() : undefined;
                // Both paths written out so the sync one allocates no closure. It runs once per node, and capturing here cost more than everything else combined.
                if (result instanceof Promise) {
                    return result.then((r) => {
                        if (entry)
                            entry.issues = r.issues.length ? cloneIssues(r.issues) : NO_ISSUES;
                        return r;
                    });
                }
                if (entry)
                    entry.issues = result.issues.length ? cloneIssues(result.issues) : NO_ISSUES;
                return result;
            };
            inst._zod.parse = wrapped;
            if (inst._zod.run === base)
                inst._zod.run = wrapped;
        });
    },
};
/** The memoizer that gives containers cycle support. `zod` installs it by default; `zod/mini` opts in with `config({ memoizer: memoizer() })`. */
function memoizer() {
    return memo;
}
/** Whether this value is a node a back-edge resolved to before it finished. */
function isBackEdge(ctx, value) {
    const backEdges = ctx[STATE]?.backEdges;
    return backEdges !== undefined && value !== null && typeof value === "object" && backEdges.has(value);
}


/***/ },

/***/ 9147
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OA: () => (/* binding */ createToJSONSchemaMethod),
/* harmony export */   Wb: () => (/* binding */ extractDefs),
/* harmony export */   _S: () => (/* binding */ handleUnrepresentable),
/* harmony export */   az: () => (/* binding */ initializeContext),
/* harmony export */   eh: () => (/* binding */ process),
/* harmony export */   jE: () => (/* binding */ finalize),
/* harmony export */   uE: () => (/* binding */ createStandardJSONSchemaMethod)
/* harmony export */ });
/* harmony import */ var _registries_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8674);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6205);


function assignProps(target, ...sources) {
    for (const source of sources) {
        for (const key of Reflect.ownKeys(source)) {
            if (Object.prototype.propertyIsEnumerable.call(source, key)) {
                (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.assignProp)(target, key, source[key]);
            }
        }
    }
    return target;
}
// function initializeContext<T extends schemas.$ZodType>(inputs: JSONSchemaGeneratorParams<T>): ToJSONSchemaContext<T> {
//   return {
//     processor: inputs.processor,
//     metadataRegistry: inputs.metadata ?? globalRegistry,
//     target: inputs.target ?? "draft-2020-12",
//     unrepresentable: inputs.unrepresentable ?? "throw",
//   };
// }
function initializeContext(params) {
    // Normalize target: convert old non-hyphenated versions to hyphenated versions
    let target = params?.target ?? "draft-2020-12";
    if (target === "draft-4")
        target = "draft-04";
    if (target === "draft-7")
        target = "draft-07";
    return {
        processors: params.processors ?? {},
        metadataRegistry: params?.metadata ?? _registries_js__WEBPACK_IMPORTED_MODULE_0__/* .globalRegistry */ .fd,
        target,
        unrepresentable: params?.unrepresentable ?? "throw",
        override: params?.override ?? (() => { }),
        io: params?.io ?? "output",
        counter: 0,
        seen: new Map(),
        sharedDefsExtractedFor: undefined,
        sharedEmitDoneFor: undefined,
        cycles: params?.cycles ?? "ref",
        reused: params?.reused ?? "inline",
        intersections: [],
        deferred: [],
        external: params?.external ?? undefined,
    };
}
/**
 * Applies the `unrepresentable` setting at a site that has no JSON Schema equivalent. Throws
 * `message` unless the setting (or the handler's return value) says otherwise. Returns `true` if a
 * custom JSON Schema was written into `json`, in which case the caller must not write its own.
 */
function handleUnrepresentable(schema, ctx, json, params, message) {
    const result = typeof ctx.unrepresentable === "function"
        ? ctx.unrepresentable({ zodSchema: schema, path: params.path, message })
        : ctx.unrepresentable;
    if (result === "any")
        return false;
    if (result === undefined || result === "throw")
        throw new Error(message);
    Object.assign(json, result);
    return true;
}
function process(schema, ctx, _params = { path: [], schemaPath: [] }) {
    var _a;
    const def = schema._zod.def;
    // check for schema in seens
    const seen = ctx.seen.get(schema);
    if (seen) {
        seen.count++;
        // check if cycle
        const isCycle = _params.schemaPath.includes(schema);
        if (isCycle) {
            seen.cycle = _params.path;
        }
        return seen.schema;
    }
    // initialize
    const result = { schema: {}, count: 1, cycle: undefined, path: _params.path };
    ctx.seen.set(schema, result);
    ctx.sharedDefsExtractedFor = undefined;
    ctx.sharedEmitDoneFor = undefined;
    // custom method overrides default behavior
    const overrideSchema = schema._zod.toJSONSchema?.();
    if (overrideSchema) {
        result.schema = overrideSchema;
    }
    else {
        const params = {
            ..._params,
            schemaPath: [..._params.schemaPath, schema],
            path: _params.path,
        };
        if (schema._zod.processJSONSchema) {
            schema._zod.processJSONSchema(ctx, result.schema, params);
        }
        else {
            const _json = result.schema;
            const processor = ctx.processors[def.type];
            if (!processor) {
                throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
            }
            processor(schema, ctx, _json, params);
        }
        const parent = schema._zod.parent;
        if (parent) {
            // Also set ref if processor didn't (for inheritance)
            if (!result.ref)
                result.ref = parent;
            process(parent, ctx, params);
            ctx.seen.get(parent).isParent = true;
        }
    }
    // metadata
    const meta = ctx.metadataRegistry.get(schema);
    if (meta)
        assignProps(result.schema, meta);
    if (ctx.io === "input" && isTransforming(schema)) {
        // examples/defaults only apply to output type of pipe
        delete result.schema.examples;
        delete result.schema.default;
    }
    // set prefault as default
    if (ctx.io === "input" && "_prefault" in result.schema)
        (_a = result.schema).default ?? (_a.default = result.schema._prefault);
    delete result.schema._prefault;
    // pulling fresh from ctx.seen in case it was overwritten
    const _result = ctx.seen.get(schema);
    return _result.schema;
}
// Escape a reference token for use in a JSON Pointer fragment (RFC 6901): `~` becomes `~0` and `/` becomes `~1`. The `~` replacement must run first.
function encodeJSONPointerSegment(segment) {
    return segment.replace(/~/g, "~0").replace(/\//g, "~1");
}
function extractDefs(ctx, schema
// params: EmitParams
) {
    // iterate over seen map;
    const root = ctx.seen.get(schema);
    if (!root)
        throw new Error("Unprocessed schema. This is a bug in Zod.");
    // With `external` set, every registered schema resolves through the external branch of `makeURI`, so the root branch below produces the same ref the external branch would — this pass is identical whichever schema it is called with, and only needs to run once.
    if (ctx.external && ctx.sharedDefsExtractedFor === ctx.external)
        return;
    // Track ids to detect duplicates across different schemas
    const idToSchema = new Map();
    for (const entry of ctx.seen.entries()) {
        const id = ctx.metadataRegistry.get(entry[0])?.id;
        if (id) {
            const existing = idToSchema.get(id);
            if (existing && existing !== entry[0]) {
                throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
            }
            idToSchema.set(id, entry[0]);
        }
    }
    // returns a ref to the schema defId will be empty if the ref points to an external schema (or #)
    const makeURI = (entry) => {
        // comparing the seen objects because sometimes multiple schemas map to the same seen object. e.g. lazy
        // external is configured
        const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
        if (ctx.external) {
            const externalId = ctx.external.registry.get(entry[0])?.id; // ?? "__shared";// `__schema${ctx.counter++}`;
            // check if schema is in the external registry
            const uriGenerator = ctx.external.uri ?? ((id) => id);
            if (externalId) {
                return { ref: uriGenerator(externalId) };
            }
            // otherwise, add to __shared
            const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
            entry[1].defId = id; // set defId so it will be reused if needed
            return { defId: id, ref: `${uriGenerator("__shared")}#/${defsSegment}/${encodeJSONPointerSegment(id)}` };
        }
        const uriPrefix = `#`;
        const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
        // an id-less root has nowhere to be extracted to, so it stays inline and self-references as `#`
        if (entry[1] === root && !entry[1].schema.id) {
            return { ref: uriPrefix };
        }
        // self-contained schema
        const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
        return { defId, ref: defUriPrefix + encodeJSONPointerSegment(defId) };
    };
    // stored cached version in `def` property remove all properties, set $ref
    const extractToDef = (entry) => {
        // if the schema is already a reference, do not extract it
        if (entry[1].schema.$ref) {
            return;
        }
        const seen = entry[1];
        const { ref, defId } = makeURI(entry);
        seen.def = { ...seen.schema };
        // defId won't be set if the schema is a reference to an external schema or if the schema is the root schema
        if (defId)
            seen.defId = defId;
        // wipe away all properties except $ref
        const schema = seen.schema;
        for (const key in schema) {
            delete schema[key];
        }
        schema.$ref = ref;
    };
    // throw on cycles
    // break cycles
    if (ctx.cycles === "throw") {
        for (const entry of ctx.seen.entries()) {
            const seen = entry[1];
            if (seen.cycle) {
                throw new Error("Cycle detected: " +
                    `#/${seen.cycle?.join("/")}/<root>` +
                    '\n\nSet the `cycles` parameter to `"ref"` to resolve cyclical schemas with defs.');
            }
        }
    }
    // extract schemas into $defs
    for (const entry of ctx.seen.entries()) {
        const seen = entry[1];
        // convert root schema to # $ref
        if (schema === entry[0]) {
            extractToDef(entry); // this has special handling for the root schema
            continue;
        }
        // extract schemas that are in the external registry
        if (ctx.external) {
            const ext = ctx.external.registry.get(entry[0])?.id;
            if (schema !== entry[0] && ext) {
                extractToDef(entry);
                continue;
            }
        }
        // extract schemas with `id` meta
        const id = ctx.metadataRegistry.get(entry[0])?.id;
        if (id) {
            extractToDef(entry);
            continue;
        }
        // break cycles
        if (seen.cycle) {
            // any
            extractToDef(entry);
            continue;
        }
        // extract reused schemas
        if (seen.count > 1) {
            if (ctx.reused === "ref") {
                extractToDef(entry);
                // biome-ignore lint:
                continue;
            }
        }
    }
    if (ctx.external)
        ctx.sharedDefsExtractedFor = ctx.external;
}
/** Rewrites `anyOf: [{type: "a"}, {type: "b"}]` to `type: ["a", "b"]`, which every JSON Schema draft treats as equivalent and most consumers render far better for the nullable case. Only branches that are a bare type assertion qualify — anything carrying a constraint, `$ref`, `const` or metadata is left alone. Runs after `flattenRef`, so a branch an override decorated or `$defs` extraction turned into a `$ref` is no longer bare and correctly stays in `anyOf`. `oneOf` is excluded: `integer` and `number` overlap, so "exactly one" and "at least one" are not the same there. OpenAPI 3.0 is excluded: its `type` must be a single string. */
function compactTypeUnion(schema) {
    const options = schema.anyOf;
    if (!Array.isArray(options) || options.length === 0 || schema.type !== undefined)
        return;
    const types = [];
    for (const option of options) {
        if (!option || typeof option !== "object")
            return;
        // A branch that is itself a compactible union folds into this one — nested `anyOf` and a flat `type` array say the same thing. Compacting it first also makes the result independent of the order this pass walks the seen map in.
        compactTypeUnion(option);
        const keys = Object.keys(option);
        if (keys.length !== 1 || keys[0] !== "type")
            return;
        const type = option.type;
        for (const member of Array.isArray(type) ? type : [type]) {
            if (typeof member !== "string")
                return;
            if (!types.includes(member))
                types.push(member);
        }
    }
    delete schema.anyOf;
    // A `type` array must be non-empty and unique (metaschema); a single member is spelled as a bare string.
    schema.type = types.length === 1 ? types[0] : types;
}
/** Keywords `foldIntersection` knows how to combine. Anything else — `$ref`, `patternProperties`,
 * an annotation like `description` — makes a member unfoldable, so a constraint this does not
 * understand leaves the `allOf` alone instead of being silently dropped or misattributed. */
const FOLDABLE_KEYS = new Set(["type", "properties", "required", "additionalProperties"]);
const UNION_KEYS = ["oneOf", "anyOf"];
/** A member's constraint on a key it does not declare itself. A `catchall` states one; `false`, an absent `additionalProperties`, and the empty schema a loose object emits state nothing. */
function undeclaredConstraint(member) {
    const extra = member.additionalProperties;
    if (extra === undefined || extra === false || typeof extra !== "object" || extra === null)
        return null;
    return Object.keys(extra).length ? extra : null;
}
/** Combines object members into the single object they describe together, or returns `null` if any of them carries a keyword outside {@link FOLDABLE_KEYS}. */
function foldObjects(members) {
    const objects = [];
    for (const member of members) {
        // A boolean subschema is legal JSON Schema and carries no keywords to fold.
        if (typeof member !== "object" || member.type !== "object")
            return null;
        for (const key in member) {
            if (!FOLDABLE_KEYS.has(key))
                return null;
        }
        objects.push(member);
    }
    const properties = {};
    const required = new Set();
    for (const object of objects) {
        for (const key in object.properties) {
            // `in` would report a `__proto__` key as already present via the prototype chain and skip it.
            if (Object.prototype.hasOwnProperty.call(properties, key))
                continue;
            // Every member constrains this key: the ones that declare it say how, and a `catchall` member constrains it too even though it does not name it. The key has to satisfy all of them, which is the same intersection one level down.
            const parts = [];
            for (const other of objects) {
                const part = other.properties?.[key] ?? undeclaredConstraint(other);
                if (part === null || part === undefined)
                    continue;
                if (!parts.some((seen) => JSON.stringify(seen) === JSON.stringify(part)))
                    parts.push(part);
            }
            const merged = parts.length === 1
                ? parts[0]
                : (foldObjects(parts) ?? { allOf: parts });
            (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.assignProp)(properties, key, merged);
        }
        for (const key of object.required ?? [])
            required.add(key);
    }
    const folded = { type: "object", properties };
    if (required.size)
        folded.required = [...required];
    // A key no member declares is rejected only when every member rejects it, so the fold is closed only when every member is. Otherwise it carries whatever the `catchall` members demand of such a key.
    if (objects.every((object) => object.additionalProperties === false)) {
        folded.additionalProperties = false;
    }
    else {
        const constraints = [];
        for (const object of objects) {
            const constraint = undeclaredConstraint(object);
            if (constraint && !constraints.some((seen) => JSON.stringify(seen) === JSON.stringify(constraint)))
                constraints.push(constraint);
        }
        if (constraints.length === 1)
            folded.additionalProperties = constraints[0];
        else if (constraints.length > 1)
            folded.additionalProperties = { allOf: constraints };
    }
    return folded;
}
/** `additionalProperties` in an `allOf` member sees only that member's own `properties`, so two
 * closed object members reject each other's keys and the schema validates nothing. Zod's parser
 * pools the key sets instead — `handleIntersectionResults` reports a key as unrecognized only when
 * *every* side rejects it — so the emitted schema has to pool them too, and folding the members
 * into one object is the encoding that says so on every target.
 *
 * This runs from `finalize`, after `extractDefs`, which is what keeps it clear of the `$ref`
 * machinery: a member extracted into `$defs` is already a `$ref` by now and declines to fold, so it
 * keeps its reference and its own closedness rather than being inlined as a stale copy. */
function foldIntersection(json) {
    const allOf = json.allOf;
    if (!Array.isArray(allOf) || allOf.length < 2)
        return;
    // An `override` runs before this pass and may have written object keywords onto the intersection itself. Those are deliberate, so decline rather than overwrite them.
    for (const key of FOLDABLE_KEYS)
        if (key in json)
            return;
    // An intersection distributes over a union: `A & (X | Y)` is `(A & X) | (A & Y)`. Only the first union is distributed over; a second one stays among the members every branch folds against, where it fails the object check and declines the whole intersection rather than multiplying out.
    const unions = allOf.filter((m) => UNION_KEYS.some((k) => Array.isArray(m[k])));
    let folded = null;
    if (!unions.length) {
        folded = foldObjects(allOf);
    }
    else {
        const union = unions[0];
        const keyword = UNION_KEYS.find((k) => Array.isArray(union[k]));
        if (Object.keys(union).length !== 1)
            return;
        const rest = allOf.filter((m) => m !== union);
        const branches = union[keyword].map((branch) => foldObjects([...rest, branch]));
        if (branches.some((b) => !b))
            return;
        folded = { [keyword]: branches };
    }
    if (!folded)
        return;
    delete json.allOf;
    assignProps(json, folded);
}
function finalize(ctx, schema) {
    const root = ctx.seen.get(schema);
    if (!root)
        throw new Error("Unprocessed schema. This is a bug in Zod.");
    // flatten refs - inherit properties from parent schemas
    const flattenRef = (zodSchema) => {
        const seen = ctx.seen.get(zodSchema);
        // already processed
        if (seen.ref === null)
            return;
        const schema = seen.def ?? seen.schema;
        const _cached = { ...schema };
        const ref = seen.ref;
        seen.ref = null; // prevent infinite recursion
        if (ref) {
            flattenRef(ref);
            const refSeen = ctx.seen.get(ref);
            const refSchema = refSeen.schema;
            // merge referenced schema into current
            if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
                // older drafts can't combine $ref with other properties
                schema.allOf = schema.allOf ?? [];
                schema.allOf.push(refSchema);
            }
            else {
                assignProps(schema, refSchema);
            }
            // restore child's own properties (child wins)
            assignProps(schema, _cached);
            const isParentRef = zodSchema._zod.parent === ref;
            // For parent chain, child is a refinement - remove parent-only properties
            if (isParentRef) {
                for (const key in schema) {
                    if (key === "$ref" || key === "allOf")
                        continue;
                    if (!(key in _cached)) {
                        delete schema[key];
                    }
                }
            }
            // When ref was extracted to $defs, remove properties that match the definition
            if (refSchema.$ref && refSeen.def) {
                for (const key in schema) {
                    if (key === "$ref" || key === "allOf")
                        continue;
                    if (key in refSeen.def && JSON.stringify(schema[key]) === JSON.stringify(refSeen.def[key])) {
                        delete schema[key];
                    }
                }
            }
        }
        // If parent was extracted (has $ref), propagate $ref to this schema. This handles cases like: readonly().meta({id}).describe() where processor sets ref to innerType but parent should be referenced
        const parent = zodSchema._zod.parent;
        if (parent && parent !== ref) {
            // Ensure parent is processed first so its def has inherited properties
            flattenRef(parent);
            const parentSeen = ctx.seen.get(parent);
            if (parentSeen?.schema.$ref) {
                schema.$ref = parentSeen.schema.$ref;
                // De-duplicate with parent's definition
                if (parentSeen.def) {
                    for (const key in schema) {
                        if (key === "$ref" || key === "allOf")
                            continue;
                        if (key in parentSeen.def && JSON.stringify(schema[key]) === JSON.stringify(parentSeen.def[key])) {
                            delete schema[key];
                        }
                    }
                }
            }
        }
        // execute overrides
        ctx.override({
            zodSchema: zodSchema,
            jsonSchema: schema,
            path: seen.path ?? [],
        });
    };
    // Flattening walks the whole map and clears each `ref` as it goes, so a second call over the same map is a no-op scan. Skip it outright once it has run for a registry conversion.
    if (!ctx.external || ctx.sharedEmitDoneFor !== ctx.external) {
        for (const entry of [...ctx.seen.entries()].reverse()) {
            flattenRef(entry[0]);
        }
        if (ctx.target !== "openapi-3.0") {
            for (const entry of ctx.seen.entries()) {
                compactTypeUnion(entry[1].def ?? entry[1].schema);
            }
        }
        for (const rewrite of ctx.deferred)
            rewrite();
        // After flattening, every member that was extracted is a `$ref`, so the fold sees the final shape. A schema that inherits an intersection — through `z.lazy`, or any `ref` chain — holds the same `allOf` array, so fold by array identity to catch every copy.
        if (ctx.intersections.length) {
            const carriers = new Map();
            for (const seen of ctx.seen.values()) {
                for (const json of [seen.schema, seen.def]) {
                    const allOf = json?.allOf;
                    if (!Array.isArray(allOf))
                        continue;
                    const existing = carriers.get(allOf);
                    if (existing)
                        existing.push(json);
                    else
                        carriers.set(allOf, [json]);
                }
            }
            for (const allOf of ctx.intersections) {
                for (const json of carriers.get(allOf) ?? [])
                    foldIntersection(json);
            }
        }
    }
    const result = {};
    if (ctx.target === "draft-2020-12") {
        result.$schema = "https://json-schema.org/draft/2020-12/schema";
    }
    else if (ctx.target === "draft-07") {
        result.$schema = "http://json-schema.org/draft-07/schema#";
    }
    else if (ctx.target === "draft-04") {
        result.$schema = "http://json-schema.org/draft-04/schema#";
    }
    else if (ctx.target === "openapi-3.0") {
        // OpenAPI 3.0 schema objects should not include a $schema property
    }
    else {
        // Arbitrary string values are allowed but won't have a $schema property set
    }
    if (ctx.external?.uri) {
        const id = ctx.external.registry.get(schema)?.id;
        if (!id)
            throw new Error("Schema is missing an `id` property");
        result.$id = ctx.external.uri(id);
    }
    // when the root was extracted into $defs, `root.schema` is the `$ref` wrapper and `root.def` is the body that now lives under $defs
    assignProps(result, root.defId ? root.schema : (root.def ?? root.schema));
    // The `id` in `.meta()` is a Zod-specific registration tag used to extract schemas into $defs — it is not user-facing JSON Schema metadata. Strip it from the output body where it would otherwise leak. The id is preserved implicitly via the $defs key (and via $ref paths).
    const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
    if (rootMetaId !== undefined && result.id === rootMetaId)
        delete result.id;
    // build defs object. With `external`, `defs` is the shared object every schema writes into, so the same entries are reassigned on every call. Without it, `defs` is fresh per call and must be rebuilt.
    const defs = ctx.external?.defs ?? {};
    if (!ctx.external || ctx.sharedEmitDoneFor !== ctx.external) {
        for (const entry of ctx.seen.entries()) {
            const seen = entry[1];
            if (seen.def && seen.defId) {
                if (seen.def.id === seen.defId)
                    delete seen.def.id;
                (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.assignProp)(defs, seen.defId, seen.def);
            }
        }
    }
    if (ctx.external)
        ctx.sharedEmitDoneFor = ctx.external;
    // set definitions in result
    if (ctx.external) {
    }
    else {
        if (Object.keys(defs).length > 0) {
            if (ctx.target === "draft-2020-12") {
                result.$defs = defs;
            }
            else {
                result.definitions = defs;
            }
        }
    }
    try {
        // this "finalizes" this schema and ensures all cycles are removed each call to finalize() is functionally independent though the seen map is shared
        const finalized = JSON.parse(JSON.stringify(result));
        Object.defineProperty(finalized, "~standard", {
            value: {
                ...schema["~standard"],
                jsonSchema: {
                    input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
                    output: createStandardJSONSchemaMethod(schema, "output", ctx.processors),
                },
            },
            enumerable: false,
            writable: false,
        });
        return finalized;
    }
    catch (_err) {
        throw new Error("Error converting schema to JSON.");
    }
}
function isTransforming(_schema, _ctx) {
    const ctx = _ctx ?? { seen: new Set() };
    if (ctx.seen.has(_schema))
        return false;
    ctx.seen.add(_schema);
    const def = _schema._zod.def;
    if (def.type === "transform")
        return true;
    if (def.type === "array")
        return isTransforming(def.element, ctx);
    if (def.type === "set")
        return isTransforming(def.valueType, ctx);
    if (def.type === "lazy")
        return isTransforming(def.getter(), ctx);
    if (def.type === "promise" ||
        def.type === "optional" ||
        def.type === "nonoptional" ||
        def.type === "nullable" ||
        def.type === "readonly" ||
        def.type === "default" ||
        def.type === "prefault" ||
        def.type === "catch") {
        return isTransforming(def.innerType, ctx);
    }
    if (def.type === "intersection") {
        return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
    }
    if (def.type === "record" || def.type === "map") {
        return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
    }
    if (def.type === "pipe") {
        if (_schema._zod.traits.has("$ZodCodec"))
            return true;
        return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
    }
    if (def.type === "object") {
        for (const key in def.shape) {
            if (isTransforming(def.shape[key], ctx))
                return true;
        }
        return false;
    }
    if (def.type === "union") {
        for (const option of def.options) {
            if (isTransforming(option, ctx))
                return true;
        }
        return false;
    }
    if (def.type === "tuple") {
        for (const item of def.items) {
            if (isTransforming(item, ctx))
                return true;
        }
        if (def.rest && isTransforming(def.rest, ctx))
            return true;
        return false;
    }
    return false;
}
/**
 * Creates a toJSONSchema method for a schema instance.
 * This encapsulates the logic of initializing context, processing, extracting defs, and finalizing.
 */
const createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
    const ctx = initializeContext({ ...params, processors });
    process(schema, ctx);
    extractDefs(ctx, schema);
    return finalize(ctx, schema);
};
const createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
    const { libraryOptions, target } = params ?? {};
    const ctx = initializeContext({ ...(libraryOptions ?? {}), target, io, processors });
    process(schema, ctx);
    extractDefs(ctx, schema);
    return finalize(ctx, schema);
};


/***/ },

/***/ 6286
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6205);

const error = () => {
    const Sizable = {
        string: { unit: "characters", verb: "to have" },
        file: { unit: "bytes", verb: "to have" },
        array: { unit: "items", verb: "to have" },
        set: { unit: "items", verb: "to have" },
        map: { unit: "entries", verb: "to have" },
    };
    function getSizing(origin) {
        return Sizable[origin] ?? null;
    }
    const FormatDictionary = {
        regex: "input",
        email: "email address",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO datetime",
        date: "ISO date",
        time: "ISO time",
        duration: "ISO duration",
        ipv4: "IPv4 address",
        ipv6: "IPv6 address",
        mac: "MAC address",
        cidrv4: "IPv4 range",
        cidrv6: "IPv6 range",
        base64: "base64-encoded string",
        base64url: "base64url-encoded string",
        json_string: "JSON string",
        e164: "E.164 number",
        credit_card: "credit card number",
        jwt: "JWT",
        template_literal: "input",
    };
    // type names: missing keys = do not translate (use raw value via ?? fallback)
    const TypeDictionary = {
        // Compatibility: "nan" -> "NaN" for display
        nan: "NaN",
        // All other type names omitted - they fall back to raw values via ?? operator
    };
    function getTypeName(type, input) {
        if (type === "number" && typeof input === "number" && !Number.isFinite(input)) {
            return String(input);
        }
        return TypeDictionary[type] ?? type;
    }
    return (issue) => {
        switch (issue.code) {
            case "invalid_type": {
                const expected = getTypeName(issue.expected);
                const receivedType = _core_util_js__WEBPACK_IMPORTED_MODULE_0__.parsedType(issue.input);
                const received = getTypeName(receivedType, issue.input);
                return `Invalid input: expected ${expected}, received ${received}`;
            }
            case "invalid_value":
                if (issue.values.length === 1)
                    return `Invalid input: expected ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.stringifyPrimitive(issue.values[0])}`;
                return `Invalid option: expected one of ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.values, "|")}`;
            case "too_big": {
                const adj = issue.exact ? "exactly " : issue.inclusive ? "<=" : "<";
                const sizing = getSizing(issue.origin);
                if (sizing)
                    return `Too big: expected ${issue.origin ?? "value"} to have ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elements"}`;
                return `Too big: expected ${issue.origin ?? "value"} to be ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const adj = issue.exact ? "exactly " : issue.inclusive ? ">=" : ">";
                const sizing = getSizing(issue.origin);
                if (sizing) {
                    return `Too small: expected ${issue.origin} to have ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `Too small: expected ${issue.origin} to be ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                if (_issue.format === "starts_with") {
                    return `Invalid string: must start with "${_issue.prefix}"`;
                }
                if (_issue.format === "ends_with")
                    return `Invalid string: must end with "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `Invalid string: must include "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `Invalid string: must match pattern ${_issue.pattern}`;
                return `Invalid ${FormatDictionary[_issue.format] ?? issue.format}`;
            }
            case "not_multiple_of":
                return `Invalid number: must be a multiple of ${issue.divisor}`;
            case "unrecognized_keys":
                return `Unrecognized key${issue.keys.length > 1 ? "s" : ""}: ${_core_util_js__WEBPACK_IMPORTED_MODULE_0__.joinValues(issue.keys, ", ")}`;
            case "invalid_key":
                return `Invalid key in ${issue.origin}`;
            case "invalid_union":
                if (issue.options && Array.isArray(issue.options) && issue.options.length > 0) {
                    const opts = issue.options.map((o) => `'${o}'`).join(" | ");
                    return `Invalid discriminator value. Expected ${opts}`;
                }
                if (issue.inclusive === false) {
                    return "Invalid input: more than one option matched";
                }
                return "Invalid input";
            case "invalid_element":
                return `Invalid value in ${issue.origin}`;
            default:
                return `Invalid input`;
        }
    };
};
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    return {
        localeError: error(),
    };
}


/***/ }

}]);