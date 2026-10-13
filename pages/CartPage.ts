import {Page, Locator} from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly itemNames: Locator;
 
    constructor(page: Page) {
        this.page = page;
        this.itemNames = page.locator('div.inventory_item_name');
    }
    
    getItemNames(): Promise<string[]> {
        return this.itemNames.allTextContents();
    }
}