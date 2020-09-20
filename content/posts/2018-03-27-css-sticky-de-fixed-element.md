---
slug: "/2018-03-27-huong-dan-css-sticky-de-fixed-element"
date: "2018-03-27"
title: "Trick Sử dụng Sticky trong CSS"
desc: "Một cái trick hay để giải quyết vấn đề thường mắt phải"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["css"]
---

<!-- TOC -->

- [Bài toán cần giải quyết](#bài-toán-cần-giải-quyết)
- [Giải pháp](#giải-pháp)

<!-- /TOC -->

## Bài toán cần giải quyết

Cái Popup Modal chúng ta có cái nút `close`, cái modal chắc chắn là ta phải set `position: fixed` để cố định nó với window, cái nội dung bên trong cái modal có thể scroll được

![](https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_1000,f_auto,q_auto/v1521121189/modal_unnmdd.png)

Nút close này chúng ta sẽ set `position: absolute` cho nó lên góc phải đúng không

![](https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_1000,f_auto,q_auto/v1521121253/hidden-close-button_p4cj3m.png)

Nhưng mà khi scroll thì ta sẽ bị mất nút `close`, ta không thể set `position: fixed` cho cái nút close được, vì fixe position nghĩa là ta bắt nó định vị trí theo window.

Nếu cái modal mà ta có set `transform` bất kỳ giá trị nào, thì nút `close` sẽ trở về với body

![](https://cdn.css-tricks.com/wp-content/uploads/2018/03/fixed.gif)

## Giải pháp

`position: sticky` cho nút close là xong, đơn giản quá.

![](https://cdn.css-tricks.com/wp-content/uploads/2018/03/sticky-scroll.gif)