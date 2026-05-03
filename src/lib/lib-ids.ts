var _ = (() => {
  var t = Object.defineProperty;
  var o = Object.getOwnPropertyDescriptor;
  var m = Object.getOwnPropertyNames;
  var b = Object.prototype.hasOwnProperty;
  var p = (r, i) => {
      for (var a in i) t(r, a, { get: i[a], enumerable: !0 });
    },
    u = (r, i, a, l) => {
      if ((i && typeof i == "object") || typeof i == "function")
        for (let e of m(i))
          !b.call(r, e) &&
            e !== a &&
            t(r, e, {
              get: () => i[e],
              enumerable: !(l = o(i, e)) || l.enumerable,
            });
      return r;
    };
  var f = (r) => u(t({}, "__esModule", { value: !0 }), r);
  var s = {};
  p(s, { formatRupiah: () => n });
  function n(r) {
    return r
      ? "Rp " + r.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      : null;
  }
  return f(s);
})();
