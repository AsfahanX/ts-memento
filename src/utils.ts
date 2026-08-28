import type { Entry, Library } from "./types/memento";

function showNotif(id: string, title: string, text: string) {
  notification()
    .id(id)
    .title(title)
    .text("You have received a new message ")
    .bigText(text)
    .alertOnce()
    .show();
}

export function recalculateEntries<T>(
  l?: Library<T>,
  cb?: (e: Entry<T>) => void,
) {
  l ??= lib();
  let libName = l.name;
  let items = l.entries();
  let total = items.length;

  message("Recalculating " + libName);
  for (let i = 0; i < total; i++) {
    items[i].recalc();
    cb?.(items[i]);
    showNotif(libName, "Recalculating " + libName, i + 1 + " of " + total);
  }
  showNotif(
    libName,
    "Finisehd Recalculating " + libName,
    total + " of " + total,
  );
}
