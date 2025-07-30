import type { PropsWithChildren } from "hono/jsx";
import { useEffect, useLayoutEffect, useState } from "hono/jsx";
import { useMediaQuery } from "#lib/useMediaQuery";
import type { ViewerMode } from "../lib/viewerMode";
import { SetViewerModeContext, ViewerModeContext } from "../lib/viewerMode";

export default function ViewerModeProvider({
  children,
  defaultViewerMode,
}: PropsWithChildren<{
  readonly defaultViewerMode: ViewerMode;
}>) {
  const isNarrowViewport = useMediaQuery(
    "(width < 640px), (height < 600px)",
    false
  );
  const [viewerMode, setViewerMode] = useState<ViewerMode>(defaultViewerMode);
  useLayoutEffect(() => {
    if (defaultViewerMode === "vertical-multicol" && isNarrowViewport) {
      setViewerMode("vertical");
    }
  }, [defaultViewerMode, isNarrowViewport]);
  return (
    <ViewerModeContext.Provider value={viewerMode}>
      <SetViewerModeContext.Provider value={setViewerMode}>
        {children}
      </SetViewerModeContext.Provider>
    </ViewerModeContext.Provider>
  );
}
