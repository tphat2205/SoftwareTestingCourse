# Bug Reporting — FR-06: Xem chi tiết sản phẩm (Product Detail View)

Báo cáo lỗi được phát hiện bằng cách thực thi các test case từ **Domain Testing** và **Boundary Value Analysis (BVA)** trên giao diện front-end (trang chi tiết sản phẩm).

---

## BUG-FR06-01: Thông báo lỗi khi Product ID không tồn tại chứa thông tin debug nội bộ

| Mục                    | Chi tiết                                                                                                                                                                                                                                                                                  |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bug ID**             | BUG-FR06-01                                                                                                                                                                                                                                                                               |
| **Feature**            | FR-06: Xem chi tiết sản phẩm                                                                                                                                                                                                                                                              |
| **Severity**           | Medium                                                                                                                                                                                                                                                                                    |
| **Test Case**          | DT_FR06_02 (Domain Testing — EC2: Product ID không tồn tại)                                                                                                                                                                                                                               |
| **Mô tả**              | Khi truy cập vào URL chi tiết sản phẩm với một ID không tồn tại (VD: `/product/99999`), trang hiển thị thông báo **"Sản phẩm không tồn tại (Lỗi trắng trang do data rỗng)"**. Phần ngoặc đơn chứa thông tin debug nội bộ dành cho lập trình viên, không nên hiển thị cho người dùng cuối. |
| **Steps to Reproduce** | 1. Mở trình duyệt, truy cập URL `http://localhost:5173/product/99999`.<br>2. Quan sát nội dung hiển thị trên trang.                                                                                                                                                                       |
| **Expected**           | Trang hiển thị thông báo thân thiện cho người dùng: **"Sản phẩm không tồn tại"**, không chứa thông tin kỹ thuật nội bộ.                                                                                                                                                                   |
| **Actual**             | Trang hiển thị: **"Sản phẩm không tồn tại (Lỗi trắng trang do data rỗng)"** — lộ thông tin debug cho người dùng cuối.                                                                                                                                                                     |

## BUG-FR06-02: Nút "Thêm vào giỏ hàng" phải bấm 2 lần mới hoạt động

| Mục                    | Chi tiết                                                                                                                                                                                                                                                                                 |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bug ID**             | BUG-FR06-02                                                                                                                                                                                                                                                                              |
| **Feature**            | FR-06: Xem chi tiết sản phẩm                                                                                                                                                                                                                                                             |
| **Severity**           | High                                                                                                                                                                                                                                                                                     |
| **Test Case**          | DT_FR06_01 (Domain Testing — EC1, EC3, EC5) và BVA_FR06_01, BVA_FR06_03                                                                                                                                                                                                                  |
| **Mô tả**              | Khi người dùng bấm nút **"Thêm vào giỏ hàng"** lần đầu tiên, hệ thống **không thực hiện bất kỳ hành động nào** (không thêm sản phẩm, không hiện phản hồi trực quan). Người dùng phải bấm **lần thứ hai** thì sản phẩm mới thực sự được thêm vào giỏ hàng và nút chuyển thành "Đã thêm".  |
| **Steps to Reproduce** | 1. Mở trang chi tiết sản phẩm (VD: `http://localhost:5173/product/1`).<br>2. Giữ nguyên số lượng mặc định = 1.<br>3. Bấm nút "Thêm vào giỏ hàng" **1 lần**.<br>4. Quan sát: Không có phản hồi, sản phẩm chưa được thêm vào giỏ.<br>5. Bấm nút **lần thứ 2**: Nút chuyển thành "Đã thêm". |
| **Expected**           | Bấm nút "Thêm vào giỏ hàng" **1 lần** là đủ để thêm sản phẩm vào giỏ hàng và hiển thị phản hồi "Đã thêm".                                                                                                                                                                                |
| **Actual**             | Lần bấm đầu tiên bị bỏ qua hoàn toàn, không có phản hồi. Cần bấm 2 lần mới thêm được sản phẩm vào giỏ.                                                                                                                                                                                   |

