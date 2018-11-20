webpackJsonp([0xb4dfc4628b5e],{1272:function(n,a){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#%C4%91%C3%B3ng-g%C3%B3i-c%C3%A1c-ph%C6%B0%C6%A1ng-th%E1%BB%A9c-g%E1%BB%8Di-api">Đóng gói các phương thức gọi API</a></li>\n<li><a href="#localstorage-v%C3%A0-cookies">localStorage và Cookies</a></li>\n<li><a href="#theo-d%C3%B5i-file">Theo dõi file</a></li>\n<li><a href="#tr%C3%ACnh-nghe-nh%E1%BA%A1c">Trình nghe nhạc</a></li>\n</ul>\n<!-- /TOC -->\n<p>Tổng hợp lại để nhớ về middleware, nó là 1 function nhận vào</p>\n<p>storeInstance\n=> functionToCallWithAnActionThatWillSendItToTheNextMiddleware\n=> actionThatDispatchWasCalledWith\n=> valueToUseAsTheReturnValueOfTheDispatchCall</p>\n<p>Được viết với dạng syntax</p>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">store =&gt; next =&gt; action =&gt; result</code></pre>\n      </div>\n<p>Sau đấy được sử dụng bằng cách truyền vào như một tham số cho hàm <code class="language-text">applyMiddleware</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> middlewares <span class="token operator">=</span> <span class="token function">applyMiddleware</span><span class="token punctuation">(</span>middleware1<span class="token punctuation">,</span> middleware2<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>reducers<span class="token punctuation">,</span> initState<span class="token punctuation">,</span> middlewares<span class="token punctuation">)</span></code></pre>\n      </div>\n<p>Middleware đơn giản nhất là một function éo làm gì cả, nó chỉ forward cái action đến middleware kế tiếp</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">middleware</span> <span class="token operator">=</span> store <span class="token operator">=></span> next <span class="token operator">=></span> action <span class="token operator">=></span> <span class="token function">next</span><span class="token punctuation">(</span>action<span class="token punctuation">)</span></code></pre>\n      </div>\n<h2 id="Đóng-gói-các-phương-thức-gọi-api"><a href="#%C4%90%C3%B3ng-g%C3%B3i-c%C3%A1c-ph%C6%B0%C6%A1ng-th%E1%BB%A9c-g%E1%BB%8Di-api" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Đóng gói các phương thức gọi API</h2>\n<p>Nếu API của chúng ta cần authentication token, thay vì trên mỗi action creatỏ chúng ta lấy token (có thể từ <code class="language-text">store.getState</code> hoặc <code class="language-text">sessionStorage</code>), rồi truyền tham số này vào trước khi gọi api, chúng ta dùng middleware để làm chuyện đó sẽ tốt hơn</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">fetch</span> <span class="token operator">=</span> <span class="token punctuation">(</span>url<span class="token punctuation">,</span> params<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n    type<span class="token punctuation">:</span> <span class="token string">\'FETCH\'</span><span class="token punctuation">,</span>\n    url<span class="token punctuation">,</span>\n    params<span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">fetchMiddleware</span> <span class="token operator">=</span> fetchImplementation <span class="token operator">=></span> store <span class="token operator">=></span> next <span class="token operator">=></span> action <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>action<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">\'FETCH\'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">const</span> <span class="token punctuation">{</span>url<span class="token punctuation">,</span> params<span class="token punctuation">}</span> <span class="token operator">=</span> action<span class="token punctuation">;</span>\n        <span class="token keyword">const</span> token <span class="token operator">=</span> store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>token<span class="token punctuation">;</span>\n        _<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">(</span>params<span class="token punctuation">,</span> <span class="token string">\'headers.token\'</span><span class="token punctuation">,</span> token<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> <span class="token function">fetchImplementation</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> params<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token function">next</span><span class="token punctuation">(</span>action<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> middleware <span class="token operator">=</span> <span class="token function">applyMiddleware</span><span class="token punctuation">(</span><span class="token function">fetchMiddleware</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>fetch<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>reducers<span class="token punctuation">,</span> middleware<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// vi du goi action</span>\n<span class="token keyword">const</span> <span class="token function-variable function">getUser</span> <span class="token operator">=</span> id <span class="token operator">=></span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>dispatch<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`http://api.website.com/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">,</span> <span class="token punctuation">{</span>method<span class="token punctuation">:</span> <span class="token string">\'GET\'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Thằng middleware <code class="language-text">fetchMiddleware</code> khi túm được <code class="language-text">action.type</code> tên là <strong>FETCH</strong> nó sẽ thực hiện việc gởi một HTTP request và trả về 1 <code class="language-text">promise</code></p>\n<p>Ở đây để làm cho ví dụ đơn giản chúng ta không implement cái <code class="language-text">fetchImplementation</code> mà đang hard code thằng này sử dụng <code class="language-text">window.fetch</code></p>\n<h2 id="localstorage-và-cookies"><a href="#localstorage-v%C3%A0-cookies" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>localStorage và Cookies</h2>\n<p>Ứng dụng nào cũng sẽ cần lưu thông tin user, có thể là <em>authentication token</em> hoặc đường dẫn lần trước user truy cập. Chúng ta sẽ sử dụng middleware để lưu trạng thái này xuống <code class="language-text">localStorage</code> hoặc <em>cookies</em>.</p>\n<p>Nếu chúng ta gọi <code class="language-text">getState</code> trước khi gọi <code class="language-text">next(action)</code>, chúng ta sẽ có <strong>before state</strong> trước khi action đến tay <code class="language-text">reducer</code>, nếu chúng ta gọi nó sau <code class="language-text">next(action)</code>, chúng ta có <strong>after state</strong> sau khi reducer xử lý. Dựa vào <strong>before state</strong> và <strong>after state</strong> này chúng ta có thể thay đổi đúng cái đã bị thay đổi</p>\n<p>Ví dụ lưu authentication token xuống <code class="language-text">localStorage</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">middleware</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> store <span class="token operator">=></span> next <span class="token operator">=></span> action <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token comment">// lấy before state và after state</span>\n    <span class="token keyword">const</span> previousToken <span class="token operator">=</span> store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>token<span class="token punctuation">;</span>\n    <span class="token function">next</span><span class="token punctuation">(</span>action<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">const</span> nextToken <span class="token operator">=</span> store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>token<span class="token punctuation">;</span>\n\n    <span class="token comment">// thay đổi</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>nextToken <span class="token operator">!==</span> previousToken<span class="token punctuation">)</span> localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">\'token\'</span><span class="token punctuation">,</span> nextToken<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// lấy init state từ localStorage</span>\n<span class="token keyword">const</span> token <span class="token operator">=</span> localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">\'token\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> initState <span class="token operator">=</span> token\n    <span class="token operator">?</span> _<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">(</span>defaultState<span class="token punctuation">,</span> <span class="token string">\'token\'</span><span class="token punctuation">,</span> token<span class="token punctuation">)</span>\n    <span class="token punctuation">:</span> defaultState<span class="token punctuation">;</span>\n<span class="token keyword">const</span> middleware <span class="token operator">=</span> <span class="token function">applyMiddleware</span><span class="token punctuation">(</span><span class="token function">middleware</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>reducers<span class="token punctuation">,</span> initialState<span class="token punctuation">,</span> middlewares<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h2 id="theo-dõi-file"><a href="#theo-d%C3%B5i-file" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Theo dõi file</h2>\n<p>Ví dụ trong ứng dụng ta có state là <code class="language-text">activeFiles</code>, là một mảng file bạn muốn theo dõi thay đổi. Khi file thay đổi, chúng ta muốn <code class="language-text">dispatch</code> 1 action</p>\n<p>Sử dụng tương tự như trên</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">middleware</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> store <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> fileWatcher <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileWatcher</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    fileWatcher<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">\'file-changed\'</span><span class="token punctuation">,</span> filename <span class="token operator">=></span> <span class="token punctuation">{</span>\n        store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span> type<span class="token punctuation">:</span> <span class="token string">\'FILE_CHANGED\'</span><span class="token punctuation">,</span> filename <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// Make sure we\'re watching files that may be included in the store\'s initial state</span>\n    <span class="token keyword">const</span> initialFiles <span class="token operator">=</span> store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>activeFiles<span class="token punctuation">;</span>\n    fileWatcher<span class="token punctuation">.</span><span class="token function">watchFiles</span><span class="token punctuation">(</span>initialFiles<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> next <span class="token operator">=></span> action <span class="token operator">=></span> <span class="token punctuation">{</span>\n        <span class="token comment">// Get the state before and after the action was performed</span>\n        <span class="token keyword">const</span> previousFiles <span class="token operator">=</span> store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>activeFiles<span class="token punctuation">;</span>\n        <span class="token function">next</span><span class="token punctuation">(</span>action<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">const</span> nextFiles <span class="token operator">=</span> store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>activeFiles<span class="token punctuation">;</span>\n\n        <span class="token comment">// See what changed before and after</span>\n        <span class="token keyword">const</span> filesToUnwatch <span class="token operator">=</span> _<span class="token punctuation">.</span><span class="token function">difference</span><span class="token punctuation">(</span>previousFiles<span class="token punctuation">,</span> nextFiles<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">const</span> filesToWatch <span class="token operator">=</span> _<span class="token punctuation">.</span><span class="token function">difference</span><span class="token punctuation">(</span>nextFiles<span class="token punctuation">,</span> previousFiles<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token comment">// Respond to changes</span>\n        fileWatcher<span class="token punctuation">.</span><span class="token function">unwatchFiles</span><span class="token punctuation">(</span>filesToUnwatch<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        fileWatcher<span class="token punctuation">.</span><span class="token function">watchFiles</span><span class="token punctuation">(</span>filesToWatch<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Ở đây thì nó không phụ thuộc action: vô tư tạo vô số action nếu muốn thay đổi giá trị active files, chúng ta không cần thay đổi logic trong middleware.</p>\n<p>Về mặt kỹ thuật, ví vụ trên có thể viết lại bằng cách sử dụng <code class="language-text">store.subscribe</code>. Tuy nhiên tiếp cận vấn đề liên quan tới side-effect của middleware phụ thuộc vào action bằng middleware là tốt nhất</p>\n<h2 id="trình-nghe-nhạc"><a href="#tr%C3%ACnh-nghe-nh%E1%BA%A1c" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Trình nghe nhạc</h2>\n<p>Rất giống như ví vụ trên. Khác biệt quan trọng là: sự thay đổi của <code class="language-text">state</code> có thể xảy ra từ middleware hoặc từ những nguồn khác.</p>\n<p>Giờ chúng ta có <code class="language-text">state</code> là <code class="language-text">isPlaying</code> và <code class="language-text">currentTime</code>. Chúng ta sẽ giữ đúng khái niệm "single source of truth" của redux, middleware sẽ đảm nhiệm việc giữ giá rị state này. Nếu action thay đổi <code class="language-text">isPlaying</code> từ <code class="language-text">false</code> sang <code class="language-text">true</code>, thì ta play nhạc, nếu action thay đổi <code class="language-text">currentTime</code> chúng ta sẽ phát đến đúng thời gian đó.</p>\n<p>Để cho chính xác, trong middleware chúng ta adjust một chút để khi <code class="language-text">isPlaying</code> chuyển sang <code class="language-text">false</code>, chúng ta thay đổi luôn <code class="language-text">currentTime</code>. Cái ngày cực kỳ quan trọng vì chúng ta không muốn cứ mỗi khi <code class="language-text">currentTime</code> mà thay đổi thì chúng ta lại phát đúng đến thời điểm đó. Thêm parameter <code class="language-text">origin</code> trong action để làm đối số kiểm tra</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">middleware</span> <span class="token operator">=</span> musicPlayer <span class="token operator">=></span> store <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> playbackOrigin <span class="token operator">=</span> <span class="token string">\'playbackOrigin\'</span><span class="token punctuation">;</span>\n\n    musicPlayer<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">\'current-time-changed\'</span><span class="token punctuation">,</span> currentTime <span class="token operator">=></span> <span class="token punctuation">{</span>\n        store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span> type<span class="token punctuation">:</span> <span class="token string">\'SET_CURRENT_TIME\'</span><span class="token punctuation">,</span> origin<span class="token punctuation">:</span> playbackOrigin<span class="token punctuation">,</span> currentTime <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    musicPlayer<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">\'playback-finished\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n        store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span> type<span class="token punctuation">:</span> <span class="token string">\'STOP_PLAYING\'</span><span class="token punctuation">,</span> origin<span class="token punctuation">:</span> playbackOrigin <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">const</span> initState <span class="token operator">=</span> store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>initState<span class="token punctuation">.</span>isPlaying<span class="token punctuation">)</span> musicPlayer<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    musicPlayer<span class="token punctuation">.</span><span class="token function">seek</span><span class="token punctuation">(</span>initState<span class="token punctuation">.</span>currentTime<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token keyword">return</span> next <span class="token operator">=></span> action <span class="token operator">=></span> <span class="token punctuation">{</span>\n        <span class="token keyword">const</span> <span class="token punctuation">{</span> isPlaying<span class="token punctuation">:</span> wasPlaying<span class="token punctuation">,</span> currentTime<span class="token punctuation">:</span> previousTime <span class="token punctuation">}</span> <span class="token operator">=</span> store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">next</span><span class="token punctuation">(</span>action<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">const</span> <span class="token punctuation">{</span> isPlaying<span class="token punctuation">:</span> isPlaying<span class="token punctuation">,</span> currentTime<span class="token punctuation">:</span> nextTime <span class="token punctuation">}</span> <span class="token operator">=</span> store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token comment">// không dispatch action với các action từ player</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>action<span class="token punctuation">.</span>origin <span class="token operator">===</span> playbackOrigin<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>\n\n        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>wasPlaying <span class="token operator">&amp;&amp;</span> isPlaying<span class="token punctuation">)</span> musicPlayer<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>wasPlaying <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>isPlaying<span class="token punctuation">)</span> musicPlayer<span class="token punctuation">.</span><span class="token function">pause</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>previousTime <span class="token operator">!==</span> nextTime<span class="token punctuation">)</span> musicPlayer<span class="token punctuation">.</span><span class="token function">seek</span><span class="token punctuation">(</span>nextTime<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Miễn là làm đúng cái middleware này, chúng ta sẽ không bao giờ dính mấy con bug kiểu như nút Play thì đang cho thấy ở trạng thái Pause trong khi đang phát rầm rầm.</p>\n<p><a href="https://medium.com/@jacobp100/you-arent-using-redux-middleware-enough-94ffe991e6">Link bài gốc của tác giả Jacob Parker</a></p>',timeToRead:6,excerpt:"Đóng gói các phương thức gọi API localStorage và Cookies Theo dõi file Trình nghe nhạc Tổng hợp lại để nhớ về middleware, nó là 1 function…",frontmatter:{title:"Một số ứng dụng của middleware",cover:"",date:"2018-06-21",category:"react",tags:["react","redux","javascript","middleware"],desc:"Tiếp theo bài trước về middleware, ứng dụng với các trường hợp thực tế"},fields:{slug:"/2018-06-21-huong-dan-mot-so-ung-dung-cua-middleware"}}},pathContext:{slug:"/2018-06-21-huong-dan-mot-so-ung-dung-cua-middleware",prev:{frontmatter:{title:"Làm việc với console trong javascript",desc:"Một web developer chân chính là người biết sử dụng console.log :D. Tuy nhiên cũng nên biết rằng console nó còn rất nhiều phương thức khác nữa",type:"post",category:"javascript",tags:["javascript"],date:"2018-06-24",cover:""},fields:{slug:"/2018-06-24-huong-dan-lam-viec-voi-console-trong-javascript"}},next:{frontmatter:{title:"Tiếp tục luận bàn về cách tổ chức thư mục, đặt tên component trong React",desc:"Hổm đã viết về vấn đề này rồi, giờ lại viết tiếp, vì bản thân React cũng không ra bất cứ rule nào về việc này, bạn tự do tổ chức sao mà mình thấy hợp lý, bài trước là của tác giả đó thấy vậy là hay, bài này thì tác giả thích tổ chức thế này",type:"post",category:"react",tags:["react","javascript"],date:"2018-06-18",cover:""},fields:{slug:"/2018-06-18-huong-dan-luan-ban-ve-cach-to-chuc-thu-muc-dat-ten"}}}}}});
//# sourceMappingURL=path---2018-06-21-huong-dan-mot-so-ung-dung-cua-middleware-60be1fcf0f04ca5b39ec.js.map