---
slug: "/2020-09-19-bai-phong-van-evan-you"
date: "2020-09-19"
title: "Định dạng số trong JavaScript"
desc: "Nhân sự kiện Vue 3 chính thức được giới thiệu, Evrone.com có cuộc nói chuyện cùng Evan You tác giả của Vue, xoay quanh vấn đề cách tiếp cận no-backend và fullstack, cân bằng giữa cuộc sống và công việc."
cover: "https://evrone.com/sites/default/files/styles/card_w1920/public/n-fields/cases/person-4.jpg?itok=c0N0M2jh"
type: "post"
lesson: 0
chapter: 0
tags: ["dam-dao"]
---

*Chào Evan, rất vui được nói chuyện với anh hôm nay! Hãy bắt đầu bằng câu hỏi: làm một công việc full time bằng Patreon chắc khá khác biệt, làm sao anh có thể cân bằng giữa công việc và cuộc sống để không bị kiệt sức*

Tôi cố gắng đi theo một lịch trình cố định hằng ngày, thậm chí đang làm việc tại nhà và "tự thuê mình". Có con thật sự giúp tôi rất nhiều vì tôi phải dành nhiều thời gian hơn với gia đình khi tôi không làm việc. Điều khác cũng khá quan trọng, khi thấy cần tôi sẽ *nghỉ phép* khá lâu, điều này sẽ khó nếu bạn đang làm việc full time ở một công ty

