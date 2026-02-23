/**
 * Returns true if the locale likely uses a CJK writing system (Japanese/Chinese/Korean scripts).
 *
 * Design goals:
 * - Prefer ISO15924 script when available (Jpan/Hans/Hant/Kore).
 * - Be robust against odd tags, extensions, and missing Intl.Locale/maximize.
 * - Treat presence of any CJK-relevant script as CJK.
 * - Be conservative: if we cannot tell, return false (so you can decide UI strength separately).
 */
export function isCJKLocale(tag: string): boolean {
  if (typeof tag !== "string" || tag.trim() === "") return false;
  const raw = tag.trim();

  // Fast path: explicit script in tag (e.g., zh-Hant, ja-Jpan, ko-Kore)
  // BCP47: language ["-" script] ...
  {
    const m = raw.match(
      /^[A-Za-z]{2,3}(?:-[A-Za-z]{3})?-(?<script>[A-Za-z]{4})(?:-|$)/
    );
    if (m?.groups?.script) {
      const s = normalizeScript(m.groups.script);
      if (isCJKScript(s)) return true;
    }
  }

  // Try Intl.Locale (best effort; maximize often fills script for ja/zh/ko)
  try {
    if (typeof Intl !== "undefined" && typeof Intl.Locale === "function") {
      const loc = new Intl.Locale(raw);

      // Some engines already fill `script` without maximize.
      const directScript = normalizeScript(loc.script);
      if (isCJKScript(directScript)) return true;

      // maximize() may be absent in some older implementations; guard it.
      const maxLoc = typeof loc.maximize === "function" ? loc.maximize() : loc;
      const maxScript = normalizeScript(maxLoc.script);
      if (isCJKScript(maxScript)) return true;

      // Fallback: if language is ja/ko => practically always CJK scripts.
      // For zh, script matters (Hans/Hant); if absent, still treat as CJK.
      const lang = (maxLoc.language || loc.language || "").toLowerCase();
      if (lang === "ja" || lang === "ko") return true;
      if (lang === "zh") return true;
    }
  } catch {
    // ignore
  }

  // Last resort: parse primary language subtag only.
  const primary = raw.split("-")[0]?.toLowerCase();
  return primary === "ja" || primary === "zh" || primary === "ko";
}

function normalizeScript(s: string | undefined): string {
  if (typeof s !== "string" || s.length !== 4) return "";
  return s[0].toUpperCase() + s.slice(1).toLowerCase();
}

function isCJKScript(script: string): boolean {
  // ISO 15924
  return (
    script === "Jpan" ||
    script === "Hans" ||
    script === "Hant" ||
    script === "Kore"
  );
}

/**
 * Returns true if any of the browser's preferred languages is a CJK locale.
 */
export function isBrowserCJK(): boolean {
  if (typeof navigator === "undefined") return false;
  const langs = navigator.languages;
  if (!langs || langs.length === 0) return false;
  return langs.some((lang) => isCJKLocale(lang));
}
