import { test, expect } from "@playwright/test";
import { socials } from "../helpers/constants";
import { PostGenerateRoutes } from "../helpers/routes";
import { saveFormat } from "../helpers/commands";

test.describe("Генерация поста", () => {
  for (const { socialMedia } of socials) {
    test(`Генерация поста для ${socialMedia}`, async ({ page }) => {
      const postMock = new PostGenerateRoutes(socialMedia);
      await postMock.setup(page);

      await page.goto("https://my.imean.io/generate-post");

      if (socialMedia !== "LinkedIn") {
        await page.getByText("LinkedIn", { exact: true }).click();
        await page.waitForTimeout(1000);
        await page.getByText(socialMedia, { exact: false }).click();
      }

      await saveFormat(page);

      const inputArea = page.locator("textarea");
      await inputArea.fill(`Короткий пост для ${socialMedia}`);
      await page
        .getByRole("button", {
          name: /Создать публикацию|Create a post|Пост жасау/i,
        })
        .click();

      await expect(page).toHaveURL(/\/create-post\/\d+$/, { timeout: 15000 });

      const loader = page.locator(".ant-spin-dot-holder");
      await loader.waitFor({ state: "detached", timeout: 60000 });

      const postTextBlock = page
        .locator(
          ".justify-center.px-5.py-3.mt-2.mb-2.w-11\\/12.m-auto.text-xs.leading-7.text-justify.text-black.rounded-3xl.bg-purple-200.bg-opacity-50.px-4"
        )
        .nth(1);

      await expect(postTextBlock).not.toHaveText("", { timeout: 60000 });

      const socialInfo = page.locator(".flex.flex-col.flex-1", {
        hasText: socialMedia,
      });

      await socialInfo.scrollIntoViewIfNeeded();
      await expect(socialInfo).toBeVisible({ timeout: 10000 });
      await expect(socialInfo).toContainText(socialMedia);
    });
  }
  test("Генерация поста для всех соц сетей", async ({ page }) => {
    const postMock = new PostGenerateRoutes(/^(?=.*LinkedIn)(?=.*Facebook)(?=.*Instagram).*$/i);
    await postMock.setup(page);
    await page.goto("https://my.imean.io/generate-post");

    await page.getByText("LinkedIn", { exact: true }).click();
    await page.waitForTimeout(1000);
    await page.getByText("Facebook", { exact: false }).click();
    await page.getByText("LinkedIn", { exact: false }).click();
    await page.getByText("Instagram", { exact: false }).click();

    await saveFormat(page);

    const inputArea = page.locator("textarea");
    await inputArea.fill(`Короткий пост для Facebook, Instagram, Linkedin`);
    await page
      .getByRole("button", {
        name: /Создать публикацию|Create a post|Пост жасау/i,
      })
      .click();

    await expect(page).toHaveURL(/\/create-post\/\d+$/);

    const loader = page.locator(".ant-spin-dot-holder");
    await loader.waitFor({ state: "detached", timeout: 60000 });

    const postTextBlock = page
      .locator(
        ".justify-center.px-5.py-3.mt-2.mb-2.w-11\\/12.m-auto.text-xs.leading-7.text-justify.text-black.rounded-3xl.bg-purple-200.bg-opacity-50.px-4"
      )
      .nth(1);

    await expect(postTextBlock).not.toHaveText("", { timeout: 60000 });

    const socialInfo = page.locator(".flex.gap-4", {
      hasText: /^(?=.*LinkedIn)(?=.*Facebook)(?=.*Instagram).*$/i,
    });

    await socialInfo.scrollIntoViewIfNeeded();
    await expect(socialInfo.first()).toBeVisible({ timeout: 120000 });
    await expect(socialInfo).toContainText(
      /^(?=.*LinkedIn)(?=.*Facebook)(?=.*Instagram).*$/i
    );
  });
});
