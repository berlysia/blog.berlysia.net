// playwright.config.ts
import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  fullyParallel: true,
  webServer: {
    command: "yarn dev",
    port: 3000,
    reuseExistingServer: true,
  },
};
export default config;
