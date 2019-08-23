webpackJsonp([90821060857899],{1425:function(n,s){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#merge-object">Merge object</a></li>\n<li><a href="#th%C3%AAm-property">Thêm property</a></li>\n<li><a href="#th%C3%AAm-property-khi-th%C3%B5a-%C4%91i%E1%BB%81u-ki%E1%BB%87n">Thêm property khi thõa điều kiện</a></li>\n<li><a href="#x%C3%B3a-property-kh%E1%BB%8Fi-object">Xóa property khỏi object</a></li>\n<li><a href="#x%C3%B3a-property-v%E1%BB%9Bi-key-ch%E1%BB%89-%C4%91%E1%BB%8Bnh">Xóa property với key chỉ định</a></li>\n<li><a href="#s%E1%BA%AFp-x%E1%BA%BFp-property">Sắp xếp property</a></li>\n<li><a href="#property-m%E1%BA%B7c-%C4%91%E1%BB%8Bnh">Property mặc định</a></li>\n<li><a href="#%C4%91%E1%BB%95i-t%C3%AAn-property">Đổi tên property</a></li>\n</ul>\n<!-- /TOC -->\n<h2 id="merge-object"><a href="#merge-object" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Merge object</h2>\n<p><code class="language-text">part1</code> và <code class="language-text">part2</code> sẽ được merge vào <code class="language-text">user1</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> part1 <span class="token operator">=</span> <span class="token punctuation">{</span> id<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token string">\'An Luu\'</span> <span class="token punctuation">}</span>\n<span class="token keyword">const</span> part2 <span class="token operator">=</span> <span class="token punctuation">{</span> id<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span> password<span class="token punctuation">:</span> <span class="token string">\'Password!\'</span> <span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> user1 <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token operator">...</span>part1<span class="token punctuation">,</span> <span class="token operator">...</span>part2 <span class="token punctuation">}</span>\n<span class="token comment">//=> { id: 100, name: \'An Luu\', password: \'Password!\' }</span></code></pre>\n      </div>\n<h2 id="thêm-property"><a href="#th%C3%AAm-property" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Thêm property</h2>\n<p>Clone một object đồng thời thêm một số property mới vào object mới clone</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token punctuation">{</span> id<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token string">\'An Luu\'</span><span class="token punctuation">}</span>\n<span class="token keyword">const</span> userWithPass <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token operator">...</span>user<span class="token punctuation">,</span> password<span class="token punctuation">:</span> <span class="token string">\'Password!\'</span> <span class="token punctuation">}</span>\n\nuser <span class="token comment">//=> { id: 100, name: \'An Luu\' }</span>\nuserWithPass <span class="token comment">//=> { id: 100, name: \'An Luu\', password: \'Password!\' }</span></code></pre>\n      </div>\n<h2 id="thêm-property-khi-thõa-điều-kiện"><a href="#th%C3%AAm-property-khi-th%C3%B5a-%C4%91i%E1%BB%81u-ki%E1%BB%87n" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Thêm property khi thõa điều kiện</h2>\n<p>Trường hợp này hay dùng nhất là lúc chúng ta truyền lên API một object, nếu thõa điều kiện, sẽ thêm một số property vào trong object</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token punctuation">{</span> id<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token string">\'An Luu\'</span> <span class="token punctuation">}</span>\n<span class="token keyword">const</span> password <span class="token operator">=</span> <span class="token string">\'Password!\'</span>\n<span class="token keyword">const</span> userWithPassword <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token operator">...</span>user<span class="token punctuation">,</span>\n  id<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span>\n  <span class="token operator">...</span><span class="token punctuation">(</span>password <span class="token operator">&amp;&amp;</span> <span class="token punctuation">{</span> password <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\nuserWithPassword <span class="token comment">//=> { id: 100, name: \'An Luu\', password: \'Password!\' }</span></code></pre>\n      </div>\n<h2 id="xóa-property-khỏi-object"><a href="#x%C3%B3a-property-kh%E1%BB%8Fi-object" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Xóa property khỏi object</h2>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">// hàm này sẽ trả về object mới ko bao gồm password</span>\n<span class="token keyword">const</span> <span class="token function-variable function">noPassword</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> password<span class="token punctuation">,</span> <span class="token operator">...</span>rest <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> rest\n\n<span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>\n  id<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span>\n  name<span class="token punctuation">:</span> <span class="token string">\'An Luu\'</span><span class="token punctuation">,</span>\n  password<span class="token punctuation">:</span> <span class="token string">\'Password!\'</span>\n<span class="token punctuation">}</span>\n\n<span class="token function">noPassword</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span> <span class="token comment">//=> { id: 100, name: \'An Luu\' }</span></code></pre>\n      </div>\n<h2 id="xóa-property-với-key-chỉ-định"><a href="#x%C3%B3a-property-v%E1%BB%9Bi-key-ch%E1%BB%89-%C4%91%E1%BB%8Bnh" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Xóa property với key chỉ định</h2>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> user1 <span class="token operator">=</span> <span class="token punctuation">{</span>\n  id<span class="token punctuation">:</span> <span class="token number">100</span><span class="token punctuation">,</span>\n  name<span class="token punctuation">:</span> <span class="token string">\'An Luu\'</span><span class="token punctuation">,</span>\n  password<span class="token punctuation">:</span> <span class="token string">\'Password!\'</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">removeProperty</span> <span class="token operator">=</span> <span class="token parameter">prop</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> <span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">:</span> _<span class="token punctuation">,</span> <span class="token operator">...</span>rest <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> rest\n<span class="token comment">//                     ----       ------</span>\n<span class="token comment">//                          \\   /</span>\n<span class="token comment">//                dynamic destructuring</span>\n\n<span class="token keyword">const</span> removePassword <span class="token operator">=</span> <span class="token function">removeProperty</span><span class="token punctuation">(</span><span class="token string">\'password\'</span><span class="token punctuation">)</span>\n<span class="token keyword">const</span> removeId <span class="token operator">=</span> <span class="token function">removeProperty</span><span class="token punctuation">(</span><span class="token string">\'id\'</span><span class="token punctuation">)</span>\n\n<span class="token function">removePassword</span><span class="token punctuation">(</span>user1<span class="token punctuation">)</span> <span class="token comment">//=> { id: 100, name: \'An Luu\' }</span>\n<span class="token function">removeId</span><span class="token punctuation">(</span>user1<span class="token punctuation">)</span> <span class="token comment">//=> { name: \'An Luu\', password: \'Password!\' }</span></code></pre>\n      </div>\n<h2 id="sắp-xếp-property"><a href="#s%E1%BA%AFp-x%E1%BA%BFp-property" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Sắp xếp property</h2>\n<p>Đôi khi chúng ta sẽ muốn thay đổi các property theo một thứ tự nào đó, nếu sắp xếp toàn bộ luôn thì chắc dùng <code class="language-text">Object.keys</code> rồi thay xếp cái mảng key này lại.</p>\n<p>Để di chuyển <code class="language-text">id</code> lên đầu, trước hết gán giá trị <code class="language-text">undefined</code> cho nó trước, sau đó, override lại giá trị này bằng cách resting</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> user3 <span class="token operator">=</span> <span class="token punctuation">{</span>\n  password<span class="token punctuation">:</span> <span class="token string">\'Password!\'</span><span class="token punctuation">,</span>\n  name<span class="token punctuation">:</span> <span class="token string">\'An Luu\'</span><span class="token punctuation">,</span>\n  id<span class="token punctuation">:</span> <span class="token number">300</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">organize</span> <span class="token operator">=</span> <span class="token parameter">object</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span> id<span class="token punctuation">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token operator">...</span>object <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token comment">//                            -------------</span>\n<span class="token comment">//                          /</span>\n<span class="token comment">//  dời id lên đầu</span>\n\n<span class="token function">organize</span><span class="token punctuation">(</span>user3<span class="token punctuation">)</span>\n<span class="token comment">//=> { id: 300, password: \'Password!\', name: \'An Luu\' }</span></code></pre>\n      </div>\n<p>Còn di chuyển xuống dưới cùng</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> user3 <span class="token operator">=</span> <span class="token punctuation">{</span>\n  password<span class="token punctuation">:</span> <span class="token string">\'Password!\'</span><span class="token punctuation">,</span>\n  name<span class="token punctuation">:</span> <span class="token string">\'An Luu\'</span><span class="token punctuation">,</span>\n  id<span class="token punctuation">:</span> <span class="token number">300</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">organize</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> password<span class="token punctuation">,</span> <span class="token operator">...</span>object <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span>\n  <span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token operator">...</span>object<span class="token punctuation">,</span> password <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token comment">//              --------</span>\n<span class="token comment">//             /</span>\n<span class="token comment">// dời password xuống cuối</span>\n\n<span class="token function">organize</span><span class="token punctuation">(</span>user3<span class="token punctuation">)</span>\n<span class="token comment">//=> { name: \'An Luu\', id: 300, password: \'Password!\' }</span></code></pre>\n      </div>\n<h2 id="property-mặc-định"><a href="#property-m%E1%BA%B7c-%C4%91%E1%BB%8Bnh" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Property mặc định</h2>\n<p>Ví dụ, <code class="language-text">user2</code> không có chứa <code class="language-text">quotes</code>, hàm <code class="language-text">setDefaults</code> đảm bảo tất cả object đều chứa property là <code class="language-text">quotes</code>, nếu ko nó thêm vào <code class="language-text">[]</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> user2 <span class="token operator">=</span> <span class="token punctuation">{</span>\n  id<span class="token punctuation">:</span> <span class="token number">200</span><span class="token punctuation">,</span>\n  name<span class="token punctuation">:</span> <span class="token string">\'An Luu\'</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> user4 <span class="token operator">=</span> <span class="token punctuation">{</span>\n  id<span class="token punctuation">:</span> <span class="token number">400</span><span class="token punctuation">,</span>\n  name<span class="token punctuation">:</span> <span class="token string">\'You\'</span><span class="token punctuation">,</span>\n  quotes<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"I\'ve got a good feeling about this..."</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">setDefaults</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> quotes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token operator">...</span>object<span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span>\n  <span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token operator">...</span>object<span class="token punctuation">,</span> quotes <span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token comment">// hoặc nếu muốn dời thằng quotes lên đầu</span>\n<span class="token comment">// const setDefaults = ({ ...object}) => ({ quotes: [], ...object })</span>\n\n<span class="token function">setDefaults</span><span class="token punctuation">(</span>user2<span class="token punctuation">)</span>\n<span class="token comment">//=> { id: 200, name: \'An Luu\', quotes: [] }</span>\n\n<span class="token function">setDefaults</span><span class="token punctuation">(</span>user4<span class="token punctuation">)</span>\n<span class="token comment">//=> {</span>\n<span class="token comment">//=>   id: 400,</span>\n<span class="token comment">//=>   name: \'You\',</span>\n<span class="token comment">//=>   quotes: ["I\'ve got a good feeling about this..."]</span>\n<span class="token comment">//=> }</span></code></pre>\n      </div>\n<h2 id="đổi-tên-property"><a href="#%C4%91%E1%BB%95i-t%C3%AAn-property" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Đổi tên property</h2>\n<p>Thí dụ bạn ko muốn trong object chứa property <code class="language-text">ID</code>, nó phải viết thường <code class="language-text">id</code>, đầu tiên chúng ta remove ID ra khỏi object, sau đó add lại bằng tên là <code class="language-text">id</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">renamed</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> <span class="token constant">ID</span><span class="token punctuation">,</span> <span class="token operator">...</span>object <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span> id<span class="token punctuation">:</span> <span class="token constant">ID</span><span class="token punctuation">,</span> <span class="token operator">...</span>object <span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token constant">ID</span><span class="token punctuation">:</span> <span class="token number">500</span><span class="token punctuation">,</span>\n  name<span class="token punctuation">:</span> <span class="token string">"An Luu"</span>\n<span class="token punctuation">}</span>\n\n<span class="token function">renamed</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span> <span class="token comment">//=> { id: 500, name: \'An Luu\' }</span></code></pre>\n      </div>\n<p><a target="_blank" rel="noopener noreferrer" href="https://blog.bitsrc.io/6-tricks-with-resting-and-spreading-javascript-objects-68d585bdc83">7 Tricks with Resting and Spreading JavaScript Objects</a></p>',timeToRead:4,excerpt:"Merge object Thêm property Thêm property khi thõa điều kiện Xóa property khỏi object Xóa property với key chỉ định Sắp xếp property Property…",frontmatter:{title:"8 thủ thuật khi làm việc với Object sử dụng resting và spreading",cover:"",date:"2019-03-23",category:null,tags:["react"],desc:"Những đoạn code bỏ túi hay xài nhất khi đụng tới object"},fields:{slug:"/2019-03-23-thu-thuat-lam-viec-voi-object"}}},pathContext:{slug:"/2019-03-23-thu-thuat-lam-viec-voi-object",prev:{frontmatter:{title:"Ràng buộc dữ liệu input với HTML5",desc:"Vì form quá phức tạp, chúng ta cần thêm một bài viết nữa về validation với html",type:"post",category:null,tags:["mobile-web-specialist"],date:"2019-03-25",cover:""},fields:{slug:"/2019-03-25-rang-buoc-du-lieu-voi-html-5"}},next:{frontmatter:{title:"Tạo React Boilerplate - Từ a tới z",desc:"Một ngày nào đó bạn ko muốn dùng create-react-app để khởi tạo project nữa, thì đây chính là bài hướng dẫn bạn cần đọc: setup một project từ a tới z mà không dùng create-react-app",type:"post",category:null,tags:["react"],date:"2019-03-19",cover:""},fields:{slug:"/2019-03-19-huong-dan-setup-react-app-tu-a-toi-z"}}}}}});
//# sourceMappingURL=path---2019-03-23-thu-thuat-lam-viec-voi-object-e4c453c5d824a5a40b07.js.map