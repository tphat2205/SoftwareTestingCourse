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

## 3. Kết quả chạy Checklist

### 2.1 B1 — Dashboard & Tìm kiếm (`/dashboard`)

| ID | Mục kiểm tra | Kết quả | Notes |
|---|---|---|---|
| **IA-01 — Chuẩn UI chung** | | | |
| G-01 | Tiêu đề trang khớp với mục đang chọn trên menu | **Passed** | Heading "Events" khớp với mục "Events" được highlight trên top nav |
| G-02 | Cùng chức năng dùng cùng nhãn ở mọi màn hình | **Failed** | Nút "Save"/"Saved" trên event card dùng text, nhưng trên sidebar dùng icon bookmark không có label — thiếu nhất quán. Ngoài ra "Rows per page" (pagination) vs "Showing 1 of 52 events" dùng hai cách đếm khác nhau |
| G-03 | Bảng: text trái, số phải, trạng thái giữa | **N/A** | Dashboard không dùng bảng dữ liệu |
| G-04 | Tối đa 2 họ font; cỡ chữ theo thang nhất quán | **Passed** | Dùng font sans-serif nhất quán, cỡ chữ phân cấp rõ ràng (heading > card title > body > caption) |
| G-05 | Màu đúng ngữ nghĩa: đỏ chỉ cho lỗi/phá huỷ | **Failed** | Nút "Saved" dùng màu đỏ cho trạng thái "đã lưu" — đỏ thường mang nghĩa lỗi/xoá/nguy hiểm, không phù hợp cho hành động tích cực. Nên dùng màu primary hoặc accent |
| G-06 | Mỗi màn hình chỉ có 1 nút hành động chính | **Passed** | Không có nút CTA chính nổi bật trên dashboard (đây là trang danh sách), mỗi card có "Save" nhưng đó là hành động phụ |
| G-07 | Nội dung không tràn ngang ở ≥ 1280px | **Passed** | Không có thanh cuộn ngang ở viewport 1440px |
| G-08 | Empty state có thông điệp + gợi ý hành động | **Passed** | Chưa trigger được empty state trên dashboard (52 events), nhưng search không kết quả hiện "No events found" |
| G-09 | Loading có skeleton/spinner; không nhảy layout | **Passed** | Quan sát được loading state khi chuyển tab |
| G-10 | Ảnh giữ đúng tỉ lệ, không méo | **Failed** | Một số event card thiếu thumbnail — hiện placeholder icon ảnh xám trên nền trắng. Khi có ảnh thì giữ đúng tỉ lệ 4:3 |
| G-11 | Không lộ mã trạng thái nội bộ ra giao diện | **Passed** | Không thấy mã nội bộ nào trên dashboard |
| G-12 | Tương phản chữ/nền ≥ 4.5:1 | **Passed** | Text đậm trên nền sáng, contrast đạt yêu cầu |
| G-13 | Vẫn đọc được khi zoom 200% | **Failed** | Khi zoom 200%, sidebar icons bị chồng lên content chính; event cards bị tràn ra ngoài viewport |
| G-14 | Chuyển EN/VI dịch toàn bộ | **Failed** | Ở chế độ EN: tiêu đề sự kiện, mô tả, địa điểm hiển thị tiếng Việt nhưng labels UI bằng tiếng Anh → trộn ngôn ngữ trên cùng màn hình |
| G-15 | Text tiếng Việt không vỡ nút/cắt chữ | **Passed** | Quan sát các event title dài tiếng Việt vẫn hiển thị bình thường |
| G-16 | Ngôn ngữ đã chọn được lưu lại sau reload | **Passed** | Reload trang vẫn giữ nguyên ngôn ngữ EN |
| G-17 | Avatar chữ viết tắt gọn trong vòng tròn | **Passed** | Avatar "PDT" hiện đúng trong vòng tròn, không tràn |
| G-18 | Member Code hiển thị đầy đủ | **N/A** | Dashboard không hiển thị Member Code |
| **IA-02 — Forms** | | | |
| F-01 | Mọi ô nhập có nhãn thường trực | **Failed** | Search bar chỉ có placeholder "Search events by title..." — khi gõ thì placeholder biến mất, không có label thường trực |
| F-02 | Trường bắt buộc đánh dấu rõ | **N/A** | Dashboard không có form submit |
| F-03 | Submit thiếu trường bắt buộc → chặn | **N/A** | Không có form submit |
| F-04 | Lỗi hiện ngay cạnh trường bị lỗi | **N/A** | Không có form |
| F-05 | Lỗi nói rõ cách sửa | **N/A** | Không có form |
| F-06 | Giá trị mặc định hợp lý | **N/A** | Không có form |
| F-07 | Ràng buộc ngay tại control | **N/A** | Không có form |
| F-08 | Focus nhảy về trường lỗi đầu tiên | **N/A** | Không có form |
| F-09 | Upload nêu rõ định dạng/dung lượng/tỉ lệ | **N/A** | Không có upload |
| F-10 | Upload có progress, huỷ được, báo lỗi | **N/A** | Không có upload |
| F-11 | Nút Submit khoá khi đang gửi | **N/A** | Không có submit |
| F-12 | Cảnh báo mất dữ liệu khi rời form | **N/A** | Không có form nhập liệu |
| F-13 | Thao tác hoàn toàn bằng bàn phím + focus rõ | **Failed** | Tab qua các filter/search được, nhưng viền focus trên event cards không rõ ràng, khó nhận biết card nào đang được focus |
| F-14 | Validation chéo ngày/giờ | **N/A** | Không có form ngày/giờ |
| F-15 | Validation thời gian đóng đăng ký | **N/A** | Không có form |
| F-16 | Trường bắt buộc có điều kiện | **N/A** | Không có form |
| F-17 | Bật/tắt công tắc ẩn/hiện đúng trường | **N/A** | Không có toggle |
| F-18 | Upload sai tỉ lệ được báo trước | **N/A** | Không có upload |
| F-19 | Rich-text giữ định dạng sau lưu-mở lại | **N/A** | Không có rich-text editor |
| F-20 | Upload nhiều ảnh nêu rõ giới hạn | **N/A** | Không có upload |
| F-21 | Upload ảnh có preview/xoá/validation | **N/A** | Không có upload |
| F-22 | Công tắc Public Event | **N/A** | Chức năng admin |
| F-23 | Album Link validation | **N/A** | Chức năng admin |
| F-24 | Reminder before hours | **N/A** | Chức năng admin |
| F-25 | Validation chéo Check-in | **N/A** | Chức năng admin |
| F-26 | Check-in vs Start/End | **N/A** | Chức năng admin |
| **IA-03 — Navigation** | | | |
| N-01 | Menu chính truy cập mọi khu vực lớn | **Passed** | Top nav có: Events, Calendar, Saved Events, User guide |
| N-02 | Mục đang xem đánh dấu active rõ | **Passed** | "Events" trên top nav highlight màu xanh lá |
| N-03 | Breadcrumb đúng đường đi | **N/A** | Dashboard là trang gốc, không có breadcrumb |
| N-04 | Trang chi tiết có đường quay lại | **N/A** | Dashboard là trang danh sách gốc |
| N-05 | Link/nút dẫn tới đúng màn hình | **Passed** | Click event card → đúng trang chi tiết |
| N-06 | Tab giữ nội dung khi chuyển qua lại | **Passed** | Chuyển Upcoming/Ongoing/Ended giữ đúng nội dung |
| N-07 | Nút Back trình duyệt hoạt động đúng | **Passed** | Back từ chi tiết → về dashboard đúng |
| N-08 | Deep link mở đúng bản ghi | **N/A** | Dashboard không có deep link cụ thể |
| N-09 | Bộ lọc/từ khoá được giữ lại khi quay về | **Failed** | Search keyword bị mất khi vào event detail rồi back |
| N-10 | Sau lưu trả về đúng ngữ cảnh | **N/A** | Dashboard không có hành động lưu |
| N-11 | Tab bàn phím đúng thứ tự; Esc đóng modal | **Passed** | Thứ tự hợp lý |
| N-12 | Kéo-thả có phản hồi thị giác | **N/A** | Không có kéo-thả |
| N-13 | Thứ tự sau kéo-thả lưu đúng | **N/A** | Không có kéo-thả |
| N-14 | Kéo-thả có phương án thay thế | **N/A** | Không có kéo-thả |
| N-15 | URL admin thiếu quyền → báo lỗi | **N/A** | Đang test phía user |
| N-16 | Cột bảng sắp xếp có chỉ báo hướng | **N/A** | Không dùng bảng sort |
| N-17 | Thông tin audit hiển thị đủ | **N/A** | Không có audit |
| N-18 | Tab Pending/Resolved | **N/A** | Không có support |
| N-19 | Clear filters xoá đồng thời và làm mới | **Passed** | Clear filters xoá tất cả bộ lọc |
| **IA-04 — Feedback / State** | | | |
| S-01 | Hành động thay đổi dữ liệu có phản hồi | **Passed** | Click Save → icon đổi sang "Saved" ngay |
| S-02 | Mức phản hồi tương xứng | **Passed** | Save/Unsave: thay đổi nhẹ nhàng |
| S-03 | Thao tác kéo dài có chỉ báo | **Passed** | Loading indicator khi tải trang |
| S-04 | Toast tự tắt, không che nội dung | **Passed** | Toast góc phải trên, tự tắt ~3 giây |
| S-05 | Lỗi hệ thống dùng ngôn ngữ thường | **N/A** | Chưa trigger lỗi |
| S-06 | Hành động phá huỷ có dialog xác nhận | **N/A** | Dashboard không có hành động phá huỷ |
| S-07 | Dialog: nút mặc định an toàn | **N/A** | Không có dialog |
| S-08 | Hành động hoàn tác được | **Passed** | Save ↔ Unsave toggle hoạt động |
| S-09 | Thông báo hoàn tất chuỗi thao tác | **N/A** | Không có chuỗi nhiều bước |
| S-10 | Trạng thái không chỉ bằng màu | **Passed** | Badge có text + màu |
| S-11 | Bảng nhiều màu có chú giải | **N/A** | Không có bảng trạng thái |
| S-12 | Trạng thái nút khớp dữ liệu | **Passed** | Save/Saved đổi đúng |
| S-13 | Progress bar đúng tiến độ | **N/A** | Không có progress bar |
| S-14 | Real-time tự cập nhật | **N/A** | Không có real-time list |
| S-15 | Nhánh check-in phân biệt | **N/A** | Không có check-in |
| S-16 | Hành động bị chặn có giải thích | **N/A** | Không có hành động bị chặn |
| S-17 | Export có chỉ báo | **N/A** | Không có export |
| S-18 | Badge thông báo đúng số lượng | **Passed** | Bell icon hiện badge số |
| S-19 | Đổi trạng thái Active cập nhật ngay | **N/A** | Không có toggle Active |
| S-20 | Trường mật khẩu nêu ràng buộc | **N/A** | Không có mật khẩu |
| S-21 | Gửi phản hồi support → thông báo | **N/A** | Không có support |
| S-22 | Internal note tách khỏi response | **N/A** | Không có support |
| S-23 | Ảnh mở trong lightbox | **N/A** | Không có lightbox |
| S-24 | Save/Unsave cập nhật ngay không cần reload | **Passed** | Click Save → icon đổi ngay, không reload |
| S-25 | Carousel tạm dừng khi hover | **Failed** | Carousel spotlight tiếp tục chuyển slide dù chuột đang ở trong vùng |

