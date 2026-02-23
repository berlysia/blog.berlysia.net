import { useEffect, useState, useCallback } from "hono/jsx";
import { useViewerMode } from "../lib/viewerMode";

function ClientTranslationDetector() {
  const { isHorizontal, setHorizontal } = useViewerMode();
  const [translationDetected, setTranslationDetected] = useState(false);
  const [dismissed, setDismissed] = useState(false);

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

  // Only show when: translation detected + currently in vertical mode + not dismissed
  if (!translationDetected || isHorizontal || dismissed) {
    return null;
  }

  return (
    <div className="translation-detector-banner" role="alert">
      <p className="translation-detector-message">
        自動翻訳が検出されました。翻訳先の言語では縦書きが読みにくい場合があります。
      </p>
      <div className="translation-detector-actions">
        <button
          type="button"
          className="translation-detector-switch"
          onClick={handleSwitchToHorizontal}
        >
          横書きに切り替える
        </button>
        <button
          type="button"
          className="translation-detector-dismiss"
          onClick={handleDismiss}
          title="閉じる"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default function TranslationDetector() {
  if (import.meta.env.SSR) {
    return null;
  }

  return <ClientTranslationDetector />;
}
