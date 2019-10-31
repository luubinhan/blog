webpackJsonp([0xe5dedf876000],{1529:function(n,s){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#t%C3%AAn-bi%E1%BA%BFn">Tên biến</a></li>\n<li><a href="#bi%E1%BA%BFn-boolean">Biến Boolean</a></li>\n<li><a href="#%C4%91%E1%BA%B7t-t%C3%AAn-class">Đặt tên class</a></li>\n<li><a href="#%C4%91%E1%BA%B7t-t%C3%AAn-h%C3%A0m-ph%C6%B0%C6%A1ng-th%E1%BB%A9c-c%E1%BB%A7a-m%E1%BB%99t-class">Đặt tên hàm, phương thức của một class</a></li>\n<li><a href="#ph%C6%B0%C6%A1ng-th%E1%BB%A9c-bi%E1%BA%BFn-c%E1%BB%A5c-b%E1%BB%99">Phương thức, biến cục bộ</a></li>\n<li><a href="#h%E1%BA%B1ng-s%E1%BB%91">Hằng số</a></li>\n<li><a href="#dash">Dash</a></li>\n</ul>\n<!-- /TOC -->\n<h2 id="tên-biến"><a href="#t%C3%AAn-bi%E1%BA%BFn" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Tên biến</h2>\n<p>Trong Javascript, tên biến <strong>phân biệt hoa thường</strong></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> name <span class="token operator">=</span> <span class="token string">\'Vui Lap Trinh\'</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> Name <span class="token operator">=</span> <span class="token string">\'Lap Trinh Vui\'</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> <span class="token constant">NAME</span> <span class="token operator">=</span> <span class="token string">\'Trinh Lap Vui\'</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// "Vui Lap Trinh"</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// "Lap Trinh Vui"</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">NAME</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// "Trinh Lap Vui"</span></code></pre>\n      </div>\n<p>Tên biến cần phải rõ nghĩa, không cần phải ghi chú gì thêm, nhìn vào tên biến là có thể biết được nó chứa thông tin gì</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js">❌ Không ngon\n<span class="token keyword">var</span> value <span class="token operator">=</span> <span class="token string">\'Vui\'</span><span class="token punctuation">;</span>\n❌ Không ngon\n<span class="token keyword">var</span> val <span class="token operator">=</span> <span class="token string">\'Vui\'</span><span class="token punctuation">;</span>\n\n✅ Chuẩn cơm mẹ nấu\n<span class="token keyword">var</span> firstName <span class="token operator">=</span> <span class="token string">\'Vui\'</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Viết Javascript được khuyến khích sử dụng tên biến theo kiểu con lạc đà</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js">❌ Không ngon\n<span class="token keyword">var</span> firstname <span class="token operator">=</span> <span class="token string">\'Vui\'</span><span class="token punctuation">;</span>\n❌ Không ngon\n<span class="token keyword">var</span> first_name <span class="token operator">=</span> <span class="token string">\'Vui\'</span><span class="token punctuation">;</span>\n❌ Không ngon\n<span class="token keyword">var</span> <span class="token constant">FIRSTNAME</span> <span class="token operator">=</span> <span class="token string">\'Vui\'</span><span class="token punctuation">;</span>\n❌ Không ngon\n<span class="token keyword">var</span> <span class="token constant">FIRST_NAME</span> <span class="token operator">=</span> <span class="token string">\'Vui\'</span><span class="token punctuation">;</span>\n\n✅ Chuẩn cơm mẹ nấu\n<span class="token keyword">var</span> firstName <span class="token operator">=</span> <span class="token string">\'Vui\'</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Các trường hợp ngoài lệ, có luật riêng là hằng số, biến cục bộ, class, component</p>\n<h2 id="biến-boolean"><a href="#bi%E1%BA%BFn-boolean" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Biến Boolean</h2>\n<p>Với biến mang giá trị là Boolean (true/false, 0/1), thêm tiền tố <strong>is</strong>, <strong>has</strong>, <strong>are</strong></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js">❌ Không ngon\n<span class="token keyword">var</span> visible <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n\n✅ Chuẩn cơm mẹ nấu\n<span class="token keyword">var</span> isVisible <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n\n❌ Không ngon\n<span class="token keyword">var</span> equal <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n\n✅ Chuẩn cơm mẹ nấu\n<span class="token keyword">var</span> areEqual <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n\n❌ Không ngon\n<span class="token keyword">var</span> encryption <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n\n✅ Chuẩn cơm mẹ nấu\n<span class="token keyword">var</span> hasEncryption <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h2 id="đặt-tên-class"><a href="#%C4%91%E1%BA%B7t-t%C3%AAn-class" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Đặt tên class</h2>\n<p>Tên class được đặt theo kiểu PascalCase</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">class</span> <span class="token class-name">FrontendDeveloper</span> <span class="token punctuation">{</span>\n  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">firstName<span class="token punctuation">,</span> lastName</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>firstName <span class="token operator">=</span> firstName<span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>lastName <span class="token operator">=</span> lastName<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">var</span> me <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FrontendDeveloper</span><span class="token punctuation">(</span><span class="token string">\'Vui\'</span><span class="token punctuation">,</span> <span class="token string">\'Lap Trinh\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h2 id="đặt-tên-hàm-phương-thức-của-một-class"><a href="#%C4%91%E1%BA%B7t-t%C3%AAn-h%C3%A0m-ph%C6%B0%C6%A1ng-th%E1%BB%A9c-c%E1%BB%A7a-m%E1%BB%99t-class" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Đặt tên hàm, phương thức của một class</h2>\n<p>Hàm cũng đặt tên theo con lạc đà, tốt nhất nên diễn đạt hàm đó <strong>làm</strong> gì bằng cách thêm một tiền tố là một <strong>động từ</strong></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js">❌ Không ngon\n<span class="token keyword">function</span> <span class="token function">name</span><span class="token punctuation">(</span><span class="token parameter">firstName<span class="token punctuation">,</span> lastName</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>firstName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>lastName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n✅ Chuẩn cơm mẹ nấu\n<span class="token keyword">function</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token parameter">firstName<span class="token punctuation">,</span> lastName</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>firstName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>lastName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Một số tiền tố hay được sử dụng là: <code class="language-text">get</code>, <code class="language-text">fetch</code>, <code class="language-text">push</code>, <code class="language-text">apply</code>, <code class="language-text">calculate</code>, <code class="language-text">compute</code>, <code class="language-text">post</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">class</span> <span class="token class-name">FrontendDeveloper</span> <span class="token punctuation">{</span>\n  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">firstName<span class="token punctuation">,</span> lastName</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>firstName <span class="token operator">=</span> firstName<span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>lastName <span class="token operator">=</span> lastName<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token comment">// ✅ Chuẩn cơm mẹ nấu</span>\n<span class="gatsby-highlight-code-line">  <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n</span><span class="gatsby-highlight-code-line">    <span class="token keyword">return</span> <span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>firstName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>lastName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">;</span>\n</span><span class="gatsby-highlight-code-line">  <span class="token punctuation">}</span>\n</span><span class="token punctuation">}</span>\n<span class="token keyword">var</span> me <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FrontendDeveloper</span><span class="token punctuation">(</span><span class="token string">\'Vui\'</span><span class="token punctuation">,</span> <span class="token string">\'Lap Trinh\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>me<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// "Vui Lap Trinh"</span></code></pre>\n      </div>\n<h2 id="phương-thức-biến-cục-bộ"><a href="#ph%C6%B0%C6%A1ng-th%E1%BB%A9c-bi%E1%BA%BFn-c%E1%BB%A5c-b%E1%BB%99" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Phương thức, biến cục bộ</h2>\n<p>Thêm tiền tố <code class="language-text">_</code> vào trước biến, phương thức cục bộ của một class</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">class</span> <span class="token class-name">FrontendDeveloper</span> <span class="token punctuation">{</span>\n  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">firstName<span class="token punctuation">,</span> lastName</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>firstName <span class="token operator">=</span> firstName<span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>lastName <span class="token operator">=</span> lastName<span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token function">_getName</span><span class="token punctuation">(</span>firstName<span class="token punctuation">,</span> lastName<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token function">_getName</span><span class="token punctuation">(</span><span class="token parameter">firstName<span class="token punctuation">,</span> lastName</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>firstName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>lastName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">var</span> me <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FrontendDeveloper</span><span class="token punctuation">(</span><span class="token string">\'Vui\'</span><span class="token punctuation">,</span> <span class="token string">\'Lap Trinh\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n✅ Chuẩn cơm mẹ nấu\n<span class="token keyword">var</span> name <span class="token operator">=</span> me<span class="token punctuation">.</span>name<span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// "Vui Lap Trinh"</span>\n\n❌ Không ngon\nname <span class="token operator">=</span> me<span class="token punctuation">.</span><span class="token function">_getName</span><span class="token punctuation">(</span>me<span class="token punctuation">.</span>firstName<span class="token punctuation">,</span> me<span class="token punctuation">.</span>lastName<span class="token punctuation">)</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// "Vui Lap Trinh"</span></code></pre>\n      </div>\n<h2 id="hằng-số"><a href="#h%E1%BA%B1ng-s%E1%BB%91" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Hằng số</h2>\n<p>Viết hoa tất cả nếu nó là hằng số</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token constant">SECONDS</span> <span class="token operator">=</span> <span class="token number">60</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> <span class="token constant">MINUTES</span> <span class="token operator">=</span> <span class="token number">60</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> <span class="token constant">HOURS</span> <span class="token operator">=</span> <span class="token number">24</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> <span class="token constant">DAY</span> <span class="token operator">=</span> <span class="token constant">SECONDS</span> <span class="token operator">*</span> <span class="token constant">MINUTES</span> <span class="token operator">*</span> <span class="token constant">HOURS</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h2 id="dash"><a href="#dash" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Dash</h2>\n<p>Javascript không ưa gì ký tự <code class="language-text">-</code>, tránh sử dụng <code class="language-text">-</code> khi khai báo</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js">❌ Không ngon\n<span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token string">\'first-name\'</span><span class="token punctuation">:</span> <span class="token string">\'Vui\'</span><span class="token punctuation">,</span>\n  <span class="token string">\'last-name\'</span><span class="token punctuation">:</span> <span class="token string">\'Lap Trinh\'</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> firstName <span class="token operator">=</span> person<span class="token punctuation">[</span><span class="token string">\'first-name\'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n✅ Chuẩn cơm mẹ nấu\n<span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token punctuation">{</span>\n  firstName<span class="token punctuation">:</span> <span class="token string">\'Vui\'</span><span class="token punctuation">,</span>\n  lastName<span class="token punctuation">:</span> <span class="token string">\'Lap Trinh\'</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> firstName <span class="token operator">=</span> person<span class="token punctuation">.</span>firstName<span class="token punctuation">;</span></code></pre>\n      </div>\n<p><a target="_blank" rel="noopener noreferrer" href="https://www.robinwieruch.de/javascript-naming-conventions">📜 JavaScript Naming Conventions</a></p>',timeToRead:4,excerpt:"Tên biến Biến Boolean Đặt tên class Đặt tên hàm, phương thức của một class Phương thức, biến cục bộ Hằng số Dash Tên biến Trong Javascript…",frontmatter:{title:"Đặt tên sao cho đẹp trong javascript",cover:"",date:"2019-10-14",category:null,tags:["javascript"],desc:"Cách nguyên tắc chung khi đặt tên trong javascript"},fields:{slug:"/2019-10-14-huong-dan-dat-ten-bien-trong-javascript"}}},pathContext:{slug:"/2019-10-14-huong-dan-dat-ten-bien-trong-javascript",prev:{frontmatter:{title:"Tổng quát về viết unit test cho FE",desc:"Cái nhìn tổng quát để bạn có thể bắt đầu làm quen với test, những khái niệm, vấn đề gặp thường xuyên khi viết test",type:"post",category:null,tags:["javascript"],date:"2019-10-17",cover:""},fields:{slug:"/2019-10-17-viet-test-js"}},next:{frontmatter:{title:"Viết câu điều kiện tốt hơn trong javascript",desc:"Xem xét một trong những câu lệnh được sử dụng nhiều nhất trong lập trình: câu điều kiện",type:"post",category:null,tags:["javascript"],date:"2019-10-13",cover:""},fields:{slug:"/2019-10-13-viet-cau-dieu-kien-trong-javascript"}}}}}});
//# sourceMappingURL=path---2019-10-14-huong-dan-dat-ten-bien-trong-javascript-d6d178504b2767683a5f.js.map