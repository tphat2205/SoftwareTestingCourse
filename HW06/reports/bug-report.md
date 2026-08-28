# BÁO CÁO LỖI KIỂM THỬ API (API BUG REPORT)

**Hệ thống:** EShop API Backend  
**Học phần:** Kiểm thử Phần mềm (HW06 – API Testing)  
**Mã sinh viên:** 23127241  
**Ngày thực hiện:** 28/08/2026  
**Phương pháp kiểm thử:** Kiểm thử hộp đen / hộp xám API (Black-box & Grey-box API Testing)  
**Công cụ kiểm thử:** Postman v11, Newman v6.2.2

---

## 1. TỔNG QUAN KẾT QUẢ THỰC THI KIỂM THỬ API

Toàn bộ quá trình kiểm thử được thực thi qua Newman dựa trên 128 kịch bản kiểm thử API (tập trung vào 3 nhóm API mục tiêu: `POST /api/register`, `PUT /api/orders/:id/cancel`, `POST /api/categories`).

- **Tổng số request API thực thi:** 128 requests
- **Tổng số assertions kiểm tra:** 167 assertions
- **Số assertions Đạt (Passed):** 67 assertions
- **Số assertions Không đạt (Failed):** 100 assertions
- **Kết luận sơ bộ:** Các lỗi phát hiện được phân nhóm theo các hành vi API phản hồi sai lệch so với Tài liệu đặc tả API (`api_specification.md`) và các tiêu chuẩn giao thức HTTP / RESTful API.

---

## 2. BẢNG PHÂN LOẠI CÁC NHÓM LỖI API

| Mã Lỗi         | Nhóm Lỗi API                    | Hành Vi Lỗi Phản Hồi Từ API                                         | Endpoint Bị Ảnh Hưởng                        | HTTP Status Thực Tế / Kỳ Vọng    | Mức Độ   |
| :------------- | :------------------------------ | :------------------------------------------------------------------ | :------------------------------------------- | :------------------------------- | :------- |
| **API-BUG-01** | Phân quyền API (Access Control) | API quản trị chấp nhận Token của User thường mà không chặn quyền    | `POST /api/categories`                       | `200 OK` / `403 Forbidden`       | Critical |
| **API-BUG-02** | Xác thực Đầu vào (Validation)   | API chấp nhận Request Body rỗng và thiếu trường bắt buộc            | `POST /api/register`, `POST /api/categories` | `200 OK` / `400 Bad Request`     | High     |
| **API-BUG-03** | Xác thực Đầu vào (Validation)   | API chấp nhận định dạng Email sai quy chuẩn (thiếu @, khoảng trắng) | `POST /api/register`                         | `200 OK` / `400 Bad Request`     | High     |
| **API-BUG-04** | Xác thực Đầu vào (Validation)   | API chấp nhận payload chứa mã độc XSS / SQLi mà không từ chối       | `POST /api/register`, `POST /api/categories` | `200 OK` / `400 Bad Request`     | High     |
| **API-BUG-05** | Quản lý Trạng thái & Xung đột   | API không bắt lỗi xung đột khi đăng ký tài khoản trùng Email        | `POST /api/register`                         | `200 OK` / `409 Conflict`        | High     |
| **API-BUG-06** | Quản lý Trạng thái & Xung đột   | API không bắt lỗi xung đột khi tạo danh mục trùng tên đã có         | `POST /api/categories`                       | `200 OK` / `409 Conflict`        | Medium   |
| **API-BUG-07** | Máy trạng thái (State Machine)  | API cho phép hủy đơn hàng ở trạng thái đang giao (`shipping`)       | `PUT /api/orders/:id/cancel`                 | `200 OK` / `400 Bad Request`     | High     |
| **API-BUG-08** | Chuẩn HTTP & Schema             | API trả về sai mã phản hồi thành công khi tạo mới tài nguyên        | `POST /api/register`, `POST /api/categories` | `200 OK` / `201 Created`         | Low      |
| **API-BUG-09** | Chuẩn HTTP & Schema             | API trả về lỗi máy chủ `500` kèm HTML thay vì lỗi Client `4xx` JSON | `POST /api/categories`                       | `500 Server Error` / `415 / 400` | Medium   |

