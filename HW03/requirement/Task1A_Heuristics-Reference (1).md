# Task 1A — Nền lý thuyết & Nguồn tham khảo cho GUI Checklist

> Tài liệu này phục vụ **HW03 Task 1 Phần A**, sản phẩm nộp số (2): *"danh sách nguồn tham khảo đã dùng (sách, bài viết, tiêu chuẩn, slide môn học)"* — theo `2026.HW03.GUI Usability EMS_Vi.md` §6.
> Tra cứu ngày **01/08/2026**.

---

## 1. Nielsen — 10 Usability Heuristics

**Nguồn:** Nielsen Norman Group — <https://www.nngroup.com/articles/ten-usability-heuristics/>
(Nielsen, J. 1994, *Enhancing the explanatory power of usability heuristics*; bản cập nhật NN/g)

| # | Heuristic | Định nghĩa chính thức | Ánh xạ IA |
|---|---|---|---|
| 1 | **Visibility of system status** | The design should always keep users informed about what is going on, through appropriate feedback within a reasonable amount of time. | IA-04 |
| 2 | **Match between the system and the real world** | The design should speak the users' language. Use words, phrases, and concepts familiar to the user, rather than internal jargon. Follow real-world conventions, making information appear in a natural and logical order. | IA-01, IA-02 |
| 3 | **User control and freedom** | Users often perform actions by mistake. They need a clearly marked "emergency exit" to leave the unwanted action without having to go through an extended process. | IA-03, IA-04 |
| 4 | **Consistency and standards** | Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform and industry conventions. | IA-01 |
| 5 | **Error prevention** | Good error messages are important, but the best designs carefully prevent problems from occurring in the first place. Either eliminate error-prone conditions, or check for them and present users with a confirmation option before they commit to the action. | IA-02, IA-04 |
| 6 | **Recognition rather than recall** | Minimize the user's memory load by making elements, actions, and options visible. The user should not have to remember information from one part of the interface to another. | IA-01, IA-03 |
| 7 | **Flexibility and efficiency of use** | Shortcuts — hidden from novice users — may speed up the interaction for the expert user so that the design can cater to both inexperienced and experienced users. Allow users to tailor frequent actions. | IA-03 |
| 8 | **Aesthetic and minimalist design** | Interfaces should not contain information that is irrelevant or rarely needed. Every extra unit of information in an interface competes with the relevant units of information and diminishes their relative visibility. | IA-01 |
| 9 | **Help users recognize, diagnose, and recover from errors** | Error messages should be expressed in plain language (no error codes), precisely indicate the problem, and constructively suggest a solution. | IA-02, IA-04 |
| 10 | **Help and documentation** | It's best if the system doesn't need any additional explanation. However, it may be necessary to provide documentation to help users understand how to complete their tasks. | IA-01 |

---

## 2. Norman — 6 nguyên tắc thiết kế

**Nguồn:** Norman, D. *The Design of Everyday Things* (rev. ed. 2013).
Tóm tắt học thuật: <https://www.csun.edu/science/courses/671/bibliography/preece.html> ·
<https://principles.design/examples/don-norman-s-principles-of-design>

| # | Nguyên tắc | Nội dung | Ánh xạ IA |
|---|---|---|---|
| 1 | **Visibility** | Chức năng càng hiện rõ, người dùng càng dễ biết phải làm gì tiếp. Chức năng bị giấu đi thì khó tìm và khó dùng. | IA-01, IA-03 |
| 2 | **Feedback** | Gửi lại thông tin về việc gì vừa xảy ra và đã hoàn thành được gì, để người dùng tiếp tục hành động. Có thể qua thị giác, âm thanh, xúc giác, chữ. | IA-04 |
| 3 | **Constraints** | Giới hạn phạm vi tương tác có thể xảy ra ở một thời điểm, nhằm đơn giản hoá giao diện và dẫn người dùng tới hành động đúng tiếp theo. | IA-02 |
| 4 | **Mapping** | Quan hệ giữa điều khiển và hiệu ứng của nó trong thực tế. Bố trí control phải phản ánh đúng thứ nó tác động. | IA-01, IA-03 |
| 5 | **Consistency** | Nhất quán trong hành vi thao tác, hình thức thiết kế, vị trí và cách sắp xếp các phần tử. | IA-01 |
| 6 | **Affordance** | Thuộc tính của đối tượng giúp người ta biết ngay cách sử dụng nó (nút trông như bấm được, ô trông như nhập được). | IA-01, IA-02 |

---

## 3. Shneiderman — 8 Golden Rules of Interface Design

**Nguồn:** Trang chính chủ của Ben Shneiderman, ĐH Maryland — <https://www.cs.umd.edu/~ben/goldenrules.html>
(Shneiderman & Plaisant, *Designing the User Interface*, 6th ed.)

