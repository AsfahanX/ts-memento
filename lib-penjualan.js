let libPembelian = libByName("Pesanan pembelian");
let libItemPembelian = libByName("Item pembelian");

function createPembelian(itemPenjualan) {
  let e = itemPenjualan;
  let penjualan = e.field("Pesanan Penjualan");
  if (!penjualan) {
    message("Pesanan Penjualan is empty");
    return null;
  }

  let catatan = e.field("Catatan");
  let barang = e.field("Barang");
  let harga = e.field("Harga Satuan");
  let jumlah = e.field("Kuantitas");
  let gambar = e.field("Gambar");
  let tanggal = penjualan[0].field("Tanggal");

  if (barang && barang.length > 0) {
    if (barang[0].field("Jenis") == "Jasa") return null;
  }

  let pembelian = libPembelian.create({
    "Pesanan Penjualan": penjualan,
    Deskripsi: catatan,
    _Thumbnail: gambar,
    Tanggal: tanggal,
    "Baris nomor": e.field("Baris Nomor"),
  });

  let itemPembelian = libItemPembelian.create({
    "Pesanan pembelian": [pembelian],
    Catatan: catatan,
    Barang: barang,
    Kuantitas: jumlah,
    Gambar: gambar,
    "Harga Satuan": harga,
  });

  itemPembelian.recalc();
  pembelian.recalc();
  return pembelian;
}

function createPembelianAll(penjualan) {
  // let e = penjualan;
  let items = libByName("Item Penjualan").linksTo(penjualan);
  for (itemPenjualan of items) {
    createPembelian(itemPenjualan);
  }
  if (items) message(items.length + " pembelian berhasil dibuat");
}

createPembelianAll(entry());
