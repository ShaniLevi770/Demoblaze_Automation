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
});

module.exports = { test, expect };
