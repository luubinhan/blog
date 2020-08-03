# Thêm kiểm tra type trong Javascript với VS Code



Bạn thấy rằng JavaScript đã là đủ xài trong dự án, bạn không ưu thằng TypeScript và bạn đang sử dụng VS Code. Bài viết này là dành cho bạn rồi.



VS Code có một công cụ không thể tuyệt vời hơn cho các bạn viết JS một cách an toàn ko sợ sai type.

> @ts-check



Ví dụ bạn muốn nghiêm cấm việc thay đổi type của một biến đã gán sẵn giá trị trước đó

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

Thêm một vài thiết đặt khác

## Không được phép có nhiều params

```js
function add(a, b) {
  return a + b;
}

add(1,2,3);
```



Code trên vẫn ko sai nhé, mặc dù chúng ta không hề khai báo param thứ 3. Thêm // @ts-check để nhận lỗi

> Expected 0-2 arguments but got 3

```js
// @ts-check
function add(a, b) {
  return a + b;
}

add(1,2,3); // complains about the `3`
```

## Object

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

