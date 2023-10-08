// playwright.config.ts
import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "test/vrt",
  fullyParallel: true,
  webServer: {
    command: "yarn dev",
    port: 3000,
    reuseExistingServer: true,
  },
};
export default config;
