import { createContext, useContext, useMemo } from "hono/jsx";

export interface ViewerSettings {
  useTextDecorationThickness: boolean;
  useWebkitLineClamp: boolean;
}

const defaultSettings: ViewerSettings = {
  useTextDecorationThickness: false,
  useWebkitLineClamp: false,
};

const STORAGE_KEY = "text-decoration-thickness-settings";

// 設定値が有効かどうかを検証
function isValidSettings(settings: any): settings is ViewerSettings {
  return (
    typeof settings === "object" &&
    settings !== null &&
    typeof settings.useTextDecorationThickness === "boolean" &&
    typeof settings.useWebkitLineClamp === "boolean" &&
    Object.keys(settings).length === 2
  );
}

// localStorageから直接読み取る関数
export function getStoredSettings(): ViewerSettings {
  if (typeof window === "undefined") return defaultSettings;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (isValidSettings(parsed)) {
        return parsed;
      }
      // データが破損している場合はlocalStorageをクリア
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // パースエラーの場合もlocalStorageをクリア
    localStorage.removeItem(STORAGE_KEY);
  }

  return defaultSettings;
}

// localStorageに保存する関数
export function saveSettings(settings: ViewerSettings): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // 保存エラーは静かに無視
  }
}

export const ViewerSettingsContext =
  createContext<ViewerSettings>(defaultSettings);
export const SetViewerSettingsContext = createContext<
  (settings: ViewerSettings) => void
>(() => {});

export function useViewerSettings() {
  const settings = useContext(ViewerSettingsContext);
  const setSettings = useContext(SetViewerSettingsContext);

  return useMemo(
    () => ({
      settings,
      setSettings,
      toggleTextDecorationThickness: () => {
        setSettings({
          ...settings,
          useTextDecorationThickness: !settings.useTextDecorationThickness,
        });
      },
      toggleWebkitLineClamp: () => {
        setSettings({
          ...settings,
          useWebkitLineClamp: !settings.useWebkitLineClamp,
        });
      },
    }),
    [settings, setSettings]
  );
}
