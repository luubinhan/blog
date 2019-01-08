---
slug: "/2017-03-07-thoi-dai-cua-pixel-perfect-da-het-phan-2"
date: "2017-03-07"
title: "Thời đại của Pixel Perfect Design đã hết từ lâu"
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
- [UI kits](#ui-kits)
- [Xuất file](#xuất-file)
- [Element state](#element-state)
- [Line-Height](#line-height)
- [Font](#font)
- [Kết](#kết)

<!-- /TOC -->


# Grid

Khi bắt đầu dàn trang cho web, sử dụng những hệ thống grid phổ biến hiện nay như <a href="http://getbootstrap.com/css/#grid" target="_blank" rel="noopener noreferrer">Bootstrap Grid</a>. Nếu bạn là designer mà chưa biết đến CSS framework này thì thiệt thiếu xót trầm trọng, nó giải quyết phần lớn các yêu cầu cơ bản về layout, thống nhất sử dụng ngay từ đầu sẽ giúp ít rất nhiều cho mấy anh developer. Quan trọng nhất nên lưu ý là hệ thống grid ngày nay sử dụng độ rộng tương đối (theo giá trị phần trăm của container) và khoảng cách padding cố định. Bạn có thể đọc <a href="https://medium.com/sketch-app-sources/fluid-grid-systems-in-sketch-3-9-2579133c6d08" target="_blank" rel="noopener noreferrer">bài viết sau</a> để hiểu cách xây dựng hệ thống grid trên Sketch

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

Một số tool cho designer như InVision, Axure để biểu diễn flow, Principle, Framer, Adobe After Effect để mô tả hiệu chạy thế nào. Nó sẽ giảm đi những hiểu nhầm giữa designer và developer, khách hàng.

![Thời đại của Pixel Perfect Design đã hết từ lâu - Phần 2](https://cdn-images-1.medium.com/max/800/1*yEMXAwVff__nrM_OCwLknw.gif)

# UI kits

UI kit là tất cả những element bạn đang sử dụng trong project, nếu là dân React có thể gọi là component. Sau này khi muốn maintenance sẽ dễ dàng hơn khi dự án ngày càng phình ra.

Trong cái UI kit cần xác định những thành phần: bảng màu sử dụng, typography, các component như button, input, slider, hover, active state, cũng như người lập trình luôn tâm niệm nếu lập lại một đoạn code một lần thứ 2 trong đời thì cho nó ngay vào thư viện để tái sử dụng. Thường khi các bạn designer không có làm kiểu này thì trước sau gì cũng xảy ra trường hợp cùng một button mà chỗ này khác chỗ kia khác một chút, mà các bạn tester và khách hàng khác cái giao diện là đè đầu thằng developer ra chửi, trong khi cái đó nhiều khi bạn designer không cố ý mà vô tình quên mất mình đã format cái button đó ở đâu đó rồi.

Bạn có thể sử dụng <a target="_blank" href="https://www.invisionapp.com/craft" rel="noopener noreferrer"> Craft</a> để làm thư viện UI

![Thời đại của Pixel Perfect Design đã hết từ lâu - Phần 3](https://cdn-images-1.medium.com/max/800/1*72sMv26eNctbPvOLKZt-Mw@2x.png)

# Xuất file

Giúp ảnh developer, hãy sử dụng những công cụ sau

- [Invision Inspect](https://www.invisionapp.com/feature/inspect)
- [Zeplin](https://zeplin.io/)
- [Sympli](https://zeplin.io/)
- [Sketch Measure](https://github.com/utom/sketch-measure) 

# Element state

Các bạn design hay chỉ làm mỗi cái trạng thái default mà quên rằng một element sẽ có rất nhiều state khác như, như active, hover, focus, visited

![Thời đại của Pixel Perfect Design đã hết từ lâu - Phần 3](https://cdn-images-1.medium.com/max/800/1*oK0YQWhM2Td5A6rqHWlYTA@2x.png)
 
# Line-Height

Có thể khẳng định là 100% anh designer sẽ không để ý đến giá trị này, mà cứ đè ra đo độ cao chính xác từng pixel của element, trong khi không hề biết cái line-height sẽ ảnh hưởng đến độ cao này, đâm ra anh quên cộng vào, và khi anh developer set cái padding trong code là 13, 14 thì anh la làng là nó phải 20, trong khi nếu cộng vào cái line-height nữa nó sẽ ra là 20.

![Thời đại của Pixel Perfect Design đã hết từ lâu - Phần 3](https://cdn-images-1.medium.com/max/800/1*HnnuoS89S6xCdFwWMG9Q2A@2x.png)
 
Một ưu điềm khác khi sử dụng Sketch là lúc làm sẽ thấy ngay sự ảnh hưởng line-height, trong khi photoshop thì sẽ không thấy được

![Thời đại của Pixel Perfect Design đã hết từ lâu - Phần 3](https://cdn-images-1.medium.com/max/800/1*Vqrt-1Vy2Ng1SqeNXG2P0g@2x.png)
 
Giá trị line-height nên không nên thay đổi nhiều quá trên từng element mà thống nhất xài chung một kiểu

# Font

Trước hết, xác định là: "LUÔN LUÔN sử dụng [Google Fonts](https://fonts.google.com/)" nếu muốn xài một font không có sẵn trong máy, bạn developer sẽ không phải đi mò mẫm convert cái font chữ của bạn design chôm ở đâu đó, một công việc vốn quá nhiều rủi ro do vấn đề bản quyền, vấn đề lỗi convert có thể xảy ra, lỗi hiển thị trên các trình duyệt khác nhau.

Cũng không bao giờ được xài nhiều hơn 2 font ngoài hệ thống, quá nhiều font phải load, làm ảnh hưởng tốc độ load site. Không sử dụng quá nhiều font style italic, bold, light, thin, regular, một đóng hầm bà lằng, luôn nhớ trong đầu less is more

![Thời đại của Pixel Perfect Design đã hết từ lâu - Phần 3](https://cdn-images-1.medium.com/max/800/1*KeLj5M7QYKIKkgIneNbKnQ@2x.png) 
 
# Kết

Thằng designer thì vốn không ưa thằng developer, chê thằng developer không thấy được sự sáng tạo của nó, còn thằng developer thì luôn chửi thằng designer, nó cứ chế biến mấy cái tào lào khó implement chết mịa luôn. Tất cả những vấn đề trên có thể giải quyết bằng một cách thôi: TRAO ĐỔI. Trao đổi càng sớm, trao đổi khi có vấn đề sẽ tránh cho ra kết quả mà nhìn vào không dám nhận là con của mình. Với tất cả những dự án dù lớn hay nhỏ thì luôn luôn bạn phải cân đối giữa kết quả mong muốn, thời gian và chi phí phải bỏ ra