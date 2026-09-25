import type { Entry, Field } from "@/types/memento";
import type { ActionHandlers, EventHandlers, LibHelper } from "./lib-helper";
import { createLibAccessor } from "./lib-helper";
import type { Pembelian } from "./lib-pembelian";
import type { Barang } from "./lib-barang";
import type { ItemJurnalBarang } from "./lib-item-jurnal-barang";

export type ItemPembelian = {
  // Nama: Field.Text;
  "Pesanan pembelian": Field.LinkToEntry<Pembelian>;
  Catatan: Field.Text;
  Barang: Field.LinkToEntry<Barang>;
  Kuantitas: Field.Integer;
  "Harga Satuan": Field.Currency;
  "Gambar utama"?: Field.Image;

  "Item jurnal barang"?: Field.LinkToEntry<ItemJurnalBarang>;
};

const helper = {
  delete(e?: Entry<ItemPembelian>) {
    e ??= entry();
    e.trash();
    e.field("Item jurnal barang")?.[0]?.trash();
  },
};

const events = {
  entry: {
    deleted(e) {
      helper.delete(e);
    },
  },
} satisfies EventHandlers<ItemPembelian>;
const actions = {} satisfies ActionHandlers<ItemPembelian>;

export default {
  ...createLibAccessor("KjxrIzRHVy0qQE1VM1I1MVsoNFk"),
  helper,
  events,
  actions,
} satisfies LibHelper<ItemPembelian>;
