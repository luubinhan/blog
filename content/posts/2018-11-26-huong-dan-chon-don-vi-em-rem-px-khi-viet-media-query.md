---
slug: "/2018-11-26-huong-dan-chon-don-vi-em-rem-px-khi-viet-media-query"
date: "2018-11-26"
title: "Dùng Px, Em hay Rem để viết media query"
desc: "Khi viết media query, bạn có bao giờ thắc mắc nên dùng đơn vị nào: px, em hay rem?"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["css"]
---

<!-- TOC -->

- [Setup để thử nghiệm](#setup-để-thử-nghiệm)
- [Thay đổi font size ở HTML](#thay-đổi-font-size-ở-html)
- [User gọi Zoom In](#user-gọi-zoom-in)
- [User thay đổi giá trị font mặc định của trình duyệt](#user-thay-đổi-giá-trị-font-mặc-định-của-trình-duyệt)
- [Kết luận](#kết-luận)

<!-- /TOC -->

Các bạn đọc bài này mình mặc định bạn đã phân biệt được sự khác nhau giữa `em` và `rem`

## Setup để thử nghiệm

Chúng ta sẽ dùng 3 div tô 3 màu khác nhau để thấy được kết quả dễ dàng

```css
.pixel { background: red; }
.em { background: green; }
.rem { background: blue; }
```

Chúng ta viết query min-width trên 3 element này, thay đổi opacity để thấy được khi nào css này được áp dụng

```scss
.pixel {
	background: red;
	@media (min-width: 400px) {
		opacity: .5
	}
}
```

Chúng ta sẽ đặt font-size cho html là 16px = 1em = 1rem. Như vậy 400px = 25em = 25rem

```scss
.em {
  background: green;  
  @media (min-width: 25em) {
    opacity: 0.5
  }
}

.rem {
  background: blue;  
  @media (min-width: 25rem) {
    opacity: 0.5
  }
}
```

Tất cả đều được trigger ở chính xác kích thước 400px

![Dùng Px, Em hay Rem để viết media query](https://zellwk.com/images/2016/media-query-units/control.gif)

## Thay đổi font size ở HTML

Trường hợp phổ biến nhất chúng ta hay gặp là thay đổi font-size trên HTML

```css
html {
	font-size: 200%;
}
```

Khi thay đổi font-size lên 200%, nghĩa là 1em = 1rem = 32px. Nếu sự thay đổi font-size này tác động lên `em` và `rem`, chúng ta sẽ thấy 2 element bên dưới trigger ở 800px

Kết quả trên Chrome, Firefox và IE11, cả 3 thằng đều trigger ở 400px

![Dùng Px, Em hay Rem để viết media query](https://zellwk.com/images/2016/media-query-units/chrome.gif)

Nếu chạy đúng, `em` và `rem` không nên bị ảnh hưởng bởi thay đổi font-size trên HTML, nó chỉ được phụ thuộc vào font-size mặc định của trình duyệt.

Tuy nhiên, trên Safari lại cho kết quả không như mong đợi, nó trigger ở 800px

![Dùng Px, Em hay Rem để viết media query](https://zellwk.com/images/2016/media-query-units/safari-200.gif)

Với kết quả này chúng ta có thể bỏ qua việc sử dụng `rem` với media query vì nó ko đảm bảo chạy đúng trên mọi trình duyệt.

Tuy nhiên, các thí nghiệm bên dưới chúng ta vẫn đưa `rem` vào cho vui!

## User gọi Zoom In

Đây cũng là tình huống thường thấy, chữ quá nhỏ, user có xu hướng zoom to lên xem.

> Nguyên nhân chính có đơn vị `em` là vì các trình duyệt cũ không thể update giá trị pixel khi user gọi zoom

Trên Chrome, Firefox và IE, `px`, `em`, `rem` xảy ra cùng lúc

![Dùng Px, Em hay Rem để viết media query](https://zellwk.com/images/2016/media-query-units/chrome-zoom.gif)

Và đương nhiên Safari tiếp tục không giống ai 

![Dùng Px, Em hay Rem để viết media query](https://zellwk.com/images/2016/media-query-units/safari-zoom.gif)

Điều này có nghĩa là, đơn vị pixel không đúng trên mọi browser, bạn nên dừng sử dụng pixel trong câu media query, trừ khi bạn thuộc kiểu sống bất chấp sự tồn tại của safari
## User thay đổi giá trị font mặc định của trình duyệt

Rất nhiều developer tin rằng user chả đứa nào thay đổi font size mặc định của trình duyệt, tìm cái thiết đặt này trong trình duyệt đã đủ khó khăn làm user nản chí

Tuy nhiên đó là niềm tin không có căn cứ, không có dữ liệu chứng minh được, user vẫn có thể google tìm cách thay đổi font size mặc định của trình duyệt, đặc biệt các thanh niên bị cận như mình.

Nếu chưa biết cách thay đổi font-size mặc định của trình duyệt, mình chỉ cho

Chrome: **Settings > Show advanced settings > Web content**
Firefox: **preferences > content > fonts and colors**
IE: **page > text-size**

Safari thì mình chưa biết thay đổi font-size của nó bằng cách nào.

![Dùng Px, Em hay Rem để viết media query](https://zellwk.com/images/2016/media-query-units/chrome-very-large-font-size.gif)

Như có thể thấy, câu query dùng `px` trigger sớm hơn `em` và `rem`

Cái này không phải là bug, vì px là đơn vị chính xác đến từng pixel!!! Nó chỉ cần biết kích thước độ rộng màn hình, không liên quan họ hàng gì tới font-size

Ngược lại 2 đơn vị `rem` và `em` phụ thuộc hoàn toàn vào font-size của trình duyệt

> Chúng ta phải nói lời chia tay với pixel khi viết media query

Ví dụ bạn setup để màn hình dưới 600px có một cột, ngược lại có 2 cột. Mọi thứ đẹp nếu font size là 16px, tuy nhiên nếu user đổi font size thành 20px và xem ở màn hình 650px. Đơn vị `rem` và `em` sẽ cho ra giao diện 1 cột, trong khi pixel vẫn *lì lợm* 2 cột bất chấp cái font chữ giờ đã to đùng.

## Kết luận

**Đơn vị cho kết quả chấp nhận được ở mọi tình huống là `em`**

Nếu từng thắc mắc khi đang dùng một thư viện nào đó, như bootstrap, tại sao nó lại dùng đơn vị `em` trong câu media query, thì giờ bạn đã có câu trả lời rồi đó.

<a target="_blank" rel="noopener noreferrer" href="https://zellwk.com/blog/media-query-units/">PX, EM or REM Media Queries?</a>



