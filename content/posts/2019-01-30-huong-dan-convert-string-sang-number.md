---
slug: "/2019-01-30-huong-dan-convert-string-sang-number"
date: "2019-01-30"
title: "Convert giá trị String qua Number trong Javascript"
desc: "Javascript rất lạ kỳ, convert giá trị String qua number cũng lắm nẻo dăm ba đường,nào NaN, nào radix. Bài này chúng ta cùng tìm hiểu parseFloat(), Number(), Number.isNaN(), isNaN()"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

Javascript rất lạ kỳ, convert giá trị String qua number cũng lắm nẻo dăm ba đường,nào NaN, nào radix. Bài này chúng ta cùng tìm hiểu parseFloat(), Number(), Number.isNaN(), isNaN()

> Một cách ngắn gọn, chúng ta nên dùng `Number(x)` để convert giá trị sang dạng number, hoặc `parseFloat(x)` nếu muốn chuẩn mực

Để kiểm tra kết quả có convert được hay không, luôn dùng `Number.isNaN()`, **không nên** dùng phương thức global `isNaN()`.

```js
typeof parseFloat('42'); // 'number'
Number.isNaN(Number('42')); // false

typeof parseFloat('fail'); // 'number'
Number.isNaN(Number('fail')); // true
```

Sử dụng `Number(x)` sẽ có vài trường hợp đặc biệt, nó có thể là đúng cũng có thể là sai, tùy theo cách hiểu của chúng ta.

```js
Number(''); // 0
```

Rất nhiều dev sử dụng `+x` để convert giá trị *x* sang number. Theo như khai báo của javascript, `+x` sẽ tương tự như `Number(x)`

```js
+'42 fail'; // NaN
+({ valueOf: () => '42'  }); // 42
+({ toString: () => '42' }); // 42
+(null); // 0
+('     '); // 0
```

## Cái sai của `Number(x)`

`Number(x)` và `parseFloat(x)` xử trí các tình huống đặc biệt rất khác nhau, `parseFloat()` *có vẻ* dễ giải hơn khi chấp nhận một số kiểu String

```js
Number('42 fail'); // NaN
parseFloat('42 fail') // 42
parseInt('42 fail') // 42

Number('    10') // 10
parseFloat('    10') // 10
parseInt('    10') // 10
```

Đừng thấy vậy mà kết luận rằng `Number(x)` chuẩn mực và an toàn hơn. Thực ra, `Number(x)` hay lấn cấn khi string chứa khoảng trắng, `null`,  và một số tính huống khác. Nó convert khá nhiều trường hợp sang 0.

```js
Number(null) // 0
Number('') // 0
Number('        ') // 0
Number(false) // 0
Number({ toString: () => '' }); // 0
Number({ valueOf: () => '  ' }); // 0
```

Nguyên tắc làm việc của `parseFloat()` đơn giản và dễ đoán hơn. Cắt hết khoảng trắng, rồi kiểm tra với một regular expression được quy ước để lấy giá trị số dài nhất trong chuỗi.

```js
// parseInt hoạt động tương tự
parseFloat(null); // NaN
parseFloat(''); // NaN
parseFloat('    '); // NaN
parseFloat(false); // NaN
parseFloat({ toString: () => '' }); // NaN
parseFloat({ valueOf: () => '  ' }); // NaN
```

## Number.isNaN() và isNaN()

Javascript sẽ ko quăng lỗi nếu nó ko convert được giá trị sang number, nó trả về một giá trị đặc biệt gọi là `NaN` (not a number). Và vẫn chưa đủ độ huyền bí, nếu kiểm tra `typeof` của một giá trị là `NaN` chúng ta nhận được 'number`. Nực cười quá mà.

```js
Number('fail'); // NaN
typeof Number('fail') // 'number'
```

Lý do cho sự có mặt của `Number.isNaN()` và `isNaN()` là vì `==` và `===` không chạy đúng trên giá trị `NaN`

```js
Number('fail') == Number('fail'); // false
Number('fail') === Number('fail'); // false
Number('fail') == NaN; // false
NaN === NaN; // false
```

`Number.isNaN()` là một hàm mới được bổ sung trong ES6, tuy nhiên ko nhận được nhiều sự quan tâm. Chúng ta nên tập sử dụng `Number.isNaN()` thay cho `isNaN()`

```js
isNaN(Number('fail')) // true
Number.isNaN(Number('fail')); // true
```

Một cách dễ hình dung sự khác nhau, nếu `Number.isNaN()` là so sánh `===` thì `isNaN()` là so sánh `==`

Thằng `isNaN()` nó sẽ convert giá trị qua number trước, rồi mới đem đi so sánh kết quả.

```js
isNaN(‘fail’) // true
isNaN({}) // true

Number.isNaN(‘fail’) // false
Number.isNaN({}) // false
```

Nói cách khác, nếu giá trị x không phải kiểu number, thì `Number.isNaN(x)` sẽ là false

Cái polyfill cho `Number.isNaN()` được hiện thực đơn giản như sau

```js
Number.isNaN = function(x) {
	return typeof x === 'number' && isNaN(x);
}
```


<a target="_blank" rel="noopener noreferrer" href="http://thecodebarbarian.com/convert-a-string-to-a-number-in-javascript.html
">Convert a String to a Number in JavaScript</a>