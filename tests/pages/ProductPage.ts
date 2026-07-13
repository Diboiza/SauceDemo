import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  readonly addToCartButton: Locator;
  readonly checkoutLink: Locator;
  readonly productHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
    this.checkoutLink = page.getByRole('link', { name: 'Check Out' });
    this.productHeading = page.getByRole('heading', { name: 'Grey jacket' })
  }

  async expectOnProductPage() {
    await expect(this.page).toHaveURL(/\/products\//);
    await this.page.waitForLoadState('domcontentloaded');
  }

   async verifyProductName(productName: string) {
    await expect(this.productHeading).toContainText(productName);
  }

  async addToCart() {
   await this.addToCartButton.waitFor({ state: 'visible' });
   await this.addToCartButton.click();
  };

  async checkout() {
    await this.page.waitForTimeout(5000); // Wait for 5 seconds to ensure the checkout link is visible
    await this.checkoutLink.click({force: true});
  }
}
