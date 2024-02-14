import ResolveManifest from "#components/ResolveManifest";
import { Style } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";
import { Script } from "honox/server";
import type { Manifest } from "vite";

const manifestFile = Object.values(
  import.meta.glob<{ default: Manifest }>("/.hono/.vite/manifest.json", {
    eager: true,
  })
)[0];
const manifest = manifestFile.default;

export default jsxRenderer(({ children, title, description }) => {
  return (
    <html lang="ja">
      <head>
        <meta charset="utf8" />
        <title>
          {title ? `${title} | blog.berlysia.net` : "blog.berlysia.net"}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {title && <meta property="og:title" content={title} />}
        <meta property="og:description" content={description ?? ""} />
        <meta property="og:site_name" content="blog.berlysia.net" />
        <meta property="og:locale" content="ja_JP" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@berlysia" />
        <meta
          name="twitter:title"
          content={title ? `${title} | blog.berlysia.net` : "blog.berlysia.net"}
        />
        <meta name="twitter:description" content={description ?? ""} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Zen+Kaku+Gothic+New&display=swap"
          rel="stylesheet"
        />

        <ResolveManifest src="app/style.css" type="style" manifest={manifest} />
        {/* <ResolveManifest src="app/client.ts" type="script" /> */}
        <Script src="app/client.ts" manifest={manifest} />
        <Style />
      </head>
      <body>{children}</body>
    </html>
  );
});
