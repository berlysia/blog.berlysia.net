import path from "node:path";
import honox from "honox/vite";
import client from "honox/vite/client";
import { defineConfig } from "vite";
import type { UserConfig } from "vite";
import ssgBuild from "@hono/vite-ssg";

const entry = "app/server.ts";

export default defineConfig(async ({ mode }): Promise<UserConfig> => {
  const common: UserConfig = {
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
      // @ts-expect-error -- for rollup
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
                .replace(path.resolve("app/functions"), "")
                .replace(/\.tsx$/, ".js");
              return `functions${entryPathFromRoutesRoot}`;
            },
          },
          preserveEntrySignatures: "allow-extension",
        },
      },
    };
  }

  if (mode === "ssg") {
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
      plugins: [honox(), ssgBuild({ entry })],
    };
  }

  return {
    ...common,
    build: {
      ...common.build,
      emptyOutDir: mode === "client",
    },
    ssr: {
      noExternal: true,
      ...common.ssr,
    },
    plugins: [
      honox(),
      client({
        input: ["./app/style.css", "./app/ogviewer.css"],
      }),
    ],
  };
});
