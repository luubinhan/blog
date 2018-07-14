---
slug: "/2018-05-07-asyn-await-giai-thich-vi-du"
date: "2018-05-07"
title: "Async Await giải thích và ví dụ"
desc: "Hướng dẫn các bạn nắm vững asyn await trong javascript, kèm ví dụ cụ thể"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

Ngày xưa chúng ta viết javascript sử dụng `callback`, nó sinh ra chuyện quá nhiều `callback` lồng nhau, tiến bộ hộ, javascript cập nhập khái niệm `promise`, những vẫn vướn phải nhiều `promise` lồng nhau, và giờ javascript đẻ thêm khái niệm `asyn/await` để khử `promise` lồng nhau.

Bản thân promise là bất đồng bộ. Trước đây chúng ta sẽ lồng `promise` tiếp theo sau hàm `then`, để thực hiện nhiều `promise` đồng bộ, chúng ta phải cho phép nó đợi lẫn nhau, nói một cách khác nếu khi chúng ta muốn thực thi một tác vụ bất đồng bộ và tác vụ này lại đợi một tác vụ bất đồng bộ khác chạy xong.

Chúng ta sẽ sử dụng từ khóa `async` gắn vào vào trước hàm trả về 1 `promise`. Nên nhớ là hàm `async` trả về `promise`. Mọi thao tác bên trong hàm `async` sẽ chạy bất đồng bộ. 

```js
function f() {
    return Promise.resolve('TEST');
}

// hàm asyncF này = với hàm f ở trên
async function asyncF() {
    return 'TEST'
}
```

Tương tự hàm `async` sẽ throw một exception giống như rejecting của promise

```js
function f() {
    return Promise.reject('Error');
}

// asyncF = f
async function asyncF() {
    throw 'Error';
}
```

Bên trong hàm `async` ta có thể sử dụng thêm từ khóa là `await`, và chỉ có thể sử dụng `await` trong hàm `async` thôi nhé, nó sẽ cho phép ta chỉ định một tác vụ phải chạy đồng bộ, phải đợi cái `promise` trả về.

```js
async function f(){
    // sau khi promise được resolved, kết quả đó sẽ dược đưa về cho response
    const response = await rp('http://example.com/');
    console.log(response);
}

// bên ngoài hàm async ta phải dùng then chứ không thể gọi await, nhớ là hàm f trả về promise
f().then(() => console.log('Finished'));
```

Thay vì lổng nhiều `promise` trong `then`, chúng ta có thể viết

```js
// đưa nó vô hàm async
async function solution() {
    // đợi và print kết quả
    console.log(await rp('http://example.com/'));

    // chạy bất đồng bộ 2 đứa này
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

Tức là ở đây chúng ta cho 2 hàm send đi 1 request chạy song song, nhưng ta phải đợi cả 2 hàm này có kết quả rồi ta mới chạy tiếp. Nó sẽ tương tự như cách sử dụng `Promise.all(...).then(...)` chỉ là ta viết khác đi cho nó dễ hiểu, đỡ rối.

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

Như vậy `async/await` không hẳn là kẻ thay thế cho `promise`, nó chỉ là bổ sung thêm cho `promise` một tính năng đồng bộ cho nhiều tao tác bất đồng bộ! Chúng ta sẽ vẫn viết `promise` thuần cho những tác vụ chỉ cần những đặc tính của `promise`

Tác Giả: IKOLAY GROZEV
Link Bài Gốc: http://nikgrozev.com/2017/10/01/async-await/