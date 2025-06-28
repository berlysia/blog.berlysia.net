import { test, expect } from "@playwright/test";

const paths = [""];

for (const pathname of paths) {
  test(`VRT: ${pathname}`, async ({ page }) => {
    await page.goto(`http://localhost:5173${pathname}`);
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
    await page.goto(`http://localhost:5173${pathname}`);
    await expect(page).toHaveScreenshot({
      animations: "disabled",
      fullPage: true,
      scale: "device",
      maxDiffPixelRatio: 0.02,
    });
  });
}

// Dark mode VRT tests
for (const pathname of paths) {
  test(`VRT-Dark: ${pathname}`, async ({ page }) => {
    await page.goto(`http://localhost:5173${pathname}`);

    // Switch to dark mode by clicking the theme toggle button
    await page.click('[data-testid="theme-toggle"]').catch(() => {
      // Fallback: manually set dark mode
      page.evaluate(() => {
        document.documentElement.classList.add("tw-dark");
        localStorage.setItem("themeMode", "dark");
      });
    });

    // Wait for theme to apply
    await page.waitForTimeout(100);

    await expect(page).toHaveScreenshot({
      animations: "disabled",
      fullPage: true,
      scale: "device",
      maxDiffPixelRatio: 0.02,
    });
  });
}

for (const pathname of paths) {
  test(`VRT-SP-Dark: ${pathname}`, async ({ page }) => {
    await page.setViewportSize({
      // iPhone 12 Pro
      width: 390,
      height: 844,
    });
    await page.goto(`http://localhost:5173${pathname}`);

    // Switch to dark mode by clicking the theme toggle button
    await page.click('[data-testid="theme-toggle"]').catch(() => {
      // Fallback: manually set dark mode
      page.evaluate(() => {
        document.documentElement.classList.add("tw-dark");
        localStorage.setItem("themeMode", "dark");
      });
    });

    // Wait for theme to apply
    await page.waitForTimeout(100);

    await expect(page).toHaveScreenshot({
      animations: "disabled",
      fullPage: true,
      scale: "device",
      maxDiffPixelRatio: 0.02,
    });
  });
}
