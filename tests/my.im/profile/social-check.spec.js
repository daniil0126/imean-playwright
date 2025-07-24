import { test, expect } from '@playwright/test';

test('check links', async({page}) => {
    await page.goto('https://my.imean.io/profile');

    await expect(page.getByText('yevgeniya898@gmail.com')).toBeVisible();

    await test.step('check linked', async () => {
      await expect(page.getByText(/Отвязать LinkedIn/i)).toBeVisible();
      await expect(page.locator('span').filter({hasText: 'unFilmru undefined'})).toBeVisible();
      await expect(page.locator('span').filter({hasText: 'smithbarbelo@gmail.com'})).toBeVisible();
    });

    await test.step('check facebook', async () => {
      await expect(page.getByText(/Отвязать Facebook/i)).toBeVisible();
      await expect(page.getByRole('span').filter({hasText: /yevgeniya khan/i})).toBeVisible();
    });

    await test.step('check insta', async () => {
      await expect(page.getByRole('b', {name: /Отвязать Instagram/i})).toBeVisible();
      await expect(page.locator('span.m-0.p-0').filter({hasText: 'test65368'})).toBeVisible();
    });

  });