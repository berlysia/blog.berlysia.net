import seed from "./.tmp/fetched.json";

export type Article = {
  title: string;
  link: string;
  pubDate: number;
  pubDateString: string;
  author: string;
  siteTitle?: string;
  siteUrl?: string;
};

function ensureAuthor(item: any): any {
  if (!("author" in item) && "creator" in item) {
    return {
      ...item,
      author: item.creator,
    };
  }

  return item;
}

const dateFormatter = new Intl.DateTimeFormat("ja-JP", {
  timeZone: "Asia/Tokyo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function populatePubDate<T extends { pubDate: string }>(
  item: T
): Omit<T, "pubDate"> & { pubDate: number; pubDateString: string } {
  const date = new Date(item.pubDate);
  return {
    ...item,
    pubDate: date.getTime(),
    pubDateString: dateFormatter.format(date),
  };
}

function validateArticle(item: any): item is Article {
  return ["title", "link", "pubDateString", "author"].every(
    (key) => typeof item[key] === "string"
  );
}

export function getByGenre(genre: "imas" | "tech", count: number): Article[] {
  const sites: { items: any[] }[] = seed[genre];
  return sites
    .flatMap((site: any) => site.items)
    .map((element) => ensureAuthor(element))
    .map((element) => populatePubDate(element))
    .filter((element): element is Article => validateArticle(element))
    .sort((a, b) => b.pubDate - a.pubDate)
    .slice(0, count);
}
