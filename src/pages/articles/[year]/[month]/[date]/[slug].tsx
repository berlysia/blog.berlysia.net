import path from "path";
import { promises as fs } from "fs";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Article } from "../../../../../components/Article";
import { addExt, dropExt } from "../../../../../utils/ext";
import {
  getServerSideProcessor,
  getClientSideProcessor,
} from "../../../../../utils/markdownProcessor";
import type { ArticleMeta } from "../../../../../utils/ArticleValidator";
import { isValidArticleMeta } from "../../../../../utils/ArticleValidator";

type Props = {
  meta: ArticleMeta;
  content: string;
  year: string;
  month: string;
  date: string;
};

type Params = {
  year: string;
  month: string;
  date: string;
  slug: string;
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
  const articles = (
    await Promise.all(
      dates.flatMap(async ({ year, month, date }) =>
        (
          await fs.readdir(path.join(articlesDir, year, month, date))
        ).flatMap((slug) => ({ year, month, date, slug: dropExt(slug) }))
      )
    )
  ).flat();
  return {
    paths: articles.map((params) => ({
      params,
    })),
    fallback: false,
  };
};

async function fileExists(filepath: string) {
  try {
    return (await fs.lstat(filepath)).isFile();
  } catch (_e: unknown) {
    return false;
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const year = context.params?.year;
  const month = context.params?.month;
  const date = context.params?.date;
  const slug = context.params?.slug;
  if (!year) throw new Error("invalid year");
  if (!month) throw new Error("invalid month");
  if (!date) throw new Error("invalid date");
  if (!slug) throw new Error("invalid slug");

  const articlesDir = path.join(
    process.cwd(),
    "data/articles",
    year,
    month,
    date
  );
  const isExist = await fileExists(path.join(articlesDir, addExt(slug)));
  const filepath = isExist
    ? path.join(articlesDir, addExt(slug))
    : path.join(articlesDir, slug, "index.md");
  const article = await fs.readFile(filepath, "utf-8");
  const processed = await getServerSideProcessor().process(article);

  if (!isValidArticleMeta(processed.data.frontmatter)) {
    console.error(filepath);
    throw new Error("broken frontmatter");
  }
  return {
    props: {
      meta: JSON.parse(JSON.stringify(processed.data.frontmatter)),
      content: String(processed.value),
      year,
      month,
      date,
      slug,
    },
  };
};

function useRehype(vfile: string) {
  const [data, setData] = useState<ReactNode | null>(null);
  useEffect(() => {
    (async () => {
      const processed = await getClientSideProcessor().process(vfile);
      setData(processed.result as ReactNode);
    })();
    return () => {
      setData(null);
    };
  }, [vfile]);
  return data;
}

export default function Content({ meta, content }: Props) {
  const node = useRehype(content);
  return <Article meta={meta}>{node}</Article>;
}
