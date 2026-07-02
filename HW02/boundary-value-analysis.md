# Boundary Value Analysis Report

## Feature: FR-06 - Xem chi tiết sản phẩm

# Step 4 – Boundary Value Analysis

### Ordered Partition: `Số lượng` (Quantity)

Đại lượng duy nhất có miền giá trị cần phân tích biên trong FR-06 là `Số lượng`.
Theo điều kiện (Condition) đã xác định ở Step 2, `Số lượng` phải là một số nguyên có giá trị từ 1 trở lên (`Số lượng >= 1`).

- **Valid Partition**: `[1, +∞)` (Từ 1 trở lên)
- **Invalid Partition**: `(-∞, 0]` (Từ 0 trở xuống)

| Partition       | LB  | LB−1 | LB+1 | UB−1 | UB  | UB+1 |
| --------------- | --- | ---- | ---- | ---- | --- | ---- |
| `Số lượng` >= 1 | 1   | 0    | 2    | N/A  | N/A | N/A  |

_(Ghi chú: Yêu cầu chức năng FR-06 không quy định giới hạn trên (Upper Boundary) cho số lượng, do đó các giá trị liên quan đến UB được đánh dấu N/A.)_

**UI Limits (Giới hạn của giao diện người dùng hiện tại):**

- **UI Minimum**: Không có. (Thẻ `<input type="number">` trong `ProductDetail.jsx` hiện không khai báo thuộc tính `min="1"`).
- **UI Maximum**: Không có.

---

### Giải thích các điểm biên (Boundary Explanation)

- **LB (1)**:
  - **Vì sao là biên:** Là giá trị nhỏ nhất của phân vùng hợp lệ.
  - **Thuộc phân vùng:** Valid (Hợp lệ).
  - **Lỗi dự kiến phát hiện:** Dùng để phát hiện lỗi off-by-one nếu hệ thống (vô tình) sử dụng điều kiện `Số lượng > 1` thay vì `>= 1`, dẫn đến việc từ chối giá trị 1 hợp lệ.

- **LB−1 (0)**:
  - **Vì sao là biên:** Là giá trị lớn nhất của phân vùng không hợp lệ nằm ngay sát biên.
  - **Thuộc phân vùng:** Invalid (Không hợp lệ).
  - **Lỗi dự kiến phát hiện:** Phát hiện lỗi off-by-one nếu hệ thống sử dụng điều kiện `Số lượng >= 0`, khiến cho người dùng có thể đặt mua thành công 0 sản phẩm.

- **LB+1 (2)**:
  - **Vì sao là biên:** Là giá trị nằm kề bên trên biên dưới (LB).
  - **Thuộc phân vùng:** Valid (Hợp lệ).
  - **Lỗi dự kiến phát hiện:** Xác nhận rằng các giá trị hợp lệ lớn hơn mức tối thiểu vẫn hoạt động đúng như mong đợi.

---

### Boundary Value Analysis Test Cases

Dưới đây là các Test Case tập trung kiểm thử tại các điểm biên đã xác định.

| Test Case ID | Technique | Boundary Covered | Inputs                                   | Expected Outcome                                                                                             |
| ------------ | --------- | ---------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| BVA_FR06_01  | BVA       | LB (1)           | `Product ID` = Tồn tại<br>`Số lượng` = 1 | Hệ thống chấp nhận giá trị, thêm 1 sản phẩm vào giỏ hàng và hiển thị phản hồi "Đã thêm".                     |
| BVA_FR06_02  | BVA       | LB−1 (0)         | `Product ID` = Tồn tại<br>`Số lượng` = 0 | Hệ thống báo lỗi "Số lượng tối thiểu là 1" (hoặc không cho phép bấm thêm), không thêm sản phẩm vào giỏ hàng. |
| BVA_FR06_03  | BVA       | LB+1 (2)         | `Product ID` = Tồn tại<br>`Số lượng` = 2 | Hệ thống chấp nhận giá trị, thêm 2 sản phẩm vào giỏ hàng và hiển thị phản hồi "Đã thêm".                     |

---

## AI Gap Analysis (BVA - FR-06)

Qua quá trình rà soát, phát hiện thiếu sót (gap) của AI tool do giới hạn mô hình (LLM limitations) và prompt:

- **Ảo giác về giá trị biên:** AI tự động sinh test case `Số lượng = -1` và gọi là biên UI, dù trước đó đã xác định UI không có thuộc tính `min`.
- **Lý do (Why):** AI bị "ảo giác" (hallucination) dựa trên pattern phổ biến trên mạng (thấy form nhập số là tự động test số âm) dẫn đến việc nhầm lẫn giữa một giá trị ngẫu nhiên (thuộc Domain/EP) với một giá trị biên thực sự (thuộc BVA) khi form không có ràng buộc UI cụ thể.

---

## Feature: FR-10 - Order state machine

# Step 4 – Boundary Value Analysis

### Ordered Partition 1: Trình tự trạng thái đơn hàng (Order State Sequence)

Trong FR-10, `Trạng thái hiện tại` của một đơn hàng là một tập hợp các giá trị rời rạc. Tuy nhiên, xét về mặt logic nghiệp vụ, vòng đời đơn hàng là một **chuỗi có tính thứ tự (Sequential data)** tiến triển theo thời gian:
`pending` -> `confirmed` -> `shipping` -> `delivered`.
Theo định nghĩa của ISTQB, ta có thể áp dụng BVA cho dữ liệu chuỗi tuần tự này đối với tính năng Hủy đơn hàng của User (ràng buộc: chỉ được hủy khi đơn hàng "chưa giao").

- **Valid Partition (Được phép hủy)**: `[pending, confirmed]`
- **Invalid Partition (Không được phép hủy)**: `[shipping, delivered]`

| Partition          | LB        | LB−1 | LB+1        | UB−1      | UB          | UB+1       |
| ------------------ | --------- | ---- | ----------- | --------- | ----------- | ---------- |
| Trạng thái Hủy đơn | `pending` | N/A  | `confirmed` | `pending` | `confirmed` | `shipping` |

_(Ghi chú: Vì chuỗi trạng thái chỉ có 4 bước thứ tự tuyến tính chính, các giá trị LB+1/UB và UB-1/LB bị trùng lặp. LB-1 là N/A vì không có trạng thái hợp lệ nào trước `pending`)._

**Giải thích các điểm biên:**

- **LB (`pending`)**: Trạng thái đầu tiên của đơn hàng (nằm trong vùng Valid). Đảm bảo đơn hàng vừa tạo xong có thể hủy ngay lập tức.
- **UB (`confirmed`)**: Trạng thái cuối cùng của đơn hàng còn nằm trong vùng Valid (ngay trước khi bắt đầu giao). Đây là điểm biên quan trọng nhất để đảm bảo hệ thống không bị lỗi off-by-one (ví dụ vô tình chặn hủy sớm ở trạng thái confirmed).
- **UB+1 (`shipping`)**: Trạng thái đầu tiên ngay sau khi vượt qua biên hợp lệ (nằm trong vùng Invalid). Phát hiện lỗi hệ thống không chặn kịp thời (cho phép hủy khi đơn đã bắt đầu giao).

### Boundary Value Analysis Test Cases

Dưới đây là các Test Case tập trung kiểm thử tại các điểm biên đã xác định.

| Test Case ID | Technique | Boundary Covered             | Inputs                                                                  | Expected Outcome                                    |
| ------------ | --------- | ---------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------- |
| BVA_FR10_01  | BVA       | Trạng thái UB (`confirmed`)  | API: User Hủy đơn<br>`Order ID` = Tồn tại<br>`Trạng thái` = `confirmed` | Hủy đơn thành công, chuyển sang `canceled`.         |
| BVA_FR10_02  | BVA       | Trạng thái UB+1 (`shipping`) | API: User Hủy đơn<br>`Order ID` = Tồn tại<br>`Trạng thái` = `shipping`  | Hệ thống báo lỗi: Không thể hủy đơn hàng đang giao. |
| BVA_FR10_03  | BVA       | Trạng thái LB (`pending`)    | API: User Hủy đơn<br>`Order ID` = Tồn tại<br>`Trạng thái` = `pending`   | Hủy đơn thành công, chuyển sang `canceled`.         |

---

## AI Gap Analysis (BVA - FR-10)

Qua quá trình rà soát, phát hiện thiếu sót (gap) của AI tool do giới hạn mô hình (LLM limitations) và prompt:

- **Áp dụng sai BVA cho mã định danh (Identifier):** AI đã nhầm lẫn khi tạo ra phân vùng BVA cho biến `Order ID` (test giá trị 0 và 1) dù đây chỉ là một Database Identifier.
- **Lý do (Why):** AI bị hạn chế trong khả năng nhận thức ngữ nghĩa nghiệp vụ của dữ liệu (Semantic understanding). Khi thấy `Order ID` là một số nguyên có khả năng tự tăng, AI lập tức áp dụng logic toán học (BVA) một cách máy móc, mà không phân biệt được sự khác nhau giữa dữ liệu định danh (Nominal) và dữ liệu có thứ tự mang ý nghĩa nghiệp vụ (Ordinal/Continuous).

---

## Feature: FR-15 - Product management (CRUD)

# Step 4 – Boundary Value Analysis

Rút kinh nghiệm từ phân tích FR-10, các trường định danh (Identifier) như `Product ID` và `category_id` thuộc kiểu dữ liệu danh nghĩa (Nominal), do đó KHÔNG áp dụng BVA. Ta chỉ áp dụng BVA cho các biến dữ liệu có tính thứ tự (Ordinal/Continuous) trong FR-15 là `price` (giá sản phẩm) và độ dài của `name` (tên sản phẩm).

### Ordered Partition 1: `price` (Giá sản phẩm)

Giá sản phẩm được yêu cầu là số nguyên không âm (`price` >= 0).

- **Valid Partition**: `[0, +∞)`
- **Invalid Partition**: `(-∞, -1]`

| Partition    | LB  | LB−1 | LB+1 | UB−1 | UB  | UB+1 |
| ------------ | --- | ---- | ---- | ---- | --- | ---- |
| `price` >= 0 | 0   | -1   | 1    | N/A  | N/A | N/A  |

**Giải thích các điểm biên:**

- **LB (0)**: Giá trị nhỏ nhất của phân vùng hợp lệ. Đảm bảo hệ thống cho phép tạo sản phẩm miễn phí (giá 0 đồng) và phát hiện lỗi nếu code vô tình sử dụng điều kiện `price > 0`.
- **LB-1 (-1)**: Giá trị số nguyên lớn nhất của phân vùng không hợp lệ. Phát hiện lỗi nếu hệ thống không chặn được số âm.
- **LB+1 (1)**: Giá trị nằm ngay trên biên hợp lệ (kiểm tra vùng trong an toàn).

### Ordered Partition 2: Độ dài của `name` (Tên sản phẩm)

Tên sản phẩm không được phép để rỗng, điều này tương đương với việc độ dài chuỗi (string length) phải >= 1.

- **Valid Partition**: `[1, +∞)` (ký tự)
- **Invalid Partition**: `0` (ký tự - tương đương chuỗi rỗng `""`)

| Partition          | LB  | LB−1 | LB+1 | UB−1 | UB  | UB+1 |
| ------------------ | --- | ---- | ---- | ---- | --- | ---- |
| Độ dài `name` >= 1 | 1   | 0    | 2    | N/A  | N/A | N/A  |

**Giải thích các điểm biên:**

- **LB (1)**: Tên sản phẩm cực ngắn (chỉ 1 ký tự). Là điểm biên hợp lệ nhỏ nhất.
- **LB-1 (0)**: Tên sản phẩm rỗng (0 ký tự). Là điểm biên không hợp lệ ngay sát dưới.

---

### Boundary Value Analysis Test Cases

Dưới đây là các Test Case tập trung kiểm tra ranh giới của `price` và độ dài `name`.

| Test Case ID | Technique | Boundary Covered          | Inputs                                                                                    | Expected Outcome                       |
| ------------ | --------- | ------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------- |
| BVA_FR15_01  | BVA       | Giá trị `price` LB (0)    | API: Thêm sản phẩm<br>`name` = "SP"<br>`price` = 0<br>`category_id` = Tồn tại             | Thành công, tạo sản phẩm với giá 0.    |
| BVA_FR15_02  | BVA       | Giá trị `price` LB-1 (-1) | API: Thêm sản phẩm<br>`name` = "SP"<br>`price` = -1<br>`category_id` = Tồn tại            | Báo lỗi: Giá sản phẩm không được âm.   |
| BVA_FR15_03  | BVA       | Giá trị `price` LB+1 (1)  | API: Thêm sản phẩm<br>`name` = "SP"<br>`price` = 1<br>`category_id` = Tồn tại             | Thành công, tạo sản phẩm với giá 1.    |
| BVA_FR15_04  | BVA       | Độ dài `name` LB (1)      | API: Thêm sản phẩm<br>`name` = "A" (1 ký tự)<br>`price` = 1000<br>`category_id` = Tồn tại | Thành công, tạo sản phẩm với tên "A".  |
| BVA_FR15_05  | BVA       | Độ dài `name` LB-1 (0)    | API: Thêm sản phẩm<br>`name` = "" (rỗng)<br>`price` = 1000<br>`category_id` = Tồn tại     | Báo lỗi: Tên sản phẩm không được rỗng. |
