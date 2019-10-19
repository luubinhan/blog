---
slug: "/2019-10-18-7-cau-hoi-phong-van-lac-leo-voi-js"
date: "2019-10-18"
title: "7 Câu hỏi phỏng vấn lắc léo với Javascript"
desc: "Thử kiến thức javascript của bạn đã đủ cho cuộc phỏng vấn cam go sắp tới chưa"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

## 1

Kết quả của `typeof a` và `typeof b` trong đoạn code sau

```js
function foo() {
  let a = b = 0;
  a++;
  return a;
}

foo();
typeof a; // => ???
typeof b; // => ???
```

Đáp án

Lắc léo là ở chổ `let a = b = 0`. Câu này khai báo một biến cục bộ `a`, **đồng thời khai báo một biến toàn cục `b`**

Vì không có một khai báo nào của `b`, javascript tự hiểu b chính là `window.b = 0` 😂😂

Trường hợp này gọi là *vô tình* tạo ra một biến toàn cục, sự *vô tình* này còn có thể thấy ở

![](https://dmitripavlutin.com/static/41b7ea0d888dd9b298e41b9ff9bf4590/a8429/accitental-global-variables.webp)

Trình duyệt sẽ  chạy đoạn code trên như thế này

```js{2-4}
function foo() {
  let a;
  window.b = 0;
  a = window.b;
  a++;
  return a;
}
```

✅ Kết quả

```javascript
typeof a;        // => 'undefined'
typeof window.b; // => 'number'
```

## 2

Giá trị của `clothes[0]`

```js
const clothes = ['jacket', 't-shirt'];
clothes.length = 0;

clothes[0]; // => ???
```

Lắc léo ở giá trị `length` của một array là một giá trị đặc biệt, đặc biệt ở chổ nó tạo ra side-effect, nếu thay đổi giá trị này sẽ ảnh hưởng trực tiếp đến array đó. 😂😂

Trong trường hợp trên, với việc `clothes.length = 0` chúng ta đã xóa toàn bộ item trong array clothes

✅ Kết quả `clothes[0]` là `undefined`

## 3

Nội dung của array `numbers`

```js
const length = 4;
const numbers = [];
for (var i = 0; i < length; i++);{
  numbers.push(i + 1);
}

numbers; // => ???
```

Lắc léo là ở chổ `;`, nếu bạn ko để ý kỹ.

![The null statement effect](https://dmitripavlutin.com/static/edd9c7bd7fa83cc909f5b7694686bdfd/89df5/for-and-null-statement-pitfall-4.png)

Đoạn `for` chạy 4 lần mà không làm gì cả vì `;` 😂😂

Trình duyệt sẽ chạy theo kiểu

```javascript
const length = 4;
const numbers = [];
var i;
for (i = 0; i < length; i++) {
  // does nothing
}
{
  // a simple block
  numbers.push(i + 1);
}

numbers; // => [5]
```

✅ Kết quả `numbers` chỉ gồm 1 phần tử với giá trị bằng 5

_Câu chuyện có thật, tác giả bài viết này bị chấm rớt bởi câu phỏng vấn này, lý do được đưa ra rất hợp lý: Chúng tôi cần những người cẩn thận và chi tiết_

## 4

Giá trị trả về của `arrayFromValue()`

```javascript
function arrayFromValue(item) {
  return
    [items];
}

arrayFromValue(10); // => ???
```

Rất nhiều người sẽ không nghĩ rằng việc xuống dòng giữa `return` và `[items]` ảnh hưởng gì tới kết quả cuối cùng.

Javascript tự động thêm dấu `;` vào sau câu `return` 😂😂

```javascript{2}
function arrayFromValue(item) {
  return;  
  [items];
}

arrayFromValue(10); // => undefined
```

✅ Kết quả của `arrayFromValue(10)` là `undefined`

## 5

Kết quả của `console.log`

```javascript{4}
let i;
for (i = 0; i < 3; i++) {
  const log = () => {
    console.log(i);  }
  setTimeout(log, 100);
}
```

Nếu câu trả lời của bạn là 0, 1, 2 thì xin chúc mừng, bạn đã sai. 😂😂

Có 2 quá trình xảy ra với đoạn code trên, lắc léo là ở chổ `setTimeout`

**Quá trình 1**

1. `for()` chạy 3 lần. Mỗi lần chạy nó tạo ra một hàm `log()`, nhận giá trị `i`, sau đó `setTimeout()` đưa hàm nào vào queue để chạy sau (xem thêm về event loop để hiểu cái queue này)
2. Khi vòng lặp `for()` kết thúc, giá trị `i` đang là 3

**Quá trình 2**

Sau 100ms, nó thực hiện bước 2, 3 hàm `log()` đã đưa vào queue sẽ lần lượt được gọi, lúc này này `i` đang là 3

✅ Kết quả log ra là 3, 3, 3

## 6

Kết quả của so sánh

```js
0.1 + 0.2 === 0.3 // => ???
```

Trước tiên, xem giá trị của phép cộng `0.1 + 0.2`

```js
0.1 + 0.2; // => 0.30000000000000004
```

😂😂Javascript không cho kết quả `0.3` ! 😂😂

Cái sự tình này xảy ra là giá trị **thập phân** khi chuyển về nhị phân không thực sự chính xác

✅ Nên `0.1 + 0.2 === 0.3` sẽ là `false`

## 7

Chuyện gì xảy ra khi truy cập `myVar` và `myConst` trước khi khai báo

```js{1,2}
myVar;   // => ???
myConst; // => ???

var myVar = 'value';
const myConst = 3.14;
```
![](https://dmitripavlutin.com/static/670c31f21f45e9b8a453e726293f4de0/a8429/temporal-dead-zone-and-hoisting-javascript.webp)

✅ Hoisting và temporal dead zone là 2 khái niệm quan trọng ảnh hưởng tới vòng đời của một biến trong javascript

Truy cập vào `myVar` trước khi khai báo sẽ trả về `undefined`, nếu khai báo bằng `var`

Tuy nhiên, nếu truy cập `myConst` trước khi khai báo sẽ trả về `ReferenceError`, nếu khai báo bằng `const`, nó sẽ nằm trong khu vực **temporal dead zone**, không ai giải quyết cho đến khi có người nhận trách nhiệm.

## Kết luận

Bạn sẽ thắc mắc, có những câu hỏi chả bao giờ sử dụng trong quá trình làm việc, mình cũng có cảm giác tương tự như vậy khi được hỏi những câu lắc léo thế này. Nhưng thực tế vẫn bị hỏi khi phỏng vấn.

Các bạn có nghĩ những câu hỏi *lắc léo* như vậy có cần thiết trong lúc phỏng vấn không? Viết bình luận ở dưới nhé.

[7 Simple but Tricky JavaScript Interview Questions](https://dmitripavlutin.com/simple-but-tricky-javascript-interview-questions/)
