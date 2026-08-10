import type * as Field from '@/types/memento/fields'

export default function libGudang() {
    if (libGudang.id)
        return libById<LibGudang>(libGudang.id)
    return libByName<LibGudang>(libGudang.name);
}

libGudang.name = "Gudang";
libGudang.id = "XSNaUEFQbWdzWHBnJXVdNXZUTlE";

export type LibGudang = {
    Nama: Field.Text;
}

libGudang.events = {
    entry: {
        updated() {

        }
    }
}


