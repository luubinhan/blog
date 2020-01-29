webpackJsonp([0x7eea8a426484],{1430:function(n,a){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#js-modules-l%C3%A0-g%C3%AC">JS Modules là gì</a></li>\n<li><a href="#s%E1%BB%AD-d%E1%BB%A5ng-tr%C3%AAn-tr%C3%ACnh-duy%E1%BB%87t">Sử dụng trên trình duyệt</a></li>\n<li><a href="#l%C6%B0u-%C3%BD-v%E1%BB%81-extention">Lưu ý về extention</a></li>\n<li><a href="#module-m%E1%BA%B7c-%C4%91%E1%BB%8Bnh-l%C3%A0-load-defer">Module mặc định là load defer</a></li>\n</ul>\n<!-- /TOC -->\n<p>Lưu ý quan trọng JS modules được hỗ trợ bởi các trình duyệt XỊN, hàng cùi mía của Microsoft thì chưa support</p>\n<h2 id="js-modules-là-gì"><a href="#js-modules-l%C3%A0-g%C3%AC" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>JS Modules là gì</h2>\n<p>JS modules hay còn gọi là ES modules, ECMAcript modules là một tính năng quan trọng mới của của javascript, trước đây chúng ta sử dụng CommonJS trong Node.js hay AMD để có thể sử dụng tính năng này trước thời đại. Các thư viện này nó làm gì? nó cho phép chúng ta <code class="language-text">import</code> và <code class="language-text">export</code> cái chúng ta muốn</p>\n<p>Và giờ javascript trong tương lai không xa chúng ta sẽ không cần những thư viện này nữa vì có hỗ trợ sẵn.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">// file lib.mjs</span>\n<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">repeat</span> <span class="token operator">=</span> <span class="token parameter">string</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>string<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>string<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">shout</span><span class="token punctuation">(</span><span class="token parameter">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>string<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">!</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Chúng ta <code class="language-text">import</code> nó từ file khác</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">// file main.mjs</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span>repeat<span class="token punctuation">,</span> shout<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'./lib.mjs\'</span><span class="token punctuation">;</span>\n<span class="token function">repeat</span><span class="token punctuation">(</span><span class="token string">\'hello\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// -> \'hello hello\'</span>\n\n<span class="token function">shout</span><span class="token punctuation">(</span><span class="token string">\'Modules in action\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// -> \'MODULES IN ACTIONS!\'</span></code></pre>\n      </div>\n<p>Module file như vậy sẽ có một vài điểm cần lưu ý</p>\n<ul>\n<li><code class="language-text">strict mode</code> bật mặt định</li>\n<li>Kiểu viết comment như trong HTML không sử dụng được</li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">// Không sử dụng được đâu</span>\n<span class="token keyword">const</span> x <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span> <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> <span class="token constant">TODO</span><span class="token punctuation">:</span> Rename x to y<span class="token punctuation">.</span>\n<span class="token comment">// Viêt comment bình thường thôi</span>\n<span class="token keyword">const</span> x <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span> <span class="token comment">// TODO: Rename x to y.</span></code></pre>\n      </div>\n<ul>\n<li>lexical top-level scope, nghĩa là nếu khởi tạo biến <code class="language-text">var foo = 28</code> bên trong module không tạo một biến global tên <code class="language-text">foo</code>, chúng ta không access được <code class="language-text">window.foo</code></li>\n<li>Chỉ có thể sử dụng <code class="language-text">import</code> và <code class="language-text">export</code> trong file <code class="language-text">.mjs</code>, file thường ko xài được.</li>\n</ul>\n<h2 id="sử-dụng-trên-trình-duyệt"><a href="#s%E1%BB%AD-d%E1%BB%A5ng-tr%C3%AAn-tr%C3%ACnh-duy%E1%BB%87t" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Sử dụng trên trình duyệt</h2>\n<p>Để <strong>báo</strong> với trình duyệt chúng ta đang load 1 file module js</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>module<span class="token punctuation">"</span></span> <span class="token attr-name">scr</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>main.mjs<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">nomodule</span> <span class="token attr-name">scr</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>fallback.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Ở đây ngoài việc biết được trình duyệt đang mở có hỗ trợ module ko, chúng ta cũng có thể đoán được là nó có hỗ trợ js mới không như arrow function, async - await</p>\n<p>Một điều tuyệt vời khác của <code class="language-text">type=&quot;module&quot;</code> là mặc dù chúng ta add thêm bao nhiêu tag tùy thích nhưng nó sẽ chỉ load 1 file nếu giống nhau, ngược lại với js thường</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>classic.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>classic.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n<span class="token comment">&lt;!-- classic.js executes multiple times. --></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>module<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>module.mjs<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>module<span class="token punctuation">"</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>module.mjs<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>module<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript"><span class="token keyword">import</span> <span class="token string">\'./module.mjs\'</span><span class="token punctuation">;</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>\n<span class="token comment">&lt;!-- module.mjs executes only once. --></span></code></pre>\n      </div>\n<h2 id="lưu-ý-về-extention"><a href="#l%C6%B0u-%C3%BD-v%E1%BB%81-extention" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Lưu ý về extention</h2>\n<p>Ở trên chúng ta sử dụng file extention là <code class="language-text">.mjs</code>, đây chỉ là một quy ước để dễ phân biệt, trên web nếu javascript được served bằng MIME type \'text/javascript\' thì gần như là như nhau, sự phân biệt thực sự được đánh dấu bằng <code class="language-text">type=&quot;module&quot;</code> trên thẻ <code class="language-text">script</code></p>\n<h2 id="module-mặc-định-là-load-defer"><a href="#module-m%E1%BA%B7c-%C4%91%E1%BB%8Bnh-l%C3%A0-load-defer" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Module mặc định là load defer</h2>\n<p>JS bình thường sẽ block HTML parser khi nó chưa load xong, trừ khi chúng ta thêm attribute là <code class="language-text">defer</code> trên tag script, khi là module, tính năng <code class="language-text">defer</code> là mặc định <code class="language-text">true</code></p>\n<p><a href="https://developers.google.com/web/fundamentals/primers/modules">Link bài gốc</a></p>',timeToRead:3,excerpt:"JS Modules là gì Sử dụng trên trình duyệt Lưu ý về extention Module mặc định là load defer Lưu ý quan trọng JS modules được hỗ trợ bởi các…",frontmatter:{title:"Sử dụng javascript modules trên web",cover:"",date:"2018-07-02",category:"javascript",tags:["javascript"],desc:"Giới thiệu module trong ECMAcript"},fields:{slug:"/2018-07-02-huong-dan-javascript-modules-tren-web"}}},pathContext:{slug:"/2018-07-02-huong-dan-javascript-modules-tren-web",prev:{frontmatter:{title:"Tổng quát về canh lề với Flexbox display",desc:"Bây giờ chưa nắm vững về flexbox và cách canh lề trong flexbox thì thật là thiếu xót trong thời đại 2018, chúng ta đã qua thời xài float, clearfix",type:"post",category:null,tags:["css","mobile-web-specialist"],date:"2018-07-04",cover:""},fields:{slug:"/2018-07-04-huong-dan-tong-hop-canh-le-voi-flexbox-alignment"}},next:{frontmatter:{title:"Hướng dẫn setup tên miền GoDaddy với Github Page",desc:"Hướng dẫn cầu hình tên miền trên GoDaddy để sử dụng với Github page",type:"post",category:null,tags:["web","dns","githubpage"],date:"2018-07-01",cover:""},fields:{slug:"/2018-07-01-huong-dan-cai-dat-ten-mien-cho-githubpage-su-dung-godady"}}}}}});
//# sourceMappingURL=path---2018-07-02-huong-dan-javascript-modules-tren-web-2f8ade2873fe0b94493a.js.map