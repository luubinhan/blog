---
slug: "/2018-07-25-huong-dan-tao-animate-voi-flip-technique"
date: "2018-07-25"
title: "Tạo animation với flip technique"
desc: "Trong bài này chúng ta sẽ tìm hiểu kỹ thuật FLIP có thể sử dụng để animate position và kích thước của bất kỳ DOM element nào"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["css"]
---

# Tại sao sử dụng FLIP technique

Đã bao lần bạn cần làm animate cho các property `height`, `width`, `top`, `left`? Bạn có để ý là những animate như vậy thường sẽ hơi khực khực. Lý do? những property này trigger **layout change**, trình duyệt sẽ xem xét các element khác có cần thay đổi gì không, việc này sẽ tiêu tốn công sức của trình duyệt khá nhiều trong đa số các trường hợp. Trong bài viết [Pixel are Expensive](https://aerotwist.com/blog/pixels-are-expensive/) tác giả Paul Lewis sẽ nói rõ hơn.

Nói một cách khác, chúng ta muốn việc tính toán này hạn chế ở mức tối đa, nhanh nhất có thể. Mục tiêu là chúng ta chỉ animate trên `transform` và `opacity`. FLIP giải thích làm sao để chúng ta có thể đạt được layout change với chỉ property `transform`

# FLIP là gì

FLIP là viết tắt của **First, Last, Invert, Play**

- **First** trước khi mọi thứ bắt đầu, lưu lại giá trị position và kích thước của element muốn transition. Có thể sử dụng `element.getBoundingClientRect()`
- **Last** thực thi đoạn code sẽ gây ra transition trong khoản thời gian gần như là tức thì, lưu lại giá trị position và kích thước của element lúc đó.
- **Invert** do element đang ở vị trí cuối cùng, chúng ta muốn user nghĩ đó là ví trí đầu tiên, bằng cách sử dụng `transform` để thay đổi lại position và kích thước. Tính toán xíu, nhưng không thành vấn đề.
- **Play** với element đã bị *invert*, chúng ta lại move nó lại vào vị trí cuối một lần nữa bằng `transform: none`

Implement bên dưới sử dụng Web Animation API

```js
const elm = document.querySelector('.some-element');

const first = elm.getBoundingClientRect();

// chạy đoạn script thực hiện change layout
doSomething();

// last: lấy giá trị cuối
const last = elm.getBoundingClientRect();

// invert: xác định sự khác nhau giữa giá trị first và last để mà invert
const deltaX = first.left - last.left;
const deltaY = first.top - last.top;
const deltaW = first.width / last.width;
const deltaH = first.height / last.height;

// Play
elm.animate([{
  transformOrigin: 'top left',
  transform: `
    translate(${deltaX}px, ${deltaY}px)
    scale(${deltaW}, ${deltaH})
  `
}, {
  transformOrigin: 'top left',
  transform: 'none'
}], {
  duration: 300,
  easing: 'ease-in-out',
  fill: 'both'
});
```
Lưu ý Web Animation API chưa support bởi tất cả trình duyệt, dùng [polyfill](https://github.com/web-animations/web-animations-js)


<p data-height="265" data-theme-id="0" data-slug-hash="EbwrQQ" data-default-tab="css,result" data-user="davidkpiano" data-pen-title="How the FLIP technique works" class="codepen">See the Pen <a href="https://codepen.io/davidkpiano/pen/EbwrQQ/">How the FLIP technique works</a> by David Khourshid (<a href="https://codepen.io/davidkpiano">@davidkpiano</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Có 2 điểm quan trọng cần lưu ý

- Khi element thay đổi kích thước, khi dùng `scale` sẽ không ảnh hưởng performance, tuy nhiên nhớ đặt `transformOrigin: 'top left'`
- Đang sử dụng Web Animation API, nhưng ý tưởng này có thể hiện thực bằng GSAP, Anime, Velocity, Just-Animate, Mo.j hoặc bất kỳ thư viện animation khác

#  Shared element transition

Một trường hợp trong transition là element giữa các view hoặc giữa các trạng thái của trang, không phải lúc nào element ở lúc cuối cũng giống như element lúc khởi tạo.

```js
const firstElm = document.querySelector('.first-element');

// First
const first = firstElm.getBoundingClientRect();
firstElm.style.setProperty('visibility', 'hidden');

// chạy đoạn script thực hiện change layout
doSomething();

// Last
const lastElm = document.querySelector('.last-element');
const last = lastElm.getBoundingClientRect();

// giống như các bước ở trên
// ở đây chúng ta đang animate lastElm, không phải firstElm
```

# Parent-child transition

Với ví dụ trên, chúng ta đo element với `window`, trong đa số các trường hợp thì ok, tuy nhiên xét thử tình huống

- Element thay đổi vị trí và cần transition
- Element chứa đóng element con, các element con này cũng cần transition vị trí mới theo vị trí của parent

Để giải quyết, chúng ta cần đảm bảo việc tính toán theo giá trị relative với parent

```js
const parentElm = document.querySelector('.parent');
const childElm = document.querySelector('.parent > .child');

// First: parent, child
const parentFirst = parentElm.getBoundingClientRect();
const childFirst = childElm.getBoundingClientRect();

doSomething();

// Last: parent and child
const parentLast = parentElm.getBoundingClientRect();
const childLast = childElm.getBoundingClientRect();

// Invert: parent
const parentDeltaX = parentFirst.left - parentLast.left;
const parentDeltaY = parentFirst.top - parentLast.top;

// Invert: child relative to parent
const childDeltaX = (childFirst.left - parentFirst.left)
  - (childLast.left - parentLast.left);
const childDeltaY = (childFirst.top - parentFirst.top)
  - (childLast.top - parentLast.top);

// Play: dùng WAAPI
parentElm.animate([
  { transform: `translate(${parentDeltaX}px, ${parentDeltaY}px)` },
  { transform: 'none' }
], { duration: 300, easing: 'ease-in-out' });

childElm.animate([
  { transform: `translate(${childDeltaX}px, ${childDeltaY}px)` },
  { transform: 'none' }
], { duration: 300, easing: 'ease-in-out' });
```

Một vài điểm cần lưu ý
- Giá trị thời gian cho parent và child (duration, easing) không nhất thiết phải khớp, tự do sáng tạo đi!
- Thay đổi kích thước ở parent hoặc child (width, height) không sử dụng ở đây để tránh phức tạp quá ví dụ này
- Có thể kết hợp giữa shared element và parent child cho kết quả dữ dội hơn

# Sử dụng Flipping.js

Những kỹ thuật trình bày ở trên rất dễ hiểu, tuy nhiên sẽ hơi rối nếu chúng ta phải từ mò và theo dõi từng element. Tác giả bài viết này đã tạo ra một thư viện là [Flipping.js](https://github.com/davidkpiano/flipping) để chúng ta xài cho sướng. Thêm vào `data-flip-key="..."` vào element làm animate, chúng ta dễ dàng theo dõi được những element có thể thay đổi

```html
<section class="gallery">
  <div class="photo-1" data-flip-key="photo-1">
    <img src="/photo-1"/>
  </div>
  <div class="photo-2" data-flip-key="photo-2">
    <img src="/photo-2"/>
  </div>
  <div class="photo-3" data-flip-key="photo-3">
    <img src="/photo-3"/>
  </div>
</section>
```

```html
<section class="details">
  <div class="photo" data-flip-key="photo-1">
    <img src="/photo-1"/>
  </div>
  <p class="description">
    Lorem ipsum dolor sit amet...
  </p>
</section>
```

[Link bài gốc](https://css-tricks.com/animating-layouts-with-the-flip-technique/)