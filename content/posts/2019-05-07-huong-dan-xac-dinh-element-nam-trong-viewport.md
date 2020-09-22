---
slug: "/2019-05-07-huong-dan-xac-dinh-element-nam-trong-viewport"
date: "2019-05-07"
title: "Kiểm tra element có nằm trong viewport không bằng javascript"
desc: "Học cách viết một helper function để kiểm tra element nằm trong viewport"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---


"Nằm trong viewport" nghĩa là nó đang hiển thị bên trong phần **nhìn thấy được** của trình duyệt, function này cần thiết khi chúng ta cần tới lazy loading, hiệu ứng này kia.

Phần quan trọng nhất của function này là dùng `Element.getBoundingClientRect()`, nó cho chúng ta giá trị position của element so với viewport. Nó trả về một object chứa `height`, `width`, khoảng cách đến `top`, `right`, `bottom`, `left` với viewport

```js
// chọn element
var h1 = document.querySelector('h1');

// lấy position của element trên
var bounding = h1.getBoundingClientRect();

console.log(bounding)
// {
//  height: 118,
//  width: 591.359375,
//  top: 137,
//  bottom: 255,
//  left: 40.3125,
//  right: 631.671875
// }
```

Nếu một element nằm trong viewport được xác định như sau
- `top`, `left` >= 0
- `right` <= độ rộng của viewport
- `bottom` <= độ cao của viewport

Để check độ rộng của viewport, chúng ta có 2 cách, một số trình duyệt hỗ trợ `window.innerWidth`, một số khác hỗ trợ `document.documentElement.clientWidth`, số còn lại thì support cả 2. Rắc rối nhở!

```js
(window.innerWidth || document.documentElement.clientWidth)
```

Cũng tương tự với giá trị viewport height

```js
(window.innerHeight || document.documentElement.clientHeight)
```

Chúng ta kiểm tra xem element có nằm trong viewport không

```js
if (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
) {
    console.log('Trong viewport!');
} else {
    console.log('Không nằm trong viewport... whoa la la');
}
```

Chúng ta gom lại vào một function helper để dành xài

```js
var isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};
```

Sử dụng function này, chúng ta có thể làm lazy load image

```html
<figure data-image="url/to/my/image.jpg">Hình sẽ được load khi scroll tới đây..</figure>
```

```js
var image = document.querySelector('[data-image]');
window.addEventListener('scroll', function (event) {
    if (isInViewport(image)) {
        image.innerHTML = '<img src="' + image.getAttribute('data-image') + '">';
    }
}, false);
```

<a target="_blank" rel="noopener noreferrer" href="https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/">How to test if an element is in the viewport with vanilla JavaScript</a>


