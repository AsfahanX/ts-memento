var _ = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/lib/lib-penjualan.ts
  var init_lib_penjualan = __esm({
    "src/lib/lib-penjualan.ts"() {
    }
  });

  // src/lib/lib-barang.ts
  var init_lib_barang = __esm({
    "src/lib/lib-barang.ts"() {
    }
  });

  // src/lib/lib-gudang.ts
  var lib_gudang_default;
  var init_lib_gudang = __esm({
    "src/lib/lib-gudang.ts"() {
      lib_gudang_default = {
        name: "Gudang",
        id: "XSNaUEFQbWdzWHBnJXVdNXZUTlE",
        lib() {
          var _a;
          return (_a = libById(this.id)) != null ? _a : (() => {
            throw new Error(`Library with id ${this.id} not found`);
          })();
        }
      };
    }
  });

  // src/lib/lib-item-jurnal-barang.ts
  var lib_item_jurnal_barang_default;
  var init_lib_item_jurnal_barang = __esm({
    "src/lib/lib-item-jurnal-barang.ts"() {
      lib_item_jurnal_barang_default = {
        name: "Item Jurnal Barang",
        id: "I2lTWGc0UFFxcTUxdi1kOUc6Rk0",
        lib() {
          var _a;
          return (_a = libById(this.id)) != null ? _a : (() => {
            throw new Error(`Library with id ${this.id} not found`);
          })();
        }
      };
    }
  });

  // src/lib/lib-jurnal-barang.ts
  var lib_jurnal_barang_default;
  var init_lib_jurnal_barang = __esm({
    "src/lib/lib-jurnal-barang.ts"() {
      init_lib_item_jurnal_barang();
      lib_jurnal_barang_default = {
        name: "Pesanan Pembelian",
        id: "UHoqKEhMPDJkNyoteTllK3dFWlk",
        lib() {
          var _a;
          return (_a = libById(this.id)) != null ? _a : (() => {
            throw new Error(`Library with id ${this.id} not found`);
          })();
        },
        events: {
          entry: {
            deleted(e) {
              var _a;
              e != null ? e : e = entry();
              (_a = lib_item_jurnal_barang_default.lib()) == null ? void 0 : _a.linksTo(e).forEach((i) => i.trash());
            }
          }
        }
      };
    }
  });

  // src/lib/lib-item-rakitan.ts
  var lib_item_rakitan_default;
  var init_lib_item_rakitan = __esm({
    "src/lib/lib-item-rakitan.ts"() {
      lib_item_rakitan_default = {
        name: "Item Rakitan",
        id: "JVBtMUppVGxvUCFYbFNlOyhOQGY",
        lib() {
          var _a;
          return (_a = libById(this.id)) != null ? _a : (() => {
            throw new Error(`Library with id ${this.id} not found`);
          })();
        }
      };
    }
  });

  // src/lib/lib-rakitan.ts
  var lib_rakitan_default;
  var init_lib_rakitan = __esm({
    "src/lib/lib-rakitan.ts"() {
      init_lib_gudang();
      init_lib_item_jurnal_barang();
      init_lib_item_rakitan();
      init_lib_jurnal_barang();
      lib_rakitan_default = {
        name: "Perakitan",
        id: "JTlxbXJ3OEsjYXp2UEJzdWhNKm0",
        lib() {
          var _a;
          return (_a = libById(this.id)) != null ? _a : (() => {
            throw new Error(`Library with id ${this.id} not found`);
          })();
        },
        events: {
          entry: {
            updated(e) {
            }
          }
        },
        actions: {
          entry: {
            buatJurnalBarang(e) {
              var _a;
              e != null ? e : e = entry();
              let gudangs = (_a = lib_gudang_default.lib()) == null ? void 0 : _a.entries();
              let choices = gudangs == null ? void 0 : gudangs.map((v) => v.name);
              let choiceGudangTujuan = ui().choiceBox(10, choices != null ? choices : []);
              let choiceGudangSumber = ui().choiceBox(1, choices != null ? choices : []);
              function buatJurnal() {
                var _a2, _b;
                let gudangTujuan = gudangs == null ? void 0 : gudangs[choiceGudangTujuan.selected];
                let gudangSumber = gudangs == null ? void 0 : gudangs[choiceGudangSumber.selected];
                let items = (_a2 = lib_item_rakitan_default.lib()) == null ? void 0 : _a2.linksTo(e);
                let jurnal = (_b = lib_jurnal_barang_default.lib()) == null ? void 0 : _b.create({
                  Keterangan: e.name
                });
                if (!jurnal) {
                  log("Gagal membuat jurnal barang");
                  message("Gagal membuat jurnal barang");
                  return false;
                }
                items == null ? void 0 : items.forEach((item) => {
                  var _a3;
                  (_a3 = lib_item_jurnal_barang_default.lib()) == null ? void 0 : _a3.create({
                    "Jurnal barang": [jurnal],
                    "Gudang": gudangTujuan ? [gudangTujuan] : void 0,
                    "Barang": item.field("Barang"),
                    "Perubahan kuantitas": item.field("Kuantitas"),
                    "Gambar barang": item.field("Barang")[0].field("Gambar utama"),
                    "Perakitan": [e]
                  });
                });
                items == null ? void 0 : items.forEach((item) => {
                  var _a3;
                  (_a3 = lib_item_jurnal_barang_default.lib()) == null ? void 0 : _a3.create({
                    "Jurnal barang": [jurnal],
                    "Gudang": gudangSumber ? [gudangSumber] : void 0,
                    "Barang": item.field("Barang"),
                    "Perubahan kuantitas": 0 - item.field("Kuantitas"),
                    "Gambar barang": item.field("Barang")[0].field("Gambar utama")
                  });
                });
                jurnal.show();
                return true;
              }
              dialog().title("Pilih ").view(ui().layout([
                ui().text("Gudang tujuan: "),
                choiceGudangTujuan,
                ui().text("Gudang sumber: "),
                choiceGudangSumber
              ])).positiveButton("Yes", buatJurnal).negativeButton("No", () => false).show();
            }
          }
        }
      };
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
      Object.assign(exports, {
        libRakitan: lib_rakitan_default,
        formatRupiah(nominal) {
          if (typeof nominal !== "number" || nominal <= 0) {
            return null;
          }
          return "Rp " + nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        hello() {
          message("hello");
        }
      });
    }
  });
  return require_main();
})();