---

## 3. CHI TIẾT CÁC NHÓM LỖI HÀNH VI API

---

### NHÓM 1: LỖI KIỂM SOÁT QUYỀN TRUY CẬP API (API AUTHORIZATION & ACCESS CONTROL)

#### API-BUG-01: API Quản trị không chặn quyền truy cập của người dùng thông thường

- **Endpoint:** `POST /api/categories`
- **Mô tả hành vi:**
  Theo đặc tả API (Mục 6), các API quản lý danh mục là API dành riêng cho Quản trị viên (Admin) và bắt buộc phải kiểm tra quyền hạn. Tuy nhiên, khi gửi request kèm JWT Token của một tài khoản khách hàng thông thường (`role: 'user'`), API vẫn xử lý tạo mới danh mục và trả về thành công.
- **Chi tiết Request:**
  - **Method:** `POST`
  - **URL:** `http://localhost:3000/api/categories`
  - **Headers:**
    - `Content-Type: application/json`
    - `Authorization: Bearer <token_cua_user_thuong>`
  - **Body:**
    ```json
    {
      "name": "Danh mục trái phép"
    }
    ```
- **Kết quả thực tế từ API:**
  - **Status Code:** `200 OK`
  - **Response Body:** `{"message": "Category created", "id": 4}`
- **Kết quả mong đợi theo Đặc tả:**
  - **Status Code:** `403 Forbidden`
  - **Response Body:** JSON thông báo lỗi từ chối quyền truy cập (ví dụ: `{"error": "Access denied. Admin role required"}`).
- **Mức độ nghiêm trọng:** Critical (Lỗ hổng leo quyền - Privilege Escalation).

---

### NHÓM 2: LỖI XÁC THỰC DỮ LIỆU ĐẦU VÀO CỦA API (INPUT VALIDATION & DATA SANITIZATION)

#### API-BUG-02: API chấp nhận Request Body rỗng, thiếu trường hoặc sai kiểu dữ liệu

- **Endpoint ảnh hưởng:** `POST /api/register`, `POST /api/categories`
- **Mô tả hành vi:**
  Khi client gửi request với các trường dữ liệu bắt buộc bị để rỗng (`""`), chỉ chứa khoảng trắng (`"   "`), bị khuyết trường, hoặc truyền sai kiểu dữ liệu (truyền số nguyên `name: 123` thay vì chuỗi), API không thực hiện kiểm tra tính hợp lệ mà vẫn xử lý ghi nhận dữ liệu.
- **Chi tiết Request kiểm thử:**
  - **Case 1 (Register - Tên rỗng):** `POST /api/register` $\rightarrow$ Body: `{"name": "", "email": "valid@ex.com", "password": "Password123!"}`
  - **Case 2 (Register - Khuyết Email):** `POST /api/register` $\rightarrow$ Body: `{"name": "John", "password": "Password123!"}`
  - **Case 3 (Category - Name là số):** `POST /api/categories` $\rightarrow$ Body: `{"name": 123}`
- **Kết quả thực tế từ API:**
  - **Status Code:** `200 OK` cho tất cả các trường hợp trên.
  - **Response Body:** `{"message": "User registered successfully", "id": 3}` / `{"message": "Category created", "id": 5}`
- **Kết quả mong đợi theo Đặc tả:**
  - **Status Code:** `400 Bad Request`
  - **Response Body:** Cấu trúc JSON chứa thông tin trường bị lỗi (ví dụ: `{"error": "name is required and cannot be empty"}`).
- **Mức độ nghiêm trọng:** High.

