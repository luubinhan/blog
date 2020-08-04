---
slug: "/2020-08-06-them-type-check-cho-javascript-voi-vscode"
date: "2020-08-06"
title: "Thêm kiểm tra type trong Javascript với VS Code"
desc: "Bạn thấy rằng JavaScript đã đủ xài trong dự án, bạn không ưa thằng TypeScript và bạn đang sử dụng VS Code. Bài viết này là dành cho bạn rồi."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript","thu-thuat"]

---

VS Code có một công cụ không thể tuyệt vời hơn cho các bạn viết JS một cách an toàn ko sợ sai type. Túm gọn chỉ bằng một comment thần thánh

> @ts-check


Ví dụ, bạn muốn nghiêm cấm việc thay đổi type của một biến đã gán sẵn giá trị trước đó

```js
var foo = 3;
foo = false;
```

Tất cả những gì bạn cần làm

```js
// @ts-check
var foo = 3;
foo = false; // indicates error
```

VS Code sẽ thông báo cho bạn một lỗi rất *dễ thương* như thế này

> Type `false` is not assignable to type `Number`

Một vài ví dụ sử dụng để bạn tham khảo

## Kiểm tra params của hàm

```js
function add(a, b) {
  return a + b;
}

add(1,2,3);
```

Code trên vẫn ko sai nhé, mặc dù chúng ta không hề khai báo param thứ 3. Thêm // @ts-check để thông báo khi *vô tình* truyền nhiều hơn số param cần thiết

> Expected 0-2 arguments but got 3

```js
// @ts-check
function add(a, b) {
  return a + b;
}

add(1,2,3); // complains about the `3`
```

## Kiểm tra Object

```js
// @ts-check
let gameObject = {
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  getArea() {
    return this.width * this.height
  }
}

gameObject.z;
```

Cái này nó sẽ không bắt lỗi, chúng ta vẫn được quyền thêm `z` sau khi đã khai báo

Vậy sao? Dùng JsDoc

```js
// @ts-check

/** @type {{x: number, y: number, width: number, height: number, getArea: Function }} */
let gameObject = {
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  getArea() {
    return this.width * this.height
  }
}

gameObject.z;
```

## Biến không bắt buộc

Chúng ta có một hàm mà giá trị param truyền vào không bắt buộc lúc nào cùng có

```js
function doSomething(config) {
  if (config && config.shouldRun) {
    // run
  }
}

doSomething();
doSomething({ shouldRun: true })
```

Chỗ này chúng ta cũng cần sự hỗ trợ của JsDoc như trường hợp trên

```js
// @ts-check

/**
 * @param {{ shouldRun: boolean }} [config] - Somebody's name.
 */
function doSomething(config) {
  if (config && config.shouldRun) {
    // run
  }
}

doSomething({ canRun: false}); // this now indicates an error
doSomething({ shouldRun: true })
```

Với cách thiết đặt như vậy, chúng ta sẽ nhận được cảnh báo khi truyền vào một `object` mà không có giá trị `shouldRun`

## Ngoại lệ

Nếu có trường hợp ngoại lệ nào đó bạn muốn bỏ qua việc kiểm tra tính *chuẩn mực* của type, dùng thần chú `//@ts-ignore` hoặc `//@ts-nocheck`

```js
//@ts-ignore
doSomething({ canRun: false});
```

Sau nhiều năm chinh chiến, mình ngộ ra rằng TypeScript cũng tốt, nhưng nó không dành cho tất cả mọi người, tất cả dự án. Những cái kiểm tra nhỏ nhỏ như vậy đôi khi lại mang khác biệt đủ lớn khi bạn viết code.

[Xem thêm kiểm tra type cho JS](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html)

[Type checking your JavaScript with VS Code - the superpowers you didn't know you had](https://dev.to/itnext/type-checking-your-javascript-with-vs-code-the-superpowers-you-didn-t-know-you-had-1jp)