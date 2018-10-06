---
slug: "/2018-10-05-gioi-thieu-focus"
date: "2018-10-05"
title: "Giới thiệu focus"
desc: "Chúng ta nói về focus và làm cách nào chúng ta sử dụng nó trong ứng dụng web"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "ux-ui"]
---

Nói đến focus là nói đến element nào (như input, button, link, checkbox, select) đang nhận input từ bàn phím, hoặc clipboard nếu user gọi paste

![](https://developers.google.com/web/fundamentals/accessibility/focus/imgs/keyboard-focus.png)

Item đang có trạng thái focus sẽ được xác định bằng vòng focus ring, tùy theo mỗi trình duyệt mà cách hiển thị khác nhau.

![](https://developers.google.com/web/fundamentals/accessibility/focus/imgs/sign-up.png)

Mình từng gặp tình huống là lướt web bằng smart tv không có bàn phím và chuột, thao tác bằng remote, hoặc một số người sử dụng máy tính chủ yếu bằng bàn phím, không thích xài chuột. Focus lúc này tất nhiên rất quan trọng.

> Luôn đảm bảo ứng dụng có thể thao tác bình thường dù không cần chuột, chỉ cần bàn phím

![](https://developers.google.com/web/fundamentals/accessibility/focus/imgs/system-prefs2.png)

# Focusable

Một số element của HTML như text field, button, select được gọi là *focusable*, nghĩa là mặc định nó đã được chèn vào thứ tự tab và sự kiện keyboard mà không cần viết thêm code gì cả 

![](https://developers.google.com/web/fundamentals/accessibility/focus/imgs/implicitly-focused.png)

Những element khác như `<p/>`, `<div/>` không focus khi chúng ta ấn tab, không cần phải focus vào những element mà mình không cần tương tác gì với nó

![](https://developers.google.com/web/fundamentals/accessibility/focus/imgs/not-all-elements.png)

# Thử

Thử mở trang [airline site mockup page](http://udacity.github.io/ud891/lesson2-focus/01-basic-form/) và tab thử qua các element, trên trang này đang tắt hết các sự kiện mouse input.

[Link bài viết gốc](https://developers.google.com/web/fundamentals/accessibility/focus/)