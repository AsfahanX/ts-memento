import type { LibHelper } from '@/types';
import type * as Field from '@/types/memento/fields'
import type { Gudang } from './lib-gudang';

export type Penjualan = {
    'Tanggal': Field.Date;
    'Konsumen': Field.LinkToEntry;
    'Keterangan': Field.Text;
    'Catatan': Field.Text;
    // 'Status': Field.SingleChoice<"Draft" | "Dikirim" | "Dibatalkan" | "Selesai">;
    'Gambar utama': Field.Image;
    'Garansi': Field.Integer;

    'Gudang sumber': Field.LinkToEntry<Gudang>;
}

export default {
    name: "Pesanan Penjualan",
    id: "WCN6aFtvRkxPUig1PitlPHdJNiE",

    lib() {
        return libById(this.id) ?? (() => { throw new Error(`Library with id ${this.id} not found`); })()
    },

    events: {
        entry: {

        }
    },

    actions: {
        library: {
            // TODO: check if all record has jurnalBarang
        }
    }
} satisfies LibHelper<Penjualan>

