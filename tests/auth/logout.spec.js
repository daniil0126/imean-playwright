// import { test, expect } from "@playwright/test";

// test.describe("Логаут", () => {
//   test("Логаут", async ({ page }) => {
//     await page.goto("https://my.imean.io/home");

//     page.once("dialog", async (dialog) => {
//         await dialog.accept();
//     });
//     await page.getByRole("button", { name: "Выйти" }).click();
//     await expect(page).toHaveURL(/\/sign-in$/, { timeout: 10000 });
//   });
// });
