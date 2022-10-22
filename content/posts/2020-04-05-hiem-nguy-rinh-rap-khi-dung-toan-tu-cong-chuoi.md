---
slug: "/2020-04-05-hiem-nguy-rinh-rap-khi-dung-toan-tu-cong-chuoi"
date: "2020-04-05"
title: "Hiểm nguy rình rập khi dùng toán tử + trong javascript"
desc: "Một toán tử phình phường có thể làm chúng ta điêu đứng"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "thu-thuat"]
---

Như mọi thứ ngôn ngữ lập trình, ngôn ngữ toán học, Javascript dùng dấu `+` để thực hiện cộng giá trị. Tuy nhiên, vì là Javascript, anh *có quyền* không đi theo quy chuẩn chung, anh còn được dùng cho việc **nối chuỗi**

Nếu chúng ta dùng nó cho việc cộng số

```js
const giaKhauTrangBinhThuong = 35000;
const doiGiaDichCovy = 300000;
const tienShip = 20000;
const chiPhiMuaHopKhauTrang = giaKhauTrangBinhThuong * doiGiaDichCovy + tienShip;
```

Chúng ta dùng nó cho việc **nối chuỗi**

```js
const ten = "Tui là An";
const nenLamGi = "Tui ở nhà cho Bình An";

const tuiLaAi = ten + ' & ' + nenLamGi;
```

Chúng ta sẽ có câu "Tui là An & Tui ở nhà cho Bình An", mọi thứ hoạt động bình thường.

Thí dụ bạn **lỡ** viết thế này thì sao

```js
const seRaSao = 9 + '1';
```

Khi có 2 giá trị khác kiểu, nó sẽ ưu tiên kiểu giá trị mạnh hơn, là kiếu `string` nên kết quả chúng ta nhận là "91" chữ không phải `10`

Điều đúc kết ở đây là gì, hễ chúng ta muốn cộng 2 con số lại, chuyển nó về giá trị số `Number(ten_bien)` trước cho chắc.


