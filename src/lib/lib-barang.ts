import type { Field } from "@/types/memento";
import type { ActionHandlers, EventHandlers, LibHelper } from "./lib-helper";
import { createLibAccessor } from "./lib-helper";

export type Barang = {
  Nama: Field.Text;
  "Nama tampilan": Field.Text;
  "Gambar utama": Field.Image;
};

const helper = {};
const events = {} satisfies EventHandlers<Barang>;
const actions = {} satisfies ActionHandlers<Barang>;

export default {
  ...createLibAccessor("QFQxY0BKVWQ0elJkKTY5SSU6cUM"),
  helper,
  events,
  actions,
} satisfies LibHelper<Barang>;
