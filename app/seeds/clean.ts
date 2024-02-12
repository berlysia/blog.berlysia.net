import { ensureDir } from "fs-extra";
import { readdir, rm } from "fs/promises";
import { resolve } from "path";

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
  clean();
}
