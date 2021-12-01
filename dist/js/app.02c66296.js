(function (t) {
  function e(e) {
    for (var i, r, s = e[0], c = e[1], l = e[2], u = 0, d = []; u < s.length; u++) r = s[u], Object.prototype.hasOwnProperty.call(a, r) && a[r] && d.push(a[r][0]), a[r] = 0;
    for (i in c) Object.prototype.hasOwnProperty.call(c, i) && (t[i] = c[i]);
    h && h(e);
    while (d.length) d.shift()();
    return o.push.apply(o, l || []), n();
  }

  function n() {
    for (var t, e = 0; e < o.length; e++) {
      for (var n = o[e], i = !0, s = 1; s < n.length; s++) {
        var c = n[s];
        0 !== a[c] && (i = !1);
      }
      i && (o.splice(e--, 1), t = r(r.s = n[0]));
    }
    return t;
  }

  var i = {}, a = {app: 0}, o = [];

  function r(e) {
    if (i[e]) return i[e].exports;
    var n = i[e] = {i: e, l: !1, exports: {}};
    return t[e].call(n.exports, n, n.exports, r), n.l = !0, n.exports;
  }

  r.m = t, r.c = i, r.d = function (t, e, n) {
    r.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: n});
  }, r.r = function (t) {
    "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0});
  }, r.t = function (t, e) {
    if (1 & e && (t = r(t)), 8 & e) return t;
    if (4 & e && "object" === typeof t && t && t.__esModule) return t;
    var n = Object.create(null);
    if (r.r(n), Object.defineProperty(n, "default", {
      enumerable: !0,
      value: t
    }), 2 & e && "string" != typeof t) for (var i in t) r.d(n, i, function (e) {
      return t[e];
    }.bind(null, i));
    return n;
  }, r.n = function (t) {
    var e = t && t.__esModule ? function () {
      return t["default"];
    } : function () {
      return t;
    };
    return r.d(e, "a", e), e;
  }, r.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }, r.p = "/";
  var s = window["webpackJsonp"] = window["webpackJsonp"] || [], c = s.push.bind(s);
  s.push = e, s = s.slice();
  for (var l = 0; l < s.length; l++) e(s[l]);
  var h = c;
  o.push([0, "chunk-vendors"]), n();
})({
  0: function (t, e, n) {
    t.exports = n("56d7");
  }, "034f": function (t, e, n) {
    "use strict";
    n("85ec");
  }, "0379": function (t, e, n) {
    "use strict";
    n("eb63");
  }, "0d1f": function (t, e, n) {
    "use strict";
    /*!
 * fullpage.js Parallax Effect Extension 0.2.5 for fullPage.js v3
 * https://github.com/alvarotrigo/fullPage.js
 *
 * @license This code has been bought from www.alvarotrigo.com/fullPage/extensions/ and it is not free to use or distribute.
 * Copyright (C) 2016 alvarotrigo.com - A project by Alvaro Trigo
 */
    n("159b"), n("498a"), window.fp_parallaxExtension = function () {
      var t, e, n, i, a, o, r, s, c, l, h = this, u = window.fp_utils, d = window.fullpage_api, g = u.$,
        p = d.getFullpageData(), f = p.options, b = p.internals, m = ".fullpage-wrapper", v = "active", x = "." + v,
        k = ".fp-section", w = k + x, _ = "fp-slide", y = "." + _, C = y + x, B = "fp-notransition", E = "fp-bg",
        T = "." + E, S = "reveal", H = "cover", M = "fp-parallax-stylesheet", R = "fp-parallax-transitions",
        A = "#" + R, O = "fp-parallax-transition-class", z = "#" + O, j = 0, P = !1, I = !1, N = !0, D = !0, F = !1,
        L = !1, U = !1, G = !1, $ = !1, q = !0 === f.parallax || "slides" === f.parallax,
        W = !0 === f.parallax || "sections" === f.parallax, V = u.closest, Y = u.addClass, X = u.removeClass,
        K = u.hasClass, Z = u.css, Q = u.nextAll, J = u.prevAll;

      function tt(t) {
        return {cover: {offsetNormal: t ? 0 : e}, reveal: {offsetNormal: t ? -e : 0}};
      }

      function et(t) {
        return {cover: {offsetNormal: t ? 0 : n}, reveal: {offsetNormal: t ? -n : 0}};
      }

      function nt(t) {
        return t * i / 100;
      }

      function it(t) {
        return t * a / 100;
      }

      function at() {
        return window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName("body")[0].clientWidth;
      }

      function ot() {
        r && Bt(g(w).length ? g(w)[0] : g(k)[0], 0);
      }

      function rt() {
        if (W) {
          var e = g(w).length ? g(w)[0] : g(k)[0], n = t === S, i = n ? Q(e) : J(e), a = n ? J(e) : Q(e);
          i.forEach((function (e) {
            Bt(e, tt(n)[t].offsetNormal, "silent");
          })), a.forEach((function (t) {
            Bt(t, 0, "silent");
          }));
        }
        q && g(k).forEach((function (t) {
          g(y, t).length && st(g(C, t).length ? g(C, t)[0] : g(y, t)[0]);
        }));
      }

      function st(e) {
        var n = t === S, i = n ? Q(e) : J(e), a = n ? J(e) : Q(e);
        i.forEach((function (e) {
          Et(e, et(n)[t].offsetNormal, "silent");
        })), a.forEach((function (t) {
          Et(t, 0, "silent");
        }));
      }

      function ct(t) {
        var e = t.detail;
        a = at(), e && !f.scrollBar ? (vt(), xt()) : kt();
      }

      function lt(t) {
        h.destroy(), F = !1;
      }

      function ht() {
        g(".fp-scrollable").forEach((function (t) {
          var e = g(T, t)[0];
          (g(".fp-scrollable", t).length || K(t, "fp-scrollable")) && null != e && u.prependTo(t.parentNode, e);
        }));
      }

      function ut(t) {
        t.detail ? kt() : G = !0;
      }

      function dt(t) {
        t.detail, g(T).forEach((function (t) {
          t.setAttribute("data-final-x", 0), t.setAttribute("data-final-y", 0);
        })), o = g(k), rt();
      }

      function gt(t) {
        t.detail.leavingSection, t.detail.destination, I = $ = !0;
      }

      function pt(e) {
        var n = e.detail.leavingSection, i = e.detail.destination;
        Bt(n, tt(P)[t].offsetNormal, "silent");
        var a = g(y, n);
        a.length && a.forEach((function (t) {
          t !== i && Bt(t, 0, "silent");
        })), h.afterSlideLoads(g(y, n)[0]), $ = !1;
      }

      function ft(t) {
        var e = t.detail;
        L = !0, st("left" === e.xMovement ? g(y, g(w)[0])[0] : u.last(g(y, g(w)[0]))), setTimeout((function () {
          h.applyHorizontal(e);
        }));
      }

      function bt(t) {
        var e = t.detail;
        U = !0, rt(), setTimeout((function () {
          h.apply(e);
        }));
      }

      function mt() {
        F && (f.scrollBar || !f.autoScrolling || b.usingExtension("dragAndMove")) && function () {
          var n = b.usingExtension("dragAndMove") ? Math.abs(window.fp_dragAndMoveExtension.getCurrentScroll()) : u.getScrollTop(),
            a = n < j, r = u.index(g(w)[0], k), s = i + n;
          j = n;
          for (var c = 0; c < o.length; ++c) {
            var l = o[c], h = i + l.offsetTop;
            !a && l.offsetTop <= s ? r = c : a && n <= h && l.offsetTop < n && o.length > c + 1 && (r = c + 1);
          }
          var d = (i - (o[r].offsetTop - n)) * e / i;
          t !== S && (r -= 1);
          var p = t !== S ? d : -e + d;
          -1 < r && Bt(g(k)[r], p), 0 <= r - 1 && Bt(o[r - 1], tt(!1)[t].offsetNormal), void 0 !== o[r + 1] && Bt(o[r + 1], tt(!0)[t].offsetNormal);
        }();
      }

      function vt() {
        var t = ".fp-bg{transition: transform " + f.scrollingSpeed + "ms " + f.easingcss3 + ";}.fp-slide, .fp-section{transition: background-position " + f.scrollingSpeed + "ms " + f.easingcss3 + ";}";
        f.autoScrolling && !f.scrollBar && Tt(R, t);
      }

      function xt() {
        var t = ".fp-bg-animate{ transition: all " + f.scrollingSpeed + "ms " + f.easingcss3 + "}";
        Tt(O, t);
      }

      function kt() {
        u.remove(g(A));
      }

      function wt() {
        clearTimeout(l), l = setTimeout(_t, 350);
      }

      function _t() {
        i = u.getWindowHeight(), a = at(), e = nt(f.parallaxOptions.percentage), n = it(f.parallaxOptions.percentage), ot(), rt(), yt();
      }

      function yt() {
        Z(g(T), {height: i + "px"});
      }

      function Ct(t) {
        return Math.round(2 * t) / 2;
      }

      function Bt(t, e, n) {
        var i = Ct(e), a = g(y, t);
        if (a.length) {
          var o = g(C, t)[0];
          t = null != o ? o : a[0];
        }
        if (r) Z(t, {"background-position-y": i + "px"}); else if (!K(t, _) || K(t, v) || void 0 !== n) {
          var s = g(T, t)[0];
          if (s) {
            var c = null != s.getAttribute("data-final-x") ? s.getAttribute("data-final-x") : 0;
            u.toggleClass(s, B, void 0 !== n), Z(s, {transform: "translateX(" + c + "px) translateY(" + i + "px)"}), s.setAttribute("data-final-x", c), s.setAttribute("data-final-y", i);
          }
        }
      }

      function Et(t, e, n) {
        var i = Ct(e), a = r ? t : g(T, t)[0];
        if (a) if (!f.scrollBar && f.autoScrolling || Y(a, "fp-bg-animate"), r) u.toggleClass(a, B, void 0 !== n), Z(a, {"background-position-x": i + "px"}); else {
          var o = 0, s = a.getAttribute("data-final-y");
          "none" !== s && null != s && (o = s), u.toggleClass(a, B, void 0 !== n || $), Z(a, {transform: "translateX(" + i + "px) translateY(" + o + "px)"}), a.setAttribute("data-final-x", i), a.setAttribute("data-final-y", o);
        }
      }

      function Tt(t, e) {
        if (!g("#" + t).length) {
          var n = document.head || document.getElementsByTagName("head")[0];
          u.appendTo((i = t, a = e, (o = document.createElement("style")).type = "text/css", o.id = i, o.styleSheet ? o.styleSheet.cssText = a : o.appendChild(document.createTextNode(a)), o), n);
        }
        var i, a, o;
      }

      c = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, window.requestAnimationFrame = c, h.apply = function (e) {
        if (W && (G && vt(), !e.localIsResizing && !f.scrollBar && f.autoScrolling) && (("up" === e.yMovement || e.sectionIndex) && (!e.isMovementUp || e.leavingSection - 1) || !f.continuousVertical || U)) {
          var n = tt(P = "up" === e.yMovement)[t].offsetNormal;
          Bt(g(k)[e.sectionIndex], 0), Bt(g(k)[e.leavingSection - 1], n), N = 1 === Math.abs(e.leavingSection - 1 - e.sectionIndex);
          for (var i = Math.min(e.leavingSection - 1, e.sectionIndex) + 1; i < Math.max(e.leavingSection - 1, e.sectionIndex); i++) Bt(g(k)[i], 0, "silent");
        }
      }, h.applyHorizontal = function (e) {
        if (q && (!e.localIsResizing || $) && "none" != e.xMovement) if ((s = void 0 !== e.direction && e.direction !== e.xMovement) && f.continuousHorizontal && !L) s = !1; else {
          var n = et(I = s ? "left" === e.direction : "left" === e.xMovement)[t].offsetNormal;
          if (Et(g(y, e.section)[e.slideIndex], 0), Et(g(y, e.section)[e.prevSlideIndex], n), !(D = 1 === Math.abs(e.slideIndex - e.prevSlideIndex)) && !$) for (var i = Math.min(e.slideIndex, e.prevSlideIndex) + 1; i < Math.max(e.slideIndex, e.prevSlideIndex); i++) Et(g(y, e.section)[i], 0, "silent");
        }
      }, h.init = function () {
        var s, c;
        i = u.getWindowHeight(), a = at(), t = f.parallaxOptions.type, e = nt(f.parallaxOptions.percentage), n = it(f.parallaxOptions.percentage), o = g(f.sectionSelector), r = "background" === f.parallaxOptions.property && !d.wordpress, yt(), (s = g(m)[0]).addEventListener("setAutoScrolling", ct), s.addEventListener("destroy", lt), s.addEventListener("onScroll", mt), s.addEventListener("afterResponsive", dt), s.addEventListener("onGrab", ut), s.addEventListener("onContinuousVertical", bt), s.addEventListener("onResize", wt), s.addEventListener("afterRender", ht), s.addEventListener("afterRebuild", ht), s.addEventListener("onResetSliders", gt), q && s.addEventListener("onContinuosHorizontal", ft), s.addEventListener("onEndResetSliders", pt), r || (g(T).length || (c = function (t) {
          if (!(K(t, "fp-auto-height") || K(document.body, "fp-responsive") && K(t, "fp-auto-height-responsive"))) {
            var e = document.createElement("div");
            e.className = E;
            var n = getComputedStyle(t).background;
            n.trim().length ? e.style.background = getComputedStyle(t).background : function (t, e) {
              t.style;
              var n = window.getComputedStyle(t);
              for (var i in n) -1 < i.indexOf("background") && -1 < i.indexOf("-") && (e.style[i] = n[i]);
            }(t, e), u.prependTo(t, e), t.style.setProperty("background", "none", "important");
          }
        }, g(k).forEach((function (t) {
          var e = g(y, t);
          e.length ? e.forEach((function (t) {
            c(t);
          })) : c(t);
        }))), Tt(M, ".fp-bg{top:0;bottom:0;width: 100%;position:absolute;z-index: -1;}.fp-section, .fp-slide, .fp-section.fp-table, .fp-slide.fp-table, .fp-section .fp-tableCell, .fp-slide .fp-tableCell {position:relative;overflow: hidden;}"), vt()), xt(), ot(), rt(), F = !0;
      }, h.destroy = function () {
        kt(), u.remove(g(z)), e = nt(0), n = it(0), g(k).length && (rt(), u.css(g(T), {height: ""})), clearTimeout(l);
        var t = g(m)[0];
        t && (t.removeEventListener("setAutoScrolling", ct), t.removeEventListener("destroy", lt), t.removeEventListener("onScroll", mt), t.removeEventListener("afterResponsive", dt), t.removeEventListener("onGrab", ut), t.removeEventListener("onContinuousVertical", bt), t.removeEventListener("onResize", wt), t.removeEventListener("afterRender", ht), t.removeEventListener("afterRebuild", ht), t.removeEventListener("onResetSliders", gt), q && t.removeEventListener("onContinuosHorizontal", ft), t.removeEventListener("onEndResetSliders", pt));
      }, h.setOption = function (i, a) {
        "offset" === i ? (f.parallaxOptions.percentage = a, e = nt(a), n = it(a)) : "type" === i && (f.parallaxOptions.type = a, t = a), rt();
      }, h.applyProperties = Bt, h.afterSlideLoads = function (e) {
        var n, i = void 0 !== e ? e : g(C, g(w)[0])[0], a = V(i, k);
        if ((r ? (n = a, g(y, n).length ? g(y, n) : [n]) : g(T, a)).forEach((function (t) {
          X(t, "fp-bg-animate");
        })), (L || s) && (st(i), L = !1), !D) {
          var o = et(I)[t].offsetNormal, c = i, l = I ? Q(c) : J(c);
          (t === S && I || t === H && !I || $) && l.forEach((function (t) {
            Et(t, o, "silent");
          }));
        }
      }, h.afterLoad = function () {
        if ((!f.scrollBar || !f.autoScrolling || b.usingExtension("dragAndMove")) && ((U || s) && (rt(), U = !1), !N)) {
          var e = tt(P)[t].offsetNormal, n = P ? Q(g(w)[0]) : J(g(w)[0]);
          (t === S && P || t === H && !P) && n.forEach((function (t) {
            Bt(t, e, "silent");
          }));
        }
      }, h.c = b.c;
      var St = h["common".charAt(0)];
      return "complete" === document.readyState && St("parallax"), window.addEventListener("load", (function () {
        St("parallax");
      })), h;
    };
  }, "15bc": function (t, e, n) {
    "use strict";
    n("2171");
  }, 1680: function (t, e, n) {
    "use strict";
    n("31a3");
  }, "1af4": function (t, e, n) {
    "use strict";
    n("95af");
  }, "1b85": function (t, e, n) {
    "use strict";
    /*!
 * fullpage.js Reset Scroll Overflow 0.0.3 for fullPage.js v3
 * https://github.com/alvarotrigo/fullPage.js
 *
 * @license This code has been bought from www.alvarotrigo.com/fullPage/extensions/ and it is not free to use or distribute.
 * Copyright (C) 2016 alvarotrigo.com - A project by Alvaro Trigo
 */
    n("159b"), window.fp_scrollOverflowResetExtension = function () {
      var t = this, e = window.fp_utils, n = window.fullpage_api, i = e.$, a = n.getFullpageData(), o = a.options,
        r = a.internals;
      t.reset = function () {
        var n = e.hasClass(t.prevDestiny, "fp-slide");
        if (t.prevDestiny && (1 == o.scrollOverflowReset || "slides" == o.scrollOverflowReset && n || "sections" == o.scrollOverflowReset && !n)) {
          var a = i(".fp-scrollable", t.prevDestiny);
          null != a && a.forEach((function (t) {
            var e = t.fp_iscrollInstance;
            null != e && e.scrollTo(0, 0);
          }));
        }
      }, t.setPrevious = function (e) {
        t.prevDestiny = e;
      }, t.c = r.c;
      var s = t["common".charAt(0)];
      return "complete" === document.readyState && s("scrollOverflowReset"), window.addEventListener("load", (function () {
        s("scrollOverflowReset");
      })), t;
    };
  }, "20f3": function (t, e, n) {
  }, 2171: function (t, e, n) {
  }, "31a3": function (t, e, n) {
  }, "4b5a": function (t, e, n) {
    "use strict";
    n("b969");
  }, "4df9": function (t, e, n) {
  }, "56d7": function (t, e, n) {
    "use strict";
    n.r(e);
    n("e260"), n("e6cf"), n("cca6"), n("a79d");
    var i = n("2b0e"), a = n("5f5b"), o = n("b1e0"), r = n("a7e2"),
      s = (n("f9e3"), n("2dd8"), n("0d1f"), n("a0a0"), n("1b85"), n("cc82"), n("a45e")), c = n.n(s), l = function () {
        var t = this, e = t.$createElement, n = t._self._c || e;
        return n("div", {attrs: {id: "app"}}, [n("full-page", {
          attrs: {
            id: "fullpage",
            options: t.fullpageOptions
          }
        }, [n("IntroSection", {attrs: {contents: t.table_of_contents}}), n("TermsSection"), n("BlockchainSection"), n("PowBlockchainSection"), n("TimeChainSection"), n("RealBlocksSection"), n("ResourcesSection")], 1)], 1);
      }, h = [], u = (n("159b"), n("18a5"), n("ac1f"), n("466d"), function () {
        var t = this, e = t.$createElement, n = t._self._c || e;
        return n("div", {staticClass: "section", attrs: {id: "blockchain_section"}}, [n("Page", {
          attrs: {
            slide: "",
            "data-anchor": "blockchain"
          }
        }, [n("h1", [t._v("Blockchain")]), n("b-card", [n("h4", {staticClass: "text-left"}, [t._v("blockchain (n.)")]), n("hr"), n("p", [t._v(" A data structure that uses hashes to prove that previous blocks existed before following blocks, therefore establishing an "), n("b", [t._v("Order of Events")]), t._v(". ")])]), n("b-card", {attrs: {"no-body": ""}}, [n("b-card-body", [n("h4", {staticClass: "text-left"}, [t._v("block (n.)")]), n("hr"), n("p", [t._v(" A set of data with a hash that 'locks' the data in place. You cannot change the data without changing the hash. ")]), n("h6", [t._v("Example")])]), n("b-card", {attrs: {"no-body": ""}}, [n("b-card-header", [t._v(" Block Hash or ID - The hash of the blocks' data ")]), n("b-list-group-item", {staticClass: "list-field"}, [t._v("Number / Height")]), n("b-list-group-item", {staticClass: "list-value"}, [t._v("Also known as length (of the chain)")]), n("b-list-group-item", {staticClass: "list-field"}, [t._v("Data")]), n("b-list-group-item", {staticClass: "list-value"}, [t._v("Any arbitrary data")]), n("b-list-group-item", {staticClass: "list-field"}, [t._v("Timestamp")]), n("b-list-group-item", {staticClass: "list-value"}, [t._v(" The time the block was added to the blockchain ")]), n("b-list-group-item", {staticClass: "list-field"}, [t._v("Previous Hash")]), n("b-list-group-item", {staticClass: "list-value"}, [t._v("The hash of the previous block")])], 1)], 1), n("h4", {staticClass: "mt-4"}, [t._v("Why does Bitcoin use a blockchain?")]), n("p", [t._v(" A physical coin or asset requires no history, it exists in only location at a time. Ownership is proven simply by who physically controls the coin. ")]), n("p", [t._v(" Because Bitcoin is not a physical asset, a ledger is used to keep track of who controls how much bitcoin. ")]), n("p", [t._v(" Bitcoin requires a blockchain to establish an order of events in the ledger to prove that one transaction came before another. ")])], 1), n("Page", {
          attrs: {
            "data-anchor": "simple_blockchain",
            slide: "",
            "encoding-btn": "",
            "active-encoding": t.activeEncoding
          }, on: {"rotate-encoding": t.rotateEncoding, "update-active-encoding": t.updateActiveEncoding}
        }, [n("h1", [t._v("Simplified Blockchain")]), n("p", [t._v(" For this demo we will start by only looking at the first 2 digits of the hash of each block. ")]), n("p", [t._v(" Add a few blocks and then watch as you change an old block the change is propagated up the chain. ")]), n("AddBlockButton", {
          attrs: {"disable-add-block-btn": !1},
          on: {"add-block": t.addBlock, "reset-blocks": t.resetBlocks}
        }), n("div", {staticClass: "blockchain_wrapper"}, t._l(this.blocks, (function (e, i) {
          return n("BlockCard", {
            key: i,
            attrs: {block: e, "hex-digits": 2, index: i, "local-encoding": t.encoding[t.activeEncoding], showData: ""},
            on: {"update-data": t.updateData}
          });
        })), 1)], 1)], 1);
      }), d = [], g = function () {
        var t = this, e = t.$createElement, n = t._self._c || e;
        return n("div", {staticClass: "add_block_card"}, [n("b-card", {attrs: {"no-body": ""}}, [n("b-card-header", {attrs: {"header-bg-variant": "info"}}, [n("b-icon-wrench"), t._v(" Add block ")], 1), n("b-list-group-item", {staticClass: "list-field"}, [t._v(t._s(t.now))]), n("b-list-group-item", {staticClass: "list-value border-0"}, [n("b-input-group", {
          attrs: {
            prepend: "Data",
            size: "sm"
          }
        }, [n("b-form-input", {
          attrs: {disabled: t.disableAddBlockBtn, size: "sm"},
          model: {
            value: t.newBlockData, callback: function (e) {
              t.newBlockData = e;
            }, expression: "newBlockData"
          }
        }), n("b-button", {
          staticStyle: {"border-top-left-radius": "0", "border-bottom-left-radius": "0"},
          attrs: {variant: "primary", size: "sm", disabled: t.disableAddBlockBtn},
          on: {click: t.addBlock}
        }, [t._v(" Add ")]), n("b-button", {
          staticClass: "ml-2",
          attrs: {title: "Reset", size: "sm", variant: "warning"},
          on: {
            click: function (e) {
              return t.$emit("reset-blocks");
            }
          }
        }, [n("b-icon-trash")], 1)], 1)], 1)], 1)], 1);
      }, p = [], f = {
        props: {disableAddBlockBtn: Boolean}, data: function () {
          return {newBlockData: "Try adding a block...", now: (new Date).toUTCString()};
        }, mounted: function () {
          this.getTime();
        }, methods: {
          addBlock: function () {
            this.$emit("add-block", this.newBlockData);
          }, getTime: function () {
            this.now = (new Date).toUTCString(), setTimeout(this.getTime, 1e3);
          }
        }
      }, b = f, m = n("2877"), v = Object(m["a"])(b, g, p, !1, null, null, null), x = v.exports, k = function () {
        var t = this, e = t.$createElement, n = t._self._c || e;
        return n("div", {ref: "block_" + t.block.height}, [t.index > 0 ? n("b-iconstack", {
          staticClass: "mb-4",
          attrs: {"font-scale": "3"}
        }, [n("b-icon-link", {
          style: t.getLinkColor,
          attrs: {stacked: "", rotate: "90"}
        }), t.isHashValid ? t._e() : n("b-icon", {
          attrs: {
            stacked: "",
            icon: "slash",
            variant: "danger"
          }
        })], 1) : t._e(), n("b-card", {
          staticClass: "block",
          style: "box-shadow: -1px 2px 5px 0 " + t.block.color + ";",
          attrs: {"no-body": ""}
        }, [n("b-list-group", {
          key: t.getHash,
          staticClass: "header update_box_shadow",
          style: "background-color: " + t.block.color + ";"
        }, [n("b-list-group-item", {staticClass: "list-field"}, [n("span", {staticClass: "block_hash"}, [t._v("Block Hash "), 0 === t.block.height ? [t._v("(Genesis Block)")] : t._e()], 2), n("span", {staticClass: "block_number"}, [t._v("#" + t._s(t.block.height))])]), n("b-list-group-item", {staticClass: "list-value border-0"}, [t._v(" " + t._s(t.getHash) + " ")])], 1), t.showBlockHeightInput ? [n("b-list-group-item", {staticClass: "list-field"}, [t._v("Height")]), n("b-list-group-item", {staticClass: "list-value"}, [n("b-input-group", {attrs: {size: "sm"}}, [n("b-form-input", {
          attrs: {
            value: t.block.height,
            max: t.blockHeightMax,
            min: 0,
            type: "number",
            size: "sm"
          }, on: {change: t.onBlockHeightChange}
        }), n("b-button", {
          attrs: {variant: "primary", size: "sm"}, on: {
            click: function (e) {
              return t.$emit("update-block-height-latest");
            }
          }
        }, [t._v("Latest")])], 1)], 1)] : t._e(), t.showData ? [n("b-list-group-item", {staticClass: "list-field"}, [t._v("Data")]), n("b-list-group-item", {staticClass: "list-value"}, [n("b-form-input", {
          attrs: {
            value: t.block.header.data,
            size: "sm"
          }, on: {keyup: t.onDataChange}
        })], 1)] : t._e(), t.showReal ? [n("b-list-group-item", {staticClass: "list-field"}, [t._v("Version")]), n("b-list-group-item", {staticClass: "list-value"}, [t._v(" " + t._s(t.block.header.version.toString(16).padStart(8, "0")) + " ")]), n("b-list-group-item", {staticClass: "list-field"}, [t._v("Bits")]), n("b-list-group-item", {staticClass: "list-value"}, [t._v(" " + t._s(t.block.header.bits.toString(16).padStart(8, "0")) + " ")]), n("b-list-group-item", {staticClass: "list-field"}, [t._v("Merkle Root")]), n("b-list-group-item", {staticClass: "list-value merkle_root"}, [t._v(t._s(t.block.header.merkleRoot))])] : t._e(), t.showNonce ? [n("b-list-group-item", {staticClass: "list-field"}, [t._v("Nonce")]), n("b-list-group-item", {staticClass: "list-value"}, [t._v(" " + t._s(t.block.header.nonce) + " "), t.isHashValid ? t._e() : [n("b-button", {
          staticClass: "float-right",
          attrs: {size: "sm", variant: "danger"},
          on: {
            click: function (e) {
              return t.$emit("mine-this-block", t.index);
            }
          }
        }, [n("b-icon-hammer", {
          attrs: {
            size: "sm",
            animation: "fade",
            scale: ".5"
          }
        })], 1)]], 2)] : t._e(), n("b-list-group-item", {staticClass: "list-field"}, [t._v("Timestamp")]), n("b-list-group-item", {staticClass: "list-value"}, [t._v(t._s(t.getTime))]), n("b-list-group-item", {staticClass: "list-field"}, [t._v("Previous Hash")]), n("b-list-group-item", {staticClass: "list-value"}, [n("div", {
          key: t.block.header.prevHash,
          staticClass: "rounded prev_block update_box_shadow",
          style: t.getPrevColor
        }, [t._v(" " + t._s(t.block.header.prevHash[t.localEncoding]) + " ")])])], 2)], 1);
      }, w = [], _ = (n("a9e3"), n("1da1")), y = n("d4ec"), C = n("bee2");
    n("96cf"), n("4d90"), n("d3b7"), n("25f0"), n("a15b"), n("5cc6"), n("9a8c"), n("a975"), n("735e"), n("c1ac"), n("d139"), n("3a7b"), n("d5d6"), n("82f8"), n("e91f"), n("60bd"), n("5f96"), n("3280"), n("3fcc"), n("ca91"), n("25a1"), n("cd26"), n("3c5d"), n("2954"), n("649e"), n("219c"), n("170b"), n("b39a"), n("72f7"), n("d81d"), n("a630"), n("3ca3");

    function B(t) {
      return Number(t).toString(16).padStart(8, "0");
    }

    function E(t) {
      var e = String(t), n = [], i = e.length - 2;
      while (i >= 0) {
        var a = e.substr(i, 2);
        n.push(a), i -= 2;
      }
      return n.join("");
    }

    function T(t) {
      return S.apply(this, arguments);
    }

    function S() {
      return S = Object(_["a"])(regeneratorRuntime.mark((function t(e) {
        var n, i;
        return regeneratorRuntime.wrap((function (t) {
          while (1) switch (t.prev = t.next) {
            case 0:
              return t.next = 2, crypto.subtle.digest("SHA-256", e);
            case 2:
              return n = t.sent, i = Array.from(new Uint8Array(n)), t.abrupt("return", i.map((function (t) {
                return t.toString(16).padStart(2, "0");
              })).join(""));
            case 5:
            case"end":
              return t.stop();
          }
        }), t);
      }))), S.apply(this, arguments);
    }

    function H(t) {
      return (new TextEncoder).encode(t);
    }

    function M(t) {
      return R.apply(this, arguments);
    }

    function R() {
      return R = Object(_["a"])(regeneratorRuntime.mark((function t(e) {
        return regeneratorRuntime.wrap((function (t) {
          while (1) switch (t.prev = t.next) {
            case 0:
              return t.abrupt("return", T(H(e)));
            case 1:
            case"end":
              return t.stop();
          }
        }), t);
      }))), R.apply(this, arguments);
    }

    function A(t) {
      return O.apply(this, arguments);
    }

    function O() {
      return O = Object(_["a"])(regeneratorRuntime.mark((function t(e) {
        var n, i;
        return regeneratorRuntime.wrap((function (t) {
          while (1) switch (t.prev = t.next) {
            case 0:
              return t.next = 2, M(e);
            case 2:
              return n = t.sent, t.next = 5, M(n);
            case 5:
              return i = t.sent, t.abrupt("return", E(i));
            case 7:
            case"end":
              return t.stop();
          }
        }), t);
      }))), O.apply(this, arguments);
    }

    function z(t) {
      return t.length % 2 !== 0 ? "" : new Uint8Array(t.match(/.{1,2}/g).map((function (t) {
        return parseInt(t, 16);
      })));
    }

    function j(t) {
      return P.apply(this, arguments);
    }

    function P() {
      return P = Object(_["a"])(regeneratorRuntime.mark((function t(e) {
        return regeneratorRuntime.wrap((function (t) {
          while (1) switch (t.prev = t.next) {
            case 0:
              return t.abrupt("return", T(z(e)));
            case 1:
            case"end":
              return t.stop();
          }
        }), t);
      }))), P.apply(this, arguments);
    }

    function I(t) {
      return N.apply(this, arguments);
    }

    function N() {
      return N = Object(_["a"])(regeneratorRuntime.mark((function t(e) {
        var n, i;
        return regeneratorRuntime.wrap((function (t) {
          while (1) switch (t.prev = t.next) {
            case 0:
              return t.next = 2, j(e);
            case 2:
              return n = t.sent, t.next = 5, j(n);
            case 5:
              return i = t.sent, t.abrupt("return", E(i));
            case 7:
            case"end":
              return t.stop();
          }
        }), t);
      }))), N.apply(this, arguments);
    }

    n("843c");
    var D = function t() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : BigInt(0),
          n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2;
        Object(y["a"])(this, t), this.bigInt = e, this.num = Number(e), this.exponential = Number(e).toExponential(), this.hexadecimal = e.toString(16).padStart(n, "0"), this.yRatio = 0;
        var i = BigInt("0x".padEnd(n + 2, "f")), a = i.toString(2);
        this.binary = e.toString(2).padStart(a.length, "0");
        i.toLocaleString("en-US");
        var o = e.toLocaleString("en-US");
        this.decimal = o;
      }, F = D, L = function () {
        function t(e, n, i) {
          Object(y["a"])(this, t), this.hash = e, this.header = n, this.height = i, this.color = "#61e294", this.isHashValid = !0, this.prevColor = "";
        }

        return Object(C["a"])(t, [{
          key: "calcHash", value: function () {
            var t = Object(_["a"])(regeneratorRuntime.mark((function t() {
              var e, n, i = arguments;
              return regeneratorRuntime.wrap((function (t) {
                while (1) switch (t.prev = t.next) {
                  case 0:
                    return e = i.length > 0 && void 0 !== i[0] ? i[0] : 64, t.next = 3, I(this.header.serialize());
                  case 3:
                    n = t.sent, n = n.substr(0, e), this.hash = new F(BigInt("0x".concat(n)), e);
                  case 6:
                  case"end":
                    return t.stop();
                }
              }), t, this);
            })));

            function e() {
              return t.apply(this, arguments);
            }

            return e;
          }()
        }]), t;
      }(), U = L, G = {
        props: {
          block: U,
          hexDigits: {type: Number, required: !1},
          index: {type: Number, required: !1},
          showBlockHeightInput: Boolean,
          showData: Boolean,
          showReal: Boolean,
          showNonce: Boolean,
          localEncoding: String
        }, data: function () {
          return {blockHeightMax: 706894};
        }, computed: {
          getColor: function () {
            return "background-color: ".concat(this.block.color, ";");
          }, getPrevColor: function () {
            return 0 === this.block.height || this.showReal ? "color: white;" : "background-color: ".concat(this.block.prevColor, ";");
          }, getLinkColor: function () {
            return "color: ".concat(this.block.color, ";");
          }, getTime: function () {
            var t = new Date(1e3 * this.block.header.timestamp);
            return new Intl.DateTimeFormat("en-US", {dateStyle: "medium", timeStyle: "long"}).format(t);
          }, isHashValid: function () {
            return !this.showNonce || this.block.isHashValid;
          }, getHash: function () {
            return this.block.hash[this.localEncoding];
          }
        }, methods: {
          onDataChange: function (t) {
            this.$emit("update-data", t, this.index);
          }, onBlockHeightChange: function (t) {
            this.$emit("update-block-height", t);
          }
        }
      }, $ = G, q = (n("9720"), Object(m["a"])($, k, w, !1, null, null, null)), W = q.exports, V = n("262e"),
      Y = n("2caf"), X = function () {
        function t(e, n, i, a, o, r) {
          Object(y["a"])(this, t), this.bits = e, this.merkleRoot = n, this.nonce = i, this.prevHash = a, this.timestamp = o, this.version = r;
        }

        return Object(C["a"])(t, [{
          key: "serialize", value: function () {
            return E(B(this.version)) + E(this.prevHash.hexadecimal) + E(this.merkleRoot) + E(B(this.timestamp)) + E(B(this.bits)) + E(B(this.nonce));
          }
        }], [{
          key: "genesis", get: function () {
            return new t(486604799, "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b", 2083236893, new F(0n, 64), 1231006505, 1);
          }
        }]), t;
      }(), K = X, Z = function (t) {
        Object(V["a"])(n, t);
        var e = Object(Y["a"])(n);

        function n(t, i, a) {
          var o;
          Object(y["a"])(this, n);
          var r = (new Date).getTime() / 1e3;
          return o = e.call(this, 0, "", i, a, r, 0), o.data = t, o;
        }

        return Object(C["a"])(n, [{
          key: "serialize", value: function () {
            return this.data + this.timestamp + this.prevHash.hexadecimal + this.nonce;
          }
        }], [{
          key: "genesis", get: function () {
            return new n("Alice sent Bob 5₿", 0, new F(BigInt(0)));
          }
        }]), n;
      }(K), Q = Z, J = function (t) {
        Object(V["a"])(n, t);
        var e = Object(Y["a"])(n);

        function n(t, i, a, o, r) {
          var s;
          return Object(y["a"])(this, n), s = e.call(this, t, i, a), s.color = o, s.prevColor = r, s.isHashValid = !1, s.stats = [], s;
        }

        return Object(C["a"])(n, [{
          key: "calcHash", value: function () {
            var t = Object(_["a"])(regeneratorRuntime.mark((function t() {
              var e, n, i = arguments;
              return regeneratorRuntime.wrap((function (t) {
                while (1) switch (t.prev = t.next) {
                  case 0:
                    return e = i.length > 0 && void 0 !== i[0] ? i[0] : 64, t.next = 3, A(this.header.serialize());
                  case 3:
                    n = t.sent, n = n.substr(0, e), this.hash = new F(BigInt("0x".concat(n)), e);
                  case 6:
                  case"end":
                    return t.stop();
                }
              }), t, this);
            })));

            function e() {
              return t.apply(this, arguments);
            }

            return e;
          }()
        }]), n;
      }(U), tt = J, et = {
        data: function () {
          return {
            colors: ["#B983FF", "#94DAFF", "#94B3FD", "#99FEFF", "#14E3FD", "#3CAFAA", "#6471F7", "#7855F5", "#99FEFF", "#A01CF2"],
            blocks: [new tt("", Q.genesis, 0, "#61e294", "inherit")],
            disableAddBlockBtn: !0,
            hexDigits: 2,
            newBlockData: "",
            guesses: []
          };
        }, mounted: function () {
          var t = this;
          return Object(_["a"])(regeneratorRuntime.mark((function e() {
            return regeneratorRuntime.wrap((function (e) {
              while (1) switch (e.prev = e.next) {
                case 0:
                  return e.next = 2, t.resetBlocks();
                case 2:
                case"end":
                  return e.stop();
              }
            }), e);
          })))();
        }, methods: {
          addBlock: function (t) {
            var e = this;
            return Object(_["a"])(regeneratorRuntime.mark((function n() {
              var i, a, o, r, s, c;
              return regeneratorRuntime.wrap((function (n) {
                while (1) switch (n.prev = n.next) {
                  case 0:
                    return i = "Try adding a block..." === t ? "Try changing this data..." : t, a = new Q(i, 0, e.blocks[0].hash), o = e.blocks.length, r = e.colors[e.blocks.length % e.colors.length], s = e.colors[(e.blocks.length - 1) % e.colors.length], c = new tt("", a, o, r, s), n.next = 8, c.calcHash(e.hexDigits);
                  case 8:
                    e.blocks.unshift(c), e.disableAddBlockBtn = !0, e.newBlockData = "", window.fullpage_api.reBuild();
                  case 12:
                  case"end":
                    return n.stop();
                }
              }), n);
            })))();
          }, resetAddBlockBtn: function () {
            var t = this;
            this.disableAddBlockBtn = !1, this.blocks.forEach((function (e) {
              e.isHashValid || (t.disableAddBlockBtn = !0);
            }));
          }, resetBlocks: function () {
            var t = this;
            return Object(_["a"])(regeneratorRuntime.mark((function e() {
              var n;
              return regeneratorRuntime.wrap((function (e) {
                while (1) switch (e.prev = e.next) {
                  case 0:
                    return n = new tt("", Q.genesis, 0, t.colors[0], "inherit"), e.next = 3, n.calcHash(t.hexDigits);
                  case 3:
                    t.blocks = [n], window.fullpage_api.reBuild();
                  case 5:
                  case"end":
                    return e.stop();
                }
              }), e);
            })))();
          }, finalizeBlock: function (t) {
            var e = this;
            return Object(_["a"])(regeneratorRuntime.mark((function n() {
              var i;
              return regeneratorRuntime.wrap((function (n) {
                while (1) switch (n.prev = n.next) {
                  case 0:
                    return i = e.blocks[t], i.header.timestamp = (new Date).getTime() / 1e3, n.next = 4, i.calcHash(e.hexDigits);
                  case 4:
                    i.isHashValid = i.hash.bigInt < e.target.bigInt, e.guesses.push({
                      xRatio: 0,
                      yRatio: i.hash.num / e.hashMax.num,
                      hash: i.hash,
                      isHashValid: i.isHashValid
                    }), e.guesses.length > 100 && e.guesses.shift(), t > 0 && (e.blocks[t - 1].header.prevHash = i.hash), e.resetAddBlockBtn();
                  case 9:
                  case"end":
                    return n.stop();
                }
              }), n);
            })))();
          }, instantUpdate: function (t) {
            var e = this;
            return Object(_["a"])(regeneratorRuntime.mark((function n() {
              return regeneratorRuntime.wrap((function (n) {
                while (1) switch (n.prev = n.next) {
                  case 0:
                    return n.next = 2, e.finalizeBlock(t);
                  case 2:
                    if (0 !== t) {
                      n.next = 4;
                      break;
                    }
                    return n.abrupt("return");
                  case 4:
                    return n.next = 6, e.instantUpdate(t - 1);
                  case 6:
                  case"end":
                    return n.stop();
                }
              }), n);
            })))();
          }, delayedUpdate: function (t) {
            var e = this;
            return Object(_["a"])(regeneratorRuntime.mark((function n() {
              return regeneratorRuntime.wrap((function (n) {
                while (1) switch (n.prev = n.next) {
                  case 0:
                    return n.next = 2, e.finalizeBlock(t);
                  case 2:
                    if (0 !== t) {
                      n.next = 4;
                      break;
                    }
                    return n.abrupt("return");
                  case 4:
                    setTimeout(Object(_["a"])(regeneratorRuntime.mark((function n() {
                      return regeneratorRuntime.wrap((function (n) {
                        while (1) switch (n.prev = n.next) {
                          case 0:
                            return n.next = 2, e.delayedUpdate(t - 1);
                          case 2:
                          case"end":
                            return n.stop();
                        }
                      }), n);
                    }))), 1e3);
                  case 5:
                  case"end":
                    return n.stop();
                }
              }), n);
            })))();
          }, mineThisBlock: function (t) {
            this.blockToMine = t, this.guesses = [], fullpage_api.moveSlideRight();
          }, startMining: function (t) {
            var e = this;
            return Object(_["a"])(regeneratorRuntime.mark((function n() {
              var i;
              return regeneratorRuntime.wrap((function (n) {
                while (1) switch (n.prev = n.next) {
                  case 0:
                    e.isMining = !0, i = e.blocks[t];
                  case 2:
                    if (i.isHashValid) {
                      n.next = 8;
                      break;
                    }
                    return i.header.nonce += 1, n.next = 6, e.finalizeBlock(t);
                  case 6:
                    n.next = 2;
                    break;
                  case 8:
                    e.isMining = !1;
                  case 9:
                  case"end":
                    return n.stop();
                }
              }), n);
            })))();
          }, updateNonce: function (t, e) {
            var n = this;
            return Object(_["a"])(regeneratorRuntime.mark((function i() {
              return regeneratorRuntime.wrap((function (i) {
                while (1) switch (i.prev = i.next) {
                  case 0:
                    return n.blocks[e].header.nonce = t, i.next = 3, n.instantUpdate(e);
                  case 3:
                  case"end":
                    return i.stop();
                }
              }), i);
            })))();
          }, updateData: function (t, e) {
            var n = this;
            return Object(_["a"])(regeneratorRuntime.mark((function i() {
              return regeneratorRuntime.wrap((function (i) {
                while (1) switch (i.prev = i.next) {
                  case 0:
                    return n.blocks[e].header.data = t.target.value, i.next = 3, n.delayedUpdate(e);
                  case 3:
                  case"end":
                    return i.stop();
                }
              }), i);
            })))();
          }, updateHexDigits: function (t) {
            this.hexDigits = t;
            var e = BigInt("0x".concat("".padEnd(this.hexDigits, "f")));
            this.targetMax = new F(e - 1n, this.hexDigits), this.hashMax = new F(e, this.hexDigits), this.guesses = [];
          }
        }
      }, nt = {
        data: function () {
          return {activeEncoding: 2, encoding: ["binary", "decimal", "hexadecimal", "exponential"]};
        }, methods: {
          rotateEncoding: function () {
            this.activeEncoding += 1, this.activeEncoding %= this.encoding.length;
          }, updateActiveEncoding: function (t) {
            this.activeEncoding = t;
          }
        }
      }, it = {
        data: function () {
          return {
            avgHashes: 4,
            denominator: 1n,
            difficulty: 0,
            hashMax: new F(255n),
            numerator: 0n,
            probability: .06,
            target: new F(15n),
            targetMax: new F(255n)
          };
        }, mounted: function () {
          this.calcStats(), this.target.yRatio = this.target.num / this.hashMax.num;
        }, watch: {
          targetMax: function () {
            this.calcStats();
          }
        }, methods: {
          realTargetMax: function () {
            this.targetMax = new F(BigInt(0x00000000ffff0000000000000000000000000000000000000000000000000000n), 64), this.calcStats();
          }, updateTarget: function (t) {
            var e = this;
            return Object(_["a"])(regeneratorRuntime.mark((function n() {
              return regeneratorRuntime.wrap((function (n) {
                while (1) switch (n.prev = n.next) {
                  case 0:
                    e.target = t.bigInt > e.hashMax.bigInt ? new F(e.hashMax.bigInt) : t, e.target.yRatio = e.target.num / e.hashMax.num, e.calcStats(), e.blocks.forEach((function (t) {
                      t.isHashValid = t.hash.bigInt < e.target.bigInt;
                    })), e.guesses.forEach((function (t) {
                      t.isHashValid = t.hash.bigInt < e.target.bigInt;
                    }));
                  case 5:
                  case"end":
                    return n.stop();
                }
              }), n);
            })))();
          }, calcStats: function () {
            this.difficulty = this.targetMax.num / this.target.num, this.probability = this.target.num / this.hashMax.num, this.avgHashes = 1 / this.probability;
            var t = this.gcd(this.target.bigInt, this.hashMax.bigInt);
            this.numerator = this.target.bigInt / t, this.denominator = this.hashMax.bigInt / t;
          }, gcd: function (t, e) {
            var n = t, i = e;
            while (1) {
              if (i === BigInt(0)) return n;
              if (n %= i, n === BigInt(0)) return i;
              i %= n;
            }
          }
        }
      }, at = function () {
        var t = this, e = t.$createElement, n = t._self._c || e;
        return n("div", {
          class: t.type,
          attrs: {id: t.id, "data-anchor": t.dataAnchor}
        }, [n("div", {staticClass: "fp-bg"}), t.encodingBtn ? n("EncodingButton", {
          attrs: {
            "active-encoding": t.activeEncoding,
            encoding: t.encoding
          }, on: {"update-active-encoding": t.updateActiveEncoding, "rotate-encoding": t.rotateEncoding}
        }) : t._e(), n("b-container", [n("b-row", [n("b-col", [t._t("default")], 2)], 1)], 1)], 1);
      }, ot = [], rt = function () {
        var t = this, e = t.$createElement, n = t._self._c || e;
        return n("b-dropdown", {
          staticClass: "encoding_btn",
          attrs: {size: "sm", split: "", "split-variant": "outline-info", dropleft: "", variant: "info"},
          on: {click: t.onRotateEncoding},
          scopedSlots: t._u([{
            key: "button-content", fn: function () {
              return [t._v(" " + t._s(t.header.substr(0, 3)) + " ")];
            }, proxy: !0
          }])
        }, [t._l(t.encoding, (function (e, i) {
          return [n("b-dropdown-item", {
            key: e,
            attrs: {id: e, active: i === t.activeEncoding},
            on: {click: t.onSelectEncoding}
          }, [t._v(" " + t._s(t.capitalize(e)) + " ")])];
        }))], 2);
      }, st = [], ct = (n("fb6a"), {
        props: {
          encoding: {type: Array, default: ["binary", "decimal", "hexadecimal"]},
          activeEncoding: {type: Number, default: 2}
        }, watch: {
          activeEncoding: function () {
            this.header = this.capitalize(this.encoding[this.activeEncoding]);
          }
        }, mounted: function () {
          this.header = this.capitalize(this.encoding[this.activeEncoding]);
        }, methods: {
          onRotateEncoding: function () {
            this.$emit("rotate-encoding"), this.activeEncoding += 1, this.activeEncoding %= this.encoding.length, this.header = this.capitalize(this.encoding[this.activeEncoding]);
          }, onSelectEncoding: function (t) {
            this.$emit("update-active-encoding", this.encoding.indexOf(t.target.id)), this.header = this.capitalize(this.encoding[this.encoding.indexOf(t.target.id)]);
          }, capitalize: function (t) {
            return t.charAt(0).toUpperCase() + t.slice(1);
          }
        }, data: function () {
          return {activeEncoding: 2, header: "Hex"};
        }
      }), lt = ct, ht = (n("8de2"), Object(m["a"])(lt, rt, st, !1, null, null, null)), ut = ht.exports, dt = {
        props: {dataAnchor: String, encodingBtn: Boolean, encoding: Array, activeEncoding: Number, slide: Boolean},
        components: {EncodingButton: ut},
        computed: {
          id: function () {
            return this.slide ? "".concat(this.dataAnchor, "_slide") : "".concat(this.dataAnchor, "_section");
          }, type: function () {
            return this.slide ? "slide" : "section";
          }
        },
        methods: {
          rotateEncoding: function () {
            this.$emit("rotate-encoding");
          }, updateActiveEncoding: function (t) {
            this.$emit("update-active-encoding", t);
          }
        }
      }, gt = dt, pt = Object(m["a"])(gt, at, ot, !1, null, null, null), ft = pt.exports,
      bt = {mixins: [et, nt, it], components: {AddBlockButton: x, BlockCard: W, EncodingButton: ut, Page: ft}}, mt = bt,
      vt = (n("ce65"), Object(m["a"])(mt, u, d, !1, null, null, null)), xt = vt.exports, kt = function () {
        var t = this, e = t.$createElement, n = t._self._c || e;
        return n("div", {staticClass: "section"}, [n("Page", {
          attrs: {
            "data-anchor": "real_blocks",
            slide: "",
            "encoding-btn": "",
            "active-encoding": t.activeEncoding,
            encoding: t.encoding
          }, on: {"rotate-encoding": t.rotateEncoding, "update-active-encoding": t.updateActiveEncoding}
        }, [n("h1", [t._v("Historical Blocks")]), n("p", [t._v(" The 'data' in real Bitcoin blocks consists of the "), n("b", [t._v("Version")]), t._v(" of the software used to create the block, a recording of the target called "), n("b", [t._v("Bits")]), t._v(", and a record of the transactions in the block called a "), n("b", [t._v("Merkle Root")]), t._v(". For more information on each field "), n("a", {attrs: {href: "https://developer.bitcoin.org/reference/block_chain.html"}}, [t._v("here")]), t._v(". ")]), n("BlockCard", {
          attrs: {
            block: t.block,
            "hex-digits": 64,
            "local-encoding": t.encoding[t.activeEncoding],
            showBlockHeightInput: "",
            showReal: "",
            showNonce: ""
          }, on: {"update-block-height": t.updateBlockHeight, "update-block-height-latest": t.updateBlockHeightLatest}
        })], 1)], 1);
      }, wt = [], _t = n("c18a"), yt = n.n(_t), Ct = function () {
        function t() {
          Object(y["a"])(this, t);
          var e = yt()({hostname: "mempool.space"}), n = e.bitcoin.blocks;
          this.api = n;
        }

        return Object(C["a"])(t, [{
          key: "getBlockById", value: function () {
            var t = Object(_["a"])(regeneratorRuntime.mark((function t(e) {
              var n, i, a, o;
              return regeneratorRuntime.wrap((function (t) {
                while (1) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, this.api.getBlock({hash: e});
                  case 2:
                    return n = t.sent, i = n.previousblockhash || "".padStart(64, "0"), i = new F(BigInt("0x".concat(i)), 64), a = new K(n.bits, n.merkle_root, n.nonce, i, n.timestamp, n.version), o = new F(BigInt("0x".concat(n.id)), 64), t.abrupt("return", new U(o, a, n.height));
                  case 8:
                  case"end":
                    return t.stop();
                }
              }), t, this);
            })));

            function e(e) {
              return t.apply(this, arguments);
            }

            return e;
          }()
        }, {
          key: "getLatestBlockHash", value: function () {
            var t = Object(_["a"])(regeneratorRuntime.mark((function t() {
              return regeneratorRuntime.wrap((function (t) {
                while (1) switch (t.prev = t.next) {
                  case 0:
                    return t.abrupt("return", this.api.getBlocksTipHash());
                  case 1:
                  case"end":
                    return t.stop();
                }
              }), t, this);
            })));

            function e() {
              return t.apply(this, arguments);
            }

            return e;
          }()
        }, {
          key: "getBlockIdFromHeight", value: function () {
            var t = Object(_["a"])(regeneratorRuntime.mark((function t(e) {
              return regeneratorRuntime.wrap((function (t) {
                while (1) switch (t.prev = t.next) {
                  case 0:
                    return t.abrupt("return", this.api.getBlockHeight({height: e}));
                  case 1:
                  case"end":
                    return t.stop();
                }
              }), t, this);
            })));

            function e(e) {
              return t.apply(this, arguments);
            }

            return e;
          }()
        }]), t;
      }(), Bt = Ct, Et = {
        mixins: [nt, it], components: {BlockCard: W, EncodingButton: ut, Page: ft}, data: function () {
          return {block: new U("", K.genesis, 0), mempool: new Bt};
        }, mounted: function () {
          var t = this;
          return Object(_["a"])(regeneratorRuntime.mark((function e() {
            return regeneratorRuntime.wrap((function (e) {
              while (1) switch (e.prev = e.next) {
                case 0:
                  return e.next = 2, t.block.calcHash();
                case 2:
                case"end":
                  return e.stop();
              }
            }), e);
          })))();
        }, methods: {
          updateNonce: function (t) {
            var e = this;
            return Object(_["a"])(regeneratorRuntime.mark((function n() {
              return regeneratorRuntime.wrap((function (n) {
                while (1) switch (n.prev = n.next) {
                  case 0:
                    e.block.header.nonce = t;
                  case 1:
                  case"end":
                    return n.stop();
                }
              }), n);
            })))();
          }, updateBlockHeight: function (t) {
            var e = this;
            return Object(_["a"])(regeneratorRuntime.mark((function n() {
              var i;
              return regeneratorRuntime.wrap((function (n) {
                while (1) switch (n.prev = n.next) {
                  case 0:
                    return n.next = 2, e.mempool.getBlockIdFromHeight(t);
                  case 2:
                    return i = n.sent, n.next = 5, e.mempool.getBlockById(i);
                  case 5:
                    e.block = n.sent;
                  case 6:
                  case"end":
                    return n.stop();
                }
              }), n);
            })))();
          }, updateBlockHeightLatest: function () {
            var t = this;
            return Object(_["a"])(regeneratorRuntime.mark((function e() {
              var n;
              return regeneratorRuntime.wrap((function (e) {
                while (1) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, t.mempool.getLatestBlockHash();
                  case 2:
                    return n = e.sent, e.next = 5, t.mempool.getBlockById(n);
                  case 5:
                    return t.block = e.sent, e.next = 8, t.block.calcHash();
                  case 8:
                    t.blockHeightMax = t.block.height;
                  case 9:
                  case"end":
                    return e.stop();
                }
              }), e);
            })))();
          }
        }
      }, Tt = Et, St = Object(m["a"])(Tt, kt, wt, !1, null, null, null), Ht = St.exports, Mt = function () {
        var t = this, e = t.$createElement, n = t._self._c || e;
        return n("Page", {attrs: {"data-anchor": "intro"}}, [n("h1", {staticClass: "text-center"}, [t._v(" Bitcoin Timechain ")]), n("p", [t._v(" The goal of this demo is to show that Bitcoin is backed by not just it's massive computer network, but by time itself. ")]), n("p", [t._v(" Bitcoin mining is difficult not because it requires energy and computational power, but because it requires "), n("b", [t._v("time")]), t._v(". ")]), n("p", [t._v(" 'Mining' is the process of recording transactions on the Bitcoin network. A successful miner is rewarded with newly minted bitcoin as a reward for their time and effort. ")]), n("TableOfContents", {
          staticClass: "fade-in",
          attrs: {contents: t.contents}
        })], 1);
      }, Rt = [], At = function () {
        var t = this, e = t.$createElement, n = t._self._c || e;
        return n("b-card", {
          staticClass: "mt-4",
          attrs: {id: "table_of_contents", "no-body": ""}
        }, [n("b-card-header", [t._v(" Table of Contents: ")]), n("b-table-simple", {
          attrs: {
            hover: "",
            small: "",
            striped: ""
          }
        }, [n("b-tbody", [t._l(t.contents, (function (e) {
          return [n("b-tr", {
            key: e.anchor, attrs: {"data-menuanchor": e.anchor}, on: {
              click: function (n) {
                return t.moveTo(e.anchor, 0);
              }
            }
          }, [n("b-td", [n("a", {attrs: {href: "#" + e.anchor}}, [t._v(" " + t._s(e.label) + " ")])])], 1), e.slides ? t._l(e.slides, (function (i, a) {
            return n("b-tr", {
              key: i.anchor, attrs: {"data-menuanchor": i}, on: {
                click: function (n) {
                  return t.moveTo(e.anchor, a + 1);
                }
              }
            }, [n("b-td", [n("a", {
              staticClass: "ml-4",
              attrs: {href: "#" + i.anchor}
            }, [t._v(" " + t._s(i.label) + " ")])])], 1);
          })) : t._e()];
        }))], 2)], 1)], 1);
      }, Ot = [], zt = {props: {contents: {type: Array}}}, jt = zt,
      Pt = (n("4b5a"), Object(m["a"])(jt, At, Ot, !1, null, null, null)), It = Pt.exports,
      Nt = {props: {contents: {type: Array}}, components: {Page: ft, TableOfContents: It}}, Dt = Nt,
      Ft = Object(m["a"])(Dt, Mt, Rt, !1, null, null, null), Lt = Ft.exports, Ut = function () {
        var t = this, e = t.$createElement, n = t._self._c || e;
        return n("div", {staticClass: "section", attrs: {id: "pow_section"}}, [n("Page", {
          attrs: {
            "data-anchor": "pow",
            slide: ""
          }
        }, [n("h1", [t._v(" Mining / Proof-of-Work ")]), n("p", [t._v(" Mining is the process of adding new blocks to the blockchain. The name comes from the idea that if you search hard enough, you will be rewarded with 'digital gold' aka Bitcoin. ")]), n("p", [t._v(" Every time a miner successfully adds a block to the blockchain they are given a reward of newly minted bitcoin. The reward amount diminishes over time which is why Bitcoin has a "), n("a", {attrs: {href: "https://en.bitcoin.it/wiki/Controlled_supply"}}, [t._v("limited supply")]), t._v(". ")]), n("hr"), n("p", [t._v(" In the previous example of a blockchain, every block hash was considered valid. To make mining difficult, Bitcoin requires that a block hash will only be valid if it is interpreted as a number that is less than a pre-determined "), n("b", [t._v("target")]), t._v(". ")]), n("p", [t._v(" Because a hash of our demo block will likely not will not meet the new criteria, we will add one new field to the block called a "), n("b", [t._v("nonce")]), t._v(". ")]), n("b-card", [n("h4", {staticClass: "text-left"}, [t._v("nonce (n.)")]), n("hr"), t._v(" In phrase 'for the nonce' (Middle English for þe naness, c. 1200) \"for a special occasion, for a particular purpose\" "), n("hr"), t._v(" In cryptography it is said to be shorthand for "), n("br"), t._v("'A number used only once' ")]), n("p", [t._v(" If the hash of the (data & previous hash & nonce) is invalid, the hash will be discarded and we will try again with a new nonce. Because this will take many, many tries to find a valid hash, this system is called "), n("b", [t._v("Proof-of-Work")]), t._v(". ")]), n("b-card", {attrs: {"no-body": ""}}, [n("b-card-header", {attrs: {"header-bg-variant": "info"}}, [t._v(" Mining Algorithm ")]), n("b-card-body", [n("ol", [n("li", [t._v(" Pick a random "), n("b", [t._v("nonce")])]), n("li", [t._v(" Calculate "), n("b", [t._v("hash")]), t._v(": sha256d ( data + "), n("b", [t._v("nonce")]), t._v(" )")]), n("li", [t._v(" If "), n("b", [t._v("hash")]), t._v(" is less than "), n("b", [t._v("target:")]), n("ul", [n("li", [t._v(" The hash is considered valid and the block will be added to the blockchain! ")]), n("li", [t._v(" If not - go back to step 1 try again!")])])])])])], 1), n("b-card", [n("q", [t._v(" The network timestamps transactions by hashing them into an ongoing chain of hash-based proof-of-work, forming a record that cannot be changed without redoing the proof-of-work.")]), n("br"), t._v(" - "), n("a", {attrs: {href: "https://bitcoin.org/bitcoin.pdf"}}, [t._v("Satoshi Nakamoto")])])], 1), n("Page", {
          attrs: {
            "data-anchor": "target",
            slide: "",
            "encoding-btn": "",
            "active-encoding": t.activeEncoding,
            encoding: t.encoding
          }, on: {"rotate-encoding": t.rotateEncoding, "update-active-encoding": t.updateActiveEncoding}
        }, [n("h1", [t._v(" Target ")]), n("p", [t._v(" Because we are starting this demo by only looking at the first 2 digits of the hash of each block, the maximum value of a hash is 255 and the minimum value is 0. ")]), n("p", [t._v(" The target is a movable value somewhere between the min and max that will be the cutoff for an acceptable hash. "), n("b", [t._v("Try moving the target to see how the probabilities change.")])]), n("p", [t._v(" As the target goes down it becomes more difficult to find a winning hash. ")]), n("Target", {
          attrs: {
            avgHashes: t.avgHashes,
            denominator: t.denominator,
            "hash-max": t.hashMax,
            localEncoding: t.encoding[t.activeEncoding],
            numerator: t.numerator,
            probability: t.probability,
            target: t.target,
            targetMax: t.targetMax
          }, on: {updateTarget: t.updateTarget, "real-target-max": t.realTargetMax}
        })], 1), n("Page", {
          attrs: {
            "data-anchor": "pow_blockchain",
            slide: "",
            "encoding-btn": "",
            "active-encoding": t.activeEncoding,
            encoding: t.encoding
          }, on: {"rotate-encoding": t.rotateEncoding, "update-active-encoding": t.updateActiveEncoding}
        }, [n("h1", [t._v("Proof-of-work Blockchain")]), n("AddBlockButton", {
          attrs: {"disable-add-block-btn": t.disableAddBlockBtn},
          on: {"add-block": t.addBlock, "reset-blocks": t.resetBlocks}
        }), n("div", {staticClass: "text-center mt-4", attrs: {id: "blockchainPow"}}, t._l(this.blocks, (function (e, i) {
          return n("BlockCard", {
            key: i,
            attrs: {
              block: e,
              "hex-digits": t.hexDigits,
              index: i,
              "local-encoding": t.encoding[t.activeEncoding],
              showData: "",
              showNonce: ""
            },
            on: {"mine-this-block": t.mineThisBlock, "update-data": t.updateData}
          });
        })), 1)], 1), n("div", {
          staticClass: "slide",
          attrs: {"data-anchor": "pow_mining", id: "pow_mining_slide"}
        }, [n("div", {staticClass: "fp-bg"}), n("EncodingButton", {
          attrs: {
            "active-encoding": t.activeEncoding,
            encoding: t.encoding
          }, on: {"update-active-encoding": t.updateActiveEncoding, "rotate-encoding": t.rotateEncoding}
        }), n("Graph", {
          attrs: {
            id: "pow_canvas",
            guesses: this.guesses,
            target: this.target,
            "local-encoding": t.encoding[t.activeEncoding]
          }
        }), n("MiningControls", {
          attrs: {
            block: t.blocks[t.blockToMine],
            "hash-max": t.hashMax,
            index: t.blockToMine,
            "is-mining": t.isMining,
            "local-encoding": t.encoding[t.activeEncoding],
            target: t.target
          }, on: {"start-mining": t.startMining, "update-nonce": t.updateNonce}
        })], 1)], 1);
      }, Gt = [], $t = function () {
        var t = this, e = t.$createElement, n = t._self._c || e;
        return n("canvas", {attrs: {id: t.id}});
      }, qt = [], Wt = {
        props: {animate: Boolean, guesses: Array, id: String, localEncoding: String, target: F}, mounted: function () {
          this.screenHeight = document.documentElement.clientHeight, this.screenWidth = document.documentElement.clientWidth;
          var t = document.getElementById(this.id);
          if (t.height = this.screenHeight, t.width = this.screenWidth, t.style.backgroundColor = this.bgColor, this.ctx = t.getContext("2d"), this.ctx.globalCompositeOperation = "source-over", this.ctx.font = "16px Fira Code", this.xPad = .1 * this.screenWidth, this.yPad = .05 * this.screenHeight, this.width = this.screenWidth - 2 * this.xPad, this.height = this.screenHeight - 2 * this.yPad, this.zero = {
            x: this.screenWidth - this.xPad,
            y: this.screenHeight - this.yPad
          }, this.animate) return this.setTicks(16), this.calcGraph(), void this.drawGraph();
          this.drawGraph();
        }, data: function () {
          return {
            ctx: Object,
            bgColor: "rgba(0, 0, 0, 0.2)",
            lineColor: "white",
            textColor: "white",
            winningColor: "rgba(247, 148, 19, 1)",
            xPad: Number,
            yPad: Number,
            width: Number,
            height: Number,
            screenWidth: Number,
            screenHeight: Number,
            zero: Object,
            tickSpeed: 1 / 1280,
            ticks: []
          };
        }, methods: {
          setTicks: function (t) {
            for (var e = 1; e < t + 1; e += 1) this.ticks.push(t + e / t);
          }, clear: function () {
            this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
          }, drawXAxis: function () {
            var t = this.ctx.createLinearGradient(this.xPad, this.zero.y, this.zero.x, this.zero.y);
            t.addColorStop(0, this.bgColor), t.addColorStop(.5, "rgba(255, 255, 255, 0.2)"), t.addColorStop(1, this.bgColor), this.ctx.beginPath(), this.ctx.strokeStyle = t, this.ctx.moveTo(this.xPad, this.yPad), this.ctx.lineTo(this.zero.x, this.yPad), this.ctx.stroke(), this.ctx.closePath(), t = this.ctx.createLinearGradient(this.xPad, this.zero.y, this.zero.x, this.zero.y), t.addColorStop(0, this.bgColor), t.addColorStop(1, this.lineColor), this.ctx.beginPath(), this.ctx.strokeStyle = t, this.ctx.moveTo(this.xPad, this.zero.y), this.ctx.lineTo(this.zero.x, this.zero.y), this.ctx.stroke(), this.ctx.closePath();
          }, drawYAxis: function () {
            var t = this.ctx.createLinearGradient(this.zero.x, this.zero.y, this.zero.x, this.yPad);
            t.addColorStop(1, this.bgColor), t.addColorStop(0, "white"), this.ctx.beginPath(), this.ctx.strokeStyle = t, this.ctx.moveTo(this.zero.x, this.zero.y), this.ctx.lineTo(this.zero.x, this.zero.y - this.height), this.ctx.stroke(), this.ctx.closePath();
          }, drawTarget: function (t) {
            var e = this.zero.y - this.height * t, n = this.ctx.createLinearGradient(this.xPad, e, this.zero.x, e);
            n.addColorStop(0, this.bgColor), n.addColorStop(1, this.winningColor), this.ctx.beginPath(), this.ctx.strokeStyle = n, this.ctx.moveTo(this.xPad, e), this.ctx.lineTo(this.zero.x - 74, e), this.ctx.stroke(), this.ctx.closePath(), e < 20 && (this.ctx.beginPath(), this.ctx.strokeStyle = "transparent", this.ctx.moveTo(this.zero.x - 4, this.zero.y), this.ctx.lineTo(this.zero.x - 74, this.zero.y), this.ctx.stroke(), this.ctx.closePath()), this.ctx.font = "16px Fira Code", this.ctx.direction = "ltr", this.ctx.fillStyle = this.winningColor, this.ctx.fillText("Target", this.zero.x - 64, e + 6);
          }, calcTicks: function () {
            for (var t = 0; t < this.ticks.length; t += 1) this.ticks[t] += this.tickSpeed, this.ticks[t] %= 1;
          }, calcGuesses: function (t) {
            for (var e = 0; e < t.length; e += 1) t[e].xRatio += this.tickSpeed, t[e].xRatio > 3 && t.shift();
          }, drawTicks: function () {
            for (var t = 0; t < this.ticks.length; t += 1) {
              var e = this.ticks[t], n = this.width - this.width * e,
                i = this.ctx.createLinearGradient(this.zero.x, this.zero.y, this.zero.x, this.yPad);
              i.addColorStop(1, this.bgColor), i.addColorStop(0, "rgba(255, 255, 255, ".concat(.5 - e, ")")), this.ctx.beginPath(), this.ctx.strokeStyle = i, this.ctx.moveTo(this.xPad + n, this.zero.y), this.ctx.lineTo(this.xPad + n, this.zero.y - this.height), this.ctx.stroke(), this.ctx.closePath();
            }
          }, drawGuesses: function (t) {
            for (var e = 0; e < t.length; e += 1) {
              var n = t[e], i = e / t.length;
              i = i < .6 ? .6 : i, n.xRatio > .9 && (i -= 1 - n.xRatio), this.drawGuess(n.xRatio, n.yRatio, n.hash[this.localEncoding], i, n.isHashValid);
            }
          }, drawGuess: function (t, e, n) {
            var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1,
              a = arguments.length > 4 && void 0 !== arguments[4] && arguments[4], o = this.zero.x - this.width * t,
              r = this.zero.y - this.height * e;
            this.animate || (o -= 34, i = 1), this.ctx.direction = "ltr", this.ctx.fillStyle = a ? "rgba(247, 148, 19, ".concat(i, ")") : "rgba(255, 255, 255, ".concat(i, ")"), this.ctx.fillText(n, o, r + 4);
          }, drawEndCaps: function () {
            this.ctx.fillStyle = this.bgColor, this.ctx.fillRect(this.xPad + this.width, 0, 2 * this.xPad + this.width, this.height + 2 * this.yPad);
          }, calcGraph: function () {
            this.calcTicks(), this.calcGuesses(this.guesses), setTimeout(this.calcGraph, 25);
          }, drawGraph: function () {
            this.clear(), this.drawXAxis(), this.drawYAxis(), this.drawTarget(this.target.yRatio), this.drawGuesses(this.guesses), this.drawTicks(), window.requestAnimationFrame(this.drawGraph);
          }
        }
      }, Vt = Wt, Yt = Object(m["a"])(Vt, $t, qt, !1, null, null, null), Xt = Yt.exports, Kt = function () {
        var t = this, e = t.$createElement, n = t._self._c || e;
        return n("b-card", {
          staticClass: "overlay mining_controls",
          attrs: {"no-body": ""}
        }, [n("b-card-header", [t._v(" Mining for Block #" + t._s(t.block.height) + " ")]), n("b-list-group-item", {staticClass: "list-field"}, [t._v(" Max")]), n("b-list-group-item", {staticClass: "list-value"}, [t._v(" " + t._s(t.hashMax[t.localEncoding]) + " ")]), n("b-list-group-item", {
          staticClass: "list-field",
          staticStyle: {color: "#f79413"}
        }, [t._v(" Target")]), n("b-list-group-item", {
          staticClass: "list-value",
          staticStyle: {color: "#f79413"}
        }, [t._v(" " + t._s(t.target[t.localEncoding]) + " ")]), n("b-list-group-item", {staticClass: "list-field"}, [t._v(" Hash")]), n("b-list-group-item", {staticClass: "list-value"}, [t._v(t._s(t.block.hash[t.localEncoding]))]), n("b-list-group-item", {staticClass: "list-field"}, [t._v("Nonce")]), n("b-list-group-item", {staticClass: "list-value"}, [n("b-input-group", {attrs: {size: "sm"}}, [n("b-form-input", {
          attrs: {
            value: t.block.header.nonce,
            state: t.block.isHashValid,
            type: "number",
            min: 0,
            max: 4294967295,
            size: "sm"
          }, on: {change: t.onNonceChange}
        }), n("b-button-group", [n("b-button", {
          staticStyle: {
            "border-top-left-radius": "0",
            "border-bottom-left-radius": "0"
          }, attrs: {size: "sm", disabled: t.block.isHashValid}, on: {click: t.onIncrementNonce}
        }, [t._v(" +1 ")])], 1)], 1), n("b-form-checkbox", {
          attrs: {
            switch: "",
            checked: t.isMining,
            size: "lg",
            disabled: t.block.isHashValid
          }, on: {change: t.onStartMining}
        }, [t._v(" Go Brrr ")])], 1)], 1);
      }, Zt = [], Qt = {
        props: {block: U, hashMax: F, index: Number, isMining: Boolean, localEncoding: String, target: F},
        methods: {
          onStartMining: function () {
            this.$emit("start-mining", this.index);
          }, onNonceChange: function (t) {
            this.$emit("update-nonce", Number(t), this.index);
          }, onIncrementNonce: function () {
            this.$emit("update-nonce", this.block.header.nonce + 1, this.index);
          }
        }
      }, Jt = Qt, te = (n("15bc"), Object(m["a"])(Jt, Kt, Zt, !1, null, null, null)), ee = te.exports, ne = function () {
        var t = this, e = t.$createElement, n = t._self._c || e;
        return n("b-card", {
          staticClass: "target",
          attrs: {"no-body": ""}
        }, [n("b-card-header", {attrs: {"header-bg-variant": "info"}}, [n("b-icon-wrench"), t._v(" Target ")], 1), n("b-list-group-item", {
          staticClass: "list-value pt-2",
          staticStyle: {direction: "rtl"}
        }, [t._v(" " + t._s(t.target[t.localEncoding]) + " ")]), n("b-input-group", {
          staticStyle: {"border-radius": "0"},
          attrs: {prepend: "Min 1", size: "sm", append: "Max"}
        }, [n("b-form-input", {
          attrs: {
            title: t.target[t.localEncoding],
            value: t.target.num,
            type: "range",
            min: "1",
            max: t.hashMax.num,
            size: "sm"
          }, on: {change: t.onTargetChange}
        })], 1), n("b-list-group-item", {staticClass: "list-field"}, [t._v("Max")]), n("b-list-group-item", {
          staticClass: "list-value",
          staticStyle: {direction: "rtl"}
        }, [t._v(t._s(this.hashMax[t.localEncoding]) + " ")]), n("b-list-group-item", {staticClass: "list-field"}, [t._v(" Probability (Only of x% of possible hashes will be accepted). ")]), n("b-list-group-item", {staticClass: "list-value"}, [t._v(" ~" + t._s(t.getProbability) + "% ")]), n("b-list-group-item", {staticClass: "list-field"}, [t._v("Odds")]), n("b-list-group-item", {staticClass: "list-value"}, [t._v(" " + t._s(t.getNumerator) + " out of " + t._s(t.getDenominator) + " ")]), n("b-list-group-item", {staticClass: "list-field"}, [t._v("Average number of tries")]), n("b-list-group-item", {staticClass: "list-value"}, [t._v(" ~" + t._s(t.avgHashes.toFixed(0)) + " ")])], 1);
      }, ie = [], ae = (n("b680"), {
        props: {
          avgHashes: null,
          denominator: null,
          localEncoding: String,
          numerator: null,
          probability: null,
          target: F,
          targetMax: F,
          hashMax: F
        }, computed: {
          getProbability: function () {
            var t = 100 * this.probability;
            if (t < 1) {
              var e = t.toExponential(), n = e.substr(e.indexOf("e") + 2, e.length);
              return t.toFixed(Number(n));
            }
            return t.toFixed(2);
          }, getNumerator: function () {
            return this.numerator > 1000000n ? Number(this.numerator).toExponential(2) : this.numerator.toLocaleString("en-US");
          }, getDenominator: function () {
            return this.denominator > 1000000n ? Number(this.denominator).toExponential(2) : this.denominator.toLocaleString("en-US");
          }
        }, methods: {
          onTargetChange: function (t) {
            this.$emit("updateTarget", new F(BigInt(Number(t)), this.hexDigits));
          }
        }
      }), oe = ae, re = (n("0379"), Object(m["a"])(oe, ne, ie, !1, null, null, null)), se = re.exports, ce = {
        mixins: [et, nt, it],
        components: {
          AddBlockButton: x,
          BlockCard: W,
          EncodingButton: ut,
          Graph: Xt,
          MiningControls: ee,
          Page: ft,
          Target: se
        },
        data: function () {
          return {activeEncoding: 1, blockToMine: 0, guesses: [], isMining: !1};
        }
      }, le = ce, he = (n("1680"), Object(m["a"])(le, Ut, Gt, !1, null, null, null)), ue = he.exports, de = function () {
        var t = this, e = t.$createElement, n = t._self._c || e;
        return n("Page", {attrs: {"data-anchor": "resources"}}, [n("h1", [t._v("Resources")]), t._v(" This tool was made possible by the inspiration and insight of the following resources: "), n("div", [t._v(" For technical understanding: "), n("ul", [n("li", [n("a", {
          attrs: {
            href: "https://LearnMeABitcoin.com",
            target: "_blank"
          }
        }, [t._v("LearnMeABitcoin.com")])]), n("li", [n("a", {attrs: {href: "https://aantonop.com/books/"}}, [t._v("Mastering Bitcoin")])])])]), n("div", [t._v(" For UX inspiration: "), n("ul", [n("li", [n("a", {
          attrs: {
            href: "https://BlockchainDemo.io",
            target: "_blank"
          }
        }, [t._v("BlockchainDemo.io")])])])]), n("div", [t._v(" For philosophical insight: "), n("ul", [n("li", [n("a", {
          attrs: {
            href: "https://dergigi.com/2021/01/14/bitcoin-is-time",
            target: "_blank"
          }
        }, [t._v("Bitcoin is Time")])])])]), t._v(" Site by "), n("a", {
          attrs: {
            href: "https://nilsloewen.com",
            target: "_blank"
          }
        }, [t._v("Nils Loewen")])]);
      }, ge = [], pe = {components: {Page: ft}}, fe = pe, be = Object(m["a"])(fe, de, ge, !1, null, null, null),
      me = be.exports, ve = function () {
        var t = this, e = t.$createElement, n = t._self._c || e;
        return n("div", {staticClass: "section", attrs: {id: "terms_section"}}, [n("Page", {
          attrs: {
            slide: "",
            "data-anchor": "terms"
          }
        }, [n("h1", [t._v("Terms")]), n("p", [t._v(" Before we begin, a few key concepts must first be understood. ")]), n("p", [t._v(" Due to the technical nature of Bitcoin, there are some aspects of the system that look like gibberish to humans. The following pages will show that while this gibberish is not very human-readable, it is not non-sense. ")]), n("p", [n("b", [t._v("Hash functions")]), t._v(" are the backbone to the blockchain and to mining. The output of these functions are represented with "), n("b", [t._v("Hexadecimal Notation")]), t._v(". ")])]), n("HexNotationSlide"), n("HashFunctionsSlide"), n("Sha256Slide")], 1);
      }, xe = [], ke = function () {
        var t = this, e = t.$createElement, n = t._self._c || e;
        return n("Page", {
          attrs: {
            slide: "",
            "data-anchor": "hash_functions"
          }
        }, [n("h1", [t._v("Hash Function")]), n("b-card", [n("h4", [n("a", {attrs: {href: "https://www.etymonline.com/word/hash"}}, [t._v("hash (v.)")])]), n("hr"), t._v(' 1650s, "to hack, chop into small pieces," from French hacher "chop up" (14c.), from Old French hache "ax" (see hatchet). ')]), n("p", [t._v(" In computer science, a hash is the output of a function that yields a short, unique output for each unique input of any length. In the process the input data is scrambled and mixed around, 'hashed' if you will, to derive the output. ")]), n("p", [t._v(" A hash can sometimes be misunderstood as a compression or encryption. However both compression and encryption are meant to be reversible; you can decompress a file back to its original size and you can decrypt a message back to its original meaning. ")]), n("p", [t._v(" A hash is called a 'one-way function' because the input data can never be recovered from the output data. You cannot un-hash a hash. ")]), n("p", [t._v(" In mining a hash is used in two ways: ")]), n("ol", [n("li", [t._v(" To identify sets of transactions, called blocks. Because each block is different, each one has unique hash. ")]), n("li", [t._v(" To make mining difficult; it takes time and work to compute a hash - especially if not all hashes are considered valid... ")])])], 1);
      }, we = [], _e = {components: {Page: ft}}, ye = _e, Ce = Object(m["a"])(ye, ke, we, !1, null, null, null),
      Be = Ce.exports, Ee = function () {
        var t = this, e = t.$createElement, n = t._self._c || e;
        return n("Page", {
          attrs: {
            slide: "",
            "data-anchor": "hexadecimal_notation",
            "encoding-btn": "",
            "active-encoding": t.activeEncoding,
            encoding: t.encoding
          }, on: {"rotate-encoding": t.rotateEncoding, "update-active-encoding": t.updateActiveEncoding}
        }, [n("h1", [t._v("Numerical Notation")]), n("p", [t._v(" In the top right corner there is a button to change the notation of some numbers in this demo. ")]), n("p", [t._v(" For example, Bitcoin's maximum supply is: "), n("br"), t._v(" " + t._s(t.num[t.encoding[t.activeEncoding]]) + ". ")]), n("p", [t._v(" Notation styles are chosen for different use cases. While computers think in 1's and 0's, binary notation is not easy for humans to read. While decimal notation is easy to read, it is not the most compact way to store values. ")]), n("p", [t._v(" The hash function about to be discussed uses hexadecimal notation as a compact and (more) human readable way to represent the binary hash output. ")]), n("b-card", [n("h4", {staticClass: "text-left"}, [n("a", {attrs: {href: "https://www.etymonline.com/word/hexadecimal"}}, [t._v("hexadecimal (adj.)")])]), n("hr"), t._v(' 1952, in reference to a numeral system based on 16, not 10; from hexa- + decimal. From 1970 as a noun. Greek hexa-, combining form of hex "six". ')]), n("p", [t._v(" As you can see in the following table these values are equivalent yet notated differently. ")]), n("b-row", [n("b-col", {staticClass: "hex_col"}, [n("b-card", {
          attrs: {
            id: "hex_table",
            "no-body": ""
          }
        }, [n("b-table-simple", {
          staticClass: "border-1",
          attrs: {small: ""}
        }, [n("b-thead", {attrs: {"head-variant": "dark"}}, [n("b-tr", [n("b-th", [t._v("Decimal")]), n("b-th", [t._v("Binary")]), n("b-th", [t._v("Hexadecimal")])], 1)], 1), n("b-tbody", t._l(t.rows, (function (e, i) {
          return n("b-tr", {key: i}, [n("b-td", [t._v(t._s(e["d"]))]), n("b-td", [t._v(t._s(e["b"]))]), n("b-td", [t._v(t._s(e["h"]))])], 1);
        })), 1)], 1)], 1)], 1), n("b-col", {staticClass: "hex_col"}, [n("b-card", {
          attrs: {
            "no-body": "",
            id: "hex_converter"
          }
        }, [n("b-card-header", {attrs: {"header-bg-variant": "info"}}, [n("b-icon-wrench"), t._v(" Notation "), n("b-icon-arrow-left-right"), t._v(" Converter ")], 1), n("b-list-group-item", {staticClass: "list-field"}, [t._v("Hexadecimal (base 16)")]), n("b-list-group-item", {staticClass: "list-value"}, [n("b-form-input", {
          attrs: {value: Number(t.val).toString(16)},
          on: {keyup: t.onHex}
        })], 1), n("b-list-group-item", {staticClass: "list-field"}, [t._v("Decimal (base 10)")]), n("b-list-group-item", {staticClass: "list-value"}, [n("b-form-input", {
          attrs: {type: "number"},
          model: {
            value: t.val, callback: function (e) {
              t.val = e;
            }, expression: "val"
          }
        })], 1), n("b-list-group-item", {staticClass: "list-field"}, [t._v("Exponential")]), n("b-list-group-item", {staticClass: "list-value"}, [t._v(t._s(Number(t.val).toExponential()))]), n("b-list-group-item", {staticClass: "list-field"}, [t._v("Binary (base 2)")]), n("b-list-group-item", {staticClass: "list-value"}, [n("b-form-input", {
          attrs: {value: Number(t.val).toString(2)},
          on: {keyup: t.onBin}
        })], 1)], 1)], 1)], 1)], 1);
      }, Te = [], Se = (n("5319"), {
        mixins: [nt], components: {EncodingButton: ut, Page: ft}, data: function () {
          return {
            val: 48879,
            num: new F(21000000n, 7),
            columns: ["Decimal", "Binary", "Hexadecimal"],
            rows: [{d: 15, b: "1111", h: "f"}, {d: 14, b: "1110", h: "e"}, {d: 13, b: "1101", h: "d"}, {
              d: 12,
              b: "1100",
              h: "c"
            }, {d: 11, b: "1011", h: "b"}, {d: 10, b: "1010", h: "a"}, {d: 9, b: "1001", h: "9"}, {
              d: 8,
              b: "1000",
              h: "8"
            }, {d: 7, b: "0111", h: "7"}, {d: 6, b: "0110", h: "6"}, {d: 5, b: "0101", h: "5"}, {
              d: 4,
              b: "0100",
              h: "4"
            }, {d: 3, b: "0011", h: "3"}, {d: 2, b: "0010", h: "2"}, {d: 1, b: "0001", h: "1"}, {d: 0, b: "0000", h: "0"}]
          };
        }, methods: {
          onHex: function (t) {
            var e = t.target.value;
            e = e.replace(/[^a-fA-F0-9]/g, ""), 0 === e.length && (e = 0), this.val = parseInt(e, 16);
          }, onBin: function (t) {
            var e = t.target.value;
            e = e.replace(/[^01]/g, ""), 0 === e.length && (e = 0), this.val = parseInt(e, 2);
          }
        }
      }), He = Se, Me = (n("b391"), Object(m["a"])(He, Ee, Te, !1, null, null, null)), Re = Me.exports, Ae = function () {
        var t = this, e = t.$createElement, n = t._self._c || e;
        return n("Page", {
          attrs: {
            slide: "",
            "data-anchor": "sha256",
            "encoding-btn": "",
            "active-encoding": t.activeEncoding,
            encoding: t.encoding
          }, on: {"rotate-encoding": t.rotateEncoding, "update-active-encoding": t.updateActiveEncoding}
        }, [n("h1", [t._v("SHA-256")]), n("p", [t._v(" Bitcoin mining uses a particular hash function called SHA-256, which means "), n("a", {attrs: {href: "https://en.wikipedia.org/wiki/Secure_Hash_Algorithms"}}, [t._v(" Secure Hash Algorithm")]), t._v(" with an output length of 256 bits. The output is usually encoded in hexadecimal notation as a string of 64 characters. ")]), n("p", [t._v(" An output of 256 bits means there are 2"), n("sup", [t._v("256")]), t._v("-1 possible output values. If interpreted as a number, the maximum value of a hash is also the number of possible values. ")]), n("b-card", {attrs: {"no-body": ""}}, [n("b-list-group-item", {staticClass: "list-field"}, [t._v("Max value")]), n("b-list-group-item", {staticClass: "list-value"}, [t._v(" " + t._s(t.hashMax[t.encoding[t.activeEncoding]]) + " ")])], 1), n("p", [t._v(" For some context, it is estimated that there are 10"), n("sup", [t._v("78")]), t._v(" to 10"), n("sup", [t._v("82")]), t._v(" "), n("a", {attrs: {href: "https://www.liverpoolmuseums.org.uk/stories/which-greater-number-of-atoms-universe-or-number-of-chess-moves"}}, [t._v("atoms in the observable universe")]), t._v(". ")]), n("b-card", {
          staticClass: "mt-4",
          attrs: {"no-body": ""}
        }, [n("b-card-header", {attrs: {"header-bg-variant": "info"}}, [n("span", {staticClass: "float-left"}, [n("b-icon-wrench"), t._v(" SHA-256 Calculator")], 1), n("b-icon-info-circle", {
          directives: [{
            name: "b-toggle",
            rawName: "v-b-toggle.collapse_note",
            modifiers: {collapse_note: !0}
          }], staticClass: "float-right"
        })], 1), n("b-collapse", {attrs: {id: "collapse_note"}}, [n("b-card-body", {staticClass: "border-bottom pb-0"}, [t._v(" In this demo all hashes are calculated as double SHA-256 or sha256d, exactly as bitcoin-core does it. "), n("p", [t._v("swapEndian( sha256( sha256( data ) ) )")])])], 1), n("b-list-group-item", {staticClass: "list-field"}, [t._v("Input")]), n("b-list-group-item", {staticClass: "list-value"}, [n("b-input-group", {
          attrs: {
            prepend: "Data",
            size: "sm"
          }
        }, [n("b-form-input", {
          attrs: {value: t.data, size: "sm"},
          on: {keyup: t.updateHash}
        })], 1)], 1), n("b-list-group-item", {staticClass: "list-field"}, [t._v("Output Hash")]), n("b-list-group-item", {staticClass: "list-value"}, [t._v(t._s(t.hash[t.encoding[t.activeEncoding]]))])], 1), n("p", [t._v(" For more details of how SHA-256 works watch this utter maniac calculate round 1/64 of SHA-256 BY HAND! ")]), n("div", {
          staticStyle: {
            width: "350px",
            "margin-right": "auto",
            "margin-left": "auto"
          }
        }, [n("b-card", {attrs: {"no-body": ""}}, [n("iframe", {
          attrs: {
            width: "auto",
            height: "197px",
            src: "https://www.youtube.com/embed/y3dqhixzGVo",
            title: "YouTube video player",
            frameborder: "0",
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            allowfullscreen: ""
          }
        })])], 1)], 1);
      }, Oe = [], ze = {
        mixins: [nt], components: {Page: ft}, data: function () {
          return {
            data: "Try changing this data...",
            hash: {hexadecimal: "60759d1ab05baf2c79e281d8fbff268f559328dc45bd46b12114bbbe40197271"},
            hashMax: new F(BigInt("0x".concat("".padEnd(64, "f"))), 64)
          };
        }, mounted: function () {
          var t = this;
          return Object(_["a"])(regeneratorRuntime.mark((function e() {
            var n;
            return regeneratorRuntime.wrap((function (e) {
              while (1) switch (e.prev = e.next) {
                case 0:
                  return e.next = 2, A(t.data);
                case 2:
                  n = e.sent, t.hash = new F(BigInt("0x".concat(n)), 64);
                case 4:
                case"end":
                  return e.stop();
              }
            }), e);
          })))();
        }, methods: {
          updateHash: function (t) {
            var e = this;
            return Object(_["a"])(regeneratorRuntime.mark((function n() {
              var i;
              return regeneratorRuntime.wrap((function (n) {
                while (1) switch (n.prev = n.next) {
                  case 0:
                    return e.data = t.target.value, n.next = 3, A(e.data);
                  case 3:
                    i = n.sent, e.hash = new F(BigInt("0x".concat(i)));
                  case 5:
                  case"end":
                    return n.stop();
                }
              }), n);
            })))();
          }
        }
      }, je = ze, Pe = Object(m["a"])(je, Ae, Oe, !1, null, null, null), Ie = Pe.exports,
      Ne = {components: {HashFunctionsSlide: Be, HexNotationSlide: Re, Page: ft, Sha256Slide: Ie}}, De = Ne,
      Fe = (n("1af4"), Object(m["a"])(De, ve, xe, !1, null, null, null)), Le = Fe.exports, Ue = function () {
        var t = this, e = t.$createElement, n = t._self._c || e;
        return n("div", {
          staticClass: "section",
          attrs: {id: "timechain_section"}
        }, [n("Page", {
          attrs: {
            "data-anchor": "timechain",
            slide: ""
          }
        }, [n("h1", [t._v("Timechain")]), n("b-card", [n("q", [t._v("The only way to find a valid proof-of-work is by making a lot of guesses, and making a single guess takes a little bit of time. The probabilistic sum of these guesses is what builds up the timechain that is Bitcoin.")]), t._v(" - "), n("a", {
          attrs: {
            href: "https://dergigi.com/2021/01/14/bitcoin-is-time/",
            target: "_blank"
          }
        }, [t._v("DerGigi")])]), n("p", [t._v(" We've shown that by adjusting the target it becomes more difficult to find a valid hash. More tries requires more "), n("b", [t._v("time")]), t._v(". ")]), n("p", [t._v(" Remember, if a miner finds a valid hash they are rewarded with btc, so the incentive is to mine as many blocks as possible to increase their profits. Not only are their miners running 24/7, to increase their chance of success they find ways to increase their computing power. ")]), n("p", [t._v(" This leads to a global arms race as Bitcoin mining is a competition that is open to anyone, anywhere. As each miner upgrades their hardware to increase their mining capacity, every other miner must do the same to keep up or else the probability of their success diminishes. ")]), n("p", [t._v(" The longest chain is considered to be the truth because the most work went into calculating it. If miners could find more blocks per minute than other, the could create the longest chain and then control the ledger. ")]), n("p", [t._v(" To prevent this, the Bitcoin network self-adjusts the target required for each block to ensure that blocks are always added to the chain at 10 minute intervals. ")]), n("b-card", [n("h4", [t._v("Timechain")]), n("hr"), t._v(" A blockchain that grows at a fixed interval, regardless of computing power. ")])], 1), n("Page", {
          attrs: {
            "data-anchor": "difficulty_adjustment",
            slide: "",
            "encoding-btn": "",
            "active-encoding": t.activeEncoding,
            encoding: t.encoding
          }, on: {"rotate-encoding": t.rotateEncoding, "update-active-encoding": t.updateActiveEncoding}
        }, [n("h1", [t._v("Difficulty Adjustment")]), n("p", [t._v(" Mining capacity is rated by how many hashes a miner can find per second, this is known as the "), n("b", [t._v("hashrate")]), t._v(" or H/s (hashes per second). ")]), n("p", [t._v(" This is the Crème de la crème, cherry-on-top engineering marvel of Bitcoin. ")]), n("b-card", [n("q", [t._v("To compensate for increasing hardware speed and varying interest in running nodes over time, the proof-of-work difficulty is determined by a moving average targeting an average number of blocks per hour. If they're generated too fast, the difficulty increases.")]), n("br"), t._v(" - "), n("a", {
          attrs: {
            href: "https://bitcoin.org/bitcoin.pdf",
            target: "_blank"
          }
        }, [t._v("Satoshi Nakamoto")]), n("hr"), n("q", [t._v("In other words, the difficulty-adjustment is about keeping a constant time, not a constant level of security, difficulty, or energy expenditure.")]), n("br"), t._v(" - "), n("a", {
          attrs: {
            href: "https://dergigi.com/2021/01/14/bitcoin-is-time/",
            target: "_blank"
          }
        }, [t._v("DerGigi")])]), n("p", [t._v(" For this demo ")]), n("b-card", {attrs: {"no-body": ""}}, [n("b-card-header", {attrs: {"header-bg-variant": "info"}}, [n("b-icon-wrench"), t._v(" Difficulty ")], 1), n("b-card-body", {staticClass: "text-center"}, [n("b-button", {
          attrs: {size: "sm"},
          on: {click: t.calibrateHps}
        }, [t._v(" This Device ")]), n("p", [n("b-input-group", {
          attrs: {
            id: "hashrate_picker",
            size: "sm",
            append: "H/s"
          }
        }, [n("b-form-input", {
          staticStyle: {"text-align": "right"},
          attrs: {id: "hashrate_input", type: "number", size: "sm", step: "1", value: t.hashrate.toFixed(0), min: 1},
          on: {change: t.updateHashrate}
        }), n("b-form-select", {
          attrs: {
            id: "hashrate_units_select",
            size: "sm",
            value: t.hashrateUnit,
            options: t.hashrateUnits
          }, on: {change: t.updateHashrateUnit}
        })], 1), t._v(" " + t._s(t.getHashrate)), n("sub", [t._v("H/s")])], 1), n("p", [t._v(" Block Time: (Average time to find valid block) ")]), n("b-input-group", {attrs: {id: "time_picker"}}, [n("b-form-input", {
          staticStyle: {"text-align": "right"},
          attrs: {id: "time_input", type: "number", size: "sm", value: t.blockTime, min: 1},
          on: {change: t.updateTime}
        }), n("b-form-select", {
          attrs: {
            id: "time_units_select",
            size: "sm",
            value: t.blockTimeUnit,
            options: t.timeUnits
          }, on: {change: t.updateTimeUnit}
        })], 1)], 1)], 1), n("Target", {
          attrs: {
            avgHashes: t.avgHashes,
            denominator: t.denominator,
            "hash-max": t.hashMax,
            localEncoding: t.encoding[t.activeEncoding],
            numerator: t.numerator,
            probability: t.probability,
            target: t.target,
            targetMax: t.targetMax
          }, on: {updateTarget: t.updateTimechainTarget, "real-target-max": t.realTargetMax}
        })], 1), n("Page", {
          attrs: {
            "data-anchor": "timechain_blocks",
            slide: "",
            "encoding-btn": "",
            "active-encoding": t.activeEncoding,
            encoding: t.encoding
          }, on: {"rotate-encoding": t.rotateEncoding, "update-active-encoding": t.updateActiveEncoding}
        }, [n("AddBlockButton", {
          attrs: {"disable-add-block-btn": t.disableAddBlockBtn},
          on: {"add-block": t.addBlock, "reset-blocks": t.resetBlocks}
        }), n("div", {staticClass: "blockchain_wrapper"}, t._l(this.blocks, (function (e, i) {
          return n("BlockCard", {
            key: i,
            attrs: {
              block: e,
              "hex-digits": t.hexDigits,
              index: i,
              "local-encoding": t.encoding[t.activeEncoding],
              showData: "",
              showNonce: ""
            },
            on: {"mine-this-block": t.mineThisBlock, "update-data": t.updateData}
          });
        })), 1)], 1), n("div", {
          staticClass: "slide",
          attrs: {"data-anchor": "timechain_mining", id: "timechain_mining_slide"}
        }, [n("div", {staticClass: "fp-bg"}), n("EncodingButton", {
          attrs: {
            "active-encoding": t.activeEncoding,
            encoding: t.encoding
          }, on: {"update-active-encoding": t.updateActiveEncoding, "rotate-encoding": t.rotateEncoding}
        }), n("Graph", {
          attrs: {
            id: "timechain_canvas",
            animate: "",
            guesses: this.guesses,
            target: this.target,
            "local-encoding": t.encoding[t.activeEncoding]
          }
        }), n("MiningControls", {
          attrs: {
            block: t.blocks[t.blockToMine],
            "hash-max": t.hashMax,
            index: t.blockToMine,
            "is-mining": t.isMining,
            "local-encoding": t.encoding[t.activeEncoding],
            target: t.target
          }, on: {"start-mining": t.startMining, "update-nonce": t.updateNonce}
        })], 1)], 1);
      }, Ge = [], $e = function () {
        function t() {
          Object(y["a"])(this, t);
        }

        return Object(C["a"])(t, null, [{
          key: "getHashRate", value: function () {
            var t = Object(_["a"])(regeneratorRuntime.mark((function t() {
              var e, n;
              return regeneratorRuntime.wrap((function (t) {
                while (1) switch (t.prev = t.next) {
                  case 0:
                    return t.next = 2, fetch("https://blockchain.info/q/hashrate");
                  case 2:
                    return e = t.sent, t.next = 5, e.text();
                  case 5:
                    return n = t.sent, t.abrupt("return", Number(n));
                  case 7:
                  case"end":
                    return t.stop();
                }
              }), t);
            })));

            function e() {
              return t.apply(this, arguments);
            }

            return e;
          }()
        }]), t;
      }(), qe = $e, We = {
        mixins: [et, nt, it],
        components: {
          AddBlockButton: x,
          BlockCard: W,
          EncodingButton: ut,
          Graph: Xt,
          MiningControls: ee,
          Page: ft,
          Target: se
        },
        data: function () {
          return {
            blockToMine: 0,
            activeEncoding: 1,
            hexDigits: 2,
            hashrate: 42,
            hashrateUnit: "base",
            hashrateUnits: ["", "Kilo", "Mega", "Giga", "Tera", "Peta", "Exa", "Zeta", "Yotta"],
            hashrateConversion: {
              base: {other: "", value: 1},
              Kilo: {other: "Thousand", value: 1e3},
              Mega: {other: "Million", value: 1e6},
              Giga: {other: "Billion", value: 1e9},
              Tera: {other: "Trillion", value: 1e12},
              Peta: {other: "Quadrillion", value: 1e15},
              Exa: {other: "Quintillion", value: 1e18},
              Zeta: {other: "Sextillion", value: 1e21},
              Yotta: {other: "Septillion", value: 1e24}
            },
            isMining: !1,
            blockTime: 15,
            blockTimeUnit: "Seconds",
            timeUnits: ["Seconds", "Minutes", "Hours", "Days", "Weeks", "Months", "Years"],
            isAdjustingTarget: !1
          };
        },
        computed: {
          getHashrate: function () {
            var t = this.hashrate * this.hashrateConversion[this.hashrateUnit].value;
            return t.toLocaleString();
          }
        },
        mounted: function () {
          return Object(_["a"])(regeneratorRuntime.mark((function t() {
            return regeneratorRuntime.wrap((function (t) {
              while (1) switch (t.prev = t.next) {
                case 0:
                case"end":
                  return t.stop();
              }
            }), t);
          })))();
        },
        methods: {
          onAntminer: function () {
            this.hashrate = 104, this.hashrateUnit = "Tera", this.calcTarget();
          }, onGlobal: function () {
            var t = this;
            return Object(_["a"])(regeneratorRuntime.mark((function e() {
              var n;
              return regeneratorRuntime.wrap((function (e) {
                while (1) switch (e.prev = e.next) {
                  case 0:
                    return e.next = 2, qe.getHashRate();
                  case 2:
                    n = e.sent, t.setHashrate(n * t.hashrateConversion.Giga.value), t.calcTarget();
                  case 5:
                  case"end":
                    return e.stop();
                }
              }), e);
            })))();
          }, setHashrate: function (t) {
            for (var e = 0, n = ["Yotta", "Zeta", "Exa", "Peta", "Tera", "Giga", "Mega", "Kilo", "base"]; e < n.length; e++) {
              var i = n[e];
              if (t > this.hashrateConversion[i].value) return this.hashrate = t / this.hashrateConversion[i].value, void (this.hashrateUnit = i);
            }
          }, onNonceChange: function (t) {
            this.blocks[this.blockToMine].header.nonce = Number(t), this.finalizeBlock(this.blockToMine);
          }, updateHashrate: function (t) {
            this.hashrate = Number(t || 1), this.calcTarget();
          }, updateHashrateUnit: function (t) {
            this.hashrateUnit = t || "base", this.calcTarget();
          }, updateTime: function (t) {
            this.blockTime = Number(t), this.calcTarget();
          }, updateTimeUnit: function (t) {
            this.blockTimeUnit = t, this.calcTarget();
          }, calcTarget: function () {
            var t = this.hashrate * this.hashrateConversion[this.hashrateUnit].value,
              e = this.timeToSeconds(this.blockTime, this.blockTimeUnit), n = e * t, i = this.findTargetAndMax(n),
              a = i.hexDigits, o = i.target;
            this.updateHexDigits(a), this.target = new F(BigInt(o), this.hexDigits), this.calcStats();
          }, findTargetAndMax: function (t) {
            var e = 1;
            while (e <= 64) {
              e += 1;
              var n = Math.pow(16, e) - 1, i = n, a = 1 / (i / n);
              while (i > 1) if (i = Math.floor(i / 2), a = 1 / (i / n), t < a) while (i < n) if (i += 1, a = 1 / (i / n), a < t) return {
                hexDigits: e,
                target: Math.floor(i)
              };
            }
          }, timeToSeconds: function (t, e) {
            switch (e) {
              case"Seconds":
                return t;
              case"Minutes":
                return 60 * t;
              case"Hours":
                return 60 * t * 60;
              case"Days":
                return 60 * t * 60 * 24;
              case"Weeks":
                return 60 * t * 60 * 24 * 7;
              case"Months":
                return 60 * t * 60 * 24 * 30;
              case"Years":
                return 60 * t * 60 * 24 * 365;
            }
          }, secondsToTime: function (t) {
            var e = 60;
            if (t < e) return {val: t, unit: "Seconds"};
            var n = 60 * e;
            if (t < n) return {val: Math.floor(t / e), unit: "Minutes"};
            var i = 24 * n;
            if (t < i) return {val: Math.floor(t / n), unit: "Minutes"};
            var a = 7 * i;
            if (t < a) return {val: Math.floor(t / i), unit: "Days"};
            var o = 30 * i;
            if (t < o) return {val: Math.floor(t / a), unit: "Weeks"};
            var r = 365 * i;
            if (t < r) return {val: Math.floor(t / o), unit: "Months"};
            var s = Math.floor(t / r);
            return s < 1e9 ? {val: s.toLocaleString("en-US"), unit: "Years"} : {val: s.toExponential(2), unit: "Years"};
          }, updateTimechainTarget: function (t) {
            var e = this;
            return Object(_["a"])(regeneratorRuntime.mark((function n() {
              var i, a, o, r, s;
              return regeneratorRuntime.wrap((function (n) {
                while (1) switch (n.prev = n.next) {
                  case 0:
                    return n.next = 2, e.updateTarget(t);
                  case 2:
                    i = e.hashrate * e.hashrateConversion[e.hashrateUnit].value, a = Math.ceil(1 / i * e.avgHashes), o = e.secondsToTime(a), r = o.val, s = o.unit, e.blockTime = r, e.blockTimeUnit = s;
                  case 7:
                  case"end":
                    return n.stop();
                }
              }), n);
            })))();
          }, calibrateHps: function () {
            var t = this;
            return Object(_["a"])(regeneratorRuntime.mark((function e() {
              var n, i, a;
              return regeneratorRuntime.wrap((function (e) {
                while (1) switch (e.prev = e.next) {
                  case 0:
                    n = (new Date).getTime(), i = 0;
                  case 2:
                    if (!(i < 1e3)) {
                      e.next = 9;
                      break;
                    }
                    return t.blocks[0].header.nonce += 1, e.next = 6, t.finalizeBlock(0);
                  case 6:
                    i = (new Date).getTime() - n, e.next = 2;
                    break;
                  case 9:
                    return a = t.blocks[0].header.nonce / (i / 1e3), t.setHashrate(a.toFixed(0)), t.blocks[0].header.nonce = 0, e.next = 14, t.finalizeBlock(0);
                  case 14:
                    t.guesses = [];
                  case 15:
                  case"end":
                    return e.stop();
                }
              }), e);
            })))();
          }
        }
      }, Ve = We, Ye = (n("d528"), Object(m["a"])(Ve, Ue, Ge, !1, null, null, null)), Xe = Ye.exports, Ke = {
        name: "app",
        components: {
          BlockchainSection: xt,
          RealBlocksSection: Ht,
          IntroSection: Lt,
          PowBlockchainSection: ue,
          ResourcesSection: me,
          TermsSection: Le,
          TimeChainSection: Xe
        },
        data: function () {
          return {
            fullpageOptions: {
              anchors: [],
              licenseKey: "2C8168FC-415648B7-B94C4003-80F51EAC",
              scrollingSpeed: 1e3,
              scrollBar: !1,
              scrollOverflow: !0,
              scrollOverflowReset: !0,
              scrollHorizontally: !0,
              navigation: !0,
              normalScrollElements: ".blockchain_wrapper",
              parallax: !0,
              parallaxKey: "bmlsc2xvZXdlbi5jb21fSTQyY0dGeVlXeHNZWGc9ME1T",
              parallaxOptions: {type: "reveal", percentage: 62, property: "translate"}
            },
            table_of_contents: [{anchor: "intro", label: "Intro"}, {
              anchor: "terms",
              label: "Terms",
              slides: [{anchor: "hexadecimal_notation", label: "Numerical Notation"}, {
                anchor: "hash_functions",
                label: "Hash Functions"
              }, {anchor: "sha256", label: "SHA-256"}]
            }, {
              anchor: "blockchain",
              label: "Blockchain",
              slides: [{anchor: "simple_blockchain", label: "Simple Example"}]
            }, {
              anchor: "pow",
              label: "Mining",
              slides: [{anchor: "target", label: "Target"}, {
                anchor: "pow_blockchain",
                label: "Proof-of-Work Blockchain"
              }, {anchor: "pow_mining", label: "Proof-of-Work Mining"}]
            }, {
              anchor: "timechain",
              label: "Timechain",
              slides: [{anchor: "difficulty_adjustment", label: "Difficulty Adjustment"}, {
                anchor: "hash_rate",
                label: "Hash Rate"
              }, {anchor: "probability", label: "Probability"}, {anchor: "timechain_graph", label: "Timechain Graph"}]
            }, {anchor: "real_blocks", label: "Real Blocks"}, {anchor: "resources", label: "Resources"}]
          };
        },
        mounted: function () {
          this.addAnchorsToFullpage(), this.moveToUrl();
        },
        methods: {
          addAnchorsToFullpage: function () {
            var t = this;
            this.table_of_contents.forEach((function (e) {
              t.fullpageOptions.anchors.push(e.anchor);
            }));
          }, moveToUrl: function () {
            var t = window.location.hash.match(/(\w+)/g) || [].reverse();
            t.length > 0 && this.moveTo(t.pop());
          }
        }
      }, Ze = Ke, Qe = (n("034f"), Object(m["a"])(Ze, l, h, !1, null, null, null)), Je = Qe.exports;
    i["default"].use(a["a"]), i["default"].use(o["a"]), i["default"].use(r["a"]), i["default"].use(c.a), i["default"].mixin({
      methods: {
        moveTo: function (t, e) {
          window.fullpage_api.moveTo(t, e);
        }, scrollToElm: function (t, e, n) {
        }
      }
    }), i["default"].config.productionTip = !1, i["default"].config.silent = !0, new i["default"]({
      render: function (t) {
        return t(Je);
      }
    }).$mount("#app");
  }, "677e": function (t, e, n) {
  }, "7b25": function (t, e, n) {
  }, "85ec": function (t, e, n) {
  }, "8de2": function (t, e, n) {
    "use strict";
    n("fee5");
  }, "95af": function (t, e, n) {
  }, 9720: function (t, e, n) {
    "use strict";
    n("4df9");
  }, b391: function (t, e, n) {
    "use strict";
    n("20f3");
  }, b969: function (t, e, n) {
  }, cc82: function (t, e, n) {
    "use strict";
    /*!
 * fullpage.js Scroll Horizontally Extension 0.0.4 for fullPage.js v3
 * https://github.com/alvarotrigo/fullPage.js
 *
 * @license This code has been bought from www.alvarotrigo.com/fullPage/extensions/ and it is not free to use or distribute.
 * Copyright (C) 2016 alvarotrigo.com - A project by Alvaro Trigo
 */
    window.fp_scrollHorizontallyExtension = function () {
      var t = this, e = window.fp_utils, n = window.fullpage_api, i = e, a = e.$, o = n.getFullpageData(),
        r = o.options, s = o.internals, c = ".fp-section", l = ".fp-slide";
      t.getScrollSection = function (t, e) {
        var o, s = a(".fp-section.active")[0], h = a(l, s).length, u = r.scrollHorizontally && 1 < h,
          d = 1 === a(c).length;
        if (u) if (o = a(".fp-slide.active", s)[0], "down" === t) {
          if (i.index(o) + 1 !== h || d) return n.moveSlideRight;
        } else if (i.index(o) || d) return n.moveSlideLeft;
        return e;
      }, t.c = s.c;
      var h = t["common".charAt(0)];
      return "complete" === document.readyState && h("scrollHorizontally"), window.addEventListener("load", (function () {
        h("scrollHorizontally");
      })), t;
    };
  }, ce65: function (t, e, n) {
    "use strict";
    n("7b25");
  }, d528: function (t, e, n) {
    "use strict";
    n("677e");
  }, eb63: function (t, e, n) {
  }, fee5: function (t, e, n) {
  }
});
//# sourceMappingURL=app.02c66296.js.map
