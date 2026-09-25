import type { Entry, Field, Library } from "@/types/memento";
import type { ActionHandlers, EventHandlers, LibHelper } from "./lib-helper";
import { createLibAccessor } from "./lib-helper";
import type { Barang } from "./lib-barang";
import type { Gudang } from "./lib-gudang";
import libGudang from "./lib-gudang";
import libBarang from "./lib-barang";
import { withProgress } from "@/utils";

export type StokBarang = {
  Barang: Field.LinkToEntry<Barang>;
  "Gambar utama": Field.Image;
};

const libAccessor = createLibAccessor<StokBarang>(
  "RUNQRCkxQUk6JmhzOilQVjNJV28",
).lib;

const helper = {
  _queuedItems: {} as Record<string, boolean>,
  enqueueStockUpdate(barangs: Entry<Barang>[]) {
    barangs.forEach((v) => (this._queuedItems[v.id] = true));
  },
  startQueuedStockUpdate(barangs?: Entry<Barang>[]) {
    if (barangs) this.enqueueStockUpdate(barangs);

    const ids = Object.keys(this._queuedItems);
    const entries = libAccessor()
      .entries()
      .filter((v) => ids.includes(v.field("Barang")?.[0]?.id));

    if (entries.length == 1) {
      const v = entries[0];
      this.updateStockBalance(v);
      v.recalc();
      v.field("Barang")?.[0]?.recalc();
      message("Stok diupdate: " + v.name);
    }

    if (entries.length > 1) {
      withProgress(
        entries,
        (v) => {
          this.updateStockBalance(v);
          v.recalc();
          v.field("Barang")?.[0]?.recalc();
        },
        "Updating stock balances...",
      );
    }

    this._queuedItems = {};
  },
  _gudangs: null as Entry<Gudang>[] | null,
  gudangs() {
    if (this._gudangs) return this._gudangs;

    // let libStokBarang = libById("RUNQRCkxQUk6JmhzOilQVjNJV28");
    // let libGudang = libById("XSNaUEFQbWdzWHBnJXVdNXZUTlE");
    let fieldNames = libAccessor().fields();

    this._gudangs = libGudang
      .lib()
      .entries()
      .filter((v) => fieldNames?.includes(v.name));
    return this._gudangs;
  },

  createIfMissing(barangs?: Entry<Barang>[]) {
    // let libBarang = libById("QFQxY0BKVWQ0elJkKTY5SSU6cUM");
    // let libStokBarang = libById("RUNQRCkxQUk6JmhzOilQVjNJV28");

    barangs ??= libBarang.lib().entries();
    let entries = libAccessor()
      .entries()
      .map((v) => v.field("Barang")?.[0]?.id);

    let missings = barangs.filter((v) => !entries.includes(v.id));

    // log(missings.length);
    return missings.map((v) =>
      libAccessor().create({
        Barang: [v],
        "Gambar utama": v.field("Gambar utama"),
      }),
    );
  },

  findEntries(barangs?: Entry<Barang>[]) {
    // let libBarang = libById("QFQxY0BKVWQ0elJkKTY5SSU6cUM");
    // let libStokBarang = libById("RUNQRCkxQUk6JmhzOilQVjNJV28");

    barangs ??= libBarang.lib().entries();
    this.createIfMissing(barangs);
    let ids = barangs.map((v) => v.id);

    return libAccessor()
      .entries()
      .filter((v) => ids.includes(v.field("Barang")?.[0]?.id));
  },

  updateStockBalance(e?: Entry<StokBarang>) {
    e ??= entry();
    let barang = e.field("Barang")?.[0] ?? undefined;
    if (!barang) {
      return;
    }

    this.gudangs().forEach((gudang) => {
      let result = sql(
        'SELECT SUM(j."_Perubahan kuantitas") as total ' +
          'FROM "Item Jurnal Barang" j ' +
          'JOIN "Master Barang" b ' +
          "ON j.Barang = b.id " +
          "WHERE j.removed = 0 " +
          `AND j.Barang = '${barang.id}' ` +
          `AND j.Gudang = '${gudang.id}' `,
      );
      result = result.asInt();
      result = result == 0 ? null : result;

      e.set(gudang.name, result);
    });
  },

  updateStok(barangs?: Entry<Barang>[]) {
    // let barangs = items.map((v) => v.field("Barang")?.[0]);

    this.findEntries(barangs).forEach((v) => {
      this.updateStockBalance(v);
      v.recalc();
      v.field("Barang")?.[0]?.recalc();
      message("Stok diupdate: " + v.name);
    });
  },
};

const events = {} satisfies EventHandlers<StokBarang>;
const actions = {} satisfies ActionHandlers<StokBarang>;

export default {
  lib: libAccessor,
  helper,
  events,
  actions,
} satisfies LibHelper<StokBarang>;
