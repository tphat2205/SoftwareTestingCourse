# Task 1B — Chạy Checklist GUI trên Kịch bản B

**Sinh viên:** Đoàn Thành Phát — 23127241
**Kịch bản:** B — User đăng ký tham gia sự kiện
**Ngày thực hiện:** 02/08/2026
**SUT:** https://prod-dev.ems-fitus.cloud

---

## 1. Kịch bản và lý do chọn 3 màn hình

**Kịch bản B** bao gồm nhóm chức năng: khám phá công khai và đăng ký tham gia sự kiện. Ba màn hình được chọn:

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
| G-02 | Cùng chức năng dùng cùng nhãn ở mọi màn hình | **Failed** | **Failed** | **Failed** | **B1**: Nút "Save"/"Saved" trên event card dùng text, nhưng trên sidebar dùng icon bookmark không có label — thiếu nhất quán. Ngoài ra "Rows per page" (pagination) vs "Showing 1 of 52 events" dùng hai cách đếm khác nhau <br> **B2**: "Unsave" (B1-b) vs "Saved" toggle (B1) — cùng hành động bỏ lưu nhưng nhãn và kiểu nút khác nhau <br> **B3**: "Save event" (B2) vs "Save" (B1) vs "Unsave" (B1-b) — cùng chức năng, 3 nhãn khác | ![BUG-B-009](Failed_Screenshots/fail_g02_save_event_1785690214527.png) |
| G-03 | Bảng: text trái, số phải, trạng thái giữa | **N/A** | **N/A** | **N/A** | **B1**: Dashboard không dùng bảng dữ liệu <br> **B2**: Dùng card list, không bảng <br> **B3**: Không bảng |  |
| G-04 | Tối đa 2 họ font; cỡ chữ theo thang nhất quán | **Passed** | **Passed** | **Passed** | **B1**: Dùng font sans-serif nhất quán, cỡ chữ phân cấp rõ ràng (heading > card title > body > caption) <br> **B2**: Nhất quán với Dashboard <br> **B3**: Đúng |  |
| G-05 | Màu đúng ngữ nghĩa: đỏ chỉ cho lỗi/phá huỷ | **Failed** | **Failed** | **Passed** | **B1**: Nút "Saved" dùng màu đỏ cho trạng thái "đã lưu" — đỏ thường mang nghĩa lỗi/xoá/nguy hiểm, không phù hợp cho hành động tích cực. Nên dùng màu primary hoặc accent <br> **B2**: Badge "Saved" dùng đỏ — sai ngữ nghĩa <br> **B3**: Status cards dùng màu đúng | ![BUG-B-002](Failed_Screenshots/fail_g05_save_red_1785689566491.png) |
| G-06 | Mỗi màn hình chỉ có 1 nút hành động chính | **Passed** | **Passed** | **Passed** | **B1**: Không có nút CTA chính nổi bật trên dashboard (đây là trang danh sách), mỗi card có "Save" nhưng đó là hành động phụ <br> **B2**: "View details" chính, "Unsave" phụ <br> **B3**: "Register (Student)" rõ ràng |  |
| G-07 | Nội dung không tràn ngang ở ≥ 1280px | **Passed** | **Passed** | **Passed** | **B1**: Không có thanh cuộn ngang ở viewport 1440px <br> **B2**: Không tràn <br> **B3**: Đúng |  |
| G-08 | Empty state có thông điệp + gợi ý hành động | **Passed** | **Passed** | **N/A** | **B1**: Chưa trigger được empty state trên dashboard (52 events), nhưng search không kết quả hiện "No events found" <br> **B2**: "No saved events yet" + hướng dẫn save <br> **B3**: Luôn có nội dung |  |
| G-09 | Loading có skeleton/spinner; không nhảy layout | **Passed** | **Passed** | **Passed** | **B1**: Quan sát được loading state khi chuyển tab <br> **B2**: Tải nhanh, không nhảy <br> **B3**: Banner không nhảy layout |  |
| G-10 | Ảnh giữ đúng tỉ lệ, không méo | **Failed** | **Passed** | **Passed** | **B1**: Một số event card thiếu thumbnail — hiện placeholder icon ảnh xám trên nền trắng. Khi có ảnh thì giữ đúng tỉ lệ 4:3 <br> **B2**: Thumbnail đúng 4:3 <br> **B3**: Banner đúng | ![BUG-B-013](Failed_Screenshots/fail_g10_placeholder_1785689883882.png) |
| G-11 | Không lộ mã trạng thái nội bộ ra giao diện | **Passed** | **Passed** | **Passed** | **B1**: Không thấy mã nội bộ nào trên dashboard <br> **B2**: Không thấy <br> **B3**: Không thấy |  |
| G-12 | Tương phản chữ/nền ≥ 4.5:1 | **Passed** | **Passed** | **Passed** | **B1**: Text đậm trên nền sáng, contrast đạt yêu cầu <br> **B2**: Đạt <br> **B3**: Đạt |  |
| G-13 | Vẫn đọc được khi zoom 200% | **Passed** | **Passed** | **Passed** | **B1**: Layout responsive tốt <br> **B2**: Layout responsive tốt <br> **B3**: Layout responsive tốt |  |
| G-14 | Chuyển EN/VI dịch toàn bộ | **Failed** | **Failed** | **Failed** | **B1**: Ở chế độ EN: tiêu đề sự kiện, mô tả, địa điểm hiển thị tiếng Việt nhưng labels UI bằng tiếng Anh → trộn ngôn ngữ trên cùng màn hình <br> **B2**: Trộn EN/VI <br> **B3**: Labels EN, role names VI → trộn nghiêm trọng | ![BUG-B-004](Failed_Screenshots/fail_g14_mixed_lang_1785689935819.png) |
| G-15 | Text tiếng Việt không vỡ nút/cắt chữ | **Passed** | **Passed** | **Passed** | **B1**: Quan sát các event title dài tiếng Việt vẫn hiển thị bình thường <br> **B2**: Bình thường <br> **B3**: Đúng |  |
| G-16 | Ngôn ngữ đã chọn được lưu lại sau reload | **Passed** | **Passed** | **Passed** | **B1**: Reload trang vẫn giữ nguyên ngôn ngữ EN <br> **B2**: Giữ nguyên <br> **B3**: Đúng |  |
| G-17 | Avatar chữ viết tắt gọn trong vòng tròn | **Passed** | **Passed** | **Passed** | **B1**: Avatar "PDT" hiện đúng trong vòng tròn, không tràn <br> **B2**: Đúng <br> **B3**: Đúng |  |
| G-18 | Member Code hiển thị đầy đủ | **N/A** | **N/A** | **N/A** | **B1**: Dashboard không hiển thị Member Code <br> **B2**: Không hiển thị <br> **B3**: Không hiển thị |  |
| **IA-02 — Forms** |  |  |  |  |  |  |
| F-01 | Mọi ô nhập có nhãn thường trực | **Failed** | **Failed** | **N/A** | **B1**: Search bar chỉ có placeholder "Search events by title..." — khi gõ thì placeholder biến mất, không có label thường trực <br> **B2**: Search bar chỉ placeholder <br> **B3**: Registration dùng checkbox, không text input | ![BUG-B-008](Failed_Screenshots/fail_f01_search_no_label_1785689631111.png) |
| F-02 | Trường bắt buộc đánh dấu rõ | **N/A** | N/A | **Failed** | **B1**: Dashboard không có form submit <br> **B3**: Không đánh dấu `*` cho biết phải chọn ≥ 1 role. Message đỏ "Please tick a role..." hiện khi nút disabled nhưng chưa đánh dấu theo quy ước | ![BUG-B-011](Failed_Screenshots/fail_f02_s11_registration_1785690112316.png) |
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
| N-09 | Bộ lọc/từ khoá được giữ lại khi quay về | **Failed** | **Failed** | **N/A** | **B1**: Search keyword bị mất khi vào event detail rồi back <br> **B2**: Search keyword bị mất khi View details rồi back <br> **B3**: Không filter | ![BUG-B-003](Failed_Screenshots/fail_n09_search_after_1785690326219.png) |
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
| S-06 | Hành động phá huỷ có dialog xác nhận | **N/A** | **Failed** | **N/A** | **B1**: Dashboard không có hành động phá huỷ <br> **B2**: Unsave **không có dialog xác nhận** — bỏ lưu ngay lập tức <br> **B3**: Không phá huỷ | ![BUG-B-006](Failed_Screenshots/fail_s06_unsave_button_1785690261269.png) |
| S-07 | Dialog: nút mặc định an toàn | **N/A** | **N/A** | **N/A** | **B1**: Không có dialog <br> **B2**: Không dialog <br> **B3**: Không dialog |  |
| S-08 | Hành động hoàn tác được | **Passed** | **Failed** | **Passed** | **B1**: Save ↔ Unsave toggle hoạt động <br> **B2**: Không có Undo — phải quay Dashboard tìm lại event <br> **B3**: Save ↔ Unsave toggle |  |
| S-09 | Thông báo hoàn tất chuỗi thao tác | **N/A** | **N/A** | **N/A** | **B1**: Không có chuỗi nhiều bước <br> **B2**: Không chuỗi <br> **B3**: Chưa hoàn tất đăng ký |  |
| S-10 | Trạng thái không chỉ bằng màu | **Passed** | **Passed** | **Passed** | **B1**: Badge có text + màu <br> **B2**: Badge có text + icon + màu <br> **B3**: Text + màu |  |
| S-11 | Bảng nhiều màu có chú giải | **N/A** | N/A | **Failed** | **B1**: Không có bảng trạng thái <br> **B3**: 4 màu trạng thái (Registered, Pending, Confirmed, Waitlisted) **không có legend/chú giải** | ![BUG-B-012](Failed_Screenshots/fail_f02_s11_registration_1785690112316.png) |
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
| **Ảnh** | ![BUG-B-002](Failed_Screenshots/fail_g05_save_red_1785689566491.png) |

