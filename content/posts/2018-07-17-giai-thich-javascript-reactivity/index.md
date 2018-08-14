---
slug: "/2018-07-17-huong-dan-giai-thich-javascript-reactivity"
date: "2018-07-17"
title: "Giải thích Javascript Reactivity"
desc: "Rất nhiều thư viện Javascript như Angular, React, Vue sử dụng Reactivity, hiểu được reactivity là gì và cách nó chạy sẽ giúp nâng cao kỹ năng lập trình"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Một ví dụ về Reactivity của Vue](#một-ví-dụ-về-reactivity-của-vue)
- [Vấn đề và giải pháp](#vấn-đề-và-giải-pháp)
- [Giải pháp tổng quát hơn](#giải-pháp-tổng-quát-hơn)
- [Tách Dep cho mỗi biến](#tách-dep-cho-mỗi-biến)
- [Tổng hợp các ý tưởng chính](#tổng-hợp-các-ý-tưởng-chính)

<!-- /TOC -->

# Một ví dụ về Reactivity của Vue

```jsx
<div id='app'>
  <div>Price: ${{ price }}</div>
  <div>Total: ${{ price * quantity }}</div>
  <div>Taxes: ${{ totalPriceWithTax }}</div>
</div>
```

```js
var vm = new Vue({
  el: '#app',
  data: {
    price: 5.00,
    quantity: 2
  },
  computed: {
    totalPriceWithTax() {
      return this.price * this.quantity * 1.03
    }
  }
})
```

Ở đây khi chúng ta thay đổi giá trị của `price`, thằng Vue nó sẽ làm 3 thứ

1. Cập nhập lại giá trị `price`
2. Tính lại giá trị `total`
3. Gọi lại hàm `totalPriceWithTax` và cập nhập lại giá trị

![](https://cdn-images-1.medium.com/max/800/1*t8enMn6h0gjY6HNKoSVC1g.jpeg)

Thấy hết sức bình thường, nhưng đó **KHÔNG PHẢI LÀ CÁCH CHẠY BÌNH THƯỜNG CỦA JAVASCRIPT**

Ví dụ với javascript bình thường

```js
let price = 5
let quantity = 2
let total = price * quantity // kết quả sẽ là 10
price = 20 // gán lại giá trị của price
console.log(`total is ${total}`)
```

Bạn hãy đoán xem kết quả log ra là mấy? Sẽ là **10** chứ không phải **40** đâu.

# Vấn đề và giải pháp

Vấn đề là chúng ta cần phải lưu cái cách tính `price * quantity` này lại ở đâu đó, để chúng ta re-run cách tính này khi gọi lại `total`, nó sẽ không nên là biến số mà là thành hàm, thì khi đó nếu giá trị `price` hoặc `quantity` thay đổi chúng ta sẽ có kết quả `total` thay đổi theo.

Chúng ta cần một nơi để **lưu** phần code tính toán kiểu như vậy lại ở đâu đó, để khi `price` hoặc `quantity` thay đổi, chúng ta sẽ chạy lại tất cả những gì **đã lưu**

![](https://cdn-images-1.medium.com/max/800/0*Nh-FQoHiDHncmQSi.png)

```js
let price = 5;
let quantity = 2;
let total = 0;
let target = () => { total = price * quantity }

record(); // lưu lại đâu đó để re-run sau này

target(); // 
```

Hàm record chúng ta sẽ implement nó như sau

```js
let storage = []; // đưa toàn bộ các hàm muốn re-run vào mảng này

function record() {
  storage.push(target);
}
// hàm để chạy lại tất cả những thứ đã lưu trong store
function replay() {
  storage.forEach(run => run());
}
```

# Giải pháp tổng quát hơn

Nếu đã nắm được ý tưởng chính để giải quyết bài toán ban đầu, giờ chúng ta sẽ hiện thực hóa nó bẳng observer pattern, tạo một `class` để quản lý những chuyện đó

```js
class Dep {
  constructor() {
    // thay vì là starage, thiên hạ đã thống nhất lấy cái tên subscribers
    this.subscribers = []; 
  }
  depend() {
    if (target && !this.subscribers.includes(target)) {
      // chỉ thêm vào nếu chưa có hoặc không trùng
      thiss.subscribers.push(target);
    }
  }
  notify() {
    // run tất cả target, tên gọi khác là observer
    this.subscribers.forEach(sub => sub()); 
  }
}
```

Code lại ví dụ trên sử dụng `class` mới tạo này

```js
const dep = new Dep();

let price = 5;
let quantity = 2;
let total = 0;
let target = () => { total = price * quantity }
dep.depend();
target();

console.log(total); // 10
price = 20;
console.log(total); // 10
dep.notify();
console.log(total); // 40
```

Chúng ta vẫn còn có thể nâng cấp đoạn code trên, thay vì

```js
let target = () => { total = price * quantity }
dep.depend();
target();
```

... chúng ta đóng gói nó vào một **watcher**, sau đó chỉ cần gọi

```js
watcher(() => {
  total = price * quantity
})
```

Implement cái function watcher này như bên dưới

```js
function watcher(myFunc) {
  target = myFunc; // active target, target ở đây là global variable
  dep.depend(); // đưa target vào dependency
  target(); // gọi hàm target
  target = null; // reset
}
```

# Tách Dep cho mỗi biến

Chúng ta sẽ muốn mỗi một biến có một `Dep` riêng, trước tiên ta đưa `price` và `quantity` thành property của `data`

```js
let data = {price: 5, quantity: 2}
```

Chúng ta sẽ có các Dep khác nhau cho `price` và `quantity`

![](https://cdn-images-1.medium.com/max/800/0*kV4iCRoguwO5C_JQ.png)

watcher phụ thuộc cả 2 biến

```js
watcher(() => {
  total = data.price * data.quantity;
})
```

![](https://cdn-images-1.medium.com/max/800/0*E-_YXfn3vJe7S_Ry.png)

watcher chỉ phụ thuộc biến `price`

```js
watcher(() => {
  salePrice = data.price * 0.9;
})
```

![](https://cdn-images-1.medium.com/max/800/0*wefv6my2WWLW2385.png)

Chúng ta muốn khi giá trị `price` bị thay đổi, hàm `dep.notify` của `price store` sẽ được gọi

```js
>> total
10
>> price = 20 // lúc này thằng notify của price sẽ được gọi liên luôn
>> total
40
```

Đọc thêm tài liệu về [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) nếu chưa biết. Áp dụng nó trong ví dụ này

```js
let data = {price: 5, quantity: 2}

let internalValue = data.price; // giá trị khởi tạo

Object.defineProperty(data, 'price', { // chỉ cho thằng Price Property
  get() {
    console.log('Em bị access');
    return internalValue;
  },
  set(newVal) {
    console.log('Em bị thay đổi');
    internalvalue = newVal;
  }
})
data.price // call get()
data.price = 20 // call set()

total = data.price * data.quantity;
data.price = 20;
```
 
Với cách này, chúng ta có thể chạy kèm một hàm nào đó khi giá trị `price` được **get** hoặc **set**. Với idea là như thế chúng ta tổng quát quá lên cho nhiều biến

```js
let data = {price: 5, quantity: 2}

Object.keys(data).forEach(key => {
  let intervalvalue = data[key];
  Object.defineProperty(data, key, { // chỉ cho thằng Price Property
    get() {
      console.log('Em bị access');
      return internalValue;
    },
    set(newVal) {
      console.log('Em bị thay đổi');
      internalvalue = newVal;
    }
  })
})

total = data.price * data.quantity;
data.price = 20;
```

# Tổng hợp các ý tưởng chính

```js
total = data.price * data.quantity
```

Khi một đoạn code như vậy được chạy, nó sẽ `get` giá trị của `price`, chúng ta muốn thẳng `price` khi bị thay đổi hoặc gọi, nó sẽ re-run một function

- Ở **Get**: nhớ dùm cái function này, bọn tao sẽ nhờ mày chạy lại
- Ở **Set**: chạy cái function mày đã giữ hộ ấy, thay đổi giá trị luôn nhé

Và đây là toàn bộ code

```js
let data = {price: 5, quantity: 2};
let target = null;

// Dep không thay đổi gì so với ở trên
class Dep {
  constructor() {
    // thay vì là starage, thiên hạ đã thống nhất lấy cái tên subscribers
    this.subscribers = []; 
  }
  depend() {
    if (target && !this.subscribers.includes(target)) {
      // chỉ thêm vào nếu chưa có hoặc không trùng
      thiss.subscribers.push(target);
    }
  }
  notify() {
    // run tất cả target, tên gọi khác là observer
    this.subscribers.forEach(sub => sub()); 
  }
}

// chạy qua từng data của property
Object.keys(data).forEach(key => {
  let intervalvalue = data[key];

  // mỗi em một Dep
  const dep = new Dep();

  Object.defineProperty(data, key, { // chỉ cho thằng Price Property
    get() {
      dep.depend(); // lưu hộ tao cái
      return internalValue;
    },
    set(newVal) {
      internalvalue = newVal;
      dep.notify();// re-run đi em
    }
  })
})

// watcher sẽ không còn gọi dep.depend nữa
function watcher(myFunc) {
  target = myFunc;
  target();
  target = null;
}

watcher(() => {
  data.total = data.price * data.quantity;
})
```

Kết quả nè

![](https://cdn-images-1.medium.com/max/800/0*mgmRTNK_n0i2AFK2.png)

Hình mình họa lấy từ Vue

![](https://cdn-images-1.medium.com/max/800/0*tB3MJCzh_cB6i3mS.png)

[Link bài gốc](https://medium.com/vue-mastery/the-best-explanation-of-javascript-reactivity-fea6112dd80d)