webpackJsonp([55781739353652],{1527:function(n,s){n.exports={data:{markdownRemark:{html:'<p>Một trong những khái niệm quan trọng của Vue là computed property.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n        firstName<span class="token punctuation">:</span>  <span class="token string">\'John\'</span><span class="token punctuation">,</span>\n        lastName<span class="token punctuation">:</span> <span class="token string">\'Doe\'</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span>\ncomputed<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    <span class="token function">fullName</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>firstName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>lastName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p><code class="language-text">fullName</code> được gọi là một computed getter. Chúng ta có thể khai báo một cách đầy đủ hơn</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js">computed<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    fullName<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        <span class="token keyword">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>firstName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>lastName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token keyword">set</span><span class="token punctuation">(</span>fullName<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>firstName <span class="token operator">=</span> fullName<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">\' \'</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>lastName <span class="token operator">=</span> fullName<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">\' \'</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Từ giờ, khi chúng ta đặt lại giá trị <code class="language-text">fullName</code> ( <code class="language-text">this.fullName = &#39;Example&#39;</code>), 2 giá trị <code class="language-text">firstName</code> và <code class="language-text">lastName</code> sẽ cập nhập theo.</p>\n<p>Giờ lấy ví dụ sử dụng thực tế hơn với Vuex. Chúng ta lấy một số dữ liệu từ store để sử dụng trong component. Nếu ko dùng computed setter, chúng ta sẽ viết như sau</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>\n        <span class="token operator">&lt;</span>input\n            <span class="token punctuation">:</span>value<span class="token operator">=</span><span class="token string">"text"</span>\n            type<span class="token operator">=</span><span class="token string">"text"</span>\n            @input<span class="token operator">=</span><span class="token string">"onInput"</span>\n        <span class="token operator">/</span><span class="token operator">></span>\n        <span class="token operator">&lt;</span>button @click<span class="token operator">=</span><span class="token string">"convertToUpperCase"</span><span class="token operator">></span>To UpperCase<span class="token operator">&lt;</span><span class="token operator">/</span>button\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    props<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'text\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    methods<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        <span class="token function">onInput</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>$store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token string">\'CHANGE_TEXT\'</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token function">convertToUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>$store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token string">\'CHANGE_TEXT\'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>text<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Dùng Computed Setter sẽ gọn gàng hơn.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token operator">&lt;</span>template<span class="token operator">></span>\n    <span class="token operator">&lt;</span>div<span class="token operator">></span>\n        <span class="token operator">&lt;</span>input\n            v<span class="token operator">-</span>model<span class="token operator">=</span><span class="token string">"textValue"</span>\n            type<span class="token operator">=</span><span class="token string">"text"</span>\n        <span class="token operator">/</span><span class="token operator">></span>\n        <span class="token operator">&lt;</span>button @click<span class="token operator">=</span><span class="token string">"convertToUpperCase"</span><span class="token operator">></span>To UpperCase<span class="token operator">&lt;</span><span class="token operator">/</span>button\n    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n<span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span>\n\n<span class="token operator">&lt;</span>script<span class="token operator">></span>\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    props<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'text\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    computed<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        textValue<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n            <span class="token keyword">get</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>text<span class="token punctuation">;</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n            <span class="token keyword">set</span> <span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token keyword">this</span><span class="token punctuation">.</span>$store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token string">\'CHANGE_TEXT\'</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    methods<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        <span class="token function">convertToUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>textValue <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>textValue<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n<span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span></code></pre>\n      </div>\n<ol>\n<li>Update dữ liệu bên ngoài component đơn giản hơn. Thay thế <code class="language-text">:value</code>, <code class="language-text">@input</code>, bằng <code class="language-text">v-model</code>. Thay đổi giá trị cũng đơn giản hơn, như trong hàm <code class="language-text">convertToUpperCase</code></li>\n<li>Chúng ta chỉ gọi <code class="language-text">dispatch</code> ở một chổ duy nhất khi cần thay đổi giá trị</li>\n</ol>\n<p><a target="_blank" rel="noopener noreferrer" href="https://medium.com/@Taha_Shashtari/simplify-your-components-with-computed-setters-2f687f193fb0">Simplify Your Vue Components with Computed Setters</a></p>',timeToRead:2,excerpt:"Một trong những khái niệm quan trọng của Vue là computed property.  được gọi là một computed getter. Chúng ta có thể khai báo một cách đầy…",frontmatter:{title:"Viết component gọn gàng hơn với Computed Setter",cover:"",date:"2018-12-20",category:null,tags:["vuejs"],desc:"Một gợi ý để sử dụng computed setter với các dữ liệu bên ngoài component như Vuex"},fields:{slug:"/2018-12-20-su-dung-computed-setter-voi-vuex"}}},pathContext:{slug:"/2018-12-20-su-dung-computed-setter-voi-vuex",prev:{frontmatter:{title:"6 pattern hay sử dụng trong React",desc:"Điểm qua 6 React Pattern hay gặp trong React",type:"post",category:null,tags:["react"],date:"2018-12-30",cover:""},fields:{slug:"/2018-12-30-mot-so-pattern-hay-su-dung-trong-react"}},next:{frontmatter:{title:"Tìm hiểu Currying function trong Javascript",desc:"Bài viết này chúng ta sẽ tìm hiểu về cái cà-ri này, nó chạy ra sao, hữu dụng thế nào.",type:"post",category:null,tags:["javascript"],date:"2018-12-19",cover:""},fields:{slug:"/2018-12-19-tim-hieu-curring-function-trong-javascript"}}}}}});
//# sourceMappingURL=path---2018-12-20-su-dung-computed-setter-voi-vuex-582d8c0ad60519eacd6d.js.map