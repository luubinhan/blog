---
slug: "/2020-09-01-phan-biet-giua-npm-va-npx"
date: "2020-09-01"
title: "Sự khác nhau giữa npm và npx?"
desc: "Bài viết này sẽ giải thích ngắn gọn nhất có thể sự khác nhau về mục đích của 2 thằng này"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["hoc-thuat"]
---

Phân biệt giữa lệnh `npm` và `npx` các bạn có thể tìm thấy trên mạng khá nhiều, chủ yếu là dịch từ [freeCodeCamp](https://www.freecodecamp.org/news/npm-vs-npx-whats-the-difference/), mình đọc thấy cũng khá dài dòng nhưng có nhiều chổ không ưng, hy vọng thông qua ngôn ngữ của một lập trình viên là mình các bạn có thể dễ đọc, dễ hiểu, tóm gọn hơn là các bạn marketing dịch.

Nói một cách ngắn gọn nhất, để bạn dễ nhớ thì hãy nhớ đến tên đầy đủ của từng thằng để hình dung công dụng của nó

> npm viết tắt cho Node Package Manager
>
> npx viết tắt cho Node Package eXecute

Một thằng dùng để **quản lý** package, thằng còn lại để **thực thi** package.

Dài dòng hơn một chút

**NPM** là bộ **quản lý** package (như bộ giao thông vận tải, bộ giáo dục đào tạo)  chính thức của Node.js, khi bạn cài Node.js là bạn được *tặng kèm không thu giá* một bộ command-line (câu lệnh để bạn gõ cọc cọc trong terminal) cũng tên là `npm`

**NPX**, được trình làng từ Node.js 5.2.0 (*nghĩa là hiện tại bạn sẽ luôn có npx song song với npm, vì cái thời 5.2.0 là nó là thời mình còn cởi truồng tắm mưa rồi*) được dùng để **thực thi** bất kỳ package nào có trên trang https://www.npmjs.com/ mà **không cần cài đặt** nó trước đó, bạn chỉ chạy nó thôi (tức nhiên nếu nó chạy được)

Ví dụ cho dễ hiểu nhé, trên tài liệu của [create-react-app](https://create-react-app.dev/docs/getting-started/) người ta sẽ hướng dẫn bạn chạy lệnh

```bash
npx create-react-app my-app
```

Bạn không cần cài `create-react-app` (bản thân nó là một package Node.js), mà chỉ thực thi nó để init source code

Nếu thích các bài dài dòng hơn nữa, bạn có thể ghé qua

https://www.geeksforgeeks.org/what-are-the-differences-between-npm-and-npx/

https://www.geeksforgeeks.org/what-are-the-differences-between-npm-and-npx/

