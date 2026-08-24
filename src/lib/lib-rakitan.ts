import type { LibHelper } from "./lib-helper";
import type * as Field from "@/types/memento/fields";
import libGudang from "./lib-gudang";
import libItemJurnalBarang from "./lib-item-jurnal-barang";
import libItemRakitan from "./lib-item-rakitan";
import libJurnalBarang from "./lib-jurnal-barang";

export type Rakitan = {
  Jenis: Field.SingleChoice<
    "Penyesuaian persediaan" | "Pembelian" | "Penjualan"
  >;
  Tanggal: Field.Date;
  Keterangan: Field.Text;
};

export default {
  name: "Perakitan",
  id: "JTlxbXJ3OEsjYXp2UEJzdWhNKm0",

  lib() {
    return (
      libById(this.id) ??
      (() => {
        throw new Error(`Library with id ${this.id} not found`);
      })()
    );
  },

  events: {
    entry: {
      updated(e) {},
    },
  },

  actions: {
    entry: {
      buatJurnalBarang(e) {
        e ??= entry();

        let gudangs = libGudang.lib().entries();
        let choices = gudangs?.map((v) => v.name);

        let choiceGudangTujuan = ui().choiceBox(10, choices ?? []);
        let choiceGudangSumber = ui().choiceBox(1, choices ?? []);

        function buatJurnal() {
          let gudangTujuan = gudangs?.[choiceGudangTujuan.selected];
          let gudangSumber = gudangs?.[choiceGudangSumber.selected];

          // let e = entry<LibRakitan>()
          let items = libItemRakitan.lib()?.linksTo(e);
          let jurnal = libJurnalBarang.lib()?.create({
            Keterangan: e.name,
          });
          if (!jurnal) {
            log("Gagal membuat jurnal barang");
            message("Gagal membuat jurnal barang");
            return false;
          }
          items?.forEach((item) => {
            libItemJurnalBarang.lib()?.create({
              "Jurnal barang": [jurnal],
              Gudang: gudangTujuan ? [gudangTujuan] : undefined,
              Barang: item.field("Barang"),
              // "Perubahan kuantitas": item.field("Kuantitas"),
              "Gambar barang": item.field("Barang")[0].field("Gambar utama"),
              Jenis: "Masuk",
              Kuantitas: item.field("Kuantitas"),
              Perakitan: [e],
            });
          });
          items?.forEach((item) => {
            libItemJurnalBarang.lib()?.create({
              "Jurnal barang": [jurnal],
              Gudang: gudangSumber ? [gudangSumber] : undefined,
              Barang: item.field("Barang"),
              // "Perubahan kuantitas": 0 - item.field("Kuantitas"),
              "Gambar barang": item.field("Barang")[0].field("Gambar utama"),
              Jenis: "Keluar",
              Kuantitas: item.field("Kuantitas"),
            });
          });
          jurnal.show();
          return true;
        }

        dialog()
          .title("Pilih ")
          .view(
            ui().layout([
              ui().text("Gudang tujuan: "),
              choiceGudangTujuan,
              ui().text("Gudang sumber: "),
              choiceGudangSumber,
            ]),
          )
          .positiveButton("Yes", buatJurnal)
          .negativeButton("No", () => false)
          .show();
      },
    },
  },
} satisfies LibHelper<Rakitan>;
