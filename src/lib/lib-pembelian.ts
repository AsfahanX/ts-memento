import type { Entry, Field } from "@/types/memento";
import type { ActionHandlers, EventHandlers, LibHelper } from "./lib-helper";
import { createLibAccessor } from "./lib-helper";
import { Penjualan } from "./lib-penjualan";
import libItemPembelian from "./lib-item-pembelian";
import libStokBarang from "./lib-stok-barang";
import libJurnalBarang, { type JurnalBarang } from "./lib-jurnal-barang";

export type Pembelian = {
  // Nama: Field.Text;
  "Pesanan Penjualan": Field.LinkToEntry<Penjualan>;
  Deskripsi: Field.Text;
  _Thumbnail?: Field.Image;
  Tanggal: Field.Date;
  "Baris nomor"?: Field.Integer;

  // "Jurnal barang"?: Field.LinkToEntry<JurnalBarang>;
};

const helper = {
  deleteEntry(e: Entry<Pembelian>) {
    libJurnalBarang.helper.deleteEntry(libJurnalBarang.lib().linksTo(e)?.[0]);

    libItemPembelian
      .lib()
      .linksTo(e)
      .forEach((v) => libItemPembelian.helper.deleteEntry(v));
    e.trash();
  },
};
const events = {
  entry: {
    deleted(e) {
      e ??= entry();
      helper.deleteEntry(e);
      libStokBarang.helper.startQueuedStockUpdate();
    },
  },
} satisfies EventHandlers<Pembelian>;
const actions = {} satisfies ActionHandlers<Pembelian>;

export default {
  ...createLibAccessor("UW1DRlZVK1hPZmZWPGt5UkJ0ZiE"),
  helper,
  events,
  actions,
} satisfies LibHelper<Pembelian>;
