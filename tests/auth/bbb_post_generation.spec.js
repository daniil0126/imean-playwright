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
        await page.waitForTimeout(3000);
        await page.getByText("LinkedIn", { exact: true }).click();
        await page.getByText(socialMedia, { exact: false }).click();
      }else{
        await page.waitForTimeout(2000);
      }

      await saveFormat(page);

      const inputArea = page.locator("textarea");
      await inputArea.fill(`Короткий пост для ${socialMedia}`);
      await page
        .getByRole("button", {
          // name: /Создать публикацию|Create a post|Пост жасау/,
          name: "Создать публикацию", exact: true
        })
        .click();

      await expect(page).toHaveURL(/\/create-post\/\d+$/, { timeout: 10000 });

      // const postTextBlock = page
      //   .locator(
      //     ".justify-center.px-5.py-3.mt-2.mb-2.w-11\\/12.m-auto.text-xs.leading-7.text-justify.text-black.rounded-3xl.bg-purple-200.bg-opacity-50.px-4"
      //   )
      //   .nth(0);

      // await expect(postTextBlock).not.toHaveText("", { timeout: 60000 });

      const socialInfo = page.locator(".flex.flex-col.flex-1")
      const count = await socialInfo.count()

      for(let i = 0; i < count; i++){
        const item = socialInfo.nth(i)
        await expect(item).toBeVisible()
        await expect(item).toContainText(socialMedia)
      }
    });
  }
  test("Генерация поста для всех соц сетей", async ({ page }) => {
    // const postMock = new PostGenerateRoutes(/^(?=.*LinkedIn)(?=.*Facebook)(?=.*Instagram).*$/i);
    // await postMock.setup(page);
    await page.goto("https://my.imean.io/generate-post");
    
    await page.waitForTimeout(1000);
    await page.getByText("Facebook", { exact: false }).click();
    await page.waitForTimeout(1000);
    await page.getByText("Instagram", { exact: false }).click();

    await saveFormat(page);

    const inputArea = page.locator("textarea");
    await inputArea.fill(`Короткий пост для Facebook, Instagram, Linkedin`);
    await page
      .getByRole("button", {
        name: /Создать публикацию|Create a post|Пост жасау/,
      })
      .click();

    await expect(page).toHaveURL(/\/create-post\/\d+$/, {timeout: 10000});

    const postTextBlock = page
      .locator(
        ".justify-center.px-5.py-3.mt-2.mb-2.w-11\\/12.m-auto.text-xs.leading-7.text-justify.text-black.rounded-3xl.bg-purple-200.bg-opacity-50.px-4"
      )
      .nth(0);

    // await expect(postTextBlock).not.toHaveText("", { timeout: 60000 });

    const socialInfo = page.locator(".flex.flex-col.flex-1");
    const count = await socialInfo.count();

    for (let i = 0; i < count; i++) {
      const item = socialInfo.nth(i);
      await expect(item).toBeVisible();
      await expect(item).toContainText(socialMedia);
    }
  });
});
