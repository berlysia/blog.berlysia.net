import { useViewerModeValue } from "#lib/viewerMode";
import type { ViewerMode } from "#lib/viewerMode";
import { ogCache } from "#lib/ogCache";
import type { PageMeta } from "#lib/ogDataFetcher";

// Initialize cache on server-side
if (import.meta.env.SSR) {
  try {
    await ogCache.load();
  } catch (error) {
    console.warn("Failed to load OG cache:", error);
  }
}

function trimUrlForView(urlStr: string): string {
  try {
    const url = new URL(urlStr);
    const { protocol, host, pathname } = url;
    return `${protocol}//${host}${pathname}`;
  } catch {
    return urlStr;
  }
}

function StaticOGCard({
  src,
  ogData,
  viewerMode,
}: {
  readonly src: string;
  readonly ogData: PageMeta;
  readonly viewerMode: ViewerMode;
}) {
  return (
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      className="embeddedLinkScope tw-block tw-mlb-2"
    >
      <div
        className={`tw-border-keyColor-400 tw-border tw-rounded-lg tw-is-full tw-p-2 ${viewerMode}`}
      >
        <div
          className={`tw-grid tw-gap-4 ${ogData.image ? "tw-grid-cols-[8rem_1fr]" : "tw-grid-cols-1"}`}
        >
          {ogData.image && (
            <img
              src={ogData.image}
              alt=""
              className="tw-w-32 tw-h-32 tw-object-contain tw-rounded tw-justify-self-center tw-self-center"
            />
          )}
          <div>
            <h3 className="tw-font-bold tw-text-xs tw-line-clamp-2 tw-mb-1">
              {ogData.title || "No title"}
            </h3>
            {ogData.description && (
              <p className="tw-text-gray-600 tw-line-clamp-2 tw-mb-2">
                {ogData.description}
              </p>
            )}
            <div className="tw-grid tw-grid-cols-[auto_1fr] tw-items-center tw-gap-1 tw-text-xs tw-text-gray-500">
              {ogData.favicon && (
                <img
                  src={new URL(ogData.favicon, src).toString()}
                  alt=""
                  className="tw-w-4 tw-h-4"
                />
              )}
              <span className="tw-truncate">{trimUrlForView(src)}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

function FallbackCard({ src }: { readonly src: string }) {
  return (
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      className="tw-block tw-mlb-2"
    >
      <div className="tw-border-keyColor-400 tw-border tw-rounded-lg tw-is-full tw-p-4">
        <div className="tw-flex tw-items-center tw-gap-2">
          <span className="tw-text-sm tw-font-medium">🔗</span>
          <span className="tw-text-sm tw-truncate">{trimUrlForView(src)}</span>
        </div>
      </div>
    </a>
  );
}

export default function EmbeddedLink({ src }: { readonly src: string }) {
  const ogData = ogCache.get(src);

  if (ogData) {
    return <StaticOGCard src={src} ogData={ogData} viewerMode="horizontal" />;
  }

  return <FallbackCard src={src} />;
}
