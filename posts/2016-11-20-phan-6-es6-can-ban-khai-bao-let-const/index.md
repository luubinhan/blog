---
path: "/2016-11-20-phan-6-es6-can-ban-khai-bao-let-const"
date: "2016-11-20T13:35:13.234Z"
title: "Hồi 6: ES6 căn bản - Template literals"
desc: "Hồi 6 trong series ES6 căn bản, nói về khai báo biến với let và const"
tags: ["javascript"]
---

`let` dùng để khai báo một biến như `var`, khác nhau ở phạm vi hoạt động (scoping), ví dụ với khai báo `var`

```js
function isItTwo( value ) {
 if (value == 2){
  var two = true
 }
 return two
}
isItTwo(2)
// result: true
isItTwo('two')
// result: undefined
```

Đoạn khai báo `var two = true` nằm trong điều kiện `if` nhưng vẫn hoạt động, vì khai báo biến bằng từ khóa `var` phạm vi ngầm hiểu là trong cả một `function`, nó giống như viết như sau

```js
function isItTwo( value ) {
var two
 if (value == 2){
  two = true
 }
 return two
}
```

Khai báo biến bằng từ khóa `var` dễ rối so với các ngôn ngữ khác như `php`, khi biến được khai báo thì nó có phạm vi hoạt động *"block-scoped"*

```js
for ( let i = 0; i < 2; i++ ) {
 console.log(i)
 // 0,1
}
console.log(i)
// result: i is not defined
```

Khai báo biến bằng từ khóa `let` hay `const` có phạm vi *block-scoped*

```js
const pi = 3.1415
{
  const pi = 16
  console.log(pi)
  // 16
}
console.log(pi)
// 3.1415
```

Khi khai báo bằng từ khóa `const` phải có giá trị khởi tạo, không được phép để rỗng như `let`

```js
const pi = 3.1415
const e; // SyntaxError
```

Nếu dùng `const` để khai báo biến thì giá trị nó sẽ không được gán mới hoặc khởi tạo lại, nhưng có thể push thêm giá trị vào

```js
const people = ['An','Luu']
people = []
console.log(people)
// Result: ['An','Luu']
people.push('Binh')
console.log(people)
// Result['An','Luu','Binh']
```
