import type { Field } from "@/types/memento";
import type { Gudang } from "./lib-gudang";
import type { ActionHandlers, EventHandlers, LibHelper } from "./lib-helper";
import { createLibAccessor } from "./lib-helper";
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

const events = {
  entry: {
    deleted(e) {
      e ??= entry();
      libItemJurnalBarang
        .lib()
        .linksTo(e)
        .forEach((i) => i.trash());
    },
  },
} satisfies EventHandlers<JurnalBarang>;

const actions = {} satisfies ActionHandlers<JurnalBarang>;

export default {
  ...createLibAccessor("UHoqKEhMPDJkNyoteTllK3dFWlk"),
  events,
  actions,
} satisfies LibHelper<JurnalBarang>;
