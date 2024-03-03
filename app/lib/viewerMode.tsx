import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "hono/jsx";
import { atom } from "nanostores";

export type ViewerMode = "horizontal" | "vertical" | "vertical-columns";
export const $viewerMode = atom<ViewerMode>("horizontal");

export const ViewerModeContext = createContext<ViewerMode>("horizontal");
export const SetViewerModeContext = createContext<(_: ViewerMode) => void>(
  () => {}
);

export function useViewerModeValue() {
  const viewerMode = useContext(ViewerModeContext);

  return useMemo(
    () => ({
      viewerMode: viewerMode ?? "horizontal",
      isVertical: viewerMode === "vertical",
      isHorizontal: viewerMode === "horizontal",
      isVerticalColumns: viewerMode === "vertical-columns",
    }),
    [viewerMode]
  );
}

export function useViewerMode() {
  const viewerMode = useViewerModeValue();
  const setViewerMode = useContext(SetViewerModeContext);

  return useMemo(
    () => ({
      ...viewerMode,
      setVertical: () => setViewerMode("vertical"),
      setHorizontal: () => setViewerMode("horizontal"),
      setVerticalColumns: () => setViewerMode("vertical-columns"),
    }),
    [setViewerMode, viewerMode]
  );
}
