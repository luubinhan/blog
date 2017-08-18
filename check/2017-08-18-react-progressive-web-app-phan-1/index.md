---
path: "/2017-08-18-react-progressive-web-app-phan-1"
date: "2017-08-18T13:35:13.234Z"
title: "React Progressive Web Apps  - Phần 1"
desc: "Giới thiệu về React Progressive Web App, bước đầu xa ngã..."
tags: ["javascript","react"]
---

https://medium.com/@gethylgeorge/react-progressive-web-apps-part-1-1cf381421672
Progressive Web Apps (viết tắt là PWA nhé), bắt đầu thu hút được nhiều sự chú ý như cái ngày responsive web 'mới' ra đời cách đây 4 năm trước. Mới đây package [Create React App](https://facebook.github.io/react/blog/2017/05/18/whats-new-in-create-react-app.html#progressive-web-apps-by-default) cũng đã thông báo mặc định bổ sung vào PWA

# PWA là gì ?

Nếu mà đó giờ chưa nghe gì về PWA, tổng kết lại nó là gì:

- Làm việc trên mọi trình duyệt của người dùng
- Responsive, cái này ko cần giải thích thêm nhỉ
- Phải chạy trên HTTPs (trừ localhost thì mình dev bình thường)
- Cho trãi nghiệm như một cái app thực thụ mà không cần phải đưa lên app store, người dùng add nó từ đường dẫn url.
- Dễ cài, add nó xong hiện icon lên màn hình điện thoại như cái app
- Quan trọng nhất: cho phép user sử dụng khi không có internet hoặc internet rùa bò.

Một số tin tức bài viết liên quan có thể tham khảo

- Progressive Web App Training của [Google](https://developers.google.com/web/ilt/pwa/)
- Cần biết [Service Worker](https://developer.mozilla.org/en/docs/Web/API/Service_Worker_API) và [Cache Storage APIs](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage) để hiểu vụ chạy offline là sao
- Đọc cái [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- Cái này chưa biết thì đọc [Fetch API](https://developer.mozilla.org/en/docs/Web/API/Fetch_API)