---
slug: "/2018-07-30-tam-quan-trong-cua-thuoc-tinh-sizes-trong-the-img"
date: "2018-07-30"
title: "Tầm quan trọng của thuộc tính sizes trong thẻ img"
desc: "Một tình huống cơ bản product slider images, trên điện thoại, chúng ta có mỗi slide một ảnh với chiều ngang 320px, trên desktop chúng ta có 6 ảnh/slide, ảnh rộng 160px, tức là kích thước ảnh trên desktop nhỏ hơn trên di động, dùng srcset giải quyết vấn đề này như thế nào"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["css"]
---

Với thuộc tính `srcset` chúng ta sẽ sử dụng những version khác nhau của cùng 1 ảnh cho các độ phận giải khác nhau, trình duyệt tự xác định hình nào tốt nhất.

```html
<img
  src="small.jpg"
  srcset="medium.jpg 1000w, large.jpg 2000w"
  alt="yah"
>
```

Thử xem trình duyệt đã tính toán thế nào. Thí dụ kích thước thiết bị là *320px*, 1x (không phải retina), chúng ta có 3 hình

- small.jpg: 500px wide
- medium.jpg: 1000px wide
- large.jpg: 2000px wide

```
500 / 320 = 1.5625
1000 / 320 = 3.125
2000 / 320 = 6.25
```

Trình duyệt: Ok, tao thấy mày đang dạng màn hình 1x, 1.5625 là tỉ lệ gần nhất với 1, tuy hơi cao nhưng tốt hơn mấy thằng kia.

Nếu là màn hình 2x, trình duyệt sẽ chọn 3.125 vì nó gần với giá trị 2 nhất.

`srcset` giống như là số lựa chọn khác, kèm thông tin thêm, giúp trình duyệt chọn lựa.

Thế còn `sizes` ? Nếu không xác định mặc định sẽ là 100 viewport width

```html
<img
  src="small.jpg"
  srcset="medium.jpg 1000w, large.jpg 2000w"
  alt="yah"
  sizes="100vw"
>
```

Quay lại với câu hỏi ban đầu

<p data-height="265" data-theme-id="0" data-slug-hash="QBbQeR" data-default-tab="html,result" data-user="chriscoyier" data-pen-title="Responsive Images Slider" class="codepen">See the Pen <a href="https://codepen.io/chriscoyier/pen/QBbQeR/">Responsive Images Slider</a> by Chris Coyier  (<a href="https://codepen.io/chriscoyier">@chriscoyier</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>


```html
<img srcset="
  food-big.jpg 640w,
  foot-medium.jpg 320w,
  food-small.jpg 160w"
/>
```

Để ý ta không dùng thuộc tính `sizes`. Trình duyệt ngầm hiểu chúng ta muốn render ảnh ở độ rộng 100vw, và trình duyệt sẽ download kích thước file lớn hơn file nó cần, điều này ko thông minh

![](https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_1000,f_auto,q_auto/v1531489586/640-version_txwye1.png)

Để trình duyệt có sự lựa chọn sáng suốt hơn khi download file trong trường hợp này, ta sử dụng `sizes`

```html
<img srcset="
  food-big.jpg 640w,
  foot-medium.jpg 320w,
  food-small.jpg 160w"
 
  sizes="(min-width: 600px) 160px, 320px"
/>
```

Đoạn trên nếu dịch ra thì sẽ là: ê trình duyệt render kích thước 160px trên window > 600px, còn lại cứ dùng kích thước 320px

![](https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_1000,f_auto,q_auto/v1531489882/320-version_afwzxa.png)

Kích thước trên mobile

![](https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_1000,f_auto,q_auto/v1531490069/640-version-mobile_l15ira.png)

[Link bài gốc](https://css-tricks.com/sometimes-sizes-is-quite-important/)

[Responsive Images: If you’re just changing resolutions, use srcset.](https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/)

