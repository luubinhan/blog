---
slug: "/2021-09-06-gioi-thieu-proxy-cua-javascript"
date: "2021-09-06"
title: "Giới thiệu Javascript Proxy object"
desc: ""
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: [ "hoc-thuat", "javascript"]
---

> Một object `Proxy` sẽ bọc một object khác, và can thiệp trước khi truyền xử lý đó xuống object chính chủ, giống như một middleware

```js
let proxy = new Proxy(target, handler)
```

- `target` là object chính chủ
- `handler` khai báo các phương thức sẽ bị can thiệp

```js
let target = {}
let proxy = new Proxy(target, {})

proxy.test = 5;
alert(target.test); // 5
alert(proxy.test); // 5
```

Do không truyền một handler nào, nên `test` sẽ không thay đổi

Giờ chúng ta muốn can thiệp vào phương thức `get` (khi chúng ta gọi `object.prop`)

```js
let number = [0,1,2]

numbers = new Proxy(numbers, {
    get(target, prop) {
        if (prop in target) {
            return target[prop];
        } else {
            return 0
        }
    }
})

alert(numbers[1]); // 1
alert(numbers[123]); // 0
```

Ví dụ khác, chúng ta có một dãy số, chỉ cho phép thêm vào kiểu `number`, nếu cố tình thêm vào một kiểu dữ liệu khác sẽ không thực hiện được và trả về lỗi

```js
let numbers = [];

numbers = new Proxy(numbers,
    // highlight-next-line
    set(target, prop, val) {
        if (typeof val == 'number') {
            target[prop] = val;
            return true;
        } else {
            // trả về lỗi
            // highlight-next-line
            return false;
        }
    }
})

numbers.push(1); // ok
// highlight-next-line
numbers.push('test'); // TypeError ('set' on proxy returned false)
```

Một ứng dụng khác, bảo vệ các thuộc tính `internal` của một object, ví dụ chúng ta có một số property bắt đầu bằng `_`, chúng ta không cho phép truy cập các property

```js
let user = {
    name: "John",
    _password: "****"
}

user = new Proxy(user, {
    // highlight-next-line
    get(target, prop) {
        if(prop.startWith('_')) {
            throw new Error("Access denied");
        }
        let value = target[prop];
        return (typeof value === 'function') ? value.bind(target) : value;
    },
    // highlight-next-line
    set(target, prop, val) {
        if (prop.startsWith('_')) {
          throw new Error("Access denied");
        } else {
          target[prop] = val;
          return true;
        }
    },
    // highlight-next-line
    deleteProperty(target, prop) {
        if (prop.startsWith('_')) {
          throw new Error("Access denied");
        } else {
          delete target[prop];
          return true;
        }
    },
    // highlight-next-line
    ownKeys(target) {
        return Object.keys(target).filter(key => !key.startsWith('_'));
    }
})

alert(user._password); // Error: Access denied
delete user._password; // Error: Access denied
```

Nếu object của chúng ta là một function thì sao nhỉ?

Ví dụ với hàm `delay` sau, hàm này cho phép *delay* thời gian hàm được thực thi bằng `setTimeout`

```js
function delay(f, ms) {
    return function() {
        setTimeout(() => f.apply(this, arguments), ms)
    };
}

function sayHi(user) {
    alert(`Hello, ${user}!`)
}

sayHi = delay(sayHi, 3000)

sayHi("John");
```

Chúng ta sẽ có một cách viết khác với `Proxy`, điểm khác biệt là `Proxy` sẽ chuyển tiếp luôn tất cả những property khác của function (như `name`, `length`)

```js
function delay(f, ms) {
    return new Proxy(f, {
        // highlight-next-line
        apply(target, thisArg, args) {
            setTimeout(() => target.apply(thisArg, args), ms);
        }
    })
}

function sayHi(user) {
    alert(`Hello, ${user}!`);
}

sayHi = delay(sayHi, 3000);
// highlight-next-line
alert(sayHi.length); // 1
sayHi("John");
```

Chúng đã đề cập đến các phương thức *tiền* xử lý `ownKeys`, `deleteProperty`, `get`, `set`, `apply`. Ngoài ra nó còn có các phương thức khác các bạn có thể thảm khảo thêm

- `has`: trigger khi thực thi `in`
- `apply`: trigger khi thực thi một function
- `construct`: trigger với `new`
- `getPrototypeOf`: [ Object.getPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)
- `setPrototypeOf`: [Object.setPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)
- `isExtensible`: [Object.isExtensible](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)
- `preventExtensions`: [Object.preventExtensions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)
- `defineProperty`: [ Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
- `getOwnPropertyDescriptor`: [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)

Ví dụ lấy từ Javascript.info