webpackJsonp([0x5d121aed0b0c],{1381:function(n,h){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li>\n<p><a href="#1-%C4%91%C6%B0%E1%BB%A3c">1. Được</a></p>\n<ul>\n<li><a href="#11-build-nhanh-h%C6%A1n">1.1. Build nhanh hơn</a></li>\n<li><a href="#12-m%E1%BB%99t-framework-nhi%E1%BB%81u-platform">1.2. Một framework, nhiều platform</a></li>\n<li><a href="#13-hot-reloading">1.3. Hot reloading</a></li>\n</ul>\n</li>\n<li>\n<p><a href="#2-m%E1%BA%A5t">2. Mất</a></p>\n<ul>\n<li><a href="#21-kh%C3%B4ng-ph%E1%BA%A3i-module-n%C3%A0o-c%C5%A9ng-ngon">2.1. Không phải module nào cũng ngon</a></li>\n<li><a href="#22-performance">2.2. Performance</a></li>\n<li><a href="#23-v%E1%BA%ABn-c%E1%BA%A7n-native-developer">2.3. Vẫn cần Native Developer</a></li>\n<li><a href="#24-s%C3%A2n-ch%C6%A1i-c%E1%BB%A7a-facebook">2.4. Sân chơi của Facebook</a></li>\n<li><a href="#25-v%E1%BB%81-m%E1%BA%B7t-con-ng%C6%B0%E1%BB%9Di">2.5. Về mặt con người</a></li>\n</ul>\n</li>\n<li><a href="#3-l%E1%BA%ADp-team">3. Lập team</a></li>\n<li>\n<p><a href="#4-qu%E1%BA%A3n-l%C3%BD-d%E1%BB%B1-%C3%A1n">4. Quản lý dự án</a></p>\n<ul>\n<li><a href="#41-d%E1%BB%B1ng-design-system">4.1. Dựng design system</a></li>\n</ul>\n</li>\n</ul>\n<!-- /TOC -->\n<p>React Native đang là xu hướng lựa chọn của nhiều công ty khi muốn bắt đầu làm app, với lời đường mật build một lần chạy cả 2 nền tảng iOS và Android khiến ai cũng muốn học và muốn làm</p>\n<p>Trước khi đưa ra quyết định lựa chọn công nghệ nào cho sản phẩm của công ty, đây là những thứ bạn luôn phải cân nhắc: được gì và mất gì với React Native</p>\n<h1 id="1-được"><a href="#1-%C4%91%C6%B0%E1%BB%A3c" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>1. Được</h1>\n<h2 id="11-build-nhanh-hơn"><a href="#11-build-nhanh-h%C6%A1n" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>1.1. Build nhanh hơn</h2>\n<p>Một trong những selling point của React Native việc phát triển app nhanh hơn, với rất nhiều thư viện nguồn mở trên mạng, rất nhiều component giải quyết các vấn đề chung mà bạn ko cần built từ đầu.</p>\n<p>Javascript là thứ ngôn ngữ được sử dụng <em>quá nhiều</em> ở những năm gần đây, càng nhiều developer có kiến thức nền tảng của Javascript, muốn học javascript, nhân lực rất dồi dào.</p>\n<h2 id="12-một-framework-nhiều-platform"><a href="#12-m%E1%BB%99t-framework-nhi%E1%BB%81u-platform" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>1.2. Một framework, nhiều platform</h2>\n<p>Bạn có thể copy một phần code để xài chung giữa iOS, Android, hay thậm chí là web. Công đồng React Native cũng không ngừng cung cấp nhiều module native ngon, open source để không phải viết lại.</p>\n<h2 id="13-hot-reloading"><a href="#13-hot-reloading" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>1.3. Hot reloading</h2>\n<p>Tính năng thần thánh giúp chúng xem ngay kết quả sau khi thay đổi UI, với dân làm web thì bình thường nhưng với người làm app nó là tính năng giúp tiết kiệm cả khối thời gian so với build bằng native.</p>\n<h1 id="2-mất"><a href="#2-m%E1%BA%A5t" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>2. Mất</h1>\n<h2 id="21-không-phải-module-nào-cũng-ngon"><a href="#21-kh%C3%B4ng-ph%E1%BA%A3i-module-n%C3%A0o-c%C5%A9ng-ngon" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>2.1. Không phải module nào cũng ngon</h2>\n<p>Một vài module bạn cần có thể không có sẵn, hoặc không có document đàng hoàng, hoặc thậm chí chạy không tốt như quảng cáo, tất cả là open source, đôi khi cũng phải built từ đầu hoặc chỉnh sửa từ những cái có sẵn.</p>\n<h2 id="22-performance"><a href="#22-performance" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>2.2. Performance</h2>\n<p>Đạt được performance như Native app thực sự quá khó cho các nền tảng muốn chạy cross platform. Bạn sẽ phải đánh đổi giữa bộ nhớ, kích thước app, tốc độ.</p>\n<h2 id="23-vẫn-cần-native-developer"><a href="#23-v%E1%BA%ABn-c%E1%BA%A7n-native-developer" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>2.3. Vẫn cần Native Developer</h2>\n<p>Implement một vài tính năng native vẫn cần kiến thức của platform đó. Như truy cập sensor, camera hoặc push notification cần sự giúp đỡ của iOS và Android developer.</p>\n<p>Không phải mọi thứ đều làm được như native app mặc dù bạn sẽ luôn thấy React Native luôn được quảng cáo là chạy trên nhiều platform. Trên khía cạnh kinh doanh, các công ty chống lưng cho Android và iOS sẽ luôn làm cho platform của họ khác biết với đối thủ. </p>\n<h2 id="24-sân-chơi-của-facebook"><a href="#24-s%C3%A2n-ch%C6%A1i-c%E1%BB%A7a-facebook" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>2.4. Sân chơi của Facebook</h2>\n<p>React Native suy cho cùng là một project riêng của Facebook sau được chuyển thành open source, Facebook ko được thừa hưởng những tài liệu được dấu bởi Apple và Google, họ đâu muốn tặng hết cái android và iOS ra ngoài. Đồng nghĩa với việc, sẽ rất nhiều kiến thức nằm rải rác khắp nơi trên Github issue, blog, tweet, trao đổi, hội thảo, chưa có một official document nào đầy đủ.</p>\n<p>React Native tiến hoá không ngừng. Cứ mỗi tháng có release mới, nếu nguyên cái app không chết, thì cũng chết một vài thư viện đang dùng. Upgrade là một cơn ác mộng, còn nếu không upgrade, sau 6 tháng là xem như app bạn đã lỗi thời</p>\n<h2 id="25-về-mặt-con-người"><a href="#25-v%E1%BB%81-m%E1%BA%B7t-con-ng%C6%B0%E1%BB%9Di" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>2.5. Về mặt con người</h2>\n<p>Nếu đang có một team mobile, giới thiệu một team React Native, chẳng khác nào bạn đang đưa team mobile vào một thế tiến thoái lưỡng nan, rất nhiều dev chuyên mobile native không hứng thú với javascript, những iOS developer sẽ trả lời với bạn rằng Objective-C/Swift là phát minh của thượng đế.</p>\n<p>Nếu bạn đã có người đảm nhiệm cho iOS và Android rồi, React Native không phải là lựa chọn dành cho bạn. Bài học từ AirBnB, một trong những team engineer được nể trọng nhất thời điểm hiện tại, họ đã đặt cược rất sớm vào React Native, nhưng cuối cùng bỏ cuộc vì vấn đề văn hoá “brownfield”</p>\n<p><a href="https://www.youtube.com/watch?v=tWitQoPgs8w" target="_blank" rel="noopener noreferrer">Leland Richardson - React Native in the "Brown Field" - React Conf 2017</a></p>\n<p><a href="https://medium.com/airbnb-engineering/sunsetting-react-native-1868ba28e30a" target="_blank" rel="noopener noreferrer">Sunsetting React Native</a></p>\n<div class="note">Nếu công ty bạn chỉ mới có iOS, chuẩn bị build Android, hãy chọn React Native để build Android</div>\n<h1 id="3-lập-team"><a href="#3-l%E1%BA%ADp-team" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>3. Lập team</h1>\n<p>Chúng ta hãy đứng trên góc nhìn của một người viết mobile app về React Native. Rất nhiều web developer, bao gồm mình, muốn làm app. Tuy nhiên React Native sẽ không thay thế hoàn toàn native app. Thật ra nó còn làm một thứ phức tạp hơn, bạn phải loay hoay kết hợp giữa React, iOS, Android cùng lúc.</p>\n<p>Trong một thế giới lý tưởng, nơi bạn có chuyên gia iOS, chuyên gia Android trong team. Nhưng không, bạn chỉ được chọn một native developer, hãy chọn Android. React Native trên iOS dễ quản lý hơn trên Android. Ở Mỹ, đa phần những người làm trong kỹ thuật, như đội của Facebook chẳng hạn, user cũng vậy, sử dụng iOS nhiều hơn, nói nôm na iOS luôn được ưu tiên và test kỹ hơn trên iOS. Android sẽ có những lỗi mà chỉ có chuyên gia trên Android mới hiểu nổi.</p>\n<p><img src="https://cdn-images-1.medium.com/max/1600/1*ivbK3rkZMIAgt9hVpNshig.png" alt="Chia sẻ của lead team React Native trong quá trình lập team React Native">\n<img src="https://cdn-images-1.medium.com/max/800/0*HvHub4QRI5jFiihz.jpg" alt="Chia sẻ của lead team React Native trong quá trình lập team React Native"></p>\n<p>Sau khi thuê lead React Native, bạn nên thuê thêm 2 người chuyên làm React. Họ không cần kinh nghiệm native mobile. Chỉ cần đảm bảo họ có khái niệm trong đầu về mobile app, đừng dùng những người chỉ biết web. Làm React Native sẽ vướng nhiều vấn đề mà người làm web sẽ cảm thấy khó chịu vì những vấn đề với web thì nó quá đơn giản.\n3 người là đủ, tất nhiên cũng tùy thuộc vào tốc độ phát triển của ứng dụng. Lead của team nên dùng 50% thời gian để phát triển tính năng, còn lại thì maintain và hỗ trợ các dev khác</p>\n<p>Designer phải là người am hiểu mobile app, dù team dev có mạnh cỡ mấy, app chạy nhanh cỡ mấy, nhưng thiết kế không tốt sẽ làm user khó xài và cảm thấy app cùi. Web nó hơi khác mobile app, user không muốn có 10 cái input phải cuộn lên cuộn xuống trên màn hình để nhập hết.</p>\n<p>Không nên nhốt developer trong một cái phòng dành 8 tiếng một ngày chỉ để phát triển sản phẩm, cho họ tí thời gian để nâng cao kiến thức, đưa đi các hội thảo 1 lần 1 năm. Đó là cách tốt nhất để cập nhập và tạo mối quan hệ với những người có hiểu biết. Lý tưởng là thế, nhưng thực sự công ty cũ của mình họ không muốn developer ngao du trên mạng quá nhiều, không slack, không github, không youtube để xem conference ở nước ngoài. Nếu muốn có team xịn bạn phải đầu tư cho thành viên phát triển .</p>\n<h1 id="4-quản-lý-dự-án"><a href="#4-qu%E1%BA%A3n-l%C3%BD-d%E1%BB%B1-%C3%A1n" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>4. Quản lý dự án</h1>\n<p>Nếu đã có auth và code xử lý API đã viết cho web, có thể tách ra và sử dụng lại trên app. Các bạn web dev luôn rất hào hứng để viết tính năng cho app, nhưng họ gặp rất nhiều khó khăn liên quan đến build, các bug thuộc phần native.</p>\n<h2 id="41-dựng-design-system"><a href="#41-d%E1%BB%B1ng-design-system" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>4.1. Dựng design system</h2>\n<p>Nếu muốn đẩy nhanh quá trình phát triển, tạo một design system là lựa chọn của tất cả các công ty lớn hiện nay. Design system nó là một tập các component có thể tái sử dụng và tuân theo một cái guideline rõ ràng. Cái này cần sự kết hợp giữa dev và designer. Nó còn giúp cho 2 thành phần 2 cãi nhau này có tiếng nói chung, có sự thống nhất ngay từ đầu. Đa phần các designer thường vẽ screen chứ không vẽ component trước. Khi tập trung vào screen, designer thường có xu hướng cho ra rất nhiều kiểu khoảng trống, kích thước font chữ, màu sắc khác nhau. Khi dev bắt tay vào làm trên từng screen, họ hay cảm thấy làm biến vì khối lượng công việc hơi nhiều và quá chi tiết, vài ngày sau đến trang khác đôi khi design lại đổi. Không có design system rất khó update các screen cũ và không kiểm soát được sự đồng nhất.</p>\n<p>Những team vận hành như vậy thường đổ hết tội lỗi cho dev rằng không tinh tế, không pixel-perfect, không chi tiết được như designer. Nếu rơi vào tình huống này, chúng ta không nên đổ lỗi cho ai cả, tìm cách cắt giảm mức độ phức tạp của thiết kế. Chìa khoá cuối cùng vẫn là system design mấy bạn.</p>\n<p>Nếu đã có app rồi, giờ đi làm lại design system thì nó tốn công, nhưng nó đáng. Ai đó hãy tin mình đi, bạn không biết bạn đã lãng phí bao nhiêu thời gian cho thiết kế đâu.</p>\n<p>Thế còn component có thể dùng trên cả web và app thì sao? React cho web và React Native rất là giống nhau nhưng nó có những khác biệt rõ ràng, <code class="language-text">&lt;div/&gt;</code> và <code class="language-text">&lt;View/&gt;</code>, CSS và Stylesheet. Với kinh nghiệm của mình, việc copy, chỉnh sửa cho 1 component web, 1 component app không có gì khủng khiếp, việc làm 1 component mà chạy được cả 2 mới là “xương”</p>\n<p><a href="https://www.netguru.co/blog/react-native-pros-and-cons" target="_blank" rel="noopener noreferrer">React Native - Pros and Cons Of Facebook’s Framework</a></p>\n<p><a href="https://medium.com/@GroundControl/how-to-build-your-react-native-team-d8bc4be6014a" target="_blank" rel="noopener noreferrer">How to build your React Native team</a></p>',timeToRead:9,excerpt:"1. Được 1.1. Build nhanh hơn 1.2. Một framework, nhiều platform 1.3. Hot reloading 2. Mất 2.1. Không phải module nào cũng ngon 2.…",frontmatter:{title:"Chia sẻ của lead team React Native trong quá trình lập team React Native",cover:"",date:"2018-11-06",category:null,tags:["react-native"],desc:"Bài viết sẽ phù hợp với founder của một startup, hoặc CTO. Bài viết này là chia sẻ của một team lead đang làm React Native, khía cạnh kỹ thuật cũng như cách tổ chức một team."},fields:{slug:"/2018-11-06-react-native-lap-team-nhu-the-nao"}}},pathContext:{slug:"/2018-11-06-react-native-lap-team-nhu-the-nao",prev:{frontmatter:{title:"Giới thiệu lifecycle hook của Vue JS",desc:"Giới thiệu nhanh gọn lẹ cho bạn nào chưa biết",type:"post",category:null,tags:["vuejs"],date:"2018-11-07",cover:""},fields:{slug:"/2018-11-07-gioi-thieu-lifecycle-method-vuejs"}},next:{frontmatter:{title:"3 lỗi javascript thường mắc phải làm ảnh hưỏng perfomance",desc:"Bài viết dành cho những người nghiện tốc độ, nghiện cách viết ES6",type:"post",category:null,tags:["javascript"],date:"2018-11-05",cover:""},fields:{slug:"/2018-11-05-moi-so-loi-javascript-lam-anh-huong-perfomance"}}}}}});
//# sourceMappingURL=path---2018-11-06-react-native-lap-team-nhu-the-nao-ad91225b5a63e72c9aea.js.map