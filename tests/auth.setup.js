import { test as setup, expect } from "@playwright/test";
import path from "path";
import { startActions } from "./helpers/commands";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

setup("authenticate", async ({ page }) => {
  startActions(page, "Русский", "Войти по почте");

  await page.goto("https://my.imean.io");
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill("d7035821@gmail.com");

  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill("Daniil0126!");
  await page.getByRole("button", { name: "Продолжить" }).click();

  await page.waitForURL("https://my.imean.io/home");

  await expect(page.locator(".back-button")).toBeVisible();
  await page.context().storageState({ path: authFile });
});
