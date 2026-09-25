import type { Entry, Field } from "@/types/memento";
import type { ActionHandlers, EventHandlers, LibHelper } from "./lib-helper";
import { createLibAccessor } from "./lib-helper";
import type { Pembelian } from "./lib-pembelian";
import type { Barang } from "./lib-barang";
import type { ItemJurnalBarang } from "./lib-item-jurnal-barang";
import libItemJurnalBarang from "./lib-item-jurnal-barang";
import libStokBarang from "./lib-stok-barang";

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
  deleteEntry(e: Entry<ItemPembelian>) {
    e.trash();

    const itemJurnal = e.field("Item jurnal barang")?.[0];
    if (itemJurnal) {
      libItemJurnalBarang.helper.deleteEntry(itemJurnal);
    }
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
} satisfies EventHandlers<ItemPembelian>;
const actions = {} satisfies ActionHandlers<ItemPembelian>;

export default {
  ...createLibAccessor("KjxrIzRHVy0qQE1VM1I1MVsoNFk"),
  helper,
  events,
  actions,
} satisfies LibHelper<ItemPembelian>;
