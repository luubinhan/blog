---
slug: "/2021-08-10-javascript-prototype-object"
date: "2021-08-10"
title: "Prototype của object"
desc: ""
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "hoc-thuat", "medium"]
---

Khi chúng ta `console.log` một object của JS, sẽ thấy một property ẩn đặc biệt `[[Prototype]]`, nó có thể là `null` hoặc là trỏ đến một object khác

```bash
object a => [[Prototype]] => prototype object b
```

Điều này có nghĩa là object a kế thừa từ object b, b có gì thì a sẽ có đó

Chúng ta không thể truy xuất trực tiếp thông qua `[[Prototype]]`, mà thông qua các phương pháp khác

```js
let animal = {
    eats: true,
    walk() {
        alert("Animal walk");
    }
}

let rabbit = {
    jumps: true,
	// highlight-next-line    
    __proto__: animal
}

// hoặc khai báo bằng
// highlight-next-line
rabbit.__proto__ = animal;

console.log(rabbit.eats);
// => true;

rabbit.walk();
```

> `__proto__` != `[[Prototype]]`

Về bản chất, `__proto__` không phải là property `[[Prototype]]`, chính xác thì nó là getter/setter của `[[Prototype]]`

Thời điểm hiện tại, không khuyến khích dùng `__proto__`, thay vào đó dùng `Object.getPrototypeOf/Object.setPrototypeOf`

```js
let user = {
    name: "John",
    surname: "Smith",
    
    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    },
    
    get fullName() {
        return `${this.name} ${this.surname}`;
    }
}

let admin = {
    __proto__: user,
    isAdmin: true
}

alert(admin.fullName);
// => John Smith

admin.fullName = "Alice Cooper";

// highlight-next-line
alert(admin.fullName);
// => Alice Cooper

// highlight-next-line
alert(user.fullName);
// => John Smith
```

Khi dùng prototype, không trực tiếp thay đổi property ở object cha từ object con, việc này cần thông qua một hàm setter để đảm bảo dữ liệu sẽ độc lập trên từng object.

Như ví dụ trên, `this` lúc này đang trỏ đến object phía trước dấu `.`, nên dữ liệu hoàn toàn độc lập, trong khi các phương thức thì share với nhau

## Vòng lặp `for...in`

```js
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

// highlight-next-line
alert(Object.keys(rabbit));
// jumps

// highlight-next-line
for(let prop in rabbit) alert(prop); 
// jumps, then eats
```

Nếu không muốn chạy qua các `property` kề thừa qua `__prototype__`, sử dụng `obj.hasOwnProperty(key)` để xác định 1 property của được kế thừa hay không

```js
for(let prop in rabbit) {
  // highlight-next-line
  let isOwn = rabbit.hasOwnProperty(prop);

  if (isOwn) {
    alert(`Our: ${prop}`);
    // Our: jumps
  } else {
    alert(`Inherited: ${prop}`);
    // Inherited: eats
  }
}
```

Một điều thú vị, nếu để ý chúng ta không hề khai báo `rabbit.hasOwnProperty`, vậy nó từ đâu mà có? và nó cũng không xuất hiện bên trong vòng lặp `for...in`?

Đây là một property kế thừa từ `Object` chúa, và nó đã được khai báo decriptor với giá trị `enumerable: false`

Đọc lại bài [decriptor](https://vuilaptrinh.com/2021-08-07-huong-dan-khoa-object-khong-cho-thay-doi/)

## Object.prototype

Xét qua ví dụ

```js
let obj = {}
console.log( obj )
// => "[object Object]"
```

Bạn có bao giờ thắc mắc tại sao lại có kết quả `[object Object]`? `obj` là một object rỗng mà?

Thật ra, `obj = {}` sẽ tương đương với `obj = new Object()`, tức là, chúng ta khởi tạo một object thông qua việc gọi một constructor function, và nó sẽ kế thừa tất cả property, phương thức từ `Object`, như `toString`, `[[Prototype]]`

Khi gọi `obj.toString()` có nghĩa là chúng ta đang gọi đến phương thức `Object.prototype.toString`

```js
let obj = {}

console.log(obj.__proto__ === Object.prototype)
// => true

console.log(obj.toString === obj.__proto__.toString)
// => true

console.log(obj.toString === Object.prototype.toString)
// => true
```

> Tất cả những object khác như `Array`, `Date`, `Function` đều kế thừa từ `Object`

```js
let arr = [1, 2, 3];

alert( arr.__proto__ === Array.prototype );
// true

alert( arr.__proto__.__proto__ === Object.prototype );
// true
```

![](https://javascript.info/article/native-prototypes/console_dir_array.png)

## Tóm tắt

- Mỗi object sẽ chứa một property đặc biệt `[[Prototype]]`, giá trị là null, hoặc trỏ đến một object khác
- Sử dụng `obj.__proto__` để truy cập
- `this` luôn trỏ đến obj hiện tại thay vì prototype object
- `for..in` sẽ chạy qua tất cả property chính chủ và property được kế thừa
- Tất cả những object build-in (như Array, Object, Date) đều lưu các phương thức bên trong property `prototype` (Array.prototype, Object.prototype, Date.prototype)

Javascript.info

