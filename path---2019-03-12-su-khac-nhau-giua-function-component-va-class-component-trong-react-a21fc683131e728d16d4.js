webpackJsonp([80826951427443],{1582:function(n,s){n.exports={data:{markdownRemark:{html:'<p>Có thể bạn cũng từng nghe nói, một trong 2 thằng đó performance tốt hơn. Xem thêm đánh giá từ <a href="https://medium.com/@dan_abramov/this-benchmark-is-indeed-flawed-c3d6b5b6f97f">This benchmark is indeed flawed.</a>. Nói về performance thì phải xem cái code bên trong nó làm cái gì, chứ ko còn đơn thuần là function hay class nó sẽ performance cao hơn.</p>\n<p>Như vậy, việc bạn chuyển hết các component đang viết sang function component, rồi kết hợp với hook để thay cho class component thực sự phải cân nhắc, vì nhiều khi tốn thời gian mà ko mang nhiều lợi ích lắm.</p>\n<p>Xem xét một function component như thế này</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">function</span> <span class="token function">ProfilePage</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> user <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> <span class="token function-variable function">showMessage</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">\'Followed \'</span> <span class="token operator">+</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">const</span> <span class="token function-variable function">handleClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token function">setTimeout</span><span class="token punctuation">(</span>showMessage<span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">return</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>handleClick<span class="token punctuation">}</span></span><span class="token punctuation">></span></span>Follow<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Ta có thể viết lại thành class component</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">class</span> <span class="token class-name">ProfilePage</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function-variable function">showMessage</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">\'Followed \'</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n  <span class="token function-variable function">handleClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>showMessage<span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>handleClick<span class="token punctuation">}</span></span><span class="token punctuation">></span></span>Follow<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Để thấy sự khác nhau, chúng ta cũng xem một con bug rất hay xảy ra trong React.</p>\n<p>Chạy thử <a href="https://codesandbox.io/s/pjqnl16lm7">demo</a>,  rồi làm theo các bước sau</p>\n<ol>\n<li>Click vào một trong 2 nút follow</li>\n<li>Chọn profile name khác với ban đầu, từ cái dropdown, đợi 3 giây để nó chạy</li>\n<li>Đọc kết quả của alert</li>\n</ol>\n<p>Nếu dùng <code class="language-text">ProfilePage</code> function, nếu chọn Dan sau đó chuyển sang Sophie, nó sẽ hiện câu alert là <code class="language-text">Followed Dan</code>\nNếu dùng <code class="language-text">ProfilePage</code> class, ta sẽ được alert câu <code class="language-text">Followed Sophie</code></p>\n<p><img src="https://overreacted.io/bug-386a449110202d5140d67336a0ade5a0.gif" alt="Để thấy sự khác nhau, chúng ta cũng xem một con bug rất hay xảy ra trong React."></p>\n<p>Kết quả chạy của function component là đúng, sau khi chuyển sang người khác chúng ta đâu có gọi lại follow? Rõ ràng class component bị <em>bug</em>.</p>\n<p>Xem xét hàm <code class="language-text">showMessage</code> bên trong class component</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">class</span> <span class="token class-name">ProfilePage</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function-variable function">showMessage</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">\'Followed \'</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Nó đọc giá trị từ <code class="language-text">this.props.user</code>, tuy nhiên, thằng <strong>this</strong> là một một giá trị luôn luôn <strong>mutable</strong>, tức có thể thay đổi, không phải bất biến.</p>\n<p>Nó là mục đích của sử dụng từ khóa <code class="language-text">this</code> bên trong class chứ cũng ko hẳn là bug. React muốn lấy được giá trị mới nhất trong lúc render và trong các phương thức lifecycle</p>\n<blockquote>\n<p>Cho dễ nhớ, <code class="language-text">this.props</code> luôn là giá trị mới nhất khi nó cần render </p>\n</blockquote>\n<p>Giờ nếu mà ko có sự tồn tại của function component, thì chúng ta giải quyết vấn đề này như thế nào ? Chúng ta sẽ lấy giá trị của <code class="language-text">this.props</code> trước khi <code class="language-text">setTimeout</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">class</span> <span class="token class-name">ProfilePage</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function-variable function">showMessage</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">user</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">\'Followed \'</span> <span class="token operator">+</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n  <span class="token function-variable function">handleClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> <span class="token punctuation">{</span>user<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">;</span>\n    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">showMessage</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>handleClick<span class="token punctuation">}</span></span><span class="token punctuation">></span></span>Follow<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Tuy nhiên đây cũng chưa phải là cách hoàn hảo để giải quyết triệt để con bug trên. Có thể sử dụng javascript closure để hoàn toàn xử trí vụ này, nhưng thật lòng mà nói, xài closure vô rất rối, khó lòng nhẩm được giá trị hiện tại.</p>\n<p>Một cách khác được nhiều người sử dụng hơn là truy xuất trong hàm render, chúng ta đặt hết niềm tin vào giá trị của <code class="language-text">prop</code> và <code class="language-text">state</code> trong lúc render </p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">class</span> <span class="token class-name">ProfilePage</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// lấy giá trị props</span>\n    <span class="token keyword">const</span> props <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">;</span>\n\n    <span class="token comment">// lưu ý chúng ta đang trong hàm render</span>\n    <span class="token comment">// đây ko phải là một phương thức của class</span>\n    <span class="token keyword">const</span> <span class="token function-variable function">showMessage</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">\'Followed \'</span> <span class="token operator">+</span> props<span class="token punctuation">.</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">const</span> <span class="token function-variable function">handleClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token function">setTimeout</span><span class="token punctuation">(</span>showMessage<span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>handleClick<span class="token punctuation">}</span></span><span class="token punctuation">></span></span>Follow<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Như vậy giá trị của <code class="language-text">user</code> bên trong hàm <code class="language-text">showMessage</code> nó sẽ luôn đồng nhất với lúc render.</p>\n<p><a target="_blank" rel="noopener noreferrer" href="https://overreacted.io/how-are-function-components-different-from-classes/">How Are Function Components Different from Classes?</a></p>',timeToRead:3,excerpt:"Có thể bạn cũng từng nghe nói, một trong 2 thằng đó performance tốt hơn. Xem thêm đánh giá từ  This benchmark is indeed flawed. . Nói về…",frontmatter:{title:"Function Component khác Class component như thế nào trong React",cover:"",date:"2019-03-12",category:null,tags:["react"],desc:"Ngày xưa khi chưa có hook, thì rất dễ để trả lời câu này, nhưng từ ngày hook được sử dụng, câu hỏi lại này lại được đặt ra, ủa vậy 2 thằng nó khác nhau ở điểm nào."},fields:{slug:"/2019-03-12-su-khac-nhau-giua-function-component-va-class-component-trong-react"}}},pathContext:{slug:"/2019-03-12-su-khac-nhau-giua-function-component-va-class-component-trong-react",prev:{frontmatter:{title:"Vì sao quần hùng kéo nhau không xài moment.js nữa",desc:"Tất cả chúng ta đã từng và đang sử dụng moment.js mà ko hề dành chút thời gian để xem nó ảnh hưởng như thế nào đến performance",type:"post",category:null,tags:["javascript"],date:"2019-03-17",cover:""},fields:{slug:"/2019-03-17-vi-sao-ban-ko-nen-xai-moment-js"}},next:{frontmatter:{title:"Chrome 73 có gì mới",desc:"Master chrome devtool là cần thiết cho một frontend developer, mình sẽ bắt đầu series cập nhập những tính năng mới nhất của Chrome, theo như lộ trình định sẵn thì cứ 6 tuần nó sẽ có bản cập nhập mới cho Chrome",type:"post",category:null,tags:["chrome"],date:"2019-03-10",cover:""},fields:{slug:"/2019-03-10-chrome-73-co-gi-moi"}}}}}});
//# sourceMappingURL=path---2019-03-12-su-khac-nhau-giua-function-component-va-class-component-trong-react-a21fc683131e728d16d4.js.map