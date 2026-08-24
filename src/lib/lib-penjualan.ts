import type { LibHelper } from "./lib-helper";
import type * as Field from "@/types/memento/fields";
import type { Gudang } from "./lib-gudang";
import libJurnalBarang from "./lib-jurnal-barang";
// import LibHelper from "@/lib-helper";
// import { LibHelperNew } from "./lib-helper";
import { Entry } from "@/types/memento";
import libItemPenjualan, { type ItemPenjualan } from "./lib-item-penjualan";
import type { ItemJurnalBarang } from "./lib-item-jurnal-barang";
import libItemJurnalBarang from "./lib-item-jurnal-barang";

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
    // dialog().a
  },

  buatJurnal(e?: Entry<Penjualan>) {
    e ??= entry();
    let jurnal = libJurnalBarang.lib().linksTo(e)?.[0];
    if (jurnal)
      throw new Error(`Jurnal sudah ada untuk penjualan dengan id: ${e.id}`);

    jurnal = libJurnalBarang.lib().create({
      Jenis: "Penjualan",
      Tanggal: e.field("Tanggal"),
      Keterangan: e.name,
    });
    const items = libItemPenjualan
      .lib()
      .linksTo(e)
      .map((item, i) => {
        const barang = item.field("Barang")?.[0];
        if (!barang) return undefined;

        return {
          "Jurnal barang": [jurnal],
          Barang: [barang],
          "Gambar barang": barang.field("Gambar utama"),
          Kuantitas: item.field("Kuantitas"),
          // Gudang: gudangTujuan ? [gudangTujuan] : undefined,
          // "Perubahan kuantitas": item.field("Kuantitas"),
          // Jenis: "Masuk",
        };
      })
      .filter((v) => !!v);

    // items.forEach((i) =>
    //   libItemJurnalBarang.lib().create({
    //     ...i,
    //     Jenis: "Masuk",
    //   }),
    // );
    items.forEach((i) =>
      libItemJurnalBarang.lib().create({
        ...i,
        Jenis: "Keluar",
      }),
    );
  },
} satisfies LibHelper<Penjualan>;

export default libPenjualan;
