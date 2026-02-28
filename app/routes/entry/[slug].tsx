import { run } from "@mdx-js/mdx";
import { ssgParams } from "hono/ssg";
import { createRoute } from "honox/factory";
import type { NotFoundHandler } from "hono";
import type { FC } from "hono/jsx";
import Image from "../../islands/Image";
import { getSlugs, getBySlug } from "../../seeds/localReader";
import BlogArticleLayout from "../../components/Article/BlogArticleLayout";
import { SITE_BLOG_URL } from "../../constant";
import EmbeddedLink from "../../components/EmbededLink";
import ViewerModeProvider from "../../islands/ViewerModeProvider";
import Tweet from "../../islands/Tweet";
import { wrapResult } from "../../lib/wrapResult";
import notFound from "./404";

const notFoundHandler = notFound.at(-1) as NotFoundHandler;

// 記事固有islandコンポーネントを一括ロード
// Viteのisland検出パイプラインを経由するため自動で <honox-island> ラッピングされる
const articleIslandModules = import.meta.glob<{ default: FC }>(
  "../../islands/articles/**/*.tsx",
  { eager: true }
);

function getArticleIslands(slug: string): Record<string, FC> {
  const components: Record<string, FC> = {};
  for (const [modulePath, mod] of Object.entries(articleIslandModules)) {
    const match = modulePath.match(/\/articles\/([^/]+)\/([^/]+)\.tsx$/);
    if (match && match[1] === slug) {
      components[match[2]] = mod.default;
    }
  }
  return components;
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
      jsx: runtime.jsx,
      jsxs: runtime.jsxs,
      Fragment: runtime.Fragment,
      baseUrl: new URL(`../../generated/articles/${slug}/`, import.meta.url)
        .href,
    });

    const article = getBySlug(slug as any);
    if (!article) return notFoundHandler(c);

    const { frontmatter } = article;
    const articleIslands = getArticleIslands(slug);

    return c.render(
      <ViewerModeProvider
        defaultViewerMode={
          frontmatter.preferVertical ? "vertical-multicol" : "horizontal"
        }
      >
        <BlogArticleLayout frontmatter={frontmatter}>
          <Content
            components={{ Image, Tweet, EmbeddedLink, ...articleIslands }}
          />
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
