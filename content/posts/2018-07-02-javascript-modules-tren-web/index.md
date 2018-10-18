---
slug: "/2018-07-02-huong-dan-javascript-modules-tren-web"
date: "2018-07-02"
title: "Sử dụng javascript modules trên web"
desc: "Giới thiệu module trong ECMAcript"
category: "javascript"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [JS Modules là gì](#js-modules-là-gì)
- [Sử dụng trên trình duyệt](#sử-dụng-trên-trình-duyệt)
- [Lưu ý về extention](#lưu-ý-về-extention)
- [Module mặc định là load defer](#module-mặc-định-là-load-defer)

<!-- /TOC -->

Lưu ý quan trọng JS modules được hỗ trợ bởi các trình duyệt XỊN, hàng cùi mía của Microsoft thì chưa support

## JS Modules là gì

JS modules hay còn gọi là ES modules, ECMAcript modules là một tính năng quan trọng mới của của javascript, trước đây chúng ta sử dụng CommonJS trong Node.js hay AMD để có thể sử dụng tính năng này trước thời đại. Các thư viện này nó làm gì? nó cho phép chúng ta `import` và `export` cái chúng ta muốn

Và giờ javascript trong tương lai không xa chúng ta sẽ không cần những thư viện này nữa vì có hỗ trợ sẵn.

```js
// file lib.mjs
export const repeat = string => `${string} ${string}`;
export function shout(string) {
    return `${string.toUpperCase()}!`;
}
```

Chúng ta `import` nó từ file khác

```js
// file main.mjs
import {repeat, shout} from './lib.mjs';
repeat('hello');
// -> 'hello hello'

shout('Modules in action');
// -> 'MODULES IN ACTIONS!'
```

Module file như vậy sẽ có một vài điểm cần lưu ý
- `strict mode` bật mặt định
- Kiểu viết comment như trong HTML không sử dụng được

```js
// Không sử dụng được đâu
const x = 42; <!-- TODO: Rename x to y.
// Viêt comment bình thường thôi
const x = 42; // TODO: Rename x to y.
```

- lexical top-level scope, nghĩa là nếu khởi tạo biến `var foo = 28` bên trong module không tạo một biến global tên `foo`, chúng ta không access được `window.foo`
- Chỉ có thể sử dụng `import` và `export` trong file `.mjs`, file thường ko xài được.

## Sử dụng trên trình duyệt

Để **báo** với trình duyệt chúng ta đang load 1 file module js

```html
<script type="module" scr="main.mjs"></script>
<script nomodule scr="fallback.js"></script>
```

Ở đây ngoài việc biết được trình duyệt đang mở có hỗ trợ module ko, chúng ta cũng có thể đoán được là nó có hỗ trợ js mới không như arrow function, async - await

Một điều tuyệt vời khác của `type="module"` là mặc dù chúng ta add thêm bao nhiêu tag tùy thích nhưng nó sẽ chỉ load 1 file nếu giống nhau, ngược lại với js thường

```html
<script src="classic.js"></script>
<script src="classic.js"></script>
<!-- classic.js executes multiple times. -->

<script type="module" src="module.mjs"></script>
<script type="module" src="module.mjs"></script>
<script type="module">import './module.mjs';</script>
<!-- module.mjs executes only once. -->
```

## Lưu ý về extention

Ở trên chúng ta sử dụng file extention là `.mjs`, đây chỉ là một quy ước để dễ phân biệt, trên web nếu javascript được served bằng MIME type 'text/javascript' thì gần như là như nhau, sự phân biệt thực sự được đánh dấu bằng `type="module"` trên thẻ `script`

## Module mặc định là load defer

JS bình thường sẽ block HTML parser khi nó chưa load xong, trừ khi chúng ta thêm attribute là `defer` trên tag script, khi là module, tính năng `defer` là mặc định `true`

[Link bài gốc](https://developers.google.com/web/fundamentals/primers/modules)