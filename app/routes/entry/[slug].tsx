import BlogArticleLayout from "#components/Article/BlogArticleLayout";
import { getSlugs, getBySlug } from "#seeds/localReader";
import { run } from "@mdx-js/mdx";
import { ssgParams } from "hono/ssg";
import { createRoute } from "honox/factory";
import Image from "#components/mdx/Image";
import HasIslandMark from "#islands/HasIslandMark";

async function Page({ slug }: { slug: string }) {
  const [module, runtime] = await Promise.all([
    import(`../../../public/static/articles/${slug}/index.jsx?raw`),
    import("hono/jsx/jsx-runtime"),
  ]);
  const { default: Content } = await run(module.default, {
    // @ts-ignore -- fixme
    jsx: runtime.jsx,
    // @ts-ignore -- fixme
    jsxs: runtime.jsxs,
    Fragment: runtime.Fragment,
    baseUrl: import.meta.url,
  });

  return (
    <BlogArticleLayout frontmatter={getBySlug(slug as any).frontmatter}>
      <HasIslandMark />
      <Content components={{ Image }} />
    </BlogArticleLayout>
  );
}

export default createRoute(
  ssgParams(() => getSlugs().map((slug) => ({ slug }))),
  (c) => c.render(<Page slug={c.req.param("slug")} />)
);