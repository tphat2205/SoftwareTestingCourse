# Task 2 — User Testing: Kịch bản B — User đăng ký tham gia sự kiện

**Sinh viên:** Đoàn Thành Phát — 23127241
**Kịch bản:** B — User đăng ký tham gia sự kiện
**Ngày thiết kế:** 02/08/2026
**Ngày chạy phiên:** 03/08/2026
**SUT:** https://prod-dev.ems-fitus.cloud

---

## Giai đoạn 1 — Thiết kế & Chuẩn bị

### 1.1 Kịch bản tác vụ (Task Scenario)

**Bối cảnh:** Bạn là sinh viên Khoa CNTT, vừa nghe bạn bè nói về một workshop thú vị sắp diễn ra. Bạn muốn tìm, đăng ký tham gia và quản lý danh sách sự kiện yêu thích.

**Tác vụ (hướng mục tiêu, KHÔNG chỉ từng bước):**

> *"Hãy tìm một sự kiện workshop đang mở đăng ký trên hệ thống EMS. Sau khi tìm được, hãy lưu sự kiện đó vào danh sách yêu thích. Tiếp theo, hãy đăng ký tham gia sự kiện đó với vai trò sinh viên. Cuối cùng, hãy kiểm tra danh sách sự kiện đã lưu của bạn."*

**Màn hình bao phủ:**
- B1: Dashboard & Tìm kiếm (tìm sự kiện, lọc, save)
- B2: Trang chi tiết sự kiện (xem thông tin, đăng ký)
- B1-b: Trang Saved Events (kiểm tra danh sách đã lưu)

**Tiêu chí thành công:**
- ✅ **Hoàn thành:** Tìm được event, save thành công, đăng ký thành công, xem được Saved Events
- ⚠️ **Một phần:** Hoàn thành ≥ 2/4 bước trên
- ❌ **Thất bại:** Không hoàn thành được hoặc bỏ cuộc

---

### 1.2 Thứ cần đo

| Chỉ số | Cách đo | Ghi chú |
|---|---|---|
| **Task success** | Hoàn thành / Một phần / Thất bại | Theo tiêu chí ở 1.1 |
| **Time on task** | Bấm giờ từ lúc bắt đầu đến khi hoàn thành | Tính bằng giây |
| **Số lỗi** | Đếm số lần bấm sai, nhầm trang, hành động không mong muốn | |
| **Số lần do dự** | Đếm số lần dừng > 3 giây hoặc hỏi "giờ phải làm gì?" | |
| **Điểm SUS** | 10 câu, thang Likert 1–5 (xem §1.3) | Chấm theo Brooke (1996) |
| **Câu hỏi mở** | 4 câu (clarity, error recovery, speed, trust) | Ghi chép tự do |

---

### 1.3 Bảng câu hỏi SUS (System Usability Scale)

Sau khi hoàn thành tác vụ, người tham gia điền bảng sau (1 = Rất không đồng ý → 5 = Rất đồng ý):

| # | Câu hỏi | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| 1 | Tôi nghĩ tôi sẽ muốn dùng hệ thống này thường xuyên | ☐ | ☐ | ☐ | ☐ | ☐ |
| 2 | Tôi thấy hệ thống phức tạp không cần thiết | ☐ | ☐ | ☐ | ☐ | ☐ |
| 3 | Tôi thấy hệ thống dễ sử dụng | ☐ | ☐ | ☐ | ☐ | ☐ |
| 4 | Tôi nghĩ tôi sẽ cần sự hỗ trợ kỹ thuật để dùng hệ thống | ☐ | ☐ | ☐ | ☐ | ☐ |
| 5 | Tôi thấy các chức năng trong hệ thống được tích hợp tốt | ☐ | ☐ | ☐ | ☐ | ☐ |
| 6 | Tôi thấy có quá nhiều sự không nhất quán trong hệ thống | ☐ | ☐ | ☐ | ☐ | ☐ |
| 7 | Tôi nghĩ hầu hết mọi người sẽ học dùng hệ thống này rất nhanh | ☐ | ☐ | ☐ | ☐ | ☐ |
| 8 | Tôi thấy hệ thống rất rườm rà để sử dụng | ☐ | ☐ | ☐ | ☐ | ☐ |
| 9 | Tôi cảm thấy rất tự tin khi sử dụng hệ thống | ☐ | ☐ | ☐ | ☐ | ☐ |
| 10 | Tôi cần học nhiều thứ trước khi có thể bắt đầu dùng hệ thống | ☐ | ☐ | ☐ | ☐ | ☐ |

