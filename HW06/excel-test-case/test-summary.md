# BÁO CÁO TỔNG KẾT KIỂM THỬ (TEST SUMMARY REPORT)

**Học phần:** Kiểm thử Phần mềm (CS423 / CSC13003 – Software Testing)  
**Bài tập:** HW06 – Automated API Testing (AI-Augmented)  
**Sinh viên thực hiện:** ĐOÀN THÀNH PHÁT – MSSV: 23127241 – Lớp: 23KTPM2  
**Hệ thống kiểm thử (SUT):** EShop Application (`http://localhost:3000`)  
**Môi trường thực thi:** Postman v11, Newman v6.2.2, GitHub Actions

---

## 1. TỔNG QUAN CÁC CHỈ SỐ KIỂM THỬ (EXECUTIVE METRICS)

Bảng tổng hợp toàn bộ các chỉ số kiểm thử tự động trên hệ thống EShop:

|  STT   | Chỉ Số Đo Lường (Testing Metrics)              |   Giá Trị / Số Lượng   | Tỷ Lệ (%) | Ghi Chú Kỹ Thuật                                             |
| :----: | :--------------------------------------------- | :--------------------: | :-------: | :----------------------------------------------------------- |
| **1**  | **Số lượng API được kiểm thử**                 |       **3 APIs**       |   100%    | Lựa chọn từ 3 Pool A, B, C theo quy định đề bài              |
| **2**  | **Số Test Cases AI sinh ban đầu**              |     **111 Cases**      |   88.1%   | Trung bình $\ge 35$ cases/API qua 4 chiến lược               |
| **3**  | **Số Test Cases Con người mở rộng (Audit)**    |      **15 Cases**      |   11.9%   | 5 cases/API bù đắp điểm mù của AI (BVA, IDOR, Sanitization)  |
| **4**  | **Tổng số Test Cases trong Suite**             |     **126 Cases**      |   100%    | Phân bổ đều trên 3 file CSV/Excel                            |
| **5**  | **Tổng số Requests thực thi trong Collection** |    **128 Requests**    |   100%    | Bao gồm: 3 Setup + 2 Data-driven + 122 API Tests + 1 Cleanup |
| **6**  | **Tổng số Assertions được kiểm tra**           |   **167 Assertions**   |   100%    | Kiểm tra HTTP Status, Response Body JSON, Data Types         |
| **7**  | **Số Assertions Đạt (Passed)**                 |   **67 Assertions**    | **40.1%** | Các luồng hợp lệ (Happy Path) và lỗi Client chuẩn            |
| **8**  | **Số Assertions Không Đạt (Failed)**           |   **100 Assertions**   | **59.9%** | Do phát hiện các lỗi nghiệp vụ và bảo mật thực tế của SUT    |
| **9**  | **Tổng số nhóm lỗi API phát hiện (Bugs)**      | **4 Nhóm lớn (9 lỗi)** |     -     | Phân quyền RBAC, Validation, State Machine, HTTP Schema      |
| **10** | **Tỷ lệ gửi Request thành công (Network)**     |  **128 / 128 (100%)**  |   100%    | 0 lỗi timeout, 0 lỗi DNS, 0 lỗi kết nối HTTP                 |

---

## 2. PHÂN BỐ TEST CASES THEO TỪNG API (API BREAKDOWN)

Chi tiết số lượng test cases được thiết kế và thực thi cho từng API:

```text
                               PHÂN BỐ TEST CASES
 ┌─────────────────────────┬──────────────┬──────────────┬─────────────┐
 │ API Endpoint            │ AI Sinh (CSV)│ Human Extend │ Tổng Cases  │
 ├─────────────────────────┼──────────────┼──────────────┼─────────────┤
 │ 1. POST /api/register   │   37 cases   │   5 cases    │  42 cases   │
 │ 2. PUT /api/orders/...  │   36 cases   │   5 cases    │  41 cases   │
 │ 3. POST /api/categories │   35 cases   │   5 cases    │  40 cases   │
 ├─────────────────────────┼──────────────┼──────────────┼─────────────┤
 │ TỔNG CỘNG               │  111 cases   │  15 cases    │ 126 cases   │
 └─────────────────────────┴──────────────┴──────────────┴─────────────┘
```

