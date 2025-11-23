class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.loginLink = this.page.getByText('Log in');
    this.signupLink = this.page.getByText('Sign up');
    this.cartLink = this.page.getByText('Cart');
    this.categoryPhones = this.page.getByRole('link', { name: 'Phones' });
    this.categoryLaptops = this.page.getByRole('link', { name: 'Laptops' });
    this.categoryMonitors = this.page.getByRole('link', { name: 'Monitors' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async openLoginModal() {
    await this.loginLink.click();
  }

  async openSignupModal() {
    await this.signupLink.click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}

module.exports = { HomePage };
