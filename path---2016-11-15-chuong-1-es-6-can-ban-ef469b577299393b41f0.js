webpackJsonp([47535539660880],{1223:function(n,s){n.exports={data:{markdownRemark:{html:'<p>Trong Series này</p>\n<ol>\n<li><a href="2016-11-15-chuong-1-es6-can-ban">Nâng cấp cho Object</a></li>\n<li><a href="2016-11-16-chuong-2-es6-can-ban-arrow-function/">Arrow function</a></li>\n<li><a href="2016-11-17-phan-3-es6-can-ban-assignment-destructuring">Assignment Destruction</a></li>\n<li><a href="2016-11-18-phan-4-es6-can-ban-rest-parameters-va-spread-operator">Rest parameters và spread operator</a></li>\n<li><a href="2016-11-19-phan-5-es6-can-ban-template-literals">Template literals</a></li>\n<li><a href="2016-11-20-phan-6-es6-can-ban-khai-bao-let-const">Khai báo biến với let và const</a></li>\n<li><a href="2016-11-21-phan-7-es6-can-ban-classes">Căn bản class</a></li>\n</ol>\n<p>Một object trong javascript được khai như sau</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">let</span> book <span class="token operator">=</span> <span class="token punctuation">{</span>\n title<span class="token punctuation">:</span> <span class="token string">\'ES6\'</span><span class="token punctuation">,</span>\n author<span class="token punctuation">:</span> <span class="token string">\'anluu\'</span><span class="token punctuation">,</span>\n publisher<span class="token punctuation">:</span> <span class="token string">\'luckyluu\'</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Những nâng cấp cho Object trong ES6</p>\n<h1 id="cách-viết-tắt-thay-vì-key-value"><a href="#c%C3%A1ch-vi%E1%BA%BFt-t%E1%BA%AFt-thay-v%C3%AC-key-value" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Cách viết tắt thay vì Key: Value</h1>\n<p>Bình thường thì khai báo dạng giá trị của một object bằng <code class="language-text">key: value</code>, bây giờ không cần <code class="language-text">value</code> nữa, nếu <code class="language-text">key</code> tham chiếu tới một biến hoặc hàm, nói cách khác là nếu nó cùng tên với hàm hoặc biến được định nghĩa trước đó</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">var</span> listeners <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>\n<span class="token keyword">function</span> <span class="token function">listen</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token keyword">var</span> api <span class="token operator">=</span> <span class="token punctuation">{</span>listeners<span class="token punctuation">,</span> listen<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>object nhìn "sạch sẽ" hơn</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">var</span> store <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token keyword">var</span> api <span class="token operator">=</span> <span class="token punctuation">{</span> getItem<span class="token punctuation">,</span> setItem<span class="token punctuation">,</span> clear <span class="token punctuation">}</span>\n<span class="token keyword">function</span> <span class="token function">getItem</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">{</span>\n <span class="token keyword">return</span> key <span class="token keyword">in</span> store <span class="token operator">?</span> store<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token punctuation">:</span> <span class="token keyword">null</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">function</span> <span class="token function">setItem</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span>value<span class="token punctuation">)</span><span class="token punctuation">{</span>\n store<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> value\n<span class="token punctuation">}</span>\n<span class="token keyword">function</span> <span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n store <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<h1 id="khi-key-là-1-biến-hoặc-hàm"><a href="#khi-key-l%C3%A0-1-bi%E1%BA%BFn-ho%E1%BA%B7c-h%C3%A0m" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Khi key là 1 biến hoặc hàm</h1>\n<p>Nếu cần khai báo <code class="language-text">key</code> là một biến, nó không phải là một giá trị định sẵn, với ES5 thì sẽ viết như sau</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> expertise <span class="token operator">=</span> <span class="token string">\'journalism\'</span>\n<span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token punctuation">{</span>\n name<span class="token punctuation">:</span> <span class="token string">\'Sharon\'</span><span class="token punctuation">,</span>\n age<span class="token punctuation">:</span> <span class="token string">\'28\'</span>\n<span class="token punctuation">}</span>\nperson<span class="token punctuation">[</span>expertise<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n years<span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">,</span>\n interests<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'international\'</span><span class="token punctuation">,</span><span class="token string">\'politics\'</span><span class="token punctuation">,</span><span class="token string">\'internet\'</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Với ES6 object key không nhất thiết phải là tên cố định, nó có thể là biến, đặt trong dấu <code class="language-text">[]</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> expertise <span class="token operator">=</span> <span class="token string">\'journalism\'</span>\n<span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token punctuation">{</span>\n name<span class="token punctuation">:</span> <span class="token string">\'Sharon\'</span><span class="token punctuation">,</span>\n age<span class="token punctuation">:</span> <span class="token string">\'28\'</span><span class="token punctuation">,</span>\n <span class="token punctuation">[</span>expertise<span class="token punctuation">]</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>\n  years<span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">,</span>\n  interests<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'international\'</span><span class="token punctuation">,</span><span class="token string">\'politics\'</span><span class="token punctuation">,</span><span class="token string">\'internet\'</span><span class="token punctuation">]</span>\n <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p><strong>Lưu ý</strong> không nên kết hợp sử dụng giữa cả 2 cách viết trên cùng lúc, vì sẽ sinh ra lỗi và đọc rất khó hiểu</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> expertise <span class="token operator">=</span> <span class="token string">\'journalism\'</span>\n<span class="token keyword">var</span> journalism <span class="token operator">=</span> <span class="token punctuation">{</span>\n years<span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">,</span>\n interest<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'international\'</span><span class="token punctuation">,</span><span class="token string">\'politics\'</span><span class="token punctuation">,</span><span class="token string">\'internet\'</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token punctuation">{</span>\n name<span class="token punctuation">:</span> <span class="token string">\'Sharon\'</span><span class="token punctuation">,</span>\n age<span class="token punctuation">:</span> <span class="token string">\'28\'</span><span class="token punctuation">,</span>\n <span class="token punctuation">[</span>expertise<span class="token punctuation">]</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Tình huống thường sử dụng đến computed property name khi muốn thêm một entity vào một object map sử dụng entity.id như là key. Thay vì có câu khai báo thứ 3 để thêm grocery vào groceries map, chúng ta có thể viết khai báo inline nó trong groceries luôn</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">var</span> grocery <span class="token operator">=</span> <span class="token punctuation">{</span>\n id<span class="token punctuation">:</span> <span class="token string">\'bananas\'</span><span class="token punctuation">,</span>\n name<span class="token punctuation">:</span> <span class="token string">\'Bananas\'</span><span class="token punctuation">,</span>\n units<span class="token punctuation">:</span> <span class="token number">6</span><span class="token punctuation">,</span>\n price<span class="token punctuation">:</span> <span class="token number">10</span><span class="token punctuation">,</span>\n currency<span class="token punctuation">:</span> <span class="token string">\'USD\'</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">var</span> groceries <span class="token operator">=</span> <span class="token punctuation">{</span>\n <span class="token punctuation">[</span>grocery<span class="token punctuation">.</span>id<span class="token punctuation">]</span><span class="token punctuation">:</span> grocery\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Tình huống khác, khi có một hàm nhận một tham số truyền vào để tạo ra một đối tượng mới, đây là cách làm của ES5, tạo một object mới, khai báo các property động dựa vào tham số truyền vào, sau đó trả về object. Ví dụ hàm getEnvelope sẽ trả về type="error" với description khi có lỗi, type="success" + description khi mọi thứ ok</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">function</span> <span class="token function">getEnvelope</span> <span class="token punctuation">(</span>type<span class="token punctuation">,</span> description<span class="token punctuation">)</span><span class="token punctuation">{</span>\n <span class="token keyword">var</span> envelope <span class="token operator">=</span> <span class="token punctuation">{</span>\n  data<span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n <span class="token punctuation">}</span>\n envelope<span class="token punctuation">[</span>type<span class="token punctuation">]</span> <span class="token operator">=</span> description\n <span class="token keyword">return</span> envelope\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Có thể viết bằng một dòng khai báo với computed property names</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">function</span> <span class="token function">getEnvelope</span> <span class="token punctuation">(</span>type<span class="token punctuation">,</span> description<span class="token punctuation">)</span><span class="token punctuation">{</span>\n <span class="token keyword">return</span> <span class="token punctuation">{</span>\n  data<span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">:</span> description\n <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<h2>Định nghĩa một phương thức</h2>\nBình thường để định nghĩa một phương thức trong object\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">var</span> reserver <span class="token operator">=</span> <span class="token number">4</span>\n<span class="token keyword">var</span> emitter <span class="token operator">=</span> <span class="token punctuation">{</span>\n emit<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>evenName<span class="token punctuation">)</span><span class="token punctuation">{</span>\n\n <span class="token punctuation">}</span><span class="token punctuation">,</span>\n <span class="token keyword">get</span> <span class="token function">fuel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n  <span class="token keyword">return</span> reserver\n <span class="token punctuation">}</span><span class="token punctuation">,</span>\n <span class="token keyword">set</span> <span class="token function">fuel</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">{</span>\n  reserver <span class="token operator">=</span> value\n <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Hàm <code class="language-text">set</code> và <code class="language-text">get</code> thì vẫn giữ như cũ, phương thức có thể khai bảo mà không cần từ khóa <code class="language-text">function</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">var</span> reserver <span class="token operator">=</span> <span class="token number">4</span>\n<span class="token keyword">var</span> emitter <span class="token operator">=</span> <span class="token punctuation">{</span>\n <span class="token keyword">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n   reserver <span class="token operator">=</span> <span class="token number">0</span>\n <span class="token punctuation">}</span><span class="token punctuation">,</span>\n <span class="token keyword">get</span> <span class="token function">fuel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n  <span class="token keyword">return</span> reserver\n <span class="token punctuation">}</span><span class="token punctuation">,</span>\n <span class="token keyword">set</span> <span class="token function">fuel</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">{</span>\n  reserver <span class="token operator">=</span> value\n <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\nemitter<span class="token punctuation">.</span>fuel <span class="token operator">=</span> <span class="token number">10</span>\nemitter<span class="token punctuation">.</span><span class="token keyword">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>Tức nhiên vẫn khai báo phương thức như bình thường được, cách khai báo mới này có vẻ hơi dễ lẫn lộn giữa phương thức và object, tất nhiên đây chỉ là thêm lựa chọn để viết chứ không khuyến khích viết theo kiểu này vì nhìn code không được tường minh.</p>',timeToRead:3,excerpt:"Trong Series này Nâng cấp cho Object Arrow function Assignment Destruction Rest parameters và spread operator Template literals Khai báo…",frontmatter:{title:"ES6 Căn bản (phần 1) - Những nâng cấp cho Object",cover:"",date:"2016-11-15",category:"javascript",tags:["javascript"],desc:"Nếu bạn đã đọc bài FrontEnd Developer 2016 nên học gì? Chắc bạn đã rối không biết bắt đầu từ đâu nếu muốn dấn thân vào cuộc chơi nhiều cám dỗ này. Mình nghĩ cái đầu tiên cần học là ES6."},fields:{slug:"/2016-11-15-chuong-1-es-6-can-ban"}}},pathContext:{slug:"/2016-11-15-chuong-1-es-6-can-ban",prev:{frontmatter:{title:"Hồi 2: ES6 căn bản - Arrow Function",desc:"Hồi 2 trong series ES6 căn bản, nói về Arrow Function",type:"post",category:"javascript",tags:["javascript"],date:"2016-11-16",cover:""},fields:{slug:"/2016-11-16-chuong-2-es-6-can-ban-arrow-function"}},next:{frontmatter:{title:"Wordpress và Google Accelerated Mobile Pages (AMP): Tất cả những gì bạn cần biết",desc:"Trong giới làm web ai cũng biết một điều Speed is King. Dân tình thích mua một gói hàng trên mạng và phải được giao ngay lập tức, ít nhất là trong 24g, chậm trễ vài ngày là thấy hông vui, thích post tấm hình lên facebook có triệu triệu lượt người like ngay lập tức.",type:"post",category:"wordpress",tags:["wordpress","SEO"],date:"2016-11-07",cover:""},fields:{slug:"/2016-11-07-wordpress-va-google-accelerated-mobile-pages-amp-tat-ca-nhung-gi-ban-can-biet"}}}}}});
//# sourceMappingURL=path---2016-11-15-chuong-1-es-6-can-ban-ef469b577299393b41f0.js.map