import { test, expect } from "@playwright/test";

// const paths = ["/", "/blog", "/blog/entry/test"];
const paths = ["/blog", "/blog/entry/test", "/blog/entry/vertical"];

for (const pathname of paths) {
  test(`VRT: ${pathname}`, async ({ page }) => {
    await page.goto(`http://localhost:3000${pathname}`);
    await expect(page).toHaveScreenshot({
      animations: "disabled",
      fullPage: true,
      scale: "device",
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
    });
  });
}