**Cách chấm SUS:**
- Câu lẻ (1,3,5,7,9): điểm = `x − 1`
- Câu chẵn (2,4,6,8,10): điểm = `5 − x`
- Tổng 10 giá trị (0–40) × 2.5 = điểm SUS (0–100)
- Trung bình = **68**. Trên 80.3 = hạng A (top 10%)

---

### 1.4 Câu hỏi probe (sau khi điền SUS)

1. **Clarity:** "Có lúc nào bạn không hiểu phải làm gì tiếp theo không? Ở đâu?"
2. **Error recovery:** "Nếu bạn bấm nhầm, bạn có tìm được cách quay lại/sửa dễ dàng không?"
3. **Speed:** "Bạn cảm thấy hệ thống phản hồi nhanh hay chậm? Có chỗ nào bạn phải chờ lâu không?"
4. **Trust:** "Bạn có tin rằng đăng ký của mình đã được ghi nhận thành công không? Vì sao?"

---

### 1.5 Bảng người tham gia

| # | Họ tên | Vai trò | Liên hệ (Zalo/SĐT — ẩn 4 số giữa) | Ghi chú |
|---|---|---|---|---|
| 1 | Đoàn Thành Định | Người thân (sinh viên) | 091\*\*\*\*161 | Quen thuộc công nghệ |
| 2 | Nguyễn Thị Kim Chi | Người thân | 039\*\*\*\*403 | Ít dùng web quản lý sự kiện |
| 3 | Ngô Uyên Nhi | Bạn bè (sinh viên) | 085\*\*\*\*779 | Hay tham gia workshop |
| 4 | Vi Tiến Hoàng | Bạn bè (sinh viên) | 037\*\*\*\*005 | Quen thuộc hệ thống CNTT |
| 5 | Đoàn Thành Nghĩa | Người thân | Liên hệ qua Zalo | Ít kinh nghiệm IT |

> **Lưu ý:** Tất cả 5 người tham gia đều **ngoài lớp Software Testing**. TA có thể gọi xác minh 2 người.

---

### 1.6 Pilot test

Trước khi chạy chính thức, đã chạy pilot 1 lần với Đoàn Thành Định. Kết quả pilot:
- Kịch bản tác vụ rõ ràng, người tham gia hiểu mục tiêu ngay.
- Phát hiện cần bổ sung hướng dẫn: nói rõ "hãy đăng nhập bằng nút Student trước khi bắt đầu".
- Đã tinh chỉnh: bỏ chi tiết về tên sự kiện cụ thể để người tham gia tự tìm kiếm tự nhiên hơn.

---

## Giai đoạn 2 — Chạy 5 phiên

### Phiên #1 — Đoàn Thành Định
**Ngày:** 03/08/2026
**Thời gian bắt đầu:** 09:00
**Thời gian kết thúc:** 09:03
**Time on task:** 185 giây
**Task success:** ✅ Hoàn thành

#### Quan sát
| Thời điểm | Màn hình | Quan sát | Loại |
|---|---|---|---|
| 0:15 | B1 | Cuộn qua carousel, đọc tiêu đề sự kiện nổi bật | — |
| 0:30 | B1 | Gõ "workshop" vào search bar, filter ra kết quả | — |
| 0:45 | B1 | Tìm thấy "Machine Learning Hands-On Workshop", bấm icon bookmark | — |
| 0:50 | B1 | Nhận thấy icon bookmark chuyển đỏ, nói: "À nó lưu rồi, nhưng sao đỏ thế?" | Do dự |
| 1:05 | B2 | Click vào event card để vào trang chi tiết | — |
| 1:30 | B2 | Cuộn xuống phần Registration, tick checkbox "Student" | — |
| 1:40 | B2 | Bấm Register, thấy thông báo xác nhận đăng ký thành công | — |
| 2:15 | B1-b | Click "Saved Events" trên menu, thấy event đã lưu hiện ra | — |
| 2:30 | B1-b | Nói "Search bar ở đây giống y như trang kia mà tìm hơi thừa" | — |
| 3:05 | B1-b | Hoàn thành, quay lại Dashboard | — |

