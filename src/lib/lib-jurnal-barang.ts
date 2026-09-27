import type { Entry, Field } from "@/types/memento";
import type { Gudang } from "./lib-gudang";
import type { ActionHandlers, EventHandlers, LibHelper } from "./lib-helper";
import { createLibAccessor } from "./lib-helper";
import libItemJurnalBarang from "./lib-item-jurnal-barang";
import type { Penjualan } from "./lib-penjualan";
import type { Rakitan } from "./lib-rakitan";
import libStokBarang from "./lib-stok-barang";
import type { Pembelian } from "./lib-pembelian";

export type JurnalBarang = {
  "Dibuat oleh sistem"?: Field.Boolean;
  Jenis?: Field.SingleChoice<
    "Penyesuaian persediaan" | "Pembelian" | "Penjualan"
  >;
  Tanggal?: Field.Date;
  Keterangan?: Field.Text;
  Rakitan?: Field.LinkToEntry<Rakitan>;
  Penjualan?: Field.LinkToEntry<Penjualan>;
  "Pesanan pembelian"?: Field.LinkToEntry<Pembelian>;

  "Gudang Asal"?: Field.LinkToEntry<Gudang>;
  "Gudang Tujuan"?: Field.LinkToEntry<Gudang>;
};

const helper = {
  deleteEntry(e?: Entry<JurnalBarang>) {
    if (!e) return;

    const items = libItemJurnalBarang.lib().linksTo(e);
    items.forEach((v) => libItemJurnalBarang.helper.deleteEntry(v));
    e.trash();
  },
};

const events = {
  entry: {
    deleted(e) {
      // e ??= entry();
      helper.deleteEntry(e ?? entry());
      // libItemJurnalBarang
      //   .lib()
      //   .linksTo(e)
      //   .forEach((v) => libItemJurnalBarang.helper.deleteEntry(v));
      libStokBarang.helper.startQueuedStockUpdate();
    },
  },
} satisfies EventHandlers<JurnalBarang>;

const actions = {} satisfies ActionHandlers<JurnalBarang>;

export default {
  ...createLibAccessor("UHoqKEhMPDJkNyoteTllK3dFWlk"),
  helper,
  events,
  actions,
} satisfies LibHelper<JurnalBarang>;
