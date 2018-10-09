---
slug: "/2016-11-18-phan-4-es6-can-ban-rest-parameters-va-spread-operator"
date: "2016-11-18"
title: "Hồi 4: ES6 căn bản - Rest Parameters và Spread Operator"
desc: "Hồi 4 trong series ES6 căn bản, nói về Rest Parameters và Spread Operator"
category: "javascript"
cover: ""
type: "post"
lesson: 1
chapter: 4
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

Mục lục

<!-- MarkdownTOC -->

- Rest parameter
- Spread Operator

<!-- /MarkdownTOC -->


## Rest parameter

Khi có số lượng tham số truyền vào cho một function không cố định, trước đây ta dùng `arguments object`, sau đó sử dụng `Array.prototype.slice.call` để chuyển nó thành một mảng

```js
var print() {
 var list = Array.prototype.slice.call(arguments)
 console.log(list)
}
print('a','b','c')
// -> ['a','b','c']
```

Kết quả tương tự với cách làm mới đơn giản hơn, thêm dấu "..." phía trước tham số

```js
var print(...list) {
 console.log(list)
}
print('a','b','c')
// -> ['a','b','c']
```

Nếu muốn truyền vào 1 tham số bình thường

```js
var print(first,...list) {
 console.log(first)
 console.log(list)
}
print('a','b','c')
// -> 'a'
// -> ['b','c']
```

Nếu sử dụng `Arrow function` thì buộc phải thêm dấu ngoặc kép `()`, dù chỉ có một tham số

```js
var sumAll = ( ...numbers ) => numbers.reduce((total,next) => total + next)
console.log( sumAll(1,2,5))
// = 8
```

Nếu lúc trước ta phải viết

```js
function sumAll(){
    var numbers = Array.prototype.slice.call(arguments)
        return numbers.reduce( function (a,b){
        return a + b
    })
}
// =8
```

# Spread Operator

Xem ví dụ bên dưới, Spread operator giúp trả về một mảng

```js
function cast() {
    return [...arguments]
}
cast('a','b','c')
// ['a','b','c']
```

Trong trường hợp phải combine nhiều mảng

```js
var all = [ 1, ...[2,3], 4, ...[5],6,7]
console.log(all)
// [1,2,3,4,5,6,7]
```

Một ví dụ khác để thấy lợi ích của *spread operator* khi kết hợp với new một `object` như `Date`

```js
new Date( ...[2015,11,31] )
// Thu Dec 31 2015
```

Khi muốn lấy 1 hoặc 2 phần tử của mảng, cách vẫn thường làm là shift mấy phần tử này

```js
var list = [ 'a','b','c','d' ]
var first = list.shift()
var second = list.shift()
console.log(first)
// a
```

Cách viết mới

```js
var [first, second, ...rest] = [ 'a','b','c','d','e' ]
// ['c','d','e']
```