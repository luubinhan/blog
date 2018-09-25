---
slug: "/2018-09-25-huong-dan-thiet-ket-component"
date: "2018-09-25"
title: "Chỉ dẫn để thiết kế React Component"
desc: "Tốt hơn, tốt nữa tốt mãi luôn là điều mình muốn, ngoài chuyện viết cho nó chạy đúng, viết thế nào tốt nhất luôn là mục tiêu khi dựng component của riêng mình"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react"]
---

> Đây là tổng hợp những quan điểm thiết kế component sao cho tốt, chứ không phải là chuẩn mực gì hết, mang tính cá nhân người viết, không hề là chuẩn mực công nghiệp gì cả.

Thử hình dung chúng ta có một component với khoảng một chục `prop`, dựa trên các `prop` truyền vào, component sẽ cho ra kết quả khác nhau, một nhu cầu tất yếu, tuy nhiên nếu hạn chế được ít chừng nào thì tốt chừng ấy, gần như số lượng `prop` của component quá nhiều thì chúng ta sẽ không nhớ nổi cần những gì cho component đó, lúc nào chúng ta cũng phải mở ra đọc docs, đôi khi mở source ra để check logic bên trong nó.

Nếu 1 component nào đây mà đang có quá nhiều `prop` có thể truyền vào, thì nó đang có vẻ ôm đồm quá nhiều công việc, hãy nhớ đến nguyên tắc Single Responsibility Principle (SRP), tạm dịch là ai làm việc nấy, chia component đó ra thành các component nhỏ hơn, từng component giải quyết từng vấn đề.

Gợi ý, thay vì tạo một component `<TableRow/>`, `<TableCell/>`, dùng kiểu export để ta có component dạng `<Table.Row/>`, `<Table.Cell/>`

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

Luôn dùng type check cho component, thời điểm hiện tại mình luôn khuyến khích dùng `Flow`, nó đảm bảo rằng component sẽ được truyền đúng giá trị `prop` nó cần, đồng thời lúc gõ ra mình cũng sẽ thấy được danh sách các prop của component đó trên editor

![Chỉ dẫn để thiết kế React Component](https://cdn-images-1.medium.com/max/800/1*cT7C0Tk53cilIYNWNo8KfA.gif)

Luôn thống nhất trong hệ thống component đang build, không thể lúc vui bạn dùng prop tên `disable` chổ khác dùng `enable`, nếu được thì chỉ chọn 1 trong 2 thôi.

Ví dụ khác, nếu component cho phép truyền vào biến màu sắc, chổ này bạn dùng `variant="primary|secondary|danger"`, chổ kia bạn lại dùng `color="blue|grey|red"` thì hết sức khó chịu cho người khác.

Về cách đặt tên `prop`, luôn đặt tên cho dễ hình dung được công dụng của component đó làm nhiệm vụ gì, ảnh hưởng gì đến component

Giờ lấy ví dụ một component rất phổ biến `<Alert />`

![Chỉ dẫn để thiết kế React Component](https://cdn-images-1.medium.com/max/1600/0*xkEnUeapJT4ut5r1.png)

Thường chúng ta sẽ tạo ra component có các prop kiểu này

```jsx
<Alert>Just FYI</Alert>
<Alert success>It worked!</Alert>
<Alert warning>Head's up</Alert>
<Alert danger>Watch out!</Alert>
```

Rất rõ ràng sạch sẽ, súc tích. Tuy nhiên nếu chúng ta dùng theo kiểu sau

```jsx
<Alert success warning>It worked!</Alert>
```

Sẽ có những anh developer ngu ngu ngơ ngơ dùng như vậy thật đấy. Tất nhiên nếu chúng ta là người viết cái `<Alert/>` chúng ta sẽ không đời nào truyền vào kiểu vậy. Một giải pháp được khuyến khích

```jsx
<AlertBetter>Just FYI</AlertBetter>
<AlertBetter type="success">It worked!</AlertBetter>
<AlertBetter type="warning">Head's up</AlertBetter>
<AlertBetter type="danger">Watch out!</AlertBetter>
```

Nguồn tham khảo

- https://blog.kentcdodds.com/make-impossible-states-impossible-cf85b97795c1

- https://hackernoon.com/principles-of-component-api-prop-design-bb20cd58da54