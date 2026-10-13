import { test, expect } from '@playwright/test';



test('already logged in, no login steps', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page).toHaveURL(/inventory.html/);
});


