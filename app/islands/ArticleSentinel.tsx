import type { PropsWithChildren } from "hono/jsx";
import { useLayoutEffect, useCallback, useRef } from "hono/jsx";
import { useViewerModeValue } from "../lib/viewerMode";

export default function ArticleSentinel({
  className,
  children,
}: PropsWithChildren<{
  readonly className?: string;
}>) {
  const { isVertical, isHorizontal } = useViewerModeValue();
  const sentinelRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /*
    # なぜこの処理が必要か
    まず、writingModeは関係ない。
    columnsプロパティを使って段組みレイアウトをしている かつ max-block-size 相当が指定されているとき、inline方向のコンテナ寸法を成り行きで決める方法がない。
    inline-size: max-contentを使うと、inline方向のコンテナ寸法は改善するように見えるが、実際には段組みレイアウトの段数が増えすぎてしまい、block方向に段が広がりきらなくなる。
    ここでcolumn-fill: autoを指定すると端から段を埋めるようになるが、inline-sizeがmax-contentのときと同じ寸法になってしまい、激しく余白が発生する。

    # 何をやっているか
    コンテンツ末尾に番兵要素を配置し、番兵要素の位置を監視して、番兵要素の位置が変わったら、article要素の高さを番兵要素の位置に合わせて調整する。
  */
  const handleResize = useCallback(() => {
    const articleEl = containerRef.current;
    const sentinelEl = sentinelRef.current;
    if (articleEl && sentinelEl) {
      if (
        isVertical &&
        window.matchMedia("(640px <= width) and (600px <= height)" /* sm */)
          .matches
      ) {
        const box = sentinelEl.getBoundingClientRect();
        const currentValue = articleEl.getBoundingClientRect().height;
        const HEADER_HEIGHT = 40;
        const ARTICLE_TOP_PADDING = 16;
        // column-sizeの値と対応づける
        const COLUMN_TARGET_SIZE = window.innerHeight * 0.5;
        const COLUMN_GAP = 32;
        const COLUMN_UNIT = COLUMN_TARGET_SIZE + COLUMN_GAP;
        const targetValue =
          window.scrollY + box.bottom - HEADER_HEIGHT - ARTICLE_TOP_PADDING;

        // targetValueを割る数字を増やしていって最も商がCOLUMN_UNITに近くなるものを探す
        let idealColumns = 0;
        let minDiff = Number.POSITIVE_INFINITY;
        for (let i = 1; i < 200 /* 高々カラム数 */; i++) {
          const value = Math.floor(targetValue / i);
          const diff = Math.abs(value - COLUMN_UNIT);
          if (diff < minDiff) {
            minDiff = diff;
            idealColumns = i;
          } else if (diff > minDiff) {
            // 大きくなり始めたらおわり
            break;
          }
        }

        const idealHeight =
          idealColumns * COLUMN_UNIT - HEADER_HEIGHT - ARTICLE_TOP_PADDING;
        const diff = idealHeight - currentValue;

        if (Math.abs(diff) > 10) {
          articleEl.style.height = `${idealHeight}px`;
        }
      } else if (isVertical) {
        articleEl.style.height = "calc(100dvh - 40px)";
      } else if (isHorizontal) {
        articleEl.style.height = "auto";
      }
    }
  }, [isHorizontal, isVertical]);

  // articleRefのリサイズを監視して、リサイズが発生したらhandleResizeを実行する
  useLayoutEffect(() => {
    const articleEl = containerRef.current;
    if (!articleEl) return;
    const observer = new ResizeObserver(handleResize);
    if (articleEl) {
      observer.observe(articleEl);
    }
    const detailsElements = articleEl.querySelectorAll("details");
    for (const x of detailsElements) {
      x.addEventListener("toggle", handleResize);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      observer.disconnect();
      for (const x of detailsElements) {
        x.removeEventListener("toggle", handleResize);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <div ref={containerRef} className={className}>
      {children}
      <div ref={sentinelRef}></div>
    </div>
  );
}
