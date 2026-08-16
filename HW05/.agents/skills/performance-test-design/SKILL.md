---
name: performance-test-design
description: >
  Skill hướng dẫn AI thiết kế và tạo JMeter test plan cho Performance Testing
  (Load, Stress, Spike) trên REST API. Bao gồm quy trình step-by-step chọn
  tham số, tạo CSV data file, cấu hình JMeter XML, và đặt tên file theo quy ước.
---

# Performance Test Design Skill

## Mục đích
Hướng dẫn AI thiết kế **JMeter test plan** cho 3 loại kiểm thử hiệu năng:
- **Load Test**: Kiểm tra chịu tải ở mức bình thường/dự kiến
- **Stress Test**: Tăng tải liên tục đến khi hệ thống sụp đổ
- **Spike Test**: Đột ngột tăng tải rất cao trong thời gian ngắn

## Quy trình thiết kế (Step-by-step)

### Bước 1: Phân tích endpoint

Trước khi thiết kế test plan, phân tích endpoint cần test:

1. **HTTP Method & URL**: GET/POST/PUT/DELETE + path
2. **Authentication**: Có cần JWT token không? Header `Authorization: Bearer <token>`
3. **Request Body**: JSON payload cần gửi (nếu có)
4. **Dependencies**: Cần setup dữ liệu gì trước? (tạo user, tạo order, lấy token...)
5. **Side Effects**: API có thay đổi state DB không? (quan trọng cho data-driven test)
6. **Expected Response**: Status code + response body mẫu

### Bước 2: Chọn loại kịch bản phù hợp

| Endpoint Type | Kịch bản phù hợp | Lý do |
|--------------|-------------------|-------|
| **Read-heavy** (GET, không auth) | **Load Test** | Lượng request lớn, ổn định, đo throughput |
| **Auth-heavy** (login, reset-password) | **Stress Test** | CPU-intensive (hashing), tìm breaking point |
| **Transactional** (write/update với logic) | **Spike Test** | Kiểm tra race condition, DB locking khi burst |

### Bước 3: Thiết kế tham số

#### Load Test Parameters
```
Thread Count:        50 (số user đồng thời)
Ramp-up Period:      30 seconds (thời gian để tất cả threads active)
Loop Count:          10 (mỗi thread lặp 10 lần)
Think Time:          1000-3000ms (Uniform Random Timer)
Duration:            ~5-8 phút (tuỳ hardware)
```

#### Stress Test Parameters
```
Start Threads:       10
Max Threads:         200 (hoặc cho đến khi error rate > 50%)
Ramp-up Period:      120 seconds (tăng dần)
Step:                10 threads mỗi 10 giây (Stepping Thread Group hoặc Ultimate Thread Group)
Think Time:          500-1000ms
Duration:            ~5-10 phút
```

#### Spike Test Parameters
```
Phase 1 (Normal):    10 threads, 60 seconds
Phase 2 (Spike):     200 threads, ramp-up 5s, duration 15s
Phase 3 (Recovery):  10 threads, 60 seconds
Think Time:          200-500ms (thấp hơn để tạo áp lực)
```

### Bước 4: Tạo CSV Data File

Mỗi endpoint group **phải có file CSV riêng** (yêu cầu bắt buộc).

**Quy tắc CSV:**
- Dòng 1: Header (tên cột)
- Encoding: UTF-8
- Separator: dấu phẩy `,`
- Tên file gợi nhớ: `<endpoint_group>_data.csv`

**Ví dụ CSV cho Read-heavy (order IDs):**
```csv
order_id
1
2
3
4
5
```

**Ví dụ CSV cho Auth-heavy (credentials):**
```csv
email,resetToken,newPassword
user1@test.com,123456,NewPass1!
user2@test.com,789012,NewPass2!
```

**Ví dụ CSV cho Transactional (token + order):**
```csv
token,order_id
eyJhbGciOiJIUzI1NiJ9...,1
eyJhbGciOiJIUzI1NiJ9...,2
```

### Bước 5: Quy ước đặt tên file

```
{StudentID}_{ScenarioType}_{YYYYMMDD}.jmx
```

Ví dụ:
- `25127001_Load_20260816.jmx`
- `25127001_Stress_20260816.jmx`
- `25127001_Spike_20260816.jmx`

### Bước 6: Cấu hình Report Views

Mỗi test plan dùng **1 loại report khác nhau** (không trùng lặp):

| Kịch bản | Report View | Mục đích |
|-----------|-------------|----------|
| Load | **Summary Report** | Tổng hợp avg/min/max/throughput |
| Stress | **Aggregate Report** | Chi tiết percentile (p90, p95, p99) |
| Spike | **View Results Tree** | Xem từng request chi tiết (debug) |

### Bước 7: Cấu hình Assertions

Mỗi test plan cần ít nhất 1 assertion:
- **Response Assertion**: Kiểm tra status code (200, 400, 404...)
- **JSON Assertion**: Kiểm tra response body có field mong đợi
- **Duration Assertion**: Response time không vượt quá threshold (ví dụ: 5000ms)

### Bước 8: Chạy JMeter Non-GUI

```bash
# Chạy test
jmeter -n -t <file>.jmx -l <file>.jtl -e -o <html_report_dir>

# Ví dụ:
jmeter -n -t 25127001_Load_20260816.jmx -l load_results.jtl -e -o load_html_report
```

**Flags quan trọng:**
- `-n`: Non-GUI mode (bắt buộc khi chạy test thực)
- `-t`: Test plan file
- `-l`: Output log file (.jtl)
- `-e`: Generate HTML report sau khi chạy xong
- `-o`: Thư mục chứa HTML report

## Checklist trước khi chạy test

- [ ] Backend SUT đang chạy (`http://localhost:3000`)
- [ ] Database đã được seed với dữ liệu test
- [ ] CSV data file đã sẵn sàng
- [ ] JMeter test plan đã verify bằng GUI mode (1 thread, 1 loop)
- [ ] Task Manager/htop đã mở sẵn để chụp screenshot
- [ ] Thư mục output đã tạo và rỗng

## Lưu ý quan trọng

1. **Account Lockout**: Nếu test auth API, cần reset `login_attempts` và `locked_until` giữa các lần chạy:
   ```sql
   UPDATE users SET login_attempts = 0, locked_until = NULL;
   ```

2. **Data Cleanup**: Nếu API tạo thay đổi DB (cancel order, reset password), cần restore data giữa các lần chạy.

3. **SQLite Limitations**: SQLite chỉ cho phép 1 writer tại 1 thời điểm → đây là bottleneck quan trọng cần ghi nhận trong báo cáo.
