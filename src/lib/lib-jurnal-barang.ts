import type * as Field from '@/types/memento/fields'
import libItemJurnalBarang from './lib-item-jurnal-barang';

export default function libJurnalBarang() {
    return libJurnalBarang.id ? libById<LibJurnalBarang>(libJurnalBarang.id) : libByName<LibJurnalBarang>(libJurnalBarang.name);
}

libJurnalBarang.name = "Pesanan Pembelian";
libJurnalBarang.id = "UHoqKEhMPDJkNyoteTllK3dFWlk";

export type LibJurnalBarang = {
    Jenis: Field.SingleChoice<'Penyesuaian persediaan' | 'Pembelian' | 'Penjualan'>;
    Tanggal: Field.Date
    Keterangan: Field.Text;
}

libJurnalBarang.events = {
    entry: {
        deleted() {
            const e = entry<LibJurnalBarang>()
            libItemJurnalBarang()?.linksTo(e)
                .forEach(i => i.trash())
        }
    }
}
