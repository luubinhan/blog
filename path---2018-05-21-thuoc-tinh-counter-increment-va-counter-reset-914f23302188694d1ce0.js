webpackJsonp([39],{"./node_modules/json-loader/index.js!./.cache/json/2018-05-21-thuoc-tinh-counter-increment-va-counter-reset.json":function(n,s){n.exports={data:{markdownRemark:{html:'<p>Tương tự như <code>&#x3C;ol></code>, để có thể đánh số thứ tự một cách tự động cho bất kể element nào, ta có thể dùng cặp thuộc tính <code>counter-reset</code> và <code>counter-increment</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code><span class="token selector">article</span> <span class="token punctuation">{</span>\n    <span class="token property">counter-reset</span><span class="token punctuation">:</span> section<span class="token punctuation">;</span> // section là một định danh bất kỳ, giá trị khởi tạo = 0\n<span class="token punctuation">}</span>\n<span class="token selector">section</span> <span class="token punctuation">{</span>\n    <span class="token property">counter-increment</span><span class="token punctuation">:</span> section<span class="token punctuation">;</span> // đặt cho đối tượng con, trên mỗi giá trị section nằm trong article, counter sẽ tăng lên 1\n<span class="token punctuation">}</span>\n\n<span class="token selector">section h2:before</span> <span class="token punctuation">{</span>\n    <span class="token property">content</span><span class="token punctuation">:</span> <span class="token function">counter</span><span class="token punctuation">(</span>section<span class="token punctuation">)</span> <span class="token string">\'. \'</span><span class="token punctuation">;</span> // giá trị counter được truyền vào cho thuộc tính content\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Nếu không thích kiểu đánh số mặc định là 1, 2, 3 ...., có thể chỉ định bằng cách</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code><span class="token selector">section:before</span> <span class="token punctuation">{</span>\n    <span class="token property">content</span><span class="token punctuation">:</span> <span class="token function">counter</span><span class="token punctuation">(</span>section, upper-roman<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Hoạt động tốt trên IE8+</p>\n<p>Một số áp dụng tìm trên codepen</p>\n<p data-height="265" data-theme-id="0" data-slug-hash="GdXyWo" data-default-tab="css,result" data-user="chriscoyier" data-embed-version="2" data-pen-title="Custom List Style 3" class="codepen">See the Pen <a href="https://codepen.io/chriscoyier/pen/GdXyWo/">Custom List Style 3</a> by Chris Coyier  (<a href="https://codepen.io/chriscoyier">@chriscoyier</a>) on <a href="https://codepen.io">CodePen</a>.</p>\n<script async src="https://static.codepen.io/assets/embed/ei.js"></script>\n<p data-height="265" data-theme-id="0" data-slug-hash="xjapNK" data-default-tab="css,result" data-user="chriscoyier" data-embed-version="2" data-pen-title="Wilto Counters" class="codepen">See the Pen <a href="https://codepen.io/chriscoyier/pen/xjapNK/">Wilto Counters</a> by Chris Coyier  (<a href="https://codepen.io/chriscoyier">@chriscoyier</a>) on <a href="https://codepen.io">CodePen</a>.</p>\n<script async src="https://static.codepen.io/assets/embed/ei.js"></script>\n<p data-height="265" data-theme-id="0" data-slug-hash="qYoLaq" data-default-tab="css,result" data-user="snookca" data-embed-version="2" data-pen-title="Timeline CSS with Counters" class="codepen">See the Pen <a href="https://codepen.io/snookca/pen/qYoLaq/">Timeline CSS with Counters</a> by Jonathan Snook (<a href="https://codepen.io/snookca">@snookca</a>) on <a href="https://codepen.io">CodePen</a>.</p>\n<script async src="https://static.codepen.io/assets/embed/ei.js"></script>',frontmatter:{date:"May 21, 2018",path:"/2018-05-21-thuoc-tinh-counter-increment-va-counter-reset",tags:["css"],title:"Hướng dẫn sử dụng thuộc tính counter-reset và counter-increment",desc:"Nếu muốn đánh số tự động trong css, ta thường sử dụng đến kiểu display list-style, bài này giới thiệu một thuộc tính khác ít ai biết tới"}}},pathContext:{prev:!1,next:{excerpt:"Bản React 16.3.0 được giới thiệu với khá nhiều khái niệm và tính năng mới của React, trong đó được nhiều quan tâm hơn cả là Context API. Chúng ta sẽ cùng tìm hiểu Context API là cái gì Thay thể Redux bằng Context API bằng cách nào Khi nào thì nên sử...",html:'<p>Bản React 16.3.0 được giới thiệu với khá nhiều khái niệm và tính năng mới của React, trong đó được nhiều quan tâm hơn cả là Context API. Chúng ta sẽ cùng tìm hiểu</p>\n<ul>\n<li>Context API là cái gì</li>\n<li>Thay thể Redux bằng Context API bằng cách nào</li>\n<li>Khi nào thì nên sử dụng Context API</li>\n</ul>\n<h2>Context API là cái gì</h2>\n<p>Định nghĩa official từ React docs</p>\n<blockquote>\n<p>Context provides a way to pass data through the component tree without having to pass props down manually at every level.</p>\n</blockquote>\n<p>Khái niệm về Context thì không phải là mới, mà nó đã có từ trước, cũng tương tự như Redux, giúp chúng ta truyền dữ liệu từ trên xuống theo <em>đường tắt</em>, tức không theo một thứ tự từ 1->2->3->4.</p>\n<p>Cái khác từ phiên bản React 16.3.0 có lẽ là ở chổ mọi thử được implement một cách rõ ràng hơn, dễ hình dung hơn, thay vì trước đây việc sử dụng Context API không được khuyến khích vì nó còn đang trong giai đoạn phát triển, chưa hoàn thiện nên để tránh sự cố có thể xảy ra, trên tài liệu chính thức của React luôn nói rõ không nên xài trong thời điểm đó.</p>\n<h2>Sử dụng React Context API như thế nào</h2>\n<p>Sẽ bao gồm 3 bước</p>\n<ol>\n<li>Khởi tạo giá trị ban đầu cho context api bằng <code>React.createContext</code>, hàm này trả về một object bao gồm là <code>Provider</code> và <code>Consumer</code></li>\n<li>Sử dụng <code>Provider</code> này trên component trên cùng, truyền vào giá trị qua prop <code>value</code></li>\n<li>Component <code>Consumer</code> có thể sử dụng ở bất cứ đâu bên dưới <code>Provider</code>, <code>Consumer</code> có thể get được giá trị của prop <code>value</code> của <code>Provider</code> thông qua prop <code>children</code></li>\n</ol>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code><span class="token keyword">const</span> DEFAULT_STATE <span class="token operator">=</span> <span class="token punctuation">{</span>\n    allChar<span class="token punctuation">:</span> Char<span class="token punctuation">,</span>\n    searchTerm<span class="token punctuation">:</span> <span class="token string">\'\'</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">const</span> ThemeContext <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createContext</span><span class="token punctuation">(</span>DEFAULT_STATE<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Provider</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  state <span class="token operator">=</span> DEFAULT_STATE<span class="token punctuation">;</span>\n\n  searchTermChanged <span class="token operator">=</span> searchTerm <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>searchTerm<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ThemeContext.Provider</span>\n        <span class="token attr-name">value</span><span class="token script language-javascript"><span class="token punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>\n          <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">,</span>\n          searchTermChanged<span class="token punctuation">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>searchTermChanged<span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">}</span></span>\n      <span class="token punctuation">></span></span>\n        <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>children<span class="token punctuation">}</span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ThemeContext.Provider</span><span class="token punctuation">></span></span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Chúng ta tạo ra một component <code>Provider</code>, component này sẽ trả về context Provider, bên trong context Provider chúng ta đưa tất tật state của component vào trong trong prop <code>value</code> và các hàm sử lý state luôn. Sau đó chúng ta có thể dùng component <code>Provider</code> mới build này như một root component (component nằm trên cùng)</p>\n<p>Chúng ta tạo thêm một component <code>Consumer</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span>ThemeContext<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'./Provider\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Consumer</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> <span class="token punctuation">{</span>children<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ThemeContext.Consumer</span><span class="token punctuation">></span></span>\n        <span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">{</span>allChar<span class="token punctuation">,</span> searchTerm<span class="token punctuation">,</span> searchTermChanged<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span>\n          <span class="token keyword">const</span> char <span class="token operator">=</span> searchTerm\n            <span class="token operator">?</span> allChar<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>\n                char <span class="token operator">=</span><span class="token operator">></span>\n                  char<span class="token punctuation">.</span>name<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>searchTerm<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">></span> <span class="token operator">-</span><span class="token number">1</span>\n              <span class="token punctuation">)</span>\n            <span class="token punctuation">:</span> allChar<span class="token punctuation">;</span>\n\n          <span class="token keyword">return</span> React<span class="token punctuation">.</span>Children<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>children<span class="token punctuation">,</span> child <span class="token operator">=</span><span class="token operator">></span>\n            React<span class="token punctuation">.</span><span class="token function">cloneElement</span><span class="token punctuation">(</span>child<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n              char<span class="token punctuation">,</span>\n              searchTerm<span class="token punctuation">,</span>\n              searchTermChanged<span class="token punctuation">,</span>\n            <span class="token punctuation">}</span><span class="token punctuation">)</span>\n          <span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">}</span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ThemeContext.Consumer</span><span class="token punctuation">></span></span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Bên trong component <code>Comsumer</code> thực ra ta trả về context <code>Consumer</code> từ context đã tạo trước đó. Sau đó ta sử dụng cặp <code>React.Children.map</code> và <code>React.cloneElement</code> để đưa toàn bộ các state vào trong prop</p>\n<p>Chúng ta sử dụng 2 component mới này để bọc lấy component <code>App</code> là xong</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">\'react\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> ReactDOM <span class="token keyword">from</span> <span class="token string">\'react-dom\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> Provider <span class="token keyword">from</span> <span class="token string">\'./Provider\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> Consumer <span class="token keyword">from</span> <span class="token string">\'./Consumer\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">\'./App\'</span><span class="token punctuation">;</span>\n\nReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Provider</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Consumer</span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>App</span> <span class="token punctuation">/></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Consumer</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Provider</span><span class="token punctuation">></span></span><span class="token punctuation">,</span>\n  document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">\'root\'</span><span class="token punctuation">)</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<h2>Khi nào thì nên sử dụng Context API</h2>\n<p>Mỗi app mỗi khác, tùy theo nhu cầu và <strong>tình hình</strong> của từng app, câu trả lời đúng nhất chắc là phải để thực nhiệm sử dụng trên nhiều dự án. Có thể nói là react context API implement đơn giản hơn nhiều so với Redux hay MobX. Theo cá nhân mình thấy Context API sẽ chưa thay thể được Redux, nếu bạn đã và đang sử dụng Redux và chưa có gì phàn nàn về nó thì cứ xài tiếp thôi.</p>\n<p>Full Source Code: <a href="https://github.com/rajatgeekyants/superhero">https://github.com/rajatgeekyants/superhero</a></p>\n<p>Tác giả: Rajat S</p>\n<p>Link bài gốc: <a href="https://blog.bitsrc.io/react-context-api-a-replacement-for-redux-6e20790492b3">https://blog.bitsrc.io/react-context-api-a-replacement-for-redux-6e20790492b3</a></p>',id:"E:/anluu/luckyluu/posts/2018-05-16-react-context-api-ke-thay-the-redux/index.md absPath of file >>> MarkdownRemark",timeToRead:3,frontmatter:{date:"2018-05-16T13:35:13.234Z",path:"/2018-05-16-react-context-api-ke-thay-the-redux",tags:["javascript","react"],title:"React Context API - có phải sẽ thay thế Redux"}}}}}});
//# sourceMappingURL=path---2018-05-21-thuoc-tinh-counter-increment-va-counter-reset-914f23302188694d1ce0.js.map