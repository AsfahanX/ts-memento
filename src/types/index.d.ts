import { Entry } from "./memento";

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
