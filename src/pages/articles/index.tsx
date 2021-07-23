import path from "path";
import { promises as fs } from "fs";
import type { GetStaticProps } from "next";
import Link from "next/link";
import { dropExt } from "../../utils/ext";
import { Links } from "../../components/links";

type Props = {
  data: string[];
};

export const getStaticProps: GetStaticProps<Props> = async (_context) => {
  const articlesDir = path.join(process.cwd(), "data/articles");
  const articles = await fs.readdir(articlesDir);
  return {
    props: {
      data: articles.map(dropExt),
    },
  };
};

export default function Article({ data }: Props) {
  return (
    <div>
      <Links />
      <main>
        <ul>
          {data.map((name) => (
            <Link key={name} href={`/articles/${name}`}>
              {name}
            </Link>
          ))}
        </ul>
      </main>
    </div>
  );
}
