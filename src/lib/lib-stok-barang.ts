import type { Field } from "@/types/memento";
import type { ActionHandlers, EventHandlers, LibHelper } from "./lib-helper";
import { createLibAccessor } from "./lib-helper";
import type { Barang } from "./lib-barang";

export type StokBarang = {
  Barang: Field.LinkToEntry<Barang>;
  "Gambar utama": Field.Image;
};

const helper = {};
const events = {} satisfies EventHandlers<StokBarang>;
const actions = {} satisfies ActionHandlers<StokBarang>;

export default {
  ...createLibAccessor("RUNQRCkxQUk6JmhzOilQVjNJV28"),
  helper,
  events,
  actions,
} satisfies LibHelper<StokBarang>;
