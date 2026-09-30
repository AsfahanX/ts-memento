import type { Entry, Field } from "@/types/memento";
import type { ActionHandlers, EventHandlers, LibHelper } from "./lib-helper";
import { createLibAccessor } from "./lib-helper";
import type { Pembelian } from "./lib-pembelian";
import type { Barang } from "./lib-barang";
import type { ItemJurnalBarang } from "./lib-item-jurnal-barang";
import libItemJurnalBarang from "./lib-item-jurnal-barang";
import libStokBarang from "./lib-stok-barang";
import libJurnalBarang from "./lib-jurnal-barang";
import libPembelian from "./lib-pembelian";

export type ItemPembelian = {
  // Nama: Field.Text;
  "Pesanan pembelian": Field.LinkToEntry<Pembelian>;
  Catatan: Field.Text;
  Barang?: Field.LinkToEntry<Barang>;
  Kuantitas: Field.Integer;
  "Harga Satuan": Field.Currency;
  Subtotal: Field.Calculation<number>;
  "Gambar utama"?: Field.Image;

  // "Item jurnal barang"?: Field.LinkToEntry<ItemJurnalBarang>;
};

const helper = {
  deleteEntry(e: Entry<ItemPembelian>, deleteRelatedJurnal?: boolean) {
    if (deleteRelatedJurnal) {
      const itemJurnal = libItemJurnalBarang.lib().linksTo(e)?.[0];
      if (itemJurnal) {
        libItemJurnalBarang.helper.deleteEntry(itemJurnal);
      }
    }

    e.trash();
  },
  updateGambar(e?: Entry<ItemPembelian>) {
    e ??= entry();
    const gbr = e.field("Barang")?.[0]?.images("Gambar utama")?.[0];
    if (gbr) {
      e.set("Gambar utama", [gbr]);
    } else {
      e.set("Gambar utama", null);
    }
  },
};

const events = {
  entry: {
    // created(e) {
    //   e ??= entry();
    //   helper.updateGambar(e);

    //   const barang = e.field("Barang")?.[0];
    //   if (barang) {
    //     let itemJurnal = libItemJurnalBarang.lib().linksTo(e)?.[0];
    //     if (itemJurnal) {
    //       throw new Error(
    //         `Item jurnal barang sudah ada untuk item pembelian dengan id: ${e.id}`,
    //       );
    //     }
    //     itemJurnal = libItemJurnalBarang.lib().create({
    //       "Jurnal barang": [jurnalbarang],
    //       "Item pembelian": [e],
    //       Barang: [barang],
    //       Kuantitas: e.field("Kuantitas"),
    //       "Gambar utama": barang.images("Gambar utama"),
    //       Gudang: this.gudangDefault() ? [this.gudangDefault()] : undefined,
    //       Jenis: "Masuk",
    //     });
    //   }
    //   libStokBarang.helper.startQueuedStockUpdate();
    // },
    updated(e) {
      e ??= entry();
      helper.updateGambar(e);

      const obj = {
        "Item pembelian": [e],
        // "Jurnal barang": [j],
        Kuantitas: e.field("Kuantitas"),
        Barang: e.field("Barang"),
        "Nilai stok": e.field("Subtotal"),
        "Gambar utama": e.field("Gambar utama"),
        Gudang: this.gudangDefault() ? [this.gudangDefault()] : undefined,
      };

      let ij = libItemJurnalBarang.lib().linksTo(e)?.[0];
      if (ij) {
        ij.set("Kuantitas", e.field("Kuantitas"));
        ij.set("Barang", e.field("Barang"));
        ij.set("Nilai stok", e.field("Subtotal"));
      } else {
        const pembelian = e.field("Pesanan pembelian")?.[0];
        if (!pembelian) throw new Error("Item pembelian tidak memiliki parent");

        const j = libPembelian.helper.findOrCreateJurnal(pembelian);
        ij = libItemJurnalBarang.lib().create({
          "Item pembelian": [e],
          "Jurnal barang": [j],
          Kuantitas: e.field("Kuantitas"),
          Barang: e.field("Barang"),
          "Nilai stok": e.field("Subtotal"),
          "Gambar utama": barang.images("Gambar utama"),
          Gudang: this.gudangDefault() ? [this.gudangDefault()] : undefined,
        });
      }

      libStokBarang.helper.startQueuedStockUpdate();
    },
    deleted(e) {
      e ??= entry();
      helper.deleteEntry(e);
      libStokBarang.helper.startQueuedStockUpdate();
    },
  },
} satisfies EventHandlers<ItemPembelian>;
const actions = {} satisfies ActionHandlers<ItemPembelian>;

export default {
  ...createLibAccessor("KjxrIzRHVy0qQE1VM1I1MVsoNFk"),
  helper,
  events,
  actions,
} satisfies LibHelper<ItemPembelian>;
