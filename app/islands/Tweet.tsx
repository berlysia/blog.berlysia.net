import { useViewerModeValue } from "#lib/viewerMode";
import { useEffect, useRef } from "hono/jsx";

function renderEmbeddedTweet(
  el: HTMLDivElement | null,
  id: string,
  option: Record<string, string>
) {
  if (
    id &&
    el &&
    "twttr" in window &&
    window.twttr &&
    typeof window.twttr === "object" &&
    "widgets" in window.twttr &&
    typeof window.twttr.widgets === "object" &&
    "createTweet" in window.twttr.widgets &&
    typeof window.twttr.widgets.createTweet === "function"
  ) {
    while (el.firstChild) {
      el.firstChild.remove();
    }
    // https://developer.x.com/en/docs/twitter-for-websites/embedded-tweets/guides/embedded-tweet-javascript-factory-function
    window.twttr?.widgets.createTweet(id, el, option);
  }
}

export default function Tweet(props: { readonly id: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mode = useViewerModeValue();

  useEffect(() => {
    if (ref.current) {
      // refに直接渡したいがhono/jsxがうまく動かないようだ
      renderEmbeddedTweet(ref.current, props.id, {});
    }
  }, [props.id, mode.viewerMode]);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        placeContent: "center",
        placeItems: "stretch",
        ...(mode.viewerMode === "vertical"
          ? {
              blockSize: "250px" /* Twitterがどうしてもこの寸法で出してくる */,
            }
          : {}),
      }}
    >
      <blockquote>
        <a
          href={`https://twitter.com/i/status/${props.id}`}
          target="_blank"
          rel="noreferrer"
        >
          https://twitter.com/i/status/{props.id}
        </a>
      </blockquote>
    </div>
  );
}
