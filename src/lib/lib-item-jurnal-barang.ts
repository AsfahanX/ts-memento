import type { Entry, Field } from "@/types/memento";
import { recalculateEntries } from "@/utils";
import type { Barang } from "./lib-barang";
import type { Gudang } from "./lib-gudang";
import type { ActionHandlers, EventHandlers, LibHelper } from "./lib-helper";
import { createLibAccessor } from "./lib-helper";
import type { JurnalBarang } from "./lib-jurnal-barang";
import libStokBarang from "./lib-stok-barang";

export type ItemJurnalBarang = {
  "Jurnal barang": Field.LinkToEntry<JurnalBarang>;
  Gudang?: Field.LinkToEntry<Gudang>;
  Barang: Field.LinkToEntry<Barang>;
  "Gambar utama"?: Field.Image;
  Perakitan?: Field.LinkToEntry<JurnalBarang>;

  Jenis: Field.SingleChoice<"Masuk" | "Keluar">;
  Kuantitas: Field.Integer;
  "_Perubahan kuantitas"?: Field.Calculation<Field.Integer>;

  "Nilai stok"?: Field.Currency;
  "Serial number"?: Field.Barcode;

  "_Nama barang"?: Field.Lookup<Barang, "Nama">;
};

const helper = {
  updateGambar(e?: Entry<ItemJurnalBarang>) {
    e ??= entry();
    const gbr = e.field("Barang")?.[0]?.images("Gambar utama")?.[0];
    if (gbr) {
      e.set("Gambar utama", [gbr]);
    } else {
      e.set("Gambar utama", null);
    }
  },
  coba<T>() {
    const en = entry();
  },

  deleteEntry(e: Entry<ItemJurnalBarang>) {
    e.trash();
    libStokBarang.helper.enqueueStockUpdate(e.field("Barang"));
  },
};

const events = {
  entry: {
    updated(e) {
      e ??= entry();
      helper.updateGambar(e);
      libStokBarang.helper.startQueuedStockUpdate(e.field("Barang"));
    },
    deleted(e) {
      e ??= entry();
      helper.deleteEntry(e);
      libStokBarang.helper.startQueuedStockUpdate();
    },
  },
} satisfies EventHandlers<ItemJurnalBarang>;

const actions = {
  entry: {
    recalculate() {},
  },
  library: {
    recalculate() {
      recalculateEntries(lib<ItemJurnalBarang>(), (e) => {
        helper.updateGambar(e);
      });
    },
  },
} satisfies ActionHandlers<ItemJurnalBarang>;

export default {
  ...createLibAccessor("I2lTWGc0UFFxcTUxdi1kOUc6Rk0"),
  helper,
  events,
  actions,
} satisfies LibHelper<ItemJurnalBarang>;
