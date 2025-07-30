import type { PropsWithChildren } from "hono/jsx";
import { useState, useEffect } from "hono/jsx";
import type { ViewerSettings } from "../lib/viewerSettings";
import {
  ViewerSettingsContext,
  SetViewerSettingsContext,
  getStoredSettings,
  saveSettings,
} from "../lib/viewerSettings";

export default function ViewerSettingsProvider({
  children,
}: PropsWithChildren) {
  const [settings, setSettings] = useState<ViewerSettings>(() =>
    getStoredSettings()
  );

  // localStorageへの保存
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  return (
    <ViewerSettingsContext.Provider value={settings}>
      <SetViewerSettingsContext.Provider value={setSettings}>
        {children}
      </SetViewerSettingsContext.Provider>
    </ViewerSettingsContext.Provider>
  );
}
