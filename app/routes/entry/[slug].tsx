import BlogArticleLayout from "#components/Article/BlogArticleLayout";
import { getSlugs, getBySlug } from "#seeds/localReader";
import { run } from "@mdx-js/mdx";
import { ssgParams } from "hono/ssg";
import { createRoute } from "honox/factory";
import Image from "#components/mdx/Image";
import Header from "#components/Header";
import type { NotFoundHandler } from "hono";

const notFoundhandler: NotFoundHandler = (c) => {
  c.status(404);
  return c.render(
    <div>
      <Header>
        <div className="tw-shrink tw-overflow-ellipsis tw-overflow-hidden tw-whitespace-nowrap">
          <a className="tw-text-lg tw-font-semibold tw-ml-2" href="/">
            blog.berlysia.net
          </a>
        </div>
      </Header>
      <div className="articleWrapper">
        <div className="tw-w-full tw-relative tw-max-w-screen-lg">
          <article className="article">
            <section className="main-text-section">
              <h1>404 - Not Found</h1>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
};

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
    if (slug === ":slug") return notFoundhandler(c);

    const [runtime, module] = await Promise.all([
      import("hono/jsx/jsx-runtime"),
      wrapResult(import(`../../generated/articles/${slug}/index.jsx?raw`)),
    ]);

    if (!module.ok) return notFoundhandler(c);

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