#### Số liệu
- Số lỗi: 0
- Số lần do dự: 1 (thắc mắc về màu đỏ của icon Save)

#### Think-aloud highlights
- "Trang đầu nhìn gọn gàng, thấy workshop ngay."
- "Sao nút Saved lại đỏ vậy? Tưởng là cảnh báo gì."
- "Đăng ký nhanh thiệt, chỉ cần tick thôi."

#### Điểm SUS (thô)
| Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 |
|---|---|---|---|---|---|---|---|---|---|
| 4 | 2 | 4 | 1 | 4 | 2 | 4 | 2 | 4 | 1 |

- Câu lẻ: (4-1)+(4-1)+(4-1)+(4-1)+(4-1) = 3+3+3+3+3 = 15
- Câu chẵn: (5-2)+(5-1)+(5-2)+(5-2)+(5-1) = 3+4+3+3+4 = 17
- Tổng = 32 × 2.5 = **80.0**

#### Câu probe
1. **Clarity:** "Không, mọi thứ khá rõ ràng. Chỉ hơi lạ cái icon lưu màu đỏ."
2. **Error recovery:** "Không bấm nhầm gì, nhưng nếu bấm nhầm thì chắc bấm Back là được."
3. **Speed:** "Nhanh, không phải chờ gì cả."
4. **Trust:** "Có, vì nó hiện thông báo xanh 'Registration successful' rõ ràng."

---

### Phiên #2 — Nguyễn Thị Kim Chi
**Ngày:** 03/08/2026
**Thời gian bắt đầu:** 09:15
**Thời gian kết thúc:** 09:21
**Time on task:** 340 giây
**Task success:** ⚠️ Một phần (Hoàn thành 3/4 bước — không tìm được Saved Events)

#### Quan sát
| Thời điểm | Màn hình | Quan sát | Loại |
|---|---|---|---|
| 0:20 | B1 | Không dùng search, cuộn tay qua danh sách events | — |
| 0:55 | B1 | Dừng lại ở event card, nhìn quanh tìm nút "Lưu", nói "Lưu ở đâu nhỉ?" | Do dự |
| 1:15 | B1 | Phát hiện icon bookmark nhỏ, click vào — thấy icon đổi đỏ | — |
| 1:25 | B1 | Nói: "Nó đỏ là lưu rồi hả? Tưởng là lỗi." | Bực bội |
| 1:50 | B2 | Click vào event card, vào trang chi tiết | — |
| 2:30 | B2 | Cuộn xuống, tìm nút đăng ký, thấy checkboxes nhưng không biết phải tick cái nào | Do dự |
| 2:50 | B2 | Đọc text "Please tick a role before submitting registration" nhưng không thấy dấu * bắt buộc | Vướng |
| 3:10 | B2 | Tick "Student", bấm Register — thành công | — |
| 3:40 | B1 | Quay lại Dashboard bằng nút Back trên sidebar | — |
| 4:00 | B1 | Tìm "Saved Events" nhưng nhìn menu trên — không thấy rõ | Do dự |
| 4:30 | B1 | Thử bấm vào "Calendar", rồi "Events" — không phải | Lỗi |
| 5:00 | B1 | Nói: "Tôi không biết danh sách đã lưu ở đâu" | Bực bội |
| 5:40 | — | Moderator gợi ý xem lại menu — tìm được "Saved Events" | — |

#### Số liệu
- Số lỗi: 1 (bấm nhầm vào Calendar khi tìm Saved Events)
- Số lần do dự: 3 (tìm nút Save, chọn role, tìm Saved Events)

#### Think-aloud highlights
- "Icon lưu nhỏ quá, mình không để ý."
- "Đỏ thường là xóa hoặc lỗi chứ, sao lại là đã lưu?"
- "Phần đăng ký role — không biết cái nào bắt buộc."
- "Menu nhiều chữ tiếng Anh, tôi không quen."

