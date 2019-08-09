webpackJsonp([0x71964e82f94d],{1439:function(n,a){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#l%E1%BA%A5y-t%E1%BA%A5t-c%E1%BA%A3-gi%C3%A1-tr%E1%BB%8B-kh%C3%B4ng-gi%E1%BB%91ng-nhau-trong-array">Lấy tất cả giá trị không giống nhau trong array</a></li>\n<li><a href="#b%E1%BB%8F-qua-t%E1%BA%A5t-c%E1%BA%A3-gi%C3%A1-tr%E1%BB%8B-falsy">Bỏ qua tất cả giá trị falsy</a></li>\n<li><a href="#t%E1%BA%A1o-m%E1%BB%99t-object-r%E1%BB%97ng">Tạo một object rỗng</a></li>\n<li><a href="#merge-object">Merge object</a></li>\n<li><a href="#y%C3%AAu-c%E1%BA%A7u-parameter-cho-function">Yêu cầu parameter cho function</a></li>\n<li><a href="#destructuring-v%C3%A0-alias">Destructuring và alias</a></li>\n<li><a href="#l%E1%BA%A5y-gi%C3%A1-tr%E1%BB%8B-query-string">Lấy giá trị query string</a></li>\n</ul>\n<!-- /TOC -->\n<h2 id="lấy-tất-cả-giá-trị-không-giống-nhau-trong-array"><a href="#l%E1%BA%A5y-t%E1%BA%A5t-c%E1%BA%A3-gi%C3%A1-tr%E1%BB%8B-kh%C3%B4ng-gi%E1%BB%91ng-nhau-trong-array" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Lấy tất cả giá trị không giống nhau trong array</h2>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> j <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span>new <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">]</span>\n<span class="token comment">// 1,2,3</span></code></pre>\n      </div>\n<h2 id="bỏ-qua-tất-cả-giá-trị-falsy"><a href="#b%E1%BB%8F-qua-t%E1%BA%A5t-c%E1%BA%A3-gi%C3%A1-tr%E1%BB%8B-falsy" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Bỏ qua tất cả giá trị falsy</h2>\n<p>Khi cần bỏ quá các giá trị falsy (<code class="language-text">0</code>, <code class="language-text">undefined</code>, <code class="language-text">null</code>, <code class="language-text">false</code>, ... ) khỏi một array</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js">MyArray<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token comment">// ...</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>Boolean<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Đơn giản là đưa vào <code class="language-text">Boolean</code> cho hàm filter</p>\n<h2 id="tạo-một-object-rỗng"><a href="#t%E1%BA%A1o-m%E1%BB%99t-object-r%E1%BB%97ng" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Tạo một object rỗng</h2>\n<p>Tất nhiên chúng ta tạo một object rỗng bằng <code class="language-text">{}</code> là chuyện ai cũng biết. Chuyện ít ai biết là với cách đó object tạo ra vẫn chứa <code class="language-text">__proto__</code> và phương thức <code class="language-text">hasOwnProperty</code>. Để thực sự tạo một object rỗng đúng chất rỗng</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">let</span> dict <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// dict.__proto__ === "undefined"</span></code></pre>\n      </div>\n<h2 id="merge-object"><a href="#merge-object" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Merge object</h2>\n<p>Một trong những công việc bạn sẽ làm hàng ngày như ăn cơm bửa, có nhiều bài viết mình đã nhắc đến, nhưng nhắc lại vẫn là ko thừa.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> person <span class="token operator">=</span> <span class="token punctuation">{</span> name<span class="token punctuation">:</span> <span class="token string">\'David Walsh\'</span><span class="token punctuation">,</span> gender<span class="token punctuation">:</span> <span class="token string">\'Male\'</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> tools <span class="token operator">=</span> <span class="token punctuation">{</span> computer<span class="token punctuation">:</span> <span class="token string">\'Mac\'</span><span class="token punctuation">,</span> editor<span class="token punctuation">:</span> <span class="token string">\'Atom\'</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> attributes <span class="token operator">=</span> <span class="token punctuation">{</span> handsomeness<span class="token punctuation">:</span> <span class="token string">\'Extreme\'</span><span class="token punctuation">,</span> hair<span class="token punctuation">:</span> <span class="token string">\'Brown\'</span><span class="token punctuation">,</span> eyes<span class="token punctuation">:</span> <span class="token string">\'Blue\'</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> summary <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token operator">...</span>person<span class="token punctuation">,</span> <span class="token operator">...</span>tools<span class="token punctuation">,</span> <span class="token operator">...</span>attributes<span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token comment">/*\nObject {\n  "computer": "Mac",\n  "editor": "Atom",\n  "eyes": "Blue",\n  "gender": "Male",\n  "hair": "Brown",\n  "handsomeness": "Extreme",\n  "name": "David Walsh",\n}\n*/</span></code></pre>\n      </div>\n<h2 id="yêu-cầu-parameter-cho-function"><a href="#y%C3%AAu-c%E1%BA%A7u-parameter-cho-function" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Yêu cầu parameter cho function</h2>\n<p>Bạn đã biết dùng parameter mặc định cho function nếu ko truyền vào, vậy ngược lại, bắt buộc cung cấp một parameter nào đó thì sao?</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">isRequired</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">\'param is required\'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">hello</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">name <span class="token operator">=</span> <span class="token function">isRequired</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`hello </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// Lỗi ngay</span>\n<span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// Lỗi luôn</span>\n<span class="token function">hello</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// OK</span>\n<span class="token function">hello</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">hello</span><span class="token punctuation">(</span><span class="token string">\'David\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h2 id="destructuring-và-alias"><a href="#destructuring-v%C3%A0-alias" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Destructuring và alias</h2>\n<p>Đây cũng chẳng có gì lạ nếu bạn đã nắm destructuring, chúng ta có thể đặt một tên khác để sử dụng</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span> x<span class="token punctuation">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token comment">// cách bình thường</span>\n<span class="token keyword">const</span> <span class="token punctuation">{</span> x <span class="token punctuation">}</span> <span class="token operator">=</span> obj<span class="token punctuation">;</span>\n\n<span class="token comment">// dùng tên khác obj.x thành otherName</span>\n<span class="token keyword">const</span> <span class="token punctuation">{</span> x<span class="token punctuation">:</span> otherName <span class="token punctuation">}</span> <span class="token operator">=</span> obj<span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Hay sử dụng cách nào khi bị trùng tên biến</p>\n<h2 id="lấy-giá-trị-query-string"><a href="#l%E1%BA%A5y-gi%C3%A1-tr%E1%BB%8B-query-string" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Lấy giá trị query string</h2>\n<p>Trước đây chúng ta có thể sử dụng regular expression để lấy query string, giờ chúng ta có cách chính thức thông qua hàm <code class="language-text">URLSearchParams</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">// query string "?post=1234&amp;action=edit"</span>\n\n<span class="token keyword">var</span> urlParams <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">URLSearchParams</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>location<span class="token punctuation">.</span>search<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>urlParams<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span><span class="token string">\'post\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>urlParams<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">\'action\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// edit</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>urlParams<span class="token punctuation">.</span><span class="token function">getAll</span><span class="token punctuation">(</span><span class="token string">\'action\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ["edit"]</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>urlParams<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// "?post=1234&amp;action=edit" </span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>urlParams<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">\'active\'</span><span class="token punctuation">,</span> <span class="token string">\'1\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// "?post=1234&amp;action=edit&amp;active=1"</span></code></pre>\n      </div>\n<p>Nếu bạn còn trick nào hay ho khác, có thể chia sẽ cùng mọi người?</p>\n<p><a target="_blank" rel="noopener noreferrer" href="https://davidwalsh.name/javascript-tricks">7 Useful JavaScript Tricks</a></p>',timeToRead:3,excerpt:"Lấy tất cả giá trị không giống nhau trong array Bỏ qua tất cả giá trị falsy Tạo một object rỗng Merge object Yêu cầu parameter cho function…",frontmatter:{title:"7 thủ thuật trong javascript",cover:"",date:"2019-05-12",category:null,tags:["javascript"],desc:"7 thủ thuật hữu ích trong javascript"},fields:{slug:"/2019-05-12-7-thu-thuat-trong-javascript"}}},pathContext:{slug:"/2019-05-12-7-thu-thuat-trong-javascript",prev:{frontmatter:{title:"Hướng dẫn handle event listener căn bản cho các bạn mới bắt đầu với javascript",desc:"Căn bản nhưng cần thiết",type:"post",category:null,tags:["javascript"],date:"2019-05-14",cover:""},fields:{slug:"/2019-05-14-huong-dan-handle-event-trong-javascript-cho-nguoi-moi"}},next:{frontmatter:{title:"Kiểm tra element có nằm trong viewport không bằng javascript",desc:"Học cách viết một helper function để kiểm tra element nằm trong viewport",type:"post",category:null,tags:["javascript"],date:"2019-05-07",cover:""},fields:{slug:"/2019-05-07-huong-dan-xac-dinh-element-nam-trong-viewport"}}}}}});
//# sourceMappingURL=path---2019-05-12-7-thu-thuat-trong-javascript-58bde34df889819936e4.js.map