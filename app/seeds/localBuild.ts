import {
  readdir,
  readFile,
  writeFile,
  stat,
  copyFile,
  rm,
} from "node:fs/promises";
import { basename, resolve } from "node:path";
import { ensureDir } from "fs-extra";
import { toVFile } from "to-vfile";
import { matter } from "vfile-matter";
import PQueue from "p-queue";
import { frontmatterSchema } from "#lib/mdx/utils.js";
import clean from "./clean.js";

// eslint-disable-next-line unicorn/prefer-top-level-await -- CJSなので許せ（eslintrcをいじってもよさそうだが）
(async function main() {
  const { processMDX } = await import("../lib/mdx/processForSeed.js");
  const cwd = process.cwd();
  const ARTICLE_PATH = "articles";
  const outDir = resolve(cwd, "public/static/articles");
  const GENERATED_ARTICLES = resolve(cwd, "app/generated/articles");

  await clean();

  await ensureDir(outDir);
  await ensureDir(GENERATED_ARTICLES);

  // articlesディレクトリ直下のmdxファイルか、そのサブディレクトリにあるindex.mdxファイルを取得
  const articleFiles = (
    await Promise.all(
      (await readdir(resolve(cwd, ARTICLE_PATH))).map(async (filename) => {
        const currentDirOrFile = resolve(cwd, ARTICLE_PATH, filename);
        const isDirectory = (await stat(currentDirOrFile)).isDirectory();
        if (isDirectory) {
          return (await readdir(currentDirOrFile))
            .filter((x) => x === "index.mdx")
            .map((x) => `${filename}/${x}`);
        }
        return filename;
      })
    )
  )
    .flat()
    .filter((x) => x.endsWith(".mdx"));

  const queue = new PQueue({ concurrency: 4 });

  const compiledArticles = await Promise.all(
    articleFiles.map(async (filename) => {
      const isInDirectory = filename.includes("/");
      const slug = isInDirectory
        ? filename.split("/")[0]
        : basename(filename, ".mdx");
      const contentFilePath = resolve(cwd, ARTICLE_PATH, filename);
      const content = await readFile(contentFilePath, "utf8");
      const vfile = toVFile({ cwd, value: content });
      matter(vfile);

      const frontmatter = vfile.data.matter;

      const parsed = frontmatterSchema.safeParse(frontmatter);
      if (parsed.success === false) {
        throw new Error(
          `Invalid frontmatter in ${filename}: ${parsed.error?.message}`
        );
      }

      queue.add(async () => {
        const compiled = await processMDX(vfile, {
          slug,
        });
        await writeFile(
          resolve(GENERATED_ARTICLES, `${slug}.jsx`),
          compiled.value,
          "utf8"
        );

        if (isInDirectory) {
          // 他のファイルを移動する
          const articleDir = resolve(cwd, ARTICLE_PATH, slug);
          const destDir = resolve(outDir, slug);
          await ensureDir(destDir);
          const files = await readdir(articleDir);
          for (const file of files) {
            if (file.endsWith(".mdx")) continue;
            const src = resolve(articleDir, file);
            const dest = resolve(destDir, file);
            copyFile(src, dest);
          }
        }
      });

      return {
        slug,
        frontmatter: parsed.data,
      };
    })
  );

  const SEEDS_DIR = resolve(cwd, "app", "seeds");

  await ensureDir(resolve(SEEDS_DIR, ".tmp"));
  await writeFile(
    resolve(SEEDS_DIR, ".tmp", "local.json"),
    JSON.stringify(
      Object.fromEntries(
        compiledArticles.map((article) => [article.slug, article])
      ),
      null,
      2
    ),
    "utf8"
  );

  console.log("local articles are ready");
})();
