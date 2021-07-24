import path from "path";
import { promises as fs } from "fs";
import type { GetStaticProps } from "next";
import Link from "next/link";

type Props = {
  years: string[];
};

export const getStaticProps: GetStaticProps<Props> = async (_context) => {
  const articlesDir = path.join(process.cwd(), "data/articles");
  const articles = await fs.readdir(articlesDir);
  return {
    props: {
      years: articles,
    },
  };
};

export default function Article({ years }: Props) {
  return (
    <div>
      <ul>
        {years.map((year) => (
          <li key={year}>
            <Link href={`/articles/${year}`}>{year}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
