// import * as libs from "@/lib"
import {
  libPenjualan,
  libBarang,
  libGudang,
  libJurnalBarang,
  libItemJurnalBarang,
  libRakitan,
  libItemRakitan,
} from "@/lib"

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
  libPenjualan,
  libBarang,
  libGudang,
  libJurnalBarang,
  libItemJurnalBarang,
  libRakitan,
  libItemRakitan,

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

