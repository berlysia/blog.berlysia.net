import { init as initSatori } from "satori/wasm";
import initYoga from "yoga-wasm-web";
import { initWasm } from "@resvg/resvg-wasm";
import yogaWasm from "#wasm/yoga.wasm?arraybuffer";
import resvgWasm from "#wasm/resvg.wasm?arraybuffer";

const genModuleInit = () => {
  let isInit = false;
  return async () => {
    if (isInit) {
      return;
    }

    const [yoga, _resvg] = await Promise.all([
      initYoga(yogaWasm),
      initWasm(resvgWasm),
    ]);

    initSatori(yoga);

    // eslint-disable-next-line require-atomic-updates -- ignore
    isInit = true;
  };
};

export const warmUp = genModuleInit();
export async function loadGoogleFont({
  family,
  weight,
  text,
}: {
  family: string;
  weight?: number;
  text?: string;
}) {
  const params: Record<string, string> = {
    family: `${encodeURIComponent(family)}${weight ? `:wght@${weight}` : ""}`,
  };

  if (text) {
    params.text = text;
  } else {
    params.subset = "latin";
  }

  const url = `https://fonts.googleapis.com/css2?${Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join("&")}`;

  const css = await fetch(`${url}`, {
    headers: {
      // construct user agent to get TTF font
      "User-Agent":
        "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
    },
  }).then((res) => res.text());

  // Get the font URL from the CSS text
  const fontUrl = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  )?.[1];

  if (!fontUrl) {
    throw new Error("Could not find font URL");
  }

  const res = await fetch(fontUrl);
  return res.arrayBuffer();
}
