import { useState } from "hono/jsx";
import type { ThemeMode } from "../lib/themeMode";
import { SetThemeModeContext, ThemeModeContext } from "../lib/themeMode";

export default function ThemeModeProvider({
  children,
  defaultThemeMode,
}: {
  readonly children: any;
  readonly defaultThemeMode: ThemeMode;
}) {
  const [themeMode, setThemeMode] = useState<ThemeMode>(defaultThemeMode);
  return (
    <ThemeModeContext.Provider value={themeMode}>
      <SetThemeModeContext.Provider value={setThemeMode}>
        {children}
      </SetThemeModeContext.Provider>
    </ThemeModeContext.Provider>
  );
}
