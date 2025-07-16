import { test, expect } from "@playwright/test";
import { socials } from "../helpers/constants";

test.describe("Создание похожего поста", () => {
  for (const { socialMedia } of socials) {
    test(`Создание похожего поста для ${socialMedia}`, async ({ page }) => {
      await page.goto("https://my.imean.io/posts");
      const morePostsBtn = page.locator(".ant-select-selector", {
        hasText: "на странице",
      });
      const targetPost = page.getByRole("link", {
        name: "Пост для написания автотестов",
      });

      await morePostsBtn.scrollIntoViewIfNeeded();
      await expect(morePostsBtn).toBeVisible();
      await morePostsBtn.click();
      await page
        .locator(".ant-select-item-option-content", {
          hasText: "50 / на странице",
        })
        .click();

      await targetPost.scrollIntoViewIfNeeded();
      await expect(targetPost).toBeVisible({ timeout: 10000 });
      await targetPost.click();

      await page.getByRole("button", { name: "Создать похожий пост" }).click();

      for (const { socialMedia: name } of socials) {
        if (name !== socialMedia) {
          const icon = page.getByRole("img", { name });
          await icon.click();
        }
      }

      await page.getByRole("button", { name: "Создать", exact: true }).click();

      await expect(page).toHaveURL(/\/create-post\/\d+$/, { timeout: 10000 });

      const socialInfo = page
        .locator(".flex.flex-col.flex-1", { hasText: socialMedia })
        .first();

      await expect(socialInfo).toBeVisible({ timeout: 10000 });
      await expect(socialInfo).toContainText(socialMedia);
    });
  }
  test("Создание похожего поста для всех платформ", async ({ page }) => {
    for (const { socialMedia } of socials) {
      await page.goto("https://my.imean.io/posts");
      const morePostsBtn = page.locator(".ant-select-selector", {
        hasText: "на странице",
      });
      const targetPost = page.getByRole("link", {
        name: "Пост для написания автотестов",
      });

      await morePostsBtn.scrollIntoViewIfNeeded();
      await expect(morePostsBtn).toBeVisible();
      await morePostsBtn.click();
      await page
        .locator(".ant-select-item-option-content", {
          hasText: "50 / на странице",
        })
        .click();

      await targetPost.scrollIntoViewIfNeeded();
      await expect(targetPost).toBeVisible({ timeout: 10000 });
      await targetPost.click();

      await page.getByRole("button", { name: "Создать похожий пост" }).click();

      await page.getByRole("button", { name: "Создать", exact: true }).click();

      await expect(page).toHaveURL(/\/create-post\/\d+$/, { timeout: 10000 });

      const socialInfo = page.locator(".flex.flex-col.flex-1");

      await expect(socialInfo.first()).toBeVisible({ timeout: 100000 });
      await expect(socialInfo.nth(0)).toContainText("LinkedIn");
      await expect(socialInfo.nth(1)).toContainText("Facebook");
      await expect(socialInfo.nth(2)).toContainText("Instagram");
    }
  });
});
