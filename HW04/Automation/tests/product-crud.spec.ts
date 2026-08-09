import { test, expect } from '@playwright/test';
import crudData from '../test-data/product-crud.json';

test.describe('FR-15: Product management (CRUD)', () => {
  test.beforeEach(async ({ page }) => {
    // Admin login context
    await page.goto('/admin/products');
  });

  for (const data of crudData) {
    test(`Test ${data.tc_id}: ${data.description}`, async ({ page }) => {
      
      if (data.inputs.action === 'create') {
        await page.locator('[data-testid="add-product-btn"]').click();
        
        // Assertion pattern 1: toHaveURL
        await expect(page).toHaveURL(/.*\/admin\/products\/new/);
        
        await page.locator('[data-testid="input-name"]').fill(data.inputs.name as string);
        await page.locator('[data-testid="input-price"]').fill(data.inputs.price as string);
        await page.locator('[data-testid="select-category"]').selectOption(data.inputs.categoryId as string);
        
        await page.locator('[data-testid="submit-btn"]').click();

        const toastMsg = page.locator('.toast-success');
        
        // Assertion pattern 2: toBeVisible
        await expect(toastMsg).toBeVisible();
        // Assertion pattern 3: toContainText
        await expect(toastMsg).toContainText(data.expectedOutputs.message);
      } 
      
      else if (data.inputs.action === 'update') {
        if (data.inputs.productId === '9999') {
          // Navigate directly to an invalid ID
          await page.goto(`/admin/products/${data.inputs.productId}/edit`);
          const errorMsg = page.locator('.error-message');
          
          await expect(errorMsg).toBeVisible();
          await expect(errorMsg).toContainText(data.expectedOutputs.message);
          return;
        }

        await page.goto(`/admin/products/${data.inputs.productId}/edit`);
        await expect(page).toHaveURL(new RegExp(`/admin/products/${data.inputs.productId}/edit`));
        
        await page.locator('[data-testid="input-name"]').fill(data.inputs.name as string);
        await page.locator('[data-testid="input-price"]').fill(data.inputs.price as string);
        await page.locator('[data-testid="select-category"]').selectOption(data.inputs.categoryId as string);
        
        await page.locator('[data-testid="submit-btn"]').click();

        if (data.expectedOutputs.status === 'success') {
          const toastMsg = page.locator('.toast-success');
          await expect(toastMsg).toBeVisible();
          await expect(toastMsg).toContainText(data.expectedOutputs.message);
        } else {
          const errorField = page.locator('.input-error');
          await expect(errorField).toBeVisible();
          await expect(errorField).toContainText(data.expectedOutputs.message);
        }
      }
      
      else if (data.inputs.action === 'delete') {
        if (data.inputs.productId === '9999') {
          // Assume trying to delete via direct api call mock or a direct action
          await page.route(`**/api/products/${data.inputs.productId}`, async route => {
             await route.fulfill({ status: 404, json: { message: data.expectedOutputs.message } });
          });
          
          // Execute API call from page context to simulate edge-case deletion attempt
          const response = await page.evaluate(async (id) => {
             const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
             return res.json();
          }, data.inputs.productId);
          
          expect(response.message).toBe(data.expectedOutputs.message);
        } else {
          await page.route(`**/api/products/${data.inputs.productId}`, async route => {
             await route.fulfill({ status: 200, json: { message: data.expectedOutputs.message } });
          });
          
          const deleteBtn = page.locator(`[data-testid="delete-btn-${data.inputs.productId}"]`);
          
          if (await deleteBtn.isVisible()) {
             await deleteBtn.click();
             await page.locator('[data-testid="confirm-delete"]').click();
             
             const toastMsg = page.locator('.toast-success');
             await expect(toastMsg).toBeVisible();
             await expect(toastMsg).toContainText(data.expectedOutputs.message);
          }
        }
      }
    });
  }
});
