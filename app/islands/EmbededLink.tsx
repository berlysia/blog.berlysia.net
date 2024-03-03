import { useViewerMode } from "#lib/viewerMode";
import { memo, useMemo } from "hono/jsx";

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

export default function EmbeddedLink({ src }: { readonly src: string }) {
  const viewerMode = useViewerMode();

  const url = useMemo(() => {
    const params = new URLSearchParams();
    params.append("url", src);
    params.append("viewer", viewerMode.viewerMode);
    return `/ogrenderer?${params.toString()}`;
  }, [src, viewerMode.viewerMode]);

  return (
    <a href={src} target="_blank" rel="noopener noreferrer">
      <MemorizedIFrame src={src} url={url} />
    </a>
  );
}
