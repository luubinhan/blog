webpackJsonp([0x9b33de12ed93],{1581:function(n,a){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#jwt-l%c3%a0-g%c3%ac">JWT là gì</a></li>\n<li><a href="#c%c6%a1-ch%e1%ba%bf-c%e1%bb%a7a-jwt">Cơ chế của JWT</a></li>\n</ul>\n<!-- /TOC -->\n<p>Trước khi đọc bài này, các bạn hãy đọc bài <a href="/2019-10-01-giai-thich-authentication-bang-token">Ví dụ thực tế để hiểu rõ hơn cách authentication bằng token</a>, để hiểu được cơ chế authentication bằng token, tiếng Việt mình có thể dịch ra là Xác thực tài khoản bằng một string đặc biệt (token là một dạng string được tạo ra theo một cơ chế đặc biệt <em>bí hiểm</em>)</p>\n<h2 id="jwt-là-gì"><a href="#jwt-l%C3%A0-g%C3%AC" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>JWT là gì</h2>\n<blockquote>\n<p>TOKEN = một dạng string được tạo ra theo một cơ chế</p>\n</blockquote>\n<p>JWT chính là tên 1 cơ chế để tạo ra token (tức, có nhiều cơ chế khác nữa không chỉ riêng JWT)</p>\n<p>JWT viết tắt của JSON Web Token</p>\n<p>Cái cơ chế JWT này, nó đã nhét cái gì vào trong string, mời bạn đọc tiếp là rõ</p>\n<h2 id="cơ-chế-của-jwt"><a href="#c%C6%A1-ch%E1%BA%BF-c%E1%BB%A7a-jwt" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Cơ chế của JWT</h2>\n<p>Một request sử dụng JWT sẽ gửi kèm trong header</p>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code class="language-json">Authorization<span class="token operator">:</span> Bearer eyJhbGciOiJIUzI<span class="token number">1</span>NiIsInR<span class="token number">5</span>cCI<span class="token number">6</span>IkpXVCJ<span class="token number">9.</span>eyJzdWIiOiIxMjM<span class="token number">0</span>NTY<span class="token number">3</span>ODkwIiwibmFtZSI<span class="token number">6</span>IkpvaG<span class="token number">4</span>gRG<span class="token number">9</span>lIiwiaWF<span class="token number">0</span>IjoxNTE<span class="token number">2</span>MjM<span class="token number">5</span>MDIyfQ.XbPfbIHMI<span class="token number">6</span>arZ<span class="token number">3</span>Y<span class="token number">922</span>BhjWgQzWXcXNrz<span class="token number">0</span>ogtVhfEd<span class="token number">2</span>o</code></pre>\n      </div>\n<p>Không cần quan tâm cái <strong>Bearer</strong>, nó là quy định thôi, cái cần quan tâm là đoạn hầm bà lằng phía sau nó</p>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code class="language-json">eyJhbGciOiJIUzI<span class="token number">1</span>NiIsInR<span class="token number">5</span>cCI<span class="token number">6</span>IkpXVCJ<span class="token number">9.</span>eyJzdWIiOiIxMjM<span class="token number">0</span>NTY<span class="token number">3</span>ODkwIiwibmFtZSI<span class="token number">6</span>IkpvaG<span class="token number">4</span>gRG<span class="token number">9</span>lIiwiaWF<span class="token number">0</span>IjoxNTE<span class="token number">2</span>MjM<span class="token number">5</span>MDIyfQ.XbPfbIHMI<span class="token number">6</span>arZ<span class="token number">3</span>Y<span class="token number">922</span>BhjWgQzWXcXNrz<span class="token number">0</span>ogtVhfEd<span class="token number">2</span>o</code></pre>\n      </div>\n<p>Dòm kỹ một tí bạn sẽ thấy nó có 2 dấu <code class="language-text">.</code>, tách cái string này ra làm 3 phần <code class="language-text">header.payload.signature</code></p>\n<ul>\n<li><strong>Header</strong>: chứa kiểu dữ liệu, thuật toán mã hóa chữ ký</li>\n<li><strong>Payload</strong>: một số thông tin như thời gian expire, thông tin user,... tùy thuộc server muốn đưa về cái gì.</li>\n<li><strong>Signature</strong>: chữ ký điện tử, chứa thông tin để server có thể verify cái JWT này</li>\n</ul>\n<p>Chữ ký sẽ được tạo ra ở server, có thể là như thế này (có nhiều cách khác)</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> signature <span class="token operator">=</span> <span class="token function">RS256Algorithm</span><span class="token punctuation">(</span><span class="token function">encode64</span><span class="token punctuation">(</span>header<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"."</span> <span class="token operator">+</span> <span class="token function">encode64</span><span class="token punctuation">(</span>payload<span class="token punctuation">)</span> <span class="token punctuation">,</span> secret<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// secret là một chìa khóa (như password ấy mà) chỉ có server mới biết</span></code></pre>\n      </div>\n<p>Còn cái JWT sẽ được cấp bằng thuật toán cao siêu nhất vũ trụ <strong>nối chuỗi</strong></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> jwt <span class="token operator">=</span> <span class="token function">encode64</span><span class="token punctuation">(</span>header<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"."</span> <span class="token operator">+</span> <span class="token function">encode64</span><span class="token punctuation">(</span>payload<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"."</span> <span class="token operator">+</span> signature<span class="token punctuation">;</span></code></pre>\n      </div>\n<p><img src="https://blog.hasura.io/content/images/2019/08/Group.png" alt="Authentication bằng Token - Bài 2: Giới thiệu JWT"></p>\n<p>Đọc tiếp</p>\n<ul>\n<li><a href="/2019-10-01-giai-thich-authentication-bang-token">Authentication bằng Token - Bài 1: cơ chế authentication bằng token</a></li>\n<li><a href="/2019-10-02-giai-thich-jwt-la-gi">Authentication bằng Token - Bài 2: Giới thiệu JWT</a></li>\n<li>[Authentication bằng Token - Bài 3: Hướng dẫn authentication với React]</li>\n<li><a href="/2018-11-18-mot-so-van-de-can-quan-tam-de-bao-mat-web">Bảo mật web - Một số kiểu tấn công</a></li>\n</ul>',timeToRead:3,excerpt:"JWT là gì Cơ chế của JWT Trước khi đọc bài này, các bạn hãy đọc bài  Ví dụ thực tế để hiểu rõ hơn cách authentication bằng token , để hiểu…",frontmatter:{title:"Authentication bằng Token - Bài 2: Giới thiệu JWT",cover:"",date:"2019-10-02",category:null,tags:["hoc-thuat"],desc:"Phần mềm ngày nay được phát triển theo hướng sử dụng token để làm authentication, để có thể tách chức năng này ra như một phần độc lập, cho phép phần mềm có thể scale ở mức cao nhất"},fields:{slug:"/2019-10-02-giai-thich-jwt-la-gi"}}},pathContext:{slug:"/2019-10-02-giai-thich-jwt-la-gi",prev:{frontmatter:{title:"Bộ guide để viết code sạch dành riêng cho Vue",desc:"Được đề xuất chính thức bởi Vue team",type:"post",category:null,tags:["vuejs"],date:"2019-10-04",cover:""},fields:{slug:"/2019-10-04-huong-dan-viet-code-vue-chuan"}},next:{frontmatter:{title:"Authentication bằng Token - Bài 1: Cơ chế authentication bằng token",desc:"Phần mềm ngày nay được phát triển theo hướng sử dụng token để làm authentication, để có thể tách chức năng này ra như một phần độc lập, cho phép phần mềm có thể scale ở mức cao nhất",type:"post",category:null,tags:["hoc-thuat"],date:"2019-10-01",cover:""},fields:{slug:"/2019-10-01-giai-thich-authentication-bang-token"}}}}}});
//# sourceMappingURL=path---2019-10-02-giai-thich-jwt-la-gi-6ad9ab94b95451fffaac.js.map