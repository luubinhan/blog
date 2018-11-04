webpackJsonp([40528084228208],{1213:function(n,s){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#render">render()</a></li>\n<li><a href="#constructorprops">constructor(props)</a></li>\n<li><a href="#componentdidmount">componentDidMount()</a></li>\n<li><a href="#componentdidupdateprevprops-prevstate-snapshot">componentDidUpdate(prevProps, prevState, snapshot)</a></li>\n<li><a href="#componentwillunmount">componentWillUnmount</a></li>\n<li><a href="#shouldcomponentupdatenextprops-nextstate">shouldComponentUpdate(nextProps, nextState)</a></li>\n<li><a href="#static-getderivedstatefrompropsprops-state">static getDerivedStateFromProps(props, state)</a></li>\n<li><a href="#getsnapshotbeforeupdateprevprops-prevstate">getSnapshotBeforeUpdate(prevProps, prevState)</a></li>\n<li><a href="#componentdidcatcherror-info">componentDidCatch(error, info)</a></li>\n</ul>\n<!-- /TOC -->\n<p><img src="https://cdn-images-1.medium.com/max/1800/0*OoDfQ7pzAqg6yETH." alt="Giải thích React Component Lifecycle"></p>\n<p>Để thực sự trở thành một master React, việc hiểu lifecycle của component là bắt buộc.</p>\n<p>Các phương thức của lifecycle là một dạng <code class="language-text">hook</code> (giống như khái niệm <code class="language-text">hook</code> trong wordpress)</p>\n<p>Có thể group các phương thức lifecycle ra 3 nhóm, ứng với 4 giai đoạn của component: <strong>Mounting</strong>, <strong>Updating</strong>, <strong>Unmounting</strong>, <strong>Error Handling</strong></p>\n<p><strong>Mounting</strong></p>\n<p>Nó sẽ theo thứ tự sau</p>\n<ol>\n<li>constructor()</li>\n<li>static getDerivedStateFromProps()</li>\n<li>render()</li>\n<li>componentDidMount()</li>\n</ol>\n<p><strong>Updating</strong></p>\n<p>Các phương thức này sẽ được gọi khi có sự thay đổi của <code class="language-text">state</code> hoặc <code class="language-text">props</code></p>\n<ol>\n<li>static getDerivedStateFromProps()</li>\n<li>shouldComponentUpdate()</li>\n<li>render()</li>\n<li>getSnapshotBeforeUpdate()</li>\n<li>componentDidUpdate()</li>\n</ol>\n<p><strong>Unmounting</strong></p>\n<p>Phương thức được gọi trước khi remove component khỏi DOM</p>\n<ol>\n<li>componentWillUnmount()</li>\n</ol>\n<p><strong>Error Handling</strong></p>\n<p>Bất kể lỗi ở đâu trong component, nó sẽ gọi đến phương thức này</p>\n<ol>\n<li>componentDidCatch()</li>\n</ol>\n<h1 id="render"><a href="#render" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>render()</h1>\n<p>Đây là phương thức bắt buộc duy nhất khi tạo ra một component, bắt buộc trả về một trong những giá trị</p>\n<ul>\n<li>React element</li>\n<li>Arrays and fragments</li>\n<li>Portals</li>\n<li>String and numbers</li>\n<li>Booleans or null</li>\n</ul>\n<p><strong>Hàm này sẽ không được gọi nếu <code class="language-text">shouldComponentUpdate()</code> return false</strong></p>\n<h1 id="constructorprops"><a href="#constructorprops" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>constructor(props)</h1>\n<p>Phương thức khởi tạo một component, nếu không khởi tạo <code class="language-text">state</code>, bind các phương thức, thì ko cần khai báo phương thức này.</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">class</span> <span class="token class-name">Clicker</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function">constructor</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>handleClick <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handleClick<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span>\n       clicks<span class="token punctuation">:</span> <span class="token number">0</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token function">handleClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> \n      clicks<span class="token punctuation">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>clicks <span class="token operator">+</span> <span class="token number">1</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token comment">//...</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<blockquote>\n<p>Đừng chuyển props sang state! Xử lý logic sẽ hết sức rắc rối về sau</p>\n</blockquote>\n<p>Đừng làm thế này nhé</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token function">constructor</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>\n <span class="token comment">// DON\'T DO THIS</span>\n <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span> color<span class="token punctuation">:</span> props<span class="token punctuation">.</span>color <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<h1 id="componentdidmount"><a href="#componentdidmount" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>componentDidMount()</h1>\n<p>Component đã hiện hình, là lúc mà ta gọi AJAX</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token function">componentDidMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">\'https://gitconnected.com\'</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        user<span class="token punctuation">:</span> res<span class="token punctuation">.</span>user\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Có thể gọi <code class="language-text">setState()</code> ở dòng đầu tiên của phương thức <code class="language-text">componentDidMount()</code>, hàm <code class="language-text">render()</code> sẽ được gọi lại một lần nữa, nhưng nó chỉ xảy ra trước khi trình duyệt update DOM, render chắc chắn sẽ gọi 2 lần, user có thể không nhận ra sự thay đổi này, tuy nhiên đây là nguyên nhân cho vấn đề với performance. Nhưng cần thiết trong trường hợp như modal hay tooltip chúng ta cần tính toán vị trí của DOM trước khi render</p>\n<h1 id="componentdidupdateprevprops-prevstate-snapshot"><a href="#componentdidupdateprevprops-prevstate-snapshot" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>componentDidUpdate(prevProps, prevState, snapshot)</h1>\n<p>Ngay sau khi component được cập nhập, hook này sẽ được gọi. Không gọi trong lần render đầu. Đây cũng có thể là nơi để tạo một network request khi chúng ta so sánh <code class="language-text">prop</code> hiện tại với <code class="language-text">prop</code> ở thời điểm trước đó</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token function">componentDidUpdate</span><span class="token punctuation">(</span>prevProps<span class="token punctuation">,</span> prevState<span class="token punctuation">,</span> snapshot<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// Trường hợp thường dùng (đừng quên kiểm tra so sánh props):</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>userID <span class="token operator">!==</span> prevProps<span class="token punctuation">.</span>userID<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">fetchData</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>userID<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Nếu muốn gọi <code class="language-text">setState</code> ở đây, phải đưa nó trong câu điều kiện, nếu không sẽ bị lặp vô tận</p>\n<p>Nếu có implement phương thức <code class="language-text">getSnapshotBeforeUpdate()</code>, giá trị return của <code class="language-text">getSnapshotBeforeUpdate()</code> sẽ được đưa vào <code class="language-text">snapshot</code>, nếu không thì là <code class="language-text">undefined</code></p>\n<p>Hàm này cũng không được gọi nếu <code class="language-text">shouldComponentUpdate()</code> return false</p>\n<h1 id="componentwillunmount"><a href="#componentwillunmount" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>componentWillUnmount</h1>\n<p>Có thể sử dụng để remove các listener, các hàm setInterval, cancel network request</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token function">componentWillUnmount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  window<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">\'resize\'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>resizeEventHandler<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<h1 id="shouldcomponentupdatenextprops-nextstate"><a href="#shouldcomponentupdatenextprops-nextstate" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>shouldComponentUpdate(nextProps, nextState)</h1>\n<p>Có phương thức này để cải thiện performance của React, vì đôi lúc thay đổi <code class="language-text">state</code> hoặc <code class="language-text">props</code> ta không muốn cập nhập lại UI, chỉ cần cho hàm này return <code class="language-text">false</code> (mặc định là return <code class="language-text">true</code>), khi return <code class="language-text">false</code> thì <code class="language-text">render</code>, <code class="language-text">componentDidUpdate</code> sẽ không được gọi.</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token function">shouldComponentUpdate</span><span class="token punctuation">(</span>nextProps<span class="token punctuation">,</span> nextState<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n   <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>clicks <span class="token operator">!==</span> nextProps<span class="token punctuation">.</span>clicks<span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<h1 id="static-getderivedstatefrompropsprops-state"><a href="#static-getderivedstatefrompropsprops-state" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>static getDerivedStateFromProps(props, state)</h1>\n<p>Được gọi trước khi xuống <code class="language-text">render</code>, có thể return một object để update state, hoặc <code class="language-text">null</code></p>\n<p>Rất hiếm khi sử dụng, chỉ khi giá trị của <code class="language-text">state</code> phụ thuộc vào <code class="language-text">prop</code></p>\n<p>Nên hạn chế sử dụng hàm này, vì làm logic hiển thị của component rất ư khó hiểu, hãy nghĩ đến những cách implement đơn giản hơn bằng những lifecycle khác.</p>\n<h1 id="getsnapshotbeforeupdateprevprops-prevstate"><a href="#getsnapshotbeforeupdateprevprops-prevstate" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>getSnapshotBeforeUpdate(prevProps, prevState)</h1>\n<p>Gọi ngay trước khi render xuống DOM, cho phép lấy một số thông tin của DOM (ví dụ vị trí thanh scroll), các giá trị return từ hàm này sẽ đưa cho <code class="language-text">componentDidUpdate()</code></p>\n<h1 id="componentdidcatcherror-info"><a href="#componentdidcatcherror-info" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>componentDidCatch(error, info)</h1>\n<p>Nếu một component nào đó bị lỗi nó sẽ không chết nguyên cái app nữa mà sẽ quăn lỗi ở đây, sử dụng để hiển thị lỗi lên UI</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">class</span> <span class="token class-name">ErrorBoundary</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function">constructor</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span> hasError<span class="token punctuation">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function">componentDidCatch</span><span class="token punctuation">(</span>error<span class="token punctuation">,</span> info<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// Display fallback UI</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> hasError<span class="token punctuation">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">// You can also log the error to an error reporting service</span>\n    <span class="token function">logErrorToMyService</span><span class="token punctuation">(</span>error<span class="token punctuation">,</span> info<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>hasError<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token comment">// You can render any custom fallback UI</span>\n      <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Something went wrong<span class="token punctuation">.</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>children<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ErrorBoundary</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>MyWidget</span> <span class="token punctuation">/></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ErrorBoundary</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p><a href="https://reactjs.org/docs/react-component.html">Tài liệu đầy đủ chính thức của React Lifecycle</a></p>',timeToRead:5,excerpt:"render() constructor(props) componentDidMount() componentDidUpdate(prevProps, prevState, snapshot) componentWillUnmount…",frontmatter:{title:"Giải thích React Component Lifecycle",cover:"https://cdn-images-1.medium.com/max/1800/0*OoDfQ7pzAqg6yETH.",date:"2017-10-20",category:"react",tags:["javascript","react"],desc:"Tìm hiểu vòng đời của một Component React, khi nào và sử dụng ra sao"},fields:{slug:"/2017-10-20-react-lifecycle-la-gi"}}},pathContext:{slug:"/2017-10-20-react-lifecycle-la-gi",prev:{frontmatter:{title:"React Children và React cloneElement",desc:"Tìm hiểu cách sử dụng react Children và react cloneElement",type:"post",category:"react",tags:["javascript","react"],date:"2017-10-27",cover:""},fields:{slug:"/2017-10-27-react-children-react-clone-element"}},next:{frontmatter:{title:"Sort trong javascript",desc:"Nếu nghĩ đã hiểu rõ hàm Array.sort() trong javascript, hãy nghĩ lại!",type:"post",category:"javascript",tags:["javascript"],date:"2017-10-19",cover:""},fields:{slug:"/2017-10-19-sort-trong-javascript"}}}}}});
//# sourceMappingURL=path---2017-10-20-react-lifecycle-la-gi-c2550f6422acd3d38a30.js.map