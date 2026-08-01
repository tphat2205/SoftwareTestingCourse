# Báo cáo Task 1B: Thực thi GUI Checklist

**Người thực hiện:** Đoàn Thành Phát - 23127241
**Kịch bản:** Kịch bản B - Trải nghiệm người tham gia

## 1. Phạm vi kiểm thử
Theo như phân công nhóm, tôi phụ trách 3 màn hình sau:
1. **(B1) Dashboard & Tìm kiếm sự kiện:** Trang chủ công khai với carousel sự kiện nổi bật, duyệt theo category và tìm kiếm.
2. **(B1-b) Trang Saved Events (Sự kiện đã lưu):** Quản lý các sự kiện được đánh dấu quan tâm.
3. **(B2) Trang chi tiết sự kiện:** Hiển thị thông tin banner, lịch, nút đăng ký, trạng thái waitlist.

**Lý do chọn màn hình:** 
Các màn hình này tạo thành một luồng tác vụ (User Flow) tự nhiên: Tìm kiếm sự kiện ở Dashboard → Lưu sự kiện quan tâm → Vào Saved Events để quản lý → Mở chi tiết sự kiện để đọc. Sự liền mạch này giúp việc đánh giá Navigation (IA-03) chuẩn xác hơn và là tiền đề lý tưởng để chạy User Testing ở Task 2. Đồng thời, dữ liệu công khai ở các trang này luôn có sẵn, giúp việc kiểm thử không bị gián đoạn.

## 2. Kết quả thực thi Checklist

> **Ghi chú:**
> - Bảng dưới đây đánh giá dựa trên bộ Checklist GUI 77 mục (74 mục chung + 3 mục bổ sung riêng cho Kịch bản B).
> - Các mục `Failed` đều có kèm lý do và tham chiếu đến ảnh chụp trong thư mục `Failed_Screenshots/`.

| ID | IA | Mục kiểm tra | B1 (Dashboard) | B1-b (Saved Events) | B2 (Event Detail) | Notes (Lý do Failed) | Ảnh tham chiếu |
|---|---|---|---|---|---|---|---|
| G-01 | IA-01 | Tiêu đề trang khớp với mục đang chọn... | [ ] | [ ] | [ ] | | |
| ... | ... | ... | ... | ... | ... | ... | ... |
| N-18 | IA-03 | (Mục riêng) Làm mới bộ lọc... | [ ] | [ ] | [ ] | | |
| S-21 | IA-04 | (Mục riêng) Phản hồi trạng thái Lưu... | [ ] | [ ] | [ ] | | |
| S-22 | IA-04 | (Mục riêng) Tạm dừng Carousel... | [ ] | [ ] | [ ] | | |