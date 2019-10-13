webpackJsonp([76182197297912],{1519:function(n,s){n.exports={data:{markdownRemark:{html:'<p>Đầu tiên chúng ta cần trả lời câu hỏi <strong>global state</strong> có phải là phương thuốc chữa <em>bá bệnh</em> cho các vấn đề liên quan tới <code class="language-text">state</code>? Mình chỉ đưa dữ liệu vào Vuex store như là lựa chọn cuối cùng và có một lý do cụ thế để phải sử dụng. Điều thứ 2, luôn giữ global state ở dạng cây một cấp, nghĩa là chúng ta không lồng dữ liệu liệu vào nhau như bên dưới</p>\n<p>Đọc thêm <a href="https://markus.oberlehner.net/blog/should-i-store-this-data-in-vuex/">https://markus.oberlehner.net/blog/should-i-store-this-data-in-vuex/</a> để có khái niệm khi nào cần dữ liệu trong store và khi nào không.</p>\n<p>Quan điểm về flat state (không lưu dữ liệu lồng nhau trong store) được lấy cảm hứng từ chú <a href="https://twitter.com/biilmann">Matt Biilmann</a> chia sẽ về quan điểm về Redux sau khi làm cái dashboard cho Netlify trong bài phỏng vấn <a href="http://www.fullstackradio.com/122">Architecting the Netlify Dashboard with React and Redux</a></p>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code class="language-json">cap_<span class="token number">1</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    cap_<span class="token number">2</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        cap_<span class="token number">3</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<blockquote>\n<p>Rất khó để sync dữ liệu ở dạng lồng ghép như vậy.</p>\n</blockquote>\n<p>Ví dụ, có danh sách bài viết, mỗi bài viết được nhét thông tin tác giả bên trong, có nhiều bài viết có cùng một tác giả, rồi ngày đẹp trời tác giả này đổi tên, thì chúng ta phải đi sync lại toàn bộ tất cả bài viết của ổng.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> articles <span class="token operator">=</span> <span class="token punctuation">[</span>\n  <span class="token comment">// bài viết này được load trước</span>\n  <span class="token punctuation">{</span>\n    author<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      avatar<span class="token punctuation">:</span> <span class="token string">\'https://picsum.photos/id/1011/25\'</span><span class="token punctuation">,</span>\n      id<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n      name<span class="token punctuation">:</span> <span class="token string">\'Jane Doe\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    id<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n    intro<span class="token punctuation">:</span> <span class="token string">\'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.\'</span><span class="token punctuation">,</span>\n    title<span class="token punctuation">:</span> <span class="token string">\'Lorem Ipsum\'</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token comment">// tác giả đó ổng vô đổi avatar,</span>\n  <span class="token comment">// rồi chúng ta load thêm bài viết</span>\n  <span class="token comment">// avatar của ổng đã không còn như xưa</span>\n  <span class="token punctuation">{</span>\n    author<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      avatar<span class="token punctuation">:</span> <span class="token string">\'https://picsum.photos/id/2000/25\'</span><span class="token punctuation">,</span>\n      id<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n      name<span class="token punctuation">:</span> <span class="token string">\'Jane Doe\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    id<span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">,</span>\n    intro<span class="token punctuation">:</span> <span class="token string">\'Stet clita kasd gubergren, no sea takimata sanctus est.\'</span><span class="token punctuation">,</span>\n    title<span class="token punctuation">:</span> <span class="token string">\'Dolor sit\'</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">]</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Cách mà chúng ta nên lưu, tách riêng 2 thằng</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> articles <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token number">1</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    author<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n    id<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n    intro<span class="token punctuation">:</span> <span class="token string">\'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.\'</span><span class="token punctuation">,</span>\n    title<span class="token punctuation">:</span> <span class="token string">\'Lorem Ipsum\'</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token number">2</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    author<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n    id<span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">,</span>\n    intro<span class="token punctuation">:</span> <span class="token string">\'Stet clita kasd gubergren, no sea takimata sanctus est.\'</span><span class="token punctuation">,</span>\n    title<span class="token punctuation">:</span> <span class="token string">\'Dolor sit\'</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> authors <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token number">1</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    avatar<span class="token punctuation">:</span> <span class="token string">\'https://picsum.photos/id/2000/25\'</span><span class="token punctuation">,</span>\n    id<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n    name<span class="token punctuation">:</span> <span class="token string">\'Jane Doe\'</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Những kiểu thực thể khác nhau, chúng ta tách ra thành các module riêng biệt, dùng khái niệm <strong>foreign key</strong> (khóa ngoại) như trong database</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">// src/store/modules/article.js</span>\n<span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">\'vue\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">import</span> <span class="token punctuation">{</span> normalizeRelations<span class="token punctuation">,</span> resolveRelations <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'../helpers\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> articleService <span class="token keyword">from</span> <span class="token string">\'../../services/article\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token punctuation">{</span>\n  byId<span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>\n  allIds<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> getters <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">// trả về một article với giá trị id được truyền vào</span>\n  <span class="token function-variable function">find</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> _<span class="token punctuation">,</span> __<span class="token punctuation">,</span> rootGetters</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token parameter">id</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token comment">// dùng ID để lấy thông tin tác giả</span>\n    <span class="token keyword">return</span> <span class="token function">resolveRelations</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span>byId<span class="token punctuation">[</span>id<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">\'author\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> rootGetters<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token comment">// trả về danh sách articles</span>\n  <span class="token function-variable function">list</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> getters</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> state<span class="token punctuation">.</span>allIds<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">id</span> <span class="token operator">=></span> getters<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> actions <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token function-variable function">load</span><span class="token punctuation">:</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> commit <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> articles <span class="token operator">=</span> <span class="token keyword">await</span> articleService<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    articles<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">\'add\'</span><span class="token punctuation">,</span> <span class="token function">normalizeRelations</span><span class="token punctuation">(</span>item<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">\'author\'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token comment">// thêm hoặc update order</span>\n      <span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">\'author/add\'</span><span class="token punctuation">,</span> item<span class="token punctuation">.</span>author<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n        root<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> mutations <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token function-variable function">add</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> item</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    Vue<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>state<span class="token punctuation">.</span>byId<span class="token punctuation">,</span> item<span class="token punctuation">.</span>id<span class="token punctuation">,</span> item<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>state<span class="token punctuation">.</span>allIds<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>\n    state<span class="token punctuation">.</span>allIds<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  actions<span class="token punctuation">,</span>\n  getters<span class="token punctuation">,</span>\n  mutations<span class="token punctuation">,</span>\n  namespaced<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n  state<span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">// src/store/helpers.js</span>\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">normalizeRelations</span><span class="token punctuation">(</span><span class="token parameter">data<span class="token punctuation">,</span> fields</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>\n    <span class="token operator">...</span>data<span class="token punctuation">,</span>\n    <span class="token operator">...</span>fields<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">prev<span class="token punctuation">,</span> field</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n      <span class="token operator">...</span>prev<span class="token punctuation">,</span>\n      <span class="token punctuation">[</span>field<span class="token punctuation">]</span><span class="token punctuation">:</span> Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>data<span class="token punctuation">[</span>field<span class="token punctuation">]</span><span class="token punctuation">)</span>\n        <span class="token operator">?</span> data<span class="token punctuation">[</span>field<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">x</span> <span class="token operator">=></span> x<span class="token punctuation">.</span>id<span class="token punctuation">)</span>\n        <span class="token punctuation">:</span> data<span class="token punctuation">[</span>field<span class="token punctuation">]</span><span class="token punctuation">.</span>id<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">resolveRelations</span><span class="token punctuation">(</span><span class="token parameter">data<span class="token punctuation">,</span> fields<span class="token punctuation">,</span> rootGetters</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>\n    <span class="token operator">...</span>data<span class="token punctuation">,</span>\n    <span class="token operator">...</span>fields<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">prev<span class="token punctuation">,</span> field</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n      <span class="token operator">...</span>prev<span class="token punctuation">,</span>\n      <span class="token punctuation">[</span>field<span class="token punctuation">]</span><span class="token punctuation">:</span> Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>data<span class="token punctuation">[</span>field<span class="token punctuation">]</span><span class="token punctuation">)</span>\n        <span class="token operator">?</span> data<span class="token punctuation">[</span>field<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">x</span> <span class="token operator">=></span> rootGetters<span class="token punctuation">[</span><span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>field<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/find`</span></span><span class="token punctuation">]</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">)</span>\n        <span class="token punctuation">:</span> rootGetters<span class="token punctuation">[</span><span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>field<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/find`</span></span><span class="token punctuation">]</span><span class="token punctuation">(</span>data<span class="token punctuation">[</span>field<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Sử dụng</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ArticleList</span> <span class="token attr-name">:articles</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>articles<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n<span class="token comment">// src/App.vue</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> mapActions<span class="token punctuation">,</span> mapGetters <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'vuex\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">import</span> ArticleList <span class="token keyword">from</span> <span class="token string">\'./components/ArticleList\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  name<span class="token punctuation">:</span> <span class="token string">\'App\'</span><span class="token punctuation">,</span>\n  components<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    ArticleList<span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  computed<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    <span class="token operator">...</span><span class="token function">mapGetters</span><span class="token punctuation">(</span><span class="token string">\'article\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> articles<span class="token punctuation">:</span> <span class="token string">\'list\'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token function">created</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">loadArticles</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  methods<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    <span class="token operator">...</span><span class="token function">mapActions</span><span class="token punctuation">(</span><span class="token string">\'article\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> loadArticles<span class="token punctuation">:</span> <span class="token string">\'load\'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Trong component <code class="language-text">App.vue</code> chúng ta lấy các getter và action trong <code class="language-text">article</code> module, khi vừa khởi tạo component, gọi action <code class="language-text">loadArticle</code> để lấy dữ liệu</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>ArticleList<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span>\n      <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>article in articles<span class="token punctuation">"</span></span>\n      <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>article.id<span class="token punctuation">"</span></span>\n    <span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span>{{ article.title }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>{{ article.intro }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>ArticleList__author<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>ArticleList__avatar<span class="token punctuation">"</span></span> <span class="token attr-name">:src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>article.author.avatar<span class="token punctuation">"</span></span> <span class="token attr-name">:alt</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>article.author.name<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n        {{ article.author.name }}\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  name<span class="token punctuation">:</span> <span class="token string">\'ArticleList\'</span><span class="token punctuation">,</span>\n  props<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    articles<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      required<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n      type<span class="token punctuation">:</span> Array<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Nhờ vào các hàm getter và <code class="language-text">resolveRelations()</code>, chúng ta có thể dễ dàng truy cập author của từng article</p>\n<p><a target="_blank" rel="noopener noreferrer" href="https://markus.oberlehner.net/blog/make-your-vuex-state-flat-state-normalization-with-vuex/">📜 Make your Vuex State Flat: State Normalization with Vuex</a></p>',
timeToRead:4,excerpt:"Đầu tiên chúng ta cần trả lời câu hỏi  global state  có phải là phương thuốc chữa  bá bệnh  cho các vấn đề liên quan tới  ? Mình chỉ đưa dữ…",frontmatter:{title:"Sử dụng flat state trong Vue Store",cover:"https://alligator.io/images/vuejs/testing-vue-with-jest.png",date:"2019-10-12",category:null,tags:["vuejs"],desc:"Nhét những tập dữ liệu lớn trong Vuex store, đặc biệt là các cấu trúc dữ liệu lồng nhau luôn gây ra vấn đề không sớm thì muộn. Bài viết giới thiệu cách tiếp cận với flat state trong Vuex store"},fields:{slug:"/2019-10-12-flat-state-trong-vue-store-de-toi-uu-toc-do"}}},pathContext:{slug:"/2019-10-12-flat-state-trong-vue-store-de-toi-uu-toc-do",prev:{frontmatter:{title:"Viết câu điều kiện tốt hơn trong javascript",desc:"Xem xét một trong những câu lệnh được sử dụng nhiều nhất trong lập trình: câu điều kiện",type:"post",category:null,tags:["vuejs"],date:"2019-10-13",cover:""},fields:{slug:"/2019-10-13-viet-cau-dieu-kien-trong-javascript"}},next:{frontmatter:{title:"Viết Unit Test cho Vue component cho người mới bắt đầu",desc:"Cái nhìn về unit test cho component, test cái gì, cái gì không test khi viết unit test",type:"post",category:null,tags:["vuejs"],date:"2019-10-05",cover:"https://alligator.io/images/vuejs/testing-vue-with-jest.png"},fields:{slug:"/2019-10-05-viet-unit-test-cho-vue-component-cho-nguoi-moi-bat-dau"}}}}}});
//# sourceMappingURL=path---2019-10-12-flat-state-trong-vue-store-de-toi-uu-toc-do-1d3a4f3ccfb48ff2f488.js.map