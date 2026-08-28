/**
 * reserved keyword:
 *   - class
 *
 * problematic:
 *   - function Array.at()  -  eg. ['oke', 'siap'].at(0)
 *   - getter and setter
 *
 * @see https://mozilla.github.io/rhino/compat/engines.html
 */

import {
  libPenjualan,
  libBarang,
  libGudang,
  libJurnalBarang,
  libItemJurnalBarang,
  libRakitan,
  libItemRakitan,
} from "@/lib";

// libItemJurnalBarang.actions.

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
    message("hello");
  },
});
