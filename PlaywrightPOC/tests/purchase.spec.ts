import { test } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';


test.describe('Sauce Demo checkout skeleton', () => {
  test('should add a product to cart and reach the cart page', async ({ page }) => {
    const home = new HomePage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);

    await home.open();
    await home.selectProduct();

    await product.addToCart();
    await product.openCart();

    await cart.expectOnCartPage();
    await cart.expectCartCountAtLeast(1);
    await cart.expectCheckoutVisible();
  });
});
