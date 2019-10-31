---
slug: "/2019-10-30-gioi-thieu-jamstack"
date: "2019-10-20"
title: "JAMstack và ngành công nghiệp hủ tiếu gõ Việt Nam"
desc: "Sau khi đọc bài này, bạn sẽ hiểu được JAMstack là gì, lợi lộc gì, để hiện thức hóa JAMstack bạn cần nghiên cứu những công cụ gì"
cover: ""
type: "post"
lesson: 0
chapter: 0
tags: ["hoc-thuat"]
---

Nếu bạn đang là developer, chắc gần đây có nghe từ **JAMstack**, cũng có khi bạn đang làm JAMstack nhưng chưa ai phổ biến cho bạn nó là gì.

Chữ **JAM** là viết tắt cho **JavaScript-APIs-Markup**. Còn *stack* là ổ bánh mì kẹp thịt của Việt Nam

![JAMstack và ngành công nghiệp hủ tiếu gõ Việt Nam](https://monngonmoingay.com/wp-content/uploads/2015/08/9.banhmikepgakhia1.png)

Ổ bánh mì Việt Nam, tùy thuộc vào cô bán, họ sẽ bỏ ít-hay-nhiều lớp thịt mỡ vào trong đó tùy thuộc vào giá tiền bạn bỏ ra.

Bỏ qua chuyện ăn uống, quay lại với công nghệ, JAMstack là một cách kiến trúc các ứng dụng web với mục tiêu **tiết kiệm hơn**  trong triển khai, **bảo mật hơn**  trong lúc vận hành, **chạy lẹ hơn**  để đáp ứng nhu cầu cần là có liền của user, **dễ dàng nhân rộng** hơn khi số lượng khách hàng càng tăng dần (*hứa hẹn thật nhiều không biết có thất hứa nhiều ko*)

JAMstack không bắt buộc bạn sử dụng một công nghệ nào cụ thể, bạn có thể dùng javascript thuần, typescript, Elm, Clojure, WebAssembly đều được. Bạn dùng javascript để `fetch` dữ liệu từ nguồn nào cũng được, thirt-party APIs, API ở server nhà bạn, các Serverless function, hoặc gôm 2 ba ông xài chung được luôn. Về mặt nội dung, bạn có thể chọn các kiểu tạo static site đang có, Hugo, GatsbyJS, Jekyll, Next.js, Nuxt.js, VuePress... Nói chúng đây là một kiến trúc không quan trọng cách bạn làm nó bằng gì, như thế nào, chỉ đặt yêu cầu đầu ra của bạn cần đạt được.

## Vì sao lại có sự xuất hiện của mô hình kiến trúc này

Có thể xem web truyền thống là mô hình bán hủ tiếu gia truyền, nhà nào bán, nhà đó làm hết tất cả các khâu, có một công thức nấu nước lèo riêng, bạn cần ước lượng để nấu nồi nước lèo ít nhất một 100 tô thì mới có lời. Khi bạn mở thành công một chi nhánh, việc mở thêm chi nhánh sẽ phức tạp hơn vì bạn chưa có kinh nghiệm nấu cho 10000 tô nước lèo một ngày, và còn vô số thứ khác bạn cần tính toán thật kỹ.

Các ứng dụng web truyền thống và CMS phụ thuộc vào code server side để render và return HTML trên từng request. Đa phần chúng ta cần database hoặc các loại lưu trữ dữ liệu động khác. Với hệ thống truyền thống, cần mở rộng nghĩa là cần nhiều server hơn, các kỹ thuật caching để khi dữ lớn cực lớn, web vẫn chạy nhanh.

JAMstack mô hình bán hủ tiếu gõ ở Việt Nam, tất cả nước lèo được sản xuất công nghiệp ở một nhà máy, người bán có thể bán hủ tiếu, mì, bánh canh nui gì cũng được. Việc nhận rộng mô hình hủ tiếu gõ là vô cùng nhanh và dễ, người ta chỉ cần mua thứ nước đã nấu sẵn về là bán. Chi phí khi sản xuất công nghiệp bao giờ cũng xuống thấp hơn với nhà tự nấu, và nếu bạn ăn nên làm ra, việc mở rộng thành 10 quán hủ tiếu khắp phường 10 quận 8 sẽ không quá nhiều khó khăn.

Theo cách tiếp cận của JAMstack, mỗi trang đã được build sẵn khi ứng dụng deploy. Toàn bộ HTML, JavaScript, CSS, hình cần thiết của ứng dụng đã được *nấu chính sẵn*. Mục tiêu là giảm số việc cần làm ở server xuống, việc truyền tất cả file dạng tĩnh bao giờ cũng đơn giản và nhanh hơn chạy server code.

Mà khi đã là static file, có thể được cache lại ở tất cả CDN, đưa lên CDN làm giảm đáng kể chi phí duy trì hệ tầng server, không những vậy, với hệ thống quán hủ tiếu gõ rộng khắp, user chỉ cần "ra đường là có", user sẽ có được tô hủ tiếu ăn liền không mất thời gian chạy từ quận 8 đến Củ Chi để ăn tô hủ tiếu bò.

![Giới thiệu JAMstack](https://scotch-res.cloudinary.com/image/upload/dpr_1,w_800,q_auto:good,f_auto/v1566357555/zhjcksws2p1n5jaux32k.png)

Chất lượng nồi nước được nấu sẵn chắc chắn sẽ ổn định hơn nhà tự nấu, vì nó đã quy chuẩn thành dạng công nghiệp. Không sợ hôm nay ra chợ thiếu xương, giá thịt hôm nay tăng vọt.

Giảm xử lý trên server, tăng cường cung cấp file dạng static, rủi ro cũng sẽ hạ thấp xuống. Phần xử lý server được quản lý và vận hành bởi những tai to mặt lớn, khả năng có lỗ hỏng cũng sẽ thấp hơn khi tự vận hành.


## Một số cột mốc

*2015* - static site xuất hiện trở lại, có sự phản bác nhẹ các hệ thống CMS đang thịnh hành

*2016* - một bước lùi nhẹ, chưa có nhiều công cụ để làm static site *cool*, mọi thứ còn quá thô sơ. Một nhóm các lập trình viên *máu mặt* giới thiệu thuật ngữ JAMstack đến cộng đồng và lôi kéo vào nhóm phát triển để thúc đi sự đi lên cho JAMstack.

*2017* - dụ dỗ thành công, xuất hiện cộng đồng làm static site, "static" không còn là "static" đúng nghĩa nữa, nhiều đồ chơi để build ra static xuất hiện. Một vài công ty tên tuổi bắt đầu áp dụng JAMstack như Sequoia Capital, Mailchimp & Red Bull.

*2018* - Năm bùng nổ của JAMstack, nhà nhà người người nói về nó, Gatsby, Netlify, Contentful những món đồ chơi xịn sò càng hoàn thiện.

*2019* - Kiến trúc web cũ tồn tại hơn chục năm không còn thống trị như trước đây, JAMstack bước vào cuộc chơi trở thành một lựa chọn không thua kém.

![jamstack-vs-wordpress](https://snipcart.com/media/204006/jamstack-vs-wordpress-1.png)

## Công cụ để "nấu" JAMstack

Có nhiều công cụ để tạo static site, tất cả được liệt kê trên [StaticGen](https://www.staticgen.com/)

![static-site-generators](https://snipcart.com/media/204009/static-site-generators.png)

Bạn thích và quen cái nào thì xài cái đó, không có ai chiếm ưu thế tuyệt đối.

Về phía backend, cũng có nhiều lựa chọn [HeadlessCMS để sử dụng](https://headlesscms.org/) (nhóm các phần mềm để tương tác với database trong JAMstack được gọi là HeadlessCMS, dân công nghệ lắm thuật ngữ lắm)

![headless-cms](https://snipcart.com/media/204007/headless-cms.png)

Phía deploy, chúng ta có thể đặt code trên [GitHub pages](https://github.com/), [Netlify](https://www.netlify.com/) hoặc [Zeit](https://github.com/)

Với những tính năng phía backend có thể được outsource cho các dịch vụ SaaS.

- [Foxy.io](https://snipcart.com/blog/foxycart-vs-snipcart-review), Snipcard, Moltin, nút mua của Shopify cho các tính năng e-commerce
- FormKeep, [Typeform](https://www.typeform.com/), Formspree, Netlify để làm việc với form
- Algolia, Google Custom Search, Fuse.js, Lunr.js, List.js cho tính năng tìm kiếm
- Disqus, [Staticman](https://staticman.net/) cho phần bình luận

Danh sách *dài hơi* hơn xem trên [Github](https://github.com/agarrharr/awesome-static-website-services)

## Lợi ích cho khách hàng

Về phía cộng đồng lập trình viên, chúng ta đa **bị dụ khị thành công**. Chúng ta ai cũng muốn mua nước lèo nấu sẵn về mở 100 quán hủ tiều gõ. Giờ đã mở 100 cửa hàng hủ tiếu gõ, làm sao chúng ta *kêu gọi* được mọi người ăn hủ tiếu gõ ngon-bổ-rẻ

![jamstack-benefits-security](https://snipcart.com/media/203996/jamstack-benefits-security-2.png)

Câu trả lời đang đợi anh em chúng ta, những câu khách hàng hay hỏi

- Cũng hứa hẹn đấy, nhưng chị muốn có mấy tính năng *động* cho web em ơi?
- Chị muốn quản lý và phần quyền user thì sao em à?


** Tài liệu đã sử dụng tham khảo**

[https://scotch.io/tutorials/secure-and-scalable-an-introduction-to-jamstack](https://scotch.io/tutorials/secure-and-scalable-an-introduction-to-jamstack)

[https://snipcart.com/blog/jamstack](https://snipcart.com/blog/jamstack)


