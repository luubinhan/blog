---
slug: "/2017-10-19-sort-trong-javascript"
date: "2017-10-19"
title: "Sort trong javascript"
desc: "Nếu nghĩ đã hiểu rõ hàm Array.sort() trong javascript, hãy nghĩ lại!"
category: "javascript"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Vậy muốn `sort` mảng số làm sao ?](#vậy-muốn-sort-mảng-số-làm-sao-)
- [Và hơn thế nữa](#và-hơn-thế-nữa)

<!-- /TOC -->


Dù cho đang ở level nào của javascript thì trước sau, ít nhiều cũng đụng tới vấn để **sort** một mảng trong javascript, tài liệu trên mozila có câu này hết sức nguy hiểm **sort is not necessarily stable.**, giờ thử xem tại sao gọi là không **stable**

```js
const myArray = [33, 2, 98, 25, 4]
myArray.sort() // [ 2, 25, 33, 4, 98 ]
```

Vâng, **25 > 33 > 4** 

Mảng số này sẽ được javascript sort theo thứ tự alphabet, mỗi giá trị số được đưa về `string` để so sánh.

Hàm `sort` có thể số truyền vào là `function` dùng để so sánh, nếu bạn không đưa hàm này vào, mặc định nó sẽ convert giá trị cần so sánh về `string` và **so sánh mã unicode** của này

```js
const numbers = [80, 9]
numbers.sort() // [80, 9]

const strings = ['80', '9']
strings.sort() // ['80', '9']
```

Như vậy thì viết như thế này cũng hoàn toàn hợp lệ

```js
const emojis = ["😍","😂","😰"]
emojis.sort() // ["😂", "😍", "😰"]

const wtfJavaScript = [390, "😂", 1, "2325"]  
wtfJavaScript.sort() // [1, "2325", 390, "😂"]

```

## Vậy muốn `sort` mảng số làm sao ?

Như đã đề cập, cần đưa một hàm dùng để so sánh, hàm này đặc điểm như sau

- Nếu giá trị trả về của hàm `compareFunction(a,b)` < 0, giá trị a sẽ đứng trước b
- Nếu giá trị trả về = 0, a và b bằng nhau
- Giá trị trả về > 0, a đứng sau b

```js
const myArray = [33, 2, 98, 25, 4]
myArray.sort((a, b) => a - b) // [ 2, 4, 25, 33, 98 ]
```

## Và hơn thế nữa

ECMAScript không đưa ra chuẩn mực nào về thuật toán cho cách `sort`, nghĩa là Javascript engine muốn áp dụng thuật toán nào thì tùy nó, Google's V8 (Javascript engine của Chrome) và NodeJS sử dụng thuật toán `quick sort` và kết quả thì không hẳn là chính xác 100%. Do đó nên nhớ là `sort` trên những trình duyệt khác nhau cũng có khả năng cho kết quả khác nhau nếu nó dùng khác Javascript Engine.

Nếu rảnh, và có trình, thì nên tự implement một sort function để xài, một số thuật toán sort có thể nghiên cứu như `InsertionSort`, `MergeSort`, `QuickSort`