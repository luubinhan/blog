---
slug: "/2019-05-26-ung-dung-cao-cap-cua-reduce"
date: "2019-05-26"
title: "Một vài ứng dụng hay ho của reduce"
desc: "Hãy học sử dụng reduce, vượt qua những ví vụ căn bản bằng cộng, trừ, nhân, chia"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "thu-thuat"]
---

Khi đọc tài liệu trên [MDN về Array.prototype.reduce()](https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) chúng ta sẽ có cái nhìn khá tổng quát về `.reduce()`, những ví dụ cộng, nhân số cơ bản để chúng ta dễ nắm cách hàm `.reduce()` chạy. Tuy nhiên vì nó quá căn bản, nên bạn sẽ không thể thấy hết được sự **lợi hại** của `.reduce()`

```js
function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

const sampleArray = [1, 2, 3, 4];

const sum = sampleArray.reduce(add, 0);
console.log('Tổng:', sum);
// ⦘ Tổng: 10

const product = sampleArray.reduce(multiply, 1);
console.log('Nhân lại bằng:', product);
// ⦘ Nhân lại bằng: 24
```

Có thể nhiều người không để ý, biến tích lũy (accumulator = tham số đầu tiên) và giá trị hiện tại (tham số thứ 2) không nhất thiết phải giống nhau.

Chúng ta có thể khai báo một hàm reducer như sau là hoàn toàn hợp lệ

```js
function fizzBuzzReducer(acc, element) {
    if (element % 15 === 0) return `${acc}Fizz Buzz\n`;
    if (element % 5 === 0) return `${acc}Fizz\n`;
    if (element % 3 === 0) return `${acc}Buzz\n`;
    return `${acc}${element}\n`;
}

const nums = [
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15
];

console.log(nums.reduce(fizzBuzzReducer, ''));
```

Với bài viết này chúng ta cũng xem xét những ứng dụng khác, **cao cấp** hơn của `.reduce()`, sử dụng việc thay đổi *kiểu* của biến tích lũy như ví dụ trên, mở ra nhiều ứng dụng bảo đảm là **hay**

## Chuyển một array sang object

Chúng ta có một array thế này

```js
const peopleArr  = [
    {
        username:    'glestrade',
        displayname: 'Inspector Lestrade',
        email:       'glestrade@met.police.uk',
        authHash:    'bdbf9920f42242defd9a7f76451f4f1d',
        lastSeen:    '2019-05-13T11:07:22+00:00',
    },
    {
        username:    'mholmes',
        displayname: 'Mycroft Holmes',
        email:       'mholmes@gov.uk',
        authHash:    'b4d04ad5c4c6483cfea030ff4e7c70bc',
        lastSeen:    '2019-05-10T11:21:36+00:00',
    },
    {
        username:    'iadler',
        displayname: 'Irene Adler',
        email:       null,
        authHash:    '319d55944f13760af0a07bf24bd1de28',
        lastSeen:    '2019-05-17T11:12:12+00:00',
    },
];
```

Nếu cần chuyển nó qua dạng object, lấy giá trị `username` làm key

```js
function keyByUsernameReducer(acc, person) {
    return { ...acc, [person.username]: person }
};

const peopleObj = peopleArr.reduce(keyByUsernameReducer, {} );
// ⦘ {
//     "glestrade": {
//         "username":    "glestrade",
//         "displayname": "Inspector Lestrade",
//         "email":       "glestrade@met.police.uk",
//         "authHash":    "bdbf9920f42242defd9a7f76451f4f1d",
//          "lastSeen":    "2019-05-13T11:07:22+00:00"
//     },
//     "mholmes": {
//         "username":    "mholmes",
//         "displayname": "Mycroft Holmes",
//         "email":       "mholmes@gov.uk",
//         "authHash":    "b4d04ad5c4c6483cfea030ff4e7c70bc",
//          "lastSeen":    "2019-05-10T11:21:36+00:00"
//     },
//     "iadler":{
//         "username":    "iadler",
//         "displayname": "Irene Adler",
//         "email":       null,
//         "authHash":    "319d55944f13760af0a07bf24bd1de28",
//          "lastSeen":    "2019-05-17T11:12:12+00:00"
//     }
// }

```

## Chuyển một array thành một array khác

Bình thường khi nghĩ tới `.reduce()` chúng ta nghĩ tới viết lấy một mảng sau đó đưa nó về 1 giá trị bằng biến tích lũy, giá trị này hoàn toàn có thể là một array khác.

