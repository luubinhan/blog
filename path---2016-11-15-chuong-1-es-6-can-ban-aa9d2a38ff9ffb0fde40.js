webpackJsonp([51],{"./node_modules/json-loader/index.js!./.cache/json/2016-11-15-chuong-1-es-6-can-ban.json":function(n,s){n.exports={data:{markdownRemark:{html:'<p>Một object trong javascript được khai như sau</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">let</span> book <span class="token operator">=</span> <span class="token punctuation">{</span>\n title<span class="token punctuation">:</span> <span class="token string">\'ES6\'</span><span class="token punctuation">,</span>\n author<span class="token punctuation">:</span> <span class="token string">\'anluu\'</span><span class="token punctuation">,</span>\n publisher<span class="token punctuation">:</span> <span class="token string">\'luckyluu\'</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Những nâng cấp cho Object trong ES6</p>\n<h1>Cách viết tắt thay vì Key: Value</h1>\n<p>Bình thường thì khai báo dạng giá trị của một object bằng <code>key: value</code>, bây giờ không cần <code>value</code> nữa, nếu <code>key</code> tham chiếu tới một biến hoặc hàm, nói cách khác là nếu nó cùng tên với hàm hoặc biến được định nghĩa trước đó</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">var</span> listeners <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>\n<span class="token keyword">function</span> <span class="token function">listen</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token keyword">var</span> api <span class="token operator">=</span> <span class="token punctuation">{</span>listeners<span class="token punctuation">,</span> listen<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>object nhìn "sạch sẽ" hơn</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">var</span> store <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token keyword">var</span> api <span class="token operator">=</span> <span class="token punctuation">{</span> getItem<span class="token punctuation">,</span> setItem<span class="token punctuation">,</span> clear <span class="token punctuation">}</span>\n<span class="token keyword">function</span> <span class="token function">getItem</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">{</span>\n <span class="token keyword">return</span> key <span class="token keyword">in</span> store <span class="token operator">?</span> store<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token punctuation">:</span> <span class="token keyword">null</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">function</span> <span class="token function">setItem</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span>value<span class="token punctuation">)</span><span class="token punctuation">{</span>\n store<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> value\n<span class="token punctuation">}</span>\n<span class="token keyword">function</span> <span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n store <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<h1>Khi key là 1 biến hoặc hàm</h1>\n<p>Nếu cần khai báo <code>key</code> là một biến, nó không phải là một giá trị định sẵn, với ES5 thì sẽ viết như sau</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">var</span> expertise <span class="token operator">=</span> <span class="token string">\'journalism\'</span>\n<span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token punctuation">{</span>\n name<span class="token punctuation">:</span> <span class="token string">\'Sharon\'</span><span class="token punctuation">,</span>\n age<span class="token punctuation">:</span> <span class="token string">\'28\'</span>\n<span class="token punctuation">}</span>\nperson<span class="token punctuation">[</span>expertise<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n years<span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">,</span>\n interests<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'international\'</span><span class="token punctuation">,</span><span class="token string">\'politics\'</span><span class="token punctuation">,</span><span class="token string">\'internet\'</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Với ES6 object key không nhất thiết phải là tên cố định, nó có thể là biến, đặt trong dấu <code>[]</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">var</span> expertise <span class="token operator">=</span> <span class="token string">\'journalism\'</span>\n<span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token punctuation">{</span>\n name<span class="token punctuation">:</span> <span class="token string">\'Sharon\'</span><span class="token punctuation">,</span>\n age<span class="token punctuation">:</span> <span class="token string">\'28\'</span><span class="token punctuation">,</span>\n <span class="token punctuation">[</span>expertise<span class="token punctuation">]</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>\n  years<span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">,</span>\n  interests<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'international\'</span><span class="token punctuation">,</span><span class="token string">\'politics\'</span><span class="token punctuation">,</span><span class="token string">\'internet\'</span><span class="token punctuation">]</span>\n <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p><strong>Lưu ý</strong> không nên kết hợp sử dụng giữa cả 2 cách viết trên cùng lúc, vì sẽ sinh ra lỗi và đọc rất khó hiểu</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">var</span> expertise <span class="token operator">=</span> <span class="token string">\'journalism\'</span>\n<span class="token keyword">var</span> journalism <span class="token operator">=</span> <span class="token punctuation">{</span>\n years<span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">,</span>\n interest<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'international\'</span><span class="token punctuation">,</span><span class="token string">\'politics\'</span><span class="token punctuation">,</span><span class="token string">\'internet\'</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token punctuation">{</span>\n name<span class="token punctuation">:</span> <span class="token string">\'Sharon\'</span><span class="token punctuation">,</span>\n age<span class="token punctuation">:</span> <span class="token string">\'28\'</span><span class="token punctuation">,</span>\n <span class="token punctuation">[</span>expertise<span class="token punctuation">]</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Tình huống thường sử dụng đến computed property name khi muốn thêm một entity vào một object map sử dụng entity.id như là key. Thay vì có câu khai báo thứ 3 để thêm grocery vào groceries map, chúng ta có thể viết khai báo inline nó trong groceries luôn</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">var</span> grocery <span class="token operator">=</span> <span class="token punctuation">{</span>\n id<span class="token punctuation">:</span> <span class="token string">\'bananas\'</span><span class="token punctuation">,</span>\n name<span class="token punctuation">:</span> <span class="token string">\'Bananas\'</span><span class="token punctuation">,</span>\n units<span class="token punctuation">:</span> <span class="token number">6</span><span class="token punctuation">,</span>\n price<span class="token punctuation">:</span> <span class="token number">10</span><span class="token punctuation">,</span>\n currency<span class="token punctuation">:</span> <span class="token string">\'USD\'</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">var</span> groceries <span class="token operator">=</span> <span class="token punctuation">{</span>\n <span class="token punctuation">[</span>grocery<span class="token punctuation">.</span>id<span class="token punctuation">]</span><span class="token punctuation">:</span> grocery\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Tình huống khác, khi có một hàm nhận một tham số truyền vào để tạo ra một đối tượng mới, đây là cách làm của ES5, tạo một object mới, khai báo các property động dựa vào tham số truyền vào, sau đó trả về object. Ví dụ hàm getEnvelope sẽ trả về type="error" với description khi có lỗi, type="success" + description khi mọi thứ ok</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">function</span> getEnvelope <span class="token punctuation">(</span>type<span class="token punctuation">,</span> description<span class="token punctuation">)</span><span class="token punctuation">{</span>\n <span class="token keyword">var</span> envelope <span class="token operator">=</span> <span class="token punctuation">{</span>\n  data<span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n <span class="token punctuation">}</span>\n envelope<span class="token punctuation">[</span>type<span class="token punctuation">]</span> <span class="token operator">=</span> description\n <span class="token keyword">return</span> envelope\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Có thể viết bằng một dòng khai báo với computed property names</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">function</span> getEnvelope <span class="token punctuation">(</span>type<span class="token punctuation">,</span> description<span class="token punctuation">)</span><span class="token punctuation">{</span>\n <span class="token keyword">return</span> <span class="token punctuation">{</span>\n  data<span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">:</span> description\n <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<h2>Định nghĩa một phương thức</h2>\nBình thường để định nghĩa một phương thức trong object\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">var</span> reserver <span class="token operator">=</span> <span class="token number">4</span>\n<span class="token keyword">var</span> emitter <span class="token operator">=</span> <span class="token punctuation">{</span>\n emit<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>evenName<span class="token punctuation">)</span><span class="token punctuation">{</span>\n\n <span class="token punctuation">}</span><span class="token punctuation">,</span>\n <span class="token keyword">get</span> <span class="token function">fuel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n  <span class="token keyword">return</span> reserver\n <span class="token punctuation">}</span><span class="token punctuation">,</span>\n <span class="token keyword">set</span> <span class="token function">fuel</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">{</span>\n  reserver <span class="token operator">=</span> value\n <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Hàm <code>set</code> và <code>get</code> thì vẫn giữ như cũ, phương thức có thể khai bảo mà không cần từ khóa <code>function</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">var</span> reserver <span class="token operator">=</span> <span class="token number">4</span>\n<span class="token keyword">var</span> emitter <span class="token operator">=</span> <span class="token punctuation">{</span>\n <span class="token keyword">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n   reserver <span class="token operator">=</span> <span class="token number">0</span>\n <span class="token punctuation">}</span><span class="token punctuation">,</span>\n <span class="token keyword">get</span> <span class="token function">fuel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n  <span class="token keyword">return</span> reserver\n <span class="token punctuation">}</span><span class="token punctuation">,</span>\n <span class="token keyword">set</span> <span class="token function">fuel</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">{</span>\n  reserver <span class="token operator">=</span> value\n <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\nemitter<span class="token punctuation">.</span>fuel <span class="token operator">=</span> <span class="token number">10</span>\nemitter<span class="token punctuation">.</span><span class="token keyword">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>Tức nhiên vẫn khai báo phương thức như bình thường được, cách khai bao mới này có vẻ hơi dễ lẫn lộn giữa phương thức và object, tất nhiên đây chỉ là thêm lựa chọn để viết chứ không khuyến khích viết theo kiểu này vì nhìn code không được tường minh.</p>',frontmatter:{date:"November 15, 2016",path:"/2016-11-15-chuong-1-es6-can-ban",tags:["javascript"],title:"ES6 Căn bản (phần 1) - Những nâng cấp cho Object",desc:"Nếu bạn đã đọc bài FrontEnd Developer 2016 nên học gì? Chắc bạn đã rối không biết bắt đầu từ đâu nếu muốn dấn thân vào cuộc chơi nhiều cám dỗ này. Mình nghĩ cái đầu tiên cần học là ES6."}}},pathContext:{prev:{excerpt:"Khai báo Lexical scoping là gì Một số dạng khai báo Nên và không nên Khai báo Trước đây để khai báo hàm trong javascript Hoặc, tạo một hàm ẩn (anonymous function), sau đó gán hàm này cho biến, key của object Bắt đầu từ ES6 ta có thêm một cách để viết...",html:'<!-- MarkdownTOC -->\n<ul>\n<li>Khai báo</li>\n<li>Lexical scoping là gì</li>\n<li>Một số dạng khai báo</li>\n<li>Nên và không nên</li>\n</ul>\n<!-- /MarkdownTOC -->\n<h1>Khai báo</h1>\n<p>Trước đây để khai báo hàm trong javascript</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">function</span> <span class="token function">name</span><span class="token punctuation">(</span>paramters<span class="token punctuation">)</span><span class="token punctuation">{</span>\n <span class="token comment" spellcheck="true">//body</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Hoặc, tạo một hàm ẩn (anonymous function), sau đó gán hàm này cho biến, key của object</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">var</span> mystyle <span class="token operator">=</span><span class="token keyword">function</span> <span class="token punctuation">(</span>paramters<span class="token punctuation">)</span><span class="token punctuation">{</span>\n <span class="token comment" spellcheck="true">//body</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Bắt đầu từ ES6 ta có thêm một cách để viết một hàm không có tên (hàm ẩn), có thể viết hàm trên bằng cách mới</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">var</span> mystyle <span class="token operator">=</span> <span class="token punctuation">(</span>paramters<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span>\n <span class="token comment" spellcheck="true">//body</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Bỏ từ khóa <code>function</code>, thêm vào <code>=></code>  sau <code>paramater</code>. Sự khác biệt của <em>arrow function</em> là nó <strong>không được phép đặt tên</strong> và là dạng <code>lexical scoping</code></p>\n<h1>Lexical scoping là gì</h1>\n<p>Từ khóa <code>this</code> và <code>argument</code> điều trỏ về đối tượng cha bự nhất. Ví dụ cho dễ hiểu cái nha. Chúng ta có đối tượng <code>timer</code> với biến đếm <code>second</code> và phương thức <code>start</code>. Khi chạy <code>timer</code> một vài giây, log giá trị <code>seconds</code> hiện tại</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">var</span> timer <span class="token operator">=</span> <span class="token punctuation">{</span>\n seconds<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>\n <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span>\n   <span class="token keyword">this</span><span class="token punctuation">.</span>seconds<span class="token operator">++</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>\n <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\ntimer<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token function">setTimer</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>timer<span class="token punctuation">.</span>seconds<span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">3500</span><span class="token punctuation">)</span>\n<span class="token comment" spellcheck="true">// result -3</span>\n</code></pre>\n      </div>\n<p>Nếu hàm truyền vào cho <code>setInterval</code> là một hàm bình thường nó sẽ không hiểu <code>this.second</code> là thằng nào, ta phải khai báo thêm <code>self = this</code> ở trên <em>timer</em>, từ khóa this không còn đi theo ngữ cảnh hiện tại mà nó sẽ tham chiếu lên trên.</p>\n<h1>Một số dạng khai báo</h1>\n<p>Nếu <em>arrow function</em> chỉ chứa một <em>parameter</em> duy nhất, bỏ luôn dấu `()<code></code> viết gì cho dễ đọc</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">var</span> double <span class="token operator">=</span> value <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span>\n <span class="token keyword">return</span> value <span class="token operator">*</span> <span class="token number">2</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Với hàm mà return 1 dòng như vậy có thể rút ngắn lại</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">var</span> double <span class="token operator">=</span> value <span class="token operator">=</span><span class="token operator">></span> value <span class="token operator">*</span> <span class="token number">2</span>\n</code></pre>\n      </div>\n<h1>Nên và không nên</h1>\n<p>ES6 không có nghĩa là cái nào cũng tốt hơn ES5, <em>arrow function</em> có trường hợp không nên sử dụng. Ví dụ nếu hàm lớn với vài chục dòng code, thay thế bằng <em>arrow function</em> là điều không nên làm, nên nhớ <em>arrow function</em> không được phép có tên, trong mọi trường hợp hàm có tên đi kèm luôn dễ maintain hơn.</p>\n<p>Arrow function tuyệt vời khi cần một hàm không tên thực hiện một vài thao tác đơn giản. Thí dụ kết hợp với những hàm như .map, .filter, .reduce</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>value <span class="token operator">=</span><span class="token operator">></span> value <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span> value <span class="token operator">=</span><span class="token operator">></span> value <span class="token operator">></span> <span class="token number">2</span> <span class="token punctuation">)</span>\n<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span> value <span class="token operator">=</span><span class="token operator">></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> value <span class="token punctuation">)</span> <span class="token punctuation">)</span>\n</code></pre>\n      </div>',id:"E:/anluu/luckyluu/posts/2016-11-16-chuong-2-es6-can-ban-arrow-function/index.md absPath of file >>> MarkdownRemark",timeToRead:2,frontmatter:{date:"2016-11-16T13:35:13.234Z",path:"/2016-11-16-chuong-2-es6-can-ban-arrow-function",tags:["javascript"],title:"Hồi 2: ES6 căn bản - Arrow Function"}},next:{excerpt:'Google Accelerated Mobile Pages - Nó là gì? Ưu điểm của Google AMP Cài đặt Google AMP for Wordpress Trong giới làm web ai cũng biết một điều "Speed is King". Dân tình thích mưa một gói hàng trên mạng và phải được giao ngay lập tức, ít nhất là trong...',html:'<!-- MarkdownTOC -->\n<ul>\n<li>Google Accelerated Mobile Pages - Nó là gì?</li>\n<li>Ưu điểm của Google AMP</li>\n<li>Cài đặt Google AMP for Wordpress</li>\n</ul>\n<!-- /MarkdownTOC -->\n<p>Trong giới làm web ai cũng biết một điều "Speed is King". Dân tình thích mưa một gói hàng trên mạng và phải được giao ngay lập tức, ít nhất là trong 24g, chậm trễ vài ngày là thấy hông vui, thích post tấm hình lên facebook có triệu triệu lượt người like ngay lập tức.</p>\n<p>Kết quả <a href="https://blogs.akamai.com/2015/06/performance-matters-more-than-ever.html" target="_blank">thống kê</a> cảm nhận người dùng</p>\n<ul>\n<li>Với những trang bán hàng, 30% người dùng mong muốn trang web phải load xong trong 1 giây.</li>\n<li>Phân nữa khách hàng sẽ không quay lại mua sắm trực tuyến nếu thủ tục checkout rườm ra lâu lắc</li>\n<li>90% người mua hàng sử dụng điện thoại để tham khảo thông tin trước khi mua sắm</li>\n<li>74% người dùng sẽ đóng ngay trang web nếu nó load quá 5 giây</li>\n</ul>\n<p>Túm lại phải optimize tối đa cho trang web load sau thật nhanh. Một cách mới nếu muốn tối ưu cho người dùng điện thoại là dùng Google Accelerated Mobile Pages</p>\n<h2>Google Accelerated Mobile Pages - Nó là gì?</h2>\n<p>Gọi tắt là Google AMP là một dịch vụ của google cho phép lưu một phiên bản của trang trên google host, ưu điểm là khi truy cập vào trang này trên mobile thì nó gần như được load ngay lập tức thông qua trang tìm kiếm.</p>\n<p>Lúc search trên điện thoại bản sẽ thấy kết quá trả về một số trang có ký hiệu tia sét phía trước</p>\n<p><img src="https://luckyluu.files.wordpress.com/2016/11/amp-example1.png" alt="Lúc search trên điện thoại bản sẽ thấy kết quá trả về một số trang có ký hiệu tia sét phai trước"></p>\n<p>Tất nhiêu để làm được chuyện này thì phiên bản lưu trên google đã cắt bớt một số thành phần không cần thiết trên trang</p>\n<h2>Ưu điểm của Google AMP</h2>\n<p>Một vài ưu điểm chính dễ thấy</p>\n<ul>\n<li>Có cơ hội được hiển thị trên top bài viết trên trang kết quả tìm kiếm (thanh cuộn ngang)</li>\n<li>Trãi nghiệm người dùng tốt hơn</li>\n<li>Được google rank cao hơn, google đánh giá dựa trên tốc độ trang web load trên điện thoại</li>\n<li>Setup đơn gian giản chưa tới 20 giây</li>\n<li>Hiển thị ads trên phiên bản AMP khác với bình thường</li>\n</ul>\n<h2>Cài đặt Google AMP for Wordpress</h2>\n<p><a href="https://wordpress.org/plugins/amp/">Plugin dành cho wordpress có thể tìm tại đây</a></p>\n<p>Nói chung cài xong, active lên là chạy không cần setup gì hết. Sao khi chạy thành công trên mỗi bài viết thêm vào phía sao đường dẫn "/amp" để kiểm tra nó có hoạt dộng chưa</p>\n<p><em>Ghi chú</em></p>\n<ul>\n<li>Plugin này chỉ chạy trên Post không chạy cho page</li>\n<li>Không hổ trợ ads và thiết đặt một số thuộc tính riêng của trang AMP</li>\n<li>Không thay đổi cách hiện thị của trang AMP</li>\n</ul>\n<p>Một số plugin khác có thể sử dụng</p>\n<p><a href="https://wordpress.org/plugins/custom-amp-accelerated-mobile-pages/">Custom AMP</a></p>\n<p><a href="https://wordpress.org/plugins/accelerated-mobile-pages/">AMP for WP</a></p>\n<p>Dịch và chỉnh sửa từ <a href="http://wplift.com/google-amp">http://wplift.com/google-amp</a></p>',id:"E:/anluu/luckyluu/posts/2016-11-07-wordpress-va-google-accelerated-mobile-pages-amp-tat-ca-nhung-gi-ban-can-biet/index.md absPath of file >>> MarkdownRemark",timeToRead:2,frontmatter:{date:"2016-11-07T13:35:13.234Z",path:"/2016-11-07-wordpress-va-google-accelerated-mobile-pages-amp-tat-ca-nhung-gi-ban-can-biet",tags:["wordpress","SEO"],title:"Wordpress và Google Accelerated Mobile Pages (AMP): Tất cả những gì bạn cần biết"}}}}}});
//# sourceMappingURL=path---2016-11-15-chuong-1-es-6-can-ban-aa9d2a38ff9ffb0fde40.js.map