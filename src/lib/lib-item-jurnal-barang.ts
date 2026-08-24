import type { LibHelper } from "./lib-helper";
import type * as Field from "@/types/memento/fields";
import type { Barang } from "./lib-barang";
import type { Gudang } from "./lib-gudang";
import type { JurnalBarang } from "./lib-jurnal-barang";

export type ItemJurnalBarang = {
  "Jurnal barang": Field.LinkToEntry<JurnalBarang>;
  Gudang?: Field.LinkToEntry<Gudang>;
  Barang: Field.LinkToEntry<Barang>;
  // "Perubahan kuantitas": Field.Integer;
  "Gambar barang"?: Field.Image;
  Perakitan?: Field.LinkToEntry<JurnalBarang>;

  Jenis: Field.SingleChoice<"Masuk" | "Keluar">;
  Kuantitas: Field.Integer;
  "_Perubahan kuantitas"?: Field.Calculation<Field.Integer>;

  "Nilai stok"?: Field.Currency;
  "Serial number"?: Field.Barcode;
};

export default {
  name: "Item Jurnal Barang",
  id: "I2lTWGc0UFFxcTUxdi1kOUc6Rk0",

  lib() {
    return (
      libById(this.id) ??
      (() => {
        throw new Error(`Library with id ${this.id} not found`);
      })()
    );
  },
} satisfies LibHelper<ItemJurnalBarang>;
