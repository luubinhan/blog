webpackJsonp([68303250225119],{1485:function(n,s){n.exports={data:{markdownRemark:{html:'<p>Một trong những cách đơn giản nhất để tạo masonry layout là dùng flexbox, tất cả những gì cần làm là set <code class="language-text">flex-flow: column wrap</code> và <code class="language-text">height: giá-trị-độ-cao-nào-đó</code>, là bạn có kiểu layout nổi tiếng của pinterest.</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token comment">/* hiển thị theo dạng column, rớt dòng khi cần thiết */</span>\n<span class="token selector">.container</span> <span class="token punctuation">{</span>\n    <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>\n    <span class="token property">flex-flow</span><span class="token punctuation">:</span> column wrap<span class="token punctuation">;</span>\n    <span class="token property">align-content</span><span class="token punctuation">:</span> space-between<span class="token punctuation">;</span>\n    <span class="token comment">/* fixed height, cao hơn độ cao của item cao nhất */</span>\n    <span class="token property">height</span><span class="token punctuation">:</span> 960px<span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Cách này bị một vấn đề, thứ tự các item chúng ta sẽ là như thế này\n<img src="https://i.imgur.com/Xiyr8Gj.jpg" alt="Làm layout masonry bằng flexbox"></p>\n<p>Đây không phải là kết quả chúng ta mong muốn, nó phải xếp các item từ trái qua phải mới hợp gu</p>\n<p>Nếu chuyển giá trị <code class="language-text">flex-direction: row</code>, thứ tự sẽ đúng như mong muốn, tuy nhiên nó lại bị khoảng trống khi các item có độ cao không đồng nhất, như thế này </p>\n<p><img src="https://i.imgur.com/iC5BJRw.jpg" alt="Làm layout masonry bằng flexbox"></p>\n<p>Sử dụng kết hợp với 2 thuộc tính <code class="language-text">:nth-child()</code> và <code class="language-text">order</code> để giải quyết vấn đề này</p>\n<table>\n<thead>\n<tr>\n<th></th>\n<th>Column 1</th>\n<th>Column 2</th>\n<th>Column 3</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Row 1</td>\n<td>1</td>\n<td>2</td>\n<td>3</td>\n</tr>\n<tr>\n<td>Row 2</td>\n<td>4</td>\n<td>5</td>\n<td>6</td>\n</tr>\n<tr>\n<td>Row 3</td>\n<td>7</td>\n<td>8</td>\n<td>9</td>\n</tr>\n<tr>\n<td>Row 4</td>\n<td>10</td>\n<td>11</td>\n<td>12</td>\n</tr>\n</tbody>\n</table>\n<p>Chúng ta có 3 cột, chúng ta sẽ xếp các item theo từng cột, nhưng order nó theo hàng</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token comment">/* sắp xếp lại theo từng dòng */</span>\n<span class="token selector">.item:nth-child(3n+1)</span> <span class="token punctuation">{</span> <span class="token property">order</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span> <span class="token punctuation">}</span>\n<span class="token selector">// set order = 1 cho các item 1, 4, 7, 10,...\n.item:nth-child(3n+2)</span> <span class="token punctuation">{</span> <span class="token property">order</span><span class="token punctuation">:</span> 2<span class="token punctuation">;</span> <span class="token punctuation">}</span>\n<span class="token selector">// set order = 1 cho các item 2, 5, 8, 11,...\n.item:nth-child(3n)</span> <span class="token punctuation">{</span> <span class="token property">order</span><span class="token punctuation">:</span> 3<span class="token punctuation">;</span> <span class="token punctuation">}</span>\n// set order = 1 cho các item 3<span class="token punctuation">,</span> 6<span class="token punctuation">,</span> 9<span class="token punctuation">,</span> 12<span class="token punctuation">,</span>...</code></pre>\n      </div>\n<p>Với các item có cùng giá trị order như <code class="language-text">1, 4, 7, 10</code> trình duyệt sẽ render theo thứ tự xuất hiện của html, một cách ngắn gọn với đoạn css trên chúng ta đã xếp các item lại theo thứ tự là <code class="language-text">1,4,7,10,2,5,8,11,3,6,9,12</code></p>\n<p>Còn một trường hợp có thể xảy ra là item có độ cao ko <code class="language-text">fill</code> hết chỗ trống trong cột, khi ấy nó sẽ dồn item đó về cột phía trước</p>\n<p><img src="https://i.imgur.com/4oBdLOd.png" alt="Làm layout masonry bằng flexbox"></p>\n<p>Để xử trí vụ này, đây là một cái trick khá vi diệu, chúng ta sẽ chèn 2 element <code class="language-text">before</code> và <code class="language-text">after</code> có giá trị  <code class="language-text">order: 2</code> để các item sẽ theo thứ tự <code class="language-text">1, 4, 7, 10, &lt;break&gt;, 2, 5, 8, 11, &lt;break&gt;, 3, 6, 9, 12</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token comment">/* bắt buộc chèn vào cột mới */</span>\n<span class="token selector">.container::before,\n.container::after</span> <span class="token punctuation">{</span>\n<span class="token property">content</span><span class="token punctuation">:</span> “”<span class="token punctuation">;</span>\n<span class="token property">flex-basis</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>\n<span class="token property">width</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>\n<span class="token property">order</span><span class="token punctuation">:</span> 2<span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Đường màu xám là 2 element <code class="language-text">before</code> và <code class="language-text">after</code></p>\n<p><img src="https://i.imgur.com/yTnodUu.jpg" alt="Làm layout masonry bằng flexbox"></p>\n<p>Toàn bộ source</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>item<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>item<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>item<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n  ...\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token comment">/* hiển thị theo dạng column, rớt dòng khi cần thiết */</span>\n<span class="token selector">.container</span> <span class="token punctuation">{</span>\n  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>\n  <span class="token property">flex-flow</span><span class="token punctuation">:</span> column wrap<span class="token punctuation">;</span>\n  <span class="token property">align-content</span><span class="token punctuation">:</span> space-between<span class="token punctuation">;</span>\n<span class="token comment">/* fixed height, cao hơn độ cao của item cao nhất */</span>\n  <span class="token property">height</span><span class="token punctuation">:</span> 600px<span class="token punctuation">;</span> \n<span class="token punctuation">}</span>\n\n<span class="token selector">.item</span> <span class="token punctuation">{</span>\n  <span class="token property">width</span><span class="token punctuation">:</span> 32%<span class="token punctuation">;</span>\n  <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 2%<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">/* sắp xếp lại theo từng dòng */</span>\n<span class="token selector">.item:nth-child(3n+1)</span> <span class="token punctuation">{</span> <span class="token property">order</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span> <span class="token punctuation">}</span>\n<span class="token selector">// set order = 1 cho các item 1, 4, 7, 10,...\n.item:nth-child(3n+2)</span> <span class="token punctuation">{</span> <span class="token property">order</span><span class="token punctuation">:</span> 2<span class="token punctuation">;</span> <span class="token punctuation">}</span>\n<span class="token selector">// set order = 1 cho các item 2, 5, 8, 11,...\n.item:nth-child(3n)</span> <span class="token punctuation">{</span> <span class="token property">order</span><span class="token punctuation">:</span> 3<span class="token punctuation">;</span> <span class="token punctuation">}</span>\n// set order = 1 cho các item 3<span class="token punctuation">,</span> 6<span class="token punctuation">,</span> 9<span class="token punctuation">,</span> 12<span class="token punctuation">,</span>...\n\n<span class="token comment">/* bắt buộc chèn vào cột mới */</span>\n<span class="token selector">.container::before,\n.container::after</span> <span class="token punctuation">{</span>\n  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">;</span>\n  <span class="token property">flex-basis</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>\n  <span class="token property">width</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>\n  <span class="token property">order</span><span class="token punctuation">:</span> 2<span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p><a href="https://codepen.io/collection/XPjvPP/">Toàn bộ source trên codepen</a></p>\n<p><a target="_blank" rel="noopener noreferrer" href="https://tobiasahlin.com/blog/masonry-with-css/">CSS masonry with flexbox, :nth-child(), and order</a></p>',timeToRead:3,excerpt:"Một trong những cách đơn giản nhất để tạo masonry layout là dùng flexbox, tất cả những gì cần làm là set   và  , là bạn có kiểu layout nổi…",frontmatter:{title:"Làm layout masonry bằng flexbox",cover:"",date:"2019-05-15",category:null,tags:["css"],desc:"Những ngày làm masonry layout với các thư viện jquery đã ko còn nữa"},fields:{slug:"/2019-05-15-huong-dan-layout-masonry-bang-flexbox"}}},pathContext:{slug:"/2019-05-15-huong-dan-layout-masonry-bang-flexbox",prev:{frontmatter:{title:"Giới thiệu về window.requestAnimationFrame",desc:"",type:"post",category:null,tags:["javascript"],date:"2019-05-24",cover:""},fields:{slug:"/2019-05-24-gioi-thieu-ve-request-animation"}},next:{frontmatter:{title:"Hướng dẫn handle event listener căn bản cho các bạn mới bắt đầu với javascript",desc:"Căn bản nhưng cần thiết",type:"post",category:null,tags:["javascript"],date:"2019-05-14",cover:""},fields:{slug:"/2019-05-14-huong-dan-handle-event-trong-javascript-cho-nguoi-moi"}}}}}});
//# sourceMappingURL=path---2019-05-15-huong-dan-layout-masonry-bang-flexbox-c4c12ffb796ac49101ec.js.map