### BUG-B-003: Search keyword bị mất khi quay lại từ trang chi tiết
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B1, B1-b |
| **Checklist ID** | N-09 |
| **Bước tái hiện** | 1. Nhập keyword → 2. Click event → 3. Bấm Back |
| **Kỳ vọng** | Keyword và kết quả được giữ lại |
| **Thực tế** | Search bar reset, hiện toàn bộ events |
| **Mức nghiêm trọng** | 2 — Minor |
| **Ảnh** | ![BUG-B-003](Failed_Screenshots/fail_n09_search_after_1785690326219.png) |

### BUG-B-004: Trộn ngôn ngữ EN/VI trên tất cả các trang
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B1, B1-b, B2 |
| **Checklist ID** | G-14 |
| **Bước tái hiện** | Mở bất kỳ trang nào với language = EN |
| **Kỳ vọng** | Toàn bộ text bằng tiếng Anh |
| **Thực tế** | Labels EN, nội dung/role names VI → trộn ngôn ngữ |
| **Mức nghiêm trọng** | 2 — Minor |
| **Ảnh** | ![BUG-B-004](Failed_Screenshots/fail_g14_mixed_lang_1785689935819.png) |


### BUG-B-006: Unsave không có dialog xác nhận
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B1-b |
| **Checklist ID** | S-06 |
| **Bước tái hiện** | Click "Unsave" trên event card trong Saved Events |
| **Kỳ vọng** | Dialog xác nhận trước khi bỏ lưu |
| **Thực tế** | Bỏ lưu ngay lập tức |
| **Mức nghiêm trọng** | 2 — Minor |
| **Ảnh** | ![BUG-B-006](Failed_Screenshots/fail_s06_unsave_button_1785690261269.png) |

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
| **Ảnh** | ![BUG-B-008](Failed_Screenshots/fail_f01_search_no_label_1785689631111.png) |

