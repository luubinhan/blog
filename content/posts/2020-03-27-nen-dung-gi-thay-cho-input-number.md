---
slug: "/2020-03-27-nen-dung-gi-thay-cho-input-number"
date: "2020-03-27"
title: "Nên dùng gì thay cho input number"
desc: "Ngoài input type number, còn những giá trị gì bạn nên cân nhắc sử dụng"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["css", "thu-thuat"]
---

<!-- TOC -->

- [tel](#tel)
- [decimal](#decimal)
- [Email](#email)
- [Url](#url)
- [Search](#search)

<!-- /TOC -->

Có thể bạn sẽ nghĩ ngay đến `<input type='number' />` khi muốn cho user nhập số. Tuy nhiên _đời không như là mơ_, nó có kha khá vấn đề, đôi khi có những giá trị nhìn thì như _số_, nhưng không phải (như credit card), hoặc một dạng chuỗi số.

Trên Gov.uk họ dùng kiểu này

```html
<input type="text" inputmode="numeric" pattern="[0-9]*" />
```

Thuộc tính `inputmode` cũng khá hay ho, được đề cập rất cũ thể [ở đây](https://css-tricks.com/everything-you-ever-wanted-to-know-about-inputmode/)

Tóm tắt lại cho bạn nào lười đọc

### tel

```html
<input type="text" inputmode="tel" />
```

### decimal

```html
<input type="text" inputmode="decimal" />
```

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/05/inputmode-03.png?ssl=1)

### Email

```html
<input type="text" inputmode="email" />
```

![](https://i1.wp.com/css-tricks.com/wp-content/uploads/2019/05/inputmode-04.png?ssl=1)

### Url

```html
<input type="text" inputmode="url" />
```

![](https://i1.wp.com/css-tricks.com/wp-content/uploads/2019/05/inputmode-05.png?ssl=1)

### Search

```html
<input type="text" inputmode="search" />
```

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/05/inputmode-06a.png?ssl=1)

Hoặc để nhập vào mã code xác thực, Twilio sử dụng định dạng này

```html
<input
  type="text"
  name="token"
  id="token"
  inputmode="numeric"
  pattern="[0-9]*"
  autocomplete="one-time-code"
/>
```

Với `autocomplete="one-time-code"` chúng ta sẽ có được _tính năng_ tự điền như thế này

![iOS screen with a numeric input and a text message offering to auto-fill the two-factor auth](https://i1.wp.com/css-tricks.com/wp-content/uploads/2020/03/two-factor-input.png)

[Xem danh sách autocomplete đầy đủ](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#Values)

[What to Use Instead of Number Inputs](https://css-tricks.com/what-to-use-instead-of-number-inputs/)
