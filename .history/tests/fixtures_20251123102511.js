const { test: base, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { CartPage } = require('../pages/CartPage');
const { LoginPage } = require('../pages/LoginPage');
const { SignupPage } = require('../pages/SignupPage');


// Extend Playwright's test function with our custom fixtures
exports.test = base.extend({
  
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
