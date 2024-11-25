import {
  readdir,
  readFile,
  writeFile,
  stat,
  copyFile,
  rm,
} from "node:fs/promises";
import path from "node:path";
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
  const outDir = path.resolve(cwd, "public/static/articles");
  const generatedDir = path.resolve(cwd, "app/generated/articles");

  await clean();

  await ensureDir(outDir);
  await ensureDir(generatedDir);

  // articlesディレクトリ直下のmdxファイルか、そのサブディレクトリにあるindex.mdxファイルを取得
  const filesInArticles = await readdir(path.resolve(cwd, ARTICLE_PATH));
  const articleFilesPromises = await Promise.all(
    filesInArticles.map(async (filename) => {
      const currentDirOrFile = path.resolve(cwd, ARTICLE_PATH, filename);
      const fileStat = await stat(currentDirOrFile);
      const isDirectory = fileStat.isDirectory();
      if (isDirectory) {
        const files = await readdir(currentDirOrFile);
        return files
          .filter((x) => x === "index.mdx")
          .map((x) => `${filename}/${x}`);
      }
      return filename;
    })
  );
  const articleFiles = articleFilesPromises
    .flat()
    .filter((x) => x.endsWith(".mdx"));

  const queue = new PQueue({ concurrency: 4 });

  const compiledArticles = await Promise.all(
    articleFiles.map(async (filename) => {
      const isInDirectory = filename.includes("/");
      const slug = isInDirectory
        ? filename.split("/")[0]
        : path.basename(filename, ".mdx");
      const contentFilePath = path.resolve(cwd, ARTICLE_PATH, filename);
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
        // 他のファイルを移動する
        const articleDir = path.resolve(cwd, ARTICLE_PATH, slug);
        const destDir = path.resolve(outDir, slug);
        await Promise.all([
          ensureDir(destDir),
          ensureDir(path.resolve(generatedDir, slug)),
        ]);

        await writeFile(
          path.resolve(generatedDir, slug, `index.jsx`),
          compiled.value,
          "utf8"
        );

        if (isInDirectory) {
          const files = await readdir(articleDir);
          for (const file of files) {
            if (file.endsWith(".mdx")) continue;
            const src = path.resolve(articleDir, file);
            const dest = path.resolve(destDir, file);
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

  const SEEDS_DIR = path.resolve(cwd, "app", "seeds");

  await ensureDir(path.resolve(SEEDS_DIR, ".tmp"));
  await writeFile(
    path.resolve(SEEDS_DIR, ".tmp", "local.json"),
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
