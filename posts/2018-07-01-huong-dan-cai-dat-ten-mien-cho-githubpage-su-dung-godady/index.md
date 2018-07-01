---
path: "/2018-07-01-huong-dan-cai-dat-ten-mien-cho-githubpage-su-dung-godady"
date: "2018-07-01T13:35:13.234Z"
title: "Hướng dẫn setup tên miền GoDaddy với Github Page"
desc: "Hướng dẫn cầu hình tên miền trên GoDaddy để sử dụng với Github page"
tags: ["web", "dns", "githubpage"]
---


Đăng nhập vào Goddady, mở tab My Products, chọn nút **Manage**

![](https://cdn-images-1.medium.com/max/800/1*Y9e7HtJvVv7jshINs46mTA.png)

Cuộn xuống ở dưới cuối trang, click link **Manage DNS**

- Hàng type **A**, nhập vào IP của Github Server: 185.199.108.153, lên đây xem https://help.github.com/articles/setting-up-an-apex-domain/
- Hàng CNAME với Name "www" nhập địa chỉ url trang github page muốn trỏ tới, ví dụ như luubinhan.github.io/blog/

![](https://cdn-images-1.medium.com/max/800/1*vL7RX_AyXRsSfO27NYF5iA.png)

Bên trong thư mục public của site, tạo thêm file tên CNAME, mở file này lên, nhập nội dung là tên miền

![](https://cdn-images-1.medium.com/max/800/1*zJsdMXE8aiHEuu6ObDu7ow.png)

Xong, dễ cực. Cảm ơn bạn đã đọc hết bài viết