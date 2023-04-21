import seed from "./.tmp/local.json";

export function getLocalArticles() {
  return Object.values(seed);
}

export function getSlugs(): (keyof typeof seed)[] {
  return Object.keys(seed) as (keyof typeof seed)[];
}

export function getBySlug(
  slug: keyof typeof seed
): ReturnType<typeof getLocalArticles>[number] {
  return seed[slug];
}
