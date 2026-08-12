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
    hello: () => hello
  });

  // src/lib/lib-jurnal-item.ts
  function libJurnalItem() {
    return libById(libJurnalItem.id);
  }
  libJurnalItem.id = "UnAlRnV3bHBPUlFXS1VyME9vRUY";

  // src/lib/lib-jurnal.ts
  function libJurnal() {
    return libById(libJurnal.id);
  }
  libJurnal.id = "SmpxUWFTSUEhPj5XckZUTSp6Y0M";
  libJurnal.events = {
    entryDeleted() {
      var _a;
      (_a = libJurnalItem()) == null ? void 0 : _a.linksTo(entry()).forEach((e) => e.trash());
    }
  };

  // src/lib/lib-item-jurnal-barang.ts
  function libItemJurnalBarang() {
    return libItemJurnalBarang.id ? libById(libItemJurnalBarang.id) : libByName(libItemJurnalBarang.name);
  }
  libItemJurnalBarang.name = "Item Jurnal Barang";
  libItemJurnalBarang.id = "I2lTWGc0UFFxcTUxdi1kOUc6Rk0";
  libItemJurnalBarang.events = {
    entry: {
      updated() {
      }
    }
  };

  // src/lib/lib-jurnal-barang.ts
  function libJurnalBarang() {
    return libJurnalBarang.id ? libById(libJurnalBarang.id) : libByName(libJurnalBarang.name);
  }
  libJurnalBarang.name = "Pesanan Pembelian";
  libJurnalBarang.id = "UHoqKEhMPDJkNyoteTllK3dFWlk";
  libJurnalBarang.events = {
    entry: {
      deleted() {
        var _a;
        const e = entry();
        (_a = libItemJurnalBarang()) == null ? void 0 : _a.linksTo(e).forEach((i) => i.trash());
      }
    }
  };

  // src/lib/lib-gudang.ts
  function libGudang() {
    if (libGudang.id)
      return libById(libGudang.id);
    return libByName(libGudang.name);
  }
  libGudang.name = "Gudang";
  libGudang.id = "XSNaUEFQbWdzWHBnJXVdNXZUTlE";
  libGudang.events = {
    entry: {
      updated() {
      }
    }
  };

  // src/lib/lib-item-rakitan.ts
  function libItemRakitan() {
    return libItemRakitan.id ? libById(libItemRakitan.id) : libByName(libItemRakitan.name);
  }
  libItemRakitan.name = "Item Rakitan";
  libItemRakitan.id = "JVBtMUppVGxvUCFYbFNlOyhOQGY";
  libItemRakitan.events = {
    entry: {
      updated() {
      }
    }
  };

  // src/lib/lib-rakitan.ts
  function libRakitan() {
    return libRakitan.id ? libById(libRakitan.id) : libByName(libRakitan.name);
  }
  libRakitan.name = "Perakitan";
  libRakitan.id = "JTlxbXJ3OEsjYXp2UEJzdWhNKm0";
  libRakitan.events = {
    entry: {
      updated() {
      }
    }
  };
  libRakitan.actions = {
    entry: {
      buatJurnalBarang(e) {
        var _a;
        let gudangs = (_a = libGudang()) == null ? void 0 : _a.entries();
        let choices = gudangs == null ? void 0 : gudangs.map((v) => v.name);
        let choiceGudangTujuan = ui().choiceBox(10, choices != null ? choices : []);
        let choiceGudangSumber = ui().choiceBox(1, choices != null ? choices : []);
        function buatJurnal() {
          var _a2, _b;
          let gudangTujuan = gudangs == null ? void 0 : gudangs[choiceGudangTujuan.selected];
          let gudangSumber = gudangs == null ? void 0 : gudangs[choiceGudangSumber.selected];
          let items = (_a2 = libItemRakitan()) == null ? void 0 : _a2.linksTo(e);
          let jurnal = (_b = libJurnalBarang()) == null ? void 0 : _b.create({
            Keterangan: e.name
          });
          if (!jurnal) {
            log("Gagal membuat jurnal barang");
            message("Gagal membuat jurnal barang");
            return false;
          }
          items == null ? void 0 : items.forEach((item) => {
            var _a3;
            (_a3 = libItemJurnalBarang()) == null ? void 0 : _a3.create({
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
            (_a3 = libItemJurnalBarang()) == null ? void 0 : _a3.create({
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
  };

  // src/main.ts
  (void 0).libJurnal = libJurnal;
  (void 0).libJurnalItem = libJurnalItem;
  (void 0).libJurnalBarang = libJurnalBarang;
  (void 0).libRakitan = libRakitan;
  (void 0).formatRupiah = function(nominal) {
    if (typeof nominal !== "number" || nominal <= 0) {
      return null;
    }
    return "Rp " + nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  function hello() {
    message("hello");
  }
  return __toCommonJS(main_exports);
})();
