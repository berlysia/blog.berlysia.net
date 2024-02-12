import Header from "#components/Header";
import { ArticleLink } from "#components/ArticleLink/ArticleLink";
import { SITE_BLOG_NAME } from "#constant";
import formatDate from "#lib/dateFormatter";
import { getLocalArticles } from "#seeds/localReader";
import { getByGenre } from "#seeds/remoteReader";
import { Categories } from "#components/Categories";
import { Content } from "#components/Content";

export const metadata = {
  title: `[ALL] - ${SITE_BLOG_NAME}`,
};

const outsideArticles = {
  imas: getByGenre("imas", Number.POSITIVE_INFINITY),
  tech: getByGenre("tech", Number.POSITIVE_INFINITY),
};

export default async function BlogPageIndex() {
  const articles = getLocalArticles();

  const allLocalEntries = articles.map((result) => ({
    kind: "local" as const,
    pubDate: new Date(result.frontmatter.publishedAt!).getTime(),
    ...result,
  }));

  const publishedLocalEntries = allLocalEntries.filter(
    (x) => x.frontmatter.publishStatus === "published"
  );

  const publishedEntries = [
    ...publishedLocalEntries,
    ...outsideArticles.imas,
    ...outsideArticles.tech,
  ].sort((a, b) => b.pubDate - a.pubDate);

  return (
    <div>
      <Header>
        <div>
          <a className="tw-text-lg tw-font-semibold tw-ml-2" href="/">
            blog.berlysia.net
          </a>
        </div>
      </Header>
      <div className="tw-w-full tw-flex tw-justify-center">
        <Content currentCategory="ALL">
          {publishedEntries.length > 0 ? (
            <ol>
              {publishedEntries.map((x, i) => (
                <li key={i}>
                  {x.kind === "local" ? (
                    <ArticleLink
                      href={`/entry/${x.slug}`}
                      title={x.frontmatter.title}
                      pubDateString={formatDate(x.pubDate)}
                      withHatenaBookmark
                    />
                  ) : (
                    <ArticleLink
                      href={x.link}
                      title={x.title}
                      pubDateString={formatDate(x.pubDate)}
                      withHatenaBookmark
                      site={
                        x.siteTitle && x.siteUrl
                          ? { title: x.siteTitle, url: x.siteUrl }
                          : undefined
                      }
                    />
                  )}
                </li>
              ))}
            </ol>
          ) : (
            <div>no articles</div>
          )}
        </Content>
      </div>
    </div>
  );
}
