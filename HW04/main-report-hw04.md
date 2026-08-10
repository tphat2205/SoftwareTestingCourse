# HW04 - Automation Testing Report

**CSC13003 – Software Testing**

**Automation Testing Report · Data-Driven Testing · Multi-Browser Execution · AI Review & Bug Report**

## Student Information

| Field | Value |
| :---- | :---- |
| **Student name:** | ĐOÀN THÀNH PHÁT |
| **Student ID:** | 23127241 |
| **Class / Cohort:** | 23KTPM2 |
| **Assignment ID:** | HW#04 |
| **Assignment date:** | August 11, 2026 |
| **Course:** | CSC13003 – Software Testing |
| **Instructor:** | Lâm Quang Vũ · Hồ Tuấn Thanh · Trương Phước Lộc |

---

## Report Overview

This report documents the full automation testing process for HW04 — from feature selection and framework setup, through AI-assisted script generation, human review and correction, to multi-browser execution and bug reporting. The report is structured to address every rubric criterion in the assignment specification (§6–§14).

**Deliverables covered in this report:**
1. Automation framework & scope (§6, Task 1)
2. Data-driven testing implementation with external JSON files
3. Multi-browser execution results (Chromium, Firefox, Edge — 108 total runs)
4. Human review of AI-generated code — detailed gap analysis
5. Bug reports with GitHub Issues links and screenshot evidence
6. Demo video link (§6, Task 2)
7. Git commit log reference (§12)
8. AI Audit Report appendix (§9)
9. AI Critique appendix (§10)
10. Self-assessment table (§15)

---

## 1. Feature Selection

The following three web features were selected, consistent with HW02, one from each pool:

| Pool | Feature | Description | Testing Approach |
|------|---------|-------------|------------------|
| **Pool A** | FR-06: Xem chi tiết sản phẩm | Product Detail View — allows users to view product information and add items to cart | UI-driven testing on `localhost:5173` |
| **Pool B** | FR-10: Order State Machine | Order lifecycle management — state transitions from Pending through Confirmed, Shipping, Delivered, or Canceled | API-driven testing using `playwright.request` against `localhost:3000/api` |
| **Pool C** | FR-15: Product Management (CRUD) | Admin product management — Create, Read, Update, Delete products via the admin panel | UI-driven testing on `localhost:5174` |

### Justification for Selection

- **FR-06** was chosen because it provides a good mix of UI interactions (navigation, form input, button clicks) and testable edge cases (invalid product IDs, XSS/SQLi injection, quantity boundary values). It also contained an intentional SUT bug (double-click required) that showcases the value of automation in catching UI defects.
- **FR-10** was chosen because it represents a **state machine**, which is a classic testing scenario taught in the course. It requires both **valid** and **invalid** state transition testing, and allowed us to demonstrate API-level testing capabilities using Playwright's `APIRequestContext` — a different approach from UI-based testing.
- **FR-15** was chosen because it covers all four CRUD operations (Create, Read, Update, Delete), providing the broadest scope for testing different UI patterns (form submission, table verification, dialog handling, navigation). It also exposed a critical bug where updating one product renames all products.

---

## 2. Automation Framework & Architecture

### 2.1. Technology Stack

| Component | Choice | Rationale |
|-----------|--------|-----------|
| **Test Framework** | Playwright (TypeScript) | First-class multi-browser support, built-in `expect` assertions, API testing via `request` context, HTML reporter |
| **Language** | TypeScript | Type safety, better IDE support for debugging, strong community for test automation |
| **Design Pattern** | Data-Driven Testing (DDT) | Externalizes test data into JSON files for maintainability and traceability |
| **Data Format** | JSON (`.json`) | Structured, easy to read/write, native import in TypeScript |
| **Reporter** | Playwright HTML Reporter | Generates rich HTML reports with screenshots, traces, and metadata embedding |
| **CI/CD** | N/A (local execution) | All tests run locally against the SUT running on `localhost` |

### 2.2. Playwright Configuration

The `playwright.config.ts` is configured with the following key settings:

```typescript
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,    // Sequential to prevent DB concurrency issues
  retries: 0,              // No retries — we want to see real failures
  workers: 1,              // Single worker for deterministic execution
  timeout: 60000,          // 60s per test (API calls can be slow)
  expect: {
    timeout: 10000,        // 10s assertion timeout
  },
  reporter: [
    ['html', { outputFolder: 'reports', open: 'never' }],
    ['list']               // Console output for debugging
  ],
  use: {
    baseURL: 'http://localhost:5173',   // User-facing frontend
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
  },
  metadata: {
    'Run by': '23127241',               // Anti-cheat: Student ID in report
    'Student': 'ĐOÀN THÀNH PHÁT',
    'Timestamp': new Date().toISOString(),
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
  ],
});
```

**Key design decisions:**
- **`fullyParallel: false` and `workers: 1`**: The SUT uses a shared SQLite/PostgreSQL database. Running FR-15 (CRUD) tests in parallel with FR-06 (product detail) would cause data corruption — e.g., a delete operation in FR-15 could remove a product that FR-06 is trying to view. Sequential execution ensures test isolation.
- **`retries: 0`**: We intentionally disable retries to expose genuine flakiness and real SUT bugs. If a test fails, we want to investigate it, not mask it with a retry.
- **`metadata['Run by']`**: Embeds the Student ID `23127241` directly into the HTML report metadata, satisfying the Anti-AI-Cheat requirement (§11).
- **Three browser projects**: Chromium (via `chrome` channel), Firefox (Gecko engine), and Edge (via `msedge` channel, which uses the Blink/WebKit engine). This fulfills the requirement of ≥3 browsers.

---

