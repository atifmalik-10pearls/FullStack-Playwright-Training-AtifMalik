const { test, expect } = require('@playwright/test');
const { assert } = require('console');
import { URL, USERNAME, PASSWORD } from '../test-constants/constants.js';
 
test('To verify user can Sign-up', async ({ page }) => {
    await page.goto(URL);
    await sign_up(page);
    await login(page);

    // Assertion 01 - Logout link is present
    await expect(page.locator('xpath=//*[@id="logout2"]')).toBeVisible();
    
    // Assertion 02 - Validate expected welcome text includes USERNAME
    expect(await page.locator('xpath=//*[@id="nameofuser"]').textContent()).toEqual('Welcome'.concat(" ", USERNAME))
    
    await logout(page);
});



async function sign_up(page){
    await page.locator('xpath=//*[@id="signin2"]').click()
    await page.locator('xpath=//*[@id="sign-username"]').fill(USERNAME)
    await page.locator('xpath=//*[@id="sign-password"]').fill(PASSWORD)
    await page.locator('css=#signInModal .btn-primary').click()
}


async function login(page){
    await page.locator('xpath=//*[@id="login2"]').click()
    await page.locator('xpath=//*[@id="loginusername"]').fill(USERNAME)
    await page.locator('xpath=//*[@id="loginpassword"]').fill(PASSWORD)
    await page.locator('css=#logInModal .btn-primary').click()
}


async function logout(page){
    await page.locator('xpath=//*[@id="logout2"]').click()
}


