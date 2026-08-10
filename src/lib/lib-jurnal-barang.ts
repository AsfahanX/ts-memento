import type * as Field from '@/types/memento/fields'

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
        updated() {

        }
    }
}
