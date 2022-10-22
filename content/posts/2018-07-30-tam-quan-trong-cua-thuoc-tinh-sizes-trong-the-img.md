---
slug: "/2018-07-30-huong-dan-tam-quan-trong-cua-thuoc-tinh-sizes-trong-the-img"
date: "2018-07-30"
title: "Tầm quan trọng của thuộc tính sizes, srcset trong thẻ img"
desc: "Hướng dẫn sử dụng srcset và sizes để tối ưu việc load ảnh responsive"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["css", "mobile-web-specialist"]
---

## `srcset`

Công dụng của thuộc tính `srcset` trên thẻ `<img/>` là cho phép chúng ta cung cấp các file với kích thước khác file được cung cấp trên `src`, chúng ta có thể sử dụng `srcset` vô tư, nếu trình duyệt ko hổ trợ `srcset` (IE cũ), nó đơn giản chỉ load file trên thuộc tính `src`.

Trên thuộc tính `srcset` chúng ta báo kích thước của hình này luôn, `medium.jpg 1000w` ( có nghĩa hình này width=1000px ) đa phần dùng width có thể giải quyết tất cả các trường hợp, trình duyệt không cần download vẫn biết được độ rộng của file, trên cơ sở đó, trình duyệt tính toán với viewport hiện tại và download hình thích hợp

```html
<img
  src="small.jpg"
  srcset="medium.jpg 1000w, large.jpg 2000w"
  alt="luckyluu blog | Tầm quan trọng của thuộc tính sizes, srcset trong thẻ img"
>
```

Thử xem trình duyệt đã tính toán thế nào. 

Thí dụ kích thước thiết bị là *320px*, 1x (là giá trị *density* của màn hình, xem ở đây https://pixensity.com/list/phone/, hoặc check bằng javascript `window.devicePixelRatio`).

Chúng ta có 3 hình

- small.jpg: 500px wide
- medium.jpg: 1000px wide
- large.jpg: 2000px wide

```
500 / 320 = 1.5625
1000 / 320 = 3.125
2000 / 320 = 6.25
```

*Trình duyệt* - màn hình của mày là 1x, 1.5625 là tỉ lệ gần nhất với 1, tuy hơi cao nhưng tốt hơn mấy thằng kia. Tao load thằng `small.jpg`

Nếu là màn hình 2x (nó sẽ lấy gía trị của `window.devicePixelRatio`), trình duyệt sẽ chọn 3.125 vì nó gần với 2 nhất.

Bên cạnh đơn vị `w`, tương ứng với kích thước của hình, chúng ta cũng có thể dùng đơn vị `x` tương ứng cho **độ** *density* của màn hình

```html
<img 
  src="image_2x.jpg" 
  srcset="image_2x.jpg 2x, image_1x.jpg 1x" 
  alt="luckyluu blog | Tầm quan trọng của thuộc tính sizes, srcset trong thẻ img"
/>
```

## `sizes`

Bên cạnh `srcset`, một thuộc tính rất hay ho khác là `sizes`, nó cũng sẽ giúp trình duyệt có cơ sở để load hình nào

> Nếu không dùng thuộc tính `sizes`. Trình duyệt ngầm hiểu chúng ta muốn render ảnh ở độ rộng 100vw.

![Tầm quan trọng của thuộc tính sizes trong thẻ img](https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_1000,f_auto,q_auto/v1531489586/640-version_txwye1.png)

Không phải lúc nào hình sẽ hiển thị hết 100vw của màn hình, ví dụ bạn có mà hình rộng 1000px, hình không hiển thị hết chiều ngang của màn hình, nhỏ hơn một nữa đi, tức là bạn chỉ cần hình có kích thước `1000/2 = 500px` là đủ xài

```css
img {
  float: left;
  width: 500px;
}
```

Trước khi trình duyệt load được css, nó sẽ **ko biết được** là hình chỉ có hiển thị tối đa 500px, chúng ta báo với nó, "Ê, hình này của tao chỉ hiển thị tối đa là 500px nhé" bằng HTML

```html
<img
  src="small.jpg"
  srcset="medium.jpg 1000w, large.jpg 2000w"
  alt="luckyluu blog | Tầm quan trọng của thuộc tính sizes, srcset trong thẻ img"
  sizes="500px"
>
```

Nhưng trên điện thoại, chúng ta muốn khác, hình này sẽ full hết 100% viewport,

```css
@media (max-width: 600px) {
  img {
    float: none;
    width: 100vw;
  }
}
```


Để báo với trình duyệt có một sự thay đổi *nhỏ** trên nếu màn hình < 600px, chúng ta khai báo thuộc tính `sizes` như sau

```html
<img 
  src="small.jpg"
  srcset="medium.jpg 1000w, large.jpg 2000w"
  alt="luckyluu blog | Tầm quan trọng của thuộc tính sizes, srcset trong thẻ img"
  sizes="(max-width: 600px) 100vw, 500px"
/>
```

Đoạn trên nếu dịch rad: ê trình duyệt, hình này sẽ render kích thước 100vw khi viewport < 600px, còn lại cứ dùng kích thước 500px

![Tầm quan trọng của thuộc tính sizes trong thẻ img](https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_1000,f_auto,q_auto/v1531489882/320-version_afwzxa.png)

Kích thước trên mobile

![Tầm quan trọng của thuộc tính sizes trong thẻ img](https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_1000,f_auto,q_auto/v1531490069/640-version-mobile_l15ira.png)

[css-tricks.com/sometimes-sizes-is-quite-important](https://css-tricks.com/sometimes-sizes-is-quite-important/)

[Responsive Images: If you’re just changing resolutions, use srcset.](https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/)
