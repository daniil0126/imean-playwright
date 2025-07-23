import { test, expect } from "@playwright/test";
import { socials } from "../helpers/constants";
import { PostGenerateRoutes } from "../helpers/routes";

test.describe("Перегенерация поста", () => {
  for (const { socialMedia } of socials) {
    test(`Перегенерация поста для ${socialMedia}`, async ({ page }) => {
      const postMock = new PostGenerateRoutes(socialMedia);
      await postMock.setup(page);

      await page.goto("https://my.imean.io/posts");
      await page.waitForLoadState('networkidle');

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
      await expect(firstUnpublishedItem).toBeVisible({timeout: 30000})

      
      await firstUnpublishedItem.scrollIntoViewIfNeeded();
      await firstUnpublishedItem.locator(".arrow-icon-placeholder").click();

      await page
        .getByRole("button", 
          {name: /Перегенерировать пост|Regenerate post|Постты қайта генерациялау/,}
        ).click();

      const loader = page.locator(".ant-spin-dot-holder");
      await loader.waitFor({ state: "hidden", timeout: 30000 });

      const pageInfo = page.locator(
        '.justify-center.px-5.py-3.mt-2.mb-2.w-11\\/12.m-auto.text-xs.leading-7.text-justify.text-black.rounded-3xl.bg-purple-200.bg-opacity-50.px-4'
      ).first()
      await expect(pageInfo).toBeVisible({timeout: 30000})

      const socialInfo = page.locator(".flex.flex-col.flex-1");
      await expect(socialInfo).toContainText(socialMedia, {timeout: 30000})

      await socialInfo.scrollIntoViewIfNeeded();
      await expect(socialInfo).toHaveCount(1, { timeout: 30000 });
      await page.waitForTimeout(1000);
      await expect(socialInfo).toBeVisible({ timeout: 30000 });
    });
  }
//   test('Перегенерация поста для всех соц сетей')
});
