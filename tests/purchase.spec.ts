import { test } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { CheckOutPage } from './pages/CheckOutPage';
import { PaymentPage } from './pages/PaymentPage';
import {faker} from '@faker-js/faker';


test.describe('Sauce Demo checkout skeleton', () => {
  test('should add a product to cart and reach the cart page', async ({ page }) => {
    const home = new HomePage(page);
    const product = new ProductPage(page);
    const checkout = new CheckOutPage(page);
    const payment = new PaymentPage(page);

    await home.open();
    await home.selectProduct();

    await product.verifyProductName('Grey jacket');
    await product.addToCart();
    await product.checkout();

    await checkout.expectOnCheckoutPage();
    await checkout.expectProductAdded('Grey jacket');
    await checkout.Checkout();

    await payment.expectOnPaymentPage();
    await payment.fillPaymentForm({
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      postalCode: faker.location.zipCode('####'),
      cardNumber: "1",
      expiryDate: faker.date.future().toLocaleDateString('en-ZA', { month: '2-digit', year: '2-digit' }).replace('/', ' / '),
      cvv: faker.finance.creditCardCVV().toString(),
    });
    await payment.submitPayment();
  });
});
