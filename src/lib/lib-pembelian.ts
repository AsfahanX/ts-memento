import type { Field } from "@/types/memento";
import type { ActionHandlers, EventHandlers, LibHelper } from "./lib-helper";
import { createLibAccessor } from "./lib-helper";
import { Penjualan } from "./lib-penjualan";

export type Pembelian = {
  // Nama: Field.Text;
  "Pesanan Penjualan": Field.LinkToEntry<Penjualan>;
  Deskripsi: Field.Text;
  _Thumbnail?: Field.Image;
  Tanggal: Field.Date;
  "Baris nomor"?: Field.Integer;
};

const helper = {};
const events = {} satisfies EventHandlers<Pembelian>;
const actions = {} satisfies ActionHandlers<Pembelian>;

export default {
  ...createLibAccessor(""),
  helper,
  events,
  actions,
} satisfies LibHelper<Pembelian>;
