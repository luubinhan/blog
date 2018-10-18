---
slug: "/2017-09-25-10-khai-niem-javascript-can-biet"
date: "2017-09-25"
title: "7 khái niệm JavaScript cần biết"
desc: "Một vài khái niệm căn bản trong javascript cần nắm nếu là frontend developer"
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

# Giá trị vs. Tham chiếu

5 kiểu dữ liệu được lưu trữ ở dạng **value** - giá trị: 

- **Boolean**
- **null**
- **undefined**
- **String**
- **Number**

Còn được gọi với tên khác là **primitive type**, khi copy giá trị của biến này cho biến khác, 2 giá trị này hoàn toàn độc lập không có liên hệ gì với nhau

```js
var x = 10;

var a = x;

a = a + 10;

console.log(a)
console.log(x)
```


3 kiểu dữ liệu được lưu trữ ở dạng **reference** - tham chiếu:

- **Array**
- **Function**
- **Object**

Gọi chung là kiểu *Object type*, nó không mang giá trị mà chỉ **tham chiếu** đến **vùng lưu trữ** của object đó trong bộ nhớ.

```js
var arr = [];
arr.push(1);

var refArr = arr;

refArr.push(2);

console.log(arr, refArrr)
```

# So sánh `==` và `===`

Khi thực hiện so sánh `=` trên biến kiểu tham chiếu, trả về `true` khi cả 2 biến số **cùng trỏ về một dùng nhớ** chứ không phải so sánh giá trị của 2 biến.

```js
var arrRef = ['Hi!'];
var arrRef2 = arrRef;

console.log(arrRef === arrRef2); // -> true

var arr1 = ['Hi!'];
var arr2 = ['Hi!'];

console.log(arr1 === arr2); // -> false
```

# Scope

## Global Scope

Biến toàn cục, trong javascript khi khai báo một biến không nằm trong một function nào cả, biến đó sẽ là biến toàn cục

```js
var name = "binh an";

console.log(name); // binh an

function logName(){
    console.log(name); 
}
logName(); // binh an
```

## Local scope

Biến khai báo bên trong function chỉ có hiệu lực trong function đó

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

# Block scope

Những câu khai báo như `if`, `switch`, `for`, `while` không giống như function, biến bên trong các câu khai báo này có phạm vi hoạt động trong function chứa nó.

```js
if (true) {
    // câu lệnh điều kiện 'if' không tạo ra một scope mới
    var name = 'Hammad'; 
    // name vẫn là global scope
}

console.log(name); // logs 'Hammad'
```

Trong ES6, để tránh sự nhập nhằng này, khai báo biến bằng `let`,`const` để biến chỉ được hiểu bên trong các khối `{}`

```js
if (true) {
    // name = global scope
    var name = 'Hammad';
    // likes = local scope
    let likes = 'Coding';
    // skills = local scope
    const skills = 'JavaScript and PHP';
}

console.log(name); // 'Hammad'
console.log(likes); 
// Uncaught ReferenceError: likes is not defined
console.log(skills); 
// Uncaught ReferenceError: skills is not defined
```

# Hoisting

Một đặc điểm của Javascript, biến có thể được **sử dụng trước, khai báo sau**! Viết như sau là hoàn toàn hợp lệ trong javascript

```js
x = 5; // gán giá trị 5 cho biến x chưa được khai báo

console.log(x);

var x; // khai báo biến x
```

Do đó luôn như khai báo biến local trước khi sử dụng, nếu không có thể xảy ra trường hợp sau

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
    age = 90;
    console.log(age);
}

showAge(); // 90

console.log(age) // 90
```

# Closure

Closure là một function bên trong một function khác truy cập tới các biến của function ngoài

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

Function bên trong vẫn có thể truy cập đến giá trị của biến nằm ở function ngoài ngay cả khí function ngoài đã return giá trị.


```js
function celebrityName(firstName) {
    var nameIntro = "This celebrity is ";
    // this inner function has access to the outer function's variables, including the parameter​
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

Tận dụng đặc điểm này của closure function chỉ lưu tham chiếu đến biến của function ngoài mà không lưu giá trị, ta có thể viết một function như class thế này

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

Đọc thêm chi tiết về bài viết clusure của mình trên mozilla.org  https://developer.mozilla.org/vi/docs/Web/JavaScript/Closures
