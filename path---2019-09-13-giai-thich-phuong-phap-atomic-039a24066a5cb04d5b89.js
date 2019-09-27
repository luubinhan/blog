webpackJsonp([0x8b7d9bcc7923],{1507:function(n,t){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#atom">Atom</a></li>\n<li><a href="#molecule">Molecule</a></li>\n<li><a href="#organism">Organism</a></li>\n<li><a href="#template">Template</a></li>\n<li><a href="#page">Page</a></li>\n</ul>\n<!-- /TOC -->\n<p>Đây là một trong những cách tiếp cận để thiết kế một system. Tác giả của structure này là Brad Frost, ám ảnh bởi một thạc sĩ hóa học người Việt Nam (chắc dạy ở Mỹ), dạy môn hóa học khi anh này đang học cấp II.</p>\n<p>Lấy ý tưởng <strong>nguyên tử</strong> hóa học, sự <strong>kết hợp</strong> giữa các <strong>nguyên tử</strong> tạo ra một <strong>phân tử</strong>, kết hợp các phân tử lại tạo thành 1 sinh vật</p>\n<p><img src="http://atomicdesign.bradfrost.com/images/content/chemical-equation.png" alt="Structure theo phương pháp Atomic"></p>\n<p>Những khái niệm chính của Atomic</p>\n<ul>\n<li><strong>Atom</strong> nguyên tử (nguyên tố), đơn vị nhỏ nhất</li>\n<li><strong>Molecule</strong> do 2 nguyên tử trở lên hợp lại tạo thành, những phân tử hóa học như H2O được cấu thành từ nguyên tử Hidro và Oxy</li>\n<li><strong>Organism</strong> là sự kết hợp của nhiều phân tử tạo thành</li>\n</ul>\n<p>Chúng ta đã biết bảng tuần hoàn hóa học, thứ ám ảnh thời học sinh</p>\n<p><img src="http://atomicdesign.bradfrost.com/images/content/periodic-table.png" alt="Bảng tuần hoàn hóa học"></p>\n<p>Thì lớn lên chúng ta có bảng tuần hoàn HTML, ám ảnh thời web developer</p>\n<p><img src="http://atomicdesign.bradfrost.com/images/content/html-periodic-table.png" alt="Bảng tuần hoàn HTML"></p>\n<p>Sự kết hợp của các element chúng ta tạo ra những trang web khác nhau (Organism)</p>\n<p>Ngoài 3 khái niệm chính trên của hóa học, tác giả đưa thêm 2 khái niệm vào của dân web chúng ta</p>\n<ul>\n<li><strong>Template</strong></li>\n<li><strong>Page</strong></li>\n</ul>\n<p><img src="http://atomicdesign.bradfrost.com/images/content/atomic-design-process.png" alt="Structure theo phương pháp Atomic"></p>\n<h3 id="atom"><a href="#atom" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Atom</h3>\n<p>Những element nhỏ nhất trong giao diện, đó chính là các thẻ html</p>\n<div class="gatsby-highlight">\n      <pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token punctuation">/></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token punctuation">/></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token punctuation">/></span></span></code></pre>\n      </div>\n<h3 id="molecule"><a href="#molecule" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Molecule</h3>\n<p>Trong lập trình chúng ta thường gọi nó là component, thí dụ như search component sẽ bao gồm <code class="language-text">label</code>, <code class="language-text">input</code>, <code class="language-text">button</code></p>\n<p><img src="http://atomicdesign.bradfrost.com/images/content/molecule-search-form.png" alt="Structure theo phương pháp Atomic"></p>\n<h3 id="organism"><a href="#organism" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Organism</h3>\n<p>Một component có ô search, có thanh navigation, logo, đố bạn đó là gì? Header</p>\n<p><img src="http://atomicdesign.bradfrost.com/images/content/organism-header.png" alt="Structure theo phương pháp Atomic"></p>\n<p>Tất nhiên header cũng có thể  có nhiều component khác</p>\n<p><img src="http://atomicdesign.bradfrost.com/images/content/organisms-headers.png" alt="Structure theo phương pháp Atomic"></p>\n<p>Một component có thể gọi là Organism có thể bao gồm nhiều component lặp lại như danh sách sản phẩm, bài viết</p>\n<p><img src="http://atomicdesign.bradfrost.com/images/content/organisms-product-grid.png" alt="Structure theo phương pháp Atomic"></p>\n<h3 id="template"><a href="#template" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Template</h3>\n<p>Giờ tới khái niệm mà tất cả anh em làm web chúng ta điều biết</p>\n<p>Template là page nhưng ở dạng skeleton, chúng ta chưa tô vẽ gì cụ thể, nó như một cái rập, chúng ta dùng để đập ra vài trăm bộ đồ.</p>\n<p><img src="http://atomicdesign.bradfrost.com/images/content/template-timeinc-homepage.png" alt="Structure theo phương pháp Atomic"></p>\n<h3 id="page"><a href="#page" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Page</h3>\n<p>Page là một một UI hoàn chỉnh với nội dung, hình ảnh, logic có đầy đủ hết rồi</p>\n<p><img src="http://atomicdesign.bradfrost.com/images/content/page-timeinc-homepage.png" alt="Structure theo phương pháp Atomic"></p>\n<p>Một illustration tổng quát</p>\n<p><img src="http://atomicdesign.bradfrost.com/images/content/atomic-design-abstract-concrete.png"></p>',timeToRead:2,excerpt:"Atom Molecule Organism Template Page Đây là một trong những cách tiếp cận để thiết kế một system. Tác giả của structure này là Brad Frost…",frontmatter:{title:"Làm quen với phương pháp Atomic để structure source code, design",cover:"https://miro.medium.com/max/1838/1*uhcVPeGql8ejpHjYIbpdJQ.png",date:"2019-09-13",category:null,tags:["javascript","ux-ui","kinh-nghiem"],desc:"Atom, molecule, organism, template, và page là những khái niệm chính của phương pháp này"},fields:{slug:"/2019-09-13-giai-thich-phuong-phap-atomic"}}},pathContext:{slug:"/2019-09-13-giai-thich-phuong-phap-atomic",prev:!1,next:{frontmatter:{title:"Làm quen khái niệm CORS của Web",desc:"Bài này khá căn bản và cần thiết cho bạn nào chưa biết gì về CORS, nghe ai đó nói về từ khóa ghê gớm này mà ko biết nó là gì, không để cập đến vấn đề setup làm sao để chạy CORS trên server - vì mình ko biết code phía server đâu",type:"post",category:null,tags:["javascript","hoc-thuat"],date:"2019-09-06",cover:""},fields:{slug:"/2019-09-06-gioi-thieu-can-ban-ve-cors"}}}}}});
//# sourceMappingURL=path---2019-09-13-giai-thich-phuong-phap-atomic-039a24066a5cb04d5b89.js.map