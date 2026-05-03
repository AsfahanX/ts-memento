import libJurnal from "./lib/lib-jurnal";
import libJurnalItem from "./lib/lib-jurnal-item";
import { AvailableLibraries } from "./types/memento";

type LibraryName = keyof AvailableLibraries;
function _() {
  return {};
}
_.formatRupiah = function (nominal: number) {
  if (!nominal) {
    return null;
  }
  return "Rp " + nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  // return nominal.toLocaleString("id-ID", {
  //   style: "currency",
  //   currency: "IDR",
  // });
};

// function _() {}
// _.formatRupiah = function (nominal: number) {
//   if (!nominal) {
//     return null;
//   }
//   return "Rp " + nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
//   // return nominal.toLocaleString("id-ID", {
//   //   style: "currency",
//   //   currency: "IDR",
//   // });
// };
// _.coba1 = function coba1() {
//   return "satu";
// };

_.libJurnal = libJurnal;
_.libJurnalItem = libJurnalItem;

// function coba1() {
//   return "satu";
// }
// function coba2() {
//   return "dua";
// }

// function ubahKolomKeRelasi(
//   foreignKey: LibraryName,
//   column: string,
//   libraryName: LibraryName,
//   ownerKey: string,
// ) {
//   lib()
//     .entries()
//     .forEach((e) => {
//       const val = e.field(column);
//       if (val) {
//         const parentLib = libByName(libraryName);
//         const parent = parentLib?.findByKey(val);
//         e.set(foreignKey, [parent]);
//       }
//     });
// }

// function dialogKonfirmasi(callback: () => boolean | void) {
//   dialog()
//     .view(ui().layout([ui().button("Yes").action(callback), ui().button("No")]))
//     .show();
// }

// const MasterAkun = {
//   field: {
//     totalDebit() {
//       const entries = libByName("Jurnal Lanjutan")?.linksTo(entry());
//     },
//   },
// };

// function libItemPenjualan() {
//   libById<ItemPenjualan>(libItemPenjualan.id);
// }
// libItemPenjualan.id = "add";

// function libPesananPenjualan() {
//   return libById<PesananPenjualan>(libPesananPenjualan.id);
// }
// libPesananPenjualan.id = "RE4pK2hXUllyUlNtd1VRWjJrVG0";
// libPesananPenjualan.events = {
//   entryUpdated() {},
// };
// --------+++------
// if (true) {
//   let e = entry();
//   let brg = e.obtain("Barang");

//   if (brg.length > 0) {
//     let gbr = brg[0].obtain("Gambar");
//     e.set("Gambar", gbr);
//     message("Gambar barang diupdate");
//   }
// }
