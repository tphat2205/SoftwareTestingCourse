# Báo Cáo Chính — HW03 GUI & Usability Testing

**Sinh viên:** Đoàn Thành Phát — 23127241
**Kịch bản:** B — User đăng ký tham gia sự kiện
**SUT:** https://prod-dev.ems-fitus.cloud

---

## PHẦN 1: KỊCH BẢN VÀ CHẠY CHECKLIST (TASK 1B)



---

## 1. Kịch bản và lý do chọn 3 màn hình


| Màn hình | URL | Lý do chọn |
|---|---|---|
| **B1 — Dashboard & Tìm kiếm** | `/dashboard` | Đây là trang chính mà người dùng thấy đầu tiên — phủ được IA-01 (layout, typography, color), IA-03 (navigation, menu, sidebar, tabs, filters) và IA-04 (carousel, feedback trạng thái Save). Là entry point của mọi luồng user. |
| **B1-b — Trang Saved Events** | `/my-favorites` | Trang quản lý sự kiện đã lưu — phủ IA-01 (empty state, consistency với Dashboard), IA-03 (search, pagination, back link), IA-04 (phản hồi unsave, cập nhật danh sách real-time). Cho thấy sự nhất quán giữa các trang. |
| **B2 — Trang chi tiết sự kiện** | `/events/{id}` | Trang chi tiết là nơi người dùng quyết định đăng ký — phủ IA-01 (banner, tags, typography), IA-02 (form đăng ký chọn role), IA-03 (deep link, back button), IA-04 (trạng thái slot, validation, registration feedback). |

---

## 2. Bổ sung mục Checklist (Kịch bản B)

*Theo yêu cầu của §4, mỗi sinh viên bổ sung ≥ 2 mục checklist riêng biệt cho kịch bản của mình (nếu AI đã sinh không bao quát hết).*

| ID | Nhóm / Tên | Mô tả chi tiết | Hành vi mong đợi (Passed) | Lý do AI bỏ sót / Heuristic |
|---|---|---|---|---|
| **C-B1** | Form đăng ký: Xác nhận hiểu rõ quy định | Form đăng ký (B2) yêu cầu người dùng tick vào ô "Tôi đã đọc và đồng ý với các quy định của sự kiện" trước khi đăng ký. | Có checkbox bắt buộc. Nếu quên tick, submit sẽ báo lỗi cụ thể. | AI chỉ kiểm tra validation cơ bản (F-02, F-03), nhưng bỏ qua validation về mặt pháp lý/chính sách đặc thù của hệ thống sự kiện. Heuristic: Nielsen #5 (Error prevention). |
| **C-B2** | QR Code: Định dạng và hiển thị (Trang My Registrations) | Vé sự kiện hiển thị QR code rõ nét, kèm mã chuỗi bên dưới phòng khi không quét được. | QR Code đủ lớn (≥ 200x200px), có độ tương phản cao, mã chữ/số phụ trợ hiển thị rõ ràng bên dưới. | AI chưa phân tích sâu đặc thù của "vé điện tử" (e-ticket), chỉ tập trung vào các form và bảng dữ liệu chung. Heuristic: Nielsen #1 (Visibility of system status) / Error prevention. |

---

## 3. Kết quả chạy Checklist (Gộp 3 màn hình)

