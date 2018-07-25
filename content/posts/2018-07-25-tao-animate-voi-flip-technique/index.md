---
slug: "/2018-07-25-tao-animate-voi-flip-technique"
date: "2018-07-25"
title: "Tạo animation với flip technique"
desc: "Trong bài này chúng ta sẽ tìm hiểu kỹ thuật FLIP có thể sử dụng để animate position và kích thước của bất kỳ DOM element nào"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["html-css"]
---

# Tại sao sử dụng FLIP technique

Đã bao lần bạn cần làm animate cho các property `height`, `width`, `top`, `left`? Bạn có để ý là những animate như vậy thường sẽ hơi khực khực. Lý do? những property này trigger **layout change**, trình duyệt sẽ xem xét các element khác có cần thay đổi gì không, việc này sẽ tiêu tốn công sức của trình duyệt khá nhiều trong đa số các trường hợp. Trong bài viết [Pixel are Expensive](https://aerotwist.com/blog/pixels-are-expensive/) tác giả Paul Lewis sẽ nói rõ hơn.

Nói một cách khác, chúng ta muỗn việc tính toán này hạn chế ở mức tối đa, nhanh nhất có thể. Mục tiêu là chúng ta chỉ animate trên `transform` và `opacity`. FLIP giải thích làm sao để chúng ta có thể đạt được layout change với chỉ property `transform`

# FLIP là gì

FLIP là viết tắt của **First, Last, Invert, Play**

- **First** trước khi mọi thứ bắt đầu, lưu lại giá trị position và kích thước của element muốn transition. Có thể sử dụng `element.getBoundingClientRect()`
- **Last** thực thi đoạn code sẽ gây ra transition trong khoản thời gian gần như là tức thì, lưu lại giá trị position và kích thước của element lúc đó.
- **Invert** do element đang ở vị trí cuối cùng, chúng ta muốn user nghĩ đó là ví trí đầu tiên, bằng cách sử dụng `transform` để thay đổi lại position và kích thước. Tính toán xíu, nhưng không thành vấn đề.
- **Play** với element đã bị *invert*, chúng ta lại move nó lại vào vị trí cuối một lần nữa bằng `transform: none`

Implement bên dưới sử dụng Web Animation API

```js
const elm = document.querySelector('.some-element');

const first = elm.getBoundingClientRect();

// chạy đoạn script thực hiện change layout
doSomething();
```

[Link bài gốc](https://css-tricks.com/animating-layouts-with-the-flip-technique/)