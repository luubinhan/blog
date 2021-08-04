---
slug: "/2021-08-04-chay-cac-function-async-voi-vong-lap-nhu-the-nao"
date: "2021-08-04"
title: "Lưu ý khi chạy async function với vòng lặp"
desc: ""
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

Để chạy một chuỗi các async function theo thứ tự (tuần tự như chạy tiếp sức) cố định, nếu không để ý chúng ta sẽ có những kết quả không như mong đợi.

> Luôn dùng `for...of`

Không sử dụng `.forEach` nếu bên trong callback chứa các hàm cần `await`. **Luôn luôn** dùng `for..of` nếu muốn nó đúng thứ tự

```js
async function asyncProcessing(ms) {
    return new Promise(resolve => setTimeout(function() {
        console.log('wait:', ms);
        resolve(ms);
    }, ms));
}

async function forOf() {
    const timeouts = [10, 600, 200, 775, 125, 990];
	let result = [];
    
    for (const timeout of timeouts) {
        result.push(await asyncProcessing(timeout))
    }
    
    return result;
}
```

```bash
// Kết quả
wait: 10
wait: 600
wait: 200
wait: 775
wait: 125
wait: 990
```

Nếu thay vòng lặp `for...of` bằng

```js
timeouts.forEach(async timeout => {
    const a = await asyncProcessing(timeout);
    result.push(a);
})
```

```bash
// kết quả nhận được
wait: 10
wait: 125
wait: 200
wait: 600
wait: 775
wait: 990
```

> Hoặc dùng `Array.reduce`

Một lựa chọn khác nếu không thích dùng `for...of`, kết quả sẽ giống i chang

```js
const result = await timeouts.reduce(async (sum, timeout) => {
    return [
        ...(await sum),
        await asyncProcessing(timeout)
    ]
}, Promise.resolve([]))
```

```bash
// Kết quả
wait: 10
wait: 600
wait: 200
wait: 775
wait: 125
wait: 990
```

Vậy nếu có nhu cầu chạy các hàm một cách bất đồng bộ, như phất cờ là cho toàn bộ chạy một lúc giống thi chạy diệt dã? Chúng ta có một lựa chọn rất hiển nhiên `Promise.all`

```js
const promises = timeouts.map(async timeout => await asyncProcessing(timeout));

await Promise.all(promises);
```

Kết quả

```bash

wait: 10
wait: 125
wait: 200
wait: 600
wait: 775
wait: 990
```

Vuilaptrinh.com