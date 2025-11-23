const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../pages/homepage');

test.describe('Home page', () => {
  test('loads and shows main categories', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();

    await expect(homePage.categoryPhones).toBeVisible();
    await expect(homePage.categoryLaptops).toBeVisible();
    await expect(homePage.categoryMonitors).toBeVisible();
  });
});
