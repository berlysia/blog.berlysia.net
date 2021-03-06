import path from "path";
import { promises as fs } from "fs";
import type { GetStaticProps } from "next";
import Link from "next/link";
import { dropExt } from "../utils/ext";
import type { ArticleRouteShape } from "../types";

type Props = {
  articles: ArticleRouteShape[];
};

export const getStaticProps: GetStaticProps<Props> = async (_context) => {
  const articlesDir = path.join(process.cwd(), "data/articles");
  const years = (await fs.readdir(articlesDir)).map((year) => ({ year }));
  const months = (
    await Promise.all(
      years.flatMap(async ({ year }) =>
        (
          await fs.readdir(path.join(articlesDir, year))
        ).map((month) => ({ year, month }))
      )
    )
  ).flat();
  const dates = (
    await Promise.all(
      months.flatMap(async ({ year, month }) =>
        (
          await fs.readdir(path.join(articlesDir, year, month))
        ).flatMap((date) => ({ year, month, date }))
      )
    )
  ).flat();
  const slugs = (
    await Promise.all(
      dates.flatMap(async ({ year, month, date }) =>
        (
          await fs.readdir(path.join(articlesDir, year, month, date))
        ).flatMap((slug) => ({ year, month, date, slug: dropExt(slug) }))
      )
    )
  ).flat();
  return {
    props: { articles: slugs },
  };
};

export default function Home({ articles }: Props) {
  return (
    <div>
      <ul>
        {articles.map(({ year, month, date, slug }, index) => (
          <li key={index}>
            <Link
              href={{
                pathname: "/articles/[year]/[month]/[date]/[slug]",
                query: {
                  year,
                  month,
                  date,
                  slug,
                },
              }}
            >
              {slug}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
