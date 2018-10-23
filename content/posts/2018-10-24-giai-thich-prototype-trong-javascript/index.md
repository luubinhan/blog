---
slug: "/2018-10-24-giai-thich-prototype-trong-javascript"
date: "2018-10-24"
title: "Javascript prototype chuyên sâu"
desc: "Bài này chỉ phù hợp với các bạn đã có kiến thức trung bình khá javascript trở lên, mình không chỉ đơn giản giải thích cách xài mà còn sâu hơn, bạn sẽ nắm rất rất rõ prototype trong javascript thực chất là gì"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Object.create](#objectcreate)
- [Sâu hơn xa hơn](#sâu-hơn-xa-hơn)
- [Một số phương thức với prototype nên biết](#một-số-phương-thức-với-prototype-nên-biết)
  - [Lấy tất cả prototype của function](#lấy-tất-cả-prototype-của-function)
  - [Xác định một property có tồn tại trong prototype không](#xác-định-một-property-có-tồn-tại-trong-prototype-không)
  - [kiểm tra một object có phải là một instance của Class](#kiểm-tra-một-object-có-phải-là-một-instance-của-class)
- [Lưu ý về arrow function](#lưu-ý-về-arrow-function)

<!-- /TOC -->

Object trong javascript rất là vi diệu. Nó là nền tảng của rất nhiều thứ hay ho trong javascript.

Object là một cặp giá trị key/value. Cách đơn giản nhất tạo một object là `obj = {}`, thêm các property và phương thức sử dụng dấu chấm

```js
let animal = {}
animal.name = 'Leo'
animal.energy = 10

animal.eat = function (amount) {
  console.log(`${this.name} is eating.`)
  this.energy += amount
}

animal.sleep = function (length) {
  console.log(`${this.name} is sleeping.`)
  this.energy += length
}

animal.play = function (length) {
  console.log(`${this.name} is playing.`)
  this.energy -= length
}

```

Quá đơn giản. Giờ chúng ta muốn có thêm một `animal` khác, chúng ta đưa toàn bộ logic này vào bên trong 1 function, cách này gọi là **Functional Instantiation** hay **constructor function**

```js
function Animal (name, energy) {
  let animal = {}
  animal.name = name
  animal.energy = energy

  animal.eat = function (amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  }

  animal.sleep = function (length) {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
  }

  animal.play = function (length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
  }

  return animal
}

const leo = Animal('Leo', 7)
const snoop = Animal('Snoop', 10)
```

Khi chúng ta muốn tạo một instance mới của `Animal`, tất cả những gì chúng ta cần làm là gọi lại hàm `Animal`.

Cách làm này có một điểm hạn chế, các phương thức `eat`, `sleep`, `play` là hoàn toàn giống nhau cho các instance, đồng thời khi tạo một instance mới chúng ta cũng đã vô tình lãng phí bộ nhớ bằng việc khai báo thêm những object mà đôi khi không cần thiết.

Chúng ta sẽ tách các phương thức này ra. Từ ngữ chuyên môn cho vấn đề này là **Functional Instantiation với các phương thức dùng chung**.

```js
const animalMethods = {
  eat(amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  },
  sleep(length) {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
  },
  play(length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
  }
}

function Animal (name, energy) {
  let animal = {}
  animal.name = name
  animal.energy = energy
  animal.eat = animalMethods.eat
  animal.sleep = animalMethods.sleep
  animal.play = animalMethods.play

  return animal
}
```

Các phương thức dùng chung giờ đây nằm ở từng object và refer đến object bên trong của Animal.

# Object.create

Nâng cấp thêm chút nữa bằng `Object.create`. `Object.create` cho phép bạn tạo một object, nếu không tìm thấy nó sẽ đưa về một object khác để xem có thể tìm thấy property đó không.

```js
const parent = {
  name: 'Stacey',
  age: 35,
  heritage: 'Irish'
}

const child = Object.create(parent)
child.name = 'Ryan'
child.age = 7

console.log(child.name) // Ryan
console.log(child.age) // 7
console.log(child.heritage) // Irish
```

Trong ví dụ trên, bởi vì children được tạo bởi `Object.create(parent)`, khi nó không tìm thấy property trong children, javascript tự nó biết tìm đến parent object. Trong ví dụ này, child không có property là `heritage`, mà parent có, nên nó sẽ lấy của parent là `Irish`

Giờ làm sao chúng ta đơn giản hoá code của Animal? Thay vì thêm tất cả các phương thức dùng chung vào `Animal` từng thằng một, có thể dùng `Object.create` để truyền object `animalMethods` 

```js

const animalMethods = {
  eat(amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  },
  sleep(length) {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
  },
  play(length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
  }
}

function Animal (name, energy) {
  let animal = Object.create(animalMethods)
  animal.name = name
  animal.energy = energy

  return animal
}

const leo = Animal('Leo', 7)
const snoop = Animal('Snoop', 10)

leo.eat(10)
snoop.play(5)
```
 
Bây giờ khi gọi `leo.eat`, javascript sẽ tìm phương thức `eat` trên object `leo`. Nếu fail, nó đưa đến `animalMethods` trong đó có hàm `eat`

Làm như vậy có thể bị xem là hơi tricky khi quản lý một object độc lập cho các phương thức dùng chung.

Javascript chúng ta có `prototype` đảm nhiệm việc này mà bạn không cần viết thêm gì cả.

> Tất cả function trong Javascript có một property là `prototype`, nó reference đến một object.

Holy grab? Không tin có thể test

```js
function doThing () {}
console.log(doThing.prototype) // {}
```

Thay vì viết `Object.create(animalMethods)`, chúng ta cứ dùng luôn object có sẵn là `prototype`

```js
function Animal (name, energy) {
  let animal = Object.create(Animal.prototype)
  animal.name = name
  animal.energy = energy

  return animal
}

Animal.prototype.eat = function (amount) {
  console.log(`${this.name} is eating.`)
  this.energy += amount
}

Animal.prototype.sleep = function (length) {
  console.log(`${this.name} is sleeping.`)
  this.energy += length
}

Animal.prototype.play = function (length) {
  console.log(`${this.name} is playing.`)
  this.energy -= length
}

const leo = Animal('Leo', 7)
const snoop = Animal('Snoop', 10)

leo.eat(10)
snoop.play(5)
```

Hy vọng là bạn có giây phút *ERECA* khi đọc tới đây, như mình đã có. `prototype` chỉ là một property mà tất cả function trong javascript đều có.

# Sâu hơn xa hơn

Tới thời điểm này, chúng ta đã biết

1. Tạo một function constructor
2. Thêm phương thức cho function constructor bằng prototype
3. Sử dụng `Object.create` để khi fail trỏ đến prototype

Cái này là quá căn bản với các ngôn ngữ lập trình khác, không lẽ javascript lại tệ đến vậy sao, không có một cách chính thống để làm? Có chứ, sử dụng `new`

Tại sao chúng ta phải đi cả ngàn dặm tới bước này, sao mình không nói toạc luôn ngay từ đầu? Với cách này bạn sẽ nắm rất sâu, hiểu rất rõ `new` sẽ làm gì bên dưới

Xem lại constructor Animal, 2 phần quan trọng nhất là tạo object và return nó.

```js
function Animal (name, energy) {
  let animal = Object.create(Animal.prototype)
  animal.name = name
  animal.energy = energy

  return animal
}
```

`new` thì có gì hót - khi gọi một function sử dụng `new`, 2 dòng code này sẽ được chạy luôn cho mình và object được tạo ra gọi là `this`

Cách viết dùng `new`

```js
function Animal (name, energy) {
  // const this = Object.create(Animal.prototype)

  this.name = name
  this.energy = energy

  // return this
}

Animal.prototype.eat = function (amount) {
  console.log(`${this.name} is eating.`)
  this.energy += amount
}

Animal.prototype.sleep = function (length) {
  console.log(`${this.name} is sleeping.`)
  this.energy += length
}

Animal.prototype.play = function (length) {
  console.log(`${this.name} is playing.`)
  this.energy -= length
}

const leo = new Animal('Leo', 7)
const snoop = new Animal('Snoop', 10)
```

Không dùng `new`, lỗi

```js
function Animal (name, energy) {
  this.name = name
  this.energy = energy
}

const leo = Animal('Leo', 7)
console.log(leo) // undefined
```


> WTF? Cả đống này chỉ là để làm cái `class` trong các ngôn ngữ khác thôi ư?

Đúng. Trước thời ES6, javascript không có vụ `class` này, chúng ta dùng như vậy đấy.

Vậy nếu bạn đang đọc bài này, thì bạn đã qua thời ES6, ES7, chúng ta có cách chính thống để làm. Bên dưới ES6 thì nó cũng làm i chang như vậy thôi, chẳng qua là bạn được viết bằng cách có "gu" hơn, chứ bên dưới nó vẫn implement như thế.

```js
class Animal {
  constructor(name, energy) {
    this.name = name
    this.energy = energy
  }
  eat(amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  }
  sleep(length) {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
  }
  play(length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
  }
}

const leo = new Animal('Leo', 7)
const snoop = new Animal('Snoop', 10)
```

# Một số phương thức với prototype nên biết

## Lấy tất cả prototype của function

`Object.getPrototypeOf()`

```js
function Animal (name, energy) {
  this.name = name
  this.energy = energy
}

Animal.prototype.eat = function (amount) {
  console.log(`${this.name} is eating.`)
  this.energy += amount
}

Animal.prototype.sleep = function (length) {
  console.log(`${this.name} is sleeping.`)
  this.energy += length
}

Animal.prototype.play = function (length) {
  console.log(`${this.name} is playing.`)
  this.energy -= length
}

const leo = new Animal('Leo', 7)
const prototype = Object.getPrototypeOf(leo)

console.log(prototype)
// {constructor: ƒ, eat: ƒ, sleep: ƒ, play: ƒ}

prototype === Animal.prototype // true
```

Có 2 điểm quan trọng trong đoạn code trên

- 1 là chỗ constructor cũng được liệt kê ra như một hàm, như vậy bất kỳ instance nào cũng có thể gọi đến constructor bằng `instance.constructor`
- 2 là nếu so sánh Object.getPrototypeOf(leo) === Animal.prototype là đúng.

## Xác định một property có tồn tại trong prototype không

`.hasOwnProperty()`

```js
const leo = new Animal('Leo', 7)

for(let key in leo) {
  if (leo.hasOwnProperty(key)) {
    console.log(`Key: ${key}. Value: ${leo[key]}`)
  }
}
```

## kiểm tra một object có phải là một instance của Class

`object instanceof Class`

```js
function Animal (name, energy) {
  this.name = name
  this.energy = energy
}

function User () {}

const leo = new Animal('Leo', 7)

leo instanceof Animal // true
leo instanceof User // false
```

# Lưu ý về arrow function

Do arrow function không có `this` bên trong nó, không thể dùng nó như một constructor function

```js
const Animal = () => {}
const leo = new Animal() // Error: Animal is not a constructor
```

Đồng thời arrow function cũng sẽ không có prototype

```js
const Animal = () => {}
console.log(Animal.prototype) // undefined
```

<a target="_blank" rel="noopener noreferrer" href="https://tylermcginnis.com/beginners-guide-to-javascript-prototype/">A Beginner's Guide to JavaScript's Prototype</a>