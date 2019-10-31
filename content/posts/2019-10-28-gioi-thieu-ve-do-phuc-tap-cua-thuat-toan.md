---
slug: "/2019-10-28-gioi-thieu-ve-do-phuc-tap-cua-thuat-toan"
date: "2019-10-28"
title: "Độ phức tạp của thuật toán"
desc: "Một cách chuẩn hóa trong ngành lập trình để đánh giá độ phức tạp của giải thuật"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "hoc-thuat"]
---

Một **giải thuật** sẽ bao gồm **các bước tuần tự** để giải quyết một vấn đề, để đi qua các bước tuần tự này, sẽ tốn một **khoản thời gian** nhất định để hoàn thành. Thời gian tiêu tốn của một giải thuật để giải quyết vấn đề được gọi là **Độ phức tạp của thuật toán**

Trong trường hợp xấu nhất, **thời gian chạy của một giải thuật tỉ lệ thuận với số lượng tham số đầu vào**

Giống như giải toán, chuyện có nhiều cách khác nhau để giải cùng một bài toán là bình thường. Ví dụ như nhân 2 con số, có rất nhiều cách để tính nhẩm được, chứ không phải chỉ có đúng một cách mà thầy cô bạn dạy hồi tiểu học, cách nào giúp ta nhẩm nhanh hơn thì được gọi là ít phức tạp hơn.

Độ phức tạp của thuật toán được diễn đạt bằng ký hiệu **chữ O viết hoa**. O cho biết thời gian cần chạy của giải thuật **tỉ lệ như thế nào** với số lượng tham số đầu vào (như một dạng đơn vị hé)

![](https://i1.wp.com/www.jenniferbland.com/wp-content/uploads/big-o-complexity.png?w=783&ssl=1)


## O(1) - Độ phức tạp không đổi

Giải thuật nào có độ phức tạp bằng **O(1)** nghĩa là giải thuật đó không phụ thuộc giá trị input có *bự* bao nhiêu đi nữa, nó luôn có độ phức tạp không đổi.

Nếu một hàm có độ phức tạp bằng O(1) nghĩa là trường hợp đẹp nhất của hàm, tối ưu nhất.

![](https://i0.wp.com/www.jenniferbland.com/wp-content/uploads/O1-constant-time-complexity.jpg?w=416&ssl=1)

Ví dụ, hash table

```js
const obj = { /*1 triệu phần tử chẳng hạn*/ }

// Câu lệnh sau có O(1)
console.log(obj["một key bất kỳ"])

// hàm lấy giá trị cuối cùng của mảng
// độ phức tạp là O(1), dù mảng có bao nhiêu phần tử 
// cũng ko ảnh hưởng thời gian chạy
const getLast = items => items[items.length-1];
```

## O(log n)

Thời gian chạy càng tăng, mức độ phức tạp càng giảm

Ví dụ bạn muốn tìm số điện thoại của một người trong cuốn danh bạ khoản một triệu cái tên. Điều đầu tiên chúng làm là tìm mở đại khoản giữa cuốn danh bạ, so sanh cái tên hiện tại nằm trước hay nằm sau trang đó, lặp lại tương tự với nhóm mới tìm được.

Rõ ràng khi càng tìm, số lượng tên phải kiểm tra càng giảm đáng kể (mỗi lần bỏ qua 1 nữa). Nếu có 3 tên, chúng ta chỉ tốn 2 bước là tìm ra. Có 15 tên, chúng ta chỉ cần tối đa 4 bước.

![](https://i1.wp.com/www.jenniferbland.com/wp-content/uploads/Olog-n-logarithmic-complexity.jpg?w=472&ssl=1)

Thời gian thực hiện thuật toán giảm đáng kể khi số lượng input giảm.

Ví dụ như thuật toán tìm kiếm QuickSort

```js
const quickSort = list => {
  if (list.length < 2) 
    return list;
  let pivot = list[0];
  let left  = []; 
  let right = [];
  for (let i = 1, total = list.length; i < total; i++){
    if (list[i] < pivot)
      left.push(list[i]);
    else
      right.push(list[i]);
  }
  return [
    ...quickSort(left), 
    pivot, 
    ...quickSort(right)
  ];
};

quickSort( ['q','a','z','w','s','x','e','d','c','r']);
```

## O(n) - Thời gian tịnh tiến theo số lượng input

Đây là những thuật toán có tốc độ tăng **song hành** với số lượng input tăng, trường hợp xấu nhất sẽ rơi vào khi số lượng input nhiều nhất

Ví dụ, bạn in ra giá trị của một mảng 10 phần tử, loop qua toàn bộ các phần tử để làm việc in này. Khi số lượng phần tử tăng lên thành 1000 lần thì bạn cũng phải loop qua 1000 phần tử

![](https://i2.wp.com/www.jenniferbland.com/wp-content/uploads/On-Linear-Complexity.jpg?w=463&ssl=1)

Ví dụ các vòng lặp `for`

```js
const findIndex = (items, match) => {
  for (let i = 0, total = items.length; i < total; i++)
    if (items[i] == match)
      return i;
   return -1;
};
const array= ['a', 'b', 'c', 'd'];
// loop 1 lần, tốt nhất
findIndex(array, 'a'); // 0
// loop 4 lần, xấu nhất
findIndex(array, 'd'); // 3
// loop 4 lần, xấu nhất
findIndex(array, 'e'); // -1 
```

## O(n^2)  - Thời gian chạy tăng theo n mũ 2

Ngược lại với **O(log n)**, thời gian chạy của thuật toán nào có giá trị này sẽ tăng theo **số lượng input mũ 2)

![](https://i1.wp.com/www.jenniferbland.com/wp-content/uploads/On2-quadratic-time-complexity.jpg?w=382&ssl=1)

Trong lập trình chúng ta sẽ tránh để các đoạn code nào bị rơi vào độ phức tạp O(n^2)

Ví dụ, 2 vòng lặp for lồng nhau, bubble sort.

```js
const findMatch = (string) => {
   for (var i = 0; i < string.length; i++){
      for ( var j = i+1; j < string.length; j++){
         if (string[i] === string[j]) {
            return true;
         }
      }
   }
   return false;
}
```

[https://www.freecodecamp.org/news/time-is-complex-but-priceless-f0abd015063c/](https://www.freecodecamp.org/news/time-is-complex-but-priceless-f0abd015063c/)

[http://www.bradoncode.com/blog/2012/04/big-o-algorithm-examples-in-javascript.html](http://www.bradoncode.com/blog/2012/04/big-o-algorithm-examples-in-javascript.html)

[https://medium.com/@gmedina229/big-o-in-javascript-36ff67766051](https://medium.com/@gmedina229/big-o-in-javascript-36ff67766051)

[https://medium.com/javascript-scene/time-complexity-big-o-notation-1a4310c3ee4b](https://medium.com/javascript-scene/time-complexity-big-o-notation-1a4310c3ee4b)

[https://medium.com/cesars-tech-insights/big-o-notation-javascript-25c79f50b19b](https://medium.com/cesars-tech-insights/big-o-notation-javascript-25c79f50b19b)

[https://www.jenniferbland.com/time-complexity-analysis-in-javascript/](https://www.jenniferbland.com/time-complexity-analysis-in-javascript/)


