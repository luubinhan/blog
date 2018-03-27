webpackJsonp([57],{"./node_modules/json-loader/index.js!./.cache/json/2017-01-10-nam-vung-5-khai-niem-sau-xem-nhu-master-react.json":function(n,s){n.exports={data:{markdownRemark:{html:'<p>Sạo vậy thôi chứ làm gì mà trở thành master ngay lập tức được, lý lẽ bình thường muốn master bất cứ thứ gì cũng cần mồ hôi và nước mắt. Hiểu được 5 khái niệm được cho là căn cơ nhất này sẽ giúp bạn dễ xa lầy hơn.</p>\n<ol>\n<li>Component</li>\n<li>JSX</li>\n<li>Props &#x26; State</li>\n<li>Component API</li>\n<li>Component Type</li>\n</ol>\n<h1>Khái niệm #1: React component hoạt động ra sau</h1>\n<p>Điều đầu tiên cần nằm lòng là tất cả những gì React xây dựng điều xoay quanh component. Thế thì component là gì. Ví dụ tuyệt vời nhất là select HTML element, select có thể xem như một component được định nghĩa sẵn với kiểu hiện thị riêng của nó (màu xám, có label, nút tam giác nằm ở góc phải) và tự nó xử lý tác vụ đóng mở mấy cái option</p>\n<p><img src="https://img.readitlater.com/i/cdn-images-1.medium.com/max/800/1*dPxDcCmCItzEyQuPpHOS3Q/RS/w704.gif"></p>\n<p>Giờ tưởng tượng là chúng ta sẽ tự build ra một cái component tương tự như select với giao diện và event chúng ta tự kiểm soát</p>\n<p><img src="https://img.readitlater.com/i/cdn-images-1.medium.com/max/800/1*AZ2IbiM4WskvgvIyhq6qPA/RS/w704.gif"></p>\n<p>Đó là những gì React giúp chúng ta làm, xây dựng một đối tượng không chỉ output ra một HTML templete thông thường,  chúng ta sẽ viết ra những function để control những event trên cái template đó</p>\n<p>Để tạo ra một React component căn bản nhất</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">class</span> <span class="token class-name">MyComponent</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>component</span> <span class="token punctuation">{</span>\n <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n  <span class="token keyword">return</span> Hello World<span class="token operator">!</span><span class="token punctuation">;</span>\n <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<h1>Khái niệm #2: JSX chạy thế nào</h1>\n<p>Có thể thấy là với cách tạo ra một component như React thì javascript và HTML sống chung một nhà. Vũ khí bí mật của React để làm được chuyện "what-the-heck" đó là JSX language.</p>\n<p>Ngày xưa, đi học được dạy phải tách biệt HTML ra một file và JS ra một file, thời gian sau này anh em làm frontend thấy làm gom như vậy làm thấy nhanh hơn, mà cũng không quá evil như mấy ông thầy dạy</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">class</span> <span class="token class-name">MyComponent</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>component</span> <span class="token punctuation">{</span>\n <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\nreturnToday is<span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token keyword">new</span> <span class="token class-name">Data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Để ý cái cách ta chèn code javascript ở trong HTML bằng cách đưa nào vào bên trong dấu {}, đó là cách viết JSX</p>\n<h1>Khái niệm 3: Props và State</h1>\n<p>Bạn chắc chắn biết đến attribute href cho thẻ a , chưa biết? về lại w3com học nhé. Với một component của React những attribute như vậy được gọi là props . Props là cách mà các component tương tác lẫn nhau</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">class</span> <span class="token class-name">ParentComponent</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span><span class="token punctuation">{</span>\n <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token operator">&lt;</span>ChildComponent message<span class="token operator">=</span><span class="token string">"Hello World"</span> <span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">;</span>\n <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">class</span> <span class="token class-name">ChildComponent</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span><span class="token punctuation">{</span>\n <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n  <span class="token keyword">return</span> And then I said<span class="token punctuation">,</span> <span class="token string">"{this.props.message}"</span><span class="token punctuation">;</span>\n <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Dữ liệu trong component có thể truyền từ cha xuống con và không có ngược lại</p>\n<p>Đôi khi dữ liệu sẽ không phải được truyền từ cha xuống con, mà nó chỉ là một dữ liệu tạm thời nào đó, ví dụ như giá trị input của user chẳng hạn, lúc đó nó được gọi là state</p>\n<p>Cho dễ hình dung, nếu xem cái bảng nam châm là một component thì props là nút gạt xóa, state là những gì viết trên bảng</p>\n<p><img src="https://img.readitlater.com/i/cdn-images-1.medium.com/max/1000/1*aYxNrkwkAPwIoGc0-3k_Ug/RS/w704.jpeg"></p>\n<p>Bên trong một component, state được quản lý bằng hàm setState thường được viết lòng trong một hàm xử lý sự kiện</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">class</span> <span class="token class-name">MyComponent</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n handleClick <span class="token operator">=</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span>\n  <span class="token keyword">this</span><span class="token punctuation">.</span>setState <span class="token punctuation">(</span><span class="token punctuation">{</span>clicked<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n <span class="token punctuation">}</span>\n <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token operator">&lt;</span>a href<span class="token operator">=</span><span class="token string">"#"</span> onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>handleClick<span class="token punctuation">}</span><span class="token operator">></span> Click Me<span class="token operator">&lt;</span><span class="token operator">/</span>a<span class="token operator">></span><span class="token punctuation">;</span>\n <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<h1>Khái niệm #4: Component API</h1>\n<p>Những hàm như render và setState là một phần của component API, ngoài ra nó còn một số hàm hữu ích khác nữa như constructor để khởi tạo state và kích hoạt các phương thức, một số hàm trigger trước khi component được load, sau khi load, sau khi unmounting. vâng vâng.</p>\n<p>Thật ra việc master được React phần nhiều là master được việc lập trình và khái niệm để kiến trúc ra một component hơn là một loạt các API được hỗ trợ sẵn, vậy nên phần này kết thúc ở đây.</p>\n<h1>Khái niệm 5: Component Type</h1>\n<p>Mấy ví dụ trên, định nghĩa một component được khai báo dạng class</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">class</span> <span class="token class-name">MyComponent</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span><span class="token punctuation">{</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Giờ thì hãy quên cách viết này đi! Bây giờ ai cũng viết một component ở dạng function component</p>\n<p>Một functional component là một function nhận một props object như tham số truyền vào và trả về một đống HTML lằn xà ngoằn. Y hệt như cách viết template kinh điển, khác biệt cơ bản là ở chổ mình có thể xài JavaScript bất cứ chổ nào khi cần</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">const</span> myComponent <span class="token operator">=</span> props <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> Hello <span class="token punctuation">{</span>props<span class="token punctuation">.</span>name<span class="token punctuation">}</span><span class="token punctuation">,</span> Today is <span class="token punctuation">{</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Viết cách này có một hậu quả là mình không thể access được phương thức của component, trên thực tế việc này không ảnh hưởng gì làm vì phần lớn trường hợp ta không dùng tới.</p>\n<p>Và như vậy component này sẽ không có phương thức setState , không có state luôn, người ta còn gọi là stateless functional component.</p>\n<p>Cách viết này rất là gọn gàng, phù hợp cho những trường component đơn giản, nên áp dụng khi có thể.</p>\n<p>Nguồn</p>\n<blockquote>\n<blockquote>\n<p><a href="https://medium.freecodecamp.com/the-5-things-you-need-to-know-to-understand-react-a1dbd5d114a3">https://medium.freecodecamp.com/the-5-things-you-need-to-know-to-understand-react-a1dbd5d114a3</a></p>\n</blockquote>\n</blockquote>',frontmatter:{date:"January 10, 2017",path:"/2017-01-10-nam-vung-5-khai-niem-sau-xem-nhu-master-react",tags:["javascript","react"],title:"Nắm vững 5 khái niệm sau, xem như master React",desc:"Sạo vậy thôi chứ làm gì mà trở thành master ngay lập tức được, lý lẽ bình thường muốn master bất cứ thứ gì cũng cần mồ hôi và nước mắt. Hiểu được 5 khái niệm được cho là căn cơ nhất này sẽ giúp bạn dễ xa lầy hơn."}}},pathContext:{prev:{excerpt:"Làm front end được kha khá năm, đứng trung gian giữa anh developer và anh designer, được tiếp xúc với rất nhiều designer từ cao cấp tới mới ra trường, mình có thể khẳng định là những ảnh designer dù là tự học hay được đào tạo bài bảng qua trường lớp...",html:'<p>Làm front end được kha khá năm, đứng trung gian giữa anh developer và anh designer, được tiếp xúc với rất nhiều designer từ cao cấp tới mới ra trường, mình có thể khẳng định là những ảnh designer dù là tự học hay được đào tạo bài bảng qua trường lớp, mỗi anh điều có một kiểu làm việc rất riêng, trong giới designer, đặc biệt là web design, sẽ chẳng anh nào đi theo một cái guide chung nào cả, khác hẳng với developer, nơi mà mọi thứ luôn được chuẩn hóa từng ngày, một anh developer mới vào công ty được thẩy vô trong một cái dự án bự tổ chảng, sau vài ngày training những "luật lệ" được đề ra từ lớp người đi trước là ảnh có thể follow theo và bắt đầu làm việc với một cách mượt mà. Ở góc độ của một người đứng giữa, mình luôn cho rằng anh developer luôn luôn là người nên đặt ra các luật lệ mà anh designer phải tuân theo, chứ không phải ngược lại.</p>',id:"E:/anluu/luckyluu/posts/2017-03-06-thoi-dai-cua-pixel-effect-design-da-het-tu-lau/index.md absPath of file >>> MarkdownRemark",timeToRead:1,frontmatter:{date:"2017-03-06T13:35:13.234Z",path:"/2017-03-06-thoi-dai-cua-pixel-effect-design-da-het-tu-lau",tags:["css","ux-ui"],title:"Thời đại của Pixel Perfect Design đã hết từ lâu"}},next:{excerpt:"Javascript vốn là ngôn ngữ  ,   không phải là cái gì đó mới mẻ trong javascript, chỉ là trước đây có cách khai báo và tên gọi khác prototype thì giờ có cách khai báo mới cho những ai đã quen với những ngôn ngữ khác có thể tiếp cận dễ dàng. Khai báo...",html:'<p>Javascript vốn là ngôn ngữ <code>prototype</code>, <code>class</code> không phải là cái gì đó mới mẻ trong javascript, chỉ là trước đây có cách khai báo và tên gọi khác prototype thì giờ có cách khai báo mới cho những ai đã quen với những ngôn ngữ khác có thể tiếp cận dễ dàng.</p>\n<h2>Khai báo</h2>\n<p>Đây là cách khai báo trước đây, khai báo <code>fruit</code> sử dụng <code>function contstructor</code>, thêm một số phương thức cho nó bằng khai báo thêm <code>prototype</code>.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">function</span> <span class="token function">Fruit</span><span class="token punctuation">(</span> name<span class="token punctuation">,</span> calories <span class="token punctuation">)</span> <span class="token punctuation">{</span>\n <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name\n <span class="token keyword">this</span><span class="token punctuation">.</span>calories <span class="token operator">=</span> calories\n <span class="token keyword">this</span><span class="token punctuation">.</span>pieces <span class="token operator">=</span> <span class="token number">1</span>\n<span class="token punctuation">}</span>\nFruit<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>chop <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n <span class="token keyword">this</span><span class="token punctuation">.</span>pieces<span class="token operator">++</span>\n<span class="token punctuation">}</span>\nFruit<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>bite <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n <span class="token keyword">if</span> <span class="token punctuation">(</span> <span class="token keyword">this</span><span class="token punctuation">.</span>pieces <span class="token operator">&amp;</span>amp<span class="token punctuation">;</span>amp<span class="token punctuation">;</span>lt<span class="token punctuation">;</span> <span class="token number">1</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span>\n <span class="token punctuation">}</span>\n <span class="token keyword">const</span> calories <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span> calories <span class="token operator">/</span> <span class="token keyword">this</span><span class="token punctuation">.</span>pieces\n person<span class="token punctuation">.</span>satiety <span class="token operator">+</span><span class="token operator">=</span> calories\n <span class="token keyword">this</span><span class="token punctuation">.</span>calories <span class="token operator">-</span><span class="token operator">=</span> calories\n <span class="token keyword">this</span><span class="token punctuation">.</span>pieces<span class="token operator">--</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Với ES6 viết theo khai báo <code>class</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">class</span> <span class="token class-name">Fruit</span> <span class="token punctuation">{</span>\n constructor <span class="token punctuation">(</span> name<span class="token punctuation">,</span> calories <span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name\n  <span class="token keyword">this</span><span class="token punctuation">.</span>calories <span class="token operator">=</span> calories\n  <span class="token keyword">this</span><span class="token punctuation">.</span>pieces <span class="token operator">=</span> <span class="token number">1</span>\n <span class="token punctuation">}</span>\n chop <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">this</span><span class="token punctuation">.</span>pieces<span class="token operator">++</span>\n <span class="token punctuation">}</span>\n bite <span class="token punctuation">(</span> person <span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>pieces <span class="token operator">&amp;</span>amp<span class="token punctuation">;</span>amp<span class="token punctuation">;</span>lt<span class="token punctuation">;</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n   <span class="token keyword">return</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">const</span> calories <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>calories <span class="token operator">/</span> <span class="token keyword">this</span><span class="token punctuation">.</span>pieces\n  person<span class="token punctuation">.</span>satiety <span class="token operator">+</span><span class="token operator">=</span> calories\n  <span class="token keyword">this</span><span class="token punctuation">.</span>calories <span class="token operator">-</span><span class="token operator">=</span> calories\n  <span class="token keyword">this</span><span class="token punctuation">.</span>pieces<span class="token operator">--</span>\n <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Lưu ý là với khai báo <code>class</code>, mình không cần thêm dấu <code>,</code> giữa các hàm, phân biệt với <code>object literal</code>, giữa mỗi <code>function</code> phải được phân cách bằng <code>,</code></p>\n<p>Không giống như khi khai báo function, nếu khái báo <code>class</code> bên dưới câu gọi nó, nó sẽ không hiểu, <code>function</code> thì viết ở đâu gọi cũng hiểu</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment" spellcheck="true">// Result: referenceError: Person is not defined</span>\n<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<h2>Phương thức và Properties trong Classes</h2>\n<p><code>constructor</code> không bắt buộc khai báo</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">class</span> <span class="token class-name">Fruit</span> <span class="token punctuation">{</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Đoạn code ví dụ bên dưới, tạo một <code>class</code> với <code>property</code> là <code>count</code> hàm phương thức get next sẽ trả về giá trị <code>count</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">class</span> <span class="token class-name">Counter</span> <span class="token punctuation">{</span>\n    constructor <span class="token punctuation">(</span>start<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">=</span> start\n    <span class="token punctuation">}</span>\n    <span class="token keyword">get</span> next <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token operator">++</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Vận dụng, viết một class để lưu dữ liệu nhận về từ JSON, đọc thêm về <code>Window.localStorage</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">class</span> <span class="token class-name">LocalStorage</span> <span class="token punctuation">{</span>\n    constructor <span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>key <span class="token operator">=</span> key\n    <span class="token punctuation">}</span>\n    <span class="token keyword">get</span> data <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> JSON<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">set</span> data <span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>key<span class="token punctuation">,</span> JSON<span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> ls <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LocalStorage</span><span class="token punctuation">(</span><span class="token string">\'groceries\'</span><span class="token punctuation">)</span>\nls<span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">\'apple\'</span><span class="token punctuation">,</span><span class="token string">\'bananas\'</span><span class="token punctuation">,</span> <span class="token string">\'grapes\'</span><span class="token punctuation">]</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ls<span class="token punctuation">.</span>data<span class="token punctuation">)</span>\n<span class="token comment" spellcheck="true">// Result: [\'apple\', \'bananas\',\'grapes\']</span>\n</code></pre>\n      </div>\n<p>tạo một phương thức <code>static</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">class</span> <span class="token class-name">MathHelper</span> <span class="token punctuation">{</span>\n    <span class="token keyword">static</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token operator">...</span>numbers<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> numbers<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span> <span class="token punctuation">(</span>a<span class="token punctuation">,</span>b<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> a <span class="token operator">+</span> b <span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>MathHelper<span class="token punctuation">.</span><span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">)</span>\n<span class="token comment" spellcheck="true">// Result: 15</span>\n</code></pre>\n      </div>\n<h2>Class Extends</h2>\n<p>Trước đây gặp trường hợp này phải xài tới "thuốc" thì mới tạo được <code>sub-class</code>, mà cũng khá lằn ngoằn, giờ có cách chính quy. lưu ý là khi muốn viết lại hàm constructor bên trong sub-class thì phải gọi từ khóa super để gọi làm phương thức constructor từ class extend</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">class</span> <span class="token class-name">Banana</span> <span class="token keyword">extends</span> <span class="token class-name">Fruit</span> <span class="token punctuation">{</span>\n constructor <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token string">\'banana\'</span><span class="token punctuation">,</span><span class="token number">105</span><span class="token punctuation">)</span>\n <span class="token punctuation">}</span>\n slice <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">this</span><span class="token punctuation">.</span>pieces <span class="token operator">=</span> <span class="token number">12</span>\n <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>',id:"E:/anluu/luckyluu/posts/2016-11-21-phan-7-es6-can-ban-classes/index.md absPath of file >>> MarkdownRemark",timeToRead:2,frontmatter:{date:"2016-11-21T13:35:13.234Z",path:"/2016-11-21-phan-7-es6-can-ban-classes",tags:["javascript"],title:"Hồi 7: ES6 căn bản - Classes"}}}}}});
//# sourceMappingURL=path---2017-01-10-nam-vung-5-khai-niem-sau-xem-nhu-master-react-f35c017cf01ff3cba7e3.js.map