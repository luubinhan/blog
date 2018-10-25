---
slug: "/2018-07-30-huong-dan-tam-quan-trong-cua-thuoc-tinh-sizes-trong-the-img"
date: "2018-07-30"
title: "Tầm quan trọng của thuộc tính sizes trong thẻ img"
desc: "Một tình huống cơ bản product slider images, trên điện thoại, chúng ta có mỗi slide một ảnh với chiều ngang 320px, trên desktop chúng ta có 6 ảnh/slide, ảnh rộng 160px, tức là kích thước ảnh trên desktop nhỏ hơn trên di động, dùng srcset giải quyết vấn đề này như thế nào"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["css", "mobile-web-specialist"]
---

# Cung cấp kích thước ảnh trên `srcset`

Thay vì fix luôn 1 kích thước hình cụ thể, trên thuộc tính `srcset` chúng ta báo kích thước của hình tương ứng, cho phép trình duyệt tính toán với viewport hiện tại và download hình thích hợp

```html
<img
  src="small.jpg"
  srcset="medium.jpg 1000w, large.jpg 2000w"
  alt="luckyluu blog | Viết tuts cho thế hệ trẻ"
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

*Trình duyệt* - màn hình của mày là 1x, 1.5625 là tỉ lệ gần nhất với 1, tuy hơi cao nhưng tốt hơn mấy thằng kia. Tao load thằng `small.jpg`

Nếu là màn hình 2x, trình duyệt sẽ chọn 3.125 vì nó gần với giá trị 2 nhất.

# Breakpoint

Hầu như khi layout thay đổi theo breakpoint, hình cũng sẽ thay đổi kích thước. Ví dụ, trên điện thoại, bạn thường cho hình full hết viewport, trên màn hình lớn như desktop, bạn chỉ để hình float bên trái thôi.

Với thuộc tính `sizes`, nếu không xác định mặc định sẽ là 100 viewport width

```html
<img
  src="small.jpg"
  srcset="medium.jpg 1000w, large.jpg 2000w"
  alt="luckyluu blog | Viết tuts cho thế hệ trẻ"
  sizes="100vw"
>
```

Để ý ta không dùng thuộc tính `sizes`. Trình duyệt ngầm hiểu chúng ta muốn render ảnh ở độ rộng 100vw.

![Tầm quan trọng của thuộc tính sizes trong thẻ img](https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_1000,f_auto,q_auto/v1531489586/640-version_txwye1.png)

Để báo với trình duyệt cần render theo breakpoint, chúng ta khai báo thuộc tính `sizes` như sau

```html
<img srcset="
  food-big.jpg 640w,
  foot-medium.jpg 320w,
  food-small.jpg 160w"
 
  sizes="(min-width: 600px) 160px, 320px"
/>
```

Đoạn trên nếu dịch ra thì sẽ là: ê trình duyệt, render kích thước 160px khi viewport > 600px, còn lại cứ dùng kích thước 320px

![Tầm quan trọng của thuộc tính sizes trong thẻ img](https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_1000,f_auto,q_auto/v1531489882/320-version_afwzxa.png)

Kích thước trên mobile

![Tầm quan trọng của thuộc tính sizes trong thẻ img](https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_1000,f_auto,q_auto/v1531490069/640-version-mobile_l15ira.png)

[css-tricks.com/sometimes-sizes-is-quite-important](https://css-tricks.com/sometimes-sizes-is-quite-important/)

[Responsive Images: If you’re just changing resolutions, use srcset.](https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/)
