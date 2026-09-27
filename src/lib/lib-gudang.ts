import type { Field } from "@/types/memento";
import type { ActionHandlers, EventHandlers, LibHelper } from "./lib-helper";
import { createLibAccessor } from "./lib-helper";

export type Gudang = {
  Nama: Field.Text;
};

const events = {} satisfies EventHandlers<Gudang>;
const actions = {} satisfies ActionHandlers<Gudang>;

export default {
  ...createLibAccessor("XSNaUEFQbWdzWHBnJXVdNXZUTlE"),
  events,
  actions,
} satisfies LibHelper<Gudang>;
