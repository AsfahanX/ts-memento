import type { Field } from "@/types/memento";
import type { Gudang } from "./lib-gudang";
import { createLibAccessor, createLibhelper, libEvents } from "./lib-helper";
import libItemJurnalBarang from "./lib-item-jurnal-barang";
import type { Penjualan } from "./lib-penjualan";
import type { Rakitan } from "./lib-rakitan";

export type JurnalBarang = {
  Jenis?: Field.SingleChoice<
    "Penyesuaian persediaan" | "Pembelian" | "Penjualan"
  >;
  Tanggal?: Field.Date;
  Keterangan?: Field.Text;
  Rakitan?: Field.LinkToEntry<Rakitan>;
  Penjualan?: Field.LinkToEntry<Penjualan>;

  "Gudang Asal"?: Field.LinkToEntry<Gudang>;
  "Gudang Tujuan"?: Field.LinkToEntry<Gudang>;
};

// export default {
//   name: "Pesanan Pembelian",
//   id: "UHoqKEhMPDJkNyoteTllK3dFWlk",
//   _lib: undefined,

//   lib() {
//     this._lib ??=
//       libById(this.id) ??
//       (() => {
//         throw new Error(`Library with id ${this.id} not found`);
//       })();

//     return this._lib;
//   },

//   events: {
//     entry: {
//       deleted(e) {
//         e ??= entry();
//         libItemJurnalBarang
//           .lib()
//           ?.linksTo(e)
//           .forEach((i) => i.trash());
//       },
//     },
//   },
// } satisfies LibHelper<JurnalBarang>;

export default createLibhelper(
  createLibAccessor<JurnalBarang>("UHoqKEhMPDJkNyoteTllK3dFWlk"),
  {
    events: {
      entryDeleted(e) {
        e ??= entry();
        libItemJurnalBarang.lib?.linksTo(e).forEach((i) => i.trash());
      },
    } satisfies libEvents<JurnalBarang>,
  },
);
