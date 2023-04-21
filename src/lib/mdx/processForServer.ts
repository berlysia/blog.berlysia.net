import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeToc from "@jsdevtools/rehype-toc";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import remarkGfm from "remark-gfm";
import MdxImage from "../../components/mdx/Image";
import type { Frontmatter } from "./utils";
import {
  remarkResolveAssets,
  renameFootnoteSectionName,
  frontmatterSchema,
} from "./utils";

export async function processMDX(mdx: string, slug: string) {
  const result = await compileMDX<Frontmatter>({
    source: mdx,
    options: {
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
    },
    components: { Image: MdxImage },
  });

  const frontmatter = frontmatterSchema.parse(result.frontmatter);

  return {
    ...result,
    frontmatter,
  };
}
