import { useEffect, useRef } from "hono/jsx";
import { useViewerModeValue } from "../lib/viewerMode";

function ClientArticleHeightSentinel() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { isVerticalColumns } = useViewerModeValue();

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !isVerticalColumns) return;

    const article = sentinel.closest<HTMLElement>(".article");
    if (!article) return;

    const update = () => {
      const sentinelBottom =
        sentinel.getBoundingClientRect().bottom + window.scrollY;
      const articleTop = article.getBoundingClientRect().top + window.scrollY;
      article.style.height = `${sentinelBottom - articleTop}px`;
    };

    const observer = new ResizeObserver(() => {
      update();
    });

    observer.observe(sentinel);
    update();

    return () => {
      observer.disconnect();
      article.style.height = "";
    };
  }, [isVerticalColumns]);

  return <div ref={sentinelRef} aria-hidden="true" />;
}

export default function ArticleHeightSentinel() {
  if (import.meta.env.SSR) {
    return null;
  }

  return <ClientArticleHeightSentinel />;
}
