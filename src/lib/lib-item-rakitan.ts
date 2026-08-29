import type { Field } from "@/types/memento";
import { Barang } from "./lib-barang";
import type { ActionHandlers, EventHandlers, LibHelper } from "./lib-helper";
import { createLibAccessor } from "./lib-helper";

export type ItemRakitan = {
  Perakitan: Field.LinkToEntry<ItemRakitan>;
  Barang: Field.LinkToEntry<Barang>;
  Kuantitas: Field.Integer;
  // 'Jurnal barang': Field.LinkToEntry<LibJurnalBarang>;
  //     'Gudang': Field.LinkToEntry<LibGudang>;
  //     'Perubahan kuantitas': Field.Integer
  "Gambar utama": Field.Image;
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
} satisfies EventHandlers<ItemRakitan>;
const actions = {} satisfies ActionHandlers<ItemRakitan>;

export default {
  ...createLibAccessor("JVBtMUppVGxvUCFYbFNlOyhOQGY"),
  helper,
  events,
  actions,
} satisfies LibHelper<ItemRakitan>;
