# Task 2 — User Testing: Kịch bản B — User đăng ký tham gia sự kiện

**Sinh viên:** Đoàn Thành Phát — 23127241
**Kịch bản:** B — User đăng ký tham gia sự kiện
**Ngày thiết kế:** 02/08/2026
**SUT:** https://prod-dev.ems-fitus.cloud

---

## Giai đoạn 1 — Thiết kế & Chuẩn bị

### 1.1 Kịch bản tác vụ (Task Scenario)

**Bối cảnh:** Bạn là sinh viên Khoa CNTT, vừa nghe bạn bè nói về một workshop thú vị sắp diễn ra. Bạn muốn tìm, đăng ký tham gia và quản lý danh sách sự kiện yêu thích.

**Tác vụ (hướng mục tiêu, KHÔNG chỉ từng bước):**

> *"Hãy tìm một sự kiện workshop đang mở đăng ký trên hệ thống EMS. Sau khi tìm được, hãy lưu sự kiện đó vào danh sách yêu thích. Tiếp theo, hãy đăng ký tham gia sự kiện đó với vai trò sinh viên. Cuối cùng, hãy kiểm tra danh sách sự kiện đã lưu của bạn."*

**Màn hình bao phủ:**
- B1: Dashboard & Tìm kiếm (tìm sự kiện, lọc, save)
- B2: Trang chi tiết sự kiện (xem thông tin, đăng ký)
- B1-b: Trang Saved Events (kiểm tra danh sách đã lưu)

**Tiêu chí thành công:**
- ✅ **Hoàn thành:** Tìm được event, save thành công, đăng ký thành công, xem được Saved Events
- ⚠️ **Một phần:** Hoàn thành ≥ 2/4 bước trên
- ❌ **Thất bại:** Không hoàn thành được hoặc bỏ cuộc

---

### 1.2 Thứ cần đo

| Chỉ số | Cách đo | Ghi chú |
|---|---|---|
| **Task success** | Hoàn thành / Một phần / Thất bại | Theo tiêu chí ở 1.1 |
| **Time on task** | Bấm giờ từ lúc bắt đầu đến khi hoàn thành | Tính bằng giây |
| **Số lỗi** | Đếm số lần bấm sai, nhầm trang, hành động không mong muốn | |
| **Số lần do dự** | Đếm số lần dừng > 3 giây hoặc hỏi "giờ phải làm gì?" | |
| **Điểm SUS** | 10 câu, thang Likert 1–5 (xem §1.3) | Chấm theo Brooke (1996) |
| **Câu hỏi mở** | 4 câu (clarity, error recovery, speed, trust) | Ghi chép tự do |

---

### 1.3 Bảng câu hỏi SUS (System Usability Scale)

Sau khi hoàn thành tác vụ, người tham gia điền bảng sau (1 = Rất không đồng ý → 5 = Rất đồng ý):

| # | Câu hỏi | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| 1 | Tôi nghĩ tôi sẽ muốn dùng hệ thống này thường xuyên | ☐ | ☐ | ☐ | ☐ | ☐ |
| 2 | Tôi thấy hệ thống phức tạp không cần thiết | ☐ | ☐ | ☐ | ☐ | ☐ |
| 3 | Tôi thấy hệ thống dễ sử dụng | ☐ | ☐ | ☐ | ☐ | ☐ |
| 4 | Tôi nghĩ tôi sẽ cần sự hỗ trợ kỹ thuật để dùng hệ thống | ☐ | ☐ | ☐ | ☐ | ☐ |
| 5 | Tôi thấy các chức năng trong hệ thống được tích hợp tốt | ☐ | ☐ | ☐ | ☐ | ☐ |
| 6 | Tôi thấy có quá nhiều sự không nhất quán trong hệ thống | ☐ | ☐ | ☐ | ☐ | ☐ |
| 7 | Tôi nghĩ hầu hết mọi người sẽ học dùng hệ thống này rất nhanh | ☐ | ☐ | ☐ | ☐ | ☐ |
| 8 | Tôi thấy hệ thống rất rườm rà để sử dụng | ☐ | ☐ | ☐ | ☐ | ☐ |
| 9 | Tôi cảm thấy rất tự tin khi sử dụng hệ thống | ☐ | ☐ | ☐ | ☐ | ☐ |
| 10 | Tôi cần học nhiều thứ trước khi có thể bắt đầu dùng hệ thống | ☐ | ☐ | ☐ | ☐ | ☐ |

