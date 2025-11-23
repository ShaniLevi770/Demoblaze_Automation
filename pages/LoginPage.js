// pages/LoginPage.js

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.usernameInput = this.page.locator('#loginusername');
    this.passwordInput = this.page.locator('#loginpassword');
    this.loginButton = this.page.getByRole('button', { name: 'Log in' });
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };
