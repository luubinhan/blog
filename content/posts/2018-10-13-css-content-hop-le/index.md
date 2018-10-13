---
slug: "/2018-10-13-css-content-hop-le"
date: "2018-10-13"
title: "Sử dụng CSS content như thế nào cho đúng"
desc: "Thuộc tính content trong CSS thường được sử dụng cùng với 2 ghost element là after và before, những giá trị nào có thể đưa vào cho thuộc tính content này?"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["css"]
---

```html
<div 
  data-done="&#x2705;"
  class="email">
    chriscoyier@gmail.com
</div>
```

```css
.email::before {
  /* Chèn trước thẻ div giá trị của data-done + Email: */
  content: attr(data-done) " Email: "; 
}
```

![Sử dụng CSS content như thế nào cho đúng](https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_562,f_auto,q_auto/v1537973143/psuedo_brk7jp.png)

Không phải giá trị nào đưa vào content này cũng hợp lệ

```css
/* Được */
::after {
  content: "1";
}
```

```css
/* Không được */
::after {
  content: 1;
}
```

Không thể tính toán gì đâu, nó chỉ là string thôi

```html
<div data-price="4" data-sale-modifier="0.9">Coffee</div>
```
```css
/* Méo chạy */
div::after {
  content: " $" 
    calc(attr(data-price) * attr(data-sale-modifier));
}
/* Nope */
::after {
  content: calc(2 + 2);
}
```

Muốn nối chuỗi ư?

```css
/* Không chạy đâu, không phải javascript hay php */
::after {
  content: "1" . "2" . "3";
  content: "1" + "2" + "3";

  /* Dùng bình thường thế này thôi */
  content: "1" "2" "3";
  content: "1 2 3";
}
```

Đường dẫn hình thì được, mà không cho thay đổi kích thước hình ¯\_(ツ)_/

```css
p:before {
  content: url(image.jpg);
}
```

[Link bài viết gốc](https://css-tricks.com/valid-css-content/)