import Header from "#components/Header";
import { ArticleLink } from "#components/ArticleLink/ArticleLink";
import { SITE_BLOG_NAME } from "#constant";
import formatDate from "#lib/dateFormatter";
import { getLocalArticles } from "#seeds/localReader";
import { Content } from "#components/Content";
import ThemeModeSwitcher from "#islands/ThemeModeSwitcher";
import ThemeModeProvider from "#islands/ThemeModeProvider";

export const metadata = {
  title: SITE_BLOG_NAME,
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

  const publishedEntries = publishedLocalEntries.sort(
    (a, b) => b.pubDate - a.pubDate
  );

  return (
    <ThemeModeProvider defaultThemeMode="system">
      <div>
        <Header>
          <div>
            <a className="tw-text-lg tw-font-semibold tw-ml-2" href="/">
              blog.berlysia.net
            </a>
          </div>
          <div className="tw-ml-auto tw-flex tw-justify-center tw-items-center">
            <ThemeModeSwitcher />
          </div>
        </Header>
        <div className="tw-w-full tw-flex tw-justify-center">
          <Content>
            {publishedEntries.length > 0 ? (
              <ol>
                {publishedEntries.map((x, i) => (
                  <li key={i}>
                    <ArticleLink
                      href={`/entry/${x.slug}`}
                      title={x.frontmatter.title}
                      pubDateString={formatDate(x.pubDate)}
                      withHatenaBookmark
                    />
                  </li>
                ))}
              </ol>
            ) : (
              <div>no articles</div>
            )}
          </Content>
        </div>
      </div>
    </ThemeModeProvider>
  );
}
