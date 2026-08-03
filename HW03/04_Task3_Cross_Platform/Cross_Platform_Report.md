# Task 3 — Cross-Browser / Cross-Platform Testing

**Sinh viên:** Đoàn Thành Phát — 23127241
**Kịch bản:** B — User đăng ký tham gia sự kiện
**Ngày thực hiện:** 03/08/2026
**SUT:** https://prod-dev.ems-fitus.cloud
**Công cụ:**  LambdaTest (trial)

---

## 1. Ma trận tương thích

### Yêu cầu phủ (mỗi màn hình):
- **3 OS:** Windows, macOS, Android
- **5 Browser:** Chrome, Cốc Cốc, Safari, Edge, Brave
- **3 Loại thiết bị:** Desktop, Tablet, Phone

### Ma trận chọn (áp dụng cho CẢ BA màn hình B1, B1-b, B2)

| # | OS | Browser | Thiết bị | Loại (Real/Emu) | B1 | B1-b | B2 |
|---|---|---|---|---|---|---|---|
| 1 | Windows 11 | Chrome | Desktop | Real | [x] | [x] | [x] |
| 2 | Windows 11 | Cốc Cốc | Desktop | Real | [x] | [x] | [x] |
| 3 | Windows 11 | Edge | Desktop | Real | [x] | [x] | [x] |
| 4 | macOS Sonoma | Safari | Desktop | Emulator | [x] | [x] | [x] |
| 5 | macOS Golden Gate | Chrome | Desktop | Emulator | [x] | [x] | [x] |
| 6 | macOS Sonoma | Brave | Desktop | Emulator | [x] | [x] | [x] |
| 7 | Android 14 | Chrome | Phone (Samsung A31) | Real | [x] | [x] | [x] |
| 8 | Android 14 | Samsung Internet | Phone (Samsung A31) | Real | [x] | [x] | [x] |
| 9 | iPadOS | Safari | Tablet (iPad) | Real | [x] | [x] | [x] |
| 10 | Android 14 | Brave | Phone (Samsung A31) | Real | [x] | [x] | [x] |

### Kiểm tra phủ:

