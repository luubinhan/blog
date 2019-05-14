---
slug: "/2019-04-18-huong-dan-async-await-loi-tren-vong-lap-array"
date: "2019-04-18"
title: "Vấn đề khi dùng forEach với async/await"
desc: "Trường hợp khi chúng ta sử dụng async/await bên trong vòng lặp array không cho kết quả đúng như mong muốn và cách giải quyết."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

`async`/`await` không hoạt động bên trong vòng lặp `Array.prototype.forEach`, cùng xem tại sao nhé

```js
const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3'
];

async function getTodos() {
  await urls.forEach(async (url, idx) => { 
    const todo = await fetch(url);
    console.log(`Received Todo ${idx+1}:`, todo);
  });
  
  console.log('Finished!');
}
getTodos();
```

Kết quả

```json
Finished!
Received Todo 2, Response: { ··· }
Received Todo 1, Response: { ··· }
Received Todo 3, Response: { ··· }
```

- Nó vẫn chạy nhưng không đúng. Đoạn *Finished!* sẽ được log ra trước, mặc dù chúng ta đã đặt `await` trước `urls.forEach`. Chúng ta ko buộc nó `await` cả vòng lặp `forEach` được

- Dù chúng ta có `await` bên trong, nó cũng ko dừng lại đợi cho tới khi xong mới chạy tiếp, vòng lặp sẽ vẫn chạy bình thường như ko hề có `await` 

> Tóm lại, ko dùng `forEach` chung với `async`/`await`

Để giải quyết issue đợi toàn bộ vòng lặp thực hiện xong mới chạy tiếp, dùng `Promise.all`, vì thực chất `await` cũng là `promise` chạy bên dưới, chúng ta có thể sử dụng `Promise.all` để `await` toàn bộ request

Sửa lại hàm `getTodos` ở trên 

```js
async function getTodos() {
  const promises = urls.map(async (url, idx) => 
    console.log(`Received Todo ${idx+1}:`, await fetch(url))
  );

  await Promise.all(promises);

  console.log('Finished!');
}
```

Kết quả

```json
Received Todo 1, Response: { ··· }
Received Todo 2, Response: { ··· }
Received Todo 3, Response: { ··· }
Finished!
```

Một điểm cần lưu ý là `Promise.all` sẽ chạy tất cả đồng thời. Nó sẽ ko đợi thằng này xong tới thằng kia, một cách tuần tự, trong hầu hết các trường hợp thì ko vấn đề, thực ra lại tối ưu hiệu năng. Nhưng khi chúng ta cần chạy theo một thứ tự nhất định, ko thể dùng `Promise.all`. Đoạn code trên là đúng là `Received Todo 1,2,3` theo đúng tuần tự, nhưng nó chỉ đúng trường hợp này, không phải đúng trong mọi trường hợp với `Promise.all` và `await`

Để giải quyết triệt để, chúng ta dùng `for...of`, nó sẽ đợi thằng `await` trước đó chạy xong trước khi chạy tiếp

```js
async function getTodos() {
  for (const [idx, url] of urls.entries()) {
    const todo = await fetch(url);
    console.log(`Received Todo ${idx+1}:`, todo);
  }

  console.log('Finished!');
}
```

Nếu chúng ta ko cần tới index, viết gọn hơn như thế này

```js
for (const url of urls) { ··· }
```

Kết quả

```json
Received Todo 1, Response: { ··· }
Received Todo 2, Response: { ··· }
Received Todo 3, Response: { ··· }
Finished!
```


Một điều phải trả giá khi sử dụng `for...of` là nó rất chậm, hiệu năng thấp nhất trong các vòng lặp của array.

Bạn có thể sử dụng vòng lặp `for` căn bản nhất để vừa đạt kết quả vừa đạt hiệu năng tốt nhất.



<a target="_blank" rel="noopener noreferrer" href="https://medium.com/dailyjs/the-pitfalls-of-async-await-in-array-loops-cf9cf713bfeb">The Pitfalls of Async/Await in Array Loops
</a>