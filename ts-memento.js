function formatRupiah(nominal) {
  if (!nominal) {
    return null;
  }
  return "Rp " + nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
var _ = {
  formatRupiah
};
