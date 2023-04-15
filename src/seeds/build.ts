import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { ensureDir } from "fs-extra";
import Parser from "rss-parser";
// eslint-disable-next-line import/no-namespace -- for convenience
import * as feeds from "./feeds";
import old_tech from "./old_tech.json";

const __dirname = new URL(".", import.meta.url).pathname;

const parser = new Parser();
const genresEntries = await Promise.all(
  Object.entries(feeds).map(async ([genre, list]) => {
    const listOfItems = await Promise.all(
      list.map(async (feed) => {
        const { items, ...feedRest } = await parser.parseURL(feed.feedUrl);
        return {
          ...feedRest,
          items: items.map(({ content, contentSnippet, ...itemRest }) => ({
            ...itemRest,
            siteUrl: feed.siteUrl,
            siteTitle: feed.siteTitle,
          })),
        };
      })
    );
    return [genre, listOfItems];
  })
);
const genres = Object.fromEntries(genresEntries);
genres.tech.push(old_tech);
await ensureDir(resolve(__dirname, ".tmp"));
await writeFile(
  resolve(__dirname, ".tmp", "fetched.json"),
  JSON.stringify(genres, null, 2),
  "utf-8"
);
