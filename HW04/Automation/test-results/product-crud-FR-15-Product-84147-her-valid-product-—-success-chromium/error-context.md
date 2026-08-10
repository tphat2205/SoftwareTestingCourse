# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: product-crud.spec.ts >> FR-15: Product Management (CRUD) - Admin Panel >> TC_FR15_10: Delete product: another valid product — success
- Location: tests\product-crud.spec.ts:33:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('table tbody tr').filter({ hasText: 'Tai nghe AirPods Pro 2' }).first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('table tbody tr').filter({ hasText: 'Tai nghe AirPods Pro 2' }).first()

```

```yaml
- heading "EShop Admin" [level=1]
- list:
  - listitem: Dashboard
  - listitem: Danh mục
  - listitem: Sản phẩm
  - listitem: Mã Giảm Giá
  - listitem: Đơn hàng
  - listitem: Người dùng
  - listitem: Đăng xuất
- heading "Quản lý Sản phẩm" [level=2]
- heading "📂 Import sản phẩm từ CSV" [level=3]
- link "Tải file mẫu (template.csv)":
  - /url: data:text/csv;charset=utf-8,…
- button "Choose File"
- button "Import 0 sản phẩm" [disabled]
- heading "Thêm sản phẩm mới" [level=3]
- textbox "Tên sản phẩm"
- spinbutton "Giá tiền"
- textbox "URL Ảnh"
- textbox "Mô tả"
- combobox:
  - option "Điện thoại" [selected]
  - option "Laptop"
  - option "Phụ kiện"
