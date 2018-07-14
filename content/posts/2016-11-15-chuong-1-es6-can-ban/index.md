---
slug: "/2016-11-15-chuong-1-es6-can-ban"
date: "2016-11-15"
title: "ES6 Căn bản (phần 1) - Những nâng cấp cho Object"
desc: "Nếu bạn đã đọc bài FrontEnd Developer 2016 nên học gì? Chắc bạn đã rối không biết bắt đầu từ đâu nếu muốn dấn thân vào cuộc chơi nhiều cám dỗ này. Mình nghĩ cái đầu tiên cần học là ES6."
category: "javascript"
cover: ""
type: "post"
lesson: 1
chapter: 1
tags: ["javascript"]
---

Trong Series này

1. [Nâng cấp cho Object](2016-11-15-chuong-1-es6-can-ban)
2. [Arrow function](2016-11-16-chuong-2-es6-can-ban-arrow-function/)
3. [Assignment Destruction](2016-11-17-phan-3-es6-can-ban-assignment-destructuring)
4. [Rest parameters và spread operator](2016-11-18-phan-4-es6-can-ban-rest-parameters-va-spread-operator)
5. [Template literals](2016-11-19-phan-5-es6-can-ban-template-literals)
6. [Khai báo biến với let và const](2016-11-20-phan-6-es6-can-ban-khai-bao-let-const)
7. [Căn bản class](2016-11-21-phan-7-es6-can-ban-classes)

Một object trong javascript được khai như sau

```js
let book = {
 title: 'ES6',
 author: 'anluu',
 publisher: 'luckyluu'
}
```

Những nâng cấp cho Object trong ES6

# Cách viết tắt thay vì Key: Value 

Bình thường thì khai báo dạng giá trị của một object bằng `key: value`, bây giờ không cần `value` nữa, nếu `key` tham chiếu tới một biến hoặc hàm, nói cách khác là nếu nó cùng tên với hàm hoặc biến được định nghĩa trước đó

```javascript
var listeners = []
function listen() {}
var api = {listeners, listen}
```

object nhìn "sạch sẽ" hơn

```javascript
var store = {}
var api = { getItem, setItem, clear }
function getItem(key){
 return key in store ? store[key] : null
}
function setItem(key,value){
 store[key] = value
}
function clear(){
 store = {}
}
```

# Khi key là 1 biến hoặc hàm

Nếu cần khai báo `key` là một biến, nó không phải là một giá trị định sẵn, với ES5 thì sẽ viết như sau

```js
var expertise = 'journalism'
var person = {
 name: 'Sharon',
 age: '28'
}
person[expertise] = {
 years: 5,
 interests: ['international','politics','internet']
}
```

Với ES6 object key không nhất thiết phải là tên cố định, nó có thể là biến, đặt trong dấu `[]`

```js
var expertise = 'journalism'
var person = {
 name: 'Sharon',
 age: '28',
 [expertise]: {
  years: 5,
  interests: ['international','politics','internet']
 }
}
```

**Lưu ý** không nên kết hợp sử dụng giữa cả 2 cách viết trên cùng lúc, vì sẽ sinh ra lỗi và đọc rất khó hiểu

```js
var expertise = 'journalism'
var journalism = {
 years: 5,
 interest: ['international','politics','internet']
}
var person = {
 name: 'Sharon',
 age: '28',
 [expertise]
}
```

Tình huống thường sử dụng đến computed property name khi muốn thêm một entity vào một object map sử dụng entity.id như là key. Thay vì có câu khai báo thứ 3 để thêm grocery vào groceries map, chúng ta có thể viết khai báo inline nó trong groceries luôn

```javascript
var grocery = {
 id: 'bananas',
 name: 'Bananas',
 units: 6,
 price: 10,
 currency: 'USD'
}
var groceries = {
 [grocery.id]: grocery
}
```

Tình huống khác, khi có một hàm nhận một tham số truyền vào để tạo ra một đối tượng mới, đây là cách làm của ES5, tạo một object mới, khai báo các property động dựa vào tham số truyền vào, sau đó trả về object. Ví dụ hàm getEnvelope sẽ trả về type="error" với description khi có lỗi, type="success" + description khi mọi thứ ok

```javascript
function getEnvelope (type, description){
 var envelope = {
  data: {}
 }
 envelope[type] = description
 return envelope
}
```

Có thể viết bằng một dòng khai báo với computed property names

```javascript
function getEnvelope (type, description){
 return {
  data: {},
  [type]: description
 }
}
```
<h2>Định nghĩa một phương thức</h2>
Bình thường để định nghĩa một phương thức trong object

```javascript
var reserver = 4
var emitter = {
 emit: function(evenName){

 },
 get fuel(){
  return reserver
 },
 set fuel(value){
  reserver = value
 }
}
```

Hàm `set` và `get` thì vẫn giữ như cũ, phương thức có thể khai bảo mà không cần từ khóa `function`

```javascript
var reserver = 4
var emitter = {
 delete(){
   reserver = 0
 },
 get fuel(){
  return reserver
 },
 set fuel(value){
  reserver = value
 }
}
emitter.fuel = 10
emitter.delete()
```

Tức nhiên vẫn khai báo phương thức như bình thường được, cách khai bao mới này có vẻ hơi dễ lẫn lộn giữa phương thức và object, tất nhiên đây chỉ là thêm lựa chọn để viết chứ không khuyến khích viết theo kiểu này vì nhìn code không được tường minh.