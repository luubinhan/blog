webpackJsonp([0xa5eac2ebb1e],{1253:function(n,a){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#css-modules-l%C3%A0-g%C3%AC">CSS modules là gì</a></li>\n<li><a href="#x%C3%B3a-style-%C4%91%E1%BA%A7y-t%E1%BB%B1-tin">Xóa style đầy tự tin</a></li>\n<li><a href="#m%E1%BB%99t-v%C3%A0i-l%E1%BB%B1a-ch%E1%BB%8Dn-n%C3%A2ng-cao">Một vài lựa chọn nâng cao</a></li>\n</ul>\n<!-- /TOC -->\n<h2 id="css-modules-là-gì"><a href="#css-modules-l%C3%A0-g%C3%AC" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>CSS modules là gì</h2>\n<p>Dựa vào cái tên chắc phần nào cũng đoán được, nó là kiểu viết module hóa stylesheet thành từng file nhỏ, không còn sử dụng một file stylesheet tập trung nữa. Thêm vào đó, tất cả tên class lúc này sẽ được scope lại local, có thế viết bằng vanilla CSS hay SCSS (lựa chọn hàng đầu của các frontend chất).</p>\n<p>file Button.scss</p>\n<div class="gatsby-highlight">\n      <pre class="language-scss"><code class="language-scss"><span class="token selector">.button </span><span class="token punctuation">{</span>\n    <span class="token property">padding</span><span class="token punctuation">:</span> 8px<span class="token punctuation">;</span>\n    <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>file Button.js</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> styles <span class="token keyword">from</span> <span class="token string">\'./Button.scss\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">Button</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">className</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>styles<span class="token punctuation">.</span>button<span class="token punctuation">}</span></span><span class="token punctuation">></span></span>An Luu Blog<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Với cách viết này, class <code class="language-text">.button</code> lúc trả về sẽ là <code class="language-text">button-[hash string ở đây]</code>, nên sẽ không sợ bị trùng tên, chắc chắn không gây side effect lên các component khác vì chả bao giờ trung tên đâu.</p>\n<p>Một lợi ích khác là khi viết ta có thể viết <code class="language-text">.my-class-name</code> kiểu kebab case, nhưng khi viết js chúng ta có lại thích transform thành <code class="language-text">styles.myClassName</code> theo kiểu camel case.</p>\n<p>CSS module thoạt thì thấy không có chi đặc biệt, đơn giản chỉ là thế thôi, nhưng lợi ích của việc này là giúp chúng ta rất dễ maintain stylesheet vì nó buộc khi chúng ta viết css phải đơn giản nhất có thể.</p>\n<h2 id="xóa-style-đầy-tự-tin"><a href="#x%C3%B3a-style-%C4%91%E1%BA%A7y-t%E1%BB%B1-tin" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Xóa style đầy tự tin</h2>\n<p>Thích nhất là viết feature mới và đập bỏ cái code chuối cả nãy hồi xưa. Phần khó nhất là gì? Làm sao biết được xóa cái style cũ này đi có bị gì không? Lỡ đâu đang xài đâu đó.</p>\n<p>Ở cái <code class="language-text">Button</code> ví dụ trên, phần stylesheet và component gần như là gắn chặt vào nhau như hình với bóng, mối quan hệ một-một giữa component và style sheet đó là một quy ước cho một component được viết tốt, file style sheet đó chỉ phục vụ cho đúng component đó, nếu mà lỡ xóa file stylesheet hoặc class nào mà đang sử dụng, chắc chắn quá trình build sẽ báo ngay lỗi cho chúng ta biết lỡ xóa phần nào.</p>\n<h2 id="một-vài-lựa-chọn-nâng-cao"><a href="#m%E1%BB%99t-v%C3%A0i-l%E1%BB%B1a-ch%E1%BB%8Dn-n%C3%A2ng-cao" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Một vài lựa chọn nâng cao</h2>\n<p>Những thư viện CSS-trong-JS nâng cao như styled-components hay emotion cũng được nhiều front-end chất xài, cung cấp nhiều tính năng tân tiến hơn, nếu không ngại học thêm và tìm hiểu cách hoạt động thì cũng là lựa chọn không đến nổi.</p>\n<p>Với kiểu viết CSS Module với Vanilla CSS hay SCSS đã được tín nhiệm từ nhiều năm qua, bên cạnh đó thì SCSS còn có biến nè, kiểu viết nesting rất tiện lợi nè,... thì thật ra chỉ sử dụng SCSS thôi cũng đã là đủ</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">import</span> styles <span class="token keyword">from</span> <span class="token string">\'./App.scss\'</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>styles<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>log ra xem có cái mợ gì</p>\n<p><img src="https://cdn-images-1.medium.com/max/800/1*o9VrQ1idA8SqwJ_o6TL9Hg.png"></p>\n<p>Bài dịch của tác giả: Spencer Miskoviak</p>\n<p><a href="https://medium.com/@skovy/writing-maintainable-styles-and-components-with-css-modules-308a9216a6c2">Link bài gốc</a></p>\n<p><a href="https://medium.com/@kswanie21/css-modules-sass-in-create-react-app-37c3152de9">https://medium.com/@kswanie21/css-modules-sass-in-create-react-app-37c3152de9</a></p>',timeToRead:3,excerpt:"CSS modules là gì Xóa style đầy tự tin Một vài lựa chọn nâng cao CSS modules là gì Dựa vào cái tên chắc phần nào cũng đoán được, nó là kiểu…",frontmatter:{title:"Làm việc với CSS Modules trong React",cover:"",date:"2018-06-15",category:"react",tags:["react","javascript"],desc:"Sau rất nhiều năm kiếm cơm với CSS, và hiện tại vẫn thế, CSS vẫn luôn là niềm hứng thú của cá nhân mình. Ngày nảy ngày nay để làm việc với Component của React, chúng ta sẽ có nhiều lựa chọn hơn khi 'CSS trong JS' đang là lựa chọn hàng đầu. Trong thời đại của component phủ sóng khắp các mặt trận, CSS Modules hứa hiện là món ngon"},fields:{slug:"/2018-06-15-huong-dan-lam-viec-voi-css-module"}}},pathContext:{slug:"/2018-06-15-huong-dan-lam-viec-voi-css-module",prev:{frontmatter:{title:"Sử dụng Middleware với Redux dành cho người mới bắt đầu",desc:"Nếu đã nắm rõ redux, bước tiếp theo phải tìm hiểu là middleware",type:"post",category:"react",tags:["react","redux","javascript","middleware"],date:"2018-06-18",cover:""},fields:{slug:"/2018-06-18-huong-dan-tim-hieu-middleware-va-redux"}},next:{frontmatter:{title:"Kinh nghiệm tổ chức file và thư mục React project",desc:"Có bao giờ cảm thấy lạc lối trong đóng code ngày càng lúc bự ra, một vài tip từ người có kinh nghiệm",type:"post",category:"react",tags:["react"],date:"2018-06-08",cover:""},fields:{slug:"/2018-06-08-huong-dan-kinh-nghiem-lam-viec-voi-du-an-lon"}}}}}});
//# sourceMappingURL=path---2018-06-15-huong-dan-lam-viec-voi-css-module-ed9d41f2ae36309dc5e9.js.map