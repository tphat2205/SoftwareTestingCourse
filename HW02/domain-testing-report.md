# Domain Testing Report

## Feature: FR-06 - Xem chi tiết sản phẩm

# Step-by-Step Explanation

## Step 1 – Input & Output Identification

### Business Objective
Cho phép người dùng xem thông tin chi tiết của một sản phẩm, đồng thời chọn số lượng để thêm sản phẩm đó vào giỏ hàng.

### Inputs
| Input | Type | Constraints |
| ----- | ---- | ----------- |
| `Product ID` | URL Parameter | Phải là một ID hợp lệ và tồn tại trong hệ thống cơ sở dữ liệu. |
| `Số lượng` (Quantity) | Integer (UI Input) | Chỉ nhận số nguyên dương, tối thiểu là 1 (`Số lượng >= 1`). |

### Outputs
| Output | Description |
| ------ | ----------- |
| `Thông tin chi tiết sản phẩm` | Hiển thị đầy đủ: Ảnh lớn, Tên, Giá, Mô tả, Danh mục của sản phẩm. |
| `Thông báo lỗi (Không tìm thấy)` | Hiển thị thông báo khi `Product ID` không tồn tại (VD: "Sản phẩm không tồn tại (Lỗi trắng trang do data rỗng)"). |
| `Phản hồi thêm vào giỏ hàng` | Hiển thị phản hồi trực quan (toast notification hoặc nút chuyển thành "Đã thêm") sau khi bấm nút "Thêm vào giỏ hàng". |

---

## Step 2 – Equivalence Classes

### Condition 1
`Product ID` tồn tại trong hệ thống.

### Interpretation
Mã sản phẩm (ID) được truyền vào thông qua URL (ví dụ: `/product/1`) phải tương ứng với một sản phẩm thực tế trong cơ sở dữ liệu để có thể truy xuất và hiển thị thông tin.

### Valid Equivalence Classes
| EC ID | Description |
| ----- | ----------- |
| EC1 | `Product ID` tồn tại trong CSDL |

### Invalid Equivalence Classes
| EC ID | Description |
| ----- | ----------- |
| EC2 | `Product ID` không tồn tại trong CSDL (hoặc mã không hợp lệ) |

---

### Condition 2
`Số lượng` phải có giá trị tối thiểu là 1 (`Số lượng >= 1`).

### Interpretation
Số lượng sản phẩm mà người dùng muốn thêm vào giỏ hàng không được nhỏ hơn 1. *(Áp dụng Rule 1: Range Condition)*

### Valid Equivalence Classes
| EC ID | Description |
| ----- | ----------- |
| EC3 | `Số lượng` >= 1 |

### Invalid Equivalence Classes
| EC ID | Description |
| ----- | ----------- |
| EC4 | `Số lượng` < 1 (VD: 0, số âm) |

---

### Condition 3
`Số lượng` là số nguyên dương.

### Interpretation
Ô nhập số lượng không cho phép người dùng nhập các ký tự không phải là số (chữ cái, ký tự đặc biệt) hoặc số thập phân. *(Áp dụng Rule 3: Must-Be Condition)*

### Valid Equivalence Classes
| EC ID | Description |
| ----- | ----------- |
| EC5 | `Số lượng` là số nguyên |

### Invalid Equivalence Classes
| EC ID | Description |
| ----- | ----------- |
| EC6 | `Số lượng` là số thập phân (VD: 1.5) |
| EC7 | `Số lượng` chứa ký tự không phải số (chữ cái, ký tự đặc biệt) |

---

## Step 3 – Representative Test Cases

Các giá trị đại diện được lựa chọn nhằm tối đa hóa độ bao phủ các lớp tương đương hợp lệ trong cùng một test case, và kiểm tra độc lập (isolate) từng lớp tương đương không hợp lệ theo đúng quy tắc Domain Testing.

| Test Case ID | Technique | Partitions Covered | Inputs | Expected Outcome |
| ------------ | --------- | ------------------ | ------ | ---------------- |
| DT_FR06_01 | Domain | EC1, EC3, EC5 | `Product ID` = Tồn tại (VD: 1)<br>`Số lượng` = 2 | Trạng thái trang hiển thị đầy đủ chi tiết sản phẩm. Khi bấm "Thêm vào giỏ hàng", hệ thống thêm 2 sản phẩm vào giỏ và hiển thị phản hồi trực quan "Đã thêm". |
| DT_FR06_02 | Domain | EC2 | `Product ID` = Không tồn tại (VD: 99999)<br>`Số lượng` = N/A | Hệ thống hiển thị thông báo "Sản phẩm không tồn tại", không hiển thị chi tiết sản phẩm. |
| DT_FR06_03 | Domain | EC4 | `Product ID` = Tồn tại (VD: 1)<br>`Số lượng` = 0 | Hệ thống chặn không cho phép nhập số 0 (hoặc báo lỗi "Số lượng tối thiểu là 1"), không thực hiện thêm vào giỏ hàng. |
| DT_FR06_04 | Domain | EC6 | `Product ID` = Tồn tại (VD: 1)<br>`Số lượng` = 1.5 | Hệ thống chặn không cho phép nhập số thập phân, không thực hiện thêm vào giỏ hàng. |
| DT_FR06_05 | Domain | EC7 | `Product ID` = Tồn tại (VD: 1)<br>`Số lượng` = "abc" | Hệ thống chặn không cho phép nhập chữ cái/ký tự đặc biệt vào ô số lượng. |
