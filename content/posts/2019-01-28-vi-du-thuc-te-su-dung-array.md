---
slug: "/2019-01-28-vi-du-thuc-te-su-dung-array"
date: "2019-01-28"
title: "15 ví dụ sử dụng map, reduce và filter"
desc: "Nếu đang muốn tìm những ví dụ thực tế sử dụng map và reduce, quá chán với ví dụ cộng số, bài viết này chính là dành cho bạn."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---


## Xóa phần tử trùng trong mảng
Bạn có một mảng String, Number, giờ chúng ta xóa đi các phần tử bị trùng giá trị. Chúng ta sử dụng [kiểu Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) để đạt được mục đích này

```js
let values = [3,1,3,5,2,4,4,4];
let uniqueValues = [...new Set(values)];
// uniqueValues [3,1,5,2,4]
```
## Phương thức search đơn giản, phân biệt hoa thường

Chúng ta dùng hàm `filter` để tạo mảng mới, với điều kiện phần tử đó `includes` một String hoặc thỏa một expression

```js
let users = [
  { id: 11, name: 'Adam', age: 23, group: 'editor' },
  { id: 47, name: 'John', age: 28, group: 'admin' },
  { id: 85, name: 'William', age: 34, group: 'editor' },
  { id: 97, name: 'Oliver', age: 28, group: 'admin' }
];
let res = users.filter(it => it.name.includes('oli'));
// res is []
```

## Search đơn giản, không phần biệt hoa thường
Chúng ta dùng `RegExp` để lọc theo điều kiện

```js
let res = users.filter(it => new RegExp('oli', "i").test(it.name));
// res is
[
  { id: 97, name: 'Oliver', age: 28, group: 'admin' }
]
```

## Kiểm tra user có nằm trong group admin không

Dùng phương thức `some()` để kiểm tra có ít nhất một element trong mảng thỏa điều kiện đặt ra

```js
let hasAdmin = users.some(user => user.group === ‘admin’);
// hasAdmin is true
```

## Giảm số chiều của mảng

Nếu chúng ta có một mảng [...[], ...[1,2,3]], và chúng ta muốn transform nó thành [1,2,3]
```js
let nested = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
let flat = nested.reduce((acc, it) => [...acc, ...it], []);
// kết quả: [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

Ở đây chúng ta không có quan tâm đến performance, nên dùng luôn spread operator bên trong `reduce()`.

Còn đây là cách của Paweł Wolak, không sử dụng `Array.reduce`

```js
let flat = [].concat.apply([], nested);
```

## Tạo một object chứa 1 key được tính toán


```js
let users = [
  { id: 11, name: 'Adam', age: 23, group: 'editor' },
  { id: 47, name: 'John', age: 28, group: 'admin' },
  { id: 85, name: 'William', age: 34, group: 'editor' },
  { id: 97, name: 'Oliver', age: 28, group: 'admin' }
];

let groupByAge = users.reduce((acc, it) =>
({...acc, [it.age]: (acc[it.age] || 0) + 1 }),
{});
```

## Tạo một object từ mảng

Thay vì tiến hành trên cả array để tìm user theo id, chúng ta tạo một object mới, trong đó user id sẽ là key của object này, truy xuất sẽ nhanh hơn.

```js
let uTable = users.reduce((acc, it) => ({...acc, [it.id]: it }), {})

// kết quả
{
  11: { id: 11, name: 'Adam', age: 23, group: 'editor' },
  47: { id: 47, name: 'John', age: 28, group: 'admin' },
  85: { id: 85, name: 'William', age: 34, group: 'editor' },
  97: { id: 97, name: 'Oliver', age: 28, group: 'admin' }
}

```

## Lấy giá trị unique của các item trong một mảng

Chúng ta có mảng user, mỗi user có thuộc vào một group khác nhau, chúng ta sẽ lấy tất cả group đang tồn tại trong mảng user

```js
let listOfUserGroups = [...new Set(users.map(it => it.group)];
// kết quả: listOfUserGroups is ['editor', 'admin'];
```

## Đảo giá trị key-value trong object

```js
let cities = {
  Lyon: 'France',
  Berlin: 'Germany',
  Paris: 'France'
};
let countries = Object.keys(cities).reduce(
  (acc, k) => (acc[cities[k]] = [...(acc[cities[k]] || []), k], acc) , {});
// countries is
{
  France: ["Lyon", "Paris"],
  Germany: ["Berlin"]
}
```

Nếu đoạn code trên quá phức tạp, quá khó hiểu, viết lại như thế này cho dễ dòm hơn

```js
let countries = Object.keys(cities).reduce((acc, k) => {
  let country = cities[k];
  acc[country] = [...(acc[country] || []), k];
  return acc;
}, {});
```

## Chuyển đổi mảng chứa giá trị độ F sang giá trị độ C

Có thể áp dụng để chuyển đổi tiền tệ, khối lượng, …
```js
let celsius = [-15, -5, 0, 10, 16, 20, 24, 32]
let fahrenheit = celsius.map(t => t * 1.8 + 32);
// fahrenheit is [5, 23, 32, 50, 60.8, 68, 75.2, 89.6]
```

## Chuyển object thành query string

```js
let params = {lat: 45, lng: 6, alt: 1000};
let queryString = Object.entries(params).map(p => encodeURIComponent(p[0]) + '=' + encodeURIComponent(p[1])).join('&')
// queryString is "lat=45&lng=6&alt=1000"
```

## Echo ra bảng giá trị dữ liệu

```js
let users = [
  { id: 11, name: 'Adam', age: 23, group: 'editor' },
  { id: 47, name: 'John', age: 28, group: 'admin' },
  { id: 85, name: 'William', age: 34, group: 'editor' },
  { id: 97, name: 'Oliver', age: 28, group: 'admin' }
];

users.map(({id, age, group}) => `\n${id} ${age} ${group}`).join('')
// kết quả
"
11 23 editor
47 28 admin
85 34 editor
97 28 admin"
```

## Tìm và thay thế key-value trong một mảng object

Ví dụ chúng ta đổi giá trị tuổi của một user `users[1].age = 29`, đó là trong trường hợp ta biết giá trị index user muốn đổi, chúng ta tạo hẳn một mảng mới và thay đổi giá trị của phần tử mong muốn. Tại sao lại làm vậy? Để chúng ta có thể so sánh nhanh `updatedUsers == user`

```js
let updatedUsers = users.map(
  p => p.id !== 47 ? p : {...p, age: p.age + 1}
);
```

## Union hay mảng

Không cần union của ladash, chúng ta dùng `Set` để giải quyết vấn đề này.

```js
let arrA = [1,4,3,2];
let arrB = [5,2,6,7,1];

[...new Set([...arrA, ...arrB])];
// kết quả: [1, 4, 3, 2, 5, 6, 7]
```

## Lấy kết quả giao nhau giữa 2 mảng

```js
let arrA = [1, 4, 3, 2];
let arrB = [5, 2, 6, 7, 1];

arrA.filter(it => arrB.includes(it));
// kết quả: [1,2]
```

<a target="_blank" rel="noopener noreferrer" href="https://medium.com/@alex.permyakov/15-useful-javascript-examples-of-map-reduce-and-filter-74cbbb5e0a1f
">15 Useful JS Examples of map(), reduce() and filter()</a>
