webpackJsonp([0xff567e4b7bd9],{1496:function(n,h){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#KISS">KISS</a></li>\n<li><a href="#DRY">DRY</a></li>\n<li><a href="#Up-up-m%E1%BB%9F-m%E1%BB%9F">Up up mở mở</a></li>\n<li><a href="#H%E1%BB%A3p-th%E1%BB%83-s%E1%BA%BD-m%E1%BA%A1nh-h%C6%A1n-%C4%91%C6%B0%E1%BB%A3c-buff">Hợp thể sẽ mạnh hơn được buff</a></li>\n<li><a href="#Ai-l%C3%A0m-vi%E1%BB%87c-n%E1%BA%A5y-Single-Responsibility">Ai làm việc nấy (Single Responsibility)</a></li>\n<li><a href="#B%E1%BB%9Bt-quan-t%C3%A2m-con-g%C3%A1i-nh%C3%A0-h%C3%A0ng-x%C3%B3m-Separation-of-Concerns">Bớt quan tâm con gái nhà hàng xóm (Separation of Concerns)</a></li>\n<li><a href="#B%E1%BA%A1n-l%C3%A0-l%E1%BA%ADp-tr%C3%ACnh-vi%C3%AAn-kh%C3%B4ng-ph%E1%BA%A3i-th%E1%BA%A7y-b%C3%B3i-YAGNI">Bạn là lập trình viên không phải thầy bói YAGNI</a></li>\n<li><a href="#T%E1%BB%91i-%C6%B0u-h%C3%B3a-qu%C3%A1-s%E1%BB%9Bm">Tối ưu hóa quá sớm</a></li>\n<li><a href="#Refactor">Refactor</a></li>\n<li><a href="#Th%C3%A0-anh-code-s%E1%BA%A1ch-ch%E1%BB%A9-anh-kh%C3%B4ng-c%E1%BA%A7n-code-cho-cao-si%C3%AAu-Clean-Code--Clever-Code">Thà anh code sạch, chứ anh không cần code cho cao siêu (Clean Code > Clever Code)</a></li>\n<li><a href="#T%E1%BB%95ng-k%E1%BA%BFt">Tổng kết</a></li>\n</ul>\n<!-- /TOC -->\n<p>Nếu bạn là người theo chủ nghĩa viết code sao cho <em>chạy được là đủ</em>, bạn không nên đọc bài này. Còn mục tiêu là viết code và <strong>đặt cái tâm vào những gì mình viết ra</strong> thì bạn nên biết các nguyên tắc nền tảng này.</p>\n<h2 id="kiss"><a href="#kiss" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>KISS</h2>\n<p>Nguyên tắc <strong>Keep it simple, stupid</strong> được áp dụng cho rất nhiều thứ trong cuộc sống, rất cần thiết cho các dự án từ vừa tới lớn.</p>\n<p>Từ lúc bắt đầu code những dòng đầu tiên, chúng ta phải khắc cốt ghi tâm câu <strong>đơn giản nhất có thể</strong>, code càng phức tạp càng khó viết và đọc lại, càng có khả năng phát sinh bug, càng khó chỉnh sửa sau này. Cụ Antoine de Saint-Exupery có phán câu này:</p>\n<blockquote>\n<p>Hoàn hảo không phải là khi không còn gì để thêm vào nữa, mà là không còn gì có thể bỏ bớt</p>\n</blockquote>\n<h2 id="dry"><a href="#dry" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>DRY</h2>\n<p>Nguyên tắc vàng mà chúng ta nghe mãi nghe mãi. <strong>Don’t repeat yourself</strong>, không bao giờ để chuyện code chổ này giống hệt chổ kia, copy-paste một đoạn code ở nhiều chổ trong source. Nếu thấy một đoạn code mà cứ viết đi viết lại ở nhiều nơi trong source, người ta sẽ đánh giá trình bạn còn non và xanh lắm</p>\n<h2 id="up-up-mở-mở-openclosed"><a href="#up-up-m%E1%BB%9F-m%E1%BB%9F-openclosed" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Up up mở mở (Open/Closed)</h2>\n<p>Biết có thể viết thêm các tính năng bổ sung thoải mái, nhưng không được chỉnh sửa core chính. Cái này có thể lấy ví dụ bạn lấy những package trên <code class="language-text">npm</code>, nó nằm trong <code class="language-text">node_modules</code>, sẽ không được chỉnh sửa gì ở đó hết, nếu lỡ sau này người ta update lên, là bạn phải tự cập nhập thủ công nhé.</p>\n<h2 id="hợp-thể-sẽ-mạnh-hơn-được-buff-composition--inheritance"><a href="#h%E1%BB%A3p-th%E1%BB%83-s%E1%BA%BD-m%E1%BA%A1nh-h%C6%A1n-%C4%91%C6%B0%E1%BB%A3c-buff-composition--inheritance" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Hợp thể sẽ mạnh hơn được buff (Composition > Inheritance)</h2>\n<p><img src="https://wegotthiscovered.com/wp-content/uploads/2018/08/Power-Rangers-Movie-Blu-ray-cover-art-1.jpg" alt="10 nguyên tắc lập trình nền tảng mà lập trình viên nào cũng cần biết"></p>\n<p>Nếu bạn có xem 5 anh em siêu nhân bạn sẽ hiểu, nếu 5 anh em siêu nhân mà hợp thể lại sẽ tạo ra một con robot với sức mạnh vượt bật, đánh bại mọi cả thể yêu quái, dù nó được buff rất nhiều đồ chơi để tăng dame.</p>\n<p>Cái này có ví dụ cho anh em nào viết OOP, mà mình thì không rành OOP lắm, nên anh em tự tìm ví dụ nhé.</p>\n<h2 id="ai-làm-việc-nấy-single-responsibility"><a href="#ai-l%C3%A0m-vi%E1%BB%87c-n%E1%BA%A5y-single-responsibility" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Ai làm việc nấy (Single Responsibility)</h2>\n<p>Mỗi function chỉ thực hiện một nhiệm vụ duy nhất, không ôm đồm nhiều thứ cùng lúc.</p>\n<p>Nếu xác định ra đường là đi ăn cơm, thì ăn cơm rồi về, không có sẵn tiền mua thêm bịch chè, ly trà sữa hay vài trứng vịt lộn.</p>\n<h2 id="bớt-quan-tâm-con-gái-nhà-hàng-xóm-separation-of-concerns"><a href="#b%E1%BB%9Bt-quan-t%C3%A2m-con-g%C3%A1i-nh%C3%A0-h%C3%A0ng-x%C3%B3m-separation-of-concerns" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Bớt quan tâm con gái nhà hàng xóm (Separation of Concerns)</h2>\n<p>Cũng tương tự với ai làm việc nấy, nguyên tắc này có phần trừu tượng, khái quát hơn một chút.</p>\n<p>Lấy ví dụ quan hệ trai-gái, để có thể quen một lúc 3 cô, bạn cần lập 3 tài khoản Zalo khác nhau, trên 3 cái điện thoại khác nhau, để khi đi chơi với cô nào thì không bị phát hiện mấy cô kia, đừng dùng 1 tài khoản trên 1 điện thoại mà chat với cả 3 cô cùng lúc.</p>\n<p>Lấy ví dụ trong <em>nghề</em> lập trình nó là mô hình thiết kế MVC, còn trong <em>nghề</em> React nó là khái niệm Container và Presentation component. Nhưng anh em cứ nhớ ví dụ 3 cô gái cho dễ.</p>\n<p><img src="https://static.makeuseof.com/wp-content/uploads/2017/10/programming-principle-mvc-pattern.png" alt="10 nguyên tắc lập trình nền tảng mà lập trình viên nào cũng cần biết"></p>\n<h2 id="bạn-là-lập-trình-viên-không-phải-thầy-bói-yagni---you-arent-gonna-need-it"><a href="#b%E1%BA%A1n-l%C3%A0-l%E1%BA%ADp-tr%C3%ACnh-vi%C3%AAn-kh%C3%B4ng-ph%E1%BA%A3i-th%E1%BA%A7y-b%C3%B3i-yagni---you-arent-gonna-need-it" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Bạn là lập trình viên không phải thầy bói (YAGNI - you aren’t gonna need it)</h2>\n<p>Nguyên tắc này nó nói là, bạn đừng viết ra những hàm mà bạn nghĩ, "ờ, có lẽ trong tương lai chúng ta sớm muộn cũng xài tới nó". Cái gì cần thì viết, có sao lại viết trước?</p>\n<p>Ví dụ, bạn viết sẵn một số lớp abstract và generic để tránh trùng lặp code, mà quá nhiều lớp abstract dẫn đến hậu quả không thể nào mà bảo trì nổi. Nói chung để đảm bảo nguyên tắc DRY, bạn cứ viết trước đi, nếu thấy bị trùng, thầy refactor lại, như ông bà có câu cứ có trâu rồi hả mua chuồng</p>\n<h2 id="tối-ưu-hóa-quá-sớm-avoid-premature-optimization"><a href="#t%E1%BB%91i-%C6%B0u-h%C3%B3a-qu%C3%A1-s%E1%BB%9Bm-avoid-premature-optimization" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Tối ưu hóa quá sớm (Avoid Premature Optimization)</h2>\n<p>Nếu bạn có xu hướng tối ưu các giải thuật được viết ra ngay từ đầu, vấn đề ở chỗ là bạn không thể biết được chương trình sẽ bị nghẽn cổ chai ở đâu cho đến khi có dữ liệu thực tế. Bạn có thể phỏng đoán, tất nhiên là được mà đôi khi hên hên lại đúng. Chỉ có một điều dễ thấy là bạn sẽ bỏ ra không ít thời gian để tăng tốc cho hàm đó, mà thiệt ra nó không chậm tới mức như bạn nghĩ, hoặc mức độ user sử dụng hàm đó sẽ không nhiều.</p>\n<p>Hoàn thành những vấn đề mấu chốt trước, sau đó dò lại để biết đang bị thắt cổ chai ở đâu</p>\n<h2 id="refactor-rồi-lại-refactor-rồi-lại-refactor"><a href="#refactor-r%E1%BB%93i-l%E1%BA%A1i-refactor-r%E1%BB%93i-l%E1%BA%A1i-refactor" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Refactor, rồi lại Refactor, rồi lại Refactor</h2>\n<p>Sự thật ai cũng biết là khi bạn mới bắt đầu viết, thời gian sau nhìn lại, khi đã có cái nhìn cụ thể và rõ ràng hơn những gì mình đang làm trong dự án, bạn sẽ code trước đây mình viết thật sự chưa "ngon". Công việc refactor là rất bình thường. Nếu bạn đang có việc cần thay đổi hoặc kiểm tra code cũ, nếu được thì cứ <em>dọn dẹp</em> một tí trước khi đi.</p>\n<h2 id="thà-anh-code-sạch-chứ-anh-không-cần-code-cho-cao-siêu-clean-code--clever-code"><a href="#th%C3%A0-anh-code-s%E1%BA%A1ch-ch%E1%BB%A9-anh-kh%C3%B4ng-c%E1%BA%A7n-code-cho-cao-si%C3%AAu-clean-code--clever-code" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Thà anh code sạch, chứ anh không cần code cho cao siêu (Clean Code > Clever Code)</h2>\n<p>Nói về clean code, là phải bỏ đi cái tôi to bự sang một bên, đừng bao giờ nghĩ code thế cho ngầu, code mà để bạn khoe với thiên hạ rằng cách code của tôi mới thông minh hơn.</p>\n<p>Ví dụ dễ thấy, một số thanh niên mình từng làm việc chung rất thích dùng câu điều kiện trên một dòng, anh ấy cứ <code class="language-text">&amp;&amp;  || &amp;&amp; || &amp;&amp;</code> các kiểu trên một dòng, ai mà vô đọc thì chỉ có kiếm ảnh để nhờ giải thích là đang muốn làm cái gì.</p>\n<h2 id="tổng-kết"><a href="#t%E1%BB%95ng-k%E1%BA%BFt" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Tổng kết</h2>\n<p>9 người thì 10 ý, nếu đi hỏi 9 người với câu hỏi "Thế nào được gọi là một lập trình viên tốt", thì chắc nhận được không ít sự khác nhau về quan điểm, mà đôi khi còn trái chiều với nhau nữa.</p>\n<p>Bạn thấy ý kiến này thế nào, một lập trình viên giỏi là người biết mình đang phục vụ người dùng cuối, người có thể làm việc hiệu quả với đồng đội, người có thể hoàn thành công việc được giao đúng yêu cầu, đúng tiến độ.</p>\n<p><a target="_blank" rel="noopener noreferrer" href="https://www.makeuseof.com/tag/basic-programming-principles/">10 Basic Programming Principles Every Programmer Must Follow</a></p>',timeToRead:7,excerpt:"KISS DRY Up up mở mở Hợp thể sẽ mạnh hơn được buff Ai làm việc nấy (Single Responsibility) Bớt quan tâm con gái nhà hàng xóm (Separation of…",frontmatter:{title:"10 nguyên tắc lập trình nền tảng mà lập trình viên nào cũng cần biết",cover:"",date:"2019-07-13",category:null,tags:["javascript","hoc-thuat","kinh-nghiem"],desc:"Nhớ thời đại học quá nên ôn lại kiến thức vở lòng mấy bạn ơi"},fields:{slug:"/2019-07-13-nguyen-tac-moi-lap-trinh-vien-can-biet"}}},pathContext:{slug:"/2019-07-13-nguyen-tac-moi-lap-trinh-vien-can-biet",prev:{frontmatter:{title:"Function Component trong Vue",desc:"Không được xuất chúng như là function component của React, nên function component trong Vue không có nhiều người để ý. Hy vọng tương lai nó sẽ được nâng cấp để cạnh tranh với bên React đang quảng bá quá rầm rộ.",type:"post",category:null,tags:["vuejs","hoc-thuat"],date:"2019-07-21",cover:""},fields:{slug:"/2019-07-21-function-component-trong-vue"}},next:{frontmatter:{title:"6 ví dụ để bạn yêu luôn observable",desc:"Thêm những lý do để dụ dỗ bạn xài Observable",type:"post",category:null,tags:["javascript","thu-thuat"],date:"2019-07-09",cover:""},fields:{slug:"/2019-07-09-6-vi-du-giup-ban-yeu-luon-rxjs-observable"}}}}}});
//# sourceMappingURL=path---2019-07-13-nguyen-tac-moi-lap-trinh-vien-can-biet-55f21b706a251f9e2c79.js.map