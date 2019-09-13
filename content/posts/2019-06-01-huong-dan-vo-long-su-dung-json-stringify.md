---
slug: "/2019-06-01-huong-dan-vo-long-su-dung-json-stringify"
date: "2019-06-01"
title: "JSON.stringify vở lòng cho người mới"
desc: "Một trong hàm kinh điển bắt buộc phải biết của mội frontend developer"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "hoc-thuat"]
---

<!-- TOC -->

- [Trường hợp đặc biệt và lỗi](#tr%C6%B0%E1%BB%9Dng-h%E1%BB%A3p-%C4%91%E1%BA%B7c-bi%E1%BB%87t-v%C3%A0-l%E1%BB%97i)
- [Các tham số còn lại của `JSON.stringify`](#c%C3%A1c-tham-s%E1%BB%91-c%C3%B2n-l%E1%BA%A1i-c%E1%BB%A7a-jsonstringify)
- [Hàm `toJSON()`](#h%C3%A0m-tojson)

<!-- /TOC -->

`JSON.stringify` là hàm kinh điển để chuyển một object trong javascript sang JSON. Bài viết này sẽ nhìn lại những kiến thức vở lòng của `JSON.stringify`

```js
const obj = { answer: 42 }

const str = JSON.stringify(obj);

// '{"answer":42}'
// typeof str = string
```

`JSON.stringify` hay sử dụng chung với `JSON.parse`. Đây là cách chúng ta có thể sao chép một object trong javascript (không bị dính trường hợp reference đến object cũ)

```js
const obj = { answer: 42 }

const clone = JSON.parse(JSON.stringify(obj));

// clone.answer = 42
// clone !== obj
```

## Trường hợp đặc biệt và lỗi

Khi object `obj` có 1 property mà giá trị là `obj` (trỏ về chính nó), `JSON.stringify` trả về một error

```js
const obj = {}

obj.answer = obj;

JSON.stringify(obj);
// TypeError: TypeError: Converting circular structure to JSON
```

Các trường hợp đặc biệt như `NaN` và `Infinity`, `JSON.stringify` sẽ chuyển về `null`, chứ ko trả lỗi

```js
const obj = { nan: parseInt('not a number'), inf: Number.POSITIVE_INFINITY };

JSON.stringify(obj);

// '{"nan": null, "inf": null}'
```

Nó cũng sẽ lọc bỏ hết các property giá trị là `undefined` hoặc function

```js
const obj = { fn: function() {}, undef: undefined };
JSON.stringify(obj); 
// '{}'
```

## Các tham số còn lại của `JSON.stringify`

`JSON.stringify` nhận vào 3 tham số, đa phần chúng ta ít biết tới 2 tham số còn lại.

Tham số thứ 2 là `replacer`, một hàm nhận vào cặp `key/value` có thể dụng để thay đổi giá trị output sau cùng.

```js
const obj = { a: 1, b: 2, c: 3, d: { e: 4 } };

// nếu giá trị là number, cộng thêm 1
JSON.stringify(obj, function replacer(key, value) {
  if (typeof value === 'number') {
    return value + 1;
  }
  return value;
});
// '{"a":2,"b":3,"c":4,"d":{"e":5}}'
```

Tham số thứ 3 là `spaces`, cho phép format lại output theo dạng dễ đọc

```js
const obj = { a: 1, b: 2, c: 3, d: { e: 4 } };

JSON.stringify(obj);
// '{"a":1,"b":2,"c":3,"d":{"e":4}}'

JSON.stringify(obj, null, '  ');
JSON.stringify(obj, null, 2); // kết quả tương tự
// {
//   "a": 1,
//   "b": 2,
//   "c": 3,
//   "d": {
//     "e": 4
//   }
// }

// Ko nhất thiết phải là dấu khoảng trắng
JSON.stringify(obj, null, '__');
// {
// __"a": 1,
// __"b": 2,
// __"c": 3,
// __"d": {
// ____"e": 4
// __}
// }
```

Ví dụ như ta có thể để lọc bỏ các dữ liệu nhạy cảm như password

```js
const obj = {
  name: 'Jean-Luc Picard',
  password: 'stargazer',
  nested: {
    hashedPassword: 'c3RhcmdhemVy'
  }
};
JSON.stringify(obj, function replacer(key, value) {
  if (key.match(/password/i)) {
    return undefined;
  }
  return value;
});
// '{"name":"Jean-Luc Picard","nested":{}}'
```

## Hàm `toJSON()`

Khi đi qua các property trong object, nếu bên trong object có hàm `toJSON()`, `JSON.stringify` dùng giá trị trả về của hàm này

```js
const obj = {
  name: 'Jean-Luc Picard',
  nested: {
    test: 'not in output',
    toJSON: () => 'test'
  }
};
JSON.stringify(obj);
// '{"name":"Jean-Luc Picard","nested":"test"}'
```

Rất nhiều thư viện sử dụng `JSON.stringify()` kết hợp với `toJSON()` để đảm bảo output lúc serialize ra đúng như mong muốn (như [Moment JS](https://momentjs.com/docs/#/displaying/as-json/)

<a target="_blank" rel="noopener noreferrer" href="http://thecodebarbarian.com/the-80-20-guide-to-json-stringify-in-javascript.html">The 80/20 Guide to JSON.stringify in JavaScript</a>
