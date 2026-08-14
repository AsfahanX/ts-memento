import type { LibHelper } from '@/types';
// import LibHelper from '@/lib-helper';
import { Entry } from '@/types/memento';
import type * as Field from '@/types/memento/fields';

export type Barang = {
    'Nama': Field.Text;
    'Nama Tampilah': Field.Text;
    'Gambar utama': Field.Image;
}

// export default new class extends LibHelper<Barang> {
//     id = "QFQxY0BKVWQ0elJkKTY5SSU6cUM"

//     events = {
//         entry: {
//             created(e) {
//                 this.
//             }
//         }
//     }
// }

export default {
    name: "Master Barang",
    id: "QFQxY0BKVWQ0elJkKTY5SSU6cUM",

    lib() {
        return libById(this.id) ?? (() => { throw new Error(`Library with id ${this.id} not found`); })()
    }

} satisfies LibHelper<Barang>

