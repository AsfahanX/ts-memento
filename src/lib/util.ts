export function createItemsFromParagraph(text: string) {
  return text
    .split("\n")
    .filter((v) => v.trim().length > 0)
    .map((v) => {
      const tokens = v.trim().split(/^(.+)\s(\d+)$/);
      return {
        name: (tokens?.length > 1 ? tokens[1] : tokens[0]).trim(),
        amount: tokens.length > 1 ? parseFloat(tokens[2]) * 1000 : 0,
      };
    });
}

