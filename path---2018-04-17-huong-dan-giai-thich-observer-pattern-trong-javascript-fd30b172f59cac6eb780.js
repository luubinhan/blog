webpackJsonp([0x67457ea5f804],{1298:function(n,s){n.exports={data:{markdownRemark:{html:'<p>Hình dung cái pattern này như sau: Chúng ta có 1 cái <em>instance</em> sẽ đảm nhiệm quản lý <strong>tập các đối tượng</strong> (observer) và thông báo đến tất cả các <strong>observer</strong> này khi có một thay đổi nào đó xảy ra.</p>\n<p>Tưởng tượng ta có các elements (có <strong>s</strong> nha) sẽ được cập nhập khi có một <strong>event</strong> xảy ra (ví dụ như nhập giá trị input). Chúng ta cần <strong>thêm</strong> (= <strong>subscribe</strong>) các <em>elements</em> (= <strong>observer</strong>) sẽ thay đổi khi chúng ta nhập giá trị cho <code class="language-text">input</code>, code nó như sau</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">class</span> <span class="token class-name">Observable</span> <span class="token punctuation">{</span>\n    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">// chứa danh sách các đối tượng đang subscribe theo sự kiện</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>observers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    \n    <span class="token comment">// thêm đối tượng đó vào mảng observers</span>\n    <span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token parameter">f</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>observers<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token comment">// cũng nên có function để remove nó ra khỏi mảng observer nhỉ</span>\n    <span class="token function">unsubscribe</span><span class="token punctuation">(</span><span class="token parameter">f</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>observers <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>observers<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">subscriber</span> <span class="token operator">=></span> subscriber <span class="token operator">!==</span> f<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token comment">// gởi đi thông báo khi xảy ra sự kiện và một số dữ liệu kèm theo</span>\n    <span class="token function">notify</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>observers<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">observer</span> <span class="token operator">=></span> <span class="token function">observer</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Sử dụng nó</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"><span class="token keyword">const</span> input <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">\'.js-input\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> p1 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">\'.js-p1\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> p2 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">\'.js-p2\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">const</span> p3 <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">\'.js-p3\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// các action sẽ thêm vào mảng observers</span>\n<span class="token keyword">const</span> <span class="token function-variable function">updateP1</span> <span class="token operator">=</span> <span class="token parameter">text</span> <span class="token operator">=></span> p1<span class="token punctuation">.</span>textContent <span class="token operator">=</span> text<span class="token punctuation">;</span>\n<span class="token keyword">const</span> <span class="token function-variable function">updateP2</span> <span class="token operator">=</span> <span class="token parameter">text</span> <span class="token operator">=></span> p2<span class="token punctuation">.</span>textContent <span class="token operator">=</span> text<span class="token punctuation">;</span>\n<span class="token keyword">const</span> <span class="token function-variable function">updateP3</span> <span class="token operator">=</span> <span class="token parameter">text</span> <span class="token operator">=></span> p3<span class="token punctuation">.</span>textContent <span class="token operator">=</span> text<span class="token punctuation">;</span>\n\n<span class="token comment">// khởi tạo Observer class</span>\n<span class="token keyword">const</span> headingsObserver <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Observable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// cho em đăng ký với mấy anh ơi</span>\nheadingsObserver<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span>updateP1<span class="token punctuation">)</span><span class="token punctuation">;</span>\nheadingsObserver<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span>updateP2<span class="token punctuation">)</span><span class="token punctuation">;</span>\nheadingsObserver<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span>updateP3<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// khi giá trị input thay đổi: đưa nào đăng ký thì tao gởi mail, lộn gọi đến action tụi bây đăng ký thực hiện</span>\ninput<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">\'keyup\'</span><span class="token punctuation">,</span> <span class="token parameter">e</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  headingsObserver<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>Đây là phiên bản siêu đơn giản của observer pattern, nếu muốn tìm hiểu sâu hơn nữa bạn có thể đọc <a href="https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript">Learning Javascript Design Patterns</a> của tác giả Addy Osmani. Observe pattern còn được gọi "Publication/Subscription", thật ra thì nó có xíu khác biệt mà Addy <a href="https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript">đã đề cập</a></p>\n<p>Trong Observer pattern, <em>Observer</em> (object) muốn nhận thông báo phải <em>subscribe</em> vào object sẽ fire ra sự kiện, trong khi đó Publish/Subscribe pattern sử dụng như một cầu nối đứng giữa object muốn nhận thông báo (subscriber) và object fire ra sự kiện (publisher), ý tưởng ở đây là để tách sự phụ thuộc của subscriber và publisher, cho phép các event chỉ định có thể truyền đi những arguments chứa giá trị mà subscriber cần.</p>\n<div class="gatsby-highlight">\n      <pre class="language-jsx"><code class="language-jsx"> \n<span class="token comment">// email đã nhận</span>\n<span class="token keyword">var</span> mailCounter <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n \n<span class="token comment">// khởi tạo subscribers sẽ lắng nghe sự kiện "inbox/newMessage".</span>\n \n<span class="token comment">// Render preview</span>\n<span class="token keyword">var</span> subscriber1 <span class="token operator">=</span> <span class="token function">subscribe</span><span class="token punctuation">(</span> <span class="token string">"inbox/newMessage"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span> <span class="token parameter">topic<span class="token punctuation">,</span> data</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>\n \n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token string">"A new message was received: "</span><span class="token punctuation">,</span> topic <span class="token punctuation">)</span><span class="token punctuation">;</span>\n \n  <span class="token comment">// Dùng dữ liệu trả về để render và nội dung  </span>\n  <span class="token function">$</span><span class="token punctuation">(</span> <span class="token string">".messageSender"</span> <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span> data<span class="token punctuation">.</span>sender <span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token function">$</span><span class="token punctuation">(</span> <span class="token string">".messagePreview"</span> <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span> data<span class="token punctuation">.</span>body <span class="token punctuation">)</span><span class="token punctuation">;</span>\n \n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n \n<span class="token comment">// Một subscriber khác cũng lắng nghe sự kiện này và thực hiện một tác vụ khác</span>\n \n<span class="token comment">// Update lại counter</span>\n \n<span class="token keyword">var</span> subscriber2 <span class="token operator">=</span> <span class="token function">subscribe</span><span class="token punctuation">(</span> <span class="token string">"inbox/newMessage"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span> <span class="token parameter">topic<span class="token punctuation">,</span> data</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>\n \n  <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">\'.newMessageCounter\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span> <span class="token operator">++</span>mailCounter <span class="token punctuation">)</span><span class="token punctuation">;</span>\n \n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n \n<span class="token function">publish</span><span class="token punctuation">(</span> <span class="token string">"inbox/newMessage"</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>\n  sender<span class="token punctuation">:</span> <span class="token string">"hello@google.com"</span><span class="token punctuation">,</span>\n  body<span class="token punctuation">:</span> <span class="token string">"Hey there! How are you doing today?"</span>\n<span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n \n<span class="token comment">// unsubscribe( subscriber1 );</span>\n<span class="token comment">// unsubscribe( subscriber2 );</span></code></pre>\n      </div>\n<p>Tức là ở đây thằng Observer ta móc nó vào sự kiện xảy ra trên đối tượng (ví dụ trên là input), còn Pub/Sub thì sẽ có thằng đứng giữa 2 đứa, làm nhiệm vụ cung cấp 2 hàm là <code class="language-text">publish</code> để tạo sự kiện, <code class="language-text">subscribe</code> để lắng nghe sự kiện.</p>',timeToRead:3,excerpt:"Hình dung cái pattern này như sau: Chúng ta có 1 cái  instance  sẽ đảm nhiệm quản lý  tập các đối tượng  (observer) và thông báo đến tất cả…",frontmatter:{title:"Giải thích Observer Pattern trong javascript",cover:"",date:"2018-04-17",category:null,tags:["javascript","react"],desc:"Observer là một pattern khá phổ biến trong javascript, bài giải thích ngắn gọn về pattern này"},fields:{slug:"/2018-04-17-huong-dan-giai-thich-observer-pattern-trong-javascript"}}},pathContext:{slug:"/2018-04-17-huong-dan-giai-thich-observer-pattern-trong-javascript",prev:{frontmatter:{title:"Một số cách làm Animation trong React",desc:"Tổng hợp một số phương pháp làm animation với React",type:"post",category:null,tags:["javascript","react"],date:"2018-04-24",cover:""},fields:{slug:"/2018-04-24-huong-dan-huong-dan-lam-animation-voi-react"}},next:{frontmatter:{title:"Giới thiệu Expo, nhập môn React Native",desc:"Để bắt đầu với React Native, cách nhanh nhất không cần cài Android Studio, Xcode có ngay môi trường để chạy test React Native thì Expo chính là cái bạn cần",type:"post",category:null,tags:["javascript","react","react-native"],date:"2018-04-16",cover:""},fields:{slug:"/2018-04-16-huong-dan-react-native-bat-dau-voi-expo"}}}}}});
//# sourceMappingURL=path---2018-04-17-huong-dan-giai-thich-observer-pattern-trong-javascript-fd30b172f59cac6eb780.js.map