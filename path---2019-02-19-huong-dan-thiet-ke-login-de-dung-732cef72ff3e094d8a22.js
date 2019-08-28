webpackJsonp([0x7da68ce68b08],{1417:function(n,i){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#%C4%91%E1%BA%B7t-login-form-trong-modal">Đặt login form trong modal</a></li>\n<li><a href="#%E1%BA%A9n-h%E1%BA%BFt-cho-g%E1%BB%8Dn-r%C3%A0ng">Ẩn hết cho gọn ràng</a></li>\n<li><a href="#link-vi-di%E1%BB%87u">Link vi diệu</a></li>\n<li><a href="#t%C3%A1ch-trang-login-th%C3%A0nh-nhi%E1%BB%81u-trang">Tách trang login thành nhiều trang</a></li>\n<li><a href="#m%E1%BB%99t-v%C3%A0i-thi%E1%BA%BFt-k%E1%BA%BF-form-%C4%91%C6%A1n-gi%E1%BA%A3n-l%C3%A0-n%C3%B3-kinh-%C4%91i%E1%BB%83n-v%C3%A0-ko-c%C3%B3-g%C3%AC-%C4%91%E1%BB%83-ch%C3%AA">Một vài thiết kế form, đơn giản là nó kinh điển và ko có gì để chê</a></li>\n</ul>\n<!-- /TOC -->\n<p>Bây giờ, người ta hay dùng 1Password, Lastpass, Chrome password manager để tự điền login. Là một website creator <em>chuyên nghiệp</em>, chúng ta phải để ý và làm sao đó để user có được trãi nghiệm tốt nhất từ trang đơn giản nhất Login</p>\n<blockquote>\n<p>Login form: đơn giản nhất có thể, dễ đoán, làm việc tốt với các công cụ quản lý password</p>\n</blockquote>\n<h2 id="đặt-login-form-trong-modal"><a href="#%C4%91%E1%BA%B7t-login-form-trong-modal" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Đặt login form trong modal</h2>\n<p><img src="https://i.imgur.com/P6PR9b6.png" alt="Login form tưởng dễ mà ko dễ"></p>\n<p>Vấn đề của kiểu này</p>\n<ul>\n<li><strong>Số lượng bước hơi nhiều</strong>. 1- click nút login -> 2. Chọn vào login (nếu form có cả 2 login và sign up) -> 3- điền thông tin rồi submit. Không hiệu quả, nếu một trang hẳn hoi, user có thể truy cập từ trang search, share link, mở ngày password manager</li>\n<li>Không có link cũng khá phiền toái cho các bạn làm support, phải chỉ step-by-step tới login, thay vì quăng luôn cái link sẽ nhanh hơn. Các trình quản lý password cũng ko chạy được một số tính năng, như cái lasspast nếu là popup nó sẽ ko tự động mở trang gọi đăng nhập trực tiếp được.</li>\n</ul>\n<h2 id="ẩn-hết-cho-gọn-ràng"><a href="#%E1%BA%A9n-h%E1%BA%BFt-cho-g%E1%BB%8Dn-r%C3%A0ng" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Ẩn hết cho gọn ràng</h2>\n<p><img src="https://i.imgur.com/GJMjc7w.png" alt="Login form tưởng dễ mà ko dễ"></p>\n<p>Cái trang Delta này, lúc đầu ẩn đi cái <code class="language-text">Last Name</code>, sau khi nhập xong user name nó mới kêu nhập thêm last name (thằng này hiếm thấy, nhưng nếu là trang register thì thấy nhiều hơn), chắc là muốn dẹp cho gọn bớt giao diện. Ẩn field như vậy thì trình quản lý password chào thua, nó ko điền tự động được.</p>\n<h2 id="link-vi-diệu"><a href="#link-vi-di%E1%BB%87u" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Link vi diệu</h2>\n<p><img src="https://i.imgur.com/lpbFv1K.png" alt="Login form tưởng dễ mà ko dễ"></p>\n<p>Cái này có thể thấy trên Slack, nhưng thôi lấy trang Notion để ví dụ đi. Nó gửi cái <strong>login code</strong> qua email, user như vậy ko cần nhớ thêm password nào khác ngoài email. Tuy nhiên, vấn đề là</p>\n<ul>\n<li>Một cách nghiêm túc, giải pháp quá nực cười. 1. Nhập email vào. 2. Mở cửa sổ mới, tab mới, thậm chí điện thoại để check mail (khả năng là bạn tiện thể lướt qua luôn mấy cái email khác). 3. Copy cái code trong email. 4. Mở lại trang login để dán code. Holy shit</li>\n<li>Hoàn toàn ko làm việc được với các trình quản lý password. Các bạn ngoài chuyện thiết kế cho nó consistence với ecosystem của bạn, phải biết có những cái bạn cũng phải consistence với thế giới internet chứ.</li>\n<li>Nếu bạn bạn nghĩ mình thông mình hơn toàn bộ user thì bạn chỉ có thể chơi một mình. Đọc lại cuốn Create a from for stupid people nhé.</li>\n</ul>\n<h2 id="tách-trang-login-thành-nhiều-trang"><a href="#t%C3%A1ch-trang-login-th%C3%A0nh-nhi%E1%BB%81u-trang" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Tách trang login thành nhiều trang</h2>\n<p><img src="https://i.imgur.com/FI5xTzY.png" alt="Login form tưởng dễ mà ko dễ"></p>\n<p><img src="https://i.imgur.com/fggd9Ng.png" alt="Login form tưởng dễ mà ko dễ"></p>\n<p><img src="https://i.imgur.com/wibMgsA.png" alt="Login form tưởng dễ mà ko dễ"></p>\n<p>Cũng như google, họ ko muốn đập vào mặt user quá nhiều thông tin một lúc, tuy nhiên thông tin ở đây thật sự có nhiều tới mức phải tách ra chưa? User phải click 2 bước mới login được.</p>\n<h2 id="một-vài-thiết-kế-form-đơn-giản-là-nó-kinh-điển-và-ko-có-gì-để-chê"><a href="#m%E1%BB%99t-v%C3%A0i-thi%E1%BA%BFt-k%E1%BA%BF-form-%C4%91%C6%A1n-gi%E1%BA%A3n-l%C3%A0-n%C3%B3-kinh-%C4%91i%E1%BB%83n-v%C3%A0-ko-c%C3%B3-g%C3%AC-%C4%91%E1%BB%83-ch%C3%AA" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Một vài thiết kế form, đơn giản là nó kinh điển và ko có gì để chê</h2>\n<p><img src="https://i.imgur.com/2vRsUZ6.png" alt="Login form tưởng dễ mà ko dễ"></p>\n<p><img src="https://i.imgur.com/YjnInZa.png" alt="Login form tưởng dễ mà ko dễ"></p>\n<p><a target="_blank" rel="noopener noreferrer" href="http://bradfrost.com/blog/post/dont-get-clever-with-login-forms/">don’t get clever with login forms</a></p>',timeToRead:4,excerpt:"Đặt login form trong modal Ẩn hết cho gọn ràng Link vi diệu Tách trang login thành nhiều trang Một vài thiết kế form, đơn giản là nó kinh…",frontmatter:{title:"Login form tưởng dễ mà ko dễ",cover:"",date:"2019-02-19",category:null,tags:["ux-ui"],desc:"Review một vài pattern thiết kế login form hay dùng hiện nay"},fields:{slug:"/2019-02-19-huong-dan-thiet-ke-login-de-dung"}}},pathContext:{slug:"/2019-02-19-huong-dan-thiet-ke-login-de-dung",prev:{frontmatter:{title:"5 điều cần nhớ khi làm việc với service worker",desc:"Năm điều nhỏ nhỏ, nhưng rất hay ho cần thiết, cần biết",type:"post",category:null,tags:["javascript"],date:"2019-02-20",cover:""},fields:{slug:"/2019-02-20-huong-dan-5-dieu-can-nho-khi-dung-service-worker"}},next:{frontmatter:{title:"Wordpress vs Static site",desc:"Chúng ta cùng nhau điểm qua cái hay, cái dở của từng thằng để nghiền ngẫm xem nó phù hợp trong trường hợp nào.",type:"post",category:null,tags:["ux-ui"],date:"2019-02-17",cover:""},fields:{slug:"/2019-02-17-danh-gia-wordpress-va-static-site"}}}}}});
//# sourceMappingURL=path---2019-02-19-huong-dan-thiet-ke-login-de-dung-732cef72ff3e094d8a22.js.map