**Cách chấm SUS:**
- Câu lẻ (1,3,5,7,9): điểm = `x − 1`
- Câu chẵn (2,4,6,8,10): điểm = `5 − x`
- Tổng 10 giá trị (0–40) × 2.5 = điểm SUS (0–100)
- Trung bình = **68**. Trên 80.3 = hạng A (top 10%)

---

### 1.4 Câu hỏi probe (sau khi điền SUS)

1. **Clarity:** "Có lúc nào bạn không hiểu phải làm gì tiếp theo không? Ở đâu?"
2. **Error recovery:** "Nếu bạn bấm nhầm, bạn có tìm được cách quay lại/sửa dễ dàng không?"
3. **Speed:** "Bạn cảm thấy hệ thống phản hồi nhanh hay chậm? Có chỗ nào bạn phải chờ lâu không?"
4. **Trust:** "Bạn có tin rằng đăng ký của mình đã được ghi nhận thành công không? Vì sao?"

---

### 1.5 Bảng người tham gia (điền khi tuyển xong)

| # | Họ tên | Vai trò | Liên hệ (Zalo/SĐT — ẩn 4 số giữa) | Ghi chú |
|---|---|---|---|---|
| 1 | *(tên)* | Sinh viên | 09xx-xxxx-xx | |
| 2 | *(tên)* | Sinh viên | 09xx-xxxx-xx | |
| 3 | *(tên)* | Sinh viên | 09xx-xxxx-xx | |
| 4 | *(tên)* | Sinh viên | 09xx-xxxx-xx | |
| 5 | *(tên)* | Sinh viên | 09xx-xxxx-xx | |

> **Lưu ý:** Người tham gia phải là người NGOÀI lớp Software Testing. TA có thể gọi xác minh 2 người.

---

### 1.6 Template Note quan sát (dùng cho mỗi phiên)

```
## Phiên #[số] — [Tên người tham gia]
**Ngày:** [ngày]
**Thời gian bắt đầu:** [giờ]
**Thời gian kết thúc:** [giờ]
**Time on task:** [giây]
**Task success:** Hoàn thành / Một phần / Thất bại

### Quan sát
| Thời điểm | Màn hình | Quan sát | Loại |
|---|---|---|---|
| [phút:giây] | [B1/B1-b/B2] | [mô tả hành vi] | Vướng / Lỗi / Do dự / Bực bội |

### Số liệu
- Số lỗi: [số]
- Số lần do dự: [số]

### Think-aloud highlights
- "[trích dẫn]"
- "[trích dẫn]"

### Điểm SUS
[ghi 10 điểm thô → tính tổng → × 2.5]

### Câu probe
1. Clarity: "[trả lời]"
2. Error recovery: "[trả lời]"
3. Speed: "[trả lời]"
4. Trust: "[trả lời]"
```

---

## Giai đoạn 2 — Chạy 5 phiên

*(Phần này sẽ được điền sau khi chạy xong 5 phiên user testing)*

### Phiên #1
*(đang chờ)*

### Phiên #2
*(đang chờ)*

### Phiên #3
*(đang chờ)*

### Phiên #4
*(đang chờ)*

### Phiên #5
*(đang chờ)*

---

## Giai đoạn 3 — Thu thập, phân tích & báo cáo

*(Phần này sẽ được viết sau khi hoàn thành 5 phiên)*

### 3.1 Bảng chỉ số tác vụ

| # | Người tham gia | Task success | Time (s) | Số lỗi | Số do dự | SUS |
|---|---|---|---|---|---|---|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |
| **TB** | | | | | | |

### 3.2 Phân tích usability

*(Gom điểm đau tương tự, tách lỗi đơn lẻ khỏi vấn đề thiết kế hệ thống)*

### 3.3 Danh sách phát hiện theo severity

| # | Phát hiện | Severity (0–4) | Probability (x/5) | Màn hình | Heuristic vi phạm |
|---|---|---|---|---|---|
| | | | | | |

### 3.4 Khuyến nghị theo ưu tiên

| Ưu tiên | Khuyến nghị | Severity | Effort |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |
