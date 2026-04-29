import { Entry } from "./memento"

declare module "./memento" {
    interface CustomProperties {
        UserLibraries: MyLibraries
    }
}
 
type PesananPenjualan = {
    id: string
}

type ItemPenjualan = {
    'Pesanan Penjualan': PesananPenjualan
    Catatan: string
}

type MyLibraries = {
    'Item Penjualan': ItemPenjualan
    'Pesanan Penjualan': PesananPenjualan
    'Jurnal Lanjutan': {}
}
