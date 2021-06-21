/**
 * @preserve HTML5 Shiv prev3.7.1 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
 */
!function (a, b) {
    function l(a, b) {
        var c = a.createElement("p"),
        d = a.getElementsByTagName("head")[0] || a.documentElement;
        return c.innerHTML = "x<style>" + b + "</style>",
        d.insertBefore(c.lastChild, d.firstChild)
    }
    function m() {
        var a = s.elements;
        return "string" == typeof a ? a.split(" ") : a
    }
    function n(a) {
        var b = j[a[h]];
        return b || (b = {}, i++, a[h] = i, j[i] = b),
        b
    }
    function o(a, c, d) {
        if (c || (c = b), k)
            return c.createElement(a);
        d || (d = n(c));
        var g;
        return g = d.cache[a] ? d.cache[a].cloneNode() : f.test(a) ? (d.cache[a] = d.createElem(a)).cloneNode() : d.createElem(a),
        !g.canHaveChildren || e.test(a) || g.tagUrn ? g : d.frag.appendChild(g)
    }
    function p(a, c) {
        if (a || (a = b), k)
            return a.createDocumentFragment();
        c = c || n(a);
        for (var d = c.frag.cloneNode(), e = 0, f = m(), g = f.length; e < g; e++)
            d.createElement(f[e]);
        return d
    }
    function q(a, b) {
        b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()),
        a.createElement = function (c) {
            return s.shivMethods ? o(c, a, b) : b.createElem(c)
        },
        a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + m().join().replace(/[\w\-:]+/g, function (a) {
                    return b.createElem(a),
                    b.frag.createElement(a),
                    'c("' + a + '")'
                }) + ");return n}")(s, b.frag)
    }
    function r(a) {
        a || (a = b);
        var c = n(a);
        return !s.shivCSS || g || c.hasCSS || (c.hasCSS = !!l(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),
        k || q(a, c),
        a
    }
    var g,
    k,
    c = "3.7.0",
    d = a.html5 || {},
    e = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
    f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
    h = "_html5shiv",
    i = 0,
    j = {};
    !function () {
        try {
            var a = b.createElement("a");
            a.innerHTML = "<xyz></xyz>",
            g = "hidden" in a,
            k = 1 == a.childNodes.length || function () {
                b.createElement("a");
                var a = b.createDocumentFragment();
                return "undefined" == typeof a.cloneNode || "undefined" == typeof a.createDocumentFragment || "undefined" == typeof a.createElement
            }
            ()
        } catch (a) {
            g = !0,
            k = !0
        }
    }
    ();
    var s = {
        elements: d.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
        version: c,
        shivCSS: d.shivCSS !== !1,
        supportsUnknownElements: k,
        shivMethods: d.shivMethods !== !1,
        type: "default",
        shivDocument: r,
        createElement: o,
        createDocumentFragment: p
    };
    a.html5 = s,
    r(b)
}
(this, document);