> ⚠️ **Lưu ý khi trích dẫn:** bản 6th edition đã đổi lời hai quy tắc so với bản cũ hay gặp trên mạng —
> Rule 2 cũ *"Enable frequent users to use shortcuts"* → nay là **"Seek universal usability"**;
> Rule 7 cũ *"Support internal locus of control"* → nay là **"Keep users in control"**.
> Dùng bản dưới đây (bản chính chủ) để tránh bị bắt lỗi trích dẫn.

| # | Golden Rule | Nội dung | Ánh xạ IA |
|---|---|---|---|
| 1 | **Strive for consistency** | Chuỗi thao tác nhất quán trong các tình huống tương tự; thuật ngữ đồng nhất trong prompt, menu, help; màu, layout, viết hoa, font nhất quán toàn hệ thống. | IA-01 |
| 2 | **Seek universal usability** | Đáp ứng người dùng đa dạng — người mới, chuyên gia, **người khuyết tật**, người dùng quốc tế; thiết kế "dẻo", cho phép biến đổi nội dung. | IA-01 (accessibility, i18n) |
| 3 | **Offer informative feedback** | Mọi hành động đều phải có phản hồi. Hành động nhỏ/thường xuyên → phản hồi vừa phải; hành động lớn/hiếm → phản hồi rõ rệt hơn. | IA-04 |
| 4 | **Design dialogs to yield closure** | Chuỗi thao tác có đầu – giữa – cuối rõ ràng, có phản hồi khi kết thúc một nhóm hành động. | IA-04 |
| 5 | **Prevent errors** | Thiết kế sao cho người dùng khó mắc lỗi; khi có lỗi thì đưa hướng dẫn khắc phục đơn giản, cụ thể, mang tính xây dựng. | IA-02 |
| 6 | **Permit easy reversal of actions** | Hành động phải hoàn tác được — giúp giảm lo lắng vì người dùng biết sai có thể sửa. | IA-04 |
| 7 | **Keep users in control** | Người dùng cảm thấy làm chủ, giao diện phản hồi có thể đoán trước, không có bất ngờ hay ràng buộc khó chịu. | IA-03, IA-04 |
| 8 | **Reduce short-term memory load** | Không bắt người dùng nhớ thông tin qua nhiều màn hình — trí nhớ ngắn hạn chỉ giữ được "7 ± 2" chunk. | IA-01, IA-03 |

---

## 4. Bài giảng môn học — S13_GUI Testing & Usability Testing

**Nguồn:** Slide môn Software Testing, Department of Software Engineering, `S13_GUI Testing & Usability Testing.pdf`

### 4.1 Checklist testing — hạng mục chính thức của môn (trang 16)

GUI standards · Application standards · Color scheme · Typography · Layout and alignment · Labels · Error messages
→ **nền của IA-01 và một phần IA-02**

### 4.2 Navigation testing (trang 17–18) → **nền của IA-03**

- **Main Menu Navigation** — truy cập được mọi mục lớn của ứng dụng
- **Breadcrumb Navigation** — phản ánh đúng đường đi, cho phép quay lui
- **Links and Buttons** — dẫn tới đúng màn hình / hành động kỳ vọng
- **Form Navigation** — di chuyển trong form dễ dàng, **đúng thứ tự focus**, có validation message

### 4.3 Common GUI bugs (trang 11–14) — 16 loại lỗi

Data validation · Incorrect field default · Mishandling of server process failures · Mandatory fields not mandatory · Wrong fields retrieved by queries · Incorrect search criteria · Field order · Multiple DB rows returned when single expected · Currency of data on screens · Window object / DB field correspondence · Correct window modality · Window system commands not available / don't work · Control state alignment with state of data · Focus on objects needing it · Menu options align with state of data or application mode · Synchronization of window object content

### 4.4 Types in GUI testing (trang 15) — định vị HW03

| Stage | Test Types | Liên quan HW03 |
|---|---|---|
| **Low Level** | Checklist testing · Navigation | **Task 1** |
| Application | EP · BVA · Decision Tables · State Transition | — |
| Integration | Desktop Integration · C/S Communications · Synchronisation | — |
| **Non-Functional** | Soak · **Compatibility** · Platform/environment | **Task 3** |

### 4.5 Automation (trang 28) — lập luận cho Agent Skill (§8)

> Checklist testing → **Manual:** application conventions · **Automated:** object states, menus, standard features
> Navigation → **Manual**

---

## 5. Thang mức nghiêm trọng 0–4 (dùng cho Task 2 §6 và Findings Log §7)

**Nguồn:** Nielsen, J. *Severity Ratings for Usability Problems*, NN/g — <https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/>

**Ba yếu tố quyết định severity:** Frequency (mức độ thường gặp) · Impact (mức độ khó vượt qua) · Persistence (một lần hay lặp lại). Cộng thêm cân nhắc *market impact*.

| Mức | Nguyên văn |
|---|---|
| **0** | I don't agree that this is a usability problem at all |
| **1** | Cosmetic problem only: need not be fixed unless extra time is available on project |
| **2** | Minor usability problem: fixing this should be given low priority |
| **3** | Major usability problem: important to fix, so should be given high priority |
| **4** | Usability catastrophe: imperative to fix this before product can be released |

