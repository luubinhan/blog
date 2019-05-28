webpackJsonp([0xe4de0aa182ee],{1395:function(n,a){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#render-theo-%C4%91i%E1%BB%81u-ki%E1%BB%87n">Render theo điều kiện</a></li>\n<li><a href="#d%C3%B9ng-m%E1%BB%99t-wrapper-component">Dùng một wrapper component</a></li>\n<li><a href="#ch%E1%BB%A7-%C4%91%E1%BB%99ng-thay-%C4%91%E1%BB%95i-component-layout">Chủ động thay đổi component layout</a></li>\n<li><a href="#ch%E1%BB%A7-%C4%91%E1%BB%99ng-thay-%C4%91%E1%BB%95i-component-layout-v%E1%BB%9Bi-renderless-component">Chủ động thay đổi component layout với renderless component</a></li>\n<li><a href="#ch%E1%BB%A7-%C4%91%E1%BB%99ng-import-khi-c%E1%BA%A7n-thi%E1%BA%BFt">Chủ động import khi cần thiết</a></li>\n<li><a href="#t%E1%BB%95ng-k%E1%BA%BFt">Tổng kết</a></li>\n</ul>\n<!-- /TOC -->\n<p>Nếu dùng Vue CLI để khởi tạo, bạn sẽ có sẵn layout như thế này</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>App<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>nav</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>App__nav<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>/<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Home<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">></span></span> <span class="token operator">|</span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>/about<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>About<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>nav</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span><span class="token punctuation">/></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>footer</span><span class="token punctuation">></span></span>\n      <span class="token entity" title="&copy;">&amp;copy;</span> Awesome Company\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>footer</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Nếu chúng ta không cần các dạng layout khác nhau, chỉ một kiểu layout duy nhất thì có thể dùng cách này là đủ.</p>\n<p>Ví dụ như bạn đang cần một cái sidebar mà nó sẽ có vài dạng khác nhau cho từng loại trang, bạn cần tìm hiểu thêm một số cách làm layout của Vue</p>\n<h2 id="render-theo-điều-kiện"><a href="#render-theo-%C4%91i%E1%BB%81u-ki%E1%BB%87n" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Render theo điều kiện</h2>\n<p>Cách tiếp cận ai cũng nghĩ đến đầu tiên sẽ là dùng <code class="language-text">v-if</code> để render một vài phần khác nhau theo điều kiện cụ thể.</p>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code class="language-diff"><span class="token deleted">&lt;template></span>\n   &lt;div class="App">\n<span class="token deleted">-    &lt;nav class="App__nav"></span>\n<span class="token inserted">+    &lt;nav v-if="showNav" class="App__nav"></span>\n       &lt;router-link to="/">Home&lt;/router-link> |\n       &lt;router-link to="/about">About&lt;/router-link>\n     &lt;/nav>\n     &lt;router-view/>\n<span class="token deleted">-    &lt;footer></span>\n<span class="token inserted">+    &lt;footer v-if="showFooter"></span>\n       &amp;copy; Awesome Company\n     &lt;/footer>\n   &lt;/div>\n &lt;/template></code></pre>\n      </div>\n<p>Với cách này chúng ta phải dùng thêm khá nhiều biến để kiểm soát được việc khi nào thì hiển thị và ẩn một element.</p>\n<p>Tuy nhiên, nếu ứng dụng lớn, bạn không nên dùng cách này vì nó sẽ nhanh chóng trở thành mớ code hầm bà lằng</p>\n<h2 id="dùng-một-wrapper-component"><a href="#d%C3%B9ng-m%E1%BB%99t-wrapper-component" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Dùng một wrapper component</h2>\n<p>Chúng ta sẽ dựng một component làm layout, chừa một vài vị trí trong component để chèn các element khác vào đó, trong React gọi là <code class="language-text">children</code>, trong Vue thì nó mạnh hơn, vì nó cho bạn đặt nhiều vị trí khác nhau bằng <code class="language-text">slot</code>.</p>\n<p>Rất nhiều người thích xài cách này, và mình cũng thuộc nhóm đó.</p>\n<p>Bên trong <code class="language-text">src/App.vue</code> chúng ta chỉ cần render <code class="language-text">&lt;router-view/&gt;</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>App<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span><span class="token punctuation">/></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>File <code class="language-text">src/layouts/LayoutDefault.vue</code> sẽ chứa các component dùng chung, <code class="language-text">&lt;slot/&gt;</code> là nơi sẽ render component con.</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>LayoutDefault<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>nav</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>LayoutDefault__nav<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>/<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Home<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">></span></span> <span class="token operator">|</span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>/about<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>About<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>nav</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>main</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>LayoutDefault__main<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span><span class="token punctuation">/></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>main</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>footer</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>LayoutDefault__footer<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n      <span class="token entity" title="&copy;">&amp;copy;</span> Awesome Company\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>footer</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Giờ nếu trang Home dùng layout này</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>\n\t<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>layout-default</span><span class="token punctuation">></span></span>\n\t\t… <span class="token constant">N</span>ội dung trang Home …<span class="token punctuation">.</span>\n\t<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>layout-default</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script language-javascript">\n<span class="token keyword">import</span> LayoutDefault <span class="token keyword">from</span> ‘<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">/</span>layouts<span class="token operator">/</span>LayoutDefault<span class="token punctuation">.</span>vue’\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n\tcomponents<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n\t\tLayoutDefault<span class="token punctuation">,</span>\n\t<span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Để đặt nhiều slot hơn, bạn đọc thêm <a href="https://vuejs.org/v2/guide/components-slots.html#Named-Slots"> ở trang chủ</a></p>\n<p>Tuy nhiên, vấn đề của cách làm này là khi component Home được update, nó cũng phải render lại <code class="language-text">&lt;LayoutDefault/&gt;</code>, vì nó nằm cùng file mà</p>\n<h2 id="chủ-động-thay-đổi-component-layout"><a href="#ch%E1%BB%A7-%C4%91%E1%BB%99ng-thay-%C4%91%E1%BB%95i-component-layout" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Chủ động thay đổi component layout</h2>\n<p>Nghe đồn component của Vue mạnh dữ lắm, nó có một component tên là <code class="language-text">&lt;component /&gt;</code> !</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>SomeComponent<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></code></pre>\n      </div>\n<p>Trong đó biến <code class="language-text">SomeComponent</code> có thể được gán cho bất kỳ component nào, nó sẽ thay cái SomeComponent được gán lúc đó như là <code class="language-text">&lt;component/&gt;</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>bien-so<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token constant">A</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>component</span><span class="token punctuation">></span></span>\n<span class="token comment">// rồi đâu đó bạn gán lại cái bien-so thành &lt;LayoutComponent /></span>\n<span class="token comment">// Nó sẽ render thành</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>LayoutComponent</span><span class="token punctuation">></span></span><span class="token constant">A</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>LayoutComponent</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Bên trong <code class="language-text">App.vue</code> chúng ta sửa lại để trên <code class="language-text">&lt;router-view/&gt;</code> có thể tự thay đổi giá trị của <code class="language-text">layout</code>, chúng ta dùng thêm <code class="language-text">:layout.sync</code>, trên component con chúng ta chỉ cần emit <code class="language-text">update:layout</code> để cập nhập lại giá trị layout</p>\n<p><strong>Nhớ return data cho layout là <code class="language-text">div</code> để nếu không có gán giá trị nào thì nó sẽ lấy default là <code class="language-text">div</code></strong></p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>layout<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-view</span> <span class="token attr-name">:layout.sync</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>layout<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>component</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script language-javascript">\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  name<span class="token punctuation">:</span> <span class="token string">\'App\'</span><span class="token punctuation">,</span>\n  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n      layout<span class="token punctuation">:</span> <span class="token string">\'div\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Trên Home chúng ta emit sự kiện để thay giá trị layout khi component <code class="language-text">created()</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>Home<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Home<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>\n    <span class="token operator">...</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script language-javascript">\n<span class="token keyword">import</span> LayoutDefault <span class="token keyword">from</span> <span class="token string">\'../layouts/LayoutDefault.vue\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  name<span class="token punctuation">:</span> <span class="token string">\'Home\'</span><span class="token punctuation">,</span>\n  <span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">\'update:layout\'</span><span class="token punctuation">,</span> LayoutDefault<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Mình đồng ý là mới nhìn nó sẽ hơi phức tạp và kỳ cục hơn cách wrap component cha con bình thường.</p>\n<blockquote>\n<p>Khác nhau chính là ở chỗ component layout không nằm trong component router view.</p>\n</blockquote>\n<p>Nó giúp cho việc thay đổi qua trang khác nếu vẫn cùng 1 layout được emit, nó không update lại <code class="language-text">LayoutDefault</code>, chỉ update phần router view</p>\n<iframe src="https://codesandbox.io/embed/184177316l" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>\n<h2 id="chủ-động-thay-đổi-component-layout-với-renderless-component"><a href="#ch%E1%BB%A7-%C4%91%E1%BB%99ng-thay-%C4%91%E1%BB%95i-component-layout-v%E1%BB%9Bi-renderless-component" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Chủ động thay đổi component layout với renderless component</h2>\n<p>Trong Vue nó còn có cái gọi là Renderless Component, chúng ta sẽ sử dụng nó để việc chủ động chọn layout dễ dàng hơn ở trên</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>layout-default-dynamic</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>Home<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Home<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>\n      <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> <span class="token operator">...</span> <span class="token operator">--</span><span class="token operator">></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>layout-default-dynamic</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script language-javascript">\n<span class="token keyword">import</span> LayoutDefaultDynamic <span class="token keyword">from</span> <span class="token string">\'../layouts/LayoutDefaultDynamic\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  name<span class="token punctuation">:</span> <span class="token string">\'Home\'</span><span class="token punctuation">,</span>\n  components<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    LayoutDefaultDynamic<span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Giống như cách <a href="#d%C3%B9ng-m%E1%BB%99t-wrapper-component">Dùng một wrapper component</a>, nhưng chúng sẽ build <code class="language-text">&lt;layout-default-dynamic/&gt;</code> theo kiểu renderless, nó không chứa html markup</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token comment">// src/layouts/LayoutDefaultDynamic.js</span>\n<span class="token keyword">import</span> LayoutDefault <span class="token keyword">from</span> <span class="token string">\'./LayoutDefault.vue\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  name<span class="token punctuation">:</span> <span class="token string">\'LayoutDefaultDynamic\'</span><span class="token punctuation">,</span>\n  <span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>$parent<span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">\'update:layout\'</span><span class="token punctuation">,</span> LayoutDefault<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$slots<span class="token punctuation">.</span><span class="token keyword">default</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Chúng ta đã bỏ hết phần template đi, thay vào đó dùng hàm <code class="language-text">render</code> để return slot, gọi <code class="language-text">$parent.$emit</code></p>\n<h2 id="chủ-động-import-khi-cần-thiết"><a href="#ch%E1%BB%A7-%C4%91%E1%BB%99ng-import-khi-c%E1%BA%A7n-thi%E1%BA%BFt" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Chủ động import khi cần thiết</h2>\n<p>Vẫn là lazy load component với webpack để tiết kiệm file bundle, tuy đơn giản nhưng hiệu quả vô cùng để cải thiện performance</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">\'vue\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  name<span class="token punctuation">:</span> <span class="token string">\'Layout\'</span><span class="token punctuation">,</span>\n  props<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    name<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      type<span class="token punctuation">:</span> String<span class="token punctuation">,</span>\n      required<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// Kiểm tra xem component layout</span>\n    <span class="token comment">// đã được đăng ký chưa</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>Vue<span class="token punctuation">.</span>options<span class="token punctuation">.</span>components<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">,</span>\n        <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`../layouts/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.vue`</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">this</span><span class="token punctuation">.</span>$parent<span class="token punctuation">.</span><span class="token function">$emit</span><span class="token punctuation">(</span><span class="token string">\'update:layout\'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$slots<span class="token punctuation">.</span><span class="token keyword">default</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-diff"><code class="language-diff"><span class="token deleted">&lt;template></span>\n<span class="token deleted">-  &lt;layout-default-dynamic></span>\n<span class="token inserted">+  &lt;layout name="LayoutDefault"></span>\n     &lt;div class="Home">\n       &lt;h1>Home&lt;/h1>\n       &lt;!-- ... -->\n     &lt;/div>\n<span class="token deleted">-  &lt;/layout-default-dynamic></span>\n<span class="token inserted">+  &lt;/layout></span>\n &lt;/template>\n \n &lt;script>\n<span class="token deleted">-import LayoutDefaultDynamic from \'../layouts/LayoutDefaultDynamic\';</span>\n<span class="token inserted">+import Layout from \'../layouts/Layout\';</span>\n \n export default {\n   name: \'Home\',\n   components: {\n<span class="token deleted">-    LayoutDefaultDynamic,</span>\n<span class="token inserted">+    Layout,</span>\n   },\n };\n &lt;/script></code></pre>\n      </div>\n<h2 id="tổng-kết"><a href="#t%E1%BB%95ng-k%E1%BA%BFt" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Tổng kết</h2>\n<p>Nói chúng cách nào cũng sẽ tốt nhất cho từng trường hợp cụ thể nhất, không thể nói suông là cách này tốt hơn cách kia mà không test thực tế, bạn cứ thử, cứ test performance và xem nhu cầu của mình cần dùng đến cách nào, hoặc bạn thích cách nào hơn.</p>\n<p><a target="_blank" rel="noopener noreferrer" href="https://github.com/maoberlehner/dynamic-vue-layout-components">Toàn bộ source code</a></p>\n<p><a target="_blank" rel="noopener noreferrer" href="https://markus.oberlehner.net/blog/dynamic-vue-layout-components/">Dynamic Vue.js Layout Components</a></p>',
timeToRead:7,excerpt:"Render theo điều kiện Dùng một wrapper component Chủ động thay đổi component layout Chủ động thay đổi component layout với renderless…",frontmatter:{title:"Dựng component layout với Vue",cover:"",date:"2018-11-21",category:null,tags:["vuejs"],desc:"Khi mình nói đến layout, là ám chỉ đến những phần giống nhau trên trang, như cái sườn chính của website là header, footer sẽ giống nhau trên tất cả trang, chỉ phần bên trong là khác nhau."},fields:{slug:"/2018-11-21-huong-dan-lam-layout-voi-vue-md"}}},pathContext:{slug:"/2018-11-21-huong-dan-lam-layout-voi-vue-md",prev:{frontmatter:{title:"Dùng Px, Em hay Rem để viết media query",desc:"Khi viết media query, bạn có bao giờ thắc mắc nên dùng đơn vị nào: px, em hay rem?",type:"post",category:null,tags:["css"],date:"2018-11-26",cover:""},fields:{slug:"/2018-11-26-huong-dan-chon-don-vi-em-rem-px-khi-viet-media-query"}},next:{frontmatter:{title:"Một vài tips rất hay sử dụng trong javascript",desc:"Tổng hợp một số cú pháp, cách viết hay dùng hằng ngày",type:"post",category:null,tags:["javascript"],date:"2018-11-20",cover:""},fields:{slug:"/2018-11-20-mot-vai-tip-hay-su-dung-trong-javascript"}}}}}});
//# sourceMappingURL=path---2018-11-21-huong-dan-lam-layout-voi-vue-md-3ba764a13146f361835d.js.map