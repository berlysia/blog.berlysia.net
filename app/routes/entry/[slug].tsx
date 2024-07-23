import BlogArticleLayout from "#components/Article/BlogArticleLayout";
import { getSlugs, getBySlug } from "#seeds/localReader";
import { run } from "@mdx-js/mdx";
import { ssgParams } from "hono/ssg";
import { createRoute } from "honox/factory";
import Image from "#islands/Image";
import type { NotFoundHandler } from "hono";
import { SITE_BLOG_URL } from "#constant";
import EmbeddedLink from "#islands/EmbededLink";
import ViewerModeProvider from "#islands/ViewerModeProvider";
import Tweet from "#islands/Tweet";
import { wrapResult } from "../../lib/wrapResult";
import notFound from "./404";

const notFoundHandler = notFound.at(-1) as NotFoundHandler;

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
      jsx: runtime.jsx,
      jsxs: runtime.jsxs,
      Fragment: runtime.Fragment,
      baseUrl: import.meta.url,
    });

    const frontmatter = getBySlug(slug as any).frontmatter;

    return c.render(
      <ViewerModeProvider
        defaultViewerMode={
          frontmatter.preferVertical ? "vertical" : "horizontal"
        }
      >
        <BlogArticleLayout frontmatter={frontmatter}>
          <Content components={{ Image, Tweet, EmbeddedLink }} />
        </BlogArticleLayout>
      </ViewerModeProvider>,
      {
        title: frontmatter.title,
        description: frontmatter.description,
        canonical: frontmatter.canonical,
        ogImagePath: new URL(
          `/ogimage${new URL(c.req.url).pathname}.png`,
          SITE_BLOG_URL
        ).toString(),
      }
    );
  }
);
