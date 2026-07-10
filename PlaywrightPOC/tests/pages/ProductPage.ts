import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  readonly addToCartButton = this.page.locator('input#add');
  readonly cartLink = this.page.locator('a[href="/cart"]');

  constructor(page: Page) {
    super(page);
  }

  async expectAddToCartVisible() {
    await expect(this.addToCartButton).toBeVisible({ timeout: 10000 });
  }

  async addToCart() {
    await this.expectAddToCartVisible();
    const addToCartResponse = this.page.waitForResponse(
      response => response.url().includes('/cart/add') && response.status() === 200,
    );

    await Promise.all([
      addToCartResponse,
      this.addToCartButton.click(),
    ]);
  }

  async openCart() {
    await Promise.all([
      this.page.waitForNavigation({ url: '**/cart' }),
      this.cartLink.first().click(),
    ]);
  }
}
