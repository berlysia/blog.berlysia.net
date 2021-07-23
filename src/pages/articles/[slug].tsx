import path from "path";
import { promises as fs } from "fs";
import type { GetStaticProps } from "next";
import { addExt, dropExt } from "../../utils/ext";
import { Links } from "../../components/links";

type Props = {
  data: any;
};

export async function getStaticPaths() {
  const articlesDir = path.join(process.cwd(), "data/articles");
  const articles = await fs.readdir(articlesDir);
  return {
    paths: articles.map((filename) => ({
      params: { slug: dropExt(filename) },
    })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async (
  context
) => {
  const slug = context.params?.slug;
  if (!slug) throw new Error("invalid slug");

  const articlesDir = path.join(process.cwd(), "data/articles");
  const article = await fs.readFile(
    path.join(articlesDir, addExt(slug)),
    "utf-8"
  );
  return {
    props: {
      data: article,
    },
  };
};

export default function Article({ data }: Props) {
  return (
    <div>
      <Links />
      <main>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </main>
    </div>
  );
}
