import { getLocalArticles } from "#seeds/localReader";
import { Feed } from "feed";
import { useRequestContext } from "hono/jsx-renderer";
import { ssgParams } from "hono/ssg";
import { createRoute } from "honox/factory";

const feed = new Feed({
  title: "blog.berlysia.net",
  id: "https://blog.berlysia.net/",
  link: "https://blog.berlysia.net/",
  language: "ja",
  copyright: "All rights reserved 2024, berlysia",
  updated: new Date(),
  feedLinks: {
    json: "https://blog.berlysia.net/rss/json",
    feed: "https://blog.berlysia.net/rss/feed",
  },
  author: {
    name: "berlysia",
    link: "https://blog.berlysia.net",
  },
});

const localArticles = getLocalArticles();

for (const category of new Set(
  localArticles.flatMap((x) => x.frontmatter.category)
)) {
  feed.addCategory(category);
}

for (const article of localArticles) {
  const frontmatter = article.frontmatter;
  if (frontmatter.publishStatus !== "published") continue;
  feed.addItem({
    title: frontmatter.title,
    id: `https://blog.berlysia.net/entry/${article.slug}`,
    link: `https://blog.berlysia.net/entry/${article.slug}`,
    description: frontmatter.description,
    content: "",
    date: new Date(frontmatter.publishedAt),
  });
}

export default createRoute(
  ssgParams(() => ["json", "feed", "rss"].map((type) => ({ type }))),
  function FeedRenderer(c) {
    const type = c.req.param("type");

    if (type === "json") {
      c.res.headers.set("Content-Type", "application/json");
      return c.json(feed.json1());
    }
    if (type === "feed") {
      c.res.headers.set("Content-Type", "application/xml");
      return c.body(feed.atom1());
    }
    if (type === "rss") {
      c.res.headers.set("Content-Type", "application/xml");
      return c.body(feed.rss2());
    }
  }
);
