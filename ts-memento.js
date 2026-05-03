(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) =>
    function __init() {
      return (fn && (res = (0, fn[__getOwnPropNames(fn)[0]])((fn = 0))), res);
    };
  var __commonJS = (cb, mod) =>
    function __require() {
      return (
        mod ||
          (0, cb[__getOwnPropNames(cb)[0]])(
            (mod = { exports: {} }).exports,
            mod,
          ),
        mod.exports
      );
    };

  // src/lib/lib-jurnal-item.ts
  function libJurnalItem() {
    return libById(libJurnalItem.id);
  }
  var init_lib_jurnal_item = __esm({
    "src/lib/lib-jurnal-item.ts"() {
      libJurnalItem.id = "UnAlRnV3bHBPUlFXS1VyME9vRUY";
    },
  });

  // src/lib/lib-jurnal.ts
  function libJurnal() {
    return libById(libJurnal.id);
  }
  var init_lib_jurnal = __esm({
    "src/lib/lib-jurnal.ts"() {
      init_lib_jurnal_item();
      libJurnal.id = "SmpxUWFTSUEhPj5XckZUTSp6Y0M";
      libJurnal.events = {
        entryDeleted() {
          var _a;
          (_a = libJurnalItem()) == null
            ? void 0
            : _a.linksTo(entry()).forEach((e) => e.trash());
        },
      };
    },
  });

  // src/main.ts
  var require_main = __commonJS({
    "src/main.ts"() {
      init_lib_jurnal();
      init_lib_jurnal_item();
      function _() {
        return {};
      }
      _.formatRupiah = function (nominal) {
        if (!nominal) {
          return null;
        }
        return "Rp " + nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      };
      _.libJurnal = libJurnal;
      _.libJurnalItem = libJurnalItem;
    },
  });
  require_main();
})();
