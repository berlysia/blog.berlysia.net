import rehypeToc from "@jsdevtools/rehype-toc";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import type { Frontmatter } from "./utils.js";
import {
  remarkResolveAssets,
  renameFootnoteSectionName,
  frontmatterSchema,
} from "./utils.js";

export async function processMDX(mdx: string, slug: string) {
  // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error -- ts-ignoreじゃないといけない事情がある
  // @ts-ignore -- スクリプトとしての実行時に型が合わないが実体はある
  const { serialize } = await import("next-mdx-remote/serialize");
  const { default: remarkGfm } = await import("remark-gfm");
  const { default: rehypeAutolinkHeadings } = await import(
    "rehype-autolink-headings"
  );
  const { default: rehypeSlug } = await import("rehype-slug");
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
