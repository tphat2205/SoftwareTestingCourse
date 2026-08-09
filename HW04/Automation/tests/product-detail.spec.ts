import { test, expect } from '@playwright/test';
import testData from '../test-data/product-detail.json';

const ADMIN_BASE = 'http://localhost:5174';

test.describe('FR-06: Xem chi tiết sản phẩm (Product Detail View)', () => {
  for (const data of testData) {
    test(`${data.tc_id}: ${data.description}`, async ({ page }) => {
      // Navigate to product detail page
      await page.goto(`/product/${data.inputs.productId}`);

      if (!data.expectedOutputs.productExists) {
        // Product does not exist — SUT shows "Đang tải..." then error text
        // Wait for content to load (API call resolves)
        await page.waitForTimeout(2000);

        // Assertion pattern 1: toContainText — check error message on page
        const body = page.locator('body');
        await expect(body).toContainText(data.expectedOutputs.errorText!);

        // Assertion pattern 2: toHaveURL — verify URL pattern is still /product/...
        await expect(page).toHaveURL(new RegExp('/product/'));
        return;
      }

      // Product exists — wait for product detail to load
      // Assertion pattern 1: toBeVisible — product name heading should appear
      const productName = page.locator('h1');
      await expect(productName).toBeVisible({ timeout: 10000 });

      // If we expect a specific product name, verify it
      if (data.expectedOutputs.expectedName) {
        // Assertion pattern 2: toHaveText — verify exact product name
        await expect(productName).toHaveText(data.expectedOutputs.expectedName);
      }

      // If we expect a specific price, verify it
      if (data.expectedOutputs.expectedPrice) {
        const priceText = page.locator('.text-red-600');
        await expect(priceText).toContainText(data.expectedOutputs.expectedPrice);
      }

      // Fill quantity using the number input
      const quantityInput = page.locator('input[type="number"]');
      await expect(quantityInput).toBeVisible();
      await quantityInput.fill(data.inputs.quantity);

      // Get the add-to-cart button
      const addToCartBtn = page.locator('button', { hasText: 'Thêm vào giỏ hàng' });
      await expect(addToCartBtn).toBeVisible();

      if (data.inputs.singleClickOnly) {
        // TEST BUG: Click only once — button should NOT change to "Đã thêm"
        await addToCartBtn.click();
        await page.waitForTimeout(500);

        // Assertion pattern 3: toHaveText — button still shows original text after single click
        // This documents the SUT bug where first click is ignored
        await expect(addToCartBtn).toHaveText(data.expectedOutputs.buttonText!);
        return;
      }

      // Normal flow: Click TWICE (SUT bug requires double click)
      // First click: sets clickCount=1, does nothing
      await addToCartBtn.click();
      await page.waitForTimeout(300);

      // Second click: actually adds to cart
      // After first click, button text is still "Thêm vào giỏ hàng"
      const addToCartBtn2 = page.locator('button', { hasText: 'Thêm vào giỏ hàng' });
      await addToCartBtn2.click();

      // Wait for state update
      await page.waitForTimeout(500);

      // Assertion pattern 3: toHaveText — button text changes to "Đã thêm"
      const successBtn = page.locator('button.bg-green-600');
      await expect(successBtn).toHaveText(data.expectedOutputs.buttonText!);
    });
  }
});
