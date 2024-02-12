import Header from "../Header";
import type { Frontmatter } from "../../lib/mdx/utils";
import WritingModeSwitcher from "#islands/WritingModeSwitcher";
import { PropsWithChildren, useRef } from "hono/jsx";
import ArticleSentinel from "#islands/ArticleSentinel";

type Properties = PropsWithChildren<{
  readonly frontmatter: Frontmatter;
}>;

const articleId = "blog-article-content";
const articleRootId = "blog-article-root";

export default function BlogArticleLayout({
  frontmatter,
  children,
}: Properties) {
  return (
    <div id="blog-article-root">
      <Header>
        <div className="tw-shrink tw-overflow-ellipsis tw-overflow-hidden tw-whitespace-nowrap">
          <a className="tw-text-lg tw-font-semibold tw-ml-2" href="/">
            blog.berlysia.net
          </a>
          <span className="tw-font-normal">
            <span className="tw-mx-1">-</span>
            <span className="">{frontmatter.title}</span>
          </span>
        </div>
        <div className="tw-ml-auto tw-flex tw-justify-center tw-items-center">
          <WritingModeSwitcher articleRootId={articleRootId} />
        </div>
      </Header>
      <div className="articleWrapper">
        <div className="tw-w-full tw-relative tw-max-w-screen-lg">
          <article id={articleId} className="article">
            <div>
              <h1 className="tw-text-4xl tw-font-bold tw-mbs-4">
                {frontmatter.title}
              </h1>
              {frontmatter.description && (
                <aside className="tw-text-sm tw-text-gray-500 tw-mb-2">
                  {frontmatter.description}
                </aside>
              )}
              {frontmatter.tags && (
                <ul className="tw-flex tw-flex-row tw-gap-1 tw-mli-1">
                  {frontmatter.tags.map((x, index) => (
                    <li
                      key={index}
                      className="tw-pli-1 tw-border tw-border-keyColor-100 tw-rounded-md"
                    >
                      {x}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="tw-flex tw-justify-center tw-mlb-6">
              <hr className="tw-bs-40 tw-border-0 slash" />
            </div>
            <section className="main-text-section">{children}</section>
            <ArticleSentinel articleId={articleId} />
          </article>
        </div>
      </div>
    </div>
  );
}