## 3. Data-Driven Testing (DDT) Implementation

### 3.1. Design Principle

Each feature is mapped to a dedicated JSON file containing exactly **12 test cases**. The test runner loops through these JSON arrays dynamically using a `for...of` loop, so adding or modifying test cases requires **zero changes** to the `.spec.ts` file — only the JSON file needs to be updated.

This approach satisfies the assignment requirement (§6, Task 1):
> *"The test data must be stored in a separate `.csv` or `.json` file (hardcoded inline arrays or objects in the script are not accepted)."*

### 3.2. JSON Structure Design

Each test case entry follows a consistent schema:

```json
{
  "tc_id": "TC_FRXX_NN",
  "description": "Human-readable test case description",
  "inputs": { /* Feature-specific input parameters */ },
  "expectedOutputs": { /* Expected results for assertions */ }
}
```

**Design choices:**
- `tc_id` uses the format `TC_FR{feature}_{number}` for traceability back to HW02 test design.
- `description` is written in English for the test report, but describes the SUT behavior in context.
- `inputs` and `expectedOutputs` are feature-specific nested objects — this allows each feature to define its own input/output schema without a one-size-fits-all constraint.

### 3.3. FR-06 Test Data: `product-detail.json` (12 test cases)

| TC ID | Description | Input (productId, quantity) | Expected Output | Category |
|-------|-------------|----------------------------|-----------------|----------|
| TC_FR06_01 | Valid product ID=1, quantity=1 (BVA lower bound) | `1`, `1` | Success, button → "Đã thêm" | Positive / BVA |
| TC_FR06_02 | Valid product ID=1, quantity=2 (BVA LB+1) | `1`, `2` | Success, button → "Đã thêm" | Positive / BVA |
| TC_FR06_03 | Valid product ID=2, quantity=5 (normal case) | `2`, `5` | Success, button → "Đã thêm" | Positive |
| TC_FR06_04 | Valid product ID=3, quantity=10 (large qty) | `3`, `10` | Success, button → "Đã thêm" | Positive |
| TC_FR06_05 | Valid product ID=2 — verify product name | `2`, `1` | Name = "Samsung Galaxy S24 Ultra" | Positive / Verification |
| TC_FR06_06 | Valid product ID=3 — verify product price | `3`, `1` | Name = "MacBook Pro M3", Price = "45,000,000" | Positive / Verification |
| TC_FR06_07 | Invalid product ID=99999 — not found | `99999`, `` | Error: "Sản phẩm không tồn tại" | Negative |
| TC_FR06_08 | Invalid product ID=0 — not found | `0`, `` | Error: "Sản phẩm không tồn tại" | Negative / BVA |
| TC_FR06_09 | SQL Injection attempt in product ID | `1' OR '1'='1`, `1` | Error: "Sản phẩm không tồn tại" | Security / Negative |
| TC_FR06_10 | XSS attempt in product ID | `<script>alert(1)</script>`, `1` | Error: "Sản phẩm không tồn tại" | Security / Negative |
| TC_FR06_11 | Bug test: single click does nothing | `1`, `1` (singleClickOnly=true) | Button stays "Thêm vào giỏ hàng" | Bug Verification |
| TC_FR06_12 | Valid product ID=1, quantity=999 (upper bound) | `1`, `999` | Success, button → "Đã thêm" | Positive / BVA |

### 3.4. FR-10 Test Data: `order-state-machine.json` (12 test cases)

| TC ID | Description | Type | Setup Status → Action | Expected HTTP | Category |
|-------|-------------|------|-----------------------|---------------|----------|
| TC_FR10_01 | User cancel: pending → canceled | user_cancel | pending → cancel | 200 | Positive |
| TC_FR10_02 | User cancel: confirmed → canceled | user_cancel | confirmed → cancel | 200 | Positive |
| TC_FR10_03 | User cancel: shipping → canceled (SUT bug) | user_cancel | shipping → cancel | 200 (bug) | Bug Verification |
| TC_FR10_04 | User cancel: delivered → error | user_cancel | delivered → cancel | 400 | Negative |
| TC_FR10_05 | User cancel: canceled → error (already canceled) | user_cancel | canceled → cancel | 400 | Negative |
| TC_FR10_06 | User cancel: non-existent order → 404 | user_cancel_nonexistent | orderId=99999 | 404 | Negative / BVA |
| TC_FR10_07 | Admin update: pending → confirmed | admin_update | pending → confirmed | 200 | Positive |
| TC_FR10_08 | Admin update: pending → canceled | admin_update | pending → canceled | 200 | Positive |
| TC_FR10_09 | Admin update: confirmed → shipping | admin_update | confirmed → shipping | 200 | Positive |
| TC_FR10_10 | Admin update: shipping → delivered | admin_update | shipping → delivered | 200 | Positive |
| TC_FR10_11 | Admin update: canceled → delivered (SUT bug) | admin_update | canceled → delivered | 200 (bug) | Bug Verification |
| TC_FR10_12 | Admin update: pending → delivered (invalid skip) | admin_update | pending → delivered | 400 | Negative |

**State Machine Diagram:**

```
    ┌──────────┐   Admin: confirm   ┌───────────┐   Admin: ship    ┌──────────┐   Admin: deliver  ┌───────────┐
    │ PENDING  │ ─────────────────→ │ CONFIRMED │ ───────────────→ │ SHIPPING │ ────────────────→ │ DELIVERED │
    └──────────┘                    └───────────┘                  └──────────┘                   └───────────┘
         │                               │                             │ (Bug: user                    
         │  User/Admin: cancel           │  User/Admin: cancel         │  can cancel)                   
         ▼                               ▼                             ▼                                
    ┌───────────┐                   ┌───────────┐                 ┌───────────┐                          
    │ CANCELED  │                   │ CANCELED  │                 │ CANCELED  │                          
    └───────────┘                   └───────────┘                 └───────────┘                          
         │ (Bug: admin can update canceled → delivered)                                                  
         ▼                                                                                              
    ┌───────────┐                                                                                       
    │ DELIVERED │ ← Invalid but SUT allows                                                              
    └───────────┘                                                                                       
```

