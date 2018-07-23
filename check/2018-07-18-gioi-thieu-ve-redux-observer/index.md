---
slug: "/2018-07-18-gioi-thieu-ve-redux-observer"
date: "2018-07-18"
title: "Giới thiệu RxJS và Redux Observer"
desc: "Một middleware mạnh hơn redux-thunk, ít phức tạp hơn redux-saga. Chúng ta sẽ điểm qua những khái niệm chính để bắt đầu với middleware này"
cover: ""
type: "post"
lesson: 2
chapter: 1
tags: ["react", "javascript"]
---

## Những khái niệm chính cần hiểu khi làm việc với RxJS

- **Observable** một interface sẽ lắng nghe những notification trong *một khoản thời gian* và push cho những interface khác sẽ làm gì đó khi có notification này.
- **Subscription** Khi *observable* bắt đầu được thực thi, ví dụ như lắng nghe sự kiện, và push
- **Observer** một interface sẽ làm gì đó với data được push từ *observable*
- **Operators** các phương thức được sử dụng để tương tác với output của *Observable*

Ví dụ đăng ký listen lên một sự kiện nào đó

```js
const button = document.querySelector('button');
button.addEventListener('click', () => console.log('Clicked'));
```

Trong RxJS chúng ta viết như sau

```js
var button = document.querySelector('button');
Rx.Observable.fromEvent(button, 'click')
  .subscribe(() => console.log('Clicked!'));
```

## Khởi tạo `Observable`

Chúng ta có thể tạo observable bằng cách convert từ

### một hoặc nhiều giá trị

```js
Rx.Observable.from([1,2,3]);
```

### Từ một sự kiện

```js
Rx.Observable.fromEvent(document.querySelector('button'), 'click');
```

### Từ một promise

```js
Rx.Observable.fromPromise(fetch('/users'));
```

Chúng ta cũng có thể tạo observable sử dụng `Observable.create`

```js
var foo = Rx.Observable.create(function (observer) {
  observer.next(42);
  observer.next(100);
  observer.next(200);
  setTimeout(() => {
    observer.next(300);
  }, 1000);
  observer.complete();
});

foo.subscribe(function(x) {
  console.log(x);
});
```

Để ý là `observer` có phương thức `next` và `complete`.

## mergeMap ( alias là flatMap)



[Link bài gốc](https://medium.com/@johnvoon/understanding-rxjs-and-redux-observable-93d953d436c6)
