function formatRupiah(nominal) {
  if (!nominal) {
    return null;
  }
  return "Rp " + nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function coba1() {
  return "satu";
}
function coba2() {
  return "dua";
}
