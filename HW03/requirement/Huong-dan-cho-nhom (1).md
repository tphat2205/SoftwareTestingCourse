# Task 1A — Hướng dẫn cho nhóm

> Gửi kèm bản nháp checklist GUI dùng chung. Đây **chưa phải bản chốt** — cần cả nhóm review rồi mới nộp.

**Người soạn bản nháp:** 23127262 – Lý Quốc Thạnh *(kịch bản C — Admin quản lý người dùng)*
**Ngày:** 01/08/2026

---

## 1. Ba file trong gói này

| File | Là gì | Đề yêu cầu ở đâu |
|---|---|---|
| `GUI-Checklist.md` | Checklist 88 mục, phủ IA-01…IA-04 | §15 — sản phẩm nhóm (1) |
| `Task1A_Heuristics-Reference.md` | Danh sách nguồn R1–R10 (Nielsen, Norman, Shneiderman, slide S13, WCAG, SUS, severity, compatibility) | §15 — sản phẩm nhóm (2) |
| `AI-Prompts-Nhom.md` | 5 prompt đã dùng để sinh và tinh chỉnh checklist | §15 — sản phẩm nhóm (3) |

> Theo đề §10, mỗi thành viên vẫn phải **chép các prompt này vào AI Audit Report cá nhân** của mình — *"Các prompt tạo checklist của nhóm (§6, Task 1 Phần A) cũng thuộc phần này."*

Đề §15: *"Nộp một lần cho cả nhóm; mỗi thành viên giữ một bản."*

---

## 2. Bản nháp này được xây thế nào

- **30 mục** do AI sinh từ heuristic phổ quát ở lượt đầu
- **58 mục** mang nguồn gốc review (`RV`): 44 mục của bản trước, 6 mục Pool D, 3 mục từ bản Pool B, và **5 mục Pool A** (F-22–F-26) bổ sung sau khảo sát EMS thật ngày 02/08/2026
- **8 mục** đã phải **viết lại** sau khi khảo sát EMS thật, vì suy từ tài liệu ra sai *(6 từ Pool C + 2 từ Pool A: F-16/F-17, S-16 — chi tiết §6 của checklist)*

§5 của checklist giải thích **vì sao AI bỏ sót** từng mục, chia ba nhóm nguyên nhân: `[EMS]` không nhìn thấy sản phẩm · `[Prompt]` prompt chưa đủ dẫn dắt · `[Model]` giới hạn tri thức của model. Đây là phần đề §6 Task 1A bắt buộc phải có.

---

## 3. ⚠️ Vấn đề quan trọng nhất cần cả nhóm xử lý

Checklist đã được kiểm chứng trực tiếp trên **kịch bản A, C** và vòng đời **kịch bản D**. Pool B đã có 3 mục riêng được tích hợp từ bản `_B_Pool`, nhưng chưa có nhật ký kiểm chứng riêng trong các file được bàn giao:

| Kịch bản | Tình trạng | Mục cần người phụ trách xác minh |
|---|---|---|
| **A** — quản lý sự kiện | ✅ **đã kiểm trên EMS thật (02/08/2026)**, bởi Lê Thiên Phú (23127244), trên 3 màn hình A1 Events list · A2 Add/Edit Event form · A4 Participants & Reviews approval (A3 không tồn tại như một màn hình riêng — đã xác nhận nó là một phần của A2) | Đạt: `F-14` `F-16` `F-17` `F-19` `S-10` `S-11` `S-13` `S-18`. **Không đạt:** `F-15` (Registration Close không bị chặn dù sau Event End, sự kiện vẫn lên PUBLISHED), `F-18` (không kiểm tra tỉ lệ ảnh), **`S-16` (nghiêm trọng — xoá sự kiện đã có đăng ký KHÔNG bị chặn)**. N/A: `N-12`–`N-14`, `S-15` (ngoài phạm vi 3 màn hình). Đã thêm `F-22`–`F-26` (Public Event, Album Link, Reminder before hours, và khung giờ Check-in Open/Close — hoàn toàn chưa có trong tài liệu) |
| **C** — quản lý người dùng | ✅ đã kiểm trên EMS thật | — |
| **B** — đăng ký sự kiện | Đã tích hợp 3 mục riêng; **chưa có nhật ký kiểm chứng kèm theo** | `N-19` (Clear filters), `S-24` (Save/Unsave), `S-25` (carousel 7 giây và pause-on-hover). Chưa có mục riêng cho form đăng ký chọn role, vé QR/barcode và đánh giá sao |
| **D** — support request | ✅ đã kiểm D1–D4; hoàn tất guest → admin → guest trên `#44` và nhánh ảnh bổ sung `#45` | Đã thêm `F-20` (hướng dẫn upload), `F-21` (preview/xoá/validation ảnh), `N-18` (Pending/Resolved), `S-21` (gửi phản hồi + đồng bộ trạng thái), `S-22` (internal note tách khỏi official response), `S-23` (lightbox) |

