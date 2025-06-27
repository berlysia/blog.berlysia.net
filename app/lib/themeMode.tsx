import { createContext, useContext, useMemo } from "hono/jsx";

export type ThemeMode = "light" | "dark" | "system";

export const ThemeModeContext = createContext<ThemeMode>("system");
export const SetThemeModeContext = createContext<(_: ThemeMode) => void>(
  () => {}
);

export function useThemeModeValue() {
  const themeMode = useContext(ThemeModeContext);

  return useMemo(
    () => ({
      themeMode: themeMode ?? "system",
      isLight: themeMode === "light",
      isDark: themeMode === "dark",
      isSystem: themeMode === "system",
    }),
    [themeMode]
  );
}

export function useThemeMode() {
  const themeMode = useThemeModeValue();
  const setThemeMode = useContext(SetThemeModeContext);

  return useMemo(
    () => ({
      ...themeMode,
      setLight: () => setThemeMode("light"),
      setDark: () => setThemeMode("dark"),
      setSystem: () => setThemeMode("system"),
    }),
    [setThemeMode, themeMode]
  );
}
