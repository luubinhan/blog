webpackJsonp([0x8628265e9b06],{1460:function(n,a){n.exports={data:{markdownRemark:{html:'<!-- TOC -->\n<ul>\n<li><a href="#single-responsibility-principle">Single Responsibility Principle</a></li>\n<li><a href="#export">Export</a></li>\n<li><a href="#type-check">Type check</a></li>\n<li><a href="#consistance">Consistance</a></li>\n<li><a href="#naming">Naming</a></li>\n</ul>\n<!-- /TOC -->\n<p><strong>Đây là tổng hợp những quan điểm thiết kế component sao cho tốt, chứ không phải là chuẩn mực gì hết, theo quan điểm cá nhân người viết - là mình đây, không hề là chuẩn mực công nghiệp gì cả.</strong></p>\n<p>Thử hình dung, chúng ta có một component với khoảng hơn chục <code class="language-text">prop</code>, dựa trên các <code class="language-text">prop</code> truyền vào, component sẽ cho ra kết quả khác nhau, một nhu cầu tất yếu, tuy nhiên nếu hạn chế được ít chừng nào thì tốt chừng ấy, gần như số lượng <code class="language-text">prop</code> của component quá nhiều thì chúng ta sẽ không nhớ nổi cần những gì cho component đó, lúc nào chúng ta cũng phải mở ra đọc docs, đôi khi mở source ra để check logic bên trong nó.</p>\n<h1 id="single-responsibility-principle"><a href="#single-responsibility-principle" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Single Responsibility Principle</h1>\n<p>Nếu 1 component đang có quá nhiều <code class="language-text">prop</code>, nó đang ôm đồm quá nhiều công việc, hãy nhớ đến nguyên tắc <a href="https://en.wikipedia.org/wiki/Single_responsibility_principle">Single Responsibility Principle</a> (SRP), tạm dịch là ai làm việc nấy, chia component đó ra thành các component nhỏ hơn, từng component giải quyết từng vấn đề.</p>\n<p><img src="https://techmaster.vn/fileman/Uploads/ImageBlog/hoc-lap-trinh-truc-tuyen-online-co-ban-den-nang-cao-20122015-1.jpg"></p>\n<h1 id="export"><a href="#export" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Export</h1>\n<p>Một kiểu viết mình rất thích, thay vì export component <code class="language-text">&lt;TableRow/&gt;</code>, <code class="language-text">&lt;TableCell/&gt;</code>, mình sẽ export  component dạng <code class="language-text">&lt;Table.Row/&gt;</code>, <code class="language-text">&lt;Table.Cell/&gt;</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">import</span> Table <span class="token keyword">from</span> <span class="token string">\'./Table\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> TableRow <span class="token keyword">from</span> <span class="token string">\'./TableRow\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> TableCell <span class="token keyword">from</span> <span class="token string">\'./TableCell\'</span><span class="token punctuation">;</span>\n\nTable<span class="token punctuation">.</span>Cell <span class="token operator">=</span> TableCell<span class="token punctuation">;</span>\nTable<span class="token punctuation">.</span>Row <span class="token operator">=</span> TableRow<span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token punctuation">{</span>\n  TableCell<span class="token punctuation">,</span>\n  TableRow\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> Table<span class="token punctuation">;</span></code></pre>\n      </div>\n<p><em>Nếu bạn không hiểu vì sao mình có thể gọi <code class="language-text">&lt;Table.Row/&gt;</code>, <code class="language-text">&lt;Table.Cell/&gt;</code>, mình giải thích luôn, lợi dụng đặc điểm biến kiểu reference, tham khảo <a href="https://luubinhan.github.io/blog/2017-09-25-10-khai-niem-javascript-can-biet">lại bài này</a>, thằng TableCell và Table.Cell đều tham chiếu đến cùng vùng nhớ</em></p>\n<h1 id="type-check"><a href="#type-check" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Type check</h1>\n<p>Luôn dùng type check cho component, thời điểm hiện tại mình khuyến khích <a href="https://luubinhan.github.io/blog/2018-09-10-huong-dan-lam-viec-voi-flow-react-type-checking">dùng Flow</a>, nó đảm bảo rằng component sẽ được truyền đúng giá trị <code class="language-text">prop</code> nó cần, đồng thời lúc gõ ra mình cũng sẽ thấy được danh sách các <code class="language-text">prop</code> của component đó trên editor</p>\n<p><img src="https://cdn-images-1.medium.com/max/800/1*cT7C0Tk53cilIYNWNo8KfA.gif" alt="Chỉ dẫn để thiết kế React Component"></p>\n<h1 id="consistance"><a href="#consistance" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Consistance</h1>\n<p>Luôn thống nhất trong hệ thống component đang build, không thể lúc vui bạn dùng <code class="language-text">prop</code> tên <code class="language-text">disable</code> chổ khác dùng <code class="language-text">enable</code>, nếu được thì chỉ chọn 1 trong 2 thôi.</p>\n<p>Ví dụ khác, nếu component cho phép truyền vào biến màu sắc, chổ này bạn dùng <code class="language-text">variant=&quot;primary|secondary|danger&quot;</code>, chổ kia bạn lại dùng <code class="language-text">color=&quot;blue|grey|red&quot;</code> thì hết sức khó chịu cho người khác.</p>\n<h1 id="naming"><a href="#naming" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Naming</h1>\n<p>Về cách đặt tên <code class="language-text">prop</code>, luôn đặt tên cho dễ hình dung được công dụng của component đó làm nhiệm vụ gì, ảnh hưởng gì đến component</p>\n<p>Giờ lấy ví dụ một component rất phổ biến <code class="language-text">&lt;Alert /&gt;</code></p>\n<p><img src="https://cdn-images-1.medium.com/max/1600/0*xkEnUeapJT4ut5r1.png" alt="Chỉ dẫn để thiết kế React Component"></p>\n<p>Thường chúng ta sẽ tạo ra component có các <code class="language-text">prop</code> kiểu này</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Alert</span></span><span class="token punctuation">></span></span>Thông báo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Alert</span></span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Alert</span></span> <span class="token attr-name">success</span><span class="token punctuation">></span></span>Thành công<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Alert</span></span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Alert</span></span> <span class="token attr-name">warning</span><span class="token punctuation">></span></span><span class="token constant">C</span>ảnh báo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Alert</span></span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Alert</span></span> <span class="token attr-name">danger</span><span class="token punctuation">></span></span><span class="token constant">H</span>ư mẹ rồi<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Alert</span></span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Rất rõ ràng sạch sẽ, xúc tích. Tuy nhiên nếu chúng ta dùng theo kiểu sau</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Alert</span></span> <span class="token attr-name">success</span> <span class="token attr-name">warning</span><span class="token punctuation">></span></span>Thành công<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Alert</span></span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Sẽ có những anh developer ngu ngu ngơ ngơ dùng như vậy thật đấy. Tất nhiên nếu chúng ta là người viết cái <code class="language-text">&lt;Alert/&gt;</code> chúng ta sẽ không đời nào truyền vào kiểu vậy. Nếu truyền vào kiểu như vậy thì nó <code class="language-text">render</code> ra cái gì, đó mà đoán được. Một giải pháp được khuyến khích</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">AlertBetter</span></span><span class="token punctuation">></span></span>Thông báo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">AlertBetter</span></span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">AlertBetter</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>success<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Thành công<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">AlertBetter</span></span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">AlertBetter</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>warning<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token constant">C</span>ảnh báo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">AlertBetter</span></span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">AlertBetter</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>danger<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token constant">H</span>ư mẹ rồi<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">AlertBetter</span></span><span class="token punctuation">></span></span></code></pre>\n      </div>\n<p>Nguồn tham khảo và tổng hợp</p>\n<ul>\n<li>\n<p><a href="https://blog.kentcdodds.com/make-impossible-states-impossible-cf85b97795c1">https://blog.kentcdodds.com/make-impossible-states-impossible-cf85b97795c1</a></p>\n</li>\n<li>\n<p><a href="https://hackernoon.com/principles-of-component-api-prop-design-bb20cd58da54">https://hackernoon.com/principles-of-component-api-prop-design-bb20cd58da54</a></p>\n</li>\n</ul>',timeToRead:4,excerpt:"Single Responsibility Principle Export Type check Consistance Naming Đây là tổng hợp những quan điểm thiết kế component sao cho tốt, chứ…",frontmatter:{title:"Chỉ dẫn để thiết kế React Component",cover:"",date:"2018-09-25",category:null,tags:["javascript","react"],desc:"Tốt hơn, tốt nữa, tốt mãi, luôn là điều mình muốn, ngoài chuyện viết cho nó chạy đúng, viết thế nào tốt nhất nên là mục tiêu khi làm việc"},fields:{slug:"/2018-09-25-huong-dan-thiet-ke-react-component-tot"}}},pathContext:{slug:"/2018-09-25-huong-dan-thiet-ke-react-component-tot",prev:{frontmatter:{title:"Điểm qua các kiểu navigator của thư viện react-navigation",desc:"Chúng ta cùng liệt kê qua các dạng navigator, khi nào, dùng ở đâu là hợp lý",type:"post",category:null,tags:["javascript","react-native"],date:"2018-09-27",cover:""},fields:{slug:"/2018-09-27-huong-dan-react-native-cac-kieu-react-navigation"}},next:{frontmatter:{title:"Tạo slider component trong React Native bằng PanResponder",desc:"Tuts này sẽ hướng dẫn các bạn tạo một slider component đơn giản trong React Native bằng PanResponder",type:"post",category:null,tags:["javascript","react-native"],date:"2018-09-21",cover:""},fields:{slug:"/2018-09-21-huong-dan-react-native-dung-mot-slider-dung-voi-react-native"}}}}}});
//# sourceMappingURL=path---2018-09-25-huong-dan-thiet-ke-react-component-tot-f382946485fc461a1528.js.map