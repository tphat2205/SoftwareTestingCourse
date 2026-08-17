# AI Critique

Trong quá trình thực hiện bài tập này, em đã sử dụng AI (Antigravity / Gemini) làm trợ lý chính để thiết kế test plan, phân tích file `.jtl`, và đề xuất optimization. Tuy nhiên, quá trình review cho thấy AI mắc nhiều lỗi có hệ thống.

Lỗi nghiêm trọng nhất là AI báo cáo Error Rate = 0% cho cả Spike Test và Stress Test, trong khi thực tế 98-99% request trả về HTTP 400. Nguyên nhân là AI chỉ đọc cột `success` (luôn là `true` do cấu hình Assertion) mà không kiểm tra cột `responseCode`. Đây là bài học quan trọng: **AI thiếu khả năng hiểu ngữ cảnh cấu hình** — nó không biết rằng em đã sửa Assertion để chấp nhận 400, nên không thể phân biệt giữa "success theo JMeter" và "success theo nghiệp vụ".

Lỗi thứ hai là AI gộp chung 3 endpoint khác nhau (GET, PUT, POST) vào một bảng so sánh rồi suy luận "hệ thống bị suy giảm hiệu năng" — một kiểu suy luận không có cơ sở dữ liệu. AI cũng nhầm Max Response Time 713ms (thực chất là cold-start outlier ở request thứ 2) thành "dấu hiệu hệ thống quá tải", vì nó không kiểm tra outlier đó xảy ra ở đâu trong timeline.

Về đề xuất optimization, AI đề xuất "thêm Redis cache" và "horizontal scaling" cho một ứng dụng SQLite demo chạy localhost — những gợi ý hoàn toàn phi thực tế. Điều này cho thấy AI có xu hướng áp dụng kiến thức chung (generic best practices) mà không xem xét ngữ cảnh cụ thể của dự án.

Bài học em rút ra: **AI là công cụ mạnh nhưng cần human review ở mọi bước**. Không thể tin tưởng hoàn toàn vào kết quả AI mà không cross-verify với dữ liệu gốc. Đặc biệt, các metric như error rate và throughput cần được kiểm tra bằng nhiều cách (success column, responseCode, phân bố theo thời gian) để tránh kết luận sai.
