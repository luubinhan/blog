---
slug: "/2020-07-30-phan-biet-su-khac-nhau-giua-await-return-await"
date: "2020-07-30"
title: "Phân biệt sự khác nhau giữa await-return-return await"
desc: "Nắm rõ async không bao giờ là một kiến thức thừa."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "hoc-thuat"]
---

Khi viết một async function, có sự khác nhau giữa `await` và `return` và `return await`, các bạn nên biết để sử dụng cho đúng

Chúng ta có một async function `waitAndMaybeReject`

```js
async function waitAndMaybeReject() {
  // wait 1 giây
  await new Promise((r) => setTimeout(r, 1000));

  const isHeads = Boolean(Math.round(Math.random()));

  if (isHeads) return "Thành công zòi";
  throw Error("Xui thôi!");
}
```

Sau 1 giây, nó sẽ trả về một `Promise`, _hên hên_ thì resolve cho giá trị _Thành công zòi_, xui xui thì cho giá trị _Xui thôi!_.

Giờ khi chúng ta gọi hàm `waitAndMaybeReject()`

```js
async function test() {
  try {
    waitAndMaybeReject();
  } catch (e) {
    return "Oh No!";
  }
}
```

Khi viết như vậy, chúng ta sẽ luôn nhận được kết quả **fulfill với giá trị undefined, không có waiting**

Bởi vì chúng ta không có **await** trên kết quả trả về của `waitAndMaybeReject()`, nói chúng là chúng ta ko có phục thuộc gì vào việc gọi hàm `waitAndMaybeReject()`. Code như vậy là sai nghe các bạn.

Rồi giờ chúng ta sẽ **await** trên kết quả của hàm `waitAndMaybeReject()`

```js
async function test() {
  try {
    await waitAndMaybeReject();
  } catch (e) {
    return "Oh No!";
  }
}
```

Hàm này khi thực thi nó sẽ chạy như sau, **đợi 1 giây**, sau đó hoặc là trả về **fulfill với undefined**, hoặc **fulfill với 'Oh No!'**

Bởi vì chúng ta _chỉ await trên `waitAndMaybeReject()`_, việc _xui xui_ bị reject trong `waitAndMaybeReject` sẽ throw ra lỗi và được túm lấy trong hàm `test`. Và vì không làm gì hết khi `waitAndMaybeReject()` khi được resolve, nên chúng ta nhận về _undefined_

Rồi, giờ tới trường hợp `return`

```js
async function test() {
  try {
    return waitAndMaybeReject();
  } catch (e) {
    return "Oh No!";
  }
}
```

Nó sẽ thực thi như sau, **đợi một giây**, sau đó hoặc là **fulfill với giá trị Thành công zòi** hoặc **reject với giá trị Xui thôi!**

Với việc `return waitAndMaybeReject`, chúng ta đã chuyển tiếp hết kết quả trả về của `waitAndMaybeReject`, đồng nghĩa với việc `catch` bên trong hàm `test` chả bao giờ chạy tới.

`return await` thì sao?

```js
async function test() {
  try {
    return await waitAndMaybeReject();
  } catch (e) {
    return "Oh No!";
  }
}
```

Nó sẽ thực thi như sau, **đợi sau một giây** sau đó trả về **fulfill với giá trị Thành công zòi** hoặc **fulfill với giá trị Oh No!**

Vì chúng ta `await` trên kết quả cả `waitAndMaybeReject()`, reject của hàm `waitAndMaybeReject()` sẽ đẩy về throw của hàm `test`, kết quả là **Oh No!**. Nếu `waitAndMaybeReject` được resolve, chúng ta return kết quả này, chính là **Thành công zòi**

Có thể viết như thế này cho dễ hình dung hơn

```js
async function test() {
  try {
    const fulfilledValue = await waitAndMaybeReject();
    return fulfilledValue;
  } catch (e) {
    return "Oh No!";
  }
}
```

> Lưu ý cuối cùng: Nếu không dùng try/catch mà return await sẽ rất dư thừa

[await vs return vs return await](https://jakearchibald.com/2017/await-vs-return-vs-return-await/)
