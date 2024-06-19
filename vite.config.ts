import { resolve } from "node:path";
import honox from "honox/vite";
import client from "honox/vite/client";
import { defineConfig } from "vite";
import ssgBuild from "@hono/vite-ssg";

const entry = "app/server.ts";

export default defineConfig(async ({ mode }) => {
  const common = {
    build: {
      sourcemap: true,
    },
    ssr: {
      external: ["unified", "@mdx-js/mdx", "satori", "@resvg/resvg-js", "feed"],
    },
    resolve: {
      alias: [{ find: /#/, replacement: "/app/" }],
    },
  };

  if (mode === "functions") {
    return {
      ...common,
      output: {
        format: "esm",
      },
      ssr: {
        noExternal: true,
        ...common.ssr,
      },
      build: {
        ...common.build,
        emptyOutDir: false,
        rollupOptions: {
          input: ["app/functions/ogrenderer.tsx"],
          output: {
            entryFileNames(chunkInfo) {
              const entryPathFromRoutesRoot = chunkInfo.facadeModuleId
                .replace(resolve("app/functions"), "")
                .replace(/\.tsx$/, ".js");
              return `functions${entryPathFromRoutesRoot}`;
            },
          },
          preserveEntrySignatures: "allow-extension",
        },
      },
    };
  }

  return {
    ...common,
    build: {
      ...common.build,
      emptyOutDir: false,
    },
    ssr: {
      noExternal: true,
      ...common.ssr,
    },
    plugins: [
      honox(),
      ssgBuild({ entry }),
      client({
        input: ["./app/style.css", "./app/ogviewer.css"],
      }),
    ],
  };
});
