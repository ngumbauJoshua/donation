import { create as j0 } from "zustand";
import * as f from "react";
import D, { forwardRef as Ye, createElement as Ee, useState as je, createContext as Ue, useContext as _e, useLayoutEffect as js, useMemo as wo, useEffect as At, Children as M0, isValidElement as O0, useCallback as _n, useRef as D0 } from "react";
import * as $o from "react-dom";
import I0 from "react-dom";
function L0() {
  return j0((e, t) => ({
    steps: [],
    currentStepId: "",
    stepErrors: {},
    stepValidators: {},
    stepMap: {},
    isFirst: !0,
    isLast: !1,
    onSubmit: void 0,
    onStepChange: void 0,
    showNavigation: !0,
    backButtonText: "Back",
    nextButtonText: "Continue",
    submitButtonText: "Submit",
    init: ({ steps: n, initialStep: a, onSubmit: r, onStepChange: o, showNavigation: i = !0, backButtonText: s = "Back", nextButtonText: c = "Continue", submitButtonText: d = "Submit" }) => {
      const u = n.reduce((p, m, h) => (p[m] = { index: h }, p), {});
      e((p) => {
        const m = p.currentStepId && u[p.currentStepId] ? p.currentStepId : a || n[0] || "", h = u[m]?.index || 0;
        return {
          steps: n,
          currentStepId: m,
          stepMap: u,
          isFirst: h === 0,
          isLast: h === n.length - 1,
          onSubmit: r,
          onStepChange: o,
          showNavigation: i,
          backButtonText: s,
          nextButtonText: c,
          submitButtonText: d,
          stepErrors: {},
          stepValidators: p.stepValidators
        };
      });
    },
    registerStep: (n, a) => {
      e((r) => ({
        stepValidators: {
          ...r.stepValidators,
          [n]: a || (() => !0)
        }
      }));
    },
    validateStep: async (n) => {
      const { stepValidators: a } = t(), r = a[n];
      if (!r)
        return { isValid: !0, errors: [] };
      try {
        const o = await Promise.resolve(r());
        return typeof o == "boolean" ? {
          isValid: o,
          errors: o ? [] : ["Validation failed"]
        } : {
          isValid: o.isValid,
          errors: o.errors || (o.isValid ? [] : ["Validation failed"])
        };
      } catch (o) {
        return console.error("Step validation error:", o), { isValid: !1, errors: ["Validation failed"] };
      }
    },
    goTo: (n) => {
      const { steps: a, stepMap: r, currentStepId: o, onStepChange: i } = t();
      if (!r[n]) return;
      const s = o, c = r[n].index;
      e({
        currentStepId: n,
        isFirst: c === 0,
        isLast: c === a.length - 1
      }), i?.(n, s);
    },
    next: async () => {
      const { currentStepId: n, steps: a, stepMap: r, goTo: o } = t(), i = await t().validateStep(n);
      if (!i.isValid) {
        e((d) => ({
          stepErrors: {
            ...d.stepErrors,
            [n]: i.errors || ["Invalid step"]
          }
        }));
        return;
      }
      e((d) => ({
        stepErrors: {
          ...d.stepErrors,
          [n]: null
        }
      }));
      const s = r[n]?.index || 0, c = a[s + 1];
      c && o(c);
    },
    back: () => {
      const { currentStepId: n, steps: a, stepMap: r, goTo: o } = t();
      e((c) => ({
        stepErrors: {
          ...c.stepErrors,
          [n]: null
        }
      }));
      const i = r[n]?.index || 0, s = a[i - 1];
      s && o(s);
    },
    getCurrentStepErrors: () => {
      const { stepErrors: n, currentStepId: a } = t();
      return n[a] || null;
    },
    getStepErrors: (n) => {
      const { stepErrors: a } = t();
      return a[n] || null;
    }
  }));
}
var jr = { exports: {} }, Ea = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bc;
function F0() {
  if (bc) return Ea;
  bc = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function n(a, r, o) {
    var i = null;
    if (o !== void 0 && (i = "" + o), r.key !== void 0 && (i = "" + r.key), "key" in r) {
      o = {};
      for (var s in r)
        s !== "key" && (o[s] = r[s]);
    } else o = r;
    return r = o.ref, {
      $$typeof: e,
      type: a,
      key: i,
      ref: r !== void 0 ? r : null,
      props: o
    };
  }
  return Ea.Fragment = t, Ea.jsx = n, Ea.jsxs = n, Ea;
}
var Ra = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var vc;
function B0() {
  return vc || (vc = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(N) {
      if (N == null) return null;
      if (typeof N == "function")
        return N.$$typeof === B ? null : N.displayName || N.name || null;
      if (typeof N == "string") return N;
      switch (N) {
        case g:
          return "Fragment";
        case y:
          return "Profiler";
        case v:
          return "StrictMode";
        case R:
          return "Suspense";
        case k:
          return "SuspenseList";
        case P:
          return "Activity";
      }
      if (typeof N == "object")
        switch (typeof N.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), N.$$typeof) {
          case b:
            return "Portal";
          case $:
            return (N.displayName || "Context") + ".Provider";
          case w:
            return (N._context.displayName || "Context") + ".Consumer";
          case C:
            var H = N.render;
            return N = N.displayName, N || (N = H.displayName || H.name || "", N = N !== "" ? "ForwardRef(" + N + ")" : "ForwardRef"), N;
          case S:
            return H = N.displayName || null, H !== null ? H : e(N.type) || "Memo";
          case j:
            H = N._payload, N = N._init;
            try {
              return e(N(H));
            } catch {
            }
        }
      return null;
    }
    function t(N) {
      return "" + N;
    }
    function n(N) {
      try {
        t(N);
        var H = !1;
      } catch {
        H = !0;
      }
      if (H) {
        H = console;
        var _ = H.error, G = typeof Symbol == "function" && Symbol.toStringTag && N[Symbol.toStringTag] || N.constructor.name || "Object";
        return _.call(
          H,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          G
        ), t(N);
      }
    }
    function a(N) {
      if (N === g) return "<>";
      if (typeof N == "object" && N !== null && N.$$typeof === j)
        return "<...>";
      try {
        var H = e(N);
        return H ? "<" + H + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function r() {
      var N = z.A;
      return N === null ? null : N.getOwner();
    }
    function o() {
      return Error("react-stack-top-frame");
    }
    function i(N) {
      if (L.call(N, "key")) {
        var H = Object.getOwnPropertyDescriptor(N, "key").get;
        if (H && H.isReactWarning) return !1;
      }
      return N.key !== void 0;
    }
    function s(N, H) {
      function _() {
        Q || (Q = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          H
        ));
      }
      _.isReactWarning = !0, Object.defineProperty(N, "key", {
        get: _,
        configurable: !0
      });
    }
    function c() {
      var N = e(this.type);
      return V[N] || (V[N] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), N = this.props.ref, N !== void 0 ? N : null;
    }
    function d(N, H, _, G, X, W, te, M) {
      return _ = W.ref, N = {
        $$typeof: h,
        type: N,
        key: H,
        props: W,
        _owner: X
      }, (_ !== void 0 ? _ : null) !== null ? Object.defineProperty(N, "ref", {
        enumerable: !1,
        get: c
      }) : Object.defineProperty(N, "ref", { enumerable: !1, value: null }), N._store = {}, Object.defineProperty(N._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(N, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(N, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: te
      }), Object.defineProperty(N, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: M
      }), Object.freeze && (Object.freeze(N.props), Object.freeze(N)), N;
    }
    function u(N, H, _, G, X, W, te, M) {
      var q = H.children;
      if (q !== void 0)
        if (G)
          if (T(q)) {
            for (G = 0; G < q.length; G++)
              p(q[G]);
            Object.freeze && Object.freeze(q);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else p(q);
      if (L.call(H, "key")) {
        q = e(N);
        var oe = Object.keys(H).filter(function(fe) {
          return fe !== "key";
        });
        G = 0 < oe.length ? "{key: someKey, " + oe.join(": ..., ") + ": ...}" : "{key: someKey}", O[q + G] || (oe = 0 < oe.length ? "{" + oe.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          G,
          q,
          oe,
          q
        ), O[q + G] = !0);
      }
      if (q = null, _ !== void 0 && (n(_), q = "" + _), i(H) && (n(H.key), q = "" + H.key), "key" in H) {
        _ = {};
        for (var ce in H)
          ce !== "key" && (_[ce] = H[ce]);
      } else _ = H;
      return q && s(
        _,
        typeof N == "function" ? N.displayName || N.name || "Unknown" : N
      ), d(
        N,
        q,
        W,
        X,
        r(),
        _,
        te,
        M
      );
    }
    function p(N) {
      typeof N == "object" && N !== null && N.$$typeof === h && N._store && (N._store.validated = 1);
    }
    var m = D, h = Symbol.for("react.transitional.element"), b = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), v = Symbol.for("react.strict_mode"), y = Symbol.for("react.profiler"), w = Symbol.for("react.consumer"), $ = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), R = Symbol.for("react.suspense"), k = Symbol.for("react.suspense_list"), S = Symbol.for("react.memo"), j = Symbol.for("react.lazy"), P = Symbol.for("react.activity"), B = Symbol.for("react.client.reference"), z = m.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = Object.prototype.hasOwnProperty, T = Array.isArray, K = console.createTask ? console.createTask : function() {
      return null;
    };
    m = {
      react_stack_bottom_frame: function(N) {
        return N();
      }
    };
    var Q, V = {}, A = m.react_stack_bottom_frame.bind(
      m,
      o
    )(), E = K(a(o)), O = {};
    Ra.Fragment = g, Ra.jsx = function(N, H, _, G, X) {
      var W = 1e4 > z.recentlyCreatedOwnerStacks++;
      return u(
        N,
        H,
        _,
        !1,
        G,
        X,
        W ? Error("react-stack-top-frame") : A,
        W ? K(a(N)) : E
      );
    }, Ra.jsxs = function(N, H, _, G, X) {
      var W = 1e4 > z.recentlyCreatedOwnerStacks++;
      return u(
        N,
        H,
        _,
        !0,
        G,
        X,
        W ? Error("react-stack-top-frame") : A,
        W ? K(a(N)) : E
      );
    };
  })()), Ra;
}
var yc;
function U0() {
  return yc || (yc = 1, process.env.NODE_ENV === "production" ? jr.exports = F0() : jr.exports = B0()), jr.exports;
}
var l = U0();
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G0 = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), uu = (...e) => e.filter((t, n, a) => !!t && t.trim() !== "" && a.indexOf(t) === n).join(" ").trim();
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var W0 = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const H0 = Ye(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: a,
    className: r = "",
    children: o,
    iconNode: i,
    ...s
  }, c) => Ee(
    "svg",
    {
      ref: c,
      ...W0,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: a ? Number(n) * 24 / Number(t) : n,
      className: uu("lucide", r),
      ...s
    },
    [
      ...i.map(([d, u]) => Ee(d, u)),
      ...Array.isArray(o) ? o : [o]
    ]
  )
);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yt = (e, t) => {
  const n = Ye(
    ({ className: a, ...r }, o) => Ee(H0, {
      ref: o,
      iconNode: t,
      className: uu(`lucide-${G0(e)}`, a),
      ...r
    })
  );
  return n.displayName = `${e}`, n;
};
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const V0 = yt("ArrowLeft", [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fu = yt("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Co = yt("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const z0 = yt("ChevronsUpDown", [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const K0 = yt("CircleHelp", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pu = yt("Globe", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y0 = yt("Minus", [["path", { d: "M5 12h14", key: "1ays0h" }]]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z0 = yt("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X0 = yt("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const q0 = yt("Shield", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J0 = yt("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
function xc(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Gt(...e) {
  return (t) => {
    let n = !1;
    const a = e.map((r) => {
      const o = xc(r, t);
      return !n && typeof o == "function" && (n = !0), o;
    });
    if (n)
      return () => {
        for (let r = 0; r < a.length; r++) {
          const o = a[r];
          typeof o == "function" ? o() : xc(e[r], null);
        }
      };
  };
}
function le(...e) {
  return f.useCallback(Gt(...e), e);
}
// @__NO_SIDE_EFFECTS__
function on(e) {
  const t = /* @__PURE__ */ eb(e), n = f.forwardRef((a, r) => {
    const { children: o, ...i } = a, s = f.Children.toArray(o), c = s.find(nb);
    if (c) {
      const d = c.props.children, u = s.map((p) => p === c ? f.Children.count(d) > 1 ? f.Children.only(null) : f.isValidElement(d) ? d.props.children : null : p);
      return /* @__PURE__ */ l.jsx(t, { ...i, ref: r, children: f.isValidElement(d) ? f.cloneElement(d, void 0, u) : null });
    }
    return /* @__PURE__ */ l.jsx(t, { ...i, ref: r, children: o });
  });
  return n.displayName = `${e}.Slot`, n;
}
var Q0 = /* @__PURE__ */ on("Slot");
// @__NO_SIDE_EFFECTS__
function eb(e) {
  const t = f.forwardRef((n, a) => {
    const { children: r, ...o } = n;
    if (f.isValidElement(r)) {
      const i = rb(r), s = ab(o, r.props);
      return r.type !== f.Fragment && (s.ref = a ? Gt(a, i) : i), f.cloneElement(r, s);
    }
    return f.Children.count(r) > 1 ? f.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var mu = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function tb(e) {
  const t = ({ children: n }) => /* @__PURE__ */ l.jsx(l.Fragment, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = mu, t;
}
function nb(e) {
  return f.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === mu;
}
function ab(e, t) {
  const n = { ...t };
  for (const a in t) {
    const r = e[a], o = t[a];
    /^on[A-Z]/.test(a) ? r && o ? n[a] = (...s) => {
      const c = o(...s);
      return r(...s), c;
    } : r && (n[a] = r) : a === "style" ? n[a] = { ...r, ...o } : a === "className" && (n[a] = [r, o].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function rb(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function hu(e) {
  var t, n, a = "";
  if (typeof e == "string" || typeof e == "number") a += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var r = e.length;
    for (t = 0; t < r; t++) e[t] && (n = hu(e[t])) && (a && (a += " "), a += n);
  } else for (n in e) e[n] && (a && (a += " "), a += n);
  return a;
}
function Ms() {
  for (var e, t, n = 0, a = "", r = arguments.length; n < r; n++) (e = arguments[n]) && (t = hu(e)) && (a && (a += " "), a += t);
  return a;
}
const wc = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, $c = Ms, sr = (e, t) => (n) => {
  var a;
  if (t?.variants == null) return $c(e, n?.class, n?.className);
  const { variants: r, defaultVariants: o } = t, i = Object.keys(r).map((d) => {
    const u = n?.[d], p = o?.[d];
    if (u === null) return null;
    const m = wc(u) || wc(p);
    return r[d][m];
  }), s = n && Object.entries(n).reduce((d, u) => {
    let [p, m] = u;
    return m === void 0 || (d[p] = m), d;
  }, {}), c = t == null || (a = t.compoundVariants) === null || a === void 0 ? void 0 : a.reduce((d, u) => {
    let { class: p, className: m, ...h } = u;
    return Object.entries(h).every((b) => {
      let [g, v] = b;
      return Array.isArray(v) ? v.includes({
        ...o,
        ...s
      }[g]) : {
        ...o,
        ...s
      }[g] === v;
    }) ? [
      ...d,
      p,
      m
    ] : d;
  }, []);
  return $c(e, i, c, n?.class, n?.className);
}, Os = "-", ob = (e) => {
  const t = sb(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: a
  } = e;
  return {
    getClassGroupId: (i) => {
      const s = i.split(Os);
      return s[0] === "" && s.length !== 1 && s.shift(), gu(s, t) || ib(i);
    },
    getConflictingClassGroupIds: (i, s) => {
      const c = n[i] || [];
      return s && a[i] ? [...c, ...a[i]] : c;
    }
  };
}, gu = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], a = t.nextPart.get(n), r = a ? gu(e.slice(1), a) : void 0;
  if (r)
    return r;
  if (t.validators.length === 0)
    return;
  const o = e.join(Os);
  return t.validators.find(({
    validator: i
  }) => i(o))?.classGroupId;
}, Cc = /^\[(.+)\]$/, ib = (e) => {
  if (Cc.test(e)) {
    const t = Cc.exec(e)[1], n = t?.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, sb = (e) => {
  const {
    theme: t,
    prefix: n
  } = e, a = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return cb(Object.entries(e.classGroups), n).forEach(([o, i]) => {
    Xi(i, a, o, t);
  }), a;
}, Xi = (e, t, n, a) => {
  e.forEach((r) => {
    if (typeof r == "string") {
      const o = r === "" ? t : Sc(t, r);
      o.classGroupId = n;
      return;
    }
    if (typeof r == "function") {
      if (lb(r)) {
        Xi(r(a), t, n, a);
        return;
      }
      t.validators.push({
        validator: r,
        classGroupId: n
      });
      return;
    }
    Object.entries(r).forEach(([o, i]) => {
      Xi(i, Sc(t, o), n, a);
    });
  });
}, Sc = (e, t) => {
  let n = e;
  return t.split(Os).forEach((a) => {
    n.nextPart.has(a) || n.nextPart.set(a, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(a);
  }), n;
}, lb = (e) => e.isThemeGetter, cb = (e, t) => t ? e.map(([n, a]) => {
  const r = a.map((o) => typeof o == "string" ? t + o : typeof o == "object" ? Object.fromEntries(Object.entries(o).map(([i, s]) => [t + i, s])) : o);
  return [n, r];
}) : e, db = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  const r = (o, i) => {
    n.set(o, i), t++, t > e && (t = 0, a = n, n = /* @__PURE__ */ new Map());
  };
  return {
    get(o) {
      let i = n.get(o);
      if (i !== void 0)
        return i;
      if ((i = a.get(o)) !== void 0)
        return r(o, i), i;
    },
    set(o, i) {
      n.has(o) ? n.set(o, i) : r(o, i);
    }
  };
}, bu = "!", ub = (e) => {
  const {
    separator: t,
    experimentalParseClassName: n
  } = e, a = t.length === 1, r = t[0], o = t.length, i = (s) => {
    const c = [];
    let d = 0, u = 0, p;
    for (let v = 0; v < s.length; v++) {
      let y = s[v];
      if (d === 0) {
        if (y === r && (a || s.slice(v, v + o) === t)) {
          c.push(s.slice(u, v)), u = v + o;
          continue;
        }
        if (y === "/") {
          p = v;
          continue;
        }
      }
      y === "[" ? d++ : y === "]" && d--;
    }
    const m = c.length === 0 ? s : s.substring(u), h = m.startsWith(bu), b = h ? m.substring(1) : m, g = p && p > u ? p - u : void 0;
    return {
      modifiers: c,
      hasImportantModifier: h,
      baseClassName: b,
      maybePostfixModifierPosition: g
    };
  };
  return n ? (s) => n({
    className: s,
    parseClassName: i
  }) : i;
}, fb = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let n = [];
  return e.forEach((a) => {
    a[0] === "[" ? (t.push(...n.sort(), a), n = []) : n.push(a);
  }), t.push(...n.sort()), t;
}, pb = (e) => ({
  cache: db(e.cacheSize),
  parseClassName: ub(e),
  ...ob(e)
}), mb = /\s+/, hb = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: a,
    getConflictingClassGroupIds: r
  } = t, o = [], i = e.trim().split(mb);
  let s = "";
  for (let c = i.length - 1; c >= 0; c -= 1) {
    const d = i[c], {
      modifiers: u,
      hasImportantModifier: p,
      baseClassName: m,
      maybePostfixModifierPosition: h
    } = n(d);
    let b = !!h, g = a(b ? m.substring(0, h) : m);
    if (!g) {
      if (!b) {
        s = d + (s.length > 0 ? " " + s : s);
        continue;
      }
      if (g = a(m), !g) {
        s = d + (s.length > 0 ? " " + s : s);
        continue;
      }
      b = !1;
    }
    const v = fb(u).join(":"), y = p ? v + bu : v, w = y + g;
    if (o.includes(w))
      continue;
    o.push(w);
    const $ = r(g, b);
    for (let C = 0; C < $.length; ++C) {
      const R = $[C];
      o.push(y + R);
    }
    s = d + (s.length > 0 ? " " + s : s);
  }
  return s;
};
function gb() {
  let e = 0, t, n, a = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = vu(t)) && (a && (a += " "), a += n);
  return a;
}
const vu = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let a = 0; a < e.length; a++)
    e[a] && (t = vu(e[a])) && (n && (n += " "), n += t);
  return n;
};
function bb(e, ...t) {
  let n, a, r, o = i;
  function i(c) {
    const d = t.reduce((u, p) => p(u), e());
    return n = pb(d), a = n.cache.get, r = n.cache.set, o = s, s(c);
  }
  function s(c) {
    const d = a(c);
    if (d)
      return d;
    const u = hb(c, n);
    return r(c, u), u;
  }
  return function() {
    return o(gb.apply(null, arguments));
  };
}
const Se = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, yu = /^\[(?:([a-z-]+):)?(.+)\]$/i, vb = /^\d+\/\d+$/, yb = /* @__PURE__ */ new Set(["px", "full", "screen"]), xb = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, wb = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, $b = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Cb = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Sb = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, It = (e) => Qn(e) || yb.has(e) || vb.test(e), Xt = (e) => ba(e, "length", Ab), Qn = (e) => !!e && !Number.isNaN(Number(e)), gi = (e) => ba(e, "number", Qn), Pa = (e) => !!e && Number.isInteger(Number(e)), _b = (e) => e.endsWith("%") && Qn(e.slice(0, -1)), de = (e) => yu.test(e), qt = (e) => xb.test(e), Nb = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Eb = (e) => ba(e, Nb, xu), Rb = (e) => ba(e, "position", xu), Pb = /* @__PURE__ */ new Set(["image", "url"]), kb = (e) => ba(e, Pb, Mb), Tb = (e) => ba(e, "", jb), ka = () => !0, ba = (e, t, n) => {
  const a = yu.exec(e);
  return a ? a[1] ? typeof t == "string" ? a[1] === t : t.has(a[1]) : n(a[2]) : !1;
}, Ab = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  wb.test(e) && !$b.test(e)
), xu = () => !1, jb = (e) => Cb.test(e), Mb = (e) => Sb.test(e), Ob = () => {
  const e = Se("colors"), t = Se("spacing"), n = Se("blur"), a = Se("brightness"), r = Se("borderColor"), o = Se("borderRadius"), i = Se("borderSpacing"), s = Se("borderWidth"), c = Se("contrast"), d = Se("grayscale"), u = Se("hueRotate"), p = Se("invert"), m = Se("gap"), h = Se("gradientColorStops"), b = Se("gradientColorStopPositions"), g = Se("inset"), v = Se("margin"), y = Se("opacity"), w = Se("padding"), $ = Se("saturate"), C = Se("scale"), R = Se("sepia"), k = Se("skew"), S = Se("space"), j = Se("translate"), P = () => ["auto", "contain", "none"], B = () => ["auto", "hidden", "clip", "visible", "scroll"], z = () => ["auto", de, t], L = () => [de, t], T = () => ["", It, Xt], K = () => ["auto", Qn, de], Q = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], V = () => ["solid", "dashed", "dotted", "double", "none"], A = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], E = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], O = () => ["", "0", de], N = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], H = () => [Qn, de];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [ka],
      spacing: [It, Xt],
      blur: ["none", "", qt, de],
      brightness: H(),
      borderColor: [e],
      borderRadius: ["none", "", "full", qt, de],
      borderSpacing: L(),
      borderWidth: T(),
      contrast: H(),
      grayscale: O(),
      hueRotate: H(),
      invert: O(),
      gap: L(),
      gradientColorStops: [e],
      gradientColorStopPositions: [_b, Xt],
      inset: z(),
      margin: z(),
      opacity: H(),
      padding: L(),
      saturate: H(),
      scale: H(),
      sepia: O(),
      skew: H(),
      space: L(),
      translate: L()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", de]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [qt]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": N()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": N()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...Q(), de]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: B()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": B()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": B()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: P()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": P()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": P()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [g]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [g]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [g]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [g]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [g]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [g]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [g]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [g]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [g]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", Pa, de]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: z()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", de]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: O()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: O()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", Pa, de]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [ka]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", Pa, de]
        }, de]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": K()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": K()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [ka]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [Pa, de]
        }, de]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": K()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": K()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", de]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", de]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [m]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [m]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [m]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...E()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...E(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...E(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [w]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [w]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [w]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [w]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [w]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [w]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [w]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [w]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [w]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [v]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [v]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [v]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [v]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [v]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [v]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [v]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [v]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [v]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [S]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [S]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", de, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [de, t, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [de, t, "none", "full", "min", "max", "fit", "prose", {
          screen: [qt]
        }, qt]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [de, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [de, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [de, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [de, t, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", qt, Xt]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", gi]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [ka]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", de]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", Qn, gi]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", It, de]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", de]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", de]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [e]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [y]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [e]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [y]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...V(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", It, Xt]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", It, de]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [e]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: L()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", de]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", de]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [y]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...Q(), Rb]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", Eb]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, kb]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [e]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [b]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [b]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [b]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [h]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [h]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [h]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [o]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [o]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [o]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [o]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [o]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [o]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [o]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [o]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [o]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [o]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [o]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [o]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [o]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [o]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [o]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [s]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [s]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [s]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [s]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [s]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [s]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [s]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [s]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [s]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [y]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...V(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [s]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [s]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [y]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: V()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [r]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [r]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [r]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [r]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [r]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [r]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [r]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [r]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [r]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [r]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...V()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [It, de]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [It, Xt]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [e]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: T()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [e]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [y]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [It, Xt]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", qt, Tb]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [ka]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [y]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...A(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": A()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [n]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [a]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [c]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", qt, de]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [d]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [u]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [p]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [$]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [R]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [n]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [a]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [c]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [d]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [u]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [p]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [y]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [$]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [R]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [i]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [i]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [i]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", de]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: H()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", de]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: H()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", de]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [C]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [C]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [C]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [Pa, de]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [j]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [j]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [k]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [k]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", de]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", e]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", de]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [e]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": L()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": L()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": L()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": L()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": L()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": L()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": L()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": L()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": L()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": L()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": L()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": L()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": L()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": L()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": L()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": L()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": L()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": L()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", de]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [e, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [It, Xt, gi]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [e, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}, Db = /* @__PURE__ */ bb(Ob);
function x(...e) {
  return Db(Ms(e));
}
const qi = sr(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90 n3o-widget-primary-button",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), we = f.forwardRef(
  ({ className: e, variant: t, size: n, asChild: a = !1, ...r }, o) => {
    const i = a ? Q0 : "button";
    return /* @__PURE__ */ l.jsx(
      i,
      {
        className: x(qi({ variant: t, size: n, className: e })),
        ref: o,
        ...r
      }
    );
  }
);
we.displayName = "Button";
const wu = Ue(null);
function Ds() {
  const e = _e(wu);
  if (!e)
    throw new Error("Counter components must be used within Counter");
  return e;
}
function lr({
  children: e,
  defaultValue: t = 0,
  min: n = 0,
  max: a = 1 / 0,
  onChange: r,
  value: o
}) {
  const [i, s] = je(t), c = o !== void 0, d = c ? o : i, u = (b) => {
    const g = Math.max(n, Math.min(a, b));
    c || s(g), r?.(g);
  }, h = {
    value: d,
    setValue: u,
    decrease: () => u(d - 1),
    increase: () => u(d + 1),
    min: n,
    max: a,
    canDecrease: d > n,
    canIncrease: d < a
  };
  return /* @__PURE__ */ l.jsx(wu.Provider, { value: h, children: e });
}
lr.Label = function({ children: t, className: n }) {
  return /* @__PURE__ */ l.jsx("p", { className: x("text-base text-gray-700 mb-3", "n3o-counter__label", n), children: t });
};
lr.Controls = function({ children: t, className: n }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("flex items-center justify-evenly gap-2", "n3o-counter__controls", n), children: t });
};
lr.DecreaseButton = function({
  children: t,
  className: n,
  ...a
}) {
  const { decrease: r, canDecrease: o } = Ds();
  return /* @__PURE__ */ l.jsx(
    we,
    {
      className: x("h-12 w-[110px] rounded-lg shadow-sm", "n3o-counter__decrease-button", n),
      variant: "outline",
      onClick: r,
      disabled: !o,
      ...a,
      children: t || /* @__PURE__ */ l.jsx(Y0, { size: 18 })
    }
  );
};
lr.Display = function({
  children: t,
  className: n,
  onKeyDown: a,
  ...r
}) {
  const { value: o, increase: i, decrease: s, canIncrease: c, canDecrease: d, min: u, max: p } = Ds(), m = (b) => {
    b.key === "ArrowUp" && c ? (b.preventDefault(), i()) : b.key === "ArrowDown" && d && (b.preventDefault(), s()), a?.(b);
  }, h = () => t === void 0 ? o : typeof t == "function" ? t(o) : t;
  return /* @__PURE__ */ l.jsx(
    "div",
    {
      className: x(
        "h-12 w-[110px] bg-white rounded-lg flex items-center justify-center text-lg font-medium border border-gray-100",
        "n3o-counter__display",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        "cursor-pointer select-none",
        n
      ),
      "aria-live": "polite",
      tabIndex: 0,
      onKeyDown: m,
      role: "spinbutton",
      "aria-valuenow": o,
      "aria-valuemin": u,
      "aria-valuemax": p === 1 / 0 ? void 0 : p,
      ...r,
      children: h()
    }
  );
};
lr.IncreaseButton = function({
  children: t,
  className: n,
  ...a
}) {
  const { increase: r, canIncrease: o } = Ds();
  return /* @__PURE__ */ l.jsx(
    we,
    {
      className: x("h-12 w-[110px] rounded-lg shadow-sm", "n3o-counter__increase-button", n),
      variant: "outline",
      onClick: r,
      disabled: !o,
      ...a,
      children: t || /* @__PURE__ */ l.jsx(Z0, { size: 18 })
    }
  );
};
function Ib(e, t) {
  const n = f.createContext(t), a = (o) => {
    const { children: i, ...s } = o, c = f.useMemo(() => s, Object.values(s));
    return /* @__PURE__ */ l.jsx(n.Provider, { value: c, children: i });
  };
  a.displayName = e + "Provider";
  function r(o) {
    const i = f.useContext(n);
    if (i) return i;
    if (t !== void 0) return t;
    throw new Error(`\`${o}\` must be used within \`${e}\``);
  }
  return [a, r];
}
function Fe(e, t = []) {
  let n = [];
  function a(o, i) {
    const s = f.createContext(i), c = n.length;
    n = [...n, i];
    const d = (p) => {
      const { scope: m, children: h, ...b } = p, g = m?.[e]?.[c] || s, v = f.useMemo(() => b, Object.values(b));
      return /* @__PURE__ */ l.jsx(g.Provider, { value: v, children: h });
    };
    d.displayName = o + "Provider";
    function u(p, m) {
      const h = m?.[e]?.[c] || s, b = f.useContext(h);
      if (b) return b;
      if (i !== void 0) return i;
      throw new Error(`\`${p}\` must be used within \`${o}\``);
    }
    return [d, u];
  }
  const r = () => {
    const o = n.map((i) => f.createContext(i));
    return function(s) {
      const c = s?.[e] || o;
      return f.useMemo(
        () => ({ [`__scope${e}`]: { ...s, [e]: c } }),
        [s, c]
      );
    };
  };
  return r.scopeName = e, [a, Lb(r, ...t)];
}
function Lb(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const a = e.map((r) => ({
      useScope: r(),
      scopeName: r.scopeName
    }));
    return function(o) {
      const i = a.reduce((s, { useScope: c, scopeName: d }) => {
        const p = c(o)[`__scope${d}`];
        return { ...s, ...p };
      }, {});
      return f.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function U(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(r) {
    if (e?.(r), n === !1 || !r.defaultPrevented)
      return t?.(r);
  };
}
var Oe = globalThis?.document ? f.useLayoutEffect : () => {
}, Fb = f[" useInsertionEffect ".trim().toString()] || Oe;
function Ke({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: a
}) {
  const [r, o, i] = Bb({
    defaultProp: t,
    onChange: n
  }), s = e !== void 0, c = s ? e : r;
  {
    const u = f.useRef(e !== void 0);
    f.useEffect(() => {
      const p = u.current;
      p !== s && console.warn(
        `${a} is changing from ${p ? "controlled" : "uncontrolled"} to ${s ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), u.current = s;
    }, [s, a]);
  }
  const d = f.useCallback(
    (u) => {
      if (s) {
        const p = Ub(u) ? u(e) : u;
        p !== e && i.current?.(p);
      } else
        o(u);
    },
    [s, e, o, i]
  );
  return [c, d];
}
function Bb({
  defaultProp: e,
  onChange: t
}) {
  const [n, a] = f.useState(e), r = f.useRef(n), o = f.useRef(t);
  return Fb(() => {
    o.current = t;
  }, [t]), f.useEffect(() => {
    r.current !== n && (o.current?.(n), r.current = n);
  }, [n, r]), [n, a, o];
}
function Ub(e) {
  return typeof e == "function";
}
function So(e) {
  const t = f.useRef({ value: e, previous: e });
  return f.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
function _o(e) {
  const [t, n] = f.useState(void 0);
  return Oe(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const a = new ResizeObserver((r) => {
        if (!Array.isArray(r) || !r.length)
          return;
        const o = r[0];
        let i, s;
        if ("borderBoxSize" in o) {
          const c = o.borderBoxSize, d = Array.isArray(c) ? c[0] : c;
          i = d.inlineSize, s = d.blockSize;
        } else
          i = e.offsetWidth, s = e.offsetHeight;
        n({ width: i, height: s });
      });
      return a.observe(e, { box: "border-box" }), () => a.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
function Gb(e, t) {
  return f.useReducer((n, a) => t[n][a] ?? n, e);
}
var Ge = (e) => {
  const { present: t, children: n } = e, a = Wb(t), r = typeof n == "function" ? n({ present: a.isPresent }) : f.Children.only(n), o = le(a.ref, Hb(r));
  return typeof n == "function" || a.isPresent ? f.cloneElement(r, { ref: o }) : null;
};
Ge.displayName = "Presence";
function Wb(e) {
  const [t, n] = f.useState(), a = f.useRef(null), r = f.useRef(e), o = f.useRef("none"), i = e ? "mounted" : "unmounted", [s, c] = Gb(i, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return f.useEffect(() => {
    const d = Mr(a.current);
    o.current = s === "mounted" ? d : "none";
  }, [s]), Oe(() => {
    const d = a.current, u = r.current;
    if (u !== e) {
      const m = o.current, h = Mr(d);
      e ? c("MOUNT") : h === "none" || d?.display === "none" ? c("UNMOUNT") : c(u && m !== h ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, c]), Oe(() => {
    if (t) {
      let d;
      const u = t.ownerDocument.defaultView ?? window, p = (h) => {
        const g = Mr(a.current).includes(CSS.escape(h.animationName));
        if (h.target === t && g && (c("ANIMATION_END"), !r.current)) {
          const v = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", d = u.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = v);
          });
        }
      }, m = (h) => {
        h.target === t && (o.current = Mr(a.current));
      };
      return t.addEventListener("animationstart", m), t.addEventListener("animationcancel", p), t.addEventListener("animationend", p), () => {
        u.clearTimeout(d), t.removeEventListener("animationstart", m), t.removeEventListener("animationcancel", p), t.removeEventListener("animationend", p);
      };
    } else
      c("ANIMATION_END");
  }, [t, c]), {
    isPresent: ["mounted", "unmountSuspended"].includes(s),
    ref: f.useCallback((d) => {
      a.current = d ? getComputedStyle(d) : null, n(d);
    }, [])
  };
}
function Mr(e) {
  return e?.animationName || "none";
}
function Hb(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Vb = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], Y = Vb.reduce((e, t) => {
  const n = /* @__PURE__ */ on(`Primitive.${t}`), a = f.forwardRef((r, o) => {
    const { asChild: i, ...s } = r, c = i ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ l.jsx(c, { ...s, ref: o });
  });
  return a.displayName = `Primitive.${t}`, { ...e, [t]: a };
}, {});
function $u(e, t) {
  e && $o.flushSync(() => e.dispatchEvent(t));
}
var No = "Checkbox", [zb, $_] = Fe(No), [Kb, Is] = zb(No);
function Yb(e) {
  const {
    __scopeCheckbox: t,
    checked: n,
    children: a,
    defaultChecked: r,
    disabled: o,
    form: i,
    name: s,
    onCheckedChange: c,
    required: d,
    value: u = "on",
    // @ts-expect-error
    internal_do_not_use_render: p
  } = e, [m, h] = Ke({
    prop: n,
    defaultProp: r ?? !1,
    onChange: c,
    caller: No
  }), [b, g] = f.useState(null), [v, y] = f.useState(null), w = f.useRef(!1), $ = b ? !!i || !!b.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    !0
  ), C = {
    checked: m,
    disabled: o,
    setChecked: h,
    control: b,
    setControl: g,
    name: s,
    form: i,
    value: u,
    hasConsumerStoppedPropagationRef: w,
    required: d,
    defaultChecked: an(r) ? !1 : r,
    isFormControl: $,
    bubbleInput: v,
    setBubbleInput: y
  };
  return /* @__PURE__ */ l.jsx(
    Kb,
    {
      scope: t,
      ...C,
      children: Zb(p) ? p(C) : a
    }
  );
}
var Cu = "CheckboxTrigger", Su = f.forwardRef(
  ({ __scopeCheckbox: e, onKeyDown: t, onClick: n, ...a }, r) => {
    const {
      control: o,
      value: i,
      disabled: s,
      checked: c,
      required: d,
      setControl: u,
      setChecked: p,
      hasConsumerStoppedPropagationRef: m,
      isFormControl: h,
      bubbleInput: b
    } = Is(Cu, e), g = le(r, u), v = f.useRef(c);
    return f.useEffect(() => {
      const y = o?.form;
      if (y) {
        const w = () => p(v.current);
        return y.addEventListener("reset", w), () => y.removeEventListener("reset", w);
      }
    }, [o, p]), /* @__PURE__ */ l.jsx(
      Y.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": an(c) ? "mixed" : c,
        "aria-required": d,
        "data-state": Pu(c),
        "data-disabled": s ? "" : void 0,
        disabled: s,
        value: i,
        ...a,
        ref: g,
        onKeyDown: U(t, (y) => {
          y.key === "Enter" && y.preventDefault();
        }),
        onClick: U(n, (y) => {
          p((w) => an(w) ? !0 : !w), b && h && (m.current = y.isPropagationStopped(), m.current || y.stopPropagation());
        })
      }
    );
  }
);
Su.displayName = Cu;
var Ls = f.forwardRef(
  (e, t) => {
    const {
      __scopeCheckbox: n,
      name: a,
      checked: r,
      defaultChecked: o,
      required: i,
      disabled: s,
      value: c,
      onCheckedChange: d,
      form: u,
      ...p
    } = e;
    return /* @__PURE__ */ l.jsx(
      Yb,
      {
        __scopeCheckbox: n,
        checked: r,
        defaultChecked: o,
        disabled: s,
        required: i,
        onCheckedChange: d,
        name: a,
        form: u,
        value: c,
        internal_do_not_use_render: ({ isFormControl: m }) => /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
          /* @__PURE__ */ l.jsx(
            Su,
            {
              ...p,
              ref: t,
              __scopeCheckbox: n
            }
          ),
          m && /* @__PURE__ */ l.jsx(
            Ru,
            {
              __scopeCheckbox: n
            }
          )
        ] })
      }
    );
  }
);
Ls.displayName = No;
var _u = "CheckboxIndicator", Nu = f.forwardRef(
  (e, t) => {
    const { __scopeCheckbox: n, forceMount: a, ...r } = e, o = Is(_u, n);
    return /* @__PURE__ */ l.jsx(
      Ge,
      {
        present: a || an(o.checked) || o.checked === !0,
        children: /* @__PURE__ */ l.jsx(
          Y.span,
          {
            "data-state": Pu(o.checked),
            "data-disabled": o.disabled ? "" : void 0,
            ...r,
            ref: t,
            style: { pointerEvents: "none", ...e.style }
          }
        )
      }
    );
  }
);
Nu.displayName = _u;
var Eu = "CheckboxBubbleInput", Ru = f.forwardRef(
  ({ __scopeCheckbox: e, ...t }, n) => {
    const {
      control: a,
      hasConsumerStoppedPropagationRef: r,
      checked: o,
      defaultChecked: i,
      required: s,
      disabled: c,
      name: d,
      value: u,
      form: p,
      bubbleInput: m,
      setBubbleInput: h
    } = Is(Eu, e), b = le(n, h), g = So(o), v = _o(a);
    f.useEffect(() => {
      const w = m;
      if (!w) return;
      const $ = window.HTMLInputElement.prototype, R = Object.getOwnPropertyDescriptor(
        $,
        "checked"
      ).set, k = !r.current;
      if (g !== o && R) {
        const S = new Event("click", { bubbles: k });
        w.indeterminate = an(o), R.call(w, an(o) ? !1 : o), w.dispatchEvent(S);
      }
    }, [m, g, o, r]);
    const y = f.useRef(an(o) ? !1 : o);
    return /* @__PURE__ */ l.jsx(
      Y.input,
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: i ?? y.current,
        required: s,
        disabled: c,
        name: d,
        value: u,
        form: p,
        ...t,
        tabIndex: -1,
        ref: b,
        style: {
          ...t.style,
          ...v,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
Ru.displayName = Eu;
function Zb(e) {
  return typeof e == "function";
}
function an(e) {
  return e === "indeterminate";
}
function Pu(e) {
  return an(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function jt(e, t) {
  if (e == null) return {};
  var n = {}, a = Object.keys(e), r, o;
  for (o = 0; o < a.length; o++)
    r = a[o], !(t.indexOf(r) >= 0) && (n[r] = e[r]);
  return n;
}
var Xb = ["color"], qb = /* @__PURE__ */ Ye(function(e, t) {
  var n = e.color, a = n === void 0 ? "currentColor" : n, r = jt(e, Xb);
  return Ee("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, r, {
    ref: t
  }), Ee("path", {
    d: "M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z",
    fill: a,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
}), Jb = ["color"], Eo = /* @__PURE__ */ Ye(function(e, t) {
  var n = e.color, a = n === void 0 ? "currentColor" : n, r = jt(e, Jb);
  return Ee("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, r, {
    ref: t
  }), Ee("path", {
    d: "M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z",
    fill: a,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
}), Qb = ["color"], e1 = /* @__PURE__ */ Ye(function(e, t) {
  var n = e.color, a = n === void 0 ? "currentColor" : n, r = jt(e, Qb);
  return Ee("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, r, {
    ref: t
  }), Ee("path", {
    d: "M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",
    fill: a,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
}), t1 = ["color"], n1 = /* @__PURE__ */ Ye(function(e, t) {
  var n = e.color, a = n === void 0 ? "currentColor" : n, r = jt(e, t1);
  return Ee("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, r, {
    ref: t
  }), Ee("path", {
    d: "M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z",
    fill: a,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
}), a1 = ["color"], ku = /* @__PURE__ */ Ye(function(e, t) {
  var n = e.color, a = n === void 0 ? "currentColor" : n, r = jt(e, a1);
  return Ee("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, r, {
    ref: t
  }), Ee("path", {
    d: "M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z",
    fill: a,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
}), r1 = ["color"], o1 = /* @__PURE__ */ Ye(function(e, t) {
  var n = e.color, a = n === void 0 ? "currentColor" : n, r = jt(e, r1);
  return Ee("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, r, {
    ref: t
  }), Ee("path", {
    d: "M3.13523 8.84197C3.3241 9.04343 3.64052 9.05363 3.84197 8.86477L7.5 5.43536L11.158 8.86477C11.3595 9.05363 11.6759 9.04343 11.8648 8.84197C12.0536 8.64051 12.0434 8.32409 11.842 8.13523L7.84197 4.38523C7.64964 4.20492 7.35036 4.20492 7.15803 4.38523L3.15803 8.13523C2.95657 8.32409 2.94637 8.64051 3.13523 8.84197Z",
    fill: a,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
}), i1 = ["color"], s1 = /* @__PURE__ */ Ye(function(e, t) {
  var n = e.color, a = n === void 0 ? "currentColor" : n, r = jt(e, i1);
  return Ee("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, r, {
    ref: t
  }), Ee("path", {
    d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
    fill: a,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
}), l1 = ["color"], c1 = /* @__PURE__ */ Ye(function(e, t) {
  var n = e.color, a = n === void 0 ? "currentColor" : n, r = jt(e, l1);
  return Ee("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, r, {
    ref: t
  }), Ee("path", {
    d: "M5 7.5C5 7.22386 5.22386 7 5.5 7H9.5C9.77614 7 10 7.22386 10 7.5C10 7.77614 9.77614 8 9.5 8H5.5C5.22386 8 5 7.77614 5 7.5Z",
    fill: a,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
}), d1 = ["color"], u1 = /* @__PURE__ */ Ye(function(e, t) {
  var n = e.color, a = n === void 0 ? "currentColor" : n, r = jt(e, d1);
  return Ee("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, r, {
    ref: t
  }), Ee("path", {
    d: "M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z",
    fill: a
  }));
}), f1 = ["color"], p1 = /* @__PURE__ */ Ye(function(e, t) {
  var n = e.color, a = n === void 0 ? "currentColor" : n, r = jt(e, f1);
  return Ee("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, r, {
    ref: t
  }), Ee("path", {
    d: "M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z",
    fill: a,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
});
const Dn = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  Ls,
  {
    ref: n,
    className: x(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      e
    ),
    ...t,
    children: /* @__PURE__ */ l.jsx(
      Nu,
      {
        className: x("flex items-center justify-center text-current"),
        children: /* @__PURE__ */ l.jsx(Eo, { className: "h-4 w-4" })
      }
    )
  }
));
Dn.displayName = Ls.displayName;
function Le(e) {
  const t = f.useRef(e);
  return f.useEffect(() => {
    t.current = e;
  }), f.useMemo(() => (...n) => t.current?.(...n), []);
}
function m1(e, t = globalThis?.document) {
  const n = Le(e);
  f.useEffect(() => {
    const a = (r) => {
      r.key === "Escape" && n(r);
    };
    return t.addEventListener("keydown", a, { capture: !0 }), () => t.removeEventListener("keydown", a, { capture: !0 });
  }, [n, t]);
}
var h1 = "DismissableLayer", Ji = "dismissableLayer.update", g1 = "dismissableLayer.pointerDownOutside", b1 = "dismissableLayer.focusOutside", _c, Tu = f.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), va = f.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: a,
      onPointerDownOutside: r,
      onFocusOutside: o,
      onInteractOutside: i,
      onDismiss: s,
      ...c
    } = e, d = f.useContext(Tu), [u, p] = f.useState(null), m = u?.ownerDocument ?? globalThis?.document, [, h] = f.useState({}), b = le(t, (S) => p(S)), g = Array.from(d.layers), [v] = [...d.layersWithOutsidePointerEventsDisabled].slice(-1), y = g.indexOf(v), w = u ? g.indexOf(u) : -1, $ = d.layersWithOutsidePointerEventsDisabled.size > 0, C = w >= y, R = x1((S) => {
      const j = S.target, P = [...d.branches].some((B) => B.contains(j));
      !C || P || (r?.(S), i?.(S), S.defaultPrevented || s?.());
    }, m), k = w1((S) => {
      const j = S.target;
      [...d.branches].some((B) => B.contains(j)) || (o?.(S), i?.(S), S.defaultPrevented || s?.());
    }, m);
    return m1((S) => {
      w === d.layers.size - 1 && (a?.(S), !S.defaultPrevented && s && (S.preventDefault(), s()));
    }, m), f.useEffect(() => {
      if (u)
        return n && (d.layersWithOutsidePointerEventsDisabled.size === 0 && (_c = m.body.style.pointerEvents, m.body.style.pointerEvents = "none"), d.layersWithOutsidePointerEventsDisabled.add(u)), d.layers.add(u), Nc(), () => {
          n && d.layersWithOutsidePointerEventsDisabled.size === 1 && (m.body.style.pointerEvents = _c);
        };
    }, [u, m, n, d]), f.useEffect(() => () => {
      u && (d.layers.delete(u), d.layersWithOutsidePointerEventsDisabled.delete(u), Nc());
    }, [u, d]), f.useEffect(() => {
      const S = () => h({});
      return document.addEventListener(Ji, S), () => document.removeEventListener(Ji, S);
    }, []), /* @__PURE__ */ l.jsx(
      Y.div,
      {
        ...c,
        ref: b,
        style: {
          pointerEvents: $ ? C ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: U(e.onFocusCapture, k.onFocusCapture),
        onBlurCapture: U(e.onBlurCapture, k.onBlurCapture),
        onPointerDownCapture: U(
          e.onPointerDownCapture,
          R.onPointerDownCapture
        )
      }
    );
  }
);
va.displayName = h1;
var v1 = "DismissableLayerBranch", y1 = f.forwardRef((e, t) => {
  const n = f.useContext(Tu), a = f.useRef(null), r = le(t, a);
  return f.useEffect(() => {
    const o = a.current;
    if (o)
      return n.branches.add(o), () => {
        n.branches.delete(o);
      };
  }, [n.branches]), /* @__PURE__ */ l.jsx(Y.div, { ...e, ref: r });
});
y1.displayName = v1;
function x1(e, t = globalThis?.document) {
  const n = Le(e), a = f.useRef(!1), r = f.useRef(() => {
  });
  return f.useEffect(() => {
    const o = (s) => {
      if (s.target && !a.current) {
        let c = function() {
          Au(
            g1,
            n,
            d,
            { discrete: !0 }
          );
        };
        const d = { originalEvent: s };
        s.pointerType === "touch" ? (t.removeEventListener("click", r.current), r.current = c, t.addEventListener("click", r.current, { once: !0 })) : c();
      } else
        t.removeEventListener("click", r.current);
      a.current = !1;
    }, i = window.setTimeout(() => {
      t.addEventListener("pointerdown", o);
    }, 0);
    return () => {
      window.clearTimeout(i), t.removeEventListener("pointerdown", o), t.removeEventListener("click", r.current);
    };
  }, [t, n]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => a.current = !0
  };
}
function w1(e, t = globalThis?.document) {
  const n = Le(e), a = f.useRef(!1);
  return f.useEffect(() => {
    const r = (o) => {
      o.target && !a.current && Au(b1, n, { originalEvent: o }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", r), () => t.removeEventListener("focusin", r);
  }, [t, n]), {
    onFocusCapture: () => a.current = !0,
    onBlurCapture: () => a.current = !1
  };
}
function Nc() {
  const e = new CustomEvent(Ji);
  document.dispatchEvent(e);
}
function Au(e, t, n, { discrete: a }) {
  const r = n.originalEvent.target, o = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && r.addEventListener(e, t, { once: !0 }), a ? $u(r, o) : r.dispatchEvent(o);
}
var $1 = f[" useId ".trim().toString()] || (() => {
}), C1 = 0;
function Me(e) {
  const [t, n] = f.useState($1());
  return Oe(() => {
    n((a) => a ?? String(C1++));
  }, [e]), t ? `radix-${t}` : "";
}
const S1 = ["top", "right", "bottom", "left"], sn = Math.min, at = Math.max, Zr = Math.round, Or = Math.floor, Rt = (e) => ({
  x: e,
  y: e
}), _1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, N1 = {
  start: "end",
  end: "start"
};
function Qi(e, t, n) {
  return at(e, sn(t, n));
}
function Wt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Ht(e) {
  return e.split("-")[0];
}
function ya(e) {
  return e.split("-")[1];
}
function Fs(e) {
  return e === "x" ? "y" : "x";
}
function Bs(e) {
  return e === "y" ? "height" : "width";
}
const E1 = /* @__PURE__ */ new Set(["top", "bottom"]);
function Nt(e) {
  return E1.has(Ht(e)) ? "y" : "x";
}
function Us(e) {
  return Fs(Nt(e));
}
function R1(e, t, n) {
  n === void 0 && (n = !1);
  const a = ya(e), r = Us(e), o = Bs(r);
  let i = r === "x" ? a === (n ? "end" : "start") ? "right" : "left" : a === "start" ? "bottom" : "top";
  return t.reference[o] > t.floating[o] && (i = Xr(i)), [i, Xr(i)];
}
function P1(e) {
  const t = Xr(e);
  return [es(e), t, es(t)];
}
function es(e) {
  return e.replace(/start|end/g, (t) => N1[t]);
}
const Ec = ["left", "right"], Rc = ["right", "left"], k1 = ["top", "bottom"], T1 = ["bottom", "top"];
function A1(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? Rc : Ec : t ? Ec : Rc;
    case "left":
    case "right":
      return t ? k1 : T1;
    default:
      return [];
  }
}
function j1(e, t, n, a) {
  const r = ya(e);
  let o = A1(Ht(e), n === "start", a);
  return r && (o = o.map((i) => i + "-" + r), t && (o = o.concat(o.map(es)))), o;
}
function Xr(e) {
  return e.replace(/left|right|bottom|top/g, (t) => _1[t]);
}
function M1(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function ju(e) {
  return typeof e != "number" ? M1(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function qr(e) {
  const {
    x: t,
    y: n,
    width: a,
    height: r
  } = e;
  return {
    width: a,
    height: r,
    top: n,
    left: t,
    right: t + a,
    bottom: n + r,
    x: t,
    y: n
  };
}
function Pc(e, t, n) {
  let {
    reference: a,
    floating: r
  } = e;
  const o = Nt(t), i = Us(t), s = Bs(i), c = Ht(t), d = o === "y", u = a.x + a.width / 2 - r.width / 2, p = a.y + a.height / 2 - r.height / 2, m = a[s] / 2 - r[s] / 2;
  let h;
  switch (c) {
    case "top":
      h = {
        x: u,
        y: a.y - r.height
      };
      break;
    case "bottom":
      h = {
        x: u,
        y: a.y + a.height
      };
      break;
    case "right":
      h = {
        x: a.x + a.width,
        y: p
      };
      break;
    case "left":
      h = {
        x: a.x - r.width,
        y: p
      };
      break;
    default:
      h = {
        x: a.x,
        y: a.y
      };
  }
  switch (ya(t)) {
    case "start":
      h[i] -= m * (n && d ? -1 : 1);
      break;
    case "end":
      h[i] += m * (n && d ? -1 : 1);
      break;
  }
  return h;
}
const O1 = async (e, t, n) => {
  const {
    placement: a = "bottom",
    strategy: r = "absolute",
    middleware: o = [],
    platform: i
  } = n, s = o.filter(Boolean), c = await (i.isRTL == null ? void 0 : i.isRTL(t));
  let d = await i.getElementRects({
    reference: e,
    floating: t,
    strategy: r
  }), {
    x: u,
    y: p
  } = Pc(d, a, c), m = a, h = {}, b = 0;
  for (let g = 0; g < s.length; g++) {
    const {
      name: v,
      fn: y
    } = s[g], {
      x: w,
      y: $,
      data: C,
      reset: R
    } = await y({
      x: u,
      y: p,
      initialPlacement: a,
      placement: m,
      strategy: r,
      middlewareData: h,
      rects: d,
      platform: i,
      elements: {
        reference: e,
        floating: t
      }
    });
    u = w ?? u, p = $ ?? p, h = {
      ...h,
      [v]: {
        ...h[v],
        ...C
      }
    }, R && b <= 50 && (b++, typeof R == "object" && (R.placement && (m = R.placement), R.rects && (d = R.rects === !0 ? await i.getElementRects({
      reference: e,
      floating: t,
      strategy: r
    }) : R.rects), {
      x: u,
      y: p
    } = Pc(d, m, c)), g = -1);
  }
  return {
    x: u,
    y: p,
    placement: m,
    strategy: r,
    middlewareData: h
  };
};
async function Ua(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: a,
    y: r,
    platform: o,
    rects: i,
    elements: s,
    strategy: c
  } = e, {
    boundary: d = "clippingAncestors",
    rootBoundary: u = "viewport",
    elementContext: p = "floating",
    altBoundary: m = !1,
    padding: h = 0
  } = Wt(t, e), b = ju(h), v = s[m ? p === "floating" ? "reference" : "floating" : p], y = qr(await o.getClippingRect({
    element: (n = await (o.isElement == null ? void 0 : o.isElement(v))) == null || n ? v : v.contextElement || await (o.getDocumentElement == null ? void 0 : o.getDocumentElement(s.floating)),
    boundary: d,
    rootBoundary: u,
    strategy: c
  })), w = p === "floating" ? {
    x: a,
    y: r,
    width: i.floating.width,
    height: i.floating.height
  } : i.reference, $ = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(s.floating)), C = await (o.isElement == null ? void 0 : o.isElement($)) ? await (o.getScale == null ? void 0 : o.getScale($)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, R = qr(o.convertOffsetParentRelativeRectToViewportRelativeRect ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: s,
    rect: w,
    offsetParent: $,
    strategy: c
  }) : w);
  return {
    top: (y.top - R.top + b.top) / C.y,
    bottom: (R.bottom - y.bottom + b.bottom) / C.y,
    left: (y.left - R.left + b.left) / C.x,
    right: (R.right - y.right + b.right) / C.x
  };
}
const D1 = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: a,
      placement: r,
      rects: o,
      platform: i,
      elements: s,
      middlewareData: c
    } = t, {
      element: d,
      padding: u = 0
    } = Wt(e, t) || {};
    if (d == null)
      return {};
    const p = ju(u), m = {
      x: n,
      y: a
    }, h = Us(r), b = Bs(h), g = await i.getDimensions(d), v = h === "y", y = v ? "top" : "left", w = v ? "bottom" : "right", $ = v ? "clientHeight" : "clientWidth", C = o.reference[b] + o.reference[h] - m[h] - o.floating[b], R = m[h] - o.reference[h], k = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(d));
    let S = k ? k[$] : 0;
    (!S || !await (i.isElement == null ? void 0 : i.isElement(k))) && (S = s.floating[$] || o.floating[b]);
    const j = C / 2 - R / 2, P = S / 2 - g[b] / 2 - 1, B = sn(p[y], P), z = sn(p[w], P), L = B, T = S - g[b] - z, K = S / 2 - g[b] / 2 + j, Q = Qi(L, K, T), V = !c.arrow && ya(r) != null && K !== Q && o.reference[b] / 2 - (K < L ? B : z) - g[b] / 2 < 0, A = V ? K < L ? K - L : K - T : 0;
    return {
      [h]: m[h] + A,
      data: {
        [h]: Q,
        centerOffset: K - Q - A,
        ...V && {
          alignmentOffset: A
        }
      },
      reset: V
    };
  }
}), I1 = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, a;
      const {
        placement: r,
        middlewareData: o,
        rects: i,
        initialPlacement: s,
        platform: c,
        elements: d
      } = t, {
        mainAxis: u = !0,
        crossAxis: p = !0,
        fallbackPlacements: m,
        fallbackStrategy: h = "bestFit",
        fallbackAxisSideDirection: b = "none",
        flipAlignment: g = !0,
        ...v
      } = Wt(e, t);
      if ((n = o.arrow) != null && n.alignmentOffset)
        return {};
      const y = Ht(r), w = Nt(s), $ = Ht(s) === s, C = await (c.isRTL == null ? void 0 : c.isRTL(d.floating)), R = m || ($ || !g ? [Xr(s)] : P1(s)), k = b !== "none";
      !m && k && R.push(...j1(s, g, b, C));
      const S = [s, ...R], j = await Ua(t, v), P = [];
      let B = ((a = o.flip) == null ? void 0 : a.overflows) || [];
      if (u && P.push(j[y]), p) {
        const K = R1(r, i, C);
        P.push(j[K[0]], j[K[1]]);
      }
      if (B = [...B, {
        placement: r,
        overflows: P
      }], !P.every((K) => K <= 0)) {
        var z, L;
        const K = (((z = o.flip) == null ? void 0 : z.index) || 0) + 1, Q = S[K];
        if (Q && (!(p === "alignment" ? w !== Nt(Q) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        B.every((E) => Nt(E.placement) === w ? E.overflows[0] > 0 : !0)))
          return {
            data: {
              index: K,
              overflows: B
            },
            reset: {
              placement: Q
            }
          };
        let V = (L = B.filter((A) => A.overflows[0] <= 0).sort((A, E) => A.overflows[1] - E.overflows[1])[0]) == null ? void 0 : L.placement;
        if (!V)
          switch (h) {
            case "bestFit": {
              var T;
              const A = (T = B.filter((E) => {
                if (k) {
                  const O = Nt(E.placement);
                  return O === w || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  O === "y";
                }
                return !0;
              }).map((E) => [E.placement, E.overflows.filter((O) => O > 0).reduce((O, N) => O + N, 0)]).sort((E, O) => E[1] - O[1])[0]) == null ? void 0 : T[0];
              A && (V = A);
              break;
            }
            case "initialPlacement":
              V = s;
              break;
          }
        if (r !== V)
          return {
            reset: {
              placement: V
            }
          };
      }
      return {};
    }
  };
};
function kc(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Tc(e) {
  return S1.some((t) => e[t] >= 0);
}
const L1 = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: a = "referenceHidden",
        ...r
      } = Wt(e, t);
      switch (a) {
        case "referenceHidden": {
          const o = await Ua(t, {
            ...r,
            elementContext: "reference"
          }), i = kc(o, n.reference);
          return {
            data: {
              referenceHiddenOffsets: i,
              referenceHidden: Tc(i)
            }
          };
        }
        case "escaped": {
          const o = await Ua(t, {
            ...r,
            altBoundary: !0
          }), i = kc(o, n.floating);
          return {
            data: {
              escapedOffsets: i,
              escaped: Tc(i)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Mu = /* @__PURE__ */ new Set(["left", "top"]);
async function F1(e, t) {
  const {
    placement: n,
    platform: a,
    elements: r
  } = e, o = await (a.isRTL == null ? void 0 : a.isRTL(r.floating)), i = Ht(n), s = ya(n), c = Nt(n) === "y", d = Mu.has(i) ? -1 : 1, u = o && c ? -1 : 1, p = Wt(t, e);
  let {
    mainAxis: m,
    crossAxis: h,
    alignmentAxis: b
  } = typeof p == "number" ? {
    mainAxis: p,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: p.mainAxis || 0,
    crossAxis: p.crossAxis || 0,
    alignmentAxis: p.alignmentAxis
  };
  return s && typeof b == "number" && (h = s === "end" ? b * -1 : b), c ? {
    x: h * u,
    y: m * d
  } : {
    x: m * d,
    y: h * u
  };
}
const B1 = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, a;
      const {
        x: r,
        y: o,
        placement: i,
        middlewareData: s
      } = t, c = await F1(t, e);
      return i === ((n = s.offset) == null ? void 0 : n.placement) && (a = s.arrow) != null && a.alignmentOffset ? {} : {
        x: r + c.x,
        y: o + c.y,
        data: {
          ...c,
          placement: i
        }
      };
    }
  };
}, U1 = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: a,
        placement: r
      } = t, {
        mainAxis: o = !0,
        crossAxis: i = !1,
        limiter: s = {
          fn: (v) => {
            let {
              x: y,
              y: w
            } = v;
            return {
              x: y,
              y: w
            };
          }
        },
        ...c
      } = Wt(e, t), d = {
        x: n,
        y: a
      }, u = await Ua(t, c), p = Nt(Ht(r)), m = Fs(p);
      let h = d[m], b = d[p];
      if (o) {
        const v = m === "y" ? "top" : "left", y = m === "y" ? "bottom" : "right", w = h + u[v], $ = h - u[y];
        h = Qi(w, h, $);
      }
      if (i) {
        const v = p === "y" ? "top" : "left", y = p === "y" ? "bottom" : "right", w = b + u[v], $ = b - u[y];
        b = Qi(w, b, $);
      }
      const g = s.fn({
        ...t,
        [m]: h,
        [p]: b
      });
      return {
        ...g,
        data: {
          x: g.x - n,
          y: g.y - a,
          enabled: {
            [m]: o,
            [p]: i
          }
        }
      };
    }
  };
}, G1 = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: a,
        placement: r,
        rects: o,
        middlewareData: i
      } = t, {
        offset: s = 0,
        mainAxis: c = !0,
        crossAxis: d = !0
      } = Wt(e, t), u = {
        x: n,
        y: a
      }, p = Nt(r), m = Fs(p);
      let h = u[m], b = u[p];
      const g = Wt(s, t), v = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (c) {
        const $ = m === "y" ? "height" : "width", C = o.reference[m] - o.floating[$] + v.mainAxis, R = o.reference[m] + o.reference[$] - v.mainAxis;
        h < C ? h = C : h > R && (h = R);
      }
      if (d) {
        var y, w;
        const $ = m === "y" ? "width" : "height", C = Mu.has(Ht(r)), R = o.reference[p] - o.floating[$] + (C && ((y = i.offset) == null ? void 0 : y[p]) || 0) + (C ? 0 : v.crossAxis), k = o.reference[p] + o.reference[$] + (C ? 0 : ((w = i.offset) == null ? void 0 : w[p]) || 0) - (C ? v.crossAxis : 0);
        b < R ? b = R : b > k && (b = k);
      }
      return {
        [m]: h,
        [p]: b
      };
    }
  };
}, W1 = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, a;
      const {
        placement: r,
        rects: o,
        platform: i,
        elements: s
      } = t, {
        apply: c = () => {
        },
        ...d
      } = Wt(e, t), u = await Ua(t, d), p = Ht(r), m = ya(r), h = Nt(r) === "y", {
        width: b,
        height: g
      } = o.floating;
      let v, y;
      p === "top" || p === "bottom" ? (v = p, y = m === (await (i.isRTL == null ? void 0 : i.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (y = p, v = m === "end" ? "top" : "bottom");
      const w = g - u.top - u.bottom, $ = b - u.left - u.right, C = sn(g - u[v], w), R = sn(b - u[y], $), k = !t.middlewareData.shift;
      let S = C, j = R;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (j = $), (a = t.middlewareData.shift) != null && a.enabled.y && (S = w), k && !m) {
        const B = at(u.left, 0), z = at(u.right, 0), L = at(u.top, 0), T = at(u.bottom, 0);
        h ? j = b - 2 * (B !== 0 || z !== 0 ? B + z : at(u.left, u.right)) : S = g - 2 * (L !== 0 || T !== 0 ? L + T : at(u.top, u.bottom));
      }
      await c({
        ...t,
        availableWidth: j,
        availableHeight: S
      });
      const P = await i.getDimensions(s.floating);
      return b !== P.width || g !== P.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Ro() {
  return typeof window < "u";
}
function xa(e) {
  return Ou(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function rt(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Mt(e) {
  var t;
  return (t = (Ou(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Ou(e) {
  return Ro() ? e instanceof Node || e instanceof rt(e).Node : !1;
}
function mt(e) {
  return Ro() ? e instanceof Element || e instanceof rt(e).Element : !1;
}
function kt(e) {
  return Ro() ? e instanceof HTMLElement || e instanceof rt(e).HTMLElement : !1;
}
function Ac(e) {
  return !Ro() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof rt(e).ShadowRoot;
}
const H1 = /* @__PURE__ */ new Set(["inline", "contents"]);
function cr(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: a,
    display: r
  } = ht(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + a + n) && !H1.has(r);
}
const V1 = /* @__PURE__ */ new Set(["table", "td", "th"]);
function z1(e) {
  return V1.has(xa(e));
}
const K1 = [":popover-open", ":modal"];
function Po(e) {
  return K1.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const Y1 = ["transform", "translate", "scale", "rotate", "perspective"], Z1 = ["transform", "translate", "scale", "rotate", "perspective", "filter"], X1 = ["paint", "layout", "strict", "content"];
function Gs(e) {
  const t = Ws(), n = mt(e) ? ht(e) : e;
  return Y1.some((a) => n[a] ? n[a] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || Z1.some((a) => (n.willChange || "").includes(a)) || X1.some((a) => (n.contain || "").includes(a));
}
function q1(e) {
  let t = ln(e);
  for (; kt(t) && !aa(t); ) {
    if (Gs(t))
      return t;
    if (Po(t))
      return null;
    t = ln(t);
  }
  return null;
}
function Ws() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const J1 = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function aa(e) {
  return J1.has(xa(e));
}
function ht(e) {
  return rt(e).getComputedStyle(e);
}
function ko(e) {
  return mt(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function ln(e) {
  if (xa(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Ac(e) && e.host || // Fallback.
    Mt(e)
  );
  return Ac(t) ? t.host : t;
}
function Du(e) {
  const t = ln(e);
  return aa(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : kt(t) && cr(t) ? t : Du(t);
}
function Ga(e, t, n) {
  var a;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const r = Du(e), o = r === ((a = e.ownerDocument) == null ? void 0 : a.body), i = rt(r);
  if (o) {
    const s = ts(i);
    return t.concat(i, i.visualViewport || [], cr(r) ? r : [], s && n ? Ga(s) : []);
  }
  return t.concat(r, Ga(r, [], n));
}
function ts(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Iu(e) {
  const t = ht(e);
  let n = parseFloat(t.width) || 0, a = parseFloat(t.height) || 0;
  const r = kt(e), o = r ? e.offsetWidth : n, i = r ? e.offsetHeight : a, s = Zr(n) !== o || Zr(a) !== i;
  return s && (n = o, a = i), {
    width: n,
    height: a,
    $: s
  };
}
function Hs(e) {
  return mt(e) ? e : e.contextElement;
}
function ea(e) {
  const t = Hs(e);
  if (!kt(t))
    return Rt(1);
  const n = t.getBoundingClientRect(), {
    width: a,
    height: r,
    $: o
  } = Iu(t);
  let i = (o ? Zr(n.width) : n.width) / a, s = (o ? Zr(n.height) : n.height) / r;
  return (!i || !Number.isFinite(i)) && (i = 1), (!s || !Number.isFinite(s)) && (s = 1), {
    x: i,
    y: s
  };
}
const Q1 = /* @__PURE__ */ Rt(0);
function Lu(e) {
  const t = rt(e);
  return !Ws() || !t.visualViewport ? Q1 : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function e2(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== rt(e) ? !1 : t;
}
function En(e, t, n, a) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), o = Hs(e);
  let i = Rt(1);
  t && (a ? mt(a) && (i = ea(a)) : i = ea(e));
  const s = e2(o, n, a) ? Lu(o) : Rt(0);
  let c = (r.left + s.x) / i.x, d = (r.top + s.y) / i.y, u = r.width / i.x, p = r.height / i.y;
  if (o) {
    const m = rt(o), h = a && mt(a) ? rt(a) : a;
    let b = m, g = ts(b);
    for (; g && a && h !== b; ) {
      const v = ea(g), y = g.getBoundingClientRect(), w = ht(g), $ = y.left + (g.clientLeft + parseFloat(w.paddingLeft)) * v.x, C = y.top + (g.clientTop + parseFloat(w.paddingTop)) * v.y;
      c *= v.x, d *= v.y, u *= v.x, p *= v.y, c += $, d += C, b = rt(g), g = ts(b);
    }
  }
  return qr({
    width: u,
    height: p,
    x: c,
    y: d
  });
}
function To(e, t) {
  const n = ko(e).scrollLeft;
  return t ? t.left + n : En(Mt(e)).left + n;
}
function Fu(e, t) {
  const n = e.getBoundingClientRect(), a = n.left + t.scrollLeft - To(e, n), r = n.top + t.scrollTop;
  return {
    x: a,
    y: r
  };
}
function t2(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: a,
    strategy: r
  } = e;
  const o = r === "fixed", i = Mt(a), s = t ? Po(t.floating) : !1;
  if (a === i || s && o)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, d = Rt(1);
  const u = Rt(0), p = kt(a);
  if ((p || !p && !o) && ((xa(a) !== "body" || cr(i)) && (c = ko(a)), kt(a))) {
    const h = En(a);
    d = ea(a), u.x = h.x + a.clientLeft, u.y = h.y + a.clientTop;
  }
  const m = i && !p && !o ? Fu(i, c) : Rt(0);
  return {
    width: n.width * d.x,
    height: n.height * d.y,
    x: n.x * d.x - c.scrollLeft * d.x + u.x + m.x,
    y: n.y * d.y - c.scrollTop * d.y + u.y + m.y
  };
}
function n2(e) {
  return Array.from(e.getClientRects());
}
function a2(e) {
  const t = Mt(e), n = ko(e), a = e.ownerDocument.body, r = at(t.scrollWidth, t.clientWidth, a.scrollWidth, a.clientWidth), o = at(t.scrollHeight, t.clientHeight, a.scrollHeight, a.clientHeight);
  let i = -n.scrollLeft + To(e);
  const s = -n.scrollTop;
  return ht(a).direction === "rtl" && (i += at(t.clientWidth, a.clientWidth) - r), {
    width: r,
    height: o,
    x: i,
    y: s
  };
}
const jc = 25;
function r2(e, t) {
  const n = rt(e), a = Mt(e), r = n.visualViewport;
  let o = a.clientWidth, i = a.clientHeight, s = 0, c = 0;
  if (r) {
    o = r.width, i = r.height;
    const u = Ws();
    (!u || u && t === "fixed") && (s = r.offsetLeft, c = r.offsetTop);
  }
  const d = To(a);
  if (d <= 0) {
    const u = a.ownerDocument, p = u.body, m = getComputedStyle(p), h = u.compatMode === "CSS1Compat" && parseFloat(m.marginLeft) + parseFloat(m.marginRight) || 0, b = Math.abs(a.clientWidth - p.clientWidth - h);
    b <= jc && (o -= b);
  } else d <= jc && (o += d);
  return {
    width: o,
    height: i,
    x: s,
    y: c
  };
}
const o2 = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function i2(e, t) {
  const n = En(e, !0, t === "fixed"), a = n.top + e.clientTop, r = n.left + e.clientLeft, o = kt(e) ? ea(e) : Rt(1), i = e.clientWidth * o.x, s = e.clientHeight * o.y, c = r * o.x, d = a * o.y;
  return {
    width: i,
    height: s,
    x: c,
    y: d
  };
}
function Mc(e, t, n) {
  let a;
  if (t === "viewport")
    a = r2(e, n);
  else if (t === "document")
    a = a2(Mt(e));
  else if (mt(t))
    a = i2(t, n);
  else {
    const r = Lu(e);
    a = {
      x: t.x - r.x,
      y: t.y - r.y,
      width: t.width,
      height: t.height
    };
  }
  return qr(a);
}
function Bu(e, t) {
  const n = ln(e);
  return n === t || !mt(n) || aa(n) ? !1 : ht(n).position === "fixed" || Bu(n, t);
}
function s2(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let a = Ga(e, [], !1).filter((s) => mt(s) && xa(s) !== "body"), r = null;
  const o = ht(e).position === "fixed";
  let i = o ? ln(e) : e;
  for (; mt(i) && !aa(i); ) {
    const s = ht(i), c = Gs(i);
    !c && s.position === "fixed" && (r = null), (o ? !c && !r : !c && s.position === "static" && !!r && o2.has(r.position) || cr(i) && !c && Bu(e, i)) ? a = a.filter((u) => u !== i) : r = s, i = ln(i);
  }
  return t.set(e, a), a;
}
function l2(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: a,
    strategy: r
  } = e;
  const i = [...n === "clippingAncestors" ? Po(t) ? [] : s2(t, this._c) : [].concat(n), a], s = i[0], c = i.reduce((d, u) => {
    const p = Mc(t, u, r);
    return d.top = at(p.top, d.top), d.right = sn(p.right, d.right), d.bottom = sn(p.bottom, d.bottom), d.left = at(p.left, d.left), d;
  }, Mc(t, s, r));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function c2(e) {
  const {
    width: t,
    height: n
  } = Iu(e);
  return {
    width: t,
    height: n
  };
}
function d2(e, t, n) {
  const a = kt(t), r = Mt(t), o = n === "fixed", i = En(e, !0, o, t);
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = Rt(0);
  function d() {
    c.x = To(r);
  }
  if (a || !a && !o)
    if ((xa(t) !== "body" || cr(r)) && (s = ko(t)), a) {
      const h = En(t, !0, o, t);
      c.x = h.x + t.clientLeft, c.y = h.y + t.clientTop;
    } else r && d();
  o && !a && r && d();
  const u = r && !a && !o ? Fu(r, s) : Rt(0), p = i.left + s.scrollLeft - c.x - u.x, m = i.top + s.scrollTop - c.y - u.y;
  return {
    x: p,
    y: m,
    width: i.width,
    height: i.height
  };
}
function bi(e) {
  return ht(e).position === "static";
}
function Oc(e, t) {
  if (!kt(e) || ht(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return Mt(e) === n && (n = n.ownerDocument.body), n;
}
function Uu(e, t) {
  const n = rt(e);
  if (Po(e))
    return n;
  if (!kt(e)) {
    let r = ln(e);
    for (; r && !aa(r); ) {
      if (mt(r) && !bi(r))
        return r;
      r = ln(r);
    }
    return n;
  }
  let a = Oc(e, t);
  for (; a && z1(a) && bi(a); )
    a = Oc(a, t);
  return a && aa(a) && bi(a) && !Gs(a) ? n : a || q1(e) || n;
}
const u2 = async function(e) {
  const t = this.getOffsetParent || Uu, n = this.getDimensions, a = await n(e.floating);
  return {
    reference: d2(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: a.width,
      height: a.height
    }
  };
};
function f2(e) {
  return ht(e).direction === "rtl";
}
const p2 = {
  convertOffsetParentRelativeRectToViewportRelativeRect: t2,
  getDocumentElement: Mt,
  getClippingRect: l2,
  getOffsetParent: Uu,
  getElementRects: u2,
  getClientRects: n2,
  getDimensions: c2,
  getScale: ea,
  isElement: mt,
  isRTL: f2
};
function Gu(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function m2(e, t) {
  let n = null, a;
  const r = Mt(e);
  function o() {
    var s;
    clearTimeout(a), (s = n) == null || s.disconnect(), n = null;
  }
  function i(s, c) {
    s === void 0 && (s = !1), c === void 0 && (c = 1), o();
    const d = e.getBoundingClientRect(), {
      left: u,
      top: p,
      width: m,
      height: h
    } = d;
    if (s || t(), !m || !h)
      return;
    const b = Or(p), g = Or(r.clientWidth - (u + m)), v = Or(r.clientHeight - (p + h)), y = Or(u), $ = {
      rootMargin: -b + "px " + -g + "px " + -v + "px " + -y + "px",
      threshold: at(0, sn(1, c)) || 1
    };
    let C = !0;
    function R(k) {
      const S = k[0].intersectionRatio;
      if (S !== c) {
        if (!C)
          return i();
        S ? i(!1, S) : a = setTimeout(() => {
          i(!1, 1e-7);
        }, 1e3);
      }
      S === 1 && !Gu(d, e.getBoundingClientRect()) && i(), C = !1;
    }
    try {
      n = new IntersectionObserver(R, {
        ...$,
        // Handle <iframe>s
        root: r.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(R, $);
    }
    n.observe(e);
  }
  return i(!0), o;
}
function h2(e, t, n, a) {
  a === void 0 && (a = {});
  const {
    ancestorScroll: r = !0,
    ancestorResize: o = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: s = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = a, d = Hs(e), u = r || o ? [...d ? Ga(d) : [], ...Ga(t)] : [];
  u.forEach((y) => {
    r && y.addEventListener("scroll", n, {
      passive: !0
    }), o && y.addEventListener("resize", n);
  });
  const p = d && s ? m2(d, n) : null;
  let m = -1, h = null;
  i && (h = new ResizeObserver((y) => {
    let [w] = y;
    w && w.target === d && h && (h.unobserve(t), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      var $;
      ($ = h) == null || $.observe(t);
    })), n();
  }), d && !c && h.observe(d), h.observe(t));
  let b, g = c ? En(e) : null;
  c && v();
  function v() {
    const y = En(e);
    g && !Gu(g, y) && n(), g = y, b = requestAnimationFrame(v);
  }
  return n(), () => {
    var y;
    u.forEach((w) => {
      r && w.removeEventListener("scroll", n), o && w.removeEventListener("resize", n);
    }), p?.(), (y = h) == null || y.disconnect(), h = null, c && cancelAnimationFrame(b);
  };
}
const g2 = B1, b2 = U1, v2 = I1, y2 = W1, x2 = L1, Dc = D1, w2 = G1, $2 = (e, t, n) => {
  const a = /* @__PURE__ */ new Map(), r = {
    platform: p2,
    ...n
  }, o = {
    ...r.platform,
    _c: a
  };
  return O1(e, t, {
    ...r,
    platform: o
  });
};
var C2 = typeof document < "u", S2 = function() {
}, Hr = C2 ? js : S2;
function Jr(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let n, a, r;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (n = e.length, n !== t.length) return !1;
      for (a = n; a-- !== 0; )
        if (!Jr(e[a], t[a]))
          return !1;
      return !0;
    }
    if (r = Object.keys(e), n = r.length, n !== Object.keys(t).length)
      return !1;
    for (a = n; a-- !== 0; )
      if (!{}.hasOwnProperty.call(t, r[a]))
        return !1;
    for (a = n; a-- !== 0; ) {
      const o = r[a];
      if (!(o === "_owner" && e.$$typeof) && !Jr(e[o], t[o]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Wu(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Ic(e, t) {
  const n = Wu(e);
  return Math.round(t * n) / n;
}
function vi(e) {
  const t = f.useRef(e);
  return Hr(() => {
    t.current = e;
  }), t;
}
function _2(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: a = [],
    platform: r,
    elements: {
      reference: o,
      floating: i
    } = {},
    transform: s = !0,
    whileElementsMounted: c,
    open: d
  } = e, [u, p] = f.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [m, h] = f.useState(a);
  Jr(m, a) || h(a);
  const [b, g] = f.useState(null), [v, y] = f.useState(null), w = f.useCallback((E) => {
    E !== k.current && (k.current = E, g(E));
  }, []), $ = f.useCallback((E) => {
    E !== S.current && (S.current = E, y(E));
  }, []), C = o || b, R = i || v, k = f.useRef(null), S = f.useRef(null), j = f.useRef(u), P = c != null, B = vi(c), z = vi(r), L = vi(d), T = f.useCallback(() => {
    if (!k.current || !S.current)
      return;
    const E = {
      placement: t,
      strategy: n,
      middleware: m
    };
    z.current && (E.platform = z.current), $2(k.current, S.current, E).then((O) => {
      const N = {
        ...O,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: L.current !== !1
      };
      K.current && !Jr(j.current, N) && (j.current = N, $o.flushSync(() => {
        p(N);
      }));
    });
  }, [m, t, n, z, L]);
  Hr(() => {
    d === !1 && j.current.isPositioned && (j.current.isPositioned = !1, p((E) => ({
      ...E,
      isPositioned: !1
    })));
  }, [d]);
  const K = f.useRef(!1);
  Hr(() => (K.current = !0, () => {
    K.current = !1;
  }), []), Hr(() => {
    if (C && (k.current = C), R && (S.current = R), C && R) {
      if (B.current)
        return B.current(C, R, T);
      T();
    }
  }, [C, R, T, B, P]);
  const Q = f.useMemo(() => ({
    reference: k,
    floating: S,
    setReference: w,
    setFloating: $
  }), [w, $]), V = f.useMemo(() => ({
    reference: C,
    floating: R
  }), [C, R]), A = f.useMemo(() => {
    const E = {
      position: n,
      left: 0,
      top: 0
    };
    if (!V.floating)
      return E;
    const O = Ic(V.floating, u.x), N = Ic(V.floating, u.y);
    return s ? {
      ...E,
      transform: "translate(" + O + "px, " + N + "px)",
      ...Wu(V.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: O,
      top: N
    };
  }, [n, s, V.floating, u.x, u.y]);
  return f.useMemo(() => ({
    ...u,
    update: T,
    refs: Q,
    elements: V,
    floatingStyles: A
  }), [u, T, Q, V, A]);
}
const N2 = (e) => {
  function t(n) {
    return {}.hasOwnProperty.call(n, "current");
  }
  return {
    name: "arrow",
    options: e,
    fn(n) {
      const {
        element: a,
        padding: r
      } = typeof e == "function" ? e(n) : e;
      return a && t(a) ? a.current != null ? Dc({
        element: a.current,
        padding: r
      }).fn(n) : {} : a ? Dc({
        element: a,
        padding: r
      }).fn(n) : {};
    }
  };
}, E2 = (e, t) => ({
  ...g2(e),
  options: [e, t]
}), R2 = (e, t) => ({
  ...b2(e),
  options: [e, t]
}), P2 = (e, t) => ({
  ...w2(e),
  options: [e, t]
}), k2 = (e, t) => ({
  ...v2(e),
  options: [e, t]
}), T2 = (e, t) => ({
  ...y2(e),
  options: [e, t]
}), A2 = (e, t) => ({
  ...x2(e),
  options: [e, t]
}), j2 = (e, t) => ({
  ...N2(e),
  options: [e, t]
});
var M2 = "Arrow", Hu = f.forwardRef((e, t) => {
  const { children: n, width: a = 10, height: r = 5, ...o } = e;
  return /* @__PURE__ */ l.jsx(
    Y.svg,
    {
      ...o,
      ref: t,
      width: a,
      height: r,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ l.jsx("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
Hu.displayName = M2;
var O2 = Hu, Vs = "Popper", [Vu, pn] = Fe(Vs), [D2, zu] = Vu(Vs), Ku = (e) => {
  const { __scopePopper: t, children: n } = e, [a, r] = f.useState(null);
  return /* @__PURE__ */ l.jsx(D2, { scope: t, anchor: a, onAnchorChange: r, children: n });
};
Ku.displayName = Vs;
var Yu = "PopperAnchor", Zu = f.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: a, ...r } = e, o = zu(Yu, n), i = f.useRef(null), s = le(t, i), c = f.useRef(null);
    return f.useEffect(() => {
      const d = c.current;
      c.current = a?.current || i.current, d !== c.current && o.onAnchorChange(c.current);
    }), a ? null : /* @__PURE__ */ l.jsx(Y.div, { ...r, ref: s });
  }
);
Zu.displayName = Yu;
var zs = "PopperContent", [I2, L2] = Vu(zs), Xu = f.forwardRef(
  (e, t) => {
    const {
      __scopePopper: n,
      side: a = "bottom",
      sideOffset: r = 0,
      align: o = "center",
      alignOffset: i = 0,
      arrowPadding: s = 0,
      avoidCollisions: c = !0,
      collisionBoundary: d = [],
      collisionPadding: u = 0,
      sticky: p = "partial",
      hideWhenDetached: m = !1,
      updatePositionStrategy: h = "optimized",
      onPlaced: b,
      ...g
    } = e, v = zu(zs, n), [y, w] = f.useState(null), $ = le(t, (M) => w(M)), [C, R] = f.useState(null), k = _o(C), S = k?.width ?? 0, j = k?.height ?? 0, P = a + (o !== "center" ? "-" + o : ""), B = typeof u == "number" ? u : { top: 0, right: 0, bottom: 0, left: 0, ...u }, z = Array.isArray(d) ? d : [d], L = z.length > 0, T = {
      padding: B,
      boundary: z.filter(B2),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: L
    }, { refs: K, floatingStyles: Q, placement: V, isPositioned: A, middlewareData: E } = _2({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: P,
      whileElementsMounted: (...M) => h2(...M, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: v.anchor
      },
      middleware: [
        E2({ mainAxis: r + j, alignmentAxis: i }),
        c && R2({
          mainAxis: !0,
          crossAxis: !1,
          limiter: p === "partial" ? P2() : void 0,
          ...T
        }),
        c && k2({ ...T }),
        T2({
          ...T,
          apply: ({ elements: M, rects: q, availableWidth: oe, availableHeight: ce }) => {
            const { width: fe, height: ye } = q.reference, Be = M.floating.style;
            Be.setProperty("--radix-popper-available-width", `${oe}px`), Be.setProperty("--radix-popper-available-height", `${ce}px`), Be.setProperty("--radix-popper-anchor-width", `${fe}px`), Be.setProperty("--radix-popper-anchor-height", `${ye}px`);
          }
        }),
        C && j2({ element: C, padding: s }),
        U2({ arrowWidth: S, arrowHeight: j }),
        m && A2({ strategy: "referenceHidden", ...T })
      ]
    }), [O, N] = Qu(V), H = Le(b);
    Oe(() => {
      A && H?.();
    }, [A, H]);
    const _ = E.arrow?.x, G = E.arrow?.y, X = E.arrow?.centerOffset !== 0, [W, te] = f.useState();
    return Oe(() => {
      y && te(window.getComputedStyle(y).zIndex);
    }, [y]), /* @__PURE__ */ l.jsx(
      "div",
      {
        ref: K.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...Q,
          transform: A ? Q.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: W,
          "--radix-popper-transform-origin": [
            E.transformOrigin?.x,
            E.transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...E.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ l.jsx(
          I2,
          {
            scope: n,
            placedSide: O,
            onArrowChange: R,
            arrowX: _,
            arrowY: G,
            shouldHideArrow: X,
            children: /* @__PURE__ */ l.jsx(
              Y.div,
              {
                "data-side": O,
                "data-align": N,
                ...g,
                ref: $,
                style: {
                  ...g.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: A ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
Xu.displayName = zs;
var qu = "PopperArrow", F2 = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Ju = f.forwardRef(function(t, n) {
  const { __scopePopper: a, ...r } = t, o = L2(qu, a), i = F2[o.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ l.jsx(
      "span",
      {
        ref: o.onArrowChange,
        style: {
          position: "absolute",
          left: o.arrowX,
          top: o.arrowY,
          [i]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[o.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[o.placedSide],
          visibility: o.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ l.jsx(
          O2,
          {
            ...r,
            ref: n,
            style: {
              ...r.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
Ju.displayName = qu;
function B2(e) {
  return e !== null;
}
var U2 = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: a, middlewareData: r } = t, i = r.arrow?.centerOffset !== 0, s = i ? 0 : e.arrowWidth, c = i ? 0 : e.arrowHeight, [d, u] = Qu(n), p = { start: "0%", center: "50%", end: "100%" }[u], m = (r.arrow?.x ?? 0) + s / 2, h = (r.arrow?.y ?? 0) + c / 2;
    let b = "", g = "";
    return d === "bottom" ? (b = i ? p : `${m}px`, g = `${-c}px`) : d === "top" ? (b = i ? p : `${m}px`, g = `${a.floating.height + c}px`) : d === "right" ? (b = `${-c}px`, g = i ? p : `${h}px`) : d === "left" && (b = `${a.floating.width + c}px`, g = i ? p : `${h}px`), { data: { x: b, y: g } };
  }
});
function Qu(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var dr = Ku, ur = Zu, Ao = Xu, jo = Ju, G2 = "Portal", Ks = f.forwardRef((e, t) => {
  const { container: n, ...a } = e, [r, o] = f.useState(!1);
  Oe(() => o(!0), []);
  const i = n || r && globalThis?.document?.body;
  return i ? I0.createPortal(/* @__PURE__ */ l.jsx(Y.div, { ...a, ref: t }), i) : null;
});
Ks.displayName = G2;
var ef = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
}), W2 = "VisuallyHidden", tf = f.forwardRef(
  (e, t) => /* @__PURE__ */ l.jsx(
    Y.span,
    {
      ...e,
      ref: t,
      style: { ...ef, ...e.style }
    }
  )
);
tf.displayName = W2;
var H2 = tf, [Mo, C_] = Fe("Tooltip", [
  pn
]), Oo = pn(), nf = "TooltipProvider", V2 = 700, ns = "tooltip.open", [z2, Ys] = Mo(nf), af = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = V2,
    skipDelayDuration: a = 300,
    disableHoverableContent: r = !1,
    children: o
  } = e, i = f.useRef(!0), s = f.useRef(!1), c = f.useRef(0);
  return f.useEffect(() => {
    const d = c.current;
    return () => window.clearTimeout(d);
  }, []), /* @__PURE__ */ l.jsx(
    z2,
    {
      scope: t,
      isOpenDelayedRef: i,
      delayDuration: n,
      onOpen: f.useCallback(() => {
        window.clearTimeout(c.current), i.current = !1;
      }, []),
      onClose: f.useCallback(() => {
        window.clearTimeout(c.current), c.current = window.setTimeout(
          () => i.current = !0,
          a
        );
      }, [a]),
      isPointerInTransitRef: s,
      onPointerInTransitChange: f.useCallback((d) => {
        s.current = d;
      }, []),
      disableHoverableContent: r,
      children: o
    }
  );
};
af.displayName = nf;
var Wa = "Tooltip", [K2, Do] = Mo(Wa), rf = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: a,
    defaultOpen: r,
    onOpenChange: o,
    disableHoverableContent: i,
    delayDuration: s
  } = e, c = Ys(Wa, e.__scopeTooltip), d = Oo(t), [u, p] = f.useState(null), m = Me(), h = f.useRef(0), b = i ?? c.disableHoverableContent, g = s ?? c.delayDuration, v = f.useRef(!1), [y, w] = Ke({
    prop: a,
    defaultProp: r ?? !1,
    onChange: (S) => {
      S ? (c.onOpen(), document.dispatchEvent(new CustomEvent(ns))) : c.onClose(), o?.(S);
    },
    caller: Wa
  }), $ = f.useMemo(() => y ? v.current ? "delayed-open" : "instant-open" : "closed", [y]), C = f.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, v.current = !1, w(!0);
  }, [w]), R = f.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, w(!1);
  }, [w]), k = f.useCallback(() => {
    window.clearTimeout(h.current), h.current = window.setTimeout(() => {
      v.current = !0, w(!0), h.current = 0;
    }, g);
  }, [g, w]);
  return f.useEffect(() => () => {
    h.current && (window.clearTimeout(h.current), h.current = 0);
  }, []), /* @__PURE__ */ l.jsx(dr, { ...d, children: /* @__PURE__ */ l.jsx(
    K2,
    {
      scope: t,
      contentId: m,
      open: y,
      stateAttribute: $,
      trigger: u,
      onTriggerChange: p,
      onTriggerEnter: f.useCallback(() => {
        c.isOpenDelayedRef.current ? k() : C();
      }, [c.isOpenDelayedRef, k, C]),
      onTriggerLeave: f.useCallback(() => {
        b ? R() : (window.clearTimeout(h.current), h.current = 0);
      }, [R, b]),
      onOpen: C,
      onClose: R,
      disableHoverableContent: b,
      children: n
    }
  ) });
};
rf.displayName = Wa;
var as = "TooltipTrigger", of = f.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...a } = e, r = Do(as, n), o = Ys(as, n), i = Oo(n), s = f.useRef(null), c = le(t, s, r.onTriggerChange), d = f.useRef(!1), u = f.useRef(!1), p = f.useCallback(() => d.current = !1, []);
    return f.useEffect(() => () => document.removeEventListener("pointerup", p), [p]), /* @__PURE__ */ l.jsx(ur, { asChild: !0, ...i, children: /* @__PURE__ */ l.jsx(
      Y.button,
      {
        "aria-describedby": r.open ? r.contentId : void 0,
        "data-state": r.stateAttribute,
        ...a,
        ref: c,
        onPointerMove: U(e.onPointerMove, (m) => {
          m.pointerType !== "touch" && !u.current && !o.isPointerInTransitRef.current && (r.onTriggerEnter(), u.current = !0);
        }),
        onPointerLeave: U(e.onPointerLeave, () => {
          r.onTriggerLeave(), u.current = !1;
        }),
        onPointerDown: U(e.onPointerDown, () => {
          r.open && r.onClose(), d.current = !0, document.addEventListener("pointerup", p, { once: !0 });
        }),
        onFocus: U(e.onFocus, () => {
          d.current || r.onOpen();
        }),
        onBlur: U(e.onBlur, r.onClose),
        onClick: U(e.onClick, r.onClose)
      }
    ) });
  }
);
of.displayName = as;
var Y2 = "TooltipPortal", [S_, Z2] = Mo(Y2, {
  forceMount: void 0
}), ra = "TooltipContent", sf = f.forwardRef(
  (e, t) => {
    const n = Z2(ra, e.__scopeTooltip), { forceMount: a = n.forceMount, side: r = "top", ...o } = e, i = Do(ra, e.__scopeTooltip);
    return /* @__PURE__ */ l.jsx(Ge, { present: a || i.open, children: i.disableHoverableContent ? /* @__PURE__ */ l.jsx(lf, { side: r, ...o, ref: t }) : /* @__PURE__ */ l.jsx(X2, { side: r, ...o, ref: t }) });
  }
), X2 = f.forwardRef((e, t) => {
  const n = Do(ra, e.__scopeTooltip), a = Ys(ra, e.__scopeTooltip), r = f.useRef(null), o = le(t, r), [i, s] = f.useState(null), { trigger: c, onClose: d } = n, u = r.current, { onPointerInTransitChange: p } = a, m = f.useCallback(() => {
    s(null), p(!1);
  }, [p]), h = f.useCallback(
    (b, g) => {
      const v = b.currentTarget, y = { x: b.clientX, y: b.clientY }, w = tv(y, v.getBoundingClientRect()), $ = nv(y, w), C = av(g.getBoundingClientRect()), R = ov([...$, ...C]);
      s(R), p(!0);
    },
    [p]
  );
  return f.useEffect(() => () => m(), [m]), f.useEffect(() => {
    if (c && u) {
      const b = (v) => h(v, u), g = (v) => h(v, c);
      return c.addEventListener("pointerleave", b), u.addEventListener("pointerleave", g), () => {
        c.removeEventListener("pointerleave", b), u.removeEventListener("pointerleave", g);
      };
    }
  }, [c, u, h, m]), f.useEffect(() => {
    if (i) {
      const b = (g) => {
        const v = g.target, y = { x: g.clientX, y: g.clientY }, w = c?.contains(v) || u?.contains(v), $ = !rv(y, i);
        w ? m() : $ && (m(), d());
      };
      return document.addEventListener("pointermove", b), () => document.removeEventListener("pointermove", b);
    }
  }, [c, u, i, d, m]), /* @__PURE__ */ l.jsx(lf, { ...e, ref: o });
}), [q2, J2] = Mo(Wa, { isInside: !1 }), Q2 = /* @__PURE__ */ tb("TooltipContent"), lf = f.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: a,
      "aria-label": r,
      onEscapeKeyDown: o,
      onPointerDownOutside: i,
      ...s
    } = e, c = Do(ra, n), d = Oo(n), { onClose: u } = c;
    return f.useEffect(() => (document.addEventListener(ns, u), () => document.removeEventListener(ns, u)), [u]), f.useEffect(() => {
      if (c.trigger) {
        const p = (m) => {
          m.target?.contains(c.trigger) && u();
        };
        return window.addEventListener("scroll", p, { capture: !0 }), () => window.removeEventListener("scroll", p, { capture: !0 });
      }
    }, [c.trigger, u]), /* @__PURE__ */ l.jsx(
      va,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: o,
        onPointerDownOutside: i,
        onFocusOutside: (p) => p.preventDefault(),
        onDismiss: u,
        children: /* @__PURE__ */ l.jsxs(
          Ao,
          {
            "data-state": c.stateAttribute,
            ...d,
            ...s,
            ref: t,
            style: {
              ...s.style,
              "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
              "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
              "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
            },
            children: [
              /* @__PURE__ */ l.jsx(Q2, { children: a }),
              /* @__PURE__ */ l.jsx(q2, { scope: n, isInside: !0, children: /* @__PURE__ */ l.jsx(H2, { id: c.contentId, role: "tooltip", children: r || a }) })
            ]
          }
        )
      }
    );
  }
);
sf.displayName = ra;
var cf = "TooltipArrow", ev = f.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...a } = e, r = Oo(n);
    return J2(
      cf,
      n
    ).isInside ? null : /* @__PURE__ */ l.jsx(jo, { ...r, ...a, ref: t });
  }
);
ev.displayName = cf;
function tv(e, t) {
  const n = Math.abs(t.top - e.y), a = Math.abs(t.bottom - e.y), r = Math.abs(t.right - e.x), o = Math.abs(t.left - e.x);
  switch (Math.min(n, a, r, o)) {
    case o:
      return "left";
    case r:
      return "right";
    case n:
      return "top";
    case a:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function nv(e, t, n = 5) {
  const a = [];
  switch (t) {
    case "top":
      a.push(
        { x: e.x - n, y: e.y + n },
        { x: e.x + n, y: e.y + n }
      );
      break;
    case "bottom":
      a.push(
        { x: e.x - n, y: e.y - n },
        { x: e.x + n, y: e.y - n }
      );
      break;
    case "left":
      a.push(
        { x: e.x + n, y: e.y - n },
        { x: e.x + n, y: e.y + n }
      );
      break;
    case "right":
      a.push(
        { x: e.x - n, y: e.y - n },
        { x: e.x - n, y: e.y + n }
      );
      break;
  }
  return a;
}
function av(e) {
  const { top: t, right: n, bottom: a, left: r } = e;
  return [
    { x: r, y: t },
    { x: n, y: t },
    { x: n, y: a },
    { x: r, y: a }
  ];
}
function rv(e, t) {
  const { x: n, y: a } = e;
  let r = !1;
  for (let o = 0, i = t.length - 1; o < t.length; i = o++) {
    const s = t[o], c = t[i], d = s.x, u = s.y, p = c.x, m = c.y;
    u > a != m > a && n < (p - d) * (a - u) / (m - u) + d && (r = !r);
  }
  return r;
}
function ov(e) {
  const t = e.slice();
  return t.sort((n, a) => n.x < a.x ? -1 : n.x > a.x ? 1 : n.y < a.y ? -1 : n.y > a.y ? 1 : 0), iv(t);
}
function iv(e) {
  if (e.length <= 1) return e.slice();
  const t = [];
  for (let a = 0; a < e.length; a++) {
    const r = e[a];
    for (; t.length >= 2; ) {
      const o = t[t.length - 1], i = t[t.length - 2];
      if ((o.x - i.x) * (r.y - i.y) >= (o.y - i.y) * (r.x - i.x)) t.pop();
      else break;
    }
    t.push(r);
  }
  t.pop();
  const n = [];
  for (let a = e.length - 1; a >= 0; a--) {
    const r = e[a];
    for (; n.length >= 2; ) {
      const o = n[n.length - 1], i = n[n.length - 2];
      if ((o.x - i.x) * (r.y - i.y) >= (o.y - i.y) * (r.x - i.x)) n.pop();
      else break;
    }
    n.push(r);
  }
  return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
var sv = af, lv = rf, cv = of, df = sf;
const uf = sv, ff = lv, pf = cv, Zs = f.forwardRef(({ className: e, sideOffset: t = 4, ...n }, a) => /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx(
  df,
  {
    ref: a,
    sideOffset: t,
    className: x(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
Zs.displayName = df.displayName;
function Xs(e) {
  const t = e + "CollectionProvider", [n, a] = Fe(t), [r, o] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), i = (g) => {
    const { scope: v, children: y } = g, w = D.useRef(null), $ = D.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ l.jsx(r, { scope: v, itemMap: $, collectionRef: w, children: y });
  };
  i.displayName = t;
  const s = e + "CollectionSlot", c = /* @__PURE__ */ on(s), d = D.forwardRef(
    (g, v) => {
      const { scope: y, children: w } = g, $ = o(s, y), C = le(v, $.collectionRef);
      return /* @__PURE__ */ l.jsx(c, { ref: C, children: w });
    }
  );
  d.displayName = s;
  const u = e + "CollectionItemSlot", p = "data-radix-collection-item", m = /* @__PURE__ */ on(u), h = D.forwardRef(
    (g, v) => {
      const { scope: y, children: w, ...$ } = g, C = D.useRef(null), R = le(v, C), k = o(u, y);
      return D.useEffect(() => (k.itemMap.set(C, { ref: C, ...$ }), () => void k.itemMap.delete(C))), /* @__PURE__ */ l.jsx(m, { [p]: "", ref: R, children: w });
    }
  );
  h.displayName = u;
  function b(g) {
    const v = o(e + "CollectionConsumer", g);
    return D.useCallback(() => {
      const w = v.collectionRef.current;
      if (!w) return [];
      const $ = Array.from(w.querySelectorAll(`[${p}]`));
      return Array.from(v.itemMap.values()).sort(
        (k, S) => $.indexOf(k.ref.current) - $.indexOf(S.ref.current)
      );
    }, [v.collectionRef, v.itemMap]);
  }
  return [
    { Provider: i, Slot: d, ItemSlot: h },
    b,
    a
  ];
}
var dv = f.createContext(void 0);
function In(e) {
  const t = f.useContext(dv);
  return e || t || "ltr";
}
var yi = 0;
function Io() {
  f.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Lc()), document.body.insertAdjacentElement("beforeend", e[1] ?? Lc()), yi++, () => {
      yi === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), yi--;
    };
  }, []);
}
function Lc() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var xi = "focusScope.autoFocusOnMount", wi = "focusScope.autoFocusOnUnmount", Fc = { bubbles: !1, cancelable: !0 }, uv = "FocusScope", fr = f.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: a = !1,
    onMountAutoFocus: r,
    onUnmountAutoFocus: o,
    ...i
  } = e, [s, c] = f.useState(null), d = Le(r), u = Le(o), p = f.useRef(null), m = le(t, (g) => c(g)), h = f.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  f.useEffect(() => {
    if (a) {
      let g = function($) {
        if (h.paused || !s) return;
        const C = $.target;
        s.contains(C) ? p.current = C : Qt(p.current, { select: !0 });
      }, v = function($) {
        if (h.paused || !s) return;
        const C = $.relatedTarget;
        C !== null && (s.contains(C) || Qt(p.current, { select: !0 }));
      }, y = function($) {
        if (document.activeElement === document.body)
          for (const R of $)
            R.removedNodes.length > 0 && Qt(s);
      };
      document.addEventListener("focusin", g), document.addEventListener("focusout", v);
      const w = new MutationObserver(y);
      return s && w.observe(s, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", v), w.disconnect();
      };
    }
  }, [a, s, h.paused]), f.useEffect(() => {
    if (s) {
      Uc.add(h);
      const g = document.activeElement;
      if (!s.contains(g)) {
        const y = new CustomEvent(xi, Fc);
        s.addEventListener(xi, d), s.dispatchEvent(y), y.defaultPrevented || (fv(bv(mf(s)), { select: !0 }), document.activeElement === g && Qt(s));
      }
      return () => {
        s.removeEventListener(xi, d), setTimeout(() => {
          const y = new CustomEvent(wi, Fc);
          s.addEventListener(wi, u), s.dispatchEvent(y), y.defaultPrevented || Qt(g ?? document.body, { select: !0 }), s.removeEventListener(wi, u), Uc.remove(h);
        }, 0);
      };
    }
  }, [s, d, u, h]);
  const b = f.useCallback(
    (g) => {
      if (!n && !a || h.paused) return;
      const v = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, y = document.activeElement;
      if (v && y) {
        const w = g.currentTarget, [$, C] = pv(w);
        $ && C ? !g.shiftKey && y === C ? (g.preventDefault(), n && Qt($, { select: !0 })) : g.shiftKey && y === $ && (g.preventDefault(), n && Qt(C, { select: !0 })) : y === w && g.preventDefault();
      }
    },
    [n, a, h.paused]
  );
  return /* @__PURE__ */ l.jsx(Y.div, { tabIndex: -1, ...i, ref: m, onKeyDown: b });
});
fr.displayName = uv;
function fv(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const a of e)
    if (Qt(a, { select: t }), document.activeElement !== n) return;
}
function pv(e) {
  const t = mf(e), n = Bc(t, e), a = Bc(t.reverse(), e);
  return [n, a];
}
function mf(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (a) => {
      const r = a.tagName === "INPUT" && a.type === "hidden";
      return a.disabled || a.hidden || r ? NodeFilter.FILTER_SKIP : a.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Bc(e, t) {
  for (const n of e)
    if (!mv(n, { upTo: t })) return n;
}
function mv(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function hv(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Qt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && hv(e) && t && e.select();
  }
}
var Uc = gv();
function gv() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), e = Gc(e, t), e.unshift(t);
    },
    remove(t) {
      e = Gc(e, t), e[0]?.resume();
    }
  };
}
function Gc(e, t) {
  const n = [...e], a = n.indexOf(t);
  return a !== -1 && n.splice(a, 1), n;
}
function bv(e) {
  return e.filter((t) => t.tagName !== "A");
}
var $i = "rovingFocusGroup.onEntryFocus", vv = { bubbles: !1, cancelable: !0 }, pr = "RovingFocusGroup", [rs, hf, yv] = Xs(pr), [xv, mn] = Fe(
  pr,
  [yv]
), [wv, $v] = xv(pr), gf = f.forwardRef(
  (e, t) => /* @__PURE__ */ l.jsx(rs.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ l.jsx(rs.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ l.jsx(Cv, { ...e, ref: t }) }) })
);
gf.displayName = pr;
var Cv = f.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: a,
    loop: r = !1,
    dir: o,
    currentTabStopId: i,
    defaultCurrentTabStopId: s,
    onCurrentTabStopIdChange: c,
    onEntryFocus: d,
    preventScrollOnEntryFocus: u = !1,
    ...p
  } = e, m = f.useRef(null), h = le(t, m), b = In(o), [g, v] = Ke({
    prop: i,
    defaultProp: s ?? null,
    onChange: c,
    caller: pr
  }), [y, w] = f.useState(!1), $ = Le(d), C = hf(n), R = f.useRef(!1), [k, S] = f.useState(0);
  return f.useEffect(() => {
    const j = m.current;
    if (j)
      return j.addEventListener($i, $), () => j.removeEventListener($i, $);
  }, [$]), /* @__PURE__ */ l.jsx(
    wv,
    {
      scope: n,
      orientation: a,
      dir: b,
      loop: r,
      currentTabStopId: g,
      onItemFocus: f.useCallback(
        (j) => v(j),
        [v]
      ),
      onItemShiftTab: f.useCallback(() => w(!0), []),
      onFocusableItemAdd: f.useCallback(
        () => S((j) => j + 1),
        []
      ),
      onFocusableItemRemove: f.useCallback(
        () => S((j) => j - 1),
        []
      ),
      children: /* @__PURE__ */ l.jsx(
        Y.div,
        {
          tabIndex: y || k === 0 ? -1 : 0,
          "data-orientation": a,
          ...p,
          ref: h,
          style: { outline: "none", ...e.style },
          onMouseDown: U(e.onMouseDown, () => {
            R.current = !0;
          }),
          onFocus: U(e.onFocus, (j) => {
            const P = !R.current;
            if (j.target === j.currentTarget && P && !y) {
              const B = new CustomEvent($i, vv);
              if (j.currentTarget.dispatchEvent(B), !B.defaultPrevented) {
                const z = C().filter((V) => V.focusable), L = z.find((V) => V.active), T = z.find((V) => V.id === g), Q = [L, T, ...z].filter(
                  Boolean
                ).map((V) => V.ref.current);
                yf(Q, u);
              }
            }
            R.current = !1;
          }),
          onBlur: U(e.onBlur, () => w(!1))
        }
      )
    }
  );
}), bf = "RovingFocusGroupItem", vf = f.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: a = !0,
      active: r = !1,
      tabStopId: o,
      children: i,
      ...s
    } = e, c = Me(), d = o || c, u = $v(bf, n), p = u.currentTabStopId === d, m = hf(n), { onFocusableItemAdd: h, onFocusableItemRemove: b, currentTabStopId: g } = u;
    return f.useEffect(() => {
      if (a)
        return h(), () => b();
    }, [a, h, b]), /* @__PURE__ */ l.jsx(
      rs.ItemSlot,
      {
        scope: n,
        id: d,
        focusable: a,
        active: r,
        children: /* @__PURE__ */ l.jsx(
          Y.span,
          {
            tabIndex: p ? 0 : -1,
            "data-orientation": u.orientation,
            ...s,
            ref: t,
            onMouseDown: U(e.onMouseDown, (v) => {
              a ? u.onItemFocus(d) : v.preventDefault();
            }),
            onFocus: U(e.onFocus, () => u.onItemFocus(d)),
            onKeyDown: U(e.onKeyDown, (v) => {
              if (v.key === "Tab" && v.shiftKey) {
                u.onItemShiftTab();
                return;
              }
              if (v.target !== v.currentTarget) return;
              const y = Nv(v, u.orientation, u.dir);
              if (y !== void 0) {
                if (v.metaKey || v.ctrlKey || v.altKey || v.shiftKey) return;
                v.preventDefault();
                let $ = m().filter((C) => C.focusable).map((C) => C.ref.current);
                if (y === "last") $.reverse();
                else if (y === "prev" || y === "next") {
                  y === "prev" && $.reverse();
                  const C = $.indexOf(v.currentTarget);
                  $ = u.loop ? Ev($, C + 1) : $.slice(C + 1);
                }
                setTimeout(() => yf($));
              }
            }),
            children: typeof i == "function" ? i({ isCurrentTabStop: p, hasTabStop: g != null }) : i
          }
        )
      }
    );
  }
);
vf.displayName = bf;
var Sv = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function _v(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Nv(e, t, n) {
  const a = _v(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(a)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(a)))
    return Sv[a];
}
function yf(e, t = !1) {
  const n = document.activeElement;
  for (const a of e)
    if (a === n || (a.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function Ev(e, t) {
  return e.map((n, a) => e[(t + a) % e.length]);
}
var Lo = gf, Fo = vf, Rv = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Hn = /* @__PURE__ */ new WeakMap(), Dr = /* @__PURE__ */ new WeakMap(), Ir = {}, Ci = 0, xf = function(e) {
  return e && (e.host || xf(e.parentNode));
}, Pv = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var a = xf(n);
    return a && e.contains(a) ? a : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, kv = function(e, t, n, a) {
  var r = Pv(t, Array.isArray(e) ? e : [e]);
  Ir[n] || (Ir[n] = /* @__PURE__ */ new WeakMap());
  var o = Ir[n], i = [], s = /* @__PURE__ */ new Set(), c = new Set(r), d = function(p) {
    !p || s.has(p) || (s.add(p), d(p.parentNode));
  };
  r.forEach(d);
  var u = function(p) {
    !p || c.has(p) || Array.prototype.forEach.call(p.children, function(m) {
      if (s.has(m))
        u(m);
      else
        try {
          var h = m.getAttribute(a), b = h !== null && h !== "false", g = (Hn.get(m) || 0) + 1, v = (o.get(m) || 0) + 1;
          Hn.set(m, g), o.set(m, v), i.push(m), g === 1 && b && Dr.set(m, !0), v === 1 && m.setAttribute(n, "true"), b || m.setAttribute(a, "true");
        } catch (y) {
          console.error("aria-hidden: cannot operate on ", m, y);
        }
    });
  };
  return u(t), s.clear(), Ci++, function() {
    i.forEach(function(p) {
      var m = Hn.get(p) - 1, h = o.get(p) - 1;
      Hn.set(p, m), o.set(p, h), m || (Dr.has(p) || p.removeAttribute(a), Dr.delete(p)), h || p.removeAttribute(n);
    }), Ci--, Ci || (Hn = /* @__PURE__ */ new WeakMap(), Hn = /* @__PURE__ */ new WeakMap(), Dr = /* @__PURE__ */ new WeakMap(), Ir = {});
  };
}, Bo = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var a = Array.from(Array.isArray(e) ? e : [e]), r = Rv(e);
  return r ? (a.push.apply(a, Array.from(r.querySelectorAll("[aria-live], script"))), kv(a, r, n, "aria-hidden")) : function() {
    return null;
  };
}, tn = function() {
  return tn = Object.assign || function(t) {
    for (var n, a = 1, r = arguments.length; a < r; a++) {
      n = arguments[a];
      for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
    }
    return t;
  }, tn.apply(this, arguments);
};
function Tv(e, t) {
  var n = {};
  for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && t.indexOf(a) < 0 && (n[a] = e[a]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var r = 0, a = Object.getOwnPropertySymbols(e); r < a.length; r++)
      t.indexOf(a[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, a[r]) && (n[a[r]] = e[a[r]]);
  return n;
}
function Av(e, t, n) {
  if (n || arguments.length === 2) for (var a = 0, r = t.length, o; a < r; a++)
    (o || !(a in t)) && (o || (o = Array.prototype.slice.call(t, 0, a)), o[a] = t[a]);
  return e.concat(o || Array.prototype.slice.call(t));
}
var Vr = "right-scroll-bar-position", zr = "width-before-scroll-bar", jv = "with-scroll-bars-hidden", Mv = "--removed-body-scroll-bar-size";
function Si(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Ov(e, t) {
  var n = je(function() {
    return {
      // value
      value: e,
      // last callback
      callback: t,
      // "memoized" public interface
      facade: {
        get current() {
          return n.value;
        },
        set current(a) {
          var r = n.value;
          r !== a && (n.value = a, n.callback(a, r));
        }
      }
    };
  })[0];
  return n.callback = t, n.facade;
}
var Dv = typeof window < "u" ? f.useLayoutEffect : f.useEffect, Wc = /* @__PURE__ */ new WeakMap();
function Iv(e, t) {
  var n = Ov(null, function(a) {
    return e.forEach(function(r) {
      return Si(r, a);
    });
  });
  return Dv(function() {
    var a = Wc.get(n);
    if (a) {
      var r = new Set(a), o = new Set(e), i = n.current;
      r.forEach(function(s) {
        o.has(s) || Si(s, null);
      }), o.forEach(function(s) {
        r.has(s) || Si(s, i);
      });
    }
    Wc.set(n, e);
  }, [e]), n;
}
var Qr = function() {
  return Qr = Object.assign || function(t) {
    for (var n, a = 1, r = arguments.length; a < r; a++) {
      n = arguments[a];
      for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
    }
    return t;
  }, Qr.apply(this, arguments);
};
function Lv(e, t) {
  var n = {};
  for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && t.indexOf(a) < 0 && (n[a] = e[a]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var r = 0, a = Object.getOwnPropertySymbols(e); r < a.length; r++)
      t.indexOf(a[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, a[r]) && (n[a[r]] = e[a[r]]);
  return n;
}
function Fv(e) {
  return e;
}
function Bv(e, t) {
  t === void 0 && (t = Fv);
  var n = [], a = !1, r = {
    read: function() {
      if (a)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function(o) {
      var i = t(o, a);
      return n.push(i), function() {
        n = n.filter(function(s) {
          return s !== i;
        });
      };
    },
    assignSyncMedium: function(o) {
      for (a = !0; n.length; ) {
        var i = n;
        n = [], i.forEach(o);
      }
      n = {
        push: function(s) {
          return o(s);
        },
        filter: function() {
          return n;
        }
      };
    },
    assignMedium: function(o) {
      a = !0;
      var i = [];
      if (n.length) {
        var s = n;
        n = [], s.forEach(o), i = n;
      }
      var c = function() {
        var u = i;
        i = [], u.forEach(o);
      }, d = function() {
        return Promise.resolve().then(c);
      };
      d(), n = {
        push: function(u) {
          i.push(u), d();
        },
        filter: function(u) {
          return i = i.filter(u), n;
        }
      };
    }
  };
  return r;
}
function Uv(e) {
  e === void 0 && (e = {});
  var t = Bv(null);
  return t.options = Qr({ async: !0, ssr: !1 }, e), t;
}
var wf = function(e) {
  var t = e.sideCar, n = Lv(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var a = t.read();
  if (!a)
    throw new Error("Sidecar medium not found");
  return f.createElement(a, Qr({}, n));
};
wf.isSideCarExport = !0;
function Gv(e, t) {
  return e.useMedium(t), wf;
}
var $f = Uv(), _i = function() {
}, Uo = f.forwardRef(function(e, t) {
  var n = f.useRef(null), a = f.useState({
    onScrollCapture: _i,
    onWheelCapture: _i,
    onTouchMoveCapture: _i
  }), r = a[0], o = a[1], i = e.forwardProps, s = e.children, c = e.className, d = e.removeScrollBar, u = e.enabled, p = e.shards, m = e.sideCar, h = e.noRelative, b = e.noIsolation, g = e.inert, v = e.allowPinchZoom, y = e.as, w = y === void 0 ? "div" : y, $ = e.gapMode, C = Tv(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), R = m, k = Iv([n, t]), S = tn(tn({}, C), r);
  return f.createElement(
    f.Fragment,
    null,
    u && f.createElement(R, { sideCar: $f, removeScrollBar: d, shards: p, noRelative: h, noIsolation: b, inert: g, setCallbacks: o, allowPinchZoom: !!v, lockRef: n, gapMode: $ }),
    i ? f.cloneElement(f.Children.only(s), tn(tn({}, S), { ref: k })) : f.createElement(w, tn({}, S, { className: c, ref: k }), s)
  );
});
Uo.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Uo.classNames = {
  fullWidth: zr,
  zeroRight: Vr
};
var Wv = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Hv() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = Wv();
  return t && e.setAttribute("nonce", t), e;
}
function Vv(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function zv(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Kv = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = Hv()) && (Vv(t, n), zv(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Yv = function() {
  var e = Kv();
  return function(t, n) {
    f.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Cf = function() {
  var e = Yv(), t = function(n) {
    var a = n.styles, r = n.dynamic;
    return e(a, r), null;
  };
  return t;
}, Zv = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Ni = function(e) {
  return parseInt(e || "", 10) || 0;
}, Xv = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], a = t[e === "padding" ? "paddingTop" : "marginTop"], r = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Ni(n), Ni(a), Ni(r)];
}, qv = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Zv;
  var t = Xv(e), n = document.documentElement.clientWidth, a = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, a - n + t[2] - t[0])
  };
}, Jv = Cf(), ta = "data-scroll-locked", Qv = function(e, t, n, a) {
  var r = e.left, o = e.top, i = e.right, s = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(jv, ` {
   overflow: hidden `).concat(a, `;
   padding-right: `).concat(s, "px ").concat(a, `;
  }
  body[`).concat(ta, `] {
    overflow: hidden `).concat(a, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(a, ";"),
    n === "margin" && `
    padding-left: `.concat(r, `px;
    padding-top: `).concat(o, `px;
    padding-right: `).concat(i, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(s, "px ").concat(a, `;
    `),
    n === "padding" && "padding-right: ".concat(s, "px ").concat(a, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(Vr, ` {
    right: `).concat(s, "px ").concat(a, `;
  }
  
  .`).concat(zr, ` {
    margin-right: `).concat(s, "px ").concat(a, `;
  }
  
  .`).concat(Vr, " .").concat(Vr, ` {
    right: 0 `).concat(a, `;
  }
  
  .`).concat(zr, " .").concat(zr, ` {
    margin-right: 0 `).concat(a, `;
  }
  
  body[`).concat(ta, `] {
    `).concat(Mv, ": ").concat(s, `px;
  }
`);
}, Hc = function() {
  var e = parseInt(document.body.getAttribute(ta) || "0", 10);
  return isFinite(e) ? e : 0;
}, e3 = function() {
  f.useEffect(function() {
    return document.body.setAttribute(ta, (Hc() + 1).toString()), function() {
      var e = Hc() - 1;
      e <= 0 ? document.body.removeAttribute(ta) : document.body.setAttribute(ta, e.toString());
    };
  }, []);
}, t3 = function(e) {
  var t = e.noRelative, n = e.noImportant, a = e.gapMode, r = a === void 0 ? "margin" : a;
  e3();
  var o = f.useMemo(function() {
    return qv(r);
  }, [r]);
  return f.createElement(Jv, { styles: Qv(o, !t, r, n ? "" : "!important") });
}, os = !1;
if (typeof window < "u")
  try {
    var Lr = Object.defineProperty({}, "passive", {
      get: function() {
        return os = !0, !0;
      }
    });
    window.addEventListener("test", Lr, Lr), window.removeEventListener("test", Lr, Lr);
  } catch {
    os = !1;
  }
var Vn = os ? { passive: !1 } : !1, n3 = function(e) {
  return e.tagName === "TEXTAREA";
}, Sf = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !n3(e) && n[t] === "visible")
  );
}, a3 = function(e) {
  return Sf(e, "overflowY");
}, r3 = function(e) {
  return Sf(e, "overflowX");
}, Vc = function(e, t) {
  var n = t.ownerDocument, a = t;
  do {
    typeof ShadowRoot < "u" && a instanceof ShadowRoot && (a = a.host);
    var r = _f(e, a);
    if (r) {
      var o = Nf(e, a), i = o[1], s = o[2];
      if (i > s)
        return !0;
    }
    a = a.parentNode;
  } while (a && a !== n.body);
  return !1;
}, o3 = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, a = e.clientHeight;
  return [
    t,
    n,
    a
  ];
}, i3 = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, a = e.clientWidth;
  return [
    t,
    n,
    a
  ];
}, _f = function(e, t) {
  return e === "v" ? a3(t) : r3(t);
}, Nf = function(e, t) {
  return e === "v" ? o3(t) : i3(t);
}, s3 = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, l3 = function(e, t, n, a, r) {
  var o = s3(e, window.getComputedStyle(t).direction), i = o * a, s = n.target, c = t.contains(s), d = !1, u = i > 0, p = 0, m = 0;
  do {
    if (!s)
      break;
    var h = Nf(e, s), b = h[0], g = h[1], v = h[2], y = g - v - o * b;
    (b || y) && _f(e, s) && (p += y, m += b);
    var w = s.parentNode;
    s = w && w.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? w.host : w;
  } while (
    // portaled content
    !c && s !== document.body || // self content
    c && (t.contains(s) || t === s)
  );
  return (u && Math.abs(p) < 1 || !u && Math.abs(m) < 1) && (d = !0), d;
}, Fr = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, zc = function(e) {
  return [e.deltaX, e.deltaY];
}, Kc = function(e) {
  return e && "current" in e ? e.current : e;
}, c3 = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, d3 = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, u3 = 0, zn = [], Br = function(e) {
  if (e.composedPath) {
    var t = e.composedPath();
    if (Array.isArray(t) && t.length > 0)
      return t[0];
  }
  return e.target;
};
function f3(e) {
  var t = f.useRef([]), n = f.useRef([0, 0]), a = f.useRef(), r = f.useState(u3++)[0], o = f.useState(Cf)[0], i = f.useRef(e);
  f.useEffect(function() {
    i.current = e;
  }, [e]), f.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(r));
      var g = Av([e.lockRef.current], (e.shards || []).map(Kc), !0).filter(Boolean);
      return g.forEach(function(v) {
        return v.classList.add("allow-interactivity-".concat(r));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(r)), g.forEach(function(v) {
          return v.classList.remove("allow-interactivity-".concat(r));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var s = f.useCallback(function(g, v) {
    if ("touches" in g && g.touches.length === 2 || g.type === "wheel" && g.ctrlKey)
      return !i.current.allowPinchZoom;
    var y = Fr(g), w = n.current, $ = "deltaX" in g ? g.deltaX : w[0] - y[0], C = "deltaY" in g ? g.deltaY : w[1] - y[1], R, k = Br(g), S = Math.abs($) > Math.abs(C) ? "h" : "v";
    if ("touches" in g && S === "h" && k.type === "range")
      return !1;
    var j = Vc(S, k);
    if (!j)
      return !0;
    if (j ? R = S : (R = S === "v" ? "h" : "v", j = Vc(S, k)), !j)
      return !1;
    if (!a.current && "changedTouches" in g && ($ || C) && (a.current = R), !R)
      return !0;
    var P = a.current || R;
    return l3(P, v, g, P === "h" ? $ : C);
  }, []), c = f.useCallback(function(g) {
    var v = g;
    if (!(!zn.length || zn[zn.length - 1] !== o)) {
      var y = "deltaY" in v ? zc(v) : Fr(v), w = Br(v), $ = t.current.filter(function(k) {
        return k.name === v.type && (k.target === w || w === k.shadowParent) && c3(k.delta, y);
      })[0];
      if ($ && $.should) {
        v.cancelable && v.preventDefault();
        return;
      }
      if (!$) {
        var C = (i.current.shards || []).map(Kc).filter(Boolean).filter(function(k) {
          return k.contains(w);
        }), R = C.length > 0 ? s(v, C[0]) : !i.current.noIsolation;
        R && v.cancelable && v.preventDefault();
      }
    }
  }, []), d = f.useCallback(function(g, v, y, w) {
    var $ = { name: g, delta: v, target: y, should: w, shadowParent: p3(y) };
    t.current.push($), setTimeout(function() {
      t.current = t.current.filter(function(C) {
        return C !== $;
      });
    }, 1);
  }, []), u = f.useCallback(function(g) {
    n.current = Fr(g), a.current = void 0;
  }, []), p = f.useCallback(function(g) {
    var v = Br(g);
    d(g.type, zc(g), v, s(g, e.lockRef.current));
  }, []), m = f.useCallback(function(g) {
    var v = Br(g);
    d(g.type, Fr(g), v, s(g, e.lockRef.current));
  }, []);
  f.useEffect(function() {
    return zn.push(o), e.setCallbacks({
      onScrollCapture: p,
      onWheelCapture: p,
      onTouchMoveCapture: m
    }), document.addEventListener("wheel", c, Vn), document.addEventListener("touchmove", c, Vn), document.addEventListener("touchstart", u, Vn), function() {
      zn = zn.filter(function(g) {
        return g !== o;
      }), document.removeEventListener("wheel", c, Vn), document.removeEventListener("touchmove", c, Vn), document.removeEventListener("touchstart", u, Vn);
    };
  }, []);
  var h = e.removeScrollBar, b = e.inert;
  return f.createElement(
    f.Fragment,
    null,
    b ? f.createElement(o, { styles: d3(r) }) : null,
    h ? f.createElement(t3, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function p3(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const m3 = Gv($f, f3);
var mr = f.forwardRef(function(e, t) {
  return f.createElement(Uo, tn({}, e, { ref: t, sideCar: m3 }));
});
mr.classNames = Uo.classNames;
var is = ["Enter", " "], h3 = ["ArrowDown", "PageUp", "Home"], Ef = ["ArrowUp", "PageDown", "End"], g3 = [...h3, ...Ef], b3 = {
  ltr: [...is, "ArrowRight"],
  rtl: [...is, "ArrowLeft"]
}, v3 = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, hr = "Menu", [Ha, y3, x3] = Xs(hr), [Ln, Rf] = Fe(hr, [
  x3,
  pn,
  mn
]), gr = pn(), Pf = mn(), [kf, hn] = Ln(hr), [w3, br] = Ln(hr), Tf = (e) => {
  const { __scopeMenu: t, open: n = !1, children: a, dir: r, onOpenChange: o, modal: i = !0 } = e, s = gr(t), [c, d] = f.useState(null), u = f.useRef(!1), p = Le(o), m = In(r);
  return f.useEffect(() => {
    const h = () => {
      u.current = !0, document.addEventListener("pointerdown", b, { capture: !0, once: !0 }), document.addEventListener("pointermove", b, { capture: !0, once: !0 });
    }, b = () => u.current = !1;
    return document.addEventListener("keydown", h, { capture: !0 }), () => {
      document.removeEventListener("keydown", h, { capture: !0 }), document.removeEventListener("pointerdown", b, { capture: !0 }), document.removeEventListener("pointermove", b, { capture: !0 });
    };
  }, []), /* @__PURE__ */ l.jsx(dr, { ...s, children: /* @__PURE__ */ l.jsx(
    kf,
    {
      scope: t,
      open: n,
      onOpenChange: p,
      content: c,
      onContentChange: d,
      children: /* @__PURE__ */ l.jsx(
        w3,
        {
          scope: t,
          onClose: f.useCallback(() => p(!1), [p]),
          isUsingKeyboardRef: u,
          dir: m,
          modal: i,
          children: a
        }
      )
    }
  ) });
};
Tf.displayName = hr;
var $3 = "MenuAnchor", qs = f.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...a } = e, r = gr(n);
    return /* @__PURE__ */ l.jsx(ur, { ...r, ...a, ref: t });
  }
);
qs.displayName = $3;
var Js = "MenuPortal", [C3, Af] = Ln(Js, {
  forceMount: void 0
}), jf = (e) => {
  const { __scopeMenu: t, forceMount: n, children: a, container: r } = e, o = hn(Js, t);
  return /* @__PURE__ */ l.jsx(C3, { scope: t, forceMount: n, children: /* @__PURE__ */ l.jsx(Ge, { present: n || o.open, children: /* @__PURE__ */ l.jsx(Ks, { asChild: !0, container: r, children: a }) }) });
};
jf.displayName = Js;
var st = "MenuContent", [S3, Qs] = Ln(st), Mf = f.forwardRef(
  (e, t) => {
    const n = Af(st, e.__scopeMenu), { forceMount: a = n.forceMount, ...r } = e, o = hn(st, e.__scopeMenu), i = br(st, e.__scopeMenu);
    return /* @__PURE__ */ l.jsx(Ha.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ l.jsx(Ge, { present: a || o.open, children: /* @__PURE__ */ l.jsx(Ha.Slot, { scope: e.__scopeMenu, children: i.modal ? /* @__PURE__ */ l.jsx(_3, { ...r, ref: t }) : /* @__PURE__ */ l.jsx(N3, { ...r, ref: t }) }) }) });
  }
), _3 = f.forwardRef(
  (e, t) => {
    const n = hn(st, e.__scopeMenu), a = f.useRef(null), r = le(t, a);
    return f.useEffect(() => {
      const o = a.current;
      if (o) return Bo(o);
    }, []), /* @__PURE__ */ l.jsx(
      el,
      {
        ...e,
        ref: r,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: U(
          e.onFocusOutside,
          (o) => o.preventDefault(),
          { checkForDefaultPrevented: !1 }
        ),
        onDismiss: () => n.onOpenChange(!1)
      }
    );
  }
), N3 = f.forwardRef((e, t) => {
  const n = hn(st, e.__scopeMenu);
  return /* @__PURE__ */ l.jsx(
    el,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), E3 = /* @__PURE__ */ on("MenuContent.ScrollLock"), el = f.forwardRef(
  (e, t) => {
    const {
      __scopeMenu: n,
      loop: a = !1,
      trapFocus: r,
      onOpenAutoFocus: o,
      onCloseAutoFocus: i,
      disableOutsidePointerEvents: s,
      onEntryFocus: c,
      onEscapeKeyDown: d,
      onPointerDownOutside: u,
      onFocusOutside: p,
      onInteractOutside: m,
      onDismiss: h,
      disableOutsideScroll: b,
      ...g
    } = e, v = hn(st, n), y = br(st, n), w = gr(n), $ = Pf(n), C = y3(n), [R, k] = f.useState(null), S = f.useRef(null), j = le(t, S, v.onContentChange), P = f.useRef(0), B = f.useRef(""), z = f.useRef(0), L = f.useRef(null), T = f.useRef("right"), K = f.useRef(0), Q = b ? mr : f.Fragment, V = b ? { as: E3, allowPinchZoom: !0 } : void 0, A = (O) => {
      const N = B.current + O, H = C().filter((M) => !M.disabled), _ = document.activeElement, G = H.find((M) => M.ref.current === _)?.textValue, X = H.map((M) => M.textValue), W = F3(X, N, G), te = H.find((M) => M.textValue === W)?.ref.current;
      (function M(q) {
        B.current = q, window.clearTimeout(P.current), q !== "" && (P.current = window.setTimeout(() => M(""), 1e3));
      })(N), te && setTimeout(() => te.focus());
    };
    f.useEffect(() => () => window.clearTimeout(P.current), []), Io();
    const E = f.useCallback((O) => T.current === L.current?.side && U3(O, L.current?.area), []);
    return /* @__PURE__ */ l.jsx(
      S3,
      {
        scope: n,
        searchRef: B,
        onItemEnter: f.useCallback(
          (O) => {
            E(O) && O.preventDefault();
          },
          [E]
        ),
        onItemLeave: f.useCallback(
          (O) => {
            E(O) || (S.current?.focus(), k(null));
          },
          [E]
        ),
        onTriggerLeave: f.useCallback(
          (O) => {
            E(O) && O.preventDefault();
          },
          [E]
        ),
        pointerGraceTimerRef: z,
        onPointerGraceIntentChange: f.useCallback((O) => {
          L.current = O;
        }, []),
        children: /* @__PURE__ */ l.jsx(Q, { ...V, children: /* @__PURE__ */ l.jsx(
          fr,
          {
            asChild: !0,
            trapped: r,
            onMountAutoFocus: U(o, (O) => {
              O.preventDefault(), S.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: i,
            children: /* @__PURE__ */ l.jsx(
              va,
              {
                asChild: !0,
                disableOutsidePointerEvents: s,
                onEscapeKeyDown: d,
                onPointerDownOutside: u,
                onFocusOutside: p,
                onInteractOutside: m,
                onDismiss: h,
                children: /* @__PURE__ */ l.jsx(
                  Lo,
                  {
                    asChild: !0,
                    ...$,
                    dir: y.dir,
                    orientation: "vertical",
                    loop: a,
                    currentTabStopId: R,
                    onCurrentTabStopIdChange: k,
                    onEntryFocus: U(c, (O) => {
                      y.isUsingKeyboardRef.current || O.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ l.jsx(
                      Ao,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": qf(v.open),
                        "data-radix-menu-content": "",
                        dir: y.dir,
                        ...w,
                        ...g,
                        ref: j,
                        style: { outline: "none", ...g.style },
                        onKeyDown: U(g.onKeyDown, (O) => {
                          const H = O.target.closest("[data-radix-menu-content]") === O.currentTarget, _ = O.ctrlKey || O.altKey || O.metaKey, G = O.key.length === 1;
                          H && (O.key === "Tab" && O.preventDefault(), !_ && G && A(O.key));
                          const X = S.current;
                          if (O.target !== X || !g3.includes(O.key)) return;
                          O.preventDefault();
                          const te = C().filter((M) => !M.disabled).map((M) => M.ref.current);
                          Ef.includes(O.key) && te.reverse(), I3(te);
                        }),
                        onBlur: U(e.onBlur, (O) => {
                          O.currentTarget.contains(O.target) || (window.clearTimeout(P.current), B.current = "");
                        }),
                        onPointerMove: U(
                          e.onPointerMove,
                          Va((O) => {
                            const N = O.target, H = K.current !== O.clientX;
                            if (O.currentTarget.contains(N) && H) {
                              const _ = O.clientX > K.current ? "right" : "left";
                              T.current = _, K.current = O.clientX;
                            }
                          })
                        )
                      }
                    )
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }
);
Mf.displayName = st;
var R3 = "MenuGroup", tl = f.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...a } = e;
    return /* @__PURE__ */ l.jsx(Y.div, { role: "group", ...a, ref: t });
  }
);
tl.displayName = R3;
var P3 = "MenuLabel", Of = f.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...a } = e;
    return /* @__PURE__ */ l.jsx(Y.div, { ...a, ref: t });
  }
);
Of.displayName = P3;
var eo = "MenuItem", Yc = "menu.itemSelect", Go = f.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: a, ...r } = e, o = f.useRef(null), i = br(eo, e.__scopeMenu), s = Qs(eo, e.__scopeMenu), c = le(t, o), d = f.useRef(!1), u = () => {
      const p = o.current;
      if (!n && p) {
        const m = new CustomEvent(Yc, { bubbles: !0, cancelable: !0 });
        p.addEventListener(Yc, (h) => a?.(h), { once: !0 }), $u(p, m), m.defaultPrevented ? d.current = !1 : i.onClose();
      }
    };
    return /* @__PURE__ */ l.jsx(
      Df,
      {
        ...r,
        ref: c,
        disabled: n,
        onClick: U(e.onClick, u),
        onPointerDown: (p) => {
          e.onPointerDown?.(p), d.current = !0;
        },
        onPointerUp: U(e.onPointerUp, (p) => {
          d.current || p.currentTarget?.click();
        }),
        onKeyDown: U(e.onKeyDown, (p) => {
          const m = s.searchRef.current !== "";
          n || m && p.key === " " || is.includes(p.key) && (p.currentTarget.click(), p.preventDefault());
        })
      }
    );
  }
);
Go.displayName = eo;
var Df = f.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: a = !1, textValue: r, ...o } = e, i = Qs(eo, n), s = Pf(n), c = f.useRef(null), d = le(t, c), [u, p] = f.useState(!1), [m, h] = f.useState("");
    return f.useEffect(() => {
      const b = c.current;
      b && h((b.textContent ?? "").trim());
    }, [o.children]), /* @__PURE__ */ l.jsx(
      Ha.ItemSlot,
      {
        scope: n,
        disabled: a,
        textValue: r ?? m,
        children: /* @__PURE__ */ l.jsx(Fo, { asChild: !0, ...s, focusable: !a, children: /* @__PURE__ */ l.jsx(
          Y.div,
          {
            role: "menuitem",
            "data-highlighted": u ? "" : void 0,
            "aria-disabled": a || void 0,
            "data-disabled": a ? "" : void 0,
            ...o,
            ref: d,
            onPointerMove: U(
              e.onPointerMove,
              Va((b) => {
                a ? i.onItemLeave(b) : (i.onItemEnter(b), b.defaultPrevented || b.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: U(
              e.onPointerLeave,
              Va((b) => i.onItemLeave(b))
            ),
            onFocus: U(e.onFocus, () => p(!0)),
            onBlur: U(e.onBlur, () => p(!1))
          }
        ) })
      }
    );
  }
), k3 = "MenuCheckboxItem", If = f.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: a, ...r } = e;
    return /* @__PURE__ */ l.jsx(Gf, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ l.jsx(
      Go,
      {
        role: "menuitemcheckbox",
        "aria-checked": to(n) ? "mixed" : n,
        ...r,
        ref: t,
        "data-state": rl(n),
        onSelect: U(
          r.onSelect,
          () => a?.(to(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
If.displayName = k3;
var Lf = "MenuRadioGroup", [T3, A3] = Ln(
  Lf,
  { value: void 0, onValueChange: () => {
  } }
), Ff = f.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: a, ...r } = e, o = Le(a);
    return /* @__PURE__ */ l.jsx(T3, { scope: e.__scopeMenu, value: n, onValueChange: o, children: /* @__PURE__ */ l.jsx(tl, { ...r, ref: t }) });
  }
);
Ff.displayName = Lf;
var Bf = "MenuRadioItem", Uf = f.forwardRef(
  (e, t) => {
    const { value: n, ...a } = e, r = A3(Bf, e.__scopeMenu), o = n === r.value;
    return /* @__PURE__ */ l.jsx(Gf, { scope: e.__scopeMenu, checked: o, children: /* @__PURE__ */ l.jsx(
      Go,
      {
        role: "menuitemradio",
        "aria-checked": o,
        ...a,
        ref: t,
        "data-state": rl(o),
        onSelect: U(
          a.onSelect,
          () => r.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Uf.displayName = Bf;
var nl = "MenuItemIndicator", [Gf, j3] = Ln(
  nl,
  { checked: !1 }
), Wf = f.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: a, ...r } = e, o = j3(nl, n);
    return /* @__PURE__ */ l.jsx(
      Ge,
      {
        present: a || to(o.checked) || o.checked === !0,
        children: /* @__PURE__ */ l.jsx(
          Y.span,
          {
            ...r,
            ref: t,
            "data-state": rl(o.checked)
          }
        )
      }
    );
  }
);
Wf.displayName = nl;
var M3 = "MenuSeparator", Hf = f.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...a } = e;
    return /* @__PURE__ */ l.jsx(
      Y.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...a,
        ref: t
      }
    );
  }
);
Hf.displayName = M3;
var O3 = "MenuArrow", Vf = f.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...a } = e, r = gr(n);
    return /* @__PURE__ */ l.jsx(jo, { ...r, ...a, ref: t });
  }
);
Vf.displayName = O3;
var al = "MenuSub", [D3, zf] = Ln(al), Kf = (e) => {
  const { __scopeMenu: t, children: n, open: a = !1, onOpenChange: r } = e, o = hn(al, t), i = gr(t), [s, c] = f.useState(null), [d, u] = f.useState(null), p = Le(r);
  return f.useEffect(() => (o.open === !1 && p(!1), () => p(!1)), [o.open, p]), /* @__PURE__ */ l.jsx(dr, { ...i, children: /* @__PURE__ */ l.jsx(
    kf,
    {
      scope: t,
      open: a,
      onOpenChange: p,
      content: d,
      onContentChange: u,
      children: /* @__PURE__ */ l.jsx(
        D3,
        {
          scope: t,
          contentId: Me(),
          triggerId: Me(),
          trigger: s,
          onTriggerChange: c,
          children: n
        }
      )
    }
  ) });
};
Kf.displayName = al;
var Ia = "MenuSubTrigger", Yf = f.forwardRef(
  (e, t) => {
    const n = hn(Ia, e.__scopeMenu), a = br(Ia, e.__scopeMenu), r = zf(Ia, e.__scopeMenu), o = Qs(Ia, e.__scopeMenu), i = f.useRef(null), { pointerGraceTimerRef: s, onPointerGraceIntentChange: c } = o, d = { __scopeMenu: e.__scopeMenu }, u = f.useCallback(() => {
      i.current && window.clearTimeout(i.current), i.current = null;
    }, []);
    return f.useEffect(() => u, [u]), f.useEffect(() => {
      const p = s.current;
      return () => {
        window.clearTimeout(p), c(null);
      };
    }, [s, c]), /* @__PURE__ */ l.jsx(qs, { asChild: !0, ...d, children: /* @__PURE__ */ l.jsx(
      Df,
      {
        id: r.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": r.contentId,
        "data-state": qf(n.open),
        ...e,
        ref: Gt(t, r.onTriggerChange),
        onClick: (p) => {
          e.onClick?.(p), !(e.disabled || p.defaultPrevented) && (p.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: U(
          e.onPointerMove,
          Va((p) => {
            o.onItemEnter(p), !p.defaultPrevented && !e.disabled && !n.open && !i.current && (o.onPointerGraceIntentChange(null), i.current = window.setTimeout(() => {
              n.onOpenChange(!0), u();
            }, 100));
          })
        ),
        onPointerLeave: U(
          e.onPointerLeave,
          Va((p) => {
            u();
            const m = n.content?.getBoundingClientRect();
            if (m) {
              const h = n.content?.dataset.side, b = h === "right", g = b ? -5 : 5, v = m[b ? "left" : "right"], y = m[b ? "right" : "left"];
              o.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: p.clientX + g, y: p.clientY },
                  { x: v, y: m.top },
                  { x: y, y: m.top },
                  { x: y, y: m.bottom },
                  { x: v, y: m.bottom }
                ],
                side: h
              }), window.clearTimeout(s.current), s.current = window.setTimeout(
                () => o.onPointerGraceIntentChange(null),
                300
              );
            } else {
              if (o.onTriggerLeave(p), p.defaultPrevented) return;
              o.onPointerGraceIntentChange(null);
            }
          })
        ),
        onKeyDown: U(e.onKeyDown, (p) => {
          const m = o.searchRef.current !== "";
          e.disabled || m && p.key === " " || b3[a.dir].includes(p.key) && (n.onOpenChange(!0), n.content?.focus(), p.preventDefault());
        })
      }
    ) });
  }
);
Yf.displayName = Ia;
var Zf = "MenuSubContent", Xf = f.forwardRef(
  (e, t) => {
    const n = Af(st, e.__scopeMenu), { forceMount: a = n.forceMount, ...r } = e, o = hn(st, e.__scopeMenu), i = br(st, e.__scopeMenu), s = zf(Zf, e.__scopeMenu), c = f.useRef(null), d = le(t, c);
    return /* @__PURE__ */ l.jsx(Ha.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ l.jsx(Ge, { present: a || o.open, children: /* @__PURE__ */ l.jsx(Ha.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ l.jsx(
      el,
      {
        id: s.contentId,
        "aria-labelledby": s.triggerId,
        ...r,
        ref: d,
        align: "start",
        side: i.dir === "rtl" ? "left" : "right",
        disableOutsidePointerEvents: !1,
        disableOutsideScroll: !1,
        trapFocus: !1,
        onOpenAutoFocus: (u) => {
          i.isUsingKeyboardRef.current && c.current?.focus(), u.preventDefault();
        },
        onCloseAutoFocus: (u) => u.preventDefault(),
        onFocusOutside: U(e.onFocusOutside, (u) => {
          u.target !== s.trigger && o.onOpenChange(!1);
        }),
        onEscapeKeyDown: U(e.onEscapeKeyDown, (u) => {
          i.onClose(), u.preventDefault();
        }),
        onKeyDown: U(e.onKeyDown, (u) => {
          const p = u.currentTarget.contains(u.target), m = v3[i.dir].includes(u.key);
          p && m && (o.onOpenChange(!1), s.trigger?.focus(), u.preventDefault());
        })
      }
    ) }) }) });
  }
);
Xf.displayName = Zf;
function qf(e) {
  return e ? "open" : "closed";
}
function to(e) {
  return e === "indeterminate";
}
function rl(e) {
  return to(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function I3(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function L3(e, t) {
  return e.map((n, a) => e[(t + a) % e.length]);
}
function F3(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((d) => d === t[0]) ? t[0] : t, o = n ? e.indexOf(n) : -1;
  let i = L3(e, Math.max(o, 0));
  r.length === 1 && (i = i.filter((d) => d !== n));
  const c = i.find(
    (d) => d.toLowerCase().startsWith(r.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function B3(e, t) {
  const { x: n, y: a } = e;
  let r = !1;
  for (let o = 0, i = t.length - 1; o < t.length; i = o++) {
    const s = t[o], c = t[i], d = s.x, u = s.y, p = c.x, m = c.y;
    u > a != m > a && n < (p - d) * (a - u) / (m - u) + d && (r = !r);
  }
  return r;
}
function U3(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return B3(n, t);
}
function Va(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var G3 = Tf, W3 = qs, H3 = jf, V3 = Mf, z3 = tl, K3 = Of, Y3 = Go, Z3 = If, X3 = Ff, q3 = Uf, J3 = Wf, Q3 = Hf, ey = Vf, ty = Kf, ny = Yf, ay = Xf, Wo = "DropdownMenu", [ry, __] = Fe(
  Wo,
  [Rf]
), We = Rf(), [oy, Jf] = ry(Wo), Qf = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: a,
    open: r,
    defaultOpen: o,
    onOpenChange: i,
    modal: s = !0
  } = e, c = We(t), d = f.useRef(null), [u, p] = Ke({
    prop: r,
    defaultProp: o ?? !1,
    onChange: i,
    caller: Wo
  });
  return /* @__PURE__ */ l.jsx(
    oy,
    {
      scope: t,
      triggerId: Me(),
      triggerRef: d,
      contentId: Me(),
      open: u,
      onOpenChange: p,
      onOpenToggle: f.useCallback(() => p((m) => !m), [p]),
      modal: s,
      children: /* @__PURE__ */ l.jsx(G3, { ...c, open: u, onOpenChange: p, dir: a, modal: s, children: n })
    }
  );
};
Qf.displayName = Wo;
var ep = "DropdownMenuTrigger", tp = f.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: a = !1, ...r } = e, o = Jf(ep, n), i = We(n);
    return /* @__PURE__ */ l.jsx(W3, { asChild: !0, ...i, children: /* @__PURE__ */ l.jsx(
      Y.button,
      {
        type: "button",
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": o.open,
        "aria-controls": o.open ? o.contentId : void 0,
        "data-state": o.open ? "open" : "closed",
        "data-disabled": a ? "" : void 0,
        disabled: a,
        ...r,
        ref: Gt(t, o.triggerRef),
        onPointerDown: U(e.onPointerDown, (s) => {
          !a && s.button === 0 && s.ctrlKey === !1 && (o.onOpenToggle(), o.open || s.preventDefault());
        }),
        onKeyDown: U(e.onKeyDown, (s) => {
          a || (["Enter", " "].includes(s.key) && o.onOpenToggle(), s.key === "ArrowDown" && o.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(s.key) && s.preventDefault());
        })
      }
    ) });
  }
);
tp.displayName = ep;
var iy = "DropdownMenuPortal", np = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, a = We(t);
  return /* @__PURE__ */ l.jsx(H3, { ...a, ...n });
};
np.displayName = iy;
var ap = "DropdownMenuContent", rp = f.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...a } = e, r = Jf(ap, n), o = We(n), i = f.useRef(!1);
    return /* @__PURE__ */ l.jsx(
      V3,
      {
        id: r.contentId,
        "aria-labelledby": r.triggerId,
        ...o,
        ...a,
        ref: t,
        onCloseAutoFocus: U(e.onCloseAutoFocus, (s) => {
          i.current || r.triggerRef.current?.focus(), i.current = !1, s.preventDefault();
        }),
        onInteractOutside: U(e.onInteractOutside, (s) => {
          const c = s.detail.originalEvent, d = c.button === 0 && c.ctrlKey === !0, u = c.button === 2 || d;
          (!r.modal || u) && (i.current = !0);
        }),
        style: {
          ...e.style,
          "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
          "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
          "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    );
  }
);
rp.displayName = ap;
var sy = "DropdownMenuGroup", op = f.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...a } = e, r = We(n);
    return /* @__PURE__ */ l.jsx(z3, { ...r, ...a, ref: t });
  }
);
op.displayName = sy;
var ly = "DropdownMenuLabel", ip = f.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...a } = e, r = We(n);
    return /* @__PURE__ */ l.jsx(K3, { ...r, ...a, ref: t });
  }
);
ip.displayName = ly;
var cy = "DropdownMenuItem", sp = f.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...a } = e, r = We(n);
    return /* @__PURE__ */ l.jsx(Y3, { ...r, ...a, ref: t });
  }
);
sp.displayName = cy;
var dy = "DropdownMenuCheckboxItem", lp = f.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...a } = e, r = We(n);
  return /* @__PURE__ */ l.jsx(Z3, { ...r, ...a, ref: t });
});
lp.displayName = dy;
var uy = "DropdownMenuRadioGroup", fy = f.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...a } = e, r = We(n);
  return /* @__PURE__ */ l.jsx(X3, { ...r, ...a, ref: t });
});
fy.displayName = uy;
var py = "DropdownMenuRadioItem", cp = f.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...a } = e, r = We(n);
  return /* @__PURE__ */ l.jsx(q3, { ...r, ...a, ref: t });
});
cp.displayName = py;
var my = "DropdownMenuItemIndicator", dp = f.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...a } = e, r = We(n);
  return /* @__PURE__ */ l.jsx(J3, { ...r, ...a, ref: t });
});
dp.displayName = my;
var hy = "DropdownMenuSeparator", up = f.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...a } = e, r = We(n);
  return /* @__PURE__ */ l.jsx(Q3, { ...r, ...a, ref: t });
});
up.displayName = hy;
var gy = "DropdownMenuArrow", by = f.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...a } = e, r = We(n);
    return /* @__PURE__ */ l.jsx(ey, { ...r, ...a, ref: t });
  }
);
by.displayName = gy;
var vy = (e) => {
  const { __scopeDropdownMenu: t, children: n, open: a, onOpenChange: r, defaultOpen: o } = e, i = We(t), [s, c] = Ke({
    prop: a,
    defaultProp: o ?? !1,
    onChange: r,
    caller: "DropdownMenuSub"
  });
  return /* @__PURE__ */ l.jsx(ty, { ...i, open: s, onOpenChange: c, children: n });
}, yy = "DropdownMenuSubTrigger", fp = f.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...a } = e, r = We(n);
  return /* @__PURE__ */ l.jsx(ny, { ...r, ...a, ref: t });
});
fp.displayName = yy;
var xy = "DropdownMenuSubContent", pp = f.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...a } = e, r = We(n);
  return /* @__PURE__ */ l.jsx(
    ay,
    {
      ...r,
      ...a,
      ref: t,
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
});
pp.displayName = xy;
var wy = Qf, $y = tp, Cy = np, mp = rp, Sy = op, hp = ip, gp = sp, bp = lp, vp = cp, yp = dp, xp = up, _y = vy, wp = fp, $p = pp;
const ol = wy, il = $y, N_ = Sy, E_ = Cy, R_ = _y, Ny = f.forwardRef(({ className: e, inset: t, children: n, ...a }, r) => /* @__PURE__ */ l.jsxs(
  wp,
  {
    ref: r,
    className: x(
      "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      t && "pl-8",
      e
    ),
    ...a,
    children: [
      n,
      /* @__PURE__ */ l.jsx(ku, { className: "ml-auto" })
    ]
  }
));
Ny.displayName = wp.displayName;
const Ey = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  $p,
  {
    ref: n,
    className: x(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
Ey.displayName = $p.displayName;
const Ho = f.forwardRef(({ className: e, sideOffset: t = 4, ...n }, a) => /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx(
  mp,
  {
    ref: a,
    sideOffset: t,
    className: x(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
Ho.displayName = mp.displayName;
const Vo = f.forwardRef(({ className: e, inset: t, ...n }, a) => /* @__PURE__ */ l.jsx(
  gp,
  {
    ref: a,
    className: x(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      t && "pl-8",
      e
    ),
    ...n
  }
));
Vo.displayName = gp.displayName;
const Ry = f.forwardRef(({ className: e, children: t, checked: n, ...a }, r) => /* @__PURE__ */ l.jsxs(
  bp,
  {
    ref: r,
    className: x(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    checked: n,
    ...a,
    children: [
      /* @__PURE__ */ l.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ l.jsx(yp, { children: /* @__PURE__ */ l.jsx(Eo, { className: "h-4 w-4" }) }) }),
      t
    ]
  }
));
Ry.displayName = bp.displayName;
const Py = f.forwardRef(({ className: e, children: t, ...n }, a) => /* @__PURE__ */ l.jsxs(
  vp,
  {
    ref: a,
    className: x(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ l.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ l.jsx(yp, { children: /* @__PURE__ */ l.jsx(u1, { className: "h-4 w-4 fill-current" }) }) }),
      t
    ]
  }
));
Py.displayName = vp.displayName;
const ky = f.forwardRef(({ className: e, inset: t, ...n }, a) => /* @__PURE__ */ l.jsx(
  hp,
  {
    ref: a,
    className: x(
      "px-2 py-1.5 text-sm font-semibold",
      t && "pl-8",
      e
    ),
    ...n
  }
));
ky.displayName = hp.displayName;
const Ty = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  xp,
  {
    ref: n,
    className: x("-mx-1 my-1 h-px bg-muted", e),
    ...t
  }
));
Ty.displayName = xp.displayName;
var zo = "Popover", [Cp, P_] = Fe(zo, [
  pn
]), vr = pn(), [Ay, Fn] = Cp(zo), Sp = (e) => {
  const {
    __scopePopover: t,
    children: n,
    open: a,
    defaultOpen: r,
    onOpenChange: o,
    modal: i = !1
  } = e, s = vr(t), c = f.useRef(null), [d, u] = f.useState(!1), [p, m] = Ke({
    prop: a,
    defaultProp: r ?? !1,
    onChange: o,
    caller: zo
  });
  return /* @__PURE__ */ l.jsx(dr, { ...s, children: /* @__PURE__ */ l.jsx(
    Ay,
    {
      scope: t,
      contentId: Me(),
      triggerRef: c,
      open: p,
      onOpenChange: m,
      onOpenToggle: f.useCallback(() => m((h) => !h), [m]),
      hasCustomAnchor: d,
      onCustomAnchorAdd: f.useCallback(() => u(!0), []),
      onCustomAnchorRemove: f.useCallback(() => u(!1), []),
      modal: i,
      children: n
    }
  ) });
};
Sp.displayName = zo;
var _p = "PopoverAnchor", jy = f.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...a } = e, r = Fn(_p, n), o = vr(n), { onCustomAnchorAdd: i, onCustomAnchorRemove: s } = r;
    return f.useEffect(() => (i(), () => s()), [i, s]), /* @__PURE__ */ l.jsx(ur, { ...o, ...a, ref: t });
  }
);
jy.displayName = _p;
var Np = "PopoverTrigger", Ep = f.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...a } = e, r = Fn(Np, n), o = vr(n), i = le(t, r.triggerRef), s = /* @__PURE__ */ l.jsx(
      Y.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": r.open,
        "aria-controls": r.contentId,
        "data-state": Tp(r.open),
        ...a,
        ref: i,
        onClick: U(e.onClick, r.onOpenToggle)
      }
    );
    return r.hasCustomAnchor ? s : /* @__PURE__ */ l.jsx(ur, { asChild: !0, ...o, children: s });
  }
);
Ep.displayName = Np;
var My = "PopoverPortal", [k_, Oy] = Cp(My, {
  forceMount: void 0
}), oa = "PopoverContent", Rp = f.forwardRef(
  (e, t) => {
    const n = Oy(oa, e.__scopePopover), { forceMount: a = n.forceMount, ...r } = e, o = Fn(oa, e.__scopePopover);
    return /* @__PURE__ */ l.jsx(Ge, { present: a || o.open, children: o.modal ? /* @__PURE__ */ l.jsx(Iy, { ...r, ref: t }) : /* @__PURE__ */ l.jsx(Ly, { ...r, ref: t }) });
  }
);
Rp.displayName = oa;
var Dy = /* @__PURE__ */ on("PopoverContent.RemoveScroll"), Iy = f.forwardRef(
  (e, t) => {
    const n = Fn(oa, e.__scopePopover), a = f.useRef(null), r = le(t, a), o = f.useRef(!1);
    return f.useEffect(() => {
      const i = a.current;
      if (i) return Bo(i);
    }, []), /* @__PURE__ */ l.jsx(mr, { as: Dy, allowPinchZoom: !0, children: /* @__PURE__ */ l.jsx(
      Pp,
      {
        ...e,
        ref: r,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: U(e.onCloseAutoFocus, (i) => {
          i.preventDefault(), o.current || n.triggerRef.current?.focus();
        }),
        onPointerDownOutside: U(
          e.onPointerDownOutside,
          (i) => {
            const s = i.detail.originalEvent, c = s.button === 0 && s.ctrlKey === !0, d = s.button === 2 || c;
            o.current = d;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: U(
          e.onFocusOutside,
          (i) => i.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
), Ly = f.forwardRef(
  (e, t) => {
    const n = Fn(oa, e.__scopePopover), a = f.useRef(!1), r = f.useRef(!1);
    return /* @__PURE__ */ l.jsx(
      Pp,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (o) => {
          e.onCloseAutoFocus?.(o), o.defaultPrevented || (a.current || n.triggerRef.current?.focus(), o.preventDefault()), a.current = !1, r.current = !1;
        },
        onInteractOutside: (o) => {
          e.onInteractOutside?.(o), o.defaultPrevented || (a.current = !0, o.detail.originalEvent.type === "pointerdown" && (r.current = !0));
          const i = o.target;
          n.triggerRef.current?.contains(i) && o.preventDefault(), o.detail.originalEvent.type === "focusin" && r.current && o.preventDefault();
        }
      }
    );
  }
), Pp = f.forwardRef(
  (e, t) => {
    const {
      __scopePopover: n,
      trapFocus: a,
      onOpenAutoFocus: r,
      onCloseAutoFocus: o,
      disableOutsidePointerEvents: i,
      onEscapeKeyDown: s,
      onPointerDownOutside: c,
      onFocusOutside: d,
      onInteractOutside: u,
      ...p
    } = e, m = Fn(oa, n), h = vr(n);
    return Io(), /* @__PURE__ */ l.jsx(
      fr,
      {
        asChild: !0,
        loop: !0,
        trapped: a,
        onMountAutoFocus: r,
        onUnmountAutoFocus: o,
        children: /* @__PURE__ */ l.jsx(
          va,
          {
            asChild: !0,
            disableOutsidePointerEvents: i,
            onInteractOutside: u,
            onEscapeKeyDown: s,
            onPointerDownOutside: c,
            onFocusOutside: d,
            onDismiss: () => m.onOpenChange(!1),
            children: /* @__PURE__ */ l.jsx(
              Ao,
              {
                "data-state": Tp(m.open),
                role: "dialog",
                id: m.contentId,
                ...h,
                ...p,
                ref: t,
                style: {
                  ...p.style,
                  "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
                  "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
                  "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
                  "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
                  "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
                }
              }
            )
          }
        )
      }
    );
  }
), kp = "PopoverClose", Fy = f.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...a } = e, r = Fn(kp, n);
    return /* @__PURE__ */ l.jsx(
      Y.button,
      {
        type: "button",
        ...a,
        ref: t,
        onClick: U(e.onClick, () => r.onOpenChange(!1))
      }
    );
  }
);
Fy.displayName = kp;
var By = "PopoverArrow", Uy = f.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...a } = e, r = vr(n);
    return /* @__PURE__ */ l.jsx(jo, { ...r, ...a, ref: t });
  }
);
Uy.displayName = By;
function Tp(e) {
  return e ? "open" : "closed";
}
var Gy = Sp, Wy = Ep, Ap = Rp;
const jp = Gy, Mp = Wy, sl = f.forwardRef(({ className: e, align: t = "center", sideOffset: n = 4, ...a }, r) => /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsx(
  Ap,
  {
    ref: r,
    align: t,
    sideOffset: n,
    className: x(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...a
  }
) }));
sl.displayName = Ap.displayName;
var Zc = 1, Hy = 0.9, Vy = 0.8, zy = 0.17, Ei = 0.1, Ri = 0.999, Ky = 0.9999, Yy = 0.99, Zy = /[\\\/_+.#"@\[\(\{&]/, Xy = /[\\\/_+.#"@\[\(\{&]/g, qy = /[\s-]/, Op = /[\s-]/g;
function ss(e, t, n, a, r, o, i) {
  if (o === t.length) return r === e.length ? Zc : Yy;
  var s = `${r},${o}`;
  if (i[s] !== void 0) return i[s];
  for (var c = a.charAt(o), d = n.indexOf(c, r), u = 0, p, m, h, b; d >= 0; ) p = ss(e, t, n, a, d + 1, o + 1, i), p > u && (d === r ? p *= Zc : Zy.test(e.charAt(d - 1)) ? (p *= Vy, h = e.slice(r, d - 1).match(Xy), h && r > 0 && (p *= Math.pow(Ri, h.length))) : qy.test(e.charAt(d - 1)) ? (p *= Hy, b = e.slice(r, d - 1).match(Op), b && r > 0 && (p *= Math.pow(Ri, b.length))) : (p *= zy, r > 0 && (p *= Math.pow(Ri, d - r))), e.charAt(d) !== t.charAt(o) && (p *= Ky)), (p < Ei && n.charAt(d - 1) === a.charAt(o + 1) || a.charAt(o + 1) === a.charAt(o) && n.charAt(d - 1) !== a.charAt(o)) && (m = ss(e, t, n, a, d + 1, o + 2, i), m * Ei > p && (p = m * Ei)), p > u && (u = p), d = n.indexOf(c, d + 1);
  return i[s] = u, u;
}
function Xc(e) {
  return e.toLowerCase().replace(Op, " ");
}
function Jy(e, t, n) {
  return e = n && n.length > 0 ? `${e + " " + n.join(" ")}` : e, ss(e, t, Xc(e), Xc(t), 0, 0, {});
}
var Ko = "Dialog", [Dp, T_] = Fe(Ko), [Qy, xt] = Dp(Ko), Ip = (e) => {
  const {
    __scopeDialog: t,
    children: n,
    open: a,
    defaultOpen: r,
    onOpenChange: o,
    modal: i = !0
  } = e, s = f.useRef(null), c = f.useRef(null), [d, u] = Ke({
    prop: a,
    defaultProp: r ?? !1,
    onChange: o,
    caller: Ko
  });
  return /* @__PURE__ */ l.jsx(
    Qy,
    {
      scope: t,
      triggerRef: s,
      contentRef: c,
      contentId: Me(),
      titleId: Me(),
      descriptionId: Me(),
      open: d,
      onOpenChange: u,
      onOpenToggle: f.useCallback(() => u((p) => !p), [u]),
      modal: i,
      children: n
    }
  );
};
Ip.displayName = Ko;
var Lp = "DialogTrigger", Fp = f.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...a } = e, r = xt(Lp, n), o = le(t, r.triggerRef);
    return /* @__PURE__ */ l.jsx(
      Y.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": r.open,
        "aria-controls": r.contentId,
        "data-state": dl(r.open),
        ...a,
        ref: o,
        onClick: U(e.onClick, r.onOpenToggle)
      }
    );
  }
);
Fp.displayName = Lp;
var ll = "DialogPortal", [ex, Bp] = Dp(ll, {
  forceMount: void 0
}), Up = (e) => {
  const { __scopeDialog: t, forceMount: n, children: a, container: r } = e, o = xt(ll, t);
  return /* @__PURE__ */ l.jsx(ex, { scope: t, forceMount: n, children: f.Children.map(a, (i) => /* @__PURE__ */ l.jsx(Ge, { present: n || o.open, children: /* @__PURE__ */ l.jsx(Ks, { asChild: !0, container: r, children: i }) })) });
};
Up.displayName = ll;
var no = "DialogOverlay", Gp = f.forwardRef(
  (e, t) => {
    const n = Bp(no, e.__scopeDialog), { forceMount: a = n.forceMount, ...r } = e, o = xt(no, e.__scopeDialog);
    return o.modal ? /* @__PURE__ */ l.jsx(Ge, { present: a || o.open, children: /* @__PURE__ */ l.jsx(nx, { ...r, ref: t }) }) : null;
  }
);
Gp.displayName = no;
var tx = /* @__PURE__ */ on("DialogOverlay.RemoveScroll"), nx = f.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...a } = e, r = xt(no, n), o = r.contentRef.current, i = o && typeof o.getRootNode == "function" ? o.getRootNode() : null, s = i && typeof ShadowRoot < "u" && i instanceof ShadowRoot ? i : null, c = s ? [r.contentRef, { current: s }] : [r.contentRef];
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ l.jsx(mr, { as: tx, allowPinchZoom: !0, shards: c, children: /* @__PURE__ */ l.jsx(
        Y.div,
        {
          "data-state": dl(r.open),
          ...a,
          ref: t,
          style: { pointerEvents: "auto", ...a.style }
        }
      ) })
    );
  }
), Rn = "DialogContent", Wp = f.forwardRef(
  (e, t) => {
    const n = Bp(Rn, e.__scopeDialog), { forceMount: a = n.forceMount, ...r } = e, o = xt(Rn, e.__scopeDialog);
    return /* @__PURE__ */ l.jsx(Ge, { present: a || o.open, children: o.modal ? /* @__PURE__ */ l.jsx(ax, { ...r, ref: t }) : /* @__PURE__ */ l.jsx(rx, { ...r, ref: t }) });
  }
);
Wp.displayName = Rn;
var ax = f.forwardRef(
  (e, t) => {
    const n = xt(Rn, e.__scopeDialog), a = f.useRef(null), r = le(t, n.contentRef, a);
    return f.useEffect(() => {
      const o = a.current;
      if (o) return Bo(o);
    }, []), /* @__PURE__ */ l.jsx(
      Hp,
      {
        ...e,
        ref: r,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: U(e.onCloseAutoFocus, (o) => {
          o.preventDefault(), n.triggerRef.current?.focus();
        }),
        onPointerDownOutside: U(e.onPointerDownOutside, (o) => {
          const i = o.detail.originalEvent, s = i.button === 0 && i.ctrlKey === !0;
          (i.button === 2 || s) && o.preventDefault();
        }),
        onFocusOutside: U(
          e.onFocusOutside,
          (o) => o.preventDefault()
        )
      }
    );
  }
), rx = f.forwardRef(
  (e, t) => {
    const n = xt(Rn, e.__scopeDialog), a = f.useRef(!1), r = f.useRef(!1);
    return /* @__PURE__ */ l.jsx(
      Hp,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (o) => {
          e.onCloseAutoFocus?.(o), o.defaultPrevented || (a.current || n.triggerRef.current?.focus(), o.preventDefault()), a.current = !1, r.current = !1;
        },
        onInteractOutside: (o) => {
          e.onInteractOutside?.(o), o.defaultPrevented || (a.current = !0, o.detail.originalEvent.type === "pointerdown" && (r.current = !0));
          const i = o.target;
          n.triggerRef.current?.contains(i) && o.preventDefault(), o.detail.originalEvent.type === "focusin" && r.current && o.preventDefault();
        }
      }
    );
  }
), Hp = f.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, trapFocus: a, onOpenAutoFocus: r, onCloseAutoFocus: o, ...i } = e, s = xt(Rn, n), c = f.useRef(null), d = le(t, c);
    return Io(), /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(
        fr,
        {
          asChild: !0,
          loop: !0,
          trapped: a,
          onMountAutoFocus: r,
          onUnmountAutoFocus: o,
          children: /* @__PURE__ */ l.jsx(
            va,
            {
              role: "dialog",
              id: s.contentId,
              "aria-describedby": s.descriptionId,
              "aria-labelledby": s.titleId,
              "data-state": dl(s.open),
              ...i,
              ref: d,
              onDismiss: () => s.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsx(ox, { titleId: s.titleId }),
        /* @__PURE__ */ l.jsx(sx, { contentRef: c, descriptionId: s.descriptionId })
      ] })
    ] });
  }
), cl = "DialogTitle", Vp = f.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...a } = e, r = xt(cl, n);
    return /* @__PURE__ */ l.jsx(Y.h2, { id: r.titleId, ...a, ref: t });
  }
);
Vp.displayName = cl;
var zp = "DialogDescription", Kp = f.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...a } = e, r = xt(zp, n);
    return /* @__PURE__ */ l.jsx(Y.p, { id: r.descriptionId, ...a, ref: t });
  }
);
Kp.displayName = zp;
var Yp = "DialogClose", Zp = f.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...a } = e, r = xt(Yp, n);
    return /* @__PURE__ */ l.jsx(
      Y.button,
      {
        type: "button",
        ...a,
        ref: t,
        onClick: U(e.onClick, () => r.onOpenChange(!1))
      }
    );
  }
);
Zp.displayName = Yp;
function dl(e) {
  return e ? "open" : "closed";
}
var Xp = "DialogTitleWarning", [A_, qp] = Ib(Xp, {
  contentName: Rn,
  titleName: cl,
  docsSlug: "dialog"
}), ox = ({ titleId: e }) => {
  const t = qp(Xp), n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return f.useEffect(() => {
    e && (document.getElementById(e) || console.error(n));
  }, [n, e]), null;
}, ix = "DialogDescriptionWarning", sx = ({ contentRef: e, descriptionId: t }) => {
  const a = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${qp(ix).contentName}}.`;
  return f.useEffect(() => {
    const r = e.current?.getAttribute("aria-describedby");
    t && r && (document.getElementById(t) || console.warn(a));
  }, [a, e, t]), null;
}, Yo = Ip, ul = Fp, Zo = Up, wa = Gp, $a = Wp, yr = Vp, xr = Kp, Xo = Zp, Ta = '[cmdk-group=""]', Pi = '[cmdk-group-items=""]', lx = '[cmdk-group-heading=""]', Jp = '[cmdk-item=""]', qc = `${Jp}:not([aria-disabled="true"])`, ls = "cmdk-item-select", Zn = "data-value", cx = (e, t, n) => Jy(e, t, n), Qp = f.createContext(void 0), wr = () => f.useContext(Qp), em = f.createContext(void 0), fl = () => f.useContext(em), tm = f.createContext(void 0), nm = f.forwardRef((e, t) => {
  let n = Xn(() => {
    var _, G;
    return { search: "", value: (G = (_ = e.value) != null ? _ : e.defaultValue) != null ? G : "", selectedItemId: void 0, filtered: { count: 0, items: /* @__PURE__ */ new Map(), groups: /* @__PURE__ */ new Set() } };
  }), a = Xn(() => /* @__PURE__ */ new Set()), r = Xn(() => /* @__PURE__ */ new Map()), o = Xn(() => /* @__PURE__ */ new Map()), i = Xn(() => /* @__PURE__ */ new Set()), s = am(e), { label: c, children: d, value: u, onValueChange: p, filter: m, shouldFilter: h, loop: b, disablePointerSelection: g = !1, vimBindings: v = !0, ...y } = e, w = Me(), $ = Me(), C = Me(), R = f.useRef(null), k = xx();
  Pn(() => {
    if (u !== void 0) {
      let _ = u.trim();
      n.current.value = _, S.emit();
    }
  }, [u]), Pn(() => {
    k(6, T);
  }, []);
  let S = f.useMemo(() => ({ subscribe: (_) => (i.current.add(_), () => i.current.delete(_)), snapshot: () => n.current, setState: (_, G, X) => {
    var W, te, M, q;
    if (!Object.is(n.current[_], G)) {
      if (n.current[_] = G, _ === "search") L(), B(), k(1, z);
      else if (_ === "value") {
        if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
          let oe = document.getElementById(C);
          oe ? oe.focus() : (W = document.getElementById(w)) == null || W.focus();
        }
        if (k(7, () => {
          var oe;
          n.current.selectedItemId = (oe = K()) == null ? void 0 : oe.id, S.emit();
        }), X || k(5, T), ((te = s.current) == null ? void 0 : te.value) !== void 0) {
          let oe = G ?? "";
          (q = (M = s.current).onValueChange) == null || q.call(M, oe);
          return;
        }
      }
      S.emit();
    }
  }, emit: () => {
    i.current.forEach((_) => _());
  } }), []), j = f.useMemo(() => ({ value: (_, G, X) => {
    var W;
    G !== ((W = o.current.get(_)) == null ? void 0 : W.value) && (o.current.set(_, { value: G, keywords: X }), n.current.filtered.items.set(_, P(G, X)), k(2, () => {
      B(), S.emit();
    }));
  }, item: (_, G) => (a.current.add(_), G && (r.current.has(G) ? r.current.get(G).add(_) : r.current.set(G, /* @__PURE__ */ new Set([_]))), k(3, () => {
    L(), B(), n.current.value || z(), S.emit();
  }), () => {
    o.current.delete(_), a.current.delete(_), n.current.filtered.items.delete(_);
    let X = K();
    k(4, () => {
      L(), X?.getAttribute("id") === _ && z(), S.emit();
    });
  }), group: (_) => (r.current.has(_) || r.current.set(_, /* @__PURE__ */ new Set()), () => {
    o.current.delete(_), r.current.delete(_);
  }), filter: () => s.current.shouldFilter, label: c || e["aria-label"], getDisablePointerSelection: () => s.current.disablePointerSelection, listId: w, inputId: C, labelId: $, listInnerRef: R }), []);
  function P(_, G) {
    var X, W;
    let te = (W = (X = s.current) == null ? void 0 : X.filter) != null ? W : cx;
    return _ ? te(_, n.current.search, G) : 0;
  }
  function B() {
    if (!n.current.search || s.current.shouldFilter === !1) return;
    let _ = n.current.filtered.items, G = [];
    n.current.filtered.groups.forEach((W) => {
      let te = r.current.get(W), M = 0;
      te.forEach((q) => {
        let oe = _.get(q);
        M = Math.max(oe, M);
      }), G.push([W, M]);
    });
    let X = R.current;
    Q().sort((W, te) => {
      var M, q;
      let oe = W.getAttribute("id"), ce = te.getAttribute("id");
      return ((M = _.get(ce)) != null ? M : 0) - ((q = _.get(oe)) != null ? q : 0);
    }).forEach((W) => {
      let te = W.closest(Pi);
      te ? te.appendChild(W.parentElement === te ? W : W.closest(`${Pi} > *`)) : X.appendChild(W.parentElement === X ? W : W.closest(`${Pi} > *`));
    }), G.sort((W, te) => te[1] - W[1]).forEach((W) => {
      var te;
      let M = (te = R.current) == null ? void 0 : te.querySelector(`${Ta}[${Zn}="${encodeURIComponent(W[0])}"]`);
      M?.parentElement.appendChild(M);
    });
  }
  function z() {
    let _ = Q().find((X) => X.getAttribute("aria-disabled") !== "true"), G = _?.getAttribute(Zn);
    S.setState("value", G || void 0);
  }
  function L() {
    var _, G, X, W;
    if (!n.current.search || s.current.shouldFilter === !1) {
      n.current.filtered.count = a.current.size;
      return;
    }
    n.current.filtered.groups = /* @__PURE__ */ new Set();
    let te = 0;
    for (let M of a.current) {
      let q = (G = (_ = o.current.get(M)) == null ? void 0 : _.value) != null ? G : "", oe = (W = (X = o.current.get(M)) == null ? void 0 : X.keywords) != null ? W : [], ce = P(q, oe);
      n.current.filtered.items.set(M, ce), ce > 0 && te++;
    }
    for (let [M, q] of r.current) for (let oe of q) if (n.current.filtered.items.get(oe) > 0) {
      n.current.filtered.groups.add(M);
      break;
    }
    n.current.filtered.count = te;
  }
  function T() {
    var _, G, X;
    let W = K();
    W && (((_ = W.parentElement) == null ? void 0 : _.firstChild) === W && ((X = (G = W.closest(Ta)) == null ? void 0 : G.querySelector(lx)) == null || X.scrollIntoView({ block: "nearest" })), W.scrollIntoView({ block: "nearest" }));
  }
  function K() {
    var _;
    return (_ = R.current) == null ? void 0 : _.querySelector(`${Jp}[aria-selected="true"]`);
  }
  function Q() {
    var _;
    return Array.from(((_ = R.current) == null ? void 0 : _.querySelectorAll(qc)) || []);
  }
  function V(_) {
    let G = Q()[_];
    G && S.setState("value", G.getAttribute(Zn));
  }
  function A(_) {
    var G;
    let X = K(), W = Q(), te = W.findIndex((q) => q === X), M = W[te + _];
    (G = s.current) != null && G.loop && (M = te + _ < 0 ? W[W.length - 1] : te + _ === W.length ? W[0] : W[te + _]), M && S.setState("value", M.getAttribute(Zn));
  }
  function E(_) {
    let G = K(), X = G?.closest(Ta), W;
    for (; X && !W; ) X = _ > 0 ? vx(X, Ta) : yx(X, Ta), W = X?.querySelector(qc);
    W ? S.setState("value", W.getAttribute(Zn)) : A(_);
  }
  let O = () => V(Q().length - 1), N = (_) => {
    _.preventDefault(), _.metaKey ? O() : _.altKey ? E(1) : A(1);
  }, H = (_) => {
    _.preventDefault(), _.metaKey ? V(0) : _.altKey ? E(-1) : A(-1);
  };
  return f.createElement(Y.div, { ref: t, tabIndex: -1, ...y, "cmdk-root": "", onKeyDown: (_) => {
    var G;
    (G = y.onKeyDown) == null || G.call(y, _);
    let X = _.nativeEvent.isComposing || _.keyCode === 229;
    if (!(_.defaultPrevented || X)) switch (_.key) {
      case "n":
      case "j": {
        v && _.ctrlKey && N(_);
        break;
      }
      case "ArrowDown": {
        N(_);
        break;
      }
      case "p":
      case "k": {
        v && _.ctrlKey && H(_);
        break;
      }
      case "ArrowUp": {
        H(_);
        break;
      }
      case "Home": {
        _.preventDefault(), V(0);
        break;
      }
      case "End": {
        _.preventDefault(), O();
        break;
      }
      case "Enter": {
        _.preventDefault();
        let W = K();
        if (W) {
          let te = new Event(ls);
          W.dispatchEvent(te);
        }
      }
    }
  } }, f.createElement("label", { "cmdk-label": "", htmlFor: j.inputId, id: j.labelId, style: $x }, c), qo(e, (_) => f.createElement(em.Provider, { value: S }, f.createElement(Qp.Provider, { value: j }, _))));
}), dx = f.forwardRef((e, t) => {
  var n, a;
  let r = Me(), o = f.useRef(null), i = f.useContext(tm), s = wr(), c = am(e), d = (a = (n = c.current) == null ? void 0 : n.forceMount) != null ? a : i?.forceMount;
  Pn(() => {
    if (!d) return s.item(r, i?.id);
  }, [d]);
  let u = rm(r, o, [e.value, e.children, o], e.keywords), p = fl(), m = cn((k) => k.value && k.value === u.current), h = cn((k) => d || s.filter() === !1 ? !0 : k.search ? k.filtered.items.get(r) > 0 : !0);
  f.useEffect(() => {
    let k = o.current;
    if (!(!k || e.disabled)) return k.addEventListener(ls, b), () => k.removeEventListener(ls, b);
  }, [h, e.onSelect, e.disabled]);
  function b() {
    var k, S;
    g(), (S = (k = c.current).onSelect) == null || S.call(k, u.current);
  }
  function g() {
    p.setState("value", u.current, !0);
  }
  if (!h) return null;
  let { disabled: v, value: y, onSelect: w, forceMount: $, keywords: C, ...R } = e;
  return f.createElement(Y.div, { ref: Gt(o, t), ...R, id: r, "cmdk-item": "", role: "option", "aria-disabled": !!v, "aria-selected": !!m, "data-disabled": !!v, "data-selected": !!m, onPointerMove: v || s.getDisablePointerSelection() ? void 0 : g, onClick: v ? void 0 : b }, e.children);
}), ux = f.forwardRef((e, t) => {
  let { heading: n, children: a, forceMount: r, ...o } = e, i = Me(), s = f.useRef(null), c = f.useRef(null), d = Me(), u = wr(), p = cn((h) => r || u.filter() === !1 ? !0 : h.search ? h.filtered.groups.has(i) : !0);
  Pn(() => u.group(i), []), rm(i, s, [e.value, e.heading, c]);
  let m = f.useMemo(() => ({ id: i, forceMount: r }), [r]);
  return f.createElement(Y.div, { ref: Gt(s, t), ...o, "cmdk-group": "", role: "presentation", hidden: p ? void 0 : !0 }, n && f.createElement("div", { ref: c, "cmdk-group-heading": "", "aria-hidden": !0, id: d }, n), qo(e, (h) => f.createElement("div", { "cmdk-group-items": "", role: "group", "aria-labelledby": n ? d : void 0 }, f.createElement(tm.Provider, { value: m }, h))));
}), fx = f.forwardRef((e, t) => {
  let { alwaysRender: n, ...a } = e, r = f.useRef(null), o = cn((i) => !i.search);
  return !n && !o ? null : f.createElement(Y.div, { ref: Gt(r, t), ...a, "cmdk-separator": "", role: "separator" });
}), px = f.forwardRef((e, t) => {
  let { onValueChange: n, ...a } = e, r = e.value != null, o = fl(), i = cn((d) => d.search), s = cn((d) => d.selectedItemId), c = wr();
  return f.useEffect(() => {
    e.value != null && o.setState("search", e.value);
  }, [e.value]), f.createElement(Y.input, { ref: t, ...a, "cmdk-input": "", autoComplete: "off", autoCorrect: "off", spellCheck: !1, "aria-autocomplete": "list", role: "combobox", "aria-expanded": !0, "aria-controls": c.listId, "aria-labelledby": c.labelId, "aria-activedescendant": s, id: c.inputId, type: "text", value: r ? e.value : i, onChange: (d) => {
    r || o.setState("search", d.target.value), n?.(d.target.value);
  } });
}), mx = f.forwardRef((e, t) => {
  let { children: n, label: a = "Suggestions", ...r } = e, o = f.useRef(null), i = f.useRef(null), s = cn((d) => d.selectedItemId), c = wr();
  return f.useEffect(() => {
    if (i.current && o.current) {
      let d = i.current, u = o.current, p, m = new ResizeObserver(() => {
        p = requestAnimationFrame(() => {
          let h = d.offsetHeight;
          u.style.setProperty("--cmdk-list-height", h.toFixed(1) + "px");
        });
      });
      return m.observe(d), () => {
        cancelAnimationFrame(p), m.unobserve(d);
      };
    }
  }, []), f.createElement(Y.div, { ref: Gt(o, t), ...r, "cmdk-list": "", role: "listbox", tabIndex: -1, "aria-activedescendant": s, "aria-label": a, id: c.listId }, qo(e, (d) => f.createElement("div", { ref: Gt(i, c.listInnerRef), "cmdk-list-sizer": "" }, d)));
}), hx = f.forwardRef((e, t) => {
  let { open: n, onOpenChange: a, overlayClassName: r, contentClassName: o, container: i, ...s } = e;
  return f.createElement(Yo, { open: n, onOpenChange: a }, f.createElement(Zo, { container: i }, f.createElement(wa, { "cmdk-overlay": "", className: r }), f.createElement($a, { "aria-label": e.label, "cmdk-dialog": "", className: o }, f.createElement(nm, { ref: t, ...s }))));
}), gx = f.forwardRef((e, t) => cn((n) => n.filtered.count === 0) ? f.createElement(Y.div, { ref: t, ...e, "cmdk-empty": "", role: "presentation" }) : null), bx = f.forwardRef((e, t) => {
  let { progress: n, children: a, label: r = "Loading...", ...o } = e;
  return f.createElement(Y.div, { ref: t, ...o, "cmdk-loading": "", role: "progressbar", "aria-valuenow": n, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": r }, qo(e, (i) => f.createElement("div", { "aria-hidden": !0 }, i)));
}), et = Object.assign(nm, { List: mx, Item: dx, Input: px, Group: ux, Separator: fx, Dialog: hx, Empty: gx, Loading: bx });
function vx(e, t) {
  let n = e.nextElementSibling;
  for (; n; ) {
    if (n.matches(t)) return n;
    n = n.nextElementSibling;
  }
}
function yx(e, t) {
  let n = e.previousElementSibling;
  for (; n; ) {
    if (n.matches(t)) return n;
    n = n.previousElementSibling;
  }
}
function am(e) {
  let t = f.useRef(e);
  return Pn(() => {
    t.current = e;
  }), t;
}
var Pn = typeof window > "u" ? f.useEffect : f.useLayoutEffect;
function Xn(e) {
  let t = f.useRef();
  return t.current === void 0 && (t.current = e()), t;
}
function cn(e) {
  let t = fl(), n = () => e(t.snapshot());
  return f.useSyncExternalStore(t.subscribe, n, n);
}
function rm(e, t, n, a = []) {
  let r = f.useRef(), o = wr();
  return Pn(() => {
    var i;
    let s = (() => {
      var d;
      for (let u of n) {
        if (typeof u == "string") return u.trim();
        if (typeof u == "object" && "current" in u) return u.current ? (d = u.current.textContent) == null ? void 0 : d.trim() : r.current;
      }
    })(), c = a.map((d) => d.trim());
    o.value(e, s, c), (i = t.current) == null || i.setAttribute(Zn, s), r.current = s;
  }), r;
}
var xx = () => {
  let [e, t] = f.useState(), n = Xn(() => /* @__PURE__ */ new Map());
  return Pn(() => {
    n.current.forEach((a) => a()), n.current = /* @__PURE__ */ new Map();
  }, [e]), (a, r) => {
    n.current.set(a, r), t({});
  };
};
function wx(e) {
  let t = e.type;
  return typeof t == "function" ? t(e.props) : "render" in t ? t.render(e.props) : e;
}
function qo({ asChild: e, children: t }, n) {
  return e && f.isValidElement(t) ? f.cloneElement(wx(t), { ref: t.ref }, n(t.props.children)) : n(t);
}
var $x = { position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0" };
const om = Yo, j_ = ul, Cx = Zo, M_ = Xo, pl = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  wa,
  {
    ref: n,
    className: x(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      e
    ),
    ...t
  }
));
pl.displayName = wa.displayName;
const ml = f.forwardRef(({ className: e, children: t, hideClose: n, ...a }, r) => /* @__PURE__ */ l.jsxs(Cx, { container: a.container, children: [
  /* @__PURE__ */ l.jsx(pl, {}),
  /* @__PURE__ */ l.jsxs(
    $a,
    {
      ref: r,
      className: x(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        e
      ),
      ...a,
      children: [
        t,
        !n && /* @__PURE__ */ l.jsxs(Xo, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ l.jsx(s1, { className: "h-4 w-4" }),
          /* @__PURE__ */ l.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
ml.displayName = $a.displayName;
const Sx = ({
  className: e,
  ...t
}) => /* @__PURE__ */ l.jsx(
  "div",
  {
    className: x(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      e
    ),
    ...t
  }
);
Sx.displayName = "DialogHeader";
const _x = ({
  className: e,
  ...t
}) => /* @__PURE__ */ l.jsx(
  "div",
  {
    className: x(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      e
    ),
    ...t
  }
);
_x.displayName = "DialogFooter";
const Nx = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  yr,
  {
    ref: n,
    className: x(
      "text-lg font-semibold leading-none tracking-tight",
      e
    ),
    ...t
  }
));
Nx.displayName = yr.displayName;
const Ex = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  xr,
  {
    ref: n,
    className: x("text-sm text-muted-foreground", e),
    ...t
  }
));
Ex.displayName = xr.displayName;
const hl = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  et,
  {
    ref: n,
    className: x(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      e
    ),
    ...t
  }
));
hl.displayName = et.displayName;
const gl = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ l.jsx(p1, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ l.jsx(
    et.Input,
    {
      ref: n,
      className: x(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        e
      ),
      ...t
    }
  )
] }));
gl.displayName = et.Input.displayName;
const bl = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  et.List,
  {
    ref: n,
    className: x("max-h-[300px] overflow-y-auto overflow-x-hidden", e),
    ...t
  }
));
bl.displayName = et.List.displayName;
const vl = f.forwardRef((e, t) => /* @__PURE__ */ l.jsx(
  et.Empty,
  {
    ref: t,
    className: "py-6 text-center text-sm",
    ...e
  }
));
vl.displayName = et.Empty.displayName;
const yl = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  et.Group,
  {
    ref: n,
    className: x(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      e
    ),
    ...t
  }
));
yl.displayName = et.Group.displayName;
const Rx = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  et.Separator,
  {
    ref: n,
    className: x("-mx-1 h-px bg-border", e),
    ...t
  }
));
Rx.displayName = et.Separator.displayName;
const xl = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  et.Item,
  {
    ref: n,
    className: x(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      e
    ),
    ...t
  }
));
xl.displayName = et.Item.displayName;
var Px = "Label", im = f.forwardRef((e, t) => /* @__PURE__ */ l.jsx(
  Y.label,
  {
    ...e,
    ref: t,
    onMouseDown: (n) => {
      n.target.closest("button, input, select, textarea") || (e.onMouseDown?.(n), !n.defaultPrevented && n.detail > 1 && n.preventDefault());
    }
  }
));
im.displayName = Px;
var sm = im;
const kx = sr(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
), wl = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  sm,
  {
    ref: n,
    className: x(kx(), e),
    ...t
  }
));
wl.displayName = sm.displayName;
const lm = Ue(null), Jo = () => {
  const e = _e(lm);
  if (!e) throw new Error("Must be used within <CheckboxDropdown>");
  return e;
};
function Tx({
  selectedOption: e,
  setSelectedOption: t,
  isSelected: n,
  onToggle: a,
  onChange: r,
  options: o,
  children: i,
  className: s
}) {
  const c = (d) => o.find((u) => u.id === d)?.name || "";
  return /* @__PURE__ */ l.jsx(
    lm.Provider,
    {
      value: { selectedOption: e, setSelectedOption: t, isSelected: n, onToggle: a, onChange: r, options: o, getOptionName: c },
      children: /* @__PURE__ */ l.jsx("div", { className: x("flex items-center gap-2 px-4 py-2 rounded-lg", "n3o-checkbox__container", s), children: i })
    }
  );
}
function Ax({ label: e, className: t }) {
  const { isSelected: n, onToggle: a } = Jo();
  return /* @__PURE__ */ l.jsxs("div", { className: x("flex items-center gap-2", "n3o-checkbox__input-wrapper", t), children: [
    /* @__PURE__ */ l.jsx(Dn, { id: "donationType", checked: n, onCheckedChange: a, className: "n3o-checkbox__input" }),
    /* @__PURE__ */ l.jsx(wl, { htmlFor: "donationType", className: "n3o-checkbox__label", children: e })
  ] });
}
function jx({ className: e }) {
  const { selectedOption: t, setSelectedOption: n, onChange: a, options: r, getOptionName: o } = Jo();
  return /* @__PURE__ */ l.jsxs(ol, { children: [
    /* @__PURE__ */ l.jsx(il, { asChild: !0, children: /* @__PURE__ */ l.jsxs(we, { variant: "link", className: x("p-0 underline flex items-center", "n3o-checkbox__dropdown-trigger", e), children: [
      o(t),
      " ",
      /* @__PURE__ */ l.jsx(Co, { className: "ml-1 h-4 w-4" })
    ] }) }),
    /* @__PURE__ */ l.jsx(Ho, { className: "n3o-checkbox__dropdown-menu", children: r.map((i, s) => /* @__PURE__ */ l.jsx(
      Vo,
      {
        className: "n3o-checkbox__dropdown-item",
        onSelect: () => {
          n(i.id), a(i.id);
        },
        children: i.name
      },
      `${i.id}-${s}`
    )) })
  ] });
}
function Mx({ content: e, className: t }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("ml-auto", t), children: /* @__PURE__ */ l.jsx(uf, { children: /* @__PURE__ */ l.jsxs(ff, { children: [
    /* @__PURE__ */ l.jsx(pf, { asChild: !0, children: /* @__PURE__ */ l.jsx(we, { variant: "ghost", size: "icon", className: "h-6 w-6 rounded-full border", children: /* @__PURE__ */ l.jsx(K0, { className: "h-4 w-4" }) }) }),
    /* @__PURE__ */ l.jsx(Zs, { children: /* @__PURE__ */ l.jsx("p", { children: e }) })
  ] }) }) });
}
function Ox({
  placeholder: e = "Select option...",
  searchPlaceholder: t = "Search options...",
  noResultsText: n = "No option found.",
  className: a
}) {
  const { selectedOption: r, setSelectedOption: o, onChange: i, options: s, getOptionName: c } = Jo(), [d, u] = je(!1);
  return /* @__PURE__ */ l.jsxs(jp, { open: d, onOpenChange: u, children: [
    /* @__PURE__ */ l.jsx(Mp, { asChild: !0, children: /* @__PURE__ */ l.jsxs(
      we,
      {
        variant: "outline",
        role: "combobox",
        "aria-expanded": d,
        className: x("justify-between min-w-0 flex-1", a),
        children: [
          /* @__PURE__ */ l.jsx("span", { className: "truncate", children: r ? c(r) : e }),
          /* @__PURE__ */ l.jsx(z0, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ l.jsx(sl, { className: "p-0", style: { width: "var(--radix-popover-trigger-width)" }, children: /* @__PURE__ */ l.jsxs(hl, { children: [
      /* @__PURE__ */ l.jsx(gl, { placeholder: t }),
      /* @__PURE__ */ l.jsxs(bl, { children: [
        /* @__PURE__ */ l.jsx(vl, { children: n }),
        /* @__PURE__ */ l.jsx(yl, { children: s.map((p, m) => /* @__PURE__ */ l.jsxs(
          xl,
          {
            value: p.id,
            onSelect: (h) => {
              const b = h === r ? "" : h;
              o(b), i(b), u(!1);
            },
            children: [
              /* @__PURE__ */ l.jsx(
                fu,
                {
                  className: x(
                    "mr-2 h-4 w-4",
                    r === p.id ? "opacity-100" : "opacity-0"
                  )
                }
              ),
              /* @__PURE__ */ l.jsx("span", { className: "truncate", children: p.name })
            ]
          },
          `${p.id}-${m}`
        )) })
      ] })
    ] }) })
  ] });
}
const O_ = {
  Root: Tx,
  Dropdown: jx,
  Combobox: Ox,
  Checkbox: Ax,
  Tooltip: Mx,
  useCheckboxDropdown: Jo
}, cm = ({ children: e, className: t }) => /* @__PURE__ */ l.jsx("div", { className: x("flex gap-3 pt-4", "n3o-navigation__container", t), children: e }), Dx = ({ children: e, className: t, onClick: n }) => /* @__PURE__ */ l.jsx(we, { className: x("n3o-navigation__back-button", t), variant: "outline", onClick: n, children: e }), Ix = ({ children: e, className: t, onClick: n }) => /* @__PURE__ */ l.jsx(we, { className: x("flex-1", "n3o-navigation__next-button", t), onClick: n, children: e });
cm.Back = Dx;
cm.Next = Ix;
const D_ = ({ children: e, className: t }) => /* @__PURE__ */ l.jsx(
  "div",
  {
    className: `bg-destructive/15 text-destructive text-sm p-3 rounded-md n3o-validation-error ${t || ""}`,
    children: e
  }
), Lx = ({ children: e, className: t }) => /* @__PURE__ */ l.jsx(
  "div",
  {
    className: `border-t border-orange-100 bg-orange-50 p-4 n3o-warning ${t || ""}`,
    children: e
  }
), Fx = ({ className: e, children: t }) => /* @__PURE__ */ l.jsx("p", { className: `text-sm text-orange-800 n3o-warning__line ${e || ""}`, children: t });
Lx.Line = Fx;
const Ca = Ue(null), ia = (e) => {
  const t = _e(Ca);
  if (!t)
    throw new Error("useStepperStore must be used within a Stepper component");
  return t(e);
}, I_ = ({
  children: e,
  steps: t,
  initialStep: n,
  onSubmit: a,
  onStepChange: r,
  showNavigation: o = !0,
  backButtonText: i = "Back",
  nextButtonText: s = "Continue",
  submitButtonText: c = "Submit",
  store: d
}) => {
  const u = wo(() => d ?? L0(), [d]);
  return At(() => {
    u.getState().init({
      steps: t,
      initialStep: n,
      onSubmit: a,
      onStepChange: r,
      showNavigation: o,
      backButtonText: i,
      nextButtonText: s,
      submitButtonText: c
    });
  }, [u, t, n, a, r, o, i, s, c]), /* @__PURE__ */ l.jsx(Ca.Provider, { value: u, children: /* @__PURE__ */ l.jsx("div", { className: "w-full", children: e }) });
}, L_ = ({ id: e, children: t, validator: n }) => {
  const a = ia((o) => o.currentStepId), r = ia((o) => o.registerStep);
  return At(() => {
    r(e, n);
  }, [e, n, r]), a !== e ? null : /* @__PURE__ */ l.jsx("div", { className: "w-full", children: t });
}, F_ = ({ children: e, className: t }) => ia((a) => a.showNavigation) ? /* @__PURE__ */ l.jsx("div", { className: x("flex gap-2 justify-between", t), children: e }) : null, B_ = ({
  children: e,
  className: t,
  store: n,
  text: a,
  ...r
}) => {
  const o = _e(Ca), i = n ?? o;
  if (!i)
    throw new Error("BackButton must be used within a Stepper component or provided a store prop");
  const s = i((u) => u.back), c = i((u) => u.isFirst), d = i((u) => u.backButtonText);
  return c ? null : /* @__PURE__ */ l.jsx(
    we,
    {
      type: "button",
      variant: "outline",
      className: x("flex-1", t),
      onClick: s,
      ...r,
      children: e ?? a ?? d
    }
  );
}, U_ = ({
  children: e,
  className: t,
  store: n,
  text: a,
  ...r
}) => {
  const o = _e(Ca), i = n ?? o;
  if (!i)
    throw new Error("NextButton must be used within a Stepper component or provided a store prop");
  const s = i((u) => u.next), c = i((u) => u.isLast), d = i((u) => u.nextButtonText);
  return c ? null : /* @__PURE__ */ l.jsx(
    we,
    {
      type: "button",
      className: x("flex-1", t),
      onClick: s,
      ...r,
      children: e ?? a ?? d
    }
  );
}, G_ = ({
  children: e,
  className: t,
  store: n,
  text: a,
  ...r
}) => {
  const o = _e(Ca), i = n ?? o;
  if (!i)
    throw new Error("SubmitButton must be used within a Stepper component or provided a store prop");
  const s = i((u) => u.onSubmit), c = i((u) => u.isLast), d = i((u) => u.submitButtonText);
  return c ? /* @__PURE__ */ l.jsx(
    we,
    {
      type: "button",
      className: x("flex-1", t),
      onClick: s,
      ...r,
      children: e ?? a ?? d
    }
  ) : null;
}, W_ = ({ stepId: e, className: t, store: n }) => {
  const a = _e(Ca), r = n ?? a;
  if (!r)
    throw new Error("StepErrors must be used within Stepper or get a store prop");
  const o = r(
    (i) => e ? i.stepErrors[e] : i.stepErrors[i.currentStepId]
  );
  return !o || o.length === 0 ? null : /* @__PURE__ */ l.jsx("div", { className: x("text-destructive text-sm mt-2", t), children: o.map((i, s) => /* @__PURE__ */ l.jsx("div", { children: i }, s)) });
}, H_ = () => ia((e) => e.currentStepId), V_ = () => ia((e) => ({
  next: e.next,
  back: e.back,
  goTo: e.goTo,
  isFirst: e.isFirst,
  isLast: e.isLast
})), z_ = () => ia((e) => ({
  getCurrentStepErrors: e.getCurrentStepErrors,
  getStepErrors: e.getStepErrors
})), Bx = ({
  selected: e,
  onSelect: t,
  children: n,
  className: a,
  ...r
}) => /* @__PURE__ */ l.jsx(
  "div",
  {
    className: x(
      "p-4 cursor-pointer",
      "n3o-entity-card",
      e && "n3o-entity-card--selected",
      e && "bg-gray-100",
      a
    ),
    onClick: t,
    ...r,
    children: /* @__PURE__ */ l.jsx("div", { className: x("group flex items-center justify-between gap-3", "n3o-entity-card__content"), children: n })
  }
), Ux = ({ children: e, className: t }) => /* @__PURE__ */ l.jsx("div", { className: x("flex gap-2", "n3o-entity-card__content-inner", t), children: e }), Gx = ({ children: e }) => /* @__PURE__ */ l.jsx("div", { className: x("rounded-lg bg-gray-200 p-0", "n3o-entity-card__icon"), children: e }), Wx = ({ src: e, alt: t, className: n }) => /* @__PURE__ */ l.jsx(
  "img",
  {
    src: e,
    alt: t,
    className: x("size-10 object-cover rounded opacity-50 group-hover:opacity-100 transition-opacity duration-200", "n3o-entity-card__image", n)
  }
), Hx = ({ children: e }) => /* @__PURE__ */ l.jsx("div", { className: x("block sm:hidden", "n3o-entity-card__action"), children: e }), K_ = Object.assign(Bx, {
  Action: Hx,
  Content: Ux,
  Icon: Gx,
  Image: Wx
});
function Y_({ className: e, children: t }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("flex flex-1 min-h-svh sm:min-h-0 flex-col bg-background sm:rounded-xl min-w-[360px] overflow-y-auto", "n3o-entity-container", e), children: /* @__PURE__ */ l.jsx("div", { className: x("flex-1", "n3o-entity-container__content"), children: /* @__PURE__ */ l.jsx("div", { className: x("flex flex-col h-full", "n3o-entity-container__inner"), children: t }) }) });
}
const $l = f.forwardRef(
  ({ className: e, type: t, ...n }, a) => /* @__PURE__ */ l.jsx(
    "input",
    {
      type: t,
      className: x(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        e
      ),
      ref: a,
      ...n
    }
  )
);
$l.displayName = "Input";
const dm = f.createContext({}), Bn = ({
  children: e,
  className: t,
  searchValue: n,
  onSearchChange: a
}) => {
  const [r, o] = f.useState(""), i = f.useMemo(
    () => ({
      searchValue: n !== void 0 ? n : r,
      setSearchValue: a || o
    }),
    [n, a, r]
  );
  return /* @__PURE__ */ l.jsx(dm.Provider, { value: i, children: /* @__PURE__ */ l.jsx("div", { className: x("sticky top-0 bg-background z-10", "n3o-entity-header", t), children: e }) });
};
Bn.Row = function({ children: t, className: n }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("p-4 border-b flex items-center", "n3o-entity-header__row", n), children: t });
};
Bn.BackButton = function({ onClick: t, className: n }) {
  return /* @__PURE__ */ l.jsx(we, { variant: "ghost", size: "icon", onClick: t, className: x("n3o-entity-header__back-button", n), children: /* @__PURE__ */ l.jsx(V0, { className: "h-4 w-4" }) });
};
Bn.Title = function({ children: t, className: n }) {
  return /* @__PURE__ */ l.jsx("h2", { className: x("font-medium text-lg ml-2", "n3o-entity-header__title", n), children: t });
};
Bn.Section = function({ children: t, className: n }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("p-4 border-b", "n3o-entity-header__section", n), children: t });
};
Bn.SearchContainer = function({ children: t, className: n }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("flex items-center gap-3 mb-4", "n3o-entity-header__search-container", n), children: t });
};
Bn.SearchInput = function({
  placeholder: t,
  value: n,
  onChange: a,
  className: r
}) {
  const o = f.useContext(dm), i = n !== void 0 ? n : o.searchValue || "", s = a || (o.setSearchValue ? (c) => o.setSearchValue(c.target.value) : void 0);
  return /* @__PURE__ */ l.jsxs("div", { className: x("relative flex-1", "n3o-entity-header__search-input-container", r), children: [
    /* @__PURE__ */ l.jsx(X0, { className: x("absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500", "n3o-entity-header__search-icon") }),
    /* @__PURE__ */ l.jsx(
      $l,
      {
        placeholder: t,
        className: x("pl-9", "n3o-entity-header__search-input"),
        value: i,
        onChange: s
      }
    )
  ] });
};
Bn.ResetButton = function({ onClick: t, className: n }) {
  return /* @__PURE__ */ l.jsx(
    we,
    {
      variant: "outline",
      size: "sm",
      className: x("text-xs", "n3o-entity-header__reset-button", n),
      onClick: t,
      children: "Reset"
    }
  );
};
const Vx = ({ className: e, children: t }) => /* @__PURE__ */ l.jsx("div", { className: x("flex-1 overflow-y-auto h-full", "n3o-entity-list", e), children: t }), zx = ({ children: e, className: t }) => /* @__PURE__ */ l.jsx("div", { className: x("p-8 text-center text-gray-500", "n3o-entity-list__empty-message", t), children: /* @__PURE__ */ l.jsx("p", { children: e }) }), Cl = ({ className: e, children: t }) => /* @__PURE__ */ l.jsx("div", { className: x("divide-y", "n3o-entity-list__content", e), children: t }), Kx = ({ categories: e, renderCategory: t, className: n }) => /* @__PURE__ */ l.jsx(Cl, { className: n, children: e.map((a) => /* @__PURE__ */ l.jsx(D.Fragment, { children: t(a) }, a.id)) }), Yx = ({ items: e, renderItem: t, className: n }) => /* @__PURE__ */ l.jsx(Cl, { className: n, children: e.map((a) => /* @__PURE__ */ l.jsx(D.Fragment, { children: t(a) }, a.id)) }), Z_ = Object.assign({}, {
  Container: Vx,
  EmptyMessage: zx,
  Content: Cl,
  CategoryList: Kx,
  ItemList: Yx
});
function Zx({ children: e, className: t }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("absolute inset-0 z-50 flex flex-col bg-black/70", t), children: e });
}
const Xx = function({ children: t, className: n }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("sm:mt-48 flex max-w-[920px] min-h-[600px] sm:max-h-[600px] w-full mx-auto", n), children: t });
}, qx = function({ children: t, className: n }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("flex h-auto flex-col justify-end sm:flex-row lg:gap-4 w-full", n), children: t });
}, X_ = Object.assign(Zx, {
  Container: Xx,
  Content: qx
}), $r = ({ isVisible: e, children: t, className: n }) => /* @__PURE__ */ l.jsx(
  "div",
  {
    className: x(
      "hidden sm:flex relative h-full min-w-[360px] min-h-[280px] sm:min-h-[600px] w-full sm:rounded-xl overflow-hidden transition-all ease-in-out duration-500 bg-cover",
      n,
      {
        "hidden opacity-0": !e,
        "bg-background": e
      }
    ),
    children: t
  }
), Jx = ({ children: e, className: t }) => /* @__PURE__ */ l.jsx("div", { className: x("p-4 overflow-y-auto text-sm", t), children: e }), Qx = ({ src: e, alt: t, className: n }) => /* @__PURE__ */ l.jsx("img", { src: e, alt: t, className: x("h-auto w-full object-cover rounded", n) }), ew = ({ children: e, className: t }) => /* @__PURE__ */ l.jsx("h3", { className: x("mb-2 font-bold text-lg sm:text-xl mt-2", t), children: e }), tw = ({ children: e }) => /* @__PURE__ */ l.jsx("p", { className: "text-gray-700 text-xs sm:text-base pb-2", children: e }), nw = ({ children: e }) => /* @__PURE__ */ l.jsx(l.Fragment, { children: e });
$r.Image = Qx;
$r.Title = ew;
$r.Description = tw;
$r.Content = Jx;
$r.ContentHTML = nw;
const aw = {
  manrope: "font-[Manrope]",
  signika: "font-[Signika]",
  lato: "font-[Lato]",
  inter: "font-[Inter]",
  epilogue: "font-[Epilogue]",
  bitter: "font-[Bitter]",
  system: "font-sans"
};
function rw({
  variant: e = "p",
  as: t,
  className: n,
  children: a,
  font: r = "system",
  ...o
}) {
  const s = t || ((d) => {
    switch (d) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        return d;
      case "list":
        return "ul";
      case "inline-code":
        return "code";
      case "lead":
      case "large":
      case "small":
      case "muted":
        return "p";
      case "blockquote":
        return "blockquote";
      case "span":
        return d;
      default:
        return "p";
    }
  })(e), c = {
    h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
    h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
    h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    h4: "scroll-m-20 text-xl font-semibold tracking-tight",
    h5: "scroll-m-20 text-base font-semibold tracking-tight",
    h6: "scroll-m-20 text-base font-semibold tracking-tight",
    p: "leading-7 [&:not(:first-child)]:mt-1.5",
    blockquote: "mt-6 border-l-2 pl-6 italic",
    list: "my-6 ml-6 list-disc [&>li]:mt-2",
    "inline-code": "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
    lead: "text-xl text-muted-foreground",
    large: "text-lg font-semibold",
    small: "text-sm font-medium leading-none",
    muted: "text-sm text-muted-foreground",
    span: "text-sm"
  };
  return D.createElement(
    s,
    {
      className: x(c[e], aw[r], n),
      ...o
    },
    a
  );
}
const Sl = ({ children: e, className: t, key: n, onItemSelected: a }) => /* @__PURE__ */ l.jsx(
  we,
  {
    variant: "secondary",
    onClick: () => a(),
    className: x(
      "gap-2 whitespace-normal flex-1 w-full text-sm",
      "font-medium  flex items-center justify-between",
      "p-4 rounded-lg bg-gray-50 hover:bg-accent/50 ",
      "transition-colors h-auto hover:border border-black",
      t
    ),
    children: e
  },
  n
), ow = ({ src: e, alt: t, className: n, parentClassName: a }) => /* @__PURE__ */ l.jsx(
  "div",
  {
    className: x(
      "h-12 w-12 overflow-hidden rounded-md bg-gray-200",
      a
    ),
    children: /* @__PURE__ */ l.jsx(
      "img",
      {
        src: e,
        alt: t,
        className: x("h-full w-full object-cover", n)
      }
    )
  }
), iw = ({ children: e, className: t }) => /* @__PURE__ */ l.jsx(
  rw,
  {
    variant: "span",
    className: x("flex items-center gap-2", t),
    children: e
  }
), sw = ({ children: e, className: t }) => /* @__PURE__ */ l.jsx("div", { className: x("flex items-center gap-3", t), children: e });
Sl.Image = ow;
Sl.Title = iw;
Sl.Container = sw;
const lw = {
  none: "",
  all: "rounded-2xl",
  top: "rounded-t-2xl",
  bottom: "rounded-b-2xl"
};
function _l({ children: e, className: t, rounded: n = "none" }) {
  return /* @__PURE__ */ l.jsx("div", { className: x(
    "flex items-center gap-3 p-4 bg-gray-100 rounded-xl",
    "n3o-donate-form__header",
    lw[n],
    t
  ), children: e });
}
function cw({ children: e }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("rounded-lg bg-gray-200", "n3o-form-header__icon"), children: e });
}
function dw({
  title: e = "Allocate to",
  description: t = "General Fund"
}) {
  return /* @__PURE__ */ l.jsxs("div", { className: "n3o-form-header__content", children: [
    /* @__PURE__ */ l.jsx("h2", { className: x("font-semibold text-xs tracking-wider uppercase opacity-60", "n3o-form-header__title"), children: e }),
    /* @__PURE__ */ l.jsx("p", { className: "n3o-form-header__description", children: t })
  ] });
}
function uw({
  children: e,
  label: t = "Change",
  onClick: n
}) {
  return /* @__PURE__ */ l.jsx(l.Fragment, { children: e ?? /* @__PURE__ */ l.jsx(
    we,
    {
      variant: "ghost",
      className: x("ml-auto hover:bg-gray-200 text-xs", "n3o-form-header__action"),
      onClick: n,
      children: t
    }
  ) });
}
_l.TitleIcon = cw;
_l.Title = dw;
_l.Action = uw;
const Cr = ({
  value: e = 0,
  onSelect: t,
  isSelected: n,
  className: a,
  selectedClassName: r,
  children: o
}) => t ? /* @__PURE__ */ l.jsx(
  we,
  {
    onClick: () => t?.(e),
    variant: "outline",
    className: x(
      "w-full text-left h-auto p-4 rounded-lg",
      "n3o-info-card",
      n && "n3o-info-card--selected",
      "transition-colors duration-200",
      "border-2",
      "block",
      "hover:bg-gray-50",
      n && ["border-primary", "bg-gray-50", r],
      !n && "border-input",
      a
    ),
    children: /* @__PURE__ */ l.jsx("div", { className: "flex justify-between items-start", children: o })
  }
) : /* @__PURE__ */ l.jsx(
  "div",
  {
    className: x(
      "w-full text-left h-auto p-4 rounded-lg",
      "n3o-info-card",
      n && "n3o-info-card--selected",
      "transition-colors duration-200",
      "border-2",
      "block",
      n && ["border-primary", "bg-gray-50", r],
      !n && "border-input",
      a
    ),
    children: /* @__PURE__ */ l.jsx("div", { className: "flex justify-between items-start", children: o })
  }
);
Cr.Content = ({
  children: e,
  className: t
}) => /* @__PURE__ */ l.jsx("div", { className: x("space-y-1", "n3o-info-card__content", t), children: e });
Cr.Title = ({ children: e, className: t }) => /* @__PURE__ */ l.jsx("h3", { className: x("font-semibold text-foreground", "n3o-info-card__title", t), children: e });
Cr.Description = ({ children: e, className: t }) => /* @__PURE__ */ l.jsx("p", { className: x("text-sm text-muted-foreground", "n3o-info-card__description", t), children: e });
Cr.Amount = ({ children: e, className: t }) => /* @__PURE__ */ l.jsx("span", { className: x("text-2xl font-bold", "n3o-info-card__amount", t), children: e });
Cr.Badge = ({ children: e, className: t }) => /* @__PURE__ */ l.jsx("div", { className: x("n3o-info-card__badge", t), children: e });
const um = Ue(null), fw = () => {
  const e = _e(um);
  if (!e) throw new Error("Must be used inside <DonationDialog>");
  return e;
};
function Qo({
  open: e,
  onOpenChange: t,
  onClose: n,
  children: a,
  className: r,
  container: o = null
}) {
  return /* @__PURE__ */ l.jsx(um.Provider, { value: { onClose: n }, children: /* @__PURE__ */ l.jsxs(om, { open: e, onOpenChange: t, children: [
    /* @__PURE__ */ l.jsx(pl, { className: "fixed inset-0 z-modal-overlay bg-black/50" }),
    /* @__PURE__ */ l.jsx(
      ml,
      {
        container: o,
        className: x(
          "z-modal-content !overflow-y-auto !fixed !top-0 translate-y-0 !p-0 !bg-black/20 border-none !w-full !max-w-[6000px] data-[state=closed]:slide-out-to-top-[0%] data-[state=open]:slide-in-from-bottom-[50%]",
          r
        ),
        style: {
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
          overscrollBehavior: "contain"
        },
        children: a
      }
    )
  ] }) });
}
function pw({ children: e, className: t }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("flex justify-between items-center w-full h-24 p-6 flex-shrink-0", "n3o-modal__header", t), children: e });
}
function mw({ children: e }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("w-[40px] flex items-start", "n3o-modal__logo"), children: /* @__PURE__ */ l.jsx("div", { className: "transform scale-50 sm:scale-100 origin-left", children: e }) });
}
function hw({ children: e }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("flex gap-2", "n3o-modal__header-content"), children: e });
}
function gw({ onClick: e, children: t }) {
  return /* @__PURE__ */ l.jsx(
    we,
    {
      onClick: e,
      variant: "default",
      className: x("flex text-white py-1.5 px-2.5 gap-2 items-center border rounded-full bg-transparent", "n3o-modal__basket"),
      children: t
    }
  );
}
function bw({ count: e, className: t }) {
  return e === 0 ? null : /* @__PURE__ */ l.jsx("span", { className: x("px-2 rounded-full bg-destructive text-white", "n3o-modal__basket-counter", t), children: e });
}
function vw({ children: e, className: t, label: n, disabled: a }) {
  const { onClose: r } = fw();
  return /* @__PURE__ */ l.jsx(
    we,
    {
      onClick: r,
      disabled: a,
      className: x("flex gap-4 text-white items-center rounded-full bg-transparent hover:bg-accent/10", "n3o-modal__close", t),
      children: e || /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
        /* @__PURE__ */ l.jsx("span", { className: "hidden sm:block opacity-50 text-xs", children: n }),
        /* @__PURE__ */ l.jsx(J0, { className: "h-6 w-6" })
      ] })
    }
  );
}
Qo.Header = Object.assign(pw, {
  Logo: mw,
  Basket: gw,
  BasketCounter: bw,
  HeaderContent: hw,
  Close: vw
});
function yw({ children: e, className: t }) {
  return /* @__PURE__ */ l.jsx(
    "div",
    {
      className: x("flex-1 flex-col items-center min-h-screen justify-between max-h-screen", "n3o-modal__container", t),
      children: e
    }
  );
}
function xw({ children: e, className: t }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("flex max-w-[920px] min-h-[600px] w-full mx-auto sm:pt-24", "n3o-modal__content", t), children: /* @__PURE__ */ l.jsx("div", { className: "flex h-auto flex-col sm:flex-row lg:gap-4 w-full", children: e }) });
}
function ww({ children: e, className: t }) {
  return /* @__PURE__ */ l.jsx(
    "div",
    {
      className: x(
        "flex relative h-full min-w-[360px] min-h-[280px] sm:min-h-[600px] w-full sm:rounded-xl overflow-hidden md:brightness-75 hover:brightness-100 transition-all ease-in-out duration-500 bg-cover",
        "n3o-modal__panel",
        t
      ),
      "data-slot": "dialog-panel",
      children: e
    }
  );
}
function $w({ src: e, alt: t }) {
  return /* @__PURE__ */ l.jsx("img", { src: e, alt: t, className: x("h-full w-full object-cover", "n3o-modal__image"), loading: "lazy" });
}
function Cw({ children: e }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("absolute bottom-0 left-0 right-0 sm:rounded sm:bottom-4 sm:left-4 sm:right-4 border-b-4 border-primary bg-white/90 p-6 backdrop-blur-sm", "n3o-modal__panel-content"), children: e });
}
function Sw({ children: e }) {
  return /* @__PURE__ */ l.jsx("h3", { className: x("hidden sm:block mb-2 text-sm font-medium uppercase text-gray-500", "n3o-modal__title"), children: e });
}
function _w({ children: e }) {
  return /* @__PURE__ */ l.jsx("p", { className: x("text-gray-700 text-xs sm:text-base", "n3o-modal__description"), children: e });
}
function Nw({ children: e, className: t }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("flex flex-col bg-background sm:rounded-xl min-w-[360px] min-h-fit", "n3o-modal__body", t), "data-slot": "dialog-body", children: e });
}
Qo.Content = Object.assign(xw, {
  Panel: ww,
  Body: Nw,
  Image: $w,
  PanelContent: Cw,
  Title: Sw,
  Description: _w,
  Container: yw
});
function Ew({ children: e, className: t }) {
  return /* @__PURE__ */ l.jsxs("div", { className: x("flex flex-col items-center justify-center gap-4", "n3o-modal__footer", t), "data-slot": "dialog-footer", children: [
    /* @__PURE__ */ l.jsxs("div", { className: x("flex items-center justify-center w-full p-4 pt-8 gap-2 text-xs text-white text-center opacity-60", "n3o-modal__footer-content"), children: [
      /* @__PURE__ */ l.jsx(q0, { className: "h-4 w-4" }),
      e
    ] }),
    /* @__PURE__ */ l.jsx("div", { className: "h-24 flex-shrink-0" })
  ] });
}
Qo.Footer = Ew;
const q_ = Qo, fm = Ue(null);
function Rw() {
  const e = _e(fm);
  if (!e)
    throw new Error("DonationAmountOptions components must be used within DonationAmountOptions.Root");
  return e;
}
function Pw({ children: e, selected: t, onChange: n, className: a, multiple: r = !1 }) {
  const o = (i) => {
    if (r) {
      const s = Array.isArray(t) ? t : t != null ? [t] : [], c = s.includes(i) ? s.filter((d) => d !== i) : [...s, i];
      n?.(c);
    } else
      n?.(i);
  };
  return /* @__PURE__ */ l.jsx(
    fm.Provider,
    {
      value: {
        selected: t,
        onSelect: o,
        hasDescriptions: !1,
        multiple: r
      },
      children: /* @__PURE__ */ l.jsx("div", { className: x("grid auto-cols-fr gap-2", "n3o-amount__container", a), children: e })
    }
  );
}
function kw({ value: e, label: t, description: n, className: a }) {
  const { selected: r, onSelect: o, hasDescriptions: i, multiple: s } = Rw(), c = s ? Array.isArray(r) && r.includes(e) : r === e;
  return /* @__PURE__ */ l.jsxs(
    we,
    {
      variant: c ? "default" : "outline",
      className: x(
        "flex gap-1 h-fit items-center",
        "n3o-amount__option",
        c && "n3o-amount__option--selected",
        i ? "flex-row justify-start" : "flex-col",
        c ? "" : "border-none outline outline-border -outline-offset-2",
        a
      ),
      onClick: () => o(e),
      children: [
        /* @__PURE__ */ l.jsx("div", { className: x(
          "font-semibold",
          i ? "text-base min-w-12 !text-start" : "text-lg"
        ), children: t }),
        n && /* @__PURE__ */ l.jsx("div", { className: x(
          "text-pretty font-normal text-start text-xs opacity-80",
          i ? "line-clamp-[2] text-[11px] !max-w-[225px]" : ""
        ), children: n })
      ]
    }
  );
}
function Tw({ children: e, className: t, hasDescriptions: n = !1 }) {
  const a = M0.toArray(e).filter(O0), r = a.length;
  if (n)
    return /* @__PURE__ */ l.jsx("div", { className: x("flex flex-col gap-2", t), children: a });
  if (r === 5)
    return /* @__PURE__ */ l.jsxs("div", { className: x("flex flex-col gap-4", t), children: [
      /* @__PURE__ */ l.jsx("div", { className: "grid grid-cols-3 gap-2", children: a.slice(0, 3) }),
      /* @__PURE__ */ l.jsx("div", { className: "grid grid-cols-2 gap-2", children: a.slice(3) })
    ] });
  const o = r === 2 || r === 4 ? "grid-cols-2" : "grid-cols-3";
  let i = (s) => s;
  return r === 1 && (i = (s) => /* @__PURE__ */ l.jsx("div", { className: "col-span-1 col-start-2", children: s })), /* @__PURE__ */ l.jsx("div", { className: x(
    "grid gap-2",
    o,
    t
  ), children: a.map((s) => i(s)) });
}
function Aw({ children: e, className: t }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("flex gap-2", t), children: e });
}
const J_ = {
  Container: Pw,
  Option: kw,
  Grid: Tw,
  Row: Aw
}, Q_ = ({
  value: e,
  options: t,
  containterClassName: n,
  selectedClassName: a = "n3o-donation-frequency-selected",
  onChange: r
}) => /* @__PURE__ */ l.jsx("div", { className: x("flex gap-1 bg-gray-600/10 p-1 rounded-md", "n3o-frequency__container", n), children: t.map((o) => {
  const i = e === o.value;
  return /* @__PURE__ */ l.jsx(
    we,
    {
      className: x(
        "flex-1 shadow-md",
        "n3o-frequency__option",
        i && "n3o-frequency__option--selected",
        i && a
      ),
      variant: i ? "default" : "outline",
      onClick: () => r(o.value),
      children: o.label
    },
    o.value
  );
}) }), pm = Ue(
  void 0
);
function jw({ value: e, onChange: t, children: n, className: a }) {
  return /* @__PURE__ */ l.jsx(pm.Provider, { value: { value: e, onChange: t }, children: /* @__PURE__ */ l.jsx("div", { className: `flex items-center gap-2 n3o-input__root ${a || ""}`, children: n }) });
}
function Jc({ children: e, position: t = "left", className: n }) {
  const a = t === "left" ? "left-3" : "right-3";
  return /* @__PURE__ */ l.jsx(
    "span",
    {
      className: `absolute ${a} top-1/2 -translate-y-1/2 n3o-input__addon ${n || ""}`,
      children: e
    }
  );
}
function Mw({ className: e, ...t }) {
  const n = _e(pm);
  if (!n) throw new Error("CurrencyInput.Input must be used within CurrencyInput.Root");
  return /* @__PURE__ */ l.jsx(
    "input",
    {
      type: "number",
      value: n.value,
      onChange: (a) => n.onChange(parseInt(a.target.value)),
      className: `w-full rounded-md border px-8 py-2 text-xl font-bold n3o-input__field ${e || ""}`,
      ...t
    }
  );
}
function Ow({ children: e, className: t }) {
  return /* @__PURE__ */ l.jsx("div", { className: `relative flex-1 n3o-input__container ${t || ""}`, children: e });
}
const eN = {
  Root: jw,
  Container: Ow,
  Input: Mw,
  LeftAddon: (e) => /* @__PURE__ */ l.jsx(Jc, { ...e, position: "left" }),
  RightAddon: (e) => /* @__PURE__ */ l.jsx(Jc, { ...e, position: "right" })
};
function mm({ className: e, children: t }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("flex h-full flex-col overflow-y-auto", "n3o-donate-form", e), children: t });
}
function Dw({ className: e, children: t }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("flex flex-col gap-4 p-4", "n3o-donate-form__body", e), children: t });
}
function Iw({ className: e, children: t }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("pt-6 p-5", "n3o-donate-form__footer", e), children: t });
}
mm.Body = Dw;
mm.Footer = Iw;
const hm = Ue(null);
function Nl() {
  const e = _e(hm);
  if (!e) throw new Error("CurrencySelector components must be used within <CurrencySelector.Root>");
  return e;
}
function Lw({
  children: e,
  currentCurrency: t,
  currencyOptions: n,
  onCurrencyChange: a,
  showConfirmation: r,
  onShowConfirmationChange: o,
  requireConfirmation: i = !0
}) {
  const [s, c] = je(!1), [d, u] = je(null), p = r ?? s, m = o ?? c, h = _n((v) => {
    v !== t.code && (i ? (u(v), m(!0)) : a(v));
  }, [t.code, m, a, i]), b = _n(() => {
    d && (a(d), u(null), m(!1));
  }, [d, a, m]), g = _n(() => {
    u(null), m(!1);
  }, [m]);
  return /* @__PURE__ */ l.jsx(
    hm.Provider,
    {
      value: {
        currentCurrency: t,
        currencyOptions: n,
        showConfirmation: p,
        setShowConfirmation: m,
        handleCurrencyChange: h,
        handleConfirmCurrencyChange: b,
        handleCancelCurrencyChange: g
      },
      children: e
    }
  );
}
function Fw({ className: e }) {
  const { currentCurrency: t } = Nl(), [n, a] = je(!1);
  return /* @__PURE__ */ l.jsxs(ol, { open: n, onOpenChange: a, children: [
    /* @__PURE__ */ l.jsx(il, { asChild: !0, children: /* @__PURE__ */ l.jsxs(
      we,
      {
        className: Ms(
          "flex text-white py-1.5 px-2.5 gap-0 items-center border rounded-full bg-transparent",
          "n3o-currency-selector__trigger",
          e
        ),
        children: [
          t.symbol,
          " ",
          t.code,
          /* @__PURE__ */ l.jsx(Co, { className: x("ml-1 h-4 w-4", "n3o-currency-selector__chevron") })
        ]
      }
    ) }),
    /* @__PURE__ */ l.jsx(gm, { onClose: () => a(!1) })
  ] });
}
function gm({ onClose: e }) {
  const { currencyOptions: t, handleCurrencyChange: n } = Nl();
  return /* @__PURE__ */ l.jsx(Ho, { sideOffset: 4, className: "n3o-currency-selector__dropdown", children: Object.entries(t).map(([a, { symbol: r, code: o }]) => /* @__PURE__ */ l.jsxs(
    Vo,
    {
      onClick: () => {
        n(a), e();
      },
      className: "n3o-currency-selector__dropdown-item",
      children: [
        r,
        " ",
        o
      ]
    },
    a
  )) });
}
function Bw({
  children: e,
  open: t,
  onOpenChange: n
}) {
  const {
    showConfirmation: a,
    setShowConfirmation: r
  } = Nl(), o = t !== void 0 ? t : a, i = n !== void 0 ? n : r;
  return /* @__PURE__ */ l.jsx(
    om,
    {
      open: o,
      onOpenChange: i,
      children: /* @__PURE__ */ l.jsx(ml, { className: "n3o-currency-selector__confirm-dialog", children: e })
    }
  );
}
const tN = Object.assign(Lw, {
  Trigger: Fw,
  List: gm,
  ConfirmDialog: Bw
}), Uw = Ue(null), Sa = ({
  optionId: e,
  isSelected: t,
  onSelect: n,
  children: a,
  className: r,
  selectedClassName: o = "n3o-price-option-selected"
}) => /* @__PURE__ */ l.jsx(Uw.Provider, { value: { id: e, isSelected: t, onSelect: n }, children: /* @__PURE__ */ l.jsx(
  we,
  {
    onClick: () => n(e),
    variant: "outline",
    className: x(
      "n3o-price-option",
      t && "n3o-price-option--selected",
      "w-full text-left h-auto p-4 rounded-lg",
      "transition-colors duration-200",
      "border-2",
      "block",
      "hover:bg-muted/50",
      t && ["border-primary", "bg-muted/50", o],
      !t && "border-input",
      r
    ),
    children: a
  }
) });
Sa.Content = ({ children: e, className: t }) => /* @__PURE__ */ l.jsx("div", { className: x("n3o-price-option__content", "space-y-2", t), children: e });
Sa.Header = ({ children: e, className: t }) => /* @__PURE__ */ l.jsx("div", { className: x("n3o-price-option__header", "flex items-center justify-between", t), children: e });
Sa.Price = ({ children: e, className: t }) => /* @__PURE__ */ l.jsx("span", { className: x("n3o-price-option__price", "text-xl font-semibold text-foreground", t), children: e });
Sa.Period = ({ children: e, className: t }) => /* @__PURE__ */ l.jsx("span", { className: x("n3o-price-option__period", "text-lg", t), children: e });
Sa.Duration = ({ children: e, className: t }) => /* @__PURE__ */ l.jsx("span", { className: x(
  "n3o-price-option__duration",
  "text-sm font-medium text-muted-foreground",
  "px-2 py-1 rounded",
  "bg-muted",
  t
), children: e });
Sa.Description = ({ children: e, className: t }) => /* @__PURE__ */ l.jsx("p", { className: x("n3o-price-option__description", "text-sm text-muted-foreground", t), children: e });
const bm = D.createContext(void 0);
function ao({
  adminFee: e,
  onAdminFeeChange: t,
  checkboxLabel: n = "Contribute towards admin fee",
  amounts: a,
  selectedAmount: r,
  onAmountChange: o,
  tooltipText: i = "Contributing towards our admin costs can help us to continue providing a high level of service."
}) {
  const [s, c] = je(r || a[0]), d = (u) => {
    c(u), o?.(u);
  };
  return /* @__PURE__ */ l.jsx(bm.Provider, { value: { adminFee: e, onAdminFeeChange: t }, children: /* @__PURE__ */ l.jsxs("div", { className: x("flex items-center justify-between py-3 px-4 border-b border-slate-200 bg-slate-50 rounded-tl-lg rounded-tr-lg", "n3o-admin-fee__container"), children: [
    /* @__PURE__ */ l.jsx(ao.CheckboxLabel, { checkboxLabel: n }),
    /* @__PURE__ */ l.jsxs("div", { className: x("flex items-center gap-2", "n3o-admin-fee__controls"), children: [
      /* @__PURE__ */ l.jsxs(ol, { children: [
        /* @__PURE__ */ l.jsx(il, { asChild: !0, children: /* @__PURE__ */ l.jsxs(
          we,
          {
            variant: "link",
            className: x("gap-1 px-2 underline flex items-center text-sm font-medium", "n3o-admin-fee__amount-selector"),
            onClick: (u) => u.stopPropagation(),
            children: [
              s,
              /* @__PURE__ */ l.jsx(Co, { className: " h-4 w-4" })
            ]
          }
        ) }),
        /* @__PURE__ */ l.jsx(Ho, { onClick: (u) => u.stopPropagation(), className: "n3o-admin-fee__dropdown", children: a.map((u) => /* @__PURE__ */ l.jsx(
          Vo,
          {
            onSelect: () => d(u),
            className: "n3o-admin-fee__dropdown-item",
            children: u
          },
          u
        )) })
      ] }),
      /* @__PURE__ */ l.jsx(ao.InfoButton, { tooltipText: i })
    ] })
  ] }) });
}
function Gw({ checkboxLabel: e }) {
  const t = _e(bm);
  if (!t)
    throw new Error("AdminFeeOption.CheckboxLabel must be used within AdminFeeOption");
  const { adminFee: n, onAdminFeeChange: a } = t;
  return /* @__PURE__ */ l.jsxs("div", { className: x("flex items-center gap-2", "n3o-admin-fee__checkbox-wrapper"), children: [
    /* @__PURE__ */ l.jsx(
      Dn,
      {
        id: "admin-fee",
        checked: n,
        onCheckedChange: (r) => a(r),
        className: x("rounded-sm data-[state=checked]:bg-black data-[state=checked]:border-black", "n3o-admin-fee__checkbox")
      }
    ),
    /* @__PURE__ */ l.jsx(
      "label",
      {
        htmlFor: "admin-fee",
        className: x("text-sm font-medium cursor-pointer flex items-center gap-1", "n3o-admin-fee__label"),
        children: e
      }
    )
  ] });
}
function Ww({ tooltipText: e }) {
  const [t, n] = D.useState(!1);
  return /* @__PURE__ */ l.jsx(uf, { children: /* @__PURE__ */ l.jsxs(ff, { open: t, onOpenChange: n, children: [
    /* @__PURE__ */ l.jsx(pf, { asChild: !0, children: /* @__PURE__ */ l.jsx(
      we,
      {
        variant: "ghost",
        size: "icon",
        className: x("h-6 w-6 rounded-full border", "n3o-admin-fee__info-button"),
        onClick: (a) => {
          a.stopPropagation(), n(!t);
        },
        children: "?"
      }
    ) }),
    /* @__PURE__ */ l.jsx(
      Zs,
      {
        className: x("max-w-[240px] text-wrap", "n3o-admin-fee__tooltip"),
        sideOffset: 5,
        children: /* @__PURE__ */ l.jsx("p", { className: x("text-sm", "n3o-admin-fee__tooltip-text"), children: e })
      }
    )
  ] }) });
}
ao.CheckboxLabel = Gw;
ao.InfoButton = Ww;
var El = "Radio", [Hw, vm] = Fe(El), [Vw, zw] = Hw(El), ym = f.forwardRef(
  (e, t) => {
    const {
      __scopeRadio: n,
      name: a,
      checked: r = !1,
      required: o,
      disabled: i,
      value: s = "on",
      onCheck: c,
      form: d,
      ...u
    } = e, [p, m] = f.useState(null), h = le(t, (v) => m(v)), b = f.useRef(!1), g = p ? d || !!p.closest("form") : !0;
    return /* @__PURE__ */ l.jsxs(Vw, { scope: n, checked: r, disabled: i, children: [
      /* @__PURE__ */ l.jsx(
        Y.button,
        {
          type: "button",
          role: "radio",
          "aria-checked": r,
          "data-state": Cm(r),
          "data-disabled": i ? "" : void 0,
          disabled: i,
          value: s,
          ...u,
          ref: h,
          onClick: U(e.onClick, (v) => {
            r || c?.(), g && (b.current = v.isPropagationStopped(), b.current || v.stopPropagation());
          })
        }
      ),
      g && /* @__PURE__ */ l.jsx(
        $m,
        {
          control: p,
          bubbles: !b.current,
          name: a,
          value: s,
          checked: r,
          required: o,
          disabled: i,
          form: d,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
ym.displayName = El;
var xm = "RadioIndicator", wm = f.forwardRef(
  (e, t) => {
    const { __scopeRadio: n, forceMount: a, ...r } = e, o = zw(xm, n);
    return /* @__PURE__ */ l.jsx(Ge, { present: a || o.checked, children: /* @__PURE__ */ l.jsx(
      Y.span,
      {
        "data-state": Cm(o.checked),
        "data-disabled": o.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    ) });
  }
);
wm.displayName = xm;
var Kw = "RadioBubbleInput", $m = f.forwardRef(
  ({
    __scopeRadio: e,
    control: t,
    checked: n,
    bubbles: a = !0,
    ...r
  }, o) => {
    const i = f.useRef(null), s = le(i, o), c = So(n), d = _o(t);
    return f.useEffect(() => {
      const u = i.current;
      if (!u) return;
      const p = window.HTMLInputElement.prototype, h = Object.getOwnPropertyDescriptor(
        p,
        "checked"
      ).set;
      if (c !== n && h) {
        const b = new Event("click", { bubbles: a });
        h.call(u, n), u.dispatchEvent(b);
      }
    }, [c, n, a]), /* @__PURE__ */ l.jsx(
      Y.input,
      {
        type: "radio",
        "aria-hidden": !0,
        defaultChecked: n,
        ...r,
        tabIndex: -1,
        ref: s,
        style: {
          ...r.style,
          ...d,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
$m.displayName = Kw;
function Cm(e) {
  return e ? "checked" : "unchecked";
}
var Yw = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], ei = "RadioGroup", [Zw, nN] = Fe(ei, [
  mn,
  vm
]), Sm = mn(), _m = vm(), [Xw, qw] = Zw(ei), Nm = f.forwardRef(
  (e, t) => {
    const {
      __scopeRadioGroup: n,
      name: a,
      defaultValue: r,
      value: o,
      required: i = !1,
      disabled: s = !1,
      orientation: c,
      dir: d,
      loop: u = !0,
      onValueChange: p,
      ...m
    } = e, h = Sm(n), b = In(d), [g, v] = Ke({
      prop: o,
      defaultProp: r ?? null,
      onChange: p,
      caller: ei
    });
    return /* @__PURE__ */ l.jsx(
      Xw,
      {
        scope: n,
        name: a,
        required: i,
        disabled: s,
        value: g,
        onValueChange: v,
        children: /* @__PURE__ */ l.jsx(
          Lo,
          {
            asChild: !0,
            ...h,
            orientation: c,
            dir: b,
            loop: u,
            children: /* @__PURE__ */ l.jsx(
              Y.div,
              {
                role: "radiogroup",
                "aria-required": i,
                "aria-orientation": c,
                "data-disabled": s ? "" : void 0,
                dir: b,
                ...m,
                ref: t
              }
            )
          }
        )
      }
    );
  }
);
Nm.displayName = ei;
var Em = "RadioGroupItem", Rm = f.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: n, disabled: a, ...r } = e, o = qw(Em, n), i = o.disabled || a, s = Sm(n), c = _m(n), d = f.useRef(null), u = le(t, d), p = o.value === r.value, m = f.useRef(!1);
    return f.useEffect(() => {
      const h = (g) => {
        Yw.includes(g.key) && (m.current = !0);
      }, b = () => m.current = !1;
      return document.addEventListener("keydown", h), document.addEventListener("keyup", b), () => {
        document.removeEventListener("keydown", h), document.removeEventListener("keyup", b);
      };
    }, []), /* @__PURE__ */ l.jsx(
      Fo,
      {
        asChild: !0,
        ...s,
        focusable: !i,
        active: p,
        children: /* @__PURE__ */ l.jsx(
          ym,
          {
            disabled: i,
            required: o.required,
            checked: p,
            ...c,
            ...r,
            name: o.name,
            ref: u,
            onCheck: () => o.onValueChange(r.value),
            onKeyDown: U((h) => {
              h.key === "Enter" && h.preventDefault();
            }),
            onFocus: U(r.onFocus, () => {
              m.current && d.current?.click();
            })
          }
        )
      }
    );
  }
);
Rm.displayName = Em;
var Jw = "RadioGroupIndicator", Pm = f.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: n, ...a } = e, r = _m(n);
    return /* @__PURE__ */ l.jsx(wm, { ...r, ...a, ref: t });
  }
);
Pm.displayName = Jw;
var km = Nm, Tm = Rm, Qw = Pm;
const Am = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  km,
  {
    className: x("grid gap-2", e),
    ...t,
    ref: n
  }
));
Am.displayName = km.displayName;
const jm = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  Tm,
  {
    ref: n,
    className: x(
      "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      e
    ),
    ...t,
    children: /* @__PURE__ */ l.jsx(Qw, { className: "flex items-center justify-center", children: /* @__PURE__ */ l.jsx(Eo, { className: "h-3.5 w-3.5 fill-primary" }) })
  }
));
jm.displayName = Tm.displayName;
const cs = /* @__PURE__ */ new Set(), ze = /* @__PURE__ */ new WeakMap(), kn = /* @__PURE__ */ new WeakMap(), Vt = /* @__PURE__ */ new WeakMap(), za = /* @__PURE__ */ new WeakMap(), ki = /* @__PURE__ */ new WeakMap(), ds = /* @__PURE__ */ new WeakMap(), Nn = /* @__PURE__ */ new WeakMap(), sa = /* @__PURE__ */ new WeakMap(), qn = /* @__PURE__ */ new WeakSet();
let dn, Rl = 0, Pl = 0;
const Ut = "__aa_tgt", Ka = "__aa_del", ro = "__aa_new", Mm = (e) => {
  const t = r$(e);
  t && t.forEach((n) => o$(n));
}, e$ = (e) => {
  e.forEach((t) => {
    t.target === dn && n$(), ze.has(t.target) && Un(t.target);
  });
};
function t$(e) {
  const t = za.get(e);
  t?.disconnect();
  let n = ze.get(e), a = 0;
  const r = 5;
  n || (n = la(e), ze.set(e, n));
  const { offsetWidth: o, offsetHeight: i } = dn, c = [
    n.top - r,
    o - (n.left + r + n.width),
    i - (n.top + r + n.height),
    n.left - r
  ].map((u) => `${-1 * Math.floor(u)}px`).join(" "), d = new IntersectionObserver(() => {
    ++a > 1 && Un(e);
  }, {
    root: dn,
    threshold: 1,
    rootMargin: c
  });
  d.observe(e), za.set(e, d);
}
function Un(e) {
  clearTimeout(sa.get(e));
  const t = ti(e), n = Ya(t) ? 500 : t.duration;
  sa.set(e, setTimeout(async () => {
    const a = Vt.get(e);
    try {
      await a?.finished, ze.set(e, la(e)), t$(e);
    } catch {
    }
  }, n));
}
function n$() {
  clearTimeout(sa.get(dn)), sa.set(dn, setTimeout(() => {
    cs.forEach((e) => us(e, (t) => Om(() => Un(t))));
  }, 100));
}
function a$(e) {
  setTimeout(() => {
    ds.set(e, setInterval(() => Om(Un.bind(null, e)), 2e3));
  }, Math.round(2e3 * Math.random()));
}
function Om(e) {
  typeof requestIdleCallback == "function" ? requestIdleCallback(() => e()) : requestAnimationFrame(() => e());
}
let Ft;
const Dm = typeof window < "u" && "ResizeObserver" in window;
Dm && (dn = document.documentElement, new MutationObserver(Mm), Ft = new ResizeObserver(e$), window.addEventListener("scroll", () => {
  Pl = window.scrollY, Rl = window.scrollX;
}), Ft.observe(dn));
function r$(e) {
  return e.reduce((a, r) => [
    ...a,
    ...Array.from(r.addedNodes),
    ...Array.from(r.removedNodes)
  ], []).every((a) => a.nodeName === "#comment") ? !1 : e.reduce((a, r) => {
    if (a === !1)
      return !1;
    if (r.target instanceof Element) {
      if (Ti(r.target), !a.has(r.target)) {
        a.add(r.target);
        for (let o = 0; o < r.target.children.length; o++) {
          const i = r.target.children.item(o);
          if (i) {
            if (Ka in i)
              return !1;
            Ti(r.target, i), a.add(i);
          }
        }
      }
      if (r.removedNodes.length)
        for (let o = 0; o < r.removedNodes.length; o++) {
          const i = r.removedNodes[o];
          if (Ka in i)
            return !1;
          i instanceof Element && (a.add(i), Ti(r.target, i), kn.set(i, [
            r.previousSibling,
            r.nextSibling
          ]));
        }
    }
    return a;
  }, /* @__PURE__ */ new Set());
}
function Ti(e, t) {
  !t && !(Ut in e) ? Object.defineProperty(e, Ut, { value: e }) : t && !(Ut in t) && Object.defineProperty(t, Ut, { value: e });
}
function o$(e) {
  var t;
  const n = e.isConnected, a = ze.has(e);
  n && kn.has(e) && kn.delete(e), Vt.has(e) && ((t = Vt.get(e)) === null || t === void 0 || t.cancel()), ro in e ? Qc(e) : a && n ? s$(e) : a && !n ? l$(e) : Qc(e);
}
function _t(e) {
  return Number(e.replace(/[^0-9.\-]/g, ""));
}
function i$(e) {
  let t = e.parentElement;
  for (; t; ) {
    if (t.scrollLeft || t.scrollTop)
      return { x: t.scrollLeft, y: t.scrollTop };
    t = t.parentElement;
  }
  return { x: 0, y: 0 };
}
function la(e) {
  const t = e.getBoundingClientRect(), { x: n, y: a } = i$(e);
  return {
    top: t.top + a,
    left: t.left + n,
    width: t.width,
    height: t.height
  };
}
function Im(e, t, n) {
  let a = t.width, r = t.height, o = n.width, i = n.height;
  const s = getComputedStyle(e);
  if (s.getPropertyValue("box-sizing") === "content-box") {
    const d = _t(s.paddingTop) + _t(s.paddingBottom) + _t(s.borderTopWidth) + _t(s.borderBottomWidth), u = _t(s.paddingLeft) + _t(s.paddingRight) + _t(s.borderRightWidth) + _t(s.borderLeftWidth);
    a -= u, o -= u, r -= d, i -= d;
  }
  return [a, o, r, i].map(Math.round);
}
function ti(e) {
  return Ut in e && Nn.has(e[Ut]) ? Nn.get(e[Ut]) : { duration: 250, easing: "ease-in-out" };
}
function Lm(e) {
  if (Ut in e)
    return e[Ut];
}
function kl(e) {
  const t = Lm(e);
  return t ? qn.has(t) : !1;
}
function us(e, ...t) {
  t.forEach((n) => n(e, Nn.has(e)));
  for (let n = 0; n < e.children.length; n++) {
    const a = e.children.item(n);
    a && t.forEach((r) => r(a, Nn.has(a)));
  }
}
function Tl(e) {
  return Array.isArray(e) ? e : [e];
}
function Ya(e) {
  return typeof e == "function";
}
function s$(e) {
  const t = ze.get(e), n = la(e);
  if (!kl(e))
    return ze.set(e, n);
  let a;
  if (!t)
    return;
  const r = ti(e);
  if (typeof r != "function") {
    const o = t.left - n.left, i = t.top - n.top, [s, c, d, u] = Im(e, t, n), p = {
      transform: `translate(${o}px, ${i}px)`
    }, m = {
      transform: "translate(0, 0)"
    };
    s !== c && (p.width = `${s}px`, m.width = `${c}px`), d !== u && (p.height = `${d}px`, m.height = `${u}px`), a = e.animate([p, m], {
      duration: r.duration,
      easing: r.easing
    });
  } else {
    const [o] = Tl(r(e, "remain", t, n));
    a = new Animation(o), a.play();
  }
  Vt.set(e, a), ze.set(e, n), a.addEventListener("finish", () => Un(e), { once: !0 });
}
function Qc(e) {
  ro in e && delete e[ro];
  const t = la(e);
  ze.set(e, t);
  const n = ti(e);
  if (!kl(e))
    return;
  let a;
  if (typeof n != "function")
    a = e.animate([
      { transform: "scale(.98)", opacity: 0 },
      { transform: "scale(0.98)", opacity: 0, offset: 0.5 },
      { transform: "scale(1)", opacity: 1 }
    ], {
      duration: n.duration * 1.5,
      easing: "ease-in"
    });
  else {
    const [r] = Tl(n(e, "add", t));
    a = new Animation(r), a.play();
  }
  Vt.set(e, a), a.addEventListener("finish", () => Un(e), { once: !0 });
}
function ed(e, t) {
  var n;
  e.remove(), ze.delete(e), kn.delete(e), Vt.delete(e), (n = za.get(e)) === null || n === void 0 || n.disconnect(), setTimeout(() => {
    if (Ka in e && delete e[Ka], Object.defineProperty(e, ro, { value: !0, configurable: !0 }), t && e instanceof HTMLElement)
      for (const a in t)
        e.style[a] = "";
  }, 0);
}
function l$(e) {
  var t;
  if (!kn.has(e) || !ze.has(e))
    return;
  const [n, a] = kn.get(e);
  Object.defineProperty(e, Ka, { value: !0, configurable: !0 });
  const r = window.scrollX, o = window.scrollY;
  if (a && a.parentNode && a.parentNode instanceof Element ? a.parentNode.insertBefore(e, a) : n && n.parentNode ? n.parentNode.appendChild(e) : (t = Lm(e)) === null || t === void 0 || t.appendChild(e), !kl(e))
    return ed(e);
  const [i, s, c, d] = d$(e), u = ti(e), p = ze.get(e);
  (r !== Rl || o !== Pl) && c$(e, r, o, u);
  let m, h = {
    position: "absolute",
    top: `${i}px`,
    left: `${s}px`,
    width: `${c}px`,
    height: `${d}px`,
    margin: "0",
    pointerEvents: "none",
    transformOrigin: "center",
    zIndex: "100"
  };
  if (!Ya(u))
    Object.assign(e.style, h), m = e.animate([
      {
        transform: "scale(1)",
        opacity: 1
      },
      {
        transform: "scale(.98)",
        opacity: 0
      }
    ], {
      duration: u.duration,
      easing: "ease-out"
    });
  else {
    const [b, g] = Tl(u(e, "remove", p));
    g?.styleReset !== !1 && (h = g?.styleReset || h, Object.assign(e.style, h)), m = new Animation(b), m.play();
  }
  Vt.set(e, m), m.addEventListener("finish", () => ed(e, h), {
    once: !0
  });
}
function c$(e, t, n, a) {
  const r = Rl - t, o = Pl - n, i = document.documentElement.style.scrollBehavior;
  if (getComputedStyle(dn).scrollBehavior === "smooth" && (document.documentElement.style.scrollBehavior = "auto"), window.scrollTo(window.scrollX + r, window.scrollY + o), !e.parentElement)
    return;
  const c = e.parentElement;
  let d = c.clientHeight, u = c.clientWidth;
  const p = performance.now();
  function m() {
    requestAnimationFrame(() => {
      if (!Ya(a)) {
        const h = d - c.clientHeight, b = u - c.clientWidth;
        p + a.duration > performance.now() ? (window.scrollTo({
          left: window.scrollX - b,
          top: window.scrollY - h
        }), d = c.clientHeight, u = c.clientWidth, m()) : document.documentElement.style.scrollBehavior = i;
      }
    });
  }
  m();
}
function d$(e) {
  const t = ze.get(e), [n, , a] = Im(e, t, la(e));
  let r = e.parentElement;
  for (; r && (getComputedStyle(r).position === "static" || r instanceof HTMLBodyElement); )
    r = r.parentElement;
  r || (r = document.body);
  const o = getComputedStyle(r), i = ze.get(r) || la(r), s = Math.round(t.top - i.top) - _t(o.borderTopWidth), c = Math.round(t.left - i.left) - _t(o.borderLeftWidth);
  return [s, c, n, a];
}
function u$(e, t = {}) {
  if (Dm && Ft && !(window.matchMedia("(prefers-reduced-motion: reduce)").matches && !Ya(t) && !t.disrespectUserMotionPreference)) {
    qn.add(e), getComputedStyle(e).position === "static" && Object.assign(e.style, { position: "relative" }), us(e, Un, a$, (i) => Ft?.observe(i)), Ya(t) ? Nn.set(e, t) : Nn.set(e, {
      duration: 250,
      easing: "ease-in-out",
      ...t
    });
    const o = new MutationObserver(Mm);
    o.observe(e, { childList: !0 }), ki.set(e, o), cs.add(e);
  }
  return Object.freeze({
    parent: e,
    enable: () => {
      qn.add(e);
    },
    disable: () => {
      qn.delete(e);
    },
    isEnabled: () => qn.has(e),
    destroy: () => {
      qn.delete(e), cs.delete(e), Nn.delete(e);
      const a = ki.get(e);
      a?.disconnect(), ki.delete(e), us(e, (r) => {
        Ft?.unobserve(r);
        const o = Vt.get(r);
        try {
          o?.cancel();
        } catch {
        }
        Vt.delete(r);
        const i = za.get(r);
        i?.disconnect(), za.delete(r);
        const s = ds.get(r);
        s && clearInterval(s), ds.delete(r);
        const c = sa.get(r);
        c && clearTimeout(c), sa.delete(r), ze.delete(r), kn.delete(r);
      });
    }
  });
}
function Fm(e) {
  const [t, n] = je(), a = wo(() => e, []), r = _n((i) => {
    i instanceof HTMLElement ? n(u$(i, a)) : n(void 0);
  }, [a]), o = _n((i) => {
    t && (i ? t.enable() : t.disable());
  }, [t]);
  return At(() => () => {
    var i;
    (i = t?.destroy) === null || i === void 0 || i.call(t);
  }, [t]), [r, o];
}
const Al = Ue(void 0);
function ca({ children: e, className: t = "", ...n }) {
  const [a] = Fm();
  return /* @__PURE__ */ l.jsx(Al.Provider, { value: n, children: /* @__PURE__ */ l.jsx(
    "div",
    {
      className: x(
        "flex flex-col gap-3 rounded-lg bg-accent/50 p-4",
        "n3o-gift-aid",
        n.isOrganization ? "opacity-75" : "",
        t
      ),
      ref: a,
      children: e
    }
  ) });
}
function f$({ children: e }) {
  return /* @__PURE__ */ l.jsx("p", { className: x("text-sm text-gray-600", "n3o-gift-aid__organization-message"), children: e });
}
function p$({ children: e }) {
  const t = _e(Al);
  if (!t) throw new Error("GiftAid.Options must be used within GiftAidRoot");
  return /* @__PURE__ */ l.jsx(
    Am,
    {
      value: t.giftAidOption,
      onValueChange: t.onGiftAidOptionChange,
      className: x("space-y-2", "n3o-gift-aid__options"),
      children: e
    }
  );
}
function m$({ value: e, children: t, icon: n }) {
  return /* @__PURE__ */ l.jsxs("div", { className: x("flex items-start gap-3", "n3o-gift-aid__option"), children: [
    /* @__PURE__ */ l.jsx(jm, { value: e, id: e, className: x("mt-1", "n3o-gift-aid__radio") }),
    /* @__PURE__ */ l.jsxs("div", { className: x("flex flex-1 items-center justify-between relative pr-24", "n3o-gift-aid__option-content"), children: [
      /* @__PURE__ */ l.jsx(wl, { htmlFor: e, className: x("text-sm", "n3o-gift-aid__option-label"), children: t }),
      n
    ] })
  ] });
}
function h$({ children: e }) {
  const t = _e(Al);
  if (!t) throw new Error("BoostMessage must be used within GiftAidRoot");
  return t.giftAidOption === "boost" ? /* @__PURE__ */ l.jsx("div", { className: x("mt-3 text-sm text-gray-700", "n3o-gift-aid__boost-message"), children: e }) : null;
}
ca.Root = ca;
ca.OrganizationMessage = f$;
ca.Options = p$;
ca.Option = m$;
ca.BoostMessage = h$;
function jl({ children: e }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("space-y-4 rounded-lg bg-accent/50 p-4", "n3o-contact-preference"), children: e });
}
function g$({ children: e }) {
  return /* @__PURE__ */ l.jsx("p", { className: x("text-sm font-medium text-gray-600 mb-4", "n3o-contact-preference__message"), children: e });
}
function b$({ children: e }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("flex items-center space-x-6", "n3o-contact-preference__options-group"), children: e });
}
function v$({ id: e, label: t, checked: n, onChange: a }) {
  return /* @__PURE__ */ l.jsxs("div", { className: x("flex items-center space-x-2", "n3o-contact-preference__option"), children: [
    /* @__PURE__ */ l.jsx(Dn, { id: e, checked: n, onCheckedChange: (r) => a?.(e, r), className: "n3o-contact-preference__checkbox" }),
    /* @__PURE__ */ l.jsx(
      "label",
      {
        htmlFor: e,
        className: x("text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", "n3o-contact-preference__label"),
        children: t
      }
    )
  ] });
}
jl.Message = g$;
jl.OptionsGroup = b$;
jl.Option = v$;
function Bm({ children: e }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("space-y-4 bg-slate-100 p-4 rounded-bl-lg rounded-br-lg", "n3o-donation-summary"), children: /* @__PURE__ */ l.jsx("div", { className: x("flex justify-between items-center", "n3o-donation-summary__content"), children: e }) });
}
function y$({ children: e }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("text-sm text-slate-400", "n3o-donation-summary__title"), children: e });
}
function x$({ value: e, additional: t = "", frequency: n = "/month" }) {
  const a = t !== "" ? `${e} + ${t}` : e;
  return /* @__PURE__ */ l.jsxs("div", { className: x("text-base", "n3o-donation-summary__amount"), children: [
    /* @__PURE__ */ l.jsx("span", { className: x("font-semibold text-xl", "n3o-donation-summary__amount-value"), children: a }),
    /* @__PURE__ */ l.jsx("span", { className: x("text-xs", "n3o-donation-summary__amount-frequency"), children: n })
  ] });
}
Bm.Title = y$;
Bm.Amount = x$;
function Ml({ children: e }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("space-y-4 border rounded-lg p-4", "n3o-donation-item"), children: e });
}
function w$({ title: e }) {
  return /* @__PURE__ */ l.jsx("h3", { className: x("text-xs font-semibold text-muted-foreground", "n3o-donation-item__header"), children: e });
}
function $$({ name: e, description: t, amount: n, children: a }) {
  return /* @__PURE__ */ l.jsxs("div", { className: x("rounded-lg bg-slate-50 p-3", "n3o-donation-item__content"), children: [
    /* @__PURE__ */ l.jsxs("div", { className: x("flex justify-between items-start", "n3o-donation-item__content-inner"), children: [
      /* @__PURE__ */ l.jsxs("div", { className: x("space-y-1", "n3o-donation-item__details"), children: [
        /* @__PURE__ */ l.jsx("h4", { className: x("text-base font-semibold", "n3o-donation-item__name"), children: e }),
        /* @__PURE__ */ l.jsx("p", { className: x("text-xs text-muted-foreground", "n3o-donation-item__description"), children: t })
      ] }),
      /* @__PURE__ */ l.jsx("div", { className: x("font-semibold", "n3o-donation-item__amount"), children: n })
    ] }),
    a || null
  ] });
}
function C$({ onRemove: e }) {
  return /* @__PURE__ */ l.jsx(
    we,
    {
      variant: "link",
      className: x("mt-2 h-auto p-0 text-xs text-muted-foreground hover:underline", "n3o-donation-item__remove-button"),
      onClick: e,
      children: "REMOVE"
    }
  );
}
Ml.Header = w$;
Ml.Content = $$;
Ml.Footer = C$;
function Gn({ children: e }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("border rounded-lg p-4", "n3o-donation-summary-card"), children: e });
}
function S$({ children: e }) {
  return /* @__PURE__ */ l.jsx("h3", { className: x("text-sm font-semibold uppercase tracking-wide mb-2", "n3o-donation-summary-card__title"), children: e });
}
function _$({ children: e }) {
  return /* @__PURE__ */ l.jsx("p", { className: x("text-sm text-muted-foreground", "n3o-donation-summary-card__description"), children: e });
}
function N$({ value: e, frequency: t }) {
  return /* @__PURE__ */ l.jsxs("span", { className: x("text-xl font-semibold", "n3o-donation-summary-card__amount"), children: [
    e,
    t
  ] });
}
function E$({ children: e }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("flex items-center justify-between bg-accent/50 p-4 rounded-md", "n3o-donation-summary-card__content"), children: e });
}
function R$({ children: e }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("flex items-center justify-between bg-accent/50 p-4 rounded-md", "n3o-donation-summary-card__content-container"), children: e });
}
function P$({ children: e }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("border-t border-orange-100 bg-orange-50 p-4", "n3o-donation-summary-card__warning"), children: e });
}
function k$({ children: e }) {
  return /* @__PURE__ */ l.jsx("p", { className: x("text-sm text-orange-800", "n3o-donation-summary-card__warning-line"), children: e });
}
Gn.Title = S$;
Gn.Description = _$;
Gn.Amount = N$;
Gn.Content = E$;
Gn.ContentContainer = R$;
Gn.ContentWarning = P$;
Gn.WarningLine = k$;
function fs(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
var T$ = [" ", "Enter", "ArrowUp", "ArrowDown"], A$ = [" ", "Enter"], Tn = "Select", [ni, ai, j$] = Xs(Tn), [_a, aN] = Fe(Tn, [
  j$,
  pn
]), ri = pn(), [M$, gn] = _a(Tn), [O$, D$] = _a(Tn), Um = (e) => {
  const {
    __scopeSelect: t,
    children: n,
    open: a,
    defaultOpen: r,
    onOpenChange: o,
    value: i,
    defaultValue: s,
    onValueChange: c,
    dir: d,
    name: u,
    autoComplete: p,
    disabled: m,
    required: h,
    form: b
  } = e, g = ri(t), [v, y] = f.useState(null), [w, $] = f.useState(null), [C, R] = f.useState(!1), k = In(d), [S, j] = Ke({
    prop: a,
    defaultProp: r ?? !1,
    onChange: o,
    caller: Tn
  }), [P, B] = Ke({
    prop: i,
    defaultProp: s,
    onChange: c,
    caller: Tn
  }), z = f.useRef(null), L = v ? b || !!v.closest("form") : !0, [T, K] = f.useState(/* @__PURE__ */ new Set()), Q = Array.from(T).map((V) => V.props.value).join(";");
  return /* @__PURE__ */ l.jsx(dr, { ...g, children: /* @__PURE__ */ l.jsxs(
    M$,
    {
      required: h,
      scope: t,
      trigger: v,
      onTriggerChange: y,
      valueNode: w,
      onValueNodeChange: $,
      valueNodeHasChildren: C,
      onValueNodeHasChildrenChange: R,
      contentId: Me(),
      value: P,
      onValueChange: B,
      open: S,
      onOpenChange: j,
      dir: k,
      triggerPointerDownPosRef: z,
      disabled: m,
      children: [
        /* @__PURE__ */ l.jsx(ni.Provider, { scope: t, children: /* @__PURE__ */ l.jsx(
          O$,
          {
            scope: e.__scopeSelect,
            onNativeOptionAdd: f.useCallback((V) => {
              K((A) => new Set(A).add(V));
            }, []),
            onNativeOptionRemove: f.useCallback((V) => {
              K((A) => {
                const E = new Set(A);
                return E.delete(V), E;
              });
            }, []),
            children: n
          }
        ) }),
        L ? /* @__PURE__ */ l.jsxs(
          dh,
          {
            "aria-hidden": !0,
            required: h,
            tabIndex: -1,
            name: u,
            autoComplete: p,
            value: P,
            onChange: (V) => B(V.target.value),
            disabled: m,
            form: b,
            children: [
              P === void 0 ? /* @__PURE__ */ l.jsx("option", { value: "" }) : null,
              Array.from(T)
            ]
          },
          Q
        ) : null
      ]
    }
  ) });
};
Um.displayName = Tn;
var Gm = "SelectTrigger", Wm = f.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, disabled: a = !1, ...r } = e, o = ri(n), i = gn(Gm, n), s = i.disabled || a, c = le(t, i.onTriggerChange), d = ai(n), u = f.useRef("touch"), [p, m, h] = fh((g) => {
      const v = d().filter(($) => !$.disabled), y = v.find(($) => $.value === i.value), w = ph(v, g, y);
      w !== void 0 && i.onValueChange(w.value);
    }), b = (g) => {
      s || (i.onOpenChange(!0), h()), g && (i.triggerPointerDownPosRef.current = {
        x: Math.round(g.pageX),
        y: Math.round(g.pageY)
      });
    };
    return /* @__PURE__ */ l.jsx(ur, { asChild: !0, ...o, children: /* @__PURE__ */ l.jsx(
      Y.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": i.contentId,
        "aria-expanded": i.open,
        "aria-required": i.required,
        "aria-autocomplete": "none",
        dir: i.dir,
        "data-state": i.open ? "open" : "closed",
        disabled: s,
        "data-disabled": s ? "" : void 0,
        "data-placeholder": uh(i.value) ? "" : void 0,
        ...r,
        ref: c,
        onClick: U(r.onClick, (g) => {
          g.currentTarget.focus(), u.current !== "mouse" && b(g);
        }),
        onPointerDown: U(r.onPointerDown, (g) => {
          u.current = g.pointerType;
          const v = g.target;
          v.hasPointerCapture(g.pointerId) && v.releasePointerCapture(g.pointerId), g.button === 0 && g.ctrlKey === !1 && g.pointerType === "mouse" && (b(g), g.preventDefault());
        }),
        onKeyDown: U(r.onKeyDown, (g) => {
          const v = p.current !== "";
          !(g.ctrlKey || g.altKey || g.metaKey) && g.key.length === 1 && m(g.key), !(v && g.key === " ") && T$.includes(g.key) && (b(), g.preventDefault());
        })
      }
    ) });
  }
);
Wm.displayName = Gm;
var Hm = "SelectValue", Vm = f.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: a, style: r, children: o, placeholder: i = "", ...s } = e, c = gn(Hm, n), { onValueNodeHasChildrenChange: d } = c, u = o !== void 0, p = le(t, c.onValueNodeChange);
    return Oe(() => {
      d(u);
    }, [d, u]), /* @__PURE__ */ l.jsx(
      Y.span,
      {
        ...s,
        ref: p,
        style: { pointerEvents: "none" },
        children: uh(c.value) ? /* @__PURE__ */ l.jsx(l.Fragment, { children: i }) : o
      }
    );
  }
);
Vm.displayName = Hm;
var I$ = "SelectIcon", zm = f.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, children: a, ...r } = e;
    return /* @__PURE__ */ l.jsx(Y.span, { "aria-hidden": !0, ...r, ref: t, children: a || "▼" });
  }
);
zm.displayName = I$;
var An = "SelectContent", Km = f.forwardRef(
  (e, t) => {
    const n = gn(An, e.__scopeSelect), [a, r] = f.useState();
    if (Oe(() => {
      r(new DocumentFragment());
    }, []), !n.open) {
      const o = a;
      return o ? $o.createPortal(
        /* @__PURE__ */ l.jsx(Ym, { scope: e.__scopeSelect, children: /* @__PURE__ */ l.jsx(ni.Slot, { scope: e.__scopeSelect, children: /* @__PURE__ */ l.jsx("div", { children: e.children }) }) }),
        o
      ) : null;
    }
    return /* @__PURE__ */ l.jsx(Zm, { ...e, ref: t });
  }
);
Km.displayName = An;
var pt = 10, [Ym, bn] = _a(An), L$ = "SelectContentImpl", F$ = /* @__PURE__ */ on("SelectContent.RemoveScroll"), Zm = f.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      position: a = "item-aligned",
      onCloseAutoFocus: r,
      onEscapeKeyDown: o,
      onPointerDownOutside: i,
      //
      // PopperContent props
      side: s,
      sideOffset: c,
      align: d,
      alignOffset: u,
      arrowPadding: p,
      collisionBoundary: m,
      collisionPadding: h,
      sticky: b,
      hideWhenDetached: g,
      avoidCollisions: v,
      //
      ...y
    } = e, w = gn(An, n), [$, C] = f.useState(null), [R, k] = f.useState(null), S = le(t, (M) => C(M)), [j, P] = f.useState(null), [B, z] = f.useState(
      null
    ), L = ai(n), [T, K] = f.useState(!1), Q = f.useRef(!1);
    f.useEffect(() => {
      if ($) return Bo($);
    }, [$]), Io();
    const V = f.useCallback(
      (M) => {
        const [q, ...oe] = L().map((ye) => ye.ref.current), [ce] = oe.slice(-1), fe = document.activeElement;
        for (const ye of M)
          if (ye === fe || (ye?.scrollIntoView({ block: "nearest" }), ye === q && R && (R.scrollTop = 0), ye === ce && R && (R.scrollTop = R.scrollHeight), ye?.focus(), document.activeElement !== fe)) return;
      },
      [L, R]
    ), A = f.useCallback(
      () => V([j, $]),
      [V, j, $]
    );
    f.useEffect(() => {
      T && A();
    }, [T, A]);
    const { onOpenChange: E, triggerPointerDownPosRef: O } = w;
    f.useEffect(() => {
      if ($) {
        let M = { x: 0, y: 0 };
        const q = (ce) => {
          M = {
            x: Math.abs(Math.round(ce.pageX) - (O.current?.x ?? 0)),
            y: Math.abs(Math.round(ce.pageY) - (O.current?.y ?? 0))
          };
        }, oe = (ce) => {
          M.x <= 10 && M.y <= 10 ? ce.preventDefault() : $.contains(ce.target) || E(!1), document.removeEventListener("pointermove", q), O.current = null;
        };
        return O.current !== null && (document.addEventListener("pointermove", q), document.addEventListener("pointerup", oe, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", q), document.removeEventListener("pointerup", oe, { capture: !0 });
        };
      }
    }, [$, E, O]), f.useEffect(() => {
      const M = () => E(!1);
      return window.addEventListener("blur", M), window.addEventListener("resize", M), () => {
        window.removeEventListener("blur", M), window.removeEventListener("resize", M);
      };
    }, [E]);
    const [N, H] = fh((M) => {
      const q = L().filter((fe) => !fe.disabled), oe = q.find((fe) => fe.ref.current === document.activeElement), ce = ph(q, M, oe);
      ce && setTimeout(() => ce.ref.current.focus());
    }), _ = f.useCallback(
      (M, q, oe) => {
        const ce = !Q.current && !oe;
        (w.value !== void 0 && w.value === q || ce) && (P(M), ce && (Q.current = !0));
      },
      [w.value]
    ), G = f.useCallback(() => $?.focus(), [$]), X = f.useCallback(
      (M, q, oe) => {
        const ce = !Q.current && !oe;
        (w.value !== void 0 && w.value === q || ce) && z(M);
      },
      [w.value]
    ), W = a === "popper" ? ps : Xm, te = W === ps ? {
      side: s,
      sideOffset: c,
      align: d,
      alignOffset: u,
      arrowPadding: p,
      collisionBoundary: m,
      collisionPadding: h,
      sticky: b,
      hideWhenDetached: g,
      avoidCollisions: v
    } : {};
    return /* @__PURE__ */ l.jsx(
      Ym,
      {
        scope: n,
        content: $,
        viewport: R,
        onViewportChange: k,
        itemRefCallback: _,
        selectedItem: j,
        onItemLeave: G,
        itemTextRefCallback: X,
        focusSelectedItem: A,
        selectedItemText: B,
        position: a,
        isPositioned: T,
        searchRef: N,
        children: /* @__PURE__ */ l.jsx(mr, { as: F$, allowPinchZoom: !0, children: /* @__PURE__ */ l.jsx(
          fr,
          {
            asChild: !0,
            trapped: w.open,
            onMountAutoFocus: (M) => {
              M.preventDefault();
            },
            onUnmountAutoFocus: U(r, (M) => {
              w.trigger?.focus({ preventScroll: !0 }), M.preventDefault();
            }),
            children: /* @__PURE__ */ l.jsx(
              va,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: o,
                onPointerDownOutside: i,
                onFocusOutside: (M) => M.preventDefault(),
                onDismiss: () => w.onOpenChange(!1),
                children: /* @__PURE__ */ l.jsx(
                  W,
                  {
                    role: "listbox",
                    id: w.contentId,
                    "data-state": w.open ? "open" : "closed",
                    dir: w.dir,
                    onContextMenu: (M) => M.preventDefault(),
                    ...y,
                    ...te,
                    onPlaced: () => K(!0),
                    ref: S,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...y.style
                    },
                    onKeyDown: U(y.onKeyDown, (M) => {
                      const q = M.ctrlKey || M.altKey || M.metaKey;
                      if (M.key === "Tab" && M.preventDefault(), !q && M.key.length === 1 && H(M.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(M.key)) {
                        let ce = L().filter((fe) => !fe.disabled).map((fe) => fe.ref.current);
                        if (["ArrowUp", "End"].includes(M.key) && (ce = ce.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(M.key)) {
                          const fe = M.target, ye = ce.indexOf(fe);
                          ce = ce.slice(ye + 1);
                        }
                        setTimeout(() => V(ce)), M.preventDefault();
                      }
                    })
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }
);
Zm.displayName = L$;
var B$ = "SelectItemAlignedPosition", Xm = f.forwardRef((e, t) => {
  const { __scopeSelect: n, onPlaced: a, ...r } = e, o = gn(An, n), i = bn(An, n), [s, c] = f.useState(null), [d, u] = f.useState(null), p = le(t, (S) => u(S)), m = ai(n), h = f.useRef(!1), b = f.useRef(!0), { viewport: g, selectedItem: v, selectedItemText: y, focusSelectedItem: w } = i, $ = f.useCallback(() => {
    if (o.trigger && o.valueNode && s && d && g && v && y) {
      const S = o.trigger.getBoundingClientRect(), j = d.getBoundingClientRect(), P = o.valueNode.getBoundingClientRect(), B = y.getBoundingClientRect();
      if (o.dir !== "rtl") {
        const fe = B.left - j.left, ye = P.left - fe, Be = S.left - ye, I = S.width + Be, re = Math.max(I, j.width), Re = window.innerWidth - pt, ke = fs(ye, [
          pt,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(pt, Re - re)
        ]);
        s.style.minWidth = I + "px", s.style.left = ke + "px";
      } else {
        const fe = j.right - B.right, ye = window.innerWidth - P.right - fe, Be = window.innerWidth - S.right - ye, I = S.width + Be, re = Math.max(I, j.width), Re = window.innerWidth - pt, ke = fs(ye, [
          pt,
          Math.max(pt, Re - re)
        ]);
        s.style.minWidth = I + "px", s.style.right = ke + "px";
      }
      const z = m(), L = window.innerHeight - pt * 2, T = g.scrollHeight, K = window.getComputedStyle(d), Q = parseInt(K.borderTopWidth, 10), V = parseInt(K.paddingTop, 10), A = parseInt(K.borderBottomWidth, 10), E = parseInt(K.paddingBottom, 10), O = Q + V + T + E + A, N = Math.min(v.offsetHeight * 5, O), H = window.getComputedStyle(g), _ = parseInt(H.paddingTop, 10), G = parseInt(H.paddingBottom, 10), X = S.top + S.height / 2 - pt, W = L - X, te = v.offsetHeight / 2, M = v.offsetTop + te, q = Q + V + M, oe = O - q;
      if (q <= X) {
        const fe = z.length > 0 && v === z[z.length - 1].ref.current;
        s.style.bottom = "0px";
        const ye = d.clientHeight - g.offsetTop - g.offsetHeight, Be = Math.max(
          W,
          te + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (fe ? G : 0) + ye + A
        ), I = q + Be;
        s.style.height = I + "px";
      } else {
        const fe = z.length > 0 && v === z[0].ref.current;
        s.style.top = "0px";
        const Be = Math.max(
          X,
          Q + g.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (fe ? _ : 0) + te
        ) + oe;
        s.style.height = Be + "px", g.scrollTop = q - X + g.offsetTop;
      }
      s.style.margin = `${pt}px 0`, s.style.minHeight = N + "px", s.style.maxHeight = L + "px", a?.(), requestAnimationFrame(() => h.current = !0);
    }
  }, [
    m,
    o.trigger,
    o.valueNode,
    s,
    d,
    g,
    v,
    y,
    o.dir,
    a
  ]);
  Oe(() => $(), [$]);
  const [C, R] = f.useState();
  Oe(() => {
    d && R(window.getComputedStyle(d).zIndex);
  }, [d]);
  const k = f.useCallback(
    (S) => {
      S && b.current === !0 && ($(), w?.(), b.current = !1);
    },
    [$, w]
  );
  return /* @__PURE__ */ l.jsx(
    G$,
    {
      scope: n,
      contentWrapper: s,
      shouldExpandOnScrollRef: h,
      onScrollButtonChange: k,
      children: /* @__PURE__ */ l.jsx(
        "div",
        {
          ref: c,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: C
          },
          children: /* @__PURE__ */ l.jsx(
            Y.div,
            {
              ...r,
              ref: p,
              style: {
                // When we get the height of the content, it includes borders. If we were to set
                // the height without having `boxSizing: 'border-box'` it would be too big.
                boxSizing: "border-box",
                // We need to ensure the content doesn't get taller than the wrapper
                maxHeight: "100%",
                ...r.style
              }
            }
          )
        }
      )
    }
  );
});
Xm.displayName = B$;
var U$ = "SelectPopperPosition", ps = f.forwardRef((e, t) => {
  const {
    __scopeSelect: n,
    align: a = "start",
    collisionPadding: r = pt,
    ...o
  } = e, i = ri(n);
  return /* @__PURE__ */ l.jsx(
    Ao,
    {
      ...i,
      ...o,
      ref: t,
      align: a,
      collisionPadding: r,
      style: {
        // Ensure border-box for floating-ui calculations
        boxSizing: "border-box",
        ...o.style,
        "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-select-content-available-width": "var(--radix-popper-available-width)",
        "--radix-select-content-available-height": "var(--radix-popper-available-height)",
        "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
});
ps.displayName = U$;
var [G$, Ol] = _a(An, {}), ms = "SelectViewport", qm = f.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, nonce: a, ...r } = e, o = bn(ms, n), i = Ol(ms, n), s = le(t, o.onViewportChange), c = f.useRef(0);
    return /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: a
        }
      ),
      /* @__PURE__ */ l.jsx(ni.Slot, { scope: n, children: /* @__PURE__ */ l.jsx(
        Y.div,
        {
          "data-radix-select-viewport": "",
          role: "presentation",
          ...r,
          ref: s,
          style: {
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: "relative",
            flex: 1,
            // Viewport should only be scrollable in the vertical direction.
            // This won't work in vertical writing modes, so we'll need to
            // revisit this if/when that is supported
            // https://developer.chrome.com/blog/vertical-form-controls
            overflow: "hidden auto",
            ...r.style
          },
          onScroll: U(r.onScroll, (d) => {
            const u = d.currentTarget, { contentWrapper: p, shouldExpandOnScrollRef: m } = i;
            if (m?.current && p) {
              const h = Math.abs(c.current - u.scrollTop);
              if (h > 0) {
                const b = window.innerHeight - pt * 2, g = parseFloat(p.style.minHeight), v = parseFloat(p.style.height), y = Math.max(g, v);
                if (y < b) {
                  const w = y + h, $ = Math.min(b, w), C = w - $;
                  p.style.height = $ + "px", p.style.bottom === "0px" && (u.scrollTop = C > 0 ? C : 0, p.style.justifyContent = "flex-end");
                }
              }
            }
            c.current = u.scrollTop;
          })
        }
      ) })
    ] });
  }
);
qm.displayName = ms;
var Jm = "SelectGroup", [W$, H$] = _a(Jm), V$ = f.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...a } = e, r = Me();
    return /* @__PURE__ */ l.jsx(W$, { scope: n, id: r, children: /* @__PURE__ */ l.jsx(Y.div, { role: "group", "aria-labelledby": r, ...a, ref: t }) });
  }
);
V$.displayName = Jm;
var Qm = "SelectLabel", eh = f.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...a } = e, r = H$(Qm, n);
    return /* @__PURE__ */ l.jsx(Y.div, { id: r.id, ...a, ref: t });
  }
);
eh.displayName = Qm;
var oo = "SelectItem", [z$, th] = _a(oo), nh = f.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      value: a,
      disabled: r = !1,
      textValue: o,
      ...i
    } = e, s = gn(oo, n), c = bn(oo, n), d = s.value === a, [u, p] = f.useState(o ?? ""), [m, h] = f.useState(!1), b = le(
      t,
      (w) => c.itemRefCallback?.(w, a, r)
    ), g = Me(), v = f.useRef("touch"), y = () => {
      r || (s.onValueChange(a), s.onOpenChange(!1));
    };
    if (a === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return /* @__PURE__ */ l.jsx(
      z$,
      {
        scope: n,
        value: a,
        disabled: r,
        textId: g,
        isSelected: d,
        onItemTextChange: f.useCallback((w) => {
          p(($) => $ || (w?.textContent ?? "").trim());
        }, []),
        children: /* @__PURE__ */ l.jsx(
          ni.ItemSlot,
          {
            scope: n,
            value: a,
            disabled: r,
            textValue: u,
            children: /* @__PURE__ */ l.jsx(
              Y.div,
              {
                role: "option",
                "aria-labelledby": g,
                "data-highlighted": m ? "" : void 0,
                "aria-selected": d && m,
                "data-state": d ? "checked" : "unchecked",
                "aria-disabled": r || void 0,
                "data-disabled": r ? "" : void 0,
                tabIndex: r ? void 0 : -1,
                ...i,
                ref: b,
                onFocus: U(i.onFocus, () => h(!0)),
                onBlur: U(i.onBlur, () => h(!1)),
                onClick: U(i.onClick, () => {
                  v.current !== "mouse" && y();
                }),
                onPointerUp: U(i.onPointerUp, () => {
                  v.current === "mouse" && y();
                }),
                onPointerDown: U(i.onPointerDown, (w) => {
                  v.current = w.pointerType;
                }),
                onPointerMove: U(i.onPointerMove, (w) => {
                  v.current = w.pointerType, r ? c.onItemLeave?.() : v.current === "mouse" && w.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: U(i.onPointerLeave, (w) => {
                  w.currentTarget === document.activeElement && c.onItemLeave?.();
                }),
                onKeyDown: U(i.onKeyDown, (w) => {
                  c.searchRef?.current !== "" && w.key === " " || (A$.includes(w.key) && y(), w.key === " " && w.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }
);
nh.displayName = oo;
var La = "SelectItemText", ah = f.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: a, style: r, ...o } = e, i = gn(La, n), s = bn(La, n), c = th(La, n), d = D$(La, n), [u, p] = f.useState(null), m = le(
      t,
      (y) => p(y),
      c.onItemTextChange,
      (y) => s.itemTextRefCallback?.(y, c.value, c.disabled)
    ), h = u?.textContent, b = f.useMemo(
      () => /* @__PURE__ */ l.jsx("option", { value: c.value, disabled: c.disabled, children: h }, c.value),
      [c.disabled, c.value, h]
    ), { onNativeOptionAdd: g, onNativeOptionRemove: v } = d;
    return Oe(() => (g(b), () => v(b)), [g, v, b]), /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(Y.span, { id: c.textId, ...o, ref: m }),
      c.isSelected && i.valueNode && !i.valueNodeHasChildren ? $o.createPortal(o.children, i.valueNode) : null
    ] });
  }
);
ah.displayName = La;
var rh = "SelectItemIndicator", oh = f.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...a } = e;
    return th(rh, n).isSelected ? /* @__PURE__ */ l.jsx(Y.span, { "aria-hidden": !0, ...a, ref: t }) : null;
  }
);
oh.displayName = rh;
var hs = "SelectScrollUpButton", ih = f.forwardRef((e, t) => {
  const n = bn(hs, e.__scopeSelect), a = Ol(hs, e.__scopeSelect), [r, o] = f.useState(!1), i = le(t, a.onScrollButtonChange);
  return Oe(() => {
    if (n.viewport && n.isPositioned) {
      let s = function() {
        const d = c.scrollTop > 0;
        o(d);
      };
      const c = n.viewport;
      return s(), c.addEventListener("scroll", s), () => c.removeEventListener("scroll", s);
    }
  }, [n.viewport, n.isPositioned]), r ? /* @__PURE__ */ l.jsx(
    lh,
    {
      ...e,
      ref: i,
      onAutoScroll: () => {
        const { viewport: s, selectedItem: c } = n;
        s && c && (s.scrollTop = s.scrollTop - c.offsetHeight);
      }
    }
  ) : null;
});
ih.displayName = hs;
var gs = "SelectScrollDownButton", sh = f.forwardRef((e, t) => {
  const n = bn(gs, e.__scopeSelect), a = Ol(gs, e.__scopeSelect), [r, o] = f.useState(!1), i = le(t, a.onScrollButtonChange);
  return Oe(() => {
    if (n.viewport && n.isPositioned) {
      let s = function() {
        const d = c.scrollHeight - c.clientHeight, u = Math.ceil(c.scrollTop) < d;
        o(u);
      };
      const c = n.viewport;
      return s(), c.addEventListener("scroll", s), () => c.removeEventListener("scroll", s);
    }
  }, [n.viewport, n.isPositioned]), r ? /* @__PURE__ */ l.jsx(
    lh,
    {
      ...e,
      ref: i,
      onAutoScroll: () => {
        const { viewport: s, selectedItem: c } = n;
        s && c && (s.scrollTop = s.scrollTop + c.offsetHeight);
      }
    }
  ) : null;
});
sh.displayName = gs;
var lh = f.forwardRef((e, t) => {
  const { __scopeSelect: n, onAutoScroll: a, ...r } = e, o = bn("SelectScrollButton", n), i = f.useRef(null), s = ai(n), c = f.useCallback(() => {
    i.current !== null && (window.clearInterval(i.current), i.current = null);
  }, []);
  return f.useEffect(() => () => c(), [c]), Oe(() => {
    s().find((u) => u.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
  }, [s]), /* @__PURE__ */ l.jsx(
    Y.div,
    {
      "aria-hidden": !0,
      ...r,
      ref: t,
      style: { flexShrink: 0, ...r.style },
      onPointerDown: U(r.onPointerDown, () => {
        i.current === null && (i.current = window.setInterval(a, 50));
      }),
      onPointerMove: U(r.onPointerMove, () => {
        o.onItemLeave?.(), i.current === null && (i.current = window.setInterval(a, 50));
      }),
      onPointerLeave: U(r.onPointerLeave, () => {
        c();
      })
    }
  );
}), K$ = "SelectSeparator", ch = f.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...a } = e;
    return /* @__PURE__ */ l.jsx(Y.div, { "aria-hidden": !0, ...a, ref: t });
  }
);
ch.displayName = K$;
var bs = "SelectArrow", Y$ = f.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...a } = e, r = ri(n), o = gn(bs, n), i = bn(bs, n);
    return o.open && i.position === "popper" ? /* @__PURE__ */ l.jsx(jo, { ...r, ...a, ref: t }) : null;
  }
);
Y$.displayName = bs;
var Z$ = "SelectBubbleInput", dh = f.forwardRef(
  ({ __scopeSelect: e, value: t, ...n }, a) => {
    const r = f.useRef(null), o = le(a, r), i = So(t);
    return f.useEffect(() => {
      const s = r.current;
      if (!s) return;
      const c = window.HTMLSelectElement.prototype, u = Object.getOwnPropertyDescriptor(
        c,
        "value"
      ).set;
      if (i !== t && u) {
        const p = new Event("change", { bubbles: !0 });
        u.call(s, t), s.dispatchEvent(p);
      }
    }, [i, t]), /* @__PURE__ */ l.jsx(
      Y.select,
      {
        ...n,
        style: { ...ef, ...n.style },
        ref: o,
        defaultValue: t
      }
    );
  }
);
dh.displayName = Z$;
function uh(e) {
  return e === "" || e === void 0;
}
function fh(e) {
  const t = Le(e), n = f.useRef(""), a = f.useRef(0), r = f.useCallback(
    (i) => {
      const s = n.current + i;
      t(s), (function c(d) {
        n.current = d, window.clearTimeout(a.current), d !== "" && (a.current = window.setTimeout(() => c(""), 1e3));
      })(s);
    },
    [t]
  ), o = f.useCallback(() => {
    n.current = "", window.clearTimeout(a.current);
  }, []);
  return f.useEffect(() => () => window.clearTimeout(a.current), []), [n, r, o];
}
function ph(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((d) => d === t[0]) ? t[0] : t, o = n ? e.indexOf(n) : -1;
  let i = X$(e, Math.max(o, 0));
  r.length === 1 && (i = i.filter((d) => d !== n));
  const c = i.find(
    (d) => d.textValue.toLowerCase().startsWith(r.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function X$(e, t) {
  return e.map((n, a) => e[(t + a) % e.length]);
}
var q$ = Um, mh = Wm, J$ = Vm, Q$ = zm, hh = Km, e4 = qm, gh = eh, bh = nh, t4 = ah, n4 = oh, vh = ih, yh = sh, xh = ch;
const a4 = q$, r4 = J$, wh = f.forwardRef(({ className: e, children: t, ...n }, a) => /* @__PURE__ */ l.jsxs(
  mh,
  {
    ref: a,
    className: x(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      e
    ),
    ...n,
    children: [
      t,
      /* @__PURE__ */ l.jsx(Q$, { asChild: !0, children: /* @__PURE__ */ l.jsx(qb, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
wh.displayName = mh.displayName;
const $h = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  vh,
  {
    ref: n,
    className: x(
      "flex cursor-default items-center justify-center py-1",
      e
    ),
    ...t,
    children: /* @__PURE__ */ l.jsx(o1, {})
  }
));
$h.displayName = vh.displayName;
const Ch = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  yh,
  {
    ref: n,
    className: x(
      "flex cursor-default items-center justify-center py-1",
      e
    ),
    ...t,
    children: /* @__PURE__ */ l.jsx(e1, {})
  }
));
Ch.displayName = yh.displayName;
const Sh = f.forwardRef(({ className: e, children: t, position: n = "popper", ...a }, r) => /* @__PURE__ */ l.jsx(l.Fragment, { children: /* @__PURE__ */ l.jsxs(
  hh,
  {
    ref: r,
    className: x(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      n === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      e
    ),
    position: n,
    ...a,
    children: [
      /* @__PURE__ */ l.jsx($h, {}),
      /* @__PURE__ */ l.jsx(
        e4,
        {
          className: x(
            "p-1",
            n === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ l.jsx(Ch, {})
    ]
  }
) }));
Sh.displayName = hh.displayName;
const o4 = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  gh,
  {
    ref: n,
    className: x("px-2 py-1.5 text-sm font-semibold", e),
    ...t
  }
));
o4.displayName = gh.displayName;
const _h = f.forwardRef(({ className: e, children: t, ...n }, a) => /* @__PURE__ */ l.jsxs(
  bh,
  {
    ref: a,
    className: x(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ l.jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ l.jsx(n4, { children: /* @__PURE__ */ l.jsx(Eo, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ l.jsx(t4, { children: t })
    ]
  }
));
_h.displayName = bh.displayName;
const i4 = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  xh,
  {
    ref: n,
    className: x("-mx-1 my-1 h-px bg-muted", e),
    ...t
  }
));
i4.displayName = xh.displayName;
const oi = Ue(
  void 0
);
function Sr({ children: e, initialState: t, onChange: n }) {
  const [a, r] = je(t || { isChecked: !1 }), [o] = Fm(), i = _n((c, d) => {
    const u = { ...a, [c]: d };
    r(u), n?.(u);
  }, [n, a]), s = wo(
    () => ({
      isChecked: a.isChecked,
      setValue: i
    }),
    [a.isChecked, i]
  );
  return /* @__PURE__ */ l.jsx(oi.Provider, { value: s, children: /* @__PURE__ */ l.jsx("div", { className: x("bg-accent/50 rounded-lg p-4 space-y-4 overflow-hidden", "n3o-organization-donation"), ref: o, children: e }) });
}
function s4() {
  const e = _e(oi);
  if (!e)
    throw new Error("OrganizationDonationOption.Checkbox must be used within OrganizationDonationOption");
  const { isChecked: t, setValue: n } = e;
  return /* @__PURE__ */ l.jsx(
    Dn,
    {
      id: "organization",
      checked: t,
      onCheckedChange: () => n("isChecked", !t),
      className: "n3o-organization-donation__checkbox"
    }
  );
}
function l4({ children: e }) {
  return /* @__PURE__ */ l.jsx(
    "label",
    {
      htmlFor: "organization",
      className: x("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", "n3o-organization-donation__label"),
      children: e
    }
  );
}
function c4({ children: e }) {
  const { isChecked: t } = _e(oi) || {};
  return t ? /* @__PURE__ */ l.jsx("div", { className: x("space-y-4", "n3o-organization-donation__details"), children: e }) : null;
}
function d4({ id: e, label: t, placeholder: n, value: a, ...r }) {
  const { setValue: o } = Nh(), i = (s) => {
    o(e, s.target.value);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: x("space-y-1.5 mx-6", "n3o-organization-donation__input-field"), children: [
    /* @__PURE__ */ l.jsx("label", { htmlFor: e, className: x("text-sm text-gray-600", "n3o-organization-donation__input-label"), children: t }),
    /* @__PURE__ */ l.jsx($l, { id: e, placeholder: n, defaultValue: a, onChange: i, ...r, className: x("bg-white", "n3o-organization-donation__input") })
  ] });
}
function u4({ id: e, label: t, options: n, placeholder: a, value: r, onChange: o }) {
  const { setValue: i } = Nh(), s = (c) => {
    i(e, c), o?.(c);
  };
  return /* @__PURE__ */ l.jsxs("div", { className: x("space-y-1.5 mx-6", "n3o-organization-donation__select-field"), children: [
    /* @__PURE__ */ l.jsx("label", { htmlFor: e, className: x("text-sm text-gray-600", "n3o-organization-donation__select-label"), children: t }),
    /* @__PURE__ */ l.jsxs(a4, { defaultValue: r, onValueChange: s, children: [
      /* @__PURE__ */ l.jsx(wh, { id: e, className: x("bg-white", "n3o-organization-donation__select-trigger"), children: /* @__PURE__ */ l.jsx(r4, { placeholder: a }) }),
      /* @__PURE__ */ l.jsx(Sh, { className: "n3o-organization-donation__select-content", children: n.map((c) => /* @__PURE__ */ l.jsx(_h, { value: c.value, className: "n3o-organization-donation__select-item", children: c.label }, c.value)) })
    ] })
  ] });
}
function Nh() {
  const e = _e(oi);
  if (!e)
    throw new Error("useOrganizationDonationOption must be used within OrganizationDonationOption");
  return e;
}
Sr.Checkbox = s4;
Sr.Label = l4;
Sr.Details = c4;
Sr.Input = d4;
Sr.Select = u4;
function Eh({ children: e }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("pt-6 space-y-3", "n3o-payment-options"), children: e });
}
function f4({
  children: e,
  icon: t,
  bgColor: n = "bg-white",
  textColor: a = "text-black",
  hoverColor: r = "hover:bg-gray-50",
  onClick: o
}) {
  return /* @__PURE__ */ l.jsxs(
    we,
    {
      className: x(`w-full ${n} ${a} border ${r} h-12 flex items-center justify-center`, "n3o-payment-options__button"),
      onClick: o,
      children: [
        t && /* @__PURE__ */ l.jsx("span", { className: x("mr-2", "n3o-payment-options__button-icon"), children: t }),
        e
      ]
    }
  );
}
function p4() {
  return /* @__PURE__ */ l.jsx("div", { className: x("my-2 border-t border-gray-200", "n3o-payment-options__divider") });
}
Eh.Button = f4;
Eh.Divider = p4;
const Dl = D.createContext(void 0);
function jn({
  items: e,
  initialSelectedIds: t = [],
  onSelectionChange: n
}) {
  const [a, r] = je(t), o = (i, s) => {
    const c = s ? [...a, i] : a.filter((d) => d !== i);
    r(c), n?.(c);
  };
  return /* @__PURE__ */ l.jsx(Dl.Provider, { value: { selectedIds: a, handleSelect: o }, children: /* @__PURE__ */ l.jsx("div", { className: x("space-y-4", "n3o-upsell-donation-list"), children: e.map((i) => /* @__PURE__ */ l.jsx(jn.Item, { item: i }, i.id)) }) });
}
function m4({ item: e }) {
  const t = D.useContext(Dl);
  if (!t)
    throw new Error("UpsellDonationList.Item must be used within UpsellDonationList");
  const { selectedIds: n, handleSelect: a } = t, r = n.includes(e.id);
  return /* @__PURE__ */ l.jsxs(
    "div",
    {
      onClick: () => a(e.id, !r),
      className: x(
        "flex items-center gap-3 rounded-lg bg-gray-50 p-4 cursor-pointer select-none",
        "n3o-upsell-donation-list__item",
        r ? "n3o-upsell-donation-list__item--selected" : "",
        r ? "border border-primary" : "border border-transparent"
      ),
      children: [
        /* @__PURE__ */ l.jsx(
          Dn,
          {
            checked: r,
            onCheckedChange: (o) => a(e.id, o),
            onClick: (o) => o.stopPropagation(),
            className: x("self-center", "n3o-upsell-donation-list__checkbox")
          }
        ),
        e.imageSrc && /* @__PURE__ */ l.jsx(jn.Image, { src: e.imageSrc, alt: e.name }),
        /* @__PURE__ */ l.jsx(
          jn.Content,
          {
            name: e.name,
            amount: e.amount,
            description: e.description,
            isSelected: r
          }
        )
      ]
    }
  );
}
function h4({ itemId: e }) {
  const t = D.useContext(Dl);
  if (!t)
    throw new Error("UpsellDonationList.Checkbox must be used within UpsellDonationList");
  const { selectedIds: n, handleSelect: a } = t;
  return /* @__PURE__ */ l.jsx(
    Dn,
    {
      checked: n.includes(e),
      onCheckedChange: (r) => a(e, r),
      className: x("self-center", "n3o-upsell-donation-list__checkbox")
    }
  );
}
function g4({ src: e, alt: t }) {
  return /* @__PURE__ */ l.jsx("div", { className: x("h-12 w-12 overflow-hidden rounded-md bg-gray-200", "n3o-upsell-donation-list__image-container"), children: /* @__PURE__ */ l.jsx("img", { src: e, alt: t, className: x("h-full w-full object-cover", "n3o-upsell-donation-list__image") }) });
}
function b4({ name: e, amount: t, description: n, isSelected: a }) {
  return /* @__PURE__ */ l.jsxs("div", { className: x("flex flex-1 items-center justify-between", "n3o-upsell-donation-list__content"), children: [
    /* @__PURE__ */ l.jsxs("div", { className: x("flex-1", "n3o-upsell-donation-list__content-details"), children: [
      /* @__PURE__ */ l.jsx("h4", { className: x("font-medium", "n3o-upsell-donation-list__content-name"), children: e }),
      /* @__PURE__ */ l.jsx("p", { className: x("text-sm text-gray-600", "n3o-upsell-donation-list__content-description"), children: n })
    ] }),
    /* @__PURE__ */ l.jsx("p", { className: x("font-semibold", "n3o-upsell-donation-list__content-amount", a ? "" : "opacity-40"), children: t })
  ] });
}
jn.Item = m4;
jn.Checkbox = h4;
jn.Image = g4;
jn.Content = b4;
const rN = Yo, oN = ul, iN = Xo, v4 = Zo, Rh = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  wa,
  {
    className: x(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      e
    ),
    ...t,
    ref: n
  }
));
Rh.displayName = wa.displayName;
const y4 = sr(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
), x4 = f.forwardRef(({ side: e = "right", className: t, children: n, ...a }, r) => /* @__PURE__ */ l.jsxs(v4, { children: [
  /* @__PURE__ */ l.jsx(Rh, {}),
  /* @__PURE__ */ l.jsx(
    $a,
    {
      ref: r,
      className: x(y4({ side: e }), t),
      ...a,
      children: n
    }
  )
] }));
x4.displayName = $a.displayName;
const w4 = ({
  className: e,
  ...t
}) => /* @__PURE__ */ l.jsx(
  "div",
  {
    className: x(
      "flex flex-col space-y-2 text-center sm:text-left",
      e
    ),
    ...t
  }
);
w4.displayName = "SheetHeader";
const $4 = ({
  className: e,
  ...t
}) => /* @__PURE__ */ l.jsx(
  "div",
  {
    className: x(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      e
    ),
    ...t
  }
);
$4.displayName = "SheetFooter";
const C4 = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  yr,
  {
    ref: n,
    className: x("text-lg font-semibold text-foreground", e),
    ...t
  }
));
C4.displayName = yr.displayName;
const S4 = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  xr,
  {
    ref: n,
    className: x("text-sm text-muted-foreground", e),
    ...t
  }
));
S4.displayName = xr.displayName;
var _4 = Object.defineProperty, N4 = Object.defineProperties, E4 = Object.getOwnPropertyDescriptors, io = Object.getOwnPropertySymbols, Ph = Object.prototype.hasOwnProperty, kh = Object.prototype.propertyIsEnumerable, td = (e, t, n) => t in e ? _4(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, R4 = (e, t) => {
  for (var n in t || (t = {})) Ph.call(t, n) && td(e, n, t[n]);
  if (io) for (var n of io(t)) kh.call(t, n) && td(e, n, t[n]);
  return e;
}, P4 = (e, t) => N4(e, E4(t)), k4 = (e, t) => {
  var n = {};
  for (var a in e) Ph.call(e, a) && t.indexOf(a) < 0 && (n[a] = e[a]);
  if (e != null && io) for (var a of io(e)) t.indexOf(a) < 0 && kh.call(e, a) && (n[a] = e[a]);
  return n;
};
function T4(e) {
  let t = setTimeout(e, 0), n = setTimeout(e, 10), a = setTimeout(e, 50);
  return [t, n, a];
}
function A4(e) {
  let t = f.useRef();
  return f.useEffect(() => {
    t.current = e;
  }), t.current;
}
var j4 = 18, Th = 40, M4 = `${Th}px`, O4 = ["[data-lastpass-icon-root]", "com-1password-button", "[data-dashlanecreated]", '[style$="2147483647 !important;"]'].join(",");
function D4({ containerRef: e, inputRef: t, pushPasswordManagerStrategy: n, isFocused: a }) {
  let [r, o] = f.useState(!1), [i, s] = f.useState(!1), [c, d] = f.useState(!1), u = f.useMemo(() => n === "none" ? !1 : (n === "increase-width" || n === "experimental-no-flickering") && r && i, [r, i, n]), p = f.useCallback(() => {
    let m = e.current, h = t.current;
    if (!m || !h || c || n === "none") return;
    let b = m, g = b.getBoundingClientRect().left + b.offsetWidth, v = b.getBoundingClientRect().top + b.offsetHeight / 2, y = g - j4, w = v;
    document.querySelectorAll(O4).length === 0 && document.elementFromPoint(y, w) === m || (o(!0), d(!0));
  }, [e, t, c, n]);
  return f.useEffect(() => {
    let m = e.current;
    if (!m || n === "none") return;
    function h() {
      let g = window.innerWidth - m.getBoundingClientRect().right;
      s(g >= Th);
    }
    h();
    let b = setInterval(h, 1e3);
    return () => {
      clearInterval(b);
    };
  }, [e, n]), f.useEffect(() => {
    let m = a || document.activeElement === t.current;
    if (n === "none" || !m) return;
    let h = setTimeout(p, 0), b = setTimeout(p, 2e3), g = setTimeout(p, 5e3), v = setTimeout(() => {
      d(!0);
    }, 6e3);
    return () => {
      clearTimeout(h), clearTimeout(b), clearTimeout(g), clearTimeout(v);
    };
  }, [t, a, n, p]), { hasPWMBadge: r, willPushPWMBadge: u, PWM_BADGE_SPACE_WIDTH: M4 };
}
var Ah = f.createContext({}), jh = f.forwardRef((e, t) => {
  var n = e, { value: a, onChange: r, maxLength: o, textAlign: i = "left", pattern: s, placeholder: c, inputMode: d = "numeric", onComplete: u, pushPasswordManagerStrategy: p = "increase-width", pasteTransformer: m, containerClassName: h, noScriptCSSFallback: b = I4, render: g, children: v } = n, y = k4(n, ["value", "onChange", "maxLength", "textAlign", "pattern", "placeholder", "inputMode", "onComplete", "pushPasswordManagerStrategy", "pasteTransformer", "containerClassName", "noScriptCSSFallback", "render", "children"]), w, $, C, R, k;
  let [S, j] = f.useState(typeof y.defaultValue == "string" ? y.defaultValue : ""), P = a ?? S, B = A4(P), z = f.useCallback((I) => {
    r?.(I), j(I);
  }, [r]), L = f.useMemo(() => s ? typeof s == "string" ? new RegExp(s) : s : null, [s]), T = f.useRef(null), K = f.useRef(null), Q = f.useRef({ value: P, onChange: z, isIOS: typeof window < "u" && (($ = (w = window?.CSS) == null ? void 0 : w.supports) == null ? void 0 : $.call(w, "-webkit-touch-callout", "none")) }), V = f.useRef({ prev: [(C = T.current) == null ? void 0 : C.selectionStart, (R = T.current) == null ? void 0 : R.selectionEnd, (k = T.current) == null ? void 0 : k.selectionDirection] });
  f.useImperativeHandle(t, () => T.current, []), f.useEffect(() => {
    let I = T.current, re = K.current;
    if (!I || !re) return;
    Q.current.value !== I.value && Q.current.onChange(I.value), V.current.prev = [I.selectionStart, I.selectionEnd, I.selectionDirection];
    function Re() {
      if (document.activeElement !== I) {
        _(null), X(null);
        return;
      }
      let Ce = I.selectionStart, Te = I.selectionEnd, yn = I.selectionDirection, tt = I.maxLength, nt = I.value, dt = V.current.prev, ut = -1, $t = -1, Dt;
      if (nt.length !== 0 && Ce !== null && Te !== null) {
        let mi = Ce === Te, wn = Ce === nt.length && nt.length < tt;
        if (mi && !wn) {
          let Ct = Ce;
          if (Ct === 0) ut = 0, $t = 1, Dt = "forward";
          else if (Ct === tt) ut = Ct - 1, $t = Ct, Dt = "backward";
          else if (tt > 1 && nt.length > 1) {
            let Na = 0;
            if (dt[0] !== null && dt[1] !== null) {
              Dt = Ct < dt[1] ? "backward" : "forward";
              let hi = dt[0] === dt[1] && dt[0] < tt;
              Dt === "backward" && !hi && (Na = -1);
            }
            ut = Na + Ct, $t = Na + Ct + 1;
          }
        }
        ut !== -1 && $t !== -1 && ut !== $t && T.current.setSelectionRange(ut, $t, Dt);
      }
      let xn = ut !== -1 ? ut : Ce, kr = $t !== -1 ? $t : Te, Tr = Dt ?? yn;
      _(xn), X(kr), V.current.prev = [xn, kr, Tr];
    }
    if (document.addEventListener("selectionchange", Re, { capture: !0 }), Re(), document.activeElement === I && N(!0), !document.getElementById("input-otp-style")) {
      let Ce = document.createElement("style");
      if (Ce.id = "input-otp-style", document.head.appendChild(Ce), Ce.sheet) {
        let Te = "background: transparent !important; color: transparent !important; border-color: transparent !important; opacity: 0 !important; box-shadow: none !important; -webkit-box-shadow: none !important; -webkit-text-fill-color: transparent !important;";
        Aa(Ce.sheet, "[data-input-otp]::selection { background: transparent !important; color: transparent !important; }"), Aa(Ce.sheet, `[data-input-otp]:autofill { ${Te} }`), Aa(Ce.sheet, `[data-input-otp]:-webkit-autofill { ${Te} }`), Aa(Ce.sheet, "@supports (-webkit-touch-callout: none) { [data-input-otp] { letter-spacing: -.6em !important; font-weight: 100 !important; font-stretch: ultra-condensed; font-optical-sizing: none !important; left: -1px !important; right: 1px !important; } }"), Aa(Ce.sheet, "[data-input-otp] + * { pointer-events: all !important; }");
      }
    }
    let ke = () => {
      re && re.style.setProperty("--root-height", `${I.clientHeight}px`);
    };
    ke();
    let Xe = new ResizeObserver(ke);
    return Xe.observe(I), () => {
      document.removeEventListener("selectionchange", Re, { capture: !0 }), Xe.disconnect();
    };
  }, []);
  let [A, E] = f.useState(!1), [O, N] = f.useState(!1), [H, _] = f.useState(null), [G, X] = f.useState(null);
  f.useEffect(() => {
    T4(() => {
      var I, re, Re, ke;
      (I = T.current) == null || I.dispatchEvent(new Event("input"));
      let Xe = (re = T.current) == null ? void 0 : re.selectionStart, Ce = (Re = T.current) == null ? void 0 : Re.selectionEnd, Te = (ke = T.current) == null ? void 0 : ke.selectionDirection;
      Xe !== null && Ce !== null && (_(Xe), X(Ce), V.current.prev = [Xe, Ce, Te]);
    });
  }, [P, O]), f.useEffect(() => {
    B !== void 0 && P !== B && B.length < o && P.length === o && u?.(P);
  }, [o, u, B, P]);
  let W = D4({ containerRef: K, inputRef: T, pushPasswordManagerStrategy: p, isFocused: O }), te = f.useCallback((I) => {
    let re = I.currentTarget.value.slice(0, o);
    if (re.length > 0 && L && !L.test(re)) {
      I.preventDefault();
      return;
    }
    typeof B == "string" && re.length < B.length && document.dispatchEvent(new Event("selectionchange")), z(re);
  }, [o, z, B, L]), M = f.useCallback(() => {
    var I;
    if (T.current) {
      let re = Math.min(T.current.value.length, o - 1), Re = T.current.value.length;
      (I = T.current) == null || I.setSelectionRange(re, Re), _(re), X(Re);
    }
    N(!0);
  }, [o]), q = f.useCallback((I) => {
    var re, Re;
    let ke = T.current;
    if (!m && (!Q.current.isIOS || !I.clipboardData || !ke)) return;
    let Xe = I.clipboardData.getData("text/plain"), Ce = m ? m(Xe) : Xe;
    I.preventDefault();
    let Te = (re = T.current) == null ? void 0 : re.selectionStart, yn = (Re = T.current) == null ? void 0 : Re.selectionEnd, tt = (Te !== yn ? P.slice(0, Te) + Ce + P.slice(yn) : P.slice(0, Te) + Ce + P.slice(Te)).slice(0, o);
    if (tt.length > 0 && L && !L.test(tt)) return;
    ke.value = tt, z(tt);
    let nt = Math.min(tt.length, o - 1), dt = tt.length;
    ke.setSelectionRange(nt, dt), _(nt), X(dt);
  }, [o, z, L, P]), oe = f.useMemo(() => ({ position: "relative", cursor: y.disabled ? "default" : "text", userSelect: "none", WebkitUserSelect: "none", pointerEvents: "none" }), [y.disabled]), ce = f.useMemo(() => ({ position: "absolute", inset: 0, width: W.willPushPWMBadge ? `calc(100% + ${W.PWM_BADGE_SPACE_WIDTH})` : "100%", clipPath: W.willPushPWMBadge ? `inset(0 ${W.PWM_BADGE_SPACE_WIDTH} 0 0)` : void 0, height: "100%", display: "flex", textAlign: i, opacity: "1", color: "transparent", pointerEvents: "all", background: "transparent", caretColor: "transparent", border: "0 solid transparent", outline: "0 solid transparent", boxShadow: "none", lineHeight: "1", letterSpacing: "-.5em", fontSize: "var(--root-height)", fontFamily: "monospace", fontVariantNumeric: "tabular-nums" }), [W.PWM_BADGE_SPACE_WIDTH, W.willPushPWMBadge, i]), fe = f.useMemo(() => f.createElement("input", P4(R4({ autoComplete: y.autoComplete || "one-time-code" }, y), { "data-input-otp": !0, "data-input-otp-placeholder-shown": P.length === 0 || void 0, "data-input-otp-mss": H, "data-input-otp-mse": G, inputMode: d, pattern: L?.source, "aria-placeholder": c, style: ce, maxLength: o, value: P, ref: T, onPaste: (I) => {
    var re;
    q(I), (re = y.onPaste) == null || re.call(y, I);
  }, onChange: te, onMouseOver: (I) => {
    var re;
    E(!0), (re = y.onMouseOver) == null || re.call(y, I);
  }, onMouseLeave: (I) => {
    var re;
    E(!1), (re = y.onMouseLeave) == null || re.call(y, I);
  }, onFocus: (I) => {
    var re;
    M(), (re = y.onFocus) == null || re.call(y, I);
  }, onBlur: (I) => {
    var re;
    N(!1), (re = y.onBlur) == null || re.call(y, I);
  } })), [te, M, q, d, ce, o, G, H, y, L?.source, P]), ye = f.useMemo(() => ({ slots: Array.from({ length: o }).map((I, re) => {
    var Re;
    let ke = O && H !== null && G !== null && (H === G && re === H || re >= H && re < G), Xe = P[re] !== void 0 ? P[re] : null, Ce = P[0] !== void 0 ? null : (Re = c?.[re]) != null ? Re : null;
    return { char: Xe, placeholderChar: Ce, isActive: ke, hasFakeCaret: ke && Xe === null };
  }), isFocused: O, isHovering: !y.disabled && A }), [O, A, o, G, H, y.disabled, P]), Be = f.useMemo(() => g ? g(ye) : f.createElement(Ah.Provider, { value: ye }, v), [v, ye, g]);
  return f.createElement(f.Fragment, null, b !== null && f.createElement("noscript", null, f.createElement("style", null, b)), f.createElement("div", { ref: K, "data-input-otp-container": !0, style: oe, className: h }, Be, f.createElement("div", { style: { position: "absolute", inset: 0, pointerEvents: "none" } }, fe)));
});
jh.displayName = "Input";
function Aa(e, t) {
  try {
    e.insertRule(t);
  } catch {
    console.error("input-otp could not insert CSS rule:", t);
  }
}
var I4 = `
[data-input-otp] {
  --nojs-bg: white !important;
  --nojs-fg: black !important;

  background-color: var(--nojs-bg) !important;
  color: var(--nojs-fg) !important;
  caret-color: var(--nojs-fg) !important;
  letter-spacing: .25em !important;
  text-align: center !important;
  border: 1px solid var(--nojs-fg) !important;
  border-radius: 4px !important;
  width: 100% !important;
}
@media (prefers-color-scheme: dark) {
  [data-input-otp] {
    --nojs-bg: black !important;
    --nojs-fg: white !important;
  }
}`;
const L4 = f.forwardRef(({ className: e, containerClassName: t, ...n }, a) => /* @__PURE__ */ l.jsx(
  jh,
  {
    ref: a,
    containerClassName: x(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      t
    ),
    className: x("disabled:cursor-not-allowed", e),
    ...n
  }
));
L4.displayName = "InputOTP";
const F4 = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx("div", { ref: n, className: x("flex items-center", e), ...t }));
F4.displayName = "InputOTPGroup";
const B4 = f.forwardRef(({ index: e, className: t, ...n }, a) => {
  const r = f.useContext(Ah), { char: o, hasFakeCaret: i, isActive: s } = r.slots[e];
  return /* @__PURE__ */ l.jsxs(
    "div",
    {
      ref: a,
      className: x(
        "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        s && "z-10 ring-1 ring-ring",
        t
      ),
      ...n,
      children: [
        o,
        i && /* @__PURE__ */ l.jsx("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ l.jsx("div", { className: "h-4 w-px animate-caret-blink bg-foreground duration-1000" }) })
      ]
    }
  );
});
B4.displayName = "InputOTPSlot";
const U4 = f.forwardRef(({ ...e }, t) => /* @__PURE__ */ l.jsx("div", { ref: t, role: "separator", ...e, children: /* @__PURE__ */ l.jsx(c1, {}) }));
U4.displayName = "InputOTPSeparator";
const G4 = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  "div",
  {
    ref: n,
    className: x(
      "rounded-xl border bg-card text-card-foreground shadow",
      e
    ),
    ...t
  }
));
G4.displayName = "Card";
const W4 = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  "div",
  {
    ref: n,
    className: x("flex flex-col space-y-1.5 p-6", e),
    ...t
  }
));
W4.displayName = "CardHeader";
const H4 = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  "div",
  {
    ref: n,
    className: x("font-semibold leading-none tracking-tight", e),
    ...t
  }
));
H4.displayName = "CardTitle";
const V4 = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  "div",
  {
    ref: n,
    className: x("text-sm text-muted-foreground", e),
    ...t
  }
));
V4.displayName = "CardDescription";
const z4 = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx("div", { ref: n, className: x("p-6 pt-0", e), ...t }));
z4.displayName = "CardContent";
const K4 = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  "div",
  {
    ref: n,
    className: x("flex items-center p-6 pt-0", e),
    ...t
  }
));
K4.displayName = "CardFooter";
const Y4 = sr(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function sN({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ l.jsx("div", { className: x(Y4({ variant: t }), e), ...n });
}
var ii = "Switch", [Z4, lN] = Fe(ii), [X4, q4] = Z4(ii), Mh = f.forwardRef(
  (e, t) => {
    const {
      __scopeSwitch: n,
      name: a,
      checked: r,
      defaultChecked: o,
      required: i,
      disabled: s,
      value: c = "on",
      onCheckedChange: d,
      form: u,
      ...p
    } = e, [m, h] = f.useState(null), b = le(t, ($) => h($)), g = f.useRef(!1), v = m ? u || !!m.closest("form") : !0, [y, w] = Ke({
      prop: r,
      defaultProp: o ?? !1,
      onChange: d,
      caller: ii
    });
    return /* @__PURE__ */ l.jsxs(X4, { scope: n, checked: y, disabled: s, children: [
      /* @__PURE__ */ l.jsx(
        Y.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": y,
          "aria-required": i,
          "data-state": Lh(y),
          "data-disabled": s ? "" : void 0,
          disabled: s,
          value: c,
          ...p,
          ref: b,
          onClick: U(e.onClick, ($) => {
            w((C) => !C), v && (g.current = $.isPropagationStopped(), g.current || $.stopPropagation());
          })
        }
      ),
      v && /* @__PURE__ */ l.jsx(
        Ih,
        {
          control: m,
          bubbles: !g.current,
          name: a,
          value: c,
          checked: y,
          required: i,
          disabled: s,
          form: u,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Mh.displayName = ii;
var Oh = "SwitchThumb", Dh = f.forwardRef(
  (e, t) => {
    const { __scopeSwitch: n, ...a } = e, r = q4(Oh, n);
    return /* @__PURE__ */ l.jsx(
      Y.span,
      {
        "data-state": Lh(r.checked),
        "data-disabled": r.disabled ? "" : void 0,
        ...a,
        ref: t
      }
    );
  }
);
Dh.displayName = Oh;
var J4 = "SwitchBubbleInput", Ih = f.forwardRef(
  ({
    __scopeSwitch: e,
    control: t,
    checked: n,
    bubbles: a = !0,
    ...r
  }, o) => {
    const i = f.useRef(null), s = le(i, o), c = So(n), d = _o(t);
    return f.useEffect(() => {
      const u = i.current;
      if (!u) return;
      const p = window.HTMLInputElement.prototype, h = Object.getOwnPropertyDescriptor(
        p,
        "checked"
      ).set;
      if (c !== n && h) {
        const b = new Event("click", { bubbles: a });
        h.call(u, n), u.dispatchEvent(b);
      }
    }, [c, n, a]), /* @__PURE__ */ l.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: n,
        ...r,
        tabIndex: -1,
        ref: s,
        style: {
          ...r.style,
          ...d,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
Ih.displayName = J4;
function Lh(e) {
  return e ? "checked" : "unchecked";
}
var Fh = Mh, Q4 = Dh;
const eC = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  Fh,
  {
    className: x(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      e
    ),
    ...t,
    ref: n,
    children: /* @__PURE__ */ l.jsx(
      Q4,
      {
        className: x(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
eC.displayName = Fh.displayName;
const tC = f.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
    "textarea",
    {
      className: x(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        e
      ),
      ref: n,
      ...t
    }
  )
);
tC.displayName = "Textarea";
function cN({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l.jsx(
    "div",
    {
      className: x("animate-pulse rounded-md bg-primary/10", e),
      ...t
    }
  );
}
function nC(e, t) {
  return f.useReducer((n, a) => t[n][a] ?? n, e);
}
var Il = "ScrollArea", [Bh, dN] = Fe(Il), [aC, lt] = Bh(Il), Uh = f.forwardRef(
  (e, t) => {
    const {
      __scopeScrollArea: n,
      type: a = "hover",
      dir: r,
      scrollHideDelay: o = 600,
      ...i
    } = e, [s, c] = f.useState(null), [d, u] = f.useState(null), [p, m] = f.useState(null), [h, b] = f.useState(null), [g, v] = f.useState(null), [y, w] = f.useState(0), [$, C] = f.useState(0), [R, k] = f.useState(!1), [S, j] = f.useState(!1), P = le(t, (z) => c(z)), B = In(r);
    return /* @__PURE__ */ l.jsx(
      aC,
      {
        scope: n,
        type: a,
        dir: B,
        scrollHideDelay: o,
        scrollArea: s,
        viewport: d,
        onViewportChange: u,
        content: p,
        onContentChange: m,
        scrollbarX: h,
        onScrollbarXChange: b,
        scrollbarXEnabled: R,
        onScrollbarXEnabledChange: k,
        scrollbarY: g,
        onScrollbarYChange: v,
        scrollbarYEnabled: S,
        onScrollbarYEnabledChange: j,
        onCornerWidthChange: w,
        onCornerHeightChange: C,
        children: /* @__PURE__ */ l.jsx(
          Y.div,
          {
            dir: B,
            ...i,
            ref: P,
            style: {
              position: "relative",
              // Pass corner sizes as CSS vars to reduce re-renders of context consumers
              "--radix-scroll-area-corner-width": y + "px",
              "--radix-scroll-area-corner-height": $ + "px",
              ...e.style
            }
          }
        )
      }
    );
  }
);
Uh.displayName = Il;
var Gh = "ScrollAreaViewport", Wh = f.forwardRef(
  (e, t) => {
    const { __scopeScrollArea: n, children: a, nonce: r, ...o } = e, i = lt(Gh, n), s = f.useRef(null), c = le(t, s, i.onViewportChange);
    return /* @__PURE__ */ l.jsxs(l.Fragment, { children: [
      /* @__PURE__ */ l.jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: r
        }
      ),
      /* @__PURE__ */ l.jsx(
        Y.div,
        {
          "data-radix-scroll-area-viewport": "",
          ...o,
          ref: c,
          style: {
            /**
             * We don't support `visible` because the intention is to have at least one scrollbar
             * if this component is used and `visible` will behave like `auto` in that case
             * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow#description
             *
             * We don't handle `auto` because the intention is for the native implementation
             * to be hidden if using this component. We just want to ensure the node is scrollable
             * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
             * the browser from having to work out whether to render native scrollbars or not,
             * we tell it to with the intention of hiding them in CSS.
             */
            overflowX: i.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: i.scrollbarYEnabled ? "scroll" : "hidden",
            ...e.style
          },
          children: /* @__PURE__ */ l.jsx("div", { ref: i.onContentChange, style: { minWidth: "100%", display: "table" }, children: a })
        }
      )
    ] });
  }
);
Wh.displayName = Gh;
var Ot = "ScrollAreaScrollbar", Ll = f.forwardRef(
  (e, t) => {
    const { forceMount: n, ...a } = e, r = lt(Ot, e.__scopeScrollArea), { onScrollbarXEnabledChange: o, onScrollbarYEnabledChange: i } = r, s = e.orientation === "horizontal";
    return f.useEffect(() => (s ? o(!0) : i(!0), () => {
      s ? o(!1) : i(!1);
    }), [s, o, i]), r.type === "hover" ? /* @__PURE__ */ l.jsx(rC, { ...a, ref: t, forceMount: n }) : r.type === "scroll" ? /* @__PURE__ */ l.jsx(oC, { ...a, ref: t, forceMount: n }) : r.type === "auto" ? /* @__PURE__ */ l.jsx(Hh, { ...a, ref: t, forceMount: n }) : r.type === "always" ? /* @__PURE__ */ l.jsx(Fl, { ...a, ref: t }) : null;
  }
);
Ll.displayName = Ot;
var rC = f.forwardRef((e, t) => {
  const { forceMount: n, ...a } = e, r = lt(Ot, e.__scopeScrollArea), [o, i] = f.useState(!1);
  return f.useEffect(() => {
    const s = r.scrollArea;
    let c = 0;
    if (s) {
      const d = () => {
        window.clearTimeout(c), i(!0);
      }, u = () => {
        c = window.setTimeout(() => i(!1), r.scrollHideDelay);
      };
      return s.addEventListener("pointerenter", d), s.addEventListener("pointerleave", u), () => {
        window.clearTimeout(c), s.removeEventListener("pointerenter", d), s.removeEventListener("pointerleave", u);
      };
    }
  }, [r.scrollArea, r.scrollHideDelay]), /* @__PURE__ */ l.jsx(Ge, { present: n || o, children: /* @__PURE__ */ l.jsx(
    Hh,
    {
      "data-state": o ? "visible" : "hidden",
      ...a,
      ref: t
    }
  ) });
}), oC = f.forwardRef((e, t) => {
  const { forceMount: n, ...a } = e, r = lt(Ot, e.__scopeScrollArea), o = e.orientation === "horizontal", i = li(() => c("SCROLL_END"), 100), [s, c] = nC("hidden", {
    hidden: {
      SCROLL: "scrolling"
    },
    scrolling: {
      SCROLL_END: "idle",
      POINTER_ENTER: "interacting"
    },
    interacting: {
      SCROLL: "interacting",
      POINTER_LEAVE: "idle"
    },
    idle: {
      HIDE: "hidden",
      SCROLL: "scrolling",
      POINTER_ENTER: "interacting"
    }
  });
  return f.useEffect(() => {
    if (s === "idle") {
      const d = window.setTimeout(() => c("HIDE"), r.scrollHideDelay);
      return () => window.clearTimeout(d);
    }
  }, [s, r.scrollHideDelay, c]), f.useEffect(() => {
    const d = r.viewport, u = o ? "scrollLeft" : "scrollTop";
    if (d) {
      let p = d[u];
      const m = () => {
        const h = d[u];
        p !== h && (c("SCROLL"), i()), p = h;
      };
      return d.addEventListener("scroll", m), () => d.removeEventListener("scroll", m);
    }
  }, [r.viewport, o, c, i]), /* @__PURE__ */ l.jsx(Ge, { present: n || s !== "hidden", children: /* @__PURE__ */ l.jsx(
    Fl,
    {
      "data-state": s === "hidden" ? "hidden" : "visible",
      ...a,
      ref: t,
      onPointerEnter: U(e.onPointerEnter, () => c("POINTER_ENTER")),
      onPointerLeave: U(e.onPointerLeave, () => c("POINTER_LEAVE"))
    }
  ) });
}), Hh = f.forwardRef((e, t) => {
  const n = lt(Ot, e.__scopeScrollArea), { forceMount: a, ...r } = e, [o, i] = f.useState(!1), s = e.orientation === "horizontal", c = li(() => {
    if (n.viewport) {
      const d = n.viewport.offsetWidth < n.viewport.scrollWidth, u = n.viewport.offsetHeight < n.viewport.scrollHeight;
      i(s ? d : u);
    }
  }, 10);
  return da(n.viewport, c), da(n.content, c), /* @__PURE__ */ l.jsx(Ge, { present: a || o, children: /* @__PURE__ */ l.jsx(
    Fl,
    {
      "data-state": o ? "visible" : "hidden",
      ...r,
      ref: t
    }
  ) });
}), Fl = f.forwardRef((e, t) => {
  const { orientation: n = "vertical", ...a } = e, r = lt(Ot, e.__scopeScrollArea), o = f.useRef(null), i = f.useRef(0), [s, c] = f.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  }), d = Zh(s.viewport, s.content), u = {
    ...a,
    sizes: s,
    onSizesChange: c,
    hasThumb: d > 0 && d < 1,
    onThumbChange: (m) => o.current = m,
    onThumbPointerUp: () => i.current = 0,
    onThumbPointerDown: (m) => i.current = m
  };
  function p(m, h) {
    return uC(m, i.current, s, h);
  }
  return n === "horizontal" ? /* @__PURE__ */ l.jsx(
    iC,
    {
      ...u,
      ref: t,
      onThumbPositionChange: () => {
        if (r.viewport && o.current) {
          const m = r.viewport.scrollLeft, h = nd(m, s, r.dir);
          o.current.style.transform = `translate3d(${h}px, 0, 0)`;
        }
      },
      onWheelScroll: (m) => {
        r.viewport && (r.viewport.scrollLeft = m);
      },
      onDragScroll: (m) => {
        r.viewport && (r.viewport.scrollLeft = p(m, r.dir));
      }
    }
  ) : n === "vertical" ? /* @__PURE__ */ l.jsx(
    sC,
    {
      ...u,
      ref: t,
      onThumbPositionChange: () => {
        if (r.viewport && o.current) {
          const m = r.viewport.scrollTop, h = nd(m, s);
          o.current.style.transform = `translate3d(0, ${h}px, 0)`;
        }
      },
      onWheelScroll: (m) => {
        r.viewport && (r.viewport.scrollTop = m);
      },
      onDragScroll: (m) => {
        r.viewport && (r.viewport.scrollTop = p(m));
      }
    }
  ) : null;
}), iC = f.forwardRef((e, t) => {
  const { sizes: n, onSizesChange: a, ...r } = e, o = lt(Ot, e.__scopeScrollArea), [i, s] = f.useState(), c = f.useRef(null), d = le(t, c, o.onScrollbarXChange);
  return f.useEffect(() => {
    c.current && s(getComputedStyle(c.current));
  }, [c]), /* @__PURE__ */ l.jsx(
    zh,
    {
      "data-orientation": "horizontal",
      ...r,
      ref: d,
      sizes: n,
      style: {
        bottom: 0,
        left: o.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: o.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        "--radix-scroll-area-thumb-width": si(n) + "px",
        ...e.style
      },
      onThumbPointerDown: (u) => e.onThumbPointerDown(u.x),
      onDragScroll: (u) => e.onDragScroll(u.x),
      onWheelScroll: (u, p) => {
        if (o.viewport) {
          const m = o.viewport.scrollLeft + u.deltaX;
          e.onWheelScroll(m), qh(m, p) && u.preventDefault();
        }
      },
      onResize: () => {
        c.current && o.viewport && i && a({
          content: o.viewport.scrollWidth,
          viewport: o.viewport.offsetWidth,
          scrollbar: {
            size: c.current.clientWidth,
            paddingStart: lo(i.paddingLeft),
            paddingEnd: lo(i.paddingRight)
          }
        });
      }
    }
  );
}), sC = f.forwardRef((e, t) => {
  const { sizes: n, onSizesChange: a, ...r } = e, o = lt(Ot, e.__scopeScrollArea), [i, s] = f.useState(), c = f.useRef(null), d = le(t, c, o.onScrollbarYChange);
  return f.useEffect(() => {
    c.current && s(getComputedStyle(c.current));
  }, [c]), /* @__PURE__ */ l.jsx(
    zh,
    {
      "data-orientation": "vertical",
      ...r,
      ref: d,
      sizes: n,
      style: {
        top: 0,
        right: o.dir === "ltr" ? 0 : void 0,
        left: o.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        "--radix-scroll-area-thumb-height": si(n) + "px",
        ...e.style
      },
      onThumbPointerDown: (u) => e.onThumbPointerDown(u.y),
      onDragScroll: (u) => e.onDragScroll(u.y),
      onWheelScroll: (u, p) => {
        if (o.viewport) {
          const m = o.viewport.scrollTop + u.deltaY;
          e.onWheelScroll(m), qh(m, p) && u.preventDefault();
        }
      },
      onResize: () => {
        c.current && o.viewport && i && a({
          content: o.viewport.scrollHeight,
          viewport: o.viewport.offsetHeight,
          scrollbar: {
            size: c.current.clientHeight,
            paddingStart: lo(i.paddingTop),
            paddingEnd: lo(i.paddingBottom)
          }
        });
      }
    }
  );
}), [lC, Vh] = Bh(Ot), zh = f.forwardRef((e, t) => {
  const {
    __scopeScrollArea: n,
    sizes: a,
    hasThumb: r,
    onThumbChange: o,
    onThumbPointerUp: i,
    onThumbPointerDown: s,
    onThumbPositionChange: c,
    onDragScroll: d,
    onWheelScroll: u,
    onResize: p,
    ...m
  } = e, h = lt(Ot, n), [b, g] = f.useState(null), v = le(t, (P) => g(P)), y = f.useRef(null), w = f.useRef(""), $ = h.viewport, C = a.content - a.viewport, R = Le(u), k = Le(c), S = li(p, 10);
  function j(P) {
    if (y.current) {
      const B = P.clientX - y.current.left, z = P.clientY - y.current.top;
      d({ x: B, y: z });
    }
  }
  return f.useEffect(() => {
    const P = (B) => {
      const z = B.target;
      b?.contains(z) && R(B, C);
    };
    return document.addEventListener("wheel", P, { passive: !1 }), () => document.removeEventListener("wheel", P, { passive: !1 });
  }, [$, b, C, R]), f.useEffect(k, [a, k]), da(b, S), da(h.content, S), /* @__PURE__ */ l.jsx(
    lC,
    {
      scope: n,
      scrollbar: b,
      hasThumb: r,
      onThumbChange: Le(o),
      onThumbPointerUp: Le(i),
      onThumbPositionChange: k,
      onThumbPointerDown: Le(s),
      children: /* @__PURE__ */ l.jsx(
        Y.div,
        {
          ...m,
          ref: v,
          style: { position: "absolute", ...m.style },
          onPointerDown: U(e.onPointerDown, (P) => {
            P.button === 0 && (P.target.setPointerCapture(P.pointerId), y.current = b.getBoundingClientRect(), w.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", h.viewport && (h.viewport.style.scrollBehavior = "auto"), j(P));
          }),
          onPointerMove: U(e.onPointerMove, j),
          onPointerUp: U(e.onPointerUp, (P) => {
            const B = P.target;
            B.hasPointerCapture(P.pointerId) && B.releasePointerCapture(P.pointerId), document.body.style.webkitUserSelect = w.current, h.viewport && (h.viewport.style.scrollBehavior = ""), y.current = null;
          })
        }
      )
    }
  );
}), so = "ScrollAreaThumb", Kh = f.forwardRef(
  (e, t) => {
    const { forceMount: n, ...a } = e, r = Vh(so, e.__scopeScrollArea);
    return /* @__PURE__ */ l.jsx(Ge, { present: n || r.hasThumb, children: /* @__PURE__ */ l.jsx(cC, { ref: t, ...a }) });
  }
), cC = f.forwardRef(
  (e, t) => {
    const { __scopeScrollArea: n, style: a, ...r } = e, o = lt(so, n), i = Vh(so, n), { onThumbPositionChange: s } = i, c = le(
      t,
      (p) => i.onThumbChange(p)
    ), d = f.useRef(void 0), u = li(() => {
      d.current && (d.current(), d.current = void 0);
    }, 100);
    return f.useEffect(() => {
      const p = o.viewport;
      if (p) {
        const m = () => {
          if (u(), !d.current) {
            const h = fC(p, s);
            d.current = h, s();
          }
        };
        return s(), p.addEventListener("scroll", m), () => p.removeEventListener("scroll", m);
      }
    }, [o.viewport, u, s]), /* @__PURE__ */ l.jsx(
      Y.div,
      {
        "data-state": i.hasThumb ? "visible" : "hidden",
        ...r,
        ref: c,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...a
        },
        onPointerDownCapture: U(e.onPointerDownCapture, (p) => {
          const h = p.target.getBoundingClientRect(), b = p.clientX - h.left, g = p.clientY - h.top;
          i.onThumbPointerDown({ x: b, y: g });
        }),
        onPointerUp: U(e.onPointerUp, i.onThumbPointerUp)
      }
    );
  }
);
Kh.displayName = so;
var Bl = "ScrollAreaCorner", Yh = f.forwardRef(
  (e, t) => {
    const n = lt(Bl, e.__scopeScrollArea), a = !!(n.scrollbarX && n.scrollbarY);
    return n.type !== "scroll" && a ? /* @__PURE__ */ l.jsx(dC, { ...e, ref: t }) : null;
  }
);
Yh.displayName = Bl;
var dC = f.forwardRef((e, t) => {
  const { __scopeScrollArea: n, ...a } = e, r = lt(Bl, n), [o, i] = f.useState(0), [s, c] = f.useState(0), d = !!(o && s);
  return da(r.scrollbarX, () => {
    const u = r.scrollbarX?.offsetHeight || 0;
    r.onCornerHeightChange(u), c(u);
  }), da(r.scrollbarY, () => {
    const u = r.scrollbarY?.offsetWidth || 0;
    r.onCornerWidthChange(u), i(u);
  }), d ? /* @__PURE__ */ l.jsx(
    Y.div,
    {
      ...a,
      ref: t,
      style: {
        width: o,
        height: s,
        position: "absolute",
        right: r.dir === "ltr" ? 0 : void 0,
        left: r.dir === "rtl" ? 0 : void 0,
        bottom: 0,
        ...e.style
      }
    }
  ) : null;
});
function lo(e) {
  return e ? parseInt(e, 10) : 0;
}
function Zh(e, t) {
  const n = e / t;
  return isNaN(n) ? 0 : n;
}
function si(e) {
  const t = Zh(e.viewport, e.content), n = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, a = (e.scrollbar.size - n) * t;
  return Math.max(a, 18);
}
function uC(e, t, n, a = "ltr") {
  const r = si(n), o = r / 2, i = t || o, s = r - i, c = n.scrollbar.paddingStart + i, d = n.scrollbar.size - n.scrollbar.paddingEnd - s, u = n.content - n.viewport, p = a === "ltr" ? [0, u] : [u * -1, 0];
  return Xh([c, d], p)(e);
}
function nd(e, t, n = "ltr") {
  const a = si(t), r = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, o = t.scrollbar.size - r, i = t.content - t.viewport, s = o - a, c = n === "ltr" ? [0, i] : [i * -1, 0], d = fs(e, c);
  return Xh([0, i], [0, s])(d);
}
function Xh(e, t) {
  return (n) => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0];
    const a = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + a * (n - e[0]);
  };
}
function qh(e, t) {
  return e > 0 && e < t;
}
var fC = (e, t = () => {
}) => {
  let n = { left: e.scrollLeft, top: e.scrollTop }, a = 0;
  return (function r() {
    const o = { left: e.scrollLeft, top: e.scrollTop }, i = n.left !== o.left, s = n.top !== o.top;
    (i || s) && t(), n = o, a = window.requestAnimationFrame(r);
  })(), () => window.cancelAnimationFrame(a);
};
function li(e, t) {
  const n = Le(e), a = f.useRef(0);
  return f.useEffect(() => () => window.clearTimeout(a.current), []), f.useCallback(() => {
    window.clearTimeout(a.current), a.current = window.setTimeout(n, t);
  }, [n, t]);
}
function da(e, t) {
  const n = Le(t);
  Oe(() => {
    let a = 0;
    if (e) {
      const r = new ResizeObserver(() => {
        cancelAnimationFrame(a), a = window.requestAnimationFrame(n);
      });
      return r.observe(e), () => {
        window.cancelAnimationFrame(a), r.unobserve(e);
      };
    }
  }, [e, n]);
}
var Jh = Uh, pC = Wh, mC = Yh;
const hC = f.forwardRef(({ className: e, children: t, ...n }, a) => /* @__PURE__ */ l.jsxs(
  Jh,
  {
    ref: a,
    className: x("relative overflow-hidden", e),
    ...n,
    children: [
      /* @__PURE__ */ l.jsx(pC, { className: "h-full w-full rounded-[inherit]", children: t }),
      /* @__PURE__ */ l.jsx(Qh, {}),
      /* @__PURE__ */ l.jsx(mC, {})
    ]
  }
));
hC.displayName = Jh.displayName;
const Qh = f.forwardRef(({ className: e, orientation: t = "vertical", ...n }, a) => /* @__PURE__ */ l.jsx(
  Ll,
  {
    ref: a,
    orientation: t,
    className: x(
      "flex touch-none select-none transition-colors",
      t === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      t === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      e
    ),
    ...n,
    children: /* @__PURE__ */ l.jsx(Kh, { className: "relative flex-1 rounded-full bg-border" })
  }
));
Qh.displayName = Ll.displayName;
function Ul() {
  return (Ul = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
  }).apply(this, arguments);
}
function gC(e, t) {
  if (e == null) return {};
  var n, a, r = {}, o = Object.keys(e);
  for (a = 0; a < o.length; a++) t.indexOf(n = o[a]) >= 0 || (r[n] = e[n]);
  return r;
}
var bC = { ac: !0, ad: !0, ae: !0, af: !0, afar: !0, ag: !0, ai: !0, al: !0, am: !0, ao: !0, aq: !0, ar: !0, as: !0, at: !0, au: !0, "au-aboriginal": !0, "au-act": !0, "au-nsw": !0, "au-nt": !0, "au-qld": !0, "au-tas": !0, "au-vic": !0, "au-wa": !0, aw: !0, ax: !0, az: !0, ba: !0, bb: !0, bd: !0, be: !0, bf: !0, bg: !0, bh: !0, bi: !0, bj: !0, bl: !0, bm: !0, bn: !0, bo: !0, "bq-bo": !0, "bq-sa": !0, "bq-se": !0, bq: !0, br: !0, bs: !0, bt: !0, bv: !0, bw: !0, by: !0, bz: !0, "ca-bc": !0, ca: !0, cc: !0, cd: !0, cf: !0, cg: !0, "ch-gr": !0, ch: !0, ci: !0, ck: !0, cl: !0, cm: !0, "cn-xj": !0, cn: !0, co: !0, cp: !0, cq: !0, cr: !0, cu: !0, cv: !0, cw: !0, cx: !0, cy: !0, cz: !0, de: !0, dg: !0, dj: !0, dk: !0, dm: !0, do: !0, dz: !0, ea: !0, earth: !0, east_african_federation: !0, easter_island: !0, "ec-w": !0, ec: !0, ee: !0, eg: !0, eh: !0, er: !0, "es-ar": !0, "es-ce": !0, "es-cn": !0, "es-ct": !0, "es-ga": !0, "es-ib": !0, "es-ml": !0, "es-pv": !0, "es-variant": !0, es: !0, "et-or": !0, "et-ti": !0, et: !0, eu: !0, european_union: !0, ewe: !0, fi: !0, fj: !0, fk: !0, fm: !0, fo: !0, "fr-20r": !0, "fr-bre": !0, "fr-cp": !0, fr: !0, fx: !0, ga: !0, "gb-con": !0, "gb-eng": !0, "gb-nir": !0, "gb-ork": !0, "gb-sct": !0, "gb-wls": !0, gb: !0, gd: !0, "ge-ab": !0, ge: !0, gf: !0, gg: !0, gh: !0, gi: !0, gl: !0, gm: !0, gn: !0, gp: !0, gq: !0, gr: !0, gs: !0, gt: !0, gu: !0, guarani: !0, gw: !0, gy: !0, hausa: !0, hk: !0, hm: !0, hmong: !0, hn: !0, hr: !0, ht: !0, hu: !0, ic: !0, id: !0, "id-jb": !0, "id-jt": !0, ie: !0, il: !0, im: !0, "in-as": !0, "in-gj": !0, "in-ka": !0, "in-or": !0, "in-tn": !0, in: !0, io: !0, iq: !0, ir: !0, is: !0, "it-23": !0, "it-82": !0, "it-88": !0, it: !0, je: !0, jm: !0, jo: !0, jp: !0, kanuri: !0, ke: !0, kg: !0, kh: !0, ki: !0, kikuyu: !0, km: !0, kn: !0, kongo: !0, kp: !0, kr: !0, kurdistan: !0, kw: !0, ky: !0, kz: !0, la: !0, lb: !0, lc: !0, li: !0, lk: !0, lr: !0, ls: !0, lt: !0, lu: !0, lv: !0, ly: !0, ma: !0, malayali: !0, manipur: !0, maori: !0, mc: !0, md: !0, me: !0, mf: !0, mg: !0, mh: !0, mizoram: !0, mk: !0, ml: !0, mm: !0, mn: !0, mo: !0, mp: !0, mq: !0, mr: !0, ms: !0, mt: !0, mu: !0, mv: !0, mw: !0, mx: !0, my: !0, mz: !0, na: !0, nato: !0, nc: !0, ne: !0, nf: !0, ng: !0, ni: !0, "nl-fr": !0, nl: !0, no: !0, northern_cyprus: !0, np: !0, nr: !0, nu: !0, nz: !0, occitania: !0, olympics: !0, om: !0, otomi: !0, pa: !0, pe: !0, pf: !0, pg: !0, ph: !0, "pk-jk": !0, "pk-sd": !0, pk: !0, pl: !0, pm: !0, pn: !0, pr: !0, ps: !0, "pt-20": !0, "pt-30": !0, pt: !0, pw: !0, py: !0, qa: !0, quechua: !0, re: !0, ro: !0, rs: !0, ru: !0, "ru-ba": !0, "ru-ce": !0, "ru-cu": !0, "ru-da": !0, "ru-ko": !0, "ru-ta": !0, "ru-ud": !0, rw: !0, sa: !0, sami: !0, sb: !0, sc: !0, sd: !0, se: !0, sg: !0, "sh-ac": !0, "sh-hl": !0, "sh-ta": !0, sh: !0, si: !0, sj: !0, sk: !0, sl: !0, sm: !0, sn: !0, so: !0, somaliland: !0, south_ossetia: !0, soviet_union: !0, sr: !0, ss: !0, st: !0, su: !0, sv: !0, sx: !0, sy: !0, sz: !0, ta: !0, tc: !0, td: !0, tf: !0, tg: !0, th: !0, tibet: !0, tj: !0, tk: !0, tl: !0, tm: !0, tn: !0, to: !0, torres_strait_islands: !0, tr: !0, transnistria: !0, tt: !0, tv: !0, tw: !0, tz: !0, ua: !0, ug: !0, uk: !0, um: !0, un: !0, united_nations: !0, "us-hi": !0, us: !0, uy: !0, uz: !0, va: !0, vc: !0, ve: !0, vg: !0, vi: !0, vn: !0, vu: !0, wf: !0, wiphala: !0, ws: !0, xk: !0, xx: !0, ye: !0, yorubaland: !0, yt: !0, za: !0, zm: !0, zw: !0 }, vC = ["countryCode", "cdnUrl"], yC = function(e, t, n, a) {
  return a === void 0 && (a = ""), Ul({}, n, { title: n.title || e, height: n.height || 100, src: "" + (t || "https://react-circle-flags.pages.dev/") + a + e + ".svg" });
}, vs = function(e) {
  var t = e.countryCode, n = e.cdnUrl, a = gC(e, vC);
  return D.createElement("img", Ul({ "data-testid": "circle-country-flag" }, yC((function(r) {
    return bC[r] ? r : "xx";
  })(t).toLowerCase(), n, a)));
};
const xC = [
  { symbol: "د.إ", name: "UAE Dirham", code: "AED", number: "784" },
  { symbol: "؋", name: "Afghani", code: "AFN", number: "971" },
  { symbol: "L", name: "Lek", code: "ALL", number: "008" },
  { symbol: "֏", name: "Armenian Dram", code: "AMD", number: "051" },
  {
    symbol: "ƒ",
    name: "Netherlands Antillean Guilder",
    code: "ANG",
    number: "532"
  },
  { symbol: "Kz", name: "Kwanza", code: "AOA", number: "973" },
  { symbol: "$", name: "Argentine Peso", code: "ARS", number: "032" },
  { symbol: "$", name: "Australian Dollar", code: "AUD", number: "036" },
  { symbol: "ƒ", name: "Aruban Florin", code: "AWG", number: "533" },
  { symbol: "₼", name: "Azerbaijan Manat", code: "AZN", number: "944" },
  { symbol: "KM", name: "Convertible Mark", code: "BAM", number: "977" },
  { symbol: "$", name: "Barbados Dollar", code: "BBD", number: "052" },
  { symbol: "৳", name: "Taka", code: "BDT", number: "050" },
  { symbol: "лв", name: "Bulgarian Lev", code: "BGN", number: "975" },
  { symbol: ".د.ب", name: "Bahraini Dinar", code: "BHD", number: "048" },
  { symbol: "FBu", name: "Burundi Franc", code: "BIF", number: "108" },
  { symbol: "$", name: "Bermudian Dollar", code: "BMD", number: "060" },
  { symbol: "$", name: "Brunei Dollar", code: "BND", number: "096" },
  { symbol: "$b", name: "Boliviano", code: "BOB", number: "068" },
  {
    symbol: "BOV",
    name: "Mvdol",
    code: "BOV",
    number: "984"
  },
  { symbol: "R$", name: "Brazilian Real", code: "BRL", number: "986" },
  { symbol: "$", name: "Bahamian Dollar", code: "BSD", number: "044" },
  { symbol: "₿", name: "", code: "BTC", number: "" },
  { symbol: "Nu.", name: "Ngultrum", code: "BTN", number: "064" },
  { symbol: "P", name: "Pula", code: "BWP", number: "072" },
  { symbol: "Br", name: "Belarusian Ruble", code: "BYN", number: "933" },
  { symbol: "Br", name: "", code: "BYR", number: "" },
  { symbol: "BZ$", name: "Belize Dollar", code: "BZD", number: "084" },
  { symbol: "$", name: "Canadian Dollar", code: "CAD", number: "124" },
  { symbol: "FC", name: "Congolese Franc", code: "CDF", number: "976" },
  {
    symbol: "CHE",
    name: "WIR Euro",
    code: "CHE",
    number: "947"
  },
  { symbol: "₣", name: "Swiss Franc", code: "CHF", number: "756" },
  {
    symbol: "CHW",
    name: "WIR Franc",
    code: "CHW",
    number: "948"
  },
  {
    symbol: "CLF",
    name: "Unidad de Fomento",
    code: "CLF",
    number: "990"
  },
  { symbol: "$", name: "Chilean Peso", code: "CLP", number: "152" },
  { symbol: "¥", name: "", code: "CNH", number: "" },
  { symbol: "¥", name: "Yuan Renminbi", code: "CNY", number: "156" },
  { symbol: "$", name: "Colombian Peso", code: "COP", number: "170" },
  {
    symbol: "COU",
    name: "Unidad de Valor Real",
    code: "COU",
    number: "970"
  },
  { symbol: "₡", name: "Costa Rican Colon", code: "CRC", number: "188" },
  { symbol: "$", name: "Peso Convertible", code: "CUC", number: "931" },
  { symbol: "₱", name: "Cuban Peso", code: "CUP", number: "192" },
  { symbol: "$", name: "Cabo Verde Escudo", code: "CVE", number: "132" },
  { symbol: "Kč", name: "Czech Koruna", code: "CZK", number: "203" },
  { symbol: "Fdj", name: "Djibouti Franc", code: "DJF", number: "262" },
  { symbol: "kr", name: "Danish Krone", code: "DKK", number: "208" },
  { symbol: "RD$", name: "Dominican Peso", code: "DOP", number: "214" },
  { symbol: "دج", name: "Algerian Dinar", code: "DZD", number: "012" },
  { symbol: "kr", name: "", code: "EEK", number: "" },
  { symbol: "E£", name: "Egyptian Pound", code: "EGP", number: "818" },
  { symbol: "Nfk", name: "Nakfa", code: "ERN", number: "232" },
  { symbol: "Br", name: "Ethiopian Birr", code: "ETB", number: "230" },
  { symbol: "Ξ", name: "", code: "ETH", number: "" },
  { symbol: "€", name: "Euro", code: "EUR", number: "978" },
  { symbol: "$", name: "Fiji Dollar", code: "FJD", number: "242" },
  { symbol: "£", name: "Falkland Islands Pound", code: "FKP", number: "238" },
  { symbol: "£", name: "Pound Sterling", code: "GBP", number: "826" },
  { symbol: "₾", name: "Lari", code: "GEL", number: "981" },
  { symbol: "£", name: "", code: "GGP", number: "" },
  { symbol: "₵", name: "", code: "GHC", number: "" },
  { symbol: "GH₵", name: "Ghana Cedi", code: "GHS", number: "936" },
  { symbol: "£", name: "Gibraltar Pound", code: "GIP", number: "292" },
  { symbol: "D", name: "Dalasi", code: "GMD", number: "270" },
  { symbol: "FG", name: "Guinean Franc", code: "GNF", number: "324" },
  { symbol: "Q", name: "Quetzal", code: "GTQ", number: "320" },
  { symbol: "$", name: "Guyana Dollar", code: "GYD", number: "328" },
  { symbol: "$", name: "Hong Kong Dollar", code: "HKD", number: "344" },
  { symbol: "L", name: "Lempira", code: "HNL", number: "340" },
  { symbol: "kn", name: "", code: "HRK", number: "" },
  { symbol: "G", name: "Gourde", code: "HTG", number: "332" },
  { symbol: "Ft", name: "Forint", code: "HUF", number: "348" },
  { symbol: "Rp", name: "Rupiah", code: "IDR", number: "360" },
  { symbol: "₪", name: "New Israeli Sheqel", code: "ILS", number: "376" },
  { symbol: "£", name: "", code: "IMP", number: "" },
  { symbol: "₹", name: "Indian Rupee", code: "INR", number: "356" },
  { symbol: "د.ع", name: "Iraqi Dinar", code: "IQD", number: "368" },
  { symbol: "﷼", name: "Iranian Rial", code: "IRR", number: "364" },
  { symbol: "kr", name: "Iceland Krona", code: "ISK", number: "352" },
  { symbol: "£", name: "", code: "JEP", number: "" },
  { symbol: "J$", name: "Jamaican Dollar", code: "JMD", number: "388" },
  { symbol: "JD", name: "Jordanian Dinar", code: "JOD", number: "400" },
  { symbol: "¥", name: "Yen", code: "JPY", number: "392" },
  { symbol: "KSh", name: "Kenyan Shilling", code: "KES", number: "404" },
  { symbol: "лв", name: "Som", code: "KGS", number: "417" },
  { symbol: "៛", name: "Riel", code: "KHR", number: "116" },
  { symbol: "CF", name: "Comorian Franc", code: "KMF", number: "174" },
  { symbol: "₩", name: "North Korean Won", code: "KPW", number: "408" },
  { symbol: "₩", name: "Won", code: "KRW", number: "410" },
  { symbol: "KD", name: "Kuwaiti Dinar", code: "KWD", number: "414" },
  { symbol: "$", name: "Cayman Islands Dollar", code: "KYD", number: "136" },
  { symbol: "₸", name: "Tenge", code: "KZT", number: "398" },
  { symbol: "₭", name: "Lao Kip", code: "LAK", number: "418" },
  { symbol: "£", name: "Lebanese Pound", code: "LBP", number: "422" },
  { symbol: "₨", name: "Sri Lanka Rupee", code: "LKR", number: "144" },
  { symbol: "$", name: "Liberian Dollar", code: "LRD", number: "430" },
  { symbol: "M", name: "Loti", code: "LSL", number: "426" },
  { symbol: "Ł", name: "", code: "LTC", number: "" },
  { symbol: "Lt", name: "", code: "LTL", number: "" },
  { symbol: "Ls", name: "", code: "LVL", number: "" },
  { symbol: "LD", name: "Libyan Dinar", code: "LYD", number: "434" },
  { symbol: "MAD", name: "Moroccan Dirham", code: "MAD", number: "504" },
  { symbol: "lei", name: "Moldovan Leu", code: "MDL", number: "498" },
  { symbol: "Ar", name: "Malagasy Ariary", code: "MGA", number: "969" },
  { symbol: "ден", name: "Denar", code: "MKD", number: "807" },
  { symbol: "K", name: "Kyat", code: "MMK", number: "104" },
  { symbol: "₮", name: "Tugrik", code: "MNT", number: "496" },
  { symbol: "MOP$", name: "Pataca", code: "MOP", number: "446" },
  { symbol: "UM", name: "", code: "MRO", number: "" },
  { symbol: "UM", name: "Ouguiya", code: "MRU", number: "929" },
  { symbol: "₨", name: "Mauritius Rupee", code: "MUR", number: "480" },
  { symbol: "Rf", name: "Rufiyaa", code: "MVR", number: "462" },
  { symbol: "MK", name: "Malawi Kwacha", code: "MWK", number: "454" },
  { symbol: "$", name: "Mexican Peso", code: "MXN", number: "484" },
  {
    symbol: "MXV",
    name: "Mexican Unidad de Inversion (UDI)",
    code: "MXV",
    number: "979"
  },
  { symbol: "RM", name: "Malaysian Ringgit", code: "MYR", number: "458" },
  { symbol: "MT", name: "Mozambique Metical", code: "MZN", number: "943" },
  { symbol: "$", name: "Namibia Dollar", code: "NAD", number: "516" },
  { symbol: "₦", name: "Naira", code: "NGN", number: "566" },
  { symbol: "C$", name: "Cordoba Oro", code: "NIO", number: "558" },
  { symbol: "kr", name: "Norwegian Krone", code: "NOK", number: "578" },
  { symbol: "₨", name: "Nepalese Rupee", code: "NPR", number: "524" },
  { symbol: "$", name: "New Zealand Dollar", code: "NZD", number: "554" },
  { symbol: "﷼", name: "Rial Omani", code: "OMR", number: "512" },
  { symbol: "B/.", name: "Balboa", code: "PAB", number: "590" },
  { symbol: "S/.", name: "Sol", code: "PEN", number: "604" },
  { symbol: "K", name: "Kina", code: "PGK", number: "598" },
  { symbol: "₱", name: "Philippine Peso", code: "PHP", number: "608" },
  { symbol: "₨", name: "Pakistan Rupee", code: "PKR", number: "586" },
  { symbol: "zł", name: "Zloty", code: "PLN", number: "985" },
  { symbol: "Gs", name: "Guarani", code: "PYG", number: "600" },
  { symbol: "﷼", name: "Qatari Rial", code: "QAR", number: "634" },
  { symbol: "￥", name: "", code: "RMB", number: "" },
  { symbol: "lei", name: "Romanian Leu", code: "RON", number: "946" },
  { symbol: "Дин.", name: "Serbian Dinar", code: "RSD", number: "941" },
  { symbol: "₽", name: "Russian Ruble", code: "RUB", number: "643" },
  { symbol: "R₣", name: "Rwanda Franc", code: "RWF", number: "646" },
  { symbol: "﷼", name: "Saudi Riyal", code: "SAR", number: "682" },
  { symbol: "$", name: "Solomon Islands Dollar", code: "SBD", number: "090" },
  { symbol: "₨", name: "Seychelles Rupee", code: "SCR", number: "690" },
  { symbol: "ج.س.", name: "Sudanese Pound", code: "SDG", number: "938" },
  { symbol: "kr", name: "Swedish Krona", code: "SEK", number: "752" },
  { symbol: "S$", name: "Singapore Dollar", code: "SGD", number: "702" },
  { symbol: "£", name: "Saint Helena Pound", code: "SHP", number: "654" },
  { symbol: "Le", name: "", code: "SLL", number: "" },
  { symbol: "S", name: "Somali Shilling", code: "SOS", number: "706" },
  { symbol: "$", name: "Surinam Dollar", code: "SRD", number: "968" },
  { symbol: "£", name: "South Sudanese Pound", code: "SSP", number: "728" },
  { symbol: "Db", name: "", code: "STD", number: "" },
  { symbol: "Db", name: "Dobra", code: "STN", number: "930" },
  { symbol: "$", name: "El Salvador Colon", code: "SVC", number: "222" },
  { symbol: "£", name: "Syrian Pound", code: "SYP", number: "760" },
  { symbol: "E", name: "Lilangeni", code: "SZL", number: "748" },
  { symbol: "฿", name: "Baht", code: "THB", number: "764" },
  { symbol: "SM", name: "Somoni", code: "TJS", number: "972" },
  { symbol: "T", name: "Turkmenistan New Manat", code: "TMT", number: "934" },
  { symbol: "د.ت", name: "Tunisian Dinar", code: "TND", number: "788" },
  { symbol: "T$", name: "Pa’anga", code: "TOP", number: "776" },
  { symbol: "₤", name: "", code: "TRL", number: "" },
  { symbol: "₺", name: "Turkish Lira", code: "TRY", number: "949" },
  {
    symbol: "TT$",
    name: "Trinidad and Tobago Dollar",
    code: "TTD",
    number: "780"
  },
  { symbol: "$", name: "", code: "TVD", number: "" },
  { symbol: "NT$", name: "New Taiwan Dollar", code: "TWD", number: "901" },
  { symbol: "TSh", name: "Tanzanian Shilling", code: "TZS", number: "834" },
  { symbol: "₴", name: "Hryvnia", code: "UAH", number: "980" },
  { symbol: "USh", name: "Uganda Shilling", code: "UGX", number: "800" },
  { symbol: "$", name: "US Dollar", code: "USD", number: "840" },
  {
    symbol: "UYI",
    name: "Uruguay Peso en Unidades Indexadas (UI)",
    code: "UYI",
    number: "940"
  },
  { symbol: "$U", name: "Peso Uruguayo", code: "UYU", number: "858" },
  { symbol: "UYW", name: "Unidad Previsional", code: "UYW", number: "927" },
  { symbol: "лв", name: "Uzbekistan Sum", code: "UZS", number: "860" },
  { symbol: "Bs", name: "", code: "VEF", number: "" },
  { symbol: "Bs.S", name: "Bolívar Soberano", code: "VES", number: "928" },
  { symbol: "₫", name: "Dong", code: "VND", number: "704" },
  { symbol: "VT", name: "Vatu", code: "VUV", number: "548" },
  { symbol: "WS$", name: "Tala", code: "WST", number: "882" },
  { symbol: "FCFA", name: "CFA Franc BEAC", code: "XAF", number: "950" },
  { symbol: "Ƀ", name: "", code: "XBT", number: "" },
  { symbol: "$", name: "East Caribbean Dollar", code: "XCD", number: "951" },
  { symbol: "CFA", name: "CFA Franc BCEAO", code: "XOF", number: "952" },
  { symbol: "₣", name: "CFP Franc", code: "XPF", number: "953" },
  { symbol: "Sucre", name: "Sucre", code: "XSU", number: "994" },
  { symbol: "XUA", name: "ADB Unit of Account", code: "XUA", number: "965" },
  { symbol: "﷼", name: "Yemeni Rial", code: "YER", number: "886" },
  { symbol: "R", name: "Rand", code: "ZAR", number: "710" },
  { symbol: "ZK", name: "Zambian Kwacha", code: "ZMW", number: "967" },
  { symbol: "Z$", name: "Zimbabwean Dollar", code: "ZWD", number: "" },
  { symbol: "$", name: "Zimbabwean Dollar", code: "ZWL", number: "" }
];
function wC(e) {
  return typeof e != "string" ? void 0 : xC.find(
    (n) => n.code === e.toUpperCase()
  )?.symbol ?? void 0;
}
const ci = [
  {
    alpha2: "AC",
    alpha3: "ASC",
    countryCallingCodes: ["+247"],
    currencies: ["USD"],
    emoji: "🇦🇨",
    ioc: "SHP",
    languages: ["eng"],
    name: "Ascension Island",
    status: "reserved"
  },
  {
    alpha2: "AD",
    alpha3: "AND",
    countryCallingCodes: ["+376"],
    currencies: ["EUR"],
    emoji: "🇦🇩",
    ioc: "AND",
    languages: ["cat"],
    name: "Andorra",
    status: "assigned"
  },
  {
    alpha2: "AE",
    alpha3: "ARE",
    countryCallingCodes: ["+971"],
    currencies: ["AED"],
    emoji: "🇦🇪",
    ioc: "UAE",
    languages: ["ara"],
    name: "United Arab Emirates",
    status: "assigned"
  },
  {
    alpha2: "AF",
    alpha3: "AFG",
    countryCallingCodes: ["+93"],
    currencies: ["AFN"],
    emoji: "🇦🇫",
    ioc: "AFG",
    languages: ["pus"],
    name: "Afghanistan",
    status: "assigned"
  },
  {
    alpha2: "AG",
    alpha3: "ATG",
    countryCallingCodes: ["+1 268"],
    currencies: ["XCD"],
    emoji: "🇦🇬",
    ioc: "ANT",
    languages: ["eng"],
    name: "Antigua And Barbuda",
    status: "assigned"
  },
  {
    alpha2: "AI",
    alpha3: "AIA",
    countryCallingCodes: ["+1 264"],
    currencies: ["XCD"],
    emoji: "🇦🇮",
    ioc: "",
    languages: ["eng"],
    name: "Anguilla",
    status: "assigned"
  },
  {
    alpha2: "AI",
    alpha3: "AFI",
    countryCallingCodes: [],
    currencies: [],
    ioc: "",
    languages: [],
    name: "French Afar and Issas",
    status: "deleted"
  },
  {
    alpha2: "AL",
    alpha3: "ALB",
    countryCallingCodes: ["+355"],
    currencies: ["ALL"],
    emoji: "🇦🇱",
    ioc: "ALB",
    languages: ["sqi"],
    name: "Albania",
    status: "assigned"
  },
  {
    alpha2: "AM",
    alpha3: "ARM",
    countryCallingCodes: ["+374"],
    currencies: ["AMD"],
    emoji: "🇦🇲",
    ioc: "ARM",
    languages: ["hye", "rus"],
    name: "Armenia",
    status: "assigned"
  },
  {
    alpha2: "AN",
    alpha3: "ANT",
    countryCallingCodes: [],
    currencies: [],
    ioc: "",
    languages: [],
    name: "Netherlands Antilles",
    status: "deleted"
  },
  {
    alpha2: "AO",
    alpha3: "AGO",
    countryCallingCodes: ["+244"],
    currencies: ["AOA"],
    emoji: "🇦🇴",
    ioc: "ANG",
    languages: ["por"],
    name: "Angola",
    status: "assigned"
  },
  {
    alpha2: "AQ",
    alpha3: "ATA",
    countryCallingCodes: ["+672"],
    currencies: [],
    emoji: "🇦🇶",
    ioc: "",
    languages: [],
    name: "Antarctica",
    status: "assigned"
  },
  {
    alpha2: "AR",
    alpha3: "ARG",
    countryCallingCodes: ["+54"],
    currencies: ["ARS"],
    emoji: "🇦🇷",
    ioc: "ARG",
    languages: ["spa"],
    name: "Argentina",
    status: "assigned"
  },
  {
    alpha2: "AS",
    alpha3: "ASM",
    countryCallingCodes: ["+1 684"],
    currencies: ["USD"],
    emoji: "🇦🇸",
    ioc: "ASA",
    languages: ["eng", "smo"],
    name: "American Samoa",
    status: "assigned"
  },
  {
    alpha2: "AT",
    alpha3: "AUT",
    countryCallingCodes: ["+43"],
    currencies: ["EUR"],
    emoji: "🇦🇹",
    ioc: "AUT",
    languages: ["deu"],
    name: "Austria",
    status: "assigned"
  },
  {
    alpha2: "AU",
    alpha3: "AUS",
    countryCallingCodes: ["+61"],
    currencies: ["AUD"],
    emoji: "🇦🇺",
    ioc: "AUS",
    languages: ["eng"],
    name: "Australia",
    status: "assigned"
  },
  {
    alpha2: "AW",
    alpha3: "ABW",
    countryCallingCodes: ["+297"],
    currencies: ["AWG"],
    emoji: "🇦🇼",
    ioc: "ARU",
    languages: ["nld"],
    name: "Aruba",
    status: "assigned"
  },
  {
    alpha2: "AX",
    alpha3: "ALA",
    countryCallingCodes: ["+358"],
    currencies: ["EUR"],
    emoji: "🇦🇽",
    ioc: "",
    languages: ["swe"],
    name: "Åland Islands",
    status: "assigned"
  },
  {
    alpha2: "AZ",
    alpha3: "AZE",
    countryCallingCodes: ["+994"],
    currencies: ["AZN"],
    emoji: "🇦🇿",
    ioc: "AZE",
    languages: ["aze"],
    name: "Azerbaijan",
    status: "assigned"
  },
  {
    alpha2: "BA",
    alpha3: "BIH",
    countryCallingCodes: ["+387"],
    currencies: ["BAM"],
    emoji: "🇧🇦",
    ioc: "BIH",
    languages: ["bos", "cre", "srp"],
    name: "Bosnia & Herzegovina",
    status: "assigned"
  },
  {
    alpha2: "BB",
    alpha3: "BRB",
    countryCallingCodes: ["+1 246"],
    currencies: ["BBD"],
    emoji: "🇧🇧",
    ioc: "BAR",
    languages: ["eng"],
    name: "Barbados",
    status: "assigned"
  },
  {
    alpha2: "BD",
    alpha3: "BGD",
    countryCallingCodes: ["+880"],
    currencies: ["BDT"],
    emoji: "🇧🇩",
    ioc: "BAN",
    languages: ["ben"],
    name: "Bangladesh",
    status: "assigned"
  },
  {
    alpha2: "BE",
    alpha3: "BEL",
    countryCallingCodes: ["+32"],
    currencies: ["EUR"],
    emoji: "🇧🇪",
    ioc: "BEL",
    languages: ["nld", "fra", "deu"],
    name: "Belgium",
    status: "assigned"
  },
  {
    alpha2: "BF",
    alpha3: "BFA",
    countryCallingCodes: ["+226"],
    currencies: ["XOF"],
    emoji: "🇧🇫",
    ioc: "BUR",
    languages: ["fra"],
    name: "Burkina Faso",
    status: "assigned"
  },
  {
    alpha2: "BG",
    alpha3: "BGR",
    countryCallingCodes: ["+359"],
    currencies: ["BGN"],
    emoji: "🇧🇬",
    ioc: "BUL",
    languages: ["bul"],
    name: "Bulgaria",
    status: "assigned"
  },
  {
    alpha2: "BH",
    alpha3: "BHR",
    countryCallingCodes: ["+973"],
    currencies: ["BHD"],
    emoji: "🇧🇭",
    ioc: "BRN",
    languages: ["ara"],
    name: "Bahrain",
    status: "assigned"
  },
  {
    alpha2: "BI",
    alpha3: "BDI",
    countryCallingCodes: ["+257"],
    currencies: ["BIF"],
    emoji: "🇧🇮",
    ioc: "BDI",
    languages: ["fra"],
    name: "Burundi",
    status: "assigned"
  },
  {
    alpha2: "BJ",
    alpha3: "BEN",
    countryCallingCodes: ["+229"],
    currencies: ["XOF"],
    emoji: "🇧🇯",
    ioc: "BEN",
    languages: ["fra"],
    name: "Benin",
    status: "assigned"
  },
  {
    alpha2: "BL",
    alpha3: "BLM",
    countryCallingCodes: ["+590"],
    currencies: ["EUR"],
    emoji: "🇧🇱",
    ioc: "",
    languages: ["fra"],
    name: "Saint Barthélemy",
    status: "assigned"
  },
  {
    alpha2: "BM",
    alpha3: "BMU",
    countryCallingCodes: ["+1 441"],
    currencies: ["BMD"],
    emoji: "🇧🇲",
    ioc: "BER",
    languages: ["eng"],
    name: "Bermuda",
    status: "assigned"
  },
  {
    alpha2: "BN",
    alpha3: "BRN",
    countryCallingCodes: ["+673"],
    currencies: ["BND"],
    emoji: "🇧🇳",
    ioc: "BRU",
    languages: ["msa", "eng"],
    name: "Brunei Darussalam",
    status: "assigned"
  },
  {
    alpha2: "BO",
    alpha3: "BOL",
    countryCallingCodes: ["+591"],
    currencies: ["BOB", "BOV"],
    emoji: "🇧🇴",
    ioc: "BOL",
    languages: ["spa", "aym", "que"],
    name: "Bolivia, Plurinational State Of",
    status: "assigned"
  },
  {
    alpha2: "BQ",
    alpha3: "BES",
    countryCallingCodes: ["+599"],
    currencies: ["USD"],
    emoji: "🇧🇶",
    ioc: "",
    languages: ["nld"],
    name: "Bonaire, Sint Eustatius And Saba",
    status: "assigned"
  },
  {
    alpha2: "BQ",
    alpha3: "ATB",
    countryCallingCodes: [],
    currencies: [],
    ioc: "",
    languages: [],
    name: "British Antarctic Territory",
    status: "deleted"
  },
  {
    alpha2: "BR",
    alpha3: "BRA",
    countryCallingCodes: ["+55"],
    currencies: ["BRL"],
    emoji: "🇧🇷",
    ioc: "BRA",
    languages: ["por"],
    name: "Brazil",
    status: "assigned"
  },
  {
    alpha2: "BS",
    alpha3: "BHS",
    countryCallingCodes: ["+1 242"],
    currencies: ["BSD"],
    emoji: "🇧🇸",
    ioc: "BAH",
    languages: ["eng"],
    name: "Bahamas",
    status: "assigned"
  },
  {
    alpha2: "BT",
    alpha3: "BTN",
    countryCallingCodes: ["+975"],
    currencies: ["INR", "BTN"],
    emoji: "🇧🇹",
    ioc: "BHU",
    languages: ["dzo"],
    name: "Bhutan",
    status: "assigned"
  },
  {
    alpha2: "BU",
    alpha3: "BUR",
    countryCallingCodes: [],
    currencies: [],
    ioc: "",
    languages: [],
    name: "Burma",
    status: "deleted"
  },
  {
    alpha2: "BV",
    alpha3: "BVT",
    countryCallingCodes: [],
    currencies: ["NOK"],
    emoji: "🇧🇻",
    ioc: "",
    languages: [],
    name: "Bouvet Island",
    status: "assigned"
  },
  {
    alpha2: "BW",
    alpha3: "BWA",
    countryCallingCodes: ["+267"],
    currencies: ["BWP"],
    emoji: "🇧🇼",
    ioc: "BOT",
    languages: ["eng", "tsn"],
    name: "Botswana",
    status: "assigned"
  },
  {
    alpha2: "BY",
    alpha3: "BLR",
    countryCallingCodes: ["+375"],
    currencies: ["BYN"],
    emoji: "🇧🇾",
    ioc: "BLR",
    languages: ["bel", "rus"],
    name: "Belarus",
    status: "assigned"
  },
  {
    alpha2: "BY",
    alpha3: "BYS",
    countryCallingCodes: [],
    currencies: [],
    ioc: "",
    languages: [],
    name: "Byelorussian SSR",
    status: "deleted"
  },
  {
    alpha2: "BZ",
    alpha3: "BLZ",
    countryCallingCodes: ["+501"],
    currencies: ["BZD"],
    emoji: "🇧🇿",
    ioc: "BIZ",
    languages: ["eng"],
    name: "Belize",
    status: "assigned"
  },
  {
    alpha2: "CA",
    alpha3: "CAN",
    countryCallingCodes: ["+1"],
    currencies: ["CAD"],
    emoji: "🇨🇦",
    ioc: "CAN",
    languages: ["eng", "fra"],
    name: "Canada",
    status: "assigned"
  },
  {
    alpha2: "CC",
    alpha3: "CCK",
    countryCallingCodes: ["+61"],
    currencies: ["AUD"],
    emoji: "🇨🇨",
    ioc: "",
    languages: ["eng"],
    name: "Cocos (Keeling) Islands",
    status: "assigned"
  },
  {
    alpha2: "CD",
    alpha3: "COD",
    countryCallingCodes: ["+243"],
    currencies: ["CDF"],
    emoji: "🇨🇩",
    ioc: "COD",
    languages: ["fra", "lin", "kon", "swa"],
    name: "Democratic Republic Of Congo",
    status: "assigned"
  },
  {
    alpha2: "CF",
    alpha3: "CAF",
    countryCallingCodes: ["+236"],
    currencies: ["XAF"],
    emoji: "🇨🇫",
    ioc: "CAF",
    languages: ["fra", "sag"],
    name: "Central African Republic",
    status: "assigned"
  },
  {
    alpha2: "CG",
    alpha3: "COG",
    countryCallingCodes: ["+242"],
    currencies: ["XAF"],
    emoji: "🇨🇬",
    ioc: "CGO",
    languages: ["fra", "lin"],
    name: "Republic Of Congo",
    status: "assigned"
  },
  {
    alpha2: "CH",
    alpha3: "CHE",
    countryCallingCodes: ["+41"],
    currencies: ["CHF", "CHE", "CHW"],
    emoji: "🇨🇭",
    ioc: "SUI",
    languages: ["deu", "fra", "ita", "roh"],
    name: "Switzerland",
    status: "assigned"
  },
  {
    alpha2: "CI",
    alpha3: "CIV",
    countryCallingCodes: ["+225"],
    currencies: ["XOF"],
    emoji: "🇨🇮",
    ioc: "CIV",
    languages: ["fra"],
    name: "Côte d'Ivoire",
    status: "assigned"
  },
  {
    alpha2: "CK",
    alpha3: "COK",
    countryCallingCodes: ["+682"],
    currencies: ["NZD"],
    emoji: "🇨🇰",
    ioc: "COK",
    languages: ["eng", "mri"],
    name: "Cook Islands",
    status: "assigned"
  },
  {
    alpha2: "CL",
    alpha3: "CHL",
    countryCallingCodes: ["+56"],
    currencies: ["CLP", "CLF"],
    emoji: "🇨🇱",
    ioc: "CHI",
    languages: ["spa"],
    name: "Chile",
    status: "assigned"
  },
  {
    alpha2: "CM",
    alpha3: "CMR",
    countryCallingCodes: ["+237"],
    currencies: ["XAF"],
    emoji: "🇨🇲",
    ioc: "CMR",
    languages: ["eng", "fra"],
    name: "Cameroon",
    status: "assigned"
  },
  {
    alpha2: "CN",
    alpha3: "CHN",
    countryCallingCodes: ["+86"],
    currencies: ["CNY"],
    emoji: "🇨🇳",
    ioc: "CHN",
    languages: ["zho"],
    name: "China",
    status: "assigned"
  },
  {
    alpha2: "CO",
    alpha3: "COL",
    countryCallingCodes: ["+57"],
    currencies: ["COP", "COU"],
    emoji: "🇨🇴",
    ioc: "COL",
    languages: ["spa"],
    name: "Colombia",
    status: "assigned"
  },
  {
    alpha2: "CP",
    alpha3: "CPT",
    countryCallingCodes: [],
    currencies: ["EUR"],
    emoji: "🇨🇵",
    ioc: "",
    languages: [],
    name: "Clipperton Island",
    status: "reserved"
  },
  {
    alpha2: "CR",
    alpha3: "CRI",
    countryCallingCodes: ["+506"],
    currencies: ["CRC"],
    emoji: "🇨🇷",
    ioc: "CRC",
    languages: ["spa"],
    name: "Costa Rica",
    status: "assigned"
  },
  {
    alpha2: "CS",
    alpha3: "CSK",
    countryCallingCodes: [],
    currencies: [],
    ioc: "",
    languages: [],
    name: "Czechoslovakia",
    status: "deleted"
  },
  {
    alpha2: "CS",
    alpha3: "SCG",
    countryCallingCodes: [],
    currencies: [],
    ioc: "",
    languages: [],
    name: "Serbia and Montenegro",
    status: "deleted"
  },
  {
    alpha2: "CT",
    alpha3: "CTE",
    countryCallingCodes: [],
    currencies: [],
    ioc: "",
    languages: [],
    name: "Canton and Enderbury Islands",
    status: "deleted"
  },
  {
    alpha2: "CU",
    alpha3: "CUB",
    countryCallingCodes: ["+53"],
    currencies: ["CUP", "CUC"],
    emoji: "🇨🇺",
    ioc: "CUB",
    languages: ["spa"],
    name: "Cuba",
    status: "assigned"
  },
  {
    alpha2: "CV",
    alpha3: "CPV",
    countryCallingCodes: ["+238"],
    currencies: ["CVE"],
    emoji: "🇨🇻",
    ioc: "CPV",
    languages: ["por"],
    name: "Cabo Verde",
    status: "assigned"
  },
  {
    alpha2: "CW",
    alpha3: "CUW",
    countryCallingCodes: ["+599"],
    currencies: ["ANG"],
    emoji: "🇨🇼",
    ioc: "",
    languages: ["nld"],
    name: "Curacao",
    status: "assigned"
  },
  {
    alpha2: "CX",
    alpha3: "CXR",
    countryCallingCodes: ["+61"],
    currencies: ["AUD"],
    emoji: "🇨🇽",
    ioc: "",
    languages: ["eng"],
    name: "Christmas Island",
    status: "assigned"
  },
  {
    alpha2: "CY",
    alpha3: "CYP",
    countryCallingCodes: ["+357"],
    currencies: ["EUR"],
    emoji: "🇨🇾",
    ioc: "CYP",
    languages: ["ell", "tur"],
    name: "Cyprus",
    status: "assigned"
  },
  {
    alpha2: "CZ",
    alpha3: "CZE",
    countryCallingCodes: ["+420"],
    currencies: ["CZK"],
    emoji: "🇨🇿",
    ioc: "CZE",
    languages: ["ces"],
    name: "Czech Republic",
    status: "assigned"
  },
  {
    alpha2: "DD",
    alpha3: "DDR",
    countryCallingCodes: [],
    currencies: [],
    ioc: "",
    languages: [],
    name: "German Democratic Republic",
    status: "deleted"
  },
  {
    alpha2: "DE",
    alpha3: "DEU",
    countryCallingCodes: ["+49"],
    currencies: ["EUR"],
    emoji: "🇩🇪",
    ioc: "GER",
    languages: ["deu"],
    name: "Germany",
    status: "assigned"
  },
  {
    alpha2: "DG",
    alpha3: "DGA",
    countryCallingCodes: [],
    currencies: ["USD"],
    emoji: "🇩🇬",
    ioc: "",
    languages: [],
    name: "Diego Garcia",
    status: "reserved"
  },
  {
    alpha2: "DJ",
    alpha3: "DJI",
    countryCallingCodes: ["+253"],
    currencies: ["DJF"],
    emoji: "🇩🇯",
    ioc: "DJI",
    languages: ["ara", "fra"],
    name: "Djibouti",
    status: "assigned"
  },
  {
    alpha2: "DK",
    alpha3: "DNK",
    countryCallingCodes: ["+45"],
    currencies: ["DKK"],
    emoji: "🇩🇰",
    ioc: "DEN",
    languages: ["dan"],
    name: "Denmark",
    status: "assigned"
  },
  {
    alpha2: "DM",
    alpha3: "DMA",
    countryCallingCodes: ["+1 767"],
    currencies: ["XCD"],
    emoji: "🇩🇲",
    ioc: "DMA",
    languages: ["eng"],
    name: "Dominica",
    status: "assigned"
  },
  {
    alpha2: "DO",
    alpha3: "DOM",
    countryCallingCodes: ["+1 809", "+1 829", "+1 849"],
    currencies: ["DOP"],
    emoji: "🇩🇴",
    ioc: "DOM",
    languages: ["spa"],
    name: "Dominican Republic",
    status: "assigned"
  },
  {
    alpha2: "DY",
    alpha3: "DHY",
    countryCallingCodes: [],
    currencies: [],
    ioc: "",
    languages: [],
    name: "Dahomey",
    status: "deleted"
  },
  {
    alpha2: "DZ",
    alpha3: "DZA",
    countryCallingCodes: ["+213"],
    currencies: ["DZD"],
    emoji: "🇩🇿",
    ioc: "ALG",
    languages: ["ara"],
    name: "Algeria",
    status: "assigned"
  },
  {
    alpha2: "EA",
    alpha3: "",
    countryCallingCodes: [],
    currencies: ["EUR"],
    emoji: "🇪🇦",
    ioc: "",
    languages: [],
    name: "Ceuta, Mulilla",
    status: "reserved"
  },
  {
    alpha2: "EC",
    alpha3: "ECU",
    countryCallingCodes: ["+593"],
    currencies: ["USD"],
    emoji: "🇪🇨",
    ioc: "ECU",
    languages: ["spa", "que"],
    name: "Ecuador",
    status: "assigned"
  },
  {
    alpha2: "EE",
    alpha3: "EST",
    countryCallingCodes: ["+372"],
    currencies: ["EUR"],
    emoji: "🇪🇪",
    ioc: "EST",
    languages: ["est"],
    name: "Estonia",
    status: "assigned"
  },
  {
    alpha2: "EG",
    alpha3: "EGY",
    countryCallingCodes: ["+20"],
    currencies: ["EGP"],
    emoji: "🇪🇬",
    ioc: "EGY",
    languages: ["ara"],
    name: "Egypt",
    status: "assigned"
  },
  {
    alpha2: "EH",
    alpha3: "ESH",
    countryCallingCodes: ["+212"],
    currencies: ["MAD"],
    emoji: "🇪🇭",
    ioc: "",
    languages: [],
    name: "Western Sahara",
    status: "assigned"
  },
  {
    alpha2: "ER",
    alpha3: "ERI",
    countryCallingCodes: ["+291"],
    currencies: ["ERN"],
    emoji: "🇪🇷",
    ioc: "ERI",
    languages: ["eng", "ara", "tir"],
    name: "Eritrea",
    status: "assigned"
  },
  {
    alpha2: "ES",
    alpha3: "ESP",
    countryCallingCodes: ["+34"],
    currencies: ["EUR"],
    emoji: "🇪🇸",
    ioc: "ESP",
    languages: ["spa", "cat", "glg", "eus"],
    name: "Spain",
    status: "assigned"
  },
  {
    alpha2: "ET",
    alpha3: "ETH",
    countryCallingCodes: ["+251"],
    currencies: ["ETB"],
    emoji: "🇪🇹",
    ioc: "ETH",
    languages: ["amh"],
    name: "Ethiopia",
    status: "assigned"
  },
  {
    alpha2: "EU",
    alpha3: "EUE",
    countryCallingCodes: ["+388"],
    currencies: ["EUR"],
    emoji: "🇪🇺",
    ioc: "",
    languages: [],
    name: "European Union",
    status: "reserved"
  },
  {
    alpha2: "FI",
    alpha3: "FIN",
    countryCallingCodes: ["+358"],
    currencies: ["EUR"],
    emoji: "🇫🇮",
    ioc: "FIN",
    languages: ["fin", "swe"],
    name: "Finland",
    status: "assigned"
  },
  {
    alpha2: "FJ",
    alpha3: "FJI",
    countryCallingCodes: ["+679"],
    currencies: ["FJD"],
    emoji: "🇫🇯",
    ioc: "FIJ",
    languages: ["eng", "fij"],
    name: "Fiji",
    status: "assigned"
  },
  {
    alpha2: "FK",
    alpha3: "FLK",
    countryCallingCodes: ["+500"],
    currencies: ["FKP"],
    emoji: "🇫🇰",
    ioc: "",
    languages: ["eng"],
    name: "Falkland Islands",
    status: "assigned"
  },
  {
    alpha2: "FM",
    alpha3: "FSM",
    countryCallingCodes: ["+691"],
    currencies: ["USD"],
    emoji: "🇫🇲",
    ioc: "FSM",
    languages: ["eng"],
    name: "Micronesia, Federated States Of",
    status: "assigned"
  },
  {
    alpha2: "FO",
    alpha3: "FRO",
    countryCallingCodes: ["+298"],
    currencies: ["DKK"],
    emoji: "🇫🇴",
    ioc: "FAI",
    languages: ["fao", "dan"],
    name: "Faroe Islands",
    status: "assigned"
  },
  {
    alpha2: "FQ",
    alpha3: "ATF",
    countryCallingCodes: [],
    currencies: [],
    ioc: "",
    languages: [],
    name: "French Southern and Antarctic Territories",
    status: "deleted"
  },
  {
    alpha2: "FR",
    alpha3: "FRA",
    countryCallingCodes: ["+33"],
    currencies: ["EUR"],
    emoji: "🇫🇷",
    ioc: "FRA",
    languages: ["fra"],
    name: "France",
    status: "assigned"
  },
  {
    alpha2: "FX",
    alpha3: "FXX",
    countryCallingCodes: ["+241"],
    currencies: ["EUR"],
    emoji: "",
    ioc: "",
    languages: ["fra"],
    name: "France, Metropolitan",
    status: "reserved"
  },
  {
    alpha2: "GA",
    alpha3: "GAB",
    countryCallingCodes: ["+241"],
    currencies: ["XAF"],
    emoji: "🇬🇦",
    ioc: "GAB",
    languages: ["fra"],
    name: "Gabon",
    status: "assigned"
  },
  {
    alpha2: "GB",
    alpha3: "GBR",
    countryCallingCodes: ["+44"],
    currencies: ["GBP"],
    emoji: "🇬🇧",
    ioc: "GBR",
    languages: ["eng", "cor", "gle", "gla", "cym"],
    name: "United Kingdom",
    status: "assigned"
  },
  {
    alpha2: "GD",
    alpha3: "GRD",
    countryCallingCodes: ["+473"],
    currencies: ["XCD"],
    emoji: "🇬🇩",
    ioc: "GRN",
    languages: ["eng"],
    name: "Grenada",
    status: "assigned"
  },
  {
    alpha2: "GE",
    alpha3: "GEO",
    countryCallingCodes: ["+995"],
    currencies: ["GEL"],
    emoji: "🇬🇪",
    ioc: "GEO",
    languages: ["kat"],
    name: "Georgia",
    status: "assigned"
  },
  {
    alpha2: "GE",
    alpha3: "GEL",
    countryCallingCodes: [],
    currencies: [],
    ioc: "",
    languages: [],
    name: "Gilbert and Ellice Islands",
    status: "deleted"
  },
  {
    alpha2: "GF",
    alpha3: "GUF",
    countryCallingCodes: ["+594"],
    currencies: ["EUR"],
    emoji: "🇬🇫",
    ioc: "",
    languages: ["fra"],
    name: "French Guiana",
    status: "assigned"
  },
  {
    alpha2: "GG",
    alpha3: "GGY",
    countryCallingCodes: ["+44"],
    currencies: ["GBP"],
    emoji: "🇬🇬",
    ioc: "GCI",
    languages: ["fra"],
    name: "Guernsey",
    status: "assigned"
  },
  {
    alpha2: "GH",
    alpha3: "GHA",
    countryCallingCodes: ["+233"],
    currencies: ["GHS"],
    emoji: "🇬🇭",
    ioc: "GHA",
    languages: ["eng"],
    name: "Ghana",
    status: "assigned"
  },
  {
    alpha2: "GI",
    alpha3: "GIB",
    countryCallingCodes: ["+350"],
    currencies: ["GIP"],
    emoji: "🇬🇮",
    ioc: "",
    languages: ["eng"],
    name: "Gibraltar",
    status: "assigned"
  },
  {
    alpha2: "GL",
    alpha3: "GRL",
    countryCallingCodes: ["+299"],
    currencies: ["DKK"],
    emoji: "🇬🇱",
    ioc: "",
    languages: ["kal"],
    name: "Greenland",
    status: "assigned"
  },
  {
    alpha2: "GM",
    alpha3: "GMB",
    countryCallingCodes: ["+220"],
    currencies: ["GMD"],
    emoji: "🇬🇲",
    ioc: "GAM",
    languages: ["eng"],
    name: "Gambia",
    status: "assigned"
  },
  {
    alpha2: "GN",
    alpha3: "GIN",
    countryCallingCodes: ["+224"],
    currencies: ["GNF"],
    emoji: "🇬🇳",
    ioc: "GUI",
    languages: ["fra"],
    name: "Guinea",
    status: "assigned"
  },
  {
    alpha2: "GP",
    alpha3: "GLP",
    countryCallingCodes: ["+590"],
    currencies: ["EUR"],
    emoji: "🇬🇵",
    ioc: "",
    languages: ["fra"],
    name: "Guadeloupe",
    status: "assigned"
  },
  {
    alpha2: "GQ",
    alpha3: "GNQ",
    countryCallingCodes: ["+240"],
    currencies: ["XAF"],
    emoji: "🇬🇶",
    ioc: "GEQ",
    languages: ["spa", "fra", "por"],
    name: "Equatorial Guinea",
    status: "assigned"
  },
  {
    alpha2: "GR",
    alpha3: "GRC",
    countryCallingCodes: ["+30"],
    currencies: ["EUR"],
    emoji: "🇬🇷",
    ioc: "GRE",
    languages: ["ell"],
    name: "Greece",
    status: "assigned"
  },
  {
    alpha2: "GS",
    alpha3: "SGS",
    countryCallingCodes: ["+500"],
    currencies: ["GBP"],
    emoji: "🇬🇸",
    ioc: "",
    languages: ["eng"],
    name: "South Georgia And The South Sandwich Islands",
    status: "assigned"
  },
  {
    alpha2: "GT",
    alpha3: "GTM",
    countryCallingCodes: ["+502"],
    currencies: ["GTQ"],
    emoji: "🇬🇹",
    ioc: "GUA",
    languages: ["spa"],
    name: "Guatemala",
    status: "assigned"
  },
  {
    alpha2: "GU",
    alpha3: "GUM",
    countryCallingCodes: ["+1 671"],
    currencies: ["USD"],
    emoji: "🇬🇺",
    ioc: "GUM",
    languages: ["eng"],
    name: "Guam",
    status: "assigned"
  },
  {
    alpha2: "GW",
    alpha3: "GNB",
    countryCallingCodes: ["+245"],
    currencies: ["XOF"],
    emoji: "🇬🇼",
    ioc: "GBS",
    languages: ["por"],
    name: "Guinea-bissau",
    status: "assigned"
  },
  {
    alpha2: "GY",
    alpha3: "GUY",
    countryCallingCodes: ["+592"],
    currencies: ["GYD"],
    emoji: "🇬🇾",
    ioc: "GUY",
    languages: ["eng"],
    name: "Guyana",
    status: "assigned"
  },
  {
    alpha2: "HK",
    alpha3: "HKG",
    countryCallingCodes: ["+852"],
    currencies: ["HKD"],
    emoji: "🇭🇰",
    ioc: "HKG",
    languages: ["zho", "eng"],
    name: "Hong Kong",
    status: "assigned"
  },
  {
    alpha2: "HM",
    alpha3: "HMD",
    countryCallingCodes: [],
    currencies: ["AUD"],
    emoji: "🇭🇲",
    ioc: "",
    languages: [],
    name: "Heard Island And McDonald Islands",
    status: "assigned"
  },
  {
    alpha2: "HN",
    alpha3: "HND",
    countryCallingCodes: ["+504"],
    currencies: ["HNL"],
    emoji: "🇭🇳",
    ioc: "HON",
    languages: ["spa"],
    name: "Honduras",
    status: "assigned"
  },
  {
    alpha2: "HR",
    alpha3: "HRV",
    countryCallingCodes: ["+385"],
    currencies: ["EUR"],
    emoji: "🇭🇷",
    ioc: "CRO",
    languages: ["hrv"],
    name: "Croatia",
    status: "assigned"
  },
  {
    alpha2: "HT",
    alpha3: "HTI",
    countryCallingCodes: ["+509"],
    currencies: ["HTG", "USD"],
    emoji: "🇭🇹",
    ioc: "HAI",
    languages: ["fra", "hat"],
    name: "Haiti",
    status: "assigned"
  },
  {
    alpha2: "HU",
    alpha3: "HUN",
    countryCallingCodes: ["+36"],
    currencies: ["HUF"],
    emoji: "🇭🇺",
    ioc: "HUN",
    languages: ["hun"],
    name: "Hungary",
    status: "assigned"
  },
  {
    alpha2: "HV",
    alpha3: "HVO",
    countryCallingCodes: [],
    currencies: [],
    ioc: "",
    languages: [],
    name: "Upper Volta",
    status: "deleted"
  },
  {
    alpha2: "IC",
    alpha3: "",
    countryCallingCodes: [],
    currencies: ["EUR"],
    emoji: "🇮🇨",
    ioc: "",
    languages: [],
    name: "Canary Islands",
    status: "reserved"
  },
  {
    alpha2: "ID",
    alpha3: "IDN",
    countryCallingCodes: ["+62"],
    currencies: ["IDR"],
    emoji: "🇮🇩",
    ioc: "INA",
    languages: ["ind"],
    name: "Indonesia",
    status: "assigned"
  },
  {
    alpha2: "IE",
    alpha3: "IRL",
    countryCallingCodes: ["+353"],
    currencies: ["EUR"],
    emoji: "🇮🇪",
    ioc: "IRL",
    languages: ["eng", "gle"],
    name: "Ireland",
    status: "assigned"
  },
  {
    alpha2: "IL",
    alpha3: "ISR",
    countryCallingCodes: ["+972"],
    currencies: ["ILS"],
    emoji: "🇮🇱",
    ioc: "ISR",
    languages: ["heb", "ara", "eng"],
    name: "Israel",
    status: "assigned"
  },
  {
    alpha2: "IM",
    alpha3: "IMN",
    countryCallingCodes: ["+44"],
    currencies: ["GBP"],
    emoji: "🇮🇲",
    ioc: "",
    languages: ["eng", "glv"],
    name: "Isle Of Man",
    status: "assigned"
  },
  {
    alpha2: "IN",
    alpha3: "IND",
    countryCallingCodes: ["+91"],
    currencies: ["INR"],
    emoji: "🇮🇳",
    ioc: "IND",
    languages: ["eng", "hin"],
    name: "India",
    status: "assigned"
  },
  {
    alpha2: "IO",
    alpha3: "IOT",
    countryCallingCodes: ["+246"],
    currencies: ["USD"],
    emoji: "🇮🇴",
    ioc: "",
    languages: ["eng"],
    name: "British Indian Ocean Territory",
    status: "assigned"
  },
  {
    alpha2: "IQ",
    alpha3: "IRQ",
    countryCallingCodes: ["+964"],
    currencies: ["IQD"],
    emoji: "🇮🇶",
    ioc: "IRQ",
    languages: ["ara", "kur"],
    name: "Iraq",
    status: "assigned"
  },
  {
    alpha2: "IR",
    alpha3: "IRN",
    countryCallingCodes: ["+98"],
    currencies: ["IRR"],
    emoji: "🇮🇷",
    ioc: "IRI",
    languages: ["fas"],
    name: "Iran, Islamic Republic Of",
    status: "assigned"
  },
  {
    alpha2: "IS",
    alpha3: "ISL",
    countryCallingCodes: ["+354"],
    currencies: ["ISK"],
    emoji: "🇮🇸",
    ioc: "ISL",
    languages: ["isl"],
    name: "Iceland",
    status: "assigned"
  },
  {
    alpha2: "IT",
    alpha3: "ITA",
    countryCallingCodes: ["+39"],
    currencies: ["EUR"],
    emoji: "🇮🇹",
    ioc: "ITA",
    languages: ["ita"],
    name: "Italy",
    status: "assigned"
  },
  {
    alpha2: "JE",
    alpha3: "JEY",
    countryCallingCodes: ["+44"],
    currencies: ["GBP"],
    emoji: "🇯🇪",
    ioc: "JCI",
    languages: ["eng", "fra"],
    name: "Jersey",
    status: "assigned"
  },
  {
    alpha2: "JM",
    alpha3: "JAM",
    countryCallingCodes: ["+1 876"],
    currencies: ["JMD"],
    emoji: "🇯🇲",
    ioc: "JAM",
    languages: ["eng"],
    name: "Jamaica",
    status: "assigned"
  },
  {
    alpha2: "JO",
    alpha3: "JOR",
    countryCallingCodes: ["+962"],
    currencies: ["JOD"],
    emoji: "🇯🇴",
    ioc: "JOR",
    languages: ["ara"],
    name: "Jordan",
    status: "assigned"
  },
  {
    alpha2: "JP",
    alpha3: "JPN",
    countryCallingCodes: ["+81"],
    currencies: ["JPY"],
    emoji: "🇯🇵",
    ioc: "JPN",
    languages: ["jpn"],
    name: "Japan",
    status: "assigned"
  },
  {
    alpha2: "JT",
    alpha3: "JTN",
    countryCallingCodes: [],
    currencies: [],
    ioc: "",
    languages: [],
    name: "Johnston Island",
    status: "deleted"
  },
  {
    alpha2: "KE",
    alpha3: "KEN",
    countryCallingCodes: ["+254"],
    currencies: ["KES"],
    emoji: "🇰🇪",
    ioc: "KEN",
    languages: ["eng", "swa"],
    name: "Kenya",
    status: "assigned"
  },
  {
    alpha2: "KG",
    alpha3: "KGZ",
    countryCallingCodes: ["+996"],
    currencies: ["KGS"],
    emoji: "🇰🇬",
    ioc: "KGZ",
    languages: ["rus"],
    name: "Kyrgyzstan",
    status: "assigned"
  },
  {
    alpha2: "KH",
    alpha3: "KHM",
    countryCallingCodes: ["+855"],
    currencies: ["KHR"],
    emoji: "🇰🇭",
    ioc: "CAM",
    languages: ["khm"],
    name: "Cambodia",
    status: "assigned"
  },
  {
    alpha2: "KI",
    alpha3: "KIR",
    countryCallingCodes: ["+686"],
    currencies: ["AUD"],
    emoji: "🇰🇮",
    ioc: "KIR",
    languages: ["eng"],
    name: "Kiribati",
    status: "assigned"
  },
  {
    alpha2: "KM",
    alpha3: "COM",
    countryCallingCodes: ["+269"],
    currencies: ["KMF"],
    emoji: "🇰🇲",
    ioc: "COM",
    languages: ["ara", "fra"],
    name: "Comoros",
    status: "assigned"
  },
  {
    alpha2: "KN",
    alpha3: "KNA",
    countryCallingCodes: ["+1 869"],
    currencies: ["XCD"],
    emoji: "🇰🇳",
    ioc: "SKN",
    languages: ["eng"],
    name: "Saint Kitts And Nevis",
    status: "assigned"
  },
  {
    alpha2: "KP",
    alpha3: "PRK",
    countryCallingCodes: ["+850"],
    currencies: ["KPW"],
    emoji: "🇰🇵",
    ioc: "PRK",
    languages: ["kor"],
    name: "Korea, Democratic People's Republic Of",
    status: "assigned"
  },
  {
    alpha2: "KR",
    alpha3: "KOR",
    countryCallingCodes: ["+82"],
    currencies: ["KRW"],
    emoji: "🇰🇷",
    ioc: "KOR",
    languages: ["kor"],
    name: "Korea, Republic Of",
    status: "assigned"
  },
  {
    alpha2: "KW",
    alpha3: "KWT",
    countryCallingCodes: ["+965"],
    currencies: ["KWD"],
    emoji: "🇰🇼",
    ioc: "KUW",
    languages: ["ara"],
    name: "Kuwait",
    status: "assigned"
  },
  {
    alpha2: "KY",
    alpha3: "CYM",
    countryCallingCodes: ["+1 345"],
    currencies: ["KYD"],
    emoji: "🇰🇾",
    ioc: "CAY",
    languages: ["eng"],
    name: "Cayman Islands",
    status: "assigned"
  },
  {
    alpha2: "KZ",
    alpha3: "KAZ",
    countryCallingCodes: ["+7", "+7 6", "+7 7"],
    currencies: ["KZT"],
    emoji: "🇰🇿",
    ioc: "KAZ",
    languages: ["kaz", "rus"],
    name: "Kazakhstan",
    status: "assigned"
  },
  {
    alpha2: "LA",
    alpha3: "LAO",
    countryCallingCodes: ["+856"],
    currencies: ["LAK"],
    emoji: "🇱🇦",
    ioc: "LAO",
    languages: ["lao"],
    name: "Lao People's Democratic Republic",
    status: "assigned"
  },
  {
    alpha2: "LB",
    alpha3: "LBN",
    countryCallingCodes: ["+961"],
    currencies: ["LBP"],
    emoji: "🇱🇧",
    ioc: "LIB",
    languages: ["ara", "hye"],
    name: "Lebanon",
    status: "assigned"
  },
  {
    alpha2: "LC",
    alpha3: "LCA",
    countryCallingCodes: ["+1 758"],
    currencies: ["XCD"],
    emoji: "🇱🇨",
    ioc: "LCA",
    languages: ["eng"],
    name: "Saint Lucia",
    status: "assigned"
  },
  {
    alpha2: "LI",
    alpha3: "LIE",
    countryCallingCodes: ["+423"],
    currencies: ["CHF"],
    emoji: "🇱🇮",
    ioc: "LIE",
    languages: ["deu"],
    name: "Liechtenstein",
    status: "assigned"
  },
  {
    alpha2: "LK",
    alpha3: "LKA",
    countryCallingCodes: ["+94"],
    currencies: ["LKR"],
    emoji: "🇱🇰",
    ioc: "SRI",
    languages: ["sin", "tam"],
    name: "Sri Lanka",
    status: "assigned"
  },
  {
    alpha2: "LR",
    alpha3: "LBR",
    countryCallingCodes: ["+231"],
    currencies: ["LRD"],
    emoji: "🇱🇷",
    ioc: "LBR",
    languages: ["eng"],
    name: "Liberia",
    status: "assigned"
  },
  {
    alpha2: "LS",
    alpha3: "LSO",
    countryCallingCodes: ["+266"],
    currencies: ["LSL", "ZAR"],
    emoji: "🇱🇸",
    ioc: "LES",
    languages: ["eng", "sot"],
    name: "Lesotho",
    status: "assigned"
  },
  {
    alpha2: "LT",
    alpha3: "LTU",
    countryCallingCodes: ["+370"],
    currencies: ["EUR"],
    emoji: "🇱🇹",
    ioc: "LTU",
    languages: ["lit"],
    name: "Lithuania",
    status: "assigned"
  },
  {
    alpha2: "LU",
    alpha3: "LUX",
    countryCallingCodes: ["+352"],
    currencies: ["EUR"],
    emoji: "🇱🇺",
    ioc: "LUX",
    languages: ["fra", "deu", "ltz"],
    name: "Luxembourg",
    status: "assigned"
  },
  {
    alpha2: "LV",
    alpha3: "LVA",
    countryCallingCodes: ["+371"],
    currencies: ["EUR"],
    emoji: "🇱🇻",
    ioc: "LAT",
    languages: ["lav"],
    name: "Latvia",
    status: "assigned"
  },
  {
    alpha2: "LY",
    alpha3: "LBY",
    countryCallingCodes: ["+218"],
    currencies: ["LYD"],
    emoji: "🇱🇾",
    ioc: "LBA",
    languages: ["ara"],
    name: "Libya",
    status: "assigned"
  },
  {
    alpha2: "MA",
    alpha3: "MAR",
    countryCallingCodes: ["+212"],
    currencies: ["MAD"],
    emoji: "🇲🇦",
    ioc: "MAR",
    languages: ["ara"],
    name: "Morocco",
    status: "assigned"
  },
  {
    alpha2: "MC",
    alpha3: "MCO",
    countryCallingCodes: ["+377"],
    currencies: ["EUR"],
    emoji: "🇲🇨",
    ioc: "MON",
    languages: ["fra"],
    name: "Monaco",
    status: "assigned"
  },
  {
    alpha2: "MD",
    alpha3: "MDA",
    countryCallingCodes: ["+373"],
    currencies: ["MDL"],
    emoji: "🇲🇩",
    ioc: "MDA",
    languages: ["ron"],
    name: "Moldova",
    status: "assigned"
  },
  {
    alpha2: "ME",
    alpha3: "MNE",
    countryCallingCodes: ["+382"],
    currencies: ["EUR"],
    emoji: "🇲🇪",
    ioc: "MNE",
    languages: ["mot"],
    name: "Montenegro",
    status: "assigned"
  },
  {
    alpha2: "MF",
    alpha3: "MAF",
    countryCallingCodes: ["+590"],
    currencies: ["EUR"],
    emoji: "🇲🇫",
    ioc: "",
    languages: ["fra"],
    name: "Saint Martin",
    status: "assigned"
  },
  {
    alpha2: "MG",
    alpha3: "MDG",
    countryCallingCodes: ["+261"],
    currencies: ["MGA"],
    emoji: "🇲🇬",
    ioc: "MAD",
    languages: ["fra", "mlg"],
    name: "Madagascar",
    status: "assigned"
  },
  {
    alpha2: "MH",
    alpha3: "MHL",
    countryCallingCodes: ["+692"],
    currencies: ["USD"],
    emoji: "🇲🇭",
    ioc: "MHL",
    languages: ["eng", "mah"],
    name: "Marshall Islands",
    status: "assigned"
  },
  {
    alpha2: "MI",
    alpha3: "MID",
    countryCallingCodes: [],
    currencies: [],
    ioc: "",
    languages: [],
    name: "Midway Islands",
    status: "deleted"
  },
  {
    alpha2: "MK",
    alpha3: "MKD",
    countryCallingCodes: ["+389"],
    currencies: ["MKD"],
    emoji: "🇲🇰",
    ioc: "MKD",
    languages: ["mkd"],
    name: "North Macedonia",
    status: "assigned"
  },
  {
    alpha2: "ML",
    alpha3: "MLI",
    countryCallingCodes: ["+223"],
    currencies: ["XOF"],
    emoji: "🇲🇱",
    ioc: "MLI",
    languages: ["fra"],
    name: "Mali",
    status: "assigned"
  },
  {
    alpha2: "MM",
    alpha3: "MMR",
    countryCallingCodes: ["+95"],
    currencies: ["MMK"],
    emoji: "🇲🇲",
    ioc: "MYA",
    languages: ["mya"],
    name: "Myanmar",
    status: "assigned"
  },
  {
    alpha2: "MN",
    alpha3: "MNG",
    countryCallingCodes: ["+976"],
    currencies: ["MNT"],
    emoji: "🇲🇳",
    ioc: "MGL",
    languages: ["mon"],
    name: "Mongolia",
    status: "assigned"
  },
  {
    alpha2: "MO",
    alpha3: "MAC",
    countryCallingCodes: ["+853"],
    currencies: ["MOP"],
    emoji: "🇲🇴",
    ioc: "MAC",
    languages: ["zho", "por"],
    name: "Macao",
    status: "assigned"
  },
  {
    alpha2: "MP",
    alpha3: "MNP",
    countryCallingCodes: ["+1 670"],
    currencies: ["USD"],
    emoji: "🇲🇵",
    ioc: "",
    languages: ["eng"],
    name: "Northern Mariana Islands",
    status: "assigned"
  },
  {
    alpha2: "MQ",
    alpha3: "MTQ",
    countryCallingCodes: ["+596"],
    currencies: ["EUR"],
    emoji: "🇲🇶",
    ioc: "",
    languages: [],
    name: "Martinique",
    status: "assigned"
  },
  {
    alpha2: "MR",
    alpha3: "MRT",
    countryCallingCodes: ["+222"],
    currencies: ["MRO"],
    emoji: "🇲🇷",
    ioc: "MTN",
    languages: ["ara", "fra"],
    name: "Mauritania",
    status: "assigned"
  },
  {
    alpha2: "MS",
    alpha3: "MSR",
    countryCallingCodes: ["+1 664"],
    currencies: ["XCD"],
    emoji: "🇲🇸",
    ioc: "",
    languages: [],
    name: "Montserrat",
    status: "assigned"
  },
  {
    alpha2: "MT",
    alpha3: "MLT",
    countryCallingCodes: ["+356"],
    currencies: ["EUR"],
    emoji: "🇲🇹",
    ioc: "MLT",
    languages: ["mlt", "eng"],
    name: "Malta",
    status: "assigned"
  },
  {
    alpha2: "MU",
    alpha3: "MUS",
    countryCallingCodes: ["+230"],
    currencies: ["MUR"],
    emoji: "🇲🇺",
    ioc: "MRI",
    languages: ["eng", "fra"],
    name: "Mauritius",
    status: "assigned"
  },
  {
    alpha2: "MV",
    alpha3: "MDV",
    countryCallingCodes: ["+960"],
    currencies: ["MVR"],
    emoji: "🇲🇻",
    ioc: "MDV",
    languages: ["div"],
    name: "Maldives",
    status: "assigned"
  },
  {
    alpha2: "MW",
    alpha3: "MWI",
    countryCallingCodes: ["+265"],
    currencies: ["MWK"],
    emoji: "🇲🇼",
    ioc: "MAW",
    languages: ["eng", "nya"],
    name: "Malawi",
    status: "assigned"
  },
  {
    alpha2: "MX",
    alpha3: "MEX",
    countryCallingCodes: ["+52"],
    currencies: ["MXN", "MXV"],
    emoji: "🇲🇽",
    ioc: "MEX",
    languages: ["spa"],
    name: "Mexico",
    status: "assigned"
  },
  {
    alpha2: "MY",
    alpha3: "MYS",
    countryCallingCodes: ["+60"],
    currencies: ["MYR"],
    emoji: "🇲🇾",
    ioc: "MAS",
    languages: ["msa", "eng"],
    name: "Malaysia",
    status: "assigned"
  },
  {
    alpha2: "MZ",
    alpha3: "MOZ",
    countryCallingCodes: ["+258"],
    currencies: ["MZN"],
    emoji: "🇲🇿",
    ioc: "MOZ",
    languages: ["por"],
    name: "Mozambique",
    status: "assigned"
  },
  {
    alpha2: "NA",
    alpha3: "NAM",
    countryCallingCodes: ["+264"],
    currencies: ["NAD", "ZAR"],
    emoji: "🇳🇦",
    ioc: "NAM",
    languages: ["eng"],
    name: "Namibia",
    status: "assigned"
  },
  {
    alpha2: "NC",
    alpha3: "NCL",
    countryCallingCodes: ["+687"],
    currencies: ["XPF"],
    emoji: "🇳🇨",
    ioc: "",
    languages: ["fra"],
    name: "New Caledonia",
    status: "assigned"
  },
  {
    alpha2: "NE",
    alpha3: "NER",
    countryCallingCodes: ["+227"],
    currencies: ["XOF"],
    emoji: "🇳🇪",
    ioc: "NIG",
    languages: ["fra"],
    name: "Niger",
    status: "assigned"
  },
  {
    alpha2: "NF",
    alpha3: "NFK",
    countryCallingCodes: ["+672"],
    currencies: ["AUD"],
    emoji: "🇳🇫",
    ioc: "",
    languages: ["eng"],
    name: "Norfolk Island",
    status: "assigned"
  },
  {
    alpha2: "NG",
    alpha3: "NGA",
    countryCallingCodes: ["+234"],
    currencies: ["NGN"],
    emoji: "🇳🇬",
    ioc: "NGR",
    languages: ["eng"],
    name: "Nigeria",
    status: "assigned"
  },
  {
    alpha2: "NH",
    alpha3: "NHB",
    countryCallingCodes: [],
    currencies: [],
    ioc: "",
    languages: [],
    name: "New Hebrides",
    status: "deleted"
  },
  {
    alpha2: "NI",
    alpha3: "NIC",
    countryCallingCodes: ["+505"],
    currencies: ["NIO"],
    emoji: "🇳🇮",
    ioc: "NCA",
    languages: ["spa"],
    name: "Nicaragua",
    status: "assigned"
  },
  {
    alpha2: "NL",
    alpha3: "NLD",
    countryCallingCodes: ["+31"],
    currencies: ["EUR"],
    emoji: "🇳🇱",
    ioc: "NED",
    languages: ["nld"],
    name: "Netherlands",
    status: "assigned"
  },
  {
    alpha2: "NO",
    alpha3: "NOR",
    countryCallingCodes: ["+47"],
    currencies: ["NOK"],
    emoji: "🇳🇴",
    ioc: "NOR",
    languages: ["nor"],
    name: "Norway",
    status: "assigned"
  },
  {
    alpha2: "NP",
    alpha3: "NPL",
    countryCallingCodes: ["+977"],
    currencies: ["NPR"],
    emoji: "🇳🇵",
    ioc: "NEP",
    languages: ["nep"],
    name: "Nepal",
    status: "assigned"
  },
  {
    alpha2: "NQ",
    alpha3: "ATN",
    countryCallingCodes: [],
    currencies: [],
    ioc: "",
    languages: [],
    name: "Dronning Maud Land",
    status: "deleted"
  },
  {
    alpha2: "NR",
    alpha3: "NRU",
    countryCallingCodes: ["+674"],
    currencies: ["AUD"],
    emoji: "🇳🇷",
    ioc: "NRU",
    languages: ["eng", "nau"],
    name: "Nauru",
    status: "assigned"
  },
  {
    alpha2: "NT",
    alpha3: "NTZ",
    countryCallingCodes: [],
    currencies: [],
    ioc: "",
    languages: [],
    name: "Neutral Zone",
    status: "deleted"
  },
  {
    alpha2: "NU",
    alpha3: "NIU",
    countryCallingCodes: ["+683"],
    currencies: ["NZD"],
    emoji: "🇳🇺",
    ioc: "",
    languages: ["eng"],
    name: "Niue",
    status: "assigned"
  },
  {
    alpha2: "NZ",
    alpha3: "NZL",
    countryCallingCodes: ["+64"],
    currencies: ["NZD"],
    emoji: "🇳🇿",
    ioc: "NZL",
    languages: ["eng", "mri"],
    name: "New Zealand",
    status: "assigned"
  },
  {
    alpha2: "OM",
    alpha3: "OMN",
    countryCallingCodes: ["+968"],
    currencies: ["OMR"],
    emoji: "🇴🇲",
    ioc: "OMA",
    languages: ["ara"],
    name: "Oman",
    status: "assigned"
  },
  {
    alpha2: "PA",
    alpha3: "PAN",
    countryCallingCodes: ["+507"],
    currencies: ["PAB", "USD"],
    emoji: "🇵🇦",
    ioc: "PAN",
    languages: ["spa"],
    name: "Panama",
    status: "assigned"
  },
  {
    alpha2: "PC",
    alpha3: "PCI",
    countryCallingCodes: [],
    currencies: [],
    ioc: "",
    languages: [],
    name: "Pacific Islands, Trust Territory of the",
    status: "deleted"
  },
  {
    alpha2: "PE",
    alpha3: "PER",
    countryCallingCodes: ["+51"],
    currencies: ["PEN"],
    emoji: "🇵🇪",
    ioc: "PER",
    languages: ["spa", "aym", "que"],
    name: "Peru",
    status: "assigned"
  },
  {
    alpha2: "PF",
    alpha3: "PYF",
    countryCallingCodes: ["+689"],
    currencies: ["XPF"],
    emoji: "🇵🇫",
    ioc: "",
    languages: ["fra"],
    name: "French Polynesia",
    status: "assigned"
  },
  {
    alpha2: "PG",
    alpha3: "PNG",
    countryCallingCodes: ["+675"],
    currencies: ["PGK"],
    emoji: "🇵🇬",
    ioc: "PNG",
    languages: ["eng"],
    name: "Papua New Guinea",
    status: "assigned"
  },
  {
    alpha2: "PH",
    alpha3: "PHL",
    countryCallingCodes: ["+63"],
    currencies: ["PHP"],
    emoji: "🇵🇭",
    ioc: "PHI",
    languages: ["eng"],
    name: "Philippines",
    status: "assigned"
  },
  {
    alpha2: "PK",
    alpha3: "PAK",
    countryCallingCodes: ["+92"],
    currencies: ["PKR"],
    emoji: "🇵🇰",
    ioc: "PAK",
    languages: ["urd", "eng"],
    name: "Pakistan",
    status: "assigned"
  },
  {
    alpha2: "PL",
    alpha3: "POL",
    countryCallingCodes: ["+48"],
    currencies: ["PLN"],
    emoji: "🇵🇱",
    ioc: "POL",
    languages: ["pol"],
    name: "Poland",
    status: "assigned"
  },
  {
    alpha2: "PM",
    alpha3: "SPM",
    countryCallingCodes: ["+508"],
    currencies: ["EUR"],
    emoji: "🇵🇲",
    ioc: "",
    languages: ["eng"],
    name: "Saint Pierre And Miquelon",
    status: "assigned"
  },
  {
    alpha2: "PN",
    alpha3: "PCN",
    countryCallingCodes: ["+872"],
    currencies: ["NZD"],
    emoji: "🇵🇳",
    ioc: "",
    languages: ["eng"],
    name: "Pitcairn",
    status: "assigned"
  },
  {
    alpha2: "PR",
    alpha3: "PRI",
    countryCallingCodes: ["+1 787", "+1 939"],
    currencies: ["USD"],
    emoji: "🇵🇷",
    ioc: "PUR",
    languages: ["spa", "eng"],
    name: "Puerto Rico",
    status: "assigned"
  },
  {
    alpha2: "PS",
    alpha3: "PSE",
    countryCallingCodes: ["+970"],
    currencies: ["JOD", "EGP", "ILS"],
    emoji: "🇵🇸",
    ioc: "PLE",
    languages: ["ara"],
    name: "Palestinian Territory, Occupied",
    status: "assigned"
  },
  {
    alpha2: "PT",
    alpha3: "PRT",
    countryCallingCodes: ["+351"],
    currencies: ["EUR"],
    emoji: "🇵🇹",
    ioc: "POR",
    languages: ["por"],
    name: "Portugal",
    status: "assigned"
  },
  {
    alpha2: "PU",
    alpha3: "PUS",
    countryCallingCodes: [],
    currencies: [],
    ioc: "",
    languages: [],
    name: "U.S. Miscellaneous Pacific Islands",
    status: "deleted"
  },
  {
    alpha2: "PW",
    alpha3: "PLW",
    countryCallingCodes: ["+680"],
    currencies: ["USD"],
    emoji: "🇵🇼",
    ioc: "PLW",
    languages: ["eng"],
    name: "Palau",
    status: "assigned"
  },
  {
    alpha2: "PY",
    alpha3: "PRY",
    countryCallingCodes: ["+595"],
    currencies: ["PYG"],
    emoji: "🇵🇾",
    ioc: "PAR",
    languages: ["spa"],
    name: "Paraguay",
    status: "assigned"
  },
  {
    alpha2: "PZ",
    alpha3: "PCZ",
    countryCallingCodes: [],
    currencies: [],
    ioc: "",
    languages: [],
    name: "Panama Canal Zone",
    status: "deleted"
  },
  {
    alpha2: "QA",
    alpha3: "QAT",
    countryCallingCodes: ["+974"],
    currencies: ["QAR"],
    emoji: "🇶🇦",
    ioc: "QAT",
    languages: ["ara"],
    name: "Qatar",
    status: "assigned"
  },
  {
    alpha2: "RE",
    alpha3: "REU",
    countryCallingCodes: ["+262"],
    currencies: ["EUR"],
    emoji: "🇷🇪",
    ioc: "",
    languages: ["fra"],
    name: "Reunion",
    status: "assigned"
  },
  {
    alpha2: "RH",
    alpha3: "RHO",
    countryCallingCodes: [],
    currencies: [],
    ioc: "",
    languages: [],
    name: "Southern Rhodesia",
    status: "deleted"
  },
  {
    alpha2: "RO",
    alpha3: "ROU",
    countryCallingCodes: ["+40"],
    currencies: ["RON"],
    emoji: "🇷🇴",
    ioc: "ROU",
    languages: ["ron"],
    name: "Romania",
    status: "assigned"
  },
  {
    alpha2: "RS",
    alpha3: "SRB",
    countryCallingCodes: ["+381"],
    currencies: ["RSD"],
    emoji: "🇷🇸",
    ioc: "SRB",
    languages: ["srp"],
    name: "Serbia",
    status: "assigned"
  },
  {
    alpha2: "RU",
    alpha3: "RUS",
    countryCallingCodes: ["+7", "+7 3", "+7 4", "+7 8"],
    currencies: ["RUB"],
    emoji: "🇷🇺",
    ioc: "RUS",
    languages: ["rus"],
    name: "Russia",
    status: "assigned"
  },
  {
    alpha2: "RW",
    alpha3: "RWA",
    countryCallingCodes: ["+250"],
    currencies: ["RWF"],
    emoji: "🇷🇼",
    ioc: "RWA",
    languages: ["eng", "fra", "kin"],
    name: "Rwanda",
    status: "assigned"
  },
  {
    alpha2: "SA",
    alpha3: "SAU",
    countryCallingCodes: ["+966"],
    currencies: ["SAR"],
    emoji: "🇸🇦",
    ioc: "KSA",
    languages: ["ara"],
    name: "Saudi Arabia",
    status: "assigned"
  },
  {
    alpha2: "SB",
    alpha3: "SLB",
    countryCallingCodes: ["+677"],
    currencies: ["SBD"],
    emoji: "🇸🇧",
    ioc: "SOL",
    languages: ["eng"],
    name: "Solomon Islands",
    status: "assigned"
  },
  {
    alpha2: "SC",
    alpha3: "SYC",
    countryCallingCodes: ["+248"],
    currencies: ["SCR"],
    emoji: "🇸🇨",
    ioc: "SEY",
    languages: ["eng", "fra"],
    name: "Seychelles",
    status: "assigned"
  },
  {
    alpha2: "SD",
    alpha3: "SDN",
    countryCallingCodes: ["+249"],
    currencies: ["SDG"],
    emoji: "🇸🇩",
    ioc: "SUD",
    languages: ["ara", "eng"],
    name: "Sudan",
    status: "assigned"
  },
  {
    alpha2: "SE",
    alpha3: "SWE",
    countryCallingCodes: ["+46"],
    currencies: ["SEK"],
    emoji: "🇸🇪",
    ioc: "SWE",
    languages: ["swe"],
    name: "Sweden",
    status: "assigned"
  },
  {
    alpha2: "SG",
    alpha3: "SGP",
    countryCallingCodes: ["+65"],
    currencies: ["SGD"],
    emoji: "🇸🇬",
    ioc: "SGP",
    languages: ["eng", "zho", "msa", "tam"],
    name: "Singapore",
    status: "assigned"
  },
  {
    alpha2: "SH",
    alpha3: "SHN",
    countryCallingCodes: ["+290"],
    currencies: ["SHP"],
    emoji: "🇸🇭",
    ioc: "",
    languages: ["eng"],
    name: "Saint Helena, Ascension And Tristan Da Cunha",
    status: "assigned"
  },
  {
    alpha2: "SI",
    alpha3: "SVN",
    countryCallingCodes: ["+386"],
    currencies: ["EUR"],
    emoji: "🇸🇮",
    ioc: "SLO",
    languages: ["slv"],
    name: "Slovenia",
    status: "assigned"
  },
  {
    alpha2: "SJ",
    alpha3: "SJM",
    countryCallingCodes: ["+47"],
    currencies: ["NOK"],
    emoji: "🇸🇯",
    ioc: "",
    languages: [],
    name: "Svalbard And Jan Mayen",
    status: "assigned"
  },
  {
    alpha2: "SK",
    alpha3: "SVK",
    countryCallingCodes: ["+421"],
    currencies: ["EUR"],
    emoji: "🇸🇰",
    ioc: "SVK",
    languages: ["slk"],
    name: "Slovakia",
    status: "assigned"
  },
  {
    alpha2: "SK",
    alpha3: "SKM",
    countryCallingCodes: [],
    currencies: [],
    ioc: "",
    languages: [],
    name: "Sikkim",
    status: "deleted"
  },
  {
    alpha2: "SL",
    alpha3: "SLE",
    countryCallingCodes: ["+232"],
    currencies: ["SLL"],
    emoji: "🇸🇱",
    ioc: "SLE",
    languages: ["eng"],
    name: "Sierra Leone",
    status: "assigned"
  },
  {
    alpha2: "SM",
    alpha3: "SMR",
    countryCallingCodes: ["+378"],
    currencies: ["EUR"],
    emoji: "🇸🇲",
    ioc: "SMR",
    languages: ["ita"],
    name: "San Marino",
    status: "assigned"
  },
  {
    alpha2: "SN",
    alpha3: "SEN",
    countryCallingCodes: ["+221"],
    currencies: ["XOF"],
    emoji: "🇸🇳",
    ioc: "SEN",
    languages: ["fra"],
    name: "Senegal",
    status: "assigned"
  },
  {
    alpha2: "SO",
    alpha3: "SOM",
    countryCallingCodes: ["+252"],
    currencies: ["SOS"],
    emoji: "🇸🇴",
    ioc: "SOM",
    languages: ["som"],
    name: "Somalia",
    status: "assigned"
  },
  {
    alpha2: "SR",
    alpha3: "SUR",
    countryCallingCodes: ["+597"],
    currencies: ["SRD"],
    emoji: "🇸🇷",
    ioc: "SUR",
    languages: ["nld"],
    name: "Suriname",
    status: "assigned"
  },
  {
    alpha2: "SS",
    alpha3: "SSD",
    countryCallingCodes: ["+211"],
    currencies: ["SSP"],
    emoji: "🇸🇸",
    ioc: "SSD",
    languages: ["eng"],
    name: "South Sudan",
    status: "assigned"
  },
  {
    alpha2: "ST",
    alpha3: "STP",
    countryCallingCodes: ["+239"],
    currencies: ["STD"],
    emoji: "🇸🇹",
    ioc: "STP",
    languages: ["por"],
    name: "Sao Tome and Principe",
    status: "assigned"
  },
  {
    alpha2: "SU",
    alpha3: "SUN",
    countryCallingCodes: [],
    currencies: ["RUB"],
    emoji: "",
    ioc: "",
    languages: ["rus"],
    name: "USSR",
    status: "reserved"
  },
  {
    alpha2: "SV",
    alpha3: "SLV",
    countryCallingCodes: ["+503"],
    currencies: ["USD"],
    emoji: "🇸🇻",
    ioc: "ESA",
    languages: ["spa"],
    name: "El Salvador",
    status: "assigned"
  },
  {
    alpha2: "SX",
    alpha3: "SXM",
    countryCallingCodes: ["+1 721"],
    currencies: ["ANG"],
    emoji: "🇸🇽",
    ioc: "",
    languages: ["nld"],
    name: "Sint Maarten",
    status: "assigned"
  },
  {
    alpha2: "SY",
    alpha3: "SYR",
    countryCallingCodes: ["+963"],
    currencies: ["SYP"],
    emoji: "🇸🇾",
    ioc: "SYR",
    languages: ["ara"],
    name: "Syrian Arab Republic",
    status: "assigned"
  },
  {
    alpha2: "SZ",
    alpha3: "SWZ",
    countryCallingCodes: ["+268"],
    currencies: ["SZL"],
    emoji: "🇸🇿",
    ioc: "SWZ",
    languages: ["eng", "ssw"],
    name: "Eswatini",
    status: "assigned"
  },
  {
    alpha2: "TA",
    alpha3: "TAA",
    countryCallingCodes: ["+290"],
    currencies: ["GBP"],
    emoji: "🇹🇦",
    ioc: "",
    languages: [],
    name: "Tristan de Cunha",
    status: "reserved"
  },
  {
    alpha2: "TC",
    alpha3: "TCA",
    countryCallingCodes: ["+1 649"],
    currencies: ["USD"],
    emoji: "🇹🇨",
    ioc: "",
    languages: ["eng"],
    name: "Turks And Caicos Islands",
    status: "assigned"
  },
  {
    alpha2: "TD",
    alpha3: "TCD",
    countryCallingCodes: ["+235"],
    currencies: ["XAF"],
    emoji: "🇹🇩",
    ioc: "CHA",
    languages: ["ara", "fra"],
    name: "Chad",
    status: "assigned"
  },
  {
    alpha2: "TF",
    alpha3: "ATF",
    countryCallingCodes: [],
    currencies: ["EUR"],
    emoji: "🇹🇫",
    ioc: "",
    languages: ["fra"],
    name: "French Southern Territories",
    status: "assigned"
  },
  {
    alpha2: "TG",
    alpha3: "TGO",
    countryCallingCodes: ["+228"],
    currencies: ["XOF"],
    emoji: "🇹🇬",
    ioc: "TOG",
    languages: ["fra"],
    name: "Togo",
    status: "assigned"
  },
  {
    alpha2: "TH",
    alpha3: "THA",
    countryCallingCodes: ["+66"],
    currencies: ["THB"],
    emoji: "🇹🇭",
    ioc: "THA",
    languages: ["tha"],
    name: "Thailand",
    status: "assigned"
  },
  {
    alpha2: "TJ",
    alpha3: "TJK",
    countryCallingCodes: ["+992"],
    currencies: ["TJS"],
    emoji: "🇹🇯",
    ioc: "TJK",
    languages: ["tgk", "rus"],
    name: "Tajikistan",
    status: "assigned"
  },
  {
    alpha2: "TK",
    alpha3: "TKL",
    countryCallingCodes: ["+690"],
    currencies: ["NZD"],
    emoji: "🇹🇰",
    ioc: "",
    languages: ["eng"],
    name: "Tokelau",
    status: "assigned"
  },
  {
    alpha2: "TL",
    alpha3: "TLS",
    countryCallingCodes: ["+670"],
    currencies: ["USD"],
    emoji: "🇹🇱",
    ioc: "TLS",
    languages: ["por"],
    name: "Timor-Leste, Democratic Republic of",
    status: "assigned"
  },
  {
    alpha2: "TM",
    alpha3: "TKM",
    countryCallingCodes: ["+993"],
    currencies: ["TMT"],
    emoji: "🇹🇲",
    ioc: "TKM",
    languages: ["tuk", "rus"],
    name: "Turkmenistan",
    status: "assigned"
  },
  {
    alpha2: "TN",
    alpha3: "TUN",
    countryCallingCodes: ["+216"],
    currencies: ["TND"],
    emoji: "🇹🇳",
    ioc: "TUN",
    languages: ["ara"],
    name: "Tunisia",
    status: "assigned"
  },
  {
    alpha2: "TO",
    alpha3: "TON",
    countryCallingCodes: ["+676"],
    currencies: ["TOP"],
    emoji: "🇹🇴",
    ioc: "TGA",
    languages: ["eng"],
    name: "Tonga",
    status: "assigned"
  },
  {
    alpha2: "TP",
    alpha3: "TMP",
    countryCallingCodes: [],
    currencies: [],
    ioc: "",
    languages: [],
    name: "East Timor",
    status: "deleted"
  },
  {
    alpha2: "TR",
    alpha3: "TUR",
    countryCallingCodes: ["+90"],
    currencies: ["TRY"],
    emoji: "🇹🇷",
    ioc: "TUR",
    languages: ["tur"],
    name: "Turkey",
    status: "assigned"
  },
  {
    alpha2: "TT",
    alpha3: "TTO",
    countryCallingCodes: ["+1 868"],
    currencies: ["TTD"],
    emoji: "🇹🇹",
    ioc: "TTO",
    languages: ["eng"],
    name: "Trinidad And Tobago",
    status: "assigned"
  },
  {
    alpha2: "TV",
    alpha3: "TUV",
    countryCallingCodes: ["+688"],
    currencies: ["AUD"],
    emoji: "🇹🇻",
    ioc: "TUV",
    languages: ["eng"],
    name: "Tuvalu",
    status: "assigned"
  },
  {
    alpha2: "TW",
    alpha3: "TWN",
    countryCallingCodes: ["+886"],
    currencies: ["TWD"],
    emoji: "🇹🇼",
    ioc: "TPE",
    languages: ["zho"],
    name: "Taiwan",
    status: "assigned"
  },
  {
    alpha2: "TZ",
    alpha3: "TZA",
    countryCallingCodes: ["+255"],
    currencies: ["TZS"],
    emoji: "🇹🇿",
    ioc: "TAN",
    languages: ["swa", "eng"],
    name: "Tanzania, United Republic Of",
    status: "assigned"
  },
  {
    alpha2: "UA",
    alpha3: "UKR",
    countryCallingCodes: ["+380"],
    currencies: ["UAH"],
    emoji: "🇺🇦",
    ioc: "UKR",
    languages: ["ukr", "rus"],
    name: "Ukraine",
    status: "assigned"
  },
  {
    alpha2: "UG",
    alpha3: "UGA",
    countryCallingCodes: ["+256"],
    currencies: ["UGX"],
    emoji: "🇺🇬",
    ioc: "UGA",
    languages: ["eng", "swa"],
    name: "Uganda",
    status: "assigned"
  },
  {
    alpha2: "UM",
    alpha3: "UMI",
    countryCallingCodes: ["+1"],
    currencies: ["USD"],
    emoji: "🇺🇲",
    ioc: "",
    languages: ["eng"],
    name: "United States Minor Outlying Islands",
    status: "assigned"
  },
  {
    alpha2: "US",
    alpha3: "USA",
    countryCallingCodes: ["+1"],
    currencies: ["USD"],
    emoji: "🇺🇸",
    ioc: "USA",
    languages: ["eng"],
    name: "United States",
    status: "assigned"
  },
  {
    alpha2: "UY",
    alpha3: "URY",
    countryCallingCodes: ["+598"],
    currencies: ["UYU", "UYI"],
    emoji: "🇺🇾",
    ioc: "URU",
    languages: ["spa"],
    name: "Uruguay",
    status: "assigned"
  },
  {
    alpha2: "UZ",
    alpha3: "UZB",
    countryCallingCodes: ["+998"],
    currencies: ["UZS"],
    emoji: "🇺🇿",
    ioc: "UZB",
    languages: ["uzb", "rus"],
    name: "Uzbekistan",
    status: "assigned"
  },
  {
    alpha2: "VA",
    alpha3: "VAT",
    countryCallingCodes: ["+379", "+39"],
    currencies: ["EUR"],
    emoji: "🇻🇦",
    ioc: "",
    languages: ["ita"],
    name: "Vatican City State",
    status: "assigned"
  },
  {
    alpha2: "VC",
    alpha3: "VCT",
    countryCallingCodes: ["+1 784"],
    currencies: ["XCD"],
    emoji: "🇻🇨",
    ioc: "VIN",
    languages: ["eng"],
    name: "Saint Vincent And The Grenadines",
    status: "assigned"
  },
  {
    alpha2: "VD",
    alpha3: "VDR",
    countryCallingCodes: [],
    currencies: [],
    ioc: "",
    languages: [],
    name: "Viet-Nam, Democratic Republic of",
    status: "deleted"
  },
  {
    alpha2: "VE",
    alpha3: "VEN",
    countryCallingCodes: ["+58"],
    currencies: ["VEF"],
    emoji: "🇻🇪",
    ioc: "VEN",
    languages: ["spa"],
    name: "Venezuela, Bolivarian Republic Of",
    status: "assigned"
  },
  {
    alpha2: "VG",
    alpha3: "VGB",
    countryCallingCodes: ["+1 284"],
    currencies: ["USD"],
    emoji: "🇻🇬",
    ioc: "IVB",
    languages: ["eng"],
    name: "Virgin Islands (British)",
    status: "assigned"
  },
  {
    alpha2: "VI",
    alpha3: "VIR",
    countryCallingCodes: ["+1 340"],
    currencies: ["USD"],
    emoji: "🇻🇮",
    ioc: "ISV",
    languages: ["eng"],
    name: "Virgin Islands (US)",
    status: "assigned"
  },
  {
    alpha2: "VN",
    alpha3: "VNM",
    countryCallingCodes: ["+84"],
    currencies: ["VND"],
    emoji: "🇻🇳",
    ioc: "VIE",
    languages: ["vie"],
    name: "VietNam",
    status: "assigned"
  },
  {
    alpha2: "VU",
    alpha3: "VUT",
    countryCallingCodes: ["+678"],
    currencies: ["VUV"],
    emoji: "🇻🇺",
    ioc: "VAN",
    languages: ["bis", "eng", "fra"],
    name: "Vanuatu",
    status: "assigned"
  },
  {
    alpha2: "WF",
    alpha3: "WLF",
    countryCallingCodes: ["+681"],
    currencies: ["XPF"],
    emoji: "🇼🇫",
    ioc: "",
    languages: ["fra"],
    name: "Wallis And Futuna",
    status: "assigned"
  },
  {
    alpha2: "WK",
    alpha3: "WAK",
    countryCallingCodes: [],
    currencies: [],
    ioc: "",
    languages: [],
    name: "Wake Island",
    status: "deleted"
  },
  {
    alpha2: "WS",
    alpha3: "WSM",
    countryCallingCodes: ["+685"],
    currencies: ["WST"],
    emoji: "🇼🇸",
    ioc: "SAM",
    languages: ["eng", "smo"],
    name: "Samoa",
    status: "assigned"
  },
  {
    alpha2: "XK",
    alpha3: "XKX",
    countryCallingCodes: ["+383"],
    currencies: ["EUR"],
    emoji: "🇽🇰",
    ioc: "KOS",
    languages: ["sqi", "srp", "bos", "tur", "rom"],
    name: "Kosovo",
    status: "user assigned"
  },
  {
    alpha2: "YD",
    alpha3: "YMD",
    countryCallingCodes: ["+967"],
    currencies: [],
    ioc: "🇾🇪",
    languages: [],
    name: "Yemen, Democratic",
    status: "deleted"
  },
  {
    alpha2: "YE",
    alpha3: "YEM",
    countryCallingCodes: ["+967"],
    currencies: ["YER"],
    emoji: "🇾🇪",
    ioc: "YEM",
    languages: ["ara"],
    name: "Yemen",
    status: "assigned"
  },
  {
    alpha2: "YT",
    alpha3: "MYT",
    countryCallingCodes: ["+262"],
    currencies: ["EUR"],
    emoji: "🇾🇹",
    ioc: "",
    languages: ["fra"],
    name: "Mayotte",
    status: "assigned"
  },
  {
    alpha2: "YU",
    alpha3: "YUG",
    countryCallingCodes: ["+38"],
    currencies: [],
    ioc: "",
    languages: [],
    name: "Yugoslavia",
    status: "deleted"
  },
  {
    alpha2: "ZA",
    alpha3: "ZAF",
    countryCallingCodes: ["+27"],
    currencies: ["ZAR"],
    emoji: "🇿🇦",
    ioc: "RSA",
    languages: ["afr", "eng", "nbl", "som", "tso", "ven", "xho", "zul"],
    name: "South Africa",
    status: "assigned"
  },
  {
    alpha2: "ZM",
    alpha3: "ZMB",
    countryCallingCodes: ["+260"],
    currencies: ["ZMW"],
    emoji: "🇿🇲",
    ioc: "ZAM",
    languages: ["eng"],
    name: "Zambia",
    status: "assigned"
  },
  {
    alpha2: "ZR",
    alpha3: "ZAR",
    countryCallingCodes: ["+243"],
    currencies: [],
    ioc: "",
    languages: [],
    name: "Zaire",
    status: "deleted"
  },
  {
    alpha2: "ZW",
    alpha3: "ZWE",
    countryCallingCodes: ["+263"],
    currencies: ["USD", "ZAR", "BWP", "GBP", "EUR"],
    emoji: "🇿🇼",
    ioc: "ZIM",
    languages: ["eng", "sna", "nde"],
    name: "Zimbabwe",
    status: "assigned"
  }
], Gl = [
  {
    code: "AED",
    decimals: 2,
    name: "United Arab Emirates dirham",
    number: "784"
  },
  {
    code: "AFN",
    decimals: 2,
    name: "Afghan afghani",
    number: "971"
  },
  {
    code: "ALL",
    decimals: 2,
    name: "Albanian lek",
    number: "8"
  },
  {
    code: "AMD",
    decimals: 2,
    name: "Armenian dram",
    number: "51"
  },
  {
    code: "ANG",
    decimals: 2,
    name: "Netherlands Antillean guilder",
    number: "532"
  },
  {
    code: "AOA",
    decimals: 2,
    name: "Angolan kwanza",
    number: "973"
  },
  {
    code: "ARS",
    decimals: 2,
    name: "Argentine peso",
    number: "32"
  },
  {
    code: "AUD",
    decimals: 2,
    name: "Australian dollar",
    number: "36"
  },
  {
    code: "AWG",
    decimals: 2,
    name: "Aruban florin",
    number: "533"
  },
  {
    code: "AZN",
    decimals: 2,
    name: "Azerbaijani manat",
    number: "944"
  },
  {
    code: "BAM",
    decimals: 2,
    name: "Bosnia and Herzegovina convertible mark",
    number: "977"
  },
  {
    code: "BBD",
    decimals: 2,
    name: "Barbados dollar",
    number: "52"
  },
  {
    code: "BDT",
    decimals: 2,
    name: "Bangladeshi taka",
    number: "50"
  },
  {
    code: "BGN",
    decimals: 2,
    name: "Bulgarian lev",
    number: "975"
  },
  {
    code: "BHD",
    decimals: 3,
    name: "Bahraini dinar",
    number: "48"
  },
  {
    code: "BIF",
    decimals: 0,
    name: "Burundian franc",
    number: "108"
  },
  {
    code: "BMD",
    decimals: 2,
    name: "Bermudian dollar (customarily known as Bermuda dollar)",
    number: "60"
  },
  {
    code: "BND",
    decimals: 2,
    name: "Brunei dollar",
    number: "96"
  },
  {
    code: "BOB",
    decimals: 2,
    name: "Boliviano",
    number: "68"
  },
  {
    code: "BOV",
    decimals: 2,
    name: "Bolivian Mvdol (funds code)",
    number: "984"
  },
  {
    code: "BRL",
    decimals: 2,
    name: "Brazilian real",
    number: "986"
  },
  {
    code: "BSD",
    decimals: 2,
    name: "Bahamian dollar",
    number: "44"
  },
  {
    code: "BTN",
    decimals: 2,
    name: "Bhutanese ngultrum",
    number: "64"
  },
  {
    code: "BWP",
    decimals: 2,
    name: "Botswana pula",
    number: "72"
  },
  {
    code: "BYN",
    decimals: 0,
    name: "Belarusian ruble",
    number: "974"
  },
  {
    code: "BZD",
    decimals: 2,
    name: "Belize dollar",
    number: "84"
  },
  {
    code: "CAD",
    decimals: 2,
    name: "Canadian dollar",
    number: "124"
  },
  {
    code: "CDF",
    decimals: 2,
    name: "Congolese franc",
    number: "976"
  },
  {
    code: "CHE",
    decimals: 2,
    name: "WIR Euro (complementary currency)",
    number: "947"
  },
  {
    code: "CHF",
    decimals: 2,
    name: "Swiss franc",
    number: "756"
  },
  {
    code: "CHW",
    decimals: 2,
    name: "WIR Franc (complementary currency)",
    number: "948"
  },
  {
    code: "CLF",
    decimals: 0,
    name: "Unidad de Fomento (funds code)",
    number: "990"
  },
  {
    code: "CLP",
    decimals: 0,
    name: "Chilean peso",
    number: "152"
  },
  {
    code: "CNY",
    decimals: 2,
    name: "Chinese yuan",
    number: "156"
  },
  {
    code: "COP",
    decimals: 2,
    name: "Colombian peso",
    number: "170"
  },
  {
    code: "COU",
    decimals: 2,
    name: "Unidad de Valor Real",
    number: "970"
  },
  {
    code: "CRC",
    decimals: 2,
    name: "Costa Rican colon",
    number: "188"
  },
  {
    code: "CUC",
    decimals: 2,
    name: "Cuban convertible peso",
    number: "931"
  },
  {
    code: "CUP",
    decimals: 2,
    name: "Cuban peso",
    number: "192"
  },
  {
    code: "CVE",
    decimals: 0,
    name: "Cape Verde escudo",
    number: "132"
  },
  {
    code: "CZK",
    decimals: 2,
    name: "Czech koruna",
    number: "203"
  },
  {
    code: "DJF",
    decimals: 0,
    name: "Djiboutian franc",
    number: "262"
  },
  {
    code: "DKK",
    decimals: 2,
    name: "Danish krone",
    number: "208"
  },
  {
    code: "DOP",
    decimals: 2,
    name: "Dominican peso",
    number: "214"
  },
  {
    code: "DZD",
    decimals: 2,
    name: "Algerian dinar",
    number: "12"
  },
  {
    code: "EGP",
    decimals: 2,
    name: "Egyptian pound",
    number: "818"
  },
  {
    code: "ERN",
    decimals: 2,
    name: "Eritrean nakfa",
    number: "232"
  },
  {
    code: "ETB",
    decimals: 2,
    name: "Ethiopian birr",
    number: "230"
  },
  {
    code: "EUR",
    decimals: 2,
    name: "Euro",
    number: "978"
  },
  {
    code: "FJD",
    decimals: 2,
    name: "Fiji dollar",
    number: "242"
  },
  {
    code: "FKP",
    decimals: 2,
    name: "Falkland Islands pound",
    number: "238"
  },
  {
    code: "GBP",
    decimals: 2,
    name: "Pound sterling",
    number: "826"
  },
  {
    code: "GEL",
    decimals: 2,
    name: "Georgian lari",
    number: "981"
  },
  {
    code: "GHS",
    decimals: 2,
    name: "Ghanaian cedi",
    number: "936"
  },
  {
    code: "GIP",
    decimals: 2,
    name: "Gibraltar pound",
    number: "292"
  },
  {
    code: "GMD",
    decimals: 2,
    name: "Gambian dalasi",
    number: "270"
  },
  {
    code: "GNF",
    decimals: 0,
    name: "Guinean franc",
    number: "324"
  },
  {
    code: "GTQ",
    decimals: 2,
    name: "Guatemalan quetzal",
    number: "320"
  },
  {
    code: "GYD",
    decimals: 2,
    name: "Guyanese dollar",
    number: "328"
  },
  {
    code: "HKD",
    decimals: 2,
    name: "Hong Kong dollar",
    number: "344"
  },
  {
    code: "HNL",
    decimals: 2,
    name: "Honduran lempira",
    number: "340"
  },
  {
    code: "HRK",
    decimals: 2,
    name: "Croatian kuna",
    number: "191"
  },
  {
    code: "HTG",
    decimals: 2,
    name: "Haitian gourde",
    number: "332"
  },
  {
    code: "HUF",
    decimals: 2,
    name: "Hungarian forint",
    number: "348"
  },
  {
    code: "IDR",
    decimals: 2,
    name: "Indonesian rupiah",
    number: "360"
  },
  {
    code: "ILS",
    decimals: 2,
    name: "Israeli new shekel",
    number: "376"
  },
  {
    code: "INR",
    decimals: 2,
    name: "Indian rupee",
    number: "356"
  },
  {
    code: "IQD",
    decimals: 3,
    name: "Iraqi dinar",
    number: "368"
  },
  {
    code: "IRR",
    decimals: 0,
    name: "Iranian rial",
    number: "364"
  },
  {
    code: "ISK",
    decimals: 0,
    name: "Icelandic króna",
    number: "352"
  },
  {
    code: "JMD",
    decimals: 2,
    name: "Jamaican dollar",
    number: "388"
  },
  {
    code: "JOD",
    decimals: 3,
    name: "Jordanian dinar",
    number: "400"
  },
  {
    code: "JPY",
    decimals: 0,
    name: "Japanese yen",
    number: "392"
  },
  {
    code: "KES",
    decimals: 2,
    name: "Kenyan shilling",
    number: "404"
  },
  {
    code: "KGS",
    decimals: 2,
    name: "Kyrgyzstani som",
    number: "417"
  },
  {
    code: "KHR",
    decimals: 2,
    name: "Cambodian riel",
    number: "116"
  },
  {
    code: "KMF",
    decimals: 0,
    name: "Comoro franc",
    number: "174"
  },
  {
    code: "KPW",
    decimals: 0,
    name: "North Korean won",
    number: "408"
  },
  {
    code: "KRW",
    decimals: 0,
    name: "South Korean won",
    number: "410"
  },
  {
    code: "KWD",
    decimals: 3,
    name: "Kuwaiti dinar",
    number: "414"
  },
  {
    code: "KYD",
    decimals: 2,
    name: "Cayman Islands dollar",
    number: "136"
  },
  {
    code: "KZT",
    decimals: 2,
    name: "Kazakhstani tenge",
    number: "398"
  },
  {
    code: "LAK",
    decimals: 0,
    name: "Lao kip",
    number: "418"
  },
  {
    code: "LBP",
    decimals: 0,
    name: "Lebanese pound",
    number: "422"
  },
  {
    code: "LKR",
    decimals: 2,
    name: "Sri Lankan rupee",
    number: "144"
  },
  {
    code: "LRD",
    decimals: 2,
    name: "Liberian dollar",
    number: "430"
  },
  {
    code: "LSL",
    decimals: 2,
    name: "Lesotho loti",
    number: "426"
  },
  {
    code: "LTL",
    decimals: 2,
    name: "Lithuanian litas",
    number: "440"
  },
  {
    code: "LVL",
    decimals: 2,
    name: "Latvian lats",
    number: "428"
  },
  {
    code: "LYD",
    decimals: 3,
    name: "Libyan dinar",
    number: "434"
  },
  {
    code: "MAD",
    decimals: 2,
    name: "Moroccan dirham",
    number: "504"
  },
  {
    code: "MDL",
    decimals: 2,
    name: "Moldovan leu",
    number: "498"
  },
  {
    code: "MGA",
    decimals: 0,
    name: "Malagasy ariary",
    number: "969"
  },
  {
    code: "MKD",
    decimals: 0,
    name: "Macedonian denar",
    number: "807"
  },
  {
    code: "MMK",
    decimals: 0,
    name: "Myanma kyat",
    number: "104"
  },
  {
    code: "MNT",
    decimals: 2,
    name: "Mongolian tugrik",
    number: "496"
  },
  {
    code: "MOP",
    decimals: 2,
    name: "Macanese pataca",
    number: "446"
  },
  {
    code: "MRO",
    decimals: 0,
    name: "Mauritanian ouguiya",
    number: "478"
  },
  {
    code: "MUR",
    decimals: 2,
    name: "Mauritian rupee",
    number: "480"
  },
  {
    code: "MVR",
    decimals: 2,
    name: "Maldivian rufiyaa",
    number: "462"
  },
  {
    code: "MWK",
    decimals: 2,
    name: "Malawian kwacha",
    number: "454"
  },
  {
    code: "MXN",
    decimals: 2,
    name: "Mexican peso",
    number: "484"
  },
  {
    code: "MXV",
    decimals: 2,
    name: "Mexican Unidad de Inversion (UDI) (funds code)",
    number: "979"
  },
  {
    code: "MYR",
    decimals: 2,
    name: "Malaysian ringgit",
    number: "458"
  },
  {
    code: "MZN",
    decimals: 2,
    name: "Mozambican metical",
    number: "943"
  },
  {
    code: "NAD",
    decimals: 2,
    name: "Namibian dollar",
    number: "516"
  },
  {
    code: "NGN",
    decimals: 2,
    name: "Nigerian naira",
    number: "566"
  },
  {
    code: "NIO",
    decimals: 2,
    name: "Nicaraguan córdoba",
    number: "558"
  },
  {
    code: "NOK",
    decimals: 2,
    name: "Norwegian krone",
    number: "578"
  },
  {
    code: "NPR",
    decimals: 2,
    name: "Nepalese rupee",
    number: "524"
  },
  {
    code: "NZD",
    decimals: 2,
    name: "New Zealand dollar",
    number: "554"
  },
  {
    code: "OMR",
    decimals: 3,
    name: "Omani rial",
    number: "512"
  },
  {
    code: "PAB",
    decimals: 2,
    name: "Panamanian balboa",
    number: "590"
  },
  {
    code: "PEN",
    decimals: 2,
    name: "Peruvian nuevo sol",
    number: "604"
  },
  {
    code: "PGK",
    decimals: 2,
    name: "Papua New Guinean kina",
    number: "598"
  },
  {
    code: "PHP",
    decimals: 2,
    name: "Philippine peso",
    number: "608"
  },
  {
    code: "PKR",
    decimals: 2,
    name: "Pakistani rupee",
    number: "586"
  },
  {
    code: "PLN",
    decimals: 2,
    name: "Polish złoty",
    number: "985"
  },
  {
    code: "PYG",
    decimals: 0,
    name: "Paraguayan guaraní",
    number: "600"
  },
  {
    code: "QAR",
    decimals: 2,
    name: "Qatari riyal",
    number: "634"
  },
  {
    code: "RON",
    decimals: 2,
    name: "Romanian new leu",
    number: "946"
  },
  {
    code: "RSD",
    decimals: 2,
    name: "Serbian dinar",
    number: "941"
  },
  {
    code: "RUB",
    decimals: 2,
    name: "Russian rouble",
    number: "643"
  },
  {
    code: "RWF",
    decimals: 0,
    name: "Rwandan franc",
    number: "646"
  },
  {
    code: "SAR",
    decimals: 2,
    name: "Saudi riyal",
    number: "682"
  },
  {
    code: "SBD",
    decimals: 2,
    name: "Solomon Islands dollar",
    number: "90"
  },
  {
    code: "SCR",
    decimals: 2,
    name: "Seychelles rupee",
    number: "690"
  },
  {
    code: "SDG",
    decimals: 2,
    name: "Sudanese pound",
    number: "938"
  },
  {
    code: "SEK",
    decimals: 2,
    name: "Swedish krona/kronor",
    number: "752"
  },
  {
    code: "SGD",
    decimals: 2,
    name: "Singapore dollar",
    number: "702"
  },
  {
    code: "SHP",
    decimals: 2,
    name: "Saint Helena pound",
    number: "654"
  },
  {
    code: "SLL",
    decimals: 0,
    name: "Sierra Leonean leone",
    number: "694"
  },
  {
    code: "SOS",
    decimals: 2,
    name: "Somali shilling",
    number: "706"
  },
  {
    code: "SRD",
    decimals: 2,
    name: "Surinamese dollar",
    number: "968"
  },
  {
    code: "SSP",
    decimals: 2,
    name: "South Sudanese pound",
    number: "728"
  },
  {
    code: "STD",
    decimals: 0,
    name: "São Tomé and Príncipe dobra",
    number: "678"
  },
  {
    code: "SYP",
    decimals: 2,
    name: "Syrian pound",
    number: "760"
  },
  {
    code: "SZL",
    decimals: 2,
    name: "Swazi lilangeni",
    number: "748"
  },
  {
    code: "THB",
    decimals: 2,
    name: "Thai baht",
    number: "764"
  },
  {
    code: "TJS",
    decimals: 2,
    name: "Tajikistani somoni",
    number: "972"
  },
  {
    code: "TMT",
    decimals: 2,
    name: "Turkmenistani manat",
    number: "934"
  },
  {
    code: "TND",
    decimals: 3,
    name: "Tunisian dinar",
    number: "788"
  },
  {
    code: "TOP",
    decimals: 2,
    name: "Tongan paʻanga",
    number: "776"
  },
  {
    code: "TRY",
    decimals: 2,
    name: "Turkish lira",
    number: "949"
  },
  {
    code: "TTD",
    decimals: 2,
    name: "Trinidad and Tobago dollar",
    number: "780"
  },
  {
    code: "TWD",
    decimals: 2,
    name: "New Taiwan dollar",
    number: "901"
  },
  {
    code: "TZS",
    decimals: 2,
    name: "Tanzanian shilling",
    number: "834"
  },
  {
    code: "UAH",
    decimals: 2,
    name: "Ukrainian hryvnia",
    number: "980"
  },
  {
    code: "UGX",
    decimals: 2,
    name: "Ugandan shilling",
    number: "800"
  },
  {
    code: "USD",
    decimals: 2,
    name: "United States dollar",
    number: "840"
  },
  {
    code: "USN",
    decimals: 2,
    name: "United States dollar (next day) (funds code)",
    number: "997"
  },
  {
    code: "USS",
    decimals: 2,
    name: "United States dollar (same day) (funds code) (one source[who?] claims it is no longer used, but it is still on the ISO 4217-MA list)",
    number: "998"
  },
  {
    code: "UYI",
    decimals: 0,
    name: "Uruguay Peso en Unidades Indexadas (URUIURUI) (funds code)",
    number: "940"
  },
  {
    code: "UYU",
    decimals: 2,
    name: "Uruguayan peso",
    number: "858"
  },
  {
    code: "UZS",
    decimals: 2,
    name: "Uzbekistan som",
    number: "860"
  },
  {
    code: "VEF",
    decimals: 2,
    name: "Venezuelan bolívar fuerte",
    number: "937"
  },
  {
    code: "VND",
    decimals: 0,
    name: "Vietnamese dong",
    number: "704"
  },
  {
    code: "VUV",
    decimals: 0,
    name: "Vanuatu vatu",
    number: "548"
  },
  {
    code: "WST",
    decimals: 2,
    name: "Samoan tala",
    number: "882"
  },
  {
    code: "XAF",
    decimals: 0,
    name: "CFA franc BEAC",
    number: "950"
  },
  {
    code: "XAG",
    decimals: null,
    name: "Silver (one troy ounce)",
    number: "961"
  },
  {
    code: "XAU",
    decimals: null,
    name: "Gold (one troy ounce)",
    number: "959"
  },
  {
    code: "XBA",
    decimals: null,
    name: "European Composite Unit (EURCO) (bond market unit)",
    number: "955"
  },
  {
    code: "XBB",
    decimals: null,
    name: "European Monetary Unit (E.M.U.-6) (bond market unit)",
    number: "956"
  },
  {
    code: "XBC",
    decimals: null,
    name: "European Unit of Account 9 (E.U.A.-9) (bond market unit)",
    number: "957"
  },
  {
    code: "XBD",
    decimals: null,
    name: "European Unit of Account 17 (E.U.A.-17) (bond market unit)",
    number: "958"
  },
  {
    code: "XCD",
    decimals: 2,
    name: "East Caribbean dollar",
    number: "951"
  },
  {
    code: "XDR",
    decimals: null,
    name: "Special drawing rights",
    number: "960"
  },
  {
    code: "XFU",
    decimals: null,
    name: "UIC franc (special settlement currency)",
    number: "Nil"
  },
  {
    code: "XOF",
    decimals: 0,
    name: "CFA franc BCEAO",
    number: "952"
  },
  {
    code: "XPD",
    decimals: null,
    name: "Palladium (one troy ounce)",
    number: "964"
  },
  {
    code: "XPF",
    decimals: 0,
    name: "CFP franc",
    number: "953"
  },
  {
    code: "XPT",
    decimals: null,
    name: "Platinum (one troy ounce)",
    number: "962"
  },
  {
    code: "XTS",
    decimals: null,
    name: "Code reserved for testing purposes",
    number: "963"
  },
  {
    code: "XXX",
    decimals: null,
    name: "No currency",
    number: "999"
  },
  {
    code: "YER",
    decimals: 2,
    name: "Yemeni rial",
    number: "886"
  },
  {
    code: "ZAR",
    decimals: 2,
    name: "South African rand",
    number: "710"
  },
  {
    code: "ZMW",
    decimals: 2,
    name: "Zambian kwacha",
    number: "967"
  },
  {
    code: "EEK",
    decimals: 2,
    name: "Estonian kroon",
    number: "233"
  }
], Wl = [
  {
    alpha2: "aa",
    alpha3: "aar",
    bibliographic: "",
    name: "Afar"
  },
  {
    alpha2: "ab",
    alpha3: "abk",
    bibliographic: "",
    name: "Abkhazian"
  },
  {
    alpha2: "",
    alpha3: "ace",
    bibliographic: "",
    name: "Achinese"
  },
  {
    alpha2: "",
    alpha3: "ach",
    bibliographic: "",
    name: "Acoli"
  },
  {
    alpha2: "",
    alpha3: "ada",
    bibliographic: "",
    name: "Adangme"
  },
  {
    alpha2: "",
    alpha3: "ady",
    bibliographic: "",
    name: "Adygei"
  },
  {
    alpha2: "",
    alpha3: "ady",
    bibliographic: "",
    name: "Adyghe"
  },
  {
    alpha2: "",
    alpha3: "afa",
    bibliographic: "",
    name: "Afro-Asiatic languages"
  },
  {
    alpha2: "",
    alpha3: "afh",
    bibliographic: "",
    name: "Afrihili"
  },
  {
    alpha2: "af",
    alpha3: "afr",
    bibliographic: "",
    name: "Afrikaans"
  },
  {
    alpha2: "",
    alpha3: "ain",
    bibliographic: "",
    name: "Ainu"
  },
  {
    alpha2: "ak",
    alpha3: "aka",
    bibliographic: "",
    name: "Akan"
  },
  {
    alpha2: "",
    alpha3: "akk",
    bibliographic: "",
    name: "Akkadian"
  },
  {
    alpha2: "",
    alpha3: "ale",
    bibliographic: "",
    name: "Aleut"
  },
  {
    alpha2: "",
    alpha3: "alg",
    bibliographic: "",
    name: "Algonquian languages"
  },
  {
    alpha2: "",
    alpha3: "alt",
    bibliographic: "",
    name: "Southern Altai"
  },
  {
    alpha2: "am",
    alpha3: "amh",
    bibliographic: "",
    name: "Amharic"
  },
  {
    alpha2: "",
    alpha3: "ang",
    bibliographic: "",
    name: "English, Old (ca.450-1100)"
  },
  {
    alpha2: "",
    alpha3: "anp",
    bibliographic: "",
    name: "Angika"
  },
  {
    alpha2: "",
    alpha3: "apa",
    bibliographic: "",
    name: "Apache languages"
  },
  {
    alpha2: "ar",
    alpha3: "ara",
    bibliographic: "",
    name: "Arabic"
  },
  {
    alpha2: "",
    alpha3: "arc",
    bibliographic: "",
    name: "Imperial Aramaic (700-300 BCE)"
  },
  {
    alpha2: "",
    alpha3: "arc",
    bibliographic: "",
    name: "Official Aramaic (700-300 BCE)"
  },
  {
    alpha2: "an",
    alpha3: "arg",
    bibliographic: "",
    name: "Aragonese"
  },
  {
    alpha2: "",
    alpha3: "arn",
    bibliographic: "",
    name: "Mapuche"
  },
  {
    alpha2: "",
    alpha3: "arn",
    bibliographic: "",
    name: "Mapudungun"
  },
  {
    alpha2: "",
    alpha3: "arp",
    bibliographic: "",
    name: "Arapaho"
  },
  {
    alpha2: "",
    alpha3: "art",
    bibliographic: "",
    name: "Artificial languages"
  },
  {
    alpha2: "",
    alpha3: "arw",
    bibliographic: "",
    name: "Arawak"
  },
  {
    alpha2: "as",
    alpha3: "asm",
    bibliographic: "",
    name: "Assamese"
  },
  {
    alpha2: "",
    alpha3: "ast",
    bibliographic: "",
    name: "Asturian"
  },
  {
    alpha2: "",
    alpha3: "ast",
    bibliographic: "",
    name: "Asturleonese"
  },
  {
    alpha2: "",
    alpha3: "ast",
    bibliographic: "",
    name: "Bable"
  },
  {
    alpha2: "",
    alpha3: "ast",
    bibliographic: "",
    name: "Leonese"
  },
  {
    alpha2: "",
    alpha3: "ath",
    bibliographic: "",
    name: "Athapascan languages"
  },
  {
    alpha2: "",
    alpha3: "aus",
    bibliographic: "",
    name: "Australian languages"
  },
  {
    alpha2: "av",
    alpha3: "ava",
    bibliographic: "",
    name: "Avaric"
  },
  {
    alpha2: "ae",
    alpha3: "ave",
    bibliographic: "",
    name: "Avestan"
  },
  {
    alpha2: "",
    alpha3: "awa",
    bibliographic: "",
    name: "Awadhi"
  },
  {
    alpha2: "ay",
    alpha3: "aym",
    bibliographic: "",
    name: "Aymara"
  },
  {
    alpha2: "az",
    alpha3: "aze",
    bibliographic: "",
    name: "Azerbaijani"
  },
  {
    alpha2: "",
    alpha3: "bad",
    bibliographic: "",
    name: "Banda languages"
  },
  {
    alpha2: "",
    alpha3: "bai",
    bibliographic: "",
    name: "Bamileke languages"
  },
  {
    alpha2: "ba",
    alpha3: "bak",
    bibliographic: "",
    name: "Bashkir"
  },
  {
    alpha2: "",
    alpha3: "bal",
    bibliographic: "",
    name: "Baluchi"
  },
  {
    alpha2: "bm",
    alpha3: "bam",
    bibliographic: "",
    name: "Bambara"
  },
  {
    alpha2: "",
    alpha3: "ban",
    bibliographic: "",
    name: "Balinese"
  },
  {
    alpha2: "",
    alpha3: "bas",
    bibliographic: "",
    name: "Basa"
  },
  {
    alpha2: "",
    alpha3: "bat",
    bibliographic: "",
    name: "Baltic languages"
  },
  {
    alpha2: "",
    alpha3: "bej",
    bibliographic: "",
    name: "Bedawiyet"
  },
  {
    alpha2: "",
    alpha3: "bej",
    bibliographic: "",
    name: "Beja"
  },
  {
    alpha2: "be",
    alpha3: "bel",
    bibliographic: "",
    name: "Belarusian"
  },
  {
    alpha2: "",
    alpha3: "bem",
    bibliographic: "",
    name: "Bemba"
  },
  {
    alpha2: "bn",
    alpha3: "ben",
    bibliographic: "",
    name: "Bengali"
  },
  {
    alpha2: "",
    alpha3: "ber",
    bibliographic: "",
    name: "Berber languages"
  },
  {
    alpha2: "",
    alpha3: "bho",
    bibliographic: "",
    name: "Bhojpuri"
  },
  {
    alpha2: "bh",
    alpha3: "bih",
    bibliographic: "",
    name: "Bihari languages"
  },
  {
    alpha2: "",
    alpha3: "bik",
    bibliographic: "",
    name: "Bikol"
  },
  {
    alpha2: "",
    alpha3: "bin",
    bibliographic: "",
    name: "Bini"
  },
  {
    alpha2: "",
    alpha3: "bin",
    bibliographic: "",
    name: "Edo"
  },
  {
    alpha2: "bi",
    alpha3: "bis",
    bibliographic: "",
    name: "Bislama"
  },
  {
    alpha2: "",
    alpha3: "bla",
    bibliographic: "",
    name: "Siksika"
  },
  {
    alpha2: "",
    alpha3: "bnt",
    bibliographic: "",
    name: "Bantu languages"
  },
  {
    alpha2: "bo",
    alpha3: "bod",
    bibliographic: "tib",
    name: "Tibetan"
  },
  {
    alpha2: "bs",
    alpha3: "bos",
    bibliographic: "",
    name: "Bosnian"
  },
  {
    alpha2: "",
    alpha3: "bra",
    bibliographic: "",
    name: "Braj"
  },
  {
    alpha2: "br",
    alpha3: "bre",
    bibliographic: "",
    name: "Breton"
  },
  {
    alpha2: "",
    alpha3: "btk",
    bibliographic: "",
    name: "Batak languages"
  },
  {
    alpha2: "",
    alpha3: "bua",
    bibliographic: "",
    name: "Buriat"
  },
  {
    alpha2: "",
    alpha3: "bug",
    bibliographic: "",
    name: "Buginese"
  },
  {
    alpha2: "bg",
    alpha3: "bul",
    bibliographic: "",
    name: "Bulgarian"
  },
  {
    alpha2: "",
    alpha3: "byn",
    bibliographic: "",
    name: "Bilin"
  },
  {
    alpha2: "",
    alpha3: "byn",
    bibliographic: "",
    name: "Blin"
  },
  {
    alpha2: "",
    alpha3: "cad",
    bibliographic: "",
    name: "Caddo"
  },
  {
    alpha2: "",
    alpha3: "cai",
    bibliographic: "",
    name: "Central American Indian languages"
  },
  {
    alpha2: "",
    alpha3: "car",
    bibliographic: "",
    name: "Galibi Carib"
  },
  {
    alpha2: "ca",
    alpha3: "cat",
    bibliographic: "",
    name: "Catalan"
  },
  {
    alpha2: "ca",
    alpha3: "cat",
    bibliographic: "",
    name: "Valencian"
  },
  {
    alpha2: "",
    alpha3: "cau",
    bibliographic: "",
    name: "Caucasian languages"
  },
  {
    alpha2: "",
    alpha3: "ceb",
    bibliographic: "",
    name: "Cebuano"
  },
  {
    alpha2: "",
    alpha3: "cel",
    bibliographic: "",
    name: "Celtic languages"
  },
  {
    alpha2: "cs",
    alpha3: "ces",
    bibliographic: "cze",
    name: "Czech"
  },
  {
    alpha2: "ch",
    alpha3: "cha",
    bibliographic: "",
    name: "Chamorro"
  },
  {
    alpha2: "",
    alpha3: "chb",
    bibliographic: "",
    name: "Chibcha"
  },
  {
    alpha2: "ce",
    alpha3: "che",
    bibliographic: "",
    name: "Chechen"
  },
  {
    alpha2: "",
    alpha3: "chg",
    bibliographic: "",
    name: "Chagatai"
  },
  {
    alpha2: "",
    alpha3: "chk",
    bibliographic: "",
    name: "Chuukese"
  },
  {
    alpha2: "",
    alpha3: "chm",
    bibliographic: "",
    name: "Mari"
  },
  {
    alpha2: "",
    alpha3: "chn",
    bibliographic: "",
    name: "Chinook jargon"
  },
  {
    alpha2: "",
    alpha3: "cho",
    bibliographic: "",
    name: "Choctaw"
  },
  {
    alpha2: "",
    alpha3: "chp",
    bibliographic: "",
    name: "Chipewyan"
  },
  {
    alpha2: "",
    alpha3: "chp",
    bibliographic: "",
    name: "Dene Suline"
  },
  {
    alpha2: "",
    alpha3: "chr",
    bibliographic: "",
    name: "Cherokee"
  },
  {
    alpha2: "cu",
    alpha3: "chu",
    bibliographic: "",
    name: "Church Slavic"
  },
  {
    alpha2: "cu",
    alpha3: "chu",
    bibliographic: "",
    name: "Church Slavonic"
  },
  {
    alpha2: "cu",
    alpha3: "chu",
    bibliographic: "",
    name: "Old Bulgarian"
  },
  {
    alpha2: "cu",
    alpha3: "chu",
    bibliographic: "",
    name: "Old Church Slavonic"
  },
  {
    alpha2: "cu",
    alpha3: "chu",
    bibliographic: "",
    name: "Old Slavonic"
  },
  {
    alpha2: "cv",
    alpha3: "chv",
    bibliographic: "",
    name: "Chuvash"
  },
  {
    alpha2: "",
    alpha3: "chy",
    bibliographic: "",
    name: "Cheyenne"
  },
  {
    alpha2: "",
    alpha3: "cmc",
    bibliographic: "",
    name: "Chamic languages"
  },
  {
    alpha2: "",
    alpha3: "cop",
    bibliographic: "",
    name: "Coptic"
  },
  {
    alpha2: "kw",
    alpha3: "cor",
    bibliographic: "",
    name: "Cornish"
  },
  {
    alpha2: "co",
    alpha3: "cos",
    bibliographic: "",
    name: "Corsican"
  },
  {
    alpha2: "",
    alpha3: "cpe",
    bibliographic: "",
    name: "Creoles and pidgins, English based"
  },
  {
    alpha2: "",
    alpha3: "cpf",
    bibliographic: "",
    name: "Creoles and pidgins, French-based"
  },
  {
    alpha2: "",
    alpha3: "cpp",
    bibliographic: "",
    name: "Creoles and pidgins, Portuguese-based"
  },
  {
    alpha2: "cr",
    alpha3: "cre",
    bibliographic: "",
    name: "Cree"
  },
  {
    alpha2: "",
    alpha3: "crh",
    bibliographic: "",
    name: "Crimean Tatar"
  },
  {
    alpha2: "",
    alpha3: "crh",
    bibliographic: "",
    name: "Crimean Turkish"
  },
  {
    alpha2: "",
    alpha3: "crp",
    bibliographic: "",
    name: "Creoles and pidgins"
  },
  {
    alpha2: "",
    alpha3: "csb",
    bibliographic: "",
    name: "Kashubian"
  },
  {
    alpha2: "",
    alpha3: "cus",
    bibliographic: "",
    name: "Cushitic languages"
  },
  {
    alpha2: "cy",
    alpha3: "cym",
    bibliographic: "wel",
    name: "Welsh"
  },
  {
    alpha2: "",
    alpha3: "dak",
    bibliographic: "",
    name: "Dakota"
  },
  {
    alpha2: "da",
    alpha3: "dan",
    bibliographic: "",
    name: "Danish"
  },
  {
    alpha2: "",
    alpha3: "dar",
    bibliographic: "",
    name: "Dargwa"
  },
  {
    alpha2: "",
    alpha3: "day",
    bibliographic: "",
    name: "Land Dayak languages"
  },
  {
    alpha2: "",
    alpha3: "del",
    bibliographic: "",
    name: "Delaware"
  },
  {
    alpha2: "",
    alpha3: "den",
    bibliographic: "",
    name: "Slave (Athapascan)"
  },
  {
    alpha2: "de",
    alpha3: "deu",
    bibliographic: "ger",
    name: "German"
  },
  {
    alpha2: "",
    alpha3: "dgr",
    bibliographic: "",
    name: "Dogrib"
  },
  {
    alpha2: "",
    alpha3: "din",
    bibliographic: "",
    name: "Dinka"
  },
  {
    alpha2: "dv",
    alpha3: "div",
    bibliographic: "",
    name: "Dhivehi"
  },
  {
    alpha2: "dv",
    alpha3: "div",
    bibliographic: "",
    name: "Divehi"
  },
  {
    alpha2: "dv",
    alpha3: "div",
    bibliographic: "",
    name: "Maldivian"
  },
  {
    alpha2: "",
    alpha3: "doi",
    bibliographic: "",
    name: "Dogri"
  },
  {
    alpha2: "",
    alpha3: "dra",
    bibliographic: "",
    name: "Dravidian languages"
  },
  {
    alpha2: "",
    alpha3: "dsb",
    bibliographic: "",
    name: "Lower Sorbian"
  },
  {
    alpha2: "",
    alpha3: "dua",
    bibliographic: "",
    name: "Duala"
  },
  {
    alpha2: "",
    alpha3: "dum",
    bibliographic: "",
    name: "Dutch, Middle (ca.1050-1350)"
  },
  {
    alpha2: "",
    alpha3: "dyu",
    bibliographic: "",
    name: "Dyula"
  },
  {
    alpha2: "dz",
    alpha3: "dzo",
    bibliographic: "",
    name: "Dzongkha"
  },
  {
    alpha2: "",
    alpha3: "efi",
    bibliographic: "",
    name: "Efik"
  },
  {
    alpha2: "",
    alpha3: "egy",
    bibliographic: "",
    name: "Egyptian (Ancient)"
  },
  {
    alpha2: "",
    alpha3: "eka",
    bibliographic: "",
    name: "Ekajuk"
  },
  {
    alpha2: "el",
    alpha3: "ell",
    bibliographic: "gre",
    name: "Greek"
  },
  {
    alpha2: "",
    alpha3: "elx",
    bibliographic: "",
    name: "Elamite"
  },
  {
    alpha2: "en",
    alpha3: "eng",
    bibliographic: "",
    name: "English"
  },
  {
    alpha2: "",
    alpha3: "enm",
    bibliographic: "",
    name: "English, Middle (1100-1500)"
  },
  {
    alpha2: "eo",
    alpha3: "epo",
    bibliographic: "",
    name: "Esperanto"
  },
  {
    alpha2: "et",
    alpha3: "est",
    bibliographic: "",
    name: "Estonian"
  },
  {
    alpha2: "eu",
    alpha3: "eus",
    bibliographic: "baq",
    name: "Basque"
  },
  {
    alpha2: "ee",
    alpha3: "ewe",
    bibliographic: "",
    name: "Ewe"
  },
  {
    alpha2: "",
    alpha3: "ewo",
    bibliographic: "",
    name: "Ewondo"
  },
  {
    alpha2: "",
    alpha3: "fan",
    bibliographic: "",
    name: "Fang"
  },
  {
    alpha2: "fo",
    alpha3: "fao",
    bibliographic: "",
    name: "Faroese"
  },
  {
    alpha2: "fa",
    alpha3: "fas",
    bibliographic: "per",
    name: "Persian"
  },
  {
    alpha2: "",
    alpha3: "fat",
    bibliographic: "",
    name: "Fanti"
  },
  {
    alpha2: "fj",
    alpha3: "fij",
    bibliographic: "",
    name: "Fijian"
  },
  {
    alpha2: "",
    alpha3: "fil",
    bibliographic: "",
    name: "Filipino"
  },
  {
    alpha2: "",
    alpha3: "fil",
    bibliographic: "",
    name: "Pilipino"
  },
  {
    alpha2: "fi",
    alpha3: "fin",
    bibliographic: "",
    name: "Finnish"
  },
  {
    alpha2: "",
    alpha3: "fiu",
    bibliographic: "",
    name: "Finno-Ugrian languages"
  },
  {
    alpha2: "",
    alpha3: "fon",
    bibliographic: "",
    name: "Fon"
  },
  {
    alpha2: "fr",
    alpha3: "fra",
    bibliographic: "fre",
    name: "French"
  },
  {
    alpha2: "",
    alpha3: "frm",
    bibliographic: "",
    name: "French, Middle (ca.1400-1600)"
  },
  {
    alpha2: "",
    alpha3: "fro",
    bibliographic: "",
    name: "French, Old (842-ca.1400)"
  },
  {
    alpha2: "",
    alpha3: "frr",
    bibliographic: "",
    name: "Northern Frisian"
  },
  {
    alpha2: "",
    alpha3: "frs",
    bibliographic: "",
    name: "Eastern Frisian"
  },
  {
    alpha2: "fy",
    alpha3: "fry",
    bibliographic: "",
    name: "Western Frisian"
  },
  {
    alpha2: "ff",
    alpha3: "ful",
    bibliographic: "",
    name: "Fulah"
  },
  {
    alpha2: "",
    alpha3: "fur",
    bibliographic: "",
    name: "Friulian"
  },
  {
    alpha2: "",
    alpha3: "gaa",
    bibliographic: "",
    name: "Ga"
  },
  {
    alpha2: "",
    alpha3: "gay",
    bibliographic: "",
    name: "Gayo"
  },
  {
    alpha2: "",
    alpha3: "gba",
    bibliographic: "",
    name: "Gbaya"
  },
  {
    alpha2: "",
    alpha3: "gem",
    bibliographic: "",
    name: "Germanic languages"
  },
  {
    alpha2: "",
    alpha3: "gez",
    bibliographic: "",
    name: "Geez"
  },
  {
    alpha2: "",
    alpha3: "gil",
    bibliographic: "",
    name: "Gilbertese"
  },
  {
    alpha2: "gd",
    alpha3: "gla",
    bibliographic: "",
    name: "Gaelic"
  },
  {
    alpha2: "gd",
    alpha3: "gla",
    bibliographic: "",
    name: "Scottish Gaelic"
  },
  {
    alpha2: "ga",
    alpha3: "gle",
    bibliographic: "",
    name: "Irish"
  },
  {
    alpha2: "gl",
    alpha3: "glg",
    bibliographic: "",
    name: "Galician"
  },
  {
    alpha2: "gv",
    alpha3: "glv",
    bibliographic: "",
    name: "Manx"
  },
  {
    alpha2: "",
    alpha3: "gmh",
    bibliographic: "",
    name: "German, Middle High (ca.1050-1500)"
  },
  {
    alpha2: "",
    alpha3: "goh",
    bibliographic: "",
    name: "German, Old High (ca.750-1050)"
  },
  {
    alpha2: "",
    alpha3: "gon",
    bibliographic: "",
    name: "Gondi"
  },
  {
    alpha2: "",
    alpha3: "gor",
    bibliographic: "",
    name: "Gorontalo"
  },
  {
    alpha2: "",
    alpha3: "got",
    bibliographic: "",
    name: "Gothic"
  },
  {
    alpha2: "",
    alpha3: "grb",
    bibliographic: "",
    name: "Grebo"
  },
  {
    alpha2: "",
    alpha3: "grc",
    bibliographic: "",
    name: "Greek, Ancient (to 1453)"
  },
  {
    alpha2: "gn",
    alpha3: "grn",
    bibliographic: "",
    name: "Guarani"
  },
  {
    alpha2: "",
    alpha3: "gsw",
    bibliographic: "",
    name: "Alemannic"
  },
  {
    alpha2: "",
    alpha3: "gsw",
    bibliographic: "",
    name: "Alsatian"
  },
  {
    alpha2: "",
    alpha3: "gsw",
    bibliographic: "",
    name: "Swiss German"
  },
  {
    alpha2: "gu",
    alpha3: "guj",
    bibliographic: "",
    name: "Gujarati"
  },
  {
    alpha2: "",
    alpha3: "gwi",
    bibliographic: "",
    name: "Gwich'in"
  },
  {
    alpha2: "",
    alpha3: "hai",
    bibliographic: "",
    name: "Haida"
  },
  {
    alpha2: "ht",
    alpha3: "hat",
    bibliographic: "",
    name: "Haitian"
  },
  {
    alpha2: "ht",
    alpha3: "hat",
    bibliographic: "",
    name: "Haitian Creole"
  },
  {
    alpha2: "ha",
    alpha3: "hau",
    bibliographic: "",
    name: "Hausa"
  },
  {
    alpha2: "",
    alpha3: "haw",
    bibliographic: "",
    name: "Hawaiian"
  },
  {
    alpha2: "he",
    alpha3: "heb",
    bibliographic: "",
    name: "Hebrew"
  },
  {
    alpha2: "hz",
    alpha3: "her",
    bibliographic: "",
    name: "Herero"
  },
  {
    alpha2: "",
    alpha3: "hil",
    bibliographic: "",
    name: "Hiligaynon"
  },
  {
    alpha2: "",
    alpha3: "him",
    bibliographic: "",
    name: "Himachali languages"
  },
  {
    alpha2: "",
    alpha3: "him",
    bibliographic: "",
    name: "Western Pahari languages"
  },
  {
    alpha2: "hi",
    alpha3: "hin",
    bibliographic: "",
    name: "Hindi"
  },
  {
    alpha2: "",
    alpha3: "hit",
    bibliographic: "",
    name: "Hittite"
  },
  {
    alpha2: "",
    alpha3: "hmn",
    bibliographic: "",
    name: "Hmong"
  },
  {
    alpha2: "",
    alpha3: "hmn",
    bibliographic: "",
    name: "Mong"
  },
  {
    alpha2: "ho",
    alpha3: "hmo",
    bibliographic: "",
    name: "Hiri Motu"
  },
  {
    alpha2: "hr",
    alpha3: "hrv",
    bibliographic: "",
    name: "Croatian"
  },
  {
    alpha2: "",
    alpha3: "hsb",
    bibliographic: "",
    name: "Upper Sorbian"
  },
  {
    alpha2: "hu",
    alpha3: "hun",
    bibliographic: "",
    name: "Hungarian"
  },
  {
    alpha2: "",
    alpha3: "hup",
    bibliographic: "",
    name: "Hupa"
  },
  {
    alpha2: "hy",
    alpha3: "hye",
    bibliographic: "arm",
    name: "Armenian"
  },
  {
    alpha2: "",
    alpha3: "iba",
    bibliographic: "",
    name: "Iban"
  },
  {
    alpha2: "ig",
    alpha3: "ibo",
    bibliographic: "",
    name: "Igbo"
  },
  {
    alpha2: "io",
    alpha3: "ido",
    bibliographic: "",
    name: "Ido"
  },
  {
    alpha2: "ii",
    alpha3: "iii",
    bibliographic: "",
    name: "Nuosu"
  },
  {
    alpha2: "ii",
    alpha3: "iii",
    bibliographic: "",
    name: "Sichuan Yi"
  },
  {
    alpha2: "",
    alpha3: "ijo",
    bibliographic: "",
    name: "Ijo languages"
  },
  {
    alpha2: "iu",
    alpha3: "iku",
    bibliographic: "",
    name: "Inuktitut"
  },
  {
    alpha2: "ie",
    alpha3: "ile",
    bibliographic: "",
    name: "Interlingue"
  },
  {
    alpha2: "ie",
    alpha3: "ile",
    bibliographic: "",
    name: "Occidental"
  },
  {
    alpha2: "",
    alpha3: "ilo",
    bibliographic: "",
    name: "Iloko"
  },
  {
    alpha2: "ia",
    alpha3: "ina",
    bibliographic: "",
    name: "Interlingua (International Auxiliary Language Association)"
  },
  {
    alpha2: "",
    alpha3: "inc",
    bibliographic: "",
    name: "Indic languages"
  },
  {
    alpha2: "id",
    alpha3: "ind",
    bibliographic: "",
    name: "Indonesian"
  },
  {
    alpha2: "",
    alpha3: "ine",
    bibliographic: "",
    name: "Indo-European languages"
  },
  {
    alpha2: "",
    alpha3: "inh",
    bibliographic: "",
    name: "Ingush"
  },
  {
    alpha2: "ik",
    alpha3: "ipk",
    bibliographic: "",
    name: "Inupiaq"
  },
  {
    alpha2: "",
    alpha3: "ira",
    bibliographic: "",
    name: "Iranian languages"
  },
  {
    alpha2: "",
    alpha3: "iro",
    bibliographic: "",
    name: "Iroquoian languages"
  },
  {
    alpha2: "is",
    alpha3: "isl",
    bibliographic: "ice",
    name: "Icelandic"
  },
  {
    alpha2: "it",
    alpha3: "ita",
    bibliographic: "",
    name: "Italian"
  },
  {
    alpha2: "jv",
    alpha3: "jav",
    bibliographic: "",
    name: "Javanese"
  },
  {
    alpha2: "",
    alpha3: "jbo",
    bibliographic: "",
    name: "Lojban"
  },
  {
    alpha2: "ja",
    alpha3: "jpn",
    bibliographic: "",
    name: "Japanese"
  },
  {
    alpha2: "",
    alpha3: "jpr",
    bibliographic: "",
    name: "Judeo-Persian"
  },
  {
    alpha2: "",
    alpha3: "jrb",
    bibliographic: "",
    name: "Judeo-Arabic"
  },
  {
    alpha2: "",
    alpha3: "kaa",
    bibliographic: "",
    name: "Kara-Kalpak"
  },
  {
    alpha2: "",
    alpha3: "kab",
    bibliographic: "",
    name: "Kabyle"
  },
  {
    alpha2: "",
    alpha3: "kac",
    bibliographic: "",
    name: "Jingpho"
  },
  {
    alpha2: "",
    alpha3: "kac",
    bibliographic: "",
    name: "Kachin"
  },
  {
    alpha2: "kl",
    alpha3: "kal",
    bibliographic: "",
    name: "Greenlandic"
  },
  {
    alpha2: "kl",
    alpha3: "kal",
    bibliographic: "",
    name: "Kalaallisut"
  },
  {
    alpha2: "",
    alpha3: "kam",
    bibliographic: "",
    name: "Kamba"
  },
  {
    alpha2: "kn",
    alpha3: "kan",
    bibliographic: "",
    name: "Kannada"
  },
  {
    alpha2: "",
    alpha3: "kar",
    bibliographic: "",
    name: "Karen languages"
  },
  {
    alpha2: "ks",
    alpha3: "kas",
    bibliographic: "",
    name: "Kashmiri"
  },
  {
    alpha2: "ka",
    alpha3: "kat",
    bibliographic: "geo",
    name: "Georgian"
  },
  {
    alpha2: "kr",
    alpha3: "kau",
    bibliographic: "",
    name: "Kanuri"
  },
  {
    alpha2: "",
    alpha3: "kaw",
    bibliographic: "",
    name: "Kawi"
  },
  {
    alpha2: "kk",
    alpha3: "kaz",
    bibliographic: "",
    name: "Kazakh"
  },
  {
    alpha2: "",
    alpha3: "kbd",
    bibliographic: "",
    name: "Kabardian"
  },
  {
    alpha2: "",
    alpha3: "kha",
    bibliographic: "",
    name: "Khasi"
  },
  {
    alpha2: "",
    alpha3: "khi",
    bibliographic: "",
    name: "Khoisan languages"
  },
  {
    alpha2: "km",
    alpha3: "khm",
    bibliographic: "",
    name: "Central Khmer"
  },
  {
    alpha2: "",
    alpha3: "kho",
    bibliographic: "",
    name: "Khotanese"
  },
  {
    alpha2: "",
    alpha3: "kho",
    bibliographic: "",
    name: "Sakan"
  },
  {
    alpha2: "ki",
    alpha3: "kik",
    bibliographic: "",
    name: "Gikuyu"
  },
  {
    alpha2: "ki",
    alpha3: "kik",
    bibliographic: "",
    name: "Kikuyu"
  },
  {
    alpha2: "rw",
    alpha3: "kin",
    bibliographic: "",
    name: "Kinyarwanda"
  },
  {
    alpha2: "ky",
    alpha3: "kir",
    bibliographic: "",
    name: "Kirghiz"
  },
  {
    alpha2: "ky",
    alpha3: "kir",
    bibliographic: "",
    name: "Kyrgyz"
  },
  {
    alpha2: "",
    alpha3: "kmb",
    bibliographic: "",
    name: "Kimbundu"
  },
  {
    alpha2: "",
    alpha3: "kok",
    bibliographic: "",
    name: "Konkani"
  },
  {
    alpha2: "kv",
    alpha3: "kom",
    bibliographic: "",
    name: "Komi"
  },
  {
    alpha2: "kg",
    alpha3: "kon",
    bibliographic: "",
    name: "Kongo"
  },
  {
    alpha2: "ko",
    alpha3: "kor",
    bibliographic: "",
    name: "Korean"
  },
  {
    alpha2: "",
    alpha3: "kos",
    bibliographic: "",
    name: "Kosraean"
  },
  {
    alpha2: "",
    alpha3: "kpe",
    bibliographic: "",
    name: "Kpelle"
  },
  {
    alpha2: "",
    alpha3: "krc",
    bibliographic: "",
    name: "Karachay-Balkar"
  },
  {
    alpha2: "",
    alpha3: "krl",
    bibliographic: "",
    name: "Karelian"
  },
  {
    alpha2: "",
    alpha3: "kro",
    bibliographic: "",
    name: "Kru languages"
  },
  {
    alpha2: "",
    alpha3: "kru",
    bibliographic: "",
    name: "Kurukh"
  },
  {
    alpha2: "kj",
    alpha3: "kua",
    bibliographic: "",
    name: "Kuanyama"
  },
  {
    alpha2: "kj",
    alpha3: "kua",
    bibliographic: "",
    name: "Kwanyama"
  },
  {
    alpha2: "",
    alpha3: "kum",
    bibliographic: "",
    name: "Kumyk"
  },
  {
    alpha2: "ku",
    alpha3: "kur",
    bibliographic: "",
    name: "Kurdish"
  },
  {
    alpha2: "",
    alpha3: "kut",
    bibliographic: "",
    name: "Kutenai"
  },
  {
    alpha2: "",
    alpha3: "lad",
    bibliographic: "",
    name: "Ladino"
  },
  {
    alpha2: "",
    alpha3: "lah",
    bibliographic: "",
    name: "Lahnda"
  },
  {
    alpha2: "",
    alpha3: "lam",
    bibliographic: "",
    name: "Lamba"
  },
  {
    alpha2: "lo",
    alpha3: "lao",
    bibliographic: "",
    name: "Lao"
  },
  {
    alpha2: "la",
    alpha3: "lat",
    bibliographic: "",
    name: "Latin"
  },
  {
    alpha2: "lv",
    alpha3: "lav",
    bibliographic: "",
    name: "Latvian"
  },
  {
    alpha2: "",
    alpha3: "lez",
    bibliographic: "",
    name: "Lezghian"
  },
  {
    alpha2: "li",
    alpha3: "lim",
    bibliographic: "",
    name: "Limburgan"
  },
  {
    alpha2: "li",
    alpha3: "lim",
    bibliographic: "",
    name: "Limburger"
  },
  {
    alpha2: "li",
    alpha3: "lim",
    bibliographic: "",
    name: "Limburgish"
  },
  {
    alpha2: "ln",
    alpha3: "lin",
    bibliographic: "",
    name: "Lingala"
  },
  {
    alpha2: "lt",
    alpha3: "lit",
    bibliographic: "",
    name: "Lithuanian"
  },
  {
    alpha2: "",
    alpha3: "lol",
    bibliographic: "",
    name: "Mongo"
  },
  {
    alpha2: "",
    alpha3: "loz",
    bibliographic: "",
    name: "Lozi"
  },
  {
    alpha2: "lb",
    alpha3: "ltz",
    bibliographic: "",
    name: "Letzeburgesch"
  },
  {
    alpha2: "lb",
    alpha3: "ltz",
    bibliographic: "",
    name: "Luxembourgish"
  },
  {
    alpha2: "",
    alpha3: "lua",
    bibliographic: "",
    name: "Luba-Lulua"
  },
  {
    alpha2: "lu",
    alpha3: "lub",
    bibliographic: "",
    name: "Luba-Katanga"
  },
  {
    alpha2: "lg",
    alpha3: "lug",
    bibliographic: "",
    name: "Ganda"
  },
  {
    alpha2: "",
    alpha3: "lui",
    bibliographic: "",
    name: "Luiseno"
  },
  {
    alpha2: "",
    alpha3: "lun",
    bibliographic: "",
    name: "Lunda"
  },
  {
    alpha2: "",
    alpha3: "luo",
    bibliographic: "",
    name: "Luo (Kenya and Tanzania)"
  },
  {
    alpha2: "",
    alpha3: "lus",
    bibliographic: "",
    name: "Lushai"
  },
  {
    alpha2: "",
    alpha3: "mad",
    bibliographic: "",
    name: "Madurese"
  },
  {
    alpha2: "",
    alpha3: "mag",
    bibliographic: "",
    name: "Magahi"
  },
  {
    alpha2: "mh",
    alpha3: "mah",
    bibliographic: "",
    name: "Marshallese"
  },
  {
    alpha2: "",
    alpha3: "mai",
    bibliographic: "",
    name: "Maithili"
  },
  {
    alpha2: "",
    alpha3: "mak",
    bibliographic: "",
    name: "Makasar"
  },
  {
    alpha2: "ml",
    alpha3: "mal",
    bibliographic: "",
    name: "Malayalam"
  },
  {
    alpha2: "",
    alpha3: "man",
    bibliographic: "",
    name: "Mandingo"
  },
  {
    alpha2: "",
    alpha3: "map",
    bibliographic: "",
    name: "Austronesian languages"
  },
  {
    alpha2: "mr",
    alpha3: "mar",
    bibliographic: "",
    name: "Marathi"
  },
  {
    alpha2: "",
    alpha3: "mas",
    bibliographic: "",
    name: "Masai"
  },
  {
    alpha2: "",
    alpha3: "mdf",
    bibliographic: "",
    name: "Moksha"
  },
  {
    alpha2: "",
    alpha3: "mdr",
    bibliographic: "",
    name: "Mandar"
  },
  {
    alpha2: "",
    alpha3: "men",
    bibliographic: "",
    name: "Mende"
  },
  {
    alpha2: "",
    alpha3: "mga",
    bibliographic: "",
    name: "Irish, Middle (900-1200)"
  },
  {
    alpha2: "",
    alpha3: "mic",
    bibliographic: "",
    name: "Mi'kmaq"
  },
  {
    alpha2: "",
    alpha3: "mic",
    bibliographic: "",
    name: "Micmac"
  },
  {
    alpha2: "",
    alpha3: "min",
    bibliographic: "",
    name: "Minangkabau"
  },
  {
    alpha2: "",
    alpha3: "mis",
    bibliographic: "",
    name: "Uncoded languages"
  },
  {
    alpha2: "mk",
    alpha3: "mkd",
    bibliographic: "mac",
    name: "Macedonian"
  },
  {
    alpha2: "",
    alpha3: "mkh",
    bibliographic: "",
    name: "Mon-Khmer languages"
  },
  {
    alpha2: "mg",
    alpha3: "mlg",
    bibliographic: "",
    name: "Malagasy"
  },
  {
    alpha2: "mt",
    alpha3: "mlt",
    bibliographic: "",
    name: "Maltese"
  },
  {
    alpha2: "",
    alpha3: "mnc",
    bibliographic: "",
    name: "Manchu"
  },
  {
    alpha2: "",
    alpha3: "mni",
    bibliographic: "",
    name: "Manipuri"
  },
  {
    alpha2: "",
    alpha3: "mno",
    bibliographic: "",
    name: "Manobo languages"
  },
  {
    alpha2: "",
    alpha3: "moh",
    bibliographic: "",
    name: "Mohawk"
  },
  {
    alpha2: "mn",
    alpha3: "mon",
    bibliographic: "",
    name: "Mongolian"
  },
  {
    alpha2: "",
    alpha3: "mos",
    bibliographic: "",
    name: "Mossi"
  },
  {
    alpha2: "",
    alpha3: "mot",
    bibliographic: "",
    name: "Montenegrin"
  },
  {
    alpha2: "mi",
    alpha3: "mri",
    bibliographic: "mao",
    name: "Maori"
  },
  {
    alpha2: "ms",
    alpha3: "msa",
    bibliographic: "may",
    name: "Malay"
  },
  {
    alpha2: "",
    alpha3: "mul",
    bibliographic: "",
    name: "Multiple languages"
  },
  {
    alpha2: "",
    alpha3: "mun",
    bibliographic: "",
    name: "Munda languages"
  },
  {
    alpha2: "",
    alpha3: "mus",
    bibliographic: "",
    name: "Creek"
  },
  {
    alpha2: "",
    alpha3: "mwl",
    bibliographic: "",
    name: "Mirandese"
  },
  {
    alpha2: "",
    alpha3: "mwr",
    bibliographic: "",
    name: "Marwari"
  },
  {
    alpha2: "my",
    alpha3: "mya",
    bibliographic: "bur",
    name: "Burmese"
  },
  {
    alpha2: "",
    alpha3: "myn",
    bibliographic: "",
    name: "Mayan languages"
  },
  {
    alpha2: "",
    alpha3: "myv",
    bibliographic: "",
    name: "Erzya"
  },
  {
    alpha2: "",
    alpha3: "nah",
    bibliographic: "",
    name: "Nahuatl languages"
  },
  {
    alpha2: "",
    alpha3: "nai",
    bibliographic: "",
    name: "North American Indian languages"
  },
  {
    alpha2: "",
    alpha3: "nap",
    bibliographic: "",
    name: "Neapolitan"
  },
  {
    alpha2: "na",
    alpha3: "nau",
    bibliographic: "",
    name: "Nauru"
  },
  {
    alpha2: "nv",
    alpha3: "nav",
    bibliographic: "",
    name: "Navaho"
  },
  {
    alpha2: "nv",
    alpha3: "nav",
    bibliographic: "",
    name: "Navajo"
  },
  {
    alpha2: "nr",
    alpha3: "nbl",
    bibliographic: "",
    name: "Ndebele, South"
  },
  {
    alpha2: "nr",
    alpha3: "nbl",
    bibliographic: "",
    name: "South Ndebele"
  },
  {
    alpha2: "nd",
    alpha3: "nde",
    bibliographic: "",
    name: "Ndebele, North"
  },
  {
    alpha2: "nd",
    alpha3: "nde",
    bibliographic: "",
    name: "North Ndebele"
  },
  {
    alpha2: "ng",
    alpha3: "ndo",
    bibliographic: "",
    name: "Ndonga"
  },
  {
    alpha2: "",
    alpha3: "nds",
    bibliographic: "",
    name: "German, Low"
  },
  {
    alpha2: "",
    alpha3: "nds",
    bibliographic: "",
    name: "Low German"
  },
  {
    alpha2: "",
    alpha3: "nds",
    bibliographic: "",
    name: "Low Saxon"
  },
  {
    alpha2: "",
    alpha3: "nds",
    bibliographic: "",
    name: "Saxon, Low"
  },
  {
    alpha2: "ne",
    alpha3: "nep",
    bibliographic: "",
    name: "Nepali"
  },
  {
    alpha2: "",
    alpha3: "new",
    bibliographic: "",
    name: "Nepal Bhasa"
  },
  {
    alpha2: "",
    alpha3: "new",
    bibliographic: "",
    name: "Newari"
  },
  {
    alpha2: "",
    alpha3: "nia",
    bibliographic: "",
    name: "Nias"
  },
  {
    alpha2: "",
    alpha3: "nic",
    bibliographic: "",
    name: "Niger-Kordofanian languages"
  },
  {
    alpha2: "",
    alpha3: "niu",
    bibliographic: "",
    name: "Niuean"
  },
  {
    alpha2: "",
    alpha3: "",
    bibliographic: "dut",
    name: "Flemish"
  },
  {
    alpha2: "nl",
    alpha3: "nld",
    bibliographic: "dut",
    name: "Dutch"
  },
  {
    alpha2: "nn",
    alpha3: "nno",
    bibliographic: "",
    name: "Norwegian Nynorsk"
  },
  {
    alpha2: "nn",
    alpha3: "nno",
    bibliographic: "",
    name: "Nynorsk, Norwegian"
  },
  {
    alpha2: "nb",
    alpha3: "nob",
    bibliographic: "",
    name: "Bokmål, Norwegian"
  },
  {
    alpha2: "nb",
    alpha3: "nob",
    bibliographic: "",
    name: "Norwegian Bokmål"
  },
  {
    alpha2: "",
    alpha3: "nog",
    bibliographic: "",
    name: "Nogai"
  },
  {
    alpha2: "",
    alpha3: "non",
    bibliographic: "",
    name: "Norse, Old"
  },
  {
    alpha2: "no",
    alpha3: "nor",
    bibliographic: "",
    name: "Norwegian"
  },
  {
    alpha2: "",
    alpha3: "nqo",
    bibliographic: "",
    name: "N'Ko"
  },
  {
    alpha2: "",
    alpha3: "nso",
    bibliographic: "",
    name: "Northern Sotho"
  },
  {
    alpha2: "",
    alpha3: "nso",
    bibliographic: "",
    name: "Pedi"
  },
  {
    alpha2: "",
    alpha3: "nso",
    bibliographic: "",
    name: "Sepedi"
  },
  {
    alpha2: "",
    alpha3: "nso",
    bibliographic: "",
    name: "Sotho, Northern"
  },
  {
    alpha2: "",
    alpha3: "nub",
    bibliographic: "",
    name: "Nubian languages"
  },
  {
    alpha2: "",
    alpha3: "nwc",
    bibliographic: "",
    name: "Classical Nepal Bhasa"
  },
  {
    alpha2: "",
    alpha3: "nwc",
    bibliographic: "",
    name: "Classical Newari"
  },
  {
    alpha2: "",
    alpha3: "nwc",
    bibliographic: "",
    name: "Old Newari"
  },
  {
    alpha2: "ny",
    alpha3: "nya",
    bibliographic: "",
    name: "Chewa"
  },
  {
    alpha2: "ny",
    alpha3: "nya",
    bibliographic: "",
    name: "Chichewa"
  },
  {
    alpha2: "ny",
    alpha3: "nya",
    bibliographic: "",
    name: "Nyanja"
  },
  {
    alpha2: "",
    alpha3: "nym",
    bibliographic: "",
    name: "Nyamwezi"
  },
  {
    alpha2: "",
    alpha3: "nyn",
    bibliographic: "",
    name: "Nyankole"
  },
  {
    alpha2: "",
    alpha3: "nyo",
    bibliographic: "",
    name: "Nyoro"
  },
  {
    alpha2: "",
    alpha3: "nzi",
    bibliographic: "",
    name: "Nzima"
  },
  {
    alpha2: "oc",
    alpha3: "oci",
    bibliographic: "",
    name: "Occitan (post 1500)"
  },
  {
    alpha2: "oj",
    alpha3: "oji",
    bibliographic: "",
    name: "Ojibwa"
  },
  {
    alpha2: "or",
    alpha3: "ori",
    bibliographic: "",
    name: "Oriya"
  },
  {
    alpha2: "om",
    alpha3: "orm",
    bibliographic: "",
    name: "Oromo"
  },
  {
    alpha2: "",
    alpha3: "osa",
    bibliographic: "",
    name: "Osage"
  },
  {
    alpha2: "os",
    alpha3: "oss",
    bibliographic: "",
    name: "Ossetian"
  },
  {
    alpha2: "os",
    alpha3: "oss",
    bibliographic: "",
    name: "Ossetic"
  },
  {
    alpha2: "",
    alpha3: "ota",
    bibliographic: "",
    name: "Turkish, Ottoman (1500-1928)"
  },
  {
    alpha2: "",
    alpha3: "oto",
    bibliographic: "",
    name: "Otomian languages"
  },
  {
    alpha2: "",
    alpha3: "paa",
    bibliographic: "",
    name: "Papuan languages"
  },
  {
    alpha2: "",
    alpha3: "pag",
    bibliographic: "",
    name: "Pangasinan"
  },
  {
    alpha2: "",
    alpha3: "pal",
    bibliographic: "",
    name: "Pahlavi"
  },
  {
    alpha2: "",
    alpha3: "pam",
    bibliographic: "",
    name: "Kapampangan"
  },
  {
    alpha2: "",
    alpha3: "pam",
    bibliographic: "",
    name: "Pampanga"
  },
  {
    alpha2: "pa",
    alpha3: "pan",
    bibliographic: "",
    name: "Panjabi"
  },
  {
    alpha2: "pa",
    alpha3: "pan",
    bibliographic: "",
    name: "Punjabi"
  },
  {
    alpha2: "",
    alpha3: "pap",
    bibliographic: "",
    name: "Papiamento"
  },
  {
    alpha2: "",
    alpha3: "pau",
    bibliographic: "",
    name: "Palauan"
  },
  {
    alpha2: "",
    alpha3: "peo",
    bibliographic: "",
    name: "Persian, Old (ca.600-400 B.C.)"
  },
  {
    alpha2: "",
    alpha3: "phi",
    bibliographic: "",
    name: "Philippine languages"
  },
  {
    alpha2: "",
    alpha3: "phn",
    bibliographic: "",
    name: "Phoenician"
  },
  {
    alpha2: "pi",
    alpha3: "pli",
    bibliographic: "",
    name: "Pali"
  },
  {
    alpha2: "pl",
    alpha3: "pol",
    bibliographic: "",
    name: "Polish"
  },
  {
    alpha2: "",
    alpha3: "pon",
    bibliographic: "",
    name: "Pohnpeian"
  },
  {
    alpha2: "pt",
    alpha3: "por",
    bibliographic: "",
    name: "Portuguese"
  },
  {
    alpha2: "",
    alpha3: "pra",
    bibliographic: "",
    name: "Prakrit languages"
  },
  {
    alpha2: "",
    alpha3: "pro",
    bibliographic: "",
    name: "Occitan, Old (to 1500)"
  },
  {
    alpha2: "",
    alpha3: "pro",
    bibliographic: "",
    name: "Provençal, Old (to 1500)"
  },
  {
    alpha2: "ps",
    alpha3: "pus",
    bibliographic: "",
    name: "Pashto"
  },
  {
    alpha2: "ps",
    alpha3: "pus",
    bibliographic: "",
    name: "Pushto"
  },
  {
    alpha2: "qu",
    alpha3: "que",
    bibliographic: "",
    name: "Quechua"
  },
  {
    alpha2: "",
    alpha3: "raj",
    bibliographic: "",
    name: "Rajasthani"
  },
  {
    alpha2: "",
    alpha3: "rap",
    bibliographic: "",
    name: "Rapanui"
  },
  {
    alpha2: "",
    alpha3: "rar",
    bibliographic: "",
    name: "Cook Islands Maori"
  },
  {
    alpha2: "",
    alpha3: "rar",
    bibliographic: "",
    name: "Rarotongan"
  },
  {
    alpha2: "",
    alpha3: "roa",
    bibliographic: "",
    name: "Romance languages"
  },
  {
    alpha2: "rm",
    alpha3: "roh",
    bibliographic: "",
    name: "Romansh"
  },
  {
    alpha2: "",
    alpha3: "rom",
    bibliographic: "",
    name: "Romany"
  },
  {
    alpha2: "ro",
    alpha3: "ron",
    bibliographic: "rum",
    name: "Moldavian"
  },
  {
    alpha2: "ro",
    alpha3: "ron",
    bibliographic: "rum",
    name: "Romanian"
  },
  {
    alpha2: "rn",
    alpha3: "run",
    bibliographic: "",
    name: "Rundi"
  },
  {
    alpha2: "",
    alpha3: "rup",
    bibliographic: "",
    name: "Aromanian"
  },
  {
    alpha2: "",
    alpha3: "rup",
    bibliographic: "",
    name: "Arumanian"
  },
  {
    alpha2: "",
    alpha3: "rup",
    bibliographic: "",
    name: "Macedo-Romanian"
  },
  {
    alpha2: "ru",
    alpha3: "rus",
    bibliographic: "",
    name: "Russian"
  },
  {
    alpha2: "",
    alpha3: "sad",
    bibliographic: "",
    name: "Sandawe"
  },
  {
    alpha2: "sg",
    alpha3: "sag",
    bibliographic: "",
    name: "Sango"
  },
  {
    alpha2: "",
    alpha3: "sah",
    bibliographic: "",
    name: "Yakut"
  },
  {
    alpha2: "",
    alpha3: "sai",
    bibliographic: "",
    name: "South American Indian languages"
  },
  {
    alpha2: "",
    alpha3: "sal",
    bibliographic: "",
    name: "Salishan languages"
  },
  {
    alpha2: "",
    alpha3: "sam",
    bibliographic: "",
    name: "Samaritan Aramaic"
  },
  {
    alpha2: "sa",
    alpha3: "san",
    bibliographic: "",
    name: "Sanskrit"
  },
  {
    alpha2: "",
    alpha3: "sas",
    bibliographic: "",
    name: "Sasak"
  },
  {
    alpha2: "",
    alpha3: "sat",
    bibliographic: "",
    name: "Santali"
  },
  {
    alpha2: "",
    alpha3: "scn",
    bibliographic: "",
    name: "Sicilian"
  },
  {
    alpha2: "",
    alpha3: "sco",
    bibliographic: "",
    name: "Scots"
  },
  {
    alpha2: "",
    alpha3: "sel",
    bibliographic: "",
    name: "Selkup"
  },
  {
    alpha2: "",
    alpha3: "sem",
    bibliographic: "",
    name: "Semitic languages"
  },
  {
    alpha2: "",
    alpha3: "sga",
    bibliographic: "",
    name: "Irish, Old (to 900)"
  },
  {
    alpha2: "",
    alpha3: "sgn",
    bibliographic: "",
    name: "Sign Languages"
  },
  {
    alpha2: "",
    alpha3: "shn",
    bibliographic: "",
    name: "Shan"
  },
  {
    alpha2: "",
    alpha3: "sid",
    bibliographic: "",
    name: "Sidamo"
  },
  {
    alpha2: "si",
    alpha3: "sin",
    bibliographic: "",
    name: "Sinhala"
  },
  {
    alpha2: "si",
    alpha3: "sin",
    bibliographic: "",
    name: "Sinhalese"
  },
  {
    alpha2: "",
    alpha3: "sio",
    bibliographic: "",
    name: "Siouan languages"
  },
  {
    alpha2: "",
    alpha3: "sit",
    bibliographic: "",
    name: "Sino-Tibetan languages"
  },
  {
    alpha2: "",
    alpha3: "sla",
    bibliographic: "",
    name: "Slavic languages"
  },
  {
    alpha2: "sk",
    alpha3: "slk",
    bibliographic: "slo",
    name: "Slovak"
  },
  {
    alpha2: "sl",
    alpha3: "slv",
    bibliographic: "",
    name: "Slovenian"
  },
  {
    alpha2: "",
    alpha3: "sma",
    bibliographic: "",
    name: "Southern Sami"
  },
  {
    alpha2: "se",
    alpha3: "sme",
    bibliographic: "",
    name: "Northern Sami"
  },
  {
    alpha2: "",
    alpha3: "smi",
    bibliographic: "",
    name: "Sami languages"
  },
  {
    alpha2: "",
    alpha3: "smj",
    bibliographic: "",
    name: "Lule Sami"
  },
  {
    alpha2: "",
    alpha3: "smn",
    bibliographic: "",
    name: "Inari Sami"
  },
  {
    alpha2: "sm",
    alpha3: "smo",
    bibliographic: "",
    name: "Samoan"
  },
  {
    alpha2: "",
    alpha3: "sms",
    bibliographic: "",
    name: "Skolt Sami"
  },
  {
    alpha2: "sn",
    alpha3: "sna",
    bibliographic: "",
    name: "Shona"
  },
  {
    alpha2: "sd",
    alpha3: "snd",
    bibliographic: "",
    name: "Sindhi"
  },
  {
    alpha2: "",
    alpha3: "snk",
    bibliographic: "",
    name: "Soninke"
  },
  {
    alpha2: "",
    alpha3: "sog",
    bibliographic: "",
    name: "Sogdian"
  },
  {
    alpha2: "so",
    alpha3: "som",
    bibliographic: "",
    name: "Somali"
  },
  {
    alpha2: "",
    alpha3: "son",
    bibliographic: "",
    name: "Songhai languages"
  },
  {
    alpha2: "st",
    alpha3: "sot",
    bibliographic: "",
    name: "Sotho, Southern"
  },
  {
    alpha2: "es",
    alpha3: "spa",
    bibliographic: "",
    name: "Castilian"
  },
  {
    alpha2: "es",
    alpha3: "spa",
    bibliographic: "",
    name: "Spanish"
  },
  {
    alpha2: "sq",
    alpha3: "sqi",
    bibliographic: "alb",
    name: "Albanian"
  },
  {
    alpha2: "sc",
    alpha3: "srd",
    bibliographic: "",
    name: "Sardinian"
  },
  {
    alpha2: "",
    alpha3: "srn",
    bibliographic: "",
    name: "Sranan Tongo"
  },
  {
    alpha2: "sr",
    alpha3: "srp",
    bibliographic: "",
    name: "Serbian"
  },
  {
    alpha2: "",
    alpha3: "srr",
    bibliographic: "",
    name: "Serer"
  },
  {
    alpha2: "",
    alpha3: "ssa",
    bibliographic: "",
    name: "Nilo-Saharan languages"
  },
  {
    alpha2: "ss",
    alpha3: "ssw",
    bibliographic: "",
    name: "Swati"
  },
  {
    alpha2: "",
    alpha3: "suk",
    bibliographic: "",
    name: "Sukuma"
  },
  {
    alpha2: "su",
    alpha3: "sun",
    bibliographic: "",
    name: "Sundanese"
  },
  {
    alpha2: "",
    alpha3: "sus",
    bibliographic: "",
    name: "Susu"
  },
  {
    alpha2: "",
    alpha3: "sux",
    bibliographic: "",
    name: "Sumerian"
  },
  {
    alpha2: "sw",
    alpha3: "swa",
    bibliographic: "",
    name: "Swahili"
  },
  {
    alpha2: "sv",
    alpha3: "swe",
    bibliographic: "",
    name: "Swedish"
  },
  {
    alpha2: "",
    alpha3: "syc",
    bibliographic: "",
    name: "Classical Syriac"
  },
  {
    alpha2: "",
    alpha3: "syr",
    bibliographic: "",
    name: "Syriac"
  },
  {
    alpha2: "ty",
    alpha3: "tah",
    bibliographic: "",
    name: "Tahitian"
  },
  {
    alpha2: "",
    alpha3: "tai",
    bibliographic: "",
    name: "Tai languages"
  },
  {
    alpha2: "ta",
    alpha3: "tam",
    bibliographic: "",
    name: "Tamil"
  },
  {
    alpha2: "tt",
    alpha3: "tat",
    bibliographic: "",
    name: "Tatar"
  },
  {
    alpha2: "te",
    alpha3: "tel",
    bibliographic: "",
    name: "Telugu"
  },
  {
    alpha2: "",
    alpha3: "tem",
    bibliographic: "",
    name: "Timne"
  },
  {
    alpha2: "",
    alpha3: "ter",
    bibliographic: "",
    name: "Tereno"
  },
  {
    alpha2: "",
    alpha3: "tet",
    bibliographic: "",
    name: "Tetum"
  },
  {
    alpha2: "tg",
    alpha3: "tgk",
    bibliographic: "",
    name: "Tajik"
  },
  {
    alpha2: "tl",
    alpha3: "tgl",
    bibliographic: "",
    name: "Tagalog"
  },
  {
    alpha2: "th",
    alpha3: "tha",
    bibliographic: "",
    name: "Thai"
  },
  {
    alpha2: "",
    alpha3: "tig",
    bibliographic: "",
    name: "Tigre"
  },
  {
    alpha2: "ti",
    alpha3: "tir",
    bibliographic: "",
    name: "Tigrinya"
  },
  {
    alpha2: "",
    alpha3: "tiv",
    bibliographic: "",
    name: "Tiv"
  },
  {
    alpha2: "",
    alpha3: "tkl",
    bibliographic: "",
    name: "Tokelau"
  },
  {
    alpha2: "",
    alpha3: "tlh",
    bibliographic: "",
    name: "Klingon"
  },
  {
    alpha2: "",
    alpha3: "tlh",
    bibliographic: "",
    name: "tlhIngan-Hol"
  },
  {
    alpha2: "",
    alpha3: "tli",
    bibliographic: "",
    name: "Tlingit"
  },
  {
    alpha2: "",
    alpha3: "tmh",
    bibliographic: "",
    name: "Tamashek"
  },
  {
    alpha2: "",
    alpha3: "tog",
    bibliographic: "",
    name: "Tonga (Nyasa)"
  },
  {
    alpha2: "to",
    alpha3: "ton",
    bibliographic: "",
    name: "Tonga (Tonga Islands)"
  },
  {
    alpha2: "",
    alpha3: "tpi",
    bibliographic: "",
    name: "Tok Pisin"
  },
  {
    alpha2: "",
    alpha3: "tsi",
    bibliographic: "",
    name: "Tsimshian"
  },
  {
    alpha2: "tn",
    alpha3: "tsn",
    bibliographic: "",
    name: "Tswana"
  },
  {
    alpha2: "ts",
    alpha3: "tso",
    bibliographic: "",
    name: "Tsonga"
  },
  {
    alpha2: "tk",
    alpha3: "tuk",
    bibliographic: "",
    name: "Turkmen"
  },
  {
    alpha2: "",
    alpha3: "tum",
    bibliographic: "",
    name: "Tumbuka"
  },
  {
    alpha2: "",
    alpha3: "tup",
    bibliographic: "",
    name: "Tupi languages"
  },
  {
    alpha2: "tr",
    alpha3: "tur",
    bibliographic: "",
    name: "Turkish"
  },
  {
    alpha2: "",
    alpha3: "tut",
    bibliographic: "",
    name: "Altaic languages"
  },
  {
    alpha2: "",
    alpha3: "tvl",
    bibliographic: "",
    name: "Tuvalu"
  },
  {
    alpha2: "tw",
    alpha3: "twi",
    bibliographic: "",
    name: "Twi"
  },
  {
    alpha2: "",
    alpha3: "tyv",
    bibliographic: "",
    name: "Tuvinian"
  },
  {
    alpha2: "",
    alpha3: "udm",
    bibliographic: "",
    name: "Udmurt"
  },
  {
    alpha2: "",
    alpha3: "uga",
    bibliographic: "",
    name: "Ugaritic"
  },
  {
    alpha2: "ug",
    alpha3: "uig",
    bibliographic: "",
    name: "Uighur"
  },
  {
    alpha2: "ug",
    alpha3: "uig",
    bibliographic: "",
    name: "Uyghur"
  },
  {
    alpha2: "uk",
    alpha3: "ukr",
    bibliographic: "",
    name: "Ukrainian"
  },
  {
    alpha2: "",
    alpha3: "umb",
    bibliographic: "",
    name: "Umbundu"
  },
  {
    alpha2: "",
    alpha3: "und",
    bibliographic: "",
    name: "Undetermined"
  },
  {
    alpha2: "ur",
    alpha3: "urd",
    bibliographic: "",
    name: "Urdu"
  },
  {
    alpha2: "uz",
    alpha3: "uzb",
    bibliographic: "",
    name: "Uzbek"
  },
  {
    alpha2: "",
    alpha3: "vai",
    bibliographic: "",
    name: "Vai"
  },
  {
    alpha2: "ve",
    alpha3: "ven",
    bibliographic: "",
    name: "Venda"
  },
  {
    alpha2: "vi",
    alpha3: "vie",
    bibliographic: "",
    name: "Vietnamese"
  },
  {
    alpha2: "vo",
    alpha3: "vol",
    bibliographic: "",
    name: "Volapük"
  },
  {
    alpha2: "",
    alpha3: "vot",
    bibliographic: "",
    name: "Votic"
  },
  {
    alpha2: "",
    alpha3: "wak",
    bibliographic: "",
    name: "Wakashan languages"
  },
  {
    alpha2: "",
    alpha3: "wal",
    bibliographic: "",
    name: "Wolaitta"
  },
  {
    alpha2: "",
    alpha3: "wal",
    bibliographic: "",
    name: "Wolaytta"
  },
  {
    alpha2: "",
    alpha3: "war",
    bibliographic: "",
    name: "Waray"
  },
  {
    alpha2: "",
    alpha3: "was",
    bibliographic: "",
    name: "Washo"
  },
  {
    alpha2: "",
    alpha3: "wen",
    bibliographic: "",
    name: "Sorbian languages"
  },
  {
    alpha2: "wa",
    alpha3: "wln",
    bibliographic: "",
    name: "Walloon"
  },
  {
    alpha2: "wo",
    alpha3: "wol",
    bibliographic: "",
    name: "Wolof"
  },
  {
    alpha2: "",
    alpha3: "xal",
    bibliographic: "",
    name: "Kalmyk"
  },
  {
    alpha2: "",
    alpha3: "xal",
    bibliographic: "",
    name: "Oirat"
  },
  {
    alpha2: "xh",
    alpha3: "xho",
    bibliographic: "",
    name: "Xhosa"
  },
  {
    alpha2: "",
    alpha3: "yao",
    bibliographic: "",
    name: "Yao"
  },
  {
    alpha2: "",
    alpha3: "yap",
    bibliographic: "",
    name: "Yapese"
  },
  {
    alpha2: "yi",
    alpha3: "yid",
    bibliographic: "",
    name: "Yiddish"
  },
  {
    alpha2: "yo",
    alpha3: "yor",
    bibliographic: "",
    name: "Yoruba"
  },
  {
    alpha2: "",
    alpha3: "ypk",
    bibliographic: "",
    name: "Yupik languages"
  },
  {
    alpha2: "",
    alpha3: "zap",
    bibliographic: "",
    name: "Zapotec"
  },
  {
    alpha2: "",
    alpha3: "zbl",
    bibliographic: "",
    name: "Bliss"
  },
  {
    alpha2: "",
    alpha3: "zbl",
    bibliographic: "",
    name: "Blissymbolics"
  },
  {
    alpha2: "",
    alpha3: "zbl",
    bibliographic: "",
    name: "Blissymbols"
  },
  {
    alpha2: "",
    alpha3: "zen",
    bibliographic: "",
    name: "Zenaga"
  },
  {
    alpha2: "",
    alpha3: "zgh",
    bibliographic: "",
    name: "Standard Moroccan Tamazight"
  },
  {
    alpha2: "za",
    alpha3: "zha",
    bibliographic: "",
    name: "Chuang"
  },
  {
    alpha2: "za",
    alpha3: "zha",
    bibliographic: "",
    name: "Zhuang"
  },
  {
    alpha2: "zh",
    alpha3: "zho",
    bibliographic: "chi",
    name: "Chinese"
  },
  {
    alpha2: "",
    alpha3: "znd",
    bibliographic: "",
    name: "Zande languages"
  },
  {
    alpha2: "zu",
    alpha3: "zul",
    bibliographic: "",
    name: "Zulu"
  },
  {
    alpha2: "",
    alpha3: "zun",
    bibliographic: "",
    name: "Zuni"
  },
  {
    alpha2: "",
    alpha3: "zxx",
    bibliographic: "",
    name: "No linguistic content"
  },
  {
    alpha2: "",
    alpha3: "zxx",
    bibliographic: "",
    name: "Not applicable"
  },
  {
    alpha2: "",
    alpha3: "zza",
    bibliographic: "",
    name: "Dimili"
  },
  {
    alpha2: "",
    alpha3: "zza",
    bibliographic: "",
    name: "Dimli"
  },
  {
    alpha2: "",
    alpha3: "zza",
    bibliographic: "",
    name: "Kirdki"
  },
  {
    alpha2: "",
    alpha3: "zza",
    bibliographic: "",
    name: "Kirmanjki"
  },
  {
    alpha2: "",
    alpha3: "zza",
    bibliographic: "",
    name: "Zaza"
  },
  {
    alpha2: "",
    alpha3: "zza",
    bibliographic: "",
    name: "Zazaki"
  }
], Ai = (e, t) => {
  const n = Object.entries(t);
  return e.filter((a) => n.filter((r) => {
    const o = a[r[0]];
    return Array.isArray(o) ? o.indexOf(r[1]) >= 0 : o == null ? !1 : o.toLowerCase() === r[1].toLowerCase();
  }).length === n.length);
}, $C = (e) => ({
  countries: Ai.bind(null, e.countries),
  currencies: Ai.bind(null, e.currencies),
  languages: Ai.bind(null, e.languages)
}), Fa = {
  all: ci
};
ci.forEach((e) => {
  const { status: t } = Fa[e.alpha2] || {};
  (!t || t === "deleted") && (Fa[e.alpha2] = e);
  const { status: n } = Fa[e.alpha3] || {};
  (!n || n === "deleted") && (Fa[e.alpha3] = e);
});
const CC = {
  all: Gl
};
Gl.forEach((e) => {
  let t = wC(e.code);
  t === "?" && (t = e.code);
  const n = Object.assign(e, { symbol: t });
  CC[e.code] = n;
});
const ji = {
  all: Wl
};
Wl.forEach((e) => {
  ji[e.alpha2] = e, ji[e.bibliographic] = e, ji[e.alpha3] = e;
});
const ad = $C({
  countries: ci,
  currencies: Gl,
  languages: Wl
}), Kr = { all: [] }, SC = ci.reduce((e, t) => {
  const { countryCallingCodes: n, alpha2: a, alpha3: r } = t;
  return n && n.length && (Kr.all.push(t), Kr[a] = t, Kr[r] = t, n.forEach((o) => {
    e.indexOf(o) === -1 && e.push(o);
  })), e;
}, []);
delete Kr[""];
SC.sort((e, t) => {
  const n = (o) => +o, a = e.split(" ").map(n), r = t.split(" ").map(n);
  return a[0] < r[0] ? -1 : a[0] > r[0] ? 1 : a[1] === void 0 && r[1] !== void 0 ? -1 : a[1] !== void 0 && r[1] === void 0 ? 1 : a[1] < r[1] ? -1 : a[1] > r[1] ? 1 : 0;
});
const eg = ({
  options: e = Fa.all.filter(
    (u) => u.emoji && u.status !== "deleted" && u.ioc !== "PRK"
  ),
  onChange: t,
  defaultValue: n,
  disabled: a = !1,
  placeholder: r = "Select a country",
  slim: o = !1,
  inline: i = !1,
  className: s,
  ...c
}, d) => {
  const [u, p] = je(!1), [m, h] = je(
    void 0
  );
  At(() => {
    if (n) {
      const v = e.find(
        (y) => y.alpha2 === n
      );
      h(v || void 0);
    } else
      h(void 0);
  }, [n, e]);
  const b = _n(
    (v) => {
      h(v), t?.(v), p(!1);
    },
    [t]
  ), g = x(
    "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
    o === !0 && "w-20",
    i && "rounded-r-none border-r-0 gap-1 pr-1 w-min"
  );
  return /* @__PURE__ */ l.jsxs(jp, { open: u, onOpenChange: p, children: [
    /* @__PURE__ */ l.jsxs(
      Mp,
      {
        ref: d,
        className: `${g} ${s}`,
        disabled: a,
        ...c,
        children: [
          m ? /* @__PURE__ */ l.jsxs("div", { className: `flex items-center ${i ? "" : "w-0"} flex-grow  gap-2 overflow-hidden`, children: [
            /* @__PURE__ */ l.jsx("div", { className: "inline-flex items-center justify-center w-5 h-5 shrink-0 overflow-hidden rounded-full", children: /* @__PURE__ */ l.jsx(
              vs,
              {
                countryCode: m.alpha2.toLowerCase(),
                height: 20
              }
            ) }),
            o === !1 && !i && /* @__PURE__ */ l.jsx("span", { className: "overflow-hidden text-ellipsis whitespace-nowrap", children: m.name })
          ] }) : /* @__PURE__ */ l.jsx("span", { children: o === !1 && !i ? r || h.name : /* @__PURE__ */ l.jsx(pu, { size: 20 }) }),
          /* @__PURE__ */ l.jsx(Co, { size: 16 })
        ]
      }
    ),
    /* @__PURE__ */ l.jsx(
      sl,
      {
        collisionPadding: 10,
        side: "bottom",
        className: "min-w-[--radix-popper-anchor-width] p-0",
        children: /* @__PURE__ */ l.jsx(hl, { className: "w-full max-h-[200px] sm:max-h-[270px]", children: /* @__PURE__ */ l.jsxs(bl, { children: [
          /* @__PURE__ */ l.jsx("div", { className: "sticky top-0 z-10 bg-popover", children: /* @__PURE__ */ l.jsx(gl, { placeholder: "Search country..." }) }),
          /* @__PURE__ */ l.jsx(vl, { children: "No country found." }),
          /* @__PURE__ */ l.jsx(yl, { children: e.filter((v) => v.name).map((v, y) => /* @__PURE__ */ l.jsxs(
            xl,
            {
              className: "flex items-center w-full gap-2",
              onSelect: () => b(v),
              children: [
                /* @__PURE__ */ l.jsxs("div", { className: "flex flex-grow w-0 space-x-2 overflow-hidden", children: [
                  /* @__PURE__ */ l.jsx("div", { className: "inline-flex items-center justify-center w-5 h-5 shrink-0 overflow-hidden rounded-full", children: /* @__PURE__ */ l.jsx(
                    vs,
                    {
                      countryCode: v.alpha2.toLowerCase(),
                      height: 20
                    }
                  ) }),
                  /* @__PURE__ */ l.jsx("span", { className: "overflow-hidden text-ellipsis whitespace-nowrap", children: v.name })
                ] }),
                /* @__PURE__ */ l.jsx(
                  fu,
                  {
                    className: x(
                      "ml-auto h-4 w-4 shrink-0",
                      v.name === m?.name ? "opacity-100" : "opacity-0"
                    )
                  }
                )
              ]
            },
            y
          )) })
        ] }) })
      }
    )
  ] });
};
eg.displayName = "CountryDropdownComponent";
const uN = Ye(eg), _C = { version: 4, country_calling_codes: { 1: ["US", "AG", "AI", "AS", "BB", "BM", "BS", "CA", "DM", "DO", "GD", "GU", "JM", "KN", "KY", "LC", "MP", "MS", "PR", "SX", "TC", "TT", "VC", "VG", "VI"], 7: ["RU", "KZ"], 20: ["EG"], 27: ["ZA"], 30: ["GR"], 31: ["NL"], 32: ["BE"], 33: ["FR"], 34: ["ES"], 36: ["HU"], 39: ["IT", "VA"], 40: ["RO"], 41: ["CH"], 43: ["AT"], 44: ["GB", "GG", "IM", "JE"], 45: ["DK"], 46: ["SE"], 47: ["NO", "SJ"], 48: ["PL"], 49: ["DE"], 51: ["PE"], 52: ["MX"], 53: ["CU"], 54: ["AR"], 55: ["BR"], 56: ["CL"], 57: ["CO"], 58: ["VE"], 60: ["MY"], 61: ["AU", "CC", "CX"], 62: ["ID"], 63: ["PH"], 64: ["NZ"], 65: ["SG"], 66: ["TH"], 81: ["JP"], 82: ["KR"], 84: ["VN"], 86: ["CN"], 90: ["TR"], 91: ["IN"], 92: ["PK"], 93: ["AF"], 94: ["LK"], 95: ["MM"], 98: ["IR"], 211: ["SS"], 212: ["MA", "EH"], 213: ["DZ"], 216: ["TN"], 218: ["LY"], 220: ["GM"], 221: ["SN"], 222: ["MR"], 223: ["ML"], 224: ["GN"], 225: ["CI"], 226: ["BF"], 227: ["NE"], 228: ["TG"], 229: ["BJ"], 230: ["MU"], 231: ["LR"], 232: ["SL"], 233: ["GH"], 234: ["NG"], 235: ["TD"], 236: ["CF"], 237: ["CM"], 238: ["CV"], 239: ["ST"], 240: ["GQ"], 241: ["GA"], 242: ["CG"], 243: ["CD"], 244: ["AO"], 245: ["GW"], 246: ["IO"], 247: ["AC"], 248: ["SC"], 249: ["SD"], 250: ["RW"], 251: ["ET"], 252: ["SO"], 253: ["DJ"], 254: ["KE"], 255: ["TZ"], 256: ["UG"], 257: ["BI"], 258: ["MZ"], 260: ["ZM"], 261: ["MG"], 262: ["RE", "YT"], 263: ["ZW"], 264: ["NA"], 265: ["MW"], 266: ["LS"], 267: ["BW"], 268: ["SZ"], 269: ["KM"], 290: ["SH", "TA"], 291: ["ER"], 297: ["AW"], 298: ["FO"], 299: ["GL"], 350: ["GI"], 351: ["PT"], 352: ["LU"], 353: ["IE"], 354: ["IS"], 355: ["AL"], 356: ["MT"], 357: ["CY"], 358: ["FI", "AX"], 359: ["BG"], 370: ["LT"], 371: ["LV"], 372: ["EE"], 373: ["MD"], 374: ["AM"], 375: ["BY"], 376: ["AD"], 377: ["MC"], 378: ["SM"], 380: ["UA"], 381: ["RS"], 382: ["ME"], 383: ["XK"], 385: ["HR"], 386: ["SI"], 387: ["BA"], 389: ["MK"], 420: ["CZ"], 421: ["SK"], 423: ["LI"], 500: ["FK"], 501: ["BZ"], 502: ["GT"], 503: ["SV"], 504: ["HN"], 505: ["NI"], 506: ["CR"], 507: ["PA"], 508: ["PM"], 509: ["HT"], 590: ["GP", "BL", "MF"], 591: ["BO"], 592: ["GY"], 593: ["EC"], 594: ["GF"], 595: ["PY"], 596: ["MQ"], 597: ["SR"], 598: ["UY"], 599: ["CW", "BQ"], 670: ["TL"], 672: ["NF"], 673: ["BN"], 674: ["NR"], 675: ["PG"], 676: ["TO"], 677: ["SB"], 678: ["VU"], 679: ["FJ"], 680: ["PW"], 681: ["WF"], 682: ["CK"], 683: ["NU"], 685: ["WS"], 686: ["KI"], 687: ["NC"], 688: ["TV"], 689: ["PF"], 690: ["TK"], 691: ["FM"], 692: ["MH"], 850: ["KP"], 852: ["HK"], 853: ["MO"], 855: ["KH"], 856: ["LA"], 880: ["BD"], 886: ["TW"], 960: ["MV"], 961: ["LB"], 962: ["JO"], 963: ["SY"], 964: ["IQ"], 965: ["KW"], 966: ["SA"], 967: ["YE"], 968: ["OM"], 970: ["PS"], 971: ["AE"], 972: ["IL"], 973: ["BH"], 974: ["QA"], 975: ["BT"], 976: ["MN"], 977: ["NP"], 992: ["TJ"], 993: ["TM"], 994: ["AZ"], 995: ["GE"], 996: ["KG"], 998: ["UZ"] }, countries: { AC: ["247", "00", "(?:[01589]\\d|[46])\\d{4}", [5, 6]], AD: ["376", "00", "(?:1|6\\d)\\d{7}|[135-9]\\d{5}", [6, 8, 9], [["(\\d{3})(\\d{3})", "$1 $2", ["[135-9]"]], ["(\\d{4})(\\d{4})", "$1 $2", ["1"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]]]], AE: ["971", "00", "(?:[4-7]\\d|9[0-689])\\d{7}|800\\d{2,9}|[2-4679]\\d{7}", [5, 6, 7, 8, 9, 10, 11, 12], [["(\\d{3})(\\d{2,9})", "$1 $2", ["60|8"]], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[236]|[479][2-8]"], "0$1"], ["(\\d{3})(\\d)(\\d{5})", "$1 $2 $3", ["[479]"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"]], "0"], AF: ["93", "00", "[2-7]\\d{8}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-7]"], "0$1"]], "0"], AG: ["1", "011", "(?:268|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([457]\\d{6})$|1", "268$1", 0, "268"], AI: ["1", "011", "(?:264|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2457]\\d{6})$|1", "264$1", 0, "264"], AL: ["355", "00", "(?:700\\d\\d|900)\\d{3}|8\\d{5,7}|(?:[2-5]|6\\d)\\d{7}", [6, 7, 8, 9], [["(\\d{3})(\\d{3,4})", "$1 $2", ["80|9"], "0$1"], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["4[2-6]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2358][2-5]|4"], "0$1"], ["(\\d{3})(\\d{5})", "$1 $2", ["[23578]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["6"], "0$1"]], "0"], AM: ["374", "00", "(?:[1-489]\\d|55|60|77)\\d{6}", [8], [["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[89]0"], "0 $1"], ["(\\d{3})(\\d{5})", "$1 $2", ["2|3[12]"], "(0$1)"], ["(\\d{2})(\\d{6})", "$1 $2", ["1|47"], "(0$1)"], ["(\\d{2})(\\d{6})", "$1 $2", ["[3-9]"], "0$1"]], "0"], AO: ["244", "00", "[29]\\d{8}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[29]"]]]], AR: ["54", "00", "(?:11|[89]\\d\\d)\\d{8}|[2368]\\d{9}", [10, 11], [["(\\d{4})(\\d{2})(\\d{4})", "$1 $2-$3", ["2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9])", "2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8]))|2(?:2[24-9]|3[1-59]|47)", "2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5[56][46]|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]", "2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|58|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|54(?:4|5[13-7]|6[89])|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:454|85[56])[46]|3(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"], "0$1", 1], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["1"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[68]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2-$3", ["[23]"], "0$1", 1], ["(\\d)(\\d{4})(\\d{2})(\\d{4})", "$2 15-$3-$4", ["9(?:2[2-469]|3[3-578])", "9(?:2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9]))", "9(?:2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8])))|92(?:2[24-9]|3[1-59]|47)", "9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5(?:[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]", "9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|5(?:4(?:4|5[13-7]|6[89])|[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"], "0$1", 0, "$1 $2 $3-$4"], ["(\\d)(\\d{2})(\\d{4})(\\d{4})", "$2 15-$3-$4", ["91"], "0$1", 0, "$1 $2 $3-$4"], ["(\\d{3})(\\d{3})(\\d{5})", "$1-$2-$3", ["8"], "0$1"], ["(\\d)(\\d{3})(\\d{3})(\\d{4})", "$2 15-$3-$4", ["9"], "0$1", 0, "$1 $2 $3-$4"]], "0", 0, "0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))15)?", "9$1"], AS: ["1", "011", "(?:[58]\\d\\d|684|900)\\d{7}", [10], 0, "1", 0, "([267]\\d{6})$|1", "684$1", 0, "684"], AT: ["43", "00", "1\\d{3,12}|2\\d{6,12}|43(?:(?:0\\d|5[02-9])\\d{3,9}|2\\d{4,5}|[3467]\\d{4}|8\\d{4,6}|9\\d{4,7})|5\\d{4,12}|8\\d{7,12}|9\\d{8,12}|(?:[367]\\d|4[0-24-9])\\d{4,11}", [4, 5, 6, 7, 8, 9, 10, 11, 12, 13], [["(\\d)(\\d{3,12})", "$1 $2", ["1(?:11|[2-9])"], "0$1"], ["(\\d{3})(\\d{2})", "$1 $2", ["517"], "0$1"], ["(\\d{2})(\\d{3,5})", "$1 $2", ["5[079]"], "0$1"], ["(\\d{3})(\\d{3,10})", "$1 $2", ["(?:31|4)6|51|6(?:48|5[0-3579]|[6-9])|7(?:20|32|8)|[89]", "(?:31|4)6|51|6(?:485|5[0-3579]|[6-9])|7(?:20|32|8)|[89]"], "0$1"], ["(\\d{4})(\\d{3,9})", "$1 $2", ["[2-467]|5[2-6]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["5"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4,7})", "$1 $2 $3", ["5"], "0$1"]], "0"], AU: ["61", "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011", "1(?:[0-79]\\d{7}(?:\\d(?:\\d{2})?)?|8[0-24-9]\\d{7})|[2-478]\\d{8}|1\\d{4,7}", [5, 6, 7, 8, 9, 10, 12], [["(\\d{2})(\\d{3,4})", "$1 $2", ["16"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2,4})", "$1 $2 $3", ["16"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["14|4"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["[2378]"], "(0$1)"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:30|[89])"]]], "0", 0, "(183[12])|0", 0, 0, 0, [["(?:(?:2(?:(?:[0-26-9]\\d|3[0-8]|5[0135-9])\\d|4(?:[02-9]\\d|10))|3(?:(?:[0-3589]\\d|6[1-9]|7[0-35-9])\\d|4(?:[0-578]\\d|90))|7(?:[013-57-9]\\d|2[0-8])\\d)\\d\\d|8(?:51(?:0(?:0[03-9]|[12479]\\d|3[2-9]|5[0-8]|6[1-9]|8[0-7])|1(?:[0235689]\\d|1[0-69]|4[0-589]|7[0-47-9])|2(?:0[0-79]|[18][13579]|2[14-9]|3[0-46-9]|[4-6]\\d|7[89]|9[0-4])|[34]\\d\\d)|(?:6[0-8]|[78]\\d)\\d{3}|9(?:[02-9]\\d{3}|1(?:(?:[0-58]\\d|6[0135-9])\\d|7(?:0[0-24-9]|[1-9]\\d)|9(?:[0-46-9]\\d|5[0-79])))))\\d{3}", [9]], ["4(?:79[01]|83[0-389]|94[0-478])\\d{5}|4(?:[0-36]\\d|4[047-9]|[58][0-24-9]|7[02-8]|9[0-37-9])\\d{6}", [9]], ["180(?:0\\d{3}|2)\\d{3}", [7, 10]], ["190[0-26]\\d{6}", [10]], 0, 0, 0, ["163\\d{2,6}", [5, 6, 7, 8, 9]], ["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}", [9]], ["13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}", [6, 8, 10, 12]]], "0011"], AW: ["297", "00", "(?:[25-79]\\d\\d|800)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[25-9]"]]]], AX: ["358", "00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))", "2\\d{4,9}|35\\d{4,5}|(?:60\\d\\d|800)\\d{4,6}|7\\d{5,11}|(?:[14]\\d|3[0-46-9]|50)\\d{4,8}", [5, 6, 7, 8, 9, 10, 11, 12], 0, "0", 0, 0, 0, 0, "18", 0, "00"], AZ: ["994", "00", "365\\d{6}|(?:[124579]\\d|60|88)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["90"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[28]|2|365|46", "1[28]|2|365[45]|46", "1[28]|2|365(?:4|5[02])|46"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[13-9]"], "0$1"]], "0"], BA: ["387", "00", "6\\d{8}|(?:[35689]\\d|49|70)\\d{6}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["6[1-3]|[7-9]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2-$3", ["[3-5]|6[56]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["6"], "0$1"]], "0"], BB: ["1", "011", "(?:246|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "246$1", 0, "246"], BD: ["880", "00", "[1-469]\\d{9}|8[0-79]\\d{7,8}|[2-79]\\d{8}|[2-9]\\d{7}|[3-9]\\d{6}|[57-9]\\d{5}", [6, 7, 8, 9, 10], [["(\\d{2})(\\d{4,6})", "$1-$2", ["31[5-8]|[459]1"], "0$1"], ["(\\d{3})(\\d{3,7})", "$1-$2", ["3(?:[67]|8[013-9])|4(?:6[168]|7|[89][18])|5(?:6[128]|9)|6(?:[15]|28|4[14])|7[2-589]|8(?:0[014-9]|[12])|9[358]|(?:3[2-5]|4[235]|5[2-578]|6[0389]|76|8[3-7]|9[24])1|(?:44|66)[01346-9]"], "0$1"], ["(\\d{4})(\\d{3,6})", "$1-$2", ["[13-9]|2[23]"], "0$1"], ["(\\d)(\\d{7,8})", "$1-$2", ["2"], "0$1"]], "0"], BE: ["32", "00", "4\\d{8}|[1-9]\\d{7}", [8, 9], [["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:80|9)0"], "0$1"], ["(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[239]|4[23]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[15-8]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["4"], "0$1"]], "0"], BF: ["226", "00", "(?:[025-7]\\d|44)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[024-7]"]]]], BG: ["359", "00", "00800\\d{7}|[2-7]\\d{6,7}|[89]\\d{6,8}|2\\d{5}", [6, 7, 8, 9, 12], [["(\\d)(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["2"], "0$1"], ["(\\d{3})(\\d{4})", "$1 $2", ["43[1-6]|70[1-9]"], "0$1"], ["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:70|8)0"], "0$1"], ["(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3", ["43[1-7]|7"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[48]|9[08]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1"]], "0"], BH: ["973", "00", "[136-9]\\d{7}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[13679]|8[02-4679]"]]]], BI: ["257", "00", "(?:[267]\\d|31)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2367]"]]]], BJ: ["229", "00", "(?:01\\d|[24-689])\\d{7}", [8, 10], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24-689]"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["0"]]]], BL: ["590", "00", "(?:590\\d|7090)\\d{5}|(?:69|80|9\\d)\\d{7}", [9], 0, "0", 0, 0, 0, 0, 0, [["590(?:2[7-9]|3[3-7]|5[12]|87)\\d{4}"], ["(?:69(?:0\\d\\d|1(?:2[2-9]|3[0-5])|4(?:0[89]|1[2-6]|9\\d)|6(?:1[016-9]|5[0-4]|[67]\\d))|7090[0-4])\\d{4}"], ["80[0-5]\\d{6}"], 0, 0, 0, 0, 0, ["9(?:(?:39[5-7]|76[018])\\d|475[0-6])\\d{4}"]]], BM: ["1", "011", "(?:441|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "441$1", 0, "441"], BN: ["673", "00", "[2-578]\\d{6}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-578]"]]]], BO: ["591", "00(?:1\\d)?", "8001\\d{5}|(?:[2-467]\\d|50)\\d{6}", [8, 9], [["(\\d)(\\d{7})", "$1 $2", ["[235]|4[46]"]], ["(\\d{8})", "$1", ["[67]"]], ["(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["8"]]], "0", 0, "0(1\\d)?"], BQ: ["599", "00", "(?:[34]1|7\\d)\\d{5}", [7], 0, 0, 0, 0, 0, 0, "[347]"], BR: ["55", "00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)", "[1-467]\\d{9,10}|55[0-46-9]\\d{8}|[34]\\d{7}|55\\d{7,8}|(?:5[0-46-9]|[89]\\d)\\d{7,9}", [8, 9, 10, 11], [["(\\d{4})(\\d{4})", "$1-$2", ["300|4(?:0[02]|37|86)", "300|4(?:0(?:0|20)|370|864)"]], ["(\\d{3})(\\d{2,3})(\\d{4})", "$1 $2 $3", ["(?:[358]|90)0"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-57]"], "($1)"], ["(\\d{2})(\\d{5})(\\d{4})", "$1 $2-$3", ["[16][1-9]|[2-57-9]"], "($1)"]], "0", 0, "(?:0|90)(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?", "$2"], BS: ["1", "011", "(?:242|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([3-8]\\d{6})$|1", "242$1", 0, "242"], BT: ["975", "00", "[178]\\d{7}|[2-8]\\d{6}", [7, 8], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-6]|7[246]|8[2-4]"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[67]|[78]"]]]], BW: ["267", "00", "(?:0800|(?:[37]|800)\\d)\\d{6}|(?:[2-6]\\d|90)\\d{5}", [7, 8, 10], [["(\\d{2})(\\d{5})", "$1 $2", ["90"]], ["(\\d{3})(\\d{4})", "$1 $2", ["[24-6]|3[15-9]"]], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[37]"]], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["0"]], ["(\\d{3})(\\d{4})(\\d{3})", "$1 $2 $3", ["8"]]]], BY: ["375", "810", "(?:[12]\\d|33|44|902)\\d{7}|8(?:0[0-79]\\d{5,7}|[1-7]\\d{9})|8(?:1[0-489]|[5-79]\\d)\\d{7}|8[1-79]\\d{6,7}|8[0-79]\\d{5}|8\\d{5}", [6, 7, 8, 9, 10, 11], [["(\\d{3})(\\d{3})", "$1 $2", ["800"], "8 $1"], ["(\\d{3})(\\d{2})(\\d{2,4})", "$1 $2 $3", ["800"], "8 $1"], ["(\\d{4})(\\d{2})(\\d{3})", "$1 $2-$3", ["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])", "1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"], "8 0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["1(?:[56]|7[467])|2[1-3]"], "8 0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[1-4]"], "8 0$1"], ["(\\d{3})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["[89]"], "8 $1"]], "8", 0, "0|80?", 0, 0, 0, 0, "8~10"], BZ: ["501", "00", "(?:0800\\d|[2-8])\\d{6}", [7, 11], [["(\\d{3})(\\d{4})", "$1-$2", ["[2-8]"]], ["(\\d)(\\d{3})(\\d{4})(\\d{3})", "$1-$2-$3-$4", ["0"]]]], CA: ["1", "011", "[2-9]\\d{9}|3\\d{6}", [7, 10], 0, "1", 0, 0, 0, 0, 0, [["(?:2(?:04|[23]6|[48]9|5[07]|63)|3(?:06|43|54|6[578]|82)|4(?:03|1[68]|[26]8|3[178]|50|74)|5(?:06|1[49]|48|79|8[147])|6(?:04|[18]3|39|47|72)|7(?:0[59]|42|53|78|8[02])|8(?:[06]7|19|25|7[39])|9(?:0[25]|42))[2-9]\\d{6}", [10]], ["", [10]], ["8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", [10]], ["900[2-9]\\d{6}", [10]], ["52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|(?:5(?:2[125-9]|33|44|66|77|88)|6(?:22|33))[2-9]\\d{6}", [10]], 0, ["310\\d{4}", [7]], 0, ["600[2-9]\\d{6}", [10]]]], CC: ["61", "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011", "1(?:[0-79]\\d{8}(?:\\d{2})?|8[0-24-9]\\d{7})|[148]\\d{8}|1\\d{5,7}", [6, 7, 8, 9, 10, 12], 0, "0", 0, "([59]\\d{7})$|0", "8$1", 0, 0, [["8(?:51(?:0(?:02|31|60|89)|1(?:18|76)|223)|91(?:0(?:1[0-2]|29)|1(?:[28]2|50|79)|2(?:10|64)|3(?:[06]8|22)|4[29]8|62\\d|70[23]|959))\\d{3}", [9]], ["4(?:79[01]|83[0-389]|94[0-478])\\d{5}|4(?:[0-36]\\d|4[047-9]|[58][0-24-9]|7[02-8]|9[0-37-9])\\d{6}", [9]], ["180(?:0\\d{3}|2)\\d{3}", [7, 10]], ["190[0-26]\\d{6}", [10]], 0, 0, 0, 0, ["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}", [9]], ["13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}", [6, 8, 10, 12]]], "0011"], CD: ["243", "00", "(?:(?:[189]|5\\d)\\d|2)\\d{7}|[1-68]\\d{6}", [7, 8, 9, 10], [["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["88"], "0$1"], ["(\\d{2})(\\d{5})", "$1 $2", ["[1-6]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["5"], "0$1"]], "0"], CF: ["236", "00", "(?:[27]\\d{3}|8776)\\d{4}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[278]"]]]], CG: ["242", "00", "222\\d{6}|(?:0\\d|80)\\d{7}", [9], [["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["8"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[02]"]]]], CH: ["41", "00", "8\\d{11}|[2-9]\\d{8}", [9, 12], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8[047]|90"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-79]|81"], "0$1"], ["(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["8"], "0$1"]], "0"], CI: ["225", "00", "[02]\\d{9}", [10], [["(\\d{2})(\\d{2})(\\d)(\\d{5})", "$1 $2 $3 $4", ["2"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3 $4", ["0"]]]], CK: ["682", "00", "[2-578]\\d{4}", [5], [["(\\d{2})(\\d{3})", "$1 $2", ["[2-578]"]]]], CL: ["56", "(?:0|1(?:1[0-69]|2[02-5]|5[13-58]|69|7[0167]|8[018]))0", "12300\\d{6}|6\\d{9,10}|[2-9]\\d{8}", [9, 10, 11], [["(\\d{5})(\\d{4})", "$1 $2", ["219", "2196"], "($1)"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["60|809"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["44"]], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2[1-36]"], "($1)"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["9(?:10|[2-9])"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["3[2-5]|[47]|5[1-3578]|6[13-57]|8(?:0[1-8]|[1-9])"], "($1)"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["60|8"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]], ["(\\d{3})(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["60"]]]], CM: ["237", "00", "[26]\\d{8}|88\\d{6,7}", [8, 9], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["88"]], ["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[26]|88"]]]], CN: ["86", "00|1(?:[12]\\d|79)\\d\\d00", "(?:(?:1[03-689]|2\\d)\\d\\d|6)\\d{8}|1\\d{10}|[126]\\d{6}(?:\\d(?:\\d{2})?)?|86\\d{5,6}|(?:[3-579]\\d|8[0-57-9])\\d{5,9}", [7, 8, 9, 10, 11, 12], [["(\\d{2})(\\d{5,6})", "$1 $2", ["(?:10|2[0-57-9])[19]|3(?:[157]|35|49|9[1-68])|4(?:1[124-9]|2[179]|6[47-9]|7|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:07|1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3|4[13]|5[1-5]|7[0-79]|9[0-35-9])|(?:4[35]|59|85)[1-9]", "(?:10|2[0-57-9])(?:1[02]|9[56])|8078|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))1", "10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|80781|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))12", "10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|807812|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))123", "10(?:1(?:0|23)|9[56])|2[0-57-9](?:1(?:00|23)|9[56])|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:1[124-9]|2[179]|[35][1-9]|6[47-9]|7\\d|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:078|1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|3\\d|4[13]|5[1-5]|7[0-79]|9[0-35-9]))123"], "0$1"], ["(\\d{3})(\\d{5,6})", "$1 $2", ["3(?:[157]|35|49|9[1-68])|4(?:[17]|2[179]|6[47-9]|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])|(?:4[35]|59|85)[1-9]", "(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))[19]", "85[23](?:10|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:10|9[56])", "85[23](?:100|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100|9[56])"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["(?:4|80)0"]], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["10|2(?:[02-57-9]|1[1-9])", "10|2(?:[02-57-9]|1[1-9])", "10[0-79]|2(?:[02-57-9]|1[1-79])|(?:10|21)8(?:0[1-9]|[1-9])"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["3(?:[3-59]|7[02-68])|4(?:[26-8]|3[3-9]|5[2-9])|5(?:3[03-9]|[468]|7[028]|9[2-46-9])|6|7(?:[0-247]|3[04-9]|5[0-4689]|6[2368])|8(?:[1-358]|9[1-7])|9(?:[013479]|5[1-5])|(?:[34]1|55|79|87)[02-9]"], "0$1", 1], ["(\\d{3})(\\d{7,8})", "$1 $2", ["9"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["80"], "0$1", 1], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["[3-578]"], "0$1", 1], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["1[3-9]"]], ["(\\d{2})(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["[12]"], "0$1", 1]], "0", 0, "(1(?:[12]\\d|79)\\d\\d)|0", 0, 0, 0, 0, "00"], CO: ["57", "00(?:4(?:[14]4|56)|[579])", "(?:46|60\\d\\d)\\d{6}|(?:1\\d|[39])\\d{9}", [8, 10, 11], [["(\\d{4})(\\d{4})", "$1 $2", ["46"]], ["(\\d{3})(\\d{7})", "$1 $2", ["6|90"], "($1)"], ["(\\d{3})(\\d{7})", "$1 $2", ["3[0-357]|9[14]"]], ["(\\d)(\\d{3})(\\d{7})", "$1-$2-$3", ["1"], "0$1", 0, "$1 $2 $3"]], "0", 0, "0([3579]|4(?:[14]4|56))?"], CR: ["506", "00", "(?:8\\d|90)\\d{8}|(?:[24-8]\\d{3}|3005)\\d{4}", [8, 10], [["(\\d{4})(\\d{4})", "$1 $2", ["[2-7]|8[3-9]"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[89]"]]], 0, 0, "(19(?:0[0-2468]|1[09]|20|66|77|99))"], CU: ["53", "119", "(?:[2-7]|8\\d\\d)\\d{7}|[2-47]\\d{6}|[34]\\d{5}", [6, 7, 8, 10], [["(\\d{2})(\\d{4,6})", "$1 $2", ["2[1-4]|[34]"], "(0$1)"], ["(\\d)(\\d{6,7})", "$1 $2", ["7"], "(0$1)"], ["(\\d)(\\d{7})", "$1 $2", ["[56]"], "0$1"], ["(\\d{3})(\\d{7})", "$1 $2", ["8"], "0$1"]], "0"], CV: ["238", "0", "(?:[2-59]\\d\\d|800)\\d{4}", [7], [["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[2-589]"]]]], CW: ["599", "00", "(?:[34]1|60|(?:7|9\\d)\\d)\\d{5}", [7, 8], [["(\\d{3})(\\d{4})", "$1 $2", ["[3467]"]], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["9[4-8]"]]], 0, 0, 0, 0, 0, "[69]"], CX: ["61", "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011", "1(?:[0-79]\\d{8}(?:\\d{2})?|8[0-24-9]\\d{7})|[148]\\d{8}|1\\d{5,7}", [6, 7, 8, 9, 10, 12], 0, "0", 0, "([59]\\d{7})$|0", "8$1", 0, 0, [["8(?:51(?:0(?:01|30|59|88)|1(?:17|46|75)|2(?:22|35))|91(?:00[6-9]|1(?:[28]1|49|78)|2(?:09|63)|3(?:12|26|75)|4(?:56|97)|64\\d|7(?:0[01]|1[0-2])|958))\\d{3}", [9]], ["4(?:79[01]|83[0-389]|94[0-478])\\d{5}|4(?:[0-36]\\d|4[047-9]|[58][0-24-9]|7[02-8]|9[0-37-9])\\d{6}", [9]], ["180(?:0\\d{3}|2)\\d{3}", [7, 10]], ["190[0-26]\\d{6}", [10]], 0, 0, 0, 0, ["14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}", [9]], ["13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}", [6, 8, 10, 12]]], "0011"], CY: ["357", "00", "(?:[279]\\d|[58]0)\\d{6}", [8], [["(\\d{2})(\\d{6})", "$1 $2", ["[257-9]"]]]], CZ: ["420", "00", "(?:[2-578]\\d|60)\\d{7}|9\\d{8,11}", [9, 10, 11, 12], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-8]|9[015-7]"]], ["(\\d{2})(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3 $4", ["96"]], ["(\\d{2})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]], ["(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]]]], DE: ["49", "00", "[2579]\\d{5,14}|49(?:[34]0|69|8\\d)\\d\\d?|49(?:37|49|60|7[089]|9\\d)\\d{1,3}|49(?:2[024-9]|3[2-689]|7[1-7])\\d{1,8}|(?:1|[368]\\d|4[0-8])\\d{3,13}|49(?:[015]\\d|2[13]|31|[46][1-8])\\d{1,9}", [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [["(\\d{2})(\\d{3,13})", "$1 $2", ["3[02]|40|[68]9"], "0$1"], ["(\\d{3})(\\d{3,12})", "$1 $2", ["2(?:0[1-389]|1[124]|2[18]|3[14])|3(?:[35-9][15]|4[015])|906|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1", "2(?:0[1-389]|12[0-8])|3(?:[35-9][15]|4[015])|906|2(?:[13][14]|2[18])|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1"], "0$1"], ["(\\d{4})(\\d{2,11})", "$1 $2", ["[24-6]|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]", "[24-6]|3(?:3(?:0[1-467]|2[127-9]|3[124578]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|4[13578]|9[1346])|5(?:0[14]|2[1-3589]|6[1-4]|7[13468]|8[13568])|6(?:2[1-489]|3[124-6]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|6|7[1467]|8[136])|9(?:0[12479]|2[1358]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]|3[68]4[1347]|3(?:47|60)[1356]|3(?:3[46]|46|5[49])[1246]|3[4579]3[1357]"], "0$1"], ["(\\d{3})(\\d{4})", "$1 $2", ["138"], "0$1"], ["(\\d{5})(\\d{2,10})", "$1 $2", ["3"], "0$1"], ["(\\d{3})(\\d{5,11})", "$1 $2", ["181"], "0$1"], ["(\\d{3})(\\d)(\\d{4,10})", "$1 $2 $3", ["1(?:3|80)|9"], "0$1"], ["(\\d{3})(\\d{7,8})", "$1 $2", ["1[67]"], "0$1"], ["(\\d{3})(\\d{7,12})", "$1 $2", ["8"], "0$1"], ["(\\d{5})(\\d{6})", "$1 $2", ["185", "1850", "18500"], "0$1"], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["7"], "0$1"], ["(\\d{4})(\\d{7})", "$1 $2", ["18[68]"], "0$1"], ["(\\d{4})(\\d{7})", "$1 $2", ["15[1279]"], "0$1"], ["(\\d{5})(\\d{6})", "$1 $2", ["15[03568]", "15(?:[0568]|3[13])"], "0$1"], ["(\\d{3})(\\d{8})", "$1 $2", ["18"], "0$1"], ["(\\d{3})(\\d{2})(\\d{7,8})", "$1 $2 $3", ["1(?:6[023]|7)"], "0$1"], ["(\\d{4})(\\d{2})(\\d{7})", "$1 $2 $3", ["15[279]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{8})", "$1 $2 $3", ["15"], "0$1"]], "0"], DJ: ["253", "00", "(?:2\\d|77)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[27]"]]]], DK: ["45", "00", "[2-9]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-9]"]]]], DM: ["1", "011", "(?:[58]\\d\\d|767|900)\\d{7}", [10], 0, "1", 0, "([2-7]\\d{6})$|1", "767$1", 0, "767"], DO: ["1", "011", "(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, 0, 0, 0, "8001|8[024]9"], DZ: ["213", "00", "(?:[1-4]|[5-79]\\d|80)\\d{7}", [8, 9], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[1-4]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["9"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-8]"], "0$1"]], "0"], EC: ["593", "00", "1\\d{9,10}|(?:[2-7]|9\\d)\\d{7}", [8, 9, 10, 11], [["(\\d)(\\d{3})(\\d{4})", "$1 $2-$3", ["[2-7]"], "(0$1)", 0, "$1-$2-$3"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1"]]], "0"], EE: ["372", "00", "8\\d{9}|[4578]\\d{7}|(?:[3-8]\\d|90)\\d{5}", [7, 8, 10], [["(\\d{3})(\\d{4})", "$1 $2", ["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]|88", "[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]|88"]], ["(\\d{4})(\\d{3,4})", "$1 $2", ["[45]|8(?:00|[1-49])", "[45]|8(?:00[1-9]|[1-49])"]], ["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["7"]], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]]]], EG: ["20", "00", "[189]\\d{8,9}|[24-6]\\d{8}|[135]\\d{7}", [8, 9, 10], [["(\\d)(\\d{7,8})", "$1 $2", ["[23]"], "0$1"], ["(\\d{2})(\\d{6,7})", "$1 $2", ["1[35]|[4-6]|8[2468]|9[235-7]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"], ["(\\d{2})(\\d{8})", "$1 $2", ["1"], "0$1"]], "0"], EH: ["212", "00", "[5-8]\\d{8}", [9], 0, "0", 0, 0, 0, 0, "528[89]"], ER: ["291", "00", "[178]\\d{6}", [7], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[178]"], "0$1"]], "0"], ES: ["34", "00", "[5-9]\\d{8}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]00"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-9]"]]]], ET: ["251", "00", "(?:11|[2-579]\\d)\\d{7}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-579]"], "0$1"]], "0"], FI: ["358", "00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))", "[1-35689]\\d{4}|7\\d{10,11}|(?:[124-7]\\d|3[0-46-9])\\d{8}|[1-9]\\d{5,8}", [5, 6, 7, 8, 9, 10, 11, 12], [["(\\d{5})", "$1", ["20[2-59]"], "0$1"], ["(\\d{3})(\\d{3,7})", "$1 $2", ["(?:[1-3]0|[68])0|70[07-9]"], "0$1"], ["(\\d{2})(\\d{4,8})", "$1 $2", ["[14]|2[09]|50|7[135]"], "0$1"], ["(\\d{2})(\\d{6,10})", "$1 $2", ["7"], "0$1"], ["(\\d)(\\d{4,9})", "$1 $2", ["(?:19|[2568])[1-8]|3(?:0[1-9]|[1-9])|9"], "0$1"]], "0", 0, 0, 0, 0, "1[03-79]|[2-9]", 0, "00"], FJ: ["679", "0(?:0|52)", "45\\d{5}|(?:0800\\d|[235-9])\\d{6}", [7, 11], [["(\\d{3})(\\d{4})", "$1 $2", ["[235-9]|45"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["0"]]], 0, 0, 0, 0, 0, 0, 0, "00"], FK: ["500", "00", "[2-7]\\d{4}", [5]], FM: ["691", "00", "(?:[39]\\d\\d|820)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[389]"]]]], FO: ["298", "00", "[2-9]\\d{5}", [6], [["(\\d{6})", "$1", ["[2-9]"]]], 0, 0, "(10(?:01|[12]0|88))"], FR: ["33", "00", "[1-9]\\d{8}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0 $1"], ["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[1-79]"], "0$1"]], "0"], GA: ["241", "00", "(?:[067]\\d|11)\\d{6}|[2-7]\\d{6}", [7, 8], [["(\\d)(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-7]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["11|[67]"], "0$1"]], 0, 0, "0(11\\d{6}|60\\d{6}|61\\d{6}|6[256]\\d{6}|7[467]\\d{6})", "$1"], GB: ["44", "00", "[1-357-9]\\d{9}|[18]\\d{8}|8\\d{6}", [7, 9, 10], [["(\\d{3})(\\d{4})", "$1 $2", ["800", "8001", "80011", "800111", "8001111"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["845", "8454", "84546", "845464"], "0$1"], ["(\\d{3})(\\d{6})", "$1 $2", ["800"], "0$1"], ["(\\d{5})(\\d{4,5})", "$1 $2", ["1(?:38|5[23]|69|76|94)", "1(?:(?:38|69)7|5(?:24|39)|768|946)", "1(?:3873|5(?:242|39[4-6])|(?:697|768)[347]|9467)"], "0$1"], ["(\\d{4})(\\d{5,6})", "$1 $2", ["1(?:[2-69][02-9]|[78])"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["[25]|7(?:0|6[02-9])", "[25]|7(?:0|6(?:[03-9]|2[356]))"], "0$1"], ["(\\d{4})(\\d{6})", "$1 $2", ["7"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1389]"], "0$1"]], "0", 0, "0|180020", 0, 0, 0, [["(?:1(?:1(?:3(?:[0-58]\\d\\d|73[0-35])|4(?:(?:[0-5]\\d|70)\\d|69[7-9])|(?:(?:5[0-26-9]|[78][0-49])\\d|6(?:[0-4]\\d|50))\\d)|(?:2(?:(?:0[024-9]|2[3-9]|3[3-79]|4[1-689]|[58][02-9]|6[0-47-9]|7[013-9]|9\\d)\\d|1(?:[0-7]\\d|8[0-3]))|(?:3(?:0\\d|1[0-8]|[25][02-9]|3[02-579]|[468][0-46-9]|7[1-35-79]|9[2-578])|4(?:0[03-9]|[137]\\d|[28][02-57-9]|4[02-69]|5[0-8]|[69][0-79])|5(?:0[1-35-9]|[16]\\d|2[024-9]|3[015689]|4[02-9]|5[03-9]|7[0-35-9]|8[0-468]|9[0-57-9])|6(?:0[034689]|1\\d|2[0-35689]|[38][013-9]|4[1-467]|5[0-69]|6[13-9]|7[0-8]|9[0-24578])|7(?:0[0246-9]|2\\d|3[0236-8]|4[03-9]|5[0-46-9]|6[013-9]|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-57-9]|3[02-578]|4[0-578]|5[124-9]|6[2-69]|7\\d|8[02-9]|9[02569])|9(?:0[02-589]|[18]\\d|2[02-689]|3[1-57-9]|4[2-9]|5[0-579]|6[2-47-9]|7[0-24578]|9[2-57]))\\d)\\d)|2(?:0[013478]|3[0189]|4[017]|8[0-46-9]|9[0-2])\\d{3})\\d{4}|1(?:2(?:0(?:46[1-4]|87[2-9])|545[1-79]|76(?:2\\d|3[1-8]|6[1-6])|9(?:7(?:2[0-4]|3[2-5])|8(?:2[2-8]|7[0-47-9]|8[3-5])))|3(?:6(?:38[2-5]|47[23])|8(?:47[04-9]|64[0157-9]))|4(?:044[1-7]|20(?:2[23]|8\\d)|6(?:0(?:30|5[2-57]|6[1-8]|7[2-8])|140)|8(?:052|87[1-3]))|5(?:2(?:4(?:3[2-79]|6\\d)|76\\d)|6(?:26[06-9]|686))|6(?:06(?:4\\d|7[4-79])|295[5-7]|35[34]\\d|47(?:24|61)|59(?:5[08]|6[67]|74)|9(?:55[0-4]|77[23]))|7(?:26(?:6[13-9]|7[0-7])|(?:442|688)\\d|50(?:2[0-3]|[3-68]2|76))|8(?:27[56]\\d|37(?:5[2-5]|8[239])|843[2-58])|9(?:0(?:0(?:6[1-8]|85)|52\\d)|3583|4(?:66[1-8]|9(?:2[01]|81))|63(?:23|3[1-4])|9561))\\d{3}", [9, 10]], ["7(?:457[0-57-9]|700[01]|911[028])\\d{5}|7(?:[1-3]\\d\\d|4(?:[0-46-9]\\d|5[0-689])|5(?:0[0-8]|[13-9]\\d|2[0-35-9])|7(?:0[1-9]|[1-7]\\d|8[02-9]|9[0-689])|8(?:[014-9]\\d|[23][0-8])|9(?:[024-9]\\d|1[02-9]|3[0-689]))\\d{6}", [10]], ["80[08]\\d{7}|800\\d{6}|8001111"], ["(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[2-49]))\\d{7}|845464\\d", [7, 10]], ["70\\d{8}", [10]], 0, ["(?:3[0347]|55)\\d{8}", [10]], ["76(?:464|652)\\d{5}|76(?:0[0-28]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}", [10]], ["56\\d{8}", [10]]], 0, " x"], GD: ["1", "011", "(?:473|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "473$1", 0, "473"], GE: ["995", "00", "(?:[3-57]\\d\\d|800)\\d{6}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["70"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["32"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[57]"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[348]"], "0$1"]], "0"], GF: ["594", "00", "(?:[56]94\\d|7093)\\d{5}|(?:80|9\\d)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-7]|9[47]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[89]"], "0$1"]], "0"], GG: ["44", "00", "(?:1481|[357-9]\\d{3})\\d{6}|8\\d{6}(?:\\d{2})?", [7, 9, 10], 0, "0", 0, "([25-9]\\d{5})$|0|180020", "1481$1", 0, 0, [["1481[25-9]\\d{5}", [10]], ["7(?:(?:781|839)\\d|911[17])\\d{5}", [10]], ["80[08]\\d{7}|800\\d{6}|8001111"], ["(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[0-3]))\\d{7}|845464\\d", [7, 10]], ["70\\d{8}", [10]], 0, ["(?:3[0347]|55)\\d{8}", [10]], ["76(?:464|652)\\d{5}|76(?:0[0-28]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}", [10]], ["56\\d{8}", [10]]]], GH: ["233", "00", "(?:[235]\\d{3}|800)\\d{5}", [8, 9], [["(\\d{3})(\\d{5})", "$1 $2", ["8"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[235]"], "0$1"]], "0"], GI: ["350", "00", "(?:[25]\\d|60)\\d{6}", [8], [["(\\d{3})(\\d{5})", "$1 $2", ["2"]]]], GL: ["299", "00", "(?:19|[2-689]\\d|70)\\d{4}", [6], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["19|[2-9]"]]]], GM: ["220", "00", "[2-9]\\d{6}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]]], GN: ["224", "00", "722\\d{6}|(?:3|6\\d)\\d{7}", [8, 9], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["3"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[67]"]]]], GP: ["590", "00", "(?:590\\d|7090)\\d{5}|(?:69|80|9\\d)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-79]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"]], "0", 0, 0, 0, 0, 0, [["590(?:0[1-68]|[14][0-24-9]|2[0-68]|3[1-9]|5[3-579]|[68][0-689]|7[08]|9\\d)\\d{4}"], ["(?:69(?:0\\d\\d|1(?:2[2-9]|3[0-5])|4(?:0[89]|1[2-6]|9\\d)|6(?:1[016-9]|5[0-4]|[67]\\d))|7090[0-4])\\d{4}"], ["80[0-5]\\d{6}"], 0, 0, 0, 0, 0, ["9(?:(?:39[5-7]|76[018])\\d|475[0-6])\\d{4}"]]], GQ: ["240", "00", "222\\d{6}|(?:3\\d|55|[89]0)\\d{7}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235]"]], ["(\\d{3})(\\d{6})", "$1 $2", ["[89]"]]]], GR: ["30", "00", "5005000\\d{3}|8\\d{9,11}|(?:[269]\\d|70)\\d{8}", [10, 11, 12], [["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["21|7"]], ["(\\d{4})(\\d{6})", "$1 $2", ["2(?:2|3[2-57-9]|4[2-469]|5[2-59]|6[2-9]|7[2-69]|8[2-49])|5"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2689]"]], ["(\\d{3})(\\d{3,4})(\\d{5})", "$1 $2 $3", ["8"]]]], GT: ["502", "00", "80\\d{6}|(?:1\\d{3}|[2-7])\\d{7}", [8, 11], [["(\\d{4})(\\d{4})", "$1 $2", ["[2-8]"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]]]], GU: ["1", "011", "(?:[58]\\d\\d|671|900)\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "671$1", 0, "671"], GW: ["245", "00", "[49]\\d{8}|4\\d{6}", [7, 9], [["(\\d{3})(\\d{4})", "$1 $2", ["40"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[49]"]]]], GY: ["592", "001", "(?:[2-8]\\d{3}|9008)\\d{3}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]]], HK: ["852", "00(?:30|5[09]|[126-9]?)", "8[0-46-9]\\d{6,7}|9\\d{4,7}|(?:[2-7]|9\\d{3})\\d{7}", [5, 6, 7, 8, 9, 11], [["(\\d{3})(\\d{2,5})", "$1 $2", ["900", "9003"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[2-7]|8[1-4]|9(?:0[1-9]|[1-8])"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]], ["(\\d{3})(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]]], 0, 0, 0, 0, 0, 0, 0, "00"], HN: ["504", "00", "8\\d{10}|[237-9]\\d{7}", [8, 11], [["(\\d{4})(\\d{4})", "$1-$2", ["[237-9]"]]]], HR: ["385", "00", "[2-69]\\d{8}|80\\d{5,7}|[1-79]\\d{7}|6\\d{6}", [7, 8, 9], [["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["6[01]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["8"], "0$1"], ["(\\d)(\\d{4})(\\d{3})", "$1 $2 $3", ["1"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["6|7[245]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-57]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"]], "0"], HT: ["509", "00", "[2-589]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[2-589]"]]]], HU: ["36", "00", "[235-7]\\d{8}|[1-9]\\d{7}", [8, 9], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "(06 $1)"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[27][2-9]|3[2-7]|4[24-9]|5[2-79]|6|8[2-57-9]|9[2-69]"], "(06 $1)"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-9]"], "06 $1"]], "06"], ID: ["62", "00[89]", "00[1-9]\\d{9,14}|(?:[1-36]|8\\d{5})\\d{6}|00\\d{9}|[1-9]\\d{8,10}|[2-9]\\d{7}", [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["15"]], ["(\\d{2})(\\d{5,9})", "$1 $2", ["2[124]|[36]1"], "(0$1)"], ["(\\d{3})(\\d{5,7})", "$1 $2", ["800"], "0$1"], ["(\\d{3})(\\d{5,8})", "$1 $2", ["[2-79]"], "(0$1)"], ["(\\d{3})(\\d{3,4})(\\d{3})", "$1-$2-$3", ["8[1-35-9]"], "0$1"], ["(\\d{3})(\\d{6,8})", "$1 $2", ["1"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["804"], "0$1"], ["(\\d{3})(\\d)(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["80"], "0$1"], ["(\\d{3})(\\d{4})(\\d{4,5})", "$1-$2-$3", ["8"], "0$1"]], "0"], IE: ["353", "00", "(?:1\\d|[2569])\\d{6,8}|4\\d{6,9}|7\\d{8}|8\\d{8,9}", [7, 8, 9, 10], [["(\\d{2})(\\d{5})", "$1 $2", ["2[24-9]|47|58|6[237-9]|9[35-9]"], "(0$1)"], ["(\\d{3})(\\d{5})", "$1 $2", ["[45]0"], "(0$1)"], ["(\\d)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2569]|4[1-69]|7[14]"], "(0$1)"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["70"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["81"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[78]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["4"], "(0$1)"], ["(\\d{2})(\\d)(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["8"], "0$1"]], "0"], IL: ["972", "0(?:0|1[2-9])", "1\\d{6}(?:\\d{3,5})?|[57]\\d{8}|[1-489]\\d{7}", [7, 8, 9, 10, 11, 12], [["(\\d{4})(\\d{3})", "$1-$2", ["125"]], ["(\\d{4})(\\d{2})(\\d{2})", "$1-$2-$3", ["121"]], ["(\\d)(\\d{3})(\\d{4})", "$1-$2-$3", ["[2-489]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[57]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1-$2-$3", ["12"]], ["(\\d{4})(\\d{6})", "$1-$2", ["159"]], ["(\\d)(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3-$4", ["1[7-9]"]], ["(\\d{3})(\\d{1,2})(\\d{3})(\\d{4})", "$1-$2 $3-$4", ["15"]]], "0"], IM: ["44", "00", "1624\\d{6}|(?:[3578]\\d|90)\\d{8}", [10], 0, "0", 0, "([25-8]\\d{5})$|0|180020", "1624$1", 0, "74576|(?:16|7[56])24"], IN: ["91", "00", "(?:000800|[2-9]\\d\\d)\\d{7}|1\\d{7,12}", [8, 9, 10, 11, 12, 13], [["(\\d{8})", "$1", ["5(?:0|2[23]|3[03]|[67]1|88)", "5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|888)", "5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|8888)"], 0, 1], ["(\\d{4})(\\d{4,5})", "$1 $2", ["180", "1800"], 0, 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["140"], 0, 1], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["11|2[02]|33|4[04]|79[1-7]|80[2-46]", "11|2[02]|33|4[04]|79(?:[1-6]|7[19])|80(?:[2-4]|6[0-589])", "11|2[02]|33|4[04]|79(?:[124-6]|3(?:[02-9]|1[0-24-9])|7(?:1|9[1-6]))|80(?:[2-4]|6[0-589])"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1(?:2[0-249]|3[0-25]|4[145]|[68]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1)|6(?:12|[2-4]1|5[17]|6[13]|80)|7(?:12|3[134]|4[47]|61|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)|(?:43|59|75)[15]|(?:1[59]|29|67|72)[14]", "1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|674|7(?:(?:2[14]|3[34]|5[15])[2-6]|61[346]|88[0-8])|8(?:70[2-6]|84[235-7]|91[3-7])|(?:1(?:29|60|8[06])|261|552|6(?:12|[2-47]1|5[17]|6[13]|80)|7(?:12|31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))[2-7]", "1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12(?:[2-6]|7[0-8])|74[2-7])|7(?:(?:2[14]|5[15])[2-6]|3171|61[346]|88(?:[2-7]|82))|8(?:70[2-6]|84(?:[2356]|7[19])|91(?:[3-6]|7[19]))|73[134][2-6]|(?:74[47]|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[2-6]|7[19])|(?:1(?:29|60|8[06])|261|552|6(?:[2-4]1|5[17]|6[13]|7(?:1|4[0189])|80)|7(?:12|88[01]))[2-7]"], "0$1", 1], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2[2457-9]|3[2-5]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1[013-9]|28|3[129]|4[1-35689]|5[29]|6[02-5]|70)|807", "1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1(?:[013-8]|9[6-9])|28[6-8]|3(?:17|2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4|5[0-367])|70[13-7])|807[19]", "1(?:[2-479]|5(?:[0236-9]|5[013-9]))|[2-5]|6(?:2(?:84|95)|355|83)|73179|807(?:1|9[1-3])|(?:1552|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[124-6])\\d|7(?:1(?:[013-8]\\d|9[6-9])|28[6-8]|3(?:2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]))[2-7]"], "0$1", 1], ["(\\d{5})(\\d{5})", "$1 $2", ["[6-9]"], "0$1", 1], ["(\\d{4})(\\d{2,4})(\\d{4})", "$1 $2 $3", ["1(?:6|8[06])", "1(?:6|8[06]0)"], 0, 1], ["(\\d{4})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["18"], 0, 1]], "0"], IO: ["246", "00", "3\\d{6}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["3"]]]], IQ: ["964", "00", "(?:1|7\\d\\d)\\d{7}|[2-6]\\d{7,8}", [8, 9, 10], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-6]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"]], "0"], IR: ["98", "00", "[1-9]\\d{9}|(?:[1-8]\\d\\d|9)\\d{3,4}", [4, 5, 6, 7, 10], [["(\\d{4,5})", "$1", ["96"], "0$1"], ["(\\d{2})(\\d{4,5})", "$1 $2", ["(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])[12689]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["[1-8]"], "0$1"]], "0"], IS: ["354", "00|1(?:0(?:01|[12]0)|100)", "(?:38\\d|[4-9])\\d{6}", [7, 9], [["(\\d{3})(\\d{4})", "$1 $2", ["[4-9]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["3"]]], 0, 0, 0, 0, 0, 0, 0, "00"], IT: ["39", "00", "0\\d{5,10}|1\\d{8,10}|3(?:[0-8]\\d{7,10}|9\\d{7,8})|(?:43|55|70)\\d{8}|8\\d{5}(?:\\d{2,4})?", [6, 7, 8, 9, 10, 11, 12], [["(\\d{2})(\\d{4,6})", "$1 $2", ["0[26]"]], ["(\\d{3})(\\d{3,6})", "$1 $2", ["0[13-57-9][0159]|8(?:03|4[17]|9[2-5])", "0[13-57-9][0159]|8(?:03|4[17]|9(?:2|3[04]|[45][0-4]))"]], ["(\\d{4})(\\d{2,6})", "$1 $2", ["0(?:[13-579][2-46-8]|8[236-8])"]], ["(\\d{4})(\\d{4})", "$1 $2", ["894"]], ["(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[26]|5"]], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1(?:44|[679])|[378]|43"]], ["(\\d{3})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[13-57-9][0159]|14"]], ["(\\d{2})(\\d{4})(\\d{5})", "$1 $2 $3", ["0[26]"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["0"]], ["(\\d{3})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["3"]]], 0, 0, 0, 0, 0, 0, [["0669[0-79]\\d{1,6}|0(?:1(?:[0159]\\d|[27][1-5]|31|4[1-4]|6[1356]|8[2-57])|2\\d\\d|3(?:[0159]\\d|2[1-4]|3[12]|[48][1-6]|6[2-59]|7[1-7])|4(?:[0159]\\d|[23][1-9]|4[245]|6[1-5]|7[1-4]|81)|5(?:[0159]\\d|2[1-5]|3[2-6]|4[1-79]|6[4-6]|7[1-578]|8[3-8])|6(?:[0-57-9]\\d|6[0-8])|7(?:[0159]\\d|2[12]|3[1-7]|4[2-46]|6[13569]|7[13-6]|8[1-59])|8(?:[0159]\\d|2[3-578]|3[1-356]|[6-8][1-5])|9(?:[0159]\\d|[238][1-5]|4[12]|6[1-8]|7[1-6]))\\d{2,7}", [6, 7, 8, 9, 10, 11]], ["3[2-9]\\d{7,8}|(?:31|43)\\d{8}", [9, 10]], ["80(?:0\\d{3}|3)\\d{3}", [6, 9]], ["(?:0878\\d{3}|89(?:2\\d|3[04]|4(?:[0-4]|[5-9]\\d\\d)|5[0-4]))\\d\\d|(?:1(?:44|6[346])|89(?:38|5[5-9]|9))\\d{6}", [6, 8, 9, 10]], ["1(?:78\\d|99)\\d{6}", [9, 10]], ["3[2-8]\\d{9,10}", [11, 12]], 0, 0, ["55\\d{8}", [10]], ["84(?:[08]\\d{3}|[17])\\d{3}", [6, 9]]]], JE: ["44", "00", "1534\\d{6}|(?:[3578]\\d|90)\\d{8}", [10], 0, "0", 0, "([0-24-8]\\d{5})$|0|180020", "1534$1", 0, 0, [["1534[0-24-8]\\d{5}"], ["7(?:(?:(?:50|82)9|937)\\d|7(?:00[378]|97\\d))\\d{5}"], ["80(?:07(?:35|81)|8901)\\d{4}"], ["(?:8(?:4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|90(?:066[59]|1810|71(?:07|55)))\\d{4}"], ["701511\\d{4}"], 0, ["(?:3(?:0(?:07(?:35|81)|8901)|3\\d{4}|4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|55\\d{4})\\d{4}"], ["76(?:464|652)\\d{5}|76(?:0[0-28]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}"], ["56\\d{8}"]]], JM: ["1", "011", "(?:[58]\\d\\d|658|900)\\d{7}", [10], 0, "1", 0, 0, 0, 0, "658|876"], JO: ["962", "00", "(?:(?:[2689]|7\\d)\\d|32|53)\\d{6}", [8, 9], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2356]|87"], "(0$1)"], ["(\\d{3})(\\d{5,6})", "$1 $2", ["[89]"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["70"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["7"], "0$1"]], "0"], JP: ["81", "010", "00[1-9]\\d{6,14}|[25-9]\\d{9}|(?:00|[1-9]\\d\\d)\\d{6}", [8, 9, 10, 11, 12, 13, 14, 15, 16, 17], [["(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3", ["(?:12|57|99)0"], "0$1"], ["(\\d{4})(\\d)(\\d{4})", "$1-$2-$3", ["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51)|9(?:80|9[16])", "1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[7-9]|96)|477|51[2-9])|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]", "1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[7-9]|96[2457-9])|477|51[2-9])|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["60"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1-$2-$3", ["3|4(?:2[09]|7[01])|6[1-9]", "3|4(?:2(?:0|9[02-69])|7(?:0[019]|1))|6[1-9]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["1(?:1|5[45]|77|88|9[69])|2(?:2[1-37]|3[0-269]|4[59]|5|6[24]|7[1-358]|8[1369]|9[0-38])|4(?:[28][1-9]|3[0-57]|[45]|6[248]|7[2-579]|9[29])|5(?:2|3[0459]|4[0-369]|5[29]|8[02389]|9[0-389])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9[2-6])|8(?:2[124589]|3[26-9]|49|51|6|7[0-468]|8[68]|9[019])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9[1-489])", "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2(?:[127]|3[014-9])|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9[19])|62|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|8[1-9]|9[29])|5(?:2|3(?:[045]|9[0-8])|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0-2469])|3(?:[29]|60)|49|51|6(?:[0-24]|36|5[0-3589]|7[23]|9[01459])|7[0-468]|8[68])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3[34]|4[0178]))|(?:264|837)[016-9]|2(?:57|93)[015-9]|(?:25[0468]|422|838)[01]|(?:47[59]|59[89]|8(?:6[68]|9))[019]", "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3(?:[045]|9(?:[0-58]|6[4-9]|7[0-35689]))|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0169])|3(?:[29]|60|7(?:[017-9]|6[6-8]))|49|51|6(?:[0-24]|36[2-57-9]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|7(?:2[2-468]|3[78])|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:8294|96)[1-3]|2(?:57|93)[015-9]|(?:223|8699)[014-9]|(?:25[0468]|422|838)[01]|(?:48|8292|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["[14]|[289][2-9]|5[3-9]|7[2-4679]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["800"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[25-9]"], "0$1"]], "0", 0, "(000[2569]\\d{4,6})$|(?:(?:003768)0?)|0", "$1"], KE: ["254", "000", "(?:[17]\\d\\d|900)\\d{6}|(?:2|80)0\\d{6,7}|[4-6]\\d{6,8}", [7, 8, 9, 10], [["(\\d{2})(\\d{5,7})", "$1 $2", ["[24-6]"], "0$1"], ["(\\d{3})(\\d{6})", "$1 $2", ["[17]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[89]"], "0$1"]], "0"], KG: ["996", "00", "8\\d{9}|[235-9]\\d{8}", [9, 10], [["(\\d{4})(\\d{5})", "$1 $2", ["3(?:1[346]|[24-79])"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235-79]|88"], "0$1"], ["(\\d{3})(\\d{3})(\\d)(\\d{2,3})", "$1 $2 $3 $4", ["8"], "0$1"]], "0"], KH: ["855", "00[14-9]", "1\\d{9}|[1-9]\\d{7,8}", [8, 9, 10], [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-9]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]]], "0"], KI: ["686", "00", "(?:[37]\\d|6[0-79])\\d{6}|(?:[2-48]\\d|50)\\d{3}", [5, 8], 0, "0"], KM: ["269", "00", "[3478]\\d{6}", [7], [["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[3478]"]]]], KN: ["1", "011", "(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-7]\\d{6})$|1", "869$1", 0, "869"], KP: ["850", "00|99", "85\\d{6}|(?:19\\d|[2-7])\\d{7}", [8, 10], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-7]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"]], "0"], KR: ["82", "00(?:[125689]|3(?:[46]5|91)|7(?:00|27|3|55|6[126]))", "00[1-9]\\d{8,11}|(?:[12]|5\\d{3})\\d{7}|[13-6]\\d{9}|(?:[1-6]\\d|80)\\d{7}|[3-6]\\d{4,5}|(?:00|7)0\\d{8}", [5, 6, 8, 9, 10, 11, 12, 13, 14], [["(\\d{2})(\\d{3,4})", "$1-$2", ["(?:3[1-3]|[46][1-4]|5[1-5])1"], "0$1"], ["(\\d{4})(\\d{4})", "$1-$2", ["1"]], ["(\\d)(\\d{3,4})(\\d{4})", "$1-$2-$3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[36]0|8"], "0$1"], ["(\\d{2})(\\d{3,4})(\\d{4})", "$1-$2-$3", ["[1346]|5[1-5]"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[57]"], "0$1"], ["(\\d{2})(\\d{5})(\\d{4})", "$1-$2-$3", ["5"], "0$1"]], "0", 0, "0(8(?:[1-46-8]|5\\d\\d))?"], KW: ["965", "00", "18\\d{5}|(?:[2569]\\d|41)\\d{6}", [7, 8], [["(\\d{4})(\\d{3,4})", "$1 $2", ["[169]|2(?:[235]|4[1-35-9])|52"]], ["(\\d{3})(\\d{5})", "$1 $2", ["[245]"]]]], KY: ["1", "011", "(?:345|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "345$1", 0, "345"], KZ: ["7", "810", "(?:33622|8\\d{8})\\d{5}|[78]\\d{9}", [10, 14], 0, "8", 0, 0, 0, 0, "33622|7", 0, "8~10"], LA: ["856", "00", "[23]\\d{9}|3\\d{8}|(?:[235-8]\\d|41)\\d{6}", [8, 9, 10], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2[13]|3[14]|[4-8]"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["3"], "0$1"], ["(\\d{2})(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["[23]"], "0$1"]], "0"], LB: ["961", "00", "[27-9]\\d{7}|[13-9]\\d{6}", [7, 8], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[13-69]|7(?:[2-57]|62|8[0-6]|9[04-9])|8[02-9]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[27-9]"]]], "0"], LC: ["1", "011", "(?:[58]\\d\\d|758|900)\\d{7}", [10], 0, "1", 0, "([2-8]\\d{6})$|1", "758$1", 0, "758"], LI: ["423", "00", "[68]\\d{8}|(?:[2378]\\d|90)\\d{5}", [7, 9], [["(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[2379]|8(?:0[09]|7)", "[2379]|8(?:0(?:02|9)|7)"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["69"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]]], "0", 0, "(1001)|0"], LK: ["94", "00", "[1-9]\\d{8}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[1-689]"], "0$1"]], "0"], LR: ["231", "00", "(?:[2457]\\d|33|88)\\d{7}|(?:2\\d|[4-6])\\d{6}", [7, 8, 9], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["4[67]|[56]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-578]"], "0$1"]], "0"], LS: ["266", "00", "(?:[256]\\d\\d|800)\\d{5}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[2568]"]]]], LT: ["370", "00", "(?:[3469]\\d|52|[78]0)\\d{6}", [8], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["52[0-7]"], "(0-$1)", 1], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[7-9]"], "0 $1", 1], ["(\\d{2})(\\d{6})", "$1 $2", ["37|4(?:[15]|6[1-8])"], "(0-$1)", 1], ["(\\d{3})(\\d{5})", "$1 $2", ["[3-6]"], "(0-$1)", 1]], "0", 0, "[08]"], LU: ["352", "00", "35[013-9]\\d{4,8}|6\\d{8}|35\\d{2,4}|(?:[2457-9]\\d|3[0-46-9])\\d{2,9}", [4, 5, 6, 7, 8, 9, 10, 11], [["(\\d{2})(\\d{3})", "$1 $2", ["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]], ["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"]], ["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["20[2-689]"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})", "$1 $2 $3 $4", ["2(?:[0367]|4[3-8])"]], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["80[01]|90[015]"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["20"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})", "$1 $2 $3 $4 $5", ["2(?:[0367]|4[3-8])"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{1,5})", "$1 $2 $3 $4", ["[3-57]|8[13-9]|9(?:0[89]|[2-579])|(?:2|80)[2-9]"]]], 0, 0, "(15(?:0[06]|1[12]|[35]5|4[04]|6[26]|77|88|99)\\d)"], LV: ["371", "00", "(?:[268]\\d|90)\\d{6}", [8], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[269]|8[01]"]]]], LY: ["218", "00", "[2-9]\\d{8}", [9], [["(\\d{2})(\\d{7})", "$1-$2", ["[2-9]"], "0$1"]], "0"], MA: ["212", "00", "[5-8]\\d{8}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["5[45]"], "0$1"], ["(\\d{4})(\\d{5})", "$1-$2", ["5(?:2[2-46-9]|3[3-9]|9)|8(?:0[89]|92)"], "0$1"], ["(\\d{2})(\\d{7})", "$1-$2", ["8"], "0$1"], ["(\\d{3})(\\d{6})", "$1-$2", ["[5-7]"], "0$1"]], "0", 0, 0, 0, 0, 0, [["5(?:2(?:[0-25-79]\\d|3[1-578]|4[02-46-8]|8[0235-7])|3(?:[0-47]\\d|5[02-9]|6[02-8]|8[014-9]|9[3-9])|(?:4[067]|5[03])\\d)\\d{5}"], ["(?:6(?:[0-79]\\d|8[0-247-9])|7(?:[0167]\\d|2[0-8]|5[0-5]|8[0-7]))\\d{6}"], ["80[0-7]\\d{6}"], ["89\\d{7}"], 0, 0, 0, 0, ["(?:592(?:4[0-2]|93)|80[89]\\d\\d)\\d{4}"]]], MC: ["377", "00", "(?:[3489]|6\\d)\\d{7}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["4"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[389]"]], ["(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["6"], "0$1"]], "0"], MD: ["373", "00", "(?:[235-7]\\d|[89]0)\\d{6}", [8], [["(\\d{3})(\\d{5})", "$1 $2", ["[89]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["22|3"], "0$1"], ["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[25-7]"], "0$1"]], "0"], ME: ["382", "00", "(?:20|[3-79]\\d)\\d{6}|80\\d{6,7}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-9]"], "0$1"]], "0"], MF: ["590", "00", "(?:590\\d|7090)\\d{5}|(?:69|80|9\\d)\\d{7}", [9], 0, "0", 0, 0, 0, 0, 0, [["590(?:0[079]|[14]3|[27][79]|3[03-7]|5[0-268]|87)\\d{4}"], ["(?:69(?:0\\d\\d|1(?:2[2-9]|3[0-5])|4(?:0[89]|1[2-6]|9\\d)|6(?:1[016-9]|5[0-4]|[67]\\d))|7090[0-4])\\d{4}"], ["80[0-5]\\d{6}"], 0, 0, 0, 0, 0, ["9(?:(?:39[5-7]|76[018])\\d|475[0-6])\\d{4}"]]], MG: ["261", "00", "[23]\\d{8}", [9], [["(\\d{2})(\\d{2})(\\d{3})(\\d{2})", "$1 $2 $3 $4", ["[23]"], "0$1"]], "0", 0, "([24-9]\\d{6})$|0", "20$1"], MH: ["692", "011", "329\\d{4}|(?:[256]\\d|45)\\d{5}", [7], [["(\\d{3})(\\d{4})", "$1-$2", ["[2-6]"]]], "1"], MK: ["389", "00", "[2-578]\\d{7}", [8], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2|34[47]|4(?:[37]7|5[47]|64)"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[347]"], "0$1"], ["(\\d{3})(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[58]"], "0$1"]], "0"], ML: ["223", "00", "[24-9]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24-9]"]]]], MM: ["95", "00", "1\\d{5,7}|95\\d{6}|(?:[4-7]|9[0-46-9])\\d{6,8}|(?:2|8\\d)\\d{5,8}", [6, 7, 8, 9, 10], [["(\\d)(\\d{2})(\\d{3})", "$1 $2 $3", ["16|2"], "0$1"], ["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["4(?:[2-46]|5[3-5])|5|6(?:[1-689]|7[235-7])|7(?:[0-4]|5[2-7])|8[1-5]|(?:60|86)[23]"], "0$1"], ["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[12]|452|678|86", "[12]|452|6788|86"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[4-7]|8[1-35]"], "0$1"], ["(\\d)(\\d{3})(\\d{4,6})", "$1 $2 $3", ["9(?:2[0-4]|[35-9]|4[137-9])"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"], ["(\\d)(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["92"], "0$1"], ["(\\d)(\\d{5})(\\d{4})", "$1 $2 $3", ["9"], "0$1"]], "0"], MN: ["976", "001", "[12]\\d{7,9}|[5-9]\\d{7}", [8, 9, 10], [["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[12]1"], "0$1"], ["(\\d{4})(\\d{4})", "$1 $2", ["[5-9]"]], ["(\\d{3})(\\d{5,6})", "$1 $2", ["[12]2[1-3]"], "0$1"], ["(\\d{4})(\\d{5,6})", "$1 $2", ["[12](?:27|3[2-8]|4[2-68]|5[1-4689])", "[12](?:27|3[2-8]|4[2-68]|5[1-4689])[0-3]"], "0$1"], ["(\\d{5})(\\d{4,5})", "$1 $2", ["[12]"], "0$1"]], "0"], MO: ["853", "00", "0800\\d{3}|(?:28|[68]\\d)\\d{6}", [7, 8], [["(\\d{4})(\\d{3})", "$1 $2", ["0"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[268]"]]]], MP: ["1", "011", "[58]\\d{9}|(?:67|90)0\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "670$1", 0, "670"], MQ: ["596", "00", "(?:596\\d|7091)\\d{5}|(?:69|[89]\\d)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-79]|8(?:0[6-9]|[36])"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"]], "0"], MR: ["222", "00", "(?:[2-4]\\d\\d|800)\\d{5}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-48]"]]]], MS: ["1", "011", "(?:[58]\\d\\d|664|900)\\d{7}", [10], 0, "1", 0, "([34]\\d{6})$|1", "664$1", 0, "664"], MT: ["356", "00", "3550\\d{4}|(?:[2579]\\d\\d|800)\\d{5}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[2357-9]"]]]], MU: ["230", "0(?:0|[24-7]0|3[03])", "(?:[57]|8\\d\\d)\\d{7}|[2-468]\\d{6}", [7, 8, 10], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-46]|8[013]"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[57]"]], ["(\\d{5})(\\d{5})", "$1 $2", ["8"]]], 0, 0, 0, 0, 0, 0, 0, "020"], MV: ["960", "0(?:0|19)", "(?:800|9[0-57-9]\\d)\\d{7}|[34679]\\d{6}", [7, 10], [["(\\d{3})(\\d{4})", "$1-$2", ["[34679]"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"]]], 0, 0, 0, 0, 0, 0, 0, "00"], MW: ["265", "00", "(?:[1289]\\d|31|77)\\d{7}|1\\d{6}", [7, 9], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["1[2-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[137-9]"], "0$1"]], "0"], MX: ["52", "0[09]", "[2-9]\\d{9}", [10], [["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["33|5[56]|81"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-9]"]]], 0, 0, 0, 0, 0, 0, 0, "00"], MY: ["60", "00", "1\\d{8,9}|(?:3\\d|[4-9])\\d{7}", [8, 9, 10], [["(\\d)(\\d{3})(\\d{4})", "$1-$2 $3", ["[4-79]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1-$2 $3", ["1(?:[02469]|[378][1-9]|53)|8", "1(?:[02469]|[37][1-9]|53|8(?:[1-46-9]|5[7-9]))|8"], "0$1"], ["(\\d)(\\d{4})(\\d{4})", "$1-$2 $3", ["3"], "0$1"], ["(\\d)(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3-$4", ["1(?:[367]|80)"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1-$2 $3", ["15"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4})", "$1-$2 $3", ["1"], "0$1"]], "0"], MZ: ["258", "00", "(?:2|8\\d)\\d{7}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2|8[2-79]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]]]], NA: ["264", "00", "[68]\\d{7,8}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["88"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["6"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["87"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"]], "0"], NC: ["687", "00", "(?:050|[2-57-9]\\d\\d)\\d{3}", [6], [["(\\d{2})(\\d{2})(\\d{2})", "$1.$2.$3", ["[02-57-9]"]]]], NE: ["227", "00", "[027-9]\\d{7}", [8], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["08"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[089]|2[013]|7[0467]"]]]], NF: ["672", "00", "[13]\\d{5}", [6], [["(\\d{2})(\\d{4})", "$1 $2", ["1[0-3]"]], ["(\\d)(\\d{5})", "$1 $2", ["[13]"]]], 0, 0, "([0-258]\\d{4})$", "3$1"], NG: ["234", "009", "(?:20|9\\d)\\d{8}|[78]\\d{9,13}", [10, 11, 12, 13, 14], [["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[7-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["20[129]"], "0$1"], ["(\\d{4})(\\d{2})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{3})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["[78]"], "0$1"], ["(\\d{3})(\\d{5})(\\d{5,6})", "$1 $2 $3", ["[78]"], "0$1"]], "0"], NI: ["505", "00", "(?:1800|[25-8]\\d{3})\\d{4}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[125-8]"]]]], NL: ["31", "00", "(?:[124-7]\\d\\d|3(?:[02-9]\\d|1[0-8]))\\d{6}|8\\d{6,9}|9\\d{6,10}|1\\d{4,5}", [5, 6, 7, 8, 9, 10, 11], [["(\\d{3})(\\d{4,7})", "$1 $2", ["[89]0"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["66"], "0$1"], ["(\\d)(\\d{8})", "$1 $2", ["6"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-578]|91"], "0$1"], ["(\\d{3})(\\d{3})(\\d{5})", "$1 $2 $3", ["9"], "0$1"]], "0"], NO: ["47", "00", "(?:0|[2-9]\\d{3})\\d{4}", [5, 8], [["(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["8"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-79]"]]], 0, 0, 0, 0, 0, "[02-689]|7[0-8]"], NP: ["977", "00", "(?:1\\d|9)\\d{9}|[1-9]\\d{7}", [8, 10, 11], [["(\\d)(\\d{7})", "$1-$2", ["1[2-6]"], "0$1"], ["(\\d{2})(\\d{6})", "$1-$2", ["1[01]|[2-8]|9(?:[1-59]|[67][2-6])"], "0$1"], ["(\\d{3})(\\d{7})", "$1-$2", ["9"]]], "0"], NR: ["674", "00", "(?:222|444|(?:55|8\\d)\\d|666|777|999)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[24-9]"]]]], NU: ["683", "00", "(?:[4-7]|888\\d)\\d{3}", [4, 7], [["(\\d{3})(\\d{4})", "$1 $2", ["8"]]]], NZ: ["64", "0(?:0|161)", "[1289]\\d{9}|50\\d{5}(?:\\d{2,3})?|[27-9]\\d{7,8}|(?:[34]\\d|6[0-35-9])\\d{6}|8\\d{4,6}", [5, 6, 7, 8, 9, 10], [["(\\d{2})(\\d{3,8})", "$1 $2", ["8[1-79]"], "0$1"], ["(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["50[036-8]|8|90", "50(?:[0367]|88)|8|90"], "0$1"], ["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["24|[346]|7[2-57-9]|9[2-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2(?:10|74)|[589]"], "0$1"], ["(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1|2[028]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,5})", "$1 $2 $3", ["2(?:[169]|7[0-35-9])|7"], "0$1"]], "0", 0, 0, 0, 0, 0, 0, "00"], OM: ["968", "00", "(?:1505|[279]\\d{3}|500)\\d{4}|800\\d{5,6}", [7, 8, 9], [["(\\d{3})(\\d{4,6})", "$1 $2", ["[58]"]], ["(\\d{2})(\\d{6})", "$1 $2", ["2"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[179]"]]]], PA: ["507", "00", "(?:00800|8\\d{3})\\d{6}|[68]\\d{7}|[1-57-9]\\d{6}", [7, 8, 10, 11], [["(\\d{3})(\\d{4})", "$1-$2", ["[1-57-9]"]], ["(\\d{4})(\\d{4})", "$1-$2", ["[68]"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]]]], PE: ["51", "00|19(?:1[124]|77|90)00", "(?:[14-8]|9\\d)\\d{7}", [8, 9], [["(\\d{3})(\\d{5})", "$1 $2", ["80"], "(0$1)"], ["(\\d)(\\d{7})", "$1 $2", ["1"], "(0$1)"], ["(\\d{2})(\\d{6})", "$1 $2", ["[4-8]"], "(0$1)"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"]]], "0", 0, 0, 0, 0, 0, 0, "00", " Anexo "], PF: ["689", "00", "4\\d{5}(?:\\d{2})?|8\\d{7,8}", [6, 8, 9], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["44"]], ["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["4|8[7-9]"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]]]], PG: ["675", "00|140[1-3]", "(?:180|[78]\\d{3})\\d{4}|(?:[2-589]\\d|64)\\d{5}", [7, 8], [["(\\d{3})(\\d{4})", "$1 $2", ["18|[2-69]|85"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[78]"]]], 0, 0, 0, 0, 0, 0, 0, "00"], PH: ["63", "00", "(?:[2-7]|9\\d)\\d{8}|2\\d{5}|(?:1800|8)\\d{7,9}", [6, 8, 9, 10, 11, 12, 13], [["(\\d)(\\d{5})", "$1 $2", ["2"], "(0$1)"], ["(\\d{4})(\\d{4,6})", "$1 $2", ["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|544|88[245]|(?:52|64|86)2", "3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"], "(0$1)"], ["(\\d{5})(\\d{4})", "$1 $2", ["346|4(?:27|9[35])|883", "3469|4(?:279|9(?:30|56))|8834"], "(0$1)"], ["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[3-7]|8[2-8]"], "(0$1)"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]], ["(\\d{4})(\\d{1,2})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["1"]]], "0"], PK: ["92", "00", "122\\d{6}|[24-8]\\d{10,11}|9(?:[013-9]\\d{8,10}|2(?:[01]\\d\\d|2(?:[06-8]\\d|1[01]))\\d{7})|(?:[2-8]\\d{3}|92(?:[0-7]\\d|8[1-9]))\\d{6}|[24-9]\\d{8}|[89]\\d{7}", [8, 9, 10, 11, 12], [["(\\d{3})(\\d{3})(\\d{2,7})", "$1 $2 $3", ["[89]0"], "0$1"], ["(\\d{4})(\\d{5})", "$1 $2", ["1"]], ["(\\d{3})(\\d{6,7})", "$1 $2", ["2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8])", "9(?:2[3-8]|98)|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:22|3[27-9]|4[2-6]|6[3569]|9[25-7]))[2-9]"], "(0$1)"], ["(\\d{2})(\\d{7,8})", "$1 $2", ["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"], "(0$1)"], ["(\\d{5})(\\d{5})", "$1 $2", ["58"], "(0$1)"], ["(\\d{3})(\\d{7})", "$1 $2", ["3"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91"], "(0$1)"], ["(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["[24-9]"], "(0$1)"]], "0"], PL: ["48", "00", "(?:6|8\\d\\d)\\d{7}|[1-9]\\d{6}(?:\\d{2})?|[26]\\d{5}", [6, 7, 8, 9, 10], [["(\\d{5})", "$1", ["19"]], ["(\\d{3})(\\d{3})", "$1 $2", ["11|20|64"]], ["(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])1", "(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])19"]], ["(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["64"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["21|39|45|5[0137]|6[0469]|7[02389]|8(?:0[14]|8)"]], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[2-8]|[2-7]|8[1-79]|9[145]"]], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["8"]]]], PM: ["508", "00", "[45]\\d{5}|(?:708|8\\d\\d)\\d{6}", [6, 9], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["[45]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["7"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"]], "0"], PR: ["1", "011", "(?:[589]\\d\\d|787)\\d{7}", [10], 0, "1", 0, 0, 0, 0, "787|939"], PS: ["970", "00", "[2489]2\\d{6}|(?:1\\d|5)\\d{8}", [8, 9, 10], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2489]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["5"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]]], "0"], PT: ["351", "00", "1693\\d{5}|(?:[26-9]\\d|30)\\d{7}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["2[12]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["16|[236-9]"]]]], PW: ["680", "01[12]", "(?:[24-8]\\d\\d|345|900)\\d{4}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]]], PY: ["595", "00", "59\\d{4,6}|9\\d{5,10}|(?:[2-46-8]\\d|5[0-8])\\d{4,7}", [6, 7, 8, 9, 10, 11], [["(\\d{3})(\\d{3,6})", "$1 $2", ["[2-9]0"], "0$1"], ["(\\d{2})(\\d{5})", "$1 $2", ["[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36]"], "(0$1)"], ["(\\d{3})(\\d{4,5})", "$1 $2", ["2[279]|3[13-5]|4[359]|5|6(?:[34]|7[1-46-8])|7[46-8]|85"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2[14-68]|3[26-9]|4[1246-8]|6(?:1|75)|7[1-35]|8[1-36]"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["87"]], ["(\\d{3})(\\d{6})", "$1 $2", ["9(?:[5-79]|8[1-7])"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-8]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"]]], "0"], QA: ["974", "00", "800\\d{4}|(?:2|800)\\d{6}|(?:0080|[3-7])\\d{7}", [7, 8, 9, 11], [["(\\d{3})(\\d{4})", "$1 $2", ["2[136]|8"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[3-7]"]]]], RE: ["262", "00", "709\\d{6}|(?:26|[689]\\d)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[26-9]"], "0$1"]], "0", 0, 0, 0, 0, 0, [["26(?:2\\d\\d|3(?:0\\d|1[0-6]))\\d{4}"], ["(?:69(?:2\\d\\d|3(?:[06][0-6]|1[0-3]|2[0-2]|3[0-39]|4\\d|5[0-5]|7[0-37]|8[0-8]|9[0-479]))|7092[0-3])\\d{4}"], ["80\\d{7}"], ["89[1-37-9]\\d{6}"], 0, 0, 0, 0, ["9(?:399[0-3]|479[0-6]|76(?:2[278]|3[0-37]))\\d{4}"], ["8(?:1[019]|2[0156]|84|90)\\d{6}"]]], RO: ["40", "00", "(?:[236-8]\\d|90)\\d{7}|[23]\\d{5}", [6, 9], [["(\\d{3})(\\d{3})", "$1 $2", ["2[3-6]", "2[3-6]\\d9"], "0$1"], ["(\\d{2})(\\d{4})", "$1 $2", ["219|31"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[23]1"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[236-9]"], "0$1"]], "0", 0, 0, 0, 0, 0, 0, 0, " int "], RS: ["381", "00", "38[02-9]\\d{6,9}|6\\d{7,9}|90\\d{4,8}|38\\d{5,6}|(?:7\\d\\d|800)\\d{3,9}|(?:[12]\\d|3[0-79])\\d{5,10}", [6, 7, 8, 9, 10, 11, 12], [["(\\d{3})(\\d{3,9})", "$1 $2", ["(?:2[389]|39)0|[7-9]"], "0$1"], ["(\\d{2})(\\d{5,10})", "$1 $2", ["[1-36]"], "0$1"]], "0"], RU: ["7", "810", "8\\d{13}|[347-9]\\d{9}", [10, 14], [["(\\d{4})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["7(?:1[0-8]|2[1-9])", "7(?:1(?:[0-356]2|4[29]|7|8[27])|2(?:1[23]|[2-9]2))", "7(?:1(?:[0-356]2|4[29]|7|8[27])|2(?:13[03-69]|62[013-9]))|72[1-57-9]2"], "8 ($1)", 1], ["(\\d{5})(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["7(?:1[0-68]|2[1-9])", "7(?:1(?:[06][3-6]|[18]|2[35]|[3-5][3-5])|2(?:[13][3-5]|[24-689]|7[457]))", "7(?:1(?:0(?:[356]|4[023])|[18]|2(?:3[013-9]|5)|3[45]|43[013-79]|5(?:3[1-8]|4[1-7]|5)|6(?:3[0-35-9]|[4-6]))|2(?:1(?:3[178]|[45])|[24-689]|3[35]|7[457]))|7(?:14|23)4[0-8]|71(?:33|45)[1-79]"], "8 ($1)", 1], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "8 ($1)", 1], ["(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[349]|8(?:[02-7]|1[1-8])"], "8 ($1)", 1], ["(\\d{4})(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["8"], "8 ($1)"]], "8", 0, 0, 0, 0, 0, [["336(?:[013-9]\\d|2[013-9])\\d{5}|(?:3(?:0[12]|4[1-35-79]|5[1-3]|65|8[1-58]|9[0145])|4(?:01|1[1356]|2[13467]|7[1-5]|8[1-7]|9[1-689])|8(?:1[1-8]|2[01]|3[13-6]|4[0-8]|5[15-7]|6[0-35-79]|7[1-37-9]))\\d{7}", [10]], ["9\\d{9}", [10]], ["8(?:0[04]|108\\d{3})\\d{7}"], ["80[39]\\d{7}", [10]], ["808\\d{7}", [10]]], "8~10"], RW: ["250", "00", "(?:06|[27]\\d\\d|[89]00)\\d{6}", [8, 9], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[7-9]"], "0$1"]], "0"], SA: ["966", "00", "(?:[15]\\d|800|92)\\d{7}", [9, 10], [["(\\d{4})(\\d{5})", "$1 $2", ["9"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]]], "0"], SB: ["677", "0[01]", "[6-9]\\d{6}|[1-6]\\d{4}", [5, 7], [["(\\d{2})(\\d{5})", "$1 $2", ["6[89]|7|8[4-9]|9(?:[1-8]|9[0-8])"]]]], SC: ["248", "010|0[0-2]", "(?:[2489]\\d|64)\\d{5}", [7], [["(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[246]|9[57]"]]], 0, 0, 0, 0, 0, 0, 0, "00"], SD: ["249", "00", "[19]\\d{8}", [9], [["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[19]"], "0$1"]], "0"], SE: ["46", "00", "(?:[26]\\d\\d|9)\\d{9}|[1-9]\\d{8}|[1-689]\\d{7}|[1-4689]\\d{6}|2\\d{5}", [6, 7, 8, 9, 10, 12], [["(\\d{2})(\\d{2,3})(\\d{2})", "$1-$2 $3", ["20"], "0$1", 0, "$1 $2 $3"], ["(\\d{3})(\\d{4})", "$1-$2", ["9(?:00|39|44|9)"], "0$1", 0, "$1 $2"], ["(\\d{2})(\\d{3})(\\d{2})", "$1-$2 $3", ["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"], "0$1", 0, "$1 $2 $3"], ["(\\d)(\\d{2,3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["8"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{3})(\\d{2,3})(\\d{2})", "$1-$2 $3", ["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[125689]|4[02-57]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"], "0$1", 0, "$1 $2 $3"], ["(\\d{3})(\\d{2,3})(\\d{3})", "$1-$2 $3", ["9(?:00|39|44)"], "0$1", 0, "$1 $2 $3"], ["(\\d{2})(\\d{2,3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["1[13689]|2[0136]|3[1356]|4[0246]|54|6[03]|90[1-9]"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["10|7"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d)(\\d{3})(\\d{3})(\\d{2})", "$1-$2 $3 $4", ["8"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["[13-5]|2(?:[247-9]|5[0138])|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{3})(\\d{2})(\\d{2})(\\d{3})", "$1-$2 $3 $4", ["9"], "0$1", 0, "$1 $2 $3 $4"], ["(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1-$2 $3 $4 $5", ["[26]"], "0$1", 0, "$1 $2 $3 $4 $5"]], "0"], SG: ["65", "0[0-3]\\d", "(?:(?:1\\d|8)\\d\\d|7000)\\d{7}|[3689]\\d{7}", [8, 10, 11], [["(\\d{4})(\\d{4})", "$1 $2", ["[369]|8(?:0[1-9]|[1-9])"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]], ["(\\d{4})(\\d{4})(\\d{3})", "$1 $2 $3", ["7"]], ["(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]]]], SH: ["290", "00", "(?:[256]\\d|8)\\d{3}", [4, 5], 0, 0, 0, 0, 0, 0, "[256]"], SI: ["386", "00|10(?:22|66|88|99)", "[1-7]\\d{7}|8\\d{4,7}|90\\d{4,6}", [5, 6, 7, 8], [["(\\d{2})(\\d{3,6})", "$1 $2", ["8[09]|9"], "0$1"], ["(\\d{3})(\\d{5})", "$1 $2", ["59|8"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[37][01]|4[0139]|51|6"], "0$1"], ["(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[1-57]"], "(0$1)"]], "0", 0, 0, 0, 0, 0, 0, "00"], SJ: ["47", "00", "0\\d{4}|(?:[489]\\d|79)\\d{6}", [5, 8], 0, 0, 0, 0, 0, 0, "79"], SK: ["421", "00", "[2-689]\\d{8}|[2-59]\\d{6}|[2-5]\\d{5}", [6, 7, 9], [["(\\d)(\\d{2})(\\d{3,4})", "$1 $2 $3", ["21"], "0$1"], ["(\\d{2})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["[3-5][1-8]1", "[3-5][1-8]1[67]"], "0$1"], ["(\\d)(\\d{3})(\\d{3})(\\d{2})", "$1/$2 $3 $4", ["2"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[689]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1/$2 $3 $4", ["[3-5]"], "0$1"]], "0"], SL: ["232", "00", "(?:[237-9]\\d|66)\\d{6}", [8], [["(\\d{2})(\\d{6})", "$1 $2", ["[236-9]"], "(0$1)"]], "0"], SM: ["378", "00", "(?:0549|[5-7]\\d)\\d{6}", [8, 10], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-7]"]], ["(\\d{4})(\\d{6})", "$1 $2", ["0"]]], 0, 0, "([89]\\d{5})$", "0549$1"], SN: ["221", "00", "(?:[378]\\d|93)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[379]"]]]], SO: ["252", "00", "[346-9]\\d{8}|[12679]\\d{7}|[1-5]\\d{6}|[1348]\\d{5}", [6, 7, 8, 9], [["(\\d{2})(\\d{4})", "$1 $2", ["8[125]"]], ["(\\d{6})", "$1", ["[134]"]], ["(\\d)(\\d{6})", "$1 $2", ["[15]|2[0-79]|3[0-46-8]|4[0-7]"]], ["(\\d)(\\d{7})", "$1 $2", ["(?:2|90)4|[67]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[348]|64|79|90"]], ["(\\d{2})(\\d{5,7})", "$1 $2", ["1|28|6[0-35-9]|7[67]|9[2-9]"]]], "0"], SR: ["597", "00", "(?:[2-5]|[6-8]\\d|90)\\d{5}", [6, 7], [["(\\d{2})(\\d{2})(\\d{2})", "$1-$2-$3", ["56"]], ["(\\d{3})(\\d{3})", "$1-$2", ["[2-5]"]], ["(\\d{3})(\\d{4})", "$1-$2", ["[6-9]"]]]], SS: ["211", "00", "[19]\\d{8}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[19]"], "0$1"]], "0"], ST: ["239", "00", "(?:22|9\\d)\\d{5}", [7], [["(\\d{3})(\\d{4})", "$1 $2", ["[29]"]]]], SV: ["503", "00", "[267]\\d{7}|(?:80\\d|900)\\d{4}(?:\\d{4})?", [7, 8, 11], [["(\\d{3})(\\d{4})", "$1 $2", ["[89]"]], ["(\\d{4})(\\d{4})", "$1 $2", ["[267]"]], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["[89]"]]]], SX: ["1", "011", "7215\\d{6}|(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "(5\\d{6})$|1", "721$1", 0, "721"], SY: ["963", "00", "[1-359]\\d{8}|[1-5]\\d{7}", [8, 9], [["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-4]|5[1-3]"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[59]"], "0$1", 1]], "0"], SZ: ["268", "00", "0800\\d{4}|(?:[237]\\d|900)\\d{6}", [8, 9], [["(\\d{4})(\\d{4})", "$1 $2", ["[0237]"]], ["(\\d{5})(\\d{4})", "$1 $2", ["9"]]]], TA: ["290", "00", "8\\d{3}", [4], 0, 0, 0, 0, 0, 0, "8"], TC: ["1", "011", "(?:[58]\\d\\d|649|900)\\d{7}", [10], 0, "1", 0, "([2-479]\\d{6})$|1", "649$1", 0, "649"], TD: ["235", "00|16", "(?:22|30|[689]\\d|77)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[236-9]"]]], 0, 0, 0, 0, 0, 0, 0, "00"], TG: ["228", "00", "[279]\\d{7}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[279]"]]]], TH: ["66", "00[1-9]", "(?:001800|[2-57]|[689]\\d)\\d{7}|1\\d{7,9}", [8, 9, 10, 13], [["(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[13-9]"], "0$1"], ["(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]]], "0"], TJ: ["992", "810", "[0-57-9]\\d{8}", [9], [["(\\d{6})(\\d)(\\d{2})", "$1 $2 $3", ["331", "3317"]], ["(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["44[02-479]|[34]7"]], ["(\\d{4})(\\d)(\\d{4})", "$1 $2 $3", ["3(?:[1245]|3[12])"]], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[0-57-9]"]]], 0, 0, 0, 0, 0, 0, 0, "8~10"], TK: ["690", "00", "[2-47]\\d{3,6}", [4, 5, 6, 7]], TL: ["670", "00", "7\\d{7}|(?:[2-47]\\d|[89]0)\\d{5}", [7, 8], [["(\\d{3})(\\d{4})", "$1 $2", ["[2-489]|70"]], ["(\\d{4})(\\d{4})", "$1 $2", ["7"]]]], TM: ["993", "810", "(?:[1-6]\\d|71)\\d{6}", [8], [["(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["12"], "(8 $1)"], ["(\\d{3})(\\d)(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[1-5]"], "(8 $1)"], ["(\\d{2})(\\d{6})", "$1 $2", ["[67]"], "8 $1"]], "8", 0, 0, 0, 0, 0, 0, "8~10"], TN: ["216", "00", "[2-57-9]\\d{7}", [8], [["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-57-9]"]]]], TO: ["676", "00", "(?:0800|(?:[5-8]\\d\\d|999)\\d)\\d{3}|[2-8]\\d{4}", [5, 7], [["(\\d{2})(\\d{3})", "$1-$2", ["[2-4]|50|6[09]|7[0-24-69]|8[05]"]], ["(\\d{4})(\\d{3})", "$1 $2", ["0"]], ["(\\d{3})(\\d{4})", "$1 $2", ["[5-9]"]]]], TR: ["90", "00", "4\\d{6}|8\\d{11,12}|(?:[2-58]\\d\\d|900)\\d{7}", [7, 10, 12, 13], [["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["512|8[01589]|90"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["5(?:[0-59]|61)", "5(?:[0-59]|61[06])", "5(?:[0-59]|61[06]1)"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24][1-8]|3[1-9]"], "(0$1)", 1], ["(\\d{3})(\\d{3})(\\d{6,7})", "$1 $2 $3", ["80"], "0$1", 1]], "0"], TT: ["1", "011", "(?:[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-46-8]\\d{6})$|1", "868$1", 0, "868"], TV: ["688", "00", "(?:2|7\\d\\d|90)\\d{4}", [5, 6, 7], [["(\\d{2})(\\d{3})", "$1 $2", ["2"]], ["(\\d{2})(\\d{4})", "$1 $2", ["90"]], ["(\\d{2})(\\d{5})", "$1 $2", ["7"]]]], TW: ["886", "0(?:0[25-79]|19)", "[2-689]\\d{8}|7\\d{9,10}|[2-8]\\d{7}|2\\d{6}", [7, 8, 9, 10, 11], [["(\\d{2})(\\d)(\\d{4})", "$1 $2 $3", ["202"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[258]0"], "0$1"], ["(\\d)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["[23568]|4(?:0[02-48]|[1-47-9])|7[1-9]", "[23568]|4(?:0[2-48]|[1-47-9])|(?:400|7)[1-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[49]"], "0$1"], ["(\\d{2})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["7"], "0$1"]], "0", 0, 0, 0, 0, 0, 0, 0, "#"], TZ: ["255", "00[056]", "(?:[25-8]\\d|41|90)\\d{7}", [9], [["(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[24]"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["5"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[67]"], "0$1"]], "0"], UA: ["380", "00", "[89]\\d{9}|[3-9]\\d{8}", [9, 10], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6[12][29]|(?:3[1-8]|4[136-8]|5[12457]|6[49])2|(?:56|65)[24]", "6[12][29]|(?:35|4[1378]|5[12457]|6[49])2|(?:56|65)[24]|(?:3[1-46-8]|46)2[013-9]"], "0$1"], ["(\\d{4})(\\d{5})", "$1 $2", ["3[1-8]|4(?:[1367]|[45][6-9]|8[4-6])|5(?:[1-5]|6[0135689]|7[4-6])|6(?:[12][3-7]|[459])", "3[1-8]|4(?:[1367]|[45][6-9]|8[4-6])|5(?:[1-5]|6(?:[015689]|3[02389])|7[4-6])|6(?:[12][3-7]|[459])"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[3-7]|89|9[1-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[89]"], "0$1"]], "0", 0, 0, 0, 0, 0, 0, "0~0"], UG: ["256", "00[057]", "800\\d{6}|(?:[29]0|[347]\\d)\\d{7}", [9], [["(\\d{4})(\\d{5})", "$1 $2", ["202", "2024"], "0$1"], ["(\\d{3})(\\d{6})", "$1 $2", ["[27-9]|4(?:6[45]|[7-9])"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["[34]"], "0$1"]], "0"], US: ["1", "011", "[2-9]\\d{9}|3\\d{6}", [10], [["(\\d{3})(\\d{4})", "$1-$2", ["310"], 0, 1], ["(\\d{3})(\\d{3})(\\d{4})", "($1) $2-$3", ["[2-9]"], 0, 1, "$1-$2-$3"]], "1", 0, 0, 0, 0, 0, [["(?:3052(?:0[0-8]|[1-9]\\d)|5056(?:[0-35-9]\\d|4[0-68]))\\d{4}|(?:2742|305[3-9]|(?:472|983)[2-47-9]|505[2-57-9])\\d{6}|(?:2(?:0[1-35-9]|1[02-9]|2[03-57-9]|3[1459]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-47-9]|1[02-9]|2[0135-79]|3[0-24679]|4[167]|5[0-2]|6[01349]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[023578]|58|6[349]|7[0589]|8[04])|5(?:0[1-47-9]|1[0235-8]|20|3[0149]|4[01]|5[179]|6[1-47]|7[0-5]|8[0256])|6(?:0[1-35-9]|1[024-9]|2[03689]|3[016]|4[0156]|5[01679]|6[0-279]|78|8[0-29])|7(?:0[1-46-8]|1[2-9]|2[04-8]|3[0-247]|4[0378]|5[47]|6[02359]|7[0-59]|8[156])|8(?:0[1-68]|1[02-8]|2[0168]|3[0-2589]|4[03578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[01357-9]|5[12469]|7[0-3589]|8[04-69]))[2-9]\\d{6}"], [""], ["8(?:00|33|44|55|66|77|88)[2-9]\\d{6}"], ["900[2-9]\\d{6}"], ["52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}"], 0, 0, 0, ["305209\\d{4}"]]], UY: ["598", "0(?:0|1[3-9]\\d)", "0004\\d{2,9}|[1249]\\d{7}|2\\d{3,4}|(?:[49]\\d|80)\\d{5}", [4, 5, 6, 7, 8, 9, 10, 11, 12, 13], [["(\\d{4,5})", "$1", ["21"]], ["(\\d{3})(\\d{3,4})", "$1 $2", ["0"]], ["(\\d{3})(\\d{4})", "$1 $2", ["[49]0|8"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1"], ["(\\d{4})(\\d{4})", "$1 $2", ["[124]"]], ["(\\d{3})(\\d{3})(\\d{2,4})", "$1 $2 $3", ["0"]], ["(\\d{3})(\\d{3})(\\d{3})(\\d{2,4})", "$1 $2 $3 $4", ["0"]]], "0", 0, 0, 0, 0, 0, 0, "00", " int. "], UZ: ["998", "00", "(?:20|33|[5-9]\\d)\\d{7}", [9], [["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[235-9]"]]]], VA: ["39", "00", "0\\d{5,10}|3[0-8]\\d{7,10}|55\\d{8}|8\\d{5}(?:\\d{2,4})?|(?:1\\d|39)\\d{7,8}", [6, 7, 8, 9, 10, 11, 12], 0, 0, 0, 0, 0, 0, "06698"], VC: ["1", "011", "(?:[58]\\d\\d|784|900)\\d{7}", [10], 0, "1", 0, "([2-7]\\d{6})$|1", "784$1", 0, "784"], VE: ["58", "00", "[68]00\\d{7}|(?:[24]\\d|[59]0)\\d{8}", [10], [["(\\d{3})(\\d{7})", "$1-$2", ["[24-689]"], "0$1"]], "0"], VG: ["1", "011", "(?:284|[58]\\d\\d|900)\\d{7}", [10], 0, "1", 0, "([2-578]\\d{6})$|1", "284$1", 0, "284"], VI: ["1", "011", "[58]\\d{9}|(?:34|90)0\\d{7}", [10], 0, "1", 0, "([2-9]\\d{6})$|1", "340$1", 0, "340"], VN: ["84", "00", "[12]\\d{9}|[135-9]\\d{8}|[16]\\d{7}|[16-8]\\d{6}", [7, 8, 9, 10], [["(\\d{2})(\\d{5})", "$1 $2", ["80"], "0$1", 1], ["(\\d{4})(\\d{4,6})", "$1 $2", ["1"], 0, 1], ["(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["6"], "0$1", 1], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[357-9]"], "0$1", 1], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["2[48]"], "0$1", 1], ["(\\d{3})(\\d{4})(\\d{3})", "$1 $2 $3", ["2"], "0$1", 1]], "0"], VU: ["678", "00", "[57-9]\\d{6}|(?:[238]\\d|48)\\d{3}", [5, 7], [["(\\d{3})(\\d{4})", "$1 $2", ["[57-9]"]]]], WF: ["681", "00", "(?:40|72|8\\d{4})\\d{4}|[89]\\d{5}", [6, 9], [["(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["[47-9]"]], ["(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]]]], WS: ["685", "0", "(?:[2-6]|8\\d{5})\\d{4}|[78]\\d{6}|[68]\\d{5}", [5, 6, 7, 10], [["(\\d{5})", "$1", ["[2-5]|6[1-9]"]], ["(\\d{3})(\\d{3,7})", "$1 $2", ["[68]"]], ["(\\d{2})(\\d{5})", "$1 $2", ["7"]]]], XK: ["383", "00", "2\\d{7,8}|3\\d{7,11}|(?:4\\d\\d|[89]00)\\d{5}", [8, 9, 10, 11, 12], [["(\\d{3})(\\d{5})", "$1 $2", ["[89]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-4]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["2|39"], "0$1"], ["(\\d{2})(\\d{7,10})", "$1 $2", ["3"], "0$1"]], "0"], YE: ["967", "00", "(?:1|7\\d)\\d{7}|[1-7]\\d{6}", [7, 8, 9], [["(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-6]|7(?:[24-6]|8[0-7])"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["7"], "0$1"]], "0"], YT: ["262", "00", "7093\\d{5}|(?:80|9\\d)\\d{7}|(?:26|63)9\\d{6}", [9], 0, "0", 0, 0, 0, 0, 0, [["269(?:0[0-467]|15|5[0-4]|6\\d|[78]0)\\d{4}"], ["(?:639(?:0[0-79]|1[019]|[267]\\d|3[09]|40|5[05-9]|9[04-79])|7093[5-7])\\d{4}"], ["80\\d{7}"], 0, 0, 0, 0, 0, ["9(?:(?:39|47)8[01]|769\\d)\\d{4}"]]], ZA: ["27", "00", "[1-79]\\d{8}|8\\d{4,9}", [5, 6, 7, 8, 9, 10], [["(\\d{2})(\\d{3,4})", "$1 $2", ["8[1-4]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["8[1-4]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["860"], "0$1"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-9]"], "0$1"], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"]], "0"], ZM: ["260", "00", "800\\d{6}|(?:21|[579]\\d|63)\\d{7}", [9], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[28]"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["[579]"], "0$1"]], "0"], ZW: ["263", "00", "2(?:[0-57-9]\\d{6,8}|6[0-24-9]\\d{6,7})|[38]\\d{9}|[35-8]\\d{8}|[3-6]\\d{7}|[1-689]\\d{6}|[1-3569]\\d{5}|[1356]\\d{4}", [5, 6, 7, 8, 9, 10], [["(\\d{3})(\\d{3,5})", "$1 $2", ["2(?:0[45]|2[278]|[49]8)|3(?:[09]8|17)|6(?:[29]8|37|75)|[23][78]|(?:33|5[15]|6[68])[78]"], "0$1"], ["(\\d)(\\d{3})(\\d{2,4})", "$1 $2 $3", ["[49]"], "0$1"], ["(\\d{3})(\\d{4})", "$1 $2", ["80"], "0$1"], ["(\\d{2})(\\d{7})", "$1 $2", ["24|8[13-59]|(?:2[05-79]|39|5[45]|6[15-8])2", "2(?:02[014]|4|[56]20|[79]2)|392|5(?:42|525)|6(?:[16-8]21|52[013])|8[13-59]"], "(0$1)"], ["(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"], ["(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2(?:1[39]|2[0157]|[378]|[56][14])|3(?:12|29)", "2(?:1[39]|2[0157]|[378]|[56][14])|3(?:123|29)"], "0$1"], ["(\\d{4})(\\d{6})", "$1 $2", ["8"], "0$1"], ["(\\d{2})(\\d{3,5})", "$1 $2", ["1|2(?:0[0-36-9]|12|29|[56])|3(?:1[0-689]|[24-6])|5(?:[0236-9]|1[2-4])|6(?:[013-59]|7[0-46-9])|(?:33|55|6[68])[0-69]|(?:29|3[09]|62)[0-79]"], "0$1"], ["(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["29[013-9]|39|54"], "0$1"], ["(\\d{4})(\\d{3,5})", "$1 $2", ["(?:25|54)8", "258|5483"], "0$1"]], "0"] }, nonGeographic: { 800: ["800", 0, "(?:00|[1-9]\\d)\\d{6}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["\\d"]]], 0, 0, 0, 0, 0, 0, [0, 0, ["(?:00|[1-9]\\d)\\d{6}"]]], 808: ["808", 0, "[1-9]\\d{7}", [8], [["(\\d{4})(\\d{4})", "$1 $2", ["[1-9]"]]], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, ["[1-9]\\d{7}"]]], 870: ["870", 0, "7\\d{11}|[235-7]\\d{8}", [9, 12], [["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235-7]"]]], 0, 0, 0, 0, 0, 0, [0, ["(?:[356]|774[45])\\d{8}|7[6-8]\\d{7}"], 0, 0, 0, 0, 0, 0, ["2\\d{8}", [9]]]], 878: ["878", 0, "10\\d{10}", [12], [["(\\d{2})(\\d{5})(\\d{5})", "$1 $2 $3", ["1"]]], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, 0, 0, ["10\\d{10}"]]], 881: ["881", 0, "6\\d{9}|[0-36-9]\\d{8}", [9, 10], [["(\\d)(\\d{3})(\\d{5})", "$1 $2 $3", ["[0-37-9]"]], ["(\\d)(\\d{3})(\\d{5,6})", "$1 $2 $3", ["6"]]], 0, 0, 0, 0, 0, 0, [0, ["6\\d{9}|[0-36-9]\\d{8}"]]], 882: ["882", 0, "[13]\\d{6}(?:\\d{2,5})?|[19]\\d{7}|(?:[25]\\d\\d|4)\\d{7}(?:\\d{2})?", [7, 8, 9, 10, 11, 12], [["(\\d{2})(\\d{5})", "$1 $2", ["16|342"]], ["(\\d{2})(\\d{6})", "$1 $2", ["49"]], ["(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["1[36]|9"]], ["(\\d{2})(\\d{4})(\\d{3})", "$1 $2 $3", ["3[23]"]], ["(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["16"]], ["(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["10|23|3(?:[15]|4[57])|4|51"]], ["(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["34"]], ["(\\d{2})(\\d{4,5})(\\d{5})", "$1 $2 $3", ["[1-35]"]]], 0, 0, 0, 0, 0, 0, [0, ["342\\d{4}|(?:337|49)\\d{6}|(?:3(?:2|47|7\\d{3})|50\\d{3})\\d{7}", [7, 8, 9, 10, 12]], 0, 0, 0, ["348[57]\\d{7}", [11]], 0, 0, ["1(?:3(?:0[0347]|[13][0139]|2[035]|4[013568]|6[0459]|7[06]|8[15-8]|9[0689])\\d{4}|6\\d{5,10})|(?:345\\d|9[89])\\d{6}|(?:10|2(?:3|85\\d)|3(?:[15]|[69]\\d\\d)|4[15-8]|51)\\d{8}"]]], 883: ["883", 0, "(?:[1-4]\\d|51)\\d{6,10}", [8, 9, 10, 11, 12], [["(\\d{3})(\\d{3})(\\d{2,8})", "$1 $2 $3", ["[14]|2[24-689]|3[02-689]|51[24-9]"]], ["(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["510"]], ["(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["21"]], ["(\\d{4})(\\d{4})(\\d{4})", "$1 $2 $3", ["51[13]"]], ["(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["[235]"]]], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, 0, 0, ["(?:2(?:00\\d\\d|10)|(?:370[1-9]|51\\d0)\\d)\\d{7}|51(?:00\\d{5}|[24-9]0\\d{4,7})|(?:1[0-79]|2[24-689]|3[02-689]|4[0-4])0\\d{5,9}"]]], 888: ["888", 0, "\\d{11}", [11], [["(\\d{3})(\\d{3})(\\d{5})", "$1 $2 $3"]], 0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0, 0, ["\\d{11}"]]], 979: ["979", 0, "[1359]\\d{8}", [9], [["(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["[1359]"]]], 0, 0, 0, 0, 0, 0, [0, 0, 0, ["[1359]\\d{8}"]]] } };
function tg(e, t) {
  var n = Array.prototype.slice.call(t);
  return n.push(_C), e.apply(this, n);
}
function rd(e, t) {
  e = e.split("-"), t = t.split("-");
  for (var n = e[0].split("."), a = t[0].split("."), r = 0; r < 3; r++) {
    var o = Number(n[r]), i = Number(a[r]);
    if (o > i) return 1;
    if (i > o) return -1;
    if (!isNaN(o) && isNaN(i)) return 1;
    if (isNaN(o) && !isNaN(i)) return -1;
  }
  return e[1] && t[1] ? e[1] > t[1] ? 1 : e[1] < t[1] ? -1 : 0 : !e[1] && t[1] ? 1 : e[1] && !t[1] ? -1 : 0;
}
var NC = {}.constructor;
function na(e) {
  return e != null && e.constructor === NC;
}
function ua(e) {
  "@babel/helpers - typeof";
  return ua = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ua(e);
}
function di(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function EC(e, t) {
  for (var n = 0; n < t.length; n++) {
    var a = t[n];
    a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, RC(a.key), a);
  }
}
function ui(e, t, n) {
  return t && EC(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function RC(e) {
  var t = PC(e, "string");
  return ua(t) == "symbol" ? t : t + "";
}
function PC(e, t) {
  if (ua(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (ua(a) != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var kC = "1.2.0", TC = "1.7.35", od = " ext. ", AC = /^\d+$/, Ze = /* @__PURE__ */ (function() {
  function e(t) {
    di(this, e), ng(t), this.metadata = t, ag.call(this, t);
  }
  return ui(e, [{
    key: "getCountries",
    value: function() {
      return Object.keys(this.metadata.countries).filter(function(n) {
        return n !== "001";
      });
    }
  }, {
    key: "getCountryMetadata",
    value: function(n) {
      return this.metadata.countries[n];
    }
  }, {
    key: "nonGeographic",
    value: function() {
      if (!(this.v1 || this.v2 || this.v3))
        return this.metadata.nonGeographic || this.metadata.nonGeographical;
    }
  }, {
    key: "hasCountry",
    value: function(n) {
      return this.getCountryMetadata(n) !== void 0;
    }
  }, {
    key: "hasCallingCode",
    value: function(n) {
      if (this.getCountryCodesForCallingCode(n))
        return !0;
      if (this.nonGeographic()) {
        if (this.nonGeographic()[n])
          return !0;
      } else {
        var a = this.countryCallingCodes()[n];
        if (a && a.length === 1 && a[0] === "001")
          return !0;
      }
    }
  }, {
    key: "isNonGeographicCallingCode",
    value: function(n) {
      return this.nonGeographic() ? !!this.nonGeographic()[n] : !this.getCountryCodesForCallingCode(n);
    }
    // Deprecated.
  }, {
    key: "country",
    value: function(n) {
      return this.selectNumberingPlan(n);
    }
  }, {
    key: "selectNumberingPlan",
    value: function(n, a) {
      if (n && AC.test(n) && (a = n, n = null), n && n !== "001") {
        if (!this.hasCountry(n))
          throw new Error("Unknown country: ".concat(n));
        this.numberingPlan = new id(this.getCountryMetadata(n), this);
      } else if (a) {
        if (!this.hasCallingCode(a))
          throw new Error("Unknown calling code: ".concat(a));
        this.numberingPlan = new id(this.getNumberingPlanMetadata(a), this);
      } else
        this.numberingPlan = void 0;
      return this;
    }
  }, {
    key: "getCountryCodesForCallingCode",
    value: function(n) {
      var a = this.countryCallingCodes()[n];
      if (a)
        return a.length === 1 && a[0].length === 3 ? void 0 : a;
    }
  }, {
    key: "getCountryCodeForCallingCode",
    value: function(n) {
      var a = this.getCountryCodesForCallingCode(n);
      if (a)
        return a[0];
    }
  }, {
    key: "getNumberingPlanMetadata",
    value: function(n) {
      var a = this.getCountryCodeForCallingCode(n);
      if (a)
        return this.getCountryMetadata(a);
      if (this.nonGeographic()) {
        var r = this.nonGeographic()[n];
        if (r)
          return r;
      } else {
        var o = this.countryCallingCodes()[n];
        if (o && o.length === 1 && o[0] === "001")
          return this.metadata.countries["001"];
      }
    }
    // Deprecated.
  }, {
    key: "countryCallingCode",
    value: function() {
      return this.numberingPlan.callingCode();
    }
    // Deprecated.
  }, {
    key: "IDDPrefix",
    value: function() {
      return this.numberingPlan.IDDPrefix();
    }
    // Deprecated.
  }, {
    key: "defaultIDDPrefix",
    value: function() {
      return this.numberingPlan.defaultIDDPrefix();
    }
    // Deprecated.
  }, {
    key: "nationalNumberPattern",
    value: function() {
      return this.numberingPlan.nationalNumberPattern();
    }
    // Deprecated.
  }, {
    key: "possibleLengths",
    value: function() {
      return this.numberingPlan.possibleLengths();
    }
    // Deprecated.
  }, {
    key: "formats",
    value: function() {
      return this.numberingPlan.formats();
    }
    // Deprecated.
  }, {
    key: "nationalPrefixForParsing",
    value: function() {
      return this.numberingPlan.nationalPrefixForParsing();
    }
    // Deprecated.
  }, {
    key: "nationalPrefixTransformRule",
    value: function() {
      return this.numberingPlan.nationalPrefixTransformRule();
    }
    // Deprecated.
  }, {
    key: "leadingDigits",
    value: function() {
      return this.numberingPlan.leadingDigits();
    }
    // Deprecated.
  }, {
    key: "hasTypes",
    value: function() {
      return this.numberingPlan.hasTypes();
    }
    // Deprecated.
  }, {
    key: "type",
    value: function(n) {
      return this.numberingPlan.type(n);
    }
    // Deprecated.
  }, {
    key: "ext",
    value: function() {
      return this.numberingPlan.ext();
    }
  }, {
    key: "countryCallingCodes",
    value: function() {
      return this.v1 ? this.metadata.country_phone_code_to_countries : this.metadata.country_calling_codes;
    }
    // Deprecated.
  }, {
    key: "chooseCountryByCountryCallingCode",
    value: function(n) {
      return this.selectNumberingPlan(n);
    }
  }, {
    key: "hasSelectedNumberingPlan",
    value: function() {
      return this.numberingPlan !== void 0;
    }
  }]);
})(), id = /* @__PURE__ */ (function() {
  function e(t, n) {
    di(this, e), this.globalMetadataObject = n, this.metadata = t, ag.call(this, n.metadata);
  }
  return ui(e, [{
    key: "callingCode",
    value: function() {
      return this.metadata[0];
    }
    // Formatting information for regions which share
    // a country calling code is contained by only one region
    // for performance reasons. For example, for NANPA region
    // ("North American Numbering Plan Administration",
    //  which includes USA, Canada, Cayman Islands, Bahamas, etc)
    // it will be contained in the metadata for `US`.
  }, {
    key: "getDefaultCountryMetadataForRegion",
    value: function() {
      return this.globalMetadataObject.getNumberingPlanMetadata(this.callingCode());
    }
    // Is always present.
  }, {
    key: "IDDPrefix",
    value: function() {
      if (!(this.v1 || this.v2))
        return this.metadata[1];
    }
    // Is only present when a country supports multiple IDD prefixes.
  }, {
    key: "defaultIDDPrefix",
    value: function() {
      if (!(this.v1 || this.v2))
        return this.metadata[12];
    }
  }, {
    key: "nationalNumberPattern",
    value: function() {
      return this.v1 || this.v2 ? this.metadata[1] : this.metadata[2];
    }
    // "possible length" data is always present in Google's metadata.
  }, {
    key: "possibleLengths",
    value: function() {
      if (!this.v1)
        return this.metadata[this.v2 ? 2 : 3];
    }
  }, {
    key: "_getFormats",
    value: function(n) {
      return n[this.v1 ? 2 : this.v2 ? 3 : 4];
    }
    // For countries of the same region (e.g. NANPA)
    // formats are all stored in the "main" country for that region.
    // E.g. "RU" and "KZ", "US" and "CA".
  }, {
    key: "formats",
    value: function() {
      var n = this, a = this._getFormats(this.metadata) || this._getFormats(this.getDefaultCountryMetadataForRegion()) || [];
      return a.map(function(r) {
        return new jC(r, n);
      });
    }
  }, {
    key: "nationalPrefix",
    value: function() {
      return this.metadata[this.v1 ? 3 : this.v2 ? 4 : 5];
    }
  }, {
    key: "_getNationalPrefixFormattingRule",
    value: function(n) {
      return n[this.v1 ? 4 : this.v2 ? 5 : 6];
    }
    // For countries of the same region (e.g. NANPA)
    // national prefix formatting rule is stored in the "main" country for that region.
    // E.g. "RU" and "KZ", "US" and "CA".
  }, {
    key: "nationalPrefixFormattingRule",
    value: function() {
      return this._getNationalPrefixFormattingRule(this.metadata) || this._getNationalPrefixFormattingRule(this.getDefaultCountryMetadataForRegion());
    }
  }, {
    key: "_nationalPrefixForParsing",
    value: function() {
      return this.metadata[this.v1 ? 5 : this.v2 ? 6 : 7];
    }
  }, {
    key: "nationalPrefixForParsing",
    value: function() {
      return this._nationalPrefixForParsing() || this.nationalPrefix();
    }
  }, {
    key: "nationalPrefixTransformRule",
    value: function() {
      return this.metadata[this.v1 ? 6 : this.v2 ? 7 : 8];
    }
  }, {
    key: "_getNationalPrefixIsOptionalWhenFormatting",
    value: function() {
      return !!this.metadata[this.v1 ? 7 : this.v2 ? 8 : 9];
    }
    // For countries of the same region (e.g. NANPA)
    // "national prefix is optional when formatting" flag is
    // stored in the "main" country for that region.
    // E.g. "RU" and "KZ", "US" and "CA".
  }, {
    key: "nationalPrefixIsOptionalWhenFormattingInNationalFormat",
    value: function() {
      return this._getNationalPrefixIsOptionalWhenFormatting(this.metadata) || this._getNationalPrefixIsOptionalWhenFormatting(this.getDefaultCountryMetadataForRegion());
    }
  }, {
    key: "leadingDigits",
    value: function() {
      return this.metadata[this.v1 ? 8 : this.v2 ? 9 : 10];
    }
  }, {
    key: "types",
    value: function() {
      return this.metadata[this.v1 ? 9 : this.v2 ? 10 : 11];
    }
  }, {
    key: "hasTypes",
    value: function() {
      return this.types() && this.types().length === 0 ? !1 : !!this.types();
    }
  }, {
    key: "type",
    value: function(n) {
      if (this.hasTypes() && sd(this.types(), n))
        return new OC(sd(this.types(), n), this);
    }
  }, {
    key: "ext",
    value: function() {
      return this.v1 || this.v2 ? od : this.metadata[13] || od;
    }
  }]);
})(), jC = /* @__PURE__ */ (function() {
  function e(t, n) {
    di(this, e), this._format = t, this.metadata = n;
  }
  return ui(e, [{
    key: "pattern",
    value: function() {
      return this._format[0];
    }
  }, {
    key: "format",
    value: function() {
      return this._format[1];
    }
  }, {
    key: "leadingDigitsPatterns",
    value: function() {
      return this._format[2] || [];
    }
  }, {
    key: "nationalPrefixFormattingRule",
    value: function() {
      return this._format[3] || this.metadata.nationalPrefixFormattingRule();
    }
  }, {
    key: "nationalPrefixIsOptionalWhenFormattingInNationalFormat",
    value: function() {
      return !!this._format[4] || this.metadata.nationalPrefixIsOptionalWhenFormattingInNationalFormat();
    }
  }, {
    key: "nationalPrefixIsMandatoryWhenFormattingInNationalFormat",
    value: function() {
      return this.usesNationalPrefix() && !this.nationalPrefixIsOptionalWhenFormattingInNationalFormat();
    }
    // Checks whether national prefix formatting rule contains national prefix.
  }, {
    key: "usesNationalPrefix",
    value: function() {
      return !!(this.nationalPrefixFormattingRule() && // Check that national prefix formatting rule is not a "dummy" one.
      !MC.test(this.nationalPrefixFormattingRule()));
    }
  }, {
    key: "internationalFormat",
    value: function() {
      return this._format[5] || this.format();
    }
  }]);
})(), MC = /^\(?\$1\)?$/, OC = /* @__PURE__ */ (function() {
  function e(t, n) {
    di(this, e), this.type = t, this.metadata = n;
  }
  return ui(e, [{
    key: "pattern",
    value: function() {
      return this.metadata.v1 ? this.type : this.type[0];
    }
  }, {
    key: "possibleLengths",
    value: function() {
      if (!this.metadata.v1)
        return this.type[1] || this.metadata.possibleLengths();
    }
  }]);
})();
function sd(e, t) {
  switch (t) {
    case "FIXED_LINE":
      return e[0];
    case "MOBILE":
      return e[1];
    case "TOLL_FREE":
      return e[2];
    case "PREMIUM_RATE":
      return e[3];
    case "PERSONAL_NUMBER":
      return e[4];
    case "VOICEMAIL":
      return e[5];
    case "UAN":
      return e[6];
    case "PAGER":
      return e[7];
    case "VOIP":
      return e[8];
    case "SHARED_COST":
      return e[9];
  }
}
function ng(e) {
  if (!e)
    throw new Error("[libphonenumber-js] `metadata` argument not passed. Check your arguments.");
  if (!na(e) || !na(e.countries))
    throw new Error("[libphonenumber-js] `metadata` argument was passed but it's not a valid metadata. Must be an object having `.countries` child object property. Got ".concat(na(e) ? "an object of shape: { " + Object.keys(e).join(", ") + " }" : "a " + DC(e) + ": " + e, "."));
}
var DC = function(t) {
  return ua(t);
};
function Hl(e, t) {
  if (t = new Ze(t), t.hasCountry(e))
    return t.country(e).countryCallingCode();
  throw new Error("Unknown country: ".concat(e));
}
function IC(e, t) {
  return t.countries.hasOwnProperty(e);
}
function ag(e) {
  var t = e.version;
  typeof t == "number" ? (this.v1 = t === 1, this.v2 = t === 2, this.v3 = t === 3, this.v4 = t === 4) : t ? rd(t, kC) === -1 ? this.v2 = !0 : rd(t, TC) === -1 ? this.v3 = !0 : this.v4 = !0 : this.v1 = !0;
}
function Vl(e, t) {
  return LC(e, void 0, t);
}
function LC(e, t, n) {
  var a = n.type(t), r = a && a.possibleLengths() || n.possibleLengths();
  if (!r)
    return "IS_POSSIBLE";
  var o = e.length, i = r[0];
  return i === o ? "IS_POSSIBLE" : i > o ? "TOO_SHORT" : r[r.length - 1] < o ? "TOO_LONG" : r.indexOf(o, 1) >= 0 ? "IS_POSSIBLE" : "INVALID_LENGTH";
}
function FC(e, t, n) {
  if (t === void 0 && (t = {}), n = new Ze(n), t.v2) {
    if (!e.countryCallingCode)
      throw new Error("Invalid phone number object passed");
    n.selectNumberingPlan(e.countryCallingCode);
  } else {
    if (!e.phone)
      return !1;
    if (e.country) {
      if (!n.hasCountry(e.country))
        throw new Error("Unknown country: ".concat(e.country));
      n.country(e.country);
    } else {
      if (!e.countryCallingCode)
        throw new Error("Invalid phone number object passed");
      n.selectNumberingPlan(e.countryCallingCode);
    }
  }
  if (n.possibleLengths())
    return rg(e.phone || e.nationalNumber, n);
  if (e.countryCallingCode && n.isNonGeographicCallingCode(e.countryCallingCode))
    return !0;
  throw new Error('Missing "possibleLengths" in metadata. Perhaps the metadata has been generated before v1.0.18.');
}
function rg(e, t) {
  switch (Vl(e, t)) {
    case "IS_POSSIBLE":
      return !0;
    // This library ignores "local-only" phone numbers (for simplicity).
    // See the readme for more info on what are "local-only" phone numbers.
    // case 'IS_POSSIBLE_LOCAL_ONLY':
    // 	return !isInternational
    default:
      return !1;
  }
}
function zt(e, t) {
  return e = e || "", new RegExp("^(?:" + t + ")$").test(e);
}
function BC(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n) return (n = n.call(e)).next.bind(n);
  if (Array.isArray(e) || (n = UC(e)) || t) {
    n && (e = n);
    var a = 0;
    return function() {
      return a >= e.length ? { done: !0 } : { done: !1, value: e[a++] };
    };
  }
  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function UC(e, t) {
  if (e) {
    if (typeof e == "string") return ld(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ld(e, t) : void 0;
  }
}
function ld(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, a = Array(t); n < t; n++) a[n] = e[n];
  return a;
}
var GC = ["MOBILE", "PREMIUM_RATE", "TOLL_FREE", "SHARED_COST", "VOIP", "PERSONAL_NUMBER", "PAGER", "UAN", "VOICEMAIL"];
function zl(e, t, n) {
  if (t = t || {}, !(!e.country && !e.countryCallingCode)) {
    n = new Ze(n), n.selectNumberingPlan(e.country, e.countryCallingCode);
    var a = t.v2 ? e.nationalNumber : e.phone;
    if (zt(a, n.nationalNumberPattern())) {
      if (Mi(a, "FIXED_LINE", n))
        return n.type("MOBILE") && n.type("MOBILE").pattern() === "" || !n.type("MOBILE") || Mi(a, "MOBILE", n) ? "FIXED_LINE_OR_MOBILE" : "FIXED_LINE";
      for (var r = BC(GC), o; !(o = r()).done; ) {
        var i = o.value;
        if (Mi(a, i, n))
          return i;
      }
    }
  }
}
function Mi(e, t, n) {
  return t = n.type(t), !t || !t.pattern() || t.possibleLengths() && t.possibleLengths().indexOf(e.length) < 0 ? !1 : zt(e, t.pattern());
}
function WC(e, t, n) {
  if (t = t || {}, n = new Ze(n), n.selectNumberingPlan(e.country, e.countryCallingCode), n.hasTypes())
    return zl(e, t, n.metadata) !== void 0;
  var a = t.v2 ? e.nationalNumber : e.phone;
  return zt(a, n.nationalNumberPattern());
}
function HC(e, t, n) {
  var a = new Ze(n), r = a.getCountryCodesForCallingCode(e);
  return r ? r.filter(function(o) {
    return VC(t, o, n);
  }) : [];
}
function VC(e, t, n) {
  var a = new Ze(n);
  return a.selectNumberingPlan(t), a.numberingPlan.possibleLengths().indexOf(e.length) >= 0;
}
var Kl = 2, zC = 17, KC = 3, gt = "0-9０-９٠-٩۰-۹", YC = "-‐-―−ー－", ZC = "／/", XC = "．.", qC = "  ­​⁠　", JC = "()（）［］\\[\\]", QC = "~⁓∼～", co = "".concat(YC).concat(ZC).concat(XC).concat(qC).concat(JC).concat(QC), Yl = "+＋", e9 = new RegExp("([" + gt + "])");
function t9(e, t, n, a) {
  if (t) {
    var r = new Ze(a);
    r.selectNumberingPlan(t, n);
    var o = new RegExp(r.IDDPrefix());
    if (e.search(o) === 0) {
      e = e.slice(e.match(o)[0].length);
      var i = e.match(e9);
      if (!(i && i[1] != null && i[1].length > 0 && i[1] === "0"))
        return e;
    }
  }
}
function n9(e, t) {
  if (e && t.numberingPlan.nationalPrefixForParsing()) {
    var n = new RegExp("^(?:" + t.numberingPlan.nationalPrefixForParsing() + ")"), a = n.exec(e);
    if (a) {
      var r, o, i = a.length - 1, s = i > 0 && a[i];
      if (t.nationalPrefixTransformRule() && s)
        r = e.replace(n, t.nationalPrefixTransformRule()), i > 1 && (o = a[1]);
      else {
        var c = a[0];
        r = e.slice(c.length), s && (o = a[1]);
      }
      var d;
      if (s) {
        var u = e.indexOf(a[1]), p = e.slice(0, u);
        p === t.numberingPlan.nationalPrefix() && (d = t.numberingPlan.nationalPrefix());
      } else
        d = a[0];
      return {
        nationalNumber: r,
        nationalPrefix: d,
        carrierCode: o
      };
    }
  }
  return {
    nationalNumber: e
  };
}
function ys(e, t) {
  var n = n9(e, t), a = n.carrierCode, r = n.nationalNumber;
  if (r !== e) {
    if (!a9(e, r, t))
      return {
        nationalNumber: e
      };
    if (t.possibleLengths() && !r9(r, t))
      return {
        nationalNumber: e
      };
  }
  return {
    nationalNumber: r,
    carrierCode: a
  };
}
function a9(e, t, n) {
  return !(zt(e, n.nationalNumberPattern()) && !zt(t, n.nationalNumberPattern()));
}
function r9(e, t) {
  switch (Vl(e, t)) {
    case "TOO_SHORT":
    case "INVALID_LENGTH":
      return !1;
    default:
      return !0;
  }
}
function o9(e, t, n, a) {
  var r = t ? Hl(t, a) : n;
  if (e.indexOf(r) === 0) {
    a = new Ze(a), a.selectNumberingPlan(t, n);
    var o = e.slice(r.length), i = ys(o, a), s = i.nationalNumber, c = ys(e, a), d = c.nationalNumber;
    if (!zt(d, a.nationalNumberPattern()) && zt(s, a.nationalNumberPattern()) || Vl(d, a) === "TOO_LONG")
      return {
        countryCallingCode: r,
        number: o
      };
  }
  return {
    number: e
  };
}
function og(e, t, n, a) {
  if (!e)
    return {};
  var r;
  if (e[0] !== "+") {
    var o = t9(e, t, n, a);
    if (o && o !== e)
      r = !0, e = "+" + o;
    else {
      if (t || n) {
        var i = o9(e, t, n, a), s = i.countryCallingCode, c = i.number;
        if (s)
          return {
            countryCallingCodeSource: "FROM_NUMBER_WITHOUT_PLUS_SIGN",
            countryCallingCode: s,
            number: c
          };
      }
      return {
        // No need to set it to `UNSPECIFIED`. It can be just `undefined`.
        // countryCallingCodeSource: 'UNSPECIFIED',
        number: e
      };
    }
  }
  if (e[1] === "0")
    return {};
  a = new Ze(a);
  for (var d = 2; d - 1 <= KC && d <= e.length; ) {
    var u = e.slice(1, d);
    if (a.hasCallingCode(u))
      return a.selectNumberingPlan(u), {
        countryCallingCodeSource: r ? "FROM_NUMBER_WITH_IDD" : "FROM_NUMBER_WITH_PLUS_SIGN",
        countryCallingCode: u,
        number: e.slice(d)
      };
    d++;
  }
  return {};
}
function i9(e) {
  return e.replace(new RegExp("[".concat(co, "]+"), "g"), " ").trim();
}
var s9 = /(\$\d)/;
function l9(e, t, n) {
  var a = n.useInternationalFormat, r = n.withNationalPrefix, o = e.replace(new RegExp(t.pattern()), a ? t.internationalFormat() : (
    // This library doesn't use `domestic_carrier_code_formatting_rule`,
    // because that one is only used when formatting phone numbers
    // for dialing from a mobile phone, and this is not a dialing library.
    // carrierCode && format.domesticCarrierCodeFormattingRule()
    // 	// First, replace the $CC in the formatting rule with the desired carrier code.
    // 	// Then, replace the $FG in the formatting rule with the first group
    // 	// and the carrier code combined in the appropriate way.
    // 	? format.format().replace(FIRST_GROUP_PATTERN, format.domesticCarrierCodeFormattingRule().replace('$CC', carrierCode))
    // 	: (
    // 		withNationalPrefix && format.nationalPrefixFormattingRule()
    // 			? format.format().replace(FIRST_GROUP_PATTERN, format.nationalPrefixFormattingRule())
    // 			: format.format()
    // 	)
    r && t.nationalPrefixFormattingRule() ? t.format().replace(s9, t.nationalPrefixFormattingRule()) : t.format()
  ));
  return a ? i9(o) : o;
}
var c9 = /^[\d]+(?:[~\u2053\u223C\uFF5E][\d]+)?$/;
function d9(e, t, n) {
  var a = new Ze(n);
  if (a.selectNumberingPlan(e, t), a.defaultIDDPrefix())
    return a.defaultIDDPrefix();
  if (c9.test(a.IDDPrefix()))
    return a.IDDPrefix();
}
var u9 = ";ext=", Kn = function(t) {
  return "([".concat(gt, "]{1,").concat(t, "})");
};
function ig(e) {
  var t = "20", n = "15", a = "9", r = "6", o = "[  \\t,]*", i = "[:\\.．]?[  \\t,-]*", s = "#?", c = "(?:e?xt(?:ensi(?:ó?|ó))?n?|ｅ?ｘｔｎ?|доб|anexo)", d = "(?:[xｘ#＃~～]|int|ｉｎｔ)", u = "[- ]+", p = "[  \\t]*", m = "(?:,{2}|;)", h = u9 + Kn(t), b = o + c + i + Kn(t) + s, g = o + d + i + Kn(a) + s, v = u + Kn(r) + "#", y = p + m + i + Kn(n) + s, w = p + "(?:,)+" + i + Kn(a) + s;
  return h + "|" + b + "|" + g + "|" + v + "|" + y + "|" + w;
}
var f9 = "[" + gt + "]{" + Kl + "}", p9 = "[" + Yl + "]{0,1}(?:[" + co + "]*[" + gt + "]){3,}[" + co + gt + "]*", m9 = new RegExp("^[" + Yl + "]{0,1}(?:[" + co + "]*[" + gt + "]){1,2}$", "i"), h9 = p9 + // Phone number extensions
"(?:" + ig() + ")?", g9 = new RegExp(
  // Either a short two-digit-only phone number
  "^" + f9 + "$|^" + h9 + "$",
  "i"
);
function b9(e) {
  return e.length >= Kl && g9.test(e);
}
function v9(e) {
  return m9.test(e);
}
function y9(e) {
  var t = e.number, n = e.ext;
  if (!t)
    return "";
  if (t[0] !== "+")
    throw new Error('"formatRFC3966()" expects "number" to be in E.164 format.');
  return "tel:".concat(t).concat(n ? ";ext=" + n : "");
}
function Za(e) {
  "@babel/helpers - typeof";
  return Za = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Za(e);
}
function x9(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n) return (n = n.call(e)).next.bind(n);
  if (Array.isArray(e) || (n = w9(e)) || t) {
    n && (e = n);
    var a = 0;
    return function() {
      return a >= e.length ? { done: !0 } : { done: !1, value: e[a++] };
    };
  }
  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function w9(e, t) {
  if (e) {
    if (typeof e == "string") return cd(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? cd(e, t) : void 0;
  }
}
function cd(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, a = Array(t); n < t; n++) a[n] = e[n];
  return a;
}
function dd(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), n.push.apply(n, a);
  }
  return n;
}
function ud(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? dd(Object(n), !0).forEach(function(a) {
      $9(e, a, n[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : dd(Object(n)).forEach(function(a) {
      Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
    });
  }
  return e;
}
function $9(e, t, n) {
  return (t = C9(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function C9(e) {
  var t = S9(e, "string");
  return Za(t) == "symbol" ? t : t + "";
}
function S9(e, t) {
  if (Za(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (Za(a) != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var fd = {
  formatExtension: function(t, n, a) {
    return "".concat(t).concat(a.ext()).concat(n);
  }
};
function _9(e, t, n, a) {
  if (n ? n = ud(ud({}, fd), n) : n = fd, a = new Ze(a), e.country && e.country !== "001") {
    if (!a.hasCountry(e.country))
      throw new Error("Unknown country: ".concat(e.country));
    a.country(e.country);
  } else if (e.countryCallingCode)
    a.selectNumberingPlan(e.countryCallingCode);
  else return e.phone || "";
  var r = a.countryCallingCode(), o = n.v2 ? e.nationalNumber : e.phone, i;
  switch (t) {
    case "NATIONAL":
      return o ? (i = uo(o, e.carrierCode, "NATIONAL", a, n), Oi(i, e.ext, a, n.formatExtension)) : "";
    case "INTERNATIONAL":
      return o ? (i = uo(o, null, "INTERNATIONAL", a, n), i = "+".concat(r, " ").concat(i), Oi(i, e.ext, a, n.formatExtension)) : "+".concat(r);
    case "E.164":
      return "+".concat(r).concat(o);
    case "RFC3966":
      return y9({
        number: "+".concat(r).concat(o),
        ext: e.ext
      });
    // For reference, here's Google's IDD formatter:
    // https://github.com/google/libphonenumber/blob/32719cf74e68796788d1ca45abc85dcdc63ba5b9/java/libphonenumber/src/com/google/i18n/phonenumbers/PhoneNumberUtil.java#L1546
    // Not saying that this IDD formatter replicates it 1:1, but it seems to work.
    // Who would even need to format phone numbers in IDD format anyway?
    case "IDD":
      if (!n.fromCountry)
        return;
      var s = E9(o, e.carrierCode, r, n.fromCountry, a);
      return Oi(s, e.ext, a, n.formatExtension);
    default:
      throw new Error('Unknown "format" argument passed to "formatNumber()": "'.concat(t, '"'));
  }
}
function uo(e, t, n, a, r) {
  var o = N9(a.formats(), e);
  return o ? l9(e, o, {
    useInternationalFormat: n === "INTERNATIONAL",
    withNationalPrefix: !(o.nationalPrefixIsOptionalWhenFormattingInNationalFormat() && r && r.nationalPrefix === !1)
  }) : e;
}
function N9(e, t) {
  for (var n = x9(e), a; !(a = n()).done; ) {
    var r = a.value;
    if (r.leadingDigitsPatterns().length > 0) {
      var o = r.leadingDigitsPatterns()[r.leadingDigitsPatterns().length - 1];
      if (t.search(o) !== 0)
        continue;
    }
    if (zt(t, r.pattern()))
      return r;
  }
}
function Oi(e, t, n, a) {
  return t ? a(e, t, n) : e;
}
function E9(e, t, n, a, r) {
  var o = Hl(a, r.metadata);
  if (o === n) {
    var i = uo(e, t, "NATIONAL", r);
    return n === "1" ? n + " " + i : i;
  }
  var s = d9(a, void 0, r.metadata);
  if (s)
    return "".concat(s, " ").concat(n, " ").concat(uo(e, null, "INTERNATIONAL", r));
}
function Xa(e) {
  "@babel/helpers - typeof";
  return Xa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Xa(e);
}
function pd(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), n.push.apply(n, a);
  }
  return n;
}
function md(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? pd(Object(n), !0).forEach(function(a) {
      R9(e, a, n[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : pd(Object(n)).forEach(function(a) {
      Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
    });
  }
  return e;
}
function R9(e, t, n) {
  return (t = sg(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function P9(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function k9(e, t) {
  for (var n = 0; n < t.length; n++) {
    var a = t[n];
    a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, sg(a.key), a);
  }
}
function T9(e, t, n) {
  return t && k9(e.prototype, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function sg(e) {
  var t = A9(e, "string");
  return Xa(t) == "symbol" ? t : t + "";
}
function A9(e, t) {
  if (Xa(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (Xa(a) != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
var j9 = /* @__PURE__ */ (function() {
  function e(t, n, a) {
    if (P9(this, e), !t)
      throw new TypeError("First argument is required");
    if (typeof t != "string")
      throw new TypeError("First argument must be a string");
    if (t[0] === "+" && !n)
      throw new TypeError("`metadata` argument not passed");
    if (na(n) && na(n.countries)) {
      a = n;
      var r = t;
      if (!D9.test(r))
        throw new Error('Invalid `number` argument passed: must consist of a "+" followed by digits');
      var o = og(r, void 0, void 0, a), i = o.countryCallingCode, s = o.number;
      if (n = s, t = i, !n)
        throw new Error("Invalid `number` argument passed: too short");
    }
    if (!n)
      throw new TypeError("`nationalNumber` argument is required");
    if (typeof n != "string")
      throw new TypeError("`nationalNumber` argument must be a string");
    ng(a);
    var c = O9(t, a), d = c.country, u = c.countryCallingCode;
    this.country = d, this.countryCallingCode = u, this.nationalNumber = n, this.number = "+" + this.countryCallingCode + this.nationalNumber, this.getMetadata = function() {
      return a;
    };
  }
  return T9(e, [{
    key: "setExt",
    value: function(n) {
      this.ext = n;
    }
  }, {
    key: "getPossibleCountries",
    value: function() {
      return this.country ? [this.country] : HC(this.countryCallingCode, this.nationalNumber, this.getMetadata());
    }
  }, {
    key: "isPossible",
    value: function() {
      return FC(this, {
        v2: !0
      }, this.getMetadata());
    }
  }, {
    key: "isValid",
    value: function() {
      return WC(this, {
        v2: !0
      }, this.getMetadata());
    }
  }, {
    key: "isNonGeographic",
    value: function() {
      var n = new Ze(this.getMetadata());
      return n.isNonGeographicCallingCode(this.countryCallingCode);
    }
  }, {
    key: "isEqual",
    value: function(n) {
      return this.number === n.number && this.ext === n.ext;
    }
    // This function was originally meant to be an equivalent for `validatePhoneNumberLength()`,
    // but later it was found out that it doesn't include the possible `TOO_SHORT` result
    // returned from `parsePhoneNumberWithError()` in the original `validatePhoneNumberLength()`,
    // so eventually I simply commented out this method from the `PhoneNumber` class
    // and just left the `validatePhoneNumberLength()` function, even though that one would require
    // and additional step to also validate the actual country / calling code of the phone number.
    // validateLength() {
    // 	const metadata = new Metadata(this.getMetadata())
    // 	metadata.selectNumberingPlan(this.countryCallingCode)
    // 	const result = checkNumberLength(this.nationalNumber, metadata)
    // 	if (result !== 'IS_POSSIBLE') {
    // 		return result
    // 	}
    // }
  }, {
    key: "getType",
    value: function() {
      return zl(this, {
        v2: !0
      }, this.getMetadata());
    }
  }, {
    key: "format",
    value: function(n, a) {
      return _9(this, n, a ? md(md({}, a), {}, {
        v2: !0
      }) : {
        v2: !0
      }, this.getMetadata());
    }
  }, {
    key: "formatNational",
    value: function(n) {
      return this.format("NATIONAL", n);
    }
  }, {
    key: "formatInternational",
    value: function(n) {
      return this.format("INTERNATIONAL", n);
    }
  }, {
    key: "getURI",
    value: function(n) {
      return this.format("RFC3966", n);
    }
  }]);
})(), M9 = function(t) {
  return /^[A-Z]{2}$/.test(t);
};
function O9(e, t) {
  var n, a, r = new Ze(t);
  return M9(e) ? (n = e, r.selectNumberingPlan(n), a = r.countryCallingCode()) : a = e, {
    country: n,
    countryCallingCode: a
  };
}
var D9 = /^\+\d+$/;
function xs(e) {
  "@babel/helpers - typeof";
  return xs = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, xs(e);
}
function I9(e, t, n) {
  return Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function L9(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function F9(e, t, n) {
  return t = Ja(t), B9(e, Zl() ? Reflect.construct(t, n || [], Ja(e).constructor) : t.apply(e, n));
}
function B9(e, t) {
  if (t && (xs(t) == "object" || typeof t == "function")) return t;
  if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
  return U9(e);
}
function U9(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function G9(e, t) {
  if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), Object.defineProperty(e, "prototype", { writable: !1 }), t && qa(e, t);
}
function ws(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return ws = function(a) {
    if (a === null || !H9(a)) return a;
    if (typeof a != "function") throw new TypeError("Super expression must either be null or a function");
    if (t !== void 0) {
      if (t.has(a)) return t.get(a);
      t.set(a, r);
    }
    function r() {
      return W9(a, arguments, Ja(this).constructor);
    }
    return r.prototype = Object.create(a.prototype, { constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 } }), qa(r, a);
  }, ws(e);
}
function W9(e, t, n) {
  if (Zl()) return Reflect.construct.apply(null, arguments);
  var a = [null];
  a.push.apply(a, t);
  var r = new (e.bind.apply(e, a))();
  return n && qa(r, n.prototype), r;
}
function Zl() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Zl = function() {
    return !!e;
  })();
}
function H9(e) {
  try {
    return Function.toString.call(e).indexOf("[native code]") !== -1;
  } catch {
    return typeof e == "function";
  }
}
function qa(e, t) {
  return qa = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, a) {
    return n.__proto__ = a, n;
  }, qa(e, t);
}
function Ja(e) {
  return Ja = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, Ja(e);
}
var Bt = /* @__PURE__ */ (function(e) {
  function t(n) {
    var a;
    return L9(this, t), a = F9(this, t, [n]), Object.setPrototypeOf(a, t.prototype), a.name = a.constructor.name, a;
  }
  return G9(t, e), I9(t);
})(/* @__PURE__ */ ws(Error)), hd = new RegExp("(?:" + ig() + ")$", "i");
function V9(e) {
  var t = e.search(hd);
  if (t < 0)
    return {};
  for (var n = e.slice(0, t), a = e.match(hd), r = 1; r < a.length; ) {
    if (a[r])
      return {
        number: n,
        ext: a[r]
      };
    r++;
  }
}
var z9 = {
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  "０": "0",
  // Fullwidth digit 0
  "１": "1",
  // Fullwidth digit 1
  "２": "2",
  // Fullwidth digit 2
  "３": "3",
  // Fullwidth digit 3
  "４": "4",
  // Fullwidth digit 4
  "５": "5",
  // Fullwidth digit 5
  "６": "6",
  // Fullwidth digit 6
  "７": "7",
  // Fullwidth digit 7
  "８": "8",
  // Fullwidth digit 8
  "９": "9",
  // Fullwidth digit 9
  "٠": "0",
  // Arabic-indic digit 0
  "١": "1",
  // Arabic-indic digit 1
  "٢": "2",
  // Arabic-indic digit 2
  "٣": "3",
  // Arabic-indic digit 3
  "٤": "4",
  // Arabic-indic digit 4
  "٥": "5",
  // Arabic-indic digit 5
  "٦": "6",
  // Arabic-indic digit 6
  "٧": "7",
  // Arabic-indic digit 7
  "٨": "8",
  // Arabic-indic digit 8
  "٩": "9",
  // Arabic-indic digit 9
  "۰": "0",
  // Eastern-Arabic digit 0
  "۱": "1",
  // Eastern-Arabic digit 1
  "۲": "2",
  // Eastern-Arabic digit 2
  "۳": "3",
  // Eastern-Arabic digit 3
  "۴": "4",
  // Eastern-Arabic digit 4
  "۵": "5",
  // Eastern-Arabic digit 5
  "۶": "6",
  // Eastern-Arabic digit 6
  "۷": "7",
  // Eastern-Arabic digit 7
  "۸": "8",
  // Eastern-Arabic digit 8
  "۹": "9"
  // Eastern-Arabic digit 9
};
function K9(e) {
  return z9[e];
}
function Y9(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n) return (n = n.call(e)).next.bind(n);
  if (Array.isArray(e) || (n = Z9(e)) || t) {
    n && (e = n);
    var a = 0;
    return function() {
      return a >= e.length ? { done: !0 } : { done: !1, value: e[a++] };
    };
  }
  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Z9(e, t) {
  if (e) {
    if (typeof e == "string") return gd(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? gd(e, t) : void 0;
  }
}
function gd(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, a = Array(t); n < t; n++) a[n] = e[n];
  return a;
}
function bd(e) {
  for (var t = "", n = Y9(e.split("")), a; !(a = n()).done; ) {
    var r = a.value;
    t += X9(r, t) || "";
  }
  return t;
}
function X9(e, t, n) {
  return e === "+" ? t ? void 0 : "+" : K9(e);
}
function q9(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n) return (n = n.call(e)).next.bind(n);
  if (Array.isArray(e) || (n = J9(e)) || t) {
    n && (e = n);
    var a = 0;
    return function() {
      return a >= e.length ? { done: !0 } : { done: !1, value: e[a++] };
    };
  }
  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function J9(e, t) {
  if (e) {
    if (typeof e == "string") return vd(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? vd(e, t) : void 0;
  }
}
function vd(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, a = Array(t); n < t; n++) a[n] = e[n];
  return a;
}
function Q9(e, t) {
  var n = t.countries, a = t.metadata;
  a = new Ze(a);
  for (var r = q9(n), o; !(o = r()).done; ) {
    var i = o.value;
    if (a.country(i), a.leadingDigits()) {
      if (e && e.search(a.leadingDigits()) === 0)
        return i;
    } else if (zl({
      phone: e,
      country: i
    }, void 0, a.metadata))
      return i;
  }
}
function e5(e, t) {
  var n = t.nationalNumber, a = t.metadata, r = a.getCountryCodesForCallingCode(e);
  if (r)
    return r.length === 1 ? r[0] : Q9(n, {
      countries: r,
      metadata: a.metadata
    });
}
var lg = "+", t5 = "[\\-\\.\\(\\)]?", yd = "([" + gt + "]|" + t5 + ")", n5 = "^\\" + lg + yd + "*[" + gt + "]" + yd + "*$", a5 = new RegExp(n5, "g"), $s = gt, r5 = "[" + $s + "]+((\\-)*[" + $s + "])*", o5 = "a-zA-Z", i5 = "[" + o5 + "]+((\\-)*[" + $s + "])*", s5 = "^(" + r5 + "\\.)*" + i5 + "\\.?$", l5 = new RegExp(s5, "g"), xd = "tel:", Cs = ";phone-context=", c5 = ";isub=";
function d5(e) {
  var t = e.indexOf(Cs);
  if (t < 0)
    return null;
  var n = t + Cs.length;
  if (n >= e.length)
    return "";
  var a = e.indexOf(";", n);
  return a >= 0 ? e.substring(n, a) : e.substring(n);
}
function u5(e) {
  return e === null ? !0 : e.length === 0 ? !1 : a5.test(e) || l5.test(e);
}
function f5(e, t) {
  var n = t.extractFormattedPhoneNumber, a = d5(e);
  if (!u5(a))
    throw new Bt("NOT_A_NUMBER");
  var r;
  if (a === null)
    r = n(e) || "";
  else {
    r = "", a.charAt(0) === lg && (r += a);
    var o = e.indexOf(xd), i;
    o >= 0 ? i = o + xd.length : i = 0;
    var s = e.indexOf(Cs);
    r += e.substring(i, s);
  }
  var c = r.indexOf(c5);
  if (c > 0 && (r = r.substring(0, c)), r !== "")
    return r;
}
var p5 = 250, m5 = new RegExp("[" + Yl + gt + "]"), h5 = new RegExp("[^" + gt + "#]+$");
function g5(e, t, n) {
  if (t = t || {}, n = new Ze(n), t.defaultCountry && !n.hasCountry(t.defaultCountry))
    throw t.v2 ? new Bt("INVALID_COUNTRY") : new Error("Unknown country: ".concat(t.defaultCountry));
  var a = v5(e, t.v2, t.extract), r = a.number, o = a.ext, i = a.error;
  if (!r) {
    if (t.v2)
      throw i === "TOO_SHORT" ? new Bt("TOO_SHORT") : new Bt("NOT_A_NUMBER");
    return {};
  }
  var s = x5(r, t.defaultCountry, t.defaultCallingCode, n), c = s.country, d = s.nationalNumber, u = s.countryCallingCode, p = s.countryCallingCodeSource, m = s.carrierCode;
  if (!n.hasSelectedNumberingPlan()) {
    if (t.v2)
      throw new Bt("INVALID_COUNTRY");
    return {};
  }
  if (!d || d.length < Kl) {
    if (t.v2)
      throw new Bt("TOO_SHORT");
    return {};
  }
  if (d.length > zC) {
    if (t.v2)
      throw new Bt("TOO_LONG");
    return {};
  }
  if (t.v2) {
    var h = new j9(u, d, n.metadata);
    return c && (h.country = c), m && (h.carrierCode = m), o && (h.ext = o), h.__countryCallingCodeSource = p, h;
  }
  var b = (t.extended ? n.hasSelectedNumberingPlan() : c) ? zt(d, n.nationalNumberPattern()) : !1;
  return t.extended ? {
    country: c,
    countryCallingCode: u,
    carrierCode: m,
    valid: b,
    possible: b ? !0 : !!(t.extended === !0 && n.possibleLengths() && rg(d, n)),
    phone: d,
    ext: o
  } : b ? y5(c, d, o) : {};
}
function b5(e, t, n) {
  if (e) {
    if (e.length > p5) {
      if (n)
        throw new Bt("TOO_LONG");
      return;
    }
    if (t === !1)
      return e;
    var a = e.search(m5);
    if (!(a < 0))
      return e.slice(a).replace(h5, "");
  }
}
function v5(e, t, n) {
  var a = f5(e, {
    extractFormattedPhoneNumber: function(i) {
      return b5(i, n, t);
    }
  });
  if (!a)
    return {};
  if (!b9(a))
    return v9(a) ? {
      error: "TOO_SHORT"
    } : {};
  var r = V9(a);
  return r.ext ? r : {
    number: a
  };
}
function y5(e, t, n) {
  var a = {
    country: e,
    phone: t
  };
  return n && (a.ext = n), a;
}
function x5(e, t, n, a) {
  var r = og(bd(e), t, n, a.metadata), o = r.countryCallingCodeSource, i = r.countryCallingCode, s = r.number, c;
  if (i)
    a.selectNumberingPlan(i);
  else if (s && (t || n))
    a.selectNumberingPlan(t, n), t && (c = t), i = n || Hl(t, a.metadata);
  else return {};
  if (!s)
    return {
      countryCallingCodeSource: o,
      countryCallingCode: i
    };
  var d = ys(bd(s), a), u = d.nationalNumber, p = d.carrierCode, m = e5(i, {
    nationalNumber: u,
    metadata: a
  });
  return m && (c = m, m === "001" || a.country(c)), {
    country: c,
    countryCallingCode: i,
    countryCallingCodeSource: o,
    nationalNumber: u,
    carrierCode: p
  };
}
function Qa(e) {
  "@babel/helpers - typeof";
  return Qa = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Qa(e);
}
function wd(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), n.push.apply(n, a);
  }
  return n;
}
function $d(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? wd(Object(n), !0).forEach(function(a) {
      w5(e, a, n[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : wd(Object(n)).forEach(function(a) {
      Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
    });
  }
  return e;
}
function w5(e, t, n) {
  return (t = $5(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function $5(e) {
  var t = C5(e, "string");
  return Qa(t) == "symbol" ? t : t + "";
}
function C5(e, t) {
  if (Qa(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (Qa(a) != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function S5(e, t, n) {
  return g5(e, $d($d({}, t), {}, {
    v2: !0
  }), n);
}
function er(e) {
  "@babel/helpers - typeof";
  return er = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, er(e);
}
function Cd(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), n.push.apply(n, a);
  }
  return n;
}
function _5(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Cd(Object(n), !0).forEach(function(a) {
      N5(e, a, n[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Cd(Object(n)).forEach(function(a) {
      Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
    });
  }
  return e;
}
function N5(e, t, n) {
  return (t = E5(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function E5(e) {
  var t = R5(e, "string");
  return er(t) == "symbol" ? t : t + "";
}
function R5(e, t) {
  if (er(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (er(a) != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function P5(e, t) {
  return j5(e) || A5(e, t) || T5(e, t) || k5();
}
function k5() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function T5(e, t) {
  if (e) {
    if (typeof e == "string") return Sd(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Sd(e, t) : void 0;
  }
}
function Sd(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, a = Array(t); n < t; n++) a[n] = e[n];
  return a;
}
function A5(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var a, r, o, i, s = [], c = !0, d = !1;
    try {
      if (o = (n = n.call(e)).next, t !== 0) for (; !(c = (a = o.call(n)).done) && (s.push(a.value), s.length !== t); c = !0) ;
    } catch (u) {
      d = !0, r = u;
    } finally {
      try {
        if (!c && n.return != null && (i = n.return(), Object(i) !== i)) return;
      } finally {
        if (d) throw r;
      }
    }
    return s;
  }
}
function j5(e) {
  if (Array.isArray(e)) return e;
}
function cg(e) {
  var t = Array.prototype.slice.call(e), n = P5(t, 4), a = n[0], r = n[1], o = n[2], i = n[3], s, c, d;
  if (typeof a == "string")
    s = a;
  else throw new TypeError("A text for parsing must be a string.");
  if (!r || typeof r == "string")
    i ? (c = o, d = i) : (c = void 0, d = o), r && (c = _5({
      defaultCountry: r
    }, c));
  else if (na(r))
    o ? (c = r, d = o) : d = r;
  else throw new Error("Invalid second argument: ".concat(r));
  return {
    text: s,
    options: c,
    metadata: d
  };
}
function tr(e) {
  "@babel/helpers - typeof";
  return tr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, tr(e);
}
function _d(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), n.push.apply(n, a);
  }
  return n;
}
function Nd(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _d(Object(n), !0).forEach(function(a) {
      M5(e, a, n[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : _d(Object(n)).forEach(function(a) {
      Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
    });
  }
  return e;
}
function M5(e, t, n) {
  return (t = O5(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function O5(e) {
  var t = D5(e, "string");
  return tr(t) == "symbol" ? t : t + "";
}
function D5(e, t) {
  if (tr(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (tr(a) != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function dg(e, t, n) {
  t && t.defaultCountry && !IC(t.defaultCountry, n) && (t = Nd(Nd({}, t), {}, {
    defaultCountry: void 0
  }));
  try {
    return S5(e, t, n);
  } catch (a) {
    if (!(a instanceof Bt)) throw a;
  }
}
function I5() {
  var e = cg(arguments), t = e.text, n = e.options, a = e.metadata;
  return dg(t, n, a);
}
function nr(e) {
  "@babel/helpers - typeof";
  return nr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, nr(e);
}
function Ed(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), n.push.apply(n, a);
  }
  return n;
}
function Rd(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ed(Object(n), !0).forEach(function(a) {
      L5(e, a, n[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Ed(Object(n)).forEach(function(a) {
      Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(n, a));
    });
  }
  return e;
}
function L5(e, t, n) {
  return (t = F5(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function F5(e) {
  var t = B5(e, "string");
  return nr(t) == "symbol" ? t : t + "";
}
function B5(e, t) {
  if (nr(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var a = n.call(e, t);
    if (nr(a) != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function U5() {
  var e = cg(arguments), t = e.text, n = e.options, a = e.metadata;
  n = Rd(Rd({}, n), {}, {
    extract: !1
  });
  var r = dg(t, n, a);
  return r && r.isValid() || !1;
}
function G5() {
  return tg(I5, arguments);
}
function W5() {
  return tg(U5, arguments);
}
var ge;
(function(e) {
  e.assertEqual = (r) => {
  };
  function t(r) {
  }
  e.assertIs = t;
  function n(r) {
    throw new Error();
  }
  e.assertNever = n, e.arrayToEnum = (r) => {
    const o = {};
    for (const i of r)
      o[i] = i;
    return o;
  }, e.getValidEnumValues = (r) => {
    const o = e.objectKeys(r).filter((s) => typeof r[r[s]] != "number"), i = {};
    for (const s of o)
      i[s] = r[s];
    return e.objectValues(i);
  }, e.objectValues = (r) => e.objectKeys(r).map(function(o) {
    return r[o];
  }), e.objectKeys = typeof Object.keys == "function" ? (r) => Object.keys(r) : (r) => {
    const o = [];
    for (const i in r)
      Object.prototype.hasOwnProperty.call(r, i) && o.push(i);
    return o;
  }, e.find = (r, o) => {
    for (const i of r)
      if (o(i))
        return i;
  }, e.isInteger = typeof Number.isInteger == "function" ? (r) => Number.isInteger(r) : (r) => typeof r == "number" && Number.isFinite(r) && Math.floor(r) === r;
  function a(r, o = " | ") {
    return r.map((i) => typeof i == "string" ? `'${i}'` : i).join(o);
  }
  e.joinValues = a, e.jsonStringifyReplacer = (r, o) => typeof o == "bigint" ? o.toString() : o;
})(ge || (ge = {}));
var Pd;
(function(e) {
  e.mergeShapes = (t, n) => ({
    ...t,
    ...n
    // second overwrites first
  });
})(Pd || (Pd = {}));
const J = ge.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), en = (e) => {
  switch (typeof e) {
    case "undefined":
      return J.undefined;
    case "string":
      return J.string;
    case "number":
      return Number.isNaN(e) ? J.nan : J.number;
    case "boolean":
      return J.boolean;
    case "function":
      return J.function;
    case "bigint":
      return J.bigint;
    case "symbol":
      return J.symbol;
    case "object":
      return Array.isArray(e) ? J.array : e === null ? J.null : e.then && typeof e.then == "function" && e.catch && typeof e.catch == "function" ? J.promise : typeof Map < "u" && e instanceof Map ? J.map : typeof Set < "u" && e instanceof Set ? J.set : typeof Date < "u" && e instanceof Date ? J.date : J.object;
    default:
      return J.unknown;
  }
}, F = ge.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
class Kt extends Error {
  get errors() {
    return this.issues;
  }
  constructor(t) {
    super(), this.issues = [], this.addIssue = (a) => {
      this.issues = [...this.issues, a];
    }, this.addIssues = (a = []) => {
      this.issues = [...this.issues, ...a];
    };
    const n = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, n) : this.__proto__ = n, this.name = "ZodError", this.issues = t;
  }
  format(t) {
    const n = t || function(o) {
      return o.message;
    }, a = { _errors: [] }, r = (o) => {
      for (const i of o.issues)
        if (i.code === "invalid_union")
          i.unionErrors.map(r);
        else if (i.code === "invalid_return_type")
          r(i.returnTypeError);
        else if (i.code === "invalid_arguments")
          r(i.argumentsError);
        else if (i.path.length === 0)
          a._errors.push(n(i));
        else {
          let s = a, c = 0;
          for (; c < i.path.length; ) {
            const d = i.path[c];
            c === i.path.length - 1 ? (s[d] = s[d] || { _errors: [] }, s[d]._errors.push(n(i))) : s[d] = s[d] || { _errors: [] }, s = s[d], c++;
          }
        }
    };
    return r(this), a;
  }
  static assert(t) {
    if (!(t instanceof Kt))
      throw new Error(`Not a ZodError: ${t}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, ge.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(t = (n) => n.message) {
    const n = {}, a = [];
    for (const r of this.issues)
      if (r.path.length > 0) {
        const o = r.path[0];
        n[o] = n[o] || [], n[o].push(t(r));
      } else
        a.push(t(r));
    return { formErrors: a, fieldErrors: n };
  }
  get formErrors() {
    return this.flatten();
  }
}
Kt.create = (e) => new Kt(e);
const Ss = (e, t) => {
  let n;
  switch (e.code) {
    case F.invalid_type:
      e.received === J.undefined ? n = "Required" : n = `Expected ${e.expected}, received ${e.received}`;
      break;
    case F.invalid_literal:
      n = `Invalid literal value, expected ${JSON.stringify(e.expected, ge.jsonStringifyReplacer)}`;
      break;
    case F.unrecognized_keys:
      n = `Unrecognized key(s) in object: ${ge.joinValues(e.keys, ", ")}`;
      break;
    case F.invalid_union:
      n = "Invalid input";
      break;
    case F.invalid_union_discriminator:
      n = `Invalid discriminator value. Expected ${ge.joinValues(e.options)}`;
      break;
    case F.invalid_enum_value:
      n = `Invalid enum value. Expected ${ge.joinValues(e.options)}, received '${e.received}'`;
      break;
    case F.invalid_arguments:
      n = "Invalid function arguments";
      break;
    case F.invalid_return_type:
      n = "Invalid function return type";
      break;
    case F.invalid_date:
      n = "Invalid date";
      break;
    case F.invalid_string:
      typeof e.validation == "object" ? "includes" in e.validation ? (n = `Invalid input: must include "${e.validation.includes}"`, typeof e.validation.position == "number" && (n = `${n} at one or more positions greater than or equal to ${e.validation.position}`)) : "startsWith" in e.validation ? n = `Invalid input: must start with "${e.validation.startsWith}"` : "endsWith" in e.validation ? n = `Invalid input: must end with "${e.validation.endsWith}"` : ge.assertNever(e.validation) : e.validation !== "regex" ? n = `Invalid ${e.validation}` : n = "Invalid";
      break;
    case F.too_small:
      e.type === "array" ? n = `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "more than"} ${e.minimum} element(s)` : e.type === "string" ? n = `String must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "over"} ${e.minimum} character(s)` : e.type === "number" ? n = `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}` : e.type === "bigint" ? n = `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}` : e.type === "date" ? n = `Date must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e.minimum))}` : n = "Invalid input";
      break;
    case F.too_big:
      e.type === "array" ? n = `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "less than"} ${e.maximum} element(s)` : e.type === "string" ? n = `String must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "under"} ${e.maximum} character(s)` : e.type === "number" ? n = `Number must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : e.type === "bigint" ? n = `BigInt must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}` : e.type === "date" ? n = `Date must be ${e.exact ? "exactly" : e.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e.maximum))}` : n = "Invalid input";
      break;
    case F.custom:
      n = "Invalid input";
      break;
    case F.invalid_intersection_types:
      n = "Intersection results could not be merged";
      break;
    case F.not_multiple_of:
      n = `Number must be a multiple of ${e.multipleOf}`;
      break;
    case F.not_finite:
      n = "Number must be finite";
      break;
    default:
      n = t.defaultError, ge.assertNever(e);
  }
  return { message: n };
};
let H5 = Ss;
function V5() {
  return H5;
}
const z5 = (e) => {
  const { data: t, path: n, errorMaps: a, issueData: r } = e, o = [...n, ...r.path || []], i = {
    ...r,
    path: o
  };
  if (r.message !== void 0)
    return {
      ...r,
      path: o,
      message: r.message
    };
  let s = "";
  const c = a.filter((d) => !!d).slice().reverse();
  for (const d of c)
    s = d(i, { data: t, defaultError: s }).message;
  return {
    ...r,
    path: o,
    message: s
  };
};
function Z(e, t) {
  const n = V5(), a = z5({
    issueData: t,
    data: e.data,
    path: e.path,
    errorMaps: [
      e.common.contextualErrorMap,
      // contextual error map is first priority
      e.schemaErrorMap,
      // then schema-bound map if available
      n,
      // then global override map
      n === Ss ? void 0 : Ss
      // then global default map
    ].filter((r) => !!r)
  });
  e.common.issues.push(a);
}
class ot {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(t, n) {
    const a = [];
    for (const r of n) {
      if (r.status === "aborted")
        return ie;
      r.status === "dirty" && t.dirty(), a.push(r.value);
    }
    return { status: t.value, value: a };
  }
  static async mergeObjectAsync(t, n) {
    const a = [];
    for (const r of n) {
      const o = await r.key, i = await r.value;
      a.push({
        key: o,
        value: i
      });
    }
    return ot.mergeObjectSync(t, a);
  }
  static mergeObjectSync(t, n) {
    const a = {};
    for (const r of n) {
      const { key: o, value: i } = r;
      if (o.status === "aborted" || i.status === "aborted")
        return ie;
      o.status === "dirty" && t.dirty(), i.status === "dirty" && t.dirty(), o.value !== "__proto__" && (typeof i.value < "u" || r.alwaysSet) && (a[o.value] = i.value);
    }
    return { status: t.value, value: a };
  }
}
const ie = Object.freeze({
  status: "aborted"
}), Ba = (e) => ({ status: "dirty", value: e }), ct = (e) => ({ status: "valid", value: e }), kd = (e) => e.status === "aborted", Td = (e) => e.status === "dirty", fa = (e) => e.status === "valid", fo = (e) => typeof Promise < "u" && e instanceof Promise;
var ee;
(function(e) {
  e.errToObj = (t) => typeof t == "string" ? { message: t } : t || {}, e.toString = (t) => typeof t == "string" ? t : t?.message;
})(ee || (ee = {}));
class un {
  constructor(t, n, a, r) {
    this._cachedPath = [], this.parent = t, this.data = n, this._path = a, this._key = r;
  }
  get path() {
    return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const Ad = (e, t) => {
  if (fa(t))
    return { success: !0, data: t.value };
  if (!e.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const n = new Kt(e.common.issues);
      return this._error = n, this._error;
    }
  };
};
function ue(e) {
  if (!e)
    return {};
  const { errorMap: t, invalid_type_error: n, required_error: a, description: r } = e;
  if (t && (n || a))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return t ? { errorMap: t, description: r } : { errorMap: (i, s) => {
    const { message: c } = e;
    return i.code === "invalid_enum_value" ? { message: c ?? s.defaultError } : typeof s.data > "u" ? { message: c ?? a ?? s.defaultError } : i.code !== "invalid_type" ? { message: s.defaultError } : { message: c ?? n ?? s.defaultError };
  }, description: r };
}
class me {
  get description() {
    return this._def.description;
  }
  _getType(t) {
    return en(t.data);
  }
  _getOrReturnCtx(t, n) {
    return n || {
      common: t.parent.common,
      data: t.data,
      parsedType: en(t.data),
      schemaErrorMap: this._def.errorMap,
      path: t.path,
      parent: t.parent
    };
  }
  _processInputParams(t) {
    return {
      status: new ot(),
      ctx: {
        common: t.parent.common,
        data: t.data,
        parsedType: en(t.data),
        schemaErrorMap: this._def.errorMap,
        path: t.path,
        parent: t.parent
      }
    };
  }
  _parseSync(t) {
    const n = this._parse(t);
    if (fo(n))
      throw new Error("Synchronous parse encountered promise.");
    return n;
  }
  _parseAsync(t) {
    const n = this._parse(t);
    return Promise.resolve(n);
  }
  parse(t, n) {
    const a = this.safeParse(t, n);
    if (a.success)
      return a.data;
    throw a.error;
  }
  safeParse(t, n) {
    const a = {
      common: {
        issues: [],
        async: n?.async ?? !1,
        contextualErrorMap: n?.errorMap
      },
      path: n?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: t,
      parsedType: en(t)
    }, r = this._parseSync({ data: t, path: a.path, parent: a });
    return Ad(a, r);
  }
  "~validate"(t) {
    const n = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: t,
      parsedType: en(t)
    };
    if (!this["~standard"].async)
      try {
        const a = this._parseSync({ data: t, path: [], parent: n });
        return fa(a) ? {
          value: a.value
        } : {
          issues: n.common.issues
        };
      } catch (a) {
        a?.message?.toLowerCase()?.includes("encountered") && (this["~standard"].async = !0), n.common = {
          issues: [],
          async: !0
        };
      }
    return this._parseAsync({ data: t, path: [], parent: n }).then((a) => fa(a) ? {
      value: a.value
    } : {
      issues: n.common.issues
    });
  }
  async parseAsync(t, n) {
    const a = await this.safeParseAsync(t, n);
    if (a.success)
      return a.data;
    throw a.error;
  }
  async safeParseAsync(t, n) {
    const a = {
      common: {
        issues: [],
        contextualErrorMap: n?.errorMap,
        async: !0
      },
      path: n?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: t,
      parsedType: en(t)
    }, r = this._parse({ data: t, path: a.path, parent: a }), o = await (fo(r) ? r : Promise.resolve(r));
    return Ad(a, o);
  }
  refine(t, n) {
    const a = (r) => typeof n == "string" || typeof n > "u" ? { message: n } : typeof n == "function" ? n(r) : n;
    return this._refinement((r, o) => {
      const i = t(r), s = () => o.addIssue({
        code: F.custom,
        ...a(r)
      });
      return typeof Promise < "u" && i instanceof Promise ? i.then((c) => c ? !0 : (s(), !1)) : i ? !0 : (s(), !1);
    });
  }
  refinement(t, n) {
    return this._refinement((a, r) => t(a) ? !0 : (r.addIssue(typeof n == "function" ? n(a, r) : n), !1));
  }
  _refinement(t) {
    return new ma({
      schema: this,
      typeName: se.ZodEffects,
      effect: { type: "refinement", refinement: t }
    });
  }
  superRefine(t) {
    return this._refinement(t);
  }
  constructor(t) {
    this.spa = this.safeParseAsync, this._def = t, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (n) => this["~validate"](n)
    };
  }
  optional() {
    return rn.create(this, this._def);
  }
  nullable() {
    return ha.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return Pt.create(this);
  }
  promise() {
    return go.create(this, this._def);
  }
  or(t) {
    return mo.create([this, t], this._def);
  }
  and(t) {
    return ho.create(this, t, this._def);
  }
  transform(t) {
    return new ma({
      ...ue(this._def),
      schema: this,
      typeName: se.ZodEffects,
      effect: { type: "transform", transform: t }
    });
  }
  default(t) {
    const n = typeof t == "function" ? t : () => t;
    return new Ns({
      ...ue(this._def),
      innerType: this,
      defaultValue: n,
      typeName: se.ZodDefault
    });
  }
  brand() {
    return new h8({
      typeName: se.ZodBranded,
      type: this,
      ...ue(this._def)
    });
  }
  catch(t) {
    const n = typeof t == "function" ? t : () => t;
    return new Es({
      ...ue(this._def),
      innerType: this,
      catchValue: n,
      typeName: se.ZodCatch
    });
  }
  describe(t) {
    const n = this.constructor;
    return new n({
      ...this._def,
      description: t
    });
  }
  pipe(t) {
    return Xl.create(this, t);
  }
  readonly() {
    return Rs.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const K5 = /^c[^\s-]{8,}$/i, Y5 = /^[0-9a-z]+$/, Z5 = /^[0-9A-HJKMNP-TV-Z]{26}$/i, X5 = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, q5 = /^[a-z0-9_-]{21}$/i, J5 = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, Q5 = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, e8 = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, t8 = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Di;
const n8 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, a8 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, r8 = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, o8 = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, i8 = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, s8 = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, ug = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", l8 = new RegExp(`^${ug}$`);
function fg(e) {
  let t = "[0-5]\\d";
  e.precision ? t = `${t}\\.\\d{${e.precision}}` : e.precision == null && (t = `${t}(\\.\\d+)?`);
  const n = e.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${t})${n}`;
}
function c8(e) {
  return new RegExp(`^${fg(e)}$`);
}
function d8(e) {
  let t = `${ug}T${fg(e)}`;
  const n = [];
  return n.push(e.local ? "Z?" : "Z"), e.offset && n.push("([+-]\\d{2}:?\\d{2})"), t = `${t}(${n.join("|")})`, new RegExp(`^${t}$`);
}
function u8(e, t) {
  return !!((t === "v4" || !t) && n8.test(e) || (t === "v6" || !t) && r8.test(e));
}
function f8(e, t) {
  if (!J5.test(e))
    return !1;
  try {
    const [n] = e.split(".");
    if (!n)
      return !1;
    const a = n.replace(/-/g, "+").replace(/_/g, "/").padEnd(n.length + (4 - n.length % 4) % 4, "="), r = JSON.parse(atob(a));
    return !(typeof r != "object" || r === null || "typ" in r && r?.typ !== "JWT" || !r.alg || t && r.alg !== t);
  } catch {
    return !1;
  }
}
function p8(e, t) {
  return !!((t === "v4" || !t) && a8.test(e) || (t === "v6" || !t) && o8.test(e));
}
class nn extends me {
  _parse(t) {
    if (this._def.coerce && (t.data = String(t.data)), this._getType(t) !== J.string) {
      const o = this._getOrReturnCtx(t);
      return Z(o, {
        code: F.invalid_type,
        expected: J.string,
        received: o.parsedType
      }), ie;
    }
    const a = new ot();
    let r;
    for (const o of this._def.checks)
      if (o.kind === "min")
        t.data.length < o.value && (r = this._getOrReturnCtx(t, r), Z(r, {
          code: F.too_small,
          minimum: o.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: o.message
        }), a.dirty());
      else if (o.kind === "max")
        t.data.length > o.value && (r = this._getOrReturnCtx(t, r), Z(r, {
          code: F.too_big,
          maximum: o.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: o.message
        }), a.dirty());
      else if (o.kind === "length") {
        const i = t.data.length > o.value, s = t.data.length < o.value;
        (i || s) && (r = this._getOrReturnCtx(t, r), i ? Z(r, {
          code: F.too_big,
          maximum: o.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: o.message
        }) : s && Z(r, {
          code: F.too_small,
          minimum: o.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: o.message
        }), a.dirty());
      } else if (o.kind === "email")
        e8.test(t.data) || (r = this._getOrReturnCtx(t, r), Z(r, {
          validation: "email",
          code: F.invalid_string,
          message: o.message
        }), a.dirty());
      else if (o.kind === "emoji")
        Di || (Di = new RegExp(t8, "u")), Di.test(t.data) || (r = this._getOrReturnCtx(t, r), Z(r, {
          validation: "emoji",
          code: F.invalid_string,
          message: o.message
        }), a.dirty());
      else if (o.kind === "uuid")
        X5.test(t.data) || (r = this._getOrReturnCtx(t, r), Z(r, {
          validation: "uuid",
          code: F.invalid_string,
          message: o.message
        }), a.dirty());
      else if (o.kind === "nanoid")
        q5.test(t.data) || (r = this._getOrReturnCtx(t, r), Z(r, {
          validation: "nanoid",
          code: F.invalid_string,
          message: o.message
        }), a.dirty());
      else if (o.kind === "cuid")
        K5.test(t.data) || (r = this._getOrReturnCtx(t, r), Z(r, {
          validation: "cuid",
          code: F.invalid_string,
          message: o.message
        }), a.dirty());
      else if (o.kind === "cuid2")
        Y5.test(t.data) || (r = this._getOrReturnCtx(t, r), Z(r, {
          validation: "cuid2",
          code: F.invalid_string,
          message: o.message
        }), a.dirty());
      else if (o.kind === "ulid")
        Z5.test(t.data) || (r = this._getOrReturnCtx(t, r), Z(r, {
          validation: "ulid",
          code: F.invalid_string,
          message: o.message
        }), a.dirty());
      else if (o.kind === "url")
        try {
          new URL(t.data);
        } catch {
          r = this._getOrReturnCtx(t, r), Z(r, {
            validation: "url",
            code: F.invalid_string,
            message: o.message
          }), a.dirty();
        }
      else o.kind === "regex" ? (o.regex.lastIndex = 0, o.regex.test(t.data) || (r = this._getOrReturnCtx(t, r), Z(r, {
        validation: "regex",
        code: F.invalid_string,
        message: o.message
      }), a.dirty())) : o.kind === "trim" ? t.data = t.data.trim() : o.kind === "includes" ? t.data.includes(o.value, o.position) || (r = this._getOrReturnCtx(t, r), Z(r, {
        code: F.invalid_string,
        validation: { includes: o.value, position: o.position },
        message: o.message
      }), a.dirty()) : o.kind === "toLowerCase" ? t.data = t.data.toLowerCase() : o.kind === "toUpperCase" ? t.data = t.data.toUpperCase() : o.kind === "startsWith" ? t.data.startsWith(o.value) || (r = this._getOrReturnCtx(t, r), Z(r, {
        code: F.invalid_string,
        validation: { startsWith: o.value },
        message: o.message
      }), a.dirty()) : o.kind === "endsWith" ? t.data.endsWith(o.value) || (r = this._getOrReturnCtx(t, r), Z(r, {
        code: F.invalid_string,
        validation: { endsWith: o.value },
        message: o.message
      }), a.dirty()) : o.kind === "datetime" ? d8(o).test(t.data) || (r = this._getOrReturnCtx(t, r), Z(r, {
        code: F.invalid_string,
        validation: "datetime",
        message: o.message
      }), a.dirty()) : o.kind === "date" ? l8.test(t.data) || (r = this._getOrReturnCtx(t, r), Z(r, {
        code: F.invalid_string,
        validation: "date",
        message: o.message
      }), a.dirty()) : o.kind === "time" ? c8(o).test(t.data) || (r = this._getOrReturnCtx(t, r), Z(r, {
        code: F.invalid_string,
        validation: "time",
        message: o.message
      }), a.dirty()) : o.kind === "duration" ? Q5.test(t.data) || (r = this._getOrReturnCtx(t, r), Z(r, {
        validation: "duration",
        code: F.invalid_string,
        message: o.message
      }), a.dirty()) : o.kind === "ip" ? u8(t.data, o.version) || (r = this._getOrReturnCtx(t, r), Z(r, {
        validation: "ip",
        code: F.invalid_string,
        message: o.message
      }), a.dirty()) : o.kind === "jwt" ? f8(t.data, o.alg) || (r = this._getOrReturnCtx(t, r), Z(r, {
        validation: "jwt",
        code: F.invalid_string,
        message: o.message
      }), a.dirty()) : o.kind === "cidr" ? p8(t.data, o.version) || (r = this._getOrReturnCtx(t, r), Z(r, {
        validation: "cidr",
        code: F.invalid_string,
        message: o.message
      }), a.dirty()) : o.kind === "base64" ? i8.test(t.data) || (r = this._getOrReturnCtx(t, r), Z(r, {
        validation: "base64",
        code: F.invalid_string,
        message: o.message
      }), a.dirty()) : o.kind === "base64url" ? s8.test(t.data) || (r = this._getOrReturnCtx(t, r), Z(r, {
        validation: "base64url",
        code: F.invalid_string,
        message: o.message
      }), a.dirty()) : ge.assertNever(o);
    return { status: a.value, value: t.data };
  }
  _regex(t, n, a) {
    return this.refinement((r) => t.test(r), {
      validation: n,
      code: F.invalid_string,
      ...ee.errToObj(a)
    });
  }
  _addCheck(t) {
    return new nn({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  email(t) {
    return this._addCheck({ kind: "email", ...ee.errToObj(t) });
  }
  url(t) {
    return this._addCheck({ kind: "url", ...ee.errToObj(t) });
  }
  emoji(t) {
    return this._addCheck({ kind: "emoji", ...ee.errToObj(t) });
  }
  uuid(t) {
    return this._addCheck({ kind: "uuid", ...ee.errToObj(t) });
  }
  nanoid(t) {
    return this._addCheck({ kind: "nanoid", ...ee.errToObj(t) });
  }
  cuid(t) {
    return this._addCheck({ kind: "cuid", ...ee.errToObj(t) });
  }
  cuid2(t) {
    return this._addCheck({ kind: "cuid2", ...ee.errToObj(t) });
  }
  ulid(t) {
    return this._addCheck({ kind: "ulid", ...ee.errToObj(t) });
  }
  base64(t) {
    return this._addCheck({ kind: "base64", ...ee.errToObj(t) });
  }
  base64url(t) {
    return this._addCheck({
      kind: "base64url",
      ...ee.errToObj(t)
    });
  }
  jwt(t) {
    return this._addCheck({ kind: "jwt", ...ee.errToObj(t) });
  }
  ip(t) {
    return this._addCheck({ kind: "ip", ...ee.errToObj(t) });
  }
  cidr(t) {
    return this._addCheck({ kind: "cidr", ...ee.errToObj(t) });
  }
  datetime(t) {
    return typeof t == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: t
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof t?.precision > "u" ? null : t?.precision,
      offset: t?.offset ?? !1,
      local: t?.local ?? !1,
      ...ee.errToObj(t?.message)
    });
  }
  date(t) {
    return this._addCheck({ kind: "date", message: t });
  }
  time(t) {
    return typeof t == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: t
    }) : this._addCheck({
      kind: "time",
      precision: typeof t?.precision > "u" ? null : t?.precision,
      ...ee.errToObj(t?.message)
    });
  }
  duration(t) {
    return this._addCheck({ kind: "duration", ...ee.errToObj(t) });
  }
  regex(t, n) {
    return this._addCheck({
      kind: "regex",
      regex: t,
      ...ee.errToObj(n)
    });
  }
  includes(t, n) {
    return this._addCheck({
      kind: "includes",
      value: t,
      position: n?.position,
      ...ee.errToObj(n?.message)
    });
  }
  startsWith(t, n) {
    return this._addCheck({
      kind: "startsWith",
      value: t,
      ...ee.errToObj(n)
    });
  }
  endsWith(t, n) {
    return this._addCheck({
      kind: "endsWith",
      value: t,
      ...ee.errToObj(n)
    });
  }
  min(t, n) {
    return this._addCheck({
      kind: "min",
      value: t,
      ...ee.errToObj(n)
    });
  }
  max(t, n) {
    return this._addCheck({
      kind: "max",
      value: t,
      ...ee.errToObj(n)
    });
  }
  length(t, n) {
    return this._addCheck({
      kind: "length",
      value: t,
      ...ee.errToObj(n)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(t) {
    return this.min(1, ee.errToObj(t));
  }
  trim() {
    return new nn({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new nn({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new nn({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((t) => t.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((t) => t.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((t) => t.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((t) => t.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((t) => t.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((t) => t.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((t) => t.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((t) => t.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((t) => t.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((t) => t.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((t) => t.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((t) => t.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((t) => t.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((t) => t.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((t) => t.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((t) => t.kind === "base64url");
  }
  get minLength() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "min" && (t === null || n.value > t) && (t = n.value);
    return t;
  }
  get maxLength() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    return t;
  }
}
nn.create = (e) => new nn({
  checks: [],
  typeName: se.ZodString,
  coerce: e?.coerce ?? !1,
  ...ue(e)
});
function m8(e, t) {
  const n = (e.toString().split(".")[1] || "").length, a = (t.toString().split(".")[1] || "").length, r = n > a ? n : a, o = Number.parseInt(e.toFixed(r).replace(".", "")), i = Number.parseInt(t.toFixed(r).replace(".", ""));
  return o % i / 10 ** r;
}
class ar extends me {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(t) {
    if (this._def.coerce && (t.data = Number(t.data)), this._getType(t) !== J.number) {
      const o = this._getOrReturnCtx(t);
      return Z(o, {
        code: F.invalid_type,
        expected: J.number,
        received: o.parsedType
      }), ie;
    }
    let a;
    const r = new ot();
    for (const o of this._def.checks)
      o.kind === "int" ? ge.isInteger(t.data) || (a = this._getOrReturnCtx(t, a), Z(a, {
        code: F.invalid_type,
        expected: "integer",
        received: "float",
        message: o.message
      }), r.dirty()) : o.kind === "min" ? (o.inclusive ? t.data < o.value : t.data <= o.value) && (a = this._getOrReturnCtx(t, a), Z(a, {
        code: F.too_small,
        minimum: o.value,
        type: "number",
        inclusive: o.inclusive,
        exact: !1,
        message: o.message
      }), r.dirty()) : o.kind === "max" ? (o.inclusive ? t.data > o.value : t.data >= o.value) && (a = this._getOrReturnCtx(t, a), Z(a, {
        code: F.too_big,
        maximum: o.value,
        type: "number",
        inclusive: o.inclusive,
        exact: !1,
        message: o.message
      }), r.dirty()) : o.kind === "multipleOf" ? m8(t.data, o.value) !== 0 && (a = this._getOrReturnCtx(t, a), Z(a, {
        code: F.not_multiple_of,
        multipleOf: o.value,
        message: o.message
      }), r.dirty()) : o.kind === "finite" ? Number.isFinite(t.data) || (a = this._getOrReturnCtx(t, a), Z(a, {
        code: F.not_finite,
        message: o.message
      }), r.dirty()) : ge.assertNever(o);
    return { status: r.value, value: t.data };
  }
  gte(t, n) {
    return this.setLimit("min", t, !0, ee.toString(n));
  }
  gt(t, n) {
    return this.setLimit("min", t, !1, ee.toString(n));
  }
  lte(t, n) {
    return this.setLimit("max", t, !0, ee.toString(n));
  }
  lt(t, n) {
    return this.setLimit("max", t, !1, ee.toString(n));
  }
  setLimit(t, n, a, r) {
    return new ar({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: t,
          value: n,
          inclusive: a,
          message: ee.toString(r)
        }
      ]
    });
  }
  _addCheck(t) {
    return new ar({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  int(t) {
    return this._addCheck({
      kind: "int",
      message: ee.toString(t)
    });
  }
  positive(t) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: ee.toString(t)
    });
  }
  negative(t) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: ee.toString(t)
    });
  }
  nonpositive(t) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: ee.toString(t)
    });
  }
  nonnegative(t) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: ee.toString(t)
    });
  }
  multipleOf(t, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: t,
      message: ee.toString(n)
    });
  }
  finite(t) {
    return this._addCheck({
      kind: "finite",
      message: ee.toString(t)
    });
  }
  safe(t) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: ee.toString(t)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: ee.toString(t)
    });
  }
  get minValue() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "min" && (t === null || n.value > t) && (t = n.value);
    return t;
  }
  get maxValue() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    return t;
  }
  get isInt() {
    return !!this._def.checks.find((t) => t.kind === "int" || t.kind === "multipleOf" && ge.isInteger(t.value));
  }
  get isFinite() {
    let t = null, n = null;
    for (const a of this._def.checks) {
      if (a.kind === "finite" || a.kind === "int" || a.kind === "multipleOf")
        return !0;
      a.kind === "min" ? (n === null || a.value > n) && (n = a.value) : a.kind === "max" && (t === null || a.value < t) && (t = a.value);
    }
    return Number.isFinite(n) && Number.isFinite(t);
  }
}
ar.create = (e) => new ar({
  checks: [],
  typeName: se.ZodNumber,
  coerce: e?.coerce || !1,
  ...ue(e)
});
class rr extends me {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(t) {
    if (this._def.coerce)
      try {
        t.data = BigInt(t.data);
      } catch {
        return this._getInvalidInput(t);
      }
    if (this._getType(t) !== J.bigint)
      return this._getInvalidInput(t);
    let a;
    const r = new ot();
    for (const o of this._def.checks)
      o.kind === "min" ? (o.inclusive ? t.data < o.value : t.data <= o.value) && (a = this._getOrReturnCtx(t, a), Z(a, {
        code: F.too_small,
        type: "bigint",
        minimum: o.value,
        inclusive: o.inclusive,
        message: o.message
      }), r.dirty()) : o.kind === "max" ? (o.inclusive ? t.data > o.value : t.data >= o.value) && (a = this._getOrReturnCtx(t, a), Z(a, {
        code: F.too_big,
        type: "bigint",
        maximum: o.value,
        inclusive: o.inclusive,
        message: o.message
      }), r.dirty()) : o.kind === "multipleOf" ? t.data % o.value !== BigInt(0) && (a = this._getOrReturnCtx(t, a), Z(a, {
        code: F.not_multiple_of,
        multipleOf: o.value,
        message: o.message
      }), r.dirty()) : ge.assertNever(o);
    return { status: r.value, value: t.data };
  }
  _getInvalidInput(t) {
    const n = this._getOrReturnCtx(t);
    return Z(n, {
      code: F.invalid_type,
      expected: J.bigint,
      received: n.parsedType
    }), ie;
  }
  gte(t, n) {
    return this.setLimit("min", t, !0, ee.toString(n));
  }
  gt(t, n) {
    return this.setLimit("min", t, !1, ee.toString(n));
  }
  lte(t, n) {
    return this.setLimit("max", t, !0, ee.toString(n));
  }
  lt(t, n) {
    return this.setLimit("max", t, !1, ee.toString(n));
  }
  setLimit(t, n, a, r) {
    return new rr({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: t,
          value: n,
          inclusive: a,
          message: ee.toString(r)
        }
      ]
    });
  }
  _addCheck(t) {
    return new rr({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  positive(t) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: ee.toString(t)
    });
  }
  negative(t) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: ee.toString(t)
    });
  }
  nonpositive(t) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: ee.toString(t)
    });
  }
  nonnegative(t) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: ee.toString(t)
    });
  }
  multipleOf(t, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: t,
      message: ee.toString(n)
    });
  }
  get minValue() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "min" && (t === null || n.value > t) && (t = n.value);
    return t;
  }
  get maxValue() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    return t;
  }
}
rr.create = (e) => new rr({
  checks: [],
  typeName: se.ZodBigInt,
  coerce: e?.coerce ?? !1,
  ...ue(e)
});
class jd extends me {
  _parse(t) {
    if (this._def.coerce && (t.data = !!t.data), this._getType(t) !== J.boolean) {
      const a = this._getOrReturnCtx(t);
      return Z(a, {
        code: F.invalid_type,
        expected: J.boolean,
        received: a.parsedType
      }), ie;
    }
    return ct(t.data);
  }
}
jd.create = (e) => new jd({
  typeName: se.ZodBoolean,
  coerce: e?.coerce || !1,
  ...ue(e)
});
class po extends me {
  _parse(t) {
    if (this._def.coerce && (t.data = new Date(t.data)), this._getType(t) !== J.date) {
      const o = this._getOrReturnCtx(t);
      return Z(o, {
        code: F.invalid_type,
        expected: J.date,
        received: o.parsedType
      }), ie;
    }
    if (Number.isNaN(t.data.getTime())) {
      const o = this._getOrReturnCtx(t);
      return Z(o, {
        code: F.invalid_date
      }), ie;
    }
    const a = new ot();
    let r;
    for (const o of this._def.checks)
      o.kind === "min" ? t.data.getTime() < o.value && (r = this._getOrReturnCtx(t, r), Z(r, {
        code: F.too_small,
        message: o.message,
        inclusive: !0,
        exact: !1,
        minimum: o.value,
        type: "date"
      }), a.dirty()) : o.kind === "max" ? t.data.getTime() > o.value && (r = this._getOrReturnCtx(t, r), Z(r, {
        code: F.too_big,
        message: o.message,
        inclusive: !0,
        exact: !1,
        maximum: o.value,
        type: "date"
      }), a.dirty()) : ge.assertNever(o);
    return {
      status: a.value,
      value: new Date(t.data.getTime())
    };
  }
  _addCheck(t) {
    return new po({
      ...this._def,
      checks: [...this._def.checks, t]
    });
  }
  min(t, n) {
    return this._addCheck({
      kind: "min",
      value: t.getTime(),
      message: ee.toString(n)
    });
  }
  max(t, n) {
    return this._addCheck({
      kind: "max",
      value: t.getTime(),
      message: ee.toString(n)
    });
  }
  get minDate() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "min" && (t === null || n.value > t) && (t = n.value);
    return t != null ? new Date(t) : null;
  }
  get maxDate() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    return t != null ? new Date(t) : null;
  }
}
po.create = (e) => new po({
  checks: [],
  coerce: e?.coerce || !1,
  typeName: se.ZodDate,
  ...ue(e)
});
class Md extends me {
  _parse(t) {
    if (this._getType(t) !== J.symbol) {
      const a = this._getOrReturnCtx(t);
      return Z(a, {
        code: F.invalid_type,
        expected: J.symbol,
        received: a.parsedType
      }), ie;
    }
    return ct(t.data);
  }
}
Md.create = (e) => new Md({
  typeName: se.ZodSymbol,
  ...ue(e)
});
class Od extends me {
  _parse(t) {
    if (this._getType(t) !== J.undefined) {
      const a = this._getOrReturnCtx(t);
      return Z(a, {
        code: F.invalid_type,
        expected: J.undefined,
        received: a.parsedType
      }), ie;
    }
    return ct(t.data);
  }
}
Od.create = (e) => new Od({
  typeName: se.ZodUndefined,
  ...ue(e)
});
class Dd extends me {
  _parse(t) {
    if (this._getType(t) !== J.null) {
      const a = this._getOrReturnCtx(t);
      return Z(a, {
        code: F.invalid_type,
        expected: J.null,
        received: a.parsedType
      }), ie;
    }
    return ct(t.data);
  }
}
Dd.create = (e) => new Dd({
  typeName: se.ZodNull,
  ...ue(e)
});
class Id extends me {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(t) {
    return ct(t.data);
  }
}
Id.create = (e) => new Id({
  typeName: se.ZodAny,
  ...ue(e)
});
class Ld extends me {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(t) {
    return ct(t.data);
  }
}
Ld.create = (e) => new Ld({
  typeName: se.ZodUnknown,
  ...ue(e)
});
class fn extends me {
  _parse(t) {
    const n = this._getOrReturnCtx(t);
    return Z(n, {
      code: F.invalid_type,
      expected: J.never,
      received: n.parsedType
    }), ie;
  }
}
fn.create = (e) => new fn({
  typeName: se.ZodNever,
  ...ue(e)
});
class Fd extends me {
  _parse(t) {
    if (this._getType(t) !== J.undefined) {
      const a = this._getOrReturnCtx(t);
      return Z(a, {
        code: F.invalid_type,
        expected: J.void,
        received: a.parsedType
      }), ie;
    }
    return ct(t.data);
  }
}
Fd.create = (e) => new Fd({
  typeName: se.ZodVoid,
  ...ue(e)
});
class Pt extends me {
  _parse(t) {
    const { ctx: n, status: a } = this._processInputParams(t), r = this._def;
    if (n.parsedType !== J.array)
      return Z(n, {
        code: F.invalid_type,
        expected: J.array,
        received: n.parsedType
      }), ie;
    if (r.exactLength !== null) {
      const i = n.data.length > r.exactLength.value, s = n.data.length < r.exactLength.value;
      (i || s) && (Z(n, {
        code: i ? F.too_big : F.too_small,
        minimum: s ? r.exactLength.value : void 0,
        maximum: i ? r.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: r.exactLength.message
      }), a.dirty());
    }
    if (r.minLength !== null && n.data.length < r.minLength.value && (Z(n, {
      code: F.too_small,
      minimum: r.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: r.minLength.message
    }), a.dirty()), r.maxLength !== null && n.data.length > r.maxLength.value && (Z(n, {
      code: F.too_big,
      maximum: r.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: r.maxLength.message
    }), a.dirty()), n.common.async)
      return Promise.all([...n.data].map((i, s) => r.type._parseAsync(new un(n, i, n.path, s)))).then((i) => ot.mergeArray(a, i));
    const o = [...n.data].map((i, s) => r.type._parseSync(new un(n, i, n.path, s)));
    return ot.mergeArray(a, o);
  }
  get element() {
    return this._def.type;
  }
  min(t, n) {
    return new Pt({
      ...this._def,
      minLength: { value: t, message: ee.toString(n) }
    });
  }
  max(t, n) {
    return new Pt({
      ...this._def,
      maxLength: { value: t, message: ee.toString(n) }
    });
  }
  length(t, n) {
    return new Pt({
      ...this._def,
      exactLength: { value: t, message: ee.toString(n) }
    });
  }
  nonempty(t) {
    return this.min(1, t);
  }
}
Pt.create = (e, t) => new Pt({
  type: e,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: se.ZodArray,
  ...ue(t)
});
function Jn(e) {
  if (e instanceof Ie) {
    const t = {};
    for (const n in e.shape) {
      const a = e.shape[n];
      t[n] = rn.create(Jn(a));
    }
    return new Ie({
      ...e._def,
      shape: () => t
    });
  } else return e instanceof Pt ? new Pt({
    ...e._def,
    type: Jn(e.element)
  }) : e instanceof rn ? rn.create(Jn(e.unwrap())) : e instanceof ha ? ha.create(Jn(e.unwrap())) : e instanceof Mn ? Mn.create(e.items.map((t) => Jn(t))) : e;
}
class Ie extends me {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const t = this._def.shape(), n = ge.objectKeys(t);
    return this._cached = { shape: t, keys: n }, this._cached;
  }
  _parse(t) {
    if (this._getType(t) !== J.object) {
      const d = this._getOrReturnCtx(t);
      return Z(d, {
        code: F.invalid_type,
        expected: J.object,
        received: d.parsedType
      }), ie;
    }
    const { status: a, ctx: r } = this._processInputParams(t), { shape: o, keys: i } = this._getCached(), s = [];
    if (!(this._def.catchall instanceof fn && this._def.unknownKeys === "strip"))
      for (const d in r.data)
        i.includes(d) || s.push(d);
    const c = [];
    for (const d of i) {
      const u = o[d], p = r.data[d];
      c.push({
        key: { status: "valid", value: d },
        value: u._parse(new un(r, p, r.path, d)),
        alwaysSet: d in r.data
      });
    }
    if (this._def.catchall instanceof fn) {
      const d = this._def.unknownKeys;
      if (d === "passthrough")
        for (const u of s)
          c.push({
            key: { status: "valid", value: u },
            value: { status: "valid", value: r.data[u] }
          });
      else if (d === "strict")
        s.length > 0 && (Z(r, {
          code: F.unrecognized_keys,
          keys: s
        }), a.dirty());
      else if (d !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const d = this._def.catchall;
      for (const u of s) {
        const p = r.data[u];
        c.push({
          key: { status: "valid", value: u },
          value: d._parse(
            new un(r, p, r.path, u)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: u in r.data
        });
      }
    }
    return r.common.async ? Promise.resolve().then(async () => {
      const d = [];
      for (const u of c) {
        const p = await u.key, m = await u.value;
        d.push({
          key: p,
          value: m,
          alwaysSet: u.alwaysSet
        });
      }
      return d;
    }).then((d) => ot.mergeObjectSync(a, d)) : ot.mergeObjectSync(a, c);
  }
  get shape() {
    return this._def.shape();
  }
  strict(t) {
    return ee.errToObj, new Ie({
      ...this._def,
      unknownKeys: "strict",
      ...t !== void 0 ? {
        errorMap: (n, a) => {
          const r = this._def.errorMap?.(n, a).message ?? a.defaultError;
          return n.code === "unrecognized_keys" ? {
            message: ee.errToObj(t).message ?? r
          } : {
            message: r
          };
        }
      } : {}
    });
  }
  strip() {
    return new Ie({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new Ie({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(t) {
    return new Ie({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...t
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(t) {
    return new Ie({
      unknownKeys: t._def.unknownKeys,
      catchall: t._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...t._def.shape()
      }),
      typeName: se.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(t, n) {
    return this.augment({ [t]: n });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(t) {
    return new Ie({
      ...this._def,
      catchall: t
    });
  }
  pick(t) {
    const n = {};
    for (const a of ge.objectKeys(t))
      t[a] && this.shape[a] && (n[a] = this.shape[a]);
    return new Ie({
      ...this._def,
      shape: () => n
    });
  }
  omit(t) {
    const n = {};
    for (const a of ge.objectKeys(this.shape))
      t[a] || (n[a] = this.shape[a]);
    return new Ie({
      ...this._def,
      shape: () => n
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return Jn(this);
  }
  partial(t) {
    const n = {};
    for (const a of ge.objectKeys(this.shape)) {
      const r = this.shape[a];
      t && !t[a] ? n[a] = r : n[a] = r.optional();
    }
    return new Ie({
      ...this._def,
      shape: () => n
    });
  }
  required(t) {
    const n = {};
    for (const a of ge.objectKeys(this.shape))
      if (t && !t[a])
        n[a] = this.shape[a];
      else {
        let o = this.shape[a];
        for (; o instanceof rn; )
          o = o._def.innerType;
        n[a] = o;
      }
    return new Ie({
      ...this._def,
      shape: () => n
    });
  }
  keyof() {
    return pg(ge.objectKeys(this.shape));
  }
}
Ie.create = (e, t) => new Ie({
  shape: () => e,
  unknownKeys: "strip",
  catchall: fn.create(),
  typeName: se.ZodObject,
  ...ue(t)
});
Ie.strictCreate = (e, t) => new Ie({
  shape: () => e,
  unknownKeys: "strict",
  catchall: fn.create(),
  typeName: se.ZodObject,
  ...ue(t)
});
Ie.lazycreate = (e, t) => new Ie({
  shape: e,
  unknownKeys: "strip",
  catchall: fn.create(),
  typeName: se.ZodObject,
  ...ue(t)
});
class mo extends me {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t), a = this._def.options;
    function r(o) {
      for (const s of o)
        if (s.result.status === "valid")
          return s.result;
      for (const s of o)
        if (s.result.status === "dirty")
          return n.common.issues.push(...s.ctx.common.issues), s.result;
      const i = o.map((s) => new Kt(s.ctx.common.issues));
      return Z(n, {
        code: F.invalid_union,
        unionErrors: i
      }), ie;
    }
    if (n.common.async)
      return Promise.all(a.map(async (o) => {
        const i = {
          ...n,
          common: {
            ...n.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await o._parseAsync({
            data: n.data,
            path: n.path,
            parent: i
          }),
          ctx: i
        };
      })).then(r);
    {
      let o;
      const i = [];
      for (const c of a) {
        const d = {
          ...n,
          common: {
            ...n.common,
            issues: []
          },
          parent: null
        }, u = c._parseSync({
          data: n.data,
          path: n.path,
          parent: d
        });
        if (u.status === "valid")
          return u;
        u.status === "dirty" && !o && (o = { result: u, ctx: d }), d.common.issues.length && i.push(d.common.issues);
      }
      if (o)
        return n.common.issues.push(...o.ctx.common.issues), o.result;
      const s = i.map((c) => new Kt(c));
      return Z(n, {
        code: F.invalid_union,
        unionErrors: s
      }), ie;
    }
  }
  get options() {
    return this._def.options;
  }
}
mo.create = (e, t) => new mo({
  options: e,
  typeName: se.ZodUnion,
  ...ue(t)
});
function _s(e, t) {
  const n = en(e), a = en(t);
  if (e === t)
    return { valid: !0, data: e };
  if (n === J.object && a === J.object) {
    const r = ge.objectKeys(t), o = ge.objectKeys(e).filter((s) => r.indexOf(s) !== -1), i = { ...e, ...t };
    for (const s of o) {
      const c = _s(e[s], t[s]);
      if (!c.valid)
        return { valid: !1 };
      i[s] = c.data;
    }
    return { valid: !0, data: i };
  } else if (n === J.array && a === J.array) {
    if (e.length !== t.length)
      return { valid: !1 };
    const r = [];
    for (let o = 0; o < e.length; o++) {
      const i = e[o], s = t[o], c = _s(i, s);
      if (!c.valid)
        return { valid: !1 };
      r.push(c.data);
    }
    return { valid: !0, data: r };
  } else return n === J.date && a === J.date && +e == +t ? { valid: !0, data: e } : { valid: !1 };
}
class ho extends me {
  _parse(t) {
    const { status: n, ctx: a } = this._processInputParams(t), r = (o, i) => {
      if (kd(o) || kd(i))
        return ie;
      const s = _s(o.value, i.value);
      return s.valid ? ((Td(o) || Td(i)) && n.dirty(), { status: n.value, value: s.data }) : (Z(a, {
        code: F.invalid_intersection_types
      }), ie);
    };
    return a.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: a.data,
        path: a.path,
        parent: a
      }),
      this._def.right._parseAsync({
        data: a.data,
        path: a.path,
        parent: a
      })
    ]).then(([o, i]) => r(o, i)) : r(this._def.left._parseSync({
      data: a.data,
      path: a.path,
      parent: a
    }), this._def.right._parseSync({
      data: a.data,
      path: a.path,
      parent: a
    }));
  }
}
ho.create = (e, t, n) => new ho({
  left: e,
  right: t,
  typeName: se.ZodIntersection,
  ...ue(n)
});
class Mn extends me {
  _parse(t) {
    const { status: n, ctx: a } = this._processInputParams(t);
    if (a.parsedType !== J.array)
      return Z(a, {
        code: F.invalid_type,
        expected: J.array,
        received: a.parsedType
      }), ie;
    if (a.data.length < this._def.items.length)
      return Z(a, {
        code: F.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), ie;
    !this._def.rest && a.data.length > this._def.items.length && (Z(a, {
      code: F.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), n.dirty());
    const o = [...a.data].map((i, s) => {
      const c = this._def.items[s] || this._def.rest;
      return c ? c._parse(new un(a, i, a.path, s)) : null;
    }).filter((i) => !!i);
    return a.common.async ? Promise.all(o).then((i) => ot.mergeArray(n, i)) : ot.mergeArray(n, o);
  }
  get items() {
    return this._def.items;
  }
  rest(t) {
    return new Mn({
      ...this._def,
      rest: t
    });
  }
}
Mn.create = (e, t) => {
  if (!Array.isArray(e))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new Mn({
    items: e,
    typeName: se.ZodTuple,
    rest: null,
    ...ue(t)
  });
};
class Bd extends me {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(t) {
    const { status: n, ctx: a } = this._processInputParams(t);
    if (a.parsedType !== J.map)
      return Z(a, {
        code: F.invalid_type,
        expected: J.map,
        received: a.parsedType
      }), ie;
    const r = this._def.keyType, o = this._def.valueType, i = [...a.data.entries()].map(([s, c], d) => ({
      key: r._parse(new un(a, s, a.path, [d, "key"])),
      value: o._parse(new un(a, c, a.path, [d, "value"]))
    }));
    if (a.common.async) {
      const s = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const c of i) {
          const d = await c.key, u = await c.value;
          if (d.status === "aborted" || u.status === "aborted")
            return ie;
          (d.status === "dirty" || u.status === "dirty") && n.dirty(), s.set(d.value, u.value);
        }
        return { status: n.value, value: s };
      });
    } else {
      const s = /* @__PURE__ */ new Map();
      for (const c of i) {
        const d = c.key, u = c.value;
        if (d.status === "aborted" || u.status === "aborted")
          return ie;
        (d.status === "dirty" || u.status === "dirty") && n.dirty(), s.set(d.value, u.value);
      }
      return { status: n.value, value: s };
    }
  }
}
Bd.create = (e, t, n) => new Bd({
  valueType: t,
  keyType: e,
  typeName: se.ZodMap,
  ...ue(n)
});
class or extends me {
  _parse(t) {
    const { status: n, ctx: a } = this._processInputParams(t);
    if (a.parsedType !== J.set)
      return Z(a, {
        code: F.invalid_type,
        expected: J.set,
        received: a.parsedType
      }), ie;
    const r = this._def;
    r.minSize !== null && a.data.size < r.minSize.value && (Z(a, {
      code: F.too_small,
      minimum: r.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: r.minSize.message
    }), n.dirty()), r.maxSize !== null && a.data.size > r.maxSize.value && (Z(a, {
      code: F.too_big,
      maximum: r.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: r.maxSize.message
    }), n.dirty());
    const o = this._def.valueType;
    function i(c) {
      const d = /* @__PURE__ */ new Set();
      for (const u of c) {
        if (u.status === "aborted")
          return ie;
        u.status === "dirty" && n.dirty(), d.add(u.value);
      }
      return { status: n.value, value: d };
    }
    const s = [...a.data.values()].map((c, d) => o._parse(new un(a, c, a.path, d)));
    return a.common.async ? Promise.all(s).then((c) => i(c)) : i(s);
  }
  min(t, n) {
    return new or({
      ...this._def,
      minSize: { value: t, message: ee.toString(n) }
    });
  }
  max(t, n) {
    return new or({
      ...this._def,
      maxSize: { value: t, message: ee.toString(n) }
    });
  }
  size(t, n) {
    return this.min(t, n).max(t, n);
  }
  nonempty(t) {
    return this.min(1, t);
  }
}
or.create = (e, t) => new or({
  valueType: e,
  minSize: null,
  maxSize: null,
  typeName: se.ZodSet,
  ...ue(t)
});
class Ud extends me {
  get schema() {
    return this._def.getter();
  }
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    return this._def.getter()._parse({ data: n.data, path: n.path, parent: n });
  }
}
Ud.create = (e, t) => new Ud({
  getter: e,
  typeName: se.ZodLazy,
  ...ue(t)
});
class Gd extends me {
  _parse(t) {
    if (t.data !== this._def.value) {
      const n = this._getOrReturnCtx(t);
      return Z(n, {
        received: n.data,
        code: F.invalid_literal,
        expected: this._def.value
      }), ie;
    }
    return { status: "valid", value: t.data };
  }
  get value() {
    return this._def.value;
  }
}
Gd.create = (e, t) => new Gd({
  value: e,
  typeName: se.ZodLiteral,
  ...ue(t)
});
function pg(e, t) {
  return new pa({
    values: e,
    typeName: se.ZodEnum,
    ...ue(t)
  });
}
class pa extends me {
  _parse(t) {
    if (typeof t.data != "string") {
      const n = this._getOrReturnCtx(t), a = this._def.values;
      return Z(n, {
        expected: ge.joinValues(a),
        received: n.parsedType,
        code: F.invalid_type
      }), ie;
    }
    if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(t.data)) {
      const n = this._getOrReturnCtx(t), a = this._def.values;
      return Z(n, {
        received: n.data,
        code: F.invalid_enum_value,
        options: a
      }), ie;
    }
    return ct(t.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const t = {};
    for (const n of this._def.values)
      t[n] = n;
    return t;
  }
  get Values() {
    const t = {};
    for (const n of this._def.values)
      t[n] = n;
    return t;
  }
  get Enum() {
    const t = {};
    for (const n of this._def.values)
      t[n] = n;
    return t;
  }
  extract(t, n = this._def) {
    return pa.create(t, {
      ...this._def,
      ...n
    });
  }
  exclude(t, n = this._def) {
    return pa.create(this.options.filter((a) => !t.includes(a)), {
      ...this._def,
      ...n
    });
  }
}
pa.create = pg;
class Wd extends me {
  _parse(t) {
    const n = ge.getValidEnumValues(this._def.values), a = this._getOrReturnCtx(t);
    if (a.parsedType !== J.string && a.parsedType !== J.number) {
      const r = ge.objectValues(n);
      return Z(a, {
        expected: ge.joinValues(r),
        received: a.parsedType,
        code: F.invalid_type
      }), ie;
    }
    if (this._cache || (this._cache = new Set(ge.getValidEnumValues(this._def.values))), !this._cache.has(t.data)) {
      const r = ge.objectValues(n);
      return Z(a, {
        received: a.data,
        code: F.invalid_enum_value,
        options: r
      }), ie;
    }
    return ct(t.data);
  }
  get enum() {
    return this._def.values;
  }
}
Wd.create = (e, t) => new Wd({
  values: e,
  typeName: se.ZodNativeEnum,
  ...ue(t)
});
class go extends me {
  unwrap() {
    return this._def.type;
  }
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    if (n.parsedType !== J.promise && n.common.async === !1)
      return Z(n, {
        code: F.invalid_type,
        expected: J.promise,
        received: n.parsedType
      }), ie;
    const a = n.parsedType === J.promise ? n.data : Promise.resolve(n.data);
    return ct(a.then((r) => this._def.type.parseAsync(r, {
      path: n.path,
      errorMap: n.common.contextualErrorMap
    })));
  }
}
go.create = (e, t) => new go({
  type: e,
  typeName: se.ZodPromise,
  ...ue(t)
});
class ma extends me {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === se.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(t) {
    const { status: n, ctx: a } = this._processInputParams(t), r = this._def.effect || null, o = {
      addIssue: (i) => {
        Z(a, i), i.fatal ? n.abort() : n.dirty();
      },
      get path() {
        return a.path;
      }
    };
    if (o.addIssue = o.addIssue.bind(o), r.type === "preprocess") {
      const i = r.transform(a.data, o);
      if (a.common.async)
        return Promise.resolve(i).then(async (s) => {
          if (n.value === "aborted")
            return ie;
          const c = await this._def.schema._parseAsync({
            data: s,
            path: a.path,
            parent: a
          });
          return c.status === "aborted" ? ie : c.status === "dirty" || n.value === "dirty" ? Ba(c.value) : c;
        });
      {
        if (n.value === "aborted")
          return ie;
        const s = this._def.schema._parseSync({
          data: i,
          path: a.path,
          parent: a
        });
        return s.status === "aborted" ? ie : s.status === "dirty" || n.value === "dirty" ? Ba(s.value) : s;
      }
    }
    if (r.type === "refinement") {
      const i = (s) => {
        const c = r.refinement(s, o);
        if (a.common.async)
          return Promise.resolve(c);
        if (c instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return s;
      };
      if (a.common.async === !1) {
        const s = this._def.schema._parseSync({
          data: a.data,
          path: a.path,
          parent: a
        });
        return s.status === "aborted" ? ie : (s.status === "dirty" && n.dirty(), i(s.value), { status: n.value, value: s.value });
      } else
        return this._def.schema._parseAsync({ data: a.data, path: a.path, parent: a }).then((s) => s.status === "aborted" ? ie : (s.status === "dirty" && n.dirty(), i(s.value).then(() => ({ status: n.value, value: s.value }))));
    }
    if (r.type === "transform")
      if (a.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: a.data,
          path: a.path,
          parent: a
        });
        if (!fa(i))
          return ie;
        const s = r.transform(i.value, o);
        if (s instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: n.value, value: s };
      } else
        return this._def.schema._parseAsync({ data: a.data, path: a.path, parent: a }).then((i) => fa(i) ? Promise.resolve(r.transform(i.value, o)).then((s) => ({
          status: n.value,
          value: s
        })) : ie);
    ge.assertNever(r);
  }
}
ma.create = (e, t, n) => new ma({
  schema: e,
  typeName: se.ZodEffects,
  effect: t,
  ...ue(n)
});
ma.createWithPreprocess = (e, t, n) => new ma({
  schema: t,
  effect: { type: "preprocess", transform: e },
  typeName: se.ZodEffects,
  ...ue(n)
});
class rn extends me {
  _parse(t) {
    return this._getType(t) === J.undefined ? ct(void 0) : this._def.innerType._parse(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
rn.create = (e, t) => new rn({
  innerType: e,
  typeName: se.ZodOptional,
  ...ue(t)
});
class ha extends me {
  _parse(t) {
    return this._getType(t) === J.null ? ct(null) : this._def.innerType._parse(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ha.create = (e, t) => new ha({
  innerType: e,
  typeName: se.ZodNullable,
  ...ue(t)
});
class Ns extends me {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    let a = n.data;
    return n.parsedType === J.undefined && (a = this._def.defaultValue()), this._def.innerType._parse({
      data: a,
      path: n.path,
      parent: n
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
Ns.create = (e, t) => new Ns({
  innerType: e,
  typeName: se.ZodDefault,
  defaultValue: typeof t.default == "function" ? t.default : () => t.default,
  ...ue(t)
});
class Es extends me {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t), a = {
      ...n,
      common: {
        ...n.common,
        issues: []
      }
    }, r = this._def.innerType._parse({
      data: a.data,
      path: a.path,
      parent: {
        ...a
      }
    });
    return fo(r) ? r.then((o) => ({
      status: "valid",
      value: o.status === "valid" ? o.value : this._def.catchValue({
        get error() {
          return new Kt(a.common.issues);
        },
        input: a.data
      })
    })) : {
      status: "valid",
      value: r.status === "valid" ? r.value : this._def.catchValue({
        get error() {
          return new Kt(a.common.issues);
        },
        input: a.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
Es.create = (e, t) => new Es({
  innerType: e,
  typeName: se.ZodCatch,
  catchValue: typeof t.catch == "function" ? t.catch : () => t.catch,
  ...ue(t)
});
class Hd extends me {
  _parse(t) {
    if (this._getType(t) !== J.nan) {
      const a = this._getOrReturnCtx(t);
      return Z(a, {
        code: F.invalid_type,
        expected: J.nan,
        received: a.parsedType
      }), ie;
    }
    return { status: "valid", value: t.data };
  }
}
Hd.create = (e) => new Hd({
  typeName: se.ZodNaN,
  ...ue(e)
});
class h8 extends me {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t), a = n.data;
    return this._def.type._parse({
      data: a,
      path: n.path,
      parent: n
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class Xl extends me {
  _parse(t) {
    const { status: n, ctx: a } = this._processInputParams(t);
    if (a.common.async)
      return (async () => {
        const o = await this._def.in._parseAsync({
          data: a.data,
          path: a.path,
          parent: a
        });
        return o.status === "aborted" ? ie : o.status === "dirty" ? (n.dirty(), Ba(o.value)) : this._def.out._parseAsync({
          data: o.value,
          path: a.path,
          parent: a
        });
      })();
    {
      const r = this._def.in._parseSync({
        data: a.data,
        path: a.path,
        parent: a
      });
      return r.status === "aborted" ? ie : r.status === "dirty" ? (n.dirty(), {
        status: "dirty",
        value: r.value
      }) : this._def.out._parseSync({
        data: r.value,
        path: a.path,
        parent: a
      });
    }
  }
  static create(t, n) {
    return new Xl({
      in: t,
      out: n,
      typeName: se.ZodPipeline
    });
  }
}
class Rs extends me {
  _parse(t) {
    const n = this._def.innerType._parse(t), a = (r) => (fa(r) && (r.value = Object.freeze(r.value)), r);
    return fo(n) ? n.then((r) => a(r)) : a(n);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Rs.create = (e, t) => new Rs({
  innerType: e,
  typeName: se.ZodReadonly,
  ...ue(t)
});
var se;
(function(e) {
  e.ZodString = "ZodString", e.ZodNumber = "ZodNumber", e.ZodNaN = "ZodNaN", e.ZodBigInt = "ZodBigInt", e.ZodBoolean = "ZodBoolean", e.ZodDate = "ZodDate", e.ZodSymbol = "ZodSymbol", e.ZodUndefined = "ZodUndefined", e.ZodNull = "ZodNull", e.ZodAny = "ZodAny", e.ZodUnknown = "ZodUnknown", e.ZodNever = "ZodNever", e.ZodVoid = "ZodVoid", e.ZodArray = "ZodArray", e.ZodObject = "ZodObject", e.ZodUnion = "ZodUnion", e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", e.ZodIntersection = "ZodIntersection", e.ZodTuple = "ZodTuple", e.ZodRecord = "ZodRecord", e.ZodMap = "ZodMap", e.ZodSet = "ZodSet", e.ZodFunction = "ZodFunction", e.ZodLazy = "ZodLazy", e.ZodLiteral = "ZodLiteral", e.ZodEnum = "ZodEnum", e.ZodEffects = "ZodEffects", e.ZodNativeEnum = "ZodNativeEnum", e.ZodOptional = "ZodOptional", e.ZodNullable = "ZodNullable", e.ZodDefault = "ZodDefault", e.ZodCatch = "ZodCatch", e.ZodPromise = "ZodPromise", e.ZodBranded = "ZodBranded", e.ZodPipeline = "ZodPipeline", e.ZodReadonly = "ZodReadonly";
})(se || (se = {}));
const g8 = nn.create;
fn.create;
Pt.create;
mo.create;
ho.create;
Mn.create;
pa.create;
go.create;
rn.create;
ha.create;
const fN = g8().refine((e) => {
  try {
    return W5(e);
  } catch {
    return !1;
  }
}, "Invalid phone number"), b8 = Ye(
  ({
    className: e,
    onCountryChange: t,
    onChange: n,
    value: a,
    placeholder: r,
    defaultCountry: o,
    inline: i = !1,
    ...s
  }, c) => {
    const [, d] = je(), [u, p] = je(""), [m, h] = je(!1);
    At(() => {
      if (o) {
        const v = ad.countries({
          alpha2: o.toLowerCase()
        })[0];
        if (d(v), p(o.toLowerCase()), !m && v?.countryCallingCodes?.[0] && !a) {
          const y = {
            target: {
              value: v.countryCallingCodes[0]
            }
          };
          n?.(y), t?.(v), h(!0);
        }
      }
    }, [o, n, a, m, t]);
    const b = (v) => {
      let y = v.target.value;
      try {
        const w = G5(y);
        if (w && w.country) {
          const $ = w.country;
          p(""), setTimeout(() => {
            p($.toLowerCase());
          }, 0);
          const C = ad.countries({ alpha2: $ })[0];
          d(C), t?.(C);
        }
        n?.(v);
      } catch (w) {
        console.error("Error parsing phone number:", w), n?.(v), p(""), d(void 0), t?.(void 0);
      }
    }, g = x(
      "flex items-center gap-2 relative bg-transparent transition-colors text-base rounded-md border border-input pl-3 h-9 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed md:text-sm has-[input:focus]:outline-none has-[input:focus]:ring-1 has-[input:focus]:ring-ring [interpolate-size:allow-keywords]",
      i && "rounded-l-none w-full",
      e
    );
    return /* @__PURE__ */ l.jsxs("div", { className: g, children: [
      !i && /* @__PURE__ */ l.jsx("div", { className: "w-4 h-4 rounded-full shrink-0", children: u ? /* @__PURE__ */ l.jsx(vs, { countryCode: u, height: 16 }) : /* @__PURE__ */ l.jsx(pu, { size: 16 }) }),
      /* @__PURE__ */ l.jsx(
        "input",
        {
          ref: c,
          value: a,
          onChange: b,
          placeholder: r || "Enter number",
          type: "tel",
          autoComplete: "tel",
          name: "phone",
          className: x(
            "flex !w-full border-none bg-transparent text-base transition-colors placeholder:text-muted-foreground outline-none h-9 py-1 p-0 leading-none md:text-sm [interpolate-size:allow-keywords]",
            e
          ),
          ...s
        }
      )
    ] });
  }
);
b8.displayName = "PhoneInput";
function v8(e) {
  if (typeof document > "u") return;
  let t = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
  n.type = "text/css", t.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e));
}
const mg = D.createContext({
  drawerRef: {
    current: null
  },
  overlayRef: {
    current: null
  },
  onPress: () => {
  },
  onRelease: () => {
  },
  onDrag: () => {
  },
  onNestedDrag: () => {
  },
  onNestedOpenChange: () => {
  },
  onNestedRelease: () => {
  },
  openProp: void 0,
  dismissible: !1,
  isOpen: !1,
  isDragging: !1,
  keyboardIsOpen: {
    current: !1
  },
  snapPointsOffset: null,
  snapPoints: null,
  handleOnly: !1,
  modal: !1,
  shouldFade: !1,
  activeSnapPoint: null,
  onOpenChange: () => {
  },
  setActiveSnapPoint: () => {
  },
  closeDrawer: () => {
  },
  direction: "bottom",
  shouldAnimate: {
    current: !0
  },
  shouldScaleBackground: !1,
  setBackgroundColorOnScale: !0,
  noBodyStyles: !1,
  container: null,
  autoFocus: !1
}), _r = () => {
  const e = D.useContext(mg);
  if (!e)
    throw new Error("useDrawerContext must be used within a Drawer.Root");
  return e;
};
v8(`[data-vaul-drawer]{touch-action:none;will-change:transform;transition:transform .5s cubic-bezier(.32, .72, 0, 1);animation-duration:.5s;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=open]{animation-name:slideFromBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=closed]{animation-name:slideToBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=open]{animation-name:slideFromTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=closed]{animation-name:slideToTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=open]{animation-name:slideFromLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=closed]{animation-name:slideToLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=open]{animation-name:slideFromRight}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=closed]{animation-name:slideToRight}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--initial-transform,100%),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--initial-transform,100%),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,var(--snap-point-height,0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--snap-point-height,0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(var(--snap-point-height,0),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--snap-point-height,0),0,0)}[data-vaul-overlay][data-vaul-snap-points=false]{animation-duration:.5s;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}[data-vaul-overlay][data-vaul-snap-points=false][data-state=open]{animation-name:fadeIn}[data-vaul-overlay][data-state=closed]{animation-name:fadeOut}[data-vaul-animate=false]{animation:none!important}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:0;transition:opacity .5s cubic-bezier(.32, .72, 0, 1)}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:1}[data-vaul-drawer]:not([data-vaul-custom-container=true])::after{content:'';position:absolute;background:inherit;background-color:inherit}[data-vaul-drawer][data-vaul-drawer-direction=top]::after{top:initial;bottom:100%;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=bottom]::after{top:100%;bottom:initial;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=left]::after{left:initial;right:100%;top:0;bottom:0;width:200%}[data-vaul-drawer][data-vaul-drawer-direction=right]::after{left:100%;right:initial;top:0;bottom:0;width:200%}[data-vaul-overlay][data-vaul-snap-points=true]:not([data-vaul-snap-points-overlay=true]):not(
[data-state=closed]
){opacity:0}[data-vaul-overlay][data-vaul-snap-points-overlay=true]{opacity:1}[data-vaul-handle]{display:block;position:relative;opacity:.7;background:#e2e2e4;margin-left:auto;margin-right:auto;height:5px;width:32px;border-radius:1rem;touch-action:pan-y}[data-vaul-handle]:active,[data-vaul-handle]:hover{opacity:1}[data-vaul-handle-hitarea]{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:max(100%,2.75rem);height:max(100%,2.75rem);touch-action:inherit}@media (hover:hover) and (pointer:fine){[data-vaul-drawer]{user-select:none}}@media (pointer:fine){[data-vaul-handle-hitarea]:{width:100%;height:100%}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeOut{to{opacity:0}}@keyframes slideFromBottom{from{transform:translate3d(0,var(--initial-transform,100%),0)}to{transform:translate3d(0,0,0)}}@keyframes slideToBottom{to{transform:translate3d(0,var(--initial-transform,100%),0)}}@keyframes slideFromTop{from{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}to{transform:translate3d(0,0,0)}}@keyframes slideToTop{to{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}}@keyframes slideFromLeft{from{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToLeft{to{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}}@keyframes slideFromRight{from{transform:translate3d(var(--initial-transform,100%),0,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToRight{to{transform:translate3d(var(--initial-transform,100%),0,0)}}`);
function y8() {
  const e = navigator.userAgent;
  return typeof window < "u" && (/Firefox/.test(e) && /Mobile/.test(e) || // Android Firefox
  /FxiOS/.test(e));
}
function x8() {
  return ql(/^Mac/);
}
function w8() {
  return ql(/^iPhone/);
}
function Vd() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
function $8() {
  return ql(/^iPad/) || // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
  x8() && navigator.maxTouchPoints > 1;
}
function hg() {
  return w8() || $8();
}
function ql(e) {
  return typeof window < "u" && window.navigator != null ? e.test(window.navigator.platform) : void 0;
}
const C8 = 24, S8 = typeof window < "u" ? js : At;
function zd(...e) {
  return (...t) => {
    for (let n of e)
      typeof n == "function" && n(...t);
  };
}
const Ii = typeof document < "u" && window.visualViewport;
function Kd(e) {
  let t = window.getComputedStyle(e);
  return /(auto|scroll)/.test(t.overflow + t.overflowX + t.overflowY);
}
function gg(e) {
  for (Kd(e) && (e = e.parentElement); e && !Kd(e); )
    e = e.parentElement;
  return e || document.scrollingElement || document.documentElement;
}
const _8 = /* @__PURE__ */ new Set([
  "checkbox",
  "radio",
  "range",
  "color",
  "file",
  "image",
  "button",
  "submit",
  "reset"
]);
let Ur = 0, Li;
function N8(e = {}) {
  let { isDisabled: t } = e;
  S8(() => {
    if (!t)
      return Ur++, Ur === 1 && hg() && (Li = E8()), () => {
        Ur--, Ur === 0 && Li?.();
      };
  }, [
    t
  ]);
}
function E8() {
  let e, t = 0, n = (p) => {
    e = gg(p.target), !(e === document.documentElement && e === document.body) && (t = p.changedTouches[0].pageY);
  }, a = (p) => {
    if (!e || e === document.documentElement || e === document.body) {
      p.preventDefault();
      return;
    }
    let m = p.changedTouches[0].pageY, h = e.scrollTop, b = e.scrollHeight - e.clientHeight;
    b !== 0 && ((h <= 0 && m > t || h >= b && m < t) && p.preventDefault(), t = m);
  }, r = (p) => {
    let m = p.target;
    Ps(m) && m !== document.activeElement && (p.preventDefault(), m.style.transform = "translateY(-2000px)", m.focus(), requestAnimationFrame(() => {
      m.style.transform = "";
    }));
  }, o = (p) => {
    let m = p.target;
    Ps(m) && (m.style.transform = "translateY(-2000px)", requestAnimationFrame(() => {
      m.style.transform = "", Ii && (Ii.height < window.innerHeight ? requestAnimationFrame(() => {
        Yd(m);
      }) : Ii.addEventListener("resize", () => Yd(m), {
        once: !0
      }));
    }));
  }, i = () => {
    window.scrollTo(0, 0);
  }, s = window.pageXOffset, c = window.pageYOffset, d = zd(R8(document.documentElement, "paddingRight", `${window.innerWidth - document.documentElement.clientWidth}px`));
  window.scrollTo(0, 0);
  let u = zd(ja(document, "touchstart", n, {
    passive: !1,
    capture: !0
  }), ja(document, "touchmove", a, {
    passive: !1,
    capture: !0
  }), ja(document, "touchend", r, {
    passive: !1,
    capture: !0
  }), ja(document, "focus", o, !0), ja(window, "scroll", i));
  return () => {
    d(), u(), window.scrollTo(s, c);
  };
}
function R8(e, t, n) {
  let a = e.style[t];
  return e.style[t] = n, () => {
    e.style[t] = a;
  };
}
function ja(e, t, n, a) {
  return e.addEventListener(t, n, a), () => {
    e.removeEventListener(t, n, a);
  };
}
function Yd(e) {
  let t = document.scrollingElement || document.documentElement;
  for (; e && e !== t; ) {
    let n = gg(e);
    if (n !== document.documentElement && n !== document.body && n !== e) {
      let a = n.getBoundingClientRect().top, r = e.getBoundingClientRect().top, o = e.getBoundingClientRect().bottom;
      const i = n.getBoundingClientRect().bottom + C8;
      o > i && (n.scrollTop += r - a);
    }
    e = n.parentElement;
  }
}
function Ps(e) {
  return e instanceof HTMLInputElement && !_8.has(e.type) || e instanceof HTMLTextAreaElement || e instanceof HTMLElement && e.isContentEditable;
}
function P8(e, t) {
  typeof e == "function" ? e(t) : e != null && (e.current = t);
}
function k8(...e) {
  return (t) => e.forEach((n) => P8(n, t));
}
function bg(...e) {
  return f.useCallback(k8(...e), e);
}
const vg = /* @__PURE__ */ new WeakMap();
function De(e, t, n = !1) {
  if (!e || !(e instanceof HTMLElement)) return;
  let a = {};
  Object.entries(t).forEach(([r, o]) => {
    if (r.startsWith("--")) {
      e.style.setProperty(r, o);
      return;
    }
    a[r] = e.style[r], e.style[r] = o;
  }), !n && vg.set(e, a);
}
function T8(e, t) {
  if (!e || !(e instanceof HTMLElement)) return;
  let n = vg.get(e);
  n && (e.style[t] = n[t]);
}
const Ae = (e) => {
  switch (e) {
    case "top":
    case "bottom":
      return !0;
    case "left":
    case "right":
      return !1;
    default:
      return e;
  }
};
function Gr(e, t) {
  if (!e)
    return null;
  const n = window.getComputedStyle(e), a = (
    // @ts-ignore
    n.transform || n.webkitTransform || n.mozTransform
  );
  let r = a.match(/^matrix3d\((.+)\)$/);
  return r ? parseFloat(r[1].split(", ")[Ae(t) ? 13 : 12]) : (r = a.match(/^matrix\((.+)\)$/), r ? parseFloat(r[1].split(", ")[Ae(t) ? 5 : 4]) : null);
}
function A8(e) {
  return 8 * (Math.log(e + 1) - 2);
}
function Fi(e, t) {
  if (!e) return () => {
  };
  const n = e.style.cssText;
  return Object.assign(e.style, t), () => {
    e.style.cssText = n;
  };
}
function j8(...e) {
  return (...t) => {
    for (const n of e)
      typeof n == "function" && n(...t);
  };
}
const Ne = {
  DURATION: 0.5,
  EASE: [
    0.32,
    0.72,
    0,
    1
  ]
}, yg = 0.4, M8 = 0.25, O8 = 100, xg = 8, Cn = 16, ks = 26, Bi = "vaul-dragging";
function wg(e) {
  const t = D.useRef(e);
  return D.useEffect(() => {
    t.current = e;
  }), D.useMemo(() => (...n) => t.current == null ? void 0 : t.current.call(t, ...n), []);
}
function D8({ defaultProp: e, onChange: t }) {
  const n = D.useState(e), [a] = n, r = D.useRef(a), o = wg(t);
  return D.useEffect(() => {
    r.current !== a && (o(a), r.current = a);
  }, [
    a,
    r,
    o
  ]), n;
}
function $g({ prop: e, defaultProp: t, onChange: n = () => {
} }) {
  const [a, r] = D8({
    defaultProp: t,
    onChange: n
  }), o = e !== void 0, i = o ? e : a, s = wg(n), c = D.useCallback((d) => {
    if (o) {
      const p = typeof d == "function" ? d(e) : d;
      p !== e && s(p);
    } else
      r(d);
  }, [
    o,
    e,
    r,
    s
  ]);
  return [
    i,
    c
  ];
}
function I8({ activeSnapPointProp: e, setActiveSnapPointProp: t, snapPoints: n, drawerRef: a, overlayRef: r, fadeFromIndex: o, onSnapPointChange: i, direction: s = "bottom", container: c, snapToSequentialPoint: d }) {
  const [u, p] = $g({
    prop: e,
    defaultProp: n?.[0],
    onChange: t
  }), [m, h] = D.useState(typeof window < "u" ? {
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight
  } : void 0);
  D.useEffect(() => {
    function S() {
      h({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight
      });
    }
    return window.addEventListener("resize", S), () => window.removeEventListener("resize", S);
  }, []);
  const b = D.useMemo(() => u === n?.[n.length - 1] || null, [
    n,
    u
  ]), g = D.useMemo(() => {
    var S;
    return (S = n?.findIndex((j) => j === u)) != null ? S : null;
  }, [
    n,
    u
  ]), v = n && n.length > 0 && (o || o === 0) && !Number.isNaN(o) && n[o] === u || !n, y = D.useMemo(() => {
    const S = c ? {
      width: c.getBoundingClientRect().width,
      height: c.getBoundingClientRect().height
    } : typeof window < "u" ? {
      width: window.innerWidth,
      height: window.innerHeight
    } : {
      width: 0,
      height: 0
    };
    var j;
    return (j = n?.map((P) => {
      const B = typeof P == "string";
      let z = 0;
      if (B && (z = parseInt(P, 10)), Ae(s)) {
        const T = B ? z : m ? P * S.height : 0;
        return m ? s === "bottom" ? S.height - T : -S.height + T : T;
      }
      const L = B ? z : m ? P * S.width : 0;
      return m ? s === "right" ? S.width - L : -S.width + L : L;
    })) != null ? j : [];
  }, [
    n,
    m,
    c
  ]), w = D.useMemo(() => g !== null ? y?.[g] : null, [
    y,
    g
  ]), $ = D.useCallback((S) => {
    var j;
    const P = (j = y?.findIndex((B) => B === S)) != null ? j : null;
    i(P), De(a.current, {
      transition: `transform ${Ne.DURATION}s cubic-bezier(${Ne.EASE.join(",")})`,
      transform: Ae(s) ? `translate3d(0, ${S}px, 0)` : `translate3d(${S}px, 0, 0)`
    }), y && P !== y.length - 1 && o !== void 0 && P !== o && P < o ? De(r.current, {
      transition: `opacity ${Ne.DURATION}s cubic-bezier(${Ne.EASE.join(",")})`,
      opacity: "0"
    }) : De(r.current, {
      transition: `opacity ${Ne.DURATION}s cubic-bezier(${Ne.EASE.join(",")})`,
      opacity: "1"
    }), p(n?.[Math.max(P, 0)]);
  }, [
    a.current,
    n,
    y,
    o,
    r,
    p
  ]);
  D.useEffect(() => {
    if (u || e) {
      var S;
      const j = (S = n?.findIndex((P) => P === e || P === u)) != null ? S : -1;
      y && j !== -1 && typeof y[j] == "number" && $(y[j]);
    }
  }, [
    u,
    e,
    n,
    y,
    $
  ]);
  function C({ draggedDistance: S, closeDrawer: j, velocity: P, dismissible: B }) {
    if (o === void 0) return;
    const z = s === "bottom" || s === "right" ? (w ?? 0) - S : (w ?? 0) + S, L = g === o - 1, T = g === 0, K = S > 0;
    if (L && De(r.current, {
      transition: `opacity ${Ne.DURATION}s cubic-bezier(${Ne.EASE.join(",")})`
    }), !d && P > 2 && !K) {
      B ? j() : $(y[0]);
      return;
    }
    if (!d && P > 2 && K && y && n) {
      $(y[n.length - 1]);
      return;
    }
    const Q = y?.reduce((A, E) => typeof A != "number" || typeof E != "number" ? A : Math.abs(E - z) < Math.abs(A - z) ? E : A), V = Ae(s) ? window.innerHeight : window.innerWidth;
    if (P > yg && Math.abs(S) < V * 0.4) {
      const A = K ? 1 : -1;
      if (A > 0 && b && n) {
        $(y[n.length - 1]);
        return;
      }
      if (T && A < 0 && B && j(), g === null) return;
      $(y[g + A]);
      return;
    }
    $(Q);
  }
  function R({ draggedDistance: S }) {
    if (w === null) return;
    const j = s === "bottom" || s === "right" ? w - S : w + S;
    (s === "bottom" || s === "right") && j < y[y.length - 1] || (s === "top" || s === "left") && j > y[y.length - 1] || De(a.current, {
      transform: Ae(s) ? `translate3d(0, ${j}px, 0)` : `translate3d(${j}px, 0, 0)`
    });
  }
  function k(S, j) {
    if (!n || typeof g != "number" || !y || o === void 0) return null;
    const P = g === o - 1;
    if (g >= o && j)
      return 0;
    if (P && !j) return 1;
    if (!v && !P) return null;
    const z = P ? g + 1 : g - 1, L = P ? y[z] - y[z - 1] : y[z + 1] - y[z], T = S / Math.abs(L);
    return P ? 1 - T : T;
  }
  return {
    isLastSnapPoint: b,
    activeSnapPoint: u,
    shouldFade: v,
    getPercentageDragged: k,
    setActiveSnapPoint: p,
    activeSnapPointIndex: g,
    onRelease: C,
    onDrag: R,
    snapPointsOffset: y
  };
}
const L8 = () => () => {
};
function F8() {
  const { direction: e, isOpen: t, shouldScaleBackground: n, setBackgroundColorOnScale: a, noBodyStyles: r } = _r(), o = D.useRef(null), i = wo(() => document.body.style.backgroundColor, []);
  function s() {
    return (window.innerWidth - ks) / window.innerWidth;
  }
  D.useEffect(() => {
    if (t && n) {
      o.current && clearTimeout(o.current);
      const c = document.querySelector("[data-vaul-drawer-wrapper]") || document.querySelector("[vaul-drawer-wrapper]");
      if (!c) return;
      j8(a && !r ? Fi(document.body, {
        background: "black"
      }) : L8, Fi(c, {
        transformOrigin: Ae(e) ? "top" : "left",
        transitionProperty: "transform, border-radius",
        transitionDuration: `${Ne.DURATION}s`,
        transitionTimingFunction: `cubic-bezier(${Ne.EASE.join(",")})`
      }));
      const d = Fi(c, {
        borderRadius: `${xg}px`,
        overflow: "hidden",
        ...Ae(e) ? {
          transform: `scale(${s()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`
        } : {
          transform: `scale(${s()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`
        }
      });
      return () => {
        d(), o.current = window.setTimeout(() => {
          i ? document.body.style.background = i : document.body.style.removeProperty("background");
        }, Ne.DURATION * 1e3);
      };
    }
  }, [
    t,
    n,
    i
  ]);
}
let Ma = null;
function B8({ isOpen: e, modal: t, nested: n, hasBeenOpened: a, preventScrollRestoration: r, noBodyStyles: o }) {
  const [i, s] = D.useState(() => typeof window < "u" ? window.location.href : ""), c = D.useRef(0), d = D.useCallback(() => {
    if (Vd() && Ma === null && e && !o) {
      Ma = {
        position: document.body.style.position,
        top: document.body.style.top,
        left: document.body.style.left,
        height: document.body.style.height,
        right: "unset"
      };
      const { scrollX: p, innerHeight: m } = window;
      document.body.style.setProperty("position", "fixed", "important"), Object.assign(document.body.style, {
        top: `${-c.current}px`,
        left: `${-p}px`,
        right: "0px",
        height: "auto"
      }), window.setTimeout(() => window.requestAnimationFrame(() => {
        const h = m - window.innerHeight;
        h && c.current >= m && (document.body.style.top = `${-(c.current + h)}px`);
      }), 300);
    }
  }, [
    e
  ]), u = D.useCallback(() => {
    if (Vd() && Ma !== null && !o) {
      const p = -parseInt(document.body.style.top, 10), m = -parseInt(document.body.style.left, 10);
      Object.assign(document.body.style, Ma), window.requestAnimationFrame(() => {
        if (r && i !== window.location.href) {
          s(window.location.href);
          return;
        }
        window.scrollTo(m, p);
      }), Ma = null;
    }
  }, [
    i
  ]);
  return D.useEffect(() => {
    function p() {
      c.current = window.scrollY;
    }
    return p(), window.addEventListener("scroll", p), () => {
      window.removeEventListener("scroll", p);
    };
  }, []), D.useEffect(() => {
    if (t)
      return () => {
        typeof document > "u" || document.querySelector("[data-vaul-drawer]") || u();
      };
  }, [
    t,
    u
  ]), D.useEffect(() => {
    n || !a || (e ? (!window.matchMedia("(display-mode: standalone)").matches && d(), t || window.setTimeout(() => {
      u();
    }, 500)) : u());
  }, [
    e,
    a,
    i,
    t,
    n,
    d,
    u
  ]), {
    restorePositionSetting: u
  };
}
function U8({ open: e, onOpenChange: t, children: n, onDrag: a, onRelease: r, snapPoints: o, shouldScaleBackground: i = !1, setBackgroundColorOnScale: s = !0, closeThreshold: c = M8, scrollLockTimeout: d = O8, dismissible: u = !0, handleOnly: p = !1, fadeFromIndex: m = o && o.length - 1, activeSnapPoint: h, setActiveSnapPoint: b, fixed: g, modal: v = !0, onClose: y, nested: w, noBodyStyles: $ = !1, direction: C = "bottom", defaultOpen: R = !1, disablePreventScroll: k = !0, snapToSequentialPoint: S = !1, preventScrollRestoration: j = !1, repositionInputs: P = !0, onAnimationEnd: B, container: z, autoFocus: L = !1 }) {
  var T, K;
  const [Q = !1, V] = $g({
    defaultProp: R,
    prop: e,
    onChange: (ae) => {
      t?.(ae), !ae && !w && Dt(), setTimeout(() => {
        B?.(ae);
      }, Ne.DURATION * 1e3), ae && !v && typeof window < "u" && window.requestAnimationFrame(() => {
        document.body.style.pointerEvents = "auto";
      }), ae || (document.body.style.pointerEvents = "auto");
    }
  }), [A, E] = D.useState(!1), [O, N] = D.useState(!1), [H, _] = D.useState(!1), G = D.useRef(null), X = D.useRef(null), W = D.useRef(null), te = D.useRef(null), M = D.useRef(null), q = D.useRef(!1), oe = D.useRef(null), ce = D.useRef(0), fe = D.useRef(!1), ye = D.useRef(!R), Be = D.useRef(0), I = D.useRef(null), re = D.useRef(((T = I.current) == null ? void 0 : T.getBoundingClientRect().height) || 0), Re = D.useRef(((K = I.current) == null ? void 0 : K.getBoundingClientRect().width) || 0), ke = D.useRef(0), Xe = D.useCallback((ae) => {
    o && ae === nt.length - 1 && (X.current = /* @__PURE__ */ new Date());
  }, []), { activeSnapPoint: Ce, activeSnapPointIndex: Te, setActiveSnapPoint: yn, onRelease: tt, snapPointsOffset: nt, onDrag: dt, shouldFade: ut, getPercentageDragged: $t } = I8({
    snapPoints: o,
    activeSnapPointProp: h,
    setActiveSnapPointProp: b,
    drawerRef: I,
    fadeFromIndex: m,
    overlayRef: G,
    onSnapPointChange: Xe,
    direction: C,
    container: z,
    snapToSequentialPoint: S
  });
  N8({
    isDisabled: !Q || O || !v || H || !A || !P || !k
  });
  const { restorePositionSetting: Dt } = B8({
    isOpen: Q,
    modal: v,
    nested: w ?? !1,
    hasBeenOpened: A,
    preventScrollRestoration: j,
    noBodyStyles: $
  });
  function xn() {
    return (window.innerWidth - ks) / window.innerWidth;
  }
  function kr(ae) {
    var be, xe;
    !u && !o || I.current && !I.current.contains(ae.target) || (re.current = ((be = I.current) == null ? void 0 : be.getBoundingClientRect().height) || 0, Re.current = ((xe = I.current) == null ? void 0 : xe.getBoundingClientRect().width) || 0, N(!0), W.current = /* @__PURE__ */ new Date(), hg() && window.addEventListener("touchend", () => q.current = !1, {
      once: !0
    }), ae.target.setPointerCapture(ae.pointerId), ce.current = Ae(C) ? ae.pageY : ae.pageX);
  }
  function Tr(ae, be) {
    var xe;
    let he = ae;
    const Pe = (xe = window.getSelection()) == null ? void 0 : xe.toString(), qe = I.current ? Gr(I.current, C) : null, He = /* @__PURE__ */ new Date();
    if (he.tagName === "SELECT" || he.hasAttribute("data-vaul-no-drag") || he.closest("[data-vaul-no-drag]"))
      return !1;
    if (C === "right" || C === "left")
      return !0;
    if (X.current && He.getTime() - X.current.getTime() < 500)
      return !1;
    if (qe !== null && (C === "bottom" ? qe > 0 : qe < 0))
      return !0;
    if (Pe && Pe.length > 0)
      return !1;
    if (M.current && He.getTime() - M.current.getTime() < d && qe === 0 || be)
      return M.current = He, !1;
    for (; he; ) {
      if (he.scrollHeight > he.clientHeight) {
        if (he.scrollTop !== 0)
          return M.current = /* @__PURE__ */ new Date(), !1;
        if (he.getAttribute("role") === "dialog")
          return !0;
      }
      he = he.parentNode;
    }
    return !0;
  }
  function mi(ae) {
    if (I.current && O) {
      const be = C === "bottom" || C === "right" ? 1 : -1, xe = (ce.current - (Ae(C) ? ae.pageY : ae.pageX)) * be, he = xe > 0, Pe = o && !u && !he;
      if (Pe && Te === 0) return;
      const qe = Math.abs(xe), He = document.querySelector("[data-vaul-drawer-wrapper]"), Yt = C === "bottom" || C === "top" ? re.current : Re.current;
      let ft = qe / Yt;
      const $n = $t(qe, he);
      if ($n !== null && (ft = $n), Pe && ft >= 1 || !q.current && !Tr(ae.target, he)) return;
      if (I.current.classList.add(Bi), q.current = !0, De(I.current, {
        transition: "none"
      }), De(G.current, {
        transition: "none"
      }), o && dt({
        draggedDistance: xe
      }), he && !o) {
        const St = A8(xe), Ar = Math.min(St * -1, 0) * be;
        De(I.current, {
          transform: Ae(C) ? `translate3d(0, ${Ar}px, 0)` : `translate3d(${Ar}px, 0, 0)`
        });
        return;
      }
      const Zt = 1 - ft;
      if ((ut || m && Te === m - 1) && (a?.(ae, ft), De(G.current, {
        opacity: `${Zt}`,
        transition: "none"
      }, !0)), He && G.current && i) {
        const St = Math.min(xn() + ft * (1 - xn()), 1), Ar = 8 - ft * 8, gc = Math.max(0, 14 - ft * 14);
        De(He, {
          borderRadius: `${Ar}px`,
          transform: Ae(C) ? `scale(${St}) translate3d(0, ${gc}px, 0)` : `scale(${St}) translate3d(${gc}px, 0, 0)`,
          transition: "none"
        }, !0);
      }
      if (!o) {
        const St = qe * be;
        De(I.current, {
          transform: Ae(C) ? `translate3d(0, ${St}px, 0)` : `translate3d(${St}px, 0, 0)`
        });
      }
    }
  }
  D.useEffect(() => {
    window.requestAnimationFrame(() => {
      ye.current = !0;
    });
  }, []), D.useEffect(() => {
    var ae;
    function be() {
      if (!I.current || !P) return;
      const xe = document.activeElement;
      if (Ps(xe) || fe.current) {
        var he;
        const Pe = ((he = window.visualViewport) == null ? void 0 : he.height) || 0, qe = window.innerHeight;
        let He = qe - Pe;
        const Yt = I.current.getBoundingClientRect().height || 0, ft = Yt > qe * 0.8;
        ke.current || (ke.current = Yt);
        const $n = I.current.getBoundingClientRect().top;
        if (Math.abs(Be.current - He) > 60 && (fe.current = !fe.current), o && o.length > 0 && nt && Te) {
          const Zt = nt[Te] || 0;
          He += Zt;
        }
        if (Be.current = He, Yt > Pe || fe.current) {
          const Zt = I.current.getBoundingClientRect().height;
          let St = Zt;
          Zt > Pe && (St = Pe - (ft ? $n : ks)), g ? I.current.style.height = `${Zt - Math.max(He, 0)}px` : I.current.style.height = `${Math.max(St, Pe - $n)}px`;
        } else y8() || (I.current.style.height = `${ke.current}px`);
        o && o.length > 0 && !fe.current ? I.current.style.bottom = "0px" : I.current.style.bottom = `${Math.max(He, 0)}px`;
      }
    }
    return (ae = window.visualViewport) == null || ae.addEventListener("resize", be), () => {
      var xe;
      return (xe = window.visualViewport) == null ? void 0 : xe.removeEventListener("resize", be);
    };
  }, [
    Te,
    o,
    nt
  ]);
  function wn(ae) {
    Na(), y?.(), ae || V(!1), setTimeout(() => {
      o && yn(o[0]);
    }, Ne.DURATION * 1e3);
  }
  function Ct() {
    if (!I.current) return;
    const ae = document.querySelector("[data-vaul-drawer-wrapper]"), be = Gr(I.current, C);
    De(I.current, {
      transform: "translate3d(0, 0, 0)",
      transition: `transform ${Ne.DURATION}s cubic-bezier(${Ne.EASE.join(",")})`
    }), De(G.current, {
      transition: `opacity ${Ne.DURATION}s cubic-bezier(${Ne.EASE.join(",")})`,
      opacity: "1"
    }), i && be && be > 0 && Q && De(ae, {
      borderRadius: `${xg}px`,
      overflow: "hidden",
      ...Ae(C) ? {
        transform: `scale(${xn()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,
        transformOrigin: "top"
      } : {
        transform: `scale(${xn()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,
        transformOrigin: "left"
      },
      transitionProperty: "transform, border-radius",
      transitionDuration: `${Ne.DURATION}s`,
      transitionTimingFunction: `cubic-bezier(${Ne.EASE.join(",")})`
    }, !0);
  }
  function Na() {
    !O || !I.current || (I.current.classList.remove(Bi), q.current = !1, N(!1), te.current = /* @__PURE__ */ new Date());
  }
  function hi(ae) {
    if (!O || !I.current) return;
    I.current.classList.remove(Bi), q.current = !1, N(!1), te.current = /* @__PURE__ */ new Date();
    const be = Gr(I.current, C);
    if (!ae || !Tr(ae.target, !1) || !be || Number.isNaN(be) || W.current === null) return;
    const xe = te.current.getTime() - W.current.getTime(), he = ce.current - (Ae(C) ? ae.pageY : ae.pageX), Pe = Math.abs(he) / xe;
    if (Pe > 0.05 && (_(!0), setTimeout(() => {
      _(!1);
    }, 200)), o) {
      tt({
        draggedDistance: he * (C === "bottom" || C === "right" ? 1 : -1),
        closeDrawer: wn,
        velocity: Pe,
        dismissible: u
      }), r?.(ae, !0);
      return;
    }
    if (C === "bottom" || C === "right" ? he > 0 : he < 0) {
      Ct(), r?.(ae, !0);
      return;
    }
    if (Pe > yg) {
      wn(), r?.(ae, !1);
      return;
    }
    var qe;
    const He = Math.min((qe = I.current.getBoundingClientRect().height) != null ? qe : 0, window.innerHeight);
    var Yt;
    const ft = Math.min((Yt = I.current.getBoundingClientRect().width) != null ? Yt : 0, window.innerWidth), $n = C === "left" || C === "right";
    if (Math.abs(be) >= ($n ? ft : He) * c) {
      wn(), r?.(ae, !1);
      return;
    }
    r?.(ae, !0), Ct();
  }
  D.useEffect(() => (Q && (De(document.documentElement, {
    scrollBehavior: "auto"
  }), X.current = /* @__PURE__ */ new Date()), () => {
    T8(document.documentElement, "scrollBehavior");
  }), [
    Q
  ]);
  function k0(ae) {
    const be = ae ? (window.innerWidth - Cn) / window.innerWidth : 1, xe = ae ? -Cn : 0;
    oe.current && window.clearTimeout(oe.current), De(I.current, {
      transition: `transform ${Ne.DURATION}s cubic-bezier(${Ne.EASE.join(",")})`,
      transform: Ae(C) ? `scale(${be}) translate3d(0, ${xe}px, 0)` : `scale(${be}) translate3d(${xe}px, 0, 0)`
    }), !ae && I.current && (oe.current = setTimeout(() => {
      const he = Gr(I.current, C);
      De(I.current, {
        transition: "none",
        transform: Ae(C) ? `translate3d(0, ${he}px, 0)` : `translate3d(${he}px, 0, 0)`
      });
    }, 500));
  }
  function T0(ae, be) {
    if (be < 0) return;
    const xe = (window.innerWidth - Cn) / window.innerWidth, he = xe + be * (1 - xe), Pe = -Cn + be * Cn;
    De(I.current, {
      transform: Ae(C) ? `scale(${he}) translate3d(0, ${Pe}px, 0)` : `scale(${he}) translate3d(${Pe}px, 0, 0)`,
      transition: "none"
    });
  }
  function A0(ae, be) {
    const xe = Ae(C) ? window.innerHeight : window.innerWidth, he = be ? (xe - Cn) / xe : 1, Pe = be ? -Cn : 0;
    be && De(I.current, {
      transition: `transform ${Ne.DURATION}s cubic-bezier(${Ne.EASE.join(",")})`,
      transform: Ae(C) ? `scale(${he}) translate3d(0, ${Pe}px, 0)` : `scale(${he}) translate3d(${Pe}px, 0, 0)`
    });
  }
  return D.useEffect(() => {
    v || window.requestAnimationFrame(() => {
      document.body.style.pointerEvents = "auto";
    });
  }, [
    v
  ]), /* @__PURE__ */ D.createElement(Yo, {
    defaultOpen: R,
    onOpenChange: (ae) => {
      !u && !ae || (ae ? E(!0) : wn(!0), V(ae));
    },
    open: Q
  }, /* @__PURE__ */ D.createElement(mg.Provider, {
    value: {
      activeSnapPoint: Ce,
      snapPoints: o,
      setActiveSnapPoint: yn,
      drawerRef: I,
      overlayRef: G,
      onOpenChange: t,
      onPress: kr,
      onRelease: hi,
      onDrag: mi,
      dismissible: u,
      shouldAnimate: ye,
      handleOnly: p,
      isOpen: Q,
      isDragging: O,
      shouldFade: ut,
      closeDrawer: wn,
      onNestedDrag: T0,
      onNestedOpenChange: k0,
      onNestedRelease: A0,
      keyboardIsOpen: fe,
      modal: v,
      snapPointsOffset: nt,
      activeSnapPointIndex: Te,
      direction: C,
      shouldScaleBackground: i,
      setBackgroundColorOnScale: s,
      noBodyStyles: $,
      container: z,
      autoFocus: L
    }
  }, n));
}
const Cg = /* @__PURE__ */ D.forwardRef(function({ ...e }, t) {
  const { overlayRef: n, snapPoints: a, onRelease: r, shouldFade: o, isOpen: i, modal: s, shouldAnimate: c } = _r(), d = bg(t, n), u = a && a.length > 0;
  if (!s)
    return null;
  const p = D.useCallback((m) => r(m), [
    r
  ]);
  return /* @__PURE__ */ D.createElement(wa, {
    onMouseUp: p,
    ref: d,
    "data-vaul-overlay": "",
    "data-vaul-snap-points": i && u ? "true" : "false",
    "data-vaul-snap-points-overlay": i && o ? "true" : "false",
    "data-vaul-animate": c?.current ? "true" : "false",
    ...e
  });
});
Cg.displayName = "Drawer.Overlay";
const Sg = /* @__PURE__ */ D.forwardRef(function({ onPointerDownOutside: e, style: t, onOpenAutoFocus: n, ...a }, r) {
  const { drawerRef: o, onPress: i, onRelease: s, onDrag: c, keyboardIsOpen: d, snapPointsOffset: u, activeSnapPointIndex: p, modal: m, isOpen: h, direction: b, snapPoints: g, container: v, handleOnly: y, shouldAnimate: w, autoFocus: $ } = _r(), [C, R] = D.useState(!1), k = bg(r, o), S = D.useRef(null), j = D.useRef(null), P = D.useRef(!1), B = g && g.length > 0;
  F8();
  const z = (T, K, Q = 0) => {
    if (P.current) return !0;
    const V = Math.abs(T.y), A = Math.abs(T.x), E = A > V, O = [
      "bottom",
      "right"
    ].includes(K) ? 1 : -1;
    if (K === "left" || K === "right") {
      if (!(T.x * O < 0) && A >= 0 && A <= Q)
        return E;
    } else if (!(T.y * O < 0) && V >= 0 && V <= Q)
      return !E;
    return P.current = !0, !0;
  };
  D.useEffect(() => {
    B && window.requestAnimationFrame(() => {
      R(!0);
    });
  }, []);
  function L(T) {
    S.current = null, P.current = !1, s(T);
  }
  return /* @__PURE__ */ D.createElement($a, {
    "data-vaul-drawer-direction": b,
    "data-vaul-drawer": "",
    "data-vaul-delayed-snap-points": C ? "true" : "false",
    "data-vaul-snap-points": h && B ? "true" : "false",
    "data-vaul-custom-container": v ? "true" : "false",
    "data-vaul-animate": w?.current ? "true" : "false",
    ...a,
    ref: k,
    style: u && u.length > 0 ? {
      "--snap-point-height": `${u[p ?? 0]}px`,
      ...t
    } : t,
    onPointerDown: (T) => {
      y || (a.onPointerDown == null || a.onPointerDown.call(a, T), S.current = {
        x: T.pageX,
        y: T.pageY
      }, i(T));
    },
    onOpenAutoFocus: (T) => {
      n?.(T), $ || T.preventDefault();
    },
    onPointerDownOutside: (T) => {
      if (e?.(T), !m || T.defaultPrevented) {
        T.preventDefault();
        return;
      }
      d.current && (d.current = !1);
    },
    onFocusOutside: (T) => {
      if (!m) {
        T.preventDefault();
        return;
      }
    },
    onPointerMove: (T) => {
      if (j.current = T, y || (a.onPointerMove == null || a.onPointerMove.call(a, T), !S.current)) return;
      const K = T.pageY - S.current.y, Q = T.pageX - S.current.x, V = T.pointerType === "touch" ? 10 : 2;
      z({
        x: Q,
        y: K
      }, b, V) ? c(T) : (Math.abs(Q) > V || Math.abs(K) > V) && (S.current = null);
    },
    onPointerUp: (T) => {
      a.onPointerUp == null || a.onPointerUp.call(a, T), S.current = null, P.current = !1, s(T);
    },
    onPointerOut: (T) => {
      a.onPointerOut == null || a.onPointerOut.call(a, T), L(j.current);
    },
    onContextMenu: (T) => {
      a.onContextMenu == null || a.onContextMenu.call(a, T), j.current && L(j.current);
    }
  });
});
Sg.displayName = "Drawer.Content";
const G8 = 250, W8 = 120, H8 = /* @__PURE__ */ D.forwardRef(function({ preventCycle: e = !1, children: t, ...n }, a) {
  const { closeDrawer: r, isDragging: o, snapPoints: i, activeSnapPoint: s, setActiveSnapPoint: c, dismissible: d, handleOnly: u, isOpen: p, onPress: m, onDrag: h } = _r(), b = D.useRef(null), g = D.useRef(!1);
  function v() {
    if (g.current) {
      $();
      return;
    }
    window.setTimeout(() => {
      y();
    }, W8);
  }
  function y() {
    if (o || e || g.current) {
      $();
      return;
    }
    if ($(), !i || i.length === 0) {
      d || r();
      return;
    }
    if (s === i[i.length - 1] && d) {
      r();
      return;
    }
    const R = i.findIndex((S) => S === s);
    if (R === -1) return;
    const k = i[R + 1];
    c(k);
  }
  function w() {
    b.current = window.setTimeout(() => {
      g.current = !0;
    }, G8);
  }
  function $() {
    b.current && window.clearTimeout(b.current), g.current = !1;
  }
  return /* @__PURE__ */ D.createElement("div", {
    onClick: v,
    onPointerCancel: $,
    onPointerDown: (C) => {
      u && m(C), w();
    },
    onPointerMove: (C) => {
      u && h(C);
    },
    // onPointerUp is already handled by the content component
    ref: a,
    "data-vaul-drawer-visible": p ? "true" : "false",
    "data-vaul-handle": "",
    "aria-hidden": "true",
    ...n
  }, /* @__PURE__ */ D.createElement("span", {
    "data-vaul-handle-hitarea": "",
    "aria-hidden": "true"
  }, t));
});
H8.displayName = "Drawer.Handle";
function V8(e) {
  const t = _r(), { container: n = t.container, ...a } = e;
  return /* @__PURE__ */ D.createElement(Zo, {
    container: n,
    ...a
  });
}
const wt = {
  Root: U8,
  Content: Sg,
  Overlay: Cg,
  Trigger: ul,
  Portal: V8,
  Close: Xo,
  Title: yr,
  Description: xr
}, z8 = ({
  shouldScaleBackground: e = !0,
  ...t
}) => /* @__PURE__ */ l.jsx(
  wt.Root,
  {
    shouldScaleBackground: e,
    ...t
  }
);
z8.displayName = "Drawer";
const pN = wt.Trigger, K8 = wt.Portal, mN = wt.Close, _g = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  wt.Overlay,
  {
    ref: n,
    className: x("fixed inset-0 z-50 bg-black/80", e),
    ...t
  }
));
_g.displayName = wt.Overlay.displayName;
const Y8 = f.forwardRef(({ className: e, children: t, ...n }, a) => /* @__PURE__ */ l.jsxs(K8, { children: [
  /* @__PURE__ */ l.jsx(_g, {}),
  /* @__PURE__ */ l.jsxs(
    wt.Content,
    {
      ref: a,
      className: x(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        e
      ),
      ...n,
      children: [
        /* @__PURE__ */ l.jsx("div", { className: "mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" }),
        t
      ]
    }
  )
] }));
Y8.displayName = "DrawerContent";
const Z8 = ({
  className: e,
  ...t
}) => /* @__PURE__ */ l.jsx(
  "div",
  {
    className: x("grid gap-1.5 p-4 text-center sm:text-left", e),
    ...t
  }
);
Z8.displayName = "DrawerHeader";
const X8 = ({
  className: e,
  ...t
}) => /* @__PURE__ */ l.jsx(
  "div",
  {
    className: x("mt-auto flex flex-col gap-2 p-4", e),
    ...t
  }
);
X8.displayName = "DrawerFooter";
const q8 = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  wt.Title,
  {
    ref: n,
    className: x(
      "text-lg font-semibold leading-none tracking-tight",
      e
    ),
    ...t
  }
));
q8.displayName = wt.Title.displayName;
const J8 = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  wt.Description,
  {
    ref: n,
    className: x("text-sm text-muted-foreground", e),
    ...t
  }
));
J8.displayName = wt.Description.displayName;
function pe(e) {
  const t = Object.prototype.toString.call(e);
  return e instanceof Date || typeof e == "object" && t === "[object Date]" ? new e.constructor(+e) : typeof e == "number" || t === "[object Number]" || typeof e == "string" || t === "[object String]" ? new Date(e) : /* @__PURE__ */ new Date(NaN);
}
function it(e, t) {
  return e instanceof Date ? new e.constructor(t) : new Date(t);
}
function Ve(e, t) {
  const n = pe(e);
  return isNaN(t) ? it(e, NaN) : (t && n.setDate(n.getDate() + t), n);
}
function bt(e, t) {
  const n = pe(e);
  if (isNaN(t)) return it(e, NaN);
  if (!t)
    return n;
  const a = n.getDate(), r = it(e, n.getTime());
  r.setMonth(n.getMonth() + t + 1, 0);
  const o = r.getDate();
  return a >= o ? r : (n.setFullYear(
    r.getFullYear(),
    r.getMonth(),
    a
  ), n);
}
const Jl = 6048e5, Q8 = 864e5;
let e6 = {};
function Nr() {
  return e6;
}
function Tt(e, t) {
  const n = Nr(), a = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, r = pe(e), o = r.getDay(), i = (o < a ? 7 : 0) + o - a;
  return r.setDate(r.getDate() - i), r.setHours(0, 0, 0, 0), r;
}
function On(e) {
  return Tt(e, { weekStartsOn: 1 });
}
function Ng(e) {
  const t = pe(e), n = t.getFullYear(), a = it(e, 0);
  a.setFullYear(n + 1, 0, 4), a.setHours(0, 0, 0, 0);
  const r = On(a), o = it(e, 0);
  o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0);
  const i = On(o);
  return t.getTime() >= r.getTime() ? n + 1 : t.getTime() >= i.getTime() ? n : n - 1;
}
function ga(e) {
  const t = pe(e);
  return t.setHours(0, 0, 0, 0), t;
}
function bo(e) {
  const t = pe(e), n = new Date(
    Date.UTC(
      t.getFullYear(),
      t.getMonth(),
      t.getDate(),
      t.getHours(),
      t.getMinutes(),
      t.getSeconds(),
      t.getMilliseconds()
    )
  );
  return n.setUTCFullYear(t.getFullYear()), +e - +n;
}
function Et(e, t) {
  const n = ga(e), a = ga(t), r = +n - bo(n), o = +a - bo(a);
  return Math.round((r - o) / Q8);
}
function t6(e) {
  const t = Ng(e), n = it(e, 0);
  return n.setFullYear(t, 0, 4), n.setHours(0, 0, 0, 0), On(n);
}
function Ts(e, t) {
  const n = t * 7;
  return Ve(e, n);
}
function n6(e, t) {
  return bt(e, t * 12);
}
function a6(e) {
  let t;
  return e.forEach(function(n) {
    const a = pe(n);
    (t === void 0 || t < a || isNaN(Number(a))) && (t = a);
  }), t || /* @__PURE__ */ new Date(NaN);
}
function r6(e) {
  let t;
  return e.forEach((n) => {
    const a = pe(n);
    (!t || t > a || isNaN(+a)) && (t = a);
  }), t || /* @__PURE__ */ new Date(NaN);
}
function Je(e, t) {
  const n = ga(e), a = ga(t);
  return +n == +a;
}
function Ql(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function o6(e) {
  if (!Ql(e) && typeof e != "number")
    return !1;
  const t = pe(e);
  return !isNaN(Number(t));
}
function ir(e, t) {
  const n = pe(e), a = pe(t), r = n.getFullYear() - a.getFullYear(), o = n.getMonth() - a.getMonth();
  return r * 12 + o;
}
function i6(e, t, n) {
  const a = Tt(e, n), r = Tt(t, n), o = +a - bo(a), i = +r - bo(r);
  return Math.round((o - i) / Jl);
}
function ec(e) {
  const t = pe(e), n = t.getMonth();
  return t.setFullYear(t.getFullYear(), n + 1, 0), t.setHours(23, 59, 59, 999), t;
}
function Qe(e) {
  const t = pe(e);
  return t.setDate(1), t.setHours(0, 0, 0, 0), t;
}
function Eg(e) {
  const t = pe(e), n = it(e, 0);
  return n.setFullYear(t.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function tc(e, t) {
  const n = Nr(), a = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, r = pe(e), o = r.getDay(), i = (o < a ? -7 : 0) + 6 - (o - a);
  return r.setDate(r.getDate() + i), r.setHours(23, 59, 59, 999), r;
}
function Rg(e) {
  return tc(e, { weekStartsOn: 1 });
}
const s6 = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, l6 = (e, t, n) => {
  let a;
  const r = s6[e];
  return typeof r == "string" ? a = r : t === 1 ? a = r.one : a = r.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + a : a + " ago" : a;
};
function Ui(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const c6 = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, d6 = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, u6 = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, f6 = {
  date: Ui({
    formats: c6,
    defaultWidth: "full"
  }),
  time: Ui({
    formats: d6,
    defaultWidth: "full"
  }),
  dateTime: Ui({
    formats: u6,
    defaultWidth: "full"
  })
}, p6 = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, m6 = (e, t, n, a) => p6[e];
function Oa(e) {
  return (t, n) => {
    const a = n?.context ? String(n.context) : "standalone";
    let r;
    if (a === "formatting" && e.formattingValues) {
      const i = e.defaultFormattingWidth || e.defaultWidth, s = n?.width ? String(n.width) : i;
      r = e.formattingValues[s] || e.formattingValues[i];
    } else {
      const i = e.defaultWidth, s = n?.width ? String(n.width) : e.defaultWidth;
      r = e.values[s] || e.values[i];
    }
    const o = e.argumentCallback ? e.argumentCallback(t) : t;
    return r[o];
  };
}
const h6 = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, g6 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, b6 = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, v6 = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, y6 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, x6 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, w6 = (e, t) => {
  const n = Number(e), a = n % 100;
  if (a > 20 || a < 10)
    switch (a % 10) {
      case 1:
        return n + "st";
      case 2:
        return n + "nd";
      case 3:
        return n + "rd";
    }
  return n + "th";
}, $6 = {
  ordinalNumber: w6,
  era: Oa({
    values: h6,
    defaultWidth: "wide"
  }),
  quarter: Oa({
    values: g6,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Oa({
    values: b6,
    defaultWidth: "wide"
  }),
  day: Oa({
    values: v6,
    defaultWidth: "wide"
  }),
  dayPeriod: Oa({
    values: y6,
    defaultWidth: "wide",
    formattingValues: x6,
    defaultFormattingWidth: "wide"
  })
};
function Da(e) {
  return (t, n = {}) => {
    const a = n.width, r = a && e.matchPatterns[a] || e.matchPatterns[e.defaultMatchWidth], o = t.match(r);
    if (!o)
      return null;
    const i = o[0], s = a && e.parsePatterns[a] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(s) ? S6(s, (p) => p.test(i)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      C6(s, (p) => p.test(i))
    );
    let d;
    d = e.valueCallback ? e.valueCallback(c) : c, d = n.valueCallback ? (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      n.valueCallback(d)
    ) : d;
    const u = t.slice(i.length);
    return { value: d, rest: u };
  };
}
function C6(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function S6(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function _6(e) {
  return (t, n = {}) => {
    const a = t.match(e.matchPattern);
    if (!a) return null;
    const r = a[0], o = t.match(e.parsePattern);
    if (!o) return null;
    let i = e.valueCallback ? e.valueCallback(o[0]) : o[0];
    i = n.valueCallback ? n.valueCallback(i) : i;
    const s = t.slice(r.length);
    return { value: i, rest: s };
  };
}
const N6 = /^(\d+)(th|st|nd|rd)?/i, E6 = /\d+/i, R6 = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, P6 = {
  any: [/^b/i, /^(a|c)/i]
}, k6 = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, T6 = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, A6 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, j6 = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, M6 = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, O6 = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, D6 = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, I6 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, L6 = {
  ordinalNumber: _6({
    matchPattern: N6,
    parsePattern: E6,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Da({
    matchPatterns: R6,
    defaultMatchWidth: "wide",
    parsePatterns: P6,
    defaultParseWidth: "any"
  }),
  quarter: Da({
    matchPatterns: k6,
    defaultMatchWidth: "wide",
    parsePatterns: T6,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Da({
    matchPatterns: A6,
    defaultMatchWidth: "wide",
    parsePatterns: j6,
    defaultParseWidth: "any"
  }),
  day: Da({
    matchPatterns: M6,
    defaultMatchWidth: "wide",
    parsePatterns: O6,
    defaultParseWidth: "any"
  }),
  dayPeriod: Da({
    matchPatterns: D6,
    defaultMatchWidth: "any",
    parsePatterns: I6,
    defaultParseWidth: "any"
  })
}, Pg = {
  code: "en-US",
  formatDistance: l6,
  formatLong: f6,
  formatRelative: m6,
  localize: $6,
  match: L6,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function F6(e) {
  const t = pe(e);
  return Et(t, Eg(t)) + 1;
}
function kg(e) {
  const t = pe(e), n = +On(t) - +t6(t);
  return Math.round(n / Jl) + 1;
}
function Tg(e, t) {
  const n = pe(e), a = n.getFullYear(), r = Nr(), o = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, i = it(e, 0);
  i.setFullYear(a + 1, 0, o), i.setHours(0, 0, 0, 0);
  const s = Tt(i, t), c = it(e, 0);
  c.setFullYear(a, 0, o), c.setHours(0, 0, 0, 0);
  const d = Tt(c, t);
  return n.getTime() >= s.getTime() ? a + 1 : n.getTime() >= d.getTime() ? a : a - 1;
}
function B6(e, t) {
  const n = Nr(), a = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, r = Tg(e, t), o = it(e, 0);
  return o.setFullYear(r, 0, a), o.setHours(0, 0, 0, 0), Tt(o, t);
}
function Ag(e, t) {
  const n = pe(e), a = +Tt(n, t) - +B6(n, t);
  return Math.round(a / Jl) + 1;
}
function ve(e, t) {
  const n = e < 0 ? "-" : "", a = Math.abs(e).toString().padStart(t, "0");
  return n + a;
}
const Jt = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), a = n > 0 ? n : 1 - n;
    return ve(t === "yy" ? a % 100 : a, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : ve(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return ve(e.getDate(), t.length);
  },
  // AM or PM
  a(e, t) {
    const n = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return n.toUpperCase();
      case "aaa":
        return n;
      case "aaaaa":
        return n[0];
      case "aaaa":
      default:
        return n === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(e, t) {
    return ve(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return ve(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return ve(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return ve(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, a = e.getMilliseconds(), r = Math.trunc(
      a * Math.pow(10, n - 3)
    );
    return ve(r, t.length);
  }
}, Yn = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Zd = {
  // Era
  G: function(e, t, n) {
    const a = e.getFullYear() > 0 ? 1 : 0;
    switch (t) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return n.era(a, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return n.era(a, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return n.era(a, { width: "wide" });
    }
  },
  // Year
  y: function(e, t, n) {
    if (t === "yo") {
      const a = e.getFullYear(), r = a > 0 ? a : 1 - a;
      return n.ordinalNumber(r, { unit: "year" });
    }
    return Jt.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, a) {
    const r = Tg(e, a), o = r > 0 ? r : 1 - r;
    if (t === "YY") {
      const i = o % 100;
      return ve(i, 2);
    }
    return t === "Yo" ? n.ordinalNumber(o, { unit: "year" }) : ve(o, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Ng(e);
    return ve(n, t.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(e, t) {
    const n = e.getFullYear();
    return ve(n, t.length);
  },
  // Quarter
  Q: function(e, t, n) {
    const a = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      // 1, 2, 3, 4
      case "Q":
        return String(a);
      // 01, 02, 03, 04
      case "QQ":
        return ve(a, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return n.ordinalNumber(a, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return n.quarter(a, {
          width: "abbreviated",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return n.quarter(a, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return n.quarter(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(e, t, n) {
    const a = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      // 1, 2, 3, 4
      case "q":
        return String(a);
      // 01, 02, 03, 04
      case "qq":
        return ve(a, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return n.ordinalNumber(a, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return n.quarter(a, {
          width: "abbreviated",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return n.quarter(a, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return n.quarter(a, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(e, t, n) {
    const a = e.getMonth();
    switch (t) {
      case "M":
      case "MM":
        return Jt.M(e, t);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return n.ordinalNumber(a + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return n.month(a, {
          width: "abbreviated",
          context: "formatting"
        });
      // J, F, ..., D
      case "MMMMM":
        return n.month(a, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return n.month(a, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(e, t, n) {
    const a = e.getMonth();
    switch (t) {
      // 1, 2, ..., 12
      case "L":
        return String(a + 1);
      // 01, 02, ..., 12
      case "LL":
        return ve(a + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return n.ordinalNumber(a + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return n.month(a, {
          width: "abbreviated",
          context: "standalone"
        });
      // J, F, ..., D
      case "LLLLL":
        return n.month(a, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return n.month(a, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(e, t, n, a) {
    const r = Ag(e, a);
    return t === "wo" ? n.ordinalNumber(r, { unit: "week" }) : ve(r, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const a = kg(e);
    return t === "Io" ? n.ordinalNumber(a, { unit: "week" }) : ve(a, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Jt.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const a = F6(e);
    return t === "Do" ? n.ordinalNumber(a, { unit: "dayOfYear" }) : ve(a, t.length);
  },
  // Day of week
  E: function(e, t, n) {
    const a = e.getDay();
    switch (t) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return n.day(a, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "EEEEE":
        return n.day(a, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return n.day(a, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "EEEE":
      default:
        return n.day(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(e, t, n, a) {
    const r = e.getDay(), o = (r - a.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(o);
      // Padded numerical value
      case "ee":
        return ve(o, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return n.ordinalNumber(o, { unit: "day" });
      case "eee":
        return n.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "eeeee":
        return n.day(r, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return n.day(r, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "eeee":
      default:
        return n.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(e, t, n, a) {
    const r = e.getDay(), o = (r - a.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (same as in `e`)
      case "c":
        return String(o);
      // Padded numerical value
      case "cc":
        return ve(o, t.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return n.ordinalNumber(o, { unit: "day" });
      case "ccc":
        return n.day(r, {
          width: "abbreviated",
          context: "standalone"
        });
      // T
      case "ccccc":
        return n.day(r, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return n.day(r, {
          width: "short",
          context: "standalone"
        });
      // Tuesday
      case "cccc":
      default:
        return n.day(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(e, t, n) {
    const a = e.getDay(), r = a === 0 ? 7 : a;
    switch (t) {
      // 2
      case "i":
        return String(r);
      // 02
      case "ii":
        return ve(r, t.length);
      // 2nd
      case "io":
        return n.ordinalNumber(r, { unit: "day" });
      // Tue
      case "iii":
        return n.day(a, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "iiiii":
        return n.day(a, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "iiiiii":
        return n.day(a, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "iiii":
      default:
        return n.day(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(e, t, n) {
    const r = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return n.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return n.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return n.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return n.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(e, t, n) {
    const a = e.getHours();
    let r;
    switch (a === 12 ? r = Yn.noon : a === 0 ? r = Yn.midnight : r = a / 12 >= 1 ? "pm" : "am", t) {
      case "b":
      case "bb":
        return n.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return n.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return n.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return n.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(e, t, n) {
    const a = e.getHours();
    let r;
    switch (a >= 17 ? r = Yn.evening : a >= 12 ? r = Yn.afternoon : a >= 4 ? r = Yn.morning : r = Yn.night, t) {
      case "B":
      case "BB":
      case "BBB":
        return n.dayPeriod(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return n.dayPeriod(r, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return n.dayPeriod(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(e, t, n) {
    if (t === "ho") {
      let a = e.getHours() % 12;
      return a === 0 && (a = 12), n.ordinalNumber(a, { unit: "hour" });
    }
    return Jt.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Jt.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const a = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(a, { unit: "hour" }) : ve(a, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let a = e.getHours();
    return a === 0 && (a = 24), t === "ko" ? n.ordinalNumber(a, { unit: "hour" }) : ve(a, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Jt.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : Jt.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return Jt.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const a = e.getTimezoneOffset();
    if (a === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return qd(a);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return Sn(a);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return Sn(a, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const a = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return qd(a);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return Sn(a);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return Sn(a, ":");
    }
  },
  // Timezone (GMT)
  O: function(e, t, n) {
    const a = e.getTimezoneOffset();
    switch (t) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + Xd(a, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + Sn(a, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(e, t, n) {
    const a = e.getTimezoneOffset();
    switch (t) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + Xd(a, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + Sn(a, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const a = Math.trunc(e.getTime() / 1e3);
    return ve(a, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    const a = e.getTime();
    return ve(a, t.length);
  }
};
function Xd(e, t = "") {
  const n = e > 0 ? "-" : "+", a = Math.abs(e), r = Math.trunc(a / 60), o = a % 60;
  return o === 0 ? n + String(r) : n + String(r) + t + ve(o, 2);
}
function qd(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + ve(Math.abs(e) / 60, 2) : Sn(e, t);
}
function Sn(e, t = "") {
  const n = e > 0 ? "-" : "+", a = Math.abs(e), r = ve(Math.trunc(a / 60), 2), o = ve(a % 60, 2);
  return n + r + t + o;
}
const Jd = (e, t) => {
  switch (e) {
    case "P":
      return t.date({ width: "short" });
    case "PP":
      return t.date({ width: "medium" });
    case "PPP":
      return t.date({ width: "long" });
    case "PPPP":
    default:
      return t.date({ width: "full" });
  }
}, jg = (e, t) => {
  switch (e) {
    case "p":
      return t.time({ width: "short" });
    case "pp":
      return t.time({ width: "medium" });
    case "ppp":
      return t.time({ width: "long" });
    case "pppp":
    default:
      return t.time({ width: "full" });
  }
}, U6 = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], a = n[1], r = n[2];
  if (!r)
    return Jd(e, t);
  let o;
  switch (a) {
    case "P":
      o = t.dateTime({ width: "short" });
      break;
    case "PP":
      o = t.dateTime({ width: "medium" });
      break;
    case "PPP":
      o = t.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      o = t.dateTime({ width: "full" });
      break;
  }
  return o.replace("{{date}}", Jd(a, t)).replace("{{time}}", jg(r, t));
}, G6 = {
  p: jg,
  P: U6
}, W6 = /^D+$/, H6 = /^Y+$/, V6 = ["D", "DD", "YY", "YYYY"];
function z6(e) {
  return W6.test(e);
}
function K6(e) {
  return H6.test(e);
}
function Y6(e, t, n) {
  const a = Z6(e, t, n);
  if (console.warn(a), V6.includes(e)) throw new RangeError(a);
}
function Z6(e, t, n) {
  const a = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${a} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const X6 = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, q6 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, J6 = /^'([^]*?)'?$/, Q6 = /''/g, eS = /[a-zA-Z]/;
function Wn(e, t, n) {
  const a = Nr(), r = n?.locale ?? a.locale ?? Pg, o = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? a.firstWeekContainsDate ?? a.locale?.options?.firstWeekContainsDate ?? 1, i = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? a.weekStartsOn ?? a.locale?.options?.weekStartsOn ?? 0, s = pe(e);
  if (!o6(s))
    throw new RangeError("Invalid time value");
  let c = t.match(q6).map((u) => {
    const p = u[0];
    if (p === "p" || p === "P") {
      const m = G6[p];
      return m(u, r.formatLong);
    }
    return u;
  }).join("").match(X6).map((u) => {
    if (u === "''")
      return { isToken: !1, value: "'" };
    const p = u[0];
    if (p === "'")
      return { isToken: !1, value: tS(u) };
    if (Zd[p])
      return { isToken: !0, value: u };
    if (p.match(eS))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + p + "`"
      );
    return { isToken: !1, value: u };
  });
  r.localize.preprocessor && (c = r.localize.preprocessor(s, c));
  const d = {
    firstWeekContainsDate: o,
    weekStartsOn: i,
    locale: r
  };
  return c.map((u) => {
    if (!u.isToken) return u.value;
    const p = u.value;
    (!n?.useAdditionalWeekYearTokens && K6(p) || !n?.useAdditionalDayOfYearTokens && z6(p)) && Y6(p, t, String(e));
    const m = Zd[p[0]];
    return m(s, p, r.localize, d);
  }).join("");
}
function tS(e) {
  const t = e.match(J6);
  return t ? t[1].replace(Q6, "'") : e;
}
function nS(e) {
  const t = pe(e), n = t.getFullYear(), a = t.getMonth(), r = it(e, 0);
  return r.setFullYear(n, a + 1, 0), r.setHours(0, 0, 0, 0), r.getDate();
}
function aS(e) {
  return Math.trunc(+pe(e) / 1e3);
}
function rS(e) {
  const t = pe(e), n = t.getMonth();
  return t.setFullYear(t.getFullYear(), n + 1, 0), t.setHours(0, 0, 0, 0), t;
}
function oS(e, t) {
  return i6(
    rS(e),
    Qe(e),
    t
  ) + 1;
}
function As(e, t) {
  const n = pe(e), a = pe(t);
  return n.getTime() > a.getTime();
}
function Mg(e, t) {
  const n = pe(e), a = pe(t);
  return +n < +a;
}
function nc(e, t) {
  const n = pe(e), a = pe(t);
  return n.getFullYear() === a.getFullYear() && n.getMonth() === a.getMonth();
}
function iS(e, t) {
  const n = pe(e), a = pe(t);
  return n.getFullYear() === a.getFullYear();
}
function Gi(e, t) {
  return Ve(e, -t);
}
function Wi(e, t) {
  const n = pe(e), a = n.getFullYear(), r = n.getDate(), o = it(e, 0);
  o.setFullYear(a, t, 15), o.setHours(0, 0, 0, 0);
  const i = nS(o);
  return n.setMonth(t, Math.min(r, i)), n;
}
function Qd(e, t) {
  const n = pe(e);
  return isNaN(+n) ? it(e, NaN) : (n.setFullYear(t), n);
}
var ne = function() {
  return ne = Object.assign || function(t) {
    for (var n, a = 1, r = arguments.length; a < r; a++) {
      n = arguments[a];
      for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
    }
    return t;
  }, ne.apply(this, arguments);
};
function sS(e, t) {
  var n = {};
  for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && t.indexOf(a) < 0 && (n[a] = e[a]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var r = 0, a = Object.getOwnPropertySymbols(e); r < a.length; r++)
      t.indexOf(a[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, a[r]) && (n[a[r]] = e[a[r]]);
  return n;
}
function Og(e, t, n) {
  for (var a = 0, r = t.length, o; a < r; a++)
    (o || !(a in t)) && (o || (o = Array.prototype.slice.call(t, 0, a)), o[a] = t[a]);
  return e.concat(o || Array.prototype.slice.call(t));
}
function Er(e) {
  return e.mode === "multiple";
}
function Rr(e) {
  return e.mode === "range";
}
function fi(e) {
  return e.mode === "single";
}
var lS = {
  root: "rdp",
  multiple_months: "rdp-multiple_months",
  with_weeknumber: "rdp-with_weeknumber",
  vhidden: "rdp-vhidden",
  button_reset: "rdp-button_reset",
  button: "rdp-button",
  caption: "rdp-caption",
  caption_start: "rdp-caption_start",
  caption_end: "rdp-caption_end",
  caption_between: "rdp-caption_between",
  caption_label: "rdp-caption_label",
  caption_dropdowns: "rdp-caption_dropdowns",
  dropdown: "rdp-dropdown",
  dropdown_month: "rdp-dropdown_month",
  dropdown_year: "rdp-dropdown_year",
  dropdown_icon: "rdp-dropdown_icon",
  months: "rdp-months",
  month: "rdp-month",
  table: "rdp-table",
  tbody: "rdp-tbody",
  tfoot: "rdp-tfoot",
  head: "rdp-head",
  head_row: "rdp-head_row",
  head_cell: "rdp-head_cell",
  nav: "rdp-nav",
  nav_button: "rdp-nav_button",
  nav_button_previous: "rdp-nav_button_previous",
  nav_button_next: "rdp-nav_button_next",
  nav_icon: "rdp-nav_icon",
  row: "rdp-row",
  weeknumber: "rdp-weeknumber",
  cell: "rdp-cell",
  day: "rdp-day",
  day_today: "rdp-day_today",
  day_outside: "rdp-day_outside",
  day_selected: "rdp-day_selected",
  day_disabled: "rdp-day_disabled",
  day_hidden: "rdp-day_hidden",
  day_range_start: "rdp-day_range_start",
  day_range_end: "rdp-day_range_end",
  day_range_middle: "rdp-day_range_middle"
};
function cS(e, t) {
  return Wn(e, "LLLL y", t);
}
function dS(e, t) {
  return Wn(e, "d", t);
}
function uS(e, t) {
  return Wn(e, "LLLL", t);
}
function fS(e) {
  return "".concat(e);
}
function pS(e, t) {
  return Wn(e, "cccccc", t);
}
function mS(e, t) {
  return Wn(e, "yyyy", t);
}
var hS = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  formatCaption: cS,
  formatDay: dS,
  formatMonthCaption: uS,
  formatWeekNumber: fS,
  formatWeekdayName: pS,
  formatYearCaption: mS
}), gS = function(e, t, n) {
  return Wn(e, "do MMMM (EEEE)", n);
}, bS = function() {
  return "Month: ";
}, vS = function() {
  return "Go to next month";
}, yS = function() {
  return "Go to previous month";
}, xS = function(e, t) {
  return Wn(e, "cccc", t);
}, wS = function(e) {
  return "Week n. ".concat(e);
}, $S = function() {
  return "Year: ";
}, CS = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  labelDay: gS,
  labelMonthDropdown: bS,
  labelNext: vS,
  labelPrevious: yS,
  labelWeekNumber: wS,
  labelWeekday: xS,
  labelYearDropdown: $S
});
function SS() {
  var e = "buttons", t = lS, n = Pg, a = {}, r = {}, o = 1, i = {}, s = /* @__PURE__ */ new Date();
  return {
    captionLayout: e,
    classNames: t,
    formatters: hS,
    labels: CS,
    locale: n,
    modifiersClassNames: a,
    modifiers: r,
    numberOfMonths: o,
    styles: i,
    today: s,
    mode: "default"
  };
}
function _S(e) {
  var t = e.fromYear, n = e.toYear, a = e.fromMonth, r = e.toMonth, o = e.fromDate, i = e.toDate;
  return a ? o = Qe(a) : t && (o = new Date(t, 0, 1)), r ? i = ec(r) : n && (i = new Date(n, 11, 31)), {
    fromDate: o ? ga(o) : void 0,
    toDate: i ? ga(i) : void 0
  };
}
var Dg = Ue(void 0);
function NS(e) {
  var t, n = e.initialProps, a = SS(), r = _S(n), o = r.fromDate, i = r.toDate, s = (t = n.captionLayout) !== null && t !== void 0 ? t : a.captionLayout;
  s !== "buttons" && (!o || !i) && (s = "buttons");
  var c;
  (fi(n) || Er(n) || Rr(n)) && (c = n.onSelect);
  var d = ne(ne(ne({}, a), n), { captionLayout: s, classNames: ne(ne({}, a.classNames), n.classNames), components: ne({}, n.components), formatters: ne(ne({}, a.formatters), n.formatters), fromDate: o, labels: ne(ne({}, a.labels), n.labels), mode: n.mode || a.mode, modifiers: ne(ne({}, a.modifiers), n.modifiers), modifiersClassNames: ne(ne({}, a.modifiersClassNames), n.modifiersClassNames), onSelect: c, styles: ne(ne({}, a.styles), n.styles), toDate: i });
  return l.jsx(Dg.Provider, { value: d, children: e.children });
}
function $e() {
  var e = _e(Dg);
  if (!e)
    throw new Error("useDayPicker must be used within a DayPickerProvider.");
  return e;
}
function Ig(e) {
  var t = $e(), n = t.locale, a = t.classNames, r = t.styles, o = t.formatters.formatCaption;
  return l.jsx("div", { className: a.caption_label, style: r.caption_label, "aria-live": "polite", role: "presentation", id: e.id, children: o(e.displayMonth, { locale: n }) });
}
function ES(e) {
  return l.jsx("svg", ne({ width: "8px", height: "8px", viewBox: "0 0 120 120", "data-testid": "iconDropdown" }, e, { children: l.jsx("path", { d: "M4.22182541,48.2218254 C8.44222828,44.0014225 15.2388494,43.9273804 19.5496459,47.9996989 L19.7781746,48.2218254 L60,88.443 L100.221825,48.2218254 C104.442228,44.0014225 111.238849,43.9273804 115.549646,47.9996989 L115.778175,48.2218254 C119.998577,52.4422283 120.07262,59.2388494 116.000301,63.5496459 L115.778175,63.7781746 L67.7781746,111.778175 C63.5577717,115.998577 56.7611506,116.07262 52.4503541,112.000301 L52.2218254,111.778175 L4.22182541,63.7781746 C-0.0739418023,59.4824074 -0.0739418023,52.5175926 4.22182541,48.2218254 Z", fill: "currentColor", fillRule: "nonzero" }) }));
}
function Lg(e) {
  var t, n, a = e.onChange, r = e.value, o = e.children, i = e.caption, s = e.className, c = e.style, d = $e(), u = (n = (t = d.components) === null || t === void 0 ? void 0 : t.IconDropdown) !== null && n !== void 0 ? n : ES;
  return l.jsxs("div", { className: s, style: c, children: [l.jsx("span", { className: d.classNames.vhidden, children: e["aria-label"] }), l.jsx("select", { name: e.name, "aria-label": e["aria-label"], className: d.classNames.dropdown, style: d.styles.dropdown, value: r, onChange: a, children: o }), l.jsxs("div", { className: d.classNames.caption_label, style: d.styles.caption_label, "aria-hidden": "true", children: [i, l.jsx(u, { className: d.classNames.dropdown_icon, style: d.styles.dropdown_icon })] })] });
}
function RS(e) {
  var t, n = $e(), a = n.fromDate, r = n.toDate, o = n.styles, i = n.locale, s = n.formatters.formatMonthCaption, c = n.classNames, d = n.components, u = n.labels.labelMonthDropdown;
  if (!a)
    return l.jsx(l.Fragment, {});
  if (!r)
    return l.jsx(l.Fragment, {});
  var p = [];
  if (iS(a, r))
    for (var m = Qe(a), h = a.getMonth(); h <= r.getMonth(); h++)
      p.push(Wi(m, h));
  else
    for (var m = Qe(/* @__PURE__ */ new Date()), h = 0; h <= 11; h++)
      p.push(Wi(m, h));
  var b = function(v) {
    var y = Number(v.target.value), w = Wi(Qe(e.displayMonth), y);
    e.onChange(w);
  }, g = (t = d?.Dropdown) !== null && t !== void 0 ? t : Lg;
  return l.jsx(g, { name: "months", "aria-label": u(), className: c.dropdown_month, style: o.dropdown_month, onChange: b, value: e.displayMonth.getMonth(), caption: s(e.displayMonth, { locale: i }), children: p.map(function(v) {
    return l.jsx("option", { value: v.getMonth(), children: s(v, { locale: i }) }, v.getMonth());
  }) });
}
function PS(e) {
  var t, n = e.displayMonth, a = $e(), r = a.fromDate, o = a.toDate, i = a.locale, s = a.styles, c = a.classNames, d = a.components, u = a.formatters.formatYearCaption, p = a.labels.labelYearDropdown, m = [];
  if (!r)
    return l.jsx(l.Fragment, {});
  if (!o)
    return l.jsx(l.Fragment, {});
  for (var h = r.getFullYear(), b = o.getFullYear(), g = h; g <= b; g++)
    m.push(Qd(Eg(/* @__PURE__ */ new Date()), g));
  var v = function(w) {
    var $ = Qd(Qe(n), Number(w.target.value));
    e.onChange($);
  }, y = (t = d?.Dropdown) !== null && t !== void 0 ? t : Lg;
  return l.jsx(y, { name: "years", "aria-label": p(), className: c.dropdown_year, style: s.dropdown_year, onChange: v, value: n.getFullYear(), caption: u(n, { locale: i }), children: m.map(function(w) {
    return l.jsx("option", { value: w.getFullYear(), children: u(w, { locale: i }) }, w.getFullYear());
  }) });
}
function kS(e, t) {
  var n = je(e), a = n[0], r = n[1], o = t === void 0 ? a : t;
  return [o, r];
}
function TS(e) {
  var t = e.month, n = e.defaultMonth, a = e.today, r = t || n || a || /* @__PURE__ */ new Date(), o = e.toDate, i = e.fromDate, s = e.numberOfMonths, c = s === void 0 ? 1 : s;
  if (o && ir(o, r) < 0) {
    var d = -1 * (c - 1);
    r = bt(o, d);
  }
  return i && ir(r, i) < 0 && (r = i), Qe(r);
}
function AS() {
  var e = $e(), t = TS(e), n = kS(t, e.month), a = n[0], r = n[1], o = function(i) {
    var s;
    if (!e.disableNavigation) {
      var c = Qe(i);
      r(c), (s = e.onMonthChange) === null || s === void 0 || s.call(e, c);
    }
  };
  return [a, o];
}
function jS(e, t) {
  for (var n = t.reverseMonths, a = t.numberOfMonths, r = Qe(e), o = Qe(bt(r, a)), i = ir(o, r), s = [], c = 0; c < i; c++) {
    var d = bt(r, c);
    s.push(d);
  }
  return n && (s = s.reverse()), s;
}
function MS(e, t) {
  if (!t.disableNavigation) {
    var n = t.toDate, a = t.pagedNavigation, r = t.numberOfMonths, o = r === void 0 ? 1 : r, i = a ? o : 1, s = Qe(e);
    if (!n)
      return bt(s, i);
    var c = ir(n, e);
    if (!(c < o))
      return bt(s, i);
  }
}
function OS(e, t) {
  if (!t.disableNavigation) {
    var n = t.fromDate, a = t.pagedNavigation, r = t.numberOfMonths, o = r === void 0 ? 1 : r, i = a ? o : 1, s = Qe(e);
    if (!n)
      return bt(s, -i);
    var c = ir(s, n);
    if (!(c <= 0))
      return bt(s, -i);
  }
}
var Fg = Ue(void 0);
function DS(e) {
  var t = $e(), n = AS(), a = n[0], r = n[1], o = jS(a, t), i = MS(a, t), s = OS(a, t), c = function(p) {
    return o.some(function(m) {
      return nc(p, m);
    });
  }, d = function(p, m) {
    c(p) || (m && Mg(p, m) ? r(bt(p, 1 + t.numberOfMonths * -1)) : r(p));
  }, u = {
    currentMonth: a,
    displayMonths: o,
    goToMonth: r,
    goToDate: d,
    previousMonth: s,
    nextMonth: i,
    isDateDisplayed: c
  };
  return l.jsx(Fg.Provider, { value: u, children: e.children });
}
function Pr() {
  var e = _e(Fg);
  if (!e)
    throw new Error("useNavigation must be used within a NavigationProvider");
  return e;
}
function eu(e) {
  var t, n = $e(), a = n.classNames, r = n.styles, o = n.components, i = Pr().goToMonth, s = function(u) {
    i(bt(u, e.displayIndex ? -e.displayIndex : 0));
  }, c = (t = o?.CaptionLabel) !== null && t !== void 0 ? t : Ig, d = l.jsx(c, { id: e.id, displayMonth: e.displayMonth });
  return l.jsxs("div", { className: a.caption_dropdowns, style: r.caption_dropdowns, children: [l.jsx("div", { className: a.vhidden, children: d }), l.jsx(RS, { onChange: s, displayMonth: e.displayMonth }), l.jsx(PS, { onChange: s, displayMonth: e.displayMonth })] });
}
function IS(e) {
  return l.jsx("svg", ne({ width: "16px", height: "16px", viewBox: "0 0 120 120" }, e, { children: l.jsx("path", { d: "M69.490332,3.34314575 C72.6145263,0.218951416 77.6798462,0.218951416 80.8040405,3.34314575 C83.8617626,6.40086786 83.9268205,11.3179931 80.9992143,14.4548388 L80.8040405,14.6568542 L35.461,60 L80.8040405,105.343146 C83.8617626,108.400868 83.9268205,113.317993 80.9992143,116.454839 L80.8040405,116.656854 C77.7463184,119.714576 72.8291931,119.779634 69.6923475,116.852028 L69.490332,116.656854 L18.490332,65.6568542 C15.4326099,62.5991321 15.367552,57.6820069 18.2951583,54.5451612 L18.490332,54.3431458 L69.490332,3.34314575 Z", fill: "currentColor", fillRule: "nonzero" }) }));
}
function LS(e) {
  return l.jsx("svg", ne({ width: "16px", height: "16px", viewBox: "0 0 120 120" }, e, { children: l.jsx("path", { d: "M49.8040405,3.34314575 C46.6798462,0.218951416 41.6145263,0.218951416 38.490332,3.34314575 C35.4326099,6.40086786 35.367552,11.3179931 38.2951583,14.4548388 L38.490332,14.6568542 L83.8333725,60 L38.490332,105.343146 C35.4326099,108.400868 35.367552,113.317993 38.2951583,116.454839 L38.490332,116.656854 C41.5480541,119.714576 46.4651794,119.779634 49.602025,116.852028 L49.8040405,116.656854 L100.804041,65.6568542 C103.861763,62.5991321 103.926821,57.6820069 100.999214,54.5451612 L100.804041,54.3431458 L49.8040405,3.34314575 Z", fill: "currentColor" }) }));
}
var vo = Ye(function(e, t) {
  var n = $e(), a = n.classNames, r = n.styles, o = [a.button_reset, a.button];
  e.className && o.push(e.className);
  var i = o.join(" "), s = ne(ne({}, r.button_reset), r.button);
  return e.style && Object.assign(s, e.style), l.jsx("button", ne({}, e, { ref: t, type: "button", className: i, style: s }));
});
function FS(e) {
  var t, n, a = $e(), r = a.dir, o = a.locale, i = a.classNames, s = a.styles, c = a.labels, d = c.labelPrevious, u = c.labelNext, p = a.components;
  if (!e.nextMonth && !e.previousMonth)
    return l.jsx(l.Fragment, {});
  var m = d(e.previousMonth, { locale: o }), h = [
    i.nav_button,
    i.nav_button_previous
  ].join(" "), b = u(e.nextMonth, { locale: o }), g = [
    i.nav_button,
    i.nav_button_next
  ].join(" "), v = (t = p?.IconRight) !== null && t !== void 0 ? t : LS, y = (n = p?.IconLeft) !== null && n !== void 0 ? n : IS;
  return l.jsxs("div", { className: i.nav, style: s.nav, children: [!e.hidePrevious && l.jsx(vo, { name: "previous-month", "aria-label": m, className: h, style: s.nav_button_previous, disabled: !e.previousMonth, onClick: e.onPreviousClick, children: r === "rtl" ? l.jsx(v, { className: i.nav_icon, style: s.nav_icon }) : l.jsx(y, { className: i.nav_icon, style: s.nav_icon }) }), !e.hideNext && l.jsx(vo, { name: "next-month", "aria-label": b, className: g, style: s.nav_button_next, disabled: !e.nextMonth, onClick: e.onNextClick, children: r === "rtl" ? l.jsx(y, { className: i.nav_icon, style: s.nav_icon }) : l.jsx(v, { className: i.nav_icon, style: s.nav_icon }) })] });
}
function tu(e) {
  var t = $e().numberOfMonths, n = Pr(), a = n.previousMonth, r = n.nextMonth, o = n.goToMonth, i = n.displayMonths, s = i.findIndex(function(b) {
    return nc(e.displayMonth, b);
  }), c = s === 0, d = s === i.length - 1, u = t > 1 && (c || !d), p = t > 1 && (d || !c), m = function() {
    a && o(a);
  }, h = function() {
    r && o(r);
  };
  return l.jsx(FS, { displayMonth: e.displayMonth, hideNext: u, hidePrevious: p, nextMonth: r, previousMonth: a, onPreviousClick: m, onNextClick: h });
}
function BS(e) {
  var t, n = $e(), a = n.classNames, r = n.disableNavigation, o = n.styles, i = n.captionLayout, s = n.components, c = (t = s?.CaptionLabel) !== null && t !== void 0 ? t : Ig, d;
  return r ? d = l.jsx(c, { id: e.id, displayMonth: e.displayMonth }) : i === "dropdown" ? d = l.jsx(eu, { displayMonth: e.displayMonth, id: e.id }) : i === "dropdown-buttons" ? d = l.jsxs(l.Fragment, { children: [l.jsx(eu, { displayMonth: e.displayMonth, displayIndex: e.displayIndex, id: e.id }), l.jsx(tu, { displayMonth: e.displayMonth, displayIndex: e.displayIndex, id: e.id })] }) : d = l.jsxs(l.Fragment, { children: [l.jsx(c, { id: e.id, displayMonth: e.displayMonth, displayIndex: e.displayIndex }), l.jsx(tu, { displayMonth: e.displayMonth, id: e.id })] }), l.jsx("div", { className: a.caption, style: o.caption, children: d });
}
function US(e) {
  var t = $e(), n = t.footer, a = t.styles, r = t.classNames.tfoot;
  return n ? l.jsx("tfoot", { className: r, style: a.tfoot, children: l.jsx("tr", { children: l.jsx("td", { colSpan: 8, children: n }) }) }) : l.jsx(l.Fragment, {});
}
function GS(e, t, n) {
  for (var a = n ? On(/* @__PURE__ */ new Date()) : Tt(/* @__PURE__ */ new Date(), { locale: e, weekStartsOn: t }), r = [], o = 0; o < 7; o++) {
    var i = Ve(a, o);
    r.push(i);
  }
  return r;
}
function WS() {
  var e = $e(), t = e.classNames, n = e.styles, a = e.showWeekNumber, r = e.locale, o = e.weekStartsOn, i = e.ISOWeek, s = e.formatters.formatWeekdayName, c = e.labels.labelWeekday, d = GS(r, o, i);
  return l.jsxs("tr", { style: n.head_row, className: t.head_row, children: [a && l.jsx("td", { style: n.head_cell, className: t.head_cell }), d.map(function(u, p) {
    return l.jsx("th", { scope: "col", className: t.head_cell, style: n.head_cell, "aria-label": c(u, { locale: r }), children: s(u, { locale: r }) }, p);
  })] });
}
function HS() {
  var e, t = $e(), n = t.classNames, a = t.styles, r = t.components, o = (e = r?.HeadRow) !== null && e !== void 0 ? e : WS;
  return l.jsx("thead", { style: a.head, className: n.head, children: l.jsx(o, {}) });
}
function VS(e) {
  var t = $e(), n = t.locale, a = t.formatters.formatDay;
  return l.jsx(l.Fragment, { children: a(e.date, { locale: n }) });
}
var ac = Ue(void 0);
function zS(e) {
  if (!Er(e.initialProps)) {
    var t = {
      selected: void 0,
      modifiers: {
        disabled: []
      }
    };
    return l.jsx(ac.Provider, { value: t, children: e.children });
  }
  return l.jsx(KS, { initialProps: e.initialProps, children: e.children });
}
function KS(e) {
  var t = e.initialProps, n = e.children, a = t.selected, r = t.min, o = t.max, i = function(d, u, p) {
    var m, h;
    (m = t.onDayClick) === null || m === void 0 || m.call(t, d, u, p);
    var b = !!(u.selected && r && a?.length === r);
    if (!b) {
      var g = !!(!u.selected && o && a?.length === o);
      if (!g) {
        var v = a ? Og([], a) : [];
        if (u.selected) {
          var y = v.findIndex(function(w) {
            return Je(d, w);
          });
          v.splice(y, 1);
        } else
          v.push(d);
        (h = t.onSelect) === null || h === void 0 || h.call(t, v, d, u, p);
      }
    }
  }, s = {
    disabled: []
  };
  a && s.disabled.push(function(d) {
    var u = o && a.length > o - 1, p = a.some(function(m) {
      return Je(m, d);
    });
    return !!(u && !p);
  });
  var c = {
    selected: a,
    onDayClick: i,
    modifiers: s
  };
  return l.jsx(ac.Provider, { value: c, children: n });
}
function rc() {
  var e = _e(ac);
  if (!e)
    throw new Error("useSelectMultiple must be used within a SelectMultipleProvider");
  return e;
}
function YS(e, t) {
  var n = t || {}, a = n.from, r = n.to;
  return a && r ? Je(r, e) && Je(a, e) ? void 0 : Je(r, e) ? { from: r, to: void 0 } : Je(a, e) ? void 0 : As(a, e) ? { from: e, to: r } : { from: a, to: e } : r ? As(e, r) ? { from: r, to: e } : { from: e, to: r } : a ? Mg(e, a) ? { from: e, to: a } : { from: a, to: e } : { from: e, to: void 0 };
}
var oc = Ue(void 0);
function ZS(e) {
  if (!Rr(e.initialProps)) {
    var t = {
      selected: void 0,
      modifiers: {
        range_start: [],
        range_end: [],
        range_middle: [],
        disabled: []
      }
    };
    return l.jsx(oc.Provider, { value: t, children: e.children });
  }
  return l.jsx(XS, { initialProps: e.initialProps, children: e.children });
}
function XS(e) {
  var t = e.initialProps, n = e.children, a = t.selected, r = a || {}, o = r.from, i = r.to, s = t.min, c = t.max, d = function(h, b, g) {
    var v, y;
    (v = t.onDayClick) === null || v === void 0 || v.call(t, h, b, g);
    var w = YS(h, a);
    (y = t.onSelect) === null || y === void 0 || y.call(t, w, h, b, g);
  }, u = {
    range_start: [],
    range_end: [],
    range_middle: [],
    disabled: []
  };
  if (o ? (u.range_start = [o], i ? (u.range_end = [i], Je(o, i) || (u.range_middle = [
    {
      after: o,
      before: i
    }
  ])) : u.range_end = [o]) : i && (u.range_start = [i], u.range_end = [i]), s && (o && !i && u.disabled.push({
    after: Gi(o, s - 1),
    before: Ve(o, s - 1)
  }), o && i && u.disabled.push({
    after: o,
    before: Ve(o, s - 1)
  }), !o && i && u.disabled.push({
    after: Gi(i, s - 1),
    before: Ve(i, s - 1)
  })), c) {
    if (o && !i && (u.disabled.push({
      before: Ve(o, -c + 1)
    }), u.disabled.push({
      after: Ve(o, c - 1)
    })), o && i) {
      var p = Et(i, o) + 1, m = c - p;
      u.disabled.push({
        before: Gi(o, m)
      }), u.disabled.push({
        after: Ve(i, m)
      });
    }
    !o && i && (u.disabled.push({
      before: Ve(i, -c + 1)
    }), u.disabled.push({
      after: Ve(i, c - 1)
    }));
  }
  return l.jsx(oc.Provider, { value: { selected: a, onDayClick: d, modifiers: u }, children: n });
}
function ic() {
  var e = _e(oc);
  if (!e)
    throw new Error("useSelectRange must be used within a SelectRangeProvider");
  return e;
}
function Yr(e) {
  return Array.isArray(e) ? Og([], e) : e !== void 0 ? [e] : [];
}
function qS(e) {
  var t = {};
  return Object.entries(e).forEach(function(n) {
    var a = n[0], r = n[1];
    t[a] = Yr(r);
  }), t;
}
var vt;
(function(e) {
  e.Outside = "outside", e.Disabled = "disabled", e.Selected = "selected", e.Hidden = "hidden", e.Today = "today", e.RangeStart = "range_start", e.RangeEnd = "range_end", e.RangeMiddle = "range_middle";
})(vt || (vt = {}));
var JS = vt.Selected, Lt = vt.Disabled, QS = vt.Hidden, e7 = vt.Today, Hi = vt.RangeEnd, Vi = vt.RangeMiddle, zi = vt.RangeStart, t7 = vt.Outside;
function n7(e, t, n) {
  var a, r = (a = {}, a[JS] = Yr(e.selected), a[Lt] = Yr(e.disabled), a[QS] = Yr(e.hidden), a[e7] = [e.today], a[Hi] = [], a[Vi] = [], a[zi] = [], a[t7] = [], a);
  return e.fromDate && r[Lt].push({ before: e.fromDate }), e.toDate && r[Lt].push({ after: e.toDate }), Er(e) ? r[Lt] = r[Lt].concat(t.modifiers[Lt]) : Rr(e) && (r[Lt] = r[Lt].concat(n.modifiers[Lt]), r[zi] = n.modifiers[zi], r[Vi] = n.modifiers[Vi], r[Hi] = n.modifiers[Hi]), r;
}
var Bg = Ue(void 0);
function a7(e) {
  var t = $e(), n = rc(), a = ic(), r = n7(t, n, a), o = qS(t.modifiers), i = ne(ne({}, r), o);
  return l.jsx(Bg.Provider, { value: i, children: e.children });
}
function Ug() {
  var e = _e(Bg);
  if (!e)
    throw new Error("useModifiers must be used within a ModifiersProvider");
  return e;
}
function r7(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function o7(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function i7(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function s7(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function l7(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function c7(e, t) {
  var n, a = t.from, r = t.to;
  if (a && r) {
    var o = Et(r, a) < 0;
    o && (n = [r, a], a = n[0], r = n[1]);
    var i = Et(e, a) >= 0 && Et(r, e) >= 0;
    return i;
  }
  return r ? Je(r, e) : a ? Je(a, e) : !1;
}
function d7(e) {
  return Ql(e);
}
function u7(e) {
  return Array.isArray(e) && e.every(Ql);
}
function f7(e, t) {
  return t.some(function(n) {
    if (typeof n == "boolean")
      return n;
    if (d7(n))
      return Je(e, n);
    if (u7(n))
      return n.includes(e);
    if (o7(n))
      return c7(e, n);
    if (l7(n))
      return n.dayOfWeek.includes(e.getDay());
    if (r7(n)) {
      var a = Et(n.before, e), r = Et(n.after, e), o = a > 0, i = r < 0, s = As(n.before, n.after);
      return s ? i && o : o || i;
    }
    return i7(n) ? Et(e, n.after) > 0 : s7(n) ? Et(n.before, e) > 0 : typeof n == "function" ? n(e) : !1;
  });
}
function sc(e, t, n) {
  var a = Object.keys(t).reduce(function(o, i) {
    var s = t[i];
    return f7(e, s) && o.push(i), o;
  }, []), r = {};
  return a.forEach(function(o) {
    return r[o] = !0;
  }), n && !nc(e, n) && (r.outside = !0), r;
}
function p7(e, t) {
  for (var n = Qe(e[0]), a = ec(e[e.length - 1]), r, o, i = n; i <= a; ) {
    var s = sc(i, t), c = !s.disabled && !s.hidden;
    if (!c) {
      i = Ve(i, 1);
      continue;
    }
    if (s.selected)
      return i;
    s.today && !o && (o = i), r || (r = i), i = Ve(i, 1);
  }
  return o || r;
}
var m7 = 365;
function Gg(e, t) {
  var n = t.moveBy, a = t.direction, r = t.context, o = t.modifiers, i = t.retry, s = i === void 0 ? { count: 0, lastFocused: e } : i, c = r.weekStartsOn, d = r.fromDate, u = r.toDate, p = r.locale, m = {
    day: Ve,
    week: Ts,
    month: bt,
    year: n6,
    startOfWeek: function(v) {
      return r.ISOWeek ? On(v) : Tt(v, { locale: p, weekStartsOn: c });
    },
    endOfWeek: function(v) {
      return r.ISOWeek ? Rg(v) : tc(v, { locale: p, weekStartsOn: c });
    }
  }, h = m[n](e, a === "after" ? 1 : -1);
  a === "before" && d ? h = a6([d, h]) : a === "after" && u && (h = r6([u, h]));
  var b = !0;
  if (o) {
    var g = sc(h, o);
    b = !g.disabled && !g.hidden;
  }
  return b ? h : s.count > m7 ? s.lastFocused : Gg(h, {
    moveBy: n,
    direction: a,
    context: r,
    modifiers: o,
    retry: ne(ne({}, s), { count: s.count + 1 })
  });
}
var Wg = Ue(void 0);
function h7(e) {
  var t = Pr(), n = Ug(), a = je(), r = a[0], o = a[1], i = je(), s = i[0], c = i[1], d = p7(t.displayMonths, n), u = r ?? (s && t.isDateDisplayed(s)) ? s : d, p = function() {
    c(r), o(void 0);
  }, m = function(v) {
    o(v);
  }, h = $e(), b = function(v, y) {
    if (r) {
      var w = Gg(r, {
        moveBy: v,
        direction: y,
        context: h,
        modifiers: n
      });
      Je(r, w) || (t.goToDate(w, r), m(w));
    }
  }, g = {
    focusedDay: r,
    focusTarget: u,
    blur: p,
    focus: m,
    focusDayAfter: function() {
      return b("day", "after");
    },
    focusDayBefore: function() {
      return b("day", "before");
    },
    focusWeekAfter: function() {
      return b("week", "after");
    },
    focusWeekBefore: function() {
      return b("week", "before");
    },
    focusMonthBefore: function() {
      return b("month", "before");
    },
    focusMonthAfter: function() {
      return b("month", "after");
    },
    focusYearBefore: function() {
      return b("year", "before");
    },
    focusYearAfter: function() {
      return b("year", "after");
    },
    focusStartOfWeek: function() {
      return b("startOfWeek", "before");
    },
    focusEndOfWeek: function() {
      return b("endOfWeek", "after");
    }
  };
  return l.jsx(Wg.Provider, { value: g, children: e.children });
}
function lc() {
  var e = _e(Wg);
  if (!e)
    throw new Error("useFocusContext must be used within a FocusProvider");
  return e;
}
function g7(e, t) {
  var n = Ug(), a = sc(e, n, t);
  return a;
}
var cc = Ue(void 0);
function b7(e) {
  if (!fi(e.initialProps)) {
    var t = {
      selected: void 0
    };
    return l.jsx(cc.Provider, { value: t, children: e.children });
  }
  return l.jsx(v7, { initialProps: e.initialProps, children: e.children });
}
function v7(e) {
  var t = e.initialProps, n = e.children, a = function(o, i, s) {
    var c, d, u;
    if ((c = t.onDayClick) === null || c === void 0 || c.call(t, o, i, s), i.selected && !t.required) {
      (d = t.onSelect) === null || d === void 0 || d.call(t, void 0, o, i, s);
      return;
    }
    (u = t.onSelect) === null || u === void 0 || u.call(t, o, o, i, s);
  }, r = {
    selected: t.selected,
    onDayClick: a
  };
  return l.jsx(cc.Provider, { value: r, children: n });
}
function Hg() {
  var e = _e(cc);
  if (!e)
    throw new Error("useSelectSingle must be used within a SelectSingleProvider");
  return e;
}
function y7(e, t) {
  var n = $e(), a = Hg(), r = rc(), o = ic(), i = lc(), s = i.focusDayAfter, c = i.focusDayBefore, d = i.focusWeekAfter, u = i.focusWeekBefore, p = i.blur, m = i.focus, h = i.focusMonthBefore, b = i.focusMonthAfter, g = i.focusYearBefore, v = i.focusYearAfter, y = i.focusStartOfWeek, w = i.focusEndOfWeek, $ = function(A) {
    var E, O, N, H;
    fi(n) ? (E = a.onDayClick) === null || E === void 0 || E.call(a, e, t, A) : Er(n) ? (O = r.onDayClick) === null || O === void 0 || O.call(r, e, t, A) : Rr(n) ? (N = o.onDayClick) === null || N === void 0 || N.call(o, e, t, A) : (H = n.onDayClick) === null || H === void 0 || H.call(n, e, t, A);
  }, C = function(A) {
    var E;
    m(e), (E = n.onDayFocus) === null || E === void 0 || E.call(n, e, t, A);
  }, R = function(A) {
    var E;
    p(), (E = n.onDayBlur) === null || E === void 0 || E.call(n, e, t, A);
  }, k = function(A) {
    var E;
    (E = n.onDayMouseEnter) === null || E === void 0 || E.call(n, e, t, A);
  }, S = function(A) {
    var E;
    (E = n.onDayMouseLeave) === null || E === void 0 || E.call(n, e, t, A);
  }, j = function(A) {
    var E;
    (E = n.onDayPointerEnter) === null || E === void 0 || E.call(n, e, t, A);
  }, P = function(A) {
    var E;
    (E = n.onDayPointerLeave) === null || E === void 0 || E.call(n, e, t, A);
  }, B = function(A) {
    var E;
    (E = n.onDayTouchCancel) === null || E === void 0 || E.call(n, e, t, A);
  }, z = function(A) {
    var E;
    (E = n.onDayTouchEnd) === null || E === void 0 || E.call(n, e, t, A);
  }, L = function(A) {
    var E;
    (E = n.onDayTouchMove) === null || E === void 0 || E.call(n, e, t, A);
  }, T = function(A) {
    var E;
    (E = n.onDayTouchStart) === null || E === void 0 || E.call(n, e, t, A);
  }, K = function(A) {
    var E;
    (E = n.onDayKeyUp) === null || E === void 0 || E.call(n, e, t, A);
  }, Q = function(A) {
    var E;
    switch (A.key) {
      case "ArrowLeft":
        A.preventDefault(), A.stopPropagation(), n.dir === "rtl" ? s() : c();
        break;
      case "ArrowRight":
        A.preventDefault(), A.stopPropagation(), n.dir === "rtl" ? c() : s();
        break;
      case "ArrowDown":
        A.preventDefault(), A.stopPropagation(), d();
        break;
      case "ArrowUp":
        A.preventDefault(), A.stopPropagation(), u();
        break;
      case "PageUp":
        A.preventDefault(), A.stopPropagation(), A.shiftKey ? g() : h();
        break;
      case "PageDown":
        A.preventDefault(), A.stopPropagation(), A.shiftKey ? v() : b();
        break;
      case "Home":
        A.preventDefault(), A.stopPropagation(), y();
        break;
      case "End":
        A.preventDefault(), A.stopPropagation(), w();
        break;
    }
    (E = n.onDayKeyDown) === null || E === void 0 || E.call(n, e, t, A);
  }, V = {
    onClick: $,
    onFocus: C,
    onBlur: R,
    onKeyDown: Q,
    onKeyUp: K,
    onMouseEnter: k,
    onMouseLeave: S,
    onPointerEnter: j,
    onPointerLeave: P,
    onTouchCancel: B,
    onTouchEnd: z,
    onTouchMove: L,
    onTouchStart: T
  };
  return V;
}
function x7() {
  var e = $e(), t = Hg(), n = rc(), a = ic(), r = fi(e) ? t.selected : Er(e) ? n.selected : Rr(e) ? a.selected : void 0;
  return r;
}
function w7(e) {
  return Object.values(vt).includes(e);
}
function $7(e, t) {
  var n = [e.classNames.day];
  return Object.keys(t).forEach(function(a) {
    var r = e.modifiersClassNames[a];
    if (r)
      n.push(r);
    else if (w7(a)) {
      var o = e.classNames["day_".concat(a)];
      o && n.push(o);
    }
  }), n;
}
function C7(e, t) {
  var n = ne({}, e.styles.day);
  return Object.keys(t).forEach(function(a) {
    var r;
    n = ne(ne({}, n), (r = e.modifiersStyles) === null || r === void 0 ? void 0 : r[a]);
  }), n;
}
function S7(e, t, n) {
  var a, r, o, i = $e(), s = lc(), c = g7(e, t), d = y7(e, c), u = x7(), p = !!(i.onDayClick || i.mode !== "default");
  At(function() {
    var k;
    c.outside || s.focusedDay && p && Je(s.focusedDay, e) && ((k = n.current) === null || k === void 0 || k.focus());
  }, [
    s.focusedDay,
    e,
    n,
    p,
    c.outside
  ]);
  var m = $7(i, c).join(" "), h = C7(i, c), b = !!(c.outside && !i.showOutsideDays || c.hidden), g = (o = (r = i.components) === null || r === void 0 ? void 0 : r.DayContent) !== null && o !== void 0 ? o : VS, v = l.jsx(g, { date: e, displayMonth: t, activeModifiers: c }), y = {
    style: h,
    className: m,
    children: v,
    role: "gridcell"
  }, w = s.focusTarget && Je(s.focusTarget, e) && !c.outside, $ = s.focusedDay && Je(s.focusedDay, e), C = ne(ne(ne({}, y), (a = { disabled: c.disabled, role: "gridcell" }, a["aria-selected"] = c.selected, a.tabIndex = $ || w ? 0 : -1, a)), d), R = {
    isButton: p,
    isHidden: b,
    activeModifiers: c,
    selectedDays: u,
    buttonProps: C,
    divProps: y
  };
  return R;
}
function _7(e) {
  var t = D0(null), n = S7(e.date, e.displayMonth, t);
  return n.isHidden ? l.jsx("div", { role: "gridcell" }) : n.isButton ? l.jsx(vo, ne({ name: "day", ref: t }, n.buttonProps)) : l.jsx("div", ne({}, n.divProps));
}
function N7(e) {
  var t = e.number, n = e.dates, a = $e(), r = a.onWeekNumberClick, o = a.styles, i = a.classNames, s = a.locale, c = a.labels.labelWeekNumber, d = a.formatters.formatWeekNumber, u = d(Number(t), { locale: s });
  if (!r)
    return l.jsx("span", { className: i.weeknumber, style: o.weeknumber, children: u });
  var p = c(Number(t), { locale: s }), m = function(h) {
    r(t, n, h);
  };
  return l.jsx(vo, { name: "week-number", "aria-label": p, className: i.weeknumber, style: o.weeknumber, onClick: m, children: u });
}
function E7(e) {
  var t, n, a = $e(), r = a.styles, o = a.classNames, i = a.showWeekNumber, s = a.components, c = (t = s?.Day) !== null && t !== void 0 ? t : _7, d = (n = s?.WeekNumber) !== null && n !== void 0 ? n : N7, u;
  return i && (u = l.jsx("td", { className: o.cell, style: r.cell, children: l.jsx(d, { number: e.weekNumber, dates: e.dates }) })), l.jsxs("tr", { className: o.row, style: r.row, children: [u, e.dates.map(function(p) {
    return l.jsx("td", { className: o.cell, style: r.cell, role: "presentation", children: l.jsx(c, { displayMonth: e.displayMonth, date: p }) }, aS(p));
  })] });
}
function nu(e, t, n) {
  for (var a = n?.ISOWeek ? Rg(t) : tc(t, n), r = n?.ISOWeek ? On(e) : Tt(e, n), o = Et(a, r), i = [], s = 0; s <= o; s++)
    i.push(Ve(r, s));
  var c = i.reduce(function(d, u) {
    var p = n?.ISOWeek ? kg(u) : Ag(u, n), m = d.find(function(h) {
      return h.weekNumber === p;
    });
    return m ? (m.dates.push(u), d) : (d.push({
      weekNumber: p,
      dates: [u]
    }), d);
  }, []);
  return c;
}
function R7(e, t) {
  var n = nu(Qe(e), ec(e), t);
  if (t?.useFixedWeeks) {
    var a = oS(e, t);
    if (a < 6) {
      var r = n[n.length - 1], o = r.dates[r.dates.length - 1], i = Ts(o, 6 - a), s = nu(Ts(o, 1), i, t);
      n.push.apply(n, s);
    }
  }
  return n;
}
function P7(e) {
  var t, n, a, r = $e(), o = r.locale, i = r.classNames, s = r.styles, c = r.hideHead, d = r.fixedWeeks, u = r.components, p = r.weekStartsOn, m = r.firstWeekContainsDate, h = r.ISOWeek, b = R7(e.displayMonth, {
    useFixedWeeks: !!d,
    ISOWeek: h,
    locale: o,
    weekStartsOn: p,
    firstWeekContainsDate: m
  }), g = (t = u?.Head) !== null && t !== void 0 ? t : HS, v = (n = u?.Row) !== null && n !== void 0 ? n : E7, y = (a = u?.Footer) !== null && a !== void 0 ? a : US;
  return l.jsxs("table", { id: e.id, className: i.table, style: s.table, role: "grid", "aria-labelledby": e["aria-labelledby"], children: [!c && l.jsx(g, {}), l.jsx("tbody", { className: i.tbody, style: s.tbody, children: b.map(function(w) {
    return l.jsx(v, { displayMonth: e.displayMonth, dates: w.dates, weekNumber: w.weekNumber }, w.weekNumber);
  }) }), l.jsx(y, { displayMonth: e.displayMonth })] });
}
function k7() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
var T7 = k7() ? js : At, Ki = !1, A7 = 0;
function au() {
  return "react-day-picker-".concat(++A7);
}
function j7(e) {
  var t, n = e ?? (Ki ? au() : null), a = je(n), r = a[0], o = a[1];
  return T7(function() {
    r === null && o(au());
  }, []), At(function() {
    Ki === !1 && (Ki = !0);
  }, []), (t = e ?? r) !== null && t !== void 0 ? t : void 0;
}
function M7(e) {
  var t, n, a = $e(), r = a.dir, o = a.classNames, i = a.styles, s = a.components, c = Pr().displayMonths, d = j7(a.id ? "".concat(a.id, "-").concat(e.displayIndex) : void 0), u = a.id ? "".concat(a.id, "-grid-").concat(e.displayIndex) : void 0, p = [o.month], m = i.month, h = e.displayIndex === 0, b = e.displayIndex === c.length - 1, g = !h && !b;
  r === "rtl" && (t = [h, b], b = t[0], h = t[1]), h && (p.push(o.caption_start), m = ne(ne({}, m), i.caption_start)), b && (p.push(o.caption_end), m = ne(ne({}, m), i.caption_end)), g && (p.push(o.caption_between), m = ne(ne({}, m), i.caption_between));
  var v = (n = s?.Caption) !== null && n !== void 0 ? n : BS;
  return l.jsxs("div", { className: p.join(" "), style: m, children: [l.jsx(v, { id: d, displayMonth: e.displayMonth, displayIndex: e.displayIndex }), l.jsx(P7, { id: u, "aria-labelledby": d, displayMonth: e.displayMonth })] }, e.displayIndex);
}
function O7(e) {
  var t = $e(), n = t.classNames, a = t.styles;
  return l.jsx("div", { className: n.months, style: a.months, children: e.children });
}
function D7(e) {
  var t, n, a = e.initialProps, r = $e(), o = lc(), i = Pr(), s = je(!1), c = s[0], d = s[1];
  At(function() {
    r.initialFocus && o.focusTarget && (c || (o.focus(o.focusTarget), d(!0)));
  }, [
    r.initialFocus,
    c,
    o.focus,
    o.focusTarget,
    o
  ]);
  var u = [r.classNames.root, r.className];
  r.numberOfMonths > 1 && u.push(r.classNames.multiple_months), r.showWeekNumber && u.push(r.classNames.with_weeknumber);
  var p = ne(ne({}, r.styles.root), r.style), m = Object.keys(a).filter(function(b) {
    return b.startsWith("data-");
  }).reduce(function(b, g) {
    var v;
    return ne(ne({}, b), (v = {}, v[g] = a[g], v));
  }, {}), h = (n = (t = a.components) === null || t === void 0 ? void 0 : t.Months) !== null && n !== void 0 ? n : O7;
  return l.jsx("div", ne({ className: u.join(" "), style: p, dir: r.dir, id: r.id, nonce: a.nonce, title: a.title, lang: a.lang }, m, { children: l.jsx(h, { children: i.displayMonths.map(function(b, g) {
    return l.jsx(M7, { displayIndex: g, displayMonth: b }, g);
  }) }) }));
}
function I7(e) {
  var t = e.children, n = sS(e, ["children"]);
  return l.jsx(NS, { initialProps: n, children: l.jsx(DS, { children: l.jsx(b7, { initialProps: n, children: l.jsx(zS, { initialProps: n, children: l.jsx(ZS, { initialProps: n, children: l.jsx(a7, { children: l.jsx(h7, { children: t }) }) }) }) }) }) });
}
function L7(e) {
  return l.jsx(I7, ne({}, e, { children: l.jsx(D7, { initialProps: e }) }));
}
function F7({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  ...a
}) {
  return /* @__PURE__ */ l.jsx(
    L7,
    {
      showOutsideDays: n,
      className: x("p-3", e),
      classNames: {
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: x(
          qi({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: x(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          a.mode === "range" ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md" : "[&:has([aria-selected])]:rounded-md"
        ),
        day: x(
          qi({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...t
      },
      components: {
        IconLeft: () => /* @__PURE__ */ l.jsx(n1, { className: "h-4 w-4" }),
        IconRight: () => /* @__PURE__ */ l.jsx(ku, { className: "h-4 w-4" })
      },
      ...a
    }
  );
}
F7.displayName = "Calendar";
var Vg = "Toggle", dc = f.forwardRef((e, t) => {
  const { pressed: n, defaultPressed: a, onPressedChange: r, ...o } = e, [i, s] = Ke({
    prop: n,
    onChange: r,
    defaultProp: a ?? !1,
    caller: Vg
  });
  return /* @__PURE__ */ l.jsx(
    Y.button,
    {
      type: "button",
      "aria-pressed": i,
      "data-state": i ? "on" : "off",
      "data-disabled": e.disabled ? "" : void 0,
      ...o,
      ref: t,
      onClick: U(e.onClick, () => {
        e.disabled || s(!i);
      })
    }
  );
});
dc.displayName = Vg;
var zg = dc, vn = "ToggleGroup", [Kg, hN] = Fe(vn, [
  mn
]), Yg = mn(), uc = D.forwardRef((e, t) => {
  const { type: n, ...a } = e;
  if (n === "single") {
    const r = a;
    return /* @__PURE__ */ l.jsx(B7, { ...r, ref: t });
  }
  if (n === "multiple") {
    const r = a;
    return /* @__PURE__ */ l.jsx(U7, { ...r, ref: t });
  }
  throw new Error(`Missing prop \`type\` expected on \`${vn}\``);
});
uc.displayName = vn;
var [Zg, Xg] = Kg(vn), B7 = D.forwardRef((e, t) => {
  const {
    value: n,
    defaultValue: a,
    onValueChange: r = () => {
    },
    ...o
  } = e, [i, s] = Ke({
    prop: n,
    defaultProp: a ?? "",
    onChange: r,
    caller: vn
  });
  return /* @__PURE__ */ l.jsx(
    Zg,
    {
      scope: e.__scopeToggleGroup,
      type: "single",
      value: D.useMemo(() => i ? [i] : [], [i]),
      onItemActivate: s,
      onItemDeactivate: D.useCallback(() => s(""), [s]),
      children: /* @__PURE__ */ l.jsx(qg, { ...o, ref: t })
    }
  );
}), U7 = D.forwardRef((e, t) => {
  const {
    value: n,
    defaultValue: a,
    onValueChange: r = () => {
    },
    ...o
  } = e, [i, s] = Ke({
    prop: n,
    defaultProp: a ?? [],
    onChange: r,
    caller: vn
  }), c = D.useCallback(
    (u) => s((p = []) => [...p, u]),
    [s]
  ), d = D.useCallback(
    (u) => s((p = []) => p.filter((m) => m !== u)),
    [s]
  );
  return /* @__PURE__ */ l.jsx(
    Zg,
    {
      scope: e.__scopeToggleGroup,
      type: "multiple",
      value: i,
      onItemActivate: c,
      onItemDeactivate: d,
      children: /* @__PURE__ */ l.jsx(qg, { ...o, ref: t })
    }
  );
});
uc.displayName = vn;
var [G7, W7] = Kg(vn), qg = D.forwardRef(
  (e, t) => {
    const {
      __scopeToggleGroup: n,
      disabled: a = !1,
      rovingFocus: r = !0,
      orientation: o,
      dir: i,
      loop: s = !0,
      ...c
    } = e, d = Yg(n), u = In(i), p = { role: "group", dir: u, ...c };
    return /* @__PURE__ */ l.jsx(G7, { scope: n, rovingFocus: r, disabled: a, children: r ? /* @__PURE__ */ l.jsx(
      Lo,
      {
        asChild: !0,
        ...d,
        orientation: o,
        dir: u,
        loop: s,
        children: /* @__PURE__ */ l.jsx(Y.div, { ...p, ref: t })
      }
    ) : /* @__PURE__ */ l.jsx(Y.div, { ...p, ref: t }) });
  }
), yo = "ToggleGroupItem", Jg = D.forwardRef(
  (e, t) => {
    const n = Xg(yo, e.__scopeToggleGroup), a = W7(yo, e.__scopeToggleGroup), r = Yg(e.__scopeToggleGroup), o = n.value.includes(e.value), i = a.disabled || e.disabled, s = { ...e, pressed: o, disabled: i }, c = D.useRef(null);
    return a.rovingFocus ? /* @__PURE__ */ l.jsx(
      Fo,
      {
        asChild: !0,
        ...r,
        focusable: !i,
        active: o,
        ref: c,
        children: /* @__PURE__ */ l.jsx(ru, { ...s, ref: t })
      }
    ) : /* @__PURE__ */ l.jsx(ru, { ...s, ref: t });
  }
);
Jg.displayName = yo;
var ru = D.forwardRef(
  (e, t) => {
    const { __scopeToggleGroup: n, value: a, ...r } = e, o = Xg(yo, n), i = { role: "radio", "aria-checked": e.pressed, "aria-pressed": void 0 }, s = o.type === "single" ? i : void 0;
    return /* @__PURE__ */ l.jsx(
      dc,
      {
        ...s,
        ...r,
        ref: t,
        onPressedChange: (c) => {
          c ? o.onItemActivate(a) : o.onItemDeactivate(a);
        }
      }
    );
  }
), Qg = uc, e0 = Jg;
const t0 = sr(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), H7 = f.forwardRef(({ className: e, variant: t, size: n, ...a }, r) => /* @__PURE__ */ l.jsx(
  zg,
  {
    ref: r,
    className: x(t0({ variant: t, size: n, className: e })),
    ...a
  }
));
H7.displayName = zg.displayName;
const n0 = f.createContext({
  size: "default",
  variant: "default"
}), V7 = f.forwardRef(({ className: e, variant: t, size: n, children: a, ...r }, o) => /* @__PURE__ */ l.jsx(
  Qg,
  {
    ref: o,
    className: x("flex items-center justify-center gap-1", e),
    ...r,
    children: /* @__PURE__ */ l.jsx(n0.Provider, { value: { variant: t, size: n }, children: a })
  }
));
V7.displayName = Qg.displayName;
const z7 = f.forwardRef(({ className: e, children: t, variant: n, size: a, ...r }, o) => {
  const i = f.useContext(n0);
  return /* @__PURE__ */ l.jsx(
    e0,
    {
      ref: o,
      className: x(
        t0({
          variant: i.variant || n,
          size: i.size || a
        }),
        e
      ),
      ...r,
      children: t
    }
  );
});
z7.displayName = e0.displayName;
var fc = "Progress", pc = 100, [K7, gN] = Fe(fc), [Y7, Z7] = K7(fc), a0 = f.forwardRef(
  (e, t) => {
    const {
      __scopeProgress: n,
      value: a = null,
      max: r,
      getValueLabel: o = X7,
      ...i
    } = e;
    (r || r === 0) && !ou(r) && console.error(q7(`${r}`, "Progress"));
    const s = ou(r) ? r : pc;
    a !== null && !iu(a, s) && console.error(J7(`${a}`, "Progress"));
    const c = iu(a, s) ? a : null, d = xo(c) ? o(c, s) : void 0;
    return /* @__PURE__ */ l.jsx(Y7, { scope: n, value: c, max: s, children: /* @__PURE__ */ l.jsx(
      Y.div,
      {
        "aria-valuemax": s,
        "aria-valuemin": 0,
        "aria-valuenow": xo(c) ? c : void 0,
        "aria-valuetext": d,
        role: "progressbar",
        "data-state": i0(c, s),
        "data-value": c ?? void 0,
        "data-max": s,
        ...i,
        ref: t
      }
    ) });
  }
);
a0.displayName = fc;
var r0 = "ProgressIndicator", o0 = f.forwardRef(
  (e, t) => {
    const { __scopeProgress: n, ...a } = e, r = Z7(r0, n);
    return /* @__PURE__ */ l.jsx(
      Y.div,
      {
        "data-state": i0(r.value, r.max),
        "data-value": r.value ?? void 0,
        "data-max": r.max,
        ...a,
        ref: t
      }
    );
  }
);
o0.displayName = r0;
function X7(e, t) {
  return `${Math.round(e / t * 100)}%`;
}
function i0(e, t) {
  return e == null ? "indeterminate" : e === t ? "complete" : "loading";
}
function xo(e) {
  return typeof e == "number";
}
function ou(e) {
  return xo(e) && !isNaN(e) && e > 0;
}
function iu(e, t) {
  return xo(e) && !isNaN(e) && e <= t && e >= 0;
}
function q7(e, t) {
  return `Invalid prop \`max\` of value \`${e}\` supplied to \`${t}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${pc}\`.`;
}
function J7(e, t) {
  return `Invalid prop \`value\` of value \`${e}\` supplied to \`${t}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${pc} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var s0 = a0, Q7 = o0;
const e_ = f.forwardRef(({ className: e, value: t, ...n }, a) => /* @__PURE__ */ l.jsx(
  s0,
  {
    ref: a,
    className: x(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      e
    ),
    ...n,
    children: /* @__PURE__ */ l.jsx(
      Q7,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (t || 0)}%)` }
      }
    )
  }
));
e_.displayName = s0.displayName;
var Wr = { exports: {} }, Yi = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var su;
function t_() {
  if (su) return Yi;
  su = 1;
  var e = D;
  function t(p, m) {
    return p === m && (p !== 0 || 1 / p === 1 / m) || p !== p && m !== m;
  }
  var n = typeof Object.is == "function" ? Object.is : t, a = e.useState, r = e.useEffect, o = e.useLayoutEffect, i = e.useDebugValue;
  function s(p, m) {
    var h = m(), b = a({ inst: { value: h, getSnapshot: m } }), g = b[0].inst, v = b[1];
    return o(
      function() {
        g.value = h, g.getSnapshot = m, c(g) && v({ inst: g });
      },
      [p, h, m]
    ), r(
      function() {
        return c(g) && v({ inst: g }), p(function() {
          c(g) && v({ inst: g });
        });
      },
      [p]
    ), i(h), h;
  }
  function c(p) {
    var m = p.getSnapshot;
    p = p.value;
    try {
      var h = m();
      return !n(p, h);
    } catch {
      return !0;
    }
  }
  function d(p, m) {
    return m();
  }
  var u = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? d : s;
  return Yi.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : u, Yi;
}
var Zi = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var lu;
function n_() {
  return lu || (lu = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(h, b) {
      return h === b && (h !== 0 || 1 / h === 1 / b) || h !== h && b !== b;
    }
    function t(h, b) {
      u || r.startTransition === void 0 || (u = !0, console.error(
        "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
      ));
      var g = b();
      if (!p) {
        var v = b();
        o(g, v) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), p = !0);
      }
      v = i({
        inst: { value: g, getSnapshot: b }
      });
      var y = v[0].inst, w = v[1];
      return c(
        function() {
          y.value = g, y.getSnapshot = b, n(y) && w({ inst: y });
        },
        [h, g, b]
      ), s(
        function() {
          return n(y) && w({ inst: y }), h(function() {
            n(y) && w({ inst: y });
          });
        },
        [h]
      ), d(g), g;
    }
    function n(h) {
      var b = h.getSnapshot;
      h = h.value;
      try {
        var g = b();
        return !o(h, g);
      } catch {
        return !0;
      }
    }
    function a(h, b) {
      return b();
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var r = D, o = typeof Object.is == "function" ? Object.is : e, i = r.useState, s = r.useEffect, c = r.useLayoutEffect, d = r.useDebugValue, u = !1, p = !1, m = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? a : t;
    Zi.useSyncExternalStore = r.useSyncExternalStore !== void 0 ? r.useSyncExternalStore : m, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), Zi;
}
var cu;
function a_() {
  return cu || (cu = 1, process.env.NODE_ENV === "production" ? Wr.exports = t_() : Wr.exports = n_()), Wr.exports;
}
var r_ = a_();
function o_() {
  return r_.useSyncExternalStore(
    i_,
    () => !0,
    () => !1
  );
}
function i_() {
  return () => {
  };
}
var mc = "Avatar", [s_, bN] = Fe(mc), [l_, l0] = s_(mc), c0 = f.forwardRef(
  (e, t) => {
    const { __scopeAvatar: n, ...a } = e, [r, o] = f.useState("idle");
    return /* @__PURE__ */ l.jsx(
      l_,
      {
        scope: n,
        imageLoadingStatus: r,
        onImageLoadingStatusChange: o,
        children: /* @__PURE__ */ l.jsx(Y.span, { ...a, ref: t })
      }
    );
  }
);
c0.displayName = mc;
var d0 = "AvatarImage", u0 = f.forwardRef(
  (e, t) => {
    const { __scopeAvatar: n, src: a, onLoadingStatusChange: r = () => {
    }, ...o } = e, i = l0(d0, n), s = c_(a, o), c = Le((d) => {
      r(d), i.onImageLoadingStatusChange(d);
    });
    return Oe(() => {
      s !== "idle" && c(s);
    }, [s, c]), s === "loaded" ? /* @__PURE__ */ l.jsx(Y.img, { ...o, ref: t, src: a }) : null;
  }
);
u0.displayName = d0;
var f0 = "AvatarFallback", p0 = f.forwardRef(
  (e, t) => {
    const { __scopeAvatar: n, delayMs: a, ...r } = e, o = l0(f0, n), [i, s] = f.useState(a === void 0);
    return f.useEffect(() => {
      if (a !== void 0) {
        const c = window.setTimeout(() => s(!0), a);
        return () => window.clearTimeout(c);
      }
    }, [a]), i && o.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ l.jsx(Y.span, { ...r, ref: t }) : null;
  }
);
p0.displayName = f0;
function du(e, t) {
  return e ? t ? (e.src !== t && (e.src = t), e.complete && e.naturalWidth > 0 ? "loaded" : "loading") : "error" : "idle";
}
function c_(e, { referrerPolicy: t, crossOrigin: n }) {
  const a = o_(), r = f.useRef(null), o = a ? (r.current || (r.current = new window.Image()), r.current) : null, [i, s] = f.useState(
    () => du(o, e)
  );
  return Oe(() => {
    s(du(o, e));
  }, [o, e]), Oe(() => {
    const c = (p) => () => {
      s(p);
    };
    if (!o) return;
    const d = c("loaded"), u = c("error");
    return o.addEventListener("load", d), o.addEventListener("error", u), t && (o.referrerPolicy = t), typeof n == "string" && (o.crossOrigin = n), () => {
      o.removeEventListener("load", d), o.removeEventListener("error", u);
    };
  }, [o, n, t]), i;
}
var m0 = c0, h0 = u0, g0 = p0;
const d_ = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  m0,
  {
    ref: n,
    className: x(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      e
    ),
    ...t
  }
));
d_.displayName = m0.displayName;
const u_ = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  h0,
  {
    ref: n,
    className: x("aspect-square h-full w-full", e),
    ...t
  }
));
u_.displayName = h0.displayName;
const f_ = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  g0,
  {
    ref: n,
    className: x(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      e
    ),
    ...t
  }
));
f_.displayName = g0.displayName;
var pi = "Tabs", [p_, vN] = Fe(pi, [
  mn
]), b0 = mn(), [m_, hc] = p_(pi), v0 = f.forwardRef(
  (e, t) => {
    const {
      __scopeTabs: n,
      value: a,
      onValueChange: r,
      defaultValue: o,
      orientation: i = "horizontal",
      dir: s,
      activationMode: c = "automatic",
      ...d
    } = e, u = In(s), [p, m] = Ke({
      prop: a,
      onChange: r,
      defaultProp: o ?? "",
      caller: pi
    });
    return /* @__PURE__ */ l.jsx(
      m_,
      {
        scope: n,
        baseId: Me(),
        value: p,
        onValueChange: m,
        orientation: i,
        dir: u,
        activationMode: c,
        children: /* @__PURE__ */ l.jsx(
          Y.div,
          {
            dir: u,
            "data-orientation": i,
            ...d,
            ref: t
          }
        )
      }
    );
  }
);
v0.displayName = pi;
var y0 = "TabsList", x0 = f.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, loop: a = !0, ...r } = e, o = hc(y0, n), i = b0(n);
    return /* @__PURE__ */ l.jsx(
      Lo,
      {
        asChild: !0,
        ...i,
        orientation: o.orientation,
        dir: o.dir,
        loop: a,
        children: /* @__PURE__ */ l.jsx(
          Y.div,
          {
            role: "tablist",
            "aria-orientation": o.orientation,
            ...r,
            ref: t
          }
        )
      }
    );
  }
);
x0.displayName = y0;
var w0 = "TabsTrigger", $0 = f.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, value: a, disabled: r = !1, ...o } = e, i = hc(w0, n), s = b0(n), c = _0(i.baseId, a), d = N0(i.baseId, a), u = a === i.value;
    return /* @__PURE__ */ l.jsx(
      Fo,
      {
        asChild: !0,
        ...s,
        focusable: !r,
        active: u,
        children: /* @__PURE__ */ l.jsx(
          Y.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": u,
            "aria-controls": d,
            "data-state": u ? "active" : "inactive",
            "data-disabled": r ? "" : void 0,
            disabled: r,
            id: c,
            ...o,
            ref: t,
            onMouseDown: U(e.onMouseDown, (p) => {
              !r && p.button === 0 && p.ctrlKey === !1 ? i.onValueChange(a) : p.preventDefault();
            }),
            onKeyDown: U(e.onKeyDown, (p) => {
              [" ", "Enter"].includes(p.key) && i.onValueChange(a);
            }),
            onFocus: U(e.onFocus, () => {
              const p = i.activationMode !== "manual";
              !u && !r && p && i.onValueChange(a);
            })
          }
        )
      }
    );
  }
);
$0.displayName = w0;
var C0 = "TabsContent", S0 = f.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, value: a, forceMount: r, children: o, ...i } = e, s = hc(C0, n), c = _0(s.baseId, a), d = N0(s.baseId, a), u = a === s.value, p = f.useRef(u);
    return f.useEffect(() => {
      const m = requestAnimationFrame(() => p.current = !1);
      return () => cancelAnimationFrame(m);
    }, []), /* @__PURE__ */ l.jsx(Ge, { present: r || u, children: ({ present: m }) => /* @__PURE__ */ l.jsx(
      Y.div,
      {
        "data-state": u ? "active" : "inactive",
        "data-orientation": s.orientation,
        role: "tabpanel",
        "aria-labelledby": c,
        hidden: !m,
        id: d,
        tabIndex: 0,
        ...i,
        ref: t,
        style: {
          ...e.style,
          animationDuration: p.current ? "0s" : void 0
        },
        children: m && o
      }
    ) });
  }
);
S0.displayName = C0;
function _0(e, t) {
  return `${e}-trigger-${t}`;
}
function N0(e, t) {
  return `${e}-content-${t}`;
}
var h_ = v0, E0 = x0, R0 = $0, P0 = S0;
const yN = h_, g_ = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  E0,
  {
    ref: n,
    className: x(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      e
    ),
    ...t
  }
));
g_.displayName = E0.displayName;
const b_ = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  R0,
  {
    ref: n,
    className: x(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      e
    ),
    ...t
  }
));
b_.displayName = R0.displayName;
const v_ = f.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l.jsx(
  P0,
  {
    ref: n,
    className: x(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      e
    ),
    ...t
  }
));
v_.displayName = P0.displayName;
Promise.resolve({          });
export {
  ao as AdminFeeOption,
  d_ as Avatar,
  f_ as AvatarFallback,
  u_ as AvatarImage,
  B_ as BackButton,
  sN as Badge,
  we as Button,
  F7 as Calendar,
  G4 as Card,
  z4 as CardContent,
  V4 as CardDescription,
  K4 as CardFooter,
  W4 as CardHeader,
  H4 as CardTitle,
  Dn as Checkbox,
  O_ as CheckboxDropdown,
  jl as ContactPreference,
  lr as CounterInput,
  uN as CountryDropdown,
  eN as CurrencyInput,
  tN as CurrencySelector,
  om as Dialog,
  M_ as DialogClose,
  ml as DialogContent,
  Ex as DialogDescription,
  _x as DialogFooter,
  Sx as DialogHeader,
  pl as DialogOverlay,
  Cx as DialogPortal,
  Nx as DialogTitle,
  j_ as DialogTrigger,
  J_ as DonationAmountOptions,
  _l as DonationFormHeader,
  Q_ as DonationFrequencyOptions,
  q_ as DonationModal,
  Ml as DonationSection,
  Bm as DonationSummary,
  Gn as DonationSummaryCard,
  z8 as Drawer,
  mN as DrawerClose,
  Y8 as DrawerContent,
  J8 as DrawerDescription,
  X8 as DrawerFooter,
  Z8 as DrawerHeader,
  _g as DrawerOverlay,
  K8 as DrawerPortal,
  q8 as DrawerTitle,
  pN as DrawerTrigger,
  ol as DropdownMenu,
  Ho as DropdownMenuContent,
  N_ as DropdownMenuGroup,
  Vo as DropdownMenuItem,
  ky as DropdownMenuLabel,
  E_ as DropdownMenuPortal,
  Ty as DropdownMenuSeparator,
  R_ as DropdownMenuSub,
  Ey as DropdownMenuSubContent,
  Ny as DropdownMenuSubTrigger,
  il as DropdownMenuTrigger,
  K_ as EntityCard,
  Y_ as EntityContainer,
  Bn as EntityHeader,
  Z_ as EntityList,
  X_ as EntityOverlay,
  $r as EntityPanel,
  mm as FormContainer,
  ca as GiftAid,
  Cr as InfoDisplayCard,
  $l as Input,
  L4 as InputOTP,
  F4 as InputOTPGroup,
  U4 as InputOTPSeparator,
  B4 as InputOTPSlot,
  wl as Label,
  cm as NavigationButtons,
  Sl as NavigationItem,
  U_ as NextButton,
  Sr as OrganizationDonationOption,
  Eh as PaymentOption,
  b8 as PhoneInput,
  jp as Popover,
  sl as PopoverContent,
  Mp as PopoverTrigger,
  Sa as PriceOption,
  e_ as Progress,
  hC as ScrollArea,
  Qh as ScrollBar,
  a4 as Select,
  Sh as SelectContent,
  _h as SelectItem,
  wh as SelectTrigger,
  r4 as SelectValue,
  rN as Sheet,
  iN as SheetClose,
  x4 as SheetContent,
  S4 as SheetDescription,
  $4 as SheetFooter,
  w4 as SheetHeader,
  C4 as SheetTitle,
  oN as SheetTrigger,
  cN as Skeleton,
  L_ as Step,
  W_ as StepErrors,
  I_ as Stepper,
  F_ as StepperNavigation,
  G_ as SubmitButton,
  eC as Switch,
  yN as Tabs,
  v_ as TabsContent,
  g_ as TabsList,
  b_ as TabsTrigger,
  tC as Textarea,
  V7 as ToggleGroup,
  z7 as ToggleGroupItem,
  ff as Tooltip,
  Zs as TooltipContent,
  uf as TooltipProvider,
  pf as TooltipTrigger,
  rw as Typography,
  jn as UpsellDonationList,
  D_ as ValidationError,
  Lx as Warning,
  x as cn,
  L0 as createStepperStore,
  fN as phoneSchema,
  Nl as useCurrencySelectorContext,
  H_ as useCurrentStep,
  Nh as useOrganizationDonationOption,
  z_ as useStepperErrors,
  V_ as useStepperNavigation,
  ia as useStepperStore
};
