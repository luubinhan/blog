---
slug: "/2018-11-06-react-native-lap-team-nhu-the-nao"
date: "2018-11-06"
title: "Chia sẻ của lead team React Native trong quá trình lập team React Native"
desc: "Bài viết sẽ phù hợp với founder của một startup, hoặc CTO. Bài viết này là chia sẻ của một team lead đang làm React Native, khía cạnh kỹ thuật cũng như cách tổ chức một team."
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["react-native"]
---

React Native đang là xu hướng lựa chọn của nhiều công ty khi muốn bắt đầu làm app, với lời đường mật build một lần chạy cả 2 nền tảng iOS và Android khiến ai cũng muốn học và muốn làm

Trước khi đưa ra quyết định lựa chọn công nghệ nào cho sản phẩm của công ty, đây là những thứ bạn luôn phải cân nhắc: được gì và mất gì với React Native

# 1. Được

## 1.1. Build nhanh hơn

Một trong những selling point của React Native việc phát triển app nhanh hơn, với rất nhiều thư viện nguồn mở trên mạng, rất nhiều component giải quyết các vấn đề chung mà bạn ko cần built từ đầu.

Javascript là thứ ngôn ngữ được sử dụng *quá nhiều* ở những năm gần đây, càng nhiều developer có kiến thức nền tảng của Javascript, muốn học javascript, nhân lực rất dồi dào.

## 1.2. Một framework, nhiều platform

Bạn có thể copy một phần code để xài chung giữa iOS, Android, hay thậm chí là web. Công đồng React Native cũng không ngừng cung cấp nhiều module native ngon, open source để không phải viết lại.

## 1.3. Hot reloading

Tính năng thần thánh giúp chúng xem ngay kết quả sau khi thay đổi UI, với dân làm web thì bình thường nhưng với người làm app nó là tính năng giúp tiết kiệm cả khối thời gian so với build bằng native.

# 2. Mất

## 2.1. Không phải module nào cũng ngon

Một vài module bạn cần có thể không có sẵn, hoặc không có document đàng hoàng, hoặc thậm chí chạy không tốt như quảng cáo, tất cả là open source, đôi khi cũng phải built từ đầu hoặc chỉnh sửa từ những cái có sẵn.

## 2.2. Performance

Đạt được performance như Native app thực sự quá khó cho các nền tảng muốn chạy cross platform. Bạn sẽ phải đánh đổi giữa bộ nhớ, kích thước app, tốc độ.
## 2.3. Vẫn cần Native Developer
Implement một vài tính năng native vẫn cần kiến thức của platform đó. Như truy cập sensor, camera hoặc push notification cần sự giúp đỡ của iOS và Android developer.


Không phải mọi thứ đều làm được như native app mặc dù bạn sẽ luôn thấy React Native luôn được quảng cáo là chạy trên nhiều platform. Trên khía cạnh kinh doanh, các công ty chống lưng cho Android và iOS sẽ luôn làm cho platform của họ khác biết với đối thủ. 

## 2.4. Sân chơi của Facebook

React Native suy cho cùng là một project riêng của Facebook sau được chuyển thành open source, Facebook ko được thừa hưởng những tài liệu được dấu bởi Apple và Google, họ đâu muốn tặng hết cái android và iOS ra ngoài. Đồng nghĩa với việc, sẽ rất nhiều kiến thức nằm rải rác khắp nơi trên Github issue, blog, tweet, trao đổi, hội thảo, chưa có một official document nào đầy đủ.

React Native tiến hoá không ngừng. Cứ mỗi tháng có release mới, nếu nguyên cái app không chết, thì cũng chết một vài thư viện đang dùng. Upgrade là một cơn ác mộng, còn nếu không upgrade, sau 6 tháng là xem như app bạn đã lỗi thời

## 2.5. Về mặt con người

Nếu đang có một team mobile, giới thiệu một team React Native, chẳng khác nào bạn đang đưa team mobile vào một thế tiến thoái lưỡng nan, rất nhiều dev chuyên mobile native không hứng thú với javascript, những iOS developer sẽ trả lời với bạn rằng Objective-C/Swift là phát minh của thượng đế.

Nếu bạn đã có người đảm nhiệm cho iOS và Android rồi, React Native không phải là lựa chọn dành cho bạn. Bài học từ AirBnB, một trong những team engineer được nể trọng nhất thời điểm hiện tại, họ đã đặt cược rất sớm vào React Native, nhưng cuối cùng bỏ cuộc vì vấn đề văn hoá “brownfield”


<a href="https://www.youtube.com/watch?v=tWitQoPgs8w" target="_blank" rel="noopener noreferrer">Leland Richardson - React Native in the "Brown Field" - React Conf 2017</a>

<a href="https://medium.com/airbnb-engineering/sunsetting-react-native-1868ba28e30a" target="_blank" rel="noopener noreferrer">Sunsetting React Native</a>


Nếu công ty bạn chỉ mới có iOS, chuẩn bị build Android, hãy chọn React Native để build Android

# 3. Lập team

Chúng ta hãy đứng trên góc nhìn của một người viết mobile app về React Native. Rất nhiều web developer, bao gồm mình, muốn làm app. Tuy nhiên React Native sẽ không thay thế hoàn toàn native app. Thật ra nó còn làm một thứ phức tạp hơn, bạn phải loay hoay kết hợp giữa React, iOS, Android cùng lúc.

