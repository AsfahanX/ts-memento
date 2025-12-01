// TODO: use this directive: /// <reference types="memento" />
// see https://www.typescriptlang.org/docs/handbook/declaration-files/library-structures.html#dependencies-on-global-libraries

/**
 * @template {import("types/memento/libraries/library").LibraryStruct} T
 * @typedef {import("types/memento/entries/entry").Entry<T>} Entry
 */
/**
 * @typedef {import("types").ItemPenjualan} ItemPenjualan
 * @typedef {import("types").PesananPenjualan} PesananPenjualan
 */


function mymessage(params) {
    message('github nih');
}

function buatContohItemPenjualan() {
    /** @type {Entry<PesananPenjualan>} */
    const e = entry()
    const itemsLib = libByName('Item Penjualan')
    let items = [
        'Prosesor',
        'Mobo',
        'Ram'
    ];

    items.forEach(i => {
        itemsLib.create({
            'Pesanan Penjualan': [e],
            Catatan: i
        })
    })
}

function dialogKonfirmasi(callback) {
    dialog().view(
        ui().layout([
            ui().button('Yes').action(callback),
            ui().button('No')
        ])
    ).show();
    
}
