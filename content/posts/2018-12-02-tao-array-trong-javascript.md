---
slug: "/2018-12-02-tao-array-trong-javascript"
date: "2018-12-02"
title: "Tạo Array trong Javascript"
desc: "Cùng xem qua các cách để tạo một array mới"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Array Constructor](#array-constructor)
- [Tạo một array mới với độ dài cụ thể](#tạo-một-array-mới-với-độ-dài-cụ-thể)
- [Array.prototype.fill()](#arrayprototypefill)
- [Array.from()](#arrayfrom)
- [Spread Operator](#spread-operator)
- [Array.of()](#arrayof)
- [Convert sang Array](#convert-sang-array)

<!-- /TOC -->

## Array Constructor

Phương pháp phổ biến để tạo array là viết array literal 

```js
var arr = []
```

Cách ít ai xài hơn là dùng Array constructor

```js
// Truyền nhiều tham số
// Mỗi tham số là một giá trị của mảng
var array1 = new Array(1,2,3);
console.log(array1); // [1, 2, 3]
console.log(array1.length); // 3

// Nếu chỉ truyền vào 1 tham số
// Tạo mảng có số lượng item = tham số
// Tham số truyền vào phải là số nguyên dương
var array2 = new Array(3);
console.log(array2); // Array(3) {length: 3}
console.log(array2.length); // 3

// Truyền vào 1 tham số không phải là kiểu số
var array3 = new Array("3");

console.log(array3); // ["3"]
console.log(array3.length); // 1
```

## Tạo một array mới với độ dài cụ thể

```js
// thay vì viết new Array(5), chúng ta có thể bỏ new luôn
var array1 = Array(5);
console.log(array1.length); // 5

console.log(array[0]); // undefined
console.log(array[1]); // undefined
console.log(array[2]); // undefined
console.log(array[3]); // undefined
console.log(array[4]); // undefined

```

Ở ví dụ trên, bạn đừng nghĩ là mỗi key trong `array1` được gán cho giá trị là `undefined`. Thực ra các key này ko tồn tại.

```js
var array1 = Array(5);
var array2 = Array(1, 2, 3);

console.log(Object.getOwnPropertyNames(array1));
// => ["lenght"]

console.log(Object.getOwnPropertyNames(array2));
// => ["0", "1", "2", "length"]
```

Chúng ta sẽ không thể thực hiện các thao tác như `map()`, `filter()`, `reduce()`. Nếu như chúng ta muốn đưa giá trị 5 cho tất cả key trong `array1`, chúng ta cần dùng đến `fill()`

## Array.prototype.fill()

```js
var array1 = Array(5).fill(5);

console.log(array[0]); // 5
console.log(array[1]); // 5
console.log(array[2]); // 5
console.log(array[3]); // 5
console.log(array[4]); // 5

console.log(Object.getOwnPropertyNames(array1));
// => ["0", "1", "2", "3", "4", "length"]
```

Lưu ý là hàm `fill()` chỉ có trong ES6


## Array.from()

Sử dụng `Array.from()` để tạo mới, hoặc shallow-copy của một Array khác

```js
var array1 = Array.from(new Array(5));

console.log(array[0]); // undefined
console.log(array[1]); // undefined
console.log(array[2]); // undefined
console.log(array[3]); // undefined
console.log(array[4]); // undefined
// Mỗi element sẽ có giá trị là undefined
console.log(Object.getOwnPropertyNames(array1));
// => ["0", "1", "2", "3", "4", "length"]
```

`undefined` là một giá trị nhé, chứ không phải nó không tồn tại. Chúng ta vẫn có thể loop qua được.

Một điểm cũng nên lưu ý với hàm `Array.from` là nó nhận một argument thứ 2, dùng như `map`, ta có thể viết lại

```js
var array1 = Array.from(Array(5), (x, index) => index + 1);

console.log(array[0]); // 1
console.log(array[1]); // 2
console.log(array[2]); // 3
console.log(array[3]); // 4
console.log(array[4]); // 5
```

## Spread Operator

Kết quả sẽ giống như gọi `Array.from()`

```js
var array1 = [...new Array(5)];

console.log(array[0]); // undefined
console.log(array[1]); // undefined
console.log(array[2]); // undefined
console.log(array[3]); // undefined
console.log(array[4]); // undefined
console.log(Object.getOwnPropertyNames(array1));
// => ["0", "1", "2", "3", "4", "length"]
```

## Array.of()

Kết quả khi tạo một array bằng `Array.of()` cũng tương tự như viết constructor. Điểm khác duy nhất là cách nó xử lý khi chỉ truyền 1 tham số integer

Câu `Array.of(5)` tạo một array với 1 item giá trị là 5, trong khi new `Array(5)` tạo array với 5 element

```js
var array1 = Array.of(5); // [5]
var array2 = Array(5); // Array(5) {length: 5}
```

## Convert sang Array

Bạn chắc biết đến `arguments` object  trong function, một object **dạng** array có thể được truy xuất trong các function của javascript, nó chứa các tham số truyền vào trong function

Mặc dù khá giống với array bình thường, nhưng nó lại không truy xuất được các phương thức của `Array.prototype`. Javascript có những thứ điên khùng lắm các bạn, **giống như array** nhưng éo phải array

Trước khi ES6 ra đời, chúng ta sẽ dùng cách này để convert `arguments` sang array

```js
function sum() {
  // convert arguments sáng array và lưu lại trong args
  var args = Array.prototype.slice.call(arguments);

  // thực hiện cộng dồn
  return args.reduce(function(sum, x)) {
    return sum + parseInt(x);
  }, 0);
}
console.log(sum(1,2,3,4,5)); // 15
```

Với `Aray.from()` và spread operator, chúng ta có cách nhanh chóng hơn để convert

```js
// Array.from()
var args = Array.from(arguments);
// Spread operator
var args = [...arguments];
```

Chúng ta cũng có thể áp dụng cách trên cho các đối tượng `iterables`

```js
var string = "String";
var array = [1, 2, 3];

console.log([...string]);
// ["S", "t", "r", "i", "n", "g"]
console.log([...array.entries()]);

// [[0, 1], [1, 2], [2, 3]]
```

<a target="_blank" rel="noopener noreferrer" href="https://medium.freecodecamp.org/https-medium-com-gladchinda-hacks-for-creating-javascript-arrays-a1b80cb372b">Hacks for Creating JavaScript Arrays</a>
