import { bn as ue, ab as V, bM as C, bt as oe, cA as me, bA as he, bK as W, cI as fe, bv as H, bz as ce, bD as e, c9 as ge, cJ as xe, cK as Ce, bJ as _, bB as se, cL as re, cM as U, cN as g, cO as X, cP as pe, cy as z, cQ as b, cR as je, cS as K, cT as Y, cU as ae, cV as J, cW as le, cX as Z, ct as Se, cu as Ne, cY as ye, cZ as Q, c_ as be, c$ as T, d0 as De, d1 as w, d2 as $, d3 as ie, d4 as Te, d5 as ve, d6 as Ie, d7 as Ee, d8 as Me, d9 as ke, da as we, db as Le, dc as x, dd as _e, cD as Oe, de as ee, df as Fe, dg as Re } from "./bQpPPbvK.js";
import { u as Ae } from "./PQlW3C5u.js";
try {
  let s = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, a = new s.Error().stack;
  a && (s._sentryDebugIds = s._sentryDebugIds || {}, s._sentryDebugIds[a] = "6f51c298-c656-4163-a538-81601d54af96", s._sentryDebugIdIdentifier = "sentry-dbid-6f51c298-c656-4163-a538-81601d54af96");
} catch {
}
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ve = ue("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
function He(s, a) {
  const r = V.useRef(null), n = V.useRef(s);
  return V.useEffect(() => {
    n.current = s;
  }, [s]), V.useEffect(() => () => {
    r.current && clearTimeout(r.current);
  }, []), V.useCallback(
    (...t) => {
      r.current && clearTimeout(r.current), r.current = setTimeout(() => {
        n.current(...t);
      }, a);
    },
    [a]
  );
}
const Be = () => {
  const [s, a] = C.useState(""), { execute: r, isLoading: n } = oe({
    onSuccess: () => {
      a("");
    },
    onError: (t) => {
      a(t.message);
    }
  });
  return { clearCart: C.useCallback(async () => {
    const t = await me();
    return r(
      he.clear(t, {
        type: [
          W.Donation,
          W.RegularGiving,
          W.ScheduledGiving
        ]
      })
    );
  }, [r]), isLoading: n, error: s };
}, Ge = () => {
  const {
    currentCurrency: s,
    handleConfirmCurrencyChange: a,
    handleCancelCurrencyChange: r
  } = fe(), { formatMessage: n } = H(), { clearCart: o, isLoading: t } = Be(), m = ce({
    debug: !1
  }), d = () => {
    o().then(() => {
      m.emit(se.CART.refresh), a();
    });
  };
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(ge, { children: n("currency.confirmation.title") }),
    /* @__PURE__ */ e.jsx(xe, { children: /* @__PURE__ */ e.jsx(
      "span",
      {
        dangerouslySetInnerHTML: { __html: `${n("currency.confirmation.description.html")}` }
      }
    ) }),
    /* @__PURE__ */ e.jsxs(Ce, { className: "flex justify-end gap-2 mt-4", children: [
      /* @__PURE__ */ e.jsx(_, { onClick: d, disabled: t, children: n("currency.confirmation.button.yes") }),
      /* @__PURE__ */ e.jsx(_, { variant: "outline", onClick: r, children: n("currency.confirmation.button.no", {
        symbol: s.symbol,
        code: s.code
      }) })
    ] })
  ] });
};
function Ue() {
  const { execute: s, data: a, isLoading: r, error: n, reset: o } = oe(), { formatMessage: t } = H();
  return {
    search: async (u) => {
      if (u && re)
        try {
          return await s(re.search(u));
        } catch {
          U.error(t("donation.form.search.error"));
          return;
        }
    },
    data: a || void 0,
    isLoading: r,
    error: n || void 0,
    clearResults: () => {
      o();
    }
  };
}
const Pe = 500, ze = 1e3, ne = ze * 5;
function Ke({
  campaignId: s,
  onClose: a
}) {
  const { formatMessage: r } = H(), [n, o] = C.useState({
    currentLevel: g.MENU,
    path: [],
    filters: {},
    menuType: void 0,
    navigationStack: []
  }), { data: t, loading: m, error: d } = X(
    z.Subscription,
    pe.DonateMenu,
    { enabled: !s }
  ), { data: u, loading: N, error: j } = X(
    z.Campaign,
    s || "",
    { enabled: !!s }
  ), { data: O, loading: F, error: f } = X(
    z.Campaign,
    n.filters.campaignId || "",
    { enabled: !!n.filters.campaignId }
  ), { data: L, isLoading: I, search: D, clearResults: c } = Ue(), E = async (l) => {
    const h = {
      collections: [z.Designation]
    }, y = l?.text || n.filters.searchValue;
    y?.trim() && (h.text = y);
    const S = [], p = l?.selectedDimension || n.filters;
    p.dimension1 && S.push({ dimensionNumber: 1, value: p.dimension1 }), p.dimension2 && S.push({ dimensionNumber: 2, value: p.dimension2 }), p.dimension3 && S.push({ dimensionNumber: 3, value: p.dimension3 }), p.dimension4 && S.push({ dimensionNumber: 4, value: p.dimension4 });
    const M = n.filters.selectedDimension;
    M && S.length === 0 && S.push({
      dimensionNumber: M.dimensionNumber,
      value: M.value
    }), S.length > 0 && (h.fundDimensions = S), (h.text || h.fundDimensions) && await D(h);
  };
  C.useEffect(() => {
    s && u && !n.menuType && o({
      currentLevel: g.DESIGNATIONS,
      path: [],
      filters: { campaignId: s },
      menuType: b.Campaign,
      navigationStack: []
    });
  }, [s, u, n.menuType]), C.useEffect(() => {
    d && U.error(r("donation.form.search.loading.error"), {
      duration: ne
    }), j && U.error(r("donation.form.search.loading.error"), {
      duration: ne
    }), f && U.error(r("donation.form.search.loading.error"), {
      duration: ne
    });
  }, [d, j, f, r]);
  const R = (() => {
    if (!n.menuType && n.currentLevel === g.MENU)
      return t ? je.transformDonateMenuEntries(t) : [];
    if (n.menuType) {
      const l = {
        search: D
      };
      return K.getNavigationItems(n, {
        campaignId: s,
        campaign: u,
        donateMenu: t,
        searchResults: L,
        selectedCampaign: O
      }, l);
    }
    return [];
  })(), v = m && !t && !u || F || I || N, G = R.length === 0 && !v;
  return {
    navigationContext: n,
    currentItems: R,
    isLoading: v,
    isEmpty: G,
    handleItemSelect: (l) => {
      if (!n.menuType && l.type === ae.DONATE_MENU_ENTRY) {
        const h = l.data?.type;
        let y;
        switch (h) {
          case J.Campaign:
            y = b.Campaign;
            break;
          case J.CampaignsList:
            y = b.CampaignsList;
            break;
          case J.FundDimensionSearch:
            y = b.FundDimensionSearch;
            break;
          default:
            console.warn(`Unknown donate menu entry type: ${h}`);
            return;
        }
        const S = Y.push(
          n,
          y,
          g.MENU
        ), p = K.handleItemSelect(l, S);
        o(p);
        return;
      }
      if (n.menuType) {
        const h = l.type === ae.DESIGNATION && n.currentLevel === g.DESIGNATION_SELECTED;
        let y = n;
        h || (y = Y.push(
          n,
          n.menuType,
          n.currentLevel
        ));
        const S = {
          search: D
        }, p = K.handleItemSelect(l, y, S);
        p instanceof Promise ? p.then((M) => {
          o(M);
        }) : o(p);
      }
    },
    handleBackNavigation: () => {
      if (n.menuType) {
        if (Y.canGoBack(n)) {
          const h = Y.pop(n);
          if (h) {
            n.currentLevel === g.DESIGNATIONS && h.currentLevel === g.DIMENSION && n.menuType === b.FundDimensionSearch && c(), o(h);
            return;
          }
        }
        const l = K.handleBackNavigation(n);
        l ? (n.currentLevel === g.DESIGNATIONS && l.currentLevel === g.DIMENSION && n.menuType === b.FundDimensionSearch && c(), l.path.length === 0 ? o({
          ...l,
          menuType: void 0,
          currentLevel: g.MENU,
          navigationStack: []
        }) : o(l)) : n.path.length > 0 ? o({
          currentLevel: g.MENU,
          path: [],
          filters: {},
          menuType: void 0,
          navigationStack: []
        }) : a?.();
      } else
        a?.();
    },
    setNavigationContext: o,
    changeMenuType: (l) => {
      o({
        currentLevel: g.MENU,
        path: [],
        filters: {},
        menuType: l,
        navigationStack: []
      });
    },
    selectedCampaign: O,
    performSearch: E,
    searchResults: L,
    isSearching: I
  };
}
function Ye(s, a, r = 500) {
  const n = He(s, r);
  return V.useCallback(
    (t) => {
      a?.(t), t.trim() && n(t);
    },
    [n, a]
  );
}
function $e(s) {
  if (!s)
    return [];
  const a = Object.entries(s).filter(
    ([, r]) => r.searchable
  );
  return a.length === 0 ? [] : a.map(([r, n]) => {
    const o = n.view?.selector === le.Dropdown, t = o ? (n.restrictedOptions || []).map((m) => ({
      id: m,
      name: m
    })) : [];
    return n.unrestrictedOption && t.unshift({
      id: n.unrestrictedOption,
      name: n.unrestrictedOption
    }), {
      dimensionName: r,
      dimension: n,
      isDropdown: o,
      options: t
    };
  });
}
function qe({
  navigationContext: s,
  setNavigationContext: a,
  performSearch: r
}) {
  return {
    handleDimensionToggle: (t, m, d) => {
      if (d.view?.selector === le.Toggle) {
        const u = m ? d.view?.toggle?.onValue : d.view?.toggle?.offValue;
        a((j) => ({
          ...j,
          filters: {
            ...j.filters,
            [t]: u
          }
        }));
        const N = {
          ...s.filters,
          [t]: u
        };
        a((j) => ({
          ...j,
          menuType: b.Search,
          currentLevel: g.DESIGNATIONS,
          filters: {
            ...j.filters,
            [t]: u
          }
        })), u && r({ selectedDimension: N });
      }
    },
    handleDimensionValueChange: (t, m) => {
      a((u) => ({
        ...u,
        menuType: b.Search,
        currentLevel: g.DESIGNATIONS,
        filters: {
          ...u.filters,
          [t]: m
        }
      }));
      const d = {
        ...s.filters,
        [t]: m
      };
      r({ selectedDimension: d });
    }
  };
}
const We = ["dimension1", "dimension2", "dimension3", "dimension4"], Xe = () => We.reduce((s, a) => (s[a] = void 0, s), {}), te = (s) => ({
  ...s,
  ...Xe()
});
function Je() {
  return {
    getCurrentTitle: (r, n, o, t) => r.menuType === b.Search ? `${t("common.search")}` : r.filters.campaignId && n ? n.name : r.currentLevel === g.MENU ? `${t("common.button.back")}` : r.path[r.path.length - 1]?.title || o?.name || "",
    createClearSearchCriteria: (r) => () => {
      r((n) => ({
        ...n,
        menuType: n.filters.campaignId ? b.Campaign : b.CampaignsList,
        currentLevel: n.filters.campaignId ? g.DESIGNATIONS : g.MENU,
        filters: {
          ...n.filters,
          ...te(n.filters),
          searchValue: void 0
        }
      }));
    }
  };
}
function Ze({
  dimensionData: s,
  currentValue: a,
  onValueChange: r,
  onToggleChange: n
}) {
  const { formatMessage: o } = H(), { dimensionName: t, dimension: m, isDropdown: d, options: u } = s;
  return /* @__PURE__ */ e.jsxs(
    Z.Root,
    {
      className: "px-0",
      isSelected: a === m?.view?.toggle?.onValue,
      onChange: () => {
      },
      onToggle: (N) => n(t, N),
      selectedOption: a || "",
      setSelectedOption: (N) => r(t, N),
      options: u,
      children: [
        d ? null : /* @__PURE__ */ e.jsx(
          Z.Checkbox,
          {
            label: m.view?.toggle?.label
          }
        ),
        d ? /* @__PURE__ */ e.jsx(
          Z.Combobox,
          {
            placeholder: o("donation.form.search.placeholder", { dimension: m.name }),
            searchPlaceholder: o("donation.form.search.placeholder", { dimension: m.name }),
            noResultsText: o("donation.form.search.not.found", { dimension: m.name })
          }
        ) : null
      ]
    }
  );
}
function Qe({ isOpen: s, campaignId: a, onClose: r, onDesignationSelect: n, fundStructure: o }) {
  const { formatMessage: t } = H(), m = Se(), {
    navigationContext: d,
    currentItems: u,
    isLoading: N,
    isEmpty: j,
    handleItemSelect: O,
    handleBackNavigation: F,
    setNavigationContext: f,
    selectedCampaign: L,
    performSearch: I
  } = Ke({
    campaignId: a,
    onClose: r
  }), D = Ye(
    (i) => {
      f((l) => ({
        ...l,
        menuType: b.Search,
        currentLevel: g.DESIGNATIONS
      })), I({ text: i });
    },
    (i) => {
      f((l) => ({
        ...l,
        filters: {
          ...l.filters,
          searchValue: i
        }
      }));
    },
    Pe
  );
  C.useEffect(() => {
    Ne.initialize(m);
  }, [m]), C.useEffect(() => {
    s || f((i) => ({
      ...i,
      filters: {
        ...te(i.filters)
      }
    }));
  }, [s, f]);
  const c = d.filters.selectedDesignation || null, { getCurrentTitle: E, createClearSearchCriteria: B } = C.useMemo(() => Je(), []), { handleDimensionToggle: R, handleDimensionValueChange: v } = C.useMemo(
    () => qe({
      navigationContext: d,
      setNavigationContext: f,
      performSearch: I
    }),
    [d, f, I]
  );
  C.useEffect(() => {
    s || f((i) => ({
      ...i,
      filters: {
        ...i.filters,
        searchValue: void 0,
        ...te(i.filters)
      }
    }));
  }, [s, f]);
  const G = (i) => {
    D(i);
  }, P = B(f), A = $e(o);
  return /* @__PURE__ */ e.jsxs(ye, { children: [
    s && /* @__PURE__ */ e.jsx(Q, { children: /* @__PURE__ */ e.jsx(Q.Container, { children: /* @__PURE__ */ e.jsxs(Q.Content, { children: [
      /* @__PURE__ */ e.jsxs(
        _,
        {
          onClick: r,
          className: "absolute top-7 right-6 flex gap-4 text-white items-center rounded-full bg-transparent hover:bg-accent/10 z-10",
          children: [
            /* @__PURE__ */ e.jsx("span", { className: "hidden sm:block opacity-50 text-xs", children: t("common.close") }),
            /* @__PURE__ */ e.jsx(be, { className: "h-6 w-6" })
          ]
        }
      ),
      /* @__PURE__ */ e.jsx(T, { isVisible: !!c, children: /* @__PURE__ */ e.jsxs(T.Content, { children: [
        /* @__PURE__ */ e.jsx(
          T.Image,
          {
            src: c?.image || "",
            alt: c?.name || "",
            className: "pointer-events-none"
          }
        ),
        /* @__PURE__ */ e.jsx(T.Title, { className: "hidden sm:block", children: c?.name || "" }),
        /* @__PURE__ */ e.jsx(T.Description, { children: /* @__PURE__ */ e.jsx(
          "span",
          {
            dangerouslySetInnerHTML: {
              __html: c?.shortDescription || ""
            }
          }
        ) }),
        /* @__PURE__ */ e.jsx(T.ContentHTML, { children: /* @__PURE__ */ e.jsx(
          "div",
          {
            dangerouslySetInnerHTML: {
              __html: c?.longDescription || ""
            }
          }
        ) })
      ] }) }),
      /* @__PURE__ */ e.jsxs(De, { className: "flex flex-col h-full", children: [
        /* @__PURE__ */ e.jsxs(
          w,
          {
            searchValue: d.filters.searchValue || "",
            onSearchChange: G,
            children: [
              /* @__PURE__ */ e.jsxs(w.Row, { children: [
                /* @__PURE__ */ e.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ e.jsx(w.BackButton, { onClick: F }) }),
                /* @__PURE__ */ e.jsx(w.Title, { children: E(
                  d,
                  L,
                  c,
                  t
                ) })
              ] }),
              /* @__PURE__ */ e.jsxs(w.Section, { children: [
                /* @__PURE__ */ e.jsxs(w.SearchContainer, { children: [
                  /* @__PURE__ */ e.jsx(w.SearchInput, {}),
                  /* @__PURE__ */ e.jsx(w.ResetButton, { onClick: P })
                ] }),
                /* @__PURE__ */ e.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ e.jsx("div", { className: "flex-1", children: A.map((i) => /* @__PURE__ */ e.jsx("div", { className: "mb-2", children: /* @__PURE__ */ e.jsx(
                  Ze,
                  {
                    dimensionData: i,
                    currentValue: d.filters[i.dimensionName],
                    onValueChange: v,
                    onToggleChange: (l, h) => R(
                      l,
                      h,
                      i.dimension
                    )
                  }
                ) }, i.dimensionName)) }) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ e.jsx($.Container, { className: "flex-1 overflow-hidden", children: N ? /* @__PURE__ */ e.jsx($.EmptyMessage, { children: t("common.loading") }) : j ? /* @__PURE__ */ e.jsx($.EmptyMessage, { children: t("common.noResults") }) : /* @__PURE__ */ e.jsx(
          $.ItemList,
          {
            items: u,
            renderItem: (i) => /* @__PURE__ */ e.jsx(
              ie,
              {
                selected: c?.id === i.id,
                onSelect: () => O(i),
                children: /* @__PURE__ */ e.jsxs("div", { className: "flex items-center gap-3 w-full", children: [
                  i.image && /* @__PURE__ */ e.jsx(
                    ie.Image,
                    {
                      src: i.image,
                      alt: i.title,
                      className: "size-12 rounded-md object-cover"
                    }
                  ),
                  /* @__PURE__ */ e.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ e.jsx("div", { className: "font-semibold text-base truncate", children: i.title }) }),
                  i.hasChildren && /* @__PURE__ */ e.jsx("div", { className: "flex-shrink-0 ml-auto text-gray-400", children: /* @__PURE__ */ e.jsx(Ve, { className: "size-4" }) }),
                  /* @__PURE__ */ e.jsx(Te, { className: "block sm:hidden", asChild: !0, children: /* @__PURE__ */ e.jsx(_, { variant: "outline", children: t("common.info") }) })
                ] })
              }
            )
          }
        ) }),
        c && /* @__PURE__ */ e.jsx("div", { className: "p-4 border-t bg-background sticky bottom-0 z-10", children: /* @__PURE__ */ e.jsx(
          _,
          {
            className: "w-full",
            onClick: () => {
              r?.(), f((i) => ({
                ...i,
                filters: { ...i.filters, selectedDesignation: null }
              })), n?.(c);
            },
            children: t("donation.form.select.designation", {
              designation: c.name
            })
          }
        ) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ e.jsx(ve, { className: "max-h-[85svh]", children: /* @__PURE__ */ e.jsxs("div", { className: "mx-auto w-full max-w-sm overflow-y-auto px-4", children: [
      /* @__PURE__ */ e.jsxs(Ie, { className: "h-0 p-0", children: [
        /* @__PURE__ */ e.jsx(Ee, { className: "sr-only", children: c?.name || "" }),
        /* @__PURE__ */ e.jsx(Me, { className: "sr-only", children: /* @__PURE__ */ e.jsx(
          "span",
          {
            dangerouslySetInnerHTML: {
              __html: c?.shortDescription || ""
            }
          }
        ) })
      ] }),
      /* @__PURE__ */ e.jsxs(T.Content, { className: "p-0", children: [
        /* @__PURE__ */ e.jsx(
          T.Image,
          {
            src: c?.image || "",
            alt: c?.name || "",
            className: "pointer-events-none"
          }
        ),
        /* @__PURE__ */ e.jsx(T.Title, { children: c?.name || "" }),
        /* @__PURE__ */ e.jsx(T.Description, { children: /* @__PURE__ */ e.jsx(
          "span",
          {
            dangerouslySetInnerHTML: {
              __html: c?.shortDescription || ""
            }
          }
        ) }),
        /* @__PURE__ */ e.jsx(T.ContentHTML, { children: /* @__PURE__ */ e.jsx(
          "div",
          {
            dangerouslySetInnerHTML: {
              __html: c?.longDescription || ""
            }
          }
        ) })
      ] }),
      /* @__PURE__ */ e.jsxs(ke, { className: "sticky bottom-0 px-0 my-2 flex gap-4 bg-background", children: [
        c && /* @__PURE__ */ e.jsx("div", { className: "border-t", children: /* @__PURE__ */ e.jsx(
          _,
          {
            className: "w-full",
            onClick: () => {
              r?.(), f((i) => ({
                ...i,
                filters: { ...i.filters, selectedDesignation: null }
              })), n?.(c);
            },
            size: "lg",
            children: t("donation.form.select.designation", {
              designation: c.name
            })
          }
        ) }),
        /* @__PURE__ */ e.jsx(we, { asChild: !0, children: /* @__PURE__ */ e.jsx(_, { size: "lg", variant: "outline", children: t("common.cancel") }) })
      ] })
    ] }) })
  ] });
}
function sn(s) {
  const [a, r] = C.useState(!1), [n, o] = C.useState(null), [t, m] = C.useState(!1), [d, u] = C.useState(!1), N = ce(), { open: j, formId: O, search: F, preview: f, json: L, initialValues: I } = s, {
    publishedForm: D,
    fundStructure: c,
    orgInfo: E,
    currencies: B,
    sponsorshipSchemes: R,
    currentCurrency: v,
    setCurrency: G,
    isLoading: P,
    hasError: A
  } = Le({
    formId: O,
    preview: f,
    json: L,
    enabled: j,
    includeOrgInfo: !0,
    includeSchemes: !0
  });
  C.useEffect(() => {
    D && D.designation && !n && o(D.designation);
  }, [D, n]), C.useEffect(() => (F && !f && u(!0), () => {
    u(!1);
  }), [F, f]);
  const { cartCount: i, handleCartClick: l } = Ae(), { formatMessage: h } = H(), y = () => {
    s.onClose?.(), N.emit(se.CART.refresh), N.emit(se.CHECKOUT.checkoutOpen);
  }, S = (k) => {
    if (f)
      return;
    const q = B?.currencies?.[k];
    q && q.code !== v?.code && G(q);
  }, p = (k) => {
    u(k);
  };
  C.useEffect(() => {
    A && U.error(h("donation.form.loading.error"));
  }, [A, h]);
  const M = (k) => {
    s.onOpenChange(k);
  };
  if (P)
    return /* @__PURE__ */ e.jsx(x, { ...s, open: j, onOpenChange: M, children: /* @__PURE__ */ e.jsx(_e, {}) });
  if (A || !j)
    return null;
  const de = i > 0;
  return /* @__PURE__ */ e.jsx(x, { ...s, open: j, onOpenChange: M, children: /* @__PURE__ */ e.jsxs(x.Content.Container, { children: [
    /* @__PURE__ */ e.jsxs(x.Header, { children: [
      /* @__PURE__ */ e.jsx(x.Header.Logo, { children: /* @__PURE__ */ e.jsxs("div", { className: "flex gap-2 items-center", children: [
        E?.logo && !t ? /* @__PURE__ */ e.jsx(
          "img",
          {
            src: E.logo,
            alt: E?.name,
            className: "h-8 w-8 rounded",
            onError: () => m(!0)
          }
        ) : null,
        /* @__PURE__ */ e.jsx("span", { className: "hidden sm:block text-xs text-white", children: E?.name })
      ] }) }),
      /* @__PURE__ */ e.jsxs(x.Header.HeaderContent, { children: [
        /* @__PURE__ */ e.jsxs(x.Header.Basket, { onClick: l, children: [
          /* @__PURE__ */ e.jsx(Oe, { className: "h-5 w-5" }),
          /* @__PURE__ */ e.jsx(x.Header.BasketCounter, { count: i })
        ] }),
        v ? /* @__PURE__ */ e.jsxs(
          ee,
          {
            currentCurrency: v,
            currencyOptions: B?.currencies || [],
            onCurrencyChange: S,
            showConfirmation: a,
            onShowConfirmationChange: r,
            requireConfirmation: de,
            children: [
              /* @__PURE__ */ e.jsx(ee.Trigger, {}),
              /* @__PURE__ */ e.jsx(ee.ConfirmDialog, { children: /* @__PURE__ */ e.jsx(Ge, {}) })
            ]
          }
        ) : null
      ] }),
      d ? /* @__PURE__ */ e.jsx("div", {}) : /* @__PURE__ */ e.jsx(x.Header.Close, { label: h("common.close"), disabled: s.preview })
    ] }),
    /* @__PURE__ */ e.jsxs(x.Content, { children: [
      /* @__PURE__ */ e.jsxs(x.Content.Panel, { children: [
        /* @__PURE__ */ e.jsx(x.Content.Image, { src: n?.image || "", alt: "" }),
        /* @__PURE__ */ e.jsxs(x.Content.PanelContent, { children: [
          /* @__PURE__ */ e.jsx(x.Content.Title, { children: n?.name }),
          /* @__PURE__ */ e.jsx(x.Content.Description, { children: /* @__PURE__ */ e.jsx(
            "span",
            {
              dangerouslySetInnerHTML: {
                __html: n?.shortDescription || ""
              }
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ e.jsx(x.Content.Body, { children: n && v && c ? /* @__PURE__ */ e.jsx(
        Fe,
        {
          formId: s.formId,
          mode: Re.modal,
          fundStructure: c,
          designation: n,
          sponsorshipSchemes: R,
          onDesignationChange: p,
          onAddToCartSuccess: y,
          initialValues: I,
          preview: f,
          json: L,
          uiConfig: s.uiConfig
        }
      ) : null })
    ] }),
    /* @__PURE__ */ e.jsx(x.Footer, { children: h("payment.secretKey.gurantee") }),
    d ? /* @__PURE__ */ e.jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center", children: /* @__PURE__ */ e.jsx(
      Qe,
      {
        isOpen: d,
        campaignId: D?.campaign?.id,
        fundStructure: c || null,
        onClose: () => u(!1),
        onDesignationSelect: (k) => {
          o(k), u(!1);
        }
      }
    ) }) : null
  ] }) });
}
export {
  sn as DonationFormModal,
  sn as default
};
//# sourceMappingURL=Cm2Ozdzj.js.map
