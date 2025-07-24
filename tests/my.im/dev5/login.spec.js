import { test, expect } from '@playwright/test';

test.describe('Log-In', () => {
    test('login invalid + intercept request', async ({ page }) => {
  await page.goto('https://dev5.imean.io/sign-in');
  await expect(page).toHaveTitle(/Imean/i);

  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#privacy').click()
  await page.getByRole('button', {name: /Sign in by mail/i}).click()

  await page.getByPlaceholder('example@gmail.com').fill('yevgeniya98gmail')
  await page.getByPlaceholder('Input password').fill('QAZ3.qaz')

  const responsePromise = page.waitForResponse((resp) =>
        resp.url().includes('api/profile')&&resp.request().method() === 'POST');
  await page.getByRole('button', {name: /continue/i}).click()

  
  const response = await responsePromise;
  expect(response.status()).toBe(401);

  await expect(page.getByText('Адрес электронной почты должен содержать символ "@".')).toBeVisible();
});

test('login valid + intercept request', async ({ page }) => {
  await page.goto('https://dev5.imean.io/sign-in');
  await expect(page).toHaveTitle(/Imean/i);

  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#privacy').click()
  await page.getByRole('button', {name: /Sign in by mail/i}).click()

  await page.getByPlaceholder('example@gmail.com').fill('yevgeniya898@gmail.com')
  await page.getByPlaceholder('Input password').fill('qaz.QAZ12')

 const responsePromise = page.waitForResponse((resp) =>
        resp.url().includes('api/auth/login')&&resp.request().method() === 'POST');
  await page.getByRole('button', {name: /continue/i}).click()
  
  const response = await responsePromise;
  expect(response.status()).toBe(200);
  
  await expect(page).toHaveURL('https://my.imean.io/home'); 

});

test('login valid + mock', async ({ page }) => {
    await page.route('**/api/profile', async (route, request) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',  //Тип данных, которые мы возвращаем в ответе — это JSON
            body: JSON.stringify({   // превращает в строку 
                success: true,
                token: 'mocked-token',
                user:{
                    email: 'mock12@gmail.com',
                    name: 'mock'
                }
            })
        })
    })

  await page.goto('https://dev5.imean.io/sign-in');
  await expect(page).toHaveTitle(/Imean/i);

  await page.getByRole('button', { name: 'Close' }).click();
  await page.locator('#privacy').click()
  await page.getByRole('button', {name: /Sign in by mail/i}).click()

  await page.getByPlaceholder('example@gmail.com').fill('yevgeniya898@gmail.com')
  await page.getByPlaceholder('Input password').fill('QAZ123.qaz')

  await page.getByRole('button', {name: /continue/i}).click()
  
  
  await expect(page).toHaveURL('https://dev5.imean.io/home'); 

});


})
