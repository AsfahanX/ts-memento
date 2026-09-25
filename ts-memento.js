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

  // src/lib/lib-gudang.ts
  var helper, events, actions, lib_gudang_default;
  var init_lib_gudang = __esm({
    "src/lib/lib-gudang.ts"() {
      init_lib_helper();
      helper = {};
      events = {};
      actions = {};
      lib_gudang_default = __spreadProps(__spreadValues({}, createLibAccessor("XSNaUEFQbWdzWHBnJXVdNXZUTlE")), {
        helper,
        events,
        actions
      });
    }
  });

  // src/lib/lib-barang.ts
  var helper2, events2, actions2, lib_barang_default;
  var init_lib_barang = __esm({
    "src/lib/lib-barang.ts"() {
      init_lib_helper();
      init_lib_gudang();
      init_lib_barang();
      init_lib_stok_barang();
      helper2 = {
        _gudangs: null,
        gudangs() {
          if (this._gudangs) return this._gudangs;
          let fieldNames = lib_stok_barang_default.lib().fields();
          this._gudangs = lib_gudang_default.lib().entries().filter((v) => fieldNames == null ? void 0 : fieldNames.includes(v.name));
          return this._gudangs;
        },
        createIfMissing(barangs) {
          barangs != null ? barangs : barangs = lib_barang_default.lib().entries();
          let entries = lib_stok_barang_default.lib().entries().map((v) => {
            var _a, _b;
            return (_b = (_a = v.field("Barang")) == null ? void 0 : _a[0]) == null ? void 0 : _b.id;
          });
          let missings = barangs.filter((v) => !entries.includes(v.id));
          return missings.map(
            (v) => lib_stok_barang_default.lib().create({
              Barang: [v],
              "Gambar utama": v.field("Gambar utama")
            })
          );
        },
        findEntries(barangs) {
          barangs != null ? barangs : barangs = lib_barang_default.lib().entries();
          this.createIfMissing(barangs);
          let ids = barangs.map((v) => v.id);
          return lib_stok_barang_default.lib().entries().filter((v) => {
            var _a, _b;
            return ids.includes((_b = (_a = v.field("Barang")) == null ? void 0 : _a[0]) == null ? void 0 : _b.id);
          });
        },
        updateStockBalance(e) {
          var _a, _b;
          e != null ? e : e = entry();
          let barang = (_b = (_a = e.field("Barang")) == null ? void 0 : _a[0]) != null ? _b : void 0;
          if (!barang) {
            return;
          }
          this.gudangs().forEach((gudang) => {
            let result = sql(
              `SELECT SUM(j."_Perubahan kuantitas") as total FROM "Item Jurnal Barang" j JOIN "Master Barang" b ON j.Barang = b.id WHERE j.removed = 0 AND j.Barang = '${barang.id}' AND j.Gudang = '${gudang.id}' `
            );
            result = result.asInt();
            result = result == 0 ? null : result;
            e.set(gudang.name, result);
          });
        },
        updateStok(barangs) {
          this.findEntries(barangs).forEach((v) => {
            var _a, _b;
            this.updateStockBalance(v);
            v.recalc();
            (_b = (_a = v.field("Barang")) == null ? void 0 : _a[0]) == null ? void 0 : _b.recalc();
            message("Stok diupdate: " + v.name);
          });
        }
      };
      events2 = {};
      actions2 = {};
      lib_barang_default = __spreadProps(__spreadValues({}, createLibAccessor("QFQxY0BKVWQ0elJkKTY5SSU6cUM")), {
        helper: helper2,
        events: events2,
        actions: actions2
      });
    }
  });

  // src/lib/lib-stok-barang.ts
  var libAccessor, helper3, events3, actions3, lib_stok_barang_default;
  var init_lib_stok_barang = __esm({
    "src/lib/lib-stok-barang.ts"() {
      init_lib_helper();
      init_lib_gudang();
      init_lib_barang();
      libAccessor = createLibAccessor(
        "RUNQRCkxQUk6JmhzOilQVjNJV28"
      ).lib;
      helper3 = {
        _gudangs: null,
        gudangs() {
          if (this._gudangs) return this._gudangs;
          let fieldNames = libAccessor().fields();
          this._gudangs = lib_gudang_default.lib().entries().filter((v) => fieldNames == null ? void 0 : fieldNames.includes(v.name));
          return this._gudangs;
        },
        createIfMissing(barangs) {
          barangs != null ? barangs : barangs = lib_barang_default.lib().entries();
          let entries = libAccessor().entries().map((v) => {
            var _a, _b;
            return (_b = (_a = v.field("Barang")) == null ? void 0 : _a[0]) == null ? void 0 : _b.id;
          });
          let missings = barangs.filter((v) => !entries.includes(v.id));
          return missings.map(
            (v) => libAccessor().create({
              Barang: [v],
              "Gambar utama": v.field("Gambar utama")
            })
          );
        },
        findEntries(barangs) {
          barangs != null ? barangs : barangs = lib_barang_default.lib().entries();
          this.createIfMissing(barangs);
          let ids = barangs.map((v) => v.id);
          return libAccessor().entries().filter((v) => {
            var _a, _b;
            return ids.includes((_b = (_a = v.field("Barang")) == null ? void 0 : _a[0]) == null ? void 0 : _b.id);
          });
        },
        updateStockBalance(e) {
          var _a, _b;
          e != null ? e : e = entry();
          let barang = (_b = (_a = e.field("Barang")) == null ? void 0 : _a[0]) != null ? _b : void 0;
          if (!barang) {
            return;
          }
          this.gudangs().forEach((gudang) => {
            let result = sql(
              `SELECT SUM(j."_Perubahan kuantitas") as total FROM "Item Jurnal Barang" j JOIN "Master Barang" b ON j.Barang = b.id WHERE j.removed = 0 AND j.Barang = '${barang.id}' AND j.Gudang = '${gudang.id}' `
            );
            result = result.asInt();
            result = result == 0 ? null : result;
            e.set(gudang.name, result);
          });
        },
        updateStok(barangs) {
          this.findEntries(barangs).forEach((v) => {
            var _a, _b;
            this.updateStockBalance(v);
            v.recalc();
            (_b = (_a = v.field("Barang")) == null ? void 0 : _a[0]) == null ? void 0 : _b.recalc();
            message("Stok diupdate: " + v.name);
          });
        }
      };
      events3 = {};
      actions3 = {};
      lib_stok_barang_default = {
        lib: libAccessor,
        helper: helper3,
        events: events3,
        actions: actions3
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
  var helper4, events4, actions4, lib_item_jurnal_barang_default;
  var init_lib_item_jurnal_barang = __esm({
    "src/lib/lib-item-jurnal-barang.ts"() {
      init_utils();
      init_lib_helper();
      helper4 = {
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
      events4 = {
        entry: {
          updated(e) {
            helper4.updateGambar(e);
          }
        }
      };
      actions4 = {
        entry: {
          recalculate() {
          }
        },
        library: {
          recalculate() {
            recalculateEntries(lib(), (e) => {
              helper4.updateGambar(e);
            });
          }
        }
      };
      lib_item_jurnal_barang_default = __spreadProps(__spreadValues({}, createLibAccessor("I2lTWGc0UFFxcTUxdi1kOUc6Rk0")), {
        events: events4,
        actions: actions4
      });
    }
  });

  // src/lib/lib-item-penjualan.ts
  var helper5, events5, actions5, lib_item_penjualan_default;
  var init_lib_item_penjualan = __esm({
    "src/lib/lib-item-penjualan.ts"() {
      init_lib_helper();
      helper5 = {
        updateGambar(e) {
          var _a, _b, _c;
          e != null ? e : e = entry();
          const gbr = (_c = (_b = (_a = e.field("Barang")) == null ? void 0 : _a[0]) == null ? void 0 : _b.images("Gambar utama")) == null ? void 0 : _c[0];
          if (gbr) {
            e.set("Gambar utama", [gbr]);
          } else {
            e.set("Gambar utama", null);
          }
        }
      };
      events5 = {
        entry: {
          updated(e) {
            helper5.updateGambar(e);
          }
        }
      };
      actions5 = {
        bulk: {}
      };
      lib_item_penjualan_default = __spreadProps(__spreadValues({}, createLibAccessor("RE4pK2hXUllyUlNtd1VRWjJrVG0")), {
        helper: helper5,
        events: events5,
        actions: actions5
      });
    }
  });

  // src/lib/lib-jurnal-barang.ts
  var events6, actions6, lib_jurnal_barang_default;
  var init_lib_jurnal_barang = __esm({
    "src/lib/lib-jurnal-barang.ts"() {
      init_lib_helper();
      init_lib_item_jurnal_barang();
      events6 = {
        entry: {
          deleted(e) {
            e != null ? e : e = entry();
            lib_item_jurnal_barang_default.lib().linksTo(e).forEach((i) => i.trash());
          }
        }
      };
      actions6 = {};
      lib_jurnal_barang_default = __spreadProps(__spreadValues({}, createLibAccessor("UHoqKEhMPDJkNyoteTllK3dFWlk")), {
        events: events6,
        actions: actions6
      });
    }
  });

  // src/lib/lib-item-pembelian.ts
  var helper6, events7, actions7, lib_item_pembelian_default;
  var init_lib_item_pembelian = __esm({
    "src/lib/lib-item-pembelian.ts"() {
      init_lib_helper();
      helper6 = {
        delete(e) {
          var _a, _b;
          e != null ? e : e = entry();
          e.trash();
          (_b = (_a = e.field("Item jurnal barang")) == null ? void 0 : _a[0]) == null ? void 0 : _b.trash();
        }
      };
      events7 = {
        entry: {
          deleted(e) {
            helper6.delete(e);
          }
        }
      };
      actions7 = {};
      lib_item_pembelian_default = __spreadProps(__spreadValues({}, createLibAccessor("KjxrIzRHVy0qQE1VM1I1MVsoNFk")), {
        helper: helper6,
        events: events7,
        actions: actions7
      });
    }
  });

  // src/lib/lib-pembelian.ts
  var helper7, events8, actions8, lib_pembelian_default;
  var init_lib_pembelian = __esm({
    "src/lib/lib-pembelian.ts"() {
      init_lib_helper();
      init_lib_item_pembelian();
      helper7 = {
        delete(e) {
          e != null ? e : e = entry();
          e.trash();
          lib_item_pembelian_default.lib().linksTo(e).forEach((v) => lib_item_pembelian_default.helper.delete(v));
        }
      };
      events8 = {
        entry: {
          deleted(e) {
            helper7.delete(e);
          }
        }
      };
      actions8 = {};
      lib_pembelian_default = __spreadProps(__spreadValues({}, createLibAccessor("UW1DRlZVK1hPZmZWPGt5UkJ0ZiE")), {
        helper: helper7,
        events: events8,
        actions: actions8
      });
    }
  });

  // src/lib/lib-penjualan.ts
  var helper8, events9, actions9, lib_penjualan_default;
  var init_lib_penjualan = __esm({
    "src/lib/lib-penjualan.ts"() {
      init_lib_helper();
      init_lib_item_jurnal_barang();
      init_lib_item_penjualan();
      init_lib_jurnal_barang();
      init_lib_pembelian();
      init_lib_item_pembelian();
      helper8 = {
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
        },
        createPembelian(e) {
          let penjualan = e.field("Pesanan Penjualan");
          if (!penjualan) {
            message("Pesanan Penjualan is empty");
            return null;
          }
          let catatan = e.field("Catatan");
          let barang = e.field("Barang");
          let harga = e.field("Harga Satuan");
          let jumlah = e.field("Kuantitas");
          let gambar = e.field("Gambar utama");
          let tanggal = penjualan[0].field("Tanggal");
          if (barang && barang.length > 0) {
            if (barang[0].field("Jenis") == "Jasa") return null;
          }
          let pembelian = lib_pembelian_default.lib().create({
            "Pesanan Penjualan": penjualan,
            Deskripsi: catatan,
            _Thumbnail: gambar,
            Tanggal: tanggal,
            "Baris nomor": e.field("Baris Nomor")
          });
          let itemPembelian = lib_item_pembelian_default.lib().create({
            "Pesanan pembelian": [pembelian],
            Catatan: catatan,
            Barang: barang,
            Kuantitas: jumlah,
            "Gambar utama": gambar,
            "Harga Satuan": harga
          });
          itemPembelian.recalc();
          pembelian.recalc();
          return pembelian;
        }
      };
      events9 = {};
      actions9 = {
        entry: {
          buatPembelian(e) {
            e != null ? e : e = entry();
            const items = lib_item_penjualan_default.lib().linksTo(e);
            items.forEach((item) => {
              helper8.createPembelian(item);
            });
            if (items) message(items.length + " pembelian berhasil dibuat");
          },
          hapusPembelian(e) {
            e != null ? e : e = entry();
            lib_pembelian_default.lib().linksTo(e).forEach((pembelian) => {
              lib_item_pembelian_default.lib().linksTo(pembelian).forEach((item) => item.trash());
              pembelian.trash();
            });
          }
        }
      };
      lib_penjualan_default = __spreadProps(__spreadValues({}, createLibAccessor("WCN6aFtvRkxPUig1PitlPHdJNiE")), {
        helper: helper8,
        events: events9,
        actions: actions9
      });
    }
  });

  // src/lib/lib-item-rakitan.ts
  var helper9, events10, actions10, lib_item_rakitan_default;
  var init_lib_item_rakitan = __esm({
    "src/lib/lib-item-rakitan.ts"() {
      init_lib_helper();
      helper9 = {};
      events10 = {
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
      actions10 = {};
      lib_item_rakitan_default = __spreadProps(__spreadValues({}, createLibAccessor("JVBtMUppVGxvUCFYbFNlOyhOQGY")), {
        helper: helper9,
        events: events10,
        actions: actions10
      });
    }
  });

  // src/lib/lib-rakitan.ts
  var helper10, events11, actions11, lib_rakitan_default;
  var init_lib_rakitan = __esm({
    "src/lib/lib-rakitan.ts"() {
      init_lib_gudang();
      init_lib_helper();
      init_lib_item_jurnal_barang();
      init_lib_item_rakitan();
      init_lib_jurnal_barang();
      helper10 = {};
      events11 = {};
      actions11 = {
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
        helper: helper10,
        events: events11,
        actions: actions11
      });
    }
  });

  // src/lib/index.ts
  var init_lib = __esm({
    "src/lib/index.ts"() {
      init_lib_stok_barang();
      init_lib_penjualan();
      init_lib_item_penjualan();
      init_lib_pembelian();
      init_lib_item_pembelian();
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
        libStokBarang: lib_stok_barang_default,
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
