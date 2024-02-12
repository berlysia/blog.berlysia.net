import ResolveManifest from "#components/ResolveManifest";
import { Style } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";
import { Script } from "honox/server";

export default jsxRenderer(({ children }) => {
  return (
    <html lang="ja">
      <head>
        <meta charset="utf8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <ResolveManifest src="app/style.css" type="style" />
        <ResolveManifest src="app/client.ts" type="script" />
        {/* <Script src="app/client.ts" /> */}
        <Style />
      </head>
      <body>{children}</body>
    </html>
  );
});
