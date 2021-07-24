import path from "path";
import { promises as fs } from "fs";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { dropExt } from "../../../../../utils/ext";

type Props = {
  year: string;
  month: string;
  date: string;
  slugs: string[];
};

type Params = {
  year: string;
  month: string;
  date: string;
};

export const getStaticPaths: GetStaticPaths<Params> = async (_context) => {
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
  return {
    paths: dates.map((params) => ({
      params,
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const year = context.params?.year;
  const month = context.params?.month;
  const date = context.params?.date;
  if (!year) throw new Error("invalid year");
  if (!month) throw new Error("invalid month");
  if (!date) throw new Error("invalid date");
  const articlesDir = path.join(
    process.cwd(),
    "data/articles",
    year,
    month,
    date
  );
  const slugs = (await fs.readdir(articlesDir)).map(dropExt);
  return {
    props: {
      year,
      month,
      date,
      slugs,
    },
  };
};

export default function Article({ year, month, date, slugs }: Props) {
  return (
    <div>
      <ul>
        {slugs.map((slug) => (
          <li key={slug}>
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
