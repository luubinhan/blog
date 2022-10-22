---
slug: "/2019-03-07-huong-dan-lua-chon-phuong-thuc-lap-trong-array"
date: "2019-03-07"
title: "for vs forEach vs for/in vs for/of trong javascript"
desc: "Trong javascript có rất nhiều cách để loop qua một array, chúng ta cùng bàn qua 4 cách chính hay sử dụng nhất"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---


- for (let i = 0; i < arr.length; ++i)
- arr.forEach((v, i) => { /* ….. */})
- for (let i in arr)
- for (const v of arr)

2 phương thức là `for` và `for/in` cho phép chúng ta truy cập đến giá trị index trong array, ko phải giá trị của element trong array

```js
const arr = ['a', 'b', 'c'];
// sau đó chúng ta dùng truy cập element bằng giá trị index
for (let i = 0; i < arr.length; ++i) {
  console.log(arr[i]);
}

for (let i in arr) {
  console.log(arr[i]);
}
```

Trong khi đó hai phương thức `for/of` và `forEach` sẽ truy xuất đến phần tử trong element, cũng có thể truy xuất vào index, nếu thích.

```js
arr.forEach((v, i) => console.log(v));
for (const v of arr) {
  console.log(v);
}
```

Có thể bạn chưa biết, array trong javascript cũng là một dạng *đặc biệt* của object, chúng ta có thể gán một property cho nó

```js
const arr = ['a', 'b', 'c'];
console.log(typeof arr); // 'object'

arr.test = 'bad';
console.log(arr.test); // bad

arr[1] === arr['1']; // true, 
```

Nếu loop qua bằng 4 phương thức trên, chỉ duy nhất thằng `for/in` sẽ chạy qua

```js
const arr = ['a', 'b', 'c'];
arr.test = 'bad';

// "a, b, c, bad"
for (let i in arr) {
  console.log(arr[i]);
}
```

Đó là lý do tại sao chúng ta ko nên dùng `for/in` để loop qua array

Đối với một element **trống** như thế này

```js
const arr = ['a',,'b']
console.log(arr.length); // 3
```

Không chỉ vậy thôi đâu, nếu loop qua mảng `['a',,'b']` nó cũng sẽ khác với `['a', undefined, 'c']. 2 thằng `for/in` và `for/each` sẽ bỏ qua phần tử trống như vậy, nhưng `for` và `for/of` vẫn tính

```js
const arr = ['a',, 'c']
// Prints "a, undefined, c"
for (let i = 0; i < arr.length; ++i) {
  console.log(arr[i]);
}

// Prints "a, c"
arr.forEach(v => console.log(v));

// Prints "a, c"
for (let i in arr) {
  console.log(arr[i]);
}

// Prints "a, undefined, c"
for (const v of arr) {
  console.log(v);
}
```

Tuy nhiên, nếu là `['a', undefined, 'c']`, cả 4 phương thức trên đề print hết giá trị trong array.

Một cách để chèn phần tử trống vào array

```js
const arr = ['a', 'b', 'c'];
arr[5] = 'e';
```

Tuy nhiên là trường hợp `[a, , c]` này sẽ rất rất ít khi xảy ra, vì căn bản là file JSON như thế là không hợp lệ. Chúng ta cũng không cần lo lắng lắm

```js
> JSON.parse('{"arr":["a","b","c"]}')
{ arr: [ 'a', 'b', 'c' ] }
> JSON.parse('{"arr":["a",null,"c"]}')
{ arr: [ 'a', null, 'c' ] }
> JSON.parse('{"arr":["a",,"c"]}')
SyntaxError: Unexpected token , in JSON at position 12
```

Với từ khóa `this`, `for`, `for/in`, `for/of` sẽ dùng chung scope với thằng cha, trong khi `forEach` thì nó là scope của nó.

`forEach` cũng xảy ra nhiều tình huống ko đúng khi dùng với `async/await` hoặc `generator`. Code bên dưới là không chạy, không dùng await cho callback của `forEach` cũng như `yield`

```js
async function run() {
  const arr = ['a', 'b', 'c'];
  arr.forEach(el => {
    // SyntaxError
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(el);
  });
}

function* run() {
  const arr = ['a', 'b', 'c'];
  arr.forEach(el => {
    // SyntaxError
    yield new Promise(resolve => setTimeout(resolve, 1000));
    console.log(el);
  });
}
```

Dùng với `for/of` thì ok

```js
async function asyncFn() {
  const arr = ['a', 'b', 'c'];
  for (const el of arr) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(el);
  }
}

function* generatorFn() {
  const arr = ['a', 'b', 'c'];
  for (const el of arr) {
    yield new Promise(resolve => setTimeout(resolve, 1000));
    console.log(el);
  }
}
```

Túm lại, `for/of` có thể dùng gần như mọi lúc. Mặc dù performance ko bằng `for`, nhưng dễ xài hơn, cũng ko dính nhiều trường hợp đặc biệt như `for/in` và `forEach`. Nếu ko cần dùng đến giá trị index, thì `for/of` sẽ được dùng. Còn nếu muốn truy xuất tới giá trị index với `for/of`

```js
for (const [i, v] of arr.entries()) {
  console.log(i, v); // Prints "0 a", "1 b", "2 c"
}
```



<a target="_blank" rel="noopener noreferrer" href="http://thecodebarbarian.com/for-vs-for-each-vs-for-in-vs-for-of-in-javascript.html">For vs forEach() vs for/in vs for/of in JavaScript</a>