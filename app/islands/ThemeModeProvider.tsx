import { useState, useEffect, useCallback } from "hono/jsx";
import type { ThemeMode } from "../lib/themeMode";
import { SetThemeModeContext, ThemeModeContext } from "../lib/themeMode";

const THEME_STORAGE_KEY = "blog-theme-mode";

export default function ThemeModeProvider({
  children,
  defaultThemeMode,
}: {
  readonly children: any;
  readonly defaultThemeMode: ThemeMode;
}) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(defaultThemeMode);

  // クライアントサイドでlocalStorageから状態を復元
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (
        stored &&
        (stored === "light" || stored === "dark" || stored === "system")
      ) {
        setThemeModeState(stored as ThemeMode);
      }
    }
  }, []);

  // テーマモードを設定して localStorage に保存
  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    if (typeof window !== "undefined") {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    }
  }, []);

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <SetThemeModeContext.Provider value={setThemeMode}>
        {children}
      </SetThemeModeContext.Provider>
    </ThemeModeContext.Provider>
  );
}
