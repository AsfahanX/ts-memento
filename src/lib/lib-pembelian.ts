export default function libPembelian() {
  return libpembelian.id
    ? libById(libPembelian.id)
    : libByName(libPembelian.name);
}

libPembelian.name = "Pesanan Pembelian";
libPembelian.id = null;

libPembelian.events = {
  entry: {
    updated() {},
  },
};
