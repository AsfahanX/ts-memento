var _ = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/lib/lib-helper.ts
  var createLibAccessor;
  var init_lib_helper = __esm({
    "src/lib/lib-helper.ts"() {
      createLibAccessor = (id) => {
        let _lib;
        return {
          lib: () => {
            var _a;
            _lib != null ? _lib : _lib = (_a = libById(id)) != null ? _a : (() => {
              throw new Error(`Library with id ${id} not found`);
            })();
            return _lib;
          }
        };
      };
    }
  });

  // src/utils.ts
  function showNotif(id, title, text) {
    notification().id(id).title(title).text("You have received a new message ").bigText(text).alertOnce().show();
  }
  function recalculateEntries(library, callback) {
    library != null ? library : library = lib();
    withProgress(
      library.entries(),
      (e, i) => {
        e.recalc();
        callback == null ? void 0 : callback(e, i);
      },
      library.title
    );
  }
  function withProgress(items, callback, title) {
    title != null ? title : title = "Calculating";
    const id = title;
    const total = items.length;
    message(title);
    for (let i = 0; i < items.length; i++) {
      callback == null ? void 0 : callback(items[i], i);
      showNotif(id, title, `${i + 1} of ${total}`);
    }
    showNotif(id, "Finisehd " + title, `${total} of ${total}`);
  }
  var init_utils = __esm({
    "src/utils.ts"() {
    }
  });

  // src/lib/lib-item-jurnal-barang.ts
  var helper, events, actions, lib_item_jurnal_barang_default;
  var init_lib_item_jurnal_barang = __esm({
    "src/lib/lib-item-jurnal-barang.ts"() {
      init_utils();
      init_lib_helper();
      helper = {
        updateGambar(e) {
          var _a, _b, _c;
          e != null ? e : e = entry();
          const gbr = (_c = (_b = (_a = e.field("Barang")) == null ? void 0 : _a[0]) == null ? void 0 : _b.images("Gambar utama")) == null ? void 0 : _c[0];
          if (gbr) {
            e.set("Gambar utama", [gbr]);
          } else {
            e.set("Gambar utama", null);
          }
        },
        coba() {
          const en = entry();
        }
      };
      events = {
        entry: {
          updated(e) {
            helper.updateGambar(e);
          }
        }
      };
      actions = {
        entry: {
          recalculate() {
          }
        },
        library: {
          recalculate() {
            recalculateEntries(lib(), (e) => {
              helper.updateGambar(e);
            });
          }
        }
      };
      lib_item_jurnal_barang_default = __spreadProps(__spreadValues({}, createLibAccessor("I2lTWGc0UFFxcTUxdi1kOUc6Rk0")), {
        events,
        actions
      });
    }
  });

  // src/lib/lib-item-penjualan.ts
  var helper2, events2, actions2, lib_item_penjualan_default;
  var init_lib_item_penjualan = __esm({
    "src/lib/lib-item-penjualan.ts"() {
      init_lib_helper();
      helper2 = {};
      events2 = {
        entry: {
          updated(e) {
            var _a, _b, _c;
            e != null ? e : e = entry();
            const gbr = (_c = (_b = (_a = e.field("Barang")) == null ? void 0 : _a[0]) == null ? void 0 : _b.images("Gambar utama")) == null ? void 0 : _c[0];
            if (gbr) {
              e.set("Gambar utama", [gbr]);
            } else {
              e.set("Gambar utama", null);
            }
          }
        }
      };
      actions2 = {};
      lib_item_penjualan_default = __spreadProps(__spreadValues({}, createLibAccessor("RE4pK2hXUllyUlNtd1VRWjJrVG0")), {
        helper: helper2,
        events: events2,
        actions: actions2
      });
    }
  });

  // src/lib/lib-jurnal-barang.ts
  var events3, actions3, lib_jurnal_barang_default;
  var init_lib_jurnal_barang = __esm({
    "src/lib/lib-jurnal-barang.ts"() {
      init_lib_helper();
      init_lib_item_jurnal_barang();
      events3 = {
        entry: {
          deleted(e) {
            e != null ? e : e = entry();
            lib_item_jurnal_barang_default.lib().linksTo(e).forEach((i) => i.trash());
          }
        }
      };
      actions3 = {};
      lib_jurnal_barang_default = __spreadProps(__spreadValues({}, createLibAccessor("UHoqKEhMPDJkNyoteTllK3dFWlk")), {
        events: events3,
        actions: actions3
      });
    }
  });

  // src/lib/lib-penjualan.ts
  var helper3, events4, actions4, lib_penjualan_default;
  var init_lib_penjualan = __esm({
    "src/lib/lib-penjualan.ts"() {
      init_lib_helper();
      init_lib_item_jurnal_barang();
      init_lib_item_penjualan();
      init_lib_jurnal_barang();
      helper3 = {
        buatJurnal(e) {
          var _a;
          e != null ? e : e = entry();
          let jurnal = (_a = lib_jurnal_barang_default.lib().linksTo(e)) == null ? void 0 : _a[0];
          if (jurnal)
            throw new Error(`Jurnal sudah ada untuk penjualan dengan id: ${e.id}`);
          jurnal = lib_jurnal_barang_default.lib().create({
            Jenis: "Penjualan",
            Tanggal: e.field("Tanggal"),
            Keterangan: e.name
          });
          const items = lib_item_penjualan_default.lib().linksTo(e).map((item, i) => {
            var _a2;
            const barang = (_a2 = item.field("Barang")) == null ? void 0 : _a2[0];
            if (!barang) return void 0;
            return {
              "Jurnal barang": [jurnal],
              Barang: [barang],
              "Gambar barang": barang.field("Gambar utama"),
              Kuantitas: item.field("Kuantitas"),
              "Nilai stok": item.field("Total harga pokok penjualan")
            };
          }).filter((v) => !!v);
          items.forEach(
            (i) => lib_item_jurnal_barang_default.lib().create(__spreadProps(__spreadValues({}, i), {
              Jenis: "Keluar",
              Gudang: e.field("Gudang")
            }))
          );
        }
      };
      events4 = {};
      actions4 = {};
      lib_penjualan_default = __spreadProps(__spreadValues({}, createLibAccessor("WCN6aFtvRkxPUig1PitlPHdJNiE")), {
        helper: helper3,
        events: events4,
        actions: actions4
      });
    }
  });

  // src/lib/lib-barang.ts
  var helper4, events5, actions5, lib_barang_default;
  var init_lib_barang = __esm({
    "src/lib/lib-barang.ts"() {
      init_lib_helper();
      helper4 = {};
      events5 = {};
      actions5 = {};
      lib_barang_default = __spreadProps(__spreadValues({}, createLibAccessor("QFQxY0BKVWQ0elJkKTY5SSU6cUM")), {
        helper: helper4,
        events: events5,
        actions: actions5
      });
    }
  });

  // src/lib/lib-gudang.ts
  var helper5, events6, actions6, lib_gudang_default;
  var init_lib_gudang = __esm({
    "src/lib/lib-gudang.ts"() {
      init_lib_helper();
      helper5 = {};
      events6 = {};
      actions6 = {};
      lib_gudang_default = __spreadProps(__spreadValues({}, createLibAccessor("XSNaUEFQbWdzWHBnJXVdNXZUTlE")), {
        helper: helper5,
        events: events6,
        actions: actions6
      });
    }
  });

  // src/lib/lib-item-rakitan.ts
  var helper6, events7, actions7, lib_item_rakitan_default;
  var init_lib_item_rakitan = __esm({
    "src/lib/lib-item-rakitan.ts"() {
      init_lib_helper();
      helper6 = {};
      events7 = {
        entry: {
          updated(e) {
            var _a, _b, _c;
            e != null ? e : e = entry();
            const gbr = (_c = (_b = (_a = e.field("Barang")) == null ? void 0 : _a[0]) == null ? void 0 : _b.images("Gambar utama")) == null ? void 0 : _c[0];
            if (gbr) {
              e.set("Gambar utama", [gbr]);
            } else {
              e.set("Gambar utama", null);
            }
          }
        }
      };
      actions7 = {};
      lib_item_rakitan_default = __spreadProps(__spreadValues({}, createLibAccessor("JVBtMUppVGxvUCFYbFNlOyhOQGY")), {
        helper: helper6,
        events: events7,
        actions: actions7
      });
    }
  });

  // src/lib/lib-rakitan.ts
  var helper7, events8, actions8, lib_rakitan_default;
  var init_lib_rakitan = __esm({
    "src/lib/lib-rakitan.ts"() {
      init_lib_gudang();
      init_lib_helper();
      init_lib_item_jurnal_barang();
      init_lib_item_rakitan();
      init_lib_jurnal_barang();
      helper7 = {};
      events8 = {};
      actions8 = {
        entry: {
          buatJurnalBarang(e) {
            e != null ? e : e = entry();
            let gudangs = lib_gudang_default.lib().entries();
            let choices = gudangs == null ? void 0 : gudangs.map((v) => v.name);
            let choiceGudangTujuan = ui().choiceBox(10, choices != null ? choices : []);
            let choiceGudangSumber = ui().choiceBox(1, choices != null ? choices : []);
            const buatJurnal = () => {
              let gudangTujuan = gudangs == null ? void 0 : gudangs[choiceGudangTujuan.selected];
              let gudangSumber = gudangs == null ? void 0 : gudangs[choiceGudangSumber.selected];
              let jurnal = lib_jurnal_barang_default.lib().create({
                Keterangan: e.name
              });
              if (!jurnal) {
                log("Gagal membuat jurnal barang");
                message("Gagal membuat jurnal barang");
                return false;
              }
              let items = lib_item_rakitan_default.lib().linksTo(e).map((item, i) => {
                var _a, _b, _c;
                const barang = (_a = item.field("Barang")) == null ? void 0 : _a[0];
                if (!barang) return void 0;
                return {
                  "Jurnal barang": [jurnal],
                  Barang: item.field("Barang"),
                  Kuantitas: item.field("Kuantitas"),
                  "Gambar utama": (_c = (_b = item.field("Barang")) == null ? void 0 : _b[0]) == null ? void 0 : _c.field("Gambar utama"),
                  Perakitan: [e]
                };
              }).filter((v) => !!v);
              items.forEach(
                (i) => lib_item_jurnal_barang_default.lib().create(__spreadProps(__spreadValues({}, i), {
                  Jenis: "Masuk",
                  Gudang: gudangTujuan ? [gudangTujuan] : void 0
                }))
              );
              items.forEach(
                (i) => lib_item_jurnal_barang_default.lib().create(__spreadProps(__spreadValues({}, i), {
                  Jenis: "Keluar",
                  Gudang: gudangSumber ? [gudangSumber] : void 0
                }))
              );
              jurnal.show();
              return true;
            };
            dialog().title("Pilih ").view(
              ui().layout([
                ui().text("Gudang tujuan: "),
                choiceGudangTujuan,
                ui().text("Gudang sumber: "),
                choiceGudangSumber
              ])
            ).positiveButton("Yes", buatJurnal).negativeButton("No", () => false).show();
          }
        }
      };
      lib_rakitan_default = __spreadProps(__spreadValues({}, createLibAccessor("JTlxbXJ3OEsjYXp2UEJzdWhNKm0")), {
        helper: helper7,
        events: events8,
        actions: actions8
      });
    }
  });

  // src/lib/index.ts
  var init_lib = __esm({
    "src/lib/index.ts"() {
      init_lib_penjualan();
      init_lib_barang();
      init_lib_gudang();
      init_lib_jurnal_barang();
      init_lib_item_jurnal_barang();
      init_lib_rakitan();
      init_lib_item_rakitan();
    }
  });

  // src/main.ts
  var require_main = __commonJS({
    "src/main.ts"(exports) {
      init_lib();
      init_utils();
      init_lib_item_penjualan();
      Object.assign(exports, {
        libGudang: lib_gudang_default,
        libBarang: lib_barang_default,
        libPenjualan: lib_penjualan_default,
        libItemPenjualan: lib_item_penjualan_default,
        libJurnalBarang: lib_jurnal_barang_default,
        libItemJurnalBarang: lib_item_jurnal_barang_default,
        libRakitan: lib_rakitan_default,
        libItemRakitan: lib_item_rakitan_default,
        formatRupiah(nominal) {
          if (typeof nominal !== "number" || nominal <= 0) {
            return null;
          }
          return "Rp " + nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        hello() {
          message("hello");
        },
        getAllProperties(instance) {
          const properties = /* @__PURE__ */ new Set();
          let currentObj = instance;
          while (currentObj && currentObj !== Object.prototype) {
            Reflect.ownKeys(currentObj).forEach((key) => properties.add(key));
            currentObj = Object.getPrototypeOf(currentObj);
          }
          return Array.from(properties).join("\r\n");
        },
        withProgress
      });
    }
  });
  return require_main();
})();
