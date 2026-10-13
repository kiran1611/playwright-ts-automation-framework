import { test, expect } from '@playwright/test';

test.describe('SauceDemo', () => {

test.beforeEach(async ({ page }) => {
// prep crew: runs before EVERY test in this describe block
await page.goto('https://www.saucedemo.com/');
await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
await page.getByRole('button', { name: 'Login' }).click();
await expect(page).toHaveURL(/inventory.html/);
});

test('AddToCart', async ({ page }) => {

    //click add to cart
    await page.locator('button#add-to-cart-sauce-labs-backpack').click();

    //verify 1 is visible in cart
    await expect(page.locator('span.shopping_cart_badge')).toHaveText('1');

    //click on cart option
     await page.locator('a.shopping_cart_link').click();

    //verify cart item name
    await expect(page.locator('div.inventory_item_name')).toHaveText('Sauce Labs Backpack');
});

test('Sort by prices', async ({ page }) => {

    //select price filter
    await page.getByRole('combobox' , { name: 'Sort products'}).selectOption('lohi');

    //grab all prices on the page
    const pricesText = await page.locator('.inventory_item_price').allTextContents();
    console.log(pricesText);

    //convert string to integer
    const prices = pricesText.map(p => parseFloat(p.replace('$', '')));
    
    //assert the first price is the lowest 
    console.log(prices[0],prices[prices.length-1]);
    expect(prices[0]).toBeLessThanOrEqual(prices[prices.length-1]);
}); 

});
