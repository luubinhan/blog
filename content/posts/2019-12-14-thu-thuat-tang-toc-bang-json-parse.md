---
slug: "/2019-12-14-thu-thuat-tang-toc-bang-json-parse"
date: "2019-12-14"
title: "Ứng dụng JSON.parse để cải thiện tốc độ?"
desc: "Thủ thuật để cải thiện tốc độ bằng JSON.parse"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "thu-thuat"]
---

Với các ứng dụng web ngày nay, không khó bắt gặp việc sử dụng object như một nơi lưu trữ state và các dạng dữ liệu cần thiết khác cho ứng dụng. Cụ thể nhất chúng ta thường thấy trong store của Redux.

```js
const data = { foo: 42, bar: 1337 }; // 🐌
```

Trong thực tế nó sẽ không đơn giản như ví dụ ở trên, mà cấu trúc nếu không chồng chéo thì cũng rất lớn vì phải gánh vác toàn bộ `state` của ứng dụng. Nếu nó lại dữ liệu cần thiết trong lúc khởi tạo ứng dụng lần đầu tiên. Việc này sẽ nằm trong render critical path của trình duyệt, đồng nghĩa với việc user không thấy gì hết cho đến khi dữ liệu này được load, parse, compile, execute bởi Javascript engine bên dưới.

Để khắc phục việc này một trong những cách làm là dùng server side rendering, chúng ta chỉ quăng cái HTML đã chứa toàn bộ kết quả của quá trình xuống user. Trình duyệt user không cần đảm đương công việc đó nữa.

Nhưng nếu chúng ta không thể dùng server side rendering thì sao?

Nếu object chúng ta cần không chứa những gì mà JSON không hỗ trợ, như BigInt, Maps, Sets,... Chúng ta có thể sử dụng `JSON.parse`

Vì cú pháp của JSON đơn giản hơn nhiều so với Javascript, nên quá trình parse sẽ ít tốn kém hơn so với Javascript rất nhiều.

Nội dung bên trong JSON đối với các engine rất dễ đoán, và ngược lại với các object. Thí dụ nếu bạn là cái engine rồi nhìn vào đây

```js
JSON.parse('{
```

Khi bạn thấy dấu `{`, bạn sẽ biết được chỉ có 2 khả năng có thể xảy ra: một là bắt đầu một object, hai là một JSON không hợp lệ.

Trong khi đó sau dấu `{`  của object, có rất nhiều khả năng xảy ra

```js
const x = 42;
const y = ({x}
```

Đây có phải là object không? Giá trị x đang trỏ tới đâu? Không thể nào có đáp án nếu không xem hết toàn bộ code

```js
// khởi tạo object, x trở tới thằng khai báo trước đó
const y = ({x})
// object destructuring, x không trỏ tới thằng đầu
const y = ({x} = { x: 21});
// một arrow function
const y = ({x}) => x;
```

Như vậy, nếu gặp dấu `{`, các engine phải vô cùng thận trọng vì phải biết ngữ cảnh hiện tại mới biết nó là gì. 

Lợi dụng đặc tính này chúng ta có thể cải thiện tốc độ của các ứng dụng web có sử dụng một object có cấu trúc tương tự như JSON ( ví dụ như Redux Store). Thay vì sử dụng một khai báo object như thế này

```js
const data = { foo: 42, bar: 1337 }; // 🐌
```

Có thể tăng tốc bằng cách viết

```js
const data = JSON.parse('{"foo":42,"bar":1337}'); // 🚀
```

Miễn là việc tính toán này chỉ cần parse một lần bằng `JSON.parse`, nó sẽ nhanh hơn nhiều so với cách khai bao object bình thường, và chỉ nên suy nghĩ áp dụng khi object đã vượt quá kích thước 10kB. 

Thực hiện kiểm tra tốc độ của một object khoảng 8Mb dung lượng trên các engine khác nhau. Kết quả nhận được ít nhất cũng tăng tốc gấp 1.5 lần trên các phiên bản khác nhau của V8

![](https://v8.dev/_img/cost-of-javascript-2019/json.svg)


[https://v8.dev/blog/cost-of-javascript-2019#json](https://v8.dev/blog/cost-of-javascript-2019#json)

[Faster apps with JSON.parse (Chrome Dev Summit 2019)](https://www.youtube.com/watch?v=ff4fgQxPaO0)

