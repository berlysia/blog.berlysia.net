import honox from "honox/vite";
import client from "honox/vite/client";
import { defineConfig } from "vite";
import ssgBuild from "@hono/vite-ssg";

const entry = "app/server.ts";

export default defineConfig(({ mode, command }) => {
  const common = {
    ssr: {
      external: [
        "unified",
        "@mdx-js/mdx",
        "budoux",
        "satori",
        "@resvg/resvg-js",
      ],
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
      plugins: [client()],
    };
  }

  return {
    ...common,
    build: {
      emptyOutDir: false,
    },
    plugins: [honox(), ssgBuild({ entry })],
  };
});
