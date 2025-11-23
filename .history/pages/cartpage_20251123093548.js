// pages/CartPage.js

class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Cart table
    this.cartTableBody = this.page.locator('#tbodyid');
    this.cartRows = this.cartTableBody.locator('tr');
    this.totalPrice = this.page.locator('#totalp');

    // Buttons
    this.placeOrderButton = this.page.getByText('Place Order');

    // Place order modal fields
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

  async getRowCount() {
    return await this.cartRows.count();
  }

  async getProductNames() {
    const count = await this.cartRows.count();
    const names = [];
    for (let i = 0; i < count; i++) {
      const row = this.cartRows.nth(i);
      const nameCell = row.locator('td').nth(1); // 0 = pic, 1 = name, 2 = price
      console.log('namecell i' + i +'row '+ r);
      console.log(await nameCell.textContent());
      console.log(await names)
      const name = (await nameCell.textContent()).trim();
      names.push(name);
    }
    return names;
  }

  async getTotal() {
    const text = await this.totalPrice.textContent();
    const num = parseInt(text || '0', 10);
    return isNaN(num) ? 0 : num;
  }

  async deleteFirstRow() {
    const firstRow = this.cartRows.first();
    const deleteLink = firstRow.getByText('Delete');
    await deleteLink.click();
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
