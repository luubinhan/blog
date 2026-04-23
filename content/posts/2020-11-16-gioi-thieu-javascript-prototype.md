---
slug: "2020-11-16-gioi-thieu-javascript-prototype"
date: "2020-11-09"
title: "Nếu vỗ ngực xưng tên là một javascript developer sành sỏi, mà không giải thích được prototype inheritance thì thật là kỳ"
desc: ""
tags: ["javascript", "hoc-thuat"]
canonical_url: false
---

Khởi tạo một object trong JS bằng *object literal*

```js
const cat = { sound: 'Meow!', legs: 4 };
```

Nếu muốn sử dụng lại thuộc tính `legs` trên các object khác, chúng ta đưa `legs` vào một object *đặc biệt* `pet`

```js
const pet = { legs: 4 }

const cat = { sound: 'Meow!' }
```

Làm sao *inherit* từ một object khác? Câu trả lời là dùng **Prototype**

Nếu `pet` là một **prototype** của `cat`, khi đó `cat` sẽ có luôn property `legs`

> Khi khởi tạo object bằng cách viết *object literal*, chúng ta có thêm một property đặc biệt **`__proto__`** để set prototype cho object đó.

Với ví dụ trên, chúng ta sẽ làm như sau

```js
const pet = { legs: 4 }
const cat = { sound: 'Meow!', __proto__: pet }
cat.legs; // => 4
```

Property `sound`, chỉ tồn tại trong `cat`, người ta gọi tên nó là **Own Property** (property này là của anh, do anh tạo ra, anh không thừa hưởng từ bất kỳ ai).

```js
cat.hasOwnProperty('sound'); // true;
cat.hasOwnProperty('legs'); // false
```


![Inherited property from the prototype in JavaScript](https://dmitripavlutin.com/static/9d6c9ba5235b280e315068f7c98bc16a/360ab/Selection_013.png)

> Bạn có thể sẽ thắc mắc, tại sao lại sinh ra `inheritance` trong JS lằng nhằng thế ?

Vì bản chất JS ngày xưa không hỗ trợ `class`.

```js
const pet = { legs: 4 };

const cat = { sound: 'Meow!', __proto__: pet };
const dog = { sound: 'Bark!', __proto__: pet };
const pig = { sound: 'Grunt!', __proto__: pet };
```

> Sử dụng `__proto__` không còn được chấp nhận, thay vào đó hay dùng `Object.create()`

```js
const pet = { legs: 4 };
const cat = Object.create(pet);
cat.sound = 'Meow!';
```

**Nhưng giờ JS đã có class đúng không?**

Đúng, giờ có class bạn có thể viết

```js
class Pet {
  legs = 4;

  constructor(sound) {
    this.sound = sound;
  }
}

const cat = new Pet('Moew!');

cat.legs;           // => 4
cat instanceof Pet; // => true
```

Bên dưới, code trên sẽ được viết lại (bằng babel) gần giống thế này

```js
const pet = {
  legs: 4
};

function CreatePet(sound) {
  return { sound, __proto__: pet };
}
CreatePet.prototype = pet;

const cat = CreatePet('Moew!');

cat.legs;                 // => 4
cat instanceof CreatePet; // => true
```

Bạn có thể sẽ thấy hơi bối rối, nếu bạn có nền tảng từ những ngôn ngữ có hỗ trợ class *ngay trong trứng* như Java hay PHP, không sao cả, ai cũng cần thời gian để tiếp thu những kiến thức mới.

[What Makes JavaScript JavaScript? Prototypal Inheritance](https://dmitripavlutin.com/javascript-prototypal-inheritance/)
