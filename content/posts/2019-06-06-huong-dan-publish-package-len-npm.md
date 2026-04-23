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

- [Package là gì, và module là gì](#package-là-gì-và-module-là-gì)
- [Tạo package](#tạo-package)
- [Kiểm tra ở local](#kiểm-tra-ở-local)
- [Publish lên NPM](#publish-lên-npm)
- [Sử dụng thêm thư viện](#sử-dụng-thêm-thư-viện)

<!-- /TOC -->

## Package là gì, và module là gì

Npm sẽ phân biệt 2 khái niệm **package** và **module** 

**Package** là một thư mục chứa một gói phần mềm được mô tả bởi file `package.json`

**Module** là một thư mục chứa file `package.json`, chứa một `default export`, cho phép loading module này bằng `require()` trong Node

## Tạo package

Tạo một thư mục mới, init package npm bằng `npm init` hoặc `npm init -y` nếu muốn dùng các thiết đặt mặc định

```bash
mkdir my-vui-package && cd my-vui-package
npm init -y
```

Trỏ vào thư mục này, chúng ta sẽ có file `package.json` như sau

```js
{
  "name": "my-vui-package",
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

File `index.js` nội dung đại loại sẽ như thế này

```js
"use strict";

module.exports = function my-vui-package(sentence, callback) {

}
```

## Kiểm tra ở local

Trước khi publish nó lên npm, trong ta có thể dùng `npm link` để kiểm tra dưới local trước. Đại khái `npm link` sẽ cho phép chúng ta trỏ thư mục package vào thư mục `node_modules` global. Chúng ta cần thực hiện 2 bước

```bash
cd ~/duong-dan-toi-thu-muc/my-vui-package
npm link
```

Sau đó, trong thư mục sử dụng package

```bash
cd ~/duong-dan-toi-thu-muc/project-nao-do
npm link my-vui-package
```

Bên trong thư mục **node_modules** bây giờ sẽ như thế này

## Publish lên NPM

Trước khi publish lên npm chúng ta phải đăng ký một user trên npm, sau đó login ở dưới máy local

```bash
npm login
```

Có thể kiểm tra npm có *biết chúng ta là ai chưa* 

```bash
npm whoami
```

Mọi thứ đã hoàn tất, để trình làng một package cho bàn dân thiên hạ

```bash
npm publish --access public
```

Nếu đã có một package như vậy trên npm, nó sẽ thông báo lỗi như này

![](https://zellwk.com/images/2019/publish-to-npm/npm-publish-error.png)

Nếu nhận thông báo thành công, chúng ta có thể chạy ngay lên npm và search sẽ thấy package của chúng ta nằm chình ình trên đó

Ngày nó đó ko muốn cho thiên hạ xài nữa

```bash
npm unpublish
```

Khi cần update lên version mới

```bash
npm version <update_type>
```

## Sử dụng thêm thư viện

Nếu cần chuyên nghiệp hơn, chuẩn hóa hơn các bác, sử dụng package `np` để hỗ trợ thực hiện các bước ở trên

```bash
npm i -g np
```

Muốn sử dụng `np` chúng ta phải đảm bảo package chúng ta được host trên Github

cần publish ? chạy 

```bash
np
```

Trả lời các câu hỏi để đi tiếp

![](https://zellwk.com/images/2019/publish-to-npm/np.png)

Đọc thêm [cách đặt tên version ở đây](https://npmjs.com/package/<package>)
