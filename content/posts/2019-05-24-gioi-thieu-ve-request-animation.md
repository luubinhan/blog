---
slug: "/2019-05-24-gioi-thieu-ve-request-animation"
date: "2019-05-24"
title: "Giới thiệu về window.requestAnimationFrame"
desc: ""
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---


Khi muốn thực hiện một vòng lặp thời gian trong javascript, chúng ta nghĩ ngay đến `setInterval()`. Tuy nhiên khi mục đích của chúng ta là làm animation, để thực hiện animation mượt mà, chúng ta cần vòng lặp 60 frame/1 giây, như thế này

```js
setInterval(function() {
  // chay animation ở đây
}, 1000/60);
```

Tuy nhiên chúng ta có một cách tốt hơn cách trên, dùng `window.requestAnimationFrame()`

Tại sao nó tốt hơn

- Trình duyệt có thể optimize nó để animation thiệt mượt mà
- Những animation nào đang chạy sẽ dừng lại khi tab đó ko còn active
`window.requestAnimationFrame()` sẽ yêu cầu trình duyệt thực hiện một animation và chạy một function trước khi **repaint**

Ví dụ đơn giản nhất

```js
function repeatOften() {
  // thực hiện animation nào đó
  requestAnimationFrame(repeatOften);
}

requestAnimationFrame(repeatOften);
```

Gọi phương thức này khi chúng ta đã sẵn sàng thực hiện animation. Hàm thực thi animation sẽ được gọi trước khi trình duyệt repaint. Khi đang nằm ở tab không active của trình duyệt, nó sẽ bị pause lại (hoặc trong thẻ `iframe`) để tiết kiệm pin

```js
var start = null;
var element = document.getElementById(‘SomeElementYouWantToAnimate’);

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  element.style.transform = 'translateX(' + Math.min(progress / 10, 200) + 'px)';
  if (progress < 2000) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
```

`window.requestAnimationFrame()` trả về một **ID**, chúng ta có thể cancel nó như với `setTimeout` và `setInterval` bằng `window.cancelAnimationFrame(truyền vào id)`


```js
var animateID = requestAnimationFrame(repeatOften);

cancelAnimationFrame(animateID);
```

Tài liệu và ví dụ tham khảo

<a target="_blank" rel="noopener noreferrer" href="https://css-tricks.com/using-requestanimationframe/">Using requestAnimationFrame</a>

<a target="_blank" rel="noopener noreferrer" href="https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame">window​.request​Animation​Frame()
</a>


