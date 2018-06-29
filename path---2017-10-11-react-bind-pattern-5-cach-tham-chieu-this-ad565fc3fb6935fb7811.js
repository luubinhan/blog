webpackJsonp([77],{"./node_modules/json-loader/index.js!./.cache/json/2017-10-11-react-bind-pattern-5-cach-tham-chieu-this.json":function(n,s){n.exports={data:{markdownRemark:{html:'<h1>Sử dụng <code>React.createClass</code></h1>\n<p>Nếu sử dụng <code>React.createClass</code> react tự động bind toàn bộ từ khóa <code>this</code></p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code><span class="token keyword">const</span> Contacts <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createClass</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>handChange<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Tuy nhiên từ khi ES6 có hổ trợ <code>class</code>, React.createClass có thể bị tách ra các release trong tương lai.</p>\n<h1>Bind trong lúc Render</h1>\n<p>Nếu khai báo một component React bằng cách extends React.Component, <code>this</code> sẽ không được tự động bind như đã nói ở trên, thay vào đó bind lúc render</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code><span class="token keyword">class</span> <span class="token class-name">Contacts</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span><span class="token punctuation">{</span>\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token punctuation">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>handChange<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">/></span></span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Cách này tuy là sạch sẽ gọn ràng dễ hiểu, tuy nhiên lại ảnh hưởng nhiều tới performance vì mỗi function sẽ reallocated lúc render. <strong>Kinh nghiệm không bind bằng cách này</strong></p>\n<h1>Sử dụng Arrow function</h1>\n<p>Tương tự như cách trên, sử dụng arrow function để không thay đổi giá trị của <code>this</code> lúc render</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code><span class="token keyword">class</span> <span class="token class-name">Contacts</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span><span class="token punctuation">{</span>\n  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token punctuation">=</span><span class="token punctuation">{</span>e <span class="token operator">=</span><span class="token operator">></span> <span class="token keyword">this</span><span class="token punctuation">.</span>handChange<span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Cách này cũng không nên làm vì ảnh hương tới performance luôn</p>\n<h1>Bind trong cunstructor</h1>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code><span class="token function">constructor</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>handleChange <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handleChange<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Đây là cách được khuyến cáo sử dụng, nếu thật sự quan tâm tới performance thì nên sử dụng cách này khi muốn bind từ khóa <code>this</code>.</p>\n<h1>Sử  dụng <code>Arrow Function</code> trong thuộc tính của class</h1>\n<p>Muốn sử dụng cách này, phải bật tính năng <em>transform-class-properties</em> trong Babel, xem thêm package này tại <a href="http://babeljs.io/docs/plugins/transform-class-properties">http://babeljs.io/docs/plugins/transform-class-properties</a></p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code>handleChange <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span>\n  <span class="token comment" spellcheck="true">// call this function from render </span>\n  <span class="token comment" spellcheck="true">// and this.whatever in here works fine.</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Đây cũng là cách mà mình thường sử dụng nhất vì vừa sạch vừa tốt cho performance</p>',frontmatter:{date:"October 11, 2017",path:"/2017-10-11-react-bind-pattern-5-cach-tham-chieu-this",tags:["react","javascript"],title:"React Bind Pattern: 5 cách chỉ định tham chiếu this",desc:"Để thay đổi ngữ cảnh cho từ khóa this trong javascript, sử dụng ở đâu và như thế nào cho hợp lý nhất"}}},pathContext:{prev:{excerpt:"Bạn sẽ gặp đoạn code sau rất nhiều Đoạn code nằm bên trong   sẽ chạy sau khi nhận dữ liệu trả về từ server trước khi chạy tiếp.   thực chất là một  object  cũ xì trong javascript, điều khác biệt là nó có những phương thức cho phép chạy đồng bộ...",html:'<p>Bạn sẽ gặp đoạn code sau rất nhiều</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">\'/user/1\'</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span> user <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span>\n        <span class="token comment" spellcheck="true">/* run after API return */</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>Đoạn code nằm bên trong <code>.then</code> sẽ chạy sau khi nhận dữ liệu trả về từ server trước khi chạy tiếp. <code>Promise</code> thực chất là một <em>object</em> cũ xì trong javascript, điều khác biệt là nó có những phương thức cho phép chạy đồng bộ (synchronously)</p>\n<p>Nếu không tin bạn thử check kiểu của Promise sẽ thấy</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">typeof</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">\'object\'</span> <span class="token comment" spellcheck="true">// true</span>\n</code></pre>\n      </div>\n<p>Để mình nhắc lại lần nữa để bạn không bị cái tên hoa mĩ <em>Promise</em> lừa tình, <strong>Promise chỉ đơn thuần là một object</strong>. Để có thể đợi trả về từ server, trước khi thực hiện chạy đoạn code trong <code>.then()</code>, function của bạn <strong>BUỘC PHẢI</strong> trả về một <em>Promise</em>. Function <code>fetch</code> được viết như sau</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code>cost fetch <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span>\n        <span class="token function">request</span><span class="token punctuation">(</span><span class="token punctuation">(</span>error<span class="token punctuation">,</span> apiResponse<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span>\n            <span class="token keyword">if</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>\n            <span class="token punctuation">}</span>\n\n            <span class="token function">resolve</span><span class="token punctuation">(</span>apiResponse<span class="token punctuation">)</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Giờ tới phần quan trọng, viết lại khai báo Promise (gọi là SimplePromise để tránh trùng tên) để xem cách làm của Promise</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">class</span> <span class="token class-name">SimplePromise</span> <span class="token punctuation">{</span>\n    <span class="token function">constructor</span><span class="token punctuation">(</span>executionFunction<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>promiseChain <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>handleError <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n        <span class="token keyword">this</span><span class="token punctuation">.</span>onResolve <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>onResolve<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>onReject <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>onReject<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>\n\n        <span class="token function">executionFunction</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>onResolve<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>onReject<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token function">then</span><span class="token punctuation">(</span>onResolve<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>promiseChain<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>onResolve<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">catch</span><span class="token punctuation">(</span>handleError<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>handleError <span class="token operator">=</span> handleError<span class="token punctuation">;</span>\n\n        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token function">onResolve</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">let</span> storedValue <span class="token operator">=</span> value<span class="token punctuation">;</span>\n\n        <span class="token keyword">try</span> <span class="token punctuation">{</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>promiseChain<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span> nextFunction <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span>\n                storedValue <span class="token operator">=</span> <span class="token function">nextFunction</span><span class="token punctuation">(</span>storedValue<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span><span class="token punctuation">)</span>\n        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">this</span><span class="token punctuation">.</span>promiseChain <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n\n            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">onReject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token function">onReject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleError</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>Khi khởi tạo một Promise <code>new Promise((resolve, reject) =>{...} )</code> chúng ta truyền vào một callback function, function này sẽ nhận 2 tham số truyền vào là 2 function internal của Promise <code>onResolve</code> và <code>onReject</code></p>\n<p>Bên trong constructor đồng thời khởi tạo mảng <code>promiseChain</code> và hàm <code>handleError</code>, khi thêm một hoặc một mớ <code>.then()</code>, các hàm này sẽ được tuần tự đưa vào mảng <code>promiseChain</code>, hàm <code>.catch()</code> thì được map với hàm <code>handleError</code> trong Promise.</p>\n<blockquote>\n<p>Lưu ý, cái này là ví dụ, Promise thực tế thì 2 hàm <code>then</code> và <code>catch</code> sẽ trả về new Promise, cái này làm cho đơn giản trả về <code>this</code> thôi.</p>\n</blockquote>\n<p>Khi một hàm bất đồng bộ (async) được gọi <code>resolve(apiResponse)</code>, object promise bắt đầu chạy <code>onResolve(apiResponse)</code> nó sẽ loop qua <em>tuần tự</em> mảng <em>promiseChain</em>, thực thi các xử lý trong hàm từ đầu tiên trong mảng, đến hàm thứ 2, 3, 4..., mỗi lần như vậy nó sẽ nhận giá trị <code>storedValue</code> đồng thời cập nhập lại <code>storedValue</code> này. </p>',id:"E:/anluu/luckyluu/posts/2017-10-12-javascript-promise/index.md absPath of file >>> MarkdownRemark",timeToRead:2,frontmatter:{date:"2017-10-12T13:35:13.234Z",path:"/2017-10-12-javascript-promise",tags:["javascript"],title:"Promise trong javascript"}},next:{excerpt:"Khi chưa vào làm cho Facebook, tôi chưa hề biết thế nào gọi là thiết kế để giải quyết vấn đề cho người sử dụng. Tôi học được rằng giải quyết vấn đề cho người sử dụng không bao giờ là công việc đo từng ly từng tí pixel được thiết kế, nó đòi hỏi phải...",html:'<p>Khi chưa vào làm cho Facebook, tôi chưa hề biết thế nào gọi là thiết kế để giải quyết vấn đề cho người sử dụng.</p>\n<p>Tôi học được rằng giải quyết vấn đề cho người sử dụng không bao giờ là công việc đo từng ly từng tí pixel được thiết kế, nó đòi hỏi phải làm việc như một phần của team để tìm ra cách giải quyết.</p>\n<p>Ngày xửa ngày xưa tôi rất thích các trang web với nhiều hiệu ứng lạ mắt, những logo ý nghĩa, những bản thiết kế làm lại (re-design) của những designer từ khắp nơi cho những trang web nổi tiếng,... . Ngày xưa tôi từng mơ ước trở thành kế toán, tôi thích trở thành người giữ tiền cho các công ty lớn, thế rồi tôi thấy những thiết kế lộng lẫy đó trên mạng, tôi nghĩ rằng, chắc đây có thể là một công việc với nhiều điều thú vị hơn một kế toán viên.</p>\n<p>Giờ khi tôi đã là prodoct design cho các sản phẩm của Facebook, với hơn 2 tỉ người người sử dụng, tôi biết rằng những gì tôi từng tưởng tượng trước đây về thiết kế chỉ là phần nổi của tảng băng chìm.</p>\n<h2>Thiết kế tốt hơn phải giải quyết một vấn đề thực tế của người sử dụng</h2>\n<p>Khi mới bắt đầu, tôi dành thời gian hàng đêm để làm những website, ứng dụng nhỏ, những dự án chẳng ai biết tới, những ý tưởng rất ngô nghê như ứng dụng hẹn hò dựa trên kết quả tìm kiếm.</p>\n<p>Lúc đó tôi đã nghĩ rằng mình là product design thực thụ. Tôi vẽ ra tất cả các màn hình, flows cho ứng dụng, và tự nhủ rằng đã xong hết 90% của công việc, phần còn lại là quăng hết đống design đó cho các anh lập trình viên code đúng theo thiết kế này và hiển nhiên ngồi bắt bẻ các anh lập trình không làm đúng ý tôi.</p>\n<p>Giờ nhìn lại, những gì trước đây mình làm còn rất xa so với công việc của product design, trước khi làm việc cho Facebook, tôi chưa bao giờ bỏ thời gian ra để xác định vấn đề cần giải quyết ở đây là gì trước khi bắt tay vào làm, tôi chỉ muốn làm cái gì đó thiệt "ngầu" để trưng lên Dribbble hay Behance để câu like.</p>\n<p>Giờ tôi không còn lơ lửng trên 9 tầng mây, tôi phải đứng cùng vị trí với người sử dụng, tôi cùng các đồng nghiệp của mình cùng nhau xác định bài toán đặt ra là gì, đưa ra một giải pháp được cho là khả thi nhất dựa trên dữ liệu chúng tôi có được, test thử giải pháp trên một số lượng nhỏ người sử dụng trước khi đưa nó vào vận hành chính thức.</p>\n<p>Giờ tôi cũng rất dễ bị hấp dẫn bởi các xu hướng thiết kế mới, nhưng không bao giờ áp những xu thế này để giải quyết các vấn đề mà không cần suy nghĩ, nó là một hành động ảnh hưởng xấu đến những người trong team đã và đang đối mặt với vấn đề đó hằng ngày, họ biết rõ vấn đề cần giải quyết là gì hơn ai hết, nó giống như câu nói "nếu ai cũng có cây búa trong tay, thì mọi thứ chỉ như cái cán búa".</p>\n<h1>Product Manager và Lập trình viên luôn là bạn tốt nhất</h1>\n<p>Tôi từng tưởng tượng, tôi sẽ trang bị cho những designer là cấp dưới, đồng nghiệp của tôi những vũ khí \'hạng nặng\' để đối phó với bên kia chiến tuyến là các anh lập trình viên cù lần. Chúng tôi sẽ cũng nhau thương thảo những vấn đề cực quan trọng như nên sử dụng màu gradient nào đang là hot trend bây giờ, hay tạo ra cái mới, bo tròn bao nhiêu là đủ, bao nhiều là quá lố...</p>\n<p>Ở Facebook, rất nhiều cơ hội để làm việc với các designer khác. Tôi ngồi ngay kế vài anh lão làng như thế trong công ty, thế nhưng mấy anh này lại làm việc trên các sản phẩm khác, nên tôi chỉ tiếp xúc nhiều với product manager và các lập trình viên.</p>\n<p>Một designer chỉ tập trung cho một sản phẩm nào đó của Facebook, vì với độ lớn của sản phẩm mà chúng tôi đang làm, nếu các anh designer cứ nhảy từ team này qua team khác, sẽ mất khá nhiều thời gian để người mới có thể bắt kịp tốc độ dự án.</p>\n<p>Product manager là người nắm rõ nhất những gì các team đang làm. Vì thế tôi luôn tin tưởng tìm đến anh ấy khi cần một cái nhìn khác về thiết kế của mình hay những gì tôi nên tập trung nhiều hơn trên sản phẩm cần đạt được.</p>\n<p><img src="https://cdn-images-1.medium.com/max/800/1*LYvWth8qUnXztOkj7GUC5g@2x.jpeg" alt="https://cdn-images-1.medium.com/max/800/1*LYvWth8qUnXztOkj7GUC5g@2x.jpeg"></p>\n<p>Làm việc với mấy anh cù lần \'developer\' giúp tôi trở nên tốt hơn rất nhiều, mấy anh chỉ cho tôi rất nhiều điều mà tôi không lường trước. Ví dụ, tôi thường không quan tâm đến thời gian phản hồi từ điện thoại đến server, các phác thảo của tôi gần như chỉ tính đến chuyện click-reponse ngay lập tức. Các anh dev cho tôi thấy việc truyền gởi dữ liệu cần tốn một thời gian nhất định và còn phụ thuộc yếu tố mạng nhanh hay chậm, anh cho tôi thấy sự khác biệt trải nghiệm rõ rệt khi mở ứng dụng của tôi với mạng siêu nhanh của công ty và mạng rùa bò ở các nước có đường truyền thấp.</p>\n<p>Sản phẩm khi thiết kế luôn chịu ảnh hưởng của yếu tố technical, ở Facebook chúng tôi luôn đưa anh lập trình vào trong quá trình thiết kế ngay từ giai đoạn đầu của design, làm như vậy để biết được những ràng buộc nhất định về mặt kỹ thuật, lắng nghe cách giải quyết vấn đề từ gốc nhìn từ developer.</p>\n<p>Tôi có thể ngồi kế rất nhiều designer khác, nhưng người bạn thân thiết giúp sản phẩm của tôi tốt hơn là các anh developer và product manager</p>\n<h1>Bạn đang thiết kế sản phẩm cho người sử dụng hoàn toàn khác bạn</h1>\n<p>Trừ trường hợp bạn tự làm tự xài, đa phần các sản phẩm được thiết kế ra được dành cho những người không am hiểu thiết kế, phần lớn người sử dụng sản phẩm Facebook nằm ngoài nước Mỹ, không sử dụng con smart phone đẳng cấp nhất thời đại mà tôi đang sử dụng.</p>\n<p>Team UX research ở Facebook luôn biết sản phẩm chúng tôi đang tạo ra cho ai sử dụng, họ mời những con người thật với nhiều tiêu chí khác nhau đến phòng labs để kiểm thử chức năng mới, nói chuyện với những người sử dụng từ nữa vòng trái đất, đo lường ảnh hưởng của những thay đổi trong sản phẩm bằng những đánh giá được gởi đi khắp nơi.</p>\n<p>Với những "chứng cứ" người thật việc thật, những người gặp rắc rối khi thực hiện một tác vụ được thiết kế, chúng tôi có được những giải pháp nhanh nhất từ những lập trình viên ưu tú.</p>\n<p>Ví dụ, qua research chúng tôi mới thấy được cái nút nhỏ xíu "Add Friend" có thể tốt trên tiếng anh nhưng với những ngôn ngữ khác lại không ổn.</p>\n<p><img src="https://cdn-images-1.medium.com/max/800/1*Ir4lwTDLoV0LZVobw94AAQ.png"></p>\n<h1>Thiết kế sẽ được cân đo đong điếm</h1>\n<p>Khi ngồi nhà thiết kế cho chính mình, tôi chẳng bao giờ nghĩ tới chuyện đi cân đo các thiết kế của mình, phần lớn khi ra quyết định một thiết kế được đưa ra dựa trên sở thích cá nhân nhiều hơn trên những số liệu, căn cứ thực tế.</p>\n<p>Ở Facebook tôi học được rằng trước khi muốn giải quyết vấn đề nào đó chúng tôi cần dựa trên những thông tin liên quan về vấn đề đó. Ai sử dụng tính năng này? Bao nhiêu người sẽ chịu ảnh hưởng từ các thay đổi được đưa ra? Những thay đổi tích cực có đủ lớn để chấp nhận rủi ro cho những thay đổi này không?</p>\n<p>Dữ liệu luôn là kẻ chiến thắng trong mọi cuộc tranh cãi. Đó là câu khẩu hiệu ở Facebook, nếu bạn là designer làm việc ở đây, nếu muốn tranh cãi vấn đề vì đó tốt hơn hãy có dữ liệu cụ thể để thuyết phục đồng đội.</p>\n<p>Khi team tôi bắt đầu đi lòng vòng quanh một vấn đề mà chưa ngã ngủ, tôi thường sử dụng câu hỏi "Tại sao". Tại sao chẳng ai vào mục Giúp đỡ trên website của bạn? Phải chăng họ quá rành không cần vào xem hay họ chẳng biết vào đó bằng cách nào?</p>\n<h2>Công việc này không như bạn đã nghĩ</h2>\n<p>Tôi đã từng nghĩ công việc của một product design phần lớn là để làm cho sản phẩm được đẹp một cách "lồng lộn". Từ ngày bị lôi vào Facebook tôi nhận ra mình đã hiểu sai khái niệm về product design.</p>\n<p>Visual designer mới làm công việc trang điểm cho sản phẩm, công việc của tôi là phối hợp với đồng nghiệp của mình, xác định bài toán mà người sử dụng sản phẩm chúng tôi muốn giải quyết, chuyển nó thành những giải pháp thiết kế tốt nhất có thể, tìm ra cách đánh giá để biết chúng tôi có thành công trong việc giải quyết vấn đề đó không.</p>\n<p>Bài viết của: Jason Cashdollar | Product designer at Facebook</p>',id:"E:/anluu/luckyluu/posts/2017-10-03-thiet-ke-an-tuong-vs-thiet-ke-thuc-te-bai-hoc-thuc-te/index.md absPath of file >>> MarkdownRemark",timeToRead:6,frontmatter:{date:"2017-10-03T13:35:13.234Z",path:"/2017-10-03-thiet-ke-an-tuong-vs-thiet-ke-thuc-te-bai-hoc-thuc-te",tags:["ux-ui","design","web"],title:"Thiết kế tuyệt đẹp vs. Thực tế: bài học từ Facebook"}}}}}});
//# sourceMappingURL=path---2017-10-11-react-bind-pattern-5-cach-tham-chieu-this-ad565fc3fb6935fb7811.js.map