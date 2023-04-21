import type { ReactNode } from "react";
import Header from "../../../../components/Header";
import type { Frontmatter } from "../../../../lib/mdx/utils.js";
import VerticalClassWrapper from "./VerticalClassWrapper";
import styles from "./impl.module.css";
import WritingModeSwitcher from "./WritingModeSwitcher";
import Article from "./Article";

type Properties = {
  frontmatter: Frontmatter;
  children: ReactNode;
};
export default function BlogArticleLayout({
  frontmatter,
  children,
}: Properties) {
  return (
    <VerticalClassWrapper preferVertical={frontmatter.preferVertical}>
      <Header>
        <div className="tw-shrink tw-overflow-ellipsis tw-overflow-hidden tw-whitespace-nowrap">
          <a className="tw-text-lg tw-font-semibold tw-ml-2" href="/blog">
            berlysia.net/blog
          </a>
          <span className="tw-font-normal">
            <span className="tw-mx-1">-</span>
            <span className="">{frontmatter.title}</span>
          </span>
        </div>
        <div className="tw-ml-auto">
          <WritingModeSwitcher />
        </div>
      </Header>
      <div className={styles.wrapper}>
        <div className="tw-w-full tw-relative tw-max-w-screen-lg">
          <Article>
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
          </Article>
        </div>
      </div>
    </VerticalClassWrapper>
  );
}
