---
slug: "/2019-11-29-giai-bai-toan-cong-so-trong-javascript"
date: "2019-11-29"
title: "Giải bài toán cộng 2 số bằng javascript"
desc: "Một đề bài cũng không mới, thông qua đó chúng ta sẽ biết thêm tí về cách sử dụng object sao cho hiệu quả"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["hoc-thuat", "javascript"]
---

Đề bài: viết một hàm, nhận 2 tham số đầu vào, tham số thứ nhất là một mảng số, tham số thứ 2 là một số bất kỳ. Yêu cầu trả về một mảng gồm 2 phần tử trong mảng ban đầu và 2 phần tử này cộng lại bằng tham số thứ 2.

```js
/**
 * @param {number[]} nums
 * @param {number} total
 * @return {number[]}
 */
const twoSum = (arr, total) => {
  // Solution here
};
```

Ví dụ sử dụng hàm này bằng các input như bên dưới

```
input: nums = [1, 2, 3], total = 4
output: [1, 3]

input: nums = [3, 9, 12, 20], total = 21
output: [9, 12]
```

Chúng ta coi như mảng `nums` truyền vào luôn là mảng số, ko cần kiểm trả kiểu giá trị của phần tử trong mảng, `total` luôn là một con số mà 2 phần tử trong có thể cộng lại bằng. Tất là không có trường hợp ko tìm thấy cặp phần tử nào thỏa yêu cầu

## Phương pháp: Vét cạn, không bỏ sót em nào

Lấy phần tử đầu tiên của `nums`, duyệt qua toàn bộ các phần tử còn lại, xem có thằng nào cộng lại bằng `total` không. Cứ làm điều tương tự với từng phần tử một trong mảng. 

```js
/**
 * @param {number[]} nums
 * @param {number} total
 * @return {number[]}
 */
const twoSum = (nums, total) => {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === total) {
        return [nums[i], nums[j]];
      }
    }
  }
};

console.log(twoSum([1, 2, 3], 4)); // [1, 3]
console.log(twoSum([3, 9, 12, 20], 21)); // [9, 12]
```

Có 2 chỗ đáng quan tâm nếu chọn cách này

1. Tại sao vòng lặp **phải** kết thúc ở `i < nums.length - 1` ?
2. Tại sao vòng lặp bên trong nữa bắt đầu ở vị trí `j = i +1` ?

Cũng như cái tên của nó **Vét cạn**, chúng ta không bỏ sót trường hợp nào cả, ngay cả những trường hợp **có thể bỏ qua**. Độ khó của 2 vòng lặp lồng nhau như vậy là n mũ n<sub>2</sub>, nói cách khác, thời gian chạy của vòng lặp này tỉ lệ với bình phương số lượng các phần tử

Giả dụ bạn có 100000 phần tử, thì số lần chạy của vòng lặp là 4999950000

Nếu thích thì mấy bạn copy đoạn code này chạy thử

```js
const len = 100000;
const bigArr = new Array(len).fill(1);
bigArr[len - 2] = 9;
bigArr[len - 1] = 10;
const total = 19;

const twoSum = (nums, total) => {
  let iterations = 0;
  const startTime = new Date();
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      iterations++;
      if (nums[i] + nums[j] === total) {
        console.log(
          `Iterations: ${iterations}`,
          `Time: ${new Date() - startTime}ms`
        );
        return [nums[i], nums[j]];
      }
    }
  }
};

twoSum(bigArr, total);
```

5 triệu lần chạy này sẽ tốn khoảng 20 giây trên máy mình


## Phương pháp bảng băm: sử dụng Object của javascript

Chúng ta có thể làm tốt hơn cách trên. Thay vì đặt vòng lặp lồng nhau, chạy qua các phần tử của `nums` một lượt, đánh dấu các phần tử đã kiểm tra, bỏ vào làm key cho một object, kiểm tra phần tử trong `nums` có tồn tại trong object hay chưa

```js
const twoSum = (nums, total) => {
    // object chứa những giá trị đã duyệt qua
  const previousValues = {};

  for (let i = 0; i < nums.length; i++) {
    // giá trị cần tìm
    const complement = total - nums[i];
    
    // giá trị cần tìm có nằm ở lần duyệt trước đó
    if (previousValues[complement]) {
      return [complement, nums[i]];
    }
    // lưu lại giá trị này vào object đã duyệt
    previousValues[nums[i]] = true;
  }
};

console.log(twoSum([1, 2, 3], 4)); // [1, 3]
console.log(twoSum([3, 9, 12, 20], 21)); // [9, 12]
```

Chúng ta chỉ còn một vòng lặp, vòng lặp thứ 2 bị thay thế bởi `previousValues[complement]`


Đo lại tốc độ với cách làm này
```js
const len = 100000;
const bigArr = new Array(len).fill(1);
bigArr[len - 2] = 9;
bigArr[len - 1] = 10;
const total = 19;

const twoSum = (nums, total) => {
  let iterations = 0;
  const startTime = new Date();

  const previousValues = {};
  for (let i = 0; i < nums.length; i++) {
    iterations++;
    const complement = total - nums[i];
    if (previousValues[complement]) {
      console.log(
        `Iterations: ${iterations}`,
        `Time: ${new Date() - startTime}ms`
      );
      return [complement, nums[i]];
    }
    previousValues[nums[i]] = true;
  }
};

twoSum(bigArr, total);
// Iterations: 100000 Time: 4ms
```

Không có chi là miễn phí, chúng ta tiết kiệm được thời gian chạy, nhưng phải bỏ ra một vùng nhớ để lưu object `previousValues`, nếu lưu khoảng 1 triệu phần tử, dung lượng này cũng không nhỏ, khoản đâu đó 10MB RAM

[https://nick.scialli.me/exploring-the-two-sum-interview-question-in-javascript/](https://nick.scialli.me/exploring-the-two-sum-interview-question-in-javascript/)

