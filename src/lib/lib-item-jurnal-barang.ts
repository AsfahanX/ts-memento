import type * as Field from '@/types/memento/fields'
import type { Schema } from './lib-jurnal-barang';
import type { LibGudang } from './lib-gudang';
import type { Schema } from './lib-rakitan';
import type { LibBarang } from './lib-barang';

export default function libItemJurnalBarang() {
    return libItemJurnalBarang.id ? libById<LibItemJurnalBarang>(libItemJurnalBarang.id) : libByName<LibItemJurnalBarang>(libItemJurnalBarang.name);
}

libItemJurnalBarang.name = "Item Jurnal Barang";
libItemJurnalBarang.id = "I2lTWGc0UFFxcTUxdi1kOUc6Rk0";

type LibItemJurnalBarang = {
    'Jurnal barang': Field.LinkToEntry<Schema>;
    'Gudang'?: Field.LinkToEntry<LibGudang>;
    'Barang': Field.LinkToEntry<LibBarang>;
    'Perubahan kuantitas': Field.Integer
    'Gambar barang': Field.Image
    'Perakitan'?: Field.LinkToEntry<Schema>;
}

libItemJurnalBarang.events = {
    entry: {
        updated() {

        }
    }
}
