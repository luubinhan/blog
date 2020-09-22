---
slug: "/2018-11-02-validate-form-voi-html-5"
date: "2018-11-02"
title: "Validate form với HTML5"
desc: "Bài này nằm trong loạt bài chuẩn kiến thức để đi thi web mobile specialist của google. Một số cách validate bằng HTML, sử dụng API kết hợp với javascript để custom lại theo ý muốn"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["mobile-web-specialist"]
---

Chúng ta cùng điểm qua các attribute mà HTML5 cung cấp để validate

<!-- TOC -->

- [type](#type)
- [required](#required)
- [minlength, maxlength, min, max](#minlength-maxlength-min-max)
- [pattern](#pattern)
- [Gợi ý](#gợi-ý)
- [Customize câu hiển thị lỗi](#customize-câu-hiển-thị-lỗi)
- [Demo](#demo)
- [Tài liệu tham khảo](#tài-liệu-tham-khảo)

<!-- /TOC -->

# type

Ngoài giá trị `text`, chúng ta sẽ có thêm

- `email`: chỉ cho phép nhập địa chỉ email
- `number`: chỉ cho phép nhập số
- `url`: chỉ cho phép nhập dạng đường dẫn url
- `tel`: **không nên xài**, vì mỗi nước của một kiểu format số điện thoại riêng

```html
<form>
  <input name="your_email" type="email" />
  <input name="your_money" type="number" />
  <input name="your_website" type="url" />
  <button>Gửi</button>
</form>
```

![Validate form với HTML5](https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2014/06/1401959773image-1.png)

# required

Một attribute đơn giản nhất, truyền vào một giá trị `boolean`, bắt buộc user phải nhập giá trị nếu đang set `true`

```html
<form>
  <label for="choose">Cafe hay Trà Đá?</label>
  <input id="choose" name="i_like" required>
  <button>Gửi</button>
</form>
```

Dùng CSS selector `:valid`, `:invalid` để format cho element

```css
input:invalid {
  border: 2px solid red;
}

input:valid {
  border: 2px solid black;
}
```

# minlength, maxlength, min, max

Với `<input type="number"/>` chúng ta dùng `min` và `max` để đặt ràng buộc khoảng giá trị, các `<input/>`, `<textarea/>` còn lại dùng `minlength` và `maxlength`

```html
<form>
  <div>
    <label for="choose">từ 3 đến 6 ký tự</label>
    <input id="choose" name="i_like" required minlength="3" maxlength="6">
  </div>
  <div>
    <label for="number">Từ 1 đến 10</label>
    <input type="number" id="number" name="amount" value="1" min="1" max="10">
  </div>
  <div>
    <button>Gửi</button>
  </div>
</form>
```

CSS selector cho giá trị của element `:in-range`, `:out-of-range`

```css
input:out-of-range {
  border: 2px solid red;
}

input:in-range {
  border: 2px solid black;
}
```

# pattern

Truyền vào một [regular expression](/2018-08-05-huong-dan-lam-viec-voi-javascript-regular-expressions), chỉ có trên `<input/>`, **không sử dụng được với `<textarea/>`**

```html
<form>
  <label for="choose">Bạn chỉ có thể nhập "cherry" hoặc "banana"</label>
  <input id="choose" name="i_like" required pattern="banana|cherry">
  <button>Gửi</button>
</form>
```

Ví dụ một số regular expression hay xài

Số điện thoại Việt Nam

```html
<input
  type="text"
  pattern="(\+84|0)\d{9,10}" 
/>
```

Chỉ gồm số và chữ

```html
<input
  type="text"
  pattern="[a-zA-Z0-9]+" 
>
```

Giá trị Hex Color như `#3b5998` hoặc `#000`.

```html
<input
  type="text"
  pattern="^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$"
>
```

# Gợi ý

Sử dụng `title` để hiển thị một tooltip cho user biết chúng ta muốn user nhập vào giá trị gì

```html
<input
  type="text"
  name="phone"
  pattern="(\+84|0)\d{9,10}"
  title="Nhập số điện thoại từ 10 đến 11 số" 
/>
```

![Validate form với HTML5](https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2014/06/1401959770image-2.png)

# Customize câu hiển thị lỗi

Khi element invalid, nó sẽ hiện một câu thông báo kèm theo trên element, cái này phụ thuộc vào từng trình duyệt, không thể chỉnh lại bằng CSS, trình duyệt đang set ngôn ngữ gì thì nó hiển thị câu lỗi bằng ngôn ngữ đó, không đi theo ngôn ngữ khai báo của trang web.

Để thay đổi nội dung của câu thông báo, chúng ta buộc phải dùng javascript

Khá nhiều trình duyệt hiện tại cung cấp API để làm việc với validation, để đối phó với các trình duyệt cũ thì tất nhiên chúng ta dùng đến polyfill như <a href="https://hyperform.js.org/" target="_blank" rel="noopener noreferrer">Hyperform</a> 

Chúng ta cùng làm thử một custom error.

Đầu tiên là html

```html
<form novalidate>
  <p>
    <label for="mail">
      <span>Vui lòng nhập địa chỉ email:</span>
      <input type="email" id="mail" name="mail">
      <span class="error" aria-live="polite"></span>
    </label>
  </p>
  <button>Gửi</button>
</form>
```

Chúng ta khai báo `novalidate` để tắt validate của trình duyệt.

Javascript sử dụng API của trình duyệt để tương tác với validate của HTML5

```js
var form  = document.getElementsByTagName('form')[0];
var email = document.getElementById('mail');
var error = document.querySelector('.error');

email.addEventListener("input", function (event) {
  // kiểm tra khi user bắt đầu nhập
  if (email.validity.valid) {
    // nếu valid, remove
    error.innerHTML = ""; 
    error.className = "error"; 
  }
}, false);

form.addEventListener("submit", function (event) {
  // kiểm tra khi user click submit.
  if (!email.validity.valid) {
    error.innerHTML = "Baby à, cho anh địa chỉ email chứ";
    error.className = "error active";
    // chặn việc submit form
    event.preventDefault();
  }
}, false);
```

# Demo


<iframe width="100%" height="300" src="//jsfiddle.net/luubinhan/qsk5xp9y/18/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>


# Tài liệu tham khảo

<a href="https://www.sitepoint.com/client-side-form-validation-html5/" target="_blank" rel="noopener noreferrer">Client-Side Form Validation with HTML5</a>


<a href="https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation" target="_blank" rel="noopener noreferrer">Form data validation</a>
