import { existsSync } from "node:fs";
import { test, expect } from "@playwright/test";

// const paths = ["/", "/blog", "/blog/entry/test"];
const paths = ["/blog", "/blog/entry/test"];

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
