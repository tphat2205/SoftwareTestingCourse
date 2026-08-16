---
name: performance-log-analysis
description: >
  Skill hướng dẫn AI phân tích file JTL log từ JMeter, tính toán performance
  metrics (response time percentiles, throughput, error rate), tạo báo cáo,
  và thực hiện misinterpretation hunt để phát hiện lỗi phân tích của AI.
  Bao gồm script Python tự động phân tích JTL.
---

# Performance Log Analysis Skill

## Mục đích
Hướng dẫn AI phân tích kết quả performance test từ file `.jtl`, bao gồm:
1. Đọc và parse raw JTL log
2. Tính toán metrics chính xác
3. Đề xuất performance thresholds
4. **Misinterpretation Hunt**: Phát hiện lỗi AI thường mắc khi phân tích

## JTL File Format

File `.jtl` là CSV với các cột chính:

| Cột | Ý nghĩa |
|-----|---------|
| `timeStamp` | Unix timestamp (ms) khi request bắt đầu |
| `elapsed` | Thời gian response (ms) |
| `label` | Tên sampler/request |
| `responseCode` | HTTP status code |
| `responseMessage` | HTTP status message |
| `threadName` | Tên thread |
| `dataType` | Loại data (text) |
| `success` | true/false |
| `failureMessage` | Lỗi (nếu có) |
| `bytes` | Kích thước response (bytes) |
| `sentBytes` | Kích thước request (bytes) |
| `grpThreads` | Số threads active trong group |
| `allThreads` | Tổng số threads active |
| `URL` | URL đầy đủ |
| `Latency` | Latency (ms) — thời gian đến byte đầu tiên |
| `IdleTime` | Thời gian idle (ms) |
| `Connect` | Thời gian kết nối (ms) |

## Quy trình phân tích

### Bước 1: Đọc raw JTL

```python
import pandas as pd

df = pd.read_csv('results.jtl')
print(f"Total requests: {len(df)}")
print(f"Columns: {df.columns.tolist()}")
```

### Bước 2: Tính toán Metrics cốt lõi

**Response Time Metrics:**
- **Average**: `df['elapsed'].mean()`
- **Median (P50)**: `df['elapsed'].median()`
- **P90**: `df['elapsed'].quantile(0.90)`
- **P95**: `df['elapsed'].quantile(0.95)`
- **P99**: `df['elapsed'].quantile(0.99)`
- **Min**: `df['elapsed'].min()`
- **Max**: `df['elapsed'].max()`
- **Std Dev**: `df['elapsed'].std()`

**Throughput:**
```python
duration_sec = (df['timeStamp'].max() - df['timeStamp'].min()) / 1000
throughput = len(df) / duration_sec  # requests per second
```

**Error Rate:**
```python
error_count = df[df['success'] == False].shape[0]
error_rate = error_count / len(df) * 100
```

**Bandwidth:**
```python
total_bytes = df['bytes'].sum()
bandwidth_kbps = (total_bytes / 1024) / duration_sec
```

### Bước 3: Phân tích theo thời gian

Chia thành các window (ví dụ 10 giây) để xem trend:

```python
df['time_window'] = ((df['timeStamp'] - df['timeStamp'].min()) // 10000) * 10
time_analysis = df.groupby('time_window').agg({
    'elapsed': ['mean', 'count'],
    'success': lambda x: (x == False).sum()
}).reset_index()
```

### Bước 4: Phân tích Error

```python
# Phân loại lỗi theo response code
error_breakdown = df[df['success'] == False].groupby('responseCode').size()

# Xem error rate theo thời gian (phát hiện degradation)
df['minute'] = (df['timeStamp'] - df['timeStamp'].min()) // 60000
error_by_minute = df.groupby('minute')['success'].apply(
    lambda x: (x == False).sum() / len(x) * 100
)
```

### Bước 5: Đề xuất Performance Thresholds

Dựa trên kết quả, đề xuất thresholds cho SLA:

| Metric | Threshold đề xuất | Cách tính |
|--------|-------------------|-----------|
| P95 Response Time | < 2x median | `median * 2` |
| Error Rate | < 1% | Absolute |
| Throughput | > 80% peak | `peak_rps * 0.8` |
| Max Response Time | < 10x median | `median * 10` |

## Misinterpretation Hunt Checklist

> **QUAN TRỌNG**: Đây là danh sách các lỗi AI thường mắc khi phân tích JTL.
> Sinh viên phải kiểm tra từng mục và ghi nhận nếu AI sai.

### Lỗi phổ biến #1: Nhầm lẫn đơn vị
- AI thường báo response time bằng **giây** trong khi JTL ghi bằng **mili-giây**
- **Kiểm tra**: So sánh giá trị AI nói vs. giá trị trong cột `elapsed`

### Lỗi phổ biến #2: Tính throughput sai
- AI hay tính throughput = total_requests / total_duration nhưng quên trừ ramp-up time
- AI có thể nhầm throughput mỗi thread vs. tổng
- **Kiểm tra**: Tự tính `total_requests / (max_timestamp - min_timestamp) * 1000`

### Lỗi phổ biến #3: Bỏ qua warm-up data
- Dữ liệu trong giai đoạn ramp-up thường có response time cao bất thường
- AI có thể tính trung bình cả warm-up → sai lệch
- **Kiểm tra**: So sánh metrics khi loại bỏ 10% data đầu tiên

### Lỗi phổ biến #4: Nhầm success/failure
- JTL cột `success` có giá trị `true`/`false` (text, không phải boolean)
- AI có thể đếm sai nếu parse không đúng
- **Kiểm tra**: Đếm thủ công số dòng `success=false`

### Lỗi phổ biến #5: Suy luận nguyên nhân không có cơ sở
- AI thường nói "bottleneck ở database" hoặc "network congestion" mà không có evidence
- **Kiểm tra**: Yêu cầu AI chỉ ra metric cụ thể nào chứng minh claim đó

### Lỗi phổ biến #6: Đề xuất optimization không phù hợp
- AI đề xuất "add Redis cache" cho ứng dụng SQLite demo nhỏ
- AI đề xuất "horizontal scaling" cho ứng dụng chạy local
- **Kiểm tra**: Xem optimization có khả thi với stack hiện tại không (Node.js + SQLite + localhost)

## Template báo cáo phân tích

```markdown
## Performance Test Analysis: {ScenarioType}

### Test Configuration
- **Endpoint:** {method} {url}
- **Threads:** {thread_count}
- **Duration:** {duration}
- **Data Source:** {csv_file}

### Key Metrics
| Metric | Value |
|--------|-------|
| Total Requests | {total} |
| Avg Response Time | {avg}ms |
| P50 (Median) | {p50}ms |
| P90 | {p90}ms |
| P95 | {p95}ms |
| P99 | {p99}ms |
| Min | {min}ms |
| Max | {max}ms |
| Throughput | {rps} req/s |
| Error Rate | {error_rate}% |
| Bandwidth | {bandwidth} KB/s |

### Response Time Distribution
{histogram hoặc bảng phân bố}

### Error Analysis
{phân loại lỗi theo response code}

### AI Misinterpretations Found
| # | AI Claim | Actual Value (from JTL) | Error Type |
|---|----------|------------------------|------------|
| 1 | ... | ... | ... |

### AI Optimization Proposals
| # | Proposal | Classification | Reasoning |
|---|----------|---------------|-----------|
| 1 | ... | Feasible / Hallucinated | ... |
```

## Sử dụng Script phân tích

Chạy script `analyze_jtl.py` trong thư mục `scripts/`:

```bash
python analyze_jtl.py <path_to_jtl_file> [--output markdown|json] [--chart]
```

Xem chi tiết trong [scripts/analyze_jtl.py](scripts/analyze_jtl.py).
