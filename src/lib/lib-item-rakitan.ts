import type { Field } from "@/types/memento";
import { Barang } from "./lib-barang";
import {
  createLibAccessor,
  createLibhelper,
  type libEvents,
} from "./lib-helper";

export type ItemRakitan = {
  Perakitan: Field.LinkToEntry<ItemRakitan>;
  Barang: Field.LinkToEntry<Barang>;
  Kuantitas: Field.Integer;
  // 'Jurnal barang': Field.LinkToEntry<LibJurnalBarang>;
  //     'Gudang': Field.LinkToEntry<LibGudang>;
  //     'Perubahan kuantitas': Field.Integer
  "Gambar utama": Field.Image;
};

export default createLibhelper(
  createLibAccessor<ItemRakitan>("JVBtMUppVGxvUCFYbFNlOyhOQGY"),
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
    } satisfies libEvents<ItemRakitan>,
  },
);
