webpackJsonp([37197825307423],{1197:function(n,a){n.exports={data:{markdownRemark:{html:'<p>Trong Series này</p>\n<ol>\n<li><a href="/2016-11-15-chuong-1-es6-can-ban">Nâng cấp cho Object</a></li>\n<li><a href="/2016-11-16-chuong-2-es6-can-ban-arrow-function/">Arrow function</a></li>\n<li><a href="/2016-11-17-phan-3-es6-can-ban-assignment-destructuring">Assignment Destruction</a></li>\n<li><a href="/2016-11-18-phan-4-es6-can-ban-rest-parameters-va-spread-operator">Rest parameters và spread operator</a></li>\n<li><a href="/2016-11-19-phan-5-es6-can-ban-template-literals">Template literals</a></li>\n<li><a href="/2016-11-20-phan-6-es6-can-ban-khai-bao-let-const">Khai báo biến với let và const</a></li>\n<li><a href="/2016-11-21-phan-7-es6-can-ban-classes">Căn bản class</a></li>\n</ol>\n<!-- MarkdownTOC -->\n<ul>\n<li>Truy cập các phần tử của <code class="language-text">Objects</code></li>\n<li>Truy cập các phần tử của <code class="language-text">Arrays</code></li>\n<li>Truy cập các phần tử <code class="language-text">Parameters</code> của <code class="language-text">Function</code></li>\n<li>Ứng dụng</li>\n</ul>\n<!-- /MarkdownTOC -->\n<h2 id="truy-cập-các-phần-tử-của-code-classlanguage-textobjectscode"><a href="#truy-c%E1%BA%ADp-c%C3%A1c-ph%E1%BA%A7n-t%E1%BB%AD-c%E1%BB%A7a-code-classlanguage-textobjectscode" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Truy cập các phần tử của <code class="language-text">Objects</code></h2>\n<p>Tưởng tượng ta có nhân vật Bruce với mật danh Batman được định nghĩa như sau</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> character <span class="token operator">=</span> <span class="token punctuation">{</span>\n name<span class="token punctuation">:</span> <span class="token string">\'Bruce\'</span><span class="token punctuation">,</span>\n pseudonym<span class="token punctuation">:</span> <span class="token string">\'Batman\'</span><span class="token punctuation">,</span>\n metadata<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n  age<span class="token punctuation">:</span> <span class="token number">34</span><span class="token punctuation">,</span>\n  gender<span class="token punctuation">:</span> <span class="token string">\'male\'</span>\n <span class="token punctuation">}</span><span class="token punctuation">,</span>\n batarang<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'gas pellet\'</span><span class="token punctuation">,</span><span class="token string">\'bat-mobile control\'</span><span class="token punctuation">,</span><span class="token string">\'bat-cuffs\'</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Nếu bạn muốn biến <code class="language-text">pseudonym</code> tham chiếu đến <code class="language-text">character.pseudonym</code>, với ES5</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> pseudonym <span class="token operator">=</span> character<span class="token punctuation">.</span>pseudonym</code></pre>\n      </div>\n<p>Với ES6 ta có thể viết đoạn trên thành</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> <span class="token punctuation">{</span>pseudonym<span class="token punctuation">}</span> <span class="token operator">=</span> character</code></pre>\n      </div>\n<p>Cái này được gọi là <code class="language-text">Destructuring object</code>, nếu muốn khai báo nhiều biến như thế này tham chiếu tới key của object <em>character</em>, thêm dấu <code class="language-text">,</code> giữa mỗi biến</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> <span class="token punctuation">{</span>pseudonym<span class="token punctuation">,</span> name<span class="token punctuation">}</span> <span class="token operator">=</span> character</code></pre>\n      </div>\n<p>Nếu muốn tham chiếu đến key là <code class="language-text">pseudonym</code> nhưng lại muốn đặt tên biến là <code class="language-text">alias</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> <span class="token punctuation">{</span> pseudonym<span class="token punctuation">:</span> alias <span class="token punctuation">}</span> <span class="token operator">=</span> character\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> alias <span class="token punctuation">)</span>\n<span class="token comment">// The same with: alias = character.pseudonym</span></code></pre>\n      </div>\n<p>Nếu đặt giữa dấu <code class="language-text">{}</code> là đang truy xuất tới key bên dưới <code class="language-text">pseudonym</code> chứ ko phải đặt alias. Khi <code class="language-text">gender</code> chưa được định nghĩa, mặc định sẽ trả về <code class="language-text">undefined</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> <span class="token punctuation">{</span> pseudonym<span class="token punctuation">:</span> <span class="token punctuation">{</span>gender<span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token operator">=</span> character</code></pre>\n      </div>\n<p>Nếu kết hợp sử dụng alias và giá trị mặc định, viết tên alias trước rồi tới giá trị mặc định</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> <span class="token punctuation">{</span> boots<span class="token punctuation">:</span> footwear <span class="token operator">=</span> <span class="token boolean">true</span>  <span class="token punctuation">}</span> <span class="token operator">=</span> character</code></pre>\n      </div>\n<p>Sử dụng kết hợp với <code class="language-text">Computed Property</code>, trong trường hợp này bắt buộc đặt alias</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> person <span class="token operator">=</span>  <span class="token punctuation">{</span> scientist<span class="token punctuation">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>\n<span class="token keyword">var</span> type <span class="token operator">=</span> <span class="token string">\'scientist\'</span>\n<span class="token keyword">var</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">:</span> value <span class="token punctuation">}</span> <span class="token operator">=</span> person\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span></code></pre>\n      </div>\n<p>Câu này thì biết vậy thôi chứ ko cần dùng vì nó khó đọc hơn cách viết cũ <code class="language-text">value = person[type]</code></p>\n<h1 id="truy-cập-các-phần-tử-của-code-classlanguage-textarrayscode"><a href="#truy-c%E1%BA%ADp-c%C3%A1c-ph%E1%BA%A7n-t%E1%BB%AD-c%E1%BB%A7a-code-classlanguage-textarrayscode" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Truy cập các phần tử của <code class="language-text">Arrays</code></h1>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> coordinates <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">12</span><span class="token punctuation">,</span><span class="token operator">-</span><span class="token number">7</span><span class="token punctuation">]</span>\n<span class="token keyword">var</span> <span class="token punctuation">[</span>x<span class="token punctuation">,</span>y<span class="token punctuation">]</span> <span class="token operator">=</span> coordinates</code></pre>\n      </div>\n<p>Tương tự như object, khác ở chổ thay vì rào hay tham biến bằng <code class="language-text">{}</code>  thì rào nó vào <code class="language-text">[]</code>, câu trên tương tự với <code class="language-text">x = coordinates[0], y = coordinates[1]</code></p>\n<p>Để bỏ qua một giá trị trong mảng không muốn tham biến tới, bỏ trống</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> coordinates <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">12</span><span class="token punctuation">,</span><span class="token operator">-</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">]</span>\n<span class="token keyword">var</span> <span class="token punctuation">[</span>x<span class="token punctuation">,</span><span class="token punctuation">,</span>z<span class="token punctuation">]</span> <span class="token operator">=</span> coordinates</code></pre>\n      </div>\n<p>Tham biến giá trị mặc định lúc khởi tạo</p>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">var coordinates = [12,-7,20]\nvar [x,,z = 30] = coordinates\nconsole.log(z)\n// z=30</code></pre>\n      </div>\n<p>Trong ES5 để hoán đổi giá trị của 2 biến nào đó mình sẽ thêm một biến nữa để lưu tạm giá trị</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> left <span class="token operator">=</span> <span class="token number">5</span>\n<span class="token keyword">var</span> right <span class="token operator">=</span> <span class="token number">7</span>\n<span class="token keyword">var</span> tempt <span class="token operator">=</span> left\nleft <span class="token operator">=</span> right\nright <span class="token operator">=</span> tempt</code></pre>\n      </div>\n<p>Viết lại thế này với ES6</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> left <span class="token operator">=</span> <span class="token number">5</span>\n<span class="token keyword">var</span> right <span class="token operator">=</span> <span class="token number">7</span>\n<span class="token punctuation">[</span>left<span class="token punctuation">,</span> right<span class="token punctuation">]</span> <span class="token operator">=</span>  <span class="token punctuation">[</span>right<span class="token punctuation">,</span>left<span class="token punctuation">]</span></code></pre>\n      </div>\n<h2 id="truy-cập-các-phần-tử-code-classlanguage-textparameterscode-của-code-classlanguage-textfunctioncode"><a href="#truy-c%E1%BA%ADp-c%C3%A1c-ph%E1%BA%A7n-t%E1%BB%AD-code-classlanguage-textparameterscode-c%E1%BB%A7a-code-classlanguage-textfunctioncode" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Truy cập các phần tử <code class="language-text">Parameters</code> của <code class="language-text">Function</code></h2>\n<p>Cái này thì cũ rồi mà giờ mới có nè, giá trị mặc định cho <code class="language-text">parameter</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">function</span> <span class="token function">powerOf</span><span class="token punctuation">(</span> base<span class="token punctuation">,</span> exponent <span class="token operator">=</span> <span class="token number">2</span> <span class="token punctuation">)</span><span class="token punctuation">{</span>\n    <span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token function">pow</span><span class="token punctuation">(</span>base<span class="token punctuation">,</span> exponent<span class="token punctuation">)</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Sử dụng với <code class="language-text">Arrow function</code>, trường hợp này luôn luôn kẹp vào <code class="language-text">()</code> dù chỉ có một tham số</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> <span class="token function-variable function">double</span> <span class="token operator">=</span> <span class="token punctuation">(</span>input <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">=></span> input <span class="token operator">*</span> <span class="token number">2</span>\n<span class="token keyword">function</span> <span class="token function">sumOf</span> <span class="token punctuation">(</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span> c <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n <span class="token keyword">return</span> a <span class="token operator">+</span> b <span class="token operator">+</span> c\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Truyền vào tham số là một <code class="language-text">object</code> chứa nhiều <code class="language-text">key</code>, định giá trị mặc định cho <code class="language-text">key</code> của <code class="language-text">object</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">function</span> <span class="token function">carFactory</span><span class="token punctuation">(</span> options <span class="token operator">=</span> <span class="token punctuation">{</span> brand<span class="token punctuation">:</span> <span class="token string">"Suzuki"</span><span class="token punctuation">,</span> year<span class="token punctuation">:</span> <span class="token number">1989</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>options<span class="token punctuation">.</span>brand<span class="token punctuation">)</span>\n console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>options<span class="token punctuation">.</span>year<span class="token punctuation">)</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Để ý là nếu truyền vào <code class="language-text">object</code> chỉ một <code class="language-text">key</code>, thì toàn bộ <code class="language-text">key</code> mặc định cũng mất, ví dụ như <strong>options</strong> ở trên chỉ truyền vào <strong>year</strong> thì cái *<em>brand</em> mất</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token function">carFactory</span><span class="token punctuation">(</span><span class="token punctuation">{</span>year<span class="token punctuation">:</span> <span class="token number">2000</span><span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>Cách tốt nhất là nên truyền vào theo kiểu từng phần tử, không dùng <code class="language-text">object</code> <strong>options</strong>, sửa lại hàm ở trên thành</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">function</span> <span class="token function">carFactory</span><span class="token punctuation">(</span><span class="token punctuation">{</span>brand <span class="token operator">=</span> <span class="token string">"Suzuki"</span><span class="token punctuation">,</span> year <span class="token operator">=</span> <span class="token number">1999</span> <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>\n<span class="token punctuation">}</span>\n<span class="token function">carFactory</span><span class="token punctuation">(</span><span class="token punctuation">{</span>year<span class="token punctuation">:</span> <span class="token number">2000</span><span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<h2 id="Ứng-dụng"><a href="#%E1%BB%A8ng-d%E1%BB%A5ng" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Ứng dụng</h2>\n<p>Khi một hàm cần trả về <code class="language-text">object</code> hoặc <code class="language-text">array</code>. Ví dụ hàm bên dưới trả về tọa độ và <code class="language-text">type</code>, nhưng chúng ta có thể lấy đúng giá trị của tọa độ x, y, không quan tâm z, type</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">function</span> <span class="token function">getCoordinates</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n <span class="token keyword">return</span> <span class="token punctuation">{</span>x<span class="token punctuation">:</span> <span class="token number">10</span><span class="token punctuation">,</span> y<span class="token punctuation">:</span> <span class="token number">20</span><span class="token punctuation">,</span> z<span class="token punctuation">:</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> type<span class="token punctuation">:</span> <span class="token string">\'3d\'</span> <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">var</span> <span class="token punctuation">{</span>x<span class="token punctuation">,</span>y<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">getCoordinates</span><span class="token punctuation">(</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>Ví dụ ta có hàm <code class="language-text">random</code> để tạo một con số ngẫu nhiên nào đó trong phạm vi min và max được chỉ định, khi gọi hàm này cũng có thể thay đổi giá trị min, max tùy ý</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">function</span> <span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">{</span>min <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> max <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n <span class="token keyword">return</span> Match<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span>max <span class="token operator">-</span> min<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">+</span> min\n<span class="token punctuation">}</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">)</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">{</span>max<span class="token punctuation">:</span> <span class="token number">24</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">)</span></code></pre>\n      </div>\n<p>Khi sử dụng cùng với <code class="language-text">Regular expression</code>, ta có thể bỏ qua giá trí đầu tiên trả về vốn là giá trị truyền vào, ta chỉ cần lấy lấy kết quả year, month, day</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">function</span> <span class="token function">splitDate</span><span class="token punctuation">(</span>date<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n <span class="token keyword">var</span> rdate <span class="token operator">=</span> <span class="token regex">/(\\d+).(\\d+).(\\d+)/</span>\n <span class="token keyword">return</span> rdate<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span>date<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">var</span> <span class="token punctuation">[</span><span class="token punctuation">,</span>year<span class="token punctuation">,</span> month<span class="token punctuation">,</span> day<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">slitDate</span><span class="token punctuation">(</span><span class="token string">\'2016-11-16\'</span><span class="token punctuation">)</span></code></pre>\n      </div>',timeToRead:5,excerpt:"Trong Series này Nâng cấp cho Object Arrow function Assignment Destruction Rest parameters và spread operator Template literals Khai báo…",frontmatter:{title:"Hồi 3: ES6 căn bản - Truy cập phần tử",cover:"",date:"2016-11-17",category:"javascript",tags:["javascript"],desc:"Hồi 3 trong series ES6 căn bản, nói về Assignment Destructuring"},fields:{slug:"/2016-11-17-phan-3-es-6-can-ban-assignment-destructuring"}}},pathContext:{slug:"/2016-11-17-phan-3-es-6-can-ban-assignment-destructuring",prev:{frontmatter:{title:"Hồi 4: ES6 căn bản - Rest Parameters và Spread Operator",desc:"Hồi 4 trong series ES6 căn bản, nói về Rest Parameters và Spread Operator",type:"post",category:"javascript",tags:["javascript"],date:"2016-11-18",cover:""},fields:{slug:"/2016-11-18-phan-4-es-6-can-ban-rest-parameters-va-spread-operator"}},next:{frontmatter:{title:"Hồi 2: ES6 căn bản - Arrow Function",desc:"Hồi 2 trong series ES6 căn bản, nói về Arrow Function",type:"post",category:"javascript",tags:["javascript"],date:"2016-11-16",cover:""},fields:{slug:"/2016-11-16-chuong-2-es-6-can-ban-arrow-function"}}}}}});
//# sourceMappingURL=path---2016-11-17-phan-3-es-6-can-ban-assignment-destructuring-0ed08137d2e5629386d2.js.map