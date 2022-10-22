---
slug: "/2019-03-23-thu-thuat-lam-viec-voi-object"
date: "2019-03-23"
title: "8 thủ thuật khi làm việc với Object sử dụng resting và spreading"
desc: "Những đoạn code bỏ túi hay xài nhất khi đụng tới object"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react"]
---

<!-- TOC -->

- [Merge object](#merge-object)
- [Thêm property](#th%C3%AAm-property)
- [Thêm property khi thõa điều kiện](#th%C3%AAm-property-khi-th%C3%B5a-%C4%91i%E1%BB%81u-ki%E1%BB%87n)
- [Xóa property khỏi object](#x%C3%B3a-property-kh%E1%BB%8Fi-object)
- [Xóa property với key chỉ định](#x%C3%B3a-property-v%E1%BB%9Bi-key-ch%E1%BB%89-%C4%91%E1%BB%8Bnh)
- [Sắp xếp property](#s%E1%BA%AFp-x%E1%BA%BFp-property)
- [Property mặc định](#property-m%E1%BA%B7c-%C4%91%E1%BB%8Bnh)
- [Đổi tên property](#%C4%91%E1%BB%95i-t%C3%AAn-property)

<!-- /TOC -->

## Merge object

`part1` và `part2` sẽ được merge vào `user1`


```js
const part1 = { id: 100, name: 'An Luu' }
const part2 = { id: 100, password: 'Password!' }

const user1 = { ...part1, ...part2 }
//=> { id: 100, name: 'An Luu', password: 'Password!' }
```

## Thêm property

Clone một object đồng thời thêm một số property mới vào object mới clone

```js
const user = { id: 100, name: 'An Luu'}
const userWithPass = { ...user, password: 'Password!' }

user //=> { id: 100, name: 'An Luu' }
userWithPass //=> { id: 100, name: 'An Luu', password: 'Password!' }
```


## Thêm property khi thõa điều kiện

Trường hợp này hay dùng nhất là lúc chúng ta truyền lên API một object, nếu thõa điều kiện, sẽ thêm một số property vào trong object

```js
const user = { id: 100, name: 'An Luu' }
const password = 'Password!'
const userWithPassword = {
  ...user,
  id: 100,
  ...(password && { password })
}

userWithPassword //=> { id: 100, name: 'An Luu', password: 'Password!' }
```


## Xóa property khỏi object

```js
// hàm này sẽ trả về object mới ko bao gồm password
const noPassword = ({ password, ...rest }) => rest

const user = {
  id: 100,
  name: 'An Luu',
  password: 'Password!'
}

noPassword(user) //=> { id: 100, name: 'An Luu' }
```


## Xóa property với key chỉ định

```js
const user1 = {
  id: 100,
  name: 'An Luu',
  password: 'Password!'
}

const removeProperty = prop => ({ [prop]: _, ...rest }) => rest
//                     ----       ------
//                          \   /
//                dynamic destructuring

const removePassword = removeProperty('password')
const removeId = removeProperty('id')

removePassword(user1) //=> { id: 100, name: 'An Luu' }
removeId(user1) //=> { name: 'An Luu', password: 'Password!' }

```


## Sắp xếp property

Đôi khi chúng ta sẽ muốn thay đổi các property theo một thứ tự nào đó, nếu sắp xếp toàn bộ luôn thì chắc dùng `Object.keys` rồi thay xếp cái mảng key này lại.


Để di chuyển `id` lên đầu, trước hết gán giá trị `undefined` cho nó trước, sau đó, override lại giá trị này bằng cách resting

```js
const user3 = {
  password: 'Password!',
  name: 'An Luu',
  id: 300
}

const organize = object => ({ id: undefined, ...object })
//                            -------------
//                          /
//  dời id lên đầu

organize(user3)
//=> { id: 300, password: 'Password!', name: 'An Luu' }
```

Còn di chuyển xuống dưới cùng


```js
const user3 = {
  password: 'Password!',
  name: 'An Luu',
  id: 300
}

const organize = ({ password, ...object }) =>
  ({ ...object, password })
//              --------
//             /
// dời password xuống cuối

organize(user3)
//=> { name: 'An Luu', id: 300, password: 'Password!' }
```


## Property mặc định

Ví dụ, `user2` không có chứa `quotes`, hàm `setDefaults` đảm bảo tất cả object đều chứa property là `quotes`, nếu ko nó thêm vào `[]`

```js
const user2 = {
  id: 200,
  name: 'An Luu'
}

const user4 = {
  id: 400,
  name: 'You',
  quotes: ["I've got a good feeling about this..."]
}

const setDefaults = ({ quotes = [], ...object}) =>
  ({ ...object, quotes })

// hoặc nếu muốn dời thằng quotes lên đầu
// const setDefaults = ({ ...object}) => ({ quotes: [], ...object })

setDefaults(user2)
//=> { id: 200, name: 'An Luu', quotes: [] }

setDefaults(user4)
//=> {
//=>   id: 400,
//=>   name: 'You',
//=>   quotes: ["I've got a good feeling about this..."]
//=> }
```


## Đổi tên property

Thí dụ bạn ko muốn trong object chứa property `ID`, nó phải viết thường `id`, đầu tiên chúng ta remove ID ra khỏi object, sau đó add lại bằng tên là `id`


```js
const renamed = ({ ID, ...object }) => ({ id: ID, ...object })

const user = {
  ID: 500,
  name: "An Luu"
}

renamed(user) //=> { id: 500, name: 'An Luu' }
```


<a target="_blank" rel="noopener noreferrer" href="https://blog.bitsrc.io/6-tricks-with-resting-and-spreading-javascript-objects-68d585bdc83">7 Tricks with Resting and Spreading JavaScript Objects</a>
