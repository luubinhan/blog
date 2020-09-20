---
slug: "/2016-11-21-phan-7-es6-can-ban-classes"
date: "2016-11-21"
title: "Hồi 7: ES6 căn bản - Classes"
desc: "Hồi 7 trong series ES6 căn bản, Javascript vốn là ngôn ngữ prototype, class không phải là cái gì đó mới mẻ trong javascript"
category: "javascript"
cover: ""
type: "post"
lesson: 1
chapter: 7
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


Javascript vốn là ngôn ngữ `prototype`, `class` không phải là cái gì đó mới mẻ trong javascript, chỉ là trước đây có cách khai báo và tên gọi khác prototype thì giờ có cách khai báo mới cho những ai đã quen với những ngôn ngữ khác có thể tiếp cận dễ dàng.

## Khai báo

Đây là cách khai báo trước đây, khai báo `fruit` sử dụng `function contstructor`, thêm một số phương thức cho nó bằng khai báo thêm `prototype`.

```js
function Fruit( name, calories ) {
 this.name = name
 this.calories = calories
 this.pieces = 1
}
Fruit.prototype.chop = function() {
 this.pieces++
}
Fruit.prototype.bite = function(person) {
 if ( this.pieces &amp;amp;lt; 1 ) {
  return
 }
 const calories = this. calories / this.pieces
 person.satiety += calories
 this.calories -= calories
 this.pieces--
}
```

Với ES6 viết theo khai báo `class`

```js
class Fruit {
 constructor ( name, calories ) {
  this.name = name
  this.calories = calories
  this.pieces = 1
 }
 chop () {
  this.pieces++
 }
 bite ( person ) {
  if (this.pieces &amp;amp;lt; 1){
   return
  }
  const calories = this.calories / this.pieces
  person.satiety += calories
  this.calories -= calories
  this.pieces--
 }
}
```

Lưu ý là với khai báo `class`, mình không cần thêm dấu `,` giữa các hàm, phân biệt với `object literal`, giữa mỗi `function` phải được phân cách bằng `,`

Không giống như khi khai báo function, nếu khái báo `class` bên dưới câu gọi nó, nó sẽ không hiểu, `function` thì viết ở đâu gọi cũng hiểu

```js
new Person(); // Result: referenceError: Person is not defined
class Person {
}
```

## Phương thức và Properties trong Classes

`constructor` không bắt buộc khai báo

```js
class Fruit {
}
```

Đoạn code ví dụ bên dưới, tạo một `class` với `property` là `count` hàm phương thức get next sẽ trả về giá trị `count`

```js
class Counter {
    constructor (start) {
        this.count = start
    }
    get next () {
        return this.count++
    }
}
```

Vận dụng, viết một class để lưu dữ liệu nhận về từ JSON, đọc thêm về `Window.localStorage`

```js
class LocalStorage {
    constructor (key) {
        this.key = key
    }
    get data () {
        return JSON.parse(localStorage.getItem(this.key))
    }
    set data (data) {
        localStorage.setItem(this.key, JSON.stringify(data))
    }
}

const ls = new LocalStorage('groceries')
ls.data = ['apple','bananas', 'grapes']
console.log(ls.data)
// Result: ['apple', 'bananas','grapes']
```

tạo một phương thức `static`

```js
class MathHelper {
    static sum(...numbers) {
        return numbers.reduce( (a,b) => a + b )
    }
}
console.log(MathHelper.sum(1,2,3,4,5)
// Result: 15
```

## Class Extends

Trước đây gặp trường hợp này phải xài tới "thuốc" thì mới tạo được `sub-class`, mà cũng khá lằn ngoằn, giờ có cách chính quy. lưu ý là khi muốn viết lại hàm constructor bên trong sub-class thì phải gọi từ khóa super để gọi làm phương thức constructor từ class extend

```js
class Banana extends Fruit {
 constructor () {
  super('banana',105)
 }
 slice () {
  this.pieces = 12
 }
}
```