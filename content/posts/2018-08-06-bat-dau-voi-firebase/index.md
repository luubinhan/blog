---
slug: "/2018-08-06-bat-dau-voi-firebase"
date: "2018-08-06"
title: "Những tính năng cở bản của Firebase"
desc: "Năm 2016 google giới thiệu Firebase. Khi bắt đầu phát triển ứng dụng điện thoại, bạn sẽ cần đến server và một developer để làm việc với server"
cover: "https://i2.wp.com/www.androidgig.com/wp-content/uploads/2017/01/firebase.png?w=888"
type: "post"
lesson: 0
chapter: 0
tags: ["javascript"]
---

<!-- TOC -->

- [Firebase Analytics](#firebase-analytics)
- [Realtime Database](#realtime-database)
- [Authentication](#authentication)
- [Crash Reporting](#crash-reporting)
- [Cloud Messaging](#cloud-messaging)
- [Remote Config](#remote-config)
- [App Indexing](#app-indexing)
- [Invites](#invites)
- [AdMob](#admob)

<!-- /TOC -->

Firebase cung cấp những tính năng chúng ta cần ở server, thêm vào đó là realtime database, storage, hosting, authentications, analytics, notifications, crash report,...

# Firebase Analytics

Firebase Analytics cho phép bạn analyse các thao tác của user trên app, miễn phí cho 500 sự kiện khác nhau.

Với kết quả analyse này chúng ta có thể biết được người dùng cần gì, sử dụng app ra sau, chúng ta nên nâng cấp những tính năng nào

# Realtime Database

Firebase cung cấp NoSQL realtime cloud database. Lưu trữ dữ liệu ở dạng JSON và cho phép đồng bộ với client

Khi kết nối Realtime Database với Android, iOS, Javascript SDK, một realtime database sẽ được tạo ra và dùng chung cho tất cả user. Tất cả client sẽ nhận được update khi có sự thay đổi của dữ liệu

# Authentication

Sử dụng Firebase Authentication user sẽ xác thực tài khoản bằng nhiều cách, email, Facebook, Twitter, Google hay Github.

Firebase Authentication  cho phép tạo một user mới lưu xác thực của user xuống Firebase Database, không còn cực khổ đi config ở phía server

Thậm chí chúng ta còn có thể gởi confirm email sau khi đăng ký và forget password.

# Crash Reporting 

Một tính năng hữu ích cho mội developer, với Firebase Crash Reporting chúng ta sẽ có tất tần tật log từ thông tin OS đến chi tiết lỗi nếu xảy ra

# Cloud Messaging

Với Firebase Cloud Messaging(FCM) chúng ta có thể tương tác với user theo một khoảng thời gian chỉ định, notify user những thay đổi đã xảy ra.

Sử dụng FCM để chạy quảng cáo, khuyến mãi, miễn là nó dưới 4KB

# Remote Config

Remote config theo các developer là tính năng xịn nhất của Firebase, cho phép thực hiện những thay đổi mà không cần chạy lại build. User sẽ có được những thay đổi đổi mới nhất mà không cần update lại app (thiệt ko ta?)

# App Indexing

Nếu google tìm thấy bất kỳ từ khóa tìm kiếm nào khớp với app của chúng ta và nếu app được cài rồi, user sẽ ngay lập tức thấy kết quả có app của chúng ta

# Invites

Nếu app có nội dung tốt, được nhiều người thích thú, user có thể share nó với người khác sử dụng Firebase Invites

# AdMob 

Sau tất cả cố gắng để build app, chúng ta cần đến AdMob để kiếm chút đỉnh từ quảng cáo.

[Link bài gốc](http://www.androidgig.com/getting-started-with-firebase-android/)