import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { Metadata } from "next";
import { processMDX } from "../../../lib/mdx/processForServer";
import { getBySlug, getSlugs } from "../../../seeds/localReader";
import BlogArticleLayout from "./impl";

const ARTICLE_PATH = "src/articles";

export async function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

type Params = Awaited<ReturnType<typeof generateStaticParams>>[number];

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = params;

  const result = getBySlug(slug);

  return {
    title: result.frontmatter.title,
    description: result.frontmatter.description,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const mdx = await readFile(
    resolve(process.cwd(), ARTICLE_PATH, `${slug}.mdx`),
    "utf8"
  );

  const result = await processMDX(mdx, slug);

  return (
    <BlogArticleLayout frontmatter={result.frontmatter}>
      {result.content}
    </BlogArticleLayout>
  );
}
