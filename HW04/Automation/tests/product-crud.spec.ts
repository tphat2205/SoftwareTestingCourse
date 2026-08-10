import { test, expect } from '@playwright/test';
import testData from '../test-data/product-crud.json';

const ADMIN_URL = 'http://localhost:5174';
const ADMIN_EMAIL = 'admin@eshop.com';
const ADMIN_PASSWORD = 'Admin123!';

test.describe('FR-15: Product Management (CRUD) - Admin Panel', () => {
  // Login to admin panel before each test
  test.beforeEach(async ({ page }) => {
    await page.goto(ADMIN_URL);
    await page.waitForTimeout(500);

    // Check if already logged in (sidebar visible)
    const sidebar = page.locator('text=EShop Admin');
    const isLoggedIn = await sidebar.isVisible().catch(() => false);

    if (!isLoggedIn) {
      // Fill admin login form
      await page.locator('input[placeholder="Email"]').fill(ADMIN_EMAIL);
      await page.locator('input[type="password"]').fill(ADMIN_PASSWORD);
      await page.locator('button', { hasText: 'Login' }).click();
      await page.waitForTimeout(1500);
    }

    // Navigate to Products tab
    const productsTab = page.locator('li', { hasText: 'Sản phẩm' });
    await productsTab.click();
    await page.waitForTimeout(500);
  });

  for (const data of testData) {
    test(`${data.tc_id}: ${data.description}`, async ({ page }) => {

      if (data.inputs.action === 'create') {
        // Fill in the product creation form
        const nameInput = page.locator('input[placeholder="Tên sản phẩm"]');
        const priceInput = page.locator('input[placeholder="Giá tiền"]');
        const descInput = page.locator('textarea[placeholder="Mô tả"]');
        const imageInput = page.locator('input[placeholder="URL Ảnh"]');
        const categorySelect = page.locator('form select');
        const submitBtn = page.locator('button', { hasText: 'Lưu sản phẩm' });

        // Assertion pattern 1: toBeVisible — verify form elements are present
        await expect(nameInput).toBeVisible();
        await expect(priceInput).toBeVisible();
        await expect(submitBtn).toBeVisible();

        // Clear existing values and fill new data
        await nameInput.fill(data.inputs.name!);
        await priceInput.fill(data.inputs.price!);
        if (data.inputs.description) {
          await descInput.fill(data.inputs.description);
        }
        if (data.inputs.imageUrl) {
          await imageInput.fill(data.inputs.imageUrl);
        }
        if (data.inputs.categoryIndex !== undefined && data.inputs.categoryIndex !== null) {
          const options = await categorySelect.locator('option').all();
          if (options.length > data.inputs.categoryIndex) {
            const optionValue = await options[data.inputs.categoryIndex].getAttribute('value');
            if (optionValue) {
              await categorySelect.selectOption(optionValue);
            }
          }
        }

        if (data.expectedOutputs.status === 'validation_blocked') {
          // HTML5 required validation will prevent submission
          // Attempt to click submit — form should not submit
          await submitBtn.click();
          await page.waitForTimeout(500);

          // Assertion pattern 2: The form heading should still show "Thêm sản phẩm mới"
          const formTitle = page.locator('h3', { hasText: /Thêm sản phẩm/ });
          await expect(formTitle).toBeVisible();
          return;
        }

        // Click submit
        await submitBtn.click();
        await page.waitForTimeout(1000);

        if (data.expectedOutputs.verifyInTable) {
          // Assertion pattern 2: toBeVisible — verify product appears in the table
          // Reload the products tab to get fresh data
          const productsTab = page.locator('li', { hasText: 'Sản phẩm' });
          await productsTab.click();
          await page.waitForTimeout(500);

          // Assertion pattern 3: toContainText — product table should contain the new product
          const productTable = page.locator('table');
          await expect(productTable).toContainText(data.inputs.name!);
        }
      }

      else if (data.inputs.action === 'update') {
        // Find the product row and click "Sửa" button
        const productRow = page.locator('table tbody tr').filter({ hasText: new RegExp(`#?${data.inputs.productId}`) }).first();

        if (data.expectedOutputs.status === 'validation_blocked') {
          // Click edit on the product
          const editBtn = productRow.locator('button', { hasText: 'Sửa' });
          await editBtn.click();
          await page.waitForTimeout(500);

          // Clear the name field (make it empty)
          const nameInput = page.locator('input[placeholder="Tên sản phẩm"]');
          await nameInput.fill('');

          // Try to submit
          const submitBtn = page.locator('button', { hasText: 'Lưu sản phẩm' });
          await submitBtn.click();
          await page.waitForTimeout(500);

          // Form should stay (validation blocks)
          const formTitle = page.locator('h3', { hasText: /Sửa sản phẩm/ });
          await expect(formTitle).toBeVisible();
          return;
        }

        // Click edit button on the product row
        const editBtn = productRow.locator('button', { hasText: 'Sửa' });
        await editBtn.click();
        await page.waitForTimeout(500);

        // Assertion pattern 1: toBeVisible — form should now show "Sửa sản phẩm"
        const editTitle = page.locator('h3', { hasText: /Sửa sản phẩm/ });
        await expect(editTitle).toBeVisible();

        // Fill updated data
        const nameInput = page.locator('input[placeholder="Tên sản phẩm"]');
        const priceInput = page.locator('input[placeholder="Giá tiền"]');
        await nameInput.fill(data.inputs.name!);
        await priceInput.fill(data.inputs.price!);

        // Handle alert dialog for success
        page.on('dialog', async (dialog) => {
          // Assertion pattern 2: Dialog message check
          expect(dialog.message()).toContain(data.expectedOutputs.alertText!);
          await dialog.accept();
        });

        // Click save
        const submitBtn = page.locator('button', { hasText: 'Lưu sản phẩm' });
        await submitBtn.click();
        await page.waitForTimeout(1000);

        // Assertion pattern 3: toContainText — verify the update in table
        // Note: SUT has a bug where ALL products get the updated name
        const productTable = page.locator('table');
        await expect(productTable).toContainText(data.inputs.name!);
      }

      else if (data.inputs.action === 'delete') {
        // Count products before delete
        const rowsBefore = await page.locator('table tbody tr').count();

        // Find the product row with the product name
        const productRow = page.locator('table tbody tr', { hasText: data.inputs.productName! });

        // Assertion pattern 1: toBeVisible — product should exist before deletion
        await expect(productRow.first()).toBeVisible();

        // Handle confirm dialog for deletion
        page.once('dialog', async (dialog) => {
          await dialog.accept();
        });

        // Click delete button
        const deleteBtn = productRow.first().locator('button', { hasText: 'Xóa' });
        await deleteBtn.click();
        await page.waitForTimeout(1000);

        // Assertion pattern 2: Product count should decrease
        const rowsAfter = await page.locator('table tbody tr').count();
        expect(rowsAfter).toBeLessThan(rowsBefore);

        // Assertion pattern 3: Product name should no longer be in table
        const tableContent = page.locator('table');
        await expect(tableContent).not.toContainText(data.inputs.productName!);
      }

      else if (data.inputs.action === 'verify_list') {
        // Verify the product table is visible and has products
        const productTable = page.locator('table');

        // Assertion pattern 1: toBeVisible
        await expect(productTable).toBeVisible();

        // Assertion pattern 2: Row count check
        const rows = await page.locator('table tbody tr').count();
        expect(rows).toBeGreaterThanOrEqual(data.expectedOutputs.minProductCount!);

        // Assertion pattern 3: Table headers check
        const headers = page.locator('table thead');
        await expect(headers).toContainText('Tên SP');
        await expect(headers).toContainText('Giá');
      }
    });
  }
});
