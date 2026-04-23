---
slug: "/2020-09-14-format-number-trong-javascript"
date: "2020-09-14"
title: "Định dạng số trong JavaScript"
desc: "Cùng nghiên cứu xem Javascript hổ trợ sẵn những hàm nào để định dạng kiểu số trước khi nghĩ đến một thư viện thứ 3"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "thu-thuat"]
---

<!-- TOC -->

- [Number.prototype.toLocaleString()](#numberprototypetolocalestring)
- [Định dạng tiền tệ](#định-dạng-tiền-tệ)
- [Phần trăm](#phần-trăm)
- [Intl.NumberFormat](#intlnumberformat)

<!-- /TOC -->
## Number.prototype.toLocaleString()

```js
const number = 12345.6789

// sẽ lấy local mặc định của trình duyệt
console.log(number.toLocaleString());
// 12,345.679 (en-US)

console.log(number.toLocaleString('vi-VN'));
// 123.456,789
```

## Định dạng tiền tệ

Nếu muốn định dạng tiền tệ, bạn cần sử dụng thêm tham số thứ 2 của hàm `toLocaleString`

```js
{
    style: 'currency',
    currency: [giá trị ISO 4217] // tham số bắt buộc, ko truyền lỗi
}
```

Tham khảo giá trị [ISO 3217](http://www.currency-iso.org/en/home/tables/table-a1.html)

```js
const number = 12345.6789;

console.log(
    number.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })
);

// 12.346 ₫

console.log(
  number.toLocaleString('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }),
);

// ￥12,346
```

## Phần trăm

Chuyển đồi thành đơn vị phần % ngoài việc nhân với 100, ns còn thêm 2 tùy chỉnh cũng vui là `minimumFractionDigits` và `maximumFractionDigits` (mặc định là 0 và 2 cho kiểu tiền tệ) để lấy số lượng ký tự muốn lấy

```js
const number = 0.1234;

console.log(
  number.toLocaleString('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
  }),
);
// 12.34%

console.log(
  number.toLocaleString('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
  }),
);
// 12.3%
```

## Intl.NumberFormat

Nếu hông ưu `Number.prototype.toLocaleString()` có thể dùng constructor `Intl.NumberFormat`. Nếu như thấy sao phải lăng tăng giữa 2 thằng này? Trong trường hợp bạn cần làm việc định dạng này tới lui nhiều lần cho cùng một locale, cùng một tùy chọn cố định, thì bạn nên dùng `Intl.NumberFormat` cho chuẩn tốc độ.

```js
const numberFormat = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

console.log(numberFormat.format(12345.6789));
// 12.346 ₫

console.log(numberFormat.format(2345.67891));
// 2.346 ₫
```

[Natively Format JavaScript Numbers](https://elijahmanor.com/blog/format-js-numbers)

Happy coding 🎉🙌