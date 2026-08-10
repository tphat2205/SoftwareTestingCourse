# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: product-detail.spec.ts >> FR-06: Xem chi tiết sản phẩm (Product Detail View) >> TC_FR06_10: XSS attempt in product ID — should show error or not found
- Location: tests\product-detail.spec.ts:8:9

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('body')
Timeout: 10000ms
- Expected substring  - 1
+ Received string     + 6

- Sản phẩm không tồn tại
+
+     EShopGiỏ hàngĐăng nhậpĐăng ký© 2026 EShop SUT. Dành cho mục đích kiểm thử.
+     
+   
+
+

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for locator('body')
    23 × locator resolved to <body>…</body>
       - unexpected value "
    EShopGiỏ hàngĐăng nhậpĐăng ký© 2026 EShop SUT. Dành cho mục đích kiểm thử.
    
  

"

```

```yaml
- banner:
  - link "EShop":
    - /url: /
  - navigation:
    - link "Giỏ hàng":
      - /url: /cart
    - link "Đăng nhập":
      - /url: /login
    - link "Đăng ký":
      - /url: /register
- main
- contentinfo: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import testData from '../test-data/product-detail.json';
  3  | 
  4  | const ADMIN_BASE = 'http://localhost:5174';
  5  | 
  6  | test.describe('FR-06: Xem chi tiết sản phẩm (Product Detail View)', () => {
  7  |   for (const data of testData) {
  8  |     test(`${data.tc_id}: ${data.description}`, async ({ page }) => {
  9  |       // Navigate to product detail page
  10 |       await page.goto(`/product/${data.inputs.productId}`);
  11 | 
  12 |       if (!data.expectedOutputs.productExists) {
  13 |         // Product does not exist — SUT shows "Đang tải..." then error text
  14 |         // Wait for content to load (API call resolves)
  15 |         await page.waitForTimeout(2000);
  16 | 
  17 |         // Assertion pattern 1: toContainText — check error message on page
  18 |         const body = page.locator('body');
> 19 |         await expect(body).toContainText(data.expectedOutputs.errorText!);
     |                            ^ Error: expect(locator).toContainText(expected) failed
  20 | 
  21 |         // Assertion pattern 2: toHaveURL — verify URL pattern is still /product/...
  22 |         await expect(page).toHaveURL(new RegExp('/product/'));
  23 |         return;
  24 |       }
  25 | 
  26 |       // Product exists — wait for product detail to load
  27 |       // Assertion pattern 1: toBeVisible — product name heading should appear
  28 |       const productName = page.locator('h1');
  29 |       await expect(productName).toBeVisible({ timeout: 10000 });
  30 | 
  31 |       // If we expect a specific product name, verify it
  32 |       if (data.expectedOutputs.expectedName) {
  33 |         // Assertion pattern 2: toHaveText — verify exact product name
  34 |         await expect(productName).toHaveText(data.expectedOutputs.expectedName);
  35 |       }
  36 | 
  37 |       // If we expect a specific price, verify it
  38 |       if (data.expectedOutputs.expectedPrice) {
  39 |         const priceText = page.locator('.text-red-600');
  40 |         await expect(priceText).toContainText(data.expectedOutputs.expectedPrice);
  41 |       }
  42 | 
  43 |       // Fill quantity using the number input
  44 |       const quantityInput = page.locator('input[type="number"]');
  45 |       await expect(quantityInput).toBeVisible();
  46 |       await quantityInput.fill(data.inputs.quantity);
  47 | 
  48 |       // Get the add-to-cart button
  49 |       const addToCartBtn = page.locator('button', { hasText: 'Thêm vào giỏ hàng' });
  50 |       await expect(addToCartBtn).toBeVisible();
  51 | 
  52 |       if (data.inputs.singleClickOnly) {
  53 |         // TEST BUG: Click only once — button should NOT change to "Đã thêm"
  54 |         await addToCartBtn.click();
  55 |         await page.waitForTimeout(500);
  56 | 
  57 |         // Assertion pattern 3: toHaveText — button still shows original text after single click
  58 |         // This documents the SUT bug where first click is ignored
  59 |         await expect(addToCartBtn).toHaveText(data.expectedOutputs.buttonText!);
  60 |         return;
  61 |       }
  62 | 
  63 |       // Normal flow: Click TWICE (SUT bug requires double click)
  64 |       // First click: sets clickCount=1, does nothing
  65 |       await addToCartBtn.click();
  66 |       await page.waitForTimeout(300);
  67 | 
  68 |       // Second click: actually adds to cart
  69 |       // After first click, button text is still "Thêm vào giỏ hàng"
  70 |       const addToCartBtn2 = page.locator('button', { hasText: 'Thêm vào giỏ hàng' });
  71 |       await addToCartBtn2.click();
  72 | 
  73 |       // Wait for state update
  74 |       await page.waitForTimeout(500);
  75 | 
  76 |       // Assertion pattern 3: toHaveText — button text changes to "Đã thêm"
  77 |       const successBtn = page.locator('button.bg-green-600');
  78 |       await expect(successBtn).toHaveText(data.expectedOutputs.buttonText!);
  79 |     });
  80 |   }
  81 | });
  82 | 
```