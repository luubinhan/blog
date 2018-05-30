---
path: "/2018-05-30-co-ban-ve-service-worker-dua-web-chay-offline"
date: "2018-05-30T13:35:13.234Z"
title: "Giới thiệu cơ bản về service worker"
desc: ""
tags: ["javascript"]
---

Service worker là một script chạy nền khi mở một ứng dụng hay website, nó sẽ can thiệp vào quá trình gởi request, có thể là chỉnh sửa lại, redirect,.... Chức năng chính của nó là lưu trữ cached/store của ứng dụng đang chạy khi mất mạng, giúp website và ứng dụng chạy nên web vẫn có thể 'hoạt động' khi ko có mạng.

Giải thích đơn giản nhất về cách Service worker vận hành

1. Khi trang web được tải lên trình duyệt, service worker tìm tất cả file để lưu lại nó trong cache của trình duyệt. Có thể lưu hình, videos. html, icon, js, ... Nếu tất cả các file cần thiết được download thành công, service worker sẽ được activate. Quá trình này gọi là phase installation
2. Sau đó, khi user mở web lần đầu tiên, service-worker