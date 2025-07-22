import { test, expect } from "@playwright/test";
import { socials } from "../helpers/constants";
import { PostGenerateRoutes } from "../helpers/routes";

test.describe("Перегенерация поста", () => {
  for (const { socialMedia } of socials) {
    test(`Перегенерация поста для ${socialMedia}`, async ({ page }) => {
      const postMock = new PostGenerateRoutes(socialMedia);
      await postMock.setup(page);

      await page.goto("https://my.imean.io/posts");

      const regex = new RegExp(`^${socialMedia}$`);
      const scheduleSocialMedia = page
        .locator(".schedule-time.font-bold", {
          hasText: regex,
        })
        .first();

      const scheduleItems = page.locator(".schedule-item").filter({
        has: page
          .locator(".schedule-details", {
            hasText: /Не опубликован|Not published|Жарияланбаған/,
          })
          .filter({
            has: page.locator(".schedule-time.font-bold", {
              hasText: regex,
            }),
          }),
      });
      const firstUnpublishedItem = scheduleItems.first();

      await firstUnpublishedItem.scrollIntoViewIfNeeded();
      await firstUnpublishedItem.locator(".arrow-icon-placeholder").click();

      await page
        .getByRole("button", 
          {name: /Перегенерировать пост|Regenerate post|Постты қайта генерациялау/,}
        ).click();

      const loader = page.locator(".ant-spin-dot-holder");
      await loader.waitFor({ state: "detached", timeout: 60000 });

      // const postTextBlock = page
      //   .locator(
      //     ".justify-center.px-5.py-3.mt-2.mb-2.w-11\\/12.m-auto.text-xs.leading-7.text-justify.text-black.rounded-3xl.bg-purple-200.bg-opacity-50.px-4"
      //   )
      //   .nth(1);

      // await expect(postTextBlock).not.toHaveText("", { timeout: 120000 });

      const socialInfo = page.locator(".flex.flex-col.flex-1", {
        hasText: socialMedia,
      });

      await socialInfo.scrollIntoViewIfNeeded();
      await expect(socialInfo).toBeVisible({ timeout: 120000 });
      await expect(socialInfo).toContainText(socialMedia);
    });
  }
//   test('Перегенерация поста для всех соц сетей')
});
