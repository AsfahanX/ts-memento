import type * as Field from '@/types/memento/fields'
import libItemJurnalBarang from './lib-item-jurnal-barang';
import type { Schema as LibRakitanSchema } from './lib-rakitan';
import type { Entry } from '@/types/memento';

export default function libJurnalBarang() {
    return libJurnalBarang.id ? libById<Schema>(libJurnalBarang.id) : libByName<Schema>(libJurnalBarang.name);
}

libJurnalBarang.name = "Pesanan Pembelian";
libJurnalBarang.id = "UHoqKEhMPDJkNyoteTllK3dFWlk";

export type Schema = {
    Jenis?: Field.SingleChoice<'Penyesuaian persediaan' | 'Pembelian' | 'Penjualan'>;
    Tanggal?: Field.Date
    Keterangan?: Field.Text;
    Rakitan?: Field.LinkToEntry<LibRakitanSchema>;
}

libJurnalBarang.events = {
    entry: {
        deleted(e?: Entry<Schema>) {
            // e ??= entry()
            if (!e) { e = entry() }
            libItemJurnalBarang()?.linksTo(e)
                .forEach(i => i.trash())
        }
    }
}
