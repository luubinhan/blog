---
slug: "/2018-06-18-tim-hieu-middleware-va-redux"
date: "2018-06-18"
title: "Sử dụng Middleware với Redux dành cho người mới bắt đầu"
desc: "Nếu đã nắm rõ redux, bước tiếp theo phải tìm hiểu là middleware"
category: "react"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react", "redux", "javascript", "middleware"]
---

<!-- TOC -->

- [Middleware là gì](#middleware-là-gì)
- [Tại sao và tại sao](#tại-sao-và-tại-sao)
- [Một số ứng dụng của Middleware](#một-số-ứng-dụng-của-middleware)
  - [Loging](#loging)
  - [Đợi user confirm](#đợi-user-confirm)
- [Một số lựa chọn](#một-số-lựa-chọn)

<!-- /TOC -->

## Middleware là gì

Nghe tên thì hơi phức tạp nhưng thực sự nó đơn giản lắm, nó là một hàm sẽ modify và được gọi trước khi action được dispatch.

Mô phỏng quá trình hoạt động không có middleware

![](https://viblo.asia/uploads/5c72ff3e-859a-457a-ae11-e1392baa90af.gif)

và khi áp dụng middleware

![](https://viblo.asia/uploads/8ff8bd43-308a-47da-b382-891adae237d2.gif)

## Tại sao và tại sao

Trong thế giới của Rect, Redux là lựa chọn được ưa chuộng để có một container chứa chỉ chứa state. Ý tưởng chính của redux là tất cả những logic của app thì đưa vào **reducers**, là những function nhận vào 1 `state`, 1 `action` và trả về `state` mới. **Reducers** buộc phải là *pure function* không phụ thuộc và chỉnh sửa global state, để mà dễ test, dể refactor, performance tốt hơn.

Thí dụ 1 redux store lưu giá trị counter

```js
import redux from 'redux';

const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
    }
    return state;
};

const store = redux.createStore(counter);
```

Nếu để ý chúng ta có thể thấy redux có 2 ràng buộc

1. **Reducers** PHẢI là hàm sync, trả về `state` mới
2. Do không được thay đổi global state, reducers không được sử dụng những hàm như `setInterval()`

Thí dụ chúng ta làm một cái app để bấm thời gian, sau khi user bấm stop hiển thị giá trị thời gian đã chạy và sau đó lưu lại trên server bằng HTTP request. Chuyện gì sẽ xảy ra khi ta đang muốn quăng một hàm chạy async?

Reducer của chúng ta cần listen 3 actions:

1. `START_TIMER`, khi bắt đầu tính thời gian
2. `STICK`, khi ta thay đổi giá trị hiện tại
3. `STOP_TIMER` khi chúng ta không nhận được action `TICK` nào nữa

```js
const stopWatch = (state = {}, action) => {
    switch(action.type) {
        case 'START_TIMMER':
            return Object.assign({}, state, {startTime: action.currentTime, elapsed: 0})
        case 'TICK':
            return Object.assign({}, state, {elapsed: action.currentTime - state.startTime});
        case 'STOP_TIMER':
            return state;
    }
    return state;
}

const store = redux.createStore(stopWatch);
```

Khi user click button start, chúng ta dispatch event `START_TIMER`, khi user click stop, ta dispatch `STOP_TIMMER`

Vấn đề là làm sao dispatch `TICK`, nếu chúng ta gọi `setInterval()` trong `START_TIMER` thì lúc đó chúng ta đã thay đổi global state và vi phạm best practices của redux. Chổ thích hợp nhất để dispatch `TICK` là ở middleware

```js
const timerMiddleware = store => next => action => {
    if (action.type === 'START_TIMER') {
        action.interval = setInterval(() => store.dispatch({ type: 'TICK', currentTime: Date.now()}), 1000);
    } else if (action.type === 'STOP_TIMER') {
        clearInterval(action.interval);
    }
    next(action);
}
const stopWatch = (state = {}, action) => {
  switch (action.type) {
    case 'START_TIMER':
      return Object.assign({}, state, {
        startTime: action.currentTime,
        elapsed: 0,
        interval: action.interval
      });
    case 'TICK':
      return Object.assign({}, state, { elapsed: action.currentTime - state.startTime });
    case 'STOP_TIMER':
      return Object.assign({}, state, { interval: null });
  }
  return state;
};

const middleware = redux.applyMiddleware(timerMiddleware);
const store = redux.createStore(stopWatch, middleware);
```

Syntax của redux middleware là điều cần phải bàn tới: 1 middleware function là 1 function return 1 function return 1 function. Nhất đầu ghê chưa. Thật ra đang dùng currying function trong javascript ([đọc cà-ri function ở đây](https://luubinhan.github.io/blog/2018-03-02-gioi-thieu-higher-order-component-trong-react)). Function đầu tiên nhận vào `store` làm parameter, function thứ 2 sẽ nhận function `next` làm parameter, và function thứ 3 nhận dispatch `action` làm parameter. `store` và `action` là giá trị store và dispatch action hiện tại. Chiếc đũa thuần kỳ ở đây chính là function `next`, bạn có thể gọi nó là "sau khi middleware chạy xong, truyền cái cái action này cho middleware kế tiếp". Nói cách khác, middleware có thể là hàm async.

Tiếp theo chúng ta sẽ lưu giá trị sau khi user click stop lên server.

```js
const promiseMiddleware = store => next => action => {
    // kiểm tra payload nếu là promise thì đợi nó resolve
    if (action.payload && typeof action.payload.then === 'function') {
        action.payload.then(
            res => { action.payload = res; next(action); },
            err => { action.error = err; next(action); }
        );
    } else {
        next(action);
    }
}

const middleware = redux.applyMiddleware(timerMiddleware, promiseMiddleware);
const store = redux.createStore(stopWatch, middleware);
```

Khi gởi lên một HTTP request, chúng ta sẽ gởi request này ở dạng `promise`, `promiseMiddelware` sẽ đứng đợi promise này có giá trị trả về thì mới gọi `next(action)`

Ta sẽ gởi lên server bằng `axios`
```js
import axios from 'axios';

store.dispatch({ type: 'SAVE_TIME', payload: axios.post('/save', store.getState()) });
```

Reducer listen `SAVE_TIME`

```js
const stopwatch = (state = {}, action) => {
  switch (action.type) {
    case 'START_TIMER':
      return Object.assign({}, state, {
        startTime: action.currentTime,
        elapsed: 0,
        interval: action.interval
      });
    case 'TICK':
      return Object.assign({}, state, { elapsed: action.currentTime - state.startTime });
    case 'STOP_TIMER':
      return Object.assign({}, state, { interval: null });
    case 'SAVE_TIME':
      // If there was an error, set the error property on the state
      if (action.error) {
        return Object.assign({}, state, { error: action.error });
      }
      // Otherwise, clear all the timer state
      return Object.assign({}, state, { startTime: null, elapsed: null, error: null });
  }
  return state;
};
```
## Một số ứng dụng của Middleware

### Loging

```js
const loggerMiddleware = store => next => action => {
    console.log(action.type);
    next(action);
}
```

### Đợi user confirm

```js
const confirmationMiddleware = store => next => action => {
    if (action.shouldConfirm) {
        if (confirm('Are you sure?')) {
            next(action);
        }
    } else {
        next(action);
    }
}
```

## Một số lựa chọn

Một số thư viện để làm việc với middleware cho Redux rất phổ biến có thể tham khảo là `redux-thunk`, `redux-saga`, `redux-observable`


[Link bài gốc của tác giả Vkarpov](https://www.codementor.io/vkarpov/beginner-s-guide-to-redux-middleware-du107uyud)

Tham khảo thêm:

- [Realworld example sử dụng redux, middleware](https://github.com/gothinkster/react-redux-realworld-example-app/blob/master/src/middleware.js)
- [Tìm hiểu Middleware của tác giả Mark](https://medium.com/@meagle/understanding-87566abcfb7a)
- [applyMiddleware](https://redux.js.org/api-reference/applymiddleware)