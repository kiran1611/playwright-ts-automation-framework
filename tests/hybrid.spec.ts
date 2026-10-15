import { test as base, expect } from '@playwright/test';

const BASE = 'https://automationexercise.com/api';

type Account = { email: string; password: string; name: string };

const test = base.extend<{ account: Account }>({
  account: async ({ request }, use) => {
    const account = {
      email: `qa.${Date.now()}@example.com`,
      password: 'Test@1234',
      name: 'QA Tester',
    };
    
    // SETUP: create the account through the API
    const created = await request.post(`${BASE}/createAccount`, {
      form: {
        name: account.name, email: account.email, password: account.password,
        title: 'Mr', birth_date: '1', birth_month: 'January', birth_year: '1990',
        firstname: 'QA', lastname: 'Tester', company: 'Demo',
        address1: '1 Test Street', address2: '', country: 'India',
        zipcode: '560001', state: 'Karnataka', city: 'Bengaluru',
        mobile_number: '9999999999',
      },
    });
     const createdBody = await created.json();
    expect(createdBody.responseCode).toBe(201);

    await use(account); // the test runs here
 
// TEARDOWN: always runs, even if the test failed
const deleted = await request.delete(`${BASE}/deleteAccount`, {
form: { email: account.email, password: account.password },
});
console.log('cleanup:', await deleted.text());
},
});


test('API: create account, read it back, clean up @external', async ({ request }) => {
    const email = `qa.${Date.now()}@example.com`;   // unique every run
    const password = 'Test@1234';

    // 1. create
    const created = await request.post(`${BASE}/createAccount`, {
        form: {
            name: 'QA Tester', email, password, title: 'Mr',
            birth_date: '1', birth_month: 'January', birth_year: '1990',
            firstname: 'QA', lastname: 'Tester', company: 'Demo',
            address1: '1 Test Street', address2: '', country: 'India',
            zipcode: '560001', state: 'Karnataka', city: 'Bengaluru',
            mobile_number: '9999999999',
        },
    });
    const createdBody = await created.json();
    expect(createdBody.responseCode).toBe(201);
    expect(createdBody.message).toBe('User created!');

    // 2. read it back:
    const verify = await request.post(`${BASE}/verifyLogin`, {
        form: { email, password },
    });
    const verifyBody = await verify.json();
    expect(verifyBody.responseCode).toBe(200);
    expect(verifyBody.message).toBe('User exists!');  //   assert status code and response message are as expected
  
    
    const deleted = await request.delete(`${BASE}/deleteAccount`, {  // 3. clean up:
        form: { email, password },
    });
    const deletedBody = await deleted.json();
    expect(deletedBody.responseCode).toBe(200);
    expect(deletedBody.message).toBe('Account deleted!');//   assert account deletion was successful
    
    const afterDelete = await request.post(`${BASE}/verifyLogin`, { form: { email, password } });
    const afterDeleteBody = await afterDelete.json();
    expect(afterDeleteBody.message).toBe('User not found!');//  assert response message is user not found
    

});

test('UI login works for an API-created account @external', async ({ page, account }) => {
  await page.goto('https://automationexercise.com/login');

  // 1. fill email and password
  await page.locator('[data-qa="login-email"]').fill(account.email);
  await page.locator('[data-qa="login-password"]').fill(account.password);

  // 2. click Login
  await page.locator('[data-qa="login-button"]').click();

  // 3. assert logged in
  await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
  await expect(page.getByText(`Logged in as ${account.name}`)).toBeVisible();
});