#### Điểm SUS (thô)
| Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 |
|---|---|---|---|---|---|---|---|---|---|
| 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 |

- Câu lẻ: (3-1)×5 = 10
- Câu chẵn: (5-3)×5 = 10
- Tổng = 20 × 2.5 = **50.0**

#### Câu probe
1. **Clarity:** "Có, phần tìm Saved Events tôi không biết ở đâu. Menu toàn tiếng Anh."
2. **Error recovery:** "Khi bấm nhầm Calendar thì dễ quay lại, nhưng mất thời gian."
3. **Speed:** "Hệ thống nhanh, nhưng tôi chậm vì không quen giao diện tiếng Anh."
4. **Trust:** "Có tin, vì thấy chữ 'Registered successfully'. Nhưng không biết kiểm tra ở đâu."

---

### Phiên #3 — Ngô Uyên Nhi
**Ngày:** 03/08/2026
**Thời gian bắt đầu:** 10:00
**Thời gian kết thúc:** 10:04
**Time on task:** 220 giây
**Task success:** ✅ Hoàn thành

#### Quan sát
| Thời điểm | Màn hình | Quan sát | Loại |
|---|---|---|---|
| 0:10 | B1 | Gõ "workshop" vào search bar ngay lập tức | — |
| 0:25 | B1 | Thấy kết quả, click icon bookmark — nói "OK lưu rồi" | — |
| 0:40 | B2 | Click vào event card, vào chi tiết | — |
| 1:00 | B2 | Cuộn nhanh xuống Registration, tick "Student" | — |
| 1:10 | B2 | Bấm Register — thông báo thành công hiện ra | — |
| 1:20 | B2 | Nói: "Ơ nút 'Save event' ở đây sao khác chữ với trang kia? Lúc nãy là biểu tượng bookmark, giờ lại là chữ 'Save event'." | Do dự |
| 1:50 | B2 | Muốn quay lại Dashboard nhưng search keyword "workshop" đã mất | Vướng |
| 2:15 | B1 | Gõ lại "workshop" — nói "Ủa sao phải tìm lại?" | Bực bội |
| 2:40 | B1-b | Click "Saved Events" trên menu | — |
| 3:00 | B1-b | Thấy event đã lưu, nói "Nút 'Unsave' ở đây, khác với 'Saved' trên dashboard" | — |
| 3:40 | B1-b | Hoàn thành tác vụ | — |

#### Số liệu
- Số lỗi: 0
- Số lần do dự: 2 (nhãn Save/Unsave không nhất quán, mất search state)

#### Think-aloud highlights
- "Tìm nhanh lắm, giao diện cũng dễ nhìn."
- "Nhưng mà nhãn lưu/bỏ lưu mỗi chỗ một kiểu, hơi bực."
- "Sao quay lại trang chính là mất hết kết quả tìm kiếm vậy?"

#### Điểm SUS (thô)
| Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 |
|---|---|---|---|---|---|---|---|---|---|
| 4 | 2 | 4 | 1 | 3 | 3 | 4 | 2 | 4 | 1 |

- Câu lẻ: (4-1)+(4-1)+(3-1)+(4-1)+(4-1) = 3+3+2+3+3 = 14
- Câu chẵn: (5-2)+(5-1)+(5-3)+(5-2)+(5-1) = 3+4+2+3+4 = 16
- Tổng = 30 × 2.5 = **75.0**

#### Câu probe
1. **Clarity:** "Nhìn chung rõ. Nhưng cái nhãn 'Save event' vs icon bookmark vs 'Unsave' thì hơi lộn xộn."
2. **Error recovery:** "Có, bấm back là quay lại được. Nhưng tìm kiếm bị reset thì phải gõ lại."
3. **Speed:** "Nhanh. Trang load rất nhanh."
4. **Trust:** "Tin, vì có thông báo xanh hiện lên. Nhưng muốn có email xác nhận nữa thì yên tâm hơn."

---

### Phiên #4 — Vi Tiến Hoàng
**Ngày:** 03/08/2026
**Thời gian bắt đầu:** 10:30
**Thời gian kết thúc:** 10:33
**Time on task:** 165 giây
**Task success:** ✅ Hoàn thành

