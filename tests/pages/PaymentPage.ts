import { Page,Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class PaymentPage extends BasePage {

    readonly emailInput: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly addressInput: Locator;
    readonly cityInput: Locator;
    readonly postalCodeInput: Locator;
    readonly phoneInput: Locator;
    readonly cardNumberInput: Locator;
    readonly expiryDateInput: Locator;
    readonly cvvInput: Locator;
    readonly nameOnCardInput: Locator;
    readonly payNowButton: Locator;
    readonly paymentSuccessMessage: Locator;

constructor(page: Page) {
    super(page);
  this.emailInput = page.getByRole('textbox', { name: 'Email' });
  this.firstNameInput = page.getByRole('textbox', { name: 'First name (optional)' });
  this.lastNameInput = page.getByRole('textbox', { name: 'Last name' });
  this.addressInput = page.getByRole('textbox', { name: 'Address' });
  this.cityInput = page.getByRole('textbox', { name: 'City' });
  this.phoneInput = page.getByRole('textbox', { name: 'Phone (optional)' });
  this.postalCodeInput = page.getByRole('textbox', { name: 'Postal code' });
  this.cardNumberInput = page.frameLocator('iframe[name^="card-fields-number"]').getByRole('textbox', { name: 'Card number' });
  this.expiryDateInput = page.frameLocator('iframe[name^="card-fields-expiry"]').getByRole('textbox', { name: 'Expiration date (MM / YY)'  });
  this.cvvInput = page.frameLocator('iframe[name^="card-fields-verification_value"]').getByRole('textbox', { name: 'Security code' });
  this.nameOnCardInput = page.frameLocator('iframe[name^="card-fields-name"]').getByRole('textbox', { name: 'Name on card' });
  this.payNowButton = page.getByRole('button', { name: 'Pay now' });
  this.paymentSuccessMessage = page.getByRole('heading', { name: 'Your order is confirmed' });
}
  async expectOnPaymentPage() {
    await expect(this.page).toHaveURL(/\/checkouts\//);
  }

  async fillPaymentForm({ email, firstName, lastName, address, city, postalCode, phone, cardNumber, expiryDate, cvv, nameOnCard }: any) {
    await this.emailInput.fill(email);
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.addressInput.fill(address);
    await this.cityInput.fill(city);
    await this.postalCodeInput.fill(postalCode);
    await this.cardNumberInput.fill(cardNumber);
    await this.expiryDateInput.fill(expiryDate);
    await this.cvvInput.fill(cvv);
  }

  async submitPayment() {
    await this.payNowButton.click();
  }

  async confirmPaymentSuccess() {
    await expect(this.paymentSuccessMessage).toBeVisible();
    await expect(this.paymentSuccessMessage).toHaveText('Your order is confirmed');
  }
 }