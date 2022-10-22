---
slug: "/2019-12-24-4-ung-dung-cua-array-from"
date: "2019-12-24"
title: "4 ứng dụng của Array.from"
desc: "Vài ứng dụng nhỏ của hàm Array.from"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

`Array.from` được dùng để convert giá trị về kiểu `Array`, cú pháp như sau

```js
Array.from(arrayLikeOrIterable [, mapFunction [, thisArg]])
```

Có 3 tham số có thể truyền vào, 2 thằng sau không bắt buộc

- `arrayLikeOrIterable` giá trị muốn chuyển
- `mapFunction(item, index)` function sẽ chạy qua toàn bộ các phần tử
- `thisArg` được sử dụng như giá trị `this` bên trong `mapFunction`

```js
const someNumbers = { "0": 10, "1": 15, length: 2 }
Array.from(someNumbers, value => value * 2)
// => [20, 30]
```

## Ứng dụng 1: khởi tạo một dãy số

Khởi tạo dãy số từ 0 đến giá trị truyền vào

```js
function range(end) {
    return Array.from({ length: end }, (_, index) => index)
}

range(4)
// => [0,1,2,3]
```

## Ứng dụng 2: Tạo một mảng gồm n phần tử giống nhau

Input: số lượng phần tử, giá trị.
Output: toàn một mảng n phần tử giống với giá trị đã cho.

```js
const length = 3
const init = 0
const result = Array.from({ length }, () => init )

// => [0,0,0]
```

Thật ra chúng ta cũng có thể viết bằng `Array.fill()` dễ nhìn hơn

```js
const length = 3;
const init   = 0;
const result = Array(length).fill(init);
```

## Ứng dụng 3: sao chép một array

Nếu chỉ đơn giản là sao chép array thì ta có thể viết

```js
const cloneArray = [...array1, array2]
```

Nhưng nếu `array1` lại chứa một array bên trong đó thì sao? Hàm đệ quy để chép *tuốt*

```js
function recursiveClone(val) {
  return Array.isArray(val) ? Array.from(val, recursiveClone) : val;
}

const numbers = [[0, 1, 2], ['one', 'two', 'three']];
const numbersClone = recursiveClone(numbers);

numbersClone; // => [[0, 1, 2], ['one', 'two', 'three']]
numbers[0] === numbersClone[0] // => false
```

## Ứng dụng 4: Tạo một array không trùng lặp

Thật ra thì bản thân `Array.from` không làm được, chúng ta dùng `new Set()` rồi mới sau đó chuyển ngược lại về array

```js
function unique(arr) {
    return Array.from(new Set(arr))
}
unique([1, 1, 2, 3, 3]); // => [1, 2, 3]
```

