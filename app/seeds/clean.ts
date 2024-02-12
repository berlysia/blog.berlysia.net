import { readdir, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { ensureDir } from "fs-extra";

export default async function clean() {
  // public/static/articlesディレクトリを空にする
  const cwd = process.cwd();
  const outDir = resolve(cwd, "public/static/articles");
  await ensureDir(outDir);
  const filesInPublic = await readdir(outDir);
  for (const file of filesInPublic) {
    if (file === ".gitignore") continue;
    await rm(resolve(outDir, file), { recursive: true });
  }
}

// if (require.main === module) clean();
// in esm

if (process.argv[1] === import.meta.filename) {
  // eslint-disable-next-line unicorn/prefer-top-level-await -- run as cjs
  clean();
}
