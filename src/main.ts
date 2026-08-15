
export function formatRupiah(nominal: number) {
  if (typeof nominal !== "number" || nominal <= 0) {
    return null;
  }

  return "Rp " + nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

};

export function hello() {
  message("hello")
} 
