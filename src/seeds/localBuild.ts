import { ensureDir } from "fs-extra";
import { readdir, readFile, writeFile } from "fs/promises";
import { basename, resolve } from "path";

(async function main() {
  const { processMDX } = await import("../lib/mdx/processForSeed.js");
  const ARTICLE_PATH = "src/articles";

  const filesInArticles = await readdir(resolve(process.cwd(), ARTICLE_PATH));

  const articleFiles = filesInArticles.filter((x) => x.endsWith(".mdx"));

  const articles = await Promise.all(
    articleFiles.map(async (filename) => {
      const slug = basename(filename, ".mdx");
      const content = await readFile(
        resolve(process.cwd(), ARTICLE_PATH, filename),
        "utf8"
      );
      const { frontmatter } = await processMDX(content, slug);
      return { frontmatter, slug };
    })
  );

  const SEEDS_DIR = resolve(process.cwd(), "src", "seeds");

  await ensureDir(resolve(SEEDS_DIR, ".tmp"));
  await writeFile(
    resolve(SEEDS_DIR, ".tmp", "local.json"),
    JSON.stringify(
      Object.fromEntries(articles.map((article) => [article.slug, article])),
      null,
      2
    ),
    "utf-8"
  );

  console.log("local articles are ready");
})();
