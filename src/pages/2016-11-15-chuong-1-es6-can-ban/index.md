---
path: "/2016-11-15-chuong-1-es6-can-ban"
date: "2016-12-04T13:35:13.234Z"
title: "Chương 1: ES6 Căn bản (phần 1) - Những nâng cấp cho Object"
desc: "Nếu bạn đã đọc bài FrontEnd Developer 2016 nên học gì? Chắc bạn đã rối không biết bắt đầu từ đâu nếu muốn dấn thân vào cuộc chơi nhiều cám dỗ này. Mình nghĩ cái đầu tiên cần học là ES6."
tags: ["Javascript"]
---

# Những nâng cấp cho Object

Một object trong javascript được khai như sau

```javascript
var book = {
 title: 'ES6',
 author: 'anluu',
 publisher: 'luckyluu'
}
```

Những nâng cấp trong ES6
<h2>Property Value Shorthands</h2>
Bình thường thì khai báo dạng <code>property: value</code>, bây giờ không cần <code>value</code> nữa, nếu <code>property</code> là tham chiếu tới một biến hoặc hàm

```javascript
var listeners = []
function listen() {}
var api = {listeners, listen}
```

Giúp rút object nhìn "sạch sẽ" hơn

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
<h2>Computed Property Names</h2>
Nếu cần khai báo <code>property</code> là một biến, nó không phải là một giá trị định sẵn, với ES5 thì sẽ viết như sau

```javascript
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

Với ES6 property của object không nhất thiết phải là tên cố định, nếu là một biến chỉ việc wrap nó lại trong dấu []. Như ví dụ trên có thể viết lại

```javascript
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

<strong>Lưu ý</strong> không nên kết hợp sử dụng giữa property value shorthand và computed property name vì sẽ sinh ra lỗi và đọc rất khó hiểu

```javascript
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

Với ES6, với hàm set và get thì vẫn giữ như cũ, phương thức có thể khai bảo mà không cần từ khóa function

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

Tức nhiên vẫn khai báo phương thức như bình thường được, cách khai bao mới này có vẻ hơi dễ lẫn lộn giữa phương thức và object, tất nhiên đây chỉ là thêm option để viết chứ không khuyến khích viết theo kiểu này vì nhìn code không được tường minh.

Chương sau, <a href="https://luckyluu.wordpress.com/2016/11/16/chuong-1-es6-can-ban-phan-2/">Arrow Function</a>, một trong nhưng phương thức mới siêu cool mà bạn sẽ sử dụng rất nhiều.