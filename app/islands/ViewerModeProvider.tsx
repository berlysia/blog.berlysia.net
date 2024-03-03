import { useMemo, useState } from "hono/jsx";
import type { ViewerMode } from "../lib/viewerMode";
import { SetViewerModeContext, ViewerModeContext } from "../lib/viewerMode";

export default function ViewerModeProvider({
  children,
}: {
  readonly children: JSX.Element;
}) {
  const [viewerMode, setViewerMode] = useState<ViewerMode>("horizontal");
  return (
    <ViewerModeContext.Provider value={viewerMode}>
      <SetViewerModeContext.Provider value={setViewerMode}>
        {children}
      </SetViewerModeContext.Provider>
    </ViewerModeContext.Provider>
  );
}
