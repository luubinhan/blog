---
slug: "/2018-08-14-huong-dan-flow-xy-ly-trong-modern-js-callback-promise-async-await"
date: "2018-08-14"
title: "Flow sử lý trong modern JS - từ callback đến promise, đến Async/Await"
desc: "Cùng nhìn lại quá trình tiến hóa của javascript trong cách sử lý flow"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Single-threat processing](#single-threat-processing)
- [Asynchronous với Callbacks](#asynchronous-với-callbacks)
- [Promises](#promises)
  - [finally()](#finally)
  - [all()](#all)
  - [race()](#race)
- [Async/Await](#asyncawait)

<!-- /TOC -->

# Single-threat processing

Xét thử đoạn code

```js
result1 = doSomething1();
result2 = doSomething2(result1);
```

Các ngôn ngữ sẽ xử lý đoạn code trên theo trình tự từ trên xuống dưới, Javascript không chỉ theo trình tự như vậy mà còn chạy trên 1 **single processing threat**, có nghĩa khi có một đoạn code đang chạy trên trình duyệt, trình duyệt đứng lại đợi xử lý xong mới chạy đến đoạn thứ 2, ví dụ khi click 1 button, javascript chạy xử lý và update lại DOM nếu có, một khi hoàn tất, trình duyệt tiếp tục xử lý đến thằng khác trong queue.

* Note: thằng PHP cũng dùng single threat, nhưng nó chạy trên server multi-threat như Apache. Nếu có 2 request tới cùng một trang PHP trong cùng thời điểm sẽ tạo ra 2 threat chạy độc lập

# Asynchronous với Callbacks

Dễ thấy vấn đề với *single threat* là nếu một action tốn quá nhiều thời gian xử lý, như Ajax, trình duyệt sẽ bị **chết đứng** ở thời điểm đó. Giải pháp là dùng *asyncchronouse process*, nó ko bắt trình duyệt đợi nó chạy xong, mà sẽ gọi đến một function đã đăng ký (**callback function*) khi complete.

```js
doSomethingAsync(callback1);
console.log('finished');

// call when doSomethingAsync completes
function callback1(error) {
  if (!error) console.log('doSomethingAsync complete');
}
```

Mọi thứ với callback đều ok nếu chúng ta không lồng cả chục cái callback vào trong một function

```js
async1((err, res) => {
  if (!err) async2(res, (err, res) => {
    if (!err) async3(res, (err, res) => {
      console.log('async1, async2, async3 complete.');
      //.... có thánh mới debug được code kiểu này
    });
  });
});
```

# Promises

Được giới thiệu trong ES6, thật ra nó vẫn là dùng callback, nhưng được tổ chức lại, syntax rõ ràng hơn. **Promise** là một **object* với 2 function được truyền vào như argument

- **resolve**: được gọi khi chạy hoàn tất
- **reject**: được gọi nếu có lỗi

Ví dụ sử dụng promise

```js
const db = require('database');

// connect to database
function asyncDBconnect(param) {
  return new Promise((resolve, reject) => {
    db.connect(param, (err, connection) => {
      if (err) reject(err);
      else resolve(connection);
    });
  });
}
```

Nếu trả về một **Promise**, có thể gọi một chuỗi các callback trong phương thức `.then()`, phương thức đứng sau sẽ nhận `resolve` từ phương thức trước. Nếu lỗi ở bất kỳ vị trí nào trong `then()` nó sẽ quăng ngay xuống `catch()`

```js
asyncDBconnect('http://localhost:1234')
  .then(asyncGetSession)      
  // passed result of asyncDBconnect
  .then(asyncGetUser)         
  // passed result of asyncGetSession
  .then(asyncLogAccess)       
  // passed result of asyncGetUser
  .then(result => {           
    // non-asynchronous function
    console.log('complete');  
    //   (passed result of asyncLogAccess)
    return result;            
    //   (result passed to next .then())
  })
  .catch(err => {             
    // called on any reject
    console.log('error', err);
  });
```

## finally()

Trong ES2018 giới thiệu thêm `.finally()` gọi ở cuối cùng của promise, sẽ được gọi dù là *resolve* hay *reject*. Muốn dùng `.finally()` nhớ cài thêm polyfill

```js
function doSomething() {
  doSomething1()
  .then(doSomething2)
  .then(doSomething3)
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    // tidy-up here!
  });
}
```

## all()

Nếu muốn chạy cùng một lúc nhiều function sau khi *resolve*, dùng `Promise.all()`

```js
Promise.all([ async1, async2, async3 ])
  .then(values => {           
    // array of resolved values
    console.log(values);
    // (in same order as function array)
    return values;
  })
  .catch(err => {
    // called on any reject
    console.log('error', err);
  });
```

Nếu một trong 3 cái `async1`, `async2`, `async3` ở trên bị lỗi, nó sẽ quăng xuống `catch` ngay.

## race()

`Promise.race()` sẽ gọi resolve hoặc reject nếu thằng đầu tiên có kết quả (nhiều thằng chạy đua, thằng nào chạy tới đích trước tao lấy kết quả thằng đó)

```js
Promise.race([ async1, async2, async3 ])
  .then(value => {            
    // single value
    console.log(value);
    return value;
  })
  .catch(err => {             
    // called on any reject
    console.log('error', err);
  });
```

Promise giải quyết được callback hell, tuy nhiên nó cũng có vấn đề của riêng nó khi sử dụng toàn bộ asynchronous trong chuỗi Promise

# Async/Await

ES2017 giới thiệu `async` và `await`, cách viết nhìn **ngon** hơn của Promise, tránh được việc chuỗi các callback bằng `then()`

```js
function connect() {
  return new Promise((resolve, reject) => {
    asyncDBconnect('http://localhost:1234')
      .then(asyncGetSession)
      .then(asyncGetUser)
      .then(asyncLogAccess)
      .then(result => resolve(result))
      .catch(err => reject(err))
  });
}

// run connect (self-executing function)
(() => {
  connect();
    .then(result => console.log(result))
    .catch(err => console.log(err))
})();
```

Viết lại bằng `asyn/await`

- Thêm từ khóa `async` vào phía trước hàm có xử lý asynchronous
- Bên trong hàm `async`, đặt từ khóa `await` vào trước phương thức sử lý asynchronous trả về Promise-based

```js
async function connect() {
  try {
    const
      connection = await asyncDBconnect('http://localhost:1234'),
      session = await asyncGetSession(connection),
      user = await asyncGetUser(session),
      log = await asyncLogAccess(user);
    return log;
  }
  catch (e) {
    console.log('error', err);
    return null;
  }
}

// run connect (self-executing async function)
(async () => { await connect(); })();
```

Như đã nói `async/await` vẫn phụ thuộc nhiều vào Promise, code sạch hơn, debug dễ hơn, quản lý lỗi tốt hơn, nhưng cũng cần nắm vững về Promise thì mới hiểu được cách nó chạy. Đôi khi chúng ta lại quên rằng dùng `Promise.all()` sẽ hiệu quả hơn rất nhiều một chuỗi các câu `await`

`async/await` sẽ không chạy bên trong vòng lập

```js
async function process(array) {
  for (let i of array) {
    await doSomething(i);
  }
}

// Thậm chí cũng không chạy luôn

async function process(array) {
  array.forEach(async i => {
    await doSomething(i);
  });
}
```

Vòng lập sẽ chạy tuần tự và luôn **complete** trước khi các xử lý `asynchronous` bên trong

ES2018 giới thiệu thêm cách lập asynchronous

```js
async function process(array) {
  for await (let i of array) {
    doSomething(i);
  }
}
```

Tuy nhiên ta có thể đạt được cùng kết quả với hàm `map` của *array* và `Promise.all()`

```js
const
  todo = ['a', 'b', 'c'],
  alltodo = todo.map(async (v, i) => {
    console.log('iteration', i);
    await processSomething(v);
});

await Promise.all(alltodo);
```

[Link bài gốc sitepoint.com, tác giả Craig Buckler](https://www.sitepoint.com/flow-control-callbacks-promises-async-await/)