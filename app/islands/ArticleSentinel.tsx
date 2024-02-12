import { useEffect, useCallback, useRef } from "hono/jsx";
import { useWritingMode } from "../lib/writingMode";

export default function ArticleSentinel({ articleId }: { articleId: string }) {
  const writingMode = useWritingMode();
  const sentinelRef = useRef<HTMLElement>(null);

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
    const articleEl = document.querySelector<HTMLElement>(`#${articleId}`);
    const sentinelEl = sentinelRef.current;
    if (articleEl && sentinelEl) {
      if (
        writingMode.isVertical &&
        window.matchMedia("(min-width: 640px)" /* sm */).matches
      ) {
        const box = sentinelEl.getBoundingClientRect();
        const currentValue = articleEl.getBoundingClientRect().height;
        const nextValue =
          window.scrollY +
          box.bottom -
          24; /* この数字の理由がわかっていないがこの値でないと振動する */
        /*
          - line-heightが1.5remで24pxだが影響なし
          - gapは2remで32px
          - articleのpaddingは1remで16px
          - headerのheightは40px
        */
        const diff = nextValue - currentValue;
        if (Math.abs(diff) > 10) {
          articleEl.style.height = `${nextValue}px`;
        }
      } else {
        articleEl.style.height = "auto";
      }
    }
  }, [writingMode.isVertical]);

  // articleRefのリサイズを監視して、リサイズが発生したらhandleResizeを実行する
  useEffect(() => {
    const articleEl = document.querySelector<HTMLElement>(`#${articleId}`);
    const observer = new ResizeObserver(handleResize);
    if (articleEl) {
      observer.observe(articleEl);
    }
    return () => {
      observer.disconnect();
    };
  }, [handleResize]);

  return <div ref={sentinelRef}></div>;
}
