import { test, expect } from '@playwright/test';

test('notifications', async ({ page })=> {
  await page.goto('https://my.imean.io/home');
    await page.getByLabel('Close', { exact: true }).click();

    const avatar = page.locator('div.relative');
    if(await avatar.isVisible()){
      const box = await avatar.boundingBox(); // if i wanna use coordinates (method)
        if(box){
          await page.mouse.move(box.x + box.width/2, box.y + box.height/2); // x, y always are in the upper left top corner
          await page.mouse.click(box.x + box.width/2, box.y + box.height/2);
        }

      const dropdown = page.locator('a.ant-dropdown-trigger');
      if(await dropdown.isVisible({timeout: 10000})){
        await expect(dropdown).toHaveClass('ant-dropdown-trigger ant-dropdown-open');
        await page.getByRole('link', { name: 'Профиль' }).click();
        console.warn('YAAY');
      } else{
        console.warn('LOSER HAHA');
        }
      if(await dropdown.isDisabled()){
        await expect(dropdown).toContainClass('ant-dropdown-trigger');
        console.warn('NOOOooo');
      }
  
    } 
    
  })