import type { Metadata } from "next";
import Header from "../../../../components/Header";
import { ArticleLink } from "../../../../components/pages/root/ArticleLink/ArticleLink";
import formatDate from "../../../../lib/dateFormatter";
import { getByGenre } from "../../../../seeds/remoteReader";
import { getLocalArticles } from "../../../../seeds/localReader";
import { SITE_BLOG_NAME } from "../../../../constant";
import { Categories } from "../../Categories";

const outsideArticles = {
  imas: getByGenre("imas", Number.POSITIVE_INFINITY),
  tech: getByGenre("tech", Number.POSITIVE_INFINITY),
};

export async function generateStaticParams() {
  return [
    ...new Set(
      getLocalArticles()
        .flatMap((x) => x.frontmatter.tags)
        .concat("imas", "tech")
    ),
  ].map((category) => ({ category }));
}

type Params = Awaited<ReturnType<typeof generateStaticParams>>[number];

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { category } = params;

  return {
    title: `[${category}] - ${SITE_BLOG_NAME}`,
  };
}

export default async function BlogPageIndex({ params }: { params: Params }) {
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
    ...publishedLocalEntries.filter(
      (x) => x.frontmatter.category === params.category
    ),
    ...(Object.keys(outsideArticles).includes(params.category)
      ? outsideArticles[params.category as keyof typeof outsideArticles]
      : []),
  ].sort((a, b) => b.pubDate - a.pubDate);

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
          <Categories currentCategory={params.category} />
          {publishedEntries.length > 0 ? (
            <ol>
              {publishedEntries.map((x, i) => (
                <li key={i}>
                  {x.kind === "local" ? (
                    <ArticleLink
                      href={`/blog/entry/${x.slug}`}
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
        </div>
      </div>
    </div>
  );
}
