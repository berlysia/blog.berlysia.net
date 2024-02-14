import honox from "honox/vite";
import client from "honox/vite/client";
import { defineConfig } from "vite";
import { viteCommonjs, esbuildCommonjs } from "@originjs/vite-plugin-commonjs";
import ssg from "@hono/vite-ssg";
import pages from "@hono/vite-cloudflare-pages";

const entry = "./app/server.ts";

export default defineConfig(({ mode, command }) => {
  const plugins =
    mode === "client" ? [client()] : [honox({ entry }), ssg({ entry })];

  plugins.push(viteCommonjs());

  return {
    build:
      mode === "client"
        ? {
            outDir: ".hono",
            rollupOptions: {
              input: ["./app/style.css"],
              output: {
                assetFileNames: "static/assets/[name]-[hash].[ext]",
              },
            },
          }
        : {},
    ssr: {
      external: ["debug", "acorn-jsx"],
    },
    plugins,
    resolve: {
      alias: [{ find: /#/, replacement: "/app/" }],
    },
  };
});