**Tổng kết B1:**
- **Passed:** 26
- **Failed:** 8 (G-02, G-05, G-10, G-13, G-14, F-01, F-13, N-09, S-25)
- **N/A:** 54
- **Tỉ lệ pass:** 26 / (26 + 8) = **76.5%**

---

### 2.2 B1-b — Trang Saved Events (`/my-favorites`)

| ID | Mục kiểm tra | Kết quả | Notes |
|---|---|---|---|
| **IA-01 — Chuẩn UI chung** | | | |
| G-01 | Tiêu đề trang khớp mục trên menu | **Passed** | "Saved Events" khớp với top nav |
| G-02 | Cùng chức năng dùng cùng nhãn | **Failed** | "Unsave" (B1-b) vs "Saved" toggle (B1) — cùng hành động bỏ lưu nhưng nhãn và kiểu nút khác nhau |
| G-03 | Bảng: text trái, số phải | **N/A** | Dùng card list, không bảng |
| G-04 | Font/cỡ chữ nhất quán | **Passed** | Nhất quán với Dashboard |
| G-05 | Màu đúng ngữ nghĩa | **Failed** | Badge "Saved" dùng đỏ — sai ngữ nghĩa |
| G-06 | Mỗi màn hình 1 nút hành động chính | **Passed** | "View details" chính, "Unsave" phụ |
| G-07 | Không tràn ngang ≥ 1280px | **Passed** | Không tràn |
| G-08 | Empty state có thông điệp + gợi ý | **Passed** | "No saved events yet" + hướng dẫn save |
| G-09 | Loading skeleton; không nhảy layout | **Passed** | Tải nhanh, không nhảy |
| G-10 | Ảnh đúng tỉ lệ | **Passed** | Thumbnail đúng 4:3 |
| G-11 | Không lộ mã nội bộ | **Passed** | Không thấy |
| G-12 | Tương phản ≥ 4.5:1 | **Passed** | Đạt |
| G-13 | Đọc được zoom 200% | **Failed** | Nút chồng nhau khi zoom 200% |
| G-14 | EN/VI dịch toàn bộ | **Failed** | Trộn EN/VI |
| G-15 | Text Việt không vỡ nút | **Passed** | Bình thường |
| G-16 | Ngôn ngữ lưu sau reload | **Passed** | Giữ nguyên |
| G-17 | Avatar gọn | **Passed** | Đúng |
| G-18 | Member Code | **N/A** | Không hiển thị |
| **IA-02 — Forms** | | | |
| F-01 | Nhãn thường trực | **Failed** | Search bar chỉ placeholder |
| F-02 – F-26 | Các mục form | **N/A** | Không có form (×25) |
| **IA-03 — Navigation** | | | |
| N-01 | Menu truy cập mọi khu vực | **Passed** | Top nav đầy đủ |
| N-02 | Mục active rõ | **Passed** | "Saved Events" highlight |
| N-03 | Breadcrumb | **N/A** | Dùng "← Back to dashboard" |
| N-04 | Đường quay lại | **Passed** | "← Back to dashboard" link |
| N-05 | Link/nút đúng | **Passed** | "View details" và "Back" đều đúng |
| N-06 | Tab giữ nội dung | **N/A** | Không có tab |
| N-07 | Back trình duyệt | **Passed** | Đúng |
| N-08 | Deep link | **N/A** | Không có deep link con |
| N-09 | Bộ lọc giữ lại | **Failed** | Search keyword bị mất khi View details rồi back |
| N-10 | Sau lưu đúng ngữ cảnh | **N/A** | Không có lưu |
| N-11 | Tab bàn phím; Esc modal | **Passed** | Hợp lý |
| N-12 – N-14 | Kéo-thả | **N/A** | ×3 |
| N-15 | Admin URL | **N/A** | User side |
| N-16 | Sort cột | **N/A** | Không bảng |
| N-17 | Audit | **N/A** | Không có |
| N-18 | Pending/Resolved | **N/A** | Không support |
| N-19 | Clear filters | **N/A** | Không có nút Clear |
| **IA-04 — Feedback / State** | | | |
| S-01 | Phản hồi thay đổi dữ liệu | **Passed** | Unsave → event biến mất ngay |
| S-02 | Mức phản hồi tương xứng | **Passed** | Nhẹ nhàng |
| S-03 | Chỉ báo kéo dài | **N/A** | Nhanh |
| S-04 | Toast tự tắt | **Passed** | "Event unsaved" tự tắt |
| S-05 | Lỗi ngôn ngữ thường | **N/A** | Chưa trigger |
| S-06 | Dialog xác nhận phá huỷ | **Failed** | Unsave **không có dialog xác nhận** — bỏ lưu ngay lập tức |
| S-07 | Nút an toàn mặc định | **N/A** | Không dialog |
| S-08 | Hoàn tác được | **Failed** | Không có Undo — phải quay Dashboard tìm lại event |
| S-09 | Thông báo hoàn tất | **N/A** | Không chuỗi |
| S-10 | Không chỉ bằng màu | **Passed** | Badge có text + icon + màu |
| S-11 – S-23 | Các mục khác | **N/A** | ×13 |
| S-24 | Save/Unsave ngay | **Passed** | Cập nhật ngay |
| S-25 | Carousel hover | **N/A** | Không carousel |

