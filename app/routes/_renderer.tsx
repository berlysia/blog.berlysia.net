import ResolveManifest from "#honox/ResolveManifest";
import { Style } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";
import { Script } from "honox/server";

export function createRenderer(
  given: { headMeta?: JSX.Element; headLink?: JSX.Element } = {}
) {
  const headMeta = given.headMeta ?? <></>;
  const headLink = given.headLink ?? <></>;
  return jsxRenderer(
    ({ children, title, description, ogImagePath }) => {
      return (
        <html lang="ja">
          <head>
            <meta charset="utf8" />
            <title>
              {title ? `${title} | blog.berlysia.net` : "blog.berlysia.net"}
            </title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            {title && <meta property="og:title" content={title} />}
            <meta property="og:description" content={description ?? ""} />
            {ogImagePath && <meta property="og:image" content={ogImagePath} />}
            <meta property="og:site_name" content="blog.berlysia.net" />
            <meta property="og:locale" content="ja_JP" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@berlysia" />
            <meta
              name="twitter:title"
              content={
                title ? `${title} | blog.berlysia.net` : "blog.berlysia.net"
              }
            />
            <meta name="twitter:description" content={description ?? ""} />
            {headMeta}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Zen+Kaku+Gothic+New&display=swap"
              rel="stylesheet"
            />
            {headLink}
            <ResolveManifest src="app/style.css" type="style" />
            <Script src="/app/client.ts" />
            <Style />
          </head>
          <body>{children}</body>
        </html>
      );
    },
    { stream: true }
  );
}

export default createRenderer();