| Chiều | Giá trị | Đã phủ? |
|---|---|---|
| **OS** | Windows | [x] (#1, #2, #3, #10) |
| | macOS | [x] (#4, #5, #6) |
| | Android | [x] (#7, #8) |
| | iPadOS | [x] (#9) |
| **Browser** | Chrome | [x] (#1, #5, #7) |
| | Cốc Cốc | [x] (#2) |
| | Safari | [x] (#4, #9) |
| | Edge | [x] (#3) |
| | Brave | [x] (#10) |
| **Thiết bị** | Desktop | [x] (#1–6) |
| | Tablet | [x] (#9) |
| | Phone | [x] (#7, #8, #10) |

**Tổng: 10 tổ hợp × 3 màn hình = 30 ô kiểm tra**

---

## 2. Kết quả kiểm tra

### 2.1 B1 — Dashboard & Tìm kiếm (`/dashboard`)

| # | OS / Browser / Device | Pass/Fail | Ghi chú | Ảnh |
|---|---|---|---|---|
| 1 | Win11 / Chrome / Desktop | Pass | |![alt text](image.png)|
| 2 | Win11 / Cốc Cốc / Desktop | Pass | |![alt text](image-1.png)|
| 3 | Win11 / Edge / Desktop | Pass | |![alt text](image-2.png)|
| 4 | macOS / Safari / Desktop | Pass | |![alt text](image-24.png)|
| 5 | macOS / Chrome / Desktop | Pass | |![alt text](image-21.png)|
| 6 | macOS / Brave / Desktop | Pass | |![alt text](image-18.png)|
| 7 | Android / Chrome / Phone | Pass | |![alt text](image-15.png)|
| 8 | Android / Samsung / Phone | Pass | |![alt text](image-9.png)|
| 9 | iPadOS / Safari / Tablet | Pass | | ![alt text](image-27.png) |
| 10 | Android / Brave / Phone | Pass | |![alt text](image-12.png)|

### 2.2 B1-b — Saved Events (`/my-favorites`)

| # | OS / Browser / Device | Pass/Fail | Ghi chú | Ảnh |
|---|---|---|---|---|
| 1 | Win11 / Chrome / Desktop | Pass | |![alt text](image-3.png)|
| 2 | Win11 / Cốc Cốc / Desktop | Pass | |![alt text](image-4.png)|
| 3 | Win11 / Edge / Desktop | Pass | |![alt text](image-5.png)|
| 4 | macOS / Safari / Desktop | Pass | |![alt text](image-25.png)|
| 5 | macOS / Chrome / Desktop | Pass | |![alt text](image-22.png)|
| 6 | macOS / Brave / Desktop | Pass | |![alt text](image-19.png)|
| 7 | Android / Chrome / Phone | Pass | |![alt text](image-17.png)|
| 8 | Android / Samsung / Phone | Pass | |![alt text](image-10.png)|
| 9 | iPadOS / Safari / Tablet | Pass | | ![alt text](image-28.png) |
| 10 | Android / Brave / Phone | Pass | |![alt text](image-13.png)|

### 2.3 B2 — Chi tiết sự kiện (`/events/{id}`)

| # | OS / Browser / Device | Pass/Fail | Ghi chú | Ảnh |
|---|---|---|---|---|
| 1 | Win11 / Chrome / Desktop | Pass | |![alt text](image-8.png)|
| 2 | Win11 / Cốc Cốc / Desktop | Pass | |![alt text](image-7.png)|
| 3 | Win11 / Edge / Desktop | Pass | |![alt text](image-6.png)|
| 4 | macOS / Safari / Desktop | Pass | |![alt text](image-26.png)|
| 5 | macOS / Chrome / Desktop | Pass | |![alt text](image-23.png)|
| 6 | macOS / Brave / Desktop | Pass | |![alt text](image-20.png)|
| 7 | Android / Chrome / Phone | Pass | |![alt text](image-16.png)|
| 8 | Android / Samsung / Phone | Pass | |![alt text](image-11.png)|
| 9 | iPadOS / Safari / Tablet | Pass | | ![alt text](image-29.png) |
| 10 | Android / Brave / Phone | Pass | |![alt text](image-14.png)|

---

## 3. Tổng hợp

| Màn hình | Total | Pass | Fail | Pass Rate |
|---|---|---|---|---|
| B1 — Dashboard | 10 | 10 | 0 | 100% |
| B1-b — Saved Events | 10 | 10 | 0 | 100% |
| B2 — Chi tiết sự kiện | 10 | 10 | 0 | 100% |
| **Tổng** | **30** | **30** | **0** | **100%** |

---

## 4. Danh sách lỗi Cross-Platform

| # | Tổ hợp | Màn hình | Mô tả lỗi | Loại (tràn/chồng/vỡ/cắt/responsive) | Ảnh |
|---|---|---|---|---|---|
| - | - | - | *(Không phát hiện lỗi layout/responsive nghiêm trọng trên toàn bộ 30/30 tổ hợp. Các lỗi UI chung đã được ghi nhận ở Task 1B)* | - | - |

---

## 5. Ghi chú kỹ thuật

- **Ô nào Real device, ô nào Emulator/Simulator:** ghi rõ trong cột "Loại" ở §1
- **Mỗi ảnh phải có:**
  - Overlay email MSSV: `23127241@student.hcmus.edu.vn`
  - Browser / OS / thiết bị nhìn rõ cạnh URL EMS
- **Theo bài giảng:** Emulator/Simulator hợp cho kiểm tra UI/layout nhưng không đủ tin cậy cho kết luận phát hành — ghi rõ trong báo cáo
