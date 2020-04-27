---
slug: "/2019-12-23-9-cau-hoi-ve-promise"
date: "2019-12-23"
title: "9 câu hỏi lắc léo về Promise"
desc: "Vài câu hỏi Promise, ôn tập kiến thức cho bạn cần đi phỏng vấn"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react"]
---

## 1

```js
var p = new Promise((resolve, reject) => {
  reject(Error('The Fails!'))
})
p.catch(error => console.log(error.message))
p.catch(error => console.log(error.message))
```

Kết quả output

1. Kết quả lỗi log ra 1 lần
2. Kết quả lỗi log ra 2 lần
3. UnhandledPromiseRejectionWarning

`.catch` sẽ làm việc giống như `.addEventListener(event, callback)` hay Event Emitter `.on(event, callback)`. Có thể add thêm bao nhiêu tùy thích, nó sẽ chạy tất cả các callback đã đăng ký

✅ _Đáp án_

2. Kết quả lỗi log ra 2 lần

## 2

```js
var p = new Promise((resolve, reject) => {
  return Promise.reject(Error('The Fails!'))
})
p.catch(error => console.log(error.message))
p.catch(error => console.log(error.message))
```

1. Kết quả lỗi log ra 1 lần
2. Kết quả lỗi log ra 2 lần
3. UnhandledPromiseRejectionWarning

![](https://danlevy.net/static/question-2-308cbd4ad650e288821fd681a0e745b4-e8b1e.png)

Khi khởi tạo một Promise, chúng ta phải gọi một trong hai callback `resolve()` hoặc `reject()`. Nó ko `return` giá trị. Không thể dùng `Promise.reject()` như ở trên.

✅ _Đáp án_

3. UnhandledPromiseRejectionWarning

## 3

```js
var p = new Promise((resolve, reject) => {
    reject(Error('The Fails!'))
  })
  .catch(error => console.log(error))
  .then(error => console.log(error))
```

Kết quả

1. In ra lỗi và `undefined`
2. in ra lỗi 2 lần
3. UnhandledPromiseRejectionWarning
4. undefined

![annotated-code/question-3.png](https://danlevy.net/static/question-3-a5d5c8df7eb262f3bccc7a5319f53ec2-e8b1e.png)

Gợi ý thứ nhất `console.log()` luôn trả về `undefined`. Thứ 2, khi đặt `.catch` trước `.then` như thế, nó sẽ không nhận được giá trị từ hàm trước đó, mọi thứ đã dừng lại ở `catch`.

✅ _Đáp án_

1. In ra lỗi và `undefined`

## 4

```js
var p = new Promise((resolve, reject) => {
    reject(Error('The Fails!'))
  })
  .catch(error => console.log(error.message))
  .catch(error => console.log(error.message))
```

1. In ra lỗi một lần
2. In ra lỗi 2 lần
3. UnhandledPromiseRejectionWarning

Giải thích như trên, câu `catch` thứ 2 không được gọi đến, điều đặc biệt là bạn có thể đặt `.then` ở phía sau `catch` nhưng không thể đặt `catch` sau `catch`.

✅ _Đáp án_

1. In ra lỗi một lần

## 5

```js
new Promise((resolve, reject) => {
    resolve('Success!')
  })
  .then(() => {
    throw Error('Oh noes!')
  })
  .catch(error => {
    return "actually, that worked"
  })
  .catch(error => console.log(error.message))
```

1. In lỗi 1 lần
2. In lỗi 2 lần
3. UnhandledPromiseRejectionWarning
4. Ko in gì cả


`catch` có thể được sử dụng để bỏ qua hoặc ghi đè lên giá trị lỗi bằng cách cho `return` một giá trị. Trò này **chỉ làm được khi trước đó `then` có trả về giá trị**.

✅ _Đáp án_

4. Ko in gì cả

## 6

```js
Promise.resolve('Success!')
  .then(data => {
    return data.toUpperCase()
  })
  .then(data => {
    console.log(data)
  })
```

1. In ra "Success!" và "SUCCESS!"
2. In ra "Success!"
3. In ra "SUCCESS!"
4. Không in ra gì cả

`.then` sẽ truyền dữ liệu theo thứ tự đã viết, khi `return` giá trị, hàm `then` tiếp theo sẽ nhận giá trị `return` này.

✅ _Đáp án_

3. In ra "SUCCESS!"

## 7

```js
Promise.resolve('Success!')
  .then(data => {
    return data.toUpperCase()
  })
  .then(data => {
    console.log(data)
    return data
  })
  .then(console.log)

```

1. In ra "SUCCESS!"
2. In ra "Success!"
3. In ra "SUCCESS!" và "SUCCESS!"
4. Không in ra gì cả

Giải thích tương tự như trên.

✅ _Đáp án_

3. In ra "SUCCESS!" và "SUCCESS!"

## 8

```js
Promise.resolve('Success!')
  .then(data => {
    data.toUpperCase()
  })
  .then(data => {
    console.log(data)
  })
```

1. In ra "SUCCESS!"
2. In ra "Success!"
3. In ra "SUCCESS!" và "SUCCESS!"
4. In ra "undefined"

Nếu muốn truyền giá trị xuống `.then` bên dưới, trước đó phải `return`.

✅ _Đáp án_

4. In ra "undefined"

## 9

```js
Promise.resolve('Success!')
  .then(() => {
    throw Error('Oh noes!')
  })
  .catch(error => {
    return 'actually, that worked'
  })
  .then(data => {
    throw Error('The fails!')
  })
  .catch(error => console.log(error.message))
```

1. In ra "Oh noes!" và "The fails!"
2. In ra "Oh noes!"
3. In ra "The fails!"
4. In ra  "actually, that worked"
5. Không in ra gì cả


Tổng hợp những kiến thức ở trên, hy vọng bạn trả lời đúng câu này.  Ở `then` đầu tiên, chúng ta throw một error, `catch` tiếp theo chúng ta `return` coi như bỏ qua error này, `then` thứ 2, nhận data nhưng chúng ta ko làm gì với nó cả, mà throw một error khác, catch cuối cùng sẽ là giá trị error vừa throw ở trên.

✅ _Đáp án_

3. In ra "The fails!"

[https://danlevy.net/javascript-promises-quiz/](https://danlevy.net/javascript-promises-quiz/)
