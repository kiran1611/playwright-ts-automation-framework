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