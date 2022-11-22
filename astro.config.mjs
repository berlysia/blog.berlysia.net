import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import mdx from "@astrojs/mdx";

import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeToc from "@jsdevtools/rehype-toc";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";

// https://astro.build/config
// https://github.com/withastro/astro/issues/5172 動かない
// import vercel from "@astrojs/vercel/static";
import vercel from "@astrojs/vercel/edge";

function renameFootnoteSectionPlugin() {
  const isEl = (x) => x.type === "element";
  return function (tree) {
    const footnoteHeadingEl = tree.children
      .find((x) => isEl(x) && "dataFootnotes" in x.properties)
      ?.children.find((x) => isEl(x) && x.tagName === "h2")
      ?.children.find((x) => isEl(x) && x.tagName === "a")
      ?.children.find((x) => x.type === "text");
    if (footnoteHeadingEl) {
      footnoteHeadingEl.value = "脚注";
    }
  };
}

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx({
      // 動かない。 https://github.com/withastro/astro/pull/5432 リリースされたら renameFootnoteSectionPlugin を消す
      remarkRehype: { footnoteLabel: "脚注" },
      remarkPlugins: [],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        [rehypeToc, {}],
        rehypeAccessibleEmojis,
        renameFootnoteSectionPlugin,
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
  ],
  markdown: {},
  output: "server",
  adapter: vercel(),
});