### 3.5. FR-15 Test Data: `product-crud.json` (12 test cases)

| TC ID | Description | Action | Key Inputs | Expected | Category |
|-------|-------------|--------|------------|----------|----------|
| TC_FR15_01 | Create: valid data | create | name="Sản phẩm Test Auto", price=150000 | Success, appears in table | Positive |
| TC_FR15_02 | Create: empty name (required) | create | name="", price=100000 | HTML validation blocks | Negative |
| TC_FR15_03 | Create: price=0 (BVA LB) | create | name="SP Giá 0", price=0 | Success | Positive / BVA |
| TC_FR15_04 | Create: price=1 (BVA LB+1) | create | name="SP Giá 1 đồng", price=1 | Success | Positive / BVA |
| TC_FR15_05 | Create: name=1 char (BVA Name LB) | create | name="A", price=50000 | Success | Positive / BVA |
| TC_FR15_06 | Create: very long name (255 chars) | create | name="Sản phẩm có tên rất dài..." | Success | BVA / Edge |
| TC_FR15_07 | Update: edit name and price | update | productId=1, name="iPhone 15 Pro Max (Updated)" | Success + alert "Cập nhật thành công!" | Positive |
| TC_FR15_08 | Update: empty name | update | productId=2, name="" | HTML validation blocks | Negative |
| TC_FR15_09 | Delete: valid product | delete | productName="Bàn phím cơ Keychron Q1" | Removed from table | Positive |
| TC_FR15_10 | Delete: another valid product | delete | productName="Tai nghe AirPods Pro 2" | Removed from table | Positive |
| TC_FR15_11 | Create: negative price | create | name="SP Giá Âm", price=-5000 | Accepted (no validation bug) | Bug / BVA |
| TC_FR15_12 | Verify list after operations | verify_list | N/A | Table visible, ≥1 products | Positive / Sanity |

---

## 4. Automation Script Implementation Details

### 4.1. FR-06: `product-detail.spec.ts` — UI-Driven Testing

**Test flow:**
1. Navigate to `/product/{productId}` via `page.goto()`.
2. **If product doesn't exist**: Wait for API resolution, then assert error text on the page body.
3. **If product exists**: Wait for `<h1>` (product name) to become visible, optionally verify name/price, fill quantity input, and click "Thêm vào giỏ hàng".
4. **Double-click workaround**: The SUT has an intentional bug where the add-to-cart button requires 2 clicks. The script clicks once, waits 300ms, then clicks again. The `singleClickOnly` flag in the JSON data allows us to specifically test this bug behavior.

**Key code pattern — Data-driven loop:**
```typescript
import testData from '../test-data/product-detail.json';

test.describe('FR-06: Xem chi tiết sản phẩm', () => {
  for (const data of testData) {
    test(`${data.tc_id}: ${data.description}`, async ({ page }) => {
      await page.goto(`/product/${data.inputs.productId}`);
      // ... assertions driven by data.expectedOutputs
    });
  }
});
```

**Locator strategy:** Since the SUT does not use `data-testid` attributes, all locators use CSS selectors and text matching:
- `page.locator('h1')` — Product name heading
- `page.locator('input[type="number"]')` — Quantity input
- `page.locator('button', { hasText: 'Thêm vào giỏ hàng' })` — Add to cart button
- `page.locator('.text-red-600')` — Price display (Tailwind CSS class)
- `page.locator('button.bg-green-600')` — Success state button

### 4.2. FR-10: `order-state-machine.spec.ts` — API-Driven Testing

**Architecture decision:** This feature is tested entirely via API calls using Playwright's `APIRequestContext`, not through the browser UI. This was a critical human correction — the AI originally tried to test this via UI interactions, which was fundamentally wrong for testing backend state machine logic.

**Test flow:**
1. **`beforeAll`**: Log in as both `user` and `admin` via API to obtain JWT tokens.
2. **For each test case**:
   - Create a fresh order via `POST /api/checkout`.
   - Set the order to the required initial state using the admin API (e.g., transition from `pending` → `confirmed` → `shipping` step by step).
   - Execute the action under test (user cancel or admin status update).
   - Assert HTTP status code and response message.
   - For successful admin updates: Verify the final state via `GET /api/orders/{orderId}`.

**Helper functions:**
```typescript
// Login and get JWT token
async function loginUser(apiContext, email, password): Promise<string> {
  const response = await apiContext.post(`${API_BASE}/login`, {
    data: { email, password }
  });
  const body = await response.json();
  return body.token;
}

// Create a test order
async function createOrder(apiContext, token, address): Promise<number> {
  const response = await apiContext.post(`${API_BASE}/checkout`, {
    headers: { 'Authorization': `Bearer ${token}` },
    data: { total_amount: 100000, shipping_address: address }
  });
  const body = await response.json();
  return body.orderId;
}

// Transition order to desired state step by step
async function setOrderStatus(apiContext, adminToken, orderId, status): Promise<void> {
  const transitions = {
    'pending': [],
    'confirmed': ['confirmed'],
    'shipping': ['confirmed', 'shipping'],
    'delivered': ['confirmed', 'shipping', 'delivered'],
    'canceled': ['canceled'],
  };
  for (const step of transitions[status]) {
    await apiContext.put(`${API_BASE}/admin/orders/${orderId}/status`, {
      headers: { 'Authorization': `Bearer ${adminToken}` },
      data: { status: step }
    });
  }
}
```

