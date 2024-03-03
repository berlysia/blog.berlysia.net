import { useState } from "hono/jsx";
import type { ViewerMode } from "../lib/viewerMode";
import { SetViewerModeContext, ViewerModeContext } from "../lib/viewerMode";

export default function ViewerModeProvider({
  children,
  defaultViewerMode,
}: {
  readonly children: JSX.Element;
  readonly defaultViewerMode: ViewerMode;
}) {
  const [viewerMode, setViewerMode] = useState<ViewerMode>(defaultViewerMode);
  return (
    <ViewerModeContext.Provider value={viewerMode}>
      <SetViewerModeContext.Provider value={setViewerMode}>
        {children}
      </SetViewerModeContext.Provider>
    </ViewerModeContext.Provider>
  );
}