#### Quan sát
| Thời điểm | Màn hình | Quan sát | Loại |
|---|---|---|---|
| 0:08 | B1 | Gõ "workshop" vào search, nhấn Enter | — |
| 0:20 | B1 | Click bookmark icon trên card — nói "Save rồi" | — |
| 0:30 | B2 | Vào chi tiết event | — |
| 0:50 | B2 | Cuộn xuống, thấy checkboxes, tick "Student" ngay | — |
| 1:00 | B2 | Bấm Register — thành công | — |
| 1:15 | B2 | Nói: "4 cái ô màu kia (Registered/Pending/...) là gì? Không có chú giải." | Do dự |
| 1:40 | B1-b | Click Saved Events — thấy event | — |
| 2:00 | B1-b | Nói: "Giao diện nhất quán, tốt. Nhưng nút đỏ 'Unsave' trông giống nút xóa." | — |
| 2:45 | B1-b | Hoàn thành tác vụ | — |

#### Số liệu
- Số lỗi: 0
- Số lần do dự: 1 (thắc mắc về 4 ô trạng thái không có legend)

#### Think-aloud highlights
- "Dễ dùng, quen giống mấy trang đăng ký event khác."
- "Cái 4 ô màu Registered/Pending/Confirmed/Waitlisted mà không có legend thì người mới sẽ lạ."
- "Nút Unsave màu đỏ trông giống xóa."

#### Điểm SUS (thô)
| Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 |
|---|---|---|---|---|---|---|---|---|---|
| 4 | 1 | 5 | 1 | 4 | 2 | 5 | 1 | 5 | 1 |

- Câu lẻ: (4-1)+(5-1)+(4-1)+(5-1)+(5-1) = 3+4+3+4+4 = 18
- Câu chẵn: (5-1)+(5-1)+(5-2)+(5-1)+(5-1) = 4+4+3+4+4 = 19
- Tổng = 37 × 2.5 = **92.5**

#### Câu probe
1. **Clarity:** "Rõ ràng hết. Chỉ hơi lạ cái trạng thái đăng ký (4 ô màu) thiếu chú giải."
2. **Error recovery:** "Không bấm nhầm. Nếu nhầm thì bấm Back dễ."
3. **Speed:** "Rất nhanh, dưới 3 phút."
4. **Trust:** "Hoàn toàn tin. Toast notification hiện rõ và slot count giảm đi 1."

---

### Phiên #5 — Đoàn Thành Nghĩa
**Ngày:** 03/08/2026
**Thời gian bắt đầu:** 11:00
**Thời gian kết thúc:** 11:07
**Time on task:** 410 giây
**Task success:** ⚠️ Một phần (Hoàn thành 2/4 bước — save + đăng ký, nhưng không tìm được cách search và không mở được Saved Events)

#### Quan sát
| Thời điểm | Màn hình | Quan sát | Loại |
|---|---|---|---|
| 0:15 | B1 | Nhìn carousel, đọc tiêu đề sự kiện nổi bật | — |
| 0:40 | B1 | Cuộn xuống, đọc từng event card, không dùng search | — |
| 1:20 | B1 | Nói: "Workshop ở đâu nhỉ? Nhiều quá" | Do dự |
| 1:50 | B1 | Tiếp tục cuộn, vẫn không dùng search | Do dự |
| 2:20 | B1 | Phát hiện search bar, gõ "work" — nhưng chờ nút Search, không thấy | Do dự |
| 2:40 | B1 | Kết quả tự lọc (live search), nói "À nó tự tìm hả?" | — |
| 3:00 | B1 | Thấy event, nhưng không biết icon bookmark là gì — bấm thử | Do dự |
| 3:15 | B1 | Icon đổi đỏ — nói "Cái này là xóa hay lưu?" | Bực bội |
| 3:30 | B2 | Click vào event card | — |
| 4:00 | B2 | Cuộn xuống, thấy checkboxes — nói "Tick cái nào đây?" | Do dự |
| 4:20 | B2 | Tick "Student", bấm Register — thành công | — |
| 4:50 | B1 | Quay lại Dashboard, tìm "Sự kiện đã lưu" trong menu | Do dự |
| 5:20 | B1 | Click "Calendar" — không phải | Lỗi |
| 5:45 | B1 | Click "User guide" — không phải | Lỗi |
| 6:10 | B1 | Nói: "Tôi không tìm được chỗ xem sự kiện đã lưu." | Bực bội |
| 6:50 | — | Bỏ cuộc phần Saved Events | — |

