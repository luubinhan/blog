---
slug: "2022-03-04-bo-tui-6-doan-code-huu-ich-trong-js"
date: "2022-03-04"
title: "Bỏ túi 6 đoạn code chỉ với một dòng rất hữu ích trong JavaScript"
desc: ""
tags: ["javascript", "beginner", "thu-thuat"]
---

<!-- TOC -->

- [Trộn ngẫu nhiên một mảng](#trộn-ngẫu-nhiên-một-mảng)
- [Copy vào clipboard](#copy-vào-clipboard)
- [Xác định window có đang chọn chế độ DarkMode](#xác-định-window-có-đang-chọn-chế-độ-darkmode)
- [Scroll lên đầu trang](#scroll-lên-đầu-trang)
- [Cuộn xuống cuối trang](#cuộn-xuống-cuối-trang)
- [Tạo mã màu ngẫu nhiên](#tạo-mã-màu-ngẫu-nhiên)

<!-- /TOC -->

## Trộn ngẫu nhiên một mảng

```js
const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(shuffleArray(arr));
```
## Copy vào clipboard

> Chạy trên trình duyệt có hỗ trợ `navigator.clipboard`

```js
const copyToClipboard = (text) =>
  navigator.clipboard?.writeText && navigator.clipboard.writeText(text);

copyToClipboard("Hello World!");
```
## Xác định window có đang chọn chế độ DarkMode

```js
const isDarkMode = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

console.log(isDarkMode());
```

## Scroll lên đầu trang

```js
const scrollToTop = (element) =>
  element.scrollIntoView({ behavior: "smooth", block: "start" });
```

## Cuộn xuống cuối trang

```js
const scrollToBottom = (element) =>
  element.scrollIntoView({ behavior: "smooth", block: "end" });
```

## Tạo mã màu ngẫu nhiên

```js
const generateRandomHexColor = () =>
  `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
```
