import type { ReactNode } from "react";
import { Lato } from "@next/font/google";
import { gaEnabled, GA_ID } from "../lib/gtag";
import "../globalStyle.css";
import { InjectGA } from "../components/InjectGA";

const lato = Lato({
  subsets: ["latin"],
  weight: "300",
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
          * {
            font-family:
              ${lato.style.fontFamily}, "Helvetica Neue", "Helvetica",
              "Hiragino Kaku Gothic ProN", YuGothic, "Yu Gothic Medium", Meiryo,
            sans-serif;
            font-style: ${lato.style.fontStyle};
            font-weight: ${lato.style.fontWeight};
            color: #233;
          }
        `,
          }}
        ></style>
        {gaEnabled && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });`,
              }}
            />
          </>
        )}
      </head>
      <body>
        <InjectGA />
        {children}
      </body>
    </html>
  );
}
