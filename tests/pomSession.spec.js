import { test, expect } from '@playwright/test';
const { loginClass } = require('../pages/loginPage.js');

test.describe.configure({ mode: 'serial' });

/** @type {import('@playwright/test').Page} */
let page;
let loginObject;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
        // Object of loginClass
    loginObject = new loginClass(page);
    await loginObject.gotoSite();
});
  

test.afterAll(async () => {
    await page.close();
});
  

test('Verify Sign up', async () => {
    await loginObject.userSignUp();  
});
  

test('Verify Login', async () => {
    await loginObject.userLogin();

    //Login Assetions
    // Assertion 01 - Logout link is present
    await expect(page.locator('xpath=//*[@id="logout2"]')).toBeVisible();
    // Assertion 02 - Validate expected welcome text includes USERNAME
    expect(await page.locator('xpath=//*[@id="nameofuser"]').textContent()).toEqual('Welcome'.concat(" ", loginObject.username)) 
});

