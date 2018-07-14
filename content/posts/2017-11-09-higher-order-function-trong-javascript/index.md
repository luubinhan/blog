---
slug: "/2017-11-09-higher-order-function-trong-javascript"
date: "2017-11-09"
title: "Higher-Order function trong javascript"
desc: "Một trong những đặc thù của Javascript khiến nó rất phù hợp với function programming là cho phép viết function higher-order, kiểu function cho phép nhận một function khác như một argument hoặc trả về một function"
category: "javascript"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Callback function](#callback-function)
- [Function như một giá trị trả về](#function-như-một-giá-trị-trả-về)

<!-- /TOC -->


# Callback function

Javascript xem một function như một dạng object, function có thể trở thành giá trị của một biến, có thể dùng như một đối số hoặc giá trị return như một object.

Javscript là ngôn ngữ single-threaded, nghĩa là một lần nó chỉ chạy một tính toán tuần tự. Nếu đã từng viết javascript nhiều bạn sẽ thấy việc sử dụng `callback` trong javascript rất nhiều, function A được truyền vào cho function B, sau khi thực hiện các đoạn code trong function B, nó sẽ gọi lại function A và chạy các đoạn code trong function A


```jsx
<button id="clicker">Click Here</button>

document.getElementById('clicker').addEventListener('click', function() {
    console.log("You click", this.id);
});

// Hoac viet

var proveIt = function() {
    console.log("You click", this.id);
}
document.getElementById('clicker').addEventListener('click', proveIt);
```


Lưu ý là mình pass vào `proveIt` chứ không phải `proveIt()`, mình đang truyền vào proveIt như một *object* chứ nếu truyền `proveIt()` là mình sẽ truyền vào kết quả xử lý của hàm *proveIt*

Với cái khả năng đơn giản như đang giỡn là truyền vào một cái inline function như vậy với một function được định danh đâu đó mở ra muôn vàng kiểu viết biến hóa. Chúng ta có thể xây dựng những function rất rất nhỏ để xử dụng ở nhiều nơi, nhiều chổ, nhiều project khác nhau nếu chúng ta áp dụng nguyên tác viết pure function ( nếu cùng một giá trị truyền vào, luôn luôn trả về cùng kết quả).

# Function như một giá trị trả về

Ví dụ ta có một hàm để thay thể chuỗi "Millennials" thành "Snake People"

```js
var snakify = function(text) {
  return text.replace(/millenials/ig, "Snake People");
};
console.log(snakify("The Millenials are always up to something."));
// The Snake People are always up to something.
```

Rồi ta lại có thêm một hàm thay thể chuổi "Baby Boomers" thành "Aging Hippies"

```js
var hippify = function(text) {
  return text.replace(/baby boomers/ig, "Aging Hippies");
};
console.log(hippify("The Baby Boomers just look the other way."));
// The Aging Hippies just look the other way.
```

Chúng ta có viết lại 2 hàm này một cách thông minh và phức tạp hơn chút

```js
var attitude = function(original, replacement, source) {
  return function(source) {
    return source.replace(original, replacement);
  };
};

var snakify = attitude(/millenials/ig, "Snake People");
var hippify = attitude(/baby boomers/ig, "Aging Hippies");

console.log(snakify("The Millenials are always up to something."));
// The Snake People are always up to something.
console.log(hippify("The Baby Boomers just look the other way."));
// The Aging Hippies just look the other way.
```

Bằng việc khai báo 1 function mới (snakify, hippyfy) reference tới function `attitude` chỉ đưa vào 2 tham số đầu tiên, cho phép function mới này nhận bất kỳ giá trị truyền vào nào trở thành tham số truyền vào thứ 3 của function `attitude`.

Javascript cho phép truyền vào một function số lượng argument ít hơn số lượng được khai báo, khi đó những argument ko được truyền vào thì xem như undefined. Thứ 2 nữa là function có thể nhận vào thêm argument sau khi nó được gọi bằng cách viết như trên, snakify trỏ đến attitude, khi gọi snakify thì argument truyền vào của snakify trở thành argument còn thiếu trong attitude

Đọc thêm phần closures ở đây 'https://luubinhan.github.io/blog/2017-09-25-10-khai-niem-javascript-can-biet'