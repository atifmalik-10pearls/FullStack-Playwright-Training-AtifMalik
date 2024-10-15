const { test, expect } = require('@playwright/test');
const { assert } = require('console');

test('Visit website', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');
    
    // Selecting a product to add in cart
    let selected_product = page.locator('xpath=//*[@id="tbodyid"]/div[1]//h4/a')
    var expected_product_name = selected_product.textContent()
    await selected_product.click()
    // Adding the selected product to cart
    await page.getByText('Add to cart').click()
    // Validting dialog message 
    page.on('dialog', async dialog => {
        assert(dialog.message() == 'Product added');
        await dialog.accept()
    });
    // Navigaating to the cart
    await page.locator('css=#cartur').click()
    // Validting if the selected product is present in the cart
    let actual_product = page.locator('xpath=//*[@id="tbodyid"]/tr/td[2]')
    await actual_product.click()
    assert(expected_product_name == actual_product.textContent())
});