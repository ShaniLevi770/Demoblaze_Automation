// tests/fixtures.js
const { test: base, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage.js');
const { CartPage } = require('../pages/CartPage.js');
const { LoginPage } = require('../pages/LoginPage.js');
const { SignupPage } = require('../pages/SignupPage.js');
const { generateUniqueCredentials } = require('../helpers/generateCredentials.js');


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

  loggedInUser: async ({ page, homePage, signupPage, loginPage }, use) => {
    const uniqueId = Date.now();
    const username = `testuser_${uniqueId}`;
    const password = `Pass!${uniqueId}`;

    await homePage.goto();

    await homePage.openSignupModal();
    const signupDialogPromise = page.waitForEvent('dialog');
    await signupPage.signup(username, password);
    const signupDialog = await signupDialogPromise;
    expect(signupDialog.message()).toContain('Sign up successful');
    await signupDialog.accept();
    await page.locator('#signInModal').getByRole('button', { name: 'Close' }).click();

    await homePage.openLoginModal();
    await loginPage.login(username, password);

    const welcomeUser = page.locator('#nameofuser');
    await expect(welcomeUser).toContainText(username);
    await use({ username, password });
  },

  // Logged-in user fixture:
  //  - creates unique username/password
  //  - signs up the user
  //  - logs in
  //  - returns { username, password } to tests
  loggedInUser: async ({ page, homePage, signupPage, loginPage }, use) => {
    const { username, password } = generateUniqueCredentials();


    await homePage.goto();
    await homePage.openSignupModal();

    const signupDialogPromise = page.waitForEvent('dialog');
    await signupPage.signup(username, password);
    const signupDialog = await signupDialogPromise;
    await signupDialog.accept();

    await homePage.openLoginModal();
    await loginPage.login(username, password);

    const welcomeUser = page.locator('#nameofuser');
    await expect(welcomeUser).toBeVisible();
    await expect(welcomeUser).toContainText(username);

    await use({ username, password });
  },
});

module.exports = { test, expect };
