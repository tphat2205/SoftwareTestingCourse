import { test, expect } from '@playwright/test';
import orderData from '../test-data/order-state-machine.json';

test.describe('FR-10: Order state machine', () => {
  for (const data of orderData) {
    test(`Test ${data.tc_id}: ${data.description}`, async ({ page }) => {
      // Vì FR-10 liên quan nhiều đến state machine và gọi API (theo mô tả trong report)
      // Playwright UI test sẽ kết hợp mock API trạng thái (setup DB state) và UI thao tác.

      // Mock trạng thái hiện tại của đơn hàng (Pre-condition setup)
      await page.route(`**/api/orders/${data.inputs.orderId}`, async route => {
        if (data.inputs.currentState === 'N/A') {
          await route.fulfill({ status: 404, json: { message: "Đơn hàng không tồn tại" } });
        } else {
          await route.fulfill({ 
            status: 200, 
            json: { id: data.inputs.orderId, status: data.inputs.currentState } 
          });
        }
      });

      if (data.inputs.role === 'user') {
        // User hủy đơn
        await page.goto(`/orders/${data.inputs.orderId}`);
        
        // Kịch bản xử lý lỗi nếu đơn hàng không tồn tại
        if (data.inputs.currentState === 'N/A') {
          const errorMsg = page.locator('.error-message');
          // Assertion pattern 1: toBeVisible
          await expect(errorMsg).toBeVisible();
          // Assertion pattern 2: toContainText
          await expect(errorMsg).toContainText(data.expectedOutputs.message);
          return;
        }

        const cancelButton = page.locator('[data-testid="cancel-order-btn"]');
        // Assertion pattern 3: toHaveURL
        await expect(page).toHaveURL(new RegExp(`/orders/${data.inputs.orderId}`));
        
        // Cố tình hủy đơn hàng khi trạng thái là shipping, delivered, canceled
        if (['shipping', 'delivered', 'canceled'].includes(data.inputs.currentState)) {
           await page.route(`**/api/orders/${data.inputs.orderId}/cancel`, async route => {
             await route.fulfill({ status: 400, json: { message: data.expectedOutputs.message } });
           });
           await cancelButton.click();
           const toastError = page.locator('.toast-error');
           
           await expect(toastError).toBeVisible();
           await expect(toastError).toContainText(data.expectedOutputs.message);
        } else {
           // Thành công
           await page.route(`**/api/orders/${data.inputs.orderId}/cancel`, async route => {
             await route.fulfill({ status: 200, json: { message: data.expectedOutputs.message, status: 'canceled' } });
           });
           await cancelButton.click();
           const toastSuccess = page.locator('.toast-success');
           
           await expect(toastSuccess).toBeVisible();
           await expect(toastSuccess).toContainText(data.expectedOutputs.message);
        }

      } else if (data.inputs.role === 'admin') {
        // Admin cập nhật
        await page.goto(`/admin/orders/${data.inputs.orderId}`);
        
        if (data.inputs.currentState === 'N/A') {
          const errorMsg = page.locator('.error-message');
          await expect(errorMsg).toBeVisible();
          await expect(errorMsg).toContainText(data.expectedOutputs.message);
          return;
        }

        // Assertion pattern 3: toHaveURL
        await expect(page).toHaveURL(new RegExp(`/admin/orders/${data.inputs.orderId}`));

        // Chọn trạng thái mới
        await page.locator('[data-testid="status-select"]').selectOption(data.inputs.newState as string);
        const updateButton = page.locator('[data-testid="update-status-btn"]');
        
        if (data.inputs.newState === 'returned') {
           await page.route(`**/api/admin/orders/${data.inputs.orderId}/status`, async route => {
             await route.fulfill({ status: 400, json: { message: data.expectedOutputs.message } });
           });
           await updateButton.click();
           const toastError = page.locator('.toast-error');
           
           await expect(toastError).toBeVisible();
           await expect(toastError).toContainText(data.expectedOutputs.message);
        } else {
           await page.route(`**/api/admin/orders/${data.inputs.orderId}/status`, async route => {
             await route.fulfill({ status: 200, json: { message: data.expectedOutputs.message } });
           });
           await updateButton.click();
           const toastSuccess = page.locator('.toast-success');
           
           await expect(toastSuccess).toBeVisible();
           await expect(toastSuccess).toContainText(data.expectedOutputs.message);
        }
      }
    });
  }
});
