webpackJsonp([0x5cd52cfb4d81],{1304:function(n,t){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#expo-l%C3%A0-c%C3%A1i-g%C3%AC">Expo là cái gì</a></li>\n<li><a href="#h%E1%BA%A1n-ch%E1%BA%BF-c%E1%BB%A7a-expo">Hạn chế của Expo</a></li>\n<li><a href="#app-s%E1%BA%BD-vi%E1%BA%BFt">App sẽ viết</a></li>\n<li><a href="#c%C3%A0i-expo">Cài Expo</a></li>\n<li><a href="#t%E1%BA%A1o-m%E1%BB%99t-d%E1%BB%B1-%C3%A1n-expo-m%E1%BB%9Bi">Tạo một dự án Expo mới</a></li>\n<li><a href="#ch%E1%BA%A1y-code-v%C3%AD-d%E1%BB%A5">Chạy code ví dụ</a></li>\n</ul>\n<!-- /TOC -->\n<h2 id="expo-là-cái-gì"><a href="#expo-l%C3%A0-c%C3%A1i-g%C3%AC" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Expo là cái gì</h2>\n<p>Expo là một framework để đẩy nhanh việc viết app React Native. Giống như Laravel hay Symphony cho PHP, Ruby on Rail của Ruby. Đồng thời cung cấp một công cụ để chạy thử và debug.</p>\n<h2 id="hạn-chế-của-expo"><a href="#h%E1%BA%A1n-ch%E1%BA%BF-c%E1%BB%A7a-expo" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Hạn chế của Expo</h2>\n<p>Trước khi nghiên cứu tiếp, một vài vấn đề quan trọng sau cần biết</p>\n<ol>\n<li><strong>Expo chỉ hỗ trợ những API mà Expo SDK hỗ trợ</strong>, có nghĩa là, nếu ứng dụng đang viết cần tương tác với Bluetooh, vốn không được hỗ trợ bởi Expo SDK thì bạn phải viết code React Native thuần luôn, hoặc tự viết thêm native code sử dụng thư viện <a href="https://docs.expo.io/versions/latest/expokit/expokit">ExpoKit</a>.</li>\n<li><strong>Sử dụng Expo là chết dính với bộ toolset của nó</strong>. Một số đồ chơi sẽ không chạy được với Expo, trong trường hợp cần xài tới, phải <code class="language-text">eject</code> cái app ra khỏi Expo, mà khi đã <code class="language-text">eject</code> thì sẽ ko thể có <code class="language-text">inject</code> ngược lại.</li>\n<li><strong>Ứng dụng Expo chỉ build online</strong>. Expo cung cấp một công cụ command-line là <em>Exp</em>, cho phép việc build lên Expo Server, một khi hoàn tất, một URL để download <strong>.apk</strong> hoặc <strong>ipa</strong>, <a href="https://docs.expo.io/versions/latest/distribution/building-standalone-apps">Bài hướng dẫn</a></li>\n</ol>\n<p>Mặc dù nghe có vẻ khá hạn chế, nhưng thực sự Expo rất mạnh, rất nhiều thứ hỗ trợ sẵn cho Android và iOS. Có nghĩa là nếu app đang viết không có gì quá đặc biệt, quá "đỉnh của đỉnh" thì việc sử dụng Expo sẽ mang tới rất nhiều lợi ích.</p>\n<h2 id="app-sẽ-viết"><a href="#app-s%E1%BA%BD-vi%E1%BA%BFt" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>App sẽ viết</h2>\n<p>Làm cái game kiểu tìm cặp</p>\n<p><img src="https://cms-assets.tutsplus.com/uploads/users/1125/posts/30546/image/memory-game-default.png" alt="Giới thiệu Expo, nhập môn React Native"></p>\n<p>Và đây là mặt kia của thẻ</p>\n<p><img src="https://cms-assets.tutsplus.com/uploads/users/1125/posts/30546/image/memory-game-done.png" alt="Giới thiệu Expo, nhập môn React Native"></p>\n<p>Sau khi tìm ra được hết các cặp, user nhấn reset để chơi lại</p>\n<h2 id="cài-expo"><a href="#c%C3%A0i-expo" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Cài Expo</h2>\n<p>Không giống với việc viết React Native thuần, chúng ta phải cài và cấu hình Android Studio, Xcode và một số thứ linh tinh khác, tất cả những gì để bắt đầu với Expo là</p>\n<p><em>Dạo này nó có thêm cái service Snack để làm online khá ngon.</em></p>\n<ol>\n<li>Cài Node.js, viết React thì phải có rồi</li>\n<li>Cài Expo Client trên thiết bị iOS hoặc Android, cái này để preview app. Lên App Store, Google Play tải về</li>\n<li>Cài bộ CLI tool của Expo, để mà khởi chạy một dự án Expo mới, chạy build,... dễ lắm như sau</li>\n</ol>\n<div class="gatsby-highlight">\n      <pre class="language-shell"><code class="language-shell"><span class="token function">npm</span> <span class="token function">install</span> expo --global\n\n// init một project mới\nexpo init luckyluu-project\n<span class="token function">cd</span> luckyluu-project\nexpo start</code></pre>\n      </div>\n<h2 id="tạo-một-dự-án-expo-mới"><a href="#t%E1%BA%A1o-m%E1%BB%99t-d%E1%BB%B1-%C3%A1n-expo-m%E1%BB%9Bi" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Tạo một dự án Expo mới</h2>\n<p>Một khi hoàn tất 3 thứ công việc đơn giản trên, giờ chúng ta tạo một app mới</p>\n<div class="gatsby-highlight">\n      <pre class="language-shell"><code class="language-shell">exp init MemoryGame\n\n// trỏ vô thư mục mới tạo\n<span class="token function">cd</span> MemoryGame\n\n// Let ruuuuuuun\nexp start</code></pre>\n      </div>\n<p>Nếu sử dụng Expo XDE thì có thể tạo và chạy Expo app qua giao diện, <a href="https://github.com/expo/xde/releases" target="_blank" rel="noopener noreferrer">tải ở đây nè</a>. Sau khi chạy xong thì trên màn hình command-line sẽ có đoạn QR code</p>\n<p><img src="https://cms-assets.tutsplus.com/uploads/users/1125/posts/30546/image/run-dev-server.png" alt="Giới thiệu Expo, nhập môn React Native"></p>\n<p>Rút điện thoại ra, mở app Expo lên, quét đoạn QR code này và xong. Sẽ thấy màn hình mặc định của ứng dụng, mỗi lần bấm <code class="language-text">Ctrl + S</code> là nó sẽ tự động load lại.</p>\n<p>Với bạn nào đang xài Iphone, gần đây Expo phải xóa cái quét mã QR ra khỏi app vì bị Apple chửi bới, trên bộ công cụ debug mới (lúc chạy expo start nó sẽ mở lên trình duyệt), bạn chỉ cần chọn gửi link qua email</p>\n<h2 id="chạy-code-ví-dụ"><a href="#ch%E1%BA%A1y-code-v%C3%AD-d%E1%BB%A5" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Chạy code ví dụ</h2>\n<p>Toàn bộ code ví dụ có thể <a href="https://github.com/tutsplus/easier-react-native-development-with-expo" target="_blank" rel="noopener noreferrer">download ở đây</a>, bạn có thể down về chạy thử. Mình không phân tích toàn bộ code vì mình chỉ tập trung giới thiệu về Expo, mình mặc định các bạn đã biết React, React Native căn bản nhé.</p>\n<p><a href="https://code.tutsplus.com/tutorials/easier-react-native-development-with-expo--cms-30546" target="_blank" rel="noopener noreferrer">Wern Ancheta</a></p>',timeToRead:4,excerpt:"Expo là cái gì Hạn chế của Expo App sẽ viết Cài Expo Tạo một dự án Expo mới Chạy code ví dụ Expo là cái gì Expo là một framework để đẩy…",frontmatter:{title:"Giới thiệu Expo, nhập môn React Native",cover:"",date:"2018-04-16",category:null,tags:["javascript","react","react-native"],desc:"Để bắt đầu với React Native, cách nhanh nhất không cần cài Android Studio, Xcode có ngay môi trường để chạy test React Native thì Expo chính là cái bạn cần"},fields:{slug:"/2018-04-16-huong-dan-react-native-bat-dau-voi-expo"}}},pathContext:{slug:"/2018-04-16-huong-dan-react-native-bat-dau-voi-expo",prev:{frontmatter:{title:"Giải thích Observer Pattern trong javascript",desc:"Observer là một pattern khá phổ biến trong javascript, bài giải thích ngắn gọn về pattern này",type:"post",category:null,tags:["javascript","react"],date:"2018-04-17",cover:""},fields:{slug:"/2018-04-17-huong-dan-giai-thich-observer-pattern-trong-javascript"}},next:{frontmatter:{title:"Chém gió: Tại sao tui vẫn thích Firefox",desc:"Không biết bạn sinh ra từ thuở nào, nhưng tui là thế hệ 8x, thời điểm mà Firefox nổi lên - rồi chìm xuống",type:"post",category:null,tags:["ux-ui"],date:"2018-04-05",cover:""},fields:{slug:"/2018-04-05-huong-dan-tai-sao-tui-van-thich-firefox"}}}}}});
//# sourceMappingURL=path---2018-04-16-huong-dan-react-native-bat-dau-voi-expo-be8bddf581edbdea534b.js.map