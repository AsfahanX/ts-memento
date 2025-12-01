/**
 * @template T
 * @typedef {import("./types/memento/entries/entry").Entry<T>} Entry
 */
/**
 * @typedef {import("./types/memento/user-libraries").ItemPenjualan} ItemPenjualan
 */


function mymessage(params) {
    message('github nih');
}

function buatContohItemPenjualan() {
    /** @type {Entry<ItemPenjualan>} */
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


