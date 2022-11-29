import { resolve, relative, dirname, basename, isAbsolute } from "node:path";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import mdx from "@astrojs/mdx";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeToc from "@jsdevtools/rehype-toc";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";

import vercel from "@astrojs/vercel/static";
import image from "@astrojs/image";

function remarkResolveAssets() {
  return function remarkResolveAssetsImpl(tree, file) {
    // src/pages/blog/entry/foo.mdx => /blog/entry/foo
    const tmp = relative(resolve(file.cwd, "src/pages"), file.history[0]);
    const baseDir = resolve("/", dirname(tmp), basename(tmp, ".mdx"));

    function walk(curr) {
      if ("children" in curr) {
        for (const x of curr.children) {
          switch (x.type) {
            case "image": {
              // `![](./image.png)` => `![](/blog/entry/foo/image.png)` in src/pages/blog/entry/foo.mdx
              if (isAbsolute(x.url)) continue;
              const resolved = resolve(baseDir, x.url);
              x.url = resolved;
              break;
            }
            case "mdxJsxFlowElement": {
              // `<Some src="./image.png" />` => `<Some src="/blog/entry/foo/image.png" />` in src/pages/blog/entry/foo.mdx
              const srcAttr = x.attributes?.find(
                (at) => at.type === "mdxJsxAttribute" && at.name === "src"
              );
              if (!srcAttr || isAbsolute(srcAttr.value)) continue;
              const resolved = resolve(baseDir, srcAttr.value);
              srcAttr.value = resolved;
              break;
            }
          }
          walk(x);
        }
      }
    }
    walk(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx({
      remarkRehype: {
        footnoteLabel: "脚注",
      },
      remarkPlugins: [remarkResolveAssets],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "wrap",
          },
        ],
        [rehypeToc, {}],
        rehypeAccessibleEmojis,
      ],
      extendDefaultPlugins: true,
    }),
    react(),
    tailwind(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    image({
      // https://github.com/GoogleChromeLabs/squoosh/issues/1242
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
  ],
  markdown: {},
  output: "static",
  adapter: vercel(),
});
