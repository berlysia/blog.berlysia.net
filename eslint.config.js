import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import berlysia from "@berlysia/eslint-config";

const currentDir = dirname(fileURLToPath(import.meta.url));

export default berlysia(
  {
    typescript: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: currentDir,
      },
    },
  },
  {
    ignores: ["app/generated/**/*", "**/*.d.ts"],
  }
);