### BUG-B-009: Nhãn Save/Saved/Unsave/Save event không nhất quán
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B1, B1-b, B2 |
| **Checklist ID** | G-02 |
| **Bước tái hiện** | So sánh nhãn trên 3 trang |
| **Kỳ vọng** | Cùng chức năng → cùng nhãn |
| **Thực tế** | 3 nhãn khác nhau cho cùng chức năng bookmark |
| **Mức nghiêm trọng** | 2 — Minor (vi phạm Shneiderman #1) |
| **Ảnh** | ![BUG-B-009](Failed_Screenshots/fail_g02_save_event_1785690214527.png) |


### BUG-B-011: Registration form không đánh dấu bắt buộc trước submit
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B2 |
| **Checklist ID** | F-02 |
| **Bước tái hiện** | Mở event detail, cuộn xuống Registration roles |
| **Kỳ vọng** | Dấu `*` hoặc "required" cho biết phải chọn ≥ 1 role |
| **Thực tế** | Không có dấu hiệu bắt buộc — message đỏ chỉ hiện khi nút disabled |
| **Mức nghiêm trọng** | 1 — Cosmetic |
| **Ảnh** | ![BUG-B-011](Failed_Screenshots/fail_f02_s11_registration_1785690112316.png) |

### BUG-B-012: Registration roles thiếu chú giải màu
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B2 |
| **Checklist ID** | S-11 |
| **Bước tái hiện** | Mở event detail, cuộn xuống Registration roles |
| **Kỳ vọng** | Có legend giải nghĩa 4 màu trạng thái |
| **Thực tế** | Không có chú giải, phải đọc text trên từng badge |
| **Mức nghiêm trọng** | 1 — Cosmetic |
| **Ảnh** | ![BUG-B-012](Failed_Screenshots/fail_f02_s11_registration_1785690112316.png) |

### BUG-B-013: Một số event card thiếu thumbnail
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B1 |
| **Checklist ID** | G-10 |
| **Bước tái hiện** | Cuộn qua danh sách events trên dashboard |
| **Kỳ vọng** | Mọi event card có ảnh thumbnail hoặc placeholder có nội dung |
| **Thực tế** | Nhiều card hiện placeholder icon ảnh xám — thiếu thông tin thị giác |
| **Mức nghiêm trọng** | 1 — Cosmetic |
| **Ảnh** | ![BUG-B-013](Failed_Screenshots/fail_g10_placeholder_1785689883882.png) |



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