- button "Lưu sản phẩm"
- table:
  - rowgroup:
    - row "Ảnh Tên SP Giá Hành động":
      - columnheader "Ảnh"
      - columnheader "Tên SP"
      - columnheader "Giá"
      - columnheader "Hành động"
  - rowgroup:
    - row "iPhone 15 Pro Max (Updated) iPhone 15 Pro Max (Updated) 32000000 ₫ Sửa Xóa":
      - cell "iPhone 15 Pro Max (Updated)":
        - img "iPhone 15 Pro Max (Updated)"
      - cell "iPhone 15 Pro Max (Updated)"
      - cell "32000000 ₫"
      - cell "Sửa Xóa":
        - button "Sửa"
        - button "Xóa"
    - row "Samsung Galaxy S24 Ultra Samsung Galaxy S24 Ultra 28000000 ₫ Sửa Xóa":
      - cell "Samsung Galaxy S24 Ultra":
        - img "Samsung Galaxy S24 Ultra"
      - cell "Samsung Galaxy S24 Ultra"
      - cell "28000000 ₫"
      - cell "Sửa Xóa":
        - button "Sửa"
        - button "Xóa"
    - row "MacBook Pro M3 MacBook Pro M3 45000000 ₫ Sửa Xóa":
      - cell "MacBook Pro M3":
        - img "MacBook Pro M3"
      - cell "MacBook Pro M3"
      - cell "45000000 ₫"
      - cell "Sửa Xóa":
        - button "Sửa"
        - button "Xóa"
    - row "Sản phẩm Test Auto Sản phẩm Test Auto 150000 ₫ Sửa Xóa":
      - cell "Sản phẩm Test Auto":
        - img "Sản phẩm Test Auto"
      - cell "Sản phẩm Test Auto"
      - cell "150000 ₫"
      - cell "Sửa Xóa":
        - button "Sửa"
        - button "Xóa"
    - row "SP Giá 0 SP Giá 0 0 ₫ Sửa Xóa":
      - cell "SP Giá 0":
        - img "SP Giá 0"
      - cell "SP Giá 0"
      - cell "0 ₫"
      - cell "Sửa Xóa":
        - button "Sửa"
        - button "Xóa"
    - row "SP Giá 1 đồng SP Giá 1 đồng 1 ₫ Sửa Xóa":
      - cell "SP Giá 1 đồng":
        - img "SP Giá 1 đồng"
      - cell "SP Giá 1 đồng"
      - cell "1 ₫"
      - cell "Sửa Xóa":
        - button "Sửa"
        - button "Xóa"
    - row "A A 50000 ₫ Sửa Xóa":
      - cell "A":
        - img "A"
      - cell "A"
      - cell "50000 ₫"
      - cell "Sửa Xóa":
        - button "Sửa"
        - button "Xóa"
    - row "Sản phẩm có tên rất dài để kiểm tra boundary value analysis cho trường tên sản phẩm khi nhập quá nhiều ký tự vào form thêm mới sản phẩm trên trang admin Sản phẩm có tên rất dài để kiểm tra boundary value analysis cho trường tên sản phẩm khi nhập quá nhiều ký tự vào form thêm mới sản phẩm trên trang admin 99000 ₫ Sửa Xóa":
      - cell "Sản phẩm có tên rất dài để kiểm tra boundary value analysis cho trường tên sản phẩm khi nhập quá nhiều ký tự vào form thêm mới sản phẩm trên trang admin":
        - img "Sản phẩm có tên rất dài để kiểm tra boundary value analysis cho trường tên sản phẩm khi nhập quá nhiều ký tự vào form thêm mới sản phẩm trên trang admin"
      - cell "Sản phẩm có tên rất dài để kiểm tra boundary value analysis cho trường tên sản phẩm khi nhập quá nhiều ký tự vào form thêm mới sản phẩm trên trang admin"
      - cell "99000 ₫"
      - cell "Sửa Xóa":
        - button "Sửa"
        - button "Xóa"
    - row "SP Giá Âm SP Giá Âm -5000 ₫ Sửa Xóa":
      - cell "SP Giá Âm":
        - img "SP Giá Âm"
      - cell "SP Giá Âm"
      - cell "-5000 ₫"
      - cell "Sửa Xóa":
        - button "Sửa"
        - button "Xóa"
    - row "Sản phẩm Test Auto Sản phẩm Test Auto 150000 ₫ Sửa Xóa":
      - cell "Sản phẩm Test Auto":
        - img "Sản phẩm Test Auto"
      - cell "Sản phẩm Test Auto"
      - cell "150000 ₫"
      - cell "Sửa Xóa":
        - button "Sửa"
        - button "Xóa"
    - row "SP Giá 0 SP Giá 0 0 ₫ Sửa Xóa":
      - cell "SP Giá 0":
        - img "SP Giá 0"
      - cell "SP Giá 0"
      - cell "0 ₫"
      - cell "Sửa Xóa":
        - button "Sửa"
        - button "Xóa"
    - row "SP Giá 1 đồng SP Giá 1 đồng 1 ₫ Sửa Xóa":
      - cell "SP Giá 1 đồng":
        - img "SP Giá 1 đồng"
      - cell "SP Giá 1 đồng"
      - cell "1 ₫"
      - cell "Sửa Xóa":
        - button "Sửa"
        - button "Xóa"
    - row "A A 50000 ₫ Sửa Xóa":
      - cell "A":
        - img "A"
      - cell "A"
      - cell "50000 ₫"
      - cell "Sửa Xóa":
        - button "Sửa"
        - button "Xóa"
    - row "Sản phẩm có tên rất dài để kiểm tra boundary value analysis cho trường tên sản phẩm khi nhập quá nhiều ký tự vào form thêm mới sản phẩm trên trang admin Sản phẩm có tên rất dài để kiểm tra boundary value analysis cho trường tên sản phẩm khi nhập quá nhiều ký tự vào form thêm mới sản phẩm trên trang admin 99000 ₫ Sửa Xóa":
      - cell "Sản phẩm có tên rất dài để kiểm tra boundary value analysis cho trường tên sản phẩm khi nhập quá nhiều ký tự vào form thêm mới sản phẩm trên trang admin":
        - img "Sản phẩm có tên rất dài để kiểm tra boundary value analysis cho trường tên sản phẩm khi nhập quá nhiều ký tự vào form thêm mới sản phẩm trên trang admin"
      - cell "Sản phẩm có tên rất dài để kiểm tra boundary value analysis cho trường tên sản phẩm khi nhập quá nhiều ký tự vào form thêm mới sản phẩm trên trang admin"
      - cell "99000 ₫"
      - cell "Sửa Xóa":
        - button "Sửa"
        - button "Xóa"
    - row "Sản phẩm Test Auto Sản phẩm Test Auto 150000 ₫ Sửa Xóa":
      - cell "Sản phẩm Test Auto":
        - img "Sản phẩm Test Auto"
      - cell "Sản phẩm Test Auto"
      - cell "150000 ₫"
      - cell "Sửa Xóa":
        - button "Sửa"
        - button "Xóa"
    - row "SP Giá 0 SP Giá 0 0 ₫ Sửa Xóa":
      - cell "SP Giá 0":
        - img "SP Giá 0"
      - cell "SP Giá 0"
      - cell "0 ₫"
      - cell "Sửa Xóa":
        - button "Sửa"
        - button "Xóa"
    - row "SP Giá 1 đồng SP Giá 1 đồng 1 ₫ Sửa Xóa":
      - cell "SP Giá 1 đồng":
        - img "SP Giá 1 đồng"
      - cell "SP Giá 1 đồng"
      - cell "1 ₫"
      - cell "Sửa Xóa":
        - button "Sửa"
        - button "Xóa"
    - row "A A 50000 ₫ Sửa Xóa":
      - cell "A":
        - img "A"
      - cell "A"
      - cell "50000 ₫"
      - cell "Sửa Xóa":
        - button "Sửa"
        - button "Xóa"
    - row "Sản phẩm có tên rất dài để kiểm tra boundary value analysis cho trường tên sản phẩm khi nhập quá nhiều ký tự vào form thêm mới sản phẩm trên trang admin Sản phẩm có tên rất dài để kiểm tra boundary value analysis cho trường tên sản phẩm khi nhập quá nhiều ký tự vào form thêm mới sản phẩm trên trang admin 99000 ₫ Sửa Xóa":
      - cell "Sản phẩm có tên rất dài để kiểm tra boundary value analysis cho trường tên sản phẩm khi nhập quá nhiều ký tự vào form thêm mới sản phẩm trên trang admin":
        - img "Sản phẩm có tên rất dài để kiểm tra boundary value analysis cho trường tên sản phẩm khi nhập quá nhiều ký tự vào form thêm mới sản phẩm trên trang admin"
      - cell "Sản phẩm có tên rất dài để kiểm tra boundary value analysis cho trường tên sản phẩm khi nhập quá nhiều ký tự vào form thêm mới sản phẩm trên trang admin"
      - cell "99000 ₫"
      - cell "Sửa Xóa":
        - button "Sửa"
        - button "Xóa"
