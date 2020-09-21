---
slug: "/2018-05-07-huong-dan-async-await-giai-thich-vi-du"
date: "2018-05-07"
title: "Giải thích async/await của javascript"
desc: "Hướng dẫn các bạn nắm vững async/await trong javascript, kèm ví dụ cụ thể"
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
- [Xử lý khi có lỗi](#xử-lý-khi-có-lỗi)
- [Await bên trong loop](#await-bên-trong-loop)

<!-- /TOC -->

# Giới thiệu

`Async/await` sinh ra để giải quyết đống lộn xộn **callback** của `Promise`. Cú pháp `async/await` sẽ giúp chúng ta diễn giải logic này một cách dễ đọc hơn, dễ maintain hơn.

Trước khi bắt đầu, cũng nhìn lại một cách tổng quát Promise là gì, nếu đã nắm vững Promise, bạn có thể bỏ qua phần này.

# Promise

**Promise** trong Javascript giống như `Future` trong Java, `Task` trong C#, một kiểu **abstraction** cho phép các đoạn code chạy bất tuần tự, đầy đủ thì có thể xem thêm bài viết của mình [ở đây về Promise trong Javascript](2017-10-12-javascript-promise)

**Promise** thường được dùng trong các thao tác I/O và network, ví dụ: đọc file, tạo một HTTP request.

Bình thường, do Javascript chạy kiểu single threat, mỗi một threat chỉ thực hiện một xử lý, Promise sẽ đảm bảo không chặn như vậy (còn cách nó làm như thế nào, bạn đọc bài ở link trên sẽ hiểu), thay vào đó nó sẽ gọi hàm callback mà chúng ta gắn vào trong `then`.


```js

const promise = fetch('http://example.com/');
```

Giờ xem xét đoạn code sau

```js
console.log('Bắt đầu chạy');

const promise = fetch('http://example.com/');
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
const call1Promise = fetch('http://example.com/');

call1Promise.then(result1 => {
    console.log(result1);

    const call2Promise = fetch('http://example.com/');
    const call3Promise = fetch('http://example.com/');

    return Promise.all([call2Promise, call3Promise]);
}).then(arr => {
    // cả 2 promise 2, 3 đã hoàn tất
    console.log(arr[0]);
    console.log(arr[1]);
})
```

![Hướng dẫn các bạn nắm vững asyn await trong javascript, kèm ví dụ cụ thể](https://nikgrozev.com/images/blog/async-await/CombinedPromises.png)

Và nếu chúng ta thêm một vài thao tác xử lý bất tuần tự nữa, thêm câu `catch` nữa, mọi thứ sẽ bắt đầu rối như canh hẹ luôn.

# Hàm Async

**Async function** là một cách để chúng ta định nghĩa một **hàm trả về 1 Promise đã được resolve**

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

Tương tự, hàm `async` sẽ *throw* một exception giống như `reject` của promise

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

Bên trong hàm `async` ta có thể sử dụng thêm từ khóa là `await`, và chỉ có thể sử dụng `await` trong hàm `async` thôi nhé, nó sẽ cho phép ta chỉ định một tác vụ phải **đợi tao chạy xong**.

```js
async function f(){
    // sau khi promise được resolved, kết quả đó sẽ dược đưa về cho response
    const response = await fetch('http://example.com/');
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
    console.log(await fetch('http://example.com/'));

    // chạy bất tuần tự 2 đứa này
    const call2Promise = fetch('http://example.com/');
    const call3Promise = fetch('http://example.com/');

    // đợi khi cả 2 thằng trên chạy xong và được resolve
    const response2 = await call2Promise;
    const response3 = await call3Promise;

    console.log(response2);
    console.log(response3);
}

// gọi hàm async
solution().then(() => console.log('Finished'));
```

Nó sẽ tương tự như cách sử dụng `Promise.all(...).then(...)` chỉ là ta viết khác đi.

![](https://nikgrozev.com/images/blog/async-await/AsyncAwaitExample.png)

# Xử lý khi có lỗi

Trong ví dụ trên chúng ta đã mặc định là 2 hàm `call2Promise` và `call3Promise` luôn thành công, nếu lỡ bất kỳ thằng nào chết, nó sẽ `reject` ngay, dù có thằng nào đó thành công,


```js

async function f() {
    //...
}

f().
    then(() => console.log('Success')).
    catch(err => console.log(err))
```

Nếu chúng ta dùng `try/catch`, nếu một thằng bị lỗi nó cũng không văng ra ngoài luôn

```js
async function f() {
    try {
        const call2Promise = fetch('http://example.com/');
        const call3Promise = fetch('http://example.com/');
        console.log('CALL'); //vẫn được chạy dù 1 trong 2 thằng có lỗi
    } catch (e){
        console.log(e);
    }
}
```

# Await bên trong loop

```js
for(var i = 0; i < 3; i++) {
  console.log('before async: ', i)
  var result = await fetch('http://example.com/')
  console.log('after async: ', i)
}
```

Bạn đoán thử xem đoạn code trên in ra kết quả gì?

```
before async:  0
before async:  1
before async:  2
after async:  3
after async:  3
after async:  3
```

Không đúng nhé, khi gặp `await`, nó sẽ đợi `resolve` mới chạy tiếp vòng loop, nên kết quả đúng sẽ là

```
before async:  0
after async: 0
before async: 1
after async: 1
before async: 2
after async: 2
```

Khi gặp `async/await` trong vòng lặp, hay có nhiều `await` bên trong hàm `async`, thì nhớ là **THẰNG Ở SAU CHỈ ĐƯỢC CHẠY KHI THẰNG TRƯỚC NÓ ĐÃ RESOLVE**. Trường hợp mình hông muốn nó đợi như vậy, cho nó gọi cùng lúc luôn (song song) thì viết lại như sau

Block lại

```js
async function parallel() {
    const result1 = await fetch('http://example.com/');
    const result2 = await fetch('http://example.com/');
}
```

Không block

```js
async function parallel() {
    const promise1 = fetch('http://example.com/');
    const promise2 = fetch('http://example.com/');

    const result1 = await promise1;
    console.log(result1);
    const result2 = await promise2;
    console.log(result2);
}
```

Bạn có thắc mắc tại sao chỉ với việc tách biến thế này lại làm cho 2 `await` chạy cùng lúc mà nó thằng trước không `block` thằng chạy sau lại? 

2 cách viết này là hoàn toàn khác nhau, thật ra mình cũng chưa đủ trình để giải thích cặn kẽ tại sao nó lại chạy được, hy vọng bạn nào đọc mà hiểu thì comment giải thích dùm mình. Còn theo cách hiểu của mình

Đây là cách chạy của đoạn code #1

[Imgur - Giải thích async/await của javascript](https://i.imgur.com/ZbSjV3V.jpg)

Cách chạy của đoạn code #2
[Imgur - Giải thích async/await của javascript](https://i.imgur.com/F2l59c0.jpg)

[Link tham khảo IKOLAY GROZEV](http://nikgrozev.com/2017/10/01/async-await/)
[Why doesn't the code after await run right away? Isn't it supposed to be non-blocking?](https://stackoverflow.com/questions/43302584/why-doesnt-the-code-after-await-run-right-away-isnt-it-supposed-to-be-non-blo)