import type * as Field from '@/types/memento/fields'
import { LibRakitan } from './lib-rakitan';
import { LibBarang } from './lib-barang';

export default function libItemRakitan() {
    return libItemRakitan.id ? libById<LibItemRakitan>(libItemRakitan.id) : libByName<LibItemRakitan>(libItemRakitan.name);
}

libItemRakitan.name = "Item Rakitan";
libItemRakitan.id = "JVBtMUppVGxvUCFYbFNlOyhOQGY";

export type LibItemRakitan = {
    'Perakitan': Field.LinkToEntry<LibRakitan>;
    'Barang': Field.LinkToEntry<LibBarang>;
    Kuantitas: Field.Integer;
    // 'Jurnal barang': Field.LinkToEntry<LibJurnalBarang>;
    //     'Gudang': Field.LinkToEntry<LibGudang>;
    //     'Perubahan kuantitas': Field.Integer
    //     'Gambar barang': Field.Image
}

libItemRakitan.events = {
    entry: {
        updated() {

        }
    }
}
