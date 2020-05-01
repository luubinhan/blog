webpackJsonp([19729385208018],{1452:function(n,a){n.exports={data:{markdownRemark:{html:'<h2 id="code-classlanguage-textsrcsetcode"><a href="#code-classlanguage-textsrcsetcode" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a><code class="language-text">srcset</code></h2>\n<p>Công dụng của thuộc tính <code class="language-text">srcset</code> trên thẻ <code class="language-text">&lt;img/&gt;</code> là cho phép chúng ta cung cấp các file với kích thước khác file được cung cấp trên <code class="language-text">src</code>, chúng ta có thể sử dụng <code class="language-text">srcset</code> vô tư, nếu trình duyệt ko hổ trợ <code class="language-text">srcset</code> (IE cũ), nó đơn giản chỉ load file trên thuộc tính <code class="language-text">src</code>.</p>\n<p>Trên thuộc tính <code class="language-text">srcset</code> chúng ta báo kích thước của hình này luôn, <code class="language-text">medium.jpg 1000w</code> ( có nghĩa hình này width=1000px ) đa phần dùng width có thể giải quyết tất cả các trường hợp, trình duyệt không cần download vẫn biết được độ rộng của file, trên cơ sở đó, trình duyệt tính toán với viewport hiện tại và download hình thích hợp</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span>\n  <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>small.jpg<span class="token punctuation">"</span></span>\n  <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>medium.jpg 1000w, large.jpg 2000w<span class="token punctuation">"</span></span>\n  <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>luckyluu blog | Tầm quan trọng của thuộc tính sizes, srcset trong thẻ img<span class="token punctuation">"</span></span>\n<span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Thử xem trình duyệt đã tính toán thế nào. </p>\n<p>Thí dụ kích thước thiết bị là <em>320px</em>, 1x (là giá trị <em>density</em> của màn hình, xem ở đây <a href="https://pixensity.com/list/phone/">https://pixensity.com/list/phone/</a>, hoặc check bằng javascript <code class="language-text">window.devicePixelRatio</code>).</p>\n<p>Chúng ta có 3 hình</p>\n<ul>\n<li>small.jpg: 500px wide</li>\n<li>medium.jpg: 1000px wide</li>\n<li>large.jpg: 2000px wide</li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">500 / 320 = 1.5625\n1000 / 320 = 3.125\n2000 / 320 = 6.25</code></pre>\n      </div>\n<p><em>Trình duyệt</em> - màn hình của mày là 1x, 1.5625 là tỉ lệ gần nhất với 1, tuy hơi cao nhưng tốt hơn mấy thằng kia. Tao load thằng <code class="language-text">small.jpg</code></p>\n<p>Nếu là màn hình 2x (nó sẽ lấy gía trị của <code class="language-text">window.devicePixelRatio</code>), trình duyệt sẽ chọn 3.125 vì nó gần với 2 nhất.</p>\n<p>Bên cạnh đơn vị <code class="language-text">w</code>, tương ứng với kích thước của hình, chúng ta cũng có thể dùng đơn vị <code class="language-text">x</code> tương ứng cho <strong>độ</strong> <em>density</em> của màn hình</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> \n  <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>image_2x.jpg<span class="token punctuation">"</span></span> \n  <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>image_2x.jpg 2x, image_1x.jpg 1x<span class="token punctuation">"</span></span> \n  <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>luckyluu blog | Tầm quan trọng của thuộc tính sizes, srcset trong thẻ img<span class="token punctuation">"</span></span>\n<span class="token punctuation">/></span></span></code></pre>\n      </div>\n<h2 id="code-classlanguage-textsizescode"><a href="#code-classlanguage-textsizescode" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a><code class="language-text">sizes</code></h2>\n<p>Bên cạnh <code class="language-text">srcset</code>, một thuộc tính rất hay ho khác là <code class="language-text">sizes</code>, nó cũng sẽ giúp trình duyệt có cơ sở để load hình nào</p>\n<blockquote>\n<p>Nếu không dùng thuộc tính <code class="language-text">sizes</code>. Trình duyệt ngầm hiểu chúng ta muốn render ảnh ở độ rộng 100vw.</p>\n</blockquote>\n<p><img src="https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_1000,f_auto,q_auto/v1531489586/640-version_txwye1.png" alt="Tầm quan trọng của thuộc tính sizes trong thẻ img"></p>\n<p>Không phải lúc nào hình sẽ hiển thị hết 100vw của màn hình, ví dụ bạn có mà hình rộng 1000px, hình không hiển thị hết chiều ngang của màn hình, nhỏ hơn một nữa đi, tức là bạn chỉ cần hình có kích thước <code class="language-text">1000/2 = 500px</code> là đủ xài</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token selector">img</span> <span class="token punctuation">{</span>\n  <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>\n  <span class="token property">width</span><span class="token punctuation">:</span> 500px<span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Trước khi trình duyệt load được css, nó sẽ <strong>ko biết được</strong> là hình chỉ có hiển thị tối đa 500px, chúng ta báo với nó, "Ê, hình này của tao chỉ hiển thị tối đa là 500px nhé" bằng HTML</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span>\n  <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>small.jpg<span class="token punctuation">"</span></span>\n  <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>medium.jpg 1000w, large.jpg 2000w<span class="token punctuation">"</span></span>\n  <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>luckyluu blog | Tầm quan trọng của thuộc tính sizes, srcset trong thẻ img<span class="token punctuation">"</span></span>\n  <span class="token attr-name">sizes</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>500px<span class="token punctuation">"</span></span>\n<span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Nhưng trên điện thoại, chúng ta muốn khác, hình này sẽ full hết 100% viewport,</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token atrule"><span class="token rule">@media</span> <span class="token punctuation">(</span><span class="token property">max-width</span><span class="token punctuation">:</span> 600px<span class="token punctuation">)</span></span> <span class="token punctuation">{</span>\n  <span class="token selector">img</span> <span class="token punctuation">{</span>\n    <span class="token property">float</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>\n    <span class="token property">width</span><span class="token punctuation">:</span> 100vw<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Để báo với trình duyệt có một sự thay đổi *nhỏ** trên nếu màn hình &#x3C; 600px, chúng ta khai báo thuộc tính <code class="language-text">sizes</code> như sau</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> \n  <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>small.jpg<span class="token punctuation">"</span></span>\n  <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>medium.jpg 1000w, large.jpg 2000w<span class="token punctuation">"</span></span>\n  <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>luckyluu blog | Tầm quan trọng của thuộc tính sizes, srcset trong thẻ img<span class="token punctuation">"</span></span>\n  <span class="token attr-name">sizes</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>(max-width: 600px) 100vw, 500px<span class="token punctuation">"</span></span>\n<span class="token punctuation">/></span></span></code></pre>\n      </div>\n<p>Đoạn trên nếu dịch rad: ê trình duyệt, hình này sẽ render kích thước 100vw khi viewport &#x3C; 600px, còn lại cứ dùng kích thước 500px</p>\n<p><img src="https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_1000,f_auto,q_auto/v1531489882/320-version_afwzxa.png" alt="Tầm quan trọng của thuộc tính sizes trong thẻ img"></p>\n<p>Kích thước trên mobile</p>\n<p><img src="https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_1000,f_auto,q_auto/v1531490069/640-version-mobile_l15ira.png" alt="Tầm quan trọng của thuộc tính sizes trong thẻ img"></p>\n<p><a href="https://css-tricks.com/sometimes-sizes-is-quite-important/">css-tricks.com/sometimes-sizes-is-quite-important</a></p>\n<p><a href="https://css-tricks.com/responsive-images-youre-just-changing-resolutions-use-srcset/">Responsive Images: If you’re just changing resolutions, use srcset.</a></p>',timeToRead:3,excerpt:"Công dụng của thuộc tính   trên thẻ   là cho phép chúng ta cung cấp các file với kích thước khác file được cung cấp trên  , chúng ta có thể…",frontmatter:{title:"Tầm quan trọng của thuộc tính sizes, srcset trong thẻ img",cover:"",date:"2018-07-30",category:null,tags:["css","mobile-web-specialist"],desc:"Hướng dẫn sử dụng srcset và sizes để tối ưu việc load ảnh responsive"},fields:{slug:"/2018-07-30-huong-dan-tam-quan-trong-cua-thuoc-tinh-sizes-trong-the-img"}}},pathContext:{slug:"/2018-07-30-huong-dan-tam-quan-trong-cua-thuoc-tinh-sizes-trong-the-img",prev:{frontmatter:{title:"Những điều có thể làm với pointer-events",desc:"Một vài ứng dụng khác của pointer-events",type:"post",category:null,tags:["css"],date:"2018-08-01",cover:""},fields:{slug:"/2018-08-01-huong-dan-pointer-events-nhung-dieu-ban-co-the-lam"}},next:{frontmatter:{title:"Làm việc với date trong javascript",desc:"Làm việc với kiểu ngày tháng trong javascript không phức tạp lắm, nhưng rất thường xài",type:"post",category:null,tags:["javascript"],date:"2018-07-29",cover:"https://flaviocopes.com/javascript-dates/Screen%20Shot%202018-07-06%20at%2007.20.58.png"},fields:{slug:"/2018-07-29-huong-dan-javascript-date-lam-viet-voi-javascript-date"}}}}}});
//# sourceMappingURL=path---2018-07-30-huong-dan-tam-quan-trong-cua-thuoc-tinh-sizes-trong-the-img-c8299650cae375a44395.js.map