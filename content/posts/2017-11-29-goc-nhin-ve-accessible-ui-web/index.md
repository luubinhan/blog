---
slug: "/2017-11-29-goc-nhin-ve-accessible-ui-web"
date: "2017-11-29"
title: "Góc nhìn về Accessible UI"
desc: "Thuật ngữ Accessiblity đang hot trong thời gian gần đây, đã đến lúc thiết kế với tư duy sản phẩm cho mọi người."
category: "ux-ui"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["ux-ui"]
---

<!-- TOC -->

- [Accessibility không chỉ là trách nhiệm của Developer](#accessibility-không-chỉ-là-trách-nhiệm-của-developer)
- [Accessibility cho dân ngoại đạo](#accessibility-cho-dân-ngoại-đạo)
  - [Đừng quá chú trọng đến Animations](#đừng-quá-chú-trọng-đến-animations)
  - [Độ tương phản cần thiết để đọc](#độ-tương-phản-cần-thiết-để-đọc)
  - [Thận trọng khi đặt chữ đè lên hình](#thận-trọng-khi-đặt-chữ-đè-lên-hình)
  - [Kiểm trả kích thước font chữ, độ đậm của chữ](#kiểm-trả-kích-thước-font-chữ-độ-đậm-của-chữ)
  - [Link mở trang mới, cảnh báo người dùng](#link-mở-trang-mới-cảnh-báo-người-dùng)
  - [Phân biệt giữa các icon social media](#phân-biệt-giữa-các-icon-social-media)
  - [Đừng tin tưởng tuyệt đối vào icon và màu sắc để truyền tải nội dung](#đừng-tin-tưởng-tuyệt-đối-vào-icon-và-màu-sắc-để-truyền-tải-nội-dung)
  - [Sẽ ra sau nếu không có tương tác](#sẽ-ra-sau-nếu-không-có-tương-tác)

<!-- /TOC -->

## Accessibility không chỉ là trách nhiệm của Developer

Tình huống như thế này, bạn nhận một website thiết kế one page được approve từ khách hàng, sếp yêu cầu bạn code xong trang này trong 1 tuần, trong đó bao gồm 2 ngày làm việc với bên QA để mọi thứ perfect trước khi tới tay khách hàng. Khi nhìn vào thiết kế này, bạn nhìn ra vấn đề là trên các thiết bị nào nhỏ nhỏ xíu, mấy cái chữ nằm đè trên background này có thể gây khó đọc.

Developer sẽ có một vài lựa chọn sau:

1. Im lặng mặc dù nó biết như thế nó sẽ ảnh hưởng đến accessibility
2. Kệ, làm luôn mặc dù hơi khác thiết kế chút, cứ làm xong rồi giải thích sau.
3. Gởi một bản gợi ý những thay đổi nên làm tới anh designer hoặc khách hàng trước khi làm.

Cái tình huống này gặp như cơm bữa, every project luôn, bạn có thể quánh giá mình thoải mái, nhưng mình sẽ chọn lựa chọn 1. Im lặng.

Nếu chọn cách làm thứ 2, vâng bạn sẽ dính phải hàng tá chỉ trích từ khách hàng, từ sếp, sau không làm đúng hợp đồng, đúng yêu cầu ban đầu, và lựa chọn thứ 3 cũng tương tự. Nếu bạn là người làm việc có 'tâm' và thứ làm cách 3 đi và xem bạn nhận được gì. Khách hàng chưa hẳn đồng ý với điều bạn nói, sếp không hài lòng vì bạn dành thời gian để đưa ra những ý kiến ko đem đến tiền, thử nghĩ nếu bạn làm cách 1, sau đó khách hàng thấy sai, kếu sửa, vậy là sếp lại có cớ đòi thêm tiền.

Vâng còn một lựa chọn thứ 4 nữa, là lựa chọn mình đang làm, đi phổ cập kiến thức accessibility cho những anh designer.

## Accessibility cho dân ngoại đạo

Bạn đem share kiến thức về accessibility cho bất kể là ai: UI Designer, content provider, project managers, khách hàng,... để mọi người biết và quan tâm đến nó, biết sự tồn tại và cần thiết của nó, để mọi người bỏ ngay cái suy nghĩ "đẹp là được"

### Đừng quá chú trọng đến Animations

Với khả năng của css, js, những thư viện hiện có sẵn đầy rẫy được share miễn phí, trang web bây giờ có thể nhìn như một cái slide powerpoint với những animation chim bay, cò bay, tuyết rơi, đèn pha lấp lánh. Ở gốc độ người sử dụng, lần đầu tiên bạn vào trang web chắc hẳn họ sẽ thốt lên "WOW, cool ghê", nhưng tưởng tượng bạn làm một website với mục tiêu người sử dụng truy cập hàng tuần, hàng ngày thì những animation chỉ có vứt đi.

### Độ tương phản cần thiết để đọc

![](https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_1000,f_auto,q_auto/v1508961153/low-contrast-text_twvimd.jpg)

Màu chữ và màu nền không đủ độ tương phản làm rất khó đọc.

![](https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_1000,f_auto,q_auto/v1508961159/low-contrast-text-sunshine_ugzxpt.jpg)

Tương tự, bạn sẽ lướt qua và không để ý đến sự tồn tại của dòng caption bên dưới "Sunshine sue"

Giải pháp? Test màu nền và màu chữ bằng công cụ sau [https://webaim.org/resources/contrastchecker/](https://webaim.org/resources/contrastchecker/)

### Thận trọng khi đặt chữ đè lên hình

![](https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_1000,f_auto,q_auto/v1511044772/burberry-fix_mqdy7i.jpg)

Đố đọc được mấy chữ màu trắng

### Kiểm trả kích thước font chữ, độ đậm của chữ

Xu hướng bây giờ mấy bạn thường cứ thích dùng font chữ mỏng lét, font weight 200 thậm chí 100, nếu lướt ngang thì nhìn UI rất là elegant những mà muốn đọc thì phải nhìn thật kỹ

![](https://notlaura.com/wp-content/uploads/2017/10/typography-improvements-1200x408.jpg)

### Link mở trang mới, cảnh báo người dùng

Khi gắn link mở ra một tab mới, gắn một icon để thông báo cho người ta biết "Link này mở tab mới đó nha"

### Phân biệt giữa các icon social media

Nếu nhìn thấy một button với icon Facebook trên đó, bạn nghĩ nó là gì? dẫn đến trang profile!. Nếu icon đó là một thao tác như share thì cần phân định rõ với lại một icon dẫn đến profile

### Đừng tin tưởng tuyệt đối vào icon và màu sắc để truyền tải nội dung

Đại đa số người sử dụng web nhiều đều biết icon hamburger để mở ra menu chính của trang, nhưng đừng gom đũa cả nắm như thế mà bỏ hết chữ nghĩa, dồn hết vào menu hamburgerd - cho gọn.

Các bạn trên vnexpress nghĩ sẽ rất là cool nếu trên menu mỗi chuyên mục sẽ có màu sắc khác nhau, nhưng thực tế phủ phàng rằng, sự phân định màu sắc theo quan điểm cá nhân này của bạn thiết kế không đem đến lợi ích vì cho người đọc, ai nói mục màu xanh dương thì đại diện cho các bài viết thuộc chuyên mục gia đình, xanh lá là cho thể thao.

### Sẽ ra sau nếu không có tương tác

Lỗi dể thấy trên các trang bán hàng nếu đặt giá hoặc nút mua sản phẩm ẩn đi, chỉ xuất hiện khi có chuột hover lên, và nếu không có hover lên thì sao? người dùng chẳng thấy gì cả, trên điện thoại người ta cũng không rảnh đâu mà đưa tay lên để xem giá từng sản phẩm.


Còn nhiều nào rãnh viết tiếp