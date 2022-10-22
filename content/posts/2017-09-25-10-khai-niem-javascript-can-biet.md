---
slug: "/2017-09-25-10-khai-niem-javascript-can-biet"
date: "2017-09-25"
title: "7 khái niệm JavaScript cần biết"
desc: "Một vài khái niệm căn bản trong javascript cần nắm nếu bạn là frontend developer"
category: "javascript"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react"]
---

<!-- TOC -->

- [Giá trị vs. Tham chiếu](#giá-trị-vs-tham-chiếu)
- [So sánh `==` và `===`](#so-sánh--và-)
- [Scope](#scope)
  - [Global Scope](#global-scope)
  - [Local scope](#local-scope)
- [Block scope](#block-scope)
- [Hoisting](#hoisting)
- [Closure](#closure)

<!-- /TOC -->

## Giá trị # Tham chiếu

5 kiểu dữ liệu được lưu trữ ở dạng **giá trị** - **primitive type**:

- **Boolean**
- **null**
- **undefined**
- **String**
- **Number**

Khi *copy* giá trị của biến này cho biến khác, 2 giá trị này hoàn toàn độc lập không có liên hệ gì với nhau

```js
var x = 10;

var a = x;

a = a + 10;

console.log(a)
console.log(x)
```


3 kiểu dữ liệu được lưu trữ ở dạng **tham chiếu** - **Object type**:

- **Array**
- **Function**
- **Object**

Nó không mang giá trị mà chỉ **tham chiếu** đến **vùng lưu trữ** của đối tượng đó trong bộ nhớ.

```js
var arr = [];
arr.push(1);

var refArr = arr;

refArr.push(2);

console.log(arr, refArrr)
```

## So sánh `==` và `===`

Khi thực hiện so sánh `=` trên biến kiểu tham chiếu, trả về `true` khi cả 2 biến số **cùng trỏ về một dùng nhớ** chứ không phải so sánh giá trị của 2 biến.

```js
var arrRef = ['Hi!'];
var arrRef2 = arrRef;

console.log(arrRef === arrRef2); // -> true

var arr1 = ['Hi!'];
var arr2 = ['Hi!'];

console.log(arr1 === arr2); // -> false
```

## Scope - khu vực hoạt động, phạm vi lãnh thổ

### Global Scope - công dân toàn cầu

Nếu là một biến có phạm **lãnh thổ** là **global scope**, điều đó có nghĩa anh ấy là công dân toàn cầu, hàng ngôi sao quốc tế, ai cũng biết anh ấy là ai.

```js
var name = "luckyluu";

console.log(name); // luckyluu

function logName(){
    console.log(name);
}
logName(); // luckyluu
```

### Local scope

Nếu anh bạn tên "biến" của chúng ta chỉ là vô danh tiểu tốt, local scope, thì anh ấy chỉ được biết đến bởi *dân địa phương*, nơi anh ấy đăng ký hộ khẩu thường trú.

```js
// Global Scope
function someFunction() {
    // Local Scope #1
    function someOtherFunction() {
        // Local Scope #2
    }
}

// Global Scope
function anotherFunction() {
    // Local Scope #3
}
// Global Scope
```

### Block scope

Những câu khai báo như `if`, `switch`, `for`, `while` không giống như `function` bình thường, anh bạn *biến* lúc này con được biết đến ở *toàn tỉnh* do nhà anh ấy nằm thuộc diện cocc

```js
if (true) {
    // câu lệnh điều kiện 'if' không tạo ra một scope mới
    var name = 'Con ông If';
    // name vẫn là global scope
}

console.log(name); // logs 'Con ông If'
```

Trong ES6, để tránh sự nhập nhằn này, khai báo biến bằng `let`,`const` chớ có dại dùng `var` để khai báo.

```js
if (true) {
    // name = global scope
    var name = 'Con ông If';
    // likes = local scope
    let likes = 'luckyluu';
    // skills = local scope
    const skills = 'JavaScript and PHP';
}

console.log(name); // 'Con ông If'
console.log(likes);
// Uncaught ReferenceError: likes is not defined
console.log(skills);
// Uncaught ReferenceError: skills is not defined
```

## Hoisting

Một đặc điểm của Javascript, biến có thể được **sử dụng trước, khai báo sau**! Viết như sau là hoàn toàn hợp lệ trong javascript

```js
// gán giá trị 5 cho biến x chưa được khai báo
x = 5;

console.log(x);

// khai báo biến x
var x;
```

Do đó **luôn như khai báo biến trước khi sử dụng** là  nguyên tắc gối đầu của mọi frontend developer, nếu không có thể xảy ra trường hợp sau

```js
​var name = "Michael Jackson";
​
​function showCelebrityName () {
    console.log (name);
}
​
​function showOrdinaryPersonName () {
    name = "Johnny Evers";
    console.log (name);
}
showCelebrityName (); // Michael Jackson​​
​
showOrdinaryPersonName (); // Johnny Evers​
​
// biến toàn cục name giờ đây sẽ bị change giá trị thành Johnny Evers ​
showCelebrityName (); // Johnny Evers​
​
​// luôn nhớ khai báo biến bằng var,let,const
​function showOrdinaryPersonName () {
    var name = "Johnny Evers";
    console.log (name);
}
```

Thậm chí khi khai báo biến kèm giá trị cho nó mà không dùng từ khóa `var`, biến đó sẽ trở thành biến toàn cục

```js
function showAge(){
    age = 90; // nực cười chưa
    console.log(age);
}

showAge(); // 90

console.log(age) // 90
```

## Closure

Closure ám chỉ một cơ chế hoạt động, một function bên trong một function khác lại **truy cập được** các biến của function ngoài, nghĩa là nó vi phạm nguyên lý biến không cùng **scope** thì KO được dò xét lẫn nhau, chuyện này lại **làm được** nếu 2 function nó là cha con với nhau.

```js
function showName (firstName, lastName) {
    ​var nameIntro = "Your name is ";
    ​function makeFullName () {
        ​return nameIntro + firstName + " " + lastName;
    }
    ​
    ​return makeFullName ();
}
​
showName ("Michael", "Jackson");
// Your name is Michael Jackson
```

Như vậy chưa đủ quá đáng, nó còn có thể truy cập **ngay cả khi function ngoài (cha) đã return**

```js
function celebrityName(firstName) {
  var nameIntro = "This celebrity is ";
  ​
  function lastName(theLastName) {
      return nameIntro + firstName + " " + theLastName;
  }
  return lastName;
}
​
​var mjName = celebrityName("Michael");
​
var result = mjName("Jackson");
// This celebrity is Michael Jackson
```

Tận dụng đặc điểm này của closure function, tạm gọi là cha truyền con nối, lưu tham chiếu đến biến của function ngoài mà không lưu giá trị, ta có thể viết một function như class thế này

```js
function celebrityID(){
    var celebrityID = 999;
    return{
        getID: function(){
            return celebrityID;
        },
        setID: function(theNewID){
            celebrityID = theNewID;
        }
    }
}

var myID = celebrityID();
myID.getID(); // return 999
myID.setID(567);
myID.getID(); // return 567
```

Đọc thêm chi tiết về bài viết clusure của mình trên [mozilla.org](https://developer.mozilla.org/vi/docs/Web/JavaScript/Closures)
