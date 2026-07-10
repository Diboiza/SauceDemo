import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly checkoutButton = this.page.locator('a.checkout');
  readonly cartCount = this.page.locator('#cart-target-desktop, #cart-target-mobile');

  constructor(page: Page) {
    super(page);
  }

  async expectOnCartPage() {
    await expect(this.page).toHaveURL(/\/cart/);
    await expect(this.page.locator('h1')).toContainText(/My Cart/i);
  }

  async expectCartCountAtLeast(min: number = 1) {
    await expect(this.cartCount).toBeVisible();
    const rawText = await this.cartCount.textContent();
    const value = Number((rawText || '').replace(/\D/g, ''));
    expect(value).toBeGreaterThanOrEqual(min);
  }

  async expectCheckoutVisible() {
    await expect(this.checkoutButton).toBeVisible({ timeout: 10000 });
  }
}
