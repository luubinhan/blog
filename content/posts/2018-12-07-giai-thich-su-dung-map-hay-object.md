---
slug: "/2018-12-07-giai-thich-su-dung-map-hay-object"
date: "2018-12-07"
title: "Map và Object trong Javascript"
desc: "Kẻ tám lạng người nữa cân"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "mobile-web-specialist", "hoc-thuat"]
---


<!-- TOC -->

- [key](#key)
- [Thứ tự các element](#thứ-tự-các-element)
- [Khởi tạo](#khởi-tạo)
- [Lấy giá trị](#lấy-giá-trị)
- [Thêm một element](#thêm-một-element)
- [Xóa element](#xóa-element)
- [Lấy `size` (hay length)](#lấy-size-hay-length)
- [Loop](#loop)
- [Khi nào dùng `Map`, khi nào dùng `Object`](#khi-nào-dùng-map-khi-nào-dùng-object)

<!-- /TOC -->


`Map` có thể coi là con đẻ của `Object`, nó kế thừa, cắt bỏ, bổ sung một số thứ trong Object

```js
var map = new Map([[1,2],[3,4]]);
console.log(map instanceof Object); //true

var obj = new Object();
console.log(obj instanceof Map); //false
```

Mỗi phần tử trong Map được lưu theo cặp `key: value`, các giá trị `key` này cũng là duy nhất trong Map, không có trường hợp được lặp lại, giống Object thôi, phần khác nhau sẽ được đề cặp ở dưới.

Nói về cái tên Map một chút, vì mang các đặc điểm rất giống với World Map, Street Map. Chữ `Map` được dùng trong các trường hợp cần tìm nhanh dữ liệu, vì các giá trị trên Map là duy nhất.

Ví dụ bản đồ TP.HCM thì tất cả các con đường là khác nhau (do hết tên anh hùng nên nhiều khi đặt trùng trên một số quận, vụ này không tính nhé), bản đồ thế giới thì mỗi nước là duy nhất trên bản đồ.

Giờ nói các điểm khác nhau nè

## key

Key của `Object` chỉ có thể là `String` hoặc `Integer`

Key trong `Map` có thể là một `Object`, `Array`, `Function`, nói chung không giới hạn

## Thứ tự các element

Trong Map **thứ tự các element là cố định**, ngược lại so với Object

```js
var myObject = {
    z: 1,
    '@': 2,
    b: 3,
    1: 4,
    5: 5
};
console.log(myObject) 
// Object {1: 4, 5: 5, z: 1, @: 2, b: 3}

for (item in myObject) {...
// 1
// 5
// z
// @
// b
```

Thứ tự các phần trong object không quan trọng, khi `for...in` qua các phần tử trên object, tùy theo enzine của trình duyệt, thứ tự này có thể khác nhau

```js
var myObject = new Map();
myObject.set('z', 1);
myObject.set('@', 2);
myObject.set('b', 3);
for (var [key, value] of myObject) {
  console.log(key, value);
}
// z 1
// @ 2
// b 3
```

Thứ tự khi chạy `for...of` trên Map luôn đúng theo thứ tự đã thêm

## Khởi tạo 

Với Oject ta có một số cách để khởi tạo

```js
var obj = {};

// bằng constructor
var obj = new Object();
var obj = new Object; 
// cùng kết quả như trên

// dùng Object.prototype.create
var obj = Object.create(null);
```

> Dùng `Object.create` để tạo object mới **kế thừa* từ một object khác.

```js
var Vehicle = {
    type: "General",
    display: function() {
        console.log(this.type);
    }
}

// Car sẽ kế thừa các property của Vehicle
var Car = Object.create(Vehicle);
// overwrite lại giá trị type
Car.type = "Car"; 
Car.display(); // "Car"

Vehicle.display();
// vẫn là "General"
```

Cũng tương tự như Array, chúng ta không dùng constructor nhiều vì nó tốn tài nguyên (và lười đánh máy dài)

Với `Map` chúng ta sẽ **chỉ có duy nhất một cách để khởi tạo** bằng constructor `new Map`

```js
var map = new Map();
var map = new Map( [[1,2], [2,3]] ); 
// map = {1=>2, 2=>3}
```

## Lấy giá trị

Lấy một giá trị trong Map thông qua `Map.prototype.get(key)`

```js
map.get(keyName);
```

Object thì cũng có vài đường

```js
obj.keyName
obj['keyName']
```

Kiểm tra element có tồn tại trong Map dễ hơn chút so với Object

```js
// Map
map.has(keyName);

// object
var isExist = obj.keyName === undefined
// hoặc
var isExist = 'keyName' in obj;
// kiểm tra property trường hợp ko phải kế thừa từ object cha
obj.hasOwnProperty(keyName)
```

## Thêm một element

```js
// Map

map.set(4,5); // cặp giá trị key, value

// Object
obj['gender'] = 'female';
obj.gender = 'male'; 
```

## Xóa element

Object không có phương thức để xóa một element, chúng ta dùng operator `delete`

```js
delete obj.keyName;
```

Chỗ này cũng sẽ có nhiều tranh luận quanh vấn đề performance, một số quan điểm cho là làm như bên dưới tốt hơn

```js
obj.keyName = undefined;
```

Nhưng đây rõ ràng là 2 cách làm khác nhau, nếu `delete` là xóa hẳn, thì cách sau là gán `key` đó với giá trị `undefined`, đồng nghĩa với việc khi `for..in` nó vẫn chạy qua element đó.

Map thì có các hàm sẵn để làm chuyện xóa element

```js
// trả về true/false
var isDeleteSuccessed = map.delete(keyName);
// xóa sạch
map.clear(); // {}
```

## Lấy `size` (hay length)

```js
// Object không có trực tiếp mà phải gọi hàm keys
Object.keys(obj).length;
// Map, rất đơn giản
map.size;
```

## Loop

> Một trong những khác biệt đáng chú ý nhất mà bạn nên cân nhắc dùng `Map` thay vì `Object`

Kiểm tra xem kiểu dữ liệu có là dạng `iterable` (loop được)

```js
console.log(typeof obj[Symbol.iterator]); 
// > undefined

console.log(typeof map[Symbol.iterator]); 
// > function
```

Nghĩa là chúng ta có thể dùng `for...of` trên `Map`, `Object` chỉ có thể `for...in`

```js
//For map: { 2=>3, 4=>5}
for (const item of map){
console.log(item); 
// Array[2,3]
// Array[4,5]

for (const [key,value] of map){
console.log(`key: ${key}, value: ${value}`);
//key: 2, value: 3
//key: 4, value: 5
```

Hoặc `forEach`

```js
map.forEach((value, key) => console.log(`key: ${key}, value: ${value}`));
// key: 2, value: 3
// key: 4, value: 5
```

Trong Object thậm chí là khi ta dùng `for..in` cũng không thể dùng trực tiếp `value` mà phải viết `obj[key]`

```js
{id: 1, name: "test"}
for (var key in obj) {
console.log(`key: ${key}, value: ${obj[key]}`);
// key: id, value: 1
// key: name, value: test
```

## Khi nào dùng `Map`, khi nào dùng `Object`

Mặc dù nãy giờ đọc thì bạn sẽ thấy `Map` quá ư thần thánh, vậy tại sao ta không dẹp luôn Object?

- Trường hợp mà các giá trị key của chúng ta nó chỉ là `integer`, `string`, truy xuất một element trong object bằng key là **nhanh nhất**, trong khi `Map.prototype.get` là một function thì nó phải tốn chút tính toán

- Hoặc trường hợp chúng ta có các element phụ thuộc lẫn nhau như bên dưới

```js
var obj = {
    id: 1, 
    name: "It's Me!", 
    print: function() { 
         `Object Id: ${this.id}, with Name: ${this.name}`;
    }
}
```

Với `Map`? đơn giản là hổng làm được.

JSON bản thân đã hỗ trợ Object, xài luôn Object chứ không cần convert qua chi.


<a target="_blank" rel="noopener noreferrer" href="https://medium.com/front-end-hacking/es6-map-vs-object-what-and-when-b80621932373">ES6 — Map vs Object — What and when?</a>
