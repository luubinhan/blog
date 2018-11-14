---
slug: "/2018-11-14-chi-dan-thiet-ke-form-cua-google"
date: "2018-11-14"
title: "Chỉ dẫn thiết kế form từ Google"
desc: "Bài này nằm trong loạt bài chuẩn kiến thức để đi thi web mobile specialist của google. Một vài đều cần nhớ khi thiết kế và làm việc với form"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["ux-ui", "mobile-web-specialist"]
---

<!-- TOC -->

- [Tránh lặp lại](#tránh-lặp-lại)
  - [Credit Card](#credit-card)
  - [Name](#name)
  - [Email](#email)
  - [Address](#address)
  - [Phone](#phone)
  - [Payment](#payment)
- [How far I go?](#how-far-i-go)
- [Field ngày tháng](#field-ngày-tháng)
- [Sử dụng input type phù hợp](#sử-dụng-input-type-phù-hợp)
- [Gợi ý thông qua trường `datalist`](#gợi-ý-thông-qua-trường-datalist)
- [auto focus khi cần thiết](#auto-focus-khi-cần-thiết)
- [Hãy tin vào Chrome](#hãy-tin-vào-chrome)
  - [Không sử dụng input chuẩn](#không-sử-dụng-input-chuẩn)
  - [Dùng placeholder giả](#dùng-placeholder-giả)
  - [Tự động copy shipping address vào billing address](#tự-động-copy-shipping-address-vào-billing-address)
- [Validate form với HTML5](#validate-form-với-html5)

<!-- /TOC -->

Thiết kế form cần tránh việc bắt user làm tới làm lui, đòi hỏi nhiều thông tin hơn cần thiết, hay cảm giác bị lạc lối giữa một cái form quá dài quá nhiều step

Nguyên tắc chung

- Bật autofill trên form đề trình duyệt của user có thể tự điền các field đã biết, hiển thị lại những giá trị mà user đã nhập
- Label rõ ràng để user biết mình đang nhập cái gì, ở đâu.


## Tránh lặp lại

![Một số gợi ý khi thiết kế form](https://developers.google.com/web/fundamentals/design-and-ux/input/forms/imgs/forms-multipart-good.png)

Ví dụ trên trang đăng ký nếu chúng ta đã cho user nhập first name và last name, có thể cho generate tự động ra một giá trị cho field nickname để đăng nhập. Hoặc trường hợp trên trang checkout, cho phép lưu lại địa chỉ giao hàng cho lần checkout sau.

Để tiết kiệm thời gian tiền bạc cho user, khai thác tính năng autofill có sẵn của trình duyệt.

```html
<input type="text" autocomplete="address-line1" />
```

### Credit Card

```html
<label for="frmNameCC">Name on card</label>
<input name="ccname" id="frmNameCC" required placeholder="Full Name" autocomplete="cc-name">

<label for="frmCCNum">Card Number</label>
<input name="cardnumber" id="frmCCNum" required autocomplete="cc-number">

<label for="frmCCCVC">CVC</label>
<input name="cvc" id="frmCCCVC" required autocomplete="cc-csc">

<label for="frmCCExp">Expiry</label>
<input name="cc-exp" id="frmCCExp" required placeholder="MM-YYYY" autocomplete="cc-exp">
```

### Name 

```html
<label for="frmNameA">Name</label>
<input name="name" id="frmNameA" placeholder="Full name" required autocomplete="name">
```

### Email

```html
<label for="frmEmailA">Email</label>
<input type="email" name="email" id="frmEmailA" placeholder="name@example.com" required autocomplete="email">

<label for="frmEmailC">Confirm Email</label>
<input type="email" name="emailC" id="frmEmailC" placeholder="name@example.com" required autocomplete="email">
```

### Address

```html
<label for="frmAddressS">Address</label>
<input name="ship-address" required id="frmAddressS" placeholder="123 Any Street" autocomplete="shipping street-address">

<label for="frmCityS">City</label>
<input name="ship-city" required id="frmCityS" placeholder="New York" autocomplete="shipping locality">

<label for="frmStateS">State</label>
<input name="ship-state" required id="frmStateS" placeholder="NY" autocomplete="shipping region">

<label for="frmZipS">Zip</label>
<input name="ship-zip" required id="frmZipS" placeholder="10011" autocomplete="shipping postal-code">

<label for="frmCountryS">Country</label>
<input name="ship-country" required id="frmCountryS" placeholder="USA" autocomplete="shipping country">
```


### Phone

```html
<label for="frmPhoneNumA">Phone</label>
<input type="tel" name="phone" id="frmPhoneNumA" placeholder="+1-650-450-1212" required autocomplete="tel">
```


### Payment

```html
<label for="frmNameCC">Name on card</label>
<input name="ccname" id="frmNameCC" required placeholder="Full Name" autocomplete="cc-name">

<label for="frmCCNum">Card Number</label>
<input name="cardnumber" id="frmCCNum" required autocomplete="cc-number">

<label for="frmCCCVC">CVC</label>
<input name="cvc" id="frmCCCVC" required autocomplete="cc-csc">

<label for="frmCCExp">Expiry</label>
<input name="cc-exp" id="frmCCExp" required placeholder="MM-YYYY" autocomplete="cc-exp">
```

## How far I go?

Với các form được chia làm nhiều step trước khi submit, một thanh trạng thái cho user biết mình đang đến bước nào là bắt buộc.

![Một số gợi ý khi thiết kế form](https://designmodo.com/wp-content/uploads/2016/10/Checkout-Form.jpg)

## Field ngày tháng

Field ngày tháng là phải hiển thị lịch, để user không phải mở một ứng dụng calendar nào đó trên điện thoại, trên máy tính để kiểm tra ngày trước khi chọn.

![Một số gợi ý khi thiết kế form](https://developers.google.com/web/fundamentals/design-and-ux/input/forms/imgs/forms-calendar-good.png)

## Sử dụng input type phù hợp

HTML5 hỗ trợ khá nhiều kiểu input mà căn cứ vào đó trên điện thoại, thiết bị có thể hiển thị bàn phím thích hợp cho từng kiểu input
- url
![Một số gợi ý khi thiết kế form](https://developers.google.com/web/fundamentals/design-and-ux/input/forms/imgs/url-ios.png)
- email
![Một số gợi ý khi thiết kế form](https://developers.google.com/web/fundamentals/design-and-ux/input/forms/imgs/email-android.png)
- search
![Một số gợi ý khi thiết kế form](https://developers.google.com/web/fundamentals/design-and-ux/input/forms/imgs/plain-ios.png)
- number
![Một số gợi ý khi thiết kế form](https://developers.google.com/web/fundamentals/design-and-ux/input/forms/imgs/number-android.png)
- range
![Một số gợi ý khi thiết kế form](https://developers.google.com/web/fundamentals/design-and-ux/input/forms/imgs/range-ios.png)
- datetime-local
![Một số gợi ý khi thiết kế form](https://developers.google.com/web/fundamentals/design-and-ux/input/forms/imgs/datetime-local-ios.png)
- datetime
![Một số gợi ý khi thiết kế form](https://developers.google.com/web/fundamentals/design-and-ux/input/forms/imgs/date-android.png)
- time
![Một số gợi ý khi thiết kế form](https://developers.google.com/web/fundamentals/design-and-ux/input/forms/imgs/time-ios.png)
- week
![Một số gợi ý khi thiết kế form](https://developers.google.com/web/fundamentals/design-and-ux/input/forms/imgs/week-android.png)
- month
![Một số gợi ý khi thiết kế form](https://developers.google.com/web/fundamentals/design-and-ux/input/forms/imgs/month-ios.png)
- color
![Một số gợi ý khi thiết kế form](https://developers.google.com/web/fundamentals/design-and-ux/input/forms/imgs/color-android.png)

## Gợi ý thông qua trường `datalist`

`<datalist />` là element cho phép chúng ta cung cấp các giá trị **gợi ý** với một `<input />`

```html
<label for="frmFavChocolate">Favorite Type of Chocolate</label>
<input type="text" name="fav-choc" id="frmFavChocolate" list="chocType">
<datalist id="chocType">
  <option value="white">
  <option value="milk">
  <option value="dark">
</datalist>
```

<div class="note">User không bắt buộc phải chọn các giá trị trong datalist, chỉ là gợi ý thích thì chọn</div>

## auto focus khi cần thiết

Trên thẻ input, nếu muốn input được focus ngay lập tức khi vừa vào trang, như login, focus vào ô username. Thuộc tính `autofocus` này sẽ tự động bị ignore trên mobile để tránh xuất hiện bàn phím ko cần thiết.

```html
<input type="text" autofocus ...>
```

## Hãy tin vào Chrome

Rất nhiều trường hợp vì customize theo ý design mà tính năng autofill của Chrome không còn chạy đúng, nguyên nhân có thể là

### Không sử dụng input chuẩn

Lỗi thường thấy khi phải customize cái dropdown theo design mà không thể dùng thẻ `<select />`

### Dùng placeholder giả

Placeholder giả là gì? Thay vì dùng attribute placeholder, dùng `value="First Name"` rồi viết javascript để khi focus xóa giá trị này đi.

### Tự động copy shipping address vào billing address

Cơ bản thì Autofill của Chrome KO thể chạy được nữa nếu chúng ta cho copy dữ liệu từ shipping address qua billing address bằng javascript

## Validate form với HTML5

Bài này đọc lại [ở đây](/2018-11-02-validate-form-voi-html-5)

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html" target="_blank" rel="noopener noreferrer">Sample</a>

<a href="https://developers.google.com/web/fundamentals/design-and-ux/input/forms/" target="_blank" rel="noopener noreferrer">Create Amazing Forms</a>

<a href="https://developers.google.com/web/updates/2015/06/checkout-faster-with-autofill" target="_blank" rel="noopener noreferrer">Help users checkout faster with Autofill</a>
