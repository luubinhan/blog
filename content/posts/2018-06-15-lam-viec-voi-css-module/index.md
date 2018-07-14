---
slug: "/2018-06-15-lam-viec-voi-css-module"
date: "2018-06-15"
title: "Làm việc với CSS Modules trong React"
desc: "Sau rất nhiều năm kiếm cơm với CSS, và hiện tại vẫn thế, CSS vẫn luôn là niềm hứng thú của cá nhân mình. Ngày nảy ngày nay để làm việc với Component của React, chúng ta sẽ có nhiều lựa chọn hơn khi 'CSS trong JS' đang là lựa chọn hàng đầu. Trong thời đại của component phủ sóng khắp các mặt trận, CSS Modules hứa hiện là món ngon"
category: "react"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react", "javascript"]
---

<!-- TOC -->

- [CSS modules là gì](#css-modules-là-gì)
- [Xóa style đầy tự tin](#xóa-style-đầy-tự-tin)
- [Một vài lựa chọn nâng cao](#một-vài-lựa-chọn-nâng-cao)

<!-- /TOC -->

## CSS modules là gì

Dựa vào cái tên chắc phần nào cũng đoán được, nó là kiểu viết module hóa stylesheet thành từng file nhỏ, không còn sử dụng một file stylesheet tập trung nữa. Thêm vào đó, tất cả tên class lúc này sẽ được scope lại local, có thế viết bằng vanilla CSS hay SCSS (lựa chọn hàng đầu của các frontend chất).

file Button.scss
```scss
.button {
    padding: 8px;
    color: blue;
}
```

file Button.js
```jsx
import React from 'react';

const styles from './Button.scss';

class Button extends React.Component {
    render() {
        return <button className={styles.button}>An Luu Blog</button>;
    }
}
```

Với cách viết này, class `.button` lúc trả về sẽ là `button-[hash string ở đây]`, nên sẽ không sợ bị trùng tên, chắc chắn không gây side effect lên các component khác vì chả bao giờ trung tên đâu.

Một lợi ích khác là khi viết ta có thể viết `.my-class-name` kiểu kebab case, nhưng khi viết js chúng ta có lại thích transform thành `styles.myClassName` theo kiểu camel case.

CSS module thoạt thì thấy không có chi đặc biệt, đơn giản chỉ là thế thôi, nhưng lợi ích của việc này là giúp chúng ta rất dễ maintain stylesheet vì nó buộc khi chúng ta viết css phải đơn giản nhất có thể.

## Xóa style đầy tự tin

Thích nhất là viết feature mới và đập bỏ cái code chuối cả nãy hồi xưa. Phần khó nhất là gì? Làm sao biết được xóa cái style cũ này đi có bị gì không? Lỡ đâu đang xài đâu đó.

Ở cái `Button` ví dụ trên, phần stylesheet và component gần như là gắn chặt vào nhau như hình với bóng, mối quan hệ một-một giữa component và style sheet đó là một quy ước cho một component được viết tốt, file style sheet đó chỉ phục vụ cho đúng component đó, nếu mà lỡ xóa file stylesheet hoặc class nào mà đang sử dụng, chắc chắn quá trình build sẽ báo ngay lỗi cho chúng ta biết lỡ xóa phần nào.

## Một vài lựa chọn nâng cao

Những thư viện CSS-trong-JS nâng cao như styled-components hay emotion cũng được nhiều front-end chất xài, cung cấp nhiều tính năng tân tiến hơn, nếu không ngại học thêm và tìm hiểu cách hoạt động thì cũng là lựa chọn không đến nổi.

Với kiểu viết CSS Module với Vanilla CSS hay SCSS đã được tín nhiệm từ nhiều năm qua, bên cạnh đó thì SCSS còn có biến nè, kiểu viết nesting rất tiện lợi nè,... thì thật ra chỉ sử dụng SCSS thôi cũng đã là đủ

```jsx
import styles from './App.scss';
console.log(styles);
```

log ra xem có cái mợ gì

![](https://cdn-images-1.medium.com/max/800/1*o9VrQ1idA8SqwJ_o6TL9Hg.png)

Bài dịch của tác giả: Spencer Miskoviak

[Link bài gốc](https://medium.com/@skovy/writing-maintainable-styles-and-components-with-css-modules-308a9216a6c2)

https://medium.com/@kswanie21/css-modules-sass-in-create-react-app-37c3152de9