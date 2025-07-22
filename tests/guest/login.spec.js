import { test, expect } from "@playwright/test";
import { startActions } from "../helpers/commands";
import { LoginRoutes } from "../helpers/routes";
import { languages } from "../helpers/constants";

const auth = {
  login: "d7035821@gmail.com",
  password: "Daniil0126!",
};

test.describe.parallel("Форма логина", () => {
  for (const { lang, loginText, continueText } of languages) {
    test(`Вход на языке [${lang}]`, async ({ page }) => {
      const routes = new LoginRoutes();
      await routes.setup(page);

      await page.goto("https://my.imean.io", { timeout: 20000 });
      startActions(page, lang, loginText);

      await page.locator('input[type="email"]').click();
      await page.locator('input[type="email"]').fill(auth.login);

      await page.locator('input[type="password"]').click();
      await page.locator('input[type="password"]').fill(auth.password);

      await page
        .locator('button[type="submit"]', { hasText: continueText })
        .click();
      await expect(page).toHaveURL(/\/home$/, { timeout: 10000 });
    });
  }
});
