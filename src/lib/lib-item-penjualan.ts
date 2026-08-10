import libJurnalItem from "./lib-jurnal-item";

export default function libItemPenjualan() {
  if(libItemPenjualan.id)
    return libById(libItemPenjualan.id);
  return libByName(libItemPenjualan.name);
}

libItemPenjualan.name = "Item penjualan";
libItemPenjualan.id = "SmpxUWFTSUEhPj5XckZUTSp6Y0M";

libItemPenjualan.events = {
  entryDeleted() {
    libJurnalItem()
      ?.linksTo(entry())
      .forEach((e) => e.trash());
  },
};
