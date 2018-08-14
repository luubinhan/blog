---
slug: "/2018-04-03-huong-dan-ba-cach-de-hieu-promise"
date: "2018-04-03"
title: "Ba cách để hiểu Promise"
desc: "3 cách để thẩm thấu được Promise trong javascript"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react"]
---

<!-- TOC -->

- [Gọi một hàm A hàm A trả về Promise, thì hàm A là dạng hàm blocking](#gọi-một-hàm-a-hàm-a-trả-về-promise-thì-hàm-a-là-dạng-hàm-blocking)
- [`Promise` là một container để cưu mang giá trị trả về từ một `asynchronously`](#promise-là-một-container-để-cưu-mang-giá-trị-trả-về-từ-một-asynchronously)
- [`Promise` là một đối tượng tạo ra sự kiện](#promise-là-một-đối-tượng-tạo-ra-sự-kiện)

<!-- /TOC -->

Xéeeeeeeeeet cái hàm sau

```js
function asyncFunc() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('DONE'), 100)
    })
}

asyncFunc().then(x => console.log('Result: ' + x));

// kết quả in ra
// Result: DONE
```

## Gọi một hàm A hàm A trả về Promise, thì hàm A là dạng hàm blocking

```js
function asynFunc() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('DONE'), 100);
    })
}

async function main() {
    const x = await asyncFunc(); // A
    console.log('Result: ' + x);
    // tương tự như
    // asyncFunc().then(x => console.log('Result: ' + x))
}
main();
```

hàm `main` là một hàm `async`. Dòng *A* sẽ đợi đến khi chạy xong hàm `asyncFunc()`.

Hàm gọi là *blocking* khi mà khi chạy hàm này mấy thằng khác không chạy đồng thời với nó, ngược lại *non-blocking* là hàm mà không can thiệp việc các hàm khác chạy cùng lúc với nó

## `Promise` là một container để cưu mang giá trị trả về từ một `asynchronously`

Nếu hàm trả về `Promise` thì cái `Promise` này giống như một cái thùng chứa, hàm thực thi bên trong sẽ quăng kết quả trả về vào đó. Mô phỏng việc này bằng một `Array`

```js
function asyncFunc() {
    const blank = [];
    setTimeout(() => blank.push('DONE'), 100);
    return blank;
}
const blank = asyncFunc();
// đợi đến khi giá trị trả về được fill
setTimeout(() => {
    const x = blank[0]; //A
    console.log('Result: ' + x);
}, 200);
```

Tất nhiên với một `Promise` thực thụ không thể truy cập giá trị như dòng *A* (blank[0]), mà chúng ta sử dụng hàm `then()` và một *callback*

## `Promise` là một đối tượng tạo ra sự kiện

```js
function asyncFunc() {
    const eventEmitter = { success: [] };
    setTimeout(() => { //A
        for (const handler of eventEmitter.success) {
            handler('DONE');
        }
    }, 100);
    return eventEmitter;
}
asyncFunc().success.push(x => console.log('Result ' + x)); //B
```

Dòng *B* đăng ký lắng nghe sự kiện sau khi gọi hàm `asyncFunc()`. Kết quả trả về của `Promise` sẽ là một chuỗi event sau khi thực thi kèm với giá trị gì đấy ứng với từng event.