import { test, expect } from '@playwright/test';


test('assistant', async ({page}) => {
    await page.goto('https://my.imean.io/assistant');
    await page.getByPlaceholder('Ваше сообщение...').fill('что умеешь?');
    await page.getByRole('button', {name: /Отправить/i}).click();

    const responsePromise = page.waitForResponse((resp) => 
        resp.url().includes('api/assistant/chat') && resp.request().method() === 'POST'
    );
    await expect(page.getByText(/Я умею/i)).toBeVisible(); 

    const response = await responsePromise;
    expect(response.status()).toBe(200);

})