# Domain Testing Report

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
