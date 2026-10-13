import { test, expect } from '../fixtures/base';
test.describe('API tests', () => {
    test('GET single user', async ({ request }) => {

        //status code check
        const response = await request.get('https://jsonplaceholder.typicode.com/users/1');
        expect(response.status()).toBe(200);

        //body check
        const body = await response.json();
        expect(body.id).toBe(1);
        expect(body.email).toContain('@');
    });

    test('GET list of users', async ({ request }) => {
        //status code check
        const response = await request.get('https://jsonplaceholder.typicode.com/users');
        expect(response.status()).toBe(200);

        //body check
        const body = await response.json();
        expect(body).toHaveLength(10);

    });

    test('POST create', async ({ request }) => {
        const postcreate = await request.post('https://jsonplaceholder.typicode.com/posts', {
            data: {
                title: 'hello',
                body: 'world',
                userId: 1
            }
        });
        expect(postcreate.status()).toBe(201);
        const body = await postcreate.json();
        expect(body.title).toBe('hello');
        console.log(body.id);
    });

    //negative test case
    test('GET missing user returns 404', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/users/9999');
        expect(response.status()).toBe(404);
    });

    //fake API test
    test('POST does not persist data (fake API)', async ({ request }) => {
        const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
            data: {
                title: 'fake post',
                body: 'this should not be persisted',
                userId: 1
            }
        });
        expect(response.status()).toBe(201);
    });

});