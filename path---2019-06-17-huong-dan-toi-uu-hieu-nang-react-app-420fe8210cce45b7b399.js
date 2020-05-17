webpackJsonp([94774179644973],{1564:function(n,a){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#Reactmemo">React.memo</a></li>\n<li><a href="#useMemo">useMemo</a></li>\n<li><a href="#useCallback">useCallback</a></li>\n</ul>\n<!-- /TOC -->\n<p>Khi sử dụng function component, React cung cấp 3 phương thức để tối ưu: <code class="language-text">React.memo</code>, <code class="language-text">useMemo</code>, và <code class="language-text">useCallback</code>, chúng ta cùng điểm qua 3 thằng này</p>\n<p>Xét ví dụ</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">ListPage</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> data<span class="token punctuation">,</span> title <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>\n    <span class="token operator">&lt;</span><span class="token operator">></span>\n        <span class="token operator">&lt;</span>Header title<span class="token operator">=</span><span class="token punctuation">{</span>title<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>\n        <span class="token operator">&lt;</span>List listItems<span class="token operator">=</span><span class="token punctuation">{</span>data<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>\n    <span class="token operator">&lt;</span><span class="token operator">/</span><span class="token operator">></span>\n<span class="token punctuation">)</span></code></pre>\n      </div>\n<p>Component như trên (<code class="language-text">&lt;ListPage /&gt;</code>), khi nhận một <code class="language-text">data</code> mới, tất cả component con bên trong là <code class="language-text">Header</code> và <code class="language-text">List</code> sẽ re-render, mặc dù cái <code class="language-text">title</code> không hề thay đổi. Nếu <code class="language-text">Header</code> không tốn quá nhiều thời gian để render thì ko có vấn đề. Ngược lại dĩ nhiên là nếu render <code class="language-text">Header</code> tốn rất nhiều thời gian, chúng ta phải <strong>xây lại</strong> để tối ưu hơn.</p>\n<h2 id="reactmemo"><a href="#reactmemo" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>React.memo</h2>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> MyComponent <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">memo</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">MyComponent</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">/* render using props */</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p><code class="language-text">React.memo</code> là một HOC, <a href="https://luubinhan.github.io/blog/2018-11-04-gioi-thieu-react-memo-moi-trong-react-16">đọc lại bài này</a>, nó sẽ <strong>nhớ</strong> kết quả render của component. Nếu component trả về một output giống hệt cho cùng một prop, đưa nó vào <code class="language-text">React.memo</code> sẽ tiết kiệm tí thời gian.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">Header</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> title <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token operator">&lt;</span>h1<span class="token operator">></span><span class="token punctuation">{</span>title<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> Header<span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Wrap lại trong <code class="language-text">React.memo</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">Header</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> title <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token operator">&lt;</span>h1<span class="token operator">></span><span class="token punctuation">{</span>title<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> React<span class="token punctuation">.</span><span class="token function">memo</span><span class="token punctuation">(</span>Header<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h2 id="usememo"><a href="#usememo" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>useMemo</h2>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> memoizedValue <span class="token operator">=</span> <span class="token function">useMemo</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">computeExpensiveValue</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>a<span class="token punctuation">,</span> b<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Cũng tương tự nó sẽ nhớ kết quả trả về, tuy nhiên nó sẽ có thêm phần gọi là <code class="language-text">array dependencies</code>, là một danh sách các <strong>thằng</strong> mà nó phụ thuộc, nếu giá trị phụ thuộc thay đổi nó mới rọi render lại, không thể trả thẳng kết quả lần trước</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> widgetList <span class="token operator">=</span> <span class="token function">useMemo</span><span class="token punctuation">(</span>\n    <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> \n        widgets<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">w</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n        <span class="token operator">...</span>w<span class="token punctuation">,</span>\n        totalPrice<span class="token punctuation">:</span> <span class="token function">someComplexFunction</span><span class="token punctuation">(</span>w<span class="token punctuation">.</span>price<span class="token punctuation">)</span><span class="token punctuation">,</span>\n        estimatedDeliveryDate<span class="token punctuation">:</span> <span class="token function">someOtherComplexFunction</span><span class="token punctuation">(</span>w<span class="token punctuation">.</span>warehouse<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">[</span>widgets<span class="token punctuation">]</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Trong ví dụ trên, 1 component nhận một danh sách các widget, các widget này trước khi truyền vào sẽ được thêm vào 2 giá trị là <em>total price</em> và <em>delivery date</em>. Nếu giá trị các widget không thay đổi khi render lại component, thì không cần thiết phải chạy qua các hàm <code class="language-text">someComplexFunction</code>, <code class="language-text">someOtherComplexFunction</code>. Sử dụng <code class="language-text">useMemo</code> để ghi nhớ kết quả và bỏ qua trong trường hợp đó.</p>\n<h2 id="usecallback"><a href="#usecallback" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>useCallback</h2>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> memoizedCallback <span class="token operator">=</span> <span class="token function">useCallback</span><span class="token punctuation">(</span>\n  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token function">doSomething</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">[</span>a<span class="token punctuation">,</span> b<span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Mục đích để chặn các lần render không cần thiết giữa component cha và con</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">Parent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> <span class="token punctuation">[</span>showExtraDetails<span class="token punctuation">,</span> setShowExtraDetails<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>\n        <span class="token operator">&lt;</span><span class="token operator">></span>\n        <span class="token operator">&lt;</span>Child onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> <span class="token function">showData</span><span class="token punctuation">(</span>showExtraDetails<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token operator">/</span><span class="token operator">></span>\n        <span class="token operator">&lt;</span><span class="token operator">/</span><span class="token operator">></span>\n    <span class="token punctuation">)</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>1 component như vậy sẽ re-render cả cha và con cùng lúc, thậm chí component con có là <code class="language-text">PureComponent</code> được wrap bên trong <code class="language-text">React.memo</code> đi nữa, bởi vì <code class="language-text">onClick</code> sẽ khác nhau trên mỗi lần render. Sử dụng <code class="language-text">useCallback</code> chúng ta viết lại như sau</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">Parent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> <span class="token punctuation">[</span>showExtraDetails<span class="token punctuation">,</span> setShowExtraDetails<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">const</span> handleClick <span class="token operator">=</span> <span class="token function">useCallback</span><span class="token punctuation">(</span>\n      <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n        <span class="token function">showData</span><span class="token punctuation">(</span>showExtraDetails<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">[</span>showExtraDetails<span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>\n        <span class="token operator">&lt;</span><span class="token operator">></span>\n        <span class="token operator">&lt;</span>Child onClick<span class="token operator">=</span><span class="token punctuation">{</span>handleClick<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>\n        <span class="token operator">&lt;</span><span class="token operator">/</span><span class="token operator">></span>\n    <span class="token punctuation">)</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Như vậy hàm <code class="language-text">handleClick</code> sẽ giống nhau cho các lần render khác nhau, nó chỉ khác khi <code class="language-text">showExtraDetails</code> thay đổi.</p>\n<p><a target="_blank" rel="noopener noreferrer" href="https://headway.io/blog/react-optimize-components-memo-usememo-usecallback">React: Optimize Components with React.memo, useMemo, and useCallback</a></p>',timeToRead:3,excerpt:"React.memo useMemo useCallback Khi sử dụng function component, React cung cấp 3 phương thức để tối ưu:  ,  , và  , chúng ta cùng điểm qua…",frontmatter:{title:"3 bước tối ưu hiệu năng React App bằng các API mới của React",cover:"",date:"2019-06-17",category:null,tags:["react","thu-thuat"],desc:"Bài viết hướng dẫn tối ưu hiệu năng bằng memo, useMemo, useCallback"},fields:{slug:"/2019-06-17-huong-dan-toi-uu-hieu-nang-react-app"}}},pathContext:{slug:"/2019-06-17-huong-dan-toi-uu-hieu-nang-react-app",prev:{frontmatter:{title:"Sử dụng Refs trong React",desc:"Lâu quá mới viết React, tại hổm rày cũng ít đụng vô React, chắc gần 8 tháng rồi, chỉ toàn viết Vue trong công ty. Nay lật lại kiến thức cũ nhưng chưa bao giờ vô dụng: sử dụng Refs",type:"post",category:null,tags:["react","hoc-thuat"],date:"2019-06-22",cover:""},fields:{slug:"/2019-06-22-su-dung-refs-trong-react"}},next:{frontmatter:{title:"Không cho cuộn trang khi mở Modal",desc:"Xử lý cuộn trang khi mở modal",type:"post",category:null,tags:["css","javascript","thu-thuat"],date:"2019-06-07",cover:""},fields:{slug:"/2019-06-07-huong-dang-xu-ly-modal-va-scroll"}}}}}});
//# sourceMappingURL=path---2019-06-17-huong-dan-toi-uu-hieu-nang-react-app-420fe8210cce45b7b399.js.map