import { test, expect } from "@playwright/test";
import { socials } from "../helpers/constants";
import { PostGenerateRoutes } from "../helpers/routes";
import { languages } from "../helpers/constants";

test.describe("Создание похожего поста", () => {
  for (const { socialMedia } of socials) {
    test(`Создание похожего поста для ${socialMedia}`, async ({ page }) => {
      const postMock = new PostGenerateRoutes(socialMedia);
      await postMock.setup(page);

      await page.goto("https://my.imean.io/create-post/2335");
      await page.getByRole("button", { name: "Создать похожий пост" }).click();

      for (const { socialMedia: name } of socials) {
        if (name !== socialMedia) {
          await page.waitForTimeout(1000);
          const icon = page.getByRole("img", { name });
          await icon.click();
        }
      }

      await page.getByRole("button", { name: "Создать", exact: true }).click();

      await expect(page).toHaveURL(/\/create-post\/\d+$/, { timeout: 10000 });

      const postTextBlock = page
        .locator(
          ".justify-center.px-5.py-3.mt-2.mb-2.w-11\\/12.m-auto.text-xs.leading-7.text-justify.text-black.rounded-3xl.bg-purple-200.bg-opacity-50.px-4"
        )
        .nth(1);

      await expect(postTextBlock).not.toHaveText("", { timeout: 60000 });
      const socialInfo = page
        .locator(".flex.flex-col.flex-1", { hasText: socialMedia })
        .first();

      await expect(socialInfo).toBeVisible({ timeout: 120000 });
      await expect(socialInfo).toContainText(socialMedia);
    });
  }
  test("Создание похожего поста для всех платформ", async ({ page }) => {
    await page.goto("https://my.imean.io/create-post/2335");

    await page.getByRole("button", { name: "Создать похожий пост" }).click();
    await page.getByRole("button", { name: "Создать", exact: true }).click();

    await expect(page).toHaveURL(/\/create-post\/\d+$/, { timeout: 10000 });

    const postTextBlock = page
      .locator(
        ".justify-center.px-5.py-3.mt-2.mb-2.w-11\\/12.m-auto.text-xs.leading-7.text-justify.text-black.rounded-3xl.bg-purple-200.bg-opacity-50.px-4"
      )
      .nth(1);

    await expect(postTextBlock).not.toHaveText("", { timeout: 60000 });

    const socialInfo = page.locator(".flex.flex-col.flex-1");

    await expect(socialInfo.first()).toBeVisible({ timeout: 120000 });
    await expect(socialInfo.nth(0)).toContainText("LinkedIn");
    await expect(socialInfo.nth(1)).toContainText("Facebook");
    await expect(socialInfo.nth(2)).toContainText("Instagram");
  });
});
