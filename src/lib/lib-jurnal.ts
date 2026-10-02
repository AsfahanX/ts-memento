import type { Field } from "@/types/memento";
import type { ActionHandlers, EventHandlers, LibHelper } from "./lib-helper";
import { createLibAccessor } from "./lib-helper";
import { createItemsFromParagraph } from "./util";
import libAkun from "./lib-akun";
import libItemJurnal from "./lib-item-jurnal";

export type Jurnal = {
  Jenis: Field.SingleChoice<
    "Jurnal manual" | "Penjualan" | " Pembelian" | "Biaya" | "Transfer"
  >;
  Tanggal: Field.Date;
  Judul: Field.Text;

  Gambar?: Field.Image;
};

const libAccessor = createLibAccessor<Jurnal>(
  "SmpxUWFTSUEhPj5XckZUTSp6Y0M",
).lib;

const helper = {};
const events = {} satisfies EventHandlers<Jurnal>;
const actions = {
  library: {
    quickCreate() {
      dialog().view(widgets.quickCreate()).show();
    },
  },
} satisfies ActionHandlers<Jurnal>;
const widgets = {
  quickCreate() {
    const akuns = libAkun.lib().entries();
    const choices = akuns.map(({ name }) => name);
    const uiEditAmount = ui().edit("");
    const uiChoicesAkunDebit = ui().choiceBox(0, choices);
    const uiChoicesAkunKredit = ui().choiceBox(0, choices);

    return ui().layout([
      ui().text("Jumlah"),
      uiEditAmount,
      ui().text("Akun debit"),
      uiChoicesAkunDebit,
      ui().text("Akun kredit"),
      uiChoicesAkunKredit,
      ui()
        .button(" Buat jurnal")
        .icon("nova:add-circle-1.png")
        .action(() => {
          const amount = parseFloat(uiEditAmount.text);
          const akunDebit = akuns[uiChoicesAkunDebit.selected];
          const akunKredit = akuns[uiChoicesAkunKredit.selected];
          const jurnal = libAccessor().create({
            Jenis: "Jurnal manual",
            Tanggal: new Date(),
            Judul: `Jurnal manual ${new Date().toLocaleString()}`,
          });

          libItemJurnal.lib().create({
            Jurnal: [jurnal],
            Posisi: "Debit",
            Akun: [akunDebit],
            Jumlah: amount,
          });
          libItemJurnal.lib().create({
            Jurnal: [jurnal],
            Posisi: "Kredit",
            Akun: [akunKredit],
            Jumlah: amount,
          });
          jurnal.show();
          return true;
        }),
    ]);
  },
};

export default {
  lib: libAccessor,
  helper,
  events,
  actions,
  widgets,
} satisfies LibHelper<Jurnal>;
