import { test, expect } from '@playwright/test';

test.describe('link social media', ()=> {
    
    test('linkedin', async({page}) => {
        await page.goto('https://my.imean.io/profile', {waitUntil: 'networkidle'});

        await expect(page.getByRole('heading', { name: /Профиль/i })).toBeVisible();

        const linked = page.locator('button.social-button.x').nth(0);
        await expect(linked).toBeVisible();
        await linked.click();

        await page.waitForURL('https://www.linkedin.com/*');
        await expect(page).toHaveTitle(/LinkedIn/i);

        await page.getByPlaceholder('email').fill("Smithbarbelo@gmail.com");
        await page.getByPlaceholder('Пароль').fill("uW'M48YDsVwg8v.");
        await page.getByText('Войти').click();

        await page.locator('button[name="action"]').filter({hasText: 'Allow'}).click();
        await page.waitForURL('https://my.imean.io/profile');
        await expect(page).toHaveTitle(/Imean/i);
    });

    test('facebook', async({page}) => {
        await page.goto('https://my.imean.io/profile', {waitUntil: 'networkidle'});

        await expect(page.getByRole('heading', { name: /Профиль/i })).toBeVisible();

        const facebook = page.locator('button.social-button.x').nth(1);
        await expect(facebook).toBeVisible();
        await facebook.click();

        await expect(page).waitForURL('https://www.facebook.com/*');
        await expect(page).toHaveTitle(/Facebook/i);
        await page.locator('input[name="pass"]').fill(")h=az4JSHQN6)w$");
        await page.getByText('Продолжить').click();
        
        const reconnect = page.getByText('Подключить еще раз');
          if(await reconnect.isVisible()){
            await reconnect.click();
          } 

          await expect(page).toHaveTitle(/Imean/i);
          await page.getByAltText('settings').nth(1).click();
          await page.getByRole('button', {name: /Imean2/i}).click();
          await page.waitForURL('https://my.imean.io/profile');
    });

    test('instagram', async({page}) => {
        await page.goto('https://my.imean.io/profile', {waitUntil: 'networkidle'});

        await expect(page.getByRole('heading', { name: /Профиль/i })).toBeVisible();

        const instagram = page.locator('button.social-button.x').nth(2);

        await expect(instagram).toBeVisible();
        await instagram.click();
        await page.waitForURL('https://www.instagram.com/*');

          const allow = page.getByText('Разрешить'); 
          if(await allow.isVisible()){
            await allow.click();
          } 

          await page.waitForURL('https://my.imean.io/profile');
    });
});

  



