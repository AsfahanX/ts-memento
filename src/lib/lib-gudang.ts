import type { Field } from "@/types/memento";
import { createLibAccessor, createLibhelper } from "./lib-helper";

export type Gudang = {
  Nama: Field.Text;
};

export default createLibhelper(
  createLibAccessor<Gudang>("XSNaUEFQbWdzWHBnJXVdNXZUTlE"),
  {},
);
