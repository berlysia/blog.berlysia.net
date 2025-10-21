import configBerlysia from "@berlysia/eslint-config";
import pluginBerlysia from "@berlysia/eslint-plugin";

const currentDir = import.meta.dirname;

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
    files: ["app/seeds/**/*.ts", "scripts/**/*.ts"],
    rules: {
      "node/no-top-level-await": "off",
      "@berlysia/prefer-closest-import-path": "off",
    },
  },
  {
    ignores: ["app/generated/**/*", "**/*.d.ts"],
  },
  {
    rules: {
      "react/jsx-no-useless-fragment": "off",
    },
  }
);
