webpackJsonp([0xc2f5ee5dc0b3],{1308:function(n,s){n.exports={data:{markdownRemark:{html:'<p>Trong Series này</p>\n<ol>\n<li><a href="2016-11-15-chuong-1-es6-can-ban">Nâng cấp cho Object</a></li>\n<li><a href="2016-11-16-chuong-2-es6-can-ban-arrow-function/">Arrow function</a></li>\n<li><a href="2016-11-17-phan-3-es6-can-ban-assignment-destructuring">Assignment Destruction</a></li>\n<li><a href="2016-11-18-phan-4-es6-can-ban-rest-parameters-va-spread-operator">Rest parameters và spread operator</a></li>\n<li><a href="2016-11-19-phan-5-es6-can-ban-template-literals">Template literals</a></li>\n<li><a href="2016-11-20-phan-6-es6-can-ban-khai-bao-let-const">Khai báo biến với let và const</a></li>\n<li><a href="2016-11-21-phan-7-es6-can-ban-classes">Căn bản class</a></li>\n</ol>\n<p><code class="language-text">let</code> dùng để khai báo một biến như <code class="language-text">var</code>, khác nhau ở phạm vi hoạt động (scoping), ví dụ với khai báo <code class="language-text">var</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">function</span> <span class="token function">isItTwo</span><span class="token punctuation">(</span> value <span class="token punctuation">)</span> <span class="token punctuation">{</span>\n <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n  <span class="token keyword">var</span> two <span class="token operator">=</span> <span class="token boolean">true</span>\n <span class="token punctuation">}</span>\n <span class="token keyword">return</span> two\n<span class="token punctuation">}</span>\n<span class="token function">isItTwo</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>\n<span class="token comment">// result: true</span>\n<span class="token function">isItTwo</span><span class="token punctuation">(</span><span class="token string">\'two\'</span><span class="token punctuation">)</span>\n<span class="token comment">// result: undefined</span></code></pre>\n      </div>\n<p>Đoạn khai báo <code class="language-text">var two = true</code> nằm trong điều kiện <code class="language-text">if</code> nhưng vẫn hoạt động, vì khai báo biến bằng từ khóa <code class="language-text">var</code> phạm vi ngầm hiểu là trong cả một <code class="language-text">function</code>, nó giống như viết như sau</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">function</span> <span class="token function">isItTwo</span><span class="token punctuation">(</span> value <span class="token punctuation">)</span> <span class="token punctuation">{</span>\n<span class="token keyword">var</span> two\n <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n  two <span class="token operator">=</span> <span class="token boolean">true</span>\n <span class="token punctuation">}</span>\n <span class="token keyword">return</span> two\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Khai báo biến bằng từ khóa <code class="language-text">var</code> dễ rối so với các ngôn ngữ khác như <code class="language-text">php</code>, khi biến được khai báo thì nó có phạm vi hoạt động <em>"block-scoped"</em></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">for</span> <span class="token punctuation">(</span> <span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>\n console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>\n <span class="token comment">// 0,1</span>\n<span class="token punctuation">}</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>\n<span class="token comment">// result: i is not defined</span></code></pre>\n      </div>\n<p>Khai báo biến bằng từ khóa <code class="language-text">let</code> hay <code class="language-text">const</code> có phạm vi <em>block-scoped</em></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> pi <span class="token operator">=</span> <span class="token number">3.1415</span>\n<span class="token punctuation">{</span>\n  <span class="token keyword">const</span> pi <span class="token operator">=</span> <span class="token number">16</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>pi<span class="token punctuation">)</span>\n  <span class="token comment">// 16</span>\n<span class="token punctuation">}</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>pi<span class="token punctuation">)</span>\n<span class="token comment">// 3.1415</span></code></pre>\n      </div>\n<p>Khi khai báo bằng từ khóa <code class="language-text">const</code> phải có giá trị khởi tạo, không được phép để rỗng như <code class="language-text">let</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> pi <span class="token operator">=</span> <span class="token number">3.1415</span>\n<span class="token keyword">const</span> e<span class="token punctuation">;</span> <span class="token comment">// SyntaxError</span></code></pre>\n      </div>\n<p>Nếu dùng <code class="language-text">const</code> để khai báo biến thì giá trị nó sẽ không được gán mới hoặc khởi tạo lại, nhưng có thể push thêm giá trị vào</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> people <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">\'An\'</span><span class="token punctuation">,</span><span class="token string">\'Luu\'</span><span class="token punctuation">]</span>\npeople <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>people<span class="token punctuation">)</span>\n<span class="token comment">// Result: [\'An\',\'Luu\']</span>\npeople<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token string">\'Binh\'</span><span class="token punctuation">)</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>people<span class="token punctuation">)</span>\n<span class="token comment">// Result[\'An\',\'Luu\',\'Binh\']</span></code></pre>\n      </div>',timeToRead:2,excerpt:"Trong Series này Nâng cấp cho Object Arrow function Assignment Destruction Rest parameters và spread operator Template literals Khai báo…",frontmatter:{title:"Hồi 6: ES6 căn bản - Khai báo biến với let và const",cover:"",date:"2016-11-20",category:"javascript",tags:["javascript"],desc:"Hồi 6 trong series ES6 căn bản, nói về khai báo biến với let và const"},fields:{slug:"/2016-11-20-phan-6-es-6-can-ban-khai-bao-let-const"}}},pathContext:{slug:"/2016-11-20-phan-6-es-6-can-ban-khai-bao-let-const",prev:{frontmatter:{title:"Hồi 7: ES6 căn bản - Classes",desc:"Hồi 7 trong series ES6 căn bản, Javascript vốn là ngôn ngữ prototype, class không phải là cái gì đó mới mẻ trong javascript",type:"post",category:"javascript",tags:["javascript"],date:"2016-11-21",cover:""},fields:{slug:"/2016-11-21-phan-7-es-6-can-ban-classes"}},next:{frontmatter:{title:"Hồi 5: ES6 căn bản - Template literals",desc:"Hồi 5 trong series ES6 căn bản, nói về Template literals, một nâng cấp lớn cho string",type:"post",category:"javascript",tags:["javascript"],date:"2016-11-19",cover:""},fields:{slug:"/2016-11-19-phan-5-es-6-can-ban-template-literals"}}}}}});
//# sourceMappingURL=path---2016-11-20-phan-6-es-6-can-ban-khai-bao-let-const-a0c954def7140a74f0f9.js.map