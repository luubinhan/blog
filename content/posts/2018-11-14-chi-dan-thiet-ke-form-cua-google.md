---
slug: "/2018-11-14-chi-dan-thiet-ke-form-cua-google"
date: "2018-11-14"
title: "Chỉ dẫn thiết kế form từ Google"
desc: "Bài này nằm trong loạt bài chuẩn kiến thức để đi thi web mobile specialist của google. Một vài điểm cần nhớ khi thiết kế và làm việc với form"
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

Để tiết kiệm thời gian tiền bạc cho user, khai thác tính năng **autocomplete** có sẵn của trình duyệt.

```html
<input type="text" autocomplete="email" />
<input type="text" autocomplete="address-line1" />
```

Ta muốn autocomplete giá trị gì thì báo với trình duyệt luôn, hoặc dùng giá trị `name='giá trị name chuẩn'`, hoặc `autocomplete='giá trị autocomplete chuẩn'`

Chuẩn này đã được [WHATWG HTML Standard.](https://html.spec.whatwg.org/multipage/forms.html#autofill) đặt ra ko phải mình

|  Trường | Giá trị name  |  Giá trị autocomplete  |
|---|---|---|
| Name  | name fname mname lname  | name (full name)
given-name (first name)
additional-name (middle name)
family-name (last name)  |
|  Email |  email |  email |
| Address  | address city region province state zip zip2 postal country  | For one address input:
street-address
For two address inputs:
address-line1
address-line2
address-level1 (state or province)
address-level2 (city)
postal-code (zip code)
country  |
|  Phone | phone mobile country-code area-code exchange suffix ext  | tel  |
|  Credit Card |  ccname cardnumber cvc ccmonth ccyear exp-date card-type |  cc-name
cc-number
cc-csc
cc-exp-month
cc-exp-year
cc-exp
cc-type |
|  Usernames | username  | username  |
| Passwords  | password  | current-password (for sign-in forms)
new-password (for sign-up and password-change forms)  |



## How far I go?

Với các form được chia làm nhiều step trước khi submit, một thanh trạng thái cho user biết mình đang đến bước nào là bắt buộc.

![Một số gợi ý khi thiết kế form](https://designmodo.com/wp-content/uploads/2016/10/Checkout-Form.jpg)

## Giá trị ngày tháng

Trường ngày tháng để user chọn từ lịch, không tách ra thành các input độc lập dạng ngày-tháng-năm, user không cần phải mở một ứng dụng calendar khác đó trên điện thoại, trên máy tính để kiểm tra ngày trước khi chọn.

![Một số gợi ý khi thiết kế form](https://developers.google.com/web/fundamentals/design-and-ux/input/forms/imgs/forms-calendar-good.png)

## Sử dụng input type phù hợp

HTML5 hỗ trợ khá nhiều kiểu input, khi cung cấp giá trị `type` rõ ràng cho input, trình duyệt sẽ biết và hiển thị kiểu keyboard nào cho phù hợp trên điện thoại, cũng như có những validation tích hợp sẵn

> type='url': chuỗi bắt đầu phải là 'http://', 'ftp://', 'mailto:'
![Một số gợi ý khi thiết kế form](https://developers.google.com/web/fundamentals/design-and-ux/input/forms/imgs/url-ios.png)
> type='tel': ko có ép một syntax hay validation nào cả, giúp hiện thì bàn phím điện thoại trên mobile
![ko có ép một syntax hay validation nào cả, giúp hiện thì bàn phím điện thoại trên mobile](https://developers.google.com/web/fundamentals/design-and-ux/input/forms/imgs/tel-android.png)
> type='email': trên mobile nó sẽ hiện sẵn phím @
![Một số gợi ý khi thiết kế form](https://developers.google.com/web/fundamentals/design-and-ux/input/forms/imgs/email-android.png)
> type='search': bàn phím search chuẩn trên từng thiết bị
![Một số gợi ý khi thiết kế form](https://developers.google.com/web/fundamentals/design-and-ux/input/forms/imgs/plain-ios.png)
> type='number': iOS yêu cầu có thêm `pattern='\d*'` để hiển thị bàn phím số
![Một số gợi ý khi thiết kế form](https://developers.google.com/web/fundamentals/design-and-ux/input/forms/imgs/number-android.png)
> type='range': hiển thị kiếu slider control
![Một số gợi ý khi thiết kế form](https://developers.google.com/web/fundamentals/design-and-ux/input/forms/imgs/range-ios.png)
> type='datetime-local': giá trị ngày tháng có timezone
![Một số gợi ý khi thiết kế form](https://developers.google.com/web/fundamentals/design-and-ux/input/forms/imgs/datetime-local-ios.png)
> type='datetime': giá trị ngày tháng ko có timezone
![Một số gợi ý khi thiết kế form](https://developers.google.com/web/fundamentals/design-and-ux/input/forms/imgs/date-android.png)
> type='time': chỉ có giá trị giờ
![Một số gợi ý khi thiết kế form](https://developers.google.com/web/fundamentals/design-and-ux/input/forms/imgs/time-ios.png)
> type='week': chỉ có giá trị tuần
![Một số gợi ý khi thiết kế form](https://developers.google.com/web/fundamentals/design-and-ux/input/forms/imgs/week-android.png)
> type='month': chỉ có giá trị tháng
![Một số gợi ý khi thiết kế form](https://developers.google.com/web/fundamentals/design-and-ux/input/forms/imgs/month-ios.png)
> type='color': bảng màu để chọn
![Một số gợi ý khi thiết kế form](https://developers.google.com/web/fundamentals/design-and-ux/input/forms/imgs/color-android.png)

## Gợi ý thông qua trường `datalist`

`<datalist />` là element cho phép chúng ta cung cấp các giá trị **gợi ý** với một `<input />`

```html
<label for="frmFavChocolate">Favorite Type of Chocolate</label>
<input 
type="text" 
name="fav-choc" 
id="frmFavChocolate" 
list="chocType">
<datalist id="chocType">
  <option value="white">
  <option value="milk">
  <option value="dark">
</datalist>
```

<div class="note">User không bắt buộc phải chọn các giá trị trong datalist, chỉ là gợi ý thích thì chọn</div>

[Xem một form đã hiện thực](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html)

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


