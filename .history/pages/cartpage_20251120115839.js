class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.placeOrderButton = this.page.getByText('Place Order');
    this.nameInput = this.page.locator('#name');
    this.countryInput = this.page.locator('#country');
    this.cityInput = this.page.locator('#city');
    this.cardInput = this.page.locator('#card');
    this.monthInput = this.page.locator('#month');
    this.yearInput = this.page.locator('#year');
    this.purchaseButton = this.page.getByRole('button', { name: 'Purchase' });
  }

  async openPlaceOrderModal() {
    await this.placeOrderButton.click();
  }

  async fillOrderForm({ name, country, city, card, month, year }) {
    await this.nameInput.fill(name);
    await this.countryInput.fill(country);
    await this.cityInput.fill(city);
    await this.cardInput.fill(card);
    await this.monthInput.fill(month);
    await this.yearInput.fill(year);
  }

  async purchase() {
    await this.purchaseButton.click();
  }
}

module.exports = { CartPage };
