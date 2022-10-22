---
slug: "/2019-03-25-rang-buoc-du-lieu-voi-html5"
date: "2019-03-25"
title: "Ràng buộc dữ liệu input với HTML5"
desc: "Vì form quá phức tạp, chúng ta cần thêm một bài viết nữa về validation với html"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["mobile-web-specialist"]
---


Với HTML5 chúng ta có một số kiểu input để validate những giá trị mà user đưa vào, ko cần tự viết javascript để check, chỉ đơn giản là khai báo mấy cái attribute, trường hợp phức tạp hơn, chúng ta có thể can thiệp trong cái [Validation API](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation) để có kết quả mong muốn

> Luôn nhớ validate ở phía client không có nghĩa là ko cần đến validate ở server.

## Một vài ràng buộc phổ biến

Dùng kiểu input
`<input type=”email” />`: bắt buộc là giá trị email
`<input type="url" />`: bắt buộc là giá trị url

Dùng attribute khác

| Attribute   |                                                              Kiểu input hỗ trợ                                                              |                                                Giải thích |
| ----------- | :-----------------------------------------------------------------------------------------------------------------------------------------: | --------------------------------------------------------: |
| `pattern`   |                                                   text, search, url, tel, email, password                                                   |                  phải khớp với giá trị regular expression |
| `min`       |                                      range, number, date, month, week, datetime, datetime-local, time                                       |              giá trị phải lớn hơn hoặc bằng giá trị `min` |
| `max`       |                                      range, number, date, month, week, datetime, datetime-local, time                                       |              giá trị phải nhỏ hơn hoặc bằng giá trị `max` |
| `required`  | text, search, url, tel, email, password, date, datetime, datetime-local, month, week, time, number, checkbox, radio, file, select, textarea |                                  bắt buộc phải có giá trị |
| `minlength` |                                              text, search, url, tel, email, password, textarea                                              | số ký tự nhập vào phải thỏa lớn hơn hoặc bằng `minlength` |
| `maxlength` |                                              text, search, url, tel, email, password, textarea                                              | số ký tự nhập vào phải thỏa nhỏ hơn hoặc bằng `maxlength` |

Ví dụ

```html
<form>
  <label for="name">Enter username (upper and lowercase letters): </label>
  <input type="text" name="name" id="name" required pattern="[A-Za-z]+">
  <button>Submit</button>
</form>
```

## Quá trình validate dữ liệu

Quá trình này sẽ thông qua bộ Validation API, nó có thể là trên cả form hoặc trên từng element trong form. Được thực hiện bằng một trong các cách sau
bằng cách gọi `checkValidity()` của các element input, select, button, textarea. Nó sẽ chỉ validate dữ liệu trên element đó thôi. Nó thường được thực hiện bởi trình duyệt, sau đó chúng ta dùng selector của CSS là `:valid` và `:invalid` để format
gọi `checkValidity()` hoặc `reportValidity()` trên thằng form
Khi form được submit bằng click ‘<input type=’submit’ />` hoặc ‘<button type=’submit’ />` hoặc ấn enter

Lưu ý

- Nếu set novalidate trên thẻ `<form novalidate />`, là chúng ta bỏ qua hết việc validate
- Khi gọi `submit()` trên form, không trigger validation, phương thức này sẽ gửi hết dữ liệu của form lên server dù nó có hay không thỏa điều kiện. Nên gọi sự kiện `click()` của nút submit

## Can thiệp vào quá trình validate bằng bộ Validation API

Ý tưởng chính là bắt một sự kiện nào đó trên element như `onchange`, rồi trigger một đoạn javascript để validate, sau đó dùng phương thức `field.setCustomValidity()` để set kết quả validate: nếu là String rỗng nghĩa là ok, còn ngược lại là error, đoạn string này sẽ đem đi hiển thị như thông báo error cho user

### Giới hạn file size khi upload


```html
<label for="FS">Select a file smaller than 75 kB : </label>
<input type="file" id="FS">
```

Dùng javascript để đọc file được chọn, `FIle.size()`, so sánh kích thước này rồi trả về kết quả cho trình duyệt

```js
function checkFileSize() {
  var FS = document.getElementById("FS");
  var files = FS.files;

  // Nếu có ít nhất 1 file được chọn
  if (files.length > 0) {
     if (files[0].size > 75 * 1024) { // kiểm tra size
       FS.setCustomValidity("The selected file must not be larger than 75 kB");
       return;
     }
  }
  // Không có file, ko check.
  FS.setCustomValidity("");
}
```

Hook cái phương thức này vào trong sự kiện mong muốn

```js
window.onload = function () {
  document.getElementById("FS").onchange = checkFileSize;
}
```

## Hiển thị validation

Dùng `:required` và `:optional` để trỏ đến các element nào có thuộc tính `required` hoặc không

```css
input:required {
    border: red;
}
input:optional {
    border: blue;
}
```

`:valid` và `:invalid` trên các element bị/không bị lỗi

```css
input:valid {
    border: black;
}
input:invalid {
    border: red;
}
```

Để thay đổi nội dung câu thông báo, sử dụng `element.setCustomValidity('thông báo')` trên các element: `<fieldset>`, `<input>`, `<output>`, `<select>`, `<button>`, `<textarea>`

```js
const nameInput = document.querySelector('input');
const form = document.querySelector('form');

nameInput.addEventListener('input', () => {
  nameInput.setCustomValidity('');
  nameInput.checkValidity();
});

nameInput.addEventListener('invalid', () => {
  if(nameInput.value === '') {
    nameInput.setCustomValidity('Enter your username!');
  } else {
    nameInput.setCustomValidity('Usernames can only contain upper and lowercase letters. Try again!');
  }
});
```



<a target="_blank" rel="noopener noreferrer" href="https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation">Constraint validation
</a>