#### API-BUG-03: API chấp nhận định dạng Email không hợp lệ

- **Endpoint ảnh hưởng:** `POST /api/register`
- **Mô tả hành vi:**
  API không thực hiện kiểm tra định dạng email theo chuẩn cú pháp (RFC 5322). Các chuỗi không phải email như `"john"`, `"john@"`, `"john.example.com"`, `"jo hn@ex.com"` hoặc chuỗi email có độ dài bất thường (10,000 ký tự) đều được API chấp nhận đăng ký thành công.
- **Chi tiết Request:**
  - **URL:** `POST http://localhost:3000/api/register`
  - **Body:** `{"name": "John", "email": "invalid-email-format", "password": "Password123!"}`
- **Kết quả thực tế:** `200 OK`
- **Kết quả mong đợi:** `400 Bad Request` kèm thông báo định dạng email không hợp lệ.
- **Mức độ nghiêm trọng:** High.

#### API-BUG-04: API chấp nhận và lưu trữ trực tiếp các payload tấn công XSS / SQL Injection

- **Endpoint ảnh hưởng:** `POST /api/register`, `POST /api/categories`
- **Mô tả hành vi:**
  Khi gửi các chuỗi payload chứa mã độc như XSS (`<script>alert(1)</script>`, `<img src=x onerror=alert(1)>`) hoặc SQLi (`'; DROP TABLE users;--`), API không lọc, không làm sạch (Sanitize) và không từ chối dữ liệu mà phản hồi thành công và lưu trực tiếp chuỗi độc hại.
- **Kết quả thực tế:** `200 OK`
- **Kết quả mong đợi:** `400 Bad Request` (từ chối dữ liệu độc hại) hoặc xử lý làm sạch mã HTML trước khi phản hồi.
- **Mức độ nghiêm trọng:** High.

---

### NHÓM 3: LỖI XỬ LÝ TRẠNG THÁI VÀ XUNG ĐỘT DỮ LIỆU API (API STATE & CONFLICT HANDLING)

#### API-BUG-05: API không thông báo lỗi xung đột khi tạo tài khoản trùng Email (Conflict Error)

- **Endpoint:** `POST /api/register`
- **Mô tả hành vi:**
  Khi gửi request đăng ký tài khoản với địa chỉ email đã tồn tại sẵn trong hệ thống (ví dụ: `admin@eshop.com` hoặc `test@eshop.com`), API không kiểm tra sự tồn tại của tài khoản mà vẫn tiếp tục tạo mới và phản hồi thành công.
- **Chi tiết Request:**
  - **Method:** `POST`
  - **URL:** `http://localhost:3000/api/register`
  - **Body:**
    ```json
    {
      "name": "Duplicate User",
      "email": "admin@eshop.com",
      "password": "Password123!"
    }
    ```
- **Kết quả thực tế từ API:**
  - **Status Code:** `200 OK`
  - **Response Body:** `{"message": "User registered successfully", "id": 4}`
- **Kết quả mong đợi theo Đặc tả:**
  - **Status Code:** `409 Conflict` (hoặc `400 Bad Request`)
  - **Response Body:** `{"error": "Email already exists"}`
- **Mức độ nghiêm trọng:** High (Gây lỗi định danh khi đăng nhập).

#### API-BUG-06: API không kiểm tra xung đột trùng tên Danh mục sản phẩm

- **Endpoint:** `POST /api/categories`
- **Mô tả hành vi:**
  Gửi request tạo danh mục với tên trùng lặp hoàn toàn với danh mục đã có (`"Điện thoại"`) hoặc trùng lặp không phân biệt hoa thường (`"ĐIỆN THOẠI"`). API vẫn tiếp tục tạo mới bản ghi và trả về `200 OK`.
- **Kết quả mong đợi:** Trả về `409 Conflict` kèm thông báo tên danh mục đã tồn tại.
- **Mức độ nghiêm trọng:** Medium.

