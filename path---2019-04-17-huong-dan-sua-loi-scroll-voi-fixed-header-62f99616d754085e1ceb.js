webpackJsonp([0x8435d1b93e70],{1424:function(n,e){n.exports={data:{markdownRemark:{html:'<p>Khi sử dụng hashtag <code class="language-text">#</code> cho attribute <code class="language-text">href</code>, trình duyệt sẽ scroll tới element có id tương ứng <code class="language-text">section-two</code>. Đây là một tính năng từ thời trình duyệt mới ra đời.</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>#section-two<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Section Two<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Nhưng một khi chúng ta thêm một element với <code class="language-text">position: fixed</code>,  như header, vị trí scroll đến sẽ ko còn đúng nữa, nó vẫn scroll tới element đó, nhưng giờ nó có thể bị che bởi element đang set fixed.</p>\n<p>Có rất nhiều cách để giải quyết vấn đề này trước đây, như thêm vào một đoạn padding vào element, hoặc dùng một đoạn javascript để handle, có tất cả <a href="http://nicolasgallagher.com/jump-links-and-viewport-positioning/demo/">5 cách để giải quyết con issue này</a>. </p>\n<p><img src="https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_964,f_auto,q_auto/v1553563039/anchor-linking_z85vjt.gif" alt="Fixed Header, Page Links"></p>\n<p>Giờ đây chúng ta có cách hoàn toàn mới <strong>chỉ với css</strong></p>\n<p>Sử dụng 2 thuộc tính mới là <code class="language-text">scroll-padding</code> và <code class="language-text">scroll-margin</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token selector">body</span> <span class="token punctuation">{</span>\n  <span class="token property">scroll-padding-top</span><span class="token punctuation">:</span> 70px<span class="token punctuation">;</span>\n <span class="token comment">/* giá trị chiều cao của header */</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Hiện tại cái này chỉ chạy tốt trên trình duyệt dùng Chromium</p>\n<iframe height="265" style="width: 100%;" scrolling="no" title="Scroll Padding on Fixed Postion Headers" src="//codepen.io/chriscoyier/embed/NJJERg/?height=265&theme-id=0&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">\n  See the Pen <a href=\'https://codepen.io/chriscoyier/pen/NJJERg/\'>Scroll Padding on Fixed Postion Headers</a> by Chris Coyier \n  (<a href=\'https://codepen.io/chriscoyier\'>@chriscoyier</a>) on <a href=\'https://codepen.io\'>CodePen</a>.\n</iframe>\n<p><a target="_blank" rel="noopener noreferrer" href="https://css-tricks.com/fixed-headers-on-page-links-and-overlapping-content-oh-my/">HFixed Headers, On-Page Links, and Overlapping Content, Oh My!\n</a></p>',timeToRead:1,excerpt:"Khi sử dụng hashtag   cho attribute  , trình duyệt sẽ scroll tới element có id tương ứng  . Đây là một tính năng từ thời trình duyệt mới ra…",frontmatter:{title:"Sửa lỗi scroll với fixed header bằng CSS",cover:"",date:"2019-04-17",category:null,tags:["css"],desc:"Giải quyết issue với fixed header và scroll đến một element bằng hashtag"},fields:{slug:"/2019-04-17-huong-dan-sua-loi-scroll-voi-fixed-header"}}},pathContext:{slug:"/2019-04-17-huong-dan-sua-loi-scroll-voi-fixed-header",prev:!1,next:{frontmatter:{title:"Tìm hiểu về Time Zone",desc:"Cùng luận bàn những vấn đề liên quan đến time zone",type:"post",category:null,tags:["javascript"],date:"2019-04-12",cover:""},fields:{slug:"/2019-04-12-huong-dan-tim-hieu-time-zone"}}}}}});
//# sourceMappingURL=path---2019-04-17-huong-dan-sua-loi-scroll-voi-fixed-header-62f99616d754085e1ceb.js.map