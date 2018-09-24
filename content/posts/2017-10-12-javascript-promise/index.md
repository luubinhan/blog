---
slug: "/2017-10-12-javascript-promise"
date: "2017-10-12"
title: "Nắm vững Promise trong javascript"
desc: "Để hiểu rõ hơn Promise của javascript, tạo một Promise make-by-me xem sao"
category: "javascript"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

Bạn sẽ gặp đoạn code sau rất nhiều

```js
fetch('/user/1')
    .then( user => {
        /* run after API return */
    })
```

Đoạn code nằm bên trong `.then` sẽ chạy **sau khi** nhận dữ liệu trả về từ server trước khi chạy tiếp. `Promise` một kiểu **abstraction** cho phép các đoạn code chạy bất tuần tự

Nếu không tin bạn thử check kiểu của Promise sẽ thấy

```js
typeof new Promise((resolve, reject) => {}) === 'object' // true
```

Để mình nhắc lại lần nữa để bạn không bị cái tên hoa mĩ *Promise* lừa tình, **Promise chỉ đơn thuần là một object**. Để có thể đợi trả về từ server, trước khi thực hiện chạy đoạn code trong `.then()`, function của bạn **BUỘC PHẢI** trả về một *Promise*. Function `fetch` được viết như sau

```js
cost fetch = function(url) {
    return new Promise((resolve, reject) => {
        request((error, apiResponse) => {
            if (error) {
                // lỗi rồi
                reject(error)
            }
            // success
            resolve(apiResponse)
        })
    })
}
```

Giờ tới phần quan trọng, viết lại khai báo Promise (gọi là `SimplePromise` để tránh trùng tên) để xem cách làm của Promise

```js
class SimplePromise {
    constructor(executionFunction) {
        this.promiseChain = [];
        this.handleError = () => {};

        this.onResolve = this.onResolve.bind(this)
        this.onReject = this.onReject.bind(this)

        executionFunction(this.onResolve, this.onReject);
    }

    then(onResolve) {
        this.promiseChain.push(onResolve);
        return this;
    }

    catch(handleError) {
        this.handleError = handleError;

        return this;
    }

    onResolve(value) {
        let storedValue = value;

        try {
            this.promiseChain.forEach( nextFunction => {
                storedValue = nextFunction(storedValue);
            })
        } catch (error) {
            this.promiseChain = [];

            this.onReject(error);
        }
    }

    onReject(error) {
        this.handleError(error);
    }
}
```

Khi khởi tạo một Promise `new Promise((resolve, reject) =>{...} )` chúng ta truyền vào một callback function, function này sẽ nhận 2 tham số truyền vào là 2 function internal của Promise `onResolve` và `onReject`

Bên trong constructor đồng thời khởi tạo mảng `promiseChain` và hàm `handleError`, khi thêm một hoặc một mớ `.then()`, các hàm này sẽ được tuần tự đưa vào mảng `promiseChain`, hàm `.catch()` thì được map với hàm `handleError` trong Promise.

> Lưu ý, cái này là ví dụ, Promise thực tế thì 2 hàm `then` và `catch` sẽ trả về new Promise, cái này làm cho đơn giản trả về `this` thôi.

Khi một hàm bất tuần tự (async) được gọi `resolve(apiResponse)`, object promise bắt đầu chạy `onResolve(apiResponse)` nó sẽ loop qua *tuần tự* mảng *promiseChain*, thực thi các xử lý trong hàm từ đầu tiên trong mảng, đến hàm thứ 2, 3, 4..., mỗi lần như vậy nó sẽ nhận giá trị `storedValue` đồng thời cập nhập lại `storedValue` này. 

Bạn nên đọc thêm [bài viết Async/Await](https://luubinhan.github.io/blog/2018-05-07-huong-dan-async-await-giai-thich-vi-du/)
