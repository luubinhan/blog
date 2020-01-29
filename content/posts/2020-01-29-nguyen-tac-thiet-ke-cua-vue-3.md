---
slug: "/2020-01-29-nguyen-tac-thiet-ke-cua-vue-3"
date: "2020-01-29"
title: "Những nguyên tắc chung mà Vue 3 đã áp dụng khi thiết kế"
desc: "Nguyên tắc (principle) được áp dụng khi cần đưa ra một quyết định kỹ thuật trước vô vàng các lựa chọn. Nếu bạn đã biết được mọi thứ vận hành như thế nào, thì đã đến lúc bạn tiến một bước xa hơn, trả lời cho câu hỏi tại sao"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["hoc-thuat", "vuejs"]
---


*Một phút quảng cáo*
  
Thời điểm hiện có khoảng **1 triệu người đang sử dụng** [add-on Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) của Chrome, đây là con số phản ánh có bao nhiêu lập trình viên đang *thực sự* sử dụng Vue, một con số không hề nhỏ. Còn trên Github, **Vue đã vượt mặt React** để trở thành bộ [công cụ phổ biến nhất của Frontend](https://risingstars.js.org/2019/en/), +31.4k lượt thích so với +22.9k của React, riêng bộ Vue Element Admin cũng có tới +22.7k lượt thích.

Nhiều thương hiệu và tên tuổi lớn tin tưởng sử dụng Vue, trong đó có Lois Vuitton (Vue + Nuxt), một phần newsfeed của Facebook, Netflix, Adobe, Grammarly, GitLab, Behance [Danh sách 13 công ty sử dụng Vue.js](https://www.netguru.com/blog/13-top-companies-that-have-trusted-vue.js-examples-of-applications)

## Biết người, biết ta, trăm trận trăm thắng

Ngày đầu ra đời, Vue là một dự án *ngoài công ty*, làm buổi tối của tác giả, không hề cần cân nhắc lựa chọn nào mới đúng với yêu cầu thực tế, tất cả được dựa trên những gì tôi muốn, các nhân tôi thích như vậy (tôi ở đây là Evan You). Khi bắt đầu được sự đón nhận từ cộng đồng, càng nhiều người sử dụng, bắt đầu có những nhu cầu khác nhau đến từ những đối tượng người sử dụng khác nhau. Với người thiết kế ra framework như tôi và đội ngũ, trách nhiệm đáp ứng nhu cầu này của người sử dụng là điều rất quan trọng, không như những dự án mà phía sau là các tập đoàn công ty lớn, đầu tiên họ sẽ tìm và giải quyết các vấn đề của công ty trước, sau đó đưa một phần source code ra bên ngoài cho cộng đồng sử dụng (open source), với Vue, mục tiêu cao nhất là hiểu được **ai là người dùng Vue, họ dùng nó để làm gì, trong trường hợp nào**.

**Chúng tôi liệt kê ra những đối tượng người sử dụng Vue bao gồm:**

- Người mới bắt đầu, biết căn bản HTML/CSS    
- Dân *chuyên nghiệp* chuyển qua từ jQuery    
- Những người đã từng sử dụng một framework khác như React, Angular và muốn chuyển sang dùng Vue, để xem nó là gì, có ngon lành không
- Lập trình viên backend, có chuyên môn ở những ngôn ngữ khác, muốn tìm một framework frontend gọn nhẹ, có thể dễ dàng tiếp cận
- Những người chịu trách nhiệm kỹ thuật ở một công ty (TA, CTO, Lead), tìm kiếm một giải pháp nền tảng frontend cho công ty

**Các dự án được cân nhắc khi sử dụng Vue gồm có**

- Đưa một vài tương tác vào trong một **ứng dụng đã lâu đời** nào đó, nếu viết lại từ đầu là điều không thể    
- Dự án có **vòng đời ngắn**, không cần cân nhắc đến vấn đề bảo trì nâng cấp sau này, coi như viết một lần, để đó xài luôn, muốn đưa nó ra thị trường càng sớm càng tốt (landing page)    
- Dự án **tương đối vừa phải, không quá lớn, không quá nhỏ, độ phức tạp có thể đoán trước được**, có thể đâu đó trong dự án sẽ có chút hơi rối rắm, nhưng không ảnh hưởng và bạn có thể chấp nhận nó.    
- Dự án lớn, bạn sẽ **làm việc trên source code cả năm, với nhiều người cùng làm chung, nhiều người ra vào nhóm.**

*Bài toán với Vue là làm sao đáp ứng được tất cả những nhu cầu này*

Khi thiết kế một framework lớn, đáp ứng được nhiều đối tượng sử dụng khác nhau, nhiều mục đích khác nhau, đương nhiên chúng tôi **chấp nhận đánh đổi**

Đây là những thứ chúng tôi có thể **cho qua**, như một phần phải đánh đổi để thỏa mãn được quá nhiều yêu cầu

- API được tối ưu để dễ sử dụng nhất có thể dẫn đến **các vấn đề khi bảo trì và mở rộng**
- Quá nhiều công cụ được dựng sẵn, đôi khi như một hàng rào giới hạn các tình huống sử dụng    
- Càng nhiều yêu cầu bổ sung các tính năng còn thiếu, vô số các tính năng lại không được đụng đến. Những người không có nhu cầu cho các tính năng đó lại chịu chung cục bundle như mọi người khác.    

![Imgur](https://i.imgur.com/vDBDdv3.jpg)

## Thử thách

### Khả năng tiếp cận và mở rộng  

Đơn giản chưa được đánh giá đúng. Không thể làm cho mọi thứ thực sự đơn giản mà không phải hy sinh bất cứ điều gì. Đơn giản sẽ giúp nhiều người dễ tiếp cận Vue hơn, khi bạn trong một tổ chức, bạn có muốn nguồn lực giới hạn về con người, không phải công ty nào cũng có thể bỏ ra nhiều tiền để thuê một đội ngũ kỹ thuật cấp cao, trình độ javascript thượng thừa, không có chi phí đào tạo và hướng dẫn người mới. Chúng tôi không muốn bỏ qua tính đơn giản đang có trong Vue, cũng có thời điểm chúng tôi cũng muốn đưa những tính năng cao cấp, phức tạp, khả năng mở rộng cho các dự án lớn. Theo thời gian nhiều API chúng tôi cung cấp cho thấy những điểm khiếm khuyết, nhưng lại không muốn bỏ đi tính đơn giản.

Làm sao chúng tôi thỏa mãn được cả 2: vừa dễ dùng, vừa tân tiến? Một trong những ví dụ là việc hỗ trợ cả **CDN build và Vue CLI**

Bạn có thể sử dụng Vue như cách bạn dùng jQuery, dùng trực tiếp từ CDN, không cần cài đặt hay cấu hình. Nếu muốn, React bạn cũng thế làm được nhưng sẽ không thực sự đơn giản như với Vue, bạn vẫn thêm một số thư viện như babel để viết JSX. Nếu bạn cần can thiệp phức tạp hơn, sử dụng Vue CLI  

Câu hỏi tiếp theo: **Options API vs. Composition API**

Khi bắt đầu, chúng tôi nghe rất nhiều phàn nàn, tại sao lại giới thiệu thêm một cách khác để làm cùng một việc? Chúng tôi giới thiệu thêm composition API trong Vue 3 là có lý do của nó.

Vấn đề của Option API

- Rất trực quan, dễ tiếp cận    
- Khi bắt đầu có những component thực sự lớn, mọi thứ trở nên khó kiểm soát. Trong lúc viết các ứng dụng lớn, component lớn, bạn buộc phải chia các tính năng của component ra ở nhiều chỗ khác nhau, một component có thể có rất rất nhiều logic bên trong
    
Với Composition API

- Không cần phải viết lại toàn bộ ứng dụng, bạn có thể tiếp tục sử dụng bộ codebase đang chạy. Nó có thể được sử dụng cùng với option API
- Cung cấp khả năng linh hoạt trong việc quản lý code và tái sử dụng logic, kết hợp các API với nhau
- Hỗ trợ tốt với TypeScript

### Typescript vs Javascript

**Tại sao TypeScript?**

TypeScript có thật sự cần thiết không? Bạn có cần học TypeScript không? Câu trả lời là bạn không cần học TypeScript để có thể viết Vue. Bản thân Vue 3 cũng được viết trên JavaScript. Chúng tôi có hỗ trợ bộ type để thiết đặt làm việc chung với TypeScript

**Lợi ích mang lại**

- Các IDE hỗ trợ xuất sắc trọng việc tự động nhắc lệnh và cung cấp thông tin về type. Một function cần bạn truyền vào những gì, nó sẽ trả về những gì, tất cả điều minh bạch    
- Tự tin khi cần refactor code cũ trong một dự án lớn. Nếu như bạn biết dự án đó sẽ tiếp tục kéo dài quá trình phát triển trong vòng 2, 3 năm tới, bạn sẽ tự tin hơn khi nhìn lại code của chính mình viết cách đây một năm về trước. Bạn sẽ biết được mình đã làm cái khỉ khô gì trước đây vậy.
    
**Đánh đổi**

- Tốn thời gian học. Để thực sự trở thành developer thành thạo TypeScript hay bất cứ ngôn ngữ nào khác, bạn cần thời gian học nó một cách bài bản. Ví dụ khi bạn sử dụng các API của Vue, bạn sẽ thấy rất tường minh dễ hiểu, nhưng khi nhìn vào code bên trong của các API này, bạn sẽ không dễ gì hiểu được những gì đang xảy ra.
- Thời gian chạy dự án lâu. Khi viết TypeScript, bạn bắt buộc phải nghĩ bạn sẽ dùng kiểu gì ngay từ đầu, bạn sẽ tốn thời gian để *nghĩ* những gì mình viết hơi lâu một chút

Bạn đừng đi vào kết luận dùng TypeScript là đúng hay sai, nó là kiểu lựa chọn sao cho phù hợp với dự án đang thực hiện
 

### Template vs JSX

**Tại sao chúng tôi lại cung cấp cả 2?**

*Có nhiều người sẽ sử bảo thích kiểu template, và cũng có người sẽ bảo JSX mới là đỉnh cao.*

Lý do chúng tôi cung cấp cả 2 lựa chọn là vì muốn đáp ứng cho nhiều đối tượng người sử dụng khác nhau, những người quen với HTML, CSS sẽ thích template, thay vì phải lập trình lại suy nghĩ theo hướng javascript như JSX. Với template chúng tôi có thể tối ưu hiệu năng ở mức tốt nhất. Trong khi JSX lại cho phép linh động hơn trong lúc viết.

Xem thêm bài [Lựa chọn framework frontend nào trong thời điểm hiện tại](http://vuilaptrinh.com/2019-11-24-huong-dan-chon-framework-frontend#c%C6%A1-ch%E1%BA%BF-render) có giải thích ưu và nhược của template và JSX

> Chúng tôi muốn là một framework với tất cả các lựa chọn khác nhiều điều có, để tiếp cận được những người sử dụng từ nhiều background khác nhau.

### Sức mạnh và Kích thước

Vấn đề kinh điển của Vue 2, khi bổ sung một tính năng mới, kích thước bundle tăng lên cho tất cả người sử dụng, dù bạn có dùng nó hay không. Ví dụ nếu chúng tôi muốn bổ sung `<Fragment/>` cho Vue, nghĩa là kích thước bundle sẽ tăng lên. Không ai thích **trả thêm tiền** cho thứ mình không dùng đến

Với Vue 3

- Phần lớn các Global APIs và helper được cung cấp dưới dạng ES module export (tree-shakable). Thí dụ như `keep-alive`, `transition`, `v-model`, `suspense` nếu không sử dụng nó sẽ không được `import`
- Bộ compiler generate cũng được tích hợp tree-shakable cho template của bạn

![Imgur](https://i.imgur.com/n2pNkX6.jpg)


## Tài liệu tham khảo

[Design Principles of Vue 3.0 by Evan You](https://www.youtube.com/watch?v=WLpLYhnGqPA&list=WL&index=2&t=0s)

[Slide](https://docs.google.com/presentation/d/1r0HcS4baHy2c106DsZ4jA7Zt0R9u2MnRmmKIvAVuf1o/edit#slide=id.p)

