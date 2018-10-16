---
slug: "/2018-10-15-nhung-cau-nen-hoi-khi-di-phong-van"
date: "2018-10-16"
title: ""
desc: ""
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

# Stream là gì?

Muốn hiểu được reactive programing, bạn cần biết khái niệm **stream**

Có thể hình dung stream như là một **array đặc biệt**, chứa một *tập* các phần tử **đặc biệt**, các phần tử này có thể emit: 1. value, 2. error, 3. complete

Tuân theo [Observer Design Pattern](https://en.wikipedia.org/wiki/Observer_pattern), việc "*lắng nghe*" stream gọi là **subscribe**, những gì được emit, chúng ta viết các function để xử lý cho 3 trường hợp, các function này gọi là **observer**

# Reactive programing là gì?

> Reactive programming is programming with asynchronous data streams

Tạm dịch: là cách xử lý với dữ liệu stream không tuần tự (async)

Có rất nhiều thứ có thể xem là async data stream. Ví dụ: một cái form đăng ký với các input username, password, email, nút submit, nguyên quá trình user nhập giá trị các field này đến lúc submit, là một async data stream. Một giao diện counter, có duy nhất một button ấn để tăng counter, thì suốt quá trình ấn couter được xem là async data stream.

Để làm việc với Reactive Programing, 100% bạn cần dùng đến thư viện (siêu nhân có thể tự viết), tùy theo ngôn ngữ (ko chỉ có javascript mới có nhé), nó sẽ có một số hàm để bạn chuyển đổi một data bình thường thành một data stream (data stream là phải có thể emit 3 cái đã nói), một số hàm để bạn `merge`, `flatten`, `filter` các data stream này lại.

# Tại sao chúng ta cần Stream + Reactive Programing

Có thể thấy ngay Reactive programing khá trừu tượng, 

