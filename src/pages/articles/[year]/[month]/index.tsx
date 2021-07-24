import path from "path";
import { promises as fs } from "fs";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

type Props = {
  year: string;
  month: string;
  dates: string[];
};

type Params = {
  year: string;
  month: string;
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
  if (!year) throw new Error("invalid year");
  if (!month) throw new Error("invalid month");
  const articlesDir = path.join(process.cwd(), "data/articles", year, month);
  const dates = await fs.readdir(articlesDir);
  return {
    props: {
      year,
      month,
      dates,
    },
  };
};

export default function Article({ year, month, dates }: Props) {
  return (
    <div>
      <ul>
        {dates.map((date) => (
          <li key={date}>
            <Link
              href={{
                pathname: "/articles/[year]/[month]/[date]",
                query: {
                  year,
                  month,
                  date,
                },
              }}
            >
              {date}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
