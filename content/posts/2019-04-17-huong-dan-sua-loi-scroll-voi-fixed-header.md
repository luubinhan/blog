---
slug: "/2019-04-17-huong-dan-sua-loi-scroll-voi-fixed-header"
date: "2019-04-17"
title: "Sửa lỗi scroll với fixed header bằng CSS"
desc: "Giải quyết issue với fixed header và scroll đến một element bằng hashtag"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["css"]
---


Khi sử dụng hashtag `#` cho attribute `href`, trình duyệt sẽ scroll tới element có id tương ứng `section-two`. Đây là một tính năng từ thời trình duyệt mới ra đời.

```html
<a href="#section-two">Section Two</a>
```

Nhưng một khi chúng ta thêm một element với `position: fixed`,  như header, vị trí scroll đến sẽ ko còn đúng nữa, nó vẫn scroll tới element đó, nhưng giờ nó có thể bị che bởi element đang set fixed.

Có rất nhiều cách để giải quyết vấn đề này trước đây, như thêm vào một đoạn padding vào element, hoặc dùng một đoạn javascript để handle, có tất cả [5 cách để giải quyết con issue này](http://nicolasgallagher.com/jump-links-and-viewport-positioning/demo/). 

![Fixed Header, Page Links](https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_964,f_auto,q_auto/v1553563039/anchor-linking_z85vjt.gif)

Giờ đây chúng ta có cách hoàn toàn mới **chỉ với css**

Sử dụng 2 thuộc tính mới là `scroll-padding` và `scroll-margin`

```css
body {
  scroll-padding-top: 70px;
 /* giá trị chiều cao của header */
}
```

Hiện tại cái này chỉ chạy tốt trên trình duyệt dùng Chromium



<iframe height="265" style="width: 100%;" scrolling="no" title="Scroll Padding on Fixed Postion Headers" src="//codepen.io/chriscoyier/embed/NJJERg/?height=265&theme-id=0&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/chriscoyier/pen/NJJERg/'>Scroll Padding on Fixed Postion Headers</a> by Chris Coyier 
  (<a href='https://codepen.io/chriscoyier'>@chriscoyier</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


<a target="_blank" rel="noopener noreferrer" href="https://css-tricks.com/fixed-headers-on-page-links-and-overlapping-content-oh-my/">HFixed Headers, On-Page Links, and Overlapping Content, Oh My!
</a>

