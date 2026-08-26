import type * as Field from "@/types/memento/fields";

import { Barang } from "./lib-barang";
import {
  createLibAccessor,
  createLibhelper,
  type libEvents,
  type LibHelper,
} from "./lib-helper";
import type { Entry, Library } from "@/types/memento";

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
      entryUpdated(e = undefined) {
        e ??= entry();
        let gbr = e.field("Barang")?.[0]?.images("Gambar utama")?.[0];
        if (gbr) {
          e.set("Gambar utama", [gbr]);
        } else {
          e.set("Gambar utama", null);
        }
      },
    } satisfies libEvents<ItemRakitan>,
  },
);

// export default {
//   name: "Item Rakitan",
//   id: "JVBtMUppVGxvUCFYbFNlOyhOQGY",
//   _lib: null,

//   lib() {
//     this._lib;
//     return (
//       libById(this.id) ??
//       (() => {
//         throw new Error(`Library with id ${this.id} not found`);
//       })()
//     );
//   },
// } satisfies LibHelper<ItemRakitan>;