### Screenshot

> _Chèn ảnh chụp màn hình tại đây (VD: Video/ảnh GIF minh họa bấm nút lần 1 không có phản hồi, bấm lần 2 mới hiện "Đã thêm")._

---

## BUG-FR06-03: Cho phép nhập số lượng = 0 hoặc số âm, không có validation

| Mục                    | Chi tiết                                                                                                                                                                                                                                                                                                                                                 |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bug ID**             | BUG-FR06-03                                                                                                                                                                                                                                                                                                                                              |
| **Feature**            | FR-06: Xem chi tiết sản phẩm                                                                                                                                                                                                                                                                                                                             |
| **Severity**           | Medium                                                                                                                                                                                                                                                                                                                                                   |
| **Test Case**          | DT_FR06_03 (Domain Testing — EC4: `Số lượng` < 1) và BVA_FR06_02 (BVA — LB−1: `Số lượng` = 0)                                                                                                                                                                                                                                                            |
| **Mô tả**              | Ô nhập `Số lượng` không có ràng buộc giá trị tối thiểu. Người dùng có thể nhập **0** hoặc **số âm** (-1, -5, ...) và hệ thống vẫn cho phép thêm sản phẩm vào giỏ hàng bình thường. Khi xem giỏ hàng, sản phẩm hiển thị với số lượng 0 (thành tiền = 0 ₫) hoặc số lượng âm (thành tiền bị âm, làm giảm tổng tiền).                                        |
| **Steps to Reproduce** | 1. Mở trang chi tiết sản phẩm (VD: `http://localhost:5173/product/1`).<br>2. Xóa giá trị mặc định trong ô số lượng, nhập `0`.<br>3. Bấm nút "Thêm vào giỏ hàng" (bấm 2 lần do BUG-FR06-02).<br>4. Mở giỏ hàng: Sản phẩm được thêm với số lượng = 0, thành tiền = 0 ₫.<br>5. Lặp lại với giá trị `-5`: Sản phẩm được thêm với số lượng -5, thành tiền âm. |
| **Expected**           | Hệ thống chặn không cho phép nhập số lượng < 1. Hiển thị thông báo lỗi "Số lượng tối thiểu là 1" hoặc vô hiệu hóa nút "Thêm vào giỏ hàng".                                                                                                                                                                                                               |
| **Actual**             | Hệ thống chấp nhận mọi giá trị số bao gồm 0 và số âm, thêm vào giỏ hàng bình thường.                                                                                                                                                                                                                                                                     |

### Screenshot

> _Chèn ảnh chụp màn hình tại đây (VD: Ảnh chụp giỏ hàng hiển thị sản phẩm với số lượng = 0 hoặc -5, thành tiền bị sai)._

---

## BUG-FR06-04: Cho phép thêm sản phẩm với số lượng NaN khi dán ký tự chữ cái vào ô số lượng

