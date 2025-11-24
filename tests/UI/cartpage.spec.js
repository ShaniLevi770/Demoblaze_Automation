// tests/UI/cartpage.spec.js
const { test, expect } = require('../fixtures');
const testData = require('../../data/testData');


test.describe('Cart & Purchase', () => {
  test('add product to cart and see it with correct total', async ({ cartPage, cartState }) => {
    const { productName } = cartState;
    const names = await cartPage.getProductNames();
    expect(names).toContain(productName);

    const total = await cartPage.getTotal();
    expect(total).toBeGreaterThan(0);
  });


  test('remove item from cart', async ({ cartPage, cartState }) => {
    const { productName } = cartState;
    expect(productName).toBeTruthy();

    const before = await cartPage.getRowCount();
    expect(before).toBeGreaterThan(0);

    await cartPage.deleteFirstRow();
    await expect.poll(async () => await cartPage.getRowCount()).toBeLessThan(before);

    const after = await cartPage.getRowCount();
    expect(after).toBeLessThan(before);
  });

  test('complete purchase (happy path)', async ({ page, cartPage, cartState }) => {
    const { productName } = cartState;
    expect(productName).toBeTruthy();

    await cartPage.openPlaceOrderModal();
    await cartPage.fillOrderForm(testData.placeOrderFillForemData);
    await cartPage.purchase();

    const confirmation = page.locator('.sweet-alert');
    await expect(confirmation).toBeVisible();
    await expect(confirmation).toContainText('Thank you for your purchase');
    await page.getByRole('button', { name: 'OK' }).click();
  });
});