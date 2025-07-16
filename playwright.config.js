import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  projects: [
    {
      name: 'guest',
      testDir: './tests/guest',
      use: {
        ...devices['Desktop Chrome'],
        storageState: undefined, 
      }
    },

    {
      name: 'setup',
      testMatch: /.*\.setup\.js/,
    },

    {
      name: 'auth',
      testDir: './tests/auth',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});
