---
slug: "/2019-05-12-7-thu-thuat-trong-javascript"
date: "2019-05-12"
title: "7 thủ thuật trong javascript"
desc: "7 thủ thuật hữu ích trong javascript"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Lấy tất cả giá trị không giống nhau trong array](#l%E1%BA%A5y-t%E1%BA%A5t-c%E1%BA%A3-gi%C3%A1-tr%E1%BB%8B-kh%C3%B4ng-gi%E1%BB%91ng-nhau-trong-array)
- [Bỏ qua tất cả giá trị falsy](#b%E1%BB%8F-qua-t%E1%BA%A5t-c%E1%BA%A3-gi%C3%A1-tr%E1%BB%8B-falsy)
- [Tạo một object rỗng](#t%E1%BA%A1o-m%E1%BB%99t-object-r%E1%BB%97ng)
- [Merge object](#merge-object)
- [Yêu cầu parameter cho function](#y%C3%AAu-c%E1%BA%A7u-parameter-cho-function)
- [Destructuring và alias](#destructuring-v%C3%A0-alias)
- [Lấy giá trị query string](#l%E1%BA%A5y-gi%C3%A1-tr%E1%BB%8B-query-string)

<!-- /TOC -->

## Lấy tất cả giá trị không giống nhau trong array

```js
var j = [...new Set([1, 2, 3, 3, 2, 1])]
// 1,2,3
```

## Bỏ qua tất cả giá trị falsy 

Khi cần bỏ quá các giá trị falsy (`0`, `undefined`, `null`, `false`, ... ) khỏi một array

```js
MyArray.map(item => {
    // ...
}).filter(Boolean);
```

Đơn giản là đưa vào `Boolean` cho hàm filter


## Tạo một object rỗng

Tất nhiên chúng ta tạo một object rỗng bằng `{}` là chuyện ai cũng biết. Chuyện ít ai biết là với cách đó object tạo ra vẫn chứa `__proto__` và phương thức `hasOwnProperty`. Để thực sự tạo một object rỗng đúng chất rỗng

```js
let dict = Object.create(null);

// dict.__proto__ === "undefined"
```

## Merge object

Một trong những công việc bạn sẽ làm hàng ngày như ăn cơm bửa, có nhiều bài viết mình đã nhắc đến, nhưng nhắc lại vẫn là ko thừa.

```js
const person = { name: 'David Walsh', gender: 'Male' };
const tools = { computer: 'Mac', editor: 'Atom' };
const attributes = { handsomeness: 'Extreme', hair: 'Brown', eyes: 'Blue' };

const summary = {...person, ...tools, ...attributes};
/*
Object {
  "computer": "Mac",
  "editor": "Atom",
  "eyes": "Blue",
  "gender": "Male",
  "hair": "Brown",
  "handsomeness": "Extreme",
  "name": "David Walsh",
}
*/
```

## Yêu cầu parameter cho function

Bạn đã biết dùng parameter mặc định cho function nếu ko truyền vào, vậy ngược lại, bắt buộc cung cấp một parameter nào đó thì sao?

```js
const isRequired = () => { throw new Error('param is required') };

const hello = (name = isRequired()) => {
 console.log(`hello ${name}`)
}

// Lỗi ngay
hello();

// Lỗi luôn
hello(undefined);

// OK
hello(null);
hello('David');
```

## Destructuring và alias

Đây cũng chẳng có gì lạ nếu bạn đã nắm destructuring, chúng ta có thể đặt một tên khác để sử dụng

```js
const obj = { x: 1 };

// cách bình thường
const { x } = obj;

// dùng tên khác obj.x thành otherName
const { x: otherName } = obj;
```

Hay sử dụng cách nào khi bị trùng tên biến

## Lấy giá trị query string

Trước đây chúng ta có thể sử dụng regular expression để lấy query string, giờ chúng ta có cách chính thức thông qua hàm `URLSearchParams`

```js
// query string "?post=1234&action=edit"

var urlParams = new URLSearchParams(window.location.search);

console.log(urlParams.has('post')); // true
console.log(urlParams.get('action')); // edit
console.log(urlParams.getAll('action')); // ["edit"]
console.log(urlParams.toString());
// "?post=1234&action=edit" 
console.log(urlParams.append('active', '1'));
// "?post=1234&action=edit&active=1"
```

Nếu bạn còn trick nào hay ho khác, có thể chia sẽ cùng mọi người?


<a target="_blank" rel="noopener noreferrer" href="https://davidwalsh.name/javascript-tricks">7 Useful JavaScript Tricks</a>