### Chi tiết phân loại theo 4 chiến lược kiểm thử:

| Nhóm Chiến Lược                        | API 1: Register | API 2: Cancel Order | API 3: Categories |   Tổng Cộng   |
| :------------------------------------- | :-------------: | :-----------------: | :---------------: | :-----------: |
| **1. Domain Partitions & BVA**         |    27 cases     |      10 cases       |     12 cases      | **49 cases**  |
| **2. State Transition Testing**        |     2 cases     |      16 cases       |      2 cases      | **20 cases**  |
| **3. Security Testing (SEC-01 -> 07)** |     7 cases     |      10 cases       |     15 cases      | **32 cases**  |
| **4. Schema Validation**               |     6 cases     |       5 cases       |     11 cases      | **22 cases**  |
| **TỔNG TEST CASES**                    |  **42 cases**   |    **41 cases**     |   **40 cases**    | **126 cases** |

---

## 3. DANH SÁCH FILE EXCEL / CSV TEST CASES

Bộ test cases hoàn chỉnh được lưu trữ độc lập tại các file bảng tính chuẩn hóa:

1. **`API1_Test_Cases.csv`**: 42 test cases cho `POST /api/register` (Tên, Email, Password, Phone, Address, SQLi, XSS, ReDoS, BVA).
2. **`API2_Test_Cases.csv`**: 41 test cases cho `PUT /api/orders/:id/cancel` (Chuyển đổi trạng thái FR-10, IDOR SEC-06, Race Condition, Token Injection).
3. **`API3_Test_Cases.csv`**: 40 test cases cho `POST /api/categories` (Role Admin SEC-03, BVA $N=255/256$, SQLi, XSS, Error Schema).

---

## 4. TỔNG KẾT KẾT QUẢ PHÁT HIỆN LỖI (DEFECT SUMMARY)

Newman CLI đã thực thi 100% bộ test và phát hiện **4 nhóm lỗi hành vi API** không tuân thủ tài liệu đặc tả `api_specification.md`:

| Nhóm Lỗi (Defect Category)             |    Mã Lỗi    | Mô Tả Sai Lệch Giữa SUT và Đặc Tả                                                                                                        |    Mức Độ    |
| :------------------------------------- | :----------: | :--------------------------------------------------------------------------------------------------------------------------------------- | :----------: |
| **1. Phân Quyền & Kiểm Soát Truy Cập** | `API-BUG-01` | `POST /api/categories` không kiểm tra `req.user.role === 'admin'`, cho phép User thường tạo danh mục (`200 OK` thay vì `403 Forbidden`). | **Critical** |
| **2. Xác Thực Đầu Vào & Chuẩn Hóa**    | `API-BUG-02` | `POST /api/register` không validate body rỗng/thiếu trường, chấp nhận tạo user thiếu dữ liệu bắt buộc.                                   |   **High**   |
|                                        | `API-BUG-03` | Chấp nhận email không đúng định dạng (thiếu `@`, domain, khoảng trắng).                                                                  |   **High**   |
|                                        | `API-BUG-04` | Không sanitize payload XSS (`<script>alert(1)</script>`) và SQLi trong field `name`, `address`.                                          |   **High**   |
| **3. Trạng Thái & Xung Đột Dữ Liệu**   | `API-BUG-05` | Không kiểm tra trùng lặp email khi đăng ký (trả về `200 OK` thay vì `409 Conflict`).                                                     |   **High**   |
|                                        | `API-BUG-06` | Cho phép tạo danh mục trùng tên đã tồn tại.                                                                                              |  **Medium**  |
|                                        | `API-BUG-07` | Cho phép hủy đơn hàng đang ở trạng thái đang giao `shipping` (vi phạm máy trạng thái FR-10).                                             |   **High**   |
| **4. Chuẩn Mã Phản Hồi & Schema HTTP** | `API-BUG-08` | Trả về mã `200 OK` thay vì mã chuẩn `201 Created` khi tạo mới tài nguyên.                                                                |   **Low**    |
|                                        | `API-BUG-09` | Trả về lỗi `500 Internal Server Error` dạng HTML khi Content-Type không hợp lệ thay vì lỗi `4xx JSON`.                                   |  **Medium**  |

---
