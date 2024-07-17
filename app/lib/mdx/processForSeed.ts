import remarkFrontmatter from "remark-frontmatter";
import rehypeToc from "@jsdevtools/rehype-toc";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import rehypeShiki from "@shikijs/rehype";
import { compile } from "@mdx-js/mdx";
import type { RewriteImageOptions } from "./utils.js";
import {
  renameFootnoteSectionName,
  removeFrontmatter,
  rewriteImagePaths,
  wrapThreeDigits,
} from "./utils.js";

export async function processMDX(
  mdx: Parameters<typeof compile>[0],
  options: RewriteImageOptions
) {
  const { default: remarkGfm } = await import("remark-gfm");
  const { default: rehypeAutolinkHeadings } = await import(
    "rehype-autolink-headings"
  );
  const { default: rehypeSlug } = await import("rehype-slug");
  return await compile(mdx, {
    outputFormat: "function-body",
    jsxImportSource: "hono/jsx",
    remarkPlugins: [
      remarkFrontmatter,
      remarkGfm,
      removeFrontmatter,
      [rewriteImagePaths, options],
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
        },
      ],
      [rehypeToc, {}],
      wrapThreeDigits,
      rehypeAccessibleEmojis,
      renameFootnoteSectionName,
      [rehypeShiki, { theme: "github-light" }],
    ],
  });
}
