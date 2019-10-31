webpackJsonp([98887268015876],{1537:function(n,t){n.exports={data:{markdownRemark:{html:'<p>Nếu bạn đang là developer, chắc gần đây có nghe từ <strong>JAMstack</strong>, cũng có khi bạn đang làm JAMstack nhưng chưa ai phổ biến cho bạn nó là gì.</p>\n<p>Chữ <strong>JAM</strong> là viết tắt cho <strong>JavaScript-APIs-Markup</strong>. Còn <em>stack</em> là ổ bánh mì kẹp thịt của Việt Nam</p>\n<p><img src="https://monngonmoingay.com/wp-content/uploads/2015/08/9.banhmikepgakhia1.png" alt="JAMstack và ngành công nghiệp hủ tiếu gõ Việt Nam"></p>\n<p>Lấy ví von ổ bánh mì Việt Nam là có lý do. Tùy thuộc vào cô bán, họ sẽ bỏ ít-hay-nhiều <strong>lớp</strong> thịt mỡ vào trong đó tùy thuộc vào giá tiền bạn bỏ ra.</p>\n<p>Bỏ qua chuyện ăn uống, quay lại với công nghệ, JAMstack là một cách kiến trúc các ứng dụng web với mục tiêu <strong>tiết kiệm hơn</strong>  trong triển khai, <strong>bảo mật hơn</strong>  trong lúc vận hành, <strong>chạy lẹ hơn</strong> trong lúc đông khách (user), <strong>dễ dàng nhân rộng</strong> hơn khi số lượng khách hàng càng tăng dần (<em>hứa hẹn thật nhiều không biết có thất hứa nhiều ko</em>)</p>\n<p>JAMstack không bắt buộc bạn sử dụng một công nghệ nào cụ thể, bạn có thể dùng javascript thuần, typescript, Elm, Clojure, WebAssembly đều được. Bạn dùng javascript để <code class="language-text">fetch</code> dữ liệu từ nguồn nào cũng được, thirt-party APIs, API ở server nhà bạn, các Serverless function, hoặc gôm 2 ba ông xài chung được luôn. Về mặt nội dung, bạn có thể chọn các kiểu tạo static site đang có, Hugo, GatsbyJS, Jekyll, Next.js, Nuxt.js, VuePress... Nói chung đây là một kiến trúc không quan trọng cách bạn làm nó bằng gì, như thế nào, chỉ đặt yêu cầu đầu ra của bạn cần đạt được.</p>\n<h2 id="vì-sao-lại-có-sự-xuất-hiện-của-mô-hình-kiến-trúc-này"><a href="#v%C3%AC-sao-l%E1%BA%A1i-c%C3%B3-s%E1%BB%B1-xu%E1%BA%A5t-hi%E1%BB%87n-c%E1%BB%A7a-m%C3%B4-h%C3%ACnh-ki%E1%BA%BFn-tr%C3%BAc-n%C3%A0y" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Vì sao lại có sự xuất hiện của mô hình kiến trúc này</h2>\n<p><em>Có thể xem web truyền thống là mô hình bán hủ tiếu gia truyền, nhà nào bán, nhà đó làm hết tất cả các khâu, có một công thức nấu nước lèo riêng, bạn cần ước lượng để nấu nồi nước lèo ít nhất một 100 tô thì mới có lời. Khi bạn mở thành công một chi nhánh, việc mở thành một chuỗi cửa hàng hủ tiếu sẽ phức tạp hơn vì bạn chưa có kinh nghiệm nấu cho 10000 tô nước lèo một ngày, và còn vô số thứ khác bạn cần tính toán thật kỹ.</em></p>\n<p>Các ứng dụng web truyền thống và CMS phụ thuộc vào code server side để render và return HTML trên từng request. Đa phần chúng ta cần database hoặc các loại lưu trữ dữ liệu động khác. Với hệ thống truyền thống, cần mở rộng nghĩa là cần nhiều server hơn, các kỹ thuật caching để khi dữ lớn cực lớn, web vẫn chạy nhanh.</p>\n<p><em>JAMstack có thể hình dung là mô hình bán hủ tiếu gõ ở Việt Nam, tất cả nước lèo được sản xuất công nghiệp ở một nhà máy, người bán có thể bán hủ tiếu, mì, bánh canh nui gì cũng được. Việc nhân rộng mô hình hủ tiếu gõ là vô cùng nhanh và dễ, người ta chỉ cần mua thứ nước đã nấu sẵn về là bán. Chi phí khi sản xuất công nghiệp bao giờ cũng xuống thấp hơn với nhà tự nấu, và nếu bạn ăn nên làm ra, việc mở rộng thành 10 quán hủ tiếu khắp phường 10 quận 8 sẽ không quá nhiều khó khăn.</em></p>\n<p>Theo cách tiếp cận của JAMstack, mỗi trang đã được build sẵn khi ứng dụng deploy. Toàn bộ HTML, JavaScript, CSS, hình cần thiết của ứng dụng đã được <em>nấu chính sẵn</em>. Mục tiêu là giảm số việc cần làm ở server xuống, việc truyền tất cả file dạng tĩnh bao giờ cũng đơn giản và nhanh hơn chạy server code.</p>\n<p>Mà khi đã là static file, có thể được cache lại ở tất cả CDN, đưa lên CDN làm giảm đáng kể chi phí duy trì hệ tầng server, không những vậy, với hệ thống quán hủ tiếu gõ rộng khắp, user chỉ cần "ra đường là có", user sẽ có được tô hủ tiếu ăn liền không mất thời gian chạy từ quận 8 đến Củ Chi để ăn tô hủ tiếu bò.</p>\n<p><img src="https://scotch-res.cloudinary.com/image/upload/dpr_1,w_800,q_auto:good,f_auto/v1566357555/zhjcksws2p1n5jaux32k.png" alt="Giới thiệu JAMstack"></p>\n<p>Chất lượng nồi nước được nấu sẵn chắc chắn sẽ ổn định hơn nhà tự nấu, vì nó đã quy chuẩn thành dạng công nghiệp. Không sợ hôm nay ra chợ thiếu xương, giá thịt hôm nay tăng vọt.</p>\n<p>Giảm xử lý trên server, tăng cường cung cấp file dạng static, rủi ro cũng sẽ hạ thấp xuống. Phần xử lý server được quản lý và vận hành bởi những tai to mặt lớn, khả năng có lỗ hỏng cũng sẽ thấp hơn khi tự vận hành.</p>\n<h2 id="một-số-cột-mốc"><a href="#m%E1%BB%99t-s%E1%BB%91-c%E1%BB%99t-m%E1%BB%91c" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Một số cột mốc</h2>\n<p><em>2015</em> - static site xuất hiện trở lại, có sự phản bác nhẹ các hệ thống CMS đang thịnh hành</p>\n<p><em>2016</em> - một bước lùi nhẹ, chưa có nhiều công cụ để làm static site <em>cool</em>, mọi thứ còn quá thô sơ. Một nhóm các lập trình viên <em>máu mặt</em> giới thiệu thuật ngữ JAMstack đến cộng đồng và lôi kéo vào nhóm phát triển để thúc đẩy sự đi lên cho JAMstack.</p>\n<p><em>2017</em> - dụ dỗ thành công, xuất hiện cộng đồng làm static site, "static" không còn là "static" đúng nghĩa nữa, nhiều đồ chơi để build ra static xuất hiện. Một vài công ty tên tuổi bắt đầu áp dụng JAMstack như <a href="https://www.sequoiacap.com/">Sequoia Capital</a>, <a href="https://mailchimp.com/">Mailchimp</a> &#x26; <a href="https://www.redbull.com/int-en/">Red Bull</a>.</p>\n<p><em>2018</em> - Năm bùng nổ của JAMstack, nhà nhà người người nói về nó, Gatsby, Netlify, Contentful những món đồ chơi xịn sò càng hoàn thiện.</p>\n<p><em>2019</em> - Kiến trúc web cũ tồn tại hơn chục năm không còn thống trị như trước đây, JAMstack bước vào cuộc chơi trở thành một lựa chọn không thua kém.</p>\n<p><img src="https://snipcart.com/media/204006/jamstack-vs-wordpress-1.png" alt="jamstack-vs-wordpress"></p>\n<h2 id="công-cụ-để-nấu-jamstack"><a href="#c%C3%B4ng-c%E1%BB%A5-%C4%91%E1%BB%83-n%E1%BA%A5u-jamstack" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Công cụ để "nấu" JAMstack</h2>\n<p>Có nhiều công cụ để tạo static site, tất cả được liệt kê trên <a href="https://www.staticgen.com/">StaticGen</a></p>\n<p><img src="https://snipcart.com/media/204009/static-site-generators.png" alt="static-site-generators"></p>\n<p>Bạn thích và quen cái nào thì xài cái đó, không có ai chiếm ưu thế tuyệt đối.</p>\n<p>Về phía backend, cũng có nhiều lựa chọn <a href="https://headlesscms.org/">HeadlessCMS để sử dụng</a> (nhóm các phần mềm để tương tác với database trong JAMstack được gọi là HeadlessCMS, dân công nghệ lắm thuật ngữ lắm)</p>\n<p><img src="https://snipcart.com/media/204007/headless-cms.png" alt="headless-cms"></p>\n<p>Phía deploy, chúng ta có thể đặt code trên <a href="https://github.com/">GitHub pages</a>, <a href="https://www.netlify.com/">Netlify</a> hoặc <a href="https://github.com/">Zeit</a></p>\n<p>Với những tính năng phía backend có thể được outsource cho các dịch vụ SaaS.</p>\n<ul>\n<li><a href="https://snipcart.com/blog/foxycart-vs-snipcart-review">Foxy.io</a>, Snipcard, Moltin, nút mua của Shopify cho các tính năng e-commerce</li>\n<li>FormKeep, <a href="https://www.typeform.com/">Typeform</a>, Formspree, <a href="https://www.netlify.com/">Netlify</a> để làm việc với form</li>\n<li>Algolia, Google Custom Search, Fuse.js, Lunr.js, List.js cho tính năng tìm kiếm</li>\n<li>Disqus, <a href="https://staticman.net/">Staticman</a> cho phần bình luận</li>\n</ul>\n<p>Danh sách <em>dài hơi</em> hơn xem trên <a href="https://github.com/agarrharr/awesome-static-website-services">Github</a></p>\n<h2 id="lợi-ích-cho-khách-hàng"><a href="#l%E1%BB%A3i-%C3%ADch-cho-kh%C3%A1ch-h%C3%A0ng" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Lợi ích cho khách hàng</h2>\n<p>Về phía cộng đồng lập trình viên, chúng ta đa <strong>bị dụ khị thành công</strong>. Chúng ta ai cũng muốn mua nước lèo nấu sẵn về mở 100 quán hủ tiều gõ. Giờ đã mở 100 cửa hàng hủ tiếu gõ, làm sao chúng ta <em>kêu gọi</em> được mọi người ăn hủ tiếu gõ ngon-bổ-rẻ</p>\n<p><img src="https://snipcart.com/media/203996/jamstack-benefits-security-2.png" alt="jamstack-benefits-security"></p>\n<p>Câu trả lời đang đợi anh em chúng ta, những câu khách hàng hay hỏi</p>\n<ul>\n<li>Cũng hứa hẹn đấy, nhưng chị muốn có mấy tính năng <em>động</em> cho web em ơi?</li>\n<li>Chị muốn quản lý và phần quyền user thì sao em à?</li>\n</ul>\n<p><strong>Tài liệu đã sử dụng tham khảo</strong></p>\n<p><a href="https://scotch.io/tutorials/secure-and-scalable-an-introduction-to-jamstack">https://scotch.io/tutorials/secure-and-scalable-an-introduction-to-jamstack</a></p>\n<p><a href="https://snipcart.com/blog/jamstack">https://snipcart.com/blog/jamstack</a></p>',timeToRead:6,excerpt:"Nếu bạn đang là developer, chắc gần đây có nghe từ  JAMstack , cũng có khi bạn đang làm JAMstack nhưng chưa ai phổ biến cho bạn nó là gì.…",frontmatter:{title:"JAMstack và ngành công nghiệp hủ tiếu gõ Việt Nam",cover:"",date:"2019-10-30",category:null,tags:["hoc-thuat"],desc:"Sau khi đọc bài này, bạn sẽ hiểu được JAMstack là gì, lợi lộc gì, để hiện thức hóa JAMstack bạn cần nghiên cứu những công cụ gì"},fields:{slug:"/2019-10-30-gioi-thieu-jamstack"}}},pathContext:{slug:"/2019-10-30-gioi-thieu-jamstack",prev:!1,next:{frontmatter:{title:"Độ phức tạp của thuật toán",desc:"Một cách chuẩn hóa trong ngành lập trình để đánh giá độ phức tạp của giải thuật",type:"post",category:null,tags:["javascript","hoc-thuat"],date:"2019-10-28",cover:""},fields:{slug:"/2019-10-28-gioi-thieu-ve-do-phuc-tap-cua-thuat-toan"}}}}}});
//# sourceMappingURL=path---2019-10-30-gioi-thieu-jamstack-c1a8dd7fb04153f776eb.js.map