import { test, expect } from '@playwright/test';

test.describe('create plan for linked, fc, insta', () => {
    test('survey', async({page}) => {
        await page.goto('https://my.imean.io/survey');
        await page.getByPlaceholder('Введите Ваше Имя').fill('anatomica');
        await page.getByPlaceholder('отрасль в которой Вы работаете').fill('ada');
        await page.getByText('Выберите Ваш уровень опыта').click();
    });
    test('create plan', async({page}) => {
        await page.goto('https://my.imean.io/content-plan');
        
    });
    test('Facebook post create', async({page}) => {
        await page.goto('https://my.imean.io/content-plan-faceb');
    });
    test('LinkedIn post create', async({page}) => {
        await page.goto('https://my.imean.io/content-plan-linked');
    });
    test('Insta post create', async({page}) => {
        await page.goto('https://my.imean.io/content-plan-insta');
    });

})