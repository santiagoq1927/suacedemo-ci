import { test} from '@playwright/test';

export async function login(page){
    await page.locator("id=user-name").fill("standard_user");
    await page.locator("id=password").fill("secret_sauce");
    await page.locator("data-test=login-button").click();
    await page.waitForURL("**/inventory.html");
}