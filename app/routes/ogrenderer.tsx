import ResolveManifest from "#honox/ResolveManifest";
import { buildGoogleFontUrl } from "#lib/generateImage";
import tryCatch from "#lib/tryCatch";
import { Hono } from "hono";
import type { Handler } from "hono";

type PageMeta = {
  title?: string;
  description?: string;
  image?: string;
  favicon?: string;
};

class HandlerClass {
  #results!: PageMeta;

  constructor(results: PageMeta) {
    this.#results = results;
  }

  element(element: Element) {
    if (element.tagName === "meta") {
      const attribute = element.getAttribute("property");
      switch (attribute) {
        case "og:title": {
          const value = element.getAttribute("content");
          if (!value) break;
          this.#results.title = value;
          break;
        }
        case "og:description": {
          const value = element.getAttribute("content");
          if (!value) break;
          this.#results.description = value;
          break;
        }
        case "og:image": {
          const value = element.getAttribute("content");
          if (!value) break;
          this.#results.image = value;
          break;
        }
      }
      return;
    }
    if (element.tagName === "link") {
      const rel = element.getAttribute("rel");
      if (rel === "icon") {
        const value = element.getAttribute("href");
        if (!value) return;
        this.#results.favicon = value;
      }
    }
    if (element.tagName === "title") {
      const value = element.textContent;
      if (!value) return;
      this.#results.title = value;
    }
  }
}

function ensureViewerMode(viewer: string | null): "horizontal" | "vertical" {
  if (viewer === "vertical") return "vertical";
  return "horizontal";
}

async function read(resp: Response): Promise<PageMeta> {
  const results = {};
  await new HTMLRewriter()
    .on("meta, title", new HandlerClass(results))
    .transform(resp)
    .arrayBuffer();
  return results;
}

function trimUrlForView(url: URL): string {
  const { protocol, host, pathname } = url;
  return `${protocol}//${host}${pathname}`;
}

const OgRenderer: Handler = async (c) => {
  const urlStr = c.req.query("url");
  if (urlStr === null) {
    c.status(400);
    return c.json({ error: "url is required" });
  }

  const urlResult = tryCatch(() => new URL(decodeURIComponent(urlStr)));
  if (urlResult.ok === false) {
    if (urlResult.error instanceof Error) {
      c.status(400);
      return c.json({
        error: "invalid url",
        message: `given url: ${urlStr} error: ${urlResult.error.message}`,
      });
    }
    c.status(500);
    console.error(urlResult.error);
    return c.json({ error: "unexpected error" });
  }

  const url = urlResult.value.toString();
  const resp = await fetch(url, {
    headers: { "Content-Type": "text/html" },
  });

  const viewerMode = ensureViewerMode(c.req.query("viewer"));

  const results = await read(resp);

  c.res.headers.set(
    "Cache-Control",
    "max-age=14400, s-maxage=84400, must-revalidate, stale-if-error=60"
  );
  c.res.headers.set(
    "Cloudflare-CDN-Cache-Control",
    "max-age=3600, must-revalidate, stale-if-error=600"
  );
  c.res.headers.set(
    "CDN-Cache-Control",
    "max-age=3600, must-revalidate, stale-if-error=600"
  );

  return c.html(
    <html lang="ja">
      <head>
        <meta charset="utf8" />
        <title>OG Viewer</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href={buildGoogleFontUrl({
            family: "Noto Sans JP",
            weight: 400,
            text: "",
            display: "swap",
          })}
          rel="stylesheet"
        />
        <link
          href={buildGoogleFontUrl({
            family: "Noto Sans JP",
            weight: 700,
            text: "",
            display: "swap",
          })}
          rel="stylesheet"
        />
        <ResolveManifest src="app/ogviewer.css" type="style" />
      </head>
      <body className={viewerMode}>
        <div id="wrapper">
          <img
            id="image"
            width="1"
            height="1"
            src={results.image ?? "https://img.skin/128x128"}
            alt=""
          />
          <h1 id="title">
            <a href={url} target="_block">
              {results.title ?? "No title"}
            </a>
          </h1>
          <p id="description">{results.description ?? "No description"}</p>
          <a id="url" href={url} target="_block">
            {results.favicon && (
              <img
                src={new URL(results.favicon, url).toString()}
                width="1"
                height="1"
                alt=""
              />
            )}
            {trimUrlForView(urlResult.value)}
          </a>
        </div>
      </body>
    </html>
  );
};

const app = new Hono();
app.use("*", OgRenderer);

export const onRequest: PagesFunction = async (context) => {
  return app.fetch(context.request, context.env, context);
};
