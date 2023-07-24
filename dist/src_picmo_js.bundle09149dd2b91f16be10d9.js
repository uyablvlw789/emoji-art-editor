"use strict";
(self["webpackChunkfabric_test"] = self["webpackChunkfabric_test"] || []).push([["src_picmo_js"],{

/***/ "./src/picmo.js":
/*!**********************!*\
  !*** ./src/picmo.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EmojiPicker: () => (/* binding */ ko),
/* harmony export */   Events: () => (/* binding */ le),
/* harmony export */   FocusTrap: () => (/* binding */ ot),
/* harmony export */   InMemoryProvider: () => (/* binding */ Wo),
/* harmony export */   InMemoryStoreFactory: () => (/* binding */ Se),
/* harmony export */   IndexedDbStoreFactory: () => (/* binding */ Le),
/* harmony export */   LocalStorageProvider: () => (/* binding */ zt),
/* harmony export */   NativeRenderer: () => (/* binding */ Ft),
/* harmony export */   RecentsProvider: () => (/* binding */ $e),
/* harmony export */   Renderer: () => (/* binding */ Et),
/* harmony export */   SessionStorageProvider: () => (/* binding */ qo),
/* harmony export */   animate: () => (/* binding */ I),
/* harmony export */   autoTheme: () => (/* binding */ Ho),
/* harmony export */   caseInsensitiveIncludes: () => (/* binding */ ue),
/* harmony export */   computeHash: () => (/* binding */ Ke),
/* harmony export */   createDatabase: () => (/* binding */ Go),
/* harmony export */   createPicker: () => (/* binding */ Ko),
/* harmony export */   createStyleInjector: () => (/* binding */ Fo),
/* harmony export */   darkTheme: () => (/* binding */ No),
/* harmony export */   debounce: () => (/* binding */ He),
/* harmony export */   deleteDatabase: () => (/* binding */ Oo),
/* harmony export */   empty: () => (/* binding */ V),
/* harmony export */   en: () => (/* binding */ ze),
/* harmony export */   getEmojiForEvent: () => (/* binding */ q),
/* harmony export */   getOptions: () => (/* binding */ $t),
/* harmony export */   getPrefixedClasses: () => (/* binding */ p),
/* harmony export */   globalConfig: () => (/* binding */ At),
/* harmony export */   i18n: () => (/* binding */ Uo),
/* harmony export */   isLocalStorageAvailable: () => (/* binding */ qe),
/* harmony export */   isSessionStorageAvailable: () => (/* binding */ Ue),
/* harmony export */   lightTheme: () => (/* binding */ st),
/* harmony export */   prefixClassName: () => (/* binding */ ne),
/* harmony export */   replaceChildren: () => (/* binding */ w),
/* harmony export */   shouldAnimate: () => (/* binding */ _e),
/* harmony export */   throttle: () => (/* binding */ Ne),
/* harmony export */   toElement: () => (/* binding */ Q)
/* harmony export */ });
var U = (o, e, t) => {
  if (!e.has(o))
    throw TypeError("Cannot " + t);
};
var y = (o, e, t) => (U(o, e, "read from private field"), t ? t.call(o) : e.get(o)), f = (o, e, t) => {
  if (e.has(o))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(o) : e.set(o, t);
}, A = (o, e, t, s) => (U(o, e, "write to private field"), s ? s.call(o, t) : e.set(o, t), t);
var g = (o, e, t) => (U(o, e, "access private method"), t);
const Me = "14.0";
function Ve(o, e, t) {
  let s = `https://cdn.jsdelivr.net/npm/emojibase-data@${e}/${o}`;
  return typeof t == "function" ? s = t(o, e) : typeof t == "string" && (s = `${t}/${o}`), s;
}
async function ae(o, e = {}) {
  const {
    local: t = !1,
    version: s = "latest",
    cdnUrl: i,
    ...r
  } = e, a = Ve(o, s, i), n = t ? localStorage : sessionStorage, l = `emojibase/${s}/${o}`, m = n.getItem(l);
  if (m)
    return Promise.resolve(JSON.parse(m));
  const d = await fetch(a, {
    credentials: "omit",
    mode: "cors",
    redirect: "error",
    ...r
  });
  if (!d.ok)
    throw new Error("Failed to load Emojibase dataset.");
  const h = await d.json();
  try {
    n.setItem(l, JSON.stringify(h));
  } catch {
  }
  return h;
}
const De = {
  discord: "joypixels",
  slack: "iamcal"
};
async function me(o, e, t) {
  var s;
  return ae(`${o}/shortcodes/${(s = De[e]) !== null && s !== void 0 ? s : e}.json`, t);
}
function k(o, e) {
  if (e.length === 0)
    return o;
  const t = new Set(o.shortcodes);
  return e.forEach((s) => {
    const i = s[o.hexcode];
    Array.isArray(i) ? i.forEach((r) => t.add(r)) : i && t.add(i);
  }), o.shortcodes = [...t], o.skins && o.skins.forEach((s) => {
    k(s, e);
  }), o;
}
function Be(o, e = []) {
  const t = [];
  return o.forEach((s) => {
    if (s.skins) {
      const {
        skins: i,
        ...r
      } = s;
      t.push(k(r, e)), i.forEach((a) => {
        const n = {
          ...a
        };
        r.tags && (n.tags = [...r.tags]), t.push(k(n, e));
      });
    } else
      t.push(k(s, e));
  }), t;
}
function Oe(o, e) {
  return e.length === 0 || o.forEach((t) => {
    k(t, e);
  }), o;
}
async function Ce(o, e = {}) {
  const {
    compact: t = !1,
    flat: s = !1,
    shortcodes: i = [],
    ...r
  } = e, a = await ae(`${o}/${t ? "compact" : "data"}.json`, r);
  let n = [];
  return i.length > 0 && (n = await Promise.all(i.map((l) => {
    let m;
    if (l.includes("/")) {
      const [d, h] = l.split("/");
      m = me(d, h, r);
    } else
      m = me(o, l, r);
    return m.catch(() => ({}));
  }))), s ? Be(a, n) : Oe(a, n);
}
async function je(o, e) {
  return ae(`${o}/messages.json`, e);
}
function q(o, e) {
  const s = o.target.closest("[data-emoji]");
  if (s) {
    const i = e.find((r) => r.emoji === s.dataset.emoji);
    if (i)
      return i;
  }
  return null;
}
function _e(o) {
  var t;
  const e = (t = window.matchMedia) == null ? void 0 : t.call(window, "(prefers-reduced-motion: reduce)");
  return o.animate && !(e != null && e.matches);
}
function ue(o, e) {
  return o.toLowerCase().includes(e.toLowerCase());
}
function Ne(o, e) {
  let t = null;
  return () => {
    t || (t = window.setTimeout(() => {
      o(), t = null;
    }, e));
  };
}
function He(o, e) {
  let t = null;
  return (...s) => {
    t && window.clearTimeout(t), t = window.setTimeout(() => {
      o(...s), t = null;
    }, e);
  };
}
function I(o, e, t, s) {
  if (_e(s) && o.animate)
    return o.animate(e, t).finished;
  const i = t.direction === "normal" ? 1 : 0, r = Object.entries(e).reduce((a, [n, l]) => ({
    ...a,
    [n]: l[i]
  }), {});
  return Object.assign(o.style, r), Promise.resolve();
}
function Q(o) {
  var t;
  const e = document.createElement("template");
  return e.innerHTML = o, (t = e.content) == null ? void 0 : t.firstElementChild;
}
async function Ke(o) {
  const e = new TextEncoder().encode(o), t = await crypto.subtle.digest("SHA-256", e);
  return Array.from(new Uint8Array(t)).map((i) => i.toString(16).padStart(2, "0")).join("");
}
function p(...o) {
  return o.reduce((e, t) => ({
    ...e,
    [t]: ne(t)
  }), {});
}
function ne(o) {
  return `picmo__${o}`;
}
function V(o) {
  for (; o.firstChild; )
    o.removeChild(o.firstChild);
  return o;
}
function w(o, ...e) {
  V(o).append(...e);
}
function ke(o) {
  try {
    return window[o].length, !0;
  } catch {
    return !1;
  }
}
function Ue() {
  return ke("sessionStorage");
}
function qe() {
  return ke("localStorage");
}
function xe() {
  let o = {};
  return {
    getItem: (e) => o[e],
    setItem: (e, t) => o[e] = t,
    length: Object.keys(o).length,
    clear: () => o = {},
    key: (e) => Object.keys(o)[e],
    removeItem: (e) => delete o[e]
  };
}
function x(o) {
  var e;
  return {
    emoji: o.emoji,
    label: o.label,
    tags: o.tags,
    skins: (e = o.skins) == null ? void 0 : e.map((t) => x(t)),
    order: o.order,
    custom: !1,
    hexcode: o.hexcode,
    version: o.version
  };
}
function B(o, e, t) {
  var s;
  return t && !t.some((i) => i.order === o.group) ? !1 : ue(o.label, e) || ((s = o.tags) == null ? void 0 : s.some((i) => ue(i, e)));
}
class Ee {
  constructor(e = "en") {
    this.locale = e;
  }
}
const We = [
  (o, e) => (o.hexcode === "1F91D" && e < 14 && (o.skins = []), o),
  (o, e) => (o.skins && (o.skins = o.skins.filter((t) => !t.version || t.version <= e)), o)
];
function Ge(o, e) {
  return We.some((t) => t(o, e) === null) ? null : o;
}
function O(o, e) {
  return o.filter((t) => Ge(t, e) !== null);
}
const W = {};
function Se(o) {
  return W[o] || (W[o] = new Je(o)), W[o];
}
Se.deleteDatabase = (o) => {
};
class Je extends Ee {
  open() {
    return Promise.resolve();
  }
  delete() {
    return Promise.resolve();
  }
  close() {
  }
  isPopulated() {
    return Promise.resolve(!1);
  }
  getEmojiCount() {
    return Promise.resolve(this.emojis.length);
  }
  getEtags() {
    return Promise.resolve({ foo: "bar" });
  }
  getHash() {
    return Promise.resolve("");
  }
  populate(e) {
    return this.categories = e.groups, this.emojis = e.emojis, Promise.resolve();
  }
  getCategories(e) {
    var s;
    let t = this.categories.filter((i) => i.key !== "component");
    if (e.showRecents && t.unshift({ key: "recents", order: -1 }), (s = e.custom) != null && s.length && t.push({ key: "custom", order: 10 }), e.categories) {
      const i = e.categories;
      t = t.filter((r) => i.includes(r.key)), t.sort((r, a) => i.indexOf(r.key) - i.indexOf(a.key));
    } else
      t.sort((i, r) => i.order - r.order);
    return Promise.resolve(t);
  }
  getEmojis(e, t) {
    const s = this.emojis.filter((i) => i.group === e.order).filter((i) => i.version <= t).sort((i, r) => i.order != null && r.order != null ? i.order - r.order : 0).map(x);
    return Promise.resolve(O(s, t));
  }
  searchEmojis(e, t, s, i) {
    const r = this.emojis.filter((l) => B(l, e, i) && l.version <= s).map(x), a = t.filter((l) => B(l, e, i)), n = [
      ...O(r, s),
      ...a
    ];
    return Promise.resolve(n);
  }
  setMeta(e) {
    this.meta = e;
  }
}
!Ue() && typeof window < "u" && (console.warn("[picmo] sessionStorage not available, falling back to simple in-memory storage"), Object.defineProperty(window, "sessionStorage", {
  value: xe()
}));
function Ze(o, e) {
  const t = `https://cdn.jsdelivr.net/npm/emojibase-data@${o}/${e}`;
  return {
    emojisUrl: `${t}/data.json`,
    messagesUrl: `${t}/messages.json`
  };
}
async function pe(o) {
  try {
    return (await fetch(o, { method: "HEAD" })).headers.get("etag");
  } catch {
    return null;
  }
}
function Ye(o) {
  const { emojisUrl: e, messagesUrl: t } = Ze("latest", o);
  try {
    return Promise.all([
      pe(e),
      pe(t)
    ]);
  } catch {
    return Promise.all([null, null]);
  }
}
async function Qe(o, e, t) {
  let s;
  try {
    s = await o.getEtags();
  } catch {
    s = {};
  }
  const { storedEmojisEtag: i, storedMessagesEtag: r } = s;
  if (t !== r || e !== i) {
    const [a, n] = await Promise.all([je(o.locale), Ce(o.locale)]);
    await o.populate({
      groups: a.groups,
      emojis: n,
      emojisEtag: e,
      messagesEtag: t
    });
  }
}
async function Xe(o, e) {
  const t = await o.getHash();
  return e !== t;
}
async function Fe(o, e, t) {
  let s = t || e(o);
  try {
    await s.open();
  } catch {
    console.warn("[picmo] IndexedDB not available, falling back to InMemoryStoreFactory"), s = Se(o);
  }
  return s;
}
async function et(o, e, t) {
  const s = await Fe(o, e, t), [i, r] = await Ye(o);
  if (await s.isPopulated())
    i && r && await Qe(s, i, r);
  else {
    const [a, n] = await Promise.all([je(o), Ce(o)]);
    await s.populate({ groups: a.groups, emojis: n, emojisEtag: i, messagesEtag: r });
  }
  return s;
}
async function tt(o, e, t, s, i) {
  const r = await Fe(o, e, i), a = await Ke(s);
  return (!await r.isPopulated() || await Xe(r, a)) && await r.populate({ groups: t.groups, emojis: s, hash: a }), r;
}
async function ce(o, e, t, s, i) {
  return t && s ? tt(o, e, t, s, i) : et(o, e, i);
}
function Oo(o, e) {
  o.deleteDatabase(e);
}
class ot {
  constructor() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  activate(e) {
    this.rootElement = e, this.rootElement.addEventListener("keydown", this.handleKeyDown);
  }
  deactivate() {
    var e;
    (e = this.rootElement) == null || e.removeEventListener("keydown", this.handleKeyDown);
  }
  get focusableElements() {
    return this.rootElement.querySelectorAll('input, [tabindex="0"]');
  }
  get lastFocusableElement() {
    return this.focusableElements[this.focusableElements.length - 1];
  }
  get firstFocusableElement() {
    return this.focusableElements[0];
  }
  checkFocus(e, t, s) {
    e.target === t && (s.focus(), e.preventDefault());
  }
  handleKeyDown(e) {
    e.key === "Tab" && this.checkFocus(
      e,
      e.shiftKey ? this.firstFocusableElement : this.lastFocusableElement,
      e.shiftKey ? this.lastFocusableElement : this.firstFocusableElement
    );
  }
}
const {
  light: st,
  dark: No,
  auto: Ho
} = p("light", "dark", "auto");
class c {
  constructor({ template: e, classes: t, parent: s }) {
    this.isDestroyed = !1, this.appEvents = {}, this.uiEvents = [], this.uiElements = {}, this.ui = {}, this.template = e, this.classes = t, this.parent = s, this.keyBindingHandler = this.keyBindingHandler.bind(this);
  }
  initialize() {
    this.bindAppEvents();
  }
  setCustomEmojis(e) {
    this.customEmojis = e;
  }
  setEvents(e) {
    this.events = e;
  }
  setPickerId(e) {
    this.pickerId = e;
  }
  emit(e, ...t) {
    this.events.emit(e, ...t);
  }
  setI18n(e) {
    this.i18n = e;
  }
  setRenderer(e) {
    this.renderer = e;
  }
  setEmojiData(e) {
    this.emojiDataPromise = e, e.then((t) => {
      this.emojiData = t;
    });
  }
  updateEmojiData(e) {
    this.emojiData = e, this.emojiDataPromise = Promise.resolve(e);
  }
  setOptions(e) {
    this.options = e;
  }
  renderSync(e = {}) {
    return this.el = this.template.renderSync({
      classes: this.classes,
      i18n: this.i18n,
      pickerId: this.pickerId,
      ...e
    }), this.postRender(), this.el;
  }
  async render(e = {}) {
    return await this.emojiDataPromise, this.el = await this.template.renderAsync({
      classes: this.classes,
      i18n: this.i18n,
      pickerId: this.pickerId,
      ...e
    }), this.postRender(), this.el;
  }
  postRender() {
    this.bindUIElements(), this.bindKeyBindings(), this.bindUIEvents(), this.scheduleShowAnimation();
  }
  bindAppEvents() {
    Object.keys(this.appEvents).forEach((e) => {
      this.events.on(e, this.appEvents[e], this);
    }), this.events.on("data:ready", this.updateEmojiData, this);
  }
  unbindAppEvents() {
    Object.keys(this.appEvents).forEach((e) => {
      this.events.off(e, this.appEvents[e]);
    }), this.events.off("data:ready", this.updateEmojiData);
  }
  keyBindingHandler(e) {
    const t = this.keyBindings[e.key];
    t && t.call(this, e);
  }
  bindKeyBindings() {
    this.keyBindings && this.el.addEventListener("keydown", this.keyBindingHandler);
  }
  unbindKeyBindings() {
    this.keyBindings && this.el.removeEventListener("keydown", this.keyBindingHandler);
  }
  bindUIElements() {
    this.ui = Object.keys(this.uiElements).reduce((e, t) => ({
      ...e,
      [t]: this.el.querySelector(this.uiElements[t])
    }), {});
  }
  bindUIEvents() {
    this.uiEvents.forEach((e) => {
      e.handler = e.handler.bind(this), (e.target ? this.ui[e.target] : this.el).addEventListener(e.event, e.handler, e.options);
    });
  }
  unbindUIEvents() {
    this.uiEvents.forEach((e) => {
      (e.target ? this.ui[e.target] : this.el).removeEventListener(e.event, e.handler);
    });
  }
  destroy() {
    this.unbindAppEvents(), this.unbindUIEvents(), this.unbindKeyBindings(), this.el.remove(), this.isDestroyed = !0;
  }
  scheduleShowAnimation() {
    if (this.parent) {
      const e = new MutationObserver((t) => {
        const [s] = t;
        s.type === "childList" && s.addedNodes[0] === this.el && (_e(this.options) && this.animateShow && this.animateShow(), e.disconnect);
      });
      e.observe(this.parent, { childList: !0 });
    }
  }
  static childEvent(e, t, s, i = {}) {
    return { target: e, event: t, handler: s, options: i };
  }
  static uiEvent(e, t, s = {}) {
    return { event: e, handler: t, options: s };
  }
  static byClass(e) {
    return `.${e}`;
  }
}
const it = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512zM232 256C232 264 236 271.5 242.7 275.1L338.7 339.1C349.7 347.3 364.6 344.3 371.1 333.3C379.3 322.3 376.3 307.4 365.3 300L280 243.2V120C280 106.7 269.3 96 255.1 96C242.7 96 231.1 106.7 231.1 120L232 256z"/></svg>', rt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M64 496C64 504.8 56.75 512 48 512h-32C7.25 512 0 504.8 0 496V32c0-17.75 14.25-32 32-32s32 14.25 32 32V496zM476.3 0c-6.365 0-13.01 1.35-19.34 4.233c-45.69 20.86-79.56 27.94-107.8 27.94c-59.96 0-94.81-31.86-163.9-31.87C160.9 .3055 131.6 4.867 96 15.75v350.5c32-9.984 59.87-14.1 84.85-14.1c73.63 0 124.9 31.78 198.6 31.78c31.91 0 68.02-5.971 111.1-23.09C504.1 355.9 512 344.4 512 332.1V30.73C512 11.1 495.3 0 476.3 0z"/></svg>', at = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM176.4 240C194 240 208.4 225.7 208.4 208C208.4 190.3 194 176 176.4 176C158.7 176 144.4 190.3 144.4 208C144.4 225.7 158.7 240 176.4 240zM336.4 176C318.7 176 304.4 190.3 304.4 208C304.4 225.7 318.7 240 336.4 240C354 240 368.4 225.7 368.4 208C368.4 190.3 354 176 336.4 176zM259.9 369.4C288.8 369.4 316.2 375.2 340.6 385.5C352.9 390.7 366.7 381.3 361.4 369.1C344.8 330.9 305.6 303.1 259.9 303.1C214.3 303.1 175.1 330.8 158.4 369.1C153.1 381.3 166.1 390.6 179.3 385.4C203.7 375.1 231 369.4 259.9 369.4L259.9 369.4z"/></svg>', nt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M448 64H192C85.96 64 0 149.1 0 256s85.96 192 192 192h256c106 0 192-85.96 192-192S554 64 448 64zM247.1 280h-32v32c0 13.2-10.78 24-23.98 24c-13.2 0-24.02-10.8-24.02-24v-32L136 279.1C122.8 279.1 111.1 269.2 111.1 256c0-13.2 10.85-24.01 24.05-24.01L167.1 232v-32c0-13.2 10.82-24 24.02-24c13.2 0 23.98 10.8 23.98 24v32h32c13.2 0 24.02 10.8 24.02 24C271.1 269.2 261.2 280 247.1 280zM431.1 344c-22.12 0-39.1-17.87-39.1-39.1s17.87-40 39.1-40s39.1 17.88 39.1 40S454.1 344 431.1 344zM495.1 248c-22.12 0-39.1-17.87-39.1-39.1s17.87-40 39.1-40c22.12 0 39.1 17.88 39.1 40S518.1 248 495.1 248z"/></svg>', ct = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M112.1 454.3c0 6.297 1.816 12.44 5.284 17.69l17.14 25.69c5.25 7.875 17.17 14.28 26.64 14.28h61.67c9.438 0 21.36-6.401 26.61-14.28l17.08-25.68c2.938-4.438 5.348-12.37 5.348-17.7L272 415.1h-160L112.1 454.3zM191.4 .0132C89.44 .3257 16 82.97 16 175.1c0 44.38 16.44 84.84 43.56 115.8c16.53 18.84 42.34 58.23 52.22 91.45c.0313 .25 .0938 .5166 .125 .7823h160.2c.0313-.2656 .0938-.5166 .125-.7823c9.875-33.22 35.69-72.61 52.22-91.45C351.6 260.8 368 220.4 368 175.1C368 78.61 288.9-.2837 191.4 .0132zM192 96.01c-44.13 0-80 35.89-80 79.1C112 184.8 104.8 192 96 192S80 184.8 80 176c0-61.76 50.25-111.1 112-111.1c8.844 0 16 7.159 16 16S200.8 96.01 192 96.01z"/></svg>', lt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M512 32H120c-13.25 0-24 10.75-24 24L96.01 288c0 53 43 96 96 96h192C437 384 480 341 480 288h32c70.63 0 128-57.38 128-128S582.6 32 512 32zM512 224h-32V96h32c35.25 0 64 28.75 64 64S547.3 224 512 224zM560 416h-544C7.164 416 0 423.2 0 432C0 458.5 21.49 480 48 480h480c26.51 0 48-21.49 48-48C576 423.2 568.8 416 560 416z"/></svg>', ht = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M482.3 192C516.5 192 576 221 576 256C576 292 516.5 320 482.3 320H365.7L265.2 495.9C259.5 505.8 248.9 512 237.4 512H181.2C170.6 512 162.9 501.8 165.8 491.6L214.9 320H112L68.8 377.6C65.78 381.6 61.04 384 56 384H14.03C6.284 384 0 377.7 0 369.1C0 368.7 .1818 367.4 .5398 366.1L32 256L.5398 145.9C.1818 144.6 0 143.3 0 142C0 134.3 6.284 128 14.03 128H56C61.04 128 65.78 130.4 68.8 134.4L112 192H214.9L165.8 20.4C162.9 10.17 170.6 0 181.2 0H237.4C248.9 0 259.5 6.153 265.2 16.12L365.7 192H482.3z"/></svg>', dt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M9.375 233.4C3.375 239.4 0 247.5 0 256v128c0 8.5 3.375 16.62 9.375 22.62S23.5 416 32 416h32V224H32C23.5 224 15.38 227.4 9.375 233.4zM464 96H352V32c0-17.62-14.38-32-32-32S288 14.38 288 32v64H176C131.8 96 96 131.8 96 176V448c0 35.38 28.62 64 64 64h320c35.38 0 64-28.62 64-64V176C544 131.8 508.3 96 464 96zM256 416H192v-32h64V416zM224 296C201.9 296 184 278.1 184 256S201.9 216 224 216S264 233.9 264 256S246.1 296 224 296zM352 416H288v-32h64V416zM448 416h-64v-32h64V416zM416 296c-22.12 0-40-17.88-40-40S393.9 216 416 216S456 233.9 456 256S438.1 296 416 296zM630.6 233.4C624.6 227.4 616.5 224 608 224h-32v192h32c8.5 0 16.62-3.375 22.62-9.375S640 392.5 640 384V256C640 247.5 636.6 239.4 630.6 233.4z"/></svg>', mt = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <radialGradient gradientUnits="userSpaceOnUse" cy="10%" id="gradient-0">
      <stop offset="0" stop-color="hsl(50, 100%, 50%)" />
      <stop offset="1" stop-color="hsl(50, 100%, 60%)" />
    </radialGradient>
  </defs>
  <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
  <ellipse stroke="#000" fill="rgba(0, 0, 0, 0.6)" cx="172.586" cy="207.006" rx="39.974" ry="39.974"/>
  <ellipse stroke="#000" fill="rgba(0, 0, 0, 0.6)" cx="334.523" cy="207.481" rx="39.974" ry="39.974"/>
  <ellipse stroke="#000" fill="rgba(0, 0, 0, 0.6)" cx="313.325" cy="356.208" rx="91.497" ry="59.893"/>
  <path fill="#55a7ff" d="M 159.427 274.06 L 102.158 363.286 L 124.366 417.011 L 160.476 423.338 L 196.937 414.736 L 218.502 375.214"></path>
  <path fill="url(#gradient-0)" d="M256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM256 352C290.9 352 323.2 367.8 348.3 394.9C354.3 401.4 364.4 401.7 370.9 395.7C377.4 389.7 377.7 379.6 371.7 373.1C341.6 340.5 301 320 256 320C247.2 320 240 327.2 240 336C240 344.8 247.2 352 256 352H256zM208 369C208 349 179.6 308.6 166.4 291.3C163.2 286.9 156.8 286.9 153.6 291.3C140.6 308.6 112 349 112 369C112 395 133.5 416 160 416C186.5 416 208 395 208 369H208zM303.6 208C303.6 225.7 317.1 240 335.6 240C353.3 240 367.6 225.7 367.6 208C367.6 190.3 353.3 176 335.6 176C317.1 176 303.6 190.3 303.6 208zM207.6 208C207.6 190.3 193.3 176 175.6 176C157.1 176 143.6 190.3 143.6 208C143.6 225.7 157.1 240 175.6 240C193.3 240 207.6 225.7 207.6 208z" />
