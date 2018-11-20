---
slug: "/2018-11-20-mot-vai-tip-hay-su-dung-trong-javascript"
date: "2018-11-20"
title: "Một vài tips rất hay sử dụng trong javascript"
desc: "Tổng hợp một số cú pháp, cách viết hay dùng hằng ngày"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---



## Giá trị: `truthy` và `falsy`

Đa phần ai cũng biết các kiểu dữ liệu của javascript như `object`, `array`, `Boolean`, `string` mà ko biết trong javascript có tồn tại khái niệm gọi là `truthy` và `falsy`

Khi cần giá trị `true/false`, truthy sẽ được đưa về `true` và `falsy` đưa về `false`

Các giá trị thuộc nhóm `falsy`

> 0, -0, null, undefined, ‘’, NaN

Để lấy giá trị Boolean, có thể dùng `!!`

```js
// FALSY VALUES

console.log(!!0); // false
console.log(!!-0); // false
console.log(!!''); // false
console.log(!!false); // false
console.log(!!NaN); // false
console.log(!!null); // false
console.log(!!undefined); // false

// TRUTHY VALUES

console.log(!!+Infinity); // true
console.log(!!-Infinity); // true
console.log(!![]); // true
console.log(!!{}); // true
console.log(!!new String('')); // true
console.log(!!new RegExp('')); // true
console.log(!!'Non-empty'); // true
```

Như vậy chúng ta có thể viết lại

```js
if (person !== null) { ... }

// có thể viết lại
if (person) { ... }
```

## Chuyển đổi: Number và String

Các phép toán trong javascript `+`, `-`, `*`, `\` yêu cầu cả 2 vế đều là number, nếu không phải thì nó tự chuyển qua number. Tuy nhiên trong javascript thì dấu `+` còn dùng để nối chuỗi, nên trường hợp gặp String nó sẽ ưu tiên chuyển thành String

```js
console.log(100 + 50); // 150
console.log(100 - 50); // 50

console.log('100' + 50); // "10050"
console.log('100' - 50); // 50

console.log(null + 50); // 50
console.log(null - 50); // -50

console.log(void 0 + 50); // NaN
console.log(void 0 - 50); // NaN

console.log(true + 50); // 51
console.log(true - 50); // -49

console.log(false + 50); // 50
console.log(false - 50); // -50

console.log([] + 50); // "50"
console.log([] - 50); // -50

console.log([100] + 50); // "10050"
console.log([100] - 50); // 50

console.log({} + 50); // "[object Object]50"
console.log({} - 50); // NaN

console.log(new Date + 1000); // "Thu May 31 2018 18:27:51 GMT+0100 (WAT)1000"
console.log(new Date - 1000); // 1527787670595
```

Sự khác biệt này nguyên nhân là do thứ tự mà javascript gọi `toString()` và `valueOf()` trên object khi cần convert sang kiểu giá trị primitive

Trong trường hợp luôn thực hiện kiểu convert sang số

```js
console.log(+'100'); // 100

console.log(+null); // 0
console.log(+void 0); // NaN

console.log(+true); // 1
console.log(+false); // 0

console.log(+[]); // 0
console.log(+[100]); // 100
console.log(+[100, 50]); // NaN

console.log(+{}); // NaN

console.log(+new Date); // 1527790306576
```

Thêm dấu `+` vào trước nó sẽ tương tự như sử dụng hàm `Number()` để convert

```js
+new Date === Number(new Date); // true
```

Cũng có thể dùng `+` để chuyển kiểu số sang string, bằng cách ghép với 1 chuỗi rỗng

```js
console.log(100 + ''); // "100"

console.log(null + ''); // "null"
console.log(void 0 + ''); // "undefined"

console.log(true + ''); // "true"
console.log(false + ''); // "false"

console.log([] + ''); // ""
console.log([100] + ''); // "100"
console.log([100, 50] + ''); // "100,50"

console.log({} + ''); // "[object Object]"

