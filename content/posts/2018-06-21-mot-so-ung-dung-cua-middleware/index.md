---
slug: "/2018-06-21-mot-so-ung-dung-cua-middleware"
date: "2018-06-21"
title: "Một số ứng dụng của middleware"
desc: "Tiếp theo bài trước về middleware, ứng dụng với các trường hợp thực tế"
category: "react"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react", "redux", "javascript", "middleware"]
---

<!-- TOC -->

- [Đóng gói các phương thức gọi API](#đóng-gói-các-phương-thức-gọi-api)
- [localStorage và Cookies](#localstorage-và-cookies)
- [Theo dõi file](#theo-dõi-file)
- [Trình nghe nhạc](#trình-nghe-nhạc)

<!-- /TOC -->

Tổng hợp lại để nhớ về middleware, nó là 1 function nhận vào

storeInstance 
=> functionToCallWithAnActionThatWillSendItToTheNextMiddleware 
=> actionThatDispatchWasCalledWith 
=> valueToUseAsTheReturnValueOfTheDispatchCall

Được viết với dạng syntax

```
store => next => action => result
```


Sau đấy được sử dụng bằng cách truyền vào như một tham số cho hàm `applyMiddleware`

```js
const middlewares = applyMiddleware(middleware1, middleware2);
const store = createStore(reducers, initState, middlewares)
```

Middleware đơn giản nhất là một function éo làm gì cả, nó chỉ forward cái action đến middleware kế tiếp

```js
const middleware = store => next => action => next(action)
```

## Đóng gói các phương thức gọi API

Nếu API của chúng ta cần authentication token, thay vì trên mỗi action creatỏ chúng ta lấy token (có thể từ `store.getState` hoặc `sessionStorage`), rồi truyền tham số này vào trước khi gọi api, chúng ta dùng middleware để làm chuyện đó sẽ tốt hơn

```js
const fetch = (url, params) => ({
    type: 'FETCH',
    url,
    params,
});

const fetchMiddleware = fetchImplementation => store => next => action => {
    if (action.type === 'FETCH') {
        const {url, params} = action;
        const token = store.getState().token;
        _.set(params, 'headers.token', token);
        return fetchImplementation(url, params);
    } else {
        return next(action);
    }
};

const middleware = applyMiddleware(fetchMiddleware(window.fetch));

const store = createStore(reducers, middleware);

// vi du goi action
const getUser = id => async ({dispatch}) => {
    const result = await dispatch(fetch(`http://api.website.com/${id}`, {method: 'GET'}));
}
```

Thằng middleware `fetchMiddleware` khi túm được `action.type` tên là **FETCH** nó sẽ thực hiện việc gởi một HTTP request và trả về 1 `promise`

Ở đây để làm cho ví dụ đơn giản chúng ta không implement cái `fetchImplementation` mà đang hard code thằng này sử dụng `window.fetch`

## localStorage và Cookies

Ứng dụng nào cũng sẽ cần lưu thông tin user, có thể là *authentication token* hoặc đường dẫn lần trước user truy cập. Chúng ta sẽ sử dụng middleware để lưu trạng thái này xuống `localStorage` hoặc *cookies*.

Nếu chúng ta gọi `getState` trước khi gọi `next(action)`, chúng ta sẽ có **before state** trước khi action đến tay `reducer`, nếu chúng ta gọi nó sau `next(action)`, chúng ta có **after state** sau khi reducer xử lý. Dựa vào **before state** và **after state** này chúng ta có thể thay đổi đúng cái đã bị thay đổi

Ví dụ lưu authentication token xuống `localStorage`

```js
const middleware = () => store => next => action => {
    // lấy before state và after state
    const previousToken = store.getState().token;
    next(action);
    const nextToken = store.getState().token;

    // thay đổi
    if (nextToken !== previousToken) localStorage.setItem('token', nextToken);
}

// lấy init state từ localStorage
const token = localStorage.getItem('token');
const initState = token
    ? _.set(defaultState, 'token', token)
    : defaultState;
const middleware = applyMiddleware(middleware());
const store = createStore(reducers, initialState, middlewares);
```

## Theo dõi file

Ví dụ trong ứng dụng ta có state là `activeFiles`, là một mảng file bạn muốn theo dõi thay đổi. Khi file thay đổi, chúng ta muốn `dispatch` 1 action

Sử dụng tương tự như trên

```js
const middleware = () => store => {
    const fileWatcher = new FileWatcher();
    fileWatcher.on('file-changed', filename => {
        store.dispatch({ type: 'FILE_CHANGED', filename });
    });

    // Make sure we're watching files that may be included in the store's initial state
    const initialFiles = store.getState().activeFiles;
    fileWatcher.watchFiles(initialFiles);

    return next => action => {
        // Get the state before and after the action was performed
        const previousFiles = store.getState().activeFiles;
        next(action);
        const nextFiles = store.getState().activeFiles;

        // See what changed before and after
        const filesToUnwatch = _.difference(previousFiles, nextFiles);
        const filesToWatch = _.difference(nextFiles, previousFiles);

        // Respond to changes
        fileWatcher.unwatchFiles(filesToUnwatch);
        fileWatcher.watchFiles(filesToWatch);
    };
}
```

Ở đây thì nó không phụ thuộc action: vô tư tạo vô số action nếu muốn thay đổi giá trị active files, chúng ta không cần thay đổi logic trong middleware.

Về mặt kỹ thuật, ví vụ trên có thể viết lại bằng cách sử dụng `store.subscribe`. Tuy nhiên tiếp cận vấn đề liên quan tới side-effect của middleware phụ thuộc vào action bằng middleware là tốt nhất

## Trình nghe nhạc

Rất giống như ví vụ trên. Khác biệt quan trọng là: sự thay đổi của `state` có thể xảy ra từ middleware hoặc từ những nguồn khác.

Giờ chúng ta có `state` là `isPlaying` và `currentTime`. Chúng ta sẽ giữ đúng khái niệm "single source of truth" của redux, middleware sẽ đảm nhiệm việc giữ giá rị state này. Nếu action thay đổi `isPlaying` từ `false` sang `true`, thì ta play nhạc, nếu action thay đổi `currentTime` chúng ta sẽ phát đến đúng thời gian đó.

Để cho chính xác, trong middleware chúng ta adjust một chút để khi `isPlaying` chuyển sang `false`, chúng ta thay đổi luôn `currentTime`. Cái ngày cực kỳ quan trọng vì chúng ta không muốn cứ mỗi khi `currentTime` mà thay đổi thì chúng ta lại phát đúng đến thời điểm đó. Thêm parameter `origin` trong action để làm đối số kiểm tra

```js
const middleware = musicPlayer => store => {
    const playbackOrigin = 'playbackOrigin';

    musicPlayer.on('current-time-changed', currentTime => {
        store.dispatch({ type: 'SET_CURRENT_TIME', origin: playbackOrigin, currentTime })
    });

    musicPlayer.on('playback-finished', () => {
        store.dispatch({ type: 'STOP_PLAYING', origin: playbackOrigin })
    });

    const initState = store.getState();
    if (initState.isPlaying) musicPlayer.play();
    musicPlayer.seek(initState.currentTime);

    return next => action => {
        const { isPlaying: wasPlaying, currentTime: previousTime } = store.getState();
        next(action);
        const { isPlaying: isPlaying, currentTime: nextTime } = store.getState();

        // không dispatch action với các action từ player
        if (action.origin === playbackOrigin) return;

        if (!wasPlaying && isPlaying) musicPlayer.play();
        if (wasPlaying && !isPlaying) musicPlayer.pause();
        if (previousTime !== nextTime) musicPlayer.seek(nextTime);
    }
}
```

Miễn là làm đúng cái middleware này, chúng ta sẽ không bao giờ dính mấy con bug kiểu như nút Play thì đang cho thấy ở trạng thái Pause trong khi đang phát rầm rầm.


[Link bài gốc của tác giả Jacob Parker](https://medium.com/@jacobp100/you-arent-using-redux-middleware-enough-94ffe991e6)