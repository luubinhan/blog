webpackJsonp([87222628065369],{1610:function(n,a){n.exports={data:{markdownRemark:{html:'<p>Với các ứng dụng web ngày nay, không khó bắt gặp việc sử dụng object như một nơi lưu trữ state và các dạng dữ liệu cần thiết khác cho ứng dụng. Cụ thể nhất chúng ta thường thấy trong store của Redux.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">{</span> foo<span class="token punctuation">:</span> <span class="token number">42</span><span class="token punctuation">,</span> bar<span class="token punctuation">:</span> <span class="token number">1337</span> <span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// 🐌</span></code></pre>\n      </div>\n<p>Trong thực tế nó sẽ không đơn giản như ví dụ ở trên, mà cấu trúc nếu không chồng chéo thì cũng rất lớn vì phải gánh vác toàn bộ <code class="language-text">state</code> của ứng dụng. Nếu nó lại dữ liệu cần thiết trong lúc khởi tạo ứng dụng lần đầu tiên. Việc này sẽ nằm trong render critical path của trình duyệt, đồng nghĩa với việc user không thấy gì hết cho đến khi dữ liệu này được load, parse, compile, execute bởi Javascript engine bên dưới.</p>\n<p>Để khắc phục việc này một trong những cách làm là dùng server side rendering, chúng ta chỉ quăng cái HTML đã chứa toàn bộ kết quả của quá trình xuống user. Trình duyệt user không cần đảm đương công việc đó nữa.</p>\n<p>Nhưng nếu chúng ta không thể dùng server side rendering thì sao?</p>\n<p>Nếu object chúng ta cần không chứa những gì mà JSON không hỗ trợ, như BigInt, Maps, Sets,... Chúng ta có thể sử dụng <code class="language-text">JSON.parse</code></p>\n<p>Vì cú pháp của JSON đơn giản hơn nhiều so với Javascript, nên quá trình parse sẽ ít tốn kém hơn so với Javascript rất nhiều.</p>\n<p>Nội dung bên trong JSON đối với các engine rất dễ đoán, và ngược lại với các object. Thí dụ nếu bạn là cái engine rồi nhìn vào đây</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>\'<span class="token punctuation">{</span></code></pre>\n      </div>\n<p>Khi bạn thấy dấu <code class="language-text">{</code>, bạn sẽ biết được chỉ có 2 khả năng có thể xảy ra: một là bắt đầu một object, hai là một JSON không hợp lệ.</p>\n<p>Trong khi đó sau dấu <code class="language-text">{</code>  của object, có rất nhiều khả năng xảy ra</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> x <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> y <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>x<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Đây có phải là object không? Giá trị x đang trỏ tới đâu? Không thể nào có đáp án nếu không xem hết toàn bộ code</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">// khởi tạo object, x trở tới thằng khai báo trước đó</span>\n<span class="token keyword">const</span> y <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>x<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token comment">// object destructuring, x không trỏ tới thằng đầu</span>\n<span class="token keyword">const</span> y <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>x<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span> x<span class="token punctuation">:</span> <span class="token number">21</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// một arrow function</span>\n<span class="token keyword">const</span> <span class="token function-variable function">y</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span>x<span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> x<span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Như vậy, nếu gặp dấu <code class="language-text">{</code>, các engine phải vô cùng thận trọng vì phải biết ngữ cảnh hiện tại mới biết nó là gì. </p>\n<p>Lợi dụng đặc tính này chúng ta có thể cải thiện tốc độ của các ứng dụng web có sử dụng một object có cấu trúc tương tự như JSON ( ví dụ như Redux Store). Thay vì sử dụng một khai báo object như thế này</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">{</span> foo<span class="token punctuation">:</span> <span class="token number">42</span><span class="token punctuation">,</span> bar<span class="token punctuation">:</span> <span class="token number">1337</span> <span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// 🐌</span></code></pre>\n      </div>\n<p>Có thể tăng tốc bằng cách viết</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">\'{"foo":42,"bar":1337}\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 🚀</span></code></pre>\n      </div>\n<p>Miễn là việc tính toán này chỉ cần parse một lần bằng <code class="language-text">JSON.parse</code>, nó sẽ nhanh hơn nhiều so với cách khai bao object bình thường, và chỉ nên suy nghĩ áp dụng khi object đã vượt quá kích thước 10kB. </p>\n<p>Thực hiện kiểm tra tốc độ của một object khoảng 8Mb dung lượng trên các engine khác nhau. Kết quả nhận được ít nhất cũng tăng tốc gấp 1.5 lần trên các phiên bản khác nhau của V8</p>\n<p><img src="https://v8.dev/_img/cost-of-javascript-2019/json.svg"></p>\n<p><a href="https://v8.dev/blog/cost-of-javascript-2019#json">https://v8.dev/blog/cost-of-javascript-2019#json</a></p>\n<p><a href="https://www.youtube.com/watch?v=ff4fgQxPaO0">Faster apps with JSON.parse (Chrome Dev Summit 2019)</a></p>',timeToRead:3,excerpt:"Với các ứng dụng web ngày nay, không khó bắt gặp việc sử dụng object như một nơi lưu trữ state và các dạng dữ liệu cần thiết khác cho ứng…",frontmatter:{title:"Ứng dụng JSON.parse để cải thiện tốc độ?",cover:"",date:"2019-12-14",category:null,tags:["javascript","thu-thuat"],desc:"Thủ thuật để cải thiện tốc độ bằng JSON.parse"},fields:{slug:"/2019-12-14-thu-thuat-tang-toc-bang-json-parse"}}},pathContext:{slug:"/2019-12-14-thu-thuat-tang-toc-bang-json-parse",prev:!1,next:{frontmatter:{title:"Tối ưu component React bằng React.memo, useMemo và useCallback",desc:"Sử dụng những hàm có sẵn của React để viết component ngon hơn",type:"post",category:null,tags:["react","thu-thuat"],date:"2019-12-13",cover:""},fields:{slug:"/2019-12-13-huong-dan-cai-thien-hieu-nang-react-component"}}}}}});
//# sourceMappingURL=path---2019-12-14-thu-thuat-tang-toc-bang-json-parse-fb52d96513107424cd65.js.map