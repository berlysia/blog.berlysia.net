import path from "path";
import { promises as fs } from "fs";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

type Props = {
  year: string;
  months: string[];
};

type Params = {
  year: string;
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
  return {
    paths: months.map((params) => ({
      params,
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const year = context.params?.year;
  if (!year) throw new Error("invalid year");
  const articlesDir = path.join(process.cwd(), "data/articles", year);
  const months = await fs.readdir(articlesDir);
  return {
    props: {
      year,
      months,
    },
  };
};

export default function Article({ year, months }: Props) {
  return (
    <div>
      <ul>
        {months.map((month) => (
          <li key={month}>
            <Link
              href={{
                pathname: "/articles/[year]/[month]",
                query: { year, month },
              }}
            >
              {month}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
