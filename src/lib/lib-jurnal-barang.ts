import type { LibHelper } from "@/types";
import type * as Field from "@/types/memento/fields";
import libItemJurnalBarang from "./lib-item-jurnal-barang";
import type { Rakitan } from "./lib-rakitan";

export type JurnalBarang = {
  Jenis?: Field.SingleChoice<
    "Penyesuaian persediaan" | "Pembelian" | "Penjualan"
  >;
  Tanggal?: Field.Date;
  Keterangan?: Field.Text;
  Rakitan?: Field.LinkToEntry<Rakitan>;

  "Gudang Asal"?: Field.LinkToEntry<"Gudang">;
  "Gudang Tujuan"?: Field.LinkToEntry<"Gudang">;
};

export default {
  name: "Pesanan Pembelian",
  id: "UHoqKEhMPDJkNyoteTllK3dFWlk",

  lib() {
    return (
      libById(this.id) ??
      (() => {
        throw new Error(`Library with id ${this.id} not found`);
      })()
    );
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
