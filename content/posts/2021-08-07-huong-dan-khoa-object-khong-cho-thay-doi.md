---
slug: "/2021-08-07-huong-dan-khoa-object-khong-cho-thay-doi"
date: "2021-08-07"
title: "Các cách lock một property hay object của JS"
desc: ""
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Khóa property của object](#khóa-property-của-object)
- [Khóa toàn bộ object](#khóa-toàn-bộ-object)

<!-- /TOC -->

## Khóa property của object

Set giá trị một object trong js, chúng ta chỉ cần biết đến `property: value`

Vậy nếu muốn *khóa* *property* này không cho phép chỉnh sửa thì sao?

Mỗi property trong object sẽ được *khuyến mãi* thêm 3 *flag attribute* **đặc biệt** - **descriptor**

```js
let user = {
    name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

console.log(JSON.stringify(descriptor, null, 2));

// kết quả
{
    "value": "John",
    "writable": true,
  	"enumerable": true,
  	"configurable": true
}
```

- **writable**: = `true` thì chúng ta cập nhập được `value`
- **enumerable**: = `true` thì khi loop chúng ta sẽ **thấy** nó
- **configurable**: = `true` thì có thể *delete* được, các *attribute* `writable`, `enumerable` có thể chỉnh sửa

Để thay đổi giá trị cho các attribute này, chúng ta thực hiện thông qua hàm `Object.defineProperty(obj, propertyName, descriptor)`

```js
let user = {}

// highlight-next-line
Object.defineProperty(user, "name", {
    value: "John",
    // highlight-next-line
    writable: false,
    // highlight-next-line
    enumerable: false,
    // highlight-next-line
    configurable: false
})

// không còn change giá trị của name được nữa
user.name = "Peter"; 
// Error: Cannot assign to read only property 'name'

// không còn thấy khi loop
for (let key in user) console.log(key)
```

Ví dụ một property có attribute `configurable=false`

```js
// tự động gán false hết cho các attribute
let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

/*
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
*/

Math.PI = 3; 
// Error, because it has writable: false

// ko thể thay đổi attribute writable nữa
Object.defineProperty(Math, "PI", { writable: true });
// Error, because of configurable: false
```

> Nếu chỉ set `configurable = false` thì vẫn thay đổi giá trị được, nó chỉ không cho thay đổi attribute và delete

```js
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  configurable: false
});

user.name = "Pete"; // vẫn được
delete user.name; // Error
```

Nếu muốn khai báo nhiều property cùng lúc, dùng `Object.defineProperties()`

```js
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});

// Ví dụ
Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});
```

Lấy tất cả descriptor, `Object.getOwnDescriptors(obj)`

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

## Khóa toàn bộ object

Để khóa hẳn một object, chúng ta có đến tận 3 phương thức

- `Object.preventExtension(obj)` không cho thể các property mới
- `Object.seal(obj)` không cho thêm/xóa các property, `configurable: false`
- `Object.freeze(obj)` không cho thêm/xóa/thay đổi property, `configurable: false, writable: false`

https://javascript.info/

