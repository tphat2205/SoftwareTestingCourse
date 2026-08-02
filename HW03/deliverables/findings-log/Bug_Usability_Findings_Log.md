# Bug & Usability Findings Log — HW03

**Sinh viên:** Đoàn Thành Phát — 23127241
**Kịch bản:** B — User đăng ký tham gia sự kiện
**SUT:** https://prod-dev.ems-fitus.cloud

> Tổng hợp mọi phát hiện từ Task 1B, Task 2 và Task 3. Phải nhất quán với submission trên [Google Form](https://forms.gle/CJQFQCAXcsDbXDMM9).

---

## Danh sách phát hiện

| ID | Kịch bản/Màn hình | Loại | Mô tả | Bước tái hiện / Heuristic | Mức nghiêm trọng | Đề xuất sửa | Tham chiếu ảnh | Thời điểm gửi form |
|---|---|---|---|---|---|---|---|---|
| BUG-B-001 | B/B1 | Bug | Carousel spotlight không tạm dừng khi hover | S-25 / WCAG 2.2.2 | 2 | Thêm pause-on-hover cho carousel | *(cần chụp)* | *(chưa gửi)* |
| BUG-B-002 | B/B1,B1-b,B2 | Usability | Nút Save/Saved dùng màu đỏ cho trạng thái tích cực | G-05 / Shneiderman #1 | 1 | Đổi sang màu primary hoặc accent (xanh) | *(cần chụp)* | *(chưa gửi)* |
| BUG-B-003 | B/B1,B1-b | Bug | Search keyword bị mất khi quay lại từ trang chi tiết | N-09 / Shneiderman #8 | 3 | Lưu search state vào URL query params hoặc sessionStorage | *(cần chụp)* | *(chưa gửi)* |
| BUG-B-004 | B/B1,B1-b,B2 | Usability | Trộn ngôn ngữ EN/VI trên tất cả trang | G-14 / Nielsen #2 | 2 | Dịch toàn bộ UI labels khi chuyển ngôn ngữ; role names cần i18n | *(cần chụp)* | *(chưa gửi)* |
| BUG-B-005 | B/B1,B1-b,B2 | Bug | Layout vỡ khi zoom 200% | G-13 / WCAG 1.4.4 | 2 | Sử dụng responsive units (rem, %) thay vì px cố định | *(cần chụp)* | *(chưa gửi)* |
| BUG-B-006 | B/B1-b | Usability | Unsave không có dialog xác nhận | S-06 / Nielsen #5 | 2 | Thêm dialog "Bạn có chắc muốn bỏ lưu sự kiện này?" | *(cần chụp)* | *(chưa gửi)* |
| BUG-B-007 | B/B1-b | Usability | Không có Undo sau khi Unsave | S-08 / Shneiderman #6 | 2 | Thêm nút Undo trên toast notification | *(cần chụp)* | *(chưa gửi)* |
| BUG-B-008 | B/B1,B1-b | Usability | Search bar thiếu label thường trực | F-01 / Nielsen #6 | 1 | Thêm label "Tìm kiếm" phía trên search bar | *(cần chụp)* | *(chưa gửi)* |
| BUG-B-009 | B/B1,B1-b,B2 | Usability | Nhãn Save/Saved/Unsave/Save event không nhất quán | G-02 / Shneiderman #1 | 1 | Thống nhất dùng "Save"/"Saved" trên mọi trang | *(cần chụp)* | *(chưa gửi)* |
| BUG-B-010 | B/B1,B2 | Bug | Viền focus không rõ ràng trên cards và checkboxes | F-13 / WCAG 2.4.7 | 2 | Thêm outline rõ ràng (2px solid) khi :focus-visible | *(cần chụp)* | *(chưa gửi)* |
| BUG-B-011 | B/B2 | Usability | Registration form không đánh dấu bắt buộc | F-02 / Nielsen #5 | 1 | Thêm dấu * hoặc text "Bắt buộc chọn ≥ 1 vai trò" | *(cần chụp)* | *(chưa gửi)* |
| BUG-B-012 | B/B2 | Usability | Registration roles thiếu chú giải màu | S-11 / Nielsen #6 | 1 | Thêm legend giải nghĩa 4 màu trạng thái | *(cần chụp)* | *(chưa gửi)* |
| BUG-B-013 | B/B1 | Bug | Một số event card thiếu thumbnail | G-10 | 1 | Hiện placeholder có nội dung (tên sự kiện, icon category) thay vì icon ảnh xám | *(cần chụp)* | *(chưa gửi)* |

**Tổng: 13 phát hiện** (7 Bug + 6 Usability)

| Severity | Số lượng |
|---|---|
| 3 — Major | 1 |
| 2 — Minor | 6 |
| 1 — Cosmetic | 6 |

> **Lưu ý:** Phát hiện từ Task 2 (User Testing) và Task 3 (Cross-Platform) sẽ được bổ sung vào bảng này sau khi hoàn thành.
