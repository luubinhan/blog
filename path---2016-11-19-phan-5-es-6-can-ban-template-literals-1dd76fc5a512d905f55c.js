webpackJsonp([72627379616066],{494:function(n,s){n.exports={data:{markdownRemark:{html:'<p>Trong Series này</p>\n<ol>\n<li><a href="2016-11-15-chuong-1-es6-can-ban">Nâng cấp cho Object</a></li>\n<li><a href="2016-11-16-chuong-2-es6-can-ban-arrow-function/">Arrow function</a></li>\n<li><a href="2016-11-17-phan-3-es6-can-ban-assignment-destructuring">Assignment Destruction</a></li>\n<li><a href="2016-11-18-phan-4-es6-can-ban-rest-parameters-va-spread-operator">Rest parameters và spread operator</a></li>\n<li><a href="2016-11-19-phan-5-es6-can-ban-template-literals">Template literals</a></li>\n<li><a href="2016-11-20-phan-6-es6-can-ban-khai-bao-let-const">Khai báo biến với let và const</a></li>\n<li><a href="2016-11-21-phan-7-es6-can-ban-classes">Căn bản class</a></li>\n</ol>\n<p>Khai báo một kiểu <code class="language-text">template literal</code>, đặt giữa dấu <code><code class="language-text"></code></code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> text  <span class="token operator">=</span> <span class="token template-string"><span class="token string">`First template literal`</span></span></code></pre>\n      </div>\n<p>Với template literals, mình có thể chèn giữa chuỗi đó một đoạn <em>code javascript</em></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> name  <span class="token operator">=</span> <span class="token template-string"><span class="token string">`AnLuu`</span></span>\n<span class="token keyword">var</span> text <span class="token operator">=</span> <span class="token operator">&lt;</span>code<span class="token operator">></span>Hello<span class="token punctuation">,</span> <span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">!&lt;/code>`</span></span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span>\n<span class="token comment">// result: Hello, AnLuu</span></code></pre>\n      </div>\n<p>Các biến số sử dụng trong phải template literal phải được khai báo trước template literal. Thêm một ví dụ khác</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token template-string"><span class="token string">`The time and date is </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toLocalString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span>\n<span class="token template-string"><span class="token string">`The result of 2+3 equals </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">3</span> <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span></code></pre>\n      </div>\n<p>Mình có thể lồng code trong code</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token template-string"><span class="token string">`This a template literal </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> `<span class="token keyword">with</span> another <span class="token operator">%</span><span class="token punctuation">{</span> <span class="token string">\'one\'</span> <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> embeded inside it`</span></span><span class="token punctuation">}</span>`</code></pre>\n      </div>\n<p>Multiline Srring</p>\n<p>Để có nhiều dòng trong javascript string, trước ES6 có mấy cách làm như sau</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> multilineString <span class="token operator">=</span>\n    <span class="token string">\'The first line\\n\\\n    A second line\\n\\\n    Then a third line\'</span>\n\n<span class="token keyword">var</span> multilineString <span class="token operator">=</span>\n    <span class="token string">\'The first line\\n\'</span> <span class="token operator">+</span>\n    \'<span class="token constant">A</span> second line\\n <span class="token operator">+</span>\n    <span class="token string">\'Then a third line\'</span>\n\n<span class="token keyword">var</span> multilineString <span class="token operator">=</span> <span class="token punctuation">[</span>\n    <span class="token string">\'The first line\'</span><span class="token punctuation">,</span>\n    <span class="token string">\'A second line\'</span><span class="token punctuation">,</span>\n    <span class="token string">\'Then a third line\'</span>\n<span class="token punctuation">]</span><span class="token punctuation">.</span>join<span class="token punctuation">[</span><span class="token string">\'\\n\'</span><span class="token punctuation">]</span></code></pre>\n      </div>\n<p>Với ES6, đơn giản là mình gõ Enter như bình thường</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> multilineString <span class="token operator">=</span>\n<span class="token template-string"><span class="token string">`The first line\nThe second line\nThen a third line`</span></span></code></pre>\n      </div>\n<p>Cực kỳ hữu ích khi cần phải chèn một đoạn HTML như sau</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> book <span class="token operator">=</span> <span class="token punctuation">{</span>\n    title<span class="token punctuation">:</span> <span class="token string">\'Module ES6\'</span><span class="token punctuation">,</span>\n    excerpt<span class="token punctuation">:</span> <span class="token string">\'Here goes some properly sanitized HTML\'</span><span class="token punctuation">,</span>\n    tags<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'es6\'</span><span class="token punctuation">,</span><span class="token string">\'template-literals\'</span><span class="token punctuation">,</span><span class="token string">\'es6-in-depth\'</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">var</span> html <span class="token operator">=</span> <span class="token template-string"><span class="token string">`&lt;article>\n    &lt;header>\n        &lt;h1></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> book<span class="token punctuation">.</span>title <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/h1>\n    &lt;/header>\n    &lt;section> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> book<span class="token punctuation">.</span>excerpt<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/section>\n    &lt;footer>\n&lt;ul>\n</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>\nbook<span class="token punctuation">.</span>tags<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span> tag <span class="token operator">=></span> <span class="token operator">&lt;</span>code<span class="token operator">></span>\n    <span class="token operator">&lt;</span>li<span class="token operator">></span> $<span class="token punctuation">{</span>tag<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/li>\n&lt;/code>)\n.join(\'\\n\')\n}&lt;/ul>\n&lt;/footer>\n&lt;/article>`</span></span></code></pre>\n      </div>\n<p>Tagged templates</p>\n<p>Bình thường sau ký tự <code class="language-text">\\</code> là một ký tự đặc biệt nào đó, ví dụ \\n để thêm dòng mới, nếu không muốn có giá kết quả này mà chỉ muốn xuất ra đúng ký tự \\n, dùng hàm String.raw</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> text <span class="token operator">=</span> String<span class="token punctuation">.</span>raw<span class="token template-string"><span class="token string">`The "\\n" new line won\'t result in a new line. It\'ll be escapted`</span></span></code></pre>\n      </div>\n<p>Với một template literal như Hello, ${ name }. I am ${ emotion } to meet you! ,  tương tự như khi viết bằng tagged template</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js">    <span class="token function">tag</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">\'Hello,\'</span><span class="token punctuation">,</span><span class="token string">\'. I am\'</span><span class="token punctuation">,</span> <span class="token string">\'to meet you!\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">\'Maurice\'</span><span class="token punctuation">,</span><span class="token string">\'thrilled\'</span><span class="token punctuation">)</span></code></pre>\n      </div>',timeToRead:2,excerpt:"Trong Series này Nâng cấp cho Object Arrow function Assignment Destruction Rest parameters và spread operator Template literals Khai báo…",frontmatter:{title:"Hồi 5: ES6 căn bản - Template literals",cover:"",date:"2016-11-19",category:"javascript",tags:["javascript"],desc:"Hồi 5 trong series ES6 căn bản, nói về Template literals, một nâng cấp lớn cho string"},fields:{slug:"/2016-11-19-phan-5-es-6-can-ban-template-literals"}}},pathContext:{slug:"/2016-11-19-phan-5-es-6-can-ban-template-literals"}}}});
//# sourceMappingURL=path---2016-11-19-phan-5-es-6-can-ban-template-literals-1dd76fc5a512d905f55c.js.map