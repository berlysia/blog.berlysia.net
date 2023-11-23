import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import berlysia from "@berlysia/eslint-config";
import nextPlugin from "@next/eslint-plugin-next";

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
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  }
);
