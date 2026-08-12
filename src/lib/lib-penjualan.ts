import type * as Field from '@/types/memento/fields'

export default function libPenjualan() {
    if (libPenjualan.id)
        return libById<Fields>(libPenjualan.id)
    return libByName<Fields>(libPenjualan.name);
}

libPenjualan.name = "Pesanan Penjualan";
libPenjualan.id = "WCN6aFtvRkxPUig1PitlPHdJNiE";

export type Fields = {
    'Tanggal': Field.Date;
    'Konsumen': Field.LinkToEntry;
    'Keterangan': Field.Text;
    'Catatan': Field.Text;
    // 'Status': Field.SingleChoice<"Draft" | "Dikirim" | "Dibatalkan" | "Selesai">;
    'Gambar utama': Field.Image;
    'Garansi': Field.Integer;

    'Gudang sumber': Field.LinkToEntry;
}

libPenjualan.events = {
    entry: {
        updated() {
        }
    }
}