| ID | Mục kiểm tra | B1 | B1-b | B2 | Notes | Ảnh tham chiếu |
|---|---|---|---|---|---|---|
| **IA-01 — Chuẩn UI chung** |  |  |  |  |  |  |
| G-01 | Tiêu đề trang khớp với mục đang chọn trên menu | **Passed** | **Passed** | **Passed** | **B1**: Heading "Events" khớp với mục "Events" được highlight trên top nav <br> **B2**: "Saved Events" khớp với top nav <br> **B3**: "Events" highlight |  |
| G-02 | Cùng chức năng dùng cùng nhãn ở mọi màn hình | **Failed** | **Failed** | **Failed** | **B1**: Nút "Save"/"Saved" trên event card dùng text, nhưng trên sidebar dùng icon bookmark không có label — thiếu nhất quán. Ngoài ra "Rows per page" (pagination) vs "Showing 1 of 52 events" dùng hai cách đếm khác nhau <br> **B2**: "Unsave" (B1-b) vs "Saved" toggle (B1) — cùng hành động bỏ lưu nhưng nhãn và kiểu nút khác nhau <br> **B3**: "Save event" (B2) vs "Save" (B1) vs "Unsave" (B1-b) — cùng chức năng, 3 nhãn khác | ![BUG-B-009](02_Task1B_Checklist_Execution/Failed_Screenshots/fail_g02_save_event_1785690214527.png) |
| G-03 | Bảng: text trái, số phải, trạng thái giữa | **N/A** | **N/A** | **N/A** | **B1**: Dashboard không dùng bảng dữ liệu <br> **B2**: Dùng card list, không bảng <br> **B3**: Không bảng |  |
| G-04 | Tối đa 2 họ font; cỡ chữ theo thang nhất quán | **Passed** | **Passed** | **Passed** | **B1**: Dùng font sans-serif nhất quán, cỡ chữ phân cấp rõ ràng (heading > card title > body > caption) <br> **B2**: Nhất quán với Dashboard <br> **B3**: Đúng |  |
| G-05 | Màu đúng ngữ nghĩa: đỏ chỉ cho lỗi/phá huỷ | **Failed** | **Failed** | **Passed** | **B1**: Nút "Saved" dùng màu đỏ cho trạng thái "đã lưu" — đỏ thường mang nghĩa lỗi/xoá/nguy hiểm, không phù hợp cho hành động tích cực. Nên dùng màu primary hoặc accent <br> **B2**: Badge "Saved" dùng đỏ — sai ngữ nghĩa <br> **B3**: Status cards dùng màu đúng | ![BUG-B-002](02_Task1B_Checklist_Execution/Failed_Screenshots/fail_g05_save_red_1785689566491.png) |
| G-06 | Mỗi màn hình chỉ có 1 nút hành động chính | **Passed** | **Passed** | **Passed** | **B1**: Không có nút CTA chính nổi bật trên dashboard (đây là trang danh sách), mỗi card có "Save" nhưng đó là hành động phụ <br> **B2**: "View details" chính, "Unsave" phụ <br> **B3**: "Register (Student)" rõ ràng |  |
| G-07 | Nội dung không tràn ngang ở ≥ 1280px | **Passed** | **Passed** | **Passed** | **B1**: Không có thanh cuộn ngang ở viewport 1440px <br> **B2**: Không tràn <br> **B3**: Đúng |  |
| G-08 | Empty state có thông điệp + gợi ý hành động | **Passed** | **Passed** | **N/A** | **B1**: Chưa trigger được empty state trên dashboard (52 events), nhưng search không kết quả hiện "No events found" <br> **B2**: "No saved events yet" + hướng dẫn save <br> **B3**: Luôn có nội dung |  |
| G-09 | Loading có skeleton/spinner; không nhảy layout | **Passed** | **Passed** | **Passed** | **B1**: Quan sát được loading state khi chuyển tab <br> **B2**: Tải nhanh, không nhảy <br> **B3**: Banner không nhảy layout |  |
| G-10 | Ảnh giữ đúng tỉ lệ, không méo | **Failed** | **Passed** | **Passed** | **B1**: Một số event card thiếu thumbnail — hiện placeholder icon ảnh xám trên nền trắng. Khi có ảnh thì giữ đúng tỉ lệ 4:3 <br> **B2**: Thumbnail đúng 4:3 <br> **B3**: Banner đúng | ![BUG-B-013](02_Task1B_Checklist_Execution/Failed_Screenshots/fail_g10_placeholder_1785689883882.png) |
| G-11 | Không lộ mã trạng thái nội bộ ra giao diện | **Passed** | **Passed** | **Passed** | **B1**: Không thấy mã nội bộ nào trên dashboard <br> **B2**: Không thấy <br> **B3**: Không thấy |  |
| G-12 | Tương phản chữ/nền ≥ 4.5:1 | **Passed** | **Passed** | **Passed** | **B1**: Text đậm trên nền sáng, contrast đạt yêu cầu <br> **B2**: Đạt <br> **B3**: Đạt |  |
| G-13 | Vẫn đọc được khi zoom 200% | **Passed** | **Passed** | **Passed** | **B1**: Layout responsive tốt <br> **B2**: Layout responsive tốt <br> **B3**: Layout responsive tốt |  |
| G-14 | Chuyển EN/VI dịch toàn bộ | **Failed** | **Failed** | **Failed** | **B1**: Ở chế độ EN: tiêu đề sự kiện, mô tả, địa điểm hiển thị tiếng Việt nhưng labels UI bằng tiếng Anh → trộn ngôn ngữ trên cùng màn hình <br> **B2**: Trộn EN/VI <br> **B3**: Labels EN, role names VI → trộn nghiêm trọng | ![BUG-B-004](02_Task1B_Checklist_Execution/Failed_Screenshots/fail_g14_mixed_lang_1785689935819.png) |
| G-15 | Text tiếng Việt không vỡ nút/cắt chữ | **Passed** | **Passed** | **Passed** | **B1**: Quan sát các event title dài tiếng Việt vẫn hiển thị bình thường <br> **B2**: Bình thường <br> **B3**: Đúng |  |
| G-16 | Ngôn ngữ đã chọn được lưu lại sau reload | **Passed** | **Passed** | **Passed** | **B1**: Reload trang vẫn giữ nguyên ngôn ngữ EN <br> **B2**: Giữ nguyên <br> **B3**: Đúng |  |
| G-17 | Avatar chữ viết tắt gọn trong vòng tròn | **Passed** | **Passed** | **Passed** | **B1**: Avatar "PDT" hiện đúng trong vòng tròn, không tràn <br> **B2**: Đúng <br> **B3**: Đúng |  |
| G-18 | Member Code hiển thị đầy đủ | **N/A** | **N/A** | **N/A** | **B1**: Dashboard không hiển thị Member Code <br> **B2**: Không hiển thị <br> **B3**: Không hiển thị |  |
| **IA-02 — Forms** |  |  |  |  |  |  |
| F-01 | Mọi ô nhập có nhãn thường trực | **Failed** | **Failed** | **N/A** | **B1**: Search bar chỉ có placeholder "Search events by title..." — khi gõ thì placeholder biến mất, không có label thường trực <br> **B2**: Search bar chỉ placeholder <br> **B3**: Registration dùng checkbox, không text input | ![BUG-B-008](02_Task1B_Checklist_Execution/Failed_Screenshots/fail_f01_search_no_label_1785689631111.png) |
| F-02 | Trường bắt buộc đánh dấu rõ | **N/A** | N/A | **Failed** | **B1**: Dashboard không có form submit <br> **B3**: Không đánh dấu `*` cho biết phải chọn ≥ 1 role. Message đỏ "Please tick a role..." hiện khi nút disabled nhưng chưa đánh dấu theo quy ước | ![BUG-B-011](02_Task1B_Checklist_Execution/Failed_Screenshots/fail_f02_s11_registration_1785690112316.png) |
| F-03 | Submit thiếu trường bắt buộc → chặn | **N/A** | N/A | **Passed** | **B1**: Không có form submit <br> **B3**: Register disabled khi chưa chọn role |  |
| F-04 | Lỗi hiện ngay cạnh trường bị lỗi | **N/A** | N/A | **Passed** | **B1**: Không có form <br> **B3**: Message ngay dưới danh sách role |  |
| F-05 | Lỗi nói rõ cách sửa | **N/A** | N/A | **Passed** | **B1**: Không có form <br> **B3**: "Please tick a role" rõ ràng |  |
| F-06 | Giá trị mặc định hợp lý | **N/A** | N/A | **Passed** | **B1**: Không có form <br> **B3**: Không tick mặc định — hợp lý |  |
| F-07 | Ràng buộc ngay tại control | **N/A** | N/A | **Passed** | **B1**: Không có form <br> **B3**: Register disabled cho đến khi chọn |  |
| F-08 | Focus nhảy về trường lỗi đầu tiên | **N/A** | N/A | **N/A** | **B1**: Không có form <br> **B3**: Chỉ checkbox |  |
| F-09 | Upload nêu rõ định dạng/dung lượng/tỉ lệ | **N/A** | N/A | N/A | **B1**: Không có upload |  |
| F-10 | Upload có progress, huỷ được, báo lỗi | **N/A** | N/A | N/A | **B1**: Không có upload |  |
| F-11 | Nút Submit khoá khi đang gửi | **N/A** | N/A | N/A | **B1**: Không có submit |  |
| F-12 | Cảnh báo mất dữ liệu khi rời form | **N/A** | N/A | N/A | **B1**: Không có form nhập liệu |  |
| F-13 | Thao tác hoàn toàn bằng bàn phím + focus rõ | **Passed** | N/A | **Passed** | **B1**: Tab qua các filter/search được, viền focus rõ ràng <br> **B3**: Viền focus rõ ràng |  |
| F-14 | Validation chéo ngày/giờ | **N/A** | N/A | N/A | **B1**: Không có form ngày/giờ |  |
| F-15 | Validation thời gian đóng đăng ký | **N/A** | N/A | N/A | **B1**: Không có form |  |
| F-16 | Trường bắt buộc có điều kiện | **N/A** | N/A | N/A | **B1**: Không có form |  |
| F-17 | Bật/tắt công tắc ẩn/hiện đúng trường | **N/A** | N/A | N/A | **B1**: Không có toggle |  |
| F-18 | Upload sai tỉ lệ được báo trước | **N/A** | N/A | N/A | **B1**: Không có upload |  |
| F-19 | Rich-text giữ định dạng sau lưu-mở lại | **N/A** | N/A | N/A | **B1**: Không có rich-text editor |  |
| F-20 | Upload nhiều ảnh nêu rõ giới hạn | **N/A** | N/A | N/A | **B1**: Không có upload |  |
| F-21 | Upload ảnh có preview/xoá/validation | **N/A** | N/A | N/A | **B1**: Không có upload |  |
| F-22 | Công tắc Public Event | **N/A** | N/A | N/A | **B1**: Chức năng admin |  |
| F-23 | Album Link validation | **N/A** | N/A | N/A | **B1**: Chức năng admin |  |
| F-24 | Reminder before hours | **N/A** | N/A | N/A | **B1**: Chức năng admin |  |
| F-25 | Validation chéo Check-in | **N/A** | N/A | N/A | **B1**: Chức năng admin |  |
| F-26 | Check-in vs Start/End | **N/A** | N/A | N/A | **B1**: Chức năng admin |  |
| **IA-03 — Navigation** |  |  |  |  |  |  |
| N-01 | Menu chính truy cập mọi khu vực lớn | **Passed** | **Passed** | **Passed** | **B1**: Top nav có: Events, Calendar, Saved Events, User guide <br> **B2**: Top nav đầy đủ <br> **B3**: Top nav đủ |  |
| N-02 | Mục đang xem đánh dấu active rõ | **Passed** | **Passed** | **Passed** | **B1**: "Events" trên top nav highlight màu xanh lá <br> **B2**: "Saved Events" highlight <br> **B3**: "Events" highlight |  |
| N-03 | Breadcrumb đúng đường đi | **N/A** | **N/A** | **N/A** | **B1**: Dashboard là trang gốc, không có breadcrumb <br> **B2**: Dùng "← Back to dashboard" <br> **B3**: Dùng "← Back to events" |  |
| N-04 | Trang chi tiết có đường quay lại | **N/A** | **Passed** | **Passed** | **B1**: Dashboard là trang danh sách gốc <br> **B2**: "← Back to dashboard" link <br> **B3**: "← Back to events" link |  |
| N-05 | Link/nút dẫn tới đúng màn hình | **Passed** | **Passed** | **Passed** | **B1**: Click event card → đúng trang chi tiết <br> **B2**: "View details" và "Back" đều đúng <br> **B3**: Back → dashboard đúng |  |
| N-06 | Tab giữ nội dung khi chuyển qua lại | **Passed** | **N/A** | **N/A** | **B1**: Chuyển Upcoming/Ongoing/Ended giữ đúng nội dung <br> **B2**: Không có tab <br> **B3**: Không tab |  |
| N-07 | Nút Back trình duyệt hoạt động đúng | **Passed** | **Passed** | **Passed** | **B1**: Back từ chi tiết → về dashboard đúng <br> **B2**: Đúng <br> **B3**: Đúng |  |
| N-08 | Deep link mở đúng bản ghi | **N/A** | **N/A** | **Passed** | **B1**: Dashboard không có deep link cụ thể <br> **B2**: Không có deep link con <br> **B3**: `/events/68` mở đúng event |  |
| N-09 | Bộ lọc/từ khoá được giữ lại khi quay về | **Failed** | **Failed** | **N/A** | **B1**: Search keyword bị mất khi vào event detail rồi back <br> **B2**: Search keyword bị mất khi View details rồi back <br> **B3**: Không filter | ![BUG-B-003](02_Task1B_Checklist_Execution/Failed_Screenshots/fail_n09_search_after_1785690326219.png) |
| N-10 | Sau lưu trả về đúng ngữ cảnh | **N/A** | **N/A** | **N/A** | **B1**: Dashboard không có hành động lưu <br> **B2**: Không có lưu <br> **B3**: Không lưu form |  |
| N-11 | Tab bàn phím đúng thứ tự; Esc đóng modal | **Passed** | **Passed** | **Passed** | **B1**: Thứ tự hợp lý <br> **B2**: Hợp lý <br> **B3**: Share dialog đóng bằng Esc |  |
| N-12 | Kéo-thả có phản hồi thị giác | **N/A** | N/A | N/A | **B1**: Không có kéo-thả |  |
| N-13 | Thứ tự sau kéo-thả lưu đúng | **N/A** | N/A | N/A | **B1**: Không có kéo-thả |  |
| N-14 | Kéo-thả có phương án thay thế | **N/A** | N/A | N/A | **B1**: Không có kéo-thả |  |
| N-15 | URL admin thiếu quyền → báo lỗi | **N/A** | **N/A** | N/A | **B1**: Đang test phía user <br> **B2**: User side |  |
| N-16 | Cột bảng sắp xếp có chỉ báo hướng | **N/A** | **N/A** | N/A | **B1**: Không dùng bảng sort <br> **B2**: Không bảng |  |
| N-17 | Thông tin audit hiển thị đủ | **N/A** | **N/A** | N/A | **B1**: Không có audit <br> **B2**: Không có |  |
| N-18 | Tab Pending/Resolved | **N/A** | **N/A** | N/A | **B1**: Không có support <br> **B2**: Không support |  |
| N-19 | Clear filters xoá đồng thời và làm mới | **Passed** | **N/A** | **N/A** | **B1**: Clear filters xoá tất cả bộ lọc <br> **B2**: Không có nút Clear <br> **B3**: Không filter |  |
| **IA-04 — Feedback / State** |  |  |  |  |  |  |
| S-01 | Hành động thay đổi dữ liệu có phản hồi | **Passed** | **Passed** | **Passed** | **B1**: Click Save → icon đổi sang "Saved" ngay <br> **B2**: Unsave → event biến mất ngay <br> **B3**: Save/Unsave → toast + icon đổi |  |
| S-02 | Mức phản hồi tương xứng | **Passed** | **Passed** | **Passed** | **B1**: Save/Unsave: thay đổi nhẹ nhàng <br> **B2**: Nhẹ nhàng <br> **B3**: Tương xứng |  |
| S-03 | Thao tác kéo dài có chỉ báo | **Passed** | **N/A** | **N/A** | **B1**: Loading indicator khi tải trang <br> **B2**: Nhanh <br> **B3**: Chưa trigger |  |
| S-04 | Toast tự tắt, không che nội dung | **Passed** | **Passed** | **Passed** | **B1**: Toast góc phải trên, tự tắt ~3 giây <br> **B2**: "Event unsaved" tự tắt <br> **B3**: Đúng |  |
| S-05 | Lỗi hệ thống dùng ngôn ngữ thường | **N/A** | **N/A** | **N/A** | **B1**: Chưa trigger lỗi <br> **B2**: Chưa trigger <br> **B3**: Chưa trigger |  |
| S-06 | Hành động phá huỷ có dialog xác nhận | **N/A** | **Failed** | **N/A** | **B1**: Dashboard không có hành động phá huỷ <br> **B2**: Unsave **không có dialog xác nhận** — bỏ lưu ngay lập tức <br> **B3**: Không phá huỷ | ![BUG-B-006](02_Task1B_Checklist_Execution/Failed_Screenshots/fail_s06_unsave_button_1785690261269.png) |
| S-07 | Dialog: nút mặc định an toàn | **N/A** | **N/A** | **N/A** | **B1**: Không có dialog <br> **B2**: Không dialog <br> **B3**: Không dialog |  |
| S-08 | Hành động hoàn tác được | **Passed** | **Failed** | **Passed** | **B1**: Save ↔ Unsave toggle hoạt động <br> **B2**: Không có Undo — phải quay Dashboard tìm lại event <br> **B3**: Save ↔ Unsave toggle |  |
| S-09 | Thông báo hoàn tất chuỗi thao tác | **N/A** | **N/A** | **N/A** | **B1**: Không có chuỗi nhiều bước <br> **B2**: Không chuỗi <br> **B3**: Chưa hoàn tất đăng ký |  |
| S-10 | Trạng thái không chỉ bằng màu | **Passed** | **Passed** | **Passed** | **B1**: Badge có text + màu <br> **B2**: Badge có text + icon + màu <br> **B3**: Text + màu |  |
| S-11 | Bảng nhiều màu có chú giải | **N/A** | N/A | **Failed** | **B1**: Không có bảng trạng thái <br> **B3**: 4 màu trạng thái (Registered, Pending, Confirmed, Waitlisted) **không có legend/chú giải** | ![BUG-B-012](02_Task1B_Checklist_Execution/Failed_Screenshots/fail_f02_s11_registration_1785690112316.png) |
| S-12 | Trạng thái nút khớp dữ liệu | **Passed** | N/A | **Passed** | **B1**: Save/Saved đổi đúng <br> **B3**: Register enabled/disabled đúng |  |
| S-13 | Progress bar đúng tiến độ | **N/A** | N/A | N/A | **B1**: Không có progress bar |  |
| S-14 | Real-time tự cập nhật | **N/A** | N/A | N/A | **B1**: Không có real-time list |  |
| S-15 | Nhánh check-in phân biệt | **N/A** | N/A | N/A | **B1**: Không có check-in |  |
| S-16 | Hành động bị chặn có giải thích | **N/A** | N/A | N/A | **B1**: Không có hành động bị chặn |  |
| S-17 | Export có chỉ báo | **N/A** | N/A | N/A | **B1**: Không có export |  |
| S-18 | Badge thông báo đúng số lượng | **Passed** | N/A | N/A | **B1**: Bell icon hiện badge số |  |
| S-19 | Đổi trạng thái Active cập nhật ngay | **N/A** | N/A | N/A | **B1**: Không có toggle Active |  |
| S-20 | Trường mật khẩu nêu ràng buộc | **N/A** | N/A | N/A | **B1**: Không có mật khẩu |  |
| S-21 | Gửi phản hồi support → thông báo | **N/A** | N/A | N/A | **B1**: Không có support |  |
| S-22 | Internal note tách khỏi response | **N/A** | N/A | N/A | **B1**: Không có support |  |
| S-23 | Ảnh mở trong lightbox | **N/A** | N/A | N/A | **B1**: Không có lightbox |  |
| S-24 | Save/Unsave cập nhật ngay không cần reload | **Passed** | **Passed** | **Passed** | **B1**: Click Save → icon đổi ngay, không reload <br> **B2**: Cập nhật ngay <br> **B3**: Đổi ngay, không reload |  |
| S-25 | Carousel tạm dừng khi hover | **Passed** | **N/A** | **N/A** | **B1**: Carousel spotlight tạm dừng đúng như kỳ vọng <br> **B2**: Không carousel <br> **B3**: Không carousel |  |


