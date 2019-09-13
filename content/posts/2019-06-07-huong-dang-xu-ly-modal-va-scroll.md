---
slug: "/2019-06-07-huong-dang-xu-ly-modal-va-scroll"
date: "2019-06-07"
title: "Không cho cuộn trang khi mở Modal"
desc: "Xử lý cuộn trang khi mở modal"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["css", "javascript", "thu-thuat"]
---

<!-- TOC -->

- [Cách đơn giản nhất](#C%C3%A1ch-%C4%91%C6%A1n-gi%E1%BA%A3n-nh%E1%BA%A5t)
- [Trên mobile](#Tr%C3%AAn-mobile)
- [Giải pháp cuối cùng](#Gi%E1%BA%A3i-ph%C3%A1p-cu%E1%BB%91i-c%C3%B9ng)

<!-- /TOC -->


## Cách đơn giản nhất

Đặt độ cao của body = 100% của viewport, sau đó cho overflow thành hidden, thêm mục padding right = 15 để fix trường hợp trang đã có thanh cuộn rồi

```css
body.model-open {
    height: 100vh;
    overflow-y: hidden;
    padding-right: 15px;
}
```

## Trên mobile

Cách trên chạy tốt trên desktop và android, buồn thay iOS vẫn cuộn được, thêm `position fixed` để sửa bug này

```css
body {
    position: fixed;
}
```

Tuy nhiên, cách này vẫn bị vấn để bự khác, nếu cuộn xuống dưới, mở modal lên, đóng lại thì trang cuộn lên đầu

## Giải pháp cuối cùng

Đi đâu rồi cũng về javascript thôi. Lưu lại vị trí scroll, set lại vị trí này khi đóng modal

Khi bung modal

```js
const showDialog = () => {
  document.getElementById('dialog').classList.add('show')
  const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
  const body = document.body;
  body.style.position = 'fixed';
  body.style.top = `-${scrollY}`;
};
``` 

Khi đóng modal

```js
const closeDialog = () => {
  const body = document.body;
  const scrollY = body.style.top;
  body.style.position = '';
  body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1);
  document.getElementById('dialog').classList.remove('show');
}
window.addEventListener('scroll', () => {
  document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
});
```

<iframe height="265" style="width: 100%;" scrolling="no" title="Avoid body scrollable in safari when modal dialog shown" src="//codepen.io/geoffgraham/embed/LogERe/?height=265&theme-id=0&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/geoffgraham/pen/LogERe/'>Avoid body scrollable in safari when modal dialog shown</a> by Geoff Graham
  (<a href='https://codepen.io/geoffgraham'>@geoffgraham</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>


<a target="_blank" rel="noopener noreferrer" href="https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/">Prevent Page Scrolling When a Modal is Open</a>