*Vue 3 mới ra mắt, anh có nghỉ phép không hay đã có kế hoạch cho version tiếp theo của [Vite](https://github.com/vitejs/vite)*

Lúc nào tôi cũng có backlog dài lắm. Hiện tại với Vite mục tiêu chính là giúp nó stable hơn, hệ thống khá mới và mọi người đang sử dụng nó trong nhiều tình huống mà tôi không thiết kế ngay từ đầu, nên chúng tôi cần thêm thời gian để xác định sẽ phát triển tiếp những gì. Hiện tại cũng có khá nhiều ý tưởng đang chờ cho Vue 3.1. Tất nhiên tôi sẽ nghĩ khá lâu đấy, tôi cần phải "sạc pin" lại.

*Trước đây, với nền tảng là người có kiến thức Art History khi gia nhập Google Creative Lab ở vị trí creative technologist, có bao giờ anh cảm thấy thiếu kiến thức toán học, thuật toán, cấu trúc dữ liệu khi làm việc với Vue? Chúng ta có thật sự cần nền tảng khoa học máy tính để trở thành lập trình viên?*

Thật lòng mà nói là không, cá nhân tôi nghĩ, Vue, hay frontend framework nói chung, không cần có chuyên môn quá sâu về toán/thuật toán (nếu đem so với database). Tôi vẫn nghĩ bản thân mình không quá mạnh về thuật toán, cấu trúc dữ liệu. Sẽ rất tốt nếu tôi có thể mạnh những thứ đó, tuy nhiên khi xây dựng một framework phổ biến bạn cần rất nhiều thứ phải làm lắm và đặc biệt là **hiểu người sử dụng nó**, thiết kế các API hợp lý, xây dựng cộng đồng, cam kết hỗ trợ, bảo trì nó trong thời gian dài.

Tôi nghĩ chúng ta không nên cảm thấy không đủ xứng đáng để trở thành lập trình viên vì chúng ta không trãi qua các lớp đào tạo khoa học máy tính, điều nay không đồng nghĩa tôi khuyên bạn nên phớt lờ những kiến thức đó, nó vẫn rất hữu ích. Tôi trãi qua con đường khá thực dụng, tôi làm sai rất nhiều, rồi sau đó thấy  sự cần thiết và học cách để làm tốt hơn.

*Với khá nhiều công nghệ hiện tại như Nuxt.js, JAMstack, lập trình viên khá hứng thú với việc tập trung toàn bộ vào frontend và sử dụng rất ít Backend. Anh nghĩ thế nào về cách tiếp cận "no-backend" hoặc "fullstack"?*

Tôi thấy sản phẩm sẽ định hướng công nghệ sử dụng chứ không phải chiều ngược lại. Lập trình viên đi theo hướng công nghệ nào đó bởi vì nó phù hợp với sản phẩm họ đang xây dựng. Rõ ràng "no-backend" không phải là viên đạn bạc nhưng nó sẽ rất phù hợp với một nhóm các ứng dụng cụ thể

*Vue được viết lại rất nhiều lần. Nếu có thể quay về thời điểm ban đầu,  một lời khuyên về công nghệ cho những người trẻ thì nó sẽ là gì?*

**Làm cách nào để tách biệt và decouple các module internal tốt hơn**

*Những năm gần đây, chúng ta thấy sự phát triển song song giữa JavaScript và TypeScript. Anh sẽ đặt cược vào tương lai nào: liệu chúng ta sẽ có type được thêm vào trong JavaScript hay TypeScript sẽ thay thế luôn JavaScript hay gì đó khác?*

Tôi nghĩ việc thêm type vào JS sẽ còn *rất rất* lâu - Tôi không nghĩ nó sẽ xảy ra luôn đấy chứ, bởi vì thiết kế một hệ thống type bởi cộng đồng (và được đánh giá bởi TC39) khá là... không khả thi. TypeScript cũng sẽ không thay thế JS vì nó được thiết kế là một **superset của JS**. Cá nhân tôi nghĩ có JS và TS (superset với Type) cùng phát triển đồng thời là cách tiếp cận thực tế và sẽ như vậy trong tương lai.

*Những người sử dụng Vue đã lên hàng triệu developer. Anh nghĩ cách nào tốt nhất để đánh giá tầm ảnh hưởng của một công nghệ. Số câu hỏi trên Stack Overflow, sao của Github, số lượt truy cập, hay số người sử dụng trong các công ty tập đoàn (mạng bị tách biệt không thể có thông tin được), những cá nhân bị "ép" sử dụng bởi quyết định của cấp trên. Tất cả những nhân tố đó có ảnh hưởng thế nào đến mức độ phổ biến của một công nghệ?*

Đây là một vấn đề bản chất của phần mềm nguồn mở, người sử dụng không cần phải báo cáo việc họ sử dụng và chúng ta cũng không có cách nào có track việc đó một cách chính xác. Đó là lý do tại sao tôi xem số lượng người sử dụng công cụ DevTool của Vue là con số tương đối chính xác vì nó biết chính xác tài khoản nào đang sử dụng.

*Làm việc với tree-shaking khá nhiều trong Vue.js 3. Anh thấy tại sao tree-shaking mất quá nhiều thời gian để áp dụng vào các framework hiện đại? Bộ có khó khăn gì với nó à?*

Cách làm việc của tree-shaking phụ thuộc vào việc source code tổ chức theo một cách rất cụ thể - nghĩa là nó làm việc tốt nhất khi code được viết (và các API được thiết kế) với tâm thế tree-shaking ngay từ ngày đầu tiên. Rất khó để một source code đã có trước sống *hòa thuận* với tree-shaking, hoặc phải thay đổi rất nhiều trong các API đã có, hoặc refactor gần như toàn bộ (rủi ro sẽ rất cao).

*Đề xuất Function-based component API trong Vue 3 nhận được khá nhiều thảo luận trong cộng đồng. Anh có suy nghĩ nào khác muốn chia sẻ với các lập trình viên?*

Đa phần phản hồi chúng tôi nghe được là việc sợ chúng tôi sẽ ngừng hỗ trợ các API của Vue 2.x hiện tại, và rõ ràng là sai lầm nếu chúng tôi làm việc đó. Là tác giả, người bảo trì hằng ngày chúng tôi tiếp xúc với những thay đổi, những ý tưởng mới sớm hơn ai hết, thường kéo theo việc chúng tôi sẽ quên mất tầm quan trọng của việc hỗ trợ tương thích ngược. Chúng tôi hiểu rằng người sử dụng sẽ không vui vẻ gì nếu chuyện đó xảy ra.

Điều có thể rút ra là, chúng ta cần biết người dùng cần gì - thường không dễ để biết được và phải đi theo những cách rất khó khăn, và bạn cần sẵn sàng lắng nghe một cách tích cực chủ động.

*Vue được sử dụng trong các doanh nghiệp nhỏ, vừa và thậm chí các công ty triệu đô. Louis Vuitton and NASA đang sử dụng Vue. Có ví dụ nào anh đề nghị mọi người nên tham khảo như một ví dụ sử dụng thực tế*

Vấn đề là các dự án thực tế đủ phức tạp lại không phải open-source. Tôi nghĩ có thể xem source của Vue DevTools và Vue CLI UI nếu bạn cần một ví dụ đủ phức tạp, cả hai đều có giao diện không bình thường được viết bằng Vue, mặc dù nó không phải vấn đề mà các web app thường gặp.



Bài phỏng vấn của [evrone](https://evrone.com/evan-you-interview)



> Users don’t like things being taken away. The takeaway is you need to understand what your users want — it’s not that easy and sometimes you will get that information the hard way, but you need to be willing to listen regardless. 




