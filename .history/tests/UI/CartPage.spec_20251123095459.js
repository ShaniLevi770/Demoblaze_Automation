// tests/UI/cartpage.spec.js

const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../pages/HomePage.js');
const { CartPage } = require('../../pages/CartPage.js');

test.describe('Cart & Purchase', () => {
  test('add product to cart and see it with correct total', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    await homePage.goto();

    // Click first product on homepage
    const firstProduct = page.locator('.hrefch').first();
    const productName = (await firstProduct.textContent()).trim();

    await firstProduct.click();

    // Add to cart (accept alert)
    const addToCartButton = page.getByText('Add to cart');
    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await addToCartButton.click();

    // Go to cart
    await homePage.openCart();

    // Verify product present
    await page.waitForLoadState('networkidle');

    const names = await cartPage.getProductNames();
    expect(names).toContain(productName);

    // Verify total > 0
    const total = await cartPage.getTotal();
    expect(total).toBeGreaterThan(0);
  });

  test('remove item from cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    // Precondition: have at least one item in cart
    await homePage.goto();
    const firstProduct = page.locator('.hrefch').first();
    await firstProduct.click();

    const addToCartButton = page.getByText('Add to cart');
    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await addToCartButton.click();

    await homePage.openCart();

    const before = await cartPage.getRowCount();
    expect(before).toBeGreaterThan(0);

    await cartPage.deleteFirstRow();
    // Small wait because the site updates the table without a nice event
    await page.waitForTimeout(1000);

    const after = await cartPage.getRowCount();
    expect(after).toBeLessThan(before);
  });

  test('complete purchase (happy path)', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    // Add one product first
    await homePage.goto();
    const firstProduct = page.locator('.hrefch').first();
    await firstProduct.click();

    const addToCartButton = page.getByText('Add to cart');
    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await addToCartButton.click();

    await homePage.openCart();

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