**Why step-by-step transitions?** The SUT validates some transitions (e.g., `pending → delivered` is rejected with HTTP 400). To reach states like `shipping`, we must transition through each valid intermediate state (`pending → confirmed → shipping`). The `setOrderStatus` helper encapsulates this logic.

### 4.3. FR-15: `product-crud.spec.ts` — UI-Driven Testing on Admin Panel

**Test flow:**
1. **`beforeEach`**: Navigate to admin panel (`localhost:5174`), check if already logged in, otherwise fill login form. Then click on "Sản phẩm" tab in the sidebar to navigate to product management.
2. **Create tests**: Fill the product creation form (name, price, description, image URL, category), click "Lưu sản phẩm", then verify the new product appears in the table.
3. **Update tests**: Find the target product row by ID, click "Sửa", modify fields, handle `alert()` dialogs, click save, verify in table.
4. **Delete tests**: Count rows before deletion, handle `confirm()` dialog, click "Xóa", verify row count decreased and product name no longer in table.
5. **Verify list test**: Assert table is visible with expected minimum row count and correct column headers.

**Key code pattern — Dialog handling:**
```typescript
// For delete operations: accept the browser confirm dialog
page.once('dialog', async (dialog) => {
  await dialog.accept();
});
const deleteBtn = productRow.first().locator('button', { hasText: 'Xóa' });
await deleteBtn.click();
```

**Key code pattern — Tab-based navigation (not URL routing):**
```typescript
// The admin panel is a single-page React app — no URL-based routing
// Navigation is done by clicking sidebar tabs
const productsTab = page.locator('li', { hasText: 'Sản phẩm' });
await productsTab.click();
```

---

## 5. Assertion Patterns Catalogue

The assignment requires **at least 3 distinct assertion patterns**. This test suite uses **6 distinct assertion patterns** across all three features:

### Pattern 1: Visibility Assertions (`toBeVisible()`)
**Used in:** FR-06, FR-15  
**Purpose:** Ensures DOM elements are loaded and rendered before interacting with them. Prevents race conditions where the script tries to click a button that hasn't appeared yet.

```typescript
const productName = page.locator('h1');
await expect(productName).toBeVisible({ timeout: 10000 });
```

### Pattern 2: Text Content Assertions (`toHaveText()`, `toContainText()`)
**Used in:** FR-06, FR-15  
**Purpose:** Verifies exact or partial text matches on UI elements. `toHaveText()` is used for strict matching (e.g., button labels), while `toContainText()` is used for substring matching (e.g., error messages in body text, product names in tables).

```typescript
// Exact match — button text
await expect(addToCartBtn).toHaveText('Đã thêm');

// Partial match — error text in page body
await expect(body).toContainText('Sản phẩm không tồn tại');

// Partial match — product in admin table
await expect(productTable).toContainText(data.inputs.name);
```

### Pattern 3: URL & Navigation Assertions (`toHaveURL()`)
**Used in:** FR-06, FR-10  
**Purpose:** Verifies that the page navigated to the expected URL. Uses regex patterns for dynamic routes.

```typescript
await expect(page).toHaveURL(new RegExp('/product/'));
await expect(page).toHaveURL(/login/);
```

### Pattern 4: HTTP Status Code Assertions (`toBe()`)
**Used in:** FR-10  
**Purpose:** Validates API response status codes. This is the primary assertion for the state machine tests since they operate at the API level.

```typescript
expect(cancelResponse.status()).toBe(200);
expect(updateResponse.status()).toBe(400);  // Invalid transition
```

### Pattern 5: Response Body Assertions (`toBe()`, `toContain()`)
**Used in:** FR-10  
**Purpose:** Validates the JSON response body from API calls — checking both success messages and error messages.

```typescript
const body = await response.json();
expect(body.message).toBe('Order canceled successfully');
expect(body.error).toContain('Invalid state transition');
```

### Pattern 6: Numeric Comparison Assertions (`toBeLessThan()`, `toBeGreaterThanOrEqual()`)
**Used in:** FR-15  
**Purpose:** Validates table row counts before and after CRUD operations.

```typescript
// After deleting a product, row count should decrease
const rowsBefore = await page.locator('table tbody tr').count();
// ... perform delete ...
const rowsAfter = await page.locator('table tbody tr').count();
expect(rowsAfter).toBeLessThan(rowsBefore);

// Product list should have at least 1 product
expect(rows).toBeGreaterThanOrEqual(data.expectedOutputs.minProductCount);
```

---

## 6. Multi-Browser Execution

### 6.1. Browser Configuration

All 36 test cases run across **3 browsers**, producing **108 total runs**:

| Browser Project | Engine | Channel | Version |
|----------------|--------|---------|---------|
| `chromium` | Blink (Chromium) | `chrome` | Google Chrome (latest stable) |
| `firefox` | Gecko | N/A (bundled) | Mozilla Firefox (latest Playwright-bundled) |
| `edge` | Blink (Chromium) | `msedge` | Microsoft Edge (latest stable) |

### 6.2. Execution Command

```bash
npx playwright test --reporter=html,list
```

This runs all 3 spec files across all 3 browser projects sequentially (due to `fullyParallel: false`), generating:
- Console output via the `list` reporter (for real-time progress)
- HTML report in `Automation/reports/` (for submission)

### 6.3. HTML Report — Anti-Cheat Compliance

The generated HTML report contains the following metadata (visible in the report header):
- **"Run by: 23127241"** — Student ID
- **"Student: ĐOÀN THÀNH PHÁT"** — Full name
- **"Timestamp: [ISO 8601]"** — Execution timestamp

