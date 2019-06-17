webpackJsonp([68531798662674],{1347:function(n,s){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#s%E1%BB%B1-kh%C3%A1c-nhau-gi%E1%BB%AFa-cookie---localstorage---sessionstorage">Sự khác nhau giữa cookie - localStorage - sessionStorage</a></li>\n<li><a href="#json-web-token">JSON Web Token</a></li>\n<li><a href="#gi%E1%BA%A3i-ph%C3%A1p-%C4%91%E1%BB%83-s%E1%BB%AD-d%E1%BB%A5ng-jwt-an-to%C3%A0n">Giải pháp để sử dụng JWT an toàn?</a></li>\n<li><a href="#m%E1%BB%99t-s%E1%BB%91-c%C3%A2n-nh%E1%BA%AFc-khi-s%E1%BB%AD-d%E1%BB%A5ng-cookie">Một số cân nhắc khi sử dụng cookie</a></li>\n</ul>\n<!-- /TOC -->\n<h1 id="sự-khác-nhau-giữa-cookie---localstorage---sessionstorage"><a href="#s%E1%BB%B1-kh%C3%A1c-nhau-gi%E1%BB%AFa-cookie---localstorage---sessionstorage" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Sự khác nhau giữa cookie - localStorage - sessionStorage</h1>\n<p>Trước hết, cùng phân biệt sự khác nhau giữa <code class="language-text">cookie</code>, <code class="language-text">localStorage</code>, <code class="language-text">sessionStorage</code></p>\n<p>Cả 3 thằng điều là để lưu lại một ít thông tin trên trình duyệt để sử dụng sau này.</p>\n<p><img src="https://codepen.io/beaucarnes/pen/KmeRMx/image/large.png"></p>\n<p>Khác biệt lớn nhất giữa 3 thằng là <em>nơi</em> chúng được lưu và việc có được gửi đi cùng request không.</p>\n<p>Nếu đảm bảo được trình duyệt truy cập trang web, ứng dụng web hỗ trợ <code class="language-text">localStorage</code> và <code class="language-text">sessionStorage</code> thì gần như ai cũng thích xài 2 thằng <code class="language-text">localStorage</code> và <code class="language-text">sessionStorage</code> hơn.</p>\n<p>Video giải thích\n<a href="https://www.youtube.com/watch?v=AwicscsvGLg">https://www.youtube.com/watch?v=AwicscsvGLg</a></p>\n<h1 id="json-web-token"><a href="#json-web-token" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>JSON Web Token</h1>\n<p>JSON Web token là một string có 3 phần được phân cách bằng dấu <strong>.</strong>, ví dụ <code class="language-text">header.payload.signature</code></p>\n<p>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.\neyJpc3MiOiJ0b3B0YWwuY29tIiw.\nyRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw</p>\n<p>Đây là chuỗi đã mã hóa</p>\n<p><img src="https://techmaster.vn/fileman/Uploads/users/2504/toptal-blog-image-1426676395222.jpeg"></p>\n<ul>\n<li><strong>Header</strong>: chứa kiểu dữ liệu, thuật toán mã hóa signature</li>\n<li><strong>Payload</strong>: một số thông tin như thời gian expire, thông tin user,... tùy thuộc server muốn đưa về cái gì.</li>\n<li><strong>Signature</strong> chứa thông tin để server có thể verify cái JWT này</li>\n</ul>\n<p>Signature được tạo ra bằng cách sau ở phía server</p>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">var signature = RS256Algorithm(encode64(header) + &quot;.&quot; + encode64(payload) , secret);</code></pre>\n      </div>\n<p>Còn cái JWT sẽ được tạo bằng</p>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">var jwt = encode64(header) + &quot;.&quot; + encode64(payload) + &quot;.&quot; + signature;</code></pre>\n      </div>\n<p>Về phía client để sử dụng JWT này, chèn vào header của request</p>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">Authorization: Bearer DoanJSONWebToken</code></pre>\n      </div>\n<p>Có thể thấy là việc tạo ra một token giả là vô cùng khó, vì có được cái signature khớp với phía server ko dễ, cái <code class="language-text">secret</code> chỉ có server biết.</p>\n<h1 id="giải-pháp-để-sử-dụng-jwt-an-toàn"><a href="#gi%E1%BA%A3i-ph%C3%A1p-%C4%91%E1%BB%83-s%E1%BB%AD-d%E1%BB%A5ng-jwt-an-to%C3%A0n" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Giải pháp để sử dụng JWT an toàn?</h1>\n<ul>\n<li><code class="language-text">secret</code> phải thật mạnh</li>\n<li>Nếu có những thông tin nhạy cảm trong token, chúng ta cần encrypt cái token bằng JSON Web Encryption</li>\n<li>Không nên gửi đi token bằng HTTP, luôn dùng HTTPS nếu có gửi đi token</li>\n<li>Xác định thời gian expire của token chứ không để nó tồn tại vô thời hạn</li>\n</ul>\n<h1 id="một-số-cân-nhắc-khi-sử-dụng-cookie"><a href="#m%E1%BB%99t-s%E1%BB%91-c%C3%A2n-nh%E1%BA%AFc-khi-s%E1%BB%AD-d%E1%BB%A5ng-cookie" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Một số cân nhắc khi sử dụng cookie</h1>\n<p>Trình duyệt cung cấp thêm một chỗ gọi là HttpOnly cookie, lúc này khi gọi lên server, ví dụ <code class="language-text">POST /authenticate</code> nó sẽ trả về token bên trong header <code class="language-text">Set-Cookie</code>, ví dụ như bên dưới</p>\n<p>HTTP/1.1 200 OK</p>\n<p>Content-Type: application/json; charset=utf-8</p>\n<p>Access-Control-Allow-Headers: Content-Type</p>\n<p>Access-Control-Allow-Methods: GET,POST,PUT</p>\n<p>Access-Control-Allow-Origin: <a href="https://www.bobank.com">https://www.bobank.com</a></p>\n<p>Set-Cookie: session=15d38683-a98f-402d-a373-4f81a5549536; path=/; expires=Fri, 06 Nov 2015 08:30:15 GMT; httponly</p>\n<p>Bên trong Set-Cookie bạn sẽ thấy có giá trị <code class="language-text">httponly</code>. Khi gọi request network bình thường nó sẽ không có dùng đến cookie này, muốn có mình phải chỉ định thêm <code class="language-text">credentials: include</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">/**\n * @return {Promise}\n */</span>\n<span class="token keyword">function</span> <span class="token function">getAccounts</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">\'https://api.bobank.com/accounts\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n        headers<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n            <span class="token string">\'Content-Type\'</span><span class="token punctuation">:</span> <span class="token string">\'application/json; charset=utf-8\'</span><span class="token punctuation">,</span>\n            <span class="token string">\'Accept\'</span><span class="token punctuation">:</span> <span class="token string">\'application/json\'</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        credentials<span class="token punctuation">:</span> <span class="token string">\'include\'</span> <span class="token comment">// &lt;= Thay đổi ở đây</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Nếu không sử dụng <code class="language-text">fetch</code> mà dùng <code class="language-text">XmlHttpRequest</code>, thì thuộc này có tên là <code class="language-text">withCredentials</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">function</span> <span class="token function">getAccounts</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">fulfill<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">var</span> req <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    req<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">\'GET\'</span><span class="token punctuation">,</span> <span class="token string">\'https://api.bobank.com/accounts\'</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// force XMLHttpRequest2</span>\n    req<span class="token punctuation">.</span><span class="token function">setRequestHeader</span><span class="token punctuation">(</span><span class="token string">\'Content-Type\'</span><span class="token punctuation">,</span> <span class="token string">\'application/json; charset=utf-8\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    req<span class="token punctuation">.</span><span class="token function">setRequestHeader</span><span class="token punctuation">(</span><span class="token string">\'Accept\'</span><span class="token punctuation">,</span> <span class="token string">\'application/json\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    req<span class="token punctuation">.</span>withCredentials <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">// đưa cookies vào nhé</span>\n    req<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token punctuation">{</span>\n        <span class="token comment">// lưu token rồi redirect</span>\n        <span class="token keyword">let</span> json<span class="token punctuation">;</span>\n        <span class="token keyword">try</span> <span class="token punctuation">{</span>\n          json <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>responseText<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          <span class="token keyword">return</span> <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        <span class="token function">resolve</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n    req<span class="token punctuation">.</span>onerror <span class="token operator">=</span> reject<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Vẫn còn thiếu! Khi browser mà gửi đi <code class="language-text">XmlHtpRequests</code> với thông tin <code class="language-text">credentials</code> thì API cũng phải có <code class="language-text">Access-Control-Allow-Credentials</code> trong response. Ví dụ <code class="language-text">GET /accounts</code> trả về từ server</p>\n<p>HTTP/1.1 200 OK</p>\n<p>Content-Type: application/json; charset=utf-8</p>\n<p>Access-Control-Allow-Credentials: true</p>\n<p>Access-Control-Allow-Headers: Content-Type,Authorization</p>\n<p>Access-Control-Allow-Methods: GET,POST,PUT</p>\n<p>Access-Control-Allow-Origin: <a href="https://www.bobank.com">https://www.bobank.com</a></p>\n<p>Set-Cookie: session=15d38683-a98f-402d-a373-4f81a5549536; path=/; expires=Fri, 06 Nov 2015 09:30:15 GMT; httponly\n[\n{ id: 456346436, ... }\n]</p>\n<p>Bài viết đầy đủ <a href="http://www.redotheweb.com/2015/11/09/api-security.html">http://www.redotheweb.com/2015/11/09/api-security.html</a></p>',timeToRead:5,excerpt:"Sự khác nhau giữa cookie - localStorage - sessionStorage JSON Web Token Giải pháp để sử dụng JWT an toàn? Một số cân nhắc khi sử dụng cookie…",frontmatter:{title:"So sánh localStorage, sessionStorage, cookie",cover:"",date:"2018-09-17",category:null,tags:["javascript","security"],desc:"Sự khác nhau giữa 3 cách lưu thông tin xuống trình duyệt"},fields:{slug:"/2018-09-17-huong-dan-luu-token-o-dau"}}},pathContext:{slug:"/2018-09-17-huong-dan-luu-token-o-dau",prev:{frontmatter:{title:"Merge vs Rebase trong Git",desc:"Trong bài viết này, chúng ta sẽ so sánh giữa lệnh git rebase với git merge, những trường hợp ta có thể áp dụng rebase trong quá trình làm việc với git",type:"post",category:null,tags:["javascript"],date:"2018-09-18",cover:"https://wac-cdn.atlassian.com/dam/jcr:15447956-9d33-4817-9dc6-fd6c86f24240/hero.svg"},fields:{slug:"/2018-09-18-merging-va-rebase-trong-git"}},next:{frontmatter:{title:"Giải thích Workflow theo kiểu Gitflow",desc:"Gitflow là một dạng quy trình làm việc với Git, được giới thiệu bởi Vincent Driessen và sử dụng rất phổ biến trong các công ty phần mềm, đặt ra những quy ước trong việc tổ chức các branch trên Git",type:"post",category:null,tags:["javascript"],date:"2018-09-16",cover:"https://image.slidesharecdn.com/gitflow-160421170910/95/git-flow-7-638.jpg"},fields:{slug:"/2018-09-16-huong-dan-gitflow-workflow"}}}}}});
//# sourceMappingURL=path---2018-09-17-huong-dan-luu-token-o-dau-645aafced3b7348394b7.js.map