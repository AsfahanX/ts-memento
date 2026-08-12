import type * as Field from '@/types/memento/fields'
import libItemJurnalBarang from './lib-item-jurnal-barang';
import type { LibRakitan } from './lib-rakitan';

export default function libJurnalBarang() {
    return libJurnalBarang.id ? libById<Schema>(libJurnalBarang.id) : libByName<Schema>(libJurnalBarang.name);
}

libJurnalBarang.name = "Pesanan Pembelian";
libJurnalBarang.id = "UHoqKEhMPDJkNyoteTllK3dFWlk";

export type Schema = {
    Jenis?: Field.SingleChoice<'Penyesuaian persediaan' | 'Pembelian' | 'Penjualan'>;
    Tanggal?: Field.Date
    Keterangan?: Field.Text;
    Rakitan?: Field.LinkToEntry<LibRakitan>;


}

libJurnalBarang.events = {
    entry: {
        deleted() {
            const e = entry<Schema>()
            libItemJurnalBarang()?.linksTo(e)
                .forEach(i => i.trash())
        }
    }
}
