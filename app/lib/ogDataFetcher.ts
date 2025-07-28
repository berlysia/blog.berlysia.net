import * as cheerio from "cheerio";
import tryCatch from "#lib/tryCatch";

export type PageMeta = {
  title?: string;
  description?: string;
  image?: string;
  favicon?: string;
};

async function parseOGData(html: string): Promise<PageMeta> {
  const $ = cheerio.load(html);
  const results: PageMeta = {};

  // Try to get og:title
  const ogTitle = $('meta[property="og:title"]').attr("content");
  if (ogTitle) {
    results.title = ogTitle;
  } else {
    // Fallback to regular title
    const title = $("title").text();
    if (title) {
      results.title = title;
    }
  }

  // Try to get og:description
  const ogDescription = $('meta[property="og:description"]').attr("content");
  if (ogDescription) {
    results.description = ogDescription;
  }

  // Try to get og:image
  const ogImage = $('meta[property="og:image"]').attr("content");
  if (ogImage) {
    results.image = ogImage;
  }

  // Try to get favicon
  const favicon =
    $('link[rel="icon"]').attr("href") ||
    $('link[rel="shortcut icon"]').attr("href");
  if (favicon) {
    results.favicon = favicon;
  }

  return results;
}

export async function fetchOGData(url: string): Promise<
  | {
      ok: true;
      data: PageMeta;
    }
  | {
      ok: false;
      error: string;
    }
> {
  const urlResult = tryCatch(() => new URL(url));
  if (urlResult.ok === false) {
    return {
      ok: false,
      error: `Invalid URL: ${url}`,
    };
  }

  try {
    const resp = await fetch(url);

    if (!resp.ok) {
      return {
        ok: false,
        error: `HTTP ${resp.status}: ${resp.statusText}`,
      };
    }

    const html = await resp.text();
    const data = await parseOGData(html);
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: String(error),
    };
  }
}