**Tổng kết B1-b:**
- **Passed:** 22
- **Failed:** 8 (G-02, G-05, G-13, G-14, F-01, N-09, S-06, S-08)
- **N/A:** 58
- **Tỉ lệ pass:** 22 / (22 + 8) = **73.3%**

---

### 2.3 B2 — Trang chi tiết sự kiện (`/events/{id}`)

| ID | Mục kiểm tra | Kết quả | Notes |
|---|---|---|---|
| **IA-01 — Chuẩn UI chung** | | | |
| G-01 | Tiêu đề khớp menu | **Passed** | "Events" highlight |
| G-02 | Cùng chức năng cùng nhãn | **Failed** | "Save event" (B2) vs "Save" (B1) vs "Unsave" (B1-b) — cùng chức năng, 3 nhãn khác |
| G-03 | Bảng | **N/A** | Không bảng |
| G-04 | Font nhất quán | **Passed** | Đúng |
| G-05 | Màu đúng ngữ nghĩa | **Passed** | Status cards dùng màu đúng |
| G-06 | 1 nút hành động chính | **Passed** | "Register (Student)" rõ ràng |
| G-07 | Không tràn ngang | **Passed** | Đúng |
| G-08 | Empty state | **N/A** | Luôn có nội dung |
| G-09 | Loading skeleton | **Passed** | Banner không nhảy layout |
| G-10 | Ảnh đúng tỉ lệ | **Passed** | Banner đúng |
| G-11 | Không lộ mã nội bộ | **Passed** | Không thấy |
| G-12 | Tương phản ≥ 4.5:1 | **Passed** | Đạt |
| G-13 | Zoom 200% | **Failed** | Card ngày/giờ tràn và cắt |
| G-14 | EN/VI toàn bộ | **Failed** | Labels EN, role names VI → trộn nghiêm trọng |
| G-15 | Việt không vỡ | **Passed** | Đúng |
| G-16 | Ngôn ngữ lưu | **Passed** | Đúng |
| G-17 | Avatar gọn | **Passed** | Đúng |
| G-18 | Member Code | **N/A** | Không hiển thị |
| **IA-02 — Forms** | | | |
| F-01 | Nhãn thường trực | **N/A** | Registration dùng checkbox, không text input |
| F-02 | Bắt buộc đánh dấu | **Failed** | Không đánh dấu `*` cho biết phải chọn ≥ 1 role. Message đỏ "Please tick a role..." hiện khi nút disabled nhưng chưa đánh dấu theo quy ước |
| F-03 | Submit chặn | **Passed** | Register disabled khi chưa chọn role |
| F-04 | Lỗi cạnh trường | **Passed** | Message ngay dưới danh sách role |
| F-05 | Lỗi nói cách sửa | **Passed** | "Please tick a role" rõ ràng |
| F-06 | Mặc định hợp lý | **Passed** | Không tick mặc định — hợp lý |
| F-07 | Ràng buộc tại control | **Passed** | Register disabled cho đến khi chọn |
| F-08 | Focus nhảy về lỗi | **N/A** | Chỉ checkbox |
| F-09 – F-12 | Upload, Submit lock, mất dữ liệu | **N/A** | ×4 |
| F-13 | Bàn phím + focus rõ | **Failed** | Viền focus trên checkbox role không rõ ràng |
| F-14 – F-26 | Các mục admin | **N/A** | ×13 |
| **IA-03 — Navigation** | | | |
| N-01 | Menu đầy đủ | **Passed** | Top nav đủ |
| N-02 | Active rõ | **Passed** | "Events" highlight |
| N-03 | Breadcrumb | **N/A** | Dùng "← Back to events" |
| N-04 | Đường quay lại | **Passed** | "← Back to events" link |
| N-05 | Link đúng | **Passed** | Back → dashboard đúng |
| N-06 | Tab giữ nội dung | **N/A** | Không tab |
| N-07 | Back trình duyệt | **Passed** | Đúng |
| N-08 | Deep link | **Passed** | `/events/68` mở đúng event |
| N-09 | Bộ lọc giữ lại | **N/A** | Không filter |
| N-10 | Sau lưu đúng ngữ cảnh | **N/A** | Không lưu form |
| N-11 | Tab bàn phím; Esc modal | **Passed** | Share dialog đóng bằng Esc |
| N-12 – N-18 | Kéo-thả, admin, sort, audit, support | **N/A** | ×7 |
| N-19 | Clear filters | **N/A** | Không filter |
| **IA-04 — Feedback / State** | | | |
| S-01 | Phản hồi thay đổi | **Passed** | Save/Unsave → toast + icon đổi |
| S-02 | Mức phản hồi | **Passed** | Tương xứng |
| S-03 | Chỉ báo kéo dài | **N/A** | Chưa trigger |
| S-04 | Toast tự tắt | **Passed** | Đúng |
| S-05 | Lỗi ngôn ngữ thường | **N/A** | Chưa trigger |
| S-06 | Dialog xác nhận | **N/A** | Không phá huỷ |
| S-07 | Nút an toàn | **N/A** | Không dialog |
| S-08 | Hoàn tác | **Passed** | Save ↔ Unsave toggle |
| S-09 | Hoàn tất chuỗi | **N/A** | Chưa hoàn tất đăng ký |
| S-10 | Không chỉ bằng màu | **Passed** | Text + màu |
| S-11 | Nhiều màu có chú giải | **Failed** | 4 màu trạng thái (Registered, Pending, Confirmed, Waitlisted) **không có legend/chú giải** |
| S-12 | Nút khớp dữ liệu | **Passed** | Register enabled/disabled đúng |
| S-13 – S-23 | Các mục đặc thù | **N/A** | ×11 |
| S-24 | Save/Unsave ngay | **Passed** | Đổi ngay, không reload |
| S-25 | Carousel hover | **N/A** | Không carousel |

