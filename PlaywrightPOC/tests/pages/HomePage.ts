import { Page,Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly productLink: Locator;
  readonly AddToCartBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.productLink = page.getByRole('link', { name: 'Grey jacket Grey jacket £' });
    this.AddToCartBtn = page.getByRole('button', { name: 'Add to Cart' });
  }

  async open() {
    await this.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async selectProduct() {
    const product = this.productLink.first();
    await product.waitFor({ state: 'visible' });
    product.click();
  }

  async AddToCart() {
    await this.AddToCartBtn.waitFor({ state: 'visible' });
     await this.AddToCartBtn.click();
  }
}
