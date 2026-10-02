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

  // src/lib/lib-akun.ts
  var libAccessor, helper, events, actions, widgets, lib_akun_default;
  var init_lib_akun = __esm({
    "src/lib/lib-akun.ts"() {
      init_lib_helper();
      libAccessor = createLibAccessor("LUspPFBocGZsVj5tc0RNOU9VLU8").lib;
      helper = {};
      events = {};
      actions = {};
      widgets = {};
      lib_akun_default = {
        lib: libAccessor,
        helper,
        events,
        actions,
        widgets
      };
    }
  });

  // src/lib/lib-item-jurnal.ts
  var libAccessor2, helper2, events2, actions2, widgets2, lib_item_jurnal_default;
  var init_lib_item_jurnal = __esm({
    "src/lib/lib-item-jurnal.ts"() {
      init_lib_helper();
      libAccessor2 = createLibAccessor(
        "UnAlRnV3bHBPUlFXS1VyME9vRUY"
      ).lib;
      helper2 = {};
      events2 = {};
      actions2 = {};
      widgets2 = {};
      lib_item_jurnal_default = {
        lib: libAccessor2,
        helper: helper2,
        events: events2,
        actions: actions2,
        widgets: widgets2
      };
    }
  });

  // src/lib/lib-jurnal.ts
  var libAccessor3, helper3, events3, actions3, widgets3, lib_jurnal_default;
  var init_lib_jurnal = __esm({
    "src/lib/lib-jurnal.ts"() {
      init_lib_helper();
      init_lib_akun();
      init_lib_item_jurnal();
      libAccessor3 = createLibAccessor(
        "SmpxUWFTSUEhPj5XckZUTSp6Y0M"
      ).lib;
      helper3 = {};
      events3 = {};
      actions3 = {
        library: {
          quickCreate() {
            dialog().view(widgets3.quickCreate()).show();
          }
        }
      };
      widgets3 = {
        quickCreate() {
          const akuns = lib_akun_default.lib().entries();
          const choices = akuns.map(({ name }) => name);
          const uiEditAmount = ui().edit("");
          const uiChoicesAkunDebit = ui().choiceBox(0, choices);
          const uiChoicesAkunKredit = ui().choiceBox(0, choices);
          return ui().layout([
            ui().text("Jumlah"),
            uiEditAmount,
            ui().text("Akun debit"),
            uiChoicesAkunDebit,
            ui().text("Akun kredit"),
            uiChoicesAkunKredit,
            ui().button(" Buat jurnal").icon("nova:add-circle-1.png").action(() => {
              const amount = parseFloat(uiEditAmount.text);
              const akunDebit = akuns[uiChoicesAkunDebit.selected];
              const akunKredit = akuns[uiChoicesAkunKredit.selected];
              const jurnal = libAccessor3().create({
                Jenis: "Jurnal manual",
                Tanggal: /* @__PURE__ */ new Date(),
                Judul: `Jurnal manual ${(/* @__PURE__ */ new Date()).toLocaleString()}`
              });
              lib_item_jurnal_default.lib().create({
                Jurnal: [jurnal],
                Posisi: "Debit",
                Akun: [akunDebit],
                Jumlah: amount
              });
              lib_item_jurnal_default.lib().create({
                Jurnal: [jurnal],
                Posisi: "Kredit",
                Akun: [akunKredit],
                Jumlah: amount
              });
              jurnal.show();
              return true;
            })
          ]);
        }
      };
      lib_jurnal_default = {
        lib: libAccessor3,
        helper: helper3,
        events: events3,
        actions: actions3,
        widgets: widgets3
      };
    }
  });

  // src/lib/lib-gudang.ts
  var events4, actions4, lib_gudang_default;
  var init_lib_gudang = __esm({
    "src/lib/lib-gudang.ts"() {
      init_lib_helper();
      events4 = {};
      actions4 = {};
      lib_gudang_default = __spreadProps(__spreadValues({}, createLibAccessor("XSNaUEFQbWdzWHBnJXVdNXZUTlE")), {
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
      helper4 = {
        // _gudangs: null as Entry<Gudang>[] | null,
        // gudangs() {
        //   if (this._gudangs) return this._gudangs;
        //   // let libStokBarang = libById("RUNQRCkxQUk6JmhzOilQVjNJV28");
        //   // let libGudang = libById("XSNaUEFQbWdzWHBnJXVdNXZUTlE");
        //   let fieldNames = libStokBarang.lib().fields();
        //   this._gudangs = libGudang
        //     .lib()
        //     .entries()
        //     .filter((v) => fieldNames?.includes(v.name));
        //   return this._gudangs;
        // },
        // createIfMissing(barangs?: Entry<Barang>[]) {
        //   // let libBarang = libById("QFQxY0BKVWQ0elJkKTY5SSU6cUM");
        //   // let libStokBarang = libById("RUNQRCkxQUk6JmhzOilQVjNJV28");
        //   barangs ??= libBarang.lib().entries();
        //   let entries = libStokBarang
        //     .lib()
        //     .entries()
        //     .map((v) => v.field("Barang")?.[0]?.id);
        //   let missings = barangs.filter((v) => !entries.includes(v.id));
        //   // log(missings.length);
        //   return missings.map((v) =>
        //     libStokBarang.lib().create({
        //       Barang: [v],
        //       "Gambar utama": v.field("Gambar utama"),
        //     }),
        //   );
        // },
        // findEntries(barangs?: Entry<Barang>[]) {
        //   // let libBarang = libById("QFQxY0BKVWQ0elJkKTY5SSU6cUM");
        //   // let libStokBarang = libById("RUNQRCkxQUk6JmhzOilQVjNJV28");
        //   barangs ??= libBarang.lib().entries();
        //   this.createIfMissing(barangs);
        //   let ids = barangs.map((v) => v.id);
        //   return libStokBarang
        //     .lib()
        //     .entries()
        //     .filter((v) => ids.includes(v.field("Barang")?.[0]?.id));
        // },
        // updateStockBalance(e?: Entry<StokBarang>) {
        //   e ??= entry();
        //   let barang = e.field("Barang")?.[0] ?? undefined;
        //   if (!barang) {
        //     return;
        //   }
        //   this.gudangs().forEach((gudang) => {
        //     let result = sql(
        //       'SELECT SUM(j."_Perubahan kuantitas") as total ' +
        //         'FROM "Item Jurnal Barang" j ' +
        //         'JOIN "Master Barang" b ' +
        //         "ON j.Barang = b.id " +
        //         "WHERE j.removed = 0 " +
        //         `AND j.Barang = '${barang.id}' ` +
        //         `AND j.Gudang = '${gudang.id}' `,
        //     );
        //     result = result.asInt();
        //     result = result == 0 ? null : result;
        //     e.set(gudang.name, result);
        //   });
        // },
        // updateStok(barangs?: Entry<Barang>[]) {
        //   // let barangs = items.map((v) => v.field("Barang")?.[0]);
        //   this.findEntries(barangs).forEach((v) => {
        //     this.updateStockBalance(v);
        //     v.recalc();
        //     v.field("Barang")?.[0]?.recalc();
        //     message("Stok diupdate: " + v.name);
        //   });
        // },
      };
      events5 = {};
      actions5 = {};
      lib_barang_default = __spreadProps(__spreadValues({}, createLibAccessor("QFQxY0BKVWQ0elJkKTY5SSU6cUM")), {
        helper: helper4,
        events: events5,
        actions: actions5
      });
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
    for (let i = 0; i < items.length; i++) {
      callback == null ? void 0 : callback(items[i], i);
      showNotif(id, title, `${i + 1} of ${total}`);
    }
    showNotif(id, "Finisehd " + title, `${total} of ${total}`);
    message(`Finished ${title}. ${total} of ${total}`);
  }
  var init_utils = __esm({
    "src/utils.ts"() {
    }
  });

  // src/lib/lib-stok-barang.ts
  var libAccessor4, helper5, events6, actions6, lib_stok_barang_default;
  var init_lib_stok_barang = __esm({
    "src/lib/lib-stok-barang.ts"() {
      init_lib_helper();
      init_lib_gudang();
      init_lib_barang();
      init_utils();
      libAccessor4 = createLibAccessor(
        "RUNQRCkxQUk6JmhzOilQVjNJV28"
      ).lib;
      helper5 = {
        _queuedItems: {},
        enqueueStockUpdate(barangs) {
          barangs.forEach((v) => this._queuedItems[v.id] = true);
        },
        startQueuedStockUpdate(barangs) {
          var _a, _b;
          if (barangs) this.enqueueStockUpdate(barangs);
          const ids = Object.keys(this._queuedItems);
          const entries = libAccessor4().entries().filter((v) => {
            var _a2, _b2;
            return ids.includes((_b2 = (_a2 = v.field("Barang")) == null ? void 0 : _a2[0]) == null ? void 0 : _b2.id);
          });
          if (entries.length == 1) {
            const v = entries[0];
            this.updateStockBalance(v);
            v.recalc();
            (_b = (_a = v.field("Barang")) == null ? void 0 : _a[0]) == null ? void 0 : _b.recalc();
            message("Stok diupdate: " + v.name);
          }
          if (entries.length > 1) {
            withProgress(
              entries,
              (v) => {
                var _a2, _b2;
                this.updateStockBalance(v);
                v.recalc();
                (_b2 = (_a2 = v.field("Barang")) == null ? void 0 : _a2[0]) == null ? void 0 : _b2.recalc();
              },
              "Updating stock balances..."
            );
          }
          this._queuedItems = {};
        },
        _gudangs: null,
        gudangs() {
          if (this._gudangs) return this._gudangs;
          let fieldNames = libAccessor4().fields();
          this._gudangs = lib_gudang_default.lib().entries().filter((v) => fieldNames == null ? void 0 : fieldNames.includes(v.name));
          return this._gudangs;
        },
        createIfMissing(barangs) {
          barangs != null ? barangs : barangs = lib_barang_default.lib().entries();
          let entries = libAccessor4().entries().map((v) => {
            var _a, _b;
            return (_b = (_a = v.field("Barang")) == null ? void 0 : _a[0]) == null ? void 0 : _b.id;
          });
          let missings = barangs.filter((v) => !entries.includes(v.id));
          return missings.map(
            (v) => libAccessor4().create({
              Barang: [v],
              "Gambar utama": v.field("Gambar utama")
            })
          );
        },
        findEntries(barangs) {
          barangs != null ? barangs : barangs = lib_barang_default.lib().entries();
          this.createIfMissing(barangs);
          let ids = barangs.map((v) => v.id);
          return libAccessor4().entries().filter((v) => {
            var _a, _b;
            return ids.includes((_b = (_a = v.field("Barang")) == null ? void 0 : _a[0]) == null ? void 0 : _b.id);
          });
        },
        updateStockBalance(e) {
          var _a, _b;
          e != null ? e : e = entry();
          let barang2 = (_b = (_a = e.field("Barang")) == null ? void 0 : _a[0]) != null ? _b : void 0;
          if (!barang2) {
            return;
          }
          const gudangs = this.gudangs().map((gudang) => {
            let result = sql(
              `SELECT SUM(j."_Perubahan kuantitas") as total FROM "Item Jurnal Barang" j JOIN "Master Barang" b ON j.Barang = b.id WHERE j.removed = 0 AND j.Barang = '${barang2.id}' AND j.Gudang = '${gudang.id}' `
            );
            result = result.asInt();
            result = result == 0 ? null : result;
            e.set(gudang.name, result);
            return { gudang, result };
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
      events6 = {};
      actions6 = {};
      lib_stok_barang_default = {
        lib: libAccessor4,
        helper: helper5,
        events: events6,
        actions: actions6
      };
    }
  });

  // src/lib/lib-item-jurnal-barang.ts
  var helper6, events7, actions7, lib_item_jurnal_barang_default;
  var init_lib_item_jurnal_barang = __esm({
    "src/lib/lib-item-jurnal-barang.ts"() {
      init_utils();
      init_lib_helper();
      init_lib_stok_barang();
      helper6 = {
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
        },
        deleteEntry(e) {
          e.trash();
          lib_stok_barang_default.helper.enqueueStockUpdate(e.field("Barang"));
        }
      };
      events7 = {
        entry: {
          created(e) {
            e != null ? e : e = entry();
            helper6.updateGambar(e);
            lib_stok_barang_default.helper.startQueuedStockUpdate(e.field("Barang"));
          },
          updated(e) {
            e != null ? e : e = entry();
            helper6.updateGambar(e);
            lib_stok_barang_default.helper.startQueuedStockUpdate(e.field("Barang"));
          },
          deleted(e) {
            e != null ? e : e = entry();
            helper6.deleteEntry(e);
            lib_stok_barang_default.helper.startQueuedStockUpdate();
          }
        }
      };
      actions7 = {
        entry: {
          recalculate() {
          }
        },
        library: {
          recalculate() {
            recalculateEntries(lib(), (e) => {
              helper6.updateGambar(e);
            });
          }
        }
      };
      lib_item_jurnal_barang_default = __spreadProps(__spreadValues({}, createLibAccessor("I2lTWGc0UFFxcTUxdi1kOUc6Rk0")), {
        helper: helper6,
        events: events7,
        actions: actions7
      });
    }
  });

  // src/lib/lib-item-penjualan.ts
  var helper7, events8, actions8, lib_item_penjualan_default;
  var init_lib_item_penjualan = __esm({
    "src/lib/lib-item-penjualan.ts"() {
      init_lib_helper();
      init_lib_item_jurnal_barang();
      init_lib_stok_barang();
      helper7 = {
        deleteEntry(e, deleteRelatedJurnal) {
          var _a;
          if (deleteRelatedJurnal) {
            const itemJurnal = (_a = lib_item_jurnal_barang_default.lib().linksTo(e)) == null ? void 0 : _a[0];
            if (itemJurnal) {
              lib_item_jurnal_barang_default.helper.deleteEntry(itemJurnal);
            }
          }
          e.trash();
        },
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
      events8 = {
        entry: {
          updated(e) {
            helper7.updateGambar(e);
          },
          deleted(e) {
            e != null ? e : e = entry();
            helper7.deleteEntry(e);
            lib_stok_barang_default.helper.startQueuedStockUpdate();
          }
        }
      };
      actions8 = {
        bulk: {}
      };
      lib_item_penjualan_default = __spreadProps(__spreadValues({}, createLibAccessor("RE4pK2hXUllyUlNtd1VRWjJrVG0")), {
        helper: helper7,
        events: events8,
        actions: actions8
      });
    }
  });

  // src/lib/lib-jurnal-barang.ts
  var helper8, events9, actions9, lib_jurnal_barang_default;
  var init_lib_jurnal_barang = __esm({
    "src/lib/lib-jurnal-barang.ts"() {
      init_lib_helper();
      init_lib_item_jurnal_barang();
      init_lib_stok_barang();
      helper8 = {
        deleteEntry(e) {
          if (!e) return;
          const items = lib_item_jurnal_barang_default.lib().linksTo(e);
          items.forEach((v) => lib_item_jurnal_barang_default.helper.deleteEntry(v));
          e.trash();
        }
      };
      events9 = {
        entry: {
          deleted(e) {
            helper8.deleteEntry(e != null ? e : entry());
            lib_stok_barang_default.helper.startQueuedStockUpdate();
          }
        }
      };
      actions9 = {};
      lib_jurnal_barang_default = __spreadProps(__spreadValues({}, createLibAccessor("UHoqKEhMPDJkNyoteTllK3dFWlk")), {
        helper: helper8,
        events: events9,
        actions: actions9
      });
    }
  });

  // src/lib/lib-item-pembelian.ts
  var helper9, events10, actions10, lib_item_pembelian_default;
  var init_lib_item_pembelian = __esm({
    "src/lib/lib-item-pembelian.ts"() {
      init_lib_helper();
      init_lib_item_jurnal_barang();
      init_lib_stok_barang();
      init_lib_pembelian();
      helper9 = {
        deleteEntry(e, deleteRelatedJurnal) {
          var _a;
          if (deleteRelatedJurnal) {
            const itemJurnal = (_a = lib_item_jurnal_barang_default.lib().linksTo(e)) == null ? void 0 : _a[0];
            if (itemJurnal) {
              lib_item_jurnal_barang_default.helper.deleteEntry(itemJurnal);
            }
          }
          e.trash();
        },
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
      events10 = {
        entry: {
          // created(e) {
          //   e ??= entry();
          //   helper.updateGambar(e);
          //   const barang = e.field("Barang")?.[0];
          //   if (barang) {
          //     let itemJurnal = libItemJurnalBarang.lib().linksTo(e)?.[0];
          //     if (itemJurnal) {
          //       throw new Error(
          //         `Item jurnal barang sudah ada untuk item pembelian dengan id: ${e.id}`,
          //       );
          //     }
          //     itemJurnal = libItemJurnalBarang.lib().create({
          //       "Jurnal barang": [jurnalbarang],
          //       "Item pembelian": [e],
          //       Barang: [barang],
          //       Kuantitas: e.field("Kuantitas"),
          //       "Gambar utama": barang.images("Gambar utama"),
          //       Gudang: this.gudangDefault() ? [this.gudangDefault()] : undefined,
          //       Jenis: "Masuk",
          //     });
          //   }
          //   libStokBarang.helper.startQueuedStockUpdate();
          // },
          updated(e) {
            var _a, _b;
            e != null ? e : e = entry();
            helper9.updateGambar(e);
            const obj = {
              "Item pembelian": [e],
              // "Jurnal barang": [j],
              Kuantitas: e.field("Kuantitas"),
              Barang: e.field("Barang"),
              "Nilai stok": e.field("Subtotal"),
              "Gambar utama": e.field("Gambar utama"),
              Gudang: this.gudangDefault() ? [this.gudangDefault()] : void 0
            };
            let ij = (_a = lib_item_jurnal_barang_default.lib().linksTo(e)) == null ? void 0 : _a[0];
            if (ij) {
              ij.set("Kuantitas", e.field("Kuantitas"));
              ij.set("Barang", e.field("Barang"));
              ij.set("Nilai stok", e.field("Subtotal"));
            } else {
              const pembelian = (_b = e.field("Pesanan pembelian")) == null ? void 0 : _b[0];
              if (!pembelian) throw new Error("Item pembelian tidak memiliki parent");
              const j = lib_pembelian_default.helper.findOrCreateJurnal(pembelian);
              ij = lib_item_jurnal_barang_default.lib().create({
                "Item pembelian": [e],
                "Jurnal barang": [j],
                Kuantitas: e.field("Kuantitas"),
                Barang: e.field("Barang"),
                "Nilai stok": e.field("Subtotal"),
                "Gambar utama": barang.images("Gambar utama"),
                Gudang: this.gudangDefault() ? [this.gudangDefault()] : void 0
              });
            }
            lib_stok_barang_default.helper.startQueuedStockUpdate();
          },
          deleted(e) {
            e != null ? e : e = entry();
            helper9.deleteEntry(e);
            lib_stok_barang_default.helper.startQueuedStockUpdate();
          }
        }
      };
      actions10 = {};
      lib_item_pembelian_default = __spreadProps(__spreadValues({}, createLibAccessor("KjxrIzRHVy0qQE1VM1I1MVsoNFk")), {
        helper: helper9,
        events: events10,
        actions: actions10
      });
    }
  });

  // src/lib/lib-pembelian.ts
  var libAccessor5, helper10, events11, actions11, lib_pembelian_default;
  var init_lib_pembelian = __esm({
    "src/lib/lib-pembelian.ts"() {
      init_lib_helper();
      init_lib_item_pembelian();
      init_lib_stok_barang();
      init_lib_jurnal_barang();
      libAccessor5 = createLibAccessor(
        "UW1DRlZVK1hPZmZWPGt5UkJ0ZiE"
      ).lib;
      helper10 = {
        deleteEntry(e) {
          var _a, _b;
          lib_jurnal_barang_default.helper.deleteEntry(
            (_b = (_a = lib_jurnal_barang_default.lib().linksTo(e)) == null ? void 0 : _a[0]) != null ? _b : void 0
          );
          const items = lib_item_pembelian_default.lib().linksTo(e);
          items.forEach((v) => lib_item_pembelian_default.helper.deleteEntry(v, false));
          e.trash();
        },
        // updateGambar(e: Entry<Pembelian>) {
        //   // e ??= entry();
        //   // const gbr = e.field("Barang")?.[0]?.images("Gambar utama")?.[0];
        //   const firstItem = libItemPembelian.lib().linksTo(e)?.[0];
        //   const gbr = firstItem?.field("Barang")?.[0]?.field("Gambar utama") ?? null;
        //   e.set("Gambar utama", gbr);
        //   // if (gbr) {
        //   //   e.set("Gambar utama", [gbr]);
        //   // } else {
        //   //   e.set("Gambar utama", null);
        //   // }
        // },
        recalcEx(e) {
          var _a, _b;
          const items = lib_item_pembelian_default.lib().linksTo(e);
          const firstItem = items == null ? void 0 : items[0];
          let gambar = e.images("Gambar utama");
          if (!gambar.length && firstItem) {
            gambar = (_b = (_a = firstItem == null ? void 0 : firstItem.field("Barang")) == null ? void 0 : _a[0]) == null ? void 0 : _b.images("Gambar utama");
          }
          e.set("Gambar utama akhir", gambar);
          let judul = e.field("Judul");
          if (!judul && firstItem) {
            judul = firstItem.name;
            if (items.length > 1) {
              judul += `dan ${items.length - 1} item lainnya`;
            }
          }
          e.set("Judul akhir", judul);
        },
        findOrCreateJurnal(e) {
          var _a, _b;
          return (_b = (_a = lib_jurnal_barang_default.lib().linksTo(e)) == null ? void 0 : _a[0]) != null ? _b : lib_jurnal_barang_default.lib().create({
            "Pesanan pembelian": [e],
            Jenis: "Pembelian",
            Tanggal: e.field("Tanggal"),
            Keterangan: e.name,
            "Dibuat oleh sistem": true
          });
        }
      };
      events11 = {
        entry: {
          created(e) {
            e != null ? e : e = entry();
            helper10.recalcEx(e);
          },
          updated(e) {
            e != null ? e : e = entry();
            helper10.recalcEx(e);
          },
          deleted(e) {
            e != null ? e : e = entry();
            helper10.deleteEntry(e);
            lib_stok_barang_default.helper.startQueuedStockUpdate();
          }
        }
      };
      actions11 = {};
      lib_pembelian_default = {
        lib: libAccessor5,
        helper: helper10,
        events: events11,
        actions: actions11
      };
    }
  });

  // src/lib/util.ts
  function createItemsFromParagraph(text) {
    return text.split("\n").filter((v) => v.trim().length > 0).map((v) => {
      const tokens = v.trim().split(/^(.+)\s(\d+)$/);
      return {
        name: ((tokens == null ? void 0 : tokens.length) > 1 ? tokens[1] : tokens[0]).trim(),
        amount: tokens.length > 1 ? parseFloat(tokens[2]) * 1e3 : 0
      };
    });
  }
  var init_util = __esm({
    "src/lib/util.ts"() {
    }
  });

  // src/lib/lib-penjualan.ts
  var libAccessor6, helper11, events12, actions12, widgets4, lib_penjualan_default;
  var init_lib_penjualan = __esm({
    "src/lib/lib-penjualan.ts"() {
      init_lib_helper();
      init_lib_item_jurnal_barang();
      init_lib_item_penjualan();
      init_lib_jurnal_barang();
      init_lib_pembelian();
      init_lib_item_pembelian();
      init_lib_stok_barang();
      init_lib_gudang();
      init_util();
      libAccessor6 = createLibAccessor(
        "WCN6aFtvRkxPUig1PitlPHdJNiE"
      ).lib;
      helper11 = {
        _gudangDefault: null,
        gudangDefault() {
          var _a;
          if (!helper11._gudangDefault) {
            helper11._gudangDefault = (_a = lib_gudang_default.lib().find("[TS] - Stok \u{1F535}")) == null ? void 0 : _a[0];
          }
          return helper11._gudangDefault;
        },
        deleteEntry(e) {
          var _a, _b;
          lib_jurnal_barang_default.helper.deleteEntry(
            (_b = (_a = lib_jurnal_barang_default.lib().linksTo(e)) == null ? void 0 : _a[0]) != null ? _b : void 0
          );
          const items = lib_item_penjualan_default.lib().linksTo(e);
          items.forEach((v) => lib_item_penjualan_default.helper.deleteEntry(v, false));
          e.trash();
        },
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
            const barang2 = (_a2 = item.field("Barang")) == null ? void 0 : _a2[0];
            if (!barang2) return void 0;
            return {
              "Jurnal barang": [jurnal],
              Barang: [barang2],
              "Gambar barang": barang2.field("Gambar utama"),
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
          let barang2 = e.field("Barang");
          let harga = e.field("Harga Satuan");
          let jumlah = e.field("Kuantitas");
          let gambar = e.field("Gambar utama");
          let tanggal = penjualan[0].field("Tanggal");
          if (barang2 && barang2.length > 0) {
            if (barang2[0].field("Jenis") == "Jasa") return null;
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
            Barang: barang2,
            Kuantitas: jumlah,
            "Gambar utama": gambar,
            "Harga Satuan": harga
          });
          itemPembelian.recalc();
          pembelian.recalc();
          if (barang2) {
            const jurnalbarang = lib_jurnal_barang_default.lib().create({
              Jenis: "Pembelian",
              Tanggal: tanggal,
              Keterangan: pembelian.name,
              "Pesanan pembelian": [pembelian],
              "Dibuat oleh sistem": true
            });
            const itemJurnalBarang = lib_item_jurnal_barang_default.lib().create({
              "Jurnal barang": [jurnalbarang],
              "Item pembelian": [itemPembelian],
              Barang: barang2,
              Kuantitas: jumlah,
              "Gambar utama": gambar,
              Gudang: this.gudangDefault() ? [this.gudangDefault()] : void 0,
              Jenis: "Masuk"
            });
            lib_stok_barang_default.helper.enqueueStockUpdate(barang2);
          }
          return pembelian;
        },
        buatDariTeks(title, text) {
          const penjualan = libAccessor6().create({
            Tanggal: /* @__PURE__ */ new Date(),
            Keterangan: title
          });
          createItemsFromParagraph(text).forEach((v) => {
            lib_item_penjualan_default.lib().create({
              "Pesanan Penjualan": [penjualan],
              Kuantitas: 1,
              Catatan: v.name,
              "Harga Satuan": v.amount
            });
          });
          return penjualan;
        }
      };
      events12 = {
        entry: {
          deleted(e) {
            e != null ? e : e = entry();
            helper11.deleteEntry(e);
            lib_stok_barang_default.helper.startQueuedStockUpdate();
          }
        }
      };
      actions12 = {
        entry: {
          buatPembelian(e) {
            e != null ? e : e = entry();
            const items = lib_item_penjualan_default.lib().linksTo(e);
            items.forEach((item) => helper11.createPembelian(item));
            if (items) message(items.length + " pembelian berhasil dibuat");
            lib_stok_barang_default.helper.startQueuedStockUpdate();
          },
          hapusPembelian(e) {
            e != null ? e : e = entry();
            const pembelians = lib_pembelian_default.lib().linksTo(e);
            pembelians.forEach((v) => lib_pembelian_default.helper.deleteEntry(v));
            lib_stok_barang_default.helper.startQueuedStockUpdate();
          }
        },
        library: {
          buatDariTeks() {
            helper11.buatDariTeks(arg("Judul"), arg("teks"));
          }
        }
      };
      widgets4 = {
        quickCreate() {
          return ui().layout([
            ui().text("Judul:"),
            ui().edit("").tag("judul"),
            ui().text("Items:"),
            ui().edit("").tag("items"),
            ui().button("Buat dari teks").icon("nova:add-circle-1.png").action(function() {
              helper11.buatDariTeks(
                ui().findByTag("judul").text,
                ui().findByTag("items").text
              );
              return true;
            })
          ]);
        }
      };
      lib_penjualan_default = {
        lib: libAccessor6,
        helper: helper11,
        events: events12,
        actions: actions12,
        widgets: widgets4
      };
    }
  });

  // src/lib/lib-item-rakitan.ts
  var helper12, events13, actions13, lib_item_rakitan_default;
  var init_lib_item_rakitan = __esm({
    "src/lib/lib-item-rakitan.ts"() {
      init_lib_helper();
      helper12 = {};
      events13 = {
        entry: {
          updated(e) {
            var _a, _b, _c;
            e != null ? e : e = entry();
            const gbr = (_c = (_b = (_a = e.field("Barang")) == null ? void 0 : _a[0]) == null ? void 0 : _b.images("Gambar utama")) == null ? void 0 : _c[0];
            if (gbr) {
              e.set("Gambar", [gbr]);
            } else {
              e.set("Gambar", null);
            }
          }
        }
      };
      actions13 = {};
      lib_item_rakitan_default = __spreadProps(__spreadValues({}, createLibAccessor("JVBtMUppVGxvUCFYbFNlOyhOQGY")), {
        helper: helper12,
        events: events13,
        actions: actions13
      });
    }
  });

  // src/lib/lib-rakitan.ts
  var helper13, events14, actions14, lib_rakitan_default;
  var init_lib_rakitan = __esm({
    "src/lib/lib-rakitan.ts"() {
      init_lib_gudang();
      init_lib_helper();
      init_lib_item_jurnal_barang();
      init_lib_item_rakitan();
      init_lib_jurnal_barang();
      helper13 = {};
      events14 = {};
      actions14 = {
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
                const barang2 = (_a = item.field("Barang")) == null ? void 0 : _a[0];
                if (!barang2) return void 0;
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
        helper: helper13,
        events: events14,
        actions: actions14
      });
    }
  });

  // src/lib/index.ts
  var init_lib = __esm({
    "src/lib/index.ts"() {
      init_lib_akun();
      init_lib_jurnal();
      init_lib_item_jurnal();
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
      Object.assign(exports, {
        libAkun: lib_akun_default,
        libJurnal: lib_jurnal_default,
        libItemJurnal: lib_item_jurnal_default,
        libGudang: lib_gudang_default,
        libBarang: lib_barang_default,
        libPembelian: lib_pembelian_default,
        libItemPembelian: lib_item_pembelian_default,
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
