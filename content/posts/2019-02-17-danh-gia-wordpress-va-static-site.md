---
slug: "/2019-02-17-danh-gia-wordpress-va-static-site"
date: "2019-02-17"
title: "Wordpress vs Static site"
desc: "Chúng ta cùng nhau điểm qua cái hay, cái dở của từng thằng để nghiền ngẫm xem nó phù hợp trong trường hợp nào."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["ux-ui"]
---


<!-- TOC -->

- [Static Site](#static-site)
  - [Thế mạnh](#thế-mạnh)
    - [Tốc độ](#tốc-độ)
    - [Nội dung nhiều lên, vấn đề cũng ít phức tạp hơn](#nội-dung-nhiều-lên-vấn-đề-cũng-ít-phức-tạp-hơn)
    - [Bảo mật](#bảo-mật)
    - [Chi phí duy trì rẻ](#chi-phí-duy-trì-rẻ)
  - [Thế không mạnh](#thế-không-mạnh)
    - [Không thân thiện với người dùng bình thường](#không-thân-thiện-với-người-dùng-bình-thường)
    - [Hạn chế tính năng](#hạn-chế-tính-năng)
    - [Cộng đồng sử dụng không nhiều](#cộng-đồng-sử-dụng-không-nhiều)
- [Wordpress](#wordpress)
  - [Thế mạnh](#thế-mạnh-1)
    - [Một giao diện admin để cập nhập nội dung mà mọi khách hàng đều hài lòng](#một-giao-diện-admin-để-cập-nhập-nội-dung-mà-mọi-khách-hàng-đều-hài-lòng)
    - [Hàng tá giao diện để lựa chọn](#hàng-tá-giao-diện-để-lựa-chọn)
    - [Feature cài thêm đủ đáp ứng mọi nhu cầu từ thấp đến trung bình](#feature-cài-thêm-đủ-đáp-ứng-mọi-nhu-cầu-từ-thấp-đến-trung-bình)
    - [Nhiều công ty, dịch vụ rẻ như đi chợ cá](#nhiều-công-ty-dịch-vụ-rẻ-như-đi-chợ-cá)
    - [Thế yếu](#thế-yếu)
- [Kết luận](#kết-luận)

<!-- /TOC -->

Sếp cũ hôm rồi liên lạc hỏi “em có biết công ty nào nhận làm Gatsby không, anh muốn làm một cái static site cho công ty”, cái blog này bạn đang đọc cũng được viết bằng Gatsby, một static site generator, với developer thì static site không xa lạ, nhưng để trả lời có công ty nào nhận làm static site thì mình ko biết, đa phần người ta sẽ dùng một CMS nào đó như Wordpress,  để đảm bảo có admin cho bạn vào quản lý. Wordpress không có gì sai, mình làm wordpress khoảng hơn 3 năm, cũng tự viết theme, tự viết plugin, mình vẫn xài Wordpress một số trường hợp. Tuy nhiên static site mấy năm trở lại đây được quan tâm nhiều hơn trước kia vì những lợi ích mà nó mang lại.

Static site là gì, nói nôm na là một website chỉ bao gồm html/css/javascript không có database, nó sẽ được build từ file [markdown](/blog/2018-11-03-gioi-thieu-markdown), dùng một số tool phổ biến để build như

- [Jekyll](https://github.com/jekyll/jekyll) 
- [Hugo](https://github.com/gohugoio/hugo) 
- [next.js](https://github.com/zeit/next.js) 
- [gatsby](https://github.com/gatsbyjs/gatsby) 
- [gitbook](https://github.com/GitbookIO/gitbook) 
- [nuxt](https://github.com/nuxt/nuxt.js) 
- [vuepress](https://github.com/vuejs/vuepress) 
- [mkdocs](https://github.com/mkdocs/mkdocs)

## Static Site
### Thế mạnh
#### Tốc độ

Tốc độ hiển thị nội dung của trang sẽ rất nhanh, nếu không muốn nói là nhanh nhất trong tất cả các “thể loại” website. User có thể chấp nhận một website giao diện ko cần pixel perfect (designer có thể không), nhưng sẽ không tha thứ cho một website load lâu hơn rùa bò. Không cần thời gian để query từ database lên, việc load dữ liệu từ host lên phía client tiết kiệm rất nhiều xử lý.

Đồn đoán là Google nó cũng rank những site có tốc độ load trang nhanh,  cao hơn các trang load ì ạch [Bài thử nghiệm chi tiết](https://moz.com/blog/how-website-speed-actually-impacts-search-ranking)

Để test bạn dùng [Ping Dom](https://tools.pingdom.com/)

#### Nội dung nhiều lên, vấn đề cũng ít phức tạp hơn

Khi nội dung của trang nhiều lên, thí dụ 10.000 bài viết trong wordpress, thì database nó cũng sẽ phình lên, số lượng user truy cập **vượt ngoài mong đợi** 10.000 user một ngày, nó sẽ phát sinh ra khá nhiều vấn đề cần xử lý. Và một trong những cách đó là chuyển một phần nội dung đó về static site! Bạn thấy sức mạnh của static site ghê chưa. Tất nhiên static site khi lớn lên nó cũng phát sinh vấn đề, tuy nhiên nó sẽ dễ xử lý và đơn giản hơn như wordpress

#### Bảo mật

Quá hiển nhiên là static site thì chẳng có gì phải quan tâm đến bảo mật, ko có quản lý user, không có database để mà hack đâu nhé. Những static site chỉ đơn thuần là hiển thị thông tin lên bằng file html, 99.999999% là ko bị hack, trừ khi nó cướp luôn được host và tên miền.

#### Chi phí duy trì rẻ

Để duy trì một static site, bạn chỉ tốn vài đô hàng tháng cho dịch vụ hosting, vài trăm k một cái tên miền. Nếu dùng wordpress hay một CMS nào đó khác đi, bạn phải trả cao hơn vì bạn dùng đến database và một host chạy php, chưa nói đến việc bạn lưu trữ đủ thứ trên đó khiến dung lượng ổ cứng lúc nào cũng ko đủ dùng. Bèo lắm cũng 120$ một năm. Nếu sử dụng GitHub pages cho static site, bạn gần như chỉ tốn tiền domain

### Thế không mạnh
#### Không thân thiện với người dùng bình thường

Mặc dù markdown được sinh ra là để phục vụ cho đối tượng user không biết gì về lập trình, người dùng bình thường nhất có thể viết được nội dung chuẩn html ko cần chỉnh, tuy nhiên không quá nhiều người không rành công nghệ biết cách viết markdown, và mình thấy đa số họ lại thích một cái editor phức tạp như Word hơn, hoặc là copy từ word lên mà muốn giữ format lại 

```markdown
# Heading 1
## Heading 2
Nội dung
### Heading 3
```

Khách hàng sẽ thích thú có một cái trang admin, đăng nhập vào và được chủ động cập nhập theo ý thích hơn, một editor đầy đủ tính năng chỉnh màu chữ, chèn hình, xử lý hình, thay đổi font chữ to nhỏ, đổi kiểu chữ lung tung ben lên. Static site sẽ không có những thứ đó cho bạn

![Wordpress vs Static site](https://kinsta.com/wp-content/uploads/2018/03/what-is-a-content-management-system-1.png)

#### Hạn chế tính năng

Những tính năng căn bản như contact form, bình luận sẽ phải *outsource* cho một bên thứ 3, static site chỉ giới hạn ở mức hiển thị nội dung, tìm kiếm căn bản, lọc căn bản trong html

#### Cộng đồng sử dụng không nhiều

Như sếp mình, bạn là một công ty, bạn tìm một công ty làm static site sẽ khó khăn hơn, vì thẳng thắng mà nói, số tiền kiếm được của một static site nói chung rất chi là nhỏ, rất ít công ty **thèm** làm.

## Wordpress

Cũng đâu phải tự nhiên mà [33% site trên internet là wordpress](https://kinsta.com/wordpress-market-share/), nó cũng có nhiều cái hay ho nên thiên hạ mới ào ào kéo vào xài.

### Thế mạnh
#### Một giao diện admin để cập nhập nội dung mà mọi khách hàng đều hài lòng

Giao diện admin của wordpress thực sự ảnh hưởng rất lớn đến thế giới web, nếu ko muốn nói ai làm trang admin cũng đè wordpress ra tham khảo. Với cái giao diện admin bị chê đó bạn làm được đủ thứ
Viết nội dung mới
Thay đổi giao diện trang web
Tùy biến tính năng
Cấu hình SEO
Cập nhập, phục hồi dữ liệu cũ

#### Hàng tá giao diện để lựa chọn

![Wordpress vs Static site](https://kinsta.com/wp-content/uploads/2018/03/wordpress-vs-static-html-2-1024x583.png)

Kho giao diện không những nhiều mà còn dễ cài, một vài cú click là xong, nếu từng đụng vô Joomla, bạn sẽ thấy việc cài giao diện Wordpress dễ dàng hơn như thế nào.

#### Feature cài thêm đủ đáp ứng mọi nhu cầu từ thấp đến trung bình

Plugin cũng là một thế mạnh của Wordpress, cần gì cũng có, thanh toán, tích hợp paypal, forum, ecommerce, social network, tìm là thấy. Được đến ngày hôm nay cũng nhờ cộng động sử dụng Wordpress rất đông đảo.

![Wordpress vs Static site](https://kinsta.com/wp-content/uploads/2018/03/wordpress-vs-static-html-3-1024x570.png)

#### Nhiều công ty, dịch vụ rẻ như đi chợ cá

Google một phát về dịch vụ làm website ở Việt Nam, trong 100 công ty thì chắc đến 99 công ty làm wordpress, chưa kể đến cộng đồng freelancer. Giá cả thì cũng đủ loại, vô vàn để bạn có thể lựa chọn cho phù hợp từ 500k đến vài trăm triệu.

#### Thế yếu  

Một cách ngắn gọn nhất, những gì là thế mạnh của static site chính là thế yếu của Wordpress, load chậm, open source đồng thời với sự **nổi tiếng** của nó, Wordpress luôn là đích ngắm của cộng đồng hacker **thực tập** (hacker thực thụ ko rãnh hơi đâu hack mấy trang wordpress vặt vãnh). Việc gồng gánh những website có nội dung to nặng đòi hỏi sức người, sức của khá nhiều, không hiểu những trang như tuổi trẻ, vnexpress mà làm wordpress sẽ ra làm sao

## Kết luận

Thường những việc trên đời, mình làm thì mình biết, cái nào hợp với mình thì chỉ có mình mới biết được.
                    