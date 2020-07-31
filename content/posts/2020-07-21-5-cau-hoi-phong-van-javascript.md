---
slug: "/2020-07-21-5-cau-hoi-phong-van-javascript"
date: "2020-07-21"
title: "5 câu hỏi javascript và cách đánh bại chúng"
desc: "Mỗi công ty mỗi kiểu phỏng vấn, điều hay bị phàn nàn trong các buổi phỏng vấn là phần lớn nó không liên quan tới những công việc hằng ngày mà vị trí đó đòi hỏi."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Xác định chuỗi đối xứng (palindrome)](#xác-định-chuỗi-đối-xứng-palindrome)
- [FizzBuzz](#fizzbuzz)
- [Đảo chữ](#đảo-chữ)
- [Đếm số nguyên âm](#đếm-số-nguyên-âm)
- [Fibonacci](#fibonacci)

<!-- /TOC -->

Có những lúc thấy các vấn đề liên quan trực tiếp tới frontend như các sự kiện của DOM, tương thích trên các trình duyệt khác nhau, phương pháp làm layout lại không được hỏi. Những người đứng vị trí tuyển dụng sẽ nhìn nhận như thế này

> Chúng tôi thích thuê những người thông minh, chứ không thích người biết rõ về một kỹ thuật nào đó, nhưng lại thiếu sáng tạo, thiếu logic và thiếu biện chứng.

Dù là quan điểm nào đi nữa, nhưng phỏng vấn thì coding challenge vẫn là một phần quan trọng trong phỏng vấn.

## Xác định chuỗi đối xứng (palindrome)

Chuỗi đối xứng là chuỗi khi đảo ký tự từ trái qua phải và từ phải qua trái không thay đổi, như chữ "racecar", "anna", "tenet". (Film tenet không biết khi nào mới chiếu, nghe đâu hoãn dài hơi vì covid)

Yêu cầu, cho bạn một chuỗi, xác định nó phải là đối xứng không

```js
isPalindrome("racecar") === true;
isPalindrome("table") === false;
```

Đáp án

```js
const palindrome = (str) => {
  // chuyển qua lowercase trước
  str = str.toLowerCase();
  // chuyển thành array, reverse rồi so sánh
  return (
    str ===
    str
      .split("")
      .reverse()
      .join("")
  );
};
```

## FizzBuzz

Yêu cầu: viết một function đáp ứng những chuyện sau

- log ra các số từ 1 đến n, n là một parameter truyền vào
- log ra chữ `fizz` nếu là bội số của 3
- log ra buzz nếu là bội số của 5
- log ra fizzbuzz nếu là bội số của cả 3 và 5

```js
fizzBuzz(5);
// 1
// 2
// fizz
// 4
// buzz
```

Để giải quyết bài toán này, chúng ta cần nhớ đến cách dùng `%` để biết được số dư của phép chia, trả về 0 là chia hết, ngược lại thì không chia hết

```js
12 % 5; // 2 -> 12 không phải bội số của 5
12 % 3; // 0 -> 12 là bộ số của 3
```

Đáp án

```js
const fizzBuzz = (num) => {
  for (let i = 1; i <= num; i++) {
    // kiểm tra xem có là bội số của cả 3 và 5
    if (i % 3 === 0 && i % 5 === 0) {
      console.log("fizzbuzz");
    } // có phải là bội số của 3
    else if (i % 3 === 0) {
      console.log("fizz");
    } // có phải là bội số của 5
    else if (i % 5 === 0) {
      console.log("buzz");
    } else {
      console.log(i);
    }
  }
};
```

## Đảo chữ

Yêu cầu: viết một function, params truyền vào 2 chuỗi, trả về `true` nếu 2 chuỗi này là dạng đảo của nhau và `false` cho trường hợp ngược lại.

2 chuỗi gọi là đảo nhau nếu số ký tự hoàn toàn giống nhau (không kể hoa thường), chỉ khác thứ tự.

```js
anagram('finder', 'Friend')  --> true
anagram('hello', 'bye') --> false
```

Đây là một cách làm

```js
// hàm helper để build một object làm nơi lưu trữ
const buildCharObject = (str) => {
  const charObj = {};
  for (let char of str.replace(/[^\w]/g).toLowerCase()) {
    // nếu object đã chứa giá trị đang loop qua
    // tăng giá trị nó lên 1,
    // ngược lại, thêm mới ký tự này vào object với giá trị = 1
    charObj[char] = charObj[char] + 1 || 1;
  }
  return charObj;
};

// hàm chính
const anagram = (strA, strB) => {
  // lưu giá trị của strA vào object
  const aCharObject = buildCharObject(strA);
  // lưu giá trị strB vào object
  const bCharObject = buildCharObject(strB);

  // so sánh độ dài giữa 2 object
  if (Object.keys(aCharObject).length !== Object.keys(bCharObject).length) {
    return false;
  }
  // đã chắc chắn về length giống nhau
  // kiểm tra tiếp số lượng các ký tự có giống nhau
  for (let char in aCharObject) {
    if (aCharObject[char] !== bCharObject[char]) {
      return false;
    }
  }

  return true;
};
```

## Đếm số nguyên âm

Nguyên âm: anh-ôm-em-ú-ì, `a`, `o`, `e`, `u`, `i`.

Viết một function nhận vào string, trả về số lượng nguyên âm có trong string

```js
findVowels("hello"); // --> 2
findVowels("why"); // --> 0
```

Đáp án

```js
const findVowels = (str) => {
  let count = 0;
  const vowels = ["a", "o", "e", "u", "i"];
  for (var char = str.length - 1; i >= 0; i--) {
    if (vowels.includes(char.toLowerCase())) {
      count++;
    }
  }
  return count;
};
```

Có thể dùng regular expression

```js
const findVowels = (str) => {
  const matched = str.match(/[aeiou]/gi);
  return matched ? matches.length : 0;
};
```

## Fibonacci

Cái này kinh điển. Mọi dân lập trình đều đụng tới dãy số fibonacci, thật thiếu sót nếu không đề cập ở đây.

Fibonacci là dãy số, mà số bên phải = tổng 2 số đứng bên trái. Như thế này: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34

Yêu cầu: một function nhận params là n, trả về giá trị `n` trong dãy fibonacci

```js
fibonacci(3); // --> 2
```

Đáp án

```js
const fibonacci = (num) => {
  const result = [0, 1];

  for (let i = 2; i <= num; i++) {
    const prevNum1 = result[i - 1];
    const prevNum2 = result[i - 2];
    result.push(prevNum1 + prevNum2);
  }

  return result[num];
};
```

hoặc dùng đệ quy

```js
const fibonacci = (num) => {
  // nếu là 1 hoặc 0
  if (num < 2) {
    return num;
  }
  // từ 2 trở lên
  return fibonacci(num - 1) + fibonacci(num - 2);
};
```

Chúc các bạn phỏng vấn vui vẻ!

[How to Beat 5 Common JavaScript Interview Challenges](https://www.sitepoint.com/5-common-coding-interview-challenges/)
