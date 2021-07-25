---
slug: "2021-07-24-huong-dan-su-dung-intersection-observer-api"
date: "2021-07-24"
title: "Intersection Observer API"
desc: "Làm sao để chạy một hàm khi element bắt đầu xuất hiện trên màn hình?"
tags: ["js"]
canonical_url: false
---

<!-- TOC -->

- [Ứng dụng 1: lazy load image](#ứng-dụng-1-lazy-load-image)
- [Ứng dụng 2: Tự động pause video khi ra khỏi màn hình](#ứng-dụng-2-tự-động-pause-video-khi-ra-khỏi-màn-hình)
- [Ứng dụng 3: Toggle class khi header sticky](#ứng-dụng-3-toggle-class-khi-header-sticky)

<!-- /TOC -->

Chúng ta thường phải đặt `listener` trên sự kiện `window.scroll` thực hiện một số thao tác tính toán, so sánh với thanh *scroll* để biết được khi nào element bắt đầu xuất hiện.

Cách làm này gây nhiều vấn đề hiệu năng và tương đối rườm rà. Giờ các trình duyệt đã đồng loạt hỗ trợ **Intersection Observer API**, chúng ta có một cách hoàn toàn *gọn gàng, sạch sẽ* mà lại tối ưu hiệu năng hơn nhiều.

Cách sử dụng như sau, chúng ta khởi tạo một *instance* `IntersectionObserver` và gọi `observe` trên element muốn theo dõi (*watch* là thuật ngữ chuyên ngành hơn)

```js
const myImg = document.querySelector('.animate-me');

const observer = new IntersectionObserver((entry, observer) => {
    console.log({ entry });
    console.log({ observer });
})

observer.observe(myImg);
```

Trong trường hợp chúng ta muốn **observe** trên nhiều element cùng lúc

```js
const myImgs = document.querySelectorAll('.animate-me');

const observer = new IntersectionObserver(entries => {
  console.log(entries);
});

myImgs.forEach(image => {
  observer.observe(image);
});
```

Để thực thi một tác vụ nào đó khi element bắt đầu xuất hiện trong viewport hoặc leave khỏi viewport

```js
const myImgs = document.querySelectorAll('.animate-me');

observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      console.log('in the view');
    } else {
      console.log('out of view');
    }
  });
});

myImgs.forEach(image => {
  observer.observe(image);
});
```

Với điều kiện `intersectionRatio > 0` chúng ta biết được element đã xuất hiện trong viewport hay không

Với lazy load, chúng ta chỉ cần observe ở lần đầu tiên khi xuất hiện trên viewport, chúng ta sẽ `unobserve` nó đi vì không cần **tracking** tiếp nữa

```js
const myImgs = document.querySelectorAll('.animate-me');

observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      console.log('in the view');
      observer.unobserve(entry.target);
    } else {
      console.log('out of view');
    }
  });
});

myImgs.forEach(image => {
  observer.observe(image);
});
```

`IntersectionObserver` API nhận thêm params thứ 2, để chúng ta truyền một số config

```js
const config = {
  rootMargin: '50px 20px 75px 30px',
  threshold: [0, 0.25, 0.75, 1]
};

const observer = new IntersectionObserver(entry => {
  // ...
}, config);
```

Các giá trị có thể truyền vào cho config

- `root` element dùng để kiểm tra intersection, nếu `null` nó sẽ lấy `document` viewport
- `rootMargin`:  khai báo như giá trị margin css, ví dụ `3rem 2rem`, có thể dùng để thêm `offset` cho intersection point
- `threhold`: mảng giá trị từ 0 đến 1, tương ứng với ratio xuất hiện của element, 0 = hoàn toàn ra khỏi viewport, 1 là đang nằm trong viewport hoàn toàn, `callback` sẽ được gọi vào tất cả các giá trị đã khai báo

![](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/769b2733-5700-4d2d-a32f-6850a173abaa/1-dynamic-header-intersection-observer.png)

Element được xem là nằm ngoài viewport khi nó đã nằm ngoài viewport + 15px margin

![](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a5908e69-f81a-4e1c-81e6-aae2f1b96a28/2-dynamic-header-intersection-observer.png)

![](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_2000/https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b95822cd-d3e8-4b71-9d38-862e6d39990a/3-dynamic-header-intersection-observer.png)

## Ứng dụng 1: lazy load image

```js
let observer = new IntersectionObserver(
(entries, observer) => { 
entries.forEach(entry => {
    /* Placeholder replacement */
    entry.target.src = entry.target.dataset.src;
    observer.unobserve(entry.target);
  });
}, 
{rootMargin: "0px 0px -200px 0px"});

document.querySelectorAll('img').forEach(img => { observer.observe(img) });
```

## Ứng dụng 2: Tự động pause video khi ra khỏi màn hình

```js
let video = document.querySelector('video');
let isPaused = false; /* Flag for auto-paused video */
let observer = new IntersectionObserver((entries, observer) => { 
  entries.forEach(entry => {
    if(entry.intersectionRatio!=1  && !video.paused){
      video.pause(); isPaused = true;
    }
    else if(isPaused) {video.play(); isPaused=false}
  });
}, {threshold: 1});
observer.observe(video);
```

## Ứng dụng 3: Toggle class khi header sticky

```js
const primaryNav = document.getElementById('primaryNav');

function callBack ([e]) {
    e.target.classList.toggle("sticky", e.intersectionRatio < 1)
}

const observer = new IntersectionObserver( 
    callBack,
    { threshold: [1] }
);

observer.observe(primaryNav)
```

```css
@media (prefers-reduced-motion: no-preference) {
  .scroller {
    scroll-behavior: smooth;
  }
}
```

Tham khảo

- https://alligator.io/js/intersection-observer/

- https://css-tricks.com/a-few-functional-uses-for-intersection-observer-to-know-when-an-element-is-in-view/

- https://www.smashingmagazine.com/2021/07/dynamic-header-intersection-observer/

