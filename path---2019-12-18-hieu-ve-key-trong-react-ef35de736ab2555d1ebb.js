webpackJsonp([0xb0ea1dbf6752],{1591:function(n,a){n.exports={data:{markdownRemark:{html:'<blockquote>\n<p><code class="language-text">key</code> là một cơ chế để quản lý các instance của component</p>\n</blockquote>\n<p>Mỗi lần React render 1 component, nó chạy function của chúng ta để nhận về một giá trị mới, giá trị này được dùng để cập nhập DOM. Nếu chúng trả về cùng một giá trị, nó sẽ không gọi update DOM, thậm chí <strong>tất cả prop có thay đổi</strong></p>\n<p>Đọc thêm bài viết <a href="https://kentcdodds.com/blog/optimize-react-re-renders">Thủ thuật cải thiện render</a></p>\n<p><strong>Tất cả prop có thay đổi</strong> nếu kết quả trả về không khác nhau, nó không cập nhập DOM. <strong>Trừ trường hợp là prop <code class="language-text">key</code></strong>, dù cho kết quả cuối cùng không thay đổi, nhưng giá trị <code class="language-text">key</code> khác nhau, React cũng sẽ unmount instance trước đó và mount vào một instance mới.</p>\n<p>Điều đó có nghĩa là toàn bộ <code class="language-text">state</code> trước đó sẽ được khởi tạo lại như lúc ban đầu. React cũng sẽ chạy cleanup trên <code class="language-text">effect</code></p>\n<blockquote>\n<p>Cleanup effect thật ra chạy sau khi một component đã mount, trước khi effect tiếp theo được gọi.</p>\n</blockquote>\n<p>Tưởng tượng chúng ta có một component, với state của riêng nó</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">function</span> <span class="token function">Counter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Counter called\'</span><span class="token punctuation">)</span>\n  <span class="token keyword">const</span> <span class="token punctuation">[</span>count<span class="token punctuation">,</span> setCount<span class="token punctuation">]</span> <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">useState</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Counter useState initializer\'</span><span class="token punctuation">)</span>\n    <span class="token keyword">return</span> <span class="token number">0</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token keyword">const</span> <span class="token function-variable function">increment</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">setCount</span><span class="token punctuation">(</span><span class="token parameter">c</span> <span class="token operator">=></span> c <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span>\n  React<span class="token punctuation">.</span><span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Counter useEffect callback\'</span><span class="token punctuation">)</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Counter useEffect cleanup\'</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Counter returning react elements\'</span><span class="token punctuation">)</span>\n  <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>increment<span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token punctuation">{</span>count<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n<span class="token punctuation">}</span>\n<span class="token keyword">function</span> <span class="token function">CounterParent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// sử  dụng useReducer theo cách này để đảm bảo tất cả những lần gọi setCounterKey</span>\n  <span class="token comment">// `counterKey` được gán cho một object mới</span>\n  <span class="token comment">// đồng nghĩa với việc `key` sẽ khác nhau</span>\n  <span class="token keyword">const</span> <span class="token punctuation">[</span>counterKey<span class="token punctuation">,</span> setCounterKey<span class="token punctuation">]</span> <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">useReducer</span><span class="token punctuation">(</span><span class="token parameter">c</span> <span class="token operator">=></span> c <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>\n  <span class="token keyword">return</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>setCounterKey<span class="token punctuation">}</span></span><span class="token punctuation">></span></span>reset<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Counter</span></span> <span class="token attr-name">key</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>counterKey<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n  <span class="token punctuation">)</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Đây là kết quả log ra</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash">// bắt đầu mounted\nCounter called\nCounter useState initializer\nCounter returning react elements\n// mounted\nCounter useEffect callback\n// click nút counter\nCounter called\nCounter returning react elements\n// để ý đến callback của effect và các step lúc khởi tạo không được gọi lúc này\n// click nút reset\n// xảy ra trên instance mới\nCounter called\nCounter useState initializer\nCounter returning react elements\n// cleanup instance trước đó\nCounter useEffect cleanup\n// new instance đã được mounted\nCounter useEffect callback</code></pre>\n      </div>\n<p>Một ứng dụng thực tế, sử dụng key để <em>ép</em>  render giá trị <code class="language-text">subject</code> khi <code class="language-text">topic</code> thay đổi</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">function</span> <span class="token function">Contact</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> <span class="token punctuation">[</span>topic<span class="token punctuation">,</span> setTopic<span class="token punctuation">]</span> <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">useState</span><span class="token punctuation">(</span><span class="token string">\'training\'</span><span class="token punctuation">)</span>\n  <span class="token keyword">return</span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">htmlFor</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>topic<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Topic<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>select</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>topic<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>topic<span class="token punctuation">}</span></span> <span class="token attr-name">onChange</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token parameter">e</span> <span class="token operator">=></span> <span class="token function">setTopic</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>option</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>training<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Training<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>option</span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>option</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>consulting<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Consulting<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>option</span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>option</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>question<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Question<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>option</span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>select</span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">htmlFor</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>subject<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Email Subject<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span>\n        <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>subject<span class="token punctuation">"</span></span>\n        <span class="token attr-name">key</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>topic<span class="token punctuation">}</span></span>\n        <span class="token attr-name">defaultValue</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>defaultValuesByTopic<span class="token punctuation">[</span>topic<span class="token punctuation">]</span><span class="token punctuation">}</span></span>\n      <span class="token punctuation">/></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">htmlFor</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>body<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Email body<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>textarea</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>body<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span>\n  <span class="token punctuation">)</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Chúng ta có <code class="language-text">&lt;input id=&quot;subject&quot; /&gt;</code>, nếu không truyền <code class="language-text">key=topic</code>, nó sẽ không được khởi tạo lại dù cho giá trị của <code class="language-text">defaultValue={defaultValuesByTopic[topic]}</code> đã thay đổi.</p>\n<p><a href="https://kentcdodds.com/blog/understanding-reacts-key-prop">Understanding React\'s key prop</a></p>',timeToRead:3,excerpt:" là một cơ chế để quản lý các instance của component Mỗi lần React render 1 component, nó chạy function của chúng ta để nhận về một giá trị…",frontmatter:{title:"Hiểu về prop key trong React",cover:"",date:"2019-12-18",category:null,tags:["react"],desc:"Một chút nhận định về prop key trong React"},fields:{slug:"/2019-12-18-hieu-ve-key-trong-react"}}},pathContext:{slug:"/2019-12-18-hieu-ve-key-trong-react",prev:!1,next:{frontmatter:{title:"Ứng dụng JSON.parse để cải thiện tốc độ?",desc:"Thủ thuật để cải thiện tốc độ bằng JSON.parse",type:"post",category:null,tags:["javascript","thu-thuat"],date:"2019-12-14",cover:""},fields:{slug:"/2019-12-14-thu-thuat-tang-toc-bang-json-parse"}}}}}});
//# sourceMappingURL=path---2019-12-18-hieu-ve-key-trong-react-ef35de736ab2555d1ebb.js.map