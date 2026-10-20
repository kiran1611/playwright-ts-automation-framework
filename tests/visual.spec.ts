import { test, expect } from '../fixtures/base';

test('inventory page looks right @visual', async ({ page, loggedInInventory }) => {
  // make sure the page has fully loaded before the photo
  await expect(loggedInInventory.prices).toHaveCount(6);

  
  await expect(page).toHaveScreenshot('inventory.png');
});