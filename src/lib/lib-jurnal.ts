import libJurnalItem from "./lib-jurnal-item";

export default function libJurnal() {
  return libById(libJurnal.id);
}

libJurnal.id = "SmpxUWFTSUEhPj5XckZUTSp6Y0M";

libJurnal.events = {
  entryDeleted() {
    libJurnalItem()
      ?.linksTo(entry())
      .forEach((e) => e.trash());
  },
};
