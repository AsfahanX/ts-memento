import { Entry, Library } from "@/types/memento";

type Handler<T> = (e: Entry<T>, ...rest: any) => void;
type Handlers<T> = {
  [name: string]: Handler<T>
}
export type LibHelper<T> = {
  name?: string
  id: string
  lib(): Library<T>

  events?: {
    entry?: {
      created?: Handler<T>
      updated?: Handler<T>
      deleted?: Handler<T>
    }
  },

  actions?: {
    entry?: Handlers<T>,
    library?: Handlers<T>,
    bulk?: Handlers<T>,
  }

  // [key: string]: any
}

declare module "./memento" {
  interface CustomProperties {
    UserLibraries: MyLibraries;
  }
}

declare namespace FieldType {
  type Currency = string;
}

type PesananPenjualan = {
  id: string;
};

type ItemPenjualan = {
  "Pesanan Penjualan": PesananPenjualan;
  Catatan: string;
};

type MyLibraries = {
  "Item Penjualan": ItemPenjualan;
  "Pesanan Penjualan": PesananPenjualan;
  "Jurnal Lanjutan": {};
  "Item Jurnal Umum": {
    "Jurnal Umum": unknown;
    Akun: unknown;
    Posisi: "debit" | "kredit";
    Debit: FieldType.Currency;
    Kredit: FieldType.Currency;
  };
};
