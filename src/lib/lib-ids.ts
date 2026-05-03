var _ = (() => {
  var e = (r, i) => () => (i || r((i = { exports: {} }).exports, i), i.exports);
  var t = e((a) => {
    a.formatRupiah = function (r) {
      return r
        ? "Rp " + r.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        : null;
    };
  });
  return t();
})();
