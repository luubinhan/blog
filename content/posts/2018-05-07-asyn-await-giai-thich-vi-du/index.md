---
slug: "/2018-05-07-huong-dan-async-await-giai-thich-vi-du"
date: "2018-05-07"
title: "Async Await giải thích và ví dụ"
desc: "Hướng dẫn các bạn nắm vững asyn await trong javascript, kèm ví dụ cụ thể"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Giới thiệu](#giới-thiệu)
- [Promise](#promise)
- [Vấn đề: Kết hợp nhiều Promise](#vấn-đề-kết-hợp-nhiều-promise)
- [Hàm Async](#hàm-async)
- [Await](#await)
- [Giải quyết lỗi xảy ra](#giải-quyết-lỗi-xảy-ra)

<!-- /TOC -->

# Giới thiệu

Cú pháp `async/await` trong ES7 giúp giải quyết vấn đề với **promise** bất tuần tự.

Trường hợp chúng ta muốn `fetch` dữ liệu bất tuần tự từ nhiều nguồn database hoặc các API theo một thứ tự nhất định, chúng ta sẽ đi đến kết cục là một đống lộn xộn **callback** của `Promise`. Cú pháp `async/await` sẽ giúp chúng ta diễn giải logic này một cách dễ đọc hơn, dễ maintain hơn.

Trước khi bắt đầu, cũng nhìn lại một cách tổng quát Promise là gì, nếu đã nắm vững Promise, bạn có thể bỏ qua phần này.


# Promise

**Promise** trong Javascript giống như `Future` trong Java, `Task` trong C#, một kiểu **abstraction** cho phép các đoạn code chạy bất tuần tự, đầy đủ thì có thể xem thêm bài viết của mình [ở đây về Promise trong Javascript](https://luubinhan.github.io/blog/2017-10-12-javascript-promise/)

**Promise** thường được dùng trong các thao tác I/O và network, ví dụ: đọc file, tạo một HTTP request.

Bình thường, do Javascript chạy kiểu single threat, mỗi một threat chỉ thực hiện một xử lý, Promise sẽ đảm bảo không chặn như vậy (còn cách nó làm như thế nào, bạn đọc bài ở link trên sẽ hiểu), thay vào đó nó sẽ gọi hàm callback mà chúng ta gắn vào trong `then`.

Để đơn giản, chúng ta sử dụng thư viện `request-promise` để tạo một HTTP GET request, nó sẽ trả về cho chúng ta một Promise

```js
const rq = require('request-promise');

const promise = rq('http://example.com/');
```

Giờ xem xét đoạn code sau

```js
console.log('Bắt đầu chạy');

const promise = rp('http://example.com/');
promise.then(result => console.log(result));

console.log("Không thể biết được Promise đã kết thúc chưa...")
```

Nếu chạy đoạn code này nhiều lần, chúng ta sẽ nhận những kết quả khác nhau, có khi đoạn `console.log(result)` chạy trước, có khi chạy sau.

**Không có một cách nào hợp lý để chúng ta block lại các xử lý cho đến khi `Promise` kết thúc**. Muốn vậy chúng ta phải đưa đoạn code phía sau Promise vào bên trong hàm callback

![Hướng dẫn các bạn nắm vững asyn await trong javascript, kèm ví dụ cụ thể](https://nikgrozev.com/images/blog/async-await/SimplePromiseExample.png)

Nếu chúng ta đưa đoạn code vào trong `then`, nó chỉ được gọi khi Promise đó trả về `success`, nếu `error` thì nghĩ chạy luôn. Phải đưa thêm xử lý vào `catch`

```js
rp('http://example.com')
    .then(() => console.log('Success'))
    .catch((e) => console.warn(e));
```

# Vấn đề: Kết hợp nhiều Promise

Sử dụng 1 Promise thì không vấn đề vì, nếu cần xử lý cho một logic bất tuần tự phức tạp hơn, chúng ta sẽ phải gọp nhiều Promise.

Ví dụ chúng ta cần ứng dụng thực hiện

1. Tạo một HTTP request, đợi đến khi hoàn tất, in kết quả ra
2. Sau đó tạo thêm 2 HTTP request chạy song song
3. Sau khi cả 2 request này hoàn tất, in kết quả ra

```js
// tạo first request
const call1Promise = rq('http://example.com/');

call1Promise.then(result1 => {
    console.log(result1);

    const call2Promise = rq('http://example.com/');
    const call3Promise = rq('http://example.com/');

    return Promise.all([call2Promise, call3Promise]);
}).then(arr => {
    // cả 2 promise 2, 3 đã hoàn tất
    console.log(arr[0]);
    console.log(arr[1]);
})
```

![Computational process of a combination of promises. We use "Promise.all" to combine two concurrent promises into a single promise.](https://nikgrozev.com/images/blog/async-await/CombinedPromises.png)

Và nếu chúng ta thêm một vài thao tác xử lý bất tuần tự nữa, thêm câu `catch` nữa, mọi thứ sẽ bắt đầu rối như canh hẹ luôn.

# Hàm Async

**Async function** là một cách để chúng ta định nghĩa một **hàm trả về 1 Promise**

Ví dụ, 2 hàm sau là hoàn toàn như nhau

```js
function f() {
    return Promise.resolve('TEST');
}

// hàm asyncF này = với hàm f ở trên
async function asyncF() {
    return 'TEST'
}
```

Tương tự, hàm `async` sẽ *throw* một exception giống như rejecting của promise

```js
function f() {
    return Promise.reject('Error');
}

// asyncF = f
async function asyncF() {
    throw 'Error';
}
```

# Await

Để các Promise chạy tuần tự, các xử lý Promise phải đợi các xử lý bất tuần tự khác chạy xong mới đến lượt nó chạy. Bằng cách sử dụng từ khóa `async`, javascript sẽ **đóng gói** các xử lý bên trong hàm để trả về 1 Promise, và chạy kiểu **bất tuần tự**

Bên trong hàm `async` ta có thể sử dụng thêm từ khóa là `await`, và chỉ có thể sử dụng `await` trong hàm `async` thôi nhé, nó sẽ cho phép ta chỉ định một tác vụ phải chạy tuần tự, phải **đợi tao chạy xong**.

```js
async function f(){
    // sau khi promise được resolved, kết quả đó sẽ dược đưa về cho response
    const response = await rp('http://example.com/');
    console.log(response);
}

// bên ngoài hàm async ta phải dùng then chứ không thể gọi await, nhớ là hàm f trả về promise
f().then(() => console.log('Finished'));
```

Giờ chúng ta viết lại hàm xử lý lồng nhiều Promise ở trên

```js
// đưa nó vô hàm async
async function solution() {
    // đợi và print kết quả
    console.log(await rp('http://example.com/'));

    // chạy bất tuần tự 2 đứa này
    const call2Promise = rp('http://example.com/');
    const call3Promise = rp('http://example.com/');

    // đợi khi cả 2 thằng trên chạy xong và được resolve
    const response2 = await call2Promise;
    const response3 = await call3Promise;

    console.log(response2);
    console.log(response3);
}

// gọi hàm async
solution().then(() => console.log('Finished'));
```

Nó sẽ tương tự như cách sử dụng `Promise.all(...).then(...)` chỉ là ta viết khác đi cho nó dễ hiểu, đỡ rối.

![](https://nikgrozev.com/images/blog/async-await/AsyncAwaitExample.png)

# Giải quyết lỗi xảy ra

Trong ví dụ trên chúng ta đã mặc định là 2 hàm `call2Promise` và `call3Promise` luôn thành công, nếu lỡ thằng nào chết chúng ta phải `try/catch` để bắt lỗi

```js
async function f() {
    try {
        const promiseResult = await Promise.reject('Error');
    } catch (e){
        console.log(e);
    }
}
```

Nếu không handle lỗi trong hàm `async`, thì nó sẽ trả về rejected promise khi có bug

```js

async function f() {
    //...
}

f().
    then(() => console.log('Success')).
    catch(err => console.log(err))
```

Kết luận `async/await` không hẳn là kẻ thay thế cho `promise`. Chúng ta vẫn dùng Promise cho những trường hợp đơn giản, với yêu cầu xử lý phức tạp hơn thì luôn cân nhắc xử dụng `async/await`.


[Link tham khảo IKOLAY GROZEV](http://nikgrozev.com/2017/10/01/async-await/)