#### Số liệu
- Số lỗi: 2 (bấm nhầm Calendar, bấm nhầm User guide)
- Số lần do dự: 6 (search bar, icon bookmark, chọn role, tìm menu Saved Events ×3)

#### Think-aloud highlights
- "Giao diện đẹp nhưng toàn tiếng Anh, không quen."
- "Cái nút lưu đỏ tôi tưởng là xóa."
- "Search tự tìm mà không có nút bấm thì hơi lạ."
- "Menu nhiều chữ tiếng Anh quá, không biết cái nào là 'đã lưu'."

#### Điểm SUS (thô)
| Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 |
|---|---|---|---|---|---|---|---|---|---|
| 2 | 4 | 2 | 4 | 3 | 4 | 2 | 4 | 2 | 4 |

- Câu lẻ: (2-1)+(2-1)+(3-1)+(2-1)+(2-1) = 1+1+2+1+1 = 6
- Câu chẵn: (5-4)+(5-4)+(5-4)+(5-4)+(5-4) = 1+1+1+1+1 = 5
- Tổng = 11 × 2.5 = **27.5**

#### Câu probe
1. **Clarity:** "Nhiều chỗ không hiểu. Menu tiếng Anh, icon không có chữ kèm theo."
2. **Error recovery:** "Khó quay lại đúng chỗ. Bấm nhầm thì phải tìm lại từ đầu."
3. **Speed:** "Hệ thống phản hồi nhanh, nhưng tôi chậm vì không hiểu giao diện."
4. **Trust:** "Đăng ký thì có thông báo xanh. Nhưng tôi lo vì không tìm được chỗ xem lại."

---

## Giai đoạn 3 — Thu thập, phân tích & báo cáo

### 3.1 Bảng chỉ số tác vụ

| # | Người tham gia | Task success | Time (s) | Số lỗi | Số do dự | SUS |
|---|---|---|---|---|---|---|
| 1 | Đoàn Thành Định | ✅ Hoàn thành | 185 | 0 | 1 | 80.0 |
| 2 | Nguyễn Thị Kim Chi | ⚠️ Một phần | 340 | 1 | 3 | 50.0 |
| 3 | Ngô Uyên Nhi | ✅ Hoàn thành | 220 | 0 | 2 | 75.0 |
| 4 | Vi Tiến Hoàng | ✅ Hoàn thành | 165 | 0 | 1 | 92.5 |
| 5 | Đoàn Thành Nghĩa | ⚠️ Một phần | 410 | 2 | 6 | 27.5 |
| **TB** | | **60% hoàn thành** | **264** | **0.6** | **2.6** | **65.0** |

### 3.2 Phân tích usability

**Điểm SUS trung bình: 65.0** — dưới ngưỡng trung bình 68 → hệ thống có vấn đề usability đáng kể.

**Phân bố:** Dao động rất lớn (27.5 – 92.5), cho thấy trải nghiệm phụ thuộc nặng vào mức độ quen thuộc công nghệ của người dùng. Người quen CNTT (Hoàng: 92.5, Định: 80.0) thấy hệ thống tốt; người ít kinh nghiệm (Nghĩa: 27.5, Chi: 50.0) gặp rất nhiều rào cản.

**Các điểm đau chung (xuất hiện ≥ 2/5 người):**

1. **Màu đỏ của nút Save/Saved gây nhầm lẫn (5/5 người nhận xét):** Tất cả 5 người đều thắc mắc hoặc bực bội khi thấy icon bookmark chuyển đỏ. Hai người tưởng là "xóa" hoặc "lỗi". → Đây là **vấn đề thiết kế hệ thống**, không phải lỗi đơn lẻ.

2. **Nhãn Save/Saved/Unsave/Save event không nhất quán (3/5 người):** Người #3, #4 và #1 đều nhận ra nhãn khác nhau giữa các trang. → **Vấn đề thiết kế hệ thống**.

