import type { Field } from "@/types/memento";
import type { ActionHandlers, EventHandlers, LibHelper } from "./lib-helper";
import { createLibAccessor } from "./lib-helper";
import type { Pembelian } from "./lib-pembelian";
import type { Barang } from "./lib-barang";

export type ItemPembelian = {
  // Nama: Field.Text;
  "Pesanan pembelian": Field.LinkToEntry<Pembelian>;
  Catatan: Field.Text;
  Barang: Field.LinkToEntry<Barang>;
  Kuantitas: Field.Integer;
  "Harga Satuan": Field.Currency;
  "Gambar utama"?: Field.Image;
};

const helper = {};
const events = {} satisfies EventHandlers<ItemPembelian>;
const actions = {} satisfies ActionHandlers<ItemPembelian>;

export default {
  ...createLibAccessor("KjxrIzRHVy0qQE1VM1I1MVsoNFk"),
  helper,
  events,
  actions,
} satisfies LibHelper<ItemPembelian>;
