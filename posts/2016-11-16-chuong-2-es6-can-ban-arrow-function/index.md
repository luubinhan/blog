---
path: "/2016-11-16-chuong-2-es6-can-ban-arrow-function"
date: "2016-11-16T13:35:13.234Z"
title: "Hồi 2: ES6 căn bản - Arrow Function"
desc: "Hồi 2 trong series ES6 căn bản, nói về Arrow Function"
tags: ["javascript","2016"]
---

<!-- MarkdownTOC -->

- Khai báo
- Lexical scoping là gì
- Một số dạng khai báo
- Nên và không nên

<!-- /MarkdownTOC -->


# Khai báo

Trước đây để khai báo hàm trong javascript

```js
function name(paramters){
 //body
}
```

Hoặc, tạo một hàm ẩn (anonymous function), sau đó gán hàm này cho biến, key của object

```js
var mystyle =function (paramters){
 //body
}
```

Bắt đầu từ ES6 ta có thêm một cách để viết một hàm không có tên (hàm ẩn), có thể viết hàm trên bằng cách mới

```js
var mystyle = (paramters) => {
 //body
}
```

Bỏ từ khóa `function`, thêm vào `=>`  sau `paramater`. Sự khác biệt của *arrow function* là nó **không được phép đặt tên** và là dạng `lexical scoping`

# Lexical scoping là gì

Từ khóa `this` và `argument` điều trỏ về đối tượng cha bự nhất. Ví dụ cho dễ hiểu cái nha. Chúng ta có đối tượng `timer` với biến đếm `second` và phương thức `start`. Khi chạy `timer` một vài giây, log giá trị `seconds` hiện tại

```js
var timer = {
 seconds: 0,
 start() {
  setInterval(()=> {
   this.seconds++
  }, 1000)
 }
}
timer.start()
setTimer(function(){
 console.log(timer.seconds)
},3500)
// result -3
```

Nếu hàm truyền vào cho `setInterval` là một hàm bình thường nó sẽ không hiểu `this.second` là thằng nào, ta phải khai báo thêm `self = this` ở trên *timer*, từ khóa this không còn đi theo ngữ cảnh hiện tại mà nó sẽ tham chiếu lên trên.

# Một số dạng khai báo

Nếu *arrow function* chỉ chứa một *parameter* duy nhất, bỏ luôn dấu `()`` viết gì cho dễ đọc

```js
var double = value => {
 return value * 2
}
```

Với hàm mà return 1 dòng như vậy có thể rút ngắn lại

```js
var double = value => value * 2
```

# Nên và không nên

ES6 không có nghĩa là cái nào cũng tốt hơn ES5, *arrow function* có trường hợp không nên sử dụng. Ví dụ nếu hàm lớn với vài chục dòng code, thay thế bằng *arrow function* là điều không nên làm, nên nhớ *arrow function* không được phép có tên, trong mọi trường hợp hàm có tên đi kèm luôn dễ maintain hơn.

Arrow function tuyệt vời khi cần một hàm không tên thực hiện một vài thao tác đơn giản. Thí dụ kết hợp với những hàm như .map, .filter, .reduce

```js
[1,2,3,4].map(value => value * 2).filter( value => value > 2 )
.forEach( value => console.log( value ) )
```
