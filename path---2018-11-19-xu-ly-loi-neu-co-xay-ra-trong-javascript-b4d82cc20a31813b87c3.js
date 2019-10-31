webpackJsonp([35117426812124],{1459:function(n,a){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#javascript-error">Javascript error</a></li>\n<li><a href="#trycatch">try...catch</a></li>\n<li><a href="#finally">...finally</a></li>\n<li>\n<p><a href="#c%C3%A1c-h%C3%A0m-async">Các hàm async</a></p>\n<ul>\n<li><a href="#callback">callback</a></li>\n<li><a href="#promise">Promise</a></li>\n<li><a href="#asyncawait">async/await</a></li>\n</ul>\n</li>\n<li><a href="#hi%E1%BB%83n-th%E1%BB%8B-l%E1%BB%97i-%E1%BB%9F-ph%C3%ADa-giao-di%E1%BB%87n-ng%C6%B0%E1%BB%9Di-d%C3%B9ng">Hiển thị lỗi ở phía giao diện người dùng</a></li>\n</ul>\n<!-- /TOC -->\n<h2 id="javascript-error"><a href="#javascript-error" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Javascript error</h2>\n<p><code class="language-text">throw new Error(&#39;khi có lỗi&#39;)</code> sẽ tạo ra một object Error và dừng chạy.</p>\n<p>Error object có 2 property có sẵn, 1 là <code class="language-text">message</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> myError <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">\'Lỗi rồi nè\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myError<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// => Lỗi rồi nè</span></code></pre>\n      </div>\n<p>...cái thứ 2, rất quan trọng, là <code class="language-text">stack</code>, nó sẽ cho ta history các phương thức và file đã gọi qua.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js">Error<span class="token punctuation">:</span> please improve your code\n at Object<span class="token punctuation">.</span><span class="token operator">&lt;</span>anonymous<span class="token operator">></span> <span class="token punctuation">(</span><span class="token operator">/</span>Users<span class="token operator">/</span>gisderdube<span class="token operator">/</span>Documents<span class="token operator">/</span>_projects<span class="token operator">/</span>hacking<span class="token punctuation">.</span>nosync<span class="token operator">/</span>error<span class="token operator">-</span>handling<span class="token operator">/</span>src<span class="token operator">/</span>general<span class="token punctuation">.</span>js<span class="token punctuation">:</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token number">79</span><span class="token punctuation">)</span>\n at Module<span class="token punctuation">.</span><span class="token function">_compile</span> <span class="token punctuation">(</span>internal<span class="token operator">/</span>modules<span class="token operator">/</span>cjs<span class="token operator">/</span>loader<span class="token punctuation">.</span>js<span class="token punctuation">:</span><span class="token number">689</span><span class="token punctuation">:</span><span class="token number">30</span><span class="token punctuation">)</span>\n at Object<span class="token punctuation">.</span>Module<span class="token punctuation">.</span>_extensions<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token function">js</span> <span class="token punctuation">(</span>internal<span class="token operator">/</span>modules<span class="token operator">/</span>cjs<span class="token operator">/</span>loader<span class="token punctuation">.</span>js<span class="token punctuation">:</span><span class="token number">700</span><span class="token punctuation">:</span><span class="token number">10</span><span class="token punctuation">)</span>\n at Module<span class="token punctuation">.</span><span class="token function">load</span> <span class="token punctuation">(</span>internal<span class="token operator">/</span>modules<span class="token operator">/</span>cjs<span class="token operator">/</span>loader<span class="token punctuation">.</span>js<span class="token punctuation">:</span><span class="token number">599</span><span class="token punctuation">:</span><span class="token number">32</span><span class="token punctuation">)</span>\n at <span class="token function">tryModuleLoad</span> <span class="token punctuation">(</span>internal<span class="token operator">/</span>modules<span class="token operator">/</span>cjs<span class="token operator">/</span>loader<span class="token punctuation">.</span>js<span class="token punctuation">:</span><span class="token number">538</span><span class="token punctuation">:</span><span class="token number">12</span><span class="token punctuation">)</span>\n at Function<span class="token punctuation">.</span>Module<span class="token punctuation">.</span><span class="token function">_load</span> <span class="token punctuation">(</span>internal<span class="token operator">/</span>modules<span class="token operator">/</span>cjs<span class="token operator">/</span>loader<span class="token punctuation">.</span>js<span class="token punctuation">:</span><span class="token number">530</span><span class="token punctuation">:</span><span class="token number">3</span><span class="token punctuation">)</span>\n at Function<span class="token punctuation">.</span>Module<span class="token punctuation">.</span><span class="token function">runMain</span> <span class="token punctuation">(</span>internal<span class="token operator">/</span>modules<span class="token operator">/</span>cjs<span class="token operator">/</span>loader<span class="token punctuation">.</span>js<span class="token punctuation">:</span><span class="token number">742</span><span class="token punctuation">:</span><span class="token number">12</span><span class="token punctuation">)</span>\n at <span class="token function">startup</span> <span class="token punctuation">(</span>internal<span class="token operator">/</span>bootstrap<span class="token operator">/</span>node<span class="token punctuation">.</span>js<span class="token punctuation">:</span><span class="token number">266</span><span class="token punctuation">:</span><span class="token number">19</span><span class="token punctuation">)</span>\n at <span class="token function">bootstrapNodeJSCore</span> <span class="token punctuation">(</span>internal<span class="token operator">/</span>bootstrap<span class="token operator">/</span>node<span class="token punctuation">.</span>js<span class="token punctuation">:</span><span class="token number">596</span><span class="token punctuation">:</span><span class="token number">3</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>Nếu chúng ta không tự xử lý các trường hợp có lỗi, nó sẽ chết ngay chổ đó, để tránh tình huống này, tìm hiểu một số cách bắt lỗi</p>\n<h2 id="trycatch"><a href="#trycatch" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>try...catch</h2>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>\n\n<span class="token keyword">try</span> <span class="token punctuation">{</span>\n  <span class="token comment">// b chưa được định nghĩa, nó sẽ báo lỗi</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// vẫn chạy đến đây</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Nếu không để <code class="language-text">console.log(b)</code> bên trong <code class="language-text">try..catch</code>, nó sẽ không chạy đến đoạn <code class="language-text">console.log(a)</code></p>\n<h2 id="finally"><a href="#finally" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>...finally</h2>\n<p>Đôi khi chúng ta cần chạy một đoạn code dù nó có bị lỗi hay không bị lỗi, nó cũng sẽ giống ở trên, nhưng viết nó sẽ rõ ràng hơn</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>\n\n<span class="token keyword">try</span> <span class="token punctuation">{</span>\n  <span class="token comment">// b chưa được định nghĩa, nó sẽ báo lỗi</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>\n<span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<h2 id="các-hàm-async"><a href="#c%C3%A1c-h%C3%A0m-async" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Các hàm async</h2>\n<p>Hiện tại chúng ta có 3 cách để làm việc với các hàm async, cách xử lý lỗi nếu có trên 3 cách này: callback, Promise, async/await</p>\n<h3 id="callback"><a href="#callback" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>callback</h3>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token function">myAsyncFunc</span><span class="token punctuation">(</span>someInput<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> result</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">return</span> console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<h3 id="promise"><a href="#promise" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Promise</h3>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js">Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token comment">// 1</span>\n    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">\'something went wrong\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token comment">// sẽ không chạy</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">err</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token comment">// (A)</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token comment">// 3</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">err</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token comment">// trong trường hợp block (A) xảy ra lỗi</span>\n    console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<h3 id="asyncawait"><a href="#asyncawait" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>async/await</h3>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">async</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">try</span> <span class="token punctuation">{</span>\n    <span class="token keyword">await</span> <span class="token function">someFuncThatThrowsAnError</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> \n  <span class="token punctuation">}</span>\n  <span class="token comment">// vẫn chạy</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Easy!\'</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<h2 id="hiển-thị-lỗi-ở-phía-giao-diện-người-dùng"><a href="#hi%E1%BB%83n-th%E1%BB%8B-l%E1%BB%97i-%E1%BB%9F-ph%C3%ADa-giao-di%E1%BB%87n-ng%C6%B0%E1%BB%9Di-d%C3%B9ng" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Hiển thị lỗi ở phía giao diện người dùng</h2>\n<p>Ví dụ chúng ta làm Single Page App bằng React, chúng ta muốn hiển thị lỗi trên giao diện như thế này</p>\n<p><img src="https://cdn-images-1.medium.com/max/800/1*xSpVDWEQ4wMHQ5kObFwf8w.jpeg" alt="Xử lý lỗi nếu có xảy ra trong javascript"></p>\n<p>Có thể dùng React Portal để chèn vào hoặc dùng một component nhận vào Error Object và render ra trên giao diện</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">GobalError</span></span> <span class="token attr-name">err</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>errorObj<span class="token punctuation">}</span></span> <span class="token attr-name">reset</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>handleResetError<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Nếu lỗi hiển thị dạng inline phía dưới input</p>\n<p><img src="https://cdn-images-1.medium.com/max/800/1*tpmtTom2eSmH7AnrAI55QQ.jpeg" alt="Xử lý lỗi nếu có xảy ra trong javascript"></p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span>\n      <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span>\n  <span class="token punctuation">/></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>_callBackend<span class="token punctuation">}</span></span><span class="token punctuation">></span></span>Delete your city<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">InlineError</span></span> <span class="token attr-name">error</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>error<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p><a href="https://levelup.gitconnected.com/the-definite-guide-to-handling-errors-gracefully-in-javascript-58424d9c60e6" target="_blank" rel="noopener noreferrer">Handling Errors in JavaScript: The Definitive Guide</a></p>',timeToRead:3,excerpt:"Javascript error try...catch ...finally Các hàm async callback Promise async/await Hiển thị lỗi ở phía giao diện người dùng Javascript error…",frontmatter:{title:"Xử lý lỗi nếu có xảy ra trong javascript",cover:"",date:"2018-11-19",category:null,tags:["javascript"],desc:"Lỗi nếu có xảy ra, phải được xử lý hết tránh để chết nguyên ứng dụng. Điểm lại một vài cách xử lý lỗi trong javascript"},fields:{slug:"/2018-11-19-xu-ly-loi-neu-co-xay-ra-trong-javascript"}}},pathContext:{slug:"/2018-11-19-xu-ly-loi-neu-co-xay-ra-trong-javascript",prev:{frontmatter:{title:"Một vài tips rất hay sử dụng trong javascript",desc:"Tổng hợp một số cú pháp, cách viết hay dùng hằng ngày",type:"post",category:null,tags:["javascript"],date:"2018-11-20",cover:""},fields:{slug:"/2018-11-20-mot-vai-tip-hay-su-dung-trong-javascript"}},next:{frontmatter:{title:"Bảo mật web - Một số kiểu tấn công",desc:"Tổng quát các vấn đề bạn cần quan tâm để bảo mật ứng dụng web",type:"post",category:null,tags:["javascript"],date:"2018-11-18",cover:""},fields:{slug:"/2018-11-18-mot-so-van-de-can-quan-tam-de-bao-mat-web"}}}}}});
//# sourceMappingURL=path---2018-11-19-xu-ly-loi-neu-co-xay-ra-trong-javascript-b4d82cc20a31813b87c3.js.map