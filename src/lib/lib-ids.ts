var _ = (() => {
  var f = Object.defineProperty;
  var u = (r, i) => () => (r && (i = r((r = 0))), i);
  var m = (r, i) => () => (i || r((i = { exports: {} }).exports, i), i.exports),
    p = (r, i) => {
      for (var e in i) f(r, e, { get: i[e], enumerable: !0 });
    };
  var a = {};
  p(a, { default: () => l });
  function l() {
    return libById(l.id);
  }
  var b = u(() => {
    l.id = "SmpxUWFTSUEhPj5XckZUTSp6Y0M";
  });
  function t() {
    return libById(t.id);
  }
  var o = u(() => {
    t.id = "UnAlRnV3bHBPUlFXS1VyME9vRUY";
  });
  var d = m(() => {
    b();
    o();
    function n() {}
    n.formatRupiah = function (r) {
      return r
        ? "Rp " + r.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        : null;
    };
    n.coba1 = function () {
      return "satu";
    };
    n.libJurnal = a;
    n.libJurnalItem = t;
  });
  return d();
})();
