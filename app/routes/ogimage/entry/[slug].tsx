import { loadGoogleFont } from "#lib/generateImage";
import { getSlugs, getBySlug } from "#seeds/localReader";
import { ssgParams } from "hono/ssg";
import { createRoute } from "honox/factory";
import { loadDefaultJapaneseParser } from "budoux";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { SITE_BLOG_NAME } from "#constant";

const parser = loadDefaultJapaneseParser();

export default createRoute(
  // onlySSG(),
  ssgParams(() => getSlugs().map((slug) => ({ slug }))),
  async (c) => {
    const slug = c.req.param("slug");
    if (slug === ":slug") {
      c.status(404);
      return c.text("Not Found");
    }

    const frontmatter = getBySlug(slug as any).frontmatter;

    const wakachi = parser.parse(frontmatter.title);

    const notoSans = await loadGoogleFont({
      family: "Noto Sans JP",
      weight: 300,
      text: SITE_BLOG_NAME + frontmatter.title,
    });
    const notoSansBold = await loadGoogleFont({
      family: "Noto Sans JP",
      weight: 600,
      text: SITE_BLOG_NAME + frontmatter.title,
    });

    const svg = await satori(
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            padding: "2rem",
            backgroundColor: "#fbcfe8",
            boxSizing: "border-box",
          },
          children: [
            {
              type: "div",
              props: {
                style: {
                  flexGrow: 1,
                  alignSelf: "stretch",
                  background: "white",
                  borderRadius: "2rem",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  boxSizing: "border-box",
                },
                children: [
                  {
                    type: "span",
                    props: {
                      style: {
                        flex: 1,
                        color: "#222",
                        fontSize: "4rem",
                        paddingInline: "1rem",
                        boxSizing: "border-box",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                      children: wakachi,
                    },
                  },
                  {
                    type: "div",
                    props: {
                      style: {
                        flexBasis: "10vh",
                        color: "#444",
                        fontSize: "1.6em",
                        boxSizing: "border-box",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                      children: [SITE_BLOG_NAME],
                    },
                  },
                ],
              },
            },
          ],
        },
      } as any,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "NotoSansJP",
            data: notoSans,
            weight: 300,
            style: "normal",
          },
          {
            name: "NotoSansJP",
            data: notoSansBold,
            weight: 600,
            style: "normal",
          },
        ],
      }
    );

    const body = new Resvg(svg).render().asPng();

    c.header("Content-Type", "image/png");
    return c.body(body);
  }
);
