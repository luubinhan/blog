---
path: "/2018-06-02-tai-sao-chung-ta-lam-single-page-app"
date: "2018-06-02T13:35:13.234Z"
title: "Sự cần thiết của Single Page App - SPA"
desc: "Đáng lẽ bài này nên viết trước khi nghiên cứu tất cả những thứ như React, Angular, Webpack, Redux..., tại sao lại có cái gọi là single page app tồn tại trên cuộc đời này"
tags: ["javascript", "UX"]
---

Sự thật không thể chối cãi là ứng dụng chạy trên nên web đã có chổ đứng rất vững chắc bên cạnh những ứng dụng chạy trên desktop. Những gì chúng user cần để sử dụng là trình duyệt, một tài khoản email để đăng ký, khi user ngày càng thích thú các ứng dụng web, nhu cầu tăng lên, user đòi hỏi những ứng dụng sẽ làm được những thứ phức tạp hơn là việc chỉ show thông tin đơn thuần.

MPA (Multi-page app) và SPA (Single Page app) là 2 kiểu ứng dụng phổ biến trong web, mõi thằng sẽ có ưu nhược khác nhau.

Để trả lời cho câu hỏi kiểu ứng dụng nào là phù hợp, chúng ta phải trả lời kha khá câu hỏi, ưu tiên nội dung lên hàng đầu, trãi nghiệm người dùng lên trên hết, kiểu dữ liệu gì sẽ được đưa đến user, loại nội dung gì mà user sẽ quan tâm nhất

## SPA

SPA là gì ? là ứng dụng web mà trình duyệt request lần đầu tiên, các lần request sau sẽ là gọi ajax (chạy ngầm bên dưới trình duyệt), việc tất cả các request sau đều load bằng ajax, user sẽ không bị *reload* khi thực thi một thao tác nào đó. Ứng dụng SPA nối tiếng nhất, đình đám nhất mà ai cũng xài tới là GMAIL, ngoài ra còn có Google Maps, Facebook, Github. SPA là để phục vụ user có trãi nghiệm *tự nhiên* nhất với web, không gián đoạn, không reload trang, cảm giác như không hề có sự chờ đợi nào (vì sự thật là có chờ mà user méo biết).

Làm được chuyện đó là nhờ những Javascript frameworks như AngularJS, Ember, Meteor, Knockout, React,... Nhân tiện React vừa tròn sinh nhật 4 tuổi, nên ở thời điểm hiện tại nếu dev nào ở Việt Nam nào vỗ ngực xưng tên 4 năm kinh nghiệm React thì xin bái phục.

### Ưu điểm

1. Trãi nghiệm người dùng tốt, vì nó sinh ra là để phục vụ user khó chịu
2. Ở thời điểm hiện tại, quy trình phát triễn dã khá rõ ràng, nhiều thư viện hổ trợ hơn so với trước đây.
3. Sử dụng cùng một backend để chạy, vì SPA cũng tương tự như mobile app nó sẽ chỉ lấy dữ liệu từ RESTFUL hoặc GRAPHQL
4. Chạy offline, một cánh cửa mới của SPA sau khi các trình duyệt bắt đầu hổ trợ mạnh mẽ Service Worker

### Nhược

- Bảo mật kém hơn, hiện tại đang có nhiều giải pháp cho vấn đề này.
- Sử dụng phụ thuộc vào javascript rất nhiều, nếu sử dụng trong thời gian dài, code viết không tốt là trình duyệt sẽ nuốt ram như uống nước

## MPA


https://www.amberbit.com/blog/2017/9/20/why-you-should-not-build-your-startup-as-spa/

https://blog.angular-university.io/why-a-single-page-application-what-are-the-benefits-what-is-a-spa/

https://medium.com/@NeotericEU/single-page-application-vs-multiple-page-application-2591588efe58

Neoteric
