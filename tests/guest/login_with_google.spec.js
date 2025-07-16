// import { test, expect } from "@playwright/test";

// test.describe("Вход через Гугл", () => {
//     test("Вход через гугл и сохранение куки и localStorage", async ({ page }) => {
//         await page.goto("https://my.imean.io", { timeout: 10000 });
//         const closeBtn = page.locator("button.ant-modal-close");
//         await expect(closeBtn).toBeVisible({ timeout: 20000 });

//         const box = await closeBtn.boundingBox();
//         if (!box) throw new Error("Кнопка не отрисована");

//         // await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
//         // await page.mouse.down();
//         // await page.mouse.up();

//         await closeBtn.click();

//         const modal = page.locator(".ant-modal");
//         await expect(modal).toBeHidden({ timeout: 10000 });

//         const privacyCheckBox = page.locator("#privacy");
//         await privacyCheckBox.click();
//         await expect(privacyCheckBox).toBeChecked();

//         const [googlePopup] = await Promise.all([
//             context.waitForEvent("page"),
//             page.getByRole("button", { name: /Google/i }).click(),
//         ]);

//         await googlePopup.waitForLoadState("domcontentloaded")
//         await googlePopup.getByLabel(/Email|Телефон/i).fill("prangov065@gmail.com@gmail.com");
//         await googlePopup.getByRole("button", { name: /Next|Далее/i }).click();
//         await googlePopup.getByLabel(/Пароль|Password/i).fill("Daniilkhan87762190440");
//         await googlePopup.getByRole("button", { name: /Next|Далее/i }).click();
//         await page.waitForURL("**/home", { timeout: 15000 });
//         await expect(page.locator("text=Добро пожаловать")).toBeVisible();
//   });
// });
