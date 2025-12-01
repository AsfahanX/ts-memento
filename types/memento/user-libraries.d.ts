import type { Entry } from "./entries/entry"

interface PesananPenjualan {

}

interface ItemPenjualan {
    'Pesanan Penjualan': Entry<PesananPenjualan>[]
    Catatan: string
}

export interface UserLibrary {
    'Item Penjualan':  ItemPenjualan
}
