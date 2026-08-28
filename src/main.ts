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

  getAllProperties(instance) {
    const properties = new Set();
    let currentObj = instance;

    // Walk up the chain until hitting the end (null)
    while (currentObj && currentObj !== Object.prototype) {
      // Get all string keys and symbol keys for the current level
      Reflect.ownKeys(currentObj).forEach((key) => properties.add(key));
      currentObj = Object.getPrototypeOf(currentObj);
    }

    return Array.from(properties).join("\r\n");
  },
});
