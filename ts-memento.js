var _ = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/main.ts
  var require_main = __commonJS({
    "src/main.ts"(exports) {
      exports.formatRupiah = function(nominal) {
        if (typeof nominal !== "number" || nominal <= 0) {
          return null;
        }
        return "Rp " + nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      };
    }
  });
  return require_main();
})();
