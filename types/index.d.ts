type PesananPenjualan = {
    id: string
}

type ItemPenjualan = {
    'Pesanan Penjualan': Entry<PesananPenjualan>[]
    Catatan: string
}

export interface UserLibraries {
    'Item Penjualan':  ItemPenjualan
}
