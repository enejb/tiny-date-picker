function v() {
  var t = /* @__PURE__ */ new Date();
  return t.setHours(0, 0, 0, 0), t;
}
function w(t, e) {
  return (t && t.toDateString()) === (e && e.toDateString());
}
function I(t, e) {
  return t = new Date(t), t.setDate(t.getDate() + e), t;
}
function p(t, e, n = !1) {
  t = new Date(t);
  var o = t.getDate(), a = t.getMonth() + e;
  return t.setDate(1), t.setMonth(n ? (12 + a) % 12 : a), t.setDate(o), t.getDate() < o && t.setDate(0), t;
}
function T(t, e) {
  return t = new Date(t), t.setFullYear(t.getFullYear() + e), t;
}
function $(t, e) {
  return t = new Date(t), t.setFullYear(e), t;
}
function j(t, e) {
  return p(t, e - t.getMonth());
}
function q(t) {
  return function(e) {
    return A(typeof e == "string" ? t(e) : e);
  };
}
function Y(t, e, n) {
  return t < e ? e : t > n ? n : t;
}
function A(t) {
  return t = new Date(t), t.setHours(0, 0, 0, 0), t;
}
function k(t, e) {
  let n;
  return function() {
    clearTimeout(n), n = setTimeout(e, t);
  };
}
function C() {
}
function E(...t) {
  const e = t[0];
  for (let n = 1; n < t.length; ++n) {
    const o = t[n] || {};
    for (const a in o)
      e[a] = o[a];
  }
  return e;
}
var R = {
  days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: [
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
  ],
  today: "Today",
  clear: "Clear",
  close: "Close"
};
function B(t = {}) {
  const e = E(V(), t);
  var n = q(e.parse);
  return e.lang = E(R, e.lang), e.parse = n, e.inRange = K(e), e.min = n(e.min || T(v(), -100)), e.max = n(e.max || T(v(), 100)), e.highlightedDate = e.parse(e.highlightedDate), e.alignment = e.alignment || "left", e;
}
function V() {
  return {
    lang: R,
    // Possible values: dp-modal, dp-below, dp-permanent
    mode: "dp-modal",
    // The date to hilight initially if the date picker has no
    // initial value.
    highlightedDate: v(),
    format: function(t) {
      return t.getMonth() + 1 + "/" + t.getDate() + "/" + t.getFullYear();
    },
    parse: function(t) {
      var e = new Date(t);
      return isNaN(e.valueOf()) ? v() : e;
    },
    dateClass: function(t) {
      return "";
    },
    inRange: function() {
      return !0;
    },
    appendTo: document.body,
    alignment: "left"
  };
}
function K(t) {
  var e = t.inRange;
  return function(n, o) {
    const a = t.min ? t.min <= n : !0, s = t.max ? t.max >= n : !0;
    return e(n, o) && a && s;
  };
}
var d = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  enter: 13,
  esc: 27
};
function y(t, e, n) {
  return e.addEventListener(t, n, !0), function() {
    e.removeEventListener(t, n, !0);
  };
}
const W = {
  onKeyDown: X,
  onClick: {
    "dp-day": et,
    "dp-next": Z,
    "dp-prev": tt,
    "dp-today": _,
    "dp-clear": U,
    "dp-close": z,
    "dp-cal-month": G,
    "dp-cal-year": Q
  },
  render: J
};
function J(t) {
  const e = t.opts, n = e.lang, o = t.state, a = n.days, s = e.dayOffset || 0, r = o.selectedDate, u = o.highlightedDate, i = u.getMonth(), c = v().getTime();
  return '<div role="dialog" tabindex="0" class="dp-cal"><header class="dp-cal-header"><button tabindex="-1" type="button" class="dp-cal-month">' + n.months[i] + '</button><button tabindex="-1" type="button" class="dp-cal-year">' + u.getFullYear() + '</button><button tabindex="-1" type="button" class="dp-prev">Prev</button><button tabindex="-1" type="button" class="dp-next">Next</button></header><div class="dp-days">' + a.map(function(l, D) {
    return '<span class="dp-col-header">' + a[(D + s) % a.length] + "</span>";
  }).join("") + nt(u, s, function(l) {
    const D = l.getMonth() !== i, S = !e.inRange(l), b = l.getTime() === c;
    let g = "dp-day";
    return g += D ? " dp-edge-day" : "", g += w(l, u) ? " dp-current" : "", g += w(l, r) ? " dp-selected" : "", g += S ? " dp-day-disabled" : "", g += b ? " dp-day-today" : "", g += " " + e.dateClass(l), '<button tabindex="-1" type="button" class="' + g + '" data-date="' + l.getTime() + '">' + l.getDate() + "</button>";
  }) + '</div><footer class="dp-cal-footer"><button tabindex="-1" type="button" class="dp-today">' + n.today + '</button><button tabindex="-1" type="button" class="dp-clear">' + n.clear + '</button><button tabindex="-1" type="button" class="dp-close">' + n.close + "</button></footer></div>";
}
function X(t, e) {
  const n = t.code || t.keyCode, o = n === d.left ? -1 : n === d.right ? 1 : n === d.up ? -7 : n === d.down ? 7 : 0;
  n === d.esc ? e.close() : o && (t.preventDefault(), e.setState({
    highlightedDate: I(e.state.highlightedDate, o)
  }));
}
function _(t, e) {
  e.setState({
    selectedDate: v()
  });
}
function U(t, e) {
  e.setState({
    selectedDate: null
  });
}
function z(t, e) {
  e.close();
}
function G(t, e) {
  e.setState({
    view: "month"
  });
}
function Q(t, e) {
  e.setState({
    view: "year"
  });
}
function Z(t, e) {
  const n = e.state.highlightedDate;
  e.setState({
    highlightedDate: p(n, 1)
  });
}
function tt(t, e) {
  const n = e.state.highlightedDate;
  e.setState({
    highlightedDate: p(n, -1)
  });
}
function et(t, e) {
  if (!t.target)
    return;
  const n = t.target;
  e.setState({
    selectedDate: new Date(parseInt(n.getAttribute("data-date")))
  });
}
function nt(t, e, n) {
  let o = "";
  const a = new Date(t);
  a.setDate(1), a.setDate(1 - a.getDay() + e), e && a.getDate() === e + 1 && a.setDate(e - 6);
  for (let s = 0; s < 6 * 7; ++s)
    o += n(a), a.setDate(a.getDate() + 1);
  return o;
}
const ot = {
  onKeyDown: rt,
  onClick: {
    "dp-month": at
  },
  render: st
};
function at(t, e) {
  e.setState({
    highlightedDate: j(e.state.highlightedDate, parseInt(t.target.getAttribute("data-month"))),
    view: "day"
  });
}
function st(t) {
  const o = t.opts.lang.months, s = t.state.highlightedDate.getMonth();
  return '<div class="dp-months">' + o.map(function(r, u) {
    let i = "dp-month";
    return i += s === u ? " dp-current" : "", '<button tabindex="-1" type="button" class="' + i + '" data-month="' + u + '">' + r + "</button>";
  }).join("") + "</div>";
}
function rt(t, e) {
  const n = t.code || t.keyCode, o = n === d.left ? -1 : n === d.right ? 1 : n === d.up ? -3 : n === d.down ? 3 : 0;
  n === d.esc ? e.setState({
    view: "day"
  }) : o && (t.preventDefault(), e.setState({
    highlightedDate: p(e.state.highlightedDate, o, !0)
  }));
}
const it = {
  render: ct,
  onKeyDown: lt,
  onClick: {
    "dp-year": ut
  }
};
function ct(t) {
  const e = t.state, n = e.highlightedDate.getFullYear(), o = e.selectedDate.getFullYear();
  return '<div class="dp-years">' + dt(t, function(a) {
    let s = "dp-year";
    return s += a === n ? " dp-current" : "", s += a === o ? " dp-selected" : "", '<button tabindex="-1" type="button" class="' + s + '" data-year="' + a + '">' + a + "</button>";
  }) + "</div>";
}
function ut(t, e) {
  e.setState({
    highlightedDate: $(e.state.highlightedDate, parseInt(t.target.getAttribute("data-year"))),
    view: "day"
  });
}
function lt(t, e) {
  const n = t.code || t.keyCode, o = e.opts, a = n === d.left || n === d.up ? 1 : n === d.right || n === d.down ? -1 : 0;
  if (n === d.esc)
    e.setState({
      view: "day"
    });
  else if (a) {
    t.preventDefault();
    const s = T(e.state.highlightedDate, a);
    e.setState({
      highlightedDate: Y(s, o.min, o.max)
    });
  }
}
function dt(t, e) {
  let n = "";
  const o = t.opts.max.getFullYear();
  for (let a = o; a >= t.opts.min.getFullYear(); --a)
    n += e(a);
  return n;
}
const ft = {
  day: W,
  year: it,
  month: ot
};
(function() {
  if (typeof window.CustomEvent == "function") return !1;
  function t(e, n) {
    n = n || { bubbles: !1, cancelable: !1, detail: null };
    var o = document.createEvent("CustomEvent");
    return o.initCustomEvent(e, n.bubbles, n.cancelable, n.detail), o;
  }
  window.CustomEvent = t;
})();
function x(t, e, n) {
  let o, a = !1, s;
  const r = {
    // The root DOM element for the date picker, initialized on first open.
    el: void 0,
    opts: n,
    shouldFocusOnBlur: !0,
    shouldFocusOnRender: !0,
    state: u(),
    adjustPosition: C,
    containerHTML: '<div class="dp"></div>',
    attachToDom: function() {
      n.appendTo.appendChild(r.el);
    },
    updateInput: function(i) {
      const c = new CustomEvent("change", { bubbles: !0 });
      t.value = i ? n.format(i) : "", t.dispatchEvent(c);
    },
    computeSelectedDate: function() {
      return n.parse(t.value);
    },
    currentView: function() {
      return ft[r.state.view];
    },
    open: function() {
      a || (r.el || (r.el = ht(n, r.containerHTML), Dt(r)), s = Y(r.computeSelectedDate(), n.min, n.max), r.state.highlightedDate = s || n.highlightedDate, r.state.view = "day", r.attachToDom(), r.render(), e("open"));
    },
    isVisible: function() {
      return !!r.el && !!r.el.parentNode;
    },
    hasFocus: function() {
      const i = document.activeElement;
      return r.el && r.el.contains(i) && i.className.indexOf("dp-focuser") < 0;
    },
    shouldHide: function() {
      return r.isVisible();
    },
    close: function(i) {
      const c = r.el;
      if (r.isVisible()) {
        if (c) {
          const l = c.parentNode;
          l && l.removeChild(c);
        }
        a = !0, i && r.shouldFocusOnBlur && mt(t), setTimeout(function() {
          a = !1;
        }, 100), e("close");
      }
    },
    destroy: function() {
      r.close(), o();
    },
    render: function() {
      if (!r.el)
        return;
      const i = r.hasFocus(), c = r.currentView().render(r);
      c && (r.el.firstChild.innerHTML = c), r.adjustPosition(), (i || r.shouldFocusOnRender) && L(r);
    },
    // Conceptually similar to setState in React, updates
    // the view state and re-renders.
    setState: function(i) {
      for (const c in i)
        r.state[c] = i[c];
      e("statechange"), r.render();
    }
  };
  o = gt(t, r);
  function u() {
    return {
      get selectedDate() {
        return s;
      },
      set selectedDate(i) {
        i && !n.inRange(i) || (i ? (s = new Date(i), r.state.highlightedDate = s) : s = i, r.updateInput(s), e("select"), r.close());
      },
      view: "day"
    };
  }
  return r;
}
function ht(t, e) {
  const n = document.createElement("div");
  return n.className = t.mode, n.innerHTML = e, n;
}
function gt(t, e) {
  const n = k(5, function() {
    e.shouldHide() ? e.close() : e.open();
  }), o = [
    y("blur", t, k(150, function() {
      e.hasFocus() || e.close(!0);
    })),
    y("mousedown", t, function() {
      t === document.activeElement && n();
    }),
    y("focus", t, n),
    y("input", t, function(a) {
      if (!a || !a.target)
        return;
      const s = a.target, r = e.opts.parse(s.value);
      isNaN(r.valueOf()) || e.setState({
        highlightedDate: r
      });
    })
  ];
  return function() {
    o.forEach(function(a) {
      a();
    });
  };
}
function L(t) {
  const e = t.el.querySelector(".dp-current");
  return e && e.focus();
}
function Dt(t) {
  const e = t.el, n = e.querySelector(".dp");
  e.ontouchstart = C;
  function o(a) {
    a && a.target.className.split(" ").forEach(function(s) {
      const r = t.currentView().onClick[s];
      r && r(a, t);
    });
  }
  y("blur", n, k(150, function() {
    t.hasFocus() || t.close(!0);
  })), y("keydown", e, function(a) {
    const s = a;
    (s.code || s.keyCode) === d.enter ? o(s) : t.currentView().onKeyDown(s, t);
  }), y("mousedown", n, function(a) {
    document.activeElement !== a.target && (a.preventDefault(), L(t));
  }), y("click", e, o);
}
function mt(t) {
  t.focus(), /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && t.blur();
}
function yt(t, e, n) {
  const o = x(t, e, n);
  return t.readOnly = !0, o.containerHTML += '<a href="#" class="dp-focuser">.</a>', o;
}
function pt(t, e, n) {
  const o = x(t, e, n);
  return o.shouldFocusOnBlur = !1, Object.defineProperty(o, "shouldFocusOnRender", {
    get: function() {
      return t !== document.activeElement;
    }
  }), o.adjustPosition = function() {
    vt(t, o, n.alignment);
  }, o;
}
function vt(t, e, n) {
  const o = t.getBoundingClientRect(), a = window;
  wt(e, o, a), bt(e, o, a, n), e.el.style.visibility = "";
}
function bt(t, e, n, o) {
  const a = t.el, s = n.pageXOffset, r = e.left + s, u = n.innerWidth + s, i = a.offsetWidth, c = r + i, l = u - i, D = c > u && l > 0 ? l : r;
  o === "right" ? a.style.left = D + (e.width - i) + "px" : a.style.left = D + "px";
}
function wt(t, e, n) {
  const o = t.el, a = n.pageYOffset, s = a + e.top, r = o.offsetHeight, u = s + e.height + 8, i = s - r - 8, c = i > 0 && u + r > a + n.innerHeight, l = c ? i : u;
  o.classList && (o.classList.toggle("dp-is-above", c), o.classList.toggle("dp-is-below", !c)), o.style.top = l + "px";
}
function St(t, e, n) {
  const o = x(t, e, n);
  return o.close = C, o.updateInput = C, o.shouldFocusOnRender = n.shouldFocusOnRender || !1, o.computeSelectedDate = function() {
    return n.highlightedDate || /* @__PURE__ */ new Date();
  }, o.attachToDom = function() {
    o.el && t.appendChild(o.el);
  }, o.open(), o;
}
function Mt(t, e, n) {
  const o = t instanceof HTMLElement ? t : document.querySelector(t);
  if (!o)
    throw new Error(`The provided input '${t}' could not be found.`);
  switch (n.mode) {
    case "dp-modal":
      return yt(o, e, n);
    case "dp-below":
      return pt(o, e, n);
    case "dp-permanent":
      return St(o, e, n);
    default:
      throw new Error(`Unknown mode: '${n.mode}`);
  }
}
function N() {
  var t = {};
  function e(o, a) {
    (t[o] = t[o] || []).push(a);
  }
  function n(o) {
    for (const a in o)
      e(a, o[a]);
  }
  return {
    on: function(o, a) {
      return a ? e(o, a) : n(o), this;
    },
    emit: function(o, a) {
      (t[o] || []).forEach(function(s) {
        s(o, a);
      });
    },
    off: function(o, a) {
      return o ? a ? t[o] = (t[o] || []).filter(function(s) {
        return s !== a;
      }) : t[o] = [] : t = {}, this;
    }
  };
}
function P(t, e) {
  const n = N(), o = B(e), a = Mt(t, r, o);
  var s = {
    get state() {
      return a.state;
    },
    on: n.on,
    off: n.off,
    setState: a.setState,
    open: a.open,
    close: a.close,
    destroy: a.destroy
  };
  function r(u) {
    n.emit(u, s);
  }
  return s;
}
function kt(t, e) {
  e = e || {};
  const n = N(), o = Ct(t);
  let a, s = {
    start: void 0,
    end: void 0
  };
  const r = o.querySelector(".dr-cal-start"), u = o.querySelector(".dr-cal-end");
  if (!r)
    throw new Error(`Could not find DateRangePicker startElement: '${r}`);
  if (!u)
    throw new Error(`Could not find DateRangePicker endElement: '${u}`);
  const i = P(r, E({}, e.startOpts, {
    mode: "dp-permanent",
    dateClass: F
  })), c = P(u, E({}, e.endOpts, {
    mode: "dp-permanent",
    highlightedDate: p(i.state.highlightedDate, 1),
    dateClass: F
  })), l = {
    state: s,
    setState: b,
    on: n.on,
    off: n.off
  };
  i.on("statechange", D), i.on("select", S), c.on("statechange", D), c.on("select", S);
  function D(m, h) {
    const f = i.state.highlightedDate, M = c.state.highlightedDate;
    Et(f, M) !== 1 && (h === i ? c.setState({
      highlightedDate: p(h.state.highlightedDate, 1)
    }) : i.setState({
      highlightedDate: p(h.state.highlightedDate, -1)
    }));
  }
  function S(m, h) {
    const f = h.state.selectedDate;
    !s.start || s.end ? b({
      start: f,
      end: void 0
    }) : b({
      start: f > s.start ? s.start : f,
      end: f > s.start ? f : s.start
    });
  }
  function b(m) {
    s = { ...m }, n.emit("statechange", l), g();
  }
  function g() {
    i.setState({}), c.setState({});
  }
  /iPhone|iPad|iPod/i.test(navigator.userAgent) || o.addEventListener("mouseover", function(h) {
    if (!h || !h.target)
      return;
    const f = h.target;
    if (f.classList.contains("dp-day")) {
      const M = new Date(parseInt(f.dataset.date));
      !w(M, a) && (a = M, g());
    }
  });
  function F(m) {
    const h = (s.end || a) && s.start && Tt(m, s.end || a, s.start), f = w(m, s.start) || w(m, s.end);
    return (h ? "dr-in-range " : "") + (f ? "dr-selected " : "");
  }
  return l;
}
function Ct(t) {
  if (typeof t == "string") {
    const e = document.querySelector(t);
    if (!e)
      throw new Error(`Could not find container: '${t}'`);
    t = e;
  }
  return t.innerHTML = '<div class="dr-cals"><div class="dr-cal-start"></div><div class="dr-cal-end"></div></div>', t.querySelector(".dr-cals");
}
function O(t) {
  return t.getFullYear() * 12 + t.getMonth();
}
function Et(t, e) {
  return O(e) - O(t);
}
function Tt(t, e, n) {
  return t < n && t >= e || t <= e && t > n;
}
export {
  P as DatePicker,
  kt as DateRangePicker
};
