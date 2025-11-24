import { ab as c, bz as g, ct as m, bt as I, cA as h, bA as l, bB as r, cu as p, bx as E, cE as y } from "./bQpPPbvK.js";
try {
  let t = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, s = new t.Error().stack;
  s && (t._sentryDebugIds = t._sentryDebugIds || {}, t._sentryDebugIds[s] = "33054159-ec15-449c-ad43-2a378e9890ec", t._sentryDebugIdIdentifier = "sentry-dbid-33054159-ec15-449c-ad43-2a378e9890ec");
} catch {
}
const f = "https://n3o-checkout.com", w = "cart-checkout-iframe", A = y();
function O() {
  const [t, s] = c.useState(0), n = g({
    allowedOrigins: [f],
    debug: !1
  }), i = m(), { loaded: d } = i, { execute: C, isLoading: b } = I({
    onSuccess: (e) => {
      s(e ? e.itemCount : 0);
    },
    onError: () => s(0)
  }), a = c.useCallback(async () => {
    const e = await h();
    if (e && l) {
      const o = l.getById(e);
      C(o);
    } else
      s(0);
  }, [C]);
  return c.useEffect(() => {
    const e = () => a(), o = n.on(r.CART.refresh, e);
    return () => o();
  }, [n, a]), c.useEffect(() => {
    d && (p.initialize(i), E.setSubscriptionId(A), a());
  }, [d, i, a]), c.useEffect(() => {
    const e = () => {
      const u = document.getElementById(
        w
      );
      u && u.contentWindow ? n.emit(r.CHECKOUT.checkoutOpen, null, {
        targetWindow: u.contentWindow,
        targetOrigin: f
      }) : (n.emit(r.CHECKOUT.checkoutOpen), console.error(
        "[CartItemsCount] Cannot find iframe window to send checkout message."
      ));
    }, o = n.on(
      r.CART.requstCart,
      e
    );
    return () => o();
  }, [n]), { cartCount: t, isLoading: b, handleCartClick: () => {
    n.emit(r.CART.requstCart);
  } };
}
export {
  O as u
};
//# sourceMappingURL=PQlW3C5u.js.map
