import { test, expect } from '../fixtures/base';

test('Cart badge starts empty', async ({ loggedInPage }) => {
  await expect(loggedInPage.locator('.shopping_cart_badge')).toHaveCount(0);
});

test('AddToCart', async ({ loggedInPage }) => {

    //click add to cart
    await loggedInPage.locator('button#add-to-cart-sauce-labs-backpack').click();

    //verify 1 is visible in cart
    await expect(loggedInPage.locator('span.shopping_cart_badge')).toHaveText('1');

    //click on cart option
     await loggedInPage.locator('a.shopping_cart_link').click();

    //verify cart item name
    await expect(loggedInPage.locator('div.inventory_item_name')).toHaveText('Sauce Labs Backpack');
});

test('login button assert', async ({ page }) => {

   await page.goto('https://www.saucedemo.com/');

await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

});