| Mục                    | Chi tiết                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bug ID**             | BUG-FR06-04                                                                                                                                                                                                                                                                                                                                               |
| **Feature**            | FR-06: Xem chi tiết sản phẩm                                                                                                                                                                                                                                                                                                                              |
| **Severity**           | Medium                                                                                                                                                                                                                                                                                                                                                    |
| **Test Case**          | DT_FR06_05 (Domain Testing — EC7: `Số lượng` chứa ký tự không phải số)                                                                                                                                                                                                                                                                                    |
| **Mô tả**              | Mặc dù ô nhập số lượng chặn một số ký tự chữ cái từ bàn phím, người dùng vẫn có thể **dán (paste) giá trị text** (VD: "abc") vào ô số lượng. Khi bấm thêm vào giỏ hàng, sản phẩm được thêm với quantity = `NaN`. Trong giỏ hàng, cột "Số lượng" hiển thị `NaN`, cột "Thành tiền" hiển thị `NaN ₫`, và tổng tiền giỏ hàng cũng bị ảnh hưởng thành `NaN ₫`. |
| **Steps to Reproduce** | 1. Mở trang chi tiết sản phẩm (VD: `http://localhost:5173/product/1`).<br>2. Bôi đen giá trị trong ô số lượng, dán (Ctrl+V) chuỗi `"abc"`.<br>3. Bấm nút "Thêm vào giỏ hàng" (bấm 2 lần do BUG-FR06-02).<br>4. Mở giỏ hàng: Sản phẩm hiển thị số lượng = `NaN`, thành tiền = `NaN ₫`.                                                                     |
| **Expected**           | Hệ thống phải validate input: Nếu giá trị không phải số nguyên dương, hiển thị thông báo lỗi và không cho phép thêm vào giỏ hàng.                                                                                                                                                                                                                         |
| **Actual**             | Sản phẩm được thêm vào giỏ với `quantity = NaN`, gây hiển thị `NaN ₫` trên toàn bộ giỏ hàng.                                                                                                                                                                                                                                                              |

### Screenshot

> _Chèn ảnh chụp màn hình tại đây (VD: Ảnh chụp giỏ hàng hiển thị quantity = NaN và thành tiền = NaN ₫)._

---

## BUG-FR06-05: Số thập phân bị cắt ngầm khi nhập số lượng, không thông báo cho người dùng

| Mục                    | Chi tiết                                                                                                                                                                                                                                                                                     |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bug ID**             | BUG-FR06-05                                                                                                                                                                                                                                                                                  |
| **Feature**            | FR-06: Xem chi tiết sản phẩm                                                                                                                                                                                                                                                                 |
| **Severity**           | Low                                                                                                                                                                                                                                                                                          |
| **Test Case**          | DT_FR06_04 (Domain Testing — EC6: `Số lượng` thập phân, VD: 1.5)                                                                                                                                                                                                                             |
| **Mô tả**              | Khi người dùng nhập số thập phân (VD: `1.5`) vào ô số lượng, hệ thống **chấp nhận giá trị này mà không cảnh báo**. Khi thêm vào giỏ hàng, phần thập phân bị **cắt bỏ ngầm** (implicit truncation): `1.5` → `1`. Người dùng nhập 1.5 nhưng giỏ hàng chỉ ghi nhận số lượng = 1, gây hiểu nhầm. |
| **Steps to Reproduce** | 1. Mở trang chi tiết sản phẩm (VD: `http://localhost:5173/product/1`).<br>2. Xóa giá trị mặc định trong ô số lượng, nhập `1.5`.<br>3. Bấm nút "Thêm vào giỏ hàng" (bấm 2 lần do BUG-FR06-02).<br>4. Mở giỏ hàng: Sản phẩm hiển thị với số lượng = 1 (phần `.5` bị mất mà không thông báo).   |
| **Expected**           | Hệ thống chặn không cho phép nhập số thập phân vào ô số lượng, hoặc hiển thị thông báo "Số lượng phải là số nguyên".                                                                                                                                                                         |
| **Actual**             | Ô nhập chấp nhận số thập phân, phần lẻ bị cắt ngầm khi thêm vào giỏ. Không có cảnh báo cho người dùng.                                                                                                                                                                                       |

### Screenshot

> _Chèn ảnh chụp màn hình tại đây (VD: Ảnh chụp ô nhập hiển thị 1.5 nhưng giỏ hàng ghi nhận số lượng = 1)._

---

## Bảng tổng hợp Bug

| Bug ID      | Severity | Test Case phát hiện     | Tóm tắt                                                           |
| ----------- | -------- | ----------------------- | ----------------------------------------------------------------- |
| BUG-FR06-01 | Medium   | DT_FR06_02              | Thông báo lỗi khi Product ID không tồn tại chứa text debug nội bộ |
| BUG-FR06-02 | High     | DT_FR06_01, BVA_FR06_01 | Nút "Thêm vào giỏ hàng" phải bấm 2 lần mới hoạt động              |
| BUG-FR06-03 | Medium   | DT_FR06_03, BVA_FR06_02 | Cho phép nhập Số lượng = 0 hoặc số âm, không có validation        |
| BUG-FR06-04 | Medium   | DT_FR06_05              | Cho phép thêm sản phẩm với quantity = NaN khi dán ký tự chữ cái   |
| BUG-FR06-05 | Low      | DT_FR06_04              | Số thập phân bị cắt ngầm khi nhập số lượng, không thông báo       |

---

## Truy xuất Test Case ↔ Bug (Traceability Matrix)

| Test Case ID | Technique | Bug(s) phát hiện |
| ------------ | --------- | ---------------- |
| DT_FR06_01   | Domain    | BUG-FR06-02      |
| DT_FR06_02   | Domain    | BUG-FR06-01      |
| DT_FR06_03   | Domain    | BUG-FR06-03      |
| DT_FR06_04   | Domain    | BUG-FR06-05      |
| DT_FR06_05   | Domain    | BUG-FR06-04      |
| BVA_FR06_01  | BVA       | BUG-FR06-02      |
| BVA_FR06_02  | BVA       | BUG-FR06-03      |
| BVA_FR06_03  | BVA       | BUG-FR06-02      |

---

# Bug Reporting — FR-10: Quản lý vòng đời đơn hàng (Order State Machine)

Báo cáo lỗi được phát hiện bằng cách thực thi các test case từ **Domain Testing** và **Boundary Value Analysis (BVA)** trên giao diện front-end (trang Lịch sử đơn hàng của User và Quản lý đơn hàng của Admin).

---

## BUG-FR10-01: (User UI) Nút "Hủy đơn" vẫn hiển thị và hoạt động khi đơn hàng ở trạng thái `shipping` (Đang giao)

| Mục                    | Chi tiết                                                                                                                                                                                                                                                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bug ID**             | BUG-FR10-01                                                                                                                                                                                                                                                                                                                                 |
| **Feature**            | FR-10: Quản lý vòng đời đơn hàng                                                                                                                                                                                                                                                                                                            |
| **Severity**           | High                                                                                                                                                                                                                                                                                                                                        |
| **Test Case**          | DT_FR10_04 (Domain Testing — EC5: Trạng thái hiện tại = `shipping`) và BVA_FR10_02 (BVA — UB+1: Trạng thái `shipping`)                                                                                                                                                                                                                      |
| **Mô tả**              | Theo tài liệu thiết kế (logic nghiệp vụ), người dùng chỉ được phép hủy đơn hàng khi trạng thái là chưa giao (`pending` hoặc `confirmed`). Tuy nhiên, trên giao diện trang Lịch sử đơn hàng (`Profile.jsx`), nút "Hủy đơn" vẫn hiển thị cho các đơn hàng có trạng thái `shipping`. Khi bấm vào, hệ thống vẫn thông báo "Hủy đơn thành công". |
| **Steps to Reproduce** | 1. Admin chuyển trạng thái một đơn hàng sang `shipping` (Đang giao).<br>2. Đăng nhập vào tài khoản User sở hữu đơn hàng, vào phần "Hồ sơ của bạn" > "Lịch sử đơn hàng".<br>3. Nhìn thấy nút "Hủy đơn" bên cạnh đơn hàng đang giao.<br>4. Bấm "Hủy đơn" -> Hiện popup "Hủy đơn thành công!" và đơn bị chuyển sang Đã hủy.                    |
| **Expected**           | Giao diện front-end phải ẩn (hoặc vô hiệu hóa) nút "Hủy đơn" đối với các đơn hàng có trạng thái `shipping` trở đi. Nếu cố tình gọi API, hệ thống phải báo lỗi.                                                                                                                                                                              |
| **Actual**             | Nút "Hủy đơn" vẫn hiển thị bình thường. Giao diện (và cả logic API ngầm định) không chặn trạng thái `shipping`, dẫn đến đơn hàng đang giao vẫn bị hủy.                                                                                                                                                                                      |

### Screenshot

> _Chèn ảnh chụp màn hình tại đây (VD: Ảnh chụp màn hình trang Lịch sử đơn hàng hiển thị nút "Hủy đơn" ngay cạnh nhãn trạng thái "Đang giao")._

---

## BUG-FR10-02: (Admin UI) Hiển thị nút "Đánh dấu Đã giao" cho các đơn hàng đã hủy (`canceled`)

| Mục                    | Chi tiết                                                                                                                                                                                                                                                                                                                                 |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bug ID**             | BUG-FR10-02                                                                                                                                                                                                                                                                                                                              |
| **Feature**            | FR-10: Quản lý vòng đời đơn hàng                                                                                                                                                                                                                                                                                                         |
| **Severity**           | Critical                                                                                                                                                                                                                                                                                                                                 |
| **Test Case**          | DT_FR10_13 (Domain Testing — EC13: Trạng thái cập nhật không hợp lệ - Vi phạm luồng State Machine)                                                                                                                                                                                                                                       |
| **Mô tả**              | `canceled` (Đã hủy) là trạng thái kết thúc (terminal state) của vòng đời đơn hàng. Tuy nhiên, trên giao diện trang Quản trị (Admin Panel), đối với các đơn hàng ở trạng thái `canceled`, hệ thống hiển thị nút **"Đánh dấu Đã giao"**. Bấm nút này sẽ chuyển đơn hàng từ Đã hủy thành Đã giao (hồi sinh đơn hàng), phá vỡ state machine. |
| **Steps to Reproduce** | 1. Hủy một đơn hàng (từ phía User hoặc Admin).<br>2. Đăng nhập tài khoản Admin, vào mục "Đơn hàng".<br>3. Tìm đơn hàng có trạng thái `canceled` (màu đỏ).<br>4. Quan sát thấy cột Thao tác có nút "Đánh dấu Đã giao".<br>5. Bấm vào nút này -> Đơn hàng chuyển sang `delivered` (Đã giao).                                               |
| **Expected**           | Giao diện front-end Admin không được hiển thị bất kỳ nút cập nhật trạng thái nào cho đơn hàng đã ở trạng thái `canceled` (hoặc `delivered`).                                                                                                                                                                                             |
| **Actual**             | Nút "Đánh dấu Đã giao" hiển thị đối với đơn hàng `canceled`. Frontend cho phép thực hiện thao tác sai logic nghiệp vụ.                                                                                                                                                                                                                   |

### Screenshot

> _Chèn ảnh chụp màn hình tại đây (VD: Ảnh chụp giao diện Admin hiển thị đơn hàng Đã hủy nhưng vẫn có nút "Đánh dấu Đã giao")._

---

## Bảng tổng hợp Bug FR-10

| Bug ID      | Severity | Component | Test Case phát hiện     | Tóm tắt                                                                        |
| ----------- | -------- | --------- | ----------------------- | ------------------------------------------------------------------------------ |
| BUG-FR10-01 | High     | User UI   | DT_FR10_04, BVA_FR10_02 | Nút "Hủy đơn" vẫn hiển thị và cho phép hủy khi đơn hàng đang giao (`shipping`) |
| BUG-FR10-02 | Critical | Admin UI  | DT_FR10_13              | Hiển thị nút "Đánh dấu Đã giao" cho các đơn hàng đã hủy (`canceled`)           |

---

## Truy xuất Test Case ↔ Bug (Traceability Matrix - FR-10)

| Test Case ID | Technique | Bug(s) phát hiện |
| ------------ | --------- | ---------------- |
| DT_FR10_04   | Domain    | BUG-FR10-01      |
| DT_FR10_13   | Domain    | BUG-FR10-02      |
| BVA_FR10_02  | BVA       | BUG-FR10-01      |