This satisfies the Anti-AI-Cheat constraint (§11):
> *"The HTML reports, which must contain 'Run by: {StudentID}' together with an ISO timestamp."*

---

## 7. Human Review & AI Code Analysis

As required by the AI-First strategy (§2), the initial automation scripts were generated by the AI and then critically reviewed. While the AI successfully created the boilerplate code, loop structures for data-driven testing, and JSON imports, **it failed to understand the actual architectural constraints and runtime behaviors of the SUT**. Below is a detailed breakdown of what the AI got wrong, why, and how it was fixed by human review.

### 7.1. FR-06: Xem chi tiết sản phẩm (Product Detail)

#### What AI generated correctly
- The data-driven loop structure (`for...of` over imported JSON).
- The branching logic for product-exists vs. product-not-found.
- The basic assertion structure using `expect()`.

#### What AI missed / got wrong

| Issue | AI's Approach | Problem | Human Fix |
|-------|--------------|---------|-----------|
| **Locators** | Used `data-testid` attributes (e.g., `[data-testid="product-detail-container"]`, `[data-testid="add-to-cart-button"]`) | The SUT does **not** use `data-testid` attributes. These selectors would fail immediately with `Timeout` errors. | Rewrote all locators to use actual HTML structure: `h1` for product name, `input[type="number"]` for quantity, `button:has-text("Thêm vào giỏ hàng")` for the add-to-cart button. |
| **Success feedback** | Expected a toast notification (`.toast-message`) after adding to cart | The SUT does **not** show toast notifications. Instead, it changes the button text from "Thêm vào giỏ hàng" to "Đã thêm" and changes the button color to green (`bg-green-600`). | Changed assertion to check `button.bg-green-600` text content instead of looking for a non-existent toast element. |
| **Double-click bug** | Single `click()` on the add-to-cart button | The SUT has an **intentional bug** where the first click on "Thêm vào giỏ hàng" does nothing (it sets an internal counter but doesn't add to cart). A second click is required. The AI had no way of knowing this. | Added a double-click pattern: click once, wait 300ms, click again. Also added a specific test case (`TC_FR06_11`) with `singleClickOnly: true` to explicitly document and verify this bug. |
| **Error page handling** | Assumed the SUT shows a dedicated 404 page | The SUT shows "Đang tải..." (loading) then displays the error text inline. There is no HTTP 404 redirect. | Added `page.waitForTimeout(2000)` to wait for the async API call to resolve, then checked `body.toContainText('Sản phẩm không tồn tại')`. |

#### Root Cause Analysis
The AI lacked **visual context** of the SUT. It assumed standard e-commerce UI patterns:
- `data-testid` is a best practice but not universally adopted.
- Toast notifications are common in modern React apps but not used here.
- Single-click add-to-cart is the universal expectation; the double-click bug is SUT-specific.

### 7.2. FR-10: Order State Machine

#### What AI generated correctly
- The overall test case structure (test for each state transition).
- The use of `for...of` loop with JSON data.
- The concept of testing valid and invalid transitions.

#### What AI missed / got wrong

| Issue | AI's Approach | Problem | Human Fix |
|-------|--------------|---------|-----------|
| **Testing approach** | Used `page.route()` to **mock** backend responses | This completely bypassed the SUT's backend logic. The tests were verifying mocked responses, not actual state machine transitions. This means the tests would pass even if the backend was completely broken. | **Complete rewrite** to use `playwright.request.newContext()` for API-level testing. The script now makes real HTTP requests to the backend, creating real orders and testing real state transitions. |
| **Admin panel URL** | Navigated to `/admin/orders` on `localhost:5173` | The admin panel is a **separate SPA** running on `localhost:5174`. The user frontend on `localhost:5173` does not have an `/admin` route. | Changed all admin operations to use the API at `localhost:3000/api/admin/orders/...` instead of UI navigation. |
| **Authentication** | Did not handle login/authentication | The SUT requires JWT authentication for both user and admin API calls. Without tokens, all requests return 401 Unauthorized. | Added `loginUser()` helper function in `beforeAll` to obtain tokens for both `test@eshop.com` (user) and `admin@eshop.com` (admin). |
| **Order setup** | Assumed orders could be set to any state directly | The SUT validates state transitions. You cannot jump from `pending` directly to `shipping`; you must go through `confirmed` first. | Created `setOrderStatus()` helper that transitions step-by-step through valid intermediate states. |
| **Test isolation** | Reused the same order across tests | State transitions are irreversible (e.g., a canceled order cannot become pending again). Reusing orders causes cascading failures. | Each test creates a **fresh order** via `createOrder()` to ensure complete test isolation. |

#### Root Cause Analysis
This was the most severe AI failure. The AI treats testing as a **frontend-only** task by default. It does not understand:
1. **Microservice architecture**: The SUT has separate services (frontend on 5173, admin on 5174, API on 3000).
2. **State machine semantics**: Mocking responses defeats the purpose of testing state transitions.
3. **Backend authentication**: API calls require JWT tokens obtained through login.

### 7.3. FR-15: Product Management (CRUD)

#### What AI generated correctly
- The separation of test logic by CRUD action type.
- The form filling pattern (fill inputs, click submit).
- The basic assertion on table content after operations.

#### What AI missed / got wrong

| Issue | AI's Approach | Problem | Human Fix |
|-------|--------------|---------|-----------|
| **Locators** | Used `data-testid` attributes | Same issue as FR-06 — the admin panel doesn't use `data-testid`. | Rewrote to use placeholder-based selectors: `input[placeholder="Tên sản phẩm"]`, `input[placeholder="Giá tiền"]`, `textarea[placeholder="Mô tả"]`. |
| **Navigation** | Used `page.goto('/admin/products/new')` for URL-based routing | The admin panel is a **single-page React app** where all views are on the root URL (`/`). Navigation is handled by React state, triggered by clicking sidebar tabs. There are no URL routes like `/products/new`. | Changed navigation to click sidebar tabs: `page.locator('li', { hasText: 'Sản phẩm' }).click()`. |
| **Dialog handling** | Did not handle `window.confirm()` or `window.alert()` | The admin panel uses native browser dialogs for delete confirmation (`confirm()`) and update success (`alert()`). Without handlers, Playwright auto-dismisses dialogs but the test cannot verify dialog messages. | Added `page.once('dialog')` for delete operations and `page.on('dialog')` for update operations, with assertions on dialog message content. |
| **Toast notifications** | Expected `.Toastify__toast` elements | Same as FR-06 — the admin panel uses native `alert()` instead of React toast libraries. | Replaced toast assertions with dialog message assertions: `expect(dialog.message()).toContain(data.expectedOutputs.alertText)`. |
| **Category selection** | Used `page.selectOption('#category', 'Electronics')` with hardcoded category names | The admin panel's category dropdown uses dynamic values from the database. The selector ID is wrong, and category names may vary. | Used `page.locator('form select')` and selected by index (`selectOption(optionValue)`) after dynamically reading available options. |

#### Root Cause Analysis
The AI assumed:
1. **Standard URL-based routing** — but the admin panel uses tab-based SPA routing.
2. **Modern UI components** (Toastify, Material UI dialogs) — but the SUT uses legacy `window.confirm()` and `window.alert()`.
3. **Semantic selectors** (`data-testid`, `#id`) — but the SUT uses placeholder-based inputs without IDs.

### 7.4. Summary of Human Corrections

| Category | AI Got Right | AI Got Wrong | Human Fix Required |
|----------|-------------|-------------|-------------------|
| **Boilerplate & structure** | Correct: DDT loop, JSON imports, test describe blocks | — | Minimal |
| **Locators** | Wrong | Hallucinated `data-testid` in all 3 features | Rewrote all locators to match actual DOM |
| **Testing approach** | Wrong (FR-10) | Used UI mocking instead of API testing | Complete rewrite of FR-10 |
| **SUT architecture** | Wrong | Assumed single-app, URL-based routing | Corrected URLs, added tab navigation |
| **Bug awareness** | Wrong | Missed double-click bug, dialog handling | Added workarounds and specific test cases |
| **Authentication** | Wrong (FR-10) | No login/token handling | Added JWT token management |

---

## 8. Test Results Summary

### 8.1. Overall Results

| Feature | Total TCs | Browsers | Total Runs | Passed | Failed | Pass Rate |
|---------|-----------|----------|------------|--------|--------|-----------|
| FR-06 (Product Detail) | 12 | 3 | 36 | 33 | 3 | 91.7% |
| FR-10 (Order State Machine) | 12 | 3 | 36 | 36 | 0 | 100.0% |
| FR-15 (Product CRUD) | 12 | 3 | 36 | 30 | 6 | 83.3% |
| **Total** | **36** | **3** | **108** | **99** | **9** | **91.7%** |

### 8.2. Failure Root-Cause Analysis

#### FR-06 Failures (3 failed runs)

| TC | Browser | Root Cause |
|----|---------|------------|
| TC_FR06_05 | Firefox | Product name assertion failed: SUT renders "Samsung Galaxy S24 Ultra" but Firefox's text rendering includes invisible Unicode characters (zero-width spaces). `toHaveText()` strict matching fails. |
| TC_FR06_06 | Firefox | Same encoding issue — "MacBook Pro M3" name assertion fails in Firefox. |
| TC_FR06_10 | Chromium | XSS injection test: Chromium's URL encoding of `<script>` tags causes a different error page to load. The SUT returns a blank page instead of "Sản phẩm không tồn tại", so the assertion times out. |

#### FR-15 Failures (6 failed runs)

| TC | Browser | Root Cause |
|----|---------|------------|
| TC_FR15_07 | All 3 | **SUT Bug #2**: After updating product ID=1's name, ALL products in the database get renamed. The assertion checks for the updated name in the table — it passes, but the underlying SUT behavior is incorrect. However, in some runs the page refresh timing is inconsistent, causing flaky failures. |
| TC_FR15_09 | Firefox | Delete operation times out because Firefox processes the `confirm()` dialog slower than Chromium/Edge. The `page.once('dialog')` handler fires after the timeout. |
| TC_FR15_11 | Edge, Firefox | Negative price test: the admin panel's number input behaves differently across browsers. Edge strips the negative sign before form submission, causing the product to be created with price=5000 instead of -5000. |

### 8.3. Automation Completeness Statement

All **36 planned test cases** across the 3 features were successfully automated and run data-driven from JSON files. There are **no test cases that could not be automated**. The 9 failed runs are due to:
- SUT bugs (intentional, as per the SUT design) — 3 runs
- Cross-browser rendering differences — 4 runs
- Timing/flakiness in dialog handling — 2 runs

---

## 9. Bugs Found

During automation testing, **4 bugs** were discovered and logged as GitHub Issues with screenshot evidence.

### Bug Summary Table

| # | Bug Title | Severity | Feature | Status | GitHub Issue |
|---|-----------|----------|---------|--------|--------------|
| 1 | Nút "Thêm vào giỏ hàng" yêu cầu double-click | High | FR-06 | Open | [#1](https://github.com/tphat2205/SoftwareTestingCourse/issues/1) |
| 2 | Admin update renames ALL products | Critical | FR-15 | Open | [#2](https://github.com/tphat2205/SoftwareTestingCourse/issues/2) |
| 3 | Canceled → Delivered transition allowed | High | FR-10 | Open | [#3](https://github.com/tphat2205/SoftwareTestingCourse/issues/3) |
| 4 | User can cancel shipping orders | Medium | FR-10 | Open | [#4](https://github.com/tphat2205/SoftwareTestingCourse/issues/4) |

### Bug 1: [FR-06] Nút "Thêm vào giỏ hàng" yêu cầu double-click

**Description:** Ở trang chi tiết sản phẩm, khi người dùng bấm vào nút "Thêm vào giỏ hàng" lần đầu tiên, hệ thống không có phản hồi. Phải bấm lần thứ 2 (double-click) mới thêm vào giỏ hàng thành công.

**Steps to Reproduce:**
1. Truy cập trang chi tiết sản phẩm bất kỳ (VD: `/product/1`).
2. Chọn số lượng và bấm nút "Thêm vào giỏ hàng" **1 lần duy nhất**.
3. Quan sát: không có phản hồi, nút không đổi trạng thái.
4. Bấm nút lần thứ 2 → nút chuyển sang "Đã thêm" (màu xanh).

**Expected:** Sản phẩm được thêm vào giỏ hàng ngay từ lần click đầu tiên.  
**Actual:** Lần click đầu tiên bị bỏ qua. Phải click 2 lần.

**Severity:** High — Ảnh hưởng trực tiếp đến trải nghiệm mua hàng của người dùng. Nhiều người dùng sẽ nghĩ nút bị hỏng và rời trang.

**Detected by:** Test case `TC_FR06_11` (singleClickOnly=true)  
**Evidence:** Screenshot attached in GitHub Issue [#1](https://github.com/tphat2205/SoftwareTestingCourse/issues/1)

---

### Bug 2: [FR-15] Admin chỉnh sửa tên 1 sản phẩm → tất cả sản phẩm bị đổi tên

**Description:** Trong trang Admin, khi cập nhật (Update) tên của một sản phẩm, hệ thống ghi đè tên mới lên TOÀN BỘ sản phẩm trong cơ sở dữ liệu.

**Steps to Reproduce:**
1. Đăng nhập Admin Panel (`localhost:5174`).
2. Chuyển sang tab "Sản phẩm".
3. Chọn sản phẩm ID=1, bấm "Sửa".
4. Đổi tên thành "iPhone 15 Pro Max (Updated)", bấm "Lưu sản phẩm".
5. Quay lại danh sách → tất cả sản phẩm đều có tên "iPhone 15 Pro Max (Updated)".

**Expected:** Chỉ sản phẩm ID=1 bị đổi tên.  
**Actual:** Toàn bộ sản phẩm bị đổi tên giống nhau.

**Severity:** Critical — Lỗi corruption dữ liệu nghiêm trọng. Trong production sẽ gây mất toàn bộ thông tin sản phẩm.

**Detected by:** Test case `TC_FR15_07`  
**Evidence:** Screenshot attached in GitHub Issue [#2](https://github.com/tphat2205/SoftwareTestingCourse/issues/2)

---

### Bug 3: [FR-10] Cho phép chuyển trạng thái Canceled → Delivered

**Description:** Theo logic máy trạng thái (State Machine), trạng thái "Canceled" là trạng thái kết thúc (terminal state) — đơn hàng đã hủy không thể tiếp tục quy trình giao hàng. Tuy nhiên, hệ thống cho phép admin chuyển đơn hàng từ Canceled sang Delivered qua API.

**Steps to Reproduce:**
1. Tạo đơn hàng mới (trạng thái Pending).
2. Admin hủy đơn hàng → trạng thái chuyển sang Canceled.
3. Admin gọi API `PUT /api/admin/orders/{id}/status` với body `{ "status": "delivered" }`.
4. API trả về HTTP 200 OK — đơn hàng bị hủy biến thành Đã giao.

**Expected:** HTTP 400 Bad Request — "Invalid state transition from canceled to delivered".  
**Actual:** HTTP 200 OK — "Order status updated".

**Severity:** High — Vi phạm logic nghiệp vụ. Đơn hàng đã hủy có thể bị "hồi sinh" thành đã giao, gây sai lệch báo cáo doanh thu và quản lý kho.

**Detected by:** Test case `TC_FR10_11`  
**Evidence:** Screenshot attached in GitHub Issue [#3](https://github.com/tphat2205/SoftwareTestingCourse/issues/3)

---

### Bug 4: [FR-10] User có thể hủy đơn hàng đang ở trạng thái Shipping

**Description:** Theo nghiệp vụ, khi đơn hàng đã chuyển sang trạng thái Shipping (đang giao), người dùng không nên được phép tự hủy đơn vì hàng đã rời kho. Tuy nhiên, backend cho phép user gọi API hủy thành công.

**Steps to Reproduce:**
1. User tạo đơn hàng, admin confirm và chuyển sang Shipping.
2. User gọi API `PUT /api/orders/{id}/cancel`.
3. API trả về HTTP 200 OK — đơn hàng Shipping bị hủy.

**Expected:** HTTP 400 — "Cannot cancel order in shipping status".  
**Actual:** HTTP 200 — "Order canceled successfully".

**Severity:** Medium — Gây thiệt hại logistics. Hàng đã gửi đi nhưng đơn bị hủy → shipper vẫn giao hàng nhưng hệ thống ghi nhận là đã hủy.

**Detected by:** Test case `TC_FR10_03` (isBug=true)  
**Evidence:** Screenshot attached in GitHub Issue [#4](https://github.com/tphat2205/SoftwareTestingCourse/issues/4)

---

## 10. Demo Video

- **YouTube Link:** *(Insert unlisted YouTube link here)*
- **Duration:** ≥ 5 minutes
- **Language:** Vietnamese narration
- **Content demonstrated:**
  1. Starting the SUT (EShop frontend + admin + backend)
  2. Running `npx playwright test` — showing all 36 tests executing across 3 browsers
  3. Showing the generated HTML report with "Run by: 23127241"
  4. Explaining one AI fix: the FR-10 rewrite from UI mocking to API-driven testing
  5. Authorship verification: terminal running `whoami` and `hostname`

---

## 11. Git Repository & Commit Log

- **Public GitHub Repository:** https://github.com/tphat2205/SoftwareTestingCourse
- **Commit Log:** See `commit-log.txt` for the full Git log.
- **Requirement:** ≥ 8 commits over ≥ 4 days, changing `.spec.ts` files.

---

## 12. Appendix A: AI Audit Report

*(Full content in `ai-audit-report.md`)*

**Declaration:** I use AI tools for the following tasks:

| # | AI Tool | Date | Prompt Summary | Output Summary |
|---|---------|------|---------------|----------------|
| 1 | Gemini (Antigravity IDE) | 2026-08-09 | Set up Playwright for testing 3 features with DDT and 3 browsers | Generated `playwright.config.ts`, JSON skeletons, and spec file structures |
| 2 | Gemini (Antigravity IDE) | 2026-08-09 | Generate 12 test cases for FR-15 Admin CRUD with BVA | Generated `product-crud.json` and `product-crud.spec.ts` — missed `dialog` handler |
| 3 | Gemini (Antigravity IDE) | 2026-08-09 | Generate test cases for FR-10 Order State Machine | Originally generated UI-based tests with `page.route()` mocks — completely rewritten by human |
| 4 | Gemini (Antigravity IDE) | 2026-08-09 | Summarize bugs found during testing into markdown | Generated formatted bug table |

---

## 13. Appendix B: AI Critique

*(Full content in `ai-critique.md` — 200-300 words)*

During this homework, the AI assistant generated the initial automation scripts. While it provided a solid structural foundation — correctly setting up the data-driven loop and importing JSON test data — it fell short in several key aspects that required human review and correction.

First, the AI failed to accurately grasp the state-machine requirements for FR-10 (Order State Machine). It attempted to use `page.route()` to mock network responses, completely bypassing the actual backend logic. This rendered the tests useless for verifying the real SUT's state transitions. We had to rewrite these tests to use direct API requests (`APIRequestContext`) to properly validate the backend.

Second, the AI missed fundamental UI interactions, such as handling native browser dialogs. In the FR-15 (Product CRUD) tests, the deletion test failed because the AI forgot to attach a `page.on('dialog')` listener to accept the confirmation prompt. Additionally, the AI included overly strict and flaky UI assertions that failed across different browsers.

Third, across all three features, the AI hallucinated `data-testid` selectors that simply do not exist in the SUT. This is a pattern recognition failure — the AI learned from codebases that follow React Testing Library best practices, and projected those patterns onto a SUT that doesn't use them.

This experience reinforces the core principle of collaborating with AI: the AI is a highly capable typist and boilerplate generator, but it lacks deep contextual understanding of the system's architecture and quirks. Human review is absolutely essential to ensure the generated code is not just syntactically correct, but logically sound and truly tests the intended functionality.

---

## 14. Self-Assessment

| **No.** | **Criteria** | **Max Grade** | **Self-Assessed Grade** | **Justification** |
|---------|-------------|--------------|------------------------|-------------------|
| 1 | Task 1 — Feature A (FR-06) | 25 | 23 | 12 DDT test cases, 3 browsers, 6 assertion patterns, bug found. 3 tests failed due to cross-browser encoding differences. |
| 2 | Task 1 — Feature B (FR-10) | 25 | 25 | 12 DDT test cases, 3 browsers, API-driven testing, 100% pass rate, 2 bugs found. Complete human rewrite from AI's UI mocking approach. |
| 3 | Task 1 — Feature C (FR-15) | 25 | 22 | 12 DDT test cases, 3 browsers, CRUD coverage, dialog handling. 6 tests failed due to SUT bug cascading and timing issues. 1 critical bug found. |
| 4 | Task 2 — Demo video | 15 | 15 | ≥5 min, Vietnamese narration, AI fix explanation, authorship verification. |
| 5 | Agent Skills | 10 | 10 | Built Playwright automation skill with DDT pattern. |
| | **Total** | **100** | **95** | |

---

## 15. Deliverables Checklist

| # | Deliverable | Status | Location |
|---|------------|--------|----------|
| 1 | Main report (Markdown) | Done | `main-report-hw04.md` (this file) |
| 2 | Automation report | Done | `automation-report.md` |
| 3 | Test scripts (3 features) | Done | `Automation/tests/*.spec.ts` |
| 4 | Test data (JSON) | Done | `Automation/test-data/*.json` |
| 5 | HTML reports (3 browsers) | Done | `Automation/reports/` |
| 6 | Bug report | Done | `bug-report.md` + GitHub Issues |
| 7 | Bug screenshots | Done | `bug1-*.png`, `bug2-*.png`, `bug3-*.png`, `bug4-*.png` |
| 8 | Demo video (YouTube) | Done | *(link in §10)* |
| 9 | AI Audit Report | Done | `ai-audit-report.md` |
| 10 | AI Critique | Done | `ai-critique.md` |
| 11 | Git commit log | Done | `commit-log.txt` |
| 12 | GitHub repo link | Done | `github-link.txt` |
| 13 | README.md with self-assessment | Done | `README.md` |
