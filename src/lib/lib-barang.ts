import type { Entry, Field } from "@/types/memento";
import type { ActionHandlers, EventHandlers, LibHelper } from "./lib-helper";
import { createLibAccessor } from "./lib-helper";
import libGudang, { type Gudang } from "./lib-gudang";
import libBarang from "./lib-barang";
import libStokBarang, { type StokBarang } from "./lib-stok-barang";

export type Barang = {
  Jenis: Field.RadioButtons<"Barang" | "Jasa">;
  Nama: Field.Text;
  "Nama tampilan": Field.Text;
  "Gambar utama": Field.Image;
};

const helper = {
  _gudangs: null as Entry<Gudang>[] | null,
  gudangs() {
    if (this._gudangs) return this._gudangs;

    // let libStokBarang = libById("RUNQRCkxQUk6JmhzOilQVjNJV28");
    // let libGudang = libById("XSNaUEFQbWdzWHBnJXVdNXZUTlE");
    let fieldNames = libStokBarang.lib().fields();

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
    let entries = libStokBarang
      .lib()
      .entries()
      .map((v) => v.field("Barang")?.[0]?.id);

    let missings = barangs.filter((v) => !entries.includes(v.id));

    // log(missings.length);
    return missings.map((v) =>
      libStokBarang.lib().create({
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

    return libStokBarang
      .lib()
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

const events = {} satisfies EventHandlers<Barang>;
const actions = {} satisfies ActionHandlers<Barang>;

export default {
  ...createLibAccessor("QFQxY0BKVWQ0elJkKTY5SSU6cUM"),
  helper,
  events,
  actions,
} satisfies LibHelper<Barang>;
