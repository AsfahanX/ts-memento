import type { Field } from "@/types/memento";
import type { Entry } from "@/types/memento";
import type { Gudang } from "./lib-gudang";
import type { ActionHandlers, EventHandlers, LibHelper } from "./lib-helper";
import { createLibAccessor } from "./lib-helper";
import libItemJurnalBarang from "./lib-item-jurnal-barang";
import libItemPenjualan, { type ItemPenjualan } from "./lib-item-penjualan";
import libJurnalBarang from "./lib-jurnal-barang";

export type Penjualan = {
  Tanggal: Field.Date;
  Konsumen: Field.LinkToEntry;
  Keterangan: Field.Text;
  Catatan: Field.Text;
  // 'Status': Field.SingleChoice<"Draft" | "Dikirim" | "Dibatalkan" | "Selesai">;
  "Gambar utama": Field.Image;
  Garansi: Field.Integer;

  Gudang: Field.LinkToEntry<Gudang>;
};

const helper = {
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
          "Nilai stok": item.field("Total harga pokok penjualan"),
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
        Gudang: e.field("Gudang"),
      }),
    );
  },
};

const events = {} satisfies EventHandlers<Penjualan>;
const actions = {} satisfies ActionHandlers<Penjualan>;

export default {
  ...createLibAccessor("WCN6aFtvRkxPUig1PitlPHdJNiE"),
  helper,
  events,
  actions,
} satisfies LibHelper<Penjualan>;
