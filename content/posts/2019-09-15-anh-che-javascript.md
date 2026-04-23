---
slug: "/2019-09-15-anh-che-javascript"
date: "2019-09-15"
title: "Bức ảnh chế thú vị về so sánh trong Javascript"
desc: "Qua bức ảnh chế này, chúng ta biết được nhiều điều hay ho về so sánh trong javascript"
cover: "https://miro.medium.com/max/500/0*69mYzhumogiPLSh6.png"
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "hoc-thuat"]
---


Bộ ảnh thú vị mô tả kể chuyện so sánh trong Javascript, vô tình lụm xem được cái hình này trên Reddit

![Nguyên tắc bắt cầu javascript](https://miro.medium.com/max/500/0*kjcbVX8Y9TFoHGDO.png)


Bạn có thể copy nguyên đoạn code này paste vào trình duyệt để xem kết quả

```js
0 == '0'
0 == []
// Nguyên tắc bắt cầu có đúng?

'0' == []
```

Chuyện gì đã xảy ra vậy?

```js
0 == '0' // => true
```

Với các ngôn ngữ lập trình khác thì chưa biết, nhưng với javascript `==` sẽ tự ý **chuyển 2 giá trị muốn so sánh về cùng một kiểu**, hay người ta vẫn gọi là ko quan tâm đến kiểu dữ liệu khi so sánh.

Trong nhiều trường hợp chúng ta cũng có thể sử dụng cách so sánh `==` để tiện, javascript tự động chuyển về một kiểu, tuy nhiên sẽ ko khuyến khích cách này

Theo như [specify](https://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3)

> Nếu x = Number, y = String, trả về x == ToNumber(y),

Nó đưa giá trị bên phải về number mà không báo cho ai biết hết

![Tự động convert string sang number](https://miro.medium.com/max/581/0*njs7mQoUYjWG13Sm.jpeg)

```js
0 == [] // => true
```

> Nếu x là String hoặc Number, y là Object, trả về x == ToPrimitive(y)

![Array là object](https://miro.medium.com/max/618/0*qN97ouGakJx0Gthb.jpg)

Đúng! Array trong javascript cũng là object

ToPrimitive(y) ở đây, JS sẽ gọi vào hàm `.toString` để convert về kiểu primitive, trường hợp là array nó nối toàn bộ giá trị trong array thành chuỗi

```js
[1, 2, 3].toString();
// => "1,2,3"
['hello','world'].toString();
// => "hello,world"
[].toString();
// => ""
```

Toàn bộ những điều vô lý này đã được đưa vào [văn bản chính quy!](https://www.ecma-international.org/ecma-262/5.1/#sec-8.12.8)

```js
'0' == []
```

![So sánh string và array](https://miro.medium.com/max/500/0*69mYzhumogiPLSh6.png)

Cứ theo nguyên tắc đã quy định mà làm

> Nếu x là String hoặc Number, y là Object, trả về x == ToPrimitive(y)

Bước một `ToPrimitive([])` => chúng ta sẽ trở thành so sánh `'0' == ""`, khác nhau rõ ràng hé.