#### API-BUG-07: Vi phạm quy tắc máy trạng thái đơn hàng (Cho phép hủy đơn hàng đang giao)

- **Endpoint:** `PUT /api/orders/:id/cancel`
- **Mô tả hành vi:**
  Theo quy tắc máy trạng thái đơn hàng (FR-10 trong tài liệu đặc tả), đơn hàng chỉ được phép hủy (`cancel`) khi đang ở trạng thái `pending` hoặc `confirmed`. Khi đơn hàng đã chuyển sang trạng thái đang giao hàng (`shipping`), API phải từ chối yêu cầu hủy.
  Tuy nhiên, khi gửi request hủy một đơn hàng có trạng thái `shipping`, API vẫn chuyển trạng thái đơn hàng thành `canceled` và trả về thành công.
- **Chi tiết Request:**
  - **Method:** `PUT`
  - **URL:** `http://localhost:3000/api/orders/{shipping_order_id}/cancel`
  - **Headers:** `Authorization: Bearer <user_token>`
- **Kết quả thực tế từ API:**
  - **Status Code:** `200 OK`
  - **Response Body:** `{"message": "Order canceled successfully"}`
- **Kết quả mong đợi theo Đặc tả:**
  - **Status Code:** `400 Bad Request`
  - **Response Body:** `{"error": "Cannot cancel this order. Order is already shipping or processed."}`
- **Mức độ nghiêm trọng:** High.

---

### NHÓM 4: LỖI CHUẨN MÃ PHẢN HỒI HTTP VÀ SCHEMA PHẢN HỒI (HTTP PROTOCOL & SCHEMA INCONSISTENCIES)

#### API-BUG-08: API trả về mã HTTP Status Code không chuẩn RESTful cho thao tác tạo mới

- **Endpoint ảnh hưởng:** `POST /api/register`, `POST /api/categories`
- **Mô tả hành vi:**
  Theo tiêu chuẩn thiết kế RESTful API (RFC 7231) và các trường hợp kiểm thử hợp lệ, khi một tài nguyên mới được tạo thành công trên máy chủ, mã phản hồi HTTP bắt buộc phải là `201 Created`. Hiện tại, tất cả các API tạo mới đều trả về mã mặc định `200 OK`.
- **Kết quả thực tế:** HTTP `200 OK`
- **Kết quả mong đợi:** HTTP `201 Created`
- **Mức độ nghiêm trọng:** Low (Lỗi chuẩn hóa giao thức API).

#### API-BUG-09: API phản hồi mã lỗi `500 Server Error` kèm định dạng HTML khi nhận Body không hợp lệ

- **Endpoint ảnh hưởng:** `POST /api/categories`
- **Mô tả hành vi:**
  Khi client gửi request với header `Content-Type: application/x-www-form-urlencoded` hoặc gửi nội dung payload không đúng định dạng JSON chuẩn (ví dụ chuỗi text thuần `name=Test`), API bị crash nội bộ và trả về HTTP `500 Internal Server Error` dưới dạng tài liệu HTML thay vì phản hồi lỗi chuẩn JSON.
- **Chi tiết Request:**
  - **URL:** `POST http://localhost:3000/api/categories`
  - **Headers:** `Content-Type: application/x-www-form-urlencoded`
  - **Body:** `name=NonJSONData`
- **Kết quả thực tế từ API:**
  - **Status Code:** `500 Internal Server Error`
  - **Content-Type:** `text/html; charset=utf-8`
  - **Body:** Trang HTML thông báo lỗi database
- **Kết quả mong đợi theo Đặc tả:**
  - **Status Code:** `415 Unsupported Media Type` hoặc `400 Bad Request`
  - **Content-Type:** `application/json`
  - **Body:** Cấu trúc JSON chuẩn thông báo định dạng dữ liệu không được hỗ trợ.
- **Mức độ nghiêm trọng:** Medium.

---
