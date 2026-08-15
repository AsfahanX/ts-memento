import { libRakitan } from "./lib";

// this.libRakitan = libRakitan;

// this.formatRupiah = function (nominal: number) {
//   if (typeof nominal !== "number" || nominal <= 0) {
//     return null;
//   }

//   return "Rp " + nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// };

// this.hello = function () {
//   message("hello")
// }

Object.assign(this, {
  libRakitan,
  formatRupiah(nominal: number) {
    if (typeof nominal !== "number" || nominal <= 0) {
      return null;
    }

    return "Rp " + nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },
  hello() {
    message("hello")
  }
});

