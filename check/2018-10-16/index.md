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

Có thể thấy ngay Reactive programing khá trừu tượng, nhưng do thay vì implement những ràng buộc một cách chi tiết, những ràng buộc này được gắn vào từng data gởi đi trên stream, code nó sẽ gọn gàng hơn.

10 năm trước, mọi việc chỉ đơn giản là submit toàn bộ giá trị các field lên backend xử lý, rồi đơn thuần hiển thị kết quả trả về, bây giờ user thích real-time feedback, bấm "like" một phát là đầu bên kia thấy được liền.

Những event real-time như thế, user khoái, chúng ta cần có một công cụ lập trình để làm việc đó, Reactive Program ra đời cũng từ yêu cầu của user.

# Implement hộp thoại "Who to follow" của twitter

Mình sẽ sử dụng [RxJS](https://github.com/Reactive-Extensions/RxJS) trong ví dụ, vì mình chỉ biết javascript thôi các bạn.

![](https://camo.githubusercontent.com/81e5d63c69768e1b04447d2e246f47540dd83fbd/687474703a2f2f692e696d6775722e636f6d2f65416c4e62306a2e706e67)

Tính năng chính của hộp thoại này

- Vừa mở lên, load data từ API, hiển thị 3 tài khoản
- Click "Refresh", hiển thị 3 tài khoản khác
- Khi click "x", xóa tài khoản đó khỏi danh sách, hiển thị một tài khoản khác.




