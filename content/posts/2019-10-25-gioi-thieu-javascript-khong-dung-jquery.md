---
slug: "/2019-10-25-gioi-thieu-javascript-khong-dung-jquery"
date: "2019-10-25"
title: "Bạn không cần jQuery"
desc: "Không cần jQuery, bạn thể thể dùng javascript thuần để thực hiện những thao tác trước đây bạn nghĩ phải có jQuery cơ"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

Hiện giờ chúng ta đã làm việc nhiều với các framework *hại điện* hơn nhiều so với jQuery, nên rất ít chi đụng tới DOM thật, không còn ngày tháng *xào trộn* HTML bằng jQuery, chúng ta chỉ định nghĩa khi nào render, render cái gì. Tuy nhiên, kỹ năng *sờ mó* vào DOM là cần thiết cho mọi lập trình viên FE. Bây giờ muốn *sờ* vào DOM chúng ta cần nắm cách dùng javascript thuần.

## Chọn element

> document.querySelector('.vuilaptrinh')

Nó trả về một HTMLElement object **đầu tiên** thỏa điều kiện CSS Selector, cái `.vuilaptrinh` này gọi là CSS Selector.

Nói là đầu tiên vì nếu có *dăm ba cái* `.vuilaptrinh` nó cũng chỉ trả về thằng đầu tiên

```html
<p class="vuilaptrinh" />
<div class="vuilaptrinh" />
<a class="vuilaptrinh" />
```

> document.querySelectorAll('.vuilaptrinh')

Nó sẽ trả về một danh sách các element thỏa điều kiện CSS selector, ví dụ 3 thằng `.vuilaptrinh` ở trên đều được chọn.

## Chạy function trên các element đã chọn

"Sờ" được các element này rồi, thì chúng ta sẽ muốn làm tiếp cái gì đó, chứ không chỉ *sờ cho vui*, chúng ta phải loop qua toàn bộ element đã *sờ* được bằng vòng lặp `.forEach`

```js
document.querySelectorAll('.vuilaptrinh').forEach(vui => { vui.style.display = "none" }
```

## Tìm element con bên trong element cha đã chọn

Chúng ta gọi lại `.querySelector` trên element cha thôi

```js
var cha = document.querySelector('.vuilaptrinh')
cha.querySelector('.luckyluu')
```

## Di chuyển qua các element kề cận

Hồi nhỏ học tiếng anh, cô dạy "brother", "sister" là anh chị em, lớn lên xem Youtube mới biết, tụi nước ngoài nó dùng từ **sibling** để nói anh chị em, chứ ít khi dùng brother, sister. Javascript bê luôn nguyên chữ này vào để xài

```html
<div class="bochungno">
<div class="anhtrai" />
<div class="vuilaptrinh" />
<div class="emgai" />
</div>
```

```js
var box = document.querySelector('.vuilaptrinh')
box.nextElementSibling; // emgai
box.previousElementSibling; // anhtrai
box.parentElement; // bochungno
```

## Gắn sự kiện

> addEventListener

```js
document.querySelector(".button").addEventListener("click", (e) => { /* ... */ });
document.querySelector(".button").addEventListener("mouseenter", (e) => { /* ... */ });
document.addEventListener("keyup", (e) => { /* ... */ });
```

## Dispatch event

Nếu cần *bún* ra một sự kiện bằng javascript một cách chủ động, ko đợi sự kiện *tự* xảy ra

> dispatchEvent

```js
document.dispatchEvent( new Event('myEvent') )
document.querySelector('.box').dispatchEvent(new Event('myEvent'))
```

## Styling cho element

Cái này cần tra cứu và học một số thuộc tính hay xài, nguyên tắc chung là viết thuộc tính css theo kiểu camelCase

```js
var box = document.querySelector(".box");
box.style.color = "#000";
box.style.backgroundColor = "red";
box.style.paddingLeft = "10px";
```

## Ẩn hiện element

> style.display

Trỏ đến thuộc tính `style`, thay đổi giá trị display thành `none` hoặc `block`

```js
document.querySelector(".box").style.display = "none";
document.querySelector(".box").style.display = "block";
```

## Document ready

Một trong những tình huống hay gặp là chúng ta cần chạy một đoạn javascript sau khi HTML đã render xong

> DOMContentLoaded

```js
// khai báo hàm ready để xài cho tiện
var ready = callback => {
	if (document.readyState != 'loading') callback()
	else document.addEventListener('DOMContentLoaded', callback)
}

ready(() => {
 // thực hiện xử lý gì đó
})
```

## Làm việc với class

> classList

Thông qua `classList` chúng ta có thể thêm-xóa-toggle một class

```js
var box = document.querySelector('.box')
box.classList.add('focus')
box.classList.remove('focus')
box.classList.toggle('focus')
box.classList.replace('focus', 'blurred')
```

Để kiểm tra element có class nào đó không

> classList.contains

Ví dụ, kiểm tra xem element là `.box` có chứa class là `active` không

```js
document.querySelector('.box').classList.contains('focus')
```

## Network request

> fetch

Mình có bài chi tiết về API này rồi, các bạn đọc lại [Giới thiệu fetch() của javascript](/2018-10-01-huong-dan-gioi-thieu-fetch-javascript)

## Tạo element

Tạo thẻ `<div />` với nội dung là `<div>text</div>`, rồi chèn nó vào `<div class='box' />`

```js
var el = document.createElement('div')
// thêm nội dung text
el.textContent = 'text'
// chèn element nào vào đâu đó
document.querySelector('.box').appendChild(el)
```
