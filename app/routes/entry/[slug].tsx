import BlogArticleLayout from "#components/Article/BlogArticleLayout";
import { getSlugs, getBySlug } from "#seeds/localReader";
import { run } from "@mdx-js/mdx";
import { ssgParams } from "hono/ssg";
import { createRoute } from "honox/factory";
import Image from "#components/mdx/Image";

export default createRoute(
  ssgParams(() => getSlugs().map((slug) => ({ slug }))),
  async (c) => {
    const slug = c.req.param("slug");
    if (slug === ":slug") return c.status(404);

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
        <Content components={{ Image }} />
      </BlogArticleLayout>,
      { title: frontmatter.title, description: frontmatter.description }
    );
  }
);