> **Đối chiếu bài giảng:** S13 (trang 51) hướng dẫn *"Prioritize problems by criticality = severity **AND** probability of occurrence"*.
> → Trong Usability Report nên giữ thang 0–4 (đề bắt buộc) **và thêm cột Probability** (số người / 5 gặp phải), có ghi chú theo bài giảng.

---

## 6. SUS — System Usability Scale (Task 2)

**Nguồn:** Brooke, J. (1996) *SUS: A quick and dirty usability scale*; tóm tắt + benchmark: <https://measuringu.com/sus/>

**10 câu, thang Likert 1–5** (1 = Strongly disagree → 5 = Strongly agree):

1. I think that I would like to use this system frequently.
2. I found the system unnecessarily complex.
3. I thought the system was easy to use.
4. I think that I would need the support of a technical person to be able to use this system.
5. I found the various functions in this system were well integrated.
6. I thought there was too much inconsistency in this system.
7. I would imagine that most people would learn to use this system very quickly.
8. I found the system very cumbersome to use.
9. I felt very confident using the system.
10. I needed to learn a lot of things before I could get going with this system.

**Cách chấm:**
- Câu **lẻ** (1,3,5,7,9): điểm đóng góp = `x − 1`
- Câu **chẵn** (2,4,6,8,10): điểm đóng góp = `5 − x`
- Cộng 10 giá trị (0–40) rồi **× 2.5** → điểm SUS 0–100

**Diễn giải:** trung bình = **68**. Trên 68 là trên trung bình. 74 ≈ phân vị 70 (hạng B−). Trên **80.3** = hạng A (top 10%).

---

## 7. Compatibility testing — Emulator vs Simulator vs Real device (Task 3)

**Nguồn:** BrowserStack — <https://www.browserstack.com/guide/testing-on-emulators-simulators-real-devices-comparison>

| Tiêu chí | **Emulator** | **Simulator** | **Real device** |
|---|---|---|---|
| Mô phỏng cái gì | Phần cứng **+** phần mềm | **Chỉ** phần mềm / OS | Hệ thống thật |
| Hiệu năng | Chậm (binary translation) | Nhanh | Tốc độ thật |
| Test phần cứng | Có, hạn chế | Không | Đầy đủ |
| Điều kiện mạng | Giả lập | Giả lập | Wi-Fi / di động thật |
| Đo pin | Không chính xác | Không đo được | Chính xác |
| Debug | Tốt, chi tiết | Kém tin cậy hơn | Khó thu log |
| Chi phí | Thấp / miễn phí | Thấp / miễn phí | Cao khi mở rộng |

**Kết luận dùng cho báo cáo Task 3:** emulator/simulator hợp cho giai đoạn phát triển sớm và kiểm tra UI/layout; **không đủ tin cậy để kết luận trước khi phát hành** — cần real device để xác nhận hiệu năng, pin, tính năng phụ thuộc phần cứng và biến thể OS của nhà sản xuất.
Với HW03 (kiểm thử **hiển thị/layout của web frontend**), emulator/simulator của BrowserStack là chấp nhận được, nhưng **phải ghi rõ trong báo cáo ô nào chạy trên real device, ô nào trên máy ảo** — đây chính là điều đề bài §6 Task 3 yêu cầu ôn lại.

---

## 8. Bảng nguồn tổng hợp (dán vào bài nộp)

| # | Nguồn | Loại | Dùng cho |
|---|---|---|---|
| R1 | Nielsen, J. — *10 Usability Heuristics for User Interface Design*, NN/g | Bài viết chuẩn ngành | IA-01…IA-04 |
| R2 | Norman, D. — *The Design of Everyday Things*, rev. ed. 2013 | Sách | IA-01, IA-02, IA-04 |
| R3 | Shneiderman & Plaisant — *Designing the User Interface* (8 Golden Rules, 6th ed.) | Sách / trang chính chủ UMD | IA-01, IA-03, IA-04 |
| R4 | Slide môn học `S13_GUI Testing & Usability Testing.pdf` | Bài giảng | Toàn bộ checklist + Task 2 + Agent Skill |
| R5 | Nielsen, J. — *Severity Ratings for Usability Problems*, NN/g | Bài viết | Task 2, Findings Log |
| R6 | Brooke, J. (1996) — *SUS: A quick and dirty usability scale* | Bài báo | Task 2 |
| R7 | BrowserStack — *Emulators vs Simulators vs Real Devices* | Tài liệu công cụ | Task 3 |
| R8 | `Kịch-bản-E2E-Test-Flow-Luồng-Admin.docx` | Tài liệu SUT | Các mục checklist đặc thù EMS |
| R9 | ISTQB Foundation Level Syllabus (bản mới nhất) | Tiêu chuẩn | Thuật ngữ bug/severity |
| R10 | W3C — *Web Content Accessibility Guidelines (WCAG) 2.2*, <https://www.w3.org/TR/WCAG22/> | Tiêu chuẩn | Các mục accessibility trong IA-01…IA-04 |
