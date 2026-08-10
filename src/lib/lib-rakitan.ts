import type * as Field from '@/types/memento/fields'
import libGudang from './lib-gudang';
import libItemRakitan from './lib-item-rakitan';
import libJurnalBarang from './lib-jurnal-barang';
import libItemJurnalBarang from './lib-item-jurnal-barang';

export default function libRakitan() {
    return libRakitan.id ? libById<LibRakitan>(libRakitan.id) : libByName<LibRakitan>(libRakitan.name);
}

libRakitan.name = "Pesanan Pembelian";
libRakitan.id = null;

export type LibRakitan = {
    Jenis: Field.SingleChoice<'Penyesuaian persediaan' | 'Pembelian' | 'Penjualan'>;
    Tanggal: Field.Date
    Keterangan: Field.Text;
}

libRakitan.events = {
    entry: {
        updated() {

        }
    }
}

libRakitan.actions = {
    entry: {
        buatJurnalBarang() {

            let gudangs = libGudang()?.entries()
            let choices = gudangs?.map(v => v.name)

            let choiceGudangTujuan = ui().choiceBox(10, choices ?? [])
            let choiceGudangSumber = ui().choiceBox(1, choices ?? [])

            function buatJurnal() {
                let gudangTujuan = gudangs?.at(choiceGudangTujuan.selected)
                let gudangSumber = gudangs?.at(choiceGudangSumber.selected)

                let e = entry<LibRakitan>()
                let items = libItemRakitan()
                    ?.linksTo(e)
                let jurnal = libJurnalBarang()?.create({
                    Keterangan: e.name
                })
                items?.forEach(item => {
                    libItemJurnalBarang()?.create({
                        'Jurnal barang': [jurnal],
                        'Gudang': [gudangTujuan],
                        'Barang': item
                            .field('Barang'),
                        'Perubahan kuantitas': item
                            .field('Kuantitas'),
                        'Gambar barang': item
                            .field('Barang').at(0)
                            .field('Gambar utama'),
                        'Perakitan': [e]
                    })
                })
                items?.forEach(item => {
                    libItemJurnalBarang()?.create({
                        'Jurnal barang': [jurnal],
                        'Gudang': [gudangSumber],
                        'Barang': item
                            .field('Barang'),
                        'Perubahan kuantitas':
                            0 - item.field('Kuantitas'),
                        'Gambar barang': item
                            .field('Barang').at(0)
                            .field('Gambar utama')
                    })
                })
                jurnal.show()
                return true
            }

            dialog()
                .title('Pilih ')
                .view(ui().layout([
                    ui().text('Gudang tujuan: '),
                    choiceGudangTujuan,
                    ui().text('Gudang sumber: '),
                    choiceGudangSumber
                ]))
                .positiveButton('Yes', buatJurnal)
                .negativeButton('No', () => false)
                .show()
        }
    }
}