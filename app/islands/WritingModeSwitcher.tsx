import { useCallback, useEffect, useMemo } from "hono/jsx";
import { useViewerMode } from "../lib/viewerMode";

function ClientWritingModeSwitcher({
  articleRootId,
}: {
  readonly articleRootId: string;
}) {
  const {
    viewerMode,
    isVertical,
    isVerticalColumns,
    isHorizontal,
    setHorizontal,
    setVertical,
    setVerticalColumns,
  } = useViewerMode();

  const messageMap = useMemo(
    () =>
      ({
        horizontal: {
          title: "Horizontal Writing Mode",
          switchMessage: "Switch to horizontal writing mode",
          assign: () => setHorizontal(),
          nextName: "vertical",
        },
        vertical: {
          title: "Vertical Writing Mode",
          switchMessage:
            "Switch to vertical writing mode with multiple columns",
          assign: () => setVertical(),
          nextName: "vertical-multicol",
        },
        "vertical-multicol": {
          title: "Vertical Writing Mode with Multiple Columns",
          switchMessage: "Switch to horizontal writing mode",
          assign: () => setVerticalColumns(),
          nextName: "horizontal",
        },
      }) as const,
    [setVertical, setVerticalColumns, setHorizontal]
  );

  const toggleWritingMode = useCallback(() => {
    const msg = messageMap[viewerMode];
    messageMap[msg.nextName]?.assign();
  }, [viewerMode, messageMap]);

  useEffect(() => {
    const el = document.querySelector(`#${articleRootId}`);
    if (el) {
      el.classList.toggle("vertical", isVertical);
      el.classList.toggle("vertical-multicol", isVerticalColumns);
      el.classList.toggle("horizontal", isHorizontal);
    }
    return () => {
      el?.classList.remove("vertical");
      el?.classList.remove("vertical-multicol");
      el?.classList.remove("horizontal");
    };
  }, [isVertical, isHorizontal, articleRootId, isVerticalColumns]);

  return (
    <div className="writing-mode-switcher tw-h-8 tw-w-8 tw-flex tw-justify-center tw-items-center">
      <button
        type="button"
        className="tw-h-8 tw-w-8"
        onClick={toggleWritingMode}
        title={`${messageMap[viewerMode]?.title} - ${messageMap[viewerMode]?.switchMessage}`}
      >
        <img
          src={`/static/icons/${viewerMode}.svg`}
          alt={messageMap[viewerMode]?.title}
          className="tw-h-8 tw-w-8"
        />
      </button>
    </div>
  );
}

function ServerWritingModeSwitcher() {
  return <></>;
}

export default function WritingModeSwitcher({
  articleRootId,
}: {
  readonly articleRootId: string;
}) {
  return import.meta.env.SSR ? (
    <ServerWritingModeSwitcher />
  ) : (
    <ClientWritingModeSwitcher articleRootId={articleRootId} />
  );
}
