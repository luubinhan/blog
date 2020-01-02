---
slug: "/2018-11-05-moi-so-loi-javascript-lam-anh-huong-perfomance"
date: "2018-11-05"
title: "3 lỗi javascript thường mắc phải làm ảnh hưởng perfomance"
desc: "Bài viết dành cho những người nghiện tốc độ, nghiện cách viết ES6"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [1. loop qua một array](#1-loop-qua-một-array)
- [2. Duplicate một array](#2-duplicate-một-array)
- [3. Loop qua một object](#3-loop-qua-một-object)

<!-- /TOC -->


## 1. loop qua một array

Chúng ta thử xem thời gian tiêu tốn cho việc loop qua 10k item trong array

- `for`:  ~10 microseconds
- `while`: ~11 microseconds
- `forEach`: ~77 microseconds
- `for-of`: ~110 microseconds
- `reduce`: ~113 microseconds

Nếu muốn tính tổng của một array thì sử dụng `reduce` là rõ ràng, tuy nhiên cái giá phải trả quá lớn. Vòng lặp mới nhất từ ES6 `for-of` cũng về áp chót. Như vậy cứ xài vòng `for` kinh điển, tuy cũ mà nhanh gấp 10 lần cái `for-of`

## 2. Duplicate một array

Khi thế giới đang tồn thờ tư tưởng **immutable function** ( không sửa cái input khi cho ra output ), việc duplicate một input array là chuyện thường ngày ở huyện.

Chúng ta hãy xem kết quả tất cả các cách chúng ta có thể dùng để duplicate một array

- `[].concat(arr)`: ~366 microseconds
- `arr.slice()`: ~367 microseconds
- `arr.map(x => x)`: ~469 microseconds
- `[...arr]`: ~512 microseconds
- `Array.from(arr)`: ~1,436 microseconds

Như vậy 2 phương thức cũ như dưa mắm `concat` và `slice` vẫn dành chiến thắng, kiểu spread operation mới ES6 vẫn top cuối.

## 3. Loop qua một object

- `for(let key in obj)`: ~240 microseconds
- `Object.keys(obj)` sau đó for each: ~294 microseconds
- `Object.entries(obj)` sau đó for of: ~535 microseconds


Ở hai cách làm bên dưới, do phải tạo thêm một mảng chứa key, rồi mới loop qua mảng này object nên nó chậm.

<div class="note">Đừng mù quáng xài cách viết mới nếu không phù hợp với ứng dụng đang viết</div>


<a href="https://hackernoon.com/3-javascript-performance-mistakes-you-should-stop-doing-ebf84b9de951" target="_blank" rel="noopener noreferrer">3 JavaScript Performance Mistakes You Should Stop Doing  </a


