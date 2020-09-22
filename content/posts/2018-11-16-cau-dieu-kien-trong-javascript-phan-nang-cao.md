---
slug: "/2018-11-16-cau-dieu-kien-trong-javascript-phan-nang-cao"
date: "2018-11-16"
title: "Câu điều kiện trong javascript"
desc: "Nắm vững conditional expression trong javascript để viết code sạch sẽ hơn"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Phân biệt Expression và Statement](#phân-biệt-expression-và-statement)
- [Phân biệt `true/false`, `truthy/falsy`](#phân-biệt-truefalse-truthyfalsy)
- [Phân biệt toán tử AND `&&` và OR `||`](#phân-biệt-toán-tử-and--và-or-)
- [Thay statement bằng expression](#thay-statement-bằng-expression)
- [Một số cách viết tắt và lưu ý](#một-số-cách-viết-tắt-và-lưu-ý)

<!-- /TOC -->

## Phân biệt Expression và Statement

Trước tiên chúng ta ôn lại expression và statement trong javascript.

<div class="note">An expression is any phrase that the JavaScript engine can evaluate to <strong>produce a value.</strong></div>

Expression là một đoạn code luôn trả về 1 giá trị.
Bên dưới là expression

```js
// number
0xFF

// array
[]

// object
{}

// regexp
/^\d+$/

// logical AND operation
(x && y)

// bitwise XOR operation
(x ^ y)

// ternary operation
(x ? y : z)

// arithmetic operation
(x + y) / z

// assignment
x = 'string'

// function expression
(function x(y) {})

// function invocation
x(100)

// object property access
obj.students[0].name
```

<div class="note">
A statement is any sentence or command that the JavaScript engine can execute to make <strong>something happen</strong> or cause some <strong>side-effect</strong>.
</div>

Statement là lệnh, tập lệnh thực hiện một hành động.

Câu điều kiện, khai báo biến, khai báo hàm, loop, throw, try/catch/finally là  statement

## Phân biệt `true/false`, `truthy/falsy`

Tất cả giá trị trong javascript đều có thể phân thành **truthy** hoặc **falsy** ( không phải true/false)

Các giá trị sau được xếp vào **falsy**

<div class="note">
  '', "", ``, 0, -0, null, undefined, NaN, false
</div>

Các giá trị còn lại được coi là **truthy**. Khi nào javascript cần giá trị là `Boolean`, nó sẽ tự động đưa những giá trị trong nhóm truthy thành `true`, nhóm falsy thành `false`

Nếu không tin, bạn có thể kiểm tra

```js
console.log(null); // null
console.log(Boolean(null)); // false
```

Hoặc bạn có thể dùng operator `!!` để chuyển một giá trị thành boolean.

```js
console.log(null); // null
console.log(!!(null)); // false
```

## Phân biệt toán tử AND `&&` và OR `||`

Operator `&&` và `||` sẽ cho kết quả là một boolean. Lưu ý là `&&` sẽ ưu tiên chạy trước `||`, nếu muốn thay đổi thứ tự ưu tiên thì phải dùng `()`

```js
false && true || true; // true
false && (true || true); // false
```

2 toán tử AND và OR có một đặc điểm: thằng đứng trước luôn được tính giá trị, thằng thứ 2 có thể sẽ không được đếm xỉa luôn. 

`&&` và `||` **không phải lúc nào cũng trả về kết quả boolean** (true, false), nó thích trả về gì là nó trả thôi.

<div class="note">Nếu mệnh đề đầu của <code>&&</code> nó trả về <strong>truthy</strong> nó tính kết quả và trả về mệnh đề 2, nếu mệnh đề đầu là <strong>falsy</strong> thì bỏ qua mệnh đề 2. </div>

```js
// 'a' là 'truthy', nên 'a' && 'b' sẽ trả về 'b'
('a' && 'b') === 'a'; // false
('a' && 'b') === 'b'; // true
```

<div class="note">Nếu mệnh đề đầu của <code>||</code> trả về <strong>truthy</strong>, nó ko quan tâm đến mệnh đề 2, nếu mệnh đề đầu là <strong>falsy</strong> nó sẽ tính và trả về giá trị mệnh đề 2</div>

```js
(a || b) === a; // true
(a || b) === b; // false
```

## Thay statement bằng expression

```js
// viết kiểu statement
if (user && user.canDeletePost) {
    deletePost();
}
// viết kiểu expresion
user && user.canDeletePost && deletePost();
```

Một câu if...else... đơn giản như kiểm tra độ mạnh mật khẩu

```js
let strength = null;

if (password.length > 7) {
  strength = 'Strong';
} else {
  strength = 'Weak';
}

// viết kiểu expresion,
const strength = (password.length > 7) && 'Strong' || 'Weak';
// khuyên dùng ternary operator trong trường hợp này
const strength = (password.length > 7) ? 'Strong' : 'Weak';
```

ternary operator là kiểu viết thế này, nếu bạn có quên

```js
condition ? A : B
```

Trong nhiều trường hợp như ví dụ bên dưới, việc sử dụng expression sẽ vô vùng nguy hiểm


```js
let xmlhttp = null;

if (window.XMLHttpRequest) {  
  // Modern browsers
  xmlhttp = new XMLHttpRequest();  
} else if (window.ActiveXObject) {  
  // Older versions of Internet Explorer (IE <= 6)
  xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');  
}
```

Nếu chúng ta viết bằng expression

```js
const xmlhttp = window.XMLHttpRequest && new XMLHttpRequest()
  || window.ActiveXObject && new ActiveXObject('Microsoft.XMLHTTP')
  || null;
```

Lạm dụng expression như vậy là không nên, chúng ta nên viết một cách rõ ràng hơn bằng ternary operator

```js
const xmlhttp = window.XMLHttpRequest
  ? new XMLHttpRequest()
  : window.ActiveXObject
    ? new ActiveXObject('Microsoft.XMLHTTP')
    : null;
```

## Một số cách viết tắt và lưu ý

Luật De Morgan

```js
// là như nhau
!A && !B == !(A || B)

// như nhau luôn
!A || !B == !(A && B)
```

Nếu `A`, `B`, `C` là các giá trị Boolean

```js
// chuyển AND qua OR
A && B == !(!A || !B)

// chuyển OR qua AND
A || B == !(!A && !B)

// bỏ nested AND
A || (B && C) == A || B && C

// bỏ nested OR
A && (B || C) == !(!A || !B && !C)

```

Chúng ta có ví dụ ở trên sử dụng ternary operator để giải quyết các câu if lồng vào nhau.

ternary operator có độ ưu tiên thấp hơn các xử lý logic và tính toán  khác

```js
// câu này
A ? B + C && D : E || F && G

// sẽ chạy theo thứ tự sao
A ? ((B+C) && D) : (E || (F && G))
```

Nếu lồng nhiều ternary operator vào nhau nó sẽ chạy từ **phải qua trái**

```js
A ? B : C ? D : E ? F : G

// sẽ chạy theo thứ tự
(A ? B : (C ? D : (E ? F : G)))
```

Để thay đổi độ ưu tiên của nó trong expression chúng ta phải dùng dấu `()`

```js
// expresion
A ? B : (C ? D : E) ? F : G

// ưu tiên chạy sẽ là
(A ? B : ((C ? D : E) ? F : G))
```

Rất vui là bạn cũng đọc được tới đây của bài viết, nếu bạn đã hiểu hết những gì mình trình bày, Bravo, bạn là chuyên gia rồi, nếu chưa hiểu hết bạn nên đọc lại vài lần vì cách viết câu điều kiện và hiểu cách nó chạy như thế nào, thứ tự ra sao là kiến thức cực kỳ quan trọng để bạn đọc hiểu đưọc những đoạn code quá xá phức tạp của mấy bác Senior


<a href="https://hackernoon.com/conditional-javascript-for-experts-d2â456è67c" target="_blank" rel="noopener noreferrer">Conditional JavaScript for Experts</a>