console.log(new Date + ''); // "Thu May 31 2018 19:28:09 GMT+0100 (WAT)"
```

Có thể hiểu nó sẽ chạy như sau

```js
([100, 50] + '') === String([100, 50]); // true
```

## Short-Circuiting

`&&` trả về giá trị của mệnh đề đầu nếu nó là `falsy`, và ngược lại thì trả về giá trị mệnh đề 2

Sử dụng `&&` để thay thế câu điều kiện đơn giản

```js
// Cách 2
if (person) {
  fetchProfile(person);
}

// Cách 2
person && fetchProfile(person);
```

Lưu ý là short-circuiting sẽ trả về một giá trị vì nó là expression, có thể lưu lại kết quả này vào biến

```js
var personProfile = person && fetchProfile(person);
```

`||` trả về giá trị mệnh đề đầu nếu là `truthy`, không thì trả về giá trị mệnh đề 2

Có thể dùng để làm giá trị `fallback`

```js
// Cách 1
let requestAnimFrame = null;

if (window.requestAnimationFrame) {
  requestAnimFrame = window.requestAnimationFrame;
}

else if (window.webkitRequestAnimationFrame) {
  requestAnimFrame = window.webkitRequestAnimationFrame;
}

else if (window.mozRequestAnimationFrame) {
  requestAnimFrame = window.mozRequestAnimationFrame;
}

// Cách 2
const requestAnimFrame2 = (
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  null
);
```

Thêm một ví dụ nữa với `&&` và `||` để trả về giá trị boolean

```js
const booleanOrFalse = value => (typeof value == 'boolean') && value;

const booleanOrTrue = value => (typeof value != 'boolean') || value;

console.log(booleanOrFalse(true)); // true
console.log(booleanOrFalse(false)); // false
console.log(booleanOrFalse(1)); // false
console.log(booleanOrFalse(0)); // false
console.log(booleanOrFalse('String')); // false
console.log(booleanOrFalse({})); // false
console.log(booleanOrFalse([])); // false

console.log(booleanOrTrue(true)); // true
console.log(booleanOrTrue(false)); // false
console.log(booleanOrTrue(1)); // true
console.log(booleanOrTrue(0)); // true
console.log(booleanOrTrue('String')); // true
console.log(booleanOrTrue({})); // true
console.log(booleanOrTrue([])); // true
```

## Câu điều kiện rút gọn

```js
(condition) ? (return value if truthy) : (return value if falsy)
```

Sử dụng thực tế

```js
// Cách 1
if (loggedIn) {
  showUserProfile();
} else {
  showLoginForm();
}

// Cách 2
loggedIn ? showUserProfile() : showLoginForm();
```

Nested nó thì thế này

```js
a ? b : c ? d : e ? f : g
```
Nó sẽ chạy như sau

```js
(a ? b : (c ? d : (e ? f : g)))
```

Có thể dùng để thay câu if...else if... else 

```js
var MIN_VALUE = 1;
var MAX_VALUE = 5;

// Cách 1
function boundedValue(val) {
  if (val > MAX_VALUE) {
    return MAX_VALUE;
  } else if (val < MIN_VALUE) {
    return MIN_VALUE;
  } else {
    return val;
  }
}

// Cách 2
function boundedValue(val) {
  return (val > MAX_VALUE) ? MAX_VALUE : (val < MIN_VALUE) ? MIN_VALUE : val;
}

boundedValue(0); // 1
boundedValue(3); // 3
boundedValue(7); // 5
```

## Hàm random hay dùng

Tạo một số ngẫu nhiên trong khoản từ 1 đến giá trị truyền vào.

```js
function randomInteger(maxvalue) {
  return 1 + Math.floor(Math.random() * maxvalue);
}
```


<a href="https://codeburst.io/cool-javascript-shortcuts-and-tips-for-everyday-use-66cd174ab216" target="_blank" rel="noopener noreferrer">Cool JavaScript Shortcuts and Tips for Everyday Use</a>
