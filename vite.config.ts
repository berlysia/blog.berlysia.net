import honox from "honox/vite";
import client from "honox/vite/client";
import { defineConfig } from "vite";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import ssgBuild from "@hono/vite-ssg";

const entry = "app/server.ts";

export default defineConfig(({ mode, command }) => {
  const common = {
    ssr: {
      external: ["debug", "acorn-jsx"],
    },
    optimizeDeps: {
      entries: ["./app/server.ts"],
    },
    resolve: {
      alias: [{ find: /#/, replacement: "/app/" }],
    },
  };

  if (mode === "client") {
    return {
      ...common,
      build: {
        rollupOptions: {
          input: ["./app/style.css"],
          output: {
            assetFileNames: "static/assets/[name]-[hash].[ext]",
          },
        },
      },
      plugins: [client(), viteCommonjs()],
    };
  }

  return {
    ...common,
    build: {
      emptyOutDir: false,
    },
    plugins: [honox(), ssgBuild({ entry }), viteCommonjs()],
  };
});
