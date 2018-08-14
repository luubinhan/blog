---
slug: "/2018-07-04-huong-dan-tong-hop-canh-le-voi-flexbox-alignment"
date: "2018-07-04"
title: "Tổng quát về canh lề với Flexbox display"
desc: "Nếu giờ chưa nắm vững về flexbox và cách canh lề trong flexbox thì thật là thiếu xót trong thời đại 2018, chúng ta đã qua thời xài float, clearfix vốn được giới thiệu từ 2004"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["css"]
---

<!-- TOC -->

- [Cần nắm](#cần-nắm)
- [flex-direction](#flex-direction)
- [justify-content](#justify-content)
- [align-items và align-self](#align-items-và-align-self)

<!-- /TOC -->

## Cần nắm

Khi sử dụng `display: flex` các element con trong nó chúng ta sẽ canh theo 2 phương, gọi là phương ngang và phương đứng nhé.

![](https://cms-assets.tutsplus.com/uploads/users/30/posts/30183/image/axes.png)

## flex-direction

`flex-direction` sẽ có 4 giá trị để ta set

1. `flex-direction: row`: element con xếp theo từng hàng, chỉ xuống hàng khi set `flex-wrap: wrap`, hoặc viết tắt 2 thuộc tính này lại thành `flex-flow: row wrap`
2. `flex-direction: row-reserve`: element con xếp thèo hàng đi từ phải qua trái
3. `flex-direction: column`: element con xếp theo cột từ trên xuống dưới
4. `flex-direction: column-reserve`: element con xếp theo cột từ dưới lên trên

![](http://codropspz.tympanus.netdna-cdn.com/codrops/wp-content/uploads/2015/02/flex-direction-illustration.jpg)

## justify-content

Với `justify-content` sẽ ảnh hưởng tới phương ngang của các element con, nếu `.container` chúng ta xếp các element theo dạng row (mặc định khi set `display: flex`), chúng ta can thịp chiều xếp đống element con trong row này bằng `justify-content`

1. `flex-start` : elements từ trái qua phải trong 1 row
2. `flex-end`: elements từ phải qua trái trong 1 row
3. `center`: dàn các element từ giữa ra 2 bên
4. `space-between`: dàn các element đều hết 1 row, chỉ chừa khoảng trống giữa 2 element, không chừa khoảng trống 2 element cuối
5. `space-around`: tương tự như `space-around` nhưng chừa luôn khoảng trống 2 element cuối

![](https://uploads.toptal.io/blog/image/122559/toptal-blog-image-1490181185089.2_newsletter_copy_11-ac07811eeed0c992b21c660cd6119ca8.jpg)

## align-items và align-self

Thuộc tính `align-items` sẽ ảnh hưởng đến phương đứng của element con, nếu `align-items` dùng để set ở `.container` thì `align-self` sẽ set ở element con để override lại giá trị trên từng thằng con

Cả 2 thằng này đều có thể có những giá trị sau

1. `auto` giá trị `align-self` kế thừa từ `align-items`, mặc định của `align-self`
2. `flex-start`: align từ trên xuống
3. `flex-end`: align từ dưới lên
4. `center`: align từ giữa ra trên dưới
5. `baseline`: align theo baseline của các element nằm ngang nhau
6. `stretch`: kéo độ cao của element để phủ hết chiều đứng của `.container`

![](https://image.slidesharecdn.com/css3-layoutinctrlpdf-130218082731-phpapp01/95/slide-53-1024.jpg)