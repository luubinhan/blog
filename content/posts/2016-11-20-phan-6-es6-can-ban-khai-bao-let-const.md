---
slug: "/2016-11-20-phan-6-es6-can-ban-khai-bao-let-const"
date: "2016-11-20"
title: "Hồi 6: ES6 căn bản - Khai báo biến với let và const"
desc: "Hồi 6 trong series ES6 căn bản, nói về khai báo biến với let và const"
category: "javascript"
cover: ""
type: "post"
lesson: 1
chapter: 6
tags: ["javascript"]
---

Trong Series này

1. [Nâng cấp cho Object](/2016-11-15-chuong-1-es6-can-ban)
2. [Arrow function](/2016-11-16-chuong-2-es6-can-ban-arrow-function/)
3. [Assignment Destruction](/2016-11-17-phan-3-es6-can-ban-assignment-destructuring)
4. [Rest parameters và spread operator](/2016-11-18-phan-4-es6-can-ban-rest-parameters-va-spread-operator)
5. [Template literals](/2016-11-19-phan-5-es6-can-ban-template-literals)
6. [Khai báo biến với let và const](/2016-11-20-phan-6-es6-can-ban-khai-bao-let-const)
7. [Căn bản class](/2016-11-21-phan-7-es6-can-ban-classes)

`let` dùng để khai báo một biến như `var`, khác nhau ở phạm vi hoạt động (scope), ví dụ với khai báo `var`

```js
function isItTwo(value) {
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

Đoạn khai báo `var two = true` nằm trong điều kiện `if` nhưng vẫn hoạt động, vì khai báo biến bằng từ khóa `var` có scope là `function`, chứ không có scope là block `{}` như các ngôn ngữ khác (như PHP)

```js
function isItTwo( value ) {
	var two
    if (value == 2){
        two = true
    }
	return two
}
```

```js
for ( let i = 0; i < 2; i++ ) {
 console.log(i)
 // 0,1
}
console.log(i)
// result: i is not defined
```

Khai báo biến bằng từ khóa `let` hay `const` có *block-scope*

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

Nếu dùng `const` để khai báo biến thì giá trị nó sẽ **không được gán mới hoặc khởi tạo lại**, nhưng có thể  thêm giá trị vào

```js
const people = ['An','Luu']
people = []
console.log(people)
// Result: ['An','Luu']
people.push('Binh')
console.log(people)
// Result['An','Luu','Binh']
```

## Tổng kết

|       | GẮN LẠI | KHAI BÁO LẠI | FUNCTION SCOPE | BLOCK SCOPE | GLOBAL SCOPE |
| ----- | ------- | ------------ | -------------- | ----------- | ------------ |
| var   | ✅       | ✅            | ✅              | ❌           | ✅            |
| let   | ✅       | ❌            | ✅              | ✅           | ❌            |
| const | ❌       | ❌            | ✅              | ✅           | ❌            |

