var _ = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/main.ts
  var main_exports = {};
  __export(main_exports, {
    formatRupiah: () => formatRupiah,
    hello: () => hello,
    libBarang: () => lib_barang_default,
    libGudang: () => lib_gudang_default,
    libItemJurnalBarang: () => lib_item_jurnal_barang_default,
    libItemRakitan: () => lib_item_rakitan_default,
    libJurnalBarang: () => lib_jurnal_barang_default,
    libPenjualan: () => lib_penjualan_default,
    libRakitan: () => lib_rakitan_default
  });

  // src/lib/lib-penjualan.ts
  var lib_penjualan_default = {
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
      library: {
        // TODO: check if all record has jurnalBarang
      }
    }
  };

  // src/lib/lib-barang.ts
  var lib_barang_default = {
    name: "Master Barang",
    id: "QFQxY0BKVWQ0elJkKTY5SSU6cUM",
    lib() {
      var _a;
      return (_a = libById(this.id)) != null ? _a : (() => {
        throw new Error(`Library with id ${this.id} not found`);
      })();
    }
  };

  // src/lib/lib-gudang.ts
  var lib_gudang_default = {
    name: "Gudang",
    id: "XSNaUEFQbWdzWHBnJXVdNXZUTlE",
    lib() {
      var _a;
      return (_a = libById(this.id)) != null ? _a : (() => {
        throw new Error(`Library with id ${this.id} not found`);
      })();
    }
  };

  // src/lib/lib-item-jurnal-barang.ts
  var lib_item_jurnal_barang_default = {
    name: "Item Jurnal Barang",
    id: "I2lTWGc0UFFxcTUxdi1kOUc6Rk0",
    lib() {
      var _a;
      return (_a = libById(this.id)) != null ? _a : (() => {
        throw new Error(`Library with id ${this.id} not found`);
      })();
    }
  };

  // src/lib/lib-jurnal-barang.ts
  var lib_jurnal_barang_default = {
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

  // src/lib/lib-item-rakitan.ts
  var lib_item_rakitan_default = {
    name: "Item Rakitan",
    id: "JVBtMUppVGxvUCFYbFNlOyhOQGY",
    lib() {
      var _a;
      return (_a = libById(this.id)) != null ? _a : (() => {
        throw new Error(`Library with id ${this.id} not found`);
      })();
    }
  };

  // src/lib/lib-rakitan.ts
  var lib_rakitan_default = {
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

  // src/main.ts
  function formatRupiah(nominal) {
    if (typeof nominal !== "number" || nominal <= 0) {
      return null;
    }
    return "Rp " + nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  function hello() {
    message("hello");
  }
  return __toCommonJS(main_exports);
})();
