---
slug: "/2018-11-18-mot-so-van-de-can-quan-tam-de-bao-mat-web"
date: "2018-11-19"
title: "Xử lý lỗi nếu có xảy ra trong javascript"
desc: "Lỗi nếu có xảy ra, phải được xử lý hết tránh để chết nguyên ứng dụng. Điểm lại một vài cách xử lý lỗi trong javascript"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

## Javascript error

`throw new Error('khi có lỗi')` sẽ tạo ra một object Error và dừng chạy.

Error object có 2 property có sẵn, 1 là `message`

```js
const myError = new Error('Lỗi rồi nè');
console.log(myError.message);
// => Lỗi rồi nè
```

...cái thứ 2, rất quan trọng, là `stack`, nó sẽ cho ta history các phương thức và file đã gọi qua.

```js
Error: please improve your code
 at Object.<anonymous> (/Users/gisderdube/Documents/_projects/hacking.nosync/error-handling/src/general.js:1:79)
 at Module._compile (internal/modules/cjs/loader.js:689:30)
 at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)
 at Module.load (internal/modules/cjs/loader.js:599:32)
 at tryModuleLoad (internal/modules/cjs/loader.js:538:12)
 at Function.Module._load (internal/modules/cjs/loader.js:530:3)
 at Function.Module.runMain (internal/modules/cjs/loader.js:742:12)
 at startup (internal/bootstrap/node.js:266:19)
 at bootstrapNodeJSCore (internal/bootstrap/node.js:596:3)
```

Nếu chúng ta không tự xử lý các trường hợp có lỗi, nó sẽ chết ngay chổ đó, để tránh tình huống này, tìm hiểu một số cách bắt lỗi

## try...catch

```js
const a = 4;

try {
  // b chưa được định nghĩa, nó sẽ báo lỗi
  console.log(b);
} catch (err) {
  console.error(err)
}

// vẫn chạy đến đây
console.log(a);
```

Nếu không để `console.log(b)` bên trong `try..catch`, nó sẽ không chạy đến đoạn `console.log(a)`

## ...finally

Đôi khi chúng ta cần chạy một đoạn code dù nó có bị lỗi hay không bị lỗi, nó cũng sẽ giống ở trên, nhưng viết nó sẽ rõ ràng hơn

```js
const a = 4;

try {
  // b chưa được định nghĩa, nó sẽ báo lỗi
  console.log(b);
} catch (err) {
  console.error(err)
} finally {
  console.log(a);
}
```

## Các hàm async

Hiện tại chúng ta có 3 cách để làm việc với các hàm async, cách xử lý lỗi nếu có trên 3 cách này: callback, Promise, async/await

### callback

```js
myAsyncFunc(someInput, (err, result) => {
    if(err) return console.error(err);
    console.log(result);
})
```

### Promise

```js
Promise.resolve(1)
  .then(res => {
    console.log(res) // 1
    throw new Error('something went wrong');
    return Promise.resolve(2);
  })
  .then(res => {
    // sẽ không chạy
    console.log(res);
  })
  .catch(err => {
    console.error(err);
    return Promise.resolve(3)
  })
  .then(res => {
    // (A)
    console.log(res) // 3
  })
  .catch(err => {
    // trong trường hợp block (A) xảy ra lỗi
    console.error(err)
  })
```

### async/await

```js
async function() {
  try {
    await someFuncThatThrowsAnError()
  } catch (err) {
    console.error(err) 
  }
  // vẫn chạy
  console.log('Easy!')
}
```

## Hiển thị lỗi ở phía giao diện người dùng

Ví dụ chúng ta làm Single Page App bằng React, chúng ta muốn hiển thị lỗi trên giao diện như thế này

![Xử lý lỗi nếu có xảy ra trong javascript](https://cdn-images-1.medium.com/max/800/1*xSpVDWEQ4wMHQ5kObFwf8w.jpeg)

Có thể dùng React Portal để chèn vào hoặc dùng một component nhận vào Error Object và render ra trên giao diện

```jsx
<div>
  <GobalError err={errorObj} reset={handleResetError} />
</div>
```

Nếu lỗi hiển thị dạng inline phía dưới input

![Xử lý lỗi nếu có xảy ra trong javascript](https://cdn-images-1.medium.com/max/800/1*tpmtTom2eSmH7AnrAI55QQ.jpeg)

```jsx
<div>
  <input
      type="text"
  />
  <button onClick={this._callBackend}>Delete your city</button>
  <InlineError error={this.state.error} />
</div>
```


<a href="https://levelup.gitconnected.com/the-definite-guide-to-handling-errors-gracefully-in-javascript-58424d9c60e6" target="_blank" rel="noopener noreferrer">https://levelup.gitconnected.com/the-definite-guide-to-handling-errors-gracefully-in-javascript-58424d9c60e6</a>
