---
slug: "/2019-04-08-cac-phuong-thuc-tren-array-can-nho"
date: "2019-04-08"
title: "Các phương thức trên array cần nhớ"
desc: "Khi cần loop qua một array, tìm phần tử, sắp xếp, hoặc làm gì đó trên array, khả năng rất cao là trong array đã có một phương thức sẵn để bạn xài, không cần dùng tới vòng lặp for. Chúng ta sẽ cùng điểm qua những phương thức như vậy trong bài viết này."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Các phương thức **phải biết**](#c%C3%A1c-ph%C6%B0%C6%A1ng-th%E1%BB%A9c-ph%E1%BA%A3i-bi%E1%BA%BFt)
  - [map](#map)
  - [filter](#filter)
  - [reduce](#reduce)
  - [spread operator](#spread-operator)
- [Biết thì tốt](#bi%E1%BA%BFt-th%C3%AC-t%E1%BB%91t)
  - [includes](#includes)
  - [concat](#concat)
  - [forEach](#foreach)
  - [indexOf](#indexof)
  - [find](#find)
  - [findIndex](#findindex)
  - [slice](#slice)
  - [some](#some)
  - [every](#every)
  - [from](#from)

<!-- /TOC -->


## Các phương thức **phải biết**

### map

Hàm được sử dụng nhiều nhất trong đám, mỗi khi cần thay đổi giá trị phần tử trong array, không thay đổi số lượng phần tử, nghĩ tới `map`

```js
const numbers = [1, 2, 3, 4]

// cộng thêm một vào tất cả các phần tử
const numbersPlusOne = numbers.map(n => n + 1)
console.log(numbersPlusOne) // [2, 3, 4, 5]
```
Tạo một array mới, chỉ giữ lại một kiểu property mong muốn trong object

```js
const allActivities = [
  { title: 'My activity', coordinates: [50.123, 3.291] },
  { title: 'Another activity', coordinates: [1.238, 4.292] },
  // etc.
]

const allCoordinates = allActivities.map(activity => activity.coordinates)
console.log(allCoordinates) // [[50.123, 3.291], [1.238, 4.292]]
```
### filter

Hàm này sẽ trả về array mới, khi phần tử thỏa điều kiện đặt ra

```js
const numbers = [1, 2, 3, 4, 5, 6]
const oddNumbers = numbers.filter(n => n % 2 !== 0)
console.log(oddNumbers) // [1, 3, 5]
```

```js
const participants = [
  { id: 'a3f47', username: 'john' },
  { id: 'fek28', username: 'mary' },
  { id: 'n3j44', username: 'sam' },
]

function removeParticipant(participants, id) {
  return participants.filter(participant => participant.id !== id)
}

console.log(removeParticipant(participants, 'a3f47')) 
//  [{ id: 'fek28', username: 'mary' }, { id: 'n3j44', username: 'sam' }];
```

### reduce

Một trong những phương thức khó hiểu nhất, theo quan điểm cá nhân, nhưng một khi đã master rồi thì bạn sẽ làm được khá nhiều thứ hay ho với nó

Về căn bản, `reduce` sẽ lấy các giá trị trong array,  tính toán các kiểu rồi **trả về 1 giá trị**. Nó nhận vào các tham số

Kết quả trả về từ lần tính toán trước, lần chạy đầu tiên, giá trị này là phần tử đầu tiên trong array
Giá trị phần tử hiện tại trong array
Giá trị index của phần tử
Mảng đã gọi trước đó

Hầu như chúng ta chỉ sử dụng 2 tham số đầu

Lấy một ví dụ kinh điển về `reduce`, cộng tất cả giá trị trong mảng

```js
const numbers = [37, 12, 28, 4, 9]
const total = numbers.reduce((total, n) => total + n)
console.log(total) // 90
```

Chúng ta có thể dựng hàm `map` và `filter` bằng hàm `reduce` luôn

```js
const map = (arr, fn) => {
  return arr.reduce((mappedArr, element) => {
    return [...mappedArr, fn(element)]
  }, [])
}

console.log(map([1, 2, 3, 4], n => n + 1)) // [2, 3, 4, 5]

const filter = (arr, fn) => {
  return arr.reduce((filteredArr, element) => {
    return fn(element) ? [...filteredArr] : [...filteredArr, element]
  }, [])
}

console.log(filter([1, 2, 3, 4, 5, 6], n => n % 2 === 0)) // [1, 3, 5]
```

Giờ xét tới một ví dụ tương đối phức tạp hơn, giảm số chiều trong mảng xuống 1, cụ thể là [1, 2, 3, [4, [[[5, [6, 7]]]], 8]] thành [1, 2, 3, 4, 5, 6, 7, 8]

```js
function flatDeep(arr) {
  return arr.reduce((flattenArray, element) => {
    return Array.isArray(element)
      ? [...flattenArray, ...flatDeep(element)]
      : [...flattenArray, element]
  }, [])
}

console.log(flatDeep([1, 2, 3, [4, [[[5, [6, 7]]]], 8]])) 
// [1, 2, 3, 4, 5, 6, 7, 8]
```

### spread operator

Đồng ý đây không phải là một phương thức. Nhưng vì nó quá hữu dụng nên cũng đưa vào luôn

Merge nhiều mảng lại thành 1

```js
const numbers = [1, 2, 3]
const numbersCopy = [...numbers]
console.log(numbersCopy) 
// [1, 2, 3]

const otherNumbers = [4, 5, 6]
const numbersConcatenated = [...numbers, ...otherNumbers]
console.log(numbersConcatenated)
// [1, 2, 3, 4, 5, 6]
```

Lưu ý quan trọng, khi sử dụng spread operator luôn khắc ghi trong lòng là nó sẽ thực hiện một **shallow copy**, mà **shallow copy** nghĩa là gì, là nó sẽ copy dùng cách đỡ tốn công nhất có thể, nếu các giá trị trong mảng kiểu số, chữ (primitive types) thì không vấn đề, khi trong mảng đó chứa mảng khác, object thì nó chỉ **trỏ tới** cùng đối tượng gốc thôi, chứ không phải là **sao i**

```js
const arr = ['foo', 42, { name: 'Thomas' }]
let copy = [...arr]

copy[0] = 'bar'

console.log(arr)
// No mutations: ["foo", 42, { name: "Thomas" }]
console.log(copy)
// ["bar", 42, { name: "Thomas" }]

copy[2].name = 'Hello'

console.log(arr)
// /!\ MUTATION ["foo", 42, { name: "Hello" }]
console.log(copy)
// ["bar", 42, { name: "Hello" }]
```

Phải nhắc lại, vì đây là trường hợp hay bị bug nhất. Nên khi cần giải quyết vấn đề copy này triệt để, nhớ đến [cloneDeep](https://lodash.com/docs/#cloneDeep) của Lodash

## Biết thì tốt

### includes

Nếu đã từng sử dụng phương thức `indexOf` để kiểm tra xem phần tử đó có tồn tại trong array không, thì bạn có thể thay thế bằng việc dùng `includes`

```js
const sports = ['football', 'archery', 'judo']
const hasFootball = sports.includes('football')
console.log(hasFootball) // true
```

### concat

Phương thức merge nhiều mảng thành 1

```js
const numbers = [1, 2, 3]
const otherNumbers = [4, 5, 6]

const numbersConcatenated = numbers.concat(otherNumbers)
console.log(numbersConcatenated) 
// [1, 2, 3, 4, 5, 6]

// You can merge as many arrays as you want
function concatAll(arr, ...arrays) {
  return arr.concat(...arrays)
}

console.log(concatAll([1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12])) 
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
```

### forEach

Loop qua mảng, chậm hơn `for` nhưng xài tiện hơn

```js
const numbers = [1, 2, 3, 4, 5]
numbers.forEach(console.log)
// 1 0 [ 1, 2, 3 ]
// 2 1 [ 1, 2, 3 ]
// 3 2 [ 1, 2, 3 ]
```

### indexOf

Được sử dụng thường xuyên để kiểm tra phần tử có tồn tại trong mảng không

```js
const sports = ['football', 'archery', 'judo']

const judoIndex = sports.indexOf('judo')
console.log(judoIndex) 
// 2
```

### find

Khá tương đồng với hàm `filter`, chúng ta cung cấp cho nó một hàm để kiểm tra tất cả các phần tử của mảng. Tuy nhiên nó sẽ trả về **phần tử** đầu tiên thỏa điều kiện chứ không chạy hết toàn bộ mảng.

```js
const users = [
  { id: 'af35', name: 'john' },
  { id: '6gbe', name: 'mary' },
  { id: '932j', name: 'gary' },
]

const user = users.find(user => user.id === '6gbe')
console.log(user)
// { id: '6gbe', name: 'mary' }
```

### findIndex

Giống như hàm find, nhưng thay vì trả về phần tử, nó trả về index của phần tử 

```js
const users = [
  { id: 'af35', name: 'john' },
  { id: '6gbe', name: 'mary' },
  { id: '932j', name: 'gary' },
]

const user = users.findIndex(user => user.id === '6gbe')
console.log(user) // 1
```

### slice

Khi chúng ta cần lấy một **đoạn** trong mảng, hoặc copy một **đoạn**, chúng ta nhớ tới `slice`. Nó cũng thực hiện một **shallow copy**

```js
const numbers = [1, 2, 3, 4, 5]
const copy = numbers.slice()
```

Ví dụ, chúng ta muốn lấy một số đoạn chat messages từ API, 2 cách làm với vòng lặp `for` và `slice`

```js
// The "traditional way" to do it:
// xác định số lượng muốn lấy, sử dụng vòng lặp for
const nbMessages = messages.length < 5 ? messages.length : 5
let messagesToShow = []
for (let i = 0; i < nbMessages; i++) {
  messagesToShow.push(posts[i])
}

// Nếu "arr" ít hơn 5 phần tử,
// nó vẫn chạy bình thường
const messagesToShow = messages.slice(0, 5)
```

### some

Để kiểm tra có ít nhất một phần tử trong mảng thỏa điều kiện

```js
const users = [
  {
    id: 'fe34',
    permissions: ['read', 'write'],
  },
  {
    id: 'a198',
    permissions: [],
  },
  {
    id: '18aa',
    permissions: ['delete', 'read', 'write'],
  },
]

const hasDeletePermission = users.some(user =>
  user.permissions.includes('delete')
)
console.log(hasDeletePermission) // true
```

### every

Tất cả các phần tử trong mảng điều thỏa điều kiện

```js
const users = [
  {
    id: 'fe34',
    permissions: ['read', 'write'],
  },
  {
    id: 'a198',
    permissions: [],
  },
  {
    id: '18aa',
    permissions: ['delete', 'read', 'write'],
  },
]

const hasAllReadPermission = users.every(user =>
  user.permissions.includes('read')
)
console.log(hasAllReadPermission) // false
```

### from

Tạo một array mới từ một object hoặc một đối tượng bất kỳ có thể tạo được

```js
const nodes = document.querySelectorAll('.todo-item')
 //lấy danh sách NodeList
const todoItems = Array.from(nodes)
 // có thể sử dụng các phương thức của array trên todoItems này

todoItems.forEach(item => {
  item.addEventListener('click', function() {
    alert(`You clicked on ${item.innerHTML}`)
  })
})
```


<a target="_blank" rel="noopener noreferrer" href="https://thomlom.dev/what-you-should-know-about-js-arrays/">What you should know about JavaScript arrays
</a>
