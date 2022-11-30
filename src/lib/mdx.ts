import parseFrontmatter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkSmartyPants from "remark-smartypants";
import remarkMdx from "remark-mdx";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeToc from "@jsdevtools/rehype-toc";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import rehypeStringify from "rehype-stringify";
import { z } from "zod";

const frontmatterSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  created: z.string().optional(),
  lastModified: z.string().optional(),
  tags: z.string().optional(),
  vertical: z.boolean().optional(),
  draft: z.boolean().optional(),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;

export function parseMdx(mdx: string) {
  const frontmatterResult = parseFrontmatter(mdx);
  const html = unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(remarkSmartyPants)
    .use(remarkMdx)
    .use(remarkRehype, { footnoteLabel: "脚注" })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeToc, {})
    .use(rehypeAccessibleEmojis)
    .use(rehypeStringify)
    .processSync(mdx);

  const frontmatter = frontmatterSchema.parse(frontmatterResult.data);

  return {
    frontmatter,
    html,
  };
}
