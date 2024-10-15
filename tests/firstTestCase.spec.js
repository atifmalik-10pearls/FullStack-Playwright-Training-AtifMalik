const { test, expect } = require('@playwright/test');

test('Visit website', async ({ page }) => {
    await page.goto('https://google.com/');
  
});