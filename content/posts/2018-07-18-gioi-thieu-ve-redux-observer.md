---
slug: "/2018-07-18-huong-dan-gioi-thieu-ve-redux-observer"
date: "2018-07-18"
title: "Giới thiệu RxJS và Redux Observer"
desc: "Một middleware mạnh hơn redux-thunk, ít phức tạp hơn redux-saga. Chúng ta sẽ điểm qua những khái niệm chính để bắt đầu với middleware này"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react", "javascript"]
---

<!-- TOC -->

- [Những khái niệm chính cần hiểu khi làm việc với RxJS](#những-khái-niệm-chính-cần-hiểu-khi-làm-việc-với-rxjs)
- [Khởi tạo `Observable`](#khởi-tạo-observable)
  - [một hoặc nhiều giá trị](#một-hoặc-nhiều-giá-trị)
  - [Từ một sự kiện](#từ-một-sự-kiện)
  - [Từ một promise](#từ-một-promise)
- [mergeMap ( alias là flatMap)](#mergemap--alias-là-flatmap)
- [Redux-Observable](#redux-observable)

<!-- /TOC -->

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

Phương thức phổ biến nhất cho phép transform output của observable.

```html
<input type='text' id='input1' />
<input type='text' id='input2' />
<p>Combined value: <span></span></p>
```

Nếu chúng ta muốn `subscribe` lên sự kiện user input giá trị vô `<input/>`

```js
var input1 = document.querySelector('#input1');
var input2 = document.querySelector('#input2');
var span = document.querySelector('span');

var obs1 = Rx.Observable.fromEvent(input1, 'input')
  .subscribe(event => span.textContext = event.target.value);

var obs2 = Rx.Observable.fromEvent(input2, 'input')
  .subscribe(event => span.textContext = event.target.value);
```

Giá trị span sẽ thay đổi khi ta nhập giá trị cho 1 trong 2 input, tuy nhiên nó sẽ override giá trị cũ. Nếu muốn có một kết quả combine từ cả 2 giá trị nhập vào từ input, ta `mergeMap` 2 observable lại.

```js
var obs1 = Rx.Observable.fromEvent(input1, 'input');
var obs2 = Rx.Observable.fromEvent(input2, 'input');

obs1.mergeMap(
  event1 => {
    return obs2.map(event2 => event1.target.value + ' ' + event2.target.value)
  }
).subscribe(
  combineValue => span.textContext = combineValue
);
```

## Redux-Observable

Redux-Observable cho phép chúng ta đưa các khái niệm của RxJS vào trong Redux. Nó sẽ tạo ra các Observable lắng nghe `action`, xào nấu trước khi `dispatch` một action khác đến `reducer`. Nó được gọi một cái tên chảnh chó là **Epic** (mình gọi nó là chảnh chó vì mình thấy nó méo có gì để được gọi là epic cả)

```js
import { ajax } from 'rxjs/observable/dom/ajax';

// Action creators
const fetchUser = username => ({ type: 'FETCH_USER', payload: username });
const fetchUserFulfilled = payload => ({ type: 'FETCH_USER_FULFILLED', payload });

// Epic
const fetchUserEpic = action$ =>
  action$.ofType('FETCH_USER')
    .mergeMap(action =>
      ajax.getJSON(`https://api.github.com/users/${action.payload}`)
        .map(response => fetchUserFulfilled(response))
    );
// Dispatch FETCH_USER action
dispatch(fetchUser('torvalds'));
```

Khi action type `FETCH_USER` được dispatch ra, `fetchUserEpic` lắng nghe tất cả sự kiện, nếu type là `FETCH_USER`, nó không đưa ngay xuống `reducer` của redux mà dừng lại và gọi ajax, sau khi có kết quả ajax, nó lại dispatch ra một sự kiện khác với type là `FETCH_USER_FULFILLED`, rồi trả về cho `reducer`

[Link bài gốc](https://medium.com/@johnvoon/understanding-rxjs-and-redux-observable-93d953d436c6)
[Video giải thích mergeMap](http://www.hay16.com/videob59tcUwfpWU/mergemaprxjs-tutorial-watch.html)