**Bài học từ kịch bản C:** khảo sát thực tế cho thấy **Reset Password không tồn tại**, Assign Role và Block/Unblock nằm chung trong một dialog — khác hẳn mô tả trong đề.

**Bài học từ kịch bản A:** một giả định rút từ tài liệu E2E (S-16 — chặn xoá vì ràng buộc tham chiếu) hoá ra chỉ đúng cho một số đối tượng chứ không phải tất cả — **xoá sự kiện đã có đăng ký hoàn toàn không bị chặn**, cùng dialog xác nhận như xoá một sự kiện trống. Đây là phát hiện nghiêm trọng nhất tính đến nay trong cả nhóm. **Đừng tin tài liệu, mở app ra kiểm — kể cả khi một phần của tài liệu đã được xác nhận đúng ở nơi khác.**

---

## 4. Việc mỗi thành viên phải làm

- [ ] **Mở EMS** (`https://prod-dev.ems-fitus.cloud`, admin `admin@gmail.com` / `Admin@123`) và đối chiếu từng mục với 3 màn hình mình phụ trách
- [ ] **Sửa hoặc bỏ** mục nào không áp dụng được cho sản phẩm thật — ghi lý do
- [ ] **Bổ sung ít nhất 2 mục của riêng mình**. Chỉ giải thích **vì sao AI bỏ sót** khi có căn cứ trong log/output; không tự quy kết cho prompt/model nếu không có bằng chứng
- [ ] **Xác nhận các con số** trong mục mình phụ trách ở bảng §3 phía trên
- [ ] **Không trùng phạm vi** với người khác — điền vào bảng ở §5

> Đề §2: *"nộp thẳng output thô của AI là không chấp nhận được"*. Mục nào chưa ai mở app kiểm thì vẫn còn là output thô.

---

## 5. Bảng phân công — điền để chứng minh không trùng

Đề §5 + Chính sách môn (*Work Allocation*): không hai thành viên nào được cùng kịch bản **và** cùng tập màn hình.

| Thành viên | MSSV | Kịch bản | 3 màn hình phụ trách |
|---|---|---|---|
| Lý Quốc Thạnh | 23127262 | **C** | C1 Users Management · C2 dialog Edit User · C3 dialog Create New User |
| Đoàn Thành Phát | 23127241 | **B** | B1 Dashboard & Tìm kiếm · B1-b Trang Saved Events · B2 Trang chi tiết sự kiện |
| Lê Thiên Phú | 23127244 | **A** | A1 Events list · A2 Add/Edit Event form · A4 Participants & Reviews approval |
| | | | |

---

## 6. Quy ước thống nhất khi chạy checklist (Task 1B)

Mỗi ô nhận **một** trong: `Passed` · `Failed` · `N/A` — **không để trống**.

- `Failed` bắt buộc kèm **Notes (lý do)** và **ảnh chụp**
- `N/A` ghi ngắn lý do không áp dụng
- **Tỉ lệ pass = `Passed / (Passed + Failed)`** — không tính `N/A` vào mẫu số

Vì checklist phủ cả 4 kịch bản nên **N/A nhiều là bình thường**: ước tính mỗi màn hình thực chạy 35–45 mục trên tổng 88. *(Xác nhận từ Pool A: mỗi màn hình A1/A2/A4 thực chạy trong khoảng đó, phần N/A chủ yếu rơi vào các mục IA-02 dành cho Categories/Contexts/Social Media và tab Check-in.)*

---

## 7. 🔴 Ranh giới được phép giống nhau

Đề §18 ghi rõ:

> *"Sao chép giữa sinh viên — **kể cả prompt** — → **0 điểm cho cả hai bên**. Checklist dùng chung được phép giống nhau trong cùng nhóm; mọi thứ còn lại (chọn màn hình, thực thi, usability, cross-platform, findings) phải là của riêng bạn."*

| Được phép giống nhau | **Phải khác nhau hoàn toàn** |
|---|---|
| Checklist GUI (88 mục) | Chọn màn hình và lý do chọn |
| Danh sách nguồn tham khảo | Kết quả chạy checklist + ảnh |
| Prompt dùng để **xây checklist nhóm** | Prompt dùng cho Task 1B / 2 / 3 của riêng mình |
| | Usability Report, người tham gia |
| | Ma trận cross-platform |
| | Findings Log |
| | AI Audit Report, AI Critique |

**Chỉ gửi cho nhóm 3 file ở §1.** Các file khác trong bài của mình đừng chia sẻ — người khác chép vào là **cả hai cùng 0 điểm**.
