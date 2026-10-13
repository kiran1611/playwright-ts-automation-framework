import { test, expect } from '../fixtures/base';

test('Add to Cart', async ({ loggedInInventory }) => {

    await loggedInInventory.addToCart('sauce-labs-backpack');
    await expect(loggedInInventory.cartBadge).toHaveText('1');
});

test('sort by prices', async ({ loggedInInventory }) => {

    await loggedInInventory.sortBy('lohi');
    const prices = await loggedInInventory.getPrices();
    expect(prices[0]).toBeLessThanOrEqual(prices[prices.length - 1]);
});

test('open cart', async ({ page, loggedInInventory, cartPage }) => {
    await loggedInInventory.addToCart('sauce-labs-backpack');
    await loggedInInventory.openCart();
    await expect(page).toHaveURL(/cart.html/);
    const itemNames = await cartPage.getItemNames();
    expect(itemNames).toContain('Sauce Labs Backpack');
});