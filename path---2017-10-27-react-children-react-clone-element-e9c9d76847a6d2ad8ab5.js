webpackJsonp([72],{"./node_modules/json-loader/index.js!./.cache/json/2017-10-27-react-children-react-clone-element.json":function(n,s){n.exports={data:{markdownRemark:{html:'<p>Hãy nghĩ ngay tới cặp đôi <code>React.Children.map</code> và <code>React.cloneElement</code> khi cần truyền <code>props</code> từ component cha xuống các component con mà <strong>KHÔNG cần gọi render component bên trong component cha</strong></p>\n<p>Hơi mâu thuẫn vì không <code>render</code> component con vậy sao nó hiển thị, ví dụ đi</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code><span class="token keyword">const</span> ComponentChaChu <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>children<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>\n     <span class="token punctuation">{</span>\n        React<span class="token punctuation">.</span>Children<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>children<span class="token punctuation">,</span> child <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">(</span>\n            React<span class="token punctuation">.</span><span class="token function">cloneElement</span><span class="token punctuation">(</span>child<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n                style<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n                    backgroundColor<span class="token punctuation">:</span> <span class="token string">\'green\'</span><span class="token punctuation">,</span>\n                    color<span class="token punctuation">:</span> <span class="token string">\'white\'</span>\n                <span class="token punctuation">}</span>\n            <span class="token punctuation">}</span><span class="token punctuation">)</span>\n        <span class="token punctuation">)</span><span class="token punctuation">)</span>\n     <span class="token punctuation">}</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token punctuation">)</span>\n<span class="token keyword">const</span> Luckyluu <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>title<span class="token punctuation">,</span> posts<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">(</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ComponentChaChu</span><span class="token punctuation">></span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>NavBar</span> <span class="token attr-name">title</span><span class="token script language-javascript"><span class="token punctuation">=</span><span class="token punctuation">{</span>title<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ComponentChaChu</span><span class="token punctuation">></span></span>\n        <span class="token punctuation">{</span>\n            posts<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>post <span class="token operator">=</span><span class="token operator">></span><span class="token punctuation">(</span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Post</span> <span class="token attr-name">key</span><span class="token script language-javascript"><span class="token punctuation">=</span><span class="token punctuation">{</span>post<span class="token punctuation">.</span>id<span class="token punctuation">}</span></span><span class="token punctuation">></span></span>\n                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ComponentChaChu</span><span class="token punctuation">></span></span>\n                        <span class="token operator">&lt;</span>PostHeader <span class="token punctuation">{</span><span class="token operator">...</span>post<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span> \n                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ComponentChaChu</span><span class="token punctuation">></span></span>\n                    <span class="token operator">&lt;</span>PostBody <span class="token punctuation">{</span><span class="token operator">...</span>post<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Post</span><span class="token punctuation">></span></span>\n            <span class="token punctuation">)</span><span class="token punctuation">)</span>\n        <span class="token punctuation">}</span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>2 component con ở đây là <code>PostHeader</code> và <code>NavBar</code> có thể sử dụng ở bất kỳ đâu, còn <code>ComponentChaChu</code> có thể có bất kỳ đứa con nào, không cần biết sau này con nó là ai thì nó sẽ truyền hết tài sản là <code>backgroundColor</code> và <code>color</code> cho đứa con yêu dấu đó</p>\n<p>Sẵn tiện thì nói luôn một số <em>function</em> khác của <code>React.Children</code> luôn</p>\n<h2><code>React.Children.forEach</code></h2>\n<p>Giống như <code>React.Children.map</code> nhưng không trả về gì hết</p>\n<h2><code>React.Children.count</code></h2>\n<p>Nhà có nhiêu đứa con ?</p>\n<h2><code>React.Children.toArray(children)</code></h2>\n<p>Convert component con về <code>array</code></p>\n<h2><code>React.Children.only</code></h2>\n<p>Để áp dụng chương trình kế hoạch hóa gia đình, mỗi component cha chỉ có <strong>1</strong> và phải có 1 con duy nhất, quăng cái thông báo nếu không đáp ứng yêu cầu này.</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code><span class="token keyword">class</span> <span class="token class-name">BaBa</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span><span class="token function">children</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Nếu bắt buộc con thằng <code>BaBa</code> phải là <code>function</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code>BaBa<span class="token punctuation">.</span>propTypes <span class="token operator">=</span> <span class="token punctuation">{</span>\n    children<span class="token punctuation">:</span> React<span class="token punctuation">.</span>propTypes<span class="token punctuation">.</span>func<span class="token punctuation">.</span>isRequired\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Nó log ra thông báo lỗi khi truyền vào con không phải là <code>function</code>, dev lười biến có thể \'cho qua\' thông báo này. Nhưng khi mình bắt buộc kiểu này</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code><span class="token keyword">class</span> <span class="token class-name">BaBa</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n    <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> React<span class="token punctuation">.</span>Children<span class="token punctuation">.</span><span class="token function">only</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span><span class="token function">children</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Nếu không có con là app chết luôn, cho các anh dev không còn lười biếng, giống kiểu mấy người xưa ko có con là không có được vây. ;)</p>',frontmatter:{date:"October 27, 2017",path:"/2017-10-27-react-children-react-clone-element",tags:["javascript","react"],title:"React Children và React cloneElement",desc:"Tìm hiểu cách sử dụng react Children và react cloneElement"}}},pathContext:{prev:{excerpt:"Cùng nhìn thử cách Google làm với: Giới thiệu một tính năng mới của sản phẩm Quyết định tách 2 tác vụ là  xem  và  edit  ra 2 màn hình khác nhau Áp dụng Google Material Design Pattern Giới thiệu tính năng mới Khi có một thay đổi về giao diện, hoặc...",html:'<p>Cùng nhìn thử cách Google làm với:</p>\n<ol>\n<li>Giới thiệu một tính năng mới của sản phẩm</li>\n<li>Quyết định tách 2 tác vụ là <strong>xem</strong> và <strong>edit</strong> ra 2 màn hình khác nhau</li>\n<li>Áp dụng Google Material Design Pattern</li>\n</ol>\n<h2>Giới thiệu tính năng mới</h2>\n<p>Khi có một thay đổi về giao diện, hoặc tính năng sản phẩm sẽ có 2 mặt: người sử dụng sẽ cảm thấy rất hứng thú và một vài người thì rất sợ những thay đổi này, vì vốn đã quá quen với cách làm việc của hệ thống cũ. Giới thiệu và guide người sử dụng những thay đổi này để họ biết và chấp nhận nó là cần thiết.</p>\n<p><img src="https://cdn-images-1.medium.com/max/2000/1*jedZ6ACXCLZTIXlA2SAw3w.png"></p>\n<p>Không ép buộc người sử dụng cập nhập tính năng mới ngay lập tức, Google hiển thị một thông báo nhỏ ở trên cùng để user biết có tính năng mới được cập nhập cho cái công cụ người dùng đã quá quen thuộc và sử dụng hàng ngày, kiểu như</p>\n<blockquote>\n<p>Cứ sử dụng Calendar như bình thường nhé, khi nào sẵn sàng thì cập nhập tính năng mới nè, vui lắm.</p>\n</blockquote>\n<p><a href="https://cdn-images-1.medium.com/max/2000/1*rxdA2Wzp4SmS6MleIHe7yw.png"></a></p>\n<p><a href="https://cdn-images-1.medium.com/max/2000/1*6aRa42RkpvmrokqUCXW9JQ.png"></a></p>\n<p>Như vậy với 3 cú click chuột cùng một vài câu thông báo ngắn gọn, user có thể cập nhập Calendar lên phiên bản mới, không những thế Google còn cho phép user quay lại phiên bạn cũ nếu thấy phiên bản mới khó sử dụng, khi đó một lời mời gởi feedback sẽ được gởi cho user trả lời cầu hỏi: Điều chi đã khiến em không thích phiên bản mới của anh. </p>\n<p>Việc phải duy trì 2 phiên bản đồng thời như vậy chứng tỏ Google rất giàu! Một chút chi phí đó để xây dựng lòng tin vào người sử dụng, người sử dụng bị cấy trong đầu ý nghĩ "Sản phẩm của Google thì nào cũng hướng tới tốt nhất cho người sử dụng"</p>\n<h2>Tách 2 màn hình xem và edit</h2>\n<p>Trước đây để xem những thông tin như địa điểm, mô tả, link phải chuyển tới một trang mới, bây giờ xem được trực tiếp trên một cửa sổ popup nhỏ ở ngay màn hình chính.</p>\n<p><img src="https://cdn-images-1.medium.com/max/2000/1*VPdG6U1MRMrA0_vjMd0tyQ.png"></p>\n<p>Một ví dụ điển hình cho quyết định có nên tách trang để xem thông tin chi tiết và trang chỉnh sửa thông tin chi tiết, thường chúng ta xe gộp nó lại thành một. </p>\n<p>Nghe thì có vẻ là chuyện rất hiển nhiên thôi, nhưng các bạn sẽ nghe rất nhiều luồn ý kiến khác nhau từ những người làm trong team như "Tại sao không cho 2 trang thành 1 thôi, nơi user có thể có thể làm được mọi thứ, one stop solution". Nghe thì cũng rất hợp lý, nhưng khi thực hiện bạn sẽ bị một chuyện là quá nhiều control trên màn hình edit, trang nhìn sẽ vô cùng rối vì quá nhiều tính năng cần được show ra trên màn hình này, và khi có quá nhiều control trên một màn hình thì user chắc chắn bị rối. Đây là dựa trên lý thuyết JTBD - Job to be done, <a href="https://hbr.org/2016/09/know-your-customers-jobs-to-be-done">Xem thêm về JTBD</a></p>\n<p>Thử tưởng tượng, bạn ngồi xuống sắp xếp lịch công việc trong tháng tới, tuần tới, ngày tới, có phải bạn sẽ cần lướt qua những công việc được sắp xếp trước và sau để phân bố thời gian cho hợp lý.</p>\n<p><img src="https://cdn-images-1.medium.com/max/2000/1*fW40s0zTUC1HtTK1O6SGbg.png"></p>\n<p>Với dạng tác vụ kiểu reminder hay event, user cần set thông tin giờ và địa điểm, một popup khác với chỉ 2 field quan trọng nhất này để user có thể chỉnh sửa ngay trên màn hình chính, nếu user muốn có nhiều thay đổi hơn nữa, có thể quyết định click "More option" để tới màn hình edit</p>\n<h2>Design Pattern</h2>\n<p><img src="https://cdn-images-1.medium.com/max/2000/1*s0wREfdCJb42NqMQlj6NTw.png" alt="Trang Settings cũ và mới"></p>\n<p>Trang Settings của Calendar giờ cũng được \'nâng cấp\' theo chuẩn Google\'s Material Design</p>\n<p>Nhìn vô là thấy liền Material Design giúp cho việc chuẩn hóa các sản phẩm của Google theo UX nhanh và hiệu quả như thế nào</p>\n<ul>\n<li>Những thông tin liên quan được group vào trong Card giúp dễ scan nội dung bên trong hơn</li>\n<li>Bên trong Card, các cụm control như Dropdown, Checkbox, Radio được gắn liền kề với phần mô tả, thay vì trước đây user phải hướng mắt theo đường zizag trái phải, trái phải, giờ nhìn từ trên xuống là thấy liền</li>\n<li>Nút Back nằm trên cùng giúp Web App và Mobile App gần như giống nhau về trải nghiệm</li>\n<li>Chữ nghĩa cũng được sắp xếp lại theo hướng kế thừa từ to tới nhỏ, tăng độ tương phản chứ không còn mờ mờ như hồi xưa.</li>\n</ul>',id:"E:/anluu/luckyluu/posts/2017-11-02-mot-vai-cai-tien-google-calendar/index.md absPath of file >>> MarkdownRemark",timeToRead:3,frontmatter:{date:"2017-11-02T13:35:13.234Z",path:"/2017-11-02-mot-vai-cai-tien-google-calendar",tags:["ux-ui"],title:"Một vài cải tiến của Google Calendar"}},next:{excerpt:"Để thực sự trở thành một master React, việc hiểu lifecycle của component là bắt buộc, vòng đời của một component được tính từ lúc nó được chèn vào trong DOM (tức là không kể giai đoạn   - có thể xem là giai đoạn thai nghén) đến lúc nó được remove ra...",html:'<p><img src="https://cdn-images-1.medium.com/max/1600/1*u8hTumGAPQMYZIvfgQMfPA.jpeg"></p>\n<p>Để thực sự trở thành một master React, việc hiểu lifecycle của component là bắt buộc, vòng đời của một component được tính từ lúc nó được chèn vào trong DOM (tức là không kể giai đoạn <code>componentWillMount</code> - có thể xem là giai đoạn thai nghén) đến lúc nó được remove ra khỏi DOM.</p>\n<p>Các phương thức của lifecycle là một dạng <code>hook</code> (giống như khái niệm <code>hook</code> trong wordpress), cho phép người lập trình can thiệp vào quá trình cập nhập UI với những thay đổi của <code>state</code> hoặc <code>props</code>.</p>\n<p>Những phương thức bắt đầu với <code>componentWill</code> tức là cái <code>hook</code> này được đặt trước những xử lý của React, còn bắt đầu với <code>componentDid</code> thì chạy sau khi thực hiện các đoạn code xử lý của React.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token function">componentEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    componentWill<span class="token operator">...</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment" spellcheck="true">// hook</span>\n\n    <span class="token comment" spellcheck="true">// React handle something</span>\n    \n    componentDid<span class="token operator">...</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment" spellcheck="true">// hook</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<h2>constructor</h2>\n<p>Phương thức này sẽ được gọi khi component được khởi tạo, trước khi nó được <em>mount</em></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">class</span> <span class="token class-name">Clicker</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function">constructor</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>handleClick <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handleClick<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span>\n       clicks<span class="token punctuation">:</span> <span class="token number">0</span>\n    <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token function">handleClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> \n      clicks<span class="token punctuation">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>clicks <span class="token operator">+</span> <span class="token number">1</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token comment" spellcheck="true">//...</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<h2>componentWillMount</h2>\n<p>Chạy sau <code>constructor</code> trước khi component mount vô DOM bằng hàm <code>render</code></p>\n<p>Lưu ý không nên gọi bất kỳ hàm nào có gọi <code>setState</code> trong <code>componentWillMount</code> vì chưa có DOM nào để tương tác.</p>\n<h2>componentDidMount</h2>\n<p>Component đã hiện hình, là lúc mà ta gọi AJAX, thêm sự kiện có tương tác với DOM, gọi <code>setState</code> ở đây sẽ trigger sự kiện re-render.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token function">componetDidMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">\'https://gitconnected.com\'</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span>\n      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        user<span class="token punctuation">:</span> res<span class="token punctuation">.</span>user\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<h2>componentWillReceiveProps</h2>\n<p>Chạy khi component nhận được <code>props</code> mới từ component cha. Thời điểm thích hợp để kiểm tra và reset lại <code>state</code> có phụ thuộc vào giá trị <code>props</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token function">componentWillReceiveProps</span><span class="token punctuation">(</span>nextProps<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>id <span class="token operator">!==</span> nextProps<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      feedContent<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<h2>shouldComponentUpdate</h2>\n<p>Có phương thức này để cải thiện performance của React, vì đôi lúc có những sự thay đổi <code>state</code> hoặc <code>props</code> nếu không muốn cập nhập lại UI có thể cho hàm này return và <code>false</code> (mặc định là return <code>true</code>), khi return <code>false</code> các hàm <code>componentWillUpdate</code>, <code>render</code>, <code>componentDidUpdate</code> sẽ không được gọi.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token function">shouldComponentUpdate</span><span class="token punctuation">(</span>nextProps<span class="token punctuation">,</span> nextState<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n   <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>clicks <span class="token operator">!==</span> nextProps<span class="token punctuation">.</span>clicks<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<h2>componentWillUpdate</h2>\n<p>Không có nhiều trường hợp sử dụng hook này, <strong>KHÔNG</strong> gọi <code>setState</code> ở đây, phần lớn các trường hợp điều có thể handle ở <code>componentWillReceiveProps</code></p>\n<h2>componentDidUpdate</h2>\n<p>Sau khi React cập nhập lại UI, hook này sẽ được gọi, nếu muốn chạy một animation gì đó cần tương tác với DOM thì đây chính là lúc thực thi</p>\n<h2>componentWillUnmount</h2>\n<p>Có thể sử dụng để remove các listener đã được add cho DOM</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token function">componentWillUnmount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  window<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">\'resize\'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>resizeEventHandler<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<h2>componentDidCatch</h2>\n<p>Cái này mới được add vào từ React 16, nếu một component nào đó bị lỗi nó sẽ không chết nguyên cái app nữa mà sẽ quăn lỗi ở đây, sử dụng để hiển thị lỗi lên UI</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">class</span> <span class="token class-name">ErrorBoundary</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>\n  <span class="token function">constructor</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span> hasError<span class="token punctuation">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function">componentDidCatch</span><span class="token punctuation">(</span>error<span class="token punctuation">,</span> info<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment" spellcheck="true">// Display fallback UI</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> hasError<span class="token punctuation">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment" spellcheck="true">// You can also log the error to an error reporting service</span>\n    <span class="token function">logErrorToMyService</span><span class="token punctuation">(</span>error<span class="token punctuation">,</span> info<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>hasError<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token comment" spellcheck="true">// You can render any custom fallback UI</span>\n      <span class="token keyword">return</span> <span class="token operator">&lt;</span>h1<span class="token operator">></span>Something went wrong<span class="token punctuation">.</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>children<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token operator">&lt;</span>ErrorBoundary<span class="token operator">></span>\n  <span class="token operator">&lt;</span>MyWidget <span class="token operator">/</span><span class="token operator">></span>\n<span class="token operator">&lt;</span><span class="token operator">/</span>ErrorBoundary<span class="token operator">></span>\n</code></pre>\n      </div>',id:"E:/anluu/luckyluu/posts/2017-10-20-react-lifecycle-la-gi/index.md absPath of file >>> MarkdownRemark",timeToRead:3,frontmatter:{date:"2017-10-20T13:35:13.234Z",path:"/2017-10-20-react-lifecycle-la-gi",tags:["javascript","react"],title:"Giải thích React Lifecycle"}}}}}});
//# sourceMappingURL=path---2017-10-27-react-children-react-clone-element-e9c9d76847a6d2ad8ab5.js.map