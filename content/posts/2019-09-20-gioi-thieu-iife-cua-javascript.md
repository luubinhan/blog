---
slug: "/2019-09-20-gioi-thieu-iife-cua-javascript"
date: "2019-09-20"
title: "IIFE trong javascript là cái gì vại"
desc: "Giới thiệu về Íp-Phi trong javascript, tuy không còn dùng nhiều nữa, nhưng vẫn là một kiến thức tốt cần biết"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "hoc-thuat"]
---

<!-- TOC -->

- [Khai báo function](#khai-b%c3%a1o-function)
- [IIFE](#iife)
- [ES6 Module](#es6-module)

<!-- /TOC -->

Một trong những pattern có tên rất *kiêu* trong javascript "íp-phi" - **IIFE**

Trước khi tìm hiểu nó là gì, tại sao chúng ta cần nó, ôn lại khái niệm function căn bản trong javascript

## Khai báo function

Một javascript developer đều biết cách khai báo chính quy này

```js
function sayHelloWorld() {
	alert(“Hello world”)
}

sayHelloWorld()
```

1 cách khác, gọi là **function expression**, đặt biến và gán nó vào function

```js
const sayHelloWorld = function() {
	alert("Hello World")
}

sayHelloWorld()
```

Các callback chúng ta viết điều là function expression kiểu này

> Function trong javascript có thể xem như những giá trị khác, có thể truyền vào như tham số cho function khác

## IIFE

```js
!function() {
	alert("Hello IIFE")
}()
```

Nếu copy đoạn này dán vào console của trình duyệt, câu `alert` sẽ xuất hiện, nhưng nó sẽ không bao giờ có thể hiện lại lần nữa

> function này sau khi hoàn thành nhiệm vụ, nó đi luôn không quay lại

Nếu bạn tinh ý, bạn sẽ thắc mắc tại sao lại có `!` phía trước function vậy?

Khi javascript thấy keyword **function** nó sẽ xem khúc sau là phần khai báo cho function. Nhưng khi chúng ta thêm **!** phía trước, chúng ta đang ép javascript xem nó là một **expression**, nghĩa là phải trả về một giá trị

Điều thú vị là ở chổ `{}()`, **nó chạy function này luôn**

> Một function gọi luôn sau khi tạo, gọi xong thì hết gọi lại được gọi là IIFE

Không nhất thiết phải dùng `!`, bạn có thể dùng `+`, `-`, `~`, `void` để ép nó về *expression*

```js
void function() { … }()
```

Một cách khác nữa, cách này vẫn hay dùng nhất

```js
(function() {
...
})()

// hoặc
(function() {
...
}())
```

Chúng ta vẫn sử dụng IIFE như một module trong javascript (trước đây), vì nó cho chúng ta đưa biến vào một *đặc khu kinh tế*, những thằng khác sẽ không truy cập được biến khai báo bên trong IIFE

```js
(function initGame(){
	// biến private
	var live
	var weapon

	init()
	// function private
	function init() {
		live = 5
		weapon = 10
	}
})()
```

Tất nhiên nếu là module, thì phải có những thứ public để thằng khác gọi tới, muốn thằng nào public chúng ta return là được

```js
(function initGame(){
	// biến private
	var live
init()
	// function private
	function init() {
		live = 5
	}
	return {
		init: init
	}
})()

```

Nếu muốn truyền vào tham số cho IIFE 

```js
(function IIFE(msg, times) {
    for (var i = 1; i <= times; i++) {
        console.log(msg);
    }
}("Hello!", 5));
```

## ES6 Module

Khi ES6 ra đời, cách viết IIFE không còn được “thịnh hành” như trước

Thí dụ, trước đây để biến private

```js
(function() {
    var scoped = 42;
}());

console.log(scoped); // ReferenceError
``` 

Giờ có `let` và `const` đặt nó vào block là xem như private

```js
{
    let scoped = 42;
}

console.log(scoped); // ReferenceError
```

Cách viết này gọn gàng, nhìn vào ai cũng hiểu, ko cần giải thích nhiều như IIFE

Module được hiểu là **từng file** javascript, những gì không `export` là private hết

```js
// myModule.js
let counter = 0;
export function increment() {
    counter++;
}    

// logic.js
import { increment } from 'myModule.js';
increment();
```

Bài viết đã tham khảo

* 📜 [Mastering Immediately-Invoked Function Expressions ― Chandra Gundamaraju](https://medium.com/@vvkchandra/essential-javascript-mastering-immediately-invoked-function-expressions-67791338ddc6)
* 📜 [Do ES6 Modules make the case of IIFEs obsolete?](https://hashnode.com/post/do-es6-modules-make-the-case-of-iifes-obsolete-civ96wet80scqgc538un20es0)

