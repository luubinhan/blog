---
slug: "/2018-07-17-gioi-thieu-rxjs"
date: "2018-07-17"
title: "Giới thiệu RxJS"
desc: ""
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react"]
---

# Khái niệm

Ngắn gọn nhất: có thể hình dung RxJS như là Lodash, nhưng không phải cho collection mà cho events.

Tại sao cần ReactiveX? Để mà quản lý chuỗi sự kiện.

Những concepts quan trọng của RxJS cần nắm

- **Observable** là 1 collection của những giá trị và sự kiện trong tương lai
- **Observer** là 1 collection các `callback`, lắng nghe các giá trị được gởi tới bởi **Observable**
- **Subscription** đại diện cho những **Observable** đang chạy, thường được sử dụng để hủy việc chạy
- **Operators** các pure function cho phép xử lý thực thi các câu lên như trên collection `map`, `filter`, `concat`, `reduce`,...
- **Subject** giống như `EventEmitter`, là cách duy nhất để gởi giá trị hoặc sự kiện đến nhiều **Observer**
- **Schedulers** nơi tập kết của dispatcher để kiểm soát việc chạy đồng thời, cho phép định vị khi có một tính toán xảy ra như `setTimeout` hoặc `requestAnimationFrame`

# Ví dụ

Đăng ký một listener

```jsx
const button = document.querySelector('button');
button.addEventLisener('click', () => console.log('Clicked!') )

```

Sử dụng RxJS chúng ta tạo một **Observable**

```js
const {fromEvent} = rxjs;

const button = document.querySeletor('button')
fromEvent(button, 'click')
  .subscribe(() => console.log('Clicked!'));
```

Tại sao RxJS mạnh bởi vì nó giảm bớt các giá trị sử dụng pure function

Thông thường, nếu chúng ta create một impure function như bên dưới, có thể làm đóng `state` rối nùi

```js
var count = 0;
var button = document.querySelector('button');
button.addEventListener('click', () => console.log(`Clicked ${++count} times`));
```

Sử dụng RxJS chúng ta cô lập state

```js
const { fromEvent } = rxjs;
const { scan } = rxjs.operators;

const button = document.querySelector('button');
fromEvent(button, 'click').pipe(
  scan(count => count + 1, 0)
)
.subscibe(count => console.log(`Clicked ${count} times`));
```

Hàm `scan` hoạt động giống như `Array.reduce`. Nó nhận vào 1 giá trị, thực hiện tính toán với giá trị này, và đưa nào thành input cho chính nó khi gọi lần tiếp theo.

RxJS sẽ có một số các operator kiểu như vậy

Đây là cách chúng ta ngăn không cho click nhiều lần liên tục

```js
var count = 0;
var rate = 1000;
var lastClick = Date.now() - rate;
var button = document.querySelector('button');
button.addEventListener('click', () => {
  if (Date.now() - lastClick >= rate) {
    console.log(`Clicked ${++count} times`);
    lastClick = Date.now();
  }
});
```
Với RxJS có thể viết

```js
const {fromEvent} = rxjs;
const {throttleTime, scan} = rxjs.operators;

const button = document.querySelector('button');
fromEvent(button, 'click').pipe(
  throttleTime(1000),
  scan(count => count + 1, 0)
)
.subscribe(count => console.log(`Clicked ${count} times`))
```