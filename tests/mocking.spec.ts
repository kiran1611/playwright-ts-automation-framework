import { test, expect } from '@playwright/test';

test('mocked API shows only the fake fruit', async ({ page }) => {
    // 1. set the trap BEFORE loading the page
    await page.route('*/**/api/v1/fruits', async route => {
    await route.fulfill({ json: [{ name: 'Strawberry', id: 21 }] });
    });

    // 2. open the page
    await page.goto('https://demo.playwright.dev/api-mocking');

    // 3. assert Strawberry is visible
    await expect(page.getByText('Strawberry')).toBeVisible();
    // 4. assert Banana is NOT on the page
    await expect(page.getByText('Banana')).not.toBeVisible();

});

test('real fruits plus one injected fruit @external', async ({ page }) => {
  await page.route('*/**/api/v1/fruits', async route => {
    const response = await route.fetch();   // let the REAL call happen
    const json = await response.json();     // read the real data
    json.push({ name: 'Loquat', id: 100 }); // add one fake item
    await route.fulfill({ response, json }); // hand back real + fake
  });

  await page.goto('https://demo.playwright.dev/api-mocking');

  
  // 1. assert Loquat is visible with more time for the API to respond
  await expect(page.getByText('Loquat', { exact: true })).toBeVisible({ timeout: 30000 });
  // 2. assert a REAL fruit (e.g. Banana) is still visible
  await expect(page.getByText('Banana')).toBeVisible();
});

