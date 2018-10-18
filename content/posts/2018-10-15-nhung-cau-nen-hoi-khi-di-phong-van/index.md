---
slug: "/2018-10-15-nhung-cau-nen-hoi-khi-di-phong-van"
date: "2018-10-15"
title: "Em có muốn hỏi câu gì không?"
desc: "Một câu bạn sẽ được hỏi trong lúc phỏng vấn, một cơ hội để bạn tìm hiểu về công ty, vậy nên hỏi những câu nào?"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["javascript", "react"]
---

<!-- TOC -->

- [Quy trình, nơi làm việc, team](#quy-trình-nơi-làm-việc-team)
- [Các vấn đề liên quan đến kỹ thuật](#các-vấn-đề-liên-quan-đến-kỹ-thuật)
- [Xử lý các tình huống khẩn cấp](#xử-lý-các-tình-huống-khẩn-cấp)
- [Con đường phát triển cho từng nhân viên](#con-đường-phát-triển-cho-từng-nhân-viên)
- [Phương pháp quản lý dự án và xét độ ưu tiên](#phương-pháp-quản-lý-dự-án-và-xét-độ-ưu-tiên)
- [Đã hết giờ hỏi!](#đã-hết-giờ-hỏi)

<!-- /TOC -->

# Quy trình, nơi làm việc, team

**Một task dài nhất là bao lâu? Fix một lỗi tốn nhiều nhất là bao lâu? Theo anh đánh giá, mất bao lâu để hiểu hết toàn bộ source code hiện tại?**

Một task càng ngắn, chứng tỏ quy trình tốt và kiến trúc dự án tốt, task được phân chia một cách rõ ràng, lỗi được cô lập và kiểm soát tốt.

Với level junior hoặc mid thì tốn một tháng để thành thạo là bình thường, người quản lý có vấn đề gì với thời gian để thích nghi như thế không, đặc biệt nếu bạn chỉ ở mức junior

Rất nhiều team sẽ không có 1 người có thể hiểu hết toàn bộ source code, có thể giải thích cho bạn bất cứ chổ nào. Nhưng hy vọng bạn lead có thể nắm sơ và biết ai đang phụ trách phần nào.

**Mình được cấp máy tính gì, công ty có cấp cho mình thiết bị mà mình cần để phục vụ công việc**

Với mấy ngành khác thì không biết sao, chứ là dân dev, cái máy tính rất quan trọng, một ngày làm việc 8 tiếng, một tuần cày đủ 7 ngày, việc một cái máy tính chạy ngon lành không chết nửa chừng, không dính virus, ko tự tắt máy bất thình lình là vô cùng cần thiết.

Các công ty lớn thường việc mua thêm thiết bị cũng rất lằng nhằn về quy trình mua sắm thiết bị mới.

**Làm sao công ty đánh giá được là em việc tốt, hiệu quả cao?**

Câu này quan trọng nhất nhé, mỗi người quản lý, mỗi công ty sẽ có cách trả lời khác nhau.

Nó cũng tùy thuộc vị trí bạn đang apply, junior có thể bạn học được nhanh từ những người khác, senior thì bạn giúp đồng nghiệp của mình nâng cao chất lượng công việc.

**Thường thì 2 dev có cùng làm 1 task không? (hoặc nhiều hơn)**

Pair program hoặc mob program có được áp dụng trong công ty không?

Cách nhìn nhận của người làm chung về vấn đề hỗ trợ giữa các bộ phận, đã áp dụng chưa?

**Có bao nhiêu dev trong công ty chỉ mới làm việc trong khoảng 6 tháng?**

Có 2 nguyên nhân cho vấn đề này: (1) phát triển nhanh cần thêm người, (2) các bạn dev rủ nhau ra đi quá đông.

Công ty phát triển nhanh không có nghĩa là không có vấn đề, họ sẽ áp dụng những quy trình mới, tập hợp những người chưa từng làm việc chung với nhau thành một team.

Dev rủ nhau ra đi quá đông là tình huống không ai muốn nghe. Có thể công ty đang gặp khó khăn để cứu vớt dự án sắp chết, chính sách công ty không tốt, hay là lead nghỉ kéo người theo, dù là nguyên nhân gì cũng nên biết chính xác.

Team size đang là bao nhiêu người, số lượng mong muốn là bao nhiêu cũng là một cách để biết.

**Có bao nhiêu dev làm ở đây 2, 4 năm rồi?**

Một minh chứng cho việc các dev cảm thấy hài lòng với công ty. 1 dev có thể **chịu đựng** công ty trong tối đa một năm, nhưng sẽ hiếm thấy việc nhiều dev có thể cùng chịu đựng được trong nhiều năm.

Với những công ty startup (thời gian thành lập bé hơn 2 năm) thì chỉ cần biết người đầu tiên gia nhập công ty còn làm không.

# Các vấn đề liên quan đến kỹ thuật

Môi trường làm việc là sản phẩm các dev đang tạo và văn hóa quản lý tạo bởi lead, môi trường làm việc tốt là công việc không luôn trong tình trạng chạy đua với deadline.

**Tốn bao lâu để hoàn tất deploy?**

Nếu tốn nhiều thời gian deploy, nghĩa là nó đang được làm thủ công, dễ phát sinh lỗi.

**Thế nào được xem là một pull request lớn, số dòng code, số file**

Nếu task được chia nhỏ sẽ dễ quản lý, ít bị conflict. Pull request nhỏ chứng tỏ merge code thường xuyên, công ty đang theo quy trình quản lý hiện đại. Branche lớn, kéo dài, cho thấy người senior thiếu kinh nghiệm chia công việc. Pull request lớn chỉ khi source code được phân tách rất rõ ràng, độc lập, pull request nhỏ cũng chứng tỏ code được tổ chức rất tốt.

Với cá nhân mình, một pull request được cho là lớn khi có khoảng 2000 dòng code, 20 file khác nhau.

Một câu trả lời mình cũng mong muốn nhận được là các team sẽ làm việc trên từng feature branch. Tổ chức gít theo từng feature giúp code dễ maintain hơn, mặc dù cái này không phải lúc nào cũng đúng, đôi khi feature branch cũng rối lắm.

**Phải đụng đến bao nhiêu repository để update một tính năng nào đó?**

Có những project chỉ bao gồm một repository, cả ngàn commit một ngày. Có dự án được tổ chức bởi cả chục cái repository quan hệ chằng chịt với nhau. Câu hỏi này giúp hiểu rõ hơn cấu trúc project và cách phân chia code. 

Với những công ty trẻ, chỉ có một sản phẩm, có quá nhiều repository cũng không tốt. Công ty nhỏ nên tập trung và tiết kiệm thời gian tối đa, xây dựng sản phẩm đưa đến user, việc có nhiều repository khiến tiêu tốn thời gian để quản lý và deploy khá nhiều.

Mình cũng thường hỏi cách quản lý khi code bị duplicate và các thư viện của riêng công ty.

**Việc phải thay đổi trên nhiều repository có thường xuyên không?**

Nếu các module không được tách biệt tốt, việc thay đổi như thế rất hay xảy ra. Phải deploy cùng lúc nhiều service sẽ khó đoán được lỗi do đâu nếu có xảy ra. Cùng đồng nghĩa với việc service chưa được cấu trúc tốt.

# Xử lý các tình huống khẩn cấp

**Có hay xảy ra tình huống phải fix lỗi khẩn cấp? Thế nào được xem là tình huống khẩn cấp?**

Thí dụ như user không thể truy cập vào website, thực hiện thanh toán không được sau khi nâng cấp tính năng mới.

Nếu những tình huống như vậy xảy ra thường xuyên, chứng tỏ việc thay đổi một phần dù chỉ nhỏ trong code cũng rất khó. Trong source code phụ thuộc lẫn nhau không biết trước được.

**Quá trình xử lý lỗi phát sinh là như thế nào?**

Với các công ty startup, thiếu các quy trình này là điều tốt, code chạy tốt quá đâu cần quy trình :D. Chưa có nhiều lỗi đến mức người ta phải nghĩ ra quy trình cho vấn đề này.

Với những công ty đã được thành lập lâu thì ngược lại, chắc chắn họ đã gặp nhiều lần vấn đề này, cần có quy trình rõ ràng để giải quyết để tránh lặp lại những lỗi như vậy

**Giữa đêm em có bị nhận cuộc gọi lên để fix bug không?**

Trong trường hợp nào bạn sẽ bị gọi lên sữa lỗi, yêu cầu OT, trong trường hợp OT thì có thêm tiền không

Thường trường hợp như vậy trong công ty có xảy ra nhiều không, có được request thêm ngày nghỉ phép không trừ lương trong trường hợp đó.

Thật lòng mà nói mình cũng không thích làm việc trong các công ty yêu cầu nhân viên làm việc ngoài giờ quá nhiều như vậy.

# Con đường phát triển cho từng nhân viên

**Nếu đã hoàn thành công việc được giao, thời gian rảnh thì mình có thể tự nghiên cứu, học tập không?**

Là một Developer, sống trong môi trường công nghệ luôn phát triển không ngừng, chúng ta không ngừng học hỏi cho kịp với lớp trẻ. Các công ty luôn yêu cầu hoàn thành công việc sớm chừng nào tốt chừng ấy, và vẫn đảm bảo chất lượng, để đáp ứng được chuyện đó, developer phải có rất nhiều kiến thức, học hỏi không ngừng từ cộng đồng, áp dụng vào công việc đang làm, cho các dự án mới. Để trở thành dev chất không có cách nào khác là bạn phải dành thời gian nghiên cứu đều đặn.

Với câu hỏi này, người trả lời tốt nhất chính là các bạn dev đang làm trong công ty, chứ không phải cấp quản lý, vì những người quản lý sẽ luôn nói điều tốt về chính sách. Không phải công ty nào cũng có đồng quan điểm về việc học từ đâu, học như thế nào, học thời gian nào, sẽ có những công ty không cho phép nhân viên truy cập youtube, vốn là nguồn resource học lớn đối với mình, bên cạnh medium. Nếu nói thời gian nghiên cứu của nhân viên là việc nhân viên phải làm ở nhà, công ty chỉ trả tiền 8 tiếng cho bạn để làm việc trong công ty không phải để ngồi nghiên cứu là mình thấy không đồng ý.

**Cách đánh giá một developer chất lượng, có sự phát triển trong công việc?**

Một số công ty đánh giá developer chất bằng việc anh ta hoàn thành toàn bộ deadline, không gây nhiều issue. Một vài công ty có chương trình đào tạo cho nhân viên mới, giúp bạn đạt vị trí cao hơn, hoặc được nghía các dự án khác để học hỏi công nghệ.
Nhưng cơ bản phải biết mình muốn gì trong tương lai, và làm ở công ty đó thì bạn có đạt được mục tiêu của mình ngày qua ngày không.

**Công ty có những hoạt động chia sẻ kiến thức như là semi tổ chức rầm rộ không?**

Chia sẻ kiến thức giữa các developer là một phần rất quan trọng. Nếu có các buổi workshop hàng tháng, hàng quý để đồng nghiệp senior chia sẻ và cùng nhau bàn luận thì tuyệt vời, nếu được trả lời “có, nhưng thật sự chưa đủ” thì quá đỉnh rồi.

**Có được tham gia các hội thảo có tính phí không?**

Các hội thảo chuyên môn, đặc biệt có tính phí tham gia rất tốt cho sự phát triển cá nhân, nếu công ty có chi trả cho nhân viên tham gia những hội thảo như vậy thì quá tuyệt. Nếu được tài trợ tham gia các hội thảo như vậy, bạn cũng nên share lại kiến thức có được với đồng nghiệp trong các buổi meeting nội bộ. Mỗi năm một lần là đủ với mình.

# Phương pháp quản lý dự án và xét độ ưu tiên

**Cách anh điều phối giữa việc đưa thêm tính năng mới và bảo trì những tính năng cũ**

Theo nhiều kinh nghiệm được chia sẻ từ các nhà quản lý, 1/3 thời gian để bảo trì, ví dụ như refactor code, xóa code thừa, bổ sung unit test, tăng tốc độ, là mức hợp lý để cân bằng giữa bổ sung tính năng mới và bảo trì.

Hoặc hỏi thêm kinh nghiệm những gì cần làm trong để maintain

**Quy trình phát triển một sản phẩm, tính năng mới, từ lúc lên ý tưởng đến lúc deploy là thế nào?**

Câu hỏi này sẽ phải trả lời rất nhiều, từ lúc lập kế hoạch, trao đổi giữa các bộ phận, đến lúc implement, feedback, deploy. Nó đã gom đủ một vòng.

**Task được kiểm tra như thế nào? Ai là người tạo ra mấy task này?**

Mỗi công ty mỗi khác, tùy người quản lý.

**Làm thế nào để xác định nên build một version?**

Dựa trên tính năng đặt ra, khách hàng yêu cầu, thời gian cố định

**Khi nào task được xem là complete?**

Đúng yêu cầu của PR, QA bảo đóng sau khi test, bên kinh doanh đã thấy được sản phẩm deploy và không nhận thêm bất cứ phàn nàn nào?

**Phần mềm đang sử dụng để quản lý task?**

Nhiều phần mềm dạng này lắm: Pivotal, Asana, Wrike, JIRA, Trello, post-it + tấm bảng, thẻ được in ra, Visual Studio Online, Marvel.

Cá nhân tác giả bài viết cũng như mình đồng quan điểm: **JIRA là thằng gớm nhất**

# Đã hết giờ hỏi!

Không có con người hoàn hảo, không có công ty hoàn hảo, bạn chấp nhận được những gì, những gì bạn sắp ưu tiên nó thấp hơn. Chúc các bạn tìm được công việc tốt. Mình đã có việc rồi, không muốn đi phỏng vấn nữa đâu các bạn.

-[https://medium.com/@vcarl/questions-to-ask-your-interviewer-82a26e67ce6c](https://medium.com/@vcarl/questions-to-ask-your-interviewer-82a26e67ce6c)

- [https://medium.com/@vcarl/questions-to-ask-your-interviewer-development-and-emergencies-f7fbc4519e5b](https://medium.com/@vcarl/questions-to-ask-your-interviewer-development-and-emergencies-f7fbc4519e5b)

- [https://medium.com/@cvitullo/questions-to-ask-your-interviewer-growth-c88eed119ce2](https://medium.com/@cvitullo/questions-to-ask-your-interviewer-growth-c88eed119ce2)

- [https://medium.com/@vcarl/questions-to-ask-your-interviewer-project-management-and-prioritization-69ac3aad3689](https://medium.com/@vcarl/questions-to-ask-your-interviewer-project-management-and-prioritization-69ac3aad3689)