---
slug: '/2020-05-30-5-diem-khac-nhau-giua-arrow-function-va-function-thong-thuong'
date: '2020-05-30'
title: '5 điểm khác nhau giữa function thường và arrow function'
desc: 'Lựa chọn cách viết nào cho phù hợp theo tính huống đang cần là cái chúng ta sẽ có được câu trả lời khi đi qua 5 điểm khác biệt này'
cover: ''
type: 'post'
lesson: 0
chapter: 0
tags: ['javascript']
---

<!-- TOC -->

- [1. giá trị của `this`](#1-giá-trị-của-this)
- [2. Constructor](#2-constructor)
- [3. Object `arguments`](#3-object-arguments)
- [4. Ngầm định có `return`](#4-ngầm-định-có-return)
- [5. Phương thức](#5-phương-thức)

<!-- /TOC -->

Function _thường_ là những function được khai báo ở 2 dạng sau

```js
function hello() {
  return 'hello';
}

const hello = function() {
  return 'hello';
};
```

Còn arrow function là dạng chắc ai cũng biết

```js
const hello = () => {
  return 'hello';
};
```

## 1. giá trị của `this`

Với function thường giá trị của `this` khá _khó lường_, tùy thuộc thời điểm chúng ta gọi nó. Như tình huống sau, nếu không có strict mode, thì giá trị nó là global object (window), còn có strict mode nó sẽ là `undefined`

```js
function myFunction() {
  console.log(this);
}

myFunction();
// => global object (window)
```

Giá trị nó sẽ tùy thuộc vào **ngữ cảnh**, như trong trường hợp này, nó chính là object _chính chủ_ của phương thức

```js
const myObject = {
  method() {
    console.log(this);
  }
};

myObject.method();
// => "myObject"
```

Với arrow function, `this` sẽ luôn bằng với giá trị của function ở ngoài, arrow function không khai báo thêm vùng _tự trị_ riêng (execution context), mà dùng chung với thằng cha

```js
const myObject = {
  myMethod(items) {
    console.log(this); // "myObject"
    const callback = () => {
      console.log(this); // "myObject"
    };
    items.forEach(callback);
  }
};

myObject.myMethod([1, 2, 3]);
```

Đây là một đặc tính giúp chúng ta không còn dùng đến `self = this` hay `callback.bind(this)`

## 2. Constructor

Để khởi tạo một object với function bình thường

```js
function Car(color) {
  this.color = color;
}

const redCar = new Car('red');
redCar instanceof Car; // => true
```

Cũng không có _vùng tự trị_ riêng, nên arrow function không thể dùng như một constructor

```js
const Car = (color) => {
  this.color = color;
};

const redCar = new Car('red');
// => TypeError: Car is not a constructor
```

## 3. Object `arguments`

Bên trong một function thông thường sẽ được _nhét_ thêm một object _đặc biệt_ `arguments`, chứa toàn bộ tham số truyền vào cho function đó

```js
function myFunction() {
  console.log(arguments);
}

myFunction('a', 'b');
// => { 0: 'a', 1: 'b'}
```

Arrow function sẽ không có object này, và nếu bạn đặt nó vào trong một function bình thường, thì lúc đó giá trị `arguments` này sẽ của thằng bọc ngoài

```js
function myRegularFunction() {
  const myArrowFunction = () => {
    console.log(arguments);
  };

  myArrowFunction('c', 'd');
}

myRegularFunction('a', 'b');
// => { 0: 'a', 1: 'b' }
```

## 4. Ngầm định có `return`

Với function thông thường, chúng ta phải rất _rõ ràng_ là `return` về cái gì

```js
function myFunction() {
  return 42;
}

myFunction();
// => 42

function myEmptyFunction() {
  42;
}

function myEmptyFunction2() {
  42;
  return;
}

myEmptyFunction();
// => undefined
myEmptyFunction2();
// => undefined
```

Với arrow function nó có hơi đặc biệt, nếu chỉ có một _expression_, bỏ qua dấu ngoặc đơn luôn, thì giá trị của _expression_ sẽ được return

```js
const increment = (num) => num + 1;

increment(41);
// => 42
```

## 5. Phương thức

Các function thông thường sẽ là lựa chọn hàng đầu khi viết phương thức cho `class`

```js
class Hero {
  constructor(heroName) {
    this.heroName = heroName;
  }

  logName() {
    console.log(this.heroName);
  }
}

const batman = new Hero('Batman');
```

Nhưng khi bạn không muốn thay đổi giá trị của `this`, arrow function sẽ là lựa chọn hợp lý hơn

```js
class Hero {
  constructor(heroName) {
    this.heroName = heroName;
  }

  logName = () => {
    console.log(this.heroName);
  };
}

const batman = new Hero('Batman');
```

https://dmitripavlutin.com/differences-between-arrow-and-regular-functions/
