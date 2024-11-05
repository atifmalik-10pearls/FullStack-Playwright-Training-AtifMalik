import { defineConfig } from '@playwright/test';
import { URL, USERNAME, PASSWORD } from '../test-constants/constants.js';

exports.loginClass = class loginClass{
    /**
    * @param {import('@playwright/test').Page} page
    */

    constructor(page){
        this.page = page;

        // SignUp Locators
        this.signUpLink = page.getByRole('link', { name: 'Sign up' });
        this.signUpUsername = page.locator('#sign-username');
        this.signUpPassword = page.getByLabel('Password:');
        this.signUpButton = page.getByRole('button', { name: 'Sign up' });

        // Login Locators
        this.loginMenu = page.getByRole('link', { name: 'Log in' });
        this.loginUsername = page.locator('#loginusername');
        this.loginPassword = page.locator('#loginpassword');
        this.loginButton = page.getByRole('button', { name: 'Log in' });

        // Generate Login Credentials
        this.username = this.randomString();
        this.password = this.randomString();        
    }

    async gotoSite() {
        await this.page.goto(URL);
    }

    async userSignUp() {
        await this.signUpLink.click();
        await this.signUpUsername.click();
        await this.signUpUsername.fill(this.username);
        await this.signUpPassword.click();
        await this.signUpPassword.fill(this.password);
        await this.signUpButton.click();
    }

    async userLogin() {
        await this.loginMenu.click();
        await this.loginUsername.click();
        await this.loginUsername.fill(this.username);
        await this.loginPassword.click();
        await this.loginPassword.fill(this.password);
        await this.loginButton.click();
    }

    randomString() {
        // return random string.
        const result = Math.random().toString(36).substring(2,7);
        return result;
    }
}