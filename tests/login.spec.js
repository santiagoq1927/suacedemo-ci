const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
//const LoginPage = require('../pages/LoginPage');
const HomePage = require('../pages/HomePage');

test('Login souce demo', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.navigate();
    await loginPage.login("standard_user","secret_sauce");
    await homePage.validateTitle("Products")
  });