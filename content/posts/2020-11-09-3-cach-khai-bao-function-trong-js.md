---
slug: "2020-11-09-3-cach-khai-bao-function-trong-js"
date: "2020-11-09"
title: "Các cách khai báo function trong JS"
desc: ""
tags: ["javascript", "hoc-thuat"]
canonical_url: false
---

## Khai báo tường minh

Cách khai báo function “vở lòng” mà ai cũng phải biết, sau từ khóa `function` là tên function chúng ta muốn khai báo

```js
function foo() {
	console.log("vui lap trinh")
}
```
## Gán function vào một biến

Chúng ta khai báo một biến, gán giá trị của biến này là một function

```js
const foo = function () {
	console.log("vui lap trinh")
}
```

Với cách này, lưu ý là **không dùng function trước khi khai báo**, giống như chúng ta không thể dùng một biến mà chưa được khai báo vậy.

```js
foo(); // Uncaught ReferenceError: foo is not defined

const foo = function() {
   console.log("vui lap trinh")

}
```

## Arrow function
Khai báo function bằng dấu `=>` mũi tên, bên trái là params của function, bên phải là phần *ruột* function
```js
() => console.log("vui lap trinh")

// hoặc bỏ luôn ngoặc kép
['An', 'luckyluu', 'vui', 'laptrinh']
  .filter(name => name.length > 5)
  .map(name => name.toLowerCase())
```

Lưu ý cho arrow function, sẽ không có

- object đặc biệt `arguments`, các function khác sẽ có cái object tên là `arguments` chứa các tham số truyền vào cho function đó
- Ko có gọi `new (() => {})`
- Không có `this`, `super`, `new.target`

## constructor

Ko được khuyến khích sử dụng, đọc cho vui

```js
const myStrangeFunc = new Function("a", "console.log(a + ' with Functions')");
myStrangeFunc("Fun"); // logs --> "Fun with Functions"
```

3 thằng còn lại, cũng không phổ biến, chưa thấy giá trị sử dụng

- generator function expression

- generator function declaration

- GeneratorFunction constructor

  Nếu có đam mê bạn có thể tìm hiểu thêm