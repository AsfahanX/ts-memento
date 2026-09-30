import type { Entry, Field } from "@/types/memento";
import type { ActionHandlers, EventHandlers, LibHelper } from "./lib-helper";
import { createLibAccessor } from "./lib-helper";
import { Penjualan } from "./lib-penjualan";
import libItemPembelian from "./lib-item-pembelian";
import libStokBarang from "./lib-stok-barang";
import libJurnalBarang, { type JurnalBarang } from "./lib-jurnal-barang";

export type Pembelian = {
  "Pesanan Penjualan": Field.LinkToEntry<Penjualan>;
  Deskripsi: Field.Text;
  // _Thumbnail?: Field.Image;
  Judul?: Field.Text;
  "Gambar utama": Field.Image;
  Tanggal: Field.Date;
  "Baris nomor"?: Field.Integer;
  "Judul akhir"?: Field.Text;
  "Gambar utama akhir"?: Field.Image;
};

const libAccessor = createLibAccessor<Pembelian>(
  "UW1DRlZVK1hPZmZWPGt5UkJ0ZiE",
).lib;

const helper = {
  deleteEntry(e: Entry<Pembelian>) {
    libJurnalBarang.helper.deleteEntry(
      libJurnalBarang.lib().linksTo(e)?.[0] ?? undefined,
    );

    const items = libItemPembelian.lib().linksTo(e);
    items.forEach((v) => libItemPembelian.helper.deleteEntry(v, false));
    e.trash();
  },
  // updateGambar(e: Entry<Pembelian>) {
  //   // e ??= entry();
  //   // const gbr = e.field("Barang")?.[0]?.images("Gambar utama")?.[0];
  //   const firstItem = libItemPembelian.lib().linksTo(e)?.[0];
  //   const gbr = firstItem?.field("Barang")?.[0]?.field("Gambar utama") ?? null;
  //   e.set("Gambar utama", gbr);
  //   // if (gbr) {
  //   //   e.set("Gambar utama", [gbr]);
  //   // } else {
  //   //   e.set("Gambar utama", null);
  //   // }
  // },
  recalcEx(e: Entry<Pembelian>) {
    const items = libItemPembelian.lib().linksTo(e);
    const firstItem = items?.[0];

    let gambar = e.images("Gambar utama");
    if (!gambar.length && firstItem) {
      gambar = firstItem.field("Barang")?.[0]?.images("Gambar utama");
    }
    // const firstItemImage = firstItem?.field("Barang")?.[0]?.field("Gambar utama");
    e.set("Gambar utama akhir", gambar);
    const images = judul.field;
    let judul = e.field("Judul");
    if (!judul && firstItem) {
      judul = firstItem.name;
      if (items.length > 1) {
        judul += `dan ${items.length - 1} item lainnya`;
      }
    }
    e.set("Judul akhir", judul);
  },
  findOrCreateJurnal(e: Entry<Pembelian>) {
    return (
      libJurnalBarang.lib().linksTo(e)?.[0] ??
      libJurnalBarang.lib().create({
        "Pesanan pembelian": [e],
        Jenis: "Pembelian",
        Tanggal: e.field("Tanggal"),
        Keterangan: e.name,
        "Dibuat oleh sistem": true,
      })
    );
  },
};
const events = {
  entry: {
    created(e) {
      e ??= entry();
      helper.recalcEx(e);
    },
    updated(e) {
      e ??= entry();
      helper.recalcEx(e);
    },
    deleted(e) {
      e ??= entry();
      helper.deleteEntry(e);
      libStokBarang.helper.startQueuedStockUpdate();
    },
  },
} satisfies EventHandlers<Pembelian>;
const actions = {} satisfies ActionHandlers<Pembelian>;

export default {
  lib: libAccessor,
  helper,
  events,
  actions,
} satisfies LibHelper<Pembelian>;
