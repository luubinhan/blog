---
slug: "2024-04-05-huong-dan-delegate-domain-trong-aws"
date: "2024-04-05"
title: "Hướng dẫn delegate domain với AWS"
desc: "Trong bài hôm nay chúng ta cùng tìm hiểu cách delegate một domain trong AWS"
cover: ""
tags: ["aws", "beginner", "dev-ops"]
---

Trước tiên chúng ta cần biết delegate domain sẽ giải quyết bài toán gì

Mình lấy ví dụ, Công ty Furfel đang sở hữu tên miền `furfel.net`, là trang web chính của công ty
Công ty thuê công ty Dev phát triển thêm một số dịch vụ trên tên miền con `dev.furfel.net`
Công ty Furfel sẽ trao toàn bộ quyền quyết định trên tên miền `dev.furfel.net` cho công ty Dev, và chỉ nắm quyền trên tên miền cha là `furfel.net`

Đây là bài toán mà **delegate domain** sẽ giải quyết

Để delegate domain trong AWS thì kiến trúc tổng quát sẽ như hình bên dưới

![](https://i.imgur.com/w5fQhyQl.png)

Bên trong Route 53, chúng ta sẽ tạo một **Public Hosted Zone**, lưu ý là **public** với tên **giống hoàn toàn với domain chính**, theo ví dụ sẽ là `furfel.net`

![Public Hosted Zone furfel.net](https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fael6xqiv8gyd9rnk83g1.jpg)

Sau khi tạo xong hosted zone `furfel.net`, chúng ta mang giá trị NS (name server) của hosted zone vừa tạo đưa cho công ty đang nắm quyền trên tên miền `furfel.net`

![Copy giá trị Nameserver của publich hosted zone vừa tạo](https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fael6xqiv8gyd9rnk83g1.jpg)

Công ty Furfel sẽ vào phần quản lý tên miền và đưa toàn bộ giá trị nameserver vào như một *external name server* là xem như đã delegate xong sub domain cho công ty Dev

![Đưa giá trị NS vào trong tên miền chính](https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Ffuq5hfcya9thvarrizn9.jpg)

Công ty Dev để thêm tên miền `dev.furfel.net`, việc cần làm là tạo thêm một public hosted zone mới, với tên `dev.furfel.net`

![Public Hosted Zone dev.furfel.net](https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Ftwj6kpdp0vym6edjmmw9.jpg)

Copy toàn bộ giá trị NS của hosted zone `dev.furfel.net`, rồi quay lại hosted zone `furfel.net`

![NS của dev.furfel.net](https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fdfjgs3ryjwnvszvwghzb.jpg)

Thêm một record mới tên dev, type là NS và paste giá trị Nameserver vừa copy

![Thêm record mới tên dev bên trong hosted zone dev.furfel.net](https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F9qg56ridyrk3192mk9sn.jpg)
