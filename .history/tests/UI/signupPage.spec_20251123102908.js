// pages/SignupPage.js

class SignupPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.usernameInput = this.page.locator('#sign-username');
    this.passwordInput = this.page.locator('#sign-password');
    this.signupButton = this.page.getByRole('button', { name: 'Sign up' });
  }

  async signup(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signupButton.click();
  }
}

module.exports = { SignupPage };
