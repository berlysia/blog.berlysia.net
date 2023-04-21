import { ensureDir } from "fs-extra";
import { readdir, readFile, writeFile } from "fs/promises";
import { basename, resolve } from "path";
import * as pkg from "../lib/mdx/processForSeed.mjs";

const { processMDX } = pkg;

const ARTICLE_PATH = "src/articles";

const filesInArticles = await readdir(resolve(process.cwd(), ARTICLE_PATH));

const articleFiles = filesInArticles.filter((x) => x.endsWith(".mdx"));

const articles = await Promise.all(
  articleFiles.map((filename) =>
    readFile(resolve(process.cwd(), ARTICLE_PATH, filename), "utf8").then(
      (content) => processMDX(content, basename(filename))
    )
  )
);

const __dirname = resolve(process.cwd(), "src", "seeds");

await ensureDir(resolve(__dirname, ".tmp"));
await writeFile(
  resolve(__dirname, ".tmp", "local.json"),
  JSON.stringify(articles, null, 2),
  "utf-8"
);

console.log("local articles are ready");
