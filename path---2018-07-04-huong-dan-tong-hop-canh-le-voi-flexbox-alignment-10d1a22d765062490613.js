webpackJsonp([0xe091e0b269fd],{1387:function(e,n){e.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#c%E1%BA%A7n-n%E1%BA%AFm">Cần nắm</a></li>\n<li><a href="#flex-direction">flex-direction</a></li>\n<li><a href="#justify-content">justify-content</a></li>\n<li><a href="#align-items-v%C3%A0-align-self">align-items và align-self</a></li>\n</ul>\n<!-- /TOC -->\n<h2 id="cần-nắm"><a href="#c%E1%BA%A7n-n%E1%BA%AFm" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Cần nắm</h2>\n<p>Khi sử dụng <code class="language-text">display: flex</code> các element con bên trong chúng ta sẽ canh theo 2 phương, gọi là phương ngang và phương đứng</p>\n<p><img src="https://cms-assets.tutsplus.com/uploads/users/30/posts/30183/image/axes.png"></p>\n<h2 id="flex-direction"><a href="#flex-direction" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>flex-direction</h2>\n<p><code class="language-text">flex-direction</code> sẽ có 4 giá trị để ta set</p>\n<ol>\n<li><code class="language-text">flex-direction: row</code>: element con xếp theo từng hàng, chỉ xuống hàng khi set <code class="language-text">flex-wrap: wrap</code>, hoặc viết tắt 2 thuộc tính này lại thành <code class="language-text">flex-flow: row wrap</code></li>\n<li><code class="language-text">flex-direction: row-reserve</code>: element con xếp thèo hàng đi từ phải qua trái</li>\n<li><code class="language-text">flex-direction: column</code>: element con xếp theo cột từ trên xuống dưới</li>\n<li><code class="language-text">flex-direction: column-reserve</code>: element con xếp theo cột từ dưới lên trên</li>\n</ol>\n<p><img src="http://codropspz.tympanus.netdna-cdn.com/codrops/wp-content/uploads/2015/02/flex-direction-illustration.jpg"></p>\n<h2 id="justify-content"><a href="#justify-content" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>justify-content</h2>\n<p>Với <code class="language-text">justify-content</code> sẽ ảnh hưởng tới <strong>phương ngang</strong> của các element con, nếu <code class="language-text">.container</code> chúng ta xếp các element theo dạng row (mặc định khi set <code class="language-text">display: flex</code>), chúng ta can thiệp chiều xếp element con trong row này bằng <code class="language-text">justify-content</code></p>\n<ol>\n<li><code class="language-text">flex-start</code> : elements từ trái qua phải trong 1 row</li>\n<li><code class="language-text">flex-end</code>: elements từ phải qua trái trong 1 row</li>\n<li><code class="language-text">center</code>: dàn các element từ giữa ra 2 bên</li>\n<li><code class="language-text">space-between</code>: dàn các element đều hết 1 row, chỉ chừa khoảng trống giữa 2 element, không chừa khoảng trống 2 element cuối</li>\n<li><code class="language-text">space-around</code>: tương tự như <code class="language-text">space-around</code> nhưng chừa luôn khoảng trống 2 element cuối</li>\n</ol>\n<p><img src="https://uploads.toptal.io/blog/image/122559/toptal-blog-image-1490181185089.2_newsletter_copy_11-ac07811eeed0c992b21c660cd6119ca8.jpg"></p>\n<h2 id="align-items-và-align-self"><a href="#align-items-v%C3%A0-align-self" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>align-items và align-self</h2>\n<p>Thuộc tính <code class="language-text">align-items</code> sẽ ảnh hưởng đến <strong>phương đứng</strong> của element con, nếu <code class="language-text">align-items</code> dùng để set ở <code class="language-text">.container</code>, thì <code class="language-text">align-self</code> sẽ set ở element con để đè lại giá trị trên từng thằng con</p>\n<p>Cả 2 thằng này đều có thể dùng các giá trị sau</p>\n<ol>\n<li><code class="language-text">auto</code> giá trị <code class="language-text">align-self</code> kế thừa từ <code class="language-text">align-items</code>, mặc định của <code class="language-text">align-self</code></li>\n<li><code class="language-text">flex-start</code>: canh từ trên xuống</li>\n<li><code class="language-text">flex-end</code>: canh từ dưới lên</li>\n<li><code class="language-text">center</code>: canh từ giữa ra trên dưới</li>\n<li><code class="language-text">baseline</code>: canh theo baseline của các element nằm ngang nhau</li>\n<li><code class="language-text">stretch</code>: kéo độ cao của element để phủ hết chiều đứng của <code class="language-text">.container</code></li>\n</ol>\n<p><img src="https://image.slidesharecdn.com/css3-layoutinctrlpdf-130218082731-phpapp01/95/slide-53-1024.jpg"></p>',timeToRead:2,excerpt:"Cần nắm flex-direction justify-content align-items và align-self Cần nắm Khi sử dụng   các element con bên trong chúng ta sẽ canh theo 2…",frontmatter:{title:"Tổng quát về canh lề với Flexbox display",cover:"",date:"2018-07-04",category:null,tags:["css","mobile-web-specialist"],desc:"Bây giờ chưa nắm vững về flexbox và cách canh lề trong flexbox thì thật là thiếu xót trong thời đại 2018, chúng ta đã qua thời xài float, clearfix"},fields:{slug:"/2018-07-04-huong-dan-tong-hop-canh-le-voi-flexbox-alignment"}}},pathContext:{slug:"/2018-07-04-huong-dan-tong-hop-canh-le-voi-flexbox-alignment",prev:{frontmatter:{title:"Nâng cao tốc độ website với Chrome DevTools",desc:"Hướng dẫn sử dụng Chrome DevTools để phân tích và tối ưu hóa tốc độ website",type:"post",category:null,tags:["chrome","performance"],date:"2018-07-09",cover:""},fields:{slug:"/2018-07-09-huong-dan-optimize-toc-do-website-voi-chrome-devtools"}},next:{frontmatter:{title:"Sử dụng javascript modules trên web",desc:"Giới thiệu module trong ECMAcript",type:"post",category:"javascript",tags:["javascript"],date:"2018-07-02",cover:""},fields:{slug:"/2018-07-02-huong-dan-javascript-modules-tren-web"}}}}}});
//# sourceMappingURL=path---2018-07-04-huong-dan-tong-hop-canh-le-voi-flexbox-alignment-10d1a22d765062490613.js.map