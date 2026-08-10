var _ = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/lib/lib-jurnal-item.ts
  function libJurnalItem() {
    return libById(libJurnalItem.id);
  }
  var init_lib_jurnal_item = __esm({
    "src/lib/lib-jurnal-item.ts"() {
      libJurnalItem.id = "UnAlRnV3bHBPUlFXS1VyME9vRUY";
    }
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
          (_a = libJurnalItem()) == null ? void 0 : _a.linksTo(entry()).forEach((e) => e.trash());
        }
      };
    }
  });

  // src/lib/lib-item-jurnal-barang.ts
  function libItemJurnalBarang() {
    return libItemJurnalBarang.id ? libById(libItemJurnalBarang.id) : libByName(libItemJurnalBarang.name);
  }
  var init_lib_item_jurnal_barang = __esm({
    "src/lib/lib-item-jurnal-barang.ts"() {
      libItemJurnalBarang.name = "Item Jurnal Barang";
      libItemJurnalBarang.id = "I2lTWGc0UFFxcTUxdi1kOUc6Rk0";
      libItemJurnalBarang.events = {
        entry: {
          updated() {
          }
        }
      };
    }
  });

  // src/lib/lib-jurnal-barang.ts
  function libJurnalBarang() {
    return libJurnalBarang.id ? libById(libJurnalBarang.id) : libByName(libJurnalBarang.name);
  }
  var init_lib_jurnal_barang = __esm({
    "src/lib/lib-jurnal-barang.ts"() {
      init_lib_item_jurnal_barang();
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
    }
  });

  // src/lib/lib-gudang.ts
  function libGudang() {
    if (libGudang.id)
      return libById(libGudang.id);
    return libByName(libGudang.name);
  }
  var init_lib_gudang = __esm({
    "src/lib/lib-gudang.ts"() {
      libGudang.name = "Gudang";
      libGudang.id = "XSNaUEFQbWdzWHBnJXVdNXZUTlE";
      libGudang.events = {
        entry: {
          updated() {
          }
        }
      };
    }
  });

  // src/lib/lib-item-rakitan.ts
  function libItemRakitan() {
    return libItemRakitan.id ? libById(libItemRakitan.id) : libByName(libItemRakitan.name);
  }
  var init_lib_item_rakitan = __esm({
    "src/lib/lib-item-rakitan.ts"() {
      libItemRakitan.name = "Item Rakitan";
      libItemRakitan.id = "JVBtMUppVGxvUCFYbFNlOyhOQGY";
      libItemRakitan.events = {
        entry: {
          updated() {
          }
        }
      };
    }
  });

  // src/lib/lib-rakitan.ts
  function libRakitan() {
    return libRakitan.id ? libById(libRakitan.id) : libByName(libRakitan.name);
  }
  var init_lib_rakitan = __esm({
    "src/lib/lib-rakitan.ts"() {
      init_lib_gudang();
      init_lib_item_rakitan();
      init_lib_jurnal_barang();
      init_lib_item_jurnal_barang();
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
          buatJurnalBarang() {
            var _a;
            let gudangs = (_a = libGudang()) == null ? void 0 : _a.entries();
            let choices = gudangs == null ? void 0 : gudangs.map((v) => v.name);
            let choiceGudangTujuan = ui().choiceBox(10, choices != null ? choices : []);
            let choiceGudangSumber = ui().choiceBox(1, choices != null ? choices : []);
            function buatJurnal() {
              var _a2, _b;
              let gudangTujuan = gudangs == null ? void 0 : gudangs[choiceGudangTujuan.selected];
              let gudangSumber = gudangs == null ? void 0 : gudangs[choiceGudangSumber.selected];
              let e = entry();
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
    }
  });

  // src/main.ts
  var require_main = __commonJS({
    "src/main.ts"(exports) {
      init_lib_jurnal();
      init_lib_jurnal_barang();
      init_lib_jurnal_item();
      init_lib_rakitan();
      exports.libJurnal = libJurnal;
      exports.libJurnalItem = libJurnalItem;
      exports.libJurnalBarang = libJurnalBarang;
      exports.libRakitan = libRakitan;
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
