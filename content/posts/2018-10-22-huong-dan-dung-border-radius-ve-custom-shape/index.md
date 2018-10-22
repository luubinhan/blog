---
slug: "/2018-10-22-huong-dan-dung-border-radius-ve-custom-shape"
date: "2018-10-22"
title: "Sử dụng border-radius để vẽ custom shape"
desc: "Trick hay trong CSS sử dụng border-radius để vẽ hình"
cover: "https://9elements.com/io/images/border-radius-7.png"
type: "post"
lesson: 0
chapter: 0
tags: ["css"]
---

Anh <a href="https://9elements.com/io/css-border-radius/" target="_blank" rel="noopener noreferrer">Nils Binder</a> nghĩ ra một trick khá hay để tạo vẽ hình bằng `border-radius`

Bạn có thể dùng ngay luôn [công cụ anh này làm](https://9elements.github.io/fancy-border-radius/), kéo chỉnh theo ý muốn, rồi copy giá trị.

**Giải thích cách làm này**

![Sử dụng border-radius để vẽ custom shape](https://9elements.com/io/images/border-radius-2.png)

Nếu chúng ta set `border-radius: 50%`, giá trị % này là dựa trên chiều rộng và cao của element. Nếu element hình vuông, chúng ta có một hình tròn, là hình chữ nhật? chúng ta không nhận được hình tròn nữa.

Nếu set 4 giá trị khác nhau cho 4 góc

![Sử dụng border-radius để vẽ custom shape](https://9elements.com/io/images/border-radius-3.png)

Mấy cách làm trên không có gì đặc biệt, điều đặc biệt là khi dùng giá trị với dấu `/`, theo kiểu

```css
.element {
  border-radius: a b c d / e f g h;
}
```

Theo W3C định nghĩa 4 giá trước `/` sẽ là radius cho hướng nằm ngang, 4 giá trị sau `/` là giá trị radius cho hướng thẳng đứng, nếu không có dấu `/` coi như 2 giá trị này bằng nhau.

Như vậy, nếu set `border-radius: 4em 8em` sẽ khác với `border-radius: 4em / 8em`

![Sử dụng border-radius để vẽ custom shape](https://9elements.com/io/images/border-radius-4.png)

Với cách làm này, ta có kết quả

![Sử dụng border-radius để vẽ custom shape](https://9elements.com/io/images/border-radius-5.png)

![Sử dụng border-radius để vẽ custom shape](https://9elements.com/io/images/border-radius-6.png)

Dễ như ăn cơm sườn há!!