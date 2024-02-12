import type { Manifest } from "vite";

export default function ResolveManifest(options: {
  src: string;
  type: "script" | "style";
  prod?: boolean;
  manifest?: Manifest;
}) {
  const { src } = options;
  if (options.prod ?? import.meta.env.PROD) {
    let manifest = options.manifest;
    if (!manifest) {
      const MANIFEST = import.meta.glob("/dist/.vite/manifest.json", {
        eager: true,
      });
      for (const manifestFile of Object.values(MANIFEST)) {
        if (
          typeof manifestFile === "object" &&
          "default" in manifestFile &&
          manifestFile.default
        ) {
          manifest = manifestFile.default as Manifest;
          break;
        }
      }
    }
    if (manifest) {
      const fileInManifest = manifest[src.replace(/^\//, "")];
      if (fileInManifest) {
        if (options.type === "style") {
          return <link rel="stylesheet" href={`/${fileInManifest.file}`} />;
        }
        if (options.type === "script") {
          return <script type="module" src={`/${fileInManifest.file}`} />;
        }
        throw new Error("Invalid type");
      }
    }
    // eslint-disable-next-line react/jsx-no-useless-fragment -- hono/jsx cannot return null
    return <></>;
  }

  if (options.type === "style") {
    return <link rel="stylesheet" href={`/${src}`} />;
  }
  if (options.type === "script") {
    return <script type="module" src={`/${src}`} />;
  }
  throw new Error("Invalid type");
}
