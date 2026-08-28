## DANH SÁCH 10 TÍNH NĂNG POSTMAN ĐÃ SỬ DỤNG (POSTMAN FEATURES)

1. **Workspaces & Collections:** Phân chia thư mục khoa học theo từng API, nhóm Setup (Pre-requisites), Data-Driven và Cleanup.
2. **Environment Variables:** Quản lý tập trung các biến môi trường qua `EShop_Environment.postman_environment.json` (`base_url`, `student_id`, `admin_token`, `user_token`, `test_order_id`).
3. **Collection Variables:** Khai báo các giá trị mặc định cho toàn bộ collection (`student_id: 23127241`, credentials).
4. **Collection-Level Pre-request Scripts:** Tự động tiêm Header `X-Student-Id: 23127241` vào 100% các request được gửi đi.
5. **Request-Level Pre-request Scripts:** Thiết lập trạng thái và ghi log tiền xử lý cho các request đặc thù.
6. **Test Scripts & Assertions:** Sử dụng thư viện `pm.test()`, `pm.expect()`, `pm.response.to.have.status()` để kiểm tra mã phản hồi, schema JSON và dữ liệu trả về.
7. **Dynamic Variables (Postman Mock/Faker Data):** Sử dụng các biến nội suy ngẫu nhiên như `{{$randomEmail}}`, `{{$randomInt}}` để tạo dữ liệu độc nhất khi đăng ký.
8. **Data-Driven Testing (Runner with Data File):** Thực thi lặp tự động dựa trên file dữ liệu ngoài `data.json` với các biến `{{data_name}}`, `{{data_email}}`, `{{data_password}}`.
9. **Chaining Requests (Token Extraction):** Trích xuất tự động `res.token` từ API Login và `res.orderId` từ API Checkout để truyền động vào các request kế tiếp.
10. **Console Logging & Newman CLI / HTML Extra Reporter:** Ghi log quá trình chạy ra Console và trích xuất báo cáo HTML tương tác hoàn chỉnh.