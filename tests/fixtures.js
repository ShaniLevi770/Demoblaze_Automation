// tests/fixtures.js
const { test: base, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage.js');
const { CartPage } = require('../pages/CartPage.js');
const { LoginPage } = require('../pages/LoginPage.js');
const { SignupPage } = require('../pages/SignupPage.js');

const test = base.extend({
  homePage: async ({ page }, use) => {
    const home = new HomePage(page);
    await use(home);
  },

  cartPage: async ({ page }, use) => {
    const cart = new CartPage(page);
    await use(cart);
  },

  loginPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await use(login);
  },

  signupPage: async ({ page }, use) => {
    const signup = new SignupPage(page);
    await use(signup);
  },
  cartState: async ({ page, homePage, cartPage }, use) => {
    await homePage.goto();
    const firstProduct = page.locator('.hrefch').first();
    const productName = (await firstProduct.textContent()).trim();
    await firstProduct.click();
    page.once('dialog', (dialog) => dialog.accept());
    await page.getByText('Add to cart').click();
    await homePage.openCart();
    await cartPage.waitForCartLoaded();
    await use({ productName });
  },
});

module.exports = { test, expect };
