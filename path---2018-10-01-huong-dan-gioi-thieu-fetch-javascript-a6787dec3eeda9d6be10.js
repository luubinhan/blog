webpackJsonp([0xe5e609ad4819],{1322:function(n,s){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#vi%E1%BA%BFt-m%E1%BB%99t-c%C3%A2u-request-network-%C4%91%C6%A1n-gi%E1%BA%A3n-v%E1%BB%9Bi-fetch">Viết một câu request network đơn giản với fetch</a></li>\n<li><a href="#response-metadata">Response Metadata</a></li>\n<li><a href="#response-types">Response Types</a></li>\n<li><a href="#chu%E1%BB%97i-promise">Chuỗi Promise</a></li>\n<li><a href="#post-request">POST Request</a></li>\n<li><a href="#g%E1%BB%ADi-th%C3%B4ng-tin-x%C3%A1c-th%E1%BB%B1c-v%E1%BB%9Bi-fetch">Gửi thông tin xác thực với Fetch</a></li>\n<li><a href="#upload-file">Upload file</a></li>\n<li><a href="#upload-nhi%E1%BB%81u-file">Upload nhiều file</a></li>\n</ul>\n<!-- /TOC -->\n<p><code class="language-text">fetch()</code> cho phép tạo một network request tương tự như XMLHttpRequest(XHR). Sự khác nhau chủ yếu là Fetch hoạt động theo <strong>Promises</strong>, cho phép viết gọn ràng, dễ nhớ hơn là XHR. API Fetch có trong <code class="language-text">window.fetch()</code> từ Chrome 42, để sử dụng <code class="language-text">fetch()</code> cho các version browser cũ hơn thì dùng <a href="https://github.com/github/fetch">polyfill của Github</a></p>\n<h1 id="viết-một-câu-request-network-đơn-giản-với-fetch"><a href="#vi%E1%BA%BFt-m%E1%BB%99t-c%C3%A2u-request-network-%C4%91%C6%A1n-gi%E1%BA%A3n-v%E1%BB%9Bi-fetch" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Viết một câu request network đơn giản với fetch</h1>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">\'/api/some-url\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>\n    <span class="token keyword">function</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>response<span class="token punctuation">.</span>status <span class="token operator">!==</span> <span class="token number">200</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Lỗi, mã lỗi \'</span> <span class="token operator">+</span> response<span class="token punctuation">.</span>status<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n      <span class="token comment">// parse response data</span>\n      response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>data <span class="token operator">=></span> <span class="token punctuation">{</span>\n        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token keyword">catch</span><span class="token punctuation">(</span>err <span class="token operator">=></span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Error :-S\'</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Response của câu <code class="language-text">fetch()</code> là một đối tượng <strong>Stream</strong>, nghĩa là khi chúng ta gọi phương thức <code class="language-text">json()</code>, một Promise được trả về, vì quá trình đọc stream sẽ diễn ra bất đồng bộ.</p>\n<h1 id="response-metadata"><a href="#response-metadata" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Response Metadata</h1>\n<p>Bên cạnh các dữ liệu chúng ta có thể truy cập như trong ví dụ trên, chúng ta có thể truy cập đến các meta data khác</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">\'/api/some-url\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>response <span class="token operator">=></span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>headers<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">\'Content-Type\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>headers<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">\'Date\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>status<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>statusText<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>url<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<h1 id="response-types"><a href="#response-types" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Response Types</h1>\n<p>Khi chúng ta tạo một fetch request, response trả về sẽ chứa <strong>response.type</strong>, với một trong các giá trị <strong>basic</strong>, <strong>cors</strong>, <strong>opaque</strong>. Nó cho biết resource này đến từ đâu, cho chúng ta biết cách chúng ta nên <em>đối xử</em> với object trả về</p>\n<p><img src="https://rootsec.info/wp-content/uploads/2017/07/same-origin-policy.jpg" alt="same origin"></p>\n<p>Nếu request lên cùng một <strong>nguồn</strong> (ứng dụng host trên server A gửi request lên API trên server A), response.type sẽ là <code class="language-text">basic</code>, không có bất kỳ giới hạn việc xem các thông tin trên response.</p>\n<p>Nếu request dạng <strong>CORS</strong>, type trả về <code class="language-text">cors.cors</code>, lúc đó bên trong <code class="language-text">header</code> chúng ta chỉ được phép truy cập đến <code class="language-text">Cache-Control</code>, <code class="language-text">Content-Language</code>, <code class="language-text">Content-Type</code>, <code class="language-text">Expires</code>, <code class="language-text">Last-Modified</code> và <code class="language-text">Pragma</code></p>\n<p>Type <code class="language-text">opaque</code> cho các request tạo ra khác <strong>nguồn</strong>, và thằng API nó không chấp nhận dạng request <strong>CORS</strong>, nghĩa là không trả về dữ liệu, không xem được status của request.</p>\n<p>Để khai báo 1 fetch request chỉ <code class="language-text">resolve</code> khi thõa điều kiện <strong>mode</strong></p>\n<ul>\n<li><code class="language-text">same-origin</code>: các request khác nguồn sẽ trả về <code class="language-text">reject</code></li>\n<li><code class="language-text">cors</code>: cho phép khác nguồn nếu header trả về cũng là CORs</li>\n<li><code class="language-text">cors-with-forced-preflight</code> luôn thực hiện kiểm tra <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Preflighted_requests">preflight</a>. Trước khi gửi đi, để đảm bảo có an toàn trước, tạo một request dùng phương thức OPTIONS để kiểm tra độ an toàn</li>\n<li><code class="language-text">no-cors</code> tạo một request không cùng nguồn, không trả về CORS</li>\n</ul>\n<p>Để khai báo mode</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">\'http://some-site.com/cors-enabled/some.json\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>mode<span class="token punctuation">,</span> <span class="token string">\'cors\'</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> response<span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Request successful\'</span><span class="token punctuation">,</span> text<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Request failed\'</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h1 id="chuỗi-promise"><a href="#chu%E1%BB%97i-promise" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Chuỗi Promise</h1>\n<p>Một trong những tính năng hay (<strong>và sinh ra rắc rối</strong>) của Promise là cho phép mốc các Promise theo dạng chuỗi.</p>\n<p>Khi làm việc với JSON API, chúng ta quan tâm đến <code class="language-text">status</code> và <code class="language-text">parse</code> JSON trả về trên mỗi kết quả trả về, để đơn giản hóa, đưa phần xử lý kiểm tra status và parse này ra hàm riêng. Chúng ta chỉ lo xử lý kết quả cuối cùng và trường hợp có lỗi</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">function</span> <span class="token function">status</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>response<span class="token punctuation">.</span>status <span class="token operator">>=</span> <span class="token number">200</span> <span class="token operator">&amp;&amp;</span> response<span class="token punctuation">.</span>status <span class="token operator">&lt;</span> <span class="token number">300</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>statusText<span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">function</span> <span class="token function">json</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n<span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">\'\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>data <span class="token operator">=></span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Request succeeded with JSON response\'</span><span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Request failed\'</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h1 id="post-request"><a href="#post-request" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>POST Request</h1>\n<p>Set giá trị <code class="language-text">method</code> và <code class="language-text">body</code> để tạo một POST request</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token function">fetch</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n  method<span class="token punctuation">:</span> <span class="token string">\'POST\'</span><span class="token punctuation">,</span>\n  headers<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    <span class="token string">"Content-Type"</span><span class="token punctuation">:</span> <span class="token string">"application/x-www-form-urlencoded; charset=UTF-8"</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  body<span class="token punctuation">:</span> <span class="token string">\'foo=bar&amp;lorem=ipsum\'</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span>\n<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>data <span class="token operator">=></span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Request succeeded with JSON response\'</span><span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">.</span><span class="token keyword">catch</span><span class="token punctuation">(</span>error <span class="token operator">=></span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Request failed\'</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>Gửi lên dữ liệu dạng JSON</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> data <span class="token operator">=</span> <span class="token punctuation">{</span>username<span class="token punctuation">:</span> <span class="token string">\'example\'</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token function">fetch</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n  method<span class="token punctuation">:</span> <span class="token string">\'POST\'</span><span class="token punctuation">,</span> \n  body<span class="token punctuation">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">,</span> \n  headers<span class="token punctuation">:</span><span class="token punctuation">{</span>\n    <span class="token string">\'Content-Type\'</span><span class="token punctuation">:</span> <span class="token string">\'application/json\'</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>res <span class="token operator">=></span> res<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>response <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Success:\'</span><span class="token punctuation">,</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">.</span><span class="token keyword">catch</span><span class="token punctuation">(</span>error <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">\'Error:\'</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<h1 id="gửi-thông-tin-xác-thực-với-fetch"><a href="#g%E1%BB%ADi-th%C3%B4ng-tin-x%C3%A1c-th%E1%BB%B1c-v%E1%BB%9Bi-fetch" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Gửi thông tin xác thực với Fetch</h1>\n<p>Để gửi kèm thông tin xác thực (user là ai), như cookie, chúng ta truyền tham số <code class="language-text">credentials: include</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token function">fetch</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n  credentials<span class="token punctuation">:</span> <span class="token string">\'include\'</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>Nếu muốn gửi credentials khi request URL là cùng nguồn, truyền giá trị <code class="language-text">same-origin</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token function">fetch</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n  crendentials<span class="token punctuation">:</span> <span class="token string">\'same-origin\'</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>Không cho trình duyệt gửi thông tin xác thực, dùng <code class="language-text">omit</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token function">fetch</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n  crendentials<span class="token punctuation">:</span> <span class="token string">\'omit\'</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<h1 id="upload-file"><a href="#upload-file" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Upload file</h1>\n<p>Sử dụng cùng <code class="language-text">&lt;input type=&#39;file&#39; /&gt;</code>, <code class="language-text">FormData()</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> formData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FormData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> fileField <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">"input[type=\'file\']"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nformData<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">\'username\'</span><span class="token punctuation">,</span> <span class="token string">\'abc123\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nformData<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">\'avatar\'</span><span class="token punctuation">,</span> fileField<span class="token punctuation">.</span>files<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">\'https://example.com/profile/avatar\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n  method<span class="token punctuation">:</span> <span class="token string">\'PUT\'</span><span class="token punctuation">,</span>\n  body<span class="token punctuation">:</span> formData\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>response <span class="token operator">=></span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>response <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Success:\'</span><span class="token punctuation">,</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">.</span><span class="token keyword">catch</span><span class="token punctuation">(</span>error <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">\'Error:\'</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<h1 id="upload-nhiều-file"><a href="#upload-nhi%E1%BB%81u-file" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Upload nhiều file</h1>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> formData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FormData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> photos <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">"input[type=\'file\'][multiple]"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nformData<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">\'title\'</span><span class="token punctuation">,</span> <span class="token string">\'My Vegas Vacation\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nformData<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">\'photos\'</span><span class="token punctuation">,</span> photos<span class="token punctuation">.</span>files<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">\'https://example.com/posts\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n  method<span class="token punctuation">:</span> <span class="token string">\'POST\'</span><span class="token punctuation">,</span>\n  body<span class="token punctuation">:</span> formData\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>response <span class="token operator">=></span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>response <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Success:\'</span><span class="token punctuation">,</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">.</span><span class="token keyword">catch</span><span class="token punctuation">(</span>error <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">\'Error:\'</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p><a href="https://developers.google.com/web/updates/2015/03/introduction-to-fetch">Link bài viết gốc</a></p>\n<p><a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch">Ví dụ tham khảo, chi tiết hơn về header, body, response object</a></p>',
timeToRead:6,excerpt:"Viết một câu request network đơn giản với fetch Response Metadata Response Types Chuỗi Promise POST Request Gửi thông tin xác thực với Fetch…",frontmatter:{title:"Giới thiệu fetch() của javascript",cover:"",date:"2018-10-01",category:null,tags:["javascript"],desc:"Tạm biệt XMLHttpRequest và cách viết dài dòng, giờ đây ta đã có fetch API"},fields:{slug:"/2018-10-01-huong-dan-gioi-thieu-fetch-javascript"}}},pathContext:{slug:"/2018-10-01-huong-dan-gioi-thieu-fetch-javascript",prev:{frontmatter:{title:"Sử dụng tabindex",desc:"Mặc định thứ tự tab theo vị trí của DOM rất hữu dụng, tuy nhiên có trường hợp chúng ta sẽ muốn thay đổi thứ tự tab này. Cùng nghiên cứu attribute tabindex để set thứ tự tab",type:"post",category:null,tags:["ux-ui"],date:"2018-10-02",cover:""},fields:{slug:"/2018-10-02-huong-dan-su-dung-tabindex-de-di-chuyen"}},next:{frontmatter:{title:"Bộ kiến thức của google để được gọi là chuẩn Web Mobile Developer",desc:"Mình bắt đầu một series mới, đây là bài đầu tiên tổng hợp tất cả những chủ đề sẽ điểm qua trong series này, nắm hết các kiến thức này, các bạn có thể tự tin lấy chứng chỉ Web Mobile Specialist của Google",type:"post",category:null,tags:["javascript"],date:"2018-09-30",cover:""},fields:{slug:"/2018-09-30-huong-dan-tro-thanh-web-moblie-specialist"}}}}}});
//# sourceMappingURL=path---2018-10-01-huong-dan-gioi-thieu-fetch-javascript-a6787dec3eeda9d6be10.js.map