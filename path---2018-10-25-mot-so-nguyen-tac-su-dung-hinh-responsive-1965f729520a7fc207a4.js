webpackJsonp([0x9fe491dc1dff],{1329:function(n,a){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#m%E1%BB%99t-s%E1%BB%91-nguy%C3%AAn-t%E1%BA%AFc-chung">Một số nguyên tắc chung</a></li>\n<li><a href="#k%C3%ADch-th%C6%B0%E1%BB%9Bc-ph%C3%B9-h%E1%BB%A3p">Kích thước phù hợp</a></li>\n<li><a href="#s%E1%BB%AD-d%E1%BB%A5ng-srcset">Sử dụng <code class="language-text">srcset</code></a></li>\n<li><a href="#s%E1%BB%AD-d%E1%BB%A5ng-th%E1%BA%BB-picture-">Sử dụng thẻ <code class="language-text">&lt;picture /&gt;</code></a></li>\n<li><a href="#thu%E1%BB%99c-t%C3%ADnh-sizes">Thuộc tính <code class="language-text">sizes</code></a></li>\n<li><a href="#tr%C6%B0%E1%BB%9Dng-h%E1%BB%A3p-%C4%91%E1%BA%B7c-bi%E1%BB%87t-%E1%BA%A3nh-s%E1%BA%A3n-ph%E1%BA%A9m">Trường hợp đặc biệt: ảnh sản phẩm</a></li>\n<li>\n<p><a href="#m%E1%BB%99t-s%E1%BB%91-k%E1%BB%B9-thu%E1%BA%ADt-kh%C3%A1c">Một số kỹ thuật khác</a></p>\n<ul>\n<li><a href="#n%C3%A9n-%E1%BA%A3nh">Nén ảnh</a></li>\n<li><a href="#d%C3%B9ng-javascript">Dùng javascript</a></li>\n<li><a href="#s%E1%BB%AD-d%E1%BB%A5ng-lo%E1%BA%A1i-%E1%BA%A3nh-ph%C3%B9-h%E1%BB%A3p">Sử dụng loại ảnh phù hợp</a></li>\n</ul>\n</li>\n</ul>\n<!-- /TOC -->\n<p><img src="https://developers.google.com/web/fundamentals/design-and-ux/responsive/img/art-direction.png" alt="Một số nguyên tắc với hình ảnh responsive"></p>\n<p>Crop, thay đổi vị trí đặt hình, hoặc thậm chí là thay luôn một hình khác trên từng màn hình, miễn sao nó hiển thị đúng ý đồ của designer, như trong hình ví dụ, hình người chèo thuyền phải nằm giữa</p>\n<h1 id="một-số-nguyên-tắc-chung"><a href="#m%E1%BB%99t-s%E1%BB%91-nguy%C3%AAn-t%E1%BA%AFc-chung" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Một số nguyên tắc chung</h1>\n<ul>\n<li>Luôn sử dụng kích thước hình phù hợp</li>\n<li>Sử dụng thẻ <code class="language-text">&lt;picture &gt;</code> khi muốn chỉ định từng hình cũ thể cho từng màn hình.</li>\n<li>Sử dụng <code class="language-text">srcset</code> trong thẻ <code class="language-text">&lt;img /&gt;</code> để báo với trình duyệt chọn hình tốt nhất trong từng trường hợp</li>\n<li>Nếu chỉ có 1 hoặc 2 hình, và nó chỉ được sử dụng ở một trang, sử dụng loại ảnh phù hợp</li>\n</ul>\n<h1 id="kích-thước-phù-hợp"><a href="#k%C3%ADch-th%C6%B0%E1%BB%9Bc-ph%C3%B9-h%E1%BB%A3p" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Kích thước phù hợp</h1>\n<p>Chỉ định đơn vị <code class="language-text">width</code> của hình phù hợp, tránh để nó lớn viewport.</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token selector">img, embed, object, video</span> <span class="token punctuation">{</span>\n  <span class="token property">max-width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<h1 id="sử-dụng-code-classlanguage-textsrcsetcode"><a href="#s%E1%BB%AD-d%E1%BB%A5ng-code-classlanguage-textsrcsetcode" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Sử dụng <code class="language-text">srcset</code></h1>\n<p>Với thuộc tính <code class="language-text">srcset</code>, trình duyệt có thể quyết định load hình nào tùy theo thiết bị, ví dụ 2x trên màn hình retina, hoặc 1x trên màn hình retina khi mạng chậm</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>photo.png<span class="token punctuation">"</span></span> <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>photo@2x.png 2x<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></code></pre>\n      </div>\n<h1 id="sử-dụng-thẻ-code-classlanguage-textltpicture-gtcode"><a href="#s%E1%BB%AD-d%E1%BB%A5ng-th%E1%BA%BB-code-classlanguage-textltpicture-gtcode" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Sử dụng thẻ <code class="language-text">&lt;picture /&gt;</code></h1>\n<p>Thẻ <code class="language-text">&lt;picture /&gt;</code> sẽ cho khai báo nhiều hình khác nhau ứng với từng điều kiện như: kích thước, độ phân giải, chiều đứng hay ngang.</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>picture</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span> <span class="token attr-name">media</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>(min-width: 800px)<span class="token punctuation">"</span></span> <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>head.jpg, head-2x.jpg 2x<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span> <span class="token attr-name">media</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>(min-width: 450px)<span class="token punctuation">"</span></span> <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>head-small.jpg, head-small-2x.jpg 2x<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>head-fb.jpg<span class="token punctuation">"</span></span> <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>head-fb-2x.jpg 2x<span class="token punctuation">"</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>a head carved out of wood<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>picture</span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Xài thử <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/media.html">https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/media.html</a></p>\n<h1 id="thuộc-tính-code-classlanguage-textsizescode"><a href="#thu%E1%BB%99c-t%C3%ADnh-code-classlanguage-textsizescode" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Thuộc tính <code class="language-text">sizes</code></h1>\n<p>Đọc thêm bài <a href="/blog/2018-07-30-huong-dan-tam-quan-trong-cua-thuoc-tinh-sizes-trong-the-img">Tầm quan trọng của thuộc tính sizes trong thẻ img</a></p>\n<h1 id="trường-hợp-đặc-biệt-ảnh-sản-phẩm"><a href="#tr%C6%B0%E1%BB%9Dng-h%E1%BB%A3p-%C4%91%E1%BA%B7c-bi%E1%BB%87t-%E1%BA%A3nh-s%E1%BA%A3n-ph%E1%BA%A9m" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Trường hợp đặc biệt: ảnh sản phẩm</h1>\n<p>Khách hàng luôn thích xem, sờ, ngắm thật kỹ sản phẩm muốn mua, luôn cho khách hàng ảnh thật chi tiết, to nhất, chất lượng nhất có thể, để khách hàng có thể zoom vào mà soi</p>\n<p><img src="https://developers.google.com/web/fundamentals/design-and-ux/responsive/img/sw-make-images-expandable-good.png" alt="Một số nguyên tắc với hình ảnh responsive"></p>\n<h1 id="một-số-kỹ-thuật-khác"><a href="#m%E1%BB%99t-s%E1%BB%91-k%E1%BB%B9-thu%E1%BA%ADt-kh%C3%A1c" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Một số kỹ thuật khác</h1>\n<h2 id="nén-ảnh"><a href="#n%C3%A9n-%E1%BA%A3nh" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Nén ảnh</h2>\n<p>Kỹ thuật nén ảnh <a href="https://www.html5rocks.com/en/mobile/high-dpi/#toc-tech-overview" rel="noopener noreferrer">compressive image technique</a>này, với mức độ nén phù hợp, định dạng của ảnh gốc, chất lượng ảnh sau nén không thay đổi, nhưng kích thước giảm khá nhiều.</p>\n<h2 id="dùng-javascript"><a href="#d%C3%B9ng-javascript" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Dùng javascript</h2>\n<p>Kiểm tra độ phân giả của màn hình bằng <code class="language-text">window.devicePixelRatio</code>, và thông tin mạng <code class="language-text">navigator.connection</code> rồi quyết định load hình nào.</p>\n<p>Nhược điểm của cách này là phải đợi javascript chạy xong mới load hình, bị delay một chút.</p>\n<h2 id="sử-dụng-loại-ảnh-phù-hợp"><a href="#s%E1%BB%AD-d%E1%BB%A5ng-lo%E1%BA%A1i-%E1%BA%A3nh-ph%C3%B9-h%E1%BB%A3p" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Sử dụng loại ảnh phù hợp</h2>\n<p>Nếu được thì xài SVG vì dung lượng nhỏ mà có võ, có thể nén bằng <a rel="noopener noreferrer" target="_blank" href="https://www.sarasoueidan.com/blog/svgo-tools/">công cụ này</a></p>\n<p><img src="https://developers.google.com/web/fundamentals/design-and-ux/responsive/img/html5.svg" alt="Một số nguyên tắc với hình ảnh responsive"></p>\n<p>Sử dụng Data URI để encode Base64 file hình thành <code class="language-text">string</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>data:image/svg+xml;base64,[data]<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n\n<span class="token comment">&lt;!-- Ví dụ --></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiB\nBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW ...<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Để convert, thì có thể dùng <a href="http://jpillora.com/base64-encoder/">jpillora.com/base64-encoder</a></p>\n<p>string convert được cũng có thể xài với thuộc tính background trong css</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token selector">.element</span> <span class="token punctuation">{</span>\n  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url">url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIi...)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Việc sử dụng background trong css có thể làm giảm số lượng HTTP request, bên cạnh đó là một nhược điểm</p>\n<ul>\n<li>Trên mobile, Data URI hiển thị chậm hơn <code class="language-text">&lt;img src=&quot;http://&quot; /&gt;</code></li>\n<li>Dảm số lượng request, nhưng tăng kích thước của request css</li>\n<li>Data URI không cache được</li>\n<li>IE8 không hổ trợ</li>\n<li>HTTP/2 giảm số lượng request không còn cần thiết</li>\n</ul>\n<p>Trong CSS có một thuộc tính để load hình như thẻ <code class="language-text">&lt;picture /&gt;</code> là <code class="language-text">image-set</code> (hiện tại hổ trợ bởi chrome và safari)</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css"><span class="token selector">.element</span> <span class="token punctuation">{</span>\n  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token url">url(icon1x.png)</span><span class="token punctuation">;</span>\n  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token function">-webkit-image-set</span><span class="token punctuation">(</span>  \n    <span class="token url">url(icon1x.png)</span> 1x,  \n    <span class="token url">url(icon2x.png)</span> 2x  \n  <span class="token punctuation">)</span><span class="token punctuation">;</span>  \n  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token function">image-set</span><span class="token punctuation">(</span>\n    <span class="token url">url(icon1x.jpg)</span> 1x,\n    <span class="token url">url(icon2x.jpg)</span> 2x  \n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Với độ phân giải 2x, 1x</p>\n<div class="gatsby-highlight">\n      <pre class="language-css"><code class="language-css">@media <span class="token punctuation">(</span><span class="token property">min-resolution</span><span class="token punctuation">:</span> 2dppx<span class="token punctuation">)</span>, <span class="token comment">/* Standard syntax */</span> \n<span class="token punctuation">(</span><span class="token property">-webkit-min-device-pixel-ratio</span><span class="token punctuation">:</span> 2<span class="token punctuation">)</span>  <span class="token comment">/* Safari &amp; Android Browser */</span> \n<span class="token punctuation">{</span>\n  <span class="token selector">.sample</span> <span class="token punctuation">{</span>\n    <span class="token property">background-size</span><span class="token punctuation">:</span> contain<span class="token punctuation">;</span>\n    <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token url">url(icon2x.png)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Các phương pháp như lựa chọn hình JPG, GIF, PNG, các phương pháp giảm kích thước file (mình hay dùng FileOptimizer), image sprite, lazy load khá phổ biến nên mình không đề cập ở đây.</p>\n<ul>\n  <li>\n    <a target="_blank" rel="noopener noreferrer" href="https://responsiveimages.org/demos/">\n      Demo\n    </a>\n  </li>\n  <li>\n    <a target="_blank" rel="noopener noreferrer" href="https://developers.google.com/web/fundamentals/design-and-ux/responsive/images">\n      Images\n    </a>\n  </li>\n</ul>',timeToRead:6,excerpt:"Một số nguyên tắc chung Kích thước phù hợp Sử dụng  Sử dụng thẻ  Thuộc tính  Trường hợp đặc biệt: ảnh sản phẩm Một số kỹ thuật khác Nén ảnh…",frontmatter:{title:"Một số nguyên tắc với hình ảnh responsive",cover:"",date:"2018-10-25",category:null,tags:["mobile-web-specialist"],desc:"Nếu bạn đã quên hoặc chưa biết, hình tiêu tốn hơn 50% dung lượng tải trang. Responsive image tuy dễ nhưng không nên xem nhẹ"},fields:{slug:"/2018-10-25-mot-so-nguyen-tac-su-dung-hinh-responsive"}}},pathContext:{slug:"/2018-10-25-mot-so-nguyen-tac-su-dung-hinh-responsive",prev:{frontmatter:{title:"Giới thiệu về Reactive Programing trong javascript",desc:"Reactive programing là khái niệm khá trừu tượng và khó tiếp cận với người mới bắt đầu, chuẩn bị tinh thần đọc bài này vài lần trong vài ngày thì mới mong thẩm thấu hết",type:"post",category:null,tags:["javascript"],date:"2018-10-30",cover:""},fields:{slug:"/2018-10-30-gioi-thieu-reactive-programing-trong-javascript"}},next:{frontmatter:{title:"Javascript prototype chuyên sâu",desc:"Bài này chỉ phù hợp với các bạn đã có kiến thức trung bình khá javascript trở lên, mình không chỉ đơn giản giải thích cách xài mà còn sâu hơn, bạn sẽ nắm rất rất rõ prototype trong javascript thực chất là gì",type:"post",category:null,tags:["javascript"],date:"2018-10-24",cover:""},fields:{slug:"/2018-10-24-giai-thich-prototype-trong-javascript"}}}}}});
//# sourceMappingURL=path---2018-10-25-mot-so-nguyen-tac-su-dung-hinh-responsive-1965f729520a7fc207a4.js.map