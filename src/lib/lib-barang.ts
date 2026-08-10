import type * as Field from '@/types/memento/fields'

export default function libBarang() {
    if (libBarang.id)
        return libById<LibBarang>(libBarang.id)
    return libByName<LibBarang>(libBarang.name);
}

libBarang.name = "Master Barang";
libBarang.id = "QFQxY0BKVWQ0elJkKTY5SSU6cUM";

export type LibBarang = {
    'Nama': Field.Text;
    'Nama Tampilah': Field.Text;
    'Gambar utama': Field.Image;
}

libBarang.events = {
    entry: {
        updated() {
        }
    }
}
