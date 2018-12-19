---
slug: "/2018-12-19-tim-hieu-curring-function-trong-javascript"
date: "2018-12-19"
title: "Tìm hiểu Currying function trong Javascript"
desc: "Bài viết này chúng ta sẽ tìm hiểu về cái cà-ri này, nó chạy ra sao, hữu dụng thế nào."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---


Bạn sẽ gặp kiểu lập trình truyền vào **function như một argument** (callback) cho một function khác không chỉ trong Javascript mà còn có thể thấy ở Haskell, Clojure, Erlang và Scala

Việc sử dụng function như một argument đẻ ra thêm một số khái niệm khác: **Pure function*, **Currying**, **Higher-Order Function**

## Thế nào gọi là Carrying?

Thay vì truyền vào cho function 1 lúc nhiều argument, chúng ta lại chuyển kiểu viết đó thành 1 function chỉ nhận 1 argument, nhưng bên trong đó chúng ta lòng các function con bên trong, và return về function con này.

Ví dụ cho dễ hiểu hé. Đây là kiểu viết truyền nhiều argument ai cũng biết.

```js
function multiply(a, b, c) {
    return a * b * c;
}
multiply(1,2,3); // 6
```

Đây là phiên bản *cà-ry* của function `multiply` ở trên, kết quả cuối cùng cũng ko thay đổi.

```js
function multiply(a) {
    return (b) => {
        return (c) => {
            return a * b * c
        }
    }
}

log(multiply(1)(2)(3)) // 6
```

Bạn có thể chửi viết chi mà phức con mẹ nó tạp vậy, callback hell. Nhưng lợi ích của nó là giúp chúng ta gọi được hàm multiply theo kiểu `multiply(1)(2)(3)` thay vì `multiply(1,2,3). Vẫn chưa thấy lợi ích? Hy vọng viết thế này bạn sẽ thấy được công năng của nó

```js
const mul1 = multiply(1);
const mul2 = mul1(2);
const result = mul2(3);
// result : 6
```

Tận dụng scope mà `mul2` có thể truy xuất đến kết quả của `mul1`. Dù đã được gọi nhưng kết quả của `multiply` sẽ ko *chết liền* mà vẫn tồn tại cho đến khi chạy đến lần gọi sau cùng.

Bạn cũng có thể viết Currying function theo kiểu sau

```js
function volume(a) {
    return (b, c) => {
        return a * b * c
    }
}
volume(70)(90,30);
volume(70)(390,320);
volume(70)(940,340);
```

## Currying có hữu dụng không?

Thí dụ bạn có một hàm để tính giá trị discount, giảm ngay 10% cho khách hàng thân thiết.

```js
function discount(price, discount) {
    return price * discount
}
// Giảm ngay 50 đồng khi khách hàng đã tiêu 500 đồng.
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
Chúng ta có thể đưa vào giá trị discount ở lần đầu tiên, đến các lần gọi tiếp theo, chúng ta ko cần truyền giá trị 10% này nữa

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

Nói một cách ngắn gọn, khi cần truyền vào 1 argument ít thay đổi, cố định trong đa số các trường hợp, nghĩ đến carrying.

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

<a target="_blank" rel="noopener noreferrer" href="https://blog.bitsrc.io/understanding-currying-in-javascript-ceb2188c339">Understanding currying in javascript</a>
