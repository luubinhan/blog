---
slug: "/2018-10-19-gioi-thieu-typeof-trong-javascript-cho-nguoi-moi-bat-dau"
date: "2018-10-19"
title: "Giới thiệu typeof trong Javascript cho người mới bắt đầu"
desc: "Hiểu cách hoạt động của typeof, một số vấn đề liên quan đến check type"
cover: "https://cdn-images-1.medium.com/max/2000/1*j6B7Q6KRIhgNZQuSkVkP_w.jpeg"
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

Trong javascript, chuyện lúc đầu biến được khai báo dạng `string`, rồi sau đó được gán lại thành một dạng reference đến `object` là bình thường. Vì vậy việc kiểm tra type khi viết javascript là rất quan trọng.

# Các kiểu (type) dữ liệu trong javascript

Trước khi đi vào cách sử dụng `typeof`, cùng nhìn lại các kiểu dữ liệu trong javascript

Có tất cả 6 kiểu được định nghĩa sẵn trước ES6, ES6 bổ sung thêm kiểu `Symbol`
1. String
2. Number
3. Boolean - giá trị `true` hoặc `false`
4. null
5. undefined
6. Symbol
7. Object


Được chia ra làm 2 nhóm: **primitive type** và **reference type**, nếu bạn đang thắc mắc, ủa vậy `array`, `function`, `regular expression` đâu, nó được xem là một dạng đặc biệt của `object`, 

- `array` các phần tử được xếp theo thứ tự tăng dần, được hỗ trợ thêm một số cú pháp, hàm đặc biệt.
- Function cũng là một dạng object đặc biệt, có phần **ruột** (bên trong dấu Ơ}) sẽ được chạy khi gọi đến.
- Date, RegExp, Error là một constructor của các object đặc biệt.

# Cách sử dụng `typeof`

Kết quả trả về sẽ là `string` đại diện cho tên kiểu dữ liệu

```js
Typeof 53; // "number"
```

Để check kết quả trả về của một expression

```js
Typeof(typeof 53); // "string"
```

*Lưu ý* Trước thời ES6, câu `typeof` luôn trả về `string`, với các biến chưa được khai báo, nó sẽ trả về "undefined" chứ không quăng ra lỗi `ReferenceError`

```js
console.log(undeclaredVariable === undefined); // ReferenceError
console.log(typeof undeclaredVariable === 'undefined'); // true
```

Tuy nhiên, trong ES6, nếu sử dụng khai báo let, const, nó sẽ vẫn quăng ra lỗi `ReferenceError` bên trong block-scope

```js
// Before block-scoped identifier: typeof => ReferenceError

console.log(typeof tdzVariable === 'undefined'); // ReferenceError

const tdzVariable = 'I am initialized.';
```

# Một số câu check thông dụng

```js

console.log(typeof ""); // "string"
console.log(typeof "hello"); // "string"
console.log(typeof String("hello")); // "string"
console.log(typeof new String("hello")); // "object"

console.log(typeof 0); // "number"
console.log(typeof -0); // "number"
console.log(typeof 0xff); // "number"
console.log(typeof -3.142); // "number"
console.log(typeof Infinity); // "number"
console.log(typeof -Infinity); // "number"
console.log(typeof NaN); // "number"
console.log(typeof Number(53)); // "number"
console.log(typeof new Number(53)); // "object"

console.log(typeof true); // "boolean"
console.log(typeof false); // "boolean"
console.log(typeof new Boolean(true)); // "object"

console.log(typeof undefined); // "undefined"

console.log(typeof null); // "object"

console.log(typeof Symbol()); // "symbol"

console.log(typeof []); // "object"
console.log(typeof Array(5)); // "object"

console.log(typeof function() {}); // "function"
console.log(typeof new Function); // "function"

console.log(typeof new Date); // "object"

console.log(typeof /^(.+)$/); // "object"
console.log(typeof new RegExp("^(.+)$")); // "object"

console.log(typeof {}); // "object"
console.log(typeof new Object); // "object"
```

Trong tất cả các trường hợp dùng constructor bằng `new`, nó luôn trả về "object". Chỉ có function là trả về "function"

# Một số lựa chọn khác

Trong ví dụ trên, `null`, `[]` đều trả về "object". Để phân biệt, thì có thể sử dụng kết hợp với `instanceof`, `constructor`, `toString()`

## Kiểm tra null

Cách tốt nhất để check null

```js
function isNull(value) {
  return value === null;
}
```

