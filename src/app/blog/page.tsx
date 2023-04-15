import { readdir, readFile } from "node:fs/promises";
import { basename, resolve } from "node:path";
import Header from "../../components/Header";
import { ArticleLink } from "../../components/pages/root/ArticleLink/ArticleLink";
import { processMDX } from "./entry/[slug]/processMDX";

export default async function BlogPageIndex() {
  const articles = await readdir(resolve(process.cwd(), "src/articles"));
  const posts = articles.filter((x) => x.endsWith(".mdx"));

  const entries = await Promise.all(
    posts.map(async (post) => {
      const slug = basename(post, ".mdx");
      const mdx = await readFile(
        resolve(process.cwd(), "src/articles", post),
        "utf8"
      );
      const result = await processMDX(mdx, slug);
      return {
        slug,
        ...result,
      };
    })
  );

  return (
    <div>
      <Header>
        <div>
          <a className="tw-text-lg tw-font-semibold tw-ml-2" href="/blog">
            berlysia.net/blog
          </a>
        </div>
      </Header>
      <div className="tw-w-full tw-flex tw-justify-center">
        <div className="tw-max-w-screen-lg tw-w-full tw-h-full tw-relative">
          {entries.length > 0 ? (
            <ol>
              {entries.map((x, i) => (
                <li key={i}>
                  <ArticleLink
                    href={`/blog/entry/${x.slug}`}
                    title={x.frontmatter.title}
                    pubDateString={x.frontmatter.created!}
                    withHatenaBookmark
                  />
                </li>
              ))}
            </ol>
          ) : (
            <div>no articles</div>
          )}
        </div>
      </div>
    </div>
  );
}
