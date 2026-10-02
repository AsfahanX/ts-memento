import type { Field } from "@/types/memento";
import type { ActionHandlers, EventHandlers, LibHelper } from "./lib-helper";
import { createLibAccessor } from "./lib-helper";
import type { ItemJurnal } from "./lib-item-jurnal";

export type Akun = {
  Jenis: Field.SingleChoice<
    | "Aset"
    | "Kewajiban"
    | "Modal"
    | "Pendapatan"
    | "Biaya Pokok"
    | "Biaya Operasional"
  >;
  Posisi: Field.RadioButtons<"Debit" | "Kredit">;
  Nomor: Field.RealNumber;
  Nama: Field.Text;
  readonly Saldo: Field.Calculation<Field.Currency>;
  "Total debit": Field.Lookup<ItemJurnal, "Jumlah">;
  "Total kredit": Field.Lookup<ItemJurnal, "Jumlah">;
};

const libAccessor = createLibAccessor<Akun>("LUspPFBocGZsVj5tc0RNOU9VLU8").lib;
// const libAccessor = createLibAccessor<Jurnal>("SmpxUWFTSUEhPj5XckZUTSp6Y0M").lib;
// const libAccessor = createLibAccessor<ItemJurnal>("UnAlRnV3bHBPUlFXS1VyME9vRUY").lib;

const helper = {};
const events = {} satisfies EventHandlers<Akun>;
const actions = {} satisfies ActionHandlers<Akun>;
const widgets = {};

export default {
  lib: libAccessor,
  helper,
  events,
  actions,
  widgets,
} satisfies LibHelper<Akun>;
