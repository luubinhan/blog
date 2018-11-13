---
slug: "/2018-11-13-copy-mot-object-trong-javascript.md"
date: "2018-11-13"
title: "Copy object trong javascript"
desc: "Luận bàn các cách mà chúng ta copy một object trong javascript, shallow copy và deep copy"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

Chúng ta đã biết object trong javascript là một con trỏ đến địa chỉ trên memory, copy 1 object sẽ là 2 biến trỏ tới cùng một địa chỉ memory

```javascript{numberLines: true}
var foo = {
    a: "luubinhan"
}
console.log(foo.a); // luubinhan
var bar = foo;
console.log(bar.a); // luubinhan

foo.a = "github";
console.log(foo.a); // github
console.log(bar.a); // github

bar.a = "google.com";
console.log(foo.a); // google.com
console.log(bar.a); // google.com
```

Có thể thấy là việc thay đổi 1 trong 2 biến `foo`, `bar` sẽ ảnh hưởng qua lại lẫn nhau, khi muốn thực hiện copy một object trong javascript phải hết sức cẩn thận

## Shallow copy

Nếu các property bên trong của object là một [giá trị primitive type](/2017-09-25-10-khai-niem-javascript-can-biet/), có thể thực hiện copy nhanh (shallow)

```js
var obj = { foo: "foo", bar: "bar" };

// cách 1
var copy = { ...obj };
// cách 2
var copy2 = Object.assign({}, obj);
```

Nếu bên trong object là một tham chiếu khác, thì việc copy này sẽ cũng tương tự như `var bar = foo`

```js
var foo = {a: 0, b: {c: 0}};
var copy = {...foo};

copy.a = 1;
copy.b.c = 2;

console.dir(foo); // {a: 0, b: {c: 2}}
console.dir(copy); // {a:1, b: {c: 2}}
```

## Deep copy

Để tránh tình huống này xảy ra, chúng ta sẽ muốn thực hiện cái gọi là deep copy, trước tiên là serialize thành string rồi deserialize ngược lại

```js
var obj = {a: 0, b: {c: 0}};
var copy = JSON.parse(JSON.stringify(obj));
```


Lại tuy nhiên, nếu bên trong object là một giá trị không thể serialize như `Date` object, ko thực hiện được.

Có thể dùng `cloneDeep` của [thư viện lodash](https://lodash.com/docs/4.17.11#cloneDeep) là an toàn nhất để thực hiện Deep copy, còn nếu thích tự làm mọi thứ, thì đây là một hàm implement chức năng clone deep

```js
function deepClone(obj) {
  var copy;

  // với các type primitive, null hoặc undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
        copy[i] = clone(obj[i]);
    }
    return copy;
  }

  // Handle Function
  if (obj instanceof Function) {
    copy = function() {
      return obj.apply(this, arguments);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
      copy = {};
      for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
      }
      return copy;
  }

  throw new Error("Unable to copy obj as type isn't supported " + obj.constructor.name);
}
``` 


<a href="https://smalldata.tech/blog/2018/11/01/copying-objects-in-javascript" target="_blank" rel="noopener noreferrer">COPYING OBJECTS IN JAVASCRIPT</a>


