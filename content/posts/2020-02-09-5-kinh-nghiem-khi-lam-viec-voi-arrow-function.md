---
slug: "/2020-02-09-5-kinh-nghiem-khi-lam-viec-voi-arrow-function"
date: "2020-02-09"
title: "5 kinh nghiệm khi viết arrow function"
desc: "Sử dụng arrow function đã quá phổ biến, ai cũng biết nó là gì, không cần một bài giới thiệu vài dòng nữa, bài viết này chia sẻ 5 kinh nghiệm để bạn làm việc với arrow function thêm mượt mà"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["thu-thuat", "javascript"]
---


## Gán tên cho arrow function

arrow function trong javascript là một `anonymous` (hàm không có tên), nếu gọi vào `name` của nó chúng ta sẽ nhận được một chuỗi rỗng

```js
( number => number + 1 ).name; // => ''
```

Trong lúc debug hoặc phân tích call stack, hàm dạng `anonymous` rất khó chịu vì không biết đang chạy *cái gì*

![Đó mà biết được đang chạy cái gì nếu chỉ hiện thị anonymous](https://dmitripavlutin.com/static/da011c996cd4544e2e5131e5862c85b6/f8b1b/anonymous-arrow-functions-3.webp)

Bên cột call stack có 2 function  `anonymous`, không có bất kỳ thông tin nào được trích xuất ra cho chúng ta ở đây.

Nhưng nếu chúng ta khai báo một biến nắm giữ arrow function, Javascript lúc này lại *ngầm* hiểu nó là tên cho function đó (các đặc tính khác của arrow function không đổi)

```js
const increaseNumber = number => number + 1;

increaseNumber.name; // => 'increaseNumber'
```

Lúc debug, nó đã hiện nguyên hình

![Anonymous arrow functions call stack](https://dmitripavlutin.com/static/7cf0de61d6b0cd2fb01e9cfb145e8708/c04be/named-arrow-functions-2.png "Anonymous arrow functions call stack")

## Inline khi nào có thể

Thay vì phải viết một cách dài dòng

```js
const array = [1, 2, 3];

array.map((number) => { 
  return number * 2;
});
```

Chúng ta có thể bỏ hẳn `{}` và `return`, ở dạng một expression

```js
const array = [1, 2, 3];

array.map(number => number * 2);
```

## Sử dụng với phép so sánh

Các phép so sánh  `<=`, `>=` nhiều khi dễ gây nhầm lẫn khi đứng chung với `=>`

```js
const negativeToZero = number => number <= 0 ? 0 : number;
```

Để không *đánh đố* người đọc, bọc nó lại trong dấu ngoặc đơn `()`

```js
const negativeToZero = number => (number <= 0 ? 0 : number);

//hoặc một cách tường minh
const negativeToZero = number => {
  return number <= 0 ? 0 : number;
};
```

## Sử dụng với object literal

Nếu viết object literal như bên dưới chắc chắn bạn bị báo lỗi

```js
const array = [1, 2, 3];

// throws SyntaxError!
array.map(number => { 'number': number });
```

Đừng quên thêm ngoặc đơn cho nó

```js
const array = [1, 2, 3];

// Works!
array.map(number => ({ 'number': number }));

// có nhiều property
array.map(number => ({
  'number': number
  'propA': 'value A',
  'propB': 'value B'
}));
```

## Hạn chế lồng nhiều arrow function

Thí dụ có một button, sau khi click chúng ta request lên server, sau khi nhận được giá trị, log xuống trình duyệt

```js
myButton.addEventListener('click', () => {
  fetch('/items.json')
    .then(response => response.json());
    .then(json => {
      json.forEach(item => {
        console.log(item.name);
      });
    });
});
```

Viết vậy, *thiên hạ* chê khó đọc. Cân nhắc cách viết sau

```js
const readItemsJson = json => {
  json.forEach(item => console.log(item.name));
};

const handleButtonClick = () => {
  fetch('/items.json')
    .then(response => response.json());
    .then(readItemsJson);
};

myButton.addEventListener('click', handleButtonClick);
```

Muốn *ngon* hơn là dùng `async/await`

```js
const handleButtonClick = async () => {
  const response = await fetch('/items.json');
  const json = await response.json();
  json.forEach(item => console.log(item.name));
};

myButton.addEventListener('click', handleButtonClick);
```


[5 Best Practices to Write Quality Arrow Functions](https://dmitripavlutin.com/javascript-arrow-functions-best-practices/)

