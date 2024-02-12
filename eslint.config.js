import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import configBerlysia from "@berlysia/eslint-config";
import pluginBerlysia from "@berlysia/eslint-plugin";

const currentDir = dirname(fileURLToPath(import.meta.url));

export default configBerlysia(
  {
    typescript: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: currentDir,
      },
    },
  },
  pluginBerlysia.configs.recommended,
  {
    ignores: ["app/generated/**/*", "**/*.d.ts"],
  }
);
