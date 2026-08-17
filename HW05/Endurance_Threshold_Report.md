# Báo cáo: Ngưỡng chịu đựng của hệ thống (Endurance Threshold)

**Mục đích:** Xác định ngưỡng chịu đựng của hệ thống trên cấu hình phần cứng hiện tại thông qua bài kiểm tra chịu tải dài hạn (Endurance/Soak Test).

## 1. Thông số kịch bản test

- **Tên kịch bản:** 23127241_Endurance_20260817.jmx
- **Thời gian chạy:** 15 phút (900 giây)
- **Tải duy trì:** 100 Virtual Users (Threads)
- **API Target:** `GET /api/orders/:id` (Read-heavy)

## 2. Kết quả thu được (Dữ liệu từ JTL)

Dựa trên kết quả phân tích log (`endurance_results.jtl` với 43,327 requests), phần cứng hiện tại đạt được các chỉ số ổn định như sau:

| Chỉ số (Metric)                                        | Kết quả đạt được  | Đánh giá                                                                      |
| :----------------------------------------------------- | :---------------- | :---------------------------------------------------------------------------- |
| **Thông lượng tối đa ổn định (Max Stable RPS)**        | **~48.3 req/sec** | Hệ thống duy trì mức RPS này đều đặn trong suốt 15 phút mà không bị sụt giảm. |
| **Tỷ lệ lỗi (Error Rate)**                             | **0.00%**         | Không có bất kỳ request nào bị rớt hoặc trả về lỗi (0/43327 errors).          |
| **Thời gian phản hồi trung bình (Mean Response Time)** | **2.46 ms**       | Cực kỳ nhanh, phản hồi gần như tức thời nhờ SQLite local.                     |
| **Độ trễ tối đa (Max Response Time)**                  | **83.0 ms**       | Spike cao nhất cũng mất chưa tới 0.1s, không ảnh hưởng đến trải nghiệm.       |
| **Phân vị 95% (p95)**                                  | **5.0 ms**        | 95% số request được xử lý dưới 5ms.                                           |
| **Phân vị 99% (p99)**                                  | **6.0 ms**        | 99% số request được xử lý dưới 6ms.                                           |

## 3. Mức tiêu thụ tài nguyên phần cứng (Resource Monitoring)

- **CPU Usage:** Hệ thống Node.js tiêu thụ khoảng `<1%` CPU trong suốt quá trình test.
- **Memory Ceiling (Trần RAM):** Dung lượng RAM tiêu thụ lớn nhất của tiến trình `node.exe` dừng ở mức `39.2 MB` và không có hiện tượng rò rỉ bộ nhớ (Memory Leak) sau 15 phút chạy liên tục.

## 4. Kết luận

Dựa trên cấu hình phần cứng nội bộ, ứng dụng backend (`server.js`) cùng SQLite database có **ngưỡng chịu đựng (endurance threshold) ít nhất là ~48 req/s**. Tại mức tải này, hệ thống hoạt động vô cùng ổn định (0% lỗi) và không có dấu hiệu suy thoái hiệu năng theo thời gian. Thời gian phản hồi luôn được giữ ở mức xuất sắc (p99 < 10ms).
