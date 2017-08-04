---
path: "/2016-11-17-phan-3-es6-can-ban-assignment-destructuring"
date: "2016-11-17T13:35:13.234Z"
title: "Hồi 3: ES6 căn bản - Truy cập phần tử"
desc: "Hồi 3 trong series ES6 căn bản, nói về Assignment Destructuring"
tags: ["javascript"]
---

<!-- MarkdownTOC -->

    - Truy cập các phần tử của `Objects`
- Truy cập các phần tử của `Arrays`
    - Truy cập các phần tử `Parameters` của `Function`
    - Ứng dụng

<!-- /MarkdownTOC -->


## Truy cập các phần tử của `Objects`

Tưởng tượng ta có nhân vật Bruce với mật danh Batman được định nghĩa như sau

```js
var character = {
 name: 'Bruce',
 pseudonym: 'Batman',
 metadata: {
  age: 34,
  gender: 'male'
 },
 batarang: ['gas pellet','bat-mobile control','bat-cuffs']
}
```

Nếu bạn muốn biến `pseudonym` tham chiếu đến `character.pseudonym`, với ES5

```js
var pseudonym = character.pseudonym
```

Với ES6 ta có thể viết đoạn trên thành

```js
var {pseudonym} = character
```

Cái này được gọi là `Destructuring object`, nếu muốn khai báo nhiều biến như thế này tham chiếu tới key của object *character*, thêm dấu `,` giữa mỗi biến

```js
var {pseudonym, name} = character
```

Nếu muốn tham chiếu đến key là `pseudonym` nhưng lại muốn đặt tên biến là `alias`

```js
var { pseudonym: alias } = character
console.log( alias )
// The same with: alias = character.pseudonym
```

Nếu đặt giữa dấu `{}` là đang truy xuất tới key bên dưới `pseudonym` chứ ko phải đặt alias. Khi `gender` chưa được định nghĩa, mặc định sẽ trả về `undefined`

```js
var { pseudonym: {gender} } = character
```

Nếu kết hợp sử dụng alias và giá trị mặc định, viết tên alias trước rồi tới giá trị mặc định

```js
var { boots: footwear = true  } = character
```

Sử dụng kết hợp với `Computed Property`, trong trường hợp này bắt buộc đặt alias

```js
var person =  { scientist: true }
var type = 'scientist'
var { [type]: value } = person
console.log(value)
```

Câu này thì biết vậy thôi chứ ko cần dùng vì nó khó đọc hơn cách viết cũ `value = person[type]`

# Truy cập các phần tử của `Arrays`

```js
var coordinates = [12,-7]
var [x,y] = coordinates
```

Tương tự như object, khác ở chổ thay vì rào hay tham biến bằng `{}`  thì rào nó vào `[]`, câu trên tương tự với `x = coordinates[0], y = coordinates[1]`

Để bỏ qua một giá trị trong mảng không muốn tham biến tới, bỏ trống

```js
var coordinates = [12,-7,20]
var [x,,z] = coordinates
```

Tham biến giá trị mặc định lúc khởi tạo

```
var coordinates = [12,-7,20]
var [x,,z = 30] = coordinates
console.log(z)
// z=30
```

Trong ES5 để hoán đổi giá trị của 2 biến nào đó mình sẽ thêm một biến nữa để lưu tạm giá trị

```js
var left = 5
var right = 7
var tempt = left
left = right
right = tempt
```

Viết lại thế này với ES6

```js
var left = 5
var right = 7
[left, right] =  [right,left]
```

## Truy cập các phần tử `Parameters` của `Function`

Cái này thì cũ rồi mà giờ mới có nè, giá trị mặc định cho `parameter`

```js
function powerOf( base, exponent = 2 ){
    return Math.pow(base, exponent)
}
```

Sử dụng với `Arrow function`, trường hợp này luôn luôn kẹp vào `()` dù chỉ có một tham số

```js
var double = (input = 0) => input * 2
function sumOf ( a = 1, b = 2, c = 3){
 return a + b + c
}
```

Truyền vào tham số là một `object` chứa nhiều `key`, định giá trị mặc định cho `key` của `object`

```js
function carFactory( options = { brand: "Suzuki", year: 1989 }){
 console.log(options.brand)
 console.log(options.year)
}
```

Để ý là nếu truyền vào `object` chỉ một `key`, thì toàn bộ `key` mặc định cũng mất, ví dụ như **options** ở trên chỉ truyền vào **year** thì cái **brand* mất

```js
carFactory({year: 2000})
```

Cách tốt nhất là nên truyền vào theo kiểu từng phần tử, không dùng `object` **options**, sửa lại hàm ở trên thành

```js
function carFactory({brand = "Suzuki", year = 1999 } = {} ) {
}
carFactory({year: 2000})
```

## Ứng dụng

Khi một hàm cần trả về `object` hoặc `array`. Ví dụ hàm bên dưới trả về tọa độ và `type`, nhưng chúng ta có thể lấy đúng giá trị của tọa độ x, y, không quan tâm z, type

```js
function getCoordinates() {
 return {x: 10, y: 20, z: -1, type: '3d' }
}
var {x,y} = getCoordinates()
```

Ví dụ ta có hàm `random` để tạo một con số ngẫu nhiên nào đó trong phạm vi min và max được chỉ định, khi gọi hàm này cũng có thể thay đổi giá trị min, max tùy ý

```js
function random({min = 1, max = 10} = {}) {
 return Match.floor(Math.random() * (max - min)) + min
}
console.log( random() )
console.log( random({max: 24}) )
```

Khi sử dụng cùng với `Regular expression`, ta có thể bỏ qua giá trí đầu tiên trả về vốn là giá trị truyền vào, ta chỉ cần lấy lấy kết quả year, month, day

```js
function splitDate(date) {
 var rdate = /(\d+).(\d+).(\d+)/
 return rdate.exec(date)
}
var [,year, month, day] = slitDate('2016-11-16')
```