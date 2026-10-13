import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly sortDropdown: Locator;
    readonly prices: Locator;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sortDropdown = page.getByRole('combobox', { name: 'Sort products' });
        this.prices = page.locator('.inventory_item_price');
        this.cartBadge = page.locator('span.shopping_cart_badge');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    }

    async sortBy(value: string) { await this.sortDropdown.selectOption(value); } //sorty by lohi or hilo etc.
    async addToCart(productId: string) { await this.page.locator(`[data-test="add-to-cart-${productId}"]`).click(); }// just parse  async getPrices(): Promise<number[]> { /* ??? */ }
    async getPrices(): Promise<number[]> {
        const pricesText = await this.prices.allTextContents();
        return pricesText.map(p => parseFloat(p.replace('$', '')));
    }
    async openCart() { await this.cartLink.click(); }

    async goto() {
  await this.page.goto('https://www.saucedemo.com/inventory.html');
}
}