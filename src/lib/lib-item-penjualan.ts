import type { Field } from "@/types/memento";
import type { Barang } from "./lib-barang";
import {
  createLibAccessor,
  createLibhelper,
  type libEvents,
} from "./lib-helper";
import type { Penjualan } from "./lib-penjualan";

export type ItemPenjualan = {
  "Pesanan Penjualan": Field.LinkToEntry<Penjualan>;
  Barang: Field.LinkToEntry<Barang>;
  Kuantitas: Field.Integer;
  "Harga Satuan": Field.Currency;
  Diskon: Field.Currency;
  Subtotal: Field.Calculation<Field.Integer>;
  "Gambar utama"?: Field.Image;
};

export default createLibhelper(
  createLibAccessor<ItemPenjualan>("RE4pK2hXUllyUlNtd1VRWjJrVG0"),
  {
    events: {
      entryUpdated(e) {
        e ??= entry();
        const gbr = e.field("Barang")?.[0]?.images("Gambar utama")?.[0];
        if (gbr) {
          e.set("Gambar utama", [gbr]);
        } else {
          e.set("Gambar utama", null);
        }
      },
    } satisfies libEvents<ItemPenjualan>,
  },
);
