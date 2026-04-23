---
slug: "/2019-10-21-gioi-thieu-temporary-dead-zone-cua-javascript"
date: "2019-10-21"
title: "Giới thiệu Temporal Dead Zone trong javascript"
desc: "Bạn đã biết hoisted? bạn cần biết thêm khái niệm Temporal Dead Zone là đủ một cặp"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

Temporal Dead Zone - *Khu vực tự trị, ngoài vòng pháp luật*

Đoạn code bên dưới sẽ cho kết quả thế nào, đố bạn

```js
// có chạy được ko, chưa khai báo `Car`
new Car('red');

class Car {
	constructor(color) {
		this.color = color;
	}
}
```

hoặc gọi một hàm trước khi nó được khai báo

```js
// có chạy được ko, chưa khai báo greet
greet('VuiLapTrinh');

function greet(who) {
	return `Hello, ${who}!`;
}
```

Đáp án là, với trường hợp sử dụng một `class` chưa được khai báo, kết quả là `ReferenceError`, còn sử dụng hàm chưa khai báo, chạy bình thường 😂😓🤔

Temporal Dead Zone (TDZ - *khu vực tự trị*) là nơi quản lý tính khả thi của `let`, `const`, `class`

Bắt đầu với khai báo `const`

```js{1}
white; // throws `ReferenceError`
const white = '#FFFFFF';
white;
```

Trước khi có sự xuất hiện của `const white = '#FFFFFF'`, biến `white` sẽ nằm trong *khu vực tự trị* (TDZ)

Chúng ta không thể truy cập vào khu vực tự trị này, nên nó sẽ trả về lỗi `ReferenceError: Cannot access 'white' before initialization`


![Giới thiệu Temporal Dead Zone trong javascript](https://dmitripavlutin.com/static/7973b25e51eb97f6d330c941600f7ad8/5722e/temporal-dead-zone-in-javascript.webp)

Khái niệm này giúp tránh sự *lằng nhằng* trong javascript **trước đây**, được phép sử dụng trước khi khai báo. Vì nó chỉ được thêm vào *sau này*, nên chỉ có hiệu lực trên các từ khóa *sau này* mới có là `let`, `const`, `class`

```js
// throws `ReferenceError`
count;
let count;
count = 10;

// throws `ReferenceError`
const myNissan = new Car('red');

class Car {
  constructor(color) {
    this.color = color;
  }
}
```

Nó cũng giải thích luôn tại sao chúng ta phải gọi `super` trong `class` trước khi gọi `this`, vì `this` tạm thời nằm trong khu TDZ khi chưa gọi `super`

```js{3,4,8}
class MuscleCar extends Car {
  constructor(color, power) {
    this.power = power;
    super(color);
  }
}

const myCar = new MuscleCar('blue', '300HP'); // `ReferenceError`
```

Chúng ta phải dùng `this.` sau khi gọi `super`

Với những cách khai báo cũ là `var`, `function` nó không chịu chung số phận phải sống trong khu tự trị, nó sẽ chịu khái niệm **Hoisting**.

Hoisting là một cơ chế hoạt động gây khó dễ anh em chúng ta đã bao nhiêu thập kỷ nay.

Anh em ra đường gặp một em chưa hề quen biết, chúng ta nhẹ nhàng tới hỏi "Em nhà ở đâu thế?", nhận được câu trả lời anh lên phường tra cứu, lên đến phường, "chẳng ai biết ẻm là ai", phường chỉ lên quận tra cứu, *quận* lại bảo "có mà lên ủy ban thành phố chú ạ", lỡ mà xui xui chúng ta phải lên đến trung ương để biết rằng em đã đăng ký hộ khẩu ở đâu.

```js{2,5,9}
// chạy như thường, nhưng đừng viết gì nhá
value; // => undefined
var value;

greet('VuiLapTrinh'); // => 'Hello, VuiLapTrinh!'
function greet(who) {
  return `Hello, ${who}!`;
}
greet('Andy'); // => 'Hello, Andy!'
```

Cho nên bạn có thể làm được việc này, xài trước, `import` sau

```js
myFunction();
import { myFunction } from './myModule';
```

TDZ còn phụ thuộc vào từng *thành phố*, mỗi thành phố sẽ có khu vực tự trị khác nhau

![Giới thiệu Temporal Dead Zone trong javascript](https://dmitripavlutin.com/static/bba73f7c82f4385bbd81ad4c3531217c/5722e/limits-of-temporal-dead-zone-javascript.webp)

Lấy ví dụ

```js
function doSomething(someVal) {
  // Function scope
  typeof variable; // => undefined
  if (someVal) {
    // Inner block scope
    typeof variable; // throws `ReferenceError`
    let variable;
  }
}
doSomething(true);
```

[Don't Use JavaScript Variables Without Knowing Temporal Dead Zone](https://dmitripavlutin.com/javascript-variables-and-temporal-dead-zone/)
