import { test, expect } from "@playwright/test";
import { startActions } from "../helpers/commands";
import { RegisterRoutes } from "../helpers/routes";
import { languages } from "../helpers/constants";

test.describe.parallel("Форма регистрации", () => {
  for (const {
    lang,
    loginText,
    signUpText,
    nameSuccess,
    emailSuccess,
    passwordSuccess,
    continueText,
  } of languages) {
    test(`Регистрация на языке [${lang}]`, async ({ page }) => {
      const routes = new RegisterRoutes();
      routes.setup(page);

      await page.goto("https://my.imean.io", {timeout: 10000});
      startActions(page, lang, loginText);

      await page.getByText(signUpText, { exact: true }).click();

      const nameInput = page.locator('input[type="text"]');
      await nameInput.click();
      await nameInput.fill("Test User");
      await nameInput.blur();

      await expect(
        page.locator(".status-message-success", { hasText: nameSuccess })
      ).toBeVisible();

      const emailInput = page.locator('input[type="email"]');
      await emailInput.click();
      await emailInput.fill("testuser@gmail.com");
      await emailInput.blur();

      await expect(
        page.locator(".status-message-success", {
          hasText: emailSuccess,
        })
      ).toBeVisible();

      const passwordInput = page.locator('input[type="password"]');
      await passwordInput.click();
      await passwordInput.fill("User1234!");
      await passwordInput.blur();

      await expect(
        page.locator(".status-message-success", {
          hasText: passwordSuccess,
        })
      ).toBeVisible();

      const checkbox = page.locator("#privacy");
      await checkbox.click();
      await expect(checkbox).toBeChecked();

      const continueBtn = page.locator(".continue-button", {
        hasText: continueText,
      });
      await expect(continueBtn).toBeVisible();
      await continueBtn.click();

      await page.route("**/api/auth/register", async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ success: true }),
        });

        await page.goto("/home");
      });
    });
  }
});