```js
const fileLines = [
    'Inspector Algar,Inspector Bardle,Mr. Barker,Inspector Barton',
    'Inspector Baynes,Inspector Bradstreet,Inspector Sam Brown',
    'Monsieur Dubugue,Birdy Edwards,Inspector Forbes,Inspector Forrester',
    'Inspector Gregory,Inspector Tobias Gregson,Inspector Hill',
    'Inspector Stanley Hopkins,Inspector Athelney Jones'
];

function splitLineReducer(acc, line) {
    return acc.concat(line.split(/,/g));
}

const investigators = fileLines.reduce(splitLineReducer, []);
// [
//   "Inspector Algar",
//   "Inspector Bardle",
//   "Mr. Barker",
//   "Inspector Barton",
//   "Inspector Baynes",
//   "Inspector Bradstreet",
//   "Inspector Sam Brown",
//   "Monsieur Dubugue",
//   "Birdy Edwards",
//   "Inspector Forbes",
//   "Inspector Forrester",
//   "Inspector Gregory",
//   "Inspector Tobias Gregson",
//   "Inspector Hill",
//   "Inspector Stanley Hopkins",
//   "Inspector Athelney Jones"
// ]

```

Tất nhiên trong điều kiện có thể sử dụng `.flatMap()` (  không hỗ trợ trên edge và IE) thì nên dùng `.flatMap()` thay cho reduce

## Thực hiện 2 tính toán cùng lúc

Nếu cần thực hiện 2 tính toán dựa trên 1 array, ví dụ lấy giá trị nhỏ nhất và lớn nhất trong dãy số

```js
const readings = [0.3, 1.2, 3.4, 0.2, 3.2, 5.5, 0.4];
const maxReading = readings.reduce((x, y) => Math.max(x, y), Number.MIN_VALUE);
const minReading = readings.reduce((x, y) => Math.min(x, y), Number.MAX_VALUE);
```

`.reduce` không chỉ có thể trả về number, nó có thể trả về bất cứ kiểu gì, chúng ta có thể đưa 2 giá trị này vào một object

```js
function minMaxReducer(acc, reading) {
    return {
        minReading: Match.min(acc.minReading, reading),
        maxReading: Match.max(acc.maxReading, reading)
    }
}

const initMinMax = {
    minReading: Number.MAX_VALUE,
    maxReading: Number.MIN_VALUE,
}

const minMax = readings.reduce(minMaxReducer, initMinMax);
```

Vấn đề duy nhất của cách thứ 2 này là performance không tốt.

## Kết hợp map và filter cùng lúc

Lấy lại ví dụ với mảng `peopleArr` ở trên, chúng ta lấy người vừa đăng nhập sau cùng, không tính các user không có email. Cách thứ nhất để làm là tách ra làm 3 bước

- Lọc hết các user không có email
- Lấy giá trị `lastSeen`
- Tìm giá trị lớn nhất

```js
function notEmptyEmail(x) {
   return (x.email !== null) && (x.email !== undefined);
}
function getLastSeen(x) {
    return x.lastSeen;
}
function greater(a, b) {
    return (a > b) ? a : b;
}
const peopleWithEmail = peopleArr.filter(notEmptyEmail);
const lastSeenDates   = peopleWithEmail.map(getLastSeen);
const mostRecent      = lastSeenDates.reduce(greater, '');
```

Một cách khác để làm với `reduce`

```js
function notEmptyEmail(x) {
    return (x.email !== null) && (x.email !== undefined);
}

function greater(a, b) {
    return (a > b) ? a : b;
}

function notEmptyMostRecent(currentRecent, person) {
    return (notEmptyEmail(person)) ? greater(currentRecent, person.lastSeen) : currentRecent;
}

const mostRecent = peopleArr.reduce(notEmptyMostRecent, '');
```

## Chạy các phương thức async theo hàng đợi

Rất hữu ích khi cần giới hạn số lượng request API, hoặc lấy kết quả của một Promise truyền cho thằng kế tiếp. Ví dụ lấy message cho tất cả user trong mảng `peopleArr`

```js
function fetchMessages(username) {
    return fetch(`https://example.com/api/messages/${username}`).then(response => response.json());
}

function getUsername(person) {
    return person.username;
}

async function chainedFetchMessages(p, username) {
    // p là một promise
    const obj = await p;
    const data = await fetchMessages(username);
    return { ...obj, [username]: data };
}
const msgObj = peopleArr
    .map(getUsername)
    .reduce(chainedFetchMessages, Promise.resolve({}))
    .then(console.log)

```



<a target="_blank" rel="noopener noreferrer" href="https://jrsinclair.com/articles/2019/functional-js-do-more-with-reduce/">FUNCTIONAL JAVASCRIPT: HOW TO USE ARRAY REDUCE FOR MORE THAN JUST NUMBERS
</a>
