# Task 1A — Prompt AI dùng để xây checklist *(sản phẩm nhóm số 3)*

> Đề §6 Task 1A: *"Nộp các sản phẩm nhóm sau: … (3) các **prompt AI** đã dùng để **sinh và tinh chỉnh checklist**."* · §15 xếp vào "Sản phẩm cấp nhóm".
>
> File này **chỉ chứa các prompt trực tiếp tạo ra checklist**. Prompt phục vụ việc riêng của từng thành viên (Task 1B, 2, 3) nằm ở AI Audit Report cá nhân của người đó — đề §10.

**Công cụ:** Claude Code (Claude Opus 5) · **Ngày:** 01/08/2026
**Người chạy bản nháp:** 23127262 – Lý Quốc Thạnh

---

## Nguyên tắc áp dụng

Đề §2 cấm prompt chung chung kiểu *"tạo checklist GUI và tìm lỗi usability trong app này"*, yêu cầu **dẫn AI qua từng bước của kỹ thuật**. Bốn prompt dưới đây theo đúng trình tự đó: kiểm dữ kiện → ép dùng nguồn sơ cấp → phản biện nguồn → mới sinh checklist → đối chiếu sản phẩm thật.

---

## P1 — Kiểm kê dữ kiện trước khi cho AI viết

> *"phần A của phần 1 khi có @S13_GUI Testing & Usability Testing.pdf thì bạn có thể tham khảo đầy đủ chưa"*

**Output:** AI grep toàn bộ slide và báo cáo slide `S13` **không chứa** Nielsen / Norman / Shneiderman / SUS / thang severity 0–4; đồng thời chỉ ra slide **có** checklist categories (tr.16), navigation testing (tr.17–18) và 16 common GUI bugs (tr.11–14).

**Vì sao đưa vào:** buộc AI tự khai dữ kiện đang thiếu thay vì trả lời từ trí nhớ. Nếu bỏ bước này, checklist sẽ được viết trên nền tri thức chung chung thay vì bám bài giảng môn học.

---

## P2 — Ép dùng nguồn sơ cấp

> *"nếu chưa có đủ dữ kiện cho phần A task 1 bạn phải fetch thông tin ở các trang browser về"*

**Output:** AI truy xuất nngroup.com (10 heuristics + thang severity 0–4), cs.umd.edu/~ben (8 golden rules bản 6th ed.), measuringu.com (SUS), browserstack.com (emulator/simulator/real device) → dựng thành `Task1A_Heuristics-Reference.md`.

**Vì sao đưa vào:** chuyển AI từ chế độ "nhớ lại" sang "tra cứu". Chính bước này lộ ra AI đã đưa **bản Shneiderman lỗi thời** ở lượt trước.

---

## P3 — Phản biện chất lượng nguồn

> *"oke theo bản chính mới đúng chứ sao theo nhận định chủ quan của bạn"*

**Output:** AI thừa nhận bản Shneiderman đưa trước đó lấy từ trí nhớ nên sai (Rule 2 và Rule 7 đã đổi lời ở bản 6th edition), và tự phân loại chất lượng từng nguồn — Norman là nguồn **thứ cấp**, cần đối chiếu sách gốc.

**Vì sao đưa vào:** AI không tự khai giới hạn của nó nếu không bị hỏi thẳng. Đây là bước kiểm soát chất lượng nguồn.

---

## P4 — Sinh checklist

> *"thực hiện phần A của task 1"*

**Output:** checklist phủ IA-01…IA-04, mỗi mục có cột **Nguồn** (truy về R1–R10) và cột **Nguồn gốc** (`AI` hay `RV`), kèm §5 phân tích lý do AI bỏ sót chia ba nhóm nguyên nhân `[EMS]` `[Prompt]` `[Model]`.

**Nhóm đã chỉnh gì:** bổ sung 6 mục đặc thù pool C mà AI không thể biết; sau đó **viết lại 6 mục này** khi đối chiếu EMS thật.

---

## P5 — Đối chiếu với sản phẩm thật

> *"bạn dùng playwright live click đi"*

**Output:** khảo sát trực tiếp `https://prod-dev.ems-fitus.cloud/dashboard/admin` — phát hiện **Reset Password không tồn tại**, Assign Role và Block/Unblock nằm chung trong dialog Edit User, không có breadcrumb, avatar là chữ viết tắt chứ không phải ảnh.

**Nhóm đã chỉnh gì:** viết lại `G-17` `G-18` `N-16` `N-17` `S-19` `S-20` cho khớp giao diện thực tế. Chi tiết ở §6 của checklist.

**Vì sao đưa vào:** đây là bước biến output AI thành sản phẩm đã kiểm chứng — đề §2 yêu cầu, và là bằng chứng nhóm không nộp output thô.

---

## Kết quả

| Chỉ số | Giá trị |
|---|---|
| Tổng số mục | 74 |
| Do AI sinh | 30 |
| Nhóm bổ sung sau review | 44 |
| Mục phải viết lại sau khi đối chiếu app thật | 6 |

---

## ⚠️ Lưu ý cho từng thành viên

File này là **prompt chung của nhóm để xây checklist** — được phép giống nhau giữa các thành viên.

**Prompt riêng của bạn cho Task 1B, Task 2, Task 3 thì không.** Đề §18: *"Sao chép giữa sinh viên — kể cả prompt — → 0 điểm cho cả hai bên."* Mỗi người tự ghi phần đó vào `AI-Audit-Report.md` của mình.
