import { useEffect, useRef, useState } from "hono/jsx";
import type { PropsWithChildren } from "hono/jsx";

type Props = PropsWithChildren<{
  readonly writingMode: "horizontal" | "vertical";
}>;

export default function Extend({ writingMode, children }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const content = contentRef.current;
    if (!content || expanded) return;

    const computedWritingMode = getComputedStyle(content).writingMode;
    const isHorizontal = computedWritingMode === "horizontal-tb";
    const scrollBlockSize = isHorizontal
      ? content.scrollHeight
      : content.scrollWidth;
    const clientBlockSize = isHorizontal
      ? content.clientHeight
      : content.clientWidth;
    setIsOverflowing(scrollBlockSize > clientBlockSize);
  }, [writingMode, expanded]);

  const handleExpand = () => {
    setExpanded(true);
  };

  const writingModeValue =
    writingMode === "vertical" ? "vertical-rl" : "horizontal-tb";

  return (
    <div style={{ writingMode: writingModeValue }}>
      <div
        ref={contentRef}
        style={{
          boxSizing: "content-box",
          border: "1px solid #222",
          maxInlineSize: "20rem",
          padding: "8px",
          position: "relative",
          blockSize: expanded ? "auto" : "168px",
          overflow: expanded ? "visible" : "hidden",
        }}
      >
        <p>
          論理プロパティにより、書字方向非依存のレイアウトが可能になりました。
        </p>
        <p>
          一方でＤＯＭ
          ＡＰＩの世界には、まだサポートが広がっていません。ＪＳでの実装には論理と物理の変換が、まだしばらく必要です。
        </p>
        {isOverflowing && !expanded && (
          <div
            style={{
              position: "absolute",
              insetInline: "0",
              insetBlockEnd: "0",
              blockSize: "10em",
              background: `linear-gradient(${
                writingMode === "vertical" ? "to left" : "to bottom"
              }, rgba(255, 255, 255, 0) 0%, #fff 80%)`,
            }}
          >
            <button
              type="button"
              onClick={handleExpand}
              style={{
                border: "1px solid",
                fontSize: "1rem",
                color: "#fff",
                backgroundColor: "#666",
                padding: "8px 16px",
                borderRadius: "8px",
                position: "absolute",
                inlineSize: "fit-content",
                insetBlockEnd: "8px",
                insetInline: "0",
                marginInline: "auto",
              }}
            >
              もっと読む
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
