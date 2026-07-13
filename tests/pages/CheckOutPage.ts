import { Page,Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckOutPage extends BasePage {
  readonly checkoutHeading: Locator;
  readonly productDescription: Locator;
  readonly checkoutButton: Locator;

    constructor(page: Page) {
    super(page);
    this.checkoutHeading = page.getByRole('heading', { name: 'My Cart' });
    this.productDescription = page.getByRole('link', { name: 'Grey jacket - Grey jacket' })
    this.checkoutButton = page.getByRole('button', { name: 'Check Out' })
  }

  async expectOnCheckoutPage() {
    await expect(this.page).toHaveURL(/\/cart/);
    await expect(this.checkoutHeading).toBeVisible();
  }

  async expectProductAdded(productName: string) {
    await expect(this.productDescription).toContainText(productName);
  }

  async Checkout() {
    await this.checkoutButton.waitFor({ state: 'visible' });
    await this.checkoutButton.click();
  }
    
}