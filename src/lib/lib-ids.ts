var _ = (() => {
  var o = Object.defineProperty;
  var b = (r, i) => () => (r && (i = r((r = 0))), i);
  var f = (r, i) => () => (i || r((i = { exports: {} }).exports, i), i.exports),
    d = (r, i) => {
      for (var u in i) o(r, u, { get: i[u], enumerable: !0 });
    };
  function l() {
    return libById(l.id);
  }
  var n = b(() => {
    l.id = "UnAlRnV3bHBPUlFXS1VyME9vRUY";
  });
  var a = {};
  d(a, { default: () => t });
  function t() {
    return libById(t.id);
  }
  var m = b(() => {
    n();
    t.id = "SmpxUWFTSUEhPj5XckZUTSp6Y0M";
    t.events = {
      entryDeleted() {
        l()
          ?.linksTo(entry())
          .forEach((r) => r.trash());
      },
    };
  });
  var p = f((e) => {
    m();
    n();
    e.formatRupiah = function (r) {
      return r
        ? "Rp " + r.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        : null;
    };
    e.libJurnal = a;
    e.libJurnalItem = l;
  });
  return p();
})();
