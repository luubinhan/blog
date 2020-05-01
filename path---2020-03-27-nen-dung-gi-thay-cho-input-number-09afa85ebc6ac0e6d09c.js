webpackJsonp([0xf4e0adab9ff5],{1629:function(n,a){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#tel">tel</a></li>\n<li><a href="#decimal">decimal</a></li>\n<li><a href="#email">Email</a></li>\n<li><a href="#url">Url</a></li>\n<li><a href="#search">Search</a></li>\n</ul>\n<!-- /TOC -->\n<p>Có thể bạn sẽ nghĩ ngay đến <code class="language-text">&lt;input type=&#39;number&#39; /&gt;</code> khi muốn cho user nhập số. Tuy nhiên <em>đời không như là mơ</em>, nó có kha khá vấn đề, đôi khi có những giá trị nhìn thì như <em>số</em>, nhưng không phải (như credit card), hoặc một dạng chuỗi số.</p>\n<p>Trên Gov.uk họ dùng kiểu này</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">inputmode</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>numeric<span class="token punctuation">"</span></span> <span class="token attr-name">pattern</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>[0-9]*<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></code></pre>\n      </div>\n<p>Thuộc tính <code class="language-text">inputmode</code> cũng khá hay ho, được đề cập rất cũ thể <a href="https://css-tricks.com/everything-you-ever-wanted-to-know-about-inputmode/">ở đây</a></p>\n<p>Tóm tắt lại cho bạn nào lười đọc</p>\n<h3 id="tel"><a href="#tel" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>tel</h3>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">inputmode</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>tel<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></code></pre>\n      </div>\n<h3 id="decimal"><a href="#decimal" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>decimal</h3>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">inputmode</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>decimal<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></code></pre>\n      </div>\n<p><img src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/05/inputmode-03.png?ssl=1"></p>\n<h3 id="email"><a href="#email" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Email</h3>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">inputmode</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>email<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></code></pre>\n      </div>\n<p><img src="https://i1.wp.com/css-tricks.com/wp-content/uploads/2019/05/inputmode-04.png?ssl=1"></p>\n<h3 id="url"><a href="#url" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Url</h3>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">inputmode</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>url<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></code></pre>\n      </div>\n<p><img src="https://i1.wp.com/css-tricks.com/wp-content/uploads/2019/05/inputmode-05.png?ssl=1"></p>\n<h3 id="search"><a href="#search" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Search</h3>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">inputmode</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>search<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></code></pre>\n      </div>\n<p><img src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/05/inputmode-06a.png?ssl=1"></p>\n<p>Hoặc để nhập vào mã code xác thực, Twilio sử dụng định dạng này</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span>\n  <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span>\n  <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>token<span class="token punctuation">"</span></span>\n  <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>token<span class="token punctuation">"</span></span>\n  <span class="token attr-name">inputmode</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>numeric<span class="token punctuation">"</span></span>\n  <span class="token attr-name">pattern</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>[0-9]*<span class="token punctuation">"</span></span>\n  <span class="token attr-name">autocomplete</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>one-time-code<span class="token punctuation">"</span></span>\n<span class="token punctuation">/></span></span></code></pre>\n      </div>\n<p>Với <code class="language-text">autocomplete=&quot;one-time-code&quot;</code> chúng ta sẽ có được <em>tính năng</em> tự điền như thế này</p>\n<p><img src="https://i1.wp.com/css-tricks.com/wp-content/uploads/2020/03/two-factor-input.png" alt="iOS screen with a numeric input and a text message offering to auto-fill the two-factor auth"></p>\n<p><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#Values">Xem danh sách autocomplete đầy đủ</a></p>\n<p><a href="https://css-tricks.com/what-to-use-instead-of-number-inputs/">What to Use Instead of Number Inputs</a></p>',timeToRead:1,excerpt:"tel decimal Email Url Search Có thể bạn sẽ nghĩ ngay đến   khi muốn cho user nhập số. Tuy nhiên  đời không như là mơ , nó có kha khá vấn đề…",frontmatter:{title:"Nên dùng gì thay cho input number",cover:"",date:"2020-03-27",category:null,tags:["css","thu-thuat"],desc:"Ngoài input type number, còn những giá trị gì bạn nên cân nhắc sử dụng"},fields:{slug:"/2020-03-27-nen-dung-gi-thay-cho-input-number"}}},pathContext:{slug:"/2020-03-27-nen-dung-gi-thay-cho-input-number",prev:!1,next:{frontmatter:{title:"useEffect từ a tới z",desc:"Đây là một bài viết tương đối dài dòng về useEffect, bạn cần biết và đã đọc qua tài liệu về useEffect trên trang chính thức của React trước, và nếu chỉ thực sự cần biết sử dụng useEffect ra sao, bạn không cần đọc bài viết phân tách mổ xẻ sâu kiểu này.",type:"post",category:null,tags:["react","hoc-thuat"],date:"2020-03-23",cover:""},fields:{slug:"/2020-03-23-tat-tan-tat-huong-dan-ve-use-effect"}}}}}});
//# sourceMappingURL=path---2020-03-27-nen-dung-gi-thay-cho-input-number-09afa85ebc6ac0e6d09c.js.map