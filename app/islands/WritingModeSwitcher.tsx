import { useEffect } from "hono/jsx";
import { $viewerMode, useViewerMode } from "../lib/writingMode";

function setVertical() {
  $viewerMode.set("vertical");
}

function setVerticalColumns() {
  $viewerMode.set("vertical-columns");
}

function setHorizontal() {
  $viewerMode.set("horizontal");
}

export default function WritingModeSwitcher({
  articleRootId,
  preferVertical,
}: {
  readonly articleRootId: string;
  readonly preferVertical?: boolean;
}) {
  const { isVertical, isVerticalColumns, isHorizontal } = useViewerMode(
    preferVertical ? "vertical" : "horizontal"
  );

  useEffect(() => {
    const el = document.querySelector(`#${articleRootId}`);
    if (el) {
      el.classList.toggle("vertical", isVertical);
      // el.classList.toggle("vertical-columns", isVerticalColumns);
      el.classList.toggle("horizontal", isHorizontal);
    }
    return () => {
      el?.classList.remove("vertical");
      // el?.classList.remove("vertical-columns");
      el?.classList.remove("horizontal");
    };
  }, [isVertical, isHorizontal, articleRootId, isVerticalColumns]);

  return (
    <div className="writing-mode-switcher tw-h-8 tw-w-8 tw-flex tw-justify-center tw-items-center">
      <button
        type="button"
        className="tw-h-8 tw-w-8"
        onClick={isVertical ? setHorizontal : setVertical}
        title={
          isVertical
            ? "switch to horizontal writing mode"
            : "switch to vertical writing mode"
        }
      >
        {isVertical ? (
          <img
            src="/static/icons/left-right.svg"
            alt="switch to horizontal writing mode"
            className="tw-h-8 tw-w-8"
          />
        ) : (
          <img
            src="/static/icons/up-down.svg"
            alt="switch to vertical writing mode"
            className="tw-h-8 tw-w-8"
          />
        )}
      </button>
    </div>
  );
}
