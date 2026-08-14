import type { LibHelper } from '@/types';
import type * as Field from '@/types/memento/fields'

export type Gudang = {
    Nama: Field.Text;
}

export default {
    name: "Gudang",
    id: "XSNaUEFQbWdzWHBnJXVdNXZUTlE",

    lib() {
        return libById(this.id) ?? (() => { throw new Error(`Library with id ${this.id} not found`); })()
    }

} satisfies LibHelper<Gudang>

// const libGudang = {
//     name: "Gudang",
//     id: "XSNaUEFQbWdzWHBnJXVdNXZUTlE",

//     // lib: () => {
//     //     const res = libById(this.id)
//     // }
//     lib() {
//         // const result = libById(this.id)
//         // if(result) return result

//         // throw new Error(`Library with id ${this.id} not found`)
//         // return libById(this.id)
//         return libById(this.id) ?? (() => { throw new Error(`Library with id ${this.id} not found`); })()
//     }
// } satisfies LibHelper<Gudang>

// export default libGudang
