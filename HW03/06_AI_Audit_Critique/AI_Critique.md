# AI Critique — Phê bình khả năng của AI trong Software Testing

**Sinh viên:** Đoàn Thành Phát — 23127241
**Task:** Đánh giá năng lực của tác tử AI (Agent) trong suốt bài tập HW03.

---

AI hỗ trợ rất tốt ở phần sinh artifact và quét giao diện tĩnh. Trong HW03, Browser Subagent giúp tiết kiệm thời gian khi chụp màn hình, rà DOM, và đối chiếu checklist. Nó đặc biệt hữu ích ở các việc lặp lại như viết checklist ban đầu, dựng Agent Skill, và gom lỗi thành Bug & Usability Findings Log. Ở mức này, AI làm việc nhanh, có cấu trúc, và giữ được sự nhất quán của báo cáo.

Tuy nhiên, AI vẫn yếu ở các điểm cần ngữ cảnh nghiệp vụ và quan sát động. Nó không tự suy ra đúng các ràng buộc riêng của EMS như trạng thái đăng ký, logic quay lại trang chi tiết mà vẫn giữ search state, hay các hiệu ứng hover/focus chỉ thấy được khi thao tác thật. Nếu chỉ nhìn ảnh tĩnh, AI còn dễ nhầm giữa “có class focus” và “thực sự có focus ring”. Khi prompt quá chung chung, nó cũng sinh checklist khá rộng nhưng thiếu các mục đặc thù như i18n EN/VI, hành vi save/unsave, hoặc quy tắc đăng ký.

Nguyên tắc rút ra là: dùng AI để tăng tốc phần khung, nhưng con người phải giữ quyền kiểm chứng cuối cùng. Những mục liên quan đến trạng thái động, hành vi thời gian thực, hoặc logic nghiệp vụ đặc thù phải được xác minh bằng thao tác thật, không được suy diễn từ output của AI.
