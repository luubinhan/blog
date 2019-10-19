---
slug: "/2019-10-14-huong-dan-dat-ten-bien-trong-javascript"
date: "2019-10-14"
title: "Đặt tên sao cho đẹp trong javascript"
desc: "Cách nguyên tắc chung khi đặt tên trong javascript"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Tên biến](#t%C3%AAn-bi%E1%BA%BFn)
- [Biến Boolean](#bi%E1%BA%BFn-boolean)
- [Đặt tên class](#%C4%91%E1%BA%B7t-t%C3%AAn-class)
- [Đặt tên hàm, phương thức của một class](#%C4%91%E1%BA%B7t-t%C3%AAn-h%C3%A0m-ph%C6%B0%C6%A1ng-th%E1%BB%A9c-c%E1%BB%A7a-m%E1%BB%99t-class)
- [Phương thức, biến cục bộ](#ph%C6%B0%C6%A1ng-th%E1%BB%A9c-bi%E1%BA%BFn-c%E1%BB%A5c-b%E1%BB%99)
- [Hằng số](#h%E1%BA%B1ng-s%E1%BB%91)
- [Dash](#dash)

<!-- /TOC -->

## Tên biến

Trong Javascript, tên biến **phân biệt hoa thường**

```js
var name = 'Vui Lap Trinh';
var Name = 'Lap Trinh Vui';
var NAME = 'Trinh Lap Vui';
console.log(name);
// "Vui Lap Trinh"
console.log(Name);
// "Lap Trinh Vui"
console.log(NAME);
// "Trinh Lap Vui"
```

Tên biến cần phải rõ nghĩa, không cần phải ghi chú gì thêm, nhìn vào tên biến là có thể biết được nó chứa thông tin gì

```js
❌ Không ngon
var value = 'Vui';
❌ Không ngon
var val = 'Vui';

✅ Chuẩn cơm mẹ nấu
var firstName = 'Vui';
```

Viết Javascript được khuyến khích sử dụng tên biến theo kiểu con lạc đà

```js
❌ Không ngon
var firstname = 'Vui';
❌ Không ngon
var first_name = 'Vui';
❌ Không ngon
var FIRSTNAME = 'Vui';
❌ Không ngon
var FIRST_NAME = 'Vui';

✅ Chuẩn cơm mẹ nấu
var firstName = 'Vui';
```

Các trường hợp ngoài lệ, có luật riêng là hằng số, biến cục bộ, class, component

## Biến Boolean

Với biến mang giá trị là Boolean (true/false, 0/1), thêm tiền tố **is**, **has**, **are**

```js
❌ Không ngon
var visible = true;

✅ Chuẩn cơm mẹ nấu
var isVisible = true;

❌ Không ngon
var equal = false;

✅ Chuẩn cơm mẹ nấu
var areEqual = false;

❌ Không ngon
var encryption = true;

✅ Chuẩn cơm mẹ nấu
var hasEncryption = true;
```

## Đặt tên class

Tên class được đặt theo kiểu PascalCase

```js
class FrontendDeveloper {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
var me = new FrontendDeveloper('Vui', 'Lap Trinh');
```

## Đặt tên hàm, phương thức của một class

Hàm cũng đặt tên theo con lạc đà, tốt nhất nên diễn đạt hàm đó **làm** gì bằng cách thêm một tiền tố là một **động từ**

```js
❌ Không ngon
function name(firstName, lastName) {
  return `${firstName} ${lastName}`;
}

✅ Chuẩn cơm mẹ nấu
function getName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}
```

Một số tiền tố hay được sử dụng là: `get`, `fetch`, `push`, `apply`, `calculate`, `compute`, `post`

```js{7-9}
class FrontendDeveloper {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  // ✅ Chuẩn cơm mẹ nấu
  getName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
var me = new FrontendDeveloper('Vui', 'Lap Trinh');
console.log(me.getName());
// "Vui Lap Trinh"
```

## Phương thức, biến cục bộ

Thêm tiền tố `_` vào trước biến, phương thức cục bộ của một class

```js
class FrontendDeveloper {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.name = _getName(firstName, lastName);
  }
  _getName(firstName, lastName) {
    return `${firstName} ${lastName}`;
  }
}
var me = new FrontendDeveloper('Vui', 'Lap Trinh');

✅ Chuẩn cơm mẹ nấu
var name = me.name;
console.log(name);
// "Vui Lap Trinh"

❌ Không ngon
name = me._getName(me.firstName, me.lastName);
console.log(name);
// "Vui Lap Trinh"
```

## Hằng số

Viết hoa tất cả nếu nó là hằng số

```js
const SECONDS = 60;
const MINUTES = 60;
const HOURS = 24;
const DAY = SECONDS * MINUTES * HOURS;
```

## Dash

Javascript không dùng ưa gì ký tự `-`, tránh sử dụng `-` khi khai báo

```js
❌ Không ngon
var person = {
  'first-name': 'Vui',
  'last-name': 'Lap Trinh',
};
var firstName = person['first-name'];

✅ Chuẩn cơm mẹ nấu
var person = {
  firstName: 'Vui',
  lastName: 'Lap Trinh',
};
var firstName = person.firstName;
```

<a target="_blank" rel="noopener noreferrer" href="https://www.robinwieruch.de/javascript-naming-conventions">📜 JavaScript Naming Conventions</a>
