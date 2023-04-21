import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeToc from "@jsdevtools/rehype-toc";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import remarkGfm from "remark-gfm";
import type { Frontmatter } from "./utils.mjs";
import {
  remarkResolveAssets,
  renameFootnoteSectionName,
  frontmatterSchema,
} from "./utils.mjs";
export async function processMDX(mdx: string, slug: string) {
  const result = await serialize<Frontmatter>(mdx, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm, [remarkResolveAssets, slug]],
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
    },
  });

  const frontmatter = frontmatterSchema.parse(result.frontmatter);

  return { ...result, frontmatter };
}
