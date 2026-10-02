import type { Field } from "@/types/memento";
import type { ActionHandlers, EventHandlers, LibHelper } from "./lib-helper";
import { createLibAccessor } from "./lib-helper";
import type { Jurnal } from "./lib-jurnal";
import type { Akun } from "./lib-akun";

export type ItemJurnal = {
  Jurnal: Field.LinkToEntry<Jurnal>;
  Akun: Field.LinkToEntry<Akun>;
  Jumlah: Field.Currency;
  Posisi: Field.RadioButtons<"Debit" | "Kredit">;
};

const libAccessor = createLibAccessor<ItemJurnal>(
  "UnAlRnV3bHBPUlFXS1VyME9vRUY",
).lib;

const helper = {};
const events = {} satisfies EventHandlers<ItemJurnal>;
const actions = {} satisfies ActionHandlers<ItemJurnal>;
const widgets = {};

export default {
  lib: libAccessor,
  helper,
  events,
  actions,
  widgets,
} satisfies LibHelper<ItemJurnal>;