</svg>`, ut = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/></svg>', pt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256.3 331.8C208.9 331.8 164.1 324.9 124.5 312.8C112.2 309 100.2 319.7 105.2 331.5C130.1 390.6 188.4 432 256.3 432C324.2 432 382.4 390.6 407.4 331.5C412.4 319.7 400.4 309 388.1 312.8C348.4 324.9 303.7 331.8 256.3 331.8H256.3zM176.4 176C158.7 176 144.4 190.3 144.4 208C144.4 225.7 158.7 240 176.4 240C194 240 208.4 225.7 208.4 208C208.4 190.3 194 176 176.4 176zM336.4 240C354 240 368.4 225.7 368.4 208C368.4 190.3 354 176 336.4 176C318.7 176 304.4 190.3 304.4 208C304.4 225.7 318.7 240 336.4 240z"/></svg>', gt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M500.3 7.251C507.7 13.33 512 22.41 512 31.1V175.1C512 202.5 483.3 223.1 447.1 223.1C412.7 223.1 383.1 202.5 383.1 175.1C383.1 149.5 412.7 127.1 447.1 127.1V71.03L351.1 90.23V207.1C351.1 234.5 323.3 255.1 287.1 255.1C252.7 255.1 223.1 234.5 223.1 207.1C223.1 181.5 252.7 159.1 287.1 159.1V63.1C287.1 48.74 298.8 35.61 313.7 32.62L473.7 .6198C483.1-1.261 492.9 1.173 500.3 7.251H500.3zM74.66 303.1L86.5 286.2C92.43 277.3 102.4 271.1 113.1 271.1H174.9C185.6 271.1 195.6 277.3 201.5 286.2L213.3 303.1H239.1C266.5 303.1 287.1 325.5 287.1 351.1V463.1C287.1 490.5 266.5 511.1 239.1 511.1H47.1C21.49 511.1-.0019 490.5-.0019 463.1V351.1C-.0019 325.5 21.49 303.1 47.1 303.1H74.66zM143.1 359.1C117.5 359.1 95.1 381.5 95.1 407.1C95.1 434.5 117.5 455.1 143.1 455.1C170.5 455.1 191.1 434.5 191.1 407.1C191.1 381.5 170.5 359.1 143.1 359.1zM440.3 367.1H496C502.7 367.1 508.6 372.1 510.1 378.4C513.3 384.6 511.6 391.7 506.5 396L378.5 508C372.9 512.1 364.6 513.3 358.6 508.9C352.6 504.6 350.3 496.6 353.3 489.7L391.7 399.1H336C329.3 399.1 323.4 395.9 321 389.6C318.7 383.4 320.4 376.3 325.5 371.1L453.5 259.1C459.1 255 467.4 254.7 473.4 259.1C479.4 263.4 481.6 271.4 478.7 278.3L440.3 367.1zM116.7 219.1L19.85 119.2C-8.112 90.26-6.614 42.31 24.85 15.34C51.82-8.137 93.26-3.642 118.2 21.83L128.2 32.32L137.7 21.83C162.7-3.642 203.6-8.137 231.6 15.34C262.6 42.31 264.1 90.26 236.1 119.2L139.7 219.1C133.2 225.6 122.7 225.6 116.7 219.1H116.7z"/></svg>', yt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M413.8 447.1L256 448l0 31.99C256 497.7 241.8 512 224.1 512c-17.67 0-32.1-14.32-32.1-31.99l0-31.99l-158.9-.0099c-28.5 0-43.69-34.49-24.69-56.4l68.98-79.59H62.22c-25.41 0-39.15-29.8-22.67-49.13l60.41-70.85H89.21c-21.28 0-32.87-22.5-19.28-37.31l134.8-146.5c10.4-11.3 28.22-11.3 38.62-.0033l134.9 146.5c13.62 14.81 2.001 37.31-19.28 37.31h-10.77l60.35 70.86c16.46 19.34 2.716 49.12-22.68 49.12h-15.2l68.98 79.59C458.7 413.7 443.1 447.1 413.8 447.1z"/></svg>', ft = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM479.1 320h-73.85C451.2 357.7 480 414.1 480 477.3C480 490.1 476.2 501.9 470 512h138C625.7 512 640 497.6 640 479.1C640 391.6 568.4 320 479.1 320zM432 256C493.9 256 544 205.9 544 144S493.9 32 432 32c-25.11 0-48.04 8.555-66.72 22.51C376.8 76.63 384 101.4 384 128c0 35.52-11.93 68.14-31.59 94.71C372.7 243.2 400.8 256 432 256z"/></svg>', vt = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <radialGradient id="radial" cy="85%">
      <stop offset="20%" stop-color="var(--color-secondary)" />
      <stop offset="100%" stop-color="var(--color-primary)" />
    </radialGradient>
  </defs>
  <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
  <path fill="url('#radial')" d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z" />
</svg>`, wt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>';
function bt(o, e) {
  const t = Q(e);
  return t.dataset.icon = o, t.classList.add(ne("icon")), t;
}
const ge = {
  clock: it,
  flag: rt,
  frown: at,
  gamepad: nt,
  lightbulb: ct,
  mug: lt,
  plane: ht,
  robot: dt,
  sad: mt,
  search: ut,
  smiley: pt,
  symbols: gt,
  tree: yt,
  users: ft,
  warning: vt,
  xmark: wt
}, N = {
  recents: "clock",
  "smileys-emotion": "smiley",
  "people-body": "users",
  "animals-nature": "tree",
  "food-drink": "mug",
  activities: "gamepad",
  "travel-places": "plane",
  objects: "lightbulb",
  symbols: "symbols",
  flags: "flag",
  custom: "robot"
};
function Pe(o, e) {
  if (!(o in ge))
    return console.warn(`Unknown icon: "${o}"`), document.createElement("div");
  const t = bt(o, ge[o]);
  return e && t.classList.add(ne(`icon-${e}`)), t;
}
const Ct = {
  mode: "sync"
};
var b, E, S, X, F, ee, P, te;
class u {
  constructor(e, t = {}) {
    f(this, S);
    f(this, F);
    f(this, P);
    f(this, b, void 0);
    f(this, E, void 0);
    A(this, b, e), A(this, E, t.mode || Ct.mode);
  }
  renderSync(e = {}) {
    const t = Q(y(this, b).call(this, e));
    return g(this, P, te).call(this, t, e), g(this, F, ee).call(this, t), g(this, S, X).call(this, t, e), t;
  }
  async renderAsync(e = {}) {
    const t = Q(y(this, b).call(this, e));
    return g(this, P, te).call(this, t, e), g(this, F, ee).call(this, t), await g(this, S, X).call(this, t, e), t;
  }
  render(e) {
    return y(this, E) === "sync" ? this.renderSync(e) : this.renderAsync(e);
  }
}
b = new WeakMap(), E = new WeakMap(), S = new WeakSet(), X = async function(e, t) {
  const s = e.querySelectorAll("[data-view]"), i = [];
  for (const r of s) {
    const a = t[r.dataset.view];
    a ? r.dataset.render !== "sync" ? i.push(a.render().then((n) => (r.replaceWith(n), n))) : r.replaceWith(a.renderSync()) : r.remove();
  }
  return Promise.all(i);
}, F = new WeakSet(), ee = function(e) {
  e.querySelectorAll("i[data-icon]").forEach((s) => {
    const { icon: i, size: r } = s.dataset;
    s.replaceWith(Pe(i, r));
  });
}, P = new WeakSet(), te = function(e, t) {
  return e.querySelectorAll("[data-placeholder]").forEach((i) => {
    const r = i.dataset.placeholder;
    if (r && t[r]) {
      const a = t[r];
      i.replaceWith(...[a].flat());
    } else
      console.warn(`Missing placeholder element for key "${r}"`);
  }), e;
};
const jt = p(
  "imagePlaceholder",
  "placeholder"
), _t = new u(({ classes: o }) => `
  <div class="${o.placeholder} ${o.imagePlaceholder}"></div>
`);
class kt extends c {
  constructor({ classNames: e } = {}) {
    super({ template: _t, classes: jt }), this.classNames = e;
  }
  load(e) {
    const t = document.createElement("img");
    this.classNames && (t.className = this.classNames), t.addEventListener("load", () => {
      this.el.replaceWith(t);
    }, { once: !0 }), Promise.resolve(e).then((s) => t.src = s);
  }
  renderSync() {
    return super.renderSync(), this.classNames && this.classNames.split(" ").forEach((t) => this.el.classList.add(t)), this.el;
  }
}
const xt = p("customEmoji");
class Et {
  renderElement(e) {
    return { content: e };
  }
  renderImage(e = "", t) {
    const s = new kt({ classNames: e });
    return s.renderSync(), { content: s, resolver: () => (s.load(t()), s.el) };
  }
  doRender(e, t, s) {
    if (e.custom)
      return this.renderCustom(e, t, s);
    const { content: i, resolver: r } = this.render(e, s), a = i instanceof Element ? i : i.el;
    return r && r(), a;
  }
  doEmit(e) {
    return e.custom ? this.emitCustom(e) : this.emit(e);
  }
  emitCustom({ url: e, label: t, emoji: s, data: i }) {
    return { url: e, label: t, emoji: s, data: i };
  }
  renderCustom(e, t, s = "") {
    const i = [xt.customEmoji, s].join(" ").trim(), { content: r, resolver: a } = this.renderImage(i, () => e.url), n = r instanceof Element ? r : r.el;
    return a && a(), n;
  }
}
const St = new u(({ emoji: o }) => `<span>${o}</span>`);
class Ft extends Et {
  render(e) {
    return this.renderElement(St.renderSync({ emoji: e.emoji }));
  }
  emit({ emoji: e, hexcode: t, label: s }) {
    return { emoji: e, hexcode: t, label: s };
  }
}
const ze = {
  "categories.activities": "Activities",
  "categories.animals-nature": "Animals & Nature",
  "categories.custom": "Custom",
  "categories.flags": "Flags",
  "categories.food-drink": "Food & Drink",
  "categories.objects": "Objects",
  "categories.people-body": "People & Body",
  "categories.recents": "Recently Used",
  "categories.smileys-emotion": "Smileys & Emotion",
  "categories.symbols": "Symbols",
  "categories.travel-places": "Travel & Places",
  "error.load": "Failed to load emojis",
  "recents.clear": "Clear recent emojis",
  "recents.none": "You haven't selected any emojis yet.",
  retry: "Try again",
  "search.clear": "Clear search",
  "search.error": "Failed to search emojis",
  "search.notFound": "No results found",
  search: "Search emojis..."
}, oe = "PicMo";
function Le(o) {
  return new Pt(o);
}
Le.deleteDatabase = (o) => new Promise((e, t) => {
  const s = indexedDB.deleteDatabase(`${oe}-${o}`);
  s.addEventListener("success", e), s.addEventListener("error", t);
});
class Pt extends Ee {
  async open() {
    const e = indexedDB.open(`${oe}-${this.locale}`);
    return new Promise((t, s) => {
      e.addEventListener("success", (i) => {
        var r;
        this.db = (r = i.target) == null ? void 0 : r.result, t();
      }), e.addEventListener("error", s), e.addEventListener("upgradeneeded", async (i) => {
        var a;
        this.db = (a = i.target) == null ? void 0 : a.result, this.db.createObjectStore("category", { keyPath: "order" });
        const r = this.db.createObjectStore("emoji", { keyPath: "emoji" });
        r.createIndex("category", "group"), r.createIndex("version", "version"), this.db.createObjectStore("meta");
      });
    });
  }
  async delete() {
    this.close();
    const e = indexedDB.deleteDatabase(`${oe}-${this.locale}`);
    await this.waitForRequest(e);
  }
  close() {
    this.db.close();
  }
  async getEmojiCount() {
    const t = this.db.transaction("emoji", "readonly").objectStore("emoji");
    return (await this.waitForRequest(t.count())).target.result;
  }
  async getEtags() {
    const t = this.db.transaction("meta", "readonly").objectStore("meta"), [s, i] = await Promise.all([
      this.waitForRequest(t.get("emojisEtag")),
      this.waitForRequest(t.get("messagesEtag"))
    ]);
    return {
      storedEmojisEtag: s.target.result,
      storedMessagesEtag: i.target.result
    };
  }
  async setMeta(e) {
    const t = this.db.transaction("meta", "readwrite"), s = t.objectStore("meta");
    return new Promise((i) => {
      t.oncomplete = i, Object.keys(e).filter(Boolean).forEach((a) => {
        s.put(e[a], a);
      });
    });
  }
  async getHash() {
    const t = this.db.transaction("meta", "readonly").objectStore("meta");
    return (await this.waitForRequest(t.get("hash"))).target.result;
  }
  async isPopulated() {
    const t = this.db.transaction("category", "readonly").objectStore("category");
    return (await this.waitForRequest(t.count())).target.result > 0;
  }
  async populate({
    groups: e,
    emojis: t,
    emojisEtag: s,
    messagesEtag: i,
    hash: r
  }) {
    await this.removeAllObjects("category", "emoji");
    const a = [
      this.addObjects("category", e),
      this.addObjects("emoji", t),
      this.setMeta({ emojisEtag: s, messagesEtag: i, hash: r })
    ];
    await Promise.all(a);
  }
  async getCategories(e) {
    var a;
    const s = this.db.transaction("category", "readonly").objectStore("category");
    let r = (await this.waitForRequest(s.getAll())).target.result.filter((n) => n.key !== "component");
    if (e.showRecents && r.unshift({ key: "recents", order: -1 }), (a = e.custom) != null && a.length && r.push({ key: "custom", order: 10 }), e.categories) {
      const n = e.categories;
      r = r.filter((l) => n.includes(l.key)), r.sort((l, m) => n.indexOf(l.key) - n.indexOf(m.key));
    } else
      r.sort((n, l) => n.order - l.order);
    return r;
  }
  async getEmojis(e, t) {
    const r = this.db.transaction("emoji", "readonly").objectStore("emoji").index("category"), l = (await this.waitForRequest(r.getAll(e.order))).target.result.filter((m) => m.version <= t).sort((m, d) => m.order != null && d.order != null ? m.order - d.order : 0).map(x);
    return O(l, t);
  }
  async searchEmojis(e, t, s, i) {
    const r = [];
    return new Promise((a, n) => {
      const d = this.db.transaction("emoji", "readonly").objectStore("emoji").openCursor();
      d.addEventListener("success", (h) => {
        var de;
        const H = (de = h.target) == null ? void 0 : de.result;
        if (!H)
          return a([
            ...O(r, s),
            ...t.filter((Re) => B(Re, e))
          ]);
        const K = H.value;
        B(K, e, i) && K.version <= s && r.push(x(K)), H.continue();
      }), d.addEventListener("error", (h) => {
        n(h);
      });
    });
  }
  async waitForRequest(e) {
    return new Promise((t, s) => {
      e.onsuccess = t, e.onerror = s;
    });
  }
  withTransaction(e, t = "readwrite", s) {
    return new Promise((i, r) => {
      const a = this.db.transaction(e, t);
      a.oncomplete = i, a.onerror = r, s(a);
    });
  }
  async removeAllObjects(...e) {
    const t = this.db.transaction(e, "readwrite"), s = e.map((i) => t.objectStore(i));
    await Promise.all(s.map((i) => this.waitForRequest(i.clear())));
  }
  async addObjects(e, t) {
    return this.withTransaction(e, "readwrite", (s) => {
      const i = s.objectStore(e);
      t.forEach((r) => {
        i.add(r);
      });
    });
  }
}
class $e {
}
const G = "PicMo:recents";
class Ae extends $e {
  constructor(e) {
    super(), this.storage = e;
  }
  clear() {
    this.storage.removeItem(G);
  }
  getRecents(e) {
    var t;
    try {
      return JSON.parse((t = this.storage.getItem(G)) != null ? t : "[]").slice(0, e);
    } catch {
      return [];
    }
  }
  addOrUpdateRecent(e, t) {
    const s = [
      e,
      ...this.getRecents(t).filter((i) => i.hexcode !== e.hexcode)
    ].slice(0, t);
    try {
      this.storage.setItem(G, JSON.stringify(s));
    } catch {
      console.warn("storage is not available, recent emojis will not be saved");
    }
  }
}
class zt extends Ae {
  constructor() {
    super(localStorage);
  }
}
const Lt = {
  dataStore: Le,
  theme: st,
  animate: !0,
  showCategoryTabs: !0,
  showPreview: !0,
  showRecents: !0,
  showSearch: !0,
  showVariants: !0,
  emojisPerRow: 8,
  visibleRows: 6,
  emojiVersion: "auto",
  i18n: ze,
  locale: "en",
  maxRecents: 50,
  custom: []
};
!qe() && typeof window < "u" && (console.warn("[picmo] localStorage not available, falling back to simple in-memory storage"), Object.defineProperty(window, "localStorage", {
  value: xe()
}));
function $t(o = {}) {
  return {
    ...Lt,
    ...o,
    renderer: o.renderer || new Ft(),
    recentsProvider: o.recentsProvider || new zt()
  };
}
var v, C, D, z, se;
class le {
  constructor() {
    f(this, C);
    f(this, z);
    f(this, v, /* @__PURE__ */ new Map());
  }
  on(e, t, s) {
    g(this, z, se).call(this, e, t, s);
  }
  once(e, t, s) {
    g(this, z, se).call(this, e, t, s, !0);
  }
  off(e, t) {
    const s = g(this, C, D).call(this, e);
    y(this, v).set(e, s.filter((i) => i.handler !== t));
  }
  emit(e, ...t) {
    g(this, C, D).call(this, e).forEach((i) => {
      i.handler.apply(i.context, t), i.once && this.off(e, i.handler);
    });
  }
  removeAll() {
    y(this, v).clear();
  }
}
v = new WeakMap(), C = new WeakSet(), D = function(e) {
  return y(this, v).has(e) || y(this, v).set(e, []), y(this, v).get(e);
}, z = new WeakSet(), se = function(e, t, s, i = !1) {
  g(this, C, D).call(this, e).push({ context: s, handler: t, once: i });
};
const At = {
  injectStyles: !0
};
class It extends le {
}
class Tt extends le {
}
const ie = p(
  "emojiCategory",
  "categoryName",
  "noRecents",
  "recentEmojis"
);
class he extends c {
  constructor({ template: e, category: t, showVariants: s, lazyLoader: i }) {
    super({ template: e, classes: ie }), this.baseUIElements = {
      categoryName: c.byClass(ie.categoryName)
    }, this.category = t, this.showVariants = s, this.lazyLoader = i;
  }
  setActive(e, t, s) {
    this.emojiContainer.setActive(e, t, s);
  }
}
const Rt = new u(({ classes: o, emoji: e }) => `
  <button
    type="button"
    class="${o.emojiButton}"
    title="${e.label}"
    data-emoji="${e.emoji}"
    tabindex="-1">
    <div data-placeholder="emojiContent"></div>
  </button>
`), Mt = p("emojiButton");
class Ie extends c {
  constructor({ emoji: e, lazyLoader: t, category: s }) {
    super({ template: Rt, classes: Mt }), this.emoji = e, this.lazyLoader = t, this.category = s;
  }
  initialize() {
    this.uiEvents = [
      c.uiEvent("focus", this.handleFocus)
    ], super.initialize();
  }
  handleFocus() {
    this.category && this.events.emit("focus:change", this.category);
  }
  activateFocus(e) {
    this.el.tabIndex = 0, e && this.el.focus();
  }
  deactivateFocus() {
    this.el.tabIndex = -1;
  }
  renderSync() {
    return super.renderSync({
      emoji: this.emoji,
      emojiContent: this.renderer.doRender(this.emoji, this.lazyLoader)
    });
  }
}
class Vt {
  constructor(e, t, s = 0, i = 0, r = !1) {
    this.events = new le(), this.keyHandlers = {
      ArrowLeft: this.focusPrevious.bind(this),
      ArrowRight: this.focusNext.bind(this),
      ArrowUp: this.focusUp.bind(this),
      ArrowDown: this.focusDown.bind(this)
    }, this.rowCount = Math.ceil(t / e), this.columnCount = e, this.focusedRow = s, this.focusedColumn = i, this.emojiCount = t, this.wrap = r, this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  destroy() {
    this.events.removeAll();
  }
  on(e, t) {
    this.events.on(e, t);
  }
  handleKeyDown(e) {
    e.key in this.keyHandlers && (e.preventDefault(), this.keyHandlers[e.key]());
  }
  setCell(e, t, s = !0) {
    const i = this.getIndex();
    this.focusedRow = e, t !== void 0 && (this.focusedColumn = Math.min(this.columnCount, t)), (this.focusedRow >= this.rowCount || this.getIndex() >= this.emojiCount) && (this.focusedRow = this.rowCount - 1, this.focusedColumn = this.emojiCount % this.columnCount - 1), this.events.emit("focus:change", { from: i, to: this.getIndex(), performFocus: s });
  }
  setFocusedIndex(e, t = !0) {
    const s = Math.floor(e / this.columnCount), i = e % this.columnCount;
    this.setCell(s, i, t);
  }
  focusNext() {
    this.focusedColumn < this.columnCount - 1 && this.getIndex() < this.emojiCount - 1 ? this.setCell(this.focusedRow, this.focusedColumn + 1) : this.focusedRow < this.rowCount - 1 ? this.setCell(this.focusedRow + 1, 0) : this.wrap ? this.setCell(0, 0) : this.events.emit("focus:overflow", 0);
  }
  focusPrevious() {
    this.focusedColumn > 0 ? this.setCell(this.focusedRow, this.focusedColumn - 1) : this.focusedRow > 0 ? this.setCell(this.focusedRow - 1, this.columnCount - 1) : this.wrap ? this.setCell(this.rowCount - 1, this.columnCount - 1) : this.events.emit("focus:underflow", this.columnCount - 1);
  }
  focusUp() {
    this.focusedRow > 0 ? this.setCell(this.focusedRow - 1, this.focusedColumn) : this.events.emit("focus:underflow", this.focusedColumn);
  }
  focusDown() {
    this.focusedRow < this.rowCount - 1 ? this.setCell(this.focusedRow + 1, this.focusedColumn) : this.events.emit("focus:overflow", this.focusedColumn);
  }
  focusToIndex(e) {
    this.setCell(Math.floor(e / this.columnCount), e % this.columnCount);
  }
  getIndex() {
    return this.focusedRow * this.columnCount + this.focusedColumn;
  }
  getCell() {
    return { row: this.focusedRow, column: this.focusedColumn };
  }
  getRowCount() {
    return this.rowCount;
  }
}
const Dt = new u(({ classes: o }) => `
  <div class="${o.emojiContainer}">
    <div data-placeholder="emojis"></div>
  </div>
`), Bt = p("emojiContainer");
class $ extends c {
  constructor({ emojis: e, showVariants: t, preview: s = !0, lazyLoader: i, category: r, fullHeight: a = !1 }) {
    super({ template: Dt, classes: Bt }), this.fullHeight = !1, this.showVariants = t, this.lazyLoader = i, this.preview = s, this.emojis = e, this.category = r, this.fullHeight = a, this.setFocus = this.setFocus.bind(this), this.triggerNextCategory = this.triggerNextCategory.bind(this), this.triggerPreviousCategory = this.triggerPreviousCategory.bind(this);
  }
  initialize() {
    this.grid = new Vt(this.options.emojisPerRow, this.emojiCount, 0, 0, !this.category), this.grid.on("focus:change", this.setFocus), this.grid.on("focus:overflow", this.triggerNextCategory), this.grid.on("focus:underflow", this.triggerPreviousCategory), this.uiEvents = [
      c.uiEvent("click", this.selectEmoji),
      c.uiEvent("keydown", this.grid.handleKeyDown)
    ], this.preview && this.uiEvents.push(
      c.uiEvent("mouseover", this.showPreview),
      c.uiEvent("mouseout", this.hidePreview),
      c.uiEvent("focus", this.showPreview, { capture: !0 }),
      c.uiEvent("blur", this.hidePreview, { capture: !0 })
    ), super.initialize();
  }
  setFocusedView(e, t) {
    if (!!e)
      if (typeof e == "string") {
        const s = this.emojis.findIndex((i) => i.emoji === e);
        this.grid.setFocusedIndex(s, !1), setTimeout(() => {
          var n, l, m, d;
          const i = this.emojiViews[s].el;
          i.scrollIntoView();
          const r = (n = i.parentElement) == null ? void 0 : n.previousElementSibling, a = (m = (l = i.parentElement) == null ? void 0 : l.parentElement) == null ? void 0 : m.parentElement;
          a.scrollTop -= (d = r == null ? void 0 : r.offsetHeight) != null ? d : 0;
        });
      } else
        e.row === "first" || e.row === 0 ? this.grid.setCell(0, e.offset, t) : e.row === "last" && this.grid.setCell(this.grid.getRowCount() - 1, e.offset, t);
  }
  setActive(e, t, s) {
    var i;
    e ? this.setFocusedView(t, s) : (i = this.emojiViews[this.grid.getIndex()]) == null || i.deactivateFocus();
  }
  renderSync() {
    return this.emojiViews = this.emojis.map(
      (e) => this.viewFactory.create(Ie, {
        emoji: e,
        category: this.category,
        lazyLoader: this.lazyLoader,
        renderer: this.renderer
      })
    ), this.emojiElements = this.emojiViews.map((e) => e.renderSync()), super.renderSync({
      emojis: this.emojiElements,
      i18n: this.i18n
    });
  }
  destroy() {
    super.destroy(), this.emojiViews.forEach((e) => e.destroy()), this.grid.destroy();
  }
  triggerPreviousCategory(e) {
    this.events.emit("category:previous", e);
  }
  triggerNextCategory(e) {
    this.category && this.events.emit("category:next", e);
  }
  setFocus({ from: e, to: t, performFocus: s }) {
    var i, r;
    (i = this.emojiViews[e]) == null || i.deactivateFocus(), (r = this.emojiViews[t]) == null || r.activateFocus(s);
  }
  selectEmoji(e) {
    e.stopPropagation();
    const t = q(e, this.emojis);
    t && this.events.emit("emoji:select", {
      emoji: t,
      showVariants: this.showVariants
    });
  }
  showPreview(e) {
    const s = e.target.closest("button"), i = s == null ? void 0 : s.firstElementChild, r = q(e, this.emojis);
    r && this.events.emit("preview:show", r, i == null ? void 0 : i.cloneNode(!0));
  }
  hidePreview(e) {
    q(e, this.emojis) && this.events.emit("preview:hide");
  }
  get emojiCount() {
    return this.emojis.length;
  }
}
const Ot = new u(({ classes: o, category: e, pickerId: t, icon: s, i18n: i }) => `
  <section class="${o.emojiCategory}" role="tabpanel" aria-labelledby="${t}-category-${e.key}">
    <h3 data-category="${e.key}" class="${o.categoryName}">
      <i data-icon="${s}"></i>
      ${i.get(`categories.${e.key}`, e.message || e.key)}
    </h3>
    <div data-view="emojis" data-render="sync"></div>
  </section>
`);
class Nt extends he {
  constructor({ category: e, showVariants: t, lazyLoader: s, emojiVersion: i }) {
    super({ category: e, showVariants: t, lazyLoader: s, template: Ot }), this.showVariants = t, this.lazyLoader = s, this.emojiVersion = i;
  }
  initialize() {
    this.uiElements = { ...this.baseUIElements }, super.initialize();
  }
  async render() {
    await this.emojiDataPromise;
    const e = await this.emojiData.getEmojis(this.category, this.emojiVersion);
    return this.emojiContainer = this.viewFactory.create($, {
      emojis: e,
      showVariants: this.showVariants,
      lazyLoader: this.lazyLoader,
      category: this.category.key
    }), super.render({
      category: this.category,
      emojis: this.emojiContainer,
      emojiCount: e.length,
      icon: N[this.category.key]
    });
  }
}
class Ht extends $ {
  constructor({ category: e, emojis: t, preview: s = !0, lazyLoader: i }) {
    super({ category: e, emojis: t, showVariants: !1, preview: s, lazyLoader: i });
  }
  async addOrUpdate(e) {
    const t = this.el.querySelector(`[data-emoji="${e.emoji}"]`);
    t && (this.el.removeChild(t), this.emojis = this.emojis.filter((i) => i !== e));
    const s = this.viewFactory.create(Ie, { emoji: e });
    if (this.el.insertBefore(s.renderSync(), this.el.firstChild), this.emojis = [
      e,
      ...this.emojis.filter((i) => i !== e)
    ], this.emojis.length > this.options.maxRecents) {
      this.emojis = this.emojis.slice(0, this.options.maxRecents);
      const i = this.el.childElementCount - this.options.maxRecents;
      for (let r = 0; r < i; r++)
        this.el.lastElementChild && this.el.removeChild(this.el.lastElementChild);
    }
  }
}
const Kt = new u(({ emojiCount: o, classes: e, category: t, pickerId: s, icon: i, i18n: r }) => `
  <section class="${e.emojiCategory}" role="tabpanel" aria-labelledby="${s}-category-${t.key}">
    <h3 data-category="${t.key}" class="${e.categoryName}">
      <i data-icon="${i}"></i>
      ${r.get(`categories.${t.key}`, t.message || t.key)}
    </h3>
    <div data-empty="${o === 0}" class="${e.recentEmojis}">
      <div data-view="emojis" data-render="sync"></div>
    </div>
    <div class="${e.noRecents}">
      ${r.get("recents.none")}
    </div>
  </section>
`, { mode: "async" });
class Ut extends he {
  constructor({ category: e, lazyLoader: t, provider: s }) {
    super({ category: e, showVariants: !1, lazyLoader: t, template: Kt }), this.provider = s;
  }
  initialize() {
    this.uiElements = {
      ...this.baseUIElements,
      recents: c.byClass(ie.recentEmojis)
    }, this.appEvents = {
      "recent:add": this.addRecent
    }, super.initialize();
  }
  async addRecent(e) {
    await this.emojiContainer.addOrUpdate(e), this.ui.recents.dataset.empty = "false";
  }
  async render() {
    var t;
    const e = (t = this.provider) == null ? void 0 : t.getRecents(this.options.maxRecents);
    return this.emojiContainer = this.viewFactory.create(Ht, {
      emojis: e,
      showVariants: !1,
      lazyLoader: this.lazyLoader,
      category: this.category.key
    }), await super.render({
      category: this.category,
      emojis: this.emojiContainer,
      emojiCount: e.length,
      icon: N[this.category.key]
    }), this.el;
  }
}
const qt = new u(({ classes: o, category: e, pickerId: t, icon: s, i18n: i }) => `
  <section class="${o.emojiCategory}" role="tabpanel" aria-labelledby="${t}-category-${e.key}">
    <h3 data-category="${e.key}" class="${o.categoryName}">
      <i data-icon="${s}"></i>
      ${i.get(`categories.${e.key}`, e.message || e.key)}
    </h3>
    <div data-view="emojis" data-render="sync"></div>
  </section>
`);
class Wt extends he {
  constructor({ category: e, lazyLoader: t }) {
    super({ template: qt, showVariants: !1, lazyLoader: t, category: e });
  }
  initialize() {
    this.uiElements = { ...this.baseUIElements }, super.initialize();
  }
  async render() {
    return this.emojiContainer = this.viewFactory.create($, {
      emojis: this.customEmojis,
      showVariants: this.showVariants,
      lazyLoader: this.lazyLoader,
      category: this.category.key
    }), super.render({
      category: this.category,
      emojis: this.emojiContainer,
      emojiCount: this.customEmojis.length,
      icon: N[this.category.key]
    });
  }
}
class Te {
  constructor() {
    this.elements = /* @__PURE__ */ new Map();
  }
  lazyLoad(e, t) {
    return this.elements.set(e, t), e;
  }
  observe(e) {
    if (window.IntersectionObserver) {
      const t = new IntersectionObserver(
        (s) => {
          s.filter((i) => i.intersectionRatio > 0).map((i) => i.target).forEach((i) => {
            const r = this.elements.get(i);
            r == null || r(), t.unobserve(i);
          });
        },
        {
          root: e
        }
      );
      this.elements.forEach((s, i) => {
        t.observe(i);
      });
    } else
      this.elements.forEach((t) => {
        t();
      });
  }
}
const ye = p("emojiArea"), Gt = new u(({ classes: o }) => `
  <div class="${o.emojiArea}">
    <div data-placeholder="emojis"></div>
  </div>
`, { mode: "async" }), Jt = {
  recents: Ut,
  custom: Wt
};
function Zt(o) {
  return Jt[o.key] || Nt;
}
function Yt(o) {
  return !o || o === "button" ? {
    row: "first",
    offset: 0
  } : o;
}
class Qt extends c {
  constructor({ categoryTabs: e, categories: t, emojiVersion: s }) {
    super({ template: Gt, classes: ye }), this.selectedCategory = 0, this.scrollListenerState = "active", this.lazyLoader = new Te(), this.categoryTabs = e, this.categories = t, this.emojiVersion = s, this.handleScroll = Ne(this.handleScroll.bind(this), 100);
  }
  initialize() {
    this.appEvents = {
      "category:select": this.handleCategorySelect,
      "category:previous": this.focusPreviousCategory,
      "category:next": this.focusNextCategory,
      "focus:change": this.updateFocusedCategory
    }, this.uiElements = { emojis: c.byClass(ye.emojiArea) }, this.uiEvents = [c.uiEvent("scroll", this.handleScroll)], super.initialize();
  }
  get focusableEmoji() {
    return this.el.querySelector('[tabindex="0"]');
  }
  async render() {
    this.emojiCategories = this.categories.map(this.createCategory, this);
    const e = {};
    return this.categories.forEach((t, s) => {
      e[`emojis-${t.key}`] = this.emojiCategories[s];
    }), await super.render({
      emojis: await Promise.all(this.emojiCategories.map((t) => t.render()))
    }), this.lazyLoader.observe(this.el), this.el;
  }
  destroy() {
    super.destroy(), this.emojiCategories.forEach((e) => {
      var t;
      (t = this.observer) == null || t.unobserve(e.el), e.destroy();
    });
  }
  handleCategorySelect(e, t) {
    this.el.style.overflow = "hidden", this.selectCategory(e, t), this.el.style.overflow = "auto";
  }
  createCategory(e) {
    const t = Zt(e);
    return this.viewFactory.create(t, {
      category: e,
      showVariants: !0,
      lazyLoader: this.lazyLoader,
      emojiVersion: this.emojiVersion,
      provider: this.options.recentsProvider
    });
  }
  determineInitialCategory() {
    var e;
    return this.options.initialCategory && this.categories.find((t) => t.key === this.options.initialCategory) ? this.options.initialCategory : (e = this.categories.find((t) => t.key !== "recents")) == null ? void 0 : e.key;
  }
  determineFocusTarget(e) {
    const t = this.emojiCategories.find((s) => s.category.key === e);
    return this.options.initialEmoji && (t == null ? void 0 : t.el.querySelector(`[data-emoji="${this.options.initialEmoji}"]`)) ? this.options.initialEmoji : "button";
  }
  reset(e = !0) {
    this.events.emit("preview:hide");
    const t = this.determineInitialCategory();
    t && (this.selectCategory(t, {
      focus: this.determineFocusTarget(t),
      performFocus: e,
      scroll: "jump"
    }), this.selectedCategory = this.getCategoryIndex(t));
  }
  getCategoryIndex(e) {
    return this.categories.findIndex((t) => t.key === e);
  }
  focusPreviousCategory(e) {
    this.selectedCategory > 0 && this.focusCategory(this.selectedCategory - 1, { row: "last", offset: e != null ? e : this.options.emojisPerRow });
  }
  focusNextCategory(e) {
    this.selectedCategory < this.categories.length - 1 && this.focusCategory(this.selectedCategory + 1, { row: "first", offset: e != null ? e : 0 });
  }
  focusCategory(e, t) {
    this.selectCategory(e, {
      focus: t,
      performFocus: !0
    });
  }
  async selectCategory(e, t = {}) {
    var l;
    this.scrollListenerState = "suspend";
    const { focus: s, performFocus: i, scroll: r } = {
      performFocus: !1,
      ...t
    };
    this.emojiCategories[this.selectedCategory].setActive(!1);
    const a = this.selectedCategory = typeof e == "number" ? e : this.getCategoryIndex(e);
    (l = this.categoryTabs) == null || l.setActiveTab(this.selectedCategory, {
      performFocus: i,
      scroll: s === "button"
    });
    const n = this.emojiCategories[a].el.offsetTop;
    this.emojiCategories[a].setActive(!0, Yt(s), s !== "button" && i), r && (this.el.scrollTop = n), this.scrollListenerState = "resume";
  }
  updateFocusedCategory(e) {
    var t;
    this.categories[this.selectedCategory].key !== e && (this.scrollListenerState = "suspend", this.selectedCategory = this.getCategoryIndex(e), (t = this.categoryTabs) == null || t.setActiveTab(this.selectedCategory, {
      changeFocusable: !1,
      performFocus: !1
    }), this.scrollListenerState = "resume");
  }
  handleScroll() {
    if (this.scrollListenerState === "suspend" || !this.categoryTabs)
      return;
    if (this.scrollListenerState === "resume") {
      this.scrollListenerState = "active";
      return;
    }
    const e = this.el.scrollTop, t = this.el.scrollHeight - this.el.offsetHeight, s = this.emojiCategories.findIndex((r, a) => {
      var n;
      return e < ((n = this.emojiCategories[a + 1]) == null ? void 0 : n.el.offsetTop);
    }), i = {
      changeFocusable: !1,
      performFocus: !1,
      scroll: !1
    };
    e === 0 ? this.categoryTabs.setActiveTab(0, i) : Math.floor(e) === Math.floor(t) || s < 0 ? this.categoryTabs.setActiveTab(this.categories.length - 1, i) : this.categoryTabs.setActiveTab(s, i);
  }
}
const Xt = new u(({ classList: o, classes: e, icon: t, message: s }) => `
<div class="${o}" role="alert">
  <div class="${e.iconContainer}"><i data-size="10x" data-icon="${t}"></i></div>
  <h3 class="${e.title}">${s}</h3>
</div>
`), fe = p("error", "iconContainer", "title");
class re extends c {
  constructor({ message: e, icon: t = "warning", template: s = Xt, className: i }) {
    super({ template: s, classes: fe }), this.message = e, this.icon = t, this.className = i;
  }
  renderSync() {
    const e = [fe.error, this.className].join(" ").trim();
    return super.renderSync({ message: this.message, icon: this.icon, classList: e });
  }
}
const eo = new u(({ classList: o, classes: e, icon: t, i18n: s, message: i }) => `
  <div class="${o}" role="alert">
    <div class="${e.icon}"><i data-size="10x" data-icon="${t}"></i></div>
    <h3 class="${e.title}">${i}</h3>
    <button type="button">${s.get("retry")}</button>
  </div>
`), to = p("dataError");
class oo extends re {
  constructor({ message: e }) {
    super({ message: e, template: eo, className: to.dataError });
  }
  initialize() {
    this.uiElements = { retryButton: "button" }, this.uiEvents = [c.childEvent("retryButton", "click", this.onRetry)], super.initialize();
  }
  async onRetry() {
    this.emojiData ? await this.emojiData.delete() : await this.options.dataStore.deleteDatabase(this.options.locale), this.events.emit("reinitialize");
    const e = await ce(this.options.locale, this.options.dataStore, this.options.messages, this.options.emojiData, this.emojiData);
    this.viewFactory.setEmojiData(e), this.events.emit("data:ready", e);
  }
}
const j = p(
  "preview",
  "previewEmoji",
  "previewName",
  "tagList",
  "tag"
), so = new u(({ classes: o, tag: e }) => `
  <li class="${o.tag}">${e}</li>
`), io = new u(({ classes: o }) => `
  <div class="${o.preview}">
    <div class="${o.previewEmoji}"></div>
    <div class="${o.previewName}"></div>
    <ul class="${o.tagList}"></ul>
  </div>
`);
class ro extends c {
  constructor() {
    super({ template: io, classes: j });
  }
  initialize() {
    this.uiElements = {
      emoji: c.byClass(j.previewEmoji),
      name: c.byClass(j.previewName),
      tagList: c.byClass(j.tagList)
    }, this.appEvents = {
      "preview:show": this.showPreview,
      "preview:hide": this.hidePreview
    }, super.initialize();
  }
  showPreview(e, t) {
    if (w(this.ui.emoji, t), this.ui.name.textContent = e.label, e.tags) {
      this.ui.tagList.style.display = "flex";
      const s = e.tags.map((i) => so.renderSync({ tag: i, classes: j }));
      w(this.ui.tagList, ...s);
    }
  }
  hidePreview() {
    V(this.ui.emoji), V(this.ui.name), V(this.ui.tagList);
  }
}
const ao = new u(({ classes: o, i18n: e }) => `
  <button title="${e.get("search.clear")}" class="${o.clearSearchButton}">
    <i data-icon="xmark"></i>
  </button>
`), no = new u(({ classes: o, i18n: e }) => `
<div class="${o.searchContainer}">
  <input class="${o.searchField}" placeholder="${e.get("search")}">
  <span class="${o.searchAccessory}"></span>
</div>
`, { mode: "async" }), _ = p(
  "searchContainer",
  "searchField",
  "clearButton",
  "searchAccessory",
  "clearSearchButton",
  "notFound"
);
class co extends c {
  constructor({ categories: e, emojiVersion: t }) {
    super({ template: no, classes: _ }), this.categories = e.filter((s) => s.key !== "recents"), this.emojiVersion = t, this.search = He(this.search.bind(this), 100);
  }
  initialize() {
    this.uiElements = {
      searchField: c.byClass(_.searchField),
      searchAccessory: c.byClass(_.searchAccessory)
    }, this.uiEvents = [
      c.childEvent("searchField", "keydown", this.onKeyDown),
      c.childEvent("searchField", "input", this.onSearchInput)
    ], super.initialize();
  }
  async render() {
    return await super.render(), this.searchIcon = Pe("search"), this.notFoundMessage = this.viewFactory.create(re, {
      message: this.i18n.get("search.notFound"),
      className: _.notFound,
      icon: "sad"
    }), this.notFoundMessage.renderSync(), this.errorMessage = this.viewFactory.create(re, { message: this.i18n.get("search.error") }), this.errorMessage.renderSync(), this.clearSearchButton = ao.render({
      classes: _,
      i18n: this.i18n
    }), this.clearSearchButton.addEventListener("click", (e) => this.onClearSearch(e)), this.searchField = this.ui.searchField, this.showSearchIcon(), this.el;
  }
  showSearchIcon() {
    this.showSearchAccessory(this.searchIcon);
  }
  showClearSearchButton() {
    this.showSearchAccessory(this.clearSearchButton);
  }
  showSearchAccessory(e) {
    w(this.ui.searchAccessory, e);
  }
  clear() {
    this.searchField.value = "", this.showSearchIcon();
  }
  focus() {
    this.searchField.focus();
  }
  onClearSearch(e) {
    var t;
    e.stopPropagation(), this.searchField.value = "", (t = this.resultsContainer) == null || t.destroy(), this.resultsContainer = null, this.showSearchIcon(), this.events.emit("content:show"), this.searchField.focus();
  }
  handleResultsKeydown(e) {
    this.resultsContainer && e.key === "Escape" && this.onClearSearch(e);
  }
  onKeyDown(e) {
    var t;
    e.key === "Escape" && this.searchField.value ? this.onClearSearch(e) : (e.key === "Enter" || e.key === "ArrowDown") && this.resultsContainer && (e.preventDefault(), (t = this.resultsContainer.el.querySelector('[tabindex="0"]')) == null || t.focus());
  }
  onSearchInput(e) {
    this.searchField.value ? (this.showClearSearchButton(), this.search()) : this.onClearSearch(e);
  }
  async search() {
    var e;
    if (!!this.searchField.value)
      try {
        const t = await this.emojiData.searchEmojis(
          this.searchField.value,
          this.customEmojis,
          this.emojiVersion,
          this.categories
        );
        if (this.events.emit("preview:hide"), t.length) {
          const s = new Te();
          this.resultsContainer = this.viewFactory.create($, {
            emojis: t,
            fullHeight: !0,
            showVariants: !0,
            lazyLoader: s
          }), this.resultsContainer.renderSync(), (e = this.resultsContainer) != null && e.el && (s.observe(this.resultsContainer.el), this.resultsContainer.setActive(!0, { row: 0, offset: 0 }, !1), this.resultsContainer.el.addEventListener("keydown", (i) => this.handleResultsKeydown(i)), this.events.emit("content:show", this.resultsContainer));
        } else
          this.events.emit("content:show", this.notFoundMessage);
      } catch {
        this.events.emit("content:show", this.errorMessage);
      }
  }
}
const lo = new u(({ classes: o }) => `
  <div class="${o.variantOverlay}">
    <div class="${o.variantPopup}">
      <div data-view="emojis" data-render="sync"></div>
    </div>
  </div>
`), ve = p(
  "variantOverlay",
  "variantPopup"
), J = {
  easing: "ease-in-out",
  duration: 250,
  fill: "both"
}, we = {
  opacity: [0, 1]
}, be = {
  opacity: [0, 1],
  transform: ["scale3d(0.8, 0.8, 0.8)", "scale3d(1, 1, 1)"]
};
class ho extends c {
  constructor({ emoji: e, parent: t }) {
    super({ template: lo, classes: ve, parent: t }), this.focusedEmojiIndex = 0, this.focusTrap = new ot(), this.animateShow = () => Promise.all([
      I(this.el, we, J, this.options),
      I(this.ui.popup, be, J, this.options)
    ]), this.emoji = e;
  }
  initialize() {
    this.uiElements = {
      popup: c.byClass(ve.variantPopup)
    }, this.uiEvents = [
      c.uiEvent("click", this.handleClick),
      c.uiEvent("keydown", this.handleKeydown)
    ], super.initialize();
  }
  animateHide() {
    const e = { ...J, direction: "reverse" };
    return Promise.all([
      I(this.el, we, e, this.options),
      I(this.ui.popup, be, e, this.options)
    ]);
  }
  async hide() {
    await this.animateHide(), this.events.emit("variantPopup:hide");
  }
  handleKeydown(e) {
    e.key === "Escape" && (this.hide(), e.stopPropagation());
  }
  handleClick(e) {
    this.ui.popup.contains(e.target) || this.hide();
  }
  getEmoji(e) {
    return this.renderedEmojis[e];
  }
  setFocusedEmoji(e) {
    const t = this.getEmoji(this.focusedEmojiIndex);
    t.tabIndex = -1, this.focusedEmojiIndex = e;
    const s = this.getEmoji(this.focusedEmojiIndex);
    s.tabIndex = 0, s.focus();
  }
  destroy() {
    this.emojiContainer.destroy(), this.focusTrap.deactivate(), super.destroy();
  }
  renderSync() {
    const e = {
      ...this.emoji,
      skins: null
    }, t = (this.emoji.skins || []).map((i) => ({
      ...i,
      label: this.emoji.label,
      tags: this.emoji.tags
    })), s = [e, ...t];
    return this.emojiContainer = this.viewFactory.create($, {
      emojis: s,
      preview: !1
    }), super.renderSync({ emojis: this.emojiContainer }), s.length < this.options.emojisPerRow && this.el.style.setProperty("--emojis-per-row", s.length.toString()), this.el;
  }
  activate() {
    this.emojiContainer.setActive(!0, { row: 0, offset: 0 }, !0), this.focusTrap.activate(this.el);
  }
}
const mo = new u(({ classes: o, i18n: e, category: t, pickerId: s, icon: i }) => `
<li class="${o.categoryTab}">
  <button
    aria-selected="false"
    role="tab"
    class="${o.categoryButton}"
    tabindex="-1"
    title="${e.get(`categories.${t.key}`, t.message || t.key)}"
    type="button"
    data-category="${t.key}"
    id="${s}-category-${t.key}"
  >
    <i data-icon="${i}"></i>
</li>
`), Z = p(
  "categoryTab",
  "categoryTabActive",
  "categoryButton"
);
class uo extends c {
  constructor({ category: e, icon: t }) {
    super({ template: mo, classes: Z }), this.isActive = !1, this.category = e, this.icon = t;
  }
  initialize() {
    this.uiElements = {
      button: c.byClass(Z.categoryButton)
    }, this.uiEvents = [
      c.childEvent("button", "click", this.selectCategory),
      c.childEvent("button", "focus", this.selectCategory)
    ], super.initialize();
  }
  renderSync() {
    return super.renderSync({
      category: this.category,
      icon: this.icon
    }), this.ui.button.ariaSelected = "false", this.el;
  }
  setActive(e, t = {}) {
    const { changeFocusable: s, performFocus: i, scroll: r } = {
      changeFocusable: !0,
      performFocus: !0,
      scroll: !0,
      ...t
    };
    this.el.classList.toggle(Z.categoryTabActive, e), s && (this.ui.button.tabIndex = e ? 0 : -1, this.ui.button.ariaSelected = e.toString()), e && i && (this.ui.button.focus(), r && this.events.emit("category:select", this.category.key, { scroll: "animate", focus: "button", performFocus: !1 })), this.isActive = e;
  }
  selectCategory() {
    this.isActive || this.events.emit("category:select", this.category.key, { scroll: "animate", focus: "button", performFocus: !0 });
  }
}
const po = new u(({ classes: o }) => `
  <div class="${o.categoryButtonsContainer}">
    <ul role="tablist" class="${o.categoryButtons}">
      <div data-placeholder="tabs"></div>
    </ul>
  </div>
`), go = p("categoryButtons", "categoryButtonsContainer");
class yo extends c {
  constructor({ categories: e }) {
    super({ template: po, classes: go }), this.activeCategoryIndex = 0, this.categories = e;
  }
  initialize() {
    this.keyBindings = {
      ArrowLeft: this.stepSelectedTab(-1),
      ArrowRight: this.stepSelectedTab(1)
    }, this.uiEvents = [
      c.uiEvent("scroll", this.checkOverflow)
    ], super.initialize();
  }
  checkOverflow() {
    const e = Math.abs(this.el.scrollLeft - (this.el.scrollWidth - this.el.offsetWidth)) > 1, t = this.el.scrollLeft > 0;
    this.el.className = "categoryButtonsContainer", t && e ? this.el.classList.add("has-overflow-both") : t ? this.el.classList.add("has-overflow-left") : e && this.el.classList.add("has-overflow-right");
  }
  renderSync() {
    return this.tabViews = this.categories.map((e) => this.viewFactory.create(uo, { category: e, icon: N[e.key] })), super.renderSync({
      tabs: this.tabViews.map((e) => e.renderSync())
    }), this.el;
  }
  get currentCategory() {
    return this.categories[this.activeCategoryIndex];
  }
  get currentTabView() {
    return this.tabViews[this.activeCategoryIndex];
  }
  setActiveTab(e, t = {}) {
    this.checkOverflow();
    const s = this.currentTabView, i = this.tabViews[e];
    s.setActive(!1, t), i.setActive(!0, t), this.activeCategoryIndex = e;
  }
  getTargetCategory(e) {
    return e < 0 ? this.categories.length - 1 : e >= this.categories.length ? 0 : e;
  }
  stepSelectedTab(e) {
    return () => {
      const t = this.activeCategoryIndex + e;
      this.setActiveTab(this.getTargetCategory(t), {
        changeFocusable: !0,
        performFocus: !0
      });
    };
  }
}
const fo = [
  { version: 15, emoji: String.fromCodePoint(129768) },
  { version: 14, emoji: String.fromCodePoint(128733) },
  { version: 13, emoji: String.fromCodePoint(129729) },
  { version: 12, emoji: String.fromCodePoint(129449) },
  { version: 11, emoji: String.fromCodePoint(129463) },
  { version: 5, emoji: String.fromCodePoint(129322) },
  { version: 4, emoji: String.fromCodePoint(9877) },
  { version: 3, emoji: String.fromCodePoint(129314) },
  { version: 2, emoji: String.fromCodePoint(128488) },
  { version: 1, emoji: String.fromCodePoint(128512) }
];
function vo() {
  var e;
  const o = fo.find((t) => wo(t.emoji));
  return (e = o == null ? void 0 : o.version) != null ? e : 1;
}
function wo(o) {
  const e = document.createElement("canvas").getContext("2d");
  if (e)
    return e.textBaseline = "top", e.font = "32px Arial", e.fillText(o, 0, 0), e.getImageData(16, 16, 1, 1).data[0] !== 0;
}
function Y(o, e) {
  return Array.from({ length: o }, () => e).join("");
}
function bo({ showHeader: o, classes: e }) {
  return o ? `
    <header class="${e.header}">
      <div data-view="search"></div>
      <div data-view="categoryTabs" data-render="sync"></div>
    </header>
  ` : "";
}
function Co(o) {
  const { classes: e, theme: t, className: s = "" } = o;
  return `
    <div class="picmo__picker ${e.picker} ${t} ${s}">
      ${bo(o)}
      <div class="${e.content}">
        <div data-view="emojiArea"></div>
      </div>
      <div data-view="preview"></div>
    </div>
  `;
}
function jo(o) {
  const { emojiCount: e, classes: t, theme: s, className: i, categoryCount: r } = o, a = ({ showSearch: d, classes: h }) => d ? `
    <div class="${h.searchSkeleton}">
      <div class="${h.searchInput} ${h.placeholder}"></div>
    </div>
  ` : "", n = ({ showCategoryTabs: d, classes: h }) => d ? `
    <div class="${h.categoryTabsSkeleton}">
      ${Y(r, `<div class="${h.placeholder} ${h.categoryTab}"></div>`)}
    </div>
  ` : "", l = ({ showHeader: d, classes: h }) => d ? `
    <header class="${h.headerSkeleton}">
      ${a(o)}
      ${n(o)}
    </header>
  ` : "", m = ({ showPreview: d, classes: h }) => d ? `
    <div class="${h.previewSkeleton}">
      <div class="${h.placeholder} ${h.previewEmoji}"></div>
      <div class="${h.placeholder} ${h.previewName}"></div>
      <ul class="${h.tagList}">
        ${Y(3, `<li class="${h.placeholder} ${h.tag}"></li>`)}
      </ul>
    </div>
  ` : "";
  return `
    <div class="picmo__picker ${t.skeleton} ${t.picker} ${s} ${i}">
      ${l(o)}
      <div class="${t.contentSkeleton}">
        <div class="${t.placeholder} ${t.categoryName}"></div>
        <div class="${t.emojiGrid}">
          ${Y(e, `<div class="${t.placeholder} ${t.emoji}"></div>`)}
        </div>
      </div>
      ${m(o)}
    </div>
  `;
}
const _o = new u((o) => o.isLoaded ? Co(o) : jo(o)), T = p(
  "picker",
  "skeleton",
  "placeholder",
  "searchSkeleton",
  "searchInput",
  "categoryTabsSkeleton",
  "headerSkeleton",
  "categoryTab",
  "contentSkeleton",
  "categoryName",
  "emojiGrid",
  "emoji",
  "previewSkeleton",
  "previewEmoji",
  "previewName",
  "tagList",
  "tag",
  "overlay",
  "content",
  "fullHeight",
  "pluginContainer",
  "header"
), R = {
  emojisPerRow: "--emojis-per-row",
  visibleRows: "--row-count",
  emojiSize: "--emoji-size"
};
class ko extends c {
  constructor() {
    super({ template: _o, classes: T }), this.pickerReady = !1, this.externalEvents = new Tt(), this.updaters = {
      styleProperty: (e) => (t) => this.el.style.setProperty(R[e], t.toString()),
      theme: (e) => {
        const t = this.options.theme, s = this.el.closest(`.${t}`);
        this.el.classList.remove(t), s == null || s.classList.remove(t), this.el.classList.add(e), s == null || s.classList.add(e);
      },
      className: (e) => {
        this.options.className && this.el.classList.remove(this.options.className), this.el.classList.add(e);
      },
      emojisPerRow: this.updateStyleProperty.bind(this, "emojisPerRow"),
      emojiSize: this.updateStyleProperty.bind(this, "emojiSize"),
      visibleRows: this.updateStyleProperty.bind(this, "visibleRows")
    };
  }
  initialize() {
    this.uiElements = {
      pickerContent: c.byClass(T.content),
      header: c.byClass(T.header)
    }, this.uiEvents = [
      c.uiEvent("keydown", this.handleKeyDown)
    ], this.appEvents = {
      error: this.onError,
      reinitialize: this.reinitialize,
      "data:ready": this.onDataReady,
      "content:show": this.showContent,
      "variantPopup:hide": this.hideVariantPopup,
      "emoji:select": this.selectEmoji
    }, super.initialize(), this.options.recentsProvider;
  }
  destroy() {
    var e, t;
    super.destroy(), (e = this.search) == null || e.destroy(), this.emojiArea.destroy(), (t = this.categoryTabs) == null || t.destroy(), this.events.removeAll(), this.externalEvents.removeAll();
  }
  clearRecents() {
    this.options.recentsProvider.clear();
  }
  addEventListener(e, t) {
    this.externalEvents.on(e, t);
  }
  removeEventListener(e, t) {
    this.externalEvents.off(e, t);
  }
  initializePickerView() {
    this.pickerReady && (this.showContent(), this.emojiArea.reset(!1));
  }
  handleKeyDown(e) {
    const t = e.ctrlKey || e.metaKey;
    e.key === "s" && t && this.search && (e.preventDefault(), this.search.focus());
  }
  buildChildViews() {
    return this.options.showPreview && (this.preview = this.viewFactory.create(ro)), this.options.showSearch && (this.search = this.viewFactory.create(co, {
      categories: this.categories,
      emojiVersion: this.emojiVersion
    })), this.options.showCategoryTabs && (this.categoryTabs = this.viewFactory.create(yo, {
      categories: this.categories
    })), this.currentView = this.emojiArea = this.viewFactory.create(Qt, {
      categoryTabs: this.categoryTabs,
      categories: this.categories,
      emojiVersion: this.emojiVersion
    }), [this.preview, this.search, this.emojiArea, this.categoryTabs];
  }
  setStyleProperties() {
    this.options.showSearch || this.el.style.setProperty("--search-height-full", "0px"), this.options.showCategoryTabs || (this.el.style.setProperty("--category-tabs-height", "0px"), this.el.style.setProperty("--category-tabs-offset", "0px")), this.options.showPreview || this.el.style.setProperty("--emoji-preview-height-full", "0px"), Object.keys(R).forEach((e) => {
      this.options[e] && this.el.style.setProperty(R[e], this.options[e].toString());
    });
  }
  updateStyleProperty(e, t) {
    this.el.style.setProperty(R[e], t.toString());
  }
  reinitialize() {
    this.renderSync();
  }
  onError(e) {
    const t = this.viewFactory.createWithOptions({ data: !1 }, oo, { message: this.i18n.get("error.load") }), s = this.el.offsetHeight || 375;
    throw this.el.style.height = `${s}px`, w(this.el, t.renderSync()), e;
  }
  async onDataReady(e) {
    const t = this.el;
    try {
      e ? this.emojiData = e : await this.emojiDataPromise, this.options.emojiVersion === "auto" ? this.emojiVersion = vo() || parseFloat(Me) : this.emojiVersion = this.options.emojiVersion, this.categories = await this.emojiData.getCategories(this.options);
      const [s, i, r, a] = this.buildChildViews();
      await super.render({
        isLoaded: !0,
        search: i,
        categoryTabs: a,
        emojiArea: r,
        preview: s,
        showHeader: Boolean(this.search || this.categoryTabs),
        theme: this.options.theme,
        className: this.options.className
      }), this.el.style.setProperty("--category-count", this.categories.length.toString()), this.pickerReady = !0, t.replaceWith(this.el), this.setStyleProperties(), this.initializePickerView(), this.setInitialFocus(), this.externalEvents.emit("data:ready");
    } catch (s) {
      this.events.emit("error", s);
    }
  }
  renderSync() {
    var t;
    let e = ((t = this.options.categories) == null ? void 0 : t.length) || 10;
    if (this.options.showRecents && (e += 1), super.renderSync({
      isLoaded: !1,
      theme: this.options.theme,
      className: this.options.className,
      showSearch: this.options.showSearch,
      showPreview: this.options.showPreview,
      showCategoryTabs: this.options.showCategoryTabs,
      showHeader: this.options.showSearch || this.options.showCategoryTabs,
      emojiCount: this.options.emojisPerRow * this.options.visibleRows,
      categoryCount: e
    }), this.el.style.setProperty("--category-count", e.toString()), !this.options.rootElement)
      throw new Error("Picker must be given a root element via the rootElement option");
    return w(this.options.rootElement, this.el), this.setStyleProperties(), this.pickerReady && this.initializePickerView(), this.el;
  }
  getInitialFocusTarget() {
    if (typeof this.options.autoFocus < "u")
      switch (this.options.autoFocus) {
        case "emojis":
          return this.emojiArea.focusableEmoji;
        case "search":
          return this.search;
        case "auto":
          return this.search || this.emojiArea.focusableEmoji;
        default:
          return null;
      }
    if (this.options.autoFocusSearch === !0)
      return console.warn("options.autoFocusSearch is deprecated, please use options.focusTarget instead"), this.search;
  }
  setInitialFocus() {
    var e;
    !this.pickerReady || (e = this.getInitialFocusTarget()) == null || e.focus();
  }
  reset(e = !0) {
    var t;
    this.pickerReady && (this.emojiArea.reset(e), this.showContent(this.emojiArea)), (t = this.search) == null || t.clear(), this.hideVariantPopup();
  }
  showContent(e = this.emojiArea) {
    var t, s;
    e !== this.currentView && (this.currentView !== this.emojiArea && ((t = this.currentView) == null || t.destroy()), this.ui.pickerContent.classList.toggle(T.fullHeight, e !== this.emojiArea), w(this.ui.pickerContent, e.el), this.currentView = e, e === this.emojiArea ? (this.emojiArea.reset(), this.categoryTabs && this.ui.header.appendChild(this.categoryTabs.el)) : (s = this.categoryTabs) == null || s.el.remove());
  }
  hideVariantPopup() {
    var e;
    (e = this.variantPopup) == null || e.destroy();
  }
  isPickerClick(e) {
    var r, a;
    const t = e.target, s = this.el.contains(t), i = (a = (r = this.variantPopup) == null ? void 0 : r.el) == null ? void 0 : a.contains(t);
    return s || i;
  }
  async selectEmoji({ emoji: e }) {
    var t, s;
    ((t = e.skins) == null ? void 0 : t.length) && this.options.showVariants && !this.isVariantPopupOpen ? this.showVariantPopup(e) : (await ((s = this.variantPopup) == null ? void 0 : s.animateHide()), this.events.emit("variantPopup:hide"), await this.emitEmoji(e));
  }
  get isVariantPopupOpen() {
    return this.variantPopup && !this.variantPopup.isDestroyed;
  }
  async showVariantPopup(e) {
    const t = document.activeElement;
    this.events.once("variantPopup:hide", () => {
      t == null || t.focus();
    }), this.variantPopup = this.viewFactory.create(ho, { emoji: e, parent: this.el }), this.el.appendChild(this.variantPopup.renderSync()), this.variantPopup.activate();
  }
  async emitEmoji(e) {
    this.externalEvents.emit("emoji:select", await this.renderer.doEmit(e)), this.options.recentsProvider.addOrUpdateRecent(e, this.options.maxRecents), this.events.emit("recent:add", e);
  }
  updateOptions(e) {
    Object.keys(e).forEach((t) => {
      this.updaters[t](e[t]);
    }), Object.assign(this.options, e);
  }
}
class xo {
  constructor({ events: e, i18n: t, renderer: s, emojiData: i, options: r, customEmojis: a = [], pickerId: n }) {
    this.events = e, this.i18n = t, this.renderer = s, this.emojiData = i, this.options = r, this.customEmojis = a, this.pickerId = n;
  }
  setEmojiData(e) {
    this.emojiData = Promise.resolve(e);
  }
  createWithOptions(e = {}, t, ...s) {
    const i = new t(...s);
    return i.setPickerId(this.pickerId), i.setEvents(this.events), i.setI18n(this.i18n), i.setRenderer(this.renderer), e.data !== !1 && i.setEmojiData(this.emojiData), i.setOptions(this.options), i.setCustomEmojis(this.customEmojis), i.viewFactory = this, i.initialize(), i;
  }
  create(e, ...t) {
    return this.createWithOptions({}, e, ...t);
  }
}
var L;
class Eo {
  constructor(e = {}) {
    f(this, L, void 0);
    A(this, L, new Map(Object.entries(e)));
  }
  get(e, t = e) {
    return y(this, L).get(e) || t;
  }
}
L = new WeakMap();
function So(o, e) {
  e === void 0 && (e = {});
  var t = e.insertAt;
  if (!(!o || typeof document > "u")) {
    var s = document.head || document.getElementsByTagName("head")[0], i = document.createElement("style");
    i.type = "text/css", t === "top" && s.firstChild ? s.insertBefore(i, s.firstChild) : s.appendChild(i), i.styleSheet ? i.styleSheet.cssText = o : i.appendChild(document.createTextNode(o));
  }
}
function Fo() {
  let o = !1;
  return function(t) {
    At.injectStyles && !o && (So(t), o = !0);
  };
}
const Po = `.picmo__picker .picmo__icon{width:1.25em;height:1em;fill:currentColor}.picmo__icon-small{font-size:.8em}.picmo__icon-medium{font-size:1em}.picmo__icon-large{font-size:1.25em}.picmo__icon-2x{font-size:2em}.picmo__icon-3x{font-size:3em}.picmo__icon-4x{font-size:4em}.picmo__icon-5x{font-size:5em}.picmo__icon-8x{font-size:8em}.picmo__icon-10x{font-size:10em}.picmo__light,.picmo__auto{color-scheme:light;--accent-color: #4f46e5;--background-color: #f9fafb;--border-color: #cccccc;--category-name-background-color: #f9fafb;--category-name-button-color: #999999;--category-name-text-color: hsl(214, 30%, 50%);--category-tab-active-background-color: rgba(255, 255, 255, .6);--category-tab-active-color: var(--accent-color);--category-tab-color: #666;--category-tab-highlight-background-color: rgba(0, 0, 0, .15);--error-color-dark: hsl(0, 100%, 45%);--error-color: hsl(0, 100%, 40%);--focus-indicator-background-color: hsl(198, 65%, 85%);--focus-indicator-color: #333333;--hover-background-color: #c7d2fe;--placeholder-background-color: #cccccc;--search-background-color: #f9fafb;--search-focus-background-color: #ffffff;--search-icon-color: #999999;--search-placeholder-color: #71717a;--secondary-background-color: #e2e8f0;--secondary-text-color: #666666;--tag-background-color: rgba(162, 190, 245, .3);--text-color: #000000;--variant-popup-background-color: #ffffff}.picmo__dark{color-scheme:dark;--accent-color: #A580F9;--background-color: #333333;--border-color: #666666;--category-name-background-color: #333333;--category-name-button-color: #eeeeee;--category-name-text-color: #ffffff;--category-tab-active-background-color: #000000;--category-tab-active-color: var(--accent-color);--category-tab-color: #cccccc;--category-tab-highlight-background-color: #4A4A4A;--error-color-dark: hsl(0, 7%, 3%);--error-color: hsl(0, 30%, 60%);--focus-indicator-background-color: hsl(0, 0%, 50%);--focus-indicator-color: #999999;--hover-background-color: hsla(0, 0%, 40%, .85);--image-placeholder-color: #ffffff;--placeholder-background-color: #666666;--search-background-color: #71717a;--search-focus-background-color: #52525b;--search-icon-color: #cccccc;--search-placeholder-color: #d4d4d8;--secondary-background-color: #000000;--secondary-text-color: #999999;--tag-background-color: rgba(162, 190, 245, .3);--text-color: #ffffff;--variant-popup-background-color: #333333}@media (prefers-color-scheme: dark){.picmo__auto{color-scheme:dark;--accent-color: #A580F9;--background-color: #333333;--border-color: #666666;--category-name-background-color: #333333;--category-name-button-color: #eeeeee;--category-name-text-color: #ffffff;--category-tab-active-background-color: #000000;--category-tab-active-color: var(--accent-color);--category-tab-color: #cccccc;--category-tab-highlight-background-color: #4A4A4A;--error-color-dark: hsl(0, 7%, 3%);--error-color: hsl(0, 30%, 60%);--focus-indicator-background-color: hsl(0, 0%, 50%);--focus-indicator-color: #999999;--hover-background-color: hsla(0, 0%, 40%, .85);--image-placeholder-color: #ffffff;--placeholder-background-color: #666666;--search-background-color: #71717a;--search-focus-background-color: #52525b;--search-icon-color: #cccccc;--search-placeholder-color: #d4d4d8;--secondary-background-color: #000000;--secondary-text-color: #999999;--tag-background-color: rgba(162, 190, 245, .3);--text-color: #ffffff;--variant-popup-background-color: #333333}}.picmo__picker .picmo__categoryButtonsContainer{overflow:auto;padding:2px 0}.picmo__picker .picmo__categoryButtonsContainer.picmo__has-overflow-right{mask-image:linear-gradient(270deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%);-webkit-mask-image:linear-gradient(270deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%)}.picmo__picker .picmo__categoryButtonsContainer.picmo__has-overflow-left{mask-image:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%);-webkit-mask-image:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%)}.picmo__picker .picmo__categoryButtonsContainer.picmo__has-overflow-both{mask-image:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%,rgba(255,255,255,1) 90%,rgba(255,255,255,0) 100%);-webkit-mask-image:linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 10%,rgba(255,255,255,1) 90%,rgba(255,255,255,0) 100%)}.picmo__picker .picmo__categoryButtons{display:flex;flex-direction:row;gap:var(--tab-gap);margin:0;padding:0 .5em;align-items:center;height:var(--category-tabs-height);box-sizing:border-box;width:100%;justify-content:space-between;position:relative;list-style-type:none;justify-self:center;max-width:min(23.55rem,calc(var(--category-count, 1) * 2.5rem))}.picmo__picker .picmo__categoryButtons .picmo__categoryTab{display:flex;align-items:center;transition:all .1s;width:2em}.picmo__picker .picmo__categoryButtons .picmo__categoryTab.picmo__categoryTabActive .picmo__categoryButton{color:var(--category-tab-active-color);background:linear-gradient(rgba(255,255,255,.75) 0%,rgba(255,255,255,.75) 100%),linear-gradient(var(--category-tab-active-color) 0%,var(--category-tab-active-color) 100%);border:2px solid var(--category-tab-active-color)}.picmo__picker .picmo__categoryButtons .picmo__categoryTab.picmo__categoryTabActive .picmo__categoryButton:hover{background-color:var(--category-tab-active-background-color)}.picmo__picker .picmo__categoryButtons .picmo__categoryTab button.picmo__categoryButton{border-radius:5px;background:transparent;border:2px solid transparent;color:var(--category-tab-color);cursor:pointer;padding:2px;vertical-align:middle;display:flex;align-items:center;justify-content:center;font-size:1.2rem;width:1.6em;height:1.6em;transition:all .1s}.picmo__picker .picmo__categoryButtons .picmo__categoryTab button.picmo__categoryButton:is(img){width:var(--category-tab-size);height:var(--category-tab-size)}.picmo__picker .picmo__categoryButtons .picmo__categoryTab button.picmo__categoryButton:hover{background:var(--category-tab-highlight-background-color)}.picmo__dataError [data-icon]{opacity:.8}@keyframes appear{0%{opacity:0}to{opacity:.8}}@keyframes appear-grow{0%{opacity:0;transform:scale(.8)}to{opacity:.8;transform:scale(1)}}.picmo__picker .picmo__error{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:var(--secondary-text-color)}.picmo__picker .picmo__error .picmo__iconContainer{opacity:.8;animation:appear-grow .25s cubic-bezier(.175,.885,.32,1.275);--color-primary: var(--error-color);--color-secondary: var(--error-color-dark)}.picmo__picker .picmo__error .picmo__title{animation:appear .25s;animation-delay:50ms;animation-fill-mode:both}.picmo__picker .picmo__error button{padding:8px 16px;cursor:pointer;background:var(--background-color);border:1px solid var(--text-color);border-radius:5px;color:var(--text-color)}.picmo__picker .picmo__error button:hover{background:var(--text-color);color:var(--background-color)}.picmo__emojiButton{background:transparent;border:none;border-radius:15px;cursor:pointer;display:flex;font-family:var(--emoji-font);font-size:var(--emoji-size);height:100%;justify-content:center;align-items:center;margin:0;overflow:hidden;padding:0;width:100%}.picmo__emojiButton:hover{background:var(--hover-background-color)}.picmo__emojiButton:focus{border-radius:0;background:var(--focus-indicator-background-color);outline:1px solid var(--focus-indicator-color)}.picmo__picker .picmo__emojiArea{height:var(--emoji-area-height);overflow-y:auto;position:relative}.picmo__picker .picmo__emojiCategory{position:relative}.picmo__picker .picmo__emojiCategory .picmo__categoryName{font-size:.9em;padding:.5rem;margin:0;background:var(--category-name-background-color);color:var(--category-name-text-color);top:0;z-index:1;display:grid;gap:4px;grid-template-columns:auto 1fr auto;align-items:center;line-height:1;box-sizing:border-box;height:var(--category-name-height);justify-content:flex-start;text-transform:uppercase}.picmo__picker .picmo__emojiCategory .picmo__categoryName button{background:transparent;border:none;display:flex;align-items:center;cursor:pointer;color:var(--category-name-button-color)}.picmo__picker .picmo__emojiCategory .picmo__categoryName button:hover{opacity:1}.picmo__picker .picmo__emojiCategory .picmo__noRecents{color:var(--secondary-text-color);grid-column:1 / span var(--emojis-per-row);font-size:.9em;text-align:center;display:flex;align-items:center;justify-content:center;min-height:calc(var(--emoji-size) * var(--emoji-size-multiplier))}.picmo__picker .picmo__emojiCategory .picmo__recentEmojis[data-empty=true]{display:none}:is(.picmo__picker .picmo__emojiCategory) .picmo__recentEmojis[data-empty=false]+div{display:none}.picmo__picker .picmo__emojiContainer{display:grid;justify-content:space-between;gap:1px;padding:0 .5em;grid-template-columns:repeat(var(--emojis-per-row),calc(var(--emoji-size) * var(--emoji-size-multiplier)));grid-auto-rows:calc(var(--emoji-size) * var(--emoji-size-multiplier));align-items:center;justify-items:center}.picmo__picker.picmo__picker{--border-radius: 5px;--emoji-area-height: calc( (var(--row-count) * var(--emoji-size) * var(--emoji-size-multiplier)) + var(--category-name-height) );--content-height: var(--emoji-area-height);--emojis-per-row: 8;--row-count: 6;--emoji-preview-margin: 4px;--emoji-preview-height: calc(var(--emoji-preview-size) + 1em + 1px);--emoji-preview-height-full: calc(var(--emoji-preview-height) + var(--emoji-preview-margin));--emoji-preview-size: 2.75em;--emoji-size: 2rem;--emoji-size-multiplier: 1.3;--content-margin: 8px;--category-tabs-height:calc(1.5em + 9px);--category-tabs-offset: 8px;--category-tab-size: 1.2rem;--category-name-height: 2rem;--category-name-padding-y: 6px;--search-height: 2em;--search-margin: .5em;--search-margin-bottom: 4px;--search-height-full: calc(var(--search-height) + var(--search-margin) + var(--search-margin-bottom));--overlay-background-color: rgba(0, 0, 0, .8);--emoji-font: "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "EmojiOne Color", "Android Emoji";--ui-font: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;--ui-font-size: 16px;--picker-width: calc(var(--emojis-per-row) * var(--emoji-size) * var(--emoji-size-multiplier) + 2.75rem);--preview-background-color: var(--secondary-background-color);background:var(--background-color);border-radius:var(--border-radius);border:1px solid var(--border-color);font-family:var(--ui-font);font-size:var(--ui-font-size);overflow:hidden;position:relative;width:var(--picker-width);display:grid;gap:8px}.picmo__picker.picmo__picker>*{font-family:var(--ui-font)}.picmo__picker.picmo__skeleton{background:var(--background-color);border-radius:var(--border-radius);border:1px solid var(--border-color);font-family:var(--ui-font);width:var(--picker-width);color:var(--secondary-text-color)}.picmo__picker.picmo__skeleton *{box-sizing:border-box}.picmo__picker.picmo__skeleton .picmo__placeholder{background:var(--placeholder-background-color);position:relative;overflow:hidden}.picmo__picker.picmo__skeleton .picmo__placeholder:after{position:absolute;top:0;right:0;bottom:0;left:0;transform:translate(-100%);background-image:linear-gradient(90deg,rgba(255,255,255,0) 0,rgba(255,255,255,.2) 20%,rgba(255,255,255,.5) 60%,rgba(255,255,255,0) 100%);animation:shine 2s infinite;content:""}.picmo__picker.picmo__skeleton .picmo__headerSkeleton{background-color:var(--secondary-background-color);padding-top:8px;padding-bottom:8px;display:flex;flex-direction:column;overflow:hidden;gap:8px;border-bottom:1px solid var(--border-color);width:var(--picker-width)}.picmo__picker.picmo__skeleton .picmo__searchSkeleton{padding:0 8px;height:var(--search-height)}.picmo__picker.picmo__skeleton .picmo__searchSkeleton .picmo__searchInput{width:100%;height:28px;border-radius:3px}.picmo__picker.picmo__skeleton .picmo__categoryTabsSkeleton{height:var(--category-tabs-height);display:flex;flex-direction:row;align-items:center;justify-self:center;width:calc(2rem * var(--category-count, 1))}.picmo__picker.picmo__skeleton .picmo__categoryTabsSkeleton .picmo__categoryTab{width:25px;height:25px;padding:2px;border-radius:5px;margin:.25em}.picmo__picker.picmo__skeleton .picmo__contentSkeleton{height:var(--content-height);padding-right:8px;opacity:.7}.picmo__picker.picmo__skeleton .picmo__contentSkeleton .picmo__categoryName{width:50%;height:1rem;margin:.5rem;box-sizing:border-box}.picmo__picker.picmo__skeleton .picmo__contentSkeleton .picmo__emojiGrid{display:grid;justify-content:space-between;gap:1px;padding:0 .5em;grid-template-columns:repeat(var(--emojis-per-row),calc(var(--emoji-size) * var(--emoji-size-multiplier)));grid-auto-rows:calc(var(--emoji-size) * var(--emoji-size-multiplier));align-items:center;justify-items:center;width:var(--picker-width)}.picmo__picker.picmo__skeleton .picmo__contentSkeleton .picmo__emojiGrid .picmo__emoji{width:var(--emoji-size);height:var(--emoji-size);border-radius:50%}.picmo__picker.picmo__skeleton .picmo__previewSkeleton{height:var(--emoji-preview-height);border-top:1px solid var(--border-color);display:grid;align-items:center;padding:.5em;gap:6px;grid-template-columns:auto 1fr;grid-template-rows:auto 1fr;grid-template-areas:"emoji name" "emoji tags"}.picmo__picker.picmo__skeleton .picmo__previewSkeleton .picmo__previewEmoji{grid-area:emoji;border-radius:50%;width:var(--emoji-preview-size);height:var(--emoji-preview-size)}.picmo__picker.picmo__skeleton .picmo__previewSkeleton .picmo__previewName{grid-area:name;height:.8em;width:80%}.picmo__picker.picmo__skeleton .picmo__previewSkeleton .picmo__tagList{grid-area:tags;list-style-type:none;display:flex;flex-direction:row;padding:0;margin:0}.picmo__picker.picmo__skeleton .picmo__previewSkeleton .picmo__tagList .picmo__tag{border-radius:3px;padding:2px 8px;margin-right:.25em;height:1em;width:20%}.picmo__overlay{background:rgba(0,0,0,.75);height:100%;left:0;position:fixed;top:0;width:100%;z-index:1000}.picmo__content{position:relative;overflow:hidden;height:var(--content-height)}.picmo__content.picmo__fullHeight{height:calc(var(--content-height) + var(--category-tabs-height) + var(--category-tabs-offset));overflow-y:auto}.picmo__pluginContainer{margin:.5em;display:flex;flex-direction:row}.picmo__header{background-color:var(--secondary-background-color);padding-top:8px;padding-bottom:8px;display:grid;gap:8px;border-bottom:1px solid var(--border-color)}@media (prefers-reduced-motion: reduce){.picmo__placeholder{background:var(--placeholder-background-color);position:relative;overflow:hidden}.picmo__placeholder:after{display:none}}.picmo__picker .picmo__preview{border-top:1px solid var(--border-color);display:grid;align-items:center;gap:6px;grid-template-columns:auto 1fr;grid-template-rows:auto 1fr;grid-template-areas:"emoji name" "emoji tags";height:var(--emoji-preview-height);box-sizing:border-box;padding:.5em;position:relative;background:var(--preview-background-color)}.picmo__picker .picmo__preview .picmo__previewEmoji{grid-area:emoji;font-size:var(--emoji-preview-size);font-family:var(--emoji-font);width:1.25em;display:flex;align-items:center;justify-content:center}.picmo__picker .picmo__preview .picmo__previewName{grid-area:name;color:var(--text-color);font-size:.8em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:500}.picmo__picker .picmo__preview .picmo__tagList{grid-area:tags;list-style-type:none;display:flex;flex-direction:row;padding:0;margin:0;font-size:.75em;overflow:hidden}.picmo__picker .picmo__preview .picmo__tag{border-radius:3px;background:var(--tag-background-color);color:var(--text-color);padding:2px 8px;margin-right:.25em;white-space:nowrap}.picmo__picker .picmo__preview .picmo__tag:last-child{margin-right:0}.picmo__picker .picmo__searchContainer{display:flex;height:var(--search-height);box-sizing:border-box;padding:0 8px;position:relative}.picmo__picker .picmo__searchContainer .picmo__searchField{background:var(--search-background-color);border-radius:3px;border:none;box-sizing:border-box;color:var(--text-color);font-size:.9em;outline:none;padding:.5em 2.25em .5em .5em;width:100%}.picmo__picker .picmo__searchContainer .picmo__searchField:focus{background:var(--search-focus-background-color)}.picmo__picker .picmo__searchContainer .picmo__searchField::placeholder{color:var(--search-placeholder-color)}.picmo__picker .picmo__searchContainer .picmo__searchAccessory{color:var(--search-icon-color);height:100%;position:absolute;right:1em;top:0;width:1.25rem;display:flex;align-items:center}.picmo__picker .picmo__searchContainer .picmo__searchAccessory svg{fill:var(--search-icon-color)}.picmo__picker .picmo__searchContainer .picmo__clearButton{border:0;color:var(--search-icon-color);background:transparent;cursor:pointer}.picmo__picker .picmo__searchContainer .picmo__clearSearchButton{cursor:pointer;border:none;background:transparent;color:var(--search-icon-color);font-size:1em;width:100%;height:100%;display:flex;align-items:center;padding:0}.picmo__picker .picmo__searchContainer .picmo__notFound [data-icon]{fill:#f3e265}.picmo__picker .picmo__variantOverlay{background:var(--overlay-background-color);border-radius:5px;display:flex;flex-direction:column;height:100%;justify-content:center;left:0;position:absolute;top:0;width:100%;z-index:1}.picmo__picker .picmo__variantOverlay .picmo__variantPopup{background:var(--variant-popup-background-color);border-radius:5px;margin:.5em;padding:.5em;text-align:center;user-select:none;display:flex;align-items:center;justify-content:center}.picmo__customEmoji{width:1em;height:1em}@keyframes shine{to{transform:translate(100%)}}.picmo__picker .picmo__imagePlaceholder{width:2rem;height:2rem;border-radius:50%}.picmo__placeholder{background:#DDDBDD;position:relative}.picmo__placeholder:after{position:absolute;top:0;right:0;bottom:0;left:0;transform:translate(-100%);background-image:linear-gradient(90deg,rgba(255,255,255,0) 0,rgba(255,255,255,.2) 20%,rgba(255,255,255,.5) 60%,rgba(255,255,255,0) 100%);animation:shine 2s infinite;content:""}
`;
function zo(o) {
  return ce(o.locale, o.dataStore, o.messages, o.emojiData);
}
let Lo = 0, M;
function $o() {
  return `picmo-${Date.now()}-${Lo++}`;
}
const Ao = Fo();
function Ko(o) {
  Ao(Po);
  const e = $t(o), t = ((e == null ? void 0 : e.custom) || []).map((n) => ({
    ...n,
    custom: !0,
    tags: ["custom", ...n.tags || []]
  })), s = new It();
  M || (M = zo(e));
  const i = new Eo(e.i18n);
  M.then((n) => {
    s.emit("data:ready", n);
  }).catch((n) => {
    s.emit("error", n);
  });
  const a = new xo({
    events: s,
    i18n: i,
    customEmojis: t,
    renderer: e.renderer,
    options: e,
    emojiData: M,
    pickerId: $o()
  }).create(ko);
  return a.renderSync(), a;
}
const Io = {
  "categories.activities": "Aktivit\xE4ten",
  "categories.animals-nature": "Tiere & Natur",
  "categories.custom": "Benutzerdefiniert",
  "categories.flags": "Flaggen",
  "categories.food-drink": "Essen & Trinken",
  "categories.objects": "Gegenst\xE4nde",
  "categories.people-body": "Mensch & K\xF6rper",
  "categories.recents": "Zuletzt genutzt",
  "categories.smileys-emotion": "Smileys & Emotionen",
  "categories.symbols": "Symbole",
  "categories.travel-places": "Reisen & Orte",
  "error.load": "Emojis wurden nicht geladen",
  "recents.clear": "Zuletzt genutzte Emojis l\xF6schen",
  "recents.none": "Kein Emoji ausgew\xE4hlt.",
  retry: "Erneut versuchen",
  "search.clear": "Suche l\xF6schen",
  "search.error": "Suche erfolglos",
  "search.notFound": "Kein Emoji gefunden",
  search: "Emojis durchsuchen ..."
}, To = {
  "categories.activities": "Aktiviteetit",
  "categories.animals-nature": "El\xE4imet & luonto",
  "categories.custom": "Mukautettu",
  "categories.flags": "Liput",
  "categories.food-drink": "Ruoka & juoma",
  "categories.objects": "Esineet",
  "categories.people-body": "Ihmiset & keho",
  "categories.recents": "Viimeksi k\xE4ytetty",
  "categories.smileys-emotion": "Hymi\xF6t & tunne",
  "categories.symbols": "Symbolit",
  "categories.travel-places": "Matkustus & paikat",
  "error.load": "Emojien lataaminen ep\xE4onnistui",
  "recents.clear": "Tyhjenn\xE4 viimeksi k\xE4ytetyt emojit",
  "recents.none": "Et ole valinnut viel\xE4 emojia.",
  retry: "Kokeile uudestaan",
  "search.clear": "Tyhjenn\xE4 haku",
  "search.error": "Emojien etsiminen ep\xE4onnistui",
  "search.notFound": "Emojia ei l\xF6ytynyt",
  search: "Etsi emojia..."
}, Ro = {
  "categories.activities": "Activit\xE9s",
  "categories.animals-nature": "Animaux et nature",
  "categories.custom": "Personnalis\xE9",
  "categories.flags": "Drapeaux",
  "categories.food-drink": "Nourriture et boissons",
  "categories.objects": "Objets",
  "categories.people-body": "Personnes et corps",
  "categories.recents": "R\xE9cemment utilis\xE9",
  "categories.smileys-emotion": "Visages et \xE9motions",
  "categories.symbols": "Symboles",
  "categories.travel-places": "Voyages et lieux",
  "error.load": "\xC9chec du chargement des \xE9mojis",
  "recents.clear": "Effacez les \xE9mojis r\xE9cents",
  "recents.none": "Vous n'avez pas encore s\xE9lectionn\xE9 d'\xE9mojis.",
  retry: "Essayez \xE0 nouveau",
  "search.clear": "Effacer la recherche",
  "search.error": "\xC9chec de la recherche d'\xE9mojis",
  "search.notFound": "Aucun \xE9moji trouv\xE9",
  search: "Rechercher des \xE9mojis..."
}, Mo = {
  "categories.activities": "Activiteiten",
  "categories.animals-nature": "Dieren & Natuur",
  "categories.custom": "Aangepast",
  "categories.flags": "Vlaggen",
  "categories.food-drink": "Eten & Drinken",
  "categories.objects": "Voorwerpen",
  "categories.people-body": "Mens & Lichaam",
  "categories.recents": "Laatst gebruikt",
  "categories.smileys-emotion": "Smileys en emoties",
  "categories.symbols": "Symbolen",
  "categories.travel-places": "Reizen & Plaatsen",
  "error.load": "Kan emoji's niet laden",
  "recents.clear": "Wis recente emoji's",
  "recents.none": "Geen emoji geselecteerd.",
  retry: "Probeer het nog eens",
  "search.clear": "Zoekopdracht wissen",
  "search.error": "Zoeken mislukt",
  "search.notFound": "Geen emoji gevonden",
  search: "Zoek emoji..."
}, Vo = {
  "categories.activities": "Aktiviteter",
  "categories.animals-nature": "Dyr & natur",
  "categories.custom": "Tilpasset",
  "categories.flags": "Flagg",
  "categories.food-drink": "Mat & drikke",
  "categories.objects": "Objekter",
  "categories.people-body": "Mennesker & kropp",
  "categories.recents": "Nylig brukte",
  "categories.smileys-emotion": "Smilefjes & f\xF8lelser",
  "categories.symbols": "Symboler",
  "categories.travel-places": "Reise & steder",
  "error.load": "Klarte ikke laste inn emojis",
  "recents.clear": "Fjern nylige emojis",
  "recents.none": "Du har ikke valgt noen emojis enda.",
  retry: "Pr\xF8v igjen",
  "search.clear": "T\xF8m s\xF8k",
  "search.error": "Klarte ikke \xE5 s\xF8ke etter emojis",
  "search.notFound": "Ingen emojis funnet",
  search: "S\xF8k etter emojis..."
}, Do = {
  "categories.activities": "Aktiviteter",
  "categories.animals-nature": "Djur & natur",
  "categories.custom": "Anpassad",
  "categories.flags": "Flagga",
  "categories.food-drink": "Mat & dryck",
  "categories.objects": "Objekt",
  "categories.people-body": "M\xE4nniskor & kropp",
  "categories.recents": "Nyligen anv\xE4nd",
  "categories.smileys-emotion": "Hum\xF6r & k\xE4nslor",
  "categories.symbols": "Symboler",
  "categories.travel-places": "Resor & platser",
  "error.load": "Det gick inte att ladda emojis",
  "recents.clear": "Ta bort de senaste emojis",
  "recents.none": "Du har inte valt n\xE5gra emojis \xE4n",
  retry: "F\xF6rs\xF6k igen",
  "search.clear": "Tom s\xF6kning",
  "search.error": "Det gick inte att s\xF6ka efter emojis",
  "search.notFound": "Inga emojis hittades",
  search: "S\xF6k efter emojis..."
}, Uo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  de: Io,
  en: ze,
  fi: To,
  fr: Ro,
  nl: Mo,
  no: Vo,
  sv: Do
}, Symbol.toStringTag, { value: "Module" }));
class qo extends Ae {
  constructor() {
    super(sessionStorage);
  }
}
class Wo extends $e {
  constructor() {
    super(...arguments), this.recents = [];
  }
  clear() {
    this.recents = [];
  }
  getRecents(e) {
    return this.recents.slice(0, e);
  }
  addOrUpdateRecent(e, t) {
    this.recents = [
      e,
      ...this.getRecents(t).filter((s) => s.hexcode !== e.hexcode)
    ].slice(0, t);
  }
}
async function Go(o, e, t, s) {
  (await ce(o, e, t, s)).close();
}

//# sourceMappingURL=index.js.map


/***/ })

}]);
//# sourceMappingURL=src_picmo_js.bundle09149dd2b91f16be10d9.js.map