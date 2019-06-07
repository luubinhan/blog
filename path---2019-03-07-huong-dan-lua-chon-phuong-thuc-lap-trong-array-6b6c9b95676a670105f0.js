webpackJsonp([0xdf1a72f7c801],{1413:function(n,s){n.exports={data:{markdownRemark:{html:'<ul>\n<li>for (let i = 0; i &#x3C; arr.length; ++i)</li>\n<li>arr.forEach((v, i) => { /* ….. */})</li>\n<li>for (let i in arr)</li>\n<li>for (const v of arr)</li>\n</ul>\n<p>2 phương thức là <code class="language-text">for</code> và <code class="language-text">for/in</code> cho phép chúng ta truy cập đến giá trị index trong array, ko phải giá trị của element trong array</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">\'a\'</span><span class="token punctuation">,</span> <span class="token string">\'b\'</span><span class="token punctuation">,</span> <span class="token string">\'c\'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token comment">// sau đó chúng ta dùng truy cập element bằng giá trị index</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">in</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Trong khi đó hai phương thức <code class="language-text">for/of</code> và <code class="language-text">forEach</code> sẽ truy xuất đến phần tử trong element, cũng có thể truy xuất vào index, nếu thích.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js">arr<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">v<span class="token punctuation">,</span> i</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> v <span class="token keyword">of</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Có thể bạn chưa biết, array trong javascript cũng là một dạng <em>đặc biệt</em> của object, chúng ta có thể gán một property cho nó</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">\'a\'</span><span class="token punctuation">,</span> <span class="token string">\'b\'</span><span class="token punctuation">,</span> <span class="token string">\'c\'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> arr<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \'object\'</span>\n\narr<span class="token punctuation">.</span>test <span class="token operator">=</span> <span class="token string">\'bad\'</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">.</span>test<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// bad</span>\n\narr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">===</span> arr<span class="token punctuation">[</span><span class="token string">\'1\'</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// true, </span></code></pre>\n      </div>\n<p>Nếu loop qua bằng 4 phương thức trên, chỉ duy nhất thằng <code class="language-text">for/in</code> sẽ chạy qua</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">\'a\'</span><span class="token punctuation">,</span> <span class="token string">\'b\'</span><span class="token punctuation">,</span> <span class="token string">\'c\'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\narr<span class="token punctuation">.</span>test <span class="token operator">=</span> <span class="token string">\'bad\'</span><span class="token punctuation">;</span>\n\n<span class="token comment">// "a, b, c, bad"</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">in</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Đó là lý do tại sao chúng ta ko nên dùng <code class="language-text">for/in</code> để loop qua array</p>\n<p>Đối với một element <strong>trống</strong> như thế này</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">\'a\'</span><span class="token punctuation">,</span><span class="token punctuation">,</span><span class="token string">\'b\'</span><span class="token punctuation">]</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span></code></pre>\n      </div>\n<p>Không chỉ vậy thôi đâu, nếu loop qua mảng <code class="language-text">[&#39;a&#39;,,&#39;b&#39;]</code> nó cũng sẽ khác với <code class="language-text">[&#39;a&#39;, undefined, &#39;c&#39;]. 2 thằng</code>for/in<code class="language-text">và</code>for/each<code class="language-text">sẽ bỏ qua phần tử trống như vậy, nhưng</code>for<code class="language-text">và</code>for/of` vẫn tính</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">\'a\'</span><span class="token punctuation">,</span><span class="token punctuation">,</span> <span class="token string">\'c\'</span><span class="token punctuation">]</span>\n<span class="token comment">// Prints "a, undefined, c"</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// Prints "a, c"</span>\narr<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// Prints "a, c"</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token keyword">in</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// Prints "a, undefined, c"</span>\n<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> v <span class="token keyword">of</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Tuy nhiên, nếu là <code class="language-text">[&#39;a&#39;, undefined, &#39;c&#39;]</code>, cả 4 phương thức trên đề print hết giá trị trong array.</p>\n<p>Một cách để chèn phần tử trống vào array</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">\'a\'</span><span class="token punctuation">,</span> <span class="token string">\'b\'</span><span class="token punctuation">,</span> <span class="token string">\'c\'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\narr<span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">\'e\'</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Tuy nhiên là trường hợp <code class="language-text">[a, , c]</code> này sẽ rất rất ít khi xảy ra, vì căn bản là file JSON như thế là không hợp lệ. Chúng ta cũng không cần lo lắng lắm</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token operator">></span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">\'{"arr":["a","b","c"]}\'</span><span class="token punctuation">)</span>\n<span class="token punctuation">{</span> arr<span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">\'a\'</span><span class="token punctuation">,</span> <span class="token string">\'b\'</span><span class="token punctuation">,</span> <span class="token string">\'c\'</span> <span class="token punctuation">]</span> <span class="token punctuation">}</span>\n<span class="token operator">></span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">\'{"arr":["a",null,"c"]}\'</span><span class="token punctuation">)</span>\n<span class="token punctuation">{</span> arr<span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">\'a\'</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">\'c\'</span> <span class="token punctuation">]</span> <span class="token punctuation">}</span>\n<span class="token operator">></span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">\'{"arr":["a",,"c"]}\'</span><span class="token punctuation">)</span>\nSyntaxError<span class="token punctuation">:</span> Unexpected token <span class="token punctuation">,</span> <span class="token keyword">in</span> <span class="token constant">JSON</span> at position <span class="token number">12</span></code></pre>\n      </div>\n<p>Với từ khóa <code class="language-text">this</code>, <code class="language-text">for</code>, <code class="language-text">for/in</code>, <code class="language-text">for/of</code> sẽ dùng chung scope với thằng cha, trong khi <code class="language-text">forEach</code> thì nó là scope của nó.</p>\n<p><code class="language-text">forEach</code> cũng xảy ra nhiều tình huống ko đúng khi dùng với <code class="language-text">async/await</code> hoặc <code class="language-text">generator</code>. Code bên dưới là không chạy, không dùng await cho callback của <code class="language-text">forEach</code> cũng như <code class="language-text">yield</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">\'a\'</span><span class="token punctuation">,</span> <span class="token string">\'b\'</span><span class="token punctuation">,</span> <span class="token string">\'c\'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n  arr<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">el</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token comment">// SyntaxError</span>\n    <span class="token keyword">await</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token parameter">resolve</span> <span class="token operator">=></span> <span class="token function">setTimeout</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">\'a\'</span><span class="token punctuation">,</span> <span class="token string">\'b\'</span><span class="token punctuation">,</span> <span class="token string">\'c\'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n  arr<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">el</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token comment">// SyntaxError</span>\n    <span class="token keyword">yield</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token parameter">resolve</span> <span class="token operator">=></span> <span class="token function">setTimeout</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Dùng với <code class="language-text">for/of</code> thì ok</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">asyncFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">\'a\'</span><span class="token punctuation">,</span> <span class="token string">\'b\'</span><span class="token punctuation">,</span> <span class="token string">\'c\'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> el <span class="token keyword">of</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">await</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token parameter">resolve</span> <span class="token operator">=></span> <span class="token function">setTimeout</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">generatorFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">\'a\'</span><span class="token punctuation">,</span> <span class="token string">\'b\'</span><span class="token punctuation">,</span> <span class="token string">\'c\'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> el <span class="token keyword">of</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">yield</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token parameter">resolve</span> <span class="token operator">=></span> <span class="token function">setTimeout</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Túm lại, <code class="language-text">for/of</code> có thể dùng gần như mọi lúc. Mặc dù performance ko bằng <code class="language-text">for</code>, nhưng dễ xài hơn, cũng ko dính nhiều trường hợp đặc biệt như <code class="language-text">for/in</code> và <code class="language-text">forEach</code>. Nếu ko cần dùng đến giá trị index, thì <code class="language-text">for/of</code> sẽ được dùng. Còn nếu muốn truy xuất tới giá trị index với <code class="language-text">for/of</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token punctuation">[</span>i<span class="token punctuation">,</span> v<span class="token punctuation">]</span> <span class="token keyword">of</span> arr<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> v<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Prints "0 a", "1 b", "2 c"</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p><a target="_blank" rel="noopener noreferrer" href="http://thecodebarbarian.com/for-vs-for-each-vs-for-in-vs-for-of-in-javascript.html">For vs forEach() vs for/in vs for/of in JavaScript</a></p>',timeToRead:3,excerpt:"for (let i = 0; i < arr.length; ++i) arr.forEach((v, i) => { /* ….. */}) for (let i in arr) for (const v of arr) 2 phương thức là   và   cho…",frontmatter:{title:"for vs forEach vs for/in vs for/of trong javascript",cover:"",date:"2019-03-07",category:null,tags:["javascript"],desc:"Trong javascript có rất nhiều cách để loop qua một array, chúng ta cùng bàn qua 4 cách chính hay sử dụng nhất"},fields:{slug:"/2019-03-07-huong-dan-lua-chon-phuong-thuc-lap-trong-array"}}},pathContext:{slug:"/2019-03-07-huong-dan-lua-chon-phuong-thuc-lap-trong-array",prev:{frontmatter:{title:"Chrome 73 có gì mới",desc:"Master chrome devtool là cần thiết cho một frontend developer, mình sẽ bắt đầu series cập nhập những tính năng mới nhất của Chrome, theo như lộ trình định sẵn thì cứ 6 tuần nó sẽ có bản cập nhập mới cho Chrome",type:"post",category:null,tags:["chrome"],date:"2019-03-10",cover:""},fields:{slug:"/2019-03-10-chrome-73-co-gi-moi"}},next:{frontmatter:{title:"Không cho phép import với ESlint",desc:"Với ESlint chúng ta có thể cấm import những thư viện lớn, tránh để bà con trong team import tá lả.",type:"post",category:null,tags:["javascript"],date:"2019-02-26",cover:""},fields:{slug:"/2019-02-26-chan-import-bang-eslint"}}}}}});
//# sourceMappingURL=path---2019-03-07-huong-dan-lua-chon-phuong-thuc-lap-trong-array-6b6c9b95676a670105f0.js.map