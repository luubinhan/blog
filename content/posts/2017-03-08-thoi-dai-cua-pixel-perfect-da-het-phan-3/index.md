---
slug: "/2017-03-08-thoi-dai-cua-pixel-perfect-da-het-phan-3"
date: "2017-03-08"
title: "Thời đại của Pixel Perfect Design đã hết từ lâu - Phần 3"
desc: "UI kit là tất cả những element bạn đang sử dụng trong project, nếu là dân React có thể gọi là component. Sau này khi muốn maintenance sẽ dễ dàng hơn khi dự án ngày càng phình ra."
category: "javascript"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["css","ux-ui"]
---

<!-- TOC -->

- [UI kits](#ui-kits)
- [Xuất file](#xuất-file)
- [Element state](#element-state)
- [Line-Height](#line-height)
- [Font](#font)
- [Kết](#kết)

<!-- /TOC -->


# UI kits

UI kit là tất cả những element bạn đang sử dụng trong project, nếu là dân React có thể gọi là component. Sau này khi muốn maintenance sẽ dễ dàng hơn khi dự án ngày càng phình ra.

Trong cái UI kit cần xác định những thành phần: bảng màu sử dụng, typography, các component như button, input, slider, hover, active state, cũng như người lập trình luôn tâm niệm nếu lập lại một đoạn code một lần thứ 2 trong đời thì cho nó ngay vào thư viện để tái sử dụng. Thường khi các bạn designer không có làm kiểu này thì trước sau gì cũng xảy ra trường hợp cùng một button mà chỗ này khác chỗ kia khác một chút, mà các bạn tester và khách hàng khác cái giao diện là đè đầu thằng developer ra chửi, trong khi cái đó nhiều khi bạn designer không cố ý mà vô tình quên mất mình đã format cái button đó ở đâu đó rồi.

Bạn có thể sử dụng <a target="_blank" href="https://www.invisionapp.com/craft"> Craft</a> để làm thư viện UI

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