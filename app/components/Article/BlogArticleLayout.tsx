import WritingModeSwitcher from "#islands/WritingModeSwitcher";
import type { PropsWithChildren } from "hono/jsx";
import ArticleSentinel from "#islands/ArticleSentinel";
import clsx from "clsx";
import Footer from "#components/Footer";
import type { Frontmatter } from "../../lib/mdx/utils";
import Header from "../Header";

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
    <div
      id="blog-article-root"
      className={clsx({
        vertical: frontmatter.preferVertical,
        horizontal: !frontmatter.preferVertical,
      })}
    >
      <Header>
        <div className="tw-shrink tw-overflow-ellipsis tw-overflow-hidden tw-whitespace-nowrap">
          <a className="tw-text-lg tw-font-semibold tw-ml-2" href="/">
            blog.berlysia.net
          </a>
          <span className="tw-font-normal">
            <span className="tw-mx-1">-</span>
            <span>{frontmatter.title}</span>
          </span>
        </div>
        <div className="tw-ml-auto tw-flex tw-justify-center tw-items-center">
          <WritingModeSwitcher
            articleRootId={articleRootId}
            preferVertical={frontmatter.preferVertical}
          />
        </div>
      </Header>
      <div className="articleWrapper">
        <div className="tw-w-full tw-relative tw-max-w-screen-lg">
          <article className="article">
            <div className="articleContentWrapper" id={articleId}>
              <div>
                <h1 className="tw-text-4xl tw-font-bold tw-mbs-4">
                  {frontmatter.title}
                </h1>
                {frontmatter.publishedAt && (
                  <aside>
                    <span>
                      Published at: <time>{frontmatter.publishedAt}</time>
                    </span>
                    {frontmatter.lastModified &&
                      frontmatter.lastModified !== frontmatter.publishedAt && (
                        <span className="tw-mis-2">
                          Last modified: <time>{frontmatter.lastModified}</time>
                        </span>
                      )}
                  </aside>
                )}
                {frontmatter.description && (
                  <aside>{frontmatter.description}</aside>
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
            </div>
            <div className="tw-flex tw-justify-center tw-mlb-6">
              <hr className="tw-bs-40 tw-border-0 slash" />
            </div>
          </article>
        </div>
      </div>
      <Footer>
        <aside>&copy; 2024 - berlysia</aside>
      </Footer>
    </div>
  );
}
