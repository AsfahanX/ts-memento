import type { Entry, Field } from "@/types/memento";
import libGudang from "./lib-gudang";
import { createLibAccessor, createLibhelper } from "./lib-helper";
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

export default createLibhelper(
  createLibAccessor<Rakitan>("JTlxbXJ3OEsjYXp2UEJzdWhNKm0"),
  {
    actions: {
      entry: {
        buatJurnalBarang(e: Entry<Rakitan>) {
          e ??= entry();

          let gudangs = libGudang.lib().entries();
          let choices = gudangs?.map((v) => v.name);

          let choiceGudangTujuan = ui().choiceBox(10, choices ?? []);
          let choiceGudangSumber = ui().choiceBox(1, choices ?? []);

          function buatJurnal() {
            let gudangTujuan = gudangs?.[choiceGudangTujuan.selected];
            let gudangSumber = gudangs?.[choiceGudangSumber.selected];

            let jurnal = libJurnalBarang.lib().create({
              Keterangan: e.name,
            });
            if (!jurnal) {
              log("Gagal membuat jurnal barang");
              message("Gagal membuat jurnal barang");
              return false;
            }

            let items = libItemRakitan
              .lib()
              .linksTo(e)
              .map((item, i) => {
                const barang = item.field("Barang")?.[0];
                if (!barang) return undefined;

                return {
                  "Jurnal barang": [jurnal],
                  Barang: item.field("Barang"),
                  Kuantitas: item.field("Kuantitas"),
                  "Gambar utama": item
                    .field("Barang")?.[0]
                    ?.field("Gambar utama"),
                  Perakitan: [e],
                };
              })
              .filter((v) => !!v);

            items.forEach((i) =>
              libItemJurnalBarang.lib().create({
                ...i,
                Jenis: "Masuk",
                Gudang: gudangTujuan ? [gudangTujuan] : undefined,
              }),
            );
            items.forEach((i) =>
              libItemJurnalBarang.lib().create({
                ...i,
                Jenis: "Keluar",
                Gudang: gudangSumber ? [gudangSumber] : undefined,
              }),
            );
            // items?.forEach((item) => {
            //   libItemJurnalBarang.lib().create({
            //     "Jurnal barang": [jurnal],
            //     Gudang: gudangTujuan ? [gudangTujuan] : undefined,
            //     Barang: item.field("Barang"),
            //     // "Perubahan kuantitas": item.field("Kuantitas"),
            //     "Gambar utama": item
            //       .field("Barang")?.[0]
            //       ?.field("Gambar utama"),
            //     Jenis: "Masuk",
            //     Kuantitas: item.field("Kuantitas"),
            //     Perakitan: [e],
            //   });
            // });
            // items?.forEach((item) => {
            //   libItemJurnalBarang.lib().create({
            //     "Jurnal barang": [jurnal],
            //     Gudang: gudangSumber ? [gudangSumber] : undefined,
            //     Barang: item.field("Barang"),
            //     // "Perubahan kuantitas": 0 - item.field("Kuantitas"),
            //     "Gambar utama": item
            //       .field("Barang")?.[0]
            //       ?.field("Gambar utama"),
            //     Jenis: "Keluar",
            //     Kuantitas: item.field("Kuantitas"),
            //   });
            // });
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
  },
);
