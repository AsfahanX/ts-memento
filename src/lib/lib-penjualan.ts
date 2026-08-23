import type { LibHelper } from "./lib-helper";
import type * as Field from "@/types/memento/fields";
import type { Gudang } from "./lib-gudang";
import libJurnalBarang from "./lib-jurnal-barang";
// import LibHelper from "@/lib-helper";
// import { LibHelperNew } from "./lib-helper";
import { Entry } from "@/types/memento";

export type Penjualan = {
  Tanggal: Field.Date;
  Konsumen: Field.LinkToEntry;
  Keterangan: Field.Text;
  Catatan: Field.Text;
  // 'Status': Field.SingleChoice<"Draft" | "Dikirim" | "Dibatalkan" | "Selesai">;
  "Gambar utama": Field.Image;
  Garansi: Field.Integer;

  "Gudang sumber": Field.LinkToEntry<Gudang>;
};

const libPenjualan = {
  name: "Pesanan Penjualan",
  id: "WCN6aFtvRkxPUig1PitlPHdJNiE",

  lib() {
    return (
      libById(this.id) ??
      (() => {
        throw new Error(`Library with id ${this.id} not found`);
      })()
    );
  },

  actions: {
    entry: {
      periksaJurnal(e) {
        e ??= entry();

        libJurnalBarang.lib().linksTo(e);
      },
    },
    library: {
      periksaJurnal() {},
    },
  },

  periksaJurnal() {
    message("Memeriksa jurnal . . .");
  },
} satisfies LibHelper<Penjualan>;

export default libPenjualan;
