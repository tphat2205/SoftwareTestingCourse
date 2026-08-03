# Task 3 — Cross-Browser / Cross-Platform Testing

**Sinh viên:** Đoàn Thành Phát — 23127241
**Kịch bản:** B — User đăng ký tham gia sự kiện
**Ngày thực hiện:** *(chưa bắt đầu)*
**SUT:** https://prod-dev.ems-fitus.cloud
**Công cụ:** BrowserStack / LambdaTest (trial)

---

## 1. Ma trận tương thích

### Yêu cầu phủ (mỗi màn hình):
- **3 OS:** Windows, macOS, Android
- **5 Browser:** Chrome, Firefox, Safari, Edge, Opera
- **3 Loại thiết bị:** Desktop, Tablet, Phone

### Ma trận chọn (áp dụng cho CẢ BA màn hình B1, B1-b, B2)

| # | OS | Browser | Thiết bị | Loại (Real/Emu) | B1 | B1-b | B2 |
|---|---|---|---|---|---|---|---|
| 1 | Windows 11 | Chrome 126 | Desktop | Real | ☐ | ☐ | ☐ |
| 2 | Windows 11 | Firefox 128 | Desktop | Real | ☐ | ☐ | ☐ |
| 3 | Windows 11 | Edge 126 | Desktop | Real | ☐ | ☐ | ☐ |
| 4 | macOS Sonoma | Safari 17 | Desktop | BrowserStack | ☐ | ☐ | ☐ |
| 5 | macOS Sonoma | Chrome 126 | Desktop | BrowserStack | ☐ | ☐ | ☐ |
| 6 | macOS Sonoma | Opera 111 | Desktop | BrowserStack | ☐ | ☐ | ☐ |
| 7 | Android 14 | Chrome | Phone (Samsung Galaxy S24) | BrowserStack | ☐ | ☐ | ☐ |
| 8 | Android 14 | Samsung Internet | Phone (Samsung Galaxy S24) | BrowserStack | ☐ | ☐ | ☐ |
| 9 | Android 14 | Chrome | Tablet (Samsung Galaxy Tab S9) | BrowserStack | ☐ | ☐ | ☐ |
| 10 | Windows 11 | Opera 111 | Desktop | Real | ☐ | ☐ | ☐ |

### Kiểm tra phủ:

| Chiều | Giá trị | Đã phủ? |
|---|---|---|
| **OS** | Windows | ✅ (#1, #2, #3, #10) |
| | macOS | ✅ (#4, #5, #6) |
| | Android | ✅ (#7, #8, #9) |
| **Browser** | Chrome | ✅ (#1, #5, #7, #9) |
| | Firefox | ✅ (#2) |
| | Safari | ✅ (#4) |
| | Edge | ✅ (#3) |
| | Opera | ✅ (#6, #10) |
| **Thiết bị** | Desktop | ✅ (#1–6, #10) |
| | Tablet | ✅ (#9) |
| | Phone | ✅ (#7, #8) |

**Tổng: 10 tổ hợp × 3 màn hình = 30 ô kiểm tra**

---

## 2. Kết quả kiểm tra

### 2.1 B1 — Dashboard & Tìm kiếm (`/dashboard`)

| # | OS / Browser / Device | Pass/Fail | Ghi chú | Ảnh |
|---|---|---|---|---|
| 1 | Win11 / Chrome 126 / Desktop | ☐ | | |
| 2 | Win11 / Firefox 128 / Desktop | ☐ | | |
| 3 | Win11 / Edge 126 / Desktop | ☐ | | |
| 4 | macOS / Safari 17 / Desktop | ☐ | | |
| 5 | macOS / Chrome 126 / Desktop | ☐ | | |
| 6 | macOS / Opera 111 / Desktop | ☐ | | |
| 7 | Android 14 / Chrome / Phone | ☐ | | |
| 8 | Android 14 / Samsung / Phone | ☐ | | |
| 9 | Android 14 / Chrome / Tablet | ☐ | | |
| 10 | Win11 / Opera 111 / Desktop | ☐ | | |

### 2.2 B1-b — Saved Events (`/my-favorites`)

| # | OS / Browser / Device | Pass/Fail | Ghi chú | Ảnh |
|---|---|---|---|---|
| 1 | Win11 / Chrome 126 / Desktop | ☐ | | |
| 2 | Win11 / Firefox 128 / Desktop | ☐ | | |
| 3 | Win11 / Edge 126 / Desktop | ☐ | | |
| 4 | macOS / Safari 17 / Desktop | ☐ | | |
| 5 | macOS / Chrome 126 / Desktop | ☐ | | |
| 6 | macOS / Opera 111 / Desktop | ☐ | | |
| 7 | Android 14 / Chrome / Phone | ☐ | | |
| 8 | Android 14 / Samsung / Phone | ☐ | | |
| 9 | Android 14 / Chrome / Tablet | ☐ | | |
| 10 | Win11 / Opera 111 / Desktop | ☐ | | |

### 2.3 B2 — Chi tiết sự kiện (`/events/{id}`)

| # | OS / Browser / Device | Pass/Fail | Ghi chú | Ảnh |
|---|---|---|---|---|
| 1 | Win11 / Chrome 126 / Desktop | ☐ | | |
| 2 | Win11 / Firefox 128 / Desktop | ☐ | | |
| 3 | Win11 / Edge 126 / Desktop | ☐ | | |
| 4 | macOS / Safari 17 / Desktop | ☐ | | |
| 5 | macOS / Chrome 126 / Desktop | ☐ | | |
| 6 | macOS / Opera 111 / Desktop | ☐ | | |
| 7 | Android 14 / Chrome / Phone | ☐ | | |
| 8 | Android 14 / Samsung / Phone | ☐ | | |
| 9 | Android 14 / Chrome / Tablet | ☐ | | |
| 10 | Win11 / Opera 111 / Desktop | ☐ | | |

---

## 3. Tổng hợp

| Màn hình | Total | Pass | Fail | Pass Rate |
|---|---|---|---|---|
| B1 — Dashboard | 10 | | | |
| B1-b — Saved Events | 10 | | | |
| B2 — Chi tiết sự kiện | 10 | | | |
| **Tổng** | **30** | | | |

---

## 4. Danh sách lỗi Cross-Platform

| # | Tổ hợp | Màn hình | Mô tả lỗi | Loại (tràn/chồng/vỡ/cắt/responsive) | Ảnh |
|---|---|---|---|---|---|
| | | | | | |

---

## 5. Ghi chú kỹ thuật

- **Ô nào Real device, ô nào Emulator/Simulator:** ghi rõ trong cột "Loại" ở §1
- **Mỗi ảnh phải có:**
  - Overlay email MSSV: `23127241@student.hcmus.edu.vn`
  - Browser / OS / thiết bị nhìn rõ cạnh URL EMS
- **Theo bài giảng:** Emulator/Simulator hợp cho kiểm tra UI/layout nhưng không đủ tin cậy cho kết luận phát hành — ghi rõ trong báo cáo
