---
slug: "2021-05-31-huong-dan-viet-boolean"
date: "2021-05-31"
title: "Quản lý state: nhận định boolean tốt và không tốt"
desc: ""
tags: ["js"]
canonical_url: false
---

Tóm tắt nếu bạn lười đọc:

> `boolean` không tốt đại diện cho `state`, `boolean` tốt là kết quả tính từ `state`

Một ví dụ dễ thấy nhất với `boolean` không tốt là cách thiết kế `state` như vầy

```js
let isLoading = true;
let isComplete = false;
let hasError = false;
```
Thoạt nhìn chúng ta sẽ nghĩ nó tốt. Chúng ta đưa ra 3 `state` khác nhau ứng với 3 giá trị `boolean` riêng biệt, chỉ duy nhất một giá trị là `true` 

```js
const makeFetch = async () => {
  isLoading = true;
  try {
    await fetch('/users');

    isComplete = true;
  } catch (e) {
    hasErrored = true;
  }
  isLoading = false;
};
```

Nhưng khi nghĩ kỹ lại, chúng ta sẽ nhận được 2 giá trị `true` nếu `makeFetch` được gọi lại lần nữa

```js
isLoading = true;
isComplete = true;
hasError = false;
```
**Vậy làm sao để thiết kế một `boolean` tốt cho trường hợp trên?**

`State` ở đây chúng ta sẽ có tất cả các giá trị sau

```js
const statusEnum = {
	idle: 'idle',
	loading: 'loading',
	complete: 'complete',
	error: 'error'
}
```

Và chúng ta dùng nó trong hàm `makeFetch`

```js
const makeFetch = async () => {
  status = statusEnum.loading;
  try {
    await fetch('/users');

    status = statusEnum.complete;
  } catch (e) {
    status = statusEnum.error;
  }
};
```
Cần giá trị `boolean` bạn *tính* từ giá trị `state`

```js
const isLoading = (status) => status === statusEnum.loading;
```