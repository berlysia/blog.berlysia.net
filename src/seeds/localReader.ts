import type { Frontmatter } from "../lib/mdx/utils";
import seed from "./.tmp/local.json";

export function getLocalArticles(): {
  slug: string;
  frontmatter: Frontmatter;
}[] {
  return Object.values(seed) as { slug: string; frontmatter: Frontmatter }[];
}

export function getSlugs(): (keyof typeof seed)[] {
  return Object.keys(seed) as (keyof typeof seed)[];
}

export function getBySlug(
  slug: keyof typeof seed
): ReturnType<typeof getLocalArticles>[number] {
  return seed[slug] as ReturnType<typeof getLocalArticles>[number];
}
