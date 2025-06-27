import { useEffect } from "hono/jsx";
import { useThemeMode } from "../lib/themeMode";

function ClientThemeModeSwitcher() {
  const { themeMode, isLight, isDark, isSystem, setLight, setDark, setSystem } =
    useThemeMode();

  useEffect(() => {
    const htmlElement = document.documentElement;

    // ダークモードクラスの管理
    const applyTheme = () => {
      if (themeMode === "system") {
        // システム設定に従う
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        htmlElement.classList.toggle("dark", prefersDark);
      } else {
        htmlElement.classList.toggle("dark", themeMode === "dark");
      }
    };

    applyTheme();

    // システムモードの場合、システム設定の変更を監視
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (themeMode === "system") {
        applyTheme();
      }
    };

    if (themeMode === "system") {
      mediaQuery.addEventListener("change", handleChange);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [themeMode]);

  const getNextMode = () => {
    switch (themeMode) {
      case "light": {
        return "dark";
      }
      case "dark": {
        return "system";
      }
      default: {
        return "light";
      }
    }
  };

  const handleClick = () => {
    const nextMode = getNextMode();
    if (nextMode === "light") setLight();
    else if (nextMode === "dark") setDark();
    else setSystem();
  };

  const getCurrentIcon = () => {
    if (isLight) return "☀️";
    if (isDark) return "🌙";
    return "💻";
  };

  const getTitle = () => {
    const current = isLight ? "ライト" : isDark ? "ダーク" : "システム";
    const next =
      getNextMode() === "light"
        ? "ライト"
        : getNextMode() === "dark"
          ? "ダーク"
          : "システム";
    return `テーマ切り替え (現在: ${current}モード → ${next}モード)`;
  };

  return (
    <div className="theme-mode-switcher tw-h-8 tw-w-8 tw-flex tw-justify-center tw-items-center">
      <button
        type="button"
        className="tw-h-8 tw-w-8 tw-flex tw-justify-center tw-items-center tw-text-lg hover:tw-bg-keyColor-100 dark:hover:tw-bg-dark-bg-secondary tw-rounded tw-transition-colors"
        onClick={handleClick}
        title={getTitle()}
      >
        {getCurrentIcon()}
      </button>
    </div>
  );
}

function ServerThemeModeSwitcher() {
  return <></>;
}

export default function ThemeModeSwitcher() {
  return import.meta.env.SSR ? (
    <ServerThemeModeSwitcher />
  ) : (
    <ClientThemeModeSwitcher />
  );
}
