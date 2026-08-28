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
  library?: Library<T>,
  callback?: (entry: Entry<T>, index: number) => void,
) {
  library ??= lib();

  withProgress(
    library.entries(),
    (e, i) => {
      e.recalc();
      callback?.(e, i);
    },
    library.title,
  );
}

export function withProgress<T>(
  items: T[],
  callback: (item: T, index: number) => void,
  title?: string,
) {
  title ??= "Calculating";
  const id = title;
  const total = items.length;

  message(title);
  for (let i = 0; i < items.length; i++) {
    callback?.(items[i], i);
    showNotif(id, title, `${i + 1} of ${total}`);
  }
  showNotif(id, "Finisehd " + title, `${total} of ${total}`);
}