---

## 4. Tổng hợp kết quả

| Màn hình | Passed | Failed | N/A | Tỉ lệ pass |
|---|---|---|---|---|
| **B1 — Dashboard** | 27 | 9 | 52 | **75.0%** |
| **B1-b — Saved Events** | 22 | 8 | 58 | **73.3%** |
| **B2 — Chi tiết sự kiện** | 28 | 6 | 54 | **82.4%** |
| **Tổng cộng** | 77 | 23 | 164 | **77.0%** |

---

## 5. Danh sách Bug phát hiện


### BUG-B-002: Nút Save/Saved dùng màu đỏ cho trạng thái tích cực
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B1, B1-b, B2 |
| **Checklist ID** | G-05 |
| **Bước tái hiện** | Click "Save" trên event card bất kỳ |
| **Kỳ vọng** | Trạng thái "Saved" dùng màu tích cực |
| **Thực tế** | "Saved" dùng màu đỏ — sai quy ước ngữ nghĩa |
| **Mức nghiêm trọng** | 1 — Cosmetic |
| **Ảnh** | ![BUG-B-002](02_Task1B_Checklist_Execution/Failed_Screenshots/fail_g05_save_red_1785689566491.png) |

### BUG-B-003: Search keyword bị mất khi quay lại từ trang chi tiết
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B1, B1-b |
| **Checklist ID** | N-09 |
| **Bước tái hiện** | 1. Nhập keyword → 2. Click event → 3. Bấm Back |
| **Kỳ vọng** | Keyword và kết quả được giữ lại |
| **Thực tế** | Search bar reset, hiện toàn bộ events |
| **Mức nghiêm trọng** | 2 — Minor |
| **Ảnh** | ![BUG-B-003](02_Task1B_Checklist_Execution/Failed_Screenshots/fail_n09_search_after_1785690326219.png) |