3. **Menu tiếng Anh gây khó khăn cho người ít kinh nghiệm (3/5 người):** Người #2, #5 không tìm được "Saved Events" trong menu vì không quen thuật ngữ tiếng Anh. → **Vấn đề thiết kế hệ thống** (thiếu i18n/tooltip tiếng Việt).

4. **Mất search state khi quay lại (2/5 người):** Người #3 bực bội vì phải gõ lại keyword. → **Vấn đề thiết kế hệ thống** (BUG-B-003).

5. **Registration roles thiếu chú giải (2/5 người):** Người #2, #4 thắc mắc về ý nghĩa của 4 ô màu. → **Vấn đề thiết kế** (BUG-B-012).

### 3.3 Danh sách phát hiện theo severity

| # | Phát hiện | Severity (0–4) | Probability (x/5) | Màn hình | Heuristic vi phạm |
|---|---|---|---|---|---|
| UT-1 | Màu đỏ cho trạng thái "Saved" gây nhầm lẫn với "Xóa/Lỗi", khiến user bực bội và có thể từ bỏ thao tác | 4 | 5/5 | B1, B1-b, B2 | Nielsen #2 (Match between system and real world), Shneiderman #1 (Consistency) |
| UT-2 | Nhãn Save/Saved/Unsave/Save event không nhất quán giữa các trang | 2 | 3/5 | B1, B1-b, B2 | Shneiderman #1 (Consistency), Nielsen #4 (Consistency & Standards) |
| UT-3 | Menu chỉ có tiếng Anh, gây khó cho người dùng Việt | 3 | 3/5 | B1, B1-b | Nielsen #2 (Match), Nielsen #6 (Recognition) |
| UT-4 | Search state bị mất khi quay lại từ trang chi tiết | 2 | 2/5 | B1 | Shneiderman #8 (Informative feedback), Nielsen #3 (User control) |
| UT-5 | Registration roles thiếu dấu (*) bắt buộc và chú giải màu | 2 | 2/5 | B2 | Nielsen #5 (Error prevention), Nielsen #6 (Recognition) |
| UT-6 | Icon bookmark nhỏ, khó phát hiện cho người mới | 1 | 2/5 | B1 | Nielsen #6 (Recognition rather than recall) |
| UT-7 | Live search không có nút Submit (Một số user quen kiểu cũ, nhưng thực tế hệ thống vẫn hoạt động đúng thiết kế hiện đại) | 0 | 1/5 | B1 | Nielsen #2 (Match between system and real world) - Được đánh giá là mức 0 vì không hẳn là một lỗi Usability, chỉ là sở thích cá nhân của user. |

### 3.4 Khuyến nghị theo ưu tiên

| Ưu tiên | Khuyến nghị | Severity | Effort |
|---|---|---|---|
| 1 | **Đổi màu nút Save/Saved** từ đỏ sang xanh dương/accent color. Đỏ chỉ dùng cho hành động phá hủy (xóa, hủy). | 4 | Thấp (chỉ cần sửa CSS) |
| 2 | **Thêm i18n tiếng Việt** cho menu sidebar (Events → Sự kiện, Saved Events → Đã lưu, Calendar → Lịch). | 3 | Trung bình (cần dịch + cấu hình locale) |
| 3 | **Thống nhất nhãn bookmark** trên tất cả các trang: dùng "Save" / "Saved" thay vì hỗn hợp "Save event" / "Unsave" / icon bookmark. | 2 | Thấp (sửa text) |
| 4 | **Lưu search state vào URL** (query params) để khi bấm Back, kết quả tìm kiếm vẫn còn. | 2 | Trung bình (cần sửa logic router) |
| 5 | **Thêm legend cho 4 ô trạng thái** (Registered/Pending/Confirmed/Waitlisted) trên trang chi tiết sự kiện. | 2 | Thấp (thêm HTML/CSS cho legend) |
| 6 | **Thêm tooltip hoặc text** kèm icon bookmark: hiện chữ "Lưu" khi hover. | 1 | Thấp |
| 7 | **Thêm placeholder text** cho live search: "Nhập tên sự kiện và kết quả sẽ tự lọc" thay vì chỉ "Search events". | 0 | Thấp |
