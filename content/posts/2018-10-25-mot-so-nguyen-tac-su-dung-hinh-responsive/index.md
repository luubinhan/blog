---
slug: "/2018-10-25-mot-so-nguyen-tac-su-dung-hinh-responsive"
date: "2018-10-25"
title: "Một số nguyên tắc với hình ảnh responsive"
desc: "Nếu bạn đã quên hoặc chưa biết, hình tiêu tốn hơn 50% dung lượng tải trang. Responsive image tuy dễ nhưng không nên xem nhẹ"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["mobile-web-specialist"]
---

<!-- TOC -->

- [Một số nguyên tắc chung](#một-số-nguyên-tắc-chung)
- [Kích thước phù hợp](#kích-thước-phù-hợp)
- [Sử dụng `srcset`](#sử-dụng-srcset)
- [Sử dụng thẻ `<picture />`](#sử-dụng-thẻ-picture-)
- [Thuộc tính `sizes`](#thuộc-tính-sizes)
- [Trường hợp đặc biệt: ảnh sản phẩm](#trường-hợp-đặc-biệt-ảnh-sản-phẩm)
- [Một số kỹ thuật khác](#một-số-kỹ-thuật-khác)
  - [Nén ảnh](#nén-ảnh)
  - [Dùng javascript](#dùng-javascript)
  - [Sử dụng loại ảnh phù hợp](#sử-dụng-loại-ảnh-phù-hợp)

<!-- /TOC -->

![Một số nguyên tắc với hình ảnh responsive](https://developers.google.com/web/fundamentals/design-and-ux/responsive/img/art-direction.png)

Crop, thay đổi vị trí đặt hình, hoặc thậm chí là thay luôn một hình khác trên từng màn hình, miễn sao nó hiển thị đúng ý đồ của designer, như trong hình ví dụ, hình người chèo thuyền phải nằm giữa

# Một số nguyên tắc chung

- Luôn sử dụng kích thước hình phù hợp
- Sử dụng thẻ `<picture >` khi muốn chỉ định từng hình cũ thể cho từng màn hình.
- Sử dụng `srcset` trong thẻ `<img />` để báo với trình duyệt chọn hình tốt nhất trong từng trường hợp
- Nếu chỉ có 1 hoặc 2 hình, và nó chỉ được sử dụng ở một trang, sử dụng loại ảnh phù hợp

# Kích thước phù hợp

Chỉ định đơn vị `width` của hình phù hợp, tránh để nó lớn viewport.

```css
img, embed, object, video {
  max-width: 100%;
}
```

# Sử dụng `srcset`

Với thuộc tính `srcset`, trình duyệt có thể quyết định load hình nào tùy theo thiết bị, ví dụ 2x trên màn hình retina, hoặc 1x trên màn hình retina khi mạng chậm

```html
<img src="photo.png" srcset="photo@2x.png 2x" />
```

# Sử dụng thẻ `<picture />`

Thẻ `<picture />` sẽ cho khai báo nhiều hình khác nhau ứng với từng điều kiện như: kích thước, độ phân giải, chiều đứng hay ngang.

```html
<picture>
  <source media="(min-width: 800px)" srcset="head.jpg, head-2x.jpg 2x">
  <source media="(min-width: 450px)" srcset="head-small.jpg, head-small-2x.jpg 2x">
  <img src="head-fb.jpg" srcset="head-fb-2x.jpg 2x" alt="a head carved out of wood">
</picture>
```

Xài thử [https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/media.html](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/media.html)

# Thuộc tính `sizes`

Đọc thêm bài [Tầm quan trọng của thuộc tính sizes trong thẻ img](/2018-07-30-huong-dan-tam-quan-trong-cua-thuoc-tinh-sizes-trong-the-img)

# Trường hợp đặc biệt: ảnh sản phẩm

Khách hàng luôn thích xem, sờ, ngắm thật kỹ sản phẩm muốn mua, luôn cho khách hàng ảnh thật chi tiết, to nhất, chất lượng nhất có thể, để khách hàng có thể zoom vào mà soi

![Một số nguyên tắc với hình ảnh responsive](https://developers.google.com/web/fundamentals/design-and-ux/responsive/img/sw-make-images-expandable-good.png)


# Một số kỹ thuật khác

## Nén ảnh

Kỹ thuật nén ảnh <a href="https://www.html5rocks.com/en/mobile/high-dpi/#toc-tech-overview" rel="noopener noreferrer">compressive image technique</a>này, với mức độ nén phù hợp, định dạng của ảnh gốc, chất lượng ảnh sau nén không thay đổi, nhưng kích thước giảm khá nhiều.

## Dùng javascript

Kiểm tra độ phân giả của màn hình bằng `window.devicePixelRatio`, và thông tin mạng `navigator.connection` rồi quyết định load hình nào.

Nhược điểm của cách này là phải đợi javascript chạy xong mới load hình, bị delay một chút.

## Sử dụng loại ảnh phù hợp

Nếu được thì xài SVG vì dung lượng nhỏ mà có võ, có thể nén bằng <a rel="noopener noreferrer" target="_blank" href="https://www.sarasoueidan.com/blog/svgo-tools/">công cụ này</a>

![Một số nguyên tắc với hình ảnh responsive](https://developers.google.com/web/fundamentals/design-and-ux/responsive/img/html5.svg)

Sử dụng Data URI để encode Base64 file hình thành `string`

```html
<img src="data:image/svg+xml;base64,[data]">

<!-- Ví dụ -->
<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiB
BZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW ...">
```

Để convert, thì có thể dùng [jpillora.com/base64-encoder](http://jpillora.com/base64-encoder/)

string convert được cũng có thể xài với thuộc tính background trong css

```css
.element {
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIi...);
}
```

Việc sử dụng background trong css có thể làm giảm số lượng HTTP request, bên cạnh đó là một nhược điểm

- Trên mobile, Data URI hiển thị chậm hơn `<img src="http://" />`
- Dảm số lượng request, nhưng tăng kích thước của request css
- Data URI không cache được
- IE8 không hổ trợ
- HTTP/2 giảm số lượng request không còn cần thiết

Trong CSS có một thuộc tính để load hình như thẻ `<picture />` là `image-set` (hiện tại hổ trợ bởi chrome và safari)

```css
.element {
  background-image: url(icon1x.png);
  background-image: -webkit-image-set(  
    url(icon1x.png) 1x,  
    url(icon2x.png) 2x  
  );  
  background-image: image-set(
    url(icon1x.jpg) 1x,
    url(icon2x.jpg) 2x  
  );
}
```

Với độ phân giải 2x, 1x

```css
@media (min-resolution: 2dppx), /* Standard syntax */ 
(-webkit-min-device-pixel-ratio: 2)  /* Safari & Android Browser */ 
{
  .sample {
    background-size: contain;
    background-image: url(icon2x.png);
  }
}
```

Các phương pháp như lựa chọn hình JPG, GIF, PNG, các phương pháp giảm kích thước file (mình hay dùng FileOptimizer), image sprite, lazy load khá phổ biến nên mình không đề cập ở đây.

<ul>
  <li>
    <a target="_blank" rel="noopener noreferrer" href="https://responsiveimages.org/demos/">
      Demo
    </a>
  </li>
  <li>
    <a target="_blank" rel="noopener noreferrer" href="https://developers.google.com/web/fundamentals/design-and-ux/responsive/images">
      Images
    </a>
  </li>
</ul>
