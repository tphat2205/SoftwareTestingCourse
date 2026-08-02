# AI Critique — Phê bình khả năng của AI trong Software Testing

**Sinh viên:** Đoàn Thành Phát — 23127241
**Task:** Đánh giá năng lực của tác tử AI (Agent) trong suốt bài tập HW03.

---

## 1. Khả năng tương tác trực tiếp với SUT (Hệ thống dưới kiểm thử)
Một trong những điểm sáng nhất trong quá trình làm HW03 là việc sử dụng Browser Subagent để AI tự động truy cập, khám phá và chụp ảnh hệ thống EMS.

**Ưu điểm:**
- AI có khả năng khởi tạo trình duyệt ẩn, truy cập URL, cuộn trang và thu thập DOM/Screenshots rất tốt.
- Nó giúp tiết kiệm đáng kể thời gian trong việc chụp ảnh màn hình và đối chiếu với checklist. Việc agent báo cáo lại cấu trúc UI (navigation, carousel, event cards) vô cùng chi tiết.

**Hạn chế & Ảo giác (Hallucinations):**
- **Vấn đề Đăng nhập & Xác thực:** Khi EMS yêu cầu đăng nhập, AI ban đầu bị "kẹt" vì luồng xác thực qua email/OTP nằm ngoài khả năng xử lý tự động của nó. Nếu con người không can thiệp (cung cấp session hợp lệ), AI hoàn toàn bất lực.
- **Tương tác động phức tạp:** AI có thể click vào nút, nhưng gặp khó khăn khi phát hiện các lỗi liên quan đến trạng thái `:hover` (ví dụ: BUG-B-001 - carousel không dừng khi hover). Lỗi này đòi hỏi cảm nhận thời gian thực mà AI phân tích ảnh tĩnh không làm được.
- **Ảo giác thị giác:** Đôi khi AI có thể đánh giá sai một viền focus (focus ring) là có tồn tại vì nó đọc DOM thấy thuộc tính `tabindex` hoặc class `focus:outline`, nhưng trên thực tế CSS đã đè nó đi. 

## 2. Năng lực tạo Artifacts và Quản lý Task
Agent hiện tại có bộ công cụ rất mạnh (`write_to_file`, `multi_replace_file_content`) để sinh và bảo trì các tài liệu Markdown.

**Đánh giá:**
- Khả năng tổ chức file, tạo bảng biểu và render báo cáo lỗi (Bug Findings Log, Usability Report) là cực kỳ xuất sắc.
- AI tuân thủ nghiêm ngặt định dạng báo cáo, đánh mapping Heuristics chuẩn xác.

## 3. Khả năng thiết kế User Testing (Task 2)
Khi được giao thiết kế kịch bản User Testing (Task Scenario) và bảng hỏi SUS:
- AI thiết kế rất đúng chuẩn học thuật (tuân theo form SUS 10 câu của John Brooke).
- Việc phân chia thang đo, số liệu cần đo (Task success, time, error count) rất chuyên nghiệp.
- **Hạn chế:** Kịch bản đôi khi vẫn hơi mang tính "hướng dẫn từng bước" (ví dụ: "Hãy bấm vào nút Save") thay vì "hướng mục tiêu" (Goal-oriented: "Hãy tìm cách lưu sự kiện này lại"). Con người cần phải tinh chỉnh lại prompt để kịch bản tự nhiên hơn.

## 4. Tương lai của AI trong Usability Testing
Qua bài tập này, có thể thấy AI (nhất là dạng Agentic AI có thể dùng Browser Tool) sẽ là một **Trợ lý QA đắc lực**, chứ chưa thể **Thay thế QA**.
- AI gánh vác xuất sắc việc: Tạo checklist mẫu, dò quét các lỗi tĩnh (màu, font, layout tràn), tự động hoá chụp ảnh và sinh báo cáo.
- Con người vẫn bắt buộc phải làm: Viết các test case đặc thù nghiệp vụ (Business logic), kiểm tra trải nghiệm vi mô (micro-interactions như hover, transition) và đánh giá cảm xúc/mức độ tin tưởng (như form SUS yêu cầu).
