webpackJsonp([0x773d984dd828],{1414:function(n,a){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#thay-%C4%91%E1%BB%95i-b%E1%BA%B1ng-gi%C3%A1-tr%E1%BB%8B-fill">Thay đổi bằng giá trị <code class="language-text">fill</code></a></li>\n<li><a href="#css-filters">CSS Filters</a></li>\n<li><a href="#svg-filters">SVG filters</a></li>\n</ul>\n<!-- /TOC -->\n<p>File SVG</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>icon<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>path</span> <span class="token punctuation">/></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>svg</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<h2 id="thay-đổi-bằng-giá-trị-code-classlanguage-textfillcode"><a href="#thay-%C4%91%E1%BB%95i-b%E1%BA%B1ng-gi%C3%A1-tr%E1%BB%8B-code-classlanguage-textfillcode" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Thay đổi bằng giá trị <code class="language-text">fill</code></h2>\n<p>Cách dễ nhất, 1 dòng css duy nhất</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token selector">.icon:hover</span> <span class="token punctuation">{</span>\n    <span class="token property">fill</span><span class="token punctuation">:</span> #DA4567<span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Tuy nhiên cái này chỉ làm được khi chúng ta sử dụng file svg dạng <em>inline</em>, nếu dùng thẻ <code class="language-text">&lt;img src=&#39;duong-dan-file.svg&#39;&#39;/&gt;</code>, để tách riêng file svg ra cho nó sạch sẽ file html, cached lại hình này trên trình duyệt, thì coi như chúng ta không thực hiện được cách ở trên.</p>\n<h2 id="css-filters"><a href="#css-filters" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>CSS Filters</h2>\n<p>Với CSS filters chúng ta có trong tại kha khá đồ chơi <strong>như trong photoshop</strong> để <em>vẽ hoa vẽ lá</em> trên trình duyệt. Filter cũng sẽ được thực hiện sau khi trình duyệt render xong DOM, thực hiện xong bước paint (cái này các bạn phải xem lại critical render path để rõ hơn), nghĩa là nếu ko được hỗ trợ bởi trình duyệt thì cũng ko tới mức bể layout</p>\n<ul>\n<li>brightness(<number-percentage>);</li>\n<li>contrast(<number-percentage>);</li>\n<li>grayscale(<number-percentage>);</li>\n<li>invert(<number-percentage>);</li>\n<li>opacity(<number-percentage>);</li>\n<li>saturate(<number-percentage>);</li>\n<li>sepia(<number-percentage>);</li>\n<li>hue-rotate(<angle>);</li>\n<li>blur(<length>);</li>\n<li>drop-shadow(<length><color>);</li>\n</ul>\n<p>Chúng ta ko có filter nào để thay đổi cụ thể một giá trị màu, chỉ có <code class="language-text">hue-rotate</code> để <strong>chỉnh nhẹ</strong> cái màu đang hiển thị. May mắn là chúng ta có thể kết hợp nhiều giá trị filter cùng một lúc</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token selector">.icon:hover</span> <span class="token punctuation">{</span>\n  <span class="token property">filter</span><span class="token punctuation">:</span> <span class="token function">grayscale</span><span class="token punctuation">(</span>100%<span class="token punctuation">)</span> <span class="token function">sepia</span><span class="token punctuation">(</span>100%<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Nếu một trong số các filter ko được hỗ trợ, thì nó <em>nhẹ nhàng</em> cho qua, chứ ko bỏ hết thuộc tính filter. Nếu bạn dùng photoshop rồi, cũng hiểu là thứ tự áp dụng các filter sẽ ảnh hưởng đến kết quả cuối cùng.</p>\n<p><img src="https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_891,f_auto,q_auto/v1548375654/s_178E094ED4F0E309B3AB7AE2DA412CE0BF45D3B8E0DADFAE5F16060B35783F80_1548178599920_ScreenShot2019-01-15at16.05.26_nfeayr.png" alt="Những cách thay đổi giá trị fill của SVG khi hover"></p>\n<p>Để sử dụng <code class="language-text">hue-rotate</code> chúng ta phải dùng một ảnh SVG có màu, lẽ nào bạn dùng ảnh gốc trắng đen rồi css đổ màu vào được?</p>\n<p><img src="https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_730,f_auto,q_auto/v1548375670/s_178E094ED4F0E309B3AB7AE2DA412CE0BF45D3B8E0DADFAE5F16060B35783F80_1548178627636_ScreenShot2019-01-16at10.20.53_ze2wh8.png" alt="Những cách thay đổi giá trị fill của SVG khi hover"></p>\n<p>Trước hết phải <code class="language-text">invert()</code> cái hình xuống, chuyển thành dạng medium grey</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token selector">.icon:hover</span> <span class="token punctuation">{</span>\n  <span class="token property">filter</span><span class="token punctuation">:</span> <span class="token function">invert</span><span class="token punctuation">(</span>0.5<span class="token punctuation">)</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p><img src="https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_1000,f_auto,q_auto/v1548375770/svg-icon-filter-01_ovjce8.png" alt="Những cách thay đổi giá trị fill của SVG khi hover"></p>\n<p>Sau đó mới dùng <code class="language-text">sepia()</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token selector">.icon:hover</span> <span class="token punctuation">{</span>\n  <span class="token property">filter</span><span class="token punctuation">:</span> <span class="token function">invert</span><span class="token punctuation">(</span>0.5<span class="token punctuation">)</span> <span class="token function">sepia</span><span class="token punctuation">(</span>1<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p><img src="https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_1000,f_auto,q_auto/v1548375803/svg-icon-filter-02_rfpwow.png" alt="Những cách thay đổi giá trị fill của SVG khi hover"></p>\n<p>Tiếp đến là thêm màu sắc mình yêu thích</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token selector">.icon:hover</span> <span class="token punctuation">{</span>\n  <span class="token property">filter</span><span class="token punctuation">:</span> <span class="token function">invert</span><span class="token punctuation">(</span>0.5<span class="token punctuation">)</span> <span class="token function">sepia</span><span class="token punctuation">(</span>1<span class="token punctuation">)</span> <span class="token function">hue-rotate</span><span class="token punctuation">(</span>200deg<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p><img src="https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_1000,f_auto,q_auto/v1548376336/svg-icon-filter-05_b7hae1.png" alt="Những cách thay đổi giá trị fill của SVG khi hover"></p>\n<p>Tinh chỉnh một chút nữa</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token selector">.icon:hover</span> <span class="token punctuation">{</span>\n  <span class="token property">filter</span><span class="token punctuation">:</span> \n    <span class="token function">invert</span><span class="token punctuation">(</span>0.5<span class="token punctuation">)</span>\n    <span class="token function">sepia</span><span class="token punctuation">(</span>1<span class="token punctuation">)</span>\n    <span class="token function">hue-rotate</span><span class="token punctuation">(</span>200deg<span class="token punctuation">)</span>\n    <span class="token function">saturate</span><span class="token punctuation">(</span>4<span class="token punctuation">)</span>\n    <span class="token function">brightness</span><span class="token punctuation">(</span>1<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p><img src="https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_1000,f_auto,q_auto/v1548375874/svg-icon-filter-04_v4mo9x.png" alt="Những cách thay đổi giá trị fill của SVG khi hover"></p>\n<p>Để dễ hình dung hơn, <a href="https://codepen.io/cassie-codes/pen/561304e31eb955362b8d850d7eb7500e">dùng tool này của tác giả</a>, kéo thả thấy kết quả</p>\n<p>Tuy nhiên đây cũng chỉ cho được kết quả là một màu tương đối, không chỉ định một màu cụ thể được</p>\n<h2 id="svg-filters"><a href="#svg-filters" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>SVG filters</h2>\n<p>Nếu cần hỗ trợ nhiều trình duyệt hơn, màu sắc cụ thể hơn, dùng đến SVG</p>\n<p>Không giống với CSS, chúng ta phải <em>đổ mồ hôi sôi nước miếng</em> mới làm được</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>&lt;http://www.w3.org/2000/svg><span class="token punctuation">"</span></span> <span class="token attr-name">version</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>1.1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>defs</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>filter</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>id-of-your-filter<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n      ...          \n      ...\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>filter</span><span class="token punctuation">></span></span>\n    ...\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>defs</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>svg</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Chúng ta định nghĩa bằng thẻ <code class="language-text">&lt;filter /&gt;</code>, thẻ này phải nằm trong thẻ <code class="language-text">&lt;defs/&gt;</code></p>\n<p>Trong CSS chúng ta trỏ đến thằng filter ở trên như sau</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token selector">.icon:hover</span> <span class="token punctuation">{</span>\n  <span class="token property">filter</span><span class="token punctuation">:</span> <span class="token url">url(\'assets/your-SVG.svg#id-of-your-filter\')</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Những filter có thể sử dụng</p>\n<ul>\n<li><code class="language-text">&lt;feBlend&gt;</code></li>\n<li><code class="language-text">&lt;feColorMatrix&gt;</code></li>\n<li><code class="language-text">&lt;feComponentTransfer&gt;</code></li>\n<li><code class="language-text">&lt;feComposite&gt;</code></li>\n<li><code class="language-text">&lt;feConvolveMatrix&gt;</code></li>\n<li><code class="language-text">&lt;feDiffuseLighting&gt;</code></li>\n<li><code class="language-text">&lt;feDisplacementMap&gt;</code></li>\n<li><code class="language-text">&lt;feDropShadow&gt;</code></li>\n<li><code class="language-text">&lt;feFlood&gt;</code></li>\n<li><code class="language-text">&lt;feGaussianBlur&gt;</code></li>\n<li><code class="language-text">&lt;feImage&gt;</code></li>\n<li><code class="language-text">&lt;feMerge&gt;</code></li>\n<li><code class="language-text">&lt;feMorphology&gt;</code></li>\n<li><code class="language-text">&lt;feOffset&gt;</code></li>\n<li><code class="language-text">&lt;feSpecularLighting&gt;</code></li>\n<li><code class="language-text">&lt;feTile&gt;</code></li>\n<li><code class="language-text">&lt;feTurbulence&gt;</code></li>\n</ul>\n<p>Với yêu cầu đổi màu, chúng ta sẽ dùng <code class="language-text">feColorMatrix</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>&lt;http://www.w3.org/2000/svg><span class="token punctuation">"</span></span> <span class="token attr-name">version</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>1.1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>defs</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>filter</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>id-of-your-filter<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>feColorMatrix</span>\n        <span class="token attr-name">color-interpolation-filters</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>sRGB<span class="token punctuation">"</span></span>\n        <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>matrix<span class="token punctuation">"</span></span>\n        <span class="token attr-name">values</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>1 0 0 0 0\n                0 1 0 0 0\n                0 0 1 0 0\n                0 0 0 1 0 <span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>filter</span><span class="token punctuation">></span></span>\n    ...\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>defs</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>svg</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Cùng xem xét kỹ hơn giá trị matrix chúng ta đã sử dụng ở trên</p>\n<p><img src="https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_795,f_auto,q_auto/v1548375895/s_178E094ED4F0E309B3AB7AE2DA412CE0BF45D3B8E0DADFAE5F16060B35783F80_1548179549387_ScreenShot2019-01-16at18.17.32_n1bwdy.png" alt="Những cách thay đổi giá trị fill của SVG khi hover"></p>\n<p>Các cột giá trị tương ứng là red, green, blue, alpha và multiplier. Chúng ta sẽ ko quan tâm đến giá trị multiplier với nhu cầu đổi màu, chỉ cần 4 giá trị ở đầu.</p>\n<p><img src="https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_762,f_auto,q_auto/v1548375908/s_178E094ED4F0E309B3AB7AE2DA412CE0BF45D3B8E0DADFAE5F16060B35783F80_1548179504680_ScreenShot2019-01-16at17.44.47_lin7vm.png" alt="Những cách thay đổi giá trị fill của SVG khi hover"></p>\n<p>Ví dụ chúng ta muốn set giá trị rgba(0,128,128,1), chuyển nó về giá trị ma trận theo cách tính</p>\n<p><img src="https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_816,f_auto,q_auto/v1548375925/s_178E094ED4F0E309B3AB7AE2DA412CE0BF45D3B8E0DADFAE5F16060B35783F80_1548179540671_ScreenShot2019-01-16at18.39.03_oe0itu.png" alt="Những cách thay đổi giá trị fill của SVG khi hover"></p>\n<blockquote>\n<p>Lưu ý: SVG filter không thực hiện được trên hình nền đen, nên nếu đang là hình đen thì invert nó thành trắng trước khi thực hiện</p>\n</blockquote>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token selector">.icon:hover</span> <span class="token punctuation">{</span>\n  <span class="token property">filter</span><span class="token punctuation">:</span> <span class="token function">invert</span><span class="token punctuation">(</span>100%<span class="token punctuation">)</span> <span class="token url">url(\'assets/your-SVG.svg#id-of-your-filter\')</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Tiếp tục <a href="https://codepen.io/cassie-codes/pen/46c5b9af3e9923138f950bcdd1dfc4af">sử dụng công cụ</a> <strong>kéo thả thấy kết quả</strong> của tác giả nếu bạn ko siêng làm toán <strong>mẫu giáo</strong></p>\n<p><a target="_blank" rel="noopener noreferrer" href="https://css-tricks.com/the-many-ways-to-change-an-svg-fill-on-hover-and-when-to-use-them/\n">The Many Ways to Change an SVG Fill on Hover (and When to Use Them)</a></p>',timeToRead:5,excerpt:"Thay đổi bằng giá trị  CSS Filters SVG filters File SVG Thay đổi bằng giá trị  Cách dễ nhất, 1 dòng css duy nhất Tuy nhiên cái này chỉ làm…",frontmatter:{title:"Những cách thay đổi giá trị fill của SVG khi hover",cover:"",date:"2019-02-10",category:null,tags:["css"],desc:"Chúng ta có thể định dạng file SVG một cách dễ dàng bằng CSS, chúng ta sẽ tận dụng CSS để thay đổi định dạng khi hover chuột lên. Tất cả những cách có thể làm sẽ được liệt kê trong bài viết này."},fields:{slug:"/2019-02-10-huong-dan-thay-doi-mau-sac-file-svg"}}},pathContext:{slug:"/2019-02-10-huong-dan-thay-doi-mau-sac-file-svg",prev:{frontmatter:{title:"Làm quen với React Hook bằng ví dụ",desc:"Chúng ta cùng bắt đầu học sử dụng React Hook, nó giải quyết vấn đề gì, sử dụng nó ra sao",type:"post",category:null,tags:["react"],date:"2019-02-11",cover:""},fields:{slug:"/2019-02-11-lam-quen-voi-react-hook-bang-vi-du"}},next:{frontmatter:{title:"Convert giá trị String qua Number trong Javascript",desc:"Javascript rất lạ kỳ, convert giá trị String qua number cũng lắm nẻo dăm ba đường,nào NaN, nào radix. Bài này chúng ta cùng tìm hiểu parseFloat(), Number(), Number.isNaN(), isNaN()",type:"post",category:null,tags:["javascript"],date:"2019-01-30",cover:""},fields:{slug:"/2019-01-30-huong-dan-convert-string-sang-number"}}}}}});
//# sourceMappingURL=path---2019-02-10-huong-dan-thay-doi-mau-sac-file-svg-aa37e4dc8d5b41894d75.js.map