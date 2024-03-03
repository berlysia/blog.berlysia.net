import { createContext, useCallback, useContext, useEffect } from "hono/jsx";
import { atom } from "nanostores";

export type ViewerMode = "horizontal" | "vertical" | "vertical-columns";
export const $viewerMode = atom<ViewerMode>("horizontal");

export const ViewerModeContext = createContext<ViewerMode>("horizontal");
export const SetViewerModeContext = createContext<(_: ViewerMode) => void>(
  () => {}
);

export function useViewerMode(defaultValue?: ViewerMode) {
  const viewerMode = useContext(ViewerModeContext);
  const setViewerMode = useContext(SetViewerModeContext);

  useEffect(() => {
    if (defaultValue) {
      $viewerMode.set(defaultValue);
    }
  }, [defaultValue]);

  return {
    viewerMode: viewerMode ?? "horizontal",
    isVertical: viewerMode === "vertical",
    isHorizontal: viewerMode === "horizontal",
    isVerticalColumns: viewerMode === "vertical-columns",
    setVertical: useCallback(() => setViewerMode("vertical"), [setViewerMode]),
    setHorizontal: useCallback(
      () => setViewerMode("horizontal"),
      [setViewerMode]
    ),
    setVerticalColumns: useCallback(
      () => setViewerMode("vertical-columns"),
      [setViewerMode]
    ),
  };
}
