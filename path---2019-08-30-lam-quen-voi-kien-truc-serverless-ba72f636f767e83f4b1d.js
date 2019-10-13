webpackJsonp([0xa57302b6874e],{1508:function(n,h){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#serverless-l%c3%a0-g%c3%ac">Serverless là gì</a></li>\n<li><a href="#function-as-a-service">Function as a Service</a></li>\n<li><a href="#case-study">Case Study</a></li>\n</ul>\n<!-- /TOC -->\n<p>Mười mấy năm về trước, ngày còn đang học đại học, mỗi lần đến ngày đăng ký môn học là mình được nghe điệp khúc hát mãi "server quá tải, số lượng sinh viên tranh nhau vào các lớp có nhiều gái xinh quá đông, quá nguy hiểm, mấy em vui lòng canh 12 giờ đêm, khi ko còn ai lên đăng ký môn học, chúng tôi mới đáp ứng kịp"</p>\n<p>Ngày đó Server của trường nằm ở Nguyễn Văn Tráng, phòng server nhỏ như hang thỏ, mà chỉ xài đúng mấy ngày đầu học kỳ, nên thầy trưởng khoa ko thể nào xin ngân sách được để mà nâng cấp 10 mấy con server cho các em sinh viên xài thỏa thích.</p>\n<p>Bài toán Server đó giờ được giải quyết ra sao? <strong>Serverless</strong></p>\n<p>Trước tiên cần khẳng định <strong>Serverless</strong> không phải là bạn không cần server. Một shop <em>thú nuôi</em> đơn giản, vài ngàn người mua hoa một tháng, làm bằng wordpress bạn sẽ không thấy được lợi ích từ việc sử dụng kiến trúc mới này, không những vậy còn là việc ném một cục tiền cho mấy thằng bán dịch vụ như Amazon</p>\n<p>Trang bán thú nuôi, kiến trúc cũ sẽ là thế này</p>\n<p><img src="https://martinfowler.com/articles/serverless/ps.svg" alt="kiến trúc cũ sẽ là thế này"></p>\n<p>Tất cả những logic sẽ nằm ở <strong>ứng dụng phía server</strong>: từ authentication, page navigation, searching, transaction (code backend đó)</p>\n<p>Yêu cầu cần có ngân sách, kế hoạch cụ thể, lắp đặt các hệ thống máy chủ, tìm một chỗ để máy, đảm bảo luôn có điện, luôn mát lạnh, đi dây, chọn nhà cung cấp mạng không bị cá mập cắn…</p>\n<p>Nói chung bạn tự làm mọi thứ, hoặc bỏ tiền ra thuê một thằng làm mọi thứ, mà nó còn hay đòi hỏi thêm thắt này kia nọ, vô cùng tốn thời gian, nhân lực, tiền bạc, cơ sở hạ tầng.</p>\n<p><em>Infrastructure as a service - IaaS</em>, các dịch vụ cho <em>thuê mặt bằng</em> ra đời. Đáp ứng nhu cầu tiết kiệm chi phí ở thời điểm đầu, nhưng vẫn có thể <em>bành trướng</em> khi cần.</p>\n<p>Bạn hình dung nó như việc mở một quán ăn, phải tìm mặt bằng, tìm người giữ xe, chỗ để xe cho khách, thu hút khách vào ăn, thanh toán, sửa chữa điện, nước… Những thằng <strong>IaaS</strong> là các trung tâm thương mại, nó lo hết mọi thứ khác, bạn chỉ việc bỏ tiền ra và thuê lại mặt bằng và kinh doanh.</p>\n<h2 id="serverless-là-gì"><a href="#serverless-l%C3%A0-g%C3%AC" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Serverless là gì</h2>\n<p>Nó như một khái niệm kinh tế học, không có một cách định nghĩa chính xác Serverless là gì! Có thể hiểu theo 2 cách sau</p>\n<p>Serverless được dùng để ám chỉ những ứng dụng sử dụng phần lớn (hoặc toàn bộ) dịch vụ "nhà hàng xóm" (third-party), được host trên cloud, cho các vấn đề ở phía server là logic và state (ví dụ trạng thái đăng nhập, một dạng của dịch vụ chăm sóc khách hàng thân thiết). Những ứng dụng <strong>để sử dụng</strong> (không phải những trang profile công ty, show hiệu ứng bay lượn portfolio, ví dụ như Facebook, ứng dụng đăng ký môn học, hoặc ứng dụng điện thoại bị chửi bới quá trời FaceApp, tức là mô hình này không chỉ áp dụng riêng cho web). Những dịch vụ thường được outsource cho nhà hàng xóm là gì: database có <a href="https://parseplatform.org/">Parse</a>, <a href="https://firebase.google.com/">Firebase</a>, authentication có <a href="https://auth0.com/">Auth0</a>, AWS Cognito. Mấy nhà này nằm trong khu "Backend as a Service" - <strong>BaaS</strong>, khi gắn vào <em>hậu tố</em> as a Service bạn có thể biết là nó nằm ở nhà hàng xóm.</p>\n<p>Serverless cũng có nghĩa là ứng dụng đó logic server vẫn có, developer vẫn phải viết logic này, tuy nhiên, không giống kiến trúc truyền thống, nó chạy theo cơ chế "tiền trao-cháo múc" (event-trigger), không quan tâm anh bạn có ở chung nhà mình không (stateless compute container). Khái niệm này được <a href="https://twitter.com/marak">@marak trên Twitter</a> gọi là <strong>Function as a Service</strong> - <strong>FaaS</strong>, bạn có nhu cầu cắt tóc, gội đầu, uống cafe, đánh giày thì bạn ra <em>tiệm</em> hết, không dùng đồ <em>nhà</em> có sẵn nữa. Hiện tại, <a href="https://aws.amazon.com/lambda/">AWS Lambda</a> là một trong những platform nổi tiếng nhất khi nói đến FaaS</p>\n<p>Giờ nói tới FaaS, nó đang là trend, nó thay đổi cách chúng ta trước đây vẫn nghĩ về kiến trúc dưới server.</p>\n<p>Tất cả những ông lớn đều có các sản phẩm BaaS và FaaS, <a href="https://aws.amazon.com/serverless/">Amazon Serverless</a>, <a href="https://firebase.google.com/docs/functions/">Google Cloud Functions for Firebase.</a></p>\n<p><img src="https://hackernoon.com/hn-images/1*t4O4UXpdG68MQboNKC6bBw.jpeg" alt="Tất cả những ông lớn đều có các sản phẩm BaaS và FaaS"></p>\n<p>Một kiến trúc Serverless nó như thế này</p>\n<p><img src="https://martinfowler.com/articles/serverless/sps.svg" alt="Một kiến trúc Serverless"></p>\n<ol>\n<li>Phần authen trước đây được gửi <em>nhà hàng xóm</em> làm (cơ quan nhà nước chuyên cung cấp CMND)</li>\n<li>Dữ liệu được đưa một về nhà kho quản lý, kiểu như Tiki bây giờ quá mệt quản lý kho hàng, các cửa hàng nhỏ lẻ tự quản lý kho, Tiki bán được thì chạy tới kho của bên thứ 3 lấy.</li>\n<li>Với 2 thay đổi ở trên, điều này có nghĩa là một vài logic đã được nằm ở phía client, thí dụ, user session, bạn sẽ thấy rõ nhất ở các Single Page App chúng ta build, phần logic giao diện cho user đã và chưa đăng nhập nằm ở client - <em>nhà user</em>, những route nào user có thể vào nằm ở code client</li>\n<li>Một vài hiển thị, ràng buộc tất nhiên vẫn được server nắm. Thí dụ "search". Chúng ta có thêm một <em>nhà</em> gọi là "API Gateway", dịch vụ giao nhận, tất cả các yêu cầu từ client đưa về đây, các anh em HTTP sẽ đi lấy dữ liệu từ kho về cho chúng ta.</li>\n<li>Với tính năng đặt hàng, nó do một <em>nhà** khác cung cấp. Những logic khác nhau, được tách và deploy thành những *cục</em> khác nhau như vậy cách tiếp cận của FaaS cũng là cách tiếp cận rất phổ biến trong "Microservices"</li>\n</ol>\n<p>Nó sẽ có những lợi ích i chang như Microservices, tất nhiên là có trả giá, có nhiều thứ để kiểm soát và theo dõi hơn, vấn đề bảo mật cũng không phải đơn giản như xưa, nằm ở nhiều nơi quá mà, bài toán đi đi lại tránh kẹt xe giữa các hệ thống khác nhau, biết đâu đi lạc vào chổ nào đó mất CMND luôn !!</p>\n<h2 id="function-as-a-service"><a href="#function-as-a-service" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Function as a Service</h2>\n<p>Nãy giờ nói FaaS nhiều quá rồi, giờ "đào sâu" nghiên cứu nó chút. Trích dẫn từ trang <a href="https://aws.amazon.com/lambda/">Amazon Lambda</a></p>\n<blockquote>\n<p>AWS Lambda lets you run code without provisioning or managing servers. (1) ... With Lambda, you can run code for virtually any type of application or backend service (2) - all with zero administration. Just upload your code and Lambda takes care of everything required to run (3) and scale (4) your code with high availability. You can set up your code to automatically trigger from other AWS services (5) or call it directly from any web or mobile app (6).</p>\n</blockquote>\n<p>Diễn giải đoạn dài ngoằn kia</p>\n<p>(1) FaaS là chạy backend code mà không cần quan tâm việc quản lý và bảo trì hệ thống server.</p>\n<p>(2) FaaS không yêu cầu một framework hay thư viện cụ thể nào. Các <strong>function</strong> trên Lambda có thể được viết bằng Javascript, Python, Go, Java, Clojure, Scala, .NET.</p>\n<p>(3) Deploy sẽ rất khác với hệ thống truyền thống. Tới *nhà** của FaaS chúng ta đưa đoạn code cho chủ nhà, còn lại chủ nhà làm gì thì làm.</p>\n<p>(4) Scale sẽ tự động được chủ nhà làm. Nếu hệ thống cần đáp ứng 1000 request đồng thời, chủ nhà sẽ lo, bạn chỉ cần bơm tiền. Quan trọng nhất, bên cung cấp dịch vụ sẽ quản lý hết toàn bộ resource, xin giấy phép, nói chung là toàn bộ - bạn không cần làm gì với cluster, VM cả.</p>\n<p>(5) Cung cấp cơ chế trigger ứng với các event bạn muốn.</p>\n<p>(6) Mấy bên cung cấp dịch vụ, cho phép các function này trigger theo những sự kiện HTTP request, như ví dụ là search, và purchase, hoặc gọi trực tiếp lên các API được cung cấp bởi bên cung cấp</p>\n<h2 id="case-study"><a href="#case-study" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Case Study</h2>\n<p><a href="http://www.vogue.it/en/photovogue">PhotoVogue</a> trang Vogue của Ý, chạy từ năm 2011, sau một năm chạy, photographer bu vô như kiến, server ở nhà riêng quá tải không chịu nổi.</p>\n<p>Giám đốc kỹ thuật quyết định chuyển đổi toàn bộ hệ thống server ở <em>nhà riêng</em> sang AWS trong 3 tháng.</p>\n<p>Chạy theo trend này, còn có những cái tên rất phổ biến là Uber, Pokemon Go, Airbnb, Clash of Clans và rất nhiều ứng dụng khác khi số lượng user và real-time data lớn</p>\n<p>Những vấn đề mà team PhotoVogue đã gặp</p>\n<ul>\n<li>Có hơn 130,000 photographer trên khắp thế giới sử dụng hệ thống để đưa ảnh lên, ước tính có khoảng 400,000 ảnh, với dung lượng tối đa mỗi hình là 50MB (bọn này chơi sang nhỉ)</li>\n<li>Số lượng truy cập ngày càng tăng</li>\n<li>Trải nghiệm sử dụng của user không tốt, thao tác xử lý quá chậm, up ảnh quá rùa</li>\n</ul>\n<p>Với AWS, nó đã giải quyết các vấn đề sau cho PhotoVogue</p>\n<ul>\n<li>Khả năng scale, dễ maintenance, quản lý chi phí rõ ràng</li>\n<li>Lưu trữ hình trên Amazon S3</li>\n<li>Khi up lên Amazon S3, bật trigger sử dụng AWS Lambda function, convert các file này qua gif, jpeg, png, tiff</li>\n<li>Amazon API Gateway được sử dụng để làm tầng caching của REST API, Amazon CloudFront cho CDN</li>\n</ul>\n<p><img src="https://www.simform.com/wp-content/uploads/2017/12/serverless-graph.png" alt="Kiến trúc Serverless"></p>\n<p>Còn vấn đề nào nữa không, mình hy vọng bạn nào chuyên gia vào chỉ giáo</p>\n<p>Tài liệu tham khảo</p>\n<p><a target="_blank" rel="noopener noreferrer" href="https://hackernoon.com/what-is-serverless-architecture-what-are-its-pros-and-cons-cc4b804022e9">📜 What is Serverless Architecture? What are its Pros and Cons?</a></p>\n<p><a target="_blank" rel="noopener noreferrer" href="https://martinfowler.com/articles/serverless.html">📜 Serverless Architectures</a></p>\n<p><a target="_blank" rel="noopener noreferrer" href="https://www.simform.com/serverless-architecture-guide/">📜 Serverless Architecture: A Comprehensive Guide</a></p>',timeToRead:7,excerpt:"Serverless là gì Function as a Service Case Study Mười mấy năm về trước, ngày còn đang học đại học, mỗi lần đến ngày đăng ký môn học là mình…",frontmatter:{title:"Làm quen với kiến trúc Serverless",cover:"",date:"2019-08-30",category:null,tags:["javascript","hoc-thuat"],desc:"Mình không phải chuyên gia trong lĩnh vực này, nghiên cứu để biết thêm, thấy cũng hay, chia sẽ cho mọi người cùng đọc"},fields:{slug:"/2019-08-30-lam-quen-voi-kien-truc-serverless"}}},pathContext:{slug:"/2019-08-30-lam-quen-voi-kien-truc-serverless",prev:{frontmatter:{title:"Làm quen khái niệm CORS của Web",desc:"Bài này khá căn bản và cần thiết cho bạn nào chưa biết gì về CORS, nghe ai đó nói về từ khóa ghê gớm này mà ko biết nó là gì, không để cập đến vấn đề setup làm sao để chạy CORS trên server - vì mình ko biết code phía server đâu",type:"post",category:null,tags:["javascript","hoc-thuat"],date:"2019-09-06",cover:""},fields:{slug:"/2019-09-06-gioi-thieu-can-ban-ve-cors"}},next:{frontmatter:{title:"Tùy biến code theo tốc độ mạng",desc:"Responsive với CSS chúng ta tùy biến code bằng @media, vậy với JS, ta thêm các điều kiện theo tốc độ mạng bằng cách nào?",type:"post",category:null,tags:["javascript","thu-thuat"],date:"2019-08-23",cover:""},fields:{slug:"/2019-08-23-tuy-bien-code-theo-toc-do-mang"}}}}}});
//# sourceMappingURL=path---2019-08-30-lam-quen-voi-kien-truc-serverless-ba72f636f767e83f4b1d.js.map