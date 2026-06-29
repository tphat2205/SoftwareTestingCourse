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
