import BlogArticleLayout from "#components/Article/BlogArticleLayout";
import { getSlugs, getBySlug } from "#seeds/localReader";
import { run } from "@mdx-js/mdx";
import { ssgParams } from "hono/ssg";
import { createRoute } from "honox/factory";
import Image from "#components/mdx/Image";
import HasIslandMark from "#islands/HasIslandMark";

async function Page({ slug }: { slug: string }) {}

export default createRoute(
  ssgParams(() => getSlugs().map((slug) => ({ slug }))),
  async (c) => {
    const slug = c.req.param("slug");

    const [module, runtime] = await Promise.all([
      import(`../../generated/articles/${slug}/index.jsx?raw`),
      import("hono/jsx/jsx-runtime"),
    ]);
    const { default: Content } = await run(module.default, {
      // @ts-expect-error -- fixme
      jsx: runtime.jsx,
      // @ts-expect-error -- fixme
      jsxs: runtime.jsxs,
      Fragment: runtime.Fragment,
      baseUrl: import.meta.url,
    });

    const frontmatter = getBySlug(slug as any).frontmatter;

    return c.render(
      <BlogArticleLayout frontmatter={frontmatter}>
        <HasIslandMark />
        <Content components={{ Image }} />
      </BlogArticleLayout>,
      { title: frontmatter.title, description: frontmatter.description }
    );
  }
);
