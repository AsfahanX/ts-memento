import type { Field } from "@/types/memento";
import type { Barang } from "./lib-barang";
import type { ActionHandlers, EventHandlers, LibHelper } from "./lib-helper";
import { createLibAccessor } from "./lib-helper";
import type { Penjualan } from "./lib-penjualan";

export type ItemPenjualan = {
  "Pesanan Penjualan": Field.LinkToEntry<Penjualan>;
  Barang: Field.LinkToEntry<Barang>;
  Kuantitas: Field.Integer;
  "Harga Satuan": Field.Currency;
  Diskon: Field.Currency;
  Subtotal: Field.Calculation<Field.Integer>;
  "Gambar utama"?: Field.Image;
  "Harga pokok penjualan"?: Field.Currency;
  "Total harga pokok penjualan"?: Field.Calculation<number>;
};

const helper = {};
const events = {
  entry: {
    updated(e) {
      e ??= entry();
      const gbr = e.field("Barang")?.[0]?.images("Gambar utama")?.[0];
      if (gbr) {
        e.set("Gambar utama", [gbr]);
      } else {
        e.set("Gambar utama", null);
      }
    },
  },
} satisfies EventHandlers<ItemPenjualan>;
const actions = {} satisfies ActionHandlers<ItemPenjualan>;

export default {
  ...createLibAccessor("RE4pK2hXUllyUlNtd1VRWjJrVG0"),
  helper,
  events,
  actions,
} satisfies LibHelper<ItemPenjualan>;
