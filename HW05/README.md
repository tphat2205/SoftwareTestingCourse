# HW05 - Performance Testing - Test Summary & Self-Assessment

## 1. General Information

- **Student name:** ĐOÀN THÀNH PHÁT
- **Student ID:** 23127241
- **Class / Cohort:** 23KTPM2
- **Demo Video Link:** [CHÈN LINK YOUTUBE UNLISTED VÀO ĐÂY]
- **GitHub Repository:** https://github.com/tphat2205/SoftwareTestingCourse/tree/main/HW05

## 2. Test Summary Report

| Tiêu chí                      | Kết quả thực hiện                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Scenarios Run**             | Đã thực hiện đủ 4 kịch bản: Load Test, Stress Test, Spike Test, và Endurance Test.                                                                                                                                                                                                                                                                                                                                                                                  |
| **Endpoint Groups Covered**   | 1. **Read-heavy:** `GET /api/orders/:id` (Load Test)<br>2. **Auth-heavy:** `POST /api/reset-password` (Stress Test)<br>3. **Transactional:** `PUT /api/orders/:id/cancel` (Spike Test)                                                                                                                                                                                                                                                                              |
| **Endurance Threshold**       | Ngưỡng chịu đựng đo được trên môi trường localhost là **~48.3 req/sec** (với 100 Virtual Users duy trì trong 15 phút, tỷ lệ lỗi 0%, P99 Response Time < 6.0ms). Bộ nhớ cao nhất đạt 39.2 MB (không rò rỉ RAM).                                                                                                                                                                                                                                                      |
| **Bugs / Performance Issues** | - **Functional Bugs:** 0 bugs. Hệ thống xử lý đúng logic nghiệp vụ (trả về 400 Bad Request một cách hợp lý khi token bị dùng lại hoặc order đã cancel). Do không có lỗi chức năng nên **em không có phần Bug Report / GitHub Issues**.<br>- **Performance Limitation:** Ứng dụng Node.js chạy với SQLite Local bị nghẽn (bottleneck) ở mức throughput rất cao do giới hạn xử lý connection của hệ điều hành và file lock, nhưng phục hồi ngay lập tức khi tải giảm. |

## 3. Self-Assessment

Dựa trên các yêu cầu hoàn thành của HW05 (kể cả phần Human Review và Misinterpretation Hunt sâu sát), em tự đánh giá điểm số như sau:

| **No.** | **Criteria**                                                                      | **Grade** | **Self-Assessed Grade** |
| :------ | :-------------------------------------------------------------------------------- | :-------- | :---------------------- |
| **1**   | Task 1 — Load testing                                                             | 20        | **20**                  |
| **2**   | Task 1 — Stress testing                                                           | 20        | **20**                  |
| **3**   | Task 1 — Spike testing                                                            | 20        | **20**                  |
| **4**   | Task 2 — AI analysis + misinterpretation hunt (with correct values from raw logs) | 10        | **10**                  |
| **5**   | Task 3 — Continuous Performance Testing proposal (G9.6)                           | 10        | **10**                  |
| **6**   | Agent Skills                                                                      | 10        | **10**                  |
|         | **Total**                                                                         | **100**   | **100**                 |
