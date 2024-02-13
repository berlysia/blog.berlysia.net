import { useEffect, useState } from "hono/jsx";
import { atom } from "nanostores";

export type ViewerMode = "horizontal" | "vertical" | "vertical-columns";
export const $viewerMode = atom<ViewerMode>("horizontal");

export function useViewerMode(defaultValue: ViewerMode = "horizontal") {
  const [viewerMode, setViewerMode] = useState(defaultValue);

  useEffect(() => {
    $viewerMode.set(defaultValue);
    return $viewerMode.subscribe(setViewerMode);
  }, []);

  return {
    viewerMode,
    isVertical: viewerMode === "vertical",
    isHorizontal: viewerMode === "horizontal",
    isVerticalColumns: viewerMode === "vertical-columns",
  };
}
