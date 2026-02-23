import { useEffect, useState, useCallback } from "hono/jsx";
import { useViewerMode } from "../lib/viewerMode";
import { isBrowserCJK } from "../lib/isCJKLocale";

function ClientTextOrientationGuide() {
  const { isHorizontal, setHorizontal } = useViewerMode();
  const [translationDetected, setTranslationDetected] = useState(false);
  const [isNonCJK, setIsNonCJK] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Detect non-CJK locale (runs once)
  useEffect(() => {
    setIsNonCJK(!isBrowserCJK());
  }, []);

  useEffect(() => {
    const html = document.documentElement;

    function checkTranslation() {
      // Chrome/Edge: adds "translated-ltr" or "translated-rtl" class to <html>
      const hasTranslatedClass =
        html.classList.contains("translated-ltr") ||
        html.classList.contains("translated-rtl");

      // Safari/other: lang attribute changed from original "ja"
      const langChanged = html.lang !== "" && html.lang !== "ja";

      // Google Translate widget: adds a "skiptranslate" class and "notranslate"
      const hasGoogleTranslateBody =
        document.body.classList.contains("translated");

      if (hasTranslatedClass || langChanged || hasGoogleTranslateBody) {
        setTranslationDetected(true);
      } else {
        setTranslationDetected(false);
      }
    }

    // Check initially
    checkTranslation();

    // Observe changes to <html> attributes (class, lang)
    const observer = new MutationObserver(() => {
      checkTranslation();
    });

    observer.observe(html, {
      attributes: true,
      attributeFilter: ["class", "lang"],
    });

    // Also observe <body> class changes
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Reset dismissed state when switching back to vertical
  useEffect(() => {
    if (isHorizontal) {
      setDismissed(false);
    }
  }, [isHorizontal]);

  const handleSwitchToHorizontal = useCallback(() => {
    setHorizontal();
    setDismissed(true);
  }, [setHorizontal]);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
  }, []);

  // Only show when in vertical mode and not dismissed
  if (isHorizontal || dismissed) {
    return null;
  }

  // Non-CJK locale banner takes priority (shown regardless of translation)
  if (isNonCJK) {
    return (
      <div className="text-orientation-guide-banner" role="alert">
        <p className="text-orientation-guide-message">
          このページは縦書きで表示されています。横書きに切り替えることもできます。
        </p>
        <div className="text-orientation-guide-actions">
          <button
            type="button"
            className="text-orientation-guide-switch"
            onClick={handleSwitchToHorizontal}
          >
            横書きに切り替える
          </button>
          <button
            type="button"
            className="text-orientation-guide-dismiss"
            onClick={handleDismiss}
            title="閉じる"
          >
            ✕
          </button>
        </div>
      </div>
    );
  }

  // Translation detected banner for CJK users
  if (!translationDetected) {
    return null;
  }

  return (
    <div className="text-orientation-guide-banner" role="alert">
      <p className="text-orientation-guide-message">
        自動翻訳が検出されました。翻訳先の言語では縦書きが読みにくい場合があります。
      </p>
      <div className="text-orientation-guide-actions">
        <button
          type="button"
          className="text-orientation-guide-switch"
          onClick={handleSwitchToHorizontal}
        >
          横書きに切り替える
        </button>
        <button
          type="button"
          className="text-orientation-guide-dismiss"
          onClick={handleDismiss}
          title="閉じる"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default function TextOrientationGuide() {
  if (import.meta.env.SSR) {
    return null;
  }

  return <ClientTextOrientationGuide />;
}
