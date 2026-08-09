import { test, expect } from '@playwright/test';
import fr06Data from '../test-data/product-detail.json';

test.describe('FR-06: Xem chi tiết sản phẩm', () => {
  for (const data of fr06Data) {
    test(`Test ${data.tc_id}: ${data.description}`, async ({ page }) => {
      // Điều hướng đến trang chi tiết sản phẩm theo ID
      await page.goto(`/product/${data.inputs.productId}`);

      if (data.expectedOutputs.status === 'page_error') {
        const errorContainer = page.locator('[data-testid="page-error-message"]');
        
        // Assertion pattern 1: toHaveURL (Vẫn giữ URL cũ hoặc chuyển hướng tuỳ logic, giả sử giữ nguyên)
        await expect(page).toHaveURL(new RegExp(`/product/.*`));
        
        // Assertion pattern 2: toBeVisible
        await expect(errorContainer).toBeVisible();
        
        // Assertion pattern 3: toContainText
        await expect(errorContainer).toContainText(data.expectedOutputs.errorMessage as string);
        return; // Dừng lại vì sản phẩm không tồn tại, không thể nhập số lượng
      }

      // Đảm bảo trang chi tiết sản phẩm load thành công
      await expect(page.locator('[data-testid="product-detail-container"]')).toBeVisible();

      // Điền số lượng
      await page.locator('[data-testid="quantity-input"]').fill(data.inputs.quantity);
      
      // Submit Thêm vào giỏ hàng
      await page.locator('[data-testid="add-to-cart-button"]').click();

      if (data.expectedOutputs.status === 'success') {
        const toastLocator = page.locator('.toast-message');
        
        // Assertion pattern 2: toBeVisible
        await expect(toastLocator).toBeVisible();
        
        // Assertion pattern 3: toContainText
        await expect(toastLocator).toContainText(data.expectedOutputs.toastMessage as string);
      } else if (data.expectedOutputs.status === 'input_error') {
        const inputErrorLocator = page.locator('[data-testid="quantity-error"]');
        
        // Assertion pattern 2: toBeVisible
        await expect(inputErrorLocator).toBeVisible();
        
        // Assertion pattern 3: toContainText
        await expect(inputErrorLocator).toContainText(data.expectedOutputs.errorMessage as string);
      }
    });
  }
});
