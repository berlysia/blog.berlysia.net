import formatDate from "../../../lib/dateFormatter";
import type { Article } from "../../../seeds/remoteReader";
import { ArticleLink } from "./ArticleLink/ArticleLink";

export const ArticleArea = ({
  genreTitle,
  articles,
  withHatenaBookmark,
}: {
  genreTitle: string;
  articles: Article[];
  withHatenaBookmark?: boolean;
}) => {
  return (
    <div>
      <h2 className="tw-text-2xl tw-font-bold tw-mb-2">{genreTitle}</h2>
      <ul className="tw-p-0">
        {articles.map(({ link, title, pubDate, siteTitle, siteUrl }) => (
          <li
            key={link}
            className="tw-text-base tw-border-0 tw-border-b tw-border-solid tw-border-gray-100"
          >
            <ArticleLink
              href={link}
              title={title}
              pubDateString={formatDate(pubDate)}
              withHatenaBookmark={withHatenaBookmark}
              target="_blank"
              site={
                siteTitle && siteUrl
                  ? { title: siteTitle, url: siteUrl }
                  : undefined
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
