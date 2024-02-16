import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import honox from "honox/vite";
import client from "honox/vite/client";
import { defineConfig } from "vite";
import { viteCommonjs, esbuildCommonjs } from "@originjs/vite-plugin-commonjs";

const entry = "./app/server.ts";

export default defineConfig(({ mode, command }) => {
  const plugins = [mode === "client" ? client() : honox(), viteCommonjs()];

  return {
    build: {
      rollupOptions: {
        input: ["./app/style.css"],
        output: {
          assetFileNames: "static/assets/[name]-[hash].[ext]",
        },
      },
    },
    ssr: {
      external: ["debug", "acorn-jsx"],
    },
    optimizeDeps: {
      entries: ["./app/server.ts"],
    },
    plugins,
    resolve: {
      alias: [{ find: /#/, replacement: "/app/" }],
    },
  };
});
