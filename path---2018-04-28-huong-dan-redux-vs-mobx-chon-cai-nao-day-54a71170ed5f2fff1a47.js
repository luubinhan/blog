webpackJsonp([0x8eb517326fad],{1249:function(n,h){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li>\n<p><a href="#redux">Redux</a></p>\n<ul>\n<li><a href="#%C6%B0u">Ưu</a></li>\n<li><a href="#nh%C6%B0%E1%BB%A3c">Nhược</a></li>\n</ul>\n</li>\n<li>\n<p><a href="#mobx">MobX</a></p>\n<ul>\n<li><a href="#%C6%B0u-1">Ưu</a></li>\n<li><a href="#nh%C6%B0%E1%BB%A3c-1">Nhược</a></li>\n</ul>\n</li>\n<li><a href="#m%E1%BB%99t-v%C3%A0i-nh%E1%BA%ADn-%C4%91%E1%BB%8Bnh-t%E1%BB%AB-c%C3%A1c-%C4%91%E1%BB%93ng-m%C3%B4n">Một vài nhận định từ các đồng môn</a></li>\n</ul>\n<!-- /TOC -->\n<p>Nói một cách ngắn gọn: MobX dành project tầm 1 - 3 người làm, các app nhỏ. Redux dành cho tất cả những yêu cầu cao hơn.</p>\n<p>Nếu bạn chỉ quan tâm đến thể thì có thể ko cần đọc tiếp phần sau, còn nếu tò mó thì cứ đọc tiếp.</p>\n<h2 id="redux"><a href="#redux" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Redux</h2>\n<h3 id="Ưu"><a href="#%C6%AFu" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Ưu</h3>\n<ul>\n<li>Dễ test</li>\n<li>Có thể đoán được những state nào bị ảnh hương -> dễ debug</li>\n<li>Mở rộng tốt, phù hợp team bự</li>\n<li>Kiên định, data flow một chiều duy nhất</li>\n</ul>\n<h3 id="nhược"><a href="#nh%C6%B0%E1%BB%A3c" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Nhược</h3>\n<ul>\n<li>Quá cứng nhắc, chúng ta phải tuân thủ các pattern của nó, quá trình code sẽ mất nhiều thời gian hơn cho một chuyện hết sức đơn giản</li>\n<li>Học hơi khó khăn, cần nắm rõ kỹ thuật của Flux, thuần thục ES6, ES7 để sử dụng hiệu quả nhất.</li>\n</ul>\n<h2 id="mobx"><a href="#mobx" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>MobX</h2>\n<h3 id="Ưu-1"><a href="#%C6%AFu-1" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Ưu</h3>\n<ul>\n<li>Code nhanh, tự đọng bind dữ liệu 2 chiều luôn</li>\n<li>Không cần quan tâm đến Flux</li>\n<li>Linh động trong việc cho phép tự quản lý state</li>\n</ul>\n<h3 id="nhược-1"><a href="#nh%C6%B0%E1%BB%A3c-1" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Nhược</h3>\n<ul>\n<li>Khi team phình ra, dự án bự lên <strong>CHỈ</strong> có thể maintain nổi nếu từ đầu tổ chức tốt, ý là thằng code trước mà để lại sh*t thì coi như ăn cho hết</li>\n<li>Quá tự do cũng mệt, dễ dẫn đến chuyện viết theo kiểu hơi chuối, muốn thích viết sau viết mà</li>\n</ul>\n<h2 id="một-vài-nhận-định-từ-các-đồng-môn"><a href="#m%E1%BB%99t-v%C3%A0i-nh%E1%BA%ADn-%C4%91%E1%BB%8Bnh-t%E1%BB%AB-c%C3%A1c-%C4%91%E1%BB%93ng-m%C3%B4n" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Một vài nhận định từ các đồng môn</h2>\n<p>Phần lớn người nào học và sử dụng Redux điều cảm thấy, ôi trời ơi sao phải setup lắm thứ thế này, nào action, nào reducer, nào store, nào connect, dispatch. Có những bạn đã từng làm nhiều Angular thường xuyên phàn nàn chuyện rất ghét việc binding dữ liệu 2 chiều (đọc-ghi) trong Angular, với những dự án lớn việc này làm chuyện debug hết sức khó khăn khi có lỗi. Đó là lý do Flux được giới thiệu, rồi khi Redux được giới thiệu, cộng đồng js dev chuyển qua xài nó. Với những dự án nhỏ, sử dụng dao to búa lớn như Redux để giết kiến thì ko cần thiết, hãy cứ đơn giản <code class="language-text">setState</code> thôi.</p>\n<p>MobX là một sự lựa chọn khác, một option để quản lý state cho dự án nhỏ. Nó sang mang đến những lợi ích thấy rõ khi kick off các dự án không quá bự. Thực sự mình chưa xài MobX nhiều nên việc lợi ích thấy rõ thì mình mong bạn nào đã dùng nhiều chỉ giáo.</p>\n<p>DHTML -> JQuery -> Backbone vs. Knockout vs. Ember -> Meteor -> Angular vs React. Quá trình <em>thăng tiến</em> của front-end dev là thế. MobX là một công cụ tốt ở thời điểm hiện tại, hy vọng nó không như Knockout JS và các thư viện MVVM trước đây, mọi thứ mới bắt đầu vận hành mượt mà như một phép màu, 6-12 tháng sau, phép màu và tự do trở thành thảm họa cho những người dev kế thừa</p>\n<p>Tác Giả: Sooraj Chandran\nLink bài gốc: <a href="https://codeburst.io/mobx-vs-redux-with-react-a-noobs-comparison-and-questions-382ba340be09">https://codeburst.io/mobx-vs-redux-with-react-a-noobs-comparison-and-questions-382ba340be09</a></p>',timeToRead:3,excerpt:"Redux Ưu Nhược MobX Ưu Nhược Một vài nhận định từ các đồng môn Nói một cách ngắn gọn: MobX dành project tầm 1 - 3 người làm, các app nhỏ…",frontmatter:{title:"Redux vs Mobx chọn cái nào đây",cover:"",date:"2018-04-28",category:null,tags:["javascript","react"],desc:"Khi nhắc tới thư viện để quản lý state cho một app js, thì chúng sẽ hay rất phân vân giữa 2 lựa chọn Redux hay Mobx"},fields:{slug:"/2018-04-28-huong-dan-redux-vs-mobx-chon-cai-nao-day"}}},pathContext:{slug:"/2018-04-28-huong-dan-redux-vs-mobx-chon-cai-nao-day",prev:{frontmatter:{title:"Cải thiện performance của React App",desc:"Trong bài này, chúng ta cùng đi qua các bước để fix những issue liên quan đến performance thường thấy.",type:"post",category:null,tags:["javascript","react","performance"],date:"2018-05-01",cover:""},fields:{slug:"/2018-05-01-huong-dan-cai-thien-performance-react-app"}},next:{frontmatter:{title:"Google Maps và React",desc:"Hướng Sử dụng google maps api trong React",type:"post",category:null,tags:["javascript","react"],date:"2018-04-27",cover:""},fields:{slug:"/2018-04-27-huong-dan-google-maps-va-react"}}}}}});
//# sourceMappingURL=path---2018-04-28-huong-dan-redux-vs-mobx-chon-cai-nao-day-54a71170ed5f2fff1a47.js.map