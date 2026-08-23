var _ = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __typeError = (msg) => {
    throw TypeError(msg);
  };
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
  var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
  var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);

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
        _lib: void 0,
        lib() {
          var _a, _b;
          (_b = this._lib) != null ? _b : this._lib = (_a = libById(this.id)) != null ? _a : (() => {
            throw new Error(`Library with id ${this.id} not found`);
          })();
          return this._lib;
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

  // src/lib/lib-helper.ts
  var _lib, LibHelperNew;
  var init_lib_helper = __esm({
    "src/lib/lib-helper.ts"() {
      LibHelperNew = class {
        constructor() {
          __privateAdd(this, _lib, null);
        }
        get lib() {
          var _a, _b;
          return (_b = (_a = __privateGet(this, _lib)) != null ? _a : libById(this.id)) != null ? _b : (() => {
            throw new Error(`Library with id ${this.id} not found`);
          })();
        }
        //   /**
        //    *
        //    */
        //   constructor(
        //     public events?: LibHelperEvent<T>,
        //     public actions?: LibHelperActions<T>,
        //   ) {}
      };
      _lib = new WeakMap();
    }
  });

  // src/lib/lib-penjualan.ts
  var lib_penjualan_default, LibPenjualan;
  var init_lib_penjualan = __esm({
    "src/lib/lib-penjualan.ts"() {
      init_lib_jurnal_barang();
      init_lib_helper();
      lib_penjualan_default = {
        name: "Pesanan Penjualan",
        id: "WCN6aFtvRkxPUig1PitlPHdJNiE",
        lib() {
          var _a;
          return (_a = libById(this.id)) != null ? _a : (() => {
            throw new Error(`Library with id ${this.id} not found`);
          })();
        },
        events: {
          entry: {}
        },
        actions: {
          entry: {
            periksaJurnal(e) {
              e != null ? e : e = entry();
              lib_jurnal_barang_default.lib().linksTo(e);
            }
          },
          library: {
            periksaJurnal() {
            }
          }
        },
        periksaJurnal() {
          return "";
        }
      };
      LibPenjualan = class extends LibHelperNew {
        /**
         *
         */
        constructor() {
          super();
          // protected actions?:
          //   | {
          //       entry?:
          //         | { [name: string]: (e: Entry<Penjualan>, ...rest: any) => void }
          //         | undefined;
          //       library?:
          //         | { [name: string]: (e: Entry<Penjualan>, ...rest: any) => void }
          //         | undefined;
          //     }
          //   | undefined;
          this.id = "WCN6aFtvRkxPUig1PitlPHdJNiE";
          const self = this;
          this.events = { entry: { created(e) {
          } } };
          this.actions = {
            library: {
              periksaJurnal() {
                message("memeriksa jurnal . . .");
              }
            }
          };
        }
        // events = {entry: {}};
        revalidateJurnal() {
        }
      };
    }
  });

  // src/lib/lib-barang.ts
  var lib_barang_default;
  var init_lib_barang = __esm({
    "src/lib/lib-barang.ts"() {
      lib_barang_default = {
        name: "Master Barang",
        id: "QFQxY0BKVWQ0elJkKTY5SSU6cUM",
        lib() {
          var _a;
          return (_a = libById(this.id)) != null ? _a : (() => {
            throw new Error(`Library with id ${this.id} not found`);
          })();
        }
      };
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
                    Gudang: gudangTujuan ? [gudangTujuan] : void 0,
                    Barang: item.field("Barang"),
                    "Perubahan kuantitas": item.field("Kuantitas"),
                    "Gambar barang": item.field("Barang")[0].field("Gambar utama"),
                    Jenis: "Masuk",
                    Kuantitas: item.field("Kuantitas"),
                    Perakitan: [e]
                  });
                });
                items == null ? void 0 : items.forEach((item) => {
                  var _a3;
                  (_a3 = lib_item_jurnal_barang_default.lib()) == null ? void 0 : _a3.create({
                    "Jurnal barang": [jurnal],
                    Gudang: gudangSumber ? [gudangSumber] : void 0,
                    Barang: item.field("Barang"),
                    "Perubahan kuantitas": 0 - item.field("Kuantitas"),
                    "Gambar barang": item.field("Barang")[0].field("Gambar utama"),
                    Jenis: "Keluar",
                    Kuantitas: item.field("Kuantitas")
                  });
                });
                jurnal.show();
                return true;
              }
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
      init_lib_penjualan();
      Object.assign(exports, {
        libPenjualan: lib_penjualan_default,
        libBarang: lib_barang_default,
        libGudang: lib_gudang_default,
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
        helper: new class {
          constructor(_libPenjualan) {
            this._libPenjualan = _libPenjualan;
          }
          get libPenjualan() {
            var _a;
            return (_a = this._libPenjualan) != null ? _a : new LibPenjualan();
          }
        }()
      });
    }
  });
  return require_main();
})();