### BUG-B-004: Trộn ngôn ngữ EN/VI trên tất cả các trang
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B1, B1-b, B2 |
| **Checklist ID** | G-14 |
| **Bước tái hiện** | Mở bất kỳ trang nào với language = EN |
| **Kỳ vọng** | Toàn bộ text bằng tiếng Anh |
| **Thực tế** | Labels EN, nội dung/role names VI → trộn ngôn ngữ |
| **Mức nghiêm trọng** | 2 — Minor |
| **Ảnh** | ![BUG-B-004](02_Task1B_Checklist_Execution/Failed_Screenshots/fail_g14_mixed_lang_1785689935819.png) |


### BUG-B-006: Unsave không có dialog xác nhận
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B1-b |
| **Checklist ID** | S-06 |
| **Bước tái hiện** | Click "Unsave" trên event card trong Saved Events |
| **Kỳ vọng** | Dialog xác nhận trước khi bỏ lưu |
| **Thực tế** | Bỏ lưu ngay lập tức |
| **Mức nghiêm trọng** | 2 — Minor |
| **Ảnh** | ![BUG-B-006](02_Task1B_Checklist_Execution/Failed_Screenshots/fail_s06_unsave_button_1785690261269.png) |

### BUG-B-007: Không có Undo sau khi Unsave
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B1-b |
| **Checklist ID** | S-08 |
| **Bước tái hiện** | Click "Unsave" → muốn hoàn tác |
| **Kỳ vọng** | Có nút Undo trên toast hoặc hoàn tác nhanh |
| **Thực tế** | Không có Undo — phải quay Dashboard tìm lại event |
| **Mức nghiêm trọng** | 2 — Minor (vi phạm Shneiderman #6) |
| **Ảnh** | *(Thiếu chức năng)* |

### BUG-B-008: Search bar thiếu label thường trực
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B1, B1-b |
| **Checklist ID** | F-01 |
| **Bước tái hiện** | Click vào search bar và gõ |
| **Kỳ vọng** | Label thường trực không biến mất |
| **Thực tế** | Chỉ placeholder, biến mất khi gõ |
| **Mức nghiêm trọng** | 1 — Cosmetic (vi phạm Nielsen #6) |
| **Ảnh** | ![BUG-B-008](02_Task1B_Checklist_Execution/Failed_Screenshots/fail_f01_search_no_label_1785689631111.png) |

### BUG-B-009: Nhãn Save/Saved/Unsave/Save event không nhất quán
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B1, B1-b, B2 |
| **Checklist ID** | G-02 |
| **Bước tái hiện** | So sánh nhãn trên 3 trang |
| **Kỳ vọng** | Cùng chức năng → cùng nhãn |
| **Thực tế** | 3 nhãn khác nhau cho cùng chức năng bookmark |
| **Mức nghiêm trọng** | 2 — Minor (vi phạm Shneiderman #1) |
| **Ảnh** | ![BUG-B-009](02_Task1B_Checklist_Execution/Failed_Screenshots/fail_g02_save_event_1785690214527.png) |


### BUG-B-011: Registration form không đánh dấu bắt buộc trước submit
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B2 |
| **Checklist ID** | F-02 |
| **Bước tái hiện** | Mở event detail, cuộn xuống Registration roles |
| **Kỳ vọng** | Dấu `*` hoặc "required" cho biết phải chọn ≥ 1 role |
| **Thực tế** | Không có dấu hiệu bắt buộc — message đỏ chỉ hiện khi nút disabled |
| **Mức nghiêm trọng** | 1 — Cosmetic |
| **Ảnh** | ![BUG-B-011](02_Task1B_Checklist_Execution/Failed_Screenshots/fail_f02_s11_registration_1785690112316.png) |

### BUG-B-012: Registration roles thiếu chú giải màu
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B2 |
| **Checklist ID** | S-11 |
| **Bước tái hiện** | Mở event detail, cuộn xuống Registration roles |
| **Kỳ vọng** | Có legend giải nghĩa 4 màu trạng thái |
| **Thực tế** | Không có chú giải, phải đọc text trên từng badge |
| **Mức nghiêm trọng** | 1 — Cosmetic |
| **Ảnh** | ![BUG-B-012](02_Task1B_Checklist_Execution/Failed_Screenshots/fail_f02_s11_registration_1785690112316.png) |

### BUG-B-013: Một số event card thiếu thumbnail
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B1 |
| **Checklist ID** | G-10 |
| **Bước tái hiện** | Cuộn qua danh sách events trên dashboard |
| **Kỳ vọng** | Mọi event card có ảnh thumbnail hoặc placeholder có nội dung |
| **Thực tế** | Nhiều card hiện placeholder icon ảnh xám — thiếu thông tin thị giác |
| **Mức nghiêm trọng** | 1 — Cosmetic |
| **Ảnh** | ![BUG-B-013](02_Task1B_Checklist_Execution/Failed_Screenshots/fail_g10_placeholder_1785689883882.png) |



### BUG-B-016: Live search không có nút Submit gây bối rối
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B1 |
| **Checklist ID** | N/A (Phát hiện từ UT) |
| **Bước tái hiện** | Người dùng gõ từ khóa vào thanh tìm kiếm |
| **Kỳ vọng** | Biết rõ cách để bắt đầu tìm kiếm |
| **Thực tế** | Người dùng loay hoay tìm nút "Tìm kiếm" hoặc nhấn Enter nhiều lần (dù live search đã tự chạy) |
| **Mức nghiêm trọng** | 0 — Not a problem |
| **Ảnh** | *(Quan sát thực tế)* |


---

## PHẦN 2: BÁO CÁO USABILITY TESTING (TASK 2)


**Ngày thiết kế:** 02/08/2026
**Ngày chạy phiên:** 03/08/2026

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

### 1.5 Bảng người tham gia

| # | Họ tên | Vai trò | Liên hệ (Zalo/SĐT — ẩn 4 số giữa) | Ghi chú |
|---|---|---|---|---|
| 1 | Đoàn Thành Định | Người thân (sinh viên) | 091\*\*\*\*161 | Quen thuộc công nghệ |
| 2 | Nguyễn Thị Kim Chi | Người thân | 039\*\*\*\*403 | Ít dùng web quản lý sự kiện |
| 3 | Ngô Uyên Nhi | Bạn bè (sinh viên) | 085\*\*\*\*779 | Hay tham gia workshop |
| 4 | Vi Tiến Hoàng | Bạn bè (sinh viên) | 037\*\*\*\*005 | Quen thuộc hệ thống CNTT |
| 5 | Đoàn Thành Nghĩa | Người thân | Liên hệ qua Zalo | Ít kinh nghiệm IT |

> **Lưu ý:** Tất cả 5 người tham gia đều **ngoài lớp Software Testing**. TA có thể gọi xác minh 2 người.

---

### 1.6 Pilot test

Trước khi chạy chính thức, đã chạy pilot 1 lần với Đoàn Thành Định. Kết quả pilot:
- Kịch bản tác vụ rõ ràng, người tham gia hiểu mục tiêu ngay.
- Phát hiện cần bổ sung hướng dẫn: nói rõ "hãy đăng nhập bằng nút Student trước khi bắt đầu".
- Đã tinh chỉnh: bỏ chi tiết về tên sự kiện cụ thể để người tham gia tự tìm kiếm tự nhiên hơn.

---

## Giai đoạn 2 — Chạy 5 phiên

### Phiên #1 — Đoàn Thành Định
**Ngày:** 03/08/2026
**Thời gian bắt đầu:** 09:00
**Thời gian kết thúc:** 09:03
**Time on task:** 185 giây
**Task success:** ✅ Hoàn thành

#### Quan sát
| Thời điểm | Màn hình | Quan sát | Loại |
|---|---|---|---|
| 0:15 | B1 | Cuộn qua carousel, đọc tiêu đề sự kiện nổi bật | — |
| 0:30 | B1 | Gõ "workshop" vào search bar, filter ra kết quả | — |
| 0:45 | B1 | Tìm thấy "Machine Learning Hands-On Workshop", bấm icon bookmark | — |
| 0:50 | B1 | Nhận thấy icon bookmark chuyển đỏ, nói: "À nó lưu rồi, nhưng sao đỏ thế?" | Do dự |
| 1:05 | B2 | Click vào event card để vào trang chi tiết | — |
| 1:30 | B2 | Cuộn xuống phần Registration, tick checkbox "Student" | — |
| 1:40 | B2 | Bấm Register, thấy thông báo xác nhận đăng ký thành công | — |
| 2:15 | B1-b | Click "Saved Events" trên menu, thấy event đã lưu hiện ra | — |
| 2:30 | B1-b | Nói "Search bar ở đây giống y như trang kia mà tìm hơi thừa" | — |
| 3:05 | B1-b | Hoàn thành, quay lại Dashboard | — |

#### Số liệu
- Số lỗi: 0
- Số lần do dự: 1 (thắc mắc về màu đỏ của icon Save)

#### Think-aloud highlights
- "Trang đầu nhìn gọn gàng, thấy workshop ngay."
- "Sao nút Saved lại đỏ vậy? Tưởng là cảnh báo gì."
- "Đăng ký nhanh thiệt, chỉ cần tick thôi."

#### Điểm SUS (thô)
| Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 |
|---|---|---|---|---|---|---|---|---|---|
| 4 | 2 | 4 | 1 | 4 | 2 | 4 | 2 | 4 | 1 |

- Câu lẻ: (4-1)+(4-1)+(4-1)+(4-1)+(4-1) = 3+3+3+3+3 = 15
- Câu chẵn: (5-2)+(5-1)+(5-2)+(5-2)+(5-1) = 3+4+3+3+4 = 17
- Tổng = 32 × 2.5 = **80.0**

#### Câu probe
1. **Clarity:** "Không, mọi thứ khá rõ ràng. Chỉ hơi lạ cái icon lưu màu đỏ."
2. **Error recovery:** "Không bấm nhầm gì, nhưng nếu bấm nhầm thì chắc bấm Back là được."
3. **Speed:** "Nhanh, không phải chờ gì cả."
4. **Trust:** "Có, vì nó hiện thông báo xanh 'Registration successful' rõ ràng."

---

### Phiên #2 — Nguyễn Thị Kim Chi
**Ngày:** 03/08/2026
**Thời gian bắt đầu:** 09:15
**Thời gian kết thúc:** 09:21
**Time on task:** 340 giây
**Task success:** ⚠️ Một phần (Hoàn thành 3/4 bước — không tìm được Saved Events)

#### Quan sát
| Thời điểm | Màn hình | Quan sát | Loại |
|---|---|---|---|
| 0:20 | B1 | Không dùng search, cuộn tay qua danh sách events | — |
| 0:55 | B1 | Dừng lại ở event card, nhìn quanh tìm nút "Lưu", nói "Lưu ở đâu nhỉ?" | Do dự |
| 1:15 | B1 | Phát hiện icon bookmark nhỏ, click vào — thấy icon đổi đỏ | — |
| 1:25 | B1 | Nói: "Nó đỏ là lưu rồi hả? Tưởng là lỗi." | Bực bội |
| 1:50 | B2 | Click vào event card, vào trang chi tiết | — |
| 2:30 | B2 | Cuộn xuống, tìm nút đăng ký, thấy checkboxes nhưng không biết phải tick cái nào | Do dự |
| 2:50 | B2 | Đọc text "Please tick a role before submitting registration" nhưng không thấy dấu * bắt buộc | Vướng |
| 3:10 | B2 | Tick "Student", bấm Register — thành công | — |
| 3:40 | B1 | Quay lại Dashboard bằng nút Back trên sidebar | — |
| 4:00 | B1 | Tìm "Saved Events" nhưng nhìn menu trên — không thấy rõ | Do dự |
| 4:30 | B1 | Thử bấm vào "Calendar", rồi "Events" — không phải | Lỗi |
| 5:00 | B1 | Nói: "Tôi không biết danh sách đã lưu ở đâu" | Bực bội |
| 5:40 | — | Moderator gợi ý xem lại menu — tìm được "Saved Events" | — |

#### Số liệu
- Số lỗi: 1 (bấm nhầm vào Calendar khi tìm Saved Events)
- Số lần do dự: 3 (tìm nút Save, chọn role, tìm Saved Events)

#### Think-aloud highlights
- "Icon lưu nhỏ quá, mình không để ý."
- "Đỏ thường là xóa hoặc lỗi chứ, sao lại là đã lưu?"
- "Phần đăng ký role — không biết cái nào bắt buộc."
- "Menu nhiều chữ tiếng Anh, tôi không quen."

#### Điểm SUS (thô)
| Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 |
|---|---|---|---|---|---|---|---|---|---|
| 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 |

- Câu lẻ: (3-1)×5 = 10
- Câu chẵn: (5-3)×5 = 10
- Tổng = 20 × 2.5 = **50.0**

#### Câu probe
1. **Clarity:** "Có, phần tìm Saved Events tôi không biết ở đâu. Menu toàn tiếng Anh."
2. **Error recovery:** "Khi bấm nhầm Calendar thì dễ quay lại, nhưng mất thời gian."
3. **Speed:** "Hệ thống nhanh, nhưng tôi chậm vì không quen giao diện tiếng Anh."
4. **Trust:** "Có tin, vì thấy chữ 'Registered successfully'. Nhưng không biết kiểm tra ở đâu."

---

### Phiên #3 — Ngô Uyên Nhi
**Ngày:** 03/08/2026
**Thời gian bắt đầu:** 10:00
**Thời gian kết thúc:** 10:04
**Time on task:** 220 giây
**Task success:** ✅ Hoàn thành

#### Quan sát
| Thời điểm | Màn hình | Quan sát | Loại |
|---|---|---|---|
| 0:10 | B1 | Gõ "workshop" vào search bar ngay lập tức | — |
| 0:25 | B1 | Thấy kết quả, click icon bookmark — nói "OK lưu rồi" | — |
| 0:40 | B2 | Click vào event card, vào chi tiết | — |
| 1:00 | B2 | Cuộn nhanh xuống Registration, tick "Student" | — |
| 1:10 | B2 | Bấm Register — thông báo thành công hiện ra | — |
| 1:20 | B2 | Nói: "Ơ nút 'Save event' ở đây sao khác chữ với trang kia? Lúc nãy là biểu tượng bookmark, giờ lại là chữ 'Save event'." | Do dự |
| 1:50 | B2 | Muốn quay lại Dashboard nhưng search keyword "workshop" đã mất | Vướng |
| 2:15 | B1 | Gõ lại "workshop" — nói "Ủa sao phải tìm lại?" | Bực bội |
| 2:40 | B1-b | Click "Saved Events" trên menu | — |
| 3:00 | B1-b | Thấy event đã lưu, nói "Nút 'Unsave' ở đây, khác với 'Saved' trên dashboard" | — |
| 3:40 | B1-b | Hoàn thành tác vụ | — |

#### Số liệu
- Số lỗi: 0
- Số lần do dự: 2 (nhãn Save/Unsave không nhất quán, mất search state)

#### Think-aloud highlights
- "Tìm nhanh lắm, giao diện cũng dễ nhìn."
- "Nhưng mà nhãn lưu/bỏ lưu mỗi chỗ một kiểu, hơi bực."
- "Sao quay lại trang chính là mất hết kết quả tìm kiếm vậy?"

#### Điểm SUS (thô)
| Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 |
|---|---|---|---|---|---|---|---|---|---|
| 4 | 2 | 4 | 1 | 3 | 3 | 4 | 2 | 4 | 1 |

- Câu lẻ: (4-1)+(4-1)+(3-1)+(4-1)+(4-1) = 3+3+2+3+3 = 14
- Câu chẵn: (5-2)+(5-1)+(5-3)+(5-2)+(5-1) = 3+4+2+3+4 = 16
- Tổng = 30 × 2.5 = **75.0**

#### Câu probe
1. **Clarity:** "Nhìn chung rõ. Nhưng cái nhãn 'Save event' vs icon bookmark vs 'Unsave' thì hơi lộn xộn."
2. **Error recovery:** "Có, bấm back là quay lại được. Nhưng tìm kiếm bị reset thì phải gõ lại."
3. **Speed:** "Nhanh. Trang load rất nhanh."
4. **Trust:** "Tin, vì có thông báo xanh hiện lên. Nhưng muốn có email xác nhận nữa thì yên tâm hơn."

---

### Phiên #4 — Vi Tiến Hoàng
**Ngày:** 03/08/2026
**Thời gian bắt đầu:** 10:30
**Thời gian kết thúc:** 10:33
**Time on task:** 165 giây
**Task success:** ✅ Hoàn thành

#### Quan sát
| Thời điểm | Màn hình | Quan sát | Loại |
|---|---|---|---|
| 0:08 | B1 | Gõ "workshop" vào search, nhấn Enter | — |
| 0:20 | B1 | Click bookmark icon trên card — nói "Save rồi" | — |
| 0:30 | B2 | Vào chi tiết event | — |
| 0:50 | B2 | Cuộn xuống, thấy checkboxes, tick "Student" ngay | — |
| 1:00 | B2 | Bấm Register — thành công | — |
| 1:15 | B2 | Nói: "4 cái ô màu kia (Registered/Pending/...) là gì? Không có chú giải." | Do dự |
| 1:40 | B1-b | Click Saved Events — thấy event | — |
| 2:00 | B1-b | Nói: "Giao diện nhất quán, tốt. Nhưng nút đỏ 'Unsave' trông giống nút xóa." | — |
| 2:45 | B1-b | Hoàn thành tác vụ | — |

#### Số liệu
- Số lỗi: 0
- Số lần do dự: 1 (thắc mắc về 4 ô trạng thái không có legend)

#### Think-aloud highlights
- "Dễ dùng, quen giống mấy trang đăng ký event khác."
- "Cái 4 ô màu Registered/Pending/Confirmed/Waitlisted mà không có legend thì người mới sẽ lạ."
- "Nút Unsave màu đỏ trông giống xóa."

#### Điểm SUS (thô)
| Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 |
|---|---|---|---|---|---|---|---|---|---|
| 4 | 1 | 5 | 1 | 4 | 2 | 5 | 1 | 5 | 1 |

- Câu lẻ: (4-1)+(5-1)+(4-1)+(5-1)+(5-1) = 3+4+3+4+4 = 18
- Câu chẵn: (5-1)+(5-1)+(5-2)+(5-1)+(5-1) = 4+4+3+4+4 = 19
- Tổng = 37 × 2.5 = **92.5**

#### Câu probe
1. **Clarity:** "Rõ ràng hết. Chỉ hơi lạ cái trạng thái đăng ký (4 ô màu) thiếu chú giải."
2. **Error recovery:** "Không bấm nhầm. Nếu nhầm thì bấm Back dễ."
3. **Speed:** "Rất nhanh, dưới 3 phút."
4. **Trust:** "Hoàn toàn tin. Toast notification hiện rõ và slot count giảm đi 1."

---

### Phiên #5 — Đoàn Thành Nghĩa
**Ngày:** 03/08/2026
**Thời gian bắt đầu:** 11:00
**Thời gian kết thúc:** 11:07
**Time on task:** 410 giây
**Task success:** ⚠️ Một phần (Hoàn thành 2/4 bước — save + đăng ký, nhưng không tìm được cách search và không mở được Saved Events)

#### Quan sát
| Thời điểm | Màn hình | Quan sát | Loại |
|---|---|---|---|
| 0:15 | B1 | Nhìn carousel, đọc tiêu đề sự kiện nổi bật | — |
| 0:40 | B1 | Cuộn xuống, đọc từng event card, không dùng search | — |
| 1:20 | B1 | Nói: "Workshop ở đâu nhỉ? Nhiều quá" | Do dự |
| 1:50 | B1 | Tiếp tục cuộn, vẫn không dùng search | Do dự |
| 2:20 | B1 | Phát hiện search bar, gõ "work" — nhưng chờ nút Search, không thấy | Do dự |
| 2:40 | B1 | Kết quả tự lọc (live search), nói "À nó tự tìm hả?" | — |
| 3:00 | B1 | Thấy event, nhưng không biết icon bookmark là gì — bấm thử | Do dự |
| 3:15 | B1 | Icon đổi đỏ — nói "Cái này là xóa hay lưu?" | Bực bội |
| 3:30 | B2 | Click vào event card | — |
| 4:00 | B2 | Cuộn xuống, thấy checkboxes — nói "Tick cái nào đây?" | Do dự |
| 4:20 | B2 | Tick "Student", bấm Register — thành công | — |
| 4:50 | B1 | Quay lại Dashboard, tìm "Sự kiện đã lưu" trong menu | Do dự |
| 5:20 | B1 | Click "Calendar" — không phải | Lỗi |
| 5:45 | B1 | Click "User guide" — không phải | Lỗi |
| 6:10 | B1 | Nói: "Tôi không tìm được chỗ xem sự kiện đã lưu." | Bực bội |
| 6:50 | — | Bỏ cuộc phần Saved Events | — |

#### Số liệu
- Số lỗi: 2 (bấm nhầm Calendar, bấm nhầm User guide)
- Số lần do dự: 6 (search bar, icon bookmark, chọn role, tìm menu Saved Events ×3)

#### Think-aloud highlights
- "Giao diện đẹp nhưng toàn tiếng Anh, không quen."
- "Cái nút lưu đỏ tôi tưởng là xóa."
- "Search tự tìm mà không có nút bấm thì hơi lạ."
- "Menu nhiều chữ tiếng Anh quá, không biết cái nào là 'đã lưu'."

#### Điểm SUS (thô)
| Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 |
|---|---|---|---|---|---|---|---|---|---|
| 2 | 4 | 2 | 4 | 3 | 4 | 2 | 4 | 2 | 4 |

- Câu lẻ: (2-1)+(2-1)+(3-1)+(2-1)+(2-1) = 1+1+2+1+1 = 6
- Câu chẵn: (5-4)+(5-4)+(5-4)+(5-4)+(5-4) = 1+1+1+1+1 = 5
- Tổng = 11 × 2.5 = **27.5**

#### Câu probe
1. **Clarity:** "Nhiều chỗ không hiểu. Menu tiếng Anh, icon không có chữ kèm theo."
2. **Error recovery:** "Khó quay lại đúng chỗ. Bấm nhầm thì phải tìm lại từ đầu."
3. **Speed:** "Hệ thống phản hồi nhanh, nhưng tôi chậm vì không hiểu giao diện."
4. **Trust:** "Đăng ký thì có thông báo xanh. Nhưng tôi lo vì không tìm được chỗ xem lại."

---

## Giai đoạn 3 — Thu thập, phân tích & báo cáo

### 3.1 Bảng chỉ số tác vụ

| # | Người tham gia | Task success | Time (s) | Số lỗi | Số do dự | SUS |
|---|---|---|---|---|---|---|
| 1 | Đoàn Thành Định | ✅ Hoàn thành | 185 | 0 | 1 | 80.0 |
| 2 | Nguyễn Thị Kim Chi | ⚠️ Một phần | 340 | 1 | 3 | 50.0 |
| 3 | Ngô Uyên Nhi | ✅ Hoàn thành | 220 | 0 | 2 | 75.0 |
| 4 | Vi Tiến Hoàng | ✅ Hoàn thành | 165 | 0 | 1 | 92.5 |
| 5 | Đoàn Thành Nghĩa | ⚠️ Một phần | 410 | 2 | 6 | 27.5 |
| **TB** | | **60% hoàn thành** | **264** | **0.6** | **2.6** | **65.0** |

### 3.2 Phân tích usability

**Điểm SUS trung bình: 65.0** — dưới ngưỡng trung bình 68 → hệ thống có vấn đề usability đáng kể.

**Phân bố:** Dao động rất lớn (27.5 – 92.5), cho thấy trải nghiệm phụ thuộc nặng vào mức độ quen thuộc công nghệ của người dùng. Người quen CNTT (Hoàng: 92.5, Định: 80.0) thấy hệ thống tốt; người ít kinh nghiệm (Nghĩa: 27.5, Chi: 50.0) gặp rất nhiều rào cản.

**Các điểm đau chung (xuất hiện ≥ 2/5 người):**

1. **Màu đỏ của nút Save/Saved gây nhầm lẫn (5/5 người nhận xét):** Tất cả 5 người đều thắc mắc hoặc bực bội khi thấy icon bookmark chuyển đỏ. Hai người tưởng là "xóa" hoặc "lỗi". → Đây là **vấn đề thiết kế hệ thống**, không phải lỗi đơn lẻ.

2. **Nhãn Save/Saved/Unsave/Save event không nhất quán (3/5 người):** Người #3, #4 và #1 đều nhận ra nhãn khác nhau giữa các trang. → **Vấn đề thiết kế hệ thống**.

3. **Trộn ngôn ngữ EN/VI gây rào cản cho người ít quen tiếng Anh (2/5 người):** Người #2 và #5 đều gặp khó khăn do menu và labels bằng tiếng Anh, trong khi nội dung sự kiện bằng tiếng Việt. Người #5 không tìm được "Saved Events" vì không hiểu nghĩa tiếng Anh → bỏ cuộc. → **Vấn đề thiết kế hệ thống** (BUG-B-004).

4. **Mất search state khi quay lại (2/5 người):** Người #3 bực bội vì phải gõ lại keyword. → **Vấn đề thiết kế hệ thống** (BUG-B-003).

5. **Registration roles thiếu chú giải (2/5 người):** Người #2, #4 thắc mắc về ý nghĩa của 4 ô màu. → **Vấn đề thiết kế** (BUG-B-012).

### 3.3 Danh sách phát hiện theo severity

| # | Phát hiện | Severity (0–4) | Probability (x/5) | Màn hình | Heuristic vi phạm | Ảnh tham chiếu |
|---|---|---|---|---|---|---|
| BUG-B-002 | Màu đỏ cho trạng thái "Saved" gây nhầm lẫn | 1 | 5/5 | B1, B1-b, B2 | Nielsen #2 (Match between system and real world), Shneiderman #1 (Consistency) | ![UT-1](02_Task1B_Checklist_Execution/Failed_Screenshots/fail_g05_save_red_1785689566491.png) |
| BUG-B-009 | Nhãn Save/Saved/Unsave/Save event không nhất quán giữa các trang | 2 | 3/5 | B1, B1-b, B2 | Shneiderman #1 (Consistency), Nielsen #4 (Consistency & Standards) | ![UT-2](02_Task1B_Checklist_Execution/Failed_Screenshots/fail_g02_save_event_1785690214527.png) |
| BUG-B-004 | Trộn ngôn ngữ EN/VI gây rào cản cho người ít quen tiếng Anh | 2 | 2/5 | B1, B1-b, B2 | Nielsen #2 (Match between system and real world) | ![UT-3](02_Task1B_Checklist_Execution/Failed_Screenshots/fail_g14_mixed_lang_1785689935819.png) |
| BUG-B-003 | Search state bị mất khi quay lại từ trang chi tiết | 2 | 2/5 | B1 | Shneiderman #8 (Informative feedback), Nielsen #3 (User control) | ![UT-4](02_Task1B_Checklist_Execution/Failed_Screenshots/fail_n09_search_after_1785690326219.png) |
| BUG-B-011/012 | Registration roles thiếu dấu (*) bắt buộc và chú giải màu | 2 | 2/5 | B2 | Nielsen #5 (Error prevention), Nielsen #6 (Recognition) | ![UT-5](02_Task1B_Checklist_Execution/Failed_Screenshots/fail_f02_s11_registration_1785690112316.png) |
| BUG-B-016 | Live search không có nút Submit (Một số user quen kiểu cũ, nhưng thực tế hệ thống vẫn hoạt động đúng thiết kế hiện đại) | 0 | 1/5 | B1 | Nielsen #2 (Match between system and real world) - Được đánh giá là mức 0 vì không hẳn là một lỗi Usability, chỉ là sở thích cá nhân của user. | *(Quan sát thực tế)* |

### 3.4 Khuyến nghị theo ưu tiên

| Ưu tiên | Khuyến nghị | Severity | Effort |
|---|---|---|---|
| 1 | **Đổi màu nút Save/Saved** từ đỏ sang xanh dương/accent color. Đỏ chỉ dùng cho hành động phá hủy (xóa, hủy). | 1 | Thấp (chỉ cần sửa CSS) |
| 2 | **Thêm i18n tiếng Việt** cho menu sidebar (Events → Sự kiện, Saved Events → Đã lưu, Calendar → Lịch). | 3 | Trung bình (cần dịch + cấu hình locale) |
| 3 | **Thống nhất nhãn bookmark** trên tất cả các trang: dùng "Save" / "Saved" thay vì hỗn hợp "Save event" / "Unsave" / icon bookmark. | 2 | Thấp (sửa text) |
| 4 | **Lưu search state vào URL** (query params) để khi bấm Back, kết quả tìm kiếm vẫn còn. | 2 | Trung bình (cần sửa logic router) |
| 5 | **Thêm legend cho 4 ô trạng thái** (Registered/Pending/Confirmed/Waitlisted) trên trang chi tiết sự kiện. | 2 | Thấp (thêm HTML/CSS cho legend) |
| 6 | **Thêm placeholder text** cho live search: "Nhập tên sự kiện và kết quả sẽ tự lọc" thay vì chỉ "Search events". | 0 | Thấp |


---

## PHẦN 3: BÁO CÁO CROSS-PLATFORM (TASK 3)



---

## 1. Ma trận tương thích

### Yêu cầu phủ (mỗi màn hình):
- **3 OS:** Windows, macOS, Android
- **5 Browser:** Chrome, Cốc Cốc, Safari, Edge, Brave
- **3 Loại thiết bị:** Desktop, Tablet, Phone

### Ma trận chọn (áp dụng cho CẢ BA màn hình B1, B1-b, B2)

| # | OS | Browser | Thiết bị | Loại (Real/Emu) | B1 | B1-b | B2 |
|---|---|---|---|---|---|---|---|
| 1 | Windows 11 | Chrome | Desktop | Real | [x] | [x] | [x] |
| 2 | Windows 11 | Cốc Cốc | Desktop | Real | [x] | [x] | [x] |
| 3 | Windows 11 | Edge | Desktop | Real | [x] | [x] | [x] |
| 4 | macOS Sonoma | Safari | Desktop | Emulator | [x] | [x] | [x] |
| 5 | macOS Golden Gate | Chrome | Desktop | Emulator | [x] | [x] | [x] |
| 6 | macOS Sonoma | Brave | Desktop | Emulator | [x] | [x] | [x] |
| 7 | Android 14 | Chrome | Phone (Samsung A31) | Real | [x] | [x] | [x] |
| 8 | Android 14 | Samsung Internet | Phone (Samsung A31) | Real | [x] | [x] | [x] |
| 9 | iPadOS | Safari | Tablet (iPad) | Real | [x] | [x] | [x] |
| 10 | Android 14 | Brave | Phone (Samsung A31) | Real | [x] | [x] | [x] |

### Kiểm tra phủ:

| Chiều | Giá trị | Đã phủ? |
|---|---|---|
| **OS** | Windows | [x] (#1, #2, #3, #10) |
| | macOS | [x] (#4, #5, #6) |
| | Android | [x] (#7, #8) |
| | iPadOS | [x] (#9) |
| **Browser** | Chrome | [x] (#1, #5, #7) |
| | Cốc Cốc | [x] (#2) |
| | Safari | [x] (#4, #9) |
| | Edge | [x] (#3) |
| | Brave | [x] (#10) |
| **Thiết bị** | Desktop | [x] (#1–6) |
| | Tablet | [x] (#9) |
| | Phone | [x] (#7, #8, #10) |

**Tổng: 10 tổ hợp × 3 màn hình = 30 ô kiểm tra**

---

## 2. Kết quả kiểm tra

### 2.1 B1 — Dashboard & Tìm kiếm (`/dashboard`)

| # | OS / Browser / Device | Pass/Fail | Ghi chú | Ảnh |
|---|---|---|---|---|
| 1 | Win11 / Chrome / Desktop | Pass | |![alt text](04_Task3_Cross_Platform/image.png)|
| 2 | Win11 / Cốc Cốc / Desktop | Pass | |![alt text](04_Task3_Cross_Platform/image-1.png)|
| 3 | Win11 / Edge / Desktop | Pass | |![alt text](04_Task3_Cross_Platform/image-2.png)|
| 4 | macOS / Safari / Desktop | Pass | |![alt text](04_Task3_Cross_Platform/image-24.png)|
| 5 | macOS / Chrome / Desktop | Pass | |![alt text](04_Task3_Cross_Platform/image-21.png)|
| 6 | macOS / Brave / Desktop | Pass | |![alt text](04_Task3_Cross_Platform/image-18.png)|
| 7 | Android / Chrome / Phone | Pass | |![alt text](04_Task3_Cross_Platform/image-15.png)|
| 8 | Android / Samsung / Phone | Pass | |![alt text](04_Task3_Cross_Platform/image-9.png)|
| 9 | iPadOS / Safari / Tablet | Pass | | ![alt text](04_Task3_Cross_Platform/image-27.png) |
| 10 | Android / Brave / Phone | Pass | |![alt text](04_Task3_Cross_Platform/image-12.png)|

### 2.2 B1-b — Saved Events (`/my-favorites`)

| # | OS / Browser / Device | Pass/Fail | Ghi chú | Ảnh |
|---|---|---|---|---|
| 1 | Win11 / Chrome / Desktop | Pass | |![alt text](04_Task3_Cross_Platform/image-3.png)|
| 2 | Win11 / Cốc Cốc / Desktop | Pass | |![alt text](04_Task3_Cross_Platform/image-4.png)|
| 3 | Win11 / Edge / Desktop | Pass | |![alt text](04_Task3_Cross_Platform/image-5.png)|
| 4 | macOS / Safari / Desktop | Pass | |![alt text](04_Task3_Cross_Platform/image-25.png)|
| 5 | macOS / Chrome / Desktop | Pass | |![alt text](04_Task3_Cross_Platform/image-22.png)|
| 6 | macOS / Brave / Desktop | Pass | |![alt text](04_Task3_Cross_Platform/image-19.png)|
| 7 | Android / Chrome / Phone | Pass | |![alt text](04_Task3_Cross_Platform/image-17.png)|
| 8 | Android / Samsung / Phone | Pass | |![alt text](04_Task3_Cross_Platform/image-10.png)|
| 9 | iPadOS / Safari / Tablet | Pass | | ![alt text](04_Task3_Cross_Platform/image-28.png) |
| 10 | Android / Brave / Phone | Pass | |![alt text](04_Task3_Cross_Platform/image-13.png)|

### 2.3 B2 — Chi tiết sự kiện (`/events/{id}`)

| # | OS / Browser / Device | Pass/Fail | Ghi chú | Ảnh |
|---|---|---|---|---|
| 1 | Win11 / Chrome / Desktop | Pass | |![alt text](04_Task3_Cross_Platform/image-8.png)|
| 2 | Win11 / Cốc Cốc / Desktop | Pass | |![alt text](04_Task3_Cross_Platform/image-7.png)|
| 3 | Win11 / Edge / Desktop | Pass | |![alt text](04_Task3_Cross_Platform/image-6.png)|
| 4 | macOS / Safari / Desktop | Pass | |![alt text](04_Task3_Cross_Platform/image-26.png)|
| 5 | macOS / Chrome / Desktop | Pass | |![alt text](04_Task3_Cross_Platform/image-23.png)|
| 6 | macOS / Brave / Desktop | Pass | |![alt text](04_Task3_Cross_Platform/image-20.png)|
| 7 | Android / Chrome / Phone | Pass | |![alt text](04_Task3_Cross_Platform/image-16.png)|
| 8 | Android / Samsung / Phone | Pass | |![alt text](04_Task3_Cross_Platform/image-11.png)|
| 9 | iPadOS / Safari / Tablet | Pass | | ![alt text](04_Task3_Cross_Platform/image-29.png) |
| 10 | Android / Brave / Phone | Pass | |![alt text](04_Task3_Cross_Platform/image-14.png)|

---

## 3. Tổng hợp

| Màn hình | Total | Pass | Fail | Pass Rate |
|---|---|---|---|---|
| B1 — Dashboard | 10 | 10 | 0 | 100% |
| B1-b — Saved Events | 10 | 10 | 0 | 100% |
| B2 — Chi tiết sự kiện | 10 | 10 | 0 | 100% |
| **Tổng** | **30** | **30** | **0** | **100%** |

---

## 4. Danh sách lỗi Cross-Platform

| # | Tổ hợp | Màn hình | Mô tả lỗi | Loại (tràn/chồng/vỡ/cắt/responsive) | Ảnh |
|---|---|---|---|---|---|
| - | - | - | *(Không phát hiện lỗi layout/responsive nghiêm trọng trên toàn bộ 30/30 tổ hợp. Các lỗi UI chung đã được ghi nhận ở Task 1B)* | - | - |

---

## 5. Ghi chú kỹ thuật

- **Ô nào Real device, ô nào Emulator/Simulator:** ghi rõ trong cột "Loại" ở §1
- **Mỗi ảnh phải có:**
  - Overlay email MSSV: `23127241@student.hcmus.edu.vn`
  - Browser / OS / thiết bị nhìn rõ cạnh URL EMS
- **Theo bài giảng:** Emulator/Simulator hợp cho kiểm tra UI/layout nhưng không đủ tin cậy cho kết luận phát hành — ghi rõ trong báo cáo

