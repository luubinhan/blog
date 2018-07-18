---
slug: "/2018-07-18-gioi-thieu-ve-redux-observer"
date: "2018-07-18"
title: "Giới thiệu Redux Observer"
desc: "Một middleware mạnh hơn redux-thunk, ít phức tạp hơn redux-saga"
cover: ""
type: "post"
lesson: 2
chapter: 1
tags: ["react", "javascript"]
---


Bài đầu tiên này chúng ta sẽ nói về Epics

Lưu ý quan trọng:

Muốn hiều **redux-observable** bạn cần nắm khái niệm **Observable** của RxJS v6, có thể đọc tìm hiểu ở đây [http://reactivex.io/rxjs/](http://reactivex.io/rxjs/). Còn nếu thực sự bạn không cảm thấy thoải mái khi làm việc chung với RxJS, thì cứ sử dụng **redux-thunk** cho nhu cầu đơn giản.
