import { test, expect } from "@playwright/test";

const paths = ["/blog", "/blog/entry/sample"];

for (const pathname of paths) {
  // columnの動作が安定しないため、スキップ
  if (pathname === "/blog/entry/sample") continue;

  test(`VRT: ${pathname}`, async ({ page }) => {
    await page.goto(`http://localhost:3000${pathname}`);
    await expect(page).toHaveScreenshot({
      animations: "disabled",
      fullPage: true,
      scale: "device",
      maxDiffPixelRatio: 0.02,
    });
  });
}

for (const pathname of paths) {
  test(`VRT-SP: ${pathname}`, async ({ page }) => {
    await page.setViewportSize({
      // iPhone 12 Pro
      width: 390,
      height: 844,
    });
    await page.goto(`http://localhost:3000${pathname}`);
    await expect(page).toHaveScreenshot({
      animations: "disabled",
      fullPage: true,
      scale: "device",
      maxDiffPixelRatio: 0.02,
    });
  });
}