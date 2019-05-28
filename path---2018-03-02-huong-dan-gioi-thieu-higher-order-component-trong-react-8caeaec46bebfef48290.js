webpackJsonp([0xe0a45cb5c0f1],{1286:function(n,a){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#t%E1%BB%95ng-quan">Tổng quan</a></li>\n<li><a href="#higher-order-functions">Higher-Order Functions</a></li>\n<li><a href="#higher-order-components">Higher-Order Components</a></li>\n</ul>\n<!-- /TOC -->\n<p>Nghe khá trừa tượng và cao siêu. Tuy nhiên đây là một kỹ thuật hay (architectural pattern), một vài người cũng vạch ra được điểm khó chịu khi làm HOCs, tuy nhiên thích thì học thôi, trong vài trường hợp sẽ hữu dụng.</p>\n<h2 id="tổng-quan"><a href="#t%E1%BB%95ng-quan" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Tổng quan</h2>\n<p>Để đọc hiểu bài này dĩ nhiên cần nắm cơ bản ES6, hiểu cà-ri function là thế nào (Currying Functional Programming)</p>\n<p>Cà-ri function là cách viết tách một function nhận một đống arguments, "băm" function đó ra thành nhiều function con, mỗi function nhận 1 argument. Ví dụ</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">// một hàm sum thông thường</span>\n<span class="token keyword">const</span> <span class="token function-variable function">sum</span> <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">=></span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>\n\n<span class="token comment">// cà-ri function</span>\n<span class="token keyword">const</span> <span class="token function-variable function">curriedSum</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token punctuation">(</span>a <span class="token operator">+</span> b<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n\n<span class="token punctuation">}</span>\n<span class="token comment">// viết hàm cà-ri bằng arrow function</span>\n<span class="token keyword">const</span> <span class="token function-variable function">curriedSum</span> <span class="token operator">=</span> a <span class="token operator">=></span> b <span class="token operator">=></span> a <span class="token operator">+</span> b\n\n<span class="token comment">//gọi hàm cà-ri</span>\n<span class="token function">curriedSum</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>Một số cách viết khác của ES6 tìm lại mấy bài cũ của mình đã chia sẽ.</p>\n<h2 id="higher-order-functions"><a href="#higher-order-functions" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Higher-Order Functions</h2>\n<p>Cái này không mới, trước đây trong javascript vẫn thường viết kiểu truyền một anonymous function (callback) như một argument cho 1 function khác, vì function trong javascript là object nên làm được chuyện này, hay 1 function trả về một kết quả trả về của function khác. Xét ví dụ</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">calculator</span> <span class="token operator">=</span> <span class="token punctuation">(</span>inputFunction<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> resultValue <span class="token operator">=</span> <span class="token function">inputFunction</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>resultValue<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> resultValue<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">...</span>all<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> all<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">=></span> a <span class="token operator">+</span> b<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">multiply</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">...</span>all<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> all<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span>b<span class="token punctuation">)</span> <span class="token operator">=></span> a<span class="token operator">*</span>b<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Ta có thể sử dụng hàm <code class="language-text">calculator</code> như sau</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token function">calculator</span><span class="token punctuation">(</span>mutiply<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">//return 8</span>\n<span class="token comment">//</span>\n<span class="token function">calculator</span><span class="token punctuation">(</span>add<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token number">9</span><span class="token punctuation">,</span><span class="token number">12</span><span class="token punctuation">,</span><span class="token number">15</span><span class="token punctuation">,</span><span class="token number">18</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">//return 63</span></code></pre>\n      </div>\n<p>Các hàm như <code class="language-text">add</code>, <code class="language-text">multiply</code> chấp nhận số lượng input không giới hạn, hàm <code class="language-text">calculator</code> sử dụng như một container, extend thêm một số xử lý trước khi gọi hàm <code class="language-text">add</code>, <code class="language-text">multiply</code></p>\n<h2 id="higher-order-components"><a href="#higher-order-components" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Higher-Order Components</h2>\n<p>Một higher-order component là một một function nhận vào một <code class="language-text">component</code> như một argument và trả về "phiên bản mở rộng" của component đó.</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token punctuation">(</span>InputComponent<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> ExtendedComponent\n<span class="token punctuation">}</span>\n\n<span class="token comment">// hoặc</span>\nInputComponent <span class="token operator">=></span> ExtendedComponent</code></pre>\n      </div>\n<p><code class="language-text">ExtendedComponent</code> là một component container, nó trả về <code class="language-text">InputComponent</code> với một số extend</p>\n<p><img src="https://cms-assets.tutsplus.com/uploads/users/1795/posts/30094/image/Introduction-To-Higher-Order-Components-in-React-Overview.jpg"></p>\n<p>Giờ implement cái khái niệm này</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">const</span> <span class="token function-variable function">withGreyBg</span> <span class="token operator">=</span> WrappedComponent <span class="token operator">=></span> <span class="token keyword">class</span> <span class="token class-name">NewComponent</span> extedns Component <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> bgStyle <span class="token operator">=</span> <span class="token punctuation">{</span>\n        backgroundColor<span class="token punctuation">:</span> <span class="token string">\'grey\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token punctuation">(</span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">\'</span>wrapper<span class="token punctuation">\'</span></span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>bgStyle<span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>WrappedComponent</span> <span class="token spread"><span class="token punctuation">{</span><span class="token punctuation">...</span><span class="token attr-value">this</span><span class="token punctuation">.</span><span class="token attr-value">props</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n        <span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> SmallCardWithGreyBg <span class="token operator">=</span> <span class="token function">withGreyBg</span><span class="token punctuation">(</span>SmallCard<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> BigCardWithGreyBg <span class="token operator">=</span> <span class="token function">withGreyBg</span><span class="token punctuation">(</span>BigCard<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> HugeCardWithGreyBg <span class="token operator">=</span> <span class="token function">withGreyBg</span><span class="token punctuation">(</span>HugeCard<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">class</span> <span class="token class-name">CardsDemo</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>\n    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>SmallCardWithGreyBg</span> <span class="token spread"><span class="token punctuation">{</span><span class="token punctuation">...</span><span class="token attr-value">this</span><span class="token punctuation">.</span><span class="token attr-value">props</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>BigCardWithGreyBg</span> <span class="token spread"><span class="token punctuation">{</span><span class="token punctuation">...</span><span class="token attr-value">this</span><span class="token punctuation">.</span><span class="token attr-value">props</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n        <span class="token operator">&lt;</span>HugeCardWithGreyBg <span class="token punctuation">{</span><span class="token operator">...</span><span class="token keyword">this</span><span class="token punctuation">.</span>props <span class="token operator">/</span><span class="token operator">></span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p><img src="https://cms-assets.tutsplus.com/uploads/users/1795/posts/30094/image/Introduction-To-Higher-Order-Components-in-React-An-Example-HOC.jpg"></p>',timeToRead:2,excerpt:"Tổng quan Higher-Order Functions Higher-Order Components Nghe khá trừa tượng và cao siêu. Tuy nhiên đây là một kỹ thuật hay (architectural…",frontmatter:{title:"Giới thiệu Higher-Order Components trong React",cover:"",date:"2018-03-02",category:"javascript",tags:["react","javascript"],desc:"Higher-Order Component(HOCs) là kỹ thuật khá vui trong react để refactor các component tương tự nhau về mặt logic."},fields:{slug:"/2018-03-02-huong-dan-gioi-thieu-higher-order-component-trong-react"}}},pathContext:{slug:"/2018-03-02-huong-dan-gioi-thieu-higher-order-component-trong-react",prev:{frontmatter:{title:"8 câu điều kiện khi render trong React",desc:"Tutorial này sẽ cover những câu điều kiện dùng để render component phổ biến nhất",type:"post",category:"react",tags:["react","javascript"]},fields:{slug:"/2018-03-05-8-huong-dan-cach-render-component-trong-react"}},next:{frontmatter:{title:"Dựng UI với pure function và kết hợp nhiều function trong React",desc:"Khi tạo một React Component, nó có thể là một function, nhận vào tham số, thay vì trả về giá trị, function này trả về UI",type:"post",category:"react",tags:["react","javascript"]},fields:{slug:"/2018-02-27-huong-dan-dung-ui-voi-pure-function-va-ket-hop-nhieu-function"}}}}}});
//# sourceMappingURL=path---2018-03-02-huong-dan-gioi-thieu-higher-order-component-trong-react-8caeaec46bebfef48290.js.map