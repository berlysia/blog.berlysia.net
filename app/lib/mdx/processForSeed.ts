import remarkFrontmatter from "remark-frontmatter";
import rehypeToc from "@jsdevtools/rehype-toc";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import { compile } from "@mdx-js/mdx";
import {
  renameFootnoteSectionName,
  removeFrontmatter,
  rewriteImagePaths,
  RewriteImageOptions,
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
  const result = await compile(mdx, {
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
      rehypeAccessibleEmojis,
      renameFootnoteSectionName,
    ],
  });

  return result;
}
