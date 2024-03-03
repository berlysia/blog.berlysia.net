import { useViewerModeValue } from "#lib/viewerMode";
import { memo, useEffect, useMemo } from "hono/jsx";

const MemorizedIFrame = memo(function IFrame({
  src,
  url,
}: {
  readonly src: string;
  readonly url: string;
}) {
  return (
    <iframe
      src={url}
      title={`An embedded link to ${src}`}
      sandbox="allow-popups allow-scripts"
      className="tw-border-keyColor-400 tw-border tw-rounded-lg tw-is-full tw-bs-[146px]"
    />
  );
});

function ClientEmbeddedLink({ src }: { readonly src: string }) {
  const viewerMode = useViewerModeValue();

  const url = useMemo(() => {
    const params = new URLSearchParams();
    params.append("url", src);
    params.append("viewer", viewerMode.viewerMode);
    return `/ogrenderer?${params.toString()}`;
  }, [src, viewerMode.viewerMode]);

  return (
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      className="tw-block tw-mlb-2"
    >
      <MemorizedIFrame src={src} url={url} />
    </a>
  );
}

function ServerEmbeddedLink({ src }: { readonly src: string }) {
  return (
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      className="tw-block tw-mlb-2"
    >
      <div className="tw-border-keyColor-400 tw-border tw-rounded-lg tw-is-full tw-bs-[146px]">
        <p>Embedded link to {src}</p>
      </div>
    </a>
  );
}

export default function EmbeddedLink({ src }: { readonly src: string }) {
  return import.meta.env.SSR ? (
    <ServerEmbeddedLink src={src} />
  ) : (
    <ClientEmbeddedLink src={src} />
  );
}
