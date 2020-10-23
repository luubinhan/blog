---
slug: '2020-10-22-import-lodash-sao-cho-dung'
date: '2020-10-22'
title: '3 cách xóa phần tử bị duplicate trong mảng'
desc: 'Nâng cao kỹ năng xử lý mảng và object không bao giờ là dư thừa'
tags: ['thuat-thuat', 'javascript']
canonical_url: false
---


Nếu phần tử trong mảng chỉ là kiểu *primitive* thì rất đơn giản nếu muốn xóa tất cả phần tự bị trùng

```js
const values = ['a','b','c','a']

const uniqueValues = [...new Set(values)];
```

Còn nếu phần tử trong mảng là `object` thì ta làm sao?

```js
const members = [
  {
    first: 'Jane',
    last: 'Bond',
    id: '10yejma',
  },
  {
    first: 'Lars',
    last: 'Croft',
    id: '1hhs0k2',
  },
  {
    first: 'Jane',
    last: 'Bond',
    id: '1y15hhu',
  },
];
```

## Cách 1: tạo mảng mới ko chứa phần tử bị trùng

```js
function containsMember(memberArray, member) {
    return memberArray.find(m => m.first === member.first && m.last === member.last)
}

const uniqueValues = [];

for	(const m of members) {
    if (!containsMember(uniqueValues, m)) {
        uniqueValues.push(m);
    }
}
```

## Cách 2: dùng `filter()`

```js
function getIndexOfMember(memberArray, member) {
    return memberArray.findIndex(m => m.first === member.first && m.last === member.last)
}

const uniqueValues = members.filter((m, index, ms) => getIndexOfMember(ms, m) === index);
```

## Cách 3: sử dụng Map

```js
const uniqueKeyToMember = new Map(members.map(m => [m.first+'\t'+m.last, m]));

const uniqueMembers = [...uniqueKeyToMember.values()]; 
```

[Eliminating duplicate objects: three approaches](https://2ality.com/2020/07/eliminating-duplicate-objects.html)



