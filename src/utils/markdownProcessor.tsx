import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import yaml from "yaml";
import remarkFootnotes from "remark-footnotes";
import remark2rehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatterPlugin from "remark-extract-frontmatter";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import remarkAutolinkHeadings from "remark-autolink-headings";
import rehypeReact from "rehype-react";
import React from "react";
import rehypeParse from "rehype-parse";
import { unified } from "unified";

export function getServerSideProcessor() {
  return unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ["yaml"])
    .use(remarkFrontmatterPlugin, { name: "frontmatter", yaml: yaml.parse })
    .use(remarkGfm)
    .use(remarkSlug)
    .use(remarkAutolinkHeadings, { behavior: "wrap" })
    .use(remarkFootnotes, { inlineNotes: true })
    .use(remark2rehype)
    .use(rehypeStringify);
}

export function getClientSideProcessor() {
  return unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeReact, { createElement: React.createElement });
}
