webpackJsonp([0xe6774b7292f4],{1483:function(n,a){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#markdown---ng%C3%B4n-ng%E1%BB%AF-d%C3%A0nh-%C4%91%E1%BB%83-so%E1%BA%A1n-th%E1%BA%A3o-tr%C3%AAn-web">Markdown - Ngôn ngữ dành để soạn thảo trên web</a></li>\n<li><a href="#t%E1%BA%A1i-sao-b%E1%BA%A1n-n%C3%AAn-t%C3%ACm-hi%E1%BB%83u-v%C3%A0-s%E1%BB%AD-d%E1%BB%A5ng-markdown">Tại sao bạn nên tìm hiểu và sử dụng markdown</a></li>\n<li><a href="#c%C3%A1ch-vi%E1%BA%BFt-c%C3%B3-%C4%91%E1%BB%8Bnh-d%E1%BA%A1ng">Cách viết có định dạng</a></li>\n<li><a href="#s%E1%BB%AD-d%E1%BB%A5ng-markdown-v%E1%BB%9Bi-gmail">Sử dụng Markdown với gmail</a></li>\n</ul>\n<!-- /TOC -->\n<h1 id="markdown---ngôn-ngữ-dành-để-soạn-thảo-trên-web"><a href="#markdown---ng%C3%B4n-ng%E1%BB%AF-d%C3%A0nh-%C4%91%E1%BB%83-so%E1%BA%A1n-th%E1%BA%A3o-tr%C3%AAn-web" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Markdown - Ngôn ngữ dành để soạn thảo trên web</h1>\n<p>Markdown không phải là ngôn ngữ mới được giới thiệu để thay thế ngôn ngữ hiển thị văn bản trên web hiện tại - HTML, là ngôn ngữ được phát triển với mục đích dễ viết, dễ học và dễ đọc cho những người không muốn học các tag html hoặc viết các tag html rối mắt, những vẫn đáp ứng được một định dạng văn bản "chuẩn web". Nói cách khác, Markdown là một công cụ chuyển đổi file text thông thường sang HTML.</p>\n<p>Nói Markdown không phải là ngôn ngữ mới bởi nó đã được phát triển từ tháng 5, 2004, bởi John Gruber và Aaron Swartz, nhưng chưa được nhiều ở Việt Nam biết đến, với những người thường xuyên làm việc với văn bản trên web, sử dụng bộ text editor (WYSIWYG) để hỗ trợ định dạng văn bản vẫn được xem là cách dễ dàng và nhanh nhất. Với cộng đồng người dùng trên Github, StackOverflow, Markdown là ngôn ngữ chính thống để viết lách</p>\n<h1 id="tại-sao-bạn-nên-tìm-hiểu-và-sử-dụng-markdown"><a href="#t%E1%BA%A1i-sao-b%E1%BA%A1n-n%C3%AAn-t%C3%ACm-hi%E1%BB%83u-v%C3%A0-s%E1%BB%AD-d%E1%BB%A5ng-markdown" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Tại sao bạn nên tìm hiểu và sử dụng markdown</h1>\n<p>Mục tiêu lớn nhất mà markdown ra đời là làm đơn giản và dễ đọc nhất có thể, để một người không quen với các thẻ <code class="language-text">html</code> vẫn có thể hiểu được và viết được một văn bản chỉnh chu trên web.</p>\n<p>Ví dụ đây là html</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Tại sao <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>em</span><span class="token punctuation">></span></span>bạn nên sử dụng markdown<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>em</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>http://www.anluu.com<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Markdown<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span> cực kỳ dễ hiểu, nó sẽ làm <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>em</span><span class="token punctuation">></span></span>việc soạn thảo một văn bản trên web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>em</span><span class="token punctuation">></span></span> không quá phức tạp như bạn nghĩ. <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>strong</span><span class="token punctuation">></span></span>Cam đoan.<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>strong</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Còn đây là markdown</p>\n<div class="gatsby-highlight">\n      <pre class="language-markdown"><code class="language-markdown"><span class="token title important"><span class="token punctuation">#</span> Tại sao *bạn nên sử dụng markdown*</span>\n<span class="token url">[<span class="token content">Markdown</span>](http://www.anluu.com)</span> cực kỳ dễ hiểu, nó sẽ làm <span class="token italic"><span class="token punctuation">*</span><span class="token content">việc soạn thảo một văn bản trên web </span><span class="token punctuation">*</span></span>\n không quá phức tạp như bạn nghĩ. <span class="token bold"><span class="token punctuation">**</span><span class="token content">Cam đoan.</span><span class="token punctuation">**</span></span></code></pre>\n      </div>\n<h1 id="cách-viết-có-định-dạng"><a href="#c%C3%A1ch-vi%E1%BA%BFt-c%C3%B3-%C4%91%E1%BB%8Bnh-d%E1%BA%A1ng" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Cách viết có định dạng</h1>\n<p>Định dạng cho Heading</p>\n<div class="gatsby-highlight">\n      <pre class="language-markdown"><code class="language-markdown"><span class="token title important"><span class="token punctuation">#</span> Tiêu đề cấp 1</span>\n<span class="token title important"><span class="token punctuation">##</span> Tiêu đề cấp 2</span>\n<span class="token title important"><span class="token punctuation">###</span> Tiêu đề cấp 3</span>\n<span class="token title important"><span class="token punctuation">####</span> Tiêu đề cấp 4</span>\n<span class="token title important"><span class="token punctuation">#####</span> Tiêu đề cấp 5</span>\n<span class="token title important"><span class="token punctuation">######</span> Tiêu đề cấp 6</span></code></pre>\n      </div>\n<p>Blockquote</p>\n<div class="gatsby-highlight">\n      <pre class="language-markdown"><code class="language-markdown"><span class="token blockquote punctuation">></span> Nội dung trích dẫn</code></pre>\n      </div>\n<p>Image</p>\n<div class="gatsby-highlight">\n      <pre class="language-markdown"><code class="language-markdown"><span class="token url">![<span class="token content">Mô tả cho hình</span>](http://www.anluu.com/hinh.jpg)</span></code></pre>\n      </div>\n<p>Link</p>\n<div class="gatsby-highlight">\n      <pre class="language-markdown"><code class="language-markdown"><span class="token url">[<span class="token content">Liên kết</span>](http://www.anluu.com)</span></code></pre>\n      </div>\n<p>Danh sách</p>\n<div class="gatsby-highlight">\n      <pre class="language-markdown"><code class="language-markdown"><span class="token list punctuation">*</span> Node\n    <span class="token list punctuation">*</span> Child node\n    <span class="token list punctuation">*</span> Child node 2\n<span class="token list punctuation">*</span> Node 2 \n<span class="token list punctuation">*</span> Node 3</code></pre>\n      </div>\n<p>Hoặc</p>\n<div class="gatsby-highlight">\n      <pre class="language-markdown"><code class="language-markdown"><span class="token list punctuation">*</span> Node\n    <span class="token list punctuation">*</span> Child node\n    <span class="token list punctuation">*</span> Child node 2\n<span class="token list punctuation">*</span> Node 2 \n<span class="token list punctuation">*</span> Node 3</code></pre>\n      </div>\n<h1 id="sử-dụng-markdown-với-gmail"><a href="#s%E1%BB%AD-d%E1%BB%A5ng-markdown-v%E1%BB%9Bi-gmail" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Sử dụng Markdown với gmail</h1>\n<p>Để viết email sử dụng markdown bằng Google Chrome, Firefox, Thunderbird, bạn cần tải thêm extension tại địa chỉ</p>\n<ul>\n<li><a href="https://chrome.google.com/webstore/detail/elifhakcjgalahccnjkneoccemfahfoa">Bản dùng cho Chrome</a></li>\n<li><a href="https://addons.mozilla.org/en-US/firefox/addon/markdown-here/">Bản dùng cho Firefox, Thunderbird, Postbox</a></li>\n</ul>\n<p>Sau khi cài đặt thành công, biểu tượng Markdown sẽ hiển thị trên thanh toolbar</p>\n<p>Các ứng dụng, web đã test và sử dụng tốt</p>\n<ul>\n<li>Gmail</li>\n<li>Thunderbird</li>\n<li>Hotmail</li>\n<li>Wordpress</li>\n<li>Tumblr</li>\n<li>Evernote (Web)</li>\n</ul>',timeToRead:4,excerpt:"Markdown - Ngôn ngữ dành để soạn thảo trên web Tại sao bạn nên tìm hiểu và sử dụng markdown Cách viết có định dạng Sử dụng Markdown với…",frontmatter:{title:"Giới thiệu Markdown",cover:"",date:"2018-11-03",category:null,tags:["css"],desc:"Markdown vở lòng cho bạn nào chưa biết"},fields:{slug:"/2018-11-03-gioi-thieu-markdown"}}},pathContext:{slug:"/2018-11-03-gioi-thieu-markdown",prev:{frontmatter:{title:"Giới thiệu React.memo",desc:"Api mới của React 16.6",type:"post",category:null,tags:["react"],date:"2018-11-04",cover:""},fields:{slug:"/2018-11-04-gioi-thieu-react-memo-moi-trong-react-16"}},next:{frontmatter:{title:"Validate form với HTML5",desc:"Bài này nằm trong loạt bài chuẩn kiến thức để đi thi web mobile specialist của google. Một số cách validate bằng HTML, sử dụng API kết hợp với javascript để custom lại theo ý muốn",type:"post",category:null,tags:["mobile-web-specialist"],date:"2018-11-02",cover:""},fields:{slug:"/2018-11-02-validate-form-voi-html-5"}}}}}});
//# sourceMappingURL=path---2018-11-03-gioi-thieu-markdown-5af48af4a9edbfe49723.js.map