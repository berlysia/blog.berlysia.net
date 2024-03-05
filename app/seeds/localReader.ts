import type { Frontmatter } from "../lib/mdx/utils";
import seed from "./.tmp/local.json";

type Slug = keyof typeof seed;

export function getLocalArticles(): Array<{
  slug: Slug;
  frontmatter: Frontmatter;
}> {
  return Object.values(seed) as Array<{
    slug: Slug;
    frontmatter: Frontmatter;
  }>;
}

export function getSlugs(): Slug[] {
  return Object.keys(seed) as Slug[];
}

export function getBySlug(
  slug: Slug
): ReturnType<typeof getLocalArticles>[number] {
  return seed[slug] as ReturnType<typeof getLocalArticles>[number];
}
