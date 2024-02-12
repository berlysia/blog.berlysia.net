import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import honox from "honox/vite";
import client from "honox/vite/client";
import { defineConfig } from "vite";
import { viteCommonjs, esbuildCommonjs } from "@originjs/vite-plugin-commonjs";
import ssg from "@hono/vite-ssg";
import devServer from "@hono/vite-dev-server";

const entry = "./app/server.ts";

export default defineConfig(({ mode, command }) => {
  const plugins =
    mode === "client"
      ? [client()]
      : [
          honox({ entry }),
          ssg({ entry }),
          {
            name: "foo",
            config() {
              return { build: { emptyOutDir: false } };
            },
          },
        ];

  plugins.push(viteCommonjs());

  if (mode === "development" && command === "serve") {
    plugins.push(devServer({ entry }));
  }

  return {
    build: {
      rollupOptions:
        mode === "client"
          ? {
              input: ["./app/style.css"],
              output: {
                assetFileNames: "static/assets/[name].[ext]",
              },
            }
          : {},
    },
    ssr: {
      external: ["debug", "acorn-jsx"],
    },
    optimizeDeps: {
      entries: ["./app/server.ts"],
    },
    plugins,
    resolve: {
      alias: [
        { find: /#/, replacement: "/app/" },
        {
          find: /^\/static\/(.*?)\.js/,
          replacement: resolve(
            // Node 18 support
            dirname(fileURLToPath(import.meta.url)),
            "dist/static/$1.js"
          ),
        },
      ],
    },
  };
});
