webpackJsonp([0xd7be745e736d],{1416:function(n,h){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li>\n<p><a href="#static-site">Static Site</a></p>\n<ul>\n<li><a href="#th%E1%BA%BF-m%E1%BA%A1nh">Thế mạnh</a></li>\n<li><a href="#t%E1%BB%91c-%C4%91%E1%BB%99">Tốc độ</a></li>\n<li><a href="#n%E1%BB%99i-dung-nhi%E1%BB%81u-l%C3%AAn-v%E1%BA%A5n-%C4%91%E1%BB%81-c%C5%A9ng-%C3%ADt-ph%E1%BB%A9c-t%E1%BA%A1p-h%C6%A1n">Nội dung nhiều lên, vấn đề cũng ít phức tạp hơn</a></li>\n<li><a href="#b%E1%BA%A3o-m%E1%BA%ADt">Bảo mật</a></li>\n<li><a href="#chi-ph%C3%AD-duy-tr%C3%AC-r%E1%BA%BB">Chi phí duy trì rẻ</a></li>\n<li><a href="#th%E1%BA%BF-kh%C3%B4ng-m%E1%BA%A1nh">Thế không mạnh</a></li>\n<li><a href="#kh%C3%B4ng-th%C3%A2n-thi%E1%BB%87n-v%E1%BB%9Bi-ng%C6%B0%E1%BB%9Di-d%C3%B9ng-b%C3%ACnh-th%C6%B0%E1%BB%9Dng">Không thân thiện với người dùng bình thường</a></li>\n<li><a href="#h%E1%BA%A1n-ch%E1%BA%BF-t%C3%ADnh-n%C4%83ng">Hạn chế tính năng</a></li>\n<li><a href="#c%E1%BB%99ng-%C4%91%E1%BB%93ng-s%E1%BB%AD-d%E1%BB%A5ng-kh%C3%B4ng-nhi%E1%BB%81u">Cộng đồng sử dụng không nhiều</a></li>\n</ul>\n</li>\n<li>\n<p><a href="#wordpress">Wordpress</a></p>\n<ul>\n<li><a href="#th%E1%BA%BF-m%E1%BA%A1nh-1">Thế mạnh</a></li>\n<li><a href="#m%E1%BB%99t-giao-di%E1%BB%87n-admin-%C4%91%E1%BB%83-c%E1%BA%ADp-nh%E1%BA%ADp-n%E1%BB%99i-dung-m%C3%A0-m%E1%BB%8Di-kh%C3%A1ch-h%C3%A0ng-%C4%91%E1%BB%81u-h%C3%A0i-l%C3%B2ng">Một giao diện admin để cập nhập nội dung mà mọi khách hàng đều hài lòng</a></li>\n<li><a href="#h%C3%A0ng-t%C3%A1-giao-di%E1%BB%87n-%C4%91%E1%BB%83-l%E1%BB%B1a-ch%E1%BB%8Dn">Hàng tá giao diện để lựa chọn</a></li>\n<li><a href="#feature-c%C3%A0i-th%C3%AAm-%C4%91%E1%BB%A7-%C4%91%C3%A1p-%E1%BB%A9ng-m%E1%BB%8Di-nhu-c%E1%BA%A7u-t%E1%BB%AB-th%E1%BA%A5p-%C4%91%E1%BA%BFn-trung-b%C3%ACnh">Feature cài thêm đủ đáp ứng mọi nhu cầu từ thấp đến trung bình</a></li>\n<li><a href="#nhi%E1%BB%81u-c%C3%B4ng-ty-d%E1%BB%8Bch-v%E1%BB%A5-r%E1%BA%BB-nh%C6%B0-%C4%91i-ch%E1%BB%A3-c%C3%A1">Nhiều công ty, dịch vụ rẻ như đi chợ cá</a></li>\n<li><a href="#th%E1%BA%BF-y%E1%BA%BFu">Thế yếu</a></li>\n</ul>\n</li>\n<li><a href="#k%E1%BA%BFt-lu%E1%BA%ADn">Kết luận</a></li>\n</ul>\n<!-- /TOC -->\n<p>Sếp cũ hôm rồi liên lạc hỏi “em có biết công ty nào nhận làm Gatsby không, anh muốn làm một cái static site cho công ty”, cái blog này bạn đang đọc cũng được viết bằng Gatsby, một static site generator, với developer thì static site không xa lạ, nhưng để trả lời có công ty nào nhận làm static site thì mình ko biết, đa phần người ta sẽ dùng một CMS nào đó như Wordpress,  để đảm bảo có admin cho bạn vào quản lý. Wordpress không có gì sai, mình làm wordpress khoảng hơn 3 năm, cũng tự viết theme, tự viết plugin, mình vẫn xài Wordpress một số trường hợp. Tuy nhiên static site mấy năm trở lại đây được quan tâm nhiều hơn trước kia vì những lợi ích mà nó mang lại.</p>\n<p>Static site là gì, nói nôm na là một website chỉ bao gồm html/css/javascript không có database, nó sẽ được build từ file <a href="/blog/blog/2018-11-03-gioi-thieu-markdown">markdown</a>, dùng một số tool phổ biến để build như</p>\n<ul>\n<li><a href="https://github.com/jekyll/jekyll">Jekyll</a> </li>\n<li><a href="https://github.com/gohugoio/hugo">Hugo</a> </li>\n<li><a href="https://github.com/zeit/next.js">next.js</a> </li>\n<li><a href="https://github.com/gatsbyjs/gatsby">gatsby</a> </li>\n<li><a href="https://github.com/GitbookIO/gitbook">gitbook</a> </li>\n<li><a href="https://github.com/nuxt/nuxt.js">nuxt</a> </li>\n<li><a href="https://github.com/vuejs/vuepress">vuepress</a> </li>\n<li><a href="https://github.com/mkdocs/mkdocs">mkdocs</a></li>\n</ul>\n<h2 id="static-site"><a href="#static-site" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Static Site</h2>\n<h3 id="thế-mạnh"><a href="#th%E1%BA%BF-m%E1%BA%A1nh" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Thế mạnh</h3>\n<h4 id="tốc-độ"><a href="#t%E1%BB%91c-%C4%91%E1%BB%99" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Tốc độ</h4>\n<p>Tốc độ hiển thị nội dung của trang sẽ rất nhanh, nếu không muốn nói là nhanh nhất trong tất cả các “thể loại” website. User có thể chấp nhận một website giao diện ko cần pixel perfect (designer có thể không), nhưng sẽ không tha thứ cho một website load lâu hơn rùa bò. Không cần thời gian để query từ database lên, việc load dữ liệu từ host lên phía client tiết kiệm rất nhiều xử lý.</p>\n<p>Đồn đoán là Google nó cũng rank những site có tốc độ load trang nhanh,  cao hơn các trang load ì ạch <a href="https://moz.com/blog/how-website-speed-actually-impacts-search-ranking">Bài thử nghiệm chi tiết</a></p>\n<p>Để test bạn dùng <a href="https://tools.pingdom.com/">Ping Dom</a></p>\n<h4 id="nội-dung-nhiều-lên-vấn-đề-cũng-ít-phức-tạp-hơn"><a href="#n%E1%BB%99i-dung-nhi%E1%BB%81u-l%C3%AAn-v%E1%BA%A5n-%C4%91%E1%BB%81-c%C5%A9ng-%C3%ADt-ph%E1%BB%A9c-t%E1%BA%A1p-h%C6%A1n" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Nội dung nhiều lên, vấn đề cũng ít phức tạp hơn</h4>\n<p>Khi nội dung của trang nhiều lên, thí dụ 10.000 bài viết trong wordpress, thì database nó cũng sẽ phình lên, số lượng user truy cập <strong>vượt ngoài mong đợi</strong> 10.000 user một ngày, nó sẽ phát sinh ra khá nhiều vấn đề cần xử lý. Và một trong những cách đó là chuyển một phần nội dung đó về static site! Bạn thấy sức mạnh của static site ghê chưa. Tất nhiên static site khi lớn lên nó cũng phát sinh vấn đề, tuy nhiên nó sẽ dễ xử lý và đơn giản hơn như wordpress</p>\n<h4 id="bảo-mật"><a href="#b%E1%BA%A3o-m%E1%BA%ADt" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Bảo mật</h4>\n<p>Quá hiển nhiên là static site thì chẳng có gì phải quan tâm đến bảo mật, ko có quản lý user, không có database để mà hack đâu nhé. Những static site chỉ đơn thuần là hiển thị thông tin lên bằng file html, 99.999999% là ko bị hack, trừ khi nó cướp luôn được host và tên miền.</p>\n<h4 id="chi-phí-duy-trì-rẻ"><a href="#chi-ph%C3%AD-duy-tr%C3%AC-r%E1%BA%BB" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Chi phí duy trì rẻ</h4>\n<p>Để duy trì một static site, bạn chỉ tốn vài đô hàng tháng cho dịch vụ hosting, vài trăm k một cái tên miền. Nếu dùng wordpress hay một CMS nào đó khác đi, bạn phải trả cao hơn vì bạn dùng đến database và một host chạy php, chưa nói đến việc bạn lưu trữ đủ thứ trên đó khiến dung lượng ổ cứng lúc nào cũng ko đủ dùng. Bèo lắm cũng 120$ một năm. Nếu sử dụng GitHub pages cho static site, bạn gần như chỉ tốn tiền domain</p>\n<h3 id="thế-không-mạnh"><a href="#th%E1%BA%BF-kh%C3%B4ng-m%E1%BA%A1nh" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Thế không mạnh</h3>\n<h4 id="không-thân-thiện-với-người-dùng-bình-thường"><a href="#kh%C3%B4ng-th%C3%A2n-thi%E1%BB%87n-v%E1%BB%9Bi-ng%C6%B0%E1%BB%9Di-d%C3%B9ng-b%C3%ACnh-th%C6%B0%E1%BB%9Dng" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Không thân thiện với người dùng bình thường</h4>\n<p>Mặc dù markdown được sinh ra là để phục vụ cho đối tượng user không biết gì về lập trình, người dùng bình thường nhất có thể viết được nội dung chuẩn html ko cần chỉnh, tuy nhiên không quá nhiều người không rành công nghệ biết cách viết markdown, và mình thấy đa số họ lại thích một cái editor phức tạp như Word hơn, hoặc là copy từ word lên mà muốn giữ format lại </p>\n<div class="gatsby-highlight">\n      <pre class="language-markdown"><code class="language-markdown"><span class="token title important"><span class="token punctuation">#</span> Heading 1</span>\n<span class="token title important"><span class="token punctuation">##</span> Heading 2</span>\nNội dung\n<span class="token title important"><span class="token punctuation">###</span> Heading 3</span></code></pre>\n      </div>\n<p>Khách hàng sẽ thích thú có một cái trang admin, đăng nhập vào và được chủ động cập nhập theo ý thích hơn, một editor đầy đủ tính năng chỉnh màu chữ, chèn hình, xử lý hình, thay đổi font chữ to nhỏ, đổi kiểu chữ lung tung ben lên. Static site sẽ không có những thứ đó cho bạn</p>\n<p><img src="https://kinsta.com/wp-content/uploads/2018/03/what-is-a-content-management-system-1.png" alt="Wordpress vs Static site"></p>\n<h4 id="hạn-chế-tính-năng"><a href="#h%E1%BA%A1n-ch%E1%BA%BF-t%C3%ADnh-n%C4%83ng" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Hạn chế tính năng</h4>\n<p>Những tính năng căn bản như contact form, bình luận sẽ phải <em>outsource</em> cho một bên thứ 3, static site chỉ giới hạn ở mức hiển thị nội dung, tìm kiếm căn bản, lọc căn bản trong html</p>\n<h4 id="cộng-đồng-sử-dụng-không-nhiều"><a href="#c%E1%BB%99ng-%C4%91%E1%BB%93ng-s%E1%BB%AD-d%E1%BB%A5ng-kh%C3%B4ng-nhi%E1%BB%81u" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Cộng đồng sử dụng không nhiều</h4>\n<p>Như sếp mình, bạn là một công ty, bạn tìm một công ty làm static site sẽ khó khăn hơn, vì thẳng thắng mà nói, số tiền kiếm được của một static site nói chung rất chi là nhỏ, rất ít công ty <strong>thèm</strong> làm.</p>\n<h2 id="wordpress"><a href="#wordpress" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Wordpress</h2>\n<p>Cũng đâu phải tự nhiên mà <a href="https://kinsta.com/wordpress-market-share/">33% site trên internet là wordpress</a>, nó cũng có nhiều cái hay ho nên thiên hạ mới ào ào kéo vào xài.</p>\n<h3 id="thế-mạnh-1"><a href="#th%E1%BA%BF-m%E1%BA%A1nh-1" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Thế mạnh</h3>\n<h4 id="một-giao-diện-admin-để-cập-nhập-nội-dung-mà-mọi-khách-hàng-đều-hài-lòng"><a href="#m%E1%BB%99t-giao-di%E1%BB%87n-admin-%C4%91%E1%BB%83-c%E1%BA%ADp-nh%E1%BA%ADp-n%E1%BB%99i-dung-m%C3%A0-m%E1%BB%8Di-kh%C3%A1ch-h%C3%A0ng-%C4%91%E1%BB%81u-h%C3%A0i-l%C3%B2ng" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Một giao diện admin để cập nhập nội dung mà mọi khách hàng đều hài lòng</h4>\n<p>Giao diện admin của wordpress thực sự ảnh hưởng rất lớn đến thế giới web, nếu ko muốn nói ai làm trang admin cũng đè wordpress ra tham khảo. Với cái giao diện admin bị chê đó bạn làm được đủ thứ\nViết nội dung mới\nThay đổi giao diện trang web\nTùy biến tính năng\nCấu hình SEO\nCập nhập, phục hồi dữ liệu cũ</p>\n<h4 id="hàng-tá-giao-diện-để-lựa-chọn"><a href="#h%C3%A0ng-t%C3%A1-giao-di%E1%BB%87n-%C4%91%E1%BB%83-l%E1%BB%B1a-ch%E1%BB%8Dn" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Hàng tá giao diện để lựa chọn</h4>\n<p><img src="https://kinsta.com/wp-content/uploads/2018/03/wordpress-vs-static-html-2-1024x583.png" alt="Wordpress vs Static site"></p>\n<p>Kho giao diện không những nhiều mà còn dễ cài, một vài cú click là xong, nếu từng đụng vô Joomla, bạn sẽ thấy việc cài giao diện Wordpress dễ dàng hơn như thế nào.</p>\n<h4 id="feature-cài-thêm-đủ-đáp-ứng-mọi-nhu-cầu-từ-thấp-đến-trung-bình"><a href="#feature-c%C3%A0i-th%C3%AAm-%C4%91%E1%BB%A7-%C4%91%C3%A1p-%E1%BB%A9ng-m%E1%BB%8Di-nhu-c%E1%BA%A7u-t%E1%BB%AB-th%E1%BA%A5p-%C4%91%E1%BA%BFn-trung-b%C3%ACnh" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Feature cài thêm đủ đáp ứng mọi nhu cầu từ thấp đến trung bình</h4>\n<p>Plugin cũng là một thế mạnh của Wordpress, cần gì cũng có, thanh toán, tích hợp paypal, forum, ecommerce, social network, tìm là thấy. Được đến ngày hôm nay cũng nhờ cộng động sử dụng Wordpress rất đông đảo.</p>\n<p><img src="https://kinsta.com/wp-content/uploads/2018/03/wordpress-vs-static-html-3-1024x570.png" alt="Wordpress vs Static site"></p>\n<h4 id="nhiều-công-ty-dịch-vụ-rẻ-như-đi-chợ-cá"><a href="#nhi%E1%BB%81u-c%C3%B4ng-ty-d%E1%BB%8Bch-v%E1%BB%A5-r%E1%BA%BB-nh%C6%B0-%C4%91i-ch%E1%BB%A3-c%C3%A1" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Nhiều công ty, dịch vụ rẻ như đi chợ cá</h4>\n<p>Google một phát về dịch vụ làm website ở Việt Nam, trong 100 công ty thì chắc đến 99 công ty làm wordpress, chưa kể đến cộng đồng freelancer. Giá cả thì cũng đủ loại, vô vàn để bạn có thể lựa chọn cho phù hợp từ 500k đến vài trăm triệu.</p>\n<h4 id="thế-yếu"><a href="#th%E1%BA%BF-y%E1%BA%BFu" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Thế yếu</h4>\n<p>Một cách ngắn gọn nhất, những gì là thế mạnh của static site chính là thế yếu của Wordpress, load chậm, open source đồng thời với sự <strong>nổi tiếng</strong> của nó, Wordpress luôn là đích ngắm của cộng đồng hacker <strong>thực tập</strong> (hacker thực thụ ko rãnh hơi đâu hack mấy trang wordpress vặt vãnh). Việc gồng gánh những website có nội dung to nặng đòi hỏi sức người, sức của khá nhiều, không hiểu những trang như tuổi trẻ, vnexpress mà làm wordpress sẽ ra làm sao</p>\n<h2 id="kết-luận"><a href="#k%E1%BA%BFt-lu%E1%BA%ADn" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Kết luận</h2>\n<p>Thường những việc trên đời, mình làm thì mình biết, cái nào hợp với mình thì chỉ có mình mới biết được.\n</p>',timeToRead:10,excerpt:"Static Site Thế mạnh Tốc độ Nội dung nhiều lên, vấn đề cũng ít phức tạp hơn Bảo mật Chi phí duy trì rẻ Thế không mạnh Không thân thiện với…",frontmatter:{title:"Wordpress vs Static site",cover:"",date:"2019-02-17",category:null,tags:["ux-ui"],desc:"Chúng ta cùng nhau điểm qua cái hay, cái dở của từng thằng để nghiền ngẫm xem nó phù hợp trong trường hợp nào."},fields:{slug:"/2019-02-17-danh-gia-wordpress-va-static-site"}}},pathContext:{slug:"/2019-02-17-danh-gia-wordpress-va-static-site",prev:{frontmatter:{title:"Login form tưởng dễ mà ko dễ",desc:"Review một vài pattern thiết kế login form hay dùng hiện nay",type:"post",category:null,tags:["ux-ui"],date:"2019-02-19",cover:""},fields:{slug:"/2019-02-19-huong-dan-thiet-ke-login-de-dung"}},next:{frontmatter:{title:"Làm quen với React Hook bằng ví dụ",desc:"Chúng ta cùng bắt đầu học sử dụng React Hook, nó giải quyết vấn đề gì, sử dụng nó ra sao",type:"post",category:null,tags:["react"],date:"2019-02-11",cover:""},fields:{slug:"/2019-02-11-lam-quen-voi-react-hook-bang-vi-du"}}}}}});
//# sourceMappingURL=path---2019-02-17-danh-gia-wordpress-va-static-site-a77a1825257ee45b68bc.js.map