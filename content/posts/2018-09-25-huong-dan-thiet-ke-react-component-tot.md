---
slug: "/2018-09-25-huong-dan-thiet-ke-react-component-tot"
date: "2018-09-25"
title: "Chỉ dẫn để thiết kế React Component"
desc: "Tốt hơn, tốt nữa, tốt mãi, luôn là điều mình muốn, ngoài chuyện viết cho nó chạy đúng, viết thế nào tốt nhất nên là mục tiêu khi làm việc"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react"]
---

<!-- TOC -->

- [Single Responsibility Principle](#single-responsibility-principle)
- [Export](#export)
- [Type check](#type-check)
- [Consistance](#consistance)
- [Naming](#naming)

<!-- /TOC -->

**Đây là tổng hợp những quan điểm thiết kế component sao cho tốt, chứ không phải là chuẩn mực gì hết, theo quan điểm cá nhân người viết - là mình đây, không hề là chuẩn mực công nghiệp gì cả.**

Thử hình dung, chúng ta có một component với khoảng hơn chục `prop`, dựa trên các `prop` truyền vào, component sẽ cho ra kết quả khác nhau, một nhu cầu tất yếu, tuy nhiên nếu hạn chế được ít chừng nào thì tốt chừng ấy, gần như số lượng `prop` của component quá nhiều thì chúng ta sẽ không nhớ nổi cần những gì cho component đó, lúc nào chúng ta cũng phải mở ra đọc docs, đôi khi mở source ra để check logic bên trong nó.

# Single Responsibility Principle

Nếu 1 component đang có quá nhiều `prop`, nó đang ôm đồm quá nhiều công việc, hãy nhớ đến nguyên tắc [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle) (SRP), tạm dịch là ai làm việc nấy, chia component đó ra thành các component nhỏ hơn, từng component giải quyết từng vấn đề.

![](https://techmaster.vn/fileman/Uploads/ImageBlog/hoc-lap-trinh-truc-tuyen-online-co-ban-den-nang-cao-20122015-1.jpg)

# Export

Một kiểu viết mình rất thích, thay vì export component `<TableRow/>`, `<TableCell/>`, mình sẽ export  component dạng `<Table.Row/>`, `<Table.Cell/>`

```jsx
import Table from './Table';
import TableRow from './TableRow';
import TableCell from './TableCell';

Table.Cell = TableCell;
Table.Row = TableRow;

export {
  TableCell,
  TableRow
}

export default Table;
```

*Nếu bạn không hiểu vì sao mình có thể gọi `<Table.Row/>`, `<Table.Cell/>`, mình giải thích luôn, lợi dụng đặc điểm biến kiểu reference, tham khảo [lại bài này](https://luubinhan.github.io/blog/2017-09-25-10-khai-niem-javascript-can-biet), thằng TableCell và Table.Cell đều tham chiếu đến cùng vùng nhớ*

# Type check

Luôn dùng type check cho component, thời điểm hiện tại mình khuyến khích [dùng Flow](https://luubinhan.github.io/blog/2018-09-10-huong-dan-lam-viec-voi-flow-react-type-checking), nó đảm bảo rằng component sẽ được truyền đúng giá trị `prop` nó cần, đồng thời lúc gõ ra mình cũng sẽ thấy được danh sách các `prop` của component đó trên editor

![Chỉ dẫn để thiết kế React Component](https://cdn-images-1.medium.com/max/800/1*cT7C0Tk53cilIYNWNo8KfA.gif)

# Consistance

Luôn thống nhất trong hệ thống component đang build, không thể lúc vui bạn dùng `prop` tên `disable` chổ khác dùng `enable`, nếu được thì chỉ chọn 1 trong 2 thôi.

Ví dụ khác, nếu component cho phép truyền vào biến màu sắc, chổ này bạn dùng `variant="primary|secondary|danger"`, chổ kia bạn lại dùng `color="blue|grey|red"` thì hết sức khó chịu cho người khác.

# Naming

Về cách đặt tên `prop`, luôn đặt tên cho dễ hình dung được công dụng của component đó làm nhiệm vụ gì, ảnh hưởng gì đến component

Giờ lấy ví dụ một component rất phổ biến `<Alert />`

![Chỉ dẫn để thiết kế React Component](https://cdn-images-1.medium.com/max/1600/0*xkEnUeapJT4ut5r1.png)

Thường chúng ta sẽ tạo ra component có các `prop` kiểu này

```jsx
<Alert>Thông báo</Alert>
<Alert success>Thành công</Alert>
<Alert warning>Cảnh báo</Alert>
<Alert danger>Hư mẹ rồi</Alert>
```

Rất rõ ràng sạch sẽ, xúc tích. Tuy nhiên nếu chúng ta dùng theo kiểu sau

```jsx
<Alert success warning>Thành công</Alert>
```

Sẽ có những anh developer ngu ngu ngơ ngơ dùng như vậy thật đấy. Tất nhiên nếu chúng ta là người viết cái `<Alert/>` chúng ta sẽ không đời nào truyền vào kiểu vậy. Nếu truyền vào kiểu như vậy thì nó `render` ra cái gì, đó mà đoán được. Một giải pháp được khuyến khích

```jsx
<AlertBetter>Thông báo</AlertBetter>
<AlertBetter type="success">Thành công</AlertBetter>
<AlertBetter type="warning">Cảnh báo</AlertBetter>
<AlertBetter type="danger">Hư mẹ rồi</AlertBetter>
```

Nguồn tham khảo và tổng hợp

- https://blog.kentcdodds.com/make-impossible-states-impossible-cf85b97795c1

- https://hackernoon.com/principles-of-component-api-prop-design-bb20cd58da54