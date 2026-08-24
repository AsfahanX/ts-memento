import type { LibHelper } from "./lib-helper";
import type * as Field from "@/types/memento/fields";
import libItemJurnalBarang from "./lib-item-jurnal-barang";
import type { Rakitan } from "./lib-rakitan";
import type { Gudang } from "./lib-gudang";
import type { Penjualan } from "./lib-penjualan";

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

export default {
  name: "Pesanan Pembelian",
  id: "UHoqKEhMPDJkNyoteTllK3dFWlk",
  _lib: undefined,

  lib() {
    this._lib ??=
      libById(this.id) ??
      (() => {
        throw new Error(`Library with id ${this.id} not found`);
      })();

    return this._lib;
  },

  events: {
    entry: {
      deleted(e) {
        e ??= entry();
        libItemJurnalBarang
          .lib()
          ?.linksTo(e)
          .forEach((i) => i.trash());
      },
    },
  },
} satisfies LibHelper<JurnalBarang>;
