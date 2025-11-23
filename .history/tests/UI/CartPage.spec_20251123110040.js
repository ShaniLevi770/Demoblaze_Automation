// tests/UI/cartpage.spec.js
const { test, expect } = require('../fixtures');

test.describe('Cart & Purchase', () => {
  test('add product to cart and see it with correct total', async ({ page, homePage, cartPage }) => {
    test.step.describe('(add first product to cart, accept alert)');
    await homePage.goto();
    const firstProduct = page.locator('.hrefch').first();
    const productName = (await firstProduct.textContent()).trim();
    await firstProduct.click();
    const addToCartButton = page.getByText('Add to cart');
    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await addToCartButton.click();

    test.step.describe('(Go to cart, wait for cart to load')
    await homePage.openCart();
    await cartPage.waitForCartLoaded();

    const names = await cartPage.getProductNames();
    expect(names).toContain(productName);
    // Verify total > 0
    const total = await cartPage.getTotal();
    expect(total).toBeGreaterThan(0);
  });

  test('remove item from cart', async ({ page, homePage, cartPage }) => {
    await homePage.goto();

    // Precondition: add item first
    const firstProduct = page.locator('.hrefch').first();
    await firstProduct.click();

    const addToCartButton = page.getByText('Add to cart');
    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await addToCartButton.click();

    await homePage.openCart();
    await cartPage.waitForCartLoaded();

    const before = await cartPage.getRowCount();
    expect(before).toBeGreaterThan(0);

    await cartPage.deleteFirstRow();
    await page.waitForTimeout(1000); // small wait for Demoblaze table to update

    const after = await cartPage.getRowCount();
    expect(after).toBeLessThan(before);
  });

  test('complete purchase (happy path)', async ({ page, homePage, cartPage }) => {
    await homePage.goto();

    // Add one product first
    const firstProduct = page.locator('.hrefch').first();
    await firstProduct.click();

    const addToCartButton = page.getByText('Add to cart');
    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await addToCartButton.click();

    await homePage.openCart();
    await cartPage.waitForCartLoaded();

    // Place order
    await cartPage.openPlaceOrderModal();
    await cartPage.fillOrderForm({
      name: 'Test User',
      country: 'Israel',
      city: 'Golan',
      card: '4111111111111111',
      month: '12',
      year: '2030',
    });

    await cartPage.purchase();

    const confirmation = page.locator('.sweet-alert');
    await expect(confirmation).toBeVisible();
    await expect(confirmation).toContainText('Thank you for your purchase');

    await page.getByRole('button', { name: 'OK' }).click();
  });
});
