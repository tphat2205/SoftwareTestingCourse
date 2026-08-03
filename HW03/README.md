# HW03 — GUI & Usability Testing trên EMS

**Sinh viên:** Đoàn Thành Phát — MSSV: 23127241
**Kịch bản:** B — User đăng ký tham gia sự kiện
**3 màn hình:** B1 Dashboard & Tìm kiếm · B1-b Saved Events · B2 Chi tiết sự kiện
**SUT:** https://prod-dev.ems-fitus.cloud

---

## Test Summary

| Chỉ số | Giá trị |
|---|---|
| Kịch bản | B — User đăng ký tham gia sự kiện |
| Màn hình đã kiểm | B1 Dashboard, B1-b Saved Events, B2 Event Detail |
| Số mục checklist | 88 (thiết kế) / 264 (đã chạy = 88 × 3 màn hình) |
| Passed / Failed / N/A | 76 / 22 / 166 |
| Tỉ lệ pass | 77.6% |
| Số lỗi phát hiện (Task 1B) | 13 |
| Số người tham gia user testing | *(đang tuyển — mục tiêu: 5)* |
| Vấn đề usability theo severity | Major: 1, Minor: 6, Cosmetic: 6 |
| Số ô tương thích đã phủ | *(chưa chạy — mục tiêu: 30 ô)* |
| Video demo Agent Skill | *(chưa quay)* |

---

## Cấu trúc thư mục

```
HW03/
├── 01_Task1A_Group_Checklist/     # Sản phẩm nhóm
│   ├── GUI-Checklist.md           # Checklist 88 mục
│   ├── Task1A_Heuristics-Reference.md
│   └── AI-Prompts-Nhom.md
├── 02_Task1B_Checklist_Execution/ # Task 1B — Chạy checklist
│   ├── Report_Task1B.md           # Báo cáo chạy checklist
│   └── Failed_Screenshots/        # Ảnh cho mục Failed
├── 03_Task2_User_Testing/         # Task 2 — User Testing
│   └── Usability_Report.md        # Usability Report
├── 04_Task3_Cross_Platform/       # Task 3 — Cross-Platform
│   └── Cross_Platform_Report.md   # Cross-Platform Report
├── 05_Bug_Usability_Findings/     # Bug & Findings Log
│   └── Bug_Usability_Findings_Log.md
├── 06_AI_Audit_Critique/          # AI Audit Report + AI Critique
│   ├── AI_Audit_Report.md
│   └── AI_Critique.md
├── 07_Agent_Skill/                # Agent Skill + link video
│   └── usability-tester/SKILL.md
├── requirement/                   # Thư mục đề bài
├── git_commit_log.md              # Log quá trình commit code
└── README.md                      # File này
```

---

## Bảng tự đánh giá

| STT | Tiêu chí | Điểm tối đa | Tự đánh giá | Ghi chú |
|---|---|---|---|---|
| 1a | Task 1A — Checklist dùng chung (nhóm) | 15 | *(điền sau)* | 88 mục, phủ IA-01…IA-04 |
| 1b | Task 1B — Chạy checklist ≥ 3 màn hình + bug report | 15 | *(điền sau)* | 3 màn hình, 13 bugs |
| 2 | Task 2 — User testing 5 người → Usability Report | 25 | *(điền sau)* | *(đang thực hiện)* |
| 3 | Task 3 — Cross-Platform (3 OS × 5 browser × 3 device) | 25 | *(điền sau)* | *(đang thực hiện)* |
| 4 | Bug & Usability Findings (Form + Log) | 10 | *(điền sau)* | 13 findings |
| 5 | Agent Skills | 10 | *(điền sau)* | *(đang xây dựng)* |
| | **Tổng** | **100** | | |
