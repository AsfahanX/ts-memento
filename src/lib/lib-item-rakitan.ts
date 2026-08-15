import type * as Field from "@/types/memento/fields";

import { Barang } from "./lib-barang";
import { LibHelper } from "@/types";

export type ItemRakitan = {
  Perakitan: Field.LinkToEntry<ItemRakitan>;
  Barang: Field.LinkToEntry<Barang>;
  Kuantitas: Field.Integer;
  // 'Jurnal barang': Field.LinkToEntry<LibJurnalBarang>;
  //     'Gudang': Field.LinkToEntry<LibGudang>;
  //     'Perubahan kuantitas': Field.Integer
  //     'Gambar barang': Field.Image
};

export default {
  name: "Item Rakitan",
  id: "JVBtMUppVGxvUCFYbFNlOyhOQGY",

  lib() {
    return (
      libById(this.id) ??
      (() => {
        throw new Error(`Library with id ${this.id} not found`);
      })()
    );
  },
} satisfies LibHelper<ItemRakitan>;
