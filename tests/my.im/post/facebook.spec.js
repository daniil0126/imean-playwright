import { test, expect } from '@playwright/test';

//npx playwright test tests/my.im/post/facebook.spec.js --headed --project=chromium

test('create post', async ({ page }) => {
  await page.goto('https://my.imean.io/generate-post', { waitUntil: 'networkidle' });

  await page.getByText('Facebook').click();
  await page.getByText('LinkedIn').click();

  await page.getByPlaceholder('Поделитесь с нами основной идеей или контекстом планируемого поста.').fill('кролики');

  
  await page.getByText('Формат публикации').click();

  const titleDrawer = page.locator('.ant-drawer-title');
  await expect(titleDrawer).toBeVisible();

  
  const format = page.locator('span.ant-collapse-header-text', { hasText: 'Вопрос и ответ' });
  await format.scrollIntoViewIfNeeded();
  await format.click();

  console.log('got it!');

  const checkbox = page.locator('input.ant-checkbox-input[value="Вопрос и ответ"]');
  await checkbox.check();


  const tabpanel = page.locator('div.ant-collapse-content-box', {
    hasText: 'Начните с вопроса, который может интересовать вашу аудиторию.',
  });
  await expect(tabpanel).toBeVisible();
  await format.scrollIntoViewIfNeeded();
  console.log('VISIBLE AAA!');

  const confirm = page.getByRole('button', { name: 'Подтвердить' });
  await confirm.click();

  const [response] = await Promise.all([
    page.waitForResponse(resp =>
      resp.url().includes('api/post/actual/*') &&
      resp.request().method === 'POST' &&
      resp.status() === 200
    ),
    page.getByRole('button', {name: 'Создать публикацию'}).click(),
  ]);

  expect(response.ok()).toBeTruthy;
  

  await page.waitForURL('https://my.imean.io/create-post/*');


  const postTitle = page.locator('.self-assessment-title');
  await expect(postTitle).toBeVisible();

  console.log('Post created successfully!');
});
