import type { Entry, Field } from "@/types/memento";
import type { ActionHandlers, EventHandlers, LibHelper } from "./lib-helper";
import { createLibAccessor } from "./lib-helper";
import { Penjualan } from "./lib-penjualan";
import libItemPembelian from "./lib-item-pembelian";

export type Pembelian = {
  // Nama: Field.Text;
  "Pesanan Penjualan": Field.LinkToEntry<Penjualan>;
  Deskripsi: Field.Text;
  _Thumbnail?: Field.Image;
  Tanggal: Field.Date;
  "Baris nomor"?: Field.Integer;
};

const helper = {
  delete(e?: Entry<Pembelian>) {
    e ??= entry();
    e.trash();
    libItemPembelian
      .lib()
      .linksTo(e)
      .forEach((v) => libItemPembelian.helper.delete(v));
  },
};
const events = {
  entry: {
    deleted(e) {
      helper.delete(e);
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
