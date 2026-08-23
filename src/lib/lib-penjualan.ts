import type { LibHelper } from "@/types";
import type * as Field from "@/types/memento/fields";
import type { Gudang } from "./lib-gudang";
import libJurnalBarang from "./lib-jurnal-barang";
// import LibHelper from "@/lib-helper";
import { LibHelperNew } from "./lib-helper";
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

export default {
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

  events: {
    entry: {},
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
    return "";
  },
} satisfies LibHelper<Penjualan>;

export class LibPenjualan extends LibHelperNew<Penjualan> {
  // protected actions?:
  //   | {
  //       entry?:
  //         | { [name: string]: (e: Entry<Penjualan>, ...rest: any) => void }
  //         | undefined;
  //       library?:
  //         | { [name: string]: (e: Entry<Penjualan>, ...rest: any) => void }
  //         | undefined;
  //     }
  //   | undefined;
  id = "WCN6aFtvRkxPUig1PitlPHdJNiE";
  /**
   *
   */
  constructor() {
    super();
    const self = this;

    this.events = { entry: { created(e) {} } };
    this.actions = {
      library: {
        periksaJurnal() {
          message("memeriksa jurnal . . .");
        },
      },
    };
  }
  // events = {entry: {}};

  revalidateJurnal() {}
}
