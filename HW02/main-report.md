# HW02 Main Report

**CSC13003 – Software Testing**

**Domain Testing Report · Boundary Value Analysis Report**

## Student Information

| Field | Value |
| :---- | :---- |
| **Student name (printed):** | ĐOÀN THÀNH PHÁT |
| **Student ID:** | 23127241 |
| **Class / Cohort:** | 23KTPM2 |
| **Assignment ID:** | HW#02 |
| **Assignment date:** | July 07, 2026 |
| **Course:** | CSC13003 – Software Testing |
| **Instructor:** | Lâm Quang Vũ Hồ Tuấn Thanh Trương Phước Lộc |

## Report Overview

This report contains the domain testing analysis and boundary value analysis for the selected features in HW02. The structure is organized by feature so each test design step is easy to trace from input conditions to representative test cases.

## Domain Testing Report

## Feature: FR-06 - Xem chi tiết sản phẩm

# Step-by-Step Explanation

## Step 1 – Input & Output Identification

### Business Objective

Cho phép người dùng xem thông tin chi tiết của một sản phẩm, đồng thời chọn số lượng để thêm sản phẩm đó vào giỏ hàng.

### Inputs

| Input                 | Type               | Constraints                                                    |
| --------------------- | ------------------ | -------------------------------------------------------------- |
| `Product ID`          | URL Parameter      | Phải là một ID hợp lệ và tồn tại trong hệ thống cơ sở dữ liệu. |
| `Số lượng` (Quantity) | Integer (UI Input) | Chỉ nhận số nguyên dương, tối thiểu là 1 (`Số lượng >= 1`).    |

### Outputs

| Output                           | Description                                                                                                           |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `Thông tin chi tiết sản phẩm`    | Hiển thị đầy đủ: Ảnh lớn, Tên, Giá, Mô tả, Danh mục của sản phẩm.                                                     |
| `Thông báo lỗi (Không tìm thấy)` | Hiển thị thông báo khi `Product ID` không tồn tại (VD: "Sản phẩm không tồn tại (Lỗi trắng trang do data rỗng)").      |
| `Phản hồi thêm vào giỏ hàng`     | Hiển thị phản hồi trực quan (toast notification hoặc nút chuyển thành "Đã thêm") sau khi bấm nút "Thêm vào giỏ hàng". |

---

## Step 2 – Equivalence Classes

### Condition 1

`Product ID` tồn tại trong hệ thống.

### Interpretation

Mã sản phẩm (ID) được truyền vào thông qua URL (ví dụ: `/product/1`) phải tương ứng với một sản phẩm thực tế trong cơ sở dữ liệu để có thể truy xuất và hiển thị thông tin.

### Valid Equivalence Classes

| EC ID | Description                     |
| ----- | ------------------------------- |
| EC1   | `Product ID` tồn tại trong CSDL |

### Invalid Equivalence Classes

| EC ID | Description                                                  |
| ----- | ------------------------------------------------------------ |
| EC2   | `Product ID` không tồn tại trong CSDL (hoặc mã không hợp lệ) |

---

### Condition 2

`Số lượng` phải có giá trị tối thiểu là 1 (`Số lượng >= 1`).

### Interpretation

Số lượng sản phẩm mà người dùng muốn thêm vào giỏ hàng không được nhỏ hơn 1. _(Áp dụng Rule 1: Range Condition)_

### Valid Equivalence Classes

| EC ID | Description     |
| ----- | --------------- |
| EC3   | `Số lượng` >= 1 |

### Invalid Equivalence Classes

| EC ID | Description                   |
| ----- | ----------------------------- |
| EC4   | `Số lượng` < 1 (VD: 0, số âm) |

---

### Condition 3

`Số lượng` là số nguyên dương.

### Interpretation

Ô nhập số lượng không cho phép người dùng nhập các ký tự không phải là số (chữ cái, ký tự đặc biệt) hoặc số thập phân. _(Áp dụng Rule 3: Must-Be Condition)_

### Valid Equivalence Classes

| EC ID | Description             |
| ----- | ----------------------- |
| EC5   | `Số lượng` là số nguyên |

### Invalid Equivalence Classes

| EC ID | Description                                                   |
| ----- | ------------------------------------------------------------- |
| EC6   | `Số lượng` là số thập phân (VD: 1.5)                          |
| EC7   | `Số lượng` chứa ký tự không phải số (chữ cái, ký tự đặc biệt) |

---

## Step 3 – Representative Test Cases

Các giá trị đại diện được lựa chọn nhằm tối đa hóa độ bao phủ các lớp tương đương hợp lệ trong cùng một test case, và kiểm tra độc lập (isolate) từng lớp tương đương không hợp lệ theo đúng quy tắc Domain Testing.

| Test Case ID | Technique | Partitions Covered | Inputs                                                       | Expected Outcome                                                                                                                                            |
| ------------ | --------- | ------------------ | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DT_FR06_01   | Domain    | EC1, EC3, EC5      | `Product ID` = Tồn tại (VD: 1)<br>`Số lượng` = 2             | Trạng thái trang hiển thị đầy đủ chi tiết sản phẩm. Khi bấm "Thêm vào giỏ hàng", hệ thống thêm 2 sản phẩm vào giỏ và hiển thị phản hồi trực quan "Đã thêm". |
| DT_FR06_02   | Domain    | EC2                | `Product ID` = Không tồn tại (VD: 99999)<br>`Số lượng` = N/A | Hệ thống hiển thị thông báo "Sản phẩm không tồn tại", không hiển thị chi tiết sản phẩm.                                                                     |
| DT_FR06_03   | Domain    | EC1, EC4, EC5      | `Product ID` = Tồn tại (VD: 1)<br>`Số lượng` = 0             | Hệ thống chặn không cho phép nhập số 0 (hoặc báo lỗi "Số lượng tối thiểu là 1"), không thực hiện thêm vào giỏ hàng.                                         |
| DT_FR06_04   | Domain    | EC1, EC3, EC6      | `Product ID` = Tồn tại (VD: 1)<br>`Số lượng` = 1.5           | Hệ thống chặn không cho phép nhập số thập phân, không thực hiện thêm vào giỏ hàng.                                                                          |
| DT_FR06_05   | Domain    | EC1, EC7           | `Product ID` = Tồn tại (VD: 1)<br>`Số lượng` = "abc"         | Hệ thống chặn không cho phép nhập chữ cái/ký tự đặc biệt vào ô số lượng.                                                                                    |

---

## AI Gap Analysis (Domain Testing - FR-06)

Qua quá trình rà soát, phát hiện thiếu sót (gap) của AI tool do giới hạn mô hình (LLM limitations) và prompt:

- **Bỏ quên nguyên tắc cô lập (Isolation):** AI thiết kế đúng test case (1 invalid kết hợp nhiều valid) nhưng quên ghi nhận các Valid EC vào cột `Partitions Covered` (chỉ ghi mỗi Invalid EC).
- **Lý do (Why):** LLM thường thiếu tính chặt chẽ về truy xuất nguồn gốc (traceability) của ISTQB và chỉ tập trung vào mục tiêu bắt lỗi chính. Prompt cũng chưa ép buộc cụ thể việc này.

---

## Feature: FR-10 - Order state machine

# Step-by-Step Explanation

## Step 1 – Input & Output Identification

### Business Objective

Quản lý vòng đời (state machine) của một đơn hàng, bao gồm việc chuyển đổi giữa các trạng thái (`pending`, `confirmed`, `shipping`, `delivered`, `canceled`) dựa trên các tác vụ từ người dùng (hủy đơn) và quản trị viên (cập nhật trạng thái).

### Inputs

