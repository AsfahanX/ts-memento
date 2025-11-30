function mymessage(params) {
    message('github nih');
}

function buatContohItemPenjualan() {
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
