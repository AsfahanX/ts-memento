import type * as Field from '@/types/memento/fields'

export default function libBarang() {
    if (libBarang.id)
        return libById<LibBarang>(libBarang.id)
    return libByName<LibBarang>(libBarang.name);
}

libBarang.name = "Gudang";
libBarang.id = "XSNaUEFQbWdzWHBnJXVdNXZUTlE";

export type LibBarang = {
    Nama: Field.Text;
    'Gambar utama': Field.Image;
}

libBarang.events = {
    entry: {
        updated() {

        }
    }
}


