import BlogArticleLayout from "#components/Article/BlogArticleLayout";
import { getSlugs, getBySlug } from "#seeds/localReader";
import { run } from "@mdx-js/mdx";
import { ssgParams } from "hono/ssg";
import { createRoute } from "honox/factory";
import Image from "#components/mdx/Image";
import type { NotFoundHandler } from "hono";
import notFound from "./404";

const notFoundHandler = notFound.at(-1) as NotFoundHandler;

async function wrapResult<T>(
  promise: Promise<T>
): Promise<{ ok: true; value: T } | { ok: false; error: Error }> {
  try {
    const value = await promise;
    return { ok: true, value };
  } catch (error) {
    return { ok: false, error };
  }
}

export default createRoute(
  ssgParams(() => getSlugs().map((slug) => ({ slug }))),
  async (c) => {
    const slug = c.req.param("slug");
    if (slug === ":slug") return notFoundHandler(c);

    const [runtime, module] = await Promise.all([
      import("hono/jsx/jsx-runtime"),
      wrapResult(import(`../../generated/articles/${slug}/index.jsx?raw`)),
    ]);

    if (!module.ok) return notFoundHandler(c);

    const { default: Content } = await run(module.value.default, {
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
