---
slug: "/2019-09-27-huong-dan-su-dung-media-query"
date: "2019-09-27"
title: "Căn bản cách sử dụng media query"
desc: "Những kiến thức căn bản bắt buộc nhất để bạn làm responsive"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["hoc-thuat", "css"]
---


Query media là kiến thức bắt buộc phải nắm nếu muốn làm tốt responsive, nó sẽ được sử dụng trong các trường hợp sau 

- Đặt điều kiện để apply css qua `@media` hoặc `@import`

- Chỉ định cụ thể trên một số HTML element và các file resource cho `<link/>` và `<source />`

- Kiểm tra sự thay đổi kích thước của window trong hàm `Window.matchMedia` và `MediaQueryList.addListener` 

Bài này chỉ dùng CSS `@media` để làm ví dụ, sử dụng trên các cách khác cũng tương tự  

## Media type  

Chỉ định kiểu device sẽ có hiệu lực, nếu không truyền vào thì mặc định là `all`  

- `all` tất cả các loại device

- `print` đang xem trên màn hình ở chế độ preview, hoặc lúc in

- `screen` chỉ áp dụng trên màn hình

- `speech` các thiết bị đọc văn bản  

Các thằng khác đã bỏ rồi, nên các bạn không cần nhớ chi cho nhiều, thấy một số bài viết trên mạng còn liệt kê chi không biết.  

Cũng không sử dụng nhiều đến cách này, đa phần khi thiết kế thì người ta làm trên từng kích thước độ rộng màn hình, chứ không nghĩ cụ thể cho từng loại thiết bị như để in, xem trên màn hình  

```css
@media print { ... }
@media screen { ... }
@media speech{ ... }
```

## Toán tử logic

Có một số toán tử có thể sử dụng trong câu media là `not`, `and`, `only`, `,` - cái này thì giống như toán tử `or` vậy đó

```css
@media (min-height: 680px), screen and (orientation: portrait) { ... } 
@media screen and (min-width: 30em) and (orientation: landscape) { ... }
```

## Nâng cấp từ level 4 (đại khái là sử dụng trên trình duyệt cũ không đảm bảo đó)

Trước đây để áp dụng điều kiện **nằm trong khoản màn hình** nào đó, chúng ta dùng kiểu `max-width:` hay `min-width`

```css
@media (max-width: 30em) { ... }
@media (min-width: 30em) and (max-width: 50em) { ... }
```

Giờ có thể viết theo kiểu

```css
@media (width <= 30em) { ... }
@media (30em <= width <= 50em) { ... }
```

## Pattern hay sử dụng  

Tài liệu thì rườm rà, rắc rối vậy thôi, chứ khi sử dụng, mình chỉ dùng bộ media định nghĩa trong bootstrap là đủ xài

```css
// màn hình điện thoại
@media (min-width: 576px) { ... }
// màn hình ipad đứng
@media (min-width: 768px) { ... }
// màn hình bự hơn ipad
@media (min-width: 992px) { ... }
// màn hình laptop trở lên
@media (min-width: 1200px) { ... }
```