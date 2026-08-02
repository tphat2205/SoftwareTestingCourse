# AI Audit Report — Đánh giá Checklist sinh bởi AI

**Sinh viên:** Đoàn Thành Phát — 23127241
**Kịch bản:** B — User đăng ký tham gia sự kiện
**Ngày thực hiện:** 02/08/2026

---

## 1. Mục đích và Phạm vi
Báo cáo này đánh giá chất lượng của bộ checklist 88 mục được sinh ra bởi AI (Gemini/ChatGPT) trong Task 1A, đặc biệt là khi áp dụng vào thực tế kiểm thử 3 màn hình của Kịch bản B (Dashboard, Saved Events, Event Detail) trong Task 1B.

## 2. Quá trình Prompt Engineering (Task 1A)
Nhóm đã sử dụng các kỹ thuật Prompt Engineering sau để hướng dẫn AI sinh checklist:
- **Role-playing:** Yêu cầu AI đóng vai một chuyên gia kiểm thử phần mềm (QA Engineer) chuyên về Usability và GUI.
- **Context injection:** Cung cấp chi tiết tài liệu `Task1A_Heuristics-Reference.md` (chứa các quy tắc của Jakob Nielsen, Ben Shneiderman, WCAG) và mô tả sơ bộ về hệ thống EMS.
- **Few-shot prompting:** Đưa ra ví dụ về cấu trúc một mục checklist chuẩn (ID, Nhóm, Mô tả, Hành vi mong đợi).
- **Iterative refinement:** Yêu cầu AI bổ sung các edge cases, chia nhỏ các mục quá chung chung và phân loại theo 4 nhóm IA-01 đến IA-04.

*Chi tiết các prompt được lưu tại `deliverables/task1a-checklist/AI-Prompts-Nhom.md`.*

## 3. Đánh giá chất lượng Checklist

### 3.1 Điểm mạnh (Strengths)
1. **Độ bao phủ rộng (Coverage):** AI đã sinh ra được 88 mục trải đều trên 4 nhóm chính. Các nguyên tắc cơ bản như độ tương phản, thông báo lỗi, trạng thái focus đều được đề cập đầy đủ.
2. **Cấu trúc rõ ràng:** Mỗi mục đều có ID, phân nhóm, hành vi mong đợi rõ ràng giúp việc đối chiếu (Pass/Fail) dễ dàng.
3. **Tốt ở mức giao diện tĩnh (Static UI):** Các lỗi về màu sắc, font chữ, layout (G-01 đến G-18) được bao phủ cực kỳ tốt. Quá trình test đã bắt được lỗi dùng màu đỏ cho trạng thái "Saved" nhờ mục G-05 của AI.

### 3.2 Điểm yếu (Weaknesses) và "Điểm mù" của AI
Khi áp dụng vào Kịch bản B thực tế, checklist của AI bộc lộ một số thiếu sót:
1. **Thiếu hiểu biết về luồng nghiệp vụ đặc thù (Business Logic Blindspot):** 
   - AI tư duy theo kiểu "form nhập liệu chung" (text input, upload ảnh) nhưng không lường trước được form đăng ký của EMS chỉ là **chọn vai trò (checkboxes)** và cần sự đồng ý về quy định.
   - AI không sinh ra mục kiểm tra hiển thị QR Code cho vé sự kiện điện tử — một yếu tố cực kỳ quan trọng trong domain quản lý sự kiện.
2. **Thiếu ràng buộc logic chéo (Cross-validation logic):** 
   - Kịch bản B cho phép chọn nhiều vai trò nhưng hệ thống có thể có ràng buộc (ví dụ: không thể vừa là Sinh viên vừa là Khách mời). Checklist của AI không có mục nào kiểm tra sự xung đột giữa các lựa chọn này.
3. **Quá rập khuôn ở các nguyên tắc chung:** Nhiều mục form (F-14 đến F-26) mang tính quản trị (Admin) bị lẫn vào checklist của User (Scenario B) do AI cố gắng làm checklist tổng quát cho toàn hệ thống thay vì tuỳ chỉnh sâu cho Kịch bản B.

## 4. Lý do AI bỏ sót các mục đặc thù (Phân tích nguyên nhân)

Hai mục C-B1 (Xác nhận quy định) và C-B2 (Hiển thị QR code) bị AI bỏ sót vì:
- **Thiếu Context Cụ Thể:** AI không được truy cập trực tiếp vào hệ thống EMS lúc sinh checklist. Nó chỉ nội suy từ mô tả "hệ thống quản lý sự kiện". Do đó, nó sinh ra các test case cho "Form đăng ký sự kiện chung" (ví dụ: nhập tên, email) thay vì luồng đăng ký 1-click chọn role của Fitus EMS.
- **Giới hạn của Heuristics tiêu chuẩn:** Các nguyên tắc của Nielsen hay Shneiderman rất trừu tượng. Khi map từ "Error prevention" sang thực tế, AI dễ nghĩ tới "kiểm tra định dạng email" hơn là "kiểm tra checkbox đồng ý nội quy sự kiện". 

## 5. Kết luận
Bộ checklist của AI đạt khoảng **80% độ hoàn thiện**. Nó cực kỳ xuất sắc trong việc đóng vai trò là một "bộ khung" (baseline) để bắt các lỗi UI cơ bản. Tuy nhiên, 20% còn lại — thuộc về business logic, luồng người dùng đặc thù và các edge cases của hệ thống — bắt buộc phải có sự can thiệp và bổ sung từ con người (QA manual).
