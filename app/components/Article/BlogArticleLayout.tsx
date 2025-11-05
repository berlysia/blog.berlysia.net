import type { PropsWithChildren } from "hono/jsx";
import clsx from "clsx";
import WritingModeSwitcher from "../../islands/WritingModeSwitcher";
import ViewerSettings from "../../islands/ViewerSettings";
import ViewerSettingsProvider from "../../islands/ViewerSettingsProvider";
import Footer from "../Footer";
import { NotInHorizontal, OnlyHorizontal } from "../OnlyViewMode";
import TextCombineUprightDigits from "../../lib/TextCombineUprightDigits";
import type { Frontmatter } from "../../lib/mdx/utils";
import Header from "../Header";
import { useViewerMode } from "../../lib/viewerMode";

type Properties = PropsWithChildren<{
  readonly frontmatter: Frontmatter;
}>;

const articleRootId = "blog-article-root";

export default function BlogArticleLayout({
  frontmatter,
  children,
}: Properties) {
  const viewerMode = useViewerMode();
  if (frontmatter.preferVertical) {
    viewerMode.setVerticalColumns();
  } else {
    viewerMode.setHorizontal();
  }

  return (
    <ViewerSettingsProvider>
      <div
        id="blog-article-root"
        className={clsx({
          "vertical-multicol": frontmatter.preferVertical,
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
          <div className="tw-ml-auto tw-flex tw-justify-center tw-items-center tw-gap-2">
            <ViewerSettings />
            <WritingModeSwitcher articleRootId={articleRootId} />
          </div>
        </Header>
        <div className="articleWrapper">
          <div className="contentAreaRestricter tw-w-full tw-relative">
            <article className="article">
              <div className="articleContentWrapper">
                <div className="articleContent">
                  <div>
                    <h1 className="tw-text-4xl tw-font-bold tw-mbs-4">
                      <TextCombineUprightDigits text={frontmatter.title} />
                    </h1>
                    {frontmatter.publishedAt && (
                      <aside>
                        <span>
                          Published at: <time>{frontmatter.publishedAt}</time>
                        </span>
                        {frontmatter.lastModified &&
                          frontmatter.lastModified !==
                            frontmatter.publishedAt && (
                            <span className="tw-mis-2">
                              Last modified:{" "}
                              <time>{frontmatter.lastModified}</time>
                            </span>
                          )}
                      </aside>
                    )}
                    {frontmatter.description && (
                      <aside>
                        <TextCombineUprightDigits
                          text={frontmatter.description}
                        />
                      </aside>
                    )}
                    {frontmatter.tags && (
                      <ul className="tw-flex tw-flex-row tw-gap-1 tw-mli-1">
                        {frontmatter.tags.map((x, index) => (
                          <li
                            key={index}
                            className="tw-pli-1 tw-border tw-border-keyColor-100 tw-rounded-md"
                          >
                            <TextCombineUprightDigits text={x} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="tw-flex tw-justify-center tw-mlb-6">
                    <hr className="tw-bs-40 tw-border-0 slash" />
                  </div>
                  <section className="main-text-section">{children}</section>
                  <NotInHorizontal>
                    <div className="tw-flex tw-justify-center tw-mlb-6">
                      <hr className="tw-bs-40 tw-border-0 slash" />
                    </div>
                    <Footer />
                  </NotInHorizontal>
                </div>
              </div>
              <OnlyHorizontal>
                <div className="tw-flex tw-justify-center tw-mlb-6">
                  <hr className="tw-bs-40 tw-border-0 slash" />
                </div>
              </OnlyHorizontal>
            </article>
          </div>
        </div>
        <OnlyHorizontal>
          <Footer />
        </OnlyHorizontal>
      </div>
    </ViewerSettingsProvider>
  );
}
