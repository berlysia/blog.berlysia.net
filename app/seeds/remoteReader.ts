import { z } from "zod";
import seed from "./.tmp/remote.json";

const ArticleSchema = z.object({
  kind: z.literal("remote"),
  title: z.string(),
  link: z.string(),
  pubDate: z.number(),
  author: z.string(),
  siteTitle: z.string().optional(),
  siteUrl: z.string().optional(),
});

export type Article = z.infer<typeof ArticleSchema>;

function ensureAuthor(item: any): any {
  if (!("author" in item) && "creator" in item) {
    return {
      ...item,
      author: item.creator,
    };
  }

  return item;
}

function populatePubDate<T extends { pubDate: string }>(
  item: T
): Omit<T, "pubDate"> & { pubDate: number } {
  const date = new Date(item.pubDate);
  return {
    ...item,
    pubDate: date.getTime(),
  };
}

function injectKind<T>(item: T): T & { kind: "remote" } {
  return {
    ...item,
    kind: "remote",
  };
}

export function getByGenre(genre: "imas" | "tech", count: number): Article[] {
  const sites: Array<{ items: any[] }> = seed[genre];
  return sites
    .flatMap((site: any) => site.items)
    .map((element) => injectKind(populatePubDate(ensureAuthor(element))))
    .filter(
      (element: unknown): element is Article =>
        ArticleSchema.safeParse(element).success
    )
    .sort((a, b) => b.pubDate - a.pubDate)
    .slice(0, count);
}
