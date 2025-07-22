import { test, expect } from "@playwright/test";

export async function startActions(page, language, buttonText) {
  const closeBtn = page.locator("button.ant-modal-close");
  await expect(closeBtn).toBeVisible({ timeout: 20000 });

  const box = await closeBtn.boundingBox();
  if (!box) throw new Error("Кнопка не отрисована");

  // await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  // await page.mouse.down();
  // await page.mouse.up();

  await closeBtn.click();

  const modal = page.locator(".ant-modal");
  await expect(modal).toBeHidden({ timeout: 10000 });

  const languageChoiceBtn = page.locator(".ant-select");
  await languageChoiceBtn.click();
  const languageChoiceModal = page.locator(".ant-select-dropdown");
  await expect(languageChoiceModal).toBeVisible();
  await page
    .locator(".ant-select-item-option-content", { hasText: language })
    .click();

  const privacyCheckBox = page.locator("#privacy");
  await privacyCheckBox.click();
  await expect(privacyCheckBox).toBeChecked();

  const emailLoginBtn = page.getByText(`${buttonText}`, { exact: true });
  await expect(emailLoginBtn).toBeVisible();
  await emailLoginBtn.click();
}

export async function saveFormat(page) {
  const formatBtn = page.getByRole("button", {
    name: /Формат публикации|Publication format|Пост форматы/i,
  });
  await formatBtn.click();

  const postLength = page.locator(".ant-input-number-input").nth(0);
  await postLength.clear();
  await postLength.fill("30");

  await page
    .getByText(/Запомнить выбор|Memorize the selection|Таңдауды есте сақтаңыз/i)
    .click();
  await page.getByText(/Подтвердить|Accept|Қабылдау/i).click();
}
