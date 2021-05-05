import { writeFile } from "fs/promises";
import { resolve } from "path";
import { ensureDir } from "fs-extra";
import Parser from "rss-parser";
// eslint-disable-next-line import/no-namespace -- for convenience
import * as feeds from "./feeds";

(async function main() {
  const parser = new Parser();
  const genresEntries = await Promise.all(
    Object.entries<string[]>(feeds).map(async ([genre, list]) => {
      const listOfItems = await Promise.all(
        list.map(async (url) => {
          const { items, ...feedRest } = await parser.parseURL(url);
          return {
            ...feedRest,
            items: items.map(
              ({ content, contentSnippet, ...itemRest }) => itemRest
            ),
          };
        })
      );
      return [genre, listOfItems];
    })
  );
  const genres = Object.fromEntries(genresEntries);
  await ensureDir(resolve(__dirname, ".tmp"));
  await writeFile(
    resolve(__dirname, ".tmp", "fetched.json"),
    JSON.stringify(genres, null, 2),
    "utf-8"
  );
})();
