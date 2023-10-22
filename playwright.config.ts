// playwright.config.ts
import { defineConfig } from '@playwright/test';

const config = defineConfig({
  timeout: process.env.CI ? 5 * 60 * 1000 : 10_000,
  testDir: "test/vrt",
  fullyParallel: true,
  webServer: {
    command: "yarn dev",
    port: 3000,
    reuseExistingServer: true,
  },
});
export default config;