Luôn nhớ sử dụng `===`, chứ không dùng 2 dấu `==`

```js
console.log(undefined == null); // true
console.log(undefined === null); // false
```

## Kiểm tra NaN

`NaN` là một giá trị đặc biệt khi một phép tính không thức hiện được, ví dụ `0/0 => NaN`

Nếu sử dụng `typeof` để kiểm tra `NaN` nó sẽ trả về "number", có thể sử dụng hàm `isNaN()` hoặc `Number.isNaN()`

```js
console.log(isNaN(NaN)); // true
console.log(isNaN(null)); // false
console.log(isNaN(undefined)); // true
console.log(isNaN(Infinity)); // false

console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN(null)); // false
console.log(Number.isNaN(undefined)); // false
console.log(Number.isNaN(Infinity)); // false
```

Điều đặc biệt của `NaN` nữa đó là nó là giá trị duy nhất trong javascript ko bằng với bất kỳ giá trị nào khác khi so sánh, thậm chí chính nó.

```js
var x = NaN;

console.log(x == NaN); // false
console.log(x === NaN); // false
```

# Kiểm tra mảng

Nếu dùng `typeof someArray` nó sẽ trả về "object", cách khác để kiểm tra biến có là mảng không

```js

// CÁCH 1: Object.prototype.toString()
// Tương tự ES6 Array.isArray()
function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
}

// CÁCH 2 : ES6 Array.isArray()
function isArray(value) {
  return Array.isArray(value);
}
```

Phương thức `Object.prototype.toString()` rất hữu dụng để kiểm tra kiểu của `object`

```js
function type(value) {
  var regex = /^\[object (\S+?)\]$/;
  var matches = Object.prototype.toString.call(value).match(regex) || [];
  
  return (matches[1] || 'undefined').toLowerCase();
}
```

Ví dụ sử dụng hàm `type` này

```js
console.log(type('')); // "string"
console.log(type('hello')); // "string"
console.log(type(String('hello'))); // "string"
console.log(type(new String('hello'))); // "string"

console.log(type(0)); // "number"
console.log(type(-0)); // "number"
console.log(type(0xff)); // "number"
console.log(type(-3.142)); // "number"
console.log(type(Infinity)); // "number"
console.log(type(-Infinity)); // "number"
console.log(type(NaN)); // "number"
console.log(type(Number(53))); // "number"
console.log(type(new Number(53))); // "number"

console.log(type(true)); // "boolean"
console.log(type(false)); // "boolean"
console.log(type(new Boolean(true))); // "boolean"

console.log(type(undefined)); // "undefined"

console.log(type(null)); // "null"

console.log(type(Symbol())); // "symbol"
console.log(type(Symbol.species)); // "symbol"

console.log(type([])); // "array"
console.log(type(Array(5))); // "array"

console.log((function() { return type(arguments) })()); // "arguments"

console.log(type(function() {})); // "function"
console.log(type(new Function)); // "function"

console.log(type(class {})); // "function"

console.log(type({})); // "object"
console.log(type(new Object)); // "object"

console.log(type(/^(.+)$/)); // "regexp"
console.log(type(new RegExp("^(.+)$"))); // "regexp"

console.log(type(new Date)); // "date"
console.log(type(new Set)); // "set"
console.log(type(new Map)); // "map"
console.log(type(new WeakSet)); // "weakset"
console.log(type(new WeakMap)); // "weakmap"
```

# Ghi chú cuối: không phải cái gì cũng là object

Nếu đã từng nghe ai đó phát biểu: *mọi thứ trong javascript có thể xem là object*, câu này sai, **Primitive** không phải object.

Nếu có thắc mắc, nếu không phải object, vậy tại sao chúng ta có thể làm được

- ("Hello world!").length
- ("Another string")[8] - lấy ký tự thứ 8 vía string
- (53.12345).toFixed(2) - gọi đến phương thức Number.prototype.toFixed()

Lý do chúng ta có thể làm được là vì javascript tạo một object wrapper cho kiểu primitive

Khi giá trị được trả về, wrapper object bị xoá khỏi bộ nhớ. Javascript đã làm những chuyện sau


```js
// wrapper object: new String("Hello World!")
(new String("Hello World!")).toLowerCase();

// wrapper object: new String("Another String")
(new String("Another String"))[8];

// wrapper object: new Number(53.12345)
(new Number(53.12345)).toFixed(2);
```



[https://blog.logrocket.com/javascript-typeof-2511d53a1a62](https://blog.logrocket.com/javascript-typeof-2511d53a1a62)