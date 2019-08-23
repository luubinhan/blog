webpackJsonp([26744762085473],{1455:function(n,a){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#single-file-component">Single File Component</a></li>\n<li><a href="#s%e1%bb%ad-d%e1%bb%a5ng-vue-m%c3%a0-kh%c3%b4ng-build-kh%c3%b4ng-c%e1%ba%a7n-webpack-lu%c3%b4n">Sử dụng Vue mà không build, không cần webpack luôn</a></li>\n<li><a href="#t%c3%adch-h%e1%bb%a3p-v%e1%bb%9bi-c%c3%a1c-%e1%bb%a9ng-d%e1%bb%a5ng-server-side-%c4%91%c3%a3-c%c3%b3">Tích hợp với các ứng dụng server side đã có</a></li>\n<li><a href="#nh%e1%bb%afng-plugin-c%e1%ba%a7n-thi%e1%ba%bft-%c4%91%c6%b0%e1%bb%a3c-h%e1%bb%97-tr%e1%bb%a3-%c4%91%e1%ba%a7y-%c4%91%e1%bb%a7">Những plugin cần thiết, được hỗ trợ đầy đủ</a></li>\n<li><a href="#k%e1%ba%bft">Kết</a></li>\n</ul>\n<!-- /TOC -->\n<p>Khi thế giới frontend đang tôn thờ React như một <strong>chuẩn mực mới của lập trình frontend</strong>, có bao giờ bạn tự hỏi "vì React quá lợi hại tới mức không ai đánh bại nổi, hay vì Facebook biết cách quảng cáo bộ đồ chơi của mình trong cộng đồng lập trình viên?"</p>\n<p>Bị <em>ép buộc</em> xài Vue khoảng 8 tháng nay, từ khi anh lead phán câu "Anh không thích React, build feature lâu quá em", cũng có thể gọi là có chút ít kinh nghiệm xài qua Vue. Tổng kết lại những điểm mà cá nhân mình thấy thích khi sử dụng Vue, mọi người góp ý thêm nếu thấy còn thiếu</p>\n<h2 id="single-file-component"><a href="#single-file-component" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Single File Component</h2>\n<p>Mỗi component sẽ là 1 file duy nhất, tách 3 phần riêng biệt template HTML, javascript, css (build sẵn luôn SCSS, scoped cho từng component mới ngon chứ)</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>\n    <span class="token comment">&lt;!-- phần html --></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n    <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> phần javascript xử lý logic <span class="token operator">--</span><span class="token operator">></span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>scss<span class="token punctuation">"</span></span> <span class="token attr-name">scoped</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">\n    &lt;!-- phần css định dạng component →\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Cái cấu trúc 3 phần riêng biệt, đúng thứ tự 1-HTML, 2-SCRIPT, 3-STYLE mình thấy nó quá tuyệt vời, mở file component lên ai cũng biết mục đích của từng phần nó là để làm gì. Không rõ ai học ai, chỉ biết Web Component cũng dùng một cấu trúc tương tự như vậy.</p>\n<p>Một file React component sẽ như thế nào: <code class="language-text">state</code> nằm ở trên, kéo xuống dưới có render function, kéo ngược lên để tìm các function khác, các function ở trên đôi khi lại có render một ít HTML Việc đi <strong>lòng vòng</strong> để tìm đúng vị trí muốn chỉnh là không tránh khỏi.</p>\n<p>Khi làm việc trong html template, Vue cung cấp mấy cái gọi là directive <code class="language-text">v-for</code> và <code class="language-text">v-if</code>, không còn loay hoay nghĩ xem render một danh sách các component dạng mảng thế nào mới tốt, đặt ở trong hàm render hay đưa vào một hàm con ở trên?. Đọc code cũng dễ chịu, thử đọc một đoạn <code class="language-text">v-for</code> trong Vue với một hàm render kiểu <code class="language-text">arrays.map((item) =&gt; this.renderChild(item))</code> thì biết thằng nào trực quan hơn?</p>\n<p>Ngoài ra còn có thể kế đến <code class="language-text">computed</code>, <code class="language-text">watch</code>, <code class="language-text">scss</code>, <code class="language-text">slot</code>, <code class="language-text">slotScoped</code>, transition cũng được hỗ trợ sẵn trong Vue, bạn chẳng cần một thư viện nào khác với những animation đơn giản bằng CSS</p>\n<p>Nếu bạn đang dùng React, và nhét mọi thứ trong 1 file, bạn sẽ phải tìm tới một số thư viện bổ sung như <code class="language-text">styled-components</code>, <code class="language-text">node-sass</code></p>\n<h2 id="sử-dụng-vue-mà-không-build-không-cần-webpack-luôn"><a href="#s%E1%BB%AD-d%E1%BB%A5ng-vue-m%C3%A0-kh%C3%B4ng-build-kh%C3%B4ng-c%E1%BA%A7n-webpack-lu%C3%B4n" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Sử dụng Vue mà không build, không cần webpack luôn</h2>\n<p>Với một file html tĩnh, muốn dùng component với Vue</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    {{ message }}\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>https://cdn.jsdelivr.net/npm/vue<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    el<span class="token punctuation">:</span> <span class="token string">\'#app\'</span><span class="token punctuation">,</span>\n    data<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        message<span class="token punctuation">:</span> <span class="token string">\'Hello Vue!\'</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Bạn chỉ cần load bản build của Vue, một cái <code class="language-text">id</code> trên html và một file javascript là bạn vô tư bind dữ liệu phà phà.</p>\n<p>Một ứng dụng thấy liền là nếu bạn đang muốn làm một trang single page, chỉ binding một ít dữ liệu, kiếu mấy trang landing page để làm marketing, bạn xài luôn thế này, khỏi setup rườm rà</p>\n<p>Tất nhiên bạn cũng có thể dùng React theo cách tương tự như trên, nhưng không ai dùng React những trang như vậy, thường là phải setup một mớ cái boilerplate, vì React sinh ra cũng chẳng phải để giải quyết mấy trang kiểu như thế.</p>\n<h2 id="tích-hợp-với-các-ứng-dụng-server-side-đã-có"><a href="#t%C3%ADch-h%E1%BB%A3p-v%E1%BB%9Bi-c%C3%A1c-%E1%BB%A9ng-d%E1%BB%A5ng-server-side-%C4%91%C3%A3-c%C3%B3" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Tích hợp với các ứng dụng server side đã có</h2>\n<p>Trong <a href="https://shoptalkshow.com/episodes/350/">bài thuyết trình của Evan You</a>, tác giả có giải thích quyết định bỏ bước build như yêu cầu bắt buộc trong Vue. Nâng cấp các ứng dụng đã có sẵn là một trong những điều mà Vue muốn nhắm tới. Để nó có thể tích hợp, thay thế một phần trong các ứng dụng có sẵn bằng Vue.</p>\n<p>Hôm rồi mình có mò mẫm làm cái <a href="https://github.com/EvanAgee/vuejs-wordpress-theme-starter">theme wordpress bằng Vue</a> và REST API của Wordpress, mặc dù chưa tới đâu, nhưng khả năng là <strong>có thể</strong>, bạn có thể dùng bộ admin của wordpress, phần theme ở client dùng Vue.</p>\n<h2 id="những-plugin-cần-thiết-được-hỗ-trợ-đầy-đủ"><a href="#nh%E1%BB%AFng-plugin-c%E1%BA%A7n-thi%E1%BA%BFt-%C4%91%C6%B0%E1%BB%A3c-h%E1%BB%97-tr%E1%BB%A3-%C4%91%E1%BA%A7y-%C4%91%E1%BB%A7" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Những plugin cần thiết, được hỗ trợ đầy đủ</h2>\n<p>Với những vấn đề gặp hoài, gặp mãi khi làm app như State Management, Routing, Form validate, Vue giới thiệu luôn những plugin làm sẵn như <a href="https://vuex.vuejs.org/">Vuex</a>, <a href="https://router.vuejs.org/">Vue Router</a>, <a href="https://ssr.vuejs.org/#why-ssr">Vue.js Server-Side Rendering</a></p>\n<p>Sẽ có bạn la lên phản đối, rằng với React bạn được tự do lựa chọn thư viện bạn thích, nếu bạn thấy nó hợp gu với mình, mỗi thư viện có cái hay riêng bạn không nhất thiết gì phải buộc mình vào một thư viện làm routing nào cả, bạn sẽ nói React mạnh mẽ hơn Vue gấp nhiều lần - căn cứ vào đâu?. Cách tiếp cận này của Vue, giúp bạn tiết kiệm được không ít thời gian cho việc tìm kiếm, đánh giá các thư viện trên npm xem nó có phù hợp với mình không.</p>\n<p>Ví dụ cái middleware của Redux, nếu để lựa chọn giữa <code class="language-text">redux-thunk</code>, <code class="language-text">redux-saga</code>, <code class="language-text">redux-observable</code> bạn sẽ chọn cái nào? Lý do cho lựa chọn đó là gì? Với Vuex bạn không phải lo chuyện xài cái middleware nào cho lợi nhất.</p>\n<p>Những thư viện Vue <em>chuẩn cơm mẹ nấu</em> này, không đẩy hết trách nhiệm cho cộng đồng tự quản, nó còn để luôn, ngay trên trang chủ, tụi em cần <strong>nhà tài trợ</strong>, phải có cơm thì mới có người tiếp tục maintain và phát triển tiếp, thế giờ này cần tiền để vận hành, Vue cũng vậy thôi.</p>\n<h2 id="kết"><a href="#k%E1%BA%BFt" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Kết</h2>\n<p>React sẽ hợp với một số người, Vue sẽ hợp với một số người, Angular sẽ hợp với một số còn lại. Nếu 3 thằng này là 3 cái máy giặt, Angular là một cái máy giặt dành cho bệnh viện, xí nghiệp, React là một cái máy giặt Nhật với hàng tá nút bấm và lựa chọn, dù mục đích bạn là gì, luôn có cách điều chỉnh để React phù hợp với bạn, còn Vue như cái máy giặt gia đình với ngôn ngữ đã được Việt hóa, mua về thì cả ba, má dưới quê cũng xài được. Đó là cách mà 3 <strong>ông lớn</strong> đang thiết kế và nhắm tới.</p>\n<p>Mình còn non và xanh lắm, chổ nào nhìn nhận chưa đúng mong cao thủ chỉ thêm.</p>',timeToRead:6,excerpt:"Single File Component Sử dụng Vue mà không build, không cần webpack luôn Tích hợp với các ứng dụng server side đã có Những plugin cần thiết…",frontmatter:{title:"Tại sao các bạn nên học Vue",cover:"",date:"2019-08-16",category:null,tags:["vuejs"],desc:"Một vài suy nghĩ cá nhân của mình về mấy cái hay ho của Vue"},fields:{slug:"/2019-08-16-tai-sao-cac-ban-nen-hoc-vue"}}},pathContext:{slug:"/2019-08-16-tai-sao-cac-ban-nen-hoc-vue",prev:!1,next:{frontmatter:{title:"Principle của các sản phẩm nổi tiếng",desc:"Phù hợp cho các bạn thiết kế nào ko muốn làm code dạo, design dạo nữa, bạn muốn cái gì đó cao hơn ở tầng khái niệm",type:"post",category:null,tags:["ux-ui"],date:"2019-08-07",cover:""},fields:{slug:"/2019-08-07-nguyen-tac-chung-cua-thiet-ke"}}}}}});
//# sourceMappingURL=path---2019-08-16-tai-sao-cac-ban-nen-hoc-vue-0da3f359195116b009e7.js.map