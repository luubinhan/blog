---
slug: "/2018-12-19-tim-hieu-curring-function-trong-javascript"
date: "2018-12-19"
title: "Tìm hiểu Currying function trong Javascript"
desc: "Bài viết này chúng ta sẽ tìm hiểu về cái cà-ri này, nó chạy ra sao, hữu dụng thế nào."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript","senior"]
---



> **Currying function** là một function có thể xử lý việc chúng ta truyền *lắc nhắc* từng tham số, thay vì truyền tất cả tham số cùng một lúc. Mỗi lần gọi function chúng ta lại truyền tiếp một tham số

Truyền cùng lúc

```js
normal(a, b, c)
```

Truyền *lắc nhắc*

```js
carrying(a)(b)(c)
```

Một function **thông thường**

```js
function multiply(a, b, c) {
    return a * b * c;
}
multiply(1,2,3); // 6
```

Đây là phiên bản *cà-ry* của function `multiply` ở trên

```js
function multiply(a) {
    return (b) => {
        return (c) => {
            return a * b * c
        }
    }
}

multiply(1)(2)(3) // 6
```

Bạn có thể chửi viết chi mà phức con mẹ nó tạp vậy, callback hell. Nhưng lợi ích của nó là giúp chúng ta gọi được hàm `multiply` theo kiểu `multiply(1)(2)(3)` thay vì `multiply(1,2,3)`. *Vẫn chưa thấy lợi ích?* Viết tách ra cho dễ nhìn nè

```js
const mul1 = multiply(1);
const mul2 = mul1(2);
const result = mul2(3);
// result : 6
```

Vẫn chưa thấy lợi ích luôn? Xem tiếp ví dụ để tính giảm giá theo hóa đơn


## Currying function để làm gì?

Thí dụ bạn có một hàm để tính giá trị *discount*, giảm ngay 10% cho khách hàng thân thiết.

```js
function discount(price, discount) {
    return price * discount
}
// Giảm ngay giảm 10% trên hóa đơn
const price = discount(500,0.10); // $50 
// $500  - $50 = $450
```
Khách hàng tiêu tiền điên cuồng, chúng ta gọi hàm này say mê

```js
const price = discount(1500,0.10); // $150
// $1,500 - $150 = $1,350
const price = discount(2000,0.10); // $200
// $2,000 - $200 = $1,800
const price = discount(50,0.10); // $5
// $50 - $5 = $45
const price = discount(5000,0.10); // $500
// $5,000 - $500 = $4,500
const price = discount(300,0.10); // $30
// $300 - $30 = $270
```
Curry function sẽ giúp được gì trong tình huống này đây? Chúng ta vẫn cho phép truyền % `discount` và cho phép việc giá trị truyền này một lần thôi

```js
function discount(discount) {
    return (price) => {
        return price * discount;
    }
}
const tenPercentDiscount = discount(0.1);
tenPercentDiscount(500); // $50
const twentyPercentDiscount = discount(0.2);
twentyPercentDiscount(500); // 100
// $500 - $100 = $400
twentyPercentDiscount(5000); // 1000
// $5,000 - $1,000 = $4,000
twentyPercentDiscount(1000000); // 200000
// $1,000,000 - $200,000 = $600,000
```

> Khi cần truyền vào 1 argument ít thay đổi, cố định trong đa số các trường hợp, nghĩ đến carrying.

## Chuyển bất cứ hàm nào thành hàm Currying

Chúng ta sẽ viết một cái hàm, nhiệm vụ của nó là biến một hàm bất kỳ và trả về một phiên bản currying  của function đó.

```js
function curry(fn, ...args) {
    return (..._arg) => {
        return fn(...args, ..._arg);
    }
}
```

Giải thích hàm này nha, hàm `curry` này nhận vào argument đầu tiên là một function, các argument tiếp theo sẽ là giá trị số. Sử dụng với hàm `multiply` ban đầu

```js
function multiply(a, b, c) {
    return a * b * c;
}
// phiên bản currying
const multiplyCurrying = curry(multiply,2);
multiplyCurrying(4);
multiplyCurrying(6);
```

Hoặc dùng `lodash.curry`, `lodash.curryRight` nếu bàn thích sự hoàn hảo :D

