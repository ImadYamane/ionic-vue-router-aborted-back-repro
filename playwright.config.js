import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: 'tests',
  use: { baseURL: 'http://localhost:5390', ...devices['Desktop Chrome'] },
  webServer: { command: 'pnpm dev', url: 'http://localhost:5390', reuseExistingServer: false },
})
