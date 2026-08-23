import {
  libPenjualan,
  libBarang,
  libGudang,
  libJurnalBarang,
  libItemJurnalBarang,
  libRakitan,
  libItemRakitan,
} from "@/lib";

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

  // helper: new (class {
  //   constructor(private _libPenjualan?: LibPenjualan) {}

  //   public get libPenjualan() {
  //     return this._libPenjualan ?? new LibPenjualan();
  //   }
  // })(),
});

// const helper = new class {
//   // #libPenjualan: LibPenjualan | null = null

//   // public get libPenjualan() {
//   //   return this.#libPenjualan ?? new LibPenjualan
//   // }
//   /**
//    *
//    */
//   constructor(
//     private _libPenjualan?: LibPenjualan
//   ) {}

//   public get libPenjualan() {
//     return this._libPenjualan ?? new LibPenjualan
//   }

// }
