# Bug & Usability Findings Log — HW03

**Sinh viên:** Đoàn Thành Phát — 23127241
**Kịch bản:** B — User đăng ký tham gia sự kiện
**SUT:** https://prod-dev.ems-fitus.cloud

> Tổng hợp mọi phát hiện từ Task 1B, Task 2 và Task 3. Phải nhất quán với submission trên [Google Form](https://forms.gle/CJQFQCAXcsDbXDMM9).

---

## 0. Bổ sung mục Checklist (Kịch bản B)

*Theo yêu cầu của §4, mỗi sinh viên phải bổ sung ≥ 2 mục checklist riêng biệt cho kịch bản của mình (nếu AI đã sinh không bao quát hết).*

| ID | Nhóm / Tên | Mô tả chi tiết | Hành vi mong đợi (Passed) | Lý do AI bỏ sót / Heuristic |
|---|---|---|---|---|
| **C-B1** | Form đăng ký: Xác nhận hiểu rõ quy định | Form đăng ký (B2) yêu cầu người dùng tick vào ô "Tôi đã đọc và đồng ý với các quy định của sự kiện" trước khi đăng ký. | Có checkbox bắt buộc. Nếu quên tick, submit sẽ báo lỗi cụ thể. | AI chỉ kiểm tra validation cơ bản (F-02, F-03), nhưng bỏ qua validation về mặt pháp lý/chính sách đặc thù của hệ thống sự kiện. Heuristic: Nielsen #5 (Error prevention). |
| **C-B2** | QR Code: Định dạng và hiển thị (Trang My Registrations) | Vé sự kiện hiển thị QR code rõ nét, kèm mã chuỗi bên dưới phòng khi không quét được. | QR Code đủ lớn (≥ 200x200px), có độ tương phản cao, mã chữ/số phụ trợ hiển thị rõ ràng bên dưới. | AI chưa phân tích sâu đặc thù của "vé điện tử" (e-ticket), chỉ tập trung vào các form và bảng dữ liệu chung. Heuristic: Nielsen #1 (Visibility of system status) / Error prevention. |

---

## Danh sách phát hiện

| ID | Kịch bản/Màn hình | Loại | Mô tả | Bước tái hiện / Heuristic | Mức nghiêm trọng | Đề xuất sửa | Tham chiếu ảnh | Thời điểm gửi form |
|---|---|---|---|---|---|---|---|---|
| BUG-B-001 | B/B1 | Bug | Carousel spotlight không tạm dừng khi hover | S-25 / WCAG 2.2.2 | 2 | Thêm pause-on-hover cho carousel | `../02_Task1B_Checklist_Execution/Failed_Screenshots/fail_s25_carousel_1785689527704.png` | *(chưa gửi)* |
| BUG-B-002 | B/B1,B1-b,B2 | Usability | Nút Save/Saved dùng màu đỏ cho trạng thái tích cực | G-05 / Shneiderman #1 | 1 | Đổi sang màu primary hoặc accent (xanh) | `../02_Task1B_Checklist_Execution/Failed_Screenshots/fail_g05_save_red_1785689566491.png` | *(chưa gửi)* |
| BUG-B-003 | B/B1,B1-b | Bug | Search keyword bị mất khi quay lại từ trang chi tiết | N-09 / Shneiderman #8 | 3 | Lưu search state vào URL query params hoặc sessionStorage | `../02_Task1B_Checklist_Execution/Failed_Screenshots/fail_n09_search_after_1785690326219.png` | *(chưa gửi)* |
| BUG-B-004 | B/B1,B1-b,B2 | Usability | Trộn ngôn ngữ EN/VI trên tất cả trang | G-14 / Nielsen #2 | 2 | Dịch toàn bộ UI labels khi chuyển ngôn ngữ; role names cần i18n | `../02_Task1B_Checklist_Execution/Failed_Screenshots/fail_g14_mixed_lang_1785689935819.png` | *(chưa gửi)* |
| BUG-B-005 | B/B1,B1-b,B2 | Bug | Layout vỡ khi zoom 200% | G-13 / WCAG 1.4.4 | 2 | Sử dụng responsive units (rem, %) thay vì px cố định | *(Lỗi layout, khó chụp)* | *(chưa gửi)* |
| BUG-B-006 | B/B1-b | Usability | Unsave không có dialog xác nhận | S-06 / Nielsen #5 | 2 | Thêm dialog "Bạn có chắc muốn bỏ lưu sự kiện này?" | `../02_Task1B_Checklist_Execution/Failed_Screenshots/fail_s06_unsave_button_1785690261269.png` | *(chưa gửi)* |
| BUG-B-007 | B/B1-b | Usability | Không có Undo sau khi Unsave | S-08 / Shneiderman #6 | 2 | Thêm nút Undo trên toast notification | *(Không có nút Undo)* | *(chưa gửi)* |
| BUG-B-008 | B/B1,B1-b | Usability | Search bar thiếu label thường trực | F-01 / Nielsen #6 | 1 | Thêm label "Tìm kiếm" phía trên search bar | `../02_Task1B_Checklist_Execution/Failed_Screenshots/fail_f01_search_no_label_1785689631111.png` | *(chưa gửi)* |
| BUG-B-009 | B/B1,B1-b,B2 | Usability | Nhãn Save/Saved/Unsave/Save event không nhất quán | G-02 / Shneiderman #1 | 1 | Thống nhất dùng "Save"/"Saved" trên mọi trang | `../02_Task1B_Checklist_Execution/Failed_Screenshots/fail_g02_save_event_1785690214527.png` | *(chưa gửi)* |
| BUG-B-010 | B/B1,B2 | Bug | Viền focus không rõ ràng trên cards và checkboxes | F-13 / WCAG 2.4.7 | 2 | Thêm outline rõ ràng (2px solid) khi :focus-visible | *(Không có viền focus)* | *(chưa gửi)* |
| BUG-B-011 | B/B2 | Usability | Registration form không đánh dấu bắt buộc | F-02 / Nielsen #5 | 1 | Thêm dấu * hoặc text "Bắt buộc chọn ≥ 1 vai trò" | `../02_Task1B_Checklist_Execution/Failed_Screenshots/fail_f02_s11_registration_1785690112316.png` | *(chưa gửi)* |
| BUG-B-012 | B/B2 | Usability | Registration roles thiếu chú giải màu | S-11 / Nielsen #6 | 1 | Thêm legend giải nghĩa 4 màu trạng thái | `../02_Task1B_Checklist_Execution/Failed_Screenshots/fail_f02_s11_registration_1785690112316.png` | *(chưa gửi)* |
| BUG-B-013 | B/B1 | Bug | Một số event card thiếu thumbnail | G-10 | 1 | Hiện placeholder có nội dung (tên sự kiện, icon category) | `../02_Task1B_Checklist_Execution/Failed_Screenshots/fail_g10_placeholder_1785689883882.png` | *(chưa gửi)* |

**Tổng: 13 phát hiện** (7 Bug + 6 Usability)

| Severity | Số lượng |
|---|---|
| 3 — Major | 1 |
| 2 — Minor | 6 |
| 1 — Cosmetic | 6 |

> **Lưu ý:** Phát hiện từ Task 2 (User Testing) và Task 3 (Cross-Platform) sẽ được bổ sung vào bảng này sau khi hoàn thành.
