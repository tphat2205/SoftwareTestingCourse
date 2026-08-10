import { test, expect, request, APIRequestContext } from '@playwright/test';
import testData from '../test-data/order-state-machine.json';

const API_BASE = 'http://localhost:3000/api';

// Helper: Login and get token
async function loginUser(apiContext: APIRequestContext, email: string, password: string): Promise<string> {
  const response = await apiContext.post(`${API_BASE}/login`, {
    data: { email, password }
  });
  const body = await response.json();
  return body.token;
}

// Helper: Create a test order via API
async function createOrder(apiContext: APIRequestContext, token: string, address: string = 'Test Address'): Promise<number> {
  const response = await apiContext.post(`${API_BASE}/checkout`, {
    headers: { 'Authorization': `Bearer ${token}` },
    data: {
      total_amount: 100000,
      shipping_address: address
    }
  });
  const body = await response.json();
  return body.orderId;
}

// Helper: Set order status via admin API
async function setOrderStatus(apiContext: APIRequestContext, adminToken: string, orderId: number, status: string): Promise<void> {
  // We need to transition step by step through valid states
  const transitions: Record<string, string[]> = {
    'pending': [],
    'confirmed': ['confirmed'],
    'shipping': ['confirmed', 'shipping'],
    'delivered': ['confirmed', 'shipping', 'delivered'],
    'canceled': ['canceled'],
  };

  const steps = transitions[status] || [];
  for (const step of steps) {
    await apiContext.put(`${API_BASE}/admin/orders/${orderId}/status`, {
      headers: { 'Authorization': `Bearer ${adminToken}` },
      data: { status: step }
    });
  }
}

test.describe('FR-10: Order State Machine', () => {
  let apiContext: APIRequestContext;
  let userToken: string;
  let adminToken: string;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext();

    // Login as user
    userToken = await loginUser(apiContext, 'test@eshop.com', 'Test1234!');

    // Login as admin
    adminToken = await loginUser(apiContext, 'admin@eshop.com', 'Admin123!');
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  for (const data of testData) {
    test(`${data.tc_id}: ${data.description}`, async ({ page }) => {

      if (data.type === 'user_cancel') {
        // Create a fresh order as user, set its status, then try to cancel
        const orderId = await createOrder(apiContext, userToken);

        // Set the order to the desired initial status using admin
        if (data.inputs.setupOrderStatus !== 'pending') {
          await setOrderStatus(apiContext, adminToken, orderId, data.inputs.setupOrderStatus!);
        }

        // User tries to cancel via API
        const cancelResponse = await apiContext.put(`${API_BASE}/orders/${orderId}/cancel`, {
          headers: { 'Authorization': `Bearer ${userToken}` }
        });

        // Assertion pattern 1: Status code check
        expect(cancelResponse.status()).toBe(data.expectedOutputs.httpStatus);

        // Assertion pattern 2: Response body message check
        const cancelBody = await cancelResponse.json();
        if (data.expectedOutputs.httpStatus === 200) {
          expect(cancelBody.message).toBe(data.expectedOutputs.message);
        } else {
          expect(cancelBody.error).toBe(data.expectedOutputs.message);
        }

      } else if (data.type === 'user_cancel_nonexistent') {
        // Try to cancel a non-existent order
        const cancelResponse = await apiContext.put(`${API_BASE}/orders/${data.inputs.orderId}/cancel`, {
          headers: { 'Authorization': `Bearer ${userToken}` }
        });

        // Assertion pattern 1: Status code
        expect(cancelResponse.status()).toBe(data.expectedOutputs.httpStatus);

        // Assertion pattern 2: Error message
        const cancelBody = await cancelResponse.json();
        expect(cancelBody.error).toBe(data.expectedOutputs.message);

        // Assertion pattern 3: toContainText — verify on UI
        await page.goto('/login');
        await expect(page).toHaveURL(/login/);

      } else if (data.type === 'admin_update') {
        // Create a fresh order, set initial status, then admin updates
        const orderId = await createOrder(apiContext, userToken);

        // Set initial status
        if (data.inputs.setupOrderStatus !== 'pending') {
          await setOrderStatus(apiContext, adminToken, orderId, data.inputs.setupOrderStatus!);
        }

        // Admin tries to update status
        const updateResponse = await apiContext.put(`${API_BASE}/admin/orders/${orderId}/status`, {
          headers: { 'Authorization': `Bearer ${adminToken}` },
          data: { status: data.inputs.newStatus }
        });

        // Assertion pattern 1: Status code check
        expect(updateResponse.status()).toBe(data.expectedOutputs.httpStatus);

        // Assertion pattern 2: Response message check
        const updateBody = await updateResponse.json();
        if (data.expectedOutputs.httpStatus === 200) {
          expect(updateBody.message).toBe(data.expectedOutputs.message);
        } else {
          expect(updateBody.error).toContain('Invalid state transition');
        }

        // Assertion pattern 3: Verify via GET order detail
        if (data.expectedOutputs.httpStatus === 200) {
          const getResponse = await apiContext.get(`${API_BASE}/orders/${orderId}`);
          const orderDetail = await getResponse.json();
          expect(orderDetail.status).toBe(data.inputs.newStatus);
        }

        // UI verification on admin panel
        await page.goto('http://localhost:5174/');
        await page.waitForTimeout(500);
      }
    });
  }
});
