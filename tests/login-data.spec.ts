import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
test.use({ storageState: { cookies: [], origins: [] } });

const loginCases = [
    { username: 'standard_user', password: 'secret_sauce', shouldSucceed: true, expected: '' },
    { username: 'locked_out_user', password: 'secret_sauce', shouldSucceed: false, expected: 'Epic sadface: Sorry, this user has been locked out.' },
    { username: 'standard_user', password: 'wrong_pass', shouldSucceed: false, expected: 'Epic sadface: Username and password do not match any user in this service' },
];

for (const c of loginCases) {
    test(`Login attempt: ${c.username} / ${c.password} ${c.shouldSucceed ? '@smoke' : '@regression'}`, async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto(); // 1. go to the site
        await loginPage.login(c.username,c.password);
        

        if (c.shouldSucceed) {
            await expect(page).toHaveURL(/inventory.html/);
        } else {
            await expect(loginPage.errorBanner).toContainText(c.expected);// 4. assert using c.expected
        }

    });
}