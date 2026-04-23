---
slug: "/2020-02-26-dinh-dang-ngay-thang-bang-intl-date-time-format"
date: "2020-02-26"
title: "Định dạng ngày tháng bằng Intl.DateTimeFormat"
desc: ""
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

Trong javascript, hiệp hội quốc tế **ECMAScript** công bố một object tên là **Intl**, trong đó có chứa tất cả các phương thức liên quan tới bản địa hóa (ngôn ngữ, ngày tháng, định dạng tiền tệ, vâng vâng). Cùng lướt qua API `Intl.DateTimeFormat` được cung cấp

Một chuỗi chuẩn ISO cho ngày tháng

```js
const date = new Date().toISOString();

// "2020-02-05T16:30:41.392Z"
```

Được sử dụng trong thẻ HTML

```html
<time datetime="2020-02-05T16:30:41.392Z">Published on ...</time>
<meta property="article:published_time" content="2020-02-05T16:30:41.392Z" />
```

Các công cụ tìm kiếm sẽ đọc các giá trị này một cách rất dễ dàng. Nhưng nếu là người bình thường chúng ta không _thích_ như vậy, chuyển đổi qua lại giữa các định dạng theo từng khu vực là điều bắt buộc.

```html
<time datetime="2020-02-05T16:30:41.392Z">Pubblicato il 05 Febbraio 2020</time>
<time datetime="2020-02-05T16:30:41.392Z">Published on February 05, 2020</time>
```

Sử dụng API để hiển thị cho dân US-UK

```js
const options = { month: "long", day: "numeric", year: "numeric" };
const date = new Date(isoString);
const americanDate = new Intl.DateTimeFormat("en-US", options).format(date);
```

![Định dạng ngày tháng bằng Intl.DateTimeFormat](https://www.valentinog.com/blog/static/74b4c25784e69862e30d7bb492baa1a6/a6d36/intl-datetimeformat.png)

Để xem tài liệu đầy đủ, xem trên [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat)

Bạn sẽ thấy thằng `Intl.DateTimeFormat` sẽ cho kết quả tương tự như `toLocaleDateString`

```js
const options = { month: "long", day: "numeric", year: "numeric" };
const longDate = new Date().toLocaleDateString(locale, options);
```

**Vậy xài cái nào?**, ngắn gọn, [`Intl.DateTimeFormat` là lựa chọn sáng suốt xét trên phương diện tốc độ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString#Performance)

Cũng đáng nhắc đến, `format()` sẽ trả về ngày hiện tại nếu không truyền tham số cho nó.

`new Date()` hiển thị kết quả (**không phải trả về**) như thế này "Wed Feb 05 2020 18:46:03 GMT+0100 (Central European Standard Time)" khi gọi trong trình duyệt, cùng constructor đó gọi trong Node.js sẽ hiển thị (**không phải trả về**) chuỗi ISO "2020-02-05T17:47:03.065Z"

[Formatting dates in JavaScript with Intl.DateTimeFormat](http://pop.frontendweekly.co/PnJd79)
