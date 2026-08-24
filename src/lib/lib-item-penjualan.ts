// import libJurnalItem from "./lib-jurnal-item";
import type * as Field from "@/types/memento/fields";
import type { LibHelper } from "./lib-helper";
import type { Penjualan } from "./lib-penjualan";
import type { Barang } from "./lib-barang";

// export default function libItemPenjualan() {
//   if (libItemPenjualan.id) return libById(libItemPenjualan.id);
//   return libByName(libItemPenjualan.name);
// }

// libItemPenjualan.name = "Item penjualan";
// libItemPenjualan.id = "SmpxUWFTSUEhPj5XckZUTSp6Y0M";

// libItemPenjualan.events = {
//   entryDeleted() {
//     libJurnalItem()
//       ?.linksTo(entry())
//       .forEach((e) => e.trash());
//   },
// };
export type ItemPenjualan = {
  "Pesanan Penjualan": Field.LinkToEntry<Penjualan>;
  Barang: Field.LinkToEntry<Barang>;
  Kuantitas: Field.Integer;
  "Harga Satuan": Field.Currency;
  Diskon: Field.Currency;
  Subtotal: Field.Calculation<Field.Integer>;
};

export default {
  name: "Item Penjualan",
  id: "RE4pK2hXUllyUlNtd1VRWjJrVG0",

  lib() {
    return (
      libById(this.id) ??
      (() => {
        throw new Error(`Library with id ${this.id} not found`);
      })()
    );
  },
} satisfies LibHelper<ItemPenjualan>;
