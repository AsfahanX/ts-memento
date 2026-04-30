function formatRupiah(nominal) {
  if (!nominal) {
    return null;
  }
  return "Rp " + nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function ubahKolomKeRelasi(foreignKey, column, libraryName, ownerKey) {
  lib().entries().forEach((e) => {
    const val = e.field(column);
    if (val) {
      const parentLib = libByName(libraryName);
      const parent = parentLib?.findByKey(val);
      e.set(foreignKey, [parent]);
    }
  });
}
