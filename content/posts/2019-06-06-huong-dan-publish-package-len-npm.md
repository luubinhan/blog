---
slug: "/2019-06-06-huong-dan-publish-package-len-npm"
date: "2019-06-06"
title: "Hướng dẫn tạo một package, publish nó lên npm"
desc: "Nếu bạn có một package nào đó muốn chia sẽ cùng mọi người trên npm, thì đây là cách bạn publish package make-by-me như vậy lên npm"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "step-by-step"]
---

<!-- TOC -->

- [Package là gì, và module là gì](#Package-l%C3%A0-g%C3%AC-v%C3%A0-module-l%C3%A0-g%C3%AC)
- [Cài đặt](#C%C3%A0i-%C4%91%E1%BA%B7t)
- [Kiểm tra](#Ki%E1%BB%83m-tra)
- [Publish](#Publish)

<!-- /TOC -->


## Package là gì, và module là gì

Npm sẽ phân biệt 2 khái niệm **package** và **module** 

**Package** là một thư mục chứa một gói phần mềm được mô tả bởi file package.json

**Module** là một thư mục chứa file package.json, chứa một `default export`, cho phép loading module này bằng `require()` trong Node

Thư mục **node_modules** là nơi mà thằng Node.js sẽ tìm các module cần thiết

Một cách tóm tắt, hầu hết các npm package chúng ta cài là module, tuy nhiên hông nhất thiết npm package là module

Những package CLI chỉ chứa các đoạn command-line, chúng ta ko thể load được bằng require, kiểu package như vậy không thể xem là module

Module là được load từ 1 file như thế này mới xem là module

```js
var acronym = require('acronym');
```

## Cài đặt

Tạo một thư mục trống, init package npm mới bằng `npm init` hoặc `npm init --yes` nếu muốn trả lời yes cho tất cả các câu hỏi.

```js
mkdir acronym && cd acronym
npm init --yes
```

Trỏ vào thư mục này, chúng ta sẽ có file `package.json` như sau

```js
{
  "name": "acronym",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Theo mặc định, một sẽ có 1 file `index.js`, với `default export`

Sửa file **package.json**, để bổ sung thông tin tác giả, chúng ta đi theo nguyên tắc là `Your Name <email@example.com>`

```js
{
  "name": "acronym",
  "version": "1.0.0",
  "description": "Transform sentences to acronyms.",
  "main": "index.js",
  "author": "luubinhan <luubinhan@gmail.me>" // không bắt buộc
}
```

File `index.js` nội dung đại loại sẽ như thế này

```js
"use strict";

module.exports = function acronym(sentence, callback) {

}
```

## Kiểm tra

Trước khi publish nó lên npm, trong ta có thể dùng `npm link` để kiểm tra dưới local trước. Đại khái `npm link` sẽ cho phép chúng ta trỏ thư mục package vào thư mục `node_modules` global. Chúng ta cần thực hiện 2 bước

```powershell
cd ~/duong-dan-toi-thu-muc/acronym
npm link
```

Sau đó, trong thư mục sử dụng package

```powershell
cd ~/duong-dan-toi-thu-muc/project-nao-do
npm link acronym
```

Bên trong thư mục **node_modules** bây giờ sẽ như thế này

![](https://scotch-res.cloudinary.com/image/upload/dpr_1,w_900,q_auto:good,f_auto/media/16958/DAUsrFheT8GoWDgais3E_Screen%20Shot%202017-06-26%20at%205.59.29%20PM.png)

## Publish

Nếu package chúng ta bị trùng tên trên npm, sẽ nhận thông báo khi publish

![](https://scotch-res.cloudinary.com/image/upload/dpr_1,w_900,q_auto:good,f_auto/media/16958/Ib1IU5lWQfSrmfi23EOU_Screen%20Shot%202017-06-09%20at%2012.35.50%20PM%20(2).png)

Tất nhiên trước khi có quyền publish lên npm chúng ta phải tạo một user trên npm, bằng lệnh `npm adduser` hoặc lên site nó đăng ký. Sau đó login bằng `npm login` để nó nhớ chúng ta.

Có thể kiểm tra npm có nhớ chúng ta chưa bằng `npm whoami` (tui là ai)

Mọi thứ đã hoàn tất, `npm publish` để trình làng một module cho thiên hạ

```powershell
npm publish
```

Package sau khi publish sẽ nằm ở đây `https://npmjs.com/package/<package>`

Ngày nó đó ko muốn cho thiên hạ xài nữa

```powershell
npm unpublish
```

Khi cần update lên version mới

```powershell
npm version <update_type>
```

Đọc thêm [cách đặt tên version ở đây](https://npmjs.com/package/<package>)


<a target="_blank" rel="noopener noreferrer" href="https://scotch.io/bar-talk/how-to-build-and-publish-a-npm-package">How to Build and Publish an npm Package</a>