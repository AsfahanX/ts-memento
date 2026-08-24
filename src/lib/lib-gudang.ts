import type { LibHelper } from "./lib-helper";
import type * as Field from "@/types/memento/fields";

export type Gudang = {
  Nama: Field.Text;
};

export default {
  name: "Gudang",
  id: "XSNaUEFQbWdzWHBnJXVdNXZUTlE",

  lib() {
    return (
      libById(this.id) ??
      (() => {
        throw new Error(`Library with id ${this.id} not found`);
      })()
    );
  },
} satisfies LibHelper<Gudang>;
