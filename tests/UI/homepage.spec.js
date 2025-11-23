const { test, expect } = require('../fixtures');
const { HomePage } = require('../../pages/HomePage');

test.describe('Home page', () => {
  test('loads and shows main categories', async ({ homePage }) => {

    await homePage.goto();
    await expect(homePage.categoryPhones).toBeVisible();
    await expect(homePage.categoryLaptops).toBeVisible();
    await expect(homePage.categoryMonitors).toBeVisible();
  });
});
