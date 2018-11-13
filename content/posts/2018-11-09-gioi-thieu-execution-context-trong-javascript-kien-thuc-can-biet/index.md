---
slug: "/2018-11-09-gioi-thieu-execution-context-trong-javascript-kien-thuc-can-biet"
date: "2018-11-09"
title: "Tìm hiểu Execution context trong Javascript"
desc: "Theo quan điểm của mình, khái niệm căn bản và quan trọng bật nhất của javascript là hiểu được Execution Context,"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Global Execution Context](#global-execution-context)
- [Function Execution Context](#function-execution-context)

<!-- /TOC -->

Sau khi nắm được nó chúng ta có thể giải thích những vấn đề *cao siêu* như **hoisting**, **scope chain**, **closure**.

Để hiểu Execution Context, ngẫm lại cách chúng ta viết code: chúng ta tách nó ra thành những phần nhỏ riêng biệt. Những “phần nhỏ” này có các tên gọi như function, module, package, tất cả là để chia nhỏ, dễ quản lý một mớ code vừa to vừa phức tạp.

Nếu Javascript là một người thực thi các đoạn code này, nó cũng dùng cách tương tự, thực thi từng phần code một, được gọi là Execution Context

<div class="note">Mỗi Execution Context sẽ có 2 phase, **Creation phase** và **Execution phase**</div>

Có 2 loại Execution Context: 

1. Global Execution Context
2. Function Execution Context

## Global Execution Context

Được tạo khi javascript chạy code của chúng ta, bình thường nó sẽ tạo ra 2 thứ: 1 global object và một biến gọi là `this`. `this` sẽ trỏ tới global object là window nếu chạy trên trình duyệt, trỏ tới `global` nếu chạy trên Node

![Execution context, Hoisting, Scopes, Closures trong Javascript](https://tylermcginnis.com/images/posts/advanced-javascript/no-code.png)

Khi chúng ta khai báo thêm biến

![Execution context, Hoisting, Scopes, Closures trong Javascript](https://tylermcginnis.com/images/posts/advanced-javascript/global-variables-in-creation-phase.png)
![Execution context, Hoisting, Scopes, Closures trong Javascript](https://tylermcginnis.com/images/posts/advanced-javascript/global-variables-in-execution-phase.png)

Creation phase của Global Execution context sẽ có các bước

1. Tạo global object
2. Tạo object tên là `this`
3. Setup vùng nhớ tạm thời cho biến và function
4. Gắn giá trị `undefined` cho biến, trỏ từng function đến vùng nhớ.

Thử log giá trị sau creation phase và trước execution phase

![Thử log giá trị sau creation phase và trước execution phase](https://tylermcginnis.com/images/posts/advanced-javascript/global-execution-context-gif.gif)

Trước khi javascript thực sự chạy các dòng code, *creation phase* xảy ra trước, nên giá trị log ra sẽ là `undefined`, function sẽ trỏ tới một vùng nhớ.

```js
console.log('name: ', name) // name: undefined
console.log('handle: ', handle) // handle: undefined
console.log('getUser :', getUser) // getUser: ƒ getUser () {}

var name = 'Tyler'
var handle = '@tylermcginnis'

function getUser () {
  return {
    name: name,
    handle: handle
  }
}

```

<div class="note">Trong creation phase, quá trình gắn các biến được khai báo vào giá trị `undefined` được gọi là **hoisting**.</div>

## Function Execution Context

Được tạo ra khi thực thi hàm, cơ bản nó cũng giống với Global execution context, khác ở chỗ nó bỏ bước #1

1. <del>Tạo global object</del>
1. Tạo một object tên `arguments`
2. Tạo object tên là `this`
3. Setup vùng nhớ tạm thời cho biến và function
4. Gắn giá trị `undefined` cho biến, trỏ từng function đến vùng nhớ.

![Function execution context](https://tylermcginnis.com/images/posts/advanced-javascript/function-execution-context-gif.gif)

Bạn có thấy cái ô màu hồng hồng trên hình nó xuất hiện khi function được thực thi, sau đó bị remove sau khi chạy xong. Khi tạo một execution context, javascript đưa vào một hàng đợi gọi là **Call Stack**, sau khi đã chạy xong 2 phase nó remove khỏi Call Stack

![sau khi đã chạy xong 2 phase nó remove khỏi Call Stack
](https://tylermcginnis.com/images/posts/advanced-javascript/javascript-execution-stack.gif)

[Chạy thử](https://goo.gl/vjmnTa)

Với một function có khai báo biến bên trong

![Với một function có khai báo biến bên trong](https://tylermcginnis.com/images/posts/advanced-javascript/local-variables.gif)

Quá hiển nhiên là biến `handle` nằm trong Global Execution Context, nên bên trong function chúng ta có thể access đến nó, trong khi biến `twitterURL` được khởi tạo ở trong function, nó chỉ có trong Function Execution Context khi hàm được thực thi. Đây chính là nền tảng của khái niệm **SCOPE**

Chúng ta đã biết scope ám chỉ việc biến có thể truy xuất ở đâu. Trên MDN nó định nghĩa scope

> Scope: The current context of execution.

Giờ bạn nghĩ xem, cái gì sẽ được log ra sau khi chạy hàm

```js
function first () {
  var name = 'Jordyn'
  console.log(name)
}

function second () {
  var name = 'Jake'
  console.log(name)
}

console.log(name)
var name = 'Tyler'
first()
second()
console.log(name)
```

![Execution context, Hoisting, Scopes, Closures](https://tylermcginnis.com/images/posts/advanced-javascript/unique-scopes.gif)

Chúng ta sẽ có thứ tự log ra: `undefined`, `Jordyn`, `Jake`, `Tyler`

Trong trường hợp biến không tồn tại trong execution context của function, liệu nó sẽ log ra cái gì, hay ngừng chạy?

```js
var name = 'Tyler'

function logName () {
  console.log(name)
}

logName()

```

![Trong trường hợp biến không tồn tại trong execution context của function](https://tylermcginnis.com/images/posts/advanced-javascript/parent-lookup.gif)

Kết quả log ra là "Tyler", dù bên trong execution context của hàm không có biến, nó sẽ tìm đến thằng context cha xem có giá trị của biến này chưa, cho đến khi global execution context nó sẽ dừng.

<div class="note">Đặc điểm này trọng javascript được gọi là Scope chain</div>

![Đặc điểm này trọng javascript được gọi là Scope chain](https://tylermcginnis.com/images/posts/advanced-javascript/closure-scope.gif)

<div class="note">Khi chúng ta lồng một function bên trong 1 function như vậy, nó sẽ tạo ra một cái gọi là <b>Closure Scope</b></div>

Tham khảo thêm

Mình đã viết bài này trên MDN <a href="https://developer.mozilla.org/vi/docs/Web/JavaScript/Closures" target="_blank" rel="noopener noreferrer">Closures</a>

<a href="https://tylermcginnis.com/ultimate-guide-to-execution-contexts-hoisting-scopes-and-closures-in-javascript/" target="_blank" rel="noopener noreferrer">The Ultimate Guide to Execution Contexts, Hoisting, Scopes, and Closures in JavaScript</a>

<a href="https://tylermcginnis.com/javascript-visualizer/" target="_blank" rel="noopener noreferrer">Diễn giải các khái niệm bằng công cụ do tác giả build </a>




