webpackJsonp([0x873a88a6e23a],{1626:function(n,t){n.exports={data:{markdownRemark:{html:'<p>Đơn vị viewport trong css (<code class="language-text">vh</code>, <code class="language-text">vw</code>) không phải lúc nào cũng chạy đúng trên mọi trình duyệt điện thoại. Giống như chưa đủ khổ cho dev nên mỗi trình duyệt mobile lại có cách xử lý riêng cho đơn vị này.</p>\n<p>Cách mà <a href="https://www.w3.org/TR/css-values-3/#viewport-relative-lengths">w3 định nghĩa</a> cách tính đơn vị này. Với mobile cái chúng ta quan tâm nhiều nhất là đơn vị <code class="language-text">vh</code></p>\n<blockquote>\n<p>1vh = 1% độ cao khởi tạo của khu vực trình duyệt dùng để hiển thị trang web.</p>\n</blockquote>\n<p>Nghĩa là giá trị này không bao gồm các phần khác của trình duyệt, như thanh address, thanh bookmark (<strong>nếu có</strong>), tab bar, ... và những thứ linh tinh khác mà user có thể add thêm vào trình duyệt của họ.</p>\n<p>Nhưng khi bạn bắt đầu scroll trên điện thoại, câu chuyện trở nên phức tạp hơn, thanh address bar sẽ biến mất, giá trị của <code class="language-text">vh</code> cần phải cập nhập lại, hiện tượng <em>cà khịa</em> xuất hiện trên màn hình.</p>\n<p>Trình duyệt Safari trên iOS là người tiên phong sử dụng luôn một giá trị cố định đúng với kích thước màn hình (không phải kích thước khung hiển thị của trình duyệt). Chrome mobile cũng bắt đầu áp dụng cách này để chặn việc nội dung trang nhảy lung tung.</p>\n<p>Điều này có ý nghĩa như thế nào? Nghĩa là khi bạn đặt giá trị <code class="language-text">100vh</code> nó sẽ vượt ra ngoài, user sẽ phải scroll trên trình duyệt để xem hết.</p>\n<p><img src="https://i2.wp.com/css-tricks.com/wp-content/uploads/2018/07/viewport-units-mobile-crop.jpg?ssl=1"></p>\n<p>Để khắc phục nhược điểm này. Chúng ta không thể trông cậy vào css, phải dùng đến javascript túm lấy độ cao <code class="language-text">window.innerHeight</code>, lưu giá trị đó lại thành một biến CSS và sử dụng nó thay cho đơn vị <code class="language-text">vh</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token selector">.my-element</span> <span class="token punctuation">{</span>\n  <span class="token property">height</span><span class="token punctuation">:</span> 100vh<span class="token punctuation">;</span> <span class="token comment">/* fallback khi trình duyệt không hỗ trợ biến css */</span>\n  <span class="token property">height</span><span class="token punctuation">:</span> <span class="token function">calc</span><span class="token punctuation">(</span><span class="token function">var</span><span class="token punctuation">(</span>--vh<span class="token punctuation">,</span> 1vh<span class="token punctuation">)</span> * 100<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Chúng ta sẽ <em>túm lấy</em> và định nghĩa <code class="language-text">--vh</code> bằng javascript</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">// Trước tiên lấy viewport height và chuyển thành giá trị 1%</span>\n<span class="token keyword">let</span> vh <span class="token operator">=</span> window<span class="token punctuation">.</span>innerHeight <span class="token operator">*</span> <span class="token number">0.01</span><span class="token punctuation">;</span>\n<span class="token comment">// Đặt biến css</span>\ndocument<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>style<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">"--vh"</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>vh<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">px</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Còn một vấn đề nhỏ còn lại cần phải xử lý là cập nhập lại giá trị này khi trình duyệt thay đổi kích thước (xoay trái, xoay phải, xoay ngang, xoay dọc)</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">// chạy lại khi window resize</span>\nwindow<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"resize"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token comment">// làm tương tự 2 bước đã làm</span>\n  <span class="token keyword">let</span> vh <span class="token operator">=</span> window<span class="token punctuation">.</span>innerHeight <span class="token operator">*</span> <span class="token number">0.01</span><span class="token punctuation">;</span>\n  document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>style<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token string">"--vh"</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>vh<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">px</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p><a href="https://css-tricks.com/the-trick-to-viewport-units-on-mobile/">The trick to viewport units on mobile</a></p>',timeToRead:2,excerpt:"Đơn vị viewport trong css ( ,  ) không phải lúc nào cũng chạy đúng trên mọi trình duyệt điện thoại. Giống như chưa đủ khổ cho dev nên mỗi…",frontmatter:{title:"Thủ thuật sử dụng đơn vị viewport trên mobile",cover:"",date:"2020-03-12",category:null,tags:["css","thu-thuat"],desc:"Để có thể quản lý được state của ứng dụng một cách tốt nhất, chúng ta cần sự phân chia phù hợp giữa local state (internal state của component) và state cửa ứng dụng đặt trong React Context. Một vài điều muốn chia sẽ để nâng cao khả năng bảo trì và trải nghiệm nếu sử dụng đến context trong React."},fields:{slug:"/2020-03-12-thu-thuat-su-dung-don-vi-viewport-tren-mobile"}}},pathContext:{slug:"/2020-03-12-thu-thuat-su-dung-don-vi-viewport-tren-mobile",prev:{frontmatter:{title:"Vấn đề của React Context trên các xử lý async",desc:"React Context có phải là viên đạn bạc sẽ giải quyết mọi vấn đề thay cho Redux hay không?",type:"post",category:null,tags:["react","thu-thuat"],date:"2020-03-16",cover:""},fields:{slug:"/2020-03-16-van-de-cua-react-context-tren-async"}},next:{frontmatter:{title:"Sử dụng React Context như thế nào cho hiệu quả",desc:"Để có thể quản lý được state của ứng dụng một cách tốt nhất, chúng ta cần sự phân chia phù hợp giữa local state (internal state của component) và state cửa ứng dụng đặt trong React Context. Một vài điều muốn chia sẽ để nâng cao khả năng bảo trì và trải nghiệm nếu sử dụng đến context trong React.",type:"post",category:null,tags:["react","thu-thuat"],date:"2020-03-08",cover:"https://miro.medium.com/max/2672/1*Y6W5NSQ_LQXLvt05q3JSkQ.jpeg"},fields:{slug:"/2020-03-08-huong-dan-su-dung-react-context-nhu-the-nao-cho-hieu-qua"}}}}}});
//# sourceMappingURL=path---2020-03-12-thu-thuat-su-dung-don-vi-viewport-tren-mobile-45b07ae82c5b6e22ff2f.js.map