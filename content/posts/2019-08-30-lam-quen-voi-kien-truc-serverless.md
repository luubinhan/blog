---
slug: "/2019-08-30-lam-quen-voi-kien-truc-serverless"
date: "2019-08-30"
title: "Làm quen với kiến trúc Serverless"
desc: "Mình không phải chuyên gia trong lĩnh vực này, nghiên cứu để biết thêm, thấy cũng hay, chia sẽ cho mọi người cùng đọc"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "hoc-thuat"]
---

<!-- TOC -->

- [Serverless là gì](#serverless-l%c3%a0-g%c3%ac)
- [Function as a Service](#function-as-a-service)
- [Case Study](#case-study)

<!-- /TOC -->


Mười mấy năm về trước, ngày còn đang học đại học, mỗi lần đến ngày đăng ký môn học là mình được nghe điệp khúc hát mãi "server quá tải, số lượng sinh viên tranh nhau vào các lớp có nhiều gái xinh quá đông, quá nguy hiểm, mấy em vui lòng canh 12 giờ đêm, khi ko còn ai lên đăng ký môn học, chúng tôi mới đáp ứng kịp"

Ngày đó Server của trường nằm ở Nguyễn Văn Tráng, phòng server nhỏ như hang thỏ, mà chỉ xài đúng mấy ngày đầu học kỳ, nên thầy trưởng khoa ko thể nào xin ngân sách được để mà nâng cấp 10 mấy con server cho các em sinh viên xài thỏa thích.

Bài toán Server đó giờ được giải quyết ra sao? **Serverless**

Trước tiên cần khẳng định **Serverless** không phải là bạn không cần server. Một shop *thú nuôi* đơn giản, vài ngàn người mua hoa một tháng, làm bằng wordpress bạn sẽ không thấy được lợi ích từ việc sử dụng kiến trúc mới này, không những vậy còn là việc ném một cục tiền cho mấy thằng bán dịch vụ như Amazon

Trang bán thú nuôi, kiến trúc cũ sẽ là thế này

![kiến trúc cũ sẽ là thế này](https://martinfowler.com/articles/serverless/ps.svg)

Tất cả những logic sẽ nằm ở **ứng dụng phía server**: từ authentication, page navigation, searching, transaction (code backend đó)

Yêu cầu cần có ngân sách, kế hoạch cụ thể, lắp đặt các hệ thống máy chủ, tìm một chỗ để máy, đảm bảo luôn có điện, luôn mát lạnh, đi dây, chọn nhà cung cấp mạng không bị cá mập cắn…

Nói chung bạn tự làm mọi thứ, hoặc bỏ tiền ra thuê một thằng làm mọi thứ, mà nó còn hay đòi hỏi thêm thắt này kia nọ, vô cùng tốn thời gian, nhân lực, tiền bạc, cơ sở hạ tầng.

*Infrastructure as a service - IaaS*, các dịch vụ cho *thuê mặt bằng* ra đời. Đáp ứng nhu cầu tiết kiệm chi phí ở thời điểm đầu, nhưng vẫn có thể *bành trướng* khi cần.

Bạn hình dung nó như việc mở một quán ăn, phải tìm mặt bằng, tìm người giữ xe, chỗ để xe cho khách, thu hút khách vào ăn, thanh toán, sửa chữa điện, nước… Những thằng **IaaS** là các trung tâm thương mại, nó lo hết mọi thứ khác, bạn chỉ việc bỏ tiền ra và thuê lại mặt bằng và kinh doanh.

## Serverless là gì

Nó như một khái niệm kinh tế học, không có một cách định nghĩa chính xác Serverless là gì! Có thể hiểu theo 2 cách sau

Serverless được dùng để ám chỉ những ứng dụng sử dụng phần lớn (hoặc toàn bộ) dịch vụ "nhà hàng xóm" (third-party), được host trên cloud, cho các vấn đề ở phía server là logic và state (ví dụ trạng thái đăng nhập, một dạng của dịch vụ chăm sóc khách hàng thân thiết). Những ứng dụng **để sử dụng** (không phải những trang profile công ty, show hiệu ứng bay lượn portfolio, ví dụ như Facebook, ứng dụng đăng ký môn học, hoặc ứng dụng điện thoại bị chửi bới quá trời FaceApp, tức là mô hình này không chỉ áp dụng riêng cho web). Những dịch vụ thường được outsource cho nhà hàng xóm là gì: database có [Parse](https://parseplatform.org/), [Firebase](https://firebase.google.com/), authentication có [Auth0](https://auth0.com/), AWS Cognito. Mấy nhà này nằm trong khu "Backend as a Service" - **BaaS**, khi gắn vào *hậu tố* as a Service bạn có thể biết là nó nằm ở nhà hàng xóm.

Serverless cũng có nghĩa là ứng dụng đó logic server vẫn có, developer vẫn phải viết logic này, tuy nhiên, không giống kiến trúc truyền thống, nó chạy theo cơ chế "tiền trao-cháo múc" (event-trigger), không quan tâm anh bạn có ở chung nhà mình không (stateless compute container). Khái niệm này được [@marak trên Twitter](https://twitter.com/marak) gọi là **Function as a Service** - **FaaS**, bạn có nhu cầu cắt tóc, gội đầu, uống cafe, đánh giày thì bạn ra *tiệm* hết, không dùng đồ *nhà* có sẵn nữa. Hiện tại, [AWS Lambda](https://aws.amazon.com/lambda/) là một trong những platform nổi tiếng nhất khi nói đến FaaS

Giờ nói tới FaaS, nó đang là trend, nó thay đổi cách chúng ta trước đây vẫn nghĩ về kiến trúc dưới server.

Tất cả những ông lớn đều có các sản phẩm BaaS và FaaS, [Amazon Serverless](https://aws.amazon.com/serverless/), [Google Cloud Functions for Firebase.](https://firebase.google.com/docs/functions/)

![Tất cả những ông lớn đều có các sản phẩm BaaS và FaaS](https://hackernoon.com/hn-images/1*t4O4UXpdG68MQboNKC6bBw.jpeg)

Một kiến trúc Serverless nó như thế này

![Một kiến trúc Serverless](https://martinfowler.com/articles/serverless/sps.svg)

1. Phần authen trước đây được gửi *nhà hàng xóm* làm (cơ quan nhà nước chuyên cung cấp CMND)
2. Dữ liệu được đưa một về nhà kho quản lý, kiểu như Tiki bây giờ quá mệt quản lý kho hàng, các cửa hàng nhỏ lẻ tự quản lý kho, Tiki bán được thì chạy tới kho của bên thứ 3 lấy.
3. Với 2 thay đổi ở trên, điều này có nghĩa là một vài logic đã được nằm ở phía client, thí dụ, user session, bạn sẽ thấy rõ nhất ở các Single Page App chúng ta build, phần logic giao diện cho user đã và chưa đăng nhập nằm ở client - *nhà user*, những route nào user có thể vào nằm ở code client
4. Một vài hiển thị, ràng buộc tất nhiên vẫn được server nắm. Thí dụ "search". Chúng ta có thêm một *nhà* gọi là "API Gateway", dịch vụ giao nhận, tất cả các yêu cầu từ client đưa về đây, các anh em HTTP sẽ đi lấy dữ liệu từ kho về cho chúng ta.
5. Với tính năng đặt hàng, nó do một *nhà** khác cung cấp. Những logic khác nhau, được tách và deploy thành những *cục* khác nhau như vậy cách tiếp cận của FaaS cũng là cách tiếp cận rất phổ biến trong "Microservices"

Nó sẽ có những lợi ích i chang như Microservices, tất nhiên là có trả giá, có nhiều thứ để kiểm soát và theo dõi hơn, vấn đề bảo mật cũng không phải đơn giản như xưa, nằm ở nhiều nơi quá mà, bài toán đi đi lại tránh kẹt xe giữa các hệ thống khác nhau, biết đâu đi lạc vào chổ nào đó mất CMND luôn !!

## Function as a Service

Nãy giờ nói FaaS nhiều quá rồi, giờ "đào sâu" nghiên cứu nó chút. Trích dẫn từ trang [Amazon Lambda](https://aws.amazon.com/lambda/)

> AWS Lambda lets you run code without provisioning or managing servers. (1) ... With Lambda, you can run code for virtually any type of application or backend service (2) - all with zero administration. Just upload your code and Lambda takes care of everything required to run (3) and scale (4) your code with high availability. You can set up your code to automatically trigger from other AWS services (5) or call it directly from any web or mobile app (6).

Diễn giải đoạn dài ngoằn kia

(1) FaaS là chạy backend code mà không cần quan tâm việc quản lý và bảo trì hệ thống server.

(2) FaaS không yêu cầu một framework hay thư viện cụ thể nào. Các **function** trên Lambda có thể được viết bằng Javascript, Python, Go, Java, Clojure, Scala, .NET.

(3) Deploy sẽ rất khác với hệ thống truyền thống. Tới *nhà** của FaaS chúng ta đưa đoạn code cho chủ nhà, còn lại chủ nhà làm gì thì làm.

(4) Scale sẽ tự động được chủ nhà làm. Nếu hệ thống cần đáp ứng 1000 request đồng thời, chủ nhà sẽ lo, bạn chỉ cần bơm tiền. Quan trọng nhất, bên cung cấp dịch vụ sẽ quản lý hết toàn bộ resource, xin giấy phép, nói chung là toàn bộ - bạn không cần làm gì với cluster, VM cả.

(5) Cung cấp cơ chế trigger ứng với các event bạn muốn.

(6) Mấy bên cung cấp dịch vụ, cho phép các function này trigger theo những sự kiện HTTP request, như ví dụ là search, và purchase, hoặc gọi trực tiếp lên các API được cung cấp bởi bên cung cấp

## Case Study

[PhotoVogue](http://www.vogue.it/en/photovogue) trang Vogue của Ý, chạy từ năm 2011, sau một năm chạy, photographer bu vô như kiến, server ở nhà riêng quá tải không chịu nổi.

Giám đốc kỹ thuật quyết định chuyển đổi toàn bộ hệ thống server ở *nhà riêng* sang AWS trong 3 tháng.

Chạy theo trend này, còn có những cái tên rất phổ biến là Uber, Pokemon Go, Airbnb, Clash of Clans và rất nhiều ứng dụng khác khi số lượng user và real-time data lớn

Những vấn đề mà team PhotoVogue đã gặp

- Có hơn 130,000 photographer trên khắp thế giới sử dụng hệ thống để đưa ảnh lên, ước tính có khoảng 400,000 ảnh, với dung lượng tối đa mỗi hình là 50MB (bọn này chơi sang nhỉ)
- Số lượng truy cập ngày càng tăng
- Trải nghiệm sử dụng của user không tốt, thao tác xử lý quá chậm, up ảnh quá rùa

Với AWS, nó đã giải quyết các vấn đề sau cho PhotoVogue

- Khả năng scale, dễ maintenance, quản lý chi phí rõ ràng
- Lưu trữ hình trên Amazon S3
- Khi up lên Amazon S3, bật trigger sử dụng AWS Lambda function, convert các file này qua gif, jpeg, png, tiff
- Amazon API Gateway được sử dụng để làm tầng caching của REST API, Amazon CloudFront cho CDN


![Kiến trúc Serverless](https://www.simform.com/wp-content/uploads/2017/12/serverless-graph.png)

Còn vấn đề nào nữa không, mình hy vọng bạn nào chuyên gia vào chỉ giáo

Tài liệu tham khảo

<a target="_blank" rel="noopener noreferrer" href="https://hackernoon.com/what-is-serverless-architecture-what-are-its-pros-and-cons-cc4b804022e9">📜 What is Serverless Architecture? What are its Pros and Cons?</a>

<a target="_blank" rel="noopener noreferrer" href="https://martinfowler.com/articles/serverless.html">📜 Serverless Architectures</a>

<a target="_blank" rel="noopener noreferrer" href="https://www.simform.com/serverless-architecture-guide/">📜 Serverless Architecture: A Comprehensive Guide</a>

