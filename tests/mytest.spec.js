import { test, expect } from '@playwright/test';
import {login} from './testutils';

test.beforeAll('Setup', async()=>{
  console.log("Starting execution");
});

test.beforeEach('Test setup', async({page})=>{
  await page.goto('/');
});

/*test.afterEach(async({page},testInfo)=>{
  await page.screenshot({path:`${testInfo.title}.png`, fullPage:true});
});*/

test.describe("Login", async()=>{
  
  test('Login souce demo', async ({ page }) => {
    await page.getByRole("textbox", {name:"Username"}).fill("standard_user");
    await page.getByRole("textbox", {name:"Password"}).fill("secret_sauce");
    await page.getByRole("button", {name:"Login"}).click();

    await page.screenshot({path:'saucedemoportal.png', fullPage:true});
    await page.getByText("Swag Labs").screenshot({path:'titlepage.png'}); 

    await expect(page.getByText("Products")).toBeVisible();
    
  });

  test('Login with locator id and class', async ({ page }) => {
    const productsTitleLocator = page.locator(".title");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();

    await expect(productsTitleLocator).toHaveText("Products");
  });

  test('Login with locator test id', async ({ page }) => {
    const productsTitleLocator = page.getByText("Products");

    await page.locator("id=user-name").fill("standard_user");
    await page.locator("id=password").fill("secret_sauce");
    await page.locator("data-test=login-button").click();

    await expect(productsTitleLocator).toHaveText("Products");
  });

  test('Login with validate navigation', async ({ page }) => {
    const productsTitleLocator = page.getByText("Products");
    
    await page.locator("id=user-name").fill("standard_user");
    await page.locator("id=password").fill("secret_sauce");
    await page.locator("data-test=login-button").click();

    await page.waitForURL("**/inventory.html")

    await expect(productsTitleLocator).toHaveText("Products");
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page).toHaveURL(/.*inventory.html/);
  });  
});

test.describe("Login and filter", async()=>{  
  test('Login with validate first price element equal 29.99', async ({ page }) => {
    const productsTitleLocator = page.getByText("Products");
    const firstProductPrice = page.locator("(//*[@class='inventory_item_price'])[1]");

    await page.locator("id=user-name").fill("standard_user");
    await page.locator("id=password").fill("secret_sauce");
    await page.locator("data-test=login-button").click();

    await page.waitForURL("**/inventory.html")

    await expect(productsTitleLocator).toBeVisible();
    await expect(firstProductPrice).toHaveText("$29.99");
    
  });

  test('Login with order low to high and select first price', async ({ page }) => {
    const productsTitleLocator = page.getByText("Products");
    const firstProductPrice = page.locator("(//*[@class='inventory_item_price'])[1]");
    const lastProductPrice = page.locator("(//*[@class='inventory_item_price'])[last()]");
    const filterProducts = page.locator("//*[@class='product_sort_container']");

    await test.step('Login', async ()=>{
      await page.locator("id=user-name").fill("standard_user");
      await page.locator("id=password").fill("secret_sauce");
      await page.locator("data-test=login-button").click();
      await page.waitForURL("**/inventory.html");
    });

    await test.step('Select filter', async ()=>{
      // by value
      await filterProducts.selectOption("lohi");
      //by lebel
      //await filterProducts.selectOption({label:'Price (low to high)'});
    });

    await test.step('Validation price', async()=>{
      await expect(productsTitleLocator).toBeVisible();
      await expect(firstProductPrice).toHaveText("$7.99");
      await expect(lastProductPrice).toHaveText("$49.99");
    });
    
  });

  test('Login with order low to high and select first price with keys', async ({ page }) => {
    const productsTitleLocator = page.getByText("Products");
    const firstProductPrice = page.locator("(//*[@class='inventory_item_price'])[1]");
    const lastProductPrice = page.locator("(//*[@class='inventory_item_price'])[last()]");
    const filterProducts = page.locator("//*[@class='product_sort_container']");

    await test.step('Login', async()=>{
      await login(page);
    });

    await test.step('Select filter', async ()=>{
      await filterProducts.press("ArrowDown");
      await filterProducts.press("ArrowDown");
      await filterProducts.press("Enter");
    });

    await test.step('Validate price', async()=>{
      await expect(productsTitleLocator).toBeVisible();
      await expect(firstProductPrice).toHaveText("$7.99");
      await expect(lastProductPrice).toHaveText("$49.99");
    });
    
  });    
});