```

# Test source

```ts
  63  |               await categorySelect.selectOption(optionValue);
  64  |             }
  65  |           }
  66  |         }
  67  | 
  68  |         if (data.expectedOutputs.status === 'validation_blocked') {
  69  |           // HTML5 required validation will prevent submission
  70  |           // Attempt to click submit — form should not submit
  71  |           await submitBtn.click();
  72  |           await page.waitForTimeout(500);
  73  | 
  74  |           // Assertion pattern 2: The form heading should still show "Thêm sản phẩm mới"
  75  |           const formTitle = page.locator('h3', { hasText: /Thêm sản phẩm/ });
  76  |           await expect(formTitle).toBeVisible();
  77  |           return;
  78  |         }
  79  | 
  80  |         // Click submit
  81  |         await submitBtn.click();
  82  |         await page.waitForTimeout(1000);
  83  | 
  84  |         if (data.expectedOutputs.verifyInTable) {
  85  |           // Assertion pattern 2: toBeVisible — verify product appears in the table
  86  |           // Reload the products tab to get fresh data
  87  |           const productsTab = page.locator('li', { hasText: 'Sản phẩm' });
  88  |           await productsTab.click();
  89  |           await page.waitForTimeout(500);
  90  | 
  91  |           // Assertion pattern 3: toContainText — product table should contain the new product
  92  |           const productTable = page.locator('table');
  93  |           await expect(productTable).toContainText(data.inputs.name!);
  94  |         }
  95  |       }
  96  | 
  97  |       else if (data.inputs.action === 'update') {
  98  |         // Find the product row and click "Sửa" button
  99  |         const productRow = page.locator('table tbody tr').filter({ hasText: new RegExp(`#?${data.inputs.productId}`) }).first();
  100 | 
  101 |         if (data.expectedOutputs.status === 'validation_blocked') {
  102 |           // Click edit on the product
  103 |           const editBtn = productRow.locator('button', { hasText: 'Sửa' });
  104 |           await editBtn.click();
  105 |           await page.waitForTimeout(500);
  106 | 
  107 |           // Clear the name field (make it empty)
  108 |           const nameInput = page.locator('input[placeholder="Tên sản phẩm"]');
  109 |           await nameInput.fill('');
  110 | 
  111 |           // Try to submit
  112 |           const submitBtn = page.locator('button', { hasText: 'Lưu sản phẩm' });
  113 |           await submitBtn.click();
  114 |           await page.waitForTimeout(500);
  115 | 
  116 |           // Form should stay (validation blocks)
  117 |           const formTitle = page.locator('h3', { hasText: /Sửa sản phẩm/ });
  118 |           await expect(formTitle).toBeVisible();
  119 |           return;
  120 |         }
  121 | 
  122 |         // Click edit button on the product row
  123 |         const editBtn = productRow.locator('button', { hasText: 'Sửa' });
  124 |         await editBtn.click();
  125 |         await page.waitForTimeout(500);
  126 | 
  127 |         // Assertion pattern 1: toBeVisible — form should now show "Sửa sản phẩm"
  128 |         const editTitle = page.locator('h3', { hasText: /Sửa sản phẩm/ });
  129 |         await expect(editTitle).toBeVisible();
  130 | 
  131 |         // Fill updated data
  132 |         const nameInput = page.locator('input[placeholder="Tên sản phẩm"]');
  133 |         const priceInput = page.locator('input[placeholder="Giá tiền"]');
  134 |         await nameInput.fill(data.inputs.name!);
  135 |         await priceInput.fill(data.inputs.price!);
  136 | 
  137 |         // Handle alert dialog for success
  138 |         page.on('dialog', async (dialog) => {
  139 |           // Assertion pattern 2: Dialog message check
  140 |           expect(dialog.message()).toContain(data.expectedOutputs.alertText!);
  141 |           await dialog.accept();
  142 |         });
  143 | 
  144 |         // Click save
  145 |         const submitBtn = page.locator('button', { hasText: 'Lưu sản phẩm' });
  146 |         await submitBtn.click();
  147 |         await page.waitForTimeout(1000);
  148 | 
  149 |         // Assertion pattern 3: toContainText — verify the update in table
  150 |         // Note: SUT has a bug where ALL products get the updated name
  151 |         const productTable = page.locator('table');
  152 |         await expect(productTable).toContainText(data.inputs.name!);
  153 |       }
  154 | 
  155 |       else if (data.inputs.action === 'delete') {
  156 |         // Count products before delete
  157 |         const rowsBefore = await page.locator('table tbody tr').count();
  158 | 
  159 |         // Find the product row with the product name
  160 |         const productRow = page.locator('table tbody tr', { hasText: data.inputs.productName! });
  161 | 
  162 |         // Assertion pattern 1: toBeVisible — product should exist before deletion
> 163 |         await expect(productRow.first()).toBeVisible();
      |                                          ^ Error: expect(locator).toBeVisible() failed
  164 | 
  165 |         // Handle confirm dialog for deletion
  166 |         page.once('dialog', async (dialog) => {
  167 |           await dialog.accept();
  168 |         });
  169 | 
  170 |         // Click delete button
  171 |         const deleteBtn = productRow.first().locator('button', { hasText: 'Xóa' });
  172 |         await deleteBtn.click();
  173 |         await page.waitForTimeout(1000);
  174 | 
  175 |         // Assertion pattern 2: Product count should decrease
  176 |         const rowsAfter = await page.locator('table tbody tr').count();
  177 |         expect(rowsAfter).toBeLessThan(rowsBefore);
  178 | 
  179 |         // Assertion pattern 3: Product name should no longer be in table
  180 |         const tableContent = page.locator('table');
  181 |         await expect(tableContent).not.toContainText(data.inputs.productName!);
  182 |       }
  183 | 
  184 |       else if (data.inputs.action === 'verify_list') {
  185 |         // Verify the product table is visible and has products
  186 |         const productTable = page.locator('table');
  187 | 
  188 |         // Assertion pattern 1: toBeVisible
  189 |         await expect(productTable).toBeVisible();
  190 | 
  191 |         // Assertion pattern 2: Row count check
  192 |         const rows = await page.locator('table tbody tr').count();
  193 |         expect(rows).toBeGreaterThanOrEqual(data.expectedOutputs.minProductCount!);
  194 | 
  195 |         // Assertion pattern 3: Table headers check
  196 |         const headers = page.locator('table thead');
  197 |         await expect(headers).toContainText('Tên SP');
  198 |         await expect(headers).toContainText('Giá');
  199 |       }
  200 |     });
  201 |   }
  202 | });
  203 | 
```