| Input                    | Type              | Constraints                                                                                                                                                  |
| ------------------------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Mã đơn hàng (Order ID)` | URL Parameter     | Phải tồn tại trong cơ sở dữ liệu.                                                                                                                            |
| `Trạng thái hiện tại`    | State (DB)        | Thuộc tập hợp: `pending`, `confirmed`, `shipping`, `delivered`, `canceled`. Đối với User hủy đơn, chỉ được thực hiện khi chưa giao (`pending`, `confirmed`). |
| `Trạng thái mới`         | String (API Body) | (Dành cho Admin) Thuộc tập hợp: `pending`, `confirmed`, `shipping`, `delivered`, `canceled`.                                                                 |

### Outputs

| Output                                    | Description                                                                                                    |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `Cập nhật thành công`                     | Hệ thống lưu lại trạng thái mới của đơn hàng và trả về mã 200 OK.                                              |
| `Thông báo lỗi (Không tìm thấy)`          | Hệ thống trả về lỗi khi `Order ID` không tồn tại.                                                              |
| `Thông báo lỗi (Trạng thái không hợp lệ)` | Hệ thống trả về lỗi khi User cố hủy đơn hàng đã giao hoặc khi Admin cập nhật một trạng thái không được hỗ trợ. |

---

## Step 2 – Equivalence Classes

### Condition 1

`Mã đơn hàng (Order ID)` tồn tại trong hệ thống.

### Interpretation

Mã đơn hàng được truyền vào URL (ví dụ: `/api/orders/1/cancel` hoặc `/api/admin/orders/1/status`) phải tương ứng với một đơn hàng thực tế trong cơ sở dữ liệu.

### Valid Equivalence Classes

| EC ID | Description                      |
| ----- | -------------------------------- |
| EC1   | `Mã đơn hàng` tồn tại trong CSDL |

### Invalid Equivalence Classes

| EC ID | Description                            |
| ----- | -------------------------------------- |
| EC2   | `Mã đơn hàng` không tồn tại trong CSDL |

---

### Condition 2

Hành động Hủy đơn hàng của User chỉ được thực hiện khi đơn hàng "chưa giao".

### Interpretation

Khi User gọi API hủy đơn (`PUT /api/orders/:id/cancel`), trạng thái hiện tại của đơn hàng phải là trạng thái trước khi giao hàng (chưa giao). Áp dụng Rule 2 (Set of Values), ta xét các giá trị trạng thái hiện tại đối với hành động này.

### Valid Equivalence Classes

| EC ID | Description                                        |
| ----- | -------------------------------------------------- |
| EC3   | `Trạng thái hiện tại` là `pending` (Chờ xử lý)     |
| EC4   | `Trạng thái hiện tại` là `confirmed` (Đã xác nhận) |

### Invalid Equivalence Classes

| EC ID | Description                                           |
| ----- | ----------------------------------------------------- |
| EC5   | `Trạng thái hiện tại` là `shipping` (Đang giao)       |
| EC6   | `Trạng thái hiện tại` là `delivered` (Đã giao)        |
| EC7   | `Trạng thái hiện tại` là `canceled` (Đã hủy trước đó) |

---

### Condition 3

Hành động Cập nhật trạng thái của Admin nhận giá trị `Trạng thái mới` hợp lệ.

### Interpretation

Khi Admin gọi API cập nhật trạng thái (`PUT /api/admin/orders/:id/status`), giá trị `status` truyền trong Body phải nằm trong danh sách các trạng thái được hệ thống hỗ trợ. Áp dụng Rule 2 (Set of Values).

### Valid Equivalence Classes

| EC ID | Description                     |
| ----- | ------------------------------- |
| EC8   | `Trạng thái mới` là `pending`   |
| EC9   | `Trạng thái mới` là `confirmed` |
| EC10  | `Trạng thái mới` là `shipping`  |
| EC11  | `Trạng thái mới` là `delivered` |
| EC12  | `Trạng thái mới` là `canceled`  |

### Invalid Equivalence Classes

| EC ID | Description                                                                              |
| ----- | ---------------------------------------------------------------------------------------- |
| EC13  | `Trạng thái mới` không thuộc danh sách hỗ trợ (VD: `returned`, `processing`, chuỗi rỗng) |

---

## Step 3 – Representative Test Cases

Các giá trị đại diện được lựa chọn nhằm tối đa hóa độ bao phủ các lớp hợp lệ trong cùng một test case, và kiểm tra độc lập từng lớp không hợp lệ theo quy tắc Domain Testing.

| Test Case ID | Technique | Partitions Covered | Inputs                                                                                                                | Expected Outcome                                                 |
| ------------ | --------- | ------------------ | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| DT_FR10_01   | Domain    | EC1, EC3           | API: User Hủy đơn<br>`Mã đơn hàng` = Tồn tại<br>`Trạng thái hiện tại` = `pending`                                     | Đơn hàng được hủy thành công, trạng thái chuyển sang `canceled`. |
| DT_FR10_02   | Domain    | EC1, EC4           | API: User Hủy đơn<br>`Mã đơn hàng` = Tồn tại<br>`Trạng thái hiện tại` = `confirmed`                                   | Đơn hàng được hủy thành công, trạng thái chuyển sang `canceled`. |
| DT_FR10_03   | Domain    | EC2                | API: User Hủy đơn<br>`Mã đơn hàng` = Không tồn tại<br>`Trạng thái hiện tại` = N/A                                     | Báo lỗi đơn hàng không tồn tại.                                  |
| DT_FR10_04   | Domain    | EC1, EC5           | API: User Hủy đơn<br>`Mã đơn hàng` = Tồn tại<br>`Trạng thái hiện tại` = `shipping`                                    | Báo lỗi không thể hủy đơn hàng đang giao. Trạng thái giữ nguyên. |
| DT_FR10_05   | Domain    | EC1, EC6           | API: User Hủy đơn<br>`Mã đơn hàng` = Tồn tại<br>`Trạng thái hiện tại` = `delivered`                                   | Báo lỗi không thể hủy đơn hàng đã giao. Trạng thái giữ nguyên.   |
| DT_FR10_06   | Domain    | EC1, EC7           | API: User Hủy đơn<br>`Mã đơn hàng` = Tồn tại<br>`Trạng thái hiện tại` = `canceled`                                    | Báo lỗi đơn hàng đã được hủy trước đó.                           |
| DT_FR10_07   | Domain    | EC1, EC3, EC8      | API: Admin Cập nhật<br>`Mã đơn hàng` = Tồn tại<br>`Trạng thái hiện tại` = `pending`<br>`Trạng thái mới` = `pending`   | Đơn hàng được cập nhật trạng thái thành `pending` thành công.    |
| DT_FR10_08   | Domain    | EC1, EC3, EC9      | API: Admin Cập nhật<br>`Mã đơn hàng` = Tồn tại<br>`Trạng thái hiện tại` = `pending`<br>`Trạng thái mới` = `confirmed` | Đơn hàng được cập nhật trạng thái thành `confirmed` thành công.  |
| DT_FR10_09   | Domain    | EC1, EC3, EC10     | API: Admin Cập nhật<br>`Mã đơn hàng` = Tồn tại<br>`Trạng thái hiện tại` = `pending`<br>`Trạng thái mới` = `shipping`  | Đơn hàng được cập nhật trạng thái thành `shipping` thành công.   |
| DT_FR10_10   | Domain    | EC1, EC3, EC11     | API: Admin Cập nhật<br>`Mã đơn hàng` = Tồn tại<br>`Trạng thái hiện tại` = `pending`<br>`Trạng thái mới` = `delivered` | Đơn hàng được cập nhật trạng thái thành `delivered` thành công.  |
| DT_FR10_11   | Domain    | EC1, EC3, EC12     | API: Admin Cập nhật<br>`Mã đơn hàng` = Tồn tại<br>`Trạng thái hiện tại` = `pending`<br>`Trạng thái mới` = `canceled`  | Đơn hàng được cập nhật trạng thái thành `canceled` thành công.   |
| DT_FR10_12   | Domain    | EC2, EC10          | API: Admin Cập nhật<br>`Mã đơn hàng` = Không tồn tại<br>`Trạng thái hiện tại` = N/A<br>`Trạng thái mới` = `shipping`  | Báo lỗi đơn hàng không tồn tại.                                  |
| DT_FR10_13   | Domain    | EC1, EC3, EC13     | API: Admin Cập nhật<br>`Mã đơn hàng` = Tồn tại<br>`Trạng thái hiện tại` = `pending`<br>`Trạng thái mới` = `returned`  | Báo lỗi trạng thái không hợp lệ.                                 |

## AI Gap Analysis (Domain Testing - FR-10)

Qua quá trình rà soát, phát hiện thiếu sót (gap) của AI tool do giới hạn mô hình (LLM limitations) và prompt:

- **Khuyết thiếu trạng thái DB (Pre-condition):** Ở các test case Admin cập nhật trạng thái, AI đã bỏ quên không thiết lập `Trạng thái hiện tại` của đơn hàng (dù đây là một Input bắt buộc để tái tạo test case một cách thực tế).
- **Thiếu sót ghi nhận Valid EC:** Ở `DT_FR10_12`, AI lặp lại lỗi cũ khi chỉ ghi nhận mỗi `EC2` (Invalid) mà quên không ghi `EC10` (Valid).
- **Lý do (Why):** LLM thường chỉ tập trung vào "mục tiêu kiểm thử chính" (core logic/API Body) mà bỏ quên khía cạnh hành chính và quy trình thực hành thực tế (setup DB state trước khi gọi API) để đảm bảo tính khả lặp (reproducibility). Nếu prompt không đưa ra chỉ thị thật khắt khe (strict rule), AI sẽ dễ dãi bỏ qua các ràng buộc "Isolation" của ISTQB.

---

## Feature: FR-15 - Product management (CRUD)

# Step-by-Step Explanation

## Step 1 – Input & Output Identification

### Business Objective

Cho phép Quản trị viên (Admin) thực hiện các thao tác quản lý danh mục sản phẩm bao gồm: Thêm mới (Create), Xem (Read), Cập nhật (Update) và Xóa (Delete) sản phẩm.

### Inputs

Dưới đây là các input chính khi Admin thực hiện Thêm mới (`POST /api/products`) hoặc Cập nhật (`PUT /api/products/:id`):

| Input         | Type               | Constraints                                                        |
| ------------- | ------------------ | ------------------------------------------------------------------ |
| `Product ID`  | URL Parameter      | (Chỉ áp dụng khi Cập nhật/Xóa). Phải là một ID tồn tại trong CSDL. |
| `name`        | String (API Body)  | Tên sản phẩm, bắt buộc phải có và không được rỗng.                 |
| `price`       | Integer (API Body) | Giá sản phẩm, bắt buộc, phải là số nguyên >= 0.                    |
| `category_id` | Integer (API Body) | ID danh mục sản phẩm, bắt buộc, phải tồn tại trong CSDL.           |

_(Các trường như `description` và `imageUrl` được xem là tùy chọn, không có ràng buộc chặt chẽ nào ngoài việc là kiểu chuỗi hợp lệ nên không đưa vào phân tích lớp tương đương để tập trung vào logic chính)._

### Outputs

| Output                | Description                                                                         |
| --------------------- | ----------------------------------------------------------------------------------- |
| `Thao tác thành công` | Hệ thống thực hiện thay đổi và trả về mã 200 OK / 201 Created kèm dữ liệu sản phẩm. |
| `Lỗi không tìm thấy`  | Hệ thống trả về lỗi (404) khi `Product ID` hoặc `category_id` không tồn tại.        |
| `Lỗi dữ liệu đầu vào` | Báo lỗi (400 Bad Request) khi `name` rỗng, `price` bị âm hoặc sai định dạng.        |

---

## Step 2 – Equivalence Classes

### Condition 1

`Product ID` tồn tại trong hệ thống (khi Cập nhật/Xóa).

### Interpretation

Khi thao tác trên một sản phẩm đã có, `Product ID` truyền trên URL phải hợp lệ và có trong CSDL.

### Valid Equivalence Classes

| EC ID | Description                     |
| ----- | ------------------------------- |
| EC1   | `Product ID` tồn tại trong CSDL |

### Invalid Equivalence Classes

| EC ID | Description                           |
| ----- | ------------------------------------- |
| EC2   | `Product ID` không tồn tại trong CSDL |

---

### Condition 2

`name` (Tên sản phẩm) không được rỗng.

### Interpretation

Theo Rule 3 (Must-Be Condition), tên sản phẩm phải được cung cấp và không là chuỗi rỗng.

### Valid Equivalence Classes

| EC ID | Description                               |
| ----- | ----------------------------------------- |
| EC3   | `name` chứa các ký tự hợp lệ (không rỗng) |

### Invalid Equivalence Classes

| EC ID | Description                                        |
| ----- | -------------------------------------------------- |
| EC4   | `name` bị rỗng (chuỗi rỗng `""` hoặc không truyền) |

---

### Condition 3

`price` (Giá sản phẩm) là số nguyên >= 0.

### Interpretation

Giá của sản phẩm phải là một con số hợp lệ và không được phép âm. Áp dụng Rule 1 (Range Condition) và Rule 3 (Must-Be Condition).

### Valid Equivalence Classes

| EC ID | Description                   |
| ----- | ----------------------------- |
| EC5   | `price` là số và `price` >= 0 |

### Invalid Equivalence Classes

| EC ID | Description                                            |
| ----- | ------------------------------------------------------ |
| EC6   | `price` < 0 (giá trị âm)                               |
| EC7   | `price` không phải là số (VD: chữ cái, ký tự đặc biệt) |

---

### Condition 4

`category_id` tồn tại trong hệ thống.

### Interpretation

Sản phẩm phải thuộc về một danh mục hợp lệ đã có trong hệ thống.

### Valid Equivalence Classes

| EC ID | Description                               |
| ----- | ----------------------------------------- |
| EC8   | `category_id` tồn tại trong CSDL danh mục |

### Invalid Equivalence Classes

| EC ID | Description                                     |
| ----- | ----------------------------------------------- |
| EC9   | `category_id` không tồn tại trong CSDL danh mục |

---

## Step 3 – Representative Test Cases

Dưới đây là các test case tập trung vào API Cập nhật (`PUT /api/products/:id`) để bao phủ toàn bộ các Input, vì API này chứa đầy đủ ràng buộc nhất (bao gồm cả `Product ID` trên URL và dữ liệu Body). **Lưu ý:** Dựa theo phản hồi từ AI Gap Analysis ở tính năng trước (FR-10), các Test Case này đã được thiết kế cẩn thận để ghi nhận đầy đủ các Valid EC kết hợp cùng Invalid EC nhằm đảm bảo nguyên tắc cô lập (Isolation) và tính minh bạch trong truy xuất nguồn gốc (Traceability) của ISTQB.

| Test Case ID | Technique | Partitions Covered | Inputs                                                                                                                | Expected Outcome                                   |
| ------------ | --------- | ------------------ | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| DT_FR15_01   | Domain    | EC1, EC3, EC5, EC8 | API: Cập nhật<br>`Product ID` = Tồn tại<br>`name` = "Sản phẩm A"<br>`price` = 150000<br>`category_id` = Tồn tại       | Cập nhật thành công, lưu dữ liệu mới vào hệ thống. |
| DT_FR15_02   | Domain    | EC2, EC3, EC5, EC8 | API: Cập nhật<br>`Product ID` = Không tồn tại<br>`name` = "Sản phẩm A"<br>`price` = 150000<br>`category_id` = Tồn tại | Báo lỗi không tìm thấy sản phẩm.                   |
| DT_FR15_03   | Domain    | EC1, EC4, EC5, EC8 | API: Cập nhật<br>`Product ID` = Tồn tại<br>`name` = "" (rỗng)<br>`price` = 150000<br>`category_id` = Tồn tại          | Báo lỗi yêu cầu nhập tên sản phẩm.                 |
| DT_FR15_04   | Domain    | EC1, EC3, EC6, EC8 | API: Cập nhật<br>`Product ID` = Tồn tại<br>`name` = "Sản phẩm A"<br>`price` = -50000<br>`category_id` = Tồn tại       | Báo lỗi giá sản phẩm không được âm.                |
| DT_FR15_05   | Domain    | EC1, EC3, EC7, EC8 | API: Cập nhật<br>`Product ID` = Tồn tại<br>`name` = "Sản phẩm A"<br>`price` = "abc"<br>`category_id` = Tồn tại        | Báo lỗi định dạng giá trị giá không hợp lệ.        |
| DT_FR15_06   | Domain    | EC1, EC3, EC5, EC9 | API: Cập nhật<br>`Product ID` = Tồn tại<br>`name` = "Sản phẩm A"<br>`price` = 150000<br>`category_id` = Không tồn tại | Báo lỗi danh mục sản phẩm không tồn tại.           |

---

## AI Gap Analysis (Domain Testing - FR-15)

Qua quá trình rà soát, **không phát hiện lỗi sai logic nào** trong phần Domain Testing của FR-15 do AI tạo ra. Các nguyên tắc "Cô lập lỗi" (Isolation) và "Truy xuất nguồn gốc" (Traceability) đều được tuân thủ tuyệt đối.

- **Vì sao AI làm tốt ở FR-15?** Do chất lượng của Prompt (đầu vào) đã được cải thiện. Trong Prompt sinh ra FR-15, người dùng (hoặc Context) đã chủ động nhắc lại bài học từ FR-10 (nhắc nhở AI về việc kết hợp đầy đủ Valid EC).
- **Bài học (AI Limitation):** Nếu không có sự ép buộc rõ ràng bằng Prompt (như ở FR-06 và FR-10), bản năng của LLM luôn có xu hướng bỏ qua các tiêu chuẩn hành chính (administrative standards) của ISTQB để tìm đường đi ngắn nhất (chỉ test lỗi chính). Điều này chứng minh AI cần sự điều hướng (steering) và cấp ngữ cảnh liên tục từ con người để đạt chuẩn kiểm thử chuyên nghiệp.

---

## Feature: FR-05 - Product listing and search (Mobile App)

# Step-by-Step Explanation

## Step 1 – Input & Output Identification

### Business Objective

Hiển thị danh sách sản phẩm trên màn hình thiết bị di động (Mobile App) và cho phép người dùng tìm kiếm sản phẩm theo tên.
_Lưu ý: Đối với môi trường Mobile, input tìm kiếm thường bị ảnh hưởng bởi bàn phím ảo (Virtual Keyboard), nhập liệu bằng giọng nói (Voice-to-Text), hoặc dán từ clipboard dẫn đến việc xuất hiện các ký tự đặc biệt như Emoji hoặc khoảng trắng dư thừa._

### Inputs

Dựa vào API `GET /api/products?search=keyword`:

| Input    | Type                 | Constraints                                                                                                                                                              |
| -------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `search` | String (Query param) | Tùy chọn. Dùng để lọc tên sản phẩm. Độ dài giả định hệ thống giới hạn tối đa 255 ký tự để tránh payload lớn. Cần hỗ trợ xử lý ký tự đặc biệt/Emoji phổ biến trên Mobile. |

### Outputs

| Output               | Description                                                                                        |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| `Danh sách sản phẩm` | Hệ thống trả về mảng JSON chứa các sản phẩm phù hợp. UI Mobile render danh sách (dạng list/grid).  |
| `Danh sách rỗng`     | Trả về mảng rỗng `[]` khi không có sản phẩm nào khớp. UI Mobile hiển thị "Không tìm thấy kết quả". |
| `Lỗi input`          | Báo lỗi (VD: 400 Bad Request) nếu từ khóa vượt quá độ dài tối đa cho phép.                         |

---

## Step 2 – Equivalence Classes

### Condition 1

Định dạng và loại ký tự của từ khóa tìm kiếm (`search`).

### Interpretation

Dữ liệu nhập từ bàn phím di động rất đa dạng, có thể là chữ/số bình thường, có thể bị bỏ trống (để xem toàn bộ), hoặc chứa các ký tự đặc biệt/Emoji.

### Valid Equivalence Classes

| EC ID | Description                                                               |
| ----- | ------------------------------------------------------------------------- |
| EC1   | `search` bị bỏ trống hoặc chuỗi rỗng `""`                                 |
| EC2   | `search` chứa các chữ cái/số thông thường                                 |
| EC3   | `search` chứa Emoji hoặc các ký tự đặc biệt (VD: 📱, 🎧, khoảng trắng dư) |

### Invalid Equivalence Classes

_(Về mặt định dạng string, API tìm kiếm thường không có lớp không hợp lệ cho loại ký tự vì mọi chuỗi string đều có thể đem đi tìm, kết quả chỉ là không khớp. Các payload độc hại được giả định là đã được hệ thống chống Injection xử lý an toàn nên thuộc vùng Valid về mặt API request)._

---

### Condition 2

Độ dài của từ khóa tìm kiếm.

### Interpretation

API cần có cơ chế giới hạn độ dài từ khóa (Range Condition) để tránh các truy vấn quá tải từ thiết bị. Giả định hệ thống quy định độ dài tối đa là 255 ký tự.

### Valid Equivalence Classes

| EC ID | Description                                            |
| ----- | ------------------------------------------------------ |
| EC4   | Độ dài `search` nằm trong khoảng hợp lệ (<= 255 ký tự) |

### Invalid Equivalence Classes

| EC ID | Description                                     |
| ----- | ----------------------------------------------- |
| EC5   | Độ dài `search` vượt quá giới hạn (> 255 ký tự) |

---

## Step 3 – Representative Test Cases

Các test case tập trung vào các đặc thù của input trên Mobile để đảm bảo hệ thống API không bị lỗi (crash) khi nhận dữ liệu lạ, đồng thời duy trì nguyên tắc cô lập lỗi.

| Test Case ID | Technique | Partitions Covered | Inputs                                                            | Expected Outcome                                                                                                     |
| ------------ | --------- | ------------------ | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| DT_FR05_01   | Domain    | EC1, EC4           | API: Lấy danh sách sản phẩm<br>`search` = "" (Không truyền)       | Trả về danh sách toàn bộ sản phẩm hiện có.                                                                           |
| DT_FR05_02   | Domain    | EC2, EC4           | API: Lấy danh sách sản phẩm<br>`search` = "Điện thoại"            | Trả về danh sách các sản phẩm có chứa từ "Điện thoại".                                                               |
| DT_FR05_03   | Domain    | EC3, EC4           | API: Lấy danh sách sản phẩm<br>`search` = "Tai nghe 🎧✨ "        | API xử lý an toàn Emoji và khoảng trắng dư, trả về kết quả tương ứng hoặc danh sách rỗng (không gây lỗi 500 server). |
| DT_FR05_04   | Domain    | EC2, EC5           | API: Lấy danh sách sản phẩm<br>`search` = (Chuỗi dài 300 chữ "A") | Hệ thống từ chối yêu cầu và báo lỗi 400 Bad Request do từ khóa vượt quá độ dài tối đa cho phép.                      |

---

## AI Gap Analysis (Domain Testing - FR-05)

Qua quá trình rà soát, phát hiện thiếu sót (gap) của AI tool do giới hạn mô hình (LLM limitations):

- **Kết quả mong đợi không tất định (Non-deterministic Outcome):** Ở test case `DT_FR05_04`, AI đã thiết kế kết quả mong đợi chứa từ "hoặc" (báo lỗi 400 _hoặc_ tự động cắt bớt chuỗi), vi phạm nguyên tắc kết quả duy nhất của ISTQB.
- **Lý do (Why):** Bản chất của LLM là mô hình xác suất (probabilistic). Khi đối mặt với một spec không nêu rõ hành vi xử lý chuỗi quá dài, AI có xu hướng liệt kê "tất cả các cách giải quyết hợp lý" để tỏ ra an toàn, thay vì đóng vai một QA chuyên nghiệp chốt hạ một Expected Outcome duy nhất để báo cáo rủi ro. Điều này cho thấy AI gặp khó khăn trong việc đưa ra các quyết định dứt khoát (deterministic decision-making) nếu thiếu thông tin tuyệt đối.

## Boundary Value Analysis Report

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

| Test Case ID | Technique | Boundary Covered          | Inputs                                                                                     | Expected Outcome                       |
| ------------ | --------- | ------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------- |
| BVA_FR15_01  | BVA       | Giá trị `price` LB (0)    | API: Thêm sản phẩm<br>`name` = "SP"<br>`price` = 0<br>`category_id` = Tồn tại              | Thành công, tạo sản phẩm với giá 0.    |
| BVA_FR15_02  | BVA       | Giá trị `price` LB-1 (-1) | API: Thêm sản phẩm<br>`name` = "SP"<br>`price` = -1<br>`category_id` = Tồn tại             | Báo lỗi: Giá sản phẩm không được âm.   |
| BVA_FR15_03  | BVA       | Giá trị `price` LB+1 (1)  | API: Thêm sản phẩm<br>`name` = "SP"<br>`price` = 1<br>`category_id` = Tồn tại              | Thành công, tạo sản phẩm với giá 1.    |
| BVA_FR15_04  | BVA       | Độ dài `name` LB (1)      | API: Thêm sản phẩm<br>`name` = "A" (1 ký tự)<br>`price` = 1000<br>`category_id` = Tồn tại  | Thành công, tạo sản phẩm với tên "A".  |
| BVA_FR15_05  | BVA       | Độ dài `name` LB-1 (0)    | API: Thêm sản phẩm<br>`name` = "" (rỗng)<br>`price` = 1000<br>`category_id` = Tồn tại      | Báo lỗi: Tên sản phẩm không được rỗng. |
| BVA_FR15_06  | BVA       | Độ dài `name` LB+1 (2)    | API: Thêm sản phẩm<br>`name` = "AB" (2 ký tự)<br>`price` = 1000<br>`category_id` = Tồn tại | Thành công, tạo sản phẩm với tên "AB". |

---

## AI Gap Analysis (BVA - FR-15)

Qua quá trình rà soát, phát hiện thiếu sót (gap) của AI tool do giới hạn mô hình (LLM limitations):

- **Bỏ quên Test Case trong 3-value BVA:** AI đã phân tích và kẻ bảng phân vùng chuẩn xác với đầy đủ 3 giá trị biên cho độ dài tên sản phẩm (`LB=1`, `LB-1=0`, `LB+1=2`). Tuy nhiên, khi xuống phần liệt kê Test Case, AI lại bỏ quên mất trường hợp `LB+1 (2)`.
- **Lý do (Why):** LLM thường gặp vấn đề về tính nhất quán (inconsistency) và "suy giảm sự chú ý" (attention drift) trong các chuỗi suy luận dài. Dù bước trên AI tính toán đúng theo công thức 3-value BVA, nhưng khi sinh test case, nó lại bị thiên kiến (bias) bởi các mẫu dữ liệu huấn luyện phổ biến (vốn thường chỉ xài 2-value BVA cơ bản là LB và LB-1) dẫn đến việc "tự động lược bỏ" mất một test case quan trọng của kỹ thuật 3 điểm.

---

## Feature: FR-05 - Product listing and search (Mobile App)

# Step 4 – Boundary Value Analysis

Đại lượng duy nhất có miền giá trị liên tục trong FR-05 để áp dụng BVA là **độ dài của từ khóa tìm kiếm (`search` length)**. Dựa theo phân tích Domain Testing, hệ thống giả định có cơ chế giới hạn từ khóa tối đa 255 ký tự để tránh payload quá lớn gửi từ thiết bị di động.

### Ordered Partition 1: Độ dài từ khóa `search`

- **Valid Partition**: `[0, 255]` (ký tự)
- **Invalid Partition**: `[256, +∞)` (ký tự)

_(Độ dài chuỗi không thể âm, nên miền không hợp lệ `(-∞, -1]` là không thể xảy ra đối với hệ thống input string)._

| Partition               | LB  | LB−1 | LB+1 | UB−1 | UB  | UB+1 |
| ----------------------- | --- | ---- | ---- | ---- | --- | ---- |
| Độ dài `search` (0-255) | 0   | N/A  | 1    | 254  | 255 | 256  |

**Giải thích các điểm biên:**

- **LB (0)**: Chuỗi rỗng. Đảm bảo Mobile App có thể gửi request trắng để lấy toàn bộ danh sách.
- **LB-1 (N/A)**: Độ dài chuỗi không thể bé hơn 0.
- **LB+1 (1)**: Tìm kiếm với chỉ 1 ký tự.
- **UB-1 (254)**: Điểm nằm trong vùng an toàn, ngay sát dưới mức giới hạn trên.
- **UB (255)**: Độ dài từ khóa lớn nhất mà hệ thống cho phép. Đảm bảo hệ thống không chặn nhầm giá trị hợp lệ lớn nhất này (off-by-one).
- **UB+1 (256)**: Vượt qua mức cho phép 1 ký tự. Kỳ vọng API chặn đứng bằng lỗi (VD: 400 Bad Request) hoặc xử lý ngoại lệ an toàn để bảo vệ hệ thống.

---

### Boundary Value Analysis Test Cases

Rút kinh nghiệm từ phân tích AI Gap Analysis của FR-15, để đảm bảo tuân thủ triệt để kỹ thuật kiểm thử biên 3 giá trị (3-value BVA), tất cả 5 giá trị biên hợp lệ (không bị N/A) đều được liệt kê đầy đủ thành các test case độc lập mà không bị bỏ sót.

| Test Case ID | Technique | Boundary Covered  | Inputs                                                            | Expected Outcome                                                                |
| ------------ | --------- | ----------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| BVA_FR05_01  | BVA       | Độ dài LB (0)     | API: Lấy danh sách sản phẩm<br>`search` = "" (0 ký tự)            | Thành công, trả về danh sách toàn bộ sản phẩm.                                  |
| BVA_FR05_02  | BVA       | Độ dài LB+1 (1)   | API: Lấy danh sách sản phẩm<br>`search` = "A" (1 ký tự)           | Thành công, trả về các sản phẩm chứa từ "A".                                    |
| BVA_FR05_03  | BVA       | Độ dài UB-1 (254) | API: Lấy danh sách sản phẩm<br>`search` = Chuỗi 254 ký tự chữ "A" | Thành công, trả về kết quả (hoặc rỗng nếu không khớp), không báo lỗi server.    |
| BVA_FR05_04  | BVA       | Độ dài UB (255)   | API: Lấy danh sách sản phẩm<br>`search` = Chuỗi 255 ký tự chữ "A" | Thành công, trả về kết quả tương tự, API hoạt động bình thường.                 |
| BVA_FR05_05  | BVA       | Độ dài UB+1 (256) | API: Lấy danh sách sản phẩm<br>`search` = Chuỗi 256 ký tự chữ "A" | Từ chối yêu cầu, API báo lỗi (VD: 400 Bad Request) do độ dài vượt quá giới hạn. |

---

## AI Gap Analysis (BVA - FR-05)

Qua quá trình rà soát, **không phát hiện lỗi sai logic nào** trong phần BVA của FR-05 do AI tạo ra.

- **Vì sao AI làm tốt ở FR-05?** Do chất lượng của Prompt (đầu vào) đã được cải thiện tối đa. Việc người dùng (hoặc Context) chủ động nhắc lại các bài học từ FR-15 và FR-10 đã giúp AI tự động "sửa sai" (self-correct): Nó không còn áp dụng BVA bừa bãi cho Nominal Data, nhận thức đúng `LB-1 = N/A` cho biến độ dài chuỗi, và sinh đủ 5 test case cho 3-value BVA mà không bỏ sót.
- **Bài học (AI Limitation):** Thành công này tiếp tục khẳng định rằng: LLM hoàn toàn có khả năng suy luận logic kiểm thử xuất sắc (như việc nhận ra độ dài chuỗi không thể âm), nhưng năng lực đó chỉ được "kích hoạt" khi và chỉ khi Prompt cung cấp đủ bối cảnh (context) và các "lưới bảo vệ" (guardrails) chặt chẽ từ con người.
