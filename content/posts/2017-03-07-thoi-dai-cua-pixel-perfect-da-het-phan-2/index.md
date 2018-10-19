---
slug: "/2017-03-07-thoi-dai-cua-pixel-perfect-da-het-phan-2"
date: "2017-03-07"
title: "Thời đại của Pixel Perfect Design đã hết từ lâu - Phần 2"
desc: "Khi bắt dầu dàn trang cho web, hãy sử dụng những hệ thống grid phổ biến hiện nay như Bootstrap Grid. Nếu bạn là designer mà chưa biết đến CSS framework này thì thiệt thiếu xót trầm trọng..."
category: "javascript"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["css","ux-ui"]
---

<!-- TOC -->

- [Grid](#grid)
- [Responsive design](#responsive-design)
- [Đừng sáng tạo ra cái có sẵn](#đừng-sáng-tạo-ra-cái-có-sẵn)
- [Hiệu ứng](#hiệu-ứng)

<!-- /TOC -->


# Grid

Khi bắt đầu dàn trang cho web, sử dụng những hệ thống grid phổ biến hiện nay như <a href="http://getbootstrap.com/css/#grid" target="_blank">Bootstrap Grid</a>. Nếu bạn là designer mà chưa biết đến CSS framework này thì thiệt thiếu xót trầm trọng, nó giải quyết phần lớn các yêu cầu cơ bản về layout, thống nhất sử dụng ngay từ đầu sẽ giúp ít rất nhiều cho mấy anh developer. Quan trọng nhất nên lưu ý là hệ thống grid ngày nay sử dụng độ rộng tương đối (theo giá trị phần trăm của container) và khoảng cách padding cố định. Bạn có thể đọc <a href="https://medium.com/sketch-app-sources/fluid-grid-systems-in-sketch-3-9-2579133c6d08" target="_blank">bài viết sau</a> để hiểu cách xây dựng hệ thống grid trên Sketch

![Thời đại của Pixel Perfect Design đã hết từ lâu - Phần 2](https://cdn-images-1.medium.com/max/800/1*WLHweZ4cQQSK8hWOY96cbQ@2x.png)
 
Khi sử dụng hệ thống grid như bootstrap bạn sẽ không bao giờ cần phải nói cho anh developer kích thước của từng cột là mấy, vì thực sự lúc này kích thước nó chỉ là một giá trị tương đối

![Thời đại của Pixel Perfect Design đã hết từ lâu - Phần 2](https://cdn-images-1.medium.com/max/800/1*Q_qCy_5PPuR5bPciB5Vbeg@2x.png)
 
# Responsive design

Bạn designer chỉ cần chỉ cho anh developer từng element nó sẽ như thế nào trên các kích thước màn hình khác nhau, luôn luôn nghĩ các element có một kích thước tương đối chứ không phải một giá trị cố định nào đó như 320 - 1024 -1920, vì giao diện responsive phải có khả năng thích nghi với nhiều dạng kích thước màn hình khác nhau nữa.

Không chỉ vậy, một số hình có kích thước phụ thuộc vào container của nó, ví dụ trên desktop bạn cho một cái hình kích thước 200x200, nhưng trên điện thoại kích thước của màn hình sẽ là 375x667 đi, thì các hình này chắc chắn bể liền, thường thấy trên mấy cái thumbnail bài viết.

Một lỗi thường thấy khác là quên rằng độ cao của một số element sẽ thay đổi theo `container`

![Thời đại của Pixel Perfect Design đã hết từ lâu - Phần 2](https://cdn-images-1.medium.com/max/800/1*0odC4Yn4aHanIatRPU7P5w.gif)
 
Sử dụng những `breakpoint` căn bản: 320-375-768-1024-1280-1366-1920. Và tất nhiên tất cả các anh designer đều quên là giao diện đôi khi được xem trên màn hình lật ngang ra.

Ví dụ bên dưới 2 cột hiển thị rất đẹp trên desktop nhưng do sự thay đổi độ cao trên mobile mà nó sẽ trở nên xấu xí

![Thời đại của Pixel Perfect Design đã hết từ lâu - Phần 2](https://cdn-images-1.medium.com/max/800/1*BWi61OpjqFEgHliraTHuLw@2x.png)

 
# Đừng sáng tạo ra cái có sẵn

Nếu không có thời gian, hoặc không chắc có thể customize những component nhỏ xíu như cái dropdown theo kiểu "thích vẽ sau vẻ", hỏi anh developer xem anh có suggest cái thư viện nào có sẵn, thay vì làm lại cái người ta đã làm tốt lắm rồi. Một ví dụ kinh điển là cái datepicker. Rát nhiều designer nghĩ chỉ cần vẽ cái lịch với con số trên đó, mà quên rằng

- Hover effect trên từng ngày
- Trạng thái ngày hiện tại
- Làm sao đánh dấu ngày được chọn
- Làm sao thay đổi tháng, năm
- Ngày trước và sau của tháng hiện tại
 
![Thời đại của Pixel Perfect Design đã hết từ lâu - Phần 2](https://cdn-images-1.medium.com/max/800/1*Cgndb4fH9aXPnrLIuyuE4Q@2x.png)
 
Chúng ta đang sống trong cái thời đại mà mọi người đều cố xây dựng mọi thứ của riêng mình (style Nhật). Đôi khi, có một sản phẩm chạy được cho khách hàng thì tốt hơn là lãng phí thời gian và tiền bạc cho một anh designer ngồi đó sáng tạo ra những thứ người ta đã có sẵn. Designer phải biết rằng anh có thể sử dụng những thư viện và component có sẵn  để hoàn tất project. Nó sẽ giảm đi effect không chỉ của designer mà còn cả developer ngồi đó tìm ra những giải pháp không thực sự cần thiết

# Hiệu ứng

Thay vì ngồi viết note giải thích các trang flow đi như thế nào, viết docs như vậy thực sự méo cần thiết. Designer chỉ cần sử dụng những trang như InVision hay Axure để biểu diễn cái flow,  dụng Principle, Framer, Adobe After Effect để mô tả mấy hiệu chạy thế nào. Nó sẽ giảm đi những hiểu nhầm giữa designer và developer, khách hàng

![Thời đại của Pixel Perfect Design đã hết từ lâu - Phần 2](https://cdn-images-1.medium.com/max/800/1*yEMXAwVff__nrM_OCwLknw.gif)
 
Phần 3 - UI kits, Export, Element State, Line-height, Fonts