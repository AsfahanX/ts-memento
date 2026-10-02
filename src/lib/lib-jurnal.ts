import type { Field } from "@/types/memento";
import type { ActionHandlers, EventHandlers, LibHelper } from "./lib-helper";
import { createLibAccessor } from "./lib-helper";
import { createItemsFromParagraph } from "./util";
import libAkun from "./lib-akun";

export type Jurnal = {
  Jenis: Field.SingleChoice<
    "Jurnal manual" | "Penjualan" | " Pembelian" | "Biaya" | "Transfer"
  >;
  Tanggal: Field.Date;
  Judul: Field.Text;

  Gambar: Field.Image;
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

    return ui().layout([
      ui().text("Jumlah"),
      ui().edit(),
      ui().text("Akun debit"),
      ui().choiceBox(0, choices),
      ui().text("Akun kredit"),
      ui().choiceBox(0, choices),
      ui()
        .button("")
        .icon("nova:add-circle-1.png")
        .action(() => {
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