Trong một thế giới lý tưởng, nơi bạn có chuyên gia iOS, chuyên gia Android trong team. Nhưng không, bạn chỉ được chọn một native developer, hãy chọn Android. React Native trên iOS dễ quản lý hơn trên Android. Ở Mỹ, đa phần những người làm trong kỹ thuật, như đội của Facebook chẳng hạn, user cũng vậy, sử dụng iOS nhiều hơn, nói nôm na iOS luôn được ưu tiên và test kỹ hơn trên iOS. Android sẽ có những lỗi mà chỉ có chuyên gia trên Android mới hiểu nổi.

![](https://cdn-images-1.medium.com/max/1600/1*ivbK3rkZMIAgt9hVpNshig.png)
![](https://cdn-images-1.medium.com/max/800/0*HvHub4QRI5jFiihz.jpg)

Sau khi thuê lead React Native, bạn nên thuê thêm 2 người chuyên làm React. Họ không cần kinh nghiệm native mobile. Chỉ cần đảm bảo họ có khái niệm trong đầu về mobile app, đừng dùng những người chỉ biết web. Làm React Native sẽ vướng nhiều vấn đề mà người làm web sẽ cảm thấy khó chịu vì những vấn đề với web thì nó quá đơn giản.
3 người là đủ, tất nhiên cũng tùy thuộc vào tốc độ phát triển của ứng dụng. Lead của team nên dùng 50% thời gian để phát triển tính năng, còn lại thì maintain và hỗ trợ các dev khác

Designer phải là người am hiểu mobile app, dù team dev có mạnh cỡ mấy, app chạy nhanh cỡ mấy, nhưng thiết kế không tốt sẽ làm user khó xài và cảm thấy app cùi. Web nó hơi khác mobile app, user không muốn có 10 cái input phải cuộn lên cuộn xuống trên màn hình để nhập hết.

Không nên nhốt developer trong một cái phòng dành 8 tiếng một ngày chỉ để phát triển sản phẩm, cho họ tí thời gian để nâng cao kiến thức, đưa đi các hội thảo 1 lần 1 năm. Đó là cách tốt nhất để cập nhập và tạo mối quan hệ với những người có hiểu biết. Lý tưởng là thế, nhưng thực sự công ty cũ của mình họ không muốn developer ngao du trên mạng quá nhiều, không slack, không github, không youtube để xem conference ở nước ngoài. Nếu muốn có team xịn bạn phải đầu tư cho thành viên phát triển .

# 4. Quản lý dự án

Nếu đã có auth và code xử lý API đã viết cho web, có thể tách ra và sử dụng lại trên app. Các bạn web dev luôn rất hào hứng để viết tính năng cho app, nhưng họ gặp rất nhiều khó khăn liên quan đến build, các bug thuộc phần native.

## 4.1. Dựng design system

Nếu muốn đẩy nhanh quá trình phát triển, tạo một design system là lựa chọn của tất cả các công ty lớn hiện nay. Design system nó là một tập các component có thể tái sử dụng và tuân theo một cái guideline rõ ràng. Cái này cần sự kết hợp giữa dev và designer. Nó còn giúp cho 2 thành phần 2 cãi nhau này có tiếng nói chung, có sự thống nhất ngay từ đầu. Đa phần các designer thường vẽ screen chứ không vẽ component trước. Khi tập trung vào screen, designer thường có xu hướng cho ra rất nhiều kiểu khoảng trống, kích thước font chữ, màu sắc khác nhau. Khi dev bắt tay vào làm trên từng screen, họ hay cảm thấy làm biến vì khối lượng công việc hơi nhiều và quá chi tiết, vài ngày sau đến trang khác đôi khi design lại đổi. Không có design system rất khó update các screen cũ và không kiểm soát được sự đồng nhất.

Những team vận hành như vậy thường đổ hết tội lỗi cho dev rằng không tinh tế, không pixel-perfect, không chi tiết được như designer. Nếu rơi vào tình huống này, chúng ta không nên đổ lỗi cho ai cả, tìm cách cắt giảm mức độ phức tạp của thiết kế. Chìa khoá cuối cùng vẫn là system design mấy bạn.

Nếu đã có app rồi, giờ đi làm lại design system thì nó tốn công, nhưng nó đáng. Ai đó hãy tin mình đi, bạn không biết bạn đã lãng phí bao nhiêu thời gian cho thiết kế đâu.

Thế còn component có thể dùng trên cả web và app thì sao? React cho web và React Native rất là giống nhau nhưng nó có những khác biệt rõ ràng, `<div/>` và `<View/>`, CSS và Stylesheet. Với kinh nghiệm của mình, việc copy, chỉnh sửa cho 1 component web, 1 component app không có gì khủng khiếp, việc làm 1 component mà chạy được cả 2 mới là “xương”


<a href="https://www.netguru.co/blog/react-native-pros-and-cons" target="_blank" rel="noopener noreferrer">React Native - Pros and Cons Of Facebook’s Framework</a>


<a href="https://medium.com/@GroundControl/how-to-build-your-react-native-team-d8bc4be6014a" target="_blank" rel="noopener noreferrer">How to build your React Native team</a>




