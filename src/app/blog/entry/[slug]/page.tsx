import { readFile, readdir } from "node:fs/promises";
import { basename, resolve } from "node:path";
import type { Metadata } from "next";
import { processMDX } from "./processMDX";
import BlogArticleLayout from "./impl";

const ARTICLE_PATH = "src/articles";

export async function generateStaticParams() {
  // src/articlesディレクトリのファイル一覧を fs/promises readdir を使って取得
  const posts = await readdir(resolve(process.cwd(), ARTICLE_PATH));

  return posts
    .filter((x) => x.endsWith(".mdx"))
    .map((post) => ({
      slug: basename(post, ".mdx"),
    }));
}

type Params = Awaited<ReturnType<typeof generateStaticParams>>[number];

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = params;

  const mdx = await readFile(
    resolve(process.cwd(), ARTICLE_PATH, `${slug}.mdx`),
    "utf8"
  );

  const result = await processMDX(mdx, slug);

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
