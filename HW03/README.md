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
├── deliverables/
│   ├── task1a-checklist/          # Sản phẩm nhóm
│   │   ├── GUI-Checklist.md       # Checklist 88 mục
│   │   ├── Task1A_Heuristics-Reference.md
│   │   └── AI-Prompts-Nhom.md
│   ├── task1b-execution/          # Task 1B — Chạy checklist
│   │   └── screenshots/           # Ảnh cho mục Failed
│   ├── task2-user-testing/        # Task 2 — User Testing
│   │   ├── session-notes/         # Note từng phiên
│   │   └── sus-data/              # Dữ liệu SUS
│   ├── task3-cross-platform/      # Task 3 — Cross-Platform
│   │   └── screenshots/           # Ảnh overlay MSSV
│   ├── findings-log/              # Bug & Findings Log
│   ├── agent-skill/               # Agent Skill + link video
│   └── ai-audit/                  # AI Audit Report + AI Critique
├── Task1B_Checklist_Execution/
│   ├── Report_Task1B.md           # Báo cáo chạy checklist
│   └── Failed_Screenshots/
├── Task2_User_Testing/
│   └── Usability_Report.md        # Usability Report
├── Task3_Cross_Platform/
│   └── Cross_Platform_Report.md   # Cross-Platform Report
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