**Tổng kết B2:**
- **Passed:** 28
- **Failed:** 6 (G-02, G-13, G-14, F-02, F-13, S-11)
- **N/A:** 54
- **Tỉ lệ pass:** 28 / (28 + 6) = **82.4%**

---

## 4. Tổng hợp kết quả

| Màn hình | Passed | Failed | N/A | Tỉ lệ pass |
|---|---|---|---|---|
| **B1 — Dashboard** | 26 | 8 | 54 | **76.5%** |
| **B1-b — Saved Events** | 22 | 8 | 58 | **73.3%** |
| **B2 — Chi tiết sự kiện** | 28 | 6 | 54 | **82.4%** |
| **Tổng cộng** | 76 | 22 | 166 | **77.6%** |

| Màn hình | Passed | Failed | N/A | Tỉ lệ pass |
|---|---|---|---|---|
| **B1 — Dashboard** | 26 | 8 | 54 | **76.5%** |
| **B1-b — Saved Events** | 22 | 8 | 58 | **73.3%** |
| **B2 — Chi tiết sự kiện** | 28 | 6 | 54 | **82.4%** |
| **Tổng cộng** | 76 | 22 | 166 | **77.6%** |

---

## 5. Danh sách Bug phát hiện

### BUG-B-001: Carousel spotlight không tạm dừng khi hover
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B1 — Dashboard |
| **Checklist ID** | S-25 |
| **Bước tái hiện** | 1. Mở `/dashboard` → 2. Đưa chuột vào vùng carousel spotlight event |
| **Kỳ vọng** | Carousel tạm dừng auto-rotate khi hover |
| **Thực tế** | Carousel tiếp tục chuyển slide |
| **Mức nghiêm trọng** | 2 — Minor (vi phạm WCAG 2.2.2) |
| **Ảnh** | ![BUG-B-001](file:///d:/Project/SoftwareTesting/HW03/Task1B_Checklist_Execution/Failed_Screenshots/fail_s25_carousel_1785689527704.png) |

### BUG-B-002: Nút Save/Saved dùng màu đỏ cho trạng thái tích cực
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B1, B1-b, B2 |
| **Checklist ID** | G-05 |
| **Bước tái hiện** | Click "Save" trên event card bất kỳ |
| **Kỳ vọng** | Trạng thái "Saved" dùng màu tích cực |
| **Thực tế** | "Saved" dùng màu đỏ — sai quy ước ngữ nghĩa |
| **Mức nghiêm trọng** | 1 — Cosmetic |
| **Ảnh** | ![BUG-B-002](file:///d:/Project/SoftwareTesting/HW03/Task1B_Checklist_Execution/Failed_Screenshots/fail_g05_save_red_1785689566491.png) |

### BUG-B-003: Search keyword bị mất khi quay lại từ trang chi tiết
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B1, B1-b |
| **Checklist ID** | N-09 |
| **Bước tái hiện** | 1. Nhập keyword → 2. Click event → 3. Bấm Back |
| **Kỳ vọng** | Keyword và kết quả được giữ lại |
| **Thực tế** | Search bar reset, hiện toàn bộ events |
| **Mức nghiêm trọng** | 3 — Major |
| **Ảnh** | ![BUG-B-003](file:///d:/Project/SoftwareTesting/HW03/Task1B_Checklist_Execution/Failed_Screenshots/fail_n09_search_after_1785690326219.png) |

### BUG-B-004: Trộn ngôn ngữ EN/VI trên tất cả các trang
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B1, B1-b, B2 |
| **Checklist ID** | G-14 |
| **Bước tái hiện** | Mở bất kỳ trang nào với language = EN |
| **Kỳ vọng** | Toàn bộ text bằng tiếng Anh |
| **Thực tế** | Labels EN, nội dung/role names VI → trộn ngôn ngữ |
| **Mức nghiêm trọng** | 2 — Minor |
| **Ảnh** | ![BUG-B-004](file:///d:/Project/SoftwareTesting/HW03/Task1B_Checklist_Execution/Failed_Screenshots/fail_g14_mixed_lang_1785689935819.png) |

### BUG-B-005: Layout vỡ khi zoom 200%
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B1, B1-b, B2 |
| **Checklist ID** | G-13 |
| **Bước tái hiện** | Ctrl+= zoom lên 200% |
| **Kỳ vọng** | Layout responsive, nội dung đọc được |
| **Thực tế** | Sidebar chồng content (B1), nút chồng nhau (B1-b), card tràn (B2) |
| **Mức nghiêm trọng** | 2 — Minor (vi phạm WCAG 1.4.4) |
| **Ảnh** | *(Lỗi layout toàn màn hình, khó chụp chi tiết)* |

### BUG-B-006: Unsave không có dialog xác nhận
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B1-b |
| **Checklist ID** | S-06 |
| **Bước tái hiện** | Click "Unsave" trên event card trong Saved Events |
| **Kỳ vọng** | Dialog xác nhận trước khi bỏ lưu |
| **Thực tế** | Bỏ lưu ngay lập tức |
| **Mức nghiêm trọng** | 2 — Minor |
| **Ảnh** | ![BUG-B-006](file:///d:/Project/SoftwareTesting/HW03/Task1B_Checklist_Execution/Failed_Screenshots/fail_s06_unsave_button_1785690261269.png) |

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
| **Ảnh** | ![BUG-B-008](file:///d:/Project/SoftwareTesting/HW03/Task1B_Checklist_Execution/Failed_Screenshots/fail_f01_search_no_label_1785689631111.png) |

### BUG-B-009: Nhãn Save/Saved/Unsave/Save event không nhất quán
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B1, B1-b, B2 |
| **Checklist ID** | G-02 |
| **Bước tái hiện** | So sánh nhãn trên 3 trang |
| **Kỳ vọng** | Cùng chức năng → cùng nhãn |
| **Thực tế** | 3 nhãn khác nhau cho cùng chức năng bookmark |
| **Mức nghiêm trọng** | 1 — Cosmetic (vi phạm Shneiderman #1) |
| **Ảnh** | ![BUG-B-009](file:///d:/Project/SoftwareTesting/HW03/Task1B_Checklist_Execution/Failed_Screenshots/fail_g02_save_event_1785690214527.png) |

### BUG-B-010: Viền focus không rõ ràng trên event cards và checkboxes
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B1, B2 |
| **Checklist ID** | F-13 |
| **Bước tái hiện** | Tab qua event cards (B1) hoặc checkboxes (B2) |
| **Kỳ vọng** | Viền focus rõ ràng |
| **Thực tế** | Viền focus mờ hoặc không thấy |
| **Mức nghiêm trọng** | 2 — Minor (vi phạm WCAG 2.4.7) |
| **Ảnh** | *(Lỗi thiếu thị giác)* |

### BUG-B-011: Registration form không đánh dấu bắt buộc trước submit
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B2 |
| **Checklist ID** | F-02 |
| **Bước tái hiện** | Mở event detail, cuộn xuống Registration roles |
| **Kỳ vọng** | Dấu `*` hoặc "required" cho biết phải chọn ≥ 1 role |
| **Thực tế** | Không có dấu hiệu bắt buộc — message đỏ chỉ hiện khi nút disabled |
| **Mức nghiêm trọng** | 1 — Cosmetic |
| **Ảnh** | ![BUG-B-011](file:///d:/Project/SoftwareTesting/HW03/Task1B_Checklist_Execution/Failed_Screenshots/fail_f02_s11_registration_1785690112316.png) |

### BUG-B-012: Registration roles thiếu chú giải màu
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B2 |
| **Checklist ID** | S-11 |
| **Bước tái hiện** | Mở event detail, cuộn xuống Registration roles |
| **Kỳ vọng** | Có legend giải nghĩa 4 màu trạng thái |
| **Thực tế** | Không có chú giải, phải đọc text trên từng badge |
| **Mức nghiêm trọng** | 1 — Cosmetic |
| **Ảnh** | ![BUG-B-012](file:///d:/Project/SoftwareTesting/HW03/Task1B_Checklist_Execution/Failed_Screenshots/fail_f02_s11_registration_1785690112316.png) |

### BUG-B-013: Một số event card thiếu thumbnail
| Thuộc tính | Giá trị |
|---|---|
| **Màn hình** | B1 |
| **Checklist ID** | G-10 |
| **Bước tái hiện** | Cuộn qua danh sách events trên dashboard |
| **Kỳ vọng** | Mọi event card có ảnh thumbnail hoặc placeholder có nội dung |
| **Thực tế** | Nhiều card hiện placeholder icon ảnh xám — thiếu thông tin thị giác |
| **Mức nghiêm trọng** | 1 — Cosmetic |
| **Ảnh** | ![BUG-B-013](file:///d:/Project/SoftwareTesting/HW03/Task1B_Checklist_Execution/Failed_Screenshots/fail_g10_placeholder_1785689883882.png) |
