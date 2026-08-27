import type { Field } from "@/types/memento";
import { createLibAccessor, createLibhelper } from "./lib-helper";

export type Barang = {
  Nama: Field.Text;
  "Nama tampilan": Field.Text;
  "Gambar utama": Field.Image;
};

export default createLibhelper(
  createLibAccessor<Barang>("QFQxY0BKVWQ0elJkKTY5SSU6cUM